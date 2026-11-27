/* Kurs: C# – 14 Module nach dem Java-/Python-Muster (Onlineshop, Login, Ticketsystem) */
(function () {
  'use strict';
  const A = window.Academy, C = (lines, h, o) => A.code('csharp', lines, h, o);
  const PP = (prompt, code, ans, hint, expl) => Object.assign(A.predict(prompt, code, ans, hint, expl), { lang: 'csharp' });
  A.moved['csharp-ops'] = 'csharp-vars'; // „Rechnen und Vergleichen“ ist in Modul 2 und 3 aufgegangen

  A.track({
    id: 'csharp', title: 'C#', tag: 'C#',
    desc: 'Die moderne Sprache der .NET-Welt am durchgehenden Onlineshop-Projekt: von Console.WriteLine, Datentypen und Methoden über List<T>, Properties, Interfaces und Architektur bis zu Clean Code, Bug-Arena und LINQ.',
    intro: 'C# (gesprochen „C Sharp“) ist streng typisiert und objektorientiert wie Java, aber oft kompakter: Properties, String-Interpolation mit `$`, `switch`-Ausdrücke und LINQ sparen viel Schreibarbeit. Wie in Java, Python und JavaScript zieht sich ein **Onlineshop für IT-Zubehör** als roter Faden durch alle 14 Module – ergänzt um **Benutzerverwaltung** und **IT-Ticketsystem**.\n\nZum Ausprobieren auf deinem Rechner brauchst du das **.NET SDK** (dotnet.microsoft.com): `dotnet new console -o ShopDemo` anlegen und mit `dotnet run` starten. Seit C# 9 erlaubt `Program.cs` Top-Level-Statements direkt ohne Klasse drumherum.',
    lessons: [
      /* ---------- 1. Erstes Programm ---------- */
      {
        concept: 'hello', standalone: true, domain: 'shop', stage: 1,
        title: 'Das erste Programm: eine Bestellbestätigung',
        goal: 'Du gibst Text mit Console.WriteLine und Console.Write aus, kennst Top-Level-Statements gegen die klassische Main-Methode und weißt, wie C# mit dem .NET SDK übersetzt und gestartet wird.',
        terms: ['Quellcode', 'Compiler', 'Syntaxfehler'],
        parts: [
          A.text('Der rote Faden dieses Kurses', 'Durch alle 14 Module wächst derselbe Onlineshop wie in Java, Python und JavaScript: Heute druckt er eine Bestellbestätigung, danach speichert er Preise in Cent, berechnet Versandkosten und Rabatte, durchsucht Ticketlisten und wird schließlich zum sauberen 4-Klassen-Modell ausgebaut.'),
          C([
            '// Bestellbestätigung für den Onlineshop§Ein Kommentar: alles hinter // ignoriert der Compiler.',
            'Console.WriteLine("Vielen Dank für deine Bestellung!");§Gibt die Zeile aus und macht danach einen Zeilenumbruch. Jede Anweisung endet mit ;.',
            'Console.WriteLine("Bestellnummer: 10427");',
            'Console.Write("Versand: ");§Write macht KEINEN Zeilenumbruch – die nächste Ausgabe folgt in derselben Zeile.',
            'Console.WriteLine("kostenlos");§Erscheint direkt hinter „Versand: “.'
          ], 'Die Bestellbestätigung (Top-Level-Statements)', { praxis: 'Konsolenprogramme in C# werden für Import-Tools, Schnittstellen-Skripte und Server-Dienste im .NET-Ökosystem eingesetzt.' }),
          C([
            'using System;§Macht Console ohne Vorsatz nutzbar (in neuen .NET-Projekten meist automatisch aktiv).',
            'class Programm {§Klassische Form, wie sie in älteren Projekten und vielen Prüfungen steht.',
            '    static void Main() {§Einstiegspunkt des Programms.',
            '        Console.WriteLine("Bestellung 10427 bestätigt");',
            '    }',
            '}'
          ], 'Die klassische Form mit Main', { praxis: 'In IHK-Prüfungen und älteren Firmenprojekten begegnest du oft der klassischen Form mit class und static void Main().' }),
          A.text('Vom Quellcode zum laufenden Programm', 'C# ist eine **kompilierte** Sprache: Der **Compiler** prüft deinen **Quellcode** (`.cs`) vor dem Start komplett auf **Syntaxfehler** und Typfehler und erzeugt Zwischencode (IL), den die .NET-Laufzeitumgebung (CLR) ausführt – ganz ähnlich wie Bytecode und JVM bei Java.'),
          A.table(['', 'C#', 'Java', 'Python'], [
            ['Ausgabe mit Umbruch', '`Console.WriteLine("Hallo");`', '`System.out.println("Hallo");`', '`print("Hallo")`'],
            ['Ohne Umbruch', '`Console.Write("Hallo");`', '`System.out.print("Hallo");`', '`print("Hallo", end="")`'],
            ['Methodennamen', '`PascalCase` (`WriteLine`)', '`camelCase` (`println`)', '`snake_case` (`print`)']
          ], 'Dasselbe in Java und Python', 'Weiter zum Vergleich: [Java, Modul 1](/code-lernen/kurs/java/hello/) und [Python, Modul 1](/code-lernen/kurs/python/hello/).')
        ],
        tips: [
          A.warn('C# unterscheidet Groß- und Kleinschreibung: `Console.WriteLine`, niemals `console.writeline`. Methodennamen beginnen in C# groß (**PascalCase**).')
        ],
        quiz: [
          A.q('Welche Anweisung gibt Text mit anschließendem Zeilenumbruch aus?', ['Console.WriteLine()', 'Console.Write()', 'System.out.println()', 'console.log()'], 0, 'WriteLine macht einen Zeilenumbruch, Write bleibt in derselben Zeile.'),
          A.q('Was passiert bei einem fehlenden Semikolon in Zeile 4?', ['Der Compiler meldet einen Syntaxfehler, das Programm startet nicht', 'Zeilen 1 bis 3 laufen normal, dann bricht Zeile 4 ab', 'Der Compiler ergänzt das Semikolon automatisch still', 'Nur Zeile 4 wird beim Ausführen übersprungen'], 0, 'C# kompiliert vor dem Start; Syntaxfehler verhindern die Ausführung.'),
          A.q('Wie schreibt man Methodennamen nach C#-Konvention?', ['Groß am Anfang (PascalCase, z. B. WriteLine)', 'Klein am Anfang (camelCase, z. B. writeLine)', 'Klein mit Unterstrich (snake_case, z. B. write_line)', 'Immer komplett in Großbuchstaben'], 0, 'C# nutzt PascalCase für Methoden und Properties.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['Console.WriteLine("Bestellung 10427");', 'Console.Write("Versand: ");', 'Console.WriteLine("frei");'], 'Bestellung 10427\nVersand: frei', 'Write macht keinen Zeilenumbruch, WriteLine schon.', 'Nach „Bestellung 10427“ folgt ein Umbruch; „Versand: “ und „frei“ stehen in einer Zeile.'),
          A.fill('Gib eine Zeile mit Zeilenumbruch in C# aus.', 'Console.{{WriteLine}}("Lieferung in 2 Werktagen");', 'Methode von Console mit Zeilenumbruch (PascalCase).'),
          A.bug('Shop: Der Compiler bricht mit einem Syntaxfehler ab.', 'csharp', [
            'Console.WriteLine("Vielen Dank!");',
            'Console.WriteLine("Bestellnummer: 10427")',
            'Console.WriteLine("Versand: kostenlos");'
          ], { line: 1, kind: 'syntax', fixes: [
            'Console.WriteLine("Bestellnummer: 10427");',
            'Console.WriteLine("Bestellnummer: 10427"):',
            'console.WriteLine("Bestellnummer: 10427");',
            'Console.Write("Bestellnummer: 10427")'
          ], expect: 'Vielen Dank!\nBestellnummer: 10427\nVersand: kostenlos' }, 'Womit muss jede Anweisung in C# enden?', 'In Zeile 2 fehlt das Semikolon am Zeilenende.')
        ]
      },

      /* ---------- 2. Variablen, Datentypen, Rechnen ---------- */
      {
        concept: 'vars', standalone: true, domain: 'shop', stage: 1,
        title: 'Variablen, Datentypen und Umwandlung: Preise, Mengen, Eingaben',
        goal: 'Du wählst passende C#-Datentypen (int, long, decimal, string, bool), rechnest sicher mit Ganzzahl-Division und Modulo, nutzt $-Interpolation und wandelst Eingaben sicher mit int.TryParse um.',
        terms: ['Variable', 'Datentyp', 'Konstante', 'Modulo', ['Parsen', 'parsen'], ['Cast (Typumwandlung)', 'Cast']],
        parts: [
          A.text('Feste Datentypen und exaktes Geld', 'Jede **Variable** hat in C# einen festen **Datentyp**. Geldbeträge speicherst du entweder als ganze Zahl in Cent (`long` oder `int`) – oder mit C#s eigenem Dezimaltyp `decimal` (`19.99m`), der im Gegensatz zu `double` exakt im Zehnersystem rechnet. Mit `const` legst du eine unveränderliche **Konstante** fest.'),
          C([
            'string artikel = "Funkmaus";§Text (string klein geschrieben).',
            'long preisInCent = 1999;§Ganze Zahl in Cent – exakt wie in Java und Python.',
            'int menge = 2;',
            'bool lieferbar = true;§Wahrheitswert: true oder false.',
            'const long VersandInCent = 495;§Konstante: darf nicht mehr geändert werden.',
            'menge = menge + 1;§Erst rechts rechnen, dann speichern: 3.',
            'long summeInCent = preisInCent * menge;',
            'Console.WriteLine($"{menge} x {artikel}: {summeInCent} Cent");§$-Interpolation setzt Variablen direkt in {} ein.'
          ], 'Ein Artikel in C#-Variablen', { praxis: '$-Interpolation ist das C#-Gegenstück zu Pythons f-Strings und JavaScripts Backticks – sauber, kurz und direkt vom Compiler geprüft.' }),
          C([
            'long summeInCent = 3998;',
            'long euro = summeInCent / 100;§Ganzzahl-Division: 3998 / 100 ergibt 39 (Rest abgeschnitten).',
            'long cent = summeInCent % 100;§Modulo (%): Rest der Division ist 98.',
            'Console.WriteLine($"{euro},{cent:D2} Euro");§D2 formatiert zweistellig (z. B. 05 statt 5).',
            'double schnitt = (double)17 / 4;§Expliziter Cast auf double: 4.25 statt ganzzahlig 4.',
            'bool gleich = ("admin" == "ad" + "min");§Wichtig: In C# vergleicht == bei string den INHALT (True)!'
          ], 'Ganzzahl-Division, Modulo, Cast und String-Vergleich', { praxis: 'Anders als in Java darfst du Strings in C# direkt mit == vergleichen – C# prüft dabei den Textinhalt, nicht die Objektadresse.' }),
          C([
            'string eingabe = "3";§Console.ReadLine() liefert immer Text (string).',
            'int menge = int.Parse(eingabe);§Parsen: wirft bei "drei" eine FormatException.',
            'bool ok = int.TryParse("drei", out int sicher);§TryParse stürzt nie ab: liefert false und sicher = 0.',
            'Console.WriteLine($"{menge} {ok} {sicher}");'
          ], 'Eingaben sicher parsen mit int.TryParse', { praxis: 'int.TryParse ist die C#-Standardlösung für Benutzereingaben: keine Exception bei Tippfehlern, stattdessen ein sauberer bool.' }),
          A.table(['Datentyp', 'Größe', 'Wertebereich'], [
            ['`sbyte`', '8 Bit mit Vorzeichen', '−128 bis 127'],
            ['`byte`', '8 Bit ohne Vorzeichen', '0 bis 255'],
            ['`short`', '16 Bit mit Vorzeichen', '−32.768 bis 32.767'],
            ['`ushort`', '16 Bit ohne Vorzeichen', '0 bis 65.535'],
            ['`int`', '32 Bit mit Vorzeichen', '−2.147.483.648 bis 2.147.483.647'],
            ['`uint`', '32 Bit ohne Vorzeichen', '0 bis 4.294.967.295'],
            ['`long`', '64 Bit mit Vorzeichen', 'etwa ±9,2 Trillionen']
          ], 'Ganzzahltypen (IHK-Prüfungsanlage)', 'In Prüfungsaufgaben steht diese Tabelle oft in der Anlage: Prozentwerte (0–100) passen in `byte`, große Cent-Summen in `long`.'),
          A.table(['C#', 'Java', 'Python'], [
            ['`$"Summe: {s} Cent"`', '`"Summe: " + s + " Cent"`', '`f"Summe: {s} Cent"`'],
            ['`int.TryParse(s, out int n)`', '`Integer.parseInt(s)` + `try/catch`', '`int(s)` + `try/except`'],
            ['`a == b` (bei `string`: Inhalt!)', '`a.equals(b)`', '`a == b`']
          ], 'Dasselbe in Java und Python', 'Weiter zum Vergleich: [Java, Modul 2](/code-lernen/kurs/java/vars/) und [Python, Modul 2](/code-lernen/kurs/python/vars/).')
        ],
        tips: [
          A.warn('`7 / 2` ergibt bei zwei `int` in C# **3**, nicht 3,5! Für eine Kommazahl braucht mindestens eine Seite ein `(double)` oder `2.0`.')
        ],
        quiz: [
          A.q('Was ergibt `17 / 5` und `17 % 5` bei `int`-Zahlen in C#?', ['3 und 2', '3,4 und 2', '2 und 3', '3 und 0,4'], 0, 'Zwei int teilen ganzzahlig (3), % liefert den Rest (2).'),
          A.q('Was unterscheidet `int.TryParse` von `int.Parse` bei ungültiger Eingabe `"zwei"`?', ['TryParse liefert false ohne Absturz, Parse wirft eine FormatException', 'Parse liefert 0 ohne Absturz, TryParse wirft eine FormatException', 'Beide werfen eine FormatException, TryParse ist nur kürzer', 'TryParse wandelt das Wort "zwei" automatisch in die Zahl 2 um'], 0, 'TryParse ist ideal für Formulareingaben, weil kein try/catch nötig ist.'),
          A.q('Was prüft `a == b` bei zwei `string`-Variablen in C#?', ['Den Textinhalt beider Strings', 'Ausschließlich die Speicheradresse im Heap', 'Nur die Länge beider Strings', 'Es löst in C# einen Compilerfehler aus'], 0, 'Im Gegensatz zu Java vergleicht == bei string in C# den Inhalt.'),
          A.q('Welcher Datentyp aus der IHK-Tabelle speichert Prozentwerte (0–100) am speichersparsamsten?', ['byte (8 Bit)', 'int (32 Bit)', 'long (64 Bit)', 'double (64 Bit)'], 0, 'byte braucht nur 1 Byte und deckt 0 bis 255 ab.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['int summe = 22905;', 'Console.WriteLine($"{summe / 100} {summe % 100}");'], '229 5', 'Ganzzahl-Division liefert Euro, % liefert Cent.', '22905 / 100 = 229, Rest 5.'),
          A.fill('Wandle den Text `eingabe` absturzsicher in eine Ganzzahl um.', 'bool ok = int.{{TryParse}}(eingabe, out int menge);', 'Die absturzsichere Variante von Parse.'),
          A.bug('Produktbewertung: Bei 17 Sternen aus 4 Bewertungen zeigt C# 4 statt 4.25.', 'csharp', [
            'int summe = 17;',
            'int anzahl = 4;',
            'double schnitt = summe / anzahl;',
            'Console.WriteLine(schnitt);'
          ], { line: 2, kind: 'logik', fixes: [
            'double schnitt = (double)summe / anzahl;',
            'double schnitt = (double)(summe / anzahl);',
            'int schnitt = summe / anzahl;',
            'double schnitt = summe % anzahl;'
          ], expect: '4.25' }, 'Wann wird in Zeile 3 geteilt, und welchen Typ haben beide Operanden?', 'Zwei int teilen ganzzahlig zu 4. Erst der Cast (double) vor summe erzwingt eine Fließkommadivision.')
        ]
      },

      /* ---------- 3. Verzweigungen ---------- */
      {
        concept: 'cond', standalone: true, domain: 'shop', stage: 1,
        title: 'Verzweigungen: Versandkosten, Altersfreigabe, Login-Sperre',
        goal: 'Du triffst Entscheidungen mit if/else if/else, modernem switch-Ausdruck und Bedingungsoperator, verknüpfst Bedingungen mit &&, || und ! und prüfst Grenzwerte sicher.',
        terms: ['Verzweigung', 'Bedingung', 'Grenzwert', 'Bedingungsoperator', 'Wahrheitstabelle'],
        parts: [
          A.text('Entscheidungen im Shop und Service-Desk', 'Wie in Java prüft jede **Verzweigung** mit `if` eine **Bedingung** in runden Klammern. C# verlangt dabei zwingend einen echten `bool` – ein versehentliches `if (x = 5)` fängt der Compiler sofort ab. Besonders elegant ist der moderne **`switch`-Ausdruck**, der direkt einen Wert zurückliefert.'),
          C([
            'const long VersandfreiAb = 5000;',
            'long warenwert = 4790;',
            'bool istPrime = false;',
            'long versand = (warenwert >= VersandfreiAb || istPrime) ? 0 : 495;§Bedingungsoperator ? : mit ODER (||).',
            'Console.WriteLine($"Versand: {versand} Cent");'
          ], 'Versandkosten mit Bedingungsoperator', { praxis: 'Ab 50 Euro oder mit Prime-Status entfallen die Versandkosten – exakt am Grenzwert 5000 gilt >=.' }),
          C([
            'int fehlversuche = 3;',
            'bool passwortRichtig = true;',
            'if (fehlversuche >= 3) {§Sperre immer zuerst prüfen!',
            '    Console.WriteLine("Konto gesperrt");',
            '} else if (passwortRichtig) {',
            '    Console.WriteLine("Willkommen");',
            '} else {',
            '    Console.WriteLine("Passwort falsch");',
            '}'
          ], 'Login mit Sperre', { praxis: 'Dieselbe Reihenfolge wie in Java, Python und JavaScript: Ein gesperrtes Konto bleibt auch bei richtigem Passwort zu.' }),
          C([
            'int prio = 2;',
            'string reaktion = prio switch {§switch-Ausdruck: kein break nötig, kein Fall-through-Bug möglich!',
            '    1 => "sofort",',
            '    2 => "4 Stunden",',
            '    3 => "1 Tag",',
            '    _ => "1 Woche"§Unterstrich (_) fängt alle übrigen Fälle auf (wie default).',
            '};',
            'Console.WriteLine($"Priorität {prio}: {reaktion}");'
          ], 'Moderner switch-Ausdruck im Ticketsystem', { praxis: 'Der switch-Ausdruck ist eine Stärke von C#: kompakt, garantiert ohne vergessenes break und direkt prüfbar.' }),
          C(['int x = 7;§Erster Durchgang: ein Wert über der Grenze.', 'if (x > 5)§7 > 5 ist **true**: Der if-Zweig läuft.', '    Console.WriteLine($"{x} > 5 ist true: if-Zweig");', 'else', '    Console.WriteLine($"{x} > 5 ist false: else-Zweig");', 'x = 5;§Zweiter Durchgang: genau auf der Grenze.', 'if (x > 5)§5 > 5 ist **false**: C# springt zu else.', '    Console.WriteLine($"{x} > 5 ist true: if-Zweig");', 'else', '    Console.WriteLine($"{x} > 5 ist false: else-Zweig");', 'Console.WriteLine($"{7 > 5} {5 > 5}");§Eine Bedingung ist selbst ein Wert vom Typ bool. C# schreibt ihn groß: True und False.'], 'Trocken: dieselbe Bedingung einmal true, einmal false', { praxis: 'So testet man jede Bedingung: einmal mit einem Wert, der sie wahr macht, einmal mit einem, der sie falsch macht, am besten genau auf der Grenze. In der Qualitätssicherung heißen diese Testfälle Positiv- und Negativtest.' }),
          A.table(['a', 'b', '`a && b`', '`a || b`', '`!a`'], [['true', 'true', '**true**', '**true**', 'false'], ['true', 'false', 'false', '**true**', 'false'], ['false', 'true', 'false', '**true**', '**true**'], ['false', 'false', 'false', 'false', '**true**']], 'Wahrheitstabelle: alle Fälle von true und false', '`&&` ist nur true, wenn beide Seiten true sind. `||` ist nur false, wenn beide Seiten false sind. `!` dreht um. Zwei Wahrheitswerte ergeben genau vier Kombinationen, wer eine verknüpfte Bedingung prüft, geht alle vier durch. In der Ausgabe schreibt C# `True` und `False` groß, im Code klein.'),
          A.table(['C#', 'Java', 'Python'], [
            ['`prio switch { 1 => "sofort", _ => "1 Woche" };`', '`switch (prio) { case 1 -> "sofort"; default -> "1 Woche"; };`', '`match prio: case 1: ... case _: ...`'],
            ['`&&`, `||`, `!`', '`&&`, `||`, `!`', '`and`, `or`, `not`']
          ], 'Dasselbe in Java und Python', 'Weiter zum Vergleich: [Java, Modul 3](/code-lernen/kurs/java/cond/) und [Python, Modul 3](/code-lernen/kurs/python/cond/).')
        ],
        tips: [
          A.tip('Nutze bei festen Zuordnungen (Priorität → Reaktionszeit, Status → Text) den `switch`-Ausdruck mit `_` als Auffangfall.')
        ],
        quiz: [
          A.q('Wofür steht der Unterstrich `_` im C#-`switch`-Ausdruck?', ['Für alle übrigen Fälle (wie default)', 'Für einen ungültigen Wert null', 'Für das erste Element eines Arrays', 'Für das Abbrechen einer Schleife'], 0, 'Der Unterstrich (Discard) fängt alle noch nicht abgedeckten Fälle auf.'),
          A.q('Welchen großen Vorteil hat der `switch`-Ausdruck gegenüber dem klassischen `switch`?', ['Kein break nötig und kein Fall-through', 'Er braucht gar keine Bedingungen mehr', 'Er funktioniert nur für feste Strings', 'Er ersetzt alle Schleifen im Programm'], 0, 'Jeder Zweig liefert genau einen Ausdruck und endet automatisch.'),
          A.q('`warenwert = 5000`. Welcher Zweig läuft bei `warenwert >= 5000 ? 0 : 495`?', ['0 (Versand kostenlos)', '495 (Standardversand)', '5000', 'Compilerfehler'], 0, '5000 >= 5000 ist wahr, also wird der Wert vor dem Doppelpunkt gewählt.'),
          A.q('Ein Test prüft `x > 5` nur mit x = 7. Was fehlt noch?', ['Ein Test mit einem Wert, der die Bedingung false macht', 'Ein zweiter Test mit einem noch größeren Wert wie 70', 'Nichts, ein bestandener Test beweist die Bedingung komplett', 'Ein Test, ob 7 wirklich als ganze Zahl gespeichert ist'], 0, 'Erst der Gegenfall zeigt, ob der else-Zweig stimmt. Am besten genau auf der Grenze: x = 5.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['int prio = 4;', 'string r = prio switch { 1 => "sofort", 2 => "4h", _ => "normal" };', 'Console.WriteLine(r);'], 'normal', 'Prüfe, ob 4 bei 1 oder 2 passt.', '4 fällt in den Auffangfall _ und ergibt „normal“.'),
          A.fill('Ergänze den Auffangfall im C#-`switch`-Ausdruck.', 'string s = prio switch { 1 => "sofort", {{_}} => "1 Woche" };', 'Ein einzelnes Zeichen für „alle übrigen Fälle“.'),
          A.bug('Shop: Ab genau 5000 Cent soll der Versand 0 Cent kosten, aber bei 5000 Cent werden 495 Cent verlangt.', 'csharp', [
            'long warenwert = 5000;',
            'long versand = warenwert > 5000 ? 0 : 495;',
            'Console.WriteLine(versand);'
          ], { line: 1, kind: 'logik', fixes: [
            'long versand = warenwert >= 5000 ? 0 : 495;',
            'long versand = warenwert < 5000 ? 0 : 495;',
            'long versand = warenwert >= 5000 ? 495 : 0;',
            'long versand = warenwert != 5000 ? 0 : 495;'
          ], expect: '0' }, 'Gehört der Grenzwert 5000 zu „ab 50 Euro“ dazu?', '> schließt 5000 aus. Richtig ist >= 5000.'),
          PP('Alle Fälle von && und ||: Was gibt das Programm aus?', ['bool a = true, b = false;', 'Console.WriteLine($"{a && b} {a || b} {!b}");'], 'False True True', '&& braucht beide Seiten true, || nur eine. ! dreht um.', 'true && false ist False, true || false ist True, !false ist True. C# gibt bool großgeschrieben aus.')
        ]
      },

      /* ---------- 4. Schleifen ---------- */
      {
        concept: 'loops', standalone: true, domain: 'shop', stage: 2,
        title: 'Schleifen: Warenkorb, Login-Versuche, Ticketlisten',
        goal: 'Du nutzt foreach, for, while und do…while gezielt für Warenkörbe, Login-Versuche und Ticketlisten und vermeidest Off-by-one-Fehler.',
        terms: ['Schleife', 'Endlosschleife', 'Off-by-one-Fehler', ['Kopfgesteuerte Schleife', 'kopfgesteuert'], ['Fußgesteuerte Schleife', 'fußgesteuert']],
        parts: [
          A.text('Vier Schleifen für echte Aufgaben', 'In C# heißt die komfortable Schleife über Arrays und Listen **`foreach (var item in sammlung)`**. Brauchst du den Index, nimmst du `for`; hängt das Ende von einem Ereignis ab (z. B. Login-Versuche), nimmst du `while`.'),
          C([
            'long[] preise = { 1999, 999, 3490 };',
            'long summe = 0;',
            'foreach (long preis in preise) {§foreach liest jedes Element sauber ohne Index.',
            '    summe += preis;',
            '}',
            'Console.WriteLine($"Warenkorb: {summe} Cent");'
          ], 'foreach: Warenkorb summieren', { praxis: 'foreach schließt IndexOutOfRangeException komplett aus und ist der Standard in C# für fast alle Listen-Durchläufe.' }),
          C([
            'string[] eingaben = { "1234", "geheim", "Sommer2024!" };',
            'int i = 0;',
            'while (i < eingaben.Length && i < 3) {§Kopfgesteuert: maximal 3 Versuche.',
            '    if (eingaben[i] == "Sommer2024!") {',
            '        Console.WriteLine($"Login ok bei Versuch {i + 1}");',
            '        break;§break verlässt die Schleife sofort.',
            '    }',
            '    i++;§Zähler erhöhen – sonst Endlosschleife!',
            '}'
          ], 'while mit break: Login-Versuche', { praxis: 'Mit break spart sich der Server unnötige weitere Prüfungen, sobald ein Treffer feststeht.' }),
          C([
            'int[] bestaende = { 35, 0, 14, 0, 8 };',
            'int lieferbar = 0;',
            'for (int i = 0; i < bestaende.Length; i++) {§Index läuft von 0 bis Length - 1 (<, nicht <=).',
            '    if (bestaende[i] == 0) continue;§continue springt direkt zum nächsten Artikel.',
            '    lieferbar++;',
            '}',
            'Console.WriteLine($"Lieferbar: {lieferbar}");'
          ], 'for mit continue: ausverkaufte Ware überspringen', { praxis: 'Wenn du neben dem Wert auch die Position im Array brauchst (z. B. Zeilennummer auf der Rechnung), ist for die richtige Wahl.' }),
          C(['int zaehler = 5;§Ein Startwert, der die Bedingung schon vor dem ersten Durchlauf **false** macht.', 'while (zaehler < 3) {§Kopfgesteuert: 5 < 3 ist false, der Block läuft kein einziges Mal.', '    Console.WriteLine($"while-Block: {zaehler}");', '    zaehler++;', '}', 'Console.WriteLine($"nach while: {zaehler}");§zaehler ist unverändert 5.', 'zaehler = 5;', 'do {§Fußgesteuert: Der Block läuft zuerst, ohne Prüfung.', '    Console.WriteLine($"do-Block: {zaehler}");', '    zaehler++;', '} while (zaehler < 3);§Erst jetzt wird geprüft: 6 < 3 ist false, Schluss.', 'Console.WriteLine($"nach do-while: {zaehler}");'], 'Trocken: while und do-while, wenn die Bedingung sofort false ist', { praxis: 'while ist kopfgesteuert: Eine leere Druckwarteschlange druckt nichts. do-while ist fußgesteuert: Ein Menü erscheint auch dann einmal, wenn als Erstes „Beenden“ gewählt wird. Mit Startwert 1 laufen beide gleich oft. Den Unterschied sieht man nur, wenn die Bedingung schon am Anfang falsch ist.' }),
          A.table(['C#', 'Java', 'Python'], [
            ['`foreach (long p in preise)`', '`for (long p : preise)`', '`for p in preise:`'],
            ['`for (int i = 0; i < a.Length; i++)`', '`for (int i = 0; i < a.length; i++)`', '`for i in range(len(a)):`']
          ], 'Dasselbe in Java und Python', 'Weiter zum Vergleich: [Java, Modul 4](/code-lernen/kurs/java/loops/) und [Python, Modul 4](/code-lernen/kurs/python/loops/).')
        ],
        tips: [
          A.warn('`<= preise.Length` ist ein klassischer **Off-by-one-Fehler** und wirft in C# eine `IndexOutOfRangeException`. Immer `< preise.Length`!')
        ],
        quiz: [
          A.q('Wie heißt die Schleife in C#, die alle Elemente eines Arrays ohne Zähler durchläuft?', ['foreach (var x in arr)', 'for (var x of arr)', 'for (var x : arr)', 'each (var x in arr)'], 0, 'foreach … in ist C#, for … of ist JavaScript, for … : ist Java.'),
          A.q('Was passiert bei `for (int i = 0; i <= arr.Length; i++)` beim Zugriff `arr[i]`?', ['IndexOutOfRangeException beim letzten Durchlauf', 'arr[arr.Length] liefert automatisch 0', 'Der Compiler bricht schon beim Übersetzen ab', 'Die Schleife läuft einmal zu wenig'], 0, 'Der letzte gültige Index ist Length - 1. Bei i == Length knallt es zur Laufzeit.'),
          A.q('Wofür steht `continue;` in einer Schleife?', ['Überspringt den Rest dieses Durchlaufs und geht zum nächsten', 'Beendet die gesamte Schleife sofort', 'Startet den aktuellen Durchlauf mit demselben i neu', 'Verlässt die gesamte Methode sofort'], 0, 'continue springt zum nächsten Durchlauf, break bricht die ganze Schleife ab.'),
          A.q('Die Bedingung ist schon beim Start falsch. Wie oft laufen while und do-while?', ['while 0-mal, do-while genau 1-mal', 'Beide laufen kein einziges Mal', 'Beide laufen genau einmal durch', 'while 1-mal, do-while 0-mal'], 0, 'while prüft vor dem ersten Durchlauf (kopfgesteuert), do-while erst danach (fußgesteuert).')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['int[] preise = { 1000, 2500, 500 };', 'int summe = 0;', 'foreach (int p in preise) { if (p >= 1000) summe += p; }', 'Console.WriteLine(summe);'], '3500', 'Addiere nur Preise >= 1000.', '1000 + 2500 = 3500.'),
          A.fill('Durchlaufe alle Artikelnamen im Array `namen` ohne Zähler.', '{{foreach}} (string name {{in}} namen) { Console.WriteLine(name); }', 'C#-Schlüsselwort für die Element-Schleife und das verbindende Wort.'),
          A.bug('Warenkorb: Das Programm stürzt mit IndexOutOfRangeException ab.', 'csharp', [
            'int[] preise = { 1999, 999, 3490 };',
            'int summe = 0;',
            'for (int i = 0; i <= preise.Length; i++) {',
            '    summe += preise[i];',
            '}',
            'Console.WriteLine(summe);'
          ], { line: 2, kind: 'laufzeit', fixes: [
            'for (int i = 0; i < preise.Length; i++) {',
            'for (int i = 1; i <= preise.Length; i++) {',
            'for (int i = 0; i < preise.Length - 1; i++) {',
            'for (int i = 0; i <= preise.Length; i--) {'
          ], expect: '6488' }, 'Welcher Index ist bei Länge 3 der letzte gültige?', 'Gültig sind 0, 1 und 2. Mit <= greift i = 3 außerhalb des Arrays zu.'),
          PP('Kopf- gegen fußgesteuert: Was gibt das Programm aus?', ['int n = 10;', 'while (n < 5) { n++; }', 'do { n++; } while (n < 5);', 'Console.WriteLine(n);'], '11', 'Prüfe bei beiden Schleifen, wann die Bedingung zum ersten Mal geprüft wird.', 'while: 10 < 5 ist false, kein Durchlauf. do-while: ein Durchlauf ohne Prüfung, n wird 11, dann ist 11 < 5 false.')
        ]
      },

      /* ---------- 5. Methoden ---------- */
      {
        concept: 'funcs', standalone: true, domain: 'shop', stage: 2,
        title: 'Methoden: Versand, Rabatt und Prüfungen als Bausteine',
        goal: 'Du schreibst Methoden mit klarem Rückgabetyp und PascalCase-Namen, trennst Berechnung (return) von Ausgabe (void), nutzt =>-Kurzformen und Standardparameter.',
        terms: ['Methode', 'Parameter', 'Rückgabewert', 'Lokale Variable'],
        parts: [
          A.text('Bausteine mit Rückgabewert statt Ausgabe', 'Eine **Methode** in C# legt ihren **Rückgabewert** (z. B. `long` oder `bool`, oder `void` für nichts) und die Typen aller **Parameter** fest. Kurze Einzeiler lassen sich mit `=>` (Expression-Bodied Member) besonders sauber schreiben.'),
          C([
            'static long RabattInCent(long summeInCent, int prozent = 10) {§Standardparameter: ohne 2. Argument gelten 10 %.',
            '    if (summeInCent < 10000) return 0;',
            '    return summeInCent * prozent / 100;§return liefert das Ergebnis an den Aufrufer.',
            '}',
            'static long VersandInCent(long warenwert) => warenwert >= 5000 ? 0 : 495;§Kurzform mit => für Einzeiler.',
            'long summe = 12500;',
            'long rabatt = RabattInCent(summe);§Ergebnis wird direkt weiterverarbeitet.',
            'Console.WriteLine($"Zu zahlen: {summe - rabatt + VersandInCent(summe - rabatt)} Cent");'
          ], 'Shop-Methoden mit return, Standardwert und =>', { praxis: 'In .NET-Projekten werden Geschäftsregeln als kleine, reine Methoden mit Rückgabewert geschrieben – nur so können xUnit/NUnit-Tests sie automatisch prüfen.' }),
          C(['static bool IstSchaltjahr(int jahr) {', '    if (jahr % 400 == 0) return true;§Durch 400 teilbar: immer ein Schaltjahr.', '    if (jahr % 100 == 0) return false;§Durch 100, aber nicht durch 400: kein Schaltjahr.', '    return jahr % 4 == 0;§Sonst entscheidet die 4. Der Vergleich ist schon true oder false.', '}', '// in main', 'foreach (int jahr in new[] { 2024, 2023, 1900, 2000 })§Testwerte für jede Regel, für true und für false.', '    Console.WriteLine($"{jahr} {IstSchaltjahr(jahr)}");'], 'Trocken: eine Prüfmethode mit beiden Ergebnissen', { praxis: 'Kalender, Fristen und Zinstage hängen an dieser Regel. Zu einer Prüffunktion gehören Testwerte für beide Ergebnisse. Wer nur 2024 testet, merkt nicht, dass die Ausnahme für 1900 fehlt.' }),
          C(['static void BucheEntnahme(int menge) {', '    if (menge <= 0) {', '        Console.WriteLine($"Abgelehnt: Menge {menge} ist ungültig");', '        return;§**Früher Ausstieg**: return ohne Wert beendet eine void-Methode sofort.', '    }', '    Console.WriteLine($"Gebucht: {menge} Stück entnommen");§Läuft nur, wenn das return oben nicht gegriffen hat.', '}', '// in main', 'BucheEntnahme(5);§Bedingung false: Die Methode läuft bis zum Ende.', 'BucheEntnahme(-5);§Bedingung true: Ausstieg direkt nach der Meldung.'], 'Trocken: früher Ausstieg und Normalfall', { praxis: 'Lagerbuchungen, Zahlungen, Formulare: Ungültiges wird am Anfang abgewiesen, der Normalfall folgt ohne Verschachtelung. Dieses Muster heißt Guard Clause und kommt im Modul Clean Code wieder.' }),
          A.table(['C#', 'Java', 'Python'], [
            ['`static long Rabatt(long s, int p = 10)`', '`static long rabatt(long s, int p)` (keine Default-Params)', '`def rabatt(s, p=10):`'],
            ['`static bool IstFrei(long w) => w >= 5000;`', '`static boolean istFrei(long w) { return w >= 5000; }`', '`def ist_frei(w): return w >= 5000`']
          ], 'Dasselbe in Java und Python', 'Weiter zum Vergleich: [Java, Modul 5](/code-lernen/kurs/java/funcs/) und [Python, Modul 5](/code-lernen/kurs/python/funcs/).')
        ],
        tips: [
          A.tip('Parameter und Variablen innerhalb einer Methode sind **lokale Variablen** – sie existieren nur während des Aufrufs.')
        ],
        quiz: [
          A.q('Was bedeutet der Rückgabetyp `void` an einer C#-Methode?', ['Die Methode gibt keinen Wert zurück', 'Die Methode gibt immer 0 zurück', 'Die Methode darf keine Parameter haben', 'Die Methode ist automatisch privat'], 0, 'void heißt leer: nur eine Aktion (z. B. Ausgabe), kein Rückgabewert.'),
          A.q('Wofür steht `static long Versand(long w) => w >= 5000 ? 0 : 495;`?', ['Kurze Methode mit direkter Rückgabe', 'Ein Vergleich zwischen Versand und 5000', 'Eine Schleife über alle Werte ab 5000', 'Eine Variable vom Typ long ohne Wert'], 0, 'Expression-Bodied Method: spart geschweifte Klammern und return bei Einzeilern.'),
          A.q('Wie ruft man `static long Rabatt(long summe, int prozent = 10)` mit dem Standardwert auf?', ['Rabatt(12000)', 'Rabatt(12000, default)', 'Rabatt(prozent)', 'Rabatt()'], 0, 'Lässt man den optionalen Parameter weg, gilt automatisch der Standardwert 10.'),
          A.q('Was macht `return;` in einer `void`-Methode?', ['Es beendet die Methode sofort, ohne Rückgabewert', 'Es springt zurück an den Anfang der Methode', 'Es gibt automatisch den Wert 0 an den Aufrufer', 'Es beendet das gesamte Programm auf der Stelle'], 0, 'Der Aufrufer macht hinter dem Aufruf normal weiter. Nur die Methode selbst ist zu Ende.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['static long Rabatt(long s) => s >= 10000 ? s * 10 / 100 : 0;', 'Console.WriteLine($"{Rabatt(9999)} {Rabatt(15000)}");'], '0 1500', 'Prüfe 9999 und 15000 gegen >= 10000.', '9999 → 0, 15000 → 1500.'),
          A.fill('Ergänze den Rückgabetyp für eine Prüfmethode, die `true` oder `false` liefert.', 'static {{bool}} IstLieferbar(int lager) => lager > 0;', 'In C# heißt der Wahrheitswert-Typ kurz … (4 Buchstaben).'),
          PP('Einlasskontrolle mit frühem Ausstieg: Was gibt das Programm aus?', ['static string Einlass(int alter) {', '    if (alter < 0) return "Fehler";', '    if (alter >= 18) return "Einlass";', '    return "Abgewiesen";', '}', '// in main', 'Console.WriteLine($"{Einlass(18)} {Einlass(17)} {Einlass(-1)}");'], 'Einlass Abgewiesen Fehler', 'Gehe für jeden Aufruf die return-Zeilen von oben durch. Das erste, das greift, beendet die Methode.', '18 >= 18 ist true: Einlass. 17 erfüllt keine der ersten beiden Bedingungen: Abgewiesen. -1 < 0 greift schon in der ersten Zeile: Fehler.')
        ]
      },

      /* ---------- 6. Arrays, List<T>, Dictionary & 4 Standardalgorithmen ---------- */
      {
        concept: 'coll', standalone: true, domain: 'shop', stage: 2,
        title: 'Arrays, List<T>, Dictionary und die vier Standardalgorithmen',
        goal: 'Du unterscheidest Arrays (.Length), List<T> (.Count) und Dictionary<K, V> und wendest die vier IHK-Standardalgorithmen (Summieren, Zählen, Min/Max, Suchen) sicher an.',
        terms: ['Liste', 'Lineare Suche', 'Generics'],
        parts: [
          A.text('Feste Arrays, dynamische Listen und Dictionaries', 'Ein **Array** (`int[]`) hat eine feste Größe (`.Length`). Eine **`List<T>`** nutzt **Generics** (`<T>`), wächst dynamisch mit `.Add()` und meldet ihre Größe über `.Count`. Ein **`Dictionary<TKey, TValue>`** speichert Schlüssel-Wert-Paare (wie Artikelnummer → Preis) für blitzschnelles Nachschlagen.'),
          C([
            'int[] preise = { 1999, 4950, 999, 3490 };§Vier Artikelpreise in Cent.',
            '// 1. Summieren & 2. Zählen (ab 20 Euro)',
            'int summe = 0, ab20 = 0;',
            'foreach (int p in preise) { summe += p; if (p >= 2000) ab20++; }§Addiert alle Preise und zählt Artikel ab 20 Euro.',
            '// 3. Minimum: immer mit dem ersten Element starten!',
            'int min = preise[0];§Nie mit 0 starten, sonst bleibt min bei positiven Preisen immer 0.',
            'foreach (int p in preise) { if (p < min) min = p; }',
            '// 4. Lineare Suche',
            'int fundIndex = -1;§-1 steht für „nicht gefunden“.',
            'for (int i = 0; i < preise.Length; i++) { if (preise[i] == 999) { fundIndex = i; break; } }',
            'Console.WriteLine($"{summe} {ab20} {min} {fundIndex}");'
          ], 'Die vier IHK-Standardalgorithmen in C#', { praxis: 'Genau diese vier Muster (Summieren, Filtern/Zählen, Min/Max, Suchen) werden in der IHK-Prüfung regelmäßig abgefragt.' }),
          C([
            'var korb = new List<string>();§Dynamische Liste für Artikelnamen.',
            'korb.Add("Funkmaus");',
            'korb.Add("Headset");',
            'var lager = new Dictionary<string, int> { ["Funkmaus"] = 35, ["Tastatur"] = 0 };§Schlüssel -> Wert.',
            'Console.WriteLine($"Im Korb: {korb.Count}, Maus-Lager: {lager["Funkmaus"]}");'
          ], 'List<T> und Dictionary im Onlineshop', { praxis: 'List<T> ist die meistgenutzte Sammlung in C#, Dictionary ersetzt langsames Suchen in Listen durch direkten Zugriff über die Artikelnummer.' }),
          C(['string zeile = "Kiel;Bonn;Ulm";', 'string[] teile = zeile.Split(\';\');§Hin: Split zerlegt den Text in 3 Teile.', 'string wieder = string.Join(";", teile);§Zurück: Join klebt die Teile wieder zusammen.', 'Console.WriteLine($"{teile.Length} Teile, gleich wie vorher: {wieder == zeile}");', 'string name = "Funkmaus";', 'Console.WriteLine($"{name.ToUpper()} {name.ToUpper().ToLower()}");§Nicht jeder Rückweg ist verlustfrei: Aus „Funkmaus“ wird „funkmaus“.', 'var korb = new List<string> { "Maus", "Kabel" };', 'korb.Add("Headset");§Hin: ein drittes Element.', 'korb.Remove("Headset");§Zurück: Remove nimmt es wieder heraus.', 'Console.WriteLine(korb.Count);'], 'Gegenstücke: Hin- und Rückweg', { praxis: 'Gegenstücke testet man als Hin- und Rückweg: Zerlegen und wieder Zusammensetzen muss beim Original landen. Genau so prüfen Import/Export-Schnittstellen, ob beim Speichern und Laden nichts verloren geht.' }),
          C(['string datei = "bericht.final.pdf";', 'int erster = datei.IndexOf(\'.\');§Von vorn gesucht: der erste Punkt steht an Index 7.', 'int letzter = datei.LastIndexOf(\'.\');§Von hinten gesucht: der letzte Punkt an Index 13.', 'Console.WriteLine($"{erster} {letzter} {datei.Substring(letzter + 1)}");§Hinter dem letzten Punkt steht die Endung.', 'Console.WriteLine($"{Math.Floor(4.2)} {Math.Ceiling(4.2)}");§Abrunden und Aufrunden: 4 und 5.', 'Console.WriteLine($"{Math.Min(7, 3)} {Math.Max(7, 3)}");'], 'Gegenstücke: vorn und hinten, unten und oben', { praxis: 'Dateiname und Endung trennen, Preise auf ganze Kartons runden, kleinsten und größten Messwert finden: Diese Paare kommen in fast jedem Programm vor. Wer eins kennt, sucht das andere gleich mit.' }),
          A.table(['Hin', 'Zurück', 'Wofür'], [['`text.Split(\';\')`', '`string.Join(";", teile)`', 'CSV-Zeile zerlegen und wieder bauen'], ['`liste.Add(x)`', '`liste.Remove(x)`', 'Warenkorb füllen und leeren'], ['`int.Parse("42")`', '`zahl.ToString()`', 'Text zu Zahl und zurück'], ['`ToUpper()`', '`ToLower()`', 'Eingaben vergleichbar machen'], ['`IndexOf(x)`', '`LastIndexOf(x)`', 'von vorn oder von hinten suchen'], ['`StartsWith(x)`', '`EndsWith(x)`', 'Präfix oder Endung prüfen'], ['`Math.Floor(x)`', '`Math.Ceiling(x)`', 'ab- oder aufrunden'], ['`Math.Min(a, b)`', '`Math.Max(a, b)`', 'kleinster oder größter Wert']], 'Gegenstücke auf einen Blick', 'Zu fast jeder Operation gibt es eine, die sie umkehrt oder von der anderen Seite her arbeitet. Nicht jeder Rückweg ist verlustfrei: Nach Großschreibung und wieder Kleinschreibung ist die ursprüngliche Schreibweise weg.'),
          A.table(['C#', 'Java', 'Python'], [
            ['`arr.Length` / `list.Count`', '`arr.length` / `list.size()`', '`len(liste)`'],
            ['`List<string>` + `.Add(x)`', '`ArrayList<String>` + `.add(x)`', '`list` + `.append(x)`'],
            ['`Dictionary<string, int>`', '`HashMap<String, Integer>`', '`dict`']
          ], 'Dasselbe in Java und Python', 'Weiter zum Vergleich: [Java, Modul 6](/code-lernen/kurs/java/coll/) und [Python, Modul 6](/code-lernen/kurs/python/coll/).')
        ],
        tips: [
          A.warn('Typische C#-Stolperfalle: Array hat `.Length`, `List<T>` hat `.Count` – beide **ohne** Klammern!')
        ],
        quiz: [
          A.q('Welche Eigenschaft liefert die Anzahl der Elemente einer `List<string>` in C#?', ['.Count', '.Length', '.size()', 'len()'], 0, 'Arrays haben .Length, Listen und Dictionaries haben .Count.'),
          A.q('Womit startest du beim Suchen des günstigsten Preises im Array `preise`?', ['int min = preise[0];', 'int min = 0;', 'int min = -1;', 'int min = preise.Length;'], 0, 'Bei 0 würde kein positiver Preis kleiner sein als min.'),
          A.q('Welche Datenstruktur eignet sich am besten, um zu einer Artikelnummer sofort den Lagerbestand nachzuschlagen?', ['Dictionary<int, int>', 'Ein Array int[]', 'Ein langer string', 'Eine Liste bool[]'], 0, 'Dictionary ordnet jedem Schlüssel (Artikelnummer) direkt einen Wert (Bestand) zu.'),
          A.q('Welcher Aufruf macht `zeile.Split(\';\')` rückgängig?', ['string.Join(";", teile)', 'teile.Reverse()', 'zeile.Trim(\';\')', 'string.Concat(zeile, ";")'], 0, 'Split zerlegt an jedem Trennzeichen, Join setzt die Teile mit demselben Trennzeichen wieder zusammen.'),
          A.q('Was ergibt `"Funkmaus".ToUpper().ToLower()`?', ['"funkmaus", die ursprüngliche Schreibweise ist weg', '"Funkmaus", das Gegenstück stellt alles wieder her', '"FUNKMAUS", ToLower wirkt nur auf neue Texte', 'Einen Compilerfehler wegen der doppelten Umwandlung'], 0, 'ToLower kennt das Original nicht mehr, es macht einfach alles klein. Nicht jedes Gegenstück ist ein verlustfreier Rückweg.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['var korb = new List<string> { "Monitor", "Kabel", "Maus" };', 'korb.RemoveAt(0);', 'Console.WriteLine($"{korb[0]} {korb.Count}");'], 'Kabel 2', 'RemoveAt(0) entfernt das erste Element; der Rest rückt nach.', 'Monitor fällt weg, Kabel ist neu auf Index 0, 2 Elemente bleiben.'),
          A.fill('Lege eine leere Liste für Artikelnamen an und füge das Headset hinzu.', 'var korb = new {{List}}<string>();\nkorb.{{Add}}("Headset");', 'Generische Liste in C# und ihre Methode zum Anhängen (PascalCase).'),
          A.bug('Preisvergleich: Als günstigster Preis wird 0 ausgegeben, obwohl kein Artikel 0 Cent kostet.', 'csharp', [
            'int[] preise = { 1999, 4950, 999, 3490 };',
            'int min = 0;',
            'foreach (int p in preise) { if (p < min) min = p; }',
            'Console.WriteLine(min);'
          ], { line: 1, kind: 'logik', fixes: [
            'int min = preise[0];',
            'int min = 1;',
            'int min = -1;',
            'int min = preise.Length;'
          ], expect: '999' }, 'Kann ein positiver Preis kleiner als 0 sein?', 'Der Startwert muss das erste Element preise[0] sein.'),
          PP('Warenkorb hin und zurück: Was gibt das Programm aus?', ['var korb = new List<string> { "Maus" };', 'korb.Add("Kabel");', 'korb.Add("Headset");', 'korb.Remove("Maus");', 'Console.WriteLine($"{korb.Count} {korb[0]} {string.Join("+", korb)}");'], '2 Kabel Kabel+Headset', 'Verfolge die Liste nach jedem Aufruf. Was rückt nach, wenn vorn etwas entfernt wird?', 'Nach Add steht [Maus, Kabel, Headset]. Remove("Maus") nimmt das erste Element heraus, die anderen rücken nach vorn: [Kabel, Headset].')
        ]
      },

      /* ---------- 7. Klassen und Objekte ---------- */
      {
        concept: 'oop', standalone: true, domain: 'shop', stage: 3,
        title: 'Klassen und Objekte: aus Arrays wird der Artikel',
        goal: 'Du baust Klassen mit Properties, Konstruktor und Methoden, erzeugst Objekte mit new und unterscheidest Wert- und Referenztypen in C#.',
        terms: ['Klasse', 'Objekt', 'Instanz', 'Attribut', 'Konstruktor', 'Referenz'],
        parts: [
          A.text('Bauplan mit Properties', 'Statt getrennter Arrays bündelt eine **Klasse** wie `Artikel` alle Daten (**Attribute** / Properties) und Methoden eines Objekts. Mit `new` entsteht eine **Instanz** (ein **Objekt**), initialisiert durch den **Konstruktor**.'),
          C([
            'var maus = new Artikel("Funkmaus", 1999, 35);§new erzeugt ein Objekt und ruft den Konstruktor auf.',
            'var tastatur = new Artikel("Tastatur", 4950, 0);',
            'Console.WriteLine($"{maus.Name}: {maus.IstLieferbar()} | {tastatur.Name}: {tastatur.IstLieferbar()}");',
            'class Artikel {§Bauplan für alle Shop-Artikel.',
            '    public string Name { get; }§Nur lesbare Property: einmal im Konstruktor gesetzt.',
            '    public long PreisInCent { get; }',
            '    public int Lager { get; set; }',
            '    public Artikel(string name, long preisInCent, int lager) {§Konstruktor: heißt wie die Klasse.',
            '        Name = name; PreisInCent = preisInCent; Lager = lager;',
            '    }',
            '    public bool IstLieferbar() => Lager > 0;',
            '}'
          ], 'Die Klasse Artikel in C#', { praxis: 'In C# ersetzen Properties (public string Name { get; }) die langen Getter/Setter-Blöcke aus Java.' }),
          A.uml('klasse Artikel\n  + Name: string\n  + PreisInCent: long\n  + Lager: int\n  + Artikel(name: string, preisInCent: long, lager: int)\n  + IstLieferbar(): bool', 'Dieselbe Klasse im UML', 'Mehr zur Modellierung in [Modellieren: Warum Objekte?](/code-lernen/kurs/oop/warum/).'),
          A.table(['C#', 'Java', 'Python'], [
            ['`public string Name { get; }`', '`private final String name;` + `getName()`', '`@property def name(self): …`'],
            ['`var a = new Artikel(…);`', '`Artikel a = new Artikel(…);`', '`a = Artikel(…)`']
          ], 'Dasselbe in Java und Python', 'Weiter zum Vergleich: [Java, Modul 7](/code-lernen/kurs/java/oop/) und [Python, Modul 7](/code-lernen/kurs/python/oop/).')
        ],
        tips: [
          A.warn('`int` und `bool` sind **Werttypen** (Kopie des Werts), `class`-Objekte sind **Referenztypen** (`var b = a;` zeigt auf dasselbe Objekt!).')
        ],
        quiz: [
          A.q('Was bewirkt `public string Name { get; }` bei einer C#-Property?', ['Name wird im Konstruktor gesetzt und ist von außen nur lesbar', 'Name darf von überall beliebig oft überschrieben werden', 'Name ist von außen überhaupt nicht sichtbar', 'Name ist eine statische Methode ohne Parameter'], 0, 'Ohne set ist die Property von außen unveränderlich (read-only).'),
          A.q('Nach `var b = a; b.Lager = 0;` (für ein Artikel-Objekt `a`): Welchen Wert hat `a.Lager`?', ['0', 'den ursprünglichen Wert', 'null', 'Compilerfehler'], 0, 'Klassen sind Referenztypen: a und b verweisen auf dasselbe Objekt.'),
          A.q('Woran erkennst du in C# einen Konstruktor?', ['Heißt wie die Klasse, kein Rückgabetyp', 'Er trägt immer den Namen constructor', 'Er trägt immer den Rückgabetyp void', 'Er beginnt immer mit dem Wort init'], 0, 'Genau wie in Java: Klassenname ohne Rückgabetyp.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', [
            'var a = new Artikel("Headset", 14);',
            'var b = new Artikel("Headset", 14);',
            'a.Verkaufen(3);',
            'Console.WriteLine($"{a.Lager} {b.Lager}");',
            'class Artikel {',
            '    public string Name { get; }',
            '    public int Lager { get; private set; }',
            '    public Artikel(string n, int l) { Name = n; Lager = l; }',
            '    public void Verkaufen(int m) { Lager -= m; }',
            '}'
          ], '11 14', 'Zwei new-Aufrufe erzeugen zwei unabhängige Artikel-Objekte.', 'Nur a verkauft 3 Stück (11), b bleibt bei 14.'),
          A.fill('Erzeuge ein neues Ticket mit der ID 505.', 'var t = {{new}} Ticket(505);', 'Schlüsselwort zum Anlegen einer Instanz.')
        ]
      },

      /* ---------- 8. Kapselung ---------- */
      {
        id: 'kapselung', standalone: true, domain: 'shop', stage: 3,
        title: 'Kapselung: Properties, Lagerbestand und Passwort schützen',
        goal: 'Du kapselst Zustände mit private Feldern und { get; private set; }, erzwingst Geschäftsregeln in Methoden wie Verkaufen() und liest Sichtbarkeiten im UML.',
        terms: ['Kapselung', ['Getter und Setter', 'Getter', 'Setter'], 'Sichtbarkeit'],
        parts: [
          A.text('Kapselung in einer Zeile: { get; private set; }', 'In C# brauchst du für einfache **Kapselung** keine separaten **Getter und Setter**-Methoden: `public int Lager { get; private set; }` macht das Lesen öffentlich (`+`) und das Schreiben privat (`-`). Geschäftsregeln wie „Bestand nie negativ“ sitzen in fachlichen Methoden wie `Verkaufen(int menge)`.'),
          C([
            'var maus = new Artikel("Funkmaus", 35);',
            'Console.WriteLine($"{maus.Verkaufen(50)} {maus.Verkaufen(5)} {maus.Lager}");',
            'class Artikel {',
            '    public string Name { get; }',
            '    public int Lager { get; private set; }§Außen lesbar, ändern nur innerhalb von Artikel erlaubt!',
            '    public Artikel(string name, int lager) {',
            '        if (lager < 0) throw new ArgumentException("Bestand darf nicht negativ sein");',
            '        Name = name; Lager = lager;',
            '    }',
            '    public bool Verkaufen(int menge) {§Die einzige Stelle, die den Bestand senkt.',
            '        if (menge <= 0 || menge > Lager) return false;',
            '        Lager -= menge;',
            '        return true;',
            '    }',
            '}'
          ], 'Gekapselter Artikel in C#', { praxis: 'Wenn ein Entwickler versucht, von außen maus.Lager = -10 zu schreiben, verhindert der C#-Compiler das sofort beim Übersetzen.' }),
          A.uml('klasse Artikel\n  - Name: string\n  - Lager: int\n  + Artikel(name: string, lager: int)\n  + Verkaufen(menge: int): bool', 'Die gekapselte Klasse im UML', 'Mehr zu Sichtbarkeiten (`+ - # ~`) in [Modellieren: Kapselung](/code-lernen/kurs/oop/kapselung/).'),
          A.table(['Sichtbarkeit in C#', 'UML', 'Wer darf zugreifen?'], [
            ['`public`', '`+`', 'alle'],
            ['`protected`', '`#`', 'eigene Klasse und Unterklassen'],
            ['`internal`', '`~`', 'alle Klassen im selben Projekt (Assembly)'],
            ['`private`', '`-`', 'nur die eigene Klasse']
          ], 'Die vier Sichtbarkeiten in C#'),
          A.table(['Dasselbe in anderen Kursen', 'Direktlink'], [
            ['Java: Kapselung', '[Java, Modul 8](/code-lernen/kurs/java/kapselung/)'],
            ['Python: Kapselung', '[Python, Modul 8](/code-lernen/kurs/python/kapselung/)']
          ], 'Sprachvergleich')
        ],
        tips: [
          A.tip('C# nennt die Paket-Sichtbarkeit (`~` im UML) **`internal`** – sie gilt für das gesamte .NET-Projekt (Assembly).')
        ],
        quiz: [
          A.q('Was bewirkt `{ get; private set; }` bei `public int Lager`?', ['Lesen ist öffentlich, Ändern nur innerhalb der eigenen Klasse', 'Ändern ist öffentlich, Lesen nur innerhalb der eigenen Klasse', 'Weder Lesen noch Ändern ist innerhalb der Klasse erlaubt', 'Die Property wird automatisch statisch für alle Objekte'], 0, 'So schützt du den Lagerbestand vor direktem Überschreiben von außen.'),
          A.q('Welche Sichtbarkeit in C# entspricht `~` (Paket-Sichtbarkeit) im UML?', ['internal', 'protected', 'private', 'static'], 0, 'internal macht Klassen oder Member im gesamten eigenen Projekt (Assembly) sichtbar.'),
          A.q('Wann ist eine fachliche Methode `Verkaufen(int menge)` besser als ein öffentlicher Setter?', ['Wenn Geschäftsregeln wie „nie unter 0“ erzwungen werden sollen', 'Wenn das Attribut überhaupt nicht verändert werden darf', 'Wenn die Klasse keine Konstruktoren besitzt', 'Wenn der Wert nur einmal angezeigt werden soll'], 0, 'Verkaufen() bündelt Prüfung und Bestandsänderung an genau einer Stelle.')
        ],
        tasks: [
          A.fill('Mache `Lager` öffentlich lesbar, aber nur innerhalb der Klasse änderbar.', 'public int Lager { get; {{private}} set; }', 'Das Schlüsselwort für „nur innerhalb dieser Klasse“.'),
          A.bug('Lager: Den letzten Artikel auf Lager (5 von 5) kann niemand kaufen.', 'csharp', [
            'var a = new Artikel(5);',
            'Console.WriteLine($"{a.Verkaufen(6)} {a.Verkaufen(5)} {a.Lager}");',
            'class Artikel {',
            '    public int Lager { get; private set; }',
            '    public Artikel(int l) { Lager = l; }',
            '    public bool Verkaufen(int m) {',
            '        if (m <= 0 || m >= Lager) return false;',
            '        Lager -= m; return true;',
            '    }',
            '}'
          ], { line: 6, kind: 'logik', fixes: [
            'if (m <= 0 || m > Lager) return false;',
            'if (m <= 0 || m < Lager) return false;',
            'if (m < 0 || m >= Lager) return false;',
            'if (m <= 0 && m > Lager) return false;'
          ], expect: 'False True 0' }, 'Darf man genau die vorhandene Lagermenge kaufen?', 'Erst bei m > Lager ist zu wenig da; >= blockiert den Kauf des letzten Stücks.')
        ]
      },

      /* ---------- 9. Vererbung, Polymorphie & Interfaces ---------- */
      {
        id: 'vererbung', standalone: true, domain: 'shop', stage: 3,
        title: 'Vererbung, Polymorphie und Interfaces: Artikelarten und Zahlungsmethoden',
        goal: 'Du leitest Klassen mit : ab, nutzt virtual, override und base(...), definierst Interfaces mit I-Präfix (IZahlungsmethode) und nutzt Polymorphie für erweiterbaren Code.',
        terms: ['Vererbung', ['Oberklasse und Unterklasse', 'Oberklasse', 'Unterklasse'], ['Überschreiben (Override)', 'Überschreiben', 'überschreibt'], 'Polymorphie', ['Schnittstelle (Interface)', 'Interface']],
        parts: [
          A.text('Doppelpunkt, virtual und override', 'In C# steht für **Vererbung** und **Interface**-Realisierung derselbe Doppelpunkt (`:`). Anders als in Java darf eine Methode nur dann überschrieben werden, wenn die Oberklasse sie ausdrücklich als **`virtual`** freigibt – und die Unterklasse muss **`override`** schreiben. Den Oberklassen-Konstruktor rufst du mit **`base(...)`** auf.'),
          C([
            'Artikel a = new Artikel("Headset", 3490);',
            'Artikel d = new DigitalArtikel("Lizenz", 9900);',
            'Console.WriteLine($"{a.Info()} | {d.Info()}");',
            'class Artikel {',
            '    protected string Name;',
            '    protected long PreisInCent;',
            '    public Artikel(string name, long preis) { Name = name; PreisInCent = preis; }',
            '    public virtual long VersandInCent() => 495;§virtual erlaubt Unterklassen das Überschreiben.',
            '    public string Info() => $"{Name}: {PreisInCent} + {VersandInCent()} Cent";',
            '}',
            'class DigitalArtikel : Artikel {§Doppelpunkt = Vererbung (--|> im UML).',
            '    public DigitalArtikel(string name, long preis) : base(name, preis) { }§base(...) ruft den Konstruktor der Oberklasse.',
            '    public override long VersandInCent() => 0;§override ist Pflicht und schützt vor Tippfehlern!',
            '}'
          ], 'Vererbung mit virtual, override und base()', { praxis: 'Weil override in C# Pflicht ist, erkennt der Compiler Tippfehler im Methodennamen sofort – anders als in Python oder JavaScript.' }),
          C([
            'IZahlungsmethode[] arten = { new PayPal(), new Rechnung() };',
            'foreach (var z in arten) Console.WriteLine($"{z.Name}: {z.GebuehrInCent(10000)} Cent");',
            'interface IZahlungsmethode {§Interfaces beginnen in C# nach Konvention immer mit einem großen I.',
            '    string Name { get; }',
            '    long GebuehrInCent(long betragInCent);',
            '}',
            'class PayPal : IZahlungsmethode {§Realisierung (..|> im UML).',
            '    public string Name => "PayPal";',
            '    public long GebuehrInCent(long b) => b * 249 / 10000 + 35;',
            '}',
            'class Rechnung : IZahlungsmethode {',
            '    public string Name => "Rechnung";',
            '    public long GebuehrInCent(long b) => 0;',
            '}'
          ], 'Interface IZahlungsmethode und Polymorphie', { praxis: 'In ASP.NET Core (Dependency Injection) ist fast jeder Dienst über ein I-Interface gekoppelt: IZahlungsdienst, ILagerService, IEmailSender.' }),
          A.table(['C#', 'Java', 'Python'], [
            ['`class Digital : Artikel`', '`class Digital extends Artikel`', '`class Digital(Artikel):`'],
            ['`: base(name, preis)`', '`super(name, preis);`', '`super().__init__(name, preis)`'],
            ['`virtual` + `override` (Pflicht)', '`@Override` (empfohlen)', 'einfach neu definieren'],
            ['`interface IZahlung` + `: IZahlung`', '`interface Zahlung` + `implements`', 'Duck Typing / `ABC`']
          ], 'Dasselbe in Java und Python', 'Weiter zum Vergleich: [Java, Modul 9](/code-lernen/kurs/java/vererbung/), [Python, Modul 9](/code-lernen/kurs/python/vererbung/) und [Modellieren: Polymorphie](/code-lernen/kurs/oop/poly/).')
        ],
        tips: [
          A.warn('Vergiss in der Oberklasse nicht `virtual`! Ohne `virtual` (oder `abstract`) verbietet der C#-Compiler `override` in der Unterklasse.')
        ],
        quiz: [
          A.q('Welche zwei Schlüsselwörter gehören in C# beim Überschreiben einer Methode zusammen?', ['virtual in der Oberklasse und override in der Unterklasse', 'extends in der Oberklasse und super in der Unterklasse', 'static in der Oberklasse und final in der Unterklasse', 'private in der Oberklasse und public in der Unterklasse'], 0, 'Ohne virtual darf die Methode nicht überschrieben werden; override bestätigt das Überschreiben.'),
          A.q('Wie heißt in C# das Gegenstück zu `super(...)` in Java?', ['base(...)', 'parent(...)', 'upper(...)', 'this(...)'], 0, 'base(...) ruft den Konstruktor oder Methoden der Basisklasse auf.'),
          A.q('Woran erkennst du nach C#-Namenskonvention sofort ein Interface?', ['Der Name beginnt mit einem großen I', 'Der Name steht komplett in Kleinbuchstaben', 'Der Name endet immer auf _Interface', 'Der Name beginnt mit einem Unterstrich'], 0, 'Das führende I (IEnumerable, IDisposable, IZahlungsmethode) ist fester .NET-Standard.')
        ],
        tasks: [
          A.fill('Leite `DigitalArtikel` von `Artikel` ab und rufe den Oberklassen-Konstruktor auf.', 'class DigitalArtikel {{:}} Artikel {\n    public DigitalArtikel(string n, long p) : {{base}}(n, p) { }\n}', 'Doppelpunkt für Vererbung, base für den Oberklassen-Konstruktor.'),
          A.fill('Überschreibe die virtuelle Methode `VersandInCent()` in der Unterklasse.', 'public {{override}} long VersandInCent() => 0;', 'Das Pflicht-Schlüsselwort in C# beim Überschreiben.')
        ]
      },

      /* ---------- 10. Exceptions ---------- */
      {
        concept: 'err', standalone: true, domain: 'shop', stage: 3,
        title: 'Exceptions: Fehler abfangen statt abstürzen',
        goal: 'Du fängst Exceptions mit try, catch und finally gezielt ab, löst eigene Exceptions mit throw aus und liest .NET-Stacktraces sicher.',
        terms: [['Ausnahme (Exception)', 'Exception'], 'Laufzeitfehler', 'Stacktrace'],
        parts: [
          A.text('Gezielt abfangen statt Absturz', 'Eine **Exception** meldet in C# einen **Laufzeitfehler** (z. B. `FormatException` beim Parsen oder `InvalidOperationException` bei leerem Lager). Anders als Java kennt C# keine „Checked Exceptions“ – du entscheidest selbst, wo `try`/`catch` sinnvoll ist.'),
          C([
            'string[] eingaben = { "2", "zwei", "5" };',
            'int gesamt = 0;',
            'foreach (string e in eingaben) {',
            '    try {',
            '        gesamt += int.Parse(e);§Bei "zwei" fliegt eine FormatException.',
            '    } catch (FormatException) {§Fängt genau diesen Fehlertyp.',
            '        Console.WriteLine($"Ungültige Menge: {e}");',
            '    }',
            '}',
            'Console.WriteLine($"Gesamt: {gesamt}");§2 + 5 = 7, kein Absturz.'
          ], 'try und catch bei Formulareingaben', { praxis: 'Bei Zahlen-Parsing nutzt man in C# meist int.TryParse – aber für Dateien, Datenbanken und Geschäftsregeln ist try/catch unverzichtbar.' }),
          C([
            'static void Entnehmen(int bestand, int menge) {',
            '    if (menge > bestand) throw new InvalidOperationException($"Nur noch {bestand} auf Lager");',
            '}',
            'try {',
            '    Entnehmen(3, 5);',
            '} catch (InvalidOperationException ex) {',
            '    Console.WriteLine($"Abgelehnt: {ex.Message}");',
            '} finally {§Läuft immer – mit oder ohne Fehler.',
            '    Console.WriteLine("Prüfung abgeschlossen");',
            '}'
          ], 'throw und finally', { praxis: 'In echten .NET-Services wirft die Lagerlogik InvalidOperationException oder ArgumentException, und der Web-Controller wandelt sie in HTTP 400/409 um.' }),
          A.table(['C#-Exception', 'Ursache', 'Beispiel'], [
            ['`NullReferenceException`', 'Zugriff auf ein Objekt, das `null` ist', '`ticket.Bearbeiter.Length` bei `null`'],
            ['`IndexOutOfRangeException`', 'Array-Index außerhalb `0 .. Length-1`', '`preise[preise.Length]`'],
            ['`FormatException`', 'Text lässt sich nicht parsen', '`int.Parse("zwei")`'],
            ['`ArgumentException`', 'ungültiger Methodenparameter', 'negativer Preis im Konstruktor']
          ], 'Die häufigsten Exceptions im .NET-Stacktrace'),
          A.table(['Dasselbe in anderen Kursen', 'Direktlink'], [
            ['Java: Exceptions', '[Java, Modul 10](/code-lernen/kurs/java/err/)'],
            ['Python: Exceptions', '[Python, Modul 10](/code-lernen/kurs/python/err/)']
          ], 'Sprachvergleich')
        ],
        tips: [
          A.warn('Fange immer die **spezifischste** Exception (`FormatException`, `InvalidOperationException`) statt blind `catch (Exception) {}`.')
        ],
        quiz: [
          A.q('Welche Exception wirft `int.Parse("zwei")` in C#?', ['FormatException', 'NumberFormatException', 'ValueError', 'TypeError'], 0, 'In C# heißt sie FormatException (in Java NumberFormatException, in Python ValueError).'),
          A.q('Wann läuft der `finally`-Block in C#?', ['Immer – mit oder ohne Exception', 'Nur wenn eine Exception aufgetreten ist', 'Nur wenn kein catch-Block gepasst hat', 'Nur wenn das Programm ohne Fehler läuft'], 0, 'finally garantiert Aufräumarbeiten (bei Dateien/DB auch mit using).'),
          A.q('Wie heißt in C# die Exception bei einem Methodenaufruf auf `null`?', ['NullReferenceException', 'NullPointerException', 'TypeError', 'EmptyObjectException'], 0, 'NullPointerException ist Java, in C# heißt sie NullReferenceException.')
        ],
        tasks: [
          A.fill('Fange gezielt die Exception ab, die `int.Parse("zwei")` in C# wirft.', '} catch ({{FormatException}} ex) {', 'Der C#-Typ für ungültiges Zahlenformat.'),
          A.fill('Löse eine Exception aus, wenn der Betrag negativ ist.', 'if (betrag < 0) {{throw}} new ArgumentException("Negativer Betrag");', 'Schlüsselwort zum Werfen einer Exception.')
        ]
      },

      /* ---------- 11. Architektur ---------- */
      {
        id: 'architektur', standalone: true, domain: 'shop', stage: 4,
        title: 'Zusammenhänge: Warenkorb, Position, Artikel und RabattRechner',
        goal: 'Du liest das 4-Klassen-Shop-Modell in C#, erkennst Single Responsibility, Komposition und Assoziation und verfolgst den Checkout quer durch die Klassen.',
        terms: ['Klassendiagramm', 'Sequenzdiagramm', 'Komposition', 'Assoziation', 'Single Responsibility'],
        parts: [
          A.text('Vier Klassen, eine Bestellung', 'Hier fügen sich alle Bausteine zum kompletten 4-Klassen-Shop zusammen – identisch zu Java, Python, JavaScript und dem Modellieren-Kurs (**Single Responsibility**: jede Klasse hat genau eine Aufgabe).'),
          A.uml('klasse Warenkorb\n  - positionen: List<Position>\n  + Hinzufuegen(a: Artikel, menge: int): void\n  + SummeInCent(): long\nklasse Position\n  - menge: int\n  + BetragInCent(): long\nklasse Artikel\n  - Name: string\n  - PreisInCent: long\nklasse RabattRechner\n  + RabattInCent(summeInCent: long): long\nWarenkorb "1" *-- "*" Position : enthält\nPosition "*" --> "1" Artikel', 'Das Shop-Klassendiagramm'),
          C([
            'var korb = new Warenkorb();',
            'korb.Hinzufuegen(new Artikel("Funkmaus", 1999), 2);',
            'korb.Hinzufuegen(new Artikel("Monitor 27 Zoll", 22900), 1);',
            'long summe = korb.SummeInCent();',
            'long rabatt = new RabattRechner().RabattInCent(summe);',
            'Console.WriteLine($"Summe {summe}, Rabatt {rabatt}, zu zahlen {summe - rabatt} Cent");',
            'class Artikel {',
            '    public string Name { get; }',
            '    public long PreisInCent { get; }',
            '    public Artikel(string name, long preis) { Name = name; PreisInCent = preis; }',
            '}',
            'class Position {',
            '    private readonly Artikel artikel;§Gerichtete Assoziation (* --> 1).',
            '    private readonly int menge;',
            '    public Position(Artikel a, int m) { artikel = a; menge = m; }',
            '    public long BetragInCent() => artikel.PreisInCent * menge;',
            '}',
            'class Warenkorb {',
            '    private readonly List<Position> positionen = new();§Komposition (1 *-- *).',
            '    public void Hinzufuegen(Artikel a, int m) => positionen.Add(new Position(a, m));',
            '    public long SummeInCent() { long s = 0; foreach (var p in positionen) s += p.BetragInCent(); return s; }',
            '}',
            'class RabattRechner {',
            '    public long RabattInCent(long summe) => summe >= 10000 ? summe * 10 / 100 : 0;',
            '}'
          ], 'Das 4-Klassen-Modell in C#', { praxis: 'readonly bei privaten Feldern entspricht final in Java: Die Referenz wird im Konstruktor gesetzt und kann danach nicht mehr ausgetauscht werden.' }),
          A.seq(['Main', 'Warenkorb', 'Position', 'Artikel', 'RabattRechner'], [
            ['Main', 'Warenkorb', 'SummeInCent()'],
            ['Warenkorb', 'Position', 'BetragInCent()'],
            ['Position', 'Artikel', 'PreisInCent'],
            ['Artikel', 'Position', '1999', 'ret'],
            ['Position', 'Warenkorb', '3998', 'ret'],
            ['Warenkorb', 'Main', '26898', 'ret'],
            ['Main', 'RabattRechner', 'RabattInCent(26898)'],
            ['RabattRechner', 'Main', '2689', 'ret']
          ], 'Der Aufruf im Sequenzdiagramm'),
          A.table(['Dasselbe Modell in anderen Kursen', 'Direktlink'], [
            ['Java, Modul 11', '[Java: Zusammenhänge](/code-lernen/kurs/java/architektur/)'],
            ['Python, Modul 11', '[Python: Zusammenhänge](/code-lernen/kurs/python/architektur/)'],
            ['Modellieren, Lektion 7', '[Modellieren: Entwurf](/code-lernen/kurs/oop/entwurf/)']
          ], 'Quer durch alle Sprachen')
        ],
        quiz: [
          A.q('Wofür steht `private readonly Artikel artikel;` in C#?', ['Das Feld ist privat und darf nur im Konstruktor gesetzt werden', 'Das Feld ist öffentlich lesbar und änderbar', 'Das Feld ist statisch und für alle Positionen gleich', 'Das Feld darf nur Zahlen speichern'], 0, 'readonly ist das C#-Gegenstück zu final in Java.'),
          A.q('Ab morgen gibt es 15 % Rabatt ab 200 Euro. Welche Klasse änderst du?', ['Nur RabattRechner', 'Warenkorb und RabattRechner', 'Artikel und Position', 'Alle vier Klassen'], 0, 'Single Responsibility: Rabattregeln leben an genau einer Stelle.')
        ],
        tasks: [
          A.fill('Ergänze den Typ der Positionsliste im Warenkorb.', 'private readonly List<{{Position}}> positionen = new();', 'Die Klasse der Elemente in der Liste.')
        ]
      },

      /* ---------- 12. Clean Code ---------- */
      {
        id: 'clean', standalone: true, domain: 'shop', stage: 4,
        title: 'Clean Code: lesbar schreiben, was andere lesen müssen',
        goal: 'Du erkennst unsauberen C#-Code (Magic Numbers, verschachtelte ifs, Wiederholungen) und wählst sauberes Refactoring bei gleichem Verhalten.',
        terms: ['Clean Code', 'Magic Number', 'Guard Clause', 'DRY', 'Single Responsibility', 'Refactoring'],
        parts: [
          A.text('Lesbarer C#-Code im Team', '**Clean Code** und **Refactoring** folgen in C# denselben Prinzipien wie in Java und Python: sprechende Namen mit Einheit (`preisInCent`), benannte Konstanten statt **Magic Numbers**, **Guard Clauses** statt tiefer Verschachtelung, **DRY** und **Single Responsibility**.'),
          C([
            'static string PruefeBestellung(int menge, int lager, bool bezahlt) {§Guard Clauses statt 3 Ebenen if/else.',
            '    if (menge <= 0) return "ungültige Menge";',
            '    if (menge > lager) return "nicht genug auf Lager";',
            '    if (!bezahlt) return "auf Zahlung warten";',
            '    return "versenden";',
            '}',
            'Console.WriteLine(PruefeBestellung(2, 5, true));'
          ], 'Guard Clauses in C#', { praxis: 'Jeder Sonderfall steigt sofort mit return aus – der Normalfall steht klar und uneingerückt am Ende.' })
        ],
        quiz: [
          A.q('Was ist eine Magic Number?', ['Unerklärte Zahl mitten im Code', 'Zufallszahl aus Random.Next()', 'Eine benannte Konstante const', 'Der Rückgabewert einer Methode'], 0, 'Benannte Konstanten machen klar, wofür 5000 oder 495 steht.'),
          A.q('Was darf sich bei einem Refactoring ändern?', ['Nur die Struktur, niemals das Verhalten', 'Struktur und Ausgabe gleichzeitig', 'Nur die Kommentare im Code', 'Alle Methodennamen der öffentlichen API'], 0, 'Refactoring verbessert Lesbarkeit bei identischem Ergebnis.')
        ],
        tasks: [
          A.choose('Beide Varianten rechnen dasselbe. Welche ist sauberer?', 'csharp', [
            ['int a = 3; int b = 1999; int c = a * b; Console.WriteLine(c);'],
            ['int menge = 3; int preisInCent = 1999; int summeInCent = menge * preisInCent; Console.WriteLine(summeInCent);']
          ], { a: 1, expect: '5997' }, 'Welche Namen erklären Einheit und Bedeutung von selbst?', 'Sprechende Namen mit Einheit machen sofort klar, dass in Cent gerechnet wird.'),
          A.choose('Alle Varianten liefern dasselbe. Welche ist am saubersten?', 'csharp', [
            ['static bool IstLieferbar(int l) { if (l > 0) { return true; } else { return false; } }', 'Console.WriteLine(IstLieferbar(3));'],
            ['static bool IstLieferbar(int l) => l > 0;', 'Console.WriteLine(IstLieferbar(3));']
          ], { a: 1, expect: 'True' }, 'Was liefert l > 0 bereits selbst?', 'Der Vergleich ist bereits ein bool – die Einzeiler-Methode mit => ist klar und fehlerfrei.'),
          A.choose('Beide Varianten berechnen die Versandkosten gleich. Welche folgt DRY?', 'csharp', [
            ['Console.WriteLine(3000 >= 5000 ? 0 : 495);', 'Console.WriteLine(7200 >= 5000 ? 0 : 495);'],
            ['static long Versand(long w) => w >= 5000 ? 0 : 495;', 'Console.WriteLine(Versand(3000));', 'Console.WriteLine(Versand(7200));']
          ], { a: 1, expect: '495\n0' }, 'Wo steht die Versandregel nur einmal?', 'DRY: Die Methode Versand() bündelt die Regel an genau einer Stelle.')
        ]
      },

      /* ---------- 13. Bug-Arena ---------- */
      {
        id: 'bugs', standalone: true, domain: 'shop', stage: 4,
        title: 'Bug-Arena: Fehler finden und beheben',
        goal: 'Du findest in fremdem C#-Code die fehlerhafte Zeile, bestimmst die Fehlerart (Syntax, Laufzeit, Logik) und wählst den richtigen Fix.',
        terms: ['Syntaxfehler', 'Laufzeitfehler', 'Logikfehler', 'Off-by-one-Fehler', 'Debugging'],
        parts: [
          A.text('Fehlersuche wie in der Prüfung', 'Geh beim **Debugging** systematisch vor: **Wo** liegt die Ursache, **welche Fehlerart** ist es (**Syntaxfehler**, **Laufzeitfehler** oder **Logikfehler**), und was ist der **kleinste richtige Fix**? Typische C#-Fallen sind der **Off-by-one-Fehler** (`<= Length`), `NullReferenceException`, Ganzzahl-Division und Operator-Priorität.')
        ],
        quiz: [
          A.q('Ein C#-Programm startet gar nicht, weil `int` statt `bool` im `if` steht. Welche Fehlerart?', ['Syntaxfehler', 'Laufzeitfehler', 'Logikfehler', 'Netzwerkfehler'], 0, 'Der C#-Compiler prüft Typen schon vor dem Start.'),
          A.q('Das Programm rechnet ohne Absturz 4445 statt 4045 Cent. Welche Fehlerart?', ['Logikfehler', 'Syntaxfehler', 'Laufzeitfehler', 'Compilerfehler'], 0, 'Kein Abbruch, aber falsches Ergebnis = Logikfehler.')
        ],
        tasks: [
          A.bug('Ticketsystem: Beim Zählen der zugewiesenen Tickets stürzt das Programm mit NullReferenceException ab.', 'csharp', [
            'string[] bearbeiter = { "m.weber", null, "s.kaya" };',
            'int zugewiesen = 0;',
            'foreach (string name in bearbeiter) {',
            '    if (name.Length > 0) zugewiesen++;',
            '}',
            'Console.WriteLine(zugewiesen);'
          ], { line: 3, kind: 'laufzeit', fixes: [
            'if (name != null && name.Length > 0) zugewiesen++;',
            'if (name.Length > 0 && name != null) zugewiesen++;',
            'if (name != null || name.Length > 0) zugewiesen++;',
            'if (name == null) zugewiesen++;'
          ], expect: '2' }, 'In welcher Reihenfolge prüft &&, und was passiert bei null.Length?', 'name != null muss links stehen, damit && bei null sofort abbricht.'),
          A.bug('Kasse: 10 % Rabatt auf Ware + Versand soll 4045 Cent ergeben, nicht 4445.', 'csharp', [
            'int preis = 4000;',
            'int versand = 495;',
            'int gesamt = preis + versand * 90 / 100;',
            'Console.WriteLine(gesamt);'
          ], { line: 2, kind: 'logik', fixes: [
            'int gesamt = (preis + versand) * 90 / 100;',
            'int gesamt = preis + (versand * 90) / 100;',
            'int gesamt = (preis + versand) * 10 / 100;',
            'int gesamt = preis * 90 / 100 + versand;'
          ], expect: '4045' }, 'Punkt vor Strich: Worauf wirkt * 90 / 100 ohne Klammern?', 'Erst (preis + versand) addieren, dann mit 90 / 100 rabattieren.')
        ]
      },

      /* ---------- 14. Vertiefung: LINQ & Lambdas ---------- */
      {
        id: 'adv', standalone: true, domain: 'tickets', stage: 4,
        title: 'Vertiefung: LINQ und Lambdas im Ticketsystem',
        goal: 'Du filterst, transformierst und zählst Listen mit LINQ (Where, Select, Count, Sum, OrderBy) und Lambdas (t => …).',
        terms: ['Lambda'],
        parts: [
          A.text('LINQ: Abfragen wie SQL direkt im C#-Code', '**LINQ** (Language Integrated Query) verbindet C#-Listen mit einer Abfragesprache ähnlich SQL – nur typsicher vom Compiler geprüft. Jede Station bekommt ein kurzes **Lambda** (`t => …`).'),
          C([
            'using System.Linq;',
            'var tickets = new List<Ticket> {',
            '    new(501, "Drucker", 3, "offen"),',
            '    new(502, "Server down", 1, "in Arbeit"),',
            '    new(504, "VPN bricht ab", 2, "offen")',
            '};',
            'var offeneTitel = tickets§Fließband über die Ticketliste.',
            '    .Where(t => t.Status == "offen")§Filter: nur offene Tickets.',
            '    .OrderBy(t => t.Prio)§Sortieren: wichtigste Priorität (kleinste Zahl) zuerst.',
            '    .Select(t => t.Titel);§Umwandeln: nur noch die Titel.',
            'Console.WriteLine(string.Join(", ", offeneTitel));§VPN bricht ab, Drucker',
            'Console.WriteLine($"Offen: {tickets.Count(t => t.Status == "offen")}");§Direkt zählen.',
            'record Ticket(int Id, string Titel, int Prio, string Status);§record: kompakte Datenklasse in einer Zeile.'
          ], 'LINQ am IT-Ticketsystem', { praxis: 'In fast jedem modernen C#/.NET-Projekt laufen Datenbankabfragen (Entity Framework Core) und Listen-Auswertungen komplett über LINQ.' }),
          A.table(['LINQ (C#)', 'Java Stream', 'SQL'], [
            ['`.Where(t => …)`', '`.filter(t -> …)`', '`WHERE …`'],
            ['`.Select(t => …)`', '`.map(t -> …)`', '`SELECT …`'],
            ['`.OrderBy(t => …)`', '`.sorted(…)`', '`ORDER BY …`'],
            ['`.Count()` / `.Sum()`', '`.count()` / `.sum()`', '`COUNT(*)` / `SUM(…)`']
          ], 'LINQ im Vergleich zu Java Streams und SQL', 'Weiter zum Vergleich: [Java, Modul 14: Streams](/code-lernen/kurs/java/adv/) und [SQL: Filtern mit WHERE](/code-lernen/kurs/sql/where/).')
        ],
        quiz: [
          A.q('Welche LINQ-Methode entspricht der SQL-Klausel `WHERE`?', ['Where(t => …)', 'Select(t => …)', 'OrderBy(t => …)', 'First(t => …)'], 0, 'Where filtert Elemente nach einer Bedingung.'),
          A.q('Was macht `.Select(t => t.Titel)` in LINQ?', ['Wandelt jedes Ticket in seinen Titel (string) um', 'Sortiert die Tickets alphabetisch nach Titel', 'Löscht alle Tickets ohne Titel aus der Liste', 'Zählt, wie viele Tickets denselben Titel haben'], 0, 'Select entspricht map in Java/JavaScript und SELECT in SQL.')
        ],
        tasks: [
          A.fill('Filtere mit LINQ alle kritischen Tickets (Priorität 1).', 'var kritisch = tickets.{{Where}}(t => t.Prio == 1);', 'LINQ-Methode zum Filtern (wie in SQL).')
        ]
      }
    ]
  });
})();
