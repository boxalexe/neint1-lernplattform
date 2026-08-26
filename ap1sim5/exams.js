/* AP1-Prüfungssimulation — Prüfungsdaten
   Eigenständig erzeugte Aufgaben. Keine Inhalte aus Originalprüfungen.
   Weitere Varianten einfach als zusätzliches Objekt an EXAMS anhängen. */

const EXAMS = [
{
  examId: "AP1-SIM-01",
  title: "AP1-Prüfungssimulation 01 — Gesundheitswesen",
  branche: "Therapiezentrum",
  durationMinutes: 90,
  maxPoints: 100,
  disclaimer: "Unverbindliche Übungssimulation. Keine offizielle IHK-Prüfung und keine verbindliche Bewertung.",
  scenario: "Das VitaMove Therapiezentrum in Bad Rothenfelde beschäftigt 18 Therapeutinnen und Therapeuten an drei Standorten und behandelt täglich rund 180 Patientinnen und Patienten. Die Behandlungsdokumentation läuft bisher auf Papier. Die Geschäftsführung hat entschieden, die Dokumentation auf Tablets umzustellen, das Netz neu zu strukturieren und eine eigene Terminverwaltung entwickeln zu lassen. Sie arbeiten in der internen IT und begleiten das Vorhaben.",
  tasks: [
  {
    id: "1", title: "Beschaffung und Arbeitsplatzsysteme", points: 25,
    context: "Für die mobile Behandlungsdokumentation sollen 12 Tablets beschafft werden. Drei Angebote liegen vor. Die Geschäftsführung bewertet nach Preis (Gewichtung 40 %), Akkulaufzeit (35 %) und Servicevertrag (25 %) auf einer Skala von 1 bis 10.\n\nBewertungen:\nAnbieter A — Preis 8, Akkulaufzeit 6, Service 7\nAnbieter B — Preis 6, Akkulaufzeit 9, Service 8\nAnbieter C — Preis 9, Akkulaufzeit 5, Service 6",
    subtasks: [
      { id:"1a", operator:"Berechnen Sie", points:6, answerType:"number_with_working", required:true,
        prompt:"Ermitteln Sie mit einer Nutzwertanalyse den Gesamtnutzwert je Anbieter und benennen Sie den Sieger. Geben Sie den Rechenweg an.",
        minRequirements:"Teilnutzwerte je Kriterium, Gesamtnutzwert je Anbieter, Entscheidung",
        fallbackValue:"Anbieter B mit 7,55 Punkten",
        solution:"Teilnutzwert = Gewichtung × Bewertung.\nAnbieter A: 0,40×8 = 3,20 | 0,35×6 = 2,10 | 0,25×7 = 1,75 → 7,05\nAnbieter B: 0,40×6 = 2,40 | 0,35×9 = 3,15 | 0,25×8 = 2,00 → 7,55\nAnbieter C: 0,40×9 = 3,60 | 0,35×5 = 1,75 | 0,25×6 = 1,50 → 6,85\nAnbieter B erreicht mit 7,55 Punkten den höchsten Nutzwert und wird gewählt.",
        rubric:[
          {id:"1a-r1", criterion:"Ansatz Gewichtung × Bewertung erkennbar", points:1},
          {id:"1a-r2", criterion:"Gesamtnutzwert A korrekt (7,05)", points:1},
          {id:"1a-r3", criterion:"Gesamtnutzwert B korrekt (7,55)", points:1},
          {id:"1a-r4", criterion:"Gesamtnutzwert C korrekt (6,85)", points:1},
          {id:"1a-r5", criterion:"Anbieter B als Sieger benannt", points:1},
          {id:"1a-r6", criterion:"Rechenweg nachvollziehbar dargestellt", points:1}
        ]},
      { id:"1b", operator:"Berechnen Sie", points:6, answerType:"number_with_working", required:true,
        prompt:"Der gewählte Anbieter verlangt 649,00 EUR netto je Tablet. Bei Abnahme von 12 Stück gewährt er 8 % Rabatt, bei Zahlung innerhalb von 10 Tagen zusätzlich 2 % Skonto. Ermitteln Sie den Bruttobetrag bei Skontonutzung (Umsatzsteuersatz 19 %). Runden Sie kaufmännisch auf zwei Nachkommastellen und geben Sie die Einheit an.",
        minRequirements:"Listenpreis, Rabatt, Skonto, Umsatzsteuer, Endbetrag mit Einheit",
        fallbackValue:"8.355,78 EUR",
        solution:"12 × 649,00 EUR = 7.788,00 EUR\nRabatt 8 %: 7.788,00 × 0,08 = 623,04 EUR → 7.164,96 EUR\nSkonto 2 %: 7.164,96 × 0,02 = 143,30 EUR → 7.021,66 EUR netto\nUmsatzsteuer 19 %: 7.021,66 × 0,19 = 1.334,12 EUR\nBruttobetrag: 8.355,78 EUR",
        rubric:[
          {id:"1b-r1", criterion:"Listenpreis 7.788,00 EUR korrekt", points:1},
          {id:"1b-r2", criterion:"Rabatt korrekt abgezogen (7.164,96 EUR)", points:1},
          {id:"1b-r3", criterion:"Skonto korrekt abgezogen (7.021,66 EUR)", points:1},
          {id:"1b-r4", criterion:"Umsatzsteuer korrekt berechnet (1.334,12 EUR)", points:1},
          {id:"1b-r5", criterion:"Endbetrag 8.355,78 EUR", points:1},
          {id:"1b-r6", criterion:"Einheit angegeben und kaufmännisch gerundet", points:1}
        ]},
      { id:"1c", operator:"Nennen Sie", points:5, answerType:"text", required:true,
        prompt:"Die Tablets sollen am Empfang über eine Dockingstation geladen und gleichzeitig mit einem externen Monitor sowie dem Netzwerk verbunden werden. Nennen Sie drei technische Anforderungen an die Tablets oder die Dockingstation und erläutern Sie je Anforderung kurz deren Zweck.",
        minRequirements:"Drei Anforderungen mit jeweiliger Begründung",
        fallbackValue:null,
        solution:"Mögliche Anforderungen:\n— USB-C-Anschluss mit DisplayPort Alt Mode: erlaubt Bildausgabe an den Monitor über dasselbe Kabel\n— Power Delivery über USB-C: lädt das Tablet während des Betriebs am Dock\n— Ethernet-Anschluss am Dock: stabile kabelgebundene Anbindung ohne WLAN-Abhängigkeit\n— Ausreichende Auflösungsunterstützung des Docks für den externen Monitor\n— Kompatibilität von Dock und Tablet-Betriebssystem\nWeitere fachlich sinnvolle Antworten sind möglich.",
        rubric:[
          {id:"1c-r1", criterion:"Erste Anforderung fachlich richtig genannt", points:1},
          {id:"1c-r2", criterion:"Zweite Anforderung fachlich richtig genannt", points:1},
          {id:"1c-r3", criterion:"Dritte Anforderung fachlich richtig genannt", points:1},
          {id:"1c-r4", criterion:"Mindestens zwei Zwecke sinnvoll erläutert", points:1},
          {id:"1c-r5", criterion:"Bezug zum beschriebenen Einsatzszenario erkennbar", points:1}
        ]},
      { id:"1d", operator:"Erläutern Sie", points:4, answerType:"text", required:true,
        prompt:"Auf den Tablets werden Behandlungsdaten erfasst. Erläutern Sie das Prinzip der geringsten Rechte und beschreiben Sie, wie es in diesem Therapiezentrum konkret umgesetzt werden kann.",
        minRequirements:"Prinzip erklärt und auf das Szenario übertragen",
        fallbackValue:null,
        solution:"Prinzip der geringsten Rechte: Jeder Benutzer und jede Anwendung erhält nur genau die Berechtigungen, die zur Aufgabenerfüllung nötig sind, und keine darüber hinaus.\nUmsetzung: Therapeutinnen und Therapeuten sehen nur die Daten der ihnen zugewiesenen Patienten. Die Abrechnung erhält Zugriff auf Abrechnungsdaten, nicht auf Behandlungsnotizen. Administrative Konten werden getrennt von persönlichen Arbeitskonten geführt. Rechte werden über Rollen vergeben und bei Rollenwechsel angepasst.",
        rubric:[
          {id:"1d-r1", criterion:"Prinzip korrekt definiert", points:1},
          {id:"1d-r2", criterion:"Rollenbezogene Rechtevergabe genannt", points:1},
          {id:"1d-r3", criterion:"Konkretes Beispiel aus dem Szenario", points:1},
          {id:"1d-r4", criterion:"Nutzen für den Datenschutz erkennbar gemacht", points:1}
        ]},
      { id:"1e", operator:"Beschreiben Sie", points:4, answerType:"text", required:true,
        prompt:"Beschreiben Sie zwei technische Maßnahmen, die verhindern, dass bei Verlust eines Tablets Behandlungsdaten in fremde Hände geraten.",
        minRequirements:"Zwei technische Maßnahmen mit Wirkung",
        fallbackValue:null,
        solution:"Mögliche Maßnahmen:\n— Vollverschlüsselung des Gerätespeichers: ohne Anmeldung sind die Daten unlesbar\n— Bildschirmsperre mit kurzer Zeitspanne und starker Authentifizierung\n— Mobile-Device-Management mit Fernlöschung des Geräts\n— Keine lokale Datenhaltung, Zugriff nur auf Serverdaten über gesicherte Verbindung\nWeitere sinnvolle Antworten sind möglich.",
        rubric:[
          {id:"1e-r1", criterion:"Erste Maßnahme technisch korrekt", points:1},
          {id:"1e-r2", criterion:"Wirkung der ersten Maßnahme erklärt", points:1},
          {id:"1e-r3", criterion:"Zweite Maßnahme technisch korrekt", points:1},
          {id:"1e-r4", criterion:"Wirkung der zweiten Maßnahme erklärt", points:1}
        ]}
    ]
  },
  {
    id: "2", title: "Netzwerk und Projektplanung", points: 25,
    context: "Der Hauptstandort erhält ein neues Netz. Zur Verfügung steht das private Netz 192.168.40.0/24. Es sollen vier gleich große Teilnetze für Behandlung, Verwaltung, Gästezugang und Medizintechnik gebildet werden. Je Teilnetz werden höchstens 50 Endgeräte erwartet.",
    subtasks: [
      { id:"2a", operator:"Ermitteln Sie", points:8, answerType:"number_with_working", required:true,
        prompt:"Ermitteln Sie die passende Präfixlänge und geben Sie für das dritte Teilnetz Netzadresse, erste und letzte nutzbare Hostadresse, Broadcastadresse sowie die Anzahl nutzbarer Hostadressen an. Geben Sie den Rechenweg an.",
        minRequirements:"Präfix, vier Adressen, Hostanzahl, Rechenweg",
        fallbackValue:"/26, Netz 192.168.40.128",
        solution:"Vier Teilnetze benötigen 2 geliehene Bits: 2² = 4. Aus /24 wird /26.\nHostbits: 32 − 26 = 6 → 2⁶ − 2 = 62 nutzbare Hostadressen, ausreichend für 50 Geräte.\nSprungweite: 256 − 192 = 64.\nTeilnetze: .0 | .64 | .128 | .192\nDrittes Teilnetz:\nNetzadresse 192.168.40.128\nErster Host 192.168.40.129\nLetzter Host 192.168.40.190\nBroadcast 192.168.40.191\nNutzbare Hostadressen: 62",
        rubric:[
          {id:"2a-r1", criterion:"Präfix /26 korrekt ermittelt", points:1},
          {id:"2a-r2", criterion:"Begründung über geliehene Bits oder Hostbedarf", points:1},
          {id:"2a-r3", criterion:"Sprungweite 64 erkannt", points:1},
          {id:"2a-r4", criterion:"Netzadresse 192.168.40.128", points:1},
          {id:"2a-r5", criterion:"Erste Hostadresse 192.168.40.129", points:1},
          {id:"2a-r6", criterion:"Letzte Hostadresse 192.168.40.190", points:1},
          {id:"2a-r7", criterion:"Broadcastadresse 192.168.40.191", points:1},
          {id:"2a-r8", criterion:"62 nutzbare Hostadressen", points:1}
        ]},
      { id:"2b", operator:"Beschreiben Sie", points:5, answerType:"text", required:true,
        prompt:"Ein Tablet in der Behandlung erhält die Adresse 169.254.18.7 und erreicht weder das Praxisverwaltungssystem noch das Internet. Beschreiben Sie, was diese Adresse aussagt, und nennen Sie drei Prüfschritte in sinnvoller Reihenfolge zur Eingrenzung der Ursache.",
        minRequirements:"Bedeutung der Adresse und drei geordnete Prüfschritte",
        fallbackValue:null,
        solution:"Die Adresse stammt aus dem APIPA-Bereich 169.254.0.0/16. Das Gerät hat sich selbst eine Adresse vergeben, weil kein DHCP-Server geantwortet hat.\nPrüfschritte, zum Beispiel:\n1. Physische Verbindung und Link-Status prüfen (WLAN-Verbindung beziehungsweise Kabel und Port).\n2. Prüfen, ob andere Geräte im selben Teilnetz korrekte Adressen beziehen — grenzt Gerät gegen Netz ab.\n3. DHCP-Server auf Erreichbarkeit, Dienststatus und freie Adressen im Adressbereich prüfen.\n4. Ergänzend: Konfiguration der VLAN-Zuordnung des Ports oder DHCP-Relay prüfen.",
        rubric:[
          {id:"2b-r1", criterion:"APIPA beziehungsweise Selbstvergabe erkannt", points:1},
          {id:"2b-r2", criterion:"Fehlende DHCP-Antwort als Ursache benannt", points:1},
          {id:"2b-r3", criterion:"Erster Prüfschritt sinnvoll", points:1},
          {id:"2b-r4", criterion:"Zweiter Prüfschritt sinnvoll", points:1},
          {id:"2b-r5", criterion:"Dritter Prüfschritt sinnvoll und Reihenfolge nachvollziehbar", points:1}
        ]},
      { id:"2c", operator:"Erläutern Sie", points:5, answerType:"text", required:true,
        prompt:"Die Medizintechnik-Geräte sollen künftig zusätzlich über IPv6 erreichbar sein. Erläutern Sie den Unterschied zwischen einer Link-Local-Adresse und einer Global-Unicast-Adresse und beschreiben Sie, wie ein Gerät per SLAAC zu seiner Adresse kommt.",
        minRequirements:"Beide Adressarten abgegrenzt, SLAAC-Ablauf beschrieben",
        fallbackValue:null,
        solution:"Link-Local (fe80::/10): nur im eigenen Netzsegment gültig, wird nicht geroutet, existiert auf jeder IPv6-Schnittstelle automatisch.\nGlobal Unicast (2000::/3): weltweit eindeutig und routbar, entspricht funktional der öffentlichen IPv4-Adresse.\nSLAAC-Ablauf: Das Gerät bildet zunächst seine Link-Local-Adresse und prüft sie per Duplicate Address Detection. Danach sendet es eine Router Solicitation. Der Router antwortet mit einem Router Advertisement und teilt das Präfix mit. Aus Präfix und selbst gebildetem Interface-Identifier setzt das Gerät seine globale Adresse zusammen.",
        rubric:[
          {id:"2c-r1", criterion:"Link-Local korrekt beschrieben (nicht routbar, Segment)", points:1},
          {id:"2c-r2", criterion:"Global Unicast korrekt beschrieben (weltweit routbar)", points:1},
          {id:"2c-r3", criterion:"Router Solicitation und Router Advertisement genannt", points:1},
          {id:"2c-r4", criterion:"Präfix plus Interface-Identifier als Bildungsprinzip", points:1},
          {id:"2c-r5", criterion:"Automatische Konfiguration ohne DHCP-Server erkennbar", points:1}
        ]},
      { id:"2d", operator:"Ermitteln Sie", points:7, answerType:"number_with_working", required:true,
        prompt:"Für die Netzumstellung sind folgende Vorgänge geplant (Dauer in Arbeitstagen):\nA Bestandsaufnahme (2), Start\nB Verkabelung (4), nach A\nC Beschaffung Switches (3), nach A\nD Konfiguration (5), nach B\nE Einweisung Team (2), nach C\nF Abnahme (3), nach D und E\n\nErmitteln Sie die Gesamtprojektdauer, den kritischen Pfad sowie den Gesamtpuffer der Vorgänge C und E. Geben Sie den Rechenweg an.",
        minRequirements:"Vorwärts- und Rückwärtsrechnung, Dauer, kritischer Pfad, zwei Pufferwerte",
        fallbackValue:"14 Arbeitstage, kritischer Pfad A-B-D-F",
        solution:"Vorwärtsrechnung (FEZ = FAZ + Dauer, bei mehreren Vorgängern das späteste FEZ):\nA 0→2 | B 2→6 | C 2→5 | D 6→11 | E 5→7 | F: FAZ = max(11; 7) = 11 → 14\nGesamtprojektdauer: 14 Arbeitstage\nRückwärtsrechnung (SAZ = SEZ − Dauer):\nF 14→11 | D 11→6 | E 11→9 | B 6→2 | C 9→6 | A 2→0\nGesamtpuffer = SAZ − FAZ:\nA, B, D, F je 0 → kritischer Pfad A – B – D – F\nC: 6 − 2 = 4 Arbeitstage\nE: 9 − 5 = 4 Arbeitstage",
        rubric:[
          {id:"2d-r1", criterion:"Vorwärtsrechnung nachvollziehbar", points:1},
          {id:"2d-r2", criterion:"Bei F das spätere Vorgänger-FEZ verwendet", points:1},
          {id:"2d-r3", criterion:"Gesamtprojektdauer 14 Arbeitstage", points:1},
          {id:"2d-r4", criterion:"Rückwärtsrechnung nachvollziehbar", points:1},
          {id:"2d-r5", criterion:"Kritischer Pfad A-B-D-F", points:1},
          {id:"2d-r6", criterion:"Gesamtpuffer C = 4 Tage", points:1},
          {id:"2d-r7", criterion:"Gesamtpuffer E = 4 Tage", points:1}
        ]}
    ]
  },
  {
    id: "3", title: "Digitalisierung, Datenschutz und IT-Sicherheit", points: 25,
    context: "Behandlungsdaten werden künftig digital erfasst und nachts in ein Rechenzentrum gesichert. Zusätzlich soll ein Assistenzsystem die Terminplanung unterstützen.",
    subtasks: [
      { id:"3a", operator:"Begründen Sie", points:6, answerType:"text", required:true,
        prompt:"Begründen Sie, warum Behandlungsdaten von Patientinnen und Patienten besonders geschützt werden müssen, nennen Sie die einschlägige Kategorie der DSGVO und geben Sie zwei technische oder organisatorische Maßnahmen an, die dieser Schutzbedürftigkeit gerecht werden.",
        minRequirements:"Begründung, Datenkategorie, zwei Maßnahmen",
        fallbackValue:null,
        solution:"Behandlungsdaten sind Gesundheitsdaten und damit besondere Kategorien personenbezogener Daten nach Art. 9 DSGVO. Ihre Verarbeitung ist grundsätzlich untersagt und nur bei einem gesetzlichen Ausnahmetatbestand zulässig, etwa ausdrückliche Einwilligung oder Verarbeitung zum Zweck der Gesundheitsversorgung. Ein Missbrauch kann die betroffene Person erheblich beeinträchtigen.\nMaßnahmen, zum Beispiel:\n— Verschlüsselung bei Speicherung und Übertragung\n— Rollenbasierte Zugriffskontrolle mit Protokollierung\n— Pseudonymisierung in Auswertungen\n— Verpflichtung der Beschäftigten auf Vertraulichkeit",
        rubric:[
          {id:"3a-r1", criterion:"Gesundheitsdaten als besondere Kategorie erkannt", points:1},
          {id:"3a-r2", criterion:"Art. 9 DSGVO oder gleichwertige Rechtsgrundlage genannt", points:1},
          {id:"3a-r3", criterion:"Schutzbedürftigkeit inhaltlich begründet", points:1},
          {id:"3a-r4", criterion:"Erste Maßnahme fachlich passend", points:1},
          {id:"3a-r5", criterion:"Zweite Maßnahme fachlich passend", points:1},
          {id:"3a-r6", criterion:"Bezug der Maßnahmen zur Schutzbedürftigkeit erkennbar", points:1}
        ]},
      { id:"3b", operator:"Beschreiben Sie", points:5, answerType:"text", required:true,
        prompt:"Rund 12 % der vereinbarten Termine werden nicht wahrgenommen. Beschreiben Sie eine sinnvolle Automatisierungs- oder KI-Anwendung zur Verringerung dieser Ausfälle und nennen Sie zwei Grenzen oder Risiken eines solchen Systems.",
        minRequirements:"Anwendung beschrieben, zwei Grenzen oder Risiken",
        fallbackValue:null,
        solution:"Anwendung, zum Beispiel: automatisierte Terminerinnerung per E-Mail oder Messenger mit Bestätigungsmöglichkeit; ergänzend ein lernendes System, das anhand historischer Daten die Ausfallwahrscheinlichkeit je Termin schätzt und riskante Termine gezielt doppelt erinnert oder in Zeiten mit Warteliste legt.\nGrenzen und Risiken, zum Beispiel:\n— Verarbeitung von Gesundheitsdaten erfordert Rechtsgrundlage und Datensparsamkeit\n— Fehlprognosen können einzelne Patientengruppen benachteiligen (Verzerrung in den Trainingsdaten)\n— Automatisierte Entscheidungen brauchen menschliche Kontrolle\n— Erinnerungen erreichen nicht alle Personengruppen gleichermaßen",
        rubric:[
          {id:"3b-r1", criterion:"Anwendung konkret und zum Problem passend", points:1},
          {id:"3b-r2", criterion:"Nutzen der Anwendung erkennbar", points:1},
          {id:"3b-r3", criterion:"Erste Grenze oder Risiko fachlich korrekt", points:1},
          {id:"3b-r4", criterion:"Zweite Grenze oder Risiko fachlich korrekt", points:1},
          {id:"3b-r5", criterion:"Datenschutzaspekt berücksichtigt", points:1}
        ]},
      { id:"3c", operator:"Erläutern Sie", points:6, answerType:"text", required:true,
        prompt:"Befundberichte werden elektronisch an überweisende Arztpraxen übermittelt. Erläutern Sie anhand eines asymmetrischen Verfahrens, wie dabei sichergestellt wird, dass der Bericht tatsächlich vom Therapiezentrum stammt und unterwegs nicht verändert wurde.",
        minRequirements:"Signaturerstellung und Signaturprüfung, Aussage zu Authentizität und Integrität",
        fallbackValue:null,
        solution:"Über den Befundbericht wird ein Hashwert gebildet. Dieser Hashwert wird mit dem privaten Schlüssel des Therapiezentrums zu einer digitalen Signatur verarbeitet und zusammen mit dem Bericht versendet.\nDie empfangende Praxis prüft die Signatur mit dem öffentlichen Schlüssel des Therapiezentrums und erhält den ursprünglichen Hashwert. Gelingt das, steht die Herkunft fest (Authentizität), da nur der Inhaber des privaten Schlüssels die Signatur erzeugen konnte.\nAnschließend berechnet die Praxis den Hashwert des empfangenen Berichts selbst. Stimmen beide Hashwerte überein, wurde der Bericht nicht verändert (Integrität).\nDie Vertraulichkeit erfordert zusätzlich eine Verschlüsselung, etwa über eine TLS-gesicherte Übertragung.",
        rubric:[
          {id:"3c-r1", criterion:"Hashwert über die Nachricht gebildet", points:1},
          {id:"3c-r2", criterion:"Signatur mit privatem Schlüssel erzeugt", points:1},
          {id:"3c-r3", criterion:"Prüfung mit öffentlichem Schlüssel des Absenders", points:1},
          {id:"3c-r4", criterion:"Vergleich der Hashwerte beschrieben", points:1},
          {id:"3c-r5", criterion:"Authentizität korrekt zugeordnet", points:1},
          {id:"3c-r6", criterion:"Integrität korrekt zugeordnet", points:1}
        ]},
      { id:"3d", operator:"Berechnen Sie", points:8, answerType:"number_with_working", required:true,
        prompt:"Je Behandlung entsteht ein Dokumentationsdatensatz von 250 kB. Täglich werden 180 Behandlungen erfasst, das Zentrum hat 250 Öffnungstage im Jahr. Es gilt: 1 kB = 1.000 Byte; für GiB ist mit 1.024 zu rechnen.\n\naa) Berechnen Sie die tägliche Datenmenge in kB.\nab) Berechnen Sie die jährliche Datenmenge in GiB, gerundet auf zwei Nachkommastellen.\nac) Die Jahresdaten werden über eine Leitung mit 50 Mbit/s gesichert. Berechnen Sie die reine Übertragungsdauer in Minuten, gerundet auf eine Nachkommastelle. Rechnen Sie mit dem gerundeten Ergebnis aus ab) weiter.\n\nGeben Sie bei allen Ergebnissen die Einheit an.",
        minRequirements:"Drei Ergebnisse mit Rechenweg und Einheit",
        fallbackValue:"10,48 GiB",
        solution:"aa) 180 × 250 kB = 45.000 kB pro Tag\n\nab) 45.000 kB × 250 Tage = 11.250.000 kB = 11.250.000.000 Byte\n11.250.000.000 ÷ 1.024³ = 11.250.000.000 ÷ 1.073.741.824 = 10,4774… GiB ≈ 10,48 GiB\n\nac) 10,48 GiB × 1.073.741.824 = 11.252.814.315,52 Byte\n× 8 = 90.022.514.524,16 Bit\n÷ 50.000.000 Bit/s = 1.800,45 s\n1.800,45 ÷ 60 = 30,0 Minuten (gerundet 30,0 min)",
        rubric:[
          {id:"3d-r1", criterion:"Tagesmenge 45.000 kB korrekt", points:1},
          {id:"3d-r2", criterion:"Jahresmenge in kB oder Byte korrekt ermittelt", points:1},
          {id:"3d-r3", criterion:"Umrechnung mit 1.024³ angewandt", points:1},
          {id:"3d-r4", criterion:"Ergebnis ab) 10,48 GiB", points:1},
          {id:"3d-r5", criterion:"Umrechnung Byte in Bit (×8) vorgenommen", points:1},
          {id:"3d-r6", criterion:"Division durch 50.000.000 Bit/s korrekt", points:1},
          {id:"3d-r7", criterion:"Ergebnis ac) rund 30,0 Minuten", points:1},
          {id:"3d-r8", criterion:"Alle Einheiten angegeben", points:1}
        ]}
    ]
  },
  {
    id: "4", title: "Software und Daten", points: 25,
    context: "Für die Terminverwaltung wird eine eigene Anwendung entwickelt. Zu verwalten sind Patientinnen und Patienten, Therapeutinnen und Therapeuten sowie die einzelnen Behandlungen.",
    subtasks: [
      { id:"4a", operator:"Modellieren Sie", points:7, answerType:"diagram_text", required:true,
        prompt:"Beschreiben Sie ein UML-Klassendiagramm mit den Klassen Patient, Therapeut und Behandlung. Geben Sie je Klasse mindestens zwei Attribute mit Sichtbarkeit und Datentyp, je eine Methode sowie die Beziehungen zwischen den Klassen mit Multiplizitäten an. Eine textliche Darstellung ist zulässig.",
        minRequirements:"Drei Klassen mit Attributen, Sichtbarkeiten, Methoden und Beziehungen mit Multiplizitäten",
        fallbackValue:null,
        solution:"Beispiel:\nPatient\n- patientenNr : Integer\n- name : String\n+ getPatientenNr() : Integer\n\nTherapeut\n- therapeutenNr : Integer\n- fachbereich : String\n+ getFachbereich() : String\n\nBehandlung\n- behandlungsNr : Integer\n- datum : Date\n- dauerMinuten : Integer\n+ getDauerMinuten() : Integer\n\nBeziehungen:\nPatient 1 — 0..* Behandlung (ein Patient hat beliebig viele Behandlungen, jede Behandlung gehört zu genau einem Patienten)\nTherapeut 1 — 0..* Behandlung (ein Therapeut führt beliebig viele Behandlungen durch)\nSichtbarkeiten: − private, + public.\nAndere fachlich sinnvolle Modellierungen sind möglich.",
        rubric:[
          {id:"4a-r1", criterion:"Drei Klassen mit passenden Namen", points:1},
          {id:"4a-r2", criterion:"Je Klasse mindestens zwei Attribute mit Datentyp", points:1},
          {id:"4a-r3", criterion:"Sichtbarkeiten korrekt notiert (+ / −)", points:1},
          {id:"4a-r4", criterion:"Je Klasse mindestens eine Methode", points:1},
          {id:"4a-r5", criterion:"Beziehung Patient–Behandlung modelliert", points:1},
          {id:"4a-r6", criterion:"Beziehung Therapeut–Behandlung modelliert", points:1},
          {id:"4a-r7", criterion:"Multiplizitäten fachlich korrekt", points:1}
        ]},
      { id:"4b", operator:"Vervollständigen Sie", points:7, answerType:"table", required:true,
        prompt:"Überführen Sie das Modell in ein relationales Datenmodell. Geben Sie für die drei Tabellen jeweils die Spalten an und kennzeichnen Sie Primärschlüssel mit PK und Fremdschlüssel mit FK. Begründen Sie zusätzlich in einem Satz, warum die Behandlung eine eigene Tabelle erhält.",
        minRequirements:"Drei Tabellen mit Spalten, PK- und FK-Kennzeichnung, Begründung",
        fallbackValue:null,
        solution:"Patient(patientenNr PK, name, geburtsdatum)\nTherapeut(therapeutenNr PK, name, fachbereich)\nBehandlung(behandlungsNr PK, datum, dauerMinuten, patientenNr FK → Patient, therapeutenNr FK → Therapeut)\n\nBegründung: Behandlung ist eine eigenständige Entität mit eigenen Attributen und löst zugleich die Beziehung zwischen Patient und Therapeut auf; ohne eigene Tabelle entstünden Redundanzen und Mehrfachwerte in einer Zeile.",
        rubric:[
          {id:"4b-r1", criterion:"Tabelle Patient mit Primärschlüssel", points:1},
          {id:"4b-r2", criterion:"Tabelle Therapeut mit Primärschlüssel", points:1},
          {id:"4b-r3", criterion:"Tabelle Behandlung mit Primärschlüssel", points:1},
          {id:"4b-r4", criterion:"Fremdschlüssel auf Patient korrekt", points:1},
          {id:"4b-r5", criterion:"Fremdschlüssel auf Therapeut korrekt", points:1},
          {id:"4b-r6", criterion:"PK und FK eindeutig gekennzeichnet", points:1},
          {id:"4b-r7", criterion:"Begründung fachlich tragfähig (Redundanz oder Beziehungsauflösung)", points:1}
        ]},
      { id:"4c", operator:"Beschreiben Sie", points:6, answerType:"code", required:true,
        prompt:"Gegeben ist folgender Pseudocode. Er soll die durchschnittliche Dauer der tatsächlich erbrachten Behandlungen in Minuten zurückgeben.\n\n1  summe = 0\n2  anzahl = 0\n3  FÜR JEDE behandlung IN liste\n4      WENN behandlung.status = \"erbracht\" DANN\n5          summe = summe + behandlung.dauer\n6          anzahl = anzahl + 1\n7  RÜCKGABE summe / liste.anzahl()\n\nBeschreiben Sie die Aufgabe der Zeilen 4, 6 und 7 in eigenen Worten.",
        minRequirements:"Drei Zeilen inhaltlich zutreffend beschrieben",
        fallbackValue:null,
        solution:"Zeile 4: Prüft für die aktuelle Behandlung, ob deren Status den Wert \"erbracht\" hat. Nur solche Behandlungen werden weiterverarbeitet.\nZeile 6: Erhöht den Zähler anzahl um eins und zählt damit, wie viele erbrachte Behandlungen gefunden wurden.\nZeile 7: Teilt die aufsummierte Dauer durch die Gesamtzahl aller Einträge der Liste und gibt dieses Ergebnis zurück.\nAndere Formulierungen sind möglich.",
        rubric:[
          {id:"4c-r1", criterion:"Zeile 4 als Statusprüfung beschrieben", points:1},
          {id:"4c-r2", criterion:"Filterwirkung der Bedingung erkannt", points:1},
          {id:"4c-r3", criterion:"Zeile 6 als Zähler für erbrachte Behandlungen erkannt", points:1},
          {id:"4c-r4", criterion:"Zusammenhang von summe und anzahl erkennbar", points:1},
          {id:"4c-r5", criterion:"Zeile 7 als Division und Rückgabe beschrieben", points:1},
          {id:"4c-r6", criterion:"Erkannt, dass durch die Gesamtzahl der Liste geteilt wird", points:1}
        ]},
      { id:"4d", operator:"Führen Sie einen Schreibtischtest durch", points:5, answerType:"code", required:true,
        prompt:"Die Liste enthält der Reihe nach folgende Behandlungen:\n(1) Status \"erbracht\", 30 Minuten\n(2) Status \"abgesagt\", 45 Minuten\n(3) Status \"erbracht\", 20 Minuten\n\naa) Geben Sie den Rückgabewert der Funktion für diese Daten an und begründen Sie ihn.\nab) Nennen Sie den vorliegenden Fehler und geben Sie die korrigierte Zeile 7 vollständig an.\nac) Nennen Sie einen Sonderfall, der bei der korrigierten Zeile zu einem Laufzeitfehler führen würde.",
        minRequirements:"Rückgabewert mit Begründung, korrigierte Zeile, Sonderfall",
        fallbackValue:null,
        solution:"aa) summe = 30 + 20 = 50, anzahl = 2, liste.anzahl() = 3.\nRückgabewert: 50 / 3 = 16,67 (rund 16,7 Minuten).\nKorrekt wären 50 / 2 = 25 Minuten. Die abgesagte Behandlung wird zwar nicht aufsummiert, fließt aber trotzdem in den Nenner ein.\n\nab) Fehler: In Zeile 7 wird durch die Gesamtzahl aller Listeneinträge geteilt statt durch die Anzahl der erbrachten (semantischer Fehler).\nKorrigierte Zeile 7:\nRÜCKGABE summe / anzahl\n\nac) Enthält die Liste keine einzige erbrachte Behandlung, bleibt anzahl auf 0. Die Division durch null führt zum Laufzeitfehler. Abhilfe: vorher prüfen, ob anzahl größer als 0 ist.",
        rubric:[
          {id:"4d-r1", criterion:"Rückgabewert rund 16,7 (50/3) korrekt ermittelt", points:1},
          {id:"4d-r2", criterion:"Nachvollziehbarer Ablauf über die drei Datensätze (summe 50, anzahl 2)", points:1},
          {id:"4d-r3", criterion:"Falscher Nenner als Fehlerursache benannt", points:1},
          {id:"4d-r4", criterion:"Korrigierte Zeile 7: RÜCKGABE summe / anzahl", points:1},
          {id:"4d-r5", criterion:"Division durch null bei anzahl = 0 als Sonderfall genannt", points:1}
        ]}
    ]
  }
  ]
},
{
  examId: "AP1-SIM-02",
  title: "AP1-Prüfungssimulation 02 — Kanzlei und Beratung",
  branche: "Steuerkanzlei",
  durationMinutes: 90,
  maxPoints: 100,
  disclaimer: "Unverbindliche Übungssimulation. Keine offizielle IHK-Prüfung und keine verbindliche Bewertung.",
  scenario: "Die Kanzlei Nordlicht Steuerberatung in Osnabrück betreut mit 14 Beschäftigten rund 400 Mandate. Belege werden bisher überwiegend in Papierform bearbeitet. Die Kanzleileitung will die Arbeitsplätze erneuern, das Netz sauber trennen und ein digitales Mandantenportal einführen. Sie unterstützen als IT-Fachkraft die Umsetzung.",
  tasks: [
  {
    id: "1", title: "Beschaffung und Arbeitsplatzsysteme", points: 25,
    context: "Für die Sachbearbeitung sollen 9 Notebooks beschafft werden. Drei Angebote liegen vor. Bewertet wird nach Preis (Gewichtung 45 %), Displayqualität (30 %) und Garantieumfang (25 %) auf einer Skala von 1 bis 10.\n\nBewertungen:\nAnbieter Nord — Preis 7, Display 8, Garantie 6\nAnbieter Süd — Preis 9, Display 5, Garantie 7\nAnbieter West — Preis 6, Display 9, Garantie 8",
    subtasks: [
      { id:"1a", operator:"Berechnen Sie", points:6, answerType:"number_with_working", required:true,
        prompt:"Ermitteln Sie mit einer Nutzwertanalyse den Gesamtnutzwert je Anbieter und benennen Sie den Sieger. Geben Sie den Rechenweg an.",
        minRequirements:"Teilnutzwerte, Gesamtnutzwert je Anbieter, Entscheidung",
        fallbackValue:"Anbieter West mit 7,40 Punkten",
        solution:"Teilnutzwert = Gewichtung × Bewertung.\nNord: 0,45×7 = 3,15 | 0,30×8 = 2,40 | 0,25×6 = 1,50 → 7,05\nSüd: 0,45×9 = 4,05 | 0,30×5 = 1,50 | 0,25×7 = 1,75 → 7,30\nWest: 0,45×6 = 2,70 | 0,30×9 = 2,70 | 0,25×8 = 2,00 → 7,40\nAnbieter West erreicht mit 7,40 Punkten den höchsten Nutzwert.",
        rubric:[
          {id:"s2-1a-r1", criterion:"Ansatz Gewichtung × Bewertung erkennbar", points:1},
          {id:"s2-1a-r2", criterion:"Gesamtnutzwert Nord korrekt (7,05)", points:1},
          {id:"s2-1a-r3", criterion:"Gesamtnutzwert Süd korrekt (7,30)", points:1},
          {id:"s2-1a-r4", criterion:"Gesamtnutzwert West korrekt (7,40)", points:1},
          {id:"s2-1a-r5", criterion:"Anbieter West als Sieger benannt", points:1},
          {id:"s2-1a-r6", criterion:"Rechenweg nachvollziehbar dargestellt", points:1}
        ]},
      { id:"1b", operator:"Berechnen Sie", points:6, answerType:"number_with_working", required:true,
        prompt:"Der gewählte Anbieter verlangt 1.180,00 EUR netto je Notebook. Bei Abnahme von 9 Stück gewährt er 5 % Rabatt, bei Zahlung innerhalb von 14 Tagen zusätzlich 3 % Skonto. Ermitteln Sie den Bruttobetrag bei Skontonutzung (Umsatzsteuersatz 19 %). Runden Sie kaufmännisch auf zwei Nachkommastellen und geben Sie die Einheit an.",
        minRequirements:"Listenpreis, Rabatt, Skonto, Umsatzsteuer, Endbetrag mit Einheit",
        fallbackValue:"11.645,73 EUR",
        solution:"9 × 1.180,00 EUR = 10.620,00 EUR\nRabatt 5 %: 10.620,00 × 0,05 = 531,00 EUR → 10.089,00 EUR\nSkonto 3 %: 10.089,00 × 0,03 = 302,67 EUR → 9.786,33 EUR netto\nUmsatzsteuer 19 %: 9.786,33 × 0,19 = 1.859,40 EUR\nBruttobetrag: 11.645,73 EUR",
        rubric:[
          {id:"s2-1b-r1", criterion:"Listenpreis 10.620,00 EUR korrekt", points:1},
          {id:"s2-1b-r2", criterion:"Rabatt korrekt abgezogen (10.089,00 EUR)", points:1},
          {id:"s2-1b-r3", criterion:"Skonto korrekt abgezogen (9.786,33 EUR)", points:1},
          {id:"s2-1b-r4", criterion:"Umsatzsteuer korrekt berechnet (1.859,40 EUR)", points:1},
          {id:"s2-1b-r5", criterion:"Endbetrag 11.645,73 EUR", points:1},
          {id:"s2-1b-r6", criterion:"Einheit angegeben und kaufmännisch gerundet", points:1}
        ]},
      { id:"1c", operator:"Nennen Sie", points:5, answerType:"text", required:true,
        prompt:"An jedem Arbeitsplatz sollen zwei Monitore gleichzeitig am Notebook betrieben werden. Nennen Sie drei technische Voraussetzungen dafür und erläutern Sie je Voraussetzung kurz deren Bedeutung.",
        minRequirements:"Drei Voraussetzungen mit Erläuterung",
        fallbackValue:null,
        solution:"Mögliche Voraussetzungen:\n— Ausreichend Bildausgänge am Notebook oder an einer Dockingstation (z. B. HDMI plus DisplayPort)\n— Unterstützung von Multi-Stream Transport über DisplayPort oder Thunderbolt, um mehrere Monitore über einen Anschluss zu betreiben\n— Grafikeinheit, die die gewünschte Auflösung und Bildwiederholrate auf zwei Monitoren gleichzeitig liefert\n— Passende Kabel und Adapter für die vorhandenen Monitoranschlüsse\nWeitere fachlich sinnvolle Antworten sind möglich.",
        rubric:[
          {id:"s2-1c-r1", criterion:"Erste Voraussetzung fachlich richtig", points:1},
          {id:"s2-1c-r2", criterion:"Zweite Voraussetzung fachlich richtig", points:1},
          {id:"s2-1c-r3", criterion:"Dritte Voraussetzung fachlich richtig", points:1},
          {id:"s2-1c-r4", criterion:"Mindestens zwei Erläuterungen inhaltlich passend", points:1},
          {id:"s2-1c-r5", criterion:"Bezug zum Zwei-Monitor-Betrieb erkennbar", points:1}
        ]},
      { id:"1d", operator:"Erläutern Sie", points:4, answerType:"text", required:true,
        prompt:"In der Kanzlei dürfen Beschäftigte nur die Mandate einsehen, die ihnen zugewiesen sind. Erläutern Sie, wie eine rollenbasierte Zugriffssteuerung dies umsetzt, und nennen Sie einen Vorteil gegenüber einer Rechtevergabe an einzelne Personen.",
        minRequirements:"Prinzip erklärt, Umsetzung im Szenario, ein Vorteil",
        fallbackValue:null,
        solution:"Bei rollenbasierter Zugriffssteuerung werden Rechte nicht einzelnen Personen, sondern Rollen zugeordnet, etwa Sachbearbeitung, Lohnbuchhaltung oder Kanzleileitung. Beschäftigte erhalten eine oder mehrere Rollen und darüber genau die Rechte, die ihre Aufgabe erfordert. Zusätzlich wird der Zugriff auf die zugewiesenen Mandate eingeschränkt.\nVorteil: Beim Wechsel oder Ausscheiden einer Person muss nur die Rollenzuordnung geändert werden statt vieler Einzelrechte. Das reduziert Fehler und verhindert, dass Rechte über Jahre unbemerkt anwachsen.",
        rubric:[
          {id:"s2-1d-r1", criterion:"Rollen statt Einzelpersonen als Prinzip erklärt", points:1},
          {id:"s2-1d-r2", criterion:"Konkrete Rollen oder Mandatsbezug im Szenario", points:1},
          {id:"s2-1d-r3", criterion:"Vorteil fachlich tragfähig benannt", points:1},
          {id:"s2-1d-r4", criterion:"Bezug zur Vertraulichkeit der Mandantendaten", points:1}
        ]},
      { id:"1e", operator:"Beschreiben Sie", points:4, answerType:"text", required:true,
        prompt:"Die Notebooks werden auch im Außendienst bei Mandanten eingesetzt. Beschreiben Sie zwei technische Maßnahmen, die die Mandantendaten bei Verlust oder Diebstahl schützen.",
        minRequirements:"Zwei Maßnahmen mit Wirkung",
        fallbackValue:null,
        solution:"Mögliche Maßnahmen:\n— Vollverschlüsselung der Festplatte: ohne Anmeldeinformationen sind die Daten nicht lesbar\n— Mehr-Faktor-Authentifizierung bei der Anmeldung\n— Zentrale Geräteverwaltung mit Fernlöschung\n— Automatische Bildschirmsperre nach kurzer Inaktivität\n— Kein lokaler Datenbestand, Zugriff nur über gesicherte Verbindung auf den Kanzleiserver\nWeitere sinnvolle Antworten sind möglich.",
        rubric:[
          {id:"s2-1e-r1", criterion:"Erste Maßnahme technisch korrekt", points:1},
          {id:"s2-1e-r2", criterion:"Wirkung der ersten Maßnahme erklärt", points:1},
          {id:"s2-1e-r3", criterion:"Zweite Maßnahme technisch korrekt", points:1},
          {id:"s2-1e-r4", criterion:"Wirkung der zweiten Maßnahme erklärt", points:1}
        ]}
    ]
  },
  {
    id: "2", title: "Netzwerk und Projektplanung", points: 25,
    context: "Das Kanzleinetz wird neu aufgeteilt. Zur Verfügung steht das private Netz 172.16.30.0/24. Es sollen acht gleich große Teilnetze gebildet werden, unter anderem für Sachbearbeitung, Lohnbuchhaltung, Empfang und Gästezugang. Je Teilnetz werden höchstens 25 Endgeräte erwartet.",
    subtasks: [
      { id:"2a", operator:"Ermitteln Sie", points:8, answerType:"number_with_working", required:true,
        prompt:"Ermitteln Sie die passende Präfixlänge und geben Sie für das fünfte Teilnetz Netzadresse, erste und letzte nutzbare Hostadresse, Broadcastadresse sowie die Anzahl nutzbarer Hostadressen an. Geben Sie den Rechenweg an.",
        minRequirements:"Präfix, vier Adressen, Hostanzahl, Rechenweg",
        fallbackValue:"/27, Netz 172.16.30.128",
        solution:"Acht Teilnetze benötigen 3 geliehene Bits: 2³ = 8. Aus /24 wird /27.\nHostbits: 32 − 27 = 5 → 2⁵ − 2 = 30 nutzbare Hostadressen, ausreichend für 25 Geräte.\nSprungweite: 256 − 224 = 32.\nTeilnetze: .0 | .32 | .64 | .96 | .128 | .160 | .192 | .224\nFünftes Teilnetz:\nNetzadresse 172.16.30.128\nErster Host 172.16.30.129\nLetzter Host 172.16.30.158\nBroadcast 172.16.30.159\nNutzbare Hostadressen: 30",
        rubric:[
          {id:"s2-2a-r1", criterion:"Präfix /27 korrekt ermittelt", points:1},
          {id:"s2-2a-r2", criterion:"Begründung über geliehene Bits oder Hostbedarf", points:1},
          {id:"s2-2a-r3", criterion:"Sprungweite 32 erkannt", points:1},
          {id:"s2-2a-r4", criterion:"Netzadresse 172.16.30.128", points:1},
          {id:"s2-2a-r5", criterion:"Erste Hostadresse 172.16.30.129", points:1},
          {id:"s2-2a-r6", criterion:"Letzte Hostadresse 172.16.30.158", points:1},
          {id:"s2-2a-r7", criterion:"Broadcastadresse 172.16.30.159", points:1},
          {id:"s2-2a-r8", criterion:"30 nutzbare Hostadressen", points:1}
        ]},
      { id:"2b", operator:"Beschreiben Sie", points:5, answerType:"text", required:true,
        prompt:"Ein Arbeitsplatz erreicht den Kanzleiserver über dessen IP-Adresse problemlos, über den Servernamen jedoch nicht. Benennen Sie die wahrscheinliche Ursache und beschreiben Sie drei Prüfschritte zur Eingrenzung.",
        minRequirements:"Ursache benannt, drei Prüfschritte",
        fallbackValue:null,
        solution:"Wahrscheinliche Ursache: Die Namensauflösung funktioniert nicht. Da die Verbindung über die IP-Adresse gelingt, sind Verkabelung, Adressvergabe und Routing in Ordnung; der Fehler liegt beim DNS.\nPrüfschritte, zum Beispiel:\n1. Konfigurierten DNS-Server am Client prüfen (ipconfig /all beziehungsweise ip a und resolv.conf).\n2. Namensauflösung gezielt testen (nslookup servername oder dig servername) und prüfen, ob eine Antwort kommt.\n3. Prüfen, ob der Eintrag auf dem DNS-Server existiert und korrekt ist; ergänzend lokalen DNS-Cache leeren.",
        rubric:[
          {id:"s2-2b-r1", criterion:"Namensauflösung als Fehlerbereich erkannt", points:1},
          {id:"s2-2b-r2", criterion:"Begründung über funktionierende IP-Verbindung", points:1},
          {id:"s2-2b-r3", criterion:"Erster Prüfschritt sinnvoll", points:1},
          {id:"s2-2b-r4", criterion:"Zweiter Prüfschritt sinnvoll (nslookup oder dig)", points:1},
          {id:"s2-2b-r5", criterion:"Dritter Prüfschritt sinnvoll", points:1}
        ]},
      { id:"2c", operator:"Erläutern Sie", points:5, answerType:"text", required:true,
        prompt:"Die Kanzlei will IPv6 einführen, ohne IPv4 sofort abzuschalten. Erläutern Sie die Übergangstechniken Dual-Stack und Tunneling und nennen Sie je einen Vorteil oder Nachteil.",
        minRequirements:"Beide Techniken erklärt, je ein Vor- oder Nachteil",
        fallbackValue:null,
        solution:"Dual-Stack: Geräte und Netzkomponenten betreiben IPv4 und IPv6 gleichzeitig und wählen je nach Gegenstelle das passende Protokoll. Vorteil: keine Kapselung nötig, volle Funktion beider Protokolle. Nachteil: doppelter Konfigurations- und Pflegeaufwand, zwei Regelwerke in der Firewall.\nTunneling: IPv6-Pakete werden in IPv4-Pakete verpackt und über bestehende IPv4-Strecken transportiert. Vorteil: IPv6-Inseln lassen sich verbinden, ohne die Zwischenstrecke umzustellen. Nachteil: zusätzlicher Overhead, höhere Fehleranfälligkeit und schwierigere Fehlersuche.",
        rubric:[
          {id:"s2-2c-r1", criterion:"Dual-Stack als paralleler Betrieb beider Protokolle erklärt", points:1},
          {id:"s2-2c-r2", criterion:"Vor- oder Nachteil zu Dual-Stack genannt", points:1},
          {id:"s2-2c-r3", criterion:"Tunneling als Kapselung erklärt", points:1},
          {id:"s2-2c-r4", criterion:"Vor- oder Nachteil zu Tunneling genannt", points:1},
          {id:"s2-2c-r5", criterion:"Beide Techniken klar voneinander abgegrenzt", points:1}
        ]},
      { id:"2d", operator:"Modellieren Sie", points:7, answerType:"diagram_text", required:true,
        prompt:"Die Belegfreigabe im Mandantenportal soll als Prozess modelliert werden:\nEin Mandant lädt einen Beleg hoch. Das System prüft automatisch, ob die Datei lesbar ist. Ist sie es nicht, wird der Mandant zur erneuten Aufnahme aufgefordert und der Vorgang endet. Ist sie lesbar, prüft eine Fachkraft den Beleg inhaltlich. Bei Beanstandung geht der Beleg mit Hinweis an den Mandanten zurück. Ohne Beanstandung wird der Beleg gleichzeitig gebucht und archiviert. Erst wenn beides abgeschlossen ist, endet der Vorgang.\n\nBeschreiben Sie diesen Ablauf als Aktivitätsdiagramm. Benennen Sie Start- und Endknoten, alle Aktivitäten, die Entscheidungsknoten mit ihren Bedingungen sowie die parallele Verarbeitung. Eine textliche Darstellung mit Pfeilen ist zulässig.",
        minRequirements:"Start, Aktivitäten, zwei Entscheidungen mit Bedingungen, Parallelisierung, Endknoten",
        fallbackValue:null,
        solution:"Beispielhafte textliche Darstellung:\nStartknoten\n→ Aktivität: Beleg hochladen\n→ Aktivität: automatische Lesbarkeitsprüfung\n→ Entscheidungsknoten: lesbar?\n   [nein] → Aktivität: Mandant zur erneuten Aufnahme auffordern → Endknoten\n   [ja] → Aktivität: inhaltliche Prüfung durch Fachkraft\n→ Entscheidungsknoten: beanstandet?\n   [ja] → Aktivität: Rückgabe mit Hinweis an Mandanten → Endknoten\n   [nein] → Parallelisierung (Splitting)\n        ├ Aktivität: Beleg buchen\n        └ Aktivität: Beleg archivieren\n     → Synchronisation (Join), wenn beide Zweige fertig sind\n→ Endknoten\n\nWichtig: Die Parallelisierung wird durch einen Synchronisationsbalken geöffnet und wieder geschlossen; der Vorgang endet erst, wenn beide Zweige abgeschlossen sind.",
        rubric:[
          {id:"s2-2d-r1", criterion:"Startknoten und mindestens ein Endknoten vorhanden", points:1},
          {id:"s2-2d-r2", criterion:"Aktivität Hochladen und automatische Prüfung enthalten", points:1},
          {id:"s2-2d-r3", criterion:"Entscheidungsknoten lesbar mit beiden Bedingungen", points:1},
          {id:"s2-2d-r4", criterion:"Aktivität inhaltliche Prüfung durch Fachkraft enthalten", points:1},
          {id:"s2-2d-r5", criterion:"Entscheidungsknoten Beanstandung mit beiden Bedingungen", points:1},
          {id:"s2-2d-r6", criterion:"Buchen und Archivieren als parallele Zweige dargestellt", points:1},
          {id:"s2-2d-r7", criterion:"Zusammenführung der Parallelzweige vor dem Ende erkennbar", points:1}
        ]}
    ]
  },
  {
    id: "3", title: "Digitalisierung, Datenschutz und IT-Sicherheit", points: 25,
    context: "Über das neue Mandantenportal sollen Mandanten Belege hochladen und Auswertungen abrufen. Der Betrieb erfolgt bei einem deutschen Anbieter.",
    subtasks: [
      { id:"3a", operator:"Begründen Sie", points:6, answerType:"text", required:true,
        prompt:"Die Kanzlei beauftragt einen externen Anbieter mit dem Betrieb des Portals. Begründen Sie, welche vertragliche Vereinbarung nach der DSGVO dafür erforderlich ist, und nennen Sie drei Punkte, die darin geregelt sein müssen.",
        minRequirements:"Vertragsart benannt und begründet, drei Regelungspunkte",
        fallbackValue:null,
        solution:"Erforderlich ist ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. Der Anbieter verarbeitet personenbezogene Mandantendaten weisungsgebunden im Auftrag der Kanzlei; die Kanzlei bleibt als Verantwortliche für die Rechtmäßigkeit zuständig.\nZu regeln sind unter anderem:\n— Gegenstand, Dauer, Art und Zweck der Verarbeitung sowie Kategorien betroffener Personen\n— Weisungsbindung des Auftragsverarbeiters\n— Technische und organisatorische Maßnahmen\n— Regelungen zu Unterauftragsverhältnissen\n— Unterstützung bei Betroffenenrechten und Meldepflichten\n— Löschung oder Rückgabe der Daten nach Vertragsende",
        rubric:[
          {id:"s2-3a-r1", criterion:"Auftragsverarbeitung als Vertragsart benannt", points:1},
          {id:"s2-3a-r2", criterion:"Art. 28 DSGVO oder gleichwertige Grundlage genannt", points:1},
          {id:"s2-3a-r3", criterion:"Weisungsbindung oder Verantwortlichkeit erläutert", points:1},
          {id:"s2-3a-r4", criterion:"Erster Regelungspunkt korrekt", points:1},
          {id:"s2-3a-r5", criterion:"Zweiter Regelungspunkt korrekt", points:1},
          {id:"s2-3a-r6", criterion:"Dritter Regelungspunkt korrekt", points:1}
        ]},
      { id:"3b", operator:"Beschreiben Sie", points:5, answerType:"text", required:true,
        prompt:"Die Belegerfassung bindet monatlich viele Arbeitsstunden. Beschreiben Sie eine sinnvolle Automatisierungs- oder KI-Anwendung zur Entlastung und nennen Sie zwei Grenzen oder Risiken.",
        minRequirements:"Anwendung beschrieben, zwei Grenzen oder Risiken",
        fallbackValue:null,
        solution:"Anwendung, zum Beispiel: automatische Texterkennung der hochgeladenen Belege mit anschließender Vorkontierung. Das System liest Rechnungsdatum, Betrag, Steuersatz und Lieferant aus und schlägt ein Buchungskonto vor; die Fachkraft prüft und bestätigt nur noch.\nGrenzen und Risiken, zum Beispiel:\n— Erkennungsfehler bei schlechter Belegqualität oder ungewöhnlichen Formaten\n— Falsche Vorkontierungen werden bei blindem Vertrauen übernommen, daher bleibt eine fachliche Prüfung nötig\n— Verarbeitung personenbezogener Daten erfordert Rechtsgrundlage und geeignete Schutzmaßnahmen\n— Abhängigkeit vom Anbieter und dessen Modellpflege",
        rubric:[
          {id:"s2-3b-r1", criterion:"Anwendung konkret und zum Problem passend", points:1},
          {id:"s2-3b-r2", criterion:"Entlastungswirkung erkennbar beschrieben", points:1},
          {id:"s2-3b-r3", criterion:"Erste Grenze oder Risiko fachlich korrekt", points:1},
          {id:"s2-3b-r4", criterion:"Zweite Grenze oder Risiko fachlich korrekt", points:1},
          {id:"s2-3b-r5", criterion:"Notwendigkeit fachlicher Kontrolle oder Datenschutz berücksichtigt", points:1}
        ]},
      { id:"3c", operator:"Erläutern Sie", points:6, answerType:"text", required:true,
        prompt:"Der Zugang zum Mandantenportal erfolgt über HTTPS. Erläutern Sie, warum dabei ein hybrides Verfahren aus asymmetrischer und symmetrischer Verschlüsselung eingesetzt wird, und beschreiben Sie den Ablauf in seinen wesentlichen Schritten.",
        minRequirements:"Begründung des Hybridverfahrens, Ablauf in Schritten",
        fallbackValue:null,
        solution:"Asymmetrische Verfahren erlauben einen sicheren Schlüsselaustausch ohne vorher geteiltes Geheimnis, sind aber rechenintensiv und für große Datenmengen zu langsam. Symmetrische Verfahren sind schnell, setzen jedoch einen gemeinsamen Schlüssel voraus. Das Hybridverfahren verbindet beide Stärken.\nAblauf:\n1. Der Server weist sich mit seinem Zertifikat aus; der Client prüft es gegen die Zertifizierungsstelle.\n2. Über das asymmetrische Verfahren wird ein gemeinsamer Sitzungsschlüssel ausgehandelt beziehungsweise sicher übertragen.\n3. Die eigentliche Datenübertragung wird mit diesem symmetrischen Sitzungsschlüssel verschlüsselt.\n4. Der Sitzungsschlüssel gilt nur für diese Verbindung und wird danach verworfen.",
        rubric:[
          {id:"s2-3c-r1", criterion:"Asymmetrisch als langsam, aber für Schlüsselaustausch geeignet", points:1},
          {id:"s2-3c-r2", criterion:"Symmetrisch als schnell für die Nutzdaten", points:1},
          {id:"s2-3c-r3", criterion:"Zertifikatsprüfung des Servers genannt", points:1},
          {id:"s2-3c-r4", criterion:"Aushandlung eines Sitzungsschlüssels beschrieben", points:1},
          {id:"s2-3c-r5", criterion:"Nutzdatenverschlüsselung mit Sitzungsschlüssel", points:1},
          {id:"s2-3c-r6", criterion:"Begründung des Hybridverfahrens schlüssig", points:1}
        ]},
      { id:"3d", operator:"Berechnen Sie", points:8, answerType:"number_with_working", required:true,
        prompt:"Der Anbieter sichert im Service Level Agreement eine Verfügbarkeit von 99,5 % pro Jahr zu. Ein Ausfall des Portals kostet die Kanzlei durchschnittlich 250,00 EUR je Stunde. Rechnen Sie mit 365 Tagen à 24 Stunden.\n\naa) Berechnen Sie die maximal zulässige Ausfallzeit pro Jahr in Stunden.\nab) Berechnen Sie den daraus höchstens entstehenden Ausfallschaden in EUR.\nac) Der Anbieter bietet gegen Aufpreis 99,9 % an. Berechnen Sie, um wie viele Stunden sich die zulässige Ausfallzeit dadurch verringert.\n\nGeben Sie bei allen Ergebnissen die Einheit an.",
        minRequirements:"Drei Ergebnisse mit Rechenweg und Einheit",
        fallbackValue:"43,8 Stunden",
        solution:"Jahresstunden: 365 × 24 = 8.760 h\n\naa) Ausfallanteil: 100 % − 99,5 % = 0,5 %\n8.760 h × 0,005 = 43,8 h\n\nab) 43,8 h × 250,00 EUR/h = 10.950,00 EUR\n\nac) Bei 99,9 %: 8.760 h × 0,001 = 8,76 h\nVerringerung: 43,8 h − 8,76 h = 35,04 h",
        rubric:[
          {id:"s2-3d-r1", criterion:"Jahresstunden 8.760 h korrekt ermittelt", points:1},
          {id:"s2-3d-r2", criterion:"Ausfallanteil 0,5 % erkannt", points:1},
          {id:"s2-3d-r3", criterion:"Ergebnis aa) 43,8 Stunden", points:1},
          {id:"s2-3d-r4", criterion:"Multiplikation mit dem Stundensatz angesetzt", points:1},
          {id:"s2-3d-r5", criterion:"Ergebnis ab) 10.950,00 EUR", points:1},
          {id:"s2-3d-r6", criterion:"Ausfallzeit bei 99,9 % = 8,76 h", points:1},
          {id:"s2-3d-r7", criterion:"Differenz 35,04 Stunden", points:1},
          {id:"s2-3d-r8", criterion:"Alle Einheiten angegeben", points:1}
        ]}
    ]
  },
  {
    id: "4", title: "Software und Daten", points: 25,
    context: "Für die Kanzlei wird eine Anwendung zur Belegverwaltung entwickelt. Zu verwalten sind Mandanten, Belege und die bearbeitenden Beschäftigten.",
    subtasks: [
      { id:"4a", operator:"Modellieren Sie", points:7, answerType:"diagram_text", required:true,
        prompt:"Beschreiben Sie ein UML-Klassendiagramm mit den Klassen Mandant, Beleg und Mitarbeiter. Geben Sie je Klasse mindestens zwei Attribute mit Sichtbarkeit und Datentyp, je eine Methode sowie die Beziehungen mit Multiplizitäten an. Eine textliche Darstellung ist zulässig.",
        minRequirements:"Drei Klassen mit Attributen, Sichtbarkeiten, Methoden, Beziehungen mit Multiplizitäten",
        fallbackValue:null,
        solution:"Beispiel:\nMandant\n- mandantenNr : Integer\n- name : String\n+ getMandantenNr() : Integer\n\nMitarbeiter\n- personalNr : Integer\n- rolle : String\n+ getRolle() : String\n\nBeleg\n- belegNr : Integer\n- datum : Date\n- betrag : Double\n+ getBetrag() : Double\n\nBeziehungen:\nMandant 1 — 0..* Beleg (ein Mandant reicht beliebig viele Belege ein, jeder Beleg gehört zu genau einem Mandanten)\nMitarbeiter 1 — 0..* Beleg (ein Mitarbeiter bearbeitet beliebig viele Belege)\nSichtbarkeiten: − private, + public.\nAndere fachlich sinnvolle Modellierungen sind möglich.",
        rubric:[
          {id:"s2-4a-r1", criterion:"Drei Klassen mit passenden Namen", points:1},
          {id:"s2-4a-r2", criterion:"Je Klasse mindestens zwei Attribute mit Datentyp", points:1},
          {id:"s2-4a-r3", criterion:"Sichtbarkeiten korrekt notiert (+ / −)", points:1},
          {id:"s2-4a-r4", criterion:"Je Klasse mindestens eine Methode", points:1},
          {id:"s2-4a-r5", criterion:"Beziehung Mandant–Beleg modelliert", points:1},
          {id:"s2-4a-r6", criterion:"Beziehung Mitarbeiter–Beleg modelliert", points:1},
          {id:"s2-4a-r7", criterion:"Multiplizitäten fachlich korrekt", points:1}
        ]},
      { id:"4b", operator:"Vervollständigen Sie", points:7, answerType:"table", required:true,
        prompt:"Überführen Sie das Modell in ein relationales Datenmodell. Geben Sie für die drei Tabellen jeweils die Spalten an und kennzeichnen Sie Primärschlüssel mit PK und Fremdschlüssel mit FK. Erläutern Sie zusätzlich in einem Satz, wozu der Fremdschlüssel in der Belegtabelle dient.",
        minRequirements:"Drei Tabellen mit Spalten, PK- und FK-Kennzeichnung, Erläuterung",
        fallbackValue:null,
        solution:"Mandant(mandantenNr PK, name, anschrift)\nMitarbeiter(personalNr PK, name, rolle)\nBeleg(belegNr PK, datum, betrag, mandantenNr FK → Mandant, personalNr FK → Mitarbeiter)\n\nErläuterung: Der Fremdschlüssel verweist auf den Primärschlüssel der zugehörigen Tabelle und stellt so die Verbindung her; er sichert zugleich die referenzielle Integrität, sodass kein Beleg auf einen nicht vorhandenen Mandanten zeigen kann.",
        rubric:[
          {id:"s2-4b-r1", criterion:"Tabelle Mandant mit Primärschlüssel", points:1},
          {id:"s2-4b-r2", criterion:"Tabelle Mitarbeiter mit Primärschlüssel", points:1},
          {id:"s2-4b-r3", criterion:"Tabelle Beleg mit Primärschlüssel", points:1},
          {id:"s2-4b-r4", criterion:"Fremdschlüssel auf Mandant korrekt", points:1},
          {id:"s2-4b-r5", criterion:"Fremdschlüssel auf Mitarbeiter korrekt", points:1},
          {id:"s2-4b-r6", criterion:"PK und FK eindeutig gekennzeichnet", points:1},
          {id:"s2-4b-r7", criterion:"Erläuterung zur Verknüpfung oder referenziellen Integrität", points:1}
        ]},
      { id:"4c", operator:"Beschreiben Sie", points:6, answerType:"code", required:true,
        prompt:"Gegeben ist folgender Pseudocode. Er soll den Rabattsatz in Prozent zurückgeben. Ab einem Rechnungsbetrag von 1.000,00 EUR sollen 10 Prozent gelten, ab 500,00 EUR 5 Prozent, darunter kein Rabatt.\n\n1  WENN betrag > 1000 DANN\n2      rabatt = 10\n3  SONST WENN betrag > 500 DANN\n4      rabatt = 5\n5  SONST\n6      rabatt = 0\n7  RÜCKGABE rabatt\n\nBeschreiben Sie die Aufgabe der Zeilen 1, 3 und 5 in eigenen Worten.",
        minRequirements:"Drei Zeilen inhaltlich zutreffend beschrieben",
        fallbackValue:null,
        solution:"Zeile 1: Prüft, ob der übergebene Betrag größer als 1000 ist. Trifft das zu, wird der höchste Rabattsatz gesetzt und die weiteren Prüfungen werden übersprungen.\nZeile 3: Wird nur erreicht, wenn die erste Bedingung nicht zutraf. Sie prüft, ob der Betrag größer als 500 ist, und setzt dann den mittleren Rabattsatz.\nZeile 5: Auffangzweig für alle übrigen Fälle; hier wird kein Rabatt gewährt.\nAndere Formulierungen sind möglich.",
        rubric:[
          {id:"s2-4c-r1", criterion:"Zeile 1 als Prüfung der oberen Betragsgrenze beschrieben", points:1},
          {id:"s2-4c-r2", criterion:"Erkannt, dass bei Zutreffen die weiteren Zweige entfallen", points:1},
          {id:"s2-4c-r3", criterion:"Zeile 3 als zweite Prüfstufe beschrieben", points:1},
          {id:"s2-4c-r4", criterion:"Erkannt, dass Zeile 3 nur bei nicht erfüllter erster Bedingung greift", points:1},
          {id:"s2-4c-r5", criterion:"Zeile 5 als Auffangzweig beschrieben", points:1},
          {id:"s2-4c-r6", criterion:"Beschreibung insgesamt fachlich korrekt formuliert", points:1}
        ]},
      { id:"4d", operator:"Führen Sie einen Schreibtischtest durch", points:5, answerType:"code", required:true,
        prompt:"Getestet werden die Beträge 1.200,00 EUR, 1.000,00 EUR und 500,00 EUR.\n\naa) Geben Sie für jeden der drei Beträge den Rückgabewert der Funktion an.\nab) Benennen Sie den vorliegenden Fehler und geben Sie die korrigierten Zeilen 1 und 3 vollständig an.",
        minRequirements:"Drei Rückgabewerte, Fehlerbenennung, korrigierte Zeilen",
        fallbackValue:null,
        solution:"aa)\n1.200,00 EUR → 10 (korrekt)\n1.000,00 EUR → 5 (falsch, erwartet werden 10)\n500,00 EUR → 0 (falsch, erwartet werden 5)\n\nab) Fehler: Es wird jeweils auf \"größer als\" statt auf \"größer oder gleich\" geprüft. Dadurch fallen genau die Grenzwerte 1000 und 500 in die falsche Stufe (Grenzwertfehler).\nKorrigierte Zeilen:\nZeile 1: WENN betrag >= 1000 DANN\nZeile 3: SONST WENN betrag >= 500 DANN",
        rubric:[
          {id:"s2-4d-r1", criterion:"Rückgabewert für 1.200 EUR korrekt (10)", points:1},
          {id:"s2-4d-r2", criterion:"Rückgabewert für 1.000 EUR korrekt (5) als falsch erkannt", points:1},
          {id:"s2-4d-r3", criterion:"Rückgabewert für 500 EUR korrekt (0) als falsch erkannt", points:1},
          {id:"s2-4d-r4", criterion:"Grenzwertfehler bei den Vergleichsoperatoren benannt", points:1},
          {id:"s2-4d-r5", criterion:"Korrektur auf >= in beiden Zeilen angegeben", points:1}
        ]}
    ]
  }
  ]
},
{
  examId: "AP1-SIM-03",
  title: "AP1-Prüfungssimulation 03 — Logistik und Handel",
  branche: "Logistikdienstleister",
  durationMinutes: 90,
  maxPoints: 100,
  disclaimer: "Unverbindliche Übungssimulation. Keine offizielle IHK-Prüfung und keine verbindliche Bewertung.",
  scenario: "Die Weserfracht GmbH in Bremen betreibt ein Umschlaglager mit 60 Beschäftigten und beliefert Filialen im gesamten Nordwesten. Die Lagerverwaltung läuft noch auf einem veralteten System, Wareneingänge werden teils auf Papier erfasst. Sie arbeiten in der IT-Abteilung und begleiten die Modernisierung von Beschaffung, Netz und Lagersoftware.",
  tasks: [
  {
    id: "1", title: "Beschaffung, Belegprüfung und Vertragsstörungen", points: 25,
    context: "Für die Kommissionierung wurden 20 Handscanner bestellt. Der Vorgang ist wie folgt dokumentiert:\n\n04.03.2026 Bestellung über 20 Handscanner zu je 315,00 EUR netto, Lieferung zugesagt bis 18.03.2026\n25.03.2026 Wareneingang, Lieferschein weist 20 Stück aus\n26.03.2026 Rechnungseingang über 18 Stück zu je 315,00 EUR netto\n27.03.2026 Zählung im Wareneingang ergibt 18 tatsächlich gelieferte Geräte",
    subtasks: [
      { id:"1a", operator:"Nennen Sie", points:5, answerType:"table", required:true,
        prompt:"Beim Abgleich der Belege sind Abweichungen aufgefallen. Nennen Sie drei Prüfungen, die im Rahmen einer sachlichen Rechnungsprüfung durchzuführen sind, und benennen Sie zusätzlich die konkrete Abweichung, die sich aus dem obigen Vorgang ergibt.",
        minRequirements:"Drei Prüfschritte und die konkrete Abweichung",
        fallbackValue:null,
        solution:"Prüfungen bei der sachlichen Rechnungsprüfung, zum Beispiel:\n— Abgleich der Artikelbezeichnung zwischen Bestellung, Lieferschein und Rechnung\n— Abgleich der Menge zwischen Lieferschein, tatsächlicher Zählung und Rechnung\n— Prüfung des Einzelpreises gegen den bestellten beziehungsweise vereinbarten Preis\n— Prüfung des Umsatzsteuersatzes und der Rechenrichtigkeit\n\nKonkrete Abweichung: Der Lieferschein weist 20 Stück aus, tatsächlich geliefert und berechnet wurden aber nur 18 Stück. Die Rechnung stimmt mit der Zählung überein, der Lieferschein nicht. Es liegt eine Mindermenge gegenüber der Bestellung vor.",
        rubric:[
          {id:"s3-1a-r1", criterion:"Erste Prüfung fachlich korrekt", points:1},
          {id:"s3-1a-r2", criterion:"Zweite Prüfung fachlich korrekt", points:1},
          {id:"s3-1a-r3", criterion:"Dritte Prüfung fachlich korrekt", points:1},
          {id:"s3-1a-r4", criterion:"Abweichung Lieferschein 20 gegen tatsächlich 18 erkannt", points:1},
          {id:"s3-1a-r5", criterion:"Mindermenge gegenüber der Bestellung benannt", points:1}
        ]},
      { id:"1b", operator:"Berechnen Sie", points:6, answerType:"number_with_working", required:true,
        prompt:"Die Rechnung über die tatsächlich gelieferten 18 Handscanner zu je 315,00 EUR netto ist zu prüfen. Der Lieferant gewährt 4 % Rabatt und bei Zahlung innerhalb von 8 Tagen 2 % Skonto. Ermitteln Sie den Bruttobetrag bei Skontonutzung (Umsatzsteuersatz 19 %). Runden Sie kaufmännisch auf zwei Nachkommastellen und geben Sie die Einheit an.",
        minRequirements:"Warenwert, Rabatt, Skonto, Umsatzsteuer, Endbetrag mit Einheit",
        fallbackValue:"6.347,86 EUR",
        solution:"18 × 315,00 EUR = 5.670,00 EUR\nRabatt 4 %: 5.670,00 × 0,04 = 226,80 EUR → 5.443,20 EUR\nSkonto 2 %: 5.443,20 × 0,02 = 108,86 EUR → 5.334,34 EUR netto\nUmsatzsteuer 19 %: 5.334,34 × 0,19 = 1.013,52 EUR\nBruttobetrag: 6.347,86 EUR",
        rubric:[
          {id:"s3-1b-r1", criterion:"Warenwert 5.670,00 EUR korrekt", points:1},
          {id:"s3-1b-r2", criterion:"Rabatt korrekt abgezogen (5.443,20 EUR)", points:1},
          {id:"s3-1b-r3", criterion:"Skonto korrekt abgezogen (5.334,34 EUR)", points:1},
          {id:"s3-1b-r4", criterion:"Umsatzsteuer korrekt berechnet (1.013,52 EUR)", points:1},
          {id:"s3-1b-r5", criterion:"Endbetrag 6.347,86 EUR", points:1},
          {id:"s3-1b-r6", criterion:"Einheit angegeben und kaufmännisch gerundet", points:1}
        ]},
      { id:"1c", operator:"Erläutern Sie", points:6, answerType:"text", required:true,
        prompt:"Die Lieferung traf erst am 25.03.2026 ein, zugesagt war der 18.03.2026. Benennen Sie die vorliegende Vertragsstörung und erläutern Sie zwei Rechte, die dem Besteller in diesem Fall zustehen können.",
        minRequirements:"Vertragsstörung benannt, zwei Rechte erläutert",
        fallbackValue:null,
        solution:"Vertragsstörung: Lieferverzug (Schuldnerverzug), da der Lieferant den vereinbarten Liefertermin überschritten hat.\nMögliche Rechte des Bestellers:\n— Weiterhin auf Lieferung bestehen (Erfüllung verlangen), gegebenenfalls unter Fristsetzung\n— Ersatz des durch die Verspätung entstandenen Verzugsschadens verlangen\n— Nach erfolglosem Ablauf einer angemessenen Nachfrist vom Vertrag zurücktreten\n— Bei Fixgeschäften Rücktritt ohne Nachfrist\nWeitere fachlich richtige Antworten sind möglich.",
        rubric:[
          {id:"s3-1c-r1", criterion:"Lieferverzug als Vertragsstörung benannt", points:1},
          {id:"s3-1c-r2", criterion:"Überschreitung des vereinbarten Termins als Begründung", points:1},
          {id:"s3-1c-r3", criterion:"Erstes Recht fachlich korrekt", points:1},
          {id:"s3-1c-r4", criterion:"Erstes Recht erläutert", points:1},
          {id:"s3-1c-r5", criterion:"Zweites Recht fachlich korrekt", points:1},
          {id:"s3-1c-r6", criterion:"Zweites Recht erläutert", points:1}
        ]},
      { id:"1d", operator:"Beschreiben Sie", points:4, answerType:"text", required:true,
        prompt:"Die Handscanner verbinden sich per WLAN mit dem Lagersystem. Beschreiben Sie zwei technische Maßnahmen, die verhindern, dass sich fremde Geräte im Lager-WLAN anmelden.",
        minRequirements:"Zwei Maßnahmen mit Wirkung",
        fallbackValue:null,
        solution:"Mögliche Maßnahmen:\n— Starke WLAN-Verschlüsselung mit WPA2 oder WPA3 und langem, nicht öffentlich bekanntem Schlüssel\n— Anmeldung über 802.1X mit zentraler Benutzer- oder Geräteauthentifizierung (RADIUS)\n— Zertifikatsbasierte Geräteauthentifizierung, damit nur verwaltete Geräte Zugang erhalten\n— Trennung des Lagernetzes in ein eigenes VLAN mit eigener SSID\nHinweis: MAC-Filter und verstecktes Netz sind nur schwache Zusatzhürden.",
        rubric:[
          {id:"s3-1d-r1", criterion:"Erste Maßnahme technisch korrekt", points:1},
          {id:"s3-1d-r2", criterion:"Wirkung der ersten Maßnahme erklärt", points:1},
          {id:"s3-1d-r3", criterion:"Zweite Maßnahme technisch korrekt", points:1},
          {id:"s3-1d-r4", criterion:"Wirkung der zweiten Maßnahme erklärt", points:1}
        ]},
      { id:"1e", operator:"Begründen Sie", points:4, answerType:"text", required:true,
        prompt:"Die Geschäftsführung erwägt, statt der Handscanner deutlich günstigere Geräte ohne Sturzschutz und ohne Staubschutzklasse zu beschaffen. Begründen Sie anhand des Einsatzumfelds, warum der reine Anschaffungspreis hier keine geeignete Entscheidungsgrundlage ist.",
        minRequirements:"Argumentation über Folgekosten oder Einsatzbedingungen",
        fallbackValue:null,
        solution:"Im Umschlaglager wirken Staub, Feuchtigkeit, Temperaturschwankungen und häufige Stürze auf die Geräte ein. Ungeschützte Geräte fallen dort deutlich häufiger aus.\nMaßgeblich sind daher nicht die Anschaffungskosten, sondern die Gesamtkosten über die Nutzungsdauer: Ersatzbeschaffungen, Reparaturen, Ausfallzeiten in der Kommissionierung und der Aufwand für Support und Ersatzgerätevorhaltung. Ein günstiges Gerät mit kurzer Lebensdauer kann in Summe teurer sein als ein robusteres mit höherem Einstandspreis.",
        rubric:[
          {id:"s3-1e-r1", criterion:"Einsatzbedingungen im Lager konkret benannt", points:1},
          {id:"s3-1e-r2", criterion:"Höhere Ausfallwahrscheinlichkeit abgeleitet", points:1},
          {id:"s3-1e-r3", criterion:"Folgekosten über die Nutzungsdauer einbezogen", points:1},
          {id:"s3-1e-r4", criterion:"Schlussfolgerung fachlich tragfähig", points:1}
        ]}
    ]
  },
  {
    id: "2", title: "Netzwerk und Projektplanung", points: 25,
    context: "Das Lagernetz wird neu strukturiert. Zur Verfügung steht das private Netz 10.20.5.0/24. Benötigt werden zwei Teilnetze: eines für die Kommissionierung mit bis zu 100 Geräten, eines für die Verwaltung.",
    subtasks: [
      { id:"2a", operator:"Ermitteln Sie", points:8, answerType:"number_with_working", required:true,
        prompt:"Ermitteln Sie die passende Präfixlänge für zwei gleich große Teilnetze und geben Sie für das zweite Teilnetz Netzadresse, erste und letzte nutzbare Hostadresse, Broadcastadresse sowie die Anzahl nutzbarer Hostadressen an. Geben Sie den Rechenweg an.",
        minRequirements:"Präfix, vier Adressen, Hostanzahl, Rechenweg",
        fallbackValue:"/25, Netz 10.20.5.128",
        solution:"Zwei Teilnetze benötigen 1 geliehenes Bit: 2¹ = 2. Aus /24 wird /25.\nHostbits: 32 − 25 = 7 → 2⁷ − 2 = 126 nutzbare Hostadressen, ausreichend für 100 Geräte.\nSprungweite: 256 − 128 = 128.\nTeilnetze: .0 | .128\nZweites Teilnetz:\nNetzadresse 10.20.5.128\nErster Host 10.20.5.129\nLetzter Host 10.20.5.254\nBroadcast 10.20.5.255\nNutzbare Hostadressen: 126",
        rubric:[
          {id:"s3-2a-r1", criterion:"Präfix /25 korrekt ermittelt", points:1},
          {id:"s3-2a-r2", criterion:"Begründung über geliehenes Bit oder Hostbedarf", points:1},
          {id:"s3-2a-r3", criterion:"Sprungweite 128 erkannt", points:1},
          {id:"s3-2a-r4", criterion:"Netzadresse 10.20.5.128", points:1},
          {id:"s3-2a-r5", criterion:"Erste Hostadresse 10.20.5.129", points:1},
          {id:"s3-2a-r6", criterion:"Letzte Hostadresse 10.20.5.254", points:1},
          {id:"s3-2a-r7", criterion:"Broadcastadresse 10.20.5.255", points:1},
          {id:"s3-2a-r8", criterion:"126 nutzbare Hostadressen", points:1}
        ]},
      { id:"2b", operator:"Beschreiben Sie", points:5, answerType:"text", required:true,
        prompt:"In einem Hallenbereich brechen die Verbindungen der Handscanner regelmäßig ab, in anderen Bereichen nicht. Nennen Sie drei mögliche Ursachen und je eine passende Prüf- oder Abhilfemaßnahme.",
        minRequirements:"Drei Ursachen mit je einer Maßnahme",
        fallbackValue:null,
        solution:"Mögliche Ursachen und Maßnahmen:\n— Zu geringe Funkabdeckung in diesem Bereich: Ausleuchtung messen, zusätzlichen Access Point setzen\n— Störquellen wie Metallregale, Flurförderzeuge oder Mikrowellen: Störquellen identifizieren, Kanal oder Frequenzband wechseln\n— Kanalüberlappung mit Nachbarnetzen: Kanalbelegung analysieren und feste, überlappungsfreie Kanäle vergeben\n— Fehlendes oder fehlerhaftes Roaming zwischen Access Points: Roaming-Einstellungen und einheitliche SSID prüfen\n— Überlastung eines Access Points durch zu viele Geräte: Auslastung prüfen, Last verteilen",
        rubric:[
          {id:"s3-2b-r1", criterion:"Erste Ursache fachlich plausibel", points:1},
          {id:"s3-2b-r2", criterion:"Passende Maßnahme zur ersten Ursache", points:1},
          {id:"s3-2b-r3", criterion:"Zweite Ursache fachlich plausibel", points:1},
          {id:"s3-2b-r4", criterion:"Passende Maßnahme zur zweiten Ursache", points:1},
          {id:"s3-2b-r5", criterion:"Dritte Ursache mit Maßnahme", points:1}
        ]},
      { id:"2c", operator:"Erläutern Sie", points:5, answerType:"text", required:true,
        prompt:"Die Filialen greifen über das Internet auf das Lagersystem zu. Erläutern Sie, welche Aufgabe ein VPN dabei erfüllt, und beschreiben Sie zwei Eigenschaften, die eine solche Verbindung sicher machen.",
        minRequirements:"Aufgabe des VPN, zwei Sicherheitseigenschaften",
        fallbackValue:null,
        solution:"Ein VPN stellt über das öffentliche Internet einen abgesicherten Tunnel zwischen Filiale und Firmennetz her. Die Filiale wird dadurch so eingebunden, als wäre sie Teil des internen Netzes; der Verkehr ist für Dritte auf der Zwischenstrecke nicht einsehbar.\nSicherheitseigenschaften, zum Beispiel:\n— Verschlüsselung der übertragenen Daten (Vertraulichkeit)\n— Authentifizierung der Gegenstelle über Zertifikate oder Schlüssel, sodass sich keine fremde Stelle einklinken kann\n— Integritätsschutz, der Manipulationen am Datenstrom erkennbar macht",
        rubric:[
          {id:"s3-2c-r1", criterion:"VPN als gesicherter Tunnel über unsicheres Netz erklärt", points:1},
          {id:"s3-2c-r2", criterion:"Einbindung der Filiale ins Firmennetz beschrieben", points:1},
          {id:"s3-2c-r3", criterion:"Verschlüsselung als Eigenschaft genannt", points:1},
          {id:"s3-2c-r4", criterion:"Authentifizierung oder Integrität als zweite Eigenschaft", points:1},
          {id:"s3-2c-r5", criterion:"Wirkung der Eigenschaften erläutert", points:1}
        ]},
      { id:"2d", operator:"Ermitteln Sie", points:7, answerType:"number_with_working", required:true,
        prompt:"Für die Einführung der neuen Lagersoftware sind folgende Vorgänge geplant (Dauer in Arbeitstagen):\nA Datenübernahme vorbereiten (4), Start\nB Testsystem aufbauen (3), nach A\nC Stammdaten bereinigen (6), nach A\nD Testlauf (2), nach B\nE Schulung Lagerpersonal (4), nach C\nF Produktivsetzung (3), nach D und E\n\nErmitteln Sie die Gesamtprojektdauer, den kritischen Pfad sowie den Gesamtpuffer der Vorgänge B und D. Geben Sie den Rechenweg an.",
        minRequirements:"Vorwärts- und Rückwärtsrechnung, Dauer, kritischer Pfad, zwei Pufferwerte",
        fallbackValue:"17 Arbeitstage, kritischer Pfad A-C-E-F",
        solution:"Vorwärtsrechnung (FEZ = FAZ + Dauer, bei mehreren Vorgängern das späteste FEZ):\nA 0→4 | B 4→7 | C 4→10 | D 7→9 | E 10→14 | F: FAZ = max(9; 14) = 14 → 17\nGesamtprojektdauer: 17 Arbeitstage\nRückwärtsrechnung (SAZ = SEZ − Dauer):\nF 17→14 | D 14→12 | E 14→10 | B 12→9 | C 10→4 | A 4→0\nGesamtpuffer = SAZ − FAZ:\nA, C, E, F je 0 → kritischer Pfad A – C – E – F\nB: 9 − 4 = 5 Arbeitstage\nD: 12 − 7 = 5 Arbeitstage",
        rubric:[
          {id:"s3-2d-r1", criterion:"Vorwärtsrechnung nachvollziehbar", points:1},
          {id:"s3-2d-r2", criterion:"Bei F das spätere Vorgänger-FEZ verwendet", points:1},
          {id:"s3-2d-r3", criterion:"Gesamtprojektdauer 17 Arbeitstage", points:1},
          {id:"s3-2d-r4", criterion:"Rückwärtsrechnung nachvollziehbar", points:1},
          {id:"s3-2d-r5", criterion:"Kritischer Pfad A-C-E-F", points:1},
          {id:"s3-2d-r6", criterion:"Gesamtpuffer B = 5 Tage", points:1},
          {id:"s3-2d-r7", criterion:"Gesamtpuffer D = 5 Tage", points:1}
        ]}
    ]
  },
  {
    id: "3", title: "Digitalisierung, Datenschutz und IT-Sicherheit", points: 25,
    context: "Im Wareneingang soll eine Kameraerfassung eingeführt werden, die Paletten automatisch zuordnet. Zusätzlich wird die Datensicherung neu geregelt.",
    subtasks: [
      { id:"3a", operator:"Erläutern Sie", points:6, answerType:"text", required:true,
        prompt:"Im Wareneingang werden auch Beschäftigte von den Kameras erfasst. Erläutern Sie drei Anforderungen des Datenschutzes, die beim Einsatz dieser Kameras zu beachten sind.",
        minRequirements:"Drei Anforderungen mit Begründung",
        fallbackValue:null,
        solution:"Anforderungen, zum Beispiel:\n— Erforderlichkeit und Zweckbindung: Die Erfassung muss auf den festgelegten Zweck begrenzt sein; eine Verhaltens- oder Leistungskontrolle der Beschäftigten ist davon nicht gedeckt.\n— Transparenz: Hinweisschilder auf die Videoüberwachung und Information der Beschäftigten.\n— Datensparsamkeit: Kamerawinkel so wählen, dass möglichst wenig Personenbezug entsteht; gegebenenfalls Bereiche ausblenden.\n— Begrenzte Speicherdauer mit automatischer Löschung.\n— Beteiligung des Betriebsrats bei Einführung technischer Einrichtungen, die zur Überwachung geeignet sind.\n— Zugriffsbeschränkung auf einen klar benannten Personenkreis.",
        rubric:[
          {id:"s3-3a-r1", criterion:"Erste Anforderung fachlich korrekt", points:1},
          {id:"s3-3a-r2", criterion:"Erste Anforderung begründet", points:1},
          {id:"s3-3a-r3", criterion:"Zweite Anforderung fachlich korrekt", points:1},
          {id:"s3-3a-r4", criterion:"Zweite Anforderung begründet", points:1},
          {id:"s3-3a-r5", criterion:"Dritte Anforderung fachlich korrekt", points:1},
          {id:"s3-3a-r6", criterion:"Bezug zum Beschäftigtenschutz erkennbar", points:1}
        ]},
      { id:"3b", operator:"Beschreiben Sie", points:5, answerType:"text", required:true,
        prompt:"Beschreiben Sie, wie die Kameraerfassung zusammen mit einer automatisierten Auswertung den Wareneingang unterstützen kann, und nennen Sie zwei Vorteile für den Betriebsablauf.",
        minRequirements:"Anwendung beschrieben, zwei Vorteile",
        fallbackValue:null,
        solution:"Anwendung: Die Kamera erfasst bei der Anlieferung das Kennzeichen des Lkw sowie die Etiketten der Paletten. Ein Auswertungssystem liest die Codes aus, ordnet die Lieferung der passenden Bestellung zu und bucht den Wareneingang vor. Abweichungen zwischen Bestellung und Anlieferung werden automatisch gemeldet.\nVorteile, zum Beispiel:\n— Wegfall der manuellen Erfassung und damit weniger Übertragungsfehler\n— Kürzere Standzeiten der Fahrzeuge an der Rampe\n— Lückenlose Dokumentation, die später als Nachweis dient\n— Frühzeitige Erkennung von Mindermengen oder Falschlieferungen",
        rubric:[
          {id:"s3-3b-r1", criterion:"Erfassung und automatische Zuordnung beschrieben", points:1},
          {id:"s3-3b-r2", criterion:"Bezug zur Bestellung oder zum Wareneingang hergestellt", points:1},
          {id:"s3-3b-r3", criterion:"Erster Vorteil fachlich korrekt", points:1},
          {id:"s3-3b-r4", criterion:"Zweiter Vorteil fachlich korrekt", points:1},
          {id:"s3-3b-r5", criterion:"Nutzen für den Betriebsablauf erkennbar", points:1}
        ]},
      { id:"3c", operator:"Erläutern Sie", points:6, answerType:"text", required:true,
        prompt:"Für die Datensicherung gilt die 3-2-1-Regel. Erläutern Sie diese Regel und begründen Sie, warum ein RAID-Verbund allein kein Ersatz für eine Datensicherung ist.",
        minRequirements:"Regel erklärt, Abgrenzung RAID gegen Backup begründet",
        fallbackValue:null,
        solution:"3-2-1-Regel: Es sollen mindestens drei Kopien der Daten vorliegen (das Original plus zwei Sicherungen), auf mindestens zwei verschiedenen Speichermedien beziehungsweise Systemen, und mindestens eine Kopie außerhalb des Standorts.\nAbgrenzung: Ein RAID-Verbund schützt vor dem Ausfall einzelner Datenträger und hält den Betrieb aufrecht. Er schützt jedoch nicht vor versehentlichem Löschen, fehlerhaften Änderungen, Schadsoftware oder Verschlüsselungsangriffen, denn solche Vorgänge werden sofort auf alle Platten des Verbunds übernommen. Auch Feuer oder Diebstahl am Standort trifft den gesamten Verbund. Deshalb ersetzt RAID keine Sicherung mit zeitlichem Abstand und externer Kopie.",
        rubric:[
          {id:"s3-3c-r1", criterion:"Drei Kopien als Bestandteil genannt", points:1},
          {id:"s3-3c-r2", criterion:"Zwei verschiedene Medien oder Systeme genannt", points:1},
          {id:"s3-3c-r3", criterion:"Eine Kopie außer Haus genannt", points:1},
          {id:"s3-3c-r4", criterion:"RAID als Schutz gegen Plattenausfall eingeordnet", points:1},
          {id:"s3-3c-r5", criterion:"Löschen, Schadsoftware oder Standortschaden als Lücke benannt", points:1},
          {id:"s3-3c-r6", criterion:"Schlussfolgerung schlüssig begründet", points:1}
        ]},
      { id:"3d", operator:"Berechnen Sie", points:8, answerType:"number_with_working", required:true,
        prompt:"Das Lagersystem erzeugt je Wareneingangsvorgang einen Datensatz von 180 kB. Täglich werden 320 Vorgänge erfasst, gearbeitet wird an 300 Tagen im Jahr. Es gilt: 1 kB = 1.000 Byte; für GiB ist mit 1.024 zu rechnen.\n\naa) Berechnen Sie die tägliche Datenmenge in kB.\nab) Berechnen Sie die jährliche Datenmenge in GiB, gerundet auf zwei Nachkommastellen.\nac) Für die Aufbewahrung sind die Daten von 6 Jahren vorzuhalten. Berechnen Sie den benötigten Speicherplatz in GiB und rechnen Sie dabei mit dem gerundeten Ergebnis aus ab) weiter.\n\nGeben Sie bei allen Ergebnissen die Einheit an.",
        minRequirements:"Drei Ergebnisse mit Rechenweg und Einheit",
        fallbackValue:"16,09 GiB",
        solution:"aa) 320 × 180 kB = 57.600 kB pro Tag\n\nab) 57.600 kB × 300 Tage = 17.280.000 kB = 17.280.000.000 Byte\n17.280.000.000 ÷ 1.024³ = 17.280.000.000 ÷ 1.073.741.824 = 16,0932… GiB ≈ 16,09 GiB\n\nac) 16,09 GiB × 6 Jahre = 96,54 GiB",
        rubric:[
          {id:"s3-3d-r1", criterion:"Tagesmenge 57.600 kB korrekt", points:1},
          {id:"s3-3d-r2", criterion:"Jahresmenge in kB oder Byte korrekt ermittelt", points:1},
          {id:"s3-3d-r3", criterion:"Umrechnung mit 1.024³ angewandt", points:1},
          {id:"s3-3d-r4", criterion:"Ergebnis ab) 16,09 GiB", points:1},
          {id:"s3-3d-r5", criterion:"Multiplikation mit 6 Jahren angesetzt", points:1},
          {id:"s3-3d-r6", criterion:"Ergebnis ac) 96,54 GiB", points:1},
          {id:"s3-3d-r7", criterion:"Mit gerundetem Zwischenergebnis weitergerechnet", points:1},
          {id:"s3-3d-r8", criterion:"Alle Einheiten angegeben", points:1}
        ]}
    ]
  },
  {
    id: "4", title: "Software und Daten", points: 25,
    context: "Für die Lagerverwaltung wird ein Datenmodell entworfen. Zu verwalten sind Artikel, Lieferanten und die einzelnen Lieferungen.",
    subtasks: [
      { id:"4a", operator:"Erläutern Sie", points:6, answerType:"text", required:true,
        prompt:"Erläutern Sie die Begriffe Primärschlüssel und Fremdschlüssel und beschreiben Sie, welchen Zweck die Verknüpfung von Tabellen über Schlüssel im Hinblick auf Redundanz erfüllt.",
        minRequirements:"Beide Begriffe erklärt, Zweck der Verknüpfung",
        fallbackValue:null,
        solution:"Primärschlüssel: Ein Attribut oder eine Attributkombination, die jeden Datensatz einer Tabelle eindeutig identifiziert. Er darf nicht leer sein und kommt nicht doppelt vor.\nFremdschlüssel: Ein Attribut, das auf den Primärschlüssel einer anderen Tabelle verweist und dadurch die Beziehung zwischen beiden Tabellen herstellt. Er sichert die referenzielle Integrität.\nZweck: Informationen werden nur einmal an einer Stelle gespeichert und über Schlüssel referenziert, statt sie in mehreren Tabellen zu wiederholen. Das vermeidet Redundanz, spart Speicher und verhindert Inkonsistenzen, weil eine Änderung nur an einer Stelle nötig ist.",
        rubric:[
          {id:"s3-4a-r1", criterion:"Primärschlüssel als eindeutiger Bezeichner erklärt", points:1},
          {id:"s3-4a-r2", criterion:"Eindeutigkeit oder Nicht-Leere genannt", points:1},
          {id:"s3-4a-r3", criterion:"Fremdschlüssel als Verweis auf Primärschlüssel erklärt", points:1},
          {id:"s3-4a-r4", criterion:"Beziehungsherstellung zwischen Tabellen benannt", points:1},
          {id:"s3-4a-r5", criterion:"Redundanzvermeidung als Zweck erkannt", points:1},
          {id:"s3-4a-r6", criterion:"Konsistenzvorteil erläutert", points:1}
        ]},
      { id:"4b", operator:"Modellieren Sie", points:9, answerType:"diagram_text", required:true,
        prompt:"Ein Lieferant liefert mehrere Artikel, ein Artikel kann von mehreren Lieferanten bezogen werden. Zu jeder Liefervereinbarung sind der Einkaufspreis und die Lieferzeit in Tagen zu speichern.\n\nModellieren Sie dazu ein Entity-Relationship-Modell. Benennen Sie die Entitäten mit ihren Attributen, kennzeichnen Sie die Primärschlüssel, geben Sie die Kardinalität an und ordnen Sie die Attribute Einkaufspreis und Lieferzeit korrekt zu. Eine textliche Darstellung ist zulässig.",
        minRequirements:"Zwei Entitäten mit Attributen und Primärschlüsseln, Beziehung mit Kardinalität, korrekte Zuordnung der Beziehungsattribute",
        fallbackValue:null,
        solution:"Entitäten:\nArtikel(ArtikelNr [PK], Bezeichnung, Lagerbestand)\nLieferant(LieferantenNr [PK], Name, Anschrift)\n\nBeziehung: liefert, Kardinalität n : m\nEin Lieferant liefert mehrere Artikel, ein Artikel wird von mehreren Lieferanten geliefert.\n\nDie Attribute Einkaufspreis und Lieferzeit gehören weder zum Artikel noch zum Lieferanten allein, sondern zur Beziehung. Sie werden daher an der Beziehung notiert.\n\nBei der Überführung in Tabellen entsteht daraus eine Zwischentabelle:\nliefert(ArtikelNr [FK], LieferantenNr [FK], Einkaufspreis, Lieferzeit) mit dem zusammengesetzten Primärschlüssel aus ArtikelNr und LieferantenNr.",
        rubric:[
          {id:"s3-4b-r1", criterion:"Entität Artikel mit Attributen", points:1},
          {id:"s3-4b-r2", criterion:"Entität Lieferant mit Attributen", points:1},
          {id:"s3-4b-r3", criterion:"Primärschlüssel Artikel gekennzeichnet", points:1},
          {id:"s3-4b-r4", criterion:"Primärschlüssel Lieferant gekennzeichnet", points:1},
          {id:"s3-4b-r5", criterion:"Beziehung benannt und dargestellt", points:1},
          {id:"s3-4b-r6", criterion:"Kardinalität n:m korrekt angegeben", points:1},
          {id:"s3-4b-r7", criterion:"Einkaufspreis der Beziehung zugeordnet", points:1},
          {id:"s3-4b-r8", criterion:"Lieferzeit der Beziehung zugeordnet", points:1},
          {id:"s3-4b-r9", criterion:"Auflösung über Zwischentabelle oder zusammengesetzten Schlüssel erkannt", points:1}
        ]},
      { id:"4c", operator:"Führen Sie einen Schreibtischtest durch", points:6, answerType:"code", required:true,
        prompt:"Der folgende Pseudocode soll für alle Artikel eine Warnung ausgeben, deren Bestand unter dem Mindestbestand liegt.\n\n1  FÜR JEDEN artikel IN lagerliste\n2      WENN artikel.bestand < artikel.mindestbestand DANN\n3          AUSGABE artikel.bezeichnung + \" nachbestellen\"\n\nGegeben sind folgende Artikel:\nSchraube M6: Bestand 40, Mindestbestand 50\nDübel 8mm: Bestand 120, Mindestbestand 100\nWinkel 90°: Bestand 25, Mindestbestand 25\n\naa) Geben Sie alle Ausgaben des Programms in der richtigen Reihenfolge an.\nab) Der Mindestbestand soll künftig ebenfalls eine Warnung auslösen, wenn er genau erreicht ist. Geben Sie die korrigierte Zeile 2 vollständig an.",
        minRequirements:"Ausgaben vollständig, korrigierte Zeile",
        fallbackValue:null,
        solution:"aa) Schraube M6: 40 < 50 → Ausgabe \"Schraube M6 nachbestellen\"\nDübel 8mm: 120 < 100 trifft nicht zu → keine Ausgabe\nWinkel 90°: 25 < 25 trifft nicht zu → keine Ausgabe\n\nEinzige Ausgabe: Schraube M6 nachbestellen\n\nab) Korrigierte Zeile 2:\nWENN artikel.bestand <= artikel.mindestbestand DANN\nDamit löst auch der genau erreichte Mindestbestand eine Warnung aus, im Beispiel zusätzlich Winkel 90°.",
        rubric:[
          {id:"s3-4c-r1", criterion:"Ausgabe für Schraube M6 korrekt", points:1},
          {id:"s3-4c-r2", criterion:"Erkannt, dass Dübel 8mm keine Ausgabe erzeugt", points:1},
          {id:"s3-4c-r3", criterion:"Erkannt, dass Winkel 90° keine Ausgabe erzeugt", points:1},
          {id:"s3-4c-r4", criterion:"Begründung über den Vergleich der Zahlenwerte", points:1},
          {id:"s3-4c-r5", criterion:"Korrigierte Zeile mit <= angegeben", points:1},
          {id:"s3-4c-r6", criterion:"Auswirkung der Korrektur benannt", points:1}
        ]},
      { id:"4d", operator:"Erläutern Sie", points:4, answerType:"text", required:true,
        prompt:"Die Lagerliste enthält mehrere zehntausend Artikel. Erläutern Sie, welchen Vorteil ein Index auf der Spalte Artikelnummer bietet und welchen Nachteil er mit sich bringt.",
        minRequirements:"Vorteil und Nachteil je erläutert",
        fallbackValue:null,
        solution:"Vorteil: Ein Index wirkt wie ein Stichwortverzeichnis. Statt die gesamte Tabelle Zeile für Zeile zu durchsuchen, findet die Datenbank den gesuchten Datensatz über den Index sehr schnell. Bei mehreren zehntausend Artikeln verkürzt das Such- und Verknüpfungsvorgänge erheblich.\nNachteil: Der Index belegt zusätzlichen Speicherplatz und muss bei jedem Einfügen, Ändern oder Löschen mitgepflegt werden. Schreibende Zugriffe werden dadurch etwas langsamer.",
        rubric:[
          {id:"s3-4d-r1", criterion:"Beschleunigung der Suche als Vorteil genannt", points:1},
          {id:"s3-4d-r2", criterion:"Vorteil nachvollziehbar erläutert", points:1},
          {id:"s3-4d-r3", criterion:"Speicherbedarf oder langsamere Schreibzugriffe als Nachteil", points:1},
          {id:"s3-4d-r4", criterion:"Nachteil nachvollziehbar erläutert", points:1}
        ]}
    ]
  }
  ]
},
{
  examId: "AP1-SIM-04",
  title: "AP1-Prüfungssimulation 04 — Bildung und Schulung",
  branche: "Bildungsträger",
  durationMinutes: 90,
  maxPoints: 100,
  disclaimer: "Unverbindliche Übungssimulation. Keine offizielle IHK-Prüfung und keine verbindliche Bewertung.",
  scenario: "Das Bildungswerk Lippe-Süd in Detmold führt Umschulungen und Weiterbildungen durch. In sechs Schulungsräumen lernen täglich bis zu 90 Teilnehmende. Die Präsentationstechnik ist veraltet, das Netz nicht getrennt, und ein Lernportal soll eingeführt werden. Sie arbeiten in der IT und begleiten die Umsetzung.",
  tasks: [
  {
    id: "1", title: "Beschaffung und Arbeitsplatzsysteme", points: 25,
    context: "Für sechs Schulungsräume sollen Großbild-Displays beschafft werden. Drei Angebote liegen vor. Bewertet wird nach Bildqualität (Gewichtung 40 %), Wartungsaufwand (35 %) und Preis (25 %) auf einer Skala von 1 bis 10.\n\nBewertungen:\nAnbieter Alpha — Bildqualität 9, Wartung 6, Preis 5\nAnbieter Beta — Bildqualität 7, Wartung 8, Preis 7\nAnbieter Gamma — Bildqualität 6, Wartung 7, Preis 9",
    subtasks: [
      { id:"1a", operator:"Berechnen Sie", points:6, answerType:"number_with_working", required:true,
        prompt:"Ermitteln Sie mit einer Nutzwertanalyse den Gesamtnutzwert je Anbieter und benennen Sie den Sieger. Geben Sie den Rechenweg an.",
        minRequirements:"Teilnutzwerte, Gesamtnutzwert je Anbieter, Entscheidung",
        fallbackValue:"Anbieter Beta mit 7,35 Punkten",
        solution:"Teilnutzwert = Gewichtung × Bewertung.\nAlpha: 0,40×9 = 3,60 | 0,35×6 = 2,10 | 0,25×5 = 1,25 → 6,95\nBeta: 0,40×7 = 2,80 | 0,35×8 = 2,80 | 0,25×7 = 1,75 → 7,35\nGamma: 0,40×6 = 2,40 | 0,35×7 = 2,45 | 0,25×9 = 2,25 → 7,10\nAnbieter Beta erreicht mit 7,35 Punkten den höchsten Nutzwert.",
        rubric:[
          {id:"s4-1a-r1", criterion:"Ansatz Gewichtung × Bewertung erkennbar", points:1},
          {id:"s4-1a-r2", criterion:"Gesamtnutzwert Alpha korrekt (6,95)", points:1},
          {id:"s4-1a-r3", criterion:"Gesamtnutzwert Beta korrekt (7,35)", points:1},
          {id:"s4-1a-r4", criterion:"Gesamtnutzwert Gamma korrekt (7,10)", points:1},
          {id:"s4-1a-r5", criterion:"Anbieter Beta als Sieger benannt", points:1},
          {id:"s4-1a-r6", criterion:"Rechenweg nachvollziehbar dargestellt", points:1}
        ]},
      { id:"1b", operator:"Berechnen Sie", points:6, answerType:"number_with_working", required:true,
        prompt:"Der gewählte Anbieter verlangt 1.450,00 EUR netto je Display. Bei Abnahme von 6 Stück gewährt er 6 % Rabatt, bei Zahlung innerhalb von 10 Tagen zusätzlich 2 % Skonto. Ermitteln Sie den Bruttobetrag bei Skontonutzung (Umsatzsteuersatz 19 %). Runden Sie kaufmännisch auf zwei Nachkommastellen und geben Sie die Einheit an.",
        minRequirements:"Listenpreis, Rabatt, Skonto, Umsatzsteuer, Endbetrag mit Einheit",
        fallbackValue:"9.537,18 EUR",
        solution:"6 × 1.450,00 EUR = 8.700,00 EUR\nRabatt 6 %: 8.700,00 × 0,06 = 522,00 EUR → 8.178,00 EUR\nSkonto 2 %: 8.178,00 × 0,02 = 163,56 EUR → 8.014,44 EUR netto\nUmsatzsteuer 19 %: 8.014,44 × 0,19 = 1.522,74 EUR\nBruttobetrag: 9.537,18 EUR",
        rubric:[
          {id:"s4-1b-r1", criterion:"Listenpreis 8.700,00 EUR korrekt", points:1},
          {id:"s4-1b-r2", criterion:"Rabatt korrekt abgezogen (8.178,00 EUR)", points:1},
          {id:"s4-1b-r3", criterion:"Skonto korrekt abgezogen (8.014,44 EUR)", points:1},
          {id:"s4-1b-r4", criterion:"Umsatzsteuer korrekt berechnet (1.522,74 EUR)", points:1},
          {id:"s4-1b-r5", criterion:"Endbetrag 9.537,18 EUR", points:1},
          {id:"s4-1b-r6", criterion:"Einheit angegeben und kaufmännisch gerundet", points:1}
        ]},
      { id:"1c", operator:"Nennen Sie", points:5, answerType:"text", required:true,
        prompt:"Die Displays sollen sowohl vom fest installierten Raumrechner als auch von mitgebrachten Notebooten der Dozenten angesteuert werden. Nennen Sie drei technische Anforderungen an die Displays oder die Anschlusstechnik und erläutern Sie je Anforderung kurz deren Zweck.",
        minRequirements:"Drei Anforderungen mit Zweck",
        fallbackValue:null,
        solution:"Mögliche Anforderungen:\n— Mehrere Bildeingänge (z. B. zweimal HDMI plus USB-C), damit Raumrechner und Gastgerät parallel angeschlossen bleiben können\n— USB-C mit DisplayPort Alt Mode und Power Delivery, damit Gastnotebooks über ein Kabel Bild übertragen und laden\n— Umschaltmöglichkeit der Quelle ohne Umstecken (Fernbedienung oder Tastenfeld)\n— Ausreichende Auflösung und Helligkeit für die Raumgröße und Sitzentfernung\n— Optional drahtlose Präsentation für Gastgeräte ohne passenden Anschluss\nWeitere sinnvolle Antworten sind möglich.",
        rubric:[
          {id:"s4-1c-r1", criterion:"Erste Anforderung fachlich richtig", points:1},
          {id:"s4-1c-r2", criterion:"Zweite Anforderung fachlich richtig", points:1},
          {id:"s4-1c-r3", criterion:"Dritte Anforderung fachlich richtig", points:1},
          {id:"s4-1c-r4", criterion:"Mindestens zwei Zwecke sinnvoll erläutert", points:1},
          {id:"s4-1c-r5", criterion:"Bezug zu beiden Nutzungsarten erkennbar", points:1}
        ]},
      { id:"1d", operator:"Beschreiben Sie", points:4, answerType:"text", required:true,
        prompt:"An den Schulungsrechnern arbeiten täglich wechselnde Teilnehmende mehrere Stunden. Beschreiben Sie vier Maßnahmen zur ergonomischen Gestaltung dieser Arbeitsplätze.",
        minRequirements:"Vier Maßnahmen",
        fallbackValue:null,
        solution:"Mögliche Maßnahmen:\n— Höhenverstellbare Stühle mit Rückenstütze\n— Ausreichend große, entspiegelte Bildschirme in passender Höhe und Sehentfernung\n— Blendfreie Beleuchtung, Bildschirme nicht gegen Fenster ausgerichtet\n— Ausreichend Arbeitsfläche für Tastatur, Maus und Unterlagen\n— Getrennte Tastatur und Maus statt Notebook-Direktnutzung\n— Möglichkeit für Pausen und Haltungswechsel",
        rubric:[
          {id:"s4-1d-r1", criterion:"Erste Maßnahme fachlich korrekt", points:1},
          {id:"s4-1d-r2", criterion:"Zweite Maßnahme fachlich korrekt", points:1},
          {id:"s4-1d-r3", criterion:"Dritte Maßnahme fachlich korrekt", points:1},
          {id:"s4-1d-r4", criterion:"Vierte Maßnahme fachlich korrekt", points:1}
        ]},
      { id:"1e", operator:"Erläutern Sie", points:4, answerType:"text", required:true,
        prompt:"An den Schulungsrechnern melden sich täglich wechselnde Personen an. Erläutern Sie, wie sichergestellt wird, dass Teilnehmende weder auf die Daten anderer Kurse noch auf die Systemkonfiguration zugreifen können.",
        minRequirements:"Trennung der Benutzerdaten und Schutz der Systemebene",
        fallbackValue:null,
        solution:"Jede Person meldet sich mit einem eigenen Benutzerkonto an; Kursdaten liegen in getrennten, rechtlich abgeschotteten Verzeichnissen, auf die nur die jeweilige Gruppe Zugriff hat.\nDie Teilnehmerkonten erhalten keine administrativen Rechte, sodass sich Systemeinstellungen, Treiber oder Software nicht ändern lassen. Ergänzend können die Rechner nach jeder Sitzung auf einen definierten Ausgangszustand zurückgesetzt werden, etwa über ein Abbild oder eine Rücksetzfunktion. Wechseldatenträger und Installationsrechte lassen sich per Richtlinie einschränken.",
        rubric:[
          {id:"s4-1e-r1", criterion:"Persönliche Benutzerkonten oder Gruppentrennung genannt", points:1},
          {id:"s4-1e-r2", criterion:"Getrennte Datenbereiche je Kurs beschrieben", points:1},
          {id:"s4-1e-r3", criterion:"Fehlende Administratorrechte für Teilnehmende benannt", points:1},
          {id:"s4-1e-r4", criterion:"Weitere Schutzmaßnahme (Rücksetzen, Richtlinien) genannt", points:1}
        ]}
    ]
  },
  {
    id: "2", title: "Netzwerk und Projektplanung", points: 25,
    context: "Das Netz wird neu aufgeteilt. Zur Verfügung steht das private Netz 192.168.60.0/24. Benötigt werden mindestens sechs Teilnetze, unter anderem für Schulungsräume, Verwaltung, Dozenten und Gäste. Je Teilnetz werden höchstens 28 Endgeräte erwartet.",
    subtasks: [
      { id:"2a", operator:"Ermitteln Sie", points:8, answerType:"number_with_working", required:true,
        prompt:"Ermitteln Sie die passende Präfixlänge und geben Sie für das vierte Teilnetz Netzadresse, erste und letzte nutzbare Hostadresse, Broadcastadresse sowie die Anzahl nutzbarer Hostadressen an. Geben Sie den Rechenweg an.",
        minRequirements:"Präfix, vier Adressen, Hostanzahl, Rechenweg",
        fallbackValue:"/27, Netz 192.168.60.96",
        solution:"Für mindestens sechs Teilnetze werden 3 Bits geliehen: 2³ = 8 ≥ 6. Aus /24 wird /27.\nHostbits: 32 − 27 = 5 → 2⁵ − 2 = 30 nutzbare Hostadressen, ausreichend für 28 Geräte.\nSprungweite: 256 − 224 = 32.\nTeilnetze: .0 | .32 | .64 | .96 | .128 | .160 | .192 | .224\nViertes Teilnetz:\nNetzadresse 192.168.60.96\nErster Host 192.168.60.97\nLetzter Host 192.168.60.126\nBroadcast 192.168.60.127\nNutzbare Hostadressen: 30",
        rubric:[
          {id:"s4-2a-r1", criterion:"Präfix /27 korrekt ermittelt", points:1},
          {id:"s4-2a-r2", criterion:"Begründung über geliehene Bits (2³ ≥ 6)", points:1},
          {id:"s4-2a-r3", criterion:"Sprungweite 32 erkannt", points:1},
          {id:"s4-2a-r4", criterion:"Netzadresse 192.168.60.96", points:1},
          {id:"s4-2a-r5", criterion:"Erste Hostadresse 192.168.60.97", points:1},
          {id:"s4-2a-r6", criterion:"Letzte Hostadresse 192.168.60.126", points:1},
          {id:"s4-2a-r7", criterion:"Broadcastadresse 192.168.60.127", points:1},
          {id:"s4-2a-r8", criterion:"30 nutzbare Hostadressen", points:1}
        ]},
      { id:"2b", operator:"Begründen Sie", points:5, answerType:"text", required:true,
        prompt:"Der Gästezugang für Teilnehmende soll vom Verwaltungsnetz getrennt werden. Begründen Sie diese Trennung und erläutern Sie, wie sie mit VLANs technisch umgesetzt wird.",
        minRequirements:"Begründung der Trennung, VLAN-Umsetzung erläutert",
        fallbackValue:null,
        solution:"Begründung: Im Gästenetz befinden sich fremde, nicht verwaltete Geräte mit unbekanntem Sicherheitsstand. Ohne Trennung könnten von dort Verwaltungsdaten erreicht oder Schadsoftware verbreitet werden. Die Trennung begrenzt zudem Broadcast-Verkehr und erleichtert eine eigene Bandbreitenregelung.\nUmsetzung: Auf den Switches werden VLANs eingerichtet, etwa VLAN 10 Verwaltung und VLAN 20 Gäste. Jeder Zugangsport wird dem passenden VLAN zugewiesen; Verbindungen zwischen Switches laufen als Trunk mit VLAN-Kennzeichnung nach 802.1Q. Ein Übergang zwischen den VLANs ist nur über einen Router oder Layer-3-Switch möglich und wird dort per Regelwerk auf das Nötige beschränkt.",
        rubric:[
          {id:"s4-2b-r1", criterion:"Sicherheitsrisiko durch fremde Geräte benannt", points:1},
          {id:"s4-2b-r2", criterion:"Weiterer Vorteil der Trennung genannt", points:1},
          {id:"s4-2b-r3", criterion:"VLAN-Zuweisung an Ports beschrieben", points:1},
          {id:"s4-2b-r4", criterion:"Trunk oder 802.1Q-Kennzeichnung erwähnt", points:1},
          {id:"s4-2b-r5", criterion:"Kontrollierter Übergang über Router oder Regelwerk", points:1}
        ]},
      { id:"2c", operator:"Erläutern Sie", points:5, answerType:"text", required:true,
        prompt:"Alle Schulungsrechner beziehen ihre Adressen automatisch. Erläutern Sie den Ablauf der automatischen Adressvergabe bei IPv4 in seinen vier Schritten und nennen Sie zwei Angaben, die der Server neben der IP-Adresse üblicherweise mitliefert.",
        minRequirements:"Vier Schritte, zwei zusätzliche Angaben",
        fallbackValue:null,
        solution:"Ablauf (DORA):\n1. Discover: Der Client sucht per Broadcast nach einem Server.\n2. Offer: Ein Server antwortet mit einem Adressangebot.\n3. Request: Der Client fordert das Angebot verbindlich an, ebenfalls per Broadcast, damit andere Server ihr Angebot zurückziehen.\n4. Acknowledge: Der Server bestätigt die Vergabe mit Gültigkeitsdauer.\nZusätzliche Angaben, zum Beispiel: Subnetzmaske, Standardgateway, DNS-Server, Gültigkeitsdauer der Adresse (Lease), NTP-Server.",
        rubric:[
          {id:"s4-2c-r1", criterion:"Discover als erster Schritt korrekt", points:1},
          {id:"s4-2c-r2", criterion:"Offer als zweiter Schritt korrekt", points:1},
          {id:"s4-2c-r3", criterion:"Request und Acknowledge korrekt", points:1},
          {id:"s4-2c-r4", criterion:"Erste Zusatzangabe korrekt", points:1},
          {id:"s4-2c-r5", criterion:"Zweite Zusatzangabe korrekt", points:1}
        ]},
      { id:"2d", operator:"Ermitteln Sie", points:7, answerType:"number_with_working", required:true,
        prompt:"Für die Einführung des Lernportals sind folgende Vorgänge geplant (Dauer in Arbeitstagen):\nA Anforderungen klären (2), Start\nB Portal einrichten (5), nach A\nC Kursinhalte aufbereiten (3), nach A\nD Testbetrieb (3), nach B\nE Dozentenschulung (4), nach C\nF Freischaltung (2), nach D und E\n\nErmitteln Sie die Gesamtprojektdauer, den kritischen Pfad sowie den Gesamtpuffer der Vorgänge C und E. Geben Sie den Rechenweg an.",
        minRequirements:"Vorwärts- und Rückwärtsrechnung, Dauer, kritischer Pfad, zwei Pufferwerte",
        fallbackValue:"12 Arbeitstage, kritischer Pfad A-B-D-F",
        solution:"Vorwärtsrechnung (FEZ = FAZ + Dauer, bei mehreren Vorgängern das späteste FEZ):\nA 0→2 | B 2→7 | C 2→5 | D 7→10 | E 5→9 | F: FAZ = max(10; 9) = 10 → 12\nGesamtprojektdauer: 12 Arbeitstage\nRückwärtsrechnung (SAZ = SEZ − Dauer):\nF 12→10 | D 10→7 | E 10→6 | B 7→2 | C 6→3 | A 2→0\nGesamtpuffer = SAZ − FAZ:\nA, B, D, F je 0 → kritischer Pfad A – B – D – F\nC: 3 − 2 = 1 Arbeitstag\nE: 6 − 5 = 1 Arbeitstag",
        rubric:[
          {id:"s4-2d-r1", criterion:"Vorwärtsrechnung nachvollziehbar", points:1},
          {id:"s4-2d-r2", criterion:"Bei F das spätere Vorgänger-FEZ verwendet", points:1},
          {id:"s4-2d-r3", criterion:"Gesamtprojektdauer 12 Arbeitstage", points:1},
          {id:"s4-2d-r4", criterion:"Rückwärtsrechnung nachvollziehbar", points:1},
          {id:"s4-2d-r5", criterion:"Kritischer Pfad A-B-D-F", points:1},
          {id:"s4-2d-r6", criterion:"Gesamtpuffer C = 1 Tag", points:1},
          {id:"s4-2d-r7", criterion:"Gesamtpuffer E = 1 Tag", points:1}
        ]}
    ]
  },
  {
    id: "3", title: "Digitalisierung, Datenschutz und IT-Sicherheit", points: 25,
    context: "Das Lernportal soll Schulungsvideos bereitstellen. Ein Anbieterdokument beschreibt die Zugänglichkeitsanforderungen.",
    subtasks: [
      { id:"3a", operator:"Erläutern Sie", points:6, answerType:"text", required:true,
        prompt:"In der Produktbeschreibung des Portalanbieters heißt es:\n\n\"The platform supports accessibility features such as keyboard navigation, screen reader compatibility, adjustable contrast and captions for video content. These features help learners with visual, motor or hearing impairments to use the platform independently.\"\n\nErläutern Sie den Inhalt dieses Textes in eigenen Worten. Gehen Sie darauf ein, welche Funktionen genannt werden und welchem Zweck sie dienen. Eine wörtliche Übersetzung ist nicht gefordert.",
        minRequirements:"Genannte Funktionen sinngemäß wiedergegeben, Zweck erläutert",
        fallbackValue:null,
        solution:"Der Text beschreibt Funktionen zur Barrierefreiheit des Lernportals.\nGenannt werden:\n— Bedienung vollständig über die Tastatur, also ohne Maus\n— Zusammenarbeit mit Vorleseprogrammen (Screenreader)\n— einstellbarer Kontrast der Darstellung\n— Untertitel für Videoinhalte\nZweck: Lernende mit Einschränkungen des Sehens, der Bewegungsfähigkeit oder des Hörens sollen das Portal selbstständig nutzen können, also ohne fremde Hilfe. Die Funktionen decken dabei jeweils unterschiedliche Einschränkungen ab: Tastaturbedienung und Screenreader zielen auf motorische und visuelle Einschränkungen, Kontrasteinstellung auf Sehschwächen, Untertitel auf Höreinschränkungen.",
        rubric:[
          {id:"s4-3a-r1", criterion:"Barrierefreiheit als Thema des Textes erkannt", points:1},
          {id:"s4-3a-r2", criterion:"Tastaturbedienung sinngemäß wiedergegeben", points:1},
          {id:"s4-3a-r3", criterion:"Screenreader-Unterstützung sinngemäß wiedergegeben", points:1},
          {id:"s4-3a-r4", criterion:"Kontrasteinstellung oder Untertitel genannt", points:1},
          {id:"s4-3a-r5", criterion:"Zielgruppe mit Einschränkungen benannt", points:1},
          {id:"s4-3a-r6", criterion:"Zweck der selbstständigen Nutzung erläutert", points:1}
        ]},
      { id:"3b", operator:"Beschreiben Sie", points:5, answerType:"text", required:true,
        prompt:"Beschreiben Sie eine sinnvolle Automatisierungs- oder KI-Anwendung, die die Erstellung barrierefreier Schulungsvideos unterstützt, und nennen Sie zwei Grenzen oder Risiken.",
        minRequirements:"Anwendung beschrieben, zwei Grenzen oder Risiken",
        fallbackValue:null,
        solution:"Anwendung, zum Beispiel: automatische Spracherkennung erzeugt aus der Tonspur der Aufzeichnung Untertitel und ein durchsuchbares Transkript. Damit lassen sich Videos auch ohne Ton nutzen und gezielt nach Inhalten durchsuchen.\nGrenzen und Risiken, zum Beispiel:\n— Erkennungsfehler bei Fachbegriffen, Dialekt, Nebengeräuschen oder mehreren Sprechenden\n— Fehlerhafte Untertitel vermitteln falsche Inhalte, daher ist eine fachliche Nachkontrolle nötig\n— Verarbeitung von Stimmaufnahmen berührt den Datenschutz, wenn Personen identifizierbar sind\n— Abhängigkeit von einem externen Dienst und dessen Verfügbarkeit",
        rubric:[
          {id:"s4-3b-r1", criterion:"Anwendung konkret und passend beschrieben", points:1},
          {id:"s4-3b-r2", criterion:"Nutzen für Barrierefreiheit erkennbar", points:1},
          {id:"s4-3b-r3", criterion:"Erste Grenze oder Risiko fachlich korrekt", points:1},
          {id:"s4-3b-r4", criterion:"Zweite Grenze oder Risiko fachlich korrekt", points:1},
          {id:"s4-3b-r5", criterion:"Notwendigkeit der Kontrolle oder Datenschutzaspekt benannt", points:1}
        ]},
      { id:"3c", operator:"Erläutern Sie", points:6, answerType:"text", required:true,
        prompt:"Teilnehmende melden sich am Lernportal mit Benutzername und Passwort an. Erläutern Sie, wie Passwörter serverseitig sicher gespeichert werden, und begründen Sie, warum eine zusätzliche Absicherung durch einen zweiten Faktor sinnvoll ist.",
        minRequirements:"Speicherverfahren erläutert, zweiter Faktor begründet",
        fallbackValue:null,
        solution:"Passwörter werden nicht im Klartext und nicht verschlüsselt, sondern als Hashwert gespeichert. Verwendet werden absichtlich langsame Verfahren wie bcrypt, scrypt oder Argon2, die das massenhafte Durchprobieren stark verteuern. Zu jedem Passwort wird ein zufälliger Salt gespeichert und mitgehasht; dadurch ergeben gleiche Passwörter verschiedener Personen unterschiedliche Hashwerte, und vorberechnete Tabellen werden wirkungslos.\nZweiter Faktor: Ein Passwort allein kann erraten, abgeschaut, durch Phishing abgegriffen oder aus einem Datenabfluss bei einem anderen Dienst wiederverwendet werden. Kommt ein zweiter, unabhängiger Faktor hinzu (Besitz, etwa eine App oder ein Token), genügt das gestohlene Passwort allein nicht mehr für die Anmeldung.",
        rubric:[
          {id:"s4-3c-r1", criterion:"Speicherung als Hashwert statt Klartext", points:1},
          {id:"s4-3c-r2", criterion:"Langsames Hashverfahren genannt (bcrypt, scrypt, Argon2)", points:1},
          {id:"s4-3c-r3", criterion:"Salt genannt", points:1},
          {id:"s4-3c-r4", criterion:"Wirkung des Salt korrekt erläutert", points:1},
          {id:"s4-3c-r5", criterion:"Risiko eines allein stehenden Passworts benannt", points:1},
          {id:"s4-3c-r6", criterion:"Zweiter Faktor als unabhängiger Nachweis erklärt", points:1}
        ]},
      { id:"3d", operator:"Berechnen Sie", points:8, answerType:"number_with_working", required:true,
        prompt:"Eine Schulungsaufzeichnung dauert 90 Minuten. Je Minute entstehen 25 MB Videodaten. Es gilt: 1 MB = 1.000.000 Byte; für GiB ist mit 1.024 zu rechnen.\n\naa) Berechnen Sie die Datenmenge einer Aufzeichnung in GiB, gerundet auf zwei Nachkommastellen.\nab) Im Kursjahr entstehen 30 solcher Aufzeichnungen. Berechnen Sie den Speicherbedarf in GiB und rechnen Sie mit dem gerundeten Ergebnis aus aa) weiter.\nac) Der Gesamtbestand wird über eine Leitung mit 200 Mbit/s in ein Rechenzentrum übertragen. Berechnen Sie die reine Übertragungsdauer in Minuten, gerundet auf eine Nachkommastelle.\n\nGeben Sie bei allen Ergebnissen die Einheit an.",
        minRequirements:"Drei Ergebnisse mit Rechenweg und Einheit",
        fallbackValue:"63,00 GiB",
        solution:"aa) 90 min × 25 MB/min = 2.250 MB = 2.250.000.000 Byte\n2.250.000.000 ÷ 1.024³ = 2.250.000.000 ÷ 1.073.741.824 = 2,0955… GiB ≈ 2,10 GiB\n\nab) 2,10 GiB × 30 = 63,00 GiB\n\nac) 63,00 GiB × 1.073.741.824 = 67.645.734.912 Byte\n× 8 = 541.165.879.296 Bit\n÷ 200.000.000 Bit/s = 2.705,83 s\n2.705,83 ÷ 60 = 45,1 Minuten",
        rubric:[
          {id:"s4-3d-r1", criterion:"Datenmenge je Aufzeichnung 2.250 MB korrekt", points:1},
          {id:"s4-3d-r2", criterion:"Umrechnung mit 1.024³ angewandt", points:1},
          {id:"s4-3d-r3", criterion:"Ergebnis aa) 2,10 GiB", points:1},
          {id:"s4-3d-r4", criterion:"Ergebnis ab) 63,00 GiB", points:1},
          {id:"s4-3d-r5", criterion:"Umrechnung Byte in Bit (×8) vorgenommen", points:1},
          {id:"s4-3d-r6", criterion:"Division durch 200.000.000 Bit/s korrekt", points:1},
          {id:"s4-3d-r7", criterion:"Ergebnis ac) rund 45,1 Minuten", points:1},
          {id:"s4-3d-r8", criterion:"Alle Einheiten angegeben", points:1}
        ]}
    ]
  },
  {
    id: "4", title: "Software und Daten", points: 25,
    context: "Für das Lernportal wird eine Anwendung zur Kursverwaltung entwickelt. Zu verwalten sind Kurse, Teilnehmende und Dozenten.",
    subtasks: [
      { id:"4a", operator:"Modellieren Sie", points:7, answerType:"diagram_text", required:true,
        prompt:"Beschreiben Sie ein UML-Klassendiagramm mit den Klassen Kurs, Teilnehmer und Dozent. Geben Sie je Klasse mindestens zwei Attribute mit Sichtbarkeit und Datentyp, je eine Methode sowie die Beziehungen mit Multiplizitäten an. Eine textliche Darstellung ist zulässig.",
        minRequirements:"Drei Klassen mit Attributen, Sichtbarkeiten, Methoden, Beziehungen mit Multiplizitäten",
        fallbackValue:null,
        solution:"Beispiel:\nKurs\n- kursNr : Integer\n- bezeichnung : String\n- beginn : Date\n+ getBezeichnung() : String\n\nTeilnehmer\n- teilnehmerNr : Integer\n- name : String\n+ getName() : String\n\nDozent\n- dozentenNr : Integer\n- fachgebiet : String\n+ getFachgebiet() : String\n\nBeziehungen:\nDozent 1 — 0..* Kurs (ein Dozent leitet mehrere Kurse, ein Kurs wird von genau einem Dozenten geleitet)\nKurs 0..* — 0..* Teilnehmer (ein Kurs hat viele Teilnehmende, eine Person kann mehrere Kurse belegen)\nSichtbarkeiten: − private, + public.\nAndere fachlich sinnvolle Modellierungen sind möglich.",
        rubric:[
          {id:"s4-4a-r1", criterion:"Drei Klassen mit passenden Namen", points:1},
          {id:"s4-4a-r2", criterion:"Je Klasse mindestens zwei Attribute mit Datentyp", points:1},
          {id:"s4-4a-r3", criterion:"Sichtbarkeiten korrekt notiert (+ / −)", points:1},
          {id:"s4-4a-r4", criterion:"Je Klasse mindestens eine Methode", points:1},
          {id:"s4-4a-r5", criterion:"Beziehung Dozent–Kurs modelliert", points:1},
          {id:"s4-4a-r6", criterion:"Beziehung Kurs–Teilnehmer modelliert", points:1},
          {id:"s4-4a-r7", criterion:"Multiplizitäten fachlich korrekt", points:1}
        ]},
      { id:"4b", operator:"Vervollständigen Sie", points:7, answerType:"table", required:true,
        prompt:"Überführen Sie das Modell in ein relationales Datenmodell. Ein Kurs hat viele Teilnehmende, eine Person kann mehrere Kurse belegen. Geben Sie alle benötigten Tabellen mit ihren Spalten an, kennzeichnen Sie Primärschlüssel mit PK und Fremdschlüssel mit FK und begründen Sie, warum für die Beziehung zwischen Kurs und Teilnehmer eine zusätzliche Tabelle erforderlich ist.",
        minRequirements:"Vier Tabellen mit PK und FK, Begründung der Zwischentabelle",
        fallbackValue:null,
        solution:"Dozent(dozentenNr PK, name, fachgebiet)\nKurs(kursNr PK, bezeichnung, beginn, dozentenNr FK → Dozent)\nTeilnehmer(teilnehmerNr PK, name, anschrift)\nBelegung(kursNr FK → Kurs, teilnehmerNr FK → Teilnehmer, anmeldedatum)\nDer Primärschlüssel der Tabelle Belegung ist die Kombination aus kursNr und teilnehmerNr.\n\nBegründung: Zwischen Kurs und Teilnehmer besteht eine n:m-Beziehung. Eine solche Beziehung lässt sich nicht durch einen einfachen Fremdschlüssel abbilden, da sonst mehrere Werte in einem Feld stehen müssten. Die Zwischentabelle löst die Beziehung in zwei 1:n-Beziehungen auf und kann zusätzlich beziehungsbezogene Attribute wie das Anmeldedatum aufnehmen.",
        rubric:[
          {id:"s4-4b-r1", criterion:"Tabelle Dozent mit Primärschlüssel", points:1},
          {id:"s4-4b-r2", criterion:"Tabelle Kurs mit Primärschlüssel", points:1},
          {id:"s4-4b-r3", criterion:"Fremdschlüssel Kurs auf Dozent korrekt", points:1},
          {id:"s4-4b-r4", criterion:"Tabelle Teilnehmer mit Primärschlüssel", points:1},
          {id:"s4-4b-r5", criterion:"Zwischentabelle mit beiden Fremdschlüsseln", points:1},
          {id:"s4-4b-r6", criterion:"Zusammengesetzter Schlüssel der Zwischentabelle erkannt", points:1},
          {id:"s4-4b-r7", criterion:"n:m-Beziehung als Begründung benannt", points:1}
        ]},
      { id:"4c", operator:"Führen Sie einen Schreibtischtest durch", points:6, answerType:"code", required:true,
        prompt:"Der folgende Pseudocode soll die Anzahl der bestandenen Prüfungen zählen. Als bestanden gilt eine Punktzahl ab 50.\n\n1  bestanden = 0\n2  FÜR JEDE pruefung IN liste\n3      WENN pruefung.punkte > 50 DANN\n4          bestanden = bestanden + 1\n5  RÜCKGABE bestanden\n\nGegeben sind folgende Punktzahlen: 72, 50, 49, 88, 50\n\naa) Geben Sie den Rückgabewert an und begründen Sie ihn.\nab) Benennen Sie den Fehler und geben Sie die korrigierte Zeile 3 vollständig an.",
        minRequirements:"Rückgabewert mit Begründung, Fehler, korrigierte Zeile",
        fallbackValue:null,
        solution:"aa) Geprüft wird auf größer als 50. Gezählt werden daher nur 72 und 88.\nRückgabewert: 2\nKorrekt wären 4, da die beiden Ergebnisse mit genau 50 Punkten ebenfalls als bestanden gelten.\n\nab) Fehler: Grenzwertfehler durch den Vergleichsoperator. Die Bedingung schließt den Grenzwert 50 fälschlich aus.\nKorrigierte Zeile 3:\nWENN pruefung.punkte >= 50 DANN",
        rubric:[
          {id:"s4-4c-r1", criterion:"Rückgabewert 2 korrekt angegeben", points:1},
          {id:"s4-4c-r2", criterion:"Nachvollzug über die fünf Punktzahlen", points:1},
          {id:"s4-4c-r3", criterion:"Erkannt, dass die beiden 50er nicht gezählt werden", points:1},
          {id:"s4-4c-r4", criterion:"Grenzwertfehler beim Vergleichsoperator benannt", points:1},
          {id:"s4-4c-r5", criterion:"Korrigierte Zeile mit >= angegeben", points:1},
          {id:"s4-4c-r6", criterion:"Korrektes Sollergebnis 4 genannt", points:1}
        ]},
      { id:"4d", operator:"Erläutern Sie", points:5, answerType:"text", required:true,
        prompt:"Im Lernportal soll ausgewertet werden, wie viele Teilnehmende je Kurs angemeldet sind. Erläutern Sie, mit welchen SQL-Sprachmitteln sich das umsetzen lässt, und beschreiben Sie den Unterschied zwischen WHERE und HAVING an diesem Beispiel.",
        minRequirements:"SQL-Mittel benannt, Unterschied WHERE und HAVING erläutert",
        fallbackValue:null,
        solution:"Umsetzung: Die Belegungstabelle wird mit GROUP BY nach der Kursnummer gruppiert; die Aggregatfunktion COUNT liefert je Gruppe die Anzahl der Anmeldungen. Über einen JOIN lässt sich zusätzlich die Kursbezeichnung anzeigen.\nUnterschied: WHERE filtert einzelne Zeilen, bevor gruppiert wird, etwa nur Anmeldungen des laufenden Jahres. HAVING filtert erst die fertig gebildeten Gruppen anhand des Aggregatergebnisses, etwa nur Kurse mit mehr als 20 Anmeldungen. Eine Bedingung auf COUNT ist deshalb nur mit HAVING möglich, nicht mit WHERE.",
        rubric:[
          {id:"s4-4d-r1", criterion:"GROUP BY als Gruppierung genannt", points:1},
          {id:"s4-4d-r2", criterion:"COUNT als Aggregatfunktion genannt", points:1},
          {id:"s4-4d-r3", criterion:"WHERE als Zeilenfilter vor der Gruppierung erklärt", points:1},
          {id:"s4-4d-r4", criterion:"HAVING als Gruppenfilter nach der Aggregation erklärt", points:1},
          {id:"s4-4d-r5", criterion:"Beispielbezug zum Kursszenario hergestellt", points:1}
        ]}
    ]
  }
  ]
},
{
  examId: "AP1-SIM-05",
  title: "AP1-Prüfungssimulation 05 — Produktion und technischer Dienstleister",
  branche: "Maschinenbau",
  durationMinutes: 90,
  maxPoints: 100,
  disclaimer: "Unverbindliche Übungssimulation. Keine offizielle IHK-Prüfung und keine verbindliche Bewertung.",
  scenario: "Die Harzmann Antriebstechnik GmbH in Salzgitter fertigt Getriebekomponenten an zwei Standorten. In der Fertigung stehen ältere Steuerrechner, die Maschinendaten werden bisher nicht ausgewertet. Sie arbeiten in der IT und begleiten die Erneuerung der Industrierechner, die Netzplanung sowie die Einführung einer Maschinendatenerfassung.",
  tasks: [
  {
    id: "1", title: "Beschaffung und Arbeitsplatzsysteme", points: 25,
    context: "Für die Fertigung sollen 8 Industrie-PCs beschafft werden. Drei Angebote liegen vor. Bewertet wird nach Preis (Gewichtung 35 %), Robustheit (40 %) und Supportzusage (25 %) auf einer Skala von 1 bis 10.\n\nBewertungen:\nAnbieter Rot — Preis 8, Robustheit 6, Support 7\nAnbieter Blau — Preis 6, Robustheit 9, Support 6\nAnbieter Grün — Preis 7, Robustheit 7, Support 9",
    subtasks: [
      { id:"1a", operator:"Berechnen Sie", points:6, answerType:"number_with_working", required:true,
        prompt:"Ermitteln Sie mit einer Nutzwertanalyse den Gesamtnutzwert je Anbieter und benennen Sie den Sieger. Geben Sie den Rechenweg an.",
        minRequirements:"Teilnutzwerte, Gesamtnutzwert je Anbieter, Entscheidung",
        fallbackValue:"Anbieter Grün mit 7,50 Punkten",
        solution:"Teilnutzwert = Gewichtung × Bewertung.\nRot: 0,35×8 = 2,80 | 0,40×6 = 2,40 | 0,25×7 = 1,75 → 6,95\nBlau: 0,35×6 = 2,10 | 0,40×9 = 3,60 | 0,25×6 = 1,50 → 7,20\nGrün: 0,35×7 = 2,45 | 0,40×7 = 2,80 | 0,25×9 = 2,25 → 7,50\nAnbieter Grün erreicht mit 7,50 Punkten den höchsten Nutzwert.",
        rubric:[
          {id:"s5-1a-r1", criterion:"Ansatz Gewichtung × Bewertung erkennbar", points:1},
          {id:"s5-1a-r2", criterion:"Gesamtnutzwert Rot korrekt (6,95)", points:1},
          {id:"s5-1a-r3", criterion:"Gesamtnutzwert Blau korrekt (7,20)", points:1},
          {id:"s5-1a-r4", criterion:"Gesamtnutzwert Grün korrekt (7,50)", points:1},
          {id:"s5-1a-r5", criterion:"Anbieter Grün als Sieger benannt", points:1},
          {id:"s5-1a-r6", criterion:"Rechenweg nachvollziehbar dargestellt", points:1}
        ]},
      { id:"1b", operator:"Berechnen Sie", points:5, answerType:"number_with_working", required:true,
        prompt:"Der gewählte Anbieter verlangt 1.890,00 EUR netto je Industrie-PC. Bei Abnahme von 8 Stück gewährt er 7 % Rabatt, bei Zahlung innerhalb von 14 Tagen zusätzlich 3 % Skonto. Ermitteln Sie den Bruttobetrag bei Skontonutzung (Umsatzsteuersatz 19 %). Runden Sie kaufmännisch auf zwei Nachkommastellen und geben Sie die Einheit an.",
        minRequirements:"Listenpreis, Rabatt, Skonto, Umsatzsteuer, Endbetrag mit Einheit",
        fallbackValue:"16.231,30 EUR",
        solution:"8 × 1.890,00 EUR = 15.120,00 EUR\nRabatt 7 %: 15.120,00 × 0,07 = 1.058,40 EUR → 14.061,60 EUR\nSkonto 3 %: 14.061,60 × 0,03 = 421,85 EUR → 13.639,75 EUR netto\nUmsatzsteuer 19 %: 13.639,75 × 0,19 = 2.591,55 EUR\nBruttobetrag: 16.231,30 EUR",
        rubric:[
          {id:"s5-1b-r1", criterion:"Listenpreis 15.120,00 EUR korrekt", points:1},
          {id:"s5-1b-r2", criterion:"Rabatt korrekt abgezogen (14.061,60 EUR)", points:1},
          {id:"s5-1b-r3", criterion:"Skonto korrekt abgezogen (13.639,75 EUR)", points:1},
          {id:"s5-1b-r4", criterion:"Umsatzsteuer korrekt berechnet (2.591,55 EUR)", points:1},
          {id:"s5-1b-r5", criterion:"Endbetrag 16.231,30 EUR mit Einheit", points:1}
        ]},
      { id:"1c", operator:"Berechnen Sie", points:6, answerType:"number_with_working", required:true,
        prompt:"Einem Industrie-PC fehlt noch das Netzteil. Er ist mit folgenden Komponenten bestückt:\n\n1 × Mainboard 45 W\n2 × CPU je 85 W\n4 × RAM-Riegel je 5 W\n2 × SSD je 8 W\n1 × Grafikeinheit 120 W\n\nBerechnen Sie den Leistungsbedarf. Schlagen Sie auf die ermittelte Leistungsaufnahme aller Komponenten eine Reserve von 20 % auf und berücksichtigen Sie einen Wirkungsgrad des Netzteils von 88 %. Geben Sie anschließend die mindestens erforderliche Netzteilleistung in einer marktüblichen Größe an. Verfügbar sind Netzteile ab 300 W in Abstufungen von 50 W. Der Rechenweg ist anzugeben.",
        minRequirements:"Summe der Komponenten, Reserve, Wirkungsgrad, marktübliche Größe",
        fallbackValue:"550 W",
        solution:"Leistungsaufnahme der Komponenten:\nMainboard 1 × 45 W = 45 W\nCPU 2 × 85 W = 170 W\nRAM 4 × 5 W = 20 W\nSSD 2 × 8 W = 16 W\nGrafikeinheit 1 × 120 W = 120 W\nSumme: 371 W\n\nReserve 20 %: 371 W × 1,20 = 445,2 W\n\nWirkungsgrad 88 %: 445,2 W ÷ 0,88 = 505,9 W\n\nDas Netzteil muss mindestens 505,9 W liefern. Die nächstgrößere marktübliche Größe ist 550 W.",
        rubric:[
          {id:"s5-1c-r1", criterion:"Einzelleistungen korrekt multipliziert", points:1},
          {id:"s5-1c-r2", criterion:"Summe 371 W korrekt", points:1},
          {id:"s5-1c-r3", criterion:"Reserve von 20 % korrekt aufgeschlagen (445,2 W)", points:1},
          {id:"s5-1c-r4", criterion:"Division durch den Wirkungsgrad 0,88 angesetzt", points:1},
          {id:"s5-1c-r5", criterion:"Zwischenergebnis rund 505,9 W", points:1},
          {id:"s5-1c-r6", criterion:"Marktübliche Größe 550 W gewählt", points:1}
        ]},
      { id:"1d", operator:"Erläutern Sie", points:4, answerType:"text", required:true,
        prompt:"Die Industrie-PCs stehen unmittelbar in der Fertigungshalle. Erläutern Sie zwei Umgebungsanforderungen, die diese Geräte im Unterschied zu Bürorechnern erfüllen müssen, und begründen Sie sie jeweils.",
        minRequirements:"Zwei Anforderungen mit Begründung",
        fallbackValue:null,
        solution:"Mögliche Anforderungen:\n— Höhere Schutzart gegen Staub und Feuchtigkeit (IP-Schutzart): In der Halle entstehen Metallstaub, Kühlschmierstoffnebel und Feuchtigkeit, die eindringen und Kurzschlüsse oder Ausfälle verursachen können.\n— Erweiterter Temperaturbereich und passive oder gefilterte Kühlung: Hallentemperaturen schwanken stärker; offene Lüfter ziehen Staub ins Gerät.\n— Vibrationsfestigkeit und Befestigungsmöglichkeit: Maschinen erzeugen Erschütterungen, die Steckverbindungen und mechanische Datenträger belasten.\n— Robuste Eingabegeräte und Bedienung mit Handschuhen.\nWeitere fachlich sinnvolle Antworten sind möglich.",
        rubric:[
          {id:"s5-1d-r1", criterion:"Erste Anforderung fachlich korrekt", points:1},
          {id:"s5-1d-r2", criterion:"Erste Anforderung nachvollziehbar begründet", points:1},
          {id:"s5-1d-r3", criterion:"Zweite Anforderung fachlich korrekt", points:1},
          {id:"s5-1d-r4", criterion:"Zweite Anforderung nachvollziehbar begründet", points:1}
        ]},
      { id:"1e", operator:"Beschreiben Sie", points:4, answerType:"text", required:true,
        prompt:"Ein Stromausfall darf nicht zum Verlust laufender Fertigungsaufträge führen. Beschreiben Sie die Aufgabe einer unterbrechungsfreien Stromversorgung und nennen Sie zwei Funktionen, die sie über die reine Überbrückung hinaus erfüllen kann.",
        minRequirements:"Aufgabe der USV, zwei weitere Funktionen",
        fallbackValue:null,
        solution:"Aufgabe: Eine USV überbrückt bei Netzausfall die Stromversorgung aus Akkus, sodass angeschlossene Systeme weiterlaufen oder zumindest kontrolliert heruntergefahren werden können. Datenverlust durch abruptes Abschalten wird vermieden.\nWeitere Funktionen, zum Beispiel:\n— Ausgleich von Spannungsschwankungen, Über- und Unterspannung sowie Filterung von Störimpulsen\n— Signalisierung an die angeschlossenen Systeme, die daraufhin ein automatisches, geordnetes Herunterfahren auslösen\n— Überwachung und Protokollierung der Netzqualität sowie Meldung von Akkuzustand und Wartungsbedarf",
        rubric:[
          {id:"s5-1e-r1", criterion:"Überbrückung bei Netzausfall als Aufgabe genannt", points:1},
          {id:"s5-1e-r2", criterion:"Vermeidung von Datenverlust oder geordnetes Herunterfahren", points:1},
          {id:"s5-1e-r3", criterion:"Erste Zusatzfunktion fachlich korrekt", points:1},
          {id:"s5-1e-r4", criterion:"Zweite Zusatzfunktion fachlich korrekt", points:1}
        ]}
    ]
  },
  {
    id: "2", title: "Netzwerk und Projektplanung", points: 25,
    context: "Das Fertigungsnetz wird von der Verwaltung getrennt. Zur Verfügung steht das private Netz 10.30.7.0/24. Benötigt werden vier gleich große Teilnetze für Fertigungslinie 1, Fertigungslinie 2, Qualitätssicherung und Instandhaltung mit je höchstens 55 Endgeräten.",
    subtasks: [
      { id:"2a", operator:"Ermitteln Sie", points:8, answerType:"number_with_working", required:true,
        prompt:"Ermitteln Sie die passende Präfixlänge und geben Sie für das zweite Teilnetz Netzadresse, erste und letzte nutzbare Hostadresse, Broadcastadresse sowie die Anzahl nutzbarer Hostadressen an. Geben Sie den Rechenweg an.",
        minRequirements:"Präfix, vier Adressen, Hostanzahl, Rechenweg",
        fallbackValue:"/26, Netz 10.30.7.64",
        solution:"Vier Teilnetze benötigen 2 geliehene Bits: 2² = 4. Aus /24 wird /26.\nHostbits: 32 − 26 = 6 → 2⁶ − 2 = 62 nutzbare Hostadressen, ausreichend für 55 Geräte.\nSprungweite: 256 − 192 = 64.\nTeilnetze: .0 | .64 | .128 | .192\nZweites Teilnetz:\nNetzadresse 10.30.7.64\nErster Host 10.30.7.65\nLetzter Host 10.30.7.126\nBroadcast 10.30.7.127\nNutzbare Hostadressen: 62",
        rubric:[
          {id:"s5-2a-r1", criterion:"Präfix /26 korrekt ermittelt", points:1},
          {id:"s5-2a-r2", criterion:"Begründung über geliehene Bits oder Hostbedarf", points:1},
          {id:"s5-2a-r3", criterion:"Sprungweite 64 erkannt", points:1},
          {id:"s5-2a-r4", criterion:"Netzadresse 10.30.7.64", points:1},
          {id:"s5-2a-r5", criterion:"Erste Hostadresse 10.30.7.65", points:1},
          {id:"s5-2a-r6", criterion:"Letzte Hostadresse 10.30.7.126", points:1},
          {id:"s5-2a-r7", criterion:"Broadcastadresse 10.30.7.127", points:1},
          {id:"s5-2a-r8", criterion:"62 nutzbare Hostadressen", points:1}
        ]},
      { id:"2b", operator:"Begründen Sie", points:5, answerType:"text", required:true,
        prompt:"Die Steuerrechner der Fertigungsanlagen sollen keinen direkten Zugang zum Internet erhalten. Begründen Sie diese Entscheidung und beschreiben Sie, wie notwendige Aktualisierungen dennoch eingespielt werden können.",
        minRequirements:"Begründung der Abschottung, Lösung für Aktualisierungen",
        fallbackValue:null,
        solution:"Begründung: Steuerrechner laufen oft mit älteren, nicht mehr gepflegten Systemen und dürfen im laufenden Betrieb nicht neu gestartet werden. Ein direkter Internetzugang setzt sie Angriffen aus; ein erfolgreicher Angriff kann die Produktion stoppen oder Sicherheitsfunktionen beeinträchtigen. Zudem lassen sich Änderungen an validierten Anlagen nicht beliebig einspielen.\nLösung: Das Fertigungsnetz wird abgeschottet und nur über kontrollierte Übergänge angebunden. Aktualisierungen werden zunächst auf einem internen Verteilserver bereitgestellt, dort geprüft und freigegeben und anschließend in geplanten Wartungsfenstern eingespielt. Der Übergang erfolgt über eine Firewall mit eng gefassten Regeln, gegebenenfalls über ein Zwischennetz (DMZ) oder eine Datenschleuse.",
        rubric:[
          {id:"s5-2b-r1", criterion:"Angriffsrisiko für Steuerrechner benannt", points:1},
          {id:"s5-2b-r2", criterion:"Folge für die Produktion beschrieben", points:1},
          {id:"s5-2b-r3", criterion:"Interner Verteilserver oder Datenschleuse genannt", points:1},
          {id:"s5-2b-r4", criterion:"Prüfung und Freigabe vor dem Einspielen erwähnt", points:1},
          {id:"s5-2b-r5", criterion:"Kontrollierter Übergang über Firewall oder DMZ", points:1}
        ]},
      { id:"2c", operator:"Erläutern Sie", points:5, answerType:"text", required:true,
        prompt:"Zwischen den beiden Standorten besteht eine Standleitung. Erläutern Sie den Unterschied zwischen einem LAN und einem WAN und ordnen Sie die Standortkopplung begründet einer der beiden Netzarten zu.",
        minRequirements:"Beide Netzarten abgegrenzt, begründete Zuordnung",
        fallbackValue:null,
        solution:"LAN: räumlich begrenztes Netz innerhalb eines Gebäudes oder Geländes, in eigener Verantwortung betrieben, mit hohen Übertragungsraten und geringen Laufzeiten. Typische Technik: Ethernet.\nWAN: überbrückt große geografische Entfernungen und verbindet räumlich getrennte Standorte. Die Übertragungsstrecke wird in der Regel von einem Anbieter bereitgestellt, die Bandbreite ist meist geringer und die Laufzeit höher.\nZuordnung: Die Kopplung der beiden Standorte über eine Standleitung ist ein WAN, da eine öffentliche beziehungsweise angemietete Strecke über eine größere Entfernung genutzt wird und die Infrastruktur nicht vollständig im eigenen Verantwortungsbereich liegt.",
        rubric:[
          {id:"s5-2c-r1", criterion:"LAN als räumlich begrenztes Netz erklärt", points:1},
          {id:"s5-2c-r2", criterion:"Merkmal des LAN genannt (Rate, eigene Infrastruktur)", points:1},
          {id:"s5-2c-r3", criterion:"WAN als Netz über große Entfernung erklärt", points:1},
          {id:"s5-2c-r4", criterion:"Merkmal des WAN genannt (Anbieter, Bandbreite, Laufzeit)", points:1},
          {id:"s5-2c-r5", criterion:"Standortkopplung begründet als WAN eingeordnet", points:1}
        ]},
      { id:"2d", operator:"Vervollständigen Sie", points:7, answerType:"table", required:true,
        prompt:"Für die Einführung der Maschinendatenerfassung wurde ein Netzplan aufgestellt. Die Vorgänge lauten:\nA Aufnahme der Anlagen (3), Start\nB Sensoren montieren (4), nach A\nC Software beschaffen (2), nach A\nD Anbindung programmieren (5), nach B\nE Testauswertung (3), nach C\nF Abnahme (2), nach D und E\n\nEin Kollege hat folgende Werte eingetragen:\nA: FAZ 0, FEZ 3, SAZ 0, SEZ 3, GP 0\nB: FAZ 2, FEZ 7, SAZ 3, SEZ 7, GP 0\nC: FAZ 3, FEZ 5, SAZ 7, SEZ 9, GP 0\nD: FAZ 7, FEZ 12, SAZ 7, SEZ 12, GP 0\nE: FAZ 5, FEZ 8, SAZ 9, SEZ 12, GP 4\nF: FAZ 8, FEZ 14, SAZ 12, SEZ 14, GP 0\n\nDrei Einträge sind fehlerhaft. Benennen Sie je Fehler den betroffenen Vorgang, die fehlerhafte Größe und den korrekten Wert. Geben Sie zusätzlich die Gesamtprojektdauer und den kritischen Pfad an.",
        minRequirements:"Drei Fehler mit Vorgang, Größe und Korrektur, Dauer, kritischer Pfad",
        fallbackValue:"14 Arbeitstage, kritischer Pfad A-B-D-F",
        solution:"Korrekte Werte:\nVorwärts: A 0→3 | B 3→7 | C 3→5 | D 7→12 | E 5→8 | F: FAZ = max(12; 8) = 12 → 14\nRückwärts: F 14→12 | D 12→7 | E 12→9 | B 7→3 | C 9→7 | A 3→0\n\nDie drei Fehler:\n1. Vorgang B, Größe FAZ: eingetragen 2, korrekt 3 (A endet frühestens am Tag 3).\n2. Vorgang C, Größe GP: eingetragen 0, korrekt 4 (SAZ 7 − FAZ 3 = 4). C liegt nicht auf dem kritischen Pfad.\n3. Vorgang F, Größe FAZ: eingetragen 8, korrekt 12. Bei mehreren Vorgängern gilt das späteste FEZ, hier D mit 12 statt E mit 8.\n\nGesamtprojektdauer: 14 Arbeitstage\nKritischer Pfad: A – B – D – F (alle mit Gesamtpuffer 0)",
        rubric:[
          {id:"s5-2d-r1", criterion:"Fehler bei Vorgang B (FAZ) erkannt", points:1},
          {id:"s5-2d-r2", criterion:"Korrektur FAZ von B auf 3", points:1},
          {id:"s5-2d-r3", criterion:"Fehler bei Vorgang C (GP) erkannt", points:1},
          {id:"s5-2d-r4", criterion:"Korrektur GP von C auf 4", points:1},
          {id:"s5-2d-r5", criterion:"Fehler bei Vorgang F (FAZ) erkannt und auf 12 korrigiert", points:1},
          {id:"s5-2d-r6", criterion:"Gesamtprojektdauer 14 Arbeitstage", points:1},
          {id:"s5-2d-r7", criterion:"Kritischer Pfad A-B-D-F", points:1}
        ]}
    ]
  },
  {
    id: "3", title: "Digitalisierung, Datenschutz und IT-Sicherheit", points: 25,
    context: "Die Maschinendatenerfassung soll Stillstände sichtbar machen. Gleichzeitig sind die Steuerrechner gegen Angriffe abzusichern.",
    subtasks: [
      { id:"3a", operator:"Erläutern Sie", points:6, answerType:"text", required:true,
        prompt:"Aus den Maschinendaten lässt sich ableiten, welche Person an welcher Anlage wie lange gearbeitet hat. Erläutern Sie, warum dadurch der Beschäftigtendatenschutz betroffen ist, und nennen Sie zwei Maßnahmen, mit denen die Auswertung datenschutzkonform gestaltet werden kann.",
        minRequirements:"Betroffenheit begründet, zwei Maßnahmen",
        fallbackValue:null,
        solution:"Sobald sich Maschinendaten einer bestimmten Person zuordnen lassen, handelt es sich um personenbezogene Daten. Eine Auswertung ermöglicht dann Rückschlüsse auf Arbeitstempo, Pausen und Leistung; sie wäre eine Verhaltens- und Leistungskontrolle und bedarf einer Rechtsgrundlage.\nMaßnahmen, zum Beispiel:\n— Auswertung nur aggregiert je Anlage oder Schicht statt je Person\n— Pseudonymisierung der Personenkennung, sodass Einzelauswertungen nicht ohne Weiteres möglich sind\n— Zweckbindung und schriftliche Festlegung der zulässigen Auswertungen\n— Beteiligung des Betriebsrats und Betriebsvereinbarung zur Nutzung\n— Beschränkung der Zugriffsrechte und begrenzte Speicherdauer",
        rubric:[
          {id:"s5-3a-r1", criterion:"Personenbezug der Daten erkannt", points:1},
          {id:"s5-3a-r2", criterion:"Leistungs- oder Verhaltenskontrolle als Problem benannt", points:1},
          {id:"s5-3a-r3", criterion:"Notwendigkeit einer Rechtsgrundlage erwähnt", points:1},
          {id:"s5-3a-r4", criterion:"Erste Maßnahme fachlich korrekt", points:1},
          {id:"s5-3a-r5", criterion:"Zweite Maßnahme fachlich korrekt", points:1},
          {id:"s5-3a-r6", criterion:"Wirkung mindestens einer Maßnahme erläutert", points:1}
        ]},
      { id:"3b", operator:"Beschreiben Sie", points:5, answerType:"text", required:true,
        prompt:"Beschreiben Sie, wie eine automatisierte Auswertung der Maschinendaten die Instandhaltung unterstützen kann, und nennen Sie zwei Vorteile gegenüber einer rein starren Wartung nach festem Intervall.",
        minRequirements:"Anwendung beschrieben, zwei Vorteile",
        fallbackValue:null,
        solution:"Anwendung: Sensoren erfassen laufend Werte wie Temperatur, Vibration, Stromaufnahme und Laufzeit. Ein Auswertungssystem vergleicht diese mit Erfahrungswerten und meldet Abweichungen, die auf Verschleiß hindeuten, bevor ein Ausfall eintritt (zustandsorientierte beziehungsweise vorausschauende Instandhaltung).\nVorteile, zum Beispiel:\n— Wartung erfolgt bedarfsgerecht statt nach starrem Intervall; unnötige Eingriffe an intakten Anlagen entfallen\n— Ungeplante Stillstände werden reduziert, weil sich anbahnende Schäden früher auffallen\n— Ersatzteile und Personal lassen sich vorausschauend einplanen\n— Die Lebensdauer der Komponenten wird besser ausgenutzt",
        rubric:[
          {id:"s5-3b-r1", criterion:"Sensordatenerfassung und Auswertung beschrieben", points:1},
          {id:"s5-3b-r2", criterion:"Früherkennung von Verschleiß oder Ausfällen erkannt", points:1},
          {id:"s5-3b-r3", criterion:"Erster Vorteil fachlich korrekt", points:1},
          {id:"s5-3b-r4", criterion:"Zweiter Vorteil fachlich korrekt", points:1},
          {id:"s5-3b-r5", criterion:"Abgrenzung zur intervallbasierten Wartung erkennbar", points:1}
        ]},
      { id:"3c", operator:"Erläutern Sie", points:6, answerType:"text", required:true,
        prompt:"Ein Fertigungsbetrieb wurde durch Verschlüsselungssoftware lahmgelegt. Erläutern Sie den typischen Ablauf eines solchen Angriffs und nennen Sie drei Maßnahmen, die den Schaden begrenzen oder den Angriff verhindern.",
        minRequirements:"Ablauf beschrieben, drei Maßnahmen",
        fallbackValue:null,
        solution:"Typischer Ablauf: Der Einstieg erfolgt meist über einen manipulierten E-Mail-Anhang, einen präparierten Link oder eine ungepatchte, aus dem Internet erreichbare Schwachstelle. Die Schadsoftware verschafft sich Rechte, verbreitet sich im Netz auf weitere Systeme, greift dabei häufig auch erreichbare Sicherungen an, verschlüsselt anschließend die Daten und hinterlässt eine Lösegeldforderung. Oft werden vorher Daten abgezogen, um zusätzlich mit Veröffentlichung zu drohen.\nMaßnahmen, zum Beispiel:\n— Sicherungen mit Air Gap oder unveränderbar (WORM), damit sie nicht mitverschlüsselt werden können\n— Zeitnahes Einspielen von Sicherheitsaktualisierungen und Abschalten nicht benötigter Dienste\n— Netzsegmentierung, damit sich die Schadsoftware nicht frei ausbreitet\n— Rechte nach dem Prinzip der geringsten Rechte, keine dauerhaften Administratorrechte im Alltag\n— Schulung der Beschäftigten und Filterung von E-Mail-Anhängen\n— Regelmäßiges Testen der Wiederherstellung",
        rubric:[
          {id:"s5-3c-r1", criterion:"Einstiegsweg plausibel beschrieben", points:1},
          {id:"s5-3c-r2", criterion:"Ausbreitung im Netz erwähnt", points:1},
          {id:"s5-3c-r3", criterion:"Verschlüsselung und Lösegeldforderung genannt", points:1},
          {id:"s5-3c-r4", criterion:"Erste Maßnahme fachlich korrekt", points:1},
          {id:"s5-3c-r5", criterion:"Zweite Maßnahme fachlich korrekt", points:1},
          {id:"s5-3c-r6", criterion:"Dritte Maßnahme fachlich korrekt", points:1}
        ]},
      { id:"3d", operator:"Berechnen Sie", points:8, answerType:"number_with_working", required:true,
        prompt:"An den Anlagen sind 120 Sensoren angebracht. Jeder Sensor liefert 2 Messwerte pro Sekunde, ein Messwert belegt 48 Byte. Eine Schicht dauert 8 Stunden. Für MiB ist mit 1.024 zu rechnen.\n\naa) Berechnen Sie die anfallende Datenmenge pro Sekunde in Byte.\nab) Berechnen Sie die Datenmenge einer Schicht in MiB, gerundet auf eine Nachkommastelle.\nac) Berechnen Sie die benötigte Übertragungsrate in Mbit/s, gerundet auf zwei Nachkommastellen.\n\nGeben Sie bei allen Ergebnissen die Einheit an.",
        minRequirements:"Drei Ergebnisse mit Rechenweg und Einheit",
        fallbackValue:"11.520 Byte pro Sekunde",
        solution:"aa) 120 Sensoren × 2 Messwerte/s × 48 Byte = 11.520 Byte pro Sekunde\n\nab) Sekunden je Schicht: 8 × 3.600 = 28.800 s\n11.520 Byte/s × 28.800 s = 331.776.000 Byte\n331.776.000 ÷ 1.024² = 331.776.000 ÷ 1.048.576 = 316,40… MiB ≈ 316,4 MiB\n\nac) 11.520 Byte/s × 8 = 92.160 Bit/s\n92.160 ÷ 1.000.000 = 0,09216 Mbit/s ≈ 0,09 Mbit/s",
        rubric:[
          {id:"s5-3d-r1", criterion:"Ansatz Sensoren × Messwerte × Byte erkennbar", points:1},
          {id:"s5-3d-r2", criterion:"Ergebnis aa) 11.520 Byte pro Sekunde", points:1},
          {id:"s5-3d-r3", criterion:"Sekunden je Schicht 28.800 korrekt", points:1},
          {id:"s5-3d-r4", criterion:"Datenmenge je Schicht 331.776.000 Byte", points:1},
          {id:"s5-3d-r5", criterion:"Umrechnung mit 1.024² angewandt", points:1},
          {id:"s5-3d-r6", criterion:"Ergebnis ab) rund 316,4 MiB", points:1},
          {id:"s5-3d-r7", criterion:"Umrechnung Byte in Bit (×8) für die Rate", points:1},
          {id:"s5-3d-r8", criterion:"Ergebnis ac) rund 0,09 Mbit/s mit Einheit", points:1}
        ]}
    ]
  },
  {
    id: "4", title: "Software und Daten", points: 25,
    context: "Für die Maschinendatenerfassung wird eine Anwendung entwickelt. Zu verwalten sind Anlagen, Sensoren und die erfassten Messwerte.",
    subtasks: [
      { id:"4a", operator:"Modellieren Sie", points:7, answerType:"diagram_text", required:true,
        prompt:"Beschreiben Sie ein UML-Klassendiagramm mit den Klassen Anlage, Sensor und Messwert. Geben Sie je Klasse mindestens zwei Attribute mit Sichtbarkeit und Datentyp, je eine Methode sowie die Beziehungen mit Multiplizitäten an. Eine textliche Darstellung ist zulässig.",
        minRequirements:"Drei Klassen mit Attributen, Sichtbarkeiten, Methoden, Beziehungen mit Multiplizitäten",
        fallbackValue:null,
        solution:"Beispiel:\nAnlage\n- anlagenNr : Integer\n- bezeichnung : String\n+ getBezeichnung() : String\n\nSensor\n- sensorNr : Integer\n- messgroesse : String\n+ getMessgroesse() : String\n\nMesswert\n- messwertNr : Integer\n- zeitpunkt : DateTime\n- wert : Double\n+ getWert() : Double\n\nBeziehungen:\nAnlage 1 — 1..* Sensor (an einer Anlage sitzen mehrere Sensoren, jeder Sensor gehört zu genau einer Anlage)\nSensor 1 — 0..* Messwert (ein Sensor liefert beliebig viele Messwerte)\nDie Beziehung Anlage–Sensor kann als Komposition modelliert werden, da ein Sensor ohne die zugehörige Anlage fachlich nicht sinnvoll existiert.\nSichtbarkeiten: − private, + public.",
        rubric:[
          {id:"s5-4a-r1", criterion:"Drei Klassen mit passenden Namen", points:1},
          {id:"s5-4a-r2", criterion:"Je Klasse mindestens zwei Attribute mit Datentyp", points:1},
          {id:"s5-4a-r3", criterion:"Sichtbarkeiten korrekt notiert (+ / −)", points:1},
          {id:"s5-4a-r4", criterion:"Je Klasse mindestens eine Methode", points:1},
          {id:"s5-4a-r5", criterion:"Beziehung Anlage–Sensor modelliert", points:1},
          {id:"s5-4a-r6", criterion:"Beziehung Sensor–Messwert modelliert", points:1},
          {id:"s5-4a-r7", criterion:"Multiplizitäten fachlich korrekt", points:1}
        ]},
      { id:"4b", operator:"Vervollständigen Sie", points:7, answerType:"table", required:true,
        prompt:"Überführen Sie das Modell in ein relationales Datenmodell. Geben Sie für die drei Tabellen die Spalten an und kennzeichnen Sie Primärschlüssel mit PK und Fremdschlüssel mit FK. Begründen Sie zusätzlich, warum die Messwerte nicht als weitere Spalten in der Sensortabelle gespeichert werden.",
        minRequirements:"Drei Tabellen mit PK und FK, Begründung",
        fallbackValue:null,
        solution:"Anlage(anlagenNr PK, bezeichnung, standort)\nSensor(sensorNr PK, messgroesse, anlagenNr FK → Anlage)\nMesswert(messwertNr PK, zeitpunkt, wert, sensorNr FK → Sensor)\n\nBegründung: Je Sensor fallen laufend neue Messwerte an, deren Anzahl nicht im Voraus feststeht. Als Spalten müsste die Tabelle ständig erweitert werden, und leere Felder blieben ungenutzt; das verletzt zudem die erste Normalform, da mehrere gleichartige Werte in einer Zeile stünden. Eine eigene Tabelle mit Fremdschlüssel bildet die 1:n-Beziehung sauber ab und erlaubt beliebig viele Messwerte je Sensor.",
        rubric:[
          {id:"s5-4b-r1", criterion:"Tabelle Anlage mit Primärschlüssel", points:1},
          {id:"s5-4b-r2", criterion:"Tabelle Sensor mit Primärschlüssel", points:1},
          {id:"s5-4b-r3", criterion:"Fremdschlüssel Sensor auf Anlage korrekt", points:1},
          {id:"s5-4b-r4", criterion:"Tabelle Messwert mit Primärschlüssel", points:1},
          {id:"s5-4b-r5", criterion:"Fremdschlüssel Messwert auf Sensor korrekt", points:1},
          {id:"s5-4b-r6", criterion:"PK und FK eindeutig gekennzeichnet", points:1},
          {id:"s5-4b-r7", criterion:"Begründung über unbestimmte Anzahl oder 1. Normalform", points:1}
        ]},
      { id:"4c", operator:"Führen Sie einen Schreibtischtest durch", points:6, answerType:"code", required:true,
        prompt:"Der folgende Pseudocode soll den höchsten gemessenen Wert einer Messreihe zurückgeben.\n\n1  maximum = 0\n2  FÜR JEDEN wert IN messreihe\n3      WENN wert > maximum DANN\n4          maximum = wert\n5  RÜCKGABE maximum\n\naa) Geben Sie den Rückgabewert für die Messreihe 12, 47, 33, 47, 8 an.\nab) Die Messreihe kann auch negative Temperaturwerte enthalten, zum Beispiel −5, −12, −3. Geben Sie den Rückgabewert für diese Reihe an und erläutern Sie, warum das Ergebnis fachlich falsch ist.\nac) Beschreiben Sie, wie die Initialisierung in Zeile 1 geändert werden muss, damit die Funktion auch für negative Werte korrekt arbeitet.",
        minRequirements:"Zwei Rückgabewerte, Fehlererklärung, Korrekturvorschlag",
        fallbackValue:null,
        solution:"aa) Rückgabewert: 47. Der Wert 47 tritt zweimal auf; die Bedingung greift beim ersten Auftreten, das zweite ändert nichts.\n\nab) Rückgabewert: 0. Kein negativer Wert ist größer als der Startwert 0, daher bleibt maximum unverändert. Fachlich falsch ist das, weil 0 in der Messreihe gar nicht vorkommt; der höchste tatsächlich gemessene Wert wäre −3.\n\nac) Statt mit 0 zu starten, wird maximum mit dem ersten Element der Messreihe vorbelegt und erst ab dem zweiten Element verglichen. Alternativ kann mit dem kleinstmöglichen Zahlenwert initialisiert werden. Zusätzlich sollte der Fall einer leeren Messreihe gesondert behandelt werden.",
        rubric:[
          {id:"s5-4c-r1", criterion:"Rückgabewert aa) 47 korrekt", points:1},
          {id:"s5-4c-r2", criterion:"Umgang mit dem doppelten Wert erläutert", points:1},
          {id:"s5-4c-r3", criterion:"Rückgabewert ab) 0 korrekt", points:1},
          {id:"s5-4c-r4", criterion:"Erklärt, dass kein negativer Wert größer als 0 ist", points:1},
          {id:"s5-4c-r5", criterion:"Erkannt, dass 0 nicht in der Messreihe vorkommt", points:1},
          {id:"s5-4c-r6", criterion:"Initialisierung mit erstem Element oder Minimalwert vorgeschlagen", points:1}
        ]},
      { id:"4d", operator:"Erläutern Sie", points:5, answerType:"text", required:true,
        prompt:"Die Messwerttabelle wächst täglich um mehrere Millionen Zeilen. Erläutern Sie zwei Maßnahmen, mit denen Auswertungen trotzdem in vertretbarer Zeit möglich bleiben, und nennen Sie je einen Nachteil.",
        minRequirements:"Zwei Maßnahmen mit je einem Nachteil",
        fallbackValue:null,
        solution:"Maßnahmen, zum Beispiel:\n— Index auf häufig gefilterte Spalten wie Zeitpunkt und Sensornummer: Suchen und Verknüpfen werden erheblich beschleunigt. Nachteil: zusätzlicher Speicherbedarf und langsamere Schreibvorgänge, was bei sehr hoher Einfügerate spürbar ist.\n— Verdichtung älterer Daten (Aggregation): Für zurückliegende Zeiträume werden statt Einzelmesswerten nur noch Mittel-, Höchst- und Tiefstwerte je Stunde oder Tag gespeichert. Nachteil: Die ursprüngliche Auflösung geht verloren, spätere Detailanalysen sind nicht mehr möglich.\n— Archivierung oder Partitionierung nach Zeiträumen: Aktuelle Daten bleiben in einer kleinen, schnellen Tabelle. Nachteil: höherer Verwaltungsaufwand und Zugriffe über mehrere Bereiche werden komplexer.",
        rubric:[
          {id:"s5-4d-r1", criterion:"Erste Maßnahme fachlich korrekt", points:1},
          {id:"s5-4d-r2", criterion:"Wirkung der ersten Maßnahme erläutert", points:1},
          {id:"s5-4d-r3", criterion:"Nachteil der ersten Maßnahme genannt", points:1},
          {id:"s5-4d-r4", criterion:"Zweite Maßnahme fachlich korrekt mit Wirkung", points:1},
          {id:"s5-4d-r5", criterion:"Nachteil der zweiten Maßnahme genannt", points:1}
        ]}
    ]
  }
  ]
},
{
  examId: "AP2-SIM-06",
  title: "Prüfungssimulation 06 — Serverbetrieb, Cloud und Systemverwaltung",
  branche: "Systemtechnik (erhöhter Schwerpunkt Systemintegration)",
  durationMinutes: 90,
  maxPoints: 100,
  disclaimer: "Unverbindliche Übungssimulation. Keine offizielle IHK-Prüfung und keine verbindliche Bewertung. Diese Variante liegt schwerpunktmäßig im Bereich Konzeption und Administration von IT-Systemen und geht damit über die typischen AP1-Inhalte hinaus.",
  scenario: "Die Nordmark Systemtechnik GmbH in Kiel ist Zulieferer für die Windenergiebranche und beschäftigt 140 Mitarbeitende. Sie arbeiten im Team IT-Systeme und sind in mehrere Vorhaben eingebunden: einen neuen Webserver in Betrieb nehmen, dessen sicheren Betrieb gewährleisten, die Verfügbarkeit der Dienste sicherstellen und eine Software zur Auftragsverwaltung weiterentwickeln.",
  tasks: [
  {
    id: "1", title: "Planung und Inbetriebnahme eines Webservers", points: 28,
    context: "Im Rechenzentrum der Nordmark Systemtechnik GmbH soll ein neuer Webserver aufgebaut werden.",
    subtasks: [
      { id:"1a", operator:"Berechnen Sie", points:6, answerType:"number_with_working", required:true,
        prompt:"Dem Server fehlt noch das Netzteil. Er ist wie folgt bestückt:\n\n1 × Mainboard 50 W\n2 × CPU je 95 W\n6 × RAM-Riegel je 4 W\n3 × SSD je 9 W\n2 × Netzwerkkarte je 7 W\n\nBerechnen Sie den Leistungsbedarf. Schlagen Sie auf die ermittelte Leistungsaufnahme aller Komponenten einen Leistungspuffer von 20 % auf und gehen Sie von einem Wirkungsgrad des Netzteils von 92 % aus. Bestimmen Sie die erforderliche Leistung des Netzteils und geben Sie die mindestens erforderliche Leistung in einer marktüblichen Größe an. Verfügbar sind Netzteile mit 250 W, 300 W, … , 550 W, 600 W in 50-W-Abstufungen. Der Rechenweg ist anzugeben.",
        minRequirements:"Summe der Komponenten, Puffer, Wirkungsgrad, marktübliche Größe mit Einheit",
        fallbackValue:"400 W",
        solution:"Leistungsaufnahme der Komponenten:\nMainboard 1 × 50 W = 50 W\nCPU 2 × 95 W = 190 W\nRAM 6 × 4 W = 24 W\nSSD 3 × 9 W = 27 W\nNetzwerkkarten 2 × 7 W = 14 W\nSumme: 305 W\n\nLeistungspuffer 20 %: 305 W × 1,20 = 366 W\n\nWirkungsgrad 92 %: 366 W ÷ 0,92 = 397,83 W\n\nDas Netzteil muss mindestens 397,83 W aufnehmen können. Die nächstgrößere marktübliche Größe ist 400 W.",
        rubric:[
          {id:"s6-1a-r1", criterion:"Einzelleistungen korrekt multipliziert", points:1},
          {id:"s6-1a-r2", criterion:"Summe 305 W korrekt", points:1},
          {id:"s6-1a-r3", criterion:"Puffer von 20 % korrekt aufgeschlagen (366 W)", points:1},
          {id:"s6-1a-r4", criterion:"Division durch den Wirkungsgrad 0,92 angesetzt", points:1},
          {id:"s6-1a-r5", criterion:"Zwischenergebnis rund 397,8 W", points:1},
          {id:"s6-1a-r6", criterion:"Marktübliche Größe 400 W mit Einheit angegeben", points:1}
        ]},
      { id:"1b", operator:"Erläutern Sie", points:6, answerType:"text", required:true,
        prompt:"Der Server soll gehärtet werden. Erläutern Sie zwei Einstellungen, mit denen Sie den Server bereits im UEFI beziehungsweise BIOS härten, und begründen Sie jeweils deren Wirkung.",
        minRequirements:"Zwei Einstellungen mit jeweiliger Erläuterung",
        fallbackValue:null,
        solution:"Mögliche Einstellungen:\n— Passwortschutz für das UEFI/BIOS setzen: Verhindert, dass Unbefugte Firmware-Einstellungen ändern, etwa die Bootreihenfolge oder Sicherheitsfunktionen.\n— Secure Boot aktivieren: Es werden nur signierte Bootloader und Kernel gestartet; manipulierte oder untergeschobene Startumgebungen werden abgewiesen.\n— Bootreihenfolge festlegen und Start von USB oder Netzwerk deaktivieren: Verhindert das Starten eines fremden Systems vom Wechseldatenträger, mit dem Datenträger ausgelesen werden könnten.\n— Nicht benötigte Schnittstellen und Geräte deaktivieren (z. B. unbenutzte USB-Ports, serielle Schnittstellen): Verkleinert die Angriffsfläche.\n— TPM aktivieren: Ermöglicht die sichere Ablage von Schlüsseln, etwa für die Datenträgerverschlüsselung.",
        rubric:[
          {id:"s6-1b-r1", criterion:"Erste Einstellung fachlich korrekt und im UEFI/BIOS verortet", points:1},
          {id:"s6-1b-r2", criterion:"Wirkung der ersten Einstellung erläutert", points:1},
          {id:"s6-1b-r3", criterion:"Sicherheitsgewinn der ersten Einstellung nachvollziehbar", points:1},
          {id:"s6-1b-r4", criterion:"Zweite Einstellung fachlich korrekt und im UEFI/BIOS verortet", points:1},
          {id:"s6-1b-r5", criterion:"Wirkung der zweiten Einstellung erläutert", points:1},
          {id:"s6-1b-r6", criterion:"Sicherheitsgewinn der zweiten Einstellung nachvollziehbar", points:1}
        ]},
      { id:"1c", operator:"Nennen Sie", points:6, answerType:"table", required:true,
        prompt:"Neben der Härtung einzelner Systeme sollen auch übergreifende Sicherheitsmaßnahmen angewendet werden.\n\nBeispiel: Zutrittskontrolle per Chipkarte für den Serverraum — verhindert unbefugten körperlichen Zugriff auf Systeme mit sensiblen Daten und schützt vor Diebstahl oder Manipulation.\n\nNennen Sie zwei weitere technische oder organisatorische Maßnahmen (TOM), mit denen Server und Daten geschützt werden, und erläutern Sie deren Nutzen.",
        minRequirements:"Zwei Maßnahmen mit jeweiliger Erläuterung des Nutzens",
        fallbackValue:null,
        solution:"Mögliche Maßnahmen:\n— Verschlüsselung der Datenträger: Bei Diebstahl oder unsachgemäßer Entsorgung bleiben die Daten unlesbar.\n— Protokollierung sicherheitsrelevanter Ereignisse und regelmäßige Auswertung: Zugriffe werden nachvollziehbar, Auffälligkeiten fallen früher auf.\n— Rollen- und Berechtigungskonzept nach dem Prinzip der geringsten Rechte: Begrenzt den Schaden, wenn ein Konto kompromittiert wird.\n— Unterbrechungsfreie Stromversorgung und Klimatisierung des Serverraums: Schützt vor Datenverlust durch Stromausfall und vor Ausfällen durch Überhitzung.\n— Regelmäßige Datensicherung mit getrennter Aufbewahrung und getesteter Wiederherstellung.\n— Verbindliche Verpflichtung der Beschäftigten auf Vertraulichkeit sowie Schulungen.",
        rubric:[
          {id:"s6-1c-r1", criterion:"Erste Maßnahme fachlich korrekt und vom Beispiel verschieden", points:1},
          {id:"s6-1c-r2", criterion:"Nutzen der ersten Maßnahme erläutert", points:1},
          {id:"s6-1c-r3", criterion:"Bezug der ersten Maßnahme zum Schutz von Server oder Daten", points:1},
          {id:"s6-1c-r4", criterion:"Zweite Maßnahme fachlich korrekt und vom Beispiel verschieden", points:1},
          {id:"s6-1c-r5", criterion:"Nutzen der zweiten Maßnahme erläutert", points:1},
          {id:"s6-1c-r6", criterion:"Bezug der zweiten Maßnahme zum Schutz von Server oder Daten", points:1}
        ]},
      { id:"1d", operator:"Erläutern Sie", points:4, answerType:"text", required:true,
        prompt:"Auf dem Server wird ein Linux-Betriebssystem installiert. In der Dokumentation heißt es:\n\n\"A boot manager is the first program that runs after the firmware hands over control. It locates the kernel of the operating system on the storage device, loads it into memory and starts it. If more than one operating system is installed, the boot manager shows a menu so that the user can select which system to start.\"\n\nErläutern Sie Funktion und Zweck eines Bootmanagers anhand dieses Textes. Eine wörtliche Übersetzung ist nicht gefordert.",
        minRequirements:"Funktion und Zweck sinngemäß erläutert",
        fallbackValue:null,
        solution:"Der Bootmanager ist das erste Programm, das nach der Firmware (UEFI/BIOS) die Kontrolle über den Rechner übernimmt.\nFunktion: Er sucht den Kern des Betriebssystems auf dem Datenträger, lädt ihn in den Arbeitsspeicher und übergibt ihm die Ausführung. Er bildet damit das Bindeglied zwischen Firmware und Betriebssystem.\nZweck: Sind mehrere Betriebssysteme installiert, zeigt er ein Auswahlmenü an, sodass entschieden werden kann, welches System gestartet wird. Ohne Bootmanager könnte das Betriebssystem nicht gestartet werden.",
        rubric:[
          {id:"s6-1d-r1", criterion:"Erstes Programm nach der Firmware erkannt", points:1},
          {id:"s6-1d-r2", criterion:"Laden des Betriebssystemkerns in den Arbeitsspeicher beschrieben", points:1},
          {id:"s6-1d-r3", criterion:"Starten beziehungsweise Übergabe an das Betriebssystem genannt", points:1},
          {id:"s6-1d-r4", criterion:"Auswahlmenü bei mehreren Systemen als Zweck genannt", points:1}
        ]},
      { id:"1e", operator:"Erläutern Sie", points:6, answerType:"text", required:true,
        prompt:"Nach der Installation des Betriebssystems bricht der Neustart des Servers mit folgender Meldung des Bootmanagers ab:\n\nBootmanager wird geladen ...\nerror: no such partition\nrecovery>\n\nErläutern Sie eine mögliche Ursache und eine dazu passende Fehlerbehebung.",
        minRequirements:"Ursache und passende Behebung, fachlich begründet",
        fallbackValue:null,
        solution:"Mögliche Ursache: Der Bootmanager findet die Partition nicht mehr, auf der seine Konfiguration beziehungsweise der Kern liegt. Das tritt zum Beispiel auf, wenn sich die Partitionierung oder die Laufwerksreihenfolge nach der Installation geändert hat, eine Partition verschoben, verkleinert oder gelöscht wurde, oder wenn der Eintrag im Bootmanager auf eine veraltete Kennung (UUID) verweist. Auch ein defekter oder unvollständig geschriebener Bootsektor kommt in Betracht.\n\nMögliche Behebung: Von einem Installations- oder Rettungsmedium starten, die vorhandene Systempartition ermitteln und einbinden, anschließend den Bootmanager mit korrekter Zuordnung neu installieren und seine Konfigurationsdatei neu erzeugen. Alternativ lässt sich im Notfallmodus des Bootmanagers die richtige Partition vorübergehend von Hand setzen und das System einmalig starten, um die Konfiguration danach dauerhaft zu korrigieren. Ergänzend die Bootreihenfolge im UEFI prüfen.",
        rubric:[
          {id:"s6-1e-r1", criterion:"Ursache benannt: Partition wird nicht gefunden", points:1},
          {id:"s6-1e-r2", criterion:"Konkreter Auslöser genannt (geänderte Partitionierung, UUID, Laufwerksreihenfolge)", points:1},
          {id:"s6-1e-r3", criterion:"Ursache fachlich nachvollziehbar erläutert", points:1},
          {id:"s6-1e-r4", criterion:"Start über Rettungs- oder Installationsmedium als Weg genannt", points:1},
          {id:"s6-1e-r5", criterion:"Neuinstallation oder Neukonfiguration des Bootmanagers beschrieben", points:1},
          {id:"s6-1e-r6", criterion:"Behebung passt schlüssig zur genannten Ursache", points:1}
        ]}
    ]
  },
  {
    id: "2", title: "Sicherer Betrieb des Webservers", points: 21,
    context: "Der Webserver erlaubt ausschließlich verschlüsselte Verbindungen. Wegen steigender Zugriffszahlen sollen weitere Webserver bereitgestellt werden.",
    subtasks: [
      { id:"2a", operator:"Erläutern Sie", points:4, answerType:"text", required:true,
        prompt:"Erläutern Sie zwei Aufgaben einer Zertifizierungsstelle (Certificate Authority).",
        minRequirements:"Zwei Aufgaben mit Erläuterung",
        fallbackValue:null,
        solution:"Mögliche Aufgaben:\n— Prüfung der Identität des Antragstellers: Vor der Ausstellung wird festgestellt, ob der Antragsteller tatsächlich über die betreffende Domain beziehungsweise Organisation verfügt.\n— Ausstellen und Signieren von Zertifikaten: Die CA bindet den öffentlichen Schlüssel an die geprüfte Identität und signiert das Zertifikat mit ihrem eigenen Schlüssel. Dadurch wird es für Dritte überprüfbar.\n— Verwalten der Gültigkeit und Sperren von Zertifikaten: Kompromittierte oder ungültige Zertifikate werden über Sperrlisten (CRL) oder Statusabfragen (OCSP) widerrufen.\n— Bereitstellen des eigenen Wurzelzertifikats als Vertrauensanker.",
        rubric:[
          {id:"s6-2a-r1", criterion:"Erste Aufgabe fachlich korrekt", points:1},
          {id:"s6-2a-r2", criterion:"Erste Aufgabe erläutert", points:1},
          {id:"s6-2a-r3", criterion:"Zweite Aufgabe fachlich korrekt", points:1},
          {id:"s6-2a-r4", criterion:"Zweite Aufgabe erläutert", points:1}
        ]},
      { id:"2b", operator:"Erläutern Sie", points:5, answerType:"text", required:true,
        prompt:"Erläutern Sie den schrittweisen Ablauf der Zertifikatsprüfung beim Verbindungsaufbau eines Clients zu Ihrem Webserver.",
        minRequirements:"Ablauf in nachvollziehbaren Schritten",
        fallbackValue:null,
        solution:"Ablauf:\n1. Der Client baut die Verbindung auf und teilt seine unterstützten Verfahren mit.\n2. Der Server sendet sein Zertifikat, in der Regel zusammen mit den Zwischenzertifikaten der ausstellenden Stellen.\n3. Der Client prüft die Zertifikatskette bis zu einem Wurzelzertifikat, dem er vertraut, und kontrolliert dabei die Signaturen.\n4. Zusätzlich prüft er Gültigkeitszeitraum, den im Zertifikat eingetragenen Namen gegen die aufgerufene Adresse sowie den Sperrstatus (CRL oder OCSP).\n5. Ist die Prüfung erfolgreich, wird über ein asymmetrisches Verfahren ein gemeinsamer Sitzungsschlüssel ausgehandelt.\n6. Die weitere Übertragung erfolgt symmetrisch verschlüsselt mit diesem Sitzungsschlüssel.",
        rubric:[
          {id:"s6-2b-r1", criterion:"Server sendet Zertifikat beziehungsweise Zertifikatskette", points:1},
          {id:"s6-2b-r2", criterion:"Prüfung der Kette bis zu einem vertrauten Wurzelzertifikat", points:1},
          {id:"s6-2b-r3", criterion:"Prüfung von Gültigkeitszeitraum oder Namensübereinstimmung", points:1},
          {id:"s6-2b-r4", criterion:"Aushandlung eines Sitzungsschlüssels beschrieben", points:1},
          {id:"s6-2b-r5", criterion:"Anschließende symmetrische Verschlüsselung der Nutzdaten", points:1}
        ]},
      { id:"2c", operator:"Erläutern Sie", points:3, answerType:"text", required:true,
        prompt:"Erläutern Sie die Funktionsweise eines Load Balancers.",
        minRequirements:"Funktionsweise und Zweck",
        fallbackValue:null,
        solution:"Ein Load Balancer nimmt die Anfragen der Clients zentral entgegen und verteilt sie nach einem festgelegten Verfahren auf mehrere dahinterliegende Server. Nach außen tritt er als einziger Ansprechpunkt auf; die Clients wissen nicht, welcher Server ihre Anfrage tatsächlich bearbeitet.\nDadurch wird die Last gleichmäßiger verteilt, die Kapazität lässt sich durch weitere Server erhöhen (Skalierung), und der Ausfall eines einzelnen Servers führt nicht zum Ausfall des Dienstes, weil der Load Balancer die betroffenen Server über Zustandsprüfungen erkennt und aus der Verteilung nimmt.",
        rubric:[
          {id:"s6-2c-r1", criterion:"Zentrale Annahme und Verteilung der Anfragen beschrieben", points:1},
          {id:"s6-2c-r2", criterion:"Verteilung auf mehrere Server nach einem Verfahren genannt", points:1},
          {id:"s6-2c-r3", criterion:"Nutzen benannt (Lastverteilung, Skalierung oder Ausfallsicherheit)", points:1}
        ]},
      { id:"2d", operator:"Erläutern Sie", points:6, answerType:"text", required:true,
        prompt:"Im Gespräch über Load Balancer fallen die Begriffe Round Robin, Least Connections und IP-Hashing. Erläutern Sie das Prinzip dieser drei Verfahren.",
        minRequirements:"Drei Verfahren einzeln erläutert",
        fallbackValue:null,
        solution:"Round Robin: Die Anfragen werden reihum der Reihe nach auf die verfügbaren Server verteilt. Nach dem letzten Server beginnt die Verteilung wieder beim ersten. Das Verfahren ist einfach, berücksichtigt aber weder die aktuelle Auslastung noch unterschiedliche Leistungsfähigkeit der Server.\n\nLeast Connections: Eine neue Anfrage geht an den Server mit der geringsten Zahl aktiver Verbindungen. Das berücksichtigt die tatsächliche Auslastung und eignet sich besonders, wenn die Anfragen unterschiedlich lange dauern.\n\nIP-Hashing: Aus der IP-Adresse des Clients wird ein Hashwert berechnet, der einen bestimmten Server bestimmt. Derselbe Client landet dadurch möglichst immer auf demselben Server, was für sitzungsbezogene Anwendungen ohne gemeinsamen Sitzungsspeicher von Vorteil ist.",
        rubric:[
          {id:"s6-2d-r1", criterion:"Round Robin als reihum verteilendes Verfahren erklärt", points:1},
          {id:"s6-2d-r2", criterion:"Merkmal oder Grenze von Round Robin genannt", points:1},
          {id:"s6-2d-r3", criterion:"Least Connections über Anzahl aktiver Verbindungen erklärt", points:1},
          {id:"s6-2d-r4", criterion:"Bezug von Least Connections zur tatsächlichen Auslastung", points:1},
          {id:"s6-2d-r5", criterion:"IP-Hashing über Hashwert der Client-Adresse erklärt", points:1},
          {id:"s6-2d-r6", criterion:"Gleichbleibende Serverzuordnung als Zweck des IP-Hashings", points:1}
        ]},
      { id:"2e", operator:"Erläutern Sie", points:3, answerType:"text", required:true,
        prompt:"Die Webserver sollen gegen typische Angriffsszenarien abgesichert werden. Erläutern Sie in diesem Zusammenhang das Angriffsszenario eines DDoS-Angriffs.",
        minRequirements:"Ablauf und Wirkung des Angriffs",
        fallbackValue:null,
        solution:"Bei einem DDoS-Angriff (Distributed Denial of Service) wird ein Dienst gezielt mit einer sehr großen Zahl von Anfragen überflutet, bis seine Kapazitätsgrenzen erreicht sind. Die Anfragen stammen dabei nicht von einem einzelnen System, sondern verteilt von vielen Rechnern gleichzeitig, häufig von einem Botnetz aus zuvor gekaperten Geräten.\nWirkung: Rechenleistung, Arbeitsspeicher oder Bandbreite des Ziels sind ausgelastet, sodass legitime Anfragen nicht mehr oder nur stark verzögert beantwortet werden. Der Dienst ist praktisch nicht mehr erreichbar. Da die Anfragen aus vielen Quellen kommen, lässt sich der Angriff nicht durch einfaches Sperren einer einzelnen Adresse abwehren.",
        rubric:[
          {id:"s6-2e-r1", criterion:"Überflutung mit Anfragen als Prinzip beschrieben", points:1},
          {id:"s6-2e-r2", criterion:"Verteilte Quellen beziehungsweise Botnetz erwähnt", points:1},
          {id:"s6-2e-r3", criterion:"Nichterreichbarkeit des Dienstes als Wirkung benannt", points:1}
        ]}
    ]
  },
  {
    id: "3", title: "Verfügbarkeit und Cloud-Betrieb", points: 26,
    context: "Die Nordmark Systemtechnik GmbH plant, ihren IT-Betrieb einschließlich des Kundenportals und der internen Warenwirtschaft in die Cloud zu verlagern. Bisher laufen die Daten auf eigenen Servern in Deutschland.",
    subtasks: [
      { id:"3a", operator:"Erläutern Sie", points:9, answerType:"table", required:true,
        prompt:"Erläutern Sie die drei grundlegenden Cloud-Servicemodelle IaaS, PaaS und SaaS und nennen Sie je ein Beispiel. Gehen Sie dabei auch darauf ein, welcher Anteil der Verantwortung jeweils beim Anbieter und welcher beim Kunden liegt.",
        minRequirements:"Drei Modelle je mit Erläuterung, Verantwortungsabgrenzung und Beispiel",
        fallbackValue:null,
        solution:"IaaS (Infrastructure as a Service): Der Anbieter stellt die grundlegende Infrastruktur bereit, also Rechenleistung, Speicher und Netz, meist als virtuelle Maschinen. Der Kunde verantwortet Betriebssystem, Middleware und Anwendungen einschließlich deren Aktualisierung. Beispiel: angemietete virtuelle Server bei einem Rechenzentrumsbetreiber.\n\nPaaS (Platform as a Service): Der Anbieter stellt zusätzlich eine fertige Laufzeit- und Entwicklungsumgebung samt Betriebssystem und Datenbank bereit und pflegt diese. Der Kunde verantwortet nur noch die eigene Anwendung und deren Daten. Beispiel: eine verwaltete Umgebung zum Bereitstellen eigener Webanwendungen.\n\nSaaS (Software as a Service): Der Anbieter stellt eine fertige Anwendung bereit und betreibt sie vollständig. Der Kunde nutzt sie nur noch, verwaltet Benutzer und Daten und konfiguriert Einstellungen. Beispiel: ein web-basiertes Kundenverwaltungs- oder Office-Paket.\n\nDie Verantwortung des Anbieters nimmt von IaaS über PaaS zu SaaS zu, die des Kunden entsprechend ab.",
        rubric:[
          {id:"s6-3a-r1", criterion:"IaaS fachlich korrekt erläutert", points:1},
          {id:"s6-3a-r2", criterion:"Verantwortungsabgrenzung bei IaaS benannt", points:1},
          {id:"s6-3a-r3", criterion:"Passendes Beispiel für IaaS", points:1},
          {id:"s6-3a-r4", criterion:"PaaS fachlich korrekt erläutert", points:1},
          {id:"s6-3a-r5", criterion:"Verantwortungsabgrenzung bei PaaS benannt", points:1},
          {id:"s6-3a-r6", criterion:"Passendes Beispiel für PaaS", points:1},
          {id:"s6-3a-r7", criterion:"SaaS fachlich korrekt erläutert", points:1},
          {id:"s6-3a-r8", criterion:"Verantwortungsabgrenzung bei SaaS benannt", points:1},
          {id:"s6-3a-r9", criterion:"Passendes Beispiel für SaaS", points:1}
        ]},
      { id:"3b", operator:"Begründen Sie", points:2, answerType:"text", required:true,
        prompt:"Welches Bereitstellungsmodell (Private Cloud, Public Cloud oder Hybrid Cloud) würden Sie dem Unternehmen unter Berücksichtigung strenger Sicherheits- und Compliance-Anforderungen vorrangig empfehlen? Nennen Sie einen Vorteil und einen Nachteil dieses Modells.",
        minRequirements:"Empfehlung mit je einem Vorteil und Nachteil",
        fallbackValue:null,
        solution:"Empfehlung: Private Cloud oder Hybrid Cloud.\nBei einer Private Cloud werden die Ressourcen ausschließlich für das eigene Unternehmen betrieben.\nVorteil: Höchste Kontrolle über Standort, Zugriff und Konfiguration der Daten; Compliance-Vorgaben lassen sich unmittelbar durchsetzen.\nNachteil: Deutlich höhere Kosten und eigener Betriebsaufwand, geringere Elastizität bei Lastspitzen.\n\nAlternativ Hybrid Cloud: schutzbedürftige Daten bleiben in der Private Cloud, weniger kritische Dienste laufen in der Public Cloud.\nVorteil: Verbindet Schutz sensibler Daten mit der Skalierbarkeit der Public Cloud.\nNachteil: Höhere Komplexität, zwei Umgebungen samt Schnittstellen müssen sicher betrieben werden.",
        rubric:[
          {id:"s6-3b-r1", criterion:"Nachvollziehbare Empfehlung mit Vorteil", points:1},
          {id:"s6-3b-r2", criterion:"Passender Nachteil des gewählten Modells", points:1}
        ]},
      { id:"3c", operator:"Erläutern Sie", points:4, answerType:"text", required:true,
        prompt:"Die hohe Verfügbarkeit des Kundenportals ist geschäftsentscheidend. Erläutern Sie die beiden Schlüsselkennzahlen RTO (Recovery Time Objective) und RPO (Recovery Point Objective) für die Ausfallsicherheit.",
        minRequirements:"Beide Kennzahlen erläutert und voneinander abgegrenzt",
        fallbackValue:null,
        solution:"RTO (Recovery Time Objective): Die maximal zulässige Zeitspanne, die von einem Ausfall bis zur Wiederherstellung des Betriebs vergehen darf. Sie beantwortet die Frage, wie lange der Dienst höchstens stillstehen darf, und bestimmt damit die nötige Wiederherstellungstechnik, etwa Ersatzsysteme oder Redundanz.\n\nRPO (Recovery Point Objective): Der maximal zulässige Datenverlust, gemessen als Zeitspanne vor dem Ausfall. Sie beantwortet die Frage, wie viel Arbeit im Ernstfall verloren gehen darf, und bestimmt damit die notwendige Häufigkeit der Datensicherung beziehungsweise Replikation.\n\nMerkhilfe: RTO betrifft die Zeit bis zum Wiederanlauf, RPO die Menge der verlorenen Daten.",
        rubric:[
          {id:"s6-3c-r1", criterion:"RTO als maximale Wiederherstellungszeit erklärt", points:1},
          {id:"s6-3c-r2", criterion:"Folge des RTO für die Wiederherstellungstechnik benannt", points:1},
          {id:"s6-3c-r3", criterion:"RPO als maximal tolerierbarer Datenverlust erklärt", points:1},
          {id:"s6-3c-r4", criterion:"Folge des RPO für die Sicherungsfrequenz benannt", points:1}
        ]},
      { id:"3d", operator:"Berechnen Sie", points:5, answerType:"number_with_working", required:true,
        prompt:"Ein Ausfall des Kundenportals kostet das Unternehmen durchschnittlich 800,00 EUR pro Stunde. Berechnen Sie den maximal tolerierbaren Umsatzverlust pro Jahr, wenn das Service Level Agreement des Cloud-Anbieters eine Verfügbarkeit von 99,8 % garantiert.\n\nHinweis: Ein Jahr hat 365 Tage. Geben Sie den Rechenweg und die Einheit an.",
        minRequirements:"Jahresstunden, Ausfallzeit, Umsatzverlust mit Einheit",
        fallbackValue:"14.016,00 EUR",
        solution:"Jahresstunden: 365 Tage × 24 h = 8.760 h\n\nAusfallanteil: 100 % − 99,8 % = 0,2 % = 0,002\nMaximale Ausfallzeit: 8.760 h × 0,002 = 17,52 h\n\nUmsatzverlust: 17,52 h × 800,00 EUR/h = 14.016,00 EUR\n\nDer maximal tolerierbare Umsatzverlust beträgt 14.016,00 EUR pro Jahr.",
        rubric:[
          {id:"s6-3d-r1", criterion:"Jahresstunden 8.760 h korrekt ermittelt", points:1},
          {id:"s6-3d-r2", criterion:"Ausfallanteil 0,2 % erkannt", points:1},
          {id:"s6-3d-r3", criterion:"Maximale Ausfallzeit 17,52 h", points:1},
          {id:"s6-3d-r4", criterion:"Multiplikation mit dem Stundensatz angesetzt", points:1},
          {id:"s6-3d-r5", criterion:"Ergebnis 14.016,00 EUR mit Einheit", points:1}
        ]},
      { id:"3e", operator:"Erläutern Sie", points:6, answerType:"text", required:true,
        prompt:"Erläutern Sie, unter welchen Voraussetzungen die Daten des Kundenportals unter Berücksichtigung des Datenschutzes in der Cloud gespeichert werden dürfen.",
        minRequirements:"Mehrere Voraussetzungen fachlich erläutert",
        fallbackValue:null,
        solution:"Voraussetzungen, zum Beispiel:\n— Rechtsgrundlage für die Verarbeitung muss vorliegen, etwa Vertragserfüllung, berechtigtes Interesse oder Einwilligung.\n— Mit dem Cloud-Anbieter ist ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO zu schließen, der Weisungsbindung, Schutzmaßnahmen, Unterauftragnehmer und Löschung regelt.\n— Der Anbieter muss geeignete technische und organisatorische Maßnahmen nachweisen, etwa Verschlüsselung bei Übertragung und Speicherung, Zugriffskontrolle und Protokollierung.\n— Bei Verarbeitung außerhalb der EU ist eine zusätzliche Grundlage erforderlich, etwa ein Angemessenheitsbeschluss oder Standardvertragsklauseln nebst Prüfung des Drittlandsrechts.\n— Zweckbindung, Datenminimierung und festgelegte Löschfristen sind einzuhalten.\n— Betroffenenrechte wie Auskunft, Berichtigung und Löschung müssen auch beim Anbieter durchsetzbar sein.\n— Die Verarbeitung ist im Verzeichnis von Verarbeitungstätigkeiten zu dokumentieren; bei hohem Risiko ist eine Datenschutz-Folgenabschätzung nötig.",
        rubric:[
          {id:"s6-3e-r1", criterion:"Rechtsgrundlage der Verarbeitung genannt", points:1},
          {id:"s6-3e-r2", criterion:"Auftragsverarbeitungsvertrag nach Art. 28 DSGVO genannt", points:1},
          {id:"s6-3e-r3", criterion:"Technische und organisatorische Maßnahmen gefordert", points:1},
          {id:"s6-3e-r4", criterion:"Regelung für Drittlandtransfer benannt", points:1},
          {id:"s6-3e-r5", criterion:"Zweckbindung, Datenminimierung oder Löschfristen genannt", points:1},
          {id:"s6-3e-r6", criterion:"Betroffenenrechte oder Dokumentationspflicht benannt", points:1}
        ]}
    ]
  },
  {
    id: "4", title: "Software zur Auftragsverwaltung", points: 25,
    context: "Sie sind an der Entwicklung eines Programms zur Auftragssteuerung beteiligt. Die nächsten sechs Aufträge (Auftrag-Nr. 1 bis Auftrag-Nr. 6) sollen nach ihrer Bearbeitungsdauer sortiert abgearbeitet werden: Der Auftrag mit der kürzesten Dauer wird zuerst bearbeitet.\n\nDas Array dauer[] enthält die Bearbeitungsdauern in Stunden:\n\nInhalt des Arrays: 6 | 3 | 8 | 3 | 9 | 5\nArray-Index:      0 | 1 | 2 | 3 | 4 | 5\nAuftrag-Nr.:      1 | 2 | 3 | 4 | 5 | 6",
    subtasks: [
      { id:"4a", operator:"Führen Sie einen Schreibtischtest durch", points:12, answerType:"table", required:true,
        prompt:"Der folgende Algorithmus soll den Array-Index ermitteln, der auf das Array-Feld mit der kürzesten Bearbeitungsdauer verweist. Kommt diese Dauer mehrfach vor, soll der kleinere Array-Index gelten.\n\nZeile 1  int[] dauer = new int[] {6,3,8,3,9,5};   // Array mit den Bearbeitungsdauern\nZeile 2  int indexMin = 0;        // verweist auf die kürzeste Dauer\nZeile 3  int minDauer = 999;      // speichert die kürzeste Dauer\nZeile 4  for (int i = 0; i < 6; i++)\nZeile 5  {\nZeile 6      if (dauer[i] < minDauer)\nZeile 7      {\nZeile 8          minDauer = dauer[i];\nZeile 9          indexMin = i;\nZeile 10     }\nZeile 11 }\nZeile 12 int auftragsNummer = indexMin + 1;\nZeile 13 return(auftragsNummer);\n\nPrüfen Sie den Algorithmus, indem Sie für die Zeilen 4 bis 11 einen Schreibtischtest durchführen. Geben Sie für jeden Schleifenschritt die Werte von indexMin und minDauer an.\n\nBei Schleifenstart gilt: indexMin = 0, minDauer = 999.",
        minRequirements:"Für alle sechs Schleifenschritte je beide Werte",
        fallbackValue:"indexMin = 1, minDauer = 3",
        solution:"Bei Schleifenstart: indexMin = 0 | minDauer = 999\n\nEnde Schleifenschritt 1 (i = 0, Wert 6): 6 < 999 trifft zu → indexMin = 0 | minDauer = 6\nEnde Schleifenschritt 2 (i = 1, Wert 3): 3 < 6 trifft zu → indexMin = 1 | minDauer = 3\nEnde Schleifenschritt 3 (i = 2, Wert 8): 8 < 3 trifft nicht zu → indexMin = 1 | minDauer = 3\nEnde Schleifenschritt 4 (i = 3, Wert 3): 3 < 3 trifft nicht zu → indexMin = 1 | minDauer = 3\nEnde Schleifenschritt 5 (i = 4, Wert 9): 9 < 3 trifft nicht zu → indexMin = 1 | minDauer = 3\nEnde Schleifenschritt 6 (i = 5, Wert 5): 5 < 3 trifft nicht zu → indexMin = 1 | minDauer = 3\n\nErgebnis: indexMin = 1, minDauer = 3.\nDurch den Vergleich mit < statt <= bleibt beim erneuten Auftreten der Dauer 3 (Index 3) der kleinere Index 1 erhalten. Die Vorgabe ist damit erfüllt.",
        rubric:[
          {id:"s6-4a-r1", criterion:"Schritt 1: indexMin = 0", points:1},
          {id:"s6-4a-r2", criterion:"Schritt 1: minDauer = 6", points:1},
          {id:"s6-4a-r3", criterion:"Schritt 2: indexMin = 1", points:1},
          {id:"s6-4a-r4", criterion:"Schritt 2: minDauer = 3", points:1},
          {id:"s6-4a-r5", criterion:"Schritt 3: indexMin = 1", points:1},
          {id:"s6-4a-r6", criterion:"Schritt 3: minDauer = 3", points:1},
          {id:"s6-4a-r7", criterion:"Schritt 4: indexMin = 1 (Gleichstand ändert nichts)", points:1},
          {id:"s6-4a-r8", criterion:"Schritt 4: minDauer = 3", points:1},
          {id:"s6-4a-r9", criterion:"Schritt 5: indexMin = 1", points:1},
          {id:"s6-4a-r10", criterion:"Schritt 5: minDauer = 3", points:1},
          {id:"s6-4a-r11", criterion:"Schritt 6: indexMin = 1", points:1},
          {id:"s6-4a-r12", criterion:"Schritt 6: minDauer = 3", points:1}
        ]},
      { id:"4b", operator:"Erläutern Sie", points:3, answerType:"text", required:true,
        prompt:"Erläutern Sie den Zweck der Anweisung in Zeile 12 des obigen Programms.",
        minRequirements:"Zweck der Umrechnung erläutert",
        fallbackValue:null,
        solution:"Zeile 12 rechnet den Array-Index in die Auftragsnummer um.\nDie Array-Indizes beginnen bei 0, die Auftragsnummern jedoch bei 1. Der Index 1 entspricht daher der Auftrag-Nr. 2. Durch die Addition von 1 wird aus der internen Position im Array die fachliche Auftragsnummer, die anschließend zurückgegeben und weiterverwendet werden kann.",
        rubric:[
          {id:"s6-4b-r1", criterion:"Umrechnung von Index in Auftragsnummer erkannt", points:1},
          {id:"s6-4b-r2", criterion:"Begründung über die bei 0 beginnende Indizierung", points:1},
          {id:"s6-4b-r3", criterion:"Bezug zum konkreten Ergebnis oder zur Weiterverwendung", points:1}
        ]},
      { id:"4c", operator:"Erläutern Sie", points:6, answerType:"text", required:true,
        prompt:"In vielen Fällen ist die Speicherung von Daten in Arrays sinnvoll und wird von den gängigen Programmiersprachen unterstützt. Erläutern Sie zwei Merkmale beziehungsweise Eigenschaften von Arrays, die für oder gegen ihre Verwendung sprechen.",
        minRequirements:"Zwei Merkmale mit Erläuterung und Bewertung",
        fallbackValue:null,
        solution:"Mögliche Merkmale:\nFür die Verwendung:\n— Direkter Zugriff über den Index: Jedes Element ist in konstanter Zeit erreichbar, ohne die Struktur durchlaufen zu müssen.\n— Zusammenhängende Speicherung: geringer Verwaltungsaufwand je Element und gute Ausnutzung des Zwischenspeichers, dadurch schnelles Durchlaufen.\n— Einfache Handhabung mit Schleifen, da die Elemente fortlaufend nummeriert sind.\n\nGegen die Verwendung:\n— Feste Größe: Die Länge wird bei der Erzeugung festgelegt. Für zusätzliche Elemente muss ein größeres Array angelegt und umkopiert werden.\n— Einheitlicher Datentyp: Es lassen sich nur Elemente desselben Typs speichern.\n— Aufwendiges Einfügen und Löschen in der Mitte, da nachfolgende Elemente verschoben werden müssen.\n— Ungenutzte Felder belegen dennoch Speicher.",
        rubric:[
          {id:"s6-4c-r1", criterion:"Erstes Merkmal fachlich korrekt benannt", points:1},
          {id:"s6-4c-r2", criterion:"Erstes Merkmal erläutert", points:1},
          {id:"s6-4c-r3", criterion:"Erkennbar, ob es für oder gegen die Verwendung spricht", points:1},
          {id:"s6-4c-r4", criterion:"Zweites Merkmal fachlich korrekt benannt", points:1},
          {id:"s6-4c-r5", criterion:"Zweites Merkmal erläutert", points:1},
          {id:"s6-4c-r6", criterion:"Erkennbar, ob es für oder gegen die Verwendung spricht", points:1}
        ]},
      { id:"4d", operator:"Erläutern Sie", points:4, answerType:"text", required:true,
        prompt:"Bei einem Testlauf stellt sich heraus, dass sich das Programm nicht wie vorgesehen beenden lässt und die zugewiesenen Systemressourcen blockiert. Erläutern Sie eine Möglichkeit, das Programm im laufenden Betrieb zu beenden.",
        minRequirements:"Vorgehen mit Werkzeug und Ablauf",
        fallbackValue:null,
        solution:"Der laufende Prozess wird über die Prozessverwaltung des Betriebssystems beendet.\nVorgehen: Zunächst wird der Prozess identifiziert, etwa im Task-Manager unter Windows oder mit Befehlen wie ps beziehungsweise top unter Linux. Dabei wird die Prozesskennung (PID) ermittelt.\nAnschließend wird der Prozess beendet: unter Windows über den Task-Manager oder taskkill, unter Linux mit kill gefolgt von der PID. Damit wird zunächst eine reguläre Beendigung angefordert, sodass das Programm noch aufräumen kann.\nReagiert der Prozess darauf nicht, kann er erzwungen beendet werden (unter Linux kill -9, unter Windows taskkill /F). Dabei werden die belegten Ressourcen vom Betriebssystem freigegeben, allerdings ohne geordnetes Speichern; nicht gesicherte Daten gehen verloren.",
        rubric:[
          {id:"s6-4d-r1", criterion:"Prozessverwaltung des Betriebssystems als Weg genannt", points:1},
          {id:"s6-4d-r2", criterion:"Identifikation des Prozesses beziehungsweise der PID beschrieben", points:1},
          {id:"s6-4d-r3", criterion:"Konkretes Werkzeug oder Befehl genannt", points:1},
          {id:"s6-4d-r4", criterion:"Erzwungenes Beenden oder Folge für nicht gesicherte Daten erwähnt", points:1}
        ]}
    ]
  }
  ]
}
];

const RESULT_SCALE = [
  { min: 92, note: 1 }, { min: 81, note: 2 }, { min: 67, note: 3 },
  { min: 50, note: 4 }, { min: 30, note: 5 }, { min: 0,  note: 6 }
];
