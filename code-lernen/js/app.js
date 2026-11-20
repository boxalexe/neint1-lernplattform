/* Oberfläche der Lern-App: Navigation, Lektionen, Player, Quiz, Übungen, Spielwiesen. Alles lokal, nichts wird gesendet. */
(function () {
  'use strict';
  const A = window.Academy, esc = A.esc, md = A.md;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* ---------- Adressen ----------
     Kurse und Lektionen haben eigene Seiten, die Google findet (tools/code-lernen/seiten-bauen.js): /code-lernen/kurs/<kurs>/<lektion>/ */
  const BASE = (location.pathname.match(/^(.*?\/code-lernen\/)/) || [])[1] || '/code-lernen/';
  let PATHS_ = null;
  const PATHS = () => {
    if (!PATHS_) { PATHS_ = {}; for (const t of A.tracks) for (const s of t.lessons) PATHS_[t.id + '-' + (s.concept || s.id)] = BASE + 'kurs/' + t.id + '/' + (s.concept || s.id) + '/'; }
    return PATHS_;
  };
  const kursUrl = (id) => BASE + 'kurs/' + id + '/';
  const lessonUrl = (id) => PATHS()[id] || BASE + '#/lesson/' + id;

  /* ---------- Fortschritt ---------- */
  const KEY = 'codelernen.v1';
  let P = { done: {}, task: {}, quiz: {}, theme: 'dark', font: 100, last: null };
  try { P = Object.assign(P, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { /* ohne Speicher läuft alles trotzdem */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) { /* egal */ } };

  /* ---------- Mounts: HTML-Platzhalter, die nach dem Einsetzen zu Bedienelementen werden ---------- */
  let MOUNTS = [];
  const mount = (kind, data) => { MOUNTS.push({ kind, data }); return '<div class="mount" data-m="' + (MOUNTS.length - 1) + '"></div>'; };
  function activate(root) {
    $$('.mount', root).forEach((el) => {
      const m = MOUNTS[+el.dataset.m];
      if (!m || el.dataset.ready) return;
      el.dataset.ready = '1';
      ({ code: initCode, trace: initTrace, quiz: initQuiz, tasks: initTasks, status: initStatus })[m.kind](el, m.data);
    });
  }

  /* ---------- Ablauf-Player (Pseudocode) ---------- */
  function tracePlayer(el, src, inputs) {
    const lines = src.split('\n');
    const r = Pseudo.run(src, { inputs });
    const ev = r.events;
    if (!ev.length) {
      el.innerHTML = '<div class="note note-warn"><b>Fehler</b> ' + (r.error ? 'Zeile ' + (r.error.line + 1) + ': ' + esc(r.error.msg) : 'Es gibt nichts auszuführen.') + '</div>';
      return;
    }
    let i = -1, timer = null;
    el.innerHTML = '<div class="trace"><div class="tr-code"></div><div class="tr-side"><div class="tr-msg"></div><div class="tr-vars"></div><div class="tr-outw"><h5>Ausgabe</h5><pre class="tr-out"></pre></div></div></div>'
      + '<div class="tr-ctl"><button data-a="reset" title="Zum Anfang">Zum Anfang</button><button data-a="back">Zurück</button><button data-a="next" class="primary">Weiter</button><button data-a="play">Abspielen</button><span class="tr-count"></span></div>';
    const codeEl = $('.tr-code', el), msgEl = $('.tr-msg', el), varsEl = $('.tr-vars', el), outEl = $('.tr-out', el), cnt = $('.tr-count', el), playBtn = $('[data-a=play]', el);
    codeEl.innerHTML = '<table class="cb-table">' + lines.map((l, n) => '<tr data-n="' + n + '"><td class="ln">' + (n + 1) + '</td><td class="src"><pre>' + (A.hl('pseudo', l) || '&nbsp;') + '</pre></td></tr>').join('') + '</table>';
    const scopeHtml = (sc, prev) => sc.map((s, k) => {
      const names = Object.keys(s.vars), pv = prev && prev[k] && prev[k].name === s.name ? prev[k].vars : {};
      return '<div class="scope"><div class="scope-h">' + (s.name ? 'In der Funktion ' + esc(s.name) : 'Variablen') + '</div>'
        + (names.length ? '<table class="vars">' + names.map((n) => { const v = Pseudo.fmt(s.vars[n]), ch = !(n in pv) || JSON.stringify(pv[n]) !== JSON.stringify(s.vars[n]); return '<tr class="' + (ch ? 'chg' : '') + '"><td>' + esc(n) + '</td><td>' + esc(v) + '</td></tr>'; }).join('') + '</table>' : '<div class="muted small">noch keine</div>') + '</div>';
    }).join('');
    function paint() {
      $$('tr.cur, tr.err', codeEl).forEach((t) => t.classList.remove('cur', 'err'));
      if (i < 0) { msgEl.innerHTML = '<span class="muted">Bereit. Mit „Weiter“ gehst du das Programm Schritt für Schritt durch.</span>'; varsEl.innerHTML = '<div class="scope"><div class="scope-h">Variablen</div><div class="muted small">noch keine</div></div>'; outEl.textContent = ''; cnt.textContent = 'Start'; return; }
      const e = ev[i], row = $('tr[data-n="' + e.line + '"]', codeEl);
      if (row && !e.end) { row.classList.add(e.error ? 'err' : 'cur'); row.scrollIntoView({ block: 'nearest' }); }
      msgEl.innerHTML = '<span class="' + (e.error ? 'bad' : '') + '">' + esc(e.msg) + '</span>';
      varsEl.innerHTML = scopeHtml(e.scopes, i > 0 ? ev[i - 1].scopes : null);
      outEl.textContent = e.out;
      cnt.textContent = 'Schritt ' + (i + 1) + ' von ' + ev.length;
    }
    const stop = () => { if (timer) { clearInterval(timer); timer = null; playBtn.textContent = 'Abspielen'; } };
    const go = (d) => { i = Math.max(-1, Math.min(ev.length - 1, i + d)); paint(); if (i >= ev.length - 1) stop(); };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-a]'); if (!b) return;
      const a = b.dataset.a;
      if (a === 'reset') { stop(); i = -1; paint(); }
      else if (a === 'back') { stop(); go(-1); }
      else if (a === 'next') { stop(); go(1); }
      else if (a === 'play') { if (timer) { stop(); return; } if (i >= ev.length - 1) i = -1; playBtn.textContent = 'Pause'; timer = setInterval(() => go(1), 900); }
    });
    paint();
  }
  function initTrace(el, { src, h, p }) {
    el.className = 'tracebox';
    el.innerHTML = (h ? '<h3>' + esc(h) + '</h3>' : '') + md(p) + '<div class="tp"></div>';
    tracePlayer($('.tp', el), src);
  }

  /* ---------- Codeblock mit Erklärungen ---------- */
  function initCode(el, { part }) {
    const { lang, lines } = part.code, hasNotes = lines.some((l) => l[1]);
    el.className = 'codeblock';
    const rows = lines.map((l, n) => '<tr data-i="' + n + '"><td class="ln">' + (n + 1) + '</td><td class="src"><pre>' + (A.hl(lang, l[0]) || '&nbsp;') + '</pre></td><td class="note">' + A.inl(l[1]) + '</td></tr>').join('');
    const canTry = (lang === 'javascript' || lang === 'sql') && !part.noRun;
    el.innerHTML = '<div class="cb-head"><span class="cb-lang">' + esc(A.langNames[lang] || lang) + '</span><span class="cb-btns">'
      + (hasNotes ? '<button data-a="focus">Schritt für Schritt</button>' : '')
      + (canTry ? '<button data-a="try">Ausprobieren und ändern</button>' : '')
      + (lang === 'pseudo' ? '<button data-a="trace">Ablauf verfolgen</button>' : '') + '</span></div>'
      + '<div class="cb-body"><table class="cb-table' + (hasNotes ? ' has-notes' : '') + '">' + rows + '</table></div><div class="cb-extra"></div>';
    const table = $('.cb-table', el), extra = $('.cb-extra', el);
    const plain = lines.map((l) => l[0]).join('\n');
    let focus = false, act = 0;
    const setAct = (n) => { act = Math.max(0, Math.min(lines.length - 1, n)); $$('tr', table).forEach((t) => t.classList.toggle('active', +t.dataset.i === act)); const t = $('tr[data-i="' + act + '"]', table); if (t) t.scrollIntoView({ block: 'nearest' }); const c = $('.fc-pos', extra); if (c) c.textContent = 'Zeile ' + (act + 1) + ' von ' + lines.length; };
    el.addEventListener('click', (e) => {
      const row = e.target.closest('tr[data-i]');
      if (row && table.contains(row)) { act = +row.dataset.i; if (focus) setAct(act); else { $$('tr', table).forEach((t) => t.classList.toggle('active', t === row)); } return; }
      const b = e.target.closest('button[data-a]'); if (!b) return;
      const a = b.dataset.a;
      if (a === 'focus') {
        focus = !focus; table.classList.toggle('focus', focus); b.classList.toggle('on', focus);
        if (focus) {
          // Erste Zeile mit Erklärung zuerst
          const first = Math.max(0, lines.findIndex((l) => l[1]));
          extra.innerHTML = '<div class="focus-ctl"><button data-a="fprev">Vorherige Zeile</button><span class="fc-pos"></span><button data-a="fnext" class="primary">Nächste Zeile</button></div>';
          setAct(first);
        } else { extra.innerHTML = ''; $$('tr', table).forEach((t) => t.classList.remove('active')); }
      } else if (a === 'fprev' || a === 'fnext') {
        let n = act + (a === 'fnext' ? 1 : -1);
        while (n >= 0 && n < lines.length && !lines[n][1]) n += a === 'fnext' ? 1 : -1; // Zeilen ohne Erklärung überspringen
        if (n >= 0 && n < lines.length) setAct(n);
      } else if (a === 'try') {
        if ($('.tryit', extra)) { extra.innerHTML = ''; b.classList.remove('on'); return; }
        b.classList.add('on');
        extra.innerHTML = '<div class="tryit"><textarea data-lang="' + lang + '" spellcheck="false" rows="' + Math.min(18, lines.length + 2) + '">' + esc(plain) + '</textarea><div class="try-ctl"><button class="primary" data-a="run">Ausführen</button><span class="muted small">' + (lang === 'sql' ? 'Du darfst alles ändern. Jede Ausführung beginnt mit frischen Daten der Shop-Datenbank.' : 'Du darfst alles ändern. Das läuft nur in deinem Browser, in einer abgeschotteten Umgebung.') + '</span></div>' + (lang === 'sql' ? '<div class="sqlout"></div>' : '<pre class="console"></pre>') + '</div>';
      } else if (a === 'run') {
        const ta = $('textarea', extra);
        if (lang === 'sql') {
          const so = $('.sqlout', extra); so.innerHTML = '<span class="muted">läuft gerade</span>';
          newDb().then((db) => { const q = runSql(db, ta.value); so.innerHTML = q.error ? '<div class="note note-warn"><b>SQL-Fehler</b> ' + esc(q.error) + '</div>' : (q.res.length ? sqlTable(q.res) : '<p class="muted small">Ausgeführt. ' + q.changed + ' Zeile(n) betroffen (nur für diese Ausführung).</p>'); }).catch((e) => { so.innerHTML = '<div class="note note-warn">' + esc(e.message) + '</div>'; });
          return;
        }
        const out = $('.console', extra);
        out.textContent = 'läuft gerade'; out.className = 'console';
        Sandbox.run(ta.value).then((r) => { out.className = 'console' + (r.error ? ' bad' : ''); out.textContent = (r.logs.length ? r.logs.join('\n') : r.error ? '' : '(keine Ausgabe, nutze console.log(...) um etwas auszugeben)') + (r.error ? (r.logs.length ? '\n' : '') + 'Fehler: ' + r.error : ''); });
      } else if (a === 'trace') {
        if ($('.tp', extra)) { extra.innerHTML = ''; b.classList.remove('on'); return; }
        b.classList.add('on'); extra.innerHTML = '<div class="tp"></div>'; tracePlayer($('.tp', extra), plain, part.input);
      }
    });
  }

  /* ---------- Quiz ---------- */
  function initQuiz(el, { lesson }) {
    el.className = 'quiz';
    // Antworten fest gemischt: in den Inhalten steht die richtige Antwort vorn, auf dem Bildschirm an wechselnder Stelle. Die Mischung
    // hängt nur am Fragetext, damit dieselbe Frage beim nächsten Besuch gleich aussieht. data-o behält die ursprüngliche Nummer.
    const order = (q) => {
      let h = 2166136261; for (const ch of q.q) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
      const idx = q.o.map((_, j) => j);
      for (let k = idx.length - 1; k > 0; k--) { h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0; const r = h % (k + 1); [idx[k], idx[r]] = [idx[r], idx[k]]; }
      return idx;
    };
    el.innerHTML = lesson.quiz.map((q, i) => '<div class="qcard" data-q="' + i + '"><div class="q-text"><span class="q-n">' + (i + 1) + '</span><span>' + A.inl(q.q) + '</span></div><div class="q-opts">' + order(q).map((j) => '<button data-o="' + j + '">' + A.inl(q.o[j]) + '</button>').join('') + '</div><div class="q-fb"></div></div>').join('');
    // bereits richtig beantwortet?
    lesson.quiz.forEach((q, i) => { if (P.quiz[lesson.id + ':' + i]) { const c = $('.qcard[data-q="' + i + '"]', el); mark(c, q, q.a, true, true); } });
    function mark(card, q, j, ok, silent) {
      $$('button', card).forEach((b) => { b.disabled = true; b.classList.toggle('right', +b.dataset.o === q.a); if (+b.dataset.o === j && !ok) b.classList.add('wrong'); });
      $('.q-fb', card).innerHTML = (ok ? '<b class="good">Richtig.</b> ' : '<b class="bad">Nicht ganz.</b> ') + A.inl(q.e || '') + (ok ? '' : ' <button class="link" data-a="again">Noch einmal versuchen</button>');
      if (!silent) card.classList.add('done');
    }
    el.addEventListener('click', (e) => {
      const card = e.target.closest('.qcard'); if (!card) return;
      const q = lesson.quiz[+card.dataset.q];
      if (e.target.matches('[data-a=again]')) { $$('button', card).forEach((b) => { b.disabled = false; b.classList.remove('right', 'wrong'); }); $('.q-fb', card).innerHTML = ''; return; }
      const b = e.target.closest('button[data-o]'); if (!b || b.disabled) return;
      const j = +b.dataset.o, ok = j === q.a;
      mark(card, q, j, ok, false);
      if (ok) P.quiz[lesson.id + ':' + card.dataset.q] = true; else delete P.quiz[lesson.id + ':' + card.dataset.q];
      save(); refreshStatus();
    });
  }

  /* ---------- Übungen ---------- */
  const normOut = (s) => String(s).replace(/\r/g, '').split('\n').map((x) => x.trim()).filter((x) => x !== '').join('\n');
  function taskDone(lessonId, i) { P.task[lessonId + ':' + i] = true; save(); refreshStatus(); }

  function initTasks(el, { lesson }) {
    el.className = 'tasks';
    el.innerHTML = lesson.tasks.map((t, i) => '<div class="task' + (P.task[lesson.id + ':' + i] ? ' solved' : '') + '" data-t="' + i + '"><div class="t-head"><span class="t-n">' + (i + 1) + '</span><span class="t-kind">' + ({ predict: 'Was gibt das aus?', fill: 'Lückentext', js: 'Programmieren', sql: 'Abfrage schreiben' }[t.type]) + '</span><span class="t-ok">gelöst</span></div><div class="t-prompt">' + md(t.prompt) + '</div><div class="t-body"></div></div>').join('');
    lesson.tasks.forEach((t, i) => {
      const box = $('.task[data-t="' + i + '"] .t-body', el), card = box.parentElement;
      const ok = () => { card.classList.add('solved'); taskDone(lesson.id, i); };
      TASK[t.type](box, t, ok);
    });
  }
  const feedback = (box, good, html) => { let f = $('.t-fb', box); if (!f) { f = document.createElement('div'); f.className = 't-fb'; box.appendChild(f); } f.className = 't-fb ' + (good ? 'good' : 'bad'); f.innerHTML = html; };
  const hintBtn = (t, box) => t.hint ? '<button class="link" data-a="hint">Tipp anzeigen</button><div class="hintbox" hidden>' + md(t.hint) + '</div>' : '';
  function wireHint(box) { const b = $('[data-a=hint]', box); if (b) b.addEventListener('click', () => { $('.hintbox', box).hidden = false; b.hidden = true; }); }

  const TASK = {
    predict(box, t, ok) {
      box.innerHTML = '<div class="codeblock small"><table class="cb-table">' + t.code.map((l, n) => '<tr><td class="ln">' + (n + 1) + '</td><td class="src"><pre>' + (A.hl(t.lang || 'pseudo', l) || '&nbsp;') + '</pre></td></tr>').join('') + '</table></div>'
        + '<textarea class="ans" rows="' + Math.max(2, t.answer[0].split('\n').length) + '" spellcheck="false" placeholder="Eine Ausgabezeile pro Zeile"></textarea><div class="t-ctl"><button class="primary" data-a="check">Prüfen</button>' + hintBtn(t, box) + '<button class="link" data-a="show" hidden>Lösung zeigen</button></div>';
      wireHint(box);
      let tries = 0; const show = $('[data-a=show]', box);
      $('[data-a=check]', box).addEventListener('click', () => {
        const v = normOut($('.ans', box).value);
        if (t.answer.some((a) => normOut(a) === v)) { feedback(box, true, '<b>Richtig.</b> ' + A.inl(t.expl || '')); ok(); }
        else { tries++; feedback(box, false, '<b>Noch nicht.</b> Gehe das Programm Zeile für Zeile im Kopf durch. Achte auf Groß-/Kleinschreibung und Leerzeichen in den Ausgaben.'); if (tries >= 2) show.hidden = false; }
      });
      show.addEventListener('click', () => feedback(box, false, '<b>Lösung:</b><pre class="sol">' + esc(t.answer[0]) + '</pre>' + A.inl(t.expl || '')));
    },
    fill(box, t, ok) {
      const parts = t.tpl.split(/\{\{(.*?)\}\}/);
      const html = parts.map((s, k) => (k % 2 ? '<input class="gap" data-k="' + (k >> 1) + '" spellcheck="false" size="' + Math.max(3, s.split('|')[0].length + 1) + '">' : esc(s))).join('');
      box.innerHTML = '<pre class="fill">' + html + '</pre><div class="t-ctl"><button class="primary" data-a="check">Prüfen</button>' + hintBtn(t, box) + '<button class="link" data-a="show" hidden>Lösung zeigen</button></div>';
      wireHint(box);
      const answers = []; parts.forEach((s, k) => { if (k % 2) answers.push(s.split('|')); });
      // Lösung erst nach zwei Fehlversuchen abrufbar, wie bei den anderen Übungen
      let tries = 0; const show = $('[data-a=show]', box);
      $('[data-a=check]', box).addEventListener('click', () => {
        let all = true;
        $$('.gap', box).forEach((inp, k) => { const good = answers[k].includes(inp.value.trim()); inp.classList.toggle('right', good); inp.classList.toggle('wrong', !good); if (!good) all = false; });
        if (all) { feedback(box, true, '<b>Alle Lücken stimmen.</b>'); ok(); } else { tries++; feedback(box, false, 'Die roten Lücken stimmen noch nicht. Schau noch einmal in die Erklärung oben.'); if (tries >= 2) show.hidden = false; }
      });
      show.addEventListener('click', () => feedback(box, false, '<b>Lösung:</b><pre class="sol">' + esc(parts.map((s, k) => (k % 2 ? s.split('|')[0] : s)).join('')) + '</pre>'));
    },
    js(box, t, ok) {
      box.innerHTML = '<textarea class="editor" data-lang="javascript" rows="' + Math.max(6, t.starter.split('\n').length + 1) + '" spellcheck="false">' + esc(t.starter) + '</textarea><div class="t-ctl"><button class="primary" data-a="check">Prüfen</button>' + hintBtn(t, box) + '<button class="link" data-a="show" hidden>Lösung zeigen</button></div>';
      wireHint(box);
      let tries = 0; const show = $('[data-a=show]', box);
      $('[data-a=check]', box).addEventListener('click', () => {
        feedback(box, true, 'prüfe …');
        Sandbox.run($('.editor', box).value, t.tests).then((r) => {
          if (r.error) { tries++; feedback(box, false, '<b>Fehler im Programm:</b> ' + esc(r.error)); }
          else {
            const rows = r.results.map((x, k) => '<li class="' + (x.ok ? 'good' : 'bad') + '">' + esc(t.tests[k].fn) + '(' + esc(t.tests[k].args.map((a) => JSON.stringify(a)).join(', ')) + ') sollte ' + esc(JSON.stringify(t.tests[k].expect)) + ' ergeben' + (x.ok ? ': stimmt' : x.msg ? ': ' + esc(x.msg) : ', du bekommst aber ' + esc(x.got)) + '</li>').join('');
            if (r.results.every((x) => x.ok)) { feedback(box, true, '<b>Alle Tests bestanden.</b><ul class="tests">' + rows + '</ul>'); ok(); } else { tries++; feedback(box, false, '<b>Noch nicht alle Tests bestanden:</b><ul class="tests">' + rows + '</ul>'); }
          }
          if (tries >= 2 && t.solution) show.hidden = false;
        });
      });
      show.addEventListener('click', () => feedback(box, false, '<b>Eine mögliche Lösung:</b><pre class="sol">' + esc(t.solution) + '</pre>'));
    },
    sql(box, t, ok) {
      box.innerHTML = '<textarea class="editor" data-lang="sql" rows="4" spellcheck="false" placeholder="Deine Abfrage, zum Beispiel SELECT name FROM kunden"></textarea><div class="t-ctl"><button class="primary" data-a="check">Prüfen</button><button class="link" data-a="peek">Tabellen ansehen</button>' + hintBtn(t, box) + '<button class="link" data-a="show" hidden>Lösung zeigen</button></div><div class="peek" hidden></div>';
      wireHint(box);
      let tries = 0; const show = $('[data-a=show]', box);
      $('[data-a=peek]', box).addEventListener('click', async () => { const p = $('.peek', box); p.hidden = !p.hidden; if (!p.hidden && !p.innerHTML) p.innerHTML = await schemaHtml(); });
      $('[data-a=check]', box).addEventListener('click', async () => {
        const q = $('.editor', box).value.trim();
        if (!q) { feedback(box, false, 'Schreibe zuerst eine Abfrage.'); return; }
        try {
          const dbU = await newDb(), dbS = await newDb();
          const ru = runSql(dbU, q), rs = runSql(dbS, t.solution);
          if (ru.error) { tries++; feedback(box, false, '<b>SQL-Fehler:</b> ' + esc(ru.error)); }
          else {
            const eu = t.verify ? dbU.exec(t.verify) : ru.res, es = t.verify ? dbS.exec(t.verify) : rs.res;
            const nu = rowsOf(eu, t.ordered), ns = rowsOf(es, t.ordered);
            const same = nu && ns && nu.cols === ns.cols && nu.rows.length === ns.rows.length && nu.rows.every((r, k) => r === ns.rows[k]);
            if (same) { feedback(box, true, '<b>Das Ergebnis stimmt.</b>' + sqlTable(ru.res)); ok(); }
            else { tries++; feedback(box, false, '<b>Das Ergebnis weicht ab.</b> Erwartet sind ' + (ns ? ns.rows.length : 0) + ' Zeile(n) mit ' + (ns ? ns.cols : 0) + ' Spalte(n), deine Abfrage liefert ' + (nu ? nu.rows.length : 0) + ' Zeile(n) mit ' + (nu ? nu.cols : 0) + ' Spalte(n).' + sqlTable(ru.res)); }
          }
        } catch (e) { feedback(box, false, 'Die SQL-Umgebung konnte nicht gestartet werden: ' + esc(e.message)); }
        if (tries >= 2) show.hidden = false;
      });
      show.addEventListener('click', () => feedback(box, false, '<b>Eine mögliche Lösung:</b><pre class="sol">' + esc(t.solution) + '</pre>'));
    }
  };

  /* ---------- SQL ---------- */
  let sqlP = null;
  function getSQL() {
    if (!sqlP) {
      const b = atob(window.SQLJS_WASM_B64), u = new Uint8Array(b.length);
      for (let k = 0; k < b.length; k++) u[k] = b.charCodeAt(k);
      sqlP = window.initSqlJs({ wasmBinary: u });
    }
    return sqlP;
  }
  async function newDb() { const SQL = await getSQL(); const db = new SQL.Database(); db.run(A.sqlSetup); return db; }
  function runSql(db, q) { try { return { res: db.exec(q), changed: db.getRowsModified() }; } catch (e) { return { error: e.message }; } }
  function rowsOf(res, ordered) {
    if (!res || !res.length) return null;
    const r = res[res.length - 1], rows = r.values.map((row) => JSON.stringify(row.map((v) => (typeof v === 'number' ? Math.round(v * 1e6) / 1e6 : v))));
    return { cols: r.columns.length, rows: ordered ? rows : rows.sort() };
  }
  function sqlTable(res) {
    if (!res || !res.length) return '<p class="muted small">Keine Ergebnistabelle (die Anweisung wurde ausgeführt).</p>';
    const r = res[res.length - 1];
    return '<div class="tbl-wrap"><table class="res"><thead><tr>' + r.columns.map((c) => '<th>' + esc(c) + '</th>').join('') + '</tr></thead><tbody>' + r.values.slice(0, 200).map((row) => '<tr>' + row.map((v) => '<td>' + (v === null ? '<i>NULL</i>' : esc(v)) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div><p class="muted small">' + r.values.length + ' Zeile(n)' + (r.values.length > 200 ? ', die ersten 200 werden gezeigt' : '') + '</p>';
  }
  async function schemaHtml() {
    const db = await newDb(), t = db.exec("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
    if (!t.length) return '<p class="muted">Keine Tabellen.</p>';
    return t[0].values.map(([n]) => { const cols = db.exec('PRAGMA table_info(' + n + ')')[0].values; const rows = db.exec('SELECT COUNT(*) FROM ' + n)[0].values[0][0]; return '<div class="schema"><b>' + esc(n) + '</b> <span class="muted small">(' + rows + ' Zeilen)</span><div>' + cols.map((c) => '<span class="chip">' + esc(c[1]) + ' <i>' + esc(c[2]) + (c[5] ? ', Schlüssel' : '') + '</i></span>').join('') + '</div></div>'; }).join('');
  }

  /* ---------- Status einer Lektion ---------- */
  function lessonStats(L) {
    const t = L.tasks.filter((_, i) => P.task[L.id + ':' + i]).length, q = L.quiz.filter((_, i) => P.quiz[L.id + ':' + i]).length;
    return { t, tn: L.tasks.length, q, qn: L.quiz.length, all: t === L.tasks.length && q === L.quiz.length };
  }
  let CUR = null;
  function refreshStatus() {
    if (!CUR) return;
    const s = lessonStats(CUR.lesson);
    $$('.status-line').forEach((el) => { el.innerHTML = '<span>Quiz <b>' + s.q + '/' + s.qn + '</b></span><span>Übungen <b>' + s.t + '/' + s.tn + '</b></span>' + (s.all && !P.done[CUR.lesson.id] ? '<span class="good">Alles gelöst. Du kannst die Lektion abschließen.</span>' : ''); });
  }
  function initStatus(el, { lesson }) {
    el.className = 'lesson-foot';
    const done = !!P.done[lesson.id];
    el.innerHTML = '<div class="status-line"></div><button class="primary big" data-a="done">' + (done ? 'Abgeschlossen (rückgängig)' : 'Lektion abschließen') + '</button>';
    $('[data-a=done]', el).addEventListener('click', (e) => { if (P.done[lesson.id]) delete P.done[lesson.id]; else P.done[lesson.id] = true; save(); e.target.textContent = P.done[lesson.id] ? 'Abgeschlossen (rückgängig)' : 'Lektion abschließen'; renderNav(); refreshStatus(); });
    refreshStatus();
  }

  /* ---------- Teile einer Lektion ---------- */
  function renderPart(p) {
    let s = '';
    if (p.kind) return '<div class="note note-' + p.kind + '"><b>' + ({ tip: 'Tipp', warn: 'Achtung', info: 'Gut zu wissen' }[p.kind]) + '</b>' + md(p.p) + '</div>';
    if (p.pseudo) return mount('trace', { src: p.pseudo, h: p.h, p: p.p });
    if (p.h) s += '<h3>' + esc(p.h) + '</h3>';
    if (p.p) s += md(p.p);
    if (p.code) s += mount('code', { part: p });
    if (p.uml) s += '<div class="uml-wrap">' + UML.classDiagram(p.uml) + '</div>';
    if (p.seq) s += '<div class="uml-wrap">' + UML.sequence(p.seq.actors, p.seq.msgs) + '</div>';
    if (p.nsd) s += '<div class="uml-wrap">' + UML.nsd(p.nsd) + '</div>';
    if (p.usecase) s += '<div class="uml-wrap">' + UML.useCase(p.usecase) + '</div>';
    if (p.activity) s += '<div class="uml-wrap">' + UML.activity(p.activity) + '</div>';
    if (p.table) s += '<div class="tbl-wrap"><table class="res"><thead><tr>' + p.table.head.map((c) => '<th>' + A.inl(c) + '</th>').join('') + '</tr></thead><tbody>' + p.table.rows.map((r) => '<tr>' + r.map((c) => '<td>' + A.inl(c) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
    return s;
  }

  function lessonView(track, L) {
    MOUNTS = [];
    const idx = track.lessons.findIndex((s) => track.id + '-' + (s.concept || s.id) === L.id);
    const prev = idx > 0 ? A.build(track, track.lessons[idx - 1]) : null, next = idx < track.lessons.length - 1 ? A.build(track, track.lessons[idx + 1]) : null;
    let h = '<div class="crumb"><a href="' + kursUrl(track.id) + '">' + esc(track.title) + '</a> › ' + esc(A.stages[L.stage] || '') + '</div><h1>' + esc(L.title) + '</h1>';
    if (L.goal) h += '<div class="goal"><b>Ziel dieser Lektion</b>' + md(L.goal) + '</div>';
    if (L.idea.length) h += '<section class="sec"><h2>Die Idee dahinter</h2>' + L.idea.map(renderPart).join('') + '</section>';
    if (L.parts.length) h += '<section class="sec"><h2>' + (L.concept && track.id !== 'pseudo' ? 'In ' + esc(track.title) : 'Der Stoff') + '</h2>' + L.parts.map(renderPart).join('') + '</section>';
    if (L.pseudo.length) h += '<section class="sec"><h2>Im Kopf ausführen (sprachunabhängig)</h2><p class="muted">Dasselbe Prinzip als Pseudocode. Geh es mit „Weiter“ Schritt für Schritt durch und beobachte, wie sich die Variablen verändern. Das hilft dir in jeder Sprache.</p>' + L.pseudo.map(renderPart).join('') + '</section>';
    if (L.pitfalls.length) h += '<section class="sec"><h2>Typische Stolperfallen</h2>' + L.pitfalls.map((p) => renderPart(typeof p === 'string' ? A.warn(p) : p)).join('') + '</section>';
    if (L.quiz.length) h += '<section class="sec"><h2>Prüfe dich</h2>' + mount('quiz', { lesson: L }) + '</section>';
    if (L.tasks.length) h += '<section class="sec"><h2>Übungen</h2>' + mount('tasks', { lesson: L }) + '</section>';
    h += mount('status', { lesson: L });
    h += '<nav class="pn">' + (prev ? '<a href="' + lessonUrl(prev.id) + '">Zurück: ' + esc(prev.title) + '</a>' : '<span></span>') + (next ? '<a class="next" href="' + lessonUrl(next.id) + '">Weiter: ' + esc(next.title) + '</a>' : '<a class="next" href="' + kursUrl(track.id) + '">Zur Kursübersicht →</a>') + '</nav>';
    return h;
  }

  /* ---------- Weitere Ansichten ---------- */
  function trackProgress(t) { const ls = A.lessons(t), d = ls.filter((l) => P.done[l.id]).length; return { d, n: ls.length }; }
  function firstOpen() {
    for (const t of A.tracks) for (const l of A.lessons(t)) if (!P.done[l.id]) return { t, l };
    return null;
  }
  /*
   * Startseite im Bauplan-Stil:
   * Zeichnungskopf mit Rahmen, Lernweg als Leiterbahn mit „Weiterlernen“ darunter, Kurse und Spielwiesen als drehbare
   * Litfaßsäulen (saeuleInit). Ecken höchstens 2 px, Kreise ausgenommen.
   */
  const PLAYS = [
    { href: BASE + '#/play/pseudo', tag: 'PSEUDOCODE', title: 'Pseudocode-Spielwiese', desc: 'Eigene Abläufe schreiben und Schritt für Schritt verfolgen, mit Variablen und Ausgabe.' },
    { href: BASE + '#/play/js', tag: 'JAVASCRIPT', title: 'JavaScript-Spielwiese', desc: 'Code schreiben und sofort ausführen, abgeschottet in deinem Browser.' },
    { href: BASE + '#/play/sql', tag: 'SQL', title: 'SQL-Spielwiese', desc: 'Echte Abfragen auf einer kleinen Shop-Datenbank, jedes Mal mit frischen Daten.' },
    { href: BASE + '#/play/uml', tag: 'UML', title: 'UML-Werkstatt', desc: 'Klassendiagramme aus einfachem Text zeichnen lassen.' },
    { href: BASE + '#/compare/vars', tag: 'VERGLEICH', title: 'Sprachvergleich', desc: 'Dasselbe Konzept in allen Sprachen nebeneinander.' }
  ];
  function saeule(id, label, nr, cards) {
    // wenige Karten (Spielwiesen) werden wiederholt, bis die Säule rundum voll ist (mindestens 8 Plätze, sonst stünden die
    // Nachbarn zu schräg oder die Säule hätte eine Lücke); die Wiederholungen sind für Vorleseprogramme verborgen
    const all = cards.slice();
    while (all.length < 8) all.push(...cards);
    return '<section class="saeule" data-saeule="' + id + '" data-n="' + cards.length + '" aria-roledescription="Karussell" aria-label="' + esc(label) + '">'
      + '<div class="bp-label"><span>' + nr + '</span>' + esc(label) + '<em>' + cards.length + ' Teile</em></div>'
      + '<div class="s-stage"><div class="s-ring">' + all.join('') + '</div></div>'
      + '<div class="s-ctl"><button class="s-prev" aria-label="Säule nach links drehen">&lt;</button><span class="s-pos" aria-live="polite"></span><button class="s-next" aria-label="Säule nach rechts drehen">&gt;</button></div></section>';
  }
  function homeView() {
    const f = P.last && A.findLesson(P.last) ? A.findLesson(P.last) : null, o = firstOpen();
    let h = '<div class="bp"><div class="bp-head"><span class="bp-sheet">CODELERNEN · BLATT 01</span><h1>Programmieren lernen</h1>'
      + '<p class="bp-lead">Von den allerersten Begriffen bis zu sicherem Lesen und Schreiben von Code. In kleinen Schritten, mit Erklärung zu <b>jeder einzelnen Zeile</b> und Übungen zum Selbermachen, bis zum Stoff der AP2.</p>'
      + '<p class="small muted">Code wird nur in deinem Browser zum Üben ausgeführt. Nichts davon wird an einen Server geschickt, übersetzt oder gespeichert, außer deinem Lernfortschritt auf diesem Gerät.</p></div>';
    h += '<div class="bp-label"><span>A</span>So gehst du am besten vor</div><ol class="bp-path">'
      + '<li><b>Pseudocode</b> zuerst. Hier lernst du, wie man in Schritten denkt, ganz ohne Sprachregeln. Du kannst jeden Ablauf mit dem Player verfolgen.</li>'
      + '<li><b>Software planen (PSS)</b>: wie ein Computer arbeitet, Anforderungen, Lebenszyklus, Anwendungsfall- und Aktivitätsdiagramm, PAP und Struktogramm.</li>'
      + '<li><b>Objektorientierung und UML</b>, damit dir Klassendiagramme und Begriffe wie Vererbung nicht fremd sind.</li>'
      + '<li><b>Eine Sprache deiner Wahl</b>. Alle Sprachen folgen demselben Lernweg: Ausgabe, Variablen, Rechnen, Entscheidungen, Schleifen, Funktionen, Sammlungen, Objekte. Wer eine kann, versteht die nächste viel schneller. Im <a href="' + BASE + '#/compare/vars">Sprachvergleich</a> siehst du sie nebeneinander.</li>'
      + '<li><b>SQL und Datenbanken</b>, denn Abfragen kommen in jeder Prüfung vor.</li>'
      + '<li><b>Prüfungswissen AP2</b> zum Schluss: binäre Suche, Sortierverfahren, Stapel und Warteschlange, Struktogramm, Testen, Entwurfsmuster, weitere UML-Diagramme, Datenbankentwurf und sicherer Code.</li></ol>';
    const go = f ? [lessonUrl(f.lesson.id), 'Weiterlernen: ' + f.lesson.title] : o ? [lessonUrl(o.l.id), 'Jetzt anfangen: ' + o.l.title] : null;
    if (go) h += '<div class="bp-go"><a class="btn primary" href="' + go[0] + '">' + esc(go[1]) + '</a></div>';
    h += saeule('kurse', 'Kurse', 'B', A.tracks.map((t) => {
      const p = trackProgress(t), pct = p.n ? Math.round(100 * p.d / p.n) : 0;
      return '<a class="s-card" href="' + kursUrl(t.id) + '"><span class="card-tag">' + esc(t.tag || '') + '</span><b>' + esc(t.title) + '</b><span class="s-desc">' + esc(t.desc || '') + '</span><span class="bar"><i style="width:' + pct + '%"></i></span><span class="small muted">' + p.d + ' von ' + p.n + ' Lektionen</span></a>';
    }));
    h += saeule('spiel', 'Spielwiesen', 'C', PLAYS.map((c) => '<a class="s-card" href="' + c.href + '"><span class="card-tag">' + c.tag + '</span><b>' + esc(c.title) + '</b><span class="s-desc">' + esc(c.desc) + '</span></a>'));
    return h + '</div>';
  }
  /*
   * Litfaßsäule: Die Karten stehen rundum auf einem Zylinder (rotateY + translateZ), die vordere ist aktiv, die Nachbarn sieht man
   * links und rechts schräg. Drehen per Klick auf eine Seitenkarte, Pfeilknöpfe, Pfeiltasten oder Wischen; ein Klick auf die
   * vordere Karte öffnet sie. Weniger Bewegung (prefers-reduced-motion) dreht ohne Übergang. Jede Säule merkt sich ihre Stellung.
   */
  const SPOS = {};
  let saeuleResize = null;
  function saeuleInit(root) {
    const layouts = [];
    if (saeuleResize) window.removeEventListener('resize', saeuleResize);
    saeuleResize = () => layouts.forEach((f) => f());
    window.addEventListener('resize', saeuleResize);
    $$('[data-saeule]', root).forEach((sec) => {
      // höchstens 45 Grad zwischen zwei Karten: Bei wenigen Karten (Spielwiesen) stünden die Nachbarn sonst zu schräg zum Lesen
      const id = sec.dataset.saeule, ring = $('.s-ring', sec), cards = $$('.s-card', sec), n = cards.length, base = +sec.dataset.n || n, pos = $('.s-pos', sec), slots = n, step = 360 / slots;
      let act = Math.min(SPOS[id] || 0, n - 1), turns = act;
      const layout = () => {
        const w = cards[0].offsetWidth || 280, r = Math.round((w / 2) / Math.tan(Math.PI / slots) + 24);
        cards.forEach((c, i) => {
          let d = ((i - act) % n + n) % n; if (d > n / 2) d -= n;
          c.style.transform = 'rotateY(' + (i * step) + 'deg) translateZ(' + r + 'px)';
          c.classList.toggle('on', d === 0);
          c.style.opacity = d === 0 ? 1 : Math.abs(d) === 1 ? 0.5 : Math.abs(d) === 2 && n > 5 ? 0.15 : 0;
          c.style.pointerEvents = Math.abs(d) <= 1 ? 'auto' : 'none';
          c.tabIndex = d === 0 ? 0 : -1;
          c.setAttribute('aria-hidden', d === 0 ? 'false' : 'true');
        });
        // der Ring dreht über die kürzere Seite weiter, statt von der letzten Karte zur ersten zurückzuspulen
        ring.style.transform = 'translateZ(-' + r + 'px) rotateY(' + (-turns * step) + 'deg)';
        pos.textContent = (act % base + 1) + ' / ' + base + ' · ' + $('b', cards[act]).textContent;
        SPOS[id] = act;
      };
      const go = (to) => {
        const next = ((to % n) + n) % n;
        let d = next - act; if (d > n / 2) d -= n; if (d < -n / 2) d += n;
        act = next; turns += d; layout();
      };
      // Wischen auf dem Handy: waagerecht mehr als 40 px dreht, senkrechtes Scrollen bleibt frei; der Klick danach öffnet nichts
      let x0 = null, y0 = 0, swiped = false;
      cards.forEach((c, i) => c.addEventListener('click', (e) => { if (swiped) { e.preventDefault(); swiped = false; return; } if (i !== act) { e.preventDefault(); go(i); } }));
      $('.s-prev', sec).addEventListener('click', () => go(act - 1));
      $('.s-next', sec).addEventListener('click', () => go(act + 1));
      sec.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') { go(act - 1); e.preventDefault(); } else if (e.key === 'ArrowRight') { go(act + 1); e.preventDefault(); } });
      const stage = $('.s-stage', sec);
      stage.addEventListener('pointerdown', (e) => { x0 = e.clientX; y0 = e.clientY; swiped = false; });
      stage.addEventListener('pointerup', (e) => { if (x0 === null) return; const dx = e.clientX - x0, dy = e.clientY - y0; x0 = null; if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { swiped = true; go(act + (dx < 0 ? 1 : -1)); } });
      layout();
      layouts.push(layout);
    });
  }
  function trackView(t) {
    const ls = A.lessons(t), p = trackProgress(t);
    let h = '<div class="crumb"><a href="' + BASE + '">Start</a> › Kurs</div><h1>' + esc(t.title) + '</h1><p class="lead">' + esc(t.desc || '') + '</p>' + (t.intro ? md(t.intro) : '') + '<div class="bar wide"><i style="width:' + (p.n ? Math.round(100 * p.d / p.n) : 0) + '%"></i></div><p class="small muted">' + p.d + ' von ' + p.n + ' Lektionen abgeschlossen</p>';
    let stage = 0;
    for (const l of ls) {
      if (l.stage !== stage) { stage = l.stage; h += '<h2 class="stage">' + esc(A.stages[stage]) + '</h2>'; }
      const s = lessonStats(l);
      h += '<a class="lrow' + (P.done[l.id] ? ' done' : '') + '" href="' + lessonUrl(l.id) + '"><span class="dot"></span><span class="lt"><b>' + esc(l.title) + '</b><span class="muted">' + esc((l.goal || '').split('\n')[0]) + '</span></span><span class="small muted">' + (s.t + s.q ? s.q + '/' + s.qn + ' Quiz, ' + s.t + '/' + s.tn + ' Übungen' : '') + '</span></a>';
    }
    return h;
  }
  function compareView(cid) {
    const cs = Object.values(A.concepts).filter((c) => c.compare !== false);
    let h = '<div class="crumb"><a href="' + BASE + '">Start</a> › Sprachvergleich</div><h1>Sprachvergleich</h1><p class="lead">Dasselbe Konzept, verschiedene Schreibweisen. Wähle ein Thema:</p><div class="chips">' + cs.map((c) => '<a class="chip big' + (c.id === cid ? ' on' : '') + '" href="' + BASE + '#/compare/' + c.id + '">' + esc(c.title) + '</a>').join('') + '</div>';
    const c = A.concepts[cid]; if (!c) return h;
    MOUNTS = [];
    h += '<h2>' + esc(c.title) + '</h2><div class="cmp">';
    for (const t of A.tracks) {
      if (['pseudo', 'oop', 'sql'].includes(t.id)) continue;
      const s = t.lessons.find((x) => x.concept === cid); if (!s) continue;
      const part = (s.parts || []).find((p) => p.code); if (!part) continue;
      h += '<div class="cmp-card"><div class="cmp-h"><b>' + esc(t.title) + '</b><a href="' + lessonUrl(t.id + '-' + cid) + '">Zur Lektion</a></div>' + mount('code', { part: Object.assign({}, part, { noRun: true }) }) + '</div>';
    }
    return h + '</div>';
  }
  // Zwei Reiter: Begriffe von A bis Z und die Kürzel der Sprachen (dieselben Erklärungen wie beim Darüberfahren in den Texten)
  function glossarView(tab) {
    const kz = tab === 'kuerzel';
    let h = '<div class="crumb"><a href="' + BASE + '">Start</a> › ' + (kz ? 'Kürzel' : 'Begriffe') + '</div><div class="tabs"><a class="' + (kz ? '' : 'on') + '" href="' + BASE + '#/glossar">Begriffe von A bis Z</a><a class="' + (kz ? 'on' : '') + '" href="' + BASE + '#/glossar/kuerzel">Kürzel der Sprachen</a></div>';
    if (!kz) {
      const items = A.glossary.slice().sort((a, b) => a.name.localeCompare(b.name, 'de'));
      return h + '<h1>Begriffe von A bis Z</h1><input class="search" id="gs" placeholder="Begriff suchen" spellcheck="false"><div id="gl">' + items.map((g) => '<div class="term" data-s="' + esc((g.name + ' ' + g.text).toLowerCase()) + '"><b>' + esc(g.name) + '</b><div>' + md(g.text) + '</div></div>').join('') + '</div>';
    }
    const groups = {};
    (A.kuerzel || []).forEach((e) => { (groups[e[1]] = groups[e[1]] || []).push(e); });
    h += '<h1>Kürzel der Sprachen</h1><p class="lead">Schlüsselwörter, Datentypen und Standardfunktionen in einem Satz. In den Texten der Lektionen erscheinen dieselben Erklärungen, wenn du mit der Maus über ein gepunktet unterstrichenes Wort fährst oder es antippst.</p><input class="search" id="gs" placeholder="Kürzel suchen, zum Beispiel double oder args" spellcheck="false"><div id="gl" class="kz-list">';
    for (const [g, es] of Object.entries(groups)) {
      h += '<section class="kz-group"><h3>' + esc(g) + '</h3>' + es.slice().sort((a, b) => a[0].localeCompare(b[0], 'de', { sensitivity: 'base' })).map((e) => {
        const o = e[3] || {}, extra = Object.entries(o.l || {}).map(([k, v]) => { const ln = A.langNames[k] || k; return '<div class="small"><b>' + esc(ln) + ':</b> ' + A.inl(v.startsWith(ln + ':') ? v.slice(ln.length + 1).trim() : v) + '</div>'; }).join('');
        return '<div class="term" data-s="' + esc([e[0]].concat(o.a || [], e[2], Object.values(o.l || {})).join(' ').toLowerCase()) + '"><b><code>' + esc(e[0]) + '</code></b><div>' + A.inl(e[2]) + extra + '</div></div>';
      }).join('') + '</section>';
    }
    return h + '</div>';
  }

  /* ---------- Kürzel: Erklärung beim Darüberfahren oder Antippen ----------
     Nur in Texten: Erklärungen, Tabellen, Fragen, Hinweise. Nie im Code (Beispiele, Übungsfelder, Lückentexte, Ausgaben) und
     nie in Antwortknöpfen des Quiz, damit die Erklärung keine Antwort verrät. */
  const KZ = (() => {
    const all = A.kuerzel || [], map = new Map();
    all.forEach((e, i) => [e[0]].concat((e[3] && e[3].a) || []).forEach((n) => { if (!map.has(n)) map.set(n, i); }));
    const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const mk = (names) => (names.length ? new RegExp('(?<![A-Za-z0-9_ÄÖÜäöüß])(' + names.sort((a, b) => b.length - a.length).map((n) => reEsc(n).replace(/ /g, '\\s+')).join('|') + ')(?![A-Za-z0-9_ÄÖÜäöüß])', 'g') : null);
    // Wörter (auch mit Punkt, # oder @ davor) werden im Text gesucht; reine Zeichen wie % oder && nur, wenn sie allein in einem Code-Schnipsel stehen
    const words = [...map.keys()].filter((n) => /^[A-Za-zÄÖÜäöüß_#@]/.test(n));
    return { all, map, reCode: mk(words.slice()), reText: mk(words.filter((n) => !(all[map.get(n)][3] || {}).c)) };
  })();
  const KZ_SKIP = 'pre,textarea,input,button,select,script,style,svg,a,h1,h2,h3,.kz,.q-opts,.cb-head,.crumb,.tabs,.t-kind,.kz-list,#gl,.tr-code,.console,.refbox,.uml-wrap,td.src,.sol,.fill,#kz-tip';
  function kzMark(root) {
    if (!KZ.reText || !root || root.nodeType !== 1 || root.closest(KZ_SKIP)) return;
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (!n.nodeValue.trim() || n.parentElement.closest(KZ_SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) });
    const nodes = []; while (tw.nextNode()) nodes.push(tw.currentNode);
    for (const n of nodes) {
      const code = n.parentElement.closest('code');
      if (code && code.childNodes.length === 1) {
        const k = code.textContent.trim(), i = KZ.map.get(k);
        if (i !== undefined) { code.classList.add('kz'); code.dataset.k = i; code.tabIndex = 0; continue; }
      }
      const re = code ? KZ.reCode : KZ.reText, s = n.nodeValue, frag = document.createDocumentFragment();
      let m, last = 0, hit = false; re.lastIndex = 0;
      while ((m = re.exec(s))) {
        const i = KZ.map.get(m[1].replace(/\s+/g, ' ')); if (i === undefined) continue;
        hit = true; frag.append(s.slice(last, m.index));
        const sp = document.createElement('span'); sp.className = 'kz'; sp.dataset.k = i; sp.tabIndex = 0; sp.textContent = m[1]; frag.append(sp);
        last = m.index + m[1].length;
      }
      if (hit) { frag.append(s.slice(last)); n.replaceWith(frag); }
    }
  }
  function kzTipInit() {
    const tip = document.createElement('div'); tip.id = 'kz-tip'; tip.setAttribute('role', 'tooltip'); tip.hidden = true; document.body.appendChild(tip);
    let curEl = null;
    const show = (el) => {
      const e = KZ.all[+el.dataset.k]; if (!e) return;
      const o = e[3] || {}, tr = CUR && CUR.track.id, txt = (o.l && tr && o.l[tr]) || e[2];
      tip.innerHTML = '<div class="kz-h"><code>' + esc(e[0]) + '</code><span>' + esc(e[1]) + '</span></div><div>' + A.inl(txt) + '</div>';
      tip.hidden = false; curEl = el;
      const r = el.getBoundingClientRect(), w = tip.offsetWidth, hh = tip.offsetHeight, vw = document.documentElement.clientWidth;
      const left = Math.max(8, Math.min(vw - w - 8, r.left + r.width / 2 - w / 2));
      const top = r.bottom + 8 + hh < window.innerHeight ? r.bottom + 8 : Math.max(8, r.top - hh - 8);
      tip.style.left = left + 'px'; tip.style.top = top + 'px';
    };
    const hide = () => { tip.hidden = true; curEl = null; };
    let pinned = null;
    const kzOf = (ev) => ev.target.closest && ev.target.closest('.kz');
    document.addEventListener('mouseover', (ev) => { const el = kzOf(ev); if (el) show(el); else if (curEl && !pinned) hide(); });
    document.addEventListener('focusin', (ev) => { const el = kzOf(ev); if (el) show(el); });
    document.addEventListener('focusout', (ev) => { if (kzOf(ev) && !pinned) hide(); });
    // Antippen (Handy) oder Klicken hält die Erklärung fest; nochmal tippen oder daneben tippen schließt sie
    document.addEventListener('click', (ev) => { const el = kzOf(ev); if (el) { if (pinned === el) { pinned = null; hide(); } else { pinned = el; show(el); } } else if (curEl) { pinned = null; hide(); } });
    window.addEventListener('scroll', () => { pinned = null; hide(); }, { passive: true, capture: true });
    document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') { pinned = null; hide(); } });
    // Neue Inhalte (Seitenwechsel, Rückmeldungen, Tipps, Lösungen) bekommen die Erklärungen auch
    new MutationObserver((ms) => {
      const roots = new Set();
      for (const m of ms) m.addedNodes.forEach((n) => { const r = n.nodeType === 1 ? n : n.parentElement; if (r) roots.add(r); });
      roots.forEach(kzMark);
    }).observe($('#main'), { childList: true, subtree: true });
  }

  /* ---------- Spielwiesen ---------- */
  function playView(what) {
    const tabs = [['pseudo', 'Pseudocode'], ['js', 'JavaScript'], ['sql', 'SQL'], ['uml', 'UML']];
    let h = '<div class="crumb"><a href="' + BASE + '">Start</a> › Spielwiese</div><div class="tabs">' + tabs.map(([k, n]) => '<a class="' + (k === what ? 'on' : '') + '" href="' + BASE + '#/play/' + k + '">' + n + '</a>').join('') + '</div>';
    if (what === 'pseudo') h += '<h1>Pseudocode-Spielwiese</h1><p class="lead">Schreibe einen Ablauf und verfolge ihn Schritt für Schritt. Wörter wie WENN, SOLANGE oder FÜR kennt der Player. Die Zeilen darfst du frei einrücken.</p><div class="pg"><div class="pg-top"><select id="smp"></select><button class="primary" id="run">Ausführen und verfolgen</button><button id="ref" class="link">Kurzübersicht der Wörter</button></div><textarea id="src" class="editor tall" spellcheck="false"></textarea><div id="inp-w" class="small muted">Eingaben (für EINGABE, eine pro Zeile): <textarea id="inp" rows="2" spellcheck="false"></textarea></div><div id="refbox" class="refbox" hidden></div><div id="tp"></div></div>';
    if (what === 'js') h += '<h1>JavaScript-Spielwiese</h1><p class="lead">Schreibe JavaScript und führe es aus. Mit <code>console.log(...)</code> gibst du etwas aus. Der Code läuft abgeschottet im Browser und wird nach 2,5 Sekunden beendet, falls er nicht fertig wird.</p><div class="pg"><textarea id="src" class="editor tall" spellcheck="false"></textarea><div class="pg-top"><button class="primary" id="run">Ausführen</button></div><pre class="console" id="out"></pre></div>';
    if (what === 'sql') h += '<h1>SQL-Spielwiese</h1><p class="lead">Eine kleine Shop-Datenbank zum Ausprobieren. Du kannst lesen (SELECT) und ändern (INSERT, UPDATE, DELETE). Jede Ausführung beginnt mit frischen Daten, kaputt machen kannst du nichts.</p><div class="pg"><div id="schema" class="schemabox"></div><textarea id="src" class="editor" rows="6" spellcheck="false">SELECT name, stadt FROM kunde\nWHERE stadt = \'Berlin\';</textarea><div class="pg-top"><button class="primary" id="run">Ausführen</button></div><div id="out"></div></div>';
    if (what === 'uml') h += '<h1>UML-Werkstatt</h1><p class="lead">Schreibe links in einfacher Schreibweise, rechts entsteht das Klassendiagramm. Die Kurzübersicht steht unter dem Feld.</p><div class="pg"><div class="pg-top"><select id="smp"></select></div><div class="uml-pg"><textarea id="src" class="editor tall" spellcheck="false"></textarea><div class="uml-wrap" id="dia"></div></div><pre class="refbox">klasse Name [abstrakt]      Klasse (oder: schnittstelle Name)\n  - attribut: Typ           Attribut (+ öffentlich, - privat, # geschützt)\n  + methode(): Typ          Methode (mit Klammern)\nKind --|> Eltern            Vererbung\nKlasse ..|> Schnittstelle   Schnittstelle umsetzen\nA "1" --> "*" B : hat       Assoziation mit Vielfachheiten\nGanzes o-- Teil             Aggregation\nGanzes *-- Teil             Komposition\nA ..> B                     Abhängigkeit</pre></div>';
    return h;
  }
  function playInit(what) {
    const src = $('#src');
    if (what !== 'uml') src.dataset.lang = what === 'js' ? 'javascript' : what; // Autovervollständigung (editor.js)
    if (what === 'pseudo') {
      const S = A.pseudoSamples || {}, sel = $('#smp');
      sel.innerHTML = Object.keys(S).map((k) => '<option>' + esc(k) + '</option>').join('');
      src.value = S[sel.value] || '';
      sel.addEventListener('change', () => { src.value = S[sel.value]; $('#tp').innerHTML = ''; });
      $('#run').addEventListener('click', () => tracePlayer($('#tp'), src.value, $('#inp').value.split('\n').filter((x) => x.trim() !== '')));
      $('#ref').addEventListener('click', () => { const b = $('#refbox'); b.hidden = !b.hidden; b.textContent = A.pseudoRef || ''; });
    }
    if (what === 'js') {
      src.value = (A.jsSample || '// Probiere etwas aus\nconsole.log("Hallo Welt");');
      $('#run').addEventListener('click', () => { const out = $('#out'); out.textContent = 'läuft gerade'; Sandbox.run(src.value).then((r) => { out.className = 'console' + (r.error ? ' bad' : ''); out.textContent = (r.logs.length ? r.logs.join('\n') : r.error ? '' : '(keine Ausgabe)') + (r.error ? (r.logs.length ? '\n' : '') + 'Fehler: ' + r.error : ''); }); });
    }
    if (what === 'sql') {
      schemaHtml().then((h) => { $('#schema').innerHTML = '<b>Tabellen der Beispieldatenbank</b>' + h; });
      $('#run').addEventListener('click', async () => {
        const out = $('#out'); out.innerHTML = '<span class="muted">läuft gerade</span>';
        try { const db = await newDb(), r = runSql(db, src.value); out.innerHTML = r.error ? '<div class="note note-warn"><b>SQL-Fehler</b> ' + esc(r.error) + '</div>' : (r.res.length ? sqlTable(r.res) : '<p class="muted">Ausgeführt. ' + r.changed + ' Zeile(n) betroffen. (Die Änderung gilt nur für diese Ausführung.)</p>'); }
        catch (e) { out.innerHTML = '<div class="note note-warn">' + esc(e.message) + '</div>'; }
      });
    }
    if (what === 'uml') {
      const S = A.umlSamples || {}, sel = $('#smp'), dia = $('#dia');
      sel.innerHTML = Object.keys(S).map((k) => '<option>' + esc(k) + '</option>').join('');
      const draw = () => { dia.innerHTML = UML.classDiagram(src.value); };
      src.value = S[sel.value] || ''; draw();
      sel.addEventListener('change', () => { src.value = S[sel.value]; draw(); });
      let t; src.addEventListener('input', () => { clearTimeout(t); t = setTimeout(draw, 250); });
    }
  }

  /* ---------- Navigation ---------- */
  const NAV_AC = ['--th-pp', '--th-fn', '--th-kw', '--th-ty', '--th-str', '--th-var', '--th-num'];
  function renderNav() {
    const [sk, sa] = viewState(), cur = CUR ? CUR.track.id : sk === 'track' ? sa : null;
    // Seitenleiste im Tokyo-Hack-Stil: jeder Kurs hat seine Akzentfarbe aus der Palette, Start ist deutlich größer
    const home = sk === 'home';
    $('#nav').innerHTML = '<a class="nav-top nav-home' + (home ? ' on' : '') + '" href="' + BASE + '">Start</a>' + A.tracks.map((t, i) => {
      const ls = A.lessons(t);
      return '<details name="kurs" style="--ac: var(' + NAV_AC[i % NAV_AC.length] + ')"' + (cur === t.id ? ' open' : '') + '><summary><span>' + esc(t.title) + '</span><span class="small muted">' + ls.filter((l) => P.done[l.id]).length + '/' + ls.length + '</span></summary>' + ls.map((l) => '<a class="nl' + (P.done[l.id] ? ' done' : '') + (CUR && CUR.lesson.id === l.id ? ' on' : '') + '" href="' + lessonUrl(l.id) + '"><span class="dot"></span>' + esc(l.title) + '</a>').join('') + '</details>';
    }).join('') + '<div class="nav-sep"></div><a class="nav-top" href="' + BASE + '#/play/pseudo">Spielwiese</a><a class="nav-top" href="' + BASE + '#/compare/vars">Sprachvergleich</a><a class="nav-top" href="' + BASE + '#/glossar">Begriffe von A bis Z</a><a class="nav-top" href="' + BASE + '#/glossar/kuerzel">Kürzel der Sprachen</a><button class="nav-reset" type="button">Lernfortschritt löschen</button><div class="nav-sep"></div><a class="nav-top" href="/#impressum">Impressum und Datenschutz</a>';
    // Höchstens ein Kurs aufgeklappt: name="kurs" erledigt das in neuen Browsern, das hier in älteren
    $$('#nav details').forEach((d) => d.addEventListener('toggle', () => { if (d.open) $$('#nav details[open]').forEach((o) => { if (o !== d) o.open = false; }); }));
  }

  // Welche Ansicht gilt? Kurse und Lektionen haben echte Adressen (/code-lernen/kurs/java/vars/), die Werkzeuge bleiben unter #/…
  function viewState() {
    const h = location.hash.replace(/^#\/?/, '');
    if (h) return h.split('/');
    const m = location.pathname.slice(BASE.length).match(/^kurs\/([\w-]+)\/(?:([\w-]+)\/)?$/);
    return m ? (m[2] ? ['lesson', m[1] + '-' + m[2]] : ['track', m[1]]) : ['home'];
  }
  let LAST = '';
  function route(force) {
    const [kind, arg] = viewState(), main = $('#main');
    // alte Links mit #/lesson/…, #/track/… und #/home auf die echte Adresse umschreiben (Lesezeichen und Querverweise bleiben gültig)
    const pretty = kind === 'lesson' && PATHS()[arg] ? PATHS()[arg] : kind === 'track' && A.tracks.some((t) => t.id === arg) ? kursUrl(arg) : kind === 'home' ? BASE : null;
    if (pretty && location.hash && /^#\/(lesson|track|home)/.test(location.hash)) history.replaceState(null, '', pretty);
    if (force !== true && location.href === LAST) return; // popstate und hashchange melden manchmal dieselbe Änderung doppelt
    LAST = location.href;
    CUR = null; MOUNTS = [];
    let html = '';
    if (kind === 'lesson') {
      const f = A.findLesson(arg);
      if (f) { CUR = f; P.last = arg; save(); html = lessonView(f.track, f.lesson); } else html = '<h1>Lektion nicht gefunden</h1><p><a href="' + BASE + '">Zum Start</a></p>';
    } else if (kind === 'track') { const t = A.tracks.find((x) => x.id === arg); html = t ? trackView(t) : homeView(); }
    else if (kind === 'play') html = playView(arg || 'pseudo');
    else if (kind === 'compare') html = compareView(arg || 'vars');
    else if (kind === 'glossar') html = glossarView(arg);
    else html = homeView();
    main.innerHTML = html;
    activate(main);
    if (kind === 'play') playInit(arg || 'pseudo');
    const home = !['lesson', 'track', 'play', 'compare', 'glossar'].includes(kind);
    main.classList.toggle('bp-home', home);
    if (home) saeuleInit(main);
    if (kind === 'glossar') $('#gs').addEventListener('input', (e) => { const q = e.target.value.toLowerCase().trim(); $$('.term').forEach((t) => { t.hidden = q && !t.dataset.s.includes(q); }); });
    renderNav();
    main.scrollTop = 0; window.scrollTo(0, 0);
    const tt = kind === 'track' && A.tracks.find((x) => x.id === arg);
    document.title = (CUR ? CUR.lesson.title + ' | ' + CUR.track.title + ' | ' : tt ? tt.title + ' | ' : '') + 'Code lesen | Layer 8 Academy';
    drawer(false);
  }

  /* ---------- Start ---------- */
  function applyPrefs() { document.documentElement.style.fontSize = P.font + '%'; }
  // Kursmenü auf schmalen Bildschirmen: fährt von links herein, dahinter wird abgedunkelt; Tippen daneben schließt es
  function drawer(open) {
    $('#side').classList.toggle('open', open); $('#shade').hidden = !open;
    $('#menu').setAttribute('aria-expanded', open ? 'true' : 'false'); document.body.classList.toggle('drawer-open', open);
  }
  // Kontrastwahl wie auf der übrigen Layer 8 Academy (gleicher Speicherplatz, die Wahl gilt überall)
  function a11y() {
    const KEY_T = 'l8a_theme', toggle = $('#a11yToggle'), menu = $('#a11yMenu'), opts = $$('.a11y-opt', menu);
    const apply = (theme) => {
      if (theme === 'default') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', theme);
      try { localStorage.setItem(KEY_T, theme); } catch (e) { /* ohne Speicher gilt die Wahl nur bis zum Neuladen */ }
      opts.forEach((o) => { o.classList.toggle('active', o.dataset.theme === theme); o.setAttribute('aria-checked', o.dataset.theme === theme ? 'true' : 'false'); });
    };
    let cur = 'default'; try { cur = localStorage.getItem(KEY_T) || 'default'; } catch (e) { /* Standard */ }
    apply(cur);
    const close = () => { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', (e) => { e.stopPropagation(); const o = menu.classList.toggle('open'); toggle.setAttribute('aria-expanded', o ? 'true' : 'false'); });
    opts.forEach((o) => o.addEventListener('click', () => { apply(o.dataset.theme); close(); }));
    document.addEventListener('click', (e) => { if (!menu.contains(e.target) && e.target !== toggle) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { close(); drawer(false); } });
  }
  document.addEventListener('DOMContentLoaded', () => {
    applyPrefs();
    a11y();
    kzTipInit();
    $('#fplus').addEventListener('click', () => { P.font = Math.min(150, P.font + 10); save(); applyPrefs(); });
    $('#fminus').addEventListener('click', () => { P.font = Math.max(80, P.font - 10); save(); applyPrefs(); });
    $('#menu').addEventListener('click', () => drawer(!$('#side').classList.contains('open')));
    $('#shade').addEventListener('click', () => drawer(false));
    const reset = () => { if (confirm('Wirklich den gesamten Lernfortschritt auf diesem Gerät löschen?')) { P.done = {}; P.task = {}; P.quiz = {}; P.last = null; save(); route(true); } };
    $('#reset').addEventListener('click', reset);
    // auf dem Handy steht der Knopf im Kursmenü (die Kopfleiste ist dort zu schmal)
    $('#nav').addEventListener('click', (e) => { if (e.target.closest('.nav-reset')) reset(); });
    window.addEventListener('hashchange', () => route());
    window.addEventListener('popstate', () => route());
    // Links innerhalb von Code lesen ohne Neuladen öffnen; neue Tabs, Strg-Klick und fremde Seiten bleiben, wie sie sind
    document.addEventListener('click', (e) => {
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target || a.hasAttribute('download')) return;
      const u = new URL(a.href, location.href);
      if (u.origin !== location.origin || !u.pathname.startsWith(BASE) || /\.\w+$/.test(u.pathname)) return;
      e.preventDefault();
      if (u.href !== location.href) history.pushState(null, '', u.pathname + u.hash);
      LAST = ''; route();
    });
    route();
  });
  window.__academy = { route, P };
})();
