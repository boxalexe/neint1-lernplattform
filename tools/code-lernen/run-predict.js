// Führt alle Vorhersage-Aufgaben der Compiler-Sprachen wirklich aus und vergleicht mit der hinterlegten Lösung.
//   node tools/code-lernen/run-predict.js [sprache]
// Braucht lokal: python, javac/java, dotnet, gcc, g++. Pfade über Umgebungsvariablen (PYTHON, JAVAC, JAVA, DOTNET, GCC, GPP)
// oder die Vorgaben unten. Fehlt ein Werkzeug, wird die Sprache als NOT RUN gemeldet.
const fs = require('fs'), os = require('os'), path = require('path'), cp = require('child_process');
global.window = globalThis;
const root = path.join(__dirname, '..', '..', 'code-lernen');
require(path.join(root, 'js/pseudo.js')); require(path.join(root, 'js/uml.js')); require(path.join(root, 'js/core.js'));
const A = globalThis.Academy;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const f of [...html.matchAll(/src="(?:\/code-lernen\/)?(js\/content\/[^"?]+)[^"]*"/g)].map((m) => m[1])) require(path.join(root, f));

const home = os.homedir();
const find = (dir, name) => { try { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); if (e.isFile() && e.name === name) return p; if (e.isDirectory()) { const r = find(p, name); if (r) return r; } } } catch (e) {} return null; };
const tool = {
  python: process.env.PYTHON || path.join(home, 'AppData/Local/Programs/Python/Python312/python.exe'),
  javac: process.env.JAVAC || find(path.join(home, 'tools/jdk'), 'javac.exe'),
  java: process.env.JAVA || find(path.join(home, 'tools/jdk'), 'java.exe'),
  dotnet: process.env.DOTNET || path.join(home, 'tools/dotnet/dotnet.exe'),
  gcc: process.env.GCC || find(path.join(home, 'AppData/Local/Microsoft/WinGet/Packages'), 'gcc.exe'),
  gpp: process.env.GPP || find(path.join(home, 'AppData/Local/Microsoft/WinGet/Packages'), 'g++.exe'),
};
const norm = (s) => String(s).replace(/\r/g, '').split('\n').map((x) => x.trim()).filter((x) => x !== '').join('\n');
const sh = (cmd, args, cwd, input) => cp.spawnSync(cmd, args, { cwd, encoding: 'utf8', timeout: 120000, input, env: Object.assign({}, Object.fromEntries(Object.entries(process.env).filter(([k]) => !/^(__PYVENV_LAUNCHER__|VIRTUAL_ENV|PYTHON.*)$/i.test(k))), { DOTNET_CLI_TELEMETRY_OPTOUT: '1', DOTNET_NOLOGO: '1', DOTNET_SKIP_FIRST_TIME_EXPERIENCE: '1', PATH: path.dirname(tool.gpp || '') + path.delimiter + process.env.PATH }) });

