/* Kurs: Python */
(function () {
  'use strict';
  const A = window.Academy, C = (lines, h, o) => A.code('python', lines, h, o);
  // Denkaufgabe mit Python-Code
  const PP = (prompt, code, ans, hint, expl) => Object.assign(A.predict(prompt, code, ans, hint, expl), { lang: 'python' });
  A.langNames.text = 'Ausgabe';

  A.track({
    id: 'python', title: 'Python', tag: 'PYTHON',
    desc: 'Lesbar, vielseitig und ideal zum Einstieg: von print() bis zu Klassen, Listen, Dateien und Fehlerbehandlung.',
    intro: 'Python liest sich fast wie Englisch und verzichtet auf viele Sonderzeichen. Besonderheit: **Die Einrückung gehört zur Sprache.** Zusammengehörige Zeilen (ein Block) werden um 4 Leerzeichen eingerückt, statt in geschweifte Klammern gesetzt.\n\nZum Ausprobieren auf deinem Rechner: Python von python.org installieren (unter Windows den Haken **„Add Python to PATH“** setzen), Datei `hallo.py` anlegen und mit `python hallo.py` starten. Die Beispiele laufen unverändert.',
    lessons: [
      {
        concept: 'hello',
        parts: [
          C(['# Das ist ein Kommentar: Python ignoriert alles hinter dem #§Kommentare beginnen mit # und gelten bis zum Zeilenende.', 'print("Hallo Welt")§print() gibt aus, was in den Klammern steht. Text steht in Anführungszeichen.', 'print("Ich lerne", "Python")§Mehrere Werte trennt man mit Komma. print setzt von selbst ein Leerzeichen dazwischen.', 'print(2 + 3)§Zahlen brauchen keine Anführungszeichen. Erst wird gerechnet, dann ausgegeben: 5.'], 'Dein erstes Python-Programm'),
          A.text('Starten und ausprobieren', 'Speichere die Zeilen in einer Datei `hallo.py` und starte sie in der Eingabeaufforderung mit `python hallo.py`. Gibst du nur `python` ein, öffnet sich der **interaktive Modus** (`>>>`): Du tippst eine Zeile und siehst sofort das Ergebnis, ideal zum Experimentieren.')
        ],
        tips: [A.warn('Python meldet `IndentationError`, wenn die Einrückung nicht stimmt. Mische nie Tabs und Leerzeichen. Nimm überall 4 Leerzeichen.')],
        quiz: [A.q('Womit beginnt ein Kommentar in Python?', ['#', '//', '--', '/*'], 0, 'In Python steht ein Rautezeichen. `//` ist dort die Ganzzahl-Division.')],
        tasks: [PP('Was gibt das Programm aus?', ['print("a")', 'print("b", "c")', 'print(1 + 1)'], 'a\nb c\n2', 'print setzt bei mehreren Werten ein Leerzeichen dazwischen. 1 + 1 wird zuerst gerechnet.', 'Jeder print-Aufruf beginnt eine neue Zeile.')]
      },
      {
        concept: 'vars',
        parts: [
          C(['alter = 25§Legt die Variable alter an und speichert 25. Eine Deklaration mit Typ ist nicht nötig, Python erkennt den Typ am Wert.', 'preis = 19.99§Kommazahlen schreibt man mit **Punkt**. Typ: float.', 'name = "Ada"§Text (Typ str) in Anführungszeichen. Einfache \'…\' gehen auch.', 'ist_student = True§Wahrheitswerte heißen True und False, mit großem Anfangsbuchstaben.', 'alter = alter + 1§Rechts wird zuerst gerechnet, das Ergebnis wandert zurück in alter (jetzt 26).', 'print(name, "ist", alter)§Gibt aus: Ada ist 26', 'print(type(preis))§type() verrät den Datentyp: <class \'float\'>'], 'Variablen und Typen'),
          C(['eingabe = input("Dein Alter: ")§input() fragt den Benutzer und liefert **immer Text** zurück, auch wenn er 25 tippt.', 'alter = int(eingabe)§int() wandelt den Text in eine ganze Zahl um. Ohne Umwandlung könntest du nicht rechnen.', 'print("Nächstes Jahr:", alter + 1)§Jetzt geht die Rechnung. Gibt z. B. aus: Nächstes Jahr: 26'], 'Eingabe lesen und umwandeln'),
          A.table(['Umwandlung', 'Zweck', 'Beispiel'], [['`int(x)`', 'in ganze Zahl', '`int("42")` ergibt 42'], ['`float(x)`', 'in Kommazahl', '`float("3.5")` ergibt 3.5'], ['`str(x)`', 'in Text', '`str(5)` ergibt "5"']], 'Typ umwandeln')
        ],
        tips: [A.tip('Python-Variablen schreibt man klein, mit Unterstrich: `ist_student`, `anzahl_kunden` (**snake_case**). Das ist Konvention, kein Zwang, aber alle halten sich daran.'), A.warn('`"5" + 3` ist ein Fehler (Text plus Zahl). Wandle zuerst um: `int("5") + 3` ergibt 8 oder `"5" + str(3)` ergibt "53".')],
        quiz: [A.q('Was liefert `input()` immer zurück?', ['Text (str)', 'Eine ganze Zahl', 'Eine Kommazahl', 'True oder False'], 0, 'Auch wenn der Benutzer 25 eintippt, ist es zunächst der Text "25". Mit int() oder float() wandelst du um.')],
        tasks: [PP('Was gibt das Programm aus?', ['x = 3', 'y = x', 'x = 10', 'print(x, y)'], '10 3', 'y bekam den Wert 3, bevor x geändert wurde.', 'Bei `y = x` wird der **aktuelle Wert** kopiert.'), A.fill('Ergänze die Umwandlung in eine ganze Zahl.', 'zahl = {{int}}(input("Zahl: "))', 'Die Funktion für „ganze Zahl“ heißt wie der Datentyp: int.')]
      },
      {
        concept: 'ops',
        parts: [
          C(['print(7 + 3)§Addition: 10', 'print(7 / 2)§Normale Division liefert **immer** eine Kommazahl: 3.5', 'print(7 // 2)§Ganzzahl-Division (zwei Schrägstriche): 3', 'print(7 % 2)§Das Prozentzeichen liefert den **Rest** (Modulo): 1', 'print(2 ** 10)§Zwei Sterne = Potenz: 2 hoch 10 = 1024', 'print(5 > 3 and 5 < 10)§and = UND. Beide Vergleiche stimmen: True', 'print(not (5 == 5))§not dreht um. 5 == 5 ist True, also False. Vergleichen heißt ==', 'print(5 != 4)§!= bedeutet ungleich: True'], 'Rechnen, Vergleichen, Verknüpfen')
        ],
        tips: [A.tip('In Python ergibt `7 / 2` richtig `3.5`. Willst du die ganzzahlige Division wie in Java oder C, nimm `//`.')],
        quiz: [A.q('Was ergibt `7 // 2` in Python?', ['3', '3.5', '4', '1'], 0, '`//` ist die Ganzzahl-Division und rundet nach unten ab. Bei positiven Zahlen fallen einfach die Nachkommastellen weg, bei negativen wird weiter nach unten gerundet: `-7 // 2` ergibt -4.')],
        tasks: [A.predict('Was gibt das Programm aus?', ['print(17 // 5, 17 % 5)'], '3 2', '17 durch 5 ist 3 Rest 2.', 'Erst `//` (ganzzahlig), dann `%` (Rest).'), A.predict('Was gibt das Programm aus?', ['print(10 > 5 and 3 > 4)'], 'False', '`and` ist nur True, wenn beide Seiten True sind. 3 > 4 stimmt nicht.')].map((t) => Object.assign(t, { lang: 'python' }))
      },
      {
        concept: 'cond',
        parts: [
          C(['temperatur = 22§Der Wert, nach dem entschieden wird.', 'if temperatur > 25:§if prüft die Bedingung. Hinter der Bedingung steht ein **Doppelpunkt**.', '    print("heiß")§Eingerückt (4 Leerzeichen) = gehört zum if-Block. Läuft nur, wenn die Bedingung stimmt.', 'elif temperatur > 15:§elif („else if“): wird nur geprüft, wenn die Zeilen davor nicht zutrafen.', '    print("angenehm")§22 > 15 stimmt, darum läuft dieser Block. Ausgabe: angenehm', 'else:§Alles andere. Hat keine Bedingung, nur den Doppelpunkt.', '    print("kühl")§Wird hier nicht erreicht.'], 'if, elif, else'),
          C(['name = "Ada"§Ein Text.', 'if name == "Ada" or name == "Alan":§Texte vergleicht man mit ==. or = ODER.', '    print("Hallo Pionier")§Läuft, weil name gleich "Ada" ist.', 'if "d" in name:§in prüft, ob etwas enthalten ist (hier: kommt "d" im Text vor?).', '    print("enthält ein d")§Ausgabe: enthält ein d'], 'Text vergleichen und in prüfen')
        ],
        tips: [A.warn('Vergiss den **Doppelpunkt** am Ende von `if`, `elif`, `else` nicht, sonst gibt es einen `SyntaxError`.')],
        quiz: [A.q('Welches Zeichen steht in Python am Ende einer if-Zeile?', ['Ein Doppelpunkt `:`', 'Ein Semikolon `;`', 'Ein Punkt `.`', 'Nichts'], 0, 'Der Doppelpunkt leitet den eingerückten Block ein.')],
        tasks: [Object.assign(A.predict('Was wird ausgegeben?', ['x = 10', 'if x > 5 and x < 8:', '    print("A")', 'elif x > 5:', '    print("B")', 'else:', '    print("C")'], 'B', 'Die erste Bedingung braucht beides, x < 8 stimmt aber nicht. Die zweite Bedingung stimmt.'), { lang: 'python' })]
      },
      {
        concept: 'loops',
        parts: [
          C(['for i in range(1, 4):§range(1, 4) liefert 1, 2, 3. **Das Ende (4) gehört nicht mehr dazu!** i bekommt der Reihe nach diese Werte.', '    print("Durchlauf", i)§Eingerückter Schleifenkörper. Ausgabe: Durchlauf 1, Durchlauf 2, Durchlauf 3'], 'Zählschleife mit for und range'),
          C(['zahl = 1§Startwert.', 'while zahl < 50:§Vor jedem Durchlauf wird die Bedingung geprüft. Solange sie True ist, läuft der Block.', '    zahl = zahl * 3§Hier ändert sich etwas, damit die Schleife irgendwann endet.', 'print(zahl)§Nach der Schleife: 81 (1, 3, 9, 27, 81).'], 'Bedingungsschleife while'),
          C(['for i in range(10):§range(10) ist 0 bis 9.', '    if i == 3:§Wenn i gleich 3 ist:', '        continue§Dann überspringt continue den Rest dieses Durchlaufs und macht mit dem nächsten weiter.', '    if i == 6:§Wenn i gleich 6 ist:', '        break§Dann beendet break die ganze Schleife sofort.', '    print(i)§Ausgabe: 0 1 2 4 5 (jeweils in einer eigenen Zeile)'], 'break und continue')
        ],
        tips: [A.warn('`range(1, 4)` liefert **1, 2, 3**, nicht 4. Das Ende ist **ausgeschlossen**. Mit `range(5)` bekommst du 0 bis 4, genau passend zu den Listenindizes.')],
        quiz: [A.q('Welche Zahlen liefert `range(2, 5)`?', ['2, 3, 4', '2, 3, 4, 5', '3, 4, 5', '2, 5'], 0, 'Start ist dabei, das Ende nicht.')],
        tasks: [Object.assign(A.predict('Was wird ausgegeben?', ['for i in range(3):', '    print(i * 2)'], '0\n2\n4', 'range(3) liefert 0, 1, 2.'), { lang: 'python' }), A.fill('Ergänze die Funktion, die die Zahlen 1 bis 5 liefert.', 'for i in {{range}}(1, 6):\n    print(i)', 'Das Ende (6) ist nicht dabei, daher bis 5.')]
      },
      {
        concept: 'funcs',
        parts: [
          C(['def flaeche(laenge, breite):§def definiert eine Funktion. Name, Parameter in Klammern, Doppelpunkt.', '    return laenge * breite§return liefert das Ergebnis an den Aufrufer und beendet die Funktion.', '', 'raum = flaeche(4, 5)§Aufruf mit den Argumenten 4 und 5. Das Ergebnis 20 landet in raum.', 'print("Raumgröße:", raum)§Gibt aus: Raumgröße: 20'], 'Funktion mit Parametern und Rückgabe'),
          C(['def gruss(name="Welt"):§Ein **Standardwert**: Wird beim Aufruf kein Name angegeben, gilt "Welt".', '    return "Hallo " + name + "!"§Text mit + zusammensetzen.', '', 'print(gruss())§Ohne Argument: Hallo Welt!', 'print(gruss("Ada"))§Mit Argument: Hallo Ada!'], 'Standardwerte')
        ],
        tips: [A.warn('Ohne `return` gibt eine Python-Funktion `None` („nichts“) zurück. `print` in einer Funktion ist **nicht** dasselbe wie `return`.')],
        quiz: [A.q('Was passiert, wenn eine Python-Funktion kein `return` hat?', ['Sie liefert None', 'Sie liefert 0', 'Es gibt einen Fehler', 'Sie liefert den letzten Wert'], 0, 'None ist Pythons „kein Wert“.')],
        tasks: [Object.assign(A.predict('Was wird ausgegeben?', ['def doppelt(n):', '    return n * 2', 'print(doppelt(doppelt(3)))'], '12', 'doppelt(3) ist 6, dann doppelt(6) ist 12.'), { lang: 'python' })]
      },
      {
        concept: 'coll',
        parts: [
          C(['namen = ["Ada", "Alan", "Grace"]§Eine Liste in eckigen Klammern.', 'print(namen[0])§Erstes Element, Index 0: Ada', 'print(namen[-1])§Negative Indizes zählen von hinten. -1 ist das letzte Element: Grace', 'namen[1] = "Linus"§Ersetzt das zweite Element.', 'namen.append("Tim")§append hängt hinten etwas an. Jetzt sind es 4 Elemente.', 'print(len(namen))§len() liefert die Länge: 4', 'for name in namen:§Geht alle Elemente der Reihe nach durch.', '    print(name)§Gibt jedes Element aus.'], 'Listen'),
          C(['person = {"name": "Ada", "alter": 36}§Ein **Dictionary** speichert Paare aus Schlüssel und Wert in geschweiften Klammern.', 'print(person["name"])§Zugriff über den Schlüssel statt über eine Nummer: Ada', 'person["stadt"] = "London"§Fügt ein neues Paar hinzu.', 'for schluessel in person:§Durchläuft die Schlüssel.', '    print(schluessel, person[schluessel])§Gibt Schlüssel und zugehörigen Wert aus.'], 'Dictionaries'),
          C(['text = "Hallo"§Ein Text ist eine Folge von Zeichen.', 'print(len(text))§Länge: 5', 'print(text[0])§Erstes Zeichen: H', 'print(text[1:3])§Ausschnitt von Index 1 bis **vor** 3: al', 'print(text.upper())§Methode für Großbuchstaben: HALLO'], 'Texte sind auch Sammlungen')
        ],
        tips: [A.warn('Mit `b = a` kopierst du eine Liste **nicht**: Beide Namen zeigen auf dieselbe Liste. Eine echte Kopie bekommst du mit `b = a.copy()` oder `b = list(a)`.')],
        quiz: [A.q('Was liefert `liste[-1]` in Python?', ['Das letzte Element', 'Einen Fehler', 'Das erste Element', 'Die Länge'], 0, 'Negative Indizes zählen von hinten.')],
        tasks: [Object.assign(A.predict('Was gibt das Programm aus?', ['l = [10, 20, 30]', 'print(l[0], l[-1], len(l))'], '10 30 3', 'l[0] erstes, l[-1] letztes Element, len() die Anzahl.'), { lang: 'python' }), Object.assign(A.predict('Was gibt das Programm aus?', ['t = "Python"', 'print(t[1:4])'], 'yth', 'Index 1 bis vor 4: y (1), t (2), h (3).'), { lang: 'python' })]
      },
      {
        concept: 'oop',
        parts: [
          C(['class Konto:§Beginnt die Klasse Konto. Klassennamen schreibt man mit großem Anfangsbuchstaben.', '    def __init__(self, inhaber):§Der **Konstruktor** heißt immer __init__. self ist das Objekt selbst und steht in jeder Methode als erster Parameter.', '        self.inhaber = inhaber§Speichert den Wert im **Attribut** des Objekts. self. bedeutet: gehört zu diesem Objekt.', '        self.kontostand = 0§Jedes neue Konto startet mit 0.', '', '    def einzahlen(self, betrag):§Eine **Methode**: Funktion, die zur Klasse gehört.', '        self.kontostand += betrag§+= ist Kurzschreibweise für kontostand = kontostand + betrag.', '', '    def abheben(self, betrag):§Hebt Geld ab, wenn genug da ist.', '        if betrag <= self.kontostand:§Prüft, ob genug Geld vorhanden ist (Kapselung: Die Klasse schützt ihre Regeln).', '            self.kontostand -= betrag§Zieht den Betrag ab.', '            return True§Meldet: hat geklappt.', '        return False§Sonst: abgelehnt.', '', 'k = Konto("Ada")§Erzeugt ein **Objekt**. Der Konstruktor läuft mit "Ada".', 'k.einzahlen(100)§Ruft eine Methode am Objekt auf. Kontostand ist jetzt 100.', 'print(k.abheben(30), k.kontostand)§Hebt 30 ab. Gibt aus: True 70'], 'Eine Klasse mit Konstruktor und Methoden'),
          C(['class Tier:§Die Oberklasse.', '    def __init__(self, name):§Konstruktor mit Name.', '        self.name = name§Speichert den Namen.', '    def laut(self):§Eine Methode, die Unterklassen überschreiben dürfen.', '        return "..."§Standardlaut.', '', 'class Hund(Tier):§In Klammern steht die Oberklasse: Hund **erbt** von Tier.', '    def laut(self):§**Überschreibt** laut() für Hunde.', '        return "Wau"§Hunde sagen Wau.', '', 'for t in [Tier("Etwas"), Hund("Bello")]:§Eine Liste mit zwei verschiedenen Objekten.', '    print(t.name, t.laut())§Derselbe Aufruf, je nach Objekt anderes Ergebnis (Polymorphie). Ausgabe: Etwas ... und Bello Wau'], 'Vererbung')
        ],
        tips: [A.warn('Vergisst du `self` als ersten Parameter einer Methode oder `self.` vor einem Attribut, bekommst du Fehler wie `takes 1 positional argument but 2 were given` oder `NameError`.')],
        quiz: [A.q('Wie heißt der Konstruktor in Python?', ['__init__', 'constructor', 'new', 'Konto()'], 0, 'Beim Erzeugen eines Objekts ruft Python automatisch die Methode __init__ auf.')],
        tasks: [Object.assign(A.predict('Was gibt das Programm aus?', ['class Zaehler:', '    def __init__(self):', '        self.wert = 0', '    def hoch(self):', '        self.wert += 1', 'z = Zaehler()', 'z.hoch()', 'z.hoch()', 'print(z.wert)'], '2', 'Jedes hoch() erhöht das Attribut wert dieses Objekts um 1.'), { lang: 'python' })]
      },
      {
        concept: 'err',
        parts: [
          C(['try:§Hier steht der Code, der schiefgehen könnte.', '    zahl = int(input("Zahl: "))§Schlägt fehl (ValueError), wenn der Benutzer „abc“ tippt.', '    print(10 / zahl)§Schlägt fehl (ZeroDivisionError), wenn zahl 0 ist.', 'except ValueError:§Wird nur bei ValueError ausgeführt.', '    print("Das war keine Zahl")§Freundliche Meldung statt Absturz.', 'except ZeroDivisionError:§Ein anderer Fehlertyp, eine andere Reaktion.', '    print("Durch 0 geht nicht")§Reaktion darauf.', 'finally:§Läuft **immer**, ob Fehler oder nicht.', '    print("Fertig")§Gut für Aufräumarbeiten.'], 'try, except und finally'),
          C(['Traceback (most recent call last):§So beginnt jede Python-Fehlermeldung.', '  File "test.py", line 2, in <module>§Wo es passiert ist: Datei und **Zeilennummer**.', '    print(liste[3])§Die betroffene Zeile.', 'IndexError: list index out of range§Die Art des Fehlers und die Erklärung. Die liest du **zuerst**: Der Index 3 gibt es nicht.'], 'Eine Fehlermeldung lesen', { noRun: true })
        ],
        tips: [],
        quiz: [A.q('Welcher Teil von `try … except … finally` läuft **immer**?', ['finally', 'except', 'try', 'keiner'], 0, 'finally wird immer ausgeführt, auch nach einem Fehler.')],
        tasks: []
      },
      {
        id: 'adv', stage: 4, title: 'Vertiefung: Listen-Abkürzungen, Dateien und Module',
        goal: 'Du lernst drei Werkzeuge kennen, die Python-Programme im Alltag kürzer und nützlicher machen.',
        parts: [
          A.text('List Comprehension', 'Eine **List Comprehension** baut eine Liste in einer Zeile. Statt Schleife, leere Liste und `append` schreibst du das Ergebnis direkt hin. Sie liest sich wie ein Satz: „quadrat für jedes x in zahlen“.'),
          C(['zahlen = [1, 2, 3, 4, 5]§Ausgangsliste.', 'quadrate = [x * x for x in zahlen]§Für jedes x in zahlen wird x * x berechnet und in die neue Liste gelegt: [1, 4, 9, 16, 25]', 'gerade = [x for x in zahlen if x % 2 == 0]§Mit if filtert man: nur gerade Zahlen: [2, 4]', 'print(quadrate, gerade)§Gibt beide Listen aus.'], 'List Comprehensions'),
          A.text('Dateien lesen und schreiben', 'Programme sollen Daten oft **speichern**. Mit `with open(...)` öffnest du eine Datei und Python schließt sie am Ende **automatisch**, auch wenn etwas schiefgeht.'),
          C(['with open("notizen.txt", "w", encoding="utf-8") as datei:§Öffnet (oder erstellt) die Datei zum Schreiben ("w"). Der Block endet = Datei wird geschlossen.', '    datei.write("Hallo Datei\\n")§Schreibt eine Zeile. \\n ist der Zeilenumbruch.', '', 'with open("notizen.txt", "r", encoding="utf-8") as datei:§Öffnet dieselbe Datei zum Lesen ("r").', '    for zeile in datei:§Liest Zeile für Zeile.', '        print(zeile.strip())§strip() entfernt den Zeilenumbruch am Ende.'], 'Datei schreiben und lesen'),
          A.text('Module', 'Fertige Werkzeugkästen heißen **Module**. Mit `import` holst du sie. Pythons Standardbibliothek enthält hunderte, zum Beispiel `math`, `random`, `datetime`.'),
          C(['import math§Holt das Modul math.', 'import random§Holt das Modul random.', 'print(math.sqrt(16))§Quadratwurzel: 4.0', 'print(math.pi)§Die Kreiszahl: 3.141592653589793', 'print(random.randint(1, 6))§Eine Zufallszahl von 1 bis 6 (wie ein Würfel).'], 'Module benutzen')
        ],
        tips: [],
        quiz: [A.q('Was liefert `[x * 2 for x in [1, 2, 3]]`?', ['[2, 4, 6]', '[1, 2, 3]', '[3, 6]', '6'], 0, 'Jedes Element wird verdoppelt.'), A.q('Wozu dient `with open(...)`?', ['Die Datei wird am Ende des Blocks automatisch geschlossen', 'Die Datei wird gelöscht', 'Die Datei wird verschlüsselt', 'Es startet ein zweites Programm'], 0, 'with sorgt für sauberes Aufräumen.')],
        tasks: [Object.assign(A.predict('Was gibt das Programm aus?', ['print([n for n in range(1, 8) if n % 3 == 0])'], '[3, 6]', 'Von 1 bis 7 sind nur 3 und 6 durch 3 teilbar.'), { lang: 'python' })]
      }
    ]
  });
})();
