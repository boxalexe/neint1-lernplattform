/*
 * animations.js — Reine Hilfsfunktionen, keine eigene State-Haltung.
 * Alles hier arbeitet mit CSS-Klassen (siehe style.css, Abschnitt "Animationen")
 * statt mit inline-Styles, damit das Timing an einer Stelle (CSS) bleibt.
 */

const Anim = {
  /** Kurzes Aufblitzen einer Klasse, entfernt sie automatisch wieder. */
  pulse(el, className, duration = 400) {
    if (!el) return;
    el.classList.remove(className);
    // erzwingt reflow, damit die Klasse bei wiederholtem Aufruf neu triggert
    void el.offsetWidth;
    el.classList.add(className);
    setTimeout(() => el.classList.remove(className), duration);
  },

  /** Wackeln, z. B. wenn der Spieler getroffen wird. */
  shake(el) {
    this.pulse(el, "is-shaking", 350);
  },

  /** Boss vibriert und blitzt rot auf — bei jeder richtigen Antwort. */
  shakeRed(el) {
    this.pulse(el, "is-shaking-red", 450);
  },

  /** Treffer am Kopf: rot aufleuchten + vibrieren (richtig) bzw. kurz zucken (falsch). */
  flashHead(headEl, correct) {
    this.pulse(headEl, correct ? "head-hit-red" : "head-hit-wrong", 620);
  },

  /** Fliegende Schadenszahl, die nach oben schwebt und verblasst. */
  floatDamageNumber(hostEl, amount, kind) {
    if (!hostEl) return;
    const num = document.createElement("span");
    num.className = `damage-number damage-${kind}`;
    num.textContent = (kind === "heal" ? "+" : "-") + amount;
    hostEl.appendChild(num);
    num.addEventListener("animationend", () => num.remove());
  },

  /** HP-Balken auf einen neuen Prozentwert bringen (CSS transition übernimmt das Gleiten). */
  setBarPercent(barFillEl, percent) {
    if (!barFillEl) return;
    const clamped = Math.max(0, Math.min(100, percent));
    barFillEl.style.width = clamped + "%";
    barFillEl.classList.toggle("bar-warn", clamped <= 50 && clamped > 20);
    barFillEl.classList.toggle("bar-danger", clamped <= 20);
  },

  /** Kopf "besiegt" ausblenden. */
  defeatHead(headGroupEl) {
    if (!headGroupEl) return;
    headGroupEl.classList.add("head-defeated");
  },

  /** Kurzes Fade-In für neu eingeblendete Dialog-/Fragetexte. */
  fadeIn(el) {
    this.pulse(el, "is-fading-in", 300);
  },
};