// Vorspann für Aufgaben, die die Klasse Konto benutzen
const KONTO = {
  java: 'class Konto {\n  private String inhaber; private double kontostand;\n  public Konto(String i) { inhaber = i; kontostand = 0; }\n  public void einzahlen(double b) { kontostand += b; }\n  public boolean abheben(double b) { if (b <= kontostand) { kontostand -= b; return true; } return false; }\n  public double getKontostand() { return kontostand; }\n}\n',
  csharp: 'class Konto {\n  public string Inhaber { get; }\n  public double Kontostand { get; private set; }\n  public Konto(string i) { Inhaber = i; Kontostand = 0; }\n  public void Einzahlen(double b) { Kontostand += b; }\n  public bool Abheben(double b) { if (b <= Kontostand) { Kontostand -= b; return true; } return false; }\n}\n',
  cpp: 'class Konto {\n  string inhaber; double kontostand;\npublic:\n  Konto(string n) { inhaber = n; kontostand = 0; }\n  void einzahlen(double b) { kontostand += b; }\n  bool abheben(double b) { if (b <= kontostand) { kontostand -= b; return true; } return false; }\n  double getKontostand() const { return kontostand; }\n};\n',
};
function split(code) {
  const i = code.findIndex((l) => /^\/\/\s*in main/.test(l.trim()));
  return i < 0 ? { defs: [], body: code } : { defs: code.slice(0, i), body: code.slice(i + 1) };
}
function run(lang, code, dir) {
  const { defs, body } = split(code);
  const D = defs.join('\n'), B = body.join('\n'), uses = /Konto/.test(code.join('\n'));
  if (lang === 'pseudo') {
    const P = require(path.join(__dirname, '..', '..', 'code-lernen', 'js', 'pseudo.js'));
    try { P.parse(code.join('\n')); } catch (e) { return { status: 1, phase: 'compile', stdout: '', stderr: e.message }; }
    const r = P.run(code.join('\n'), { inputs: [] });
    return { status: r.error ? 1 : 0, stdout: r.output, stderr: r.error ? r.error.msg : '' };
  }
  if (lang === 'python') { fs.writeFileSync(path.join(dir, 'm.py'), code.join('\n')); const r = sh(tool.python, ['-I', '-X', 'utf8', 'm.py'], dir); if (r.status && /^(SyntaxError|IndentationError|TabError)\b/m.test(r.stderr || '')) r.phase = 'compile'; return r; }
  if (lang === 'java') {
    // gleicher Aufbau wie beim Aufzeichnen der Abläufe (eigene Klassen hinter Main, import an den Anfang)
    fs.writeFileSync(path.join(dir, 'Main.java'), require('./java-quelle').bauen(code).src + (uses ? KONTO.java : ''));
    const c = sh(tool.javac, ['-encoding', 'UTF-8', 'Main.java'], dir); if (c.status) { c.phase = 'compile'; return c; } return sh(tool.java, ['-Dstdout.encoding=UTF-8', '-cp', dir, 'Main'], dir);
  }
  if (lang === 'csharp') {
    fs.writeFileSync(path.join(dir, 'p.csproj'), '<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net8.0</TargetFramework><ImplicitUsings>enable</ImplicitUsings><Nullable>disable</Nullable></PropertyGroup></Project>');
    fs.writeFileSync(path.join(dir, 'Program.cs'), D + '\n' + B + '\n' + (uses ? KONTO.csharp : ''));
    return sh(tool.dotnet, ['run', '--nologo', '-v', 'q'], dir);
  }
  if (lang === 'c') {
    fs.writeFileSync(path.join(dir, 'm.c'), '#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\n' + D + '\nint main(void) {\n' + B + '\nreturn 0;\n}\n');
    const c = sh(tool.gcc, ['-Wall', 'm.c', '-o', 'm.exe'], dir); if (c.status) return c; return sh(path.join(dir, 'm.exe'), [], dir);
  }
  if (lang === 'cpp') {
    fs.writeFileSync(path.join(dir, 'm.cpp'), '#include <iostream>\n#include <string>\n#include <vector>\n#include <map>\nusing namespace std;\n' + (uses ? KONTO.cpp : '') + D + '\nint main() {\n' + B + '\nreturn 0;\n}\n');
    const c = sh(tool.gpp, ['-std=c++17', '-Wall', 'm.cpp', '-o', 'm.exe'], dir); if (c.status) return c; return sh(path.join(dir, 'm.exe'), [], dir);
  }
}
const need = { pseudo: [], python: ['python'], java: ['javac', 'java'], csharp: ['dotnet'], c: ['gcc'], cpp: ['gpp'] };
const only = process.argv[2];
let pass = 0, fail = 0; const notrun = {};
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cl-pred-'));
for (const t of A.tracks) for (const spec of t.lessons) {
  const L = A.build(t, spec);
  for (const [i, k] of L.tasks.entries()) {
    if (k.type !== 'predict' || !need[k.lang] || (only && only !== k.lang)) continue;
    const w = L.id + ' Aufgabe ' + (i + 1);
    const miss = need[k.lang].filter((x) => !tool[x] || !fs.existsSync(tool[x]));
    if (miss.length) { notrun[k.lang] = (notrun[k.lang] || 0) + 1; continue; }
    const dir = fs.mkdtempSync(path.join(tmp, k.lang + '-'));
    const r = run(k.lang, k.code, dir);
    const out = norm(r.stdout || '');
    if (r.status !== 0 && r.status !== undefined) { fail++; console.log('FAIL  ' + w + ' [' + k.lang + '] Übersetzen/Laufen schlug fehl:\n' + ((r.stdout || '') + (r.stderr || '')).split('\n').slice(0, 6).join('\n')); continue; }
    if (k.answer.some((a) => norm(a) === out)) pass++;
    else { fail++; console.log('FAIL  ' + w + ' [' + k.lang + '] hinterlegt ' + JSON.stringify(k.answer[0]) + ', tatsächlich ' + JSON.stringify(out)); }
  }
  // Sauberer Code: Alle Varianten müssen dasselbe ausgeben, sonst wäre es kein Refactoring
  for (const [i, k] of L.tasks.entries()) {
    if (k.type !== 'choose' || !need[k.lang] || !k.expect || (only && only !== k.lang)) continue;
    const w = L.id + ' Aufgabe ' + (i + 1) + ' (Clean Code)';
    if (need[k.lang].some((x) => !tool[x] || !fs.existsSync(tool[x]))) { notrun[k.lang] = (notrun[k.lang] || 0) + 1; continue; }
    const abw = k.variants.map((v, j) => { const r = run(k.lang, v, fs.mkdtempSync(path.join(tmp, 'cc-'))); const out = norm(r.stdout || ''); return r.status || out !== norm(k.expect) ? 'Variante ' + (j + 1) + ' liefert ' + (r.status ? 'einen Fehler' : JSON.stringify(out)) : null; }).filter(Boolean);
    if (abw.length) { fail++; console.log('FAIL  ' + w + ': ' + abw.join('; ') + ' statt ' + JSON.stringify(k.expect)); } else pass++;
  }
  // Bug-Arena: Der Fehler tritt auf und passt zur Fehlerart, genau die richtige Korrektur liefert die erwartete Ausgabe
  for (const [i, k] of L.tasks.entries()) {
    if (k.type !== 'bug' || !need[k.lang] || !k.expect || (only && only !== k.lang)) continue;
    const w = L.id + ' Aufgabe ' + (i + 1) + ' (Bug)';
    if (need[k.lang].some((x) => !tool[x] || !fs.existsSync(tool[x]))) { notrun[k.lang] = (notrun[k.lang] || 0) + 1; continue; }
    const probe = (code) => { const r = run(k.lang, code, fs.mkdtempSync(path.join(tmp, 'bug-'))); return { ok: !r.status, art: r.phase === 'compile' ? 'syntax' : r.status ? 'laufzeit' : 'lauf', out: norm(r.stdout || '') }; };
    const line = [].concat(k.line)[0], fehler = [];
    const b = probe(k.code), artIst = b.art === 'lauf' ? (b.out === norm(k.expect) ? 'kein Fehler' : 'logik') : b.art;
    if (artIst !== k.kind) fehler.push('fehlerhafte Version zeigt ' + artIst + ', hinterlegt ist ' + k.kind);
    k.fixes.forEach((f, j) => {
      const r = probe(A.applyFix(k.code, line, f)), richtig = r.ok && r.out === norm(k.expect);
      if (j === k.a && !richtig) fehler.push('richtige Korrektur liefert ' + (r.ok ? JSON.stringify(r.out) : r.art) + ' statt ' + JSON.stringify(k.expect));
      if (j !== k.a && richtig) fehler.push('Korrektur ' + (j + 1) + ' wäre ebenfalls richtig: ' + f);
    });
    if (fehler.length) { fail++; console.log('FAIL  ' + w + ': ' + fehler.join('; ')); } else pass++;
  }
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log('\nPASS ' + pass + ', FAIL ' + fail + (Object.keys(notrun).length ? ', NOT RUN: ' + JSON.stringify(notrun) : ''));
process.exit(fail ? 1 : 0);
