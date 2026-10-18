// Erzeugt aus index.html und app.js eigene, crawlbare Seiten (SEO), ohne die App zu verändern:
//   /themen/<feld>/          die 5 Themenfelder (Netzwerke, IT-Sicherheit …) mit den Karten ihrer Kapitel
//   /nachschlagen/           Übersicht: „Wissenswertes zur AP1“, „Gesamtes Nachschlagewerk“ und alle Themenfelder
//   /nachschlagen/<kapitel>/ jedes Kapitel des Nachschlagewerks einzeln
//   sitemap.xml              alle Seiten
// Kopf (Logo, Zahlen, Auge, Lupe), Menüleiste, Fußzeile und Pfeil nach oben kommen unverändert aus index.html und
// verhalten sich über seiten.js wie in der App. „Nachschlagen“ führt zur Startseite (gesamtes Nachschlagewerk),
// „Glossar“ und „Multiple Choice“ in die Bereiche der App (/#glossar, /#fragen), die Lupe öffnet dort die Suche.
// Die Startseite bleibt die App; ihre Themenblasen und Fußzeilen-Links werden hier als echte Links gesetzt.
//
// Aufruf nach jeder Änderung an Kapiteln oder Themenfeldern:  node tools/seiten-bauen.mjs
// Prüfen, ob alles aktuell ist (ändert nichts):                node tools/seiten-bauen.mjs --pruefen
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const WURZEL = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BASIS = "https://layer8academy.boxberger.app";
const NUR_PRUEFEN = process.argv.includes("--pruefen");

/** Adressen der Kapitel (sprechend, ohne Umlaute). Neue Kapitel hier eintragen, sonst bricht das Skript ab. */
const KAPITEL_SLUG = {
  "r-ap1": "wissenswertes-zur-ap1", "r-api": "api-rest-soap", "r-raid": "backup-raid", "r-grundschutz": "bsi-grundschutz",
  "r-datenschutz": "datenschutz-informationssicherheit", "r-diagnose": "diagnose-fehlersuche", "r-dnsdhcp": "dns-dhcp",
  "r-mailsec": "e-mail-sicherheit", "r-epk": "epk-geschaeftsprozesse", "r-ethernet": "ethernet", "r-fddi": "fddi",
  "r-header": "header-ttl-traceroute", "r-hyperv": "hypervisor", "r-ip": "ipv4-ipv6", "r-doku": "it-dokumentation",
  "r-hardware": "it-hardware-energie", "r-security": "it-sicherheit", "r-itil": "itil-servicemanagement",
  "r-medien": "kabel-medien-hardware", "r-kalkulation": "kaufmaennisches-rechnen", "r-logik": "logische-verknuepfungen",
  "r-marketing": "marketing-marktforschung", "r-markt": "markt-wirtschaftssektoren", "r-mux": "multiplexing",
  "r-ausdehnung": "netzwerkausdehnung", "r-oop": "oop-uml", "r-osi": "osi-modell", "r-ports": "ports-sockets",
  "r-projekt": "projektmanagement", "r-qm": "qualitaetsmanagement", "r-routing": "routing-switching",
  "r-malware": "schadsoftware-angriffe", "r-sql": "sql-datenbanken", "r-speicher": "speichergroessen-einheiten",
  "r-storage": "storage-systeme", "r-verkabelung": "strukturierte-verkabelung", "r-subnetting": "subnetting",
  "r-haertung": "systemhaertung", "r-tcpip": "tcp-ip-udp", "r-topo": "netzwerktopologien", "r-krypto": "verschluesselung-pki",
  "r-vertraege": "vertraege-recht", "r-virt": "virtualisierung", "r-vlan": "vlan", "r-voip": "voip", "r-vpn": "vpn-ipsec",
  "r-wlan": "wlan", "r-zahlen": "zahlensysteme"
};
/** Eigene Überschriften, wo die Kapitelüberschrift allein zu knapp ist */
const TITEL = { "r-ap1": "Wissenswertes zur AP1" };
/** Themenfelder: Adresse und Einleitung (die Zuordnung der Kapitel kommt aus READER_TOPICS in app.js) */
const FELD_INFO = {
  netz: { slug: "netzwerke", text: "Alles rund um Netzwerke für die AP1: OSI-Modell, TCP/IP, IPv4 und IPv6, Subnetting, Routing und Switching, VLAN, WLAN, VPN, DNS und DHCP, Ports, Verkabelung und Topologien." },
  sec: { slug: "it-sicherheit", text: "IT-Sicherheit und Datenschutz für die AP1: Schutzziele, Verschlüsselung und PKI, BSI-Grundschutz, Schadsoftware und Angriffe, Systemhärtung und E-Mail-Sicherheit." },
  sys: { slug: "systeme-storage", text: "Systeme und Speicher für die AP1: Virtualisierung und Hypervisor, Storage-Systeme, Backup und RAID, IT-Hardware und Energie sowie Diagnose und Fehlersuche." },
  dev: { slug: "software-grundlagen", text: "Software und Grundlagen für die AP1: SQL und Datenbanken, OOP und UML, Zahlensysteme, Speichergrößen und logische Verknüpfungen." },
  bwl: { slug: "bwl-prozesse", text: "BWL und Prozesse für die AP1: Projektmanagement, Qualitätsmanagement, EPK und Geschäftsprozesse, ITIL, kaufmännisches Rechnen, Verträge, Markt und Marketing sowie IT-Dokumentation." }
};
/** Kapitel in der Fußzeile (Startseite und Einzelseiten) */
const FUSS_KAPITEL = [["r-osi", "OSI-Modell"], ["r-subnetting", "Subnetting"], ["r-ip", "IPv4 & IPv6"], ["r-security", "IT-Sicherheit"], ["r-krypto", "Verschlüsselung"],
  ["r-datenschutz", "Datenschutz"], ["r-projekt", "Projektmanagement"], ["r-hardware", "IT-Hardware"], ["r-ap1", "Wissenswertes zur AP1"]];
