// Testet die IHK-Funktionen, die core.js auf SQLite nachrüstet:  node tools/code-lernen/sql-ihk-test.js
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..', 'code-lernen');
global.window = globalThis;
require(path.join(root, 'js/pseudo.js'));
require(path.join(root, 'js/uml.js'));
require(path.join(root, 'js/core.js'));
require(path.join(root, 'js/content/concepts.js')); // Beispieldatenbank (A.sqlSetup)
const A = globalThis.Academy;
const initSqlJs = require(path.join(root, 'js/vendor/sql-wasm.js'));
const b64 = fs.readFileSync(path.join(root, 'js/vendor/sql-wasm-b64.js'), 'utf8').match(/'([^']+)'/)[1];

const FAELLE = [
  // [Abfrage, erwarteter Wert]
  ["SELECT DATEDIFF(MINUTE, '2024-12-01 10:01', '2024-12-01 10:15')", 14],
  ["SELECT DATEDIFF(minute, '2024-12-01 23:58', '2024-12-02 00:03')", 5],
  ["SELECT DATEDIFF(HOUR, '2024-05-01 08:00', '2024-05-02 09:30')", 25],
  ["SELECT DATEDIFF(DAY, '2024-02-27', '2024-03-01')", 3],
  ["SELECT DATEDIFF(DAY, '2024-03-01', '2024-02-27')", -3],
  ["SELECT DATEDIFF(MONTH, '2023-12-15', '2024-01-02')", 1],
  ["SELECT DATEDIFF(YEAR, '2023-12-31', '2024-01-01')", 1],
  ["SELECT DATEADD(DAY, 1, '2024-02-28')", '2024-02-29'],
  ["SELECT DATEADD(MONTH, 1, '2024-01-31')", '2024-02-29'],
  ["SELECT DATEADD(YEAR, 1, '2024-02-29')", '2025-02-28'],
  ["SELECT DATEADD(MINUTE, 90, '2024-05-01 23:00')", '2024-05-02 00:30:00'],
  ["SELECT DATEADD(DAY, -10, '2024-01-05')", '2023-12-26'],
  ["SELECT YEAR('2024-05-31')", 2024],
  ["SELECT MONTH('2024-05-31 14:20')", 5],
  ["SELECT DAY('2024-05-31')", 31],
  ["SELECT HOUR('2024-05-31 14:20')", 14],
  ["SELECT MINUTE('2024-05-31 14:20')", 20],
  ["SELECT WEEKDAY('2024-12-02')", 0], // Montag
  ["SELECT WEEKDAY('2024-12-08')", 6], // Sonntag
  ["SELECT YEAR(NOW()) >= 2024", 1],
  ["SELECT LENGTH(NOW())", 19],
  ["SELECT LEFT('Hamburg', 3)", 'Ham'],
  ["SELECT RIGHT('Hamburg', 3)", 'urg'],
  ["SELECT RIGHT('Ulm', 0)", ''],
  ["SELECT YEAR(NULL)", null],
  ["SELECT ROUND(STDDEV(x), 4) FROM (SELECT 2 AS x UNION ALL SELECT 4 UNION ALL SELECT 4 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 5 UNION ALL SELECT 7 UNION ALL SELECT 9)", 2],
  ["SELECT VARIANCE(x) FROM (SELECT 1 AS x UNION ALL SELECT 3)", 1],
  ["SELECT COUNT(*) FROM ticket WHERE DATEDIFF(HOUR, erfasst, erledigt) <= 24", null] // nur: läuft auf der Beispieldatenbank
];

initSqlJs({ wasmBinary: Buffer.from(b64, 'base64') }).then((SQL) => {
  let fail = 0;
  for (const [q, soll] of FAELLE) {
    const db = A.sqlIhk(new SQL.Database()); db.run(A.sqlSetup);
    let ist;
    try { ist = db.exec(A.sqlFix(q))[0].values[0][0]; } catch (e) { ist = 'FEHLER: ' + e.message; }
    const ok = soll === null && /ticket/.test(q) ? typeof ist === 'number' : ist === soll;
    if (!ok) { fail++; console.log('FAIL  ' + q + '\n      erwartet ' + JSON.stringify(soll) + ', erhalten ' + JSON.stringify(ist)); }
  }
  // Ein unbekannter Datumsteil soll eine verständliche Meldung geben
  const db = A.sqlIhk(new SQL.Database());
  try { db.exec("SELECT DATEDIFF('WOCHE', '2024-01-01', '2024-02-01')"); fail++; console.log('FAIL  unbekannter Datumsteil wirft keinen Fehler'); } catch (e) { if (!/Datumsteil/.test(e.message)) { fail++; console.log('FAIL  Meldung: ' + e.message); } }
  console.log(fail ? fail + ' Fehler' : 'alle bestanden (' + (FAELLE.length + 1) + ')');
  process.exit(fail ? 1 : 0);
});
