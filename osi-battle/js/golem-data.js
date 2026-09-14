/*
 * golem-data.js — RAID-GOLEM: absteigende Kette von Verbundstufen.
 *
 * AUFBAUPRINZIP
 *   Der Golem ist kein Sprite, sondern eine Flusszeichnung: Controller,
 *   Streifen, Gruppen, Platten. Jede Stufe hat ihre eigene Geometrie und
 *   ihre eigenen Fragen. Bricht eine Stufe, degradiert der Golem auf die
 *   nächst kleinere und tut dabei jedes Mal etwas anderes.
 *
 * HARTE REGEL
 *   Fragen sind über stageId fest an ihre Stufe gebunden. Es kann niemals
 *   eine RAID-50-Frage bei RAID-Golem 0 gezogen werden.
 *
 * WEGGELASSEN: RAID 20.
 *   RAID 2 ist Bit-Level-Striping mit Hamming-Code und wurde nie
 *   kommerziell gebaut. Ein Stripe darüber existiert nur auf dem Papier.
 *
 * GOLDENE REGEL für die Optionen (wie bei der Hydra):
 *   - genau 4 Optionen, genau eine richtig
 *   - alle vier nach demselben Muster: ein konkreter Eingriff
 *   - ähnliche Länge, keine Klammern, keine Zusatzerklärungen
 *   - die richtige Antwort ist nie die längste
 *   - die Lösung ergibt sich ausschließlich aus den Symptomen
 *
 * DIDAKTIK: Der Angriff ist der Fehler. Gefragt wird immer, welcher
 * einzelne Eingriff den Verbund bricht. Drei Optionen überlebt er, und
 * genau dieses Ueberleben beweist die Redundanzregel. Der Merksatz dreht
 * die Handlung anschließend in eine Grenze zurück.
 */

/* Einheitlicher Schaden, wie bei der Hydra. Stufen-HP sind Vielfache davon. */
const GOLEM_HIT_DAMAGE = 30;

/* ==========================================================
   STUFEN
   disks: flache Liste von links nach rechts, über alle Gruppen hinweg.
          Der Index in dieser Liste ist das, worauf "hit" in den Fragen zeigt.
   parity: "rotierend"  -> Parität wandert über alle Platten der Gruppe
           "rotierend2" -> zwei wandernde Paritäten, P und Q
           "fest"       -> eine feste Paritätsplatte, Flaschenhals
           null         -> keine Parität
   stripe: "gruppen" -> Streifen über die Gruppen hinweg
           "platten" -> Streifen direkt über die Platten
           null      -> kein Streifen
   ========================================================== */
