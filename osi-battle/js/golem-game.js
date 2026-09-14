/*
 * golem-game.js — Zustand und Rundenablauf des RAID-Golems.
 *
 * ABLAUF
 *   Der Kampf läuft als feste Kette: RAID 50 -> 10 -> 6 -> 5 -> 4 -> 1 -> 0
 *   -> Controller. Jede Stufe verlangt eine feste Zahl richtiger Antworten
 *   (diff.treffer). Ist sie erreicht, degradiert der Golem auf die nächste
 *   Stufe und führt dabei seinen eigenen Umbau vor.
 *
 * FRAGENBINDUNG
 *   Fragen werden ausschließlich aus dem Pool der AKTUELLEN Stufe gezogen.
 *   Ein stufenfremder Angriff ist strukturell ausgeschlossen: pickQuestion
 *   kennt nur getGolemQuestions(stage.id).
 *
 * FEHLGRIFF
 *   Ein Fehlgriff heilt den Golem nicht. Er verhärtet sich: ein Hot-Spare-
 *   Schild erscheint, der Spieler verliert Lebenspunkte, und dieselbe Stufe
 *   stellt die nächste Frage. Das ist fairer als Regeneration und fachlich
 *   richtiger, weil Redundanz aufgebaut und nicht zurückgewonnen wird.
 */

const GOLEM_TITEL = {
  win: "RAID-Golem zerlegt!",
  lose: "Unter Blech begraben...",
};