/** Früher erzeugte Ordner, die es nicht mehr gibt (werden entfernt) */
const ENTFALLEN = ["glossar", "impressum"];

const fehler = [];
const indexRoh = readFileSync(join(WURZEL, "index.html"), "utf8");
const index = indexRoh.replace(/\r\n/g, "\n");
const app = readFileSync(join(WURZEL, "app.js"), "utf8").replace(/\r\n/g, "\n");

// ---------- Daten aus index.html und app.js ----------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ent = (s) => s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const text = (html) => ent(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
function block(s, anfang, ende) {
  const a = s.indexOf(anfang);
  if (a < 0) return null;
  const e = s.indexOf(ende, a + anfang.length);
  return e < 0 ? null : s.slice(a, e + ende.length);
}
const wert = (code) => vm.runInNewContext(`(${code})`);

const kopf = block(index, "<header>", "</header>");
const leiste = block(index, '<div class="tabs" id="tabBar">', "\n</div></div>");
const fussApp = block(index, "<footer>", "</footer>");
const pfeil = block(index, '<button id="scrollTopBtn"', "</button>");
const version = /styles\.css\?v=([^"]+)"/.exec(index)?.[1] ?? "1";
const jumpNav = block(index, '<nav class="jump">', "</nav>");
if (!kopf || !leiste || !fussApp || !pfeil || !jumpNav) fehler.push("index.html: Kopf, Menüleiste, Fußzeile, Pfeil oder Sprungliste nicht gefunden");

const label = {};
for (const m of (jumpNav ?? "").matchAll(/<a href="#(r-[a-z0-9]+)">([\s\S]*?)<\/a>/g)) label[m[1]] = ent(m[2]).trim();

const kapitel = [];
for (const m of index.matchAll(/<section id="(r-[a-z0-9]+)">([\s\S]*?)<\/section>/g)) {
  const [, id, roh] = m;
  // Die Einleitung über die App (intro-box) gehört zur Startseite, nicht zum Kapitel
  const inhalt = roh.replace(/<div class="intro-box">[\s\S]*?<\/div>\n?/, "");
  const h2 = /<h2[^>]*>([\s\S]*?)<\/h2>/.exec(inhalt);
  const absatz = [...inhalt.matchAll(/<p(?: [^>]*)?>([\s\S]*?)<\/p>/g)].map((p) => text(p[1])).find((t) => t.length > 60) ?? "";
  if (!KAPITEL_SLUG[id]) fehler.push(`Kapitel ${id} hat keine Adresse: in KAPITEL_SLUG (tools/seiten-bauen.mjs) eintragen`);
  kapitel.push({ id, slug: KAPITEL_SLUG[id], titel: TITEL[id] ?? (h2 ? text(h2[1]) : label[id] ?? id), kurz: TITEL[id] ?? label[id] ?? (h2 ? text(h2[1]) : id), inhalt, absatz });
}
const KAP = new Map(kapitel.map((k) => [k.id, k]));

const topicsCode = (() => { const b = block(app, "const READER_TOPICS = ", ";\n"); return b ? b.slice("const READER_TOPICS = ".length, -2) : null; })();
const felder = (topicsCode ? wert(topicsCode) : []).map((t) => {
  const info = FELD_INFO[t.id];
  if (!info) fehler.push(`Themenfeld ${t.id} hat keine Adresse: in FELD_INFO eintragen`);
  return { ...t, ...info, kapitel: t.ids.map((i) => KAP.get(i)).filter(Boolean) };
});
if (!felder.length) fehler.push("app.js: READER_TOPICS nicht gefunden");
const feldVon = new Map();
for (const f of felder) for (const k of f.kapitel) feldVon.set(k.id, f);

let datum = new Date().toISOString().slice(0, 10);
try { datum = execSync("git log -1 --format=%cs -- index.html app.js", { cwd: WURZEL, encoding: "utf8" }).trim() || datum; } catch { /* ohne Git: heute */ }

if (fehler.length) { console.log("ABBRUCH:\n  - " + fehler.join("\n  - ")); process.exit(1); }

// ---------- Bausteine ----------
const kapUrl = (k) => `/nachschlagen/${k.slug}/`;
const feldUrl = (f) => `/themen/${f.slug}/`;
const nl = indexRoh.includes("\r\n") ? "\r\n" : "\n";
function kuerze(s, max = 158) {
  if (s.length <= max) return s;
  const satz = s.slice(0, max).match(/^(.*[.!?])\s/);
  if (satz && satz[1].length > 90) return satz[1];
  return s.slice(0, s.lastIndexOf(" ", max - 1)).replace(/[,;:–-]$/, "") + " …";
}
/** Links im Kapitel: Kapitel-Sprünge werden Seitenlinks, relative Pfade absolut */
const linksFuerSeite = (html) => html
  .replace(/href="#(r-[a-z0-9]+)"/g, (m, id) => (KAP.has(id) ? `href="${kapUrl(KAP.get(id))}"` : `href="/#${id}"`))
  .replace(/href="(?![a-z]+:|#|\/)([^"]+)"/g, 'href="/$1"');

// Fußzeile (Startseite und Einzelseiten gleich): Kapitel als echte Seiten; in der App springen sie (data-r, data-ansicht)
const fussNav = `<nav class="footer-nav" aria-label="Themen">\n  ${FUSS_KAPITEL.filter(([i]) => KAP.has(i)).map(([i, n]) => `<a href="${kapUrl(KAP.get(i))}" data-r="${i}">${esc(n)}</a>`).join(" · ")} ·\n  <a href="/nachschlagen/">Alle Kapitel einzeln</a> · <a href="/#glossar" data-ansicht="lib">Glossar</a>\n</nav>`;

// Kopf, Menüleiste und Fußzeile der App für die Einzelseiten: gleiches Aussehen, Ziele in die App
const kopfSeite = kopf
  .replace(/<h1>([\s\S]*?)<\/h1>/, '<a class="seite-marke" href="/" aria-label="Layer 8 Academy – Startseite">$1</a>');
const leisteSeite = leiste
  .replace(/<div class="tab( active)?" data-view="lesen"([^>]*)>([\s\S]*?)<\/div>/, '<a class="tab active" href="/"$2>$3</a>')
  .replace(/<div class="tab( active)?" data-view="lib"([^>]*)>([\s\S]*?)<\/div>/, '<a class="tab" href="/#glossar"$2>$3</a>')
  .replace(/<div class="tab( active)?" data-view="quiz"([^>]*)>([\s\S]*?)<\/div>/, '<a class="tab" href="/#fragen"$2>$3</a>')
  .replace(/ data-confirm="[^"]*"/g, "")
  .replace(/href="(?![a-z]+:|#|\/)([^"]+)"/g, 'href="/$1"');
