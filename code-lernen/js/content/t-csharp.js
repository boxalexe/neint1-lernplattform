/* Kurs: C# */
(function () {
  'use strict';
  const A = window.Academy, C = (lines, h, o) => A.code('csharp', lines, h, o);
  const PP = (prompt, code, ans, hint, expl) => Object.assign(A.predict(prompt, code, ans, hint, expl), { lang: 'csharp' });

  A.track({
    id: 'csharp', title: 'C#', tag: 'C#',
    desc: 'Die moderne Sprache der .NET-Welt: ähnlich wie Java, aber kompakter. Variablen, Methoden, Listen, Klassen, Eigenschaften und LINQ.',
    intro: 'C# (gesprochen „C Sharp“) ist streng typisiert und objektorientiert wie Java, aber mit weniger Schreibarbeit. Du brauchst das **.NET SDK** (dotnet.microsoft.com). Neues Projekt: `dotnet new console -o Demo`, dann im Ordner `dotnet run`.\n\nSeit C# 9 darf die Datei `Program.cs` direkt mit Anweisungen beginnen („Top-Level-Statements“). Alle Beispiele hier zeigen deshalb **nur den eigentlichen Code**, ohne Klasse und `Main` drumherum.',
    lessons: [
      {
        concept: 'hello',
        parts: [
          C(['Console.WriteLine("Hallo Welt");§Gibt den Text aus und macht einen Zeilenumbruch. Console ist eine Klasse, WriteLine eine Methode. Jede Anweisung endet mit **;**.', 'Console.Write("ohne Umbruch");§Write macht **keinen** Zeilenumbruch.'], 'Dein erstes C#-Programm'),
          C(['using System;§Macht die Klasse Console ohne Vorsatz nutzbar. In neuen Projekten ist das meist schon automatisch da.', '', 'class Programm {§Die klassische Form: alles in einer Klasse.', '    static void Main() {§Hier beginnt das Programm.', '        Console.WriteLine("Hallo");§Die Ausgabe.', '    }§Ende von Main.', '}§Ende der Klasse.'], 'Die ausführliche Form')
        ],
        tips: [A.warn('C# unterscheidet Groß- und Kleinschreibung: `Console.WriteLine`, nicht `console.writeline`.')],
        quiz: [A.q('Welche Anweisung gibt Text mit Zeilenumbruch aus?', ['Console.WriteLine', 'Console.Write', 'print', 'echo'], 0, 'WriteLine hängt einen Zeilenumbruch an, Write nicht.')],
        tasks: [PP('Was gibt das Programm aus?', ['Console.WriteLine("a");', 'Console.Write("b");', 'Console.WriteLine("c");'], 'a\nbc', 'WriteLine macht einen Umbruch, Write nicht.', 'Nach "a" folgt ein Umbruch. Dann stehen b und c in derselben Zeile.')]
      },
      {
        concept: 'vars',
        parts: [
          C(['int alter = 25;§**Typ Name = Wert**. int ist eine ganze Zahl.', 'double preis = 19.99;§double für Kommazahlen, Punkt als Trenner.', 'string name = "Ada";§string (klein!) ist Text in doppelten Anführungszeichen.', 'bool istStudent = true;§bool: nur true oder false (klein).', "char buchstabe = 'A';§char ist **ein** Zeichen in einfachen Anführungszeichen.", 'alter = alter + 1;§Neu zuweisen: ohne Typ. Jetzt 26.', 'Console.WriteLine($"{name} ist {alter}");§Das **$** vor dem Text macht eine Interpolation: Was in {} steht, wird eingesetzt. Ausgabe: Ada ist 26'], 'Variablen mit festem Typ'),
          C(['var zahl = 42;§var lässt C# den Typ erkennen (int). Er bleibt trotzdem fest.', 'const int MaxPunkte = 100;§const: Konstante, nicht mehr änderbar.', 'int ergebnis = int.Parse("25");§Wandelt Text in eine Zahl um. Bei ungültigem Text gibt es einen Fehler.', 'bool ok = int.TryParse("abc", out int wert);§TryParse versucht es und liefert true/false. Bei Misserfolg ist wert 0.', 'string text = 25.ToString();§Wandelt eine Zahl in Text um.'], 'var, Konstanten und Umwandlungen'),
          C(['Console.Write("Dein Name: ");§Fragt nach.', 'string eingabe = Console.ReadLine();§Liest eine Zeile Text von der Tastatur.', 'Console.WriteLine($"Hallo {eingabe}!");§Setzt die Eingabe ein.'], 'Eingabe von der Tastatur')
        ],
        tips: [A.warn('`int x = "5";` ist ein Fehler beim Übersetzen: Der Compiler lässt keinen Text in einer Zahl-Variable zu. Und `String` oder `string` sind dasselbe, üblich ist `string`.')],
        quiz: [A.q('Was macht das `$` in `$"Hallo {name}"`?', ['Es setzt Werte in den Text ein', 'Es macht den Text zu Geld', 'Es kommentiert den Text aus', 'Es wandelt in eine Zahl um'], 0, 'Das ist String-Interpolation.')],
        tasks: [PP('Was gibt das Programm aus?', ['int x = 3;', 'int y = x;', 'x = 10;', 'Console.WriteLine($"{x} {y}");'], '10 3', 'y bekam den Wert 3, bevor x geändert wurde.'), A.fill('Ergänze den Datentyp für ganze Zahlen.', '{{int}} anzahl = 5;', 'Für ganze Zahlen gibt es den Typ int.')]
      },
      {
        concept: 'ops',
        parts: [
          C(['Console.WriteLine(7 + 3);§Addition: 10', 'Console.WriteLine(7 / 2);§**Achtung:** Zwei int werden **ganzzahlig** geteilt: 3 (nicht 3,5!).', 'Console.WriteLine(7 / 2.0);§Mit einer Kommazahl wird normal geteilt: 3,5 (Ausgabe je nach Spracheinstellung mit Komma).', 'Console.WriteLine(7 % 2);§Rest der Division: 1', 'Console.WriteLine(Math.Pow(2, 10));§Potenz über Math: 1024', 'Console.WriteLine(5 > 3 && 5 < 10);§&& = UND. Gibt True aus.', 'Console.WriteLine(!(5 == 5));§! = NICHT, == vergleicht: False', 'Console.WriteLine(5 != 4);§!= bedeutet ungleich: True'], 'Rechnen, Vergleichen, Verknüpfen'),
          C(['string a = "Hallo";§Ein Text.', 'string b = "Hal" + "lo";§Zusammengesetzt, gleicher Inhalt.', 'Console.WriteLine(a == b);§In C# vergleicht == bei string den **Inhalt**: True (anders als in Java!).'], 'Texte vergleichen')
        ],
        tips: [A.warn('`7 / 2` ergibt in C# **3**. Willst du 3,5, schreibe `7 / 2.0` oder `(double)7 / 2`.')],
        quiz: [A.q('Was ergibt `7 / 2` bei zwei int-Zahlen?', ['3', '3,5', '4', '3,0'], 0, 'Ganzzahl-Division schneidet die Nachkommastellen ab.')],
        tasks: [PP('Was gibt das Programm aus?', ['Console.WriteLine(17 / 5);', 'Console.WriteLine(17 % 5);'], '3\n2', 'Beides sind int. 17 / 5 ist ganzzahlig, % liefert den Rest.')]
      },
      {
        concept: 'cond',
        parts: [
          C(['int temperatur = 22;§Der Wert, nach dem entschieden wird.', 'if (temperatur > 25) {§Bedingung in Klammern, Block in geschweiften Klammern.', '    Console.WriteLine("heiß");§Nur bei erfüllter Bedingung.', '} else if (temperatur > 15) {§Nur geprüft, wenn die erste falsch war.', '    Console.WriteLine("angenehm");§22 > 15: Ausgabe angenehm.', '} else {§Alle übrigen Fälle.', '    Console.WriteLine("kühl");§Hier nicht erreicht.', '}§Ende.'], 'if, else if, else'),
          C(['int tag = 3;§Ein Wert mit mehreren festen Fällen.', 'string name = tag switch {§Der **switch-Ausdruck** liefert direkt einen Wert zurück.', '    1 => "Montag",§Ist tag 1, ist das Ergebnis "Montag".', '    2 => "Dienstag",§Ist tag 2: Dienstag.', '    3 => "Mittwoch",§tag ist 3: Mittwoch.', '    _ => "anderer Tag"§Der Unterstrich fängt alle übrigen Werte auf.', '};§Ende, mit Semikolon.', 'Console.WriteLine(name);§Ausgabe: Mittwoch'], 'switch-Ausdruck')
        ],
        tips: [A.info('Die Kurzform `bedingung ? a : b` liefert `a`, wenn die Bedingung stimmt, sonst `b`: `string s = alter >= 18 ? "volljährig" : "minderjährig";`')],
        quiz: [A.q('Wofür steht `_` im switch-Ausdruck?', ['Für alle übrigen Fälle', 'Für einen Fehler', 'Für den ersten Fall', 'Für null'], 0, 'Der Unterstrich ist der Auffangfall.')],
        tasks: [PP('Was wird ausgegeben?', ['int x = 10;', 'if (x > 5 && x < 8) {', '    Console.WriteLine("A");', '} else if (x > 5) {', '    Console.WriteLine("B");', '} else {', '    Console.WriteLine("C");', '}'], 'B', 'Die erste Bedingung braucht x < 8 (falsch), die zweite stimmt.')]
      },
      {
        concept: 'loops',
        parts: [
          C(['for (int i = 1; i <= 3; i++) {§Start (int i = 1), Bedingung (i <= 3), Schritt (i++). Läuft für 1, 2, 3.', '    Console.WriteLine($"Durchlauf {i}");§Schleifenkörper.', '}§Ende.'], 'Zählschleife for'),
          C(['int zahl = 1;§Startwert.', 'while (zahl < 50) {§Bedingung wird vor jedem Durchlauf geprüft.', '    zahl = zahl * 3;§Etwas muss sich ändern, sonst läuft es ewig.', '}§Ende.', 'Console.WriteLine(zahl);§Ausgabe: 81'], 'Bedingungsschleife while'),
          C(['string[] farben = { "rot", "grün", "blau" };§Ein Array mit drei Texten.', 'foreach (string farbe in farben) {§**foreach**: „für jede farbe in farben“.', '    Console.WriteLine(farbe);§Gibt rot, grün, blau aus.', '}§Ende.'], 'foreach: alle Elemente durchlaufen')
        ],
        tips: [A.warn('Ein Semikolon direkt nach `for (…)` oder `while (…)` macht den Block danach unabhängig von der Schleife.')],
        quiz: [A.q('Wie oft läuft `for (int i = 0; i < 5; i++)`?', ['5-mal', '4-mal', '6-mal', 'Nie'], 0, 'i ist 0, 1, 2, 3, 4.')],
        tasks: [PP('Was wird ausgegeben? (Eine Zahl pro Zeile.)', ['for (int i = 0; i < 3; i++) {', '    Console.WriteLine(i * 2);', '}'], '0\n2\n4', 'i ist 0, 1 und 2.')]
      },
      {
        concept: 'funcs',
        parts: [
          C(['static int Flaeche(int laenge, int breite) {§Eine Methode: **Rückgabetyp** (int), Name, Parameter mit Typ. Methodennamen schreibt man in C# groß (PascalCase).', '    return laenge * breite;§return liefert das Ergebnis.', '}§Ende.', '', 'static void Gruss(string name) {§void: gibt nichts zurück.', '    Console.WriteLine($"Hallo {name}!");§Macht nur eine Ausgabe.', '}§Ende.', '', 'int raum = Flaeche(4, 5);§Aufruf: Ergebnis 20.', 'Console.WriteLine($"Raumgröße: {raum}");§Gibt aus: Raumgröße: 20', 'Gruss("Ada");§Gibt aus: Hallo Ada!'], 'Methoden mit Rückgabewert und void'),
          C(['static int Quadrat(int n) => n * n;§Mit **=>** schreibst du kurze Methoden in einer Zeile: „liefert n * n“.', 'Console.WriteLine(Quadrat(6));§Ausgabe: 36'], 'Kurzform mit =>')
        ],
        tips: [A.info('Parameter dürfen **Standardwerte** haben: `static void Gruss(string name = "Welt")`. Dann geht auch `Gruss();`.')],
        quiz: [A.q('Was bedeutet `void`?', ['Die Methode gibt nichts zurück', 'Die Methode gibt 0 zurück', 'Die Methode ist leer', 'Die Methode ist privat'], 0, 'void bedeutet „kein Rückgabewert“.')],
        tasks: [PP('Was wird ausgegeben?', ['static int Doppelt(int n) => n * 2;', 'Console.WriteLine(Doppelt(Doppelt(3)));'], '12', 'Doppelt(3) ist 6, dann Doppelt(6) ist 12.')]
      },
      {
        concept: 'coll',
        parts: [
          C(['int[] zahlen = { 4, 9, 7, 1 };§Ein **Array** fester Größe.', 'Console.WriteLine(zahlen[0]);§Erstes Element, Index 0: 4', 'zahlen[1] = 20;§Ersetzt das zweite Element.', 'Console.WriteLine(zahlen.Length);§Length (ohne Klammern) ist die Anzahl: 4'], 'Arrays mit fester Größe'),
          C(['using System.Collections.Generic;§Für List, Dictionary usw. (in neuen Projekten oft schon automatisch da).', 'List<string> namen = new List<string>();§Eine **Liste**, die wachsen kann. In <> steht, was sie enthält.', 'namen.Add("Ada");§Add hängt etwas an.', 'namen.Add("Alan");§Noch ein Element.', 'Console.WriteLine(namen[0]);§Zugriff wie bei einem Array: Ada', 'Console.WriteLine(namen.Count);§Count ist die Anzahl: 2', 'foreach (string n in namen) {§Alle durchlaufen.', '    Console.WriteLine(n);§Gibt jeden Namen aus.', '}§Ende.'], 'List<T>: eine Liste, die wächst'),
          C(['var alter = new Dictionary<string, int>();§Ein **Dictionary** speichert Paare aus Schlüssel (Text) und Wert (Zahl).', 'alter["Ada"] = 36;§Fügt ein Paar hinzu oder ersetzt den Wert.', 'Console.WriteLine(alter["Ada"]);§Zugriff über den Schlüssel: 36'], 'Dictionary: Schlüssel und Werte')
        ],
        tips: [A.warn('Merke dir: Array hat `.Length`, Liste hat `.Count`, Text hat `.Length`. Und ein Zugriff außerhalb (`zahlen[10]`) wirft eine **IndexOutOfRangeException**.')],
        quiz: [A.q('Was liefert `zahlen.Length` bei `int[] zahlen = { 4, 9, 7, 1 };`?', ['4', '3', '5', 'Einen Fehler'], 0, 'Das Array hat 4 Elemente, die Indizes laufen von 0 bis 3.')],
        tasks: [PP('Was gibt das Programm aus?', ['int[] l = { 10, 20, 30 };', 'Console.WriteLine($"{l[0]} {l[l.Length - 1]} {l.Length}");'], '10 30 3', 'l[l.Length - 1] ist das letzte Element.')]
      },
      {
        concept: 'oop',
        parts: [
          C(['class Konto {§Beginnt die Klasse Konto.', '    public string Inhaber { get; }§Eine **Eigenschaft** (Property): von außen nur lesbar, kein set.', '    public double Kontostand { get; private set; }§get ist öffentlich, set nur innerhalb der Klasse (Kapselung mit einer Zeile).', '', '    public Konto(string inhaber) {§Der **Konstruktor**: heißt wie die Klasse, kein Rückgabetyp.', '        Inhaber = inhaber;§Setzt den Inhaber.', '        Kontostand = 0;§Startwert.', '    }§Ende des Konstruktors.', '', '    public void Einzahlen(double betrag) {§Eine öffentliche Methode.', '        Kontostand += betrag;§Erhöht den Kontostand (erlaubt, wir sind in der Klasse).', '    }§Ende.', '', '    public bool Abheben(double betrag) {§Liefert true oder false.', '        if (betrag <= Kontostand) {§Genug Geld da?', '            Kontostand -= betrag;§Abziehen.', '            return true;§Hat geklappt.', '        }§Ende von if.', '        return false;§Abgelehnt.', '    }§Ende.', '}§Ende der Klasse.'], 'Eine Klasse mit Eigenschaften'),
          C(['var k = new Konto("Ada");§new erzeugt ein Objekt und ruft den Konstruktor auf.', 'k.Einzahlen(100);§Kontostand 100.', 'bool ok = k.Abheben(30);§Hebt 30 ab: true.', 'Console.WriteLine($"{ok} {k.Kontostand}");§Gibt aus: True 70', '// k.Kontostand = 5;§Wäre ein Fehler: Das set ist privat.'], 'Objekt benutzen'),
          C(['class Tier {§Basisklasse.', '    public virtual string Laut() {§**virtual**: Unterklassen dürfen diese Methode ersetzen.', '        return "...";§Standardlaut.', '    }§Ende.', '}§Ende von Tier.', '', 'class Hund : Tier {§Der **Doppelpunkt** bedeutet: Hund erbt von Tier.', '    public override string Laut() {§**override**: ersetzt die Methode der Basisklasse.', '        return "Wau";§Hunde sagen Wau.', '    }§Ende.', '}§Ende von Hund.', '', 'Tier t = new Hund();§Eine Tier-Variable darf ein Hund-Objekt halten (Polymorphie).', 'Console.WriteLine(t.Laut());§Es erscheint "Wau": Das tatsächliche Objekt entscheidet.'], 'Vererbung und Polymorphie')
        ],
        tips: [A.info('In C# steht `override` zwingend dabei, und die Basismethode muss `virtual` sein. Das Gegenstück zu Javas `@Override` ist also Pflicht, nicht nur eine Markierung.')],
        quiz: [A.q('Was bewirkt `{ get; private set; }` bei einer Eigenschaft?', ['Lesen ist öffentlich, Schreiben nur innerhalb der Klasse', 'Sie ist komplett unsichtbar', 'Sie ist eine Konstante', 'Sie kann nur einmal gelesen werden'], 0, 'So kapselst du ein Attribut mit einer Zeile.'), A.q('Wie erbt in C# die Klasse `Hund` von `Tier`?', ['class Hund : Tier', 'class Hund extends Tier', 'class Hund inherits Tier', 'class Hund(Tier)'], 0, 'Der Doppelpunkt kennzeichnet die Vererbung.')],
        tasks: [PP('Was gibt das Programm aus?', ['var k = new Konto("Ada");', 'k.Einzahlen(50);', 'k.Einzahlen(25);', 'Console.WriteLine(k.Kontostand);'], '75', 'Zwei Einzahlungen: 50 + 25.', 'Console.WriteLine gibt ein double ohne Nachkommastellen aus, wenn es ganzzahlig ist.')]
      },
      {
        concept: 'err',
        parts: [
          C(['try {§Hier steht der Code, der schiefgehen kann.', '    int zahl = int.Parse("abc");§"abc" ist keine Zahl: löst eine FormatException aus.', '    Console.WriteLine(10 / zahl);§Wird nicht erreicht.', '} catch (FormatException) {§Fängt genau diesen Fehlertyp.', '    Console.WriteLine("Das war keine Zahl");§Freundliche Meldung statt Absturz.', '} catch (DivideByZeroException ex) {§Ein anderer Fehlertyp: Division durch 0.', '    Console.WriteLine($"Rechenfehler: {ex.Message}");§ex.Message liefert die Beschreibung.', '} finally {§Läuft immer.', '    Console.WriteLine("Fertig");§Ausgabe: Fertig', '}§Ende.'], 'try, catch und finally'),
          C(['Unhandled exception. System.IndexOutOfRangeException: Index was outside the bounds of the array.§**Art** des Fehlers und Erklärung: Zugriff außerhalb des Arrays. Das liest du zuerst.', '   at Program.<Main>$(String[] args) in Program.cs:line 5§**Wo**: Datei und **Zeilennummer** (hier Zeile 5).'], 'Eine Fehlermeldung lesen', { noRun: true })
        ],
        tips: [A.info('Mit `throw new ArgumentException("…");` löst du selbst einen Fehler aus, zum Beispiel wenn ein Parameter nicht passt.')],
        quiz: [A.q('Welches Schlüsselwort löst absichtlich eine Ausnahme aus?', ['throw', 'catch', 'finally', 'try'], 0, '`throw new …` meldet einen Fehler.')],
        tasks: []
      },
      {
        id: 'adv', stage: 4, title: 'Vertiefung: Schnittstellen und LINQ',
        goal: 'Du kennst Schnittstellen in C# und kannst einfache LINQ-Abfragen lesen.',
        parts: [
          A.text('Schnittstellen (interface)', 'Eine **Schnittstelle** legt fest, **was** eine Klasse können muss. Namen beginnen in C# üblicherweise mit **I**.'),
          C(['interface IZahlungsart {§Schnittstelle, Name mit I am Anfang.', '    bool Bezahlen(double betrag);§Wer sie umsetzt, **muss** diese Methode anbieten.', '}§Ende.', '', 'class Kreditkarte : IZahlungsart {§Auch hier der Doppelpunkt: Die Klasse setzt die Schnittstelle um.', '    public bool Bezahlen(double betrag) {§Muss public sein.', '        Console.WriteLine($"Karte: {betrag}");§Das eigene Verhalten.', '        return true;§Erfolgreich.', '    }§Ende.', '}§Ende.', '', 'IZahlungsart z = new Kreditkarte();§Die Variable kennt nur die Schnittstelle.', 'z.Bezahlen(49.9);§Funktioniert mit jeder Klasse, die IZahlungsart umsetzt.'], 'Eine Schnittstelle umsetzen'),
          A.text('LINQ', '**LINQ** ist eine Sammlung von Methoden, mit denen du Listen **abfragen** kannst: filtern, sortieren, umwandeln. Ähnlich wie SQL, nur direkt im Code. Das `x => …` ist ein **Lambda**: eine kurze namenlose Funktion.'),
          C(['using System.Linq;§Holt die LINQ-Methoden (in neuen Projekten oft automatisch da).', 'int[] zahlen = { 1, 2, 3, 4, 5 };§Ausgangsdaten.', 'var gerade = zahlen.Where(x => x % 2 == 0);§Where behält nur Elemente, für die das Lambda true liefert: 2 und 4.', 'var verdoppelt = gerade.Select(x => x * 2);§Select wandelt jedes Element um: 4 und 8.', 'Console.WriteLine(string.Join(", ", verdoppelt));§Join fügt alles zu einem Text zusammen: 4, 8', 'Console.WriteLine(zahlen.Sum());§Sum addiert alle: 15'], 'LINQ: Where, Select, Sum')
        ],
        tips: [],
        quiz: [A.q('Wofür steht `x => x * 2`?', ['Ein Lambda: nimm x und liefere x * 2', 'Eine Zuweisung', 'Ein Vergleich', 'Eine Schleife'], 0, 'Ein Lambda ist eine kurze Funktion ohne Namen.'), A.q('Was macht `Where` in LINQ?', ['Es filtert Elemente nach einer Bedingung', 'Es sortiert die Liste', 'Es löscht die Liste', 'Es zählt die Elemente'], 0, 'Where behält nur Elemente, für die die Bedingung stimmt.')],
        tasks: []
      }
    ]
  });
})();
