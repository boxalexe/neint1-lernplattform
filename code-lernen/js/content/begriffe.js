/*
 * Begriffe von A bis Z, Ergänzung (Allvater 19.11.2026: „deckt das Verzeichnis die wichtigsten Begriffe ab, besonders aus den Fragen?“).
 * Alle Begriffe, die in Quiz, Antworten und Texten fett vorkommen und vorher fehlten. Definitionen abgestimmt mit dem Nachschlagewerk
 * der Layer 8 Academy (OOP & UML, SQL & Datenbanken, IT-Sicherheit).
 */
(function () {
  'use strict';
  const A = window.Academy;
  [
    // Objektorientierung
    ['Objekt', 'Ein konkretes Exemplar einer Klasse mit eigenen Werten, zum Beispiel das rote Auto mit 120 PS. Andere Bezeichnung: **Instanz**.'],
    ['Abstraktion', 'OOP-Grundprinzip: nur die für die Aufgabe wesentlichen Eigenschaften abbilden. Wie ein Stadtplan, der Straßen zeigt, aber keine Pflastersteine.'],
    ['Abstrakte Klasse', 'Klasse, von der man keine Objekte erzeugen kann. Sie dient als Vorlage für Unterklassen und darf abstrakte Methoden ohne Inhalt haben, die jede Unterklasse ausfüllen muss. Im UML kursiv geschrieben.'],
    ['Überschreiben (Override)', 'Eine Unterklasse schreibt eine geerbte Methode mit gleichem Namen und gleichen Parametern neu. Grundlage der Polymorphie.'],
    ['Überladen (Overload)', 'Mehrere Methoden mit gleichem Namen, aber unterschiedlichen Parametern in derselben Klasse, zum Beispiel `addiere(int, int)` und `addiere(double, double)`. Nicht mit Überschreiben verwechseln.'],
    ['Getter und Setter', 'Methoden zum Lesen (Getter) und Ändern (Setter) privater Attribute. Der Setter kann prüfen, bevor er einen Wert übernimmt, wie ein Türsteher.'],
    ['Sichtbarkeit', 'Legt fest, wer auf ein Attribut oder eine Methode zugreifen darf: `+` public, `-` private, `#` protected, `~` package.'],
    ['Assoziation', 'Beziehung „kennt“ oder „arbeitet mit“ zwischen Klassen. Im UML eine durchgezogene Linie, optional mit offenem Pfeil.'],
    ['Aggregation', 'Beziehung „besteht aus“, bei der die Teile auch allein existieren können (Team und Spieler). Im UML eine leere Raute am Ganzen.'],
    ['Komposition', 'Beziehung „besteht aus“, bei der die Teile mit dem Ganzen verschwinden (Gebäude und Räume). Im UML eine gefüllte Raute am Ganzen.'],
    ['Multiplizität', 'Zahl an einem Linienende im UML, die angibt, wie viele Objekte beteiligt sind: `1`, `0..1`, `*` (beliebig viele), `1..*` (mindestens eins).'],
    ['Statisch (static)', 'Gehört zur Klasse selbst, nicht zu einem einzelnen Objekt. Eine statische Variable gibt es nur einmal, egal wie viele Objekte existieren.'],
    ['Lambda', 'Kurze Funktion ohne Namen, die man direkt an Ort und Stelle schreibt, zum Beispiel `x => x * 2`.'],
    ['Generics', 'Platzhalter für Datentypen, damit eine Klasse für verschiedene Typen funktioniert, zum Beispiel `List<String>` und `List<Integer>`.'],
    // UML-Diagramme
    ['Klassendiagramm', 'UML-Diagramm für den Aufbau: Welche Klassen gibt es, mit welchen Attributen und Methoden, und wie hängen sie zusammen?'],
    ['Sequenzdiagramm', 'UML-Diagramm für einen Ablauf zwischen Objekten über die Zeit. Lebenslinien senkrecht, Nachrichten als waagerechte Pfeile, die Zeit läuft von oben nach unten.'],
    ['Anwendungsfalldiagramm (Use Case)', 'UML-Diagramm, das zeigt, wer was mit dem System tun kann: Akteure als Strichmännchen, Anwendungsfälle als Ovale, dazu «include» (immer) und «extend» (nur unter einer Bedingung).'],
    ['Aktivitätsdiagramm', 'UML-Diagramm für den Ablauf eines Vorgangs mit Start, Aktionen, Entscheidungen (Raute: entweder oder) und Gabelungen (Balken: sowohl als auch, parallel).'],
    ['Zustandsdiagramm', 'UML-Diagramm für die Zustände eines Objekts und die Ereignisse, die zwischen ihnen wechseln, zum Beispiel eine Bestellung: neu, bezahlt, versendet.'],
    // Algorithmen und Darstellung
    ['Struktogramm', 'Darstellung eines Ablaufs als ineinander geschachtelte Kästen (nach Nassi und Shneiderman), ohne Sprünge. Verzweigung mit Dreieck, Schleife mit Rand links.'],
    ['Programmablaufplan (PAP)', 'Darstellung eines Ablaufs mit Symbolen und Pfeilen: Oval für Start und Ende, Rechteck für Anweisungen, Raute für Verzweigungen, Parallelogramm für Ein- und Ausgabe.'],
    ['Schreibtischtest', 'Ein Programm von Hand durchspielen und dabei in einer Tabelle notieren, welchen Wert jede Variable nach jedem Schritt hat. So findet man Denkfehler ohne Computer.'],
    ['Kontrollstrukturen', 'Die drei Bausteine jedes Algorithmus: Sequenz (nacheinander), Selektion (Verzweigung) und Iteration (Schleife).'],
    ['Kopfgesteuerte Schleife', 'Prüft die Bedingung vor jedem Durchlauf, läuft also eventuell gar nicht (SOLANGE).'],
    ['Fußgesteuerte Schleife', 'Prüft die Bedingung nach jedem Durchlauf, läuft also mindestens einmal (WIEDERHOLE ... BIS).'],
    ['Lineare Suche', 'Suche, die eine Liste von vorn nach hinten Element für Element durchgeht. Funktioniert immer, ist aber bei großen Listen langsam: O(n).'],
    ['Binäre Suche', 'Suche in einer sortierten Liste, die immer in der Mitte nachsieht und dann die passende Hälfte weiter durchsucht. Sehr schnell: O(log n).'],
    ['Bubble Sort', 'Sortierverfahren, das benachbarte Elemente vergleicht und vertauscht, bis nichts mehr getauscht werden muss. Die großen Werte steigen auf wie Blasen. O(n²).'],
    ['O-Notation', 'Beschreibt, wie der Aufwand eines Algorithmus mit der Datenmenge wächst: O(1) konstant, O(log n) sehr langsam wachsend, O(n) gleichmäßig, O(n²) im Quadrat.'],
    ['Stapel (Stack)', 'Datenstruktur nach dem Prinzip LIFO (Last In, First Out): Was zuletzt hineinkommt, geht zuerst wieder heraus, wie bei einem Tellerstapel. Operationen push und pop.'],
    ['Warteschlange (Queue)', 'Datenstruktur nach dem Prinzip FIFO (First In, First Out): Wer zuerst kommt, ist zuerst dran, wie an der Kasse. Operationen enqueue und dequeue.'],
    ['Stack Overflow', 'Fehler, wenn sich Funktionen zu oft verschachtelt aufrufen und der Aufrufstapel keinen Platz mehr hat, meist durch eine Rekursion ohne Abbruchbedingung.'],
    // Entwurf und Test
    ['Entwurfsmuster (Design Pattern)', 'Bewährte Lösung für ein immer wiederkehrendes Entwurfsproblem, zum Beispiel Singleton, Observer oder MVC.'],
    ['Singleton', 'Entwurfsmuster, das sicherstellt, dass es von einer Klasse höchstens ein Objekt gibt: privater Konstruktor und eine statische Methode, die immer dasselbe Objekt liefert.'],
    ['Observer (Beobachter)', 'Entwurfsmuster, bei dem sich Objekte bei einem Subjekt anmelden und bei jeder Änderung benachrichtigt werden, wie Abonnenten eines Kanals.'],
    ['MVC (Model View Controller)', 'Entwurfsmuster, das Daten und Regeln (Model), Anzeige (View) und Steuerung (Controller) trennt. Wie im Restaurant: Küche, Teller und Kellner.'],
    ['Black-Box-Test', 'Test anhand der Anforderungen, ohne in den Code zu schauen: Kommt bei dieser Eingabe das Richtige heraus?'],
    ['White-Box-Test', 'Test mit Blick in den Code: Wird jeder Zweig und jede Anweisung mindestens einmal durchlaufen?'],
    ['Äquivalenzklasse', 'Gruppe von Eingabewerten, bei denen ein Programm sich gleich verhalten soll. Aus jeder Klasse genügt ein Testwert.'],
    ['Grenzwert', 'Wert direkt an der Grenze zwischen zwei Äquivalenzklassen, zum Beispiel 17 und 18 bei „ab 18“. Dort passieren die meisten Fehler, deshalb testet man ihn gezielt.'],
    ['Unit-Test (Modultest)', 'Automatischer Test einer kleinen Einheit, meist einer Methode. Aufbau: Arrange (vorbereiten), Act (ausführen), Assert (prüfen).'],
    // Datenbanken
    ['Datenbank (relational)', 'Daten in Tabellen aus Zeilen (Datensätzen) und Spalten (Attributen), verbunden über Schlüssel.'],
    ['JOIN', 'Verknüpft Tabellen über passende Spalten: INNER JOIN nur Treffer in beiden, LEFT JOIN alle Zeilen der linken Tabelle, RIGHT JOIN alle der rechten, FULL JOIN alle beider.'],
    ['NULL', 'Steht in einer Datenbank für „kein Wert“ oder „unbekannt“, nicht für 0. Geprüft wird mit `IS NULL`, nicht mit `= NULL`.'],
    ['Aggregatfunktion', 'Fasst viele Zeilen zu einem Wert zusammen: COUNT, SUM, AVG, MIN, MAX. Meist zusammen mit GROUP BY.'],
    ['GROUP BY und HAVING', 'GROUP BY fasst Zeilen mit gleichen Werten zu Gruppen zusammen. HAVING filtert danach die fertigen Gruppen, WHERE dagegen vorher die einzelnen Zeilen.'],
    ['Transaktion', 'Mehrere Datenbankänderungen, die ganz oder gar nicht ausgeführt werden. Geht ein Schritt schief, wird alles zurückgerollt, wie bei einer Überweisung.'],
    ['ERM (Entity-Relationship-Modell)', 'Grafischer Entwurf einer Datenbank: Entitäten (Dinge, Rechtecke), Attribute und Beziehungen (Rauten) mit Kardinalitäten.'],
    ['Kardinalität', 'Gibt im ERM an, wie viele Datensätze beteiligt sind: 1:1, 1:n oder n:m. Eine n:m-Beziehung braucht eine eigene Zwischentabelle.'],
    ['Normalisierung', 'Aufteilen der Daten auf Tabellen, damit jede Information nur einmal gespeichert ist. 1. NF: atomare Werte. 2. NF: abhängig vom ganzen Schlüssel. 3. NF: keine Abhängigkeit über andere Nichtschlüsselattribute.'],
    ['Anomalie', 'Fehler durch doppelt gespeicherte Daten: Änderungsanomalie (an vielen Stellen ändern), Einfügeanomalie (etwas lässt sich nicht erfassen), Löschanomalie (mit einem Datensatz geht ungewollt mehr verloren).'],
    // Sicherheit
    ['SQL-Injection', 'Angriff, bei dem eine Eingabe als Teil eines SQL-Befehls ausgeführt wird, weil das Programm Befehl und Eingabe zusammenklebt. Verhindert durch Prepared Statements.'],
    ['Prepared Statement', 'SQL-Befehl mit Platzhaltern (`?`), der vorab an die Datenbank geht. Die Eingaben kommen getrennt hinterher und können den Befehl nicht verändern.'],
    ['Hashwert', 'Ergebnis einer Einwegfunktion: Aus dem Hash lässt sich die Eingabe nicht zurückrechnen, wie aus Hackfleisch kein Steak. Passwörter werden nur als Hash gespeichert.'],
    ['Salt', 'Zufällige Zeichenkette pro Nutzer, die vor dem Hashen an das Passwort angehängt wird. Gleiche Passwörter ergeben so verschiedene Hashwerte.'],
    ['Cross-Site-Scripting (XSS)', 'Angriff, bei dem eingeschleuster Code im Browser anderer Nutzer läuft, weil eine Seite Eingaben ungeprüft anzeigt. Verhindert durch Maskieren der Ausgaben.']
  ].forEach(([n, t]) => A.term(n, t));
})();