const fussSeite = fussApp
  .replace(/<nav class="footer-nav" aria-label="Themen">[\s\S]*?<\/nav>/, fussNav)
  .replace('<a href="#" id="imprintLink" class="imprint-link">', '<a href="/#impressum" class="imprint-link">');

/** Themenblasen wie auf der Startseite, aber als Links auf die Themenfeld-Seiten (das aktuelle Feld markiert) */
const blasen = (aktiv) => `<div class="topics" aria-label="Themenfelder">${felder.map((f) => `<a class="topic${f === aktiv ? " active" : ""}" href="${feldUrl(f)}"${f === aktiv ? ' aria-current="page"' : ""}>${esc(f.titel)}</a>`).join("")}</div>`;
/** Karten (Titel + kurzer Anfang des Kapitels) */
const karten = (liste) => `<ul class="seite-karten">
${liste.map((k) => `  <li><a href="${k.url ?? kapUrl(k)}"><span class="sk-titel">${esc(k.titel)}</span><span class="sk-text">${esc(kuerze(k.absatz, 150))}</span></a></li>`).join("\n")}
</ul>`;
const ld = (o) => `<script type="application/ld+json">\n${JSON.stringify(o, null, 1)}\n</script>`;
const lernRessource = (name, beschreibung, url, teaches, extra = {}) => ({
  "@context": "https://schema.org", "@type": "LearningResource", name, description: beschreibung, url: BASIS + url, inLanguage: "de-DE",
  isAccessibleForFree: true, learningResourceType: "Nachschlagewerk", educationalLevel: "Berufsausbildung", ...(teaches ? { teaches } : {}),
  isPartOf: { "@id": `${BASIS}/#website` }, author: { "@type": "Person", name: "Alexander Boxberger-Adam", url: "https://boxberger.app/" }, ...extra
});

