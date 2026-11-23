// Zeichnet die Abläufe aller Beispiele (A.code mit trace: true), Schreibtischtests (A.desk) und Bugs mit trace: true
// mit dem echten JDK bzw. Python auf und schreibt sie nach code-lernen/js/content/traces-<sprache>.js.
// Der Ablauf-Player spielt sie im Browser nur ab.
//   node tools/code-lernen/trace-bauen.js [java|python]            neue oder geänderte Beispiele aufzeichnen, Überzähliges entfernen
//   node tools/code-lernen/trace-bauen.js [java|python] --alle     alles neu aufzeichnen
//   node tools/code-lernen/trace-bauen.js [java|python] --pruefen  nur prüfen, ob zu jedem Beispiel ein aktueller Ablauf existiert
// Java braucht ein JDK (javac, java mit jdk.jdi), Python 3.8 oder neuer. Pfade über JAVAC/JAVA/PYTHON, sonst aus dem PATH.
const fs = require('fs'), os = require('os'), path = require('path'), cp = require('child_process');
global.window = globalThis;
const WURZEL = path.join(__dirname, '..', '..'), CL = path.join(WURZEL, 'code-lernen');
require(path.join(CL, 'js/pseudo.js')); require(path.join(CL, 'js/uml.js')); require(path.join(CL, 'js/core.js'));
const A = globalThis.Academy;
const html = fs.readFileSync(path.join(CL, 'index.html'), 'utf8');
for (const f of [...html.matchAll(/src="(?:\/code-lernen\/)?(js\/content\/[^"?]+)[^"]*"/g)].map((m) => m[1])) require(path.join(CL, f));
const SPR = process.argv.includes('python') ? 'python' : 'java', PY = SPR === 'python';
const ZIEL = path.join(CL, 'js/content/traces-' + SPR + '.js');
const PRUEFEN = process.argv.includes('--pruefen'), ALLE = process.argv.includes('--alle');
const JAVAC = process.env.JAVAC || 'javac', JAVA = process.env.JAVA || 'java', PYTHON = process.env.PYTHON || 'python';
const TRACER = path.join(__dirname, 'trace-java');

/* ---------- Welche Abläufe werden gebraucht? ---------- */
const gebraucht = new Map(); // Schlüssel -> { lines, wo }
for (const t of A.tracks) for (const s of t.lessons) {
  const L = A.build(t, s);
  for (const p of [].concat(L.idea, L.parts)) if (p.code && p.code.lang === SPR && p.trace) {
    const lines = p.code.lines.map((l) => l[0]);
    gebraucht.set(A.traceKey(SPR, lines), { lines, wo: L.id + ' „' + (p.h || '') + '“' });
  }
  L.tasks.forEach((k, i) => { if (k.lang === SPR && (k.type === 'desk' || (k.type === 'bug' && k.trace))) gebraucht.set(A.traceKey(SPR, k.code), { lines: k.code, wo: L.id + ' Aufgabe ' + (i + 1) }); });
}
const vorhanden = A.traces || {};
const fehlt = [...gebraucht.keys()].filter((k) => !vorhanden[k]);
const ueber = Object.keys(vorhanden).filter((k) => k.startsWith(SPR + ':') && !gebraucht.has(k));
if (PRUEFEN) {
  fehlt.forEach((k) => console.log('FEHLT ODER VERALTET: ' + gebraucht.get(k).wo));
  ueber.forEach((k) => console.log('ÜBERZÄHLIG: ' + k));
  console.log(gebraucht.size + ' Abläufe gebraucht: ' + (fehlt.length + ueber.length ? fehlt.length + ' fehlen, ' + ueber.length + ' überzählig' : 'AKTUELL'));
  process.exit(fehlt.length + ueber.length ? 1 : 0);
}

/* ---------- Quelltext: tools/code-lernen/java-quelle.js ---------- */
const quelltext = require('./java-quelle').bauen;

