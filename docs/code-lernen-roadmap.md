# Code lesen: Stand und nächste Schritte

## Stand

Nach dem Muster umgebaut (Praxis-Szenario, geprüfte Aufgaben, Brücke zu den anderen Kursen):

| Kurs | Lektionen | Besonderheiten |
|---|---|---|
| Java | 14 | Abläufe per JDI aufgezeichnet, Bug-Arena, Clean Code |
| Python | 14 | Abläufe per `sys.settrace`, gleicher Aufbau wie Java |
| Pseudocode | 11 | Schreibtischtest und Bug-Arena live über den Interpreter, Brücke zu Java und Python |
| Modellieren (OOP & UML) | 7 | Diagramm & Code (Java/Python) nebeneinander, Shop/Login/Tickets, Aufgaben in beide Richtungen bis zum 4-Klassen-Shop-Entwurf |
| Software planen (PSS) | 7 | Durchgehendes Shop-Projekt von Rechnergrundlagen, SDLC & Anforderungen über Use-Case/Aktivität bis PAP/Struktogramm & Pseudocode |
| Prüfungswissen AP2 | 11 | Dopplung mit PSS bereinigt: `struktogramm` und `uml2` als Prüfungsvertiefung (Zustandsdiagramm, AP2-Fallen) mit Verweisen auf PSS |
| JavaScript | 14 | Alle 14 Module nach dem Java-/Python-Muster (Shop/Login/Tickets, `#`-Kapselung, 4-Klassen-Architektur, Clean Code, Bug-Arena, JSON/async/DOM); alle Aufgaben per Node-VM geprüft |
| C# | 14 | Alle 14 Module nach dem Java-/Python-Muster (Shop/Login/Tickets, `TryParse`, `switch`-Ausdruck, Properties, `virtual`/`override`, `IZahlungsmethode`, 4-Klassen-Architektur, Clean Code, Bug-Arena, LINQ) |
| C | 11 | Durchgehendes Shop-/Ticket-Szenario (`printf`, `char[]`/`strcmp`, `struct` + Zeiger, Fehlercodes, Clean Code, Bug-Arena, `malloc`/`free`) |
| C++ | 14 | Alle 14 Module nach dem Java-/Python-Muster (Shop/Login/Tickets, `string`, `vector`, Referenzen, `virtual`/`override`, 4-Klassen-Architektur, Clean Code, Bug-Arena, `unique_ptr` & STL-Algorithmen) |

Alle Kurse sind auf das neue Praxis-Format umgestellt (SQL war bereits im Zielformat).

## Optionale nächste Schritte

1. Auf einem Rechner mit installiertem `.NET SDK`, `gcc` und `g++` einmal `node tools/code-lernen/run-predict.js` für `csharp`, `c` und `cpp` ausführen (für `java`, `python`, `javascript` und `pseudo` bereits komplett grün).
2. Optional eigene Ablauf-Tracer für JavaScript, C#, C und C++ nach dem Vorbild von `trace-python/tracer.py` ergänzen.

## Aufbau einer Lektion

- `standalone: true`, `domain: 'shop' | 'login' | 'tickets'` (Stammdaten in `js/content/domains.js`), `terms: [...]` (müssen in `begriffe.js` oder `concepts.js` stehen und im Text vorkommen).
- Jedes Codebeispiel mit `praxis: '…'`, wo sinnvoll `trace: true`.
- Aufgaben: `A.desk` (Schreibtischtest, Zeile `at` muss mindestens zweimal laufen), `A.bug` (Zeile, Fehlerart, 4 Korrekturen, `expect`), `A.choose` (Varianten mit gleicher Ausgabe), `A.predict`, `A.fill`. Quiz: richtige Antwort nicht auffällig länger als die falschen.
- Am Ende eine Tabelle „Dasselbe in …“ mit Links im Format `[Text](/code-lernen/kurs/<kurs>/<lektion>/)` (nur interne Pfade werden zu Links).
- Alte Lektions-IDs bleiben, zusammengelegte Lektionen bekommen `A.moved` und einen Eintrag in `_redirects`.

## Prüfen vor jedem Push

```
node tools/code-lernen/trace-bauen.js java      # JAVAC/JAVA setzen, falls nicht im PATH
node tools/code-lernen/trace-bauen.js python    # PYTHON setzen, falls nicht im PATH
node tools/code-lernen/check.js                 # muss „Keine Fehler. 0 Hinweise.“ melden
node tools/code-lernen/run-predict.js           # Bugs: Fehler tritt auf, genau eine Korrektur stimmt; Clean Code: alle Varianten gleich
node tools/code-lernen/pseudo-test.js
node tools/code-lernen/seiten-bauen.js          # statische Seiten und Sitemap
```

Danach die Versionsnummer `?v=` in `code-lernen/index.html` erhöhen und die Seite im Browser durchklicken (Ablauf, Schreibtischtest, Bug-Aufgabe, Links). Ein Push auf `main` geht sofort live.
