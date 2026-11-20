/*
 * Pseudocode-Interpreter mit Ablaufprotokoll (für den "Verfolgen"-Player).
 * Deutsche Schreibweise, bewusst klein gehalten:
 *   x <- 5            Zuweisung (auch ←, := oder SETZE x AUF 5)
 *   AUSGABE a, b      Ausgabe (Komma = Leerzeichen dazwischen)
 *   EINGABE x         Wert einlesen
 *   WENN ... DANN / SONST WENN ... DANN / SONST / ENDE WENN
 *   SOLANGE ... / ENDE SOLANGE
 *   WIEDERHOLE ... BIS bedingung
 *   FÜR i VON 1 BIS 10 [SCHRITT 2] ... ENDE FÜR    (auch: FÜR i VON 10 ABWÄRTS BIS 1)
 *   FÜR JEDES x IN liste ... ENDE FÜR
 *   FUNKTION name(a, b) ... GIB ZURÜCK wert ... ENDE FUNKTION
 * Listen: [1, 2, 3], liste[0] (Index beginnt bei 0), LÄNGE(liste), ANHÄNGEN(liste, wert),
 *         LETZTES_ENTFERNEN(liste) und ERSTES_ENTFERNEN(liste) (nehmen das Element heraus und geben es zurück)
 * Operatoren: + - * / DIV MOD  = != < > <= >=  UND ODER NICHT
 */
