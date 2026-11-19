/*
 * JavaScript ausführen, aber nur zum Üben: Der Code läuft in einem abgeschotteten Hintergrundprozess (js/runner.js) in deinem
 * Browser. Er wird nirgendwohin geschickt, nicht übersetzt und nicht auf einem Server ausgeführt. Nach 2,5 Sekunden wird der Prozess
 * hart beendet, damit eine Endlosschleife die Seite nicht einfriert.
 */
(function (g) {
  'use strict';
  function run(code, tests, timeout) {
    timeout = timeout || 2500;
    return new Promise((resolve) => {
      let w;
      try { w = new Worker('js/runner.js'); }
      catch (e) { resolve({ logs: [], error: 'Dein Browser erlaubt hier keinen abgeschotteten Hintergrundprozess. Öffne CodeLernen über die Website, dann klappt das Ausführen.', results: null }); return; }
      const timer = setTimeout(() => { w.terminate(); resolve({ logs: [], error: 'Zeitüberschreitung: Das Programm lief länger als ' + timeout / 1000 + ' Sekunden. Steckt irgendwo eine Endlosschleife?', results: null }); }, timeout);
      w.onmessage = (e) => { clearTimeout(timer); w.terminate(); const d = e.data || {}; resolve({ logs: Array.isArray(d.logs) ? d.logs.map(String) : [], error: d.error ? String(d.error) : null, results: Array.isArray(d.results) ? d.results : null }); };
      w.onerror = (e) => { clearTimeout(timer); w.terminate(); resolve({ logs: [], error: e.message || 'Fehler beim Ausführen', results: null }); };
      w.postMessage({ code, tests });
    });
  }
  g.Sandbox = { run };
})(window);
