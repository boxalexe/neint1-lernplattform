# Layer 8 Academy

Interaktives Lern- und Prüfungstool für **Netzwerke und Internettechnologien Grundlagen** (IHK-Vorbereitung, Fachinformatiker).

Kein Framework, kein Build-Schritt, keine Abhängigkeiten. Reines HTML, CSS und JavaScript – läuft in jedem modernen Browser und lässt sich statisch (z. B. über Cloudflare Pages oder GitHub Pages) ausliefern.

## Funktionen

- **Nachschlagen** – strukturiertes Nachschlagewerk zu allen Modulthemen: OSI-Modell, TCP/IP, Ports & Protokolle, Subnetting, Routing & Switching, DNS/DHCP, Verschlüsselung/PKI, VPN, WLAN, IT-Sicherheit u. a.
- **Bibliothek** – über 200 IT-Abkürzungen und Begriffe, alphabetisch, mit Live-Suche.
- **Multiple Choice** – 665 Fragen in 22 Kategorien. Bis zu 3 Kategorien gleichzeitig, Umfang pro Durchlauf wählbar (15 / 30 / alle), Fragen rotieren ohne Wiederholung. Jede Frage mit kurzer Erklärung nach der Antwort.

Leitprinzip: Jede Quizfrage ist über das Nachschlagewerk herleitbar – Fragen, Reader und Bibliothek bilden eine zusammenhängende Lerneinheit.

## Struktur

```
index.html    Markup
styles.css    Styling
app.js        Daten (Fragen + Glossar) und Logik
```

## Lokal starten

Da CSS und JS ausgelagert sind, blockieren manche Browser das direkte Öffnen per `file://`. Einfachster Weg über einen lokalen Server:

```bash
python3 -m http.server
# dann http://localhost:8000 öffnen
```

## Deployment

Statisches Hosting genügt. Bei Cloudflare Pages

## Lizenz / Nutzung

Erstellt zur Prüfungsvorbereitung und zur freien Nutzung
