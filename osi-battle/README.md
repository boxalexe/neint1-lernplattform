# Diagnose-Arena — Netz-Hydra & RAID-Golem

Zwei Lernbosse in einer Engine. Reines HTML, CSS und JavaScript ohne Build-Schritt,
ohne Abhängigkeiten, ohne Server. Ordner kopieren, Datei öffnen, fertig.

## Einbau

Den Ordner `osi-battle/` komplett in das Projekt der Layer 8 Academy legen, zum
Beispiel nach `public/osi-battle/` oder direkt in den Web-Root. Danach von der
Academy aus verlinken:

```html
<a href="osi-battle/index.html">Diagnose-Arena öffnen</a>
```

Der Rückweg ist bereits eingebaut: die Bossauswahl hat unten einen Link auf
`../index.html`. Liegt `osi-battle/` nicht direkt unter dem Web-Root der
Academy, ist dieser Pfad in `index.html` und `mobile.html` anzupassen — es ist
in beiden Dateien genau eine Zeile mit `class="diff-back"` und `href`.

Zwei Einstiegspunkte, beide mit identischer Spiellogik und identischen Fragen:

| Datei | Für | Unterschied |
|---|---|---|
| `index.html` | Desktop und Tablet | Bühne gross, Textfeld als Streifen unten |
| `mobile.html` | Smartphone | Bühne oben, Bedienbereich darunter über die volle Höhe |

Wer automatisch weiterleiten will, hängt das in die eigene Academy-Seite, nicht
in die beiden Dateien:

```html
<a id="arena" href="osi-battle/index.html">Diagnose-Arena</a>
<script>
  if (matchMedia("(max-width: 820px)").matches) {
    document.getElementById("arena").href = "osi-battle/mobile.html";
  }
</script>
```

Lokal testen ohne Webserver geht per Doppelklick. In VS Code ist die Erweiterung
Live Server bequemer, weil sie beim Speichern neu lädt.

## Dateien

```
osi-battle/
├── index.html          Browser-Edition
├── mobile.html         Smartphone-Edition, identisch bis auf zwei Zeilen im Kopf
├── css/
│   ├── style.css       Grundgestaltung, Hydra, gemeinsame Bedienelemente
│   ├── golem.css       RAID-Golem und Bossauswahl
│   └── mobile.css      Nur von mobile.html geladen, überschreibt Layout für Telefone
└── js/
    ├── data.js         84 Hydra-Fragen, 12 je OSI-Schicht
    ├── hydra-art.js    Drachengrafik als SVG
    ├── golem-data.js   24 Golem-Fragen, Stufenkette, Schwierigkeitstabelle
    ├── golem-art.js    Golem als Flusszeichnung
    ├── animations.js   Gemeinsame Effekt-Hilfen
    ├── ui.js           Gemeinsame Oberfläche für beide Bosse
    ├── golem-ui.js     Golem-Darstellung, Treffer, Degradation
    ├── game.js         Hydra-Spiellogik
    ├── golem-game.js   Golem-Spiellogik
    └── boot.js         Bossauswahl, Schwierigkeit, Neustart
```

Die Ladereihenfolge der Skripte steht in beiden HTML-Dateien und ist bindend:
`boot.js` muss zuletzt kommen, weil es beim `DOMContentLoaded` alle anderen
Objekte verdrahtet.

## Ablauf

```
Bossauswahl  ->  Schwierigkeit  ->  Kampf
     ^                                |
     +---- "Neu" (mit Rückfrage) -----+
```

**Netz-Hydra.** Sieben Köpfe, sieben OSI-Schichten. Symptome lesen, Ursache
bestimmen, richtige Schicht treffen. Je nach Stufe 25, 35 oder 45 richtige
Diagnosen.

**RAID-Golem.** Feste Kette RAID 50 → 10 → 6 → 5 → 4 → 1 → 0 → Controller.
Gefragt ist nicht, was kaputtgeht, sondern welche Admin-Entscheidung den
Verbund zerstört. Jede richtige Antwort ist eine Fehlhandlung. Bricht eine
Stufe, degradiert der Golem sichtbar auf die nächste. Je nach Stufe 8, 15
oder 16 Angriffe.

Weil diese Umkehrung der Gewohnheit widerspricht, wird sie zweimal genannt:
als Hinweisfeld auf dem Schwierigkeitsschirm und als eigene Zeile direkt vor
der ersten Frage. Beides kommt aus `GOLEM_BOSS.regel` und `regelKurz` in
`js/golem-data.js`.

