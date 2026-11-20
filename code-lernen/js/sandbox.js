/*
 * Führt JavaScript-Übungen in einem Web Worker (js/runner.js) aus. Kein Netzwerkzugriff, kein Server.
 * Nach 2,5 Sekunden wird der Worker beendet, damit Endlosschleifen die Seite nicht blockieren.
 */
(function (g) {
  'use strict';
  // Pfad zum Ausführer relativ zu dieser Datei, damit er auch unter /code-lernen/kurs/…/ gefunden wird
  const RUNNER = new URL('runner.js', document.currentScript.src).href;
  function run(code, tests, timeout) {
    timeout = timeout || 2500;
    return new Promise((resolve) => {
      let w;
      try { w = new Worker(RUNNER); }
      catch (e) { resolve({ logs: [], error: 'Dein Browser erlaubt hier keinen abgeschotteten Hintergrundprozess. Öffne Code lesen über die Website, dann klappt das Ausführen.', results: null }); return; }
      const timer = setTimeout(() => { w.terminate(); resolve({ logs: [], error: 'Zeitüberschreitung: Das Programm lief länger als ' + timeout / 1000 + ' Sekunden. Steckt irgendwo eine Endlosschleife?', results: null }); }, timeout);
      w.onmessage = (e) => { clearTimeout(timer); w.terminate(); const d = e.data || {}; resolve({ logs: Array.isArray(d.logs) ? d.logs.map(String) : [], error: d.error ? String(d.error) : null, results: Array.isArray(d.results) ? d.results : null }); };
      w.onerror = (e) => { clearTimeout(timer); w.terminate(); resolve({ logs: [], error: e.message || 'Fehler beim Ausführen', results: null }); };
      w.postMessage({ code, tests });
    });
  }
  g.Sandbox = { run };
})(window);
