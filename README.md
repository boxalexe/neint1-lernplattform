# Layer 8 Academy (L8A)

Kostenlose, werbefreie Übungsplattform für die **IHK-Abschlussprüfung Teil 1 (AP1)** der IT-Berufe.

🔗 **Live:** https://layer8academy.boxberger.app/

## Was es ist

- **Multiple-Choice-Trainer** — 1160 Fragen in 34 Themenpools (Netzwerke, IT-Sicherheit, SQL, Projektmanagement, Verschlüsselung, Verkabelung u. v. m.)
- **Nachschlagewerk** — 34 Reader-Kapitel mit Erklärtexten, Tabellen und Rechenbeispielen (Subnetting, Netzplantechnik, RAID, Break-even …)
- **Glossar** — 298 Begriffe, durchsuchbar, im Reader per Hover/Tap als Infobubble bei thematisch zentralen Begriffen
- Läuft **komplett clientseitig**, kein Server, kein Tracking, alles im `localStorage` des Browsers

## Tech-Stack

Reines HTML/CSS/JavaScript, keine Frameworks, kein Build-Schritt.

```
index.html   Struktur, Reader-Inhalte, Navigation
app.js       Fragenpools, Glossar, Quiz-Logik, Bubble-Rendering
styles.css   Theming (mehrere Farbschemata über CSS-Variablen)
```

## Deploy

Gehostet als Cloudflare Worker. Push auf `main` im Repo `boxalexe/neint1-lernplattform` deployed automatisch.

## Stand

34 Sektionen · 34 Fragenpools · 1160 Fragen · 298 Glossarbegriffe

## Hinweis

L8A ist ein privates Lernprojekt, kein amtliches Angebot. Für verbindliche Auskünfte zur Prüfung: [IHK-Finder](https://www.dihk.de/ihk-finder).
