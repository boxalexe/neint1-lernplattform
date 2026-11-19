/* Kurs: Pseudocode und Algorithmen */
(function () {
  'use strict';
  const A = window.Academy, C = (lines, h, o) => A.code('pseudo', lines, h, o);

  A.track({
    id: 'pseudo', title: 'Pseudocode und Algorithmen', tag: 'START HIER',
    desc: 'Denken in Schritten, ganz ohne Sprachregeln: Variablen, Entscheidungen, Schleifen und Funktionen als Pseudocode, den du Schritt für Schritt ablaufen lassen kannst.',
    intro: 'Pseudocode ist die Brücke zwischen einer Idee und einem Programm. Du schreibst auf, **was** passieren soll, ohne dich um Klammern und Semikolons zu kümmern. In diesem Kurs verwendest du einen kleinen deutschen Pseudocode, den die App tatsächlich **ausführen** kann. So siehst du bei jedem Beispiel genau, wie sich die Variablen verändern.',
    lessons: [
      {
        id: 'algo', stage: 1, title: 'Was ist ein Algorithmus?', goal: 'Du weißt, was ein Algorithmus ist, wozu Pseudocode dient und wie du ein erstes Beispiel liest.',
        parts: [
          A.text('Ein Rezept ist ein Algorithmus', 'Ein **Algorithmus** ist eine Schrittfolge, die ein Problem löst. Das bekannteste Beispiel ist ein Rezept:\n\n1. Wasser aufkochen.\n2. Teebeutel in die Tasse legen.\n3. Heißes Wasser in die Tasse gießen.\n4. Drei Minuten warten.\n5. Teebeutel entfernen.\n\nJeder Schritt ist klar, die Reihenfolge ist festgelegt, und nach endlich vielen Schritten ist man fertig. Genau das erwartet man auch von einem Algorithmus in der Informatik.'),
          A.table(['Eigenschaft', 'Bedeutung'], [['eindeutig', 'Jeder Schritt ist klar beschrieben, nichts bleibt dem Zufall oder Raten überlassen'], ['endlich', 'Der Ablauf hört nach endlich vielen Schritten auf (keine Endlosschleife)'], ['ausführbar', 'Jeder Schritt lässt sich wirklich durchführen'], ['allgemein', 'Er löst eine ganze **Klasse** von Problemen, nicht nur einen Einzelfall (jede Zahl, nicht nur 5)']], 'Die Eigenschaften'),
          A.text('Warum Pseudocode?', 'Jede Programmiersprache hat eigene Schreibregeln. **Pseudocode** beschreibt dieselbe Idee **ohne** diese Regeln, in lesbarer Form. Man benutzt ihn zum Planen, zum Besprechen mit anderen und in Prüfungen. Hat man die Idee als Pseudocode, ist die Übersetzung in Python, Java oder C# nur noch Handarbeit.'),
          C(['netto <- 100§Speichert den Wert 100 in der Variable netto.', 'steuersatz <- 0.19§Speichert den Steuersatz als Kommazahl (19 % = 0.19, mit Punkt geschrieben).', 'brutto <- netto * (1 + steuersatz)§Rechnet 100 * 1.19 aus und speichert das Ergebnis in brutto.', 'AUSGABE "Bruttopreis:", brutto§Gibt Text und Wert aus. Das Komma setzt ein Leerzeichen dazwischen.'], 'Dein erster Algorithmus: Bruttopreis berechnen'),
          A.info('Klicke bei dem Beispiel auf **Ablauf verfolgen**, um es Schritt für Schritt ausführen zu lassen, und auf **Schritt für Schritt**, um jede Zeile erklärt zu bekommen. Beides gibt es in allen Lektionen.'),
          A.tip('Für Pseudocode gibt es keine feste Norm. Dieser Kurs schreibt meist `<-` und `AUSGABE`, in Prüfungen und im Nachschlagewerk der Layer 8 Academy steht oft `SETZE`, `SCHREIBE` und `LIES`. Gemeint ist dasselbe, und der Player versteht beide Schreibweisen. Wichtig ist nur, dass du innerhalb einer Lösung bei einer Schreibweise bleibst.'),
          A.table(['Bedeutung', 'In diesem Kurs', 'Ebenso üblich (und hier ebenfalls erlaubt)'], [['Zuweisung', '`x <- 5`', '`SETZE x = 5`, `SETZE x AUF 5`, `x := 5`, `x ← 5`'], ['Ausgabe', '`AUSGABE x`', '`SCHREIBE x`'], ['Eingabe', '`EINGABE x`', '`LIES x`'], ['Rahmen', '`ALGORITHMUS Name`', '`START` am Anfang und `ENDE` am Schluss'], ['Kopfgesteuerte Schleife', '`SOLANGE i <= 3` ... `ENDE SOLANGE`', '`SOLANGE i <= 3 WIEDERHOLE` ... `ENDE SOLANGE`'], ['Zählschleife', '`FÜR i VON 1 BIS 10` ... `ENDE FÜR`', '`FÜR i VON 1 BIS 10 WIEDERHOLE` ... `ENDE FÜR`'], ['Funktion', '`FUNKTION f(a)` ... `GIB ZURÜCK a` ... `ENDE FUNKTION`', '`METHODE f(a)` ... `RÜCKGABE a` ... `ENDE METHODE`']], 'Zwei Schreibweisen, eine Bedeutung')
        ],
        quiz: [A.q('Welche dieser Eigenschaften gehört **nicht** zu einem Algorithmus?', ['Er darf mehrdeutige Schritte enthalten', 'Er ist endlich', 'Er ist eindeutig', 'Er löst ein Problem schrittweise'], 0, 'Ein Algorithmus muss eindeutig sein. Ein Schritt wie „mach das irgendwie“ ist kein Algorithmus.'), A.q('Wozu dient Pseudocode vor allem?', ['Um Abläufe unabhängig von einer Sprache zu beschreiben', 'Um Programme schneller laufen zu lassen', 'Um Programme zu verschlüsseln', 'Um Fehler automatisch zu beheben'], 0, 'Pseudocode beschreibt die Idee. Die Umsetzung in eine konkrete Sprache folgt danach.')],
        tasks: [A.predict('Was gibt das Programm aus?', ['netto <- 200', 'AUSGABE netto * 1.5'], '300', 'Erst wird gerechnet (200 mal 1,5), dann ausgegeben.')]
      },
      {
        concept: 'hello', title: 'Ausgabe und Aufbau', noIdea: false,
        parts: [
          C(['// Das ist ein Kommentar: der Computer ignoriert ihn§Alles hinter // (oder #) ist eine Notiz für Menschen.', 'AUSGABE "Hallo Welt"§Gibt den Text in Anführungszeichen aus. Text steht immer in Anführungszeichen.', 'AUSGABE 2 + 3§Rechnet zuerst und gibt das Ergebnis 5 aus. Zahlen brauchen keine Anführungszeichen.', 'AUSGABE "Summe:", 2 + 3§Mehrere Dinge trennst du mit Komma. In der Ausgabe steht ein Leerzeichen dazwischen.'], 'Ausgabe mit AUSGABE'),
          A.text('Aufbau eines Programms', 'Jede Zeile ist eine **Anweisung**. Eine Anweisung steht allein in einer Zeile. Die Zeilen werden von oben nach unten ausgeführt. Kommentare helfen dir und anderen später beim Verstehen. Schreibe sie, wenn du **warum** etwas passiert erklären willst, nicht was (das sieht man ja).')
        ],
        tasks: [A.fill('Setze die fehlenden Teile ein, damit „Hallo Ada“ ausgegeben wird.', 'AUSGABE {{"Hallo"}}, "Ada"', 'Text steht in Anführungszeichen. Das Komma erzeugt das Leerzeichen.')]
      },
      {
        concept: 'vars', title: 'Variablen und Zuweisung',
        parts: [
          C(['alter <- 25§Legt die Variable alter an und speichert die Zahl 25. Der Pfeil bedeutet: „lege den Wert rechts in die Variable links“.', 'name <- "Ada"§Eine Variable mit Text. Der Typ ergibt sich aus dem Wert.', 'istStudent <- WAHR§Ein Wahrheitswert: WAHR oder FALSCH, ohne Anführungszeichen.', 'alter <- alter + 1§Rechts wird zuerst gerechnet (25 + 1 = 26), dann wird das Ergebnis wieder in alter gelegt.', 'AUSGABE name, "ist", alter§Liest die Variablen und gibt ihre aktuellen Werte aus: Ada ist 26.'], 'Variablen anlegen und ändern')
        ],
        quiz: [A.q('Welchen Wert hat `x` nach `x <- 5` und `x <- x * 2`?', ['10', '5', '25', '2'], 0, 'Erst steht 5 in x. Dann wird 5 * 2 = 10 berechnet und in x gespeichert.')],
        tasks: [A.fill('Ergänze, damit `summe` am Ende 8 enthält.', 'summe <- 5\nsumme <- summe {{+}} 3', 'Du willst zum alten Wert etwas hinzuzählen.')]
      },
      {
        concept: 'ops', title: 'Rechnen und Vergleichen',
        parts: [
          C(['rest <- 17 MOD 5§MOD liefert den Rest der Division: 17 geteilt durch 5 ist 3 Rest 2.', 'ganz <- 17 DIV 5§DIV liefert nur den ganzzahligen Teil: 3.', 'genau <- 17 / 5§Normale Division mit Nachkommastellen: 3.4.', 'ok <- 17 > 10§Ein Vergleich ergibt einen Wahrheitswert. Hier WAHR.', 'beides <- ok UND rest = 2§UND ist nur WAHR, wenn beide Seiten WAHR sind. Das einzelne = vergleicht hier auf Gleichheit.', 'AUSGABE rest, ganz, genau, beides§Gibt alle vier Werte aus: 2 3 3.4 WAHR.'], 'Rechnen und Vergleichen')
        ],
        tasks: [A.fill('Ergänze den Operator für „Rest der Division“.', 'ungerade <- zahl {{MOD}} 2 = 1', 'Eine Zahl ist ungerade, wenn beim Teilen durch 2 der Rest 1 bleibt.')]
      },
      {
        concept: 'cond', title: 'Entscheidungen mit WENN',
        parts: [
          C(['temperatur <- 22§Der Startwert, mit dem entschieden wird.', 'WENN temperatur > 25 DANN§Prüft die Bedingung. Ist sie WAHR, läuft der eingerückte Block darunter.', '  AUSGABE "heiß"§Wird nur ausgeführt, wenn temperatur > 25 gilt (hier nicht).', 'SONST WENN temperatur > 15 DANN§Nur wenn die erste Bedingung FALSCH war, wird diese hier geprüft.', '  AUSGABE "angenehm"§Hier: 22 > 15 ist WAHR, also läuft dieser Zweig.', 'SONST§Der Zweig für alle übrigen Fälle (wenn keine Bedingung vorher stimmte).', '  AUSGABE "kühl"§Wird hier nicht erreicht.', 'ENDE WENN§Beendet die ganze Entscheidung. Danach geht es normal weiter.'], 'Mehrere Fälle unterscheiden'),
          A.tip('Rücke die Zeilen **innerhalb** eines Blocks ein. Das macht sofort sichtbar, was zusammengehört. Der Pseudocode in dieser App braucht die Einrückung nicht, aber du solltest sie immer benutzen.')
        ],
        tasks: [A.fill('Ergänze die Wörter, die einen Fall abschließen.', 'WENN x > 0 DANN\n  AUSGABE "positiv"\n{{SONST}}\n  AUSGABE "null oder negativ"\nENDE {{WENN}}', 'Der Zweig für alle übrigen Fälle heißt SONST. Der Block endet mit ENDE und dem Wort, mit dem er begann.')]
      },
      {
        concept: 'loops', title: 'Schleifen: FÜR, SOLANGE, WIEDERHOLE',
        parts: [
          C(['FÜR i VON 1 BIS 3§Zählschleife: i bekommt nacheinander die Werte 1, 2 und 3. Der eingerückte Block läuft für jeden Wert einmal.', '  AUSGABE "Durchlauf", i§Gibt in jedem Durchlauf den aktuellen Wert von i aus.', 'ENDE FÜR§Ende des Schleifenkörpers. Danach geht es mit der nächsten Zeile weiter.'], 'Die Zählschleife FÜR'),
          C(['zahl <- 1§Startwert.', 'SOLANGE zahl < 50§Vor jedem Durchlauf wird geprüft: Ist zahl noch kleiner als 50? Wenn ja, läuft der Block.', '  zahl <- zahl * 3§Hier muss sich etwas ändern, das irgendwann die Bedingung FALSCH macht. Sonst läuft die Schleife ewig!', 'ENDE SOLANGE§Ende der Schleife.', 'AUSGABE zahl§Nach der Schleife: 81 (1, 3, 9, 27, 81).'], 'Die Bedingungsschleife SOLANGE'),
          C(['n <- 0§Startwert.', 'WIEDERHOLE§Beginn einer Schleife, die **mindestens einmal** läuft, weil die Prüfung am Ende steht.', '  n <- n + 4§Wird zuerst ausgeführt: n wird 4.', 'BIS n >= 10§Am Ende prüfen: Ist n schon mindestens 10? Wenn ja, aufhören. Hier erst bei 12.'], 'Die Schleife mit Prüfung am Ende: WIEDERHOLE … BIS'),
          A.table(['Schleife', 'Prüfung', 'Läuft mindestens einmal?', 'Typischer Einsatz'], [['FÜR', 'Zähler', 'nein, wenn Von größer als Bis', 'feste Anzahl Wiederholungen'], ['SOLANGE', 'am Anfang', 'nein', 'Ende vom Zustand abhängig'], ['WIEDERHOLE … BIS', 'am Ende', 'ja', 'erst handeln, dann prüfen (z. B. Eingabe wiederholen)']], 'Welche Schleife wann?')
        ],
        tasks: [A.fill('Ergänze den fehlenden Zähler, damit die Zahlen 10, 8, 6, 4, 2 ausgegeben werden.', 'FÜR i VON 10 BIS 2 SCHRITT {{-2}}\n  AUSGABE i\nENDE FÜR', 'Es geht abwärts in Zweierschritten, also ist der Schritt negativ.')]
      },
      {
        concept: 'funcs', title: 'Funktionen mit FUNKTION',
        parts: [
          C(['FUNKTION flaeche(laenge, breite)§Definiert eine Funktion namens flaeche mit zwei Parametern. Hier läuft noch nichts, es wird nur beschrieben.', '  GIB ZURÜCK laenge * breite§Berechnet das Ergebnis und liefert es an den Aufrufer. Danach endet die Funktion.', 'ENDE FUNKTION§Ende der Definition.', 'raum <- flaeche(4, 5)§**Aufruf**: 4 und 5 werden den Parametern zugeordnet, die Funktion läuft, und das Ergebnis 20 wird in raum gespeichert.', 'AUSGABE "Raumgröße:", raum§Gibt 20 aus.'], 'Funktion definieren und aufrufen')
        ],
        tasks: [A.fill('Ergänze die Rückgabe, damit die Funktion das Dreifache liefert.', 'FUNKTION dreifach(n)\n  {{GIB ZURÜCK}} n * 3\nENDE FUNKTION', 'Mit diesem Schlüsselwort liefert eine Funktion ihr Ergebnis.')]
      },
      {
        concept: 'coll', title: 'Listen',
        parts: [
          C(['namen <- ["Ada", "Alan", "Grace"]§Eine Liste mit drei Texten. Eckige Klammern, Komma dazwischen.', 'AUSGABE namen[0]§Zugriff auf das **erste** Element (Index 0): Ada.', 'namen[1] <- "Linus"§Ersetzt das zweite Element (Index 1) durch Linus.', 'ANHÄNGEN(namen, "Tim")§Fügt hinten ein neues Element an. Jetzt sind es vier.', 'AUSGABE LÄNGE(namen)§LÄNGE liefert die Anzahl der Elemente: 4.', 'FÜR JEDES name IN namen§Geht alle Elemente der Reihe nach durch. name enthält jeweils das aktuelle.', '  AUSGABE name§Gibt jedes Element aus.', 'ENDE FÜR§Ende der Schleife.'], 'Mit Listen arbeiten')
        ],
        tasks: [A.fill('Ergänze den Index des **letzten** Elements bei einer Liste mit 5 Einträgen.', 'AUSGABE liste[{{4}}]', 'Der Index beginnt bei 0. Fünf Elemente haben die Indizes 0 bis 4.')]
      },
      {
        id: 'schreibtisch', stage: 3, title: 'Probleme zerlegen und der Schreibtischtest',
        goal: 'Du kannst ein Problem in Teilschritte zerlegen und mit dem Schreibtischtest prüfen, ob dein Ablauf stimmt.',
        parts: [
          A.text('Von der Aufgabe zum Ablauf', 'Wenn du vor einer Aufgabe stehst, hilft diese Reihenfolge:\n\n1. **Verstehen**: Was ist gegeben (Eingabe), was soll herauskommen (Ausgabe)?\n2. **Beispiel von Hand lösen**: Nimm kleine Zahlen und löse es selbst. Achte darauf, was du tust.\n3. **Zerlegen**: Teile die Aufgabe in kleine Schritte. Jeder Schritt wird ein Stück Pseudocode.\n4. **Aufschreiben** und **prüfen**.\n\nBeispiel: „Berechne den Durchschnitt von Zahlen.“ Von Hand: addieren, dann durch die Anzahl teilen. Das sind zwei Schritte, die du in einer Schleife und einer Division umsetzt.'),
          A.text('Der Schreibtischtest', 'Beim **Schreibtischtest** spielst du den Computer: Du gehst den Ablauf Zeile für Zeile durch und notierst in einer Tabelle, welche Werte die Variablen nach jedem Schritt haben. So findest du Fehler **bevor** du das Programm schreibst. In Prüfungen ist er eine feste Aufgabe. Der Ablauf-Player dieser App macht genau das für dich.'),
          C(['summe <- 0§Startwert, damit wir sammeln können.', 'FÜR i VON 1 BIS 3§Zählt i von 1 bis 3.', '  summe <- summe + i * i§Addiert das Quadrat von i.', 'ENDE FÜR', 'AUSGABE summe§Gibt die Summe der Quadrate aus.'], 'Das Programm'),
          A.table(['Schritt', 'Zeile', 'i', 'summe', 'Ausgabe'], [['1', 'summe <- 0', '-', '0', ''], ['2', 'FÜR (1. Durchlauf)', '1', '0', ''], ['3', 'summe <- summe + i*i', '1', '1', ''], ['4', 'FÜR (2. Durchlauf)', '2', '1', ''], ['5', 'summe <- summe + i*i', '2', '5', ''], ['6', 'FÜR (3. Durchlauf)', '3', '5', ''], ['7', 'summe <- summe + i*i', '3', '14', ''], ['8', 'AUSGABE summe', '3', '14', '14']], 'Der Schreibtischtest als Tabelle', 'Probiere es selbst: Decke die Spalten rechts ab, fülle sie im Kopf aus und vergleiche dann mit dem **Ablauf verfolgen**-Player oben.')
        ],
        tips: [A.tip('Teste jeden Ablauf mit mindestens einem **normalen** Fall und einem **Grenzfall** (z. B. leere Liste, 0, negative Zahl). Das sind die Stellen, an denen Fehler lauern.')],
        quiz: [A.q('Wozu dient ein Schreibtischtest?', ['Um einen Ablauf von Hand durchzuspielen und Fehler zu finden', 'Um ein Programm schneller zu machen', 'Um ein Programm zu übersetzen', 'Um Variablen zu löschen'], 0, 'Du führst den Algorithmus selbst Schritt für Schritt aus und notierst die Variablenwerte.')],
        tasks: [A.predict('Führe einen Schreibtischtest durch: Was wird ausgegeben?', ['a <- 2', 'b <- 3', 'FÜR i VON 1 BIS 3', '  a <- a + b', '  b <- a - b', 'ENDE FÜR', 'AUSGABE a, b'], '12 7', 'Notiere dir a und b nach jedem Durchlauf. Achtung: `b <- a - b` benutzt das **schon neue** a. Du kannst den Ablauf in der Spielwiese verfolgen.', 'Nach den Durchläufen stehen a und b bei (5, 2), dann (7, 5), dann (12, 7).')]
      },
      {
        id: 'algos', stage: 4, title: 'Klassische Algorithmen', goal: 'Du kennst Suchen, Sortieren und Rekursion und kannst sie im Ablauf nachvollziehen.',
        parts: [
          A.text('Lineare Suche', 'Du willst wissen, ob ein Wert in einer Liste steckt. Der einfachste Weg: Geh die Liste von vorn nach hinten durch und vergleiche jedes Element. Bei einem Treffer kannst du sofort aufhören.'),
          C(['gesucht <- 7§Der Wert, den wir finden wollen.', 'zahlen <- [4, 9, 7, 1]§Die Liste, in der wir suchen.', 'position <- -1§-1 bedeutet „nicht gefunden“, ein Wert, der als Index nicht vorkommen kann.', 'FÜR i VON 0 BIS LÄNGE(zahlen) - 1§Geht alle gültigen Indizes durch: 0 bis Länge minus 1.', '  WENN zahlen[i] = gesucht DANN§Vergleicht das aktuelle Element mit dem gesuchten Wert.', '    position <- i§Merkt sich, an welcher Stelle der Treffer liegt.', '  ENDE WENN', 'ENDE FÜR', 'AUSGABE "Gefunden an Position", position§Gibt 2 aus (der dritte Eintrag, Zählung ab 0).'], 'Eine Position suchen'),
          A.text('Sortieren mit Bubble Sort', 'Beim **Bubble Sort** vergleichst du immer zwei Nachbarn und tauschst sie, wenn sie in der falschen Reihenfolge stehen. Nach jeder Runde ist das größte Element ganz hinten „aufgestiegen“ wie eine Blase. Nach genug Runden ist alles sortiert. Das Tauschen braucht, wie bei den Variablen, eine **Hilfsvariable**.'),
          C(['zahlen <- [5, 2, 9, 1]§Die unsortierte Liste.', 'n <- LÄNGE(zahlen)§Anzahl der Elemente.', 'FÜR runde VON 1 BIS n - 1§Es genügen n−1 Runden.', '  FÜR i VON 0 BIS n - 2§Vergleicht in jeder Runde alle Nachbarpaare (i und i+1).', '    WENN zahlen[i] > zahlen[i + 1] DANN§Steht das linke Element vor einem kleineren?', '      tmp <- zahlen[i]§Hilfsvariable: merkt sich das linke Element.', '      zahlen[i] <- zahlen[i + 1]§Das rechte Element rückt nach links.', '      zahlen[i + 1] <- tmp§Das gemerkte Element kommt nach rechts. Getauscht!', '    ENDE WENN', '  ENDE FÜR', 'ENDE FÜR', 'AUSGABE zahlen§Gibt die sortierte Liste aus: [1, 2, 5, 9].'], 'Bubble Sort'),
          A.text('Rekursion: eine Funktion ruft sich selbst auf', 'Manche Probleme lösen sich elegant, wenn eine Funktion sich **selbst mit einem kleineren Problem** aufruft, bis ein einfacher Fall erreicht ist. Das Schulbeispiel ist die Fakultät: `5! = 5 * 4 * 3 * 2 * 1 = 5 * 4!`. Wichtig ist immer eine **Abbruchbedingung**, sonst ruft sich die Funktion ewig selbst auf.'),
          C(['FUNKTION fakultaet(n)§Berechnet n! = n * (n-1) * … * 1.', '  WENN n <= 1 DANN§**Abbruchbedingung**: der einfachste Fall. 1! ist 1.', '    GIB ZURÜCK 1§Ohne diese Zeilen gäbe es nie ein Ende.', '  ENDE WENN', '  GIB ZURÜCK n * fakultaet(n - 1)§Der **rekursive Aufruf** mit einem kleineren Wert: n! = n * (n−1)!', 'ENDE FUNKTION', 'AUSGABE fakultaet(4)§Gibt 24 aus. Verfolge den Ablauf und beobachte, wie rechts mehrere Funktionsaufrufe übereinander liegen.'], 'Fakultät rekursiv')
        ],
        tips: [A.tip('Rekursion fühlt sich am Anfang seltsam an. Das ist normal. Der Ablauf-Player zeigt dir bei jedem Aufruf einen **eigenen Kasten** mit den Variablen dieses Aufrufs. So siehst du, wie die Aufrufe sich stapeln und wieder auflösen.')],
        quiz: [A.q('Wozu braucht Bubble Sort beim Tauschen eine Hilfsvariable?', ['Damit beim Überschreiben ein Wert nicht verloren geht', 'Damit der Algorithmus schneller läuft', 'Weil Listen nur Zahlen speichern dürfen', 'Um den Index zu erhöhen'], 0, 'Würdest du direkt `a <- b` und dann `b <- a` schreiben, wäre der alte Wert von a schon überschrieben. tmp merkt ihn sich.'), A.q('Was darf bei einer rekursiven Funktion **nie** fehlen?', ['Eine Abbruchbedingung', 'Eine Schleife', 'Eine Liste', 'Ein Kommentar'], 0, 'Ohne Abbruchbedingung würde sich die Funktion endlos selbst aufrufen.')],
        tasks: [A.predict('Was wird ausgegeben?', ['FUNKTION summe(n)', '  WENN n = 0 DANN', '    GIB ZURÜCK 0', '  ENDE WENN', '  GIB ZURÜCK n + summe(n - 1)', 'ENDE FUNKTION', 'AUSGABE summe(4)'], '10', '4 + 3 + 2 + 1 + 0. Jeder Aufruf wartet, bis der kleinere Aufruf sein Ergebnis liefert.')]
      }
    ]
  });
})();
