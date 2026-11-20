/*
 * Eingabefelder für Code wie in einer kleinen IDE (Allvater 20.11.2026, „grob wie IntelliJ/VS Code“):
 * - Vorschläge beim Tippen: Schlüsselwörter und Typen der Sprache, Standardfunktionen (mit Erklärung aus den Kürzeln),
 *   bei SQL die Tabellen und Spalten der Beispieldatenbank, dazu Namen, die schon im eigenen Code stehen
 * - Pfeiltasten wählen, Enter oder Tab übernehmen, Esc schließt, Strg+Leertaste öffnet die Liste von Hand
 * - kleine Vorlagen (for, if, function, WENN, SOLANGE …) mit Platzhalter-Sprung zum Cursor
 * - Klammern und Anführungszeichen schließen sich selbst, Enter übernimmt die Einrückung, Tab rückt ein
 * Gilt für jedes <textarea data-lang="…">. Antworten zu „Was gibt das aus?“ und Lückentexte bekommen nichts davon.
 * Vorgeschlagen wird nur Allgemeines, nie etwas aus den Musterlösungen.
 */
(function () {
  'use strict';
  const A = window.Academy, esc = A.esc;
  const IND = '  ';

  /* ---------- Vorschläge je Sprache ---------- */
  const JS_MEMBERS = ['log', 'length', 'push()', 'pop()', 'shift()', 'unshift()', 'slice()', 'splice()', 'map()', 'filter()', 'reduce()', 'forEach()', 'includes()', 'indexOf()', 'join()', 'split()', 'sort()', 'reverse()', 'concat()', 'find()', 'some()', 'every()', 'toUpperCase()', 'toLowerCase()', 'trim()', 'startsWith()', 'endsWith()', 'replace()', 'charAt()', 'toFixed()', 'toString()', 'keys()', 'values()', 'has()', 'get()', 'set()', 'add()', 'delete()'];
  const JS_FULL = ['console.log()', 'Math.floor()', 'Math.ceil()', 'Math.round()', 'Math.max()', 'Math.min()', 'Math.abs()', 'Math.sqrt()', 'Math.pow()', 'Math.random()', 'Math.PI', 'JSON.stringify()', 'JSON.parse()', 'Array.isArray()', 'Number()', 'String()', 'parseInt()', 'parseFloat()', 'Object.keys()', 'Object.values()', 'Number.isInteger()'];
  const SNIP = {
    javascript: [
      ['for', 'for-Schleife mit Zähler', 'for (let i = 0; i < |; i++) {\n\t\n}'],
      ['forof', 'Schleife über alle Werte einer Liste', 'for (const x of |) {\n\t\n}'],
      ['if', 'Verzweigung', 'if (|) {\n\t\n}'],
      ['ifelse', 'Verzweigung mit else', 'if (|) {\n\t\n} else {\n\t\n}'],
      ['while', 'Schleife mit Bedingung', 'while (|) {\n\t\n}'],
      ['function', 'Funktion', 'function |() {\n\t\n}'],
      ['log', 'Ausgabe auf der Konsole', 'console.log(|);']
    ],
    pseudo: [
      ['WENN', 'Verzweigung', 'WENN | DANN\n\t\nENDE WENN'],
      ['WENNSONST', 'Verzweigung mit SONST', 'WENN | DANN\n\t\nSONST\n\t\nENDE WENN'],
      ['SOLANGE', 'Schleife mit Bedingung', 'SOLANGE |\n\t\nENDE SOLANGE'],
      ['FÜR', 'Zählschleife', 'FÜR i VON 1 BIS |\n\t\nENDE FÜR'],
      ['FUNKTION', 'Funktion mit Rückgabe', 'FUNKTION |()\n\t\nENDE FUNKTION']
    ],
    sql: [
      ['SELECT', 'Abfrage', 'SELECT | FROM '],
      ['JOIN', 'Tabellen verbinden', 'JOIN | ON '],
      ['GROUP', 'Gruppieren', 'GROUP BY |'],
      ['ORDER', 'Sortieren', 'ORDER BY |'],
      ['INSERT', 'Zeile einfügen', 'INSERT INTO | () VALUES ()'],
      ['UPDATE', 'Zeilen ändern', 'UPDATE | SET  WHERE ']
    ]
  };
  // Erklärung zu einem Vorschlag aus den Kürzeln, falls vorhanden
  let KZ = null;
  let LANGNOW = '';
  const kzText = (name) => {
    if (!KZ) { KZ = new Map(); (A.kuerzel || []).forEach((e) => [e[0]].concat((e[3] && e[3].a) || []).forEach((n) => { if (!KZ.has(n)) KZ.set(n, e); })); }
    const n = name.replace(/\(\)$/, ''), e = KZ.get(name) || KZ.get(n) || KZ.get(n.split('.').pop());
    return e ? (e[3] && e[3].l && e[3].l[LANGNOW]) || e[2] : ''; // Erklärung passend zur Sprache des Felds
  };
  let SQLNAMES = null;
  const sqlNames = () => {
    if (SQLNAMES) return SQLNAMES;
    const t = [], c = new Set();
    for (const m of String(A.sqlSetup || '').matchAll(/CREATE TABLE (\w+) \(([^;]*)\);/g)) { t.push(m[1]); m[2].split(',').forEach((s) => { const w = s.trim().split(/\s+/)[0]; if (/^\w+$/.test(w)) c.add(w); }); }
    return (SQLNAMES = { t, c: [...c] });
  };
  const NOASCII = new Set(['RUECKGABE', 'FUER', 'ZURUECK', 'LAENGE', 'ANHAENGEN']);
  const WORD = /[A-Za-zÄÖÜäöüß_][\w.ÄÖÜäöüß]*$/;

  function candidates(lang, text, prefix) {
    const ci = lang === 'sql' || lang === 'pseudo', out = [], seen = new Set(); LANGNOW = lang;
    const add = (label, insert, detail, kind) => { if (seen.has(label)) return; seen.add(label); out.push({ label, insert: insert == null ? label : insert, detail: detail || '', kind }); };
    const dot = prefix.lastIndexOf('.');
    if (dot >= 0 && lang === 'javascript') {
      const obj = prefix.slice(0, dot), mem = prefix.slice(dot + 1);
      for (const f of JS_FULL) if (f.startsWith(prefix) && f !== prefix) add(f, f, kzText(f), 'fn');
      if (!/^(console|Math|JSON|Array|Object|Number)$/.test(obj)) for (const m of JS_MEMBERS) if (m.startsWith(mem)) add('.' + m, obj + '.' + m, kzText(m), 'fn');
      return out;
    }
    const low = prefix.toLowerCase(), match = (w) => (ci ? w.toLowerCase().startsWith(low) : w.startsWith(prefix) || w.toLowerCase().startsWith(low)) && w !== prefix;
    // Vorlagen auch dann, wenn ihr Name schon ganz getippt ist (for → for-Schleife)
    for (const [k, d, body] of SNIP[lang] || []) if (match(k) || (ci ? k.toLowerCase() === low : k === prefix)) add(k + ' …', { snip: body }, d, 'snip');
    const words = A.langWords(lang).filter((w) => !NOASCII.has(w));
    if (lang === 'sql') { const s = sqlNames(); s.t.forEach((w) => match(w) && add(w, w, 'Tabelle', 'tbl')); s.c.forEach((w) => match(w) && add(w, w, 'Spalte', 'col')); }
    if (lang === 'javascript') JS_FULL.forEach((f) => match(f) && add(f, f, kzText(f), 'fn'));
    words.forEach((w) => match(w) && add(w, w, kzText(w), 'kw'));
    // Namen aus dem eigenen Code (Variablen, Funktionen), ohne das Wort, das gerade getippt wird
    const own = new Set(text.match(/[A-Za-zÄÖÜäöüß_][\wÄÖÜäöüß]*/g) || []);
    own.forEach((w) => w.length > 1 && match(w) && !words.includes(w) && add(w, w, 'aus deinem Code', 'var'));
    // gleiche Schreibweise zuerst, dann kurze vor langen
    return out.sort((a, b) => (b.label.startsWith(prefix) - a.label.startsWith(prefix)) || (a.kind === 'snip') - (b.kind === 'snip') || a.label.length - b.label.length).slice(0, 9);
  }

  /* ---------- Text einsetzen (mit Rückgängig, wo der Browser es kann) ---------- */
  function insert(ta, from, to, text) {
    ta.focus(); ta.setSelectionRange(from, to);
    if (!document.execCommand || !document.execCommand('insertText', false, text)) { ta.setRangeText(text, from, to, 'end'); ta.dispatchEvent(new Event('input', { bubbles: true })); }
  }
  const lineStart = (v, pos) => v.lastIndexOf('\n', pos - 1) + 1;
  const indentOf = (v, pos) => (v.slice(lineStart(v, pos), pos).match(/^[ \t]*/) || [''])[0];

  /* ---------- Liste der Vorschläge ---------- */
  const box = document.createElement('div'); box.className = 'ac-box'; box.hidden = true; box.setAttribute('role', 'listbox');
  let st = null, quiet = false; // st = { ta, items, sel, from }
  function caretXY(ta) {
    const cs = getComputedStyle(ta), m = document.createElement('div');
    for (const p of ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'tabSize', 'paddingTop', 'paddingLeft', 'paddingRight', 'borderTopWidth', 'borderLeftWidth', 'boxSizing', 'width']) m.style[p] = cs[p];
    Object.assign(m.style, { position: 'absolute', visibility: 'hidden', whiteSpace: 'pre-wrap', overflowWrap: 'break-word', top: '0', left: '-9999px' });
    m.textContent = ta.value.slice(0, ta.selectionStart); const s = document.createElement('span'); s.textContent = '​'; m.appendChild(s);
    document.body.appendChild(m); const x = s.offsetLeft, y = s.offsetTop, h = s.offsetHeight; m.remove();
    const r = ta.getBoundingClientRect();
    return { x: r.left + x - ta.scrollLeft, y: r.top + y - ta.scrollTop, h };
  }
  function close() { st = null; box.hidden = true; }
  function paint() {
    box.innerHTML = st.items.map((it, i) => '<div class="ac-it' + (i === st.sel ? ' on' : '') + '" role="option" data-i="' + i + '"><span class="ac-k ac-' + it.kind + '"></span><span class="ac-l">' + esc(it.label) + '</span>' + (i === st.sel && it.detail ? '<span class="ac-d">' + A.inl(it.detail) + '</span>' : '') + '</div>').join('');
    const c = caretXY(st.ta); box.hidden = false;
    const vw = document.documentElement.clientWidth, w = box.offsetWidth, hh = box.offsetHeight;
    box.style.left = Math.max(8, Math.min(vw - w - 8, c.x)) + 'px';
    box.style.top = (c.y + c.h + 4 + hh < window.innerHeight ? c.y + c.h + 4 : Math.max(8, c.y - hh - 4)) + 'px';
  }
  function open(ta, force) {
    const pos = ta.selectionStart; if (pos !== ta.selectionEnd) return close();
    const lang = ta.dataset.lang, before = ta.value.slice(0, pos), m = before.match(WORD);
    let prefix = m ? m[0] : '';
    if (lang !== 'javascript' && prefix.includes('.')) prefix = prefix.slice(prefix.lastIndexOf('.') + 1); // kunde.na → Spalte name
    // nicht in Zahlen, Kommentaren und Texten in Anführungszeichen
    const line = before.slice(lineStart(before, pos));
    if (!force && (!prefix || /\d$/.test(prefix) && !/[A-Za-z_]/.test(prefix))) return close();
    if (line.replace(/(["'„])(?:(?!\1).)*\1/g, '').includes(lang === 'sql' ? '--' : '//')) return close();
    if (((line.match(/"/g) || []).length % 2) || ((line.match(/'/g) || []).length % 2)) return close();
    const items = candidates(ta.dataset.lang, ta.value.slice(0, pos - prefix.length) + ta.value.slice(pos), prefix);
    if (!items.length) return close();
    st = { ta, items, sel: 0, from: pos - prefix.length }; paint();
  }
  function accept() {
    const { ta, items, sel, from } = st, it = items[sel], to = ta.selectionStart; close(); quiet = true;
    if (it.insert && it.insert.snip) {
      const ind = indentOf(ta.value, from), body = it.insert.snip.replace(/\t/g, IND).replace(/\n/g, '\n' + ind), cur = body.indexOf('|');
      insert(ta, from, to, body.replace('|', '')); ta.setSelectionRange(from + cur, from + cur);
    } else {
      const s = String(it.insert), paren = s.endsWith('()');
      insert(ta, from, to, s); if (paren) ta.setSelectionRange(from + s.length - 1, from + s.length - 1);
    }
    quiet = false;
  }

  const PAIRS = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'" };
  document.addEventListener('keydown', (e) => {
    const ta = e.target; if (!(ta instanceof HTMLTextAreaElement) || !ta.dataset.lang) return;
    if (st && st.ta === ta) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); st.sel = (st.sel + (e.key === 'ArrowDown' ? 1 : -1) + st.items.length) % st.items.length; paint(); return; }
      if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); accept(); return; }
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
    }
    if (e.key === ' ' && e.ctrlKey) { e.preventDefault(); open(ta, true); return; }
    if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return;
    const v = ta.value, a = ta.selectionStart, b = ta.selectionEnd, next = v[a] || '', prev = v[a - 1] || '';
    if (e.key === 'Tab' && !e.shiftKey && a === b) { e.preventDefault(); insert(ta, a, b, IND); return; }
    if (e.key === 'Enter' && a === b) {
      e.preventDefault();
      const ind = indentOf(v, a), open1 = /[{([]$/.test(prev) || (ta.dataset.lang === 'pseudo' && /^\s*(WENN|SONST|SOLANGE|FÜR|FUNKTION|WIEDERHOLE)\b/i.test(v.slice(lineStart(v, a), a)));
      if (open1 && PAIRS[prev] === next) { insert(ta, a, b, '\n' + ind + IND + '\n' + ind); const p = a + 1 + ind.length + IND.length; ta.setSelectionRange(p, p); }
      else insert(ta, a, b, '\n' + ind + (open1 ? IND : ''));
      return;
    }
    if (e.key === 'Backspace' && a === b && PAIRS[prev] && PAIRS[prev] === next) { e.preventDefault(); insert(ta, a - 1, a + 1, ''); return; }
    if ((e.key === ')' || e.key === ']' || e.key === '}' || e.key === '"' || e.key === "'") && a === b && next === e.key) { e.preventDefault(); ta.setSelectionRange(a + 1, a + 1); return; }
    if (PAIRS[e.key] && a === b) {
      const quote = e.key === '"' || e.key === "'";
      if (quote && (/[\wÄÖÜäöüß]/.test(prev) || /[\wÄÖÜäöüß]/.test(next))) return; // Apostroph im Wort
      if (!quote && /[\wÄÖÜäöüß]/.test(next)) return;
      e.preventDefault(); insert(ta, a, b, e.key + PAIRS[e.key]); ta.setSelectionRange(a + 1, a + 1);
    }
  });
  document.addEventListener('input', (e) => { const ta = e.target; if (quiet || !(ta instanceof HTMLTextAreaElement) || !ta.dataset.lang) return; open(ta, false); });
  document.addEventListener('focusout', (e) => { if (st && e.target === st.ta) close(); });
  document.addEventListener('scroll', (e) => { if (st && e.target !== box) close(); }, true);
  window.addEventListener('resize', close);
  // Maus oder Finger: Eintrag wählen, ohne dass das Feld den Fokus verliert
  box.addEventListener('pointerdown', (e) => { e.preventDefault(); const it = e.target.closest('.ac-it'); if (it && st) { st.sel = +it.dataset.i; accept(); } });
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(box));
})();