(function (g) {
  'use strict';
  const ID = '[A-Za-zÄÖÜäöüß_][A-Za-zÄÖÜäöüß_0-9]*';
  const MAXSTEPS = 3000;
  const MAXDEPTH = 100;

  class PErr extends Error { constructor(msg, line) { super(msg); this.line = line; } }
  class Ret { constructor(v) { this.v = v; } }

  /* ---------- Werte ---------- */
  function num(n) { return Number.isInteger(n) ? String(n) : String(parseFloat(n.toFixed(6))); }
  function fmt(v, raw) {
    if (typeof v === 'number') return num(v);
    if (typeof v === 'string') return raw ? v : '"' + v + '"';
    if (typeof v === 'boolean') return v ? 'WAHR' : 'FALSCH';
    if (Array.isArray(v)) return '[' + v.map((x) => fmt(x, false)).join(', ') + ']';
    return String(v);
  }
  const copy = (v) => (Array.isArray(v) ? v.map(copy) : v);

  /* ---------- Ausdrücke: Tokenizer ---------- */
  const KWS = ['UND', 'ODER', 'NICHT', 'DIV', 'MOD', 'WAHR', 'FALSCH'];
  function tokenize(s, line) {
    const out = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      if (c === '"' || c === '„') {
        const closers = c === '"' ? ['"'] : ['“', '"'];
        let j = i + 1;
        while (j < s.length && !closers.includes(s[j])) j++;
        if (j >= s.length) throw new PErr('Text nicht abgeschlossen (Anführungszeichen fehlt)', line);
        out.push({ t: 'str', v: s.slice(i + 1, j) });
        i = j + 1; continue;
      }
      let m;
      if ((m = /^\d+(\.\d+)?/.exec(s.slice(i)))) { out.push({ t: 'num', v: parseFloat(m[0]) }); i += m[0].length; continue; }
      if ((m = new RegExp('^' + ID).exec(s.slice(i)))) {
        const up = m[0].toUpperCase();
        out.push(KWS.includes(up) ? { t: 'kw', v: up } : { t: 'id', v: m[0] });
        i += m[0].length; continue;
      }
      const two = s.slice(i, i + 2);
      if (['<=', '>=', '!='].includes(two)) { out.push({ t: 'op', v: two }); i += 2; continue; }
      if ('+-*/()[],<>=≠≤≥'.includes(c)) { out.push({ t: 'op', v: c }); i++; continue; }
      throw new PErr('Unbekanntes Zeichen „' + c + '“', line);
    }
    return out;
  }

  /* ---------- Ausdrücke: Parser ---------- */
  function parseExpr(text, line) {
    const tokens = tokenize(text, line);
    if (!tokens.length) throw new PErr('Hier fehlt ein Ausdruck (Wert oder Rechnung)', line);
    let p = 0;
    const peek = () => tokens[p];
    const isOp = (v) => peek() && peek().t === 'op' && peek().v === v;
    const isKw = (v) => peek() && peek().t === 'kw' && peek().v === v;
    const expect = (v) => { if (!isOp(v)) throw new PErr('„' + v + '“ erwartet', line); p++; };
    const normCmp = (o) => (o === '≠' ? '!=' : o === '≤' ? '<=' : o === '≥' ? '>=' : o);
    const CMP = ['=', '!=', '≠', '<', '>', '<=', '>=', '≤', '≥'];
    function or() { let l = and(); while (isKw('ODER')) { p++; l = { k: 'bin', op: 'ODER', l, r: and() }; } return l; }
    function and() { let l = not(); while (isKw('UND')) { p++; l = { k: 'bin', op: 'UND', l, r: not() }; } return l; }
    function not() { if (isKw('NICHT')) { p++; return { k: 'un', op: 'NICHT', e: not() }; } return cmp(); }
    function cmp() {
      let l = add();
      while (peek() && peek().t === 'op' && CMP.includes(peek().v)) { const o = tokens[p++].v; l = { k: 'bin', op: normCmp(o), l, r: add() }; }
      return l;
    }
    function add() { let l = mul(); while (isOp('+') || isOp('-')) { const o = tokens[p++].v; l = { k: 'bin', op: o, l, r: mul() }; } return l; }
    function mul() { let l = un(); while (isOp('*') || isOp('/') || isKw('DIV') || isKw('MOD')) { const o = tokens[p++].v; l = { k: 'bin', op: o, l, r: un() }; } return l; }
    function un() { if (isOp('-')) { p++; return { k: 'un', op: '-', e: un() }; } return post(); }
    function post() { let e = prim(); while (isOp('[')) { p++; const i = or(); expect(']'); e = { k: 'idx', e, i }; } return e; }
    function prim() {
      const t = tokens[p++];
      if (!t) throw new PErr('Ausdruck ist unvollständig', line);
      if (t.t === 'num') return { k: 'lit', v: t.v };
      if (t.t === 'str') return { k: 'lit', v: t.v };
      if (t.t === 'kw' && t.v === 'WAHR') return { k: 'lit', v: true };
      if (t.t === 'kw' && t.v === 'FALSCH') return { k: 'lit', v: false };
      if (t.t === 'id') {
        if (isOp('(')) {
          p++; const args = [];
          if (!isOp(')')) { do { args.push(or()); if (isOp(',')) p++; else break; } while (true); }
          expect(')');
          return { k: 'call', name: t.v, args };
        }
        return { k: 'var', name: t.v };
      }
      if (t.t === 'op' && t.v === '(') { const e = or(); expect(')'); return e; }
      if (t.t === 'op' && t.v === '[') {
        const items = [];
        if (!isOp(']')) { do { items.push(or()); if (isOp(',')) p++; else break; } while (true); }
        expect(']');
        return { k: 'list', items };
      }
      throw new PErr('Unerwartet: „' + (t.v) + '“', line);
    }
    const e = or();
    if (p < tokens.length) throw new PErr('Unerwartet: „' + tokens[p].v + '“ (fehlt ein Komma oder Operator?)', line);
    return e;
  }

  /* ---------- Programm: Parser ---------- */
  function splitArgs(s, line) {
    const parts = []; let depth = 0, cur = '', q = false;
    for (const c of s) {
      if (c === '"') q = !q;
      if (!q) { if (c === '(' || c === '[') depth++; if (c === ')' || c === ']') depth--; if (c === ',' && depth === 0) { parts.push(cur); cur = ''; continue; } }
      cur += c;
    }
    if (cur.trim() || parts.length) parts.push(cur);
    return parts.map((x) => parseExpr(x, line));
  }

  const R = {
    // Schreibweisen wie in der Layer 8 Academy und vielen Prüfungen gelten gleichwertig: START, SCHREIBE, LIES, SETZE x = 5,
    // SOLANGE ... WIEDERHOLE, FÜR ... WIEDERHOLE, METHODE und RÜCKGABE; ein einzelnes ENDE schließt den Algorithmus ab
    algo: /^(?:ALGORITHMUS|START)\b|^ENDE$/i,
    out: /^(?:AUSGABE|SCHREIBE)\b:?\s*(.*)$/i,
    inp: new RegExp('^(?:EINGABE|LIES)\\b:?\\s*(' + ID + ')\\s*$', 'i'),
    endIf: /^ENDE\s*WENN$/i,
    endWhile: /^ENDE\s*SOLANGE$/i,
    endFor: /^ENDE\s*F(Ü|UE)R$/i,
    endFn: /^ENDE\s*(?:FUNKTION|METHODE)$/i,
    elseIf: /^SONST\s+WENN\s+(.*?)(?:\s+DANN)?$/i,
    else: /^SONST$/i,
    if: /^WENN\s+(.*?)(?:\s+DANN)?$/i,
    while: /^SOLANGE\s+(.*?)(?:\s+(?:MACHE|WIEDERHOLE))?$/i,
    repeat: /^WIEDERHOLE$/i,
    until: /^BIS\s+(.*)$/i,
    each: new RegExp('^F(?:Ü|UE)R\\s+JEDES\\s+(' + ID + ')\\s+IN\\s+(.*?)(?:\\s+WIEDERHOLE)?$', 'i'),
    for: new RegExp('^F(?:Ü|UE)R\\s+(' + ID + ')\\s+VON\\s+(.*?)\\s+BIS\\s+(.*?)(?:\\s+SCHRITT\\s+(.*?))?(?:\\s+WIEDERHOLE)?$', 'i'),
    fn: new RegExp('^(?:FUNKTION|METHODE)\\s+(' + ID + ')\\s*\\((.*)\\)\\s*$', 'i'),
    ret: /^(?:GIB\s+ZUR(?:Ü|UE)CK|R(?:Ü|UE)CKGABE)\b\s*(.*)$/i,
    setze: /^SETZE\s+(.+?)(?:\s+AUF\s+|\s*:=\s*|\s*=\s*)(.*)$/i,
    assign: new RegExp('^(' + ID + '(?:\\s*\\[.*\\])?)\\s*(?:<-|←|:=)\\s*(.*)$')
  };

  function parse(src) {
    const raw = src.replace(/\r/g, '').split('\n');
    const lines = [];
    raw.forEach((l, i) => {
      const t = l.replace(/\s*(\/\/|#).*$/, (m, c, off) => (insideString(l, off) ? m : '')).trim();
      if (t) lines.push({ n: i, t });
    });
    let pos = 0;
    const funcs = {};

    function parseTarget(s, line) {
      const m = new RegExp('^(' + ID + ')\\s*(?:\\[(.*)\\])?$').exec(s.trim());
      if (!m) throw new PErr('Links von der Zuweisung muss ein Variablenname stehen', line);
      return { name: m[1], idx: m[2] !== undefined ? parseExpr(m[2], line) : null };
    }

    function block(stops) {
      const body = [];
      while (pos < lines.length) {
        const { n, t } = lines[pos];
        if (stops.some((r) => r.test(t))) return body;
        body.push(stmt());
      }
      if (stops.length) {
        const last = lines[lines.length - 1];
        throw new PErr('Der Block wird nicht abgeschlossen (es fehlt das passende Ende, zum Beispiel ENDE WENN, ENDE SOLANGE oder bei WIEDERHOLE das BIS)', last ? last.n : 0);
      }
      return body;
    }

    function stmt() {
      const { n, t } = lines[pos];
      let m;
      if (R.algo.test(t)) { pos++; return { k: 'nop', line: n }; }
      if ((m = R.out.exec(t))) { pos++; return { k: 'out', es: splitArgs(m[1], n), line: n }; }
      if ((m = R.inp.exec(t))) { pos++; return { k: 'in', name: m[1], line: n }; }
      if ((m = R.if.exec(t))) {
        pos++;
        const branches = [{ cond: parseExpr(m[1], n), text: m[1].trim(), line: n, body: block([R.elseIf, R.else, R.endIf]) }];
        let els = null;
        while (pos < lines.length) {
          const cur = lines[pos];
          if ((m = R.elseIf.exec(cur.t))) { pos++; branches.push({ cond: parseExpr(m[1], cur.n), text: m[1].trim(), line: cur.n, body: block([R.elseIf, R.else, R.endIf]) }); continue; }
          if (R.else.test(cur.t)) { pos++; els = { line: cur.n, body: block([R.endIf]) }; continue; }
          if (R.endIf.test(cur.t)) { pos++; return { k: 'if', branches, els, line: n }; }
          break;
        }
        throw new PErr('WENN wird nicht mit ENDE WENN abgeschlossen', n);
      }
      if ((m = R.while.exec(t))) {
        pos++;
        const cond = parseExpr(m[1], n), text = m[1].trim();
        const body = block([R.endWhile]);
        if (pos >= lines.length) throw new PErr('SOLANGE wird nicht mit ENDE SOLANGE abgeschlossen', n);
        pos++;
        return { k: 'while', cond, text, body, line: n };
      }
      if (R.repeat.test(t)) {
        pos++;
        const body = block([R.until]);
        if (pos >= lines.length) throw new PErr('WIEDERHOLE braucht am Ende eine Zeile BIS bedingung', n);
        const u = lines[pos]; const um = R.until.exec(u.t); pos++;
        return { k: 'repeat', body, cond: parseExpr(um[1], u.n), text: um[1].trim(), line: n, untilLine: u.n };
      }
      if ((m = R.each.exec(t))) {
        pos++;
        const list = parseExpr(m[2], n);
        const body = block([R.endFor]);
        if (pos >= lines.length) throw new PErr('FÜR JEDES wird nicht mit ENDE FÜR abgeschlossen', n);
        pos++;
        return { k: 'each', v: m[1], list, body, line: n };
      }
      // FÜR i VON 5 ABWÄRTS BIS 1 (alternative Schreibweise): wie SCHRITT -1
      const down = /\s+ABW(?:Ä|AE)RTS\s+BIS\s+/i.test(t);
      if ((m = R.for.exec(down ? t.replace(/\s+ABW(?:Ä|AE)RTS\s+BIS\s+/i, ' BIS ') : t))) {
        pos++;
        const from = parseExpr(m[2], n), to = parseExpr(m[3], n), step = m[4] ? parseExpr(m[4], n) : down ? parseExpr('-1', n) : null;
        const body = block([R.endFor]);
        if (pos >= lines.length) throw new PErr('FÜR wird nicht mit ENDE FÜR abgeschlossen', n);
        pos++;
        return { k: 'for', v: m[1], from, to, step, body, line: n };
      }
      if ((m = R.fn.exec(t))) {
        pos++;
        const params = m[2].trim() ? m[2].split(',').map((x) => x.trim()) : [];
        const body = block([R.endFn]);
        if (pos >= lines.length) throw new PErr('FUNKTION wird nicht mit ENDE FUNKTION abgeschlossen', n);
        pos++;
        funcs[m[1].toLowerCase()] = { name: m[1], params, body, line: n };
        return { k: 'nop', line: n };
      }
      if ((m = R.ret.exec(t))) { pos++; return { k: 'ret', e: m[1].trim() ? parseExpr(m[1], n) : null, line: n }; }
      if ((m = R.setze.exec(t))) { pos++; return { k: 'set', target: parseTarget(m[1], n), e: parseExpr(m[2], n), line: n }; }
      if ((m = R.assign.exec(t))) { pos++; return { k: 'set', target: parseTarget(m[1], n), e: parseExpr(m[2], n), line: n }; }
      if (R.endIf.test(t) || R.endWhile.test(t) || R.endFor.test(t) || R.endFn.test(t) || R.else.test(t) || R.elseIf.test(t) || R.until.test(t)) {
        throw new PErr('„' + t + '“ passt hier zu keinem Anfang (ein Block wurde nicht geöffnet oder schon geschlossen)', n);
      }
      pos++;
      const e = parseExpr(t, n);
      if (e.k !== 'call') throw new PErr('Diese Zeile ist keine Anweisung. Gemeint ist zum Beispiel eine Zuweisung wie x <- 5, eine AUSGABE oder ein Funktionsaufruf', n);
      return { k: 'call', e, line: n };
    }

    const body = block([]);
    return { body, funcs };
  }

  function insideString(l, off) {
    let q = false;
    for (let i = 0; i < off; i++) { if (l[i] === '"') q = !q; }
    return q;
  }

  /* ---------- Ausführung mit Protokoll ---------- */
  function run(src, opts) {
    opts = opts || {};
    const inputs = (opts.inputs || []).slice();
    const events = [];
    let out = '', steps = 0;
    let prog;
    try { prog = parse(src); } catch (e) {
      if (e instanceof PErr) return { events: [], error: { msg: e.message, line: e.line }, output: '' };
      throw e;
    }
    const frames = [{ name: null, vars: {} }];
    const snap = () => frames.map((f) => ({ name: f.name, vars: Object.fromEntries(Object.entries(f.vars).map(([k, v]) => [k, copy(v)])) }));
    const emit = (line, msg, extra) => {
      if (++steps > MAXSTEPS) throw new PErr('Abbruch nach ' + MAXSTEPS + ' Schritten. Vermutlich ist das eine Endlosschleife, weil die Bedingung nie FALSCH wird', line);
      events.push(Object.assign({ line, msg, scopes: snap(), out }, extra || {}));
    };
    const top = () => frames[frames.length - 1].vars;
    function lookup(name, line) {
      if (name in top()) return top()[name];
      if (name in frames[0].vars) return frames[0].vars[name];
      throw new PErr('Die Variable „' + name + '“ hat noch keinen Wert. Sie muss vorher mit ← gesetzt werden', line);
    }
    function needNum(v, op, line) { if (typeof v !== 'number') throw new PErr('„' + op + '“ rechnet nur mit Zahlen, hier steht aber ' + fmt(v), line); return v; }
    function needBool(v, line) { if (typeof v !== 'boolean') throw new PErr('Hier muss eine Bedingung stehen (WAHR oder FALSCH), nicht ' + fmt(v), line); return v; }

    const B = {
      'länge': (a) => (Array.isArray(a[0]) || typeof a[0] === 'string' ? a[0].length : bad('LÄNGE braucht eine Liste oder einen Text')),
      'laenge': (a) => B['länge'](a),
      'betrag': (a) => Math.abs(a[0]),
      'wurzel': (a) => Math.sqrt(a[0]),
      'abrunden': (a) => Math.floor(a[0]),
      'aufrunden': (a) => Math.ceil(a[0]),
      'runden': (a) => Math.round(a[0]),
      'max': (a) => Math.max(...a),
      'min': (a) => Math.min(...a),
      'text': (a) => fmt(a[0], true),
      'zahl': (a) => { const n = parseFloat(a[0]); return Number.isNaN(n) ? bad('ZAHL: „' + a[0] + '“ ist keine Zahl') : n; },
      'anhängen': (a) => { if (!Array.isArray(a[0])) bad('ANHÄNGEN braucht eine Liste'); a[0].push(a[1]); return a[0]; },
      'anhaengen': (a) => B['anhängen'](a),
      // Stapel und Warteschlange (AP2-Kurs): oben bzw. vorne herausnehmen, der Wert kommt zurück
      'letztes_entfernen': (a) => { if (!Array.isArray(a[0])) bad('LETZTES_ENTFERNEN braucht eine Liste'); if (!a[0].length) bad('Die Liste ist leer, es gibt nichts zu entfernen'); return a[0].pop(); },
      'erstes_entfernen': (a) => { if (!Array.isArray(a[0])) bad('ERSTES_ENTFERNEN braucht eine Liste'); if (!a[0].length) bad('Die Liste ist leer, es gibt nichts zu entfernen'); return a[0].shift(); }
    };
    let curLine = 0;
    function bad(m) { throw new PErr(m, curLine); }

    function ev(e, line) {
      curLine = line;
      switch (e.k) {
        case 'lit': return e.v;
        case 'var': return lookup(e.name, line);
        case 'list': return e.items.map((x) => ev(x, line));
        case 'idx': {
          const l = ev(e.e, line), i = ev(e.i, line);
          if (!Array.isArray(l) && typeof l !== 'string') throw new PErr('Mit [ ] greift man nur auf Listen oder Texte zu', line);
          if (typeof i !== 'number' || !Number.isInteger(i)) throw new PErr('Der Index muss eine ganze Zahl sein', line);
          if (i < 0 || i >= l.length) throw new PErr('Index ' + i + ' gibt es nicht: gültig sind 0 bis ' + (l.length - 1) + ' (die Zählung beginnt bei 0)', line);
          return l[i];
        }
        case 'un': {
          const v = ev(e.e, line);
          return e.op === '-' ? -needNum(v, '-', line) : !needBool(v, line);
        }
        case 'bin': {
          if (e.op === 'UND') { const l = needBool(ev(e.l, line), line); return l ? needBool(ev(e.r, line), line) : false; }
          if (e.op === 'ODER') { const l = needBool(ev(e.l, line), line); return l ? true : needBool(ev(e.r, line), line); }
          const l = ev(e.l, line), r = ev(e.r, line);
          switch (e.op) {
            case '+': return typeof l === 'string' || typeof r === 'string' ? fmt(l, true) + fmt(r, true) : needNum(l, '+', line) + needNum(r, '+', line);
            case '-': return needNum(l, '-', line) - needNum(r, '-', line);
            case '*': return needNum(l, '*', line) * needNum(r, '*', line);
            case '/': if (needNum(r, '/', line) === 0) throw new PErr('Durch 0 kann man nicht teilen', line); return needNum(l, '/', line) / r;
            case 'DIV': if (needNum(r, 'DIV', line) === 0) throw new PErr('Durch 0 kann man nicht teilen', line); return Math.trunc(needNum(l, 'DIV', line) / r);
            case 'MOD': if (needNum(r, 'MOD', line) === 0) throw new PErr('Durch 0 kann man nicht teilen', line); return needNum(l, 'MOD', line) % r;
            case '=': return JSON.stringify(l) === JSON.stringify(r);
            case '!=': return JSON.stringify(l) !== JSON.stringify(r);
            case '<': case '>': case '<=': case '>=': {
              if (typeof l !== typeof r || typeof l === 'boolean') throw new PErr('Vergleichen kann man nur Zahl mit Zahl oder Text mit Text', line);
              return e.op === '<' ? l < r : e.op === '>' ? l > r : e.op === '<=' ? l <= r : l >= r;
            }
          }
          throw new PErr('Unbekannter Operator', line);
        }
        case 'call': {
          const args = e.args.map((x) => ev(x, line));
          const fn = prog.funcs[e.name.toLowerCase()];
          if (fn) return callUser(fn, args, line);
          const b = B[e.name.toLowerCase()];
          if (b) { curLine = line; return b(args); }
          throw new PErr('Die Funktion „' + e.name + '“ gibt es nicht (weder eigene noch eingebaute)', line);
        }
      }
      throw new PErr('Unbekannter Ausdruck', line);
    }

    function callUser(fn, args, line) {
      if (args.length !== fn.params.length) throw new PErr('„' + fn.name + '“ erwartet ' + fn.params.length + ' Wert(e), bekommt aber ' + args.length, line);
      if (frames.length > MAXDEPTH) throw new PErr('Zu viele verschachtelte Aufrufe (eine Funktion ruft sich ohne Ende selbst auf?)', line);
      const vars = {};
      fn.params.forEach((p, i) => { vars[p] = copy(args[i]); });
      frames.push({ name: fn.name + '(' + args.map((a) => fmt(a)).join(', ') + ')', vars });
      emit(fn.line, 'Aufruf: ' + fn.name + '(' + args.map((a) => fmt(a)).join(', ') + '). Die Parameter bekommen ihre Werte', { call: true });
      try { exec(fn.body); } catch (r) { if (r instanceof Ret) { frames.pop(); return r.v; } throw r; }
      frames.pop();
      return null;
    }

    function exec(list) {
      for (const s of list) {
        switch (s.k) {
          case 'nop': break;
          case 'set': {
            const v = ev(s.e, s.line);
            if (s.target.idx) {
              const l = lookup(s.target.name, s.line), i = ev(s.target.idx, s.line);
              if (!Array.isArray(l)) throw new PErr('„' + s.target.name + '“ ist keine Liste', s.line);
              if (!Number.isInteger(i) || i < 0 || i >= l.length) throw new PErr('Index ' + fmt(i) + ' gibt es nicht: gültig sind 0 bis ' + (l.length - 1), s.line);
              l[i] = v;
              emit(s.line, s.target.name + '[' + i + '] bekommt den Wert ' + fmt(v));
            } else {
              top()[s.target.name] = v;
              emit(s.line, s.target.name + ' bekommt den Wert ' + fmt(v));
            }
            break;
          }
          case 'out': {
            const text = s.es.map((x) => fmt(ev(x, s.line), true)).join(' ');
            out += text + '\n';
            emit(s.line, 'Ausgabe: ' + text);
            break;
          }
          case 'in': {
            let v = inputs.length ? inputs.shift() : (typeof prompt === 'function' ? prompt('Eingabe für „' + s.name + '“:') : '');
            if (v === null) v = '';
            const n = parseFloat(v);
            top()[s.name] = (v !== '' && !Number.isNaN(n) && String(n) === String(v).trim()) ? n : v;
            emit(s.line, s.name + ' wird eingelesen: ' + fmt(top()[s.name]));
            break;
          }
          case 'if': {
            let done = false;
            for (const b of s.branches) {
              const c = needBool(ev(b.cond, b.line), b.line);
              emit(b.line, 'Prüfe: ' + b.text + '. Ergebnis: ' + (c ? 'WAHR, dieser Zweig wird ausgeführt' : 'FALSCH, dieser Zweig wird übersprungen'));
              if (c) { exec(b.body); done = true; break; }
            }
            if (!done && s.els) { emit(s.els.line, 'Keine Bedingung traf zu, also läuft der SONST-Zweig'); exec(s.els.body); }
            break;
          }
          case 'while': {
            while (true) {
              const c = needBool(ev(s.cond, s.line), s.line);
              emit(s.line, 'Prüfe: ' + s.text + '. Ergebnis: ' + (c ? 'WAHR, der Schleifenkörper läuft noch einmal' : 'FALSCH, die Schleife ist beendet'));
              if (!c) break;
              exec(s.body);
            }
            break;
          }
          case 'repeat': {
            do { exec(s.body); var c = needBool(ev(s.cond, s.untilLine), s.untilLine); emit(s.untilLine, 'Prüfe: ' + s.text + '. Ergebnis: ' + (c ? 'WAHR, jetzt wird aufgehört' : 'FALSCH, es geht von vorn los')); } while (!c);
            break;
          }
          case 'for': {
            const a = needNum(ev(s.from, s.line), 'VON', s.line), b = needNum(ev(s.to, s.line), 'BIS', s.line), st = s.step ? needNum(ev(s.step, s.line), 'SCHRITT', s.line) : (a <= b ? 1 : -1);
            if (st === 0) throw new PErr('SCHRITT darf nicht 0 sein (sonst käme die Schleife nie ans Ende)', s.line);
            for (let i = a; st > 0 ? i <= b : i >= b; i += st) {
              top()[s.v] = i;
              emit(s.line, s.v + ' = ' + num(i) + ' (Durchlauf ' + (Math.round(Math.abs((i - a) / st)) + 1) + ')');
              exec(s.body);
            }
            emit(s.line, 'Die Zählung ist über ' + num(b) + ' hinaus, die Schleife ist beendet');
            break;
          }
          case 'each': {
            const l = ev(s.list, s.line);
            if (!Array.isArray(l) && typeof l !== 'string') throw new PErr('FÜR JEDES braucht eine Liste oder einen Text', s.line);
            const items = Array.isArray(l) ? l.slice() : l.split('');
            items.forEach((x, i) => { top()[s.v] = x; emit(s.line, s.v + ' = ' + fmt(x) + ' (Element ' + (i + 1) + ' von ' + items.length + ')'); exec(s.body); });
            emit(s.line, 'Alle Elemente sind durch, die Schleife ist beendet');
            break;
          }
          case 'ret': {
            const v = s.e ? ev(s.e, s.line) : null;
            emit(s.line, 'GIB ZURÜCK ' + (v === null ? '' : fmt(v)) + '. Die Funktion endet hier');
            throw new Ret(v);
          }
          case 'call': {
            ev(s.e, s.line);
            emit(s.line, 'Aufruf ausgeführt');
            break;
          }
        }
      }
    }

    try {
      exec(prog.body);
      emit(events.length ? events[events.length - 1].line : 0, 'Das Programm ist zu Ende', { end: true });
    } catch (e) {
      if (e instanceof PErr) {
        events.push({ line: e.line, msg: 'Fehler: ' + e.message, scopes: snap(), out, error: true });
        return { events, error: { msg: e.message, line: e.line }, output: out };
      }
      if (e instanceof Ret) {
        events.push({ line: 0, msg: 'GIB ZURÜCK steht außerhalb einer Funktion', scopes: snap(), out, error: true });
        return { events, error: { msg: 'GIB ZURÜCK steht außerhalb einer Funktion', line: 0 }, output: out };
      }
      throw e;
    }
    return { events, error: null, output: out };
  }

  const API = { run, fmt, parse };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else g.Pseudo = API;
})(typeof window !== 'undefined' ? window : globalThis);
