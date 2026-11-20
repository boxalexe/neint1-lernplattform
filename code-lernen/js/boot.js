// Markiert die Seite als JavaScript-fähig, bevor der Inhalt gezeichnet wird. Vorgerenderter Inhalt bleibt dann
// unsichtbar, bis app.js ihn ersetzt (kein Aufblitzen). Ohne JavaScript bleibt er sichtbar.
// Startet die App nicht (Skriptfehler), wird er nach dem Laden der Seite doch gezeigt.
(function () {
  document.documentElement.classList.add('js');
  const zeigen = () => { const m = document.getElementById('main'); if (m) m.removeAttribute('data-vorab'); };
  window.addEventListener('error', zeigen, true);
  window.addEventListener('load', () => setTimeout(zeigen, 1000));
})();