function seite({ url, titel, beschreibung, inhalt, daten }) {
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(titel)}</title>
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="description" content="${esc(beschreibung)}">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<meta name="theme-color" content="#0a0e12">
<link rel="canonical" href="${BASIS}${url}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Layer 8 Academy">
<meta property="og:title" content="${esc(titel)}">
<meta property="og:description" content="${esc(beschreibung)}">
<meta property="og:url" content="${BASIS}${url}">
<meta property="og:locale" content="de_DE">
<meta name="twitter:card" content="summary">
${ld(daten)}
<script>
  try {
    var t = localStorage.getItem('l8a_theme');
    if (t && t !== 'default') document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
</script>
<link rel="stylesheet" href="/styles.css?v=${version}">
<link rel="stylesheet" href="/seiten.css?v=${version}">
</head>
<body class="seite">
${kopfSeite}

${leisteSeite}

<div class="wrap">
<div class="view active" id="view-lesen">
${inhalt}
</div>
</div><!-- /.wrap -->

${fussSeite}

${pfeil}

<script src="/seiten.js?v=${version}"></script>
</body>
</html>
`;
}
const seitenTitel = (t) => [`${t} – AP1 einfach erklärt | Layer 8 Academy`, `${t} | AP1 – Layer 8 Academy`, `${t} | Layer 8 Academy`].find((x) => x.length <= 65) ?? `${t} | L8A`;

// ---------- Seiten ----------
const ausgabe = new Map();

// Kapitel: wie im Nachschlagewerk, darunter die Karten der anderen Kapitel des Themenfelds
for (const k of kapitel) {
  const f = feldVon.get(k.id);
  const beschreibung = kuerze(k.absatz || `${k.titel}: Erklärungen für die IHK-Abschlussprüfung Teil 1 (AP1).`);
  // Die Kapitelüberschrift ist die Hauptüberschrift der Seite, sieht aber aus wie im Nachschlagewerk
  const inhalt = linksFuerSeite(k.inhalt).replace(/<h2[^>]*>[\s\S]*?<\/h2>/, `<h1 class="wie-h2">${esc(k.titel)}</h1>`);
  const andere = f ? f.kapitel.filter((x) => x !== k) : [];
  ausgabe.set(`nachschlagen/${k.slug}/index.html`, seite({
    url: kapUrl(k), titel: seitenTitel(k.titel), beschreibung,
    daten: lernRessource(k.titel, beschreibung, kapUrl(k), f ? f.titel : "AP1"),
    inhalt: `${blasen(f)}
<section id="${k.id}">
${inhalt.trim()}
</section>
${andere.length ? `<section class="seite-feld">
<h2>Mehr aus ${esc(f.titel)}</h2>
${karten(andere)}
</section>` : ""}`
  }));
}

// Themenfelder: Karten aller Kapitel
for (const f of felder) {
  const beschreibung = kuerze(f.text);
  ausgabe.set(`themen/${f.slug}/index.html`, seite({
    url: feldUrl(f), titel: `${f.titel} für die AP1: alle Kapitel | Layer 8 Academy`, beschreibung,
    daten: lernRessource(`${f.titel} für die AP1`, beschreibung, feldUrl(f), f.titel, { hasPart: f.kapitel.map((k) => ({ "@type": "LearningResource", name: k.titel, url: BASIS + kapUrl(k) })) }),
    inhalt: `${blasen(f)}
<h1 class="wie-h2">${esc(f.titel)}</h1>
<p class="seite-lead">${esc(f.text)}</p>
${karten(f.kapitel)}`
  }));
}

// Übersicht: „Wissenswertes zur AP1“ und „Gesamtes Nachschlagewerk“, darunter alle Themenfelder
const ap1 = KAP.get("r-ap1");
const gesamt = { titel: "Gesamtes Nachschlagewerk", url: "/", absatz: "Alle Kapitel auf einer Seite. Mit der Lupe oben nach Themen und Wörtern suchen, Fachbegriffe erklären die Glossar-Bubbles." };
const ohneFeld = kapitel.filter((k) => !feldVon.has(k.id) && k !== ap1);
ausgabe.set("nachschlagen/index.html", seite({
  url: "/nachschlagen/", titel: "AP1 Nachschlagewerk: alle Themen und Kapitel | Layer 8 Academy",
  beschreibung: `Nachschlagewerk für die IHK-Abschlussprüfung Teil 1 (AP1) der IT-Berufe: ${kapitel.length} Kapitel in ${felder.length} Themenfeldern, von Netzwerken und IT-Sicherheit bis BWL und Projektmanagement.`,
  daten: lernRessource("AP1 Nachschlagewerk", "Alle Kapitel des Nachschlagewerks für die AP1, nach Themenfeldern.", "/nachschlagen/", "AP1"),
  inhalt: `${blasen(null)}
<h1 class="wie-h2">Alle Kapitel einzeln</h1>
${karten([...(ap1 ? [ap1] : []), gesamt, ...ohneFeld])}
${felder.map((f) => `<section class="seite-feldblock">
<h2><a href="${feldUrl(f)}">${esc(f.titel)}</a></h2>
${karten(f.kapitel)}
</section>`).join("\n")}`
}));

// Sitemap
const urls = [
  ["/", "weekly", "1.0"], ["/nachschlagen/", "weekly", "0.9"],
  ...felder.map((f) => [feldUrl(f), "weekly", "0.8"]),
  ...kapitel.map((k) => [kapUrl(k), "monthly", "0.7"]),
  ["/subnetting-trainer/", "monthly", "0.8"], ["/ap1-simulator/", "monthly", "0.8"], ["/osi-battle/", "monthly", "0.7"]
];
ausgabe.set("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, f, p]) => `  <url>
    <loc>${BASIS}${u}</loc>
    <lastmod>${datum}</lastmod>
    <changefreq>${f}</changefreq>
    <priority>${p}</priority>
  </url>`).join("\n")}
</urlset>
`);

