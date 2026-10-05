# Layer 8 Academy (L8A)

Kostenlose, werbefreie Übungsplattform für die **IHK-Abschlussprüfung Teil 1 (AP1)** der IT-Berufe.

🔗 **Live:** https://layer8academy.boxberger.app/

## Was es ist

- **Multiple-Choice-Trainer** — 1378 Fragen in 49 Kategorien (Netzwerke, IT-Sicherheit, SQL, Projektmanagement, Verschlüsselung, Verkabelung u. v. m.), Anzahl pro Kategorie per Regler wählbar
- **Karteikartenmodus** — Frage mit freiem Antwortfeld, Musterlösung auf Klick, Selbsteinschätzung „Wusste ich“ / „Wusste ich nicht“
- **Wackelkandidaten** — falsch beantwortete Fragen und nicht gewusste Karten werden getrennt gesammelt und lassen sich gezielt wiederholen
- **Karteikarten drucken** — Fragen per Stern im Durchlauf vormerken, in der Druckmappe prüfen und als Faltkarten drucken: sechs Karten pro A4-Blatt quer, Frage vorne, richtige Antwort hinten, ausschneiden und falten
- **Nachschlagewerk** — 48 Reader-Kapitel mit Erklärtexten, Tabellen und Rechenbeispielen (Subnetting, Netzplantechnik, RAID, Break-even …)
- **Glossar** — 563 Begriffe, durchsuchbar, im Reader per Hover/Tap als Infobubble bei thematisch zentralen Begriffen
- **Eigene Trainer** — Subnetting Trainer (`/subnetting-trainer/`), AP1 Simulator (`/ap1-simulator/`) und die Diagnose-Arena (`/osi-battle/`)
- Läuft **komplett clientseitig**, kein Server, kein Tracking, alles im `localStorage` des Browsers

## Tech-Stack

Reines HTML/CSS/JavaScript, keine Frameworks, kein Build-Schritt.

```
index.html   Struktur, Reader-Inhalte, Navigation
app.js       Fragenpools, Glossar, Quiz-Logik, Kartendruck, Bubble-Rendering
styles.css   Theming (mehrere Farbschemata über CSS-Variablen)
```

## Kartendruck

Die Druckansicht öffnet sich in einem eigenen Fenster mit hellem Layout. Damit Schnitt- und Faltlinien passen, im Druckdialog Querformat, Skalierung 100 % bzw. „Tatsächliche Größe“ und Ränder „Keine“ wählen. Durchgezogene Linien werden geschnitten, gestrichelte gefaltet. Gedruckt werden nur Frage und richtige Antwort, ohne Erklärung. Fragen, die nur mit sichtbaren Antwortoptionen eindeutig sind (`card: false`), lassen sich nicht vormerken.

## Lokale Speicherung

| Schlüssel | Inhalt |
|---|---|
| `neint1_wrong_v1` | Wackelkandidaten Multiple Choice |
| `neint1_wrong_cards_v1` | Wackelkandidaten Karteikarten |
| `neint1_print_v1` | Auswahl für den Kartendruck |

Gespeichert wird jeweils der Fragetext. Wird eine Frage umformuliert, verliert ein gespeicherter Eintrag seinen Bezug.

## Deploy

Gehostet als Cloudflare Worker. Push auf `main` im Repo `boxalexe/neint1-lernplattform` deployed automatisch.

## Stand

48 Reader-Kapitel · 49 Kategorien · 1378 Fragen · 563 Glossarbegriffe

## Hinweis

L8A ist ein privates Lernprojekt, kein amtliches Angebot. Für verbindliche Auskünfte zur Prüfung: [IHK-Finder](https://www.dihk.de/ihk-finder).
