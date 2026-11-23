/*
 * Kern: Register für Kurse, Konzepte und Glossar, kleine Baukästen für Inhalte, Textformatierung, Syntaxfärbung.
 * Die Inhalte (js/content/*.js) benutzen nur diese Funktionen; die Oberfläche steht in app.js.
 */
(function (g) {
  'use strict';
  const A = (g.Academy = {
    tracks: [], concepts: {}, glossary: [], sqlSetup: '', domains: {}, traces: {}, moved: {},
    stages: { 1: 'Stufe 1: Einstieg', 2: 'Stufe 2: Kontrolle und Struktur', 3: 'Stufe 3: Daten und Objekte', 4: 'Stufe 4: Vertiefung bis zur AP2' }
  });
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  A.esc = esc;

  /* ---------- Registrierung ---------- */
  A.concept = (c) => { A.concepts[c.id] = c; };
  A.track = (t) => { A.tracks.push(t); };
  A.term = (name, text) => { A.glossary.push({ name, text }); };

  /* ---------- Baukästen ---------- */
  // Zeilen: 'code§Erklärung'  (§ trennt Code und Erklärung; ohne § keine Erklärung)
  const split = (s) => { const i = s.indexOf('§'); return i < 0 ? [s, ''] : [s.slice(0, i), s.slice(i + 1)]; };
  A.code = (lang, lines, h, o) => Object.assign({ h, code: { lang, lines: lines.map(split) } }, o || {});
  A.pseudo = (src, h, p) => ({ h, pseudo: src, p });
  A.text = (h, p) => ({ h, p });
  A.tip = (p) => ({ kind: 'tip', p });
  A.warn = (p) => ({ kind: 'warn', p });
  A.info = (p) => ({ kind: 'info', p });
  A.table = (head, rows, h, p) => ({ h, p, table: { head, rows } });
  A.uml = (dsl, h, p) => ({ h, p, uml: dsl });
  A.nsd = (blocks, h, p) => ({ h, p, nsd: blocks });
  A.usecase = (spec, h, p) => ({ h, p, usecase: spec });
  A.activity = (spec, h, p) => ({ h, p, activity: spec });
  A.seq = (actors, msgs, h, p) => ({ h, p, seq: { actors, msgs } });
  A.q = (q, o, a, e) => ({ q, o, a, e });
  // Aufgaben
  A.predict = (prompt, code, answer, hint, expl) => ({ type: 'predict', prompt, code, answer: Array.isArray(answer) ? answer : [answer], hint, expl });
  A.fill = (prompt, tpl, hint) => ({ type: 'fill', prompt, tpl, hint });
  A.js = (prompt, starter, tests, hint, solution) => ({ type: 'js', prompt, starter, tests, hint, solution });
  A.sqlTask = (prompt, solution, hint, o) => Object.assign({ type: 'sql', prompt, solution, hint }, o || {});
  // Schreibtischtest: Code läuft als aufgezeichneter Ablauf; jedes Mal, wenn Zeile `at` (0-basiert) ausgeführt ist,
  // trägt der Lernende die Werte der Spalten `cols` ein. Die ersten `given` Zeilen sind als Beispiel vorgegeben.
  A.desk = (prompt, lang, code, o, hint, expl) => Object.assign({ type: 'desk', prompt, lang, code, given: 1, hint, expl }, o);
  // Bug-Arena: fehlerhafte Zeile (line, 0-basiert, oder Liste gleichwertiger Zeilen) anklicken, Fehlerart wählen
  // (syntax | laufzeit | logik), Fix wählen. fixes[a] ersetzt die Zeile (\n für mehrere Zeilen); expect ist die Ausgabe mit Fix.
  A.bug = (prompt, lang, code, o, hint, expl) => Object.assign({ type: 'bug', prompt, lang, code, a: 0, hint, expl }, o);
  // Clean Code: mehrere Varianten mit gleichem Verhalten (expect prüft run-predict.js für alle), variants[a] ist die sauberste
  A.choose = (prompt, lang, variants, o, hint, expl) => Object.assign({ type: 'choose', prompt, lang, variants, a: 0, hint, expl }, o);
  A.bugKinds = { syntax: 'Syntaxfehler (Compiler meldet ihn)', laufzeit: 'Laufzeitfehler (Exception, Abbruch)', logik: 'Logikfehler (läuft, rechnet falsch)' };
  // Zeile durch einen Fix ersetzen, Einrückung der Originalzeile übernehmen
  A.applyFix = (code, line, fix) => { const ind = (code[line].match(/^\s*/) || [''])[0]; return code.slice(0, line).concat(fix.split('\n').map((l) => ind + l.trim()), code.slice(line + 1)); };

  /* ---------- Aufgezeichnete Abläufe (tools/code-lernen/trace-bauen.js) ---------- */
  // Schlüssel: Sprache + Prüfsumme des Codes. Ändert sich der Code, passt der alte Ablauf nicht mehr und check.js meldet es.
  A.hash = (s) => { let h = 2166136261; for (const ch of String(s)) h = Math.imul(h ^ ch.codePointAt(0), 16777619) >>> 0; return h.toString(16).padStart(8, '0'); };
  A.traceKey = (lang, lines) => lang + ':' + A.hash(lines.join('\n'));
  A.traceFor = (lang, lines) => A.traces[A.traceKey(lang, lines)] || null;
  // Zeilen eines Schreibtischtests: jede fertige Ausführung der Zeile `at`. Ruft die Zeile eine Methode auf, meldet der Ablauf
  // sie zweimal (beim Sprung hinein und nach der Rückkehr); gezählt wird nur der Stand auf der Ebene der Zeile selbst.
  A.deskRows = (tr, at) => {
    const ev = tr.ev.map((e, i) => ({ e, prev: tr.ev[i - 1] })).filter((x) => x.e.line === at && !x.e.end && !x.e.error);
    const tiefe = Math.min(...ev.map((x) => x.e.scopes.length));
    return ev.filter((x) => x.e.scopes.length === tiefe);
  };
  // Wert einer Variable nach der Zeile. Ist sie danach schon außer Sichtweite (Laufvariable von for-each am Rumpfende),
  // gilt der Stand vor der Zeile.
  A.deskValue = (row, name) => {
    for (const sc of [row.e.scopes, row.prev ? row.prev.scopes : []]) for (let k = sc.length - 1; k >= 0; k--) if (name in sc[k].vars) return sc[k].vars[name];
    return null;
  };

  /* ---------- Zusammenbau einer Lektion aus Konzept + Sprache ---------- */
  // standalone: die Lektion bringt alles selbst mit (Beispiele aus einem Praxis-Szenario); vom Konzept bleiben nur Titel und Ziel als Rückfall.
  // domain: Schlüssel in A.domains, wird als Szenario über der Lektion gezeigt. terms: Fachbegriffe, die im Text erklärt werden müssen.
  A.build = (track, spec) => {
    const c = spec.concept ? A.concepts[spec.concept] : null;
    if (spec.concept && !c) throw new Error('Konzept fehlt: ' + spec.concept);
    const own = !!spec.standalone, cc = own ? null : c;
    const L = {
      id: track.id + '-' + (spec.concept || spec.id), track: track.id,
      title: spec.title || (c && c.title), goal: spec.goal || (c && c.goal), stage: spec.stage || (c && c.stage) || 1, concept: spec.concept || null,
      standalone: own, domain: spec.domain || null, terms: spec.terms || [],
      idea: cc && !spec.noIdea ? cc.idea : [],
      parts: spec.parts || [],
      pseudo: cc && track.id !== 'pseudo' ? cc.pseudo || [] : [],
      pitfalls: [].concat(cc && cc.pitfalls ? cc.pitfalls : [], spec.tips || []),
      quiz: [].concat(cc && cc.quiz ? cc.quiz : [], spec.quiz || []),
      tasks: [].concat(spec.tasks || [], cc && cc.tasks && track.id !== 'sql' ? cc.tasks : [])
    };
    return L;
  };
  A.lessons = (track) => track.lessons.map((s) => A.build(track, s));
  A.findLesson = (id) => { for (const t of A.tracks) for (const s of t.lessons) { const l = A.build(t, s); if (l.id === id) return { track: t, lesson: l }; } return null; };

  /* ---------- Text: **fett**, `code`, Absätze, Listen ---------- */
  const inl = (t) => esc(t).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  A.md = (s) => {
    if (!s) return '';
    return String(s).split(/\n{2,}/).map((b) => {
      const L = b.split('\n');
      if (L.every((l) => /^\s*[-•]\s+/.test(l))) return '<ul>' + L.map((l) => '<li>' + inl(l.replace(/^\s*[-•]\s+/, '')) + '</li>').join('') + '</ul>';
      if (L.every((l) => /^\s*\d+\.\s+/.test(l))) return '<ol>' + L.map((l) => '<li>' + inl(l.replace(/^\s*\d+\.\s+/, '')) + '</li>').join('') + '</ol>';
      return '<p>' + L.map(inl).join('<br>') + '</p>';
    }).join('');
  };
  A.inl = inl;

  /* ---------- Syntaxfärbung (klein und bewusst einfach) ---------- */
  const W = (s) => new Set(s.split(' '));
  const LANG = {
    java: { c: '//', kw: W('abstract break case catch class continue default do else enum extends final finally for if implements import instanceof interface new package private protected public return static super switch this throw throws try void while true false null var'), ty: W('int long double float boolean char byte short String Integer Double Boolean List ArrayList Map HashMap Scanner Math System Object Exception') },
    javascript: { c: '//', kw: W('async await break case catch class const continue default do else export extends finally for function if import in instanceof let new of return static super switch this throw try typeof var while true false null undefined'), ty: W('Array Object String Number Boolean Math JSON Promise Map Set console document window') },
    python: { c: '#', kw: W('and as assert break class continue def del elif else except finally for from global if import in is lambda not or pass raise return try while with yield True False None self'), ty: W('int str float bool list dict set tuple print len range input open') },
    c: { c: '//', pp: true, kw: W('break case continue default do else enum for goto if return sizeof static struct switch typedef while const NULL'), ty: W('int long double float char void short unsigned signed size_t FILE bool') },
    cpp: { c: '//', pp: true, kw: W('break case catch class const continue default delete do else enum for friend if namespace new nullptr operator override private protected public return static struct switch template this throw try using virtual while true false auto'), ty: W('int long double float char void bool string vector map cout cin endl std size_t unsigned') },
    csharp: { c: '//', kw: W('abstract as base break case catch class const continue default do else enum finally for foreach if in interface internal is namespace new null override private protected public readonly return static struct switch this throw try using var virtual void while true false get set'), ty: W('int long double float bool char string decimal object List Dictionary Console Math Exception') },
    sql: { c: '--', ci: true, kw: W('SELECT FROM WHERE AND OR NOT IN BETWEEN LIKE IS NULL ORDER BY GROUP HAVING JOIN INNER LEFT RIGHT OUTER ON AS DISTINCT LIMIT OFFSET INSERT INTO VALUES UPDATE SET DELETE CREATE TABLE PRIMARY KEY FOREIGN REFERENCES DEFAULT ASC DESC UNION CASE WHEN THEN ELSE END DROP ALTER ADD'), ty: W('INTEGER INT TEXT REAL VARCHAR DATE COUNT SUM AVG MIN MAX ROUND LENGTH UPPER LOWER') },
    pseudo: { c: '//', ci: true, kw: W('ALGORITHMUS START METHODE RÜCKGABE RUECKGABE SCHREIBE LIES AUSGABE EINGABE WENN DANN SONST ENDE SOLANGE MACHE WIEDERHOLE BIS FÜR FUER VON SCHRITT JEDES IN FUNKTION GIB ZURÜCK ZURUECK SETZE AUF UND ODER NICHT DIV MOD WAHR FALSCH'), ty: W('LÄNGE LAENGE ANHÄNGEN ANHAENGEN LETZTES_ENTFERNEN ERSTES_ENTFERNEN BETRAG WURZEL ABRUNDEN AUFRUNDEN RUNDEN MAX MIN TEXT ZAHL') }
  };
  function findComment(line, marker) {
    let q = null;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (q) { if (ch === '\\') i++; else if (ch === q) q = null; continue; }
      if (ch === '"' || ch === '\'' || ch === '„') { q = ch === '„' ? '“' : ch; continue; }
      if (line.startsWith(marker, i)) return i;
    }
    return -1;
  }
  A.hl = (lang, line) => {
    const L = LANG[lang];
    if (!L) return esc(line);
    if (L.pp && /^\s*#/.test(line)) return '<span class="t-pp">' + esc(line) + '</span>';
    let code = line, com = '';
    const ci = findComment(line, L.c);
    if (ci >= 0) { code = line.slice(0, ci); com = line.slice(ci); }
    const re = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|„[^“]*“)|(\b\d+(?:\.\d+)?\b)|([A-Za-zÄÖÜäöüß_][A-Za-z0-9ÄÖÜäöüß_]*)/g;
    let out = '', last = 0, m;
    while ((m = re.exec(code))) {
      out += esc(code.slice(last, m.index));
      last = m.index + m[0].length;
      if (m[1]) out += '<span class="t-str">' + esc(m[1]) + '</span>';
      else if (m[2]) out += '<span class="t-num">' + m[2] + '</span>';
      else {
        const w = L.ci ? m[3].toUpperCase() : m[3];
        if (L.kw.has(w)) out += '<span class="t-kw">' + esc(m[3]) + '</span>';
        else if (L.ty.has(w)) out += '<span class="t-ty">' + esc(m[3]) + '</span>';
        else if (code[last] === '(') out += '<span class="t-fn">' + esc(m[3]) + '</span>';
        else out += '<span class="t-var">' + esc(m[3]) + '</span>';
      }
    }
    out += esc(code.slice(last));
    if (com) out += '<span class="t-com">' + esc(com) + '</span>';
    return out;
  };

  // Schlüsselwörter und Typen einer Sprache, für die Autovervollständigung in den Eingabefeldern
  A.langWords = (lang) => (LANG[lang] ? [...LANG[lang].kw, ...LANG[lang].ty] : []);
  A.langNames = { text: 'Konsole', java: 'Java', javascript: 'JavaScript', python: 'Python', c: 'C', cpp: 'C++', csharp: 'C#', sql: 'SQL', pseudo: 'Pseudocode' };
})(typeof window !== 'undefined' ? window : globalThis);
