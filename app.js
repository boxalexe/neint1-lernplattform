// Browser soll beim Neuladen NICHT zur alten Scrollposition springen (v.a. mobil).
if('scrollRestoration' in history){ history.scrollRestoration = 'manual'; }

const POOLS = {
 "ports": {
  "name": "Ports & Sockets",
  "q": [
   {
    "q": "Welchen höchsten Wert kann eine Portnummer annehmen?",
    "o": [
     {
      "t": "65535",
      "ok": true
     },
     {
      "t": "65536",
      "ok": false
     },
     {
      "t": "49151",
      "ok": false
     },
     {
      "t": "1024",
      "ok": false
     }
    ],
    "e": "2¹⁶ = 65536 mögliche Werte, aber der Bereich ist 0–65535."
   },
   {
    "q": "Was ergibt die Kombination aus IP-Adresse und Portnummer?",
    "o": [
     {
      "t": "Einen Socket",
      "ok": true
     },
     {
      "t": "Einen Header",
      "ok": false
     },
     {
      "t": "Ein Datagramm",
      "ok": false
     },
     {
      "t": "Eine MAC-Adresse",
      "ok": false
     }
    ],
    "e": "IP:Port = Socket, der eindeutige Kommunikationsendpunkt."
   },
   {
    "q": "In welchem Bereich liegen die Well-Known Ports?",
    "o": [
     {
      "t": "0 – 1023",
      "ok": true
     },
     {
      "t": "1024 – 49151",
      "ok": false
     },
     {
      "t": "49152 – 65535",
      "ok": false
     },
     {
      "t": "0 – 65535",
      "ok": false
     }
    ],
    "e": "0–1023 = Well-Known, 1024–49151 = Registered, 49152–65535 = Dynamic."
   },
   {
    "q": "In welchem Bereich liegen die dynamischen (ephemeral) Ports?",
    "o": [
     {
      "t": "49152 – 65535",
      "ok": true
     },
     {
      "t": "0 – 1023",
      "ok": false
     },
     {
      "t": "1024 – 49151",
      "ok": false
     },
     {
      "t": "1024 – 65535",
      "ok": false
     }
    ],
    "e": "Ephemeral/Dynamic Ports: 49152–65535, vom OS temporär vergeben."
   },
   {
    "q": "Welche beiden Transportprotokolle nutzen Ports?",
    "o": [
     {
      "t": "TCP und UDP",
      "ok": true
     },
     {
      "t": "IP und ICMP",
      "ok": false
     },
     {
      "t": "HTTP und HTTPS",
      "ok": false
     },
     {
      "t": "ARP und RARP",
      "ok": false
     }
    ],
    "e": "Ports sind eine Eigenschaft der Transportschicht: TCP und UDP."
   },
   {
    "q": "Wie viele mögliche Portnummern gibt es insgesamt?",
    "o": [
     {
      "t": "65536",
      "ok": true
     },
     {
      "t": "65535",
      "ok": false
     },
     {
      "t": "1024",
      "ok": false
     },
     {
      "t": "49152",
      "ok": false
     }
    ],
    "e": "Von 0 bis 65535 sind das 65536 Werte (2¹⁶)."
   },
   {
    "q": "Welchem Bereich gehört Port 3389 (RDP) an?",
    "o": [
     {
      "t": "Registered Ports",
      "ok": true
     },
     {
      "t": "Well-Known Ports",
      "ok": false
     },
     {
      "t": "Dynamic Ports",
      "ok": false
     },
     {
      "t": "Reserved Ports",
      "ok": false
     }
    ],
    "e": "3389 liegt in 1024–49151 → Registered Port."
   },
   {
    "q": "Warum wird der Quellport zufällig gewählt?",
    "o": [
     {
      "t": "Damit Antworten der richtigen Anwendung zugeordnet werden",
      "ok": true
     },
     {
      "t": "Damit die Verbindung automatisch verschlüsselt wird",
      "ok": false
     },
     {
      "t": "Damit die verfügbare Bandbreite erhöht wird",
      "ok": false
     },
     {
      "t": "Damit die eigene IP-Adresse verschleiert wird",
      "ok": false
     }
    ],
    "e": "Der Quellport identifiziert die zugehörige Client-Anwendung für die Rückantwort."
   },
   {
    "q": "Ein Client sendet von Port 52143 an Server-Port 443. Wohin antwortet der Server?",
    "o": [
     {
      "t": "An Port 52143",
      "ok": true
     },
     {
      "t": "An Port 443",
      "ok": false
     },
     {
      "t": "An Port 80",
      "ok": false
     },
     {
      "t": "An einen neuen Zufallsport",
      "ok": false
     }
    ],
    "e": "Der Server antwortet an den Quellport des Clients (52143)."
   },
   {
    "q": "Welche Aussage zu Well-Known Ports ist korrekt?",
    "o": [
     {
      "t": "Sie sind festen Standarddiensten zugeordnet",
      "ok": true
     },
     {
      "t": "Sie werden zufällig vergeben",
      "ok": false
     },
     {
      "t": "Sie liegen über 49152",
      "ok": false
     },
     {
      "t": "Sie sind nur für UDP reserviert",
      "ok": false
     }
    ],
    "e": "Well-Known Ports (0–1023) sind Standarddiensten fest zugewiesen."
   },
   {
    "q": "Welche Schicht des OSI-Modells verwaltet Ports?",
    "o": [
     {
      "t": "Transportschicht (4)",
      "ok": true
     },
     {
      "t": "Vermittlungsschicht (3)",
      "ok": false
     },
     {
      "t": "Sicherungsschicht (2)",
      "ok": false
     },
     {
      "t": "Anwendungsschicht (7)",
      "ok": false
     }
    ],
    "e": "Ports gehören zur Transportschicht (Layer 4)."
   },
   {
    "q": "Welche Portnummer würde ein Betriebssystem NICHT als Quellport wählen?",
    "o": [
     {
      "t": "80",
      "ok": true
     },
     {
      "t": "51000",
      "ok": false
     },
     {
      "t": "49200",
      "ok": false
     },
     {
      "t": "60000",
      "ok": false
     }
    ],
    "e": "80 ist Well-Known; Quellports stammen aus dem dynamischen Bereich."
   },
   {
    "q": "Was beschreibt der Begriff 'Socket' technisch am genauesten?",
    "o": [
     {
      "t": "Endpunkt einer Netzwerkverbindung aus IP und Port",
      "ok": true
     },
     {
      "t": "Das physische Netzwerkkabel",
      "ok": false
     },
     {
      "t": "Ein Verschlüsselungsverfahren",
      "ok": false
     },
     {
      "t": "Die MAC-Adresse einer Netzwerkkarte",
      "ok": false
     }
    ],
    "e": "Ein Socket ist der Verbindungsendpunkt, definiert durch IP + Port."
   },
   {
    "q": "Ein Dienst 'lauscht' auf einem festen Port. Wie nennt man diesen Port?",
    "o": [
     {
      "t": "Zielport / Serverport",
      "ok": true
     },
     {
      "t": "Quellport / Absenderport",
      "ok": false
     },
     {
      "t": "Port 16567",
      "ok": false
     },
     {
      "t": "Broadcast-Port",
      "ok": false
     }
    ],
    "e": "Der Server lauscht auf einem festen Zielport; der Client nutzt einen dynamischen Quellport."
   },
   {
    "q": "Wie viele Bit umfasst ein Portnummernfeld im TCP/UDP-Header?",
    "o": [
     {
      "t": "16 Bit",
      "ok": true
     },
     {
      "t": "8 Bit",
      "ok": false
     },
     {
      "t": "32 Bit",
      "ok": false
     },
     {
      "t": "64 Bit",
      "ok": false
     }
    ],
    "e": "16 Bit → 2¹⁶ = 65536 Werte (0–65535)."
   },
   {
    "q": "Welcher Bereich gilt als 'Registered Ports'?",
    "o": [
     {
      "t": "1024 – 49151",
      "ok": true
     },
     {
      "t": "0 – 1023",
      "ok": false
     },
     {
      "t": "49152 – 65535",
      "ok": false
     },
     {
      "t": "1 – 1024",
      "ok": false
     }
    ],
    "e": "Registered Ports: 1024–49151, für registrierte Anwendungen."
   },
   {
    "q": "Was passiert ohne eindeutige Portzuordnung auf einem Server?",
    "o": [
     {
      "t": "Datenpakete könnten nicht der richtigen Anwendung zugestellt werden",
      "ok": true
     },
     {
      "t": "Die IP-Adresse würde ungültig",
      "ok": false
     },
     {
      "t": "Die Verbindung würde automatisch verschlüsselt",
      "ok": false
     },
     {
      "t": "Die MAC-Adresse ändert sich",
      "ok": false
     }
    ],
    "e": "Der Port sorgt für die Zustellung an die korrekte Anwendung/den Dienst."
   },
   {
    "q": "Welche Kombination beschreibt eine vollständige Ende-zu-Ende-Verbindung?",
    "o": [
     {
      "t": "Quell-IP mit Quellport und Ziel-IP mit Zielport",
      "ok": true
     },
     {
      "t": "Nur die Quell-IP und die Ziel-IP ohne Ports",
      "ok": false
     },
     {
      "t": "Nur der Quellport und der Zielport ohne IPs",
      "ok": false
     },
     {
      "t": "Die MAC-Adresse zusammen mit einer Portnummer",
      "ok": false
     }
    ],
    "e": "Ein Socket-Paar (4-Tupel) definiert die eindeutige Verbindung."
   },
   {
    "q": "Welcher Port ist KEIN Well-Known Port?",
    "o": [
     {
      "t": "3306 (MySQL)",
      "ok": true
     },
     {
      "t": "22 (SSH)",
      "ok": false
     },
     {
      "t": "80 (HTTP)",
      "ok": false
     },
     {
      "t": "443 (HTTPS)",
      "ok": false
     }
    ],
    "e": "3306 liegt bei 1024–49151 → Registered, nicht Well-Known."
   },
   {
    "q": "Wozu dient die Trennung in Quell- und Zielport?",
    "o": [
     {
      "t": "Zur eindeutigen Richtung und Zuordnung der Kommunikation",
      "ok": true
     },
     {
      "t": "Zur Erkennung und Korrektur von Übertragungsfehlern",
      "ok": false
     },
     {
      "t": "Zur Kompression der übertragenen Nutzdaten",
      "ok": false
     },
     {
      "t": "Zur automatischen Vergabe der MAC-Adresse",
      "ok": false
     }
    ],
    "e": "Quell- und Zielport regeln, von welcher und zu welcher Anwendung die Daten fließen."
   },
   {
    "q": "Ein Client verbindet sich zu einem internen Mailserver-Webinterface auf Port 8443. Welchem Portbereich entspricht das?",
    "o": [
     {
      "t": "Registered Ports",
      "ok": true
     },
     {
      "t": "Well-Known Ports",
      "ok": false
     },
     {
      "t": "Dynamic/Ephemeral Ports",
      "ok": false
     },
     {
      "t": "System-reservierte Ports",
      "ok": false
     }
    ],
    "e": "8443 liegt zwischen 1024 und 49151 — Registered-Bereich, häufig für alternative HTTPS-Interfaces genutzt."
   },
   {
    "q": "Ein Server lauscht auf Port 8080. In welchem Bereich liegt dieser Port?",
    "o": [
     {
      "t": "Registered Ports",
      "ok": true
     },
     {
      "t": "Well-Known Ports",
      "ok": false
     },
     {
      "t": "Dynamic Ports",
      "ok": false
     },
     {
      "t": "Broadcast-Ports",
      "ok": false
     }
    ],
    "e": "8080 liegt im Registered-Bereich (zwischen 1024 und 49151) — häufig als alternativer HTTP-Port genutzt."
   },
   {
    "q": "Welcher Port wird für einen ausgehenden HTTPS-Request typischerweise als Quellport genutzt?",
    "o": [
     {
      "t": "Ein zufälliger Port aus dem Dynamic-Bereich (49152–65535)",
      "ok": true
     },
     {
      "t": "Fest Port 443 wie beim Zielport (443)",
      "ok": false
     },
     {
      "t": "Fest Port 80 wie bei unverschlüsseltem HTTP (80)",
      "ok": false
     },
     {
      "t": "Fest Port wie bei einer SSH-Sitzung (22)",
      "ok": false
     }
    ],
    "e": "Der Zielport ist fest (443), der Quellport wird vom Client-OS dynamisch aus dem Ephemeral-Bereich gewählt."
   },
   {
    "q": "Was identifiziert ein Port auf einem Server?",
    "o": [
     {
      "t": "Den zuständigen Dienst / die Anwendung",
      "ok": true
     },
     {
      "t": "Die physische Netzwerkschnittstelle",
      "ok": false
     },
     {
      "t": "Die IP / MAC-Adresse",
      "ok": false
     },
     {
      "t": "Den Router",
      "ok": false
     }
    ],
    "e": "Ports differenzieren, welche Anwendung ein Paket empfangen soll."
   },
   {
    "q": "Welcher Port ist für SMTP (Mailversand Server-to-Server) reserviert?",
    "o": [
     {
      "t": "25",
      "ok": true
     },
     {
      "t": "587",
      "ok": false
     },
     {
      "t": "110",
      "ok": false
     },
     {
      "t": "143",
      "ok": false
     }
    ],
    "e": "Port 25 ist für SMTP-Server-to-Server-Verkehr. 587 = Submission (Client→Server)."
   },
   {
    "q": "Wie nennt man Ports, die vom Betriebssystem temporär für ausgehende Verbindungen vergeben werden?",
    "o": [
     {
      "t": "Ephemeral bzw. Dynamic Ports (49152–65535)",
      "ok": true
     },
     {
      "t": "Well-Known Ports für Standarddienste (0–1023)",
      "ok": false
     },
     {
      "t": "Registered Ports für bekannte Software (1024–49151)",
      "ok": false
     },
     {
      "t": "Reservierte Ports ohne feste Zuordnung (0–20)",
      "ok": false
     }
    ],
    "e": "Ephemeral (flüchtige) Ports aus dem Bereich 49152–65535 werden temporär vergeben."
   },
   {
    "q": "Welcher Port gehört zu SSH?",
    "o": [
     {
      "t": "22",
      "ok": true
     },
     {
      "t": "23",
      "ok": false
     },
     {
      "t": "21",
      "ok": false
     },
     {
      "t": "3389",
      "ok": false
     }
    ],
    "e": "SSH = Port 22, verschlüsselte Fernsteuerung. Port 23 = Telnet (unsicher)."
   },
   {
    "q": "Ein Paket kommt an Port 443 eines Servers an. Was ist die wahrscheinlichste Anwendung?",
    "o": [
     {
      "t": "Ein verschlüsselter Webserver (HTTPS)",
      "ok": true
     },
     {
      "t": "Ein Mailserver für den Versand (SMTP)",
      "ok": false
     },
     {
      "t": "Ein Datenbankdienst für Abfragen (SQL)",
      "ok": false
     },
     {
      "t": "Ein Dienst zur Netzwerküberwachung (SNMP)",
      "ok": false
     }
    ],
    "e": "Port 443 ist der Standard für HTTPS."
   },
   {
    "q": "Mehrere Clients verbinden sich gleichzeitig zum selben Webserver auf Port 443. Wie unterscheidet der Server die Verbindungen?",
    "o": [
     {
      "t": "Über die unterschiedlichen Quell-IPs und Quellports der Clients",
      "ok": true
     },
     {
      "t": "Über jeweils verschiedene Zielports auf dem Server",
      "ok": false
     },
     {
      "t": "Über die Ziel-IP und MAC-Adressen der einzelnen Clients",
      "ok": false
     },
     {
      "t": "Über getrennte physische Netzwerkkabel je Client",
      "ok": false
     }
    ],
    "e": "Der Zielport ist bei allen 443. Eindeutig wird jede Verbindung erst durch das komplette Socket-Paar: Quell-IP:Quellport ↔ Ziel-IP:Zielport."
   },
   {
    "q": "Welcher Port gehört zu FTP-Steuerverbindungen?",
    "o": [
     {
      "t": "21",
      "ok": true
     },
     {
      "t": "20",
      "ok": false
     },
     {
      "t": "22",
      "ok": false
     },
     {
      "t": "23",
      "ok": false
     }
    ],
    "e": "FTP: 21 = Steuerkanal (Control), 20 = Datenübertragung (Data)."
   },
   {
    "q": "Ein Server lauscht auf Port 443. Wie entsteht daraus pro verbundenem Client eine eigene Verbindung?",
    "o": [
     { "t": "Für jede Verbindung bildet das Vierertupel aus Quell-IP, Quellport, Ziel-IP und Zielport einen eindeutigen Socket", "ok": true },
     { "t": "Der Server öffnet für jeden neuen Client automatisch einen weiteren freien Zielport oberhalb von 443", "ok": false },
     { "t": "Jeder Client erhält beim Verbindungsaufbau vom Server eine eindeutige Session-ID statt eines eigenen Sockets", "ok": false },
     { "t": "Der Server unterscheidet die Clients ausschließlich anhand ihrer jeweiligen MAC-Adresse", "ok": false }
    ],
    "e": "Der lauschende Port bleibt 443. Jede aktive Verbindung wird durch das Vierertupel (Quell-IP, Quellport, Ziel-IP, Zielport) eindeutig — deshalb können viele Clients denselben Serverport nutzen, ohne sich zu vermischen."
   }
  ]
 },
 "protokolle": {
  "name": "Protokolle & Ports",
  "q": [
   {
    "q": "Welcher Port gehört zu HTTPS?",
    "o": [
     {
      "t": "443",
      "ok": true
     },
     {
      "t": "80",
      "ok": false
     },
     {
      "t": "22",
      "ok": false
     },
     {
      "t": "53",
      "ok": false
     }
    ],
    "e": "HTTPS = Port 443 (TLS/SSL). HTTP unverschlüsselt = 80."
   },
   {
    "q": "Welcher Port gehört zu HTTP?",
    "o": [
     {
      "t": "80",
      "ok": true
     },
     {
      "t": "443",
      "ok": false
     },
     {
      "t": "8080",
      "ok": false
     },
     {
      "t": "21",
      "ok": false
     }
    ],
    "e": "HTTP = Port 80, unverschlüsselt."
   },
   {
    "q": "Welches Protokoll läuft auf Port 22?",
    "o": [
     {
      "t": "SSH",
      "ok": true
     },
     {
      "t": "Telnet",
      "ok": false
     },
     {
      "t": "FTP",
      "ok": false
     },
     {
      "t": "RDP",
      "ok": false
     }
    ],
    "e": "SSH (22) = verschlüsselte Fernsteuerung."
   },
   {
    "q": "Welches Protokoll läuft auf Port 23?",
    "o": [
     {
      "t": "Telnet",
      "ok": true
     },
     {
      "t": "SSH",
      "ok": false
     },
     {
      "t": "SMTP",
      "ok": false
     },
     {
      "t": "DNS",
      "ok": false
     }
    ],
    "e": "Telnet (23) = unverschlüsselte, unsichere Fernsteuerung."
   },
   {
    "q": "Welche Ports nutzt DHCP?",
    "o": [
     {
      "t": "67 (Server) / 68 (Client)",
      "ok": true
     },
     {
      "t": "53 (Anfrage) / 54 (Antwort)",
      "ok": false
     },
     {
      "t": "80 (Klartext) / 443 (verschlüsselt)",
      "ok": false
     },
     {
      "t": "20 (Daten) / 21 (Steuerung)",
      "ok": false
     }
    ],
    "e": "DHCP: UDP 67 (Server), 68 (Client)."
   },
   {
    "q": "Welches Protokoll versendet E-Mails zwischen Mailservern?",
    "o": [
     {
      "t": "SMTP (25)",
      "ok": true
     },
     {
      "t": "POP3 (110)",
      "ok": false
     },
     {
      "t": "IMAP (143)",
      "ok": false
     },
     {
      "t": "SNMP (161)",
      "ok": false
     }
    ],
    "e": "SMTP (25) = Mailversand. POP3/IMAP = Abruf."
   },
   {
    "q": "Welcher Port gehört zu POP3 (unverschlüsselt)?",
    "o": [
     {
      "t": "110",
      "ok": true
     },
     {
      "t": "143",
      "ok": false
     },
     {
      "t": "995",
      "ok": false
     },
     {
      "t": "25",
      "ok": false
     }
    ],
    "e": "POP3 = 110. Verschlüsselt (POP3S) = 995."
   },
   {
    "q": "Welcher Port gehört zu IMAP (unverschlüsselt)?",
    "o": [
     {
      "t": "143",
      "ok": true
     },
     {
      "t": "110",
      "ok": false
     },
     {
      "t": "993",
      "ok": false
     },
     {
      "t": "25",
      "ok": false
     }
    ],
    "e": "IMAP = 143. Verschlüsselt (IMAPS) = 993."
   },
   {
    "q": "Was unterscheidet POP3 von IMAP grundlegend?",
    "o": [
     {
      "t": "POP3 lädt herunter und löscht, IMAP belässt Mails am Server",
      "ok": true
     },
     {
      "t": "POP3 ist grundsätzlich verschlüsselt, IMAP nicht",
      "ok": false
     },
     {
      "t": "IMAP nutzt UDP, POP3 nutzt TCP",
      "ok": false
     },
     {
      "t": "POP3 ist der neuere Nachfolgestandard von IMAP",
      "ok": false
     }
    ],
    "e": "POP3 holt Mails lokal (löscht meist), IMAP synchronisiert und belässt sie am Server."
   },
   {
    "q": "Welcher Port gehört zu RDP?",
    "o": [
     {
      "t": "3389",
      "ok": true
     },
     {
      "t": "3306",
      "ok": false
     },
     {
      "t": "389",
      "ok": false
     },
     {
      "t": "22",
      "ok": false
     }
    ],
    "e": "RDP (Remote Desktop) = Port 3389."
   },
   {
    "q": "Welche Ports gehören zu FTP?",
    "o": [
     {
      "t": "20 (Data) / 21 (Control)",
      "ok": true
     },
     {
      "t": "22 (Sitzung) / 23 (Terminal)",
      "ok": false
     },
     {
      "t": "80 (Web) / 443 (Web-TLS)",
      "ok": false
     },
     {
      "t": "67 (Server) / 68 (Client)",
      "ok": false
     }
    ],
    "e": "FTP (File Transfer Protocol): 20 überträgt Dateien, 21 die Steuerbefehle."
   },
   {
    "q": "Welches Protokoll auf Port 161 überwacht Netzwerkgeräte?",
    "o": [
     {
      "t": "SNMP",
      "ok": true
     },
     {
      "t": "LDAP",
      "ok": false
     },
     {
      "t": "SMTP",
      "ok": false
     },
     {
      "t": "TFTP",
      "ok": false
     }
    ],
    "e": "SNMP (161) = Netzwerküberwachung; Traps auf 162."
   },
   {
    "q": "Welcher Port gehört zu LDAP?",
    "o": [
     {
      "t": "389",
      "ok": true
     },
     {
      "t": "636",
      "ok": false
     },
     {
      "t": "143",
      "ok": false
     },
     {
      "t": "53",
      "ok": false
     }
    ],
    "e": "LDAP = 389, verschlüsselt (LDAPS) = 636."
   },
   {
    "q": "Welcher Dienst gilt als 'Telefonbuch des Internets'?",
    "o": [
     {
      "t": "DNS",
      "ok": true
     },
     {
      "t": "DHCP",
      "ok": false
     },
     {
      "t": "LDAP",
      "ok": false
     },
     {
      "t": "SNMP",
      "ok": false
     }
    ],
    "e": "DNS übersetzt Domainnamen in IP-Adressen."
   },
   {
    "q": "Welcher Port gehört zum modernen verschlüsselten Mailversand (Submission)?",
    "o": [
     {
      "t": "587",
      "ok": true
     },
     {
      "t": "25",
      "ok": false
     },
     {
      "t": "110",
      "ok": false
     },
     {
      "t": "143",
      "ok": false
     }
    ],
    "e": "587 = SMTP-Submission (Client→Server, verschlüsselt)."
   },
   {
    "q": "Welches Protokoll überträgt Dateien ohne Login via UDP (PXE-Boot)?",
    "o": [
     {
      "t": "TFTP (69)",
      "ok": true
     },
     {
      "t": "FTP (21)",
      "ok": false
     },
     {
      "t": "SFTP (22)",
      "ok": false
     },
     {
      "t": "SMB (445)",
      "ok": false
     }
    ],
    "e": "TFTP (69, UDP) = simpler Dateitransfer ohne Authentifizierung, für Netzwerk-Boot."
   },
   {
    "q": "Port 993 gehört zu welchem Dienst?",
    "o": [
     {
      "t": "IMAPS (verschlüsseltes IMAP)",
      "ok": true
     },
     {
      "t": "POP3S (verschlüsseltes POP3)",
      "ok": false
     },
     {
      "t": "SMTPS (verschlüsselter Mailversand)",
      "ok": false
     },
     {
      "t": "HTTPS (verschlüsseltes Web)",
      "ok": false
     }
    ],
    "e": "993 = IMAPS. 995 = POP3S, 465 = SMTPS."
   },
   {
    "q": "Welches Protokoll ist unverschlüsselt und sollte nicht mehr eingesetzt werden?",
    "o": [
     {
      "t": "Telnet",
      "ok": true
     },
     {
      "t": "SSH",
      "ok": false
     },
     {
      "t": "HTTPS",
      "ok": false
     },
     {
      "t": "IMAPS",
      "ok": false
     }
    ],
    "e": "Telnet überträgt inkl. Passwörter im Klartext → durch SSH ersetzt."
   },
   {
    "q": "Welcher Port gehört zu SMTPS (älteres SSL/TLS)?",
    "o": [
     {
      "t": "465",
      "ok": true
     },
     {
      "t": "587",
      "ok": false
     },
     {
      "t": "25",
      "ok": false
     },
     {
      "t": "993",
      "ok": false
     }
    ],
    "e": "465 = SMTPS über implizites SSL/TLS."
   },
   {
    "q": "Welcher Zusammenhang stimmt (unverschlüsselt → verschlüsselt)?",
    "o": [
     {
      "t": "HTTP 80 → HTTPS 443",
      "ok": true
     },
     {
      "t": "HTTP 80 → HTTPS 8080",
      "ok": false
     },
     {
      "t": "IMAP 143 → IMAPS 995",
      "ok": false
     },
     {
      "t": "POP3 110 → POP3S 993",
      "ok": false
     }
    ],
    "e": "HTTP→HTTPS = 80→443. (IMAPS=993, POP3S=995)."
   },
   {
    "q": "Port 162 dient wozu?",
    "o": [
     {
      "t": "Empfang von SNMP-Traps (Statusmeldungen)",
      "ok": true
     },
     {
      "t": "Authentifizierung über LDAP (Verzeichnisdienst)",
      "ok": false
     },
     {
      "t": "Versand von E-Mails (Mailtransport)",
      "ok": false
     },
     {
      "t": "Auflösung von Namen (DNS-Anfragen)",
      "ok": false
     }
    ],
    "e": "162 empfängt automatische SNMP-Trap-Meldungen der Geräte."
   },
   {
    "q": "Welches Protokoll ist verbindungsorientiert und sichert Zustellung?",
    "o": [
     {
      "t": "TCP",
      "ok": true
     },
     {
      "t": "UDP",
      "ok": false
     },
     {
      "t": "IP",
      "ok": false
     },
     {
      "t": "ICMP",
      "ok": false
     }
    ],
    "e": "TCP garantiert Zustellung und Reihenfolge."
   },
   {
    "q": "Welcher Port gehört zu POP3S?",
    "o": [
     {
      "t": "995",
      "ok": true
     },
     {
      "t": "993",
      "ok": false
     },
     {
      "t": "110",
      "ok": false
     },
     {
      "t": "465",
      "ok": false
     }
    ],
    "e": "POP3S (verschlüsselt) = 995."
   },
   {
    "q": "Welcher Port gehört zu LDAPS?",
    "o": [
     {
      "t": "636",
      "ok": true
     },
     {
      "t": "389",
      "ok": false
     },
     {
      "t": "443",
      "ok": false
     },
     {
      "t": "993",
      "ok": false
     }
    ],
    "e": "LDAPS = verschlüsseltes LDAP über Port 636."
   },
   {
    "q": "Welches Protokoll nutzt Port 53?",
    "o": [
     {
      "t": "DNS",
      "ok": true
     },
     {
      "t": "DHCP",
      "ok": false
     },
     {
      "t": "SNMP",
      "ok": false
     },
     {
      "t": "NTP",
      "ok": false
     }
    ],
    "e": "DNS läuft auf Port 53 (UDP, bei großen Antworten TCP)."
   },
   {
    "q": "Welcher Port gehört zu Telnet?",
    "o": [
     {
      "t": "23",
      "ok": true
     },
     {
      "t": "22",
      "ok": false
     },
     {
      "t": "21",
      "ok": false
     },
     {
      "t": "25",
      "ok": false
     }
    ],
    "e": "Telnet = Port 23, unverschlüsselt und veraltet — durch SSH (22) ersetzt."
   },
   {
    "q": "Welches Protokoll nutzt Port 161?",
    "o": [
     {
      "t": "SNMP",
      "ok": true
     },
     {
      "t": "LDAP",
      "ok": false
     },
     {
      "t": "NTP",
      "ok": false
     },
     {
      "t": "RDP",
      "ok": false
     }
    ],
    "e": "SNMP für Netzwerküberwachung auf Port 161 (UDP), Traps auf 162."
   },
   {
    "q": "Was ist der Unterschied zwischen SMTP (25) und Submission (587)?",
    "o": [
     {
      "t": "25 läuft zwischen Servern, 587 vom Client mit Login",
      "ok": true
     },
     {
      "t": "Beide Ports sind funktional völlig identisch",
      "ok": false
     },
     {
      "t": "587 ist unverschlüsselt, 25 immer verschlüsselt",
      "ok": false
     },
     {
      "t": "25 dient dem Empfang, 587 nur dem Versand",
      "ok": false
     }
    ],
    "e": "Port 25 läuft zwischen Mailservern; 587 wird für Mailclients mit Login (STARTTLS) genutzt."
   },
   {
    "q": "Welcher Port gehört zu NTP (Zeitserver)?",
    "o": [
     {
      "t": "123",
      "ok": true
     },
     {
      "t": "161",
      "ok": false
     },
     {
      "t": "69",
      "ok": false
     },
     {
      "t": "53",
      "ok": false
     }
    ],
    "e": "NTP (Network Time Protocol) synchronisiert Uhren über UDP Port 123."
   },
   {
    "q": "Was läuft auf Port 445?",
    "o": [
     {
      "t": "SMB (Windows-Datei- und Druckerfreigabe)",
      "ok": true
     },
     {
      "t": "LDAP (Verzeichnis- und Benutzerdienst)",
      "ok": false
     },
     {
      "t": "RDP (grafische Fernsteuerung)",
      "ok": false
     },
     {
      "t": "FTP (klassische Dateiübertragung)",
      "ok": false
     }
    ],
    "e": "SMB/CIFS auf Port 445 dient Windows-Datei- und Druckerfreigaben."
   },
   {
    "q": "Welches Protokoll nutzt Port 3306?",
    "o": [
     {
      "t": "MySQL-Datenbank",
      "ok": true
     },
     {
      "t": "PostgreSQL",
      "ok": false
     },
     {
      "t": "RDP",
      "ok": false
     },
     {
      "t": "SMTP",
      "ok": false
     }
    ],
    "e": "MySQL-Datenbankserver lauscht standardmäßig auf Port 3306."
   },
   {
    "q": "Welcher Port ist Standard für einen SOCKS-Proxy?",
    "o": [
     {
      "t": "1080",
      "ok": true
     },
     {
      "t": "8080",
      "ok": false
     },
     {
      "t": "3128",
      "ok": false
     },
     {
      "t": "8888",
      "ok": false
     }
    ],
    "e": "Port 1080 ist der klassische Standardport für SOCKS-Proxy-Verbindungen (z. B. bei Tor)."
   },
   {
    "q": "Welcher Netzwerkdienst verwendet standardmäßig die UDP-Ports 67 und 68?",
    "o": [
     {
      "t": "DHCP",
      "ok": true
     },
     {
      "t": "DNS",
      "ok": false
     },
     {
      "t": "SNMP",
      "ok": false
     },
     {
      "t": "NTP",
      "ok": false
     }
    ],
    "e": "DHCP-Discover/Offer läuft über UDP: Server Port 67, Client Port 68."
   },
   {
    "q": "Was ist der Unterschied zwischen POP3 und IMAP?",
    "o": [
     {
      "t": "POP3 lädt herunter und löscht, IMAP synchronisiert am Server",
      "ok": true
     },
     {
      "t": "POP3 ist verschlüsselt, IMAP grundsätzlich nicht",
      "ok": false
     },
     {
      "t": "IMAP nutzt UDP statt TCP für den Abruf",
      "ok": false
     },
     {
      "t": "POP3 ist der modernere Standard von beiden",
      "ok": false
     }
    ],
    "e": "POP3 (110) holt Mails lokal; IMAP (143) synchronisiert und behält sie am Server."
   },
   {
    "q": "Welcher Bereich umfasst die Registered Ports?",
    "o": [
     {
      "t": "1024–49151",
      "ok": true
     },
     {
      "t": "0–1023",
      "ok": false
     },
     {
      "t": "49152–65535",
      "ok": false
     },
     {
      "t": "0–65535",
      "ok": false
     }
    ],
    "e": "Registered Ports 1024–49151 für bekannte, aber nicht systemreservierte Dienste."
   },
   {
    "q": "Welches Protokoll wird für sichere Dateiübertragung über SSH-Kanal genutzt?",
    "o": [
     {
      "t": "SFTP",
      "ok": true
     },
     {
      "t": "FTP",
      "ok": false
     },
     {
      "t": "FTPS",
      "ok": false
     },
     {
      "t": "TFTP",
      "ok": false
     }
    ],
    "e": "SFTP (SSH File Transfer Protocol) tunnelt Dateitransfer durch eine SSH-Verbindung."
   }
  ]
 },
 "mux": {
  "name": "Multiplexing & Quellport",
  "q": [
   {
    "q": "Was ist Multiplexing?",
    "o": [
     { "t": "Mehrere Signale werden zu einem kombiniert und über ein Medium übertragen", "ok": true },
     { "t": "Ein Signal wird auf mehrere Medien verteilt, um Ausfälle zu kompensieren", "ok": false },
     { "t": "Ein Datenstrom wird dupliziert und parallel an mehrere Empfänger gesendet", "ok": false },
     { "t": "Mehrere Medien werden gebündelt, um die Reichweite eines Signals zu erhöhen", "ok": false }
    ],
    "e": "Multiplexing bündelt mehrere Datenströme über ein gemeinsames Medium, wie ein Kabel, eine Glasfaser oder eine Funkverbindung."
   },
   {
    "q": "Welches Bauteil bündelt die Signale?",
    "o": [
     {
      "t": "Multiplexer (MUX)",
      "ok": true
     },
     {
      "t": "Demultiplexer (DEMUX)",
      "ok": false
     },
     {
      "t": "Router (Vermittlung)",
      "ok": false
     },
     {
      "t": "Switch (Sicherung)",
      "ok": false
     }
    ],
    "e": "Der MUX bündelt; der DEMUX trennt am Ziel wieder auf."
   },
   {
    "q": "Welches Bauteil trennt die Signale am Ziel wieder?",
    "o": [
     {
      "t": "Demultiplexer (DEMUX)",
      "ok": true
     },
     {
      "t": "Multiplexer (MUX)",
      "ok": false
     },
     {
      "t": "Repeater (Signalverstärker)",
      "ok": false
     },
     {
      "t": "Terminator (Busabschluss)",
      "ok": false
     }
    ],
    "e": "Der DEMUX teilt das gebündelte Signal wieder auf."
   },
   {
    "q": "Welches Verfahren nutzt verschiedene Frequenzen gleichzeitig?",
    "o": [
     {
      "t": "Frequenzmultiplex (FDM)",
      "ok": true
     },
     {
      "t": "Zeitmultiplex (TDM)",
      "ok": false
     },
     {
      "t": "Codemultiplex (CDM)",
      "ok": false
     },
     {
      "t": "Raummultiplex",
      "ok": false
     }
    ],
    "e": "FDM legt Signale auf verschiedene Frequenzbänder."
   },
   {
    "q": "Welches Verfahren nutzt aufeinanderfolgende Zeitschlitze?",
    "o": [
     {
      "t": "Zeitmultiplex (TDM)",
      "ok": true
     },
     {
      "t": "Frequenzmultiplex (FDM)",
      "ok": false
     },
     {
      "t": "Wellenlängenmultiplex (WDM)",
      "ok": false
     },
     {
      "t": "Codemultiplex (CDM)",
      "ok": false
     }
    ],
    "e": "TDM teilt die Zeit in Slots, die den Signalen zugewiesen werden."
   },
   {
    "q": "Was ist das Ziel von Multiplexing?",
    "o": [
     { "t": "Effiziente Nutzung der Bandbreite, Kostenreduktion", "ok": true },
     { "t": "Höhere Abhörsicherheit durch verschachtelte Signale", "ok": false },
     { "t": "Fehlerkorrektur durch redundante Übertragungswege", "ok": false },
     { "t": "Größere Reichweite durch gebündelte Sendeleistung", "ok": false }
    ],
    "e": "Ein Medium wird optimal ausgelastet, statt viele Leitungen zu benötigen."
   },
   {
    "q": "Welches Multiplexverfahren nutzt Lichtwellenlängen in Glasfasern?",
    "o": [
     {
      "t": "Wellenlängenmultiplex (WDM)",
      "ok": true
     },
     {
      "t": "Zeitmultiplex (TDM)",
      "ok": false
     },
     {
      "t": "Codemultiplex (CDM)",
      "ok": false
     },
     {
      "t": "Frequenzmultiplex (FDM)",
      "ok": false
     }
    ],
    "e": "WDM ist das FDM-Prinzip auf Basis verschiedener Lichtwellenlängen."
   },
   {
    "q": "Wozu dient der zufällige Quellport?",
    "o": [
     { "t": "Antwortpakete der richtigen Anwendung zuordnen", "ok": true },
     { "t": "Den angesprochenen Dienst auf dem Zielserver identifizieren", "ok": false },
     { "t": "Port-Scans auf dem Client-System ins Leere laufen lassen", "ok": false },
     { "t": "Firewalls das Erkennen der genutzten Anwendung erschweren", "ok": false }
    ],
    "e": "Der Quellport ermöglicht die Rückzuordnung zur richtigen Anwendung."
   },
   {
    "q": "Aus welchem Bereich wählt das OS den Quellport?",
    "o": [
     {
      "t": "Dynamische Ports 49152–65535",
      "ok": true
     },
     {
      "t": "Well-Known 0–1023",
      "ok": false
     },
     {
      "t": "Immer 80",
      "ok": false
     },
     {
      "t": "Immer 443",
      "ok": false
     }
    ],
    "e": "Quellports stammen aus dem dynamischen/ephemeral Bereich."
   },
   {
    "q": "Ein PC ruft eine Webseite auf. Von wo nach wo läuft die Anfrage?",
    "o": [
     {
      "t": "Von einem zufälligen Quellport an den festen Zielport (z. B. 443)",
      "ok": true
     },
     {
      "t": "Von Port 443 des Clients an einen Zufallsport",
      "ok": false
     },
     {
      "t": "Von Port 80 des Clients an Port 80 des Servers",
      "ok": false
     },
     {
      "t": "Ganz ohne Ports, ausschließlich über die IP",
      "ok": false
     }
    ],
    "e": "Client-Quellport (zufällig) → Server-Zielport (fest, z. B. 443)."
   },
   {
    "q": "Wie kann ein PC mehrere Browser-Tabs gleichzeitig zum selben Server offen halten?",
    "o": [
     {
      "t": "Durch unterschiedliche Quellports je Verbindung",
      "ok": true
     },
     {
      "t": "Durch mehrere IP-Adressen",
      "ok": false
     },
     {
      "t": "Durch mehrere MAC-Adressen",
      "ok": false
     },
     {
      "t": "Durch höhere TTL",
      "ok": false
     }
    ],
    "e": "Jede Verbindung nutzt einen eigenen Quellport → eindeutige Zuordnung."
   },
   {
    "q": "Multiplexing auf der Transportschicht bedeutet konkret …",
    "o": [
     { "t": "Mehrere Anwendungen teilen sich über Ports eine Netzverbindung", "ok": true },
     { "t": "Mehrere physische Leitungen werden zu einem logischen Link gebündelt", "ok": false },
     { "t": "Mehrere private Adressen werden auf eine öffentliche übersetzt", "ok": false },
     { "t": "Mehrere Frames werden zu einem größeren Übertragungsblock vereint", "ok": false }
    ],
    "e": "Ports erlauben, dass viele Anwendungen dieselbe Leitung parallel nutzen."
   },
   {
    "q": "Welche Rolle spielt der Demultiplexer beim Empfang?",
    "o": [
     { "t": "Er ordnet ankommende Daten der richtigen Anwendung/Port zu", "ok": true },
     { "t": "Er entfernt die Header aller Schichten bis zur Anwendung", "ok": false },
     { "t": "Er prüft ankommende Daten und fordert Fehlendes erneut an", "ok": false },
     { "t": "Er zerlegt große Segmente wieder in einzelne IP-Pakete", "ok": false }
    ],
    "e": "Der DEMUX verteilt die eintreffenden Ströme wieder an die Ziele."
   },
   {
    "q": "Warum ist Multiplexing wirtschaftlich sinnvoll?",
    "o": [
     {
      "t": "Es spart teure zusätzliche Übertragungswege",
      "ok": true
     },
     {
      "t": "Es erhöht die Fehlerrate",
      "ok": false
     },
     {
      "t": "Es verlangsamt die Übertragung bewusst",
      "ok": false
     },
     {
      "t": "Es ersetzt die Verschlüsselung",
      "ok": false
     }
    ],
    "e": "Ein gemeinsam genutztes Medium spart Leitungs- und Infrastrukturkosten."
   },
   {
    "q": "Welche Aussage über festen Zielport und variablen Quellport stimmt?",
    "o": [
     { "t": "Der Zielport identifiziert den Dienst, der Quellport die Client-Instanz", "ok": true },
     { "t": "Der Quellport identifiziert den Dienst, der Zielport die Client-Instanz", "ok": false },
     { "t": "Der Zielport wechselt je Sitzung, der Quellport bleibt dauerhaft gleich", "ok": false },
     { "t": "Beide Ports werden vom Server vorgegeben und dem Client mitgeteilt", "ok": false }
    ],
    "e": "Zielport = welcher Dienst; Quellport = welche konkrete Client-Verbindung."
   },
   {
    "q": "Welches Bauteilpaar bildet die Grundlage jeder Multiplexübertragung?",
    "o": [
     {
      "t": "MUX und DEMUX",
      "ok": true
     },
     {
      "t": "Router und Switch",
      "ok": false
     },
     {
      "t": "Hub und Repeater",
      "ok": false
     },
     {
      "t": "Client und Server",
      "ok": false
     }
    ],
    "e": "Sender-seitig bündelt der MUX, empfängerseitig trennt der DEMUX."
   }
  ]
 },
 "tcpip": {
  "name": "TCP/IP & UDP",
  "q": [
   {
    "q": "In welcher Reihenfolge läuft der TCP-Three-Way-Handshake?",
    "o": [
     {
      "t": "SYN → SYN-ACK → ACK",
      "ok": true
     },
     {
      "t": "ACK → SYN → SYN-ACK",
      "ok": false
     },
     {
      "t": "SYN → ACK → SYN-ACK",
      "ok": false
     },
     {
      "t": "SYN-ACK → ACK → SYN",
      "ok": false
     }
    ],
    "e": "Client SYN, Server SYN-ACK, Client ACK → Verbindung steht."
   },
   {
    "q": "Wofür steht TCP?",
    "o": [
     {
      "t": "Transmission Control Protocol",
      "ok": true
     },
     {
      "t": "Transfer Control Program",
      "ok": false
     },
     {
      "t": "Transport Connection Protocol",
      "ok": false
     },
     {
      "t": "Terminal Control Protocol",
      "ok": false
     }
    ],
    "e": "TCP = Transmission Control Protocol."
   },
   {
    "q": "Welche Aussage über UDP ist korrekt?",
    "o": [
     {
      "t": "Verbindungslos, keine Zustellgarantie, schnell",
      "ok": true
     },
     {
      "t": "Verbindungsorientiert mit Bestätigung",
      "ok": false
     },
     {
      "t": "Garantiert die Reihenfolge",
      "ok": false
     },
     {
      "t": "Sendet verlorene Pakete erneut",
      "ok": false
     }
    ],
    "e": "UDP verzichtet auf Handshake/Bestätigung — schnell, ohne Garantie."
   },
   {
    "q": "Wofür ist das Internet Protocol (IP) zuständig?",
    "o": [
     {
      "t": "Adressierung und Weiterleitung von Paketen",
      "ok": true
     },
     {
      "t": "Verschlüsselung der Nutzdaten",
      "ok": false
     },
     {
      "t": "Garantierte Zustellung",
      "ok": false
     },
     {
      "t": "Aufbau des Handshakes",
      "ok": false
     }
    ],
    "e": "IP adressiert und routet; es ist selbst verbindungslos."
   },
   {
    "q": "Was macht TCP mit einem fehlenden Paket?",
    "o": [
     {
      "t": "Es fordert das Paket erneut an",
      "ok": true
     },
     {
      "t": "Es ignoriert den Verlust",
      "ok": false
     },
     {
      "t": "Es verschlüsselt den Rest",
      "ok": false
     },
     {
      "t": "Es beendet die Verbindung sofort",
      "ok": false
     }
    ],
    "e": "TCP erkennt fehlende Bestätigungen und sendet erneut. (Retransmission)"
   },
   {
    "q": "Welches Feld sichert bei TCP die richtige Reihenfolge der Pakete?",
    "o": [
     {
      "t": "Sequence Number",
      "ok": true
     },
     {
      "t": "Checksum",
      "ok": false
     },
     {
      "t": "TTL",
      "ok": false
     },
     {
      "t": "Portnummer",
      "ok": false
     }
    ],
    "e": "Die Sequence Number nummeriert die Segmente zur Wiederzusammensetzung."
   },
   {
    "q": "Was bedeutet 'verbindungsorientiert' bei TCP?",
    "o": [
     {
      "t": "Vor der Übertragung wird eine Verbindung aufgebaut",
      "ok": true
     },
     {
      "t": "Es wird keine Verbindung benötigt",
      "ok": false
     },
     {
      "t": "Die Verbindung ist immer verschlüsselt",
      "ok": false
     },
     {
      "t": "Es können nur zwei Geräte kommunizieren",
      "ok": false
     }
    ],
    "e": "TCP baut per Handshake erst eine Verbindung auf, dann folgt die Übertragung."
   },
   {
    "q": "Warum ist UDP schneller als TCP?",
    "o": [
     {
      "t": "Kein Handshake, keine Bestätigungen, weniger Overhead",
      "ok": true
     },
     {
      "t": "Es nutzt kleinere Pakete",
      "ok": false
     },
     {
      "t": "Es ist immer kabelgebunden",
      "ok": false
     },
     {
      "t": "Weil es die Daten vor dem Senden stark komprimiert",
      "ok": false
     }
    ],
    "e": "UDP spart sich Verbindungsauf-/abbau und Bestätigungen."
   },
   {
    "q": "Welche Analogie beschreibt UDP am besten?",
    "o": [
     {
      "t": "Einwurf in einen unversicherten Briefkasten",
      "ok": true
     },
     {
      "t": "Einschreiben mit Rückschein",
      "ok": false
     },
     {
      "t": "Telefonat mit Rückfrage",
      "ok": false
     },
     {
      "t": "Notarielle Beglaubigung",
      "ok": false
     }
    ],
    "e": "UDP schickt Datagramme los, ohne Empfang zu bestätigen."
   },
   {
    "q": "Ist IP selbst zuverlässig?",
    "o": [
     {
      "t": "Nein, IP ist verbindungslos und unzuverlässig",
      "ok": true
     },
     {
      "t": "Ja, IP garantiert die Zustellung",
      "ok": false
     },
     {
      "t": "Ja, IP nutzt einen Handshake",
      "ok": false
     },
     {
      "t": "Nur bei IPv6",
      "ok": false
     }
    ],
    "e": "Die Zuverlässigkeit liefert TCP, nicht IP selbst."
   },
   {
    "q": "Welche Schritte gehören zum Verbindungsaufbau bei TCP?",
    "o": [
     {
      "t": "SYN, SYN-ACK, ACK",
      "ok": true
     },
     {
      "t": "HELLO, ACK, FIN",
      "ok": false
     },
     {
      "t": "GET, POST, PUT",
      "ok": false
     },
     {
      "t": "REQUEST, GRANT, CLOSE",
      "ok": false
     }
    ],
    "e": "Der Three-Way-Handshake nutzt SYN / SYN-ACK / ACK."
   },
   {
    "q": "Welche Anwendung braucht die Zuverlässigkeit von TCP?",
    "o": [
     {
      "t": "Dateiübertragung / Web / E-Mail",
      "ok": true
     },
     {
      "t": "Die automatische Vergabe von IP-Adressen / DHCP",
      "ok": false
     },
     {
      "t": "IP-Telefonie",
      "ok": false
     },
     {
      "t": "Videostreaming",
      "ok": false
     }
    ],
    "e": "Bei Dateien/Web/Mail zählt Vollständigkeit → TCP."
   },
   {
    "q": "Welche Aussage über TCP/IP als Protokollfamilie ist korrekt?",
    "o": [
     { "t": "Sie regelt die Datenübertragung unabhängig von Hardware/Software", "ok": true },
     { "t": "Sie definiert die physikalischen Eigenschaften der Übertragungsmedien", "ok": false },
     { "t": "Sie arbeitet grundsätzlich verbindungsorientiert auf allen Schichten", "ok": false },
     { "t": "Sie wurde durch das OSI-Modell abgelöst und gilt heute als veraltet", "ok": false }
    ],
    "e": "TCP/IP ist herstellerunabhängig und die Basis des Internets."
   },
   {
    "q": "Wie wird bei TCP eine Verbindung sauber beendet?",
    "o": [
     {
      "t": "Über eine FIN/ACK-Sequenz (geordneter Abbau)",
      "ok": true
     },
     {
      "t": "Durch physisches Ziehen des Netzsteckers",
      "ok": false
     },
     {
      "t": "Automatisch nach genau 60 Sekunden",
      "ok": false
     },
     {
      "t": "Durch einen Broadcast an alle Hosts",
      "ok": false
     }
    ],
    "e": "Der geordnete Abbau nutzt FIN/ACK (four-way teardown)."
   },
   {
    "q": "Welches Protokoll prüft mit einer Prüfsumme auf Übertragungsfehler?",
    "o": [
     { "t": "Sowohl TCP als auch UDP nutzen eine Checksum", "ok": true },
     { "t": "Nur TCP — UDP verzichtet zugunsten des Tempos darauf", "ok": false },
     { "t": "Nur UDP — TCP sichert stattdessen über Sequenznummern", "ok": false },
     { "t": "Nur IP — die Transportprotokolle verlassen sich darauf", "ok": false }
    ],
    "e": "Beide besitzen eine Checksum; TCP reagiert aktiv, UDP verwirft nur fehlerhafte Pakete."
   },
   {
    "q": "Was priorisiert UDP gegenüber TCP?",
    "o": [
     {
      "t": "Geschwindigkeit",
      "ok": true
     },
     {
      "t": "Zustellgarantie",
      "ok": false
     },
     {
      "t": "Reihenfolgesicherung",
      "ok": false
     },
     {
      "t": "Flusskontrolle",
      "ok": false
     }
    ],
    "e": "UDP setzt auf Tempo, TCP auf Zuverlässigkeit."
   },
   {
    "q": "Welche Einheit überträgt UDP?",
    "o": [
     {
      "t": "Datagramme",
      "ok": true
     },
     {
      "t": "Frames",
      "ok": false
     },
     {
      "t": "Bits einzeln",
      "ok": false
     },
     {
      "t": "Streams",
      "ok": false
     }
    ],
    "e": "UDP versendet eigenständige Datagramme ohne Verbindungskontext."
   },
   {
    "q": "Welche Aussage zur Flusskontrolle stimmt?",
    "o": [
     {
      "t": "TCP besitzt Flusskontrolle, UDP nicht",
      "ok": true
     },
     {
      "t": "UDP besitzt Flusskontrolle, TCP nicht",
      "ok": false
     },
     {
      "t": "Beide besitzen keine",
      "ok": false
     },
     {
      "t": "Flusskontrolle liegt bei IP",
      "ok": false
     }
    ],
    "e": "TCP regelt per Fenstergröße den Datenfluss; UDP nicht."
   },
   {
    "q": "Ein Server bestätigt einen Verbindungswunsch. Welches Segment sendet er?",
    "o": [
     {
      "t": "SYN-ACK",
      "ok": true
     },
     {
      "t": "SYN",
      "ok": false
     },
     {
      "t": "ACK",
      "ok": false
     },
     {
      "t": "FIN",
      "ok": false
     }
    ],
    "e": "Auf das Client-SYN antwortet der Server mit SYN-ACK."
   },
   {
    "q": "Warum eignet sich TCP schlecht für Live-Videotelefonie?",
    "o": [
     { "t": "Erneutes Senden verspäteter Pakete stört den Echtzeitfluss", "ok": true },
     { "t": "Der Handshake muss für jeden Videoframe neu durchlaufen werden", "ok": false },
     { "t": "Die Segmentgröße von TCP ist für Videodaten grundsätzlich zu klein", "ok": false },
     { "t": "TCP begrenzt die Bandbreite je Verbindung auf feste Höchstwerte", "ok": false }
    ],
    "e": "Retransmissions erzeugen Verzögerung; bei Echtzeit ist UDP besser."
   },
   {
    "q": "Welche Reihenfolge beschreibt die Kapselung beim Senden korrekt?",
    "o": [
     {
      "t": "Daten → Segment → Paket → Frame → Bits",
      "ok": true
     },
     {
      "t": "Bits → Frame → Paket → Segment → Daten",
      "ok": false
     },
     {
      "t": "Paket → Frame → Segment → Daten → Bits",
      "ok": false
     },
     {
      "t": "Segment → Daten → Bits → Frame → Paket",
      "ok": false
     }
    ],
    "e": "Von oben nach unten: Anwendungsdaten werden gekapselt zu Segment, Paket, Frame."
   },
   {
    "q": "Worauf baut das QUIC-Protokoll auf?",
    "o": [
     {
      "t": "Auf UDP",
      "ok": true
     },
     {
      "t": "Auf TCP",
      "ok": false
     },
     {
      "t": "Auf ICMP",
      "ok": false
     },
     {
      "t": "Auf ARP",
      "ok": false
     }
    ],
    "e": "QUIC nutzt UDP als Basis und implementiert Zuverlässigkeit/Verschlüsselung selbst."
   },
   {
    "q": "Welcher Vorteil kennzeichnet QUIC gegenüber klassischem TCP+TLS?",
    "o": [
     {
      "t": "Schnellerer Verbindungsaufbau mit weniger Roundtrips",
      "ok": true
     },
     {
      "t": "Es arbeitet unverschlüsselt und ist deshalb schneller",
      "ok": false
     },
     {
      "t": "Es verzichtet vollständig auf Portnummern",
      "ok": false
     },
     {
      "t": "Es kommt gänzlich ohne IP-Adressen aus",
      "ok": false
     }
    ],
    "e": "QUIC kombiniert Verbindungsaufbau und Verschlüsselung und spart so Roundtrips."
   },
   {
    "q": "Welches moderne Web-Protokoll setzt auf QUIC auf?",
    "o": [
     {
      "t": "HTTP/3",
      "ok": true
     },
     {
      "t": "HTTP/1.1",
      "ok": false
     },
     {
      "t": "FTP",
      "ok": false
     },
     {
      "t": "SMTP",
      "ok": false
     }
    ],
    "e": "HTTP/3 verwendet QUIC (über UDP) statt TCP."
   },
   {
    "q": "Warum implementiert QUIC Zuverlässigkeit selbst, obwohl es auf UDP läuft?",
    "o": [
     {
      "t": "UDP liefert keine Garantien, QUIC ergänzt sie flexibler als TCP",
      "ok": true
     },
     {
      "t": "Weil UDP-Pakete im Internet immer Vorrang vor TCP haben",
      "ok": false
     },
     {
      "t": "Weil TCP keine Verschlüsselung kennt",
      "ok": false
     },
     {
      "t": "Um ganz auf Bestätigungen zu verzichten",
      "ok": false
     }
    ],
    "e": "QUIC baut Zuverlässigkeit, Multiplexing und Verschlüsselung oberhalb von UDP eigenständig auf."
   },
   {
    "q": "Ein Vorteil von QUIC ist der Wegfall des Head-of-Line-Blocking. Was heißt das?",
    "o": [
     { "t": "Ein verlorenes Paket blockiert nicht alle parallelen Datenströme", "ok": true },
     { "t": "Verlorene Pakete werden vom nächsten Router statt vom Sender ersetzt", "ok": false },
     { "t": "Der Empfänger bestätigt nur das letzte Paket statt jedes einzelne", "ok": false },
     { "t": "Router leeren ihre Warteschlangen für QUIC-Pakete stets bevorzugt", "ok": false }
    ],
    "e": "QUIC trennt Streams, sodass ein Verlust in einem Stream die anderen nicht aufhält."
   },
   {
    "q": "Was passiert, wenn ein TCP-Segment auf dem Weg verloren geht?",
    "o": [
     { "t": "Der Sender erhält keine Bestätigung (ACK) und sendet das Segment nach Timeout erneut", "ok": true },
     { "t": "Der Empfänger fordert das fehlende Segment direkt beim letzten Router an", "ok": false },
     { "t": "Die Verbindung wird neu aufgebaut und die Übertragung beginnt von vorn", "ok": false },
     { "t": "Der Empfänger rekonstruiert das Segment aus den Prüfsummen der Nachbarpakete", "ok": false }
    ],
    "e": "Bleibt das ACK aus, erkennt der Sender per Timeout den Verlust und wiederholt die Übertragung (Retransmission)."
   },
   {
    "q": "Welche TCP-Eigenschaft verhindert, dass der Sender den Empfänger überflutet?",
    "o": [
     { "t": "Flusskontrolle (Flow Control) per Fenstergröße", "ok": true },
     { "t": "Staukontrolle (Congestion Control) per Slow Start", "ok": false },
     { "t": "Priorisierung (QoS) über das DSCP-Feld im Header", "ok": false },
     { "t": "Ratenbegrenzung über die maximale Segmentgröße (MSS)", "ok": false }
    ],
    "e": "Das TCP-Fenster begrenzt die Datenmenge, die vor einer Bestätigung gesendet werden darf."
   },
   {
    "q": "Welche Dienste nutzen typischerweise UDP?",
    "o": [
     {
      "t": "DNS, VoIP, Videostreaming, Online-Gaming",
      "ok": true
     },
     {
      "t": "HTTP, SMTP, FTP",
      "ok": false
     },
     {
      "t": "Nur SNMP",
      "ok": false
     },
     {
      "t": "Alle Dienste außer HTTP",
      "ok": false
     }
    ],
    "e": "UDP wird bevorzugt, wo Geschwindigkeit vor Vollständigkeit steht — Echtzeit und kurze Anfragen."
   },
   {
    "q": "Was ist der Unterschied zwischen TCP-Segment und UDP-Datagramm?",
    "o": [
     { "t": "TCP-Segment enthält Sequenznummern und Bestätigungsfelder, UDP-Datagramm nicht", "ok": true },
     { "t": "UDP-Datagramme enthalten die Prüfsummen, TCP-Segmente sichern nur über ACKs", "ok": false },
     { "t": "UDP-Datagramme werden nummeriert, damit der Empfänger sie sortieren kann", "ok": false },
     { "t": "TCP-Segmente tragen keine Portnummern, weil die Verbindung sie ersetzt", "ok": false }
    ],
    "e": "TCP-Segmente tragen Sequenz- und ACK-Nummern für Zuverlässigkeit; UDP ist schlanker."
   },
   {
    "q": "Was überprüft die Checksumme in TCP und UDP?",
    "o": [
     { "t": "Ob die Daten auf dem Übertragungsweg beschädigt wurden", "ok": true },
     { "t": "Ob die Pakete in der richtigen Reihenfolge angekommen sind", "ok": false },
     { "t": "Ob das Paket unterwegs dupliziert und doppelt zugestellt wurde", "ok": false },
     { "t": "Ob der Absender berechtigt ist, den Zielport anzusprechen", "ok": false }
    ],
    "e": "Die Checksumme erkennt Bitfehler in Header und Daten — bei UDP wird ein fehlerhaftes Paket verworfen."
   },
   {
    "q": "Welches Protokoll nutzt DNS überwiegend?",
    "o": [
     {
      "t": "UDP",
      "ok": true
     },
     {
      "t": "TCP",
      "ok": false
     },
     {
      "t": "ICMP",
      "ok": false
     },
     {
      "t": "ARP",
      "ok": false
     }
    ],
    "e": "DNS-Anfragen laufen über UDP Port 53; TCP nur bei Zonentransfer oder großen Antworten."
   },
   {
    "q": "Was sendet der Client als letztes beim Three-Way-Handshake?",
    "o": [
     {
      "t": "ACK",
      "ok": true
     },
     {
      "t": "SYN",
      "ok": false
     },
     {
      "t": "SYN-ACK",
      "ok": false
     },
     {
      "t": "FIN",
      "ok": false
     }
    ],
    "e": "Ablauf: Client SYN → Server SYN-ACK → Client ACK. Danach steht die Verbindung."
   },
   {
    "q": "Wer initiiert beim TCP-Verbindungsabbau den Trennungswunsch?",
    "o": [
     {
      "t": "Sowohl der Client als auch der Server können den Abbau starten",
      "ok": true
     },
     {
      "t": "Ausschließlich der Client, der die Verbindung aufgebaut hat",
      "ok": false
     },
     {
      "t": "Ausschließlich der Standard-Gateway-Router des Netzwerks",
      "ok": false
     },
     {
      "t": "Immer der Server, sobald alle Daten übertragen wurden",
      "ok": false
     }
    ],
    "e": "Jede der beiden Parteien kann den Verbindungsabbau durch das Senden eines FIN-Pakets einleiten."
   },
   {
    "q": "Warum eignet sich TCP schlecht für Live-Video-Calls bei instabiler Verbindung?",
    "o": [
     { "t": "Erneutes Senden verlorener Pakete verzögert den gesamten Datenstrom (Head-of-Line-Blocking)", "ok": true },
     { "t": "Der dreistufige Handshake muss nach jedem Paketverlust vollständig wiederholt werden", "ok": false },
     { "t": "Die Staukontrolle drosselt bei Verlusten dauerhaft auf die minimale Datenrate herunter", "ok": false },
     { "t": "Die Prüfsummenberechnung erzeugt bei Videodatenmengen eine zu hohe Rechenlast", "ok": false }
    ],
    "e": "Ein verlorenes Paket blockiert bei TCP die Zustellung nachfolgender Daten, bis es erneut angekommen ist — bei Echtzeit spürbar störend."
   },
   {
    "q": "Wann ist UDP die bessere Wahl gegenüber TCP?",
    "o": [
     { "t": "Wenn geringe Latenz wichtiger ist als garantierte Zustellung", "ok": true },
     { "t": "Wenn große Dateien möglichst schnell vollständig ankommen sollen", "ok": false },
     { "t": "Wenn der Empfänger die Pakete in exakter Reihenfolge benötigt", "ok": false },
     { "t": "Wenn die Verbindung über unsichere öffentliche Netze laufen muss", "ok": false }
    ],
    "e": "DNS, VoIP und Live-Video bevorzugen UDP: ein verlorenes Paket stört weniger als Verzögerung."
   },
   {
    "q": "Was beschreibt 'Staukontrolle' (Congestion Control) bei TCP?",
    "o": [
     {
      "t": "TCP reduziert die Senderate bei Netzüberlastung automatisch",
      "ok": true
     },
     {
      "t": "TCP erhöht die Rate bei Überlastung",
      "ok": false
     },
     {
      "t": "UDP übernimmt die Staukontrolle",
      "ok": false
     },
     {
      "t": "Die Staukontrolle liegt beim Router",
      "ok": false
     }
    ],
    "e": "TCP erkennt Paketverluste als Signal für Überlastung und reduziert das Sendefenster."
   }
  ]
 },
 "header": {
  "name": "Header, TTL & Traceroute",
  "q": [
   {
    "q": "Was passiert, wenn die TTL eines Pakets 0 erreicht?",
    "o": [
     {
      "t": "Das Paket wird verworfen",
      "ok": true
     },
     {
      "t": "Es wird verschlüsselt",
      "ok": false
     },
     {
      "t": "Die TTL verdoppelt sich",
      "ok": false
     },
     {
      "t": "Es wird gespeichert",
      "ok": false
     }
    ],
    "e": "Bei TTL=0 verwirft der Router das Paket (ICMP Time Exceeded zurück)."
   },
   {
    "q": "Aus welchen zwei Teilen besteht ein Netzwerkpaket?",
    "o": [
     {
      "t": "Header und Payload",
      "ok": true
     },
     {
      "t": "Socket und Port",
      "ok": false
     },
     {
      "t": "MUX und DEMUX",
      "ok": false
     },
     {
      "t": "SYN und ACK",
      "ok": false
     }
    ],
    "e": "Header = Steuerdaten, Payload = Nutzdaten."
   },
   {
    "q": "Wofür steht TTL?",
    "o": [
     {
      "t": "Time to Live",
      "ok": true
     },
     {
      "t": "Transfer Time Limit",
      "ok": false
     },
     {
      "t": "Total Transfer Length",
      "ok": false
     },
     {
      "t": "Time Table Log",
      "ok": false
     }
    ],
    "e": "TTL = Time to Live, ein Hop-Zähler im IP-Header."
   },
   {
    "q": "Was macht jeder Router mit der TTL eines durchlaufenden Pakets?",
    "o": [
     {
      "t": "Er zieht 1 ab",
      "ok": true
     },
     {
      "t": "Er addiert 1",
      "ok": false
     },
     {
      "t": "Er setzt sie auf 64",
      "ok": false
     },
     {
      "t": "Er lässt sie unverändert",
      "ok": false
     }
    ],
    "e": "Jeder Hop dekrementiert die TTL um 1."
   },
   {
    "q": "Wozu dient die TTL grundsätzlich?",
    "o": [
     {
      "t": "Sie verhindert endlos kreisende Pakete",
      "ok": true
     },
     {
      "t": "Sie verschlüsselt Pakete",
      "ok": false
     },
     {
      "t": "Sie erhöht die Geschwindigkeit",
      "ok": false
     },
     {
      "t": "Sie vergibt IP-Adressen",
      "ok": false
     }
    ],
    "e": "Ohne TTL könnten Pakete in Routing-Schleifen ewig kreisen."
   },
   {
    "q": "Wie nennt man den Traceroute-Befehl unter Windows?",
    "o": [
     {
      "t": "tracert",
      "ok": true
     },
     {
      "t": "traceroute",
      "ok": false
     },
     {
      "t": "tracepath",
      "ok": false
     },
     {
      "t": "pathping-only",
      "ok": false
     }
    ],
    "e": "Windows: tracert. Linux/macOS: traceroute."
   },
   {
    "q": "Wie ermittelt Traceroute die einzelnen Hops?",
    "o": [
     {
      "t": "Durch schrittweises Erhöhen der TTL (1,2,3 …)",
      "ok": true
     },
     {
      "t": "Durch Portscanning",
      "ok": false
     },
     {
      "t": "Durch DNS-Abfragen",
      "ok": false
     },
     {
      "t": "Durch Vergrößern der Payload",
      "ok": false
     }
    ],
    "e": "Jedes Paket bekommt eine um 1 höhere TTL; der jeweils letzte Router meldet sich."
   },
   {
    "q": "Welche Fehlermeldung sendet ein Router bei TTL=0 zurück?",
    "o": [
     {
      "t": "ICMP Time Exceeded",
      "ok": true
     },
     {
      "t": "HTTP 404",
      "ok": false
     },
     {
      "t": "TCP RST",
      "ok": false
     },
     {
      "t": "DNS NXDOMAIN",
      "ok": false
     }
    ],
    "e": "Der Router antwortet mit ICMP 'Time Exceeded'."
   },
   {
    "q": "Welche Information steht NICHT typischerweise im IP-Header?",
    "o": [
     {
      "t": "Der vollständige Dateiinhalt",
      "ok": true
     },
     {
      "t": "Quell-IP",
      "ok": false
     },
     {
      "t": "Ziel-IP",
      "ok": false
     },
     {
      "t": "TTL",
      "ok": false
     }
    ],
    "e": "Der Inhalt liegt in der Payload, nicht im Header."
   },
   {
    "q": "Was ist die Payload eines Pakets?",
    "o": [
     {
      "t": "Die eigentlichen Nutzdaten",
      "ok": true
     },
     {
      "t": "Die Zieladresse",
      "ok": false
     },
     {
      "t": "Die Prüfsumme",
      "ok": false
     },
     {
      "t": "Die TTL",
      "ok": false
     }
    ],
    "e": "Payload = transportierter Inhalt (Text, Bildteil, Dateistück)."
   },
   {
    "q": "Welches Header-Feld erkennt Übertragungsfehler?",
    "o": [
     {
      "t": "Die Prüfsumme (Checksum)",
      "ok": true
     },
     {
      "t": "Die Restlebenszeit (TTL)",
      "ok": false
     },
     {
      "t": "Die Sequenznummer (Sequence Number)",
      "ok": false
     },
     {
      "t": "Die Portnummer (Port)",
      "ok": false
     }
    ],
    "e": "Die Checksum prüft, ob Daten beim Transport beschädigt wurden."
   },
   {
    "q": "Welchen Startwert hat eine TTL häufig?",
    "o": [
     {
      "t": "64 oder 128 (je nach Betriebssystem)",
      "ok": true
     },
     {
      "t": "1 (verfällt sofort am ersten Router)",
      "ok": false
     },
     {
      "t": "1024 (wie ein Registered Port)",
      "ok": false
     },
     {
      "t": "65535 (der Maximalwert eines Ports)",
      "ok": false
     }
    ],
    "e": "Typische Startwerte sind 64 (Linux) oder 128 (Windows)."
   },
   {
    "q": "Auf dem Weg zum Zielhost liegen 12 Router. Welchen TTL-Startwert braucht das Paket mindestens, um anzukommen?",
    "o": [
     {
      "t": "13",
      "ok": true
     },
     {
      "t": "11",
      "ok": false
     },
     {
      "t": "1",
      "ok": false
     },
     {
      "t": "64",
      "ok": false
     }
    ],
    "e": "Jeder der 12 Router zieht 1 ab. Mit TTL 12 würde der letzte Router auf 0 dekrementieren und verwerfen — mit 13 kommt das Paket mit TTL 1 an."
   },
   {
    "q": "Was liest ein Router primär aus dem Paket?",
    "o": [
     {
      "t": "Den Header (Steuerdaten)",
      "ok": true
     },
     {
      "t": "Die Payload (Nutzdaten)",
      "ok": false
     },
     {
      "t": "Nur die Checksum",
      "ok": false
     },
     {
      "t": "Die MAC des Absenders am Ziel",
      "ok": false
     }
    ],
    "e": "Router treffen Weiterleitungsentscheidungen anhand des Headers."
   },
   {
    "q": "Wozu dient die Sequence Number im TCP-Header?",
    "o": [
     {
      "t": "Zum korrekten Zusammensetzen der Pakete am Ziel",
      "ok": true
     },
     {
      "t": "Zur Verschlüsselung",
      "ok": false
     },
     {
      "t": "Zur Portzuordnung",
      "ok": false
     },
     {
      "t": "Zur MAC-Adressierung",
      "ok": false
     }
    ],
    "e": "Sie stellt die richtige Reihenfolge zerlegter Daten wieder her."
   },
   {
    "q": "Warum sendet Traceroute das erste Paket mit TTL=1?",
    "o": [
     {
      "t": "Damit der erste Router es verwirft und sich meldet",
      "ok": true
     },
     {
      "t": "Um die Payload zu minimieren",
      "ok": false
     },
     {
      "t": "Um die schnellste Route zu erzwingen",
      "ok": false
     },
     {
      "t": "Um DNS zu umgehen",
      "ok": false
     }
    ],
    "e": "Der erste Router senkt die TTL auf 0, verwirft das Paket und schickt eine ICMP-Fehlermeldung zurück. So erfährt Traceroute seine IP-Adresse."
   },
   {
    "q": "Was ist ein 'Hop' im Netzwerkkontext?",
    "o": [
     {
      "t": "Ein Zwischenstopp (Router) auf dem Weg zum Ziel",
      "ok": true
     },
     {
      "t": "Ein verlorenes Paket",
      "ok": false
     },
     {
      "t": "Ein Portwechsel",
      "ok": false
     },
     {
      "t": "Eine verschlüsselte Verbindung",
      "ok": false
     }
    ],
    "e": "Jeder passierte Router ist ein Hop."
   },
   {
    "q": "Welche Adressen enthält der IP-Header zwingend?",
    "o": [
     {
      "t": "Quell- und Ziel-IP-Adresse",
      "ok": true
     },
     {
      "t": "Nur die Ziel-MAC",
      "ok": false
     },
     {
      "t": "Nur die Quell-IP",
      "ok": false
     },
     {
      "t": "Domainnamen",
      "ok": false
     }
    ],
    "e": "Der IP-Header trägt Quell- und Ziel-IP für das Routing."
   },
   {
    "q": "Der Header verhält sich zum Paket wie …",
    "o": [
     {
      "t": "der Adressaufkleber zum Postpaket",
      "ok": true
     },
     {
      "t": "das Porto zum Brief",
      "ok": false
     },
     {
      "t": "der Umschlag zum Inhalt (identisch)",
      "ok": false
     },
     {
      "t": "die Briefmarke zum Absender",
      "ok": false
     }
    ],
    "e": "Der Header ist das Adress-/Steuersegment, die Payload der Inhalt."
   },
   {
    "q": "Welches Werkzeug zeigt den kompletten Pfad zu einem Server an?",
    "o": [
     {
      "t": "traceroute (oder tracert)",
      "ok": true
     },
     {
      "t": "ping (oder icmp-echo)",
      "ok": false
     },
     {
      "t": "nslookup (oder dig)",
      "ok": false
     },
     {
      "t": "ipconfig (oder ifconfig)",
      "ok": false
     }
    ],
    "e": "Traceroute zeigt den genauen Weg über alle Hops an. nslookup löst Namen auf, ping prüft nur die Erreichbarkeit und ipconfig zeigt die eigene Konfiguration."
   },
   {
    "q": "Was enthält ein IPv4-Header zwingend?",
    "o": [
     {
      "t": "Quell-IP, Ziel-IP, TTL, Protokoll, Prüfsumme",
      "ok": true
     },
     {
      "t": "Nur Quell- und Ziel-IP",
      "ok": false
     },
     {
      "t": "MAC-Adressen, Portnummern und die Prüfsummen",
      "ok": false
     },
     {
      "t": "Die Quell- und Ziel-Portnummern der kommunizierenden Anwendungen.",
      "ok": false
     }
    ],
    "e": "Der IPv4-Header enthält u.a. Quell-/Ziel-IP, TTL, Protokollfeld und Header-Prüfsumme."
   },
   {
    "q": "Welches Protokoll sendet 'Time Exceeded', wenn die TTL 0 erreicht?",
    "o": [
     {
      "t": "ICMP",
      "ok": true
     },
     {
      "t": "TCP",
      "ok": false
     },
     {
      "t": "UDP",
      "ok": false
     },
     {
      "t": "ARP",
      "ok": false
     }
    ],
    "e": "ICMP (Internet Control Message Protocol) sendet 'Time Exceeded' zurück an den Absender."
   },
   {
    "q": "Was beschreibt das 'Protokollfeld' im IP-Header?",
    "o": [
     {
      "t": "Welches Transportprotokoll die Payload enthält (6=TCP, 17=UDP)",
      "ok": true
     },
     {
      "t": "Die Versionsnummer des IP-Protokolls (4 oder 6)",
      "ok": false
     },
     {
      "t": "Die verbleibende Lebenszeit des Pakets (TTL)",
      "ok": false
     },
     {
      "t": "Die Gesamtlänge des IP-Headers in Byte",
      "ok": false
     }
    ],
    "e": "Das Protokollfeld sagt dem Empfänger, wie er die Payload zu interpretieren hat (TCP=6, UDP=17, ICMP=1)."
   },
   {
    "q": "Was ist die Funktion der Sequence Number im TCP-Header?",
    "o": [
     { "t": "Nummeriert die Bytes zur korrekten Reihenfolge beim Empfänger", "ok": true },
     { "t": "Zählt die verbleibenden Weiterleitungen bis zum Verwerfen", "ok": false },
     { "t": "Identifiziert die empfangende Anwendung auf dem Zielsystem", "ok": false },
     { "t": "Sichert die Nutzdaten gegen Veränderung auf dem Übertragungsweg", "ok": false }
    ],
    "e": "Die Sequenznummer ermöglicht die Wiederzusammensetzung in richtiger Reihenfolge."
   },
   {
    "q": "Was gibt die Acknowledgement Number im TCP-Header konkret an?",
    "o": [
     {
      "t": "Die Sequenznummer des nächsten Datenbytes, das der Empfänger erwartet",
      "ok": true
     },
     {
      "t": "Die Sequenznummer des eigenen Pakets",
      "ok": false
     },
     {
      "t": "Die Portnummer der Anwendung, für die das Paket bestimmt ist",
      "ok": false
     },
     {
      "t": "Die Gesamtzahl aller Pakete, die während der Sitzung verloren gingen",
      "ok": false
     }
    ],
    "e": "Die Bestätigungsnummer ist kumulativ und nennt immer die Nummer des nächsten erwarteten Bytes (z. B. Erhalten: 1–1000 -> ACK: 1001)."
   },
   {
    "q": "Welchen typischen Startwert hat die TTL unter Linux?",
    "o": [
     {
      "t": "64",
      "ok": true
     },
     {
      "t": "128",
      "ok": false
     },
     {
      "t": "255",
      "ok": false
     },
     {
      "t": "32",
      "ok": false
     }
    ],
    "e": "Linux = TTL 64, Windows = 128, einige Netzwerkgeräte = 255."
   },
   {
    "q": "Ein Windows-PC sendet ein Paket mit einer TTL von 128. Welchen TTL-Wert hat das Paket am Ziel, wenn es 12 Router passiert hat?",
    "o": [
     { "t": "116", "ok": true },
     { "t": "128", "ok": false },
     { "t": "1", "ok": false },
     { "t": "140", "ok": false }
    ],
    "e": "Jeder Router zieht genau 1 vom TTL-Wert ab. Da gängige Betriebssysteme mit Werten wie 64 oder 128 starten, bleibt nach 12 Hops reichlich Rest-TTL übrig (116)."
   },
   {
    "q": "Was zeigt traceroute durch schrittweise TTL-Erhöhung?",
    "o": [
     { "t": "Die Route mit allen Zwischen-Routern und deren Antwortzeiten", "ok": true },
     { "t": "Die verfügbare Bandbreite auf jedem Teilstück des Weges", "ok": false },
     { "t": "Die Paketverluste je Teilstrecke über einen Messzeitraum", "ok": false },
     { "t": "Die MAC-Adressen aller Geräte entlang der Strecke", "ok": false }
    ],
    "e": "Traceroute erhöht TTL von 1 an: jeder Router, der das Paket verwirft, meldet sich zurück."
   },
   {
    "q": "Welches Werkzeug testet die reine Erreichbarkeit eines Hosts?",
    "o": [
     {
      "t": "ping (nutzt ICMP Echo Request/Reply)",
      "ok": true
     },
     {
      "t": "traceroute (verfolgt den Pfad über Hops)",
      "ok": false
     },
     {
      "t": "nslookup (fragt DNS-Einträge ab)",
      "ok": false
     },
     {
      "t": "netstat (zeigt offene Verbindungen)",
      "ok": false
     }
    ],
    "e": "ping sendet ICMP-Echo-Requests und misst, ob und wie schnell ein Host antwortet."
   },
   {
    "q": "Was passiert mit einem Paket, wenn kein Router auf dem Weg es weiterleiten kann?",
    "o": [
     {
      "t": "Es wird verworfen, der Sender erhält ggf. eine ICMP Unreachable-Meldung",
      "ok": true
     },
     {
      "t": "Es wird am Zielrouter gespeichert",
      "ok": false
     },
     {
      "t": "Es wird automatisch zurückgesendet",
      "ok": false
     },
     {
      "t": "Die TTL wird auf 0 gesetzt und das Paket wartet",
      "ok": false
     }
    ],
    "e": "Nicht zustellbare Pakete werden verworfen; ICMP 'Destination Unreachable' informiert den Absender."
   }
  ]
 },
 "osi": {
  "name": "OSI-Modell",
  "q": [
   {
    "q": "Wie viele Schichten hat das OSI-Modell?",
    "o": [
     {
      "t": "7",
      "ok": true
     },
     {
      "t": "5",
      "ok": false
     },
     {
      "t": "4",
      "ok": false
     },
     {
      "t": "8",
      "ok": false
     }
    ],
    "e": "Das OSI-Modell hat 7 Schichten (Layer 1–7)."
   },
   {
    "q": "Was läuft auf Schicht 1 (Bitübertragungsschicht / Physical)?",
    "o": [
     {
      "t": "Übertragung roher Bits über das Medium (Kabel, Funk)",
      "ok": true
     },
     {
      "t": "Logische Adressierung und Wegfindung zwischen Netzen",
      "ok": false
     },
     {
      "t": "Verschlüsselung und Kompression der Nutzdaten",
      "ok": false
     },
     {
      "t": "Auf- und Abbau von Sitzungen zwischen Anwendungen",
      "ok": false
     }
    ],
    "e": "Layer 1 überträgt Bits physisch; Geräte: Hub, Repeater, Kabel."
   },
   {
    "q": "Was läuft auf Schicht 2 (Sicherungsschicht / Data Link)?",
    "o": [
     {
      "t": "MAC-Adressierung und Fehlererkennung im lokalen Netz",
      "ok": true
     },
     {
      "t": "Wegfindung und Routing zwischen verschiedenen Netzen",
      "ok": false
     },
     {
      "t": "Zuordnung von Ports zu Anwendungen",
      "ok": false
     },
     {
      "t": "Kompression und Codierung der Darstellung",
      "ok": false
     }
    ],
    "e": "Layer 2 arbeitet mit Frames/MAC-Adressen; Gerät: Switch, Bridge."
   },
   {
    "q": "Was läuft auf Schicht 3 (Vermittlungsschicht / Network)?",
    "o": [
     {
      "t": "Logische Adressierung (IP) und Wegfindung/Routing",
      "ok": true
     },
     {
      "t": "Übertragung einzelner Bits über das physische Medium",
      "ok": false
     },
     {
      "t": "MAC-Adressierung und Rahmenbildung im LAN",
      "ok": false
     },
     {
      "t": "Verschlüsselung und Formatierung der Darstellung",
      "ok": false
     }
    ],
    "e": "Layer 3 = IP-Adressen und Routing; Gerät: Router."
   },
   {
    "q": "Was läuft auf Schicht 4 (Transportschicht / Transport)?",
    "o": [
     {
      "t": "Ende-zu-Ende-Verbindung, Ports, Segmentierung (TCP/UDP)",
      "ok": true
     },
     {
      "t": "Übertragung roher Bits über Kupfer oder Glasfaser",
      "ok": false
     },
     {
      "t": "Auf- und Abbau von Kommunikationssitzungen",
      "ok": false
     },
     {
      "t": "Physische MAC-Adressierung im lokalen Segment",
      "ok": false
     }
    ],
    "e": "Layer 4 = TCP/UDP, Ports, Segmente, Flusskontrolle."
   },
   {
    "q": "Was läuft auf Schicht 5 (Sitzungsschicht / Session)?",
    "o": [
     {
      "t": "Auf-/Abbau und Steuerung von Sitzungen und Dialogen",
      "ok": true
     },
     {
      "t": "Wegfindung und Routing zwischen Netzen",
      "ok": false
     },
     {
      "t": "Übertragung einzelner Bits über das Medium",
      "ok": false
     },
     {
      "t": "MAC-Adressierung und Rahmenprüfung im LAN",
      "ok": false
     }
    ],
    "e": "Layer 5 verwaltet Sitzungen (Aufbau, Synchronisation, Abbau)."
   },
   {
    "q": "Was läuft auf Schicht 6 (Darstellungsschicht / Presentation)?",
    "o": [
     {
      "t": "Datenformat, Codierung, Verschlüsselung und Kompression",
      "ok": true
     },
     {
      "t": "Wegfindung und logische IP-Adressierung",
      "ok": false
     },
     {
      "t": "Zuordnung von Ports zu laufenden Anwendungen",
      "ok": false
     },
     {
      "t": "Übertragung roher Bits über das physische Medium",
      "ok": false
     }
    ],
    "e": "Layer 6 wandelt/verschlüsselt/komprimiert Datenformate."
   },
   {
    "q": "Was läuft auf Schicht 7 (Anwendungsschicht / Application)?",
    "o": [
     {
      "t": "Anwendungsnahe Protokolle wie HTTP, FTP, SMTP, DNS",
      "ok": true
     },
     {
      "t": "MAC-Adressierung und Fehlerprüfung im lokalen Netz",
      "ok": false
     },
     {
      "t": "Physische Übertragung einzelner Bits über das Medium",
      "ok": false
     },
     {
      "t": "Segmentierung und Portzuordnung im Transport",
      "ok": false
     }
    ],
    "e": "Layer 7 stellt Netzdienste für Anwendungen bereit (HTTP, SMTP, DNS …)."
   },
   {
    "q": "Auf welcher Schicht arbeitet ein Router primär?",
    "o": [
     {
      "t": "Schicht 3 (Vermittlung)",
      "ok": true
     },
     {
      "t": "Schicht 1 (Bitübertragung)",
      "ok": false
     },
     {
      "t": "Schicht 2 (Sicherung)",
      "ok": false
     },
     {
      "t": "Schicht 4 (Transport)",
      "ok": false
     }
    ],
    "e": "Der Router trifft Weiterleitungsentscheidungen anhand von IP → Layer 3."
   },
   {
    "q": "Auf welcher Schicht arbeitet ein Switch primär?",
    "o": [
     {
      "t": "Schicht 2 (Sicherung)",
      "ok": true
     },
     {
      "t": "Schicht 1 (Bitübertragung)",
      "ok": false
     },
     {
      "t": "Schicht 3 (Vermittlung)",
      "ok": false
     },
     {
      "t": "Schicht 7 (Anwendung)",
      "ok": false
     }
    ],
    "e": "Ein klassischer Switch schaltet anhand von MAC-Adressen → Layer 2."
   },
   {
    "q": "Auf welcher Schicht arbeitet ein Hub/Repeater?",
    "o": [
     {
      "t": "Schicht 1 (Bitübertragung)",
      "ok": true
     },
     {
      "t": "Schicht 2 (Sicherung)",
      "ok": false
     },
     {
      "t": "Schicht 3 (Vermittlung)",
      "ok": false
     },
     {
      "t": "Schicht 4 (Transport)",
      "ok": false
     }
    ],
    "e": "Hubs/Repeater verteilen/verstärken nur Signale → Layer 1."
   },
   {
    "q": "Auf welcher Schicht werden Ports (TCP/UDP) verwendet?",
    "o": [
     {
      "t": "Schicht 4 (Transport)",
      "ok": true
     },
     {
      "t": "Schicht 2 (Sicherung)",
      "ok": false
     },
     {
      "t": "Schicht 3 (Vermittlung)",
      "ok": false
     },
     {
      "t": "Schicht 7 (Anwendung)",
      "ok": false
     }
    ],
    "e": "Ports sind Merkmal der Transportschicht (Layer 4)."
   },
   {
    "q": "Wie heißt die Dateneinheit (PDU) auf der Sicherungsschicht (L2)?",
    "o": [
     {
      "t": "Frame",
      "ok": true
     },
     {
      "t": "Paket",
      "ok": false
     },
     {
      "t": "Segment",
      "ok": false
     },
     {
      "t": "Bit",
      "ok": false
     }
    ],
    "e": "L2 = Frame, L3 = Paket, L4 = Segment/Datagramm, L1 = Bit."
   },
   {
    "q": "Wie heißt die Dateneinheit auf der Vermittlungsschicht (L3)?",
    "o": [
     {
      "t": "Paket",
      "ok": true
     },
     {
      "t": "Frame",
      "ok": false
     },
     {
      "t": "Segment",
      "ok": false
     },
     {
      "t": "Bit",
      "ok": false
     }
    ],
    "e": "Layer 3 kapselt Daten in Pakete."
   },
   {
    "q": "Wie heißt die Dateneinheit auf der Transportschicht (L4, TCP)?",
    "o": [
     {
      "t": "Segment",
      "ok": true
     },
     {
      "t": "Frame",
      "ok": false
     },
     {
      "t": "Paket",
      "ok": false
     },
     {
      "t": "Bit",
      "ok": false
     }
    ],
    "e": "TCP = Segment, UDP = Datagramm."
   },
   {
    "q": "Die Merkhilfe „Please Do Not Throw Salami Pizza Away“ beschreibt die OSI-Schichten in welcher Richtung?",
    "o": [
     {
      "t": "Von Schicht 1 nach 7 (Physical → Application)",
      "ok": true
     },
     {
      "t": "Von Schicht 7 nach 1 (Application → Physical)",
      "ok": false
     },
     {
      "t": "Nur die Schichten 1 bis 4",
      "ok": false
     },
     {
      "t": "Die Reihenfolge ist beliebig",
      "ok": false
     }
    ],
    "e": "P-D-N-T-S-P-A läuft von unten nach oben: Physical, Data Link, Network, Transport, Session, Presentation, Application (1→7). Auf die Richtung achten!"
   },
   {
    "q": "Auf welcher Schicht liegt IP?",
    "o": [
     {
      "t": "Schicht 3 (Vermittlung)",
      "ok": true
     },
     {
      "t": "Schicht 2 (Sicherung)",
      "ok": false
     },
     {
      "t": "Schicht 4 (Transport)",
      "ok": false
     },
     {
      "t": "Schicht 1 (Bitübertragung)",
      "ok": false
     }
    ],
    "e": "IP ist ein Vermittlungsschicht-Protokoll (Layer 3)."
   },
   {
    "q": "Auf welcher Schicht liegen TCP und UDP?",
    "o": [
     {
      "t": "Schicht 4 (Transport)",
      "ok": true
     },
     {
      "t": "Schicht 3 (Vermittlung)",
      "ok": false
     },
     {
      "t": "Schicht 5 (Sitzung)",
      "ok": false
     },
     {
      "t": "Schicht 7 (Anwendung)",
      "ok": false
     }
    ],
    "e": "TCP/UDP sind Transportschicht-Protokolle (Layer 4)."
   },
   {
    "q": "Auf welcher Schicht arbeitet das Protokoll HTTP?",
    "o": [
     {
      "t": "Schicht 7 (Anwendung)",
      "ok": true
     },
     {
      "t": "Schicht 4 (Transport)",
      "ok": false
     },
     {
      "t": "Schicht 3 (Vermittlung)",
      "ok": false
     },
     {
      "t": "Schicht 1 (Bitübertragung)",
      "ok": false
     }
    ],
    "e": "HTTP ist ein Anwendungsschicht-Protokoll."
   },
   {
    "q": "Womit adressiert Schicht 2, womit Schicht 3?",
    "o": [
     {
      "t": "L2 adressiert mit MAC-Adressen, L3 mit IP-Adressen",
      "ok": true
     },
     {
      "t": "L2 adressiert mit IP-Adressen, L3 mit MAC-Adressen",
      "ok": false
     },
     {
      "t": "Beide Schichten adressieren ausschließlich über Ports",
      "ok": false
     },
     {
      "t": "Beide Schichten nutzen dieselben MAC-Adressen",
      "ok": false
     }
    ],
    "e": "L2 nutzt physische MAC-Adressen, L3 logische IP-Adressen."
   },
   {
    "q": "Welche Schicht ist für Verschlüsselung/Kompression zuständig?",
    "o": [
     {
      "t": "Schicht 6 (Darstellung)",
      "ok": true
     },
     {
      "t": "Schicht 2 (Sicherung)",
      "ok": false
     },
     {
      "t": "Schicht 4 (Transport)",
      "ok": false
     },
     {
      "t": "Schicht 1 (Bitübertragung)",
      "ok": false
     }
    ],
    "e": "Die Darstellungsschicht wandelt, verschlüsselt und komprimiert Daten."
   },
   {
    "q": "Welche Schicht baut Sitzungen zwischen Anwendungen auf?",
    "o": [
     {
      "t": "Schicht 5 (Sitzung)",
      "ok": true
     },
     {
      "t": "Schicht 3 (Vermittlung)",
      "ok": false
     },
     {
      "t": "Schicht 7 (Anwendung)",
      "ok": false
     },
     {
      "t": "Schicht 1 (Bitübertragung)",
      "ok": false
     }
    ],
    "e": "Die Sitzungsschicht steuert Auf-/Abbau und Synchronisation von Dialogen."
   },
   {
    "q": "Was gehört zur Transportschicht?",
    "o": [
     {
      "t": "Segmentierung, Flusskontrolle und Portzuordnung",
      "ok": true
     },
     {
      "t": "Wegfindung und Routing zwischen Netzen",
      "ok": false
     },
     {
      "t": "MAC-Adressierung und Rahmenbildung im LAN",
      "ok": false
     },
     {
      "t": "Bitcodierung und physische Signalübertragung",
      "ok": false
     }
    ],
    "e": "Layer 4 segmentiert, regelt Fluss und adressiert Anwendungen per Port."
   },
   {
    "q": "Auf welcher Schicht arbeitet DNS?",
    "o": [
     {
      "t": "Schicht 7 (Anwendung)",
      "ok": true
     },
     {
      "t": "Schicht 4 (Transport)",
      "ok": false
     },
     {
      "t": "Schicht 3 (Vermittlung)",
      "ok": false
     },
     {
      "t": "Schicht 5 (Sitzung)",
      "ok": false
     }
    ],
    "e": "DNS ist ein Anwendungsprotokoll (Layer 7)."
   },
   {
    "q": "In welche Richtung durchläuft ein gesendetes Datenpaket die Schichten?",
    "o": [
     {
      "t": "Von Schicht 7 nach Schicht 1",
      "ok": true
     },
     {
      "t": "Von Schicht 1 nach Schicht 7",
      "ok": false
     },
     {
      "t": "Nur Schicht 3 und 4",
      "ok": false
     },
     {
      "t": "Zufällig",
      "ok": false
     }
    ],
    "e": "Beim Senden wird von oben (7) nach unten (1) gekapselt, beim Empfangen umgekehrt."
   },
   {
    "q": "Welche Schichten fasst das TCP/IP-Modell zur 'Anwendungsschicht' zusammen?",
    "o": [
     {
      "t": "OSI-Schichten 5, 6 und 7",
      "ok": true
     },
     {
      "t": "OSI-Schichten 1 und 2",
      "ok": false
     },
     {
      "t": "OSI-Schichten 3 und 4",
      "ok": false
     },
     {
      "t": "Nur Schicht 7",
      "ok": false
     }
    ],
    "e": "Das TCP/IP-Modell hat 4 Schichten: Netzzugang (OSI 1+2), Internet (OSI 3), Transport (OSI 4), Anwendung (OSI 5+6+7 gebündelt)."
   },
   {
    "q": "Ein Frame enthält eine Ziel-MAC-Adresse. Auf welcher Schicht wird er verarbeitet?",
    "o": [
     {
      "t": "Schicht 2 (Sicherung)",
      "ok": true
     },
     {
      "t": "Schicht 3 (Vermittlung)",
      "ok": false
     },
     {
      "t": "Schicht 4 (Transport)",
      "ok": false
     },
     {
      "t": "Schicht 1 (Bitübertragung)",
      "ok": false
     }
    ],
    "e": "MAC-Adressen und Frames gehören zur Sicherungsschicht (L2)."
   },
   {
    "q": "Welche Aussage über einen Layer-3-Switch ist korrekt?",
    "o": [
     {
      "t": "Er leitet zusätzlich zur MAC- auch IP-basiert weiter (Routing)",
      "ok": true
     },
     {
      "t": "Er arbeitet ausschließlich auf der Bitübertragungsschicht",
      "ok": false
     },
     {
      "t": "Er kann grundsätzlich keine VLANs verwalten",
      "ok": false
     },
     {
      "t": "Er ersetzt die physische Verkabelung im Netz",
      "ok": false
     }
    ],
    "e": "Ein Layer-3-Switch kombiniert Switching (L2) mit Routing-Funktionen (L3)."
   },
   {
    "q": "Auf welcher OSI-Schicht arbeitet ARP?",
    "o": [
     {
      "t": "Zwischen Schicht 2 und 3 (löst IP zu MAC auf)",
      "ok": true
     },
     {
      "t": "Ausschließlich auf Schicht 3 (Vermittlung)",
      "ok": false
     },
     {
      "t": "Auf Schicht 4 (End-to-End-Kommunikation zwischen Anwendungen)",
      "ok": false
     },
     {
      "t": "Auf Schicht 1 (Bitübertragung)",
      "ok": false
     }
    ],
    "e": "ARP löst IP-Adressen (L3) in MAC-Adressen (L2) auf — es arbeitet an der L2/L3-Grenze."
   },
   {
    "q": "Was versteht man unter Kapselung beim Sendeprozess?",
    "o": [
     {
      "t": "Jede Schicht fügt der Dateneinheit einen eigenen Header hinzu",
      "ok": true
     },
     {
      "t": "Jede Schicht verschlüsselt die Nutzdaten einzeln",
      "ok": false
     },
     {
      "t": "Jede Schicht komprimiert das Paket erneut",
      "ok": false
     },
     {
      "t": "Jede Schicht entfernt einen Header vom Paket",
      "ok": false
     }
    ],
    "e": "Beim Senden kapselt jede Schicht die Daten der oberen Schicht: L4 → Segment, L3 → Paket, L2 → Frame."
   },
   {
    "q": "Was passiert beim Empfänger mit den OSI-Schichten?",
    "o": [
     {
      "t": "Jede Schicht liest und entfernt ihren eigenen Header",
      "ok": true
     },
     {
      "t": "Jede Schicht fügt wie beim Sender einen Header hinzu",
      "ok": false
     },
     {
      "t": "Alle Header werden gleichzeitig auf einmal entfernt",
      "ok": false
     },
     {
      "t": "Die Schichten werden beim Empfang übersprungen",
      "ok": false
     }
    ],
    "e": "Beim Empfangen wird die Kapselung umgekehrt: L1 bis L7 nehmen je ihren Header heraus."
   },
   {
    "q": "Welches Gerät arbeitet auf allen sieben Schichten?",
    "o": [
     { "t": "Gateway / Application-Layer-Firewall", "ok": true },
     { "t": "Layer-3-Switch mit Routingfunktion", "ok": false },
     { "t": "Router mit aktivierter Paketfilterung", "ok": false },
     { "t": "Managed Switch mit VLAN-Unterstützung", "ok": false }
    ],
    "e": "Ein Anwendungsschicht-Gateway (z. B. Proxy, WAF) kann alle 7 Schichten verarbeiten."
   },
   {
    "q": "Welche PDU gehört zur Schicht 2?",
    "o": [
     {
      "t": "Frame",
      "ok": true
     },
     {
      "t": "Paket",
      "ok": false
     },
     {
      "t": "Segment",
      "ok": false
     },
     {
      "t": "Bit",
      "ok": false
     }
    ],
    "e": "L2 = Frame, L3 = Paket, L4 = Segment/Datagramm, L1 = Bit."
   },
   {
    "q": "Welche PDU gehört zur Schicht 3?",
    "o": [
     {
      "t": "Paket",
      "ok": true
     },
     {
      "t": "Frame",
      "ok": false
     },
     {
      "t": "Segment",
      "ok": false
     },
     {
      "t": "Bit",
      "ok": false
     }
    ],
    "e": "Auf der Vermittlungsschicht (L3) werden Daten in Pakete eingekapselt."
   },
   {
    "q": "Auf welcher Schicht arbeitet TLS?",
    "o": [
     {
      "t": "Schicht 6 (Darstellung)",
      "ok": true
     },
     {
      "t": "Schicht 1 (Bitübertragung)",
      "ok": false
     },
     {
      "t": "Schicht 2 (Sicherung)",
      "ok": false
     },
     {
      "t": "Schicht 3 (Vermittlung)",
      "ok": false
     }
    ],
    "e": "TLS wird oft Schicht 6 (Darstellung) zugeordnet, sitzt aber technisch zwischen Transport und Anwendung."
   },
   {
    "q": "Welches Protokoll gehört NICHT zur Transportschicht?",
    "o": [
     {
      "t": "IP",
      "ok": true
     },
     {
      "t": "TCP",
      "ok": false
     },
     {
      "t": "UDP",
      "ok": false
     },
     {
      "t": "QUIC",
      "ok": false
     }
    ],
    "e": "IP gehört zur Vermittlungsschicht (L3), nicht zur Transportschicht (L4)."
   },
   {
    "q": "Was ist die Aufgabe der Sitzungsschicht (L5)?",
    "o": [
     { "t": "Auf- und Abbau sowie Synchronisation von Kommunikationssitzungen", "ok": true },
     { "t": "Umwandlung der Daten in ein einheitliches Übertragungsformat", "ok": false },
     { "t": "Zuverlässige Ende-zu-Ende-Übertragung mit Fehlerbehandlung", "ok": false },
     { "t": "Logische Adressierung und Wegewahl zwischen den Netzen", "ok": false }
    ],
    "e": "L5 verwaltet Sitzungen: Aufbau, Aufrechterhaltung, geordneter Abbau."
   },
   {
    "q": "Welches Protokoll arbeitet auf Schicht 3 und ermöglicht das Internet?",
    "o": [
     {
      "t": "IP",
      "ok": true
     },
     {
      "t": "Ethernet",
      "ok": false
     },
     {
      "t": "TCP",
      "ok": false
     },
     {
      "t": "HTTP",
      "ok": false
     }
    ],
    "e": "IP auf L3 ist die Grundlage der globalen Paketvermittlung im Internet."
   },
   {
    "q": "Was unterscheidet eine Kollisionsdomäne von einer Broadcastdomäne?",
    "o": [
     {
      "t": "Kollisionsdomäne betrifft Signalüberlagerung, Broadcastdomäne die Broadcast-Reichweite",
      "ok": true
     },
     {
      "t": "Beide beschreiben exakt denselben Netzbereich",
      "ok": false
     },
     {
      "t": "Die Broadcastdomäne ist immer kleiner als die Kollisionsdomäne",
      "ok": false
     },
     {
      "t": "Kollisionsdomänen entstehen nur bei Glasfaserverkabelung",
      "ok": false
     }
    ],
    "e": "Kollisionsdomäne = wo Frames kollidieren (L1/2), Broadcastdomäne = wo Broadcasts ankommen (begrenzt durch Router, L3)."
   },
   {
    "q": "Welches Protokoll gehört zur Anwendungsschicht (L7)?",
    "o": [
     {
      "t": "HTTP",
      "ok": true
     },
     {
      "t": "IP",
      "ok": false
     },
     {
      "t": "TCP",
      "ok": false
     },
     {
      "t": "Ethernet",
      "ok": false
     }
    ],
    "e": "HTTP, SMTP, FTP, DNS sind Anwendungsschicht-Protokolle (L7)."
   },
   {
    "q": "In welche Richtung durchläuft ein Datenpaket beim Empfang die Schichten?",
    "o": [
     {
      "t": "Von Schicht 1 nach 7",
      "ok": true
     },
     {
      "t": "Von Schicht 7 nach 1",
      "ok": false
     },
     {
      "t": "Nur Schichten 3 und 4",
      "ok": false
     },
     {
      "t": "Zufällig",
      "ok": false
     }
    ],
    "e": "Empfangen: L1 → L7 (Entkapselung). Senden: L7 → L1 (Kapselung)."
   },
   {
    "q": "Welche Aussage zum TCP/IP-Modell stimmt?",
    "o": [
     {
      "t": "Es hat 4 Schichten: Netzzugang, Internet, Transport, Anwendung",
      "ok": true
     },
     {
      "t": "Es besitzt wie OSI genau 7 getrennte Schichten",
      "ok": false
     },
     {
      "t": "Es verzichtet vollständig auf eine Transportschicht",
      "ok": false
     },
     {
      "t": "Es ist mit dem OSI-Modell vollkommen identisch",
      "ok": false
     }
    ],
    "e": "TCP/IP fasst OSI-Schichten zusammen: 1+2 → Netzzugang, 3 → Internet, 4 → Transport, 5+6+7 → Anwendung."
   }
  ]
 },
 "ausdehnung": {
  "name": "Netzwerkausdehnung (PAN–GAN)",
  "q": [
   {
    "q": "Wofür steht LAN?",
    "o": [
     {
      "t": "Local Area Network",
      "ok": true
     },
     {
      "t": "Large Area Network",
      "ok": false
     },
     {
      "t": "Linked Access Node",
      "ok": false
     },
     {
      "t": "Logical Area Network",
      "ok": false
     }
    ],
    "e": "LAN = Local Area Network (lokales Netz, z. B. Büro/Gebäude)."
   },
   {
    "q": "Wofür steht WAN?",
    "o": [
     {
      "t": "Wide Area Network",
      "ok": true
     },
     {
      "t": "Wireless Area Network",
      "ok": false
     },
     {
      "t": "Web Access Network",
      "ok": false
     },
     {
      "t": "Wide Access Node",
      "ok": false
     }
    ],
    "e": "WAN = Wide Area Network (großräumig, z. B. Internet)."
   },
   {
    "q": "Wofür steht PAN?",
    "o": [
     {
      "t": "Personal Area Network",
      "ok": true
     },
     {
      "t": "Public Area Network",
      "ok": false
     },
     {
      "t": "Private Access Node",
      "ok": false
     },
     {
      "t": "Peripheral Area Network",
      "ok": false
     }
    ],
    "e": "PAN = Personal Area Network (persönlicher Nahbereich)."
   },
   {
    "q": "Wofür steht MAN?",
    "o": [
     {
      "t": "Metropolitan Area Network",
      "ok": true
     },
     {
      "t": "Multiple Access Network",
      "ok": false
     },
     {
      "t": "Managed Area Node",
      "ok": false
     },
     {
      "t": "Mobile Access Network",
      "ok": false
     }
    ],
    "e": "MAN = Metropolitan Area Network (Stadtnetz)."
   },
   {
    "q": "Welche typische Reichweite hat ein PAN?",
    "o": [
     {
      "t": "Wenige Meter (ca. bis 10 m)",
      "ok": true
     },
     {
      "t": "Bis 1 km",
      "ok": false
     },
     {
      "t": "Stadtweit",
      "ok": false
     },
     {
      "t": "Weltweit",
      "ok": false
     }
    ],
    "e": "PAN reicht nur wenige Meter — persönlicher Umkreis."
   },
   {
    "q": "Welche Technologie ist typisch für ein PAN?",
    "o": [
     {
      "t": "Bluetooth / USB / NFC",
      "ok": true
     },
     {
      "t": "Glasfaser-Backbone",
      "ok": false
     },
     {
      "t": "Satellitenfunk",
      "ok": false
     },
     {
      "t": "MPLS",
      "ok": false
     }
    ],
    "e": "PAN nutzt Bluetooth, USB, NFC oder ZigBee im Nahbereich."
   },
   {
    "q": "Welche Ausdehnung hat typischerweise ein LAN?",
    "o": [
     {
      "t": "Gebäude oder Firmengelände",
      "ok": true
     },
     {
      "t": "Ein einzelner Körper",
      "ok": false
     },
     {
      "t": "Eine ganze Stadt",
      "ok": false
     },
     {
      "t": "Ein Kontinent",
      "ok": false
     }
    ],
    "e": "Ein LAN umfasst Räume, ein Gebäude oder ein Gelände (Campus grenzt an)."
   },
   {
    "q": "Wofür steht WLAN?",
    "o": [
     {
      "t": "Wireless Local Area Network",
      "ok": true
     },
     {
      "t": "Wide Local Area Network",
      "ok": false
     },
     {
      "t": "Wired LAN",
      "ok": false
     },
     {
      "t": "World LAN",
      "ok": false
     }
    ],
    "e": "WLAN = drahtloses LAN, meist nach IEEE 802.11 (Wi-Fi)."
   },
   {
    "q": "Welcher Standard beschreibt WLAN (Wi-Fi)?",
    "o": [
     {
      "t": "IEEE 802.11",
      "ok": true
     },
     {
      "t": "IEEE 802.3",
      "ok": false
     },
     {
      "t": "IEEE 802.15",
      "ok": false
     },
     {
      "t": "IEEE 802.1Q",
      "ok": false
     }
    ],
    "e": "802.11 = WLAN; 802.3 = Ethernet; 802.15 = PAN/Bluetooth."
   },
   {
    "q": "Welcher Standard beschreibt kabelgebundenes Ethernet (LAN)?",
    "o": [
     {
      "t": "IEEE 802.3",
      "ok": true
     },
     {
      "t": "IEEE 802.11",
      "ok": false
     },
     {
      "t": "IEEE 802.15",
      "ok": false
     },
     {
      "t": "IEEE 802.16",
      "ok": false
     }
    ],
    "e": "802.3 ist der Ethernet-Standard für verkabelte LANs."
   },
   {
    "q": "Wofür steht CAN im Kontext der Netzausdehnung?",
    "o": [
     {
      "t": "Campus Area Network",
      "ok": true
     },
     {
      "t": "Central Access Node",
      "ok": false
     },
     {
      "t": "Controller Area Network",
      "ok": false
     },
     {
      "t": "City Area Network",
      "ok": false
     }
    ],
    "e": "Im Ausdehnungskontext: Campus Area Network (mehrere Gebäude eines Geländes). (Im KFZ-Bereich meint CAN den Controller Area Network Bus — anderer Kontext.)"
   },
   {
    "q": "Welche Ausdehnung deckt ein CAN (Campus) typischerweise ab?",
    "o": [
     {
      "t": "Mehrere Gebäude auf einem Gelände (bis wenige km)",
      "ok": true
     },
     {
      "t": "Nur einen einzelnen Raum (wenige Meter)",
      "ok": false
     },
     {
      "t": "Ein ganzes Land (hunderte km)",
      "ok": false
     },
     {
      "t": "Die gesamte Welt (global)",
      "ok": false
     }
    ],
    "e": "Ein Campusnetz verbindet mehrere nahe Gebäude, z. B. Uni oder Firmengelände."
   },
   {
    "q": "Welche Ausdehnung hat ein MAN?",
    "o": [
     {
      "t": "Stadtweit (mehrere km bis ~100 km)",
      "ok": true
     },
     {
      "t": "Nur wenige Meter (Nahbereich)",
      "ok": false
     },
     {
      "t": "Weltweit (global vernetzt)",
      "ok": false
     },
     {
      "t": "Nur ein einzelnes Gebäude (lokal)",
      "ok": false
     }
    ],
    "e": "Ein MAN verbindet Standorte innerhalb einer Stadt/Region."
   },
   {
    "q": "Was ist ein typisches Beispiel für ein WAN?",
    "o": [
     {
      "t": "Das Internet",
      "ok": true
     },
     {
      "t": "Ein Bluetooth-Headset",
      "ok": false
     },
     {
      "t": "Ein Heim-WLAN",
      "ok": false
     },
     {
      "t": "Ein einzelner Switch",
      "ok": false
     }
    ],
    "e": "Das Internet ist das größte WAN; auch Firmenstandort-Kopplungen über weite Distanzen."
   },
   {
    "q": "Wofür steht GAN?",
    "o": [
     {
      "t": "Global Area Network",
      "ok": true
     },
     {
      "t": "General Access Network",
      "ok": false
     },
     {
      "t": "Grouped Area Node",
      "ok": false
     },
     {
      "t": "Gateway Area Network",
      "ok": false
     }
    ],
    "e": "GAN = Global Area Network (weltumspannend)."
   },
   {
    "q": "Welche Technologie ist typisch für ein GAN?",
    "o": [
     {
      "t": "Satelliten- und weltweite Mobilfunknetze",
      "ok": true
     },
     {
      "t": "Bluetooth",
      "ok": false
     },
     {
      "t": "Ein einzelnes Ethernet-Kabel",
      "ok": false
     },
     {
      "t": "NFC",
      "ok": false
     }
    ],
    "e": "GAN koppelt weltweit über Satellit/Mobilfunk, oft für mobile Nutzer."
   },
   {
    "q": "Wofür steht BAN?",
    "o": [
     {
      "t": "Body Area Network",
      "ok": true
     },
     {
      "t": "Basic Access Network",
      "ok": false
     },
     {
      "t": "Body Area Node",
      "ok": false
     },
     {
      "t": "Building Area Network",
      "ok": false
     }
    ],
    "e": "BAN = Body Area Network, Geräte am/im Körper."
   },
   {
    "q": "Was ist ein typisches BAN-Beispiel?",
    "o": [
     { "t": "Smartwatch/Fitnesstracker/Medizinsensoren am Körper", "ok": true },
     { "t": "Bluetooth-Kopplung zwischen Smartphone und Autoradio", "ok": false },
     { "t": "Vernetzte Haustechnik innerhalb einer Wohnung", "ok": false },
     { "t": "Funkverbindung zwischen Gebäuden auf einem Gelände", "ok": false }
    ],
    "e": "BAN vernetzt Wearables und Körpersensoren im unmittelbaren Nahbereich."
   },
   {
    "q": "Ordne aufsteigend nach Reichweite: BAN, LAN, MAN, WAN.",
    "o": [
     {
      "t": "BAN < LAN < MAN < WAN",
      "ok": true
     },
     {
      "t": "LAN < BAN < WAN < MAN",
      "ok": false
     },
     {
      "t": "WAN < MAN < LAN < BAN",
      "ok": false
     },
     {
      "t": "MAN < LAN < BAN < WAN",
      "ok": false
     }
    ],
    "e": "Reichweite: BAN (Körper) < PAN < LAN < CAN < MAN < WAN < GAN."
   },
   {
    "q": "Welches typische Gerät steht im Zentrum eines Heim-LAN/WLAN?",
    "o": [
     {
      "t": "Router / Access Point",
      "ok": true
     },
     {
      "t": "Satellit",
      "ok": false
     },
     {
      "t": "NFC-Chip",
      "ok": false
     },
     {
      "t": "Repeater als einziges Gerät",
      "ok": false
     }
    ],
    "e": "Router (oft mit integriertem AP/Switch) bilden das Zentrum kleiner LANs."
   },
   {
    "q": "Welche Ausdehnung liegt direkt zwischen LAN und MAN?",
    "o": [
     {
      "t": "CAN (Campus Area Network)",
      "ok": true
     },
     {
      "t": "PAN (Personal Area Network)",
      "ok": false
     },
     {
      "t": "BAN (Body Area Network)",
      "ok": false
     },
     {
      "t": "GAN (Global Area Network)",
      "ok": false
     }
    ],
    "e": "Die Skala: PAN < LAN < CAN < MAN < WAN."
   },
   {
    "q": "Welche Aussage über WLAN ist korrekt?",
    "o": [
     {
      "t": "Es ist ein drahtloses LAN, meist nach 802.11",
      "ok": true
     },
     {
      "t": "Es ist immer schneller als Kabel-LAN",
      "ok": false
     },
     {
      "t": "Es reicht weltweit",
      "ok": false
     },
     {
      "t": "Es nutzt Satelliten als Standard",
      "ok": false
     }
    ],
    "e": "WLAN ersetzt/ergänzt die Verkabelung im LAN-Bereich per Funk."
   },
   {
    "q": "Welches Netz verbindet mehrere Filialen einer Firma über verschiedene Städte?",
    "o": [
     {
      "t": "WAN",
      "ok": true
     },
     {
      "t": "PAN",
      "ok": false
     },
     {
      "t": "LAN",
      "ok": false
     },
     {
      "t": "BAN",
      "ok": false
     }
    ],
    "e": "Standortübergreifend über große Distanzen → WAN."
   },
   {
    "q": "Welche Technologie ist typisch für ein WAN?",
    "o": [
     { "t": "MPLS, Glasfaser-Weitverkehr, Leased Lines, VPN", "ok": true },
     { "t": "Ethernet, Twisted Pair, Access Points", "ok": false },
     { "t": "Bluetooth, ZigBee, NFC im Nahbereich", "ok": false },
     { "t": "DECT, Powerline, USB-Direktverbindungen", "ok": false }
    ],
    "e": "WANs nutzen Weitverkehrstechnik wie MPLS, Glasfaser, gemietete Leitungen, VPN."
   },
   {
    "q": "Welches Netz ist auf den unmittelbaren Körperbereich beschränkt?",
    "o": [
     {
      "t": "BAN",
      "ok": true
     },
     {
      "t": "MAN",
      "ok": false
     },
     {
      "t": "WAN",
      "ok": false
     },
     {
      "t": "CAN",
      "ok": false
     }
    ],
    "e": "Das BAN ist die kleinste Ausdehnung — direkt am/im Körper."
   },
   {
    "q": "Ein Stadtwerk vernetzt Ampeln und Gebäude in einer Stadt. Welcher Typ?",
    "o": [
     {
      "t": "MAN",
      "ok": true
     },
     {
      "t": "PAN",
      "ok": false
     },
     {
      "t": "LAN",
      "ok": false
     },
     {
      "t": "GAN",
      "ok": false
     }
    ],
    "e": "Stadtweite Vernetzung = Metropolitan Area Network."
   }
  ]
 },
 "ethernet": {
  "name": "Ethernet & Zugriffsverfahren",
  "q": [
   {
    "q": "Welcher IEEE-Standard beschreibt kabelgebundenes Ethernet?",
    "o": [
     {
      "t": "IEEE 802.3",
      "ok": true
     },
     {
      "t": "IEEE 802.11",
      "ok": false
     },
     {
      "t": "IEEE 802.15",
      "ok": false
     },
     {
      "t": "IEEE 802.1Q",
      "ok": false
     }
    ],
    "e": "802.3 = Ethernet (Kabel); 802.11 = WLAN; 802.15 = PAN."
   },
   {
    "q": "Welches Zugriffsverfahren nutzt klassisches Ethernet?",
    "o": [
     {
      "t": "CSMA/CD",
      "ok": true
     },
     {
      "t": "CSMA/CA",
      "ok": false
     },
     {
      "t": "Token Passing",
      "ok": false
     },
     {
      "t": "Polling",
      "ok": false
     }
    ],
    "e": "Klassisches Ethernet (Halbduplex/Hubs) nutzt CSMA/CD zur Kollisionserkennung (Collision Detection). Modernes Ethernet im Vollduplex-Modus benötigt dies nicht mehr."
   },
   {
    "q": "Wofür steht CSMA/CD?",
    "o": [
     {
      "t": "Carrier Sense Multiple Access / Collision Detection",
      "ok": true
     },
     {
      "t": "Carrier Sense Multiple Access / Collision Avoidance",
      "ok": false
     },
     {
      "t": "Central Switch Media Access / Collision Detection",
      "ok": false
     },
     {
      "t": "Carrier Signal Multiple Access / Control Data",
      "ok": false
     }
    ],
    "e": "CSMA/CD = Mithören des Mediums, Senden bei Freiheit, Kollisionen erkennen."
   },
   {
    "q": "Wie reagiert CSMA/CD auf eine erkannte Kollision?",
    "o": [
     { "t": "Senden stoppen, zufällige Wartezeit, erneut versuchen", "ok": true },
     { "t": "Sofort erneut senden, bevor andere Stationen zugreifen", "ok": false },
     { "t": "Senden fortsetzen und das Paket am Ende doppelt sichern", "ok": false },
     { "t": "Die Übertragung an den Switch zur Vermittlung übergeben", "ok": false }
    ],
    "e": "Nach Kollision: Abbruch, Backoff (zufällige Wartezeit), Neuversuch."
   },
   {
    "q": "Welches Zugriffsverfahren nutzt WLAN?",
    "o": [
     {
      "t": "CSMA/CA",
      "ok": true
     },
     {
      "t": "CSMA/CD",
      "ok": false
     },
     {
      "t": "Token Passing",
      "ok": false
     },
     {
      "t": "FDDI-Ring",
      "ok": false
     }
    ],
    "e": "WLAN nutzt CSMA/CA — Kollisionen werden vermieden statt erkannt."
   },
   {
    "q": "Warum nutzt WLAN CA (Avoidance) statt CD (Detection)?",
    "o": [
     {
      "t": "Kollisionen sind per Funk kaum zuverlässig erkennbar",
      "ok": true
     },
     {
      "t": "CA ist immer schneller",
      "ok": false
     },
     {
      "t": "Funk kennt keine Kollisionen",
      "ok": false
     },
     {
      "t": "CD funktioniert nur mit Glasfaser",
      "ok": false
     }
    ],
    "e": "Eine Funkstation kann beim Senden das Medium nicht gleichzeitig zuverlässig abhören → Kollisionen werden im Voraus vermieden."
   },
   {
    "q": "Welches Verfahren ist grundsätzlich kollisionsfrei?",
    "o": [
     {
      "t": "Token Passing",
      "ok": true
     },
     {
      "t": "CSMA/CD",
      "ok": false
     },
     {
      "t": "CSMA/CA",
      "ok": false
     },
     {
      "t": "Broadcast-Flooding",
      "ok": false
     }
    ],
    "e": "Beim Token Passing darf immer nur der aktuelle Besitzer des Tokens (eine Art digitaler Staffelstab) Daten senden. Dadurch sind Kollisionen technisch unmöglich."
   },
   {
    "q": "Welche Adressart nutzt Ethernet zur Zustellung im lokalen Netz?",
    "o": [
     {
      "t": "MAC-Adresse",
      "ok": true
     },
     {
      "t": "IP-Adresse",
      "ok": false
     },
     {
      "t": "Portnummer",
      "ok": false
     },
     {
      "t": "Hostname",
      "ok": false
     }
    ],
    "e": "Ethernet adressiert auf Schicht 2 über MAC-Adressen."
   },
   {
    "q": "Wie heißt die Dateneinheit bei Ethernet (Schicht 2)?",
    "o": [
     {
      "t": "Frame",
      "ok": true
     },
     {
      "t": "Paket",
      "ok": false
     },
     {
      "t": "Segment",
      "ok": false
     },
     {
      "t": "Datagramm",
      "ok": false
     }
    ],
    "e": "Ethernet überträgt Frames auf der Sicherungsschicht."
   },
   {
    "q": "Was enthält ein Ethernet-Frame u. a.?",
    "o": [
     { "t": "Ziel-MAC, Quell-MAC, Nutzdaten und Prüfsumme", "ok": true },
     { "t": "Ziel-IP, Quell-IP, Nutzdaten und die TTL des Pakets", "ok": false },
     { "t": "Quell- und Zielport, Sequenznummer und Prüfsumme", "ok": false },
     { "t": "Hostnamen von Sender und Empfänger samt Zeitstempel", "ok": false }
    ],
    "e": "Ein Frame auf Schicht 2 transportiert die Hardware-Adressen (Ziel-/Quell-MAC), den Typ, die eigentlichen Nutzdaten und die Prüfsumme (FCS/CRC)"
   },
   {
    "q": "Was bezeichnet eine Kollisionsdomäne?",
    "o": [
     {
      "t": "Bereich, in dem sich Frames gegenseitig stören können",
      "ok": true
     },
     {
      "t": "Bereich, in dem Broadcasts verteilt werden",
      "ok": false
     },
     {
      "t": "Ein Netzwerksegment, in dem alle Geräte dieselben DNS-Server verwenden",
      "ok": false
     },
     {
      "t": "Der IP-Adressbereich eines Netzes",
      "ok": false
     }
    ],
    "e": "In einer Kollisionsdomäne können zwei gleichzeitige Sendungen kollidieren."
   },
   {
    "q": "Wie wirkt ein Switch auf Kollisionsdomänen?",
    "o": [
     {
      "t": "Jeder Port ist eine eigene Kollisionsdomäne",
      "ok": true
     },
     {
      "t": "Er fasst alle Ports zu einer Domäne zusammen",
      "ok": false
     },
     {
      "t": "Er hat keinen Einfluss",
      "ok": false
     },
     {
      "t": "Er vergrößert die Kollisionsdomäne",
      "ok": false
     }
    ],
    "e": "Ein Switch trennt Kollisionsdomänen pro Port; ein Hub bildet eine gemeinsame."
   },
   {
    "q": "Was begrenzt eine Broadcastdomäne?",
    "o": [
     {
      "t": "Ein Router (Schicht 3)",
      "ok": true
     },
     {
      "t": "Ein Hub (Schicht 1)",
      "ok": false
     },
     {
      "t": "Ein Repeater (Schicht 1)",
      "ok": false
     },
     {
      "t": "Ein einzelnes Patchkabel",
      "ok": false
     }
    ],
    "e": "Broadcasts werden von Routern standardmäßig nicht über Subnetzgrenzen hinweg weitergeleitet — sie begrenzen somit die Broadcastdomäne."
   },
   {
    "q": "Ein Hub bildet für alle angeschlossenen Geräte …",
    "o": [
     {
      "t": "eine einzige gemeinsame Kollisionsdomäne",
      "ok": true
     },
     {
      "t": "getrennte Kollisionsdomänen je Port",
      "ok": false
     },
     {
      "t": "mehrere Broadcastdomänen",
      "ok": false
     },
     {
      "t": "gar keine Domäne",
      "ok": false
     }
    ],
    "e": "Ein Hub leitet alles an alle → eine gemeinsame Kollisionsdomäne."
   },
   {
    "q": "Welche Datenrate hat 'Fast Ethernet'?",
    "o": [
     {
      "t": "100 Mbit/s",
      "ok": true
     },
     {
      "t": "10 Mbit/s",
      "ok": false
     },
     {
      "t": "1 Gbit/s",
      "ok": false
     },
     {
      "t": "10 Gbit/s",
      "ok": false
     }
    ],
    "e": "Fast Ethernet = 100 Mbit/s (100BASE-TX)."
   },
   {
    "q": "Welche Datenrate hat 'Gigabit Ethernet'?",
    "o": [
     {
      "t": "1 Gbit/s",
      "ok": true
     },
     {
      "t": "100 Mbit/s",
      "ok": false
     },
     {
      "t": "10 Mbit/s",
      "ok": false
     },
     {
      "t": "100 Gbit/s",
      "ok": false
     }
    ],
    "e": "Gigabit Ethernet liefert eine Datenrate von 1 Gbit/s (entspricht 1000 Mbit/s)."
   },
   {
    "q": "Was bedeutet Vollduplex bei Ethernet?",
    "o": [
     {
      "t": "Gleichzeitiges Senden und Empfangen",
      "ok": true
     },
     {
      "t": "Nur abwechselndes Senden/Empfangen",
      "ok": false
     },
     {
      "t": "Nur Senden möglich",
      "ok": false
     },
     {
      "t": "Übertragung nur per Funk",
      "ok": false
     }
    ],
    "e": "Vollduplex erlaubt zeitgleiches Senden und Empfangen — bei geswitchten Verbindungen entfallen Kollisionen."
   },
   {
    "q": "Warum spielt CSMA/CD in modernen Switch-Netzen kaum noch eine Rolle?",
    "o": [
     { "t": "Vollduplex-Switch-Verbindungen erzeugen keine Kollisionen mehr", "ok": true },
     { "t": "Die Kollisionsbehandlung wurde vollständig in die Switches verlagert", "ok": false },
     { "t": "Moderne Netzwerkkarten erkennen Kollisionen bereits vor dem Senden", "ok": false },
     { "t": "Glasfaserstrecken sind physikalisch immun gegen jede Kollision", "ok": false }
    ],
    "e": "Dedizierte Vollduplex-Links am Switch machen die Kollisionserkennung überflüssig."
   },
   {
    "q": "Welches Feld im Ethernet-Frame dient der Fehlererkennung?",
    "o": [
     {
      "t": "Die FCS (Frame Check Sequence / CRC)",
      "ok": true
     },
     {
      "t": "Die TTL (Restlebenszeit)",
      "ok": false
     },
     {
      "t": "Die Portnummer des Dienstes",
      "ok": false
     },
     {
      "t": "Die Präambel zur Synchronisation",
      "ok": false
     }
    ],
    "e": "Die FCS (CRC-Prüfsumme) erkennt beschädigte Frames."
   },
   {
    "q": "Wozu dient die Präambel eines Ethernet-Frames?",
    "o": [
     {
      "t": "Synchronisation von Sender und Empfänger",
      "ok": true
     },
     {
      "t": "Verschlüsselung von Ethernet-Frames",
      "ok": false
     },
     {
      "t": "Sie signalisiert dem Empfänger die Länge des nachfolgenden Ethernet-Frames",
      "ok": false
     },
     {
      "t": "Routing-Entscheidung",
      "ok": false
     }
    ],
    "e": "Die Präambel besteht aus einer festen Bitfolge und ermöglicht dem Empfänger die Synchronisation seines Takts mit dem eingehenden Signal."
   },
   {
    "q": "Welche Reihenfolge stimmt (Ethernet-Zustellung im LAN)?",
    "o": [
     {
      "t": "Frame mit Ziel-MAC → Switch leitet an passenden Port",
      "ok": true
     },
     {
      "t": "Frame mit Ziel-IP → Hub routet",
      "ok": false
     },
     {
      "t": "Paket mit MAC → Router schaltet",
      "ok": false
     },
     {
      "t": "Segment mit Port → Bridge verschlüsselt",
      "ok": false
     }
    ],
    "e": "Der Switch liest die Ziel-MAC im Frame und leitet gezielt an den zugehörigen Port."
   },
   {
    "q": "Was passiert bei einem Hub, wenn zwei Geräte gleichzeitig senden?",
    "o": [
     {
      "t": "Eine Kollision, beide müssen erneut senden",
      "ok": true
     },
     {
      "t": "Nichts, Hub trennt die Signale",
      "ok": false
     },
     {
      "t": "Der Router greift ein",
      "ok": false
     },
     {
      "t": "Die Frames werden verschlüsselt",
      "ok": false
     }
    ],
    "e": "Da der Hub eine gemeinsame Kollisionsdomäne bildet, kollidieren gleichzeitige Sendungen."
   },
   {
    "q": "Was ist die maximale Länge eines Ethernet-Segments mit Twisted Pair?",
    "o": [
     {
      "t": "100 Meter",
      "ok": true
     },
     {
      "t": "200 Meter",
      "ok": false
     },
     {
      "t": "500 Meter",
      "ok": false
     },
     {
      "t": "10 Meter",
      "ok": false
     }
    ],
    "e": "100 Meter ist das Standard-Limit für die Übertragung über Kupfer (z. B. Fast Ethernet und Gigabit Ethernet). Es teilt sich meist in 90m Verlegekabel und 10m Patchkabel auf."
   },
   {
    "q": "Welche MAC-Adresse ist ein Broadcast?",
    "o": [
     {
      "t": "FF:FF:FF:FF:FF:FF",
      "ok": true
     },
     {
      "t": "00:00:00:00:00:00",
      "ok": false
     },
     {
      "t": "01:00:5E:00:00:01",
      "ok": false
     },
     {
      "t": "00:1A:2B:3C:4D:5E",
      "ok": false
     }
    ],
    "e": "FF:FF:FF:FF:FF:FF ist die Layer-2-Broadcast-Adresse — alle Geräte im Subnetz empfangen den Frame."
   },
   {
    "q": "Was unterscheidet Unicast, Multicast und Broadcast?",
    "o": [
     { "t": "Unicast: an einen, Multicast: an eine Gruppe, Broadcast: an alle", "ok": true },
     { "t": "Unicast: an alle, Multicast: an einen, Broadcast: an eine Gruppe", "ok": false },
     { "t": "Unicast: im LAN, Multicast: ins WAN, Broadcast: ins Internet", "ok": false },
     { "t": "Unicast: per Kabel, Multicast: per Funk, Broadcast: auf beiden Wegen", "ok": false }
    ],
    "e": "Unicast = 1 an 1. Multicast = 1 an eine Gruppe. Broadcast = 1 an alle."
   },
   {
    "q": "Welche Felder enthält ein Ethernet-Frame mindestens?",
    "o": [
     { "t": "Präambel, Ziel-MAC, Quell-MAC, Typ/Länge, Daten, FCS", "ok": true },
     { "t": "Version, Header-Länge, TTL, Protokoll, Quell- und Ziel-IP", "ok": false },
     { "t": "Quellport, Zielport, Sequenznummer, ACK-Nummer, Fenster", "ok": false },
     { "t": "SSID, Kanal, Sendeleistung, MAC-Filter, Verschlüsselung", "ok": false }
    ],
    "e": "Der Ethernet-Frame-Aufbau: Präambel | Ziel-MAC | Quell-MAC | Typ/Länge | Daten | FCS."
   },
   {
    "q": "Was macht ein Switch mit einem Frame, dessen Quell-MAC er noch nicht kennt?",
    "o": [
     {
      "t": "Er trägt sie in die MAC-Tabelle ein",
      "ok": true
     },
     {
      "t": "Er verwirft den Frame aus Sicherheitsgründen sofort",
      "ok": false
     },
     {
      "t": "Er sendet eine Fehlermeldung",
      "ok": false
     },
     {
      "t": "Er routet den Frame anhand der IP-Adresse in das richtige Subnetz weiter",
      "ok": false
     }
    ],
    "e": "Der Switch lernt passiv: jeder eingehende Frame aktualisiert die MAC-Tabelle mit Quell-MAC und Eingangsport."
   },
   {
    "q": "Was ist Auto-Negotiation bei Ethernet?",
    "o": [
     { "t": "Automatische Aushandlung von Geschwindigkeit und Duplex zwischen zwei Ports", "ok": true },
     { "t": "Automatische Auswahl des kürzesten Pfads durch redundante Verbindungen", "ok": false },
     { "t": "Automatische Zuweisung des Ports in das passende VLAN je Endgerät", "ok": false },
     { "t": "Automatischer Wechsel auf eine Reserveleitung bei Verbindungsabbruch", "ok": false }
    ],
    "e": "Auto-Negotiation einigt sich auf die höchste gemeinsam unterstützte Geschwindigkeit und Duplex-Modus."
   },
   {
    "q": "Was ist ein Uplink-Port an einem Switch?",
    "o": [
     { "t": "Ein Port, der den Switch mit einem übergeordneten Gerät (Router, Core-Switch) verbindet", "ok": true },
     { "t": "Ein gespiegelter Port, der den gesamten Verkehr zur Analyse an ein Messgerät ausleitet", "ok": false },
     { "t": "Ein Port mit erhöhter Priorität, an dem zeitkritische Endgeräte angeschlossen werden (Fax, Drucker)", "ok": false },
     { "t": "Ein Port, über den die Konfiguration des Switches per Konsole zugänglich ist", "ok": false }
    ],
    "e": "Uplinks verbinden Switches mit der nächsten Hierarchieebene — oft mit höherer Bandbreite (z. B. 10 Gbit/s statt 1 Gbit/s)."
   },
   {
    "q": "Was ist PoE und welchen Vorteil bietet es?",
    "o": [
     { "t": "Power over Ethernet: Strom über das Netzwerkkabel — kein separates Netzteil nötig", "ok": true },
     { "t": "Point-to-Point over Ethernet: direkte Einwahlverbindung zum Internetprovider", "ok": false },
     { "t": "Priority over Ethernet: bevorzugte Behandlung markierter Frames im Switch", "ok": false },
     { "t": "Passive optical Ethernet: Glasfaseranbindung ohne aktive Zwischenkomponenten", "ok": false }
    ],
    "e": "PoE (IEEE 802.3af/at/bt) versorgt APs, IP-Telefone und Kameras direkt über das Ethernet-Kabel."
   },
   {
    "q": "Welche Kabelnorm ist nötig für 10 Gigabit Ethernet über 55 Meter?",
    "o": [
     {
      "t": "Cat 6A",
      "ok": true
     },
     {
      "t": "Cat 5e",
      "ok": false
     },
     {
      "t": "Cat 6",
      "ok": false
     },
     {
      "t": "Cat 3",
      "ok": false
     }
    ],
    "e": "Bis zu 55m reicht Cat 6 für 10G. Da die Frage aber nach einer Strecke ÜBER 55m verlangt, ist Cat 6A zwingend nötig."
   },
   {
    "q": "Was ist ein VLAN-Tag nach IEEE 802.1Q?",
    "o": [
     {
      "t": "Ein 4-Byte-Feld im Frame mit VLAN-ID und Priorität",
      "ok": true
     },
     {
      "t": "Ein zusätzliches Feld im IP-Header auf Schicht 3",
      "ok": false
     },
     {
      "t": "Ein spezieller Eintrag im DNS",
      "ok": false
     },
     {
      "t": "Eine besondere Bezeichnung für einen Port",
      "ok": false
     }
    ],
    "e": "Der IEEE 802.1Q-Standard fügt ein 4-Byte-Feld direkt in den Ethernet-Frame (Schicht 2) ein, um Pakete einem bestimmten VLAN zuzuordnen."
   }
  ]
 },
 "medien": {
  "name": "Kabel, Medien & Hardware",
  "q": [
   {
    "q": "Welches Kupferkabel ist heute Standard in LANs?",
    "o": [
     {
      "t": "Twisted-Pair",
      "ok": true
     },
     {
      "t": "Koaxialkabel",
      "ok": false
     },
     {
      "t": "Flachbandkabel",
      "ok": false
     },
     {
      "t": "Klingeldraht",
      "ok": false
     }
    ],
    "e": "Twisted-Pair (z. B. Cat 5e/6/7) mit RJ45 ist LAN-Standard."
   },
   {
    "q": "Warum sind die Adernpaare bei Twisted-Pair verdrillt?",
    "o": [
     {
      "t": "Zur Reduktion elektromagnetischer Störungen",
      "ok": true
     },
     {
      "t": "Um Strom zu sparen",
      "ok": false
     },
     {
      "t": "Für höhere Spannung",
      "ok": false
     },
     {
      "t": "Aus optischen Gründen",
      "ok": false
     }
    ],
    "e": "Die Verdrillung mindert Übersprechen und Störeinflüsse (EMV)."
   },
   {
    "q": "Was bedeutet UTP?",
    "o": [
     {
      "t": "Unshielded Twisted Pair",
      "ok": true
     },
     {
      "t": "Universal Twisted Pair",
      "ok": false
     },
     {
      "t": "Ultra Transfer Protocol",
      "ok": false
     },
     {
      "t": "Unshielded Transfer Port",
      "ok": false
     }
    ],
    "e": "UTP = ungeschirmtes Twisted-Pair; STP = geschirmt."
   },
   {
    "q": "Was ist der Vorteil von STP gegenüber UTP?",
    "o": [
     { "t": "Besserer Schutz vor elektromagnetischen Störungen durch Schirmung", "ok": true },
     { "t": "Höhere Übertragungsraten durch dickere Kupferadern", "ok": false },
     { "t": "Größere maximale Segmentlänge zwischen den Geräten", "ok": false },
     { "t": "Einfachere Verlegung durch flexibleren Kabelaufbau", "ok": false }
    ],
    "e": "STP ist geschirmt und störungsresistenter, aber teurer/steifer."
   },
   {
    "q": "Welche maximale Segmentlänge gilt für Twisted-Pair-Ethernet (Kupfer)?",
    "o": [
     {
      "t": "100 Meter",
      "ok": true
     },
     {
      "t": "10 Meter",
      "ok": false
     },
     {
      "t": "1000 Meter",
      "ok": false
     },
     {
      "t": "550 Meter",
      "ok": false
     }
    ],
    "e": "Für 100BASE-TX/1000BASE-T gilt die 100-m-Grenze pro Segment."
   },
   {
    "q": "Welcher Stecker ist typisch für Twisted-Pair-Netzwerkkabel?",
    "o": [
     {
      "t": "RJ45",
      "ok": true
     },
     {
      "t": "RJ11",
      "ok": false
     },
     {
      "t": "BNC",
      "ok": false
     },
     {
      "t": "SC",
      "ok": false
     }
    ],
    "e": "RJ45 ist der 8-polige Standardstecker für LAN-Kupferkabel."
   },
   {
    "q": "Welches Medium ist unempfindlich gegen elektromagnetische Störungen?",
    "o": [
     {
      "t": "Glasfaser (Lichtwellenleiter)",
      "ok": true
     },
     {
      "t": "UTP-Kupfer (ungeschirmt)",
      "ok": false
     },
     {
      "t": "Koaxialkabel (geschirmt)",
      "ok": false
     },
     {
      "t": "STP-Kupfer (geschirmt)",
      "ok": false
     }
    ],
    "e": "Glasfaser überträgt Licht und ist immun gegen EMV-Störungen."
   },
   {
    "q": "Wodurch unterscheiden sich Monomode- und Multimode-Glasfaser?",
    "o": [
     {
      "t": "Monomode für große Distanzen, Multimode für kürzere",
      "ok": true
     },
     {
      "t": "Monomode-Glasfaserkabel nutzen im Kern eine dünne Kupferader zur Stabilisierung.",
      "ok": false
     },
     {
      "t": "Monomode nutzt Kupfer",
      "ok": false
     },
     {
      "t": "Es gibt keinen Unterschied",
      "ok": false
     }
    ],
    "e": "Monomode (dünner Kern, Laser) reicht sehr weit; Multimode (dickerer Kern, LED) für kürzere Strecken."
   },
   {
    "q": "Welche Stecker sind typisch für Glasfaser?",
    "o": [
     {
      "t": "SC und LC",
      "ok": true
     },
     {
      "t": "RJ45 und RJ11",
      "ok": false
     },
     {
      "t": "BNC und T-Stück",
      "ok": false
     },
     {
      "t": "USB-C",
      "ok": false
     }
    ],
    "e": "Glasfaser nutzt Steckertypen wie SC, LC, ST."
   },
   {
    "q": "Welches Kabel wurde in alten Bus-Netzen verwendet?",
    "o": [
     {
      "t": "Koaxialkabel",
      "ok": true
     },
     {
      "t": "Twisted-Pair Cat 6",
      "ok": false
     },
     {
      "t": "Monomode-Glasfaser",
      "ok": false
     },
     {
      "t": "Flachbandkabel",
      "ok": false
     }
    ],
    "e": "Frühe Ethernet-Busnetze (10BASE2/5) nutzten Koaxialkabel."
   },
   {
    "q": "Welche Kabelkategorie unterstützt Gigabit Ethernet mindestens?",
    "o": [
     {
      "t": "Cat 5e",
      "ok": true
     },
     {
      "t": "Cat 3",
      "ok": false
     },
     {
      "t": "Cat 1",
      "ok": false
     },
     {
      "t": "RJ11",
      "ok": false
     }
    ],
    "e": "Cat 5e ist das Minimum für stabile 1 Gbit/s; Cat 6/6a für höhere Reserven/10G."
   },
   {
    "q": "Wofür steht NIC?",
    "o": [
     {
      "t": "Network Interface Card (Netzwerkkarte)",
      "ok": true
     },
     {
      "t": "Network Internet Controller (Steuergerät)",
      "ok": false
     },
     {
      "t": "Node Identification Code (Kennung)",
      "ok": false
     },
     {
      "t": "New Interface Connector (Stecker)",
      "ok": false
     }
    ],
    "e": "NIC = Netzwerkkarte, die Schnittstelle des Geräts zum Netz."
   },
   {
    "q": "Welches unveränderliche Merkmal besitzt jede Netzwerkkarte ab Werk?",
    "o": [
     {
      "t": "Eine weltweit eindeutige MAC-Adresse",
      "ok": true
     },
     {
      "t": "Eine feste IP-Adresse",
      "ok": false
     },
     {
      "t": "Eine feste Portnummer",
      "ok": false
     },
     {
      "t": "Einen Hostnamen",
      "ok": false
     }
    ],
    "e": "Die MAC-Adresse ist in der NIC fest hinterlegt (48 Bit)."
   },
   {
    "q": "Aus wie vielen Bit besteht eine MAC-Adresse?",
    "o": [
     {
      "t": "48 Bit",
      "ok": true
     },
     {
      "t": "32 Bit",
      "ok": false
     },
     {
      "t": "128 Bit",
      "ok": false
     },
     {
      "t": "16 Bit",
      "ok": false
     }
    ],
    "e": "MAC = 48 Bit, meist als 6 Hex-Paare (z. B. 00:1A:2B:3C:4D:5E)."
   },
   {
    "q": "Was kennzeichnet der vordere Teil (OUI) einer MAC-Adresse?",
    "o": [
     {
      "t": "Den Hersteller der Netzwerkkarte",
      "ok": true
     },
     {
      "t": "Die IP des Geräts",
      "ok": false
     },
     {
      "t": "Die Portnummer",
      "ok": false
     },
     {
      "t": "Das Betriebssystem",
      "ok": false
     }
    ],
    "e": "Die ersten 24 Bit (OUI) identifizieren den Hersteller, die hinteren 24 Bit das Gerät."
   },
   {
    "q": "Womit wird eine IP-Adresse im LAN in eine MAC-Adresse aufgelöst?",
    "o": [
     {
      "t": "ARP (Address Resolution Protocol)",
      "ok": true
     },
     {
      "t": "DNS (Domain Name System)",
      "ok": false
     },
     {
      "t": "DHCP (Dynamic Host Configuration)",
      "ok": false
     },
     {
      "t": "ICMP (Internet Control Message)",
      "ok": false
     }
    ],
    "e": "ARP ermittelt zu einer bekannten IP die zugehörige MAC im lokalen Netz."
   },
   {
    "q": "Welche Aussage zu Glasfaser gegenüber Kupfer stimmt?",
    "o": [
     {
      "t": "Höhere Reichweite und Bandbreite, keine EMV-Störung",
      "ok": true
     },
     {
      "t": "Glasfaser hat auf kurzen Strecken eine deutlich höhere Dämpfung als Kupfer.",
      "ok": false
     },
     {
      "t": "Leichter zu spleißen / verlegen",
      "ok": false
     },
     {
      "t": "Überträgt elektrische Signale",
      "ok": false
     }
    ],
    "e": "Glasfaser bietet mehr Reichweite/Bandbreite und Störimmunität, ist aber teurer und empfindlicher beim Verlegen."
   },
   {
    "q": "Welchen Anschluss nutzt ein LAN-Kabel am PC/Switch?",
    "o": [
     {
      "t": "Eine RJ45-Buchse",
      "ok": true
     },
     {
      "t": "Ein HDMI-Anschluss",
      "ok": false
     },
     {
      "t": "Ein USB-A-Anschluss",
      "ok": false
     },
     {
      "t": "Ein DisplayPort",
      "ok": false
     }
    ],
    "e": "Der Ethernet-Port ist eine RJ45-Buchse."
   },
   {
    "q": "Was beschreibt der Begriff 'Übersprechen' (Crosstalk)?",
    "o": [
     { "t": "Störende Signalübertragung zwischen benachbarten Adern", "ok": true },
     { "t": "Signalabschwächung über die Länge der Leitung", "ok": false },
     { "t": "Reflexion des Signals am offenen Kabelende", "ok": false },
     { "t": "Zeitversatz zwischen den Adernpaaren beim Empfänger", "ok": false }
    ],
    "e": "Crosstalk = ungewolltes Einkoppeln von Signalen benachbarter Leitungen; die Verdrillung reduziert es."
   },
   {
    "q": "Welches Medium eignet sich am besten für eine 5 km lange Verbindung zwischen zwei Gebäuden?",
    "o": [
     {
      "t": "Monomode-Glasfaser",
      "ok": true
     },
     {
      "t": "UTP Cat 6",
      "ok": false
     },
     {
      "t": "Koaxialkabel",
      "ok": false
     },
     {
      "t": "WLAN 802.11",
      "ok": false
     }
    ],
    "e": "Kupfer endet bei 100 m; für mehrere Kilometer ist Monomode-Glasfaser die Wahl."
   },
   {
    "q": "Welche Hardware verbindet einen Rechner physisch mit dem Netzwerk?",
    "o": [
     {
      "t": "Die Netzwerkkarte",
      "ok": true
     },
     {
      "t": "Die Grafikkarte",
      "ok": false
     },
     {
      "t": "Der Arbeitsspeicher",
      "ok": false
     },
     {
      "t": "Das Netzteil",
      "ok": false
     }
    ],
    "e": "Die Netzwerkkarte (NIC) ist die Schnittstelle zwischen Gerät und Übertragungsmedium."
   },
   {
    "q": "Was gilt für ungeschirmtes UTP in Umgebungen mit starken Motoren/Maschinen?",
    "o": [
     {
      "t": "Es ist störanfällig",
      "ok": true
     },
     {
      "t": "Es ist dort besonders geeignet",
      "ok": false
     },
     {
      "t": "Es überträgt dann schneller",
      "ok": false
     },
     {
      "t": "Es ist immun gegen Störungen",
      "ok": false
     }
    ],
    "e": "In störreichen Umgebungen (EMV) sind geschirmte Kabel oder Glasfaser sinnvoller."
   },
   {
    "q": "Welche Zuordnung von Netzwerkkomponenten (Kopplungselementen) zu den Schichten des OSI-Modells ist korrekt?",
    "o": [
     {
      "t": "Hub L1, Switch L2, Router L3",
      "ok": true
     },
     {
      "t": "Hub L2, Switch L3, Router L1",
      "ok": false
     },
     {
      "t": "Hub L3, Switch L2, Router L1",
      "ok": false
     },
     {
      "t": "Alle auf L1",
      "ok": false
     }
    ],
    "e": "Hub = Bitübertragung (L1), Switch = MAC/Frames (L2), Router = IP/Routing (L3)."
   },
   {
    "q": "Was ist der Nachteil von Glasfaser gegenüber Kupfer?",
    "o": [
     { "t": "Höhere Kosten und empfindlichere Verlegung/Spleißung", "ok": true },
     { "t": "Störanfälligkeit in der Nähe elektrischer Anlagen", "ok": false },
     { "t": "Begrenzte Übertragungsraten bei großen Distanzen", "ok": false },
     { "t": "Regelmäßiger Austauschbedarf der Fasern durch Alterung", "ok": false }
    ],
    "e": "Glasfaser ist technisch überlegen, aber teurer und aufwendiger zu handhaben."
   }
  ]
 },
 "routing": {
  "name": "Routing & Switching",
  "q": [
   {
    "q": "Was macht ein Router mit einem eingehenden Paket?",
    "o": [
     {
      "t": "Er wählt anhand der Ziel-IP und seiner Routingtabelle den Weg",
      "ok": true
     },
     {
      "t": "Er sendet es an alle Ports gleichzeitig",
      "ok": false
     },
     {
      "t": "Er liest die MAC-Adresse und verschlüsselt",
      "ok": false
     },
     {
      "t": "Er verwirft es immer",
      "ok": false
     }
    ],
    "e": "Der Router entscheidet anhand der Ziel-IP und seiner Routingtabelle über den nächsten Hop."
   },
   {
    "q": "Was steht in einer Routingtabelle?",
    "o": [
     { "t": "Zielnetze und der jeweils nächste Hop / Ausgangsinterface", "ok": true },
     { "t": "Die MAC-Adressen aller Geräte samt zugehörigem Switch-Port", "ok": false },
     { "t": "Die vollständige Liste aller MAC-Adressen und deren zugehörige Switch-Ports im lokalen Netzwerk", "ok": false },
     { "t": "Die Zuordnung von Domainnamen zu den passenden IP-Adressen", "ok": false }
    ],
    "e": "Eine Routingtabelle bildet Zielnetze auf den nächsten Hop bzw. das Ausgangsinterface ab."
   },
   {
    "q": "Welche Funktion hat das Default Gateway (Standard-Gateway) in einem IP-Netzwerk?",
    "o": [
     { "t": "Es ist der nächste Hop für alle Pakete, deren Zieladresse nicht im lokalen Subnetz liegt und für die kein spezifischerer Routing-Eintrag existiert", "ok": true },
     { "t": "Es fungiert als zentrale Vermittlungsstelle, die den Schicht-2-Datenverkehr innerhalb desselben LANs steuert", "ok": false },
     { "t": "Es ist die Adresse, unter der das Netz von außen erreichbar ist", "ok": false },
     { "t": "Es stellt die öffentliche IP-Adresse dar, über die ein lokales Netzwerk exklusiv aus dem Internet erreichbar ist", "ok": false }
    ],
    "e": "Das Default Gateway ist die Standard-Anlaufstelle (der nächste Router), an die ein Gerät alle Pakete schickt, deren Ziel außerhalb des eigenen Netzwerks liegt und für die es keinen genauen Weg kennt."
   },
   {
    "q": "Was ist statisches Routing?",
    "o": [
     {
      "t": "Manuell eingetragene, feste Routen",
      "ok": true
     },
     {
      "t": "Automatisch gelernte Routen",
      "ok": false
     },
     {
      "t": "Routing per Zufall",
      "ok": false
     },
     {
      "t": "Routing nur über DNS",
      "ok": false
     }
    ],
    "e": "Statische Routen werden vom Admin fest eingetragen und ändern sich nicht von selbst."
   },
   {
    "q": "Was kennzeichnet dynamisches Routing?",
    "o": [
     {
      "t": "Router tauschen Routen über Protokolle automatisch aus",
      "ok": true
     },
     {
      "t": "Routen werden manuell gepflegt",
      "ok": false
     },
     {
      "t": "Es gibt keine Routingtabelle",
      "ok": false
     },
     {
      "t": "Nur ein Router ist beteiligt",
      "ok": false
     }
    ],
    "e": "Dynamisches Routing (z. B. OSPF, RIP) lernt und aktualisiert Routen automatisch."
   },
   {
    "q": "Welcher Vorteil spricht für statisches Routing in kleinen Netzen?",
    "o": [
     {
      "t": "Einfach, vorhersehbar, ressourcenschonend",
      "ok": true
     },
     {
      "t": "Passt sich automatisch an Ausfälle an",
      "ok": false
     },
     {
      "t": "Skaliert für riesige Netze",
      "ok": false
     },
     {
      "t": "Benötigt keine Konfiguration",
      "ok": false
     }
    ],
    "e": "Statisch ist simpel und berechenbar, aber unflexibel bei Änderungen/Ausfällen."
   },
   {
    "q": "Welcher Vorteil spricht für dynamisches Routing in großen Netzen?",
    "o": [
     { "t": "Automatische Anpassung an Topologieänderungen und Ausfälle", "ok": true },
     { "t": "Geringere CPU- und Speicherlast auf den beteiligten Routern", "ok": false },
     { "t": "Vollständig vorhersehbare Pfade ohne unerwartete Umwege", "ok": false },
     { "t": "Kein zusätzlicher Protokollverkehr zwischen den Routern", "ok": false }
    ],
    "e": "Dynamisch reagiert selbstständig auf Ausfälle/neue Wege, kostet aber Ressourcen."
   },
   {
    "q": "Woran orientiert sich ein Switch beim Weiterleiten eines Frames?",
    "o": [
     {
      "t": "An der Ziel-MAC-Adresse",
      "ok": true
     },
     {
      "t": "An der Ziel-IP-Adresse",
      "ok": false
     },
     {
      "t": "An der Portnummer",
      "ok": false
     },
     {
      "t": "An der TTL",
      "ok": false
     }
    ],
    "e": "Ein Switch schaltet auf Schicht 2 anhand der Ziel-MAC."
   },
   {
    "q": "Was ist die MAC-Adresstabelle (CAM-Table) eines Switches?",
    "o": [
     {
      "t": "Zuordnung von MAC-Adressen zu Switch-Ports",
      "ok": true
     },
     {
      "t": "Liste aller IP-Adressen im Netz",
      "ok": false
     },
     {
      "t": "Tabelle der offenen Ports",
      "ok": false
     },
     {
      "t": "Routingtabelle des Switches",
      "ok": false
     }
    ],
    "e": "Der Switch merkt sich, welche MAC an welchem Port hängt (Content Addressable Memory)."
   },
   {
    "q": "Wie lernt ein Switch, welche MAC an welchem Port hängt?",
    "o": [
     {
      "t": "Er liest die Quell-MAC eingehender Frames",
      "ok": true
     },
     {
      "t": "Er fragt den Router",
      "ok": false
     },
     {
      "t": "Er nutzt DNS",
      "ok": false
     },
     {
      "t": "Er bekommt sie per DHCP",
      "ok": false
     }
    ],
    "e": "Beim Empfang merkt sich der Switch die Quell-MAC und den zugehörigen Eingangsport."
   },
   {
    "q": "Was macht ein Switch mit einem Frame, dessen Ziel-MAC er nicht kennt?",
    "o": [
     { "t": "Flooding: er sendet es an alle Ports außer dem Eingangsport", "ok": true },
     { "t": "Er fragt per ARP-Broadcast nach dem Besitzer der Ziel-MAC", "ok": false },
     { "t": "Er verwirft es und meldet dem Absender die Unzustellbarkeit", "ok": false },
     { "t": "Er reicht es an das Default Gateway zur Weiterleitung durch", "ok": false }
    ],
    "e": "Unbekanntes Ziel → Flooding an alle Ports (außer Quellport), bis die MAC gelernt ist."
   },
   {
    "q": "Was macht ein Switch mit einem Broadcast-Frame (Ziel-MAC FF:FF:FF:FF:FF:FF)?",
    "o": [
     { "t": "Er leitet ihn an alle Ports außer dem Eingangsport weiter", "ok": true },
     { "t": "Er beantwortet ihn stellvertretend für alle angeschlossenen Geräte", "ok": false },
     { "t": "Er reicht ihn an den Router weiter, der ihn ins nächste Netz trägt", "ok": false },
     { "t": "Er leitet ihn nur an Ports mit aktuell aktiven Endgeräten weiter", "ok": false }
    ],
    "e": "Broadcasts werden vom Switch an alle Ports der Broadcastdomäne geflutet."
   },
   {
    "q": "Warum leitet ein Router Broadcasts standardmäßig nicht weiter?",
    "o": [
     {
      "t": "Er begrenzt die Broadcastdomäne (Schicht 3)",
      "ok": true
     },
     {
      "t": "Er kann grundsätzlich keine Frames lesen (Schicht 1)",
      "ok": false
     },
     {
      "t": "Broadcasts sind verschlüsselt und nicht lesbar",
      "ok": false
     },
     {
      "t": "Ein Router besitzt keine eigenen Ports",
      "ok": false
     }
    ],
    "e": "Der Router trennt Broadcastdomänen — Broadcasts bleiben lokal."
   },
   {
    "q": "Was ist der Unterschied zwischen Routing und Switching?",
    "o": [
     {
      "t": "Routing verbindet Netze (L3/IP), Switching arbeitet im Netz (L2/MAC)",
      "ok": true
     },
     {
      "t": "Beide arbeiten ausschließlich mit IP-Adressen (L3)",
      "ok": false
     },
     {
      "t": "Switching verbindet Netze, Routing arbeitet nur lokal",
      "ok": false
     },
     {
      "t": "Zwischen beiden besteht technisch kein Unterschied",
      "ok": false
     }
    ],
    "e": "Switch = innerhalb eines Netzes per MAC; Router = zwischen Netzen per IP."
   },
   {
    "q": "Was bezeichnet der 'nächste Hop' (Next Hop)?",
    "o": [
     {
      "t": "Der nächste Router auf dem Weg zum Ziel",
      "ok": true
     },
     {
      "t": "Das Endziel des Pakets",
      "ok": false
     },
     {
      "t": "Der Absender",
      "ok": false
     },
     {
      "t": "Der langsamste Router",
      "ok": false
     }
    ],
    "e": "Der Next Hop ist die unmittelbar nächste Station Richtung Zielnetz."
   },
   {
    "q": "Was passiert, wenn kein passender Eintrag in der Routingtabelle existiert?",
    "o": [
     {
      "t": "Das Paket geht an die Default-Route, sonst wird es verworfen",
      "ok": true
     },
     {
      "t": "Das Paket wird an alle bekannten Netze gesendet",
      "ok": false
     },
     {
      "t": "Der Router speichert das Paket dauerhaft zwischen",
      "ok": false
     },
     {
      "t": "Die TTL des Pakets wird automatisch verdoppelt",
      "ok": false
     }
    ],
    "e": "Ohne spezifische Route greift die Default-Route; fehlt auch die, wird verworfen."
   },
   {
    "q": "Welches Gerät trennt Kollisionsdomänen pro Port?",
    "o": [
     {
      "t": "Switch",
      "ok": true
     },
     {
      "t": "Hub",
      "ok": false
     },
     {
      "t": "Repeater",
      "ok": false
     },
     {
      "t": "Medienkonverter",
      "ok": false
     }
    ],
    "e": "Jeder Switch-Port ist eine eigene Kollisionsdomäne; ein Hub bildet nur eine."
   },
   {
    "q": "Was ist ein Layer-3-Switch?",
    "o": [
     {
      "t": "Ein Switch, der zusätzlich IP-basiert routen kann",
      "ok": true
     },
     {
      "t": "Ein Switch ohne MAC-Tabelle",
      "ok": false
     },
     {
      "t": "Ein reiner Repeater",
      "ok": false
     },
     {
      "t": "Ein Router ohne Ports",
      "ok": false
     }
    ],
    "e": "Ein Layer-3-Switch kombiniert schnelles Switching (L2) mit Routing-Funktionen (L3)."
   },
   {
    "q": "Wozu dient ein Routing-Metrik-Wert?",
    "o": [
     {
      "t": "Zur Auswahl der besten Route bei mehreren Wegen",
      "ok": true
     },
     {
      "t": "Zur Verschlüsselung",
      "ok": false
     },
     {
      "t": "Zur MAC-Zuordnung",
      "ok": false
     },
     {
      "t": "Er legt die maximale Anzahl an erlaubten Geräte-Anschlüssen innerhalb eines Subnetzes fest",
      "ok": false
     }
    ],
    "e": "Die Metrik (z. B. Hops, Bandbreite) bewertet Routen; die beste wird gewählt."
   },
   {
    "q": "Was beschreibt die Aufgabe eines Gateways allgemein?",
    "o": [
     {
      "t": "Übergangspunkt zwischen verschiedenen Netzen",
      "ok": true
     },
     {
      "t": "Ein reines Kabel",
      "ok": false
     },
     {
      "t": "Ein WLAN-Passwort",
      "ok": false
     },
     {
      "t": "Ein Verschlüsselungsschlüssel",
      "ok": false
     }
    ],
    "e": "Ein Gateway koppelt Netze; im Heimnetz ist das typischerweise der Router."
   },
   {
    "q": "Ein PC will ein Gerät im selben Subnetz erreichen. Was passiert?",
    "o": [
     {
      "t": "Direkte Zustellung per MAC über den Switch, kein Router nötig",
      "ok": true
     },
     {
      "t": "Das Paket geht zwingend über das Gateway",
      "ok": false
     },
     {
      "t": "Es wird per DNS aufgelöst",
      "ok": false
     },
     {
      "t": "Der Router verschlüsselt es",
      "ok": false
     }
    ],
    "e": "Im selben Subnetz erfolgt die Zustellung direkt per MAC über den Switch."
   },
   {
    "q": "Ein PC will ein Gerät in einem anderen Netz erreichen. Was passiert?",
    "o": [
     {
      "t": "Das Paket geht an das Default Gateway zum Weiterrouten",
      "ok": true
     },
     {
      "t": "Der Switch routet es direkt",
      "ok": false
     },
     {
      "t": "Es wird lokal per Broadcast zugestellt",
      "ok": false
     },
     {
      "t": "Der PC fordert beim DNS-Server die MAC-Adresse des entfernten Zielnetzwerks an",
      "ok": false
     }
    ],
    "e": "Fremdes Netz → ans Default Gateway, das dann weiterroutet."
   },
   {
    "q": "Was ist eine Default-Route?",
    "o": [
     {
      "t": "Eine Route für alle Ziele ohne spezifischeren Eintrag (0.0.0.0/0)",
      "ok": true
     },
     {
      "t": "Die Route mit der geringsten Latenz zum Ziel",
      "ok": false
     },
     {
      "t": "Eine feste Route ausschließlich für das lokale Netz",
      "ok": false
     },
     {
      "t": "Eine verschlüsselte Route über einen VPN-Tunnel",
      "ok": false
     }
    ],
    "e": "0.0.0.0/0 ist die Default-Route — der 'Auffangbehälter' für alle unbekannten Ziele."
   },
   {
    "q": "Welches Gerät lernt MAC-Adressen durch Beobachtung?",
    "o": [
     {
      "t": "Switch",
      "ok": true
     },
     {
      "t": "Router",
      "ok": false
     },
     {
      "t": "Hub",
      "ok": false
     },
     {
      "t": "Repeater",
      "ok": false
     }
    ],
    "e": "Der Switch liest eingehende Quell-MACs und trägt sie in seine CAM-Table ein."
   },
   {
    "q": "Was passiert bei einem Switch mit einem Frame, dessen Ziel-MAC bekannt ist?",
    "o": [
     { "t": "Er leitet ihn gezielt nur an den bekannten Port weiter", "ok": true },
     { "t": "Er flutet ihn zur Sicherheit dennoch an alle aktiven Ports", "ok": false },
     { "t": "Er prüft zuerst per Ping, ob das Zielgerät erreichbar ist", "ok": false },
     { "t": "Er sendet ihn an den Zielport und zusätzlich ans Gateway", "ok": false }
    ],
    "e": "Bekannte Ziel-MAC = gezielte Weiterleitung. Unbekannt = Flooding an alle außer dem Eingangsport."
   },
   {
    "q": "Welches Protokoll verteilt Routinginformationen automatisch zwischen Routern?",
    "o": [
     {
      "t": "OSPF oder RIP",
      "ok": true
     },
     {
      "t": "ARP",
      "ok": false
     },
     {
      "t": "ICMP",
      "ok": false
     },
     {
      "t": "DNS",
      "ok": false
     }
    ],
    "e": "OSPF und RIP sind dynamische Routingprotokolle, die Routen automatisch austauschen und lernen."
   },
   {
    "q": "Was beschreibt 'Longest Prefix Match' beim Routing?",
    "o": [
     {
      "t": "Der spezifischste (längste) passende Eintrag wird verwendet",
      "ok": true
     },
     {
      "t": "Die Route mit dem kürzesten Präfix wird bevorzugt",
      "ok": false
     },
     {
      "t": "Der zuerst eingetragene Eintrag gewinnt immer",
      "ok": false
     },
     {
      "t": "Es wird grundsätzlich die Default-Route genutzt",
      "ok": false
     }
    ],
    "e": "Passt /24 und /28 — nimmt der Router /28, weil spezifischer. Das ist Longest Prefix Match."
   },
   {
    "q": "Wozu dient das Default Gateway am Client?",
    "o": [
     { "t": "Als Übergangspunkt für Pakete an Ziele außerhalb des eigenen Subnetzes", "ok": true },
     { "t": "Als erste Anlaufstelle für die Auflösung unbekannter Hostnamen", "ok": false },
     { "t": "Als Vermittler, der dem Client seine IP-Konfiguration zuweist", "ok": false },
     { "t": "Als Prüfinstanz, die ausgehende Verbindungen freigeben muss", "ok": false }
    ],
    "e": "Ohne Default Gateway kann der Client nur im eigenen Subnetz kommunizieren."
   },
   {
    "q": "Was ist der Unterschied zwischen einem L2- und einem L3-Switch?",
    "o": [
     { "t": "L3-Switch kann zusätzlich IP-basiert zwischen Subnetzen routen", "ok": true },
     { "t": "L3-Switch ersetzt die MAC-Tabelle vollständig durch die Routingtabelle", "ok": false },
     { "t": "L2-Switch verbindet Endgeräte, L3-Switch ausschließlich andere Switches", "ok": false },
     { "t": "L2-Switch arbeitet nur mit IPv4, L3-Switch zusätzlich mit IPv6", "ok": false }
    ],
    "e": "Ein L3-Switch kombiniert MAC-Switching (L2) mit IP-Routing (L3) in einem Gerät."
   },
   {
    "q": "Was ist VLAN und welchen Vorteil hat es?",
    "o": [
     {
      "t": "Logische Netztrennung auf einem Switch, trennt Broadcastdomänen",
      "ok": true
     },
     {
      "t": "Ein Verfahren zur Verschlüsselung des Datenverkehrs",
      "ok": false
     },
     {
      "t": "Ein dynamisches Routingprotokoll für große Netze",
      "ok": false
     },
     {
      "t": "Eine besondere Art der physischen Verkabelung",
      "ok": false
     }
    ],
    "e": "VLANs trennen Geräte logisch, obwohl sie am selben physischen Switch hängen."
   },
   {
    "q": "Wie kommunizieren zwei VLANs miteinander?",
    "o": [
     {
      "t": "Über einen Router oder L3-Switch (Inter-VLAN-Routing)",
      "ok": true
     },
     {
      "t": "Durch Konfiguration desselben IP-Subnetzes in beiden VLANs",
      "ok": false
     },
     {
      "t": "Ausschließlich per Broadcast an alle Ports",
      "ok": false
     },
     {
      "t": "Eine Kommunikation ist grundsätzlich nicht möglich (Firewall blockiert)",
      "ok": false
     }
    ],
    "e": "VLANs sind isolierte Broadcastdomänen — für Kommunikation zwischen ihnen ist L3-Routing nötig."
   },
   {
    "q": "Was ist ein Trunk-Port an einem Switch?",
    "o": [
     {
      "t": "Ein Port, der Frames mehrerer VLANs trägt (tagged)",
      "ok": true
     },
     {
      "t": "Ein Port nur für einen einzelnen VLAN (untagged)",
      "ok": false
     },
     {
      "t": "Ein redundanter Uplink",
      "ok": false
     },
     {
      "t": "Ein Diagnose-Port",
      "ok": false
     }
    ],
    "e": "Trunk-Ports verbinden Switches oder Router und tragen mehrere VLANs per 802.1Q-Tag."
   },
   {
    "q": "Was ist IEEE 802.1Q?",
    "o": [
     {
      "t": "Der Standard für VLAN-Tagging in Ethernet-Frames",
      "ok": true
     },
     {
      "t": "Der zentrale Standard für WLAN nach IEEE",
      "ok": false
     },
     {
      "t": "Ein dynamisches Routingprotokoll für IP-Netze",
      "ok": false
     },
     {
      "t": "Ein Verfahren zur Verschlüsselung von Frames",
      "ok": false
     }
    ],
    "e": "802.1Q fügt einen 4-Byte-Tag in den Ethernet-Frame ein, der die VLAN-ID trägt."
   },
   {
    "q": "Welcher Eintrag hat in der Routingtabelle die höchste Priorität?",
    "o": [
     {
      "t": "Die spezifischste Route (Longest Prefix Match)",
      "ok": true
     },
     {
      "t": "Die Default-Route als allgemeinster Eintrag",
      "ok": false
     },
     {
      "t": "Die zuerst in die Tabelle eingetragene Route",
      "ok": false
     },
     {
      "t": "Die Route mit der höchsten AD (Höchster Vertrauenswert des Protokolls)",
      "ok": false
     }
    ],
    "e": "Je spezifischer der Netzpräfix, desto höher die Priorität — /28 schlägt /24 schlägt /0."
   },
   {
    "q": "Welche Technik verhindert Switching-Loops in redundanten Netzen?",
    "o": [
     {
      "t": "STP (Spanning Tree Protocol)",
      "ok": true
     },
     {
      "t": "VLAN (Virtual Local Area Network)",
      "ok": false
     },
     {
      "t": "OSPF (Open Shortest Path First)",
      "ok": false
     },
     {
      "t": "NAT (Network Address Translation)",
      "ok": false
     }
    ],
    "e": "STP deaktiviert redundante Links und aktiviert sie nur bei Ausfall, um Loops zu verhindern."
   }
  ]
 },
 "ip": {
  "name": "IPv4 & IPv6 (Auffrischung)",
  "q": [
   {
    "q": "Wie viele Bit hat eine IPv4-Adresse?",
    "o": [
     {
      "t": "32 Bit",
      "ok": true
     },
     {
      "t": "64 Bit",
      "ok": false
     },
     {
      "t": "128 Bit",
      "ok": false
     },
     {
      "t": "16 Bit",
      "ok": false
     }
    ],
    "e": "IPv4 = 32 Bit, meist als 4 Oktette dezimal geschrieben."
   },
   {
    "q": "Wie viele Bit hat eine IPv6-Adresse?",
    "o": [
     {
      "t": "128 Bit",
      "ok": true
     },
     {
      "t": "32 Bit",
      "ok": false
     },
     {
      "t": "64 Bit",
      "ok": false
     },
     {
      "t": "256 Bit",
      "ok": false
     }
    ],
    "e": "IPv6 = 128 Bit → gewaltig größerer Adressraum."
   },
   {
    "q": "Wie wird eine IPv4-Adresse üblicherweise dargestellt?",
    "o": [
     {
      "t": "Vier Dezimalzahlen, durch Punkte getrennt",
      "ok": true
     },
     {
      "t": "Acht Hex-Blöcke mit Doppelpunkten",
      "ok": false
     },
     {
      "t": "Als 32 Buchstaben",
      "ok": false
     },
     {
      "t": "Als MAC-Adresse",
      "ok": false
     }
    ],
    "e": "Das Format nennt sich Dotted Decimal Notation (punktierte Dezimalschreibweise), wie zum Beispiel bei 192.168.0.1."
   },
   {
    "q": "Wie wird eine IPv6-Adresse dargestellt?",
    "o": [
     {
      "t": "Acht Blöcke à 16 Bit in Hex, durch Doppelpunkte getrennt",
      "ok": true
     },
     {
      "t": "Vier Dezimalzahlen, jeweils durch Punkte getrennt",
      "ok": false
     },
     {
      "t": "Sechs Hexadezimal-Paare, durch Bindestriche getrennt",
      "ok": false
     },
     {
      "t": "Eine einzelne fortlaufende Binärzahl ohne Trenner",
      "ok": false
     }
    ],
    "e": "z. B. 2001:0db8:85a3:0000:0000:8a2e:0370:7334."
   },
   {
    "q": "Welchen maximalen Wert kann ein IPv4-Oktett haben?",
    "o": [
     {
      "t": "255",
      "ok": true
     },
     {
      "t": "256",
      "ok": false
     },
     {
      "t": "254",
      "ok": false
     },
     {
      "t": "128",
      "ok": false
     }
    ],
    "e": "Ein Oktett = 8 Bit → 0 bis 255."
   },
   {
    "q": "Was ist der Hauptgrund für die Einführung von IPv6?",
    "o": [
     {
      "t": "Adressknappheit von IPv4",
      "ok": true
     },
     {
      "t": "IPv4 ist zu schnell",
      "ok": false
     },
     {
      "t": "IPv6 braucht keine Router",
      "ok": false
     },
     {
      "t": "IPv4 kennt keine Ports",
      "ok": false
     }
    ],
    "e": "Die ~4,3 Mrd. IPv4-Adressen reichen nicht mehr aus."
   },
   {
    "q": "Welche IPv4-Adresse ist eine private Adresse?",
    "o": [
     {
      "t": "192.168.1.10",
      "ok": true
     },
     {
      "t": "8.8.8.8",
      "ok": false
     },
     {
      "t": "172.15.0.1",
      "ok": false
     },
     {
      "t": "200.10.10.10",
      "ok": false
     }
    ],
    "e": "Privat: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16."
   },
   {
    "q": "Wie viele Oktette hat eine IPv4-Adresse?",
    "o": [
     {
      "t": "4",
      "ok": true
     },
     {
      "t": "6",
      "ok": false
     },
     {
      "t": "8",
      "ok": false
     },
     {
      "t": "2",
      "ok": false
     }
    ],
    "e": "IPv4 = 4 Oktette à 8 Bit = 32 Bit."
   },
   {
    "q": "Was trennt bei IPv6 aufeinanderfolgende Nullblöcke abkürzend?",
    "o": [
     {
      "t": "Ein doppelter Doppelpunkt (::)",
      "ok": true
     },
     {
      "t": "Ein einfacher Punkt (.)",
      "ok": false
     },
     {
      "t": "Ein Bindestrich (-)",
      "ok": false
     },
     {
      "t": "Ein Schrägstrich (/)",
      "ok": false
     }
    ],
    "e": ":: ersetzt einmalig eine Folge von Null-Blöcken."
   },
   {
    "q": "Wie viele Adressen bietet IPv4 theoretisch ungefähr?",
    "o": [
     {
      "t": "Rund 4,3 Milliarden (2³²)",
      "ok": true
     },
     {
      "t": "Rund 4 Millionen (2²²)",
      "ok": false
     },
     {
      "t": "Praktisch unendlich viele (2⁶⁴)",
      "ok": false
     },
     {
      "t": "Genau 1 Million (10⁶)",
      "ok": false
     }
    ],
    "e": "2³² ≈ 4,29 Mrd. Adressen."
   },
   {
    "q": "Welche IPv4-Adresse ist die Loopback-Adresse?",
    "o": [
     {
      "t": "127.0.0.1",
      "ok": true
     },
     {
      "t": "192.168.0.1",
      "ok": false
     },
     {
      "t": "255.255.255.255",
      "ok": false
     },
     {
      "t": "0.0.0.0",
      "ok": false
     }
    ],
    "e": "127.0.0.1 = localhost (Loopback). In IPv6: ::1."
   },
   {
    "q": "Welche Subnetzmaske entspricht /24?",
    "o": [
     {
      "t": "255.255.255.0",
      "ok": true
     },
     {
      "t": "255.255.0.0",
      "ok": false
     },
     {
      "t": "255.0.0.0",
      "ok": false
     },
     {
      "t": "255.255.255.255",
      "ok": false
     }
    ],
    "e": "/24 → 24 Einsen → 255.255.255.0."
   },
   {
    "q": "Wie lautet die IPv6-Loopback-Adresse?",
    "o": [
     {
      "t": "::1",
      "ok": true
     },
     {
      "t": "127.0.0.1",
      "ok": false
     },
     {
      "t": "::0",
      "ok": false
     },
     {
      "t": "fe80::1",
      "ok": false
     }
    ],
    "e": "In IPv6 ist ::1 die Loopback-Adresse."
   },
   {
    "q": "Welches Protokoll ersetzt in IPv6 weitgehend das ARP von IPv4?",
    "o": [
     {
      "t": "NDP (Neighbor Discovery Protocol) via ICMPv6",
      "ok": true
     },
     {
      "t": "DHCP (Dynamic Host Configuration Protocol)",
      "ok": false
     },
     {
      "t": "DNS (Domain Name System)",
      "ok": false
     },
     {
      "t": "RARP (Reverse Address Resolution Protocol)",
      "ok": false
     }
    ],
    "e": "IPv6 nutzt NDP (ICMPv6) statt ARP zur Adressauflösung im lokalen Netz."
   },
   {
    "q": "Wie viele Hosts sind in einem /24-Netz nutzbar?",
    "o": [
     {
      "t": "254 (minus Netz- und Broadcastadresse)",
      "ok": true
     },
     {
      "t": "256 (alle Adressen des Bereichs)",
      "ok": false
     },
     {
      "t": "255 (ohne die Netzadresse)",
      "ok": false
     },
     {
      "t": "128 (nur die halbe Range)",
      "ok": false
     }
    ],
    "e": "2⁸ = 256, abzüglich Netz- und Broadcastadresse = 254 nutzbare Hosts."
   },
   {
    "q": "Welcher IPv4-Bereich ist für 'localhost' reserviert?",
    "o": [
     {
      "t": "127.0.0.0/8",
      "ok": true
     },
     {
      "t": "192.168.0.0/16",
      "ok": false
     },
     {
      "t": "10.0.0.0/8",
      "ok": false
     },
     {
      "t": "169.254.0.0/16",
      "ok": false
     }
    ],
    "e": "Der gesamte 127.0.0.0/8-Bereich ist Loopback."
   },
   {
    "q": "Welche Aussage zu IPv6 stimmt?",
    "o": [
     {
      "t": "Der Adressraum ist praktisch unerschöpflich",
      "ok": true
     },
     {
      "t": "Der Adressraum ist kleiner als bei IPv4",
      "ok": false
     },
     {
      "t": "Adressen bestehen nur aus Dezimalzahlen",
      "ok": false
     },
     {
      "t": "Es existiert keine Loopback-Adresse",
      "ok": false
     }
    ],
    "e": "2¹²⁸ Adressen sind für absehbare Zeit mehr als genug."
   },
   {
    "q": "Was ist 169.254.x.x für eine Adresse?",
    "o": [
     {
      "t": "APIPA/Link-Local (automatisch bei fehlendem DHCP)",
      "ok": true
     },
     {
      "t": "Eine öffentlich routbare Internetadresse",
      "ok": false
     },
     {
      "t": "Die Broadcastadresse des lokalen Netzes",
      "ok": false
     },
     {
      "t": "Eine gekürzte IPv6-Adresse (Link-Local)",
      "ok": false
     }
    ],
    "e": "169.254.0.0/16 = APIPA, wenn kein DHCP-Server erreichbar ist."
   },
   {
    "q": "Welche Darstellung ist eine gültige gekürzte IPv6-Adresse?",
    "o": [
     {
      "t": "2001:db8::1",
      "ok": true
     },
     {
      "t": "2001.db8.0.1",
      "ok": false
     },
     {
      "t": "2001::db8::1",
      "ok": false
     },
     {
      "t": "192:168::1:1:1:1:1:1",
      "ok": false
     }
    ],
    "e": ":: darf nur einmal vorkommen; 2001:db8::1 ist korrekt gekürzt."
   },
   {
    "q": "Was gibt die CIDR-Notation wie /26 an?",
    "o": [
     {
      "t": "Die Anzahl der Bits, die zum Netzanteil gehören",
      "ok": true
     },
     {
      "t": "Die Anzahl der nutzbaren Hosts im Netz",
      "ok": false
     },
     {
      "t": "Die maximale TTL der Pakete im Netz",
      "ok": false
     },
     {
      "t": "Die Anzahl der Router auf dem Weg",
      "ok": false
     }
    ],
    "e": "Die Präfixlänge (z. B. /26) zählt die 1-Bits der Maske = Netzanteil."
   },
   {
    "q": "Wie erhält man die Netzadresse aus IP und Subnetzmaske?",
    "o": [
     {
      "t": "Durch bitweise UND-Verknüpfung (AND)",
      "ok": true
     },
     {
      "t": "Durch bitweise ODER-Verknüpfung (OR)",
      "ok": false
     },
     {
      "t": "Durch Addition der beiden Werte",
      "ok": false
     },
     {
      "t": "Durch bitweise XOR-Verknüpfung (XOR)",
      "ok": false
     }
    ],
    "e": "IP AND Subnetzmaske ergibt die Netzadresse."
   },
   {
    "q": "Was kennzeichnet die Broadcastadresse eines Subnetzes?",
    "o": [
     {
      "t": "Alle Hostbits sind auf 1 gesetzt",
      "ok": true
     },
     {
      "t": "Alle Hostbits sind auf 0 gesetzt",
      "ok": false
     },
     {
      "t": "Sie ist immer 255.255.255.255",
      "ok": false
     },
     {
      "t": "Sie ist identisch mit der Netzadresse",
      "ok": false
     }
    ],
    "e": "Netzadresse = Hostbits alle 0; Broadcastadresse = Hostbits alle 1."
   },
   {
    "q": "Warum sind pro Subnetz zwei Adressen nicht als Host nutzbar?",
    "o": [
     {
      "t": "Netz- und Broadcastadresse sind reserviert",
      "ok": true
     },
     {
      "t": "Sie gehören dem Router",
      "ok": false
     },
     {
      "t": "Sie sind für DNS reserviert",
      "ok": false
     },
     {
      "t": "Sie werden verschlüsselt",
      "ok": false
     }
    ],
    "e": "Die erste (Netz-) und letzte (Broadcast-)Adresse sind belegt → nutzbare Hosts = 2^Hostbits − 2."
   },
   {
    "q": "Welche Maske gehört zu /26?",
    "o": [
     {
      "t": "255.255.255.192",
      "ok": true
     },
     {
      "t": "255.255.255.0",
      "ok": false
     },
     {
      "t": "255.255.255.224",
      "ok": false
     },
     {
      "t": "255.255.255.128",
      "ok": false
     }
    ],
    "e": "/26 = 26 Einsen → letztes Oktett 11000000 = 192."
   },
   {
    "q": "Was leistet SLAAC bei IPv6?",
    "o": [
     { "t": "Zustandslose automatische Adresskonfiguration ohne Server", "ok": true },
     { "t": "Zentrale Adressvergabe mit Lease-Verwaltung über einen Server", "ok": false },
     { "t": "Automatische Übersetzung zwischen IPv4- und IPv6-Adressen", "ok": false },
     { "t": "Verteilte Namensauflösung ohne zentrale DNS-Server", "ok": false }
    ],
    "e": "SLAAC (Stateless Address Autoconfiguration) erlaubt IPv6-Geräten, sich selbst eine Adresse zu bilden."
   },
   {
    "q": "Wie bildet ein Gerät bei SLAAC seine IPv6-Adresse?",
    "o": [
     {
      "t": "Aus dem vom Router angekündigten Präfix plus eigenem Interface-Teil",
      "ok": true
     },
     {
      "t": "Vollständig vom DHCP-Server zugewiesen bekommen",
      "ok": false
     },
     {
      "t": "Durch zufälliges Raten einer freien Adresse",
      "ok": false
     },
     {
      "t": "Durch eine ARP-Anfrage an das Gateway",
      "ok": false
     }
    ],
    "e": "Das Router-Advertisement liefert das Präfix; den hinteren Teil bildet das Gerät selbst."
   },
   {
    "q": "Wofür steht DHCPv6?",
    "o": [
     {
      "t": "Die DHCP-Variante zur Konfiguration von IPv6-Parametern",
      "ok": true
     },
     {
      "t": "Ein Routingprotokoll für IPv6-Netze",
      "ok": false
     },
     {
      "t": "Ein Verschlüsselungsverfahren für IPv6",
      "ok": false
     },
     {
      "t": "Eine spezielle Firewallregel für IPv6",
      "ok": false
     }
    ],
    "e": "DHCPv6 vergibt bzw. ergänzt IPv6-Konfiguration (zustandsbehaftet oder -los)."
   },
   {
    "q": "Was ist der Kernunterschied zwischen SLAAC und DHCPv6?",
    "o": [
     {
      "t": "SLAAC ist zustandslos, DHCPv6 kann zustandsbehaftet vergeben",
      "ok": true
     },
     {
      "t": "SLAAC benötigt zwingend immer einen Server",
      "ok": false
     },
     {
      "t": "DHCPv6 funktioniert ausschließlich mit IPv4",
      "ok": false
     },
     {
      "t": "Zwischen beiden besteht kein Unterschied",
      "ok": false
     }
    ],
    "e": "SLAAC konfiguriert ohne Server; DHCPv6 kann wie DHCPv4 zentral Adressen führen."
   },
   {
    "q": "Welche Rolle spielt das Router-Advertisement (RA) bei IPv6?",
    "o": [
     {
      "t": "Der Router kündigt Präfix und Parameter zur Autokonfiguration an",
      "ok": true
     },
     {
      "t": "Es vergibt physische MAC-Adressen an Geräte",
      "ok": false
     },
     {
      "t": "Es verschlüsselt den gesamten Netzverkehr",
      "ok": false
     },
     {
      "t": "Es löst Domainnamen in Adressen auf",
      "ok": false
     }
    ],
    "e": "RAs informieren Geräte über Präfix, Gateway und ob SLAAC/DHCPv6 genutzt werden soll."
   },
   {
    "q": "Wie viele nutzbare Hosts gibt es in einem /27-Netz?",
    "o": [
     {
      "t": "30",
      "ok": true
     },
     {
      "t": "32",
      "ok": false
     },
     {
      "t": "28",
      "ok": false
     },
     {
      "t": "62",
      "ok": false
     }
    ],
    "e": "/27 = 5 Hostbits → 2^5=32 Adressen − 2 (Netz und Broadcast) = 30 nutzbare Hosts."
   },
   {
    "q": "Wie viele nutzbare Hosts gibt es in einem /29-Netz?",
    "o": [
     {
      "t": "6",
      "ok": true
     },
     {
      "t": "8",
      "ok": false
     },
     {
      "t": "14",
      "ok": false
     },
     {
      "t": "4",
      "ok": false
     }
    ],
    "e": "/29 = 3 Hostbits → 2^3=8 − 2 = 6 nutzbare Hosts."
   },
   {
    "q": "Welche Subnetzmaske entspricht /28?",
    "o": [
     {
      "t": "255.255.255.240",
      "ok": true
     },
     {
      "t": "255.255.255.224",
      "ok": false
     },
     {
      "t": "255.255.255.248",
      "ok": false
     },
     {
      "t": "255.255.255.192",
      "ok": false
     }
    ],
    "e": "/28 = 28 Einsen → letztes Oktett: 11110000 = 240. Also 255.255.255.240."
   },
   {
    "q": "Welche Subnetzmaske entspricht /25?",
    "o": [
     {
      "t": "255.255.255.128",
      "ok": true
     },
     {
      "t": "255.255.255.192",
      "ok": false
     },
     {
      "t": "255.255.255.0",
      "ok": false
     },
     {
      "t": "255.255.254.0",
      "ok": false
     }
    ],
    "e": "/25 = 25 Einsen → letztes Oktett: 10000000 = 128."
   },
   {
    "q": "Was ist die Broadcastadresse von 192.168.1.0/25?",
    "o": [
     {
      "t": "192.168.1.127",
      "ok": true
     },
     {
      "t": "192.168.1.255",
      "ok": false
     },
     {
      "t": "192.168.1.128",
      "ok": false
     },
     {
      "t": "192.168.1.126",
      "ok": false
     }
    ],
    "e": "/25 = 128 Adressen (0–127). Letzter Wert = Broadcast: 192.168.1.127."
   },
   {
    "q": "Was ist die Netzadresse von 192.168.10.200/26?",
    "o": [
     {
      "t": "192.168.10.192",
      "ok": true
     },
     {
      "t": "192.168.10.0",
      "ok": false
     },
     {
      "t": "192.168.10.128",
      "ok": false
     },
     {
      "t": "192.168.10.255",
      "ok": false
     }
    ],
    "e": "/26 = Blöcke à 64 (0,64,128,192). 200 liegt im Block ab 192 → Netzadresse 192.168.10.192."
   },
   {
    "q": "Welche IP-Adresse liegt NICHT im Netz 10.0.0.0/24?",
    "o": [
     {
      "t": "10.0.1.1",
      "ok": true
     },
     {
      "t": "10.0.0.1",
      "ok": false
     },
     {
      "t": "10.0.0.254",
      "ok": false
     },
     {
      "t": "10.0.0.128",
      "ok": false
     }
    ],
    "e": "/24 = 10.0.0.0–10.0.0.255. 10.0.1.1 liegt im nächsten Subnetz."
   },
   {
    "q": "Wie lautet die Formel für die Anzahl nutzbarer Hosts pro Subnetz?",
    "o": [
     {
      "t": "2^Hostbits − 2",
      "ok": true
     },
     {
      "t": "2^Hostbits",
      "ok": false
     },
     {
      "t": "2^Netzbits − 2",
      "ok": false
     },
     {
      "t": "Netzbits × 2",
      "ok": false
     }
    ],
    "e": "Netz- und Broadcastadresse sind reserviert, daher −2 von den möglichen Adressen."
   },
   {
    "q": "Welcher private IPv4-Bereich beginnt mit 172?",
    "o": [
     {
      "t": "172.16.0.0/12",
      "ok": true
     },
     {
      "t": "172.0.0.0/8",
      "ok": false
     },
     {
      "t": "172.168.0.0/16",
      "ok": false
     },
     {
      "t": "172.16.0.0/16",
      "ok": false
     }
    ],
    "e": "Private Bereiche: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16."
   },
   {
    "q": "Was ergibt IP 192.168.5.77 AND Maske 255.255.255.0?",
    "o": [
     {
      "t": "192.168.5.0",
      "ok": true
     },
     {
      "t": "192.168.5.77",
      "ok": false
     },
     {
      "t": "0.0.0.77",
      "ok": false
     },
     {
      "t": "255.255.255.0",
      "ok": false
     }
    ],
    "e": "AND mit 255 = Wert bleibt; AND mit 0 = Ergebnis 0. Letztes Oktett: 77 AND 0 = 0."
   },
   {
    "q": "Wie viele Subnetze entstehen, wenn /24 in /26 aufgeteilt wird?",
    "o": [
     {
      "t": "4",
      "ok": true
     },
     {
      "t": "2",
      "ok": false
     },
     {
      "t": "8",
      "ok": false
     },
     {
      "t": "16",
      "ok": false
     }
    ],
    "e": "/26 statt /24 = 2 zusätzliche Netzbits → 2^2 = 4 Subnetze."
   },
   {
    "q": "Was ist die Loopback-Adresse in IPv4?",
    "o": [
     {
      "t": "127.0.0.1",
      "ok": true
     },
     {
      "t": "192.168.0.1",
      "ok": false
     },
     {
      "t": "0.0.0.0",
      "ok": false
     },
     {
      "t": "255.255.255.255",
      "ok": false
     }
    ],
    "e": "127.0.0.1 = localhost; Pakete an diese Adresse verlassen nie die Netzwerkkarte."
   },
   {
    "q": "Welche Adresse erreicht alle Hosts im lokalen Netz (begrenzt Broadcast)?",
    "o": [
     {
      "t": "255.255.255.255",
      "ok": true
     },
     {
      "t": "0.0.0.0",
      "ok": false
     },
     {
      "t": "127.0.0.1",
      "ok": false
     },
     {
      "t": "192.168.255.255",
      "ok": false
     }
    ],
    "e": "255.255.255.255 = Limited Broadcast, erreicht alle Hosts im direkten Subnetz."
   },
   {
    "q": "Was bedeutet /30 in der Praxis?",
    "o": [
     {
      "t": "2 nutzbare Hosts — typisch für Punkt-zu-Punkt-Links",
      "ok": true
     },
     {
      "t": "30 nutzbare Hosts für kleine Abteilungen",
      "ok": false
     },
     {
      "t": "254 nutzbare Hosts wie bei einem /24",
      "ok": false
     },
     {
      "t": "Kein einziger nutzbarer Host möglich",
      "ok": false
     }
    ],
    "e": "/30 = 2 Hostbits → 4 Adressen − 2 = 2 Hosts. Ideal für Router-zu-Router-Links."
   },
   {
    "q": "Was gibt die Präfixlänge in CIDR an?",
    "o": [
     {
      "t": "Die Anzahl der Einsen in der Subnetzmaske (Netzanteil)",
      "ok": true
     },
     {
      "t": "Die Anzahl der nutzbaren Hosts im Netz",
      "ok": false
     },
     {
      "t": "Die Anzahl der möglichen Subnetze",
      "ok": false
     },
     {
      "t": "Die Time-to-Live der Pakete (TTL)",
      "ok": false
     }
    ],
    "e": "CIDR-Notation /n = n Bits für den Netzanteil, Rest = Hostbits."
   }
  ]
 },
 "dnsdhcp": {
  "name": "DNS & DHCP im Detail",
  "q": [
   {
    "q": "Welche vier Schritte durchläuft die DHCP-Adressvergabe (DORA)?",
    "o": [
     {
      "t": "Discover, Offer, Request, Acknowledge",
      "ok": true
     },
     {
      "t": "Detect, Open, Reply, Accept",
      "ok": false
     },
     {
      "t": "Discover, Offer, Reject, Assign",
      "ok": false
     },
     {
      "t": "Deliver, Order, Route, Ack",
      "ok": false
     }
    ],
    "e": "DORA: Discover → Offer → Request → Acknowledge."
   },
   {
    "q": "Womit startet der Client die DHCP-Vergabe?",
    "o": [
     {
      "t": "DHCP Discover (Broadcast ins Netz)",
      "ok": true
     },
     {
      "t": "DHCP Offer (Angebot des Servers)",
      "ok": false
     },
     {
      "t": "DHCP Request (Annahme durch Client)",
      "ok": false
     },
     {
      "t": "DHCP Acknowledge (Bestätigung des Servers)",
      "ok": false
     }
    ],
    "e": "Der Client sucht per Broadcast (Discover) nach einem DHCP-Server."
   },
   {
    "q": "Was sendet der DHCP-Server als Antwort auf ein Discover?",
    "o": [
     {
      "t": "Ein DHCP Offer mit Adressvorschlag",
      "ok": true
     },
     {
      "t": "Ein Acknowledge",
      "ok": false
     },
     {
      "t": "Ein Request",
      "ok": false
     },
     {
      "t": "Eine DNS-Antwort",
      "ok": false
     }
    ],
    "e": "Der Server bietet mit Offer eine IP-Konfiguration an."
   },
   {
    "q": "Was bestätigt der Client mit dem DHCP Request?",
    "o": [
     {
      "t": "Dass er das angebotene Angebot annehmen will",
      "ok": true
     },
     {
      "t": "Dass er die Adresse ablehnt",
      "ok": false
     },
     {
      "t": "Dass er DNS braucht",
      "ok": false
     },
     {
      "t": "Dass er das Netz verlässt",
      "ok": false
     }
    ],
    "e": "Mit Request fordert der Client das gewählte Angebot verbindlich an."
   },
   {
    "q": "Womit schließt der DHCP-Server die Vergabe ab?",
    "o": [
     {
      "t": "DHCP Acknowledge (Bestätigung der Zuweisung)",
      "ok": true
     },
     {
      "t": "DHCP Offer (Adressvorschlag des Servers)",
      "ok": false
     },
     {
      "t": "DHCP Discover (erste Suche des Clients)",
      "ok": false
     },
     {
      "t": "DHCP Release (Rückgabe der Adresse)",
      "ok": false
     }
    ],
    "e": "Mit Acknowledge bestätigt der Server die Zuweisung endgültig."
   },
   {
    "q": "Welche Angaben liefert ein DHCP-Server neben der IP-Adresse typischerweise?",
    "o": [
     {
      "t": "Subnetzmaske, Gateway, DNS-Server, Lease-Dauer",
      "ok": true
     },
     {
      "t": "Nur die MAC-Adresse",
      "ok": false
     },
     {
      "t": "Das WLAN-Passwort",
      "ok": false
     },
     {
      "t": "Die Portnummern",
      "ok": false
     }
    ],
    "e": "DHCP verteilt IP, Maske, Gateway, DNS-Server und die Lease-Dauer."
   },
   {
    "q": "Was ist die 'Lease-Time' bei DHCP?",
    "o": [
     {
      "t": "Die Gültigkeitsdauer der zugewiesenen IP-Adresse",
      "ok": true
     },
     {
      "t": "Die Übertragungsgeschwindigkeit",
      "ok": false
     },
     {
      "t": "Die TTL des Pakets",
      "ok": false
     },
     {
      "t": "Die Zeit bis zum DNS-Timeout",
      "ok": false
     }
    ],
    "e": "Nach Ablauf der Lease muss der Client die Adresse erneuern (Renew)."
   },
   {
    "q": "Warum nutzt DHCP Discover einen Broadcast?",
    "o": [
     {
      "t": "Der Client kennt den Server und seine eigene IP noch nicht",
      "ok": true
     },
     {
      "t": "Broadcasts werden grundsätzlich verschlüsselt übertragen",
      "ok": false
     },
     {
      "t": "Damit die DNS-Auflösung gezielt umgangen wird",
      "ok": false
     },
     {
      "t": "Weil das UDP-Protokoll Broadcast zwingend vorschreibt",
      "ok": false
     }
    ],
    "e": "Ohne eigene IP und ohne Serveradresse bleibt nur der Broadcast."
   },
   {
    "q": "Was ist die Hauptaufgabe von DNS?",
    "o": [
     {
      "t": "Domainnamen in IP-Adressen auflösen",
      "ok": true
     },
     {
      "t": "IP-Adressen vergeben",
      "ok": false
     },
     {
      "t": "Die dynamische Zuweisung von IP-Adressen und Subnetzmasken an Endgeräte beim Systemstart.",
      "ok": false
     },
     {
      "t": "MAC-Adressen zuweisen",
      "ok": false
     }
    ],
    "e": "DNS übersetzt Namen (z. B. example.com) in IP-Adressen."
   },
   {
    "q": "In welcher Reihenfolge wird ein Name typischerweise aufgelöst?",
    "o": [
     {
      "t": "Resolver → Root → TLD → autoritativer Server",
      "ok": true
     },
     {
      "t": "TLD → Root → Resolver → Client",
      "ok": false
     },
     {
      "t": "Autoritativ → Root → Client",
      "ok": false
     },
     {
      "t": "Client → DHCP → Root",
      "ok": false
     }
    ],
    "e": "Der Resolver fragt Root, dann den TLD-Server, dann den autoritativen Server."
   },
   {
    "q": "Was macht ein rekursiver DNS-Resolver?",
    "o": [
     { "t": "Er fragt für den Client so lange nach, bis er die Antwort hat", "ok": true },
     { "t": "Er antwortet mit einem Verweis auf den nächsten zuständigen Server", "ok": false },
     { "t": "Er beantwortet nur Anfragen zu Zonen, die er selbst verwaltet", "ok": false },
     { "t": "Er verteilt eingehende Anfragen gleichmäßig auf mehrere Server", "ok": false }
    ],
    "e": "Der rekursive Resolver arbeitet die komplette Auflösung für den Client ab."
   },
   {
    "q": "Was ist ein autoritativer DNS-Server?",
    "o": [
     { "t": "Er verwaltet die verbindlichen Einträge einer Zone/Domain", "ok": true },
     { "t": "Er speichert Antworten fremder Server zwischen und liefert sie aus", "ok": false },
     { "t": "Er steht an der Spitze der Hierarchie und kennt alle TLD-Server", "ok": false },
     { "t": "Er löst Anfragen stellvertretend für die Clients vollständig auf", "ok": false }
    ],
    "e": "Der autoritative Server hält die maßgeblichen Records seiner Domain."
   },
   {
    "q": "Wofür steht der TLD-Server?",
    "o": [
     { "t": "Top-Level-Domain-Server, zuständig z. B. für .de oder .com", "ok": true },
     { "t": "Trusted-Lookup-Directory — signierte Zone für DNSSEC-Prüfungen", "ok": false },
     { "t": "Transport-Level-DNS — beschleunigte Auflösung über UDP statt TCP", "ok": false },
     { "t": "Top-Lease-Database — zentrale Verwaltung der DHCP-Adressbereiche", "ok": false }
    ],
    "e": "TLD-Server verwalten die Endungen wie .de, .com und verweisen auf autoritative Server."
   },
   {
    "q": "Was ist ein A-Record im DNS?",
    "o": [
     {
      "t": "Zuordnung eines Namens zu einer IPv4-Adresse",
      "ok": true
     },
     {
      "t": "Zuordnung zu einer MAC-Adresse",
      "ok": false
     },
     {
      "t": "Ein Mailserver-Eintrag",
      "ok": false
     },
     {
      "t": "Ein Alias auf einen anderen Namen",
      "ok": false
     }
    ],
    "e": "Der A-Record verweist auf eine IPv4-Adresse (AAAA für IPv6)."
   },
   {
    "q": "Welcher DNS-Record verweist auf eine IPv6-Adresse?",
    "o": [
     {
      "t": "AAAA-Record",
      "ok": true
     },
     {
      "t": "A-Record",
      "ok": false
     },
     {
      "t": "MX-Record",
      "ok": false
     },
     {
      "t": "CNAME-Record",
      "ok": false
     }
    ],
    "e": "AAAA (Quad-A) liefert die IPv6-Adresse zu einem Namen."
   },
   {
    "q": "Wozu dient ein MX-Record?",
    "o": [
     {
      "t": "Er benennt den zuständigen Mailserver einer Domain",
      "ok": true
     },
     {
      "t": "Er verweist auf eine IPv4-Adresse",
      "ok": false
     },
     {
      "t": "Er vergibt DHCP-Leases",
      "ok": false
     },
     {
      "t": "Er speichert das Passwort",
      "ok": false
     }
    ],
    "e": "Der MX-Record (Mail Exchange) legt den Mailserver der Domain fest."
   },
   {
    "q": "Wozu dient ein CNAME-Record?",
    "o": [
     {
      "t": "Er ist ein Alias, der auf einen anderen Namen zeigt",
      "ok": true
     },
     {
      "t": "Er speichert eine IPv6-Adresse",
      "ok": false
     },
     {
      "t": "Er benennt den Mailserver",
      "ok": false
     },
     {
      "t": "Er begrenzt die Lease-Dauer",
      "ok": false
     }
    ],
    "e": "CNAME verweist als Alias auf einen anderen (kanonischen) Namen."
   },
   {
    "q": "Warum nutzt DNS Caching?",
    "o": [
     { "t": "Um wiederholte Anfragen schneller zu beantworten und Last zu senken", "ok": true },
     { "t": "Um Antworten gegen Manipulation auf dem Übertragungsweg zu sichern", "ok": false },
     { "t": "Um bei Ausfall des autoritativen Servers dauerhaft antworten zu können", "ok": false },
     { "t": "Um Clients unabhängig vom konfigurierten DNS-Server zu machen", "ok": false }
    ],
    "e": "Zwischengespeicherte Antworten sparen Zeit und entlasten die Server (TTL steuert die Dauer)."
   },
   {
    "q": "Was bewirkt die TTL eines DNS-Eintrags?",
    "o": [
     { "t": "Sie legt fest, wie lange die Antwort gecacht werden darf", "ok": true },
     { "t": "Sie begrenzt, über wie viele Server eine Anfrage laufen darf", "ok": false },
     { "t": "Sie bestimmt, wann die Domain-Registrierung verlängert werden muss", "ok": false },
     { "t": "Sie gibt an, wie lange der Server für eine Antwort brauchen darf", "ok": false }
    ],
    "e": "Die DNS-TTL bestimmt die Cache-Gültigkeit des Records (nicht zu verwechseln mit der IP-TTL)."
   },
   {
    "q": "Welchen Port nutzt DNS überwiegend?",
    "o": [
     {
      "t": "53",
      "ok": true
     },
     {
      "t": "67",
      "ok": false
     },
     {
      "t": "80",
      "ok": false
     },
     {
      "t": "25",
      "ok": false
     }
    ],
    "e": "DNS = Port 53 (UDP, bei Zonentransfer/großen Antworten TCP)."
   },
   {
    "q": "Wozu dient ein DHCP-Relay-Agent?",
    "o": [
     { "t": "Er leitet DHCP-Broadcasts über Netzgrenzen an einen zentralen Server weiter", "ok": true },
     { "t": "Er beantwortet Anfragen aus einem lokalen Adresspool, wenn der Server ausfällt", "ok": false },
     { "t": "Er übersetzt DHCP-Anfragen zwischen IPv4- und IPv6-Netzen in beide Richtungen", "ok": false },
     { "t": "Er verteilt Anfragen abwechselnd auf mehrere DHCP-Server im selben Subnetz", "ok": false }
    ],
    "e": "DHCP-Broadcasts kommen nicht über Router hinaus. Der Relay-Agent wandelt sie in Unicast an den zentralen DHCP-Server um — so reicht ein Server für viele Subnetze."
   },
   {
    "q": "Was passiert, wenn kein DHCP-Server erreichbar ist?",
    "o": [
     {
      "t": "Der Client vergibt sich eine APIPA-Adresse (169.254.x.x)",
      "ok": true
     },
     {
      "t": "Der Client erhält automatisch eine öffentliche IP",
      "ok": false
     },
     {
      "t": "Der Client übernimmt einfach die IP des Routers",
      "ok": false
     },
     {
      "t": "Der Client fällt komplett aus und meldet Fehler",
      "ok": false
     }
    ],
    "e": "Ohne DHCP greift APIPA/Link-Local aus 169.254.0.0/16."
   },
   {
    "q": "Warum ist DHCP in großen Netzen sinnvoller als manuelle IP-Vergabe?",
    "o": [
     { "t": "Zentrale, fehlerarme Verwaltung ohne Adresskonflikte", "ok": true },
     { "t": "Feste Bindung jeder Adresse an die jeweilige Hardware", "ok": false },
     { "t": "Kürzere Anmeldezeiten der Clients beim Netzwerkbeitritt", "ok": false },
     { "t": "Automatischer Schutz vor fremden Geräten im Netzwerk", "ok": false }
    ],
    "e": "DHCP automatisiert die Vergabe und verhindert doppelte Adressen."
   },
   {
    "q": "Was ist ein rekursiver DNS-Resolver?",
    "o": [
     {
      "t": "Ein Server, der die vollständige Auflösung für den Client durchführt",
      "ok": true
     },
     {
      "t": "Ein Server, der nur auf Anfragen aus seiner eigenen Zone antwortet",
      "ok": false
     },
     {
      "t": "Ein Server, der Antworten nur weiterleitet",
      "ok": false
     },
     {
      "t": "Ein Client-seitiger Cache",
      "ok": false
     }
    ],
    "e": "Der rekursive Resolver fragt Root, TLD und autoritativen Server selbst — der Client bekommt nur die finale Antwort."
   },
   {
    "q": "Was ist der Unterschied zwischen rekursiver und iterativer DNS-Auflösung?",
    "o": [
     {
      "t": "Rekursiv löst der Resolver komplett, iterativ nur mit Verweisen",
      "ok": true
     },
     {
      "t": "Beide Verfahren sind funktional völlig identisch",
      "ok": false
     },
     {
      "t": "Rekursiv fragt die Server von oben nach unten ab, während iterativ die Nameserver von unten nach oben durchsucht.",
      "ok": false
     },
     {
      "t": "Rekursiv funktioniert ausschließlich über UDP",
      "ok": false
     }
    ],
    "e": "Bei Iterativ gibt jeder Server nur einen Hinweis; der Resolver fragt selbst weiter."
   },
   {
    "q": "Was ist ein DNS-Root-Server?",
    "o": [
     {
      "t": "Oberste Ebene der DNS-Hierarchie — verweist auf TLD-Server",
      "ok": true
     },
     {
      "t": "Der Server mit allen IP-Adressen weltweit",
      "ok": false
     },
     {
      "t": "Der Cache im Router",
      "ok": false
     },
     {
      "t": "Ein autoritativer Server für .de",
      "ok": false
     }
    ],
    "e": "13 Root-Server-Cluster (A–M) bilden die Spitze; sie kennen die TLD-Server-Adressen."
   },
   {
    "q": "Wozu dient ein PTR-Record?",
    "o": [
     {
      "t": "Reverse-Lookup: von der IP-Adresse zum Domainnamen",
      "ok": true
     },
     {
      "t": "Eintrag für den zuständigen Mailserver einer Domain",
      "ok": false
     },
     {
      "t": "Alias, der auf einen anderen Domainnamen zeigt",
      "ok": false
     },
     {
      "t": "Eintrag, der eine IPv6-Adresse einer Domain zuordnet",
      "ok": false
     }
    ],
    "e": "PTR-Records ermöglichen die umgekehrte Auflösung: aus einer IP-Adresse den Hostnamen ermitteln."
   },
   {
    "q": "Was passiert nach Ablauf der DHCP Lease Time?",
    "o": [
     {
      "t": "Der Client muss die Adresse erneuern oder neu anfordern",
      "ok": true
     },
     {
      "t": "Die Adresse wird sofort und ersatzlos freigegeben",
      "ok": false
     },
     {
      "t": "Der Client behält die Adresse dauerhaft ohne Renew",
      "ok": false
     },
     {
      "t": "Der Server vergibt sie ohne Rückfrage sofort neu",
      "ok": false
     }
    ],
    "e": "Beim Renew-Zeitpunkt (50% der Lease-Dauer) versucht der Client, die Adresse zu verlängern."
   },
   {
    "q": "Wie nennt man eine fest zugewiesene IP über DHCP?",
    "o": [
     {
      "t": "DHCP-Reservation, feste Zuweisung per MAC-Adresse",
      "ok": true
     },
     {
      "t": "Manuell konfigurierte statische IP am Gerät",
      "ok": false
     },
     {
      "t": "APIPA-Adresse bei fehlendem DHCP-Server",
      "ok": false
     },
     {
      "t": "Die Adresse des Default Gateways im Netz",
      "ok": false
     }
    ],
    "e": "Eine DHCP-Reservation verknüpft eine MAC-Adresse mit einer festen IP — automatisch, aber immer gleich."
   },
   {
    "q": "Welchen Vorteil bietet ein DHCP-Relay?",
    "o": [
     { "t": "Ein DHCP-Server reicht für viele Subnetze statt einen pro Subnetz", "ok": true },
     { "t": "Adresskonflikte werden erkannt, bevor die IP an den Client geht", "ok": false },
     { "t": "Die Vergabe wird redundant, weil das Relay bei Ausfall einspringt", "ok": false },
     { "t": "Die Lease-Zeiten lassen sich je Subnetz individuell verkürzen", "ok": false }
    ],
    "e": "Der Relay-Agent überbrückt die Subnetzgrenzen — Broadcasts werden als Unicast weitergeleitet."
   },
   {
    "q": "Was enthält das DHCP-Offer-Paket?",
    "o": [
     { "t": "Vorgeschlagene IP, Maske, Gateway, DNS, Lease-Dauer", "ok": true },
     { "t": "Die endgültige IP samt Bestätigung der Übernahme", "ok": false },
     { "t": "Die Liste aller noch freien Adressen des Pools", "ok": false },
     { "t": "Die MAC des Servers und den nächsten Anfragezeitpunkt", "ok": false }
    ],
    "e": "Das Offer enthält die komplette Netzwerkkonfiguration, die der Server vorschlägt."
   },
   {
    "q": "Woran erkennt der DHCP-Server beim Discover den anfragenden Client?",
    "o": [
     {
      "t": "An der MAC-Adresse",
      "ok": true
     },
     {
      "t": "Am Hostnamen",
      "ok": false
     },
     {
      "t": "An der IP-Adresse",
      "ok": false
     },
     {
      "t": "Am Port",
      "ok": false
     }
    ],
    "e": "Da der Client noch keine IP hat, identifiziert er sich über seine MAC-Adresse."
   },
   {
    "q": "Was ist DNS-Caching und warum ist es wichtig?",
    "o": [
     {
      "t": "Zwischenspeichern von Antworten für die TTL-Dauer",
      "ok": true
     },
     {
      "t": "Dauerhaftes Speichern aller DNS-Einträge weltweit",
      "ok": false
     },
     {
      "t": "Vollständiges Backup aller Zonen eines Servers",
      "ok": false
     },
     {
      "t": "Verschlüsselung sämtlicher DNS-Antworten im Netz",
      "ok": false
     }
    ],
    "e": "DNS-Cache verhindert wiederholte Abfragen für die gleiche Domain innerhalb der TTL."
   },
   {
    "q": "Was unterscheidet einen autoritativen von einem nicht-autoritativen DNS-Server?",
    "o": [
     {
      "t": "Autoritativ verwaltet die Zone selbst, andere cachen nur",
      "ok": true
     },
     {
      "t": "Autoritative Server sind grundsätzlich schneller",
      "ok": false
     },
     {
      "t": "Zwischen beiden besteht kein funktionaler Unterschied",
      "ok": false
     },
     {
      "t": "Nicht-autoritative Server gelten als sicherer",
      "ok": false
     }
    ],
    "e": "Nur der autoritative Server liefert die 'echte' Antwort — alle anderen antworten aus ihrem Cache."
   }
  ]
 },
 "api": {
  "name": "API, REST, SOAP & Webhook",
  "q": [
   {
    "q": "Wofür steht API?",
    "o": [
     {
      "t": "Application Programming Interface",
      "ok": true
     },
     {
      "t": "Advanced Protocol Interface",
      "ok": false
     },
     {
      "t": "Automated Program Instruction",
      "ok": false
     },
     {
      "t": "Application Package Installer",
      "ok": false
     }
    ],
    "e": "API = Application Programming Interface."
   },
   {
    "q": "Welche Formate nutzen APIs meist für Antworten?",
    "o": [
     {
      "t": "JSON oder XML",
      "ok": true
     },
     {
      "t": "CSV oder PDF",
      "ok": false
     },
     {
      "t": "HTML oder CSS",
      "ok": false
     },
     {
      "t": "MP4 oder PNG",
      "ok": false
     }
    ],
    "e": "Strukturierte Antworten kommen meist als JSON oder XML."
   },
   {
    "q": "Was kennzeichnet REST?",
    "o": [
     {
      "t": "Zustandslos, nutzt HTTP-Methoden, skalierbar",
      "ok": true
     },
     {
      "t": "Nutzt ausschließlich XML",
      "ok": false
     },
     {
      "t": "Server ruft Client bei Events auf",
      "ok": false
     },
     {
      "t": "Immer verschlüsselt per SSH",
      "ok": false
     }
    ],
    "e": "REST ist stateless und nutzt GET/POST/PUT/DELETE."
   },
   {
    "q": "Wie funktioniert ein Webhook?",
    "o": [
     {
      "t": "Der Server meldet sich bei einem Event selbst beim Client",
      "ok": true
     },
     {
      "t": "Der Client fragt ständig aktiv nach (Polling)",
      "ok": false
     },
     {
      "t": "Er verschlüsselt den Verkehr",
      "ok": false
     },
     {
      "t": "Er ersetzt die IP-Adressierung",
      "ok": false
     }
    ],
    "e": "Webhook = 'umgedrehte API': Server pusht bei Ereignis."
   },
   {
    "q": "Welches HTTP-Verb dient dem Abrufen von Daten?",
    "o": [
     {
      "t": "GET",
      "ok": true
     },
     {
      "t": "POST",
      "ok": false
     },
     {
      "t": "DELETE",
      "ok": false
     },
     {
      "t": "PUT",
      "ok": false
     }
    ],
    "e": "GET liest/ruft Daten ab."
   },
   {
    "q": "Welches HTTP-Verb legt eine neue Ressource an?",
    "o": [
     {
      "t": "POST",
      "ok": true
     },
     {
      "t": "GET",
      "ok": false
     },
     {
      "t": "DELETE",
      "ok": false
     },
     {
      "t": "HEAD",
      "ok": false
     }
    ],
    "e": "POST erstellt neue Ressourcen."
   },
   {
    "q": "Welches HTTP-Verb löscht eine Ressource?",
    "o": [
     {
      "t": "DELETE",
      "ok": true
     },
     {
      "t": "GET",
      "ok": false
     },
     {
      "t": "POST",
      "ok": false
     },
     {
      "t": "PUT",
      "ok": false
     }
    ],
    "e": "DELETE entfernt eine Ressource."
   },
   {
    "q": "Was bedeutet 'zustandslos' (stateless) bei REST?",
    "o": [
     {
      "t": "Jede Anfrage enthält alle nötigen Infos, kein Sitzungszustand am Server",
      "ok": true
     },
     {
      "t": "Der Server merkt sich jede Sitzung dauerhaft",
      "ok": false
     },
     {
      "t": "Die Verbindung bleibt permanent offen",
      "ok": false
     },
     {
      "t": "Es gibt keine Fehlermeldungen",
      "ok": false
     }
    ],
    "e": "Der Server speichert keinen Zustand zwischen Requests → gut skalierbar."
   },
   {
    "q": "Welches Protokoll ist älter, schwerfälliger und nutzt ausschließlich XML?",
    "o": [
     {
      "t": "SOAP",
      "ok": true
     },
     {
      "t": "REST",
      "ok": false
     },
     {
      "t": "Webhook",
      "ok": false
     },
     {
      "t": "GraphQL",
      "ok": false
     }
    ],
    "e": "SOAP ist XML-only und wird oft noch im Banking eingesetzt."
   },
   {
    "q": "Wie authentifiziert sich ein Client bei vielen APIs?",
    "o": [
     { "t": "Über einen geheimen Schlüssel (API-Key) im Header", "ok": true },
     { "t": "Über eine fortlaufende Anfragenummer je Client", "ok": false },
     { "t": "Über den User-Agent-Header des aufrufenden Programms", "ok": false },
     { "t": "Über die MAC-Adresse, die im Request mitgesendet wird", "ok": false }
    ],
    "e": "Ein API-Key/Token im Header dient der Authentifizierung."
   },
   {
    "q": "Was schützt die 'Kapselung' bei einer API?",
    "o": [
     {
      "t": "Die interne Logik des Servers vor dem Client",
      "ok": true
     },
     {
      "t": "Die IP-Adresse des Clients",
      "ok": false
     },
     {
      "t": "Die Bandbreite",
      "ok": false
     },
     {
      "t": "Die Portnummer",
      "ok": false
     }
    ],
    "e": "Der Client sieht nur die Schnittstelle, nicht den internen Code."
   },
   {
    "q": "Welches HTTP-Verb ersetzt/aktualisiert eine Ressource?",
    "o": [
     {
      "t": "PUT",
      "ok": true
     },
     {
      "t": "GET",
      "ok": false
     },
     {
      "t": "POST",
      "ok": false
     },
     {
      "t": "CONNECT",
      "ok": false
     }
    ],
    "e": "PUT aktualisiert bzw. ersetzt eine vorhandene Ressource."
   },
   {
    "q": "Warum ist REST gut skalierbar?",
    "o": [
     { "t": "Wegen der Zustandslosigkeit können Anfragen unabhängig verteilt werden", "ok": true },
     { "t": "Weil der Server alle Sitzungen zentral zwischenspeichert und teilt", "ok": false },
     { "t": "Weil Anfragen grundsätzlich asynchron über Warteschlangen laufen", "ok": false },
     { "t": "Weil die Datenmenge je Antwort auf ein festes Maximum begrenzt ist", "ok": false }
    ],
    "e": "Stateless-Requests lassen sich beliebig auf Server verteilen (Loadbalancing)."
   },
   {
    "q": "Was ist ein 'Endpunkt' einer API?",
    "o": [
     { "t": "Eine definierte Adresse/URL, an die Anfragen gehen", "ok": true },
     { "t": "Der Server, auf dem die Datenbank der API betrieben wird", "ok": false },
     { "t": "Die Funktion im Client-Code, die die Antwort verarbeitet", "ok": false },
     { "t": "Die Gegenstelle, die eine TCP-Verbindung ordnungsgemäß beendet", "ok": false }
    ],
    "e": "Ein Endpoint ist die adressierbare Schnittstelle für Requests."
   },
   {
    "q": "Welcher Vorteil ergibt sich durch Webhooks gegenüber Polling?",
    "o": [
     { "t": "Kein ständiges Nachfragen nötig, spart Ressourcen", "ok": true },
     { "t": "Die Verbindung bleibt dauerhaft offen und reagiert sofort", "ok": false },
     { "t": "Antworten kommen garantiert und in fester Reihenfolge an", "ok": false },
     { "t": "Der Client bestimmt selbst, wann er die Daten abholt", "ok": false }
    ],
    "e": "Der Server informiert aktiv bei Events, Polling entfällt."
   },
   {
    "q": "Auf welchem Protokoll bauen REST-APIs typischerweise auf?",
    "o": [
     {
      "t": "HTTP/HTTPS",
      "ok": true
     },
     {
      "t": "FTP",
      "ok": false
     },
     {
      "t": "SMTP",
      "ok": false
     },
     {
      "t": "SNMP",
      "ok": false
     }
    ],
    "e": "REST nutzt HTTP-Methoden und -Statuscodes."
   },
   {
    "q": "Was ist eine API im Kern?",
    "o": [
     {
      "t": "Eine vertragliche Schnittstelle zwischen Software-Systemen",
      "ok": true
     },
     {
      "t": "Ein physisches Kabel",
      "ok": false
     },
     {
      "t": "Ein Verschlüsselungsalgorithmus",
      "ok": false
     },
     {
      "t": "Ein Netzwerkprotokoll der Schicht 1",
      "ok": false
     }
    ],
    "e": "Die API definiert, wie Anfragen und Antworten aussehen müssen."
   },
   {
    "q": "Welche Aussage über JSON stimmt?",
    "o": [
     {
      "t": "Leichtgewichtiges, verbreitetes Datenformat für APIs",
      "ok": true
     },
     {
      "t": "Ein Verschlüsselungsverfahren",
      "ok": false
     },
     {
      "t": "Ein Transportprotokoll",
      "ok": false
     },
     {
      "t": "Nur für Bilder geeignet",
      "ok": false
     }
    ],
    "e": "JSON ist ein schlankes, textbasiertes Austauschformat."
   },
   {
    "q": "Warum wird SOAP oft noch in Banken genutzt?",
    "o": [
     {
      "t": "Wegen hoher, standardisierter Sicherheitsmechanismen",
      "ok": true
     },
     {
      "t": "Weil es das schnellste Protokoll ist",
      "ok": false
     },
     {
      "t": "Weil es zustandslos ist",
      "ok": false
     },
     {
      "t": "Weil es kein XML braucht",
      "ok": false
     }
    ],
    "e": "SOAP bietet strenge, standardisierte Sicherheits- und Transaktionsmerkmale."
   },
   {
    "q": "Welche Reihenfolge beschreibt einen typischen API-Aufruf?",
    "o": [
     {
      "t": "Client sendet Request an Endpoint → Server prüft/verarbeitet → Antwort als JSON/XML",
      "ok": true
     },
     {
      "t": "Server sendet zuerst → Client speichert → Router antwortet",
      "ok": false
     },
     {
      "t": "Client verschlüsselt IP → Server ändert TTL",
      "ok": false
     },
     {
      "t": "DNS fragt Client → Client antwortet dem Router",
      "ok": false
     }
    ],
    "e": "Standardablauf: Request → Verarbeitung → strukturierte Response."
   }
  ]
 },
 "voip": {
  "name": "VoIP",
  "q": [
   {
    "q": "Wofür steht VoIP?",
    "o": [
     {
      "t": "Voice over IP – Sprachübertragung über das IP-Netz",
      "ok": true
     },
     {
      "t": "Video over Internet Protocol",
      "ok": false
     },
     {
      "t": "Virtual Online IP",
      "ok": false
     },
     {
      "t": "Voice Optimized Internet Path",
      "ok": false
     }
    ],
    "e": "VoIP überträgt Telefonie als Datenpakete über IP-Netze."
   },
   {
    "q": "Welches Transportprotokoll nutzt VoIP für die Sprachdaten typischerweise?",
    "o": [
     {
      "t": "UDP (über RTP transportiert)",
      "ok": true
     },
     {
      "t": "TCP (verbindungsorientiert)",
      "ok": false
     },
     {
      "t": "ICMP (Steuermeldungen)",
      "ok": false
     },
     {
      "t": "ARP (Adressauflösung)",
      "ok": false
     }
    ],
    "e": "Sprache läuft über RTP auf UDP – Tempo ist wichtiger als vollständige Zustellung."
   },
   {
    "q": "Warum nutzt VoIP UDP statt TCP?",
    "o": [
     { "t": "Geringe Verzögerung ist wichtiger als das Nachliefern verlorener Pakete", "ok": true },
     { "t": "UDP komprimiert Sprachdaten effizienter, als TCP es könnte", "ok": false },
     { "t": "UDP garantiert eine feste Bandbreite für die Dauer des Gesprächs", "ok": false },
     { "t": "UDP baut für jedes Gespräch mehrere parallele Kanäle gleichzeitig auf", "ok": false }
    ],
    "e": "Verspätete Nachlieferungen stören ein Gespräch mehr als ein kurzer Aussetzer – daher UDP."
   },
   {
    "q": "Welche Aufgabe hat das SIP-Protokoll bei VoIP?",
    "o": [
     { "t": "Auf-, Ab- und Verwaltung der Gesprächsverbindung (Signalisierung)", "ok": true },
     { "t": "Transport der digitalisierten Sprachpakete zwischen den Endgeräten", "ok": false },
     { "t": "Priorisierung der Sprachpakete gegenüber normalem Datenverkehr", "ok": false },
     { "t": "Umwandlung analoger Sprache in digitale Datenpakete", "ok": false }
    ],
    "e": "SIP (Session Initiation Protocol) steuert den Rufaufbau/-abbau, nicht die Sprachdaten selbst."
   },
   {
    "q": "Welche Aufgabe hat RTP bei VoIP?",
    "o": [
     {
      "t": "Transport der Echtzeit-Sprachdaten",
      "ok": true
     },
     {
      "t": "Signalisierung des Anrufs",
      "ok": false
     },
     {
      "t": "Namensauflösung",
      "ok": false
     },
     {
      "t": "IP-Vergabe",
      "ok": false
     }
    ],
    "e": "RTP (Real-Time Transport Protocol) überträgt den eigentlichen Audiostrom."
   },
   {
    "q": "Was bezeichnet 'Jitter' bei VoIP?",
    "o": [
     {
      "t": "Schwankungen in der Laufzeit der Pakete",
      "ok": true
     },
     {
      "t": "Den kompletten Paketverlust",
      "ok": false
     },
     {
      "t": "Die Lautstärke",
      "ok": false
     },
     {
      "t": "Die Verschlüsselung",
      "ok": false
     }
    ],
    "e": "Jitter ist die Varianz der Paketlaufzeit; ein Jitter-Buffer gleicht sie aus."
   },
   {
    "q": "Was bezeichnet 'Latenz' bei VoIP?",
    "o": [
     {
      "t": "Die Verzögerung zwischen Sprechen und Hören",
      "ok": true
     },
     {
      "t": "Die Anzahl der Router",
      "ok": false
     },
     {
      "t": "Die Bandbreite",
      "ok": false
     },
     {
      "t": "Die MAC-Adresse",
      "ok": false
     }
    ],
    "e": "Hohe Latenz führt zu spürbaren Verzögerungen und Gesprächsüberlappungen."
   },
   {
    "q": "Wozu dient QoS (Quality of Service) bei VoIP?",
    "o": [
     { "t": "Sprachpakete werden bevorzugt behandelt, um Qualität zu sichern", "ok": true },
     { "t": "Gespräche werden auf die am wenigsten ausgelastete Leitung gelegt", "ok": false },
     { "t": "Verlorene Sprachpakete werden automatisch erneut angefordert", "ok": false },
     { "t": "Die Sprachqualität wird gemessen und dem Anbieter gemeldet", "ok": false }
    ],
    "e": "QoS priorisiert zeitkritischen Sprachverkehr gegenüber unkritischem Datenverkehr."
   },
   {
    "q": "Was ist ein Codec bei VoIP?",
    "o": [
     {
      "t": "Ein Verfahren zum Kodieren/Komprimieren der Sprache (z. B. G.711)",
      "ok": true
     },
     {
      "t": "Ein Zertifikat zur Verschlüsselung des Gesprächs",
      "ok": false
     },
     {
      "t": "Ein Protokoll zur Wegfindung im Netz",
      "ok": false
     },
     {
      "t": "Ein bestimmter Funkkanal im WLAN",
      "ok": false
     }
    ],
    "e": "Der Codec wandelt Analogsprache in Daten und komprimiert sie (Qualität vs. Bandbreite)."
   },
   {
    "q": "Welche Folge hat starker Paketverlust bei VoIP?",
    "o": [
     {
      "t": "Aussetzer und schlechte Sprachqualität",
      "ok": true
     },
     {
      "t": "Höhere Sicherheit",
      "ok": false
     },
     {
      "t": "Schnelleres Gespräch",
      "ok": false
     },
     {
      "t": "Keine Auswirkung",
      "ok": false
     }
    ],
    "e": "Fehlende Pakete werden bei UDP nicht nachgeliefert → hörbare Lücken."
   },
   {
    "q": "Welcher Vorteil spricht für VoIP gegenüber klassischer Telefonie?",
    "o": [
     { "t": "Nutzung der vorhandenen Dateninfrastruktur, geringere Kosten, Flexibilität", "ok": true },
     { "t": "Garantiert höhere Sprachqualität als jede klassische Telefonleitung", "ok": false },
     { "t": "Abhörsichere Gespräche durch verpflichtende Ende-zu-Ende-Verschlüsselung", "ok": false },
     { "t": "Vollständige Unabhängigkeit von der Internetanbindung des Standorts", "ok": false }
    ],
    "e": "VoIP nutzt das bestehende IP-Netz, spart eigene Telefonleitungen und ist flexibel."
   },
   {
    "q": "Wovon hängt die VoIP-Qualität maßgeblich ab?",
    "o": [
     {
      "t": "Von Latenz, Jitter und Paketverlust",
      "ok": true
     },
     {
      "t": "Von der SSID",
      "ok": false
     },
     {
      "t": "Von der Kabelfarbe",
      "ok": false
     },
     {
      "t": "Von der TTL",
      "ok": false
     }
    ],
    "e": "Diese drei Faktoren bestimmen, wie sauber ein Gespräch klingt."
   },
   {
    "q": "Was leistet ein Jitter-Buffer?",
    "o": [
     { "t": "Er puffert Pakete, um Laufzeitschwankungen auszugleichen", "ok": true },
     { "t": "Er fordert verlorene Sprachpakete beim Absender erneut an", "ok": false },
     { "t": "Er komprimiert die Sprachdaten bei knapper Bandbreite stärker", "ok": false },
     { "t": "Er verteilt die Sprachlast gleichmäßig auf mehrere Leitungen", "ok": false }
    ],
    "e": "Der Jitter-Buffer sammelt Pakete kurz, um sie gleichmäßig abzuspielen."
   },
   {
    "q": "Welche zwei Protokolltypen wirken bei VoIP zusammen?",
    "o": [
     { "t": "Signalisierung (SIP) und Medientransport (RTP)", "ok": true },
     { "t": "Verbindungsaufbau (TCP) und Verschlüsselung (TLS)", "ok": false },
     { "t": "Priorisierung (QoS) und Segmentierung (VLAN)", "ok": false },
     { "t": "Adressauflösung (DNS) und Adressvergabe (DHCP)", "ok": false }
    ],
    "e": "SIP baut das Gespräch auf, RTP transportiert die Sprache."
   },
   {
    "q": "Warum ist VoIP anfällig für Netzwerkprobleme?",
    "o": [
     { "t": "Weil Sprache echtzeitkritisch ist und keine Verzögerung verträgt", "ok": true },
     { "t": "Weil Sprachpakete größer sind als gewöhnliche Datenpakete", "ok": false },
     { "t": "Weil die Codecs bei Störungen die Verbindung komplett trennen", "ok": false },
     { "t": "Weil jedes Gespräch eine eigene physische Leitung belegt", "ok": false }
    ],
    "e": "Echtzeitkommunikation reagiert empfindlich auf Latenz, Jitter und Verluste."
   },
   {
    "q": "Was ist eine typische Anwendung von VoIP im Unternehmen?",
    "o": [
     { "t": "IP-Telefonanlage statt klassischer Telefonleitungen", "ok": true },
     { "t": "Zentrale Videoüberwachung über das Datennetzwerk", "ok": false },
     { "t": "Standortvernetzung über verschlüsselte VPN-Tunnel", "ok": false },
     { "t": "Faxversand über das klassische analoge Telefonnetz", "ok": false }
    ],
    "e": "Firmen nutzen VoIP-Telefonanlagen über das vorhandene Datennetz."
   },
   {
    "q": "Welche Rolle spielt Bandbreite bei VoIP?",
    "o": [
     {
      "t": "Genug Bandbreite muss für stabile Gespräche reserviert sein",
      "ok": true
     },
     {
      "t": "Bandbreite ist irrelevant",
      "ok": false
     },
     {
      "t": "Mehr Bandbreite verschlechtert die Qualität",
      "ok": false
     },
     {
      "t": "Bandbreite ersetzt QoS",
      "ok": false
     }
    ],
    "e": "Sprache braucht zwar wenig Bandbreite, aber verlässlich – sonst leidet die Qualität."
   },
   {
    "q": "Was passiert bei einem VoIP-Anruf zuerst?",
    "o": [
     {
      "t": "SIP baut die Verbindung auf, dann fließt RTP-Sprache",
      "ok": true
     },
     {
      "t": "RTP startet vor jeder Signalisierung",
      "ok": false
     },
     {
      "t": "DNS überträgt die Sprache",
      "ok": false
     },
     {
      "t": "Der Codec vergibt eine IP",
      "ok": false
     }
    ],
    "e": "Erst Signalisierung (SIP-Rufaufbau), dann Medientransport (RTP)."
   },
   {
    "q": "Warum wird VoIP-Verkehr oft in ein eigenes VLAN gelegt?",
    "o": [
     { "t": "Um Sprache zu priorisieren und von Datenverkehr zu trennen", "ok": true },
     { "t": "Um Telefonate auch bei Ausfall des Datennetzes zu ermöglichen", "ok": false },
     { "t": "Um Gespräche automatisch zu verschlüsseln und abzusichern", "ok": false },
     { "t": "Um die Telefone ohne eigene IP-Adressen betreiben zu können", "ok": false }
    ],
    "e": "Ein Voice-VLAN trennt und priorisiert Sprachverkehr für gleichbleibende Qualität."
   },
   {
    "q": "Was ist ein Softphone?",
    "o": [
     { "t": "Eine Software, die Telefonie am Rechner/Smartphone ermöglicht", "ok": true },
     { "t": "Ein Adapter, der analoge Telefone ans IP-Netz anbindet", "ok": false },
     { "t": "Ein IP-Telefon mit Touchdisplay statt physischer Tasten", "ok": false },
     { "t": "Eine App zur Fernkonfiguration der IP-Telefonanlage", "ok": false }
    ],
    "e": "Ein Softphone ist eine VoIP-Anwendung ohne dediziertes Tischtelefon."
   }
  ]
 },
 "krypto": {
  "name": "Verschlüsselung & PKI",
  "q": [
   {
    "q": "Was kennzeichnet symmetrische Verschlüsselung?",
    "o": [
     {
      "t": "Sender und Empfänger nutzen denselben geheimen Schlüssel",
      "ok": true
     },
     {
      "t": "Ein öffentlicher und ein privater Schlüssel",
      "ok": false
     },
     {
      "t": "Gar kein Schlüssel nötig",
      "ok": false
     },
     {
      "t": "Nur der Empfänger hat einen Schlüssel",
      "ok": false
     }
    ],
    "e": "Symmetrisch = ein gemeinsamer geheimer Schlüssel für Ver- und Entschlüsselung."
   },
   {
    "q": "Welcher Algorithmus ist ein typisches symmetrisches Verfahren?",
    "o": [
     {
      "t": "AES",
      "ok": true
     },
     {
      "t": "RSA",
      "ok": false
     },
     {
      "t": "ECC",
      "ok": false
     },
     {
      "t": "SHA-256",
      "ok": false
     }
    ],
    "e": "AES ist der Standard der symmetrischen Verschlüsselung."
   },
   {
    "q": "Was ist der Hauptnachteil symmetrischer Verschlüsselung?",
    "o": [
     {
      "t": "Die sichere Verteilung des gemeinsamen Schlüssels",
      "ok": true
     },
     {
      "t": "Sie ist zu langsam",
      "ok": false
     },
     {
      "t": "Sie braucht immer Zertifikate",
      "ok": false
     },
     {
      "t": "Sie funktioniert nur lokal",
      "ok": false
     }
    ],
    "e": "Das Schlüsselverteilproblem: Wie kommt der geheime Schlüssel sicher zum Partner?"
   },
   {
    "q": "Was kennzeichnet asymmetrische Verschlüsselung?",
    "o": [
     { "t": "Ein Schlüsselpaar: öffentlich verschlüsselt, privat entschlüsselt", "ok": true },
     { "t": "Ein gemeinsamer Schlüssel, der vorab sicher ausgetauscht wird", "ok": false },
     { "t": "Zwei identische Schlüssel, die auf beiden Seiten erzeugt werden", "ok": false },
     { "t": "Ein Einmalschlüssel, der nach jeder Nachricht verworfen wird", "ok": false }
    ],
    "e": "Asymmetrisch = Public Key verschlüsselt, zugehöriger Private Key entschlüsselt."
   },
   {
    "q": "Welche Algorithmen sind typisch asymmetrisch?",
    "o": [
     {
      "t": "RSA und ECC",
      "ok": true
     },
     {
      "t": "AES und DES",
      "ok": false
     },
     {
      "t": "SHA und MD5",
      "ok": false
     },
     {
      "t": "WPA und WEP",
      "ok": false
     }
    ],
    "e": "RSA und ECC sind gängige asymmetrische Verfahren."
   },
   {
    "q": "Warum ist rein asymmetrische Verschlüsselung für große Datenmengen ungeeignet?",
    "o": [
     {
      "t": "Sie ist rechenintensiv und langsam",
      "ok": true
     },
     {
      "t": "Sie ist unsicher",
      "ok": false
     },
     {
      "t": "Sie braucht kein Schlüsselpaar",
      "ok": false
     },
     {
      "t": "Sie funktioniert nur mit Zertifikaten",
      "ok": false
     }
    ],
    "e": "Asymmetrische Verfahren sind langsam — daher nur für Schlüsselaustausch, nicht für Massendaten."
   },
   {
    "q": "Was kombiniert die hybride Verschlüsselung?",
    "o": [
     { "t": "Symmetrisch für die Daten, asymmetrisch für den Schlüsselaustausch", "ok": true },
     { "t": "Asymmetrisch für die Daten, symmetrisch für den Schlüsselaustausch", "ok": false },
     { "t": "Verschlüsselung für den Transport, Hashing für gespeicherte Daten", "ok": false },
     { "t": "Zwei unabhängige symmetrische Verfahren mit getrennten Schlüsseln", "ok": false }
    ],
    "e": "Hybrid: schneller symmetrischer Sitzungsschlüssel, sicher per Asymmetrie übertragen."
   },
   {
    "q": "Wo wird hybride Verschlüsselung in der Praxis eingesetzt?",
    "o": [
     {
      "t": "HTTPS, VPN, PGP/S-MIME",
      "ok": true
     },
     {
      "t": "Nur bei DHCP",
      "ok": false
     },
     {
      "t": "Nur bei ARP",
      "ok": false
     },
     {
      "t": "Ausschließlich lokal",
      "ok": false
     }
    ],
    "e": "HTTPS, VPNs und Mailverschlüsselung nutzen das hybride Prinzip."
   },
   {
    "q": "Wozu dient eine digitale Signatur?",
    "o": [
     {
      "t": "Zum Nachweis von Authentizität und Integrität",
      "ok": true
     },
     {
      "t": "Zur Verschlüsselung der Nutzdaten",
      "ok": false
     },
     {
      "t": "Zur IP-Vergabe",
      "ok": false
     },
     {
      "t": "Zur Komprimierung",
      "ok": false
     }
    ],
    "e": "Die Signatur belegt Absender (Authentizität) und Unverändertheit (Integrität)."
   },
   {
    "q": "Wie wird eine digitale Signatur erzeugt?",
    "o": [
     {
      "t": "Hashwert der Nachricht wird mit dem privaten Schlüssel verschlüsselt",
      "ok": true
     },
     {
      "t": "Nachricht wird mit dem öffentlichen Schlüssel gehasht",
      "ok": false
     },
     {
      "t": "Der Klartext wird symmetrisch verschlüsselt",
      "ok": false
     },
     {
      "t": "Es wird nur ein Passwort angehängt",
      "ok": false
     }
    ],
    "e": "Der Absender signiert den Hash mit seinem Private Key."
   },
   {
    "q": "Wie prüft der Empfänger eine digitale Signatur?",
    "o": [
     { "t": "Signatur mit dem öffentlichen Schlüssel entschlüsseln und Hash vergleichen", "ok": true },
     { "t": "Den Hash mit dem eigenen privaten Schlüssel verschlüsseln und beide Werte vergleichen", "ok": false },
     { "t": "Die Signatur bei der CA einreichen, die sie gegen die Root-Signatur abgleicht", "ok": false },
     { "t": "Das Dokument erneut signieren und prüfen, ob dieselbe Signatur entsteht", "ok": false }
    ],
    "e": "Mit dem Public Key des Absenders wird der Hash geprüft; stimmt er, ist alles echt/unverändert."
   },
   {
    "q": "Warum ist der Hashwert bei der Signatur wichtig?",
    "o": [
     {
      "t": "Er erkennt jede Änderung der Nachricht (Integrität)",
      "ok": true
     },
     {
      "t": "Er verschlüsselt den gesamten Nachrichtentext",
      "ok": false
     },
     {
      "t": "Er ersetzt den privaten Schlüssel des Absenders",
      "ok": false
     },
     {
      "t": "Er vergibt die IP-Adresse des Empfängers",
      "ok": false
     }
    ],
    "e": "Ändert sich die Nachricht, ändert sich der Hash — Manipulation wird sichtbar."
   },
   {
    "q": "Was enthält ein digitales Zertifikat?",
    "o": [
     { "t": "Öffentlichen Schlüssel, Inhaberdaten, Gültigkeit, CA-Signatur", "ok": true },
     { "t": "Öffentlichen und privaten Schlüssel als geschütztes Schlüsselpaar", "ok": false },
     { "t": "Privaten Schlüssel, Inhaberdaten und die Signatur des Inhabers", "ok": false },
     { "t": "Die Sperrliste der CA samt aller widerrufenen Seriennummern", "ok": false }
    ],
    "e": "Ein Zertifikat bindet einen Public Key an eine Identität, signiert von einer CA."
   },
   {
    "q": "Was ist eine Zertifizierungsstelle (CA)?",
    "o": [
     { "t": "Eine vertrauenswürdige Instanz, die Zertifikate signiert/ausstellt", "ok": true },
     { "t": "Ein Dienst, der private Schlüssel zentral erzeugt und verwahrt", "ok": false },
     { "t": "Eine Behörde, die Verschlüsselungsverfahren prüft und zulässt", "ok": false },
     { "t": "Ein Server, der ablaufende Zertifikate automatisch verlängert", "ok": false }
    ],
    "e": "Die CA bestätigt durch ihre Signatur die Echtheit eines Zertifikats."
   },
   {
    "q": "Wie ist eine PKI-Hierarchie typischerweise aufgebaut?",
    "o": [
     {
      "t": "Root-CA → Intermediate-CA → End-Entity-Zertifikat",
      "ok": true
     },
     {
      "t": "End-Entity → Root → Client",
      "ok": false
     },
     {
      "t": "Nur eine einzige CA",
      "ok": false
     },
     {
      "t": "Client → Server → Router",
      "ok": false
     }
    ],
    "e": "Die Vertrauenskette läuft von der Root-CA über Zwischen-CAs zu den Endzertifikaten."
   },
   {
    "q": "Worauf beruht das Vertrauensmodell einer PKI?",
    "o": [
     { "t": "Clients vertrauen der Root-CA und damit allem, was sie signiert", "ok": true },
     { "t": "Jeder Teilnehmer signiert die Schlüssel anderer, denen er vertraut", "ok": false },
     { "t": "Der Server entscheidet je Verbindung, welchen Clients er vertraut", "ok": false },
     { "t": "Zertifikate gelten als vertrauenswürdig, sobald sie zweifach signiert sind", "ok": false }
    ],
    "e": "Wird der Root-CA vertraut, gelten alle von ihr (oder ihren Intermediates) signierten Zertifikate als vertrauenswürdig."
   },
   {
    "q": "Wodurch wird ein widerrufenes Zertifikat erkannt?",
    "o": [
     {
      "t": "Über Sperrlisten: CRL oder OCSP",
      "ok": true
     },
     {
      "t": "Über die MAC-Adresse",
      "ok": false
     },
     {
      "t": "Über DHCP",
      "ok": false
     },
     {
      "t": "Gar nicht",
      "ok": false
     }
    ],
    "e": "CRL (Certificate Revocation List) oder OCSP prüfen den Widerrufsstatus."
   },
   {
    "q": "Welches ist das Standardformat für digitale Zertifikate?",
    "o": [
     {
      "t": "X.509",
      "ok": true
     },
     {
      "t": "MP4",
      "ok": false
     },
     {
      "t": "CSV",
      "ok": false
     },
     {
      "t": "HTML",
      "ok": false
     }
    ],
    "e": "X.509 ist das Standardformat; PEM/DER sind Dateikodierungen."
   },
   {
    "q": "Welche drei Schutzziele adressiert die Kombination aus Verschlüsselung und Signatur?",
    "o": [
     {
      "t": "Vertraulichkeit, Integrität, Authentizität",
      "ok": true
     },
     {
      "t": "Geschwindigkeit, Reichweite, Kosten",
      "ok": false
     },
     {
      "t": "Routing, Switching, Bridging",
      "ok": false
     },
     {
      "t": "Nur Vertraulichkeit",
      "ok": false
     }
    ],
    "e": "Verschlüsselung schützt Vertraulichkeit, die Signatur Integrität und Authentizität."
   },
   {
    "q": "Warum verschlüsselt man den Sitzungsschlüssel asymmetrisch statt ihn direkt zu senden?",
    "o": [
     { "t": "Damit nur der Empfänger ihn mit seinem privaten Schlüssel öffnen kann", "ok": true },
     { "t": "Weil symmetrische Schlüssel für die direkte Übertragung zu lang wären", "ok": false },
     { "t": "Damit die CA den Schlüsselaustausch protokollieren und prüfen kann", "ok": false },
     { "t": "Weil er sonst bei jeder einzelnen Nachricht neu erzeugt werden müsste", "ok": false }
    ],
    "e": "Der mit dem Public Key geschützte Sitzungsschlüssel ist nur für den Inhaber des Private Keys lesbar."
   },
   {
    "q": "Was ist ein Hash-Wert?",
    "o": [
     { "t": "Eine Prüfsumme fester Länge, die aus beliebig langen Daten berechnet wird", "ok": true },
     { "t": "Ein komprimiertes Abbild der Daten, aus dem sie sich wiederherstellen lassen", "ok": false },
     { "t": "Ein verschlüsselter Auszug der Daten, lesbar nur mit dem passenden Schlüssel", "ok": false },
     { "t": "Ein zufällig erzeugter Wert, der jeder Datei bei Erstellung zugewiesen wird", "ok": false }
    ],
    "e": "Ein Hash-Algorithmus (z. B. SHA-256) erzeugt einen eindeutigen Fingerabdruck der Eingabedaten."
   },
   {
    "q": "Welche Eigenschaft muss ein kryptografischer Hash haben?",
    "o": [
     {
      "t": "Kollisionsresistenz: verschiedene Eingaben ergeben verschiedene Hashes",
      "ok": true
     },
     {
      "t": "Er muss jederzeit wieder umkehrbar sein",
      "ok": false
     },
     {
      "t": "Er muss immer genau 8 Byte lang sein",
      "ok": false
     },
     {
      "t": "Er muss selbst verschlüsselt vorliegen",
      "ok": false
     }
    ],
    "e": "Ein sicherer Hash ist kollisionsresistent, einwegig (nicht umkehrbar) und sensitiv gegenüber Änderungen."
   },
   {
    "q": "Wofür steht SHA?",
    "o": [
     {
      "t": "Secure Hash Algorithm",
      "ok": true
     },
     {
      "t": "Symmetric Hash Authentication",
      "ok": false
     },
     {
      "t": "Security Handshake Algorithm",
      "ok": false
     },
     {
      "t": "Standard Hash Assignment",
      "ok": false
     }
    ],
    "e": "SHA (z. B. SHA-256, SHA-3) ist der verbreitete Standard für kryptografische Hashfunktionen."
   },
   {
    "q": "Was ist der Unterschied zwischen Verschlüsselung und Hashing?",
    "o": [
     {
      "t": "Verschlüsselung ist mit Schlüssel umkehrbar, Hashing ist einwegig",
      "ok": true
     },
     {
      "t": "Hashing gilt grundsätzlich als sicherer als Verschlüsselung",
      "ok": false
     },
     {
      "t": "Beide Verfahren sind funktional völlig identisch",
      "ok": false
     },
     {
      "t": "Verschlüsselung ist ein nicht umkehrbarer Vorgang",
      "ok": false
     }
    ],
    "e": "Verschlüsselung schützt Vertraulichkeit (mit Schlüssel umkehrbar); Hash prüft Integrität (nicht umkehrbar)."
   },
   {
    "q": "Wozu wird ein Salt beim Passwort-Hashing verwendet?",
    "o": [
     {
      "t": "Um gleiche Passwörter unterschiedlich zu hashen und Rainbow-Tables zu erschweren",
      "ok": true
     },
     {
      "t": "Um das Passwort zusätzlich zu verschlüsseln",
      "ok": false
     },
     {
      "t": "Um den erzeugten Hashwert kürzer zu machen",
      "ok": false
     },
     {
      "t": "Um den Hash-Algorithmus automatisch zu wechseln",
      "ok": false
     }
    ],
    "e": "Ein zufälliger Salt pro Passwort macht Rainbow-Tables (vorberechnete Hashwerte) wertlos."
   },
   {
    "q": "Was ist Diffie-Hellman?",
    "o": [
     { "t": "Ein Verfahren zum sicheren Schlüsselaustausch über unsichere Kanäle", "ok": true },
     { "t": "Ein asymmetrisches Verschlüsselungsverfahren für große Datenmengen", "ok": false },
     { "t": "Ein Signaturverfahren zum Nachweis der Identität des Absenders", "ok": false },
     { "t": "Ein Protokoll zur automatischen Verteilung von Zertifikaten", "ok": false }
    ],
    "e": "Diffie-Hellman ermöglicht zwei Parteien, über ein unsicheres Medium einen gemeinsamen Schlüssel zu vereinbaren — ohne ihn zu übertragen."
   },
   {
    "q": "Was prüft man bei einem Zertifikat, bevor man ihm vertraut?",
    "o": [
     {
      "t": "Gültigkeit, CA-Signatur und Widerrufsstatus (CRL/OCSP)",
      "ok": true
     },
     {
      "t": "Ausschließlich die IP-Adresse des Servers",
      "ok": false
     },
     {
      "t": "Nur den enthaltenen öffentlichen Schlüssel",
      "ok": false
     },
     {
      "t": "Die Dateigröße des Zertifikats in Byte",
      "ok": false
     }
    ],
    "e": "Drei Checks: zeitlich gültig, von vertrauenswürdiger CA signiert, nicht widerrufen."
   },
   {
    "q": "Was bedeutet Ende-zu-Ende-Verschlüsselung?",
    "o": [
     {
      "t": "Nur Sender und Empfänger können die Daten entschlüsseln",
      "ok": true
     },
     {
      "t": "Daten werden nur auf dem Server verschlüsselt",
      "ok": false
     },
     {
      "t": "Nur der Transportweg ist verschlüsselt",
      "ok": false
     },
     {
      "t": "Die Daten werden mehrfach verschlüsselt",
      "ok": false
     }
    ],
    "e": "Bei E2E-Verschlüsselung hat kein Zwischenknoten Zugriff auf die Klartextdaten."
   },
   {
    "q": "Welches Verfahren nutzt HTTPS für den Schlüsselaustausch?",
    "o": [
     {
      "t": "Asymmetrisch für den Austausch, dann symmetrisch (AES) für die Daten",
      "ok": true
     },
     {
      "t": "Ausschließlich symmetrische Verschlüsselung für alles",
      "ok": false
     },
     {
      "t": "Ausschließlich asymmetrische Verschlüsselung für alles",
      "ok": false
     },
     {
      "t": "Es ist gar kein Schlüsselaustausch erforderlich",
      "ok": false
     }
    ],
    "e": "HTTPS ist ein klassisches hybrides Verfahren: asymmetrisch für den Sitzungsschlüssel, AES für die Daten."
   },
   {
    "q": "Was ist eine Intermediate CA?",
    "o": [
     { "t": "Eine Zwischenzertifizierungsstelle zwischen Root-CA und End-Entity-Zertifikat", "ok": true },
     { "t": "Eine Ersatz-CA, die einspringt, wenn die Root-CA kompromittiert wurde", "ok": false },
     { "t": "Eine Übergangs-CA, die abgelaufene Zertifikate bis zum Austausch verlängert", "ok": false },
     { "t": "Eine externe Prüfstelle, die die Arbeit der Root-CA regelmäßig auditiert", "ok": false }
    ],
    "e": "Intermediate CAs ermöglichen skalierbare PKI: die Root-CA bleibt offline; Intermediate CAs stellen Endnutzerzertifikate aus."
   },
   {
    "q": "Welchen Vorteil hat asymmetrische Verschlüsselung gegenüber symmetrischer?",
    "o": [
     { "t": "Kein sicherer Vorkanal nötig — der öffentliche Schlüssel darf frei verteilt werden", "ok": true },
     { "t": "Deutlich schnellere Ver- und Entschlüsselung auch bei großen Datenmengen", "ok": false },
     { "t": "Die Schlüssel sind kürzer und benötigen dadurch weniger Speicher und Rechenzeit", "ok": false },
     { "t": "Kompromittierte Schlüssel lassen sich ohne Neuausstellung wieder absichern", "ok": false }
    ],
    "e": "Das zentrale Problem der Schlüsselverteilung entfällt: der Public Key kann offen geteilt werden."
   },
   {
    "q": "Was ist ein Self-Signed Certificate?",
    "o": [
     {
      "t": "Ein Zertifikat, das von seiner eigenen CA signiert wurde",
      "ok": true
     },
     {
      "t": "Ein bereits abgelaufenes, ungültiges Zertifikat",
      "ok": false
     },
     {
      "t": "Ein Zertifikat ganz ohne Ablaufdatum",
      "ok": false
     },
     {
      "t": "Ein kostenloser, öffentlich gehosteter Webserver",
      "ok": false
     }
    ],
    "e": "Self-Signed Certs sind für Tests/intern nützlich, werden von Browsern standardmäßig nicht vertraut."
   },
   {
    "q": "Was ist Verschlüsselung?",
    "o": [
     { "t": "Umwandlung von Klartext in unlesbaren Chiffretext, der nur mit dem passenden Schlüssel wieder lesbar wird", "ok": true },
     { "t": "Das verlustfreie Komprimieren von Daten, um Speicherplatz und Übertragungszeit einzusparen", "ok": false },
     { "t": "Das Berechnen einer festen Prüfsumme, aus der sich die Originaldaten wiederherstellen lassen", "ok": false },
     { "t": "Das Kodieren von Daten in ein anderes Format wie Base64, um sie transportfähig zu machen", "ok": false }
    ],
    "e": "Verschlüsselung wandelt Klartext per Algorithmus und Schlüssel in Chiffretext um — umkehrbar nur mit Schlüssel. Kompression, Hashing und Encoding sind etwas anderes: Encoding (z. B. Base64) ist ohne Schlüssel umkehrbar, Hashing gar nicht."
   },
   {
    "q": "Was ist eine PKI (Public-Key-Infrastruktur)?",
    "o": [
     { "t": "Ein System aus Rollen, Regeln und Komponenten zum Erstellen, Verteilen, Prüfen und Widerrufen digitaler Zertifikate", "ok": true },
     { "t": "Ein zentraler Verzeichnisdienst, der alle privaten Schlüssel der Teilnehmer sicher speichert und verteilt", "ok": false },
     { "t": "Ein symmetrisches Verschlüsselungsverfahren, das ohne Schlüsselaustausch zwischen den Parteien auskommt", "ok": false },
     { "t": "Ein Netzwerkprotokoll, das öffentliche Schlüssel automatisch per Broadcast an alle Clients verteilt", "ok": false }
    ],
    "e": "Die PKI verwaltet den Lebenszyklus digitaler Zertifikate und bindet öffentliche Schlüssel vertrauenswürdig an Identitäten. Private Schlüssel verlassen ihren Besitzer nie — das ist der Kern des Modells."
   },
   {
    "q": "Welche Komponenten umfasst eine PKI typischerweise?",
    "o": [
     { "t": "CA (Zertifizierungsstelle), RA (Registrierungsstelle), X.509-Zertifikate, Verzeichnisdienst und Sperrmechanismus (CRL/OCSP)", "ok": true },
     { "t": "Schlüsselgenerator, Passwort-Tresor, zentrale Klartext-Datenbank und ein Backup-Server für private Schlüssel", "ok": false },
     { "t": "RADIUS-Server, DHCP-Relay, DNS-Resolver und ein NTP-Zeitserver für die Zertifikatssynchronisation", "ok": false },
     { "t": "Firewall, IDS, Proxy-Server und ein VPN-Gateway zur Absicherung der Zertifikatsübertragung", "ok": false }
    ],
    "e": "Kern der PKI: CA signiert Zertifikate, RA prüft die Identität der Antragsteller, X.509-Zertifikate binden Schlüssel an Identitäten, CRL/OCSP melden widerrufene Zertifikate."
   },
   {
    "q": "Was ist ein PSK (Pre-Shared Key)?",
    "o": [
     { "t": "Ein im Voraus auf beiden Seiten hinterlegter gemeinsamer Schlüssel für symmetrische Authentifizierung und Verschlüsselung", "ok": true },
     { "t": "Ein öffentlicher Schlüssel, der vor dem Verbindungsaufbau aus dem Zertifikat der Gegenstelle gelesen wird", "ok": false },
     { "t": "Ein einmaliger Sitzungsschlüssel, den der Server bei jedem Verbindungsaufbau neu generiert und zusendet", "ok": false },
     { "t": "Ein Algorithmus, der zwei Parteien ohne vorherigen Kontakt einen gemeinsamen Schlüssel aushandeln lässt", "ok": false }
    ],
    "e": "Ein PSK ist ein vorab geteiltes Geheimnis, das beide Seiten schon kennen — kein Zertifikat, kein Austausch zur Laufzeit. Eingesetzt z. B. bei WPA2/WPA3-Personal und IPsec-Authentifizierung. Der letzte Distraktor beschreibt Diffie-Hellman."
   },
   {
    "q": "Was ist SSL/TLS und wofür wird es verwendet?",
    "o": [
     { "t": "Ein Protokoll zur verschlüsselten, authentifizierten Absicherung von Verbindungen — die Grundlage von HTTPS", "ok": true },
     { "t": "Ein Verfahren zur Absicherung von E-Mails auf dem Server, das Nachrichten dauerhaft verschlüsselt ablegt", "ok": false },
     { "t": "Ein Tunnelprotokoll auf Schicht 2, das komplette Netzwerke über das Internet miteinander koppelt", "ok": false },
     { "t": "Ein Authentifizierungsdienst, der Benutzeranmeldungen zentral über einen Verzeichnisserver abwickelt", "ok": false }
    ],
    "e": "SSL ist der veraltete Vorgänger von TLS. TLS sichert Verbindungen per Verschlüsselung, Serverauthentifizierung (Zertifikat) und Integritätsschutz — Transportverschlüsselung, keine Speicherverschlüsselung."
   },
   {
    "q": "Warum ist eine sichere HTTPS-Verbindung (TLS) wichtig?",
    "o": [
     { "t": "Sie schützt übertragene Daten vor Mitlesen und Manipulation und weist die Identität des Servers per Zertifikat nach", "ok": true },
     { "t": "Sie verschlüsselt die Daten auch nach der Übertragung dauerhaft auf dem Server und schützt so vor Datenlecks", "ok": false },
     { "t": "Sie anonymisiert die eigene IP-Adresse gegenüber dem Server und verhindert so jedes Tracking durch Webseiten", "ok": false },
     { "t": "Sie prüft die aufgerufene Webseite automatisch auf Schadcode und blockiert infizierte Inhalte vor dem Laden", "ok": false }
    ],
    "e": "HTTPS sichert den Transportweg: kein Abhören, keine Manipulation, Servernachweis per Zertifikat. Es schützt nicht die Daten auf dem Server, anonymisiert nicht und prüft keinen Schadcode."
   }
  ]
 },
 "vpn": {
  "name": "VPN & IPsec",
  "q": [
   {
    "q": "Was ist die Grundidee eines VPN?",
    "o": [
     { "t": "Ein verschlüsselter Tunnel durch ein unsicheres Netz", "ok": true },
     { "t": "Eine dedizierte Standleitung zwischen zwei Standorten", "ok": false },
     { "t": "Ein Proxy, der Webanfragen stellvertretend ausführt", "ok": false },
     { "t": "Ein getrenntes Funknetz für vertrauliche Endgeräte", "ok": false }
    ],
    "e": "VPN baut über ein öffentliches Netz einen sicheren, verschlüsselten Tunnel zum Zielnetz auf."
   },
   {
    "q": "Auf welcher OSI-Schicht arbeitet IPsec?",
    "o": [
     {
      "t": "Schicht 3 (Vermittlung)",
      "ok": true
     },
     {
      "t": "Schicht 2 (Sicherung)",
      "ok": false
     },
     {
      "t": "Schicht 4 (Transport)",
      "ok": false
     },
     {
      "t": "Schicht 7 (Anwendung)",
      "ok": false
     }
    ],
    "e": "IPsec sichert auf der Netzwerkschicht (L3) den IP-Verkehr."
   },
   {
    "q": "Was verschlüsselt der IPsec-Transportmodus?",
    "o": [
     {
      "t": "Nur den Dateninhalt (Payload) des IP-Pakets",
      "ok": true
     },
     {
      "t": "Das gesamte Paket samt einem neuen Header",
      "ok": false
     },
     {
      "t": "Ausschließlich den ursprünglichen IP-Header",
      "ok": false
     },
     {
      "t": "Gar nichts, es bleibt alles im Klartext",
      "ok": false
     }
    ],
    "e": "Transportmodus schützt die Nutzdaten; der originale IP-Header bleibt sichtbar."
   },
   {
    "q": "Was verschlüsselt der IPsec-Tunnelmodus?",
    "o": [
     { "t": "Das komplette IP-Paket, verpackt in ein neues IP-Paket", "ok": true },
     { "t": "Nur die Nutzdaten, der originale IP-Header bleibt sichtbar", "ok": false },
     { "t": "Nur die Header-Informationen, die Nutzdaten bleiben lesbar", "ok": false },
     { "t": "Die Aushandlungsdaten der Verbindung, nicht den Datenstrom", "ok": false }
    ],
    "e": "Tunnelmodus kapselt das gesamte Originalpaket und setzt einen neuen IP-Header davor."
   },
   {
    "q": "Wofür wird der Transportmodus typischerweise eingesetzt?",
    "o": [
     {
      "t": "Ende-zu-Ende / Host-zu-Host-Verbindungen",
      "ok": true
     },
     {
      "t": "Site-to-Site zwischen zwei Netzen",
      "ok": false
     },
     {
      "t": "Für WLAN-Passwörter",
      "ok": false
     },
     {
      "t": "Für DNS-Auflösung",
      "ok": false
     }
    ],
    "e": "Transportmodus passt zu direkten Host-zu-Host-Verbindungen."
   },
   {
    "q": "Wofür wird der Tunnelmodus typischerweise eingesetzt?",
    "o": [
     {
      "t": "Site-to-Site-VPN Gateway zu Gateway",
      "ok": true
     },
     {
      "t": "Reine Host-zu-Host-Verschlüsselung",
      "ok": false
     },
     {
      "t": "Automatische DHCP-Adressvergabe",
      "ok": false
     },
     {
      "t": "Filterung anhand von MAC-Adressen",
      "ok": false
     }
    ],
    "e": "Tunnelmodus verbindet ganze Netze über Gateways (Site-to-Site)."
   },
   {
    "q": "Wofür steht ESP bei IPsec?",
    "o": [
     {
      "t": "Encapsulating Security Payload",
      "ok": true
     },
     {
      "t": "Encrypted Session Protocol",
      "ok": false
     },
     {
      "t": "External Security Provider",
      "ok": false
     },
     {
      "t": "Ethernet Secure Path",
      "ok": false
     }
    ],
    "e": "ESP kapselt und verschlüsselt die Nutzdaten und sichert deren Integrität."
   },
   {
    "q": "Welche Aufgabe hat IKE (Internet Key Exchange) bei IPsec?",
    "o": [
     {
      "t": "Aushandeln der Schlüssel und Sicherheitsparameter",
      "ok": true
     },
     {
      "t": "Verschlüsseln der Nutzdaten selbst",
      "ok": false
     },
     {
      "t": "Vergabe von IP-Adressen",
      "ok": false
     },
     {
      "t": "Namensauflösung",
      "ok": false
     }
    ],
    "e": "IKE handelt Schlüssel und Sicherheitsassoziationen (SA) für die IPsec-Verbindung aus."
   },
   {
    "q": "Was verbindet ein Site-to-Site-VPN (LAN-to-LAN)?",
    "o": [
     {
      "t": "Zwei komplette Netzwerke über das Internet",
      "ok": true
     },
     {
      "t": "Zwei einzelne Programme",
      "ok": false
     },
     {
      "t": "Einen Client mit einer Webseite",
      "ok": false
     },
     {
      "t": "Zwei DNS-Server",
      "ok": false
     }
    ],
    "e": "Site-to-Site koppelt ganze Standortnetze, z. B. Zentrale und Filiale."
   },
   {
    "q": "Was kennzeichnet ein Remote-Access-VPN?",
    "o": [
     {
      "t": "Einzelne Clients verbinden sich mit dem Firmennetz",
      "ok": true
     },
     {
      "t": "Zwei Rechenzentren werden gekoppelt",
      "ok": false
     },
     {
      "t": "Es ist immer unverschlüsselt",
      "ok": false
     },
     {
      "t": "Es ersetzt die Firewall",
      "ok": false
     }
    ],
    "e": "Remote Access = einzelner Client (z. B. Außendienst) ins Firmennetz."
   },
   {
    "q": "Wie authentifizieren sich Clients bei einem VPN typischerweise?",
    "o": [
     {
      "t": "Über Benutzername/Passwort oder Zertifikate",
      "ok": true
     },
     {
      "t": "Über die TTL",
      "ok": false
     },
     {
      "t": "Über die Portnummer",
      "ok": false
     },
     {
      "t": "Gar nicht",
      "ok": false
     }
    ],
    "e": "Übliche VPN-Authentifizierung: Zugangsdaten und/oder digitale Zertifikate."
   },
   {
    "q": "Was bedeutet Split Tunneling?",
    "o": [
     {
      "t": "Nur bestimmter Verkehr geht durch den Tunnel, der Rest direkt ins Internet",
      "ok": true
     },
     {
      "t": "Der gesamte Verkehr geht durch den Tunnel",
      "ok": false
     },
     {
      "t": "Es werden zwei Tunnel parallel genutzt",
      "ok": false
     },
     {
      "t": "Der Tunnel wird geteilt verschlüsselt",
      "ok": false
     }
    ],
    "e": "Beim Split Tunneling läuft nur der Firmenverkehr durch das VPN, übriger Traffic geht direkt."
   },
   {
    "q": "Was bedeutet Full/Closed Tunneling?",
    "o": [
     {
      "t": "Der gesamte Verkehr wird durch den VPN-Tunnel geleitet",
      "ok": true
     },
     {
      "t": "Nur Firmenverkehr durch den Tunnel",
      "ok": false
     },
     {
      "t": "Kein Verkehr wird getunnelt",
      "ok": false
     },
     {
      "t": "Nur DNS geht durch den Tunnel",
      "ok": false
     }
    ],
    "e": "Beim Full/Closed Tunneling geht aller Traffic durch das VPN — mehr Kontrolle, mehr Last."
   },
   {
    "q": "Welcher Vorteil spricht für Split Tunneling?",
    "o": [
     {
      "t": "Weniger Last auf dem VPN, schnellerer Internetzugriff",
      "ok": true
     },
     {
      "t": "Maximale Sicherheit für allen Verkehr",
      "ok": false
     },
     {
      "t": "Keine Konfiguration nötig",
      "ok": false
     },
     {
      "t": "Es verschlüsselt doppelt",
      "ok": false
     }
    ],
    "e": "Split entlastet das VPN, ist aber weniger streng, da Nicht-Firmenverkehr ungetunnelt läuft."
   },
   {
    "q": "Welcher Nachteil spricht gegen Split Tunneling?",
    "o": [
     { "t": "Geringere Kontrolle/Sicherheit für den nicht getunnelten Verkehr", "ok": true },
     { "t": "Deutlich höhere Last auf dem VPN-Gateway durch doppelten Verkehr", "ok": false },
     { "t": "Interne Dienste sind nur mit spürbarer Verzögerung erreichbar", "ok": false },
     { "t": "Der Client benötigt für jeden Tunnel eine eigene Netzwerkkarte", "ok": false }
    ],
    "e": "Der direkt geroutete Verkehr entzieht sich der zentralen VPN-Kontrolle."
   },
   {
    "q": "Was ist RDP (Remote Desktop Protocol)?",
    "o": [
     { "t": "Ein Protokoll zur grafischen Fernsteuerung eines Rechners", "ok": true },
     { "t": "Ein Protokoll für textbasierte Fernwartung per Kommandozeile", "ok": false },
     { "t": "Ein Protokoll zum verschlüsselten Dateitransfer zwischen Servern", "ok": false },
     { "t": "Ein Verzeichnisdienst-Protokoll für zentrale Benutzeranmeldungen", "ok": false }
    ],
    "e": "RDP überträgt Bildschirm/Eingaben zur grafischen Fernwartung (Port 3389)."
   },
   {
    "q": "Welche Rolle hat ein Remote-Desktop-Gateway?",
    "o": [
     { "t": "Kontrollierter, gesicherter Zugangspunkt für RDP von außen", "ok": true },
     { "t": "Ein Lastverteiler, der Sitzungen auf mehrere Terminalserver verteilt", "ok": false },
     { "t": "Ein Server, der RDP-Sitzungen aufzeichnet und revisionssicher archiviert", "ok": false },
     { "t": "Ein Proxy, der RDP-Verkehr komprimiert und dadurch beschleunigt", "ok": false }
    ],
    "e": "Das RD-Gateway bündelt und sichert externe RDP-Zugriffe ins interne Netz."
   },
   {
    "q": "Warum ist ein VPN über öffentliches WLAN sinnvoll?",
    "o": [
     { "t": "Es verschlüsselt den Verkehr gegen Mitlesen im offenen Netz", "ok": true },
     { "t": "Es erzwingt WPA3-Verschlüsselung auch auf offenen Access Points", "ok": false },
     { "t": "Es verbirgt das eigene Gerät vollständig vor dem Hotspot-Betreiber", "ok": false },
     { "t": "Es verhindert, dass andere Clients das offene WLAN überlasten", "ok": false }
    ],
    "e": "Im offenen WLAN schützt der VPN-Tunnel vor Mitlesen/Manipulation."
   },
   {
    "q": "Welche drei Schutzziele deckt IPsec ab?",
    "o": [
     {
      "t": "Verschlüsselung, Authentifizierung, Integrität",
      "ok": true
     },
     {
      "t": "Routing, Switching, Bridging",
      "ok": false
     },
     {
      "t": "Geschwindigkeit, Reichweite, Kosten",
      "ok": false
     },
     {
      "t": "Nur Verschlüsselung",
      "ok": false
     }
    ],
    "e": "IPsec bietet Vertraulichkeit (Verschlüsselung), Authentifizierung und Integrität."
   },
   {
    "q": "Was passiert im Tunnelmodus mit dem ursprünglichen IP-Header?",
    "o": [
     { "t": "Er wird mitverschlüsselt und durch einen neuen Header ersetzt", "ok": true },
     { "t": "Er bleibt außen sichtbar, nur die Nutzdaten werden geschützt", "ok": false },
     { "t": "Er wird verworfen und am Zielgateway aus der Routingtabelle neu erzeugt", "ok": false },
     { "t": "Er wird in den ESP-Trailer kopiert und dort integritätsgesichert", "ok": false }
    ],
    "e": "Der Originalheader wird Teil der geschützten Nutzlast; außen sitzt ein neuer IP-Header."
   },
   {
    "q": "Welche Verbindung ist typisch für Site-to-End (z. B. Homeoffice)?",
    "o": [
     {
      "t": "Ein Client verbindet sich mit einer festen Gegenstelle (Firmenrouter)",
      "ok": true
     },
     {
      "t": "Zwei Rechenzentren werden dauerhaft gekoppelt",
      "ok": false
     },
     {
      "t": "Zwei einzelne Endgeräte verbinden sich direkt",
      "ok": false
     },
     {
      "t": "Ein reiner LAN-Broadcast im lokalen Netz",
      "ok": false
     }
    ],
    "e": "Site-to-End ähnelt Remote Access, mit Fokus auf eine feste Gegenstelle (Homeoffice ↔ Firmenrouter)."
   },
   {
    "q": "Was ist der Unterschied zwischen Site-to-Site und Remote-Access-VPN?",
    "o": [
     { "t": "Site-to-Site verbindet ganze Netze; Remote-Access einzelne Clients mit dem Firmennetz", "ok": true },
     { "t": "Site-to-Site verbindet einzelne Clients; Remote-Access koppelt komplette Standortnetze", "ok": false },
     { "t": "Site-to-Site braucht auf jedem Endgerät einen Client; Remote-Access nur ein Gateway", "ok": false },
     { "t": "Site-to-Site läuft unverschlüsselt im eigenen WAN; Remote-Access verschlüsselt im Internet", "ok": false }
    ],
    "e": "Site-to-Site: Netz↔Netz (z. B. Zentrale↔Filiale). Remote Access: Außendienstler ins Firmennetz."
   },
   {
    "q": "Welche Protokolle bilden zusammen den IPsec-Standard?",
    "o": [
     {
      "t": "AH (Authentication Header) und ESP (Encapsulating Security Payload)",
      "ok": true
     },
     {
      "t": "TCP (Transmission Control) und UDP (User Datagram)",
      "ok": false
     },
     {
      "t": "TLS (Transport Layer) und DTLS (Datagram TLS)",
      "ok": false
     },
     {
      "t": "L2TP (Layer 2 Tunneling) und PPTP (Point-to-Point)",
      "ok": false
     }
    ],
    "e": "IPsec nutzt AH (Authentifizierung) und/oder ESP (Verschlüsselung + Authentifizierung)."
   },
   {
    "q": "Was ist L2TP?",
    "o": [
     {
      "t": "Layer 2 Tunneling Protocol, oft mit IPsec kombiniert",
      "ok": true
     },
     {
      "t": "Ein dynamisches Routingprotokoll für IP-Netze",
      "ok": false
     },
     {
      "t": "Ein symmetrischer Verschlüsselungsalgorithmus",
      "ok": false
     },
     {
      "t": "Ein Sicherheitsstandard für WLAN-Netze",
      "ok": false
     }
    ],
    "e": "L2TP erstellt den Tunnel (Layer 2), IPsec liefert die Verschlüsselung — oft kombiniert für VPN-Clients."
   },
   {
    "q": "Was ist OpenVPN?",
    "o": [
     { "t": "Ein Open-Source-VPN-Protokoll auf TLS-Basis, sehr flexibel und weit verbreitet", "ok": true },
     { "t": "Ein herstellergebundenes Protokoll, das nur mit passender Hardware-Appliance läuft", "ok": false },
     { "t": "Ein Betriebsmodus von IPsec, der ohne Zertifikate und Schlüsselaustausch auskommt", "ok": false },
     { "t": "Ein Browser-Plugin, das Webverkehr über wechselnde Proxyserver umleitet", "ok": false }
    ],
    "e": "OpenVPN nutzt TLS für den Tunnel und ist plattformunabhängig und sehr konfigurierbar."
   },
   {
    "q": "Welchen Vorteil bietet Full Tunneling gegenüber Split Tunneling?",
    "o": [
     { "t": "Aller Verkehr läuft durch das VPN — maximale Kontrolle und Sicherheit", "ok": true },
     { "t": "Nur Firmenverkehr wird getunnelt — das Gateway bleibt dauerhaft entlastet", "ok": false },
     { "t": "Internetzugriffe werden schneller, weil Anfragen direkt ins Netz gehen", "ok": false },
     { "t": "Die Verschlüsselung entfällt für interne Ziele — weniger Rechenaufwand", "ok": false }
    ],
    "e": "Full Tunnel bietet vollständige Überwachung und Filterung — aber höhere Last auf dem VPN-Gateway."
   },
   {
    "q": "Was ist ein Kill Switch bei einem VPN-Client?",
    "o": [
     { "t": "Blockiert automatisch den Internetzugriff, falls die VPN-Verbindung abbricht", "ok": true },
     { "t": "Trennt die VPN-Verbindung automatisch nach einer festgelegten Leerlaufzeit", "ok": false },
     { "t": "Wechselt bei Ausfall eines VPN-Servers selbstständig auf den nächsten Standort", "ok": false },
     { "t": "Beendet verdächtige Anwendungen, die den Tunnel zu umgehen versuchen", "ok": false }
    ],
    "e": "Der Kill Switch verhindert, dass bei VPN-Abbruch unverschlüsselter Verkehr unbemerkt ins offene Netz geht."
   },
   {
    "q": "Was beschreibt 'Split DNS' im VPN-Kontext?",
    "o": [
     { "t": "Interne Domainnamen werden intern aufgelöst, externe über den normalen DNS", "ok": true },
     { "t": "DNS-Anfragen werden auf zwei Server verteilt, um Ausfälle abzufangen", "ok": false },
     { "t": "Sämtliche DNS-Anfragen laufen grundsätzlich durch den VPN-Tunnel", "ok": false },
     { "t": "Interne Namen werden im Klartext, externe verschlüsselt aufgelöst", "ok": false }
    ],
    "e": "Split DNS kombiniert sich oft mit Split Tunneling: interne Namen werden über den Tunnel aufgelöst."
   },
   {
    "q": "Was ist IKEv2?",
    "o": [
     { "t": "Eine modernere, schnellere Version des IKE-Schlüsselaustauschprotokolls für IPsec", "ok": true },
     { "t": "Die zweite Verschlüsselungsschicht, die IPsec zusätzlich über ESP legt", "ok": false },
     { "t": "Ein Nachfolger von OpenVPN, der TLS durch eigene Verfahren ersetzt", "ok": false },
     { "t": "Ein Kompatibilitätsmodus, der IPsec-Tunnel über reine TCP-Verbindungen führt", "ok": false }
    ],
    "e": "IKEv2 ist stabiler, schneller bei Verbindungswechseln (Mobility) und gilt als sicherer als IKEv1."
   },
   {
    "q": "Was ist der Hauptzweck von ESP in IPsec?",
    "o": [
     {
      "t": "Verschlüsselung und Integritätssicherung der Nutzdaten",
      "ok": true
     },
     {
      "t": "Nur Authentifizierung ohne Verschlüsselung",
      "ok": false
     },
     {
      "t": "Schlüsselaustausch",
      "ok": false
     },
     {
      "t": "Routing der Pakete",
      "ok": false
     }
    ],
    "e": "ESP (Encapsulating Security Payload) liefert Vertraulichkeit (Verschlüsselung) und Integrität."
   },
   {
    "q": "Welche Protokolle übernehmen das Key Management beim Aufbau einer IPsec-Verbindung?",
    "o": [
     { "t": "IKE auf Basis von ISAKMP — handelt Schlüssel und Security Associations aus, meist per Diffie-Hellman", "ok": true },
     { "t": "Kerberos in Kombination mit LDAP — verteilt Tickets und Sitzungsschlüssel über den Verzeichnisdienst", "ok": false },
     { "t": "TLS-Handshake mit OCSP-Abfrage — tauscht die Sitzungsschlüssel über das Serverzertifikat aus", "ok": false },
     { "t": "RADIUS zusammen mit TACACS+ — übernimmt Authentifizierung und Schlüsselverteilung zentral", "ok": false }
    ],
    "e": "IKE (auf dem ISAKMP-Rahmenwerk aufbauend) handelt vor dem Datentransfer Schlüssel und Security Associations aus, typischerweise mit Diffie-Hellman. Kerberos/LDAP, TLS und RADIUS sind echte Protokolle — aber nicht das Key Management von IPsec."
   }
  ]
 },
 "vlan": {
  "name": "VLAN-Segmentierung",
  "q": [
   {
    "q": "Welche der folgenden Gründe sprechen für die Aufteilung eines physischen Netzes in mehrere VLANs?",
    "o": [
     { "t": "Eindämmung von Broadcast-Domänen, logische Trennung von Abteilungen, feinere Sicherheits und Zugriffskontrolle", "ok": true },
     { "t": "Höhere physische Kabelbandbreite, geringerer Stromverbrauch der Switches und automatische IP-Vergabe", "ok": false },
     { "t": "Verzicht auf Router, direkte Layer-2-Kommunikation zwischen allen Segmenten und wegfallende MAC-Adressen", "ok": false },
     { "t": "Automatische Verschlüsselung des Verkehrs, integrierter Virenschutz und redundante Stromversorgung", "ok": false }
    ],
    "e": "VLANs verkleinern Broadcast-Domänen, trennen Bereiche logisch ohne separate Hardware und erlauben gezielte Zugriffsregeln zwischen Segmenten. Bandbreite, Strom und Verschlüsselung gehören nicht dazu."
   },
   {
    "q": "VLAN-Zuordnung kann statisch oder dynamisch erfolgen. Welche Gegenüberstellung von Vor- und Nachteil trifft zu?",
    "o": [
     { "t": "Statisch (portbasiert): einfach und vorhersehbar, aber pflegeaufwändig bei Umzügen. Dynamisch (MAC-/regelbasiert): flexibel bei wechselnden Endgeräten, aber komplexer und abhängig von einer zentralen Datenbank", "ok": true },
     { "t": "Statisch (portbasiert): passt sich selbsttätig an jeden Gerätewechsel an, aber dadurch schwer kontrollierbar. Dynamisch (MAC-/regelbasiert): fest an den Switch-Port gebunden, dafür aber besonders wartungsarm und stabil", "ok": false },
     { "t": "Statisch (portbasiert): benötigt zwingend einen zentralen RADIUS-Server, dafür sehr schnell. Dynamisch (MAC-/regelbasiert): läuft völlig ohne Konfiguration, ist aber im Durchsatz deutlich langsamer", "ok": false },
     { "t": "Statisch (portbasiert): verschlüsselt den Verkehr automatisch, ist aber teuer im Betrieb. Dynamisch (MAC-/regelbasiert): überträgt unverschlüsselt, dafür aber kostenlos und lizenzfrei nutzbar", "ok": false }
    ],
    "e": "Statische (portbasierte) VLANs sind simpel und stabil, aber bei jedem Umzug muss der Port umkonfiguriert werden. Dynamische VLANs weisen anhand von MAC/Identität zu — flexibel für mobile Geräte, aber mit zentraler Datenbank (oft RADIUS) und mehr Komplexität als Preis."
   },
   {
    "q": "Warum sind dynamische VLANs in sicherheitskritischen Bereichen problematisch?",
    "o": [
     { "t": "Die Zuordnung hängt an Merkmalen wie der MAC-Adresse, die sich fälschen lassen, ein Angreifer kann sich so in ein fremdes VLAN einordnen lassen", "ok": true },
     { "t": "Der gesamte Verkehr wird bei dynamischen VLANs grundsätzlich unverschlüsselt übertragen, während statische VLANs ihn automatisch per AES absichern", "ok": false },
     { "t": "Dynamische VLANs deaktivieren beim Zuweisen automatisch die Firewall des Switches und öffnen dabei alle gesperrten Ports für den Zeitraum", "ok": false },
     { "t": "Dynamische VLANs erlauben technisch maximal zwei Endgeräte pro Segment und sind deshalb bei mehr Teilnehmern schnell überlastet und instabil", "ok": false }
    ],
    "e": "Die dynamische Zuordnung stützt sich auf fälschbare Merkmale (v. a. MAC-Adressen). Per MAC-Spoofing kann sich ein Gerät als berechtigt ausgeben und in ein geschütztes VLAN gelangen. In sensiblen Zonen ist statische, portgebundene Zuordnung robuster."
   },
   {
    "q": "Was ist ein prinzipieller Nachteil der VLAN-Technologie?",
    "o": [
     { "t": "VLANs trennen nur auf Layer 2 für Kommunikation zwischen VLANs braucht es Routing, und Fehlkonfiguration oder VLAN-Hopping können die Trennung aushebeln", "ok": true },
     { "t": "VLANs benötigen für jedes einzelne Segment ein eigenes physisches Kabel und einen dedizierten Switch, was den Verkabelungsaufwand drastisch erhöht", "ok": false },
     { "t": "VLANs funktionieren ausschließlich in Verbindung mit IPv6 und sind zu bestehenden IPv4-Netzen grundsätzlich inkompatibel, was Migrationen blockiert", "ok": false },
     { "t": "VLANs begrenzen ein gesamtes Netz technisch hart auf maximal 16 Endgeräte und eignen sich deshalb nur für sehr kleine Arbeitsgruppen", "ok": false }
    ],
    "e": "Die logische Trennung ersetzt keine physische: Inter-VLAN-Verkehr braucht Routing, und die Isolation ist nur so gut wie die Konfiguration — Angriffe wie VLAN-Hopping oder Fehlkonfigurationen können sie durchbrechen."
   }
  ]
 },
 "security": {
  "name": "IT-Sicherheit Grundlagen",
  "q": [
   {
    "q": "Was ist die Hauptaufgabe einer Firewall?",
    "o": [
     { "t": "Netzwerkverkehr nach Regeln filtern und kontrollieren", "ok": true },
     { "t": "Schadsoftware auf den Endgeräten erkennen und entfernen", "ok": false },
     { "t": "Datenverkehr komprimieren und Übertragungen beschleunigen", "ok": false },
     { "t": "Netzwerkgeräte zentral konfigurieren und überwachen", "ok": false }
    ],
    "e": "Eine Firewall erlaubt oder blockiert Verkehr anhand definierter Regeln."
   },
   {
    "q": "Wie arbeitet ein einfacher Paketfilter?",
    "o": [
     {
      "t": "Er prüft einzelne Pakete anhand von IP, Port und Protokoll",
      "ok": true
     },
     {
      "t": "Er merkt sich komplette Verbindungszustände",
      "ok": false
     },
     {
      "t": "Er entschlüsselt den Inhalt",
      "ok": false
     },
     {
      "t": "Er vergibt MAC-Adressen",
      "ok": false
     }
    ],
    "e": "Der statische Paketfilter entscheidet pro Paket nach Kopfdaten (IP/Port/Protokoll)."
   },
   {
    "q": "Was kann eine Stateful-Firewall zusätzlich?",
    "o": [
     { "t": "Sie verfolgt den Verbindungszustand und lässt Antworten passieren", "ok": true },
     { "t": "Sie entschlüsselt den Datenverkehr und prüft Inhalte auf Schadcode", "ok": false },
     { "t": "Sie erkennt Angriffe per Signatur und sperrt die Quell-IP dauerhaft", "ok": false },
     { "t": "Sie authentifiziert jeden Benutzer, bevor Pakete weitergeleitet werden", "ok": false }
    ],
    "e": "Stateful Inspection kennt bestehende Verbindungen und erlaubt zugehörige Rückpakete gezielt."
   },
   {
    "q": "Was macht NAT (Network Address Translation)?",
    "o": [
     {
      "t": "Es übersetzt private in öffentliche IP-Adressen",
      "ok": true
     },
     {
      "t": "Es verschlüsselt den Verkehr",
      "ok": false
     },
     {
      "t": "Es signiert Pakete",
      "ok": false
     },
     {
      "t": "Es filtert Ports nach Inhalt",
      "ok": false
     }
    ],
    "e": "NAT bildet interne private Adressen auf eine (oder wenige) öffentliche Adresse ab."
   },
   {
    "q": "Ist NAT ein Sicherheitsmechanismus?",
    "o": [
     {
      "t": "Nein, es verbirgt interne Adressen nur als Nebeneffekt",
      "ok": true
     },
     {
      "t": "Ja, es ist eine vollwertige Firewall",
      "ok": false
     },
     {
      "t": "Nein, weil NAT nur die Datenübertragung beschleunigt und im lokalen LAN-Verkehr keine Funktion besitzt.",
      "ok": false
     },
     {
      "t": "Ja, es ersetzt Zugriffskontrolle",
      "ok": false
     }
    ],
    "e": "NAT ist primär zur Adressknappheit da; die Verschleierung interner IPs ist nur ein Nebeneffekt, kein echter Schutz."
   },
   {
    "q": "Wozu dient eine DMZ (Demilitarized Zone)?",
    "o": [
     { "t": "Ein abgetrennter Bereich für öffentlich erreichbare Server", "ok": true },
     { "t": "Ein isoliertes Testnetz für noch nicht freigegebene Software", "ok": false },
     { "t": "Ein Netzbereich, in dem Verkehr ungefiltert erlaubt ist", "ok": false },
     { "t": "Ein Reservesegment, das bei Ausfall des Hauptnetzes übernimmt", "ok": false }
    ],
    "e": "In der DMZ stehen z. B. Webserver, getrennt vom internen Netz — ein Angriff bleibt eingedämmt."
   },
   {
    "q": "Was beschreibt Zugriffskontrolle (Access Control)?",
    "o": [
     {
      "t": "Wer auf welche Ressourcen zugreifen darf",
      "ok": true
     },
     {
      "t": "Die Übertragungsgeschwindigkeit",
      "ok": false
     },
     {
      "t": "Die Kabellänge",
      "ok": false
     },
     {
      "t": "Die IP-Vergabe",
      "ok": false
     }
    ],
    "e": "Zugriffskontrolle regelt Berechtigungen auf Systeme, Daten und Dienste."
   },
   {
    "q": "Was besagt das Prinzip der geringsten Rechte (Least Privilege)?",
    "o": [
     {
      "t": "Jeder erhält nur die Rechte, die er wirklich braucht",
      "ok": true
     },
     {
      "t": "Alle haben Administratorrechte",
      "ok": false
     },
     {
      "t": "Rechte werden zufällig vergeben",
      "ok": false
     },
     {
      "t": "Niemand hat Rechte",
      "ok": false
     }
    ],
    "e": "Minimale nötige Rechte begrenzen den Schaden bei Missbrauch oder Kompromittierung."
   },
   {
    "q": "Welche drei Schutzziele bilden die klassische CIA-Triade?",
    "o": [
     {
      "t": "Vertraulichkeit, Integrität, Verfügbarkeit",
      "ok": true
     },
     {
      "t": "Routing, Switching, Bridging",
      "ok": false
     },
     {
      "t": "Kosten, Tempo, Reichweite",
      "ok": false
     },
     {
      "t": "Copy, Insert, Access",
      "ok": false
     }
    ],
    "e": "CIA = Confidentiality, Integrity, Availability (Vertraulichkeit, Integrität, Verfügbarkeit)."
   },
   {
    "q": "Was bedeutet Authentifizierung?",
    "o": [
     {
      "t": "Nachweis der eigenen Identität (z. B. per Passwort)",
      "ok": true
     },
     {
      "t": "Vergabe von Zugriffsrechten und Berechtigungen",
      "ok": false
     },
     {
      "t": "Verschlüsselung der übertragenen Daten",
      "ok": false
     },
     {
      "t": "Auflösung von Namen in IP-Adressen",
      "ok": false
     }
    ],
    "e": "Authentifizierung = Identität nachweisen; davon getrennt ist die Autorisierung (Rechtevergabe)."
   },
   {
    "q": "Was bedeutet Autorisierung?",
    "o": [
     { "t": "Festlegen, worauf eine authentifizierte Identität zugreifen darf", "ok": true },
     { "t": "Der Nachweis einer Identität durch Passwort, Token oder Biometrie", "ok": false },
     { "t": "Das Protokollieren aller Zugriffe für spätere Nachvollziehbarkeit", "ok": false },
     { "t": "Das Anlegen eines neuen Benutzerkontos durch den Administrator", "ok": false }
    ],
    "e": "Autorisierung regelt die Rechte nach erfolgreicher Authentifizierung."
   },
   {
    "q": "Was ist Zwei-Faktor-Authentifizierung (2FA)?",
    "o": [
     {
      "t": "Kombination zweier unabhängiger Nachweise (z. B. Passwort + Code)",
      "ok": true
     },
     {
      "t": "Zwei Passwörter direkt nacheinander eingeben",
      "ok": false
     },
     {
      "t": "Zwei Firewalls hintereinander schalten",
      "ok": false
     },
     {
      "t": "Zwei IP-Adressen gleichzeitig verwenden",
      "ok": false
     }
    ],
    "e": "2FA verbindet zwei Faktoren aus Wissen, Besitz oder Biometrie."
   },
   {
    "q": "Wie kann eine Firewall gezielt einen Dienst sperren?",
    "o": [
     {
      "t": "Durch Blockieren des zugehörigen Ports",
      "ok": true
     },
     {
      "t": "Durch Löschen der MAC-Adresse",
      "ok": false
     },
     {
      "t": "Durch Ändern der TTL",
      "ok": false
     },
     {
      "t": "Durch DNS-Caching",
      "ok": false
     }
    ],
    "e": "Regeln auf Portbasis (z. B. Port 23 sperren) unterbinden den jeweiligen Dienst."
   },
   {
    "q": "Was ist eine Whitelist bei der Zugriffskontrolle?",
    "o": [
     {
      "t": "Nur explizit erlaubte Elemente werden zugelassen",
      "ok": true
     },
     {
      "t": "Alles ist erlaubt außer Gesperrtes",
      "ok": false
     },
     {
      "t": "Eine Liste aller IP-Adressen",
      "ok": false
     },
     {
      "t": "Eine Verschlüsselungsliste",
      "ok": false
     }
    ],
    "e": "Whitelist = 'default deny', nur Freigegebenes ist erlaubt (strenger als Blacklist)."
   },
   {
    "q": "Was ist eine Blacklist bei der Zugriffskontrolle?",
    "o": [
     { "t": "Alles ist erlaubt außer den ausdrücklich gesperrten Elementen", "ok": true },
     { "t": "Alles ist gesperrt außer den ausdrücklich freigegebenen Elementen", "ok": false },
     { "t": "Eine Liste kompromittierter Passwörter, die beim Login geprüft wird", "ok": false },
     { "t": "Eine Liste widerrufener Zertifikate, die Browser regelmäßig abrufen", "ok": false }
    ],
    "e": "Blacklist = 'default allow', nur Gelistetes wird blockiert."
   },
   {
    "q": "Warum ist eine reine MAC-Filterung als Schutz schwach?",
    "o": [
     {
      "t": "MAC-Adressen lassen sich leicht fälschen (Spoofing)",
      "ok": true
     },
     {
      "t": "MAC-Adressen sind grundsätzlich verschlüsselt",
      "ok": false
     },
     {
      "t": "Es gibt weltweit zu wenige MAC-Adressen",
      "ok": false
     },
     {
      "t": "MAC-Filter verursachen zu hohe Kosten",
      "ok": false
     }
    ],
    "e": "MAC-Spoofing umgeht den Filter leicht — nur als schwache Zusatzmaßnahme geeignet."
   },
   {
    "q": "Was ist Social Engineering?",
    "o": [
     { "t": "Manipulation von Menschen zur Preisgabe von Informationen", "ok": true },
     { "t": "Automatisiertes Durchprobieren von Passwörtern per Wörterbuch", "ok": false },
     { "t": "Das Ausnutzen technischer Schwachstellen in Serverdiensten", "ok": false },
     { "t": "Das Abfangen von Datenverkehr in ungesicherten Netzwerken", "ok": false }
    ],
    "e": "Social Engineering zielt auf den Menschen, nicht auf die Technik (z. B. Phishing)."
   },
   {
    "q": "Was ist das Ziel von Netzwerksegmentierung?",
    "o": [
     { "t": "Bereiche trennen, um Angriffe einzudämmen und Zugriffe zu steuern", "ok": true },
     { "t": "Datenverkehr bündeln, um die Bandbreite besser auszunutzen", "ok": false },
     { "t": "Redundante Wege schaffen, damit Ausfälle kompensiert werden", "ok": false },
     { "t": "Alle Geräte in eine gemeinsame Broadcastdomäne zusammenführen", "ok": false }
    ],
    "e": "Segmentierung (z. B. via VLAN) begrenzt die Ausbreitung und trennt sensible Bereiche."
   },
   {
    "q": "Wozu dient ein IDS (Intrusion Detection System)?",
    "o": [
     {
      "t": "Verdächtige Aktivitäten erkennen und melden",
      "ok": true
     },
     {
      "t": "Verkehr aktiv blockieren",
      "ok": false
     },
     {
      "t": "IP-Adressen vergeben",
      "ok": false
     },
     {
      "t": "Daten verschlüsseln",
      "ok": false
     }
    ],
    "e": "Ein IDS erkennt und meldet; ein IPS kann zusätzlich aktiv eingreifen/blockieren."
   },
   {
    "q": "Warum sind regelmäßige Updates ein Sicherheitsgrundpfeiler?",
    "o": [
     {
      "t": "Sie schließen bekannte Sicherheitslücken",
      "ok": true
     },
     {
      "t": "Sie erhöhen die Bandbreite",
      "ok": false
     },
     {
      "t": "Sie vergeben neue IPs",
      "ok": false
     },
     {
      "t": "Sie ändern die MAC-Adresse",
      "ok": false
     }
    ],
    "e": "Patches beseitigen bekannte Schwachstellen, bevor sie ausgenutzt werden."
   },
   {
    "q": "Was beschreibt 'Defense in Depth'?",
    "o": [
     {
      "t": "Mehrere gestaffelte Schutzmaßnahmen statt einer einzigen",
      "ok": true
     },
     {
      "t": "Eine einzige starke Firewall reicht",
      "ok": false
     },
     {
      "t": "Verschlüsselung nur an einer Stelle",
      "ok": false
     },
     {
      "t": "Kein Schutz nötig",
      "ok": false
     }
    ],
    "e": "Mehrschichtige Verteidigung: fällt eine Ebene, greifen weitere."
   },
   {
    "q": "Was ist der Unterschied zwischen Authentifizierung und Autorisierung?",
    "o": [
     { "t": "Authentifizierung prüft die Identität; Autorisierung prüft die Berechtigung", "ok": true },
     { "t": "Authentifizierung vergibt die Rechte; Autorisierung weist die Identität nach", "ok": false },
     { "t": "Authentifizierung gilt für Personen; Autorisierung nur für Geräte und Dienste", "ok": false },
     { "t": "Authentifizierung erfolgt einmalig; Autorisierung muss je Sitzung erneuert werden", "ok": false }
    ],
    "e": "Erst Identität beweisen (Authentifizierung), dann Rechte prüfen (Autorisierung). AAA = Authentication, Authorization, Accounting."
   },
   {
    "q": "Was ist ein Penetrationstest?",
    "o": [
     { "t": "Ein autorisierter, simulierter Angriff zur Aufdeckung von Schwachstellen", "ok": true },
     { "t": "Ein automatisierter Scan, der bekannte Malware auf allen Systemen sucht", "ok": false },
     { "t": "Ein Lasttest, der die Belastbarkeit der Server unter Spitzenlast misst", "ok": false },
     { "t": "Ein Audit, das die Einhaltung interner Sicherheitsrichtlinien dokumentiert", "ok": false }
    ],
    "e": "Pentests simulieren echte Angriffstechniken mit Erlaubnis des Betreibers, um Schwachstellen vor echten Angreifern zu finden."
   },
   {
    "q": "Was ist eine Stateful Firewall gegenüber einem Paketfilter?",
    "o": [
     { "t": "Sie verfolgt Verbindungszustände und lässt legitime Antwortpakete automatisch durch", "ok": true },
     { "t": "Sie prüft zusätzlich die Anwendungsinhalte und entfernt Schadcode direkt aus den Paketen", "ok": false },
     { "t": "Sie arbeitet ohne festes Regelwerk und entscheidet selbstlernend über jede Verbindung", "ok": false },
     { "t": "Sie filtert ausschließlich eingehenden Verkehr und lässt ausgehenden ungeprüft passieren", "ok": false }
    ],
    "e": "Stateful Inspection kennt den Verbindungskontext — ein Antwortpaket auf eine erlaubte Anfrage wird automatisch zugelassen."
   },
   {
    "q": "Welche drei Faktoren kann 2FA kombinieren?",
    "o": [
     {
      "t": "Passwort, Token, Biometrie",
      "ok": true
     },
     {
      "t": "Passwort, PIN und ein weiteres Passwort",
      "ok": false
     },
     {
      "t": "IP-Adresse, MAC-Adresse und Portnummer",
      "ok": false
     },
     {
      "t": "Benutzername, Passwort und E-Mail-Adresse",
      "ok": false
     }
    ],
    "e": "Die drei Authentifizierungsfaktoren: etwas, das man weiß / hat / ist."
   },
   {
    "q": "Warum ist Social Engineering so gefährlich?",
    "o": [
     {
      "t": "Es umgeht technische Schutzmaßnahmen durch Manipulation von Menschen",
      "ok": true
     },
     {
      "t": "Es ist nur online möglich",
      "ok": false
     },
     {
      "t": "Es erfordert hohe technische Kenntnisse",
      "ok": false
     },
     {
      "t": "Es ist immer strafbar und daher selten",
      "ok": false
     }
    ],
    "e": "Social Engineering zielt auf den Menschen statt die Technik — Awareness ist die einzige echte Gegenwehr."
   },
   {
    "q": "Was schützt eine DMZ vor allem?",
    "o": [
     { "t": "Das interne Netz, falls ein öffentlicher Server kompromittiert wird", "ok": true },
     { "t": "Den öffentlichen Server selbst, indem sie Angriffe von außen abblockt", "ok": false },
     { "t": "Die Internetanbindung vor Überlastung durch eingehende Anfragen", "ok": false },
     { "t": "Die Verwaltungszugänge, indem Administratoren separat angemeldet werden", "ok": false }
    ],
    "e": "Ein Angreifer, der den DMZ-Server übernimmt, hat damit keinen direkten Zugriff auf das interne Netz."
   },
   {
    "q": "Was beschreibt das Prinzip 'Need to Know'?",
    "o": [
     {
      "t": "Zugriff nur auf Informationen, die für die Aufgabe nötig sind",
      "ok": true
     },
     {
      "t": "Alle Mitarbeiter kennen alle Daten",
      "ok": false
     },
     {
      "t": "Passwörter müssen bekannt sein",
      "ok": false
     },
     {
      "t": "IT-Abteilung hat immer vollen Zugriff",
      "ok": false
     }
    ],
    "e": "Need to Know ergänzt Least Privilege: nicht nur minimale Rechte, sondern auch minimales Wissen."
   },
   {
    "q": "Was ist ein Honeypot?",
    "o": [
     { "t": "Ein absichtlich verwundbares System, das Angreifer anlocken und ihr Verhalten analysieren soll", "ok": true },
     { "t": "Ein besonders gehärteter Server, der die sensibelsten Daten des Unternehmens isoliert aufbewahrt", "ok": false },
     { "t": "Ein verstecktes Backup-System, das nach einem Ransomware-Befall die Daten automatisch zurückspielt", "ok": false },
     { "t": "Ein Überwachungsdienst, der fehlgeschlagene Anmeldungen zählt und bei Häufung Alarm auslöst", "ok": false }
    ],
    "e": "Ein Honeypot simuliert ein echtes System, um Angreifer abzulenken und deren Methoden zu beobachten."
   },
   {
    "q": "Was ist Phishing?",
    "o": [
     { "t": "Täuschende E-Mails oder Webseiten, die Zugangsdaten stehlen wollen", "ok": true },
     { "t": "Massenhafte Anfragen, die einen Dienst gezielt überlasten sollen", "ok": false },
     { "t": "Schadprogramme, die sich selbstständig über Netzwerke verbreiten", "ok": false },
     { "t": "Das heimliche Mitschneiden von Tastatureingaben am Rechner", "ok": false }
    ],
    "e": "Phishing ist eine Form des Social Engineering per E-Mail oder gefälschter Website."
   },
   {
    "q": "Was unterscheidet IDS von IPS?",
    "o": [
     { "t": "IDS erkennt und meldet; IPS greift zusätzlich aktiv ein und blockiert", "ok": true },
     { "t": "IDS blockiert Angriffe direkt; IPS analysiert sie nur im Nachhinein", "ok": false },
     { "t": "IDS schützt einzelne Hosts; IPS ist ausschließlich für ganze Netze gedacht", "ok": false },
     { "t": "IDS arbeitet nur signaturbasiert; IPS erkennt ausschließlich Anomalien", "ok": false }
    ],
    "e": "IDS = Intrusion Detection System (passiv). IPS = Intrusion Prevention System (aktiv eingreifend)."
   },
   {
    "q": "Was ist ein Zero-Day-Exploit?",
    "o": [
     { "t": "Ein Angriff auf eine noch nicht öffentlich bekannte oder gepatchte Schwachstelle", "ok": true },
     { "t": "Ein Angriff, der am Tag der Patch-Veröffentlichung startet, bevor alle updaten", "ok": false },
     { "t": "Ein Angriff, der ein System innerhalb von 24 Stunden vollständig übernimmt", "ok": false },
     { "t": "Eine Schwachstelle, die der Hersteller kennt, aber bewusst nicht schließt", "ok": false }
    ],
    "e": "Zero-Day bedeutet: der Hersteller hat 0 Tage Zeit gehabt, einen Patch bereitzustellen."
   },
   {
    "q": "Was ist Ransomware?",
    "o": [
     { "t": "Schadsoftware, die Daten verschlüsselt und Lösegeld fordert", "ok": true },
     { "t": "Schadsoftware, die Tastatureingaben und Passwörter mitschneidet", "ok": false },
     { "t": "Schadsoftware, die Rechner heimlich für Krypto-Mining missbraucht", "ok": false },
     { "t": "Schadsoftware, die sich als nützliches Programm tarnt und Hintertüren öffnet", "ok": false }
    ],
    "e": "Ransomware verschlüsselt Dateien und droht mit Datenverlust, bis ein Lösegeld bezahlt wird."
   }
  ]
 },
 "wlan": {
  "name": "WLAN vertieft",
  "q": [
   {
    "q": "Wofür steht SSID?",
    "o": [
     {
      "t": "Service Set Identifier",
      "ok": true
     },
     {
      "t": "Secure System ID",
      "ok": false
     },
     {
      "t": "Signal Strength Indicator",
      "ok": false
     },
     {
      "t": "Static Subnet ID",
      "ok": false
     }
    ],
    "e": "Die SSID ist der sichtbare Netzwerkname des WLANs."
   },
   {
    "q": "Welche Aufgabe hat ein Access Point (AP)?",
    "o": [
     { "t": "Er stellt das WLAN bereit und verbindet Funkgeräte mit dem Netz", "ok": true },
     { "t": "Er routet den Verkehr zwischen dem lokalen Netz und dem Internet", "ok": false },
     { "t": "Er weist allen Funkgeräten automatisch ihre IP-Adressen zu", "ok": false },
     { "t": "Er verstärkt das Signal vorhandener Netze und erweitert die Reichweite", "ok": false }
    ],
    "e": "Der AP ist die Funkzentrale und bindet WLAN-Geräte ans (meist kabelgebundene) Netz an."
   },
   {
    "q": "Welche Frequenzbänder nutzt WLAN klassisch?",
    "o": [
     {
      "t": "2,4 GHz und 5 GHz",
      "ok": true
     },
     {
      "t": "900 MHz und 1,8 GHz (Mobilfunkbänder)",
      "ok": false
     },
     {
      "t": "Ausschließlich das 2,4-GHz-Band",
      "ok": false
     },
     {
      "t": "10 GHz und 60 GHz (Richtfunkbänder)",
      "ok": false
     }
    ],
    "e": "Üblich sind 2,4 und 5 GHz; Wi-Fi 6E ergänzt das 6-GHz-Band."
   },
   {
    "q": "Welcher Vorteil kennzeichnet das 5-GHz-Band?",
    "o": [
     {
      "t": "Höhere Geschwindigkeit und weniger Störungen",
      "ok": true
     },
     {
      "t": "Größere Reichweite",
      "ok": false
     },
     {
      "t": "Bessere Wanddurchdringung",
      "ok": false
     },
     {
      "t": "Funktioniert ohne AP",
      "ok": false
     }
    ],
    "e": "5 GHz bietet mehr Tempo und Kanäle, dafür geringere Reichweite."
   },
   {
    "q": "Welche Standardfamilie beschreibt WLAN?",
    "o": [
     {
      "t": "IEEE 802.11",
      "ok": true
     },
     {
      "t": "IEEE 802.3",
      "ok": false
     },
     {
      "t": "IEEE 802.15",
      "ok": false
     },
     {
      "t": "IEEE 802.1Q",
      "ok": false
     }
    ],
    "e": "WLAN gehört zur Familie 802.11; 802.3 ist Ethernet."
   },
   {
    "q": "Was kennzeichnet den Infrastrukturmodus?",
    "o": [
     { "t": "Geräte kommunizieren über einen zentralen Access Point", "ok": true },
     { "t": "Geräte kommunizieren direkt miteinander, ohne zentrale Instanz", "ok": false },
     { "t": "Mehrere Access Points teilen sich automatisch eine gemeinsame SSID", "ok": false },
     { "t": "Clients verbinden sich abwechselnd mit dem jeweils stärksten Endgerät", "ok": false }
    ],
    "e": "Infrastrukturmodus: alle Geräte laufen über den AP (typisch für Heim/Firma)."
   },
   {
    "q": "Was kennzeichnet den Ad-hoc-Modus?",
    "o": [
     { "t": "Geräte kommunizieren direkt miteinander, ohne Access Point", "ok": true },
     { "t": "Geräte kommunizieren ausschließlich über einen zentralen Access Point", "ok": false },
     { "t": "Ein Gerät übernimmt dauerhaft die Rolle eines vollwertigen Routers", "ok": false },
     { "t": "Die Verbindung läuft bei Bedarf über das Mobilfunknetz statt über Funk", "ok": false }
    ],
    "e": "Ad-hoc verbindet Geräte direkt, z. B. für temporäre Verbindungen."
   },
   {
    "q": "Welches WLAN-Sicherheitsverfahren ist heute Mindeststandard?",
    "o": [
     {
      "t": "WPA2, WPA3",
      "ok": true
     },
     {
      "t": "WEP",
      "ok": false
     },
     {
      "t": "Gar keine Verschlüsselung (offen)",
      "ok": false
     },
     {
      "t": "MAC-Filter allein",
      "ok": false
     }
    ],
    "e": "WEP gilt als gebrochen; WPA2 ist Minimum, WPA3 der aktuelle Standard."
   },
   {
    "q": "Was unterscheidet WPA2-Personal von WPA2-Enterprise?",
    "o": [
     { "t": "Personal nutzt einen gemeinsamen PSK, Enterprise authentifiziert je Nutzer über RADIUS", "ok": true },
     { "t": "Personal nutzt Zertifikate je Gerät, Enterprise ein gemeinsames Passwort für alle Nutzer", "ok": false },
     { "t": "Personal verschlüsselt nur die Anmeldung, Enterprise den gesamten Verkehr im Funknetz", "ok": false },
     { "t": "Personal ist auf wenige Geräte begrenzt, Enterprise erlaubt beliebig viele Clients", "ok": false }
    ],
    "e": "Personal = ein Passwort für alle (PSK); Enterprise = individuelle Anmeldung über RADIUS."
   },
   {
    "q": "Welche Rolle spielt ein RADIUS-Server im WLAN?",
    "o": [
     {
      "t": "Zentrale Authentifizierung einzelner Nutzer",
      "ok": true
     },
     {
      "t": "Er vergibt die SSIDs an die Access Points",
      "ok": false
     },
     {
      "t": "Er verstärkt das Funksignal im Gebäude",
      "ok": false
     },
     {
      "t": "Er ersetzt den Access Point vollständig",
      "ok": false
     }
    ],
    "e": "RADIUS prüft Benutzeranmeldungen zentral, z. B. per Login oder Zertifikat."
   },
   {
    "q": "Welchen Vorteil bietet WPA3 gegenüber WPA2?",
    "o": [
     { "t": "Besserer Schutz gegen Wörterbuch-/Brute-Force-Angriffe", "ok": true },
     { "t": "Höhere Übertragungsraten durch effizientere Kanalnutzung", "ok": false },
     { "t": "Größere Reichweite durch stärkere zulässige Sendeleistung", "ok": false },
     { "t": "Verzicht auf Passwörter durch reine Zertifikatsanmeldung", "ok": false }
    ],
    "e": "WPA3 erschwert Offline-Angriffe und verschlüsselt individueller."
   },
   {
    "q": "Wie schwach ist MAC-Filterung als WLAN-Schutz einzustufen?",
    "o": [
     {
      "t": "Schwach, da MAC-Adressen fälschbar sind",
      "ok": true
     },
     {
      "t": "Sehr stark, kaum zu umgehen",
      "ok": false
     },
     {
      "t": "Ersetzt jede Verschlüsselung",
      "ok": false
     },
     {
      "t": "Verschlüsselt den Verkehr",
      "ok": false
     }
    ],
    "e": "MAC-Filter ist nur eine kleine Hürde; Spoofing umgeht ihn leicht."
   },
   {
    "q": "Welchen Schutzwert hat eine versteckte SSID?",
    "o": [
     {
      "t": "Gering – der Name lässt sich trotzdem ermitteln",
      "ok": true
     },
     {
      "t": "Sehr hoch, macht das Netz unsichtbar",
      "ok": false
     },
     {
      "t": "Ersetzt WPA2",
      "ok": false
     },
     {
      "t": "Verschlüsselt den Verkehr",
      "ok": false
     }
    ],
    "e": "Das Verstecken der SSID bietet nur minimalen Schutz und ist leicht auslesbar."
   },
   {
    "q": "Wie trennt man ein Gäste-WLAN sinnvoll vom Firmennetz?",
    "o": [
     {
      "t": "Über ein eigenes VLAN",
      "ok": true
     },
     {
      "t": "Durch Ausschalten des DNS",
      "ok": false
     },
     {
      "t": "Durch eine höhere TTL",
      "ok": false
     },
     {
      "t": "Gar nicht möglich",
      "ok": false
     }
    ],
    "e": "Ein separates VLAN isoliert Gäste vom internen Netz."
   },
   {
    "q": "Warum ist die Kanalwahl besonders im 2,4-GHz-Band wichtig?",
    "o": [
     { "t": "Um Überlappungen und Störungen mit Nachbarnetzen zu vermeiden", "ok": true },
     { "t": "Um die maximale Sendeleistung des Access Points auszuschöpfen", "ok": false },
     { "t": "Um mehr Clients gleichzeitig im selben Funknetz zu versorgen", "ok": false },
     { "t": "Um die Verschlüsselungsstärke an den Kanal anpassen zu können", "ok": false }
    ],
    "e": "Im engen 2,4-GHz-Band überlappen Kanäle leicht; saubere Kanalwahl reduziert Störungen."
   },
   {
    "q": "Was ist ein Mesh-WLAN?",
    "o": [
     { "t": "Mehrere APs bilden ein nahtloses Funknetz mit gemeinsamer SSID", "ok": true },
     { "t": "Ein Funknetz ohne zentrale Instanz, direkt zwischen den Endgeräten", "ok": false },
     { "t": "Mehrere Netze mit eigenen SSIDs, zwischen denen Clients manuell wechseln", "ok": false },
     { "t": "Ein einzelner AP, der über Richtantennen mehrere Gebäude versorgt", "ok": false }
    ],
    "e": "Mesh-Systeme verteilen mehrere APs, zwischen denen Geräte nahtlos wechseln."
   },
   {
    "q": "Was bezeichnet Roaming im WLAN?",
    "o": [
     {
      "t": "Automatischer Wechsel des Geräts zwischen Access Points",
      "ok": true
     },
     {
      "t": "Das Verstecken der SSID",
      "ok": false
     },
     {
      "t": "Die Vergabe von IP-Adressen",
      "ok": false
     },
     {
      "t": "Der Wechsel des Frequenzbandes durch den Nutzer",
      "ok": false
     }
    ],
    "e": "Beim Roaming übernimmt das Gerät automatisch den besten AP im Mesh/Netz."
   },
   {
    "q": "Welcher Nachteil ist typisch für WLAN gegenüber Kabel?",
    "o": [
     {
      "t": "Störanfälligkeit und geteilte, schwankende Bandbreite",
      "ok": true
     },
     {
      "t": "Über WLAN lassen sich prinzipiell keine verschlüsselten VPN-Tunnel aufbauen, da die Funkverschlüsselung (WPA3) IPsec blockiert",
      "ok": false
     },
     {
      "t": "WLAN-Signale verändern die Struktur der Datenpakete auf Schicht 3",
      "ok": false
     },
     {
      "t": "Unbegrenzte Reichweite",
      "ok": false
     }
    ],
    "e": "Funk ist störanfälliger, die Bandbreite wird geteilt und schwankt mit der Umgebung."
   },
   {
    "q": "Welcher Faktor beeinflusst die WLAN-Reichweite am stärksten?",
    "o": [
     {
      "t": "Hindernisse, Störquellen und Frequenzband",
      "ok": true
     },
     {
      "t": "Die Farbe des Routers",
      "ok": false
     },
     {
      "t": "Die Länge des Netzkabels",
      "ok": false
     },
     {
      "t": "Größere Downloads von Dateien",
      "ok": false
     }
    ],
    "e": "Bausubstanz, Störquellen und das gewählte Band bestimmen Reichweite und Qualität."
   },
   {
    "q": "Warum sollte ein Access Point möglichst zentral und hoch platziert werden?",
    "o": [
     { "t": "Für gleichmäßige Ausleuchtung und weniger Abschattung", "ok": true },
     { "t": "Um das Signal gezielt nach unten zu den Endgeräten zu bündeln", "ok": false },
     { "t": "Um Reflexionen an Wänden zu verstärken und so Reichweite zu gewinnen", "ok": false },
     { "t": "Um die gesetzlich zulässige Sendeleistung voll ausnutzen zu dürfen", "ok": false }
    ],
    "e": "Zentrale, hohe Platzierung minimiert Funklöcher und Hindernisse."
   },
   {
    "q": "Was ist WPS und warum ist es problematisch?",
    "o": [
     { "t": "Wi-Fi Protected Setup — vereinfacht WLAN-Einrichtung, hat aber bekannte Sicherheitslücken", "ok": true },
     { "t": "Wi-Fi Protected Standard — der Vorgänger von WPA, gilt heute als vollständig gebrochen", "ok": false },
     { "t": "Wireless Priority Service — priorisiert einzelne Geräte, belegt aber dauerhaft Bandbreite", "ok": false },
     { "t": "Wireless Positioning System — ortet Clients im Funknetz, wirft aber Datenschutzfragen auf", "ok": false }
    ],
    "e": "WPS PIN-Methode ist durch Brute-Force-Angriffe kompromittiert — sollte deaktiviert sein."
   },
   {
    "q": "Was ist der Unterschied zwischen 2,4 GHz und 5 GHz WLAN?",
    "o": [
     { "t": "2,4 GHz: größere Reichweite, störanfälliger; 5 GHz: schneller, kürzere Reichweite", "ok": true },
     { "t": "2,4 GHz: kürzere Reichweite bei mehr Tempo; 5 GHz: größere Reichweite bei weniger Tempo", "ok": false },
     { "t": "2,4 GHz: nur für ältere Geräte nutzbar; 5 GHz: der einzige Standard aktueller Clients", "ok": false },
     { "t": "2,4 GHz: schneller, aber teurer in der Hardware; 5 GHz: langsamer, dafür überall erlaubt", "ok": false }
    ],
    "e": "2,4 GHz durchdringt Wände besser; 5 GHz bietet mehr Kanäle und höhere Datenraten."
   },
   {
    "q": "Was ist ein Wireless Controller?",
    "o": [
     { "t": "Zentrales Gerät zur Verwaltung mehrerer Access Points", "ok": true },
     { "t": "Ein Messgerät zur Analyse der Kanalbelegung im Funkfeld", "ok": false },
     { "t": "Ein Verstärker, der die Reichweite eines einzelnen APs erhöht", "ok": false },
     { "t": "Eine Funktion, die Clients automatisch auf die Bänder verteilt", "ok": false }
    ],
    "e": "Ein WLAN-Controller (WLC) verwaltet APs zentral: Konfiguration, Roaming, Sicherheitsrichtlinien."
   },
   {
    "q": "Was sind nicht-überlappende Kanäle bei 2,4 GHz in Europa?",
    "o": [
     {
      "t": "Kanal 1, 6 und 11",
      "ok": true
     },
     {
      "t": "Kanal 1, 2 und 3",
      "ok": false
     },
     {
      "t": "Alle 13 Kanäle",
      "ok": false
     },
     {
      "t": "Kanal 5, 10 und 13",
      "ok": false
     }
    ],
    "e": "Im 2,4-GHz-Band überlappen sich benachbarte Kanäle — nur 1, 6 und 11 sind in Europa störungsfrei."
   },
   {
    "q": "Was ist das Hidden-Node-Problem?",
    "o": [
     { "t": "Zwei Clients können sich gegenseitig nicht hören und senden gleichzeitig zum AP", "ok": true },
     { "t": "Ein Access Point strahlt seine SSID nicht aus und ist für neue Geräte nicht auffindbar", "ok": false },
     { "t": "Ein fremdes Gerät hängt sich unbemerkt ins Netz und leitet den Verkehr über sich um", "ok": false },
     { "t": "Ein Client sendet mit gefälschter MAC-Adresse und umgeht so die Filterliste des AP", "ok": false }
    ],
    "e": "Beim Hidden-Node-Problem kollidieren Pakete am AP, weil die Sender sich nicht gegenseitig wahrnehmen. CSMA/CA mit RTS/CTS lindert das."
   },
   {
    "q": "Was ist Band Steering?",
    "o": [
     { "t": "Automatische Umleitung dual-band-fähiger Clients auf das 5-GHz-Band", "ok": true },
     { "t": "Automatischer Kanalwechsel des Access Points bei erkannter Störung", "ok": false },
     { "t": "Bündelung beider Frequenzbänder zu einer gemeinsamen Verbindung", "ok": false },
     { "t": "Drosselung einzelner Clients, die zu viel Bandbreite beanspruchen", "ok": false }
    ],
    "e": "Band Steering lenkt Clients auf das weniger ausgelastete/schnellere 5-GHz-Band."
   },
   {
    "q": "Welcher WLAN-Standard bringt Wi-Fi 6?",
    "o": [
     {
      "t": "IEEE 802.11ax",
      "ok": true
     },
     {
      "t": "IEEE 802.11ac",
      "ok": false
     },
     {
      "t": "IEEE 802.11n",
      "ok": false
     },
     {
      "t": "IEEE 802.11g",
      "ok": false
     }
    ],
    "e": "Wi-Fi 6 = 802.11ax. Vorher: Wi-Fi 5 = 802.11ac, Wi-Fi 4 = 802.11n."
   },
   {
    "q": "Was ist SSID-Hiding und welchen Schutz bietet es wirklich?",
    "o": [
     { "t": "Die SSID wird nicht gesendet — bietet minimalen Schutz, da sie per Sniffer auslesbar ist", "ok": true },
     { "t": "Die SSID wird verschlüsselt übertragen — nur Geräte mit Schlüssel können das Netz finden", "ok": false },
     { "t": "Die SSID wird nur an registrierte MAC-Adressen gesendet — fremde Geräte sehen nichts", "ok": false },
     { "t": "Die SSID wechselt in festen Intervallen — Scanner verlieren das Netz beim Suchen", "ok": false }
    ],
    "e": "SSID-Hiding ist Security through Obscurity — ein Sniffer findet das Netz trotzdem in Probe-Requests."
   },
   {
    "q": "Was ist der Unterschied zwischen WPA2-Personal und WPA3-Personal?",
    "o": [
     { "t": "WPA3 nutzt SAE statt PSK — besser gegen Wörterbuchangriffe", "ok": true },
     { "t": "WPA3 verlangt Zertifikate statt Passwörter für die Anmeldung", "ok": false },
     { "t": "WPA3 verlagert die Verschlüsselung vom Client auf den Router", "ok": false },
     { "t": "WPA3 erzwingt längere Passwörter, ist sonst identisch zu WPA2", "ok": false }
    ],
    "e": "WPA3-Personal nutzt SAE (Simultaneous Authentication of Equals) statt PSK — kein Offline-Brute-Force möglich."
   },
   {
    "q": "Was ist Roaming im Enterprise-WLAN?",
    "o": [
     {
      "t": "Nahtloser AP-Wechsel eines Clients ohne Verbindungsabbruch",
      "ok": true
     },
     {
      "t": "Nutzung des WLANs im Ausland",
      "ok": false
     },
     {
      "t": "Wechsel zwischen 2,4 und 5 GHz",
      "ok": false
     },
     {
      "t": "Automatische SSID-Änderung",
      "ok": false
     }
    ],
    "e": "Fast Roaming (802.11r) ermöglicht reibungslosen AP-Wechsel ohne erneute Authentifizierung."
   },
   {
    "q": "Wie funktioniert die Anmeldung per Pre-Shared Key (PSK) in einem WLAN?",
    "o": [
     { "t": "Client und Access Point kennen dasselbe Passwort und leiten daraus die Schlüssel zur Verschlüsselung der Funkverbindung ab", "ok": true },
     { "t": "Der Access Point sendet dem Client bei jeder Verbindung ein neues Passwort zu, das nur für diese Sitzung gültig ist", "ok": false },
     { "t": "Jeder Client authentifiziert sich mit individuellen Zugangsdaten gegen einen zentralen Authentifizierungsserver", "ok": false },
     { "t": "Der Client weist sich über ein digitales Zertifikat aus, das von der CA des Netzbetreibers signiert wurde", "ok": false }
    ],
    "e": "Bei WPA2/WPA3-Personal ist der PSK das WLAN-Passwort — beide Seiten kennen es vorab und leiten daraus die Sitzungsschlüssel ab (WPA3 nutzt dafür SAE). Individuelle Anmeldung pro Nutzer wäre Enterprise mit RADIUS, Zertifikate wären 802.1X/EAP-TLS."
   }
  ]
 },
 "fddi": {
  "name": "FDDI",
  "q": [
   {
    "q": "Wofür steht FDDI?",
    "o": [
     {
      "t": "Fiber Distributed Data Interface",
      "ok": true
     },
     {
      "t": "Fast Direct Data Interface",
      "ok": false
     },
     {
      "t": "Fiber Duplex Data Interconnect",
      "ok": false
     },
     {
      "t": "Frame Distributed Data Interface",
      "ok": false
     }
    ],
    "e": "FDDI = Fiber Distributed Data Interface (Glasfaser-Ringnetz)."
   },
   {
    "q": "Warum entstehen bei FDDI keine Datenkollisionen?",
    "o": [
     {
      "t": "Nur der Besitzer des Tokens darf senden",
      "ok": true
     },
     {
      "t": "Ein zentraler Switch steuert alles",
      "ok": false
     },
     {
      "t": "Jedes Paket wird verschlüsselt",
      "ok": false
     },
     {
      "t": "Die TTL verhindert Kollisionen",
      "ok": false
     }
    ],
    "e": "Token-Passing: nur der Token-Inhaber sendet → keine Kollisionen."
   },
   {
    "q": "Welche Datenrate bot FDDI?",
    "o": [
     {
      "t": "100 Mbit/s",
      "ok": true
     },
     {
      "t": "10 Mbit/s",
      "ok": false
     },
     {
      "t": "1 Gbit/s",
      "ok": false
     },
     {
      "t": "56 kbit/s",
      "ok": false
     }
    ],
    "e": "FDDI lieferte 100 Mbit/s — damals sehr schnell."
   },
   {
    "q": "Was passiert bei FDDI im Fehlerfall (Kabelbruch)?",
    "o": [
     { "t": "Wrap: beide Ringe werden kurzgeschlossen, Betrieb läuft weiter", "ok": true },
     { "t": "Failover: der Sekundärring übernimmt allein den vollen Verkehr", "ok": false },
     { "t": "Reroute: die Stationen bauen den Ring über Ersatzleitungen neu auf", "ok": false },
     { "t": "Reset: alle Stationen handeln den Token neu aus und starten den Ring", "ok": false }
    ],
    "e": "Beim Wrap entsteht aus zwei Ringen ein langer Ring — ohne Datenverlust."
   },
   {
    "q": "Auf welcher Architektur basiert FDDI?",
    "o": [
     {
      "t": "Token Ring",
      "ok": true
     },
     {
      "t": "Ethernet/CSMA-CD",
      "ok": false
     },
     {
      "t": "Stern mit Switch",
      "ok": false
     },
     {
      "t": "Bus mit Terminatoren",
      "ok": false
     }
    ],
    "e": "FDDI nutzt Token-Passing wie Token Ring."
   },
   {
    "q": "Wodurch wurde FDDI letztlich verdrängt?",
    "o": [
     {
      "t": "Switched Ethernet mit Sterntopologie",
      "ok": true
     },
     {
      "t": "Token Ring über Koax",
      "ok": false
     },
     {
      "t": "WLAN 802.11a",
      "ok": false
     },
     {
      "t": "ATM",
      "ok": false
     }
    ],
    "e": "Günstigeres, einfacher zu verlegendes Switched Ethernet setzte sich durch."
   },
   {
    "q": "Welches Übertragungsmedium nutzt FDDI?",
    "o": [
     {
      "t": "Glasfaser",
      "ok": true
     },
     {
      "t": "Koaxialkabel",
      "ok": false
     },
     {
      "t": "Twisted-Pair-Kupfer ausschließlich",
      "ok": false
     },
     {
      "t": "Funk",
      "ok": false
     }
    ],
    "e": "FDDI basiert auf Glasfaserkabeln (Fiber)."
   },
   {
    "q": "Wozu dient der zweite (Hilfs-)Ring im Normalbetrieb?",
    "o": [
     {
      "t": "Zusätzliche Kapazität, läuft leer mit",
      "ok": true
     },
     {
      "t": "Er überträgt immer die Hälfte der Daten",
      "ok": false
     },
     {
      "t": "Er verschlüsselt den Hauptring",
      "ok": false
     },
     {
      "t": "Er vergibt IP-Adressen",
      "ok": false
     }
    ],
    "e": "Im Normalbetrieb ist der Hilfsring Reserve; er sichert die Ausfallfestigkeit."
   },
   {
    "q": "Was ist der 'Token' bei FDDI bildlich?",
    "o": [
     { "t": "Ein elektronischer Stafettenstab, der im Kreis wandert", "ok": true },
     { "t": "Ein Schlüssel, der die Daten auf dem Ring entschlüsselt", "ok": false },
     { "t": "Eine Eintrittskarte, die jede Station einmalig erhält", "ok": false },
     { "t": "Ein Zähler, der die Runden jedes Datenpakets protokolliert", "ok": false }
    ],
    "e": "Der Token zirkuliert; nur wer ihn hält, darf senden."
   },
   {
    "q": "Warum galt FDDI als sehr ausfallsicher?",
    "o": [
     { "t": "Durch die Doppelring-Struktur mit Wrap-Mechanismus", "ok": true },
     { "t": "Durch redundante Token, die parallel im Ring kreisen", "ok": false },
     { "t": "Durch die kollisionsfreie Vergabe fester Sendezeitfenster", "ok": false },
     { "t": "Durch Glasfaser, die Übertragungsfehler physikalisch ausschließt", "ok": false }
    ],
    "e": "Der Doppelring kann Brüche durch Kurzschließen kompensieren."
   },
   {
    "q": "In welchem Zeitraum war FDDI verbreitet?",
    "o": [
     {
      "t": "1980er / 1990er Jahre",
      "ok": true
     },
     {
      "t": "1960er Jahre",
      "ok": false
     },
     {
      "t": "2010er Jahre",
      "ok": false
     },
     {
      "t": "Ab 2020",
      "ok": false
     }
    ],
    "e": "FDDI war in den 80ern/90ern ein typischer Backbone-Standard."
   },
   {
    "q": "Wofür wurde FDDI hauptsächlich eingesetzt?",
    "o": [
     {
      "t": "Als Hochgeschwindigkeits-Backbone",
      "ok": true
     },
     {
      "t": "Als Heim-WLAN",
      "ok": false
     },
     {
      "t": "Als Bluetooth-Ersatz",
      "ok": false
     },
     {
      "t": "Als Satellitenverbindung",
      "ok": false
     }
    ],
    "e": "FDDI verband als Backbone mehrere Netze/Etagen."
   },
   {
    "q": "Welcher Vorteil sprach damals gegen Ethernet und für FDDI?",
    "o": [
     {
      "t": "Kollisionsfreiheit und hohe Ausfallsicherheit",
      "ok": true
     },
     {
      "t": "Niedrigere Kosten",
      "ok": false
     },
     {
      "t": "Einfachere Verkabelung",
      "ok": false
     },
     {
      "t": "Funkbetrieb",
      "ok": false
     }
    ],
    "e": "FDDI war teurer, aber kollisionsfrei und robust."
   },
   {
    "q": "Welcher Nachteil führte zum Niedergang von FDDI?",
    "o": [
     {
      "t": "Teure Glasfaser und aufwändige Verlegung",
      "ok": true
     },
     {
      "t": "Zu geringe Ausfallsicherheit",
      "ok": false
     },
     {
      "t": "Ständige Kollisionen",
      "ok": false
     },
     {
      "t": "Fehlende Standardisierung",
      "ok": false
     }
    ],
    "e": "Kupfer-Ethernet war deutlich günstiger und leichter zu installieren."
   },
   {
    "q": "Wie viele Stationen dürfen bei Token-Passing gleichzeitig senden?",
    "o": [
     {
      "t": "Genau eine (Token-Inhaber)",
      "ok": true
     },
     {
      "t": "Alle gleichzeitig",
      "ok": false
     },
     {
      "t": "Zwei",
      "ok": false
     },
     {
      "t": "Keine",
      "ok": false
     }
    ],
    "e": "Nur der Token-Inhaber sendet — deshalb kollisionsfrei."
   },
   {
    "q": "Was bezeichnet der Begriff 'Wrap' bei FDDI?",
    "o": [
     {
      "t": "Das Kurzschließen der Ringe an einer Bruchstelle",
      "ok": true
     },
     {
      "t": "Die Verschlüsselung des Tokens",
      "ok": false
     },
     {
      "t": "Das Verwerfen eines Pakets",
      "ok": false
     },
     {
      "t": "Die Vergabe der IP",
      "ok": false
     }
    ],
    "e": "Wrap = Umschließen/Kurzschließen der beiden Ringe zur Fehlerüberbrückung."
   }
  ]
 },
 "topo": {
  "name": "Netzwerktopologien",
  "q": [
   {
    "q": "Welche Topologie ist heute Standard in lokalen Netzwerken?",
    "o": [
     {
      "t": "Stern",
      "ok": true
     },
     {
      "t": "Bus",
      "ok": false
     },
     {
      "t": "Ring",
      "ok": false
     },
     {
      "t": "Masche",
      "ok": false
     }
    ],
    "e": "Die Sterntopologie mit zentralem Switch dominiert LANs."
   },
   {
    "q": "Was ist die zentrale Schwachstelle der Sterntopologie?",
    "o": [
     {
      "t": "Ausfall des zentralen Verteilers legt alles lahm",
      "ok": true
     },
     {
      "t": "Ein Kabelbruch stoppt alle Geräte",
      "ok": false
     },
     {
      "t": "Kollisionen bei vielen Teilnehmern",
      "ok": false
     },
     {
      "t": "Terminatoren an beiden Enden nötig",
      "ok": false
     }
    ],
    "e": "Der zentrale Switch ist ein Single Point of Failure."
   },
   {
    "q": "Welche Topologie bietet die höchste Ausfallsicherheit?",
    "o": [
     {
      "t": "Masche",
      "ok": true
     },
     {
      "t": "Stern",
      "ok": false
     },
     {
      "t": "Bus",
      "ok": false
     },
     {
      "t": "Ring",
      "ok": false
     }
    ],
    "e": "Die Maschentopologie bietet durch viele alternative Wege maximale Redundanz."
   },
   {
    "q": "Wozu dienen Terminatoren bei der Bustopologie?",
    "o": [
     {
      "t": "Sie verhindern Signalreflexionen an den Kabelenden",
      "ok": true
     },
     {
      "t": "Sie erhöhen die Geschwindigkeit",
      "ok": false
     },
     {
      "t": "Sie vergeben IP-Adressen",
      "ok": false
     },
     {
      "t": "Sie schließen Ringe kurz",
      "ok": false
     }
    ],
    "e": "Ohne Terminatoren reflektieren Signale an den offenen Enden und stören den Bus."
   },
   {
    "q": "Worin liegt der Vorteil der Sterntopologie?",
    "o": [
     { "t": "Ausfall eines Endgeräts betrifft die anderen nicht; einfache Fehlersuche", "ok": true },
     { "t": "Kein zentraler Knoten nötig; jedes Gerät vermittelt selbstständig weiter", "ok": false },
     { "t": "Minimaler Kabelaufwand, da alle Geräte eine Leitung gemeinsam nutzen", "ok": false },
     { "t": "Garantierte Laufzeiten, da ein Token die Sendereihenfolge vorgibt", "ok": false }
    ],
    "e": "Fällt ein Gerät/Kabel aus, läuft der Rest weiter; Fehler sind gut lokalisierbar."
   },
   {
    "q": "Was ist der Nachteil der Sterntopologie?",
    "o": [
     {
      "t": "Hoher Kabelaufwand (jede Leitung zum Zentrum)",
      "ok": true
     },
     {
      "t": "Ständige Kollisionen",
      "ok": false
     },
     {
      "t": "Keine Erweiterbarkeit",
      "ok": false
     },
     {
      "t": "Fehlende Fehlersuche",
      "ok": false
     }
    ],
    "e": "Jedes Gerät braucht ein eigenes Kabel zum Verteiler → hoher Verkabelungsaufwand."
   },
   {
    "q": "Wie ist die Baumtopologie aufgebaut?",
    "o": [
     {
      "t": "Mehrere Sterne hierarchisch verknüpft",
      "ok": true
     },
     {
      "t": "Alle Geräte an einem Kabel",
      "ok": false
     },
     {
      "t": "Geschlossener Kreis",
      "ok": false
     },
     {
      "t": "Jeder mit jedem",
      "ok": false
     }
    ],
    "e": "Die Baumtopologie koppelt mehrere Sterne hierarchisch."
   },
   {
    "q": "Was passiert in der Baumtopologie beim Ausfall der Wurzel?",
    "o": [
     {
      "t": "Der gesamte darunterliegende Baum ist offline",
      "ok": true
     },
     {
      "t": "Nichts, es gibt Umleitungen",
      "ok": false
     },
     {
      "t": "Nur ein Gerät fällt aus",
      "ok": false
     },
     {
      "t": "Das Netz wird schneller",
      "ok": false
     }
    ],
    "e": "Bricht die Verbindung zur Wurzel, ist der ganze untergeordnete Ast blockiert."
   },
   {
    "q": "Wie sind Geräte in der Ringtopologie verbunden?",
    "o": [
     { "t": "Jedes mit genau zwei Nachbarn zu einem geschlossenen Kreis", "ok": true },
     { "t": "Jedes Gerät direkt mit jedem anderen über eigene Leitungen", "ok": false },
     { "t": "Alle Geräte an einer gemeinsamen zentralen Vermittlungsstelle", "ok": false },
     { "t": "Alle Geräte an einem durchgehenden gemeinsamen Leitungsstrang", "ok": false }
    ],
    "e": "Im Ring ist jede Station mit zwei Nachbarn verbunden."
   },
   {
    "q": "Was ist die Schwachstelle einer einfachen Ringtopologie?",
    "o": [
     {
      "t": "Ein Kabelbruch/PC-Ausfall unterbricht den ganzen Ring",
      "ok": true
     },
     {
      "t": "Der zentrale Switch fällt aus",
      "ok": false
     },
     {
      "t": "Terminatoren fehlen",
      "ok": false
     },
     {
      "t": "Zu viele alternative Wege",
      "ok": false
     }
    ],
    "e": "Ohne Doppelring legt ein einziger Bruch das Netz lahm."
   },
   {
    "q": "Welche Topologie kommt ohne zentralen Verteiler aus?",
    "o": [
     {
      "t": "Ring (und Bus)",
      "ok": true
     },
     {
      "t": "Stern",
      "ok": false
     },
     {
      "t": "Baum",
      "ok": false
     },
     {
      "t": "Erweiterter Stern",
      "ok": false
     }
    ],
    "e": "Ring und Bus benötigen keinen zentralen Hub/Switch."
   },
   {
    "q": "Wie teilen sich Geräte in der Bustopologie das Medium?",
    "o": [
     {
      "t": "Alle nutzen eine gemeinsame Kabelstrecke",
      "ok": true
     },
     {
      "t": "Jeder hat eine eigene Leitung zum Zentrum",
      "ok": false
     },
     {
      "t": "Über einen Ring",
      "ok": false
     },
     {
      "t": "Jeder mit jedem verbunden",
      "ok": false
     }
    ],
    "e": "Beim Bus teilen sich alle Teilnehmer ein durchgehendes Kabel."
   },
   {
    "q": "Was ist ein Nachteil der Bustopologie bei vielen Teilnehmern?",
    "o": [
     {
      "t": "Massive Datenkollisionen, da Medium geteilt",
      "ok": true
     },
     {
      "t": "Zu hoher Kabelaufwand",
      "ok": false
     },
     {
      "t": "Single Point of Failure am Switch",
      "ok": false
     },
     {
      "t": "Zu viele Umleitungen",
      "ok": false
     }
    ],
    "e": "Sendet ein Gerät, ist der Bus blockiert; viele Teilnehmer → viele Kollisionen."
   },
   {
    "q": "Auf welchem Prinzip basiert das weltweite Internet?",
    "o": [
     {
      "t": "Maschentopologie",
      "ok": true
     },
     {
      "t": "Bustopologie",
      "ok": false
     },
     {
      "t": "Ringtopologie",
      "ok": false
     },
     {
      "t": "Reine Sterntopologie",
      "ok": false
     }
    ],
    "e": "Das Internet ist vermascht — viele redundante Wege verhindern globale Ausfälle."
   },
   {
    "q": "Warum sind Maschentopologien für normale Firmen-LANs unüblich?",
    "o": [
     {
      "t": "Verkabelung und Administration sind extrem teuer",
      "ok": true
     },
     {
      "t": "Sie sind zu unsicher",
      "ok": false
     },
     {
      "t": "Sie erlauben keine Erweiterung",
      "ok": false
     },
     {
      "t": "Sie haben keinen Vorteil",
      "ok": false
     }
    ],
    "e": "Der Aufwand für 'jeder mit jedem' ist wirtschaftlich meist unbrauchbar."
   },
   {
    "q": "Welche Topologie lässt sich für große Gebäude am einfachsten erweitern?",
    "o": [
     {
      "t": "Baum",
      "ok": true
     },
     {
      "t": "Bus",
      "ok": false
     },
     {
      "t": "Ring",
      "ok": false
     },
     {
      "t": "Vollvermascht",
      "ok": false
     }
    ],
    "e": "Die hierarchische Baumstruktur ist gut skalierbar."
   },
   {
    "q": "Ein einzelnes Endgerät fällt in der Sterntopologie aus. Folge?",
    "o": [
     {
      "t": "Nur dieses Gerät ist betroffen",
      "ok": true
     },
     {
      "t": "Das ganze Netz fällt aus",
      "ok": false
     },
     {
      "t": "Der Ring bricht",
      "ok": false
     },
     {
      "t": "Alle verlieren die Verbindung",
      "ok": false
     }
    ],
    "e": "Im Stern isoliert der zentrale Verteiler den Ausfall einzelner Geräte."
   },
   {
    "q": "Wie fängt ein FDDI-Doppelring einen Kabelbruch im Ring ab?",
    "o": [
     {
      "t": "Durch Kurzschließen (Wrap) der beiden Ringe",
      "ok": true
     },
     {
      "t": "Durch Terminatoren",
      "ok": false
     },
     {
      "t": "Durch einen zentralen Switch",
      "ok": false
     },
     {
      "t": "Durch Broadcast-Sturm",
      "ok": false
     }
    ],
    "e": "Der Doppelring rettet den Betrieb durch den Wrap-Mechanismus."
   },
   {
    "q": "Welche Topologie hat den geringsten Kabelaufwand?",
    "o": [
     {
      "t": "Bus",
      "ok": true
     },
     {
      "t": "Stern",
      "ok": false
     },
     {
      "t": "Masche",
      "ok": false
     },
     {
      "t": "Baum",
      "ok": false
     }
    ],
    "e": "Der Bus nutzt eine einzige durchgehende Leitung → minimaler Kabelaufwand."
   },
   {
    "q": "Was bringt der zentrale Switch der Sterntopologie für die Wartung?",
    "o": [
     {
      "t": "Einfache, schnelle Fehlersuche",
      "ok": true
     },
     {
      "t": "Automatische Verschlüsselung",
      "ok": false
     },
     {
      "t": "Wegfall jeder Verkabelung",
      "ok": false
     },
     {
      "t": "Vollständige Redundanz",
      "ok": false
     }
    ],
    "e": "Fehler lassen sich zentral und schnell lokalisieren."
   }
  ]
 },
 "zahlen": {
  "name": "Zahlensysteme",
  "q": [
   {
    "q": "Welche Basis hat das Dualsystem (Binär)?",
    "o": [
     {
      "t": "2",
      "ok": true
     },
     {
      "t": "8",
      "ok": false
     },
     {
      "t": "10",
      "ok": false
     },
     {
      "t": "16",
      "ok": false
     }
    ],
    "e": "Binär = Basis 2 (Ziffern 0 und 1)."
   },
   {
    "q": "Welche Basis hat das Hexadezimalsystem?",
    "o": [
     {
      "t": "16",
      "ok": true
     },
     {
      "t": "2",
      "ok": false
     },
     {
      "t": "8",
      "ok": false
     },
     {
      "t": "10",
      "ok": false
     }
    ],
    "e": "Hexadezimal = Basis 16 (0–9, A–F)."
   },
   {
    "q": "Wie viele Werte kann 1 Byte (8 Bit) darstellen?",
    "o": [
     {
      "t": "256 (die Werte 0 bis 255)",
      "ok": true
     },
     {
      "t": "128 (die Werte 0 bis 127)",
      "ok": false
     },
     {
      "t": "255 (die Werte 1 bis 255)",
      "ok": false
     },
     {
      "t": "512 (die Werte 0 bis 511)",
      "ok": false
     }
    ],
    "e": "2⁸ = 256 Werte, also 0 bis 255."
   },
   {
    "q": "Was ist der dezimale Wert von binär 1010?",
    "o": [
     {
      "t": "10",
      "ok": true
     },
     {
      "t": "8",
      "ok": false
     },
     {
      "t": "12",
      "ok": false
     },
     {
      "t": "5",
      "ok": false
     }
    ],
    "e": "1010₂ = 8+0+2+0 = 10."
   },
   {
    "q": "Was ist der dezimale Wert von binär 1111?",
    "o": [
     {
      "t": "15",
      "ok": true
     },
     {
      "t": "16",
      "ok": false
     },
     {
      "t": "14",
      "ok": false
     },
     {
      "t": "11",
      "ok": false
     }
    ],
    "e": "1111₂ = 8+4+2+1 = 15."
   },
   {
    "q": "Was ist der dezimale Wert von binär 11111111?",
    "o": [
     {
      "t": "255",
      "ok": true
     },
     {
      "t": "256",
      "ok": false
     },
     {
      "t": "128",
      "ok": false
     },
     {
      "t": "254",
      "ok": false
     }
    ],
    "e": "11111111₂ = 255 (alle 8 Bit gesetzt)."
   },
   {
    "q": "Welche Hex-Ziffer entspricht dezimal 10?",
    "o": [
     {
      "t": "A",
      "ok": true
     },
     {
      "t": "9",
      "ok": false
     },
     {
      "t": "B",
      "ok": false
     },
     {
      "t": "F",
      "ok": false
     }
    ],
    "e": "A=10, B=11, C=12, D=13, E=14, F=15."
   },
   {
    "q": "Welche Hex-Ziffer entspricht dezimal 15?",
    "o": [
     {
      "t": "F",
      "ok": true
     },
     {
      "t": "E",
      "ok": false
     },
     {
      "t": "A",
      "ok": false
     },
     {
      "t": "10",
      "ok": false
     }
    ],
    "e": "F ist die höchste Hex-Ziffer und entspricht 15."
   },
   {
    "q": "Wie viele Bit fasst eine Hexadezimalstelle zusammen?",
    "o": [
     {
      "t": "4 Bit (ein Nibble)",
      "ok": true
     },
     {
      "t": "8 Bit (ein ganzes Byte)",
      "ok": false
     },
     {
      "t": "2 Bit (ein Dibit)",
      "ok": false
     },
     {
      "t": "16 Bit (ein Word)",
      "ok": false
     }
    ],
    "e": "Eine Hex-Ziffer entspricht genau 4 Bit (0000–1111)."
   },
   {
    "q": "Was ist der dezimale Wert von Hex FF?",
    "o": [
     {
      "t": "255",
      "ok": true
     },
     {
      "t": "256",
      "ok": false
     },
     {
      "t": "200",
      "ok": false
     },
     {
      "t": "15",
      "ok": false
     }
    ],
    "e": "FF₁₆ = 15·16 + 15 = 255."
   },
   {
    "q": "Was ist der dezimale Wert von Hex 1A?",
    "o": [
     {
      "t": "26",
      "ok": true
     },
     {
      "t": "20",
      "ok": false
     },
     {
      "t": "1A ist keine Zahl",
      "ok": false
     },
     {
      "t": "110",
      "ok": false
     }
    ],
    "e": "1A₁₆ = 1·16 + 10 = 26."
   },
   {
    "q": "Wie lautet dezimal 10 im Dualsystem?",
    "o": [
     {
      "t": "1010",
      "ok": true
     },
     {
      "t": "1100",
      "ok": false
     },
     {
      "t": "1001",
      "ok": false
     },
     {
      "t": "1110",
      "ok": false
     }
    ],
    "e": "10 = 8+2 = 1010₂."
   },
   {
    "q": "Wie lautet dezimal 255 in Hexadezimal?",
    "o": [
     {
      "t": "FF",
      "ok": true
     },
     {
      "t": "F0",
      "ok": false
     },
     {
      "t": "AA",
      "ok": false
     },
     {
      "t": "FE",
      "ok": false
     }
    ],
    "e": "255 = FF₁₆."
   },
   {
    "q": "Welche Basis hat das Oktalsystem?",
    "o": [
     {
      "t": "8",
      "ok": true
     },
     {
      "t": "2",
      "ok": false
     },
     {
      "t": "16",
      "ok": false
     },
     {
      "t": "10",
      "ok": false
     }
    ],
    "e": "Oktal = Basis 8 (Ziffern 0–7)."
   },
   {
    "q": "Was ist die Wertigkeit des höchsten Bits in einem Byte?",
    "o": [
     {
      "t": "128 (2⁷)",
      "ok": true
     },
     {
      "t": "64 (2⁶)",
      "ok": false
     },
     {
      "t": "256 (2⁸)",
      "ok": false
     },
     {
      "t": "255 (2⁸ − 1)",
      "ok": false
     }
    ],
    "e": "Die Bitwertigkeiten sind 128,64,32,16,8,4,2,1; das MSB = 128."
   },
   {
    "q": "Wie viele Bit hat ein Nibble?",
    "o": [
     {
      "t": "4",
      "ok": true
     },
     {
      "t": "8",
      "ok": false
     },
     {
      "t": "2",
      "ok": false
     },
     {
      "t": "16",
      "ok": false
     }
    ],
    "e": "Ein Nibble = 4 Bit = eine Hexstelle."
   },
   {
    "q": "Was ist der dezimale Wert von binär 11000000?",
    "o": [
     {
      "t": "192",
      "ok": true
     },
     {
      "t": "128",
      "ok": false
     },
     {
      "t": "224",
      "ok": false
     },
     {
      "t": "64",
      "ok": false
     }
    ],
    "e": "11000000₂ = 128+64 = 192 (typische Subnetzmaske)."
   },
   {
    "q": "Was ergibt binär 10000000 dezimal?",
    "o": [
     {
      "t": "128",
      "ok": true
     },
     {
      "t": "64",
      "ok": false
     },
     {
      "t": "256",
      "ok": false
     },
     {
      "t": "127",
      "ok": false
     }
    ],
    "e": "Nur das höchste Bit gesetzt: 2⁷ = 128."
   },
   {
    "q": "Wie viele verschiedene Werte kann 1 Nibble (4 Bit) annehmen?",
    "o": [
     {
      "t": "16",
      "ok": true
     },
     {
      "t": "8",
      "ok": false
     },
     {
      "t": "4",
      "ok": false
     },
     {
      "t": "15",
      "ok": false
     }
    ],
    "e": "2⁴ = 16 Werte (0–15 bzw. 0–F)."
   },
   {
    "q": "Warum nutzt man Hexadezimal in der IT gern statt Binär?",
    "o": [
     { "t": "Kürzere Schreibweise, 4 Bit pro Stelle, leicht umrechenbar", "ok": true },
     { "t": "Direkte Verarbeitung durch Prozessoren ohne weitere Umwandlung", "ok": false },
     { "t": "Verlustfreie Darstellung von Kommazahlen ohne Rundungsfehler", "ok": false },
     { "t": "Eindeutigere Darstellung, da Ziffern und Buchstaben getrennt bleiben", "ok": false }
    ],
    "e": "Hex fasst Bitgruppen kompakt zusammen und ist leicht zu Binär umrechenbar."
   },
   {
    "q": "Was ist der dezimale Wert von binär 101?",
    "o": [
     {
      "t": "5",
      "ok": true
     },
     {
      "t": "3",
      "ok": false
     },
     {
      "t": "6",
      "ok": false
     },
     {
      "t": "7",
      "ok": false
     }
    ],
    "e": "101₂ = 4+0+1 = 5."
   },
   {
    "q": "Wie lautet dezimal 16 in Hexadezimal?",
    "o": [
     {
      "t": "10",
      "ok": true
     },
     {
      "t": "16",
      "ok": false
     },
     {
      "t": "F",
      "ok": false
     },
     {
      "t": "1F",
      "ok": false
     }
    ],
    "e": "16 = 10₁₆ (ein Übertrag auf die 16er-Stelle)."
   },
   {
    "q": "Was ist der dezimale Wert von binär 01111111?",
    "o": [
     {
      "t": "127",
      "ok": true
     },
     {
      "t": "128",
      "ok": false
     },
     {
      "t": "126",
      "ok": false
     },
     {
      "t": "255",
      "ok": false
     }
    ],
    "e": "64+32+16+8+4+2+1 = 127 — die höchste 7-Bit-Zahl, bekannt aus der Loopback-Adresse 127.0.0.1."
   },
   {
    "q": "Was ist der dezimale Wert von binär 11100000?",
    "o": [
     {
      "t": "224",
      "ok": true
     },
     {
      "t": "192",
      "ok": false
     },
     {
      "t": "240",
      "ok": false
     },
     {
      "t": "128",
      "ok": false
     }
    ],
    "e": "128+64+32 = 224 — Subnetzmaske-Oktett für /27."
   },
   {
    "q": "Was ist der dezimale Wert von binär 11110000?",
    "o": [
     {
      "t": "240",
      "ok": true
     },
     {
      "t": "224",
      "ok": false
     },
     {
      "t": "248",
      "ok": false
     },
     {
      "t": "192",
      "ok": false
     }
    ],
    "e": "128+64+32+16 = 240 — Subnetzmaske-Oktett für /28."
   },
   {
    "q": "Wie lautet 255 in Binär?",
    "o": [
     {
      "t": "11111111",
      "ok": true
     },
     {
      "t": "11111110",
      "ok": false
     },
     {
      "t": "11111100",
      "ok": false
     },
     {
      "t": "10000000",
      "ok": false
     }
    ],
    "e": "8 gesetzte Bits: 128+64+32+16+8+4+2+1 = 255."
   },
   {
    "q": "Wie lautet dezimal 12 in Hexadezimal?",
    "o": [
     {
      "t": "C",
      "ok": true
     },
     {
      "t": "B",
      "ok": false
     },
     {
      "t": "D",
      "ok": false
     },
     {
      "t": "E",
      "ok": false
     }
    ],
    "e": "Hex: A=10, B=11, C=12, D=13, E=14, F=15."
   },
   {
    "q": "Wie viele Nibble hat ein Byte?",
    "o": [
     {
      "t": "2",
      "ok": true
     },
     {
      "t": "4",
      "ok": false
     },
     {
      "t": "8",
      "ok": false
     },
     {
      "t": "1",
      "ok": false
     }
    ],
    "e": "1 Byte = 8 Bit = 2 × 4 Bit = 2 Nibble (je eine Hexadezimalstelle)."
   },
   {
    "q": "Was ist der dezimale Wert von Hex A0?",
    "o": [
     {
      "t": "160",
      "ok": true
     },
     {
      "t": "100",
      "ok": false
     },
     {
      "t": "150",
      "ok": false
     },
     {
      "t": "170",
      "ok": false
     }
    ],
    "e": "A0₁₆ = 10×16 + 0 = 160."
   },
   {
    "q": "Was ergibt binär 1000 dezimal?",
    "o": [
     {
      "t": "8",
      "ok": true
     },
     {
      "t": "4",
      "ok": false
     },
     {
      "t": "16",
      "ok": false
     },
     {
      "t": "2",
      "ok": false
     }
    ],
    "e": "1000₂ = 1×2³ = 8."
   },
   {
    "q": "Wie lautet dezimal 16 in Binär?",
    "o": [
     {
      "t": "00010000",
      "ok": true
     },
     {
      "t": "00001000",
      "ok": false
     },
     {
      "t": "00100000",
      "ok": false
     },
     {
      "t": "00000001",
      "ok": false
     }
    ],
    "e": "16 = 2⁴ = Bit 4 gesetzt: 00010000."
   }
  ]
 },
 "logik": {
  "name": "Logische Verknüpfungen",
  "q": [
   {
    "q": "Was ergibt die UND-Verknüpfung (AND) von 1 AND 0?",
    "o": [
     {
      "t": "0",
      "ok": true
     },
     {
      "t": "1",
      "ok": false
     },
     {
      "t": "undefiniert",
      "ok": false
     },
     {
      "t": "beides möglich",
      "ok": false
     }
    ],
    "e": "AND ist nur 1, wenn beide Eingänge 1 sind. 1 AND 0 = 0."
   },
   {
    "q": "Wann liefert AND als Ergebnis 1?",
    "o": [
     {
      "t": "Nur wenn beide Eingänge 1 sind",
      "ok": true
     },
     {
      "t": "Wenn mindestens ein Eingang 1 ist",
      "ok": false
     },
     {
      "t": "Wenn beide Eingänge 0 sind",
      "ok": false
     },
     {
      "t": "Immer",
      "ok": false
     }
    ],
    "e": "UND (Konjunktion): Ausgang 1 nur bei 1 UND 1."
   },
   {
    "q": "Wann liefert die ODER-Verknüpfung (OR) eine 1?",
    "o": [
     {
      "t": "Wenn mindestens ein Eingang 1 ist",
      "ok": true
     },
     {
      "t": "Nur wenn beide 1 sind",
      "ok": false
     },
     {
      "t": "Nur wenn beide 0 sind",
      "ok": false
     },
     {
      "t": "Nie",
      "ok": false
     }
    ],
    "e": "ODER (Disjunktion): Ausgang 1, sobald ein Eingang 1 ist. 0 OR 0 = 0."
   },
   {
    "q": "Was ergibt 0 OR 0?",
    "o": [
     {
      "t": "0",
      "ok": true
     },
     {
      "t": "1",
      "ok": false
     },
     {
      "t": "undefiniert",
      "ok": false
     },
     {
      "t": "2",
      "ok": false
     }
    ],
    "e": "OR ist nur dann 0, wenn beide Eingänge 0 sind."
   },
   {
    "q": "Was macht die NICHT-Verknüpfung (NOT)?",
    "o": [
     {
      "t": "Sie kehrt den Eingangswert um: aus 0 wird 1 und aus 1 wird 0",
      "ok": true
     },
     {
      "t": "Sie verknüpft zwei Eingänge zu einem",
      "ok": false
     },
     {
      "t": "Sie liefert unabhängig vom Eingang immer 1",
      "ok": false
     },
     {
      "t": "Sie addiert zwei Bits mit Übertrag",
      "ok": false
     }
    ],
    "e": "NOT (Negation/Inverter) dreht den einzelnen Eingangswert um."
   },
   {
    "q": "Was ergibt NOT 1?",
    "o": [
     {
      "t": "0",
      "ok": true
     },
     {
      "t": "1",
      "ok": false
     },
     {
      "t": "undefiniert",
      "ok": false
     },
     {
      "t": "beides",
      "ok": false
     }
    ],
    "e": "NOT invertiert: aus 1 wird 0."
   },
   {
    "q": "Wann liefert XOR (Exklusiv-ODER) eine 1?",
    "o": [
     {
      "t": "Wenn die Eingänge unterschiedlich sind",
      "ok": true
     },
     {
      "t": "Wenn beide gleich sind",
      "ok": false
     },
     {
      "t": "Nur bei 1 und 1",
      "ok": false
     },
     {
      "t": "Nur bei 0 und 0",
      "ok": false
     }
    ],
    "e": "XOR = 1, wenn genau ein Eingang 1 ist (Eingänge verschieden)."
   },
   {
    "q": "Was ergibt 1 XOR 1?",
    "o": [
     {
      "t": "0",
      "ok": true
     },
     {
      "t": "1",
      "ok": false
     },
     {
      "t": "2",
      "ok": false
     },
     {
      "t": "undefiniert",
      "ok": false
     }
    ],
    "e": "XOR ist 0, wenn beide Eingänge gleich sind. 1 XOR 1 = 0."
   },
   {
    "q": "Was ergibt 1 XOR 0?",
    "o": [
     {
      "t": "1",
      "ok": true
     },
     {
      "t": "0",
      "ok": false
     },
     {
      "t": "undefiniert",
      "ok": false
     },
     {
      "t": "2",
      "ok": false
     }
    ],
    "e": "Eingänge verschieden → XOR = 1."
   },
   {
    "q": "Was ist NAND?",
    "o": [
     {
      "t": "Negiertes AND (NOT nach AND)",
      "ok": true
     },
     {
      "t": "Negiertes OR (NOT nach OR)",
      "ok": false
     },
     {
      "t": "Funktional dasselbe wie XOR",
      "ok": false
     },
     {
      "t": "Zwei AND-Gatter hintereinander",
      "ok": false
     }
    ],
    "e": "NAND = NOT-AND: erst AND, dann invertieren. Nur 0, wenn beide Eingänge 1 sind."
   },
   {
    "q": "Was ergibt 1 NAND 1?",
    "o": [
     {
      "t": "0",
      "ok": true
     },
     {
      "t": "1",
      "ok": false
     },
     {
      "t": "undefiniert",
      "ok": false
     },
     {
      "t": "2",
      "ok": false
     }
    ],
    "e": "AND von 1,1 = 1, negiert = 0."
   },
   {
    "q": "Was ist NOR?",
    "o": [
     {
      "t": "Negiertes OR (NOT nach OR)",
      "ok": true
     },
     {
      "t": "Negiertes AND (NOT nach AND)",
      "ok": false
     },
     {
      "t": "Funktional dasselbe wie XOR",
      "ok": false
     },
     {
      "t": "Zwei OR-Gatter hintereinander",
      "ok": false
     }
    ],
    "e": "NOR = NOT-OR: nur 1, wenn beide Eingänge 0 sind."
   },
   {
    "q": "Was ergibt 0 NOR 0?",
    "o": [
     {
      "t": "1",
      "ok": true
     },
     {
      "t": "0",
      "ok": false
     },
     {
      "t": "undefiniert",
      "ok": false
     },
     {
      "t": "2",
      "ok": false
     }
    ],
    "e": "OR von 0,0 = 0, negiert = 1."
   },
   {
    "q": "Wann liefert XNOR (Exklusiv-NOR) eine 1?",
    "o": [
     {
      "t": "Wenn beide Eingänge gleich sind",
      "ok": true
     },
     {
      "t": "Wenn die Eingänge verschieden sind",
      "ok": false
     },
     {
      "t": "Nur bei 1 und 1",
      "ok": false
     },
     {
      "t": "Nie",
      "ok": false
     }
    ],
    "e": "XNOR = negiertes XOR: 1, wenn beide Eingänge gleich sind (Gleichheitsprüfung)."
   },
   {
    "q": "Was ergibt 0 XNOR 0?",
    "o": [
     {
      "t": "1",
      "ok": true
     },
     {
      "t": "0",
      "ok": false
     },
     {
      "t": "undefiniert",
      "ok": false
     },
     {
      "t": "2",
      "ok": false
     }
    ],
    "e": "Eingänge gleich → XNOR = 1."
   },
   {
    "q": "Welche Verknüpfung wird zur Berechnung der Netzadresse genutzt?",
    "o": [
     {
      "t": "AND von IP-Adresse und Subnetzmaske",
      "ok": true
     },
     {
      "t": "OR von IP und Maske",
      "ok": false
     },
     {
      "t": "XOR von IP und Maske",
      "ok": false
     },
     {
      "t": "NOT der IP-Adresse",
      "ok": false
     }
    ],
    "e": "Bitweises AND aus IP UND Subnetzmaske ergibt die Netzadresse."
   },
   {
    "q": "Was ergibt 192 AND 255 (bitweise, ein Oktett)?",
    "o": [
     {
      "t": "192",
      "ok": true
     },
     {
      "t": "255",
      "ok": false
     },
     {
      "t": "0",
      "ok": false
     },
     {
      "t": "63",
      "ok": false
     }
    ],
    "e": "AND mit 255 (alle Bits 1) lässt den Wert unverändert: 192 AND 255 = 192."
   },
   {
    "q": "Was ergibt ein beliebiger Wert AND 0 (bitweise)?",
    "o": [
     {
      "t": "0",
      "ok": true
     },
     {
      "t": "der Wert selbst",
      "ok": false
     },
     {
      "t": "255",
      "ok": false
     },
     {
      "t": "1",
      "ok": false
     }
    ],
    "e": "AND mit 0 löscht alle Bits → Ergebnis immer 0. Deshalb ergibt das Host-Oktett bei Maske 0 die 0."
   },
   {
    "q": "Warum nutzt man beim Subnetting AND und nicht OR?",
    "o": [
     {
      "t": "AND setzt mit der 1-Maske gezielt den Netzanteil durch",
      "ok": true
     },
     {
      "t": "OR würde alle Hostbits auf 1 setzen statt sie auszublenden",
      "ok": false
     },
     {
      "t": "AND liefert direkt die Broadcast-Adresse des Subnetzes",
      "ok": false
     },
     {
      "t": "OR ermittelt zuverlässiger den Hostanteil der Adresse",
      "ok": false
     }
    ],
    "e": "Die 1-Bits der Maske geben den Netzanteil durch, die 0-Bits blenden den Hostanteil aus — das leistet nur AND."
   },
   {
    "q": "Welche Verknüpfung eignet sich zum Prüfen, ob zwei Bits gleich sind?",
    "o": [
     {
      "t": "XNOR",
      "ok": true
     },
     {
      "t": "XOR",
      "ok": false
     },
     {
      "t": "NAND",
      "ok": false
     },
     {
      "t": "OR",
      "ok": false
     }
    ],
    "e": "XNOR liefert 1 bei Gleichheit — klassische Gleichheitsprüfung."
   },
   {
    "q": "Welche Verknüpfung eignet sich zum Erkennen einer Bit-Änderung?",
    "o": [
     {
      "t": "XOR",
      "ok": true
     },
     {
      "t": "AND",
      "ok": false
     },
     {
      "t": "XNOR",
      "ok": false
     },
     {
      "t": "NOR",
      "ok": false
     }
    ],
    "e": "XOR ist 1, sobald sich zwei Bits unterscheiden — ideal zur Differenzerkennung (auch Parität)."
   },
   {
    "q": "Wie viele Eingänge hat ein NOT-Gatter typischerweise?",
    "o": [
     {
      "t": "Einen",
      "ok": true
     },
     {
      "t": "Zwei",
      "ok": false
     },
     {
      "t": "Drei",
      "ok": false
     },
     {
      "t": "Keinen",
      "ok": false
     }
    ],
    "e": "NOT/Inverter arbeitet mit genau einem Eingang."
   },
   {
    "q": "Was ergibt die Wahrheitstabelle von AND bei den Eingängen 0/0, 0/1, 1/0, 1/1?",
    "o": [
     {
      "t": "0, 0, 0, 1",
      "ok": true
     },
     {
      "t": "0, 1, 1, 1",
      "ok": false
     },
     {
      "t": "1, 1, 1, 0",
      "ok": false
     },
     {
      "t": "0, 1, 1, 0",
      "ok": false
     }
    ],
    "e": "AND ist nur bei 1/1 gleich 1 → Ausgänge 0,0,0,1."
   },
   {
    "q": "Was ergibt die Wahrheitstabelle von OR bei 0/0, 0/1, 1/0, 1/1?",
    "o": [
     {
      "t": "0, 1, 1, 1",
      "ok": true
     },
     {
      "t": "0, 0, 0, 1",
      "ok": false
     },
     {
      "t": "1, 0, 0, 0",
      "ok": false
     },
     {
      "t": "0, 1, 1, 0",
      "ok": false
     }
    ],
    "e": "OR ist nur bei 0/0 gleich 0 → Ausgänge 0,1,1,1."
   },
   {
    "q": "Was ergibt 0 AND 0?",
    "o": [
     {
      "t": "0",
      "ok": true
     },
     {
      "t": "1",
      "ok": false
     },
     {
      "t": "undefiniert",
      "ok": false
     },
     {
      "t": "2",
      "ok": false
     }
    ],
    "e": "AND ist nur 1 wenn beide Eingänge 1 sind — alle anderen Kombinationen ergeben 0."
   },
   {
    "q": "Was ergibt 1 OR 0?",
    "o": [
     {
      "t": "1",
      "ok": true
     },
     {
      "t": "0",
      "ok": false
     },
     {
      "t": "undefiniert",
      "ok": false
     },
     {
      "t": "2",
      "ok": false
     }
    ],
    "e": "OR ist 1 sobald mindestens ein Eingang 1 ist."
   },
   {
    "q": "Was ergibt 0 XOR 0?",
    "o": [
     {
      "t": "0",
      "ok": true
     },
     {
      "t": "1",
      "ok": false
     },
     {
      "t": "undefiniert",
      "ok": false
     },
     {
      "t": "2",
      "ok": false
     }
    ],
    "e": "XOR ist 1 wenn die Eingänge verschieden sind. Gleiche Eingänge → 0."
   },
   {
    "q": "Was ergibt NOT(NOT(1))?",
    "o": [
     {
      "t": "1",
      "ok": true
     },
     {
      "t": "0",
      "ok": false
     },
     {
      "t": "undefiniert",
      "ok": false
     },
     {
      "t": "2",
      "ok": false
     }
    ],
    "e": "NOT(1) = 0, NOT(0) = 1 — doppelte Negation hebt sich auf."
   },
   {
    "q": "Welches Gatter liefert nur bei 0/0 eine 1?",
    "o": [
     {
      "t": "NOR",
      "ok": true
     },
     {
      "t": "NAND",
      "ok": false
     },
     {
      "t": "XOR",
      "ok": false
     },
     {
      "t": "AND",
      "ok": false
     }
    ],
    "e": "NOR = NOT(OR): nur wenn beide Eingänge 0 sind, ist OR=0, also NOR=1."
   },
   {
    "q": "Welches Gatter ist das universelle Gatter (kann alle anderen ersetzen)?",
    "o": [
     {
      "t": "NAND",
      "ok": true
     },
     {
      "t": "OR",
      "ok": false
     },
     {
      "t": "XOR",
      "ok": false
     },
     {
      "t": "NOT",
      "ok": false
     }
    ],
    "e": "Aus NAND-Gattern lassen sich alle anderen Gatter (AND, OR, NOT, XOR...) aufbauen. Dasselbe gilt für NOR."
   },
   {
    "q": "Was ergibt 1 NAND 0?",
    "o": [
     {
      "t": "1",
      "ok": true
     },
     {
      "t": "0",
      "ok": false
     },
     {
      "t": "undefiniert",
      "ok": false
     },
     {
      "t": "2",
      "ok": false
     }
    ],
    "e": "AND(1,0) = 0, NOT(0) = 1. NAND gibt nur bei 1/1 eine 0 aus."
   },
   {
    "q": "Welche Verknüpfung liefert über mehrere Bits verkettet eine Paritätsprüfung (erkennt gerade/ungerade Anzahl von Einsen)?",
    "o": [
     {
      "t": "XOR",
      "ok": true
     },
     {
      "t": "AND",
      "ok": false
     },
     {
      "t": "XNOR",
      "ok": false
     },
     {
      "t": "NOR",
      "ok": false
     }
    ],
    "e": "XOR über mehrere Bits verkettet ergibt 1 bei ungerader Einsenanzahl — Grundlage der Paritätsprüfung."
   }
  ]
 },
 "virt": {
  "name": "Virtualisierung Grundlagen",
  "q": [
   {
    "q": "Was bedeutet \"virtuell\" im IT-Kontext?",
    "o": [
     { "t": "Die flexible Nachbildung physischer Systeme, die real erscheint, aber nicht echt ist", "ok": true },
     { "t": "Die dauerhafte Stilllegung physischer Hardware zugunsten reiner Software", "ok": false },
     { "t": "Die Verschlüsselung sämtlicher Daten auf einem physischen Server", "ok": false },
     { "t": "Die Vernetzung mehrerer physischer Rechner zu einem Cluster", "ok": false }
    ],
    "e": "Virtuell heißt: nicht real vorhanden, aber real erscheinend. Die virtuelle Infrastruktur läuft dabei stets auf echter, traditioneller Hardware."
   },
   {
    "q": "Was ist Virtualisierung von Betriebssystemen im Kern?",
    "o": [
     { "t": "Die gleichzeitige Nutzung mehrerer Betriebssysteme auf einer gemeinsamen Hardwarebasis", "ok": true },
     { "t": "Der Austausch eines Betriebssystems gegen eine neuere Version ohne Datenverlust", "ok": false },
     { "t": "Die Trennung eines Netzwerks in mehrere logisch isolierte Bereiche", "ok": false },
     { "t": "Die automatische Verteilung von Software-Updates auf alle Endgeräte", "ok": false }
    ],
    "e": "Ein leistungsfähiger Computer dient als gemeinsame Basis, auf der mehrere Betriebssysteme parallel betrieben werden."
   },
   {
    "q": "Was bezeichnet Simulation im Unterschied zu Virtualisierung?",
    "o": [
     { "t": "Die vollständige softwareseitige Nachbildung eines Systems, ohne dass reale Ergebnisse entstehen", "ok": true },
     { "t": "Den direkten Betrieb eines Gastsystems auf der Hardware-Architektur des Hosts", "ok": false },
     { "t": "Die Aufteilung physischer Ressourcen auf mehrere gleichwertige Nutzer", "ok": false },
     { "t": "Die Übersetzung von Prozessorbefehlen zwischen zwei unterschiedlichen CPU-Architekturen", "ok": false }
    ],
    "e": "Simulation bildet ein System komplett softwareseitig nach, führt aber zu keinem realen Ergebnis — im Unterschied zur Virtualisierung, die echte Betriebssysteme echt ausführt."
   },
   {
    "q": "Ein Flugsimulator ist ein klassisches Beispiel wofür?",
    "o": [
     { "t": "Simulation: er bildet den Flug nach, bringt den Piloten aber nicht wirklich ans Ziel", "ok": true },
     { "t": "Emulation: er übersetzt reale Flugdaten in ein anderes Datenformat", "ok": false },
     { "t": "Virtualisierung: er teilt die Rechenleistung eines Flugzeugs auf mehrere Systeme auf", "ok": false },
     { "t": "Live-Migration: er verschiebt den Trainingsbetrieb auf ein anderes Gerät", "ok": false }
    ],
    "e": "Der Simulator bildet den Flug nach, ohne dass am Ende ein reales Ziel erreicht wird — genau das unterscheidet Simulation von echtem Betrieb."
   },
   {
    "q": "Was passiert bei einer Hardware-Emulation?",
    "o": [
     { "t": "Sämtliche Hardware-Komponenten werden softwareseitig nachgebildet, inklusive der CPU", "ok": true },
     { "t": "Nur die CPU wird nachgebildet, alle anderen Komponenten bleiben real", "ok": false },
     { "t": "Die vorhandene Hardware wird auf mehrere Gastsysteme gleichmäßig aufgeteilt", "ok": false },
     { "t": "Ein bestehendes System wird unverändert auf neuere Hardware übertragen", "ok": false }
    ],
    "e": "Bei der Hardware-Emulation wird jede Komponente softwareseitig nachgebildet, einschließlich der CPU selbst."
   },
   {
    "q": "Warum verursacht CPU-Emulation typischerweise einen großen Overhead?",
    "o": [
     { "t": "Weil Hardware-Instruktionen erst auf die native CPU übersetzt werden müssen", "ok": true },
     { "t": "Weil dabei grundsätzlich mehrere Betriebssysteme parallel laufen müssen", "ok": false },
     { "t": "Weil die emulierte CPU immer mit voller Taktrate arbeitet, egal ob nötig", "ok": false },
     { "t": "Weil jede emulierte Komponente eine eigene Netzwerkverbindung benötigt", "ok": false }
    ],
    "e": "Jede Instruktion muss erst in eine Instruktion der nativen CPU übersetzt werden, bevor sie ausgeführt werden kann — das kostet Performance."
   },
   {
    "q": "Worin unterscheidet sich Virtualisierung von Hardware-Emulation?",
    "o": [
     { "t": "Bei Virtualisierung wird die CPU nicht nachgebildet, das Gastsystem nutzt die Architektur des Hosts direkt", "ok": true },
     { "t": "Bei Virtualisierung wird zusätzlich zur CPU auch das Netzwerk komplett emuliert", "ok": false },
     { "t": "Virtualisierung funktioniert ausschließlich ohne jede Art von Hypervisor", "ok": false },
     { "t": "Virtualisierung erfordert immer eine andere CPU-Architektur als die des Hosts", "ok": false }
    ],
    "e": "Bei Virtualisierung entfällt die CPU-Emulation: Das Gastsystem nutzt direkt die CPU-Architektur des Hosts, was deutlich mehr Performance bringt."
   },
   {
    "q": "Was kennzeichnet Servervirtualisierung grundlegend?",
    "o": [
     { "t": "Jeder virtuelle Server erhält ein festgelegtes Volumen der Host-Ressourcen zugewiesen", "ok": true },
     { "t": "Alle virtuellen Server teilen sich zwingend ein einziges gemeinsames Betriebssystem", "ok": false },
     { "t": "Jeder virtuelle Server benötigt zwingend eigene physische Netzwerkhardware", "ok": false },
     { "t": "Virtuelle Server können ausschließlich auf mobilen Endgeräten betrieben werden", "ok": false }
    ],
    "e": "Die verfügbaren Host-Ressourcen werden auf mehrere virtuelle Server mit jeweils festem Volumen aufgeteilt."
   },
   {
    "q": "Welches Grundproblem ohne Servervirtualisierung dient als Motivation für deren Einsatz?",
    "o": [
     { "t": "Auf einem physischen Server läuft nur ein Betriebssystem, ungenutzte Ressourcen bleiben liegen", "ok": true },
     { "t": "Physische Server können grundsätzlich keine Netzwerkdienste bereitstellen", "ok": false },
     { "t": "Physische Server benötigen für jeden Dienst eine eigene Stromversorgung", "ok": false },
     { "t": "Physische Server lassen sich ohne Virtualisierung nicht mit dem Internet verbinden", "ok": false }
    ],
    "e": "Ohne Virtualisierung läuft pro physischem Server nur ein Betriebssystem — für jeden weiteren Dienst wäre ein weiterer Server nötig."
   },
   {
    "q": "Welcher Vorteil wird der Servervirtualisierung zugeschrieben?",
    "o": [
     { "t": "Bessere Hardwareauslastung sowie schnelleres Backup und schnellere Bereitstellung", "ok": true },
     { "t": "Vollständiger Wegfall jeglicher Lizenzkosten für Betriebssysteme", "ok": false },
     { "t": "Garantierte Immunität gegenüber jeder Art von Hardwareausfall", "ok": false },
     { "t": "Automatische Kompatibilität mit sämtlicher bestehender Software", "ok": false }
    ],
    "e": "Neben besserer Auslastung nennt der Kurs u. a. zentrale Verwaltung, Skalierbarkeit und geringere Hardwarekosten."
   },
   {
    "q": "Welcher Nachteil wird der Servervirtualisierung zugeschrieben?",
    "o": [
     { "t": "Ein Hardwareausfall auf dem Host hat gravierende Folgen für alle virtuellen Server", "ok": true },
     { "t": "Es kann grundsätzlich nur noch ein einziger Dienst pro Host betrieben werden", "ok": false },
     { "t": "Die Bereitstellung neuer Server dauert dadurch spürbar länger als vorher", "ok": false },
     { "t": "Zentrale Verwaltung mehrerer Server wird dadurch grundsätzlich unmöglich", "ok": false }
    ],
    "e": "Weil mehrere virtuelle Server auf einem Host laufen, wirkt sich ein Hardwarefehler auf alle gleichzeitig aus."
   },
   {
    "q": "Was bedeutet Überprovisionierung (Overcommitment) bei virtuellen Maschinen?",
    "o": [
     { "t": "Den virtuellen Maschinen wird in Summe mehr Ressourcen zugewiesen, als physisch vorhanden ist", "ok": true },
     { "t": "Jeder virtuellen Maschine wird dauerhaft weniger zugewiesen, als sie tatsächlich benötigt", "ok": false },
     { "t": "Virtuelle Maschinen erhalten grundsätzlich exakt gleich viele Ressourcen wie der Host besitzt", "ok": false },
     { "t": "Die Anzahl virtueller Maschinen wird technisch auf einen festen Höchstwert begrenzt", "ok": false }
    ],
    "e": "Es werden mehr Ressourcen zugeteilt, als in Summe physisch existieren — solange nicht alle VMs gleichzeitig voll zugreifen, funktioniert das."
   },
   {
    "q": "Wann wird Überprovisionierung zum praktischen Problem?",
    "o": [
     { "t": "Wenn mehrere virtuelle Maschinen ihre zugewiesenen Ressourcen gleichzeitig tatsächlich abrufen", "ok": true },
     { "t": "Wenn eine virtuelle Maschine dauerhaft weniger Ressourcen nutzt, als ihr zugewiesen wurde", "ok": false },
     { "t": "Wenn der Host über deutlich mehr physische Ressourcen verfügt als benötigt", "ok": false },
     { "t": "Wenn nur eine einzige virtuelle Maschine auf dem Host betrieben wird", "ok": false }
    ],
    "e": "Erst wenn der gleichzeitige tatsächliche Bedarf die physisch vorhandenen Ressourcen übersteigt, entstehen Engpässe."
   },
   {
    "q": "Welche Lösungsansätze gibt es gegen Engpässe durch Überprovisionierung?",
    "o": [
     { "t": "Monitoring der Auslastung, Prognosen und wenn nötig Live-Migration einzelner VMs", "ok": true },
     { "t": "Grundsätzlicher Verzicht auf jede Form der Ressourcenzuteilung an VMs", "ok": false },
     { "t": "Dauerhafte Abschaltung aller virtuellen Maschinen außerhalb der Kernarbeitszeit", "ok": false },
     { "t": "Feste Begrenzung auf maximal eine virtuelle Maschine je physischem Server", "ok": false }
    ],
    "e": "Monitoring und Auslastungsprognosen erkennen Engpässe frühzeitig, Live-Migration kann im Ernstfall entlasten."
   },
   {
    "q": "Was versteht man unter Live-Migration einer virtuellen Maschine?",
    "o": [
     { "t": "Die Verschiebung einer laufenden VM auf einen anderen Host, ohne den Betrieb zu unterbrechen", "ok": true },
     { "t": "Das dauerhafte Löschen einer VM samt aller zugehörigen Daten", "ok": false },
     { "t": "Die einmalige Sicherung einer VM auf ein externes Speichermedium", "ok": false },
     { "t": "Den Neustart einer VM nach einem Absturz mit Werkseinstellungen", "ok": false }
    ],
    "e": "Die VM wird im laufenden Betrieb auf einen anderen Host portiert, ohne dass der Dienst unterbrochen wird."
   },
   {
    "q": "Welchen praktischen Nutzen bringt Live-Migration?",
    "o": [
     { "t": "Sie vereinfacht Wartungsarbeiten und den Lastenausgleich zwischen Hosts", "ok": true },
     { "t": "Sie verhindert dauerhaft jede Form von Überprovisionierung im Cluster", "ok": false },
     { "t": "Sie ersetzt vollständig die Notwendigkeit regelmäßiger Backups", "ok": false },
     { "t": "Sie erhöht automatisch die einer VM zugewiesene Rechenleistung", "ok": false }
    ],
    "e": "Wartungsarbeiten am Host und Lastenausgleich zwischen mehreren Hosts lassen sich dadurch ohne Ausfallzeit durchführen."
   },
   {
    "q": "Was ist der Kerngedanke der Anwendungsvirtualisierung?",
    "o": [
     { "t": "Die Installation einer Anwendung wird vom Client-Computer getrennt, der auf sie zugreift", "ok": true },
     { "t": "Jede Anwendung erhält ein eigenes vollständiges Betriebssystem als Laufzeitumgebung", "ok": false },
     { "t": "Anwendungen werden dauerhaft auf jedem einzelnen Client neu installiert", "ok": false },
     { "t": "Der komplette Client-Computer wird als virtuelle Maschine auf einem Server nachgebildet", "ok": false }
    ],
    "e": "Die Anwendung läuft getrennt vom Client, der sie nutzt — Teile werden bei Bedarf geladen, installiert wird lokal nichts."
   },
   {
    "q": "Welcher Vorteil spricht für Anwendungsvirtualisierung?",
    "o": [
     { "t": "Die Anwendung muss nur einmal installiert werden und lässt sich einfach austauschen", "ok": true },
     { "t": "Grafikintensive Anwendungen laufen dadurch grundsätzlich performanter", "ok": false },
     { "t": "Eine Netzwerkverbindung wird für den Betrieb dadurch überflüssig", "ok": false },
     { "t": "Die Lizenzierung wird dadurch in jedem Fall einfacher als bei lokaler Installation", "ok": false }
    ],
    "e": "Zentrale Pflege einer einzigen Installation vereinfacht Austausch, Updates und Verlagerung auf andere Clients."
   },
   {
    "q": "Welcher Nachteil wird der Anwendungsvirtualisierung zugeschrieben?",
    "o": [
     { "t": "Grafikintensive Anwendungen können spürbar beeinträchtigt sein, zudem ist eine stabile Verbindung nötig", "ok": true },
     { "t": "Anwendungen müssen dadurch auf jedem Client einzeln neu installiert werden", "ok": false },
     { "t": "Updates und Patches werden dadurch grundsätzlich komplizierter als sonst", "ok": false },
     { "t": "Die Zugriffskontrolle auf die Anwendung wird dadurch erheblich erschwert", "ok": false }
    ],
    "e": "Da die Anwendung über das Netzwerk bereitgestellt wird, leiden grafiklastige Programme und die Verbindung muss stabil sein."
   },
   {
    "q": "Was kennzeichnet Betriebssystem- bzw. Containervirtualisierung?",
    "o": [
     { "t": "Sie läuft als Anwendung innerhalb des Host-Betriebssystems, ganz ohne eigenen Hypervisor", "ok": true },
     { "t": "Sie benötigt zwingend einen Typ-1-Hypervisor direkt auf der Hardware", "ok": false },
     { "t": "Jeder Container erhält ein vollständig eigenständiges Betriebssystem samt Kernel", "ok": false },
     { "t": "Sie ist ausschließlich für die Virtualisierung ganzer Desktop-Umgebungen gedacht", "ok": false }
    ],
    "e": "Ohne eigenen Hypervisor teilen sich alle Container den Kernel des Host-Betriebssystems."
   },
   {
    "q": "Woraus besteht ein Container?",
    "o": [
     { "t": "Aus der Anwendung mit ihren Abhängigkeiten, Programmbibliotheken und Konfigurationsdateien", "ok": true },
     { "t": "Ausschließlich aus einem vollständigen eigenen Betriebssystem-Kernel", "ok": false },
     { "t": "Nur aus der ausführbaren Datei der Anwendung ohne weitere Bestandteile", "ok": false },
     { "t": "Aus einer virtuellen Festplatte mit dem kompletten Host-Dateisystem ohne Betriebssystem", "ok": false }
    ],
    "e": "Ein Container bündelt Anwendung, Abhängigkeiten, Bibliotheken, Konfiguration und weitere Werkzeuge in einer Laufzeitumgebung."
   },
   {
    "q": "Welcher Vorteil wird Containern gegenüber klassischen VMs zugeschrieben?",
    "o": [
     { "t": "Geringerer Ressourcenverbrauch sowie schnellere Bereitstellung und gute Skalierbarkeit", "ok": true },
     { "t": "Vollständige Isolation durch einen eigenen, vom Host getrennten Kernel", "ok": false },
     { "t": "Grundsätzliche Unabhängigkeit von jeglicher Host-Konfiguration", "ok": false },
     { "t": "Automatischer Verzicht auf jede Form von Fehlerisolierung zwischen Containern", "ok": false }
    ],
    "e": "Weil kein eigener Betriebssystem-Kernel mitläuft, sind Container ressourcenschonender und lassen sich schneller bereitstellen."
   },
   {
    "q": "Welcher Nachteil wird Containern zugeschrieben?",
    "o": [
     { "t": "Einrichtung und Verwaltung sind komplizierter und erfordern entsprechendes Fachwissen", "ok": true },
     { "t": "Sie verbrauchen grundsätzlich mehr Ressourcen als klassische virtuelle Maschinen", "ok": false },
     { "t": "Sie lassen sich grundsätzlich nicht auf unterschiedlicher Hardware betreiben", "ok": false },
     { "t": "Bereitstellung neuer Container dauert grundsätzlich länger als bei klassischen VMs", "ok": false }
    ],
    "e": "Die geteilte Kernel-Nutzung macht Einrichtung und Betrieb anspruchsvoller als bei klassischen VMs."
   },
   {
    "q": "Was beschreibt Virtual Desktop Infrastructure (VDI)?",
    "o": [
     { "t": "Individuell konfigurierte Betriebssysteminstanzen für Arbeitsplätze werden zentral auf einem Server bereitgestellt", "ok": true },
     { "t": "Mehrere Nutzer teilen sich dauerhaft dieselbe Desktop-Sitzung auf einem lokalen Rechner", "ok": false },
     { "t": "Jeder Arbeitsplatzrechner erhält eine eigene physische Festplatte im Server-Rack", "ok": false },
     { "t": "Desktop-Anwendungen werden ausschließlich lokal auf leistungsstarken Clients ausgeführt", "ok": false }
    ],
    "e": "Statt lokaler Installation läuft jeder Arbeitsplatz als eigene Betriebssysteminstanz zentral auf einem Server."
   },
   {
    "q": "Welcher Vorteil wird VDI zugeschrieben?",
    "o": [
     { "t": "Hohe Datensicherheit, da die Daten auf dem Server verbleiben, sowie einfachere Administration", "ok": true },
     { "t": "Deutlich geringere Anschaffungskosten gegenüber klassischen Arbeitsplatzrechnern", "ok": false },
     { "t": "Vollständige Unabhängigkeit vom Netzwerk während des laufenden Betriebs", "ok": false },
     { "t": "Grundsätzlich höhere Leistung als bei lokal installierten Betriebssystemen", "ok": false }
    ],
    "e": "Da die Daten zentral auf dem Server bleiben, sind sie besser geschützt, zudem lassen sich Desktops leichter administrieren."
   },
   {
    "q": "Welcher Nachteil wird VDI zugeschrieben?",
    "o": [
     { "t": "Hohe Anfangskosten, zudem legt ein Server-Ausfall den kompletten Betrieb lahm", "ok": true },
     { "t": "Clients werden dadurch grundsätzlich anfälliger für Schadsoftware als zuvor", "ok": false },
     { "t": "Die Administration der Arbeitsplätze wird dadurch erheblich aufwendiger", "ok": false },
     { "t": "Eine Netzwerkverbindung wird für den laufenden Betrieb überflüssig", "ok": false }
    ],
    "e": "VDI lohnt sich erst ab einer gewissen Clientzahl wirtschaftlich, und ein Serverausfall betrifft sofort alle Arbeitsplätze."
   }
  ]
 },
 "hyperv": {
  "name": "Hypervisor & Virtualisierungstechnik",
  "q": [
   {
    "q": "Welche Aufgabe hat ein Hypervisor?",
    "o": [
     { "t": "Er erstellt und verwaltet die virtuelle Hardware und stellt eine Abstraktionsschicht bereit", "ok": true },
     { "t": "Er übernimmt ausschließlich die Netzwerkverbindung zwischen mehreren physischen Servern", "ok": false },
     { "t": "Er verschlüsselt sämtliche Daten, die zwischen Host und Gastsystem ausgetauscht werden", "ok": false },
     { "t": "Er ersetzt dauerhaft das Betriebssystem auf jedem einzelnen Client-Rechner", "ok": false }
    ],
    "e": "Der Hypervisor bildet die Abstraktionsschicht zwischen physischer Hardware und den virtuellen Maschinen, die auf ihr laufen."
   },
   {
    "q": "Was kennzeichnet einen Typ-1-Hypervisor?",
    "o": [
     { "t": "Er läuft direkt auf der Hardware, ganz ohne zugrundeliegendes Betriebssystem", "ok": true },
     { "t": "Er setzt zwingend auf einem vollständig installierten Betriebssystem auf", "ok": false },
     { "t": "Er kann ausschließlich eine einzige virtuelle Maschine gleichzeitig verwalten", "ok": false },
     { "t": "Er wird ausschließlich für die Virtualisierung einzelner Anwendungen genutzt", "ok": false }
    ],
    "e": "Auch Baremetal-Hypervisor genannt: Er läuft selbst wie ein Betriebssystem direkt auf der Hardware, ohne ein weiteres OS darunter."
   },
   {
    "q": "Welche Produkte sind typische Beispiele für einen Typ-1-Hypervisor?",
    "o": [
     { "t": "Microsoft Hyper-V, VMware ESXi, Citrix Xen und KVM", "ok": true },
     { "t": "VirtualBox, VMware Workstation und Parallels Desktop", "ok": false },
     { "t": "Docker, BSD Jails und Solaris Zones", "ok": false },
     { "t": "Microsoft Virtual PC und VMware Fusion", "ok": false }
    ],
    "e": "Alle vier laufen direkt auf der Hardware, ohne dass darunter ein vollständiges Betriebssystem installiert sein muss."
   },
   {
    "q": "Was kennzeichnet einen Typ-2-Hypervisor?",
    "o": [
     { "t": "Er setzt auf einem bereits vollständig installierten Betriebssystem auf und läuft darüber", "ok": true },
     { "t": "Er läuft direkt auf der Hardware, ganz ohne zugrundeliegendes Betriebssystem", "ok": false },
     { "t": "Er wird ausschließlich in Rechenzentren für Cloud-Angebote eingesetzt", "ok": false },
     { "t": "Er benötigt zwingend eine hardwareseitige Erweiterung wie Intel VT", "ok": false }
    ],
    "e": "Auch Hosted-Hypervisor genannt: Er wird wie eine gewöhnliche Anwendung innerhalb eines bereits laufenden Betriebssystems gestartet."
   },
   {
    "q": "Welche Produkte sind typische Beispiele für einen Typ-2-Hypervisor?",
    "o": [
     { "t": "VirtualBox, VMware Workstation und Microsoft Virtual PC", "ok": true },
     { "t": "Microsoft Hyper-V, VMware ESXi, Citrix Xen und KVM", "ok": false },
     { "t": "Docker, Microsoft Hyper-V Container, BSD Jails und Solaris Zones", "ok": false },
     { "t": "KVM, Citrix XenApp und Microsoft App-V", "ok": false }
    ],
    "e": "Alle drei setzen auf einem vollständig installierten Host-Betriebssystem auf, statt direkt auf der Hardware zu laufen."
   },
   {
    "q": "Warum laufen die privilegierten Befehle eines Gastsystems im Ring-Schema trotzdem stabil, obwohl sie eigentlich Ring 0 bräuchten?",
    "o": [
     { "t": "Der Hypervisor analysiert diese Befehle und baut sie bei Bedarf passend um", "ok": true },
     { "t": "Das Gastsystem erhält vom Hypervisor dauerhaft vollen Zugriff auf Ring 0", "ok": false },
     { "t": "Die CPU schaltet für virtuelle Maschinen grundsätzlich komplett in Ring 0 um", "ok": false },
     { "t": "Der Host verzichtet für virtuelle Maschinen vollständig auf das Ring-Schema", "ok": false }
    ],
    "e": "Damit virtuelle Systeme trotzdem in Ring 3 laufen können, fängt der Hypervisor kritische Befehle ab und ersetzt sie durch passende Alternativen."
   },
   {
    "q": "Warum bereiten ältere Hypervisor-Versionen mit neueren Betriebssystemen manchmal Probleme?",
    "o": [
     { "t": "Weil Betriebssysteme Anpassungen brauchen, damit Ring-0-Befehle korrekt in Ring 3 laufen", "ok": true },
     { "t": "Weil neuere Betriebssysteme grundsätzlich keine Treiber für virtuelle Hardware mehr mitbringen", "ok": false },
     { "t": "Weil ältere Hypervisor-Versionen keine Netzwerkverbindung mehr unterstützen", "ok": false },
     { "t": "Weil neuere Betriebssysteme zwingend einen Typ-1-Hypervisor voraussetzen", "ok": false }
    ],
    "e": "Betriebssysteme verlangen unterschiedliche Anpassungen, damit ihre eigentlich für Ring 0 gedachten Befehle korrekt in Ring 3 funktionieren."
   },
   {
    "q": "Was ist die Grundidee der Para-Virtualisierung?",
    "o": [
     { "t": "Statt Hardware zu emulieren, stellt der Hypervisor eine API bereit, die der Gast direkt nutzen muss", "ok": true },
     { "t": "Sämtliche Hardware-Komponenten werden für den Gast vollständig emuliert", "ok": false },
     { "t": "Der Gast läuft komplett unabhängig vom Hypervisor auf eigener physischer Hardware", "ok": false },
     { "t": "Zwei Gastsysteme teilen sich direkt denselben Arbeitsspeicherbereich ohne Trennung", "ok": false }
    ],
    "e": "Statt aufwendiger Emulation nutzt der Gast eine vom Hypervisor bereitgestellte Schnittstelle direkt — dafür muss er sie aber kennen."
   },
   {
    "q": "Welcher Vorteil spricht für Para-Virtualisierung gegenüber klassischer Emulation?",
    "o": [
     { "t": "Die Kommunikation über die API ist schneller und es entsteht kein Verlust durch Befehlsübersetzung", "ok": true },
     { "t": "Der Kern des Gast-Betriebssystems muss dafür überhaupt nicht angepasst werden", "ok": false },
     { "t": "Sie lässt sich ohne jede Anpassung auf beliebiger vorhandener Hardware einsetzen", "ok": false },
     { "t": "Sie kommt vollständig ohne einen installierten Hypervisor aus", "ok": false }
    ],
    "e": "Da keine Befehle übersetzt werden müssen, läuft die Kommunikation über die API mit deutlich weniger Overhead."
   },
   {
    "q": "Welcher Nachteil spricht gegen Para-Virtualisierung?",
    "o": [
     { "t": "Der Kernel des Gastsystems muss angepasst oder bereits vom Hersteller modifiziert sein", "ok": true },
     { "t": "Sie verursacht durch die Befehlsübersetzung einen spürbar größeren Overhead", "ok": false },
     { "t": "Sie lässt sich ausschließlich auf Typ-2-Hypervisoren betreiben", "ok": false },
     { "t": "Sie benötigt zwingend eine hardwareseitige Erweiterung wie Intel VT oder AMD-V", "ok": false }
    ],
    "e": "Der Gast muss die bereitgestellte API tatsächlich nutzen können — das erfordert einen angepassten oder bereits vorbereiteten Kernel."
   },
   {
    "q": "In welchen Bereichen wird Para-Virtualisierung typischerweise eingesetzt?",
    "o": [
     { "t": "In Rechenzentren und bei Anbietern von Cloud-Computing-Lösungen", "ok": true },
     { "t": "Ausschließlich auf privaten Heim-PCs für den gelegentlichen Testbetrieb", "ok": false },
     { "t": "Nur auf mobilen Endgeräten mit eingeschränkter Rechenleistung", "ok": false },
     { "t": "Ausschließlich für die reine Anwendungsvirtualisierung ohne Betriebssystem", "ok": false }
    ],
    "e": "Der geringere Overhead macht sie besonders für große, professionell betriebene Umgebungen attraktiv."
   },
   {
    "q": "Was bewirken Erweiterungen wie Intel VT und AMD-V?",
    "o": [
     { "t": "Der Prozessor kann VM-Befehle direkt übersetzen, ganz ohne Anpassung am Gast-Kernel", "ok": true },
     { "t": "Sie ersetzen den Hypervisor vollständig durch reine Hardwarefunktionen", "ok": false },
     { "t": "Sie ermöglichen erstmals den Betrieb mehrerer Betriebssysteme auf einer Hardware", "ok": false },
     { "t": "Sie machen Para-Virtualisierung auf jeder beliebigen Hardware nutzbar", "ok": false }
    ],
    "e": "Mit Hardwareunterstützung entfällt die softwareseitige Befehlsübersetzung — der Prozessor übernimmt das selbst, ohne den Gast-Kernel anzufassen."
   },
   {
    "q": "Sind Intel VT und AMD-V untereinander kompatibel?",
    "o": [
     { "t": "Nein, beide Erweiterungen der Ring-Topologie sind nicht miteinander kompatibel", "ok": true },
     { "t": "Ja, beide folgen exakt demselben offenen Industriestandard", "ok": false },
     { "t": "Ja, aber nur bei Verwendung eines Typ-1-Hypervisors", "ok": false },
     { "t": "Nur bei Prozessoren desselben Herstellers ist Kompatibilität möglich", "ok": false }
    ],
    "e": "Beide Hersteller erweitern die Ring-Topologie auf eigene, zueinander inkompatible Weise."
   },
   {
    "q": "Welchen allgemeinen Vorteile gibt es für Virtualisierung insgesamt?",
    "o": [
     { "t": "Kostengünstiger, da weniger Hardware benötigt wird, und ideal als Test- und Entwicklungsumgebung", "ok": true },
     { "t": "Vollständige Immunität gegenüber jeder Form von Malware-Angriffen", "ok": false },
     { "t": "Grundsätzlich höhere Leistung als beim Betrieb auf physischer Hardware", "ok": false },
     { "t": "Kompletter Wegfall jeglicher Wartungsarbeiten am Gesamtsystem", "ok": false }
    ],
    "e": "Weniger benötigte Hardware spart Kosten, zudem eignet sich Virtualisierung besonders gut für Test- und Entwicklungsumgebungen."
   },
   {
    "q": "Welchen allgemeinen Nachteil gibt es für Virtualisierung insgesamt?",
    "o": [
     { "t": "Durch Fehler in der Virtualisierungssoftware können Angreifer aus VMs ausbrechen", "ok": true },
     { "t": "Es lässt sich grundsätzlich immer nur eine einzige VM je Host betreiben", "ok": false },
     { "t": "Neue Server lassen sich dadurch grundsätzlich nur langsamer bereitstellen", "ok": false },
     { "t": "Backups virtueller Maschinen sind grundsätzlich nicht möglich", "ok": false }
    ],
    "e": "Schwachstellen in der Virtualisierungssoftware selbst können einem Angreifer den Ausbruch aus der isolierten VM ermöglichen."
   },
   {
    "q": "Was setzt die eigentliche Grenze der Virtualisierung auf einem System?",
    "o": [
     { "t": "Die vorhandene physische Hardware des Hosts selbst", "ok": true },
     { "t": "Eine feste Obergrenze von genau zwei virtuellen Maschinen pro Host", "ok": false },
     { "t": "Die Lizenzbedingungen des jeweiligen Hypervisor-Herstellers", "ok": false },
     { "t": "Die Anzahl der am Host angeschlossenen Netzwerkkabel", "ok": false }
    ],
    "e": "Beliebig viele VMs sind theoretisch möglich — begrenzt wird das Ganze allein durch die tatsächlich vorhandene Hardware."
   },
   {
    "q": "Wie viele virtuelle CPUs ergeben sich nach Microsofts Hyper-V-Empfehlung bei einem Quad-Core-Prozessor?",
    "o": [
     { "t": "32, da bis zu 8 virtuelle CPUs je physischem Kern empfohlen werden", "ok": true },
     { "t": "4, da genau eine virtuelle CPU je physischem Kern zulässig ist", "ok": false },
     { "t": "8, unabhängig von der tatsächlichen Kernanzahl des Prozessors", "ok": false },
     { "t": "16, da maximal 4 virtuelle CPUs je physischem Kern empfohlen werden", "ok": false }
    ],
    "e": "Microsoft empfiehlt maximal 8 virtuelle CPUs je physischem Kern; bei vier Kernen ergibt das 4 × 8 = 32."
   },
   {
    "q": "Welche zwei typischen Einsatzgebiete gibt es für Simulatoren und Emulatoren?",
    "o": [
     { "t": "Nachbildung einer Hardware-Umgebung oder Nachbildung eines Betriebssystems", "ok": true },
     { "t": "Ausschließlich die Nachbildung von Netzwerkverbindungen zwischen Servern", "ok": false },
     { "t": "Ausschließlich die Nachbildung von Benutzeroberflächen für Schulungszwecke", "ok": false },
     { "t": "Nachbildung physischer Tastaturen sowie Nachbildung von Bildschirmen", "ok": false }
    ],
    "e": "In der Praxis wird entweder eine komplette Hardware-Umgebung oder ein Betriebssystem nachgebildet."
   },
   {
    "q": "Welche zwei Hypervisor-Typen unterscheiden sich grundsätzlich?",
    "o": [
     { "t": "Typ-1-Hypervisor, der direkt auf der Hardware läuft, und Typ-2-Hypervisor, der auf einem Betriebssystem aufsetzt", "ok": true },
     { "t": "Physischen Hypervisor, der Hardware direkt steuert, und logischen Hypervisor, der nur virtuell existiert", "ok": false },
     { "t": "Server-Hypervisor für Rechenzentren und Desktop-Hypervisor für einzelne Arbeitsplätze", "ok": false },
     { "t": "Öffentlichen Hypervisor mit offener Lizenz und privaten Hypervisor mit proprietärer Lizenz", "ok": false }
    ],
    "e": "Die Unterscheidung läuft entlang der Frage, ob der Hypervisor direkt auf der Hardware oder auf einem Betriebssystem aufsetzt."
   },
   {
    "q": "Was unterscheidet einen Typ-1- von einem Typ-2-Hypervisor in der Praxis am deutlichsten?",
    "o": [
     { "t": "Typ 1 läuft direkt auf der Hardware, Typ 2 benötigt darunter ein vollständiges Betriebssystem", "ok": true },
     { "t": "Typ 1 kann nur eine VM verwalten, Typ 2 beliebig viele gleichzeitig", "ok": false },
     { "t": "Typ 1 wird ausschließlich für Desktop-Virtualisierung eingesetzt, Typ 2 nur für Server", "ok": false },
     { "t": "Typ 1 benötigt zwingend Intel VT, Typ 2 kommt ohne jede Hardwareunterstützung aus", "ok": false }
    ],
    "e": "Der fehlende bzw. vorhandene Unterbau in Form eines vollständigen Betriebssystems ist der zentrale praktische Unterschied."
   },
   {
    "q": "Welche Rolle spielt die Abstraktionsschicht, die ein Hypervisor bereitstellt?",
    "o": [
     { "t": "Sie entkoppelt das Gastsystem von der realen Hardware und stellt ihm virtuelle Hardware bereit", "ok": true },
     { "t": "Sie verschlüsselt sämtlichen Datenverkehr zwischen mehreren Gastsystemen", "ok": false },
     { "t": "Sie ersetzt die Notwendigkeit eines Betriebssystems im Gastsystem vollständig", "ok": false },
     { "t": "Sie verbindet mehrere physische Hosts zu einem gemeinsamen Netzwerkspeicher", "ok": false }
    ],
    "e": "Das Gastsystem sieht nur virtuelle Hardware und bleibt dadurch von der realen Beschaffenheit des Hosts unabhängig."
   },
   {
    "q": "Ohne Hardwareunterstützung wie Intel VT oder AMD-V: Wie behalf man sich früher bei der Befehlsübersetzung?",
    "o": [
     { "t": "Die Übersetzung wurde ausschließlich über Software durch den Hypervisor erledigt", "ok": true },
     { "t": "Man verzichtete grundsätzlich auf jede Form der Virtualisierung von Betriebssystemen", "ok": false },
     { "t": "Jedes Gastsystem benötigte zwingend eine eigene zusätzliche physische CPU", "ok": false },
     { "t": "Die Befehle wurden unverändert an die reale Hardware durchgereicht", "ok": false }
    ],
    "e": "Bevor es hardwareseitige Unterstützung gab, musste der Hypervisor die Befehlsübersetzung komplett per Software erledigen."
   }
  ]
 },
 "raid": {
  "name": "Backup & RAID",
  "q": [
   {
    "q": "Wofür steht die Abkürzung RAID?",
    "o": [
     { "t": "Redundant Array of Independent Disks", "ok": true },
     { "t": "Rapid Access to Integrated Data", "ok": false },
     { "t": "Remote Array of Internal Drives", "ok": false },
     { "t": "Redundant Allocation of Indexed Data", "ok": false }
    ],
    "e": "RAID steht für Redundant Array of Independent Disks — ein Verbund mehrerer Festplatten, der als eine logische Einheit arbeitet. Früher stand das I für Inexpensive."
   },
   {
    "q": "Welche zwei Hauptziele verfolgt ein RAID-Verbund grundsätzlich?",
    "o": [
     { "t": "Erhöhung von Ausfallsicherheit und/oder Leistung durch Plattenverbund", "ok": true },
     { "t": "Verschlüsselung der Daten und Komprimierung des Speicherplatzes", "ok": false },
     { "t": "Automatische Erstellung von Backups auf externe Medien", "ok": false },
     { "t": "Beschleunigung des Netzwerkzugriffs auf entfernte Server", "ok": false }
    ],
    "e": "Je nach Level zielt RAID auf höhere Ausfallsicherheit (Redundanz), auf mehr Leistung (Striping) oder auf beides. Es ersetzt aber kein Backup."
   },
   {
    "q": "Warum ersetzt ein RAID-System kein Backup?",
    "o": [
     { "t": "Es schützt vor Plattenausfall, nicht vor versehentlichem Löschen, Viren oder Totalschaden", "ok": true },
     { "t": "Es speichert die Daten grundsätzlich nur verschlüsselt und damit unlesbar ab", "ok": false },
     { "t": "Es kann immer nur eine einzige Datei gleichzeitig sichern", "ok": false },
     { "t": "Es funktioniert ausschließlich mit externen USB-Festplatten", "ok": false }
    ],
    "e": "RAID schützt vor Hardwareausfall einzelner Platten. Gegen gelöschte Dateien, Ransomware, Überspannung oder Diebstahl des ganzen Geräts hilft nur ein echtes Backup."
   },
   {
    "q": "Was bezeichnet der Begriff Striping bei RAID?",
    "o": [
     { "t": "Die Verteilung der Daten in Blöcken über mehrere Platten hinweg", "ok": true },
     { "t": "Die vollständige Spiegelung aller Daten auf eine zweite Platte", "ok": false },
     { "t": "Die Berechnung von Prüfsummen zur Fehlerkorrektur", "ok": false },
     { "t": "Die automatische Verschlüsselung jedes einzelnen Datenblocks", "ok": false }
    ],
    "e": "Striping verteilt Daten blockweise auf mehrere Platten, sodass parallel gelesen und geschrieben werden kann — das erhöht die Leistung, bietet aber allein keine Redundanz."
   },
   {
    "q": "Was bezeichnet der Begriff Mirroring bei RAID?",
    "o": [
     { "t": "Die vollständige Spiegelung der Daten auf eine oder mehrere weitere Platten", "ok": true },
     { "t": "Die blockweise Verteilung der Daten über mehrere Platten", "ok": false },
     { "t": "Die Auslagerung selten genutzter Daten auf langsamere Platten", "ok": false },
     { "t": "Die Zusammenfassung mehrerer Platten zu einem großen Volume", "ok": false }
    ],
    "e": "Beim Mirroring werden identische Kopien der Daten auf mehreren Platten gehalten. Fällt eine aus, stehen die Daten auf der Spiegelplatte weiter bereit."
   },
   {
    "q": "Was versteht man unter Parität im RAID-Kontext?",
    "o": [
     { "t": "Eine berechnete Prüfinformation, mit der sich ausgefallene Daten rekonstruieren lassen", "ok": true },
     { "t": "Eine identische Kopie sämtlicher Daten auf einer Reserveplatte", "ok": false },
     { "t": "Die gleichmäßige Verteilung der Schreiblast auf alle Platten", "ok": false },
     { "t": "Die Anzahl der Platten, die gleichzeitig lesen dürfen", "ok": false }
    ],
    "e": "Parität ist eine per XOR berechnete Prüfsumme. Fällt eine Platte aus, lassen sich deren Daten aus den übrigen Daten und der Parität wiederherstellen."
   },
   {
    "q": "Welches RAID-Level bietet Striping ganz ohne Redundanz?",
    "o": [
     { "t": "RAID 0", "ok": true },
     { "t": "RAID 1", "ok": false },
     { "t": "RAID 5", "ok": false },
     { "t": "RAID 6", "ok": false }
    ],
    "e": "RAID 0 verteilt Daten nur per Striping — maximale Leistung und volle Kapazität, aber keinerlei Ausfallsicherheit."
   },
   {
    "q": "Wie viele Festplatten fallen bei RAID 0 mindestens aus, bis alle Daten verloren sind?",
    "o": [
     { "t": "Eine einzige Platte genügt für den Totalverlust", "ok": true },
     { "t": "Erst der Ausfall aller Platten führt zum Datenverlust", "ok": false },
     { "t": "Zwei Platten müssen gleichzeitig ausfallen", "ok": false },
     { "t": "Die Hälfte der Platten muss ausfallen", "ok": false }
    ],
    "e": "Da RAID 0 die Daten ohne Redundanz über alle Platten verteilt, reißt schon der Ausfall einer einzigen Platte den gesamten Verbund und damit alle Daten mit."
   },
   {
    "q": "Welches RAID-Level arbeitet mit reiner Spiegelung (Mirroring)?",
    "o": [
     { "t": "RAID 1", "ok": true },
     { "t": "RAID 0", "ok": false },
     { "t": "RAID 5", "ok": false },
     { "t": "RAID 10", "ok": false }
    ],
    "e": "RAID 1 spiegelt die Daten identisch auf zwei Platten. Fällt eine aus, läuft der Betrieb ohne Datenverlust weiter."
   },
   {
    "q": "Wie viele Platten dürfen bei einem RAID 1 aus zwei Platten ausfallen, ohne dass Daten verloren gehen?",
    "o": [
     { "t": "Eine Platte", "ok": true },
     { "t": "Keine Platte", "ok": false },
     { "t": "Beide Platten", "ok": false },
     { "t": "Die Hälfte einer Platte", "ok": false }
    ],
    "e": "Bei RAID 1 mit zwei Platten hält jede eine vollständige Kopie. Eine darf ausfallen, die zweite trägt weiterhin alle Daten."
   },
   {
    "q": "Wie viel nutzbare Kapazität liefert RAID 1 aus zwei 4-TB-Platten?",
    "o": [
     { "t": "4 TB", "ok": true },
     { "t": "8 TB", "ok": false },
     { "t": "6 TB", "ok": false },
     { "t": "2 TB", "ok": false }
    ],
    "e": "Da die Daten gespiegelt werden, steht nur die Kapazität einer Platte zur Verfügung: 4 TB. Die zweite Platte hält die identische Kopie."
   },
   {
    "q": "Wie viele Festplatten benötigt RAID 5 mindestens?",
    "o": [
     { "t": "Drei", "ok": true },
     { "t": "Zwei", "ok": false },
     { "t": "Vier", "ok": false },
     { "t": "Fünf", "ok": false }
    ],
    "e": "RAID 5 verteilt Daten und Parität über mindestens drei Platten. Weniger geht nicht, weil sonst kein Platz für die verteilte Parität bliebe."
   },
   {
    "q": "Wie viele Platten darf ein RAID 5 verkraften, ohne Daten zu verlieren?",
    "o": [
     { "t": "Genau eine Platte", "ok": true },
     { "t": "Genau zwei Platten", "ok": false },
     { "t": "Keine einzige Platte", "ok": false },
     { "t": "Die Hälfte aller Platten", "ok": false }
    ],
    "e": "RAID 5 verteilt eine einfache Parität. Damit lässt sich der Ausfall genau einer Platte überbrücken — fällt eine zweite aus, sind die Daten verloren."
   },
   {
    "q": "Wie berechnet sich die nutzbare Kapazität eines RAID 5 aus n gleich großen Platten?",
    "o": [
     { "t": "(n − 1) mal Plattenkapazität", "ok": true },
     { "t": "n mal Plattenkapazität", "ok": false },
     { "t": "(n − 2) mal Plattenkapazität", "ok": false },
     { "t": "n halbe mal Plattenkapazität", "ok": false }
    ],
    "e": "Bei RAID 5 geht der Speicherplatz einer Platte für die verteilte Parität verloren. Nutzbar ist die Kapazität von (n − 1) Platten."
   },
   {
    "q": "Wie viel Nettokapazität hat ein RAID 5 aus vier 2-TB-Platten?",
    "o": [
     { "t": "6 TB", "ok": true },
     { "t": "8 TB", "ok": false },
     { "t": "4 TB", "ok": false },
     { "t": "2 TB", "ok": false }
    ],
    "e": "Nach der Formel (n − 1) × Kapazität: (4 − 1) × 2 TB = 6 TB. Der Gegenwert einer Platte entfällt auf die Parität."
   },
   {
    "q": "Wie viele Platten darf ein RAID 6 gleichzeitig verlieren?",
    "o": [
     { "t": "Zwei Platten", "ok": true },
     { "t": "Eine Platte", "ok": false },
     { "t": "Drei Platten", "ok": false },
     { "t": "Keine Platte", "ok": false }
    ],
    "e": "RAID 6 hält eine doppelte Parität vor und übersteht daher den gleichzeitigen Ausfall von zwei Platten — der entscheidende Vorteil gegenüber RAID 5."
   },
   {
    "q": "Wie viele Festplatten benötigt RAID 6 mindestens?",
    "o": [
     { "t": "Vier", "ok": true },
     { "t": "Drei", "ok": false },
     { "t": "Zwei", "ok": false },
     { "t": "Fünf", "ok": false }
    ],
    "e": "RAID 6 braucht mindestens vier Platten: zwei für die doppelte Parität, mindestens zwei für die Nutzdaten."
   },
   {
    "q": "Wie berechnet sich die Nettokapazität eines RAID 6 aus n gleich großen Platten?",
    "o": [
     { "t": "(n − 2) mal Plattenkapazität", "ok": true },
     { "t": "(n − 1) mal Plattenkapazität", "ok": false },
     { "t": "n mal Plattenkapazität", "ok": false },
     { "t": "n halbe mal Plattenkapazität", "ok": false }
    ],
    "e": "RAID 6 verbraucht den Speicherplatz von zwei Platten für die doppelte Parität. Nutzbar bleibt die Kapazität von (n − 2) Platten."
   },
   {
    "q": "Welchen entscheidenden Vorteil bietet RAID 6 gegenüber RAID 5?",
    "o": [
     { "t": "Es verkraftet den gleichzeitigen Ausfall von zwei statt nur einer Platte", "ok": true },
     { "t": "Es liefert grundsätzlich eine höhere nutzbare Kapazität", "ok": false },
     { "t": "Es kommt mit weniger Festplatten als RAID 5 aus", "ok": false },
     { "t": "Es benötigt überhaupt keine Paritätsberechnung mehr", "ok": false }
    ],
    "e": "Durch die doppelte Parität übersteht RAID 6 zwei gleichzeitige Plattenausfälle — wichtig bei großen Platten, deren Rebuild lange dauert und in der ein zweiter Ausfall droht."
   },
   {
    "q": "Aus welchen zwei Basis-Leveln setzt sich RAID 10 zusammen?",
    "o": [
     { "t": "Aus gespiegelten RAID-1-Paaren, die zusätzlich per RAID 0 gestript werden", "ok": true },
     { "t": "Aus zwei RAID-5-Verbünden mit einer gemeinsam genutzten Parität", "ok": false },
     { "t": "Aus einem RAID 0 und einem einzelnen zusätzlichen Paritätslaufwerk", "ok": false },
     { "t": "Aus zwei RAID-6-Verbünden mit jeweils doppelter Parität", "ok": false }
    ],
    "e": "RAID 10 (auch 1+0) spiegelt zuerst Plattenpaare (RAID 1) und verteilt die Daten dann über diese Spiegel per Striping (RAID 0) — Kombination aus Sicherheit und Leistung."
   },
   {
    "q": "Wie viele Festplatten benötigt RAID 10 mindestens?",
    "o": [
     { "t": "Vier", "ok": true },
     { "t": "Zwei", "ok": false },
     { "t": "Drei", "ok": false },
     { "t": "Sechs", "ok": false }
    ],
    "e": "RAID 10 braucht mindestens vier Platten: zwei gespiegelte Paare, über die dann gestript wird."
   },
   {
    "q": "Wie viel nutzbare Kapazität bietet RAID 10 aus vier 2-TB-Platten?",
    "o": [
     { "t": "4 TB", "ok": true },
     { "t": "8 TB", "ok": false },
     { "t": "6 TB", "ok": false },
     { "t": "2 TB", "ok": false }
    ],
    "e": "RAID 10 spiegelt jeweils die Hälfte der Platten. Nutzbar ist die halbe Bruttokapazität: 4 × 2 TB / 2 = 4 TB."
   },
   {
    "q": "Worin unterscheiden sich RAID 10 und RAID 01 im Aufbau?",
    "o": [
     { "t": "RAID 10 spiegelt zuerst und stript dann, RAID 01 stript zuerst und spiegelt dann", "ok": true },
     { "t": "RAID 10 nutzt Parität, RAID 01 arbeitet ausschließlich mit Spiegelung", "ok": false },
     { "t": "RAID 10 braucht drei Platten, RAID 01 kommt mit zwei aus", "ok": false },
     { "t": "RAID 10 ist unverschlüsselt, RAID 01 verschlüsselt alle Blöcke", "ok": false }
    ],
    "e": "Die Reihenfolge unterscheidet sie: RAID 10 = gespiegelte Paare, dann Striping (1+0). RAID 01 = Stripe-Sets, dann gespiegelt (0+1)."
   },
   {
    "q": "Warum gilt RAID 10 in der Praxis als ausfallsicherer als RAID 01?",
    "o": [
     { "t": "Bei RAID 10 darf je Spiegelpaar eine Platte ausfallen, ohne den Verbund zu verlieren", "ok": true },
     { "t": "RAID 10 nutzt eine doppelte Parität, die RAID 01 vollständig fehlt", "ok": false },
     { "t": "RAID 10 besteht immer aus deutlich mehr Festplatten als RAID 01", "ok": false },
     { "t": "RAID 10 schreibt die Daten langsamer und dadurch grundsätzlich sicherer", "ok": false }
    ],
    "e": "Bei RAID 10 überlebt der Verbund, solange in keinem Spiegelpaar beide Platten ausfallen. Bei RAID 01 kann schon der Ausfall je einer Platte in beiden Stripe-Sets den Verbund killen."
   },
   {
    "q": "Was beschreibt RAID 50?",
    "o": [
     { "t": "Mehrere RAID-5-Verbünde, die per übergeordnetem Striping zusammengefasst werden", "ok": true },
     { "t": "Einen einzelnen RAID-5-Verbund mit genau fünfzig Festplatten darin", "ok": false },
     { "t": "Eine Kombination aus RAID 5 und zusätzlicher doppelter Parität", "ok": false },
     { "t": "Einen vollständig auf eine Reserve gespiegelten RAID-5-Verbund", "ok": false }
    ],
    "e": "RAID 50 kombiniert mehrere RAID-5-Gruppen über ein übergeordnetes Striping. Das steigert Leistung und Kapazität gegenüber einem einzelnen großen RAID 5."
   },
   {
    "q": "Was passiert während eines RAID-Rebuilds nach einem Plattentausch?",
    "o": [
     { "t": "Die Daten der ersetzten Platte werden aus den übrigen Platten wiederhergestellt", "ok": true },
     { "t": "Der gesamte Verbund wird gelöscht und komplett neu formatiert", "ok": false },
     { "t": "Alle Platten werden gleichzeitig gegen neue ausgetauscht", "ok": false },
     { "t": "Die Daten werden vom Backup-Band zurückgespielt", "ok": false }
    ],
    "e": "Beim Rebuild rekonstruiert der Controller die Inhalte der neuen Platte aus Daten und Parität der verbliebenen Platten. Bei großen Platten kann das Stunden dauern."
   },
   {
    "q": "Warum ist gerade während eines RAID-5-Rebuilds das Risiko besonders hoch?",
    "o": [
     { "t": "Fällt in dieser Phase eine weitere Platte aus, sind alle Daten verloren", "ok": true },
     { "t": "Der Verbund lässt sich während des Rebuilds grundsätzlich nicht mehr lesen", "ok": false },
     { "t": "Der Controller verschlüsselt die Daten dabei versehentlich", "ok": false },
     { "t": "Alle Platten werden dabei gleichzeitig stark abgenutzt und fallen aus", "ok": false }
    ],
    "e": "RAID 5 verträgt nur einen Ausfall. Während des Rebuilds ist die Redundanz aufgebraucht — ein zweiter Ausfall in dieser Zeit bedeutet Totalverlust. Genau hier punktet RAID 6."
   },
   {
    "q": "Wozu dient eine Hot-Spare-Platte in einem RAID-Verbund?",
    "o": [
     { "t": "Sie springt bei einem Plattenausfall automatisch ein und startet den Rebuild", "ok": true },
     { "t": "Sie erhöht im Normalbetrieb dauerhaft die Schreibgeschwindigkeit", "ok": false },
     { "t": "Sie speichert eine zusätzliche verschlüsselte Kopie aller Daten", "ok": false },
     { "t": "Sie übernimmt die Paritätsberechnung für den gesamten Verbund", "ok": false }
    ],
    "e": "Eine Hot-Spare läuft als Reserve mit und ersetzt bei einem Ausfall automatisch die defekte Platte, ohne dass ein Techniker sofort eingreifen muss."
   },
   {
    "q": "Was bedeutet Hot-Swap bei Festplatten?",
    "o": [
     { "t": "Der Austausch einer Platte im laufenden Betrieb, ohne das System herunterzufahren", "ok": true },
     { "t": "Das Übertakten der Platten für höhere Zugriffsgeschwindigkeit", "ok": false },
     { "t": "Das gleichzeitige Beschreiben aller Platten mit denselben Daten", "ok": false },
     { "t": "Das automatische Löschen defekter Sektoren im Betrieb", "ok": false }
    ],
    "e": "Hot-Swap erlaubt es, eine defekte Platte bei laufendem System zu ziehen und zu ersetzen — Voraussetzung für Wartung ohne Ausfallzeit."
   },
   {
    "q": "Was unterscheidet Hardware-RAID von Software-RAID?",
    "o": [
     { "t": "Hardware-RAID nutzt einen eigenen Controller, Software-RAID rechnet auf der Haupt-CPU", "ok": true },
     { "t": "Hardware-RAID kennt nur RAID 0, Software-RAID beherrscht alle Level", "ok": false },
     { "t": "Hardware-RAID arbeitet ohne Redundanz, Software-RAID immer mit", "ok": false },
     { "t": "Hardware-RAID ist grundsätzlich langsamer als Software-RAID", "ok": false }
    ],
    "e": "Hardware-RAID entlastet die CPU über einen dedizierten Controller (oft mit eigenem Cache und Akku). Software-RAID ist günstiger, belastet aber die Haupt-CPU."
   },
   {
    "q": "Was ist der Kern einer Vollsicherung (Full Backup)?",
    "o": [
     { "t": "Es werden bei jedem Durchlauf alle ausgewählten Daten vollständig gesichert", "ok": true },
     { "t": "Es werden nur die seit der letzten Sicherung geänderten Daten gesichert", "ok": false },
     { "t": "Es wird nur die Struktur der Ordner ohne Dateiinhalte gesichert", "ok": false },
     { "t": "Es werden ausschließlich Systemdateien, aber keine Nutzdaten gesichert", "ok": false }
    ],
    "e": "Die Vollsicherung kopiert jedes Mal den kompletten Datenbestand. Vorteil: einfache, schnelle Wiederherstellung. Nachteil: hoher Speicher- und Zeitbedarf."
   },
   {
    "q": "Was kennzeichnet eine inkrementelle Sicherung gegenüber der Vollsicherung?",
    "o": [
     { "t": "Sie sichert nur die seit dem letzten Backup beliebiger Art geänderten Daten", "ok": true },
     { "t": "Sie sichert bei jedem Durchlauf erneut den kompletten Datenbestand", "ok": false },
     { "t": "Sie sichert alle seit der letzten Vollsicherung geänderten Daten", "ok": false },
     { "t": "Sie sichert neu angelegte, aber keine nachträglich geänderten Dateien", "ok": false }
    ],
    "e": "Die inkrementelle Sicherung erfasst nur die Änderungen seit dem letzten Backup beliebiger Art. Sie ist schnell und sparsam, die Wiederherstellung braucht aber die Vollsicherung plus alle folgenden Inkremente."
   },
   {
    "q": "Was kennzeichnet eine differenzielle Sicherung?",
    "o": [
     { "t": "Sie sichert alle seit der letzten Vollsicherung geänderten Daten", "ok": true },
     { "t": "Sie sichert nur die seit der letzten Sicherung geänderten Daten", "ok": false },
     { "t": "Sie sichert bei jedem Lauf den kompletten Datenbestand", "ok": false },
     { "t": "Sie sichert ausschließlich die Daten des laufenden Tages", "ok": false }
    ],
    "e": "Die differenzielle Sicherung erfasst alle Änderungen seit der letzten Vollsicherung. Sie wächst bis zur nächsten Vollsicherung an, die Wiederherstellung braucht aber nur Vollsicherung plus die letzte Differenz."
   },
   {
    "q": "Wie läuft eine Wiederherstellung bei inkrementeller Sicherung ab?",
    "o": [
     { "t": "Zuerst die Vollsicherung, dann alle Inkremente in der richtigen Reihenfolge", "ok": true },
     { "t": "Es genügt allein das letzte inkrementelle Backup", "ok": false },
     { "t": "Nur die Vollsicherung wird benötigt, die Inkremente sind überflüssig", "ok": false },
     { "t": "Es genügen die Vollsicherung und das jeweils letzte Inkrement", "ok": false }
    ],
    "e": "Da jedes Inkrement nur die Änderungen zum Vorgänger enthält, braucht die Wiederherstellung die Vollsicherung und lückenlos alle folgenden Inkremente."
   },
   {
    "q": "Welchen Vorteil hat die differenzielle gegenüber der inkrementellen Sicherung bei der Wiederherstellung?",
    "o": [
     { "t": "Es werden nur die Vollsicherung und die letzte Differenz benötigt", "ok": true },
     { "t": "Sie benötigt grundsätzlich weniger Speicherplatz je Sicherungslauf", "ok": false },
     { "t": "Sie läuft bei jedem Sicherungsvorgang schneller ab", "ok": false },
     { "t": "Sie kommt bei der Wiederherstellung ganz ohne Vollsicherung aus", "ok": false }
    ],
    "e": "Zur Wiederherstellung reichen bei differenzieller Sicherung zwei Elemente: die Vollsicherung und die jüngste Differenz. Das ist einfacher als die inkrementelle Kette, kostet aber mehr Speicher je Lauf."
   },
   {
    "q": "Was besagt die 3-2-1-Backup-Regel?",
    "o": [
     { "t": "Drei Kopien der Daten auf zwei verschiedenen Medien, davon eine außer Haus", "ok": true },
     { "t": "Drei Vollsicherungen pro Woche auf zwei Servern an einem Standort", "ok": false },
     { "t": "Drei Festplatten im RAID, zwei als Spiegel, eine als Parität", "ok": false },
     { "t": "Drei Sicherungsläufe täglich mit zwei Stunden Abstand einmal pro Nacht", "ok": false }
    ],
    "e": "Die 3-2-1-Regel: drei Datenkopien insgesamt, auf zwei unterschiedlichen Speichermedien, und mindestens eine davon räumlich getrennt (offsite) — Schutz auch bei Brand oder Diebstahl."
   },
   {
    "q": "Was gibt der RPO (Recovery Point Objective) an?",
    "o": [
     { "t": "Den maximal tolerierbaren Datenverlust, gemessen als Zeitspanne bis zur letzten Sicherung", "ok": true },
     { "t": "Die maximale Zeitspanne, bis ein System nach Ausfall wieder laufen muss", "ok": false },
     { "t": "Die Anzahl der Festplatten, die ein RAID verkraften darf", "ok": false },
     { "t": "Den Zeitpunkt, zu dem das nächste Voll-Backup geplant ist", "ok": false }
    ],
    "e": "Der RPO beschreibt, wie viel Datenverlust maximal akzeptabel ist — praktisch der Abstand zwischen zwei Sicherungen. Ein RPO von 1 Stunde bedeutet: höchstens 1 Stunde Daten dürfen verloren gehen."
   },
   {
    "q": "Was gibt der RTO (Recovery Time Objective) an?",
    "o": [
     { "t": "Die maximal tolerierbare Zeit, bis ein System nach einem Ausfall wieder verfügbar ist", "ok": true },
     { "t": "Den maximal tolerierbaren Datenverlust als Zeitspanne", "ok": false },
     { "t": "Die durchschnittliche Lebensdauer einer Festplatte im Betrieb", "ok": false },
     { "t": "Die Zeit, die ein Voll-Backup zur Fertigstellung braucht", "ok": false }
    ],
    "e": "Der RTO legt fest, wie lange ein System nach einem Ausfall maximal offline sein darf, bevor es wiederhergestellt sein muss. RPO betrifft die Daten, RTO die Ausfallzeit."
   },
   {
    "q": "Warum sollte ein Backup regelmäßig durch eine Testwiederherstellung geprüft werden?",
    "o": [
     { "t": "Nur eine erfolgreiche Rücksicherung beweist, dass das Backup im Ernstfall brauchbar ist", "ok": true },
     { "t": "Weil Backups sich sonst nach kurzer Zeit von selbst löschen", "ok": false },
     { "t": "Weil dadurch die Sicherung beim nächsten Mal schneller läuft", "ok": false },
     { "t": "Weil ungetestete Backups automatisch mehr Speicher belegen", "ok": false }
    ],
    "e": "Ein Backup, das sich nicht zurückspielen lässt, ist wertlos. Nur die regelmäßige Testwiederherstellung deckt defekte Medien, unvollständige Sicherungen oder fehlerhafte Konfigurationen rechtzeitig auf."
   },
   {
    "q": "Was ist ein wesentlicher Vorteil einer Offsite-Lagerung von Backups?",
    "o": [
     { "t": "Bei Brand, Diebstahl oder Wasserschaden am Standort bleiben die Daten erhalten", "ok": true },
     { "t": "Die Sicherung läuft dadurch bei jedem Durchlauf deutlich schneller", "ok": false },
     { "t": "Offsite-Backups benötigen grundsätzlich keinerlei Verschlüsselung", "ok": false },
     { "t": "Die Daten müssen dadurch nur noch einmal im Jahr gesichert werden", "ok": false }
    ],
    "e": "Eine räumlich getrennte Kopie schützt gegen lokale Katastrophen, die alle Kopien am selben Ort gleichzeitig treffen würden — Kern des '1' in der 3-2-1-Regel."
   }
  ]
 }
};
/* ============ ENGINE ============ */
const MAX_CATS = 3;
const PER_CAT = 15;
let quizScope = 15; // 15 | 30 | 'all'
const LETTERS = ['A','B','C','D','E','F'];

function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}

// ---- Wackelkandidaten: falsch beantwortete Fragen lokal merken ----
// Speicherung pro Browser/Gerät via localStorage. Fragen werden über ihren
// Fragetext identifiziert (stabil auch bei Pool-Erweiterungen).
const WRONG_KEY = 'neint1_wrong_v1';

function loadWrong(){
  try {
    const raw = localStorage.getItem(WRONG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch(e){ return []; }
}
function saveWrong(list){
  try { localStorage.setItem(WRONG_KEY, JSON.stringify(list)); } catch(e){}
}
// Fügt einen Fragetext den Wackelkandidaten hinzu (ohne Duplikate).
function addWrong(qText){
  const list = loadWrong();
  if(!list.includes(qText)){
    list.push(qText);
    saveWrong(list);
  }
}
// Baut aus den gemerkten Fragetexten die tatsächlichen Frageobjekte (aus POOLS).
function getWrongQuestions(){
  const wanted = new Set(loadWrong());
  const out = [];
  Object.keys(POOLS).forEach(key => {
    POOLS[key].q.forEach(qObj => {
      if(wanted.has(qObj.q)) out.push({ obj: qObj, catName: POOLS[key].name });
    });
  });
  return out;
}
function wrongCount(){ return loadWrong().length; }
function resetWrong(){ saveWrong([]); }


// Rotation state per category: keeps a shuffled order + pointer, persists during session.
const rotation = {}; // key -> { order:[indices], ptr:int }

function initRotation(key){
  const pool = POOLS[key].q;
  rotation[key] = { order: shuffle([...pool.keys()]), ptr: 0 };
}

// Draw next `n` question indices for a category, advancing the pointer.
// When the pool wraps mid-draw, reshuffle for a fresh cycle BUT keep any
// index already picked in this same round out of the immediate next slots,
// so a single round never shows a duplicate.
function drawFromCategory(key, n){
  if(!rotation[key]) initRotation(key);
  const pool = POOLS[key].q;
  const total = pool.length;
  const take = Math.min(n, total);
  const picked = [];
  const pickedSet = new Set();
  let r = rotation[key];
  for(let i=0;i<take;i++){
    if(r.ptr >= r.order.length){
      // pool exhausted -> new shuffled cycle
      let next = shuffle([...pool.keys()]);
      // move indices already used this round to the back of the new cycle
      const clash = next.filter(x => pickedSet.has(x));
      const clean = next.filter(x => !pickedSet.has(x));
      r.order = clean.concat(clash);
      r.ptr = 0;
    }
    const idx = r.order[r.ptr];
    picked.push(pool[idx]);
    pickedSet.add(idx);
    r.ptr++;
  }
  return picked;
}

// ---- Selection UI ----
const selected = new Set();
const catGrid = document.getElementById('catGrid');
const startBtn = document.getElementById('startBtn');
const selHint = document.getElementById('selHint');

document.querySelectorAll('.scope-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.scope-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    quizScope = btn.dataset.scope === 'all' ? 'all' : parseInt(btn.dataset.scope, 10);
    refreshSelState();
  });
});

Object.keys(POOLS).forEach(key => {
  const chip = document.createElement('div');
  chip.className = 'cat-chip';
  chip.dataset.key = key;
  chip.innerHTML = '<div class="cat-box">&#10003;</div><span class="cat-name">'+POOLS[key].name+'</span><span class="cat-count">'+POOLS[key].q.length+' Fragen</span>';
  chip.addEventListener('click', () => toggleCat(key, chip));
  catGrid.appendChild(chip);
});

function toggleCat(key, chip){
  if(selected.has(key)){
    selected.delete(key);
    chip.classList.remove('sel');
  } else {
    if(selected.size >= MAX_CATS) return;
    selected.add(key);
    chip.classList.add('sel');
  }
  refreshSelState();
}

function refreshSelState(){
  const n = selected.size;
  document.querySelectorAll('.cat-chip').forEach(chip => {
    const key = chip.dataset.key;
    if(!selected.has(key) && n >= MAX_CATS){
      chip.classList.add('disabled');
    } else {
      chip.classList.remove('disabled');
    }
  });
  startBtn.disabled = n === 0;
  if(n === 0){ selHint.textContent = 'Keine Kategorie gewählt'; selHint.classList.remove('warn'); }
  else {
    let qcount = 0;
    selected.forEach(k => { qcount += (quizScope === 'all' ? POOLS[k].q.length : Math.min(quizScope, POOLS[k].q.length)); });
    selHint.textContent = n + ' von max. ' + MAX_CATS + ' gewählt · ' + qcount + ' Fragen';
    selHint.classList.toggle('warn', n >= MAX_CATS);
  }
  refreshWrongState();
}

// Aktualisiert Anzeige und Buttons des Wackelkandidaten-Blocks.
function refreshWrongState(){
  const c = wrongCount();
  const sub = document.getElementById('wrongSub');
  const startB = document.getElementById('wrongStartBtn');
  const resetB = document.getElementById('wrongResetBtn');
  if(!sub || !startB || !resetB) return;
  if(c === 0){
    sub.textContent = 'Noch keine falsch beantworteten Fragen gesammelt.';
    startB.disabled = true;
    resetB.disabled = true;
  } else {
    sub.textContent = c + (c === 1 ? ' falsch beantwortete Frage' : ' falsch beantwortete Fragen') + ' gespeichert.';
    startB.disabled = false;
    resetB.disabled = false;
  }
}

// ---- Quiz run ----
let runQuestions = [];   // [{cat, q, opts(shuffled), answered, correct}]
let activeCats = [];

const selectorEl = document.getElementById('selector');
const runnerEl = document.getElementById('runner');
const resultEl = document.getElementById('result');
const qArea = document.getElementById('questionArea');
const runTitle = document.getElementById('runTitle');
const runMeta = document.getElementById('runMeta');
const progressFill = document.getElementById('progressFill');

function buildRun(){
  runQuestions = [];
  if(quizScope === 'wrong'){
    // Wackelkandidaten-Modus: alle lokal gemerkten falsch beantworteten Fragen
    activeCats = ['__wrong__'];
    const wrong = getWrongQuestions();
    shuffle(wrong).forEach(entry => {
      runQuestions.push({
        cat: entry.catName,
        q: entry.obj.q,
        opts: shuffle(entry.obj.o),
        e: entry.obj.e,
        done: false,
        correct: false
      });
    });
    return;
  }
  activeCats = Array.from(selected);
  activeCats.forEach(key => {
    const scopeN = quizScope === 'all' ? POOLS[key].q.length : quizScope;
    const drawn = drawFromCategory(key, scopeN);
    drawn.forEach(qObj => {
      runQuestions.push({
        cat: POOLS[key].name,
        q: qObj.q,
        opts: shuffle(qObj.o),
        e: qObj.e,
        done: false,
        correct: false
      });
    });
  });
  // shuffle question order across all selected categories
  runQuestions = shuffle(runQuestions);
}

function renderRun(){
  qArea.innerHTML = '';
  if(quizScope === 'wrong'){
    runTitle.textContent = 'Wackelkandidaten';
  } else {
    runTitle.textContent = activeCats.length === 1 ? POOLS[Array.from(selected)[0]].name : 'Gemischtes Quiz';
  }
  updateMeta();

  runQuestions.forEach((item, qi) => {
    const qEl = document.createElement('div');
    qEl.className = 'q';

    const label = document.createElement('span');
    label.className = 'cat-label';
    label.textContent = item.cat;
    qEl.appendChild(label);

    const qText = document.createElement('div');
    qText.className = 'q-text';
    qText.innerHTML = '<span class="num">'+(qi+1)+'.</span>'+item.q;
    qEl.appendChild(qText);

    const explainEl = document.createElement('div');
    explainEl.className = 'explain';

    item.opts.forEach((opt, oi) => {
      const optEl = document.createElement('div');
      optEl.className = 'opt';
      optEl.innerHTML = '<span class="mk">'+LETTERS[oi]+'</span><span>'+opt.t+'</span>';
      optEl.addEventListener('click', () => {
        if(item.done) return;
        item.done = true;
        item.correct = !!opt.ok;
        if(!opt.ok){ addWrong(item.q); }
        qEl.querySelectorAll('.opt').forEach(o => o.classList.add('disabled'));
        if(opt.ok){
          optEl.classList.add('correct');
        } else {
          optEl.classList.add('wrong');
          qEl.querySelectorAll('.opt').forEach((o,idx) => {
            if(item.opts[idx].ok) o.classList.add('correct');
          });
        }
        explainEl.innerHTML = '<strong>'+(opt.ok?'Richtig.':'Falsch.')+'</strong> '+item.e;
        explainEl.classList.add('show');
        updateMeta();
        if(runQuestions.every(x => x.done)) finishRun();
      });
      qEl.appendChild(optEl);
    });

    qEl.appendChild(explainEl);
    qArea.appendChild(qEl);
  });
  progressFill.style.width = '0%';
}

function updateMeta(){
  const done = runQuestions.filter(x => x.done).length;
  const correct = runQuestions.filter(x => x.correct).length;
  runMeta.textContent = done + ' / ' + runQuestions.length + ' beantwortet · ' + correct + ' richtig';
  progressFill.style.width = (done/runQuestions.length*100) + '%';
}

function showResult(){
  const overlay = document.getElementById('finishOverlay');
  if(overlay) overlay.classList.remove('show');
  const correct = runQuestions.filter(x => x.correct).length;
  const total = runQuestions.length;
  const pct = Math.round(correct/total*100);
  document.getElementById('resScore').textContent = pct + '%';
  document.getElementById('resDetail').textContent = correct + ' von ' + total + ' Fragen richtig';
  let v;
  if(pct === 100) v = 'Sitzt. Alles richtig.';
  else if(pct >= 80) v = 'Stark. Nur Feinschliff nötig.';
  else if(pct >= 60) v = 'Solide, aber Lücken. Nochmal rotieren.';
  else v = 'Da fehlt Substanz. Zurück ins Nachschlagewerk.';
  document.getElementById('resVerdict').textContent = v;
  runnerEl.classList.remove('active');
  resultEl.classList.add('show');
  window.scrollTo({top:0,behavior:'smooth'});
}

function reviewQuestions(){
  // Overlay schließen, Runner mit den beantworteten Fragen sichtbar lassen.
  // Zurück zu den Kategorien geht dann über den bereits vorhandenen Button unten.
  const overlay = document.getElementById('finishOverlay');
  if(overlay) overlay.classList.remove('show');
  runnerEl.classList.add('active');
}

function finishRun(){
  // Kein Auto-Timeout mehr: Das Overlay bleibt stehen, bis der Nutzer wählt —
  // Auswertung anzeigen, Fragen nochmal ansehen, oder wegklicken (= ansehen).
  const overlay = document.getElementById('finishOverlay');
  if(overlay){
    overlay.classList.add('show');
  } else {
    showResult();
  }
}

function startQuiz(){
  buildRun();
  renderRun();
  selectorEl.style.display = 'none';
  resultEl.classList.remove('show');
  runnerEl.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

function backToSelector(){
  runnerEl.classList.remove('active');
  resultEl.classList.remove('show');
  selectorEl.style.display = 'block';
  refreshWrongState();
  window.scrollTo({top:0,behavior:'smooth'});
}

startBtn.addEventListener('click', () => {
  // Normaler Start: aktueller Scope kommt vom aktiven scope-btn (nie 'wrong')
  const activeScope = document.querySelector('.scope-btn.active');
  quizScope = activeScope.dataset.scope === 'all' ? 'all' : parseInt(activeScope.dataset.scope, 10);
  startQuiz();
});
document.getElementById('againBtn').addEventListener('click', startQuiz); // rotates: pointer advanced
document.getElementById('backBtn').addEventListener('click', backToSelector);
document.getElementById('abortBtn').addEventListener('click', backToSelector);

// Übergangs-Overlay: Auswertung anzeigen / Fragen ansehen / wegklicken
document.getElementById('finishResultBtn').addEventListener('click', showResult);
document.getElementById('finishReviewBtn').addEventListener('click', reviewQuestions);
document.getElementById('finishOverlay').addEventListener('click', (e) => {
  // Klick auf die Box selbst (Buttons) nicht als "wegklicken" werten,
  // nur Klick auf den dunklen Hintergrund öffnet die Fragenansicht.
  if(e.target.id === 'finishOverlay') reviewQuestions();
});

// Pixel-8 im Overlay aufbauen: 8x9-Bitmap der Ziffer 8. Jedes Pixel erhält
// per CSS-Variablen einen zufälligen Anflugvektor (--sx/--sy, von außen) und
// einen Explosionsvektor (--ex/--ey). Dazu je ein statisches Schatten-Pixel
// mit versetztem Funkel-Delay. Da das Overlay display:none ist, startet die
// Animation bei jedem Öffnen frisch mit der Formations-Phase.
(function buildPixel8(){
  const host = document.getElementById('pixel8');
  if(!host) return;
  const MAP = [
    '.######.',
    '##....##',
    '##....##',
    '##....##',
    '.######.',
    '##....##',
    '##....##',
    '##....##',
    '.######.'
  ];
  const frag = document.createDocumentFragment();
  MAP.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if(ch !== '#') return;
      // Schatten-Pixel (statisch, funkelt mit eigenem Delay)
      const s = document.createElement('div');
      s.className = 'p8s ' + (Math.random() < 0.5 ? 'p8sc' : 'p8sg');
      s.style.setProperty('--x', x);
      s.style.setProperty('--y', y);
      // Delay-Liste: 1. Wert für die Hüllkurve (synchron), 2. fürs Funkeln (versetzt)
      s.style.animationDelay = '0s,' + (Math.random() * 1.3).toFixed(2) + 's';
      frag.appendChild(s);
      // Flug-Pixel (Cyan oder Grün)
      const d = document.createElement('div');
      d.className = 'p8p ' + (Math.random() < 0.5 ? 'p8c' : 'p8g');
      d.style.setProperty('--x', x);
      d.style.setProperty('--y', y);
      const a1 = Math.random() * Math.PI * 2, r1 = 140 + Math.random() * 160;
      const a2 = Math.random() * Math.PI * 2, r2 = 120 + Math.random() * 180;
      d.style.setProperty('--sx', (Math.cos(a1) * r1).toFixed(0) + 'px');
      d.style.setProperty('--sy', (Math.sin(a1) * r1).toFixed(0) + 'px');
      d.style.setProperty('--ex', (Math.cos(a2) * r2).toFixed(0) + 'px');
      d.style.setProperty('--ey', (Math.sin(a2) * r2).toFixed(0) + 'px');
      d.style.animationDelay = (Math.random() * 0.18).toFixed(2) + 's';
      frag.appendChild(d);
    });
  });
  host.appendChild(frag);
})();

// Wackelkandidaten üben: eigener Modus, unabhängig von Kategorieauswahl.
document.getElementById('wrongStartBtn').addEventListener('click', () => {
  if(wrongCount() === 0) return;
  quizScope = 'wrong';
  startQuiz();
});
// Reset: Sammlung global leeren.
document.getElementById('wrongResetBtn').addEventListener('click', () => {
  if(wrongCount() === 0) return;
  if(confirm('Alle gesammelten Wackelkandidaten löschen? Danach werden falsch beantwortete Fragen neu gesammelt.')){
    resetWrong();
    refreshWrongState();
  }
});

// ---- Tab switching ----
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('view-' + tab.dataset.view).classList.add('active');
    window.scrollTo({top:0,behavior:'smooth'});
  });
});

// ---- Zen Mode: Vollbild + Fokus ----
const zenToggle = document.getElementById('zenToggle');
const tabBar = document.getElementById('tabBar');

function isFullscreen(){
  return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
}
function enterFullscreen(){
  const el = document.documentElement;
  const fn = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
  if(fn) fn.call(el);
}
function exitFullscreen(){
  const fn = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
  if(fn && isFullscreen()) fn.call(document);
}
zenToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  if(document.body.classList.contains('zen')){
    document.body.classList.remove('zen');
    exitFullscreen();
  } else {
    document.body.classList.add('zen');
    enterFullscreen();
  }
});
// Wenn der Nutzer per Esc aus dem Vollbild geht, Zen-Zustand sauber zurücksetzen.
['fullscreenchange','webkitfullscreenchange','mozfullscreenchange','MSFullscreenChange'].forEach(ev => {
  document.addEventListener(ev, () => {
    if(!isFullscreen()) document.body.classList.remove('zen');
  });
});

// ---- Navbar: beim Runterscrollen flüssig ausblenden (Slide + Auflösen),
// beim Hochscrollen wieder zeigen. Gegen Mobil-Zittern dreifach abgesichert:
// 1) Overscroll-Klammer: Gummiband-Bereiche (iOS/Android) werden komplett
//    ignoriert, sonst ploppt die Leiste am Seitenende rein und raus.
// 2) Richtungs-Akkumulator mit Hysterese: erst nach 14px Weg in EINE Richtung
//    wird versteckt (ein Swipe = 100px+, greift also sofort), nach 10px hoch
//    wieder gezeigt. Mikro-Richtungswechsel beim Finger-Lupfen resetten nur
//    den Zähler und starten die Transition nicht neu.
// 3) rAF-Drosselung: maximal ein Update pro Frame.
let lastScrollY = window.scrollY;
let scrollDir = 0;   // 1 = runter, -1 = hoch
let scrollAcc = 0;   // akkumulierter Weg in aktueller Richtung
let ticking = false;
const HIDE_AFTER = 14;
const SHOW_AFTER = 10;
function onScroll(){
  ticking = false;
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  const y = window.scrollY;
  // Gummiband oben/unten: nichts tun, lastScrollY nicht mitziehen
  if(y < 0 || y > maxY) return;
  const delta = y - lastScrollY;
  lastScrollY = y;
  if(delta === 0) return;
  const d = delta > 0 ? 1 : -1;
  if(d !== scrollDir){ scrollDir = d; scrollAcc = 0; }
  scrollAcc += Math.abs(delta);
  if(y < 60){ tabBar.classList.remove('hidden'); return; } // oben immer sichtbar
  if(scrollDir === 1 && scrollAcc > HIDE_AFTER){
    tabBar.classList.add('hidden');
  } else if(scrollDir === -1 && scrollAcc > SHOW_AFTER){
    tabBar.classList.remove('hidden');
  }
}
window.addEventListener('scroll', () => {
  if(!ticking){ window.requestAnimationFrame(onScroll); ticking = true; }
}, {passive:true});

refreshSelState();
const GLOSSAR = [{"a":"2FA","f":"Zwei-Faktor-Authentifizierung","d":"Anmeldung mit zwei unabhängigen Nachweisen, z. B. Passwort plus Einmalcode. Erhöht die Sicherheit deutlich."},
{"a":"ACK","f":"Acknowledgement","d":"Bestätigungssignal in Protokollen wie TCP. Teil des Three-Way-Handshakes (SYN, SYN-ACK, ACK)."},
{"a":"ACL","f":"Access Control List","d":"Liste von Regeln, die festlegt, wer auf eine Ressource zugreifen darf. Genutzt in Firewalls, Routern und Dateisystemen."},
{"a":"AES","f":"Advanced Encryption Standard","d":"Der Standard der symmetrischen Verschlüsselung. Schnell und sicher, z. B. bei HTTPS, VPN und WPA2/3 im Einsatz."},
{"a":"AP","f":"Access Point","d":"Gerät, das ein WLAN bereitstellt und Funkgeräte mit dem kabelgebundenen Netz verbindet."},
{"a":"API","f":"Application Programming Interface","d":"Definierte Schnittstelle zwischen Software-Systemen. Der Client sendet Anfragen, der Server antwortet standardisiert (meist JSON/XML)."},
{"a":"APIPA","f":"Automatic Private IP Addressing","d":"Automatische Selbstvergabe einer Adresse aus 169.254.0.0/16, wenn kein DHCP-Server erreichbar ist."},
{"a":"ARP","f":"Address Resolution Protocol","d":"Löst im lokalen Netz eine bekannte IP-Adresse in die zugehörige MAC-Adresse auf. Bei IPv6 durch NDP ersetzt."},
{"a":"ASCII","f":"American Standard Code for Information Interchange","d":"Zeichenkodierung mit 7 Bit für Buchstaben, Ziffern und Steuerzeichen. Grundlage vieler Textformate."},
{"a":"BAN","f":"Body Area Network","d":"Kleinste Netzausdehnung: Geräte direkt am oder im Körper, z. B. Smartwatch oder Medizinsensoren."},
{"a":"BIOS","f":"Basic Input/Output System","d":"Klassische Firmware, die den Rechner startet und Hardware initialisiert. Nachfolger ist UEFI."},
{"a":"BNC","f":"Bayonet Neill Concelman","d":"Bajonett-Steckverbinder für Koaxialkabel, typisch in alten Bus-Netzwerken (10BASE2)."},
{"a":"CA","f":"Certificate Authority (Zertifizierungsstelle)","d":"Vertrauenswürdige Instanz, die digitale Zertifikate signiert und ausstellt. Basis der PKI."},
{"a":"CAM","f":"Content Addressable Memory","d":"Spezialspeicher im Switch für die MAC-Adresstabelle: welche MAC hängt an welchem Port."},
{"a":"CAN","f":"Campus Area Network","d":"Netz über mehrere Gebäude eines Geländes, z. B. Uni oder Firmencampus. Achtung: Im KFZ-Bereich steht CAN für Controller Area Network (Bussystem)."},
{"a":"CIA","f":"Confidentiality, Integrity, Availability","d":"Die drei klassischen Schutzziele der IT-Sicherheit: Vertraulichkeit, Integrität, Verfügbarkeit."},
{"a":"CIDR","f":"Classless Inter-Domain Routing","d":"Präfix-Schreibweise für Netzgrößen, z. B. /24 = 24 Bit Netzanteil. Löste die starren Netzklassen ab."},
{"a":"CLI","f":"Command Line Interface","d":"Textbasierte Befehlszeile zur Steuerung von Systemen, Gegenstück zur grafischen Oberfläche (GUI)."},
{"a":"CNAME","f":"Canonical Name","d":"DNS-Record, der als Alias auf einen anderen Domainnamen verweist."},
{"a":"CPU","f":"Central Processing Unit","d":"Der Hauptprozessor eines Rechners, führt Programmbefehle aus."},
{"a":"CRC","f":"Cyclic Redundancy Check","d":"Prüfsummenverfahren zur Erkennung von Übertragungsfehlern, z. B. in der FCS eines Ethernet-Frames."},
{"a":"CRL","f":"Certificate Revocation List","d":"Sperrliste widerrufener Zertifikate einer CA. Alternative: Online-Prüfung per OCSP."},
{"a":"CRM","f":"Customer Relationship Management","d":"Software zur Verwaltung von Kundenbeziehungen, Kontakten und Vertriebsprozessen."},
{"a":"CSMA/CA","f":"Carrier Sense Multiple Access / Collision Avoidance","d":"Zugriffsverfahren im WLAN: Kollisionen werden vermieden, da Funk sie nicht zuverlässig erkennen kann."},
{"a":"CSMA/CD","f":"Carrier Sense Multiple Access / Collision Detection","d":"Zugriffsverfahren im klassischen Ethernet: Medium abhören, senden, Kollision erkennen, Backoff, neu senden."},
{"a":"CSS","f":"Cascading Style Sheets","d":"Sprache zur Gestaltung von Webseiten: Layout, Farben, Typografie. Ergänzt HTML."},
{"a":"CSV","f":"Comma-Separated Values","d":"Einfaches Textformat für Tabellendaten, Werte durch Kommas oder Semikolons getrennt."},
{"a":"DDoS","f":"Distributed Denial of Service","d":"Angriff, bei dem viele Systeme gleichzeitig ein Ziel überlasten, um es lahmzulegen."},
{"a":"DER","f":"Distinguished Encoding Rules","d":"Binäres Dateiformat für X.509-Zertifikate. PEM ist die textbasierte Variante."},
{"a":"DHCP","f":"Dynamic Host Configuration Protocol","d":"Vergibt automatisch IP-Adresse, Subnetzmaske, Gateway und DNS-Server. Ablauf: DORA. Ports 67/68 (UDP)."},
{"a":"DMZ","f":"Demilitarized Zone","d":"Abgetrennter Netzbereich für öffentlich erreichbare Server (z. B. Webserver), isoliert vom internen Netz."},
{"a":"DNS","f":"Domain Name System","d":"Das Telefonbuch des Internets: löst Domainnamen in IP-Adressen auf. Port 53."},
{"a":"DORA","f":"Discover, Offer, Request, Acknowledge","d":"Die vier Schritte der DHCP-Adressvergabe zwischen Client und Server."},
{"a":"DoS","f":"Denial of Service","d":"Angriff, der einen Dienst durch Überlastung unbenutzbar macht. Verteilt = DDoS."},
{"a":"DSGVO","f":"Datenschutz-Grundverordnung","d":"EU-Verordnung zum Schutz personenbezogener Daten. Regelt Verarbeitung, Speicherung und Rechte der Betroffenen."},
{"a":"DSL","f":"Digital Subscriber Line","d":"Breitband-Internetzugang über die Telefonleitung (Kupfer-Doppelader)."},
{"a":"ECC","f":"Elliptic Curve Cryptography","d":"Asymmetrisches Verschlüsselungsverfahren auf Basis elliptischer Kurven. Kürzere Schlüssel bei gleicher Sicherheit als RSA."},
{"a":"ERP","f":"Enterprise Resource Planning","d":"Software zur Steuerung zentraler Unternehmensprozesse: Einkauf, Lager, Produktion, Finanzen."},
{"a":"ESP","f":"Encapsulating Security Payload","d":"IPsec-Protokoll, das Nutzdaten kapselt, verschlüsselt und deren Integrität sichert."},
{"a":"EULA","f":"End User License Agreement","d":"Lizenzvertrag zwischen Softwarehersteller und Endnutzer über die Nutzungsbedingungen."},
{"a":"FCS","f":"Frame Check Sequence","d":"Prüfsummenfeld am Ende eines Ethernet-Frames (CRC) zur Fehlererkennung."},
{"a":"FDDI","f":"Fiber Distributed Data Interface","d":"Glasfaser-Doppelring der 80er/90er mit Token-Passing, 100 Mbit/s. Vom Switched Ethernet verdrängt."},
{"a":"FDM","f":"Frequency Division Multiplexing","d":"Frequenzmultiplex: mehrere Signale gleichzeitig auf verschiedenen Frequenzbändern über ein Medium."},
{"a":"FQDN","f":"Fully Qualified Domain Name","d":"Vollständiger Domainname inkl. Host und aller Ebenen, z. B. www.example.com."},
{"a":"FTP","f":"File Transfer Protocol","d":"Klassisches Dateiübertragungsprotokoll. Ports 20 (Daten) und 21 (Steuerung), unverschlüsselt."},
{"a":"GAN","f":"Global Area Network","d":"Weltumspannendes Netz, meist über Satellit und globale Mobilfunknetze."},
{"a":"GUI","f":"Graphical User Interface","d":"Grafische Benutzeroberfläche mit Fenstern, Symbolen und Maus-/Touchbedienung."},
{"a":"HDD","f":"Hard Disk Drive","d":"Magnetische Festplatte mit rotierenden Scheiben. Günstig und groß, aber langsamer als SSD."},
{"a":"HDMI","f":"High Definition Multimedia Interface","d":"Digitale Schnittstelle für Bild- und Tonübertragung an Monitore und Fernseher."},
{"a":"HTML","f":"Hypertext Markup Language","d":"Auszeichnungssprache zur Strukturierung von Webseiteninhalten."},
{"a":"HTTP","f":"Hypertext Transfer Protocol","d":"Protokoll zur Übertragung von Webinhalten. Port 80, unverschlüsselt."},
{"a":"HTTPS","f":"Hypertext Transfer Protocol Secure","d":"HTTP über TLS/SSL verschlüsselt. Port 443, Standard im Web."},
{"a":"IaaS","f":"Infrastructure as a Service","d":"Cloud-Modell: Anbieter stellt Rechenleistung, Speicher und Netz bereit; Kunde verwaltet Betriebssystem und Software."},
{"a":"ICMP","f":"Internet Control Message Protocol","d":"Steuer- und Fehlermeldungsprotokoll auf IP-Ebene. Grundlage von ping und Traceroute (Time Exceeded)."},
{"a":"IDS","f":"Intrusion Detection System","d":"Erkennt und meldet verdächtige Aktivitäten im Netz oder auf Systemen. Greift nicht aktiv ein (das macht ein IPS)."},
{"a":"IEEE","f":"Institute of Electrical and Electronics Engineers","d":"Ingenieursverband, der viele Netzwerkstandards definiert, z. B. 802.3 (Ethernet) und 802.11 (WLAN)."},
{"a":"IKE","f":"Internet Key Exchange","d":"Handelt bei IPsec die Schlüssel und Sicherheitsparameter (Security Associations) aus."},
{"a":"IMAP","f":"Internet Message Access Protocol","d":"Mailabruf, bei dem Nachrichten auf dem Server bleiben und synchronisiert werden. Port 143, verschlüsselt 993 (IMAPS)."},
{"a":"IoT","f":"Internet of Things","d":"Vernetzung von Alltagsgeräten und Sensoren über das Internet, z. B. smarte Thermostate."},
{"a":"IP","f":"Internet Protocol","d":"Adressiert und routet Pakete zwischen Netzen (Schicht 3). Selbst verbindungslos und ohne Zustellgarantie."},
{"a":"IPS","f":"Intrusion Prevention System","d":"Wie ein IDS, greift aber aktiv ein und blockiert erkannte Angriffe."},
{"a":"IPsec","f":"Internet Protocol Security","d":"Sicherheitserweiterung auf IP-Ebene: Verschlüsselung, Authentifizierung, Integrität. Transport- und Tunnelmodus, Standard für VPNs."},
{"a":"IPv4","f":"Internet Protocol Version 4","d":"32-Bit-Adressen als vier Dezimal-Oktette (z. B. 192.168.0.1), ca. 4,3 Mrd. Adressen — knapp geworden."},
{"a":"IPv6","f":"Internet Protocol Version 6","d":"128-Bit-Adressen in acht Hex-Blöcken (z. B. 2001:db8::1). Praktisch unerschöpflicher Adressraum."},
{"a":"ISO","f":"International Organization for Standardization","d":"Internationale Normungsorganisation, u. a. Urheber des OSI-Referenzmodells."},
{"a":"ISP","f":"Internet Service Provider","d":"Anbieter des Internetzugangs, z. B. Telekom oder Vodafone."},
{"a":"JSON","f":"JavaScript Object Notation","d":"Leichtgewichtiges, textbasiertes Datenformat. Standard für API-Antworten."},
{"a":"KVP","f":"Kontinuierlicher Verbesserungsprozess","d":"Methode zur stetigen Optimierung von Abläufen und Qualität in kleinen Schritten."},
{"a":"LAN","f":"Local Area Network","d":"Lokales Netz innerhalb eines Gebäudes oder Geländes, typisch Ethernet mit Switch."},
{"a":"LC","f":"Lucent Connector","d":"Kompakter Glasfaser-Steckertyp, weit verbreitet in Rechenzentren."},
{"a":"LDAP","f":"Lightweight Directory Access Protocol","d":"Protokoll für Verzeichnisdienste, z. B. zentrale Benutzerverwaltung (Active Directory). Port 389, verschlüsselt 636 (LDAPS)."},
{"a":"LED","f":"Light Emitting Diode","d":"Leuchtdiode; in der Netzwerktechnik Lichtquelle für Multimode-Glasfaser."},
{"a":"LWL","f":"Lichtwellenleiter","d":"Deutscher Begriff für Glasfaserkabel: überträgt Daten als Licht, immun gegen elektromagnetische Störungen."},
{"a":"MAC","f":"Media Access Control","d":"Weltweit eindeutige 48-Bit-Hardwareadresse einer Netzwerkkarte, z. B. 00:1A:2B:3C:4D:5E. Adressierung auf Schicht 2."},
{"a":"MAN","f":"Metropolitan Area Network","d":"Stadtweites Netz, verbindet Standorte innerhalb einer Region (bis ~100 km)."},
{"a":"MFA","f":"Multi-Faktor-Authentifizierung","d":"Anmeldung mit mehreren unabhängigen Faktoren (Wissen, Besitz, Biometrie). 2FA ist der Spezialfall mit zwei."},
{"a":"MPLS","f":"Multiprotocol Label Switching","d":"WAN-Technik, die Pakete anhand von Labels statt IP-Routing durch Providernetze leitet."},
{"a":"MUX","f":"Multiplexer","d":"Bündelt mehrere Signale zur Übertragung über ein gemeinsames Medium. Gegenstück: Demultiplexer (DEMUX)."},
{"a":"MX","f":"Mail Exchange","d":"DNS-Record, der den zuständigen Mailserver einer Domain benennt."},
{"a":"NAS","f":"Network Attached Storage","d":"Netzwerkspeicher: ein ans LAN angeschlossenes Gerät, das Dateien zentral bereitstellt."},
{"a":"NAT","f":"Network Address Translation","d":"Übersetzt private in öffentliche IP-Adressen. Primär gegen Adressknappheit — kein Sicherheitsmechanismus."},
{"a":"NDP","f":"Neighbor Discovery Protocol","d":"Ersetzt bei IPv6 das ARP: löst Adressen auf und entdeckt Router (via ICMPv6)."},
{"a":"NFC","f":"Near Field Communication","d":"Funkübertragung über wenige Zentimeter, z. B. kontaktloses Bezahlen. Typische PAN-Technologie."},
{"a":"NIC","f":"Network Interface Card","d":"Die Netzwerkkarte: physische Schnittstelle eines Geräts zum Netz, trägt ab Werk die MAC-Adresse."},
{"a":"NTP","f":"Network Time Protocol","d":"Synchronisiert Systemuhren über das Netzwerk mit Zeitservern. Port 123."},
{"a":"OCSP","f":"Online Certificate Status Protocol","d":"Prüft den Widerrufsstatus eines Zertifikats online in Echtzeit — Alternative zur CRL."},
{"a":"OOP","f":"Objektorientierte Programmierung","d":"Programmierparadigma mit Klassen und Objekten: Kapselung, Vererbung, Polymorphie."},
{"a":"OSI","f":"Open Systems Interconnection","d":"Das 7-Schichten-Referenzmodell der Netzwerkkommunikation, von Bitübertragung (1) bis Anwendung (7)."},
{"a":"OSPF","f":"Open Shortest Path First","d":"Dynamisches Routingprotokoll, das den kürzesten Weg anhand von Link-Kosten berechnet."},
{"a":"OUI","f":"Organizationally Unique Identifier","d":"Die ersten 24 Bit einer MAC-Adresse, kennzeichnen den Hersteller der Netzwerkkarte."},
{"a":"PaaS","f":"Platform as a Service","d":"Cloud-Modell: Anbieter stellt Entwicklungs- und Laufzeitumgebung; Kunde bringt nur die Anwendung."},
{"a":"PAN","f":"Personal Area Network","d":"Netz im persönlichen Nahbereich (~10 m), z. B. Bluetooth, USB, NFC."},
{"a":"PDU","f":"Protocol Data Unit","d":"Dateneinheit einer OSI-Schicht: Bit (L1), Frame (L2), Paket (L3), Segment (L4)."},
{"a":"PEM","f":"Privacy Enhanced Mail","d":"Textbasiertes Dateiformat für Zertifikate und Schlüssel (Base64). Binäre Alternative: DER."},
{"a":"PGP","f":"Pretty Good Privacy","d":"Verfahren zur E-Mail-Verschlüsselung und Signatur nach dem hybriden Prinzip."},
{"a":"PKI","f":"Public Key Infrastructure","d":"System zur Verwaltung von Schlüsseln und Zertifikaten mit CA-Hierarchie und Vertrauenskette."},
{"a":"PoE","f":"Power over Ethernet","d":"Stromversorgung von Geräten (APs, IP-Telefone, Kameras) direkt über das Netzwerkkabel."},
{"a":"POP3","f":"Post Office Protocol Version 3","d":"Mailabruf, bei dem Nachrichten heruntergeladen und meist vom Server gelöscht werden. Port 110, verschlüsselt 995 (POP3S)."},
{"a":"PSK","f":"Pre-Shared Key","d":"Vorab vereinbarter gemeinsamer Schlüssel, z. B. das WLAN-Passwort bei WPA2-Personal."},
{"a":"PXE","f":"Preboot Execution Environment","d":"Startet Rechner über das Netzwerk, z. B. für automatische Betriebssysteminstallation. Nutzt DHCP und TFTP."},
{"a":"QoS","f":"Quality of Service","d":"Priorisierung bestimmter Datenströme (z. B. VoIP) für gleichbleibende Qualität im Netz."},
{"a":"QUIC","f":"Quick UDP Internet Connections","d":"Modernes Transportprotokoll auf UDP-Basis mit integrierter Verschlüsselung. Grundlage von HTTP/3."},
{"a":"RADIUS","f":"Remote Authentication Dial-In User Service","d":"Zentraler Authentifizierungsserver, z. B. für WPA-Enterprise: prüft Benutzeranmeldungen im WLAN."},
{"a":"RAID","f":"Redundant Array of Independent Disks","d":"Verbund mehrerer Festplatten für Ausfallsicherheit und/oder Geschwindigkeit (RAID 0, 1, 5, 10)."},
{"a":"RAM","f":"Random Access Memory","d":"Flüchtiger Arbeitsspeicher: schnell, verliert Inhalt beim Ausschalten."},
{"a":"RDP","f":"Remote Desktop Protocol","d":"Grafische Fernsteuerung von Windows-Rechnern. Port 3389; gesicherter Zugang von außen über RD-Gateway."},
{"a":"REST","f":"Representational State Transfer","d":"Architekturstil für Web-APIs: zustandslos, nutzt HTTP-Methoden (GET, POST, PUT, DELETE)."},
{"a":"RFC","f":"Request for Comments","d":"Offizielle Dokumente, in denen Internetstandards und Protokolle beschrieben werden."},
{"a":"RIP","f":"Routing Information Protocol","d":"Einfaches dynamisches Routingprotokoll auf Basis der Hop-Anzahl (max. 15 Hops)."},
{"a":"RJ45","f":"Registered Jack 45","d":"Der 8-polige Standardstecker für Twisted-Pair-Netzwerkkabel (Ethernet)."},
{"a":"RSA","f":"Rivest–Shamir–Adleman","d":"Klassisches asymmetrisches Verschlüsselungsverfahren mit öffentlichem und privatem Schlüssel."},
{"a":"RTP","f":"Real-Time Transport Protocol","d":"Transportiert Echtzeitdaten wie Sprache und Video, z. B. bei VoIP. Läuft über UDP."},
{"a":"SaaS","f":"Software as a Service","d":"Cloud-Modell: fertige Software wird über das Internet genutzt, z. B. Webmail oder Office 365."},
{"a":"SAN","f":"Storage Area Network","d":"Eigenes Hochgeschwindigkeitsnetz, das Server mit zentralen Speichersystemen verbindet."},
{"a":"SATA","f":"Serial ATA","d":"Standardschnittstelle zum Anschluss von Festplatten und SSDs im Rechner."},
{"a":"SC","f":"Subscriber Connector","d":"Glasfaser-Steckertyp mit Push-Pull-Mechanik, verbreitet in Verteilern."},
{"a":"SFTP","f":"SSH File Transfer Protocol","d":"Verschlüsselte Dateiübertragung über SSH (Port 22). Nicht zu verwechseln mit FTPS."},
{"a":"SIP","f":"Session Initiation Protocol","d":"Signalisierungsprotokoll bei VoIP: baut Gespräche auf, verwaltet und beendet sie."},
{"a":"SLA","f":"Service Level Agreement","d":"Vertrag über zugesicherte Dienstqualität, z. B. Verfügbarkeit und Reaktionszeiten."},
{"a":"SLAAC","f":"Stateless Address Autoconfiguration","d":"IPv6-Selbstkonfiguration: Gerät bildet seine Adresse aus dem Router-Präfix, ohne Server."},
{"a":"S/MIME","f":"Secure/Multipurpose Internet Mail Extensions","d":"Standard für E-Mail-Verschlüsselung und -Signatur mit X.509-Zertifikaten."},
{"a":"SMTP","f":"Simple Mail Transfer Protocol","d":"Versand von E-Mails zwischen Servern. Port 25; Client-Versand über 587 (Submission) oder 465 (SMTPS)."},
{"a":"SNMP","f":"Simple Network Management Protocol","d":"Überwachung und Verwaltung von Netzwerkgeräten. Port 161, Traps (Meldungen) auf 162."},
{"a":"SOAP","f":"Simple Object Access Protocol","d":"Älteres API-Protokoll auf XML-Basis mit strengen Standards, verbreitet im Banking."},
{"a":"SQL","f":"Structured Query Language","d":"Standardsprache für relationale Datenbanken: Abfragen, Einfügen, Ändern, Löschen von Daten."},
{"a":"SSD","f":"Solid State Drive","d":"Flash-basierter Massenspeicher ohne bewegliche Teile: schnell, robust, teurer pro GB als HDD."},
{"a":"SSH","f":"Secure Shell","d":"Verschlüsselte Fernsteuerung und Dateiübertragung. Port 22. Sicherer Nachfolger von Telnet."},
{"a":"SSID","f":"Service Set Identifier","d":"Der Name eines WLAN-Netzes, den Geräte bei der Suche angezeigt bekommen."},
{"a":"SSL","f":"Secure Sockets Layer","d":"Veraltetes Verschlüsselungsprotokoll für Verbindungen, abgelöst durch TLS. Der Begriff hält sich umgangssprachlich."},
{"a":"STP","f":"Spanning Tree Protocol / Shielded Twisted Pair","d":"1) Netzprotokoll gegen Switching-Loops: deaktiviert redundante Verbindungen. 2) Geschirmtes Twisted-Pair-Kabel mit besserem Schutz gegen Störungen als UTP."},
{"a":"SYN","f":"Synchronize","d":"Erstes Segment des TCP-Verbindungsaufbaus. Ablauf: SYN, SYN-ACK, ACK."},
{"a":"TCP","f":"Transmission Control Protocol","d":"Verbindungsorientiertes Transportprotokoll mit Zustellgarantie, Reihenfolgesicherung und Flusskontrolle (Schicht 4)."},
{"a":"TDM","f":"Time Division Multiplexing","d":"Zeitmultiplex: mehrere Signale teilen sich ein Medium in aufeinanderfolgenden Zeitschlitzen."},
{"a":"TFTP","f":"Trivial File Transfer Protocol","d":"Minimaler Dateitransfer ohne Anmeldung über UDP (Port 69), z. B. beim PXE-Netzwerkboot."},
{"a":"TLD","f":"Top-Level-Domain","d":"Oberste Ebene eines Domainnamens, z. B. .de oder .com. TLD-Server verweisen auf autoritative Nameserver."},
{"a":"TLS","f":"Transport Layer Security","d":"Aktuelles Protokoll zur Verschlüsselung von Verbindungen, z. B. bei HTTPS. Nachfolger von SSL."},
{"a":"TTL","f":"Time to Live","d":"Hop-Zähler im IP-Header: jeder Router zieht 1 ab, bei 0 wird verworfen. Verhindert endlos kreisende Pakete. Bei DNS: Cache-Gültigkeitsdauer."},
{"a":"UDP","f":"User Datagram Protocol","d":"Verbindungsloses Transportprotokoll ohne Zustellgarantie — schnell, ideal für Echtzeit (VoIP, Streaming, DNS)."},
{"a":"UEFI","f":"Unified Extensible Firmware Interface","d":"Moderne Firmware-Schnittstelle, Nachfolger des BIOS. Unterstützt u. a. Secure Boot und große Festplatten."},
{"a":"URL","f":"Uniform Resource Locator","d":"Vollständige Adresse einer Ressource im Web, z. B. https://example.com/seite."},
{"a":"USB","f":"Universal Serial Bus","d":"Universelle Schnittstelle für Peripheriegeräte und Datenübertragung, auch als PAN-Technologie."},
{"a":"USV","f":"Unterbrechungsfreie Stromversorgung","d":"Überbrückt Stromausfälle per Akku, damit Server geordnet weiterlaufen oder herunterfahren können (engl. UPS)."},
{"a":"UTP","f":"Unshielded Twisted Pair","d":"Ungeschirmtes Twisted-Pair-Kabel: Standard im LAN, günstig, aber störanfälliger als STP."},
{"a":"VLAN","f":"Virtual Local Area Network","d":"Logische Netztrennung auf einem physischen Switch: trennt Broadcastdomänen, z. B. Gäste-WLAN vom Firmennetz."},
{"a":"VLSM","f":"Variable Length Subnet Masking","d":"Subnetting mit unterschiedlich großen Subnetzen je nach Bedarf, statt einheitlicher Maskenlänge."},
{"a":"VM","f":"Virtuelle Maschine","d":"Software-emulierter Rechner, der auf physischer Hardware läuft. Mehrere VMs teilen sich einen Host."},
{"a":"VoIP","f":"Voice over IP","d":"Telefonie über das IP-Netz. Signalisierung per SIP, Sprachtransport per RTP über UDP."},
{"a":"VPN","f":"Virtual Private Network","d":"Verschlüsselter Tunnel durch ein unsicheres Netz, z. B. für Homeoffice-Zugriff aufs Firmennetz. Häufig mit IPsec."},
{"a":"WAN","f":"Wide Area Network","d":"Weitverkehrsnetz über große Distanzen — das Internet ist das größte WAN."},
{"a":"WDM","f":"Wavelength Division Multiplexing","d":"Wellenlängenmultiplex: mehrere Datenströme gleichzeitig über verschiedene Lichtwellenlängen in einer Glasfaser."},
{"a":"WEP","f":"Wired Equivalent Privacy","d":"Veraltete, gebrochene WLAN-Verschlüsselung. Nicht mehr verwenden — heute WPA2/WPA3."},
{"a":"WLAN","f":"Wireless Local Area Network","d":"Drahtloses lokales Netz nach IEEE 802.11 (Wi-Fi), bereitgestellt über Access Points."},
{"a":"WPA","f":"Wi-Fi Protected Access","d":"WLAN-Sicherheitsstandard. WPA2 ist Minimum, WPA3 aktuell (besserer Schutz gegen Brute-Force)."},
{"a":"WWW","f":"World Wide Web","d":"Das über HTTP/HTTPS erreichbare Hypertext-System aus verlinkten Webseiten — ein Dienst des Internets."},
{"a":"X.509","f":"X.509-Standard","d":"Das Standardformat für digitale Zertifikate in der PKI, gespeichert als PEM oder DER."},
{"a":"XML","f":"Extensible Markup Language","d":"Textbasierte Auszeichnungssprache für strukturierte Daten, u. a. bei SOAP-APIs."},
{"a":"XOR","f":"Exclusive Or (Exklusiv-Oder)","d":"Logische Verknüpfung: Ausgang 1, wenn die Eingänge verschieden sind. Erkennt Bit-Änderungen."},
{"a":"XNOR","f":"Exclusive Not Or","d":"Negiertes XOR: Ausgang 1, wenn beide Eingänge gleich sind — die Gleichheitsprüfung."},
{"a":"802.1Q","f":"VLAN-Tagging-Standard","d":"IEEE-Norm, die einen 4-Byte-Tag mit VLAN-ID in den Ethernet-Frame einfügt. Grundlage für VLANs über Trunk-Ports."},
{"a":"802.11ax","f":"Wi-Fi 6","d":"WLAN-Standard nach 802.11ac. Höhere Effizienz und Durchsatz, besonders in dichten Umgebungen mit vielen Geräten."},
{"a":"802.11r","f":"Fast BSS Transition (Fast Roaming)","d":"WLAN-Erweiterung für nahtlosen Wechsel zwischen Access Points ohne erneute vollständige Anmeldung."},
{"a":"AH","f":"Authentication Header","d":"IPsec-Protokoll, das Authentizität und Integrität sichert, aber nicht verschlüsselt. Gegenstück: ESP."},
{"a":"Auto-Negotiation","f":"Automatische Aushandlung","d":"Zwei Ethernet-Ports einigen sich selbsttätig auf die höchste gemeinsame Geschwindigkeit und den Duplex-Modus."},
{"a":"Band Steering","f":"Bandlenkung","d":"WLAN-Funktion, die dual-band-fähige Geräte automatisch auf das weniger ausgelastete 5-GHz-Band lenkt."},
{"a":"Broadcast","f":"Rundsendung an alle","d":"Nachricht an alle Geräte im Subnetz. MAC-Broadcast: FF:FF:FF:FF:FF:FF. Wird durch Router begrenzt."},
{"a":"Congestion Control","f":"Staukontrolle","d":"TCP-Mechanismus, der bei Paketverlust die Senderate drosselt, um Netzüberlastung zu vermeiden."},
{"a":"Diffie-Hellman","f":"Diffie-Hellman-Schlüsselaustausch","d":"Verfahren, mit dem zwei Parteien über einen unsicheren Kanal einen gemeinsamen geheimen Schlüssel vereinbaren, ohne ihn zu übertragen."},
{"a":"FIN","f":"Finish","d":"TCP-Flag zum geordneten Verbindungsabbau. Gegenstück zum abrupten RST."},
{"a":"Hidden Node","f":"Verstecktes-Endgerät-Problem","d":"Zwei WLAN-Clients hören sich gegenseitig nicht und senden gleichzeitig zum AP — es kommt zur Kollision. Milderung durch RTS/CTS."},
{"a":"Honeypot","f":"Honigtopf","d":"Absichtlich verwundbares Lockvogel-System, das Angreifer anzieht, ablenkt und ihre Methoden sichtbar macht."},
{"a":"IKEv2","f":"Internet Key Exchange Version 2","d":"Modernere Version des IPsec-Schlüsselaustauschs. Stabil bei Netzwechseln, gilt als sicher und schnell."},
{"a":"Intermediate CA","f":"Zwischenzertifizierungsstelle","d":"CA zwischen Root-CA und Endzertifikat. Stellt Zertifikate aus, während die Root-CA offline geschützt bleibt."},
{"a":"Kill Switch","f":"Notausschalter (VPN)","d":"Blockiert den Internetzugriff automatisch, sobald die VPN-Verbindung abbricht — verhindert unverschlüsselten Datenabfluss."},
{"a":"Longest Prefix Match","f":"Längste Präfixübereinstimmung","d":"Routing-Regel: Bei mehreren passenden Einträgen gewinnt der spezifischste (längste Netzpräfix)."},
{"a":"Loopback","f":"Rückschleife","d":"Adresse 127.0.0.1 (IPv4) bzw. ::1 (IPv6). Verweist auf den eigenen Rechner; Pakete verlassen die Netzwerkkarte nie."},
{"a":"L2TP","f":"Layer 2 Tunneling Protocol","d":"VPN-Tunnelprotokoll ohne eigene Verschlüsselung, meist als L2TP/IPsec kombiniert."},
{"a":"LSB","f":"Least Significant Bit","d":"Das niederwertigste Bit einer Binärzahl (ganz rechts, Wertigkeit 1)."},
{"a":"MSB","f":"Most Significant Bit","d":"Das höchstwertige Bit einer Binärzahl (ganz links, größte Wertigkeit)."},
{"a":"MTU","f":"Maximum Transmission Unit","d":"Größte Paketgröße, die ohne Fragmentierung übertragen werden kann. Bei Ethernet typisch 1500 Byte."},
{"a":"Multicast","f":"Gruppensendung","d":"Nachricht an eine definierte Gruppe von Empfängern (1:n), nicht an alle. Effizienter als viele Unicasts."},
{"a":"MySQL","f":"MySQL-Datenbank","d":"Verbreitetes relationales Datenbanksystem. Standardport 3306 (TCP)."},
{"a":"Nibble","f":"Halbbyte","d":"4 Bit = eine Hexadezimalstelle. Ein Byte besteht aus zwei Nibbles."},
{"a":"OpenVPN","f":"OpenVPN","d":"Open-Source-VPN-Protokoll auf TLS-Basis. Plattformunabhängig und flexibel konfigurierbar."},
{"a":"Pentest","f":"Penetration Test (Penetrationstest)","d":"Autorisierter, simulierter Angriff auf ein System, um Schwachstellen vor echten Angreifern zu finden."},
{"a":"Phishing","f":"Phishing","d":"Social-Engineering-Angriff per gefälschter Mail oder Website, um Zugangsdaten zu stehlen."},
{"a":"PTR","f":"Pointer Record","d":"DNS-Eintrag für den Reverse-Lookup: löst eine IP-Adresse zurück in einen Namen auf."},
{"a":"Rainbow Table","f":"Regenbogentabelle","d":"Vorberechnete Tabelle von Hashwerten zum schnellen Knacken von Passwörtern. Wird durch Salt unwirksam."},
{"a":"Ransomware","f":"Erpressungssoftware","d":"Schadsoftware, die Daten verschlüsselt und für die Freigabe Lösegeld fordert."},
{"a":"Resolver","f":"DNS-Resolver","d":"Komponente, die DNS-Anfragen für den Client auflöst — rekursiv (komplett) oder iterativ (schrittweise)."},
{"a":"Roaming","f":"WLAN-Roaming","d":"Nahtloser Wechsel eines Clients zwischen Access Points ohne Verbindungsabbruch. Beschleunigt durch 802.11r."},
{"a":"RST","f":"Reset","d":"TCP-Flag, das eine Verbindung sofort und ungeordnet abbricht — im Gegensatz zum geordneten FIN."},
{"a":"SAE","f":"Simultaneous Authentication of Equals","d":"Schlüsselverfahren in WPA3-Personal. Ersetzt PSK und verhindert Offline-Brute-Force auf das Passwort."},
{"a":"Salt","f":"Salt (Streuwert)","d":"Zufallswert, der vor dem Hashing an ein Passwort angehängt wird. Macht Rainbow-Tables wirkungslos."},
{"a":"Self-Signed","f":"Selbstsigniertes Zertifikat","d":"Zertifikat, das von seiner eigenen Instanz signiert wurde — ohne externen Vertrauensanker. Für Tests/intern."},
{"a":"SHA","f":"Secure Hash Algorithm","d":"Familie kryptografischer Hashfunktionen (z. B. SHA-256). Erzeugt einen einwegigen Fingerabdruck von Daten."},
{"a":"SMB","f":"Server Message Block","d":"Protokoll für Windows-Datei- und Druckerfreigaben. Standardport 445 (TCP)."},
{"a":"SOCKS","f":"Socket Secure","d":"Proxy-Protokoll, das beliebigen TCP/UDP-Verkehr weiterleitet. Standardport 1080, u. a. bei Tor genutzt."},
{"a":"Split Tunneling","f":"Geteiltes Tunneling","d":"Nur ausgewählter Verkehr läuft durch den VPN-Tunnel, der Rest direkt ins Internet. Entlastet das VPN."},
{"a":"Three-Way-Handshake","f":"Drei-Wege-Handschlag","d":"TCP-Verbindungsaufbau in drei Schritten: SYN → SYN-ACK → ACK."},
{"a":"Trunk","f":"Trunk-Port","d":"Switch-Port, der Frames mehrerer VLANs gleichzeitig transportiert (tagged nach 802.1Q). Verbindet Switches/Router."},
{"a":"Unicast","f":"Einzelsendung","d":"Nachricht an genau einen Empfänger (1:1). Der Normalfall der Netzwerkkommunikation."},
{"a":"Uplink","f":"Uplink-Port","d":"Port, der einen Switch mit einem übergeordneten Gerät (Router, Core-Switch) verbindet, oft mit höherer Bandbreite."},
{"a":"Wireless Controller","f":"WLAN-Controller (WLC)","d":"Zentrales Gerät zur Verwaltung mehrerer Access Points: Konfiguration, Roaming, Sicherheit."},
{"a":"WPS","f":"Wi-Fi Protected Setup","d":"Vereinfachte WLAN-Einrichtung per PIN oder Knopfdruck. Die PIN-Methode ist unsicher und sollte deaktiviert werden."},
{"a":"RA","f":"Registration Authority (Registrierungsstelle)","d":"PKI-Komponente, die die Identität von Zertifikatsantragstellern prüft, bevor die CA das Zertifikat ausstellt."},
{"a":"ISAKMP","f":"Internet Security Association and Key Management Protocol","d":"Rahmenwerk für Aushandlung und Verwaltung von Security Associations bei IPsec. IKE baut darauf auf."},
{"a":"PPTP","f":"Point-to-Point Tunneling Protocol","d":"Veraltetes VPN-Tunnelprotokoll mit bekannten Sicherheitslücken. Nicht mehr einsetzen — heute IPsec, OpenVPN oder WireGuard."},
{"a":"MITM","f":"Man-in-the-Middle-Angriff","d":"Angreifer schaltet sich unbemerkt zwischen zwei Kommunikationspartner und kann mitlesen oder manipulieren. Abwehr: Verschlüsselung mit Authentifizierung (z. B. TLS mit Zertifikatsprüfung)."},
{"a":"VLAN-Hopping","f":"VLAN-Hopping-Angriff","d":"Angriff, der die VLAN-Trennung umgeht, z. B. per Switch-Spoofing (Trunk aushandeln) oder Double Tagging. Abwehr: ungenutzte Ports deaktivieren, kein automatisches Trunking, natives VLAN nicht für Nutzdaten."},
{"a":"MAC-Spoofing","f":"MAC-Adressen-Fälschung","d":"Vortäuschen einer fremden MAC-Adresse, um MAC-Filter oder dynamische VLAN-Zuordnung auszuhebeln. Grund, warum MAC-basierte Sicherheit als schwach gilt."},
{"a":"Kerberos","f":"Kerberos-Authentifizierungsprotokoll","d":"Ticketbasierte Authentifizierung in Netzwerken (Standard in Active Directory). Ein zentraler Server (KDC) stellt Tickets aus, Passwörter werden nie übertragen."},
{"a":"TACACS+","f":"Terminal Access Controller Access-Control System Plus","d":"AAA-Protokoll (Authentifizierung, Autorisierung, Accounting) v. a. für die Verwaltung von Netzwerkgeräten. Alternative zu RADIUS, trennt die drei AAA-Funktionen sauberer."},
{"a":"EAP","f":"Extensible Authentication Protocol","d":"Rahmenwerk für Authentifizierungsverfahren, u. a. im WLAN (WPA-Enterprise). Varianten wie EAP-TLS nutzen Zertifikate statt Passwörter."},
{"a":"802.1X","f":"Portbasierte Netzwerk-Zugangskontrolle","d":"IEEE-Standard: Ein Gerät muss sich erst authentifizieren (via EAP gegen z. B. RADIUS), bevor der Switch-/WLAN-Port Verkehr durchlässt. Basis von WPA-Enterprise."},
{"a":"Hash","f":"Hashwert (kryptografische Prüfsumme)","d":"Fester Fingerabdruck beliebiger Daten, nicht umkehrbar und kollisionsresistent. Grundlage von Signaturen, Passwortspeicherung und Integritätsprüfung. Bekannte Verfahren: SHA-256; MD5/SHA-1 gelten als gebrochen."},
{"a":"STARTTLS","f":"Opportunistische TLS-Verschlüsselung","d":"Erweiterung, die eine zunächst unverschlüsselte Klartextverbindung nachträglich auf eine TLS-verschlüsselte umschaltet — auf demselben Port. Genutzt bei SMTP (587), IMAP (143) und POP3 (110). Vorteil: keine getrennten Klartext-/Verschlüsselungsports nötig. Schwäche: anfällig für STARTTLS-Stripping, wenn nicht per Policy erzwungen."},
{"a":"Trap","f":"SNMP-Trap","d":"Unaufgeforderte Benachrichtigung, die ein überwachtes Gerät (Agent) von sich aus an die Managementstation sendet, sobald ein Ereignis eintritt (z. B. Schnittstelle down, Schwellwert überschritten). Gegenstück zum Polling, bei dem die Station aktiv abfragt. Läuft über UDP-Port 162, während normale SNMP-Abfragen auf 161 gehen."},
{"a":"RTT","f":"Round Trip Time (Paketumlaufzeit)","d":"Zeit, die ein Paket vom Sender zum Ziel und die Antwort wieder zurück braucht. Wird u. a. per ping gemessen und geht in die Berechnung des TCP-Timeouts ein. Hohe RTT bedeutet spürbare Latenz — kritisch für Echtzeitanwendungen wie VoIP und Videotelefonie."},
{"a":"DEMUX","f":"Demultiplexer","d":"Gegenstück zum Multiplexer: trennt einen kombinierten Datenstrom beim Empfänger wieder auf und ordnet die Teile der richtigen Anwendung zu. Auf der Transportschicht geschieht das anhand der Portnummern, die den ankommenden Verkehr dem passenden Socket zuweisen."},
{"a":"RPC","f":"Remote Procedure Call (entfernter Prozeduraufruf)","d":"Verfahren, bei dem ein Programm eine Funktion auf einem anderen Rechner aufruft, als wäre sie lokal — die Netzwerkkommunikation läuft im Hintergrund. Im OSI-Modell auf der Sitzungsschicht (Schicht 5) angesiedelt. Grundlage vieler verteilter Systeme; moderne Varianten sind z. B. gRPC und JSON-RPC."},
{"a":"EMV","f":"Elektromagnetische Verträglichkeit","d":"Fähigkeit eines Geräts, im elektromagnetischen Umfeld störungsfrei zu arbeiten, ohne selbst andere Geräte unzulässig zu stören. Das Störphänomen selbst heißt EMI (Electromagnetic Interference). In der Netzwerktechnik relevant bei der Kabelwahl: geschirmte Leitungen (STP) und Glasfaser sind gegen elektromagnetische Einstreuung robuster als ungeschirmtes Kupfer (UTP)."},
{"a":"Crosstalk","f":"Übersprechen","d":"Ungewolltes Überkoppeln eines Signals von einer Ader auf eine benachbarte im selben Kabel, wodurch Störungen entstehen. Verdrillung der Adernpaare (Twisted Pair) und Schirmung reduzieren den Effekt. Kenngrößen: NEXT (Near-End Crosstalk) misst das Übersprechen am selben Kabelende wie der Sender, FEXT (Far-End Crosstalk) am entfernten Ende."},
{"a":"AND","f":"UND-Verknüpfung (Konjunktion)","d":"Logikgatter: Ausgang ist 1, nur wenn beide Eingänge 1 sind. In der Netzwerktechnik zentral beim Subnetting — die Netzadresse entsteht durch bitweises AND aus IP-Adresse und Subnetzmaske."},
{"a":"OR","f":"ODER-Verknüpfung (Disjunktion)","d":"Logikgatter: Ausgang ist 1, sobald mindestens ein Eingang 1 ist. Nur bei 0/0 ergibt sich 0. Nicht zu verwechseln mit XOR, das bei gleichen Eingängen 0 liefert."},
{"a":"NOT","f":"Negation (Inverter)","d":"Logikgatter mit nur einem Eingang: kehrt den Wert um (0 wird 1, 1 wird 0). Baustein der negierten Gatter — NAND, NOR und XNOR sind AND, OR und XOR mit nachgeschaltetem NOT."},
{"a":"NAND","f":"NICHT-UND-Verknüpfung","d":"Negiertes AND: Ausgang ist 0, nur wenn beide Eingänge 1 sind — in allen anderen Fällen 1. NAND gilt als Universalgatter: Aus NAND-Gattern allein lässt sich jede andere Logikfunktion aufbauen."},
{"a":"NOR","f":"NICHT-ODER-Verknüpfung","d":"Negiertes OR: Ausgang ist 1, nur wenn beide Eingänge 0 sind. Wie NAND ein Universalgatter, aus dem sich alle anderen Verknüpfungen konstruieren lassen."},
{"a":"CDM","f":"Code Division Multiplexing (Codemultiplex)","d":"Multiplexverfahren: Alle Teilnehmer senden gleichzeitig auf derselben Frequenz, getrennt durch eindeutige Codes. Der Empfänger filtert das gewünschte Signal über den passenden Code heraus. Basis von CDMA im Mobilfunk. Abgrenzung: TDM trennt über Zeit, FDM über Frequenz, WDM über Lichtwellenlänge."},
{"a":"RARP","f":"Reverse Address Resolution Protocol","d":"Umkehrung von ARP: ermittelt zu einer bekannten MAC-Adresse die zugehörige IP-Adresse. Historisch von plattenlosen Stationen zum Beziehen ihrer IP genutzt — heute veraltet und durch DHCP ersetzt."},
{"a":"RJ11","f":"Registered Jack 11","d":"Kleiner Steckverbinder mit 4–6 Kontakten, klassisch für analoge Telefonleitungen und DSL-Anschlüsse. Nicht zu verwechseln mit dem breiteren 8-poligen RJ45 für Ethernet-Netzwerkkabel."},
{"a":"MSS","f":"Maximum Segment Size","d":"Größte Nutzdatenmenge, die ein TCP-Segment tragen darf — ohne TCP-/IP-Header. Wird beim Verbindungsaufbau ausgehandelt und leitet sich aus der MTU des Übertragungswegs ab (typisch: MTU 1500 minus 40 Byte Header = MSS 1460)."},
{"a":"DSCP","f":"Differentiated Services Code Point","d":"6-Bit-Feld im IP-Header zur Klassifizierung von Paketen für Quality of Service: Router lesen den Wert und behandeln markierten Verkehr bevorzugt — z. B. VoIP-Pakete vor Downloads. Nachfolger des älteren ToS-Felds."},
{"a":"Hypervisor","f":"Virtual Machine Monitor","d":"Software- oder Firmwareschicht, die virtuelle Maschinen erstellt und verwaltet. Stellt jedem Gastsystem virtuelle Hardware bereit und trennt es von der realen Hardware und den anderen Gästen. Typ 1 läuft direkt auf der Hardware (Baremetal), Typ 2 setzt auf einem vollständigen Host-Betriebssystem auf (Hosted)."},
{"a":"Baremetal","f":"Baremetal-Virtualisierung","d":"Bezeichnung für einen Typ-1-Hypervisor, der direkt auf der Hardware läuft, ohne ein darunterliegendes Betriebssystem. Beispiele: VMware ESXi, Microsoft Hyper-V, Citrix Xen, KVM."},
{"a":"Hosted","f":"Hosted-Virtualisierung","d":"Bezeichnung für einen Typ-2-Hypervisor, der wie eine gewöhnliche Anwendung auf einem bereits installierten Betriebssystem läuft. Beispiele: VirtualBox, VMware Workstation, Parallels Desktop."},
{"a":"VDI","f":"Virtual Desktop Infrastructure","d":"Bereitstellung individuell konfigurierter Betriebssysteminstanzen für Arbeitsplätze zentral auf einem Server statt lokal auf jedem Rechner. Vorteile: höhere Datensicherheit, einfachere Administration, Einsatz von Thin Clients. Nachteil: Serverausfall legt alle Arbeitsplätze gleichzeitig lahm."},
{"a":"Thin Client","f":"Thin Client","d":"Einfacher Endgeräte-Rechner mit minimaler eigener Rechenleistung, der im Wesentlichen nur Bildschirminhalte von einem Server empfängt und Eingaben zurücksendet. Typischer Client-Baustein einer VDI-Umgebung."},
{"a":"Overcommitment","f":"Überprovisionierung","d":"Virtuellen Maschinen wird in Summe mehr Arbeitsspeicher oder Rechenleistung zugewiesen, als auf dem Host physisch vorhanden ist. Solange nicht alle VMs gleichzeitig ihr volles Kontingent abrufen, funktioniert das — bei gleichzeitigem Spitzenbedarf drohen Engpässe. Gegenmaßnahmen: Monitoring, Auslastungsprognosen, Live-Migration."},
{"a":"Live-Migration","f":"Live-Migration","d":"Verschiebung einer laufenden virtuellen Maschine auf einen anderen Host im laufenden Betrieb, ohne den Dienst zu unterbrechen. Vereinfacht Wartungsarbeiten und Lastenausgleich zwischen mehreren Hosts."},
{"a":"Para-Virtualisierung","f":"Para-Virtualisierung","d":"Virtualisierungsform, bei der keine Hardware emuliert wird. Stattdessen stellt der Hypervisor eine API als Schnittstelle bereit, die das Gastsystem direkt nutzen muss — dafür muss dessen Kernel angepasst oder bereits vorbereitet sein. Vorteil: kein Overhead durch Befehlsübersetzung. Typischer Einsatz: Rechenzentren, Cloud-Anbieter."},
{"a":"Hot-Spare","f":"Hot-Spare-Platte","d":"Reservefestplatte, die in einem RAID-Verbund mitläuft und bei Ausfall einer Platte automatisch einspringt. Der Rebuild startet sofort, ohne dass ein Techniker eingreifen muss."},
{"a":"Hot-Swap","f":"Hot-Swap","d":"Austausch einer Festplatte im laufenden Betrieb, ohne das System herunterzufahren. Voraussetzung für Wartung und Plattentausch ohne Ausfallzeit, üblich in Servern und Storage-Systemen."},
{"a":"RPO","f":"Recovery Point Objective","d":"Maximal tolerierbarer Datenverlust, ausgedrückt als Zeitspanne bis zur letzten Sicherung. Ein RPO von 1 Stunde bedeutet: im Ernstfall darf höchstens 1 Stunde an Daten verloren gehen. Bestimmt die Sicherungshäufigkeit."},
{"a":"RTO","f":"Recovery Time Objective","d":"Maximal tolerierbare Ausfallzeit, bis ein System nach einer Störung wieder verfügbar sein muss. Während RPO den akzeptablen Datenverlust beschreibt, betrifft RTO die Dauer der Wiederherstellung."},
{"a":"Parity","f":"Parität (RAID)","d":"Per XOR berechnete Prüfinformation, aus der sich die Daten einer ausgefallenen Platte rekonstruieren lassen. Grundlage von RAID 5 (einfache Parität) und RAID 6 (doppelte Parität)."}];

// ---- Bibliothek: Render + Suche ----
const libList = document.getElementById('libList');
const libSearch = document.getElementById('libSearch');
const libCount = document.getElementById('libCount');

const GLOSSAR_SORTED = [...GLOSSAR].sort((a,b)=>a.a.localeCompare(b.a,'de',{sensitivity:'base'}));

function renderLib(entries){
  libList.innerHTML = '';
  if(entries.length === 0){
    libList.innerHTML = '<div class="lib-empty">Kein Treffer.</div>';
    libCount.textContent = '0 / ' + GLOSSAR_SORTED.length;
    return;
  }
  let currentLetter = '';
  entries.forEach(e => {
    const letter = e.a[0].toUpperCase();
    if(letter !== currentLetter){
      currentLetter = letter;
      const h = document.createElement('div');
      h.className = 'lib-letter';
      h.textContent = letter;
      libList.appendChild(h);
    }
    const item = document.createElement('div');
    item.className = 'lib-item';
    item.innerHTML = '<span class="lib-abbr">'+e.a+'</span><span class="lib-full">'+e.f+'</span><span class="lib-desc">'+e.d+'</span>';
    libList.appendChild(item);
  });
  libCount.textContent = entries.length + ' / ' + GLOSSAR_SORTED.length;
}

libSearch.addEventListener('input', () => {
  const q = libSearch.value.trim().toLowerCase();
  if(!q){ renderLib(GLOSSAR_SORTED); return; }
  // Primaer: Abkuerzung matcht (Prefix zuerst, dann enthaelt). Fallback: Langform.
  const prefix = GLOSSAR_SORTED.filter(e => e.a.toLowerCase().startsWith(q));
  const contains = GLOSSAR_SORTED.filter(e => !e.a.toLowerCase().startsWith(q) && e.a.toLowerCase().includes(q));
  let hits = prefix.concat(contains);
  if(hits.length === 0){
    hits = GLOSSAR_SORTED.filter(e => e.f.toLowerCase().includes(q));
  }
  renderLib(hits);
});

renderLib(GLOSSAR_SORTED);

// ---- Footer: Kategorien-/Fragenzahl dynamisch ----
(function(){
  const cats = Object.keys(POOLS).length;
  const qs = Object.keys(POOLS).reduce((s,k)=>s+POOLS[k].q.length,0);
  const fc = document.getElementById('footCats');
  const fq = document.getElementById('footQs');
  if(fc) fc.textContent = cats;
  if(fq) fq.textContent = qs;
})();

// Beim Laden immer oben starten (ohne Animation), egal was der Browser cachen will.
window.scrollTo(0, 0);
window.addEventListener('load', () => { window.scrollTo(0, 0); });
// pageshow greift auch beim Wiederherstellen aus dem Back-Forward-Cache (mobil häufig).
window.addEventListener('pageshow', () => { window.scrollTo(0, 0); });
