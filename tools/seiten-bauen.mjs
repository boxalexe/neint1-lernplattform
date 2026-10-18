// Erzeugt aus index.html und app.js eigene, crawlbare Seiten (SEO) – ohne die App zu verändern:
//   /themen/<feld>/          5 Themenfelder (Netzwerke, IT-Sicherheit …) mit ihren Kapiteln
//   /nachschlagen/           Übersicht aller Themenfelder und Kapitel
//   /nachschlagen/<kapitel>/ jedes Kapitel des Nachschlagewerks als eigene Seite
//   /glossar/                alle Glossarbegriffe
//   /impressum/              Impressum & Datenschutz (für die Unterseiten, nicht im Index)
//   sitemap.xml              alle Seiten
// Die Startseite bleibt die App (Sprünge, Suche, Quiz, Glossar-Bubbles unverändert). Die Unterseiten sind
// Einstiege für Suchmaschinen und führen per Link zurück in die App an dieselbe Stelle (/#r-…).
//
// Aufruf nach jeder Änderung an Kapiteln oder Glossar:  node tools/seiten-bauen.mjs
// Prüfen, ob alles aktuell ist (ändert nichts):          node tools/seiten-bauen.mjs --pruefen
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
  "r-ap1": "ap1-ueberblick", "r-api": "api-rest-soap", "r-raid": "backup-raid", "r-grundschutz": "bsi-grundschutz",
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
/** Eigene Seitentitel, wo die Kapitelüberschrift allein zu knapp ist */
const TITEL = { "r-ap1": "AP1-Überblick: Aufbau und Themen der Prüfung" };
/** Themenfelder: Adresse und Einleitung (die Zuordnung der Kapitel kommt aus READER_TOPICS in app.js) */
const FELD_INFO = {
  netz: { slug: "netzwerke", text: "Alles rund um Netzwerke für die AP1: OSI-Modell, TCP/IP, IPv4 und IPv6, Subnetting, Routing und Switching, VLAN, WLAN, VPN, DNS und DHCP, Ports, Verkabelung und Topologien." },
  sec: { slug: "it-sicherheit", text: "IT-Sicherheit und Datenschutz für die AP1: Schutzziele, Verschlüsselung und PKI, BSI-Grundschutz, Schadsoftware und Angriffe, Systemhärtung und E-Mail-Sicherheit." },
  sys: { slug: "systeme-storage", text: "Systeme und Speicher für die AP1: Virtualisierung und Hypervisor, Storage-Systeme, Backup und RAID, IT-Hardware und Energie sowie Diagnose und Fehlersuche." },
  dev: { slug: "software-grundlagen", text: "Software und Grundlagen für die AP1: SQL und Datenbanken, OOP und UML, Zahlensysteme, Speichergrößen und logische Verknüpfungen." },
  bwl: { slug: "bwl-prozesse", text: "BWL und Prozesse für die AP1: Projektmanagement, Qualitätsmanagement, EPK und Geschäftsprozesse, ITIL, kaufmännisches Rechnen, Verträge, Markt und Marketing sowie IT-Dokumentation." }
};

const fehler = [];
const index = readFileSync(join(WURZEL, "index.html"), "utf8").replace(/\r\n/g, "\n");
const app = readFileSync(join(WURZEL, "app.js"), "utf8").replace(/\r\n/g, "\n");

// ---------- Daten aus index.html und app.js ----------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ent = (s) => s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const text = (html) => ent(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
function zwischen(s, anfang, ende, ab = 0) {
  const a = s.indexOf(anfang, ab);
  if (a < 0) return null;
  const e = s.indexOf(ende, a + anfang.length);
  return e < 0 ? null : s.slice(a + anfang.length, e);
}
const wert = (code) => vm.runInNewContext(`(${code})`);