const GolemGame = {
  state: null,
  diff: null,

  start(difficultyKey) {
    const diff = GOLEM_DIFFICULTIES[difficultyKey] || GOLEM_DIFFICULTIES.mittel;
    this.diff = diff;

    const kette = GOLEM_STAGES.map(s => s.id);
    this.state = {
      kette,
      stageIndex: 0,
      stage: GOLEM_STAGES[0],
      treffer: 0,                  // Treffer auf der aktuellen Stufe
      richtige: 0,
      fehler: 0,
      maxFehler: diff.maxFehler,
      ziel: this.gesamtTreffer(diff),
      player: { hp: GOLEM_BOSS.playerMaxHp, maxHp: GOLEM_BOSS.playerMaxHp },
      usedIds: new Set(),
      locked: false,
      ende: false,
      stats: { asked: 0, correct: 0, wrong: 0 },
    };
    this.maxHp = this.state.ziel * GOLEM_HIT_DAMAGE;
    this.fehlerSchaden = Math.ceil(GOLEM_BOSS.playerMaxHp / diff.maxFehler);

    UI.hideEnd();
    GolemUI.reset();
    GolemUI.buildStage(this.state.stage);

    UI.setBossName(GOLEM_BOSS.name);
    UI.setDifficulty(diff);
    UI.updateBossHp(this.bossHp(), this.maxHp);
    UI.updatePlayerHp(this.state.player.hp, this.state.player.maxHp);
    UI.updateProgress(0, this.state.ziel, 0, diff.maxFehler);

    UI.playIntroFade(() => {
      setTimeout(() => {
        // Erst die Ankunft, dann ausdruecklich die Spielregel, dann die Stufe.
        UI.showBossLine(GOLEM_BOSS.intro, () => {
          UI.showBossLine(GOLEM_BOSS.regel, () => {
            UI.showBossLine(this.state.stage.beschreibung, () => this.nextTurn());
          });
        });
      }, GolemUI.reduziert() ? 0 : 900);
    });
  },

  /** Gesamtzahl nötiger Treffer: alle Plattenstufen plus Controller-Epilog. */
  gesamtTreffer(diff) {
    const platten = GOLEM_STAGES.filter(s => s.id !== "controller").length;
    return platten * diff.treffer + diff.controllerTreffer;
  },

  /** Nötige Treffer für die gerade aktive Stufe. */
  trefferZiel() {
    return this.state.stage.id === "controller"
      ? this.diff.controllerTreffer
      : this.diff.treffer;
  },

  bossHp() {
    return Math.max(0, (this.state.ziel - this.state.richtige) * GOLEM_HIT_DAMAGE);
  },

  /** Zieht eine Frage AUSSCHLIESSLICH aus dem Pool der aktuellen Stufe. */
  pickQuestion() {
    const alle = getGolemQuestions(this.state.stage.id);
    let pool = alle.filter(q => !this.state.usedIds.has(q.id));
    if (pool.length === 0) pool = alle;   // Notfall bei vielen Fehlgriffen
    return pool[Math.floor(Math.random() * pool.length)];
  },

  nextTurn() {
    if (this.checkEnd()) return;
    const q = this.pickQuestion();
    this.state.currentQuestion = q;
    this.state.locked = false;
    UI.showBossLine(q.beat, () => UI.showQuestion(q, idx => this.answer(idx)));
  },

  answer(optionIdx) {
    if (this.state.locked) return;
    this.state.locked = true;

    const q = this.state.currentQuestion;
    const stage = this.state.stage;
    const chosen = q.options[optionIdx];
    const correctIdx = q.options.findIndex(o => o.ok);
    const correct = !!chosen.ok;

    this.state.usedIds.add(q.id);
    this.state.stats.asked++;
    UI.lockOptions();
    UI.markOption(optionIdx, correct);
    if (!correct) UI.revealCorrectOption(correctIdx);

    let dmg;
    if (correct) {
      this.state.stats.correct++;
      this.state.richtige++;
      this.state.treffer++;
      dmg = GOLEM_HIT_DAMAGE;
      GolemUI.strikeDisks(stage, q.hit);
      GolemUI.floatDamage(dmg, "boss");
      UI.updateBossHp(this.bossHp(), this.maxHp);
    } else {
      this.state.stats.wrong++;
      this.state.fehler++;
      dmg = this.fehlerSchaden;
      this.state.player.hp = Math.max(0, this.state.player.hp - dmg);
      GolemUI.harden();
      GolemUI.floatDamage(dmg, "player");
      UI.updatePlayerHp(this.state.player.hp, this.state.player.maxHp);
      UI.shakePlayer();
    }
    UI.updateProgress(this.state.richtige, this.state.ziel, this.state.fehler, this.state.maxFehler);

    setTimeout(() => {
      UI.showResult(correct, dmg, false, q.strike, q.e, q.merksatz, () => this.afterResult(correct));
    }, 600);
  },

  afterResult(correct) {
    if (this.state.player.hp <= 0 || this.state.fehler >= this.state.maxFehler) {
      this.checkEnd();
      return;
    }
    if (!correct || this.state.treffer < this.trefferZiel()) {
      this.nextTurn();
      return;
    }
    this.degrade();
  },

  /** Stufe ist gebrochen: Umbau vorführen und zur nächsten wechseln. */
  degrade() {
    const alt = this.state.stage;
    const naechsteId = alt.next;

    if (!naechsteId) {          // Controller gefallen -> Sieg
      GolemUI.announceMove(alt.degradation.name);
      setTimeout(() => this.checkEnd(true), GolemUI.reduziert() ? 0 : 700);
      return;
    }

    const neu = getGolemStage(naechsteId);
    this.state.stageIndex++;
    this.state.stage = neu;
    this.state.treffer = 0;

    // Zwei kurze Zeilen statt einer langen: der Umbau, dann die neue Stufe.
    // So bleibt jede Zeile im Rahmen der Sprechblase, wie bei der Hydra.
    GolemUI.degrade(neu, alt.degradation.name, () => {
      UI.showBossLine(alt.degradation.text, () => {
        UI.showBossLine(neu.beschreibung, () => this.nextTurn());
      });
    });
  },

  checkEnd(erzwingeSieg) {
    if (this.state.ende) return true;   // Ende wird genau einmal ausgeloest
    if (this.state.player.hp <= 0 || this.state.fehler >= this.state.maxFehler) {
      this.state.ende = true;
      GolemUI.defeat(() => {
        UI.showEnd(
          false,
          `Der RAID-Golem hält bei ${this.state.stage.label} stand. ${this.state.fehler} von ${this.state.maxFehler} Fehlgriffen bei ${this.state.richtige} von ${this.state.ziel} Treffern.`,
          GOLEM_TITEL
        );
      });
      return true;
    }
    if (erzwingeSieg || this.state.richtige >= this.state.ziel) {
      this.state.ende = true;
      const s = this.state.stats;
      GolemUI.victory(this.diff.key, () => {
        UI.showEnd(
          true,
          `Von RAID 50 bis zum Controller, der nie doppelt da war. Stufe ${this.diff.label}: ${this.state.richtige} Treffer, ${s.wrong} Fehlgriffe.`,
          GOLEM_TITEL
        );
      });
      return true;
    }
    return false;
  },
};