/* ---------- Rohschritte in Ereignisse für den Player umsetzen ---------- */
// Ein Rohschritt ist der Zustand vor einer Zeile. Ein Ereignis ist „Zeile ausgeführt, danach dieser Zustand“.
// Letzte Zeile des Blocks, der in Zeile z mit { beginnt (Klammern zählen, Texte in Anführungszeichen ausgenommen)
function blockEnde(lines, z) {
  if (PY) {
    const ein = (l) => l.match(/^\s*/)[0].length, basis = ein(lines[z]);
    let i = z + 1; while (i < lines.length && (!lines[i].trim() || ein(lines[i]) > basis)) i++;
    return i - 1;
  }
  let tiefe = 0;
  for (let i = z; i < lines.length; i++) {
    const zeile = (i === z ? lines[i].replace(/^\s*}/, '') : lines[i]).replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, '');
    for (const ch of zeile) { if (ch === '{') tiefe++; else if (ch === '}') { tiefe--; if (tiefe === 0 && i > z) return i; } }
    if (tiefe === 0 && i > z) return i;
  }
  return lines.length - 1;
}
// Wahr oder falsch, abgelesen am Sprungziel: Geht es im Block weiter, war die Bedingung wahr
function bedingung(lines, z, naechste) {
  const code = lines[z];
  if (/^\s*}\s*while\b/.test(code)) return naechste >= 0 && naechste < z ? 'Bedingung wahr, zurück an den Anfang (Zeile ' + (naechste + 1) + ')' : 'Bedingung falsch, Schleife endet';
  const ende = blockEnde(lines, z);
  // Die schließende Zeile gehört nicht mehr dazu: Springt der Ablauf auf "} else …", war die Bedingung falsch
  if (naechste > z && (PY ? naechste <= ende : naechste < ende)) return 'Bedingung wahr, weiter in Zeile ' + (naechste + 1);
  return 'Bedingung falsch, ' + (naechste >= 0 ? 'weiter in Zeile ' + (naechste + 1) : 'Ende');
}
const scopes = (s) => s.frames.filter((f) => f.method !== '__ende' && !/\/0x|\$\$Lambda/.test(f.cls || '')).map((f) => {
  const eigen = !f.cls || f.cls === 'Main';
  if (f.method === 'main' && eigen) return { name: '', vars: f.vars };
  if (f.method === '<init>') return { name: f.cls, ctor: true, vars: f.vars };
  if (/^lambda\$/.test(f.method)) return { name: 'Lambda', lambda: true, vars: f.vars };
  return { name: eigen ? f.method : f.cls + '.' + f.method, vars: f.vars };
});
// "Artikel@1{name="Maus", lager=35}" in Nummer und Attribute zerlegen (Kommas in Texten und Unterobjekten zählen nicht)
function objekt(w) {
  const m = /^(\w+)@(\d+)\{(.*)\}$/.exec(w || ''); if (!m) return null;
  const felder = {}; let tiefe = 0, q = false, start = 0;
  const teile = [];
  for (let i = 0; i <= m[3].length; i++) {
    const ch = m[3][i];
    if ((ch === '"' || (PY && ch === "'")) && m[3][i - 1] !== '\\') q = !q;
    if (!q && (ch === '{' || ch === '[')) tiefe++;
    if (!q && (ch === '}' || ch === ']')) tiefe--;
    if (i === m[3].length || (!q && tiefe === 0 && ch === ',' && m[3][i + 1] === ' ')) { teile.push(m[3].slice(start, i)); start = i + 2; }
  }
  for (const t of teile) { const k = t.indexOf('='); if (k > 0) felder[t.slice(0, k)] = t.slice(k + 1); }
  return { cls: m[1], nr: m[2], felder };
}
// Änderung einer Variable beschreiben; bei demselben Objekt nur die geänderten Attribute
function aenderung(name, alt, neu) {
  const a = objekt(alt), n = objekt(neu);
  if (a && n && a.nr === n.nr) return Object.keys(n.felder).filter((k) => a.felder[k] !== n.felder[k]).map((k) => name + '.' + k + (k in a.felder ? ': ' + a.felder[k] + ' → ' + n.felder[k] : ' wird angelegt: ' + n.felder[k]));
  return [name + ': ' + alt + ' → ' + neu];
}
function satz(lines, z, vorher, nachher, outVorher, outNachher, naechste, ausnahme) {
  const code = lines[z], v = vorher[vorher.length - 1] || { vars: {} }, n = nachher[nachher.length - 1] || { vars: {} }, teile = [];
  const pruefung = /^\s*(if|elif|else if|while|for|}\s*else if|}\s*while)\b/.test(code) || /^\s*}\s*while\b/.test(code);
  // Exceptions: wo sie fliegen, dass der Rest übersprungen wird, wo catch sie fängt
  if (/^\s*throw\b/.test(code)) return 'throw: Die Exception verlässt die Methode sofort, Java sucht den passenden catch';
  if (PY && /^\s*raise\b/.test(code)) return 'raise: Die Exception verlässt die Funktion sofort, Python sucht den passenden except';
  if (PY && ausnahme) {
    if (naechste < 0) return 'Exception: ' + ausnahme + '. Kein except fängt sie, das Programm bricht ab';
    if (nachher.length < vorher.length) return 'Exception fliegt aus ' + v.name + '(…) heraus: ' + ausnahme + '. Weiter im except, Zeile ' + (naechste + 1);
    return 'Exception: ' + ausnahme + '. Der Rest des try-Blocks wird übersprungen, weiter im except, Zeile ' + (naechste + 1);
  }
  if (PY && /^\s*except\b/.test(code)) { const e = Object.entries(n.vars).find(([k]) => !(k in v.vars)); return 'except fängt die Exception' + (e ? ': ' + e[0] + ' = ' + e[1] : ''); }
  if (PY && /^\s*match\b/.test(code)) return 'match: Python vergleicht mit den Fällen von oben nach unten, weiter in Zeile ' + (naechste + 1);
  if (PY && /^\s*case\b/.test(code)) return naechste > z && naechste <= blockEnde(lines, z) ? 'Dieser Fall passt, weiter in Zeile ' + (naechste + 1) : 'Fall passt nicht, weiter in Zeile ' + (naechste + 1);
  if (PY && /^\s*try\s*:/.test(code)) return 'try: Ab hier darf ein Fehler auftreten, except fängt ihn';
  if (PY && /^\s*(import|from)\s/.test(code)) return 'import: Das Modul wird geladen';
  if (PY && /^\s*class\s+(\w+)/.test(code)) return 'Die Klasse ' + code.match(/class\s+(\w+)/)[1] + ' wird angelegt. Ihre Methoden laufen erst, wenn jemand sie aufruft';
  if (PY && /^\s*def\s+(\w+)/.test(code)) return 'Die Funktion ' + code.match(/def\s+(\w+)/)[1] + ' wird angelegt. Sie läuft erst beim Aufruf';
  const ziel = nachher[nachher.length - 1] || { vars: {} }, basis = vorher[nachher.length - 1] || { vars: {} };
  const exc = Object.entries(ziel.vars).find(([k, w]) => !(k in basis.vars) && /^\w+(Exception|Error)\b/.test(w));
  if (exc) {
    if (/\bcatch\s*\(/.test(code)) return 'catch fängt die Exception: ' + exc[1];
    if (nachher.length < vorher.length) return 'Exception fliegt aus ' + v.name + '(…) heraus: ' + exc[1] + '. Weiter im catch, Zeile ' + (naechste + 1);
    return 'Exception: ' + exc[1] + '. Der Rest des try-Blocks wird übersprungen, weiter im catch, Zeile ' + (naechste + 1);
  }
  if (/^(public\s+)?((abstract|final)\s+)*class\b/.test(code) && nachher.length >= vorher.length) return 'Standardkonstruktor: Die Attribute bekommen ihre Startwerte';
  if (nachher.length > vorher.length && n.lambda) teile.push('Das Lambda läuft' + (Object.keys(n.vars).length ? ' mit ' + Object.entries(n.vars).map(([k, w]) => k + ' = ' + (objekt(w) ? objekt(w).cls + '@' + objekt(w).nr : w)).join(', ') : ''));
  else if (nachher.length < vorher.length && v.lambda) teile.push('Lambda fertig, sein Ergebnis geht zurück an die Bibliothek');
  else if (nachher.length > vorher.length) teile.push(n.ctor ? 'Konstruktor ' + n.name + '(…) läuft, das neue Objekt ist ' + (PY ? 'self' : 'this') : 'Aufruf von ' + n.name + '(…)');
  else if (nachher.length < vorher.length) teile.push(v.ctor && n.ctor ? 'Teil der Oberklasse ' + v.name + ' fertig, weiter im Konstruktor ' + n.name + '(…)' : v.ctor ? 'Objekt fertig, zurück aus dem Konstruktor' : 'Rücksprung aus ' + v.name + '(…)');
  else for (const [k, w] of Object.entries(n.vars)) {
    if (!(k in v.vars)) teile.push(k + ' wird angelegt: ' + w);
    else if (v.vars[k] !== w) teile.push(...aenderung(k, v.vars[k], w));
  }
  if (outNachher.length > outVorher.length) teile.push('Ausgabe: ' + outNachher.slice(outVorher.length).replace(/\n$/, '').replace(/\n/g, ' ⏎ '));
  if (pruefung) teile.push(bedingung(lines, z, naechste));
  else if (/\bswitch\s*\(/.test(code)) teile.push('switch: Sprung zum passenden Fall in Zeile ' + (naechste + 1));
  else if (/^\s*case\b.*->/.test(code)) teile.push('Dieser Fall passt, sein Wert wird das Ergebnis');
  if (!teile.length && /^\s*(continue|break)\b/.test(code)) teile.push(code.trim().replace(/;$/, '') + (naechste >= 0 ? ': weiter in Zeile ' + (naechste + 1) : ': Die Schleife endet, danach ist das Programm zu Ende'));
  if (!teile.length && /^\s*}/.test(code)) teile.push('Ende des Blocks, weiter in Zeile ' + (naechste + 1));
  if (!teile.length && /^\s*(else|})?\s*else\b/.test(code)) teile.push('weiter im else-Zweig');
  // Kopf einer Methode oder eines Konstruktors: die Parameter haben ihre Werte
  if (!teile.length && /^\s*((public|private|protected|static|final)\s+)*([\w<>\[\],]+\s+)?\w+\s*\([^)]*\)\s*\{/.test(code) && !/^\s*(if|for|while|switch|catch)\b/.test(code)) teile.push('Kopf der Methode: die Parameter stehen bereit');
  // Zuweisung, die nichts ändert (zum Beispiel 0 bleibt 0)
  if (!teile.length && /^\s*((private|protected|public|static|final)\s+)*([\w<>\[\]]+\s+)?[\w.\[\]]+\s*[-+*/%]?=[^=]/.test(code)) teile.push('Zuweisung, der Wert bleibt gleich');
  // Aufruf ohne Zuweisung, nach dem Rücksprung: Java hat noch einen Rückgabewert auf dem Stapel und wirft ihn weg
  if (!teile.length && /^\s*[\w.]+\s*\(.*\)\s*;?\s*$/.test(code)) teile.push('Aufruf beendet, der Rückgabewert wird nirgends gespeichert');
  if (PY && !teile.length && /^\s*pass\s*$/.test(code)) teile.push('pass: Platzhalter, hier passiert nichts');
  if (PY && !teile.length && /^\s*with\b/.test(code)) teile.push('Der with-Block endet, die Datei wird automatisch geschlossen');
  return teile.length ? teile.join('; ') : 'Zeile ausgeführt';
}
function ereignisse(lines, roh, zeile) {
  const st = roh.steps, ev = [];
  for (let k = 0; k + 1 < st.length; k++) {
    const z = zeile[st[k].line];
    if (z === undefined) continue;
    let j = k + 1; while (j < st.length && zeile[st[j].line] === undefined && st[j].frames.length) j++;
    const naechste = j < st.length && zeile[st[j].line] !== undefined ? zeile[st[j].line] : -1;
    ev.push({ line: z, scopes: scopes(st[k + 1]), out: st[k + 1].out, msg: satz(lines, z, scopes(st[k]), scopes(st[k + 1]), st[k].out, st[k + 1].out, naechste, st[k + 1].exc) });
  }
  const last = ev[ev.length - 1];
  if (roh.error) ev.push({ line: last ? last.line : 0, error: true, scopes: last ? last.scopes : [], out: roh.out, msg: 'Abbruch mit ' + roh.error });
  else ev.push({ end: true, line: last ? last.line : 0, scopes: last ? last.scopes : [], out: roh.out, msg: 'Programm beendet.' });
  return ev;
}

