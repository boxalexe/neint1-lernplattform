// Statische Seiten für Code lesen, die Suchmaschinen lesen können:
//   /code-lernen/                         Start mit Kursliste (vorgerendert in index.html)
//   /code-lernen/kurs/<kurs>/             jeder Kurs mit seinen Lektionen
//   /code-lernen/kurs/<kurs>/<lektion>/   jede Lektion mit Text, Codebeispielen, Tabellen, Diagrammen, Fragen und Aufgaben
//   /code-lernen/sitemap.xml              alle Adressen (in robots.txt eingetragen)
// Jede Seite ist die normale App mit fertigem Inhalt im HTML: Ohne JavaScript und für Suchmaschinen ist alles lesbar,
// mit JavaScript übernimmt die App wie gewohnt (Quiz, Übungen, Ablauf verfolgen). Lösungen stehen nie im HTML.
//
// Aufruf nach jeder Änderung an Inhalten (js/content) oder an code-lernen/index.html:
//   node tools/code-lernen/seiten-bauen.js
// Prüfen, ob alles aktuell ist (ändert nichts):
//   node tools/code-lernen/seiten-bauen.js --pruefen
const fs = require('fs'), path = require('path'), cp = require('child_process');
global.window = globalThis;
const WURZEL = path.join(__dirname, '..', '..'), CL = path.join(WURZEL, 'code-lernen');
require(path.join(CL, 'js/pseudo.js')); require(path.join(CL, 'js/uml.js')); require(path.join(CL, 'js/core.js'));
const A = globalThis.Academy, UML = globalThis.UML, esc = A.esc, md = A.md, inl = A.inl;
const VORLAGE = fs.readFileSync(path.join(CL, 'index.html'), 'utf8');
for (const f of [...VORLAGE.matchAll(/src="(?:\/code-lernen\/)?(js\/content\/[^"?]+)[^"]*"/g)].map((m) => m[1])) require(path.join(CL, f));
const NUR_PRUEFEN = process.argv.includes('--pruefen');
const SITE = 'https://layer8academy.boxberger.app', BASE = '/code-lernen/';
const NAV_AC = ['--th-pp', '--th-fn', '--th-kw', '--th-ty', '--th-str', '--th-var', '--th-num'];

