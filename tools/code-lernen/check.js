// Prüft alle Lerninhalte:  node tools/check.js
// - Quiz: Antwortindex gültig
// - Pseudocode-Beispiele und -Aufgaben werden wirklich ausgeführt
// - JavaScript-Beispiele laufen, JS-Aufgaben haben eine funktionierende Lösung, die Startvorlage besteht noch nicht
// - SQL-Aufgaben: Musterlösung läuft und liefert Ergebnis
// - Klammern und Anführungszeichen in allen Codebeispielen stimmen
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.join(__dirname, '..', '..', 'code-lernen');
global.window = globalThis;
const Pseudo = require(path.join(root, 'js/pseudo.js'));
require(path.join(root, 'js/uml.js'));
require(path.join(root, 'js/core.js'));
const A = globalThis.Academy;

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const files = [...html.matchAll(/src="(js\/content\/[^"?]+)[^"]*"/g)].map((m) => m[1]);
let problems = 0, warnings = 0;
const bad = (m) => { problems++; console.log('FEHLER  ' + m); };
const warn = (m) => { warnings++; console.log('Hinweis ' + m); };
for (const f of files) {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) { warn('Datei fehlt noch: ' + f); continue; }
  try { require(p); } catch (e) { bad(f + ' lädt nicht: ' + e.message); }
}

const norm = (s) => String(s).replace(/\r/g, '').split('\n').map((x) => x.trim()).filter((x) => x !== '').join('\n');

function balanced(lang, lines) {
  // Klammern/Anführungszeichen je Block (Kommentare und Texte ausgenommen), mehrzeilig zusammengefasst
  const open = '([{', close = ')]}';
  const stack = [];
  const cm = { java: '//', javascript: '//', c: '//', cpp: '//', csharp: '//', python: '#', sql: '--', pseudo: '//' }[lang];
  for (let n = 0; n < lines.length; n++) {
    let s = lines[n];
    if ((lang === 'c' || lang === 'cpp') && /^\s*#/.test(s)) continue;
    let q = null;
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (q) { if (ch === '\\' && q !== '`') i++; else if (ch === q) q = null; continue; }
      if (cm && s.startsWith(cm, i)) break;
      if (ch === '"' || ch === '\'' || (ch === '`' && lang === 'javascript')) {
        // Apostroph in C-Zeichenliteralen ok; in Python/SQL beides Text
        q = ch; continue;
      }
      if (ch === '„') { q = '“'; continue; }
      if (open.includes(ch)) stack.push([ch, n + 1]);
      else if (close.includes(ch)) {
        const top = stack.pop();
        if (!top || open.indexOf(top[0]) !== close.indexOf(ch)) return 'Klammer ' + ch + ' in Zeile ' + (n + 1) + ' passt nicht';
      }
    }
    if (q && !(lang === 'javascript' && q === '`')) return 'Text in Zeile ' + (n + 1) + ' wird nicht geschlossen';
  }
  if (stack.length) return 'Klammer ' + stack[stack.length - 1][0] + ' aus Zeile ' + stack[stack.length - 1][1] + ' wird nicht geschlossen';
  return null;
}

function runJs(code) {
  const logs = [];
  const ctx = vm.createContext({ console: { log: (...a) => logs.push(a.map((x) => (typeof x === 'string' ? x : JSON.stringify(x))).join(' ')) }, setTimeout, Promise });
  try { vm.runInContext(code, ctx, { timeout: 1500 }); return { logs, ctx }; } catch (e) { return { error: e.message, logs, ctx }; }
}

function checkParts(where, parts) {
  for (const [i, p] of (parts || []).entries()) {
    const w = where + ' Teil ' + (i + 1) + (p.h ? ' („' + p.h + '“)' : '');
    if (p.code) {
      const lines = p.code.lines.map((l) => l[0]);
      if (!lines.length) bad(w + ': leerer Code');
      const b = balanced(p.code.lang, lines);
      if (b) bad(w + ' [' + p.code.lang + ']: ' + b);
      if (!p.code.lines.some((l) => l[1])) warn(w + ': keine einzige Zeilenerklärung');
      if (p.code.lang === 'javascript' && !p.noRun) {
        const r = runJs(lines.join('\n'));
        if (r.error) bad(w + ' [javascript] läuft nicht: ' + r.error);
      }
      if (p.code.lang === 'sql' && globalThis.__SQL) {
        try { const db = new globalThis.__SQL.Database(); db.run(A.sqlSetup); db.exec(lines.join('\n')); } catch (e) { bad(w + ' [sql] läuft nicht: ' + e.message); }
      }
      if (p.code.lang === 'pseudo') {
        const r = Pseudo.run(lines.join('\n'), { inputs: ['4', '7'] });
        if (r.error && !p.expectError) bad(w + ' [pseudo]: ' + r.error.msg);
      }
    }
    if (p.pseudo) {
      const r = Pseudo.run(p.pseudo, { inputs: ['4', '7'] });
      if (r.error && !p.expectError) bad(w + ': Pseudocode-Fehler in Zeile ' + (r.error.line + 1) + ': ' + r.error.msg);
      if (!r.error && p.expectError) bad(w + ': sollte einen Fehler erzeugen, tut es aber nicht');
    }
    if (p.uml) { try { const d = UML.parse(p.uml); if (!d.classes.length) bad(w + ': UML ohne Klassen'); UML.classDiagram(p.uml); } catch (e) { bad(w + ': UML ' + e.message); } }
    if (p.seq) { for (const m of p.seq.msgs) for (const n of [m[0], m[1]]) if (!p.seq.actors.includes(n)) bad(w + ': Sequenz kennt ' + n + ' nicht'); }
  }
}