// Startseite (die App): Themenblasen als echte Links auf die Themenfeld-Seiten (app.js klappt sie in der App wie
// bisher auf, initTopicBubbles) und die Fußzeile mit echten Kapitel-Adressen (app.js springt über data-r)
const blasenApp = `<div class="topics" id="topicBubbles" aria-label="Themenauswahl">${felder.map((f) => `<a class="topic" href="${feldUrl(f)}" data-topic="${f.id}">${esc(f.titel)}</a>`).join("")}</div>`;
const indexNeu = indexRoh
  .replace(/<div class="topics" id="topicBubbles"[^>]*>[\s\S]*?<\/div>/, blasenApp)
  .replace(/<nav class="footer-nav" aria-label="Themen">[\s\S]*?<\/nav>/, fussNav.replace(/\n/g, nl));
ausgabe.set("index.html", indexNeu); // Zeilenenden bleiben, wie sie sind

// ---------- Schreiben oder prüfen ----------
const alt = [];
for (const dir of ["nachschlagen", "themen"]) {
  const d = join(WURZEL, dir);
  if (existsSync(d)) for (const s of readdirSync(d)) if (existsSync(join(d, s, "index.html"))) alt.push(`${dir}/${s}/index.html`);
}
const veraltet = [...alt.filter((p) => !ausgabe.has(p)), ...ENTFALLEN.filter((d) => existsSync(join(WURZEL, d, "index.html"))).map((d) => `${d}/index.html`)];
let anders = 0;
for (const [pfad, inhalt] of ausgabe) {
  const ziel = join(WURZEL, pfad);
  const jetzt = existsSync(ziel) ? readFileSync(ziel, "utf8").replace(/\r\n/g, "\n") : null;
  if (jetzt === inhalt.replace(/\r\n/g, "\n")) continue;
  anders++;
  if (NUR_PRUEFEN) { console.log(`veraltet: ${pfad}`); continue; }
  mkdirSync(dirname(ziel), { recursive: true });
  writeFileSync(ziel, inhalt);
}
for (const p of veraltet) {
  if (NUR_PRUEFEN) { console.log(`überflüssig: ${p}`); continue; }
  rmSync(dirname(join(WURZEL, p)), { recursive: true });
}
if (NUR_PRUEFEN) {
  console.log(anders || veraltet.length ? `NICHT AKTUELL: ${anders + veraltet.length} Datei(en). node tools/seiten-bauen.mjs ausführen.` : `AKTUELL: ${ausgabe.size} Dateien`);
  process.exit(anders || veraltet.length ? 1 : 0);
}
console.log(`${kapitel.length} Kapitel, ${felder.length} Themenfelder, Übersicht, Sitemap, Startseite geprüft: ${anders} Datei(en) neu geschrieben, ${veraltet.length} entfernt`);
