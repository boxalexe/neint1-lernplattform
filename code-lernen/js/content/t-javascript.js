/* Kurs: JavaScript */
(function () {
  'use strict';
  const A = window.Academy, C = (lines, h, o) => A.code('javascript', lines, h, o);
  const PP = (prompt, code, ans, hint, expl) => Object.assign(A.predict(prompt, code, ans, hint, expl), { lang: 'javascript' });

  A.track({
    id: 'javascript', title: 'JavaScript', tag: 'JAVASCRIPT',
    desc: 'Die Sprache des Webs: Variablen, Funktionen, Arrays, Klassen und asynchrone Abläufe. Alle Beispiele kannst du direkt in der App ausführen und ändern.',
    intro: 'JavaScript läuft in jedem Browser und, mit Node.js, auch auf dem Server. Bei jedem Codebeispiel gibt es den Knopf **„Ausprobieren und ändern“**: Du kannst den Code bearbeiten und sofort ausführen. Das ist der schnellste Weg zu verstehen. Ausgaben machst du mit `console.log(...)`.\n\nIm Browser kannst du dasselbe mit **F12** (Entwicklerwerkzeuge, dort der Reiter Konsole) tun.',
    lessons: [
      {
        concept: 'hello',
        parts: [
          C(['// Das ist ein Kommentar§Alles hinter // bis zum Zeilenende wird ignoriert.', 'console.log("Hallo Welt");§console.log gibt etwas in der Konsole aus. Text steht in Anführungszeichen. Das Semikolon beendet die Anweisung.', 'console.log("Ich lerne", "JavaScript");§Mehrere Werte durch Komma getrennt werden mit Leerzeichen ausgegeben.', 'console.log(2 + 3);§Zuerst wird gerechnet, dann ausgegeben: 5'], 'Dein erstes JavaScript-Programm')
        ],
        tips: [A.warn('JavaScript unterscheidet Groß- und Kleinschreibung: `console.log` funktioniert, `Console.Log` nicht.'), A.tip('Das Semikolon am Zeilenende ist in JavaScript meist optional, aber üblich. Wähle einen Stil und bleibe dabei.')],
        quiz: [A.q('Womit gibst du in JavaScript etwas in der Konsole aus?', ['console.log()', 'print()', 'echo', 'System.out.println()'], 0, 'print() ist Python, System.out.println() ist Java.')],
        tasks: [PP('Was gibt das Programm aus?', ['console.log("a");', 'console.log("b", "c");', 'console.log(1 + 1);'], 'a\nb c\n2', 'Mehrere Werte in einem log werden mit Leerzeichen getrennt.', 'Jeder console.log-Aufruf beginnt eine neue Zeile.')]
      },
      {
        concept: 'vars',
        parts: [
          C(['let alter = 25;§let legt eine Variable an, die sich ändern darf. alter bekommt den Wert 25.', 'const name = "Ada";§const legt eine Variable an, die sich **nicht mehr ändern** darf (Konstante). Dein Standard, wenn du den Wert nicht ändern willst.', 'let preis = 19.99;§Kommazahlen mit Punkt. JavaScript kennt für alle Zahlen nur einen Typ: number.', 'let istStudent = true;§Wahrheitswerte: true und false, klein geschrieben.', 'alter = alter + 1;§Rechts wird zuerst gerechnet (25 + 1), das Ergebnis wird in alter gespeichert: 26.', 'console.log(`${name} ist ${alter}`);§Ein Text in **Backticks** kann mit ${...} Werte einbauen: Ada ist 26.', 'console.log(typeof preis);§typeof verrät den Typ: number'], 'Variablen mit let und const'),
          C(['const eingabe = "25";§Text, auch wenn er wie eine Zahl aussieht.', 'const zahl = Number(eingabe);§Number() wandelt Text in eine Zahl um.', 'console.log(zahl + 1);§Rechnet: 26', 'console.log(eingabe + 1);§**Achtung:** Text + Zahl hängt aneinander: "251". Ein klassischer JavaScript-Stolperstein!'], 'Typen umwandeln')
        ],
        tips: [A.warn('Benutze **`let` und `const`**, nicht das alte `var`. `var` hat verwirrende Regeln und wird in neuem Code vermieden.'), A.tip('Variablen schreibt man in JavaScript in **camelCase**: `istStudent`, `anzahlKunden`.')],
        quiz: [A.q('Was passiert bei `const x = 5; x = 6;`?', ['Fehler: Eine Konstante darf nicht neu zugewiesen werden', 'x ist danach 6', 'x ist danach 11', 'Nichts'], 0, 'const verbietet eine neue Zuweisung. Für veränderliche Werte nimm let.'), A.q('Was ergibt `"5" + 3` in JavaScript?', ['"53" (Text)', '8', 'Einen Fehler', '"8"'], 0, 'Sobald ein Text beteiligt ist, wird + zum Aneinanderhängen.')],
        tasks: [PP('Was gibt das Programm aus?', ['let x = 3;', 'let y = x;', 'x = 10;', 'console.log(x, y);'], '10 3', 'y bekam den Wert 3, bevor x geändert wurde.', 'Bei `y = x` wird der **aktuelle Wert** kopiert.'), A.js('Schreibe eine Funktion `verdoppeln(n)`, die das Doppelte von n zurückgibt.', 'function verdoppeln(n) {\n  // dein Code\n}', [{ fn: 'verdoppeln', args: [4], expect: 8 }, { fn: 'verdoppeln', args: [0], expect: 0 }, { fn: 'verdoppeln', args: [-3], expect: -6 }], 'Nutze `return n * 2;`.', 'function verdoppeln(n) {\n  return n * 2;\n}')]
      },
      {
        concept: 'ops',
        parts: [
          C(['console.log(7 + 3);§Addition: 10', 'console.log(7 / 2);§Division liefert eine Kommazahl: 3.5', 'console.log(Math.floor(7 / 2));§Math.floor rundet ab. So bekommst du die Ganzzahl-Division: 3', 'console.log(7 % 2);§Das Prozentzeichen liefert den Rest: 1', 'console.log(2 ** 10);§** ist die Potenz: 1024', 'console.log(5 > 3 && 5 < 10);§&& heißt UND: true', 'console.log(!(5 === 5));§! dreht um. === vergleicht auf Gleichheit: false', 'console.log(5 !== 4);§!== heißt ungleich: true'], 'Rechnen, Vergleichen, Verknüpfen'),
          C(['console.log(5 == "5");§== vergleicht **locker** und wandelt um: true. Vermeide es!', 'console.log(5 === "5");§=== vergleicht Wert **und** Typ: false. Nimm immer ===.', 'console.log(0.1 + 0.2);§Kommazahlen sind ungenau: 0.30000000000000004'], 'Gleich ist nicht gleich')
        ],
        tips: [A.warn('Benutze immer `===` und `!==`. Das lockere `==` wandelt Typen heimlich um und führt zu schwer findbaren Fehlern (`0 == ""` ist `true`).')],
        quiz: [A.q('Was ergibt `5 === "5"`?', ['false', 'true', 'Einen Fehler', '5'], 0, 'Zahl und Text haben verschiedene Typen, === ist daher false.')],
        tasks: [PP('Was gibt das Programm aus?', ['console.log(17 % 5, Math.floor(17 / 5));'], '2 3', '17 durch 5 ist 3 Rest 2. Beachte die Reihenfolge der beiden Werte.', 'Zuerst der Rest (2), dann der abgerundete Quotient (3).'), A.js('Schreibe `istGerade(n)`: true, wenn n gerade ist, sonst false.', 'function istGerade(n) {\n  // dein Code\n}', [{ fn: 'istGerade', args: [4], expect: true }, { fn: 'istGerade', args: [7], expect: false }, { fn: 'istGerade', args: [0], expect: true }], 'Eine Zahl ist gerade, wenn der Rest bei Division durch 2 gleich 0 ist.', 'function istGerade(n) {\n  return n % 2 === 0;\n}')]
      },
      {
        concept: 'cond',
        parts: [
          C(['const temperatur = 22;§Der Wert, nach dem entschieden wird.', 'if (temperatur > 25) {§if prüft die Bedingung in **runden Klammern**. Der Block steht in **geschweiften Klammern**.', '  console.log("heiß");§Läuft nur, wenn die Bedingung stimmt.', '} else if (temperatur > 15) {§Nur wenn die erste Bedingung nicht stimmte, wird diese geprüft.', '  console.log("angenehm");§22 > 15 stimmt: Ausgabe angenehm.', '} else {§Alle übrigen Fälle.', '  console.log("kühl");§Wird hier nicht erreicht.', '}§Ende der Kette.'], 'if, else if, else'),
          C(['const alter = 20;§Beispielwert.', 'const text = alter >= 18 ? "volljährig" : "minderjährig";§Der **Bedingungsoperator** ? : ist eine Kurzform von if/else für **einen Wert**: Bedingung ? wenn wahr : wenn falsch.', 'console.log(text);§Ausgabe: volljährig'], 'Kurzform mit ? :')
        ],
        tips: [A.warn('`=` weist zu, `===` vergleicht. `if (x = 5)` setzt x auf 5 und ist **immer wahr**. Das ist einer der häufigsten Fehler.')],
        quiz: [A.q('Was steht in JavaScript hinter `if`?', ['Die Bedingung in runden Klammern', 'Ein Doppelpunkt', 'Das Wort then', 'Ein Semikolon'], 0, 'if (bedingung) { … }')],
        tasks: [PP('Was wird ausgegeben?', ['const x = 10;', 'if (x > 5 && x < 8) {', '  console.log("A");', '} else if (x > 5) {', '  console.log("B");', '} else {', '  console.log("C");', '}'], 'B', 'Die erste Bedingung braucht x < 8 (falsch). Die zweite stimmt.'), A.js('Schreibe `note(punkte)`: ab 90 „sehr gut“, ab 75 „gut“, ab 50 „bestanden“, sonst „durchgefallen“.', 'function note(punkte) {\n  // dein Code\n}', [{ fn: 'note', args: [95], expect: 'sehr gut' }, { fn: 'note', args: [75], expect: 'gut' }, { fn: 'note', args: [50], expect: 'bestanden' }, { fn: 'note', args: [10], expect: 'durchgefallen' }], 'Prüfe vom Größten zum Kleinsten. Mit `return` beendest du die Funktion sofort.', 'function note(punkte) {\n  if (punkte >= 90) return "sehr gut";\n  if (punkte >= 75) return "gut";\n  if (punkte >= 50) return "bestanden";\n  return "durchgefallen";\n}')]
      },
      {
        concept: 'loops',
        parts: [
          C(['for (let i = 1; i <= 3; i++) {§Drei Teile in der Klammer: Start (let i = 1), Bedingung (i <= 3), Schritt (i++ = i um 1 erhöhen). Läuft für i = 1, 2, 3.', '  console.log("Durchlauf", i);§Der Schleifenkörper steht in geschweiften Klammern.', '}§Ende der Schleife.'], 'Zählschleife for'),
          C(['let zahl = 1;§Startwert.', 'while (zahl < 50) {§Die Bedingung wird vor jedem Durchlauf geprüft.', '  zahl = zahl * 3;§Etwas muss sich ändern, sonst läuft die Schleife ewig.', '}§Ende.', 'console.log(zahl);§Ausgabe: 81'], 'Bedingungsschleife while'),
          C(['const farben = ["rot", "grün", "blau"];§Ein Array mit drei Texten.', 'for (const farbe of farben) {§for…of geht jedes Element durch, ganz ohne Zähler.', '  console.log(farbe);§Gibt rot, grün, blau aus.', '}§Ende.'], 'for…of: alle Elemente durchlaufen')
        ],
        tips: [A.warn('Vergisst du in `while` die Änderung, die zum Abbruch führt, hängt das Programm. In dieser App wird das nach 2,5 Sekunden abgebrochen. In einem echten Browser friert der Tab ein.')],
        quiz: [A.q('Wie oft läuft `for (let i = 0; i < 5; i++)`?', ['5-mal', '4-mal', '6-mal', 'Unendlich oft'], 0, 'i ist 0, 1, 2, 3, 4. Bei 5 ist i < 5 nicht mehr wahr.')],
        tasks: [PP('Was wird ausgegeben?', ['for (let i = 0; i < 3; i++) {', '  console.log(i * 2);', '}'], '0\n2\n4', 'i ist 0, 1, 2.'), A.js('Schreibe `summe(n)`: die Summe aller Zahlen von 1 bis n (n = 4 ergibt 10).', 'function summe(n) {\n  // dein Code\n}', [{ fn: 'summe', args: [4], expect: 10 }, { fn: 'summe', args: [1], expect: 1 }, { fn: 'summe', args: [100], expect: 5050 }], 'Lege vor der Schleife `let s = 0;` an und zähle in der Schleife i dazu.', 'function summe(n) {\n  let s = 0;\n  for (let i = 1; i <= n; i++) {\n    s = s + i;\n  }\n  return s;\n}')]
      },
      {
        concept: 'funcs',
        parts: [
          C(['function flaeche(laenge, breite) {§function definiert eine Funktion mit Namen und Parametern.', '  return laenge * breite;§return liefert das Ergebnis zurück und beendet die Funktion.', '}§Ende der Definition.', 'const raum = flaeche(4, 5);§Aufruf mit 4 und 5. Das Ergebnis 20 wird in raum gespeichert.', 'console.log("Raumgröße:", raum);§Gibt aus: Raumgröße: 20'], 'Funktion mit Parametern und Rückgabe'),
          C(['const quadrat = (n) => n * n;§Eine **Pfeilfunktion**: kurze Schreibweise. Bei nur einem Ausdruck entfällt return samt Klammern.', 'function gruss(name = "Welt") {§Ein **Standardwert**: Ohne Argument gilt "Welt".', '  return "Hallo " + name + "!";§Text zusammensetzen.', '}§Ende.', 'console.log(quadrat(7));§49', 'console.log(gruss());§Hallo Welt!', 'console.log(gruss("Ada"));§Hallo Ada!'], 'Pfeilfunktionen und Standardwerte')
        ],
        tips: [A.warn('Ohne `return` liefert eine Funktion `undefined`. Und `console.log` in einer Funktion ist **nicht** dasselbe wie ein Rückgabewert.')],
        quiz: [A.q('Was liefert eine JavaScript-Funktion ohne `return`?', ['undefined', '0', 'null', 'Einen Fehler'], 0, 'undefined bedeutet „kein Wert“.')],
        tasks: [PP('Was wird ausgegeben?', ['function doppelt(n) {', '  return n * 2;', '}', 'console.log(doppelt(doppelt(3)));'], '12', 'doppelt(3) ist 6, dann doppelt(6) ist 12.'), A.js('Schreibe `maximum(a, b)`, das die größere der beiden Zahlen zurückgibt.', 'function maximum(a, b) {\n  // dein Code\n}', [{ fn: 'maximum', args: [4, 9], expect: 9 }, { fn: 'maximum', args: [9, 4], expect: 9 }, { fn: 'maximum', args: [-1, -5], expect: -1 }], 'Mit if vergleichst du a und b und gibst eines davon zurück.', 'function maximum(a, b) {\n  if (a > b) {\n    return a;\n  }\n  return b;\n}')]
      },
      {
        concept: 'coll',
        parts: [
          C(['const namen = ["Ada", "Alan", "Grace"];§Ein Array in eckigen Klammern.', 'console.log(namen[0]);§Erstes Element, Index 0: Ada', 'namen[1] = "Linus";§Ersetzt das zweite Element.', 'namen.push("Tim");§push hängt hinten etwas an. Jetzt sind es 4.', 'console.log(namen.length);§length ist die Anzahl: 4 (ohne Klammern!)', 'for (const name of namen) {§Alle Elemente durchlaufen.', '  console.log(name);§Gibt jedes Element aus.', '}§Ende.'], 'Arrays'),
          C(['const zahlen = [1, 2, 3, 4, 5];§Ausgangs-Array.', 'const quadrate = zahlen.map((x) => x * x);§map wendet eine Funktion auf **jedes** Element an und liefert ein neues Array mit den Quadraten.', 'const gerade = zahlen.filter((x) => x % 2 === 0);§filter behält nur die Elemente, bei denen die Funktion true liefert: die geraden.', 'const summe = zahlen.reduce((a, b) => a + b, 0);§reduce fasst alle Elemente zu **einem** Wert zusammen: die Summe 15.', 'console.log(quadrate, gerade, summe);§Gibt die drei Ergebnisse aus.'], 'map, filter und reduce'),
          C(['const person = { name: "Ada", alter: 36 };§Ein **Objekt** speichert benannte Eigenschaften in geschweiften Klammern.', 'console.log(person.name);§Zugriff mit Punkt: Ada', 'person.stadt = "London";§Fügt eine Eigenschaft hinzu.', 'console.log(person);§Gibt das ganze Objekt aus.'], 'Objekte')
        ],
        tips: [A.warn('`zahlen.length` ist eine **Eigenschaft** (ohne Klammern), `zahlen.push(x)` eine **Methode** (mit Klammern). Eine häufige Verwechslung.')],
        quiz: [A.q('Was liefert `[1, 2, 3].map((x) => x + 1)`?', ['Ein neues Array [2, 3, 4]', 'Die Zahl 6', 'Das alte Array verändert', 'undefined'], 0, 'map erzeugt ein neues Array, in dem jede Zahl um 1 erhöht ist.')],
        tasks: [PP('Was gibt das Programm aus?', ['const l = [10, 20, 30];', 'console.log(l[0], l[l.length - 1], l.length);'], '10 30 3', 'l.length - 1 ist der Index des letzten Elements.'), A.js('Schreibe `maximum(liste)`, das die größte Zahl einer (nicht leeren) Liste zurückgibt.', 'function maximum(liste) {\n  // dein Code\n}', [{ fn: 'maximum', args: [[3, 9, 2, 7]], expect: 9 }, { fn: 'maximum', args: [[-4, -2, -8]], expect: -2 }, { fn: 'maximum', args: [[5]], expect: 5 }], 'Starte mit dem ersten Element und ersetze es, wenn du ein größeres findest.', 'function maximum(liste) {\n  let hoechste = liste[0];\n  for (const z of liste) {\n    if (z > hoechste) {\n      hoechste = z;\n    }\n  }\n  return hoechste;\n}')]
      },
      {
        concept: 'oop',
        parts: [
          C(['class Konto {§Beginnt die Klasse Konto.', '  constructor(inhaber) {§Der **Konstruktor** heißt immer constructor. Er läuft bei new.', '    this.inhaber = inhaber;§this bedeutet „dieses Objekt“. Speichert den Wert im Attribut.', '    this.kontostand = 0;§Startwert 0.', '  }§Ende des Konstruktors.', '  einzahlen(betrag) {§Eine Methode: kein Wort function nötig.', '    this.kontostand += betrag;§+= ist Kurzform für kontostand = kontostand + betrag.', '  }§Ende.', '  abheben(betrag) {§Heben ab, wenn genug da ist.', '    if (betrag <= this.kontostand) {§Prüft das Guthaben.', '      this.kontostand -= betrag;§Zieht ab.', '      return true;§Hat geklappt.', '    }§Ende von if.', '    return false;§Abgelehnt.', '  }§Ende.', '}§Ende der Klasse.', 'const k = new Konto("Ada");§new erzeugt ein Objekt. Der Konstruktor läuft mit "Ada".', 'k.einzahlen(100);§Methode am Objekt aufrufen: Kontostand 100.', 'console.log(k.abheben(30), k.kontostand);§Hebt 30 ab. Ausgabe: true 70'], 'Eine Klasse mit Konstruktor und Methoden'),
          C(['class Tier {§Oberklasse.', '  constructor(name) {§Konstruktor.', '    this.name = name;§Speichert den Namen.', '  }§Ende.', '  laut() {§Eine Methode.', '    return "...";§Standardlaut.', '  }§Ende.', '}§Ende der Klasse Tier.', 'class Hund extends Tier {§extends: Hund **erbt** von Tier.', '  laut() {§**Überschreibt** laut().', '    return "Wau";§Hunde sagen Wau.', '  }§Ende.', '}§Ende der Klasse Hund.', 'for (const t of [new Tier("Etwas"), new Hund("Bello")]) {§Zwei verschiedene Objekte.', '  console.log(t.name, t.laut());§Derselbe Aufruf, je nach Objekt anderes Ergebnis (Polymorphie).', '}§Ausgabe: Etwas ... und Bello Wau'], 'Vererbung mit extends')
        ],
        tips: [A.info('Mit einem vorangestellten `#` werden Attribute wirklich **privat**: `this.#kontostand`. Von außen ist dann kein Zugriff mehr möglich (Kapselung).')],
        quiz: [A.q('Welches Schlüsselwort erzeugt in JavaScript ein Objekt aus einer Klasse?', ['new', 'create', 'make', 'object'], 0, '`new Konto("Ada")` ruft den Konstruktor auf und liefert das neue Objekt.')],
        tasks: [PP('Was gibt das Programm aus?', ['class Zaehler {', '  constructor() {', '    this.wert = 0;', '  }', '  hoch() {', '    this.wert += 1;', '  }', '}', 'const z = new Zaehler();', 'z.hoch();', 'z.hoch();', 'console.log(z.wert);'], '2', 'Jedes hoch() erhöht wert dieses Objekts um 1.')]
      },
      {
        concept: 'err',
        parts: [
          C(['try {§Hier steht der Code, der schiefgehen könnte.', '  JSON.parse("{kaputt");§JSON.parse liest Text als Datenstruktur. Dieser Text ist kein gültiges JSON und löst einen Fehler aus.', '  console.log("das wird nie erreicht");§Nach dem Fehler springt das Programm direkt in den catch-Block.', '} catch (fehler) {§catch fängt den Fehler. fehler enthält Name und Meldung.', '  console.log("Fehler:", fehler.name);§Gibt aus: Fehler: SyntaxError', '} finally {§Läuft immer.', '  console.log("Fertig");§Ausgabe: Fertig', '}§Ende.'], 'try, catch und finally'),
          C(['function teile(a, b) {§Eine Funktion, die selbst einen Fehler melden darf.', '  if (b === 0) {§Prüft den unmöglichen Fall.', '    throw new Error("Durch 0 geht nicht");§throw löst absichtlich einen Fehler aus.', '  }§Ende von if.', '  return a / b;§Normale Rechnung.', '}§Ende der Funktion.', 'try {§Aufruf absichern.', '  console.log(teile(10, 0));§Löst den Fehler aus.', '} catch (e) {§Fängt ihn.', '  console.log(e.message);§Gibt aus: Durch 0 geht nicht', '}§Ende.'], 'Eigene Fehler auslösen mit throw')
        ],
        tips: [A.tip('Fehlermeldungen im Browser (F12, Konsole) nennen die Art und die Zeile, z. B. `TypeError: Cannot read properties of undefined`. Das heißt meist: Du greifst auf etwas zu, das gar nicht existiert.')],
        quiz: [A.q('Wozu dient `throw new Error("…")`?', ['Um absichtlich einen Fehler auszulösen', 'Um einen Fehler zu ignorieren', 'Um eine Variable zu löschen', 'Um eine Schleife zu beenden'], 0, 'So meldet eine Funktion, dass etwas Unmögliches verlangt wurde.')],
        tasks: []
      },
      {
        id: 'adv', stage: 4, title: 'Vertiefung: Asynchron und Webseiten steuern',
        goal: 'Du verstehst, warum JavaScript „nebenbei“ arbeiten kann und wie man damit Webseiten verändert.',
        parts: [
          A.text('Warten, ohne zu blockieren', 'Manches dauert: Daten aus dem Netz holen, eine Sekunde warten. JavaScript friert dabei nicht ein, sondern erledigt andere Dinge weiter und kommt **später** zurück. Dafür gibt es **Promises** und die Schreibweise **async/await**. `await` heißt: „Warte hier auf das Ergebnis, aber blockiere den Rest nicht.“'),
          C(['function warte(ms) {§Eine Funktion, die ein **Promise** liefert: ein Versprechen, dass später etwas fertig ist.', '  return new Promise((fertig) => setTimeout(fertig, ms));§setTimeout ruft fertig nach ms Millisekunden auf.', '}§Ende.', 'async function ablauf() {§async markiert eine Funktion, in der await erlaubt ist.', '  console.log("Start");§Läuft sofort.', '  await warte(500);§Pausiert **diese** Funktion 500 ms. Das übrige Programm läuft weiter.', '  console.log("500 ms später");§Läuft erst nach der Pause.', '}§Ende.', 'ablauf();§Startet den Ablauf.', 'console.log("Dieses Programm läuft einfach weiter");§Erscheint **vor** "500 ms später", denn ablauf() wartet nur in sich selbst.'], 'async und await', { noRun: true }),
          A.info('Dieses Beispiel hat bewusst keinen „Ausführen“-Knopf: Die Ausführungsumgebung dieser App sammelt Ausgaben nur bis zum Ende des Programms und würde die verspätete Ausgabe verpassen. Im Browser (Taste F12, dann der Reiter Konsole) oder mit Node.js läuft es wie beschrieben.'),
          A.text('Webseiten verändern (das DOM)', 'Im Browser ist eine Webseite ein Baum aus Elementen, das **DOM**. Mit JavaScript suchst du Elemente und änderst sie, reagierst auf Klicks und baust so interaktive Seiten.'),
          C(['const knopf = document.querySelector("#knopf");§Sucht das Element mit der id "knopf" auf der Seite.', 'const ausgabe = document.querySelector("#ausgabe");§Sucht das Ausgabefeld.', 'let zaehler = 0;§Merkt sich, wie oft geklickt wurde.', 'knopf.addEventListener("click", () => {§Registriert eine Funktion, die bei **jedem Klick** läuft (ein Ereignis, englisch event).', '  zaehler++;§Erhöht den Zähler um 1.', '  ausgabe.textContent = "Klicks: " + zaehler;§Ändert den sichtbaren Text im Ausgabefeld.', '});§Ende der Funktion und des Aufrufs.'], 'Auf Klicks reagieren', { noRun: true }),
          A.info('Dieses Beispiel braucht eine echte Webseite mit `<button id="knopf">` und `<p id="ausgabe">`. Probiere es in einer eigenen HTML-Datei aus.')
        ],
        tips: [],
        quiz: [A.q('Was bewirkt `await` in einer async-Funktion?', ['Die Funktion wartet auf das Ergebnis, ohne das restliche Programm zu blockieren', 'Das ganze Programm bleibt stehen', 'Der Fehler wird ignoriert', 'Die Funktion startet doppelt'], 0, 'await pausiert nur die eigene Funktion.'), A.q('Wofür steht „DOM“ im Browser?', ['Der Baum aus Elementen, aus dem eine Webseite besteht', 'Ein Datenbanktyp', 'Eine Programmiersprache', 'Ein Fehler'], 0, 'Document Object Model: Darüber greifst du von JavaScript aus auf die Seite zu.')],
        tasks: []
      }
    ]
  });
})();
