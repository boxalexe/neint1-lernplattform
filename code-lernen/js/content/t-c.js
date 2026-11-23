/* Kurs: C – 11 Praxis-Module (Onlineshop, Login, Ticketsystem): von printf bis struct, Zeiger, malloc/free, Clean Code & Bug-Arena */
(function () {
  'use strict';
  const A = window.Academy, C = (lines, h, o) => A.code('c', lines, h, o);
  const PP = (prompt, code, ans, hint, expl) => Object.assign(A.predict(prompt, code, ans, hint, expl), { lang: 'c' });
  A.moved['c-ops'] = 'c-vars'; // „Rechnen und Vergleichen“ ist in Modul 2 und 3 aufgegangen

  A.track({
    id: 'c', title: 'C', tag: 'C',
    desc: 'Die Sprache nahe an der Hardware am Onlineshop- und Ticketsystem-Beispiel: printf, Datentypen, Funktionen, Arrays, struct, Fehlercodes, Zeiger, malloc/free, Clean Code und Bug-Arena.',
    intro: 'C ist klein, extrem schnell und läuft direkt auf der Hardware – in Betriebssystemen, Routern, Kassenterminals und Mikrocontrollern. Es gibt **keine Klassen** und keine automatische Speicherverwaltung: Du arbeitest direkt mit `struct`, Adressen und Speicher. Wer C versteht, versteht, was in Java, Python oder C# unter der Haube passiert.\n\nZum Übersetzen brauchst du z. B. **gcc** (`gcc -Wall main.c -o main`, starten: `./main`). Schalte immer `-Wall` ein – der Compiler warnt dich damit früh vor typischen C-Fallen.',
    lessons: [
      /* ---------- 1. Erstes Programm ---------- */
      {
        concept: 'hello', standalone: true, domain: 'shop', stage: 1,
        title: 'Das erste Programm: eine Bestellbestätigung',
        goal: 'Du schreibst ein lauffähiges C-Programm mit #include <stdio.h>, main und printf, setzt Zeilenumbrüche mit \\n und weißt, was Compiler und Linker tun.',
        terms: ['Quellcode', 'Compiler', 'Linker', 'Syntaxfehler'],
        parts: [
          A.text('Direkt auf die Maschine', 'C übersetzt deinen **Quellcode** über **Compiler** und **Linker** vor dem Start direkt in ausführbaren Maschinencode – fehlt etwa ein Semikolon, stoppt der Compiler sofort mit einem **Syntaxfehler**. Durch alle Module zieht sich unser **Onlineshop** – hier so schlank wie auf einem echten Kassenterminal.'),
          C([
            '#include <stdio.h>§Bindet printf ein. Ohne diese Zeile kennt C keine Ausgabe.',
            'int main(void) {§Hier startet jedes C-Programm. Rückgabewert int ist der Exit-Code.',
            '    printf("Vielen Dank fuer deine Bestellung!\\n");§\\n macht den Zeilenumbruch – C setzt keinen automatisch!',
            '    printf("Bestellnummer: %d\\n", 10427);§%d ist der Platzhalter für eine ganze Zahl.',
            '    return 0;§0 meldet dem Betriebssystem: alles erfolgreich beendet.',
            '}'
          ], 'Die Bestellbestätigung in C', { praxis: 'Kassensysteme, Bondrucker und Embedded-Scanner laufen oft in C: winziger Speicherverbrauch, null Overhead, Ausgabe über printf oder serielle Schnittstellen.' }),
          A.table(['', 'C', 'Java', 'Python'], [
            ['Ausgabe', '`printf("Hallo\\n");`', '`System.out.println("Hallo");`', '`print("Hallo")`'],
            ['Zeilenumbruch', 'manuell mit `\\n`', 'automatisch bei `println`', 'automatisch bei `print`'],
            ['Übersetzung', 'Compiler + Linker → Maschinencode', 'Compiler → Bytecode → JVM', 'Interpreter']
          ], 'Dasselbe in Java und Python', 'Weiter zum Vergleich: [Java, Modul 1](/code-lernen/kurs/java/hello/) und [Python, Modul 1](/code-lernen/kurs/python/hello/).')
        ],
        tips: [
          A.warn('Vergiss nie `\\n` am Ende von `printf` – sonst klebt die nächste Ausgabe direkt dahinter. Und `return 0;` am Ende von `main` signalisiert „kein Fehler“.')
        ],
        quiz: [
          A.q('Wofür steht `\\n` in `printf("Fertig\\n");`?', ['Für einen Zeilenumbruch', 'Für das Ende des Programms', 'Für die Zahl Null', 'Für einen Tabulator'], 0, 'C hängt keinen automatischen Zeilenumbruch an.'),
          A.q('Was bedeutet `return 0;` am Ende von `main()`?', ['Das Programm wurde ohne Fehler beendet', 'Das Programm hat 0 Zeilen ausgegeben', 'Der Speicher wird gelöscht und neu gestartet', 'Es ist ein Syntaxfehler aufgetreten'], 0, 'Exit-Code 0 heißt Erfolg; Werte ungleich 0 melden Fehler ans Betriebssystem.'),
          A.q('Welche Aufgabe hat der Linker nach dem C-Compiler?', ['Verbindet Objektdateien und Bibliotheken zur ausführbaren Datei', 'Führt den geschriebenen Quellcode Zeile für Zeile direkt aus', 'Fügt vergessene Semikolons vor dem Start automatisch ein', 'Startet den Debugger vor jeder einzelnen Ausgabezeile'], 0, 'Compiler erzeugt Objektdateien, der Linker baut daraus die fertige Binärdatei.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['printf("Bestellung 10427\\n");', 'printf("Versand: ");', 'printf("frei\\n");'], 'Bestellung 10427\nVersand: frei', 'Nur \\n erzeugt einen Zeilenumbruch.', 'Nach 10427 folgt ein Umbruch; „Versand: “ und „frei“ stehen in derselben Zeile.'),
          A.fill('Binde die Standard-Ein-/Ausgabe für `printf` ein.', '#include <{{stdio.h}}>', 'Header-Datei für Standard Input/Output.'),
          A.bug('Shop: Das Programm lässt sich nicht übersetzen (Syntaxfehler).', 'c', [
            'printf("Vielen Dank!\\n");',
            'printf("Bestellnummer: 10427\\n")',
            'printf("Versand: frei\\n");'
          ], { line: 1, kind: 'syntax', fixes: [
            'printf("Bestellnummer: 10427\\n");',
            'printf("Bestellnummer: 10427\\n"):',
            'print("Bestellnummer: 10427\\n");',
            'printf["Bestellnummer: 10427\\n"];'
          ], expect: 'Vielen Dank!\nBestellnummer: 10427\nVersand: frei' }, 'Womit endet jede Anweisung in C?', 'In Zeile 2 fehlt das Semikolon.')
        ]
      },

      /* ---------- 2. Variablen, Datentypen, Rechnen ---------- */
      {
        concept: 'vars', standalone: true, domain: 'shop', stage: 1,
        title: 'Variablen, Datentypen und Rechnen: Preise, Mengen, Platzhalter',
        goal: 'Du legst Variablen mit Startwert an, nutzt printf-Platzhalter (%d, %ld, %.2f, %c), rechnest mit Ganzzahl-Division und Modulo und kennst 0 als falsch in C.',
        terms: ['Variable', 'Datentyp', 'Konstante', 'Modulo', ['Cast (Typumwandlung)', 'Cast']],
        parts: [
          A.text('Immer initialisieren – sonst Zufallsmüll', 'In C hat eine nicht initialisierte **Variable** (`int menge;`) **keinen** Standardwert 0 – sie enthält beliebigen Datenmüll aus dem Arbeitsspeicher! Gib jeder Variable sofort einen Startwert. Geldbeträge rechnest du auch in C als ganze Zahl in Cent (`int` oder `long`).'),
          C([
            'int preisInCent = 1999;§Ganze Zahl in Cent.',
            'int menge = 2;',
            'const int VERSAND_IN_CENT = 495;§Konstante: darf nicht verändert werden.',
            'menge = menge + 1;§Jetzt 3.',
            'int summe = preisInCent * menge;',
            'int euro = summe / 100;§Ganzzahl-Division: 5997 / 100 = 59.',
            'int cent = summe % 100;§Modulo (%): Rest 97.',
            'printf("Summe: %d,%02d Euro\\n", euro, cent);§%02d formatiert zweistellig (z. B. 05 statt 5).',
            'double schnitt = (double)17 / 4;§Cast auf double: 4.25 statt ganzzahlig 4.',
            'printf("Bewertung: %.2f\\n", schnitt);§%.2f zeigt 2 Nachkommastellen.'
          ], 'Variablen, Platzhalter und Modulo in C', { praxis: 'Formatstrings wie %d und %02d stecken in fast jeder C-Logzeile und in jedem Bondrucker-Layout.' }),
          A.table(['Platzhalter', 'Datentyp', 'Beispiel'], [
            ['`%d`', '`int` (ganze Zahl)', '`printf("%d", 1999);`'],
            ['`%ld`', '`long` (große ganze Zahl)', '`printf("%ld", 22900L);`'],
            ['`%.2f`', '`double` (2 Nachkommastellen)', '`printf("%.2f", 19.99);`'],
            ['`%c`', '`char` (ein Zeichen)', '`printf("%c", \'A\');`'],
            ['`%s`', '`char[]` (Zeichenkette)', '`printf("%s", "Funkmaus");`']
          ], 'Die wichtigsten printf-Platzhalter', 'Wahrheitswerte: In C ist **0 falsch** und **jede Zahl ungleich 0 wahr** (mit `#include <stdbool.h>` gibt es `bool`, `true` = 1, `false` = 0).')
        ],
        tips: [
          A.warn('`scanf("%d", &menge);` braucht das **`&`** (Adresse der Variable), damit `scanf` den eingelesenen Wert hineinschreiben kann!')
        ],
        quiz: [
          A.q('Was steht in C in `int menge;` ohne zugewiesenen Startwert?', ['Unvorhersehbarer Zufallsmüll aus dem Speicher', 'Immer automatisch der Wert 0', 'Der spezielle Wert null', 'Der Compiler weist automatisch 1 zu'], 0, 'C nullt lokale Variablen nicht automatisch – immer sofort initialisieren!'),
          A.q('Welcher Platzhalter gehört in `printf` zu einem `int`?', ['%d', '%f', '%c', '%s'], 0, '%d = decimal integer, %f = float/double, %c = char, %s = string.'),
          A.q('Welcher Zahlenwert gilt in C als „falsch“ (false)?', ['0', '-1', '1', '255'], 0, '0 ist falsch, jeder Wert ungleich 0 gilt als wahr.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['int summe = 22905;', 'printf("%d %d\\n", summe / 100, summe % 100);'], '229 5', 'Ganzzahl-Division liefert Euro, % liefert Rest-Cent.', '22905 / 100 = 229, Rest 5.'),
          A.fill('Ergänze den Platzhalter für den Preis in Cent (`int`).', 'printf("Preis: {{%d}} Cent\\n", 1999);', 'Platzhalter für ganze Zahlen in printf.'),
          A.bug('Bewertung: Bei 17 Sternen aus 4 Bewertungen zeigt C 4.00 statt 4.25.', 'c', [
            'int summe = 17;',
            'int anzahl = 4;',
            'double schnitt = summe / anzahl;',
            'printf("%.2f\\n", schnitt);'
          ], { line: 2, kind: 'logik', fixes: [
            'double schnitt = (double)summe / anzahl;',
            'double schnitt = (double)(summe / anzahl);',
            'int schnitt = summe / anzahl;',
            'double schnitt = summe % anzahl;'
          ], expect: '4.25' }, 'Welchen Typ haben summe und anzahl bei der Division?', 'Erst der Cast (double) vor summe macht daraus eine Kommazahl-Division.')
        ]
      },

      /* ---------- 3. Verzweigungen ---------- */
      {
        concept: 'cond', standalone: true, domain: 'shop', stage: 1,
        title: 'Verzweigungen: Versandkosten, Login-Sperre und switch',
        goal: 'Du steuerst Entscheidungen mit if/else if/else, switch und &&/||/!, erkennst die gefährliche if (x = 5)-Falle in C und prüfst Grenzwerte genau.',
        terms: ['Verzweigung', 'Bedingung', 'Grenzwert', 'Bedingungsoperator'],
        parts: [
          A.text('Vorsicht bei = statt == in C', 'Verzweigungen funktionieren in C wie in Java – mit einer berühmten Falle: **`if (fehlversuche = 3)` ist in C gültiger Code!** Es weist 3 zu, 3 ist ungleich 0 (also wahr), und der Zweig läuft immer. Vergleichen heißt **`==`**.'),
          C([
            'int warenwert = 4790;',
            'int istPrime = 0;§0 = falsch, 1 = wahr.',
            'int versand = (warenwert >= 5000 || istPrime) ? 0 : 495;§Bedingungsoperator ? : mit ODER.',
            'printf("Versand: %d Cent\\n", versand);',
            'int prio = 2;',
            'switch (prio) {',
            '    case 1: printf("sofort\\n"); break;§break nicht vergessen!',
            '    case 2: printf("4 Stunden\\n"); break;',
            '    default: printf("1 Woche\\n");',
            '}'
          ], 'Versandkosten und Ticket-Priorität in C', { praxis: 'Auf Mikrocontrollern und in Netzwerk-Daemons ist switch extrem schnell und übersichtlich für Statuscodes.' })
        ],
        quiz: [
          A.q('Was passiert in C bei `if (x = 5)`?', ['x wird auf 5 gesetzt und die Bedingung ist immer wahr', 'Der Compiler bricht zwingend mit einem Syntaxfehler ab', 'x wird mit 5 verglichen, ohne x zu verändern', 'Die Bedingung ist immer falsch'], 0, 'Eine Zuweisung liefert den zugewiesenen Wert (5 != 0 = wahr). Mit -Wall warnt gcc davor.'),
          A.q('Was passiert im `switch`, wenn nach `case 2:` das `break;` fehlt?', ['Die Anweisungen im nächsten case laufen ebenfalls mit', 'Der switch endet automatisch am Ende von case 2', 'Der Compiler bricht zwingend mit einer Fehlermeldung ab', 'Der Block von case 2 wird komplett übersprungen'], 0, 'Fall-through: ohne break läuft der nächste Fall mit.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['int warenwert = 5000;', 'int versand = warenwert >= 5000 ? 0 : 495;', 'printf("%d\\n", warenwert + versand);'], '5000', 'Prüfe den Grenzwert 5000 genau.', '5000 >= 5000 ist wahr (1), also versand = 0.'),
          A.bug('Service-Desk: Priorität 2 druckt sowohl „4 Stunden“ als auch „1 Tag“.', 'c', [
            'int prio = 2;',
            'switch (prio) {',
            '    case 1: printf("sofort\\n"); break;',
            '    case 2: printf("4 Stunden\\n");',
            '    case 3: printf("1 Tag\\n"); break;',
            '    default: printf("1 Woche\\n");',
            '}'
          ], { line: 3, kind: 'logik', fixes: [
            'case 2: printf("4 Stunden\\n"); break;',
            'case 2: printf("4 Stunden\\n"); continue;',
            'case 2: break; printf("4 Stunden\\n");',
            'case 2: return 0;'
          ], expect: '4 Stunden' }, 'Warum läuft case 3 noch mit?', 'In case 2 fehlt das break;.')
        ]
      },

      /* ---------- 4. Schleifen ---------- */
      {
        concept: 'loops', standalone: true, domain: 'shop', stage: 2,
        title: 'Schleifen: Warenkorb, Login-Versuche, Bestände',
        goal: 'Du schreibst for-, while- und do…while-Schleifen sicher, steuerst sie mit break und continue und vermeidest Array-Überschreitungen.',
        terms: ['Schleife', 'Endlosschleife', 'Off-by-one-Fehler'],
        parts: [
          A.text('Keine foreach-Schleife in C', 'C kennt kein `foreach` – über Arrays läufst du immer mit einer **`for`-Schleife** und einem Index `i` von `0` bis `anzahl - 1`. Da C **keine Array-Grenzen prüft**, ist ein **Off-by-one-Fehler** (`<= anzahl`) hier besonders gefährlich: Er liest fremden Speicher! Und in einer `while`-Schleife droht eine **Endlosschleife**, wenn sich die Abbruchbedingung nie ändert.'),
          C([
            'int preise[3] = {1999, 999, 3490};',
            'int summe = 0;',
            'for (int i = 0; i < 3; i++) {§Immer < anzahl, niemals <= anzahl!',
            '    summe += preise[i];',
            '}',
            'printf("Warenkorb: %d Cent\\n", summe);'
          ], 'Warenkorb-Summe mit for-Schleife', { praxis: 'In C-Code stehen Array-Größen immer als Konstante oder Parameter dabei – die Schleifenbedingung < n ist das wichtigste Sicherheitsnetz.' })
        ],
        quiz: [
          A.q('Was passiert in C bei `preise[3]` in einem Array `int preise[3]`?', ['C liest fremden Speicher (undefiniertes Verhalten / Absturz)', 'C wirft automatisch eine IndexOutOfRangeException', 'C liefert garantiert immer den Wert 0', 'C vergrößert das Array automatisch auf 4 Elemente'], 0, 'C prüft Array-Grenzen aus Geschwindigkeitsgründen nicht – Quelle klassischer Buffer-Overflows!'),
          A.q('Welche Schleife läuft garantiert mindestens einmal?', ['do { … } while (bedingung);', 'while (bedingung) { … }', 'for (int i = 0; i < 0; i++) { … }', 'Keine Schleife in C'], 0, 'do…while prüft die Bedingung erst nach dem ersten Durchlauf.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['int p[3] = {1000, 2500, 500};', 'int s = 0;', 'for (int i = 0; i < 3; i++) { if (p[i] >= 1000) s += p[i]; }', 'printf("%d\\n", s);'], '3500', 'Addiere nur Werte >= 1000.', '1000 + 2500 = 3500.')
        ]
      },

      /* ---------- 5. Funktionen ---------- */
      {
        concept: 'funcs', standalone: true, domain: 'shop', stage: 2,
        title: 'Funktionen: Versand, Rabatt und Call by Value',
        goal: 'Du definierst Funktionen vor ihrem Aufruf, trennst Rückgabewert von void und verstehst, warum C standardmäßig Kopien übergibt (Call by Value).',
        terms: ['Funktion', 'Parameter', 'Rückgabewert', 'Lokale Variable'],
        parts: [
          A.text('Kopien vs. Adressen', 'Eine **Funktion** in C muss **vor** ihrem Aufruf bekannt sein (entweder direkt dort definiert oder per Prototyp angekündigt). Parameter werden immer als **Kopie** übergeben (**Call by Value**): Änderst du den Parameter oder eine **lokale Variable** in der Funktion, bleibt das Original in `main` unverändert.'),
          C([
            'int rabattInCent(int summe) {§Funktion vor main definieren.',
            '    if (summe < 10000) return 0;',
            '    return summe * 10 / 100;',
            '}',
            'int versandInCent(int warenwert) {',
            '    return warenwert >= 5000 ? 0 : 495;',
            '}',
            '// in main',
            'int summe = 12500;',
            'int r = rabattInCent(summe);',
            'printf("Zu zahlen: %d Cent\\n", summe - r + versandInCent(summe - r));'
          ], 'Shop-Funktionen in C', { praxis: 'In großen C-Projekten stehen die Funktionsköpfe (Prototypen) in Header-Dateien (.h) und die Implementierung in .c-Dateien.' })
        ],
        quiz: [
          A.q('Was passiert, wenn eine C-Funktion ihren Parameter `int lager` um 1 verringert?', ['Nur die lokale Kopie ändert sich, das Original in main bleibt gleich', 'Das Original in main wird direkt um 1 verringert', 'Der Compiler meldet einen Fehler wegen fehlendem const', 'Das Programm bricht mit einem Speicherfehler ab'], 0, 'Call by Value: Um das Original zu ändern, braucht die Funktion einen Zeiger (int *lager).')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['int rabatt(int s) { return s >= 10000 ? s * 10 / 100 : 0; }', '// in main', 'printf("%d %d\\n", rabatt(9999), rabatt(15000));'], '0 1500', 'Prüfe beide Werte gegen >= 10000.', '9999 → 0, 15000 → 1500.')
        ]
      },

      /* ---------- 6. Arrays, char-Strings & 4 Standardalgorithmen ---------- */
      {
        concept: 'coll', standalone: true, domain: 'shop', stage: 2,
        title: 'Arrays, Strings (char[]) und die vier Standardalgorithmen',
        goal: 'Du bestimmst Array-Längen mit sizeof, arbeitest mit nullterminierten char-Strings (strlen, strcmp) und setzt die vier IHK-Standardalgorithmen in C um.',
        terms: ['Lineare Suche'],
        parts: [
          A.text('Arrays ohne .length und Texte mit \\0', 'Ein C-Array kennt seine eigene Länge nicht – im selben Block rechnest du sie mit `sizeof(arr) / sizeof(arr[0])` aus. Und C hat keinen `String`-Typ: Ein Text ist ein **`char`-Array**, abgeschlossen mit dem Nullbyte **`\'\\0\'`**. Vergleichen musst du Texte mit **`strcmp(a, b) == 0`**, niemals mit `==`!'),
          C([
            'int preise[4] = {1999, 4950, 999, 3490};',
            'int n = sizeof(preise) / sizeof(preise[0]);§4 Elemente.',
            'int summe = 0, min = preise[0], fund = -1;§min startet beim ersten Element!',
            'for (int i = 0; i < n; i++) {',
            '    summe += preise[i];',
            '    if (preise[i] < min) min = preise[i];',
            '    if (preise[i] == 999 && fund == -1) fund = i;§Lineare Suche.',
            '}',
            'printf("Summe=%d Min=%d Index=%d\\n", summe, min, fund);'
          ], 'Die IHK-Standardalgorithmen in C', { praxis: 'Summieren, Minimum und lineare Suche sehen in C fast genauso aus wie in Java – nur die Array-Länge n musst du explizit mitführen.' }),
          C([
            'char artikel[] = "Maus";§Belegt 5 Bytes: M, a, u, s, \\0!',
            'printf("Laenge: %d, gleich: %d\\n", (int)strlen(artikel), strcmp(artikel, "Maus") == 0);§strcmp liefert 0 bei Gleichheit!'
          ], 'char-Strings mit strlen und strcmp', { praxis: 'Fehlt das Endzeichen \\0 in einem char-Array, liest printf weiter durch den Speicher – eine der bekanntesten C-Sicherheitslücken.' })
        ],
        quiz: [
          A.q('Wie viele Bytes belegt `char s[] = "Maus";` im Speicher?', ['5 (4 Buchstaben plus Endzeichen \\0)', '4 (genau die 4 Buchstaben)', '8 (immer ein Vielfaches von 8)', '1 (nur der Zeiger)'], 0, 'Jeder C-String endet automatisch mit dem Nullbyte \\0.'),
          A.q('Wann sind zwei C-Strings `a` und `b` inhaltlich gleich?', ['Wenn strcmp(a, b) == 0 ergibt', 'Wenn a == b ergibt', 'Wenn strcmp(a, b) == 1 ergibt', 'Wenn strlen(a) == strlen(b) ergibt'], 0, 'a == b vergleicht nur Adressen; strcmp liefert 0 bei identischem Inhalt.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['int preise[3] = {1999, 999, 3490};', 'int min = preise[0];', 'for (int i = 1; i < 3; i++) { if (preise[i] < min) min = preise[i]; }', 'printf("%d\\n", min);'], '999', 'Startwert ist 1999, verglichen wird mit 999 und 3490.', '999 ist der kleinste Wert.'),
          A.fill('Prüfe in C, ob `eingabe` gleich `"admin"` ist.', 'if ({{strcmp}}(eingabe, "admin") == {{0}}) { printf("ok\\n"); }', 'Textvergleichsfunktion aus <string.h> und ihr Rückgabewert bei Gleichheit.')
        ]
      },

      /* ---------- 7. Strukturen (struct) ---------- */
      {
        concept: 'oop', standalone: true, domain: 'shop', stage: 3,
        title: 'Strukturen (struct): Daten bündeln ohne Klassen',
        goal: 'Du bündelst Artikel- und Ticketdaten in einem struct, greifst mit Punkt (.) und Pfeil (->) auf Felder zu und änderst Strukturen über Zeiger.',
        terms: ['Attribut'],
        parts: [
          A.text('Der Vorläufer von Klassen', 'C ist keine objektorientierte Sprache und kennt keine Klassen oder Methoden in Objekten. Stattdessen gruppierst du zusammengehörige Felder (**Attribute**) in einem **`struct`** und übergibst dessen Adresse (`&a`) an Funktionen, die es bearbeiten.'),
          C([
            'struct Artikel {§Bündelt Name, Preis und Lagerbestand.',
            '    char name[32];',
            '    int preisInCent;',
            '    int lager;',
            '};§Semikolon am Ende von struct nicht vergessen!',
            'int verkaufen(struct Artikel *a, int menge) {§Zeiger *a: arbeitet am Original, nicht an einer Kopie.',
            '    if (menge <= 0 || menge > a->lager) return 0;§Pfeil (->) greift über den Zeiger auf ein Feld zu.',
            '    a->lager -= menge;',
            '    return 1;',
            '}',
            '// in main',
            'struct Artikel maus = {"Funkmaus", 1999, 35};',
            'int ok = verkaufen(&maus, 5);§&maus übergibt die Speicheradresse von maus.',
            'printf("%s: ok=%d, Rest=%d\\n", maus.name, ok, maus.lager);§Punkt (.) bei der direkten Variable.'
          ], 'struct Artikel mit Zeiger-Funktion verkaufen()', { praxis: 'Im Linux-Kernel und in C-Netzwerk-Stacks ist exakt dieses Muster Standard: struct für Daten, Funktionen mit Zeiger-Parameter als „Methoden“.' })
        ],
        quiz: [
          A.q('Wann verwendest du in C den Pfeil `a->lager` statt des Punkts `a.lager`?', ['Wenn a ein Zeiger auf das struct ist', 'Wenn lager eine negative Zahl ist', 'Wenn das struct im Stack liegt', 'Wenn a ein Array aus Zahlen ist'], 0, 'a->lager ist die Kurzform für (*a).lager.')
        ],
        tasks: [
          A.fill('Greife über den Zeiger `a` auf das Feld `lager` zu.', 'if (menge > a{{->}}lager) return 0;', 'Zwei Zeichen, die wie ein Pfeil aussehen.')
        ]
      },

      /* ---------- 8. Fehlerbehandlung in C ---------- */
      {
        concept: 'err', standalone: true, domain: 'shop', stage: 3,
        title: 'Fehlerbehandlung in C: Rückgabewerte und NULL prüfen',
        goal: 'Du prüfst Rückgabewerte von Funktionen (0, -1, NULL) statt Exceptions und verstehst, was einen Segmentation fault verursacht.',
        terms: ['Laufzeitfehler'],
        parts: [
          A.text('Rückgabewerte statt try/catch', 'C kennt kein `try`/`catch`. Funktionen signalisieren Fehler über ihren **Rückgabewert** (`0` für fehlgeschlagen, `-1` für nicht gefunden, `NULL` für fehlenden Speicher). Wer den Rückgabewert ignoriert, riskiert einen **Laufzeitfehler** – in C oft den berüchtigten `Segmentation fault`.'),
          C([
            'int bestand = 3;',
            'int entnehmen(int *lager, int menge) {',
            '    if (lager == NULL || menge <= 0 || menge > *lager) return -1;§Fehlercode -1 statt Absturz.',
            '    *lager -= menge;',
            '    return 0;§0 bedeutet Erfolg.',
            '}',
            '// in main',
            'if (entnehmen(&bestand, 5) != 0) {',
            '    printf("Nicht genug auf Lager (Rest: %d)\\n", bestand);',
            '}'
          ], 'Fehlercodes konsequent prüfen', { praxis: 'Fast jede C-Bibliothek (Dateien, Sockets, Datenbanktreiber) arbeitet mit genau diesen Fehlercodes – deshalb gehört nach jeden kritischen Aufruf ein if.' })
        ],
        quiz: [
          A.q('Wie melden C-Funktionen Fehler an den Aufrufer?', ['Über den Rückgabewert (z. B. -1, 0 oder NULL)', 'Mit try und catch um den Aufruf', 'Mit throw new Exception(...)', 'Über einen automatischen Neustart von main'], 0, 'C hat keine Exceptions – Rückgabewerte müssen immer geprüft werden.')
        ],
        tasks: [
          A.fill('Prüfe, ob ein Zeiger `p` ungültig (leer) ist.', 'if (p == {{NULL}}) return -1;', 'Das C-Makro für einen leeren Zeiger (Großbuchstaben).')
        ]
      },

      /* ---------- 9. Clean Code in C ---------- */
      {
        id: 'clean', standalone: true, domain: 'shop', stage: 4,
        title: 'Clean Code in C: Konstanten, Guard Clauses, klare Funktionen',
        goal: 'Du schreibst wartbaren C-Code ohne Magic Numbers, mit Guard Clauses und kleinen Funktionen (DRY).',
        terms: ['Clean Code', 'Magic Number', 'Guard Clause', 'DRY'],
        parts: [
          A.text('Disziplin schützt vor C-Fehlern', 'Gerade weil C wenig abfängt, ist **Clean Code** doppelt wichtig: benannte `const`-Werte statt **Magic Numbers**, **Guard Clauses** am Funktionsanfang (inkl. `NULL`-Checks) und **DRY** durch kleine Hilfsfunktionen.'),
          C([
            'int pruefe(int menge, int lager, int bezahlt) {',
            '    if (menge <= 0) return -1;§Guard Clause: ungültige Menge sofort raus.',
            '    if (menge > lager) return -2;',
            '    if (!bezahlt) return -3;',
            '    return 0;§Normalfall: versenden.',
            '}',
            '// in main',
            'printf("%d\\n", pruefe(2, 5, 1));'
          ], 'Guard Clauses in C', { praxis: 'Im Linux-Kernel und in Embedded-Code sind frühe returns am Funktionsanfang (Guard Clauses) der Standard für lesbaren, sicheren C-Code.' })
        ],
        quiz: [
          A.q('Welchen Vorteil haben Guard Clauses am Anfang einer C-Funktion?', ['Fehler- und NULL-Fälle werden sofort klar abgewiesen', 'Sie ersetzen alle Schleifen in der Funktion', 'Sie machen Zeiger automatisch sicher vor Speicherlecks', 'Sie sparen das return am Funktionsende'], 0, 'Flacher Code ohne tiefe if-Treppen ist leichter zu prüfen und zu warten.')
        ],
        tasks: [
          A.choose('Beide Varianten rechnen die Versandkosten gleich. Welche folgt dem DRY-Prinzip?', 'c', [
            ['printf("%d\\n", 3000 >= 5000 ? 0 : 495);', 'printf("%d\\n", 7200 >= 5000 ? 0 : 495);'],
            ['int versand(int w) { return w >= 5000 ? 0 : 495; }', '// in main', 'printf("%d\\n", versand(3000));', 'printf("%d\\n", versand(7200));']
          ], { a: 1, expect: '495\n0' }, 'Welche Variante hat die Versandregel an genau einer Stelle?', 'Mit der Funktion versand() steht die Grenze 5000 einmal zentral im Code.')
        ]
      },

      /* ---------- 10. Bug-Arena in C ---------- */
      {
        id: 'bugs', standalone: true, domain: 'shop', stage: 4,
        title: 'Bug-Arena: typische C-Fehler finden und beheben',
        goal: 'Du findest klassische C-Bugs (= im if, Rabatt-Klammerung, Off-by-one) und wählst den kleinsten richtigen Fix.',
        terms: ['Syntaxfehler', 'Laufzeitfehler', 'Logikfehler', 'Debugging'],
        parts: [
          A.text('Typische C-Fallen beim Debugging', 'Anders als **Syntaxfehler** (die der Compiler sofort meldet) und **Laufzeitfehler** (wie ein `Segmentation fault`) kompiliert C viele **Logikfehler** still durch – etwa `if (x = 0)` oder fehlende Klammern. Übersetze immer mit `gcc -Wall -Wextra` und prüfe kritische Stellen im **Debugging** Schritt für Schritt.')
        ],
        quiz: [
          A.q('Warum lohnt sich `gcc -Wall` beim Übersetzen jedes C-Programms?', ['Der Compiler warnt früh vor typischen Fallen wie if (x = 5)', 'Das Programm läuft dadurch automatisch doppelt so schnell', 'Array-Grenzen werden damit zur Laufzeit geprüft', 'malloc-Speicher wird damit automatisch freigegeben'], 0, '-Wall schaltet alle wichtigen Compiler-Warnungen ein.')
        ],
        tasks: [
          A.bug('Kasse: 10 % Rabatt auf Ware + Versand soll 4045 Cent ergeben, nicht 4445.', 'c', [
            'int preis = 4000;',
            'int versand = 495;',
            'int gesamt = preis + versand * 90 / 100;',
            'printf("%d\\n", gesamt);'
          ], { line: 2, kind: 'logik', fixes: [
            'int gesamt = (preis + versand) * 90 / 100;',
            'int gesamt = preis + (versand * 90) / 100;',
            'int gesamt = (preis + versand) * 10 / 100;',
            'int gesamt = preis * 90 / 100 + versand;'
          ], expect: '4045' }, 'Punkt vor Strich: Worauf wirkt * 90 / 100 ohne Klammern?', 'Erst (preis + versand) addieren, dann 90 % berechnen.')
        ]
      },

      /* ---------- 11. Vertiefung: Zeiger, malloc & free ---------- */
      {
        id: 'adv', standalone: true, domain: 'shop', stage: 4,
        title: 'Vertiefung: Zeiger und dynamischer Speicher (malloc & free)',
        goal: 'Du nutzt Zeiger (& und *), um Variablen über ihre Adresse zu ändern, forderst dynamischen Speicher mit malloc an und gibst ihn mit free wieder frei.',
        terms: [['Stack und Heap', 'Heap']],
        parts: [
          A.text('Adressen direkt in der Hand', 'Jede Variable liegt an einer Adresse im Speicher. Ein **Zeiger** (`int *p`) speichert so eine Adresse: **`&x`** holt die Adresse, **`*p`** liest oder schreibt den Wert an dieser Adresse. Und wenn du erst zur Laufzeit weißt, wie viele Artikel im Warenkorb liegen, holst du Speicher auf dem **Heap** mit `malloc` – und gibst ihn mit `free` zwingend wieder zurück.'),
          C([
            'int lager = 35;',
            'int *p = &lager;§p speichert die Speicheradresse von lager.',
            '*p = *p - 5;§Ändert lager direkt über die Adresse: jetzt 30.',
            'printf("Lager: %d\\n", lager);'
          ], 'Zeiger: Adresse (&) und Dereferenzierung (*)', { praxis: 'Zeiger sind das Fundament von C: Ohne sie könnten Funktionen keine Originalwerte ändern und keine großen Daten ohne Kopieren verarbeiten.' }),
          C([
            'int anzahl = 3;',
            'int *preise = malloc(anzahl * sizeof(int));§Speicher für 3 Preise auf dem Heap anfordern.',
            'if (preise == NULL) return 1;§Immer prüfen, ob genug Speicher da war!',
            'preise[0] = 1999; preise[1] = 999; preise[2] = 3490;',
            'printf("Letzter Preis: %d\\n", preise[2]);',
            'free(preise);§Pflicht! Ohne free entsteht ein Speicherleck.'
          ], 'Dynamischer Warenkorb mit malloc und free', { praxis: 'Vergisst ein Server-Programm in C das free(), wächst der RAM-Verbrauch mit jeder Anfrage, bis der Prozess abstürzt (Memory Leak).' })
        ],
        tips: [
          A.warn('Nach `free(preise)` darfst du `preise` nicht mehr benutzen (Use-after-free). Setze `preise = NULL;` direkt danach.')
        ],
        quiz: [
          A.q('Was liefert `&lager` in C?', ['Die Speicheradresse der Variable lager', 'Den doppelten Zahlenwert von lager', 'Eine vollständige Kopie von lager', 'Die genaue Größe von lager in Bytes'], 0, '& ist der Adressoperator, * greift auf den Wert an der Adresse zu.'),
          A.q('Was passiert, wenn du Speicher mit `malloc` holst und nie `free` aufrufst?', ['Es entsteht ein Speicherleck (Memory Leak)', 'C räumt den Speicher beim nächsten Funktionsaufruf auf', 'Der Compiler bricht mit einem Fehler ab', 'Das Array wird automatisch verkleinert'], 0, 'C hat keinen Garbage Collector – jedes malloc braucht ein passendes free.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['int lager = 14;', 'int *p = &lager;', '*p = *p - 4;', 'printf("%d\\n", lager);'], '10', '*p greift direkt auf lager zu.', 'lager wird über den Zeiger p auf 14 - 4 = 10 gesetzt.')
        ]
      }
    ]
  });
})();
