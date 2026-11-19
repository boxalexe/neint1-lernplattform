/* Kurs: C */
(function () {
  'use strict';
  const A = window.Academy, C = (lines, h, o) => A.code('c', lines, h, o);
  const PP = (prompt, code, ans, hint, expl) => Object.assign(A.predict(prompt, code, ans, hint, expl), { lang: 'c' });

  A.track({
    id: 'c', title: 'C', tag: 'C',
    desc: 'Die Sprache nahe an der Hardware: Variablen, Funktionen, Arrays, Zeiger, Strukturen und Speicher. Wer C versteht, versteht, was in anderen Sprachen unter der Haube passiert.',
    intro: 'C ist alt, klein und schnell. Es gibt **keine Klassen**, keine Listen und keine automatische Speicherverwaltung: Du gehst direkt mit Speicher um. Das macht C anspruchsvoll, aber es erklärt, wie Computer wirklich arbeiten. Firmware und Steuergeräte sind oft in C geschrieben.\n\nZum Ausprobieren brauchst du einen Compiler, z. B. **gcc** (unter Windows über MSYS2 oder WSL). Übersetzen: `gcc main.c -o main`, starten: `./main`. Mit `-Wall` zeigt der Compiler mehr Warnungen, das lohnt sich immer.',
    lessons: [
      {
        concept: 'hello',
        parts: [
          C(['#include <stdio.h>§Bindet die Standard-Ein-/Ausgabe ein. Ohne diese Zeile kennt C printf nicht.', '', 'int main(void) {§Hier beginnt jedes C-Programm. int heißt: gibt eine Zahl zurück (Fehlercode).', '    printf("Hallo Welt\\n");§printf gibt Text aus. \\n ist der Zeilenumbruch, den du selbst schreiben musst.', '    return 0;§0 bedeutet: Programm war erfolgreich.', '}§Ende von main.'], 'Dein erstes C-Programm')
        ],
        tips: [A.warn('C macht **keinen** automatischen Zeilenumbruch. Ohne `\\n` stehen die nächsten Ausgaben in derselben Zeile.')],
        quiz: [A.q('Wofür steht `\\n` in einem C-Text?', ['Für einen Zeilenumbruch', 'Für eine Null', 'Für das Ende des Programms', 'Für einen Tabulator'], 0, '\\n ist das Zeichen für „neue Zeile“.')],
        tasks: [PP('Was gibt das Programm aus?', ['printf("a\\n");', 'printf("b");', 'printf("c\\n");'], 'a\nbc', 'Nur \\n macht einen Umbruch.', 'Nach a kommt ein Umbruch. b und c stehen in einer Zeile.')]
      },
      {
        concept: 'vars',
        parts: [
          C(['int alter = 25;§Ganze Zahl.', 'double preis = 19.99;§Kommazahl mit Punkt.', "char buchstabe = 'A';§Ein Zeichen in einfachen Anführungszeichen.", 'alter = alter + 1;§Neu zuweisen.', 'printf("%d\\n", alter);§%d ist ein **Platzhalter** für eine ganze Zahl. Ausgabe: 26', 'printf("%.2f\\n", preis);§%f steht für Kommazahlen, .2 heißt zwei Nachkommastellen: 19.99', 'printf("%c\\n", buchstabe);§%c steht für ein Zeichen: A'], 'Variablen und Platzhalter in printf'),
          C(['const int MAX_PUNKTE = 100;§const: nicht mehr änderbar.', 'int a = 5, b = 3;§Mehrere Variablen in einer Zeile.', 'printf("%d plus %d ist %d\\n", a, b, a + b);§Für jeden Platzhalter folgt ein Wert, **in der gleichen Reihenfolge**.'], 'Konstanten und mehrere Werte'),
          C(['int alter;§Eine Variable ohne Startwert enthält **Zufallsmüll** aus dem Speicher.', 'printf("Alter: ");§Fragt nach.', 'scanf("%d", &alter);§scanf liest eine Zahl ein. Das **&** gibt die Adresse der Variable an, damit scanf dorthin schreiben kann.', 'printf("Du bist %d\\n", alter);§Gibt sie wieder aus.'], 'Eingabe mit scanf')
        ],
        tips: [A.warn('Eine **nicht initialisierte** Variable hat keinen definierten Wert. Gib jeder Variable sofort einen Startwert, sonst rechnest du mit Müll.'), A.info('C hat keinen Text-Datentyp. Text ist ein Array aus `char` (siehe Lektion zu Arrays).')],
        quiz: [A.q('Welcher Platzhalter gehört zu einer ganzen Zahl in `printf`?', ['%d', '%f', '%c', '%s'], 0, '%d für ganze Zahlen, %f für Kommazahlen, %c für ein Zeichen, %s für Text.')],
        tasks: [PP('Was gibt das Programm aus?', ['int x = 3;', 'int y = x;', 'x = 10;', 'printf("%d %d\\n", x, y);'], '10 3', 'y bekam den Wert 3, bevor x geändert wurde.'), A.fill('Ergänze den Platzhalter für eine ganze Zahl.', 'printf("{{%d}}", 42);', 'Für ganze Zahlen steht %d.')]
      },
      {
        concept: 'ops',
        parts: [
          C(['printf("%d\\n", 7 + 3);§Addition: 10', 'printf("%d\\n", 7 / 2);§**Achtung:** Zwei int werden **ganzzahlig** geteilt: 3', 'printf("%f\\n", 7 / 2.0);§Mit einer Kommazahl normal: 3.500000', 'printf("%d\\n", 7 % 2);§Rest der Division: 1', 'printf("%d\\n", 5 > 3 && 5 < 10);§&& ist UND. **C hat keinen Typ für Wahrheitswerte:** wahr ist 1, falsch ist 0. Ausgabe: 1', 'printf("%d\\n", !(5 == 5));§! ist NICHT: 0', 'printf("%d\\n", 5 != 4);§ungleich: 1'], 'Rechnen, Vergleichen, Verknüpfen'),
          C(['int a = 5;§Startwert.', 'a++;§Erhöht a um 1: 6.', 'a += 4;§Kurzform für a = a + 4: 10.', 'a *= 2;§a = a * 2: 20.', 'printf("%d\\n", a);§Ausgabe: 20'], 'Kurzschreibweisen')
        ],
        tips: [A.warn('`if (x = 5)` ist in C **erlaubt** und setzt x auf 5, weil jede Zahl ungleich 0 als „wahr“ gilt. Das ist eine der berühmtesten Fehlerquellen. Vergleichen heißt `==`. Mit `-Wall` warnt dich der Compiler.')],
        quiz: [A.q('Was ist in C „falsch“?', ['Die Zahl 0', 'Das Wort false', 'Jede negative Zahl', 'Eine leere Zeile'], 0, 'Null ist falsch, alles andere ist wahr.')],
        tasks: [PP('Was gibt das Programm aus?', ['printf("%d\\n", 17 / 5);', 'printf("%d\\n", 17 % 5);'], '3\n2', 'Beides sind int: ganzzahlige Division und Rest.')]
      },
      {
        concept: 'cond',
        parts: [
          C(['int temperatur = 22;§Der Wert, nach dem entschieden wird.', 'if (temperatur > 25) {§Bedingung in Klammern, Block in geschweiften Klammern.', '    printf("heiß\\n");§Nur bei erfüllter Bedingung.', '} else if (temperatur > 15) {§Nur geprüft, wenn die erste falsch war.', '    printf("angenehm\\n");§22 > 15: Ausgabe angenehm.', '} else {§Alle übrigen Fälle.', '    printf("kühl\\n");§Hier nicht erreicht.', '}§Ende.'], 'if, else if, else'),
          C(['int tag = 3;§Ein Wert mit mehreren festen Fällen.', 'switch (tag) {§switch wählt anhand des Werts einen Fall.', '    case 1:§Fall: tag ist 1.', '        printf("Montag\\n");§Bei 1.', '        break;§break beendet den switch. **Ohne break läuft es in den nächsten Fall weiter!**', '    case 3:§Fall: tag ist 3.', '        printf("Mittwoch\\n");§Hier landest du.', '        break;§Beendet den switch.', '    default:§Alle anderen Werte.', '        printf("anderer Tag\\n");§Auffangfall.', '}§Ende.'], 'switch für feste Fälle')
        ],
        tips: [],
        quiz: [A.q('Was passiert in einem `switch` ohne `break`?', ['Das Programm läuft in den nächsten Fall weiter', 'Es gibt einen Fehler', 'Der switch endet sofort', 'Der Fall wird übersprungen'], 0, 'Man nennt das „Durchfallen“.')],
        tasks: [PP('Was wird ausgegeben?', ['int x = 10;', 'if (x > 5 && x < 8) {', '    printf("A");', '} else if (x > 5) {', '    printf("B");', '} else {', '    printf("C");', '}'], 'B', 'Die erste Bedingung braucht x < 8 (falsch), die zweite stimmt.')]
      },
      {
        concept: 'loops',
        parts: [
          C(['for (int i = 1; i <= 3; i++) {§Start (int i = 1), Bedingung (i <= 3), Schritt (i++). Läuft für 1, 2, 3.', '    printf("Durchlauf %d\\n", i);§Schleifenkörper.', '}§Ende.'], 'Zählschleife for'),
          C(['int zahl = 1;§Startwert.', 'while (zahl < 50) {§Bedingung wird vor jedem Durchlauf geprüft.', '    zahl = zahl * 3;§Etwas muss sich ändern, sonst läuft es ewig.', '}§Ende.', 'printf("%d\\n", zahl);§Ausgabe: 81'], 'Bedingungsschleife while'),
          C(['int n = 0;§Startwert.', 'do {§do…while prüft **am Ende**: Der Block läuft mindestens einmal.', '    n = n + 4;§n wird 4, 8, 12.', '} while (n < 10);§Prüfung nach dem Durchlauf. Endet bei 12.', 'printf("%d\\n", n);§Ausgabe: 12'], 'do … while')
        ],
        tips: [A.warn('Ein Semikolon direkt nach `for (…)` oder `while (…)` macht den Block danach unabhängig von der Schleife. Die Schleife läuft dann leer.')],
        quiz: [A.q('Wie oft läuft `for (int i = 0; i < 5; i++)`?', ['5-mal', '4-mal', '6-mal', 'Nie'], 0, 'i ist 0, 1, 2, 3, 4.')],
        tasks: [PP('Was wird ausgegeben? (Eine Zahl pro Zeile.)', ['for (int i = 0; i < 3; i++) {', '    printf("%d\\n", i * 2);', '}'], '0\n2\n4', 'i ist 0, 1 und 2.')]
      },
      {
        concept: 'funcs',
        parts: [
          C(['#include <stdio.h>§Standard-Ein-/Ausgabe.', '', 'int flaeche(int laenge, int breite) {§Eine Funktion: **Rückgabetyp**, Name, Parameter mit Typ. In C muss sie **vor** der Stelle stehen, an der du sie aufrufst.', '    return laenge * breite;§Liefert das Ergebnis.', '}§Ende.', '', 'void gruss(void) {§void: gibt nichts zurück und nimmt nichts entgegen.', '    printf("Hallo!\\n");§Eine Ausgabe.', '}§Ende.', '', 'int main(void) {§Hier startet das Programm.', '    int raum = flaeche(4, 5);§Aufruf: Ergebnis 20.', '    printf("Raumgröße: %d\\n", raum);§Gibt aus: Raumgröße: 20', '    gruss();§Gibt aus: Hallo!', '    return 0;§Erfolgreich beendet.', '}§Ende.'], 'Funktionen mit Rückgabewert und void'),
          C(['void erhoehe(int zahl) {§zahl ist eine **Kopie**.', '    zahl = zahl + 1;§Ändert nur die Kopie.', '}§Ende.', '', 'int a = 5;§Die Originalvariable.', 'erhoehe(a);§Übergibt eine Kopie von a.', 'printf("%d\\n", a);§Weiterhin 5! Die Funktion hat a nicht verändert.'], 'C übergibt Werte als Kopie')
        ],
        tips: [A.info('Um das Original zu ändern, übergibst du seine **Adresse** (einen Zeiger). Dazu mehr in der Vertiefung.')],
        quiz: [A.q('Was passiert, wenn du eine Variable an eine Funktion übergibst und sie dort änderst?', ['Das Original bleibt unverändert, die Funktion ändert nur eine Kopie', 'Das Original wird geändert', 'Es gibt einen Fehler', 'Die Variable wird gelöscht'], 0, 'C übergibt standardmäßig Kopien (call by value).')],
        tasks: [PP('Was wird ausgegeben?', ['int doppelt(int n) {', '    return n * 2;', '}', '// in main:', 'printf("%d\\n", doppelt(doppelt(3)));'], '12', 'doppelt(3) ist 6, dann doppelt(6) ist 12.')]
      },
      {
        concept: 'coll',
        parts: [
          C(['int zahlen[4] = {4, 9, 7, 1};§Ein **Array** mit 4 Elementen. Die Größe steht in eckigen Klammern und ist fest.', 'printf("%d\\n", zahlen[0]);§Erstes Element, Index 0: 4', 'zahlen[1] = 20;§Ersetzt das zweite Element.', 'int anzahl = sizeof(zahlen) / sizeof(zahlen[0]);§Es gibt kein length. Man teilt die Gesamtgröße durch die Größe eines Elements: 4.', 'for (int i = 0; i < anzahl; i++) {§Alle Elemente durchlaufen.', '    printf("%d\\n", zahlen[i]);§Gibt jedes Element aus.', '}§Ende.'], 'Arrays'),
          C(['char name[] = "Ada";§Text ist ein **Array aus Zeichen**. C legt automatisch ein Endzeichen \'\\0\' an, also 4 Zeichen: A, d, a, \\0.', 'printf("%s\\n", name);§%s gibt Text aus: Ada', 'printf("%c\\n", name[0]);§Das erste Zeichen: A'], 'Text ist ein char-Array'),
          C(['#include <string.h>§Für Textfunktionen.', 'char a[] = "Hallo";§Ein Text.', 'printf("%d\\n", (int)strlen(a));§strlen liefert die Länge ohne Endzeichen: 5', 'printf("%d\\n", strcmp(a, "Hallo") == 0);§**Texte vergleicht man mit strcmp**: 0 heißt gleich. Mit == würdest du nur Adressen vergleichen. Ausgabe: 1'], 'Textfunktionen')
        ],
        tips: [A.warn('C prüft **keine Array-Grenzen**. `zahlen[10]` bei einem Array mit 4 Elementen liest oder überschreibt fremden Speicher. Das Programm stürzt ab oder verhält sich merkwürdig. Das ist die Quelle vieler Sicherheitslücken.')],
        quiz: [A.q('Wie viele Zeichen belegt `char name[] = "Ada";` im Speicher?', ['4', '3', '5', '2'], 0, 'Drei Buchstaben plus das Endzeichen \\0.')],
        tasks: [PP('Was gibt das Programm aus?', ['int l[3] = {10, 20, 30};', 'printf("%d %d\\n", l[0], l[2]);'], '10 30', 'Index 2 ist das dritte und letzte Element.')]
      },
      {
        concept: 'oop',
        parts: [
          A.text('C hat keine Klassen', 'Objektorientierung im engeren Sinn gibt es in C nicht. Du gruppierst Daten mit einer **Struktur** (`struct`) und schreibst Funktionen, die sie bearbeiten. Das ist der Vorläufer der Klassen.'),
          C(['#include <stdio.h>§Standard-Ein-/Ausgabe.', '#include <string.h>§Für strcpy.', '', 'struct Konto {§Eine **Struktur**: bündelt zusammengehörige Daten.', '    char inhaber[20];§Ein Text mit höchstens 19 Zeichen.', '    double kontostand;§Eine Kommazahl.', '};§Ende der Struktur (Semikolon nicht vergessen!).', '', 'void einzahlen(struct Konto *k, double betrag) {§Die Funktion bekommt die **Adresse** (Zeiger *) des Kontos, um das Original zu ändern.', '    k->kontostand += betrag;§**->** greift über den Zeiger auf ein Feld zu.', '}§Ende.', '', 'int main(void) {§Start.', '    struct Konto k;§Eine Variable vom Typ Konto.', '    strcpy(k.inhaber, "Ada");§Text kopiert man mit strcpy, nicht mit =.', '    k.kontostand = 0;§**.** greift bei einer normalen Struktur auf ein Feld zu.', '    einzahlen(&k, 100);§& übergibt die Adresse von k.', '    printf("%s: %.2f\\n", k.inhaber, k.kontostand);§Ausgabe: Ada: 100.00', '    return 0;§Ende.', '}§Ende von main.'], 'Eine Struktur und Funktionen darauf')
        ],
        tips: [A.info('Der Unterschied: In Java steckt die Methode **in** der Klasse. In C stehen Daten (`struct`) und Funktionen getrennt, und du gibst die Daten jeweils selbst mit.')],
        quiz: [A.q('Wofür steht in C `k->kontostand`, wenn `k` ein Zeiger auf eine Struktur ist?', ['Zugriff auf das Feld kontostand über den Zeiger', 'Ein Vergleich', 'Eine Zuweisung', 'Ein Kommentar'], 0, 'Der Pfeil ersetzt (*k).kontostand.')],
        tasks: []
      },
      {
        concept: 'err',
        parts: [
          A.text('Fehler in C', 'C kennt **keine Ausnahmen** (`try`/`catch`). Funktionen melden Fehler über ihren **Rückgabewert**, und du musst ihn prüfen. Häufig ist ein Fehler ein spezieller Wert wie 0, -1 oder `NULL`.'),
          C(['int zahl;§Platz für das Ergebnis.', 'int gelesen = scanf("%d", &zahl);§scanf liefert zurück, **wie viele** Werte erfolgreich gelesen wurden.', 'if (gelesen != 1) {§Es kam keine Zahl an (z. B. Buchstaben eingegeben).', '    printf("Das war keine Zahl\\n");§Fehler melden.', '    return 1;§Mit Fehlercode ungleich 0 beenden.', '}§Ende der Prüfung.', 'printf("Du hast %d eingegeben\\n", zahl);§Nur erreicht, wenn alles gut ging.'], 'Rückgabewerte prüfen'),
          C(['Segmentation fault (core dumped)§Der klassische Absturz in C: Das Programm hat auf Speicher zugegriffen, der ihm nicht gehört (falscher Zeiger, Array-Grenze, NULL). Die Meldung sagt nicht, wo. Hilfe: mit -g übersetzen und den Debugger gdb oder Valgrind nutzen.'], 'Die berüchtigtste Meldung', { noRun: true })
        ],
        tips: [A.warn('Wenn du in C den Rückgabewert einer Funktion nicht prüfst (Datei öffnen, Speicher anfordern, Eingabe lesen), arbeitest du im Zweifel mit einem Fehlerwert weiter.')],
        quiz: [A.q('Wie melden C-Funktionen Fehler typischerweise?', ['Über den Rückgabewert', 'Mit try und catch', 'Mit throw', 'Gar nicht'], 0, 'C hat keine Ausnahmen, du prüfst den Rückgabewert.')],
        tasks: []
      },
      {
        id: 'adv', stage: 4, title: 'Vertiefung: Zeiger und dynamischer Speicher',
        goal: 'Du verstehst, was ein Zeiger ist, kannst Variablen über Adressen ändern und weißt, wofür malloc und free da sind.',
        parts: [
          A.text('Was ist ein Zeiger?', 'Jede Variable liegt an einer **Adresse** im Speicher. Ein **Zeiger** ist eine Variable, die so eine Adresse speichert. Mit `&x` holst du die Adresse von `x`, mit `*p` greifst du auf das zu, **worauf `p` zeigt**.'),
          C(['int x = 5;§Eine normale Variable.', 'int *p = &x;§p ist ein Zeiger auf int und speichert die Adresse von x.', '*p = 9;§Schreibt über den Zeiger: x ist jetzt 9.', 'printf("%d\\n", x);§Ausgabe: 9'], 'Adresse und Zugriff'),
          C(['void erhoehe(int *zahl) {§Die Funktion bekommt die Adresse.', '    *zahl = *zahl + 1;§Ändert den Wert **am Original**.', '}§Ende.', '', 'int a = 5;§Die Variable.', 'erhoehe(&a);§Wir übergeben die Adresse.', 'printf("%d\\n", a);§Jetzt 6: So ändert man Variablen in Funktionen.'], 'Variablen in Funktionen ändern'),
          A.text('malloc und free', 'Speicher, dessen Größe du erst beim Laufen kennst, forderst du selbst an: `malloc` gibt ihn dir, `free` gibst du ihn zurück. **Wer nie `free` aufruft, hat ein Speicherleck.**'),
          C(['#include <stdlib.h>§Für malloc und free.', 'int n = 3;§Anzahl der gewünschten Zahlen.', 'int *feld = malloc(n * sizeof(int));§Fordert Speicher für 3 int an und liefert die Adresse.', 'if (feld == NULL) {§malloc kann scheitern und liefert dann NULL.', '    return 1;§Dann abbrechen.', '}§Ende der Prüfung.', 'for (int i = 0; i < n; i++) {§Alle Plätze füllen.', '    feld[i] = i * 10;§Zeiger lassen sich wie Arrays benutzen.', '}§Ende.', 'printf("%d\\n", feld[2]);§Ausgabe: 20', 'free(feld);§**Zurückgeben!** Danach darf man feld nicht mehr benutzen.'], 'Speicher anfordern und freigeben')
        ],
        tips: [A.warn('Typische Zeigerfehler: Zugriff nach `free`, doppeltes `free`, Zugriff auf `NULL`, nicht initialisierte Zeiger. Sie führen zu Abstürzen oder zu Sicherheitslücken. Werkzeug dagegen: **Valgrind** oder `-fsanitize=address` beim Übersetzen.')],
        quiz: [A.q('Was liefert `&x`?', ['Die Adresse der Variable x', 'Den Wert von x', 'Das Doppelte von x', 'Eine Kopie von x'], 0, 'Das & holt die Adresse.'), A.q('Was passiert, wenn man `malloc` nutzt und nie `free` aufruft?', ['Ein Speicherleck: Der Speicher bleibt belegt', 'Das Programm wird schneller', 'Der Compiler meldet einen Fehler', 'Nichts'], 0, 'Der Speicher wird erst beim Programmende zurückgegeben.')],
        tasks: [PP('Was wird ausgegeben?', ['int x = 5;', 'int *p = &x;', '*p = *p + 3;', 'printf("%d\\n", x);'], '8', '*p ist dasselbe wie x.', 'Über den Zeiger wird x auf 5 + 3 = 8 gesetzt.')]
      }
    ]
  });
})();
