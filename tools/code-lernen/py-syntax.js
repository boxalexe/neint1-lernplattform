// Prüft die Syntax aller Python-Codebeispiele (ast.parse):  node tools/py-syntax.js
const fs = require('fs'), os = require('os'), path = require('path'), cp = require('child_process');
global.window = globalThis; const root = path.join(__dirname, '..', '..', 'code-lernen');
require(path.join(root, 'js/pseudo.js')); require(path.join(root, 'js/uml.js')); require(path.join(root, 'js/core.js'));
const A = globalThis.Academy; const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const f of [...html.matchAll(/src="(js\/content\/[^"]+)"/g)].map((m) => m[1])) require(path.join(root, f));
const py = process.env.PYTHON || path.join(os.homedir(), 'AppData/Local/Programs/Python/Python312/python.exe');
let n = 0, bad = 0;
for (const t of A.tracks) for (const s of t.lessons) { const L = A.build(t, s);
  for (const p of [].concat(L.idea, L.parts, L.pseudo)) if (p.code && p.code.lang === 'python' && !p.noRun) { n++;
    const code = p.code.lines.map((l) => l[0]).join('\n');
    const r = cp.spawnSync(py, ['-I', '-c', 'import ast,sys; ast.parse(sys.stdin.read())'], { input: code, encoding: 'utf8' });
    if (r.status) { bad++; console.log('FAIL ' + L.id + ' („' + p.h + '“): ' + r.stderr.trim().split('\n').slice(-2).join(' | ')); } } }
console.log(n + ' Python-Beispiele, ' + bad + ' mit Syntaxfehler'); process.exit(bad ? 1 : 0);
