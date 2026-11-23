// Zeichnet den Ablauf eines Java-Programms Zeile für Zeile auf (Java Debug Interface).
// Aufruf: java Tracer <classpath> <Hauptklasse> <maxSchritte>
// Ausgabe (stdout, JSON): {"steps":[{"line":n,"frames":[{"method":"main","vars":{"i":"0"}}],"out":"..."}],"error":"..."}
// Jeder Schritt ist der Zustand, bevor die Zeile `line` ausgeführt wird. frames: äußerste Methode zuerst.
// Erfasst werden nur Methoden der Hauptklasse und ihrer inneren Klassen; Bibliotheksaufrufe werden übersprungen.
import com.sun.jdi.*;
import com.sun.jdi.connect.*;
import com.sun.jdi.event.*;
import com.sun.jdi.request.*;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class Tracer {
    static final StringBuilder json = new StringBuilder();
    static final ByteArrayOutputStream ausgabe = new ByteArrayOutputStream();
    static InputStream stdout, stderr;
    static String hauptklasse;
    static int schritte = 0;

    public static void main(String[] a) throws Exception {
        String cp = a[0];
        hauptklasse = a[1];
        int max = Integer.parseInt(a[2]);
        LaunchingConnector lc = Bootstrap.virtualMachineManager().defaultConnector();
        Map<String, Connector.Argument> args = lc.defaultArguments();
        args.get("main").setValue(hauptklasse);
        args.get("options").setValue("-cp \"" + cp + "\" -Dfile.encoding=UTF-8");
        VirtualMachine vm = lc.launch(args);
        stdout = vm.process().getInputStream();
        stderr = vm.process().getErrorStream();
        EventRequestManager erm = vm.eventRequestManager();
        ClassPrepareRequest cpr = erm.createClassPrepareRequest();
        cpr.addClassFilter(hauptklasse);
        cpr.enable();
        json.append("{\"steps\":[");
        String fehler = null;
        boolean ende = false;
        while (!ende) {
            EventSet es = vm.eventQueue().remove();
            for (Event e : es) {
                if (e instanceof ClassPrepareEvent cpe) {
                    Method m = cpe.referenceType().methodsByName("main").get(0);
                    BreakpointRequest bp = erm.createBreakpointRequest(m.location());
                    bp.enable();
                    ExceptionRequest ex = erm.createExceptionRequest(null, false, true);
                    ex.enable();
                } else if (e instanceof BreakpointEvent be) {
                    StepRequest sr = erm.createStepRequest(be.thread(), StepRequest.STEP_LINE, StepRequest.STEP_INTO);
                    // Bibliotheken ausschließen: JDWP läuft dort durch, statt den Schritt zu beenden
                    for (String p : new String[] { "java.*", "javax.*", "jdk.*", "sun.*", "com.sun.*" }) sr.addClassExclusionFilter(p);
                    sr.enable();
                    aufzeichnen(be.thread(), be.location());
                } else if (e instanceof StepEvent se) {
                    if (++schritte > max) { fehler = "Mehr als " + max + " Schritte"; vm.exit(1); ende = true; break; }
                    aufzeichnen(se.thread(), se.location());
                } else if (e instanceof ExceptionEvent xe) {
                    fehler = xe.exception().referenceType().name().replaceAll("^java\\.lang\\.", "");
                } else if (e instanceof VMDeathEvent || e instanceof VMDisconnectEvent) {
                    ende = true;
                }
            }
            if (!ende) es.resume();
        }
        lesen();
        json.append("],\"out\":").append(str(ausgabe.toString(StandardCharsets.UTF_8)));
        String err = new String(stderr.readAllBytes(), StandardCharsets.UTF_8).trim();
        if (fehler != null || !err.isEmpty()) json.append(",\"error\":").append(str(fehler != null ? fehler : err));
        json.append("}");
        System.out.print(json);
    }

    static void lesen() throws IOException {
        while (stdout.available() > 0) ausgabe.write(stdout.read());
    }

    static void aufzeichnen(ThreadReference t, Location loc) throws Exception {
        lesen();
        if (json.charAt(json.length() - 1) != '[') json.append(',');
        json.append("{\"line\":").append(loc.lineNumber()).append(",\"frames\":[");
        List<StackFrame> fr = new ArrayList<>(t.frames());
        Collections.reverse(fr);
        boolean erster = true;
        for (StackFrame f : fr) {
            String typ = f.location().declaringType().name();
            if (bibliothek(typ)) continue; // nur eigene Klassen (Main, Artikel, …), nicht Javas eigene
            if (!erster) json.append(',');
            erster = false;
            json.append("{\"method\":").append(str(f.location().method().name())).append(",\"cls\":").append(str(typ.replaceAll(".*[.$]", ""))).append(",\"vars\":{");
            boolean ersteVar = true;
            List<LocalVariable> vars;
            try { vars = f.visibleVariables(); } catch (AbsentInformationException x) { vars = List.of(); }
            Map<LocalVariable, Value> werte = f.getValues(vars);
            for (LocalVariable v : vars) {
                if (v.name().startsWith("__") || v.name().equals("args")) continue;
                if (!ersteVar) json.append(',');
                ersteVar = false;
                json.append(str(v.name())).append(':').append(str(zeigen(werte.get(v), 0)));
            }
            ObjectReference self = f.thisObject();
            if (self != null) {
                if (!ersteVar) json.append(',');
                json.append("\"this\":").append(str(zeigen(self, 0)));
            }
            json.append("}}");
        }
        json.append("],\"out\":").append(str(ausgabe.toString(StandardCharsets.UTF_8))).append('}');
    }

    // Werte so darstellen, wie man sie im Java-Quelltext schreiben würde
    static String zeigen(Value v, int tiefe) {
        if (v == null) return "null";
        if (v instanceof StringReference s) return "\"" + s.value() + "\"";
        if (v instanceof CharValue c) return "'" + c.value() + "'";
        if (v instanceof PrimitiveValue p) return p.toString();
        if (tiefe > 2) return "…";
        if (v instanceof ArrayReference arr) {
            StringJoiner sj = new StringJoiner(", ", "[", "]");
            for (Value x : arr.getValues()) sj.add(zeigen(x, tiefe + 1));
            return sj.toString();
        }
        ObjectReference o = (ObjectReference) v;
        ReferenceType t = o.referenceType();
        String name = t.name();
        if (name.equals("java.util.ArrayList")) {
            int size = ((IntegerValue) o.getValue(t.fieldByName("size"))).value();
            ArrayReference data = (ArrayReference) o.getValue(t.fieldByName("elementData"));
            StringJoiner sj = new StringJoiner(", ", "[", "]");
            for (int i = 0; i < size; i++) sj.add(zeigen(data.getValue(i), tiefe + 1));
            return sj.toString();
        }
        if (name.startsWith("java.lang.")) { // Wrapper wie Integer, Double
            Field f = t.fieldByName("value");
            if (f != null) return zeigen(o.getValue(f), tiefe);
        }
        // Exceptions wie in Javas eigener Meldung: Typ und Nachricht, ohne Stacktrace-Felder
        for (ClassType c = t instanceof ClassType ct ? ct : null; c != null; c = c.superclass()) {
            if (!c.name().equals("java.lang.Throwable")) continue;
            Value msg = o.getValue(c.fieldByName("detailMessage"));
            return name.replaceAll(".*[.$]", "") + (msg instanceof StringReference s ? ": " + s.value() : "");
        }
        // Eigene Objekte mit Nummer: Zeigen zwei Variablen auf Artikel@1, ist es dasselbe Objekt (Referenz, nicht Kopie)
        StringJoiner sj = new StringJoiner(", ", name.replaceAll(".*[.$]", "") + "@" + nummer(o) + "{", "}");
        for (Field f : t.allFields()) if (!f.isStatic()) sj.add(f.name() + "=" + zeigen(o.getValue(f), tiefe + 1));
        return sj.toString();
    }

    static final Map<Long, Integer> nummern = new HashMap<>();
    static int nummer(ObjectReference o) { return nummern.computeIfAbsent(o.uniqueID(), k -> nummern.size() + 1); }

    static boolean bibliothek(String typ) {
        for (String p : new String[] { "java.", "javax.", "jdk.", "sun.", "com.sun." }) if (typ.startsWith(p)) return true;
        return false;
    }

    static String str(String s) {
        StringBuilder b = new StringBuilder("\"");
        for (char c : s.toCharArray()) {
            switch (c) {
                case '"' -> b.append("\\\"");
                case '\\' -> b.append("\\\\");
                case '\n' -> b.append("\\n");
                case '\r' -> { }
                case '\t' -> b.append("\\t");
                default -> { if (c < 0x20) b.append(String.format("\\u%04x", (int) c)); else b.append(c); }
            }
        }
        return b.append('"').toString();
    }
}