const GOLEM_STAGES = [
  {
    id: "raid50",
    label: "RAID 50",
    name: "RAID-GOLEM 50",
    toleranz: "1 Platte je Gruppe",
    stripe: "gruppen",
    mirror: false,
    parity: "rotierend",
    scale: 1.0,
    gruppen: [
      { name: "GRUPPE A", disks: ["A1", "A2", "A3", "A4"] },
      { name: "GRUPPE B", disks: ["B1", "B2", "B3", "B4"] },
    ],
    beschreibung:
      "Acht Platten in zwei Gruppen. Jede Gruppe rechnet ihre eigene Parität, ein Streifen bindet beide zusammen.",
    next: "raid10",
    degradation: {
      name: "GRUPPENKOLLAPS",
      text:
        "Die Gruppe reißt aus dem Streifen. Die Paritätsrechnung verpufft, der Rest ordnet sich paarweise neu.",
    },
  },
  {
    id: "raid10",
    label: "RAID 10",
    name: "RAID-GOLEM 10",
    toleranz: "1 Platte je Spiegelpaar",
    stripe: "gruppen",
    mirror: true,
    parity: null,
    scale: 0.94,
    gruppen: [
      { name: "PAAR 1", disks: ["A1", "A1"] },
      { name: "PAAR 2", disks: ["A2", "A2"] },
      { name: "PAAR 3", disks: ["A3", "A3"] },
    ],
    beschreibung:
      "Drei Spiegelpaare, die Daten werden über alle Paare verteilt. Fallen in einem Paar beide Platten aus, ist der Verbund verloren.",
    next: "raid6",
    degradation: {
      name: "SPIEGELBRUCH",
      text:
        "Die Paare zerfallen. Keine Kopien mehr, dafür glühen zwei berechnete Blöcke auf: P und Q.",
    },
  },
  {
    id: "raid6",
    label: "RAID 6",
    name: "RAID-GOLEM 6",
    toleranz: "2 beliebige Platten",
    stripe: "platten",
    mirror: false,
    parity: "rotierend2",
    scale: 0.88,
    gruppen: [{ name: "VERBUND", disks: ["A1", "A2", "A3", "A4", "A5", "A6"] }],
    beschreibung:
      "Sechs Platten, zwei wandernde Paritäten. Zwei Ausfälle trägt der Verbund, gerechnet wird doppelt.",
    next: "raid5",
    degradation: {
      name: "Q-VERLUST",
      text:
        "Die zweite Parität zerbröselt. Was eben zwei Ausfälle trug, trägt jetzt genau einen.",
    },
  },
  {
    id: "raid5",
    label: "RAID 5",
    name: "RAID-GOLEM 5",
    toleranz: "1 beliebige Platte",
    stripe: "platten",
    mirror: false,
    parity: "rotierend",
    scale: 0.82,
    gruppen: [{ name: "VERBUND", disks: ["A1", "A2", "A3", "A4", "A5"] }],
    beschreibung:
      "Fünf Platten, eine wandernde Parität. Ein Ausfall ist verkraftbar, der zweite nicht.",
    next: "raid4",
    degradation: {
      name: "PARITAETSZENTRALISIERUNG",
      text:
        "Die wandernde Parität zieht sich zusammen und setzt sich auf eine einzige Platte.",
    },
  },
  {
    id: "raid4",
    label: "RAID 4",
    name: "RAID-GOLEM 4",
    toleranz: "1 beliebige Platte",
    stripe: "platten",
    mirror: false,
    parity: "fest",
    scale: 0.74,
    gruppen: [{ name: "VERBUND", disks: ["A1", "A2", "A3", "P"] }],
    beschreibung:
      "Drei Datenplatten und eine feste Paritätsplatte. Jeder Schreibvorgang muss durch diese eine Platte.",
    next: "raid1",
    degradation: {
      name: "PARITAETSABWURF",
      text:
        "Die verbrauchte Paritätsplatte fällt ab. Der Rest kann sich nur noch selbst kopieren.",
    },
  },
  {
    id: "raid1",
    label: "RAID 1",
    name: "RAID-GOLEM 1",
    toleranz: "1 von 2 Platten",
    stripe: null,
    mirror: true,
    parity: null,
    scale: 0.64,
    gruppen: [{ name: "SPIEGEL", disks: ["A1", "A1"] }],
    beschreibung:
      "Zwei Platten, ein Datenbestand, zweimal vorhanden. Nichts wird verteilt und nichts gerechnet.",
    next: "raid0",
    degradation: {
      name: "SPIEGELVERLUST",
      text:
        "Eine Hälfte zerfällt. Der Rest streift sich auf und steht zum ersten Mal ungeschützt da.",
    },
  },
  {
    id: "raid0",
    label: "RAID 0",
    name: "RAID-GOLEM 0",
    toleranz: "keine",
    stripe: "platten",
    mirror: false,
    parity: null,
    scale: 0.58,
    gruppen: [{ name: "STREIFEN", disks: ["A1", "A2"] }],
    beschreibung:
      "Zwei Platten, reines Streifen. Jeder Block liegt genau einmal, nichts fängt einen Ausfall auf.",
    next: "controller",
    degradation: {
      name: "ZERFALL",
      text:
        "Ein Treffer genügt. Der Streifen reißt, von den Daten bleibt nichts übrig.",
    },
  },
  {
    id: "controller",
    label: "CONTROLLER",
    name: "VERBUNDCONTROLLER",
    toleranz: "keine, niemals doppelt vorhanden",
    stripe: null,
    mirror: false,
    parity: null,
    scale: 0,
    gruppen: [],
    beschreibung:
      "Alle Platten sind hin, doch das Auge brennt weiter. Der Controller stand die ganze Zeit allein da.",
    next: null,
    degradation: {
      name: "AUGE ERLISCHT",
      text:
        "Der letzte einzelne Punkt gibt nach. Mit ihm die Instanz, die wusste, wie alles zusammengehörte.",
    },
  },
];

function getGolemStage(id) {
  return GOLEM_STAGES.find(s => s.id === id);
}

/* ==========================================================
   SCHWIERIGKEIT
   treffer: nötige richtige Antworten JE Stufe
   controllerTreffer: nötige richtige Antworten im Epilog
   ========================================================== */
const GOLEM_DIFFICULTIES = {
  leicht: {
    key: "leicht", label: "LEICHT",
    treffer: 1, controllerTreffer: 1, maxFehler: 6,
    meta: "8 Angriffe",
    desc: "Ein Treffer je Stufe. Bis zu 6 Fehlgriffe erlaubt, bevor der Golem dich unter sich begräbt.",
  },
  mittel: {
    key: "mittel", label: "MITTEL",
    treffer: 2, controllerTreffer: 1, maxFehler: 5,
    meta: "15 Angriffe",
    desc: "Zwei Treffer je Stufe. Bis zu 5 Fehlgriffe erlaubt, die Kette bleibt gleich lang.",
  },
  schwer: {
    key: "schwer", label: "SCHWER",
    treffer: 2, controllerTreffer: 2, maxFehler: 3,
    meta: "16 Angriffe",
    desc: "Zwei Treffer je Stufe, dazu ein doppelter Epilog. Nur 3 Fehlgriffe, jeder wiegt doppelt.",
  },
};

/* ==========================================================
   FRAGEN
   stageId bindet die Frage hart an ihre Stufe.
   hit: Indizes der Platten, die dieser Eingriff zerstört,
        gezählt über die flache Plattenliste der Stufe.
        "alle" trifft den gesamten Verbund.
   ========================================================== */
