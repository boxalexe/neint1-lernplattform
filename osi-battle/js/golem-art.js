/*
 * golem-art.js — RAID-GOLEM als Flusszeichnung.
 *
 * PERFORMANCE-REGEL (wie bei der Hydra): keine SVG-Filter, kein animierter
 * CSS-filter. Leuchten entsteht durch gestapelte, halbtransparente Formen.
 *
 * AUFBAU von oben nach unten:
 *   HOST  ->  CONTROLLER (das Auge, nie redundant, schrumpft nie)
 *         ->  JOCH / STREIFEN
 *         ->  GRUPPEN mit Platten
 *         ->  Füße
 *
 * Der Golem IST die Zeichnung. Er wird kleiner, weil Ebenen und Knoten
 * verschwinden, nicht weil ein Bild skaliert wird. Einzige Ausnahme ist der
 * Controller: er behält über alle Stufen exakt dieselbe Größe und steht
 * nie doppelt da. Genau das macht ihn sichtbar zum Single Point of Failure.
 *
 * 3D-WIRKUNG (2D gezeichnet): Licht von oben links. Gehäuse, Joch, Füße und
 * Host haben eine sichtbare Tiefe (dunkle Seiten- und Unterkante, TIEFE px),
 * gebürsteten Stahl als Verlauf und Glanzkanten. Platten sind echte
 * Laufwerke: Alu-Deckel, spiegelnde Scheibe, Lesearm, leuchtende LED. Der
 * Controller ist ein gepanzerter Kopf mit glühendem Auge. Klassen und
 * Kennungen bleiben, Zustände (kaputt, Parität, Treffer) greifen wie bisher.
 */

