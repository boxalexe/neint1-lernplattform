/*
 * golem-ui.js — Darstellungsschicht des RAID-Golems.
 *
 * Die gemeinsamen Elemente (Sprechblase, Frageblock, Ergebnisblock,
 * Spielerleiste, Boss-Leiste) gehören weiterhin UI aus ui.js und werden
 * hier nur benutzt. Alles, was den Golem selbst betrifft, steht hier.
 */

const GolemUI = {
  wrap: null,
  shields: 0,

  cache() {
    this.wrap = document.getElementById("golem-wrap");
  },

  /** Zeichnet eine Stufe komplett neu. */
  buildStage(stage) {
    if (!this.wrap) this.cache();
    this.wrap.innerHTML = GolemArt.build(stage);
    this.restoreShields();
  },

  reduziert() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },

  /* ---------- Treffer ---------- */

  /** Markiert die getroffenen Platten als zerstört. */
  strikeDisks(stage, hit) {
    const anzahl = (stage.gruppen || []).reduce((s, g) => s + g.disks.length, 0);
    const ids = hit === "alle" ? [...Array(anzahl).keys()] : (hit || []);
    ids.forEach((i, n) => {
      const el = document.getElementById("disk-" + i);
      if (!el) return;
      setTimeout(() => {
        el.classList.remove("disk-ok");
        el.classList.add("disk-lost", "disk-strike");
      }, this.reduziert() ? 0 : n * 90);
    });
    const body = document.getElementById("golem-body");
    if (body) Anim.pulse(body, "golem-hit", 520);
  },

  /** Fehlgriff: der Golem verhärtet sich sichtbar statt zu heilen. */
  harden() {
    const body = document.getElementById("golem-body");
    if (body) Anim.pulse(body, "golem-harden", 700);
    const ctrl = document.getElementById("golem-controller");
    if (ctrl) Anim.pulse(ctrl, "ctrl-flare", 700);
    if (this.shields < 3) {
      this.shields++;
      this.restoreShields();
      const el = document.getElementById("shield-" + (this.shields - 1));
      if (el) Anim.pulse(el, "shield-pop", 700);
    }
  },

  restoreShields() {
    for (let i = 0; i < 3; i++) {
      const el = document.getElementById("shield-" + i);
      if (el) el.classList.toggle("shield-on", i < this.shields);
    }
    const cap = document.getElementById("shield-caption");
    if (cap) cap.classList.toggle("caption-on", this.shields > 0);
  },

  resetShields() { this.shields = 0; },

  floatDamage(amount, kind) {
    if (kind === "player") { UI.showPlayerDamage(amount); return; }
    const el = document.getElementById("golem-dmg");
    if (!el) return;
    el.textContent = "-" + amount + " Lebenspunkte";
    el.classList.remove("dmg-run");
    void el.getBoundingClientRect();
    el.classList.add("dmg-run");
  },

  /* ---------- Degradation ---------- */

  /** Zeigt den Namen des Umbaus groß in der Mitte. */
  announceMove(name) {
    const el = document.getElementById("golem-move");
    if (!el) return;
    el.textContent = name;
    el.classList.remove("move-run");
    void el.getBoundingClientRect();
    el.classList.add("move-run");
  },

  /** Alte Stufe fällt in sich zusammen, neue Stufe baut sich auf. */
  degrade(nextStage, moveName, done) {
    const schnell = this.reduziert();
    this.announceMove(moveName);
    const body = document.getElementById("golem-body");
    if (body) body.classList.add("golem-collapse");

    setTimeout(() => {
      this.buildStage(nextStage);
      const neu = document.getElementById("golem-body");
      if (neu && !schnell) {
        neu.classList.add("golem-reform");
        setTimeout(() => neu.classList.remove("golem-reform"), 900);
      }
      if (done) done();
    }, schnell ? 0 : 900);
  },

  /* ---------- Ende ---------- */

  /** Sieg: der Golem zerspringt in Nullen und Einsen. */
  victory(stufe, done) {
    const wrap = this.wrap;
    const burst = document.getElementById("binary-burst");
    if (!wrap || !burst) { if (done) done(); return; }

    wrap.classList.add("golem-explode");
    burst.innerHTML = "";

    const rect = wrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height * 0.4;

    const hart = stufe === "schwer";
    const wellen = hart ? 4 : 1;
    const proWelle = hart ? 160 : 180;
    const farben = hart
      ? ["#7dffa8", "#7fe0ff", "#ffd34d", "#ff7ad1", "#ff8a5c", "#c6a3ff", "#9dff5c", "#5cf2ff"]
      : ["#7fe0ff"];

    for (let w = 0; w < wellen; w++) {
      const verzug = w * 0.4;
      const reichweite = 1 + w * 0.4;
      for (let i = 0; i < proWelle; i++) {
        const bit = document.createElement("span");
        bit.className = "bit";
        bit.textContent = Math.random() < 0.5 ? "0" : "1";
        const sx = cx + (Math.random() - 0.5) * rect.width * 0.6;
        const sy = cy + (Math.random() - 0.5) * rect.height * 0.6;
        const ang = Math.atan2(sy - cy, sx - cx) + (Math.random() - 0.5) * 1.1;
        const dist = (140 + Math.random() * 520) * reichweite;
        bit.style.left = sx + "px";
        bit.style.top = sy + "px";
        bit.style.setProperty("--dx", Math.cos(ang) * dist + "px");
        bit.style.setProperty("--dy", (Math.sin(ang) * dist - 110) + "px");
        bit.style.setProperty("--rot", ((Math.random() - 0.5) * 900) + "deg");
        bit.style.fontSize = (10 + Math.random() * (hart ? 20 : 15)) + "px";
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
      }
    }
    setTimeout(() => { if (done) done(); }, hart ? 3000 : 1500);
  },

  /** Niederlage: der Golem wälzt sich über den Bildschirm. */
  defeat(done) {
    const wrap = this.wrap;
    const flash = document.getElementById("hurt-flash");
    const scene = document.getElementById("scene");
    if (wrap) wrap.classList.add("golem-overwhelm");
    if (flash) flash.classList.add("hurt-blink");
    setTimeout(() => {
      if (scene) scene.classList.add("defeat-final");
      if (done) done();
    }, 2000);
  },

  reset() {
    const burst = document.getElementById("binary-burst");
    const flash = document.getElementById("hurt-flash");
    const scene = document.getElementById("scene");
    if (this.wrap) this.wrap.classList.remove("golem-explode", "golem-overwhelm");
    if (burst) burst.innerHTML = "";
    if (flash) flash.classList.remove("hurt-blink", "hurt-run");
    if (scene) scene.classList.remove("defeat-final");
    this.resetShields();
  },

  clear() {
    if (!this.wrap) this.cache();
    if (this.wrap) this.wrap.innerHTML = "";
  },
};