const GOLEM_QUESTIONS = [
  /* ==================== RAID 50 ==================== */
  {
    id: "r50-1", stageId: "raid50", hit: [0, 1],
    beat: "Zwei Blöcke zu je vier Platten, darüber ein Streifen. Der Golem wirkt unangreifbar.",
    symptoms: [
      "Acht Platten stehen in zwei Gruppen zu je vier",
      "Jede Gruppe berechnet ihre eigene Parität",
      "Ein Streifen verteilt die Daten über beide Gruppen",
      "Beide Gruppen tragen den Bestand gemeinsam",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Zwei Platten aus Gruppe A ziehen", ok: true },
      { t: "Eine Platte aus Gruppe A tauschen", ok: false },
      { t: "Eine Platte aus Gruppe B tauschen", ok: false },
      { t: "Je eine Platte pro Gruppe tauschen", ok: false },
    ],
    strike: "Du greifst zweimal in dieselbe Gruppe. Sie kippt, und der Stripe darüber reißt mit.",
    e: "RAID 50 ist ein Stripe über mehrere RAID-5-Gruppen. Zwei Ausfälle in derselben Gruppe zerstören diese Gruppe vollständig, weil RAID 5 nur einen Ausfall trägt. Mit der Gruppe fällt der übergeordnete Stripe und damit das gesamte RAID 50. Je eine Platte pro Gruppe bleibt dagegen folgenlos.",
    merksatz: "RAID 50 verträgt eine Platte je Gruppe, nicht eine insgesamt.",
  },
  {
    id: "r50-2", stageId: "raid50", hit: "alle",
    beat: "Ein Kabelbaum führt alle acht Platten auf eine einzige Rückwand. Der Golem hält das für Ordnung.",
    symptoms: [
      "Beide Gruppen hängen an einer gemeinsamen Rückwand",
      "Jede Gruppe verkraftet für sich einen Ausfall",
      "Der Streifen bindet beide Gruppen zu einem Bestand",
      "Ein zweites Gehäuse mit eigener Rückwand steht bereit",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Beide Gruppen an eine Backplane hängen", ok: true },
      { t: "Die Gruppen auf zwei Backplanes legen", ok: false },
      { t: "Eine Ersatzbackplane kalt bereithalten", ok: false },
      { t: "Eine Platte in Gruppe B tauschen", ok: false },
    ],
    strike: "Du legst beide Gruppen auf eine Backplane. Ihr Defekt löscht beide zugleich.",
    e: "Redundanz wirkt nur über getrennte Fehlerdomänen. Hängen beide Gruppen an derselben Rückwand, nimmt ein Defekt dort alle acht Platten gleichzeitig mit, egal wie sauber die Gruppen logisch getrennt sind.",
    merksatz: "Zwei Gruppen an einer Rückwand sind in Wahrheit eine Gruppe.",
  },
  {
    id: "r50-3", stageId: "raid50", hit: [4, 5],
    beat: "In der unteren Gruppe läuft ein Wiederaufbau. Der Golem hält still, während er sich flickt.",
    symptoms: [
      "In Gruppe B ist eine Platte ausgefallen",
      "Der Wiederaufbau in Gruppe B läuft noch",
      "Die übrigen Platten der Gruppe sind gleich alt",
      "Gruppe A meldet keinerlei Fehler",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Im Rebuild in Gruppe B greifen", ok: true },
      { t: "Im Rebuild Gruppe A anfassen", ok: false },
      { t: "Den Rebuild niedrig priorisieren", ok: false },
      { t: "Den Rebuild nachts durchlaufen lassen", ok: false },
    ],
    strike: "Du greifst in den laufenden Rebuild. Gruppe B bricht weg, bevor er fertig ist.",
    e: "Die RAID-5-Gruppe B ist während des Rebuilds degradiert: Sie läuft bereits ohne Redundanz und verträgt keinen zweiten Ausfall mehr. Fällt dort noch eine Platte, ist die ganze Gruppe verloren und mit ihr das RAID 50. Gruppe A ist intakt und trägt einen Ausfall.",
    merksatz: "Während des Rebuilds ist die betroffene Gruppe ohne Netz.",
  },

  /* ==================== RAID 10 ==================== */
  {
    id: "r10-1", stageId: "raid10", hit: [0, 1],
    beat: "Der Golem ist schmaler geworden. Sechs Platten als drei Paare, jede Last doppelt getragen.",
    symptoms: [
      "Sechs Platten stehen als drei Spiegelpaare",
      "Ein Streifen verteilt die Daten über alle Paare",
      "Jedes Paar hält zwei völlig gleiche Kopien",
      "Der Verbund läuft mit voller Schreibleistung",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Beide Platten aus Paar 2 ziehen", ok: true },
      { t: "Eine Platte aus Paar 2 tauschen", ok: false },
      { t: "Je eine Platte in zwei Paaren tauschen", ok: false },
      { t: "Je eine Platte in allen Paaren tauschen", ok: false },
    ],
    strike: "Du räumst ein ganzes Paar ab. Der Verbund verliert seine Mitte und zerfällt.",
    e: "RAID 10 kann drei Platten verlieren, nämlich eine je Paar, und scheitert doch an zweien. Entscheidend ist nie die Anzahl, sondern ob beide Hälften desselben Paars betroffen sind.",
    merksatz: "Bei RAID 10 zählt nicht die Zahl der Ausfälle, sondern das Paar.",
  },
  {
    id: "r10-2", stageId: "raid10", hit: [2, 3],
    beat: "Am mittleren Einschub ist eine Anzeige erloschen. Der Golem wartet auf deinen Griff.",
    symptoms: [
      "In Paar 2 meldet eine Platte häufige Lesefehler",
      "Die Anzeige an einem Einschub ist erloschen",
      "Die Beschriftung der Einschübe wurde nie geprüft",
      "Paar 1 und Paar 3 arbeiten fehlerfrei",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Nach Beschriftung blind ziehen", ok: true },
      { t: "Nach Seriennummer gezielt ziehen", ok: false },
      { t: "Erst den Verbundstatus abfragen", ok: false },
      { t: "Erst die Einschübe neu beschriften", ok: false },
    ],
    strike: "Du ziehst blind nach Aufkleber und erwischst die gesunde Hälfte. Das Paar verstummt.",
    e: "In Paar 2 trägt nur noch eine Platte verlässliche Daten. Wird genau diese gezogen, bleibt eine fehlerhafte Platte allein zurück und das Paar ist verloren. In Paar 1 sind beide Hälften gesund, dort ist eine Entnahme folgenlos.",
    merksatz: "Vor dem Ziehen die Seriennummer prüfen, nicht die Beschriftung.",
  },
  {
    id: "r10-3", stageId: "raid10", hit: "alle",
    beat: "Der Golem spiegelt jede Bewegung sofort. Auch dann, wenn die Bewegung ein Fehler ist.",
    symptoms: [
      "Der Verbund spiegelt jeden Schreibvorgang sofort",
      "Eine Freigabe hält die einzige Fassung der Daten",
      "Ein Sicherungslauf dafür existiert nicht",
      "Alle sechs Platten sind körperlich einwandfrei",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Den Spiegel als Sicherung ansehen", ok: true },
      { t: "Zusätzlich auf Band sichern lassen", ok: false },
      { t: "Eine Platte aus Paar 3 tauschen", ok: false },
      { t: "Eine zweite Freigabe anlegen", ok: false },
    ],
    strike: "Du verzichtest auf ein Backup. Ein Löschbefehl räumt beide Kopien zugleich.",
    e: "Spiegelung schützt gegen den Ausfall von Geräten, nicht gegen Befehle. Ein Löschvorgang, ein Verschlüsselungstrojaner oder ein falsches Skript werden mitgespiegelt, weil der Verbund nicht unterscheiden kann, ob ein Schreibvorgang gewollt war.",
    merksatz: "Spiegelung kopiert auch das Löschen. RAID ersetzt keine Sicherung.",
  },

  /* ==================== RAID 6 ==================== */
  {
    id: "r6-1", stageId: "raid6", hit: [0, 1, 2],
    beat: "Zwei Platten sind dunkel, der Golem rechnet gegen den Verlust an. Knapp, aber es reicht.",
    symptoms: [
      "Sechs Platten, zwei davon tragen Parität",
      "Zwei Platten sind bereits ausgefallen",
      "Der Wiederaufbau hat soeben begonnen",
      "Alle Platten stammen aus einer Lieferung",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Im Rebuild eine dritte Platte ziehen", ok: true },
      { t: "Den Rebuild ungestört zu Ende fahren", ok: false },
      { t: "Die Schreiblast im Rebuild senken", ok: false },
      { t: "Vor dem Rebuild Ersatz bestellen", ok: false },
    ],
    strike: "Du ziehst mitten im Rebuild die dritte Platte. P und Q sind verbraucht.",
    e: "Doppelte Parität heißt: zwei fehlende Blöcke lassen sich aus P und Q zurückrechnen. Fehlt ein dritter, stehen zwei Gleichungen gegen drei Unbekannte, und der Bestand ist nicht wiederherstellbar. Mehr Last verlangsamt nur.",
    merksatz: "RAID 6 trägt zwei Ausfälle. Der dritte ist das Ende.",
  },
  {
    id: "r6-2", stageId: "raid6", hit: [0, 3, 5],
    beat: "Der Golem steht seit Jahren ruhig. Was in ihm schwärt, hat nie jemand angesehen.",
    symptoms: [
      "Der Verbund läuft seit vier Jahren ohne Vorfall",
      "Eine regelmäßige Oberflächenprüfung ist aktiv",
      "Der Bestand besteht fast nur aus Archivdaten",
      "Gelesen wird im Alltag ein kleiner Teil davon",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Das Scrubbing dauerhaft abschalten", ok: true },
      { t: "Das Scrubbing aufs Wochenende legen", ok: false },
      { t: "Das Scrubbing niedrig priorisieren", ok: false },
      { t: "Das Scrubbing quartalsweise ergänzen", ok: false },
    ],
    strike: "Du schaltest das Scrubbing ab. Was still verrottet, meldet sich erst im Rebuild.",
    e: "Archivdaten werden selten gelesen, deshalb bleiben unkorrigierbare Lesefehler unbemerkt liegen. Erst der Rebuild liest jede Platte vollständig und fördert alle angesammelten Fehler auf einmal zutage, genau dann, wenn die Parität schon gebunden ist.",
    merksatz: "Ohne Scrubbing sammeln sich stille Lesefehler bis zum Rebuild.",
  },
  {
    id: "r6-3", stageId: "raid6", hit: "alle",
    beat: "Der Golem soll wachsen. Zwei neue Platten liegen bereit, an den Rückweg dachte niemand.",
    symptoms: [
      "Der Verbund soll um zwei Platten wachsen",
      "Die Erweiterung schreibt alle Streifen neu",
      "Eine Sicherung der Daten existiert nicht",
      "Die Anlage hängt an keiner USV",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Ohne Sicherung reshapen", ok: true },
      { t: "Erst sichern, dann reshapen", ok: false },
      { t: "Erst die USV anschließen", ok: false },
      { t: "In der Randzeit reshapen", ok: false },
    ],
    strike: "Du startest den Umbau ohne Rückweg. Mitten darin fällt der Strom.",
    e: "Eine Erweiterung schreibt jeden Streifen neu und lässt den Verbund stundenlang in einem Zwischenzustand. Ein Abbruch darin hinterlässt eine halb umgebaute Struktur, die kein Controller sicher zusammensetzen kann. Redundanz hilft dort nicht.",
    merksatz: "Eine Reshape schreibt alles neu. Ohne Sicherung ist sie ein Wagnis.",
  },

  /* ==================== RAID 5 ==================== */
  {
    id: "r5-1", stageId: "raid5", hit: [0, 4],
    beat: "Nur eine Parität, aber gewaltige Platten. Der Golem hält das für Stärke.",
    symptoms: [
      "Ein Verbund mit einfacher Parität ist geplant",
      "Der Rebuild liest alle Restplatten vollständig",
      "Hersteller nennen eine Lesefehlerrate je Menge",
      "Ein Verbund mit doppelter Parität wäre möglich",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "RAID 5 aus 16-TB-Platten bauen", ok: true },
      { t: "RAID 5 aus 2-TB-Platten bauen", ok: false },
      { t: "RAID 6 statt RAID 5 bauen", ok: false },
      { t: "Hot Spare im Gehäuse fest einplanen", ok: false },
    ],
    strike: "Du baust RAID 5 aus Riesenplatten. Ein einziger Lesefehler kippt den Rebuild.",
    e: "Je größer die Platten, desto mehr Daten muss ein Rebuild fehlerfrei lesen. Bei einfacher Parität gibt es keine Reserve: Ein unkorrigierbarer Lesefehler auf einer Restplatte bricht den Wiederaufbau ab. Doppelte Parität oder kleinere Platten senken das Risiko.",
    merksatz: "Einfache Parität und sehr große Platten machen den Rebuild zum Risiko.",
  },
  {
    id: "r5-2", stageId: "raid5", hit: [1, 3],
    beat: "Eine bernsteinfarbene Leuchte blinkt seit drei Wochen. Alle haben sich daran gewöhnt.",
    symptoms: [
      "Der Verbund läuft seit drei Wochen mit vier Platten",
      "Eine Warnleuchte am Einschub blinkt bernsteinfarben",
      "Die Leistung ist seither spürbar eingebrochen",
      "Eine Ersatzplatte liegt seit drei Wochen daneben",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Warnung ignorieren, nicht tauschen", ok: true },
      { t: "Sofort tauschen und rebuilden", ok: false },
      { t: "Vor dem Plattentausch sichern", ok: false },
      { t: "Den Verbundstatus regelmäßig auslesen", ok: false },
    ],
    strike: "Du ignorierst die Warnung wochenlang. Die nächste Platte gibt nach, ohne Parität.",
    e: "Ein entwerteter Verbund hat seine Redundanz bereits aufgebraucht: Er rechnet die fehlende Platte aus der Parität zurück und steht damit auf dem Schutzniveau von RAID 0. Jeder weitere Tag ist kein Betrieb, sondern eine Frist.",
    merksatz: "Degraded ist kein Betriebszustand, sondern eine Frist.",
  },
  {
    id: "r5-3", stageId: "raid5", hit: "alle",
    beat: "Fünf gleiche Laufwerke, gleiche Charge, gleiche Last. Nenne es nicht Gleichmaß.",
    symptoms: [
      "Fünf gleiche SSDs aus einer Charge bilden den Verbund",
      "Der Streifen verteilt die Schreiblast gleichmäßig",
      "Alle SSDs zeigen denselben Abnutzungsgrad",
      "Die Abnutzung nähert sich der Herstellergrenze",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Alle SSDs bis zum Ende fahren", ok: true },
      { t: "SSDs versetzt vorzeitig tauschen", ok: false },
      { t: "Die Abnutzungswerte überwachen", ok: false },
      { t: "Die Schreiblast umverteilen", ok: false },
    ],
    strike: "Du fährst alle SSDs bis zum Ende. Sie erreichen ihre Grenze fast zugleich.",
    e: "Redundanz setzt voraus, dass Ausfälle unabhängig eintreten. Gleiche Charge, gleiches Alter und gleichmäßig verteilte Schreiblast machen sie abhängig: Die Laufwerke erreichen ihre Verschleißgrenze fast gleichzeitig, und der Rebuild trifft auf ebenso verbrauchte Platten.",
    merksatz: "Gleiche Charge, gleiche Last, gleiches Ende. Ausfälle korrelieren.",
  },

  /* ==================== RAID 4 ==================== */
  {
    id: "r4-1", stageId: "raid4", hit: [3],
    beat: "Drei Platten langweilen sich, eine glüht. Der Golem hat alles auf einen Punkt gelegt.",
    symptoms: [
      "Vier Platten, die Parität liegt fest auf einer",
      "Jeder Schreibvorgang berührt genau diese Platte",
      "Ihre Auslastung liegt dauerhaft am Anschlag",
      "Die drei Datenplatten sind kaum beschäftigt",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Schreiblast auf RAID 4 legen", ok: true },
      { t: "Leselast auf RAID 4 legen", ok: false },
      { t: "Auf verteilte Parität umstellen", ok: false },
      { t: "Eine Datenplatte ergänzen", ok: false },
    ],
    strike: "Du legst die Schreiblast auf RAID 4. Die Paritätsplatte verschleißt zuerst.",
    e: "Bei fester Parität muss jeder Schreibvorgang diese eine Platte anfassen. Sie ist Flaschenhals für die Leistung und Spitzenreiter beim Verschleiß und fällt statistisch weit vor den Datenplatten aus. Lesen berührt sie nicht, verteilte Parität wäre die Lösung: RAID 5.",
    merksatz: "Feste Paritätsplatte heißt Flaschenhals und Verschleißspitzenreiter.",
  },
  {
    id: "r4-2", stageId: "raid4", hit: [0, 3],
    beat: "Die Paritätsplatte ist dunkel. Der Golem läuft weiter, als sei nichts geschehen.",
    symptoms: [
      "Die feste Paritätsplatte ist ausgefallen",
      "Die drei Datenplatten arbeiten unverändert",
      "Alle Daten sind vollständig lesbar",
      "Ein Ersatz wurde bisher nicht bestellt",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Ohne Parität weiterarbeiten", ok: true },
      { t: "Die Paritätsplatte ersetzen", ok: false },
      { t: "Vor dem Tausch sichern", ok: false },
      { t: "Bis zum Tausch anhalten", ok: false },
    ],
    strike: "Du arbeitest ohne Parität weiter. Die nächste Datenplatte nimmt alles mit.",
    e: "Ohne Paritätsplatte gibt es nichts mehr, aus dem sich ein fehlender Datenblock zurückrechnen ließe. Die Daten bleiben lesbar, aber der Verbund verhält sich ab sofort wie ein reiner Streifen: Der nächste Ausfall ist der Totalverlust.",
    merksatz: "Ohne Parität ist RAID 4 nur noch RAID 0 mit Extraschritt.",
  },
  {
    id: "r4-3", stageId: "raid4", hit: "alle",
    beat: "Drei große Platten, eine kleine. Der Golem greift nach der kleinen.",
    symptoms: [
      "Drei Datenplatten zu vier Terabyte liegen bereit",
      "Als Parität steckt eine Platte zu zwei Terabyte",
      "Die Parität braucht die volle Streifenbreite",
      "Der Einrichtungslauf bricht ohne Meldung ab",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Die kleine Platte als Parität stecken", ok: true },
      { t: "Die kleine gegen eine große tauschen", ok: false },
      { t: "Alle Platten auf 2 TB kapazitiv kappen", ok: false },
      { t: "Die Platten vorher einzeln prüfen", ok: false },
    ],
    strike: "Du steckst die kleine Platte als Parität. Der Stripe passt nicht hinein.",
    e: "Die Parität eines Streifens ist genauso breit wie dessen Datenblöcke. Eine kleinere Paritätsplatte kann ihn nicht aufnehmen. Entweder wird die Kapazität aller Platten auf das kleinste Laufwerk beschnitten, oder die Parität muss mindestens so groß sein wie die Daten.",
    merksatz: "Die kleinste Platte bestimmt den Verbund, die Parität braucht volle Breite.",
  },

  /* ==================== RAID 1 ==================== */
  {
    id: "r1-1", stageId: "raid1", hit: [0, 1],
    beat: "Zwei Platten, ein Bestand, zweimal da. Eine davon ist frisch und völlig leer.",
    symptoms: [
      "Zwei Platten halten denselben Datenbestand",
      "Eine wurde gegen eine leere Platte getauscht",
      "Der Abgleich kann in beide Richtungen laufen",
      "Die Richtung wird beim Start abgefragt",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Die leere Platte als Quelle wählen", ok: true },
      { t: "Die volle Platte als Quelle wählen", ok: false },
      { t: "Die Seriennummern vorher notieren", ok: false },
      { t: "Den Abgleich nachts laufen lassen", ok: false },
    ],
    strike: "Du wählst die leere Seite als Quelle. Sie wird sauber über den Bestand kopiert.",
    e: "Ein Spiegel gleicht zwei Platten an, ohne zu wissen, welche die richtige ist. Wird die leere Ersatzplatte als Quelle gewählt, überschreibt der Abgleich den Bestand vollständig und arbeitet dabei formal fehlerfrei. Danach meldet der Verbund einen gesunden Spiegel aus zwei leeren Platten.",
    merksatz: "Beim Spiegeln entscheidet die Richtung des Abgleichs über alles.",
  },
  {
    id: "r1-2", stageId: "raid1", hit: [0, 1],
    beat: "Der Golem bietet einen Spiegel an, obwohl er nur eine Platte besitzt. Er meint es ernst.",
    symptoms: [
      "Der Rechner enthält genau eine körperliche Platte",
      "Auf ihr sind zwei Partitionen angelegt",
      "Die Verwaltung bietet deren Spiegelung an",
      "Ein zweiter Einschub im Gehäuse ist frei",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Zwei Partitionen einer Platte spiegeln", ok: true },
      { t: "Zwei Platten in zwei Schächten spiegeln", ok: false },
      { t: "Die zweite Platte nachrüsten", ok: false },
      { t: "Die zweite Platte vorher prüfen", ok: false },
    ],
    strike: "Du spiegelst eine Platte auf sich selbst. Ihr Ausfall nimmt beide Hälften mit.",
    e: "Ein Spiegel schützt gegen den Ausfall eines Geräts. Liegen beide Hälften auf derselben körperlichen Platte, ist dieses Gerät für beide dasselbe: Ein Kopfcrash, ein Elektronikschaden oder ein defekter Anschluss nimmt Original und Kopie gleichzeitig mit.",
    merksatz: "Ein Spiegel auf einer Platte spiegelt deren Ausfall gleich mit.",
  },
  {
    id: "r1-3", stageId: "raid1", hit: [0, 1],
    beat: "Laut Aufkleber besteht der Spiegel aus zwei Platten. Eine ging vor Monaten leise.",
    symptoms: [
      "Der Spiegel besteht auf dem Papier aus zwei Platten",
      "Eine wurde vor Monaten stillschweigend abgemeldet",
      "Der Betrieb läuft ohne erkennbare Einschränkung",
      "Eine Meldung darüber wurde nie gelesen",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Den Spiegel nie nachkontrollieren", ok: true },
      { t: "Den Zustand regelmäßig abfragen", ok: false },
      { t: "Die abgemeldete Platte aufnehmen", ok: false },
      { t: "Eine Statusüberwachung einrichten", ok: false },
    ],
    strike: "Du siehst nie nach. Der Spiegel ist längst eine Platte, und die gibt nach.",
    e: "Ein Spiegel verliert seine Schutzwirkung in dem Moment, in dem eine Hälfte ausfällt, verhält sich nach außen aber unverändert. Ohne aktive Abfrage oder Benachrichtigung bemerkt niemand den Übergang, und der Verbund läuft monatelang als einzelne Platte.",
    merksatz: "Ein Spiegel, den niemand prüft, ist irgendwann nur eine Platte.",
  },

  /* ==================== RAID 0 ==================== */
  {
    id: "r0-1", stageId: "raid0", hit: "alle",
    beat: "Zwei Platten, sonst nichts. Kein Spiegel, keine Parität, keine zweite Chance.",
    symptoms: [
      "Zwei Platten, die Daten liegen in Streifen",
      "Weder Kopie noch Parität sind vorhanden",
      "Jeder Block existiert genau einmal",
      "Der Verbund ist auf Tempo ausgelegt",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Eine Platte im Betrieb ziehen", ok: true },
      { t: "Den Verbund sauber aushängen", ok: false },
      { t: "Die Schreiblast stark erhöhen", ok: false },
      { t: "Die Streifengröße nachträglich ablesen", ok: false },
    ],
    strike: "Du ziehst im Betrieb eine Platte. Der Stripe reißt, der Golem zerfällt.",
    e: "RAID 0 hat definitionsgemäß keine Redundanz. Die Daten werden über beide Platten verteilt, aber kein Block ist doppelt vorhanden und keiner berechenbar. Fällt eine Platte aus, fehlt jeder zweite Block, und der Rest ist nicht verwertbar.",
    merksatz: "RAID 0 hat keine Redundanz. Eine Platte weg heißt alles weg.",
  },
  {
    id: "r0-2", stageId: "raid0", hit: "alle",
    beat: "Auf dem Streifen liegen Schnittdaten aus Wochen. Ein Archiv steht offen daneben.",
    symptoms: [
      "Zwei Platten laufen als reiner Streifenverbund",
      "Die Ausfallwahrscheinlichkeiten addieren sich",
      "Die Schnittdaten liegen ohne Kopie darauf",
      "Ein Archivspeicher im Netz steht bereit",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "RAID 0 als einzigen Ablageort nutzen", ok: true },
      { t: "RAID 0 nur als Arbeitsfläche nutzen", ok: false },
      { t: "Die Daten zusätzlich ins Archiv legen", ok: false },
      { t: "Die Platten auf Fehler prüfen", ok: false },
    ],
    strike: "Du machst den schnellsten Speicher zum einzigen. Dann zerfällt er.",
    e: "Ein Streifen aus zwei Platten fällt etwa doppelt so häufig aus wie eine Einzelplatte, weil jeder der beiden Ausfälle den ganzen Verbund kostet. Als schnelle Arbeitsfläche ist das vertretbar, als einziger Ablageort für unersetzliche Daten nicht.",
    merksatz: "RAID 0 verdoppelt Tempo und Ausfallrisiko zugleich.",
  },
  {
    id: "r0-3", stageId: "raid0", hit: "alle",
    beat: "Eine der beiden Platten sitzt extern. Ein Kabel hält den halben Golem zusammen.",
    symptoms: [
      "Eine Platte des Streifens sitzt im Außengehäuse",
      "Die Verbindung läuft über ein gestecktes Kabel",
      "Jeder Block des Verbunds liegt genau einmal",
      "Die zweite Platte sitzt fest im Rechner",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Das Kabel im Betrieb lösen", ok: true },
      { t: "Vor dem Trennen sauber aushängen", ok: false },
      { t: "Das Gehäuse fest verschrauben", ok: false },
      { t: "Die interne Platte prüfen", ok: false },
    ],
    strike: "Du löst das Kabel im Betrieb. Der halbe Stripe verschwindet im Schreibvorgang.",
    e: "Beim Streifenverbund gehört jede beteiligte Platte zur Ausfallkette, unabhängig davon, wie sie angebunden ist. Eine gesteckte Verbindung ist die schwächste Stelle: Ein gelöstes Kabel wirkt wie ein Plattenausfall, passiert aber viel leichter.",
    merksatz: "Beim Streifen zählt jede Platte zur Ausfallkette, auch die am Kabel.",
  },

  /* ==================== CONTROLLER (Epilog) ==================== */
  {
    id: "ctl-1", stageId: "controller", hit: "alle",
    beat: "Die Platten sind fort, das Auge brennt weiter. Es war nie doppelt vorhanden.",
    symptoms: [
      "Alle Platten sind körperlich unversehrt",
      "Der Verbundcontroller selbst ist ausgefallen",
      "Ein baugleicher Ersatzcontroller liegt bereit",
      "Steckplatzfolge und Firmware sind undokumentiert",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Plattenreihenfolge willkürlich ändern", ok: true },
      { t: "Plattenreihenfolge exakt dokumentieren", ok: false },
      { t: "Den Firmwarestand vorher angleichen", ok: false },
      { t: "Die Verbunddaten vorher auslesen", ok: false },
    ],
    strike: "Du steckst die Platten willkürlich. Der Ersatzcontroller findet ein fremdes Layout.",
    e: "Der Controller hält die Zuordnung von Steckplatz zu Streifenposition in seinen Metadaten. Stimmen Reihenfolge oder Firmwarestand beim Ersatz nicht, deutet er die Blöcke falsch oder gar nicht. Die Platten sind dann intakt und der Verbund trotzdem verloren.",
    merksatz: "Ohne dokumentierte Steckplatzfolge und Firmware ist der Verbund verloren.",
  },
  {
    id: "ctl-2", stageId: "controller", hit: "alle",
    beat: "Im Auge liegt ein Zwischenspeicher, der Schreiben bestätigt. Die Batterie ist tot.",
    symptoms: [
      "Der Controller nutzt einen Rückschreibe-Cache",
      "Die Pufferbatterie ist seit Monaten defekt",
      "Die Anlage hängt an keiner USV",
      "Der Verbund meldet sich als fehlerfrei",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Write-Back trotz toter BBU fahren", ok: true },
      { t: "Auf Write-Through zurückstellen", ok: false },
      { t: "Die tote Pufferbatterie tauschen", ok: false },
      { t: "Eine USV vor den Controller schalten", ok: false },
    ],
    strike: "Du fährst Write-Back ohne Batterie. Der Stromausfall frisst bestätigte Schreibvorgänge.",
    e: "Ein Rückschreibe-Cache bestätigt Schreibvorgänge, bevor sie auf den Platten stehen. Fällt der Strom aus und puffert keine geladene Batterie den Inhalt, gehen genau diese Schreibvorgänge verloren. Der Verbund bleibt auf Blockebene konsistent, das Dateisystem nicht.",
    merksatz: "Ohne geladene Pufferbatterie gehört der Schreibcache abgeschaltet.",
  },
  {
    id: "ctl-3", stageId: "controller", hit: "alle",
    beat: "Acht Platten, doppelte Parität, sauber geplant. Darüber ein Bauteil, das es einmal gibt.",
    symptoms: [
      "Acht Platten laufen mit doppelter Parität",
      "Alle hängen an einem einzigen Controller",
      "Ein zweiter Controller ist nicht vorgesehen",
      "Eine Sicherung auf ein zweites Gerät fehlt",
    ],
    q: "Wähle deinen Angriff",
    options: [
      { t: "Ohne Backup und Zweitcontroller fahren", ok: true },
      { t: "Einen zweiten Controller vorsehen", ok: false },
      { t: "Zusätzlich auf ein zweites Gerät sichern", ok: false },
      { t: "Eine Platte im Betrieb tauschen", ok: false },
    ],
    strike: "Du sparst Backup und Zweitcontroller. Acht gesunde Platten werden wertlos.",
    e: "Alle Plattenredundanz endet am Controller, weil jeder Zugriff durch ihn läuft und nur er die Struktur kennt. Zwei Plattenausfälle trägt doppelte Parität mühelos, den Ausfall des einzigen Controllers nicht. Echte Ausfallsicherheit braucht redundante Controller und eine Sicherung auf getrenntem Gerät.",
    merksatz: "Der Controller ist der Punkt, an dem alle Plattenredundanz endet.",
  },
];

function getGolemQuestions(stageId) {
  return GOLEM_QUESTIONS.filter(q => q.stageId === stageId);
}

/* Boss-Eintrag für die Auswahl. Die Hydra bleibt unangetastet. */
const GOLEM_BOSS = {
  id: "raid-golem",
  name: "RAID-GOLEM",
  playerMaxHp: 100,
  intro:
    "Aus dem Serverschrank schiebt sich ein Koloss aus Blech und Glas. Er wird nicht durch Fachwissen besiegt, sondern durch die schlimmsten Admin-Fehler.",
  regel:
    "Wähle stets die Maßnahme, die den Verbund gefährdet oder zerstört. Was hier richtig ist, wäre im echten Betrieb katastrophal.",
  regelKurz:
    "Achtung: Hier gewinnt der schlimmste Admin-Fehler. Wähle die Maßnahme, die den Verbund zerstört. Was hier richtig ist, wäre im Betrieb katastrophal.",
};
