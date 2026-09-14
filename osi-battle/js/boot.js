/*
 * boot.js — Ablaufsteuerung über beide Bosse.
 *
 * BILDSCHIRMFOLGE
 *   Bossauswahl  ->  Schwierigkeit  ->  Kampf
 *   "Neu" im Kampf führt nach Rückfrage zurück zur BOSSAUSWAHL,
 *   nicht zur Schwierigkeit. "Noch mal" am Kampfende ebenso.
 *
 * Die beiden Bosse haben getrennte Schwierigkeitstabellen, weil sie
 * unterschiedlich lange Kämpfe sind: die Hydra zählt Diagnosen, der
 * Golem zählt Stufen. Der Schwierigkeitsschirm wird deshalb je Boss
 * neu befüllt statt fest im HTML zu stehen.
 */

const Boot = {
  bossScreen: null,
  diffScreen: null,
  aktiverBoss: null,

  BOSSES_UI: {
    "netz-hydra": {
      titel: "NETZ-HYDRA",
      sub: "Sieben Köpfe, sieben Schichten. Wähle, wie zäh das Ungeheuer sein soll.",
      wrap: "hydra-wrap",
      tabelle: () => DIFFICULTIES,
      meta: d => d.fragen + " richtige Diagnosen",
      desc: d => d.beschreibung,
      texte: { symptomUeberschrift: "Symptome", urteilFalsch: "Fehldiagnose!" },
      regel: null,
      start: key => Game.start("netz-hydra", key),
    },
    "raid-golem": {
      titel: "RAID-GOLEM",
      sub: "Von RAID 50 hinunter bis zum Controller. Wähle, wie viele Treffer je Stufe nötig sind.",
      wrap: "golem-wrap",
      tabelle: () => GOLEM_DIFFICULTIES,
      meta: d => d.meta,
      desc: d => d.desc,
      // Beim Golem sind es keine Krankheitszeichen, sondern Eckdaten des
      // Verbunds, und eine falsche Wahl ist keine Fehldiagnose.
      texte: { symptomUeberschrift: "Symptome / Informationen",
               urteilFalsch: "Suche die Katastrophe!" },
      regel: () => GOLEM_BOSS.regelKurz,
      start: key => GolemGame.start(key),
    },
  },

  init() {
    UI.cache();
    GolemUI.cache();
    this.bossScreen = document.getElementById("boss-screen");
    this.diffScreen = document.getElementById("difficulty-screen");

    document.querySelectorAll(".boss-btn").forEach(btn => {
      btn.addEventListener("click", () => this.waehleBoss(btn.dataset.boss));
    });

    document.querySelectorAll("#difficulty-screen .diff-btn").forEach(btn => {
      btn.addEventListener("click", () => this.starteKampf(btn.dataset.diff));
    });

    const zurück = document.getElementById("diff-back");
    if (zurück) zurück.addEventListener("click", () => this.zurBossauswahl());

    this.bindRestart();
  },

  /* ---------- Bildschirme ---------- */

  zeige(screen) {
    [this.bossScreen, this.diffScreen].forEach(s => {
      if (s) s.classList.toggle("is-hidden", s !== screen);
    });
  },

  /** Kampf läuft, wenn kein Auswahlschirm sichtbar ist. */
  kampfLaeuft() {
    return (
      this.bossScreen.classList.contains("is-hidden") &&
      this.diffScreen.classList.contains("is-hidden")
    );
  },

  waehleBoss(id) {
    const cfg = this.BOSSES_UI[id];
    if (!cfg) return;
    this.aktiverBoss = id;

    document.getElementById("diff-screen-title").textContent = cfg.titel;
    document.getElementById("diff-screen-sub").textContent = cfg.sub;

    const tab = cfg.tabelle();
    document.querySelectorAll("#difficulty-screen .diff-btn").forEach(btn => {
      const d = tab[btn.dataset.diff];
      if (!d) return;
      btn.querySelector('[data-slot="meta"]').textContent = cfg.meta(d);
      btn.querySelector('[data-slot="desc"]').textContent = cfg.desc(d);
    });

    const hinweis = document.getElementById("diff-regel");
    if (hinweis) {
      const text = cfg.regel ? cfg.regel() : null;
      hinweis.textContent = text || "";
      hinweis.hidden = !text;
    }

    this.zeige(this.diffScreen);
  },

  starteKampf(diffKey) {
    const cfg = this.BOSSES_UI[this.aktiverBoss];
    if (!cfg) return;

    // Nur die Bühne des gewählten Bosses steht im Bild.
    Object.values(this.BOSSES_UI).forEach(b => {
      const el = document.getElementById(b.wrap);
      if (el) el.hidden = b.wrap !== cfg.wrap;
    });
    document.getElementById("console-title").textContent = cfg.titel;
    UI.setBossTexte(cfg.texte);

    this.zeige(null);
    cfg.start(diffKey);
  },

  zurBossauswahl() {
    UI.resetEndEffects();
    GolemUI.reset();
    GolemUI.clear();
    UI.hideEnd();
    const hy = document.getElementById("hydra-wrap");
    if (hy) { hy.hidden = true; hy.innerHTML = ""; }
    this.aktiverBoss = null;
    this.zeige(this.bossScreen);
  },

  /* ---------- Neu / Noch mal ---------- */

  bindRestart() {
    const box = document.getElementById("confirm-overlay");
    const oeffne = () => { if (box) box.hidden = false; };
    const schliesse = () => { if (box) box.hidden = true; };

    document.getElementById("restart-btn").addEventListener("click", () => {
      if (!this.kampfLaeuft()) return;   // ohne laufenden Kampf keine Rückfrage
      oeffne();
    });

    const ja = document.getElementById("confirm-yes");
    const nein = document.getElementById("confirm-no");
    if (ja) ja.addEventListener("click", () => { schliesse(); this.zurBossauswahl(); });
    if (nein) nein.addEventListener("click", schliesse);
    if (box) box.addEventListener("click", e => { if (e.target === box) schliesse(); });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && box && !box.hidden) schliesse();
    });

    const endBtn = document.getElementById("end-restart-btn");
    if (endBtn) endBtn.addEventListener("click", () => this.zurBossauswahl());
  },
};

document.addEventListener("DOMContentLoaded", () => Boot.init());