(async () => {
  let SQL = null;
  try {
    const initSqlJs = require(path.join(root, 'js/vendor/sql-wasm.js'));
    const b64 = fs.readFileSync(path.join(root, 'js/vendor/sql-wasm-b64.js'), 'utf8').match(/'([^']+)'/)[1];
    SQL = await initSqlJs({ wasmBinary: Buffer.from(b64, 'base64') }); globalThis.__SQL = SQL;
  } catch (e) { warn('SQL-Motor nicht ladbar: ' + e.message); }

  const ids = new Set();
  let nLessons = 0, nTasks = 0, nQuiz = 0, nCode = 0, nUnique = 0, nLongest = 0;
  const seenQ = new Set();
  for (const t of A.tracks) {
    if (!t.id || !t.title || !Array.isArray(t.lessons)) { bad('Kurs unvollständig: ' + JSON.stringify(t.id)); continue; }
    for (const spec of t.lessons) {
      let L;
      try { L = A.build(t, spec); } catch (e) { bad(t.id + ': ' + e.message); continue; }
      nLessons++;
      if (ids.has(L.id)) bad('Doppelte Lektions-ID ' + L.id); ids.add(L.id);
      if (!L.title) bad(L.id + ': Titel fehlt');
      if (!L.goal) bad(L.id + ': Ziel fehlt');
      const all = [].concat(L.idea, L.parts, L.pseudo, L.pitfalls.filter((x) => typeof x === 'object'));
      checkParts(L.id, all);
      nCode += all.filter((p) => p.code).length;
      if (!L.parts.length && !L.idea.length) bad(L.id + ': kein Inhalt');
      for (const [i, q] of L.quiz.entries()) {
        nQuiz++;
        if (!(q.a >= 0 && q.a < q.o.length)) bad(L.id + ' Quiz ' + (i + 1) + ': Antwortindex ungültig');
        if (new Set(q.o).size !== q.o.length) bad(L.id + ' Quiz ' + (i + 1) + ': doppelte Antwortoptionen');
        if (!q.e) warn(L.id + ' Quiz ' + (i + 1) + ': keine Erklärung');
        // Längen-Tell (Allvater 20.11.2026): Die richtige Antwort darf nicht durch ihre Länge auffallen.
        // Ab 20 Zeichen höchstens 1,3-mal so lang wie die längste falsche; kurze Begriffe (FALSCH, Parallelogramm) sind ausgenommen.
        const len = (s) => String(s).replace(/\*\*|`/g, '').length, right = len(q.o[q.a]), wrongMax = Math.max(...q.o.filter((_, j) => j !== q.a).map(len));
        if (right >= 20 && right > wrongMax * 1.3) bad(L.id + ' Quiz ' + (i + 1) + ': richtige Antwort ' + (right / wrongMax).toFixed(1) + '-mal so lang wie die längste falsche (Längen-Tell)');
        if (!seenQ.has(q.q)) { seenQ.add(q.q); nUnique++; if (right > wrongMax) nLongest++; }
      }
      for (const [i, k] of L.tasks.entries()) {
        nTasks++;
        const w = L.id + ' Aufgabe ' + (i + 1) + ' (' + k.type + ')';
        if (k.type === 'predict') {
          if (!k.code || !k.code.length || !k.answer || !k.answer[0]) { bad(w + ': unvollständig'); continue; }
          if (!k.lang || k.lang === 'pseudo') {
            const r = Pseudo.run(k.code.join('\n'), { inputs: ['5', '3'] });
            if (r.error) bad(w + ': Pseudocode-Fehler: ' + r.error.msg);
            else if (!k.answer.some((a) => norm(a) === norm(r.output))) bad(w + ': Lösung stimmt nicht. Erwartet ' + JSON.stringify(k.answer[0]) + ', tatsächlich ' + JSON.stringify(norm(r.output)));
          } else if (k.lang === 'javascript') {
            const r = runJs(k.code.join('\n'));
            if (r.error) bad(w + ': JS-Fehler ' + r.error); else if (!k.answer.some((a) => norm(a) === norm(r.logs.join('\n')))) bad(w + ': Lösung stimmt nicht. Erwartet ' + JSON.stringify(k.answer[0]) + ', tatsächlich ' + JSON.stringify(r.logs.join('\n')));
          } else { const b = balanced(k.lang, k.code); if (b) bad(w + ': ' + b); }
        } else if (k.type === 'fill') {
          if (!/\{\{.*?\}\}/.test(k.tpl)) bad(w + ': keine Lücke');
        } else if (k.type === 'js') {
          const run = (code) => { const r = runJs(code); if (r.error) return { error: r.error }; return { res: k.tests.map((t) => { try { return JSON.stringify(r.ctx[t.fn](...JSON.parse(JSON.stringify(t.args)))) === JSON.stringify(t.expect); } catch (e) { return false; } }) }; };
          if (!k.solution) bad(w + ': Musterlösung fehlt');
          else { const r = run(k.solution); if (r.error) bad(w + ': Lösung hat Fehler ' + r.error); else if (!r.res.every(Boolean)) bad(w + ': Musterlösung besteht die Tests nicht (' + r.res.map((x) => (x ? 'ok' : 'x')).join('') + ')'); }
          const s = run(k.starter); if (s.res && s.res.every(Boolean)) bad(w + ': Startvorlage besteht schon alle Tests');
        } else if (k.type === 'sql') {
          if (!SQL) continue;
          try {
            const db = new SQL.Database(); db.run(A.sqlSetup);
            const r = db.exec(k.solution);
            const res = k.verify ? db.exec(k.verify) : r;
            if (!res.length || !res[res.length - 1].values.length) warn(w + ': Musterlösung liefert keine Zeilen');
          } catch (e) { bad(w + ': Musterlösung fehlerhaft: ' + e.message); }
        } else bad(w + ': unbekannter Typ');
      }
    }
  }
  // Bei vier Antworten wäre die richtige zufällig in etwa 25 % die längste; deutlich mehr wäre ein Muster zum Raten
  if (nLongest / nUnique > 0.4) warn('Bei ' + Math.round(100 * nLongest / nUnique) + ' % der Quizfragen ist die richtige Antwort die längste (Ziel höchstens 40 %)');
  for (const [i, g] of A.glossary.entries()) if (!g.name || !g.text) bad('Glossar-Eintrag ' + i + ' unvollständig');
  const glSeen = new Set(); for (const g of A.glossary) { const k = (g.name || '').toLowerCase(); if (glSeen.has(k)) bad('Glossar: „' + g.name + '“ doppelt'); glSeen.add(k); }
  for (const [k, v] of Object.entries(A.pseudoSamples || {})) { const r = Pseudo.run(v, { inputs: ['6'] }); if (r.error) bad('Pseudocode-Beispiel „' + k + '“: ' + r.error.msg); }
  // Kürzel (Hover-Erklärungen): vollständig, jeder Name und jede Schreibweise nur einmal, Kurse in l: gibt es wirklich
  const kzSeen = new Set(), trackIds = new Set(A.tracks.map((t) => t.id));
  for (const [i, e] of (A.kuerzel || []).entries()) {
    if (!e[0] || !e[1] || !e[2]) bad('Kürzel ' + i + ' unvollständig');
    const o = e[3] || {};
    for (const n of [e[0]].concat(o.a || [])) { if (kzSeen.has(n)) bad('Kürzel „' + n + '“ doppelt'); kzSeen.add(n); }
    for (const k of Object.keys(o.l || {})) if (!trackIds.has(k)) bad('Kürzel „' + e[0] + '“: unbekannter Kurs ' + k);
  }
  console.log('\n' + A.tracks.length + ' Kurse, ' + nLessons + ' Lektionen, ' + nCode + ' Codebeispiele, ' + nQuiz + ' Quizfragen, ' + nTasks + ' Übungen, ' + A.glossary.length + ' Begriffe, ' + (A.kuerzel || []).length + ' Kürzel.');
  console.log(problems ? problems + ' FEHLER, ' + warnings + ' Hinweise' : 'Keine Fehler. ' + warnings + ' Hinweise.');
  process.exit(problems ? 1 : 0);
})();
