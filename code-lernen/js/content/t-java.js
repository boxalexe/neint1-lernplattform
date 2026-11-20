/* Kurs: Java */
(function () {
  'use strict';
  const A = window.Academy, C = (lines, h, o) => A.code('java', lines, h, o);
  const PP = (prompt, code, ans, hint, expl) => Object.assign(A.predict(prompt, code, ans, hint, expl), { lang: 'java' });

  A.track({
    id: 'java', title: 'Java', tag: 'JAVA',
    desc: 'Streng typisiert und objektorientiert: Variablen, Methoden, Arrays, Klassen, Vererbung und Ausnahmen. Der Klassiker in Ausbildung, Studium und Unternehmen.',
    intro: 'In Java gehört **alles in Klassen**, und jede Variable hat einen **festen Typ**, den du hinschreibst (zum Beispiel `int` oder `String`). Das wirkt zuerst streng, hilft aber, Fehler früh zu finden: Der Compiler meldet sie schon **vor** dem Start.\n\nZum Ausprobieren brauchst du ein **JDK** (z. B. Temurin von adoptium.net) und eine Datei `Main.java`. Starten: `javac Main.java` (übersetzen), dann `java Main` (ausführen). Ab JDK 11 geht für einzelne Dateien auch `java Main.java`. Die Code-Beispiele in den weiteren Lektionen zeigen meist nur den Teil **innerhalb von `main`**.',
    lessons: [
      {
        concept: 'hello',
        parts: [
          C(['public class Main {§Jedes Java-Programm besteht aus Klassen. Diese heißt Main, die Datei muss deshalb Main.java heißen.', '    public static void main(String[] args) {§Die **main-Methode**: Hier beginnt jedes Java-Programm. Den Kopf schreibst du immer genau so.', '        System.out.println("Hallo Welt");§Gibt den Text aus und macht danach einen Zeilenumbruch. Jede Anweisung endet mit einem **Semikolon**.', '        System.out.print("ohne Umbruch");§print macht **keinen** Zeilenumbruch.', '    }§Ende der Methode (geschweifte Klammern fassen Blöcke zusammen).', '}§Ende der Klasse.'], 'Dein erstes Java-Programm')
        ],
        tips: [A.warn('Java unterscheidet Groß- und Kleinschreibung: `System` mit großem S, `main` klein. Der Dateiname muss zum Namen der öffentlichen Klasse passen.')],
        quiz: [A.q('Womit endet in Java eine Anweisung?', ['Mit einem Semikolon', 'Mit einem Punkt', 'Mit einem Doppelpunkt', 'Mit nichts'], 0, 'Das Semikolon beendet jede Anweisung. Ein vergessenes Semikolon ist ein Klassiker unter den Anfängerfehlern.')],
        tasks: [PP('Was gibt das Programm aus?', ['System.out.println("a");', 'System.out.print("b");', 'System.out.println("c");'], 'a\nbc', 'println macht einen Zeilenumbruch, print nicht.', 'Nach "a" folgt ein Zeilenumbruch. Dann steht "b" ohne Umbruch, danach "c" in derselben Zeile.')]
      },
      {
        concept: 'vars',
        parts: [
          C(['int alter = 25;§**Typ Name = Wert**. int ist eine ganze Zahl. Der Typ steht **immer** vor dem Namen.', 'double preis = 19.99;§double für Kommazahlen, mit Punkt geschrieben.', 'String name = "Ada";§String (großes S!) ist Text, in doppelten Anführungszeichen.', 'boolean istStudent = true;§boolean: nur true oder false.', "char buchstabe = 'A';§char ist **ein** Zeichen, in einfachen Anführungszeichen.", 'alter = alter + 1;§Neu zuweisen: ohne Typ, denn die Variable gibt es schon. Jetzt 26.', 'System.out.println(name + " ist " + alter);§Mit + hängst du Text und Werte aneinander: Ada ist 26'], 'Variablen mit festem Typ'),
          C(['final int MAX_PUNKTE = 100;§final macht die Variable zur **Konstante**: Sie darf nicht mehr geändert werden. Konstanten schreibt man GROSS_MIT_UNTERSTRICH.', 'var zahl = 42;§var lässt Java den Typ erkennen (int). Er bleibt trotzdem fest.', 'int ergebnis = Integer.parseInt("25");§Wandelt Text in eine Zahl um.', 'String text = String.valueOf(25);§Wandelt eine Zahl in Text um.'], 'Konstanten, var und Umwandlungen'),
          C(['import java.util.Scanner;§Holt die Klasse Scanner. Gehört ganz an den Anfang der Datei.', 'Scanner sc = new Scanner(System.in);§Ein Scanner liest von der Tastatur (System.in).', 'System.out.print("Dein Alter: ");§Fragt nach.', 'int alter = sc.nextInt();§Liest eine ganze Zahl ein. Für Text: sc.nextLine().'], 'Eingabe mit Scanner'),
          // Eingabe, Umwandlung und Ausgabe nach dem EVA-Prinzip (Allvater 20.11.2026, aus den Übungen im Ordner Sandmensch)
          C(['// Eingabe§**E**VA: Eingabe. Was über die Tastatur kommt, ist immer erst Text.', 'System.out.print("Tag: ");', 'int tag = Integer.parseInt(sc.nextLine());§**Parsen**: Der Text "7" wird zur Zahl 7. Das Zeichen \'7\' ist intern nämlich der Code 55, nicht die Zahl 7.', 'System.out.print("Monat: ");', 'int monat = Integer.parseInt(sc.nextLine());', 'double breite = Double.parseDouble("2.5");§Für Kommazahlen gibt es Double.parseDouble, mit Punkt geschrieben. Steht dort "abc", gibt es eine NumberFormatException.', '// Verarbeitung§E**V**A: rechnen, vergleichen, zusammensetzen.', 'String datum = String.format("%02d.%02d.", tag, monat);§`%02d` heißt: ganze Zahl, mindestens zwei Stellen, vorne mit 0 auffüllen. Aus 7 wird 07.', '// Ausgabe§EV**A**: das Ergebnis in verständlicher Form.', 'System.out.println("Datum: " + datum);§Bei Tag 10 und Monat 7 steht hier: Datum: 10.07.'], 'Eingabe umwandeln und formatiert ausgeben (EVA-Prinzip)', { p: '`Integer` und `Double` sind **Wrapperklassen**: Zu jedem einfachen Datentyp gibt es eine Klasse mit Hilfsmethoden wie `parseInt`. Weitere sind `Long`, `Float`, `Boolean` und `Character`.' })
        ],
        tips: [A.warn('Du kannst einer `int`-Variable keinen Text zuweisen: `int x = "5";` ist ein **Fehler beim Übersetzen**. Das ist gewollt: Der Compiler schützt dich.'), A.tip('Variablen und Methoden schreibt man in **camelCase** (`istStudent`), Klassen mit großem Anfang (`Konto`).')],
        quiz: [A.q('Was ist `String` in Java?', ['Der Datentyp für Text', 'Ein Zahlentyp', 'Ein Schlüsselwort für Schleifen', 'Eine Methode'], 0, 'String (mit großem S) steht für Text. Es ist eigentlich eine Klasse.')],
        tasks: [PP('Was gibt das Programm aus?', ['int x = 3;', 'int y = x;', 'x = 10;', 'System.out.println(x + " " + y);'], '10 3', 'y bekam den Wert 3, bevor x geändert wurde.', 'Bei `int y = x;` wird der aktuelle Wert kopiert.'), A.fill('Ergänze den Datentyp für ganze Zahlen.', '{{int}} anzahl = 5;', 'Für ganze Zahlen gibt es in Java den Typ int.'), PP('Was gibt das Programm aus?', ['int tag = 3, monat = 7, jahr = 2026;', 'System.out.println(jahr + "-" + monat + "-" + tag);', 'System.out.println(String.format("%02d.%02d.%d", tag, monat, jahr));'], '2026-7-3\n03.07.2026', 'Einfaches + hängt die Zahlen ohne führende Null an. %02d füllt auf zwei Stellen auf, %d nicht.', 'Die erste Zeile setzt die Werte einfach zusammen. Die zweite formatiert Tag und Monat zweistellig mit führender Null.'), A.fill('Wandle den eingelesenen Text in eine ganze Zahl um.', 'int zahl = Integer.{{parseInt}}(sc.nextLine());', 'Die Methode der Wrapperklasse Integer, die Text in int umwandelt.')]
      },
      {
        concept: 'ops',
        parts: [
          C(['System.out.println(7 + 3);§Addition: 10', 'System.out.println(7 / 2);§**Achtung:** Beide Zahlen sind int, also wird **ganzzahlig** geteilt: 3 (nicht 3.5!).', 'System.out.println(7 / 2.0);§Ist eine Zahl eine Kommazahl, wird normal geteilt: 3.5', 'System.out.println(7 % 2);§Rest der Division: 1', 'System.out.println(Math.pow(2, 10));§Potenz über die Klasse Math. Liefert ein double: 1024.0', 'System.out.println(5 > 3 && 5 < 10);§&& = UND: true', 'System.out.println(!(5 == 5));§! = NICHT, == vergleicht: false', 'System.out.println(5 != 4);§!= bedeutet ungleich: true'], 'Rechnen, Vergleichen, Verknüpfen'),
          C(['String a = "Hallo";§Ein Text.', 'String b = new String("Hallo");§Ein **neues** Textobjekt mit gleichem Inhalt.', 'System.out.println(a == b);§false! == vergleicht bei Objekten, ob es **dasselbe Objekt** ist.', 'System.out.println(a.equals(b));§true. Texte vergleicht man **immer mit equals**.'], 'Texte vergleichen: equals statt ==')
        ],
        tips: [A.warn('`7 / 2` ergibt in Java **3**. Bei zwei `int` wird immer ganzzahlig geteilt. Willst du 3.5, mach eine Zahl zum `double` (`7 / 2.0`) oder wandle sie um: `(double) 7 / 2`.')],
        quiz: [A.q('Was ergibt `7 / 2` in Java, wenn beide Zahlen `int` sind?', ['3', '3.5', '4', '3.0'], 0, 'Ganzzahl-Division schneidet die Nachkommastellen ab.'), A.q('Wie vergleicht man zwei Texte in Java richtig?', ['mit a.equals(b)', 'mit a == b', 'mit a = b', 'mit a.length() == b.length()'], 0, '== prüft bei Objekten die Identität, nicht den Inhalt.')],
        tasks: [PP('Was gibt das Programm aus?', ['System.out.println(17 / 5);', 'System.out.println(17 % 5);'], '3\n2', 'Beides sind int. 17 / 5 ist ganzzahlig, % liefert den Rest.')]
      },
      {
        concept: 'cond',
        parts: [
          C(['int temperatur = 22;§Der Wert, nach dem entschieden wird.', 'if (temperatur > 25) {§Bedingung in runden Klammern, Block in geschweiften.', '    System.out.println("heiß");§Läuft nur, wenn die Bedingung stimmt.', '} else if (temperatur > 15) {§Nur geprüft, wenn die erste Bedingung falsch war.', '    System.out.println("angenehm");§22 > 15 stimmt: Ausgabe angenehm.', '} else {§Alle übrigen Fälle.', '    System.out.println("kühl");§Wird hier nicht erreicht.', '}§Ende der Kette.'], 'if, else if, else'),
          C(['int tag = 3;§Ein Wert, der mehrere feste Fälle haben kann.', 'switch (tag) {§switch wählt anhand des Werts einen Fall.', '    case 1:§Fall: tag ist 1.', '        System.out.println("Montag");§Wird bei 1 ausgeführt.', '        break;§break beendet den switch. **Ohne break läuft es in den nächsten Fall weiter!**', '    case 3:§Fall: tag ist 3.', '        System.out.println("Mittwoch");§Hier landest du.', '        break;§Beendet den switch.', '    default:§Alle anderen Werte.', '        System.out.println("anderer Tag");§Auffangfall.', '}§Ende des switch.'], 'switch für feste Fälle')
        ],
        tips: [A.warn('`if (x = 5)` ist in Java ein **Fehler beim Übersetzen**, weil `x = 5` kein Wahrheitswert ist. Das schützt dich vor einem Fehler, der in C passiert. Vergleichen heißt `==`.')],
        quiz: [A.q('Was passiert in einem `switch` ohne `break`?', ['Das Programm läuft in den nächsten Fall weiter', 'Der Compiler meldet einen Fehler und übersetzt nicht', 'Der switch endet nach dem Fall trotzdem', 'Der Fall wird übersprungen'], 0, 'Man nennt das „Durchfallen“. Meist ist es nicht gewollt.')],
        tasks: [PP('Was wird ausgegeben?', ['int x = 10;', 'if (x > 5 && x < 8) {', '    System.out.println("A");', '} else if (x > 5) {', '    System.out.println("B");', '} else {', '    System.out.println("C");', '}'], 'B', 'Die erste Bedingung braucht x < 8 (falsch), die zweite stimmt.')]
      },
      {
        concept: 'loops',
        parts: [
          C(['for (int i = 1; i <= 3; i++) {§Drei Teile: Start (int i = 1), Bedingung (i <= 3), Schritt (i++ erhöht i um 1). Läuft für 1, 2, 3.', '    System.out.println("Durchlauf " + i);§Schleifenkörper in geschweiften Klammern.', '}§Ende.'], 'Zählschleife for'),
          C(['int zahl = 1;§Startwert.', 'while (zahl < 50) {§Bedingung wird vor jedem Durchlauf geprüft.', '    zahl = zahl * 3;§Etwas muss sich ändern, sonst läuft die Schleife ewig.', '}§Ende.', 'System.out.println(zahl);§Ausgabe: 81'], 'Bedingungsschleife while'),
          C(['int n = 0;§Startwert.', 'do {§do…while prüft **am Ende**: Der Block läuft mindestens einmal.', '    n = n + 4;§n wird 4, 8, 12.', '} while (n < 10);§Prüfung nach dem Durchlauf. Endet bei 12.', 'System.out.println(n);§Ausgabe: 12'], 'do … while'),
          C(['String[] farben = {"rot", "grün", "blau"};§Ein Array mit drei Texten.', 'for (String farbe : farben) {§Die erweiterte for-Schleife: „für jede farbe in farben“.', '    System.out.println(farbe);§Gibt rot, grün, blau aus.', '}§Ende.'], 'Alle Elemente durchlaufen')
        ],
        tips: [A.warn('Ein Semikolon direkt hinter `for (…)` oder `while (…)` (`for (…);`) macht den Block danach zu einer eigenen, **unabhängigen** Anweisung. Die Schleife läuft dann leer.')],
        quiz: [A.q('Wie oft läuft `for (int i = 0; i < 5; i++)`?', ['5-mal', '4-mal', '6-mal', 'Nie'], 0, 'i ist 0, 1, 2, 3, 4.')],
        tasks: [PP('Was wird ausgegeben? (Eine Zahl pro Zeile.)', ['for (int i = 0; i < 3; i++) {', '    System.out.println(i * 2);', '}'], '0\n2\n4', 'i ist 0, 1 und 2.')]
      },
      {
        concept: 'funcs',
        parts: [
          C(['public class Main {§Methoden gehören in eine Klasse.', '    static int flaeche(int laenge, int breite) {§Eine Methode: **Rückgabetyp** (int), Name, Parameter **mit Typ**. static erlaubt den Aufruf direkt aus main.', '        return laenge * breite;§return liefert das Ergebnis, der Typ muss zum Rückgabetyp passen.', '    }§Ende der Methode.', '', '    static void gruss(String name) {§void heißt: gibt **nichts** zurück.', '        System.out.println("Hallo " + name + "!");§Macht nur eine Ausgabe.', '    }§Ende.', '', '    public static void main(String[] args) {§Hier startet das Programm.', '        int raum = flaeche(4, 5);§Aufruf mit 4 und 5, Ergebnis 20.', '        System.out.println("Raumgröße: " + raum);§Gibt aus: Raumgröße: 20', '        gruss("Ada");§Gibt aus: Hallo Ada!', '    }§Ende von main.', '}§Ende der Klasse.'], 'Methoden mit Rückgabewert und void')
        ],
        tips: [A.info('Mehrere Methoden dürfen **denselben Namen** haben, wenn ihre Parameter sich unterscheiden (**Überladen**): `static int addiere(int a, int b)` und `static double addiere(double a, double b)`.')],
        quiz: [A.q('Was bedeutet `void` als Rückgabetyp?', ['Die Methode gibt nichts zurück', 'Die Methode gibt immer 0 zurück', 'Die Methode hat keinen Inhalt und keine Parameter', 'Die Methode ist privat'], 0, 'void bedeutet „kein Rückgabewert“.')],
        tasks: [PP('Was wird ausgegeben?', ['static int doppelt(int n) {', '    return n * 2;', '}', '// in main:', 'System.out.println(doppelt(doppelt(3)));'], '12', 'doppelt(3) ist 6, dann doppelt(6) ist 12.')]
      },
      {
        concept: 'coll',
        parts: [
          C(['int[] zahlen = {4, 9, 7, 1};§Ein **Array** fester Größe. Typ mit [] und Werte in geschweiften Klammern.', 'System.out.println(zahlen[0]);§Erstes Element, Index 0: 4', 'zahlen[1] = 20;§Ersetzt das zweite Element.', 'System.out.println(zahlen.length);§length (ohne Klammern) ist die Anzahl: 4', 'for (int z : zahlen) {§Alle Elemente durchlaufen.', '    System.out.println(z);§Gibt jedes Element aus.', '}§Ende.'], 'Arrays mit fester Größe'),
          C(['import java.util.ArrayList;§Die Klasse ArrayList muss importiert werden.', 'ArrayList<String> namen = new ArrayList<>();§Eine **Liste**, die wachsen kann. In <> steht, was sie enthält (hier: Texte).', 'namen.add("Ada");§add hängt etwas an.', 'namen.add("Alan");§Noch ein Element.', 'System.out.println(namen.get(0));§get(0) liefert das erste Element: Ada', 'System.out.println(namen.size());§size() ist die Anzahl: 2', 'for (String n : namen) {§Alle durchlaufen.', '    System.out.println(n);§Gibt jeden Namen aus.', '}§Ende.'], 'ArrayList: eine Liste, die wächst'),
          C(['import java.util.HashMap;§Holt die Klasse HashMap.', 'HashMap<String, Integer> alter = new HashMap<>();§Eine **Map** speichert Paare: Schlüssel (Text) und Wert (Zahl).', 'alter.put("Ada", 36);§Fügt ein Paar hinzu.', 'System.out.println(alter.get("Ada"));§Zugriff über den Schlüssel: 36'], 'HashMap: Schlüssel und Werte')
        ],
        tips: [A.warn('Ein Array hat in Java **feste Größe**. Willst du hinzufügen und entfernen, nimm eine `ArrayList`. Das Array hat `.length`, die Liste `.size()`, der Text `.length()`: drei verschiedene Schreibweisen!')],
        quiz: [A.q('Was liefert `zahlen.length` bei `int[] zahlen = {4, 9, 7, 1};`?', ['4', '3', '5', 'Einen Fehler'], 0, 'Das Array hat 4 Elemente, die Indizes laufen von 0 bis 3.')],
        tasks: [PP('Was gibt das Programm aus?', ['int[] l = {10, 20, 30};', 'System.out.println(l[0] + " " + l[l.length - 1] + " " + l.length);'], '10 30 3', 'l[l.length - 1] ist das letzte Element.')]
      },
      {
        concept: 'oop',
        parts: [
          C(['public class Konto {§Beginnt die Klasse Konto in der Datei Konto.java.', '    private String inhaber;§**private**: nur innerhalb der Klasse sichtbar (Kapselung). Das ist ein Attribut mit Typ.', '    private double kontostand;§Auch privat.', '', '    public Konto(String inhaber) {§Der **Konstruktor**: heißt wie die Klasse, hat **keinen** Rückgabetyp.', '        this.inhaber = inhaber;§this.inhaber ist das Attribut des Objekts, inhaber der Parameter.', '        this.kontostand = 0;§Startwert.', '    }§Ende des Konstruktors.', '', '    public void einzahlen(double betrag) {§Eine öffentliche Methode.', '        kontostand += betrag;§Erhöht den Kontostand.', '    }§Ende.', '', '    public boolean abheben(double betrag) {§Liefert true oder false.', '        if (betrag <= kontostand) {§Genug Geld da?', '            kontostand -= betrag;§Abziehen.', '            return true;§Hat geklappt.', '        }§Ende von if.', '        return false;§Abgelehnt.', '    }§Ende.', '', '    public double getKontostand() {§Ein **Getter**: erlaubt Lesen des privaten Attributs.', '        return kontostand;§Gibt den Wert zurück.', '    }§Ende.', '}§Ende der Klasse.'], 'Eine Klasse mit Kapselung'),
          C(['Konto k = new Konto("Ada");§new erzeugt ein Objekt und ruft den Konstruktor auf.', 'k.einzahlen(100);§Methode am Objekt aufrufen: Kontostand 100.', 'boolean ok = k.abheben(30);§Hebt 30 ab: true.', 'System.out.println(ok + " " + k.getKontostand());§Gibt aus: true 70.0'], 'Objekt benutzen (in main)'),
          C(['public class Tier {§Oberklasse.', '    public String laut() {§Eine Methode, die überschrieben werden darf.', '        return "...";§Standardlaut.', '    }§Ende.', '}§Ende von Tier.', '', 'public class Hund extends Tier {§extends: Hund **erbt** von Tier.', '    @Override§Eine Markierung: „Ich überschreibe bewusst.“ Der Compiler prüft das.', '    public String laut() {§Gleicher Name und gleiche Parameter wie in Tier.', '        return "Wau";§Hunde sagen Wau.', '    }§Ende.', '}§Ende von Hund.', '', 'Tier t = new Hund();§Eine Variable vom Typ Tier darf ein Hund-Objekt halten (Polymorphie).', 'System.out.println(t.laut());§Es erscheint "Wau": Das tatsächliche Objekt entscheidet.'], 'Vererbung und Polymorphie')
        ],
        tips: [A.warn('Jede öffentliche Klasse steht in einer **eigenen Datei** mit gleichem Namen (`Konto.java`, `Tier.java`). Zum Ausprobieren kannst du kleine Klassen auch ohne `public` in dieselbe Datei schreiben.')],
        quiz: [A.q('Was bewirkt das Schlüsselwort `private` bei einem Attribut?', ['Nur Code innerhalb der Klasse darf darauf zugreifen', 'Nur die Klasse und ihre Unterklassen dürfen zugreifen', 'Alle Klassen im selben Paket dürfen zugreifen', 'Der Wert lässt sich nach dem Setzen nicht mehr ändern'], 0, 'private ist die Grundlage der Kapselung.'), A.q('Was ist ein Konstruktor in Java?', ['Eine Methode ohne Rückgabetyp, die wie die Klasse heißt', 'Eine Methode, die ein Objekt am Ende wieder löscht', 'Eine statische Methode, die den Rückgabetyp void hat', 'Ein Attribut, das beim Start automatisch gesetzt wird'], 0, 'Er läuft bei `new` und setzt Startwerte.')],
        tasks: [PP('Was gibt das Programm aus?', ['Konto k = new Konto("Ada");', 'k.einzahlen(50);', 'k.einzahlen(25);', 'System.out.println(k.getKontostand());'], '75.0', 'Zwei Einzahlungen: 50 + 25. Der Kontostand ist ein double, deshalb erscheint 75.0.')]
      },
      {
        concept: 'err',
        parts: [
          C(['try {§Hier steht der Code, der schiefgehen kann.', '    int zahl = Integer.parseInt("abc");§"abc" ist keine Zahl: löst eine NumberFormatException aus.', '    System.out.println(10 / zahl);§Wird nicht erreicht.', '} catch (NumberFormatException e) {§Fängt genau diesen Fehlertyp.', '    System.out.println("Das war keine Zahl");§Freundliche Meldung statt Absturz.', '} catch (ArithmeticException e) {§Ein anderer Fehlertyp (z. B. Division durch 0).', '    System.out.println("Rechenfehler: " + e.getMessage());§e.getMessage() liefert die Beschreibung.', '} finally {§Läuft immer.', '    System.out.println("Fertig");§Ausgabe: Fertig', '}§Ende.'], 'try, catch und finally'),
          C(['Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3§**Art** des Fehlers und Erklärung: Index 3 gibt es bei Länge 3 nicht (erlaubt: 0 bis 2). Das liest du zuerst.', '\tat Main.main(Main.java:5)§**Wo**: Klasse, Methode, Datei und **Zeilennummer** (hier Zeile 5).'], 'Eine Fehlermeldung (Stack Trace) lesen', { noRun: true })
        ],
        tips: [A.info('Java kennt „**checked exceptions**“: Manche Fehler (z. B. beim Dateizugriff) **muss** man abfangen oder mit `throws` weitergeben, sonst übersetzt das Programm nicht. Dein Compiler sagt dir dann genau, was fehlt.')],
        quiz: [A.q('Welches Schlüsselwort löst in Java absichtlich eine Ausnahme aus?', ['throw', 'catch', 'finally', 'try'], 0, '`throw new IllegalArgumentException("…")` meldet einen Fehler.')],
        tasks: []
      },
      {
        id: 'adv', stage: 4, title: 'Vertiefung: Schnittstellen, Generics und Lambdas',
        goal: 'Du kennst Schnittstellen in Java, verstehst, was <T> bedeutet, und kannst einfache Lambda-Ausdrücke lesen.',
        parts: [
          A.text('Schnittstellen (interface)', 'Eine **Schnittstelle** legt fest, **was** eine Klasse können muss. Mehrere Klassen können sie umsetzen (`implements`). Der Aufrufer kennt nur die Schnittstelle.'),
          C(['interface Zahlungsart {§Eine Schnittstelle: nur Methoden ohne Inhalt.', '    boolean bezahlen(double betrag);§Wer Zahlungsart umsetzt, **muss** diese Methode anbieten.', '}§Ende.', '', 'class Kreditkarte implements Zahlungsart {§implements: Kreditkarte setzt die Schnittstelle um.', '    public boolean bezahlen(double betrag) {§Muss public sein und genau diese Signatur haben.', '        System.out.println("Karte: " + betrag);§Das eigene Verhalten.', '        return true;§Erfolgreich.', '    }§Ende.', '}§Ende.', '', 'Zahlungsart z = new Kreditkarte();§Die Variable kennt nur die Schnittstelle.', 'z.bezahlen(49.9);§Funktioniert mit jeder Klasse, die Zahlungsart umsetzt.'], 'Eine Schnittstelle umsetzen'),
          A.text('Generics: <T>', 'In `ArrayList<String>` steht in spitzen Klammern, **was die Liste enthält**. Das ist **Generics**: Dieselbe Klasse funktioniert für viele Typen, und der Compiler verhindert, dass du eine Zahl in eine Liste mit Texten steckst.'),
          A.text('Lambdas und Streams', 'Ein **Lambda** ist eine kurze namenlose Funktion: `x -> x * 2` heißt „nimm x, gib x * 2 zurück“. Zusammen mit **Streams** wertest du Listen kompakt aus.'),
          C(['import java.util.List;§Die Klasse List.', 'List<Integer> zahlen = List.of(1, 2, 3, 4, 5);§Eine unveränderliche Liste mit fünf Zahlen.', 'List<Integer> gerade = zahlen.stream()§stream() startet eine „Fließband“-Verarbeitung der Elemente.', '    .filter(x -> x % 2 == 0)§filter behält nur die Elemente, für die das Lambda true liefert: die geraden.', '    .toList();§Sammelt das Ergebnis wieder in einer Liste (ab Java 16).', 'System.out.println(gerade);§Gibt aus: [2, 4]'], 'Streams und Lambdas (Java 16 oder neuer)')
        ],
        tips: [],
        quiz: [A.q('Was bedeutet `ArrayList<String>`?', ['Eine Liste, die nur Texte enthält', 'Eine Liste mit der Länge String', 'Ein Array aus Zeichen', 'Eine Liste von Listen'], 0, 'In spitzen Klammern steht der Typ der Elemente (Generics).'), A.q('Wofür steht `x -> x * 2`?', ['Ein Lambda: nimm x und liefere x * 2', 'Ein Zeiger, der auf x mal 2 zeigt', 'Ein Vergleich: ist x größer als x * 2', 'Eine Zuweisung: x wird zu x * 2'], 0, 'Ein Lambda ist eine kurze Funktion ohne Namen.')],
        tasks: []
      }
    ]
  });
})();