const GolemArt = {
  VB_W: 1400,
  VB_H: 830,

  HOST_Y: 54,
  CTRL_Y: 152,
  CTRL_HW: 104,   // halbe Breite des Controller-Sechsecks
  CTRL_HH: 50,    // halbe Höhe
  BODY_TOP: 340,  // Oberkante des skalierten Körpers

  DISK_W: 76,
  DISK_H: 106,
  DISK_GAP: 16,
  PAD: 20,
  DISK_TOP: 56,   // Platz oberhalb der Platten fuer Gruppenname und Warnhinweis
  GROUP_GAP: 56,

  YOKE_TOP: -60,
  YOKE_H: 34,
  TIEFE: 9,       // sichtbare Gehäusetiefe nach rechts unten
  READOUT_Y: 132, // Stufenanzeige links: unterhalb der Kopfzeile (Titel, Fortschritt, Fehler)

  /** Quader-Seiten (rechts und unten) für die 3D-Wirkung eines Rechtecks */
  tiefeMarkup(x, y, w, h, klasse) {
    const t = this.TIEFE;
    return `<path class="${klasse}" d="M ${x + w} ${y + 4} L ${x + w + t} ${y + 4 + t} L ${x + w + t} ${y + h + t} L ${x + 4 + t} ${y + h + t} L ${x + 4} ${y + h} L ${x + w} ${y + h} Z"/>`;
  },

  /* ---------- Geometrie ---------- */

  groupWidth(anzahl) {
    return anzahl * this.DISK_W + (anzahl - 1) * this.DISK_GAP + 2 * this.PAD;
  },

  panelHeight() {
    return this.DISK_TOP + this.DISK_H + 68;
  },

  /** Rechnet für eine Stufe alle lokalen Koordinaten aus. */
  layout(stage) {
    const gruppen = stage.gruppen || [];
    const breiten = gruppen.map(g => this.groupWidth(g.disks.length));
    const gesamt =
      breiten.reduce((s, b) => s + b, 0) + Math.max(0, gruppen.length - 1) * this.GROUP_GAP;

    let x = -gesamt / 2;
    let flatIndex = 0;
    const boxen = gruppen.map((g, gi) => {
      const w = breiten[gi];
      const box = { name: g.name, x, w, cx: x + w / 2, disks: [] };
      let dx = x + this.PAD;
      g.disks.forEach(label => {
        box.disks.push({
          label,
          index: flatIndex++,
          x: dx,
          cx: dx + this.DISK_W / 2,
          y: this.DISK_TOP,
        });
        dx += this.DISK_W + this.DISK_GAP;
      });
      x += w + this.GROUP_GAP;
      return box;
    });

    return { gesamt, boxen, panelH: this.panelHeight() };
  },

  /* ---------- Bausteine ---------- */

  diskMarkup(d, stage, rolle) {
    const w = this.DISK_W, h = this.DISK_H;
    const klassen = ["golem-disk", "disk-ok"];
    if (rolle === "parity") klassen.push("disk-parity");
    // Wanderende Parität sitzt als Marke auf JEDER Platte. Genau das ist der
    // Unterschied zu RAID 4, wo sie fest auf einer einzigen Platte liegt.
    const marke =
      stage.parity === "rotierend" ? "P" :
      stage.parity === "rotierend2" ? "P Q" : "";
    const badge = marke
      ? `<rect class="disk-badge-bg" x="${d.x + w - (marke.length > 1 ? 32 : 20)}" y="${d.y + 8}" width="${marke.length > 1 ? 26 : 14}" height="15" rx="3"/>
         <text class="disk-badge" x="${d.x + w - (marke.length > 1 ? 19 : 13)}" y="${d.y + 20}">${marke}</text>`
      : "";

    return `
      <g class="${klassen.join(" ")}" id="disk-${d.index}" data-disk="${d.index}">
        <rect class="disk-slot" x="${d.x - 3}" y="${d.y - 3}" width="${w + 6}" height="${h + 6}" rx="9"/>
        <rect class="disk-body" x="${d.x}" y="${d.y}" width="${w}" height="${h}" rx="7"/>
        <path class="disk-bevel" d="M ${d.x + 2} ${d.y + h - 8} L ${d.x + 2} ${d.y + 7} Q ${d.x + 2} ${d.y + 2} ${d.x + 7} ${d.y + 2} L ${d.x + w - 8} ${d.y + 2}"/>
        <rect class="disk-face" x="${d.x + 6}" y="${d.y + 6}" width="${w - 12}" height="${h - 34}" rx="4"/>
        <circle class="disk-screw" cx="${d.x + 10}" cy="${d.y + 10}" r="1.8"/>
        <circle class="disk-screw" cx="${d.x + w - 10}" cy="${d.y + 10}" r="1.8"/>
        <circle class="disk-screw" cx="${d.x + 10}" cy="${d.y + h - 34}" r="1.8"/>
        <circle class="disk-screw" cx="${d.x + w - 10}" cy="${d.y + h - 34}" r="1.8"/>
        <circle class="disk-platter-outer" cx="${d.cx}" cy="${d.y + 40}" r="26"/>
        <path class="disk-sheen" d="M ${d.cx - 19} ${d.y + 22} A 26 26 0 0 1 ${d.cx + 9} ${d.y + 15.5} L ${d.cx + 3} ${d.y + 30} A 11 11 0 0 0 ${d.cx - 8} ${d.y + 33} Z"/>
        <circle class="disk-platter-inner" cx="${d.cx}" cy="${d.y + 40}" r="11"/>
        <circle class="disk-spindle" cx="${d.cx}" cy="${d.y + 40}" r="3.4"/>
        <circle class="disk-pivot" cx="${d.cx + 24}" cy="${d.y + 16}" r="4.5"/>
        <path class="disk-arm" d="M ${d.cx + 24} ${d.y + 16} L ${d.cx + 6} ${d.y + 36}"/>
        <rect class="disk-led-glow" x="${d.x + 7}" y="${d.y + h - 19}" width="15" height="11" rx="4"/>
        <rect class="disk-led" x="${d.x + 10}" y="${d.y + h - 16}" width="9" height="5" rx="1"/>
        <text class="disk-label" x="${d.cx}" y="${d.y + h - 9}">${d.label}</text>
        ${badge}
        <g class="disk-broken">
          <path class="disk-crack" d="M ${d.x + 12} ${d.y + 8} L ${d.cx - 4} ${d.y + 44} L ${d.x + 20} ${d.y + 66} L ${d.cx + 18} ${d.y + h - 16}"/>
          <path class="disk-cross" d="M ${d.x + 14} ${d.y + 14} L ${d.x + w - 14} ${d.y + h - 14} M ${d.x + w - 14} ${d.y + 14} L ${d.x + 14} ${d.y + h - 14}"/>
        </g>
      </g>`;
  },

  /** Ein Pfeil von (x1,y1) senkrecht nach (x2,y2), mit Spitze unten. */
  arrowDown(x1, y1, x2, y2, klasse) {
    const mid = (y1 + y2) / 2;
    const d =
      x1 === x2
        ? `M ${x1} ${y1} L ${x2} ${y2 - 9}`
        : `M ${x1} ${y1} L ${x1} ${mid} L ${x2} ${mid} L ${x2} ${y2 - 9}`;
    return `
      <path class="flow-line ${klasse}" d="${d}"/>
      <path class="flow-head ${klasse}" d="M ${x2 - 6} ${y2 - 10} L ${x2 + 6} ${y2 - 10} L ${x2} ${y2} Z"/>`;
  },

  /** Joch = Schulterbalken des Golems, trägt den Streifen. */
  yokeMarkup(stage, lay) {
    if (!stage.stripe) return "";
    const w = Math.max(200, lay.gesamt * 0.9);
    const x = -w / 2;
    const y = this.YOKE_TOP;
    const h = this.YOKE_H;

    // Streifenabschnitte im Balken sitzen genau zwischen den Abnehmern,
    // damit Balken und Pfeile dieselbe Aufteilung zeigen.
    const ziele =
      stage.stripe === "gruppen"
        ? lay.boxen.map(b => b.cx)
        : lay.boxen[0].disks.map(d => d.cx);
    let segs = "";
    for (let i = 1; i < ziele.length; i++) {
      const sx = (ziele[i - 1] + ziele[i]) / 2;
      if (sx > x + 6 && sx < x + w - 6) {
        segs += `<path class="yoke-seg" d="M ${sx} ${y + 4} L ${sx} ${y + h - 4}"/>`;
      }
    }

    let pfeile = "";
    if (stage.stripe === "gruppen") {
      lay.boxen.forEach(b => {
        pfeile += this.arrowDown(b.cx, y + h, b.cx, 0, "flow-stripe");
      });
    } else {
      lay.boxen[0].disks.forEach(d => {
        pfeile += this.arrowDown(d.cx, y + h, d.cx, 0, "flow-stripe");
      });
    }

    return `
      <g class="golem-yoke">
        ${this.tiefeMarkup(x, y, w, h, "yoke-depth")}
        <rect class="yoke-body" x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/>
        <rect class="yoke-shine" x="${x + 6}" y="${y + 3}" width="${w - 12}" height="${h * 0.32}" rx="3"/>
        ${segs}
        <rect class="yoke-label-bg" x="-64" y="${y + 6}" width="128" height="${h - 12}" rx="4"/>
        <text class="yoke-label" x="0" y="${y + h / 2 + 5}">STRIPING</text>
      </g>
      ${pfeile}`;
  },

  /** Spiegelbogen unterhalb eines Paars, mit zwei Spitzen und Gleichheitszeichen. */
  mirrorMarkup(box) {
    if (box.disks.length < 2) return "";
    const a = box.disks[0], b = box.disks[1];
    const y = a.y + this.DISK_H + 26;
    const cx = (a.cx + b.cx) / 2;
    return `
      <g class="flow-mirror-group">
        <path class="flow-line flow-mirror" d="M ${a.cx} ${a.y + this.DISK_H + 4} L ${a.cx} ${y} L ${b.cx} ${y} L ${b.cx} ${b.y + this.DISK_H + 4}"/>
        <path class="flow-head flow-mirror" d="M ${a.cx - 6} ${a.y + this.DISK_H + 14} L ${a.cx + 6} ${a.y + this.DISK_H + 14} L ${a.cx} ${a.y + this.DISK_H + 4} Z"/>
        <path class="flow-head flow-mirror" d="M ${b.cx - 6} ${b.y + this.DISK_H + 14} L ${b.cx + 6} ${b.y + this.DISK_H + 14} L ${b.cx} ${b.y + this.DISK_H + 4} Z"/>
        <rect class="flow-chip flow-chip-mirror" x="${cx - 30}" y="${y - 11}" width="60" height="22" rx="4"/>
        <text class="flow-chip-text" x="${cx}" y="${y + 5}">A = A</text>
      </g>`;
  },

  /** Paritätsfluss unterhalb einer Gruppe. */
  parityMarkup(stage, box) {
    if (!stage.parity) return "";
    const yBottom = box.disks[0].y + this.DISK_H;
    const yNode = yBottom + 30;
    const cx = box.cx;

    let linien = "";
    box.disks.forEach(d => {
      linien += `<path class="flow-line flow-parity" d="M ${d.cx} ${yBottom + 4} L ${d.cx} ${yNode - 14} L ${cx} ${yNode - 14}"/>`;
    });

    const glyph = stage.parity === "rotierend2" ? "P + Q" : "XOR";
    let extra = "";

    if (stage.parity === "fest") {
      // fester Paritätsblock: Rückpfeil in die letzte Platte, markiert als Flaschenhals
      const p = box.disks[box.disks.length - 1];
      const yUnten = yNode + 24;
      extra = `
        <path class="flow-line flow-parity-fix" d="M ${cx} ${yNode + 13} L ${cx} ${yUnten} L ${p.cx} ${yUnten} L ${p.cx} ${p.y + this.DISK_H + 10}"/>
        <path class="flow-head flow-parity-fix" d="M ${p.cx - 6} ${p.y + this.DISK_H + 10} L ${p.cx + 6} ${p.y + this.DISK_H + 10} L ${p.cx} ${p.y + this.DISK_H} Z"/>
        <text class="flow-warn" x="${p.cx}" y="${p.y - 10}">FLASCHENHALS</text>`;
    }

    return `
      <g class="flow-parity-group">
        ${linien}
        <rect class="flow-chip flow-chip-parity" x="${cx - 38}" y="${yNode - 13}" width="76" height="26" rx="4"/>
        <text class="flow-chip-text" x="${cx}" y="${yNode + 6}">${glyph}</text>
        ${extra}
      </g>`;
  },

  groupMarkup(stage, box) {
    const panelH = this.panelHeight();
    const disks = box.disks
      .map((d, i) => {
        const fest = stage.parity === "fest" && i === box.disks.length - 1;
        return this.diskMarkup(d, stage, fest ? "parity" : "data");
      })
      .join("");

    return `
      <g class="golem-group" data-group="${box.name}">
        ${this.tiefeMarkup(box.x, 0, box.w, panelH, "group-depth")}
        <rect class="group-panel" x="${box.x}" y="0" width="${box.w}" height="${panelH}" rx="9"/>
        <rect class="group-brush" x="${box.x + 3}" y="3" width="${box.w - 6}" height="${panelH - 6}" rx="7"/>
        <path class="group-bevel" d="M ${box.x + 4} ${panelH - 10} L ${box.x + 4} 10 Q ${box.x + 4} 4 ${box.x + 10} 4 L ${box.x + box.w - 10} 4"/>
        <path class="group-vents" d="${[0, 1, 2, 3].map(i => `M ${box.x + box.w - 70 + i * 12} ${panelH - 22} l 0 10`).join(" ")}"/>
        <path class="group-rivets" d="M ${box.x + 12} 12 l 0 0 M ${box.x + box.w - 12} 12 l 0 0"/>
        <circle class="group-rivet" cx="${box.x + 13}" cy="13" r="3"/>
        <circle class="group-rivet" cx="${box.x + box.w - 13}" cy="13" r="3"/>
        <circle class="group-rivet" cx="${box.x + 13}" cy="${panelH - 13}" r="3"/>
        <circle class="group-rivet" cx="${box.x + box.w - 13}" cy="${panelH - 13}" r="3"/>
        <text class="group-label" x="${box.cx}" y="22">${box.name}</text>
        ${disks}
        ${stage.mirror ? this.mirrorMarkup(box) : ""}
        ${this.parityMarkup(stage, box)}
      </g>`;
  },

  /** Der Controller: Kopf des Golems, ein Auge, niemals doppelt. */
  controllerMarkup(allein) {
    const cy = this.CTRL_Y, hw = this.CTRL_HW, hh = this.CTRL_HH, cx = 700;
    const hex = `M ${cx - hw} ${cy} L ${cx - hw * 0.55} ${cy - hh} L ${cx + hw * 0.55} ${cy - hh} L ${cx + hw} ${cy} L ${cx + hw * 0.55} ${cy + hh} L ${cx - hw * 0.55} ${cy + hh} Z`;
    return `
      <g class="golem-controller${allein ? " ctrl-solo" : ""}" id="golem-controller">
        <path class="ctrl-glow" d="${hex}"/>
        <path class="ctrl-depth" d="${hex}" transform="translate(${this.TIEFE * 0.8} ${this.TIEFE})"/>
        <path class="ctrl-shell" d="${hex}"/>
        <path class="ctrl-plate" d="M ${cx - hw * 0.8} ${cy} L ${cx - hw * 0.44} ${cy - hh * 0.78} L ${cx + hw * 0.44} ${cy - hh * 0.78} L ${cx + hw * 0.8} ${cy} L ${cx + hw * 0.44} ${cy + hh * 0.78} L ${cx - hw * 0.44} ${cy + hh * 0.78} Z"/>
        <path class="ctrl-shine" d="M ${cx - hw * 0.92} ${cy - 4} L ${cx - hw * 0.52} ${cy - hh + 5} L ${cx + hw * 0.3} ${cy - hh + 5}"/>
        <circle class="ctrl-bolt" cx="${cx - hw * 0.62}" cy="${cy - hh * 0.52}" r="3.2"/>
        <circle class="ctrl-bolt" cx="${cx + hw * 0.62}" cy="${cy - hh * 0.52}" r="3.2"/>
        <circle class="ctrl-bolt" cx="${cx - hw * 0.62}" cy="${cy + hh * 0.52}" r="3.2"/>
        <circle class="ctrl-bolt" cx="${cx + hw * 0.62}" cy="${cy + hh * 0.52}" r="3.2"/>
        <path class="ctrl-brow" d="M ${cx - 52} ${cy - 20} L ${cx - 10} ${cy - 7} L ${cx + 10} ${cy - 7} L ${cx + 52} ${cy - 20} L ${cx + 52} ${cy - 11} L ${cx + 10} ${cy + 1} L ${cx - 10} ${cy + 1} L ${cx - 52} ${cy - 11} Z"/>
        <ellipse class="ctrl-eye-glow" cx="${cx}" cy="${cy + 10}" rx="44" ry="26"/>
        <ellipse class="ctrl-eye" cx="${cx}" cy="${cy + 10}" rx="30" ry="17"/>
        <ellipse class="ctrl-pupil" cx="${cx}" cy="${cy + 10}" rx="8" ry="14"/>
        <ellipse class="ctrl-eye-spark" cx="${cx - 11}" cy="${cy + 3}" rx="6" ry="3.4"/>
        <path class="ctrl-fin" d="M ${cx - hw} ${cy} l -22 -12 l 0 24 Z"/>
        <path class="ctrl-fin" d="M ${cx + hw} ${cy} l 22 -12 l 0 24 Z"/>
        <text class="ctrl-label" x="${cx}" y="${cy + hh + 20}">RAID-CONTROLLER</text>
        <text class="ctrl-spof" x="${cx}" y="${cy + hh + 36}">nur einmal vorhanden</text>
      </g>`;
  },

  /** Epilog: die Reste der acht Stufen liegen am Boden. */
  debrisMarkup() {
    const r = (a, b, s) => a + ((Math.sin(s * 12.9898) * 43758.5453) % 1 + 1) % 1 * (b - a);
    let out = '<ellipse class="golem-ground" cx="700" cy="640" rx="380" ry="26"/>';
    for (let i = 0; i < 14; i++) {
      const x = r(400, 960, i + 1);
      const y = r(600, 660, i + 7);
      const w = r(26, 54, i + 3);
      const rot = r(-38, 38, i + 5);
      out += `<g class="debris" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)})">
        <rect class="debris-plate" x="${(-w / 2).toFixed(1)}" y="-9" width="${w.toFixed(1)}" height="18" rx="3"/>
        <path class="debris-crack" d="M ${(-w / 2 + 4).toFixed(1)} -6 L 2 3 L ${(w / 2 - 5).toFixed(1)} -4"/>
      </g>`;
    }
    return out;
  },

  hostMarkup() {
    const cx = 700, y = this.HOST_Y;
    return `
      <g class="golem-host">
        ${this.tiefeMarkup(cx - 66, y - 20, 132, 40, "host-depth")}
        <rect class="host-body" x="${cx - 66}" y="${y - 20}" width="132" height="40" rx="5"/>
        <rect class="host-led" x="${cx + 44}" y="${y - 4}" width="10" height="8" rx="2"/>
        <text class="host-label" x="${cx}" y="${y + 6}">HOST</text>
      </g>
      ${this.arrowDown(cx, y + 20, cx, this.CTRL_Y - this.CTRL_HH, "flow-io")}`;
  },

  /** Verhärtungs-Schilde: erscheinen bei Fehlgriffen neben dem Auge. */
  shieldMarkup() {
    let out = "";
    for (let i = 0; i < 3; i++) {
      const cx = 1006 + i * 76;
      const cy = this.CTRL_Y;
      out += `
        <g class="golem-shield" id="shield-${i}">
          <path class="shield-body" d="M ${cx} ${cy - 30} L ${cx + 26} ${cy - 16} L ${cx + 26} ${cy + 8} L ${cx} ${cy + 30} L ${cx - 26} ${cy + 8} L ${cx - 26} ${cy - 16} Z"/>
          <text class="shield-text" x="${cx}" y="${cy + 5}">HS</text>
        </g>`;
    }
    return `<g class="golem-shields">${out}<text class="shield-caption" id="shield-caption" x="1082" y="${this.CTRL_Y + 54}">HOT SPARE</text></g>`;
  },

  legendMarkup() {
    const y = this.VB_H - 74;
    const zeile = (dy, klasse, text) => `
      <path class="flow-line ${klasse} legend-line" d="M 40 ${y + dy} L 104 ${y + dy}"/>
      <text class="legend-text" x="116" y="${y + dy + 5}">${text}</text>`;
    return `
      <g class="golem-legend">
        ${zeile(0, "flow-stripe", "Striping: Daten werden verteilt")}
        ${zeile(22, "flow-mirror", "Mirroring: Daten werden kopiert")}
        ${zeile(44, "flow-parity", "Parität: Daten werden berechnet")}
      </g>`;
  },

  /* ---------- Zusammenbau ---------- */

  build(stage) {
    const lay = this.layout(stage);
    const allein = stage.gruppen.length === 0;   // Epilog: nur noch der Controller
    const s = stage.scale || 1;
    const koerper =
      stage.gruppen.length === 0
        ? ""
        : `
      <g class="golem-body" id="golem-body"
         transform="translate(700 ${this.BODY_TOP}) scale(${s})">
        ${this.yokeMarkup(stage, lay)}
        ${lay.boxen.map(b => this.groupMarkup(stage, b)).join("")}
        <g class="golem-feet">
          ${this.tiefeMarkup(-lay.gesamt / 2 + 28, lay.panelH, 58, 46, "foot-depth")}
          <rect class="foot" x="${-lay.gesamt / 2 + 28}" y="${lay.panelH}" width="58" height="46" rx="6"/>
          ${this.tiefeMarkup(lay.gesamt / 2 - 86, lay.panelH, 58, 46, "foot-depth")}
          <rect class="foot" x="${lay.gesamt / 2 - 86}" y="${lay.panelH}" width="58" height="46" rx="6"/>
        </g>
      </g>`;

    // Verbindung Controller -> Körper, in Außenkoordinaten gerechnet
    const zielY =
      stage.gruppen.length === 0
        ? null
        : this.BODY_TOP + (stage.stripe ? this.YOKE_TOP : 0) * s;
    const spine =
      zielY === null
        ? ""
        : this.arrowDown(700, this.CTRL_Y + this.CTRL_HH + 46, 700, zielY, "flow-io");

    const bodenY = zielY === null ? 520 : this.BODY_TOP + (lay.panelH + 46) * s + 10;

    return `
    <svg id="golem-svg" viewBox="0 0 ${this.VB_W} ${this.VB_H}" preserveAspectRatio="xMidYMid meet"
         role="img" aria-label="RAID-Golem: Verbundzeichnung aus Controller, Streifen und Platten">
      <defs>
        <linearGradient id="gSteel" x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0%" stop-color="#5b6b92"/><stop offset="12%" stop-color="#46557c"/><stop offset="55%" stop-color="#2f3b5c"/><stop offset="100%" stop-color="#1c253d"/>
        </linearGradient>
        <linearGradient id="gSteelSide" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#151c30"/><stop offset="100%" stop-color="#090d18"/>
        </linearGradient>
        <pattern id="gBrush" width="6" height="3" patternUnits="userSpaceOnUse">
          <path d="M 0 1.5 L 6 1.5" stroke="#ffffff" stroke-width="0.6" opacity="0.05"/>
        </pattern>
        <linearGradient id="gDisk" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stop-color="#c3ccdc"/><stop offset="35%" stop-color="#8d98af"/><stop offset="100%" stop-color="#4e586f"/>
        </linearGradient>
        <linearGradient id="gDiskParity" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stop-color="#d9b56a"/><stop offset="40%" stop-color="#8f6a2c"/><stop offset="100%" stop-color="#4a3416"/>
        </linearGradient>
        <linearGradient id="gDiskFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2a3550"/><stop offset="100%" stop-color="#121a2c"/>
        </linearGradient>
        <radialGradient id="gPlatter" cx="0.42" cy="0.38" r="0.62">
          <stop offset="0%" stop-color="#f2f6fd"/><stop offset="30%" stop-color="#b6c2d9"/><stop offset="70%" stop-color="#6c7a97"/><stop offset="100%" stop-color="#3c465d"/>
        </radialGradient>
        <linearGradient id="gYoke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#9be2ff"/><stop offset="45%" stop-color="#4cb8f2"/><stop offset="100%" stop-color="#1d6fa8"/>
        </linearGradient>
        <radialGradient id="gCtrlShell" cx="0.38" cy="0.3" r="0.85">
          <stop offset="0%" stop-color="#6e4b56"/><stop offset="45%" stop-color="#3f2a33"/><stop offset="100%" stop-color="#1c1117"/>
        </radialGradient>
        <radialGradient id="gCtrlEye" cx="0.5" cy="0.5" r="0.55">
          <stop offset="0%" stop-color="#fff4d6"/><stop offset="35%" stop-color="#ffc27a"/><stop offset="75%" stop-color="#ff6b3d"/><stop offset="100%" stop-color="#8a1f12"/>
        </radialGradient>
        <radialGradient id="gGround" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.7"/><stop offset="60%" stop-color="#000000" stop-opacity="0.32"/><stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="gBolt" cx="0.35" cy="0.3" r="0.7">
          <stop offset="0%" stop-color="#e6ebf5"/><stop offset="60%" stop-color="#7d889f"/><stop offset="100%" stop-color="#2c3346"/>
        </radialGradient>
      </defs>
      <g class="golem-stage-shift">
        ${allein
          ? this.debrisMarkup()
          : `<ellipse class="golem-ground" cx="700" cy="${bodenY}" rx="${Math.max(160, lay.gesamt * 0.58)}" ry="22"/>`}

        <g class="golem-arrive">
          ${this.hostMarkup()}
          ${spine}
          ${koerper}
          ${this.controllerMarkup(allein)}
          ${this.shieldMarkup()}
        </g>

        <g class="golem-readout">
          <text class="stage-name" x="40" y="${this.READOUT_Y}">${stage.label}</text>
          <text class="stage-tol" x="40" y="${this.READOUT_Y + 26}">Toleranz: ${stage.toleranz}</text>
        </g>
        ${allein ? "" : this.legendMarkup()}

        <text class="golem-dmg" id="golem-dmg" x="700" y="${this.CTRL_Y - 90}"></text>
        <text class="golem-move" id="golem-move" x="700" y="486"></text>
      </g>
    </svg>`;
  },
};