/* ---------- Aufzeichnen ---------- */
const lauf = (cmd, args, cwd) => cp.spawnSync(cmd, args, { cwd, encoding: 'utf8', timeout: 60000 });
const zuTun = ALLE ? [...gebraucht.keys()] : fehlt;
const neu = {};
for (const k of gebraucht.keys()) if (vorhanden[k] && !zuTun.includes(k)) neu[k] = vorhanden[k];
if (zuTun.length && PY) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cl-trace-'));
  let fehler = 0;
  for (const k of zuTun) {
    const { lines, wo } = gebraucht.get(k), datei = path.join(tmp, k.replace(/\W/g, '_') + '.py');
    fs.writeFileSync(datei, lines.join('\n') + '\n');
    const r = lauf(PYTHON, ['-I', path.join(__dirname, 'trace-python', 'tracer.py'), datei, '2000'], tmp);
    let roh; try { roh = JSON.parse(r.stdout); } catch (e) { fehler++; console.log('FEHLER ' + wo + ': Tracer lieferte kein JSON\n' + (r.stderr || r.stdout).slice(0, 400)); continue; }
    const zeile = Object.fromEntries(lines.map((l, i) => [i + 1, i]));
    neu[k] = { ev: ereignisse(lines, roh, zeile) };
    console.log('aufgezeichnet: ' + wo + ' (' + neu[k].ev.length + ' Schritte)');
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  if (fehler) { console.log(fehler + ' Fehler, nichts geschrieben.'); process.exit(1); }
} else if (zuTun.length) {
  const tracerOut = path.join(TRACER, 'out');
  fs.mkdirSync(tracerOut, { recursive: true });
  let r = lauf(JAVAC, ['-d', tracerOut, path.join(TRACER, 'Tracer.java')]);
  if (r.status) { console.error('Tracer ließ sich nicht übersetzen:\n' + r.stderr); process.exit(1); }
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cl-trace-'));
  let fehler = 0;
  for (const k of zuTun) {
    const { lines, wo } = gebraucht.get(k), dir = fs.mkdtempSync(path.join(tmp, 'b-'));
    const { src, zeile } = quelltext(lines);
    fs.writeFileSync(path.join(dir, 'Main.java'), src);
    r = lauf(JAVAC, ['-g', '-encoding', 'UTF-8', 'Main.java'], dir);
    if (r.status) { fehler++; console.log('FEHLER ' + wo + ': übersetzt nicht\n' + r.stderr.split('\n').slice(0, 6).join('\n')); continue; }
    r = lauf(JAVA, ['-Dstdout.encoding=UTF-8', '-cp', tracerOut, 'Tracer', dir, 'Main', '2000']); // JSON in UTF-8, sonst werden Umlaute zu �
    let roh; try { roh = JSON.parse(r.stdout); } catch (e) { fehler++; console.log('FEHLER ' + wo + ': Tracer lieferte kein JSON\n' + (r.stderr || r.stdout).slice(0, 400)); continue; }
    neu[k] = { ev: ereignisse(lines, roh, zeile) };
    console.log('aufgezeichnet: ' + wo + ' (' + neu[k].ev.length + ' Schritte)');
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  if (fehler) { console.log(fehler + ' Fehler, nichts geschrieben.'); process.exit(1); }
}
const sortiert = Object.fromEntries(Object.keys(neu).sort().map((k) => [k, neu[k]]));
fs.writeFileSync(ZIEL, '// Erzeugt von tools/code-lernen/trace-bauen.js aus den ' + (PY ? 'Python' : 'Java') + '-Beispielen. Nicht von Hand bearbeiten.\n'
  + 'Object.assign(window.Academy.traces, ' + JSON.stringify(sortiert) + ');\n');
console.log(Object.keys(sortiert).length + ' Abläufe in ' + path.relative(WURZEL, ZIEL) + (ueber.length ? ', ' + ueber.length + ' überzählige entfernt' : ''));
