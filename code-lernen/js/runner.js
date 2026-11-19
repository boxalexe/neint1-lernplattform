/*
 * Ausführer für JavaScript-Übungen (Web Worker, eigene Datei).
 *
 * Bild dazu: ein Übungsraum ohne Fenster und ohne Telefon. Der Code darf darin rechnen und Ausgaben auf einen Zettel schreiben,
 * mehr nicht. Er sieht die Seite nicht, kommt nicht an gespeicherte Daten und kann nichts ins Internet schicken.
 *
 * Drei Schichten:
 * 1. Die Sicherheitsrichtlinie (CSP) dieser Datei verbietet jede Netzwerkverbindung (Kopfzeilen in /_headers).
 * 2. Hier werden vor dem Start alle Wege nach außen abgeschaltet (fetch, WebSocket, importScripts und ähnliche).
 * 3. Die Seite beendet den Worker nach 2,5 Sekunden hart, eine Endlosschleife friert also nichts ein.
 */
'use strict';
(function () {
  const g = self;
  const AUSSEN = ['fetch', 'XMLHttpRequest', 'WebSocket', 'WebSocketStream', 'WebTransport', 'EventSource', 'importScripts', 'Worker', 'SharedWorker',
    'BroadcastChannel', 'MessageChannel', 'indexedDB', 'caches', 'RTCPeerConnection', 'Request', 'Response', 'Notification', 'FileReaderSync', 'storageFoundation'];
  // auf dem Worker selbst und auf allen Vorlagen darüber (sonst käme man über Object.getPrototypeOf(self).fetch doch heran)
  for (let o = g; o && o !== Object.prototype; o = Object.getPrototypeOf(o)) {
    for (const k of AUSSEN) { try { Object.defineProperty(o, k, { value: undefined, writable: false, configurable: false }); } catch (e) { /* nicht änderbar: dann greift die CSP */ } }
  }
  try { Object.defineProperty(g, 'navigator', { value: undefined, writable: false, configurable: false }); } catch (e) { /* CSP greift */ }
})();

const antworten = self.postMessage.bind(self);
const logs = [];
function show(v) {
  if (typeof v === 'string') return v;
  if (v === undefined) return 'undefined';
  if (typeof v === 'function') return v.toString();
  if (typeof v === 'object' && v !== null) { try { return JSON.stringify(v); } catch (e) { return String(v); } }
  return String(v);
}
console.log = (...a) => { logs.push(a.map(show).join(' ').slice(0, 2000)); if (logs.length > 500) throw new Error('Zu viele Ausgaben (mehr als 500 Zeilen)'); };
console.info = console.warn = console.error = console.log;

self.onmessage = (e) => {
  self.onmessage = null;
  const code = String((e.data && e.data.code) || ''), tests = e.data && e.data.tests;
  let error = null, results = null;
  if (code.length > 20000) { antworten({ logs, error: 'Der Code ist zu lang für eine Übung (höchstens 20.000 Zeichen).', results }); return; }
  try { (0, eval)(code); } catch (err) { error = (err && err.name ? err.name + ': ' : '') + ((err && err.message) || err); }
  if (!error && Array.isArray(tests)) {
    results = [];
    for (const t of tests) {
      try {
        const fn = self[t.fn];
        if (typeof fn !== 'function') { results.push({ ok: false, msg: 'Die Funktion ' + t.fn + ' gibt es nicht. Schreib den Namen genau so, mit function ' + t.fn + '(...)' }); continue; }
        const r = fn(...JSON.parse(JSON.stringify(t.args)));
        results.push({ ok: JSON.stringify(r) === JSON.stringify(t.expect), got: show(r) });
      } catch (err) { results.push({ ok: false, msg: String(err) }); }
    }
  }
  antworten({ logs, error, results });
};
