// Baut aus einem Java-Beispiel eine übersetzbare Main.java. Gemeinsam für trace-bauen.js und run-predict.js.
// Aufbau eines Beispiels:
//   import …                    wandert an den Dateianfang
//   public class Artikel { … }  Typen vor „// in main“ werden eigene Klassen hinter Main (public entfällt, eine Datei)
//   static long versand(…) {…}  übrige Zeilen vor „// in main“ sind Methoden und Felder von Main
//   // in main                  ab hier der Rumpf von main; ohne Markierung ist das ganze Beispiel der Rumpf
// zeile: Zeile in Main.java (1-basiert) -> Zeile im Beispiel (0-basiert)
const VORSPANN = 'System.setOut(new java.io.PrintStream(new java.io.FileOutputStream(java.io.FileDescriptor.out), true, java.nio.charset.StandardCharsets.UTF_8));';

function bauen(lines) {
  const m = lines.findIndex((l) => /^\s*\/\/\s*in main/.test(l));
  const imp = (l) => /^\s*import\s/.test(l);
  const typStart = (l) => /^(public\s+)?((abstract|final)\s+)*(class|interface|enum|record)\s/.test(l);
  // Zeilen vor „// in main“ in Typen (eigene Klassen) und Rest (Mitglieder von Main) aufteilen
  const inTyp = new Set();
  for (let i = 0; i < (m < 0 ? 0 : m); i++) {
    if (!typStart(lines[i])) continue;
    let tiefe = 0, j = i;
    for (; j < m; j++) {
      for (const ch of lines[j].replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\/\/.*$/g, '')) { if (ch === '{') tiefe++; else if (ch === '}') tiefe--; }
      inTyp.add(j);
      if (tiefe === 0 && j > i - 1 && lines[j].includes('}')) break;
    }
    i = j;
  }
  const src = [], zeile = {};
  const push = (l, i) => { src.push(l); zeile[src.length] = i; };
  lines.forEach((l, i) => { if (imp(l)) push(l, i); });
  src.push('public class Main {');
  lines.forEach((l, i) => { if (m >= 0 && i < m && !imp(l) && !inTyp.has(i)) push(l, i); });
  src.push('public static void main(String[] args) { ' + VORSPANN);
  lines.forEach((l, i) => { if (i > m && !imp(l)) push(l, i); });
  src.push('__ende(); }', 'static void __ende() {}', '}');
  lines.forEach((l, i) => { if (inTyp.has(i)) push(typStart(l) ? l.replace(/^public\s+/, '') : l, i); });
  return { src: src.join('\n') + '\n', zeile };
}

module.exports = { bauen };
