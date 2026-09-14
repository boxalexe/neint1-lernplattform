/*
 * hydra-art.js — Netz-Hydra, detaillierter Endboss-Drache.
 *
 * PERFORMANCE-REGEL: KEINE SVG-Filter (feGaussianBlur/feDropShadow) und
 * keine animierten CSS-filter. Glow wird über gestapelte, halbtransparente
 * Formen erzeugt. Das hielt den Browser vorher an.
 *
 * Detailebene: Schuppenreihen, Rückenkamm, Halsringe, Kiefer mit Zähnen,
 * segmentierte Flügelmembran, Krallen.
 * Routing bleibt zentraler Boss-Kopf. Jeder Kopf: 2 Augen, eigenes Profil.
 */

const HydraArt = {
  PROFILE_BY_HEAD: {
    l1: "p_l1", l2: "p_l2", l3: "p_l3", l4: "p_l4",
    l5: "p_l5", l6: "p_l6", l7: "p_l7",
  },
  HEADTOP_BY_PROFILE: {
    p_l1: -62, p_l2: -70, p_l3: -66, p_l4: -104,
    p_l5: -74, p_l6: -58, p_l7: -80,
  },

  // Breiteres Feld (viewBox 1400x820) -> Drache bekommt mehr Raum.
  necks: [
    { sx: 637, sy: 558, c1x: 380, c1y: 470, c2x: 250, c2y: 330, hx: 232, hy: 278, yaw: 22,  tilt: -7, scale: 1.25, breathDur: 4.0, breathDelay: 0.0 },
    { sx: 655, sy: 540, c1x: 490, c1y: 380, c2x: 408, c2y: 232, hx: 392, hy: 206, yaw: 15,  tilt: -4, scale: 1.31, breathDur: 4.6, breathDelay: 0.7 },
    { sx: 674, sy: 526, c1x: 610, c1y: 342, c2x: 574, c2y: 190, hx: 570, hy: 166, yaw: 8,   tilt: -2, scale: 1.34, labelDx: -40, breathDur: 3.7, breathDelay: 1.3 },
    { sx: 700, sy: 518, c1x: 700, c1y: 345, c2x: 700, c2y: 225, hx: 700, hy: 232,  yaw: 0,   tilt: 0,  scale: 1.46, breathDur: 4.3, breathDelay: 0.3 },
    { sx: 726, sy: 526, c1x: 792, c1y: 344, c2x: 830, c2y: 188, hx: 838, hy: 170, yaw: -10, tilt: 3,  scale: 1.32, breathDur: 4.9, breathDelay: 1.6 },
    { sx: 745, sy: 540, c1x: 912, c1y: 378, c2x: 992, c2y: 228, hx: 1012, hy: 198, yaw: -16, tilt: 5, scale: 1.28, breathDur: 3.9, breathDelay: 0.9 },
    { sx: 763, sy: 558, c1x: 1022, c1y: 468, c2x: 1152, c2y: 328, hx: 1168, hy: 272, yaw: -24, tilt: 8, scale: 1.23, breathDur: 4.5, breathDelay: 0.2 },
  ],

  /* Kopfprofile: kantig, mit Kiefer + Zähnen. Keine Augen (kommen zentral). */
  /*
   * HEAD_PROFILES — sieben klar unterschiedliche Schädelgeometrien.
   * Alle mit kantiger Profil-Schnauze und BÖSEM BLICK: die Braue ist ein
   * kräftiger Keil, der schräg über das Auge greift (browL/browR je Profil).
   * eyeTilt kippt die Augen nach innen-unten -> finsterer Ausdruck.
   */
  HEAD_PROFILES: {
    // L1 Bitübertragung — flacher, breiter Keilschädel, zwei kurze Stummelhörner
    p_l1: { eyeY: -4, eyeDx: 8, r: 1.0, eyeTilt: 16, body: `
      <path class="dragon-horn" d="M -20 -12 L -30 -38 L -12 -22 Z"/>
      <path class="dragon-horn" d="M 16 -14 L 28 -40 L 10 -24 Z"/>
      <path class="dragon-skin" d="M -28 -6 L -24 12 L -6 26 L 6 30 L 18 24 L 28 4 L 22 -14 L 2 -24 L -18 -18 Z"/>
      <path class="dragon-skin" d="M -6 26 L -4 40 L 10 52 L 20 42 L 19 26 L 6 32 Z"/>
      <path class="scale-row" d="M -22 2 l 7 4 l 7 -4 l 7 4 l 7 -4 l 7 4"/>
      <ellipse class="dragon-nostril" cx="-5" cy="27.0" rx="1.7" ry="1.1"/>
      <ellipse class="dragon-nostril" cx="5" cy="27.0" rx="1.7" ry="1.1"/>
      <path class="dragon-teeth" d="M -2 38 l 4 8 l 3 -7 l 4 8 l 3 -7"/>
      <path class="dragon-crest" d="M 22 -14 L 32 0 L 26 18"/>` },

    // L2 Sicherung — hoher schmaler Schädel, Zackenkamm über dem Scheitel
    p_l2: { eyeY: -6, eyeDx: 7, r: 0.98, eyeTilt: 20, body: `
      <path class="dragon-horn" d="M -18 -16 L -24 -44 L -12 -28 Z"/>
      <path class="dragon-horn" d="M -6 -22 L -8 -54 L 2 -30 Z"/>
      <path class="dragon-horn" d="M 8 -22 L 14 -50 L 16 -28 Z"/>
      <path class="dragon-horn" d="M 20 -14 L 30 -40 L 24 -22 Z"/>
      <path class="dragon-skin" d="M -22 -12 L -19 10 L -5 27 L 5 33 L 16 26 L 25 4 L 20 -20 L 1 -30 L -14 -26 Z"/>
      <path class="dragon-skin" d="M -5 27 L -3 45 L 8 58 L 18 46 L 17 29 L 5 34 Z"/>
      <path class="scale-row" d="M -17 -2 l 6 4 l 6 -4 l 6 4 l 6 -4"/>
      <ellipse class="dragon-nostril" cx="-5" cy="31.0" rx="1.7" ry="1.1"/>
      <ellipse class="dragon-nostril" cx="5" cy="31.0" rx="1.7" ry="1.1"/>
      <path class="dragon-teeth" d="M -2 42 l 3 8 l 3 -7 l 4 8 l 3 -7"/>
      <path class="dragon-crest" d="M 20 -20 L 30 -4 L 24 16"/>` },

    // L3 Vermittlung — geschwungene Widderhörner, mittelhoher Schädel
    p_l3: { eyeY: -5, eyeDx: 8, r: 1.02, eyeTilt: 18, body: `
      <path class="dragon-horn" d="M -18 -14 C -34 -22, -42 -12, -38 2 C -34 -8, -26 -14, -14 -22 Z"/>
      <path class="dragon-horn" d="M 16 -16 C 32 -24, 40 -14, 36 0 C 32 -10, 24 -16, 12 -24 Z"/>
      <path class="dragon-horn dragon-horn-sm" d="M -3 -24 L 0 -48 L 5 -26 Z"/>
      <path class="dragon-skin" d="M -25 -10 L -22 11 L -6 28 L 5 33 L 17 26 L 27 4 L 21 -18 L 2 -28 L -16 -22 Z"/>
      <path class="dragon-skin" d="M -6 28 L -4 45 L 9 58 L 19 46 L 18 29 L 6 35 Z"/>
      <path class="scale-row" d="M -19 0 l 7 4 l 7 -4 l 7 4 l 7 -4 l 7 4"/>
      <ellipse class="dragon-nostril" cx="-5" cy="31.0" rx="1.7" ry="1.1"/>
      <ellipse class="dragon-nostril" cx="5" cy="31.0" rx="1.7" ry="1.1"/>
      <path class="dragon-teeth" d="M -3 42 l 4 8 l 3 -7 l 4 8 l 3 -7"/>
      <path class="dragon-crest" d="M 21 -18 L 32 -2 L 26 17"/>` },

    // L4 Transport — ZENTRALKOPF: größter Schädel, verzweigtes Geweih
    p_l4: { eyeY: -8, eyeDx: 10, r: 1.04, boss: true, eyeTilt: 20, body: `
      <path class="dragon-horn" d="M -22 -22 L -38 -50 L -50 -86 L -38 -64 L -24 -52 L -34 -82 L -26 -98 L -16 -64 L -11 -41 Z"/>
      <path class="dragon-horn" d="M 20 -24 L 36 -52 L 48 -88 L 36 -66 L 22 -54 L 32 -84 L 24 -100 L 14 -66 L 10 -43 Z"/>
      <path class="dragon-horn" d="M -4 -28 L 0 -72 L 6 -30 Z"/>
      <path class="dragon-horn dragon-horn-sm" d="M -14 -26 L -13 -46 L -8 -28 Z"/>
      <path class="dragon-horn dragon-horn-sm" d="M 14 -27 L 14 -47 L 9 -29 Z"/>
      <path class="dragon-skin dragon-skin-boss" d="M -31 -16 L -27 10 L -9 32 L 0 51 L 14 33 L 33 10 L 29 -22 L 4 -37 L -18 -33 Z"/>
      <path class="dragon-skin dragon-skin-boss" d="M -9 32 L -7 53 L 8 72 L 21 55 L 20 35 L 6 42 Z"/>
      <path class="scale-row" d="M -25 -4 l 8 5 l 8 -5 l 8 5 l 8 -5 l 8 5"/>
      <ellipse class="dragon-nostril" cx="-5" cy="43.0" rx="1.7" ry="1.1"/>
      <ellipse class="dragon-nostril" cx="5" cy="43.0" rx="1.7" ry="1.1"/>
      <path class="dragon-teeth" d="M -5 54 l 5 9 l 4 -8 l 5 9 l 4 -8 l 4 8"/>
      <path class="dragon-jawline" d="M -9 34 L 4 46 L 20 37"/>
      <path class="dragon-crest" d="M 29 -22 L 43 -4 L 35 22"/>
      <path class="dragon-crest" d="M -31 -16 L -43 -2 L -35 24"/>` },

    // L5 Sitzung — extrem langgezogener schmaler Schädel, ein Paar dünner Spieße
    p_l5: { eyeY: -6, eyeDx: 6, r: 0.94, eyeTilt: 22, body: `
      <path class="dragon-horn" d="M -12 -20 L -18 -52 L -24 -74 L -14 -50 L -6 -30 Z"/>
      <path class="dragon-horn" d="M 10 -22 L 16 -54 L 22 -76 L 12 -52 L 4 -32 Z"/>
      <path class="dragon-skin" d="M -18 -14 L -15 6 L -5 24 L 2 46 L 12 34 L 20 6 L 15 -20 L 0 -30 L -11 -26 Z"/>
      <path class="dragon-skin" d="M -5 24 L -3 48 L 5 62 L 11 50 L 11 32 Z"/>
      <path class="scale-row" d="M -13 -4 l 5 4 l 5 -4 l 5 4 l 5 -4"/>
      <ellipse class="dragon-nostril" cx="-5" cy="37.0" rx="1.7" ry="1.1"/>
      <ellipse class="dragon-nostril" cx="5" cy="37.0" rx="1.7" ry="1.1"/>
      <path class="dragon-teeth" d="M -2 48 l 3 8 l 3 -7 l 3 8"/>
      <path class="dragon-crest" d="M 15 -20 L 25 -6 L 20 12"/>` },

    // L6 Darstellung — gedrungener, fast rechteckiger Schädel, Hörnerkranz flach
    p_l6: { eyeY: -3, eyeDx: 9, r: 1.08, eyeTilt: 14, body: `
      <path class="dragon-horn" d="M -24 -10 L -40 -18 L -44 -4 L -30 -10 Z"/>
      <path class="dragon-horn" d="M 22 -12 L 38 -20 L 42 -6 L 28 -12 Z"/>
      <path class="dragon-horn dragon-horn-sm" d="M -6 -18 L -4 -36 L 2 -20 Z"/>
      <path class="dragon-horn dragon-horn-sm" d="M 8 -18 L 12 -34 L 14 -20 Z"/>
      <path class="dragon-skin" d="M -30 -4 L -28 14 L -8 28 L 6 32 L 20 26 L 30 6 L 26 -12 L 4 -22 L -20 -16 Z"/>
      <path class="dragon-skin" d="M -8 28 L -6 42 L 10 54 L 22 42 L 21 27 L 6 34 Z"/>
      <path class="scale-row" d="M -24 4 l 8 4 l 8 -4 l 8 4 l 8 -4 l 8 4"/>
      <ellipse class="dragon-nostril" cx="-5" cy="29.0" rx="1.7" ry="1.1"/>
      <ellipse class="dragon-nostril" cx="5" cy="29.0" rx="1.7" ry="1.1"/>
      <path class="dragon-teeth" d="M -3 40 l 4 8 l 4 -7 l 4 8 l 4 -7"/>
      <path class="dragon-crest" d="M 26 -12 L 36 2 L 30 20"/>` },

    // L7 Anwendung — hoher Kronenschädel, lange gefiederte Doppelhörner
    p_l7: { eyeY: -6, eyeDx: 7.5, r: 1.0, eyeTilt: 18, body: `
      <path class="dragon-horn" d="M -16 -18 L -24 -38 L -34 -66 L -22 -48 L -24 -78 L -12 -50 L -7 -30 Z"/>
      <path class="dragon-horn" d="M 14 -20 L 22 -40 L 32 -68 L 20 -50 L 22 -80 L 10 -52 L 5 -32 Z"/>
      <path class="dragon-skin" d="M -23 -12 L -20 9 L -6 26 L 4 42 L 15 31 L 24 6 L 18 -20 L 1 -30 L -14 -25 Z"/>
      <path class="dragon-skin" d="M -6 26 L -4 45 L 7 58 L 14 46 L 14 31 Z"/>
      <path class="scale-row" d="M -17 -2 l 6 4 l 6 -4 l 6 4 l 6 -4"/>
      <ellipse class="dragon-nostril" cx="-5" cy="33.0" rx="1.7" ry="1.1"/>
      <ellipse class="dragon-nostril" cx="5" cy="33.0" rx="1.7" ry="1.1"/>
      <path class="dragon-teeth" d="M -2 44 l 3 8 l 3 -7 l 4 8"/>
      <path class="dragon-crest" d="M 18 -20 L 29 -4 L 23 15"/>` },
  },

  /** Auge: gekippt (böser Blick), statischer Glow, zufälliges Blinzeln.
   *  blink* wird pro Auge individuell gesetzt, damit kein Rhythmus entsteht. */
  eyeMarkup(cx, cy, rx, ry, tilt, blinkDur, blinkDelay) {
    return `
      <g class="eye-group" transform="translate(${cx} ${cy}) rotate(${tilt})">
        <ellipse class="eye-glow-outer" cx="0" cy="0" rx="${rx*2.1}" ry="${ry*2.1}"/>
        <ellipse class="eye-glow-mid" cx="0" cy="0" rx="${rx*1.5}" ry="${ry*1.5}"/>
        <path class="dragon-eye-socket" d="M ${-rx-2} 0 L ${-rx*0.4} ${-ry-2} L ${rx*0.6} ${-ry-1} L ${rx+2} 0 L ${rx*0.4} ${ry+1} L ${-rx*0.6} ${ry} Z"/>
        <g class="eye-blink" style="animation-duration:${blinkDur}s; animation-delay:${blinkDelay}s">
          <ellipse class="dragon-eye" cx="0" cy="0" rx="${rx}" ry="${ry}"/>
          <ellipse class="dragon-eye-pupil" cx="0" cy="0" rx="${Math.max(1.3,rx*0.26)}" ry="${ry*0.82}"/>
          <ellipse class="eye-spark" cx="${-rx*0.3}" cy="${-ry*0.4}" rx="${rx*0.22}" ry="${ry*0.22}"/>
        </g>
      </g>`;
  },

  /** Böse Braue: keilförmig, innen tief an der Nasenwurzel, nach außen
   *  ansteigend. Das ergibt den zusammengezogenen, finsteren Blick. */
  browMarkup(eyeDx, eyeY, rx) {
    const innerX = eyeDx * 0.35;          // nah an der Mitte
    const outerX = eyeDx + rx * 1.9;      // über dem äußeren Augenwinkel
    const innerY = eyeY - rx * 0.55;      // innen TIEF, aber über dem Auge
    const outerY = eyeY - rx * 2.1;       // außen HOCH
    const t = rx * 0.7;                   // Dicke der Braue
    const left = `M ${-innerX} ${innerY} L ${-outerX} ${outerY} L ${-outerX} ${outerY + t} L ${-innerX} ${innerY + t} Z`;
    const right = `M ${innerX} ${innerY} L ${outerX} ${outerY} L ${outerX} ${outerY + t} L ${innerX} ${innerY + t} Z`;
    return `<path class="dragon-brow evil-brow" d="${left}"/><path class="dragon-brow evil-brow" d="${right}"/>`;
  },

  /** Zufällige Kratzer und Blutspritzer: unterschiedliche Längen,
   *  Winkel und Rottöne, dazu ein paar pixelige Tropfen. */
  scarMarkup() {
    const rot = ["#e23b3b", "#c31f1f", "#ff5a5a", "#a41414", "#f2703a"];
    const r = (a, b) => a + Math.random() * (b - a);
    let out = "";
    const anzahl = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < anzahl; i++) {
      const x0 = r(-20, 14), y0 = r(-20, 6);
      const laenge = r(10, 26);
      const winkel = r(-1.2, 1.2);
      const x1 = x0 + Math.cos(winkel) * laenge;
      const y1 = y0 + Math.sin(winkel) * laenge;
      const knick = Math.random() < 0.55;
      const d = knick
        ? `M ${x0.toFixed(1)} ${y0.toFixed(1)} L ${((x0+x1)/2+r(-4,4)).toFixed(1)} ${((y0+y1)/2+r(-3,3)).toFixed(1)} L ${x1.toFixed(1)} ${y1.toFixed(1)}`
        : `M ${x0.toFixed(1)} ${y0.toFixed(1)} L ${x1.toFixed(1)} ${y1.toFixed(1)}`;
      out += `<path class="dragon-scar" d="${d}" style="stroke:${rot[Math.floor(Math.random()*rot.length)]};stroke-width:${r(1.6,3.2).toFixed(1)}"/>`;
    }
    const tropfen = 2 + Math.floor(Math.random() * 4);
    for (let i = 0; i < tropfen; i++) {
      const s = r(1.4, 3.0);
      out += `<rect class="blood-drop" x="${r(-20,16).toFixed(1)}" y="${r(-14,20).toFixed(1)}" width="${s.toFixed(1)}" height="${s.toFixed(1)}" style="fill:${rot[Math.floor(Math.random()*rot.length)]}"/>`;
    }
    return out;
  },

  headMarkup(headId, info, n, profileName, headTop) {
    const p = this.HEAD_PROFILES[profileName] || this.HEAD_PROFILES.p_dhcp;
    const counter = -(n.yaw);
    const rx = 5.2 * p.r, ry = 3.1 * p.r;
    const tilt = p.eyeTilt || 16;
    // Blinzeln: BEIDE Augen eines Kopfes teilen sich Takt und Verzögerung
    // (Augenpaar blinzelt gemeinsam), aber jeder Kopf bekommt eigene
    // Zufallswerte -> insgesamt kein gemeinsamer Rhythmus.
    const rnd = (a2, b2) => (a2 + Math.random() * (b2 - a2)).toFixed(2);
    const blinkDur = rnd(3.4, 9.5);
    const blinkDelay = rnd(0, 8);
    const eyes =
      this.eyeMarkup(-p.eyeDx, p.eyeY, rx, ry,  tilt, blinkDur, blinkDelay) +
      this.eyeMarkup( p.eyeDx, p.eyeY, rx, ry, -tilt, blinkDur, blinkDelay);
    const barY = headTop - 22;

    return `
    <g class="hydra-head state-normal breathing" id="head-${headId}" data-head="${headId}"
       style="animation-duration:${n.breathDur}s; animation-delay:${n.breathDelay}s">
      <g class="head-alive">
        ${p.body}
        ${eyes}
        ${this.browMarkup(p.eyeDx, p.eyeY, rx)}
      </g>
      <g class="head-scars">${this.scarMarkup()}</g>
      <g class="head-dead">
        <path class="skull-shape" d="M -21 -12 L -17 9 L -4 25 L 0 27 L 7 25 L 21 6 L 17 -15 L 0 -27 L -15 -23 Z"/>
        <path class="skull-shape" d="M -4 25 L -2 38 L 7 46 L 13 37 L 11 25 Z"/>
        <path class="skull-eye" d="M -14 -6 L -5 -11 L -1 -4 L -10 1 Z"/>
        <path class="skull-eye" d="M 3 -5 L 12 -10 L 16 -3 L 7 2 Z"/>
        <path class="skull-crack" d="M 0 -25 L 2 -8 L -4 3"/>
        <path class="skull-teeth" d="M -10 25 L -7 34 L -3 25 L 1 34 L 5 25 L 9 33"/>
      </g>
      <g class="head-hpbar" transform="translate(0,${barY}) rotate(${counter})">
        <rect class="head-bar-bg" x="-30" y="0" width="60" height="8" rx="2"/>
        <rect class="head-bar-fill" x="-30" y="0" width="60" height="8" rx="2"/>
      </g>
      <text class="dmg-float" id="dmg-${headId}" x="0" y="${barY + 26}" transform="rotate(${counter})"></text>
      <g class="head-tag-group" transform="translate(${n.labelDx || 0},${barY - 7}) rotate(${counter})">
        <text class="head-tag head-tag-name" x="0" y="-1">${info.short}</text>
      </g>
    </g>`;
  },

  build(heads) {
    // Köpfe in natürlicher Schichtreihenfolge L1..L7 von links nach rechts.
    // Index 3 (Mitte) ist die größte Position und trägt damit L4 Transport.
    const seq = heads.slice(0, 7);

    const strandsSvg = [];
    seq.forEach((h, i) => {
      const n = this.necks[i] || this.necks[0];
      const info = getHeadInfo(h.headId);
      const profile = this.PROFILE_BY_HEAD[h.headId] || "p_dhcp";
      const headTop = this.HEADTOP_BY_PROFILE[profile] || -74;
      const path = `M ${n.sx} ${n.sy} C ${n.c1x} ${n.c1y}, ${n.c2x} ${n.c2y}, ${n.hx} ${n.hy}`;
      const boss = profile === "p_routing";
      const w = boss ? 40 : 29;

      // Hals und Kopf bilden einen Strang, der sich beim Fallen senkt.
      // Drehpunkt ist der Ansatz am Körper.
      strandsSvg.push(`
        <g class="hydra-strand" id="strand-${h.headId}" style="transform-origin:${n.sx}px ${n.sy}px">
          <path class="hydra-neck-outline" d="${path}" style="stroke-width:${w+6}px"/>
          <path class="hydra-neck" d="${path}" style="stroke-width:${w}px"/>
          <path class="hydra-neck-belly" d="${path}" style="stroke-width:${w*0.42}px"/>
          <path class="hydra-neck-rings" d="${path}" style="stroke-width:${w}px"/>
          <path class="hydra-neck-spine" d="${path}" style="stroke-width:${w*0.9}px"/>
          <g transform="translate(${n.hx} ${n.hy}) rotate(${n.tilt}) scale(${n.scale})">
            <g transform="rotate(${n.yaw})">
              ${this.headMarkup(h.headId, info, n, profile, headTop)}
            </g>
          </g>
        </g>`);
    });

    return `
    <svg id="hydra-svg" viewBox="0 0 1400 830" preserveAspectRatio="xMidYMax meet" role="img"
         aria-label="Netz-Hydra: gewaltiger weißer siebenköpfiger Drache, Endboss">
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="44%" r="72%">
          <stop offset="0%" stop-color="#1d2c56"/><stop offset="52%" stop-color="#0d1730"/><stop offset="100%" stop-color="#05080f"/>
        </radialGradient>
        <linearGradient id="bodyGrad" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stop-color="#ffffff"/><stop offset="45%" stop-color="#e2eaf8"/><stop offset="100%" stop-color="#93a5c9"/>
        </linearGradient>
        <linearGradient id="bodyGradBoss" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stop-color="#ffffff"/><stop offset="45%" stop-color="#edf3ff"/><stop offset="100%" stop-color="#a6b8dc"/>
        </linearGradient>
        <linearGradient id="bellyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fdfeff"/><stop offset="100%" stop-color="#cfd9ec"/>
        </linearGradient>
        <linearGradient id="wingGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#dbe4f4"/><stop offset="100%" stop-color="#7385ab"/>
        </linearGradient>
        <linearGradient id="wingMembrane" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stop-color="#b9c7e4"/><stop offset="100%" stop-color="#465892"/>
        </linearGradient>
      </defs>


      <g class="hydra-stage-shift" transform="translate(0,14)">
      <!-- Bodennebel/Standfläche -->
      <ellipse class="ground-haze" cx="700" cy="776" rx="340" ry="32"/>

      <!-- ===== FLÜGEL ===== -->
      <g class="hydra-arrive">
      <g class="hydra-wings">
        <path class="wing-arm" d="M 648 496 C 500 448, 350 392, 218 306 C 172 276, 128 232, 104 178 C 186 268, 306 330, 442 384 C 520 414, 606 456, 648 496 Z"/>
        <path class="wing-membrane" d="M 104 178 C 208 288, 348 358, 486 402 C 442 418, 372 430, 314 450 C 384 466, 468 468, 534 446 C 486 472, 428 502, 370 532 C 452 532, 542 500, 594 452 C 556 492, 510 530, 456 566 C 548 556, 626 502, 654 442 C 544 412, 428 372, 350 326 C 254 272, 164 234, 104 178 Z"/>
        <path class="wing-seg" d="M 442 384 C 388 424, 366 440, 314 450"/>
        <path class="wing-seg" d="M 534 424 C 478 464, 428 502, 370 532"/>
        <path class="wing-seg" d="M 594 446 C 548 490, 510 530, 456 566"/>
        <path class="wing-bone" d="M 104 178 C 244 288, 442 388, 648 494"/>
        <path class="wing-claw" d="M 104 178 l -17 -11 M 314 450 l -15 13 M 370 532 l -8 17"/>

        <path class="wing-arm" d="M 752 496 C 900 448, 1050 390, 1182 302 C 1228 272, 1272 226, 1296 172 C 1214 264, 1094 328, 958 382 C 880 412, 794 456, 752 496 Z"/>
        <path class="wing-membrane" d="M 1296 172 C 1192 286, 1052 356, 914 400 C 958 416, 1028 428, 1086 448 C 1016 464, 932 466, 866 444 C 914 470, 972 500, 1030 530 C 948 530, 858 498, 806 450 C 844 490, 890 528, 944 564 C 852 554, 774 500, 746 440 C 856 410, 972 370, 1050 324 C 1146 270, 1236 228, 1296 172 Z"/>
        <path class="wing-seg" d="M 958 382 C 1012 422, 1034 438, 1086 448"/>
        <path class="wing-seg" d="M 866 422 C 922 462, 972 500, 1030 530"/>
        <path class="wing-seg" d="M 806 444 C 852 488, 890 528, 944 564"/>
        <path class="wing-bone" d="M 1296 172 C 1156 286, 958 386, 752 494"/>
        <path class="wing-claw" d="M 1296 172 l 17 -11 M 1086 448 l 15 13 M 1030 530 l 8 17"/>
      </g>

      <!-- ===== KÖRPER ===== -->
      <g class="hydra-strands">${strandsSvg.join("")}</g>
      <g class="hydra-torso">
        <!-- Schweif -->
        <path class="dragon-skin" d="M 700 648 C 650 704, 720 752, 778 738 C 822 727, 832 690, 804 673 C 780 694, 748 694, 716 662 Z"/>
        <path class="tail-spine" d="M 712 690 l 10 -8 M 740 712 l 8 -10 M 770 722 l 4 -12 M 800 716 l 0 -12"/>
        <!-- Rumpf -->
        <path class="dragon-skin body-main" d="M 700 430 C 604 438, 562 508, 575 588 C 586 664, 644 716, 700 716 C 756 716, 814 664, 825 588 C 838 508, 796 438, 700 430 Z"/>
        <!-- Bauchplatten -->
        <path class="belly-plate" d="M 700 460 C 666 468, 653 516, 659 574 C 665 632, 682 674, 700 685 C 718 674, 735 632, 741 574 C 747 516, 734 468, 700 460 Z"/>
        <path class="belly-line" d="M 679 492 L 721 492 M 673 532 L 727 532 M 674 574 L 726 574 M 679 616 L 721 616 M 687 654 L 713 654"/>
        <!-- Schuppenreihen am Rumpf -->
        <path class="scale-row" d="M 596 512 l 12 8 l 12 -8 l 12 8 M 764 512 l 12 8 l 12 -8"/>
        <path class="scale-row" d="M 588 556 l 12 8 l 12 -8 l 12 8 M 772 556 l 12 8 l 12 -8"/>
        <path class="scale-row" d="M 592 602 l 12 8 l 12 -8 l 12 8 M 768 602 l 12 8 l 12 -8"/>
        <path class="scale-row" d="M 606 648 l 12 8 l 12 -8 M 758 648 l 12 8 l 12 -8"/>
        <!-- Brust/Schulterkamm -->
        <path class="dragon-crest" d="M 606 486 C 634 456, 664 448, 700 446 C 736 448, 766 456, 794 486"/>
        <!-- Beine -->
        <path class="dragon-skin" d="M 626 656 C 598 702, 604 742, 628 762 C 637 748, 637 718, 648 694 C 637 680, 630 669, 626 656 Z"/>
        <path class="dragon-claw" d="M 622 760 l -8 14 M 632 764 l -2 15 M 642 762 l 6 14"/>
        <path class="dragon-skin" d="M 774 656 C 802 702, 796 742, 772 762 C 763 748, 763 718, 752 694 C 763 680, 770 669, 774 656 Z"/>
        <path class="dragon-claw" d="M 778 760 l 8 14 M 768 764 l 2 15 M 758 762 l -6 14"/>
        <!-- Energiekern (statisch gestapelt, kein Filter) -->
        <ellipse class="core-outer" cx="700" cy="565" rx="60" ry="80"/>
        <ellipse class="core-inner" cx="700" cy="565" rx="33" ry="46"/>
      </g>

      </g>
      </g>
    </svg>`;
  },
};
