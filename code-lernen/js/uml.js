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
      s += '<rect class="u-box" x="' + c.x + '" y="' + c.y + '" width="' + c.w + '" height="' + c.h + '" rx="2"/>';
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
      s += '<rect class="u-box" x="' + (X(a) - bw / 2) + '" y="' + TOP + '" width="' + bw + '" height="' + BOX + '" rx="2"/><text class="u-name" x="' + X(a) + '" y="' + (TOP + 20) + '" text-anchor="middle">' + esc(a) + '</text>';
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
      // Aufruf einer Methode (Unterprogramm): Kasten mit doppelten senkrechten Linien links und rechts
      if (b.aufruf !== undefined) return '<div class="nsd-s nsd-call">' + esc(b.aufruf) + '</div>';
      return '';
    };
    return '<div class="nsd">' + list(blocks) + '</div>';
  }

  /*
   * Anwendungsfalldiagramm (Use-Case) aus Daten:
   *   { system: 'Fitness-App',
   *     actors: [{ id: 'm', name: 'Mitglied', side: 'l', row: 0 }],          side l oder r, row = Zeile (wie bei den Fällen)
   *     cases:  [{ id: 'kb', name: 'Kurs buchen', row: 0, col: 0 }],         col 0 oder 1 (zwei Spalten im System)
   *     assoc:  [['m', 'kb']],                                              Akteur ist am Fall beteiligt
   *     include:[['kb', 'ap']], extend: [['rc', 'kb', 'Rabattcode vorhanden']], Pfeil vom ersten zum zweiten
   *     gen:    [['pm', 'm']] }                                             Kind erbt von Eltern (Akteure oder Fälle)
   */
  function useCase(d) {
    const ROWH = 76, TOP = 46, CH = 40, cases = d.cases || [], actors = d.actors || [];
    const cw = (n) => Math.max(120, n.length * 7.2 + 34);
    const two = cases.some((c) => c.col === 1);
    const colW = Math.max(120, ...cases.map((c) => cw(c.name)));
    const rows = Math.max(1, ...cases.map((c) => c.row + 1), ...actors.map((a) => (a.row || 0) + 1));
    const hasL = actors.some((a) => a.side !== 'r'), hasR = actors.some((a) => a.side === 'r');
    const AW = Math.max(90, ...actors.map((a) => a.name.length * 7.4 + 16));
    const SX = hasL ? AW + 40 : 20, SW = two ? colW * 2 + 90 : colW + 70;
    const W = Math.ceil(SX + SW + (hasR ? AW + 40 : 20)), H = TOP + rows * ROWH + 20;
    const pos = {};
    cases.forEach((c) => { const w = cw(c.name); pos[c.id] = { kind: 'c', x: SX + (two ? (c.col ? SW * 0.75 : SW * 0.25) : SW / 2), y: TOP + c.row * ROWH + ROWH / 2, rx: w / 2, ry: CH / 2 }; });
    actors.forEach((a) => { pos[a.id] = { kind: 'a', x: a.side === 'r' ? SX + SW + 20 + AW / 2 : AW / 2 + 10, y: TOP + (a.row || 0) * ROWH + ROWH / 2 - 6 }; });
    // Randpunkt in Richtung eines anderen Punkts (Ellipse bzw. Strichmännchen)
    const edge = (p, tx, ty) => {
      const dx = tx - p.x, dy = ty - p.y, l = Math.hypot(dx, dy) || 1;
      // Strichmännchen: senkrecht unter den Namen bzw. über den Kopf, sonst seitlich neben den Körper
      if (p.kind === 'a') return Math.abs(dy) > Math.abs(dx) ? [p.x, dy > 0 ? p.y + 44 : p.y - 26] : [p.x + Math.sign(dx) * 24, p.y];
      const t = 1 / Math.sqrt((dx / p.rx) ** 2 + (dy / p.ry) ** 2);
      return [p.x + dx * t, p.y + dy * t];
    };
    // alle gezeichneten Linien und Beschriftungen merken: Notizen weichen ihnen aus
    const segs = [], labels = [];
    let lastSeg = null;
    const link = (a, b, marker, label, dash) => {
      const p = pos[a], q = pos[b];
      if (!p || !q) return '';
      const [x1, y1] = edge(p, q.x, q.y), [x2, y2] = edge(q, p.x, p.y);
      lastSeg = [x1, y1, x2, y2]; segs.push(lastSeg);
      let s = '<line class="u-line" x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '"' + (dash ? ' stroke-dasharray="6 4"' : '') + (marker ? ' marker-end="url(#' + marker + ')"' : '') + '/>';
      if (label) {
        const lx = (x1 + x2) / 2, ly = (y1 + y2) / 2 - 6, lw = label.length * 6.4;
        labels.push([lx - lw / 2 - 2, ly - 11, lx + lw / 2 + 2, ly + 3]);
        s += '<text class="u-mul" x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="middle">' + esc(label) + '</text>';
      }
      return s;
    };
    let s = '<svg class="uml" viewBox="0 0 ' + W + ' ' + H + '" style="max-width:' + W + 'px" xmlns="http://www.w3.org/2000/svg" role="img">' + DEFS;
    s += '<rect class="u-sys" x="' + SX + '" y="12" width="' + SW + '" height="' + (H - 22) + '" rx="2"/><text class="u-name" x="' + (SX + 10) + '" y="30">' + esc(d.system || 'System') + '</text>';
    (d.assoc || []).forEach(([a, c]) => { s += link(a, c); });
    (d.include || []).forEach(([a, b]) => { s += link(a, b, 'u-arr', '«include»', true); });
    const notes = [];
    (d.extend || []).forEach(([a, b, cond, at]) => {
      s += link(a, b, 'u-arr', '«extend»', true);
      if (cond) notes.push([pos[a], pos[b], cond, at, lastSeg]);
    });
    (d.gen || []).forEach(([a, b]) => { s += link(a, b, 'u-tri'); });
    cases.forEach((c) => { const p = pos[c.id]; s += '<ellipse class="u-box" cx="' + p.x + '" cy="' + p.y + '" rx="' + p.rx + '" ry="' + p.ry + '"/><text class="u-mem" x="' + p.x + '" y="' + (p.y + 4) + '" text-anchor="middle">' + esc(c.name) + '</text>'; });
    /*
     * Notizen zuletzt (über allem). Lesbar und zuordbar (Allvater 20.11.2026): Für jede Notiz werden Plätze rund um die Mitte ihrer
     * Extend-Linie durchprobiert; gewählt wird der mit den wenigsten Überschneidungen mit Ovalen, Akteuren, Beschriftungen, anderen
     * Notizen und Linien, wobei auch die Verbindungslinie zur Notiz nichts kreuzen soll, und bei Gleichstand der nächste. Notiz und
     * Verbindung sind gleich gefärbt, ein Punkt markiert die Stelle auf der Extend-Linie.
     */
    const boxes = cases.map((c) => { const p = pos[c.id]; return [p.x - p.rx - 6, p.y - p.ry - 6, p.x + p.rx + 6, p.y + p.ry + 6]; })
      .concat(actors.map((a) => { const p = pos[a.id]; return [p.x - 50, p.y - 26, p.x + 50, p.y + 42]; }), labels, [[SX, 12, SX + 200, 36]]);
    const over = (r, b) => r[0] < b[2] && r[2] > b[0] && r[1] < b[3] && r[3] > b[1];
    const segRect = (sg, r) => { for (let t = 0; t <= 1; t += 0.04) { const x = sg[0] + (sg[2] - sg[0]) * t, y = sg[1] + (sg[3] - sg[1]) * t; if (x > r[0] && x < r[2] && y > r[1] && y < r[3]) return true; } return false; };
    const ccw = (ax, ay, bx, by, cx, cy) => (cy - ay) * (bx - ax) > (by - ay) * (cx - ax);
    const cross = (a, b) => ccw(a[0], a[1], b[0], b[1], b[2], b[3]) !== ccw(a[2], a[3], b[0], b[1], b[2], b[3]) && ccw(a[0], a[1], a[2], a[3], b[0], b[1]) !== ccw(a[0], a[1], a[2], a[3], b[2], b[3]);
    notes.forEach(([p, q, cond, at, own]) => {
      const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2, tw = Math.max(110, cond.length * 6.6 + 20), th = 26;
      let best = null;
      const tries = [];
      if (at) tries.push([at.dx, at.dy]);
      else for (let dy = -120; dy <= 110; dy += 10) for (let dx = -tw - 140; dx <= 140; dx += 14) tries.push([dx, dy]);
      for (const [dx, dy] of tries) {
        const nx = Math.max(SX + 4, Math.min(SX + SW - tw - 4, mx + dx)), ny = Math.max(40, Math.min(H - th - 14, my + dy)), r = [nx - 4, ny - 4, nx + tw + 4, ny + th + 4];
        const ax = Math.max(nx + 8, Math.min(nx + tw - 16, mx)), ay = my < ny ? ny : my > ny + th ? ny + th : ny + th / 2, con = [mx, my, ax, ay], len = Math.hypot(ax - mx, ay - my);
        let score = 0;
        boxes.forEach((b) => { if (over(r, b)) score += 10; });
        segs.forEach((sg) => { if (segRect(sg, r)) score += 6; if (sg !== own && cross(con, sg)) score += 12; });
        boxes.forEach((b) => { if (segRect(con, b)) score += 2; });
        score += len / 60 + (len < 18 ? 8 : 0);
        if (!best || score < best.score) best = { score, nx, ny, ax, ay };
      }
      const { nx, ny, ax, ay } = best;
      boxes.push([nx - 4, ny - 4, nx + tw + 4, ny + th + 4]);
      segs.push([mx, my, ax, ay]);
      s += '<line class="u-notelink" x1="' + mx + '" y1="' + my + '" x2="' + ax + '" y2="' + ay + '"/><circle class="u-notedot" cx="' + mx + '" cy="' + my + '" r="3"/>';
      s += '<path class="u-note" d="M' + nx + ',' + ny + ' h' + (tw - 10) + ' l10,10 v16 h-' + tw + ' z"/><text class="u-mem" x="' + (nx + 8) + '" y="' + (ny + 18) + '">' + esc(cond) + '</text>';
    });
    actors.forEach((a) => {
      const p = pos[a.id], x = p.x, y = p.y;
      s += '<circle class="u-actor" cx="' + x + '" cy="' + (y - 16) + '" r="7"/><line class="u-actor" x1="' + x + '" y1="' + (y - 9) + '" x2="' + x + '" y2="' + (y + 8) + '"/><line class="u-actor" x1="' + (x - 11) + '" y1="' + (y - 3) + '" x2="' + (x + 11) + '" y2="' + (y - 3) + '"/>';
      s += '<line class="u-actor" x1="' + x + '" y1="' + (y + 8) + '" x2="' + (x - 9) + '" y2="' + (y + 21) + '"/><line class="u-actor" x1="' + x + '" y1="' + (y + 8) + '" x2="' + (x + 9) + '" y2="' + (y + 21) + '"/>';
      s += '<text class="u-mem" x="' + x + '" y="' + (y + 36) + '" text-anchor="middle">' + esc(a.name) + '</text>';
    });
    return s + '</svg>';
  }

  /*
   * Aktivitätsdiagramm aus einer Blockbeschreibung (wie beim Struktogramm):
   *   'Text'                                                         Aktion (abgerundetes Rechteck)
   *   { wenn: 'Frage', ja: [...], nein: [...], jl: '[ok]', nl: '[nicht ok]' }   Entscheidung und Zusammenführung (Rauten)
   *   { parallel: [[...], [...]] }                                   Gabelung und Synchronisation (Balken)
   *   { solange: '[Bedingung]', tue: [...], raus: '[sonst]' }        Schleife über zwei Rauten mit Rückweg
   *   { ende: true }  Aktivitätsende (Kreis mit Punkt)               { pfadende: true }  Ende nur dieses Pfads (Kreis mit X)
   * Spec: { flow: [...] } oder direkt die Liste. Start (schwarzer Punkt) und Ende kommen automatisch dazu.
   */
  function activity(spec) {
    const flow = Array.isArray(spec) ? spec : spec.flow, GAP = 26, DH = 15, CHW = 6.9;
    const arrow = (x1, y1, x2, y2) => '<line class="u-line" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" marker-end="url(#u-arr-f)"/>';
    const poly = (pts, head) => '<polyline class="u-line" fill="none" points="' + pts.map((p) => p.join(',')).join(' ') + '"' + (head ? ' marker-end="url(#u-arr-f)"' : '') + '/>';
    const label = (x, y, t, anchor) => (t ? '<text class="u-mul" x="' + x + '" y="' + y + '" text-anchor="' + (anchor || 'middle') + '">' + esc(t) + '</text>' : '');
    const diamond = (cx, y) => '<path class="u-box" d="M' + cx + ',' + y + ' l' + DH + ',' + DH + ' l-' + DH + ',' + DH + ' l-' + DH + ',-' + DH + ' z"/>';
    function block(b) {
      if (typeof b === 'string') {
        const w = Math.max(96, b.length * CHW + 26);
        return { w, h: 34, svg: (cx, y) => '<rect class="u-box" x="' + (cx - w / 2) + '" y="' + y + '" width="' + w + '" height="34" rx="12"/><text class="u-mem" x="' + cx + '" y="' + (y + 21) + '" text-anchor="middle">' + esc(b) + '</text>' };
      }
      if (b.ende) return { w: 26, h: 24, term: true, svg: (cx, y) => '<circle class="u-hollow" cx="' + cx + '" cy="' + (y + 12) + '" r="11"/><circle class="u-solid" cx="' + cx + '" cy="' + (y + 12) + '" r="6.5"/>' };
      if (b.pfadende) return { w: 26, h: 24, term: true, svg: (cx, y) => '<circle class="u-hollow" cx="' + cx + '" cy="' + (y + 12) + '" r="11"/><path class="u-line" d="M' + (cx - 7.5) + ',' + (y + 4.5) + ' l15,15 M' + (cx + 7.5) + ',' + (y + 4.5) + ' l-15,15"/>' };
      if (b.wenn !== undefined) {
        const A = seq(b.ja || []), B = seq(b.nein || []);
        const jw = (b.jl || '').length * CHW + 10, nw = (b.nl || '').length * CHW + 10;
        const W = Math.max(A.w, 40) + 44 + Math.max(B.w, 40), w = Math.max(W + 2 * Math.max(jw, nw), 2 * (b.wenn.length * CHW + DH + 10));
        const term = A.term && B.term, hh = Math.max(A.h, B.h);
        return { w, h: 2 * DH + GAP + hh + (term ? 0 : GAP + 2 * DH), term, svg: (cx, y) => {
          const lx = cx - W / 2 + Math.max(A.w, 40) / 2, rx = cx + W / 2 - Math.max(B.w, 40) / 2, y0 = y + 2 * DH + GAP, y1 = y0 + hh + GAP;
          // die Frage links über der Raute, damit sie keinen Pfeil überdeckt
          let s = diamond(cx, y) + label(cx - DH - 4, y + 5, b.wenn, 'end');
          // Bedingungen außen neben den senkrechten Linien, so kreuzt keine Linie die Schrift
          s += poly([[cx - DH, y + DH], [lx, y + DH], [lx, y0]], true) + label(lx - 6, y + DH + 17, b.jl || '', 'end');
          s += poly([[cx + DH, y + DH], [rx, y + DH], [rx, y0]], true) + label(rx + 6, y + DH + 17, b.nl || '', 'start');
          s += A.svg(lx, y0) + B.svg(rx, y0);
          if (!term && !A.term && !B.term) {
            s += diamond(cx, y1);
            s += poly([[lx, y0 + A.h], [lx, y1 + DH], [cx - DH, y1 + DH]], true);
            s += poly([[rx, y0 + B.h], [rx, y1 + DH], [cx + DH, y1 + DH]], true);
          } else if (!term) {
            // nur ein Zweig geht weiter: keine Zusammenführung nötig, die Linie läuft zur Mitte und weiter nach unten
            const bx = A.term ? rx : lx, bh = A.term ? B.h : A.h;
            s += poly([[bx, y0 + bh], [bx, y1 + DH], [cx, y1 + DH], [cx, y1 + 2 * DH]]);
          }
          return s;
        } };
      }
      if (b.parallel) {
        const P = b.parallel.map(seq), W = P.reduce((n, p) => n + p.w, 0) + 36 * (P.length - 1), hh = Math.max(...P.map((p) => p.h));
        return { w: W, h: 6 + GAP + hh + GAP + 6, svg: (cx, y) => {
          let s = '<rect class="u-solid" x="' + (cx - W / 2) + '" y="' + y + '" width="' + W + '" height="6"/>', x = cx - W / 2;
          const y0 = y + 6 + GAP, y1 = y0 + hh + GAP;
          P.forEach((p) => { const c = x + p.w / 2; s += arrow(c, y + 6, c, y0) + p.svg(c, y0); if (!p.term) s += arrow(c, y0 + p.h, c, y1); x += p.w + 36; });
          return s + '<rect class="u-solid" x="' + (cx - W / 2) + '" y="' + y1 + '" width="' + W + '" height="6"/>';
        } };
      }
      if (b.solange !== undefined) {
        const Bd = seq(b.tue || []), cw = b.solange.length * CHW + 12, half = Math.max(Bd.w / 2, cw + 6), side = Math.max(60, (b.raus || '').length * CHW + 30), w = 2 * (half + side);
        return { w, h: 2 * DH + GAP + 2 * DH + GAP + Bd.h + GAP + 10, svg: (cx, y) => {
          const yd = y + 2 * DH + GAP, yb = yd + 2 * DH + GAP, ye = yb + Bd.h + GAP / 2, xl = cx - Bd.w / 2 - 30, xr = cx + half + 30, yout = ye + GAP / 2 + 10;
          let s = diamond(cx, y) + arrow(cx, y + 2 * DH, cx, yd) + diamond(cx, yd);
          s += arrow(cx, yd + 2 * DH, cx, yb) + label(cx + 6, yd + 2 * DH + 15, b.solange, 'start') + Bd.svg(cx, yb);
          // Rückweg links hoch zur oberen Raute, Ausgang rechts herum nach unten
          if (!Bd.term) s += poly([[cx, yb + Bd.h], [cx, ye], [xl, ye], [xl, y + DH], [cx - DH, y + DH]], true);
          s += poly([[cx + DH, yd + DH], [xr, yd + DH], [xr, yout - 8], [cx, yout - 8]]) + label(cx + DH + 6, yd + DH - 6, b.raus || '', 'start');
          return s + poly([[cx, yout - 8], [cx, yout]]);
        } };
      }
      return { w: 0, h: 0, svg: () => '' };
    }
    function seq(list) {
      const bs = list.map(block);
      if (!bs.length) return { w: 40, h: 10, svg: (cx, y) => poly([[cx, y], [cx, y + 10]]) };
      const w = Math.max(...bs.map((b) => b.w)), term = bs.some((b) => b.term);
      let h = 0;
      bs.forEach((b, i) => { h += b.h + (i < bs.length - 1 ? GAP : 0); });
      return { w, h, term, svg: (cx, y) => {
        let s = '', yy = y;
        bs.forEach((b, i) => { s += b.svg(cx, yy); yy += b.h; if (i < bs.length - 1) { if (!b.term) s += arrow(cx, yy, cx, yy + GAP); yy += GAP; } });
        return s;
      } };
    }
    const body = seq(flow), W = Math.ceil(Math.max(200, body.w + 60)), cx = W / 2, endH = body.term ? 0 : GAP + 24;
    const H = Math.ceil(38 + GAP + body.h + endH + 16);
    let s = '<svg class="uml" viewBox="0 0 ' + W + ' ' + H + '" style="max-width:' + W + 'px" xmlns="http://www.w3.org/2000/svg" role="img">' + DEFS;
    s += '<circle class="u-solid" cx="' + cx + '" cy="28" r="10"/>' + arrow(cx, 38, cx, 38 + GAP) + body.svg(cx, 38 + GAP);
    if (!body.term) { const y = 38 + GAP + body.h; s += arrow(cx, y, cx, y + GAP) + block({ ende: true }).svg(cx, y + GAP); }
    return s + '</svg>';
  }

  g.UML = { parse, classDiagram, sequence, nsd, useCase, activity };
})(typeof window !== 'undefined' ? window : globalThis);
