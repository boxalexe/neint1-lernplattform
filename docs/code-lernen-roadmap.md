# Code lesen: Stand und nächste Schritte

## Stand

Nach dem Muster umgebaut (Praxis-Szenario, geprüfte Aufgaben, Brücke zu den anderen Kursen):

| Kurs | Lektionen | Besonderheiten |
|---|---|---|
| Java | 14 | Abläufe per JDI aufgezeichnet, Bug-Arena, Clean Code |
| Python | 14 | Abläufe per `sys.settrace`, gleicher Aufbau wie Java |
| Pseudocode | 11 | Schreibtischtest und Bug-Arena live über den Interpreter, Brücke zu Java und Python |

Noch im alten Format (dünn: wenig Aufgaben, nur Lückentext, kaum Szenario-Bezug): OOP/UML, PSS, JavaScript, C#, C, C++. AP2 und SQL sind inhaltlich in Ordnung, AP2 überschneidet sich aber mit PSS.

## Nächste Schritte (in dieser Reihenfolge)

1. **OOP und UML zu „Modellieren“ umbauen.** Bisher nur Text und Diagramme, keine Zeile Code, eine bis zwei Lückentext-Aufgaben je Lektion. Ziel: Diagramm und Code nebeneinander (Pseudocode, Java, Python), Aufgaben in beide Richtungen (UML lesen und Code zuordnen, Code lesen und Multiplizität/Beziehung bestimmen), Entwurf aus Aufgabentext endet beim Shop-Klassendiagramm aus Java/Python Modul 11 (`architektur`). Was Java/Python Modul 7 bis 9 schon ausführlich erklären, wird hier Verweis statt Wiederholung. URLs (`oop/warum`, `oop/kapselung`, …) bleiben.
2. **PSS mit durchgehendem Projekt.** Theorie ist gut, Aufgaben sind nur Lückentext. Ziel: der Shop als Projekt von Lastenheft über Use-Case, Aktivitätsdiagramm und PAP bis zum Pseudocode, mit echten Aufgaben (Anforderungen einordnen, Diagramm-Fehler finden, PAP in Pseudocode übersetzen und im Interpreter prüfen).
3. **Dopplung PSS/AP2 bereinigen.** Struktogramm/PAP und Use-Case/Aktivität stehen in beiden Kursen. Grundlagen in PSS, AP2 nur noch Prüfungsvertiefung mit Verweis.
4. **JavaScript, C#, C, C++** nach dem Java/Python-Muster. Für C# (.NET SDK) und C/C++ (gcc/g++) die Compiler lokal installieren, sonst meldet `run-predict.js` NOT RUN. Für Abläufe je Sprache einen Tracer nach dem Vorbild von `trace-python/tracer.py` (Ausgabeformat siehe Kopf von `trace-java/Tracer.java`).

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