const logo = zwischen(index, "<header>\n  <div class=\"wrap\">\n    <h1>", "</h1>");
const styleVersion = /styles\.css\?v=([^"]+)"/.exec(index)?.[1] ?? "1";
const footerLead = zwischen(index, '<p class="footer-lead">', "</p>");
const impressum = zwischen(index, '<h2 id="infoModalTitle">Impressum &amp; Datenschutz</h2>', "\n  </div>\n</div>");
const jumpNav = zwischen(index, '<nav class="jump">', "</nav>");
if (!logo || !footerLead || !impressum || !jumpNav) fehler.push("index.html: Kopf, Fußzeile, Impressum oder Sprungliste nicht gefunden");

const label = {};
for (const m of (jumpNav ?? "").matchAll(/<a href="#(r-[a-z0-9]+)">([\s\S]*?)<\/a>/g)) label[m[1]] = ent(m[2]).trim();

const kapitel = [];
for (const m of index.matchAll(/<section id="(r-[a-z0-9]+)">([\s\S]*?)<\/section>/g)) {
  const [, id, inhalt] = m;
  const h2 = /<h2[^>]*>([\s\S]*?)<\/h2>/.exec(inhalt);
  const ohneIntro = inhalt.replace(/<div class="intro-box">[\s\S]*?<\/div>/, "");
  const absatz = [...ohneIntro.matchAll(/<p(?: [^>]*)?>([\s\S]*?)<\/p>/g)].map((p) => text(p[1])).find((t) => t.length > 60) ?? "";
  if (!KAPITEL_SLUG[id]) fehler.push(`Kapitel ${id} hat keine Adresse: in KAPITEL_SLUG (tools/seiten-bauen.mjs) eintragen`);
  kapitel.push({ id, slug: KAPITEL_SLUG[id], titel: TITEL[id] ?? (h2 ? text(h2[1]) : label[id] ?? id), kurz: label[id] ?? (h2 ? text(h2[1]) : id), inhalt, absatz });
}
const KAP = new Map(kapitel.map((k) => [k.id, k]));

const topicsCode = zwischen(app, "const READER_TOPICS = ", ";\n");
const felder = (topicsCode ? wert(topicsCode) : []).map((t) => {
  const info = FELD_INFO[t.id];
  if (!info) fehler.push(`Themenfeld ${t.id} hat keine Adresse: in FELD_INFO eintragen`);
  return { ...t, ...info, kapitel: t.ids.map((i) => KAP.get(i)).filter(Boolean) };
});
const feldVon = new Map();
for (const f of felder) for (const k of f.kapitel) feldVon.set(k.id, f);

const glossarCode = zwischen(app, "const GLOSSAR = ", "\n\n// ---- Bibliothek")?.trim().replace(/;$/, "");
const glossar = glossarCode ? wert(glossarCode).slice().sort((a, b) => a.a.localeCompare(b.a, "de", { sensitivity: "base" })) : [];
if (!glossar.length) fehler.push("app.js: GLOSSAR nicht gefunden");

let datum = new Date().toISOString().slice(0, 10);
try { datum = execSync("git log -1 --format=%cs -- index.html app.js", { cwd: WURZEL, encoding: "utf8" }).trim() || datum; } catch { /* ohne Git: heute */ }

if (fehler.length) { console.log("ABBRUCH:\n  - " + fehler.join("\n  - ")); process.exit(1); }

// ---------- Bausteine ----------
const kapUrl = (k) => `/nachschlagen/${k.slug}/`;
const feldUrl = (f) => `/themen/${f.slug}/`;
function kuerze(s, max = 158) {
  if (s.length <= max) return s;
  const satz = s.slice(0, max).match(/^(.*[.!?])\s/);
  if (satz && satz[1].length > 90) return satz[1];
  return s.slice(0, s.lastIndexOf(" ", max - 1)).replace(/[,;:–-]$/, "") + " …";
}
/** Links im Kapitel für die eigene Seite: Kapitel-Sprünge werden Seitenlinks, relative Pfade absolut */
function linksFuerSeite(html) {
  return html
    .replace(/href="#(r-[a-z0-9]+)"/g, (m, id) => (KAP.has(id) ? `href="${kapUrl(KAP.get(id))}"` : `href="/#${id}"`))
    .replace(/href="(?![a-z]+:|#|\/)([^"]+)"/g, 'href="/$1"');
}
const ld = (o) => `<script type="application/ld+json">\n${JSON.stringify(o, null, 1)}\n</script>`;
const brotLd = (pfad) => ({
  "@type": "BreadcrumbList",
  itemListElement: pfad.map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, item: BASIS + url }))
});
const autor = { "@type": "Person", name: "Alexander Boxberger-Adam", url: "https://boxberger.app/" };

