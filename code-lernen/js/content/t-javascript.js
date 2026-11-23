/* Kurs: JavaScript – 14 Module nach dem Java-/Python-Muster (Onlineshop, Login, Ticketsystem) */
(function () {
  'use strict';
  const A = window.Academy, C = (lines, h, o) => A.code('javascript', lines, h, o);
  const PP = (prompt, code, ans, hint, expl) => Object.assign(A.predict(prompt, code, ans, hint, expl), { lang: 'javascript' });
  A.moved['javascript-ops'] = 'javascript-vars'; // „Rechnen und Vergleichen“ ist in Modul 2 und 3 aufgegangen

  A.track({
    id: 'javascript', title: 'JavaScript', tag: 'JAVASCRIPT',
    desc: 'Die Sprache des Webs am durchgehenden Onlineshop-Projekt: von console.log, Variablen und Funktionen über Arrays, Klassen, Kapselung und Architektur bis zu Clean Code, Bug-Arena und async/await.',
    intro: 'JavaScript läuft in jedem Browser und mit Node.js auch auf dem Server. Wie in Java und Python zieht sich ein **Onlineshop für IT-Zubehör** als roter Faden durch alle 14 Module – ergänzt um **Benutzerverwaltung** und **IT-Ticketsystem**.\n\nDer große Vorteil hier: Bei jedem Codebeispiel gibt es den Knopf **„Ausprobieren und ändern“**, mit dem du den Code direkt im Browser starten und umbauen kannst. Außerdem schreibst du in vielen Modulen eigene Funktionen gegen echte Tests.',
    lessons: [
      /* ---------- 1. Erstes Programm ---------- */
      {
        concept: 'hello', standalone: true, domain: 'shop', stage: 1,
        title: 'Das erste Programm: eine Bestellbestätigung',
        goal: 'Du gibst Text und Werte mit console.log aus, setzt Kommentare, nutzt Template-Strings mit Backticks und weißt, wie JavaScript im Browser und in Node.js läuft.',
        terms: ['Quellcode', 'Interpreter', 'Syntaxfehler'],
        parts: [
          A.text('Der rote Faden dieses Kurses', 'Durch alle 14 Module wächst derselbe Onlineshop wie in Java und Python: Heute schreibt er eine Bestellbestätigung in die Konsole, danach speichert er Preise in Cent, berechnet Versandkosten und Rabatte, durchsucht Ticketlisten und wird schließlich zum sauberen 4-Klassen-Modell ausgebaut. Am Ende folgen **Clean Code**, die **Bug-Arena** und **async/await** für echte Webseiten.'),
          C([
            '// Bestellbestätigung für den Onlineshop§Ein Kommentar: Alles hinter // ignoriert JavaScript.',
            'console.log("Vielen Dank für deine Bestellung!");§console.log schreibt eine Zeile in die Konsole. Text steht in Anführungszeichen.',
            'console.log("Bestellnummer:", 10427);§Mehrere Werte mit Komma werden durch ein Leerzeichen getrennt.',
            'console.log("Artikel:", "Funkmaus", "Menge:", 2);',
            'console.log("Lieferung in", 2, "Werktagen");§Zahlen stehen ohne Anführungszeichen.'
          ], 'Die Bestellbestätigung', { praxis: 'Im Browser siehst du console.log in den Entwicklerwerkzeugen (Taste F12 → Konsole). Entwickler nutzen es täglich zum Prüfen von Abläufen und Daten.' }),
          A.text('Vom Quellcode zur Ausführung', 'JavaScript ist eine **interpretierte** Sprache (heute mit schnellem JIT-Compiler in der Engine wie V8 in Chrome und Node.js). Du schreibst **Quellcode** in eine `.js`-Datei – entweder für den Browser oder für Node.js (`node bestellung.js`). Ein **Syntaxfehler**, etwa eine fehlende Klammer, verhindert den Start der ganzen Datei.'),
          A.table(['', 'JavaScript', 'Java', 'Python'], [
            ['Ausgabe', '`console.log("Hallo");`', '`System.out.println("Hallo");`', '`print("Hallo")`'],
            ['Kommentar', '`// Text`', '`// Text`', '`# Text`'],
            ['Blöcke', 'geschweifte Klammern `{ … }`', 'geschweifte Klammern `{ … }`', 'Einrückung nach `:`'],
            ['Laufzeit', 'Browser oder Node.js', 'JDK / JVM', 'Python-Interpreter']
          ], 'Dasselbe in Java und Python', 'Weiter zum Vergleich: [Java, Modul 1](/code-lernen/kurs/java/hello/) und [Python, Modul 1](/code-lernen/kurs/python/hello/).')
        ],
        tips: [
          A.warn('JavaScript unterscheidet Groß- und Kleinschreibung: `console.log` funktioniert, `Console.Log` wirft einen Fehler.'),
          A.tip('Semikolons am Zeilenende sind in JavaScript meist optional, machen aber klar, wo eine Anweisung endet. Bleib bei einem Stil.')
        ],
        quiz: [
          A.q('Womit gibst du in JavaScript eine Zeile in der Konsole aus?', ['console.log()', 'print()', 'System.out.println()', 'echo()'], 0, 'console.log() ist JavaScript; print() ist Python, System.out.println() ist Java.'),
          A.q('Was passiert bei einer fehlenden schließenden Klammer in Zeile 3?', ['Keine Zeile läuft, JavaScript meldet einen SyntaxError', 'Zeilen 1 und 2 laufen noch, dann bricht Zeile 3 ab', 'Die Engine ergänzt die Klammer stillschweigend selbst', 'Nur Zeile 3 wird beim Ausführen übersprungen'], 0, 'Syntaxfehler werden vor dem Start der Ausführung gemeldet.'),
          A.q('Was gibt `console.log("Menge:", 2)` aus?', ['Menge: 2', 'Menge:2', '"Menge:", 2', 'Menge: "2"'], 0, 'Mehrere Argumente trennt console.log automatisch mit einem Leerzeichen.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['console.log("Bestellung", 10427);', 'console.log("Summe:", 3998, "Cent");'], 'Bestellung 10427\nSumme: 3998 Cent', 'Jeder console.log-Aufruf erzeugt eine neue Zeile.', 'Zwei Aufrufe, zwei Zeilen, Werte mit Leerzeichen getrennt.'),
          A.fill('Gib die Lieferzeit in der Konsole aus.', '{{console.log}}("Lieferung in 2 Werktagen");', 'Objekt console, Methode log.'),
          A.bug('Shop: Das Programm startet gar nicht (SyntaxError).', 'javascript', [
            'console.log("Vielen Dank!");',
            'console.log("Bestellnummer:", 10427;',
            'console.log("Versand: kostenlos");'
          ], { line: 1, kind: 'syntax', fixes: [
            'console.log("Bestellnummer:", 10427);',
            'console.log("Bestellnummer:" 10427);',
            'console.log["Bestellnummer:", 10427];',
            'Console.log("Bestellnummer:", 10427);'
          ], expect: 'Vielen Dank!\nBestellnummer: 10427\nVersand: kostenlos' }, 'Zähle öffnende und schließende Klammern in Zeile 2.', 'In Zeile 2 fehlt die schließende runde Klammer vor dem Semikolon.')
        ]
      },

      /* ---------- 2. Variablen, Datentypen, Rechnen ---------- */
      {
        concept: 'vars', standalone: true, domain: 'shop', stage: 1,
        title: 'Variablen, Datentypen und Umwandlung: Preise, Mengen, Eingaben',
        goal: 'Du nutzt const und let statt var, rechnest Geldbeträge exakt in Cent, kennst === gegen ==, wandelst Formulareingaben mit Number() um und baust Texte mit Template-Strings.',
        terms: ['Variable', 'Datentyp', ['Dynamische Typisierung', 'dynamisch typisiert'], 'Konstante', 'Modulo', ['Parsen', 'parsen'], ['String-Verkettung (Konkatenation)', 'Verkettung']],
        parts: [
          A.text('const als Standard, let für veränderliche Werte', 'JavaScript ist **dynamisch typisiert**: Der **Datentyp** gehört zum Wert, nicht zur **Variable**. Du legst Variablen mit `const` (**Konstante**, darf nicht neu zugewiesen werden) oder `let` (darf sich ändern) an. Das alte `var` hat verwirrende Gültigkeitsregeln und wird in modernem Code nicht mehr benutzt.'),
          C([
            'const artikel = "Funkmaus";§Text (string). const, weil der Name fest bleibt.',
            'const preisInCent = 1999;§Zahl (number). Preise immer in Cent, damit kein Rundungsfehler entsteht.',
            'let menge = 2;§let, weil die Menge gleich erhöht wird.',
            'const lieferbar = true;§Wahrheitswert (boolean): true oder false.',
            'menge = menge + 1;§Rechts zuerst rechnen (2 + 1), dann speichern: 3.',
            'const summeInCent = preisInCent * menge;',
            'console.log(`${menge} x ${artikel}: ${summeInCent} Cent`);§Template-String in Backticks (`...`): ${...} setzt Werte direkt ein.',
            'console.log(typeof preisInCent, typeof artikel, typeof lieferbar);§typeof verrät den Datentyp.'
          ], 'Ein Artikel in Variablen', { praxis: 'Template-Strings in Backticks sind der moderne Standard für Meldungen, URLs und HTML-Ausgaben – viel lesbarer als Verkettung mit +.' }),
          C([
            'const summeInCent = 3998;',
            'const euro = Math.floor(summeInCent / 100);§Math.floor rundet ab: 39 Euro.',
            'const cent = summeInCent % 100;§Modulo (%) liefert den Rest: 98 Cent.',
            'console.log(`${euro},${cent} Euro`);',
            'console.log(0.1 + 0.2);§0.30000000000000004 – deshalb Geld immer in Cent!',
            'console.log(5 == "5", 5 === "5");§== wandelt heimlich um (true), === prüft Wert UND Typ (false). Immer === nehmen!'
          ], 'Rechnen, Modulo und === vs. ==', { praxis: 'In JavaScript hat jede Zahl denselben Typ number (64-Bit-Fließkomma). Deshalb sind Cent-Beträge und striktes === Pflicht in jedem Webshop.' }),
          C([
            'const eingabe = "3";§Jedes HTML-Inputfeld liefert immer einen String (Text)!',
            'const menge = Number(eingabe);§Parsen: Number() macht aus "3" die Zahl 3.',
            'console.log("Falsch (Verkettung):", eingabe + 2);§Text + Zahl klebt zusammen: "32"!',
            'console.log("Richtig (gerechnet):", menge + 2);§Zahl + Zahl addiert: 5.'
          ], 'Formulareingaben parsen', { praxis: 'Der Klassiker in Webformularen: Vergisst man Number(), wird aus Menge "2" plus 1 plötzlich "21" statt 3.' }),
          A.table(['JavaScript', 'Java', 'Python'], [
            ['`const x = 5;` / `let y = 2;`', '`final int x = 5;` / `int y = 2;`', '`X = 5` / `y = 2`'],
            ['`Math.floor(a / b)`', '`a / b` (bei `int`)', '`a // b`'],
            ['`===` / `!==`', '`==` / `!=`', '`==` / `!=`'],
            ['`` `${name}: ${cent}` ``', '`name + ": " + cent`', '`f"{name}: {cent}"`']
          ], 'Dasselbe in Java und Python', 'Weiter zum Vergleich: [Java, Modul 2](/code-lernen/kurs/java/vars/) und [Python, Modul 2](/code-lernen/kurs/python/vars/).')
        ],
        tips: [
          A.warn('Nutze **immer `===` und `!==`**. Das lockere `==` liefert böse Überraschungen (`0 == ""` ist `true`, `false == "0"` ist `true`).'),
          A.warn('`const` als Standard, `let` nur wenn der Wert sich wirklich ändert – und niemals `var`.')
        ],
        quiz: [
          A.q('Was ergibt `"5" + 3` in JavaScript?', ['"53" (Text)', '8 (Zahl)', 'Einen SyntaxError', 'NaN'], 0, 'Sobald eine Seite Text ist, wird + zur String-Verkettung.'),
          A.q('Was ist der Unterschied zwischen `==` und `===`?', ['=== prüft Wert und Typ, == wandelt Typen vorher um', '== prüft Wert und Typ, === vergleicht nur Zahlen', '=== ist nur für Texte erlaubt, == nur für Zahlen', 'Beide arbeiten identisch, === ist nur neuer'], 0, '5 === "5" ist false, 5 == "5" ist true. Deshalb immer ===.'),
          A.q('Was passiert bei `const versand = 495; versand = 0;`?', ['TypeError: Eine const-Variable darf nicht neu zugewiesen werden', 'versand wird still auf 0 geändert, const ist nur ein Kommentar', 'versand bleibt ohne Fehlermeldung bei 495', 'versand wird zu 4950 zusammengefügt'], 0, 'Für veränderliche Werte braucht es let.'),
          A.q('Wie zerlegst du `3998` Cent in ganze Euro und Rest-Cent?', ['Math.floor(3998 / 100) und 3998 % 100', '3998 / 100 und 3998 * 100', '3998 % 100 und Math.floor(3998 / 100)', 'Number(3998 / 100) und 3998 - 100'], 0, 'Math.floor schneidet Nachkommastellen ab (39), % liefert den Rest (98).')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['const preis = 1999;', 'let menge = 2;', 'menge += 1;', 'console.log(preis * menge);'], '5997', 'menge wird von 2 auf 3 erhöht, dann mit 1999 multipliziert.', '1999 * 3 = 5997.'),
          A.js('Schreibe `gesamtInCent(preisInCent, menge)`, die den Zeilenbetrag zurückgibt.', 'function gesamtInCent(preisInCent, menge) {\n  // dein Code\n}', [
            { fn: 'gesamtInCent', args: [1999, 2], expect: 3998 },
            { fn: 'gesamtInCent', args: [999, 3], expect: 2997 },
            { fn: 'gesamtInCent', args: [4950, 0], expect: 0 }
          ], 'Multipliziere preisInCent und menge und gib das Ergebnis mit return zurück.', 'function gesamtInCent(preisInCent, menge) {\n  return preisInCent * menge;\n}'),
          A.bug('Bestellformular: Der Kunde tippt "2" ein und klickt auf +1. Angezeigt wird "21" statt 3.', 'javascript', [
            'const eingabe = "2";',
            'const neu = eingabe + 1;',
            'console.log("Neue Menge:", neu);'
          ], { line: 1, kind: 'logik', fixes: [
            'const neu = Number(eingabe) + 1;',
            'const neu = eingabe + "1";',
            'const neu = String(eingabe) + 1;',
            'const neu = eingabe - 1;'
          ], expect: 'Neue Menge: 3' }, 'Welchen Typ hat eingabe, und was macht + mit einem String?', 'eingabe ist Text ("2"). Erst Number(eingabe) macht daraus die Zahl 2, sodass 2 + 1 = 3 herauskommt.')
        ]
      },

      /* ---------- 3. Verzweigungen ---------- */
      {
        concept: 'cond', standalone: true, domain: 'shop', stage: 1,
        title: 'Verzweigungen: Versandkosten, Altersfreigabe, Login-Sperre',
        goal: 'Du steuerst Business-Logik mit if/else if/else, switch und Bedingungsoperator, verknüpfst Bedingungen mit &&, || und ! und prüfst Grenzwerte sauber.',
        terms: ['Verzweigung', 'Bedingung', 'Grenzwert', 'Bedingungsoperator'],
        parts: [
          A.text('Entscheidungen im Shop und beim Login', 'Eine **Verzweigung** entscheidet anhand einer **Bedingung** (`true` oder `false`), welcher Codeblock läuft. Die Reihenfolge bei `else if` ist entscheidend: Der erste wahre Zweig gewinnt, alle folgenden werden übersprungen. Prüfe **Grenzwerte** immer genau („ab 50 Euro“ heißt `>= 5000`).'),
          C([
            'const VERSANDFREI_AB = 5000;',
            'const warenwert = 4790;',
            'const istPrime = false;',
            'let versand;',
            'if (warenwert >= VERSANDFREI_AB || istPrime) {§|| heißt ODER: ab 50 Euro ODER Prime-Mitglied.',
            '  versand = 0;',
            '} else {',
            '  versand = 495;',
            '}',
            'console.log("Versand:", versand, "Cent");'
          ], 'Versandkosten mit ODER (||)', { praxis: 'Versandregeln, Rabattstufen und Freigaben sind klassische if/else-Ketten. Ein falsches > statt >= am Grenzwert 5000 kostet sofort Kundenvertrauen.' }),
          C([
            'const fehlversuche = 3;',
            'const passwortRichtig = true;',
            'if (fehlversuche >= 3) {§Sperre zuerst prüfen! Sonst kommt ein gesperrtes Konto mit richtigem Passwort rein.',
            '  console.log("Konto gesperrt");',
            '} else if (passwortRichtig) {',
            '  console.log("Willkommen");',
            '} else {',
            '  console.log("Passwort falsch");',
            '}'
          ], 'Login mit Sperre', { praxis: 'Bei Sicherheitsprüfungen steht die strengste Ablehnung immer ganz oben – so kann sie durch keinen späteren Zweig ausgehebelt werden.' }),
          C([
            'const prio = 2;',
            'let reaktion;',
            'switch (prio) {§switch vergleicht prio strikt (===) gegen feste Fälle.',
            '  case 1: reaktion = "sofort"; break;§break beendet den switch! Ohne break läuft der nächste case mit.',
            '  case 2: reaktion = "4 Stunden"; break;',
            '  case 3: reaktion = "1 Tag"; break;',
            '  default: reaktion = "1 Woche";',
            '}',
            'const statusText = prio <= 2 ? "dringend" : "normal";§Bedingungsoperator ? : für eine kurze Entweder-oder-Zuweisung.',
            'console.log(reaktion, "-", statusText);'
          ], 'switch und Bedingungsoperator (? :)', { praxis: 'Feste Statuswerte (Ticket-Priorität, Bestellstatus, Benutzerrolle) lassen sich mit switch übersichtlich abbilden.' }),
          A.table(['JavaScript', 'Java', 'Python'], [
            ['`if (x >= 5000) { … } else if …`', '`if (x >= 5000) { … } else if …`', '`if x >= 5000: … elif …`'],
            ['`&&`, `||`, `!`', '`&&`, `||`, `!`', '`and`, `or`, `not`'],
            ['`cond ? a : b`', '`cond ? a : b`', '`a if cond else b`']
          ], 'Dasselbe in Java und Python', 'Weiter zum Vergleich: [Java, Modul 3](/code-lernen/kurs/java/cond/) und [Python, Modul 3](/code-lernen/kurs/python/cond/).')
        ],
        tips: [
          A.warn('`if (x = 5)` weist 5 zu statt zu vergleichen – und `5` gilt in JavaScript als wahr (**truthy**)! Immer `===` schreiben.'),
          A.warn('Vergiss im `switch` nie das `break;` – sonst rutscht die Ausführung in den nächsten `case` weiter (Fall-through).')
        ],
        quiz: [
          A.q('Was passiert im `switch`, wenn am Ende eines `case` das `break;` fehlt?', ['Die Anweisungen des nächsten case laufen zusätzlich mit (Fall-through)', 'JavaScript bricht sofort mit einem SyntaxError ab', 'Der switch springt automatisch direkt zum default-Zweig', 'Die Variable wird auf undefined zurückgesetzt'], 0, 'Ohne break endet der switch nicht, sondern fällt in den nächsten Fall durch.'),
          A.q('`warenwert = 5000`, `istPrime = false`. Was liefert `warenwert >= 5000 || istPrime`?', ['true', 'false', '5000', 'undefined'], 0, 'Bei || genügt eine wahre Seite. 5000 >= 5000 ist true.'),
          A.q('Wofür steht `const text = lager > 0 ? "auf Lager" : "ausverkauft";`?', ['Kurzform von if/else für einen Wert', 'Prüfung, ob lager definiert oder undefined ist', 'Eine Schleife, die läuft solange lager > 0 gilt', 'Eine Funktionsdefinition mit zwei Parametern'], 0, 'Bedingung ? WertWennWahr : WertWennFalsch.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['const warenwert = 5000;', 'const versand = warenwert >= 5000 ? 0 : 495;', 'console.log(warenwert + versand);'], '5000', 'Prüfe den Grenzwert 5000 genau.', '5000 >= 5000 ist true, also versand = 0, Ausgabe 5000.'),
          A.js('Schreibe `versandInCent(warenwert, istPrime)`: 0 Cent ab 5000 Cent Warenwert oder wenn istPrime true ist, sonst 495.', 'function versandInCent(warenwert, istPrime) {\n  // dein Code\n}', [
            { fn: 'versandInCent', args: [4999, false], expect: 495 },
            { fn: 'versandInCent', args: [5000, false], expect: 0 },
            { fn: 'versandInCent', args: [1200, true], expect: 0 }
          ], 'Nutze || (ODER) für beide Bedingungen.', 'function versandInCent(warenwert, istPrime) {\n  return (warenwert >= 5000 || istPrime) ? 0 : 495;\n}'),
          A.bug('Service-Desk: Ein Ticket mit Priorität 2 bekommt „1 Tag“ statt „4 Stunden“.', 'javascript', [
            'const prio = 2;',
            'let reaktion = "";',
            'switch (prio) {',
            '  case 1: reaktion = "sofort"; break;',
            '  case 2: reaktion = "4 Stunden";',
            '  case 3: reaktion = "1 Tag"; break;',
            '  default: reaktion = "1 Woche";',
            '}',
            'console.log(reaktion);'
          ], { line: 4, kind: 'logik', fixes: [
            'case 2: reaktion = "4 Stunden"; break;',
            'case 2: reaktion = "4 Stunden"; continue;',
            'case 2: reaktion += "4 Stunden";',
            'case 2: break; reaktion = "4 Stunden";'
          ], expect: '4 Stunden' }, 'Warum wird case 3 noch ausgeführt, obwohl prio 2 ist?', 'In case 2 fehlt break; – deshalb überschreibt case 3 die Variable reaktion.')
        ]
      },

      /* ---------- 4. Schleifen ---------- */
      {
        concept: 'loops', standalone: true, domain: 'shop', stage: 2,
        title: 'Schleifen: Warenkorb, Login-Versuche, Ticketlisten',
        goal: 'Du wählst sicher zwischen for, while, do…while und for…of, steuerst Durchläufe mit break und continue und vermeidest Off-by-one-Fehler.',
        terms: ['Schleife', 'Endlosschleife', 'Off-by-one-Fehler'],
        parts: [
          A.text('Vier Schleifen, vier Einsatzfälle', 'Eine **Schleife** wiederholt einen Block, bis eine Bedingung nicht mehr stimmt. In JavaScript nutzt du im Alltag vor allem `for…of` (für alle Elemente eines Arrays), `for` (wenn du den Index brauchst) und `while` (wenn erst zur Laufzeit klar ist, wann Schluss ist).'),
          C([
            'const preise = [1999, 999, 3490];',
            'let summe = 0;',
            'for (const preis of preise) {§for…of geht jedes Element sauber ohne Index durch.',
            '  summe += preis;',
            '}',
            'console.log("Warenkorb:", summe, "Cent");'
          ], 'for…of: Warenkorb summieren', { praxis: 'Sobald du keinen Index brauchst, ist for…of die sicherste Schleife: kein Off-by-one-Fehler möglich.' }),
          C([
            'const eingaben = ["1234", "geheim", "Sommer2024!"];',
            'let i = 0;',
            'while (i < eingaben.length && i < 3) {§Kopfgesteuert: prüft vor jedem Versuch.',
            '  if (eingaben[i] === "Sommer2024!") {',
            '    console.log("Anmeldung erfolgreich bei Versuch", i + 1);',
            '    break;§break verlässt die Schleife sofort.',
            '  }',
            '  i++;§Zähler erhöhen – ohne diese Zeile entsteht eine Endlosschleife!',
            '}'
          ], 'while mit break: Login-Versuche begrenzen', { praxis: 'Bei Login-Prüfungen oder Wiederholungen nach Netzwerkfehlern ist vorher nicht bekannt, welcher Versuch klappt – genau dafür gibt es while.' }),
          C([
            'const bestaende = [35, 0, 14, 0, 8];',
            'let lieferbar = 0;',
            'for (let i = 0; i < bestaende.length; i++) {§Index läuft von 0 bis length - 1 (<, nicht <=!).',
            '  if (bestaende[i] === 0) continue;§continue überspringt den Rest dieses Durchlaufs.',
            '  lieferbar++;',
            '}',
            'console.log("Lieferbare Artikel:", lieferbar);'
          ], 'for mit Index und continue: ausverkaufte Artikel überspringen', { praxis: 'Im Shop-Katalog filtert genau dieses Muster ausverkaufte Ware heraus oder zählt, wie viele Produkte sofort versendbar sind.' }),
          A.table(['JavaScript', 'Java', 'Python'], [
            ['`for (const p of preise)`', '`for (int p : preise)`', '`for p in preise:`'],
            ['`for (let i = 0; i < n; i++)`', '`for (int i = 0; i < n; i++)`', '`for i in range(n):`'],
            ['`while (cond) { … }`', '`while (cond) { … }`', '`while cond:`']
          ], 'Dasselbe in Java und Python', 'Weiter zum Vergleich: [Java, Modul 4](/code-lernen/kurs/java/loops/) und [Python, Modul 4](/code-lernen/kurs/python/loops/).')
        ],
        tips: [
          A.warn('Bei `for (let i = 0; i <= arr.length; i++)` ist `arr[arr.length]` in JavaScript `undefined` – ein **Off-by-one-Fehler**, der beim Rechnen zu `NaN` führt! Immer `< arr.length`.')
        ],
        quiz: [
          A.q('Welche Schleife wählst du am besten, um alle Artikelpreise eines Arrays ohne Index zu summieren?', ['for (const p of preise)', 'while (true)', 'do … while (false)', 'switch (preise)'], 0, 'for…of liest jedes Element direkt und schließt Indexfehler aus.'),
          A.q('Was bewirkt `continue;` mitten in einer Schleife?', ['Es bricht nur den aktuellen Durchlauf ab und startet den nächsten', 'Es beendet die gesamte Schleife sofort und springt dahinter', 'Es setzt den Schleifenzähler wieder zurück auf 0', 'Es startet das gesamte Programm von vorne'], 0, 'break beendet die ganze Schleife, continue überspringt nur den Rest des aktuellen Durchlaufs.'),
          A.q('Wie oft läuft `for (let i = 0; i < 4; i++)`?', ['4-mal (i = 0, 1, 2, 3)', '3-mal (i = 0, 1, 2)', '5-mal (i = 0, 1, 2, 3, 4)', 'Unendlich oft'], 0, 'Bei i = 4 ist 4 < 4 falsch, die Schleife endet nach 4 Durchläufen.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['const preise = [1000, 2500, 500];', 'let summe = 0;', 'for (const p of preise) {', '  if (p >= 1000) summe += p;', '}', 'console.log(summe);'], '3500', 'Addiere nur Preise ab 1000.', '1000 + 2500 = 3500; 500 wird ignoriert.'),
          A.js('Schreibe `zaehleLieferbar(bestaende)`: zählt, wie viele Einträge im Array größer als 0 sind.', 'function zaehleLieferbar(bestaende) {\n  // dein Code\n}', [
            { fn: 'zaehleLieferbar', args: [[35, 0, 14, 0, 8]], expect: 3 },
            { fn: 'zaehleLieferbar', args: [[0, 0]], expect: 0 },
            { fn: 'zaehleLieferbar', args: [[]], expect: 0 }
          ], 'Zähle in einer for…of-Schleife eine Variable hoch, wenn der Wert > 0 ist.', 'function zaehleLieferbar(bestaende) {\n  let n = 0;\n  for (const b of bestaende) { if (b > 0) n++; }\n  return n;\n}'),
          A.bug('Warenkorb: Die Summe ergibt NaN statt 6488.', 'javascript', [
            'const preise = [1999, 999, 3490];',
            'let summe = 0;',
            'for (let i = 0; i <= preise.length; i++) {',
            '  summe += preise[i];',
            '}',
            'console.log(summe);'
          ], { line: 2, kind: 'logik', fixes: [
            'for (let i = 0; i < preise.length; i++) {',
            'for (let i = 1; i <= preise.length; i++) {',
            'for (let i = 0; i < preise.length - 1; i++) {',
            'for (let i = 0; i <= preise.length; i--) {'
          ], expect: '6488' }, 'Was steht an Index preise[3], und was ergibt 6488 + undefined?', 'Bei i === 3 ist preise[3] undefined, und Zahl + undefined ergibt NaN (Off-by-one-Fehler). Richtig ist i < preise.length.')
        ]
      },

      /* ---------- 5. Funktionen ---------- */
      {
        concept: 'funcs', standalone: true, domain: 'shop', stage: 2,
        title: 'Funktionen: Versand, Rabatt und Prüfungen als Bausteine',
        goal: 'Du trennst Berechnung (return) sauber von Ausgabe (console.log), nutzt Standardparameter und Pfeilfunktionen und kennst den Unterschied zwischen lokalem und äußerem Scope.',
        terms: ['Funktion', 'Parameter', 'Rückgabewert', 'Lokale Variable', 'Lambda'],
        parts: [
          A.text('Rechnen statt ausgeben: return vs. console.log', 'Eine gute **Funktion** nimmt **Parameter** entgegen, rechnet ein Ergebnis aus und liefert es mit `return` als **Rückgabewert** zurück – statt direkt auf der Konsole zu drucken. Nur so kannst du das Ergebnis weiterverarbeiten, im Checkout anzeigen und automatisch testen.'),
          C([
            'function rabattInCent(summeInCent, prozent = 10) {§Standardparameter: ohne 2. Argument gelten 10 %.',
            '  if (summeInCent < 10000) return 0;§Unter 100 Euro kein Rabatt.',
            '  return Math.floor(summeInCent * prozent / 100);§return liefert den Wert an den Aufrufer.',
            '}',
            'const alsEuro = (cent) => `${Math.floor(cent / 100)},${String(cent % 100).padStart(2, "0")} Euro`;§Pfeilfunktion (Lambda): kurz und lesbar.',
            'const summe = 12500;',
            'const rabatt = rabattInCent(summe);§Ergebnis lässt sich direkt weiterrechnen.',
            'console.log("Zu zahlen:", alsEuro(summe - rabatt));'
          ], 'Funktionen mit return, Standardwert und Pfeilfunktion', { praxis: 'In jeder Web-App sind Preis-, Steuer- und Versandfunktionen reine Bausteine mit return. Die Oberfläche ruft sie nur auf und zeigt das Ergebnis an.' }),
          A.table(['JavaScript', 'Java', 'Python'], [
            ['`function f(a, b = 10) { return …; }`', '`static int f(int a, int b) { return …; }`', '`def f(a, b=10): return …`'],
            ['`(x) => x * 2` (Pfeilfunktion)', '`x -> x * 2` (Lambda)', '`lambda x: x * 2`'],
            ['ohne `return` → `undefined`', '`void` (kein Rückgabewert)', 'ohne `return` → `None`']
          ], 'Dasselbe in Java und Python', 'Weiter zum Vergleich: [Java, Modul 5](/code-lernen/kurs/java/funcs/) und [Python, Modul 5](/code-lernen/kurs/python/funcs/).')
        ],
        tips: [
          A.warn('Eine Funktion ohne `return` gibt immer `undefined` zurück. Wer `console.log` statt `return` schreibt, kann mit dem Ergebnis nicht weiterrechnen.'),
          A.tip('Variablen, die innerhalb einer Funktion mit `let` oder `const` angelegt werden, sind **lokale Variablen** – außerhalb der Funktion existieren sie nicht.')
        ],
        quiz: [
          A.q('Was gibt eine JavaScript-Funktion zurück, wenn sie kein `return` enthält?', ['undefined', 'null', '0', 'false'], 0, 'Ohne return liefert jeder Funktionsaufruf automatisch undefined.'),
          A.q('Warum sollte `rabattInCent()` das Ergebnis mit `return` liefern statt mit `console.log`?', ['Damit der Aufrufer damit weiterrechnen und es testen kann', 'Weil console.log innerhalb von Funktionen verboten ist', 'Weil return Zahlen automatisch in Euro umrechnet', 'Weil Pfeilfunktionen kein console.log unterstützen'], 0, 'Trennung von Verarbeitung und Ausgabe: return macht die Funktion wiederverwendbar.'),
          A.q('Was liefert `const doppelt = (n) => n * 2; doppelt(6);`?', ['12', 'undefined', 'n * 2', '62'], 0, 'Bei einer einzeiligen Pfeilfunktion ohne geschweifte Klammern wird der Ausdruck direkt zurückgegeben.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['function rabatt(summe) {', '  return summe >= 10000 ? Math.floor(summe / 10) : 0;', '}', 'console.log(rabatt(9999), rabatt(15000));'], '0 1500', 'Prüfe beide Beträge gegen die Grenze 10000.', '9999 liegt unter 10000 (0), 15000 ergibt 1500.'),
          A.js('Schreibe `endbetragInCent(summe)`: ab 10000 Cent 10 % Rabatt (abgerundet mit Math.floor), sonst kein Rabatt.', 'function endbetragInCent(summe) {\n  // dein Code\n}', [
            { fn: 'endbetragInCent', args: [8000], expect: 8000 },
            { fn: 'endbetragInCent', args: [10000], expect: 9000 },
            { fn: 'endbetragInCent', args: [25005], expect: 22505 }
          ], 'Ziehe Math.floor(summe * 10 / 100) ab, wenn summe >= 10000.', 'function endbetragInCent(summe) {\n  const r = summe >= 10000 ? Math.floor(summe * 10 / 100) : 0;\n  return summe - r;\n}'),
          A.bug('Kasse: Der Endbetrag wird als NaN angezeigt, weil rabatt() nichts zurückgibt.', 'javascript', [
            'function rabatt(summe) {',
            '  const r = summe >= 10000 ? Math.floor(summe / 10) : 0;',
            '  console.log("Rabatt:", r);',
            '}',
            'console.log("Zu zahlen:", 12000 - rabatt(12000));'
          ], { line: 2, kind: 'logik', fixes: [
            'return r;',
            'console.log(r);',
            'let ergebnis = r;',
            'return summe;'
          ], expect: 'Zu zahlen: 10800' }, 'Was liefert rabatt(12000) zurück, wenn kein return drinsteht?', 'Ohne return liefert rabatt() undefined, und 12000 - undefined ergibt NaN. Richtig ist return r;.')
        ]
      },

      /* ---------- 6. Arrays, Objekte & 4 Standardalgorithmen ---------- */
      {
        concept: 'coll', standalone: true, domain: 'shop', stage: 2,
        title: 'Arrays, Objekte und die vier Standardalgorithmen',
        goal: 'Du verwaltest Artikel und Tickets in Arrays und Objekten, setzt die vier IHK-Standardalgorithmen (Summieren, Filtern/Zählen, Min/Max, Suchen) um und nutzt map, filter und reduce.',
        terms: ['Liste', 'Lineare Suche'],
        parts: [
          A.text('Die vier IHK-Kernmuster an echten Daten', 'Ob Warenkorb, Lagerliste oder Service-Desk: Fast jede Prüfungsaufgabe zu Listen baut auf denselben vier Mustern auf – **Summieren**, **Filtern/Zählen**, **Minimum/Maximum finden** und **Suchen** (**lineare Suche**). In JavaScript kombinierst du dazu **Arrays** (`[...]`) mit **Objekten** (`{ name: "Funkmaus", preis: 1999 }`).'),
          C([
            'const artikel = [§Ein Array (Liste) aus Artikel-Objekten.',
            '  { nr: 1001, name: "USB-C-Kabel", preis: 999, lager: 120 },',
            '  { nr: 1002, name: "Funkmaus", preis: 1999, lager: 35 },',
            '  { nr: 1003, name: "Tastatur", preis: 4950, lager: 0 },',
            '  { nr: 1005, name: "Headset", preis: 3490, lager: 14 }',
            '];',
            '// 1. Summieren + 2. Zählen (nur lieferbare)',
            'let lagerwert = 0, lieferbar = 0;',
            'for (const a of artikel) {',
            '  if (a.lager > 0) { lagerwert += a.preis * a.lager; lieferbar++; }',
            '}',
            '// 3. Minimum finden: immer mit dem ersten Element starten!',
            'let guenstigster = artikel[0];',
            'for (const a of artikel) {',
            '  if (a.preis < guenstigster.preis) guenstigster = a;',
            '}',
            '// 4. Lineare Suche nach Artikelnummer',
            'let fund = null;',
            'for (const a of artikel) { if (a.nr === 1002) { fund = a; break; } }',
            'console.log(lieferbar, guenstigster.name, fund.name);'
          ], 'Alle vier IHK-Standardalgorithmen im Shop', { praxis: 'Genau diese vier Muster bilden die Grundlage für Warenkorb-Summen, Suchfilter, „Günstigster Preis“ und Artikel-Suche per Nummer.' }),
          C([
            'const tickets = [',
            '  { id: 501, titel: "Drucker", prio: 3, status: "offen" },',
            '  { id: 502, titel: "Server down", prio: 1, status: "in Arbeit" },',
            '  { id: 504, titel: "VPN", prio: 2, status: "offen" }',
            '];',
            'const offene = tickets.filter((t) => t.status === "offen");§filter behält passende Elemente.',
            'const titel = offene.map((t) => t.titel);§map wandelt jedes Element um.',
            'const prioSumme = tickets.reduce((s, t) => s + t.prio, 0);§reduce fasst zu einem Wert zusammen.',
            'console.log(titel.join(", "), "| Prio-Summe:", prioSumme);'
          ], 'Kurzform in modernem JavaScript: filter, map, reduce', { praxis: 'In React-, Vue- und Node.js-Projekten ersetzen filter, map und reduce viele handgeschriebene Schleifen.' }),
          A.table(['JavaScript', 'Java', 'Python'], [
            ['`arr.push(x)` / `arr.length`', '`list.add(x)` / `list.size()`', '`liste.append(x)` / `len(liste)`'],
            ['`{ name: "Maus", preis: 1999 }`', 'eigene Klasse / `HashMap`', '`{"name": "Maus", "preis": 1999}`'],
            ['`arr.filter(…).map(…)`', '`list.stream().filter(…).map(…)`', '`[… for x in liste if …]`']
          ], 'Dasselbe in Java und Python', 'Weiter zum Vergleich: [Java, Modul 6](/code-lernen/kurs/java/coll/) und [Python, Modul 6](/code-lernen/kurs/python/coll/).')
        ],
        tips: [
          A.warn('Beim Minimum-Suchen **niemals** mit `let min = 0;` starten – sonst bleibt `min` bei positiven Preisen für immer 0! Immer mit `liste[0]` starten.')
        ],
        quiz: [
          A.q('Warum startet man beim Suchen des günstigsten Preises mit `let min = preise[0];` statt mit `0`?', ['Weil kein positiver Preis kleiner als 0 ist und min sonst 0 bliebe', 'Weil 0 in JavaScript kein gültiger Datentyp number ist', 'Weil Arrays in JavaScript keine 0 enthalten dürfen', 'Weil preise[0] automatisch immer der kleinste Wert ist'], 0, 'Der Startwert muss ein echter Kandidat aus dem Array sein.'),
          A.q('Was liefert `tickets.filter((t) => t.prio === 1)`?', ['Ein neues Array mit allen Tickets der Priorität 1', 'Nur das erste Ticket mit Priorität 1 als Objekt', 'Die Anzahl der Tickets mit Priorität 1 als Zahl', 'Verändert das bestehende Array ohne Rückgabewert'], 0, 'filter erzeugt immer ein neues Array mit den passenden Elementen.'),
          A.q('Woran erkennst du, dass `arr.length` kein Methodenaufruf ist?', ['Es stehen keine Klammern dahinter', 'Es beginnt mit einem Großbuchstaben', 'Es steht immer hinter einem return', 'Es liefert immer true oder false'], 0, 'length ist eine Eigenschaft, push() dagegen eine Methode.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', ['const preise = [1999, 999, 3490];', 'const klein = preise.filter((p) => p < 2000);', 'console.log(klein.length, klein[1]);'], '2 999', 'Welche Werte sind < 2000, und welcher steht an Index 1?', 'klein ist [1999, 999]: Länge 2, Index 1 ist 999.'),
          A.js('Schreibe `guenstigsterPreis(preise)`: gibt den kleinsten Preis aus einem nicht-leeren Array zurück.', 'function guenstigsterPreis(preise) {\n  // dein Code\n}', [
            { fn: 'guenstigsterPreis', args: [[1999, 4950, 999, 3490]], expect: 999 },
            { fn: 'guenstigsterPreis', args: [[22900]], expect: 22900 },
            { fn: 'guenstigsterPreis', args: [[500, 1200, 300]], expect: 300 }
          ], 'Starte mit preise[0] und vergleiche jedes Element.', 'function guenstigsterPreis(preise) {\n  let min = preise[0];\n  for (const p of preise) { if (p < min) min = p; }\n  return min;\n}'),
          A.bug('Preisvergleich: Der Shop zeigt 0 Cent als günstigsten Preis, obwohl kein Artikel kostenlos ist.', 'javascript', [
            'const preise = [1999, 4950, 999, 3490];',
            'let min = 0;',
            'for (const p of preise) {',
            '  if (p < min) min = p;',
            '}',
            'console.log("Günstigster:", min);'
          ], { line: 1, kind: 'logik', fixes: [
            'let min = preise[0];',
            'let min = 1;',
            'let min = -1;',
            'let min = preise.length;'
          ], expect: 'Günstigster: 999' }, 'Kann irgendein Artikelpreis kleiner als 0 sein?', 'Kein Preis ist kleiner als 0, also wird min nie aktualisiert. Starte mit preise[0].')
        ]
      },

      /* ---------- 7. Klassen und Objekte ---------- */
      {
        concept: 'oop', standalone: true, domain: 'shop', stage: 3,
        title: 'Klassen und Objekte: aus Arrays wird der Artikel',
        goal: 'Du definierst Klassen mit constructor und Methoden, erzeugst Objekte mit new, verwaltest Objektzustände und unterscheidest Wert- und Referenztypen.',
        terms: ['Klasse', 'Objekt', 'Instanz', 'Attribut', 'Konstruktor', 'Referenz'],
        parts: [
          A.text('Vom einfachen Objekt-Literal zur Klasse', 'Objekt-Literale wie `{ name: "Funkmaus", preis: 1999 }` sind praktisch, aber sie enthalten keine gemeinsamen Methoden und prüfen keine Startwerte. Eine **Klasse** bündelt **Attribute** und **Methoden** als Bauplan. Mit `new` entsteht daraus ein **Objekt** (eine **Instanz**), und der **Konstruktor** (`constructor`) setzt die Anfangswerte.'),
          C([
            'class Artikel {§Bauplan für alle Artikel im Shop.',
            '  constructor(name, preisInCent, lager) {§Läuft automatisch bei new Artikel(...).',
            '    this.name = name;§this zeigt auf das gerade entstehende Objekt.',
            '    this.preisInCent = preisInCent;',
            '    this.lager = lager;',
            '  }',
            '  istLieferbar() { return this.lager > 0; }§Methode am Objekt (ohne das Wort function).',
            '}',
            'const maus = new Artikel("Funkmaus", 1999, 35);',
            'const tastatur = new Artikel("Tastatur", 4950, 0);',
            'console.log(maus.name, maus.istLieferbar(), "|", tastatur.name, tastatur.istLieferbar());'
          ], 'Die Klasse Artikel', { praxis: 'In größeren JS-/TypeScript-Backends und Frontends sorgen Klassen dafür, dass jedes Artikel- oder Ticket-Objekt garantiert dieselbe Struktur und dieselben Methoden hat.' }),
          A.uml('klasse Artikel\n  + name: String\n  + preisInCent: number\n  + lager: number\n  + Artikel(name: String, preisInCent: number, lager: number)\n  + istLieferbar(): boolean', 'Dieselbe Klasse im UML', 'Alle Details zum Lesen und Entwerfen von UML-Kästen findest du in [Modellieren: Warum Objekte?](/code-lernen/kurs/oop/warum/).'),
          C([
            'class Artikel { constructor(name, lager) { this.name = name; this.lager = lager; } }',
            'let a = 35; let b = a; b = 0;§Primitive Werte (number, string, boolean) werden kopiert: a bleibt 35.',
            'const art1 = new Artikel("Funkmaus", 35);',
            'const art2 = art1;§Objekte sind Referenzen: art2 zeigt auf dasselbe Objekt!',
            'art2.lager = 0;§Änderung über art2 ist sofort über art1 sichtbar.',
            'console.log(a, art1.lager);§35 und 0.'
          ], 'Wert vs. Referenz', { praxis: 'Referenz-Bugs sind eine der häufigsten Fehlerquellen in Web-Apps: Wer ein Artikel-Objekt für eine Vorschau ändert, ändert versehentlich den Warenkorb mit.' }),
          A.table(['JavaScript', 'Java', 'Python'], [
            ['`constructor(name) { this.name = name; }`', '`Artikel(String name) { this.name = name; }`', '`def __init__(self, name): self.name = name`'],
            ['`new Artikel("Maus", 1999, 35)`', '`new Artikel("Maus", 1999, 35)`', '`Artikel("Maus", 1999, 35)`']
          ], 'Dasselbe in Java und Python', 'Weiter zum Vergleich: [Java, Modul 7](/code-lernen/kurs/java/oop/) und [Python, Modul 7](/code-lernen/kurs/python/oop/).')
        ],
        tips: [
          A.warn('Vergiss in Methoden innerhalb einer Klasse nicht `this.` vor Attributen: `this.lager`, sonst sucht JavaScript eine lokale Variable `lager`.')
        ],
        quiz: [
          A.q('Wie heißt der Konstruktor in jeder JavaScript-Klasse?', ['constructor', 'init', 'wie die Klasse selbst', 'new'], 0, 'In JavaScript immer constructor(...), in Python __init__, in Java wie die Klasse.'),
          A.q('Nach `const b = a; b.lager = 0;` (für ein Artikel-Objekt `a`): Welchen Wert hat `a.lager`?', ['0', 'den alten Wert', 'undefined', 'Einen TypeError'], 0, 'a und b enthalten dieselbe Referenz auf dasselbe Objekt im Speicher.'),
          A.q('Wofür steht `this` im Konstruktor einer Klasse?', ['Für das gerade erzeugte Objekt selbst', 'Für die Klasse als statischen Bauplan', 'Für die letzte aufgerufene Funktion', 'Für die erste Variable der Datei'], 0, 'this.name setzt das Attribut genau dieses neuen Objekts.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', [
            'class Ticket {',
            '  constructor(id) { this.id = id; this.status = "offen"; }',
            '  schliessen() { this.status = "erledigt"; }',
            '}',
            'const t1 = new Ticket(501);',
            'const t2 = new Ticket(502);',
            't1.schliessen();',
            'console.log(t1.status, t2.status);'
          ], 'erledigt offen', 'Zwei getrennte new-Aufrufe erzeugen zwei unabhängige Objekte.', 'Nur t1 wird geschlossen, t2 bleibt offen.'),
          A.fill('Erzeuge ein neues Ticket-Objekt mit der ID 504.', 'const t = {{new}} Ticket(504);', 'Das Schlüsselwort zum Erzeugen einer Instanz.'),
          A.bug('Ticketsystem: Der Konstruktor speichert die Priorität nicht am Objekt, t.prio ist undefined.', 'javascript', [
            'class Ticket {',
            '  constructor(prio) {',
            '    prio = prio;',
            '  }',
            '}',
            'const t = new Ticket(1);',
            'console.log("Prio:", t.prio);'
          ], { line: 2, kind: 'logik', fixes: [
            'this.prio = prio;',
            'const prio = prio;',
            'Ticket.prio = prio;',
            'return prio;'
          ], expect: 'Prio: 1' }, 'Woran fehlt der Bezug zum aktuellen Objekt?', 'prio = prio weist den Parameter nur sich selbst zu. Erst this.prio = prio speichert das Attribut am Objekt.')
        ]
      },

      /* ---------- 8. Kapselung ---------- */
      {
        id: 'kapselung', standalone: true, domain: 'shop', stage: 3,
        title: 'Kapselung: Lagerbestand und Passwort schützen',
        goal: 'Du schützt Attribute mit echten privaten Feldern (#feld), bietest geprüften Zugriff über Getter/Setter und fachliche Methoden und liest Sichtbarkeiten im UML.',
        terms: ['Kapselung', ['Getter und Setter', 'Getter', 'Setter'], 'Sichtbarkeit'],
        parts: [
          A.text('Echte private Felder mit #', 'In modernem JavaScript macht ein vorangestelltes `#` ein Attribut **wirklich privat** (`#lager`): Von außerhalb der Klasse meldet JavaScript bei `maus.#lager = -10` sofort einen Fehler. So stellst du durch **Kapselung** sicher, dass niemand den Lagerbestand ins Minus drücken oder die Login-Sperre zurücksetzen kann.'),
          C([
            'class Artikel {',
            '  #name;§Echtes privates Feld (- im UML): von außen unzugänglich.',
            '  #lager;',
            '  constructor(name, lager) {',
            '    this.#name = name;',
            '    this.lager = lager;§Ruft den Setter auf: prüft schon beim Anlegen!',
            '  }',
            '  get lager() { return this.#lager; }§Getter: Lesen wie eine Eigenschaft (maus.lager).',
            '  set lager(wert) {§Setter mit Prüfung: weist negative Bestände ab.',
            '    if (wert < 0) throw new Error("Bestand darf nicht negativ sein");',
            '    this.#lager = wert;',
            '  }',
            '  verkaufen(menge) {§Fachliche Methode statt rohem Ändern.',
            '    if (menge <= 0 || menge > this.#lager) return false;',
            '    this.#lager -= menge;',
            '    return true;',
            '  }',
            '}',
            'const maus = new Artikel("Funkmaus", 35);',
            'console.log(maus.verkaufen(50), maus.verkaufen(5), maus.lager);§false, true, 30.'
          ], 'Gekapselter Artikel mit #lager, get und set', { praxis: 'Jede Warenwirtschaft schützt Bestände genau so: Egal ob Webshop, Kasse oder API – jeder Verkauf läuft durch verkaufen().' }),
          A.uml('klasse Artikel\n  - name: String\n  - lager: number\n  + Artikel(name: String, lager: number)\n  + getLager(): number\n  + setLager(wert: number): void\n  + verkaufen(menge: number): boolean', 'Die gekapselte Klasse im UML', 'Alle Details zu Sichtbarkeiten und `{static}` findest du in [Modellieren: Kapselung](/code-lernen/kurs/oop/kapselung/).'),
          A.table(['JavaScript', 'Java', 'Python'], [
            ['`#lager` (echt privat)', '`private int lager;`', '`self._lager` (Konvention)'],
            ['`get lager() { … }` / `set lager(v) { … }`', '`getLager()` / `setLager(int v)`', '`@property` / `@lager.setter`']
          ], 'Dasselbe in Java und Python', 'Weiter zum Vergleich: [Java, Modul 8](/code-lernen/kurs/java/kapselung/) und [Python, Modul 8](/code-lernen/kurs/python/kapselung/).')
        ],
        tips: [
          A.warn('Private Felder (`#lager`) müssen am Anfang der Klasse deklariert werden, bevor der `constructor` sie verwendet.')
        ],
        quiz: [
          A.q('Woran erkennst du in modernem JavaScript ein echt privates Klassenfeld?', ['Es beginnt mit dem Zeichen # (z. B. #lager)', 'Es beginnt mit dem Schlüsselwort private', 'Es steht komplett in Großbuchstaben', 'Es beginnt mit einem Dollarzeichen $'], 0, 'In JavaScript erzwingt die Engine bei #feld echten privaten Zugriffsschutz.'),
          A.q('Warum sollte ein `Benutzerkonto` keinen Getter für `#passwortHash` anbieten?', ['Damit geheime Zugangsdaten die Klasse nie verlassen', 'Weil Getter bei privaten #-Feldern verboten sind', 'Weil Strings nicht per get zurückgegeben werden können', 'Weil sonst der Konstruktor nicht mehr funktioniert'], 0, 'Was nie herausgegeben wird, kann auch nirgends versehentlich geloggt werden.'),
          A.q('Wie wird ein Getter `get lager()` von außen aufgerufen?', ['maus.lager (ohne Klammern)', 'maus.lager() (mit Klammern)', 'maus.getLager()', 'Artikel.lager(maus)'], 0, 'In JavaScript fühlen sich get/set von außen wie normale Eigenschaften an.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', [
            'class Artikel {',
            '  #lager;',
            '  constructor(l) { this.#lager = l; }',
            '  verkaufen(m) {',
            '    if (m <= 0 || m > this.#lager) return false;',
            '    this.#lager -= m; return true;',
            '  }',
            '  get lager() { return this.#lager; }',
            '}',
            'const a = new Artikel(8);',
            'console.log(a.verkaufen(3), a.verkaufen(6), a.verkaufen(5), a.lager);'
          ], 'true false true 0', 'Verfolge #lager nach jedem Aufruf von verkaufen().', '8 - 3 = 5; 6 geht nicht (bleibt 5); 5 - 5 = 0.'),
          A.fill('Deklariere das private Feld für den Lagerbestand in JavaScript.', 'class Artikel {\n  {{#lager}};\n}', 'In JavaScript beginnt ein privates Klassenfeld mit einem Raute-Zeichen.'),
          A.bug('Lager: Den letzten Artikel kann niemand kaufen – bei Bestand 5 schlägt verkaufen(5) fehl.', 'javascript', [
            'class Artikel {',
            '  #lager;',
            '  constructor(l) { this.#lager = l; }',
            '  verkaufen(m) {',
            '    if (m <= 0 || m >= this.#lager) return false;',
            '    this.#lager -= m; return true;',
            '  }',
            '  get lager() { return this.#lager; }',
            '}',
            'const a = new Artikel(5);',
            'console.log(a.verkaufen(6), a.verkaufen(5), a.lager);'
          ], { line: 4, kind: 'logik', fixes: [
            'if (m <= 0 || m > this.#lager) return false;',
            'if (m <= 0 || m < this.#lager) return false;',
            'if (m < 0 || m >= this.#lager) return false;',
            'if (m <= 0 && m > this.#lager) return false;'
          ], expect: 'false true 0' }, 'Darf man genau so viele Stück kaufen, wie auf Lager sind?', 'Abgelehnt wird erst bei m > this.#lager. Mit >= ist genau der Restbestand blockiert.')
        ]
      },

      /* ---------- 9. Vererbung & Polymorphie ---------- */
      {
        id: 'vererbung', standalone: true, domain: 'shop', stage: 3,
        title: 'Vererbung und Polymorphie: Artikelarten und Zahlungsmethoden',
        goal: 'Du leitest Unterklassen mit extends und super() ab, überschreibst Methoden sauber und nutzt Polymorphie für erweiterbare Zahlungsarten ohne if-Ketten.',
        terms: ['Vererbung', ['Oberklasse und Unterklasse', 'Oberklasse', 'Unterklasse'], ['Überschreiben (Override)', 'Überschreiben', 'überschreibt'], 'Polymorphie'],
        parts: [
          A.text('extends, super() und Überschreiben', 'Wie in Java leitet `extends` eine **Unterklasse** von einer **Oberklasse** ab (**Vererbung**). Im Konstruktor der Unterklasse muss `super(...)` aufgerufen werden, bevor du `this` benutzt. Eine geerbte Methode mit demselben Namen in der Unterklasse **überschreibt** das Verhalten.'),
          C([
            'class Artikel {',
            '  constructor(name, preisInCent) {',
            '    this.name = name; this.preisInCent = preisInCent;',
            '  }',
            '  versandInCent() { return 495; }',
            '  info() { return `${this.name}: ${this.preisInCent} + ${this.versandInCent()} Cent`; }',
            '}',
            'class DigitalArtikel extends Artikel {§Vererbung: DigitalArtikel ist ein Artikel.',
            '  constructor(name, preisInCent) {',
            '    super(name, preisInCent);§Ruft den Konstruktor von Artikel auf (Pflicht vor this).',
            '  }',
            '  versandInCent() { return 0; }§Überschreibt die Versandkosten für Downloads.',
            '}',
            'console.log(new Artikel("Headset", 3490).info());',
            'console.log(new DigitalArtikel("Lizenz", 9900).info());'
          ], 'Vererbung im Onlineshop', { praxis: 'Dieselbe info()-Methode der Oberklasse ruft automatisch die passende versandInCent()-Version des jeweiligen Objekts auf.' }),
          C([
            'class PayPal {',
            '  name() { return "PayPal"; }',
            '  gebuehrInCent(betrag) { return Math.floor(betrag * 249 / 10000) + 35; }',
            '}',
            'class Kreditkarte {',
            '  name() { return "Kreditkarte"; }',
            '  gebuehrInCent(betrag) { return Math.floor(betrag * 150 / 10000); }',
            '}',
            'class Rechnung {',
            '  name() { return "Rechnung"; }',
            '  gebuehrInCent(betrag) { return 0; }',
            '}',
            'for (const z of [new PayPal(), new Kreditkarte(), new Rechnung()]) {§Polymorphie: derselbe Aufruf, drei verschiedene Berechnungen.',
            '  console.log(`${z.name()}: ${z.gebuehrInCent(10000)} Cent`);',
            '}'
          ], 'Polymorphie: Zahlungsmethoden ohne if-Kette', { praxis: 'JavaScript kennt wie Python kein formales interface-Schlüsselwort (TypeScript ergänzt es), aber Polymorphie funktioniert genauso: Alle Zahlungsarten bieten dieselben Methoden an.' }),
          A.table(['JavaScript', 'Java', 'Python'], [
            ['`class Digital extends Artikel`', '`class Digital extends Artikel`', '`class Digital(Artikel):`'],
            ['`super(name, preis);`', '`super(name, preis);`', '`super().__init__(name, preis)`'],
            ['Duck Typing (Interfaces in TypeScript)', '`interface` + `implements`', 'Duck Typing / `ABC`']
          ], 'Dasselbe in Java und Python', 'Weiter zum Vergleich: [Java, Modul 9](/code-lernen/kurs/java/vererbung/), [Python, Modul 9](/code-lernen/kurs/python/vererbung/) und [Modellieren: Polymorphie](/code-lernen/kurs/oop/poly/).')
        ],
        tips: [
          A.warn('Greifst du im Konstruktor einer Unterklasse vor `super(...)` auf `this` zu, wirft JavaScript sofort einen `ReferenceError`.')
        ],
        quiz: [
          A.q('Was passiert, wenn eine Unterklasse im `constructor` auf `this` zugreift, ohne vorher `super()` aufzurufen?', ['JavaScript wirft einen ReferenceError', 'this wird automatisch leer angelegt', 'super() wird erst am Ende automatisch aufgerufen', 'Die Oberklasse wird komplett ignoriert'], 0, 'Erst super() baut das Objekt der Oberklasse auf, danach darf this genutzt werden.'),
          A.q('Welche Methode läuft bei `new DigitalArtikel("Lizenz", 9900).info()` für `this.versandInCent()`?', ['Die Version aus DigitalArtikel (0)', 'Immer die Version aus Artikel (495)', 'Beide Versionen werden addiert (495)', 'Keine, weil info() in Artikel steht'], 0, 'Polymorphie: Entscheidend ist die Klasse des tatsächlichen Objekts.'),
          A.q('Welches Schlüsselwort leitet in JavaScript eine Unterklasse ab?', ['extends', 'implements', 'inherits', 'superclass'], 0, 'Genau wie in Java heißt es class Unter extends Ober.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', [
            'class Ticket { reaktion() { return "1 Tag"; } }',
            'class Stoerung extends Ticket { reaktion() { return "sofort"; } }',
            'console.log(new Ticket().reaktion(), new Stoerung().reaktion());'
          ], '1 Tag sofort', 'Stoerung überschreibt reaktion().', 'Ticket liefert „1 Tag“, Stoerung liefert „sofort“.'),
          A.fill('Leite `DigitalArtikel` von `Artikel` ab und rufe den Oberklassen-Konstruktor auf.', 'class DigitalArtikel {{extends}} Artikel {\n  constructor(n, p) { {{super}}(n, p); }\n}', 'Erst das Schlüsselwort für Vererbung, dann der Aufruf der Oberklasse.'),
          A.bug('Shop: Für Software-Lizenzen werden trotzdem 495 Cent Versand berechnet.', 'javascript', [
            'class Artikel { versandInCent() { return 495; } }',
            'class DigitalArtikel extends Artikel {',
            '  versandIncent() { return 0; }',
            '}',
            'console.log("Versand:", new DigitalArtikel().versandInCent());'
          ], { line: 2, kind: 'logik', fixes: [
            'versandInCent() { return 0; }',
            'versandInCent(p) { return p; }',
            'static versandInCent() { return 0; }',
            'versand() { return 0; }'
          ], expect: 'Versand: 0' }, 'Vergleiche die Schreibweise des Methodennamens in Zeile 1 und Zeile 3.', 'versandIncent mit kleinem c überschreibt versandInCent nicht – es legt eine neue Methode an.')
        ]
      },

      /* ---------- 10. Exceptions ---------- */
      {
        concept: 'err', standalone: true, domain: 'shop', stage: 3,
        title: 'Exceptions: Fehler abfangen statt abstürzen',
        goal: 'Du fängst Laufzeitfehler mit try, catch und finally ab, löst eigene Fehler mit throw new Error() aus und kennst SyntaxError, TypeError und JSON.parse-Fehler.',
        terms: [['Ausnahme (Exception)', 'Exception'], 'Laufzeitfehler', 'Stacktrace'],
        parts: [
          A.text('Fehler gehören zum Web-Alltag', 'In Web-Apps kommen ständig kaputte Daten an: beschädigtes JSON aus einer Schnittstelle, ein ausverkaufter Artikel oder eine ungültige Bestellmenge. Eine **Exception** meldet diesen **Laufzeitfehler**. Mit `try` und `catch` fängst du sie ab, statt die ganze Seite abstürzen zu lassen.'),
          C([
            'const rohdaten = ["{\\"menge\\": 2}", "{kaputt", "{\\"menge\\": 5}"];',
            'let gesamt = 0;',
            'for (const text of rohdaten) {',
            '  try {§In diesem Block darf etwas schiefgehen.',
            '    const obj = JSON.parse(text);§Bei "{kaputt" fliegt hier ein SyntaxError.',
            '    gesamt += obj.menge;',
            '  } catch (err) {§catch fängt die Exception; err.name und err.message beschreiben sie.',
            '    console.log("Übersprungen:", err.name);',
            '  }',
            '}',
            'console.log("Gesamtmenge:", gesamt);§2 + 5 = 7, kein Absturz!'
          ], 'try und catch bei JSON.parse', { praxis: 'Jeder API-Aufruf und jedes localStorage.getItem() kann beschädigtes JSON liefern. Ohne try/catch bleibt die Web-App weiß.' }),
          C([
            'function entnehmen(bestand, menge) {',
            '  if (menge > bestand) {',
            '    throw new Error(`Nur noch ${bestand} auf Lager`);§throw löst absichtlich eine Exception aus.',
            '  }',
            '  return bestand - menge;',
            '}',
            'try {',
            '  console.log("Rest:", entnehmen(3, 5));',
            '} catch (err) {',
            '  console.log("Abgelehnt:", err.message);',
            '} finally {§finally läuft immer – mit oder ohne Fehler.',
            '  console.log("Prüfung beendet");',
            '}'
          ], 'throw new Error und finally', { praxis: 'Die Geschäftslogik wirft eine klare Fehlermeldung, die Oberfläche fängt sie und zeigt dem Kunden einen roten Hinweis – und finally schließt den Lade-Spinner.' }),
          A.table(['Fehlertyp in JS', 'Ursache', 'Typisches Beispiel'], [
            ['`SyntaxError`', 'ungültige Syntax oder kaputtes JSON', '`JSON.parse("{kaputt")`'],
            ['`TypeError`', 'Zugriff auf `null`/`undefined` oder `const`-Änderung', '`ticket.bearbeiter.length` bei `null`'],
            ['`ReferenceError`', 'Variable existiert nicht', 'Tippfehler im Variablennamen'],
            ['`Error` (eigen)', 'fachlicher Fehler per `throw new Error(...)`', 'Bestellmenge über Lagerbestand']
          ], 'Die wichtigsten Fehlerarten (im Stacktrace sichtbar)'),
          A.table(['JavaScript', 'Java', 'Python'], [
            ['`try { … } catch (e) { … } finally { … }`', '`try { … } catch (Typ e) { … } finally { … }`', '`try: … except Typ as e: … finally: …`'],
            ['`throw new Error("…");`', '`throw new IllegalArgumentException("…");`', '`raise ValueError("…")`']
          ], 'Dasselbe in Java und Python', 'Weiter zum Vergleich: [Java, Modul 10](/code-lernen/kurs/java/err/) und [Python, Modul 10](/code-lernen/kurs/python/err/).')
        ],
        tips: [
          A.warn('Nie einen leeren `catch (e) {}`-Block schreiben! Er verschluckt Fehler spurlos. Mindestens loggen (inkl. **Stacktrace** `e.stack`) oder dem Nutzer sauber melden.')
        ],
        quiz: [
          A.q('Was passiert mit den restlichen Zeilen im `try`-Block nach einem `throw`?', ['Sie werden übersprungen, JavaScript springt direkt ins catch', 'Sie werden noch zu Ende ausgeführt, dann folgt catch', 'Sie laufen erst nach dem finally-Block', 'Sie werden beim nächsten Aufruf nachgeholt'], 0, 'Sobald eine Exception fliegt, endet der try-Block sofort.'),
          A.q('Wann läuft ein `finally`-Block?', ['Immer – egal ob ein Fehler auftrat oder nicht', 'Nur wenn im try-Block kein Fehler passiert ist', 'Nur wenn ein Fehler im catch gefangen wurde', 'Nur bei einem SyntaxError'], 0, 'finally räumt zuverlässig auf (z. B. Ladeanzeige schließen).'),
          A.q('Welchen Fehler wirft `const t = null; console.log(t.titel);`?', ['TypeError', 'SyntaxError', 'ReferenceError', 'RangeError'], 0, 'Zugriff auf Eigenschaften von null oder undefined wirft immer einen TypeError.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', [
            'try {',
            '  console.log("A");',
            '  throw new Error("Stop");',
            '  console.log("B");',
            '} catch (e) {',
            '  console.log("C");',
            '} finally {',
            '  console.log("D");',
            '}'
          ], 'A\nC\nD', 'Was wird übersprungen, was läuft im Fehlerfall, und was läuft immer?', 'A läuft, nach throw wird B übersprungen, catch gibt C aus, finally D.'),
          A.fill('Löse einen eigenen Fehler aus, wenn der Betrag nicht positiv ist.', 'if (betrag <= 0) {{throw}} new Error("Betrag muss positiv sein");', 'Das Schlüsselwort zum Auslösen einer Exception.'),
          A.bug('Lagerprüfung: Ein zu hoher Kauf wird nicht abgefangen, das Programm bricht ab.', 'javascript', [
            'function pruefe(lager, menge) {',
            '  if (menge > lager) throw new Error("Zu wenig auf Lager");',
            '  return "ok";',
            '}',
            'console.log(pruefe(2, 5));'
          ], { line: 4, kind: 'laufzeit', fixes: [
            'try { console.log(pruefe(2, 5)); } catch (e) { console.log(e.message); }',
            'console.log(pruefe(2, 5).message);',
            'if (pruefe(2, 5)) console.log("ok");',
            'throw pruefe(2, 5);'
          ], expect: 'Zu wenig auf Lager' }, 'Wie fängst du eine Exception beim Aufruf ab?', 'Ohne try/catch führt throw zum Programmabbruch. Der catch-Block fängt den Fehler und gibt e.message aus.')
        ]
      },

      /* ---------- 11. Architektur ---------- */
      {
        id: 'architektur', standalone: true, domain: 'shop', stage: 4,
        title: 'Zusammenhänge: Warenkorb, Position, Artikel und RabattRechner',
        goal: 'Du liest das 4-Klassen-Shop-Modell in JavaScript, erkennst Zuständigkeiten (Single Responsibility) und verfolgst Aufrufe über Klassen- und Sequenzdiagramm.',
        terms: ['Klassendiagramm', 'Sequenzdiagramm', 'Komposition', 'Assoziation', 'Single Responsibility'],
        parts: [
          A.text('Vier Klassen, eine Bestellung', 'Hier kommt alles aus den Modulen 5 bis 9 zusammen – exakt dasselbe 4-Klassen-Modell wie in Java, Python und im Modellieren-Kurs. Jede Klasse hat **eine klare Aufgabe** (**Single Responsibility**): `Artikel` hält Name und Preis, `Position` rechnet Preis × Menge, `Warenkorb` sammelt Positionen (**Komposition**) und `RabattRechner` kennt die Rabattregel.'),
          A.uml('klasse Warenkorb\n  - positionen: Array<Position>\n  + hinzufuegen(a: Artikel, menge: number): void\n  + summeInCent(): number\nklasse Position\n  - menge: number\n  + betragInCent(): number\nklasse Artikel\n  - name: String\n  - preisInCent: number\n  + getPreisInCent(): number\nklasse RabattRechner\n  + rabattInCent(summeInCent: number): number\nWarenkorb "1" *-- "*" Position : enthält\nPosition "*" --> "1" Artikel', 'Das Klassendiagramm', 'Komposition (`*--`) zwischen Warenkorb und Position, gerichtete Assoziation (`-->`) von Position zu Artikel.'),
          C([
            'class Artikel {',
            '  #name; #preisInCent;',
            '  constructor(name, preisInCent) { this.#name = name; this.#preisInCent = preisInCent; }',
            '  getPreisInCent() { return this.#preisInCent; }',
            '}',
            'class Position {',
            '  #artikel; #menge;',
            '  constructor(artikel, menge) { this.#artikel = artikel; this.#menge = menge; }',
            '  betragInCent() { return this.#artikel.getPreisInCent() * this.#menge; }§Fragt den Artikel (Assoziation).',
            '}',
            'class Warenkorb {',
            '  #positionen = [];§Komposition: Positionen gehören dem Warenkorb.',
            '  hinzufuegen(artikel, menge) { this.#positionen.push(new Position(artikel, menge)); }',
            '  summeInCent() { return this.#positionen.reduce((s, p) => s + p.betragInCent(), 0); }',
            '}',
            'class RabattRechner {',
            '  rabattInCent(summe) { return summe >= 10000 ? Math.floor(summe * 10 / 100) : 0; }',
            '}',
            'const korb = new Warenkorb();',
            'korb.hinzufuegen(new Artikel("Funkmaus", 1999), 2);',
            'korb.hinzufuegen(new Artikel("Monitor 27 Zoll", 22900), 1);',
            'const summe = korb.summeInCent();',
            'const rabatt = new RabattRechner().rabattInCent(summe);',
            'console.log(`Summe ${summe}, Rabatt ${rabatt}, zu zahlen ${summe - rabatt} Cent`);'
          ], 'Das 4-Klassen-Modell in JavaScript', { praxis: 'Ob Frontend in JavaScript/TypeScript oder Backend in Java/Python: Die Architektur bleibt identisch – nur die Syntax wechselt.' }),
          A.seq(['Checkout', 'Warenkorb', 'Position', 'Artikel', 'RabattRechner'], [
            ['Checkout', 'Warenkorb', 'summeInCent()'],
            ['Warenkorb', 'Position', 'betragInCent()'],
            ['Position', 'Artikel', 'getPreisInCent()'],
            ['Artikel', 'Position', '1999', 'ret'],
            ['Position', 'Warenkorb', '3998', 'ret'],
            ['Warenkorb', 'Checkout', '26898', 'ret'],
            ['Checkout', 'RabattRechner', 'rabattInCent(26898)'],
            ['RabattRechner', 'Checkout', '2689', 'ret']
          ], 'Derselbe Aufruf im Sequenzdiagramm'),
          A.table(['Dasselbe Modell in anderen Kursen', 'Direktlink'], [
            ['Java, Modul 11', '[Java: Zusammenhänge](/code-lernen/kurs/java/architektur/)'],
            ['Python, Modul 11', '[Python: Zusammenhänge](/code-lernen/kurs/python/architektur/)'],
            ['Modellieren, Lektion 7', '[Modellieren: Entwurf](/code-lernen/kurs/oop/entwurf/)']
          ], 'Quer durch alle Sprachen')
        ],
        tips: [
          A.tip('Teste jede Klasse isoliert: `new RabattRechner().rabattInCent(10000)` braucht weder einen Warenkorb noch Artikel.')
        ],
        quiz: [
          A.q('Ab morgen gibt es 15 % Rabatt ab 200 Euro. Welche Klasse muss geändert werden?', ['Nur RabattRechner', 'Warenkorb und RabattRechner', 'Position und Artikel', 'Alle vier Klassen'], 0, 'Single Responsibility: Die Rabattlogik steckt an genau einer Stelle.'),
          A.q('Woran erkennst du im JavaScript-Code die Komposition zwischen `Warenkorb` und `Position`?', ['Warenkorb erzeugt Position intern mit new', 'Position erbt mit extends von Warenkorb', 'Position speichert eine Referenz auf den Warenkorb', 'Warenkorb ruft RabattRechner direkt im Konstruktor auf'], 0, 'Das Ganze erzeugt und besitzt seine Teile existenziell.'),
          A.q('Warum fragt `Position` den Preis über `this.#artikel.getPreisInCent()` ab?', ['Damit der Preis nur an einer Stelle gepflegt wird', 'Weil JavaScript Zahlen nicht in Position speichern kann', 'Weil Methodenaufrufe schneller sind als Zahlen', 'Damit Artikel alle Positionen kennt'], 0, 'Single Source of Truth: Preisänderungen am Artikel gelten sofort überall.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', [
            'class RabattRechner {',
            '  rabattInCent(s) { return s >= 10000 ? Math.floor(s * 10 / 100) : 0; }',
            '}',
            'const r = new RabattRechner();',
            'console.log(r.rabattInCent(9999), r.rabattInCent(10000), r.rabattInCent(25005));'
          ], '0 1000 2500', 'Prüfe Grenzwert 10000 und Math.floor.', '9999 → 0; 10000 → 1000; 25005 * 10 / 100 = 2500.5 → abgerundet 2500.'),
          A.fill('Füge in `Warenkorb` eine neue Position für Artikel `a` und `menge` hinzu.', 'this.#positionen.{{push}}(new Position(a, menge));', 'Die Array-Methode zum Anhängen ans Ende.'),
          A.bug('Warenkorb: summeInCent() liefert nur den Betrag der letzten Position.', 'javascript', [
            'class Position {',
            '  constructor(p, m) { this.p = p; this.m = m; }',
            '  betrag() { return this.p * this.m; }',
            '}',
            'const pos = [new Position(1999, 2), new Position(999, 3)];',
            'let summe = 0;',
            'for (const p of pos) {',
            '  summe = p.betrag();',
            '}',
            'console.log(summe);'
          ], { line: 7, kind: 'logik', fixes: [
            'summe += p.betrag();',
            'summe -= p.betrag();',
            'summe = p.betrag() * 2;',
            'summe++;'
          ], expect: '6995' }, 'Was passiert mit dem vorherigen Wert von summe in Zeile 8?', '= überschreibt summe, += addiert alle Positionen: 3998 + 2997 = 6995.')
        ]
      },

      /* ---------- 12. Clean Code ---------- */
      {
        id: 'clean', standalone: true, domain: 'shop', stage: 4,
        title: 'Clean Code: lesbar schreiben, was andere lesen müssen',
        goal: 'Du erkennst unsauberen JavaScript-Code (schlechte Namen, Magic Numbers, tief verschachtelte ifs, Wiederholungen) und wählst das sauberste Refactoring bei gleichem Verhalten.',
        terms: ['Clean Code', 'Magic Number', 'Guard Clause', 'DRY', 'Single Responsibility', 'Refactoring'],
        parts: [
          A.text('Struktur verbessern, Verhalten gleich lassen', 'Code wird zehnmal öfter gelesen als geschrieben. **Clean Code** heißt: so schreiben, dass dein Team – und du selbst in sechs Monaten – den Code ohne Rätselraten versteht. **Refactoring** verbessert diese Struktur, ohne das Ergebnis zu verändern.'),
          C([
            '// Vorher: Magic Numbers und tief verschachtelt',
            'function pruefeAlt(m, l, b) {',
            '  if (m > 0) { if (m <= l) { if (b) { return "versenden"; } else { return "warten"; } } else { return "zu wenig"; } } else { return "ungültig"; }',
            '}',
            '// Nachher: sprechende Namen + Guard Clauses',
            'function pruefeBestellung(menge, lager, bezahlt) {§Sprechende Namen statt m, l, b.',
            '  if (menge <= 0) return "ungültig";§Guard Clause: Sonderfall sofort beenden.',
            '  if (menge > lager) return "zu wenig";',
            '  if (!bezahlt) return "warten";',
            '  return "versenden";§Normalfall ganz am Ende, null Verschachtelung.',
            '}',
            'console.log(pruefeAlt(2, 5, true), "|", pruefeBestellung(2, 5, true));'
          ], 'Guard Clauses statt if-Treppe', { praxis: 'In echten Code-Reviews ist tiefes Verschachteln einer der häufigsten Kritikpunkte. Guard Clauses machen jeden Fehlerfall in einer Zeile lesbar.' }),
          A.table(['Code-Geruch', 'Verbesserung', 'Prinzip'], [
            ['`a`, `b`, `x2`', 'sprechende Namen mit Einheit (`preisInCent`)', 'Clean Code'],
            ['`5000`, `495` mitten im Code', '`const VERSANDFREI_AB_IN_CENT = 5000;`', 'keine Magic Numbers'],
            ['3+ Ebenen `if/else`', 'früh mit `return` aussteigen', 'Guard Clause'],
            ['`if (x > 0) return true; else return false;`', '`return x > 0;`', 'KISS'],
            ['dieselbe Regel zweimal kopiert', 'in eine eigene Funktion auslagern', 'DRY (Don’t Repeat Yourself)'],
            ['eine Funktion rechnet, formatiert und druckt', 'in kleine Funktionen aufteilen', 'Single Responsibility']
          ], 'Checkliste für sauberen Code'),
          A.table(['Dasselbe in anderen Kursen', 'Direktlink'], [
            ['Java: Clean Code', '[Java, Modul 12](/code-lernen/kurs/java/clean/)'],
            ['Python: Clean Code', '[Python, Modul 12](/code-lernen/kurs/python/clean/)']
          ], 'Sprachvergleich')
        ],
        tips: [
          A.warn('**Refactoring** ändert niemals das Verhalten – immer mit Tests absichern!')
        ],
        quiz: [
          A.q('Was ist eine Magic Number?', ['Unerklärte Zahl mitten im Code', 'Eine Zufallszahl aus Math.random()', 'Ein ungültiger Wert NaN nach einer Rechnung', 'Eine Konstante mit const in Großbuchstaben'], 0, 'Ohne Namen weiß niemand, wofür 5000 oder 495 steht.'),
          A.q('Was zeichnet eine Guard Clause aus?', ['Beendet einen Sonderfall früh mit return', 'Sie wickelt den ganzen Code in ein try/catch ein', 'Sie macht alle Klassenfelder mit # privat', 'Sie ersetzt alle Schleifen durch map und filter'], 0, 'Früh aussteigen hält den Hauptpfad flach und übersichtlich.'),
          A.q('Wofür steht das Prinzip DRY?', ['Don’t Repeat Yourself: jede Regel an genau einer Stelle', 'Do Refactor Yearly: Code einmal pro Jahr neu schreiben', 'Data Ready Yield: Daten vorab aus der Datenbank laden', 'Dynamic Return Yield: Funktionen liefern beliebige Typen'], 0, 'Kopierte Logik führt früher oder später zu widersprüchlichen Änderungen.')
        ],
        tasks: [
          A.choose('Beide Varianten berechnen dasselbe. Welche ist sauberer?', 'javascript', [
            ['const a = 3; const b = 1999; const c = a * b; console.log(c);'],
            ['const menge = 3; const preisInCent = 1999; const summeInCent = menge * preisInCent; console.log(summeInCent);']
          ], { a: 1, expect: '5997' }, 'Bei welcher Variante erkennst du sofort Einheit und Bedeutung?', 'Sprechende Namen mit Einheit (preisInCent) verhindern Verwechslungen zwischen Euro und Cent.'),
          A.choose('Beide Varianten berechnen die Versandkosten gleich. Welche vermeidet Magic Numbers?', 'javascript', [
            ['const w = 4790; console.log(w >= 5000 ? 0 : 495);'],
            ['const VERSANDFREI_AB_IN_CENT = 5000;', 'const VERSAND_IN_CENT = 495;', 'const warenwertInCent = 4790;', 'console.log(warenwertInCent >= VERSANDFREI_AB_IN_CENT ? 0 : VERSAND_IN_CENT);']
          ], { a: 1, expect: '495' }, 'Wo änderst du die Versandgrenze, wenn sie auf 60 Euro steigt?', 'Benannte Konstanten geben den Zahlen Bedeutung und eine einzige Änderungsstelle.'),
          A.choose('Alle drei Funktionen liefern dasselbe. Welche ist am saubersten?', 'javascript', [
            ['function istLieferbar(lager) { if (lager > 0) { return true; } else { return false; } }', 'console.log(istLieferbar(3), istLieferbar(0));'],
            ['function istLieferbar(lager) { return lager > 0; }', 'console.log(istLieferbar(3), istLieferbar(0));'],
            ['function istLieferbar(lager) { return (lager > 0) === true ? true : false; }', 'console.log(istLieferbar(3), istLieferbar(0));']
          ], { a: 1, expect: 'true false' }, 'Was liefert der Vergleich lager > 0 bereits selbst?', 'lager > 0 ist schon ein boolean – das if drumherum ist überflüssig.'),
          A.choose('Beide Varianten rechnen gleich. Welche folgt dem DRY-Prinzip?', 'javascript', [
            ['console.log(3000 >= 5000 ? 0 : 495);', 'console.log(7200 >= 5000 ? 0 : 495);'],
            ['const versand = (w) => (w >= 5000 ? 0 : 495);', 'console.log(versand(3000));', 'console.log(versand(7200));']
          ], { a: 1, expect: '495\n0' }, 'Welche Variante hat die Versandregel an genau einer Stelle?', 'Mit der Funktion versand() steht die Regel einmal da und bleibt überall konsistent.')
        ]
      },

      /* ---------- 13. Bug-Arena ---------- */
      {
        id: 'bugs', standalone: true, domain: 'shop', stage: 4,
        title: 'Bug-Arena: Fehler finden und beheben',
        goal: 'Du findest in fremdem JavaScript-Code die fehlerhafte Zeile, unterscheidest Syntax-, Laufzeit- und Logikfehler und wählst den kleinsten richtigen Fix.',
        terms: ['Syntaxfehler', 'Laufzeitfehler', 'Logikfehler', 'Off-by-one-Fehler', 'Debugging'],
        parts: [
          A.text('Drei Schritte beim Debugging', 'In der IHK-Prüfung wie im Entwickleralltag geht es selten darum, grüne Wiese zu schreiben – meist suchst du Fehler in vorhandenem Code (**Debugging**):\n1. **Wo** entsteht die Ursache? (Nicht immer die Zeile, in der es knallt!)\n2. **Welche Fehlerart?** Syntaxfehler, Laufzeitfehler oder Logikfehler.\n3. **Kleinster Fix**, der die Ursache behebt.'),
          A.table(['Fehlerart', 'Woran erkennst du sie?', 'Typisch in JavaScript'], [
            ['**Syntaxfehler**', 'Code startet gar nicht (`SyntaxError`)', 'fehlende Klammer, falsches Schlüsselwort'],
            ['**Laufzeitfehler**', 'Abbruch beim Ausführen (`TypeError`, `ReferenceError`)', '`.length` auf `null`/`undefined`, `const` neu zuweisen'],
            ['**Logikfehler**', 'Läuft durch, liefert aber falschen Wert oder `NaN`', '`=` im `if`, `"5" + 3`, Off-by-one-Fehler (`<= length`), fehlendes `break`']
          ], 'Die drei Fehlerarten in JavaScript')
        ],
        tips: [
          A.tip('Achte in JavaScript besonders auf stille Logikfehler: `arr[arr.length]` wirft keinen Fehler wie in Java, sondern liefert `undefined` – und macht deine Summe zu `NaN`.')
        ],
        quiz: [
          A.q('Ein Skript läuft ohne Fehlermeldung durch, gibt aber „Zu zahlen: NaN“ aus. Welche Fehlerart?', ['Logikfehler', 'Syntaxfehler', 'Laufzeitfehler', 'Compilerfehler'], 0, 'Kein Abbruch und kein Syntaxfehler, aber falsches Ergebnis: Logikfehler.'),
          A.q('Warum ist `if (status = "bezahlt")` in JavaScript besonders tückisch?', ['= weist zu und ein nicht-leerer Text gilt immer als wahr', 'Es löst immer sofort einen SyntaxError beim Start aus', 'Es vergleicht nur den ersten Buchstaben des Textes', 'Es setzt status immer auf undefined zurück'], 0, 'Zuweisung statt Vergleich ===: der if-Zweig läuft immer!'),
          A.q('Wann wirft `bearbeiter.length` einen TypeError?', ['Wenn bearbeiter null oder undefined ist', 'Wenn bearbeiter ein leerer Text "" ist', 'Wenn bearbeiter mehr als 100 Zeichen hat', 'Wenn bearbeiter mit const angelegt wurde'], 0, 'Ein leerer Text "" hat Länge 0; nur null und undefined haben keine Eigenschaften.')
        ],
        tasks: [
          A.bug('Ticketsystem: Obwohl 3 Tickets offen sind, meldet das Programm „Alles erledigt“.', 'javascript', [
            'let offene = 3;',
            'if (offene = 0) {',
            '  console.log("Alles erledigt");',
            '} else {',
            '  console.log(offene + " Tickets offen");',
            '}'
          ], { line: 1, kind: 'logik', fixes: [
            'if (offene === 0) {',
            'if (offene = 3) {',
            'if (offene !== 0) {',
            'if (offene >= 0) {'
          ], expect: '3 Tickets offen' }, 'Was macht ein einzelnes Gleichheitszeichen in Zeile 2?', 'offene = 0 setzt offene auf 0! Dadurch wird zwar else ausgeführt, aber mit „0 Tickets offen“. Richtig ist === 0.'),
          A.bug('Ticketsystem: Beim Zählen der zugewiesenen Tickets bricht das Programm mit einem TypeError ab.', 'javascript', [
            'const bearbeiter = ["m.weber", null, "s.kaya"];',
            'let zugewiesen = 0;',
            'for (const name of bearbeiter) {',
            '  if (name.length > 0) zugewiesen++;',
            '}',
            'console.log(zugewiesen + " zugewiesen");'
          ], { line: 3, kind: 'laufzeit', fixes: [
            'if (name !== null && name.length > 0) zugewiesen++;',
            'if (name.length > 0 && name !== null) zugewiesen++;',
            'if (name !== null || name.length > 0) zugewiesen++;',
            'if (name === null) zugewiesen++;'
          ], expect: '2 zugewiesen' }, 'In welcher Reihenfolge prüft &&, und was passiert bei null.length?', 'Die Prüfung auf null muss links stehen, damit && bei null sofort abbricht und .length gar nicht erst aufruft.'),
          A.bug('Kasse: 10 % Rabatt auf Ware + Versand soll 4045 Cent ergeben, nicht 4445.', 'javascript', [
            'const preis = 4000;',
            'const versand = 495;',
            'const gesamt = Math.floor(preis + versand * 90 / 100);',
            'console.log("Zu zahlen:", gesamt);'
          ], { line: 2, kind: 'logik', fixes: [
            'const gesamt = Math.floor((preis + versand) * 90 / 100);',
            'const gesamt = Math.floor(preis + (versand * 90) / 100);',
            'const gesamt = Math.floor((preis + versand) * 10 / 100);',
            'const gesamt = Math.floor(preis * 90 / 100 + versand);'
          ], expect: 'Zu zahlen: 4045' }, 'Punkt vor Strich: Worauf wirkt * 90 / 100 ohne Klammern?', 'Ohne Klammern wird nur der Versand rabattiert. Erst (preis + versand) addieren, dann 90 % nehmen.'),
          A.bug('Berechtigungen: Ein gesperrter Admin darf trotzdem Daten öffnen. Nur aktive Admins oder Mitarbeiter dürfen hinein.', 'javascript', [
            'function darfRein(rolle, gesperrt) {',
            '  return rolle === "ADMIN" || rolle === "MITARBEITER" && !gesperrt;',
            '}',
            'console.log(darfRein("ADMIN", false), darfRein("ADMIN", true));'
          ], { line: 1, kind: 'logik', fixes: [
            'return (rolle === "ADMIN" || rolle === "MITARBEITER") && !gesperrt;',
            'return rolle === "ADMIN" || (rolle === "MITARBEITER" && !gesperrt);',
            'return rolle === "ADMIN" && rolle === "MITARBEITER" && !gesperrt;',
            'return (rolle === "ADMIN" || rolle === "MITARBEITER") || !gesperrt;'
          ], expect: 'true false' }, 'Bindet && stärker als ||? Welche Klammern fehlen?', '&& bindet stärker als ||! Ohne Klammer gilt !gesperrt nur für MITARBEITER, nicht für ADMIN. Nur die erste Korrektur erlaubt aktive Admins (true) und sperrt gesperrte Admins (false).')
        ]
      },

      /* ---------- 14. Vertiefung: JSON, async/await & DOM ---------- */
      {
        id: 'adv', standalone: true, domain: 'shop', stage: 4,
        title: 'Vertiefung: JSON, async/await und Webseiten (DOM)',
        goal: 'Du tauscht Shop-Daten per JSON aus, verstehst asynchronen Code mit Promises und async/await und weißt, wie JavaScript im Browser auf Klicks im DOM reagiert.',
        terms: ['Lambda'],
        parts: [
          A.text('JSON: die Sprache zwischen Frontend und Backend', 'Wenn ein Webshop Artikel vom Server lädt, reisen sie fast immer als **JSON** (JavaScript Object Notation): reiner Text mit geschweiften Klammern und doppelten Anführungszeichen. `JSON.stringify()` macht aus einem Objekt Text, `JSON.parse()` macht aus Text wieder ein Objekt.'),
          C([
            'const bestellung = { nr: 10427, artikel: "Funkmaus", summeInCent: 3998 };',
            'const text = JSON.stringify(bestellung);§Wandelt das Objekt in einen JSON-Text um.',
            'console.log(text);',
            'const geladen = JSON.parse(text);§Macht aus dem Text wieder ein nutzbares Objekt.',
            'console.log("Nr:", geladen.nr, "Summe:", geladen.summeInCent);'
          ], 'Shop-Daten als JSON speichern und laden', { praxis: 'Genau so speichert auch diese Lernplattform deinen Fortschritt im localStorage des Browsers und genauso sprechen REST-APIs miteinander.' }),
          A.text('Asynchron warten mit async und await', 'Einen Artikelkatalog vom Server zu laden dauert Millisekunden oder Sekunden. Würde JavaScript dabei alles anhalten, fröre die ganze Webseite ein. Stattdessen liefert ein Aufruf ein **Promise** (Versprechen auf ein späteres Ergebnis). In einer `async`-Funktion pausiert `await` nur diese eine Funktion, während die Oberfläche bedienbar bleibt.'),
          C([
            'function ladeLagerbestand(nr) {§Simuliert eine Server-Antwort per Promise.',
            '  return new Promise((fertig) => setTimeout(() => fertig(35), 300));',
            '}',
            'async function pruefeCheckout() {§async erlaubt await innerhalb der Funktion.',
            '  console.log("Prüfe Lager...");',
            '  const bestand = await ladeLagerbestand(1002);§Wartet auf das Ergebnis, ohne den Browser zu blockieren.',
            '  console.log("Auf Lager:", bestand);',
            '}',
            'pruefeCheckout();',
            'console.log("Seite bleibt währenddessen bedienbar!");§Erscheint noch VOR „Auf Lager: 35“.'
          ], 'async und await im Shop-Checkout', { noRun: true, praxis: 'Jeder fetch()-Aufruf im Browser nutzt async/await: Der Nutzer kann weiter scrollen, während im Hintergrund der Lagerbestand geladen wird.' }),
          A.text('Das DOM: Buttons und Warenkorb im Browser', 'Im Browser stellt das **DOM** (Document Object Model) die HTML-Seite als Baum aus Elementen dar. Mit `document.querySelector()` suchst du ein Element und reagierst mit `addEventListener("click", ...)` (einem **Lambda** / einer Pfeilfunktion) auf Klicks.'),
          C([
            'const kaufenBtn = document.querySelector("#kaufen");§Sucht den Button mit id="kaufen".',
            'const anzeige = document.querySelector("#korb-anzahl");',
            'let imKorb = 0;',
            'kaufenBtn.addEventListener("click", () => {§Lambda als Event-Handler: läuft bei jedem Klick.',
            '  imKorb++;',
            '  anzeige.textContent = `${imKorb} Artikel im Warenkorb`;§Aktualisiert den sichtbaren Text sicher (ohne XSS-Risiko).',
            '});'
          ], '„In den Warenkorb“-Button im Browser', { noRun: true, praxis: 'textContent setzt reinen Text statt HTML – das schützt automatisch vor Cross-Site-Scripting (XSS), anders als innerHTML.' })
        ],
        tips: [
          A.warn('Nutze zum Anzeigen von Nutzereingaben im DOM immer `textContent` statt `innerHTML`, um **XSS-Angriffe** zu verhindern.')
        ],
        quiz: [
          A.q('Was bewirkt `await` in einer `async`-Funktion?', ['Nur diese Funktion wartet auf das Promise, der Rest läuft weiter', 'Der gesamte Browser friert ein, bis der Server antwortet', 'Ein Fehler im Promise wird automatisch stumm ignoriert', 'Die Funktion wird zweimal parallel gestartet'], 0, 'await hält nur die eigene async-Funktion an, nicht die Oberfläche.'),
          A.q('Welche Methode wandelt einen JSON-Text zurück in ein JavaScript-Objekt?', ['JSON.parse()', 'JSON.stringify()', 'JSON.toObject()', 'Object.fromText()'], 0, 'stringify macht Objekt → Text, parse macht Text → Objekt.'),
          A.q('Warum ist `element.textContent = eingabe` sicherer als `element.innerHTML = eingabe`?', ['textContent führt kein eingeschleustes HTML/Script aus (XSS-Schutz)', 'textContent ist die einzige Eigenschaft, die Zahlen anzeigen kann', 'innerHTML funktioniert in modernen Browsern nicht mehr', 'textContent verschlüsselt den Text automatisch mit TLS'], 0, 'innerHTML interpretiert HTML-Tags und öffnet damit Tür und Tor für XSS.')
        ],
        tasks: [
          PP('Was gibt das Programm aus?', [
            'const json = \'{"name":"Headset","preis":3490}\';',
            'const a = JSON.parse(json);',
            'console.log(a.name, a.preis);'
          ], 'Headset 3490', 'JSON.parse wandelt den Text in ein Objekt mit name und preis.', 'a.name ist "Headset", a.preis ist 3490.'),
          A.fill('Ergänze das Schlüsselwort, damit die Funktion auf `ladeBestellung()` warten darf.', '{{async}} function zeigeStatus() {\n  const s = {{await}} ladeBestellung();\n}', 'Vor der Funktion async, vor dem Promise await.'),
          A.js('Schreibe `lesePreis(jsonText)`: parst einen JSON-Text mit Feld `preis` und gibt den Preis zurück (bei ungültigem JSON `-1`).', 'function lesePreis(jsonText) {\n  // dein Code\n}', [
            { fn: 'lesePreis', args: ['{"preis":1999}'], expect: 1999 },
            { fn: 'lesePreis', args: ['{"preis":0}'], expect: 0 },
            { fn: 'lesePreis', args: ['{kaputt'], expect: -1 }
          ], 'Nutze try { return JSON.parse(jsonText).preis; } catch (e) { return -1; }.', 'function lesePreis(jsonText) {\n  try { return JSON.parse(jsonText).preis; } catch (e) { return -1; }\n}')
        ]
      }
    ]
  });
})();
