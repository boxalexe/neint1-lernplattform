/* Kurs: Modellieren – OOP und UML */
(function () {
  'use strict';
  const A = window.Academy;
  const CJ = (lines, h, o) => A.code('java', lines, h, o);
  const CP = (lines, h, o) => A.code('python', lines, h, o);
  const PP = (p, c, a, h, e) => Object.assign(A.predict(p, c, a, h, e), { lang: 'python' });

  A.track({
    id: 'oop', title: 'Modellieren: OOP und UML', tag: 'DENKEN IN OBJEKTEN',
    desc: 'Software entwerfen statt draufloscoden: Klassen, Kapselung, Vererbung, Interfaces, Beziehungen und Sequenzdiagramme am Onlineshop und Ticketsystem – Diagramm und Code immer nebeneinander.',
    intro: 'Bevor ein Entwickler die erste Zeile Code schreibt, klärt er die Struktur: Welche **Klassen** gibt es, was weiß jede Klasse, wer kennt wen und wer ruft wen auf? Genau dafür gibt es die **objektorientierte Modellierung** mit **UML**. Ein Diagramm zeigt auf einen Blick, wofür man sonst hunderte Zeilen Code lesen müsste.\n\nDieser Kurs arbeitet durchgehend an echten Szenarien (**Onlineshop**, **Benutzerverwaltung**, **IT-Ticketsystem**) und stellt jedes UML-Diagramm direkt neben den passenden Code in Java und Python. Am Ende entwirfst du aus einem Aufgabentext selbst das komplette Shop-Klassendiagramm aus Modul 11 der Sprachkurse. In der **UML-Werkstatt** (Spielwiese) kannst du eigene Diagramme ausprobieren.',
    lessons: [
      {
        id: 'warum', standalone: true, domain: 'shop', stage: 1,
        title: 'Warum Objekte? Klasse, Objekt und UML-Kasten',
        goal: 'Du verstehst den Unterschied zwischen Klasse und Objekt, liest einen UML-Klassenkasten mit Sichtbarkeiten und ordnest ihn dem passenden Code in Java und Python zu.',
        terms: ['Klasse', 'Objekt', 'Instanz', 'Attribut', 'Methode', 'Sichtbarkeit', 'Abstraktion', 'Klassendiagramm'],
        parts: [
          A.text('Warum lose Variablen nicht reichen', 'Stell dir den Onlineshop ohne Objekte vor: Für jeden Artikel bräuchtest du eigene Variablen wie `name1`, `preis1`, `lager1`, `name2`, `preis2`, `lager2`. Bei 500 Artikeln oder beim Sortieren nach Preis bricht dieses Chaos sofort zusammen.\n\nDie objektorientierte Programmierung löst das, indem sie zusammenpackt, was zusammengehört: Eine **Klasse** ist der Bauplan für ein Ding aus der Fachwelt – zum Beispiel `Artikel`. Sie legt fest, welche **Attribute** (Daten) und welche **Methoden** (Verhalten) jeder Artikel hat. Ein konkretes Exemplar nach diesem Plan heißt **Objekt** oder **Instanz**: die Funkmaus für 19,99 € ist ein Objekt, das Headset für 34,90 € ein zweites. Beide nutzen denselben Bauplan, haben aber eigene Werte.'),
          A.uml('klasse Artikel\n  - name: String\n  - preisInCent: long\n  - lager: int\n  + Artikel(name: String, preisInCent: long, lager: int)\n  + istLieferbar(): boolean\n  + getPreisInCent(): long', 'Die Klasse Artikel im UML-Klassendiagramm', 'Ein **Klassendiagramm** stellt jede Klasse als Kasten mit **drei Fächern** dar: oben der **Name**, in der Mitte die **Attribute** (`name: Typ`), unten der Konstruktor und die **Methoden** (`name(parameter): Rückgabetyp`).'),
          CJ([
            'public class Artikel {§Der Klassenname im Code entspricht dem obersten Fach im UML.',
            '    private String name;§Minus (-) im UML bedeutet private: nur innerhalb von Artikel sichtbar.',
            '    private long preisInCent;§Geldbeträge als ganze Zahl in Cent – kein Rundungsfehler.',
            '    private int lager;',
            '    public Artikel(String name, long preisInCent, int lager) {§Konstruktor: heißt wie die Klasse, kein Rückgabetyp.',
            '        this.name = name;',
            '        this.preisInCent = preisInCent;',
            '        this.lager = lager;',
            '    }',
            '    public boolean istLieferbar() {§Plus (+) im UML bedeutet public: von überall aufrufbar.',
            '        return lager > 0;',
            '    }',
            '    public long getPreisInCent() { return preisInCent; }',
            '}'
          ], 'Dasselbe in Java', { praxis: 'Im echten Shop-Backend steht genau so eine Klasse in der Datei Artikel.java. Wer das UML-Diagramm liest, weiß sofort, welche Methoden er aufrufen darf, ohne den Code öffnen zu müssen.' }),
          CP([
            'class Artikel:§In Python legt class den Bauplan fest.',
            '    def __init__(self, name, preis_in_cent, lager):§Der Konstruktor heißt in Python immer __init__.',
            '        self._name = name§Ein Unterstrich (_) signalisiert: intern behandeln (wie - im UML).',
            '        self._preis_in_cent = preis_in_cent',
            '        self._lager = lager',
            '    def ist_lieferbar(self):§Öffentliche Methode: prüft den eigenen Lagerbestand.',
            '        return self._lager > 0',
            'maus = Artikel("Funkmaus", 1999, 35)§Erstes Objekt (Instanz) mit eigenen Werten.',
            'tastatur = Artikel("Tastatur", 4950, 0)§Zweites Objekt aus demselben Bauplan.',
            'print(maus._name, maus.ist_lieferbar())',
            'print(tastatur._name, tastatur.ist_lieferbar())'
          ], 'Dasselbe in Python (mit Ablauf)', { trace: true, praxis: 'Das UML-Diagramm ist sprachunabhängig: Derselbe Kasten beschreibt die Java-Klasse im Backend genauso wie die Python-Klasse im Importskript.' }),
          A.table(['Zeichen', 'Sichtbarkeit', 'Bedeutung'], [
            ['`+`', 'public (öffentlich)', 'von überall aufrufbar – die Schnittstelle der Klasse'],
            ['`-`', 'private (privat)', 'nur innerhalb der eigenen Klasse sichtbar'],
            ['`#`', 'protected (geschützt)', 'in der Klasse und in Unterklassen (und im selben Paket) sichtbar'],
            ['`~`', 'package (Paket)', 'für alle Klassen im selben Paket sichtbar']
          ], 'Sichtbarkeiten im Klassendiagramm', 'In IHK-Prüfungen gehört vor jedes Attribut und jede Methode ein Sichtbarkeitszeichen. Hinter dem Namen steht nach dem Doppelpunkt der Datentyp: `lager: int`.'),
          A.table(['Grundprinzip', 'Im Onlineshop', 'Kurz gesagt'], [
            ['**Abstraktion**', '`Artikel` hat Name, Preis und Lager, aber keine Verpackungsfarbe', 'Nur das Wesentliche für die Aufgabe abbilden'],
            ['**Kapselung**', '`lager` ist privat, geändert wird nur über `verkaufen()`', 'Daten schützen, Zugriff nur über geprüfte Methoden'],
            ['**Vererbung**', '`DigitalArtikel` erbt Name und Preis von `Artikel`', 'Gemeinsames einmal in der Oberklasse schreiben'],
            ['**Polymorphie**', '`zahlungsart.gebuehrInCent()` rechnet je nach Objekt anders', 'Gleicher Aufruf, Verhalten hängt vom konkreten Objekt ab']
          ], 'Die vier Grundprinzipien der OOP', 'Diese vier Begriffe sind fester Prüfungsstoff in AP1 und AP2. Jedes Prinzip hat in diesem Kurs eine eigene Lektion.'),
          A.table(['Thema', 'Vertiefung in den Sprachkursen'], [
            ['Klassen, `new`, Stack & Heap in Java', '[Java, Modul 7: Klassen und Objekte](/code-lernen/kurs/java/oop/)'],
            ['Klassen, `self` und `__init__` in Python', '[Python, Modul 7: Klassen und Objekte](/code-lernen/kurs/python/oop/)'],
            ['Wie man überhaupt zu Klassen kommt', '[Lektion 7: Von der Aufgabe zum Klassendiagramm](/code-lernen/kurs/oop/entwurf/)']
          ], 'Dasselbe in Java und Python', 'Hier steht das Modellieren im Mittelpunkt. Die genaue Syntax, Referenzen sowie Stack und Heap vertiefst du direkt in den Sprachkursen.')
        ],
        tips: [
          A.warn('Verwechsle nicht **Klasse** und **Objekt**. `Artikel` ist der Bauplan (einmal im Programm). Die Funkmaus und das Headset sind konkrete **Objekte** (Instanzen) mit eigenen Werten.'),
          A.tip('**Abstraktion** heißt bewusst weglassen: Für ein Ticketsystem braucht ein Benutzer Name und Rolle, aber kein Geburtsdatum.')
        ],
        quiz: [
          A.q('Welches OOP-Grundprinzip bedeutet, nur die für die Aufgabe wesentlichen Eigenschaften abzubilden?', ['Abstraktion', 'Kapselung', 'Vererbung', 'Polymorphie'], 0, 'Abstraktion blendet Unwichtiges aus: Ein Artikel im Shop braucht Preis und Lager, aber kein Gewicht der Verpackungsfolie.'),
          A.q('Was bedeutet das Zeichen `~` vor einem Attribut im Klassendiagramm?', ['Sichtbar für alle Klassen im selben Paket (package)', 'Sichtbar nur innerhalb der eigenen Klasse (private)', 'Sichtbar für die Klasse und ihre Unterklassen', 'Das Attribut ist statisch und gilt für die Klasse'], 0, 'Neben + (public), - (private) und # (protected) steht ~ für Paket-Sichtbarkeit (package).'),
          A.q('Du siehst im Java-Code `private long preisInCent;`. Wie steht das im UML-Klassenkasten?', ['- preisInCent: long', '+ preisInCent: long', '# long: preisInCent', '- long: preisInCent'], 0, 'Im UML steht zuerst die Sichtbarkeit (- für private), dann der Name, dann Doppelpunkt und Typ.'),
          A.q('In welchem Fach des UML-Klassenkastens steht `+ istLieferbar(): boolean`?', ['Im untersten Fach (Methoden)', 'Im obersten Fach (Klassenname)', 'Im mittleren Fach (Attribute)', 'Neben dem Kasten als Notiz'], 0, 'Von oben nach unten: Name, Attribute, Methoden (inklusive Konstruktoren).'),
          A.q('Was ist der Unterschied zwischen Klasse und Objekt?', ['Die Klasse ist der Bauplan, das Objekt ein konkretes Exemplar', 'Die Klasse speichert die Werte, das Objekt enthält den Bauplan', 'Eine Klasse entsteht erst zur Laufzeit, ein Objekt steht im Code', 'Beide Begriffe bezeichnen im UML genau dasselbe Element'], 0, 'Aus einer Klasse Artikel kannst du beliebig viele Artikel-Objekte mit eigenen Werten erzeugen.')
        ],
        tasks: [
          A.fill('Übersetze die Java-Zeile `private int lager;` in die UML-Schreibweise.', '{{-}} lager: {{int}}', 'Privat ist ein Minuszeichen, im UML steht der Typ hinter dem Doppelpunkt.'),
          A.fill('Übersetze `public boolean istLieferbar()` in das Methodenfach des UML-Kastens.', '{{+}} istLieferbar(): {{boolean}}', 'Öffentlich ist ein Pluszeichen, der Rückgabetyp steht hinter dem Doppelpunkt.'),
          PP('Zwei Objekte aus derselben Klasse: Was gibt das Programm aus?', [
            'class Artikel:',
            '    def __init__(self, name, lager):',
            '        self.name = name',
            '        self.lager = lager',
            '    def verkaufen(self, menge):',
            '        self.lager -= menge',
            'maus = Artikel("Funkmaus", 35)',
            'headset = Artikel("Headset", 14)',
            'maus.verkaufen(5)',
            'print(maus.lager, headset.lager)'
          ], '30 14', 'Jedes Objekt hat seinen eigenen Lagerbestand.', 'Nur maus.verkaufen(5) wird aufgerufen. Der Bestand der Funkmaus sinkt auf 30, das Headset bleibt bei 14.'),
          A.choose('Beide Varianten prüfen denselben Artikelbestand. Welche nutzt das Objektmodell sauberer?', 'python', [
            [
              'name1 = "Funkmaus"',
              'lager1 = 35',
              'name2 = "Tastatur"',
              'lager2 = 0',
              'print(name1, lager1 > 0)',
              'print(name2, lager2 > 0)'
            ],
            [
              'class Artikel:',
              '    def __init__(self, name, lager):',
              '        self.name = name',
              '        self.lager = lager',
              '    def ist_lieferbar(self):',
              '        return self.lager > 0',
              'for a in [Artikel("Funkmaus", 35), Artikel("Tastatur", 0)]:',
              '    print(a.name, a.ist_lieferbar())'
            ]
          ], { a: 1, expect: 'Funkmaus True\nTastatur False' }, 'Welche Lösung funktioniert auch noch bei 500 Artikeln, ohne nummerierte Variablen anzulegen?', 'Die Klasse bündelt Name, Bestand und Lieferbarkeits-Prüfung. Mit losen Variablen name1/lager1 wächst der Code bei jedem neuen Artikel mit.')
        ]
      },
      {
        id: 'kapselung', standalone: true, domain: 'login', stage: 2,
        title: 'Schnittstelle, Kapselung und {static}',
        goal: 'Du schützt Zustände durch Kapselung, unterscheidest Instanz- und Klassenattribute ({static}), liest Konstruktoren und Konstanten ({final}) im UML und erkennst fehlende Kapselung im Code.',
        terms: ['Kapselung', 'Konstruktor', ['Getter und Setter', 'Getter', 'Setter'], ['Statisch (static)', 'statisch'], 'Instanzattribut', 'Klassenattribut', 'Standardkonstruktor'],
        parts: [
          A.text('Daten schützen statt hoffen', 'In der **Benutzerverwaltung** wird ein Konto nach 3 falschen Passwörtern gesperrt. Wäre `fehlversuche` öffentlich, könnte jeder Programmteil einfach `konto.fehlversuche = 0` schreiben – die Sperre wäre wirkungslos.\n\n**Kapselung** (auch Geheimnisprinzip) trennt streng zwischen **Innen** (private Attribute) und **Außen** (öffentliche Schnittstelle). Außenstehende rufen nur fachliche Methoden wie `anmelden(...)` oder geprüfte **Getter und Setter** auf. So gilt die Geschäftsregel an genau einer Stelle.'),
          A.uml('klasse Benutzerkonto\n  - name: String\n  - fehlversuche: int\n  - anzahlKonten: int {static}\n  + MAX_VERSUCHE: int {final} = 3\n  + Benutzerkonto(name: String)\n  + anmelden(passwortRichtig: boolean): boolean\n  + istGesperrt(): boolean\n  + getName(): String', 'Gekapselte Klasse Benutzerkonto im UML', 'Alle veränderlichen Daten sind privat (`-`). `anzahlKonten` trägt `{static}` (Klassenattribut: es gibt nur einen Zähler für alle Konten). `MAX_VERSUCHE` trägt `{final}` (Konstante). Einen Setter für `fehlversuche` gibt es bewusst **nicht**.'),
          CJ([
            'public class Benutzerkonto {',
            '    public static final int MAX_VERSUCHE = 3;§Konstante: im UML {final} = 3.',
            '    private static int anzahlKonten = 0;§**Klassenattribut**: einmal für die ganze Klasse.',
            '    private final String name;§**Instanzattribut**: jedes Konto hat seinen eigenen Namen.',
            '    private int fehlversuche = 0;§Privat: von außen nicht direkt manipulierbar.',
            '    public Benutzerkonto(String name) {§**Konstruktor**: bringt das Konto in einen gültigen Startzustand.',
            '        this.name = name;',
            '        anzahlKonten++;§Zählt jedes neu angelegte Konto mit.',
            '    }',
            '    public boolean istGesperrt() { return fehlversuche >= MAX_VERSUCHE; }',
            '    public boolean anmelden(boolean passwortRichtig) {§Fachliche Methode statt offenem Setter.',
            '        if (istGesperrt()) return false;',
            '        if (passwortRichtig) { fehlversuche = 0; return true; }',
            '        fehlversuche++;',
            '        return false;',
            '    }',
            '}'
          ], 'Dasselbe in Java', { praxis: 'In echten Login-Diensten verhindert genau diese Kapselung, dass ein fehlerhafter UI-Code oder ein API-Endpunkt versehentlich die Brute-Force-Sperre zurücksetzt.' }),
          CP([
            'class Benutzerkonto:',
            '    MAX_VERSUCHE = 3§Konstante auf Klassenebene.',
            '    anzahl_konten = 0§Klassenattribut: teilen sich alle Instanzen.',
            '    def __init__(self, name):',
            '        self._name = name§Instanzattribut: gehört nur zu diesem Objekt.',
            '        self._fehlversuche = 0',
            '        Benutzerkonto.anzahl_konten += 1',
            '    def ist_gesperrt(self):',
            '        return self._fehlversuche >= Benutzerkonto.MAX_VERSUCHE',
            '    def anmelden(self, passwort_richtig):',
            '        if self.ist_gesperrt():',
            '            return False',
            '        if passwort_richtig:',
            '            self._fehlversuche = 0',
            '            return True',
            '        self._fehlversuche += 1',
            '        return False',
            'k = Benutzerkonto("m.weber")',
            'print(k.anmelden(False), k.anmelden(False), k.anmelden(False), k.ist_gesperrt())',
            'print(k.anmelden(True), Benutzerkonto.anzahl_konten)'
          ], 'Dasselbe in Python (mit Ablauf)', { trace: true, praxis: 'Nach dem dritten Fehlversuch lehnt anmelden(True) selbst das richtige Passwort ab – genau wie bei einem gesperrten Firmen-Account.' }),
          A.seq(['LoginMaske', 'Benutzerkonto'], [
            ['LoginMaske', 'Benutzerkonto', 'anmelden(false)'],
            ['Benutzerkonto', 'Benutzerkonto', 'istGesperrt()'],
            ['Benutzerkonto', 'LoginMaske', 'false', 'ret']
          ], 'Wie die Kapselung im Ablauf aussieht', 'Die Login-Maske kennt die Sperrregel gar nicht: Sie fragt nur `anmelden(...)`. Das `Benutzerkonto` prüft sich selbst (Pfeil auf die eigene Lebenslinie) und antwortet.'),
          A.table(['Schreibweise im UML', 'Bedeutung (IHK-Begriff)'], [
            ['`- fehlversuche: int`', 'privates **Instanzattribut**: jedes Objekt hat seinen eigenen Zähler'],
            ['`- anzahlKonten: int {static}` (oder unterstrichen)', '**Klassenattribut**: statisch, alle Objekte teilen sich einen Wert'],
            ['`+ MAX_VERSUCHE: int {final} = 3`', 'Konstante: Wert steht fest und darf nicht geändert werden'],
            ['`+ Benutzerkonto(name: String)`', 'Konstruktor: heißt wie die Klasse, hat **keinen** Rückgabetyp'],
            ['kein Konstruktor eingezeichnet', 'Es gibt nur den automatischen **Standardkonstruktor** ohne Parameter'],
            ['`+ anmelden(ok: boolean): boolean`', 'Methode: Sichtbarkeit, Name, Parameter mit Typ, Rückgabetyp']
          ], 'UML-Schreibweisen auf einen Blick', 'Attribute und Methoden zusammen heißen **Member** der Klasse. Ein statisches Attribut erkennt man in Prüfungen am `{static}` oder an der Unterstreichung.'),
          A.table(['Thema', 'Vertiefung in den Sprachkursen'], [
            ['`private`, Getter/Setter und Passwort-Hash in Java', '[Java, Modul 8: Kapselung](/code-lernen/kurs/java/kapselung/)'],
            ['`@property` und Validierung in Python', '[Python, Modul 8: Kapselung](/code-lernen/kurs/python/kapselung/)']
          ], 'Dasselbe in Java und Python')
        ],
        tips: [
          A.warn('Kapselung bedeutet **nicht**, zu jedem Attribut blind einen Getter und Setter zu schreiben. Ein Setter für `fehlversuche` oder ein Getter für `passwortHash` würde den Schutz sofort aushebeln.'),
          A.tip('Faustregel für die Schnittstelle: Öffentlich ist nur, was andere Klassen wirklich aufrufen müssen. Alles andere bleibt privat.')
        ],
        quiz: [
          A.q('Woran erkennst du im UML-Klassendiagramm ein Klassenattribut (statisch)?', ['Es ist unterstrichen oder trägt den Zusatz {static}', 'Es ist kursiv geschrieben oder trägt {abstract}', 'Es steht im untersten Fach direkt bei den Methoden', 'Es beginnt immer mit dem Sichtbarkeitszeichen #'], 0, 'Statische Member gehören zur Klasse selbst und werden im UML unterstrichen oder mit {static} markiert.'),
          A.q('Warum verzichtet `Benutzerkonto` bewusst auf eine Methode `setFehlversuche(int)`?', ['Sonst könnte jeder Code die Login-Sperre einfach umgehen', 'Weil int-Attribute im UML grundsätzlich keinen Setter haben', 'Weil statische Attribute niemals über Setter geändert werden', 'Sonst könnte der Konstruktor den Zähler nicht mehr setzen'], 0, 'Ein roher Setter würde erlauben, fehlversuche von außen auf 0 zu setzen. Gekapselt wird über die fachliche Methode anmelden().'),
          A.q('Wann lässt man den Konstruktor im Klassendiagramm weg?', ['Wenn die Klasse nur den automatischen Standardkonstruktor nutzt', 'Wenn der Konstruktor mehr als zwei Parameter entgegennimmt', 'Wenn alle Attribute der Klasse als private markiert sind', 'Wenn die Klasse keine statischen Attribute besitzt'], 0, 'Selbst geschriebene Konstruktoren werden eingezeichnet; nur der automatisch erzeugte Standardkonstruktor ohne Parameter entfällt.'),
          A.q('Was unterscheidet ein Instanzattribut von einem Klassenattribut?', ['Jedes Objekt hat ein eigenes Instanzattribut, Klassenattribute werden geteilt', 'Instanzattribute sind immer öffentlich, Klassenattribute immer privat', 'Klassenattribute dürfen sich nie ändern, Instanzattribute schon', 'Instanzattribute stehen in Methoden, Klassenattribute im Konstruktor'], 0, 'Jeder Benutzer hat eigene fehlversuche (Instanzattribut), aber anzahlKonten existiert genau einmal für die gesamte Klasse.')
        ],
        tasks: [
          A.fill('Ergänze im UML den Zusatz für das Klassenattribut (alle Konten teilen sich den Zähler).', '- anzahlKonten: int {{{static}}}', 'Das englische Schlüsselwort in geschweiften Klammern für Klassenattribute.'),
          A.fill('Übersetze die Python-Methode `def ist_gesperrt(self):` (liefert `True`/`False`) in eine öffentliche UML-Signatur.', '{{+}} istGesperrt(): {{boolean}}', 'Öffentlich ist +, Wahrheitswert im UML ist boolean.'),
          PP('Instanzattribut vs. Klassenattribut: Was gibt das Programm aus?', [
            'class Benutzerkonto:',
            '    anzahl = 0',
            '    def __init__(self, name):',
            '        self.name = name',
            '        Benutzerkonto.anzahl += 1',
            'a = Benutzerkonto("admin")',
            'b = Benutzerkonto("m.weber")',
            'print(a.name, b.name, Benutzerkonto.anzahl)'
          ], 'admin m.weber 2', 'Wie oft läuft __init__ insgesamt?', 'Jedes Objekt hat seinen eigenen Namen (admin, m.weber), aber das Klassenattribut anzahl wurde zweimal hochgezählt.'),
          A.bug('Benutzerverwaltung: Nach 3 Fehlversuchen lässt das Konto trotzdem noch einen 4. Versuch zu.', 'python', [
            'class Benutzerkonto:',
            '    MAX_VERSUCHE = 3',
            '    def __init__(self):',
            '        self._fehl = 0',
            '    def anmelden(self, ok):',
            '        if self._fehl > Benutzerkonto.MAX_VERSUCHE:',
            '            return "gesperrt"',
            '        if ok:',
            '            self._fehl = 0',
            '            return "ok"',
            '        self._fehl += 1',
            '        return "falsch"',
            'k = Benutzerkonto()',
            'print(k.anmelden(False), k.anmelden(False), k.anmelden(False), k.anmelden(True))'
          ], { line: 5, kind: 'logik', fixes: [
            'if self._fehl >= Benutzerkonto.MAX_VERSUCHE:',
            'if self._fehl == Benutzerkonto.MAX_VERSUCHE - 1:',
            'if self._fehl < Benutzerkonto.MAX_VERSUCHE:',
            'if self._fehl != Benutzerkonto.MAX_VERSUCHE:'
          ], expect: 'falsch falsch falsch gesperrt', trace: true }, 'Welchen Wert hat _fehl nach dem dritten Fehlversuch, und was ergibt > 3?', 'Nach 3 falschen Versuchen ist _fehl gleich 3. Mit > 3 greift die Sperre erst ab 4. Richtig ist >= MAX_VERSUCHE.')
        ]
      },
      {
        id: 'vererbung', standalone: true, domain: 'shop', stage: 3,
        title: 'Vererbung: „ist-ein“ im UML und im Code',
        goal: 'Du prüfst Vererbung sicher mit dem „ist-ein“-Test, liest und zeichnest Vererbungspfeile im UML, erkennst überschriebene Methoden und grenzt Vererbung sauber von „hat-ein“ ab.',
        terms: ['Vererbung', ['Oberklasse und Unterklasse', 'Oberklasse', 'Unterklasse'], ['Überschreiben (Override)', 'Überschreiben', 'überschreibt']],
        parts: [
          A.text('Gemeinsames einmal modellieren', 'Der Onlineshop verkauft nicht mehr nur Pakete, sondern auch Software-Lizenzen zum Download. Eine Lizenz hat genau wie jeder andere `Artikel` einen Namen und einen Preis – aber sie kostet 0 Cent Versand statt 495 Cent.\n\nStatt die Klasse `Artikel` zu kopieren, leitet man eine **Unterklasse** `DigitalArtikel` von der **Oberklasse** `Artikel` ab (**Vererbung**). Der wichtigste Test beim Modellieren lautet **„ist-ein“**: Ein `DigitalArtikel` **ist ein** `Artikel` – also passt Vererbung. Ein `Warenkorb` **ist kein** `Artikel` (er **hat** Artikel) – dort wäre Vererbung ein schwerer Entwurfsfehler.'),
          A.uml('klasse Artikel\n  # name: String\n  # preisInCent: long\n  + Artikel(name: String, preisInCent: long)\n  + versandInCent(): long\n  + info(): String\nklasse DigitalArtikel\n  + DigitalArtikel(name: String, preisInCent: long)\n  + versandInCent(): long\nDigitalArtikel --|> Artikel', 'Vererbung im Klassendiagramm', 'Der durchgezogene Pfeil mit **hohler Dreiecksspitze** zeigt von der Unterklasse **zur Oberklasse**. `#` (protected) erlaubt Unterklassen den Zugriff. Geerbte Attribute (`name`, `preisInCent`) und unveränderte Methoden (`info()`) werden in der Unterklasse **nicht** wiederholt – nur was neu ist oder **überschrieben** wird (`versandInCent()`).'),
          CJ([
            'public class Artikel {§Oberklasse: das Gemeinsame steht einmal hier.',
            '    protected String name;§# im UML = protected in Java.',
            '    protected long preisInCent;',
            '    public Artikel(String name, long preisInCent) {',
            '        this.name = name; this.preisInCent = preisInCent;',
            '    }',
            '    public long versandInCent() { return 495; }',
            '}',
            'public class DigitalArtikel extends Artikel {§extends entspricht dem Pfeil --|> im UML.',
            '    public DigitalArtikel(String name, long preisInCent) {',
            '        super(name, preisInCent);§Konstruktoren werden nicht vererbt: super() ruft die Oberklasse.',
            '    }',
            '    @Override§Überschreibt die geerbte Methode – deshalb steht sie im UML erneut.',
            '    public long versandInCent() { return 0; }',
            '}'
          ], 'Dasselbe in Java', { praxis: 'Genauso trennen ERP- und Shopsysteme physische Ware, digitale Downloads und Gutscheine: gemeinsame Felder in der Basis, abweichende Regeln gezielt in der Unterklasse.' }),
          CP([
            'class Ticket:§Zweites Praxis-Beispiel: das IT-Ticketsystem.',
            '    def __init__(self, titel):',
            '        self.titel = titel',
            '    def reaktionszeit(self):',
            '        return "innerhalb eines Tages"',
            'class Stoerung(Ticket):§In Python steht die Oberklasse in Klammern (entspricht --|>).',
            '    def reaktionszeit(self):§Überschreiben: Störungen werden sofort bearbeitet.',
            '        return "sofort"',
            't1 = Ticket("Neuer Monitor")',
            't2 = Stoerung("Server nicht erreichbar")',
            'print(t1.titel, "->", t1.reaktionszeit())',
            'print(t2.titel, "->", t2.reaktionszeit())'
          ], 'Vererbung im Ticketsystem (Python, mit Ablauf)', { trace: true, praxis: 'In einem Service-Desk ist jede Störung ein Ticket, hat aber strengere SLA-Reaktionszeiten. Die Oberklasse hält Titel und Status, die Unterklasse überschreibt nur die Reaktionszeit.' }),
          A.table(['Paar', 'Prüfe „ist-ein“', 'Richtige Beziehung'], [
            ['`DigitalArtikel` und `Artikel`', 'Ein DigitalArtikel **ist ein** Artikel.', 'Vererbung (`--|>`)'],
            ['`Stoerung` und `Ticket`', 'Eine Störung **ist ein** Ticket.', 'Vererbung (`--|>`)'],
            ['`Warenkorb` und `Artikel`', 'Ein Warenkorb ist **kein** Artikel – er **enthält** Artikel.', 'Assoziation / Komposition'],
            ['`Ticket` und `Techniker`', 'Ein Ticket ist **kein** Techniker – es **kennt** einen.', 'Assoziation (`-->`)']
          ], 'Der „ist-ein“-Test verhindert Modellierungsfehler'),
          A.table(['Im Klassendiagramm', 'Schreibweise', 'Regel für die Prüfung'], [
            ['Konstruktoren', '`+ DigitalArtikel(name: String, preisInCent: long)`', 'Konstruktoren werden **nicht** vererbt; die Unterklasse definiert ihre eigenen und ruft `super(...)`.'],
            ['Geerbte Member', 'nicht wiederholen', 'Nur eigene neue oder **überschriebene** Methoden stehen in der Unterklasse.'],
            ['Finale Klasse / Methode', '`{final}`', 'Von einer finalen Klasse darf niemand erben; eine finale Methode darf nicht überschrieben werden.'],
            ['Richtung', 'nicht umkehrbar', 'Jeder `DigitalArtikel` ist ein `Artikel`, aber nicht jeder `Artikel` ist ein `DigitalArtikel`.']
          ], 'Vererbung im UML richtig zeichnen'),
          A.table(['Thema', 'Vertiefung in den Sprachkursen'], [
            ['`extends`, `super` und `@Override` in Java', '[Java, Modul 9: Vererbung und Interfaces](/code-lernen/kurs/java/vererbung/)'],
            ['Vererbung und `super()` in Python', '[Python, Modul 9: Vererbung und Polymorphie](/code-lernen/kurs/python/vererbung/)']
          ], 'Dasselbe in Java und Python')
        ],
        tips: [
          A.warn('Erbe niemals nur, um Schreibarbeit zu sparen. Wenn „ist-ein“ nicht stimmt, wähle eine Beziehung („hat-ein“) – das hält das Modell flexibel.'),
          A.tip('Zeichne im UML den Pfeil immer von der spezielleren **Unterklasse** hinauf zur allgemeineren **Oberklasse**.')
        ],
        quiz: [
          A.q('Welche Member einer Oberklasse werden **nicht** an die Unterklasse vererbt?', ['Die Konstruktoren der Oberklasse', 'Die öffentlichen Methoden der Oberklasse', 'Die geschützten (#) Attribute', 'Die statischen Methoden der Oberklasse'], 0, 'Jede Klasse hat ihre eigenen Konstruktoren; die Unterklasse ruft den der Oberklasse mit super(...) auf.'),
          A.q('Welcher Pfeil steht im UML für Vererbung (`extends`)?', ['Durchgezogene Linie mit hohler Dreiecksspitze', 'Gestrichelte Linie mit hohler Dreiecksspitze', 'Durchgezogene Linie mit gefüllter Raute', 'Gestrichelte Linie mit offener Pfeilspitze'], 0, 'Durchgezogen + hohles Dreieck = Vererbung. Gestrichelt + hohles Dreieck wäre die Realisierung eines Interfaces.'),
          A.q('Du liest im Code `class Stoerung(Ticket):` und `Stoerung` überschreibt `reaktionszeit()`. Was steht im UML-Kasten `Stoerung`?', ['Nur neue Attribute/Methoden und `reaktionszeit()`', 'Alle geerbten Attribute und Methoden von `Ticket` noch einmal', 'Nur die geerbten Attribute ohne Methoden', 'Gar keine Methoden, weil sie schon in `Ticket` stehen'], 0, 'Geerbtes bleibt in der Oberklasse. In der Unterklasse notierst du nur Neues und Überschriebenes.'),
          A.q('Ein `Warenkorb` verwaltet mehrere `Artikel`. Ist Vererbung (`Warenkorb --|> Artikel`) hier sinnvoll?', ['Nein, ein Warenkorb ist kein Artikel, er enthält Artikel', 'Ja, weil der Warenkorb die Preise der Artikel braucht', 'Ja, solange die Attribute in Artikel protected sind', 'Nein, weil ein Warenkorb nur eine Oberklasse haben darf'], 0, 'Der „ist-ein“-Test scheitert. Ein Warenkorb enthält Artikel bzw. Positionen – das ist eine Beziehung, keine Vererbung.'),
          A.q('Was bedeutet `{final}` an einer Methode im Klassendiagramm?', ['Unterklassen dürfen diese Methode nicht überschreiben', 'Die Methode darf nur ein einziges Mal aufgerufen werden', 'Die Methode gibt immer eine unveränderliche Konstante zurück', 'Die Methode ist abstrakt und besitzt noch keinen Rumpf'], 0, 'final sperrt das Überschreiben in weiteren Unterklassen (bei einer Klasse sperrt es das Ableiten).')
        ],
        tasks: [
          A.fill('Übersetze `public class DigitalArtikel extends Artikel` in die UML-Beziehungszeile.', 'DigitalArtikel {{--|>}} Artikel', 'Vererbung: durchgezogene Linie mit hohler Dreiecksspitze zur Oberklasse.'),
          A.fill('Ergänze den fehlenden Methodenaufruf an die Oberklasse in Python.', 'class DigitalArtikel(Artikel):\n    def __init__(self, name, preis):\n        {{super}}().__init__(name, preis)', 'Das Schlüsselwort ruft den Konstruktor der Oberklasse auf.'),
          PP('Vererbung im Shop: Was gibt das Programm aus?', [
            'class Artikel:',
            '    def __init__(self, name, preis):',
            '        self.name = name',
            '        self.preis = preis',
            '    def versand(self):',
            '        return 495',
            '    def gesamt(self):',
            '        return self.preis + self.versand()',
            'class DigitalArtikel(Artikel):',
            '    def versand(self):',
            '        return 0',
            'print(Artikel("Maus", 1999).gesamt(), DigitalArtikel("Lizenz", 9900).gesamt())'
          ], '2494 9900', 'gesamt() ruft self.versand() auf. Welche Version läuft bei welchem Objekt?', 'Für die Maus gilt versand() = 495 (1999 + 495 = 2494). Für die Lizenz läuft das überschriebene versand() = 0.'),
          A.bug('Shop: Für Software-Lizenzen werden trotzdem 495 Cent Versand berechnet. Finde den Fehler.', 'python', [
            'class Artikel:',
            '    def versand_in_cent(self):',
            '        return 495',
            'class DigitalArtikel(Artikel):',
            '    def versand_incent(self):',
            '        return 0',
            'lizenz = DigitalArtikel()',
            'print("Versand:", lizenz.versand_in_cent(), "Cent")'
          ], { line: 4, kind: 'logik', fixes: [
            'def versand_in_cent(self):',
            'def versand_in_cent(self, preis):',
            'def _versand_in_cent(self):',
            'def versand(self):'
          ], expect: 'Versand: 0 Cent', trace: true }, 'Vergleiche den Methodennamen in Artikel und DigitalArtikel Buchstabe für Buchstabe.', 'Durch den fehlenden Unterstrich in versand_incent entstand eine zweite Methode statt eines Überschreibens. Deshalb lief weiter die Methode der Oberklasse.')
        ]
      },
      {
        id: 'poly', standalone: true, domain: 'shop', stage: 3,
        title: 'Polymorphie, abstrakte Klassen und Schnittstellen',
        goal: 'Du modellierst erweiterbare Software mit Schnittstellen («interface») und abstrakten Klassen, liest Realisierung und Abhängigkeit im UML und begründest, warum Polymorphie if-Ketten ersetzt.',
        terms: ['Polymorphie', 'Abstrakte Klasse', ['Schnittstelle (Interface)', 'Schnittstelle', 'Interface']],
        parts: [
          A.text('Ein Aufruf, viele Klassen – ohne if-Kette', 'Im Checkout unseres Onlineshops zahlen Kunden per **PayPal**, **Kreditkarte** oder **Rechnung**. Jede Zahlungsart berechnet ihre Gebühr anders. Wenn der `Warenkorb` jede Zahlungsart per `if (art.equals("PayPal")) ... else if ...` unterscheidet, muss er bei jeder neuen Zahlungsart (z. B. Apple Pay) umgebaut werden.\n\nDie Lösung ist **Polymorphie** über eine **Schnittstelle (Interface)**: `Zahlungsmethode` legt als Vertrag fest, **welche** Methoden jede Zahlungsart anbieten muss (`gebuehrInCent`, `name`), aber nicht **wie**. Der `Warenkorb` kennt nur das Interface – kommt morgen eine neue Zahlungsart dazu, entsteht einfach eine neue Klasse, am Warenkorb ändert sich keine einzige Zeile.'),
          A.uml('schnittstelle Zahlungsmethode\n  + gebuehrInCent(betragInCent: long): long\n  + name(): String\nklasse PayPal\n  + gebuehrInCent(betragInCent: long): long\n  + name(): String\nklasse Kreditkarte\n  + gebuehrInCent(betragInCent: long): long\n  + name(): String\nklasse Rechnung\n  + gebuehrInCent(betragInCent: long): long\n  + name(): String\nklasse Warenkorb\n  + checkout(z: Zahlungsmethode): long\nPayPal ..|> Zahlungsmethode\nKreditkarte ..|> Zahlungsmethode\nRechnung ..|> Zahlungsmethode\nWarenkorb ..> Zahlungsmethode : nutzt', 'Interface, Realisierung und Abhängigkeit im UML', '`«interface»` über dem Namen kennzeichnet die Schnittstelle. **Gestrichelte Linie mit hohlem Dreieck** (`..|>`) heißt **Realisierung**: Die Klasse erfüllt den Vertrag. **Gestrichelter offener Pfeil** (`..>`) heißt **Abhängigkeit**: `Warenkorb` nutzt nur die Schnittstelle als Parameter.'),
          A.text('Wann eine abstrakte Klasse statt eines Interfaces?', 'Manchmal teilen Unterklassen nicht nur denselben Methodenkopf, sondern auch **gemeinsame Attribute und fertigen Code**. Beispiel im Shop: Jede **RabattRegel** hat eine Beschreibung (`bezeichnung`), aber jede Unterklasse (`ProzentRabatt`, `GutscheinRabatt`) rechnet den Abzug anders. Eine „allgemeine RabattRegel“ ohne konkrete Rechenart ergibt als Objekt keinen Sinn.\n\nDeshalb macht man `RabattRegel` zu einer **abstrakten Klasse**: Aus ihr darf kein `new RabattRegel()` erzeugt werden, und ihre abstrakte Methode `abzugInCent()` hat keinen Rumpf – jede Unterklasse **muss** sie ausfüllen.'),
          A.uml('klasse RabattRegel abstrakt\n  # bezeichnung: String\n  + getBezeichnung(): String\n  + abzugInCent(summeInCent: long): long\nklasse ProzentRabatt\n  - prozent: int\n  + abzugInCent(summeInCent: long): long\nklasse GutscheinRabatt\n  - betragInCent: long\n  + abzugInCent(summeInCent: long): long\nProzentRabatt --|> RabattRegel\nGutscheinRabatt --|> RabattRegel', 'Abstrakte Klasse im UML', 'Im UML stehen abstrakte Klassen und abstrakte Methoden **kursiv** (oder mit `{abstract}`). Die Vererbung ist wieder eine durchgezogene Linie (`--|>`).'),
          CJ([
            'public interface Zahlungsmethode {§«interface» im UML.',
            '    long gebuehrInCent(long betragInCent);§Kein Rumpf: nur der Vertrag.',
            '}',
            'public class PayPal implements Zahlungsmethode {§implements entspricht ..|> im UML.',
            '    public long gebuehrInCent(long betrag) { return betrag * 249 / 10000 + 35; }',
            '}',
            'public class Rechnung implements Zahlungsmethode {',
            '    public long gebuehrInCent(long betrag) { return 0; }',
            '}'
          ], 'Schnittstelle und Realisierung in Java', { praxis: 'In Java-Frameworks (Spring, Jakarta EE) werden fast alle Dienste über Interfaces entkoppelt: Im Betrieb läuft der echte Zahlungsdienst, im Unit-Test eine Attrappe mit demselben Interface.' }),
          CP([
            'class PayPal:',
            '    def name(self): return "PayPal"',
            '    def gebuehr_in_cent(self, betrag): return betrag * 249 // 10000 + 35',
            'class Kreditkarte:',
            '    def name(self): return "Kreditkarte"',
            '    def gebuehr_in_cent(self, betrag): return betrag * 150 // 10000',
            'class Rechnung:',
            '    def name(self): return "Rechnung"',
            '    def gebuehr_in_cent(self, betrag): return 0',
            'for z in [PayPal(), Kreditkarte(), Rechnung()]:§Polymorphie: derselbe Aufruf, drei verschiedene Klassen.',
            '    print(z.name(), "->", z.gebuehr_in_cent(10000), "Cent")'
          ], 'Polymorphie im Checkout (Python, mit Ablauf)', { trace: true, praxis: 'Python prüft nicht zwingend ein formales Interface (Duck Typing), aber das Architektur-Prinzip bleibt identisch: Alle Zahlungsarten bieten dieselben Methoden an.' }),
          A.table(['Merkmal', 'Abstrakte Klasse', 'Schnittstelle (Interface)'], [
            ['Darstellung im UML', 'Name **kursiv** oder `{abstract}`', 'Stereotyp `«interface»` über dem Namen'],
            ['Linie zur Klasse', 'durchgezogen + hohles Dreieck (`--|>`)', 'gestrichelt + hohles Dreieck (`..|>`)'],
            ['Eigene Objekte (`new`)', 'nein', 'nein'],
            ['Attribute / fertiger Code', 'ja, gemeinsamer Zustand und Code', 'nur Konstanten und ggf. `{default}`-Methoden'],
            ['Mehrfachnutzung', 'Klasse erbt von höchstens **einer** Oberklasse', 'Klasse kann **mehrere** Interfaces realisieren'],
            ['Wann wählen?', 'Verwandte Klassen teilen Daten und Code', 'Verschiedene Klassen erfüllen denselben Vertrag']
          ], 'Abstrakte Klasse oder Schnittstelle?'),
          A.table(['Thema', 'Vertiefung in den Sprachkursen'], [
            ['`interface`, `implements` und Polymorphie in Java', '[Java, Modul 9: Vererbung und Interfaces](/code-lernen/kurs/java/vererbung/)'],
            ['Polymorphie und Duck Typing in Python', '[Python, Modul 9: Vererbung und Polymorphie](/code-lernen/kurs/python/vererbung/)']
          ], 'Dasselbe in Java und Python')
        ],
        tips: [
          A.warn('Weder aus einer abstrakten Klasse noch aus einem Interface kannst du ein Objekt erzeugen. Im Code entsteht immer ein Objekt einer **konkreten** Klasse (`new PayPal()`).'),
          A.tip('In IHK-Klassendiagrammen listet die realisierende Klasse die umgesetzten Interface-Methoden erneut in ihrem Methodenfach auf.')
        ],
        quiz: [
          A.q('Was ist der wichtigste Architektur-Vorteil, wenn `Warenkorb` nur das Interface `Zahlungsmethode` kennt?', ['Neue Zahlungsarten kommen hinzu, ohne den Warenkorb zu ändern', 'Die Berechnung der Gebühren läuft dadurch doppelt so schnell', 'Die Zahlungsarten brauchen dann keine eigenen Methoden mehr', 'Der Warenkorb erbt automatisch alle Attribute von PayPal'], 0, 'Lose Kopplung (Open-Closed-Prinzip): Bestehender Code bleibt unverändert, Erweiterungen entstehen als neue Klassen.'),
          A.q('Welche UML-Linie bedeutet „Klasse realisiert ein Interface“ (`implements`)?', ['Gestrichelte Linie mit hohler Dreiecksspitze', 'Durchgezogene Linie mit hohler Dreiecksspitze', 'Gestrichelte Linie mit offener Pfeilspitze', 'Durchgezogene Linie mit leerer Raute'], 0, 'Gestrichelt + hohles Dreieck = Realisierung. Durchgezogen + hohles Dreieck ist Vererbung.'),
          A.q('Woran erkennst du im UML-Klassendiagramm eine abstrakte Klasse?', ['Der Klassenname steht kursiv (oder trägt {abstract})', 'Der Klassenname ist durchgehend unterstrichen', 'Über dem Namen steht zwingend das Stereotyp «interface»', 'Die Klasse besitzt ausschließlich statische Methoden'], 0, 'Kursivschrift (oder {abstract}) kennzeichnet abstrakte Klassen und abstrakte Methoden.'),
          A.q('Wann ist eine abstrakte Klasse besser als ein Interface?', ['Wenn Unterklassen gemeinsame Attribute und fertige Methoden teilen', 'Wenn eine Klasse drei verschiedene Verträge gleichzeitig erfüllen soll', 'Wenn aus der Vorlage direkt eigene Objekte erzeugt werden sollen', 'Wenn die Klasse keine Unterklassen bekommen darf'], 0, 'Ein Interface hat keinen veränderlichen Zustand. Gemeinsame Attribute gehören in eine abstrakte Oberklasse.')
        ],
        tasks: [
          A.fill('Übersetze `public class Kreditkarte implements Zahlungsmethode` ins UML.', 'Kreditkarte {{..|>}} Zahlungsmethode', 'Realisierung eines Interfaces: gestrichelte Linie mit hohler Dreiecksspitze.'),
          A.fill('Ergänze den Pfeil für die Abhängigkeit: `Warenkorb` benutzt `Zahlungsmethode` als Parameter.', 'Warenkorb {{..>}} Zahlungsmethode : nutzt', 'Eine vorübergehende Nutzung (Abhängigkeit) ist gestrichelt mit offener Pfeilspitze.'),
          PP('Polymorphie im Checkout: Was gibt das Programm aus?', [
            'class Rechnung:',
            '    def gebuehr(self, betrag): return 0',
            'class Kreditkarte:',
            '    def gebuehr(self, betrag): return betrag * 150 // 10000',
            'for z in [Rechnung(), Kreditkarte()]:',
            '    print(z.gebuehr(4000))'
          ], '0\n60', 'Rechne für beide Objekte mit betrag = 4000 (ganzzahlige Division //).', 'Rechnung ergibt 0. Kreditkarte: 4000 * 150 // 10000 = 600000 // 10000 = 60.'),
          A.choose('Beide Varianten berechnen dieselben Gebühren. Welche ist bei neuen Zahlungsarten leichter erweiterbar?', 'python', [
            [
              'def gebuehr(art, betrag):',
              '    if art == "PayPal":',
              '        return betrag * 249 // 10000 + 35',
              '    elif art == "Rechnung":',
              '        return 0',
              '    return 0',
              'print(gebuehr("PayPal", 2000), gebuehr("Rechnung", 2000))'
            ],
            [
              'class PayPal:',
              '    def gebuehr(self, betrag): return betrag * 249 // 10000 + 35',
              'class Rechnung:',
              '    def gebuehr(self, betrag): return 0',
              'def abrechnen(z, betrag): return z.gebuehr(betrag)',
              'print(abrechnen(PayPal(), 2000), abrechnen(Rechnung(), 2000))'
            ]
          ], { a: 1, expect: '84 0' }, 'Welche Funktion bleibt unverändert, wenn morgen ApplePay dazukommt?', 'abrechnen() kennt nur die Methode gebuehr(), keine konkrete Zahlungsart. Die if/elif-Kette müsste bei jeder neuen Zahlungsart geändert werden.')
        ]
      },
      {
        id: 'beziehungen', standalone: true, domain: 'tickets', stage: 3,
        title: 'Beziehungen und Multiplizitäten: UML und Code abgleichen',
        goal: 'Du unterscheidest Assoziation, Aggregation, Komposition und Abhängigkeit, liest Multiplizitäten sicher und erkennst im Code sofort, welche UML-Beziehung dahintersteckt.',
        terms: ['Assoziation', 'Aggregation', 'Komposition', 'Multiplizität'],
        parts: [
          A.text('Linien sind Referenzen im Code', 'In UML-Prüfungsaufgaben steht fast immer ein Klassendiagramm mit verschiedenen Linien und Zahlen. Das Geheimnis: **Jede Beziehung im Diagramm entspricht einer ganz bestimmten Stelle im Code.** Wer diese Übersetzung kennt, kann Diagramme in beide Richtungen lesen – vom UML zum Code und vom Code zurück ins UML.'),
          A.table(['Beziehung', 'UML-Linie', 'Bedeutung', 'Woran erkennst du es im Code?'], [
            ['**Assoziation**', 'durchgezogen (`-->`)', '„kennt“, „arbeitet mit“', 'Attribut hält Referenz auf anderes Objekt (`private Techniker bearbeiter;`)'],
            ['**Aggregation**', 'leere Raute (`o--`) am Ganzen', '„besteht aus“, Teile leben allein weiter', 'Fertige Objekte werden von außen übergeben und in einer Liste gesammelt'],
            ['**Komposition**', 'gefüllte Raute (`*--`) am Ganzen', '„besteht aus“, Teile sterben mit dem Ganzen', 'Das Ganze erzeugt seine Teile selbst (`new Position(...)`) und gibt sie nicht weg'],
            ['**Abhängigkeit**', 'gestrichelt (`..>`)', '„nutzt vorübergehend“', 'Andere Klasse taucht **nur als Methodenparameter** oder lokale Variable auf, nicht als Attribut']
          ], 'Die vier Beziehungen: UML direkt neben dem Code'),
          A.uml('klasse Abteilung\n  - name: String\n  + hinzufuegen(t: Techniker): void\nklasse Techniker\n  - kuerzel: String\nklasse Ticket\n  - id: int\n  - titel: String\n  + zuweisen(t: Techniker): void\nklasse ExportDienst\n  + alsText(t: Ticket): String\nAbteilung "1" o-- "1..*" Techniker : umfasst\nTicket "*" --> "0..1" Techniker : bearbeitet von\nExportDienst ..> Ticket : nutzt', 'Alle Beziehungen im IT-Ticketsystem', 'Lies jede Linie mit ihren Zahlen: Eine `Abteilung` umfasst mindestens einen `Techniker` (`1..*`, Aggregation: wechselt der Techniker das Team, existiert er weiter). Ein `Ticket` hat höchstens einen `Techniker` (`0..1`, anfangs `null`), ein Techniker kann beliebig viele Tickets haben (`*`). `ExportDienst` speichert kein Ticket, er bekommt es nur kurz als Parameter (Abhängigkeit).'),
          CJ([
            'public class Ticket {',
            '    private int id;',
            '    private Techniker bearbeiter = null;§Gerichtete Assoziation (0..1): Ticket kennt Techniker, anfangs null.',
            '    public void zuweisen(Techniker t) { this.bearbeiter = t; }',
            '}',
            'public class ExportDienst {',
            '    public String alsText(Ticket t) {§Abhängigkeit (..>): Ticket ist nur Parameter, kein Attribut!',
            '        return "Ticket #" + t;',
            '    }',
            '}'
          ], 'Assoziation vs. Abhängigkeit in Java', { praxis: 'Genau daran unterscheidest du in fremdem Code dauerhafte Verbindungen (Attribut = Assoziation) von kurzfristiger Nutzung (Parameter = Abhängigkeit).' }),
          CP([
            'class Techniker:',
            '    def __init__(self, kuerzel):',
            '        self.kuerzel = kuerzel',
            'class Ticket:',
            '    def __init__(self, ticket_id, titel):',
            '        self.id = ticket_id',
            '        self.titel = titel',
            '        self.bearbeiter = None§Multiplizität 0..1: Neues Ticket hat noch keinen Techniker.',
            '    def zuweisen(self, techniker):',
            '        self.bearbeiter = techniker§Jetzt zeigt die Assoziation auf genau 1 Techniker.',
            't = Ticket(504, "VPN bricht ab")',
            'print(t.bearbeiter)',
            't.zuweisen(Techniker("s.kaya"))',
            'print(t.bearbeiter.kuerzel)'
          ], 'Multiplizität 0..1 in Python (mit Ablauf)', { trace: true, praxis: 'Immer wenn ein Attribut im Code null/None sein darf, ist die Multiplizität im UML 0..1 statt 1 – ein Klassiker für NullPointerExceptions, wenn man es vergisst.' }),
          A.table(['Multiplizität', 'Bedeutung', 'Typisch im Code'], [
            ['`1`', 'genau eins (Pflicht)', 'Attribut im Konstruktor gesetzt, darf nie `null` sein'],
            ['`0..1`', 'keins oder eins (optional)', 'einzelnes Attribut, darf `null`/`None` sein'],
            ['`*` (oder `0..*`)', 'beliebig viele, auch keins', 'Liste / `ArrayList`, darf leer sein'],
            ['`1..*`', 'mindestens eins', 'Liste, die nie leer sein darf'],
            ['`2..5`', 'mindestens zwei, höchstens fünf', 'Liste mit Längenprüfung im Code']
          ], 'Multiplizitäten sicher übersetzen', 'Ein **offener Pfeil** (`-->`) heißt **gerichtete Assoziation**: Nur die Klasse am Pfeilanfang hat das Attribut. Zeigt der Pfeil von `Ticket` zu `Techniker`, kennt das Ticket seinen Bearbeiter, der Techniker speichert aber keine Ticketliste.'),
          A.table(['Thema', 'Vertiefung in anderen Kursen'], [
            ['Komposition & Assoziation im 4-Klassen-Shop (Java)', '[Java, Modul 11: Zusammenhänge](/code-lernen/kurs/java/architektur/)'],
            ['Komposition & Assoziation im 4-Klassen-Shop (Python)', '[Python, Modul 11: Zusammenhänge](/code-lernen/kurs/python/architektur/)'],
            ['Kardinalitäten in Datenbanken (1:n, n:m)', '[AP2: ERM und Normalisierung](/code-lernen/kurs/ap2/erm/)']
          ], 'Dasselbe im Code und in Datenbanken')
        ],
        tips: [
          A.tip('Im Zweifel zwischen Aggregation (`o--`) und Komposition (`*--`): Frage „Überlebt das Teil, wenn das Ganze gelöscht wird?“ Techniker ohne Abteilung: ja (Aggregation). Warenkorb-Position ohne Warenkorb: nein (Komposition).'),
          A.info('In relationalen Datenbanken wird eine `*` zu `*` (m:n) Beziehung zu einer eigenen **Zwischentabelle** mit zwei Fremdschlüsseln.')
        ],
        quiz: [
          A.q('Du siehst im Code `public String exportiere(Ticket t)` – `ExportDienst` hat aber kein Attribut vom Typ `Ticket`. Welche UML-Beziehung ist das?', ['Abhängigkeit (gestrichelter Pfeil)', 'Komposition (gefüllte Raute)', 'Aggregation (leere Raute)', 'Vererbung (hohles Dreieck)'], 0, 'Wird eine andere Klasse nur vorübergehend als Parameter oder lokale Variable benutzt, ist das eine Abhängigkeit (..>).'),
          A.q('Ein `Warenkorb` legt seine `Position`-Objekte selbst an; wird der Warenkorb gelöscht, verschwinden die Positionen mit. Welche Beziehung passt?', ['Komposition (gefüllte Raute am Warenkorb)', 'Aggregation (leere Raute am Warenkorb)', 'Gerichtete Assoziation ohne Raute', 'Abhängigkeit von Position zu Warenkorb'], 0, 'Existenzielle Abhängigkeit der Teile vom Ganzen = Komposition (*--).'),
          A.q('Im Code steht `private ArrayList<Position> positionen = new ArrayList<>();`, anfangs leer. Welche Multiplizität passt am Ende bei `Position`?', ['* (oder 0..*)', '1..*', '0..1', '1'], 0, 'Eine Liste, die anfangs leer sein und beliebig wachsen darf, entspricht * (0..*).'),
          A.q('Ein offener Pfeil zeigt von `Position` zu `Artikel` (`Position "*" --> "1" Artikel`). Was bedeutet die Pfeilrichtung?', ['Nur Position kennt ihren Artikel, nicht umgekehrt', 'Nur Artikel kennt alle Positionen, nicht umgekehrt', 'Position erbt Preis und Name von Artikel', 'Artikel verschwindet, sobald die Position gelöscht wird'], 0, 'Gerichtete Assoziation: navigierbar nur in Pfeilrichtung. Position hat ein Attribut artikel, Artikel kennt keine Positionen.'),
          A.q('Was bedeutet die Multiplizität `0..1` an `Ticket "*" --> "0..1" Techniker`?', ['Ein Ticket hat höchstens einen Techniker (oder keinen)', 'Ein Ticket braucht immer mindestens einen Techniker', 'Ein Techniker darf höchstens ein Ticket bearbeiten', 'Zwischen Ticket und Techniker gibt es keine Beziehung'], 0, 'Die Zahl steht immer am Zielende: Zu einem Ticket gehören 0 oder 1 Techniker.')
        ],
        tasks: [
          A.fill('Ergänze die Multiplizität: Ein Ticket ist an **höchstens einen** Techniker zugewiesen.', 'Ticket "*" --> "{{0..1}}" Techniker', 'Keiner oder einer: Untergrenze und Obergrenze mit zwei Punkten getrennt.'),
          A.fill('Ergänze die Beziehung: Der `Warenkorb` besitzt seine `Positionen` existenziell (Komposition).', 'Warenkorb "1" {{*--}} "*" Position', 'Gefüllte Raute am Ganzen in unserer UML-Schreibweise.'),
          A.fill('Ergänze die Beziehung: `ExportDienst` bekommt `Ticket` nur als Methodenparameter (Abhängigkeit).', 'ExportDienst {{..>}} Ticket', 'Gestrichelte Linie mit offener Pfeilspitze.'),
          PP('Gerichtete Assoziation 0..1 im Ticketsystem: Was gibt das Programm aus?', [
            'class Techniker:',
            '    def __init__(self, kuerzel): self.kuerzel = kuerzel',
            'class Ticket:',
            '    def __init__(self, id):',
            '        self.id = id',
            '        self.bearbeiter = None',
            '    def status(self):',
            '        return "offen" if self.bearbeiter is None else self.bearbeiter.kuerzel',
            't = Ticket(501)',
            'print(t.status())',
            't.bearbeiter = Techniker("m.weber")',
            'print(t.status())'
          ], 'offen\nm.weber', 'Prüfe self.bearbeiter vor und nach der Zuweisung.', 'Zuerst ist bearbeiter None (0 in 0..1), also „offen“. Nach der Zuweisung gibt status() das Kürzel m.weber zurück.')
        ]
      },
      {
        id: 'sequenz', standalone: true, domain: 'shop', stage: 4,
        title: 'Sequenzdiagramme: Aufrufe quer durch die Klassen',
        goal: 'Du liest Sequenzdiagramme mit Lebenslinien, Aufrufen, Rückgaben und Kontrollrahmen (loop, alt, opt) und verfolgst denselben Ablauf direkt im Code.',
        terms: ['Sequenzdiagramm', 'Klassendiagramm'],
        parts: [
          A.text('Aufbau vs. zeitlicher Ablauf', 'Ein **Klassendiagramm** ist wie der Grundriss eines Hauses: Es zeigt Räume und Türen, aber nicht, wer wann hindurchgeht. Ein **Sequenzdiagramm** zeigt genau diesen zeitlichen **Ablauf**: Welche Objekte rufen sich bei einer Bestellung in welcher Reihenfolge auf?\n\nOben stehen die beteiligten Objekte. Von jedem läuft eine gestrichelte **Lebenslinie** nach unten – **die Zeit läuft von oben nach unten**. Ein Pfeil nach rechts oder links ist ein Methodenaufruf, ein gestrichelter Pfeil zurück die Rückgabe.'),
          A.seq(['Checkout', 'Warenkorb', 'Position', 'Artikel', 'RabattRechner'], [
            ['Checkout', 'Warenkorb', 'summeInCent()'],
            ['Warenkorb', 'Position', 'betragInCent()'],
            ['Position', 'Artikel', 'getPreisInCent()'],
            ['Artikel', 'Position', '1999', 'ret'],
            ['Position', 'Warenkorb', '3998', 'ret'],
            ['Warenkorb', 'Checkout', '26898', 'ret'],
            ['Checkout', 'RabattRechner', 'rabattInCent(26898)'],
            ['RabattRechner', 'Checkout', '2689', 'ret']
          ], 'Der echte Shop-Checkout im Sequenzdiagramm', 'Genau diese Aufrufkette läuft in Java und Python Modul 11: `Checkout` fragt den `Warenkorb`, der jede `Position` fragt, die wiederum den `Artikel` nach dem Preis fragt. Danach berechnet der `RabattRechner` 10 % Rabatt ab 100 Euro.'),
          CP([
            'class Artikel:',
            '    def __init__(self, preis): self.preis = preis',
            '    def get_preis(self): return self.preis§Pfeil 3 und Rückgabe 4 im Diagramm.',
            'class Position:',
            '    def __init__(self, artikel, menge):',
            '        self.artikel = artikel',
            '        self.menge = menge',
            '    def betrag(self): return self.artikel.get_preis() * self.menge§Pfeil 2 ruft Artikel auf und liefert das Produkt zurück.',
            'class Warenkorb:',
            '    def __init__(self, pos): self.pos = pos',
            '    def summe(self):',
            '        s = 0',
            '        for p in self.pos: s += p.betrag()§Im Sequenzdiagramm wäre diese Schleife ein loop-Rahmen.',
            '        return s',
            'korb = Warenkorb([Position(Artikel(1999), 2), Position(Artikel(22900), 1)])',
            'summe = korb.summe()§Startet die gesamte Aufrufkette aus dem Diagramm.',
            'rabatt = summe * 10 // 100 if summe >= 10000 else 0',
            'print("Summe:", summe, "Rabatt:", rabatt, "Endbetrag:", summe - rabatt)'
          ], 'Dieselbe Aufrufkette in Python (mit Ablauf)', { trace: true, praxis: 'Wenn du im Debugger oder im Ablauf-Player Schritt für Schritt in die Methoden springst, läufst du buchstäblich die Pfeile des Sequenzdiagramms ab.' }),
          A.table(['Element im Sequenzdiagramm', 'Darstellung', 'Entspricht im Code'], [
            ['**Lebenslinie**', 'senkrechte gestrichelte Linie unter dem Objekt', 'Lebensdauer des Objekts während des Ablaufs'],
            ['**Synchroner Aufruf**', 'durchgezogene Linie mit **gefüllter** Spitze', 'normaler Methodenaufruf, Aufrufer wartet auf Antwort'],
            ['**Asynchroner Aufruf**', 'durchgezogene Linie mit **offener** Spitze', 'Nachricht abschicken und sofort weiterarbeiten (z. B. E-Mail-Versand)'],
            ['**Rückgabe**', 'gestrichelte Linie zurück', '`return`-Wert der Methode'],
            ['**Rahmen `loop`**', 'Kasten mit `loop [Bedingung]`', '`for`- oder `while`-Schleife'],
            ['**Rahmen `alt`**', 'Kasten mit getrennten Zweigen (`[wahr]` / `[else]`)', '`if` / `else`-Verzweigung'],
            ['**Rahmen `opt`**', 'Kasten mit `[Bedingung]` (ein Zweig)', '`if` ohne `else` (optionaler Schritt)']
          ], 'Alle Elemente für die IHK-Prüfung'),
          A.table(['Frage im Projekt', 'Passendes Diagramm', 'Wo vertiefen?'], [
            ['Welche Klassen gibt es und wie hängen sie zusammen?', '**Klassendiagramm** (Struktur)', 'Lektionen 1 bis 5 und 7 in diesem Kurs'],
            ['Wer ruft wen in welcher Reihenfolge auf?', '**Sequenzdiagramm** (Verhalten)', 'diese Lektion + [Java Modul 11](/code-lernen/kurs/java/architektur/)'],
            ['Was können Benutzer mit dem System tun?', '**Anwendungsfalldiagramm** (Use-Case)', '[PSS: Anwendungsfalldiagramm](/code-lernen/kurs/pss/usecase/)'],
            ['Wie läuft ein Geschäftsprozess mit Verzweigungen ab?', '**Aktivitätsdiagramm**', '[PSS: Aktivitätsdiagramm](/code-lernen/kurs/pss/aktivitaet/)']
          ], 'Wann welches UML-Diagramm?')
        ],
        tips: [
          A.tip('Zeichne vor dem Programmieren ein kleines Sequenzdiagramm für den wichtigsten Vorgang (z. B. Checkout oder Login). Wenn ein Objekt plötzlich 10 Pfeile an alle anderen schickt, weißt du früh, dass die Verantwortung schlecht verteilt ist.'),
          A.warn('Verwechsle nicht `alt` (entweder oder, wie `if/else`) mit `opt` (optional, wie `if` ohne `else`).')
        ],
        quiz: [
          A.q('Was zeigt ein Sequenzdiagramm im Gegensatz zum Klassendiagramm?', ['Die zeitliche Reihenfolge von Nachrichten zwischen Objekten', 'Die Vererbungshierarchie aller Klassen eines Projekts', 'Die Datenbanktabellen mit Primär- und Fremdschlüsseln', 'Alle Akteure außerhalb der Systemgrenze'], 0, 'Klassendiagramm = statischer Aufbau. Sequenzdiagramm = dynamischer Ablauf über die Zeit.'),
          A.q('Wofür steht ein durchgezogener Pfeil mit **gefüllter** Spitze im Sequenzdiagramm?', ['Synchroner Methodenaufruf: Aufrufer wartet auf Antwort', 'Asynchroner Aufruf: Aufrufer arbeitet sofort weiter', 'Rückgabewert einer beendeten Methode', 'Erzeugung einer Vererbungsbeziehung'], 0, 'Gefüllte Spitze = synchron (normaler Aufruf). Offene Spitze = asynchron. Gestrichelt = Rückgabe.'),
          A.q('Welcher Rahmen im Sequenzdiagramm entspricht einer `for`-Schleife über alle Positionen im Warenkorb?', ['loop', 'alt', 'opt', 'ref'], 0, 'loop wiederholt einen Abschnitt; alt ist if/else, opt ist if ohne else.'),
          A.q('In welche Richtung verläuft die Zeit in einem Sequenzdiagramm?', ['Von oben nach unten', 'Von links nach rechts', 'Von unten nach oben', 'Vom Zentrum nach außen'], 0, 'Je weiter unten ein Pfeil zwischen zwei Lebenslinien steht, desto später erfolgt der Aufruf.')
        ],
        tasks: [
          A.fill('Wie heißt die senkrechte gestrichelte Linie unter jedem Objekt im Sequenzdiagramm?', '{{Lebenslinie}}', 'Sie zeigt die Zeit, in der das Objekt am Ablauf beteiligt ist.'),
          A.fill('Welches Schlüsselwort steht links oben im Rahmen für eine `if/else`-Entscheidung im Sequenzdiagramm?', '{{alt}}', 'Kurz für Alternative (drei Buchstaben).'),
          A.desk('Schreibtischtest zum loop-Rahmen: Der Warenkorb addiert drei Positionen. Trage summe nach jedem Durchlauf ein.', 'python', [
            'positionen = [(1999, 2), (999, 3), (22900, 1)]',
            'summe = 0',
            'for preis, menge in positionen:',
            '    summe += preis * menge',
            '    print(summe)'
          ], { at: 4, cols: ['summe'] }, 'Multipliziere Preis mit Menge und addiere zur bisherigen Summe.', '1999 * 2 = 3998; plus 999 * 3 (2997) = 6995; plus 22900 * 1 = 29895.'),
          PP('Aufrufreihenfolge wie im Sequenzdiagramm von oben nach unten: Was gibt das Programm aus?', [
            'def preis():',
            '    print("3: Artikel.getPreis")',
            '    return 1999',
            'def betrag():',
            '    print("2: Position.betrag")',
            '    return preis() * 2',
            'print("1: Warenkorb.summe")',
            'print("4: Ergebnis", betrag())'
          ], '1: Warenkorb.summe\n2: Position.betrag\n3: Artikel.getPreis\n4: Ergebnis 3998', 'Verfolge, wann jede Funktion betreten wird und wann sie ihren Wert zurückgibt.', 'Zuerst startet Warenkorb (1), dann betrag() (2), darin preis() (3), und erst nach der Rückkehr wird das Ergebnis (4) ausgegeben.')
        ]
      },
      {
        id: 'entwurf', standalone: true, domain: 'shop', stage: 4,
        title: 'Von der Aufgabe zum Shop-Klassendiagramm',
        goal: 'Du analysierst einen IHK-Aufgabentext mit dem Substantiv-Verb-Verfahren, trennst Klassen sauber von Attributen und entwirfst das komplette 4-Klassen-Modell des Onlineshops.',
        terms: ['Klassendiagramm', 'Single Responsibility', 'Komposition', 'Assoziation', 'Multiplizität'],
        parts: [
          A.text('Das Substantiv-Verb-Verfahren', 'In der AP2 bekommst du oft eine halbe Seite Text und den Auftrag: „Entwerfen Sie ein Klassendiagramm.“ Geh immer systematisch in vier Schritten vor:\n\n1. **Substantive markieren** → Kandidaten für **Klassen** oder **Attribute**.\n2. **Prüfen:** Hat das Ding eigene Daten und eigenes Verhalten? Dann **Klasse**. Beschreibt es nur einen einzelnen Wert eines anderen Dings? Dann **Attribut**.\n3. **Verben markieren** → **Methoden** (immer bei der Klasse, die die Daten dafür hat: **Single Responsibility**).\n4. **Mengenwörter prüfen** („ein“, „mehrere“, „höchstens ein“) → **Beziehungen und Multiplizitäten**.'),
          A.text('Der Aufgabentext (Onlineshop)', '„Ein Onlineshop verwaltet **Artikel** mit Name und Preis in Cent. Kunden legen Artikel mit einer bestimmten Menge als **Position** in ihren **Warenkorb**. Ein Warenkorb enthält beliebig viele Positionen; wird der Warenkorb geleert, entfallen seine Positionen. Jede Position gehört zu genau einem Artikel und berechnet ihren Zeilenbetrag. Der Warenkorb bildet die Gesamtsumme. Ein eigener **RabattRechner** gewährt ab 100 Euro Bestellwert 10 % Rabatt.“'),
          A.table(['Stelle im Text', 'Entscheidung im Entwurf', 'Begründung'], [
            ['Artikel, Position, Warenkorb, RabattRechner', '**4 Klassen**', 'Jede hat eigene Daten und eine klar abgegrenzte Aufgabe (Single Responsibility).'],
            ['Name, Preis in Cent, Menge', '**Attribute**', 'Einzelwerte ohne eigenes Verhalten: Name/Preis an `Artikel`, Menge an `Position`.'],
            ['hinzufügen, Zeilenbetrag, Gesamtsumme, Rabatt', '**Methoden**', 'Jede Methode sitzt bei der Klasse, die die nötigen Daten besitzt.'],
            ['„Warenkorb enthält Positionen, entfallen mit ihm“', '**Komposition** `1 *-- *`', 'Positionen existieren nicht ohne ihren Warenkorb.'],
            ['„Position gehört zu genau einem Artikel“', '**Assoziation** `* --> 1`', 'Position kennt ihren Artikel; der Artikel existiert unabhängig weiter.']
          ], 'Vom Text zur Modell-Entscheidung', 'Warum ist `Position` eine eigene Klasse? Weil die **Menge** weder zum `Artikel` (im Katalog gibt es keine Bestellmenge) noch zum `Warenkorb` insgesamt gehört, sondern genau zu der Verbindung zwischen beiden!'),
          A.uml('klasse Warenkorb\n  - positionen: List<Position>\n  + hinzufuegen(a: Artikel, menge: int): void\n  + summeInCent(): long\nklasse Position\n  - menge: int\n  + betragInCent(): long\nklasse Artikel\n  - name: String\n  - preisInCent: long\n  + getPreisInCent(): long\nklasse RabattRechner\n  + rabattInCent(summeInCent: long): long\nWarenkorb "1" *-- "*" Position : enthält\nPosition "*" --> "1" Artikel', 'Der fertige Entwurf: unser 4-Klassen-Shop', 'Genau dieses Klassendiagramm ist die Bauzeichnung für Modul 11 in [Java](/code-lernen/kurs/java/architektur/) und [Python](/code-lernen/kurs/python/architektur/). Ändert sich die Rabattregel, fasst du nur `RabattRechner` an. Ändert sich ein Artikelpreis, gilt er sofort für alle Positionen.'),
          CP([
            'class Artikel:',
            '    def __init__(self, name, preis_in_cent):',
            '        self._name = name',
            '        self._preis_in_cent = preis_in_cent',
            '    def get_preis_in_cent(self): return self._preis_in_cent',
            'class Position:',
            '    def __init__(self, artikel, menge):',
            '        self._artikel = artikel§Assoziation (* --> 1).',
            '        self._menge = menge',
            '    def betrag_in_cent(self): return self._artikel.get_preis_in_cent() * self._menge',
            'class Warenkorb:',
            '    def __init__(self): self._positionen = []§Komposition (1 *-- *).',
            '    def hinzufuegen(self, artikel, menge): self._positionen.append(Position(artikel, menge))',
            '    def summe_in_cent(self): return sum(p.betrag_in_cent() for p in self._positionen)',
            'class RabattRechner:',
            '    def rabatt_in_cent(self, summe): return summe * 10 // 100 if summe >= 10000 else 0',
            'korb = Warenkorb()',
            'korb.hinzufuegen(Artikel("Funkmaus", 1999), 2)',
            'korb.hinzufuegen(Artikel("Monitor 27 Zoll", 22900), 1)',
            'summe = korb.summe_in_cent()',
            'rabatt = RabattRechner().rabatt_in_cent(summe)',
            'print("Zu zahlen:", summe - rabatt, "Cent")'
          ], 'Vom Diagramm direkt in lauffähigen Code (Python, mit Ablauf)', { trace: true, praxis: 'Vom Text zum Diagramm und vom Diagramm zum Code: Wer diesen Dreischritt beherrscht, besteht jede AP2-Modellierungsaufgabe und findet sich in jedem Teamprojekt zurecht.' }),
          A.table(['Entwurfs-Ziel', 'Direkt weiter im Code'], [
            ['Dasselbe 4-Klassen-Modell vollständig in Java', '[Java, Modul 11: Zusammenhänge](/code-lernen/kurs/java/architektur/)'],
            ['Dasselbe 4-Klassen-Modell vollständig in Python', '[Python, Modul 11: Zusammenhänge](/code-lernen/kurs/python/architektur/)'],
            ['Clean Code und Refactoring', '[Java, Modul 12: Clean Code](/code-lernen/kurs/java/clean/)']
          ], 'Dasselbe in Java und Python')
        ],
        tips: [
          A.warn('**Nicht jedes Substantiv ist eine Klasse.** „Preis“ und „Name“ sind Attribute von `Artikel`. Frage immer: Hat es eigene Daten und eigenes Verhalten?'),
          A.tip('**Single-Responsibility-Check:** Lässt sich die Aufgabe einer Klasse nicht in einem kurzen Satz ohne „und außerdem“ erklären, teile sie lieber in zwei Klassen auf.')
        ],
        quiz: [
          A.q('Warum braucht das Shop-Modell eine eigene Klasse `Position` zwischen `Warenkorb` und `Artikel`?', ['Weil die Bestellmenge genau zu einem Artikel im Korb gehört', 'Weil ein Warenkorb sonst keine Artikel-Objekte speichern darf', 'Weil Artikel keine eigenen Methoden für Preise haben dürfen', 'Weil UML eine direkte Linie zwischen Warenkorb und Artikel verbietet'], 0, 'Der Artikel im Katalog hat keine Bestellmenge, der Warenkorb hat mehrere verschiedene Mengen. Die Menge gehört zur Position.'),
          A.q('Warum speichert `Position` eine Referenz auf `Artikel` statt den Preis noch einmal als Zahl?', ['Damit eine Preisänderung am Artikel sofort überall gilt', 'Weil Positionen in UML keine long-Attribute haben dürfen', 'Weil Referenzen weniger Arbeitsspeicher als Zahlen brauchen', 'Damit der Artikel auch alle Positionen direkt ändern kann'], 0, 'Single Source of Truth: Doppelt gespeicherte Daten laufen bei Änderungen auseinander.'),
          A.q('Ab morgen gibt es 15 % Rabatt ab 200 Euro. Welche Klasse im Entwurf muss angepasst werden?', ['Nur der RabattRechner', 'Warenkorb und RabattRechner', 'Artikel, Position und Warenkorb', 'Alle vier Klassen gemeinsam'], 0, 'Dank Single Responsibility steckt die Rabattlogik an genau einer Stelle.'),
          A.q('Welche Wörter im Aufgabentext liefern dir beim Entwerfen meist die **Methoden**?', ['Verben (Tätigkeiten wie berechnen, hinzufügen)', 'Substantive (Dinge wie Artikel, Warenkorb)', 'Eigennamen (wie Funkmaus, Monitor)', 'Zahlenwerte (wie 100 Euro, 10 %)'], 0, 'Verben beschreiben, was eine Klasse tun soll – daraus entstehen die Methoden.')
        ],
        tasks: [
          A.fill('Ergänze die Multiplizität aus dem Text: „Jede Position gehört zu **genau einem** Artikel.“', 'Position "*" --> "{{1}}" Artikel', 'Genau eins steht ohne Bereich als einzelne Ziffer.'),
          A.fill('Ergänze den Beziehungspfeil zwischen Warenkorb und Position (Positionen entfallen mit dem Warenkorb).', 'Warenkorb "1" {{*--}} "*" Position', 'Existenzielle Bindung = Komposition (gefüllte Raute).'),
          A.choose('Beide Varianten berechnen denselben Zeilenbetrag. Welche vermeidet doppelte Datenhaltung (Single Source of Truth)?', 'python', [
            [
              'class Artikel:',
              '    def __init__(self, preis): self.preis = preis',
              'class Position:',
              '    def __init__(self, preis_kopie, menge):',
              '        self.preis_kopie = preis_kopie',
              '        self.menge = menge',
              '    def betrag(self): return self.preis_kopie * self.menge',
              'maus = Artikel(1999)',
              'p = Position(maus.preis, 2)',
              'print(p.betrag())'
            ],
            [
              'class Artikel:',
              '    def __init__(self, preis): self.preis = preis',
              'class Position:',
              '    def __init__(self, artikel, menge):',
              '        self.artikel = artikel',
              '        self.menge = menge',
              '    def betrag(self): return self.artikel.preis * self.menge',
              'maus = Artikel(1999)',
              'p = Position(maus, 2)',
              'print(p.betrag())'
            ]
          ], { a: 1, expect: '3998' }, 'Was passiert, wenn sich maus.preis ändert, während die Position im Warenkorb liegt?', 'Die zweite Variante hält die Assoziation zum Artikel und fragt den aktuellen Preis ab. Eine kopierte Zahl in Position würde veralten.'),
          A.bug('Warenkorb-Entwurf: Bei zwei Positionen liefert summe_in_cent() nur den Betrag der letzten Position.', 'python', [
            'class Position:',
            '    def __init__(self, preis, menge):',
            '        self.preis = preis',
            '        self.menge = menge',
            '    def betrag(self): return self.preis * self.menge',
            'class Warenkorb:',
            '    def __init__(self, pos): self.pos = pos',
            '    def summe(self):',
            '        s = 0',
            '        for p in self.pos:',
            '            s = p.betrag()',
            '        return s',
            'k = Warenkorb([Position(1999, 2), Position(999, 3)])',
            'print(k.summe())'
          ], { line: 10, kind: 'logik', fixes: [
            's += p.betrag()',
            's -= p.betrag()',
            's = s * p.betrag()',
            'return p.betrag()'
          ], expect: '6995', trace: true }, 'Was passiert in Zeile 11 mit der bisherigen Summe s?', '= überschreibt s in jedem Durchlauf, sodass am Ende nur der letzte Betrag (2997) übrig bleibt. Mit += werden alle Positionen addiert (3998 + 2997 = 6995).')
        ]
      }
    ]
  });
})();
