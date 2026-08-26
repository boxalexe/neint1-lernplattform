/* AP1-Prüfungssimulation — Engine
   Statusfolge: setup -> running -> submitted -> review -> completed */
(function () {
'use strict';

var KEY = 'ap1sim_state_v1';
var DONE_KEY = 'ap1sim_done_v1';
var state = null;
var tickHandle = null;

/* ---------- Hilfsfunktionen ---------- */
function $(id) { return document.getElementById(id); }
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function load(k, def) {
  try { var v = window.localStorage.getItem(k); return v ? JSON.parse(v) : def; }
  catch (e) { return def; }
}
function save(k, v) { try { window.localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

// Platzhalter gelten als leer
function isEmpty(v) {
  var t = String(v == null ? '' : v).trim();
  if (!t) return true;
  if (/^[-.,;:_/]+$/.test(t)) return true;
  return ['k.a.', 'ka', 'weiter', 'keine angabe', 'x', 'xx', '?'].indexOf(t.toLowerCase()) >= 0;
}
function examById(id) {
  for (var i = 0; i < EXAMS.length; i++) if (EXAMS[i].examId === id) return EXAMS[i];
  return null;
}
function allSubtasks(exam) {
  var out = [];
  exam.tasks.forEach(function (t) {
    t.subtasks.forEach(function (s) { out.push({ task: t, sub: s }); });
  });
  return out;
}
function fmtTime(ms) {
  if (ms < 0) ms = 0;
  var total = Math.ceil(ms / 1000);
  var m = Math.floor(total / 60), s = total % 60;
  return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}
function showView(id) {
  ['viewSetup', 'viewRun', 'viewReview', 'viewResult'].forEach(function (v) {
    $(v).classList.toggle('active', v === id);
  });
  window.scrollTo({ top: 0, behavior: 'auto' });
}
function noteFor(points) {
  for (var i = 0; i < RESULT_SCALE.length; i++) {
    if (points >= RESULT_SCALE[i].min) return RESULT_SCALE[i].note;
  }
  return 6;
}

/* ---------- Modal ---------- */
var modalCb = null;
function askConfirm(title, text, cb) {
  $('modalTitle').textContent = title;
  $('modalText').textContent = text;
  modalCb = cb;
  // Ohne Callback ist es ein reiner Hinweis: kein Abbrechen nötig
  $('modalCancel').hidden = !cb;
  $('modalOk').textContent = cb ? 'Bestätigen' : 'Verstanden';
  $('modal').hidden = false;
}
$('modalCancel').addEventListener('click', function () {
  $('modal').hidden = true; modalCb = null;
});
$('modalOk').addEventListener('click', function () {
  $('modal').hidden = true;
  var cb = modalCb; modalCb = null;
  if (cb) cb();
});

/* ---------- SETUP ---------- */
function renderSetup() {
  var done = load(DONE_KEY, []);
  var box = $('examChoices');
  box.innerHTML = '';
  EXAMS.forEach(function (ex) {
    var isDone = done.indexOf(ex.examId) >= 0;
    var lab = document.createElement('label');
    lab.className = 'choice' + (isDone ? ' done' : '');
    lab.innerHTML =
      '<input type="radio" name="examPick" value="' + esc(ex.examId) + '">' +
      '<span><b>' + esc(ex.examId) + ' — ' + esc(ex.branche) + '</b>' +
      '<small>' + ex.tasks.length + ' Aufgaben · ' + ex.maxPoints + ' Punkte · ' +
      ex.durationMinutes + ' Minuten' + (isDone ? ' · bereits absolviert, Wiederholung möglich' : '') + '</small></span>';
    box.appendChild(lab);
  });
  box.addEventListener('change', function () {
    Array.prototype.forEach.call(box.querySelectorAll('.choice'), function (c) {
      var r = c.querySelector('input');
      c.classList.toggle('sel', r.checked);
    });
    checkSetup();
  });
  ['fVorname', 'fNachname', 'fCode'].forEach(function (id) {
    $(id).addEventListener('input', checkSetup);
  });
  $('fAck').addEventListener('change', checkSetup);
  checkSetup();
}

function setupValues() {
  var picked = document.querySelector('input[name="examPick"]:checked');
  return {
    vorname: $('fVorname').value.trim(),
    nachname: $('fNachname').value.trim(),
    code: $('fCode').value.trim(),
    ack: $('fAck').checked,
    examId: picked ? picked.value : null
  };
}
function checkSetup() {
  var v = setupValues();
  var missing = [];
  if (!v.vorname) missing.push('Vorname');
  if (!v.nachname) missing.push('Nachname');
  if (!v.code) missing.push('Prüflingskennung');
  if (!v.examId) missing.push('Auswahl der Simulation');
  if (!v.ack) missing.push('Bestätigung');
  $('setupHint').textContent = missing.length
    ? 'Noch offen: ' + missing.join(', ') + '.'
    : 'Alle Angaben vollständig. Der Countdown startet sofort nach dem Klick.';
  $('btnStart').disabled = missing.length > 0;
}

// Zufällige Prüfung wählen
var btnRandom = $('btnRandom');
if (btnRandom) {
  btnRandom.addEventListener('click', function () {
    var radios = document.querySelectorAll('input[name="examPick"]');
    if (!radios.length) return;
    var pick = radios[Math.floor(Math.random() * radios.length)];
    pick.checked = true;
    var ev = document.createEvent('Event');
    ev.initEvent('change', true, true);
    pick.dispatchEvent(ev);
  });
}

$('btnStart').addEventListener('click', function () {
  var v = setupValues();
  if (!v.examId) return;
  var exam = examById(v.examId);
  var now = Date.now();
  try { window.localStorage.removeItem(KEY); } catch (e) {}   // alten Stand verwerfen
  state = {
    status: 'running',
    examId: v.examId,
    student: { vorname: v.vorname, nachname: v.nachname, code: v.code },
    startTs: now,
    endTs: now + exam.durationMinutes * 60000,  // absoluter Endzeitpunkt
    submitTs: null,
    autoSubmit: false,
    answers: {},
    checks: {}
  };
  save(KEY, state);
  startRun();
});

/* ---------- PRÜFUNG ---------- */
function startRun() {
  var exam = examById(state.examId);
  $('examHead').hidden = false;
  $('ehId').textContent = exam.examId;
  $('runTitle').textContent = exam.title;
  $('runScenario').textContent = exam.scenario;
  renderTasks(exam);
  showView('viewRun');
  startTimer();
  updateProgress();
}

function renderTasks(exam) {
  var area = $('taskArea');
  area.innerHTML = '';
  exam.tasks.forEach(function (t) {
    var el = document.createElement('article');
    el.className = 'task';
    var html = '<div class="task-head"><h2>' + esc(t.id) + '. Aufgabe — ' + esc(t.title) +
      '</h2><span class="task-pts">' + t.points + ' Punkte</span></div>';
    if (t.context) html += '<div class="task-context">' + esc(t.context) + '</div>';
    t.subtasks.forEach(function (s) {
      var mono = (s.answerType === 'code' || s.answerType === 'number_with_working' ||
                  s.answerType === 'diagram_text' || s.answerType === 'table');
      html += '<div class="sub">' +
        '<div class="sub-head"><span class="sub-id">' + esc(s.id) + ')</span>' +
        '<span class="sub-op">' + esc(s.operator) + '</span>' +
        '<span class="sub-pts">' + s.points + ' P<span class="filled-dot" data-dot="' + esc(s.id) + '"></span></span></div>' +
        '<div class="sub-prompt">' + esc(s.prompt) + '</div>' +
        (s.minRequirements ? '<div class="sub-min">Erwartet: ' + esc(s.minRequirements) + '</div>' : '') +
        '<textarea data-ans="' + esc(s.id) + '" class="' + (mono ? 'mono' : '') +
        '" placeholder="Ihre Antwort"></textarea></div>';
    });
    el.innerHTML = html;
    area.appendChild(el);
  });

  Array.prototype.forEach.call(area.querySelectorAll('textarea[data-ans]'), function (ta) {
    var id = ta.getAttribute('data-ans');
    if (state.answers[id]) ta.value = state.answers[id];
    ta.addEventListener('input', function () {
      state.answers[id] = ta.value;
      save(KEY, state);
      updateProgress();
    });
  });
}

function updateProgress() {
  if (!state || state.status !== 'running') return;
  var exam = examById(state.examId);
  var list = allSubtasks(exam);
  var filled = 0;
  list.forEach(function (x) {
    var ok = !isEmpty(state.answers[x.sub.id]);
    if (ok) filled++;
    var dot = document.querySelector('[data-dot="' + x.sub.id + '"]');
    if (dot) dot.classList.toggle('on', ok);
  });
  $('ehProgress').textContent = filled + ' / ' + list.length + ' Felder';
  var open = list.length - filled;
  $('submitHint').textContent = open === 0
    ? 'Alle Felder befüllt. Die Abgabe ist unwiderruflich.'
    : open + ' Feld(er) noch leer. Eine Abgabe ist möglich, leere Felder werden mit 0 Punkten bewertet.';
}

/* ---------- TIMER (absoluter Endzeitpunkt) ---------- */
function startTimer() {
  if (tickHandle) clearInterval(tickHandle);
  tick();
  tickHandle = setInterval(tick, 250);
}
function tick() {
  if (!state || state.status !== 'running') return;
  var left = state.endTs - Date.now();
  var el = $('ehTimer');
  el.textContent = fmtTime(left);
  el.classList.toggle('warn', left <= 10 * 60000 && left > 2 * 60000);
  el.classList.toggle('crit', left <= 2 * 60000);
  if (left <= 0) {
    clearInterval(tickHandle); tickHandle = null;
    doSubmit(true);
  }
}

/* ---------- ABGABE ---------- */
$('btnSubmit').addEventListener('click', function () {
  var exam = examById(state.examId);
  var list = allSubtasks(exam);
  var open = list.filter(function (x) { return isEmpty(state.answers[x.sub.id]); }).length;
  var left = fmtTime(state.endTs - Date.now());
  var txt = 'Verbleibende Zeit: ' + left + '\n' +
    (open ? open + ' Feld(er) sind noch leer und werden mit 0 Punkten bewertet.\n' : 'Alle Felder sind befüllt.\n') +
    '\nDie Abgabe ist unwiderruflich. Danach sind keine Änderungen mehr möglich.';
  askConfirm('Prüfung abgeben?', txt, function () { doSubmit(false); });
});

function doSubmit(auto) {
  if (!state || state.status !== 'running') return;
  if (tickHandle) { clearInterval(tickHandle); tickHandle = null; }
  state.status = 'submitted';
  state.submitTs = Date.now();
  state.autoSubmit = !!auto;
  Object.freeze(state.answers);
  save(KEY, state);
  $('examHead').hidden = true;
  renderReview();
  if (auto) {
    askConfirm('Zeit abgelaufen', 'Die Bearbeitungszeit ist beendet. Die Prüfung wurde automatisch abgegeben.\nDer Lösungsbogen ist jetzt freigeschaltet.', null);
  }
}

/* ---------- LÖSUNGSBOGEN ---------- */
function renderReview() {
  var exam = examById(state.examId);
  state.status = 'review';
  save(KEY, state);

  var used = Math.round((state.submitTs - state.startTs) / 1000);
  $('reviewMeta').textContent =
    state.student.vorname + ' ' + state.student.nachname + ' · ' + state.student.code +
    ' · ' + exam.examId + ' · Bearbeitungszeit ' + fmtTime(used * 1000) + ' (mm:ss)' +
    (state.autoSubmit ? ' · automatische Abgabe bei Zeitablauf' : ' · freiwillige Abgabe');

  var area = $('reviewArea');
  area.innerHTML = '';
  exam.tasks.forEach(function (t) {
    var el = document.createElement('article');
    el.className = 'task';
    var html = '<div class="task-head"><h2>' + esc(t.id) + '. Aufgabe — ' + esc(t.title) +
      '</h2><span class="task-pts" data-tsum="' + esc(t.id) + '">0 / ' + t.points + ' P</span></div>';
    t.subtasks.forEach(function (s) {
      var ans = state.answers[s.id];
      var empty = isEmpty(ans);
      html += '<div class="sub">' +
        '<div class="sub-head"><span class="sub-id">' + esc(s.id) + ')</span>' +
        '<span class="sub-op">' + esc(s.operator) + '</span>' +
        '<span class="sub-pts">' + s.points + ' P</span></div>' +
        '<div class="sub-prompt">' + esc(s.prompt) + '</div>' +
        '<div class="block"><div class="block-label lbl-answer">Ihre Antwort</div>' +
        '<div class="answer-box' + (empty ? ' empty' : '') + '">' +
        (empty ? 'Keine Antwort abgegeben.' : esc(ans)) + '</div></div>' +
        '<div class="block"><div class="block-label lbl-solution">Musterlösung / Erwartungshorizont</div>' +
        '<div class="solution-box">' + esc(s.solution) + '</div></div>' +
        '<div class="block"><div class="block-label lbl-answer">Bewertungskriterien</div><ul class="rubric">';
      s.rubric.forEach(function (r) {
        html += '<li data-rli="' + esc(r.id) + '"><input type="checkbox" data-rub="' + esc(r.id) +
          '" data-pts="' + r.points + '" data-sub="' + esc(s.id) + '" data-task="' + esc(t.id) + '">' +
          '<span>' + esc(r.criterion) + '</span><span class="rp">' + r.points + ' P</span></li>';
      });
      html += '</ul><div class="sub-score" data-ssum="' + esc(s.id) + '">0 / ' + s.points + ' Punkte</div></div></div>';
    });
    el.innerHTML = html;
    area.appendChild(el);
  });

  Array.prototype.forEach.call(area.querySelectorAll('input[data-rub]'), function (cb) {
    var rid = cb.getAttribute('data-rub');
    if (state.checks[rid]) cb.checked = true;
    cb.addEventListener('change', function () {
      state.checks[rid] = cb.checked;
      save(KEY, state);
      recalc();
    });
  });
  recalc();
  showView('viewReview');
}

function recalc() {
  var exam = examById(state.examId);
  var total = 0, allDone = true, unresolved = 0;
  exam.tasks.forEach(function (t) {
    var tsum = 0;
    t.subtasks.forEach(function (s) {
      var ssum = 0;
      s.rubric.forEach(function (r) {
        if (state.checks[r.id] === true) ssum += r.points;
        if (state.checks[r.id] === undefined) { allDone = false; unresolved++; }
      });
      tsum += ssum;
      var se = document.querySelector('[data-ssum="' + s.id + '"]');
      if (se) se.textContent = ssum + ' / ' + s.points + ' Punkte';
      s.rubric.forEach(function (r) {
        var li = document.querySelector('[data-rli="' + r.id + '"]');
        if (li) li.classList.toggle('checked', state.checks[r.id] === true);
      });
    });
    total += tsum;
    var te = document.querySelector('[data-tsum="' + t.id + '"]');
    if (te) te.textContent = tsum + ' / ' + t.points + ' P';
  });
  $('reviewHint').textContent = allDone
    ? 'Alle Kriterien bearbeitet. Zwischenstand: ' + total + ' von ' + exam.maxPoints + ' Punkten.'
    : unresolved + ' Kriterium(en) noch nicht bearbeitet. Nicht angehakte Kriterien zählen als nicht erfüllt.';
  return total;
}

/* ---------- AUSWERTUNG ---------- */
$('btnFinish').addEventListener('click', function () {
  var exam = examById(state.examId);
  var total = recalc();
  state.status = 'completed';
  save(KEY, state);
  var done = load(DONE_KEY, []);
  if (done.indexOf(state.examId) < 0) { done.push(state.examId); save(DONE_KEY, done); }

  var pct = Math.round(total / exam.maxPoints * 1000) / 10;
  $('scoreBig').textContent = total + ' / ' + exam.maxPoints;
  $('scoreSub').textContent = pct + ' % · Orientierungsnote ' + noteFor(total) +
    ' · Bearbeitungszeit ' + fmtTime(state.submitTs - state.startTs) + ' (mm:ss)';

  var pt = $('perTask'); pt.innerHTML = '';
  var weak = [];
  exam.tasks.forEach(function (t) {
    var tsum = 0;
    t.subtasks.forEach(function (s) {
      s.rubric.forEach(function (r) { if (state.checks[r.id] === true) tsum += r.points; });
    });
    var q = t.points ? tsum / t.points : 0;
    if (q < 0.67) weak.push(t.title);
    pt.innerHTML += '<div class="bar-row"><span class="bl">' + esc(t.title) + '</span>' +
      '<span class="bar"><span style="width:' + Math.round(q * 100) + '%"></span></span>' +
      '<span class="bv">' + tsum + ' / ' + t.points + '</span></div>';
  });

  var ml = $('missedList'); ml.innerHTML = '';
  exam.tasks.forEach(function (t) {
    t.subtasks.forEach(function (s) {
      s.rubric.forEach(function (r) {
        if (state.checks[r.id] !== true) {
          ml.innerHTML += '<div class="missed"><b>' + esc(s.id) + ')</b>' +
            esc(r.criterion) + ' (' + r.points + ' P)</div>';
        }
      });
    });
  });
  if (!ml.innerHTML) ml.innerHTML = '<p class="ok-note">Alle Kriterien wurden als erfüllt markiert.</p>';

  var wl = $('weakList');
  wl.innerHTML = weak.length
    ? weak.map(function (w) { return '<span class="chip">' + esc(w) + '</span>'; }).join('')
    : '<p class="ok-note">Kein Themenfeld unter zwei Dritteln der Punkte.</p>';

  showView('viewResult');
});

$('btnReopen').addEventListener('click', function () { showView('viewReview'); });
$('btnReset').addEventListener('click', function () {
  askConfirm('Neue Prüfung beginnen?',
    'Die aktuelle Prüfung wird verworfen und Sie kehren zur Auswahl zurück. Die Auswertung geht dabei verloren.',
    function () {
      try { window.localStorage.removeItem(KEY); } catch (e) {}
      state = null;
      if (tickHandle) { clearInterval(tickHandle); tickHandle = null; }
      resetSetupForm();
      renderSetup();
      $('examHead').hidden = true;
      showView('viewSetup');
    });
});

// Formular für eine neue Prüfung leeren
function resetSetupForm() {
  $('fAck').checked = false;
  var picked = document.querySelector('input[name="examPick"]:checked');
  if (picked) picked.checked = false;
  Array.prototype.forEach.call(document.querySelectorAll('.choice'), function (ch) {
    ch.classList.remove('sel');
  });
  $('taskArea').innerHTML = '';
  $('reviewArea').innerHTML = '';
  checkSetup();
}

/* ---------- WIEDERAUFNAHME ---------- */
function boot() {
  renderSetup();
  var s = load(KEY, null);
  if (!s || !examById(s.examId)) { showView('viewSetup'); return; }
  state = s;
  if (state.status === 'running') {
    if (Date.now() >= state.endTs) {   // Zeit während der Abwesenheit abgelaufen
      startRunSilent();
      doSubmit(true);
    } else {
      startRun();
    }
  } else if (state.status === 'submitted' || state.status === 'review' || state.status === 'completed') {
    renderReview();
  }
}
function startRunSilent() {
  var exam = examById(state.examId);
  $('runTitle').textContent = exam.title;
  $('runScenario').textContent = exam.scenario;
  renderTasks(exam);
}

boot();
})();

/* ---- Barrierefreiheit: Kontrast-Umschalter ---- */
(function () {
  var toggle = document.getElementById('a11yToggle');
  var menu = document.getElementById('a11yMenu');
  if (!toggle || !menu) return;
  var opts = menu.querySelectorAll('.a11y-opt');
  var KEY_T = 'ap1sim_theme';
  function apply(theme) {
    if (theme === 'default') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', theme);
    try { window.localStorage.setItem(KEY_T, theme); } catch (e) {}
    opts.forEach(function (o) { o.classList.toggle('active', o.dataset.theme === theme); });
  }
  var cur = 'default';
  try { cur = window.localStorage.getItem(KEY_T) || 'default'; } catch (e) {}
  apply(cur);
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  opts.forEach(function (o) {
    o.addEventListener('click', function () {
      apply(o.dataset.theme);
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('click', function (e) {
    if (!menu.contains(e.target) && e.target !== toggle) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') menu.classList.remove('open'); });
})();

/* ---- Nach oben scrollen ---- */
(function () {
  var btn = document.getElementById('scrollTopBtn');
  if (!btn) return;
  var ticking = false;
  function upd() { ticking = false; btn.classList.toggle('show', window.scrollY > 400); }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(upd); ticking = true; }
  }, { passive: true });
  btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
})();
