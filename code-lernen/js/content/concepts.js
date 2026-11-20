/* Gemeinsame Konzepte: gelten in jeder Sprache gleich. Eine Sprach-Lektion setzt ihre Code-Beispiele darauf auf. */
(function () {
  'use strict';
  const A = window.Academy;

  /* ================= 1. Ausgabe ================= */
  A.concept({
    id: 'hello', stage: 1, title: 'Dein erstes Programm: Ausgabe',
    goal: 'Du verstehst, was ein Programm ist, wie es abläuft, und du bringst den Computer dazu, etwas auszugeben.',
    idea: [
      A.text('Was ist ein Programm?', 'Ein Programm ist eine **Anleitung für den Computer**, ähnlich einem Rezept. Der Computer macht genau das, was dort steht, nicht mehr und nicht weniger. Er denkt nicht mit, errät nichts und verzeiht keine Tippfehler. Deine Aufgabe ist es deshalb, **eindeutige Schritte in der richtigen Reihenfolge** aufzuschreiben.'),
      A.text('Eine Anweisung nach der anderen', 'Ein Programm wird **von oben nach unten** abgearbeitet, Anweisung für Anweisung. Das ist das wichtigste Grundprinzip: die **Reihenfolge**. Wer „Kuchen backen“ vor „Teig rühren“ aufschreibt, bekommt ein anderes Ergebnis als gedacht.'),
      A.text('Ausgabe', 'Damit du siehst, was passiert, gibt ein Programm etwas aus, meistens Text auf dem Bildschirm. Fast jede Sprache hat dafür einen eigenen Befehl. Mit der Ausgabe beginnt jeder Lernweg, weil du sofort ein sichtbares Ergebnis hast.'),
      A.info('Jede Sprache hat eine **Syntax**, also eine Grammatik: Zeichen, Klammern und Schreibweise müssen exakt stimmen. Schon ein fehlendes Anführungszeichen kann ein ganzes Programm stoppen. Das passiert jedem und gehört zum Lernen dazu. Fehlermeldungen sind Hinweise, keine Kritik.')
    ],
    pseudo: [A.pseudo('AUSGABE "Hallo Welt"\nAUSGABE "Ich lerne programmieren"\nAUSGABE "Die Reihenfolge ist wichtig"', 'Drei Anweisungen nacheinander', 'Drücke „Weiter“. Pro Schritt wird genau eine Zeile ausgeführt, und der Ausgabekasten füllt sich.')],
    pitfalls: [A.warn('**Groß- und Kleinschreibung** zählt in den meisten Sprachen: `Print` und `print` sind verschiedene Wörter. Anführungszeichen müssen immer paarweise stehen, und Klammern auch.')],
    quiz: [
      A.q('Wie wird ein Programm normalerweise abgearbeitet?', ['Von oben nach unten, eine Anweisung nach der anderen', 'Alle Zeilen gleichzeitig', 'Von unten nach oben', 'Der Computer sucht sich die wichtigste Zeile aus'], 0, 'Die Reihenfolge ist das Grundprinzip. Später lernst du, wie du mit Entscheidungen und Schleifen davon abweichst.'),
      A.q('Was ist die **Syntax** einer Programmiersprache?', ['Die Regeln für Schreibweise und Zeichensetzung', 'Die Geschwindigkeit des Computers', 'Das Ergebnis eines Programms', 'Ein Werkzeug, das Fehler automatisch behebt'], 0, 'Syntax ist die Grammatik. Der Computer versteht nur, was exakt nach diesen Regeln geschrieben ist.')
    ],
    tasks: [A.predict('Was gibt dieses Programm aus? (Eine Ausgabezeile pro Zeile aufschreiben.)', ['AUSGABE "A"', 'AUSGABE "B"', 'AUSGABE "A"'], 'A\nB\nA', 'Gehe von oben nach unten und schreibe bei jeder AUSGABE auf, was erscheint.', 'Jede AUSGABE erzeugt eine neue Zeile, in der Reihenfolge im Programm.')]
  });

  /* ================= 2. Variablen ================= */
  A.concept({
    id: 'vars', stage: 1, title: 'Variablen und Datentypen',
    goal: 'Du kannst Werte speichern, benennen und wieder verwenden und weißt, welche Arten von Werten es gibt.',
    idea: [
      A.text('Die Schachtel mit Etikett', 'Eine **Variable** ist wie eine Schachtel mit einem Etikett. Das Etikett ist der **Name** (z. B. `alter`), der Inhalt ist der **Wert** (z. B. `25`). Du kannst jederzeit nachsehen, was in der Schachtel liegt, oder den Inhalt austauschen. Das Programm „merkt“ sich so Dinge zwischen zwei Anweisungen.'),
      A.text('Zuweisung heißt: reinlegen, nicht vergleichen', 'Das Zeichen `=` bedeutet in fast allen Programmiersprachen **„lege den Wert rechts in die Variable links“**. Es ist keine mathematische Gleichung. Darum ist `zähler = zähler + 1` völlig in Ordnung: Erst wird rechts gerechnet (alter Wert plus 1), dann wird das Ergebnis wieder in dieselbe Schachtel gelegt.'),
      A.table(['Datentyp', 'Was drinsteckt', 'Beispiele'], [
        ['Ganze Zahl', 'Zahlen ohne Komma', '`0`, `42`, `-7`'],
        ['Kommazahl', 'Zahlen mit Nachkommastellen (mit Punkt geschrieben)', '`3.14`, `0.5`'],
        ['Text (String)', 'Zeichenketten, in Anführungszeichen', '`"Hallo"`, `"abc123"`'],
        ['Wahrheitswert (Boolean)', 'Nur zwei Möglichkeiten', '`WAHR` / `FALSCH` (true / false)']
      ], 'Datentypen', 'Jeder Wert hat einen **Typ**. Der Typ bestimmt, was man damit tun darf: Zahlen kann man addieren, Texte aneinanderhängen, Wahrheitswerte mit UND/ODER verknüpfen. Die Zahl `5` und der Text `"5"` sind nicht dasselbe.'),
      A.text('Gute Namen', 'Wähle Namen, die sagen, was drinsteckt: `preis` statt `x`. Du liest Code viel öfter, als du ihn schreibst. Namen enthalten keine Leerzeichen und beginnen nicht mit einer Ziffer.')
    ],
    pseudo: [A.pseudo('a <- 5\nb <- 8\n// Tausch der Inhalte: wir brauchen eine dritte Schachtel\nhilf <- a\na <- b\nb <- hilf\nAUSGABE "a =", a\nAUSGABE "b =", b', 'Klassiker: zwei Werte tauschen', 'Beobachte die Variablentabelle rechts: Gelb markiert ist immer, was sich gerade geändert hat. Warum braucht man `hilf`? Probiere gedanklich aus, was ohne sie passieren würde.')],
    pitfalls: [
      A.warn('**Zuweisung ist nicht Gleichheit.** In den meisten Sprachen ist `=` die Zuweisung und `==` der Vergleich. Wer in einer Bedingung `=` statt `==` schreibt, macht einen der häufigsten Anfängerfehler.'),
      A.warn('Eine Variable muss einen Wert **haben, bevor** du sie benutzt. Sonst gibt es einen Fehler oder (in C) zufälligen Müll.')
    ],
    quiz: [
      A.q('Was passiert bei `zähler = zähler + 1`?', ['Der Wert von zähler wird um 1 größer', 'Das ist ein Fehler, weil eine Zahl nicht gleich sich plus 1 sein kann', 'zähler wird auf 1 gesetzt', 'Der Computer vergleicht zähler mit zähler + 1'], 0, 'Rechts wird zuerst gerechnet (alter Wert + 1), danach wird das Ergebnis in zähler gespeichert. `=` ist hier eine Zuweisung.'),
      A.q('Welcher Typ passt zum Wert `"42"` (mit Anführungszeichen)?', ['Text', 'Ganze Zahl', 'Wahrheitswert', 'Kommazahl'], 0, 'Alles in Anführungszeichen ist Text, auch wenn es wie eine Zahl aussieht. Mit Text-„42“ kannst du nicht rechnen.')
    ],
    tasks: [
      A.predict('Welche Werte haben `a` und `b` am Ende? (Zeile 1: Wert von a und Zeile 2: Wert von b)', ['a <- 5', 'b <- a', 'a <- 10', 'AUSGABE a', 'AUSGABE b'], '10\n5', '`b <- a` kopiert den Wert von **diesem Moment**. Spätere Änderungen an a berühren b nicht.', 'b hat sich bei `b <- a` den Wert 5 gemerkt. Dass a danach auf 10 geändert wird, ändert b nicht.'),
      A.predict('Was wird ausgegeben?', ['x <- 3', 'x <- x * 2', 'x <- x + 4', 'AUSGABE x'], '10', 'Gehe Zeile für Zeile durch und schreibe dir nach jeder Zeile den aktuellen Wert von x auf.')
    ]
  });

  /* ================= 3. Rechnen und Vergleichen ================= */
  A.concept({
    id: 'ops', stage: 1, title: 'Rechnen, Vergleichen und Verknüpfen',
    goal: 'Du kannst mit Operatoren rechnen, Werte vergleichen und Bedingungen mit UND, ODER und NICHT verknüpfen.',
    idea: [
      A.table(['Operation', 'Zeichen', 'Beispiel', 'Ergebnis'], [
        ['Addition', '`+`', '`7 + 3`', '10'], ['Subtraktion', '`-`', '`7 - 3`', '4'], ['Multiplikation', '`*`', '`7 * 3`', '21'],
        ['Division', '`/`', '`7 / 2`', '3.5 (in Pseudocode)'], ['Ganzzahl-Division', '`DIV`', '`7 DIV 2`', '3'], ['Rest (Modulo)', '`MOD` (meist `%`)', '`7 MOD 2`', '1']
      ], 'Rechnen', '**Punkt vor Strich** gilt wie in der Mathematik: `2 + 3 * 4` ergibt 14, nicht 20. Mit Klammern bestimmst du die Reihenfolge selbst: `(2 + 3) * 4` ergibt 20.'),
      A.text('Rest und Ganzzahl-Division', 'Teilst du 17 Äpfel auf 5 Kinder, bekommt jedes `17 DIV 5 = 3` Äpfel, und es bleiben `17 MOD 5 = 2` übrig. Der **Rest** (Modulo) ist erstaunlich nützlich: Mit `zahl MOD 2` erkennst du gerade (Rest 0) und ungerade Zahlen (Rest 1), und mit `MOD 60` rechnest du Uhrzeiten.'),
      A.table(['Vergleich', 'Bedeutung', 'Beispiel', 'Ergebnis'], [
        ['`=` (meist `==`)', 'gleich', '`5 = 5`', 'WAHR'], ['`!=`', 'ungleich', '`5 != 5`', 'FALSCH'], ['`<` `>`', 'kleiner, größer', '`3 < 5`', 'WAHR'], ['`<=` `>=`', 'kleiner/größer oder gleich', '`5 <= 4`', 'FALSCH']
      ], 'Vergleichen', 'Ein Vergleich liefert immer einen **Wahrheitswert**: WAHR oder FALSCH. Genau damit entscheiden später Bedingungen und Schleifen, wie es weitergeht.'),
      A.table(['A', 'B', 'A UND B', 'A ODER B', 'NICHT A'], [['WAHR', 'WAHR', 'WAHR', 'WAHR', 'FALSCH'], ['WAHR', 'FALSCH', 'FALSCH', 'WAHR', 'FALSCH'], ['FALSCH', 'WAHR', 'FALSCH', 'WAHR', 'WAHR'], ['FALSCH', 'FALSCH', 'FALSCH', 'FALSCH', 'WAHR']], 'Verknüpfen: UND, ODER, NICHT', '`UND` ist nur WAHR, wenn **beides** stimmt. `ODER` ist WAHR, wenn **mindestens eines** stimmt. `NICHT` dreht um. Beispiel: „Eintritt frei, wenn (jünger als 6) **ODER** (Rentner **UND** Ausweis dabei)“. Die Klammern zeigen, was zusammengehört: Ein Rentner ohne Ausweis zahlt, ein Kind nie. Ohne Klammern gilt UND vor ODER, wie Punkt vor Strich.')
    ],
    pseudo: [A.pseudo('minuten <- 135\nstunden <- minuten DIV 60\nrest <- minuten MOD 60\nAUSGABE minuten, "Minuten sind", stunden, "Stunden und", rest, "Minuten"', '135 Minuten umrechnen', 'DIV liefert die ganzen Stunden, MOD den Rest. Merke dir dieses Muster, du brauchst es immer wieder.')],
    pitfalls: [
      A.warn('In **Java, C, C++ und C#** rechnet `7 / 2` mit zwei ganzen Zahlen **ganzzahlig** und ergibt `3`. Die Nachkommastellen fallen weg! Willst du 3.5, muss mindestens eine Zahl eine Kommazahl sein (`7 / 2.0`). In Python und JavaScript ergibt `7 / 2` dagegen 3.5.'),
      A.warn('**Kommazahlen sind ungenau**: `0.1 + 0.2` ergibt in fast allen Sprachen `0.30000000000000004`. Das liegt an der Art, wie Computer Zahlen speichern, und ist kein Fehler deines Programms. Vergleiche Kommazahlen darum nie auf exakte Gleichheit.')
    ],
    quiz: [
      A.q('Was ergibt `17 MOD 5`?', ['3', '2', '3.4', '12'], 1, '17 geteilt durch 5 ist 3 Rest 2. MOD liefert den Rest, also 2.'),
      A.q('`x` ist 5. Was ergibt `(x > 3) UND (x < 5)`?', ['WAHR', 'FALSCH'], 1, 'x > 3 ist WAHR, aber x < 5 ist FALSCH (5 ist nicht kleiner als 5). WAHR UND FALSCH ergibt FALSCH.'),
      A.q('Was ergibt `2 + 3 * 4`?', ['20', '14', '24', '9'], 1, 'Punkt vor Strich: erst 3 * 4 = 12, dann 2 + 12 = 14.')
    ],
    tasks: [
      A.predict('Was gibt das Programm aus? (Drei Werte in einer Zeile, durch Leerzeichen getrennt.)', ['a <- 7', 'b <- 2', 'AUSGABE a DIV b, a MOD b, a / b'], '3 1 3.5', 'DIV = ganze Teilungen, MOD = Rest, / = normale Division mit Nachkommastellen.'),
      A.predict('Was gibt das Programm aus?', ['zahl <- 14', 'AUSGABE zahl MOD 2 = 0'], 'WAHR', 'Eine Zahl ist gerade, wenn beim Teilen durch 2 kein Rest bleibt.')
    ]
  });

  /* ================= 4. Entscheidungen ================= */
  A.concept({
    id: 'cond', stage: 2, title: 'Entscheidungen: if und else',
    goal: 'Du kannst ein Programm je nach Situation unterschiedliche Wege gehen lassen.',
    idea: [
      A.text('Wenn … dann … sonst …', 'Im Alltag entscheidest du ständig: **Wenn** es regnet, **dann** nimm den Schirm, **sonst** nicht. Ein Programm macht dasselbe mit einer **Bedingung**: einer Frage, die nur mit WAHR oder FALSCH beantwortet wird. Ist sie WAHR, läuft ein Block von Anweisungen, sonst läuft der andere (oder keiner).'),
      A.text('Mehrere Möglichkeiten', 'Mit **„sonst wenn“** hängst du weitere Fragen an. Das Programm prüft **von oben nach unten** und nimmt den **ersten** Zweig, dessen Bedingung stimmt. Alle weiteren Zweige werden dann **übersprungen**. Darum ist die Reihenfolge wichtig, und der letzte „sonst“-Zweig fängt alles auf, was übrig bleibt.'),
      A.info('Jeder Zweig ist ein **Block**: eine Gruppe von Anweisungen, die zusammengehören. Wie man den Block markiert (Einrückung, geschweifte Klammern, END IF), unterscheidet sich je nach Sprache. Die Idee ist immer dieselbe.')
    ],
    pseudo: [A.pseudo('punkte <- 72\nWENN punkte >= 90 DANN\n  note <- "sehr gut"\nSONST WENN punkte >= 75 DANN\n  note <- "gut"\nSONST WENN punkte >= 50 DANN\n  note <- "bestanden"\nSONST\n  note <- "durchgefallen"\nENDE WENN\nAUSGABE "Ergebnis:", note', 'Ein Notenschlüssel', 'Beobachte: Für 72 Punkte werden die ersten beiden Bedingungen FALSCH, die dritte WAHR. Danach springt das Programm direkt hinter ENDE WENN. Ändere probehalber punkte in der Spielwiese.')],
    pitfalls: [
      A.warn('**Reihenfolge der Prüfungen.** Würdest du `punkte >= 50` zuerst prüfen, bekäme **jeder** ab 50 Punkten „bestanden“, auch 95 Punkte, weil der erste passende Zweig gewinnt. Prüfe immer vom Engsten zum Weitesten.'),
      A.warn('**Randwerte**: Gehört die 50 noch zu „bestanden“ oder nicht? Der Unterschied zwischen `>` und `>=` entscheidet. Teste deine Bedingungen bewusst mit den Grenzwerten.'),
      A.warn('Vergleichen heißt in den meisten Sprachen `==` (zwei Gleichheitszeichen). Ein einzelnes `=` weist etwas zu.')
    ],
    quiz: [
      A.q('In einer Kette aus „wenn / sonst wenn / sonst“ ist die erste Bedingung WAHR. Was passiert mit den restlichen Zweigen?', ['Sie werden übersprungen', 'Sie werden auch geprüft und ausgeführt, wenn sie stimmen', 'Das Programm bricht ab', 'Sie werden in zufälliger Reihenfolge ausgeführt'], 0, 'Es wird immer nur **ein** Zweig der Kette ausgeführt: der erste, dessen Bedingung stimmt.'),
      A.q('`alter` ist 18. Welche Bedingung ist WAHR?', ['alter > 18', 'alter >= 18', 'alter < 18', 'alter != 18'], 1, '18 ist nicht größer als 18, aber größer-oder-gleich 18. Bei Grenzwerten immer genau hinsehen.')
    ],
    tasks: [
      A.predict('Was wird ausgegeben?', ['x <- 10', 'WENN x > 5 UND x < 8 DANN', '  AUSGABE "A"', 'SONST WENN x > 5 DANN', '  AUSGABE "B"', 'SONST', '  AUSGABE "C"', 'ENDE WENN'], 'B', 'Bei UND müssen beide Vergleiche stimmen. Prüfe jeden Vergleich einzeln mit dem Wert von x, bevor du dich für einen Zweig entscheidest.'),
      A.predict('Was wird ausgegeben?', ['n <- 4', 'WENN n MOD 2 = 0 DANN', '  AUSGABE "gerade"', 'SONST', '  AUSGABE "ungerade"', 'ENDE WENN', 'AUSGABE "fertig"'], 'gerade\nfertig', 'Prüfe, welcher Zweig läuft. Danach geht das Programm ganz normal mit der nächsten Zeile nach dem Block weiter.')
    ]
  });

  /* ================= 5. Schleifen ================= */
  A.concept({
    id: 'loops', stage: 2, title: 'Schleifen: Dinge wiederholen',
    goal: 'Du kannst Anweisungen automatisch wiederholen lassen, mit Zähler oder mit Bedingung.',
    idea: [
      A.text('Warum Schleifen?', 'Stell dir vor, du sollst die Zahlen von 1 bis 1000 ausgeben. Du schreibst nicht 1000 Zeilen, sondern sagst dem Computer: **„Wiederhole das, bis du fertig bist.“** Eine **Schleife** führt einen Block immer wieder aus. Das ist neben Variablen und Bedingungen der dritte große Baustein jedes Programms.'),
      A.text('Zwei Arten', '- **Zählschleife** (`for`, bei Pseudocode `FÜR`): Du weißt vorher, **wie oft** es laufen soll, z. B. „für i von 1 bis 10“.\n- **Bedingungsschleife** (`while`, `SOLANGE`): Du weißt nur, **bis wann**: „solange der Akku nicht voll ist, weiterladen“. Die Bedingung wird **vor jedem Durchlauf** geprüft.'),
      A.text('Das Akkumulator-Muster', 'Sehr häufig willst du in einer Schleife etwas **aufsammeln**: eine Summe, einen Zähler, das Maximum. Dazu legst du **vor** der Schleife eine Variable an (z. B. `summe <- 0`) und veränderst sie **in** der Schleife (`summe <- summe + i`). Danach enthält sie das Gesamtergebnis.')
    ],
    pseudo: [
      A.pseudo('summe <- 0\nFÜR i VON 1 BIS 5\n  summe <- summe + i\nENDE FÜR\nAUSGABE "Summe 1 bis 5:", summe', 'Zählschleife: 1 + 2 + 3 + 4 + 5', 'Achte auf die gelb markierten Felder: `i` zählt hoch, `summe` wächst in jedem Durchlauf um den aktuellen Wert von `i`.'),
      A.pseudo('betrag <- 1\ntage <- 0\nSOLANGE betrag < 100\n  betrag <- betrag * 2\n  tage <- tage + 1\nENDE SOLANGE\nAUSGABE "Nach", tage, "Tagen sind es", betrag', 'Bedingungsschleife: verdoppeln bis 100', 'Hier weiß man vorher nicht, wie oft die Schleife läuft. Bei jedem Schritt wird zuerst die Bedingung geprüft.')
    ],
    pitfalls: [
      A.warn('**Endlosschleife**: Wird die Bedingung nie FALSCH (z. B. weil du vergessen hast, den Zähler zu erhöhen), läuft das Programm ewig. Frage dich bei jeder `while`-Schleife: „Was sorgt dafür, dass sie irgendwann endet?“'),
      A.warn('**Um-eins-daneben-Fehler** (off-by-one): Läuft die Schleife von 0 bis 9 oder von 1 bis 10? Gehören Anfang und Ende dazu? Das ist der häufigste Schleifenfehler. Prüfe Anfang und Ende immer mit einem kleinen Beispiel.'),
      A.warn('Vergiss nicht, die Variable **vor** der Schleife auf einen Startwert zu setzen (z. B. `summe = 0`), sonst rechnest du mit Müll oder bekommst einen Fehler.')
    ],
    quiz: [
      A.q('Wie oft läuft `FÜR i VON 1 BIS 5`?', ['4-mal', '5-mal', '6-mal', 'unendlich oft'], 1, 'Von 1 bis 5 einschließlich sind es die Zahlen 1, 2, 3, 4, 5, also 5 Durchläufe.'),
      A.q('Wann ist eine Schleife besser mit **Bedingung** (while) als mit Zähler (for) gelöst?', ['Wenn du nicht vorher weißt, wie oft sie laufen muss', 'Wenn du genau 10 Wiederholungen willst', 'Wenn die Schleife eine Liste von vorn bis hinten durchlaufen soll', 'Nie, eine while-Schleife ist immer langsamer'], 0, 'Eine Bedingungsschleife passt, wenn nur das **Ende** bekannt ist (z. B. „bis der Benutzer q eingibt“).')
    ],
    tasks: [
      A.predict('Was wird ausgegeben? (Eine Zahl pro Zeile.)', ['FÜR i VON 1 BIS 4', '  AUSGABE i * i', 'ENDE FÜR'], '1\n4\n9\n16', 'Schreib dir für jeden Durchlauf den Wert von i auf und rechne aus, was in dieser Runde ausgegeben wird.'),
      A.predict('Was wird ausgegeben?', ['n <- 10', 'SOLANGE n > 0', '  n <- n - 3', 'ENDE SOLANGE', 'AUSGABE n'], '-2', 'Die Bedingung wird vor jedem Durchlauf geprüft. Ausgegeben wird erst nach der Schleife, also der Wert, bei dem sie aufgehört hat.')
    ]
  });

  /* ================= 6. Funktionen ================= */
  A.concept({
    id: 'funcs', stage: 2, title: 'Funktionen: Code wiederverwenden',
    goal: 'Du kannst eigene Funktionen schreiben und aufrufen und verstehst Parameter und Rückgabewert.',
    idea: [
      A.text('Eine Funktion ist ein benanntes Rezept', 'Wenn du denselben Ablauf mehrmals brauchst, schreibst du ihn **einmal** auf, gibst ihm einen **Namen** und rufst ihn danach nur noch über den Namen auf. Das ist eine **Funktion**. Sie macht Programme kürzer, lesbarer und leichter zu ändern, denn eine Verbesserung musst du nur an einer Stelle machen.'),
      A.text('Parameter und Rückgabewert', 'Eine Funktion ist wie ein kleiner Automat:\n- **Parameter** sind die Zutaten, die du beim Aufruf hineingibst (`quadrat(7)`, hier ist 7 das **Argument**).\n- Der **Rückgabewert** ist das Ergebnis, das herauskommt. Mit `GIB ZURÜCK` (`return`) endet die Funktion und liefert den Wert an die Stelle des Aufrufs.'),
      A.text('Lokale Variablen', 'Variablen, die **in** einer Funktion entstehen, gibt es nur **dort** (lokal). Nach dem Ende der Funktion sind sie weg. Das schützt vor Verwechslungen: Zwei Funktionen dürfen beide eine Variable `ergebnis` haben, ohne sich zu stören.'),
      A.info('**Ausgeben ist nicht Zurückgeben.** `AUSGABE` zeigt etwas auf dem Bildschirm, `GIB ZURÜCK` liefert einen Wert an das aufrufende Programm. Nur zurückgegebene Werte kannst du weiterverwenden, z. B. `x <- quadrat(3) + 1`.')
    ],
    pseudo: [
      A.pseudo('FUNKTION maximum(a, b)\n  WENN a > b DANN\n    GIB ZURÜCK a\n  ENDE WENN\n  GIB ZURÜCK b\nENDE FUNKTION\n\nx <- maximum(4, 9)\nAUSGABE "Das Größere ist", x', 'Funktion mit Parametern und Rückgabe', 'Beim Aufruf springt der Ablauf in die Funktion. Rechts siehst du dann eine eigene Variablentabelle für die Funktion mit den Parametern a und b. Mit GIB ZURÜCK geht es zurück.'),
      A.pseudo('FUNKTION quadrat(n)\n  GIB ZURÜCK n * n\nENDE FUNKTION\n\nsumme <- 0\nFÜR i VON 1 BIS 3\n  summe <- summe + quadrat(i)\nENDE FÜR\nAUSGABE summe', 'Eine Funktion in einer Schleife aufrufen', 'Die Funktion wird dreimal mit verschiedenen Argumenten aufgerufen. Der Wert 1 + 4 + 9 wird aufgesammelt.')
    ],
    pitfalls: [
      A.warn('Die Funktion **definieren** führt sie noch nicht aus. Erst der **Aufruf** (`quadrat(3)`) lässt sie laufen.'),
      A.warn('Vergisst du das `return`, liefert die Funktion in vielen Sprachen nichts (Python: `None`, JavaScript: `undefined`). Dann rechnest du mit „nichts“.'),
      A.warn('Anzahl und Reihenfolge der Argumente müssen zu den Parametern passen. `teile(10, 2)` und `teile(2, 10)` sind zwei verschiedene Rechnungen.')
    ],
    quiz: [
      A.q('Was ist der Unterschied zwischen **Parameter** und **Rückgabewert**?', ['Parameter gehen in die Funktion hinein, der Rückgabewert kommt heraus', 'Parameter kommen aus der Funktion heraus, der Rückgabewert geht hinein', 'Parameter sind nur für Text, Rückgabewerte nur für Zahlen', 'Beide bedeuten dasselbe, es sind nur zwei Namen'], 0, 'Parameter sind die Eingaben, der Rückgabewert ist das Ergebnis.'),
      A.q('Was bewirkt `GIB ZURÜCK` / `return`?', ['Die Funktion endet und liefert einen Wert an den Aufrufer', 'Der Wert wird auf dem Bildschirm ausgegeben, die Funktion läuft weiter', 'Das gesamte Programm wird an dieser Stelle beendet', 'Die Funktion springt zurück an ihren Anfang'], 0, 'Ausgabe auf dem Bildschirm ist etwas anderes. return liefert den Wert **zurück** an die Stelle, von der aus aufgerufen wurde.')
    ],
    tasks: [
      A.predict('Was wird ausgegeben?', ['FUNKTION doppelt(n)', '  GIB ZURÜCK n * 2', 'ENDE FUNKTION', 'AUSGABE doppelt(doppelt(3))'], '12', 'Bei verschachtelten Aufrufen wird der innere zuerst ausgerechnet. Sein Ergebnis ist das Argument für den äußeren.'),
      A.predict('Was wird ausgegeben?', ['FUNKTION begruessung(name)', '  GIB ZURÜCK "Hallo " + name', 'ENDE FUNKTION', 'text <- begruessung("Ada")', 'AUSGABE text'], 'Hallo Ada', 'Die Funktion gibt den zusammengesetzten Text zurück, `text` speichert ihn, und AUSGABE zeigt ihn an.')
    ]
  });

  /* ================= 7. Sammlungen ================= */
  A.concept({
    id: 'coll', stage: 3, title: 'Listen, Arrays und Texte',
    goal: 'Du kannst viele Werte in einer Sammlung speichern, auf einzelne Werte zugreifen und alle durchlaufen.',
    idea: [
      A.text('Viele Werte, ein Name', 'Fünf Noten in fünf Variablen `note1` bis `note5` zu speichern, wäre mühsam. Eine **Liste** (auch **Array** oder **Feld**) speichert viele Werte **geordnet unter einem Namen**: `noten = [2, 1, 3, 2, 5]`. Man stellt sie sich als Reihe nummerierter Fächer vor.'),
      A.text('Der Index beginnt bei 0', 'Jedes Fach hat eine Nummer, den **Index**. Wichtig: Gezählt wird **ab 0**. Das erste Element hat den Index 0, das letzte bei 5 Elementen den Index 4 (also **Länge minus 1**). Das ist ungewohnt, gilt aber in praktisch allen Sprachen (außer SQL und einigen Spezialfällen).'),
      A.text('Alle Elemente durchlaufen', 'Listen und Schleifen sind ein perfektes Paar: Mit einer Schleife besuchst du jedes Element einmal (Summe, Durchschnitt, Maximum, Suchen). Die meisten Sprachen haben dafür eine eigene „für jedes Element“-Schleife (`for … in`, `foreach`).'),
      A.text('Texte sind auch Sammlungen', 'Ein **Text (String)** ist eine Folge einzelner Zeichen. Auch dort gibt es Länge und Index: `"Hallo"` hat 5 Zeichen, das erste (`H`) steht bei Index 0.')
    ],
    pseudo: [
      A.pseudo('noten <- [2, 1, 3, 2, 5]\nsumme <- 0\nFÜR JEDES n IN noten\n  summe <- summe + n\nENDE FÜR\ndurchschnitt <- summe / LÄNGE(noten)\nAUSGABE "Durchschnitt:", durchschnitt', 'Durchschnitt einer Liste', 'Die Schleife besucht jedes Element. In der Variablentabelle siehst du, wie die Liste unverändert bleibt und `summe` wächst.'),
      A.pseudo('zahlen <- [3, 9, 2, 7]\nhoechste <- zahlen[0]\nFÜR JEDES z IN zahlen\n  WENN z > hoechste DANN\n    hoechste <- z\n  ENDE WENN\nENDE FÜR\nAUSGABE "Maximum:", hoechste', 'Das größte Element finden', 'Das Standardverfahren: Merke dir das bisher größte Element und ersetze es, sobald du ein größeres siehst. Starte mit dem ersten Element.')
    ],
    pitfalls: [
      A.warn('**Index außerhalb**: Bei 5 Elementen gibt es die Indizes 0 bis 4. Ein Zugriff auf Index 5 ist ein Fehler (oder in C: Zugriff auf fremden Speicher!).'),
      A.warn('Liste **leer?** Das Maximum einer leeren Liste gibt es nicht. Prüfe vorher mit der Länge, ob überhaupt etwas drinsteckt.'),
      A.warn('Beim Kopieren einer Liste (`b = a`) bekommst du in vielen Sprachen **nicht** eine zweite Liste, sondern nur einen zweiten Namen für dieselbe. Änderungen über `b` ändern dann auch `a`.')
    ],
    quiz: [
      A.q('Eine Liste hat 5 Elemente. Welcher Index gehört zum **letzten**?', ['5', '4', '6', '1'], 1, 'Gezählt wird ab 0: 0, 1, 2, 3, 4. Das letzte Element hat immer den Index Länge − 1.'),
      A.q('Was bedeutet `liste[0]`?', ['Das erste Element der Liste', 'Die Länge der Liste', 'Das letzte Element der Liste', 'Eine leere Liste'], 0, 'Der Index 0 steht für das erste Element.')
    ],
    tasks: [
      A.predict('Was gibt das Programm aus? (Drei Werte in einer Zeile.)', ['l <- [10, 20, 30]', 'AUSGABE l[0], l[2], LÄNGE(l)'], '10 30 3', 'l[0] ist das erste, l[2] das dritte (und letzte) Element, LÄNGE zählt die Elemente.'),
      A.predict('Was wird ausgegeben?', ['preise <- [4, 8, 15]', 'preise[1] <- 20', 'AUSGABE preise'], '[4, 20, 15]', 'Der Index beginnt bei 0. Welches Element wird also überschrieben?')
    ]
  });

  /* ================= 8. Klassen und Objekte ================= */
  A.concept({
    id: 'oop', stage: 3, title: 'Klassen und Objekte',
    goal: 'Du verstehst die Idee der Objektorientierung und kannst eine einfache Klasse mit Attributen und Methoden schreiben.',
    idea: [
      A.text('Bauplan und Exemplar', 'Eine **Klasse** ist ein **Bauplan**, ein **Objekt** ein einzelnes **Exemplar**, das nach diesem Plan gebaut wurde. Aus dem Bauplan „Hund“ entstehen viele konkrete Hunde: „Bello“, „Luna“, „Rex“. Alle haben dieselben Eigenschaften (Name, Alter), aber **jeder mit eigenen Werten**.'),
      A.table(['Begriff', 'Bedeutung', 'Beispiel'], [
        ['Klasse', 'Bauplan', '`Hund`'], ['Objekt / Instanz', 'ein konkretes Exemplar', 'der Hund „Bello“'],
        ['Attribut (Eigenschaft)', 'Daten, die ein Objekt speichert', '`name`, `alter`'], ['Methode', 'Funktion, die zum Objekt gehört (Verhalten)', '`bellen()`'],
        ['Konstruktor', 'Spezialmethode, die ein neues Objekt anlegt und startet', 'beim Anlegen den Namen setzen']
      ], 'Die Begriffe', 'Diese Wörter verwendest du in jeder objektorientierten Sprache, nur die Schreibweise unterscheidet sich.'),
      A.text('Warum das Ganze?', 'Statt viele lose Variablen und Funktionen zu verwalten, **bündelt** ein Objekt zusammengehörige **Daten und Verhalten**. Ein `Konto`-Objekt kennt seinen Kontostand und bietet `einzahlen()` und `abheben()` an. Das ordnet größere Programme und bildet die echte Welt gut nach.'),
      A.text('Kapselung', 'Ein Objekt soll seine Daten **schützen**: Von außen darf man den Kontostand nur über die Methoden ändern (so kann `abheben()` prüfen, ob genug Geld da ist), nicht direkt überschreiben. Das nennt man **Kapselung**. Viele Sprachen haben dafür Schlüsselwörter wie `private`.')
    ],
    pseudo: [],
    pitfalls: [
      A.warn('Eine Klasse **beschreiben** und ein Objekt **erzeugen** sind zwei Schritte. Erst `Hund bello = new Hund(…)` (oder Entsprechendes) legt ein Objekt an, in dem Werte stehen.'),
      A.warn('Innerhalb einer Methode brauchst du eine Möglichkeit, auf die **eigenen** Attribute zuzugreifen (`this.` bzw. `self.`). Ohne sie ist unklar, ob du die Variable des Objekts oder eine lokale meinst.')
    ],
    quiz: [
      A.q('Was ist der Unterschied zwischen **Klasse** und **Objekt**?', ['Die Klasse ist der Bauplan, das Objekt ein konkretes Exemplar', 'Das Objekt ist der Bauplan, die Klasse ein konkretes Exemplar davon', 'Die Klasse ist ein Objekt mit besonders vielen Methoden', 'Es gibt keinen Unterschied, beide Wörter meinen dasselbe'], 0, 'Aus **einer** Klasse kannst du **beliebig viele** Objekte erzeugen, jedes mit eigenen Attributwerten.'),
      A.q('Wozu dient ein **Konstruktor**?', ['Er legt ein neues Objekt an und setzt Startwerte', 'Er räumt ein Objekt auf, wenn es nicht mehr gebraucht wird', 'Er gibt eine Klasse auf dem Bildschirm aus', 'Er vergleicht zwei Objekte'], 0, 'Der Konstruktor läuft automatisch beim Erzeugen eines Objekts und bringt es in einen sinnvollen Anfangszustand.')
    ],
    tasks: []
  });

  /* ================= 9. Fehler ================= */
  A.concept({
    id: 'err', stage: 4, title: 'Fehler verstehen und behandeln',
    goal: 'Du erkennst, welche Arten von Fehlern es gibt, liest Fehlermeldungen richtig und kannst Ausnahmen abfangen.',
    idea: [
      A.text('Drei Sorten Fehler', '- **Syntaxfehler**: Du hast gegen die Schreibregeln verstoßen (Klammer vergessen). Das Programm startet gar nicht, die Meldung nennt meist die Zeile.\n- **Laufzeitfehler**: Das Programm startet, aber bei einer Anweisung geht etwas schief (Division durch 0, Liste zu kurz, Datei fehlt). Es bricht mit einer Fehlermeldung ab.\n- **Logikfehler**: Das Programm läuft ohne Meldung, liefert aber ein **falsches Ergebnis** (z. B. `<` statt `<=`). Diese sind am schwersten zu finden.'),
      A.text('Fehlermeldungen lesen', 'Lies eine Fehlermeldung **von oben nach unten und in Ruhe**. Sie nennt fast immer **was** schiefging und **wo** (Zeile). Das Suchen im Programm geht dann viel schneller. Ein bewährter Trick gegen Logikfehler: Gib Zwischenwerte aus oder gehe das Programm wie im Ablauf-Player Schritt für Schritt durch.'),
      A.text('Ausnahmen abfangen', 'Manche Fehler lassen sich nicht vermeiden (Benutzer tippt „abc“ statt einer Zahl, Datei fehlt). Dafür gibt es **Ausnahmebehandlung**: Du sagst „**versuche** das (`try`), und **falls** ein Fehler auftritt (`catch`/`except`), mache stattdessen jenes“. So stürzt das Programm nicht ab, sondern reagiert vernünftig.')
    ],
    pseudo: [Object.assign(A.pseudo('liste <- [5, 8, 13]\nAUSGABE liste[0]\nAUSGABE liste[3]\nAUSGABE "Diese Zeile wird nie erreicht"', 'Absichtlich ein Laufzeitfehler', 'Gehe bis zum Ende. Die Liste hat nur 3 Elemente (Index 0 bis 2). Lies die rote Meldung: Sie sagt dir, was falsch war.'), { expectError: true })],
    pitfalls: [
      A.warn('Fange Ausnahmen **gezielt** ab. Ein „alles abfangen und nichts tun“ versteckt Fehler, statt sie zu lösen. Du findest sie dann nie wieder.'),
      A.tip('Teste dein Programm bewusst mit **gemeinen Eingaben**: leer, 0, negative Zahlen, sehr lange Texte. Dort verstecken sich die meisten Fehler.')
    ],
    quiz: [
      A.q('Dein Programm läuft ohne Meldung, rechnet aber falsch. Welche Fehlerart ist das?', ['Logikfehler', 'Syntaxfehler', 'Laufzeitfehler', 'Kompilierfehler'], 0, 'Der Computer hat genau getan, was du geschrieben hast, nur war es nicht das, was du meintest.'),
      A.q('Wozu dient `try … catch` (bzw. `try … except`)?', ['Um Fehler abzufangen, ohne dass das Programm abstürzt', 'Um eine Schleife bei einem Fehler zu wiederholen', 'Um Syntaxfehler schon beim Übersetzen zu finden', 'Um Code nur beim ersten Start auszuführen'], 0, 'Im try-Teil steht der riskante Code, im catch/except-Teil steht, was bei einem Fehler passiert.')
    ],
    tasks: []
  });

  /* ================= Glossar ================= */
  [
    ['Algorithmus', 'Eine eindeutige Schrittfolge, die ein Problem löst, z. B. ein Rezept oder das Verfahren zum Sortieren einer Liste.'],
    ['Anweisung', 'Ein einzelner Befehl in einem Programm, z. B. eine Ausgabe oder eine Zuweisung.'],
    ['Argument', 'Der konkrete Wert, den du beim **Aufruf** einer Funktion übergibst (`quadrat(7)`: 7 ist das Argument).'],
    ['Array', 'Eine Sammlung mit fester Größe, in der die Elemente über einen Index (ab 0) erreichbar sind. Verwandt mit der **Liste**.'],
    ['Attribut', 'Eine Eigenschaft eines Objekts, also eine Variable, die zu einer Klasse gehört (`name`, `alter`).'],
    ['Ausnahme (Exception)', 'Ein Fehlerereignis zur Laufzeit, das man mit `try`/`catch` abfangen kann.'],
    ['Bedingung', 'Ein Ausdruck, der WAHR oder FALSCH ergibt, z. B. `alter >= 18`.'],
    ['Block', 'Eine Gruppe zusammengehöriger Anweisungen, z. B. der Körper einer Schleife oder eines if-Zweigs.'],
    ['Boolean (Wahrheitswert)', 'Ein Datentyp mit nur zwei Werten: WAHR (true) und FALSCH (false).'],
    ['Compiler', 'Ein Programm, das Quellcode vor dem Start in Maschinencode übersetzt (z. B. bei C, C++, Java, C#).'],
    ['Datentyp', 'Beschreibt, welche Art von Wert eine Variable hält (ganze Zahl, Kommazahl, Text oder Wahrheitswert).'],
    ['Debugging', 'Die Suche und Beseitigung von Fehlern („Bugs“) im Programm.'],
    ['Fremdschlüssel', 'In SQL: Eine Spalte, die auf den Primärschlüssel einer anderen Tabelle verweist und so Daten verknüpft.'],
    ['Funktion', 'Ein benannter, wiederverwendbarer Codeblock, der Parameter entgegennimmt und einen Wert zurückgeben kann.'],
    ['IDE', 'Entwicklungsumgebung: ein Programm mit Editor, Ausführung und Fehlerhilfe, z. B. VS Code, IntelliJ, Visual Studio.'],
    ['Index', 'Die Nummer eines Elements in einer Liste. Sie beginnt bei 0.'],
    ['Instanz', 'Ein konkretes Objekt einer Klasse. „Instanziieren“ heißt, ein Objekt aus der Klasse zu erzeugen.'],
    ['Interpreter', 'Ein Programm, das Quellcode **zeilenweise direkt ausführt**, ohne vorher alles zu übersetzen (z. B. Python, JavaScript).'],
    ['Kapselung', 'Daten eines Objekts werden verborgen und nur über Methoden verändert. Das schützt vor ungültigen Zuständen.'],
    ['Klasse', 'Ein Bauplan für Objekte: legt Attribute und Methoden fest.'],
    ['Kommentar', 'Text im Quellcode, den der Computer ignoriert und der Menschen etwas erklärt (`//` oder `#`).'],
    ['Konstante', 'Eine Variable, deren Wert sich nach dem Setzen nicht mehr ändern darf (z. B. `PI`).'],
    ['Konstruktor', 'Spezielle Methode, die beim Erzeugen eines Objekts läuft und Anfangswerte setzt.'],
    ['Methode', 'Eine Funktion, die zu einer Klasse bzw. einem Objekt gehört.'],
    ['Operator', 'Ein Zeichen oder Wort, das eine Operation ausführt: `+`, `*`, `==`, `UND`.'],
    ['Parameter', 'Der Platzhalter in der Definition einer Funktion, der beim Aufruf einen Wert bekommt.'],
    ['Polymorphie', '„Vielgestaltigkeit“: Derselbe Methodenaufruf verhält sich je nach tatsächlichem Objekt unterschiedlich (`tier.laut()` bei Hund und Katze).'],
    ['Primärschlüssel', 'In SQL: Die Spalte (oder Spaltenkombination), die jede Zeile einer Tabelle eindeutig kennzeichnet, meist `id`.'],
    ['Pseudocode', 'Eine sprachunabhängige, menschenlesbare Beschreibung eines Algorithmus, nicht ausführbar im strengen Sinn, aber gut zum Planen.'],
    ['Quellcode', 'Der von Menschen geschriebene Programmtext.'],
    ['Referenz', 'Ein Verweis auf ein Objekt oder einen Wert im Speicher, statt einer Kopie.'],
    ['Rekursion', 'Eine Funktion ruft sich **selbst** auf, mit einem kleineren Teilproblem, bis ein einfacher Fall (Abbruchbedingung) erreicht ist.'],
    ['Rückgabewert', 'Das Ergebnis, das eine Funktion mit `return` an den Aufrufer liefert.'],
    ['Schleife', 'Wiederholt einen Block mehrmals, z. B. `for` oder `while`.'],
    ['Schnittstelle (Interface)', 'Beschreibt, **welche Methoden** eine Klasse anbieten muss, ohne zu sagen, **wie** sie arbeiten.'],
    ['Scope (Gültigkeitsbereich)', 'Der Bereich, in dem eine Variable sichtbar ist, z. B. nur innerhalb einer Funktion.'],
    ['String', 'Datentyp für Text, also eine Folge von Zeichen.'],
    ['Syntax', 'Die Schreibregeln (Grammatik) einer Programmiersprache.'],
    ['UML', 'Unified Modeling Language: eine genormte Zeichensprache für Diagramme, z. B. Klassendiagramme und Sequenzdiagramme.'],
    ['Variable', 'Ein benannter Speicherplatz für einen Wert, der sich ändern kann.'],
    ['Vererbung', 'Eine Klasse übernimmt Attribute und Methoden einer anderen und ergänzt eigene (Hund erbt von Tier).'],
    ['Zeiger (Pointer)', 'In C und C++: eine Variable, die die **Speicheradresse** einer anderen Variable enthält.'],
    ['Zuweisung', 'Das Speichern eines Werts in einer Variable, meist mit `=`.']
  ].forEach(([n, t]) => A.term(n, t));

  /* ================= Pseudocode: Kurzübersicht und Beispiele ================= */
  A.pseudoRef = [
    'x <- 5                 Zuweisung (auch ←, := oder SETZE x AUF 5)',
    'AUSGABE a, b           Ausgabe, Komma = Leerzeichen dazwischen',
    'EINGABE x              Wert einlesen (Eingaben unten ins Feld, eine pro Zeile)',
    'WENN … DANN … SONST WENN … DANN … SONST … ENDE WENN',
    'SOLANGE bedingung … ENDE SOLANGE',
    'WIEDERHOLE … BIS bedingung',
    'FÜR i VON 1 BIS 10 [SCHRITT 2] … ENDE FÜR',
    'FÜR JEDES element IN liste … ENDE FÜR',
    'FUNKTION name(a, b) … GIB ZURÜCK wert … ENDE FUNKTION',
    'Listen: [1, 2, 3]   liste[0] (Index ab 0)   LÄNGE(liste)   ANHÄNGEN(liste, wert)',
    'Rechnen: + - * /  DIV (ganzzahlig)  MOD (Rest)',
    'Vergleichen: = != < > <= >=     Verknüpfen: UND ODER NICHT',
    'Werte: 42  3.14  "Text"  WAHR  FALSCH',
    'Eingebaut: BETRAG WURZEL ABRUNDEN AUFRUNDEN RUNDEN MAX MIN TEXT ZAHL',
    'Kommentare: // … oder # …'
  ].join('\n');
  A.pseudoSamples = {
    'Summe von 1 bis 10': 'summe <- 0\nFÜR i VON 1 BIS 10\n  summe <- summe + i\nENDE FÜR\nAUSGABE "Summe:", summe',
    'Gerade oder ungerade': 'EINGABE zahl\nWENN zahl MOD 2 = 0 DANN\n  AUSGABE zahl, "ist gerade"\nSONST\n  AUSGABE zahl, "ist ungerade"\nENDE WENN',
    'Maximum einer Liste': 'zahlen <- [3, 17, 4, 9, 12]\nhoechste <- zahlen[0]\nFÜR JEDES z IN zahlen\n  WENN z > hoechste DANN\n    hoechste <- z\n  ENDE WENN\nENDE FÜR\nAUSGABE "Das Maximum ist", hoechste',
    'Primzahl prüfen': 'zahl <- 29\nist_prim <- WAHR\nteiler <- 2\nSOLANGE teiler * teiler <= zahl UND ist_prim\n  WENN zahl MOD teiler = 0 DANN\n    ist_prim <- FALSCH\n  ENDE WENN\n  teiler <- teiler + 1\nENDE SOLANGE\nAUSGABE zahl, "ist prim:", ist_prim',
    'Fakultät (Funktion)': 'FUNKTION fakultaet(n)\n  ergebnis <- 1\n  FÜR i VON 2 BIS n\n    ergebnis <- ergebnis * i\n  ENDE FÜR\n  GIB ZURÜCK ergebnis\nENDE FUNKTION\n\nAUSGABE "5! =", fakultaet(5)',
    'FizzBuzz': 'FÜR i VON 1 BIS 15\n  WENN i MOD 15 = 0 DANN\n    AUSGABE "FizzBuzz"\n  SONST WENN i MOD 3 = 0 DANN\n    AUSGABE "Fizz"\n  SONST WENN i MOD 5 = 0 DANN\n    AUSGABE "Buzz"\n  SONST\n    AUSGABE i\n  ENDE WENN\nENDE FÜR',
    'Größter gemeinsamer Teiler (Euklid)': 'a <- 48\nb <- 18\nSOLANGE b != 0\n  rest <- a MOD b\n  a <- b\n  b <- rest\nENDE SOLANGE\nAUSGABE "ggT:", a'
  };
  A.jsSample = '// Probiere etwas aus. Mit console.log(...) gibst du etwas aus.\nconst namen = ["Ada", "Alan", "Grace"];\nfor (const name of namen) {\n  console.log("Hallo " + name + "!");\n}\n';

  /* ================= UML-Beispiele für die Werkstatt ================= */
  A.umlSamples = {
    'Tiere (Vererbung)': 'klasse Tier abstrakt\n  # name: String\n  + essen(): void\n  + laut(): String\nklasse Hund\n  + bellen(): void\nklasse Katze\n  + miauen(): void\nHund --|> Tier\nKatze --|> Tier',
    'Bibliothek': 'klasse Bibliothek\n  - name: String\n  + buchHinzufuegen(b: Buch): void\nklasse Buch\n  - titel: String\n  - isbn: String\n  + ausleihen(): void\nklasse Leser\n  - name: String\n  + leihen(b: Buch): void\nBibliothek "1" *-- "*" Buch : besitzt\nLeser "*" --> "*" Buch : leiht aus',
    'Zahlung (Schnittstelle)': 'schnittstelle Zahlungsart\n  + bezahlen(betrag: double): boolean\nklasse Kreditkarte\n  - nummer: String\n  + bezahlen(betrag: double): boolean\nklasse PayPal\n  - mail: String\n  + bezahlen(betrag: double): boolean\nklasse Warenkorb\n  + kasse(z: Zahlungsart): void\nKreditkarte ..|> Zahlungsart\nPayPal ..|> Zahlungsart\nWarenkorb ..> Zahlungsart : nutzt'
  };

  /* ================= SQL: Beispieldatenbank ================= */
  A.sqlSetup = `
CREATE TABLE kunde (id INTEGER PRIMARY KEY, name TEXT NOT NULL, stadt TEXT, geburtsjahr INTEGER);
CREATE TABLE produkt (id INTEGER PRIMARY KEY, name TEXT NOT NULL, kategorie TEXT, preis REAL);
CREATE TABLE bestellung (id INTEGER PRIMARY KEY, kunde_id INTEGER REFERENCES kunde(id), produkt_id INTEGER REFERENCES produkt(id), menge INTEGER, datum TEXT);
INSERT INTO kunde VALUES (1,'Anna Berger','Berlin',1990),(2,'Ben Koch','Hamburg',1985),(3,'Clara Weiss','Berlin',2001),(4,'David Roth','München',1978),(5,'Eva Lang','Köln',1995),(6,'Felix Maurer','Hamburg',1999),(7,'Gina Rossi','Berlin',1988),(8,'Hans Jung',NULL,1972);
INSERT INTO produkt VALUES (1,'Laptop','Computer',899.0),(2,'Maus','Zubehör',19.9),(3,'Tastatur','Zubehör',49.5),(4,'Monitor','Computer',229.0),(5,'USB-Stick','Zubehör',9.99),(6,'Webcam','Zubehör',39.0),(7,'Tablet','Computer',329.0),(8,'Kopfhörer','Audio',79.0);
INSERT INTO bestellung VALUES (1,1,1,1,'2024-01-10'),(2,1,2,2,'2024-01-10'),(3,2,4,1,'2024-02-03'),(4,3,3,1,'2024-02-14'),(5,3,5,3,'2024-02-14'),(6,4,1,1,'2024-03-01'),(7,5,8,2,'2024-03-09'),(8,6,2,1,'2024-03-15'),(9,7,7,1,'2024-04-02'),(10,1,6,1,'2024-04-20'),(11,2,2,4,'2024-05-05'),(12,5,3,2,'2024-05-11'),(13,7,5,10,'2024-05-30'),(14,3,8,1,'2024-06-12');`;
})();
