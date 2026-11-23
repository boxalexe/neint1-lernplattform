/* Kurs: C++ – 14 Module nach dem Java-/Python-/C#-Muster (Onlineshop, Login, Ticketsystem) */
(function () {
  'use strict';
  const A = window.Academy, C = (lines, h, o) => A.code('cpp', lines, h, o);
  const PP = (prompt, code, ans, hint, expl) => Object.assign(A.predict(prompt, code, ans, hint, expl), { lang: 'cpp' });
  A.moved['cpp-ops'] = 'cpp-vars'; // „Rechnen und Vergleichen“ ist in Modul 2 und 3 aufgegangen

  A.track({
    id: 'cpp', title: 'C++', tag: 'C++',
    desc: 'C mit Klassen, Referenzen und moderner Standardbibliothek am Onlineshop-Projekt: von cout, vector und Referenzen über Klassen, virtual/override und Architektur bis zu Clean Code, Bug-Arena, unique_ptr und Algorithmen.',
    intro: 'C++ verbindet die Geschwindigkeit von C mit **Objektorientierung**, **Referenzen** und einer starken **Standardbibliothek** (`string`, `vector`, `map`, `unique_ptr`, `<algorithm>`). Spiele-Engines, Browser, Datenbanken und Hochleistungs-Server laufen in C++. Wie in Java, Python, JavaScript und C# zieht sich unser **Onlineshop für IT-Zubehör** als roter Faden durch alle 14 Module.\n\nÜbersetzen mit **g++**: `g++ -std=c++17 -Wall main.cpp -o main`, starten: `./main`.',
    lessons: [
      /* ---------- 1. Erstes Programm ---------- */
      {
        concept: 'hello', standalone: true, domain: 'shop', stage: 1,
        title: 'Das erste Programm: eine Bestellbestätigung',
        goal: 'Du gibst Text mit cout << aus, kennst #include <iostream> und "\\n" gegen endl und weißt, wie g++ C++-Code kompiliert.',
        terms: ['Quellcode', 'Compiler', 'Syntaxfehler'],
        parts: [
          A.text('Schnell wie C, komfortabel wie Java', 'C++ übersetzt deinen **Quellcode** über den **Compiler** (`g++`) direkt in Maschinencode – fehlt ein Semikolon, meldet `g++` sofort einen **Syntaxfehler**. Ausgaben schiebst du mit `<<` in den Ausgabestrom `cout`.'),
          C([
            '#include <iostream>§Bindet cout und cin ein.',
            'using namespace std;§Erlaubt cout statt std::cout.',
            'int main() {',
            '    cout << "Vielen Dank fuer deine Bestellung!\\n";§\\n macht einen Zeilenumbruch (schneller als endl).',
            '    cout << "Bestellnummer: " << 10427 << "\\n";§Mehrere << lassen sich beliebig verketten.',
            '    return 0;',
            '}'
          ], 'Die Bestellbestätigung in C++', { praxis: 'In C++-Tools und Server-Anwendungen werden Ausgaben über Streams (cout, cerr, Dateistreams) mit genau diesem <<-Operator gebaut.' }),
          A.table(['', 'C++', 'C', 'Java'], [
            ['Ausgabe', '`cout << "Nr: " << 10427 << "\\n";`', '`printf("Nr: %d\\n", 10427);`', '`System.out.println("Nr: " + 10427);`'],
            ['Texttyp', '`string` (dynamisch, sicher)', '`char[]` (feste Größe + `\\0`)', '`String`']
          ], 'Dasselbe in C und Java', 'Weiter zum Vergleich: [C, Modul 1](/code-lernen/kurs/c/hello/) und [Java, Modul 1](/code-lernen/kurs/java/hello/).')
        ],
        tips: [
          A.tip('Nutze `"\\n"` statt `endl`, wenn du nicht sofort den Puffer leeren musst – das ist schneller und genauso lesbar.')
        ],
        quiz: [
          A.q('Was bewirkt `<<` in `cout << "Hallo" << "\\n";`?', ['Es schiebt Werte der Reihe nach in die Ausgabe', 'Es vergleicht zwei Strings auf Gleichheit', 'Es weist einer Variable einen neuen Wert zu', 'Es kommentiert den Rest der Zeile aus'], 0, 'Bei cout füttert << den Ausgabestrom.'),
          A.q('Welcher Header wird in C++ für `cout` und `cin` eingebunden?', ['#include <iostream>', '#include <stdio.h>', '#include <vector>', '#include <string>'], 0, 'iostream steht für Input/Output Stream.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['cout << "Bestellung " << 10427 << "\\n";', 'cout << "Versand: " << "frei\\n";'], 'Bestellung 10427\nVersand: frei', '<< verkettet ohne automatisches Leerzeichen.', 'Beide Zeilen werden exakt so ausgegeben.'),
          A.fill('Binde die Standard-Ein-/Ausgabe für `cout` ein.', '#include <{{iostream}}>', 'Name des Stream-Headers in C++.')
        ]
      },

      /* ---------- 2. Variablen, Datentypen, Rechnen ---------- */
      {
        concept: 'vars', standalone: true, domain: 'shop', stage: 1,
        title: 'Variablen, Datentypen und Umwandlung: Preise, Mengen, Eingaben',
        goal: 'Du nutzt int, long, double, string und bool, rechnest Preise exakt in Cent, kennst const, auto, stoi/to_string und vergleichst C++-Strings mit ==.',
        terms: ['Variable', 'Datentyp', 'Konstante', 'Modulo', ['Parsen', 'parsen'], ['Cast (Typumwandlung)', 'Cast']],
        parts: [
          A.text('Echte Strings und feste Typen', 'Anders als C bringt C++ mit `std::string` einen komfortablen Text-**Datentyp** mit, der sogar direkt mit `==` den **Inhalt** vergleicht. Wie in C gilt: Jede lokale **Variable** sofort initialisieren! Mit `const` schützt du **Konstanten**, `stoi("3")` übernimmt das **Parsen** von Text in Zahlen, und für eine Komma-Division aus zwei `int` brauchst du einen **Cast** wie `(double)summe / anzahl`.'),
          C([
            'string artikel = "Funkmaus";§Echter String – wächst automatisch, kein \\0-Stress.',
            'long preisInCent = 1999;§Preise in Cent als ganze Zahl.',
            'int menge = 2;',
            'const long VERSAND_IN_CENT = 495;',
            'menge = menge + 1;',
            'long summe = preisInCent * menge;',
            'cout << summe / 100 << "," << summe % 100 << " Euro\\n";§Ganzzahl-Division und Modulo.',
            'int eingabe = stoi("3");§Parsen: Text -> int (umgekehrt: to_string(3)).',
            'cout << (artikel == "Funkmaus") << " " << eingabe << "\\n";§String-Vergleich mit == liefert 1 (wahr).'
          ], 'Artikel, Modulo, stoi und String-Vergleich', { praxis: 'Bei cout immer Vergleiche wie (artikel == "Funkmaus") einklammern, weil << sonst stärker bindet als ==.' })
        ],
        quiz: [
          A.q('Wie wandelst du in C++ den Text `"25"` in ein `int` um?', ['stoi("25")', 'int.Parse("25")', 'Integer.parseInt("25")', 'Number("25")'], 0, 'stoi steht für „string to int“ (aus <string>).'),
          A.q('Was prüft `a == b` bei zwei `std::string`-Variablen in C++?', ['Den Textinhalt beider Strings', 'Nur die Speicheradresse im RAM', 'Nur die Anzahl der Buchstaben', 'Es erzeugt einen Compilerfehler'], 0, 'Anders als C-Strings (char[]) vergleicht std::string mit == den Inhalt.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['int summe = 22905;', 'cout << summe / 100 << " " << summe % 100 << "\\n";'], '229 5', 'Ganzzahl-Division liefert Euro, % liefert Rest-Cent.', '22905 / 100 = 229, Rest 5.'),
          A.bug('Bewertung: 17 Sterne aus 4 Bewertungen ergeben 4 statt 4.25.', 'cpp', [
            'int summe = 17;',
            'int anzahl = 4;',
            'double schnitt = summe / anzahl;',
            'cout << schnitt << "\\n";'
          ], { line: 2, kind: 'logik', fixes: [
            'double schnitt = (double)summe / anzahl;',
            'double schnitt = (double)(summe / anzahl);',
            'int schnitt = summe / anzahl;',
            'double schnitt = summe % anzahl;'
          ], expect: '4.25' }, 'Zwei int teilen ganzzahlig. Wo muss der Cast hin?', 'Mit (double)summe / anzahl wird als Fließkommazahl geteilt.')
        ]
      },

      /* ---------- 3. Verzweigungen ---------- */
      {
        concept: 'cond', standalone: true, domain: 'shop', stage: 1,
        title: 'Verzweigungen: Versandkosten, Login-Sperre und switch',
        goal: 'Du steuerst Business-Logik mit if/else if/else, switch und ? : und vermeidest Fall-through- und = statt ==-Fehler.',
        terms: ['Verzweigung', 'Bedingung', 'Grenzwert', 'Bedingungsoperator'],
        parts: [
          A.text('Entscheidungen im Shop', 'Verzweigungen funktionieren in C++ wie in C und Java. Prüfe jeden **Grenzwert** (wie `5000` Cent) genau und achte auf `==` statt `=` im `if` sowie auf `break;` im `switch`.'),
          C([
            'long warenwert = 4790;',
            'bool istPrime = false;',
            'long versand = (warenwert >= 5000 || istPrime) ? 0 : 495;§Bedingungsoperator ? :.',
            'cout << "Versand: " << versand << " Cent\\n";',
            'int prio = 2;',
            'switch (prio) {',
            '    case 1: cout << "sofort\\n"; break;',
            '    case 2: cout << "4 Stunden\\n"; break;',
            '    default: cout << "1 Woche\\n";',
            '}'
          ], 'Versandkosten und switch in C++', { praxis: 'Mit -Wall warnt g++ dich sofort, wenn du im if versehentlich = statt == schreibst.' })
        ],
        quiz: [
          A.q('Was passiert im C++-`switch`, wenn nach `case 2:` das `break;` fehlt?', ['Der Code im nächsten case läuft ebenfalls mit (Fall-through)', 'Der switch endet automatisch am Ende von case 2', 'Der Compiler wirft immer einen Fehler', 'Der default-Zweig wird übersprungen'], 0, 'Ohne break rutscht die Ausführung in den nächsten Fall durch.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['long w = 5000;', 'long v = w >= 5000 ? 0 : 495;', 'cout << w + v << "\\n";'], '5000', '5000 >= 5000 ist wahr.', 'Versand ist 0, also Ausgabe 5000.')
        ]
      },

      /* ---------- 4. Schleifen ---------- */
      {
        concept: 'loops', standalone: true, domain: 'shop', stage: 2,
        title: 'Schleifen: Warenkorb, Login-Versuche, Ticketlisten',
        goal: 'Du nutzt die bereichsbasierte for-Schleife (for (int p : preise)), Zählschleifen und while-Schleifen sicher ohne Off-by-one-Fehler.',
        terms: ['Schleife', 'Endlosschleife', 'Off-by-one-Fehler'],
        parts: [
          A.text('Moderne for-Schleife über Vektoren', 'Anders als C kennt C++ die **bereichsbasierte `for`-Schleife** `for (int p : preise)` – genau wie `for (int p : preise)` in Java. So vermeidest du Indexfehler beim Summieren und Filtern; bei `while` musst du den Zustand im Rumpf ändern, sonst droht eine **Endlosschleife**.'),
          C([
            'vector<int> preise = {1999, 999, 3490};',
            'int summe = 0;',
            'for (int p : preise) {§Bereichsbasiert: kein Index, kein Off-by-one-Fehler.',
            '    summe += p;',
            '}',
            'cout << "Warenkorb: " << summe << " Cent\\n";'
          ], 'Warenkorb-Summe mit range-based for', { praxis: 'Bei großen Objekten schreibst du for (const auto &a : artikel) – so wird kein einziges Objekt kopiert.' })
        ],
        quiz: [
          A.q('Wie lautet die moderne C++-Schleife über alle Elemente eines `vector<int> preise`?', ['for (int p : preise)', 'foreach (int p in preise)', 'for (int p of preise)', 'for p in preise:'], 0, 'C++ nutzt den Doppelpunkt wie Java.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['vector<int> preise = {1000, 2500, 500};', 'int s = 0;', 'for (int p : preise) { if (p >= 1000) s += p; }', 'cout << s << "\\n";'], '3500', 'Addiere nur Preise >= 1000.', '1000 + 2500 = 3500.')
        ]
      },

      /* ---------- 5. Funktionen & Referenzen ---------- */
      {
        concept: 'funcs', standalone: true, domain: 'shop', stage: 2,
        title: 'Funktionen und Referenzen: Bausteine ohne teure Kopien',
        goal: 'Du schreibst Funktionen mit return/void, nutzt Referenzen (&) zum Ändern von Originalen und const-Referenzen (const T &) zum schnellen Lesen ohne Kopie.',
        terms: ['Funktion', 'Parameter', 'Rückgabewert', 'Referenz'],
        parts: [
          A.text('Referenzen statt roher Zeiger', 'Standardmäßig kopiert C++ Parameter wie C. Mit **`&`** am Parameter entsteht eine **Referenz** – ein zweiter Name für das Original, ganz ohne Zeiger-Syntax (`*` und `->`). Für große Objekte, die nur gelesen werden, ist **`const string &`** der C++-Standard: keine Kopie, und garantiert unveränderlich.'),
          C([
            'long rabattInCent(long summe) {',
            '    return summe >= 10000 ? summe * 10 / 100 : 0;',
            '}',
            'void verkaufen(int &lager, int menge) {§Referenz (&): ändert das Original lager in main!',
            '    if (menge > 0 && menge <= lager) lager -= menge;',
            '}',
            '// in main',
            'int bestand = 35;',
            'verkaufen(bestand, 5);§Kein & beim Aufruf nötig!',
            'cout << bestand << " " << rabattInCent(12000) << "\\n";§30 und 1200.'
          ], 'Funktionen mit Rückgabewert und Referenz', { praxis: 'const vector<Artikel> &korb spart in Hochleistungs-Anwendungen tausende unnötige Kopien pro Sekunde.' })
        ],
        quiz: [
          A.q('Was bewirkt `const string &name` als Parameter einer C++-Funktion?', ['Vermeidet eine Kopie und schützt das Original vor Änderungen', 'Erzeugt zwei Kopien des Strings im Heap', 'Erlaubt der Funktion, den Original-String zu überschreiben', 'Wandelt den String automatisch in ein int um'], 0, 'Referenz (&) spart die Kopie, const verhindert versehentliche Änderungen.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['void buche(int &lager, int m) { lager -= m; }', '// in main', 'int b = 14; buche(b, 4);', 'cout << b << "\\n";'], '10', 'lager ist eine Referenz auf b.', 'b wird direkt von 14 auf 10 verringert.')
        ]
      },

      /* ---------- 6. vector, map & 4 Standardalgorithmen ---------- */
      {
        concept: 'coll', standalone: true, domain: 'shop', stage: 2,
        title: 'vector, map und die vier Standardalgorithmen',
        goal: 'Du nutzt vector<T> (push_back, size, at) und map<K, V> und wendest die vier IHK-Standardalgorithmen sicher an.',
        terms: ['Liste', 'Lineare Suche'],
        parts: [
          A.text('Sichere Container aus der Standardbibliothek', '`std::vector<T>` ist die dynamische **Liste** in C++ (wie `ArrayList` in Java): `.push_back()` hängt an, `.size()` liefert die Länge, und **`.at(i)`** prüft anders als `[i]` die Array-Grenzen! Über `vector` setzt du Summieren, Minimum und **lineare Suche** direkt mit einer Schleife um; `std::map<string, int>` speichert Schlüssel-Wert-Paare.'),
          C([
            'vector<int> preise = {1999, 4950, 999, 3490};',
            'preise.push_back(22900);§Hängt den Monitor hinten an.',
            'int summe = 0, min = preise[0];',
            'for (int p : preise) { summe += p; if (p < min) min = p; }§Summieren & Minimum.',
            'map<string, int> lager = {{"Funkmaus", 35}, {"Tastatur", 0}};',
            'cout << preise.size() << " " << min << " " << lager["Funkmaus"] << "\\n";'
          ], 'vector und map im Onlineshop', { praxis: 'Im Vergleich zu rohen C-Arrays verwaltet vector seinen Speicher automatisch – kein malloc und kein free nötig!' })
        ],
        quiz: [
          A.q('Was unterscheidet `preise.at(10)` von `preise[10]` bei einem `vector` mit 4 Elementen?', ['at() prüft die Grenzen und wirft out_of_range, [] prüft nicht', '[] wirft out_of_range, at() liefert automatisch 0', 'Beide vergrößern den vector automatisch auf 11 Elemente', 'at() funktioniert nur bei map, nicht bei vector'], 0, 'at() schützt vor undefiniertem Speicherzugriff.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['vector<int> p = {1999, 999};', 'p.push_back(3490);', 'cout << p[0] << " " << p.at(2) << " " << p.size() << "\\n";'], '1999 3490 3', 'Nach push_back hat p drei Elemente (Indizes 0, 1, 2).', 'Index 0 ist 1999, Index 2 ist 3490, Größe ist 3.')
        ]
      },

      /* ---------- 7. Klassen und Objekte ---------- */
      {
        concept: 'oop', standalone: true, domain: 'shop', stage: 3,
        title: 'Klassen und Objekte: aus Vektoren wird der Artikel',
        goal: 'Du definierst C++-Klassen mit private:/public:, Konstruktor und const-Methoden und legst Objekte direkt auf dem Stack ohne new an.',
        terms: ['Klasse', 'Objekt', 'Instanz', 'Attribut', 'Konstruktor'],
        parts: [
          A.text('Objekte ohne new – direkt auf dem Stack', 'Eine C++-**Klasse** teilt sich in `private:`- und `public:`-Abschnitte für **Attribute** und Methoden und endet zwingend mit einem **Semikolon (`};`)**. Anders als in Java brauchst du kein `new`: `Artikel maus("Funkmaus", 1999, 35);` legt die **Instanz** (das **Objekt**) direkt und blitzschnell auf dem Stack an.'),
          C([
            'class Artikel {',
            'private:§Standard in class: von außen nicht sichtbar.',
            '    string name;',
            '    long preisInCent;',
            '    int lager;',
            'public:',
            '    Artikel(string n, long p, int l) : name(n), preisInCent(p), lager(l) {}§Initialisierungsliste im Konstruktor.',
            '    bool istLieferbar() const { return lager > 0; }§const: diese Methode ändert das Objekt nicht.',
            '    long getPreisInCent() const { return preisInCent; }',
            '};§Semikolon am Klassenende nicht vergessen!',
            '// in main',
            'Artikel maus("Funkmaus", 1999, 35);§Kein new nötig!',
            'cout << maus.istLieferbar() << " " << maus.getPreisInCent() << "\\n";'
          ], 'Die Klasse Artikel in C++', { praxis: 'Initialisierungslisten (: name(n)) und const-Methoden sind das Markenzeichen von sauberem, schnellem C++-Code.' })
        ],
        quiz: [
          A.q('Was bedeutet `const` hinter der Klammer in `long getPreisInCent() const`?', ['Die Methode verspricht, keine Attribute des Objekts zu verändern', 'Die Methode gibt immer eine unveränderliche Zahl 0 zurück', 'Die Methode darf nur einmal im Programm aufgerufen werden', 'Die Methode ist privat und nur in der Klasse sichtbar'], 0, 'const-Methoden dürfen auch auf const-Referenzen (const Artikel &a) aufgerufen werden.')
        ],
        tasks: [
          A.fill('Ergänze das Pflichtzeichen am Ende jeder C++-Klassendefinition.', 'class Artikel {\n    int lager;\n}{{;}}', 'Anders als in Java oder C# endet class { ... } in C++ mit diesem Zeichen.')
        ]
      },

      /* ---------- 8. Kapselung ---------- */
      {
        id: 'kapselung', standalone: true, domain: 'shop', stage: 3,
        title: 'Kapselung: Lagerbestand und Passwort schützen',
        goal: 'Du kapselst Zustände mit private:-Abschnitten, prüfst Eingaben in Konstruktor und Methoden und liest Sichtbarkeiten im UML.',
        terms: ['Kapselung', ['Getter und Setter', 'Getter', 'Setter'], 'Sichtbarkeit'],
        parts: [
          A.text('private: als Standard', 'In einer C++-`class` ist alles vor dem ersten Label automatisch `private:`. Durch **Kapselung** über `private:` und fachliche Methoden wie `verkaufen()` stellst du sicher, dass kein Bestand negativ wird.'),
          C([
            'class Artikel {',
            'private:',
            '    int lager;',
            'public:',
            '    Artikel(int l) : lager(l < 0 ? 0 : l) {}',
            '    int getLager() const { return lager; }§Getter (const).',
            '    bool verkaufen(int menge) {§Geprüfte fachliche Methode statt offenem Setter.',
            '        if (menge <= 0 || menge > lager) return false;',
            '        lager -= menge;',
            '        return true;',
            '    }',
            '};',
            '// in main',
            'Artikel maus(35);',
            'cout << maus.verkaufen(50) << " " << maus.verkaufen(5) << " " << maus.getLager() << "\\n";'
          ], 'Gekapselter Artikel in C++', { praxis: 'Dieselbe Regel wie in Java, Python und C#: Kein Code außerhalb von Artikel kann lager direkt auf -15 setzen.' })
        ],
        quiz: [
          A.q('Welche Sichtbarkeit haben Attribute in einer C++-`class`, wenn kein `public:` davor steht?', ['private', 'public', 'protected', 'static'], 0, 'In class ist private der Standard (in struct wäre es public).')
        ],
        tasks: [
          A.bug('Lager: Bei Bestand 5 schlägt der Kauf von genau 5 Stück fehl.', 'cpp', [
            'class Artikel {',
            '    int lager;',
            'public:',
            '    Artikel(int l) : lager(l) {}',
            '    bool verkaufen(int m) {',
            '        if (m <= 0 || m >= lager) return false;',
            '        lager -= m; return true;',
            '    }',
            '    int getLager() const { return lager; }',
            '};',
            '// in main',
            'Artikel a(5);',
            'cout << a.verkaufen(6) << " " << a.verkaufen(5) << " " << a.getLager() << "\\n";'
          ], { line: 5, kind: 'logik', fixes: [
            'if (m <= 0 || m > lager) return false;',
            'if (m <= 0 || m < lager) return false;',
            'if (m < 0 || m >= lager) return false;',
            'if (m <= 0 && m > lager) return false;'
          ], expect: '0 1 0' }, 'Darf man genau den Restbestand kaufen?', '>= weist auch m == lager ab; richtig ist m > lager.')
        ]
      },

      /* ---------- 9. Vererbung, virtual & Polymorphie ---------- */
      {
        id: 'vererbung', standalone: true, domain: 'shop', stage: 3,
        title: 'Vererbung, Polymorphie und rein virtuelle Schnittstellen',
        goal: 'Du nutzt : public Oberklasse, virtual, override, den virtuellen Destruktor und rein virtuelle Methoden (= 0) als Schnittstelle in C++.',
        terms: ['Vererbung', ['Oberklasse und Unterklasse', 'Oberklasse', 'Unterklasse'], ['Überschreiben (Override)', 'Überschreiben'], 'Polymorphie', ['Schnittstelle (Interface)', 'Interface']],
        parts: [
          A.text('virtual ist Pflicht für Polymorphie', 'Bei **Vererbung** (`: public Oberklasse`) braucht **Polymorphie** in C++ drei Dinge: **`virtual`** in der Oberklasse, **`override`** beim **Überschreiben** in der Unterklasse und den Aufruf über eine **Referenz oder einen Zeiger** (`Artikel &` oder `Artikel *`). Ein **Interface** gibt es als abstrakte Klasse mit rein virtuellen Methoden (`= 0`) und virtuellem Destruktor.'),
          C([
            'class Zahlungsmethode {§Abstrakte Klasse als Interface in C++.',
            'public:',
            '    virtual long gebuehrInCent(long betrag) const = 0;§= 0: rein virtuell (muss überschrieben werden).',
            '    virtual ~Zahlungsmethode() = default;§Virtueller Destruktor: Pflicht bei Polymorphie!',
            '};',
            'class PayPal : public Zahlungsmethode {',
            'public:',
            '    long gebuehrInCent(long b) const override { return b * 249 / 10000 + 35; }',
            '};',
            'class Rechnung : public Zahlungsmethode {',
            'public:',
            '    long gebuehrInCent(long b) const override { return 0; }',
            '};',
            '// in main',
            'PayPal pp; Rechnung r;',
            'const Zahlungsmethode &z1 = pp; const Zahlungsmethode &z2 = r;',
            'cout << z1.gebuehrInCent(10000) << " " << z2.gebuehrInCent(10000) << "\\n";'
          ], 'Rein virtuelles Interface und Polymorphie in C++', { praxis: 'Ohne virtual ruft C++ aus Geschwindigkeitsgründen immer die Methode des Variablentyps auf – Polymorphie schaltest du in C++ bewusst mit virtual ein.' })
        ],
        quiz: [
          A.q('Was bedeutet `= 0` am Ende einer virtuellen Methode (`virtual long gebuehr() = 0;`)?', ['Rein virtuell: abstrakte Vorgabe ohne Rumpf (Interface)', 'Die Methode gibt immer 0 zurück', 'Die Methode darf nicht überschrieben werden', 'Die Methode wird zur Laufzeit gelöscht'], 0, 'Eine Klasse mit mindestens einer = 0-Methode ist abstrakt und dient als Interface.'),
          A.q('Warum braucht eine polymorphe Basisklasse in C++ einen `virtual` Destruktor?', ['Damit beim Löschen über Basiszeiger die Unterklasse aufgeräumt wird', 'Damit Objekte ohne eigenen Konstruktor direkt erzeugt werden können', 'Damit die Unterklasse kein override an Methoden mehr schreiben muss', 'Damit das Objekt beim Verlassen der Funktion auf dem Stack bleibt'], 0, 'Ohne virtuellen Destruktor entsteht beim Löschen über Basiszeiger undefiniertes Verhalten.')
        ],
        tasks: [
          A.fill('Leite `DigitalArtikel` öffentlich von `Artikel` ab.', 'class DigitalArtikel : {{public}} Artikel { };', 'Sichtbarkeit bei normaler C++-Vererbung.')
        ]
      },

      /* ---------- 10. Exceptions ---------- */
      {
        concept: 'err', standalone: true, domain: 'shop', stage: 3,
        title: 'Exceptions: Fehler abfangen statt abstürzen',
        goal: 'Du fängst Exceptions mit try und catch (const exception &e) ab, wirfst eigene Fehler mit throw runtime_error und liest e.what().',
        terms: [['Ausnahme (Exception)', 'Exception'], 'Laufzeitfehler'],
        parts: [
          A.text('Immer per const-Referenz fangen', 'Anders als C kennt C++ `try`, `catch` und `throw` (aus `<stdexcept>`), um einen **Laufzeitfehler** wie ungültige Texteingaben bei `stoi` sauber abzufangen. Fange Exceptions immer als **`const`-Referenz** (`catch (const exception &e)`), um unnötiges Kopieren zu vermeiden. Die Beschreibung liefert `e.what()`.'),
          C([
            '#include <stdexcept>',
            'try {',
            '    int menge = stoi("zwei");§Wirft invalid_argument.',
            '    cout << menge << "\\n";',
            '} catch (const invalid_argument &e) {',
            '    cout << "Ungueltige Menge\\n";',
            '} catch (const exception &e) {',
            '    cout << "Fehler: " << e.what() << "\\n";',
            '}'
          ], 'try und catch in C++', { praxis: 'C++ hat kein finally – stattdessen räumt RAII (Destruktoren, unique_ptr, vector) am Blockende automatisch auf, selbst wenn eine Exception fliegt!' })
        ],
        quiz: [
          A.q('Warum gibt es in C++ kein `finally` wie in Java oder C#?', ['Weil Destruktoren (RAII) am Blockende automatisch aufräumen', 'Weil Exceptions in C++ das Programm immer sofort beenden', 'Weil catch in C++ automatisch doppelt ausgeführt wird', 'Weil C++ gar keine try-Blöcke unterstützt'], 0, 'RAII (Resource Acquisition Is Initialization) schließt Dateien und Speicher deterministisch am Blockende.')
        ],
        tasks: [
          A.fill('Wirf in C++ eine eigene Ausnahme bei leerem Lager.', 'if (menge > lager) {{throw}} runtime_error("Zu wenig auf Lager");', 'Schlüsselwort zum Auslösen einer Exception.')
        ]
      },

      /* ---------- 11. Architektur ---------- */
      {
        id: 'architektur', standalone: true, domain: 'shop', stage: 4,
        title: 'Zusammenhänge: Warenkorb, Position, Artikel und RabattRechner',
        goal: 'Du liest das 4-Klassen-Shop-Modell in C++ und erkennst Komposition (vector<Position>), Assoziation und Single Responsibility.',
        terms: ['Klassendiagramm', 'Komposition', 'Assoziation', 'Single Responsibility'],
        parts: [
          A.text('Vier Klassen, eine Bestellung', 'Exakt dasselbe 4-Klassen-Shop-Modell wie in Java, Python, JavaScript und C# – hier in modernem C++ mit `vector<Position>` (**Komposition**) und `const Artikel *` (**Assoziation**).'),
          A.uml('klasse Warenkorb\n  - positionen: vector<Position>\n  + hinzufuegen(a: Artikel, menge: int): void\n  + summeInCent(): long\nklasse Position\n  - menge: int\n  + betragInCent(): long\nklasse Artikel\n  - name: string\n  - preisInCent: long\n  + getPreisInCent(): long\nklasse RabattRechner\n  + rabattInCent(summeInCent: long): long\nWarenkorb "1" *-- "*" Position : enthält\nPosition "*" --> "1" Artikel', 'Das Shop-Klassendiagramm'),
          C([
            'class Artikel {',
            '    string name; long preis;',
            'public:',
            '    Artikel(string n, long p) : name(n), preis(p) {}',
            '    long getPreis() const { return preis; }',
            '};',
            'class Position {',
            '    const Artikel *artikel; int menge;§Assoziation (* --> 1).',
            'public:',
            '    Position(const Artikel *a, int m) : artikel(a), menge(m) {}',
            '    long betrag() const { return artikel->getPreis() * menge; }',
            '};',
            'class Warenkorb {',
            '    vector<Position> positionen;§Komposition (1 *-- *): lebt im Warenkorb.',
            'public:',
            '    void hinzufuegen(const Artikel &a, int m) { positionen.push_back(Position(&a, m)); }',
            '    long summe() const { long s = 0; for (const auto &p : positionen) s += p.betrag(); return s; }',
            '};',
            '// in main',
            'Artikel maus("Funkmaus", 1999), monitor("Monitor", 22900);',
            'Warenkorb korb; korb.hinzufuegen(maus, 2); korb.hinzufuegen(monitor, 1);',
            'long s = korb.summe(); long r = s >= 10000 ? s * 10 / 100 : 0;',
            'cout << "Zu zahlen: " << (s - r) << " Cent\\n";'
          ], 'Das 4-Klassen-Modell in C++', { praxis: 'Dank vector<Position> auf dem Stack wird beim Verlassen von main alles ohne ein einziges delete sauber abgeräumt.' })
        ],
        quiz: [
          A.q('Warum nutzt `Warenkorb` ein `vector<Position>` statt eines rohen `new Position[]`?', ['vector verwaltet seinen Speicher automatisch ohne Speicherlecks', 'vector kann nur genau zwei Positionen speichern', 'new ist in C++ für Klassen verboten', 'vector sortiert alle Positionen automatisch nach Preis'], 0, 'Standardcontainer wie vector sind sicherer und genauso schnell wie rohe Arrays.')
        ],
        tasks: [
          A.fill('Hänge in `Warenkorb` eine neue Position ans Ende des Vektors an.', 'positionen.{{push_back}}(Position(&a, m));', 'Die vector-Methode zum Anhängen ans Ende.')
        ]
      },

      /* ---------- 12. Clean Code ---------- */
      {
        id: 'clean', standalone: true, domain: 'shop', stage: 4,
        title: 'Clean Code in C++: lesbar und speichersicher',
        goal: 'Du erkennst unsauberen C++-Code und wählst sauberes Refactoring (Guard Clauses, Konstanten, DRY, const-Referenzen).',
        terms: ['Clean Code', 'Magic Number', 'Guard Clause', 'DRY', 'Refactoring'],
        parts: [
          A.text('Sauberes, modernes C++', 'Neben den allgemeinen **Clean Code**-Regeln (sprechende Namen, keine **Magic Numbers**, **Guard Clauses**, **DRY**) gilt in C++: kein rohes `new`/`delete`, immer `const &` bei großen Parametern und `vector` statt C-Arrays.'),
          C([
            'string pruefe(int menge, int lager, bool bezahlt) {',
            '    if (menge <= 0) return "ungueltig";§Guard Clauses statt tiefer if-Treppe.',
            '    if (menge > lager) return "zu wenig";',
            '    if (!bezahlt) return "warten";',
            '    return "versenden";',
            '}',
            '// in main',
            'cout << pruefe(2, 5, true) << "\\n";'
          ], 'Guard Clauses in C++', { praxis: 'Lesbarer Code reduziert in C++ nicht nur Denkfehler, sondern auch gefährliche Speicherfehler.' })
        ],
        quiz: [
          A.q('Was ändert sich bei einem echten Refactoring?', ['Nur die innere Struktur, niemals das Verhalten', 'Sowohl die innere Struktur als auch die Ausgabe', 'Nur die gewählten Compiler-Flags beim Bauen', 'Alle berechneten Preise werden neu gerundet'], 0, 'Refactoring verbessert Wartbarkeit bei identischem Ergebnis.')
        ],
        tasks: [
          A.choose('Beide Varianten rechnen die Versandkosten gleich. Welche folgt DRY?', 'cpp', [
            ['cout << (3000 >= 5000 ? 0 : 495) << "\\n";', 'cout << (7200 >= 5000 ? 0 : 495) << "\\n";'],
            ['long versand(long w) { return w >= 5000 ? 0 : 495; }', '// in main', 'cout << versand(3000) << "\\n";', 'cout << versand(7200) << "\\n";']
          ], { a: 1, expect: '495\n0' }, 'Welche Variante hat die Versandregel an genau einer Stelle?', 'Mit der Funktion versand() steht die Regel genau einmal im Code.')
        ]
      },

      /* ---------- 13. Bug-Arena ---------- */
      {
        id: 'bugs', standalone: true, domain: 'shop', stage: 4,
        title: 'Bug-Arena: typische C++-Fehler finden und beheben',
        goal: 'Du findest klassische C++-Bugs (Off-by-one, fehlendes break, Rabatt-Klammerung) und wählst den kleinsten richtigen Fix.',
        terms: ['Syntaxfehler', 'Laufzeitfehler', 'Logikfehler', 'Off-by-one-Fehler', 'Debugging'],
        parts: [
          A.text('Fehlersuche wie in der Prüfung', 'Trenne beim **Debugging** in C++ sauber zwischen **Syntaxfehler**, **Laufzeitfehler** (z. B. `out_of_range`) und **Logikfehler** – achte besonders auf **Off-by-one-Fehler** (weil `vec[i]` nicht prüft), fehlende `break` im `switch` und Operator-Priorität.')
        ],
        quiz: [
          A.q('Welcher Fehler tritt auf, wenn ein Programm durchläuft, aber 4445 statt 4045 Cent berechnet?', ['Logikfehler', 'Syntaxfehler', 'Laufzeitfehler', 'Linkerfehler'], 0, 'Kein Abbruch, aber falsches Ergebnis = Logikfehler.')
        ],
        tasks: [
          A.bug('Kasse: 10 % Rabatt auf Ware + Versand soll 4045 Cent ergeben, nicht 4445.', 'cpp', [
            'int preis = 4000;',
            'int versand = 495;',
            'int gesamt = preis + versand * 90 / 100;',
            'cout << gesamt << "\\n";'
          ], { line: 2, kind: 'logik', fixes: [
            'int gesamt = (preis + versand) * 90 / 100;',
            'int gesamt = preis + (versand * 90) / 100;',
            'int gesamt = (preis + versand) * 10 / 100;',
            'int gesamt = preis * 90 / 100 + versand;'
          ], expect: '4045' }, 'Worauf wirkt * 90 / 100 ohne Klammern?', 'Erst (preis + versand) addieren, dann 90 % nehmen.')
        ]
      },

      /* ---------- 14. Vertiefung: Smart Pointer & Algorithmen ---------- */
      {
        id: 'adv', standalone: true, domain: 'tickets', stage: 4,
        title: 'Vertiefung: Smart Pointer (unique_ptr) und Algorithmen mit Lambdas',
        goal: 'Du vermeidest Speicherlecks mit unique_ptr (RAII) und nutzt Standard-Algorithmen wie sort und count_if mit Lambdas am Ticketsystem.',
        terms: ['Lambda'],
        parts: [
          A.text('unique_ptr statt new und delete', 'Rohes `new` und `delete` sind in modernem C++ veraltet, weil vergessene `delete`s Speicherlecks erzeugen. **`std::unique_ptr`** gibt das Objekt am Blockende **automatisch** frei (RAII).'),
          C([
            '#include <memory>',
            '{',
            '    auto t = make_unique<string>("Server nicht erreichbar");§Erzeugt das Objekt sicher im unique_ptr.',
            '    cout << *t << "\\n";',
            '}§Am Blockende wird der Speicher automatisch freigegeben – kein delete nötig!'
          ], 'Speichersicherheit mit unique_ptr', { noRun: true, praxis: 'In modernem C++ (ab C++14) gilt die Regel: kein rohes new/delete im Anwendungscode – immer Objekte direkt oder unique_ptr.' }),
          C([
            '#include <algorithm>',
            'vector<int> prios = {3, 1, 4, 2, 1};',
            'sort(prios.begin(), prios.end());§Sortiert aufsteigend: 1, 1, 2, 3, 4.',
            'int kritisch = count_if(prios.begin(), prios.end(), [](int p) { return p == 1; });§Lambda [](int p) zählt alle Prio-1-Tickets.',
            'cout << "Wichtigste: " << prios[0] << ", Kritisch: " << kritisch << "\\n";'
          ], 'sort und count_if mit Lambda im Ticketsystem', { praxis: 'Die STL-Algorithmen (<algorithm>) sind hochoptimiert und funktionieren auf allen Containern – genau wie LINQ in C# oder Streams in Java.' })
        ],
        quiz: [
          A.q('Welches Problem löst `std::unique_ptr` in modernem C++?', ['Er gibt dynamischen Speicher am Blockende automatisch frei', 'Er kopiert jedes Objekt automatisch in zwei Threads', 'Er ersetzt alle for-Schleifen durch Rekursion', 'Er verhindert Syntaxfehler beim Kompilieren'], 0, 'RAII: Kein vergessenes delete, kein Speicherleck.'),
          A.q('Wofür steht `[](int p) { return p == 1; }` in C++?', ['Ein Lambda (kurze namenlose Funktion)', 'Ein Array mit einem Element', 'Eine Klassendefinition ohne Namen', 'Eine Präprozessor-Anweisung'], 0, 'Die eckigen Klammern [] leiten in C++ ein Lambda ein.')
        ],
        tasks: [
          A.fill('Erzeuge einen sicheren Smart Pointer für ein `Ticket` ohne rohes `new`.', 'auto t = {{make_unique}}<Ticket>(502);', 'Hilfsfunktion aus <memory> für unique_ptr.')
        ]
      }
    ]
  });
})();
