/* Kurs: C++ */
(function () {
  'use strict';
  const A = window.Academy, C = (lines, h, o) => A.code('cpp', lines, h, o);
  const PP = (prompt, code, ans, hint, expl) => Object.assign(A.predict(prompt, code, ans, hint, expl), { lang: 'cpp' });

  A.track({
    id: 'cpp', title: 'C++', tag: 'C++',
    desc: 'C mit Klassen und einer großen Standardbibliothek: Variablen, Funktionen, Vektoren, Referenzen, Klassen und Vererbung.',
    intro: 'C++ baut auf C auf und fügt **Klassen**, **Referenzen** und eine mächtige **Standardbibliothek** (`string`, `vector`, `map`) hinzu. Du hast weiter die Kontrolle über den Speicher, musst dich aber im Alltag viel seltener darum kümmern als in C.\n\nZum Ausprobieren brauchst du einen Compiler, z. B. **g++** (unter Windows über MSYS2 oder WSL). Übersetzen: `g++ -std=c++17 -Wall main.cpp -o main`, starten: `./main`.',
    lessons: [
      {
        concept: 'hello',
        parts: [
          C(['#include <iostream>§Bindet die Ein-/Ausgabe ein. Ohne diese Zeile kennt C++ cout nicht.', 'using namespace std;§Erlaubt, cout statt std::cout zu schreiben. Für Lernbeispiele bequem.', '', 'int main() {§Hier beginnt jedes C++-Programm.', '    cout << "Hallo Welt" << endl;§cout ist die Ausgabe. Mit << „schiebst“ du Dinge hinein. endl macht einen Zeilenumbruch.', '    return 0;§0 bedeutet: Programm war erfolgreich.', '}§Ende von main.'], 'Dein erstes C++-Programm')
        ],
        tips: [A.info('Statt `endl` kannst du auch `"\\n"` schreiben. `endl` leert zusätzlich den Ausgabepuffer, das ist langsamer.')],
        quiz: [A.q('Was macht `<<` in `cout << "Hallo"`?', ['Es schiebt den Text in die Ausgabe', 'Es vergleicht zwei Werte', 'Es verschiebt Bits nach links in diesem Fall', 'Es kommentiert aus'], 0, 'Bei cout „füttert“ << die Ausgabe.')],
        tasks: [PP('Was gibt das Programm aus?', ['cout << "a" << endl;', 'cout << "b";', 'cout << "c" << endl;'], 'a\nbc', 'endl macht einen Umbruch, sonst nichts.')]
      },
      {
        concept: 'vars',
        parts: [
          C(['int alter = 25;§Ganze Zahl.', 'double preis = 19.99;§Kommazahl mit Punkt.', 'string name = "Ada";§string ist Text (aus <string>, meist schon durch iostream dabei).', 'bool istStudent = true;§bool: nur true oder false.', "char buchstabe = 'A';§Ein Zeichen in einfachen Anführungszeichen.", 'alter = alter + 1;§Neu zuweisen: 26.', 'cout << name << " ist " << alter << endl;§Mehrere << hintereinander. Ausgabe: Ada ist 26'], 'Variablen mit festem Typ'),
          C(['const int MAX_PUNKTE = 100;§const: nicht mehr änderbar.', 'auto zahl = 42;§auto lässt den Compiler den Typ erkennen (int). Er bleibt fest.', 'int ergebnis = stoi("25");§stoi wandelt Text in eine Zahl um.', 'string text = to_string(25);§to_string wandelt eine Zahl in Text um.'], 'const, auto und Umwandlungen'),
          C(['string eingabe;§Platz für den Text.', 'cout << "Dein Name: ";§Fragt nach.', 'cin >> eingabe;§cin liest ein Wort von der Tastatur. >> „holt“ den Wert in die Variable.', 'cout << "Hallo " << eingabe << "!" << endl;§Gibt ihn wieder aus.'], 'Eingabe mit cin')
        ],
        tips: [A.warn('Eine Variable ohne Startwert (`int x;`) enthält Zufallsmüll, wie in C. Gib jeder Variable sofort einen Wert.')],
        quiz: [A.q('Wofür nutzt man `const`?', ['Für Werte, die sich nicht mehr ändern dürfen', 'Für Werte, die nur in Schleifen gelten', 'Für Zahlen mit festen Nachkommastellen', 'Für Variablen, die global sichtbar sein sollen'], 0, 'const verbietet spätere Änderungen.')],
        tasks: [PP('Was gibt das Programm aus?', ['int x = 3;', 'int y = x;', 'x = 10;', 'cout << x << " " << y << endl;'], '10 3', 'y bekam den Wert 3, bevor x geändert wurde.'), A.fill('Ergänze den Datentyp für ganze Zahlen.', '{{int}} anzahl = 5;', 'Gesucht ist der übliche Typ für ganze Zahlen ohne Komma, 4 Byte groß.')]
      },
      {
        concept: 'ops',
        parts: [
          C(['cout << 7 + 3 << endl;§Addition: 10', 'cout << 7 / 2 << endl;§**Achtung:** Zwei int werden **ganzzahlig** geteilt: 3', 'cout << 7 / 2.0 << endl;§Mit einer Kommazahl normal: 3.5', 'cout << 7 % 2 << endl;§Rest der Division: 1', 'cout << (5 > 3 && 5 < 10) << endl;§&& ist UND. Ein bool wird als 1 (wahr) oder 0 (falsch) ausgegeben: 1', 'cout << !(5 == 5) << endl;§! ist NICHT: 0', 'cout << (5 != 4) << endl;§ungleich: 1'], 'Rechnen, Vergleichen, Verknüpfen'),
          C(['string a = "Hallo";§Ein Text.', 'string b = "Hal";§Ein Textanfang.', 'b += "lo";§Hängt an: Hallo.', 'cout << (a == b) << endl;§In C++ vergleicht == bei string den **Inhalt**: 1'], 'Texte vergleichen')
        ],
        tips: [A.warn('Klammere Vergleiche in `cout << (…)`: Ohne Klammern trifft `<<` mit den Operatoren zusammen und der Compiler meldet Unsinn.')],
        quiz: [A.q('Was ergibt `7 / 2` bei zwei int-Zahlen?', ['3', '3.5', '4', '3.0'], 0, 'Ganzzahl-Division schneidet die Nachkommastellen ab.')],
        tasks: [PP('Was gibt das Programm aus?', ['cout << 17 / 5 << endl;', 'cout << 17 % 5 << endl;'], '3\n2', 'Beides sind int: ganzzahlige Division und Rest.')]
      },
      {
        concept: 'cond',
        parts: [
          C(['int temperatur = 22;§Der Wert, nach dem entschieden wird.', 'if (temperatur > 25) {§Bedingung in Klammern, Block in geschweiften Klammern.', '    cout << "heiß" << endl;§Nur bei erfüllter Bedingung.', '} else if (temperatur > 15) {§Nur geprüft, wenn die erste falsch war.', '    cout << "angenehm" << endl;§22 > 15: Ausgabe angenehm.', '} else {§Alle übrigen Fälle.', '    cout << "kühl" << endl;§Hier nicht erreicht.', '}§Ende.'], 'if, else if, else'),
          C(['int tag = 3;§Ein Wert mit mehreren festen Fällen.', 'switch (tag) {§switch wählt anhand des Werts einen Fall.', '    case 1:§Fall: tag ist 1.', '        cout << "Montag" << endl;§Bei 1.', '        break;§break beendet den switch. **Ohne break läuft es in den nächsten Fall weiter!**', '    case 3:§Fall: tag ist 3.', '        cout << "Mittwoch" << endl;§Hier landest du.', '        break;§Beendet den switch.', '    default:§Alle anderen Werte.', '        cout << "anderer Tag" << endl;§Auffangfall.', '}§Ende.'], 'switch für feste Fälle')
        ],
        tips: [A.warn('Wie in C ist `if (x = 5)` erlaubt, setzt x auf 5 und ist immer wahr. Vergleichen heißt `==`. Übersetze mit `-Wall`, dann warnt dich der Compiler.')],
        quiz: [A.q('Was passiert in einem `switch` ohne `break`?', ['Das Programm läuft in den nächsten Fall weiter', 'Der Compiler meldet einen Fehler und übersetzt nicht', 'Der switch endet nach dem Fall trotzdem', 'Der Fall wird übersprungen'], 0, 'Man nennt das „Durchfallen“.')],
        tasks: [PP('Was wird ausgegeben?', ['int x = 10;', 'if (x > 5 && x < 8) {', '    cout << "A";', '} else if (x > 5) {', '    cout << "B";', '} else {', '    cout << "C";', '}'], 'B', 'Bei `&&` müssen beide Vergleiche stimmen. Prüfe jeden einzeln mit dem Wert von x, bevor du dich für einen Zweig entscheidest.')]
      },
      {
        concept: 'loops',
        parts: [
          C(['for (int i = 1; i <= 3; i++) {§Start (int i = 1), Bedingung (i <= 3), Schritt (i++). Läuft für 1, 2, 3.', '    cout << "Durchlauf " << i << endl;§Schleifenkörper.', '}§Ende.'], 'Zählschleife for'),
          C(['int zahl = 1;§Startwert.', 'while (zahl < 50) {§Bedingung wird vor jedem Durchlauf geprüft.', '    zahl = zahl * 3;§Etwas muss sich ändern, sonst läuft es ewig.', '}§Ende.', 'cout << zahl << endl;§Ausgabe: 81'], 'Bedingungsschleife while'),
          C(['vector<string> farben = {"rot", "grün", "blau"};§Ein vector (siehe nächste Lektionen) mit drei Texten.', 'for (string farbe : farben) {§Die **bereichsbasierte** for-Schleife: „für jede farbe in farben“.', '    cout << farbe << endl;§Gibt rot, grün, blau aus.', '}§Ende.'], 'Alle Elemente durchlaufen')
        ],
        tips: [A.warn('Ein Semikolon direkt nach `for (…)` oder `while (…)` macht den Block danach unabhängig von der Schleife.')],
        quiz: [A.q('Wie oft läuft `for (int i = 0; i < 5; i++)`?', ['5-mal', '4-mal', '6-mal', 'Nie'], 0, 'i ist 0, 1, 2, 3, 4.')],
        tasks: [PP('Was wird ausgegeben? (Eine Zahl pro Zeile.)', ['for (int i = 0; i < 3; i++) {', '    cout << i * 2 << endl;', '}'], '0\n2\n4', 'i ist 0, 1 und 2.')]
      },
      {
        concept: 'funcs',
        parts: [
          C(['#include <iostream>§Ein-/Ausgabe.', 'using namespace std;§Kurzschreibweise.', '', 'int flaeche(int laenge, int breite) {§Eine Funktion: **Rückgabetyp**, Name, Parameter mit Typ. Sie muss vor dem Aufruf stehen.', '    return laenge * breite;§Liefert das Ergebnis.', '}§Ende.', '', 'void gruss(string name) {§void: gibt nichts zurück.', '    cout << "Hallo " << name << "!" << endl;§Eine Ausgabe.', '}§Ende.', '', 'int main() {§Hier startet das Programm.', '    int raum = flaeche(4, 5);§Aufruf: Ergebnis 20.', '    cout << "Raumgröße: " << raum << endl;§Gibt aus: Raumgröße: 20', '    gruss("Ada");§Gibt aus: Hallo Ada!', '    return 0;§Erfolgreich beendet.', '}§Ende.'], 'Funktionen mit Rückgabewert und void'),
          C(['void erhoehe(int &zahl) {§Das **&** macht zahl zu einer **Referenz**: ein zweiter Name für das Original, keine Kopie.', '    zahl = zahl + 1;§Ändert das Original.', '}§Ende.', '', 'int a = 5;§Die Variable.', 'erhoehe(a);§Kein & beim Aufruf nötig.', 'cout << a << endl;§Ausgabe: 6'], 'Referenzen: das Original ändern')
        ],
        tips: [A.info('Ohne `&` bekommt die Funktion wie in C eine **Kopie**. Große Objekte (lange Texte, Listen) übergibt man gern als `const string &text`: keine Kopie, aber auch keine Änderung.')],
        quiz: [A.q('Was bewirkt `int &zahl` als Parameter?', ['Die Funktion arbeitet am Original statt an einer Kopie', 'Die Funktion bekommt eine Kopie, die sie nicht ändern darf', 'Die Funktion gibt die Adresse von zahl zurück', 'Die Zahl wird vor dem Aufruf in int umgewandelt'], 0, 'Eine Referenz ist ein zweiter Name für dieselbe Variable.')],
        tasks: [PP('Was wird ausgegeben?', ['int doppelt(int n) {', '    return n * 2;', '}', '// in main:', 'cout << doppelt(doppelt(3)) << endl;'], '12', 'Bei verschachtelten Aufrufen wird der innere zuerst ausgerechnet. Sein Ergebnis ist das Argument für den äußeren.')]
      },
      {
        concept: 'coll',
        parts: [
          C(['#include <vector>§Holt die Klasse vector.', 'vector<int> zahlen = {4, 9, 7, 1};§Ein **vector** ist eine Liste, die wachsen kann. In <> steht der Typ der Elemente.', 'cout << zahlen[0] << endl;§Zugriff wie bei einem Array: 4', 'zahlen.push_back(5);§push_back hängt ein Element hinten an.', 'cout << zahlen.size() << endl;§size() ist die Anzahl: 5', 'for (int z : zahlen) {§Alle durchlaufen.', '    cout << z << endl;§Gibt jedes Element aus.', '}§Ende.'], 'vector: eine Liste, die wächst'),
          C(['#include <map>§Holt die Klasse map.', 'map<string, int> alter;§Eine **map** speichert Paare aus Schlüssel (Text) und Wert (Zahl).', 'alter["Ada"] = 36;§Fügt ein Paar hinzu oder ersetzt den Wert.', 'cout << alter["Ada"] << endl;§Zugriff über den Schlüssel: 36'], 'map: Schlüssel und Werte')
        ],
        tips: [A.warn('`zahlen[10]` bei einem kleineren vector wird **nicht** geprüft und führt zu undefiniertem Verhalten. Sicherer ist `zahlen.at(10)`: Das wirft einen Fehler (`out_of_range`), statt still falschen Speicher zu lesen.')],
        quiz: [A.q('Was macht `push_back` bei einem vector?', ['Hängt ein Element hinten an', 'Löscht das letzte Element', 'Sortiert den vector', 'Leert den vector'], 0, 'push_back fügt am Ende ein Element hinzu.')],
        tasks: [PP('Was gibt das Programm aus?', ['vector<int> l = {10, 20, 30};', 'l.push_back(40);', 'cout << l[0] << " " << l[3] << " " << l.size() << endl;'], '10 40 4', 'Nach push_back hat der vector vier Elemente, der Index des letzten ist 3.')]
      },
      {
        concept: 'oop',
        parts: [
          C(['#include <iostream>§Ein-/Ausgabe.', '#include <string>§Für string.', 'using namespace std;§Kurzschreibweise.', '', 'class Konto {§Beginnt die Klasse Konto.', 'private:§Alles darunter ist von außen **nicht** erreichbar (Kapselung).', '    string inhaber;§Ein privates Attribut.', '    double kontostand;§Auch privat.', '', 'public:§Alles darunter darf von außen benutzt werden.', '    Konto(string name) {§Der **Konstruktor**: heißt wie die Klasse, kein Rückgabetyp.', '        inhaber = name;§Setzt den Inhaber.', '        kontostand = 0;§Startwert.', '    }§Ende des Konstruktors.', '', '    void einzahlen(double betrag) {§Eine öffentliche Methode.', '        kontostand += betrag;§Erhöht den Kontostand.', '    }§Ende.', '', '    bool abheben(double betrag) {§Liefert true oder false.', '        if (betrag <= kontostand) {§Genug Geld da?', '            kontostand -= betrag;§Abziehen.', '            return true;§Hat geklappt.', '        }§Ende von if.', '        return false;§Abgelehnt.', '    }§Ende.', '', '    double getKontostand() const {§Ein **Getter**. const hinter der Klammer heißt: Diese Methode ändert das Objekt nicht.', '        return kontostand;§Gibt den Wert zurück.', '    }§Ende.', '};§Ende der Klasse. **Hier steht ein Semikolon!**'], 'Eine Klasse mit Kapselung'),
          C(['Konto k("Ada");§Erzeugt ein Objekt und ruft den Konstruktor auf. Kein new nötig.', 'k.einzahlen(100);§Methode am Objekt aufrufen: Kontostand 100.', 'bool ok = k.abheben(30);§Hebt 30 ab: true.', 'cout << ok << " " << k.getKontostand() << endl;§Gibt aus: 1 70'], 'Objekt benutzen (in main)'),
          C(['class Tier {§Basisklasse.', 'public:§Öffentlicher Teil.', '    virtual string laut() {§**virtual**: Unterklassen dürfen diese Methode ersetzen.', '        return "...";§Standardlaut.', '    }§Ende.', '    virtual ~Tier() {}§Ein **virtueller Destruktor**: Pflicht, wenn man über Basiszeiger arbeitet.', '};§Ende von Tier.', '', 'class Hund : public Tier {§Der Doppelpunkt: Hund erbt öffentlich von Tier.', 'public:§Öffentlicher Teil.', '    string laut() override {§**override**: ersetzt die Methode der Basisklasse. Der Compiler prüft das.', '        return "Wau";§Hunde sagen Wau.', '    }§Ende.', '};§Ende von Hund.', '', 'Hund h;§Ein Hund-Objekt.', 'Tier *t = &h;§Ein **Zeiger** auf Tier darf auf einen Hund zeigen (Polymorphie).', 'cout << t->laut() << endl;§-> ruft die Methode über den Zeiger auf. Es erscheint "Wau".'], 'Vererbung und Polymorphie')
        ],
        tips: [A.info('Ohne `virtual` würde `t->laut()` die Methode von **Tier** aufrufen, obwohl dort ein Hund liegt. Polymorphie braucht in C++ ausdrücklich `virtual`.')],
        quiz: [A.q('Was bewirkt `private:` in einer Klasse?', ['Alles darunter ist von außen nicht erreichbar', 'Alles darunter ist nur für Unterklassen und die Klasse selbst sichtbar', 'Alles darunter wird als Konstante angelegt', 'Alles darunter wird beim Kopieren übersprungen'], 0, 'private: ist die Grundlage der Kapselung.'), A.q('Wozu dient `virtual`?', ['Eine Unterklasse darf die Methode ersetzen, aufgerufen wird die des echten Objekts', 'Die Methode existiert nur im Speicher und wird beim Beenden gelöscht', 'Die Methode ist nur für Unterklassen sichtbar, nicht für andere Klassen', 'Die Methode wird beim Übersetzen eingesetzt und läuft dadurch schneller'], 0, 'virtual ermöglicht Polymorphie.')],
        tasks: [PP('Was gibt das Programm aus?', ['Konto k("Ada");', 'k.einzahlen(50);', 'k.einzahlen(25);', 'cout << k.getKontostand() << endl;'], '75', 'Verfolge den Kontostand nach jedem Methodenaufruf. Achte darauf, wie `cout` ein double ohne Nachkommaanteil ausgibt.')]
      },
      {
        concept: 'err',
        parts: [
          C(['#include <stdexcept>§Holt die Standard-Fehlerklassen.', 'try {§Hier steht der Code, der schiefgehen kann.', '    int zahl = stoi("abc");§"abc" ist keine Zahl: löst eine invalid_argument-Ausnahme aus.', '    cout << 10 / zahl << endl;§Wird nicht erreicht.', '} catch (const invalid_argument &e) {§Fängt genau diesen Fehlertyp (als Referenz, ohne Kopie).', '    cout << "Das war keine Zahl" << endl;§Freundliche Meldung statt Absturz.', '} catch (const exception &e) {§Fängt alle übrigen Standardfehler.', '    cout << "Fehler: " << e.what() << endl;§e.what() liefert die Beschreibung.', '}§Ende.'], 'try und catch'),
          C(['terminate called after throwing an instance of \'std::out_of_range\'§**Art** des Fehlers: Eine Ausnahme wurde ausgelöst, aber nirgends gefangen. Das Programm bricht ab.', '  what():  vector::_M_range_check: __n (which is 10) >= this->size() (which is 4)§Die Erklärung: Zugriff auf Index 10, obwohl der vector nur 4 Elemente hat.'], 'Eine Fehlermeldung lesen', { noRun: true })
        ],
        tips: [A.info('Mit `throw runtime_error("…");` löst du selbst einen Fehler aus. Anders als in Java gibt es keine Pflicht, Fehler zu fangen.')],
        quiz: [A.q('Welches Schlüsselwort löst absichtlich eine Ausnahme aus?', ['throw', 'catch', 'try', 'raise'], 0, '`throw runtime_error("…")` meldet einen Fehler.')],
        tasks: []
      },
      {
        id: 'adv', stage: 4, title: 'Vertiefung: Zeiger, Speicher und die Standardbibliothek',
        goal: 'Du verstehst Zeiger und new/delete, kennst smart pointers und kannst einfache Algorithmen aus der Standardbibliothek lesen.',
        parts: [
          A.text('Zeiger und new/delete', 'Wie in C ist ein **Zeiger** eine Variable mit einer Adresse. Mit `new` legst du ein Objekt dynamisch an, mit `delete` gibst du es wieder frei. **Wer `delete` vergisst, hat ein Speicherleck.**'),
          C(['int *p = new int(5);§new legt einen int mit Wert 5 im Speicher an und liefert dessen Adresse.', '*p = *p + 1;§Ändert den Wert über den Zeiger: 6.', 'cout << *p << endl;§Ausgabe: 6', 'delete p;§**Freigeben!** Danach darf p nicht mehr benutzt werden.'], 'new und delete'),
          A.text('Smart Pointer', 'Moderne C++-Programme vermeiden rohes `new`/`delete`. Ein **`unique_ptr`** gibt sein Objekt **automatisch** frei, wenn er verschwindet.'),
          C(['#include <memory>§Holt unique_ptr und make_unique.', '{§Ein Block (z. B. eine Funktion).', '    auto k = make_unique<Konto>("Ada");§Erzeugt ein Konto und verpackt es in einem unique_ptr.', '    k->einzahlen(100);§Benutzung wie ein normaler Zeiger.', '}§Am Blockende wird das Konto **automatisch** freigegeben. Kein delete nötig.'], 'unique_ptr', { noRun: true }),
          A.text('Algorithmen und Lambdas', 'Die Standardbibliothek bringt fertige Algorithmen mit (zum Beispiel `sort` und `count_if`). Ein **Lambda** ist eine kurze namenlose Funktion: `[](int x) { return x % 2 == 0; }` heißt „nimm x, prüfe ob gerade“.'),
          C(['#include <algorithm>§Für sort, count_if und mehr.', 'vector<int> zahlen = {5, 2, 8, 1, 4};§Ausgangsdaten.', 'sort(zahlen.begin(), zahlen.end());§Sortiert aufsteigend. begin() und end() markieren den Bereich.', 'int gerade = count_if(zahlen.begin(), zahlen.end(), [](int x) { return x % 2 == 0; });§Zählt die Elemente, für die das Lambda true liefert: 2, 4, 8 sind gerade, also 3.', 'cout << zahlen[0] << " " << gerade << endl;§Ausgabe: 1 3'], 'sort und count_if')
        ],
        tips: [A.warn('Rohe Zeiger mit `new` sind die häufigste Fehlerquelle in C++. Faustregel: Nimm Objekte direkt (`Konto k;`), `vector` und `unique_ptr`, und rufe `new` gar nicht selbst auf.')],
        quiz: [A.q('Wozu dient `unique_ptr`?', ['Er gibt sein Objekt automatisch frei', 'Er teilt sein Objekt mit beliebig vielen Besitzern', 'Er macht aus jedem Zeiger eine Kopie', 'Er prüft, ob ein Zeiger auf null zeigt'], 0, 'Das nennt man RAII: Aufräumen passiert automatisch.'), A.q('Wofür steht `[](int x) { return x * 2; }`?', ['Ein Lambda: nimm x und liefere x * 2', 'Ein leeres Array, gefüllt mit x * 2', 'Eine Klasse mit einer Methode für x * 2', 'Ein Makro, das der Präprozessor ersetzt'], 0, 'Ein Lambda ist eine kurze Funktion ohne Namen.')],
        tasks: [PP('Was wird ausgegeben?', ['int *p = new int(5);', '*p = *p + 3;', 'cout << *p << endl;', 'delete p;'], '8', '*p ist der Wert, auf den p zeigt.', 'Über den Zeiger wird der Wert 5 + 3 = 8.')]
      }
    ]
  });
})();
