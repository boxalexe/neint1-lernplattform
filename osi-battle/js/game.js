/*
 * game.js — Zustand, Rundenablauf, Balancing.
 *
 * FAIRNESS-DESIGN:
 * 1) Kopf-Rotation: "Bag"-Prinzip. Alle lebenden Köpfe kommen einmal dran,
 *    bevor sich einer wiederholt -> jeder Kopf ungefähr gleich häufig, aber
 *    die Reihenfolge innerhalb einer Runde ist zufällig gemischt.
 * 2) Schaden variiert leicht (±), wirkt zufällig, bleibt aber im Mittel fair.
 *    Kritische Treffer geben Bonus. Der Kopf-Schaden ist so bemessen, dass
 *    eine feste Zahl richtiger Antworten je Kopf reicht (kein Aufrunden-Pech).
 * 3) Gewinnbarkeit: Spielerschaden pro Fehler ist klein genug, dass der Kampf
 *    auch bei niedrigem HP-Stand noch zu gewinnen ist (siehe balance-test).
 */

const Game = {
  state: null,

  // Werte kommen aus dem gewählten Schwierigkeitsgrad (data.js)
  CFG: null,
  diff: null,

  rng(min, max) { return min + Math.floor(Math.random() * (max - min + 1)); },

  start(bossId, difficultyKey) {
    const t = BOSSES[bossId];
    const diff = DIFFICULTIES[difficultyKey || (this.diff && this.diff.key) || "mittel"];
    this.diff = diff;

    this.state = {
      boss: { id: t.id, name: t.name, heads: t.bauHeads(diff) },
      player: { hp: t.playerMaxHp, maxHp: t.playerMaxHp },
      usedIds: new Set(),
      bag: [],
      locked: false,
      richtige: 0,                 // zählt NUR korrekte Diagnosen
      fehler: 0,
      maxFehler: diff.maxFehler,
      ziel: diff.fragen,
      stats: { asked: 0, correct: 0, wrong: 0, crits: 0 },
    };
    // Schaden je Fehlversuch so, dass genau maxFehler zum Ende führen
    this.fehlerSchaden = Math.ceil(t.playerMaxHp / diff.maxFehler);

    UI.hideEnd();
    UI.setBossName(t.name);
    UI.setDifficulty(diff);
    UI.buildHydra(this.state.boss);
    this.state.boss.heads.forEach(h => UI.updateHead(h));
    UI.updateBossHp(this.totalBossHp(), this.totalBossMaxHp());
    UI.updatePlayerHp(this.state.player.hp, this.state.player.maxHp);
    UI.updateProgress(0, diff.fragen, 0, diff.maxFehler);

    UI.playIntroFade(() => {
      UI.playHydraRise(() => {
        UI.showBossLine(t.intro, () => this.nextTurn());
      });
    });
  },

  totalBossHp() { return this.state.boss.heads.reduce((s, h) => s + Math.max(0, h.hp), 0); },
  totalBossMaxHp() { return this.state.boss.heads.reduce((s, h) => s + h.maxHp, 0); },
  aliveHeads() { return this.state.boss.heads.filter(h => !h.defeated); },

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  // Nächsten Kopf aus dem "Bag" ziehen; leerer Bag wird mit lebenden Köpfen neu gefüllt.
  /** Kopf für die nächste Runde wählen.
   *  Reihenfolge: gleichmäßige Rotation (Bag), aber Köpfe mit noch
   *  ungestellten Fragen haben Vorrang. Notfalls ein beliebiger lebender
   *  Kopf mit freien Fragen, damit sich nichts wiederholt. */
  drawHead() {
    const hatFrische = id => getQuestionsForHead(id).some(q => !this.state.usedIds.has(q.id));

    this.state.bag = this.state.bag.filter(id =>
      this.state.boss.heads.some(h => h.headId === id && !h.defeated));
    if (this.state.bag.length === 0) {
      this.state.bag = this.shuffle(this.aliveHeads().map(h => h.headId));
    }

    let idx = this.state.bag.findIndex(hatFrische);
    if (idx >= 0) {
      const headId = this.state.bag.splice(idx, 1)[0];
      return this.state.boss.heads.find(h => h.headId === headId);
    }

    // Kein Kopf im Bag hat freie Fragen: alle lebenden Köpfe durchsuchen
    const ausweich = this.aliveHeads().find(h => hatFrische(h.headId));
    if (ausweich) {
      this.state.bag = this.state.bag.filter(id => id !== ausweich.headId);
      return ausweich;
    }

    // Alles aufgebraucht (praktisch unerreichbar): normale Rotation
    const headId = this.state.bag.shift();
    return this.state.boss.heads.find(h => h.headId === headId);
  },

  pickQuestion(head) {
    const used = this.state.usedIds;
    let pool = getQuestionsForHead(head.headId).filter(q => !used.has(q.id));
    // Notfall: sollte durch die Balance nie eintreten (8 Fragen je Kopf)
    if (pool.length === 0) pool = getQuestionsForHead(head.headId);
    return pool[Math.floor(Math.random() * pool.length)];
  },

  nextTurn() {
    if (this.checkEnd()) return;
    const head = this.drawHead();
    const question = this.pickQuestion(head);

    this.state.currentHeadId = head.headId;
    this.state.currentQuestion = question;
    this.state.locked = false;
    UI.showBossLine(question.beat, () => UI.showQuestion(question, idx => this.answer(idx)));
  },

  answer(optionIdx) {
    if (this.state.locked) return;
    this.state.locked = true;

    const q = this.state.currentQuestion;
    const chosen = q.options[optionIdx];
    const correctIdx = q.options.findIndex(o => o.ok);
    const correct = !!chosen.ok;
    const head = this.state.boss.heads.find(h => h.headId === this.state.currentHeadId);

    this.state.usedIds.add(q.id);
    this.state.stats.asked++;
    UI.lockOptions();
    UI.markOption(optionIdx, correct);
    if (!correct) UI.revealCorrectOption(correctIdx);

    let dmg, crit = false;
    if (correct) {
      this.state.stats.correct++;
      this.state.richtige++;

      /* Kritischer Treffer: zeigt und verursacht mehr Schaden, wird aber
         beim NÄCHSTEN Treffer auf DENSELBEN Kopf wieder ausgeglichen.
         Ein Paar aus kritisch und ausgleichend ergibt exakt zwei normale
         Treffer. Dadurch bleibt die Zahl nötiger Treffer unverändert. */
      if (head.schuld > 0) {
        dmg = HIT_DAMAGE - head.schuld;   // ausgleichender Treffer
        head.schuld = 0;
      } else if (head.hp >= HIT_DAMAGE * 2 && Math.random() < 0.22) {
        crit = true;
        this.state.stats.crits++;
        dmg = HIT_DAMAGE + CRIT_BONUS;    // kritischer Treffer
        head.schuld = CRIT_BONUS;
      } else {
        dmg = HIT_DAMAGE;
      }

      head.hp = Math.max(0, head.hp - dmg);
      if (head.hp === 0) { head.defeated = true; head.schuld = 0; UI.lowerStrand(head.headId); }
      UI.flashHead(head.headId, true);
      UI.floatDamage(head.headId, dmg, "boss", crit);
      UI.updateHead(head);
      UI.updateBossHp(this.totalBossHp(), this.totalBossMaxHp());
    } else {
      this.state.stats.wrong++;
      this.state.fehler++;
      dmg = this.fehlerSchaden;
      this.state.player.hp = Math.max(0, this.state.player.hp - dmg);
      UI.flashHead(head.headId, false);
      UI.floatDamage(head.headId, dmg, "player", false);
      UI.updatePlayerHp(this.state.player.hp, this.state.player.maxHp);
      UI.shakePlayer();
    }
    // Fortschritt zählt ausschließlich richtige Diagnosen
    UI.updateProgress(this.state.richtige, this.state.ziel, this.state.fehler, this.state.maxFehler);

    // Auflösung erst auf Klick, damit die Markierungen in Ruhe lesbar bleiben
    UI.showAnswerPause(() => {
      UI.showResult(correct, dmg, crit, q.strike, q.e, q.merksatz, () => this.nextTurn());
    });
  },

  checkEnd() {
    if (this.state.player.hp <= 0 || this.state.fehler >= this.state.maxFehler) {
      UI.playDefeatOverwhelm(() => {
        UI.showEnd(false, `Die Netz-Hydra hat dich überwältigt. ${this.state.fehler} von ${this.state.maxFehler} Fehldiagnosen bei ${this.state.richtige} von ${this.state.ziel} richtigen.`);
      });
      return true;
    }
    if (this.aliveHeads().length === 0) {
      const s = this.state.stats;
      UI.playVictoryBurst(this.diff.key, () => {
        UI.showEnd(true, `Die Netz-Hydra zerfällt in Nullen und Einsen. Stufe ${this.diff.label}: ${this.state.richtige} richtige Diagnosen, ${s.wrong} Fehlversuche.`);
      });
      return true;
    }
    return false;
  },
};

/* Der Start-/Auswahlablauf liegt jetzt in boot.js, damit sich Hydra und
   RAID-Golem denselben Bildschirmwechsel teilen. Das Game-Objekt oben ist
   unverändert geblieben. */