Der Golem beschriftet zwei Dinge anders als die Hydra: die Liste heisst
„Symptome / Informationen", weil es Eckdaten des Verbunds sind und keine
Krankheitszeichen, und ein Fehlgriff meldet „Suche die Katastrophe!" statt
„Fehldiagnose!". Gesetzt wird das in `boot.js` über `UI.setBossTexte`.

## Fragen ergänzen

**Hydra:** Neuen Eintrag ans Ende von `QUESTIONS` in `js/data.js`, `headId` auf
`l1` bis `l7` setzen.

**Golem:** Neuen Eintrag ans Ende von `GOLEM_QUESTIONS` in `js/golem-data.js`.
`stageId` bindet die Frage hart an ihre Stufe, ein stufenfremder Angriff ist
dadurch ausgeschlossen. `hit` listet die Plattenindizes, die der Eingriff
zerstört, gezählt von links über alle Gruppen der Stufe, oder `"alle"`.

Format beider Bosse:

```js
{
  id: "…", headId: "l3",            // Golem: stageId: "raid5", hit: [0, 4]
  beat: "…",                         // Einleitung in der Sprechblase
  symptoms: ["…", "…", "…", "…"],    // genau vier
  q: "Wähle deinen Angriff",         // bei beiden Bossen immer gleich
  options: [                         // genau vier, genau eine mit ok: true
    { t: "…", ok: true },
    { t: "…", ok: false },
    { t: "…", ok: false },
    { t: "…", ok: false },
  ],
  strike: "…",                       // Wirkung des Treffers
  e: "…",                            // fachliche Erklärung
  merksatz: "…",
}
```

### Grenzen, die das Layout trägt

Das Textfeld hat feste Höhe und schneidet Überlänge ab. Diese Werte sind der
Rahmen, in dem die Darstellung sicher hält:

| Feld | Maximum |
|---|---|
| `q` | 20 Zeichen, praktisch immer „Wähle deinen Angriff" |
| Antwort | 40 Zeichen |
| Symptom | 98 Zeichen |
| `beat` | 110 Zeichen |
| `strike` | 109 Zeichen |
| `e` | 374 Zeichen |
| `merksatz` | 144 Zeichen |

Zusätzlich gilt für die Antworten: die Längenspreizung zwischen längster und
kürzester Option bleibt unter 15 Zeichen, und die richtige Antwort ist nie
allein die längste. Sonst rät man über die Länge statt über die Symptome.

Die Reihenfolge der Antworten wird bei jeder Anzeige neu gemischt, die richtige
sitzt also nicht mehr auf A. Gemischt wird ausschliesslich die Darstellung:
`onSelect` bekommt weiterhin den Index aus `options`, die Spiellogik merkt von
der Mischung nichts. In den Quelldateien darf die richtige Antwort deshalb
ruhig an erster Stelle stehen, das macht das Gegenlesen leichter.

## Fallstrick beim Anpassen der Smartphone-Ansicht

`padding-bottom` wird in Flex- und Grid-Scrollcontainern von Chrome und Safari
nicht zur scrollbaren Fläche gezählt. Das letzte Element im Block ist dann
unerreichbar, obwohl darüber alles scrollt. Deshalb haben in `mobile.css`
weder `.interaction-zone > section` noch `.difficulty-screen` einen unteren
Innenabstand: der Platz kommt aus `section::after` beziehungsweise aus
`padding-bottom` am `.diff-panel`, also aus dem Inhalt. Wer dort wieder
`padding-bottom` auf den Scroller setzt, schneidet die unterste Antwort und
den Zurück-Knopf ab.

Aus demselben Grund darf im Frageblock nichts auf `height: 100%` oder
`align-content: center` stehen. Die Breitbild-Fassung tut das, damit Symptome
und Antworten die Zone füllen; auf dem Telefon verhindert es, dass der Block
überhaupt überläuft, und damit auch das Scrollen.

## Bekannte Grenzen

Die Golem-Zeichnung ist auf 1400 × 830 ausgelegt und skaliert auf dem Telefon
stark herunter. Sie bleibt lesbar, die Plattenbeschriftungen sind im Hochformat
aber klein. Wer das ändern will, setzt in `mobile.css` `--bühne-h` höher, dann
wächst die Zeichnung und der Textbereich schrumpft entsprechend.
