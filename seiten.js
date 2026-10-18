// Einzelseiten (Themenfelder, Kapitel, Übersicht; tools/seiten-bauen.mjs): Kopf und Menüleiste verhalten sich wie in der
// App (app.js), ohne die App selbst zu laden. Auge = Farbschema, Lupe = Suche im gesamten Nachschlagewerk,
// Menü am Handy, Zen, Leiste beim Runterscrollen ausblenden, Pfeil nach oben mit demselben Übergang.
(function(){
  'use strict';

  // ---- Farbschema (Auge) ----
  (function(){
    const toggle = document.getElementById('a11yToggle');
    const menu = document.getElementById('a11yMenu');
    if(!toggle || !menu) return;
    const opts = menu.querySelectorAll('.a11y-opt');
    const STORE_KEY = 'l8a_theme';
    const aktuell = () => { try { return localStorage.getItem(STORE_KEY) || 'default'; } catch(e){ return 'default'; } };
    const markiere = (t) => opts.forEach(o => o.classList.toggle('active', o.dataset.theme === t));
    function setze(t){
      if(t === 'default') document.documentElement.removeAttribute('data-theme');
      else document.documentElement.setAttribute('data-theme', t);
      try { localStorage.setItem(STORE_KEY, t); } catch(e){}
      markiere(t);
    }
    const zu = () => { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };
    markiere(aktuell());
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if(menu.classList.contains('open')) zu();
      else { menu.classList.add('open'); toggle.setAttribute('aria-expanded', 'true'); }
    });
    opts.forEach(o => o.addEventListener('click', () => { setze(o.dataset.theme); zu(); }));
    document.addEventListener('click', (e) => { if(!menu.contains(e.target) && e.target !== toggle) zu(); });
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape') zu(); });
  })();

  // ---- Lupe: die Suche gehört zum gesamten Nachschlagewerk (Startseite), dort öffnet sie sich ----
  const lupe = document.getElementById('qsToggle');
  if(lupe) lupe.addEventListener('click', () => { location.href = '/#suche'; });

  // ---- Menü am Handy ----
  const bar = document.getElementById('tabBar');
  const menuBtn = document.getElementById('menuToggle');
  function menuZu(){
    if(!bar || !menuBtn) return;
    bar.classList.remove('menu-open');
    menuBtn.textContent = 'Menü öffnen';
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  let menuSchonzeit = false;
  if(bar && menuBtn){
    menuBtn.addEventListener('click', () => {
      const offen = bar.classList.toggle('menu-open');
      menuBtn.textContent = offen ? 'Menü schließen' : 'Menü öffnen';
      menuBtn.setAttribute('aria-expanded', offen ? 'true' : 'false');
      if(offen){
        bar.classList.remove('hidden');
        letzteY = window.scrollY; weg = 0;
        menuSchonzeit = true;
        setTimeout(() => { menuSchonzeit = false; }, 450);
      }
    });
  }

  // ---- Zen: Vollbild und Fokus ----
  const zen = document.getElementById('zenToggle');
  const vollbild = () => document.fullscreenElement || document.webkitFullscreenElement;
  if(zen){
    zen.addEventListener('click', (e) => {
      e.stopPropagation();
      const el = document.documentElement;
      if(document.body.classList.contains('zen')){
        document.body.classList.remove('zen');
        const aus = document.exitFullscreen || document.webkitExitFullscreen;
        if(aus && vollbild()) aus.call(document);
      } else {
        document.body.classList.add('zen');
        const an = el.requestFullscreen || el.webkitRequestFullscreen;
        if(an) an.call(el);
      }
      if(window.innerWidth <= 560) menuZu();
    });
    ['fullscreenchange', 'webkitfullscreenchange'].forEach(ev => document.addEventListener(ev, () => {
      if(!vollbild()) document.body.classList.remove('zen');
    }));
  }

  // ---- Menüleiste beim Runterscrollen ausblenden, beim Hochscrollen zeigen (wie in der App) ----
  let letzteY = window.scrollY, richtung = 0, weg = 0, tick = false;
  function beimScrollen(){
    tick = false;
    if(!bar) return;
    const maxY = document.documentElement.scrollHeight - window.innerHeight, y = window.scrollY;
    if(y < 0 || y > maxY) return;
    const d = y - letzteY;
    letzteY = y;
    if(d === 0) return;
    const r = d > 0 ? 1 : -1;
    if(r !== richtung){ richtung = r; weg = 0; }
    weg += Math.abs(d);
    if(bar.classList.contains('menu-open')){
      bar.classList.remove('hidden');
      if(!menuSchonzeit && richtung === 1 && weg > 14) menuZu();
      return;
    }
    if(y < 60){ bar.classList.remove('hidden'); return; }
    if(richtung === 1 && weg > 14) bar.classList.add('hidden');
    else if(richtung === -1 && weg > 10) bar.classList.remove('hidden');
  }
  window.addEventListener('scroll', () => { if(!tick){ window.requestAnimationFrame(beimScrollen); tick = true; } }, { passive: true });

  // ---- Pfeil nach oben: kurz abblenden, oben wieder einblenden (wie in der App) ----
  function nachOben(){
    const sanft = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(sanft || document.querySelector('.tp-overlay')){ window.scrollTo(0, 0); return; }
    const o = document.createElement('div');
    o.className = 'tp-overlay';
    o.innerHTML = '<div class="tp-beam"></div><div class="tp-ring"></div>';
    document.body.appendChild(o);
    window.requestAnimationFrame(() => o.classList.add('tp-in'));
    setTimeout(() => { window.scrollTo(0, 0); o.classList.add('tp-out'); }, 620);
    setTimeout(() => o.classList.remove('tp-in'), 700);
    setTimeout(() => { if(o.parentNode) o.parentNode.removeChild(o); }, 1400);
  }
  const pfeil = document.getElementById('scrollTopBtn');
  if(pfeil){
    let t2 = false;
    const zeige = () => { t2 = false; pfeil.classList.toggle('show', window.scrollY > 400); };
    window.addEventListener('scroll', () => { if(!t2){ window.requestAnimationFrame(zeige); t2 = true; } }, { passive: true });
    pfeil.addEventListener('click', nachOben);
    zeige();
  }
})();
