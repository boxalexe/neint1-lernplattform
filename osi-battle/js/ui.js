/*
 * ui.js — DOM-Rendering. Die Drachengrafik kommt aus HydraArt (hydra-art.js);
 * hier werden nur Zustände aktualisiert und Texte gesetzt.
 */

const UI = {
  els: {},

  /* Beschriftungen, die je Boss abweichen. Voreinstellung ist die Hydra,
     boot.js setzt sie beim Start des jeweiligen Kampfes. */
  texte: { symptomUeberschrift: "Symptome", urteilFalsch: "Fehldiagnose!" },
  setBossTexte(t) { this.texte = Object.assign({
    symptomUeberschrift: "Symptome", urteilFalsch: "Fehldiagnose!" }, t || {}); },

  cache() {
    this.els = {
      hydraWrap: document.getElementById("hydra-wrap"),
      bossName: document.getElementById("boss-name"),
      bossHpFill: document.getElementById("boss-hp-fill"),
      bossHpLabel: document.getElementById("boss-hp-label"),
      playerHpFill: document.getElementById("player-hp-fill"),
      playerHpLabel: document.getElementById("player-hp-label"),
      playerHpWrap: document.getElementById("player-hp-wrap"),
      dialogueBox: document.getElementById("dialogue-box"),
      dialogueText: document.getElementById("dialogue-text"),
      dialogueNext: document.getElementById("dialogue-next"),
      questionBlock: document.getElementById("question-block"),
      symptomList: document.getElementById("symptom-list"),
      questionText: document.getElementById("question-text"),
      optionsGrid: document.getElementById("options-grid"),
      answerNext: document.getElementById("answer-next"),
      resultBlock: document.getElementById("result-block"),
      resultVerdict: document.getElementById("result-verdict"),
      resultStrike: document.getElementById("result-strike"),
      resultExplanation: document.getElementById("result-explanation"),
      resultMerksatz: document.getElementById("result-merksatz"),
      continueBtn: document.getElementById("continue-btn"),
      endScreen: document.getElementById("end-screen"),
      endTitle: document.getElementById("end-title"),
      endText: document.getElementById("end-text"),
      scene: document.getElementById("scene"),
    };
  },

  /** Fade-In aus Dunkelheit über eine Overlay-Ebene (billig, kein Filter). */
  playIntroFade(done) {
    const ov = document.getElementById("fade-overlay");
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ov || reduce) { if (done) done(); return; }
    ov.classList.remove("fading");
    ov.style.opacity = "1";
    void ov.offsetWidth;
    ov.classList.add("fading");
    setTimeout(() => { if (done) done(); }, 1500);
  },

  /** Zeichnet den Drachen neu (zu Kampfbeginn). */
  buildHydra(boss) {
    this.els.hydraWrap.innerHTML = HydraArt.build(boss.heads);
    this.headEls = {};
    boss.heads.forEach(h => {
      const g = document.getElementById("head-" + h.headId);
      const fill = g ? g.querySelector(".head-bar-fill") : null;
      this.headEls[h.headId] = { group: g, barFill: fill };
    });
  },

  updateHead(head) {
    const ref = this.headEls[head.headId];
    if (!ref || !ref.group) return;
    const pct = Math.max(0, head.hp / head.maxHp);
    if (ref.barFill) ref.barFill.setAttribute("width", 52 * pct);

    // Zustand: >50% normal, >0 beschädigt, 0 tot (Skelett)
    ref.group.classList.remove("state-normal", "state-damaged", "state-dead");
    if (head.defeated || head.hp <= 0) {
      ref.group.classList.add("state-dead");
    } else if (pct <= 0.5) {
      ref.group.classList.add("state-damaged");
    } else {
      ref.group.classList.add("state-normal");
    }
  },

  /** Ein besiegter Kopf sinkt mitsamt seinem Hals langsam herab. */
  lowerStrand(headId) {
    const s = document.getElementById("strand-" + headId);
    if (s) s.classList.add("strand-down");
  },

  flashHead(headId, correct) {
    const ref = this.headEls[headId];
    if (ref && ref.group) Anim.flashHead(ref.group, correct);
  },

  setBossName(name) { this.els.bossName.textContent = name; },

  /** Gewählte Stufe im Kopfbereich anzeigen. */
  setDifficulty(diff) {
    const el = document.getElementById("diff-label");
    if (el) el.textContent = diff.label;
  },

  /** Fortschritt: nur richtige Diagnosen, dazu der Fehlerstand. */
  updateProgress(richtige, ziel, fehler, maxFehler) {
    const el = document.getElementById("progress-label");
    if (el) el.textContent = richtige + " / " + ziel;
    const f = document.getElementById("fehler-label");
    if (f) {
      f.textContent = "Fehler " + fehler + " / " + maxFehler;
      f.classList.toggle("fehler-kritisch", maxFehler - fehler <= 2);
    }
  },

  /** Die Hydra steigt aus den toten Leitungen auf: von unten, mit Beben. */
  playHydraRise(done) {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Die Ankunft startet bereits beim Aufbau der Grafik (CSS-Animation auf
    // .hydra-arrive). Hier wird nur abgewartet, bis sie durch ist.
    setTimeout(() => { if (done) done(); }, reduce ? 0 : 2000);
  },

  updateBossHp(hp, maxHp) {
    Anim.setBarPercent(this.els.bossHpFill, (hp / maxHp) * 100);
    this.els.bossHpLabel.textContent = `${Math.max(0, hp)} / ${maxHp}`;
  },

  /** Die Leiste steht senkrecht und leert sich von oben nach unten. */
  updatePlayerHp(hp, maxHp) {
    const el = this.els.playerHpFill;
    const pct = Math.max(0, Math.min(100, (hp / maxHp) * 100));
    if (el) {
      el.style.height = pct + "%";
      el.style.width = "100%";
      el.classList.toggle("bar-warn", pct <= 50 && pct > 20);
      el.classList.toggle("bar-danger", pct <= 20);
    }
    this.els.playerHpLabel.textContent = `${Math.max(0, hp)} / ${maxHp}`;
  },

  shakePlayer() { Anim.shake(this.els.playerHpWrap); },
  shakeBossRed() { Anim.shakeRed(this.els.hydraWrap); },
  /** Treffer am Boss: Schadenszahl über dem betroffenen Kopf. */
  floatDamage(headId, amount, kind, crit) {
    if (kind === "player") { this.showPlayerDamage(amount); return; }
    const el = document.getElementById("dmg-" + headId);
    if (!el) return;
    el.textContent = (crit ? "KRITISCH  -" : "-") + amount + " Lebenspunkte";
    el.setAttribute("class", "dmg-float dmg-boss" + (crit ? " dmg-crit" : ""));
    el.classList.remove("dmg-run");
    void el.getBoundingClientRect();
    el.classList.add("dmg-run");
  },

  /** Fehldiagnose: Zahl über der eigenen Leiste + roter Bildschirmblitz. */
  showPlayerDamage(amount) {
    const el = document.getElementById("player-dmg");
    if (el) {
      el.textContent = "-" + amount + " Lebenspunkte";
      el.classList.remove("dmg-run");
      void el.getBoundingClientRect();
      el.classList.add("dmg-run");
    }
    const flash = document.getElementById("hurt-flash");
    if (flash) {
      flash.classList.remove("hurt-run");
      void flash.getBoundingClientRect();
      flash.classList.add("hurt-run");
    }
  },

  showBossLine(text, onNext) {
    this.els.dialogueText.textContent = text;
    this.els.dialogueBox.hidden = false;
    this.els.questionBlock.hidden = true;
    this.els.resultBlock.hidden = true;
    Anim.fadeIn(this.els.dialogueBox);
    // Einmalig: mehrfaches Klicken darf den Ablauf nicht doppelt weiterschalten
    this.els.dialogueNext.onclick = () => {
      this.els.dialogueNext.onclick = null;
      if (onNext) onNext();
    };
  },

  showQuestion(question, onSelect) {
    this.els.dialogueBox.hidden = true;
    this.els.resultBlock.hidden = true;
    this.els.questionBlock.hidden = false;

    const kopf = document.querySelector(".symptom-heading");
    if (kopf) kopf.textContent = this.texte.symptomUeberschrift;

    if (this.els.answerNext) this.els.answerNext.hidden = true;
    this.els.symptomList.innerHTML = "";
    question.symptoms.forEach(s => {
      const li = document.createElement("li");
      li.textContent = s;
      this.els.symptomList.appendChild(li);
    });

    this.els.questionText.textContent = question.q;
    this.els.optionsGrid.innerHTML = "";

    /* Die Reihenfolge wird bei JEDER Anzeige neu gemischt, damit die richtige
       Antwort nicht an ihrer Position erkennbar ist. Gemischt wird nur die
       Darstellung: onSelect bekommt weiterhin den Index aus question.options,
       sodass die Spiellogik nichts von der Mischung merkt. */
    this.optionOrder = question.options.map((_, i) => i);
    for (let i = this.optionOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.optionOrder[i], this.optionOrder[j]] = [this.optionOrder[j], this.optionOrder[i]];
    }

    this.optionOrder.forEach((origIdx, pos) => {
      const opt = question.options[origIdx];
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.type = "button";
      btn.textContent = String.fromCharCode(65 + pos) + ") " + opt.t;
      btn.addEventListener("click", () => onSelect(origIdx));
      this.els.optionsGrid.appendChild(btn);
    });
    Anim.fadeIn(this.els.questionBlock);
  },

  lockOptions() {
    this.els.optionsGrid.querySelectorAll(".option-btn").forEach(b => (b.disabled = true));
  },
  /** Rechnet einen Index aus question.options auf die angezeigte Stelle um. */
  anzeigeStelle(idx) {
    return this.optionOrder ? this.optionOrder.indexOf(idx) : idx;
  },
  markOption(idx, correct) {
    const b = this.els.optionsGrid.querySelectorAll(".option-btn")[this.anzeigeStelle(idx)];
    if (b) b.classList.add(correct ? "option-correct" : "option-wrong");
  },
  revealCorrectOption(idx) {
    const b = this.els.optionsGrid.querySelectorAll(".option-btn")[this.anzeigeStelle(idx)];
    if (b) b.classList.add("option-correct");
  },

  /* Nach der Antwort wird NICHT sofort aufgelöst. Die markierten Antworten
     bleiben stehen, bis selbst weitergeklickt wird. Vorher verschwand die
     Frage nach einer halben Sekunde und man konnte nicht mehr nachsehen,
     was man eigentlich gewählt hatte. */
  showAnswerPause(onNext) {
    const b = this.els.answerNext;
    if (!b) { if (onNext) onNext(); return; }
    b.hidden = false;
    b.onclick = () => {
      b.onclick = null;
      b.hidden = true;
      if (onNext) onNext();
    };
    b.focus({ preventScroll: true });
  },

  showResult(correct, damage, crit, strike, explanation, merksatz, onContinue) {
    if (this.els.answerNext) this.els.answerNext.hidden = true;
    this.els.questionBlock.hidden = true;
    this.els.resultBlock.hidden = false;

    this.els.resultVerdict.textContent = correct
      ? (crit ? `Kritischer Treffer!  -${damage} HP` : `Treffer!  -${damage} HP`)
      : `${this.texte.urteilFalsch}  -${damage} HP`;
    this.els.resultVerdict.className = "result-verdict " + (correct ? "verdict-correct" : "verdict-wrong");

    this.els.resultStrike.textContent = strike || "";
    this.els.resultStrike.hidden = !correct || !strike;

    this.els.resultExplanation.textContent = explanation;
    this.els.resultMerksatz.textContent = merksatz ? "Merksatz: " + merksatz : "";
    this.els.resultMerksatz.hidden = !merksatz;

    Anim.fadeIn(this.els.resultBlock);
    // Einmalig, siehe showBossLine
    this.els.continueBtn.onclick = () => {
      this.els.continueBtn.onclick = null;
      if (onContinue) onContinue();
    };
  },

  /** SIEG: Die Hydra zerspringt in Nullen und Einsen.
   *  Auf SCHWER dreifache Detonation in vielen Farben. */
  playVictoryBurst(stufe, done) {
    const wrap = this.els.hydraWrap;
    const burst = document.getElementById("binary-burst");
    if (!wrap || !burst) { if (done) done(); return; }

    wrap.classList.add("hydra-explode");
    burst.innerHTML = "";

    const rect = wrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height * 0.55;

    const hart = stufe === "schwer";
    const wellen = hart ? 5 : 1;
    const proWelle = hart ? 170 : 190;
    const farben = hart
      ? ["#7dffa8", "#7fe0ff", "#ffd34d", "#ff7ad1", "#ff8a5c", "#c6a3ff",
         "#9dff5c", "#ff5f5f", "#5cf2ff", "#ffe98a"]
      : ["#7dffa8"];

    for (let w = 0; w < wellen; w++) {
      const verzug = w * 0.38;
      const reichweite = 1 + w * 0.38;
      for (let i = 0; i < proWelle; i++) {
        const bit = document.createElement("span");
        bit.className = "bit";
        bit.textContent = Math.random() < 0.5 ? "0" : "1";
        const sx = cx + (Math.random() - 0.5) * rect.width * 0.75;
        const sy = cy + (Math.random() - 0.5) * rect.height * 0.8;
        const ang = Math.atan2(sy - cy, sx - cx) + (Math.random() - 0.5) * 1.1;
        const dist = (140 + Math.random() * 560) * reichweite;
        bit.style.left = sx + "px";
        bit.style.top = sy + "px";
        bit.style.setProperty("--dx", Math.cos(ang) * dist + "px");
        bit.style.setProperty("--dy", (Math.sin(ang) * dist - 120) + "px");
        bit.style.setProperty("--rot", ((Math.random() - 0.5) * 900) + "deg");
        bit.style.fontSize = (10 + Math.random() * (hart ? 22 : 16)) + "px";
        const farbe = farben[Math.floor(Math.random() * farben.length)];
        bit.style.color = farbe;
        bit.style.textShadow = "0 0 10px " + farbe + ", 0 0 20px " + farbe;
        bit.style.animationDuration = (1.1 + Math.random() * 1.2) + "s";
        bit.style.animationDelay = (verzug + Math.random() * 0.3) + "s";
        burst.appendChild(bit);
      }
      if (hart) {
        const ring = document.createElement("span");
        ring.className = "shock";
        ring.style.left = cx + "px";
        ring.style.top = cy + "px";
        ring.style.borderColor = farben[w % farben.length];
        ring.style.animationDelay = verzug + "s";
        burst.appendChild(ring);

        const blitz = document.createElement("span");
        blitz.className = "flashwave";
        blitz.style.background = farben[(w + 3) % farben.length];
        blitz.style.animationDelay = (verzug + 0.05) + "s";
        burst.appendChild(blitz);

        // Funkenregen zusätzlich zu den Ziffern
        for (let f = 0; f < 40; f++) {
          const sp = document.createElement("span");
          sp.className = "spark";
          const a2 = Math.random() * Math.PI * 2;
          const dd = 200 + Math.random() * 620;
          sp.style.left = cx + "px";
          sp.style.top = cy + "px";
          sp.style.setProperty("--dx", Math.cos(a2) * dd + "px");
          sp.style.setProperty("--dy", Math.sin(a2) * dd + "px");
          const fc = farben[Math.floor(Math.random() * farben.length)];
          sp.style.background = fc;
          sp.style.boxShadow = "0 0 12px " + fc;
          sp.style.animationDelay = (verzug + Math.random() * 0.25) + "s";
          burst.appendChild(sp);
        }
      }
    }
    setTimeout(() => { if (done) done(); }, hart ? 3400 : 1500);
  },

  /** NIEDERLAGE: Die Hydra wächst über den ganzen Bildschirm, alles blinkt rot. */
  playDefeatOverwhelm(done) {
    const wrap = this.els.hydraWrap;
    const flash = document.getElementById("hurt-flash");
    const scene = document.getElementById("scene");
    if (wrap) wrap.classList.add("hydra-overwhelm");
    if (flash) flash.classList.add("hurt-blink");
    // Der Drache füllt den Schirm; danach den Textbereich abdunkeln,
    // damit der Neustart-Text darüber lesbar und klickbar bleibt.
    setTimeout(() => {
      if (scene) scene.classList.add("defeat-final");
      if (done) done();
    }, 2000);
  },

  /** Effekte zurücksetzen (Neustart). */
  resetEndEffects() {
    const wrap = this.els.hydraWrap;
    const burst = document.getElementById("binary-burst");
    const flash = document.getElementById("hurt-flash");
    if (wrap) wrap.classList.remove("hydra-explode", "hydra-overwhelm");
    const scene = document.getElementById("scene");
    if (scene) scene.classList.remove("defeat-final");
    if (burst) burst.innerHTML = "";
    if (flash) flash.classList.remove("hurt-blink", "hurt-run");
  },

  /* titel ist optional: { win, lose }. Ohne Angabe bleiben die Hydra-Texte. */
  showEnd(won, statsText, titel) {
    this.els.dialogueBox.hidden = true;
    this.els.questionBlock.hidden = true;
    this.els.resultBlock.hidden = true;
    this.els.endScreen.hidden = false;
    const w = (titel && titel.win) || "Netz-Hydra besiegt!";
    const l = (titel && titel.lose) || "Niedergeschlagen...";
    this.els.endTitle.textContent = won ? w : l;
    this.els.endTitle.className = "end-title " + (won ? "end-win" : "end-lose");
    this.els.endText.textContent = statsText;
  },
  hideEnd() {
    if (this.els.answerNext) this.els.answerNext.hidden = true;
    this.resetEndEffects();
    this.els.endScreen.hidden = true;
    this.els.dialogueBox.hidden = true;
    this.els.questionBlock.hidden = true;
    this.els.resultBlock.hidden = true;
  },
};
