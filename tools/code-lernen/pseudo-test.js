// Prüft den Pseudocode-Interpreter:  node tools/code-lernen/pseudo-test.js
const P = require('../../code-lernen/js/pseudo.js');
let fail = 0;
function t(name, src, expectOut, opts) {
  const r = P.run(src, opts);
  const out = r.output.trim();
  const ok = (r.error ? 'FEHLER: ' + r.error.msg : out) === expectOut;
  if (!ok) { fail++; console.log('FAIL', name, '\n  erwartet:', JSON.stringify(expectOut), '\n  erhalten:', JSON.stringify(r.error ? 'FEHLER: ' + r.error.msg : out)); }
  else console.log('ok  ', name, '(' + r.events.length + ' Schritte)');
}

t('Zuweisung + Ausgabe', 'a <- 5\nb ← 7\nSETZE c AUF a + b * 2\nAUSGABE "c ist", c', 'c ist 19');
t('Text verketten', 'name <- "Ada"\nAUSGABE "Hallo " + name + "!"', 'Hallo Ada!');
t('DIV MOD', 'AUSGABE 17 DIV 5, 17 MOD 5, 17 / 5', '3 2 3.4');
t('WENN', 'x <- 15\nWENN x < 10 DANN\n  AUSGABE "klein"\nSONST WENN x < 20 DANN\n  AUSGABE "mittel"\nSONST\n  AUSGABE "groß"\nENDE WENN', 'mittel');
t('UND ODER NICHT', 'a <- 5\nWENN a > 1 UND NICHT a > 10 DANN\n AUSGABE "ja"\nENDE WENN\nWENN a = 1 ODER a = 5 DANN\n AUSGABE "auch"\nENDE WENN', 'ja\nauch');
t('SOLANGE', 'n <- 1\nSOLANGE n < 100\n  n <- n * 2\nENDE SOLANGE\nAUSGABE n', '128');
t('WIEDERHOLE', 'n <- 0\nWIEDERHOLE\n  n <- n + 3\nBIS n >= 10\nAUSGABE n', '12');
t('FÜR', 's <- 0\nFÜR i VON 1 BIS 5\n  s <- s + i\nENDE FÜR\nAUSGABE s', '15');
t('FUER rückwärts', 'FUER i VON 3 BIS 1 SCHRITT -1\n AUSGABE i\nENDE FUER', '3\n2\n1');
t('FÜR JEDES', 'zahlen <- [4, 8, 15]\nsumme <- 0\nFÜR JEDES z IN zahlen\n  summe <- summe + z\nENDE FÜR\nAUSGABE summe, LÄNGE(zahlen)', '27 3');
t('Liste ändern', 'l <- [1,2,3]\nl[1] <- 20\nANHÄNGEN(l, 4)\nAUSGABE l', '[1, 20, 3, 4]');
t('Funktion', 'FUNKTION quadrat(x)\n  GIB ZURÜCK x * x\nENDE FUNKTION\nAUSGABE quadrat(7)', '49');
t('Rekursion', 'FUNKTION fak(n)\n  WENN n <= 1 DANN\n    GIB ZURÜCK 1\n  ENDE WENN\n  GIB ZURÜCK n * fak(n - 1)\nENDE FUNKTION\nAUSGABE fak(5)', '120');
t('Funktion nach Nutzung definiert', 'AUSGABE zwei()\nFUNKTION zwei()\n GIB ZURÜCK 2\nENDE FUNKTION', '2');
t('Kommentare', 'x <- 3 // Kommentar\n# noch einer\nAUSGABE "a // b", x', 'a // b 3');
t('Eingabe', 'EINGABE a\nEINGABE b\nAUSGABE a + b', '12', { inputs: ['5', '7'] });
t('Maximum', 'liste <- [3, 9, 2, 7]\nmax <- liste[0]\nFÜR JEDES z IN liste\n  WENN z > max DANN\n    max <- z\n  ENDE WENN\nENDE FÜR\nAUSGABE max', '9');

// Fehlerfälle
t('Endlosschleife', 'n <- 1\nSOLANGE n > 0\n n <- n + 1\nENDE SOLANGE', 'FEHLER: Abbruch nach 3000 Schritten – vermutlich eine Endlosschleife (die Bedingung wird nie FALSCH)');
t('Variable fehlt', 'AUSGABE y', 'FEHLER: Die Variable „y“ hat noch keinen Wert. Sie muss vorher mit ← gesetzt werden');
t('Index', 'l <- [1,2]\nAUSGABE l[2]', 'FEHLER: Index 2 gibt es nicht: gültig sind 0 bis 1 (die Zählung beginnt bei 0)');
t('Durch 0', 'AUSGABE 5 / 0', 'FEHLER: Durch 0 kann man nicht teilen');
t('Block offen', 'WENN 1 < 2 DANN\n AUSGABE 1', 'FEHLER: Der Block wird nicht abgeschlossen (es fehlt ein ENDE … oder BIS …)');
t('Streuner ENDE', 'AUSGABE 1\nENDE WENN', 'FEHLER: „ENDE WENN“ passt hier zu keinem Anfang (ein Block wurde nicht geöffnet oder schon geschlossen)');
t('Bedingung keine Bool', 'WENN 5 DANN\n AUSGABE 1\nENDE WENN', 'FEHLER: Hier muss eine Bedingung stehen (WAHR oder FALSCH), nicht 5');
t('Text minus', 'AUSGABE "a" - 1', 'FEHLER: „-“ rechnet nur mit Zahlen, hier steht aber "a"');

const r = P.run('x <- 1\nWENN x = 1 DANN\n  x <- 2\nENDE WENN');
console.log('Ereignisse:', r.events.map((e) => e.line + ':' + e.msg).join(' | '));
console.log(fail ? fail + ' FEHLER' : 'alle bestanden');
process.exit(fail ? 1 : 0);
