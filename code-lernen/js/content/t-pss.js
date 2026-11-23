/* Kurs: Software planen (PSS) – durchgehendes Onlineshop-Projekt von den Rechnergrundlagen über Lastenheft,
   Anforderungen, Use-Case und Aktivitätsdiagramm bis zu PAP, Struktogramm und Pseudocode. */
(function () {
  'use strict';
  const A = window.Academy, P = (lines, h, o) => A.code('pseudo', lines, h, o);

  A.track({
    id: 'pss', title: 'Software planen (PSS)', tag: 'ERST PLANEN, DANN CODEN',
    desc: 'Vom Auftrag zum sauberen Plan am durchgehenden Onlineshop-Projekt: Rechnergrundlagen, SDLC, Lasten- und Pflichtenheft, Anforderungen, Use-Case, Aktivitätsdiagramm, PAP und Struktogramm.',
    intro: 'PSS steht für **Planung strukturierter Software**. Bevor in einem Projekt die erste Zeile Code entsteht, klärt das Team: Was soll die Software leisten, wer nutzt sie, und wie laufen die Prozesse im Detail ab? Genau diesen Weg gehst du hier Schritt für Schritt an unserem **Onlineshop für IT-Zubehör** durch – vom ersten Kundenwunsch im Lastenheft über Use-Case, Aktivitätsdiagramm und Struktogramm bis zum ausführbaren Pseudocode. Alle Themen sind fester Prüfungsstoff in AP1 und AP2.',
    lessons: [
      /* ---------- 1. Wie ein Computer arbeitet ---------- */
      {
        id: 'rechner', standalone: true, domain: 'shop', stage: 1,
        title: 'Wie ein Computer arbeitet: vom Maschinencode zur Hochsprache',
        goal: 'Du kennst die Bauteile eines Rechners, den Befehlszyklus, Bits und Bytes und weißt, was Compiler, Interpreter, Linker, JVM und IDE tun.',
        terms: ['ALU', 'Register', 'Maschinencode', 'Assembler', 'Linker', 'Bytecode', ['JVM (Java Virtual Machine)', 'JVM'], 'Debugger'],
        parts: [
          A.text('Programmieren heißt: ganz genau sagen', 'Ein Computer ist extrem schnell, aber er denkt nicht mit. Er führt Befehle **genau so** aus, wie sie dastehen – nicht so, wie sie gemeint waren. Sagst du einem Mitarbeiter „Berechne den Endbetrag im Shop“, weiß er, was gemeint ist. Ein Computer braucht jeden einzelnen Schritt: Artikelpreise summieren, Grenze von 50 Euro prüfen, Versand addieren, Ergebnis ausgeben. Dieses Zerlegen in eindeutige Teilschritte heißt **algorithmisches Denken**.'),
          A.table(['Bauteil', 'Aufgabe', 'Im Onlineshop'], [
            ['**CPU** (Prozessor)', 'führt Befehle aus, rechnet, vergleicht. Besteht aus Rechenwerk (**ALU**), Steuerwerk und **Registern** (winzige, sehr schnelle Zwischenspeicher)', 'rechnet Warenkorb-Summe und Versandkosten aus'],
            ['**RAM** (Arbeitsspeicher)', 'hält laufende Programme und aktuelle Daten; flüchtig, nach dem Ausschalten leer', 'hält den aktuellen Warenkorb während der Sitzung'],
            ['**Massenspeicher** (SSD, Festplatte)', 'speichert dauerhaft, auch ohne Strom', 'speichert Artikelkatalog und Bestellungen in der Datenbank'],
            ['**Ein- und Ausgabe**', 'Tastatur, Maus, Scanner liefern Daten; Bildschirm, Drucker geben sie aus', 'Bestellformular im Browser, gedrucktes Versandetikett']
          ], 'Die wichtigsten Bauteile'),
          A.text('Der Befehlszyklus: Holen, Dekodieren, Ausführen', 'Die CPU arbeitet immer im selben Takt, Milliarden Mal pro Sekunde:\n\n1. **Fetch** (Holen): den nächsten Befehl aus dem Arbeitsspeicher (RAM) holen.\n2. **Decode** (Dekodieren): Das Steuerwerk entschlüsselt, was zu tun ist.\n3. **Execute** (Ausführen): Die **ALU** rechnet, vergleicht oder schreibt ein Ergebnis ins **Register**.\n\nDann beginnt der Zyklus von vorn. Jedes Shop-Programm ist für die CPU letztlich eine lange Liste solcher Einzelschritte.'),
          A.text('Alles ist 0 und 1', 'Im Rechner liegt alles als **Binärwert**. Eine einzelne 0 oder 1 ist ein **Bit**, acht Bit sind ein **Byte**. Die Bestellmenge 5 ist `00000101`, der Buchstabe A im ASCII-Code `01000001`. Programmiersprachen verstecken diese Bits hinter **Datentypen**: Du schreibst `1999` (Cent) oder `"Funkmaus"`, der Datentyp legt fest, wie die Bits interpretiert werden.'),
          A.table(['Datentyp (Java)', 'Inhalt', 'Beispiel aus dem Shop'], [
            ['`int` / `long`', 'ganze Zahl', '`1999` (Preis in Cent), `35` (Lagerbestand)'],
            ['`double`', 'Kommazahl', '`0.19` (Mehrwertsteuersatz)'],
            ['`char`', 'ein einzelnes Zeichen', '`\'A\'` (Versandklasse)'],
            ['`boolean`', 'Wahrheitswert', '`true` (lieferbar)'],
            ['`String`', 'Zeichenkette', '`"Funkmaus"` (Artikelname)']
          ], 'Datentypen geben den Bits eine Bedeutung'),
          A.text('Drei Stufen: Maschinencode, Assembler, Hochsprache', '**Maschinencode** besteht aus reinen Zahlen, die die CPU direkt ausführt – für Menschen kaum lesbar. **Assembler** schreibt dieselben Befehle als Kürzel (**Mnemonics**) wie `mov`, `add` oder `cmp`; ein Übersetzer erzeugt daraus Maschinencode. **Hochsprachen** wie Python, Java oder C orientieren sich an menschlicher Sprache: Man rechnet mit `preisInCent` statt mit Registern.'),
          A.code('c', [
            'int gesamtpreis(int preisInCent, int menge) {§Eine Funktion in C: rechnet den Zeilenbetrag einer Bestellposition.',
            '    int summe = preisInCent * menge;§Statt Register-Befehlen (mov, imul) reicht eine lesbare Zeile.',
            '    if (summe < 5000) {§Versandkostenfrei erst ab 50,00 Euro (5000 Cent).',
            '        summe += 495;§Sonst 4,95 Euro Versand addieren.',
            '    }',
            '    return summe;§Gibt den Endbetrag in Cent zurück.',
            '}'
          ], 'Dasselbe in einer Hochsprache (C)', { praxis: 'C wird vor dem Start komplett in Maschinencode übersetzt und vom Linker gebunden – ideal für schnelle Systemsoftware oder eingebettete Kassenterminals.' }),
          A.code('python', [
            'def gesamtpreis(preis_in_cent, menge):§Dieselbe Shop-Regel in einer interpretierten Hochsprache.',
            '    summe = preis_in_cent * menge§Kein Compiler-Lauf vorher nötig: der Interpreter führt direkt aus.',
            '    if summe < 5000:',
            '        summe += 495',
            '    return summe',
            'print("Endbetrag:", gesamtpreis(1999, 2), "Cent")§2 Funkmäuse = 3998 Cent + 495 Cent Versand = 4493 Cent.'
          ], 'Und in Python (interpretiert)', { trace: true, praxis: 'Der Python-Interpreter liest und startet den Code sofort. Das spart Zeit beim Entwickeln von Skripten, Imports und Web-Backends.' }),
          A.table(['Werkzeug', 'Was es tut', 'Beispiel'], [
            ['**Compiler**', 'übersetzt den gesamten Quellcode **vorher** in ausführbaren Code', 'C, C++; Java übersetzt in **Bytecode**'],
            ['**Interpreter**', 'liest und führt den Code beim Start Zeile für Zeile aus', 'Python, JavaScript'],
            ['**Linker**', 'verbindet übersetzte Programmteile und Bibliotheken zur fertigen Datei', 'bei C und C++'],
            ['**JVM**', 'Java Virtual Machine: führt plattformunabhängigen Bytecode (`.class`) aus', '„Write once, run anywhere“'],
            ['**IDE**', 'Entwicklungsumgebung: Editor, Compiler/Interpreter, **Debugger** und Projektverwaltung', 'IntelliJ IDEA, Visual Studio, PyCharm']
          ], 'Vom Quelltext zum laufenden Programm'),
          A.table(['Fehlerart', 'Wann merkt man es?', 'Beispiel aus dem Shop'], [
            ['**Syntaxfehler**', 'beim Übersetzen – das Programm startet gar nicht', 'fehlende Klammer oder Semikolon'],
            ['**Laufzeitfehler**', 'während das Programm läuft – es bricht ab', 'Text „zwei“ statt Zahl im Mengenfeld'],
            ['**Logischer Fehler**', 'Programm läuft durch, liefert aber ein falsches Ergebnis', 'Versandkosten auch über 50 Euro berechnet']
          ], 'Fehlerarten beim Debugging'),
          A.table(['Weiterlesen', 'Passender Kurs'], [
            ['Wie Algorithmen aufgebaut sind', '[Pseudocode: Was ist ein Algorithmus?](/code-lernen/kurs/pseudo/algo/)'],
            ['Fehlersuche live üben', '[Java: Bug-Arena](/code-lernen/kurs/java/bugs/) und [Python: Bug-Arena](/code-lernen/kurs/python/bugs/)']
          ], 'Verbindung zu den anderen Kursen')
        ],
        tips: [
          A.tip('Ein **Debugger** führt Code Schritt für Schritt aus und zeigt alle Variablenwerte – genau wie der Knopf **Ablauf verfolgen** hier in der App.')
        ],
        quiz: [
          A.q('In welcher Reihenfolge arbeitet die CPU einen Befehl ab?', ['Holen, Dekodieren, Ausführen', 'Ausführen, Holen, Speichern', 'Dekodieren, Holen, Ausführen', 'Laden, Rechnen, Drucken'], 0, 'Fetch, Decode, Execute – immer im selben Takt.'),
          A.q('Wie viele Bit ergeben ein Byte?', ['8', '2', '10', '16'], 0, 'Acht Bit bilden ein Byte.'),
          A.q('Was unterscheidet einen Compiler von einem Interpreter?', ['Der Compiler übersetzt vor dem Start alles, der Interpreter arbeitet beim Ausführen', 'Der Compiler führt Zeile für Zeile aus, der Interpreter erzeugt vorher eine Datei', 'Der Compiler ist nur für Skriptsprachen, der Interpreter nur für C und C++', 'Beide übersetzen alles vorab, der Interpreter prüft zusätzlich die Logik'], 0, 'Compiler übersetzen vorab, Interpreter führen beim Start direkt aus.'),
          A.q('Der Shop läuft ohne Absturz, berechnet aber ab 50 Euro trotzdem Versandkosten. Welche Fehlerart?', ['Logischer Fehler', 'Syntaxfehler', 'Laufzeitfehler', 'Linkerfehler'], 0, 'Kein Abbruch und kein Übersetzungsfehler, aber falsches Ergebnis: Logikfehler.'),
          A.q('Was führt Java-Bytecode (`.class`-Dateien) aus?', ['Die Java Virtual Machine (JVM)', 'Der Linker des Betriebssystems', 'Die ALU direkt ohne Zwischenschicht', 'Der Texteditor der IDE'], 0, 'javac übersetzt in Bytecode, die JVM führt ihn auf dem jeweiligen System aus.')
        ],
        tasks: [
          A.fill('Wie heißt die Kurzschreibweise für Maschinenbefehle wie `mov`, `add` oder `jmp`?', '{{Assembler|Assemblersprache|Mnemonics}}', 'Die Ebene direkt über dem binären Maschinencode.'),
          A.fill('Welches Bauteil der CPU rechnet und vergleicht? (3 Buchstaben)', '{{ALU}}', 'Arithmetisch-logische Einheit.'),
          A.predict('Algorithmisches Denken am Shop-Beispiel: Was gibt der Ablauf aus?', [
            'preis <- 1999',
            'menge <- 3',
            'summe <- preis * menge',
            'WENN summe < 5000 DANN',
            '  summe <- summe + 495',
            'ENDE WENN',
            'AUSGABE summe'
          ], '5997', 'Rechne 1999 * 3 und prüfe danach, ob die Summe unter 5000 liegt.', '1999 * 3 = 5997. Da 5997 nicht kleiner als 5000 ist, entfallen die Versandkosten.')
        ]
      },

      /* ---------- 2. Warum strukturiert planen ---------- */
      {
        id: 'planen', standalone: true, domain: 'shop', stage: 1,
        title: 'Warum man Software plant',
        goal: 'Du begründest, warum Planung Kosten spart, erkennst Spaghetti-Code und technische Schulden und wendest CRUD, KISS, Modularität und die 3-Schicht-Architektur auf den Onlineshop an.',
        terms: ['Spaghetti-Code', 'Technische Schulden', 'CRUD', 'KISS', 'Programmierparadigma'],
        parts: [
          A.text('Hobby gegen professionellen Betrieb', 'Ein kleines Privatskript darf nach „Ausprobieren und Ändern“ entstehen. Ein **Onlineshop** im laufenden Betrieb muss mehr leisten: Er muss **zuverlässig** kassieren, **wartbar** bleiben (andere Entwickler müssen ihn in einem Jahr noch verstehen) und **skalieren**, wenn am Black Friday zehnmal so viele Bestellungen eingehen. Das funktioniert nur mit Planung.'),
          A.text('Wie ein Shop ohne Planung scheitert', 'Ein Team soll eine Artikel- und Kundenverwaltung bauen – eine klassische **CRUD-Anwendung**: **C**reate (Artikel anlegen), **R**ead (Katalog anzeigen), **U**pdate (Preis ändern), **D**elete (Artikel entfernen). Statt zu planen, startet jemand sofort mit **Code-and-Fix**: globale Variablen, Versandregeln mitten im HTML-Code, Datenbankabfragen direkt am Button.\n\nNach drei Monaten entsteht **Spaghetti-Code**: Niemand weiß mehr, welche Stelle den Lagerbestand ändert. Ein Artikel steht im Katalog mit 19,99 € und auf der Rechnung mit 24,99 €. Das Team steckt in **technischen Schulden**: Der schnelle Start war wie ein Kredit – jetzt frisst die Fehlersuche jede Arbeitswoche auf.'),
          A.table(['Schicht (3-Schicht-Architektur)', 'Aufgabe im Onlineshop', 'Vorteil der Trennung'], [
            ['**1. Präsentation** (Oberfläche)', 'Webseite oder App: Warenkorb anzeigen, Klicks entgegennehmen', 'Neues Design oder Mobile-App möglich, ohne Geschäftsregeln neu zu schreiben'],
            ['**2. Geschäftslogik** (Logik)', 'Versandkosten, Rabatte, Lagerprüfung, Login-Sperre', 'Alle Regeln stehen an genau einer Stelle und sind automatisch testbar'],
            ['**3. Datenhaltung** (Datenbank)', 'Artikel, Kunden und Bestellungen dauerhaft speichern', 'Datenbank lässt sich wechseln oder sichern, ohne die Oberfläche anzufassen']
          ], 'Die 3-Schicht-Architektur am Onlineshop', 'Diese Trennung (Separation of Concerns) ist der Gegenentwurf zu Spaghetti-Code.'),
          A.table(['Prinzip', 'Bedeutung', 'Beispiel im Shop'], [
            ['**Modularität**', 'System in kleine, abgeschlossene Bausteine mit einer Aufgabe zerlegen', 'Eigene Bausteine für `Warenkorb`, `RabattRechner` und `Zahlung`'],
            ['**KISS** (Keep it simple, stupid)', 'Die einfachste klare Lösung wählen, nichts unnötig verkomplizieren', 'Versandgrenze als klare Konstante statt verschachteltem Sonderkonstrukt'],
            ['**Coding Conventions**', 'Einheitliche Regeln für Namen, Einrückung und Struktur im Team', 'Preise heißen überall `preisInCent`, nie mal `p` und mal `eur`']
          ], 'Grundprinzipien strukturierter Planung'),
          A.text('Fehler werden mit der Zeit bis zu 100-mal teurer', 'Wird eine fehlende Versandregel in der **Planung** bemerkt, reicht ein Satz im Dokument. Fällt derselbe Fehler erst nach dem **Deployment** im Live-Shop auf, folgen falsche Rechnungen, Support-Tickets, Notfall-Patch, neue Tests und Kundenverlust. Planung kostet am Anfang Stunden – sie spart am Ende Wochen.'),
          A.table(['Programmierparadigma', 'Denkweise', 'Typisch für'], [
            ['**Prozedural**', 'Abfolge von Schritten, gegliedert in Funktionen', 'C, Skripte, einfache Batch-Jobs'],
            ['**Objektorientiert**', 'Objekte bündeln Daten und Verhalten', 'Java, Python, C#, unser 4-Klassen-Shop'],
            ['**Funktional**', 'Werte durch reine Funktionen verarbeiten ohne Nebeneffekte', 'Java Streams, Datenpipelines'],
            ['**Ereignisgesteuert**', 'Ablauf reagiert auf Ereignisse wie Klicks oder Anfragen', 'Web-Oberflächen, JavaScript im Browser']
          ], 'Programmierparadigmen im Überblick'),
          A.table(['Weiterlesen', 'Passender Kurs'], [
            ['Wie man Spaghetti-Code im Kleinen verhindert', '[Java: Clean Code](/code-lernen/kurs/java/clean/) und [Python: Clean Code](/code-lernen/kurs/python/clean/)'],
            ['Wie der 4-Klassen-Shop entworfen wird', '[Modellieren: Von der Aufgabe zum Klassendiagramm](/code-lernen/kurs/oop/entwurf/)']
          ], 'Verbindung zu den anderen Kursen')
        ],
        tips: [
          A.warn('**Programmieren** ist das Planen und Entwerfen der Lösung; **Codieren** ist erst das Übersetzen des Plans in eine Programmiersprache.')
        ],
        quiz: [
          A.q('Was beschreibt der Begriff „Technische Schulden“?', ['Späterer Mehraufwand durch heute gewählte schnelle, unsaubere Lösungen', 'Laufende monatliche Server- und Lizenzkosten einer Webanwendung', 'Offene Rechnungen der IT-Abteilung beim externen Dienstleister', 'Veraltete Büro-Hardware, die noch nicht abgeschrieben wurde'], 0, 'Wie ein Kredit: heute Zeit gespart, später Zinsen durch langsame Fehlersuche und Umbauten.'),
          A.q('Wofür steht die Abkürzung CRUD?', ['Create, Read, Update, Delete', 'Code, Run, Use, Debug', 'Create, Run, Undo, Deploy', 'Copy, Read, Upload, Download'], 0, 'Die vier Grundoperationen jeder Datenverwaltung: Anlegen, Lesen, Ändern, Löschen.'),
          A.q('In welcher Schicht der 3-Schicht-Architektur liegt die Berechnung der Versandkosten?', ['Geschäftslogik (Logikschicht)', 'Präsentationsschicht (Oberfläche)', 'Datenhaltungsschicht (Datenbank)', 'Betriebssystemschicht (Kernel)'], 0, 'Geschäftsregeln wie Versandgrenzen und Rabatte gehören in die Logikschicht, nicht in die Oberfläche.'),
          A.q('Wann ist ein Denkfehler in der Softwareentwicklung am günstigsten zu beheben?', ['Bereits in der Planungsphase', 'Erst nach dem Live-Deployment', 'Während der Wartung beim Kunden', 'In jeder Phase genau gleich teuer'], 0, 'Je später ein Fehler entdeckt wird, desto teurer sind Korrektur, Test und Auslieferung.')
        ],
        tasks: [
          A.fill('Wie heißt das Prinzip „die einfachste klare Lösung wählen“? (Abkürzung)', '{{KISS}}', 'Vier Anfangsbuchstaben: Keep it simple, stupid.'),
          A.fill('Ergänze den CRUD-Buchstaben für das Ändern eines Artikelpreises: Create, Read, {{Update}}, Delete.', '{{Update}}', 'Englisches Wort für Aktualisieren/Ändern.'),
          A.choose('Shop-Versandregel: Beide Varianten berechnen dasselbe. Welche folgt KISS und Modularität statt Code-and-Fix?', 'pseudo', [
            [
              'w1 <- 3998',
              'WENN w1 >= 5000 DANN',
              '  AUSGABE 0',
              'SONST',
              '  AUSGABE 495',
              'ENDE WENN',
              'w2 <- 6200',
              'WENN w2 >= 5000 DANN',
              '  AUSGABE 0',
              'SONST',
              '  AUSGABE 495',
              'ENDE WENN'
            ],
            [
              'FUNKTION versandInCent(warenwert)',
              '  WENN warenwert >= 5000 DANN',
              '    GIB ZURÜCK 0',
              '  ENDE WENN',
              '  GIB ZURÜCK 495',
              'ENDE FUNKTION',
              'AUSGABE versandInCent(3998)',
              'AUSGABE versandInCent(6200)'
            ]
          ], { a: 1, expect: '495\n0' }, 'Wo musst du ändern, wenn die Versandgrenze auf 60 Euro steigt?', 'Die Funktion kapselt die Versandregel als eigenen Baustein an genau einer Stelle. Die erste Variante kopiert die Regel und erzeugt technische Schulden.')
        ]
      },

      /* ---------- 3. Der Lebenszyklus ---------- */
      {
        id: 'sdlc', standalone: true, domain: 'shop', stage: 2,
        title: 'Der Software-Lebenszyklus (SDLC)',
        goal: 'Du ordnest die sechs SDLC-Phasen am Onlineshop-Projekt ein, unterscheidest Lasten- und Pflichtenheft, kennst die vier Teststufen und vergleichst Wasserfall mit Scrum.',
        terms: ['SDLC', 'Lastenheft', 'Pflichtenheft', 'Wasserfallmodell', 'Scrum', ['Unit-Test (Modultest)', 'Unit-Test']],
        parts: [
          A.text('Ein fester Fahrplan für unser Shop-Projekt', 'Ein mittelständischer Händler beauftragt dein Entwicklerteam mit dem **Onlineshop für IT-Zubehör**. Damit nichts vergessen wird, durchläuft das Projekt sechs feste Phasen – den **Software Development Life Cycle (SDLC)**:'),
          A.table(['Phase', 'Leitfrage', 'Konkretes Ergebnis im Shop-Projekt'], [
            ['1. **Anforderungsanalyse**', 'Was soll der Shop können?', 'Lastenheft des Händlers, Pflichtenheft des Teams'],
            ['2. **Entwurf & Modellierung**', 'Wie bauen wir ihn technisch auf?', 'Use-Case-, Aktivitäts-, Klassen- und ER-Diagramm'],
            ['3. **Implementierung**', 'Wie setzen wir das in Code um?', 'Java-/Python-Klassen, SQL-Tabellen, Unit-Tests'],
            ['4. **Test**', 'Funktioniert alles wie vereinbart?', 'Unit-, Integrations-, System- und Abnahmetest'],
            ['5. **Deployment**', 'Wie kommt der Shop online?', 'Live-Schaltung auf dem Server, Betriebshandbuch'],
            ['6. **Wartung**', 'Wie bleibt er aktuell und sicher?', 'Bugfixes, neue Zahlungsarten (zurück zu Phase 1)']
          ], 'Die sechs Phasen des SDLC'),
          A.table(['Dokument', 'Wer schreibt es?', 'Beispiel aus unserem Shop'], [
            ['**Lastenheft**', 'der **Auftraggeber** (Shop-Betreiber)', '„Kunden sollen Artikel in den Warenkorb legen; ab 50 € ist der Versand kostenlos.“ (**Was** und **Wofür**?)'],
            ['**Pflichtenheft**', 'der **Auftragnehmer** (IT-Dienstleister)', '„Umsetzung als Web-App mit 3-Schicht-Architektur, Preise als `long` in Cent, SQL-Datenbank.“ (**Wie** und **Womit**?)']
          ], 'Lastenheft und Pflichtenheft', 'Das Pflichtenheft wird nach Prüfung und Unterschrift **Vertragsbestandteil**.'),
          A.tip('Merkhilfe: Im **L**astenheft steht die **L**ast (die Wünsche) des Auftraggebers. Im **P**flichtenheft stehen die **P**flichten des Auftragnehmers.'),
          A.table(['Teststufe', 'Was wird im Shop geprüft?', 'Wer testet?'], [
            ['**Unit-Test** (Modultest)', 'eine einzelne Methode für sich, z. B. `rabattInCent(10000) == 1000`', 'Entwickler (automatisiert)'],
            ['**Integrationstest**', 'Zusammenspiel mehrerer Teile, z. B. `Warenkorb` + Datenbank', 'Entwickler / Testteam'],
            ['**Systemtest**', 'der komplette Shop gegen alle Anforderungen aus dem Pflichtenheft', 'Testteam (QA)'],
            ['**Abnahmetest** (Akzeptanztest)', 'erfüllt der fertige Shop den Vertrag?', 'Auftraggeber (Kunde)']
          ], 'Die vier Teststufen in Phase 4'),
          A.table(['', 'Wasserfallmodell (klassisch)', 'Agil (z. B. Scrum)'], [
            ['Ablauf', 'Phasen streng nacheinander, jede wird abgenommen', 'kurze **Sprints** (1–4 Wochen), jeder liefert ein lauffähiges Stück Shop'],
            ['Änderungen', 'nach Phasenbeginn teuer und schwer', 'ausdrücklich möglich, kommen ins Backlog für den nächsten Sprint'],
            ['Kunde', 'vor allem am Anfang (Lastenheft) und Ende (Abnahme)', 'nach jedem Sprint beim Review eingebunden'],
            ['Wann sinnvoll?', 'Anforderungen stehen von Anfang an fest (z. B. behördliche Vorgaben)', 'Anforderungen entwickeln sich weiter (z. B. neuer Onlineshop)']
          ], 'Wasserfallmodell vs. Scrum'),
          A.table(['Weiterlesen', 'Passender Kurs'], [
            ['Testfälle, Grenzwerte und JUnit-Tests', '[AP2: Testen: Testfälle, Grenzwerte, Unit-Tests](/code-lernen/kurs/ap2/testen/)']
          ], 'Vertiefung in AP2')
        ],
        quiz: [
          A.q('In welcher SDLC-Phase entstehen Klassendiagramm und Datenbankmodell?', ['Entwurf und Modellierung', 'Anforderungsanalyse beim Kunden', 'System- und Abnahmetest', 'Deployment und Wartung'], 0, 'Erst klärt Phase 1 das Was, danach plant Phase 2 den technischen Aufbau.'),
          A.q('Wer verfasst das Pflichtenheft?', ['Der Auftragnehmer (Entwicklungsteam)', 'Der Auftraggeber (Kunde)', 'Die Endkunden des Onlineshops', 'Ein externer Wirtschaftsprüfer'], 0, 'Der Auftraggeber schreibt das Lastenheft (Was), der Auftragnehmer antwortet mit dem Pflichtenheft (Wie).'),
          A.q('Welche Teststufe prüft, ob `Warenkorb` und SQL-Datenbank korrekt zusammenarbeiten?', ['Integrationstest', 'Unit-Test', 'Abnahmetest', 'Black-Box-Syntaxtest'], 0, 'Einzelne Methode = Unit-Test. Zusammenspiel mehrerer Komponenten = Integrationstest.'),
          A.q('Der Shop-Betreiber will nach jeder zweiten Woche neue Funktionen testen und Wünsche anpassen. Welches Vorgehen passt?', ['Scrum (agiles Vorgehen)', 'Strenges Wasserfallmodell', 'Code-and-Fix ohne Planung', 'Erst nach einem Jahr testen'], 0, 'Scrum arbeitet in kurzen Sprints mit regelmäßiger Kundenrückmeldung.')
        ],
        tasks: [
          A.fill('Wie heißt das Dokument, in dem der Auftraggeber beschreibt, **was** der Shop leisten soll?', '{{Lastenheft}}', 'Das Gegenstück zum Pflichtenheft des Auftragnehmers.'),
          A.fill('Welche Teststufe führt am Ende der Auftraggeber durch, um den Vertrag abzunehmen?', '{{Abnahmetest|Akzeptanztest}}', 'Beginnt mit Abnahme… oder Akzeptanz….'),
          A.fill('In agilen Projekten nach Scrum heißen die kurzen, festen Entwicklungsabschnitte (1–4 Wochen) ...', '{{Sprints|Sprint}}', 'Englisches Wort aus dem Laufsport.')
        ]
      },

      /* ---------- 4. Anforderungen ---------- */
      {
        id: 'anforderungen', standalone: true, domain: 'shop', stage: 2,
        title: 'Anforderungen erfassen: vom Kundenwunsch zur User Story',
        goal: 'Du trennst funktionale und nicht-funktionale Anforderungen am Onlineshop, formulierst prüfbare Messwerte, schreibst User Stories und erkennst Scope Creep.',
        terms: ['Funktionale Anforderung', 'Nicht-funktionale Anforderung', 'User Story', 'Scope Creep'],
        parts: [
          A.text('Gute Anforderungen sind messbar', 'Im Kick-off-Gespräch sagt der Shop-Betreiber: „Der Shop soll schnell sein, sicher sein und natürlich Artikel verkaufen.“ Damit kann kein Entwickler arbeiten und kein Tester prüfen. Gute Anforderungen sind **eindeutig**, **prüfbar** und **vollständig** – und sie trennen klar zwischen dem **Was** und dem **Wie gut**.'),
          A.table(['', 'Funktionale Anforderung', 'Nicht-funktionale Anforderung'], [
            ['Leitfrage', '**Was** soll der Shop tun?', '**Wie gut** muss er es tun?'],
            ['Beispiel 1 (Shop)', 'Kunden können Artikel in den Warenkorb legen und Mengen ändern.', 'Die Artikelsuche liefert bei 10 000 Artikeln in unter 0,5 Sekunden ein Ergebnis.'],
            ['Beispiel 2 (Login)', 'Nach 3 falschen Passwörtern wird das Benutzerkonto gesperrt.', 'Passwörter werden ausschließlich gesalzen und mit Argon2 gehasht gespeichert.'],
            ['Kategorien', 'Funktionen, Berechnungen, Eingaben, Ausgaben', 'Leistung, Sicherheit, Verfügbarkeit (z. B. 99,9 %), Bedienbarkeit, Wartbarkeit']
          ], 'Funktional vs. nicht-funktional'),
          A.table(['Schwammig (nicht prüfbar)', 'Messbar & prüfbar (IHK-reif)'], [
            ['„Der Shop soll schnell laden.“', '„Die Produktseite lädt bei 500 gleichzeitigen Nutzern in höchstens 2 Sekunden.“'],
            ['„Der Shop soll immer erreichbar sein.“', '„Die Verfügbarkeit beträgt mindestens 99,5 % im Jahresmittel.“'],
            ['„Der Checkout soll sicher sein.“', '„Alle Bestelldaten werden über TLS 1.3 verschlüsselt übertragen.“']
          ], 'Schwammige Wünsche prüfbar umschreiben', 'In AP1 und AP2 wird sehr oft verlangt, eine unklare Anforderung messbar zu machen.'),
          A.text('User Stories im Shop-Backlog', 'In agilen Teams werden funktionale Anforderungen als **User Story** notiert – immer nach dem Muster **Rolle – Ziel – Nutzen**:\n\n- „Als **Kunde** möchte ich **einen Rabattcode im Checkout eingeben**, damit **ich bei Aktionen Geld spare**.“\n- „Als **Lagerist** möchte ich **Artikel mit Bestand 0 hervorgehoben sehen**, damit **ich rechtzeitig nachbestelle**.“\n\nSo versteht jeder Entwickler sofort, **für wen** und **warum** er eine Funktion baut.'),
          A.text('Gefahr Scope Creep', 'Mitten im zweiten Sprint ruft der Auftraggeber an: „Können wir noch schnell ein Bonusprogramm, einen Live-Chat und eine App dazubauen?“ Wer solche ungeplanten Wünsche ohne Anpassung von Zeit und Budget übernimmt, gerät in **Scope Creep** (schleichende Ausweitung des Projektumfangs). Gegenmittel: Jede neue Anforderung wird dokumentiert, geschätzt und erst nach Freigabe eingeplant.'),
          A.text('Vom Text zum Bild', 'Lange Anforderungslisten sind genau, aber schwer zu überblicken. Im nächsten Schritt übersetzen wir die Shop-Anforderungen in ein **Anwendungsfalldiagramm (Use-Case)** – auf einen Blick sichtbar, wer im Shop was tun darf.')
        ],
        tips: [
          A.tip('Prüfe jede Anforderung mit der Frage: „Wie würde ein Tester sie mit Ja/Nein abhaken?“ Fehlt eine Zahl, Zeitgrenze oder klare Bedingung, ist sie noch zu schwammig.')
        ],
        quiz: [
          A.q('„Die Produktseite lädt in höchstens 1,5 Sekunden.“ Welche Art von Anforderung ist das?', ['Nicht-funktionale Anforderung', 'Funktionale Anforderung', 'Eine User Story', 'Ein Anwendungsfall'], 0, 'Sie beschreibt keine Funktion, sondern die Leistungsqualität (wie schnell).'),
          A.q('„Ab 50 Euro Warenwert entfallen die Versandkosten.“ Welche Art von Anforderung ist das?', ['Funktionale Anforderung', 'Nicht-funktionale Anforderung', 'Ein Vorgehensmodell', 'Ein Abnahmekriterium für Hardware'], 0, 'Das ist eine fachliche Berechnung bzw. Funktion des Shops.'),
          A.q('Was bezeichnet Scope Creep in einem Softwareprojekt?', ['Die schleichende, ungeplante Ausweitung des Projektumfangs', 'Das bewusste Streichen unwichtiger Funktionen vor dem Start', 'Einen Fehler beim Gültigkeitsbereich lokaler Variablen', 'Die schrittweise Erhöhung der Testabdeckung in Sprints'], 0, 'Immer neue Sonderwünsche während der Umsetzung ohne Zeit- und Budgetanpassung.'),
          A.q('Welche Anforderung ist wirklich prüfbar formuliert?', ['Die Suche findet unter 10 000 Artikeln in unter 1 Sekunde Treffer', 'Die Suche soll auch bei vielen Artikeln angenehm schnell sein', 'Der Warenkorb soll modern und übersichtlich gestaltet werden', 'Das System soll für alle Kunden möglichst sicher laufen'], 0, 'Nur die erste nennt konkrete, messbare Zahlen (10 000 Artikel, unter 1 Sekunde).')
        ],
        tasks: [
          A.fill('Ergänze das fehlende Wort für den Nutzen einer User Story.', 'Als Kunde möchte ich meine Bestellungen einsehen, {{damit}} ich den Lieferstatus prüfen kann.', 'Das dreiteilige Muster lautet: Als [Rolle] möchte ich [Ziel], … [Nutzen].'),
          A.fill('Ordne ein: „Das System ist zu 99,9 % im Jahr verfügbar.“ → {{nicht-funktionale|nicht-funktional}} Anforderung.', '{{nicht-funktionale|nicht-funktional}}', 'Verfügbarkeit beschreibt die Qualität, nicht eine einzelne Funktion.'),
          A.fill('Wie heißt die ungeplante Ausweitung des Projektumfangs während der Entwicklung? (2 englische Wörter)', '{{Scope Creep}}', 'Scope = Umfang, Creep = schleichen.')
        ]
      },

      /* ---------- 5. Anwendungsfalldiagramm ---------- */
      {
        id: 'usecase', standalone: true, domain: 'shop', stage: 3,
        title: 'Das Anwendungsfalldiagramm (Use-Case) am Onlineshop',
        goal: 'Du modellierst Akteure, Systemgrenze und Anwendungsfälle für den Onlineshop, setzt «include», «extend» und Generalisierung fehlerfrei ein und vermeidest typische Prüfungsfehler.',
        terms: [['Anwendungsfalldiagramm (Use Case)', 'Anwendungsfalldiagramm', 'Use-Case'], 'Akteur', 'Systemgrenze', ['include (UML)', 'include'], ['extend (UML)', 'extend']],
        parts: [
          A.text('Was es zeigt – und was ausdrücklich nicht', 'Das **Anwendungsfalldiagramm (Use-Case)** fasst unsere Shop-Anforderungen als Bild zusammen: **Wer** (Akteure außen) kann **was** (Anwendungsfälle innen) mit dem System tun?\n\nWichtigste Regel für die Prüfung: Es ist **kein Ablaufplan**! Es zeigt keine Reihenfolge, keine Schleifen und kein „erst A, dann B“. Abläufe gehören in die nächste Lektion (Aktivitätsdiagramm).'),
          A.table(['Element', 'Darstellung', 'Regel für die Prüfung'], [
            ['**Akteur**', 'Strichmännchen außerhalb', 'eine **Rolle** (Mensch oder externes System wie Zahlungsdienst), keine Einzelperson'],
            ['**Anwendungsfall**', 'Oval innerhalb', 'immer **Substantiv + Verb**: „Bestellung aufgeben“, „Artikel suchen“'],
            ['**Systemgrenze**', 'Rechteck mit Systemname', 'Anwendungsfälle drinnen, Akteure immer draußen'],
            ['**Assoziation**', 'durchgezogene Linie', 'Akteur ist an diesem Anwendungsfall beteiligt'],
            ['**Generalisierung**', 'durchgezogene Linie + leeres Dreieck', 'Vererbung bei Akteuren (Stammkunde → Gast) oder Fällen'],
            ['**«include»**', 'gestrichelter Pfeil **zum** Hilfsfall', 'Pflicht: läuft **immer** mit'],
            ['**«extend»**', 'gestrichelter Pfeil **zurück zum** Basisfall', 'optional: nur **unter einer Bedingung** (als Notiz angeben)']
          ], 'Die Bausteine des Use-Case-Diagramms'),
          A.usecase({ system: 'Onlineshop', actors: [{ id: 'g', name: 'Gast', side: 'l', row: 0 }, { id: 'k', name: 'Kunde', side: 'l', row: 1.5 }, { id: 'zd', name: 'Zahlungsdienst', side: 'r', row: 1.5 }], cases: [{ id: 'as', name: 'Artikel suchen', row: 0, col: 0 }, { id: 'ba', name: 'Bestellung aufgeben', row: 1.5, col: 0 }, { id: 'ap', name: 'Anmeldestatus prüfen', row: 0.5, col: 1 }, { id: 'rc', name: 'Rabattcode einlösen', row: 2.3, col: 1 }], assoc: [['g', 'as'], ['k', 'ba'], ['zd', 'ba']], gen: [['k', 'g']], include: [['ba', 'ap']], extend: [['rc', 'ba', 'Rabattcode vorhanden']] }, 'Unser Onlineshop als Anwendungsfalldiagramm', 'Schau dir jede Beziehung an:\n- **Generalisierung**: Ein `Kunde` **ist ein** `Gast` mit Extras – er erbt „Artikel suchen“ automatisch und darf zusätzlich bestellen.\n- **«include»**: „Bestellung aufgeben“ prüft **immer** den Anmeldestatus (Pfeil vom Haupt- zum Pflichtfall).\n- **«extend»**: „Rabattcode einlösen“ kommt nur **optional** dazu (Pfeil vom Zusatz zurück zum Hauptfall, Bedingung in der Notiz).\n- **Zusammenarbeit**: Das externe System `Zahlungsdienst` ist als zweiter Akteur rechts direkt mit „Bestellung aufgeben“ verbunden.'),
          A.table(['', '«include»', '«extend»'], [
            ['Bedeutung', 'Pflichtteil: läuft **immer** mit', 'Option: nur **unter einer Bedingung**'],
            ['Pfeilrichtung', 'vom Basisfall **zum** Pflichtfall', 'vom Zusatz **zurück zum** Basisfall'],
            ['Merksatz', '„Bestellen schließt Statusprüfung immer ein.“', '„Rabattcode dockt bei Bedarf am Bestellen an.“'],
            ['Weiteres Beispiel', 'Geld abheben «include» PIN prüfen', 'Beleg drucken «extend» Geld abheben']
          ], 'Prüfungs-Spickzettel: include vs. extend'),
          A.text('Zweiter häufiger Prüfungsfehler: Zwei Akteure richtig verbinden', '**Zusammenarbeit** (z. B. `Kunde` und `Zahlungsdienst` bei „Bestellung aufgeben“): **zwei getrennte Linien** zum selben Oval, **keine** Linie zwischen den Akteuren.\n**Vererbung** (z. B. `Kunde` und `Gast`): **Generalisierungspfeil** vom spezielleren zum allgemeineren Akteur – und dann keine doppelte Linie zu den geerbten Fällen.'),
          A.text('Transfer-Übung (IHK-Klassiker): Hotel-Buchungssystem', 'Prüfe dein Verständnis an einem zweiten Szenario:\n1. Jeder **Gast** kann Zimmer suchen.\n2. Ein **Registrierter Gast** erbt die Suche und kann Zimmer buchen.\n3. **Zimmer buchen** validiert **immer** die Zahlungsdaten.\n4. Optional kann eine **Versicherung** abgeschlossen werden.\n5. Ein externes **Kreditkarten-Institut** ist am Buchen beteiligt.'),
          A.usecase({ system: 'Hotel-Buchungssystem', actors: [{ id: 'g', name: 'Gast', side: 'l', row: 0 }, { id: 'rg', name: 'Registrierter Gast', side: 'l', row: 2 }, { id: 'kk', name: 'Kreditkarten-Institut', side: 'r', row: 1 }], cases: [{ id: 'zs', name: 'Zimmer suchen', row: 0, col: 0 }, { id: 'zb', name: 'Zimmer buchen', row: 1, col: 0 }, { id: 'zv', name: 'Zahlungsdaten validieren', row: 0, col: 1 }, { id: 'va', name: 'Versicherung abschließen', row: 2, col: 1 }], assoc: [['g', 'zs'], ['rg', 'zb'], ['kk', 'zb']], gen: [['rg', 'g']], include: [['zb', 'zv']], extend: [['va', 'zb', 'Rücktritt gewünscht']] }, 'Lösung: Hotel-Buchungssystem', 'Exakt dieselben vier Bausteine wie im Onlineshop: Generalisierung, include, extend mit Notiz und zweiter Akteur rechts.'),
          A.table(['Weiterlesen', 'Passender Kurs'], [
            ['Wie die fünf UML-Diagramme in der AP2 abgegrenzt werden', '[AP2: UML-Diagramme im Prüfungsvergleich](/code-lernen/kurs/ap2/uml2/)']
          ], 'Vertiefung in AP2')
        ],
        tips: [
          A.warn('Benenne Anwendungsfälle immer mit **Substantiv + Verb** („Bestellung aufgeben“), niemals als Menüpunkt („Kasse-Seite“) oder Schrittfolge („Erst einloggen, dann bestellen“).')
        ],
        quiz: [
          A.q('Wo stehen Akteure wie `Kunde` oder `Zahlungsdienst` im Use-Case-Diagramm?', ['Immer außerhalb der Systemgrenze', 'Innerhalb der Systemgrenze neben den Ovalen', 'In einer gestrichelten Notiz unten rechts', 'Direkt in der Überschrift der Systemgrenze'], 0, 'Akteure interagieren von außen mit dem System; nur Anwendungsfälle stehen drinnen.'),
          A.q('In welche Richtung zeigt der Pfeil bei «extend» („Rabattcode einlösen“ erweitert „Bestellung aufgeben“)?', ['Von „Rabattcode einlösen“ zurück zu „Bestellung aufgeben“', 'Von „Bestellung aufgeben“ hin zu „Rabattcode einlösen“', 'Vom Akteur „Kunde“ direkt zu „Rabattcode einlösen“', 'In beide Richtungen mit zwei offenen Pfeilspitzen'], 0, 'Bei extend zeigt der gestrichelte Pfeil immer vom optionalen Zusatz zurück zum Basisfall.'),
          A.q('Ein `Kunde` soll alles können, was ein `Gast` kann, plus bestellen. Wie modellierst du das?', ['Generalisierungspfeil von Kunde zu Gast, nur Bestellen an Kunde', 'Eine «include»-Linie vom Kunden zum Gast zeichnen', 'Eine Linie zwischen Kunde und Gast und beide an jeden Fall', 'Nur den Kunden zeichnen und den Gast komplett weglassen'], 0, 'Generalisierung (leeres Dreieck) vererbt alle Anwendungsfälle des Gasts an den Kunden.'),
          A.q('Ein Prüfling zeichnet Pfeile zwischen „Artikel suchen“ → „In Warenkorb legen“ → „Bezahlen“, um die Reihenfolge zu zeigen. Was ist daran falsch?', ['Use-Case-Diagramme zeigen keine zeitliche Reihenfolge', 'Pfeile zwischen Ovalen müssen immer durchgezogen sein', 'Es fehlen die Multiplizitäten 1 und * an den Ovalen', 'Man darf höchstens zwei Anwendungsfälle zeichnen'], 0, 'Ein Use-Case-Diagramm ist kein Ablaufplan. Reihenfolgen gehören ins Aktivitäts- oder Sequenzdiagramm.')
        ],
        tasks: [
          A.fill('„Bestellung aufgeben“ prüft **immer** den Anmeldestatus. Welche Beziehung? (ohne spitze Klammern)', '{{include}}', 'Pflichtteil, der bei jeder Ausführung mitläuft.'),
          A.fill('„Rabattcode einlösen“ passiert nur, wenn der Kunde einen Code hat. Welche Beziehung? (ohne spitze Klammern)', '{{extend}}', 'Optionale Erweiterung unter einer Bedingung.'),
          A.fill('Wie heißt das Rechteck, das die Anwendungsfälle umschließt und die Akteure außen lässt?', '{{Systemgrenze}}', 'Grenzt das System von seiner Umwelt ab.')
        ]
      },

      /* ---------- 6. Aktivitätsdiagramm ---------- */
      {
        id: 'aktivitaet', standalone: true, domain: 'shop', stage: 3,
        title: 'Das Aktivitätsdiagramm: Checkout-Ablauf und Parallelität',
        goal: 'Du liest und zeichnest Aktivitätsdiagramme mit Entscheidungen, Schleifen, Gabelung/Synchronisation, Partitionen und Endknoten am Onlineshop-Checkout.',
        terms: ['Aktivitätsdiagramm', 'Pfadende'],
        parts: [
          A.text('Vom Was zum Wie: der genaue Ablauf', 'Das Use-Case-Diagramm hat gezeigt, **dass** Kunden bestellen können. Jetzt zeigt das **Aktivitätsdiagramm**, **in welcher Reihenfolge** der Checkout abläuft – inklusive Verzweigungen, Login-Schleife und Aufgaben, die **gleichzeitig** passieren (Paket packen und Rechnung erstellen).'),
          A.table(['Element', 'Darstellung', 'Bedeutung'], [
            ['**Startknoten**', 'ausgefüllter schwarzer Punkt', 'Beginn des Ablaufs'],
            ['**Aktion**', 'Rechteck mit abgerundeten Ecken', 'ein einzelner Arbeitsschritt'],
            ['**Entscheidung**', 'Raute mit 1 Eingang, mehreren Ausgängen', 'entweder oder: jeder Ausgang trägt eine Bedingung in `[eckigen Klammern]`'],
            ['**Zusammenführung**', 'Raute mit mehreren Eingängen', 'alternative Wege laufen wieder zusammen'],
            ['**Gabelung (Fork)**', 'dicker Balken, mehrere Ausgänge', 'sowohl als auch: ab hier laufen Wege **parallel**'],
            ['**Synchronisation (Join)**', 'dicker Balken, mehrere Eingänge', 'weiter erst, wenn **alle** parallelen Wege fertig sind'],
            ['**Aktivitätsende**', 'Kreis mit Punkt innen', 'beendet die **gesamte** Aktivität'],
            ['**Pfadende**', 'Kreis mit X', 'beendet nur **diesen einen** Zweig'],
            ['**Partition (Schwimmbahn)**', 'Spalten/Zeilen mit Rollennamen', 'zeigt, wer welche Aktion ausführt']
          ], 'Die Bausteine des Aktivitätsdiagramms'),
          A.activity({ flow: ['Passwort eingeben', { solange: '[Passwort falsch und Versuche < 3]', tue: ['Fehlermeldung anzeigen', 'Passwort erneut eingeben'], raus: '[sonst]' }, { wenn: 'Passwort korrekt?', jl: '[ja]', nl: '[3 Fehlversuche]', ja: ['Zur Kasse weiterleiten'], nein: ['Konto sperren'] }] }, 'Schritt 1: Login-Schleife im Shop', 'Eine Schleife im Aktivitätsdiagramm besteht aus zwei Rauten: oben die Zusammenführung, unten die Entscheidung mit Bedingung in eckigen Klammern. Nach 3 Fehlversuchen wird das Konto gesperrt – exakt unsere Regel aus dem Login-Szenario.'),
          A.activity({ flow: ['Bestellung prüfen', { wenn: 'Alle Artikel auf Lager?', jl: '[ja]', nl: '[nein]', ja: ['Zahlung buchen', { parallel: [['Paket im Lager packen', 'Paket versenden'], ['Rechnung als PDF erstellen', 'Rechnung mailen']] }, 'Bestellung abschließen'], nein: ['Fehlbestand melden', { pfadende: true }] }] }, 'Schritt 2: Checkout mit Entscheidung, Parallelität und Pfadende', 'Sind alle Artikel auf Lager, laufen **Lager-Versand** und **Rechnungsversand** nach der Gabelung **gleichzeitig**. „Bestellung abschließen“ startet erst nach dem Synchronisationsbalken, wenn **beide** Stränge fertig sind. Bei Fehlbestand endet nur dieser Pfad am **Pfadende**.'),
          A.table(['Kunde', 'Onlineshop', 'Lager'], [
            ['Bestellung absenden', '', ''],
            ['', 'Lagerbestand & Zahlung prüfen', ''],
            ['', 'Rechnung erstellen & mailen (parallel)', 'Paket packen & versenden (parallel)'],
            ['Bestätigung erhalten', 'Bestellung abschließen', '']
          ], 'Partitionen (Schwimmbahnen) im Onlineshop', 'Jede Spalte gehört einer Rolle. So sieht das Team sofort, an welchen Stellen Daten zwischen Kunde, Shop-Backend und Lager übergeben werden müssen.'),
          A.table(['Weiterlesen', 'Passender Kurs'], [
            ['Aufrufe zwischen konkreten Objekten', '[Modellieren: Sequenzdiagramme](/code-lernen/kurs/oop/sequenz/)'],
            ['Zustände einer Bestellung (neu → bezahlt → versendet)', '[AP2: Zustandsdiagramm & Diagrammvergleich](/code-lernen/kurs/ap2/uml2/)']
          ], 'Verbindung zu den anderen Kursen')
        ],
        tips: [
          A.warn('**Häufiger Prüfungsfehler an Entscheidungsrauten:** Die Bedingungen an den Ausgängen müssen sich gegenseitig ausschließen und alle Fälle abdecken! Zu `[summe >= 5000]` gehört `[summe < 5000]`, nicht `[summe <= 5000]` (sonst wäre 5000 doppelt belegt).'),
          A.tip('Merksatz: **Raute = entweder oder** (genau ein Weg). **Balken = sowohl als auch** (alle Wege parallel).')
        ],
        quiz: [
          A.q('Was ist der Unterschied zwischen Aktivitätsende (Kreis mit Punkt) und Pfadende (Kreis mit X)?', ['Das Aktivitätsende stoppt den gesamten Ablauf, das Pfadende nur einen Zweig', 'Das Pfadende stoppt den gesamten Ablauf, das Aktivitätsende nur einen Zweig', 'Beide Symbole bedeuten dasselbe, das Pfadende ist nur die ältere Schreibweise', 'Das Aktivitätsende darf nur innerhalb von parallelen Balken stehen'], 0, 'Kreis mit Punkt = alles endet. Kreis mit X = nur dieser einzelne Pfad endet.'),
          A.q('Wann startet „Bestellung abschließen“ nach dem Synchronisationsbalken?', ['Erst wenn sowohl der Versand- als auch der Rechnungsstrang fertig sind', 'Sobald der schnellere der beiden parallelen Stränge am Balken ankommt', 'Noch bevor die beiden parallelen Stränge abgearbeitet werden', 'Nur wenn eine zusätzliche Entscheidungsraute den Weg freigibt'], 0, 'Synchronisation (Join) wartet immer auf alle eingehenden parallelen Pfade.'),
          A.q('An einer Entscheidung stehen die Ausgänge `[summe > 5000]` und `[summe < 5000]`. Welcher Fehler steckt darin?', ['Der Fall summe = 5000 fehlt komplett (nicht vollständig)', 'Die Bedingungen müssten in runden statt eckigen Klammern stehen', 'Ein Aktivitätsdiagramm darf keine Vergleiche mit Zahlen enthalten', 'Für Zahlenvergleiche braucht man immer einen Gabelungsbalken'], 0, 'Bei genau 5000 Cent passt kein Ausgang! Richtig wäre [summe >= 5000] und [summe < 5000].'),
          A.q('Wofür setzt man Partitionen (Schwimmbahnen) im Aktivitätsdiagramm ein?', ['Um klar zu zeigen, welche Rolle oder welches System welche Aktion ausführt', 'Um parallele Stränge wieder auf einen einzelnen Pfad zusammenzuführen', 'Um die Attribute und Methoden einer Klasse nach Sichtbarkeit zu trennen', 'Um die Anzahl der Schleifendurchläufe im Voraus festzulegen'], 0, 'Jede Schwimmbahn (Spalte/Zeile) steht für einen Verantwortlichen, z. B. Kunde, Shop, Lager.')
        ],
        tasks: [
          A.fill('Wie heißt der dicke Balken, der einen Ablauf in mehrere parallele Wege aufteilt?', '{{Gabelung|Fork|Parallelisierung}}', 'Das Gegenstück zur Synchronisation (Join).'),
          A.fill('Vervollständige die fehlende Gegenbedingung am zweiten Ausgang der Raute: `[bestand > 0]` und `[{{bestand <= 0}}]`', '{{bestand <= 0|bestand = 0}}', 'Alle übrigen Fälle müssen abgedeckt sein, ohne Lücke bei 0.'),
          A.predict('Übersetze die Login-Schleife aus dem Aktivitätsdiagramm: Was gibt dieser Pseudocode aus?', [
            'versuche <- 0',
            'SOLANGE versuche < 3',
            '  versuche <- versuche + 1',
            '  AUSGABE "Versuch", versuche, "fehlgeschlagen"',
            'ENDE SOLANGE',
            'AUSGABE "Konto gesperrt"'
          ], 'Versuch 1 fehlgeschlagen\nVersuch 2 fehlgeschlagen\nVersuch 3 fehlgeschlagen\nKonto gesperrt', 'Zähle jeden Durchlauf, solange versuche < 3 wahr ist.', 'Die Schleife läuft für versuche = 0, 1, 2 (also 3-mal) und gibt danach „Konto gesperrt“ aus.')
        ]
      },

      /* ---------- 7. PAP und Struktogramm ---------- */
      {
        id: 'pap', standalone: true, domain: 'shop', stage: 4,
        title: 'PAP und Struktogramm: vom Plan zum Pseudocode',
        goal: 'Du liest und entwirfst Sequenz, Verzweigung, kopf- und fußgesteuerte Schleifen sowie Methodenaufrufe im PAP und Struktogramm und prüfst sie direkt im Pseudocode-Interpreter.',
        terms: [['Programmablaufplan (PAP)', 'PAP', 'Programmablaufplan'], 'Struktogramm', 'Kopfgesteuerte Schleife', 'Fußgesteuerte Schleife', 'Schreibtischtest'],
        parts: [
          A.text('Der letzte Schritt vor dem echten Code', 'Vom Lastenheft über Use-Case und Aktivitätsdiagramm sind wir jetzt auf der Ebene eines einzelnen Algorithmus angelangt. Bevor du ihn in Java oder Python schreibst, zeichnest du ihn als **Programmablaufplan (PAP)** (Symbole mit Pfeilen) oder als **Struktogramm** (geschachtelte Kästen nach Nassi-Shneiderman, ohne Pfeile) – und prüfst ihn im **Pseudocode-Interpreter**.'),
          A.table(['Baustein', 'Symbol im PAP', 'Darstellung im Struktogramm'], [
            ['Start / Ende', 'Oval (abgerundetes Rechteck)', 'Anfang und Ende des gesamten Kastens'],
            ['Anweisung / Rechnung', 'Rechteck', 'einfacher rechteckiger Block'],
            ['Ein- / Ausgabe', 'Parallelogramm', 'Block mit `Eingabe:` / `Ausgabe:`'],
            ['Verzweigung (`if/else`)', 'Raute mit Ja-/Nein-Pfeil', 'Kasten mit Dreieck oben, links Ja, rechts Nein'],
            ['Schleife', 'Raute + Rückwärtspfeil nach oben', 'Kasten mit Rand links (oben = kopfgesteuert, unten = fußgesteuert)'],
            ['Methodenaufruf', 'Rechteck mit doppelten Seitenlinien', 'Block mit doppelten Seitenlinien, Methode hat eigenes Struktogramm']
          ], 'PAP und Struktogramm direkt im Vergleich'),
          A.nsd([
            'warenwert <- 3998',
            { wenn: 'warenwert >= 5000 ?', ja: ['versand <- 0'], nein: ['versand <- 495'] },
            'gesamt <- warenwert + versand',
            'Ausgabe: gesamt'
          ], 'Verzweigung im Struktogramm: Versandkosten', 'Lies von oben nach unten: Da 3998 < 5000 ist, läuft der rechte Zweig (`versand <- 495`), danach werden beide addiert (4493 Cent).'),
          A.nsd([
            'summe <- 0',
            'i <- 0',
            { solange: 'solange i < LÄNGE(preise)', tue: ['summe <- summe + preise[i]', 'i <- i + 1'] },
            'Ausgabe: summe'
          ], 'Kopfgesteuerte Schleife: Warenkorb summieren', 'Die Bedingung steht **oben**: Bei einem leeren Warenkorb (`LÄNGE = 0`) läuft der Rumpf kein einziges Mal.'),
          P([
            'preise <- [1999, 999, 3490]§Funkmaus, USB-C-Kabel und Headset in Cent.',
            'summe <- 0',
            'i <- 0',
            'SOLANGE i < LÄNGE(preise)§Kopfgesteuert: prüft vor jedem Durchlauf.',
            '  summe <- summe + preise[i]',
            '  i <- i + 1',
            'ENDE SOLANGE',
            'AUSGABE "Warenkorb:", summe, "Cent"'
          ], 'Dasselbe Struktogramm als ausführbarer Pseudocode', { praxis: 'Jeder Kasten im Struktogramm wird 1:1 zu einer Zeile Pseudocode. Klicke auf „Ablauf verfolgen“, um die Schleife live zu prüfen.' }),
          A.text('Fußgesteuerte Schleife: Eingabeprüfung im Bestellformular', 'Eine **fußgesteuerte Schleife** prüft erst **nach** dem Durchlauf – sie läuft also **mindestens einmal**. Typisch ist das Mengenfeld im Shop: Erst muss der Kunde etwas eingeben, dann prüft das Programm, ob die Menge positiv ist.\n\n**Wichtige Prüfungsfalle:** Im PAP und Struktogramm steht oft die **Durchführungsbedingung** (`solange menge <= 0` → wiederhole, solange ungültig). Im Pseudocode `WIEDERHOLE … BIS` steht die **Abbruchbedingung** (`BIS menge > 0` → stoppe, sobald gültig). Beide meinen dieselbe Schleife – nur umgedreht!'),
          A.nsd([{ wiederhole: ['Eingabe: menge'], bis: 'solange menge <= 0' }, 'Ausgabe: „Menge übernommen“'], 'Fußgesteuert im Struktogramm (Durchführungsbedingung)'),
          P([
            'WIEDERHOLE§Fußgesteuert: läuft mindestens einmal.',
            '  LIES menge§Kunde tippt im Bestellformular eine Menge ein.',
            'BIS menge > 0§Abbruchbedingung: erst bei positiver Menge geht es weiter.',
            'SCHREIBE "Menge übernommen:", menge'
          ], 'Dieselbe Eingabeprüfung als Pseudocode (Abbruchbedingung)', { input: ['0', '-2', '3'], praxis: 'Bestellformulare, PIN-Eingaben und Konsolenmenüs nutzen genau dieses Muster: erst fragen, dann prüfen.' }),
          A.nsd(['summe <- 4790', { aufruf: 'versand <- versandInCent(summe)' }, 'Ausgabe: summe + versand'], 'Hauptprogramm mit Unterprogramm-Aufruf (doppelte Seitenlinien)'),
          P([
            'FUNKTION versandInCent(warenwert)§Eigenes Unterprogramm: einmal geplant, überall nutzbar.',
            '  WENN warenwert >= 5000 DANN',
            '    GIB ZURÜCK 0',
            '  ENDE WENN',
            '  GIB ZURÜCK 495',
            'ENDE FUNKTION',
            'summe <- 4790§Hauptprogramm startet hier.',
            'versand <- versandInCent(summe)§Entspricht dem Kasten mit doppelten Seitenlinien.',
            'AUSGABE "Gesamt:", summe + versand, "Cent"'
          ], 'Unterprogramm-Aufruf im Pseudocode', { praxis: 'Genau hier endet PSS und beginnt der eigentliche Code: Aus diesem Pseudocode entstehen direkt die Module in Java und Python.' }),
          A.table(['Nächster Schritt im Lernpfad', 'Passender Kurs'], [
            ['Schreibtischtest & Fehlersuche in Pseudocode', '[Pseudocode: Schreibtischtest und Fehlersuche](/code-lernen/kurs/pseudo/schreibtisch/)'],
            ['AP2-Prüfungsaufgaben zu Struktogramm & PAP', '[AP2: Struktogramm & PAP – Prüfungsvertiefung](/code-lernen/kurs/ap2/struktogramm/)'],
            ['Dasselbe Shop-Projekt in Java oder Python', '[Java, Modul 1](/code-lernen/kurs/java/hello/) und [Python, Modul 1](/code-lernen/kurs/python/hello/)']
          ], 'Von der Planung direkt in den Code')
        ],
        tips: [
          A.warn('Achte bei `WIEDERHOLE … BIS` immer darauf, ob nach der **Durchführungsbedingung** („solange falsch“) oder der **Abbruchbedingung** („bis richtig“) gefragt ist.')
        ],
        quiz: [
          A.q('Welche Schleifenart läuft garantiert mindestens einmal?', ['Fußgesteuerte Schleife', 'Kopfgesteuerte Schleife', 'Zählschleife mit Start > Ende', 'Keine Schleife läuft garantiert'], 0, 'Die fußgesteuerte Schleife prüft erst am Ende des Rumpfs.'),
          A.q('Im Struktogramm steht unten `solange menge <= 0`. Wie lautet die passende **Abbruchbedingung** in `WIEDERHOLE … BIS`?', ['BIS menge > 0', 'BIS menge <= 0', 'BIS menge < 0', 'BIS menge = 0'], 0, 'Das Gegenteil von „kleiner gleich 0“ ist „größer als 0“.'),
          A.q('Welches PAP-Symbol steht für den Aufruf einer Methode (Unterprogramm)?', ['Rechteck mit doppelten senkrechten Seitenlinien', 'Parallelogramm mit schrägen Seitenlinien', 'Raute mit zwei beschrifteten Ausgängen', 'Abgerundetes Rechteck (Oval)'], 0, 'Doppelte Seitenlinien zeigen einen Unterprogrammaufruf; Parallelogramm ist Ein-/Ausgabe.'),
          A.q('Der Warenkorb ist leer (`LÄNGE(preise) = 0`). Wie oft läuft `SOLANGE i < LÄNGE(preise)` (mit `i = 0`)?', ['Keinmal (0 Durchläufe)', 'Genau einmal (1 Durchlauf)', 'Zweimal (2 Durchläufe)', 'Endlos viele Durchläufe'], 0, 'Kopfgesteuert: 0 < 0 ist sofort falsch, der Rumpf wird übersprungen.')
        ],
        tasks: [
          A.desk('Schreibtischtest zum Warenkorb-Struktogramm: Trage i und summe nach jedem Durchlauf ein.', 'pseudo', [
            'preise <- [1999, 999, 3490]',
            'summe <- 0',
            'i <- 0',
            'SOLANGE i < LÄNGE(preise)',
            '  summe <- summe + preise[i]',
            '  i <- i + 1',
            '  AUSGABE i, summe',
            'ENDE SOLANGE'
          ], { at: 6, cols: ['i', 'summe'] }, 'Addiere in jedem Durchlauf den nächsten Preis zur bisherigen Summe.', 'Durchlauf 1: i=1, summe=1999; Durchlauf 2: i=2, summe=2998; Durchlauf 3: i=3, summe=6488.'),
          A.predict('Übersetze das Versand-Struktogramm für einen Warenwert von genau 5000 Cent: Was wird ausgegeben?', [
            'warenwert <- 5000',
            'WENN warenwert >= 5000 DANN',
            '  versand <- 0',
            'SONST',
            '  versand <- 495',
            'ENDE WENN',
            'AUSGABE warenwert + versand'
          ], '5000', 'Prüfe den Grenzwert 5000 genau gegen >= 5000.', '5000 >= 5000 ist WAHR, also versand = 0 und Ausgabe 5000.'),
          A.bug('Shop-Struktogramm als Pseudocode: Die Warenkorb-Summe bleibt endlos stecken bzw. bricht ab, weil der Schleifenzähler vergessen wurde. Korrigiere die fehlerhafte Zeile.', 'pseudo', [
            'preise <- [1999, 999]',
            'summe <- 0',
            'i <- 0',
            'SOLANGE i < LÄNGE(preise)',
            '  summe <- summe + preise[i]',
            '  i <- i - 1',
            'ENDE SOLANGE',
            'AUSGABE summe'
          ], { line: 5, kind: 'laufzeit', fixes: [
            'i <- i + 1',
            'i <- 0',
            'i <- i + 2',
            'summe <- summe + 1'
          ], expect: '2998' }, 'In welche Richtung muss der Index i laufen, um alle Elemente 0 und 1 zu besuchen?', 'Mit i - 1 wird i negativ (-1), was beim nächsten Zugriff preise[-1] zu einem Indexfehler führt. Richtig ist i <- i + 1.')
        ]
      }
    ]
  });
})();