function seite({ url, titel, beschreibung, h1, inhalt, pfad, daten = [], index: indexieren = true }) {
  const brot = pfad.length > 1 ? `<nav class="brotkrumen" aria-label="Brotkrumenpfad">${pfad.map(([n, u], i) => (i < pfad.length - 1 ? `<a href="${u}">${esc(n)}</a>` : `<span aria-current="page">${esc(n)}</span>`)).join('<span class="bk-trenner" aria-hidden="true">›</span>')}</nav>` : "";
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(titel)}</title>
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="description" content="${esc(beschreibung)}">
<meta name="robots" content="${indexieren ? "index, follow, max-snippet:-1, max-image-preview:large" : "noindex, follow"}">
<meta name="theme-color" content="#0a0e12">
<link rel="canonical" href="${BASIS}${url}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Layer 8 Academy">
<meta property="og:title" content="${esc(titel)}">
<meta property="og:description" content="${esc(beschreibung)}">
<meta property="og:url" content="${BASIS}${url}">
<meta property="og:locale" content="de_DE">
<meta name="twitter:card" content="summary">
${ld({ "@context": "https://schema.org", "@graph": [brotLd(pfad), ...daten] })}
<script>
  try {
    var t = localStorage.getItem('l8a_theme');
    if (t && t !== 'default') document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
</script>
<link rel="stylesheet" href="/styles.css?v=${styleVersion}">
<link rel="stylesheet" href="/seiten.css?v=${styleVersion}">
</head>
<body class="seite">
<header class="seite-kopf">
  <div class="wrap">
    <a class="seite-logo" href="/" aria-label="Layer 8 Academy – zur Lernplattform">${logo}</a>
    <nav class="seite-nav" aria-label="Hauptnavigation">
      <a href="/nachschlagen/">Nachschlagen</a>
      <a href="/glossar/">Glossar</a>
      <a href="/#fragen">Fragen üben</a>
      <a href="/subnetting-trainer/">Subnetting</a>
      <a href="/ap1-simulator/">AP1-Simulator</a>
      <a href="/osi-battle/">Diagnose-Arena</a>
    </nav>
  </div>
</header>
<main class="wrap seite-inhalt">
${brot}
${h1 ? `<h1 class="seite-h1">${esc(h1)}</h1>\n` : ""}${inhalt}
</main>
<footer><div class="wrap">
<p class="footer-lead">${footerLead}</p>
<nav class="footer-nav" aria-label="Themenfelder">
  ${felder.map((f) => `<a href="${feldUrl(f)}">${esc(f.titel)}</a>`).join(" · ")} · <a href="/nachschlagen/">Alle Kapitel</a> · <a href="/glossar/">Glossar</a>
</nav>
<div class="footer-copy">© ${datum.slice(0, 4)} boxberger.app · <a href="/impressum/" class="imprint-link">Impressum &amp; Datenschutz</a></div>
</div></footer>
</body>
</html>
`;
}

/** Karten-Liste von Kapiteln (Titel + Kurzbeschreibung) */
const kapitelKarten = (liste) => `<ul class="seite-karten">
${liste.map((k) => `  <li><a href="${kapUrl(k)}"><span class="sk-titel">${esc(k.titel)}</span><span class="sk-text">${esc(kuerze(k.absatz, 150))}</span></a></li>`).join("\n")}
</ul>`;
const ctaApp = (hash, was) => `<div class="seite-cta">
  <p>${was}</p>
  <div class="seite-cta-knoepfe">
    <a class="seite-knopf seite-knopf-haupt" href="/${hash}">In der Lernplattform öffnen</a>
    <a class="seite-knopf" href="/#fragen">Fragen üben</a>
    <a class="seite-knopf" href="/glossar/">Glossar</a>
  </div>
</div>`;

// ---------- Seiten ----------
const ausgabe = new Map();
const lernRessource = (name, beschreibung, url, teaches) => ({
  "@type": "LearningResource", name, description: beschreibung, url: BASIS + url, inLanguage: "de-DE", isAccessibleForFree: true,
  learningResourceType: "Nachschlagewerk", educationalLevel: "Berufsausbildung", ...(teaches ? { teaches } : {}),
  isPartOf: { "@id": `${BASIS}/#website` }, author: autor
});

