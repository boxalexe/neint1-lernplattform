# Zeichnet den Ablauf eines Python-Beispiels Zeile für Zeile auf (sys.settrace, nur Standardbibliothek).
# Aufruf: python -I tracer.py beispiel.py [maxSchritte]
# Ausgabe (stdout, JSON), gleiches Format wie trace-java/Tracer.java:
#   {"steps":[{"line":n,"frames":[{"method":"main","cls":"Main","vars":{...}}],"out":"...","exc":"..."}],"out":"...","error":"..."}
# Ein Schritt ist der Zustand vor der Zeile. exc: Exception, die beim Ausführen der vorigen Zeile aufgetreten ist.
# Werte: Texte als repr ('Maus'), eigene Objekte als Klasse@Nummer{attr=wert}, Exceptions als "Typ: Meldung".
import io, json, sys, types

QUELLE = sys.argv[1]
MAX = int(sys.argv[2]) if len(sys.argv) > 2 else 2000
code = compile(open(QUELLE, encoding='utf-8').read(), QUELLE, 'exec')
ausgabe = io.StringIO()
schritte, nummern = [], {}
offen = {'exc': None}


class Genug(Exception):
    pass


def eigen(f):
    return f.f_code.co_filename == QUELLE


def zeigen(w, tiefe=0):
    if isinstance(w, BaseException):
        return type(w).__name__ + (': ' + str(w) if str(w) else '')
    if w is None or isinstance(w, (bool, int, float, str)):
        return repr(w)
    if isinstance(w, io.IOBase):
        return '<Datei ' + repr(getattr(w, 'name', '?')) + (' geschlossen' if w.closed else '') + '>'
    if tiefe > 2:
        return '…'
    if isinstance(w, list):
        return '[' + ', '.join(zeigen(x, tiefe + 1) for x in w) + ']'
    if isinstance(w, tuple):
        return '(' + ', '.join(zeigen(x, tiefe + 1) for x in w) + (',)' if len(w) == 1 else ')')
    if isinstance(w, dict):
        return '{' + ', '.join(zeigen(k, tiefe + 1) + ': ' + zeigen(v, tiefe + 1) for k, v in w.items()) + '}'
    if isinstance(w, (set, frozenset)):
        return '{' + ', '.join(sorted(zeigen(x, tiefe + 1) for x in w)) + '}' if w else 'set()'
    if hasattr(w, '__dict__') and type(w).__module__ == '__main__':
        n = nummern.setdefault(id(w), (len(nummern) + 1, w))[0]
        return type(w).__name__ + '@' + str(n) + '{' + ', '.join(k + '=' + zeigen(v, tiefe + 1) for k, v in vars(w).items()) + '}'
    return repr(w)


def sichtbar(k, v):
    if k.startswith('__'):
        return False
    return not isinstance(v, (types.FunctionType, types.ModuleType, type, types.BuiltinFunctionType))


def klasse_von(code_obj, selbst):
    # Die Klasse, in der die Methode steht (bei super().__init__ die Oberklasse, nicht die des Objekts)
    for k in type(selbst).__mro__:
        w = k.__dict__.get(code_obj.co_name)
        teile = [w.fget, w.fset] if isinstance(w, property) else [w]
        if any(getattr(t, '__code__', None) is code_obj for t in teile):
            return k.__name__
    return type(selbst).__name__


def rahmen(f):
    kette = []
    while f is not None:
        if eigen(f):
            kette.append(f)
        f = f.f_back
    kette.reverse()
    out = []
    for f in kette:
        name, lok = f.f_code.co_name, f.f_locals
        selbst = lok.get('self')
        cls = klasse_von(f.f_code, selbst) if selbst is not None and type(selbst).__module__ == '__main__' else ''
        if name == '<module>':
            name, cls = 'main', 'Main'
        elif name == '__init__':
            name = '<init>'
        elif name == '<lambda>':
            name = 'lambda$'
        out.append({'method': name, 'cls': cls, 'vars': {k: zeigen(v) for k, v in lok.items() if sichtbar(k, v)}})
    return out


def hilfsrahmen(f):
    # Klassenrumpf und Comprehensions sind eigene Rahmen, die Lernende nicht als Aufruf sehen sollen
    klassenrumpf = not f.f_code.co_flags & 1 and f.f_code.co_name != '<module>'  # CO_OPTIMIZED fehlt nur Modul und Klassenrumpf
    return klassenrumpf or f.f_code.co_name in ('<listcomp>', '<dictcomp>', '<setcomp>', '<genexpr>')


def spur(f, ereignis, arg):
    if not eigen(f):
        return None
    if ereignis == 'line' and not hilfsrahmen(f):
        if len(schritte) >= MAX:
            raise Genug()
        s = {'line': f.f_lineno, 'frames': rahmen(f), 'out': ausgabe.getvalue()}
        if offen['exc']:
            s['exc'] = offen['exc']
            offen['exc'] = None
        schritte.append(s)
    elif ereignis == 'exception' and offen['exc'] is None and not hilfsrahmen(f):
        offen['exc'] = zeigen(arg[1])
    return spur


fehler = None
echt = sys.stdout
sys.stdout = ausgabe
sys.settrace(spur)
modul = {'__name__': '__main__'}
try:
    exec(code, modul)
except Genug:
    fehler = 'Abbruch nach ' + str(MAX) + ' Schritten (Endlosschleife?)'
except BaseException as e:
    fehler = zeigen(e)
finally:
    sys.settrace(None)
    sys.stdout = echt
# Schlusszustand (Zeile 0 gibt es nicht): Zustand nach der letzten Zeile
if fehler is None:
    schritte.append({'line': 0, 'frames': [{'method': 'main', 'cls': 'Main', 'vars': {k: zeigen(v) for k, v in modul.items() if sichtbar(k, v)}}], 'out': ausgabe.getvalue()})
erg = {'steps': schritte, 'out': ausgabe.getvalue()}
if fehler:
    erg['error'] = fehler
sys.stdout.reconfigure(encoding='utf-8')
print(json.dumps(erg, ensure_ascii=False))
