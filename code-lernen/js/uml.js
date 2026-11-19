/*
 * UML-Renderer: Klassendiagramme aus einer kurzen Textschreibweise, Sequenzdiagramme aus Daten.
 *
 *   klasse Tier abstrakt            (auch: schnittstelle Name, klasse Name)
 *     - name: String                Attribute (ohne Klammern)
 *     + essen(): void               Methoden (mit Klammern)
 *   Hund --|> Tier                  Vererbung (Hund erbt von Tier)
 *   Hund ..|> Schwimmer             Schnittstelle umsetzen
 *   Besitzer "1" --> "*" Hund : hat Assoziation mit Vielfachheiten
 *   Auto o-- Reifen                 Aggregation (Auto ist das Ganze)
 *   Haus *-- Zimmer                 Komposition
 *   A ..> B                         Abhängigkeit
 */
(function (g) {
  'use strict';
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const CW = 7.3, ROW = 18, PAD = 12;

  function parse(text) {
    const classes = [], byName = {}, rels = [];
    let cur = null;
    const relRe = /^(\w+)\s*(?:"([^"]*)")?\s*(--\|>|\.\.\|>|-->|\.\.>|o--|\*--|--)\s*(?:"([^"]*)")?\s*(\w+)\s*(?::\s*(.*))?$/;
    for (const raw of text.replace(/\r/g, '').split('\n')) {
      const line = raw.replace(/\s+$/, '');
      if (!line.trim() || line.trim().startsWith('//')) continue;
      const t = line.trim();
      let m;
      if ((m = /^(klasse|class|schnittstelle|interface)\s+(\w+)(?:\s+(abstrakt|abstract))?$/i.exec(t))) {
        const kind = /^(schnittstelle|interface)$/i.test(m[1]) ? 'interface' : 'class';
        cur = { name: m[2], kind, abstract: !!m[3], attrs: [], methods: [] };
        classes.push(cur); byName[cur.name] = cur; continue;
      }
      if ((m = relRe.exec(t))) { cur = null; rels.push({ a: m[1], am: m[2], op: m[3], bm: m[4], b: m[5], label: m[6] }); continue; }
      if (cur) (t.includes('(') ? cur.methods : cur.attrs).push(t);
    }
    for (const r of rels) for (const n of [r.a, r.b]) if (!byName[n]) { const c = { name: n, kind: 'class', abstract: false, attrs: [], methods: [] }; classes.push(c); byName[n] = c; }
    return { classes, byName, rels };
  }

  function layout(d) {
    for (const c of d.classes) {
      const texts = [c.name, ...c.attrs, ...c.methods];
      c.w = Math.max(120, Math.ceil(Math.max(...texts.map((x) => x.length)) * CW + 2 * PAD));
      c.hh = c.kind === 'interface' ? 40 : 28;
      c.ha = Math.max(1, c.attrs.length) * ROW + 8;
      c.hm = Math.max(1, c.methods.length) * ROW + 8;
      c.h = c.hh + c.ha + c.hm;
      c.level = 0;
    }
    const up = (r) => (r.op === '--|>' || r.op === '..|>' ? { top: r.b, bottom: r.a } : r.op === 'o--' || r.op === '*--' ? { top: r.a, bottom: r.b } : { top: r.a, bottom: r.b });
    for (let it = 0; it < d.classes.length + 2; it++) {
      for (const r of d.rels) { const { top, bottom } = up(r); if (d.byName[bottom].level <= d.byName[top].level) d.byName[bottom].level = d.byName[top].level + 1; }
    }
    const rows = {};
    for (const c of d.classes) (rows[c.level] = rows[c.level] || []).push(c);
    const lv = Object.keys(rows).map(Number).sort((a, b) => a - b);
    const GAP = 60, VGAP = 70;
    const widths = lv.map((l) => rows[l].reduce((s, c) => s + c.w, 0) + GAP * (rows[l].length - 1));
    const W = Math.max(...widths);
    let y = 20;
    lv.forEach((l, i) => {
      let x = 20 + (W - widths[i]) / 2;
      const hmax = Math.max(...rows[l].map((c) => c.h));
      for (const c of rows[l]) { c.x = x; c.y = y; x += c.w + GAP; }
      y += hmax + VGAP;
    });
    d.W = W + 40; d.H = y - VGAP + 20;
  }

  function clip(c, tx, ty) {
    const cx = c.x + c.w / 2, cy = c.y + c.h / 2, dx = tx - cx, dy = ty - cy;
    if (!dx && !dy) return [cx, cy];
    const s = Math.min(dx ? (c.w / 2) / Math.abs(dx) : Infinity, dy ? (c.h / 2) / Math.abs(dy) : Infinity);
    return [cx + dx * s, cy + dy * s];
  }

  const DEFS = '<defs>'
    + '<marker id="u-tri" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="12" markerHeight="12" orient="auto"><path d="M1,1 L11,6 L1,11 z" class="u-hollow"/></marker>'
    + '<marker id="u-arr" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="11" markerHeight="11" orient="auto"><path d="M1,1 L11,6 L1,11" class="u-open"/></marker>'
    + '<marker id="u-arr-f" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="11" markerHeight="11" orient="auto"><path d="M1,1 L11,6 L1,11 z" class="u-solid"/></marker>'
    + '<marker id="u-dia" viewBox="0 0 16 12" refX="1" refY="6" markerWidth="16" markerHeight="12" orient="auto"><path d="M1,6 L8,1 L15,6 L8,11 z" class="u-hollow"/></marker>'
    + '<marker id="u-dia-f" viewBox="0 0 16 12" refX="1" refY="6" markerWidth="16" markerHeight="12" orient="auto"><path d="M1,6 L8,1 L15,6 L8,11 z" class="u-solid"/></marker>'
    + '</defs>';

  function classDiagram(text) {
    const d = parse(text);
    if (!d.classes.length) return '<p class="muted">Noch keine Klasse. Beginne mit: klasse Name</p>';
    layout(d);
    let s = '<svg class="uml" viewBox="0 0 ' + d.W + ' ' + d.H + '" style="max-width:' + d.W + 'px" xmlns="http://www.w3.org/2000/svg" role="img">' + DEFS;
    // Beziehungen zuerst (liegen unter den Kästen)
    for (const r of d.rels) {
      const A = d.byName[r.a], B = d.byName[r.b];
      const ac = [A.x + A.w / 2, A.y + A.h / 2], bc = [B.x + B.w / 2, B.y + B.h / 2];
      const p1 = clip(A, bc[0], bc[1]), p2 = clip(B, ac[0], ac[1]);
      const dash = r.op === '..|>' || r.op === '..>' ? ' stroke-dasharray="6 4"' : '';
      let mk = '';
      if (r.op === '--|>' || r.op === '..|>') mk = ' marker-end="url(#u-tri)"';
      else if (r.op === '-->' || r.op === '..>') mk = ' marker-end="url(#u-arr)"';
      else if (r.op === 'o--') mk = ' marker-start="url(#u-dia)"';
      else if (r.op === '*--') mk = ' marker-start="url(#u-dia-f)"';
      s += '<line class="u-line" x1="' + p1[0].toFixed(1) + '" y1="' + p1[1].toFixed(1) + '" x2="' + p2[0].toFixed(1) + '" y2="' + p2[1].toFixed(1) + '"' + dash + mk + '/>';
      const len = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) || 1, ux = (p2[0] - p1[0]) / len, uy = (p2[1] - p1[1]) / len, nx = -uy, ny = ux;
      // Beschriftung neben die Linie, nie darauf (Allvater 19.11.2026: „verliehen an“ lag auf dem Pfeil): bei steilen Linien bündig links
      // bzw. rechts daneben, bei flachen mittig darüber bzw. darunter. Name der Beziehung auf die eine Seite, Vielfachheiten auf die andere.
      const put = (txt, px, py, side) => {
        const sx = nx * side, sy = ny * side, steep = Math.abs(sx) > 0.5;
        const anchor = steep ? (sx < 0 ? 'end' : 'start') : 'middle';
        const x = px + sx * 8, y = py + sy * 10 + (steep ? 4 : sy > 0 ? 9 : -2);
        s += '<text class="u-mul" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" text-anchor="' + anchor + '">' + esc(txt) + '</text>';
      };
      if (r.label) put(r.label, (p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2, 1);
      if (r.am) put(r.am, p1[0] + ux * 18, p1[1] + uy * 18, -1);
      if (r.bm) put(r.bm, p2[0] - ux * 18, p2[1] - uy * 18, -1);
    }
    for (const c of d.classes) {
      s += '<rect class="u-box" x="' + c.x + '" y="' + c.y + '" width="' + c.w + '" height="' + c.h + '" rx="1"/>';
      const cx = c.x + c.w / 2;
      if (c.kind === 'interface') s += '<text class="u-ster" x="' + cx + '" y="' + (c.y + 15) + '" text-anchor="middle">«interface»</text>';
      s += '<text class="u-name' + (c.abstract ? ' u-abs' : '') + '" x="' + cx + '" y="' + (c.y + (c.kind === 'interface' ? 32 : 19)) + '" text-anchor="middle">' + esc(c.name) + '</text>';
      s += '<line class="u-sep" x1="' + c.x + '" y1="' + (c.y + c.hh) + '" x2="' + (c.x + c.w) + '" y2="' + (c.y + c.hh) + '"/>';
      c.attrs.forEach((a, i) => { s += '<text class="u-mem" x="' + (c.x + PAD) + '" y="' + (c.y + c.hh + 16 + i * ROW) + '">' + esc(a) + '</text>'; });
      s += '<line class="u-sep" x1="' + c.x + '" y1="' + (c.y + c.hh + c.ha) + '" x2="' + (c.x + c.w) + '" y2="' + (c.y + c.hh + c.ha) + '"/>';
      c.methods.forEach((a, i) => { s += '<text class="u-mem" x="' + (c.x + PAD) + '" y="' + (c.y + c.hh + c.ha + 16 + i * ROW) + '">' + esc(a) + '</text>'; });
    }
    return s + '</svg>';
  }

  /* Sequenzdiagramm: actors = ['Kunde','Shop'], msgs = [['Kunde','Shop','bestellen()'], ['Shop','Kunde','Rechnung','ret']] */
  function sequence(actors, msgs) {
    // Abstand der Lebenslinien nach der längsten Nachricht (Allvater 19.11.2026: lange Beschriftungen liefen über die Linien): jede
    // Beschriftung passt zwischen ihre beiden Lebenslinien; Selbstnachrichten bekommen rechts Platz, damit nichts abgeschnitten wird
    const CHW = 6.8, idx = (n) => actors.indexOf(n);
    let SP = Math.max(150, Math.max(...actors.map((a) => a.length)) * 9 + 60);
    msgs.forEach((m, i) => { const slots = Math.abs(idx(m[1]) - idx(m[0])); if (slots) SP = Math.max(SP, ((String(i + 1).length + 2 + m[2].length) * CHW + 28) / slots); });
    const TOP = 20, BOX = 30, X = (n) => 10 + SP / 2 + SP * idx(n);
    let W = SP * actors.length + 20;
    msgs.forEach((m) => { if (m[0] === m[1]) W = Math.max(W, X(m[0]) + 40 + m[2].length * CHW + 12); });
    W = Math.ceil(W);
    const H = TOP + BOX + 30 + msgs.length * 44 + 20;
    let s = '<svg class="uml" viewBox="0 0 ' + W + ' ' + H + '" style="max-width:' + W + 'px" xmlns="http://www.w3.org/2000/svg" role="img">' + DEFS;
    actors.forEach((a) => {
      const bw = a.length * 9 + 28;
      s += '<rect class="u-box" x="' + (X(a) - bw / 2) + '" y="' + TOP + '" width="' + bw + '" height="' + BOX + '" rx="1"/><text class="u-name" x="' + X(a) + '" y="' + (TOP + 20) + '" text-anchor="middle">' + esc(a) + '</text>';
      s += '<line class="u-life" x1="' + X(a) + '" y1="' + (TOP + BOX) + '" x2="' + X(a) + '" y2="' + (H - 10) + '"/>';
    });
    msgs.forEach((m, i) => {
      const y = TOP + BOX + 36 + i * 44, ret = m[3] === 'ret';
      if (m[0] === m[1]) {
        const x = X(m[0]);
        s += '<path class="u-line" fill="none" d="M' + x + ',' + y + ' h34 v18 h-34" marker-end="url(#u-arr-f)"/><text class="u-mul" x="' + (x + 40) + '" y="' + (y + 12) + '">' + esc(m[2]) + '</text>';
        return;
      }
      const x1 = X(m[0]), x2 = X(m[1]), dir = x2 > x1 ? 1 : -1;
      s += '<line class="u-line" x1="' + x1 + '" y1="' + y + '" x2="' + (x2 - dir * 2) + '" y2="' + y + '"' + (ret ? ' stroke-dasharray="6 4"' : '') + ' marker-end="url(#u-arr' + (ret ? '' : '-f') + ')"/>';
      s += '<text class="u-mul" x="' + ((x1 + x2) / 2) + '" y="' + (y - 7) + '" text-anchor="middle">' + esc((i + 1) + ': ' + m[2]) + '</text>';
    });
    return s + '</svg>';
  }

  /*
   * Struktogramm (Nassi-Shneiderman) aus einer kleinen Beschreibung:
   *   'Text'                                          Anweisung
   *   { wenn: 'Bedingung', ja: [...], nein: [...] }   Verzweigung (Dreieck oben, zwei Spalten)
   *   { solange: 'Bedingung', tue: [...] }            kopfgesteuerte Schleife (auch für Zählschleifen)
   *   { wiederhole: [...], bis: 'Bedingung' }         fußgesteuerte Schleife
   * Ausgabe ist HTML ohne Skript, alle Texte maskiert.
   */
  function nsd(blocks) {
    const list = (bs) => (bs && bs.length ? bs.map(one).join('') : '<div class="nsd-s nsd-leer">nichts tun</div>');
    const one = (b) => {
      if (typeof b === 'string') return '<div class="nsd-s">' + esc(b) + '</div>';
      if (b.wenn !== undefined) return '<div class="nsd-if"><div class="nsd-cond"><span class="nsd-c">' + esc(b.wenn) + '</span><span class="nsd-ja">ja</span><span class="nsd-nein">nein</span></div><div class="nsd-cols"><div class="nsd-col">' + list(b.ja) + '</div><div class="nsd-col">' + list(b.nein) + '</div></div></div>';
      if (b.solange !== undefined) return '<div class="nsd-loop"><div class="nsd-head">' + esc(b.solange) + '</div><div class="nsd-inner">' + list(b.tue) + '</div></div>';
      if (b.wiederhole !== undefined) return '<div class="nsd-loop nsd-fuss"><div class="nsd-inner">' + list(b.wiederhole) + '</div><div class="nsd-head">' + esc(b.bis) + '</div></div>';
      return '';
    };
    return '<div class="nsd">' + list(blocks) + '</div>';
  }

  g.UML = { parse, classDiagram, sequence, nsd };
})(typeof window !== 'undefined' ? window : globalThis);