// Kapitel
for (const k of kapitel) {
  const f = feldVon.get(k.id);
  const pfad = [["Start", "/"], ["Nachschlagen", "/nachschlagen/"], ...(f ? [[f.titel, feldUrl(f)]] : []), [k.kurz, kapUrl(k)]];
  const beschreibung = kuerze(k.absatz || `${k.titel}: Erklärungen für die IHK-Abschlussprüfung Teil 1 (AP1).`);
  let inhalt = linksFuerSeite(k.inhalt).replace(/<h2([^>]*)>[\s\S]*?<\/h2>\n?/, "");
  const geschwister = f ? f.kapitel : [];
  const pos = geschwister.findIndex((x) => x.id === k.id);
  const vor = pos > 0 ? geschwister[pos - 1] : null, nach = pos >= 0 && pos < geschwister.length - 1 ? geschwister[pos + 1] : null;
  const blaettern = f ? `<nav class="seite-blaettern" aria-label="Weitere Kapitel">
  ${vor ? `<a class="sb-vor" href="${kapUrl(vor)}"><span>Vorheriges Kapitel</span>${esc(vor.kurz)}</a>` : "<span></span>"}
  ${nach ? `<a class="sb-nach" href="${kapUrl(nach)}"><span>Nächstes Kapitel</span>${esc(nach.kurz)}</a>` : "<span></span>"}
</nav>` : "";
  const feldListe = f ? `<section class="seite-feld" aria-labelledby="feld-titel">
<h2 id="feld-titel">Mehr aus ${esc(f.titel)}</h2>
<div class="seite-pillen">${geschwister.map((x) => (x.id === k.id ? `<span class="topic-sub aktuell" aria-current="page">${esc(x.kurz)}</span>` : `<a class="topic-sub" href="${kapUrl(x)}">${esc(x.kurz)}</a>`)).join("")}</div>
</section>` : "";
  ausgabe.set(`nachschlagen/${k.slug}/index.html`, seite({
    // Titel so kurz, dass Google ihn nicht abschneidet (etwa 65 Zeichen)
    url: kapUrl(k), titel: [`${k.titel} – AP1 einfach erklärt | Layer 8 Academy`, `${k.titel} | AP1 – Layer 8 Academy`, `${k.titel} | Layer 8 Academy`].find((t) => t.length <= 65) ?? `${k.titel} | L8A`, beschreibung, h1: k.titel, pfad,
    daten: [lernRessource(k.titel, beschreibung, kapUrl(k), f ? f.titel : "AP1")],
    inhalt: `<div class="view active" id="view-lesen">
<section id="${k.id}">
${inhalt.trim()}
</section>
</div>
${ctaApp(`#${k.id}`, "Interaktiv mit Volltextsuche, Glossar-Bubbles und Übungsfragen lernen:")}
${blaettern}
${feldListe}`
  }));
}

// Themenfelder
for (const f of felder) {
  const pfad = [["Start", "/"], ["Nachschlagen", "/nachschlagen/"], [f.titel, feldUrl(f)]];
  const beschreibung = kuerze(f.text);
  ausgabe.set(`themen/${f.slug}/index.html`, seite({
    url: feldUrl(f), titel: `${f.titel} für die AP1: alle Kapitel | Layer 8 Academy`, beschreibung, h1: `${f.titel} für die AP1`, pfad,
    daten: [{ ...lernRessource(`${f.titel} für die AP1`, beschreibung, feldUrl(f), f.titel), hasPart: f.kapitel.map((k) => ({ "@type": "LearningResource", name: k.titel, url: BASIS + kapUrl(k) })) }],
    inhalt: `<p class="seite-lead">${esc(f.text)}</p>
${kapitelKarten(f.kapitel)}
<nav class="seite-pillen seite-felder" aria-label="Andere Themenfelder">${felder.map((x) => (x === f ? `<span class="topic aktuell" aria-current="page">${esc(x.titel)}</span>` : `<a class="topic" href="${feldUrl(x)}">${esc(x.titel)}</a>`)).join("")}</nav>
${ctaApp("", "Alle Themen zusammen, mit Volltextsuche, Glossar-Bubbles und Übungsfragen:")}`
  }));
}

// Übersicht
const ohneFeld = kapitel.filter((k) => !feldVon.has(k.id));
ausgabe.set("nachschlagen/index.html", seite({
  url: "/nachschlagen/", titel: "AP1 Nachschlagewerk: alle Themen und Kapitel | Layer 8 Academy",
  beschreibung: `Nachschlagewerk für die IHK-Abschlussprüfung Teil 1 (AP1) der IT-Berufe: ${kapitel.length} Kapitel in ${felder.length} Themenfeldern, von Netzwerken und IT-Sicherheit bis BWL und Projektmanagement.`,
  h1: "AP1 Nachschlagewerk", pfad: [["Start", "/"], ["Nachschlagen", "/nachschlagen/"]],
  inhalt: `<p class="seite-lead">Alle Inhalte der Abschlussprüfung Teil 1 in ${kapitel.length} Kapiteln, sortiert nach Themenfeldern. Jedes Kapitel lässt sich hier lesen oder direkt in der Lernplattform mit Suche, Glossar und Übungsfragen öffnen.</p>
${ohneFeld.length ? kapitelKarten(ohneFeld) : ""}
${felder.map((f) => `<section class="seite-feldblock">
<h2><a href="${feldUrl(f)}">${esc(f.titel)}</a></h2>
<p class="seite-feldtext">${esc(f.text)}</p>
${kapitelKarten(f.kapitel)}
</section>`).join("\n")}
${ctaApp("", "Alles in einer Seite, mit Volltextsuche, Glossar-Bubbles und Übungsfragen:")}`
}));

// Glossar
const buchstabe = (a) => { const c = a[0].toUpperCase().normalize("NFD")[0]; return /[A-Z]/.test(c) ? c : "#"; };
const gruppen = new Map();
for (const g of glossar) { const b = buchstabe(g.a); if (!gruppen.has(b)) gruppen.set(b, []); gruppen.get(b).push(g); }
const gAnker = (b) => (b === "#" ? "g-zahlen" : `g-${b.toLowerCase()}`);
ausgabe.set("glossar/index.html", seite({
  url: "/glossar/", titel: `IT-Glossar für die AP1: ${glossar.length} Abkürzungen und Begriffe | Layer 8 Academy`,
  beschreibung: `${glossar.length} IT-Abkürzungen und Fachbegriffe für die IHK-Abschlussprüfung Teil 1 (AP1), kurz erklärt: von 2FA über DHCP und RAID bis VLAN und WPA3.`,
  h1: "IT-Glossar für die AP1", pfad: [["Start", "/"], ["Glossar", "/glossar/"]],
  daten: [{ "@type": "DefinedTermSet", name: "IT-Glossar für die AP1", url: `${BASIS}/glossar/`, inLanguage: "de-DE" }],
  inhalt: `<p class="seite-lead">${glossar.length} Abkürzungen und Begriffe aus der IT, alphabetisch. In der Lernplattform erscheinen sie beim Lesen als Infoblase, und das Glossar lässt sich dort durchsuchen.</p>
<nav class="glossar-abc" aria-label="Buchstaben">${[...gruppen.keys()].map((b) => `<a href="#${gAnker(b)}">${b}</a>`).join("")}</nav>
${[...gruppen].map(([b, liste]) => `<section class="glossar-gruppe" id="${gAnker(b)}">
<h2>${b}</h2>
<dl>
${liste.map((g) => `<div class="glossar-eintrag"><dt><strong>${esc(g.a)}</strong>${g.f && g.f !== g.a ? ` <span class="glossar-voll">${esc(g.f)}</span>` : ""}</dt><dd>${esc(g.d)}</dd></div>`).join("\n")}
</dl>
</section>`).join("\n")}
${ctaApp("#glossar", "Glossar mit Sofortsuche und Begriffen direkt im Nachschlagewerk:")}`
}));

// Impressum (für die Unterseiten; die App zeigt es als Fenster)
ausgabe.set("impressum/index.html", seite({
  url: "/impressum/", titel: "Impressum & Datenschutz | Layer 8 Academy", beschreibung: "Impressum und Datenschutzhinweise der Layer 8 Academy.",
  h1: "Impressum & Datenschutz", pfad: [["Start", "/"], ["Impressum & Datenschutz", "/impressum/"]], index: false,
  inhalt: `<div class="seite-text">${impressum.replace(/ class="imprint-link"/g, "").trim()}</div>`
}));

// Sitemap
const urls = [
  ["/", "weekly", "1.0"], ["/nachschlagen/", "weekly", "0.9"],
  ...felder.map((f) => [feldUrl(f), "weekly", "0.8"]),
  ...kapitel.map((k) => [kapUrl(k), "monthly", "0.7"]),
  ["/glossar/", "monthly", "0.7"],
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

// ---------- Startseite (die App): crawlbare Links in den Themenblasen und der Fußzeile ----------
// Die Blasen sind echte Links auf die Themenfeld-Seiten; app.js klappt sie in der App wie bisher auf (initTopicBubbles).
// Die Fußzeile verlinkt Kapitelseiten; app.js springt in der App über data-r bzw. data-ansicht an die Stelle.
const FUSS_KAPITEL = [["r-osi", "OSI-Modell"], ["r-subnetting", "Subnetting"], ["r-ip", "IPv4 & IPv6"], ["r-security", "IT-Sicherheit"], ["r-krypto", "Verschlüsselung"],
  ["r-datenschutz", "Datenschutz"], ["r-projekt", "Projektmanagement"], ["r-hardware", "IT-Hardware"], ["r-ap1", "AP1-Überblick"]];
const nl = index.includes("\r\n") ? "\r\n" : "\n";
const indexRoh = readFileSync(join(WURZEL, "index.html"), "utf8");
const blasen = `<div class="topics" id="topicBubbles" aria-label="Themenauswahl">${felder.map((f) => `<a class="topic" href="${feldUrl(f)}" data-topic="${f.id}">${esc(f.titel)}</a>`).join("")}</div>`;
const fuss = `<nav class="footer-nav" aria-label="Themen">${nl}  ${FUSS_KAPITEL.filter(([i]) => KAP.has(i)).map(([i, n]) => `<a href="${kapUrl(KAP.get(i))}" data-r="${i}">${esc(n)}</a>`).join(" · ")} ·${nl}  <a href="/nachschlagen/">Alle Kapitel</a> · <a href="/glossar/" data-ansicht="lib">Glossar</a>${nl}</nav>`;
const indexNeu = indexRoh
  .replace(/<div class="topics" id="topicBubbles"[^>]*>[\s\S]*?<\/div>/, blasen)
  .replace(/<nav class="footer-nav" aria-label="Themen">[\s\S]*?<\/nav>/, fuss);
if (indexNeu.replace(/\r\n/g, "\n") !== indexRoh.replace(/\r\n/g, "\n")) ausgabe.set("index.html", indexNeu); // Zeilenenden bleiben, wie sie sind

// ---------- Schreiben oder prüfen ----------
const alt = [];
for (const dir of ["nachschlagen", "themen"]) {
  const d = join(WURZEL, dir);
  if (existsSync(d)) for (const s of readdirSync(d)) if (existsSync(join(d, s, "index.html"))) alt.push(`${dir}/${s}/index.html`);
}
const veraltet = alt.filter((p) => !ausgabe.has(p));
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
console.log(`${ausgabe.size} Dateien geprüft (${kapitel.length} Kapitel, ${felder.length} Themenfelder, Übersicht, Glossar mit ${glossar.length} Begriffen, Impressum, Sitemap), ${anders} neu geschrieben, ${veraltet.length} entfernt`);