/* ---------- Hilfen ---------- */
const plain = (s) => String(s || '').replace(/\*\*|`/g, '').replace(/\s+/g, ' ').trim();
const kurz = (s, n) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n - 2)) + ' …');
const teil = (s) => s.concept || s.id;
const kursUrl = (t) => BASE + 'kurs/' + t.id + '/';
const lekUrl = (t, s) => BASE + 'kurs/' + t.id + '/' + teil(s) + '/';
for (const t of A.tracks) {
  if (!/^[a-z0-9]+$/.test(t.id)) throw new Error('Kurs-ID für Adresse ungeeignet: ' + t.id);
  for (const s of t.lessons) if (!/^[a-z0-9-]+$/.test(teil(s))) throw new Error('Lektions-ID für Adresse ungeeignet: ' + t.id + '/' + teil(s));
}

/* ---------- Inhalte als statisches HTML (dieselben Klassen wie die App, damit es gleich aussieht) ---------- */
function codeHtml(lang, lines, h) {
  const notes = lines.some((l) => l[1]);
  return (h ? '<h3>' + esc(h) + '</h3>' : '') + '<div class="codeblock"><div class="cb-head"><span class="cb-lang">' + esc(A.langNames[lang] || lang) + '</span></div><div class="cb-body"><table class="cb-table' + (notes ? ' has-notes' : '') + '">'
    + lines.map((l, n) => '<tr><td class="ln">' + (n + 1) + '</td><td class="src"><pre>' + (A.hl(lang, l[0]) || '&nbsp;') + '</pre>' + (l[1] ? '<div class="line-note">' + inl(l[1]) + '</div>' : '') + '</td></tr>').join('') + '</table></div></div>';
}
function diagramm(fn, ...args) { try { return '<div class="uml-wrap">' + fn(...args) + '</div>'; } catch (e) { return ''; } }
function partHtml(p) {
  if (typeof p === 'string') p = A.warn(p);
  if (p.kind) return '<div class="note note-' + p.kind + '"><b>' + ({ tip: 'Tipp', warn: 'Achtung', info: 'Gut zu wissen' }[p.kind]) + '</b>' + md(p.p) + '</div>';
  if (p.pseudo) return '<div class="tracebox">' + (p.h ? '<h3>' + esc(p.h) + '</h3>' : '') + md(p.p) + codeHtml('pseudo', p.pseudo.split('\n').map((l) => [l, ''])) + '</div>';
  let s = '';
  if (p.h && !p.code) s += '<h3>' + esc(p.h) + '</h3>';
  if (p.p && !p.code) s += md(p.p);
  if (p.code) s += codeHtml(p.code.lang, p.code.lines, p.h) + (p.p ? md(p.p) : '');
  if (p.praxis) s += '<div class="note note-praxis"><b>In der Praxis</b>' + md(p.praxis) + '</div>';
  if (p.uml) s += diagramm(UML.classDiagram, p.uml);
  if (p.seq) s += diagramm(UML.sequence, p.seq.actors, p.seq.msgs);
  if (p.nsd) s += diagramm(UML.nsd, p.nsd);
  if (p.usecase) s += diagramm(UML.useCase, p.usecase);
  if (p.activity) s += diagramm(UML.activity, p.activity);
  if (p.table) s += '<div class="tbl-wrap"><table class="res"><thead><tr>' + p.table.head.map((c) => '<th>' + inl(c) + '</th>').join('') + '</tr></thead><tbody>' + p.table.rows.map((r) => '<tr>' + r.map((c) => '<td>' + inl(c) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
  return s;
}
// Antworten gemischt wie in der App (initQuiz in app.js): In den Inhalten steht die richtige Antwort vorn, hier darf sie das nicht
function reihenfolge(q) {
  let h = 2166136261; for (const ch of q.q) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  const idx = q.o.map((_, j) => j);
  for (let k = idx.length - 1; k > 0; k--) { h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0; const r = h % (k + 1); [idx[k], idx[r]] = [idx[r], idx[k]]; }
  return idx;
}
// Aufgaben ohne Lösung: nur Aufgabenstellung, Code und Lücken
function aufgabeHtml(k) {
  let s = '<li class="task"><div class="t-prompt">' + md(k.prompt) + '</div>';
  if (k.type === 'predict') s += codeHtml(k.lang || 'pseudo', k.code.map((l) => [l, '']));
  if (k.type === 'desk') s += codeHtml(k.lang, k.code.map((l) => [l, ''])) + '<table class="res desk"><thead><tr><th>Durchlauf</th>' + k.cols.map((c) => '<th><code>' + esc(c) + '</code></th>').join('') + '</tr></thead></table>';
  if (k.type === 'choose') s += reihenfolge({ q: k.prompt, o: k.variants }).map((j, n) => '<p><b>Variante ' + String.fromCharCode(65 + n) + '</b></p>' + codeHtml(k.lang, k.variants[j].map((l) => [l, '']))).join('');
  if (k.type === 'bug') s += codeHtml(k.lang, k.code.map((l) => [l, '']));
  if (k.type === 'fill') s += '<pre class="fill">' + k.tpl.split(/\{\{.*?\}\}/).map(esc).join('<span class="gap">_____</span>') + '</pre>';
  if (k.type === 'js' && k.starter) s += codeHtml('javascript', k.starter.split('\n').map((l) => [l, '']));
  return s + '</li>';
}
function lektionHtml(t, i) {
  const s = t.lessons[i], L = A.build(t, s), prev = i > 0 ? t.lessons[i - 1] : null, next = i < t.lessons.length - 1 ? t.lessons[i + 1] : null;
  let h = '<div class="crumb"><a href="' + BASE + '">Start</a> › <a href="' + kursUrl(t) + '">' + esc(t.title) + '</a> › ' + esc(A.stages[L.stage] || '') + '</div><h1>' + esc(L.title) + '</h1>';
  if (L.goal) h += '<div class="goal"><b>Ziel dieser Lektion</b>' + md(L.goal) + '</div>';
  const dom = L.domain && A.domains[L.domain];
  if (dom) h += '<div class="szenario"><b>Szenario: ' + esc(dom.title) + '</b>' + md(dom.text) + '</div>';
  if (L.idea.length) h += '<section class="sec"><h2>Die Idee dahinter</h2>' + L.idea.map(partHtml).join('') + '</section>';
  if (L.parts.length) h += '<section class="sec"><h2>' + (L.concept && !L.standalone && t.id !== 'pseudo' ? 'In ' + esc(t.title) : 'Der Stoff') + '</h2>' + L.parts.map(partHtml).join('') + '</section>';
  if (L.pseudo.length) h += '<section class="sec"><h2>Im Kopf ausführen (sprachunabhängig)</h2>' + L.pseudo.map(partHtml).join('') + '</section>';
  if (L.pitfalls.length) h += '<section class="sec"><h2>Typische Stolperfallen</h2>' + L.pitfalls.map(partHtml).join('') + '</section>';
  if (L.quiz.length) h += '<section class="sec"><h2>Prüfe dich</h2><ol class="quiz">' + L.quiz.map((q) => '<li class="qcard"><div class="q-text">' + inl(q.q) + '</div><ul>' + reihenfolge(q).map((j) => '<li>' + inl(q.o[j]) + '</li>').join('') + '</ul></li>').join('') + '</ol></section>';
  if (L.tasks.length) h += '<section class="sec"><h2>Übungen</h2><ol class="tasks">' + L.tasks.map(aufgabeHtml).join('') + '</ol></section>';
  h += '<noscript><p class="muted">Quiz und Übungen prüfen deine Antworten direkt im Browser. Dafür braucht diese Seite JavaScript.</p></noscript>';
  h += '<nav class="pn">' + (prev ? '<a href="' + lekUrl(t, prev) + '">Zurück: ' + esc(A.build(t, prev).title) + '</a>' : '<span></span>') + (next ? '<a class="next" href="' + lekUrl(t, next) + '">Weiter: ' + esc(A.build(t, next).title) + '</a>' : '<a class="next" href="' + kursUrl(t) + '">Zur Kursübersicht →</a>') + '</nav>';
  return { L, html: h };
}
function kursHtml(t) {
  return '<div class="crumb"><a href="' + BASE + '">Start</a> › Kurs</div><h1>' + esc(t.title) + '</h1><p class="lead">' + esc(t.desc || '') + '</p>' + (t.intro ? md(t.intro) : '')
    + '<ol class="lessons">' + t.lessons.map((s) => { const L = A.build(t, s); return '<li><a class="lrow" href="' + lekUrl(t, s) + '"><span class="lt"><b>' + esc(L.title) + '</b><span class="small muted">' + esc(plain(L.goal)) + '</span></span></a></li>'; }).join('') + '</ol>';
}
function startHtml() {
  return '<h1>Grundkenntnisse aneignen</h1><p class="lead">Von den allerersten Begriffen bis zu sicherem Lesen und Schreiben von Code, mit Erklärung zu jeder Zeile, Quiz und Übungen bis zum Stoff der AP2.</p>'
    + A.tracks.map((t) => '<section class="sec"><h2><a href="' + kursUrl(t) + '">' + esc(t.title) + '</a></h2><p>' + esc(t.desc || '') + '</p><ul>' + t.lessons.map((s) => '<li><a href="' + lekUrl(t, s) + '">' + esc(A.build(t, s).title) + '</a></li>').join('') + '</ul></section>').join('');
}
function navHtml(curT, curS) {
  return '<a class="nav-top nav-home' + (!curT ? ' on' : '') + '" href="' + BASE + '">Start</a>' + A.tracks.map((t, i) => '<details name="kurs" style="--ac: var(' + NAV_AC[i % NAV_AC.length] + ')"' + (curT === t ? ' open' : '') + '><summary><span>' + esc(t.title) + '</span></summary>'
    + t.lessons.map((s) => '<a class="nl' + (curS === s ? ' on' : '') + '" href="' + lekUrl(t, s) + '"><span class="dot"></span>' + esc(A.build(t, s).title) + '</a>').join('') + '</details>').join('')
    + '<div class="nav-sep"></div><a class="nav-top" href="' + BASE + '#/play/pseudo">Spielwiese</a><a class="nav-top" href="' + BASE + '#/compare/vars">Sprachvergleich</a><a class="nav-top" href="' + BASE + '#/glossar">Begriffe von A bis Z</a><a class="nav-top" href="' + BASE + '#/glossar/kuerzel">Kürzel der Sprachen</a><div class="nav-sep"></div><a class="nav-top" href="/#impressum">Impressum und Datenschutz</a>';
}

/* ---------- Seiten zusammensetzen ---------- */
const ersetze = (html, re, neu, was) => { if (!re.test(html)) throw new Error('index.html: ' + was + ' nicht gefunden'); return html.replace(re, () => neu); };
function seite({ title, desc, url, nav, main }) {
  let h = VORLAGE;
  h = ersetze(h, /<title>[^<]*<\/title>/, '<title>' + esc(title) + '</title>', 'title');
  h = ersetze(h, /<meta name="description" content="[^"]*">/, '<meta name="description" content="' + esc(desc) + '">', 'description');
  h = ersetze(h, /<link rel="canonical" href="[^"]*">/, '<link rel="canonical" href="' + SITE + url + '">', 'canonical');
  h = ersetze(h, /<nav id="nav" aria-label="Kurse und Lektionen">[\s\S]*?<\/nav><\/aside>/, '<nav id="nav" aria-label="Kurse und Lektionen">' + nav + '</nav></aside>', 'nav');
  h = ersetze(h, /<main id="main"[^>]*>[\s\S]*?<\/main>\r?\n<\/div>/, '<main id="main" data-vorab>' + main + '</main>\n</div>', 'main');
  return h;
}
const ausgabe = new Map(), urls = [BASE];
const startTitel = (VORLAGE.match(/<title>([^<]*)<\/title>/) || [])[1], startDesc = (VORLAGE.match(/<meta name="description" content="([^"]*)">/) || [])[1];
const unesc = (s) => s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
ausgabe.set('code-lernen/index.html', seite({ title: unesc(startTitel), desc: unesc(startDesc), url: BASE, nav: navHtml(null, null), main: startHtml() }));
for (const t of A.tracks) {
  urls.push(kursUrl(t));
  ausgabe.set('code-lernen/kurs/' + t.id + '/index.html', seite({ title: t.title + ': Kurs mit Erklärung zu jeder Codezeile | Code lesen', desc: kurz(plain(t.desc), 158), url: kursUrl(t), nav: navHtml(t, null), main: kursHtml(t) }));
  t.lessons.forEach((s, i) => {
    const { L, html } = lektionHtml(t, i);
    urls.push(lekUrl(t, s));
    ausgabe.set('code-lernen/kurs/' + t.id + '/' + teil(s) + '/index.html', seite({ title: L.title + ' | ' + t.title + ' | Code lesen', desc: kurz(plain(t.title + ': ' + (L.goal || L.title)), 158), url: lekUrl(t, s), nav: navHtml(t, s), main: html }));
  });
}
let datum = new Date().toISOString().slice(0, 10);
try { datum = cp.execSync('git log -1 --format=%cs -- code-lernen/js/content code-lernen/index.html', { cwd: WURZEL, encoding: 'utf8' }).trim() || datum; } catch (e) { /* ohne Git: heute */ }
ausgabe.set('code-lernen/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  + urls.map((u) => '  <url>\n    <loc>' + SITE + u + '</loc>\n    <lastmod>' + datum + '</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>' + (u === BASE ? '0.8' : u.split('/').length > 5 ? '0.6' : '0.7') + '</priority>\n  </url>\n').join('') + '</urlset>\n');

/* ---------- Schreiben oder prüfen ---------- */
const norm = (s) => s.replace(/\r\n/g, '\n');
let anders = 0, entfernt = 0;
for (const [rel, inhalt] of ausgabe) {
  const p = path.join(WURZEL, rel), alt = fs.existsSync(p) ? norm(fs.readFileSync(p, 'utf8')) : null;
  if (alt === inhalt) continue;
  anders++;
  if (NUR_PRUEFEN) { console.log('VERALTET: ' + rel); continue; }
  fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, inhalt);
}
// Seiten von Lektionen, die es nicht mehr gibt
const kursDir = path.join(CL, 'kurs');
const walk = (d) => (fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])) : []);
for (const f of walk(kursDir)) {
  const rel = path.relative(WURZEL, f).split(path.sep).join('/');
  if (ausgabe.has(rel)) continue;
  entfernt++;
  if (NUR_PRUEFEN) console.log('ÜBERZÄHLIG: ' + rel); else fs.rmSync(f);
}
console.log((NUR_PRUEFEN ? 'Geprüft: ' : 'Gebaut: ') + A.tracks.length + ' Kurse, ' + (urls.length - 1 - A.tracks.length) + ' Lektionen, Sitemap mit ' + urls.length + ' Adressen. '
  + (NUR_PRUEFEN ? (anders + entfernt ? anders + ' veraltet, ' + entfernt + ' überzählig' : 'AKTUELL') : anders + ' Datei(en) neu geschrieben, ' + entfernt + ' entfernt'));
process.exit(NUR_PRUEFEN && anders + entfernt ? 1 : 0);
