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
      "t": "Zur Verschlüsselung der Verbindung",
      "ok": false
     },
     {
      "t": "Um die Bandbreite zu erhöhen",
      "ok": false
     },
     {
      "t": "Um die IP zu verschleiern",
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
      "t": "Quellport",
      "ok": false
     },
     {
      "t": "Ephemeral Port",
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
      "t": "Quell-IP:Quellport ↔ Ziel-IP:Zielport",
      "ok": true
     },
     {
      "t": "Nur Quell- und Ziel-IP",
      "ok": false
     },
     {
      "t": "Nur Quell- und Zielport",
      "ok": false
     },
     {
      "t": "MAC-Adresse und Port",
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
      "t": "Zur Fehlerkorrektur der Nutzdaten",
      "ok": false
     },
     {
      "t": "Zur Kompression der Daten",
      "ok": false
     },
     {
      "t": "Zur Vergabe der MAC-Adresse",
      "ok": false
     }
    ],
    "e": "Quell- und Zielport regeln, von welcher und zu welcher Anwendung die Daten fließen."
   },
   {
    "q": "Ein Client verbindet sich zu einem internen Mailserver-Webinterface auf Port 8443. Welchem Portbereich entspricht das?",
    "o": [
     {
      "t": "Registered Ports (1024–49151)",
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
      "t": "Reserved Ports",
      "ok": false
     }
    ],
    "e": "8443 liegt zwischen 1024 und 49151 — Registered-Bereich, häufig für alternative HTTPS-Interfaces genutzt."
   },
   {
    "q": "Ein Server lauscht auf Port 8080. In welchem Bereich liegt dieser Port?",
    "o": [
     {
      "t": "Registered Ports (1024–49151)",
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
      "t": "Reserviert",
      "ok": false
     }
    ],
    "e": "8080 liegt im Registered-Bereich — häufig als alternativer HTTP-Port genutzt."
   },
   {
    "q": "Welcher Port wird für einen ausgehenden HTTPS-Request typischerweise als Quellport genutzt?",
    "o": [
     {
      "t": "Ein zufälliger Port aus dem Dynamic-Bereich (49152–65535)",
      "ok": true
     },
     {
      "t": "Immer Port 443",
      "ok": false
     },
     {
      "t": "Immer Port 80",
      "ok": false
     },
     {
      "t": "Port 22",
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
      "t": "Die MAC-Adresse",
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
    "q": "Was ist ein Socket?",
    "o": [
     {
      "t": "Kombination aus IP-Adresse und Portnummer",
      "ok": true
     },
     {
      "t": "Nur die IP-Adresse",
      "ok": false
     },
     {
      "t": "Nur die Portnummer",
      "ok": false
     },
     {
      "t": "Ein physischer Netzwerkanschluss",
      "ok": false
     }
    ],
    "e": "Ein Socket ist der eindeutige Verbindungsendpunkt: IP + Port."
   },
   {
    "q": "Wie nennt man Ports, die vom Betriebssystem temporär für ausgehende Verbindungen vergeben werden?",
    "o": [
     {
      "t": "Ephemeral Ports / Dynamic Ports",
      "ok": true
     },
     {
      "t": "Well-Known Ports",
      "ok": false
     },
     {
      "t": "Registered Ports",
      "ok": false
     },
     {
      "t": "Reserved Ports",
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
      "t": "Verschlüsselter Webserver (HTTPS)",
      "ok": true
     },
     {
      "t": "E-Mail-Versand",
      "ok": false
     },
     {
      "t": "Datenbankzugriff",
      "ok": false
     },
     {
      "t": "Netzwerküberwachung",
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
      "t": "Über verschiedene Zielports",
      "ok": false
     },
     {
      "t": "Über die MAC-Adressen",
      "ok": false
     },
     {
      "t": "Gar nicht — das ist nicht möglich",
      "ok": false
     }
    ],
    "e": "Der Zielport ist bei allen 443. Eindeutig wird jede Verbindung erst durch das komplette Socket-Paar: Quell-IP:Quellport ↔ Ziel-IP:Zielport."
   },
   {
    "q": "Was ist der maximale Wert einer Portnummer?",
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
      "t": "32767",
      "ok": false
     }
    ],
    "e": "16-Bit-Feld: 2^16 = 65536 Werte, Bereich 0–65535."
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
    "q": "Über welchen Port läuft DNS?",
    "o": [
     {
      "t": "53",
      "ok": true
     },
     {
      "t": "52",
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
    "e": "DNS = Port 53 (UDP, bei Zonentransfer TCP)."
   },
   {
    "q": "Welche Ports nutzt DHCP?",
    "o": [
     {
      "t": "67 (Server) / 68 (Client)",
      "ok": true
     },
     {
      "t": "53 / 54",
      "ok": false
     },
     {
      "t": "80 / 443",
      "ok": false
     },
     {
      "t": "20 / 21",
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
      "t": "POP3 lädt herunter/löscht, IMAP lässt Mails auf dem Server",
      "ok": true
     },
     {
      "t": "POP3 ist immer verschlüsselt",
      "ok": false
     },
     {
      "t": "IMAP nutzt UDP",
      "ok": false
     },
     {
      "t": "POP3 ist neuer als IMAP",
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
      "t": "22 / 23",
      "ok": false
     },
     {
      "t": "80 / 443",
      "ok": false
     },
     {
      "t": "67 / 68",
      "ok": false
     }
    ],
    "e": "FTP: 20 überträgt Dateien, 21 die Steuerbefehle."
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
      "t": "POP3S",
      "ok": false
     },
     {
      "t": "SMTPS",
      "ok": false
     },
     {
      "t": "HTTPS",
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
      "t": "LDAP-Authentifizierung",
      "ok": false
     },
     {
      "t": "Mailversand",
      "ok": false
     },
     {
      "t": "DNS-Anfragen",
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
      "t": "25 für Server-to-Server, 587 für Client-to-Server mit Authentifizierung",
      "ok": true
     },
     {
      "t": "Beide sind identisch",
      "ok": false
     },
     {
      "t": "587 ist unverschlüsselt, 25 nicht",
      "ok": false
     },
     {
      "t": "25 für Empfang, 587 für Versand",
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
      "t": "SMB (Server Message Block / Windows-Dateifreigabe)",
      "ok": true
     },
     {
      "t": "LDAP",
      "ok": false
     },
     {
      "t": "RDP",
      "ok": false
     },
     {
      "t": "FTP",
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
    "q": "Welcher Dienst nutzt Port 67 und 68?",
    "o": [
     {
      "t": "DHCP (Server 67, Client 68)",
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
      "t": "POP3 lädt herunter und löscht, IMAP synchronisiert und lässt Mails am Server",
      "ok": true
     },
     {
      "t": "POP3 ist verschlüsselt, IMAP nicht",
      "ok": false
     },
     {
      "t": "IMAP nutzt UDP",
      "ok": false
     },
     {
      "t": "POP3 ist neuer",
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
     {
      "t": "Mehrere Signale werden zu einem kombiniert und über ein Medium übertragen",
      "ok": true
     },
     {
      "t": "Ein Signal wird verschlüsselt",
      "ok": false
     },
     {
      "t": "Ein Paket wird verworfen",
      "ok": false
     },
     {
      "t": "Eine IP wird vergeben",
      "ok": false
     }
    ],
    "e": "Multiplexing bündelt mehrere Datenströme über ein gemeinsames Medium."
   },
   {
    "q": "Welches Bauteil bündelt die Signale?",
    "o": [
     {
      "t": "Multiplexer (MUX)",
      "ok": true
     },
     {
      "t": "Demultiplexer",
      "ok": false
     },
     {
      "t": "Router",
      "ok": false
     },
     {
      "t": "Switch",
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
      "t": "Multiplexer",
      "ok": false
     },
     {
      "t": "Repeater",
      "ok": false
     },
     {
      "t": "Terminator",
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
     {
      "t": "Effiziente Nutzung der Bandbreite, Kostenreduktion",
      "ok": true
     },
     {
      "t": "Verschlüsselung",
      "ok": false
     },
     {
      "t": "IP-Vergabe",
      "ok": false
     },
     {
      "t": "Fehlerkorrektur",
      "ok": false
     }
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
      "t": "Zeitmultiplex",
      "ok": false
     },
     {
      "t": "Codemultiplex",
      "ok": false
     },
     {
      "t": "Raummultiplex",
      "ok": false
     }
    ],
    "e": "WDM ist das FDM-Prinzip auf Basis verschiedener Lichtwellenlängen."
   },
   {
    "q": "Wozu dient der zufällige Quellport?",
    "o": [
     {
      "t": "Antwortpakete der richtigen App/dem richtigen Tab zuordnen",
      "ok": true
     },
     {
      "t": "Die Daten zu verschlüsseln",
      "ok": false
     },
     {
      "t": "Die Ziel-IP zu ersetzen",
      "ok": false
     },
     {
      "t": "Die TTL zu setzen",
      "ok": false
     }
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
      "t": "Von Port 443 an einen Zufallsport",
      "ok": false
     },
     {
      "t": "Von Port 80 an Port 80",
      "ok": false
     },
     {
      "t": "Ohne Ports, nur über IP",
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
     {
      "t": "Mehrere Anwendungen teilen sich über Ports eine Netzverbindung",
      "ok": true
     },
     {
      "t": "Mehrere Kabel werden zusammengeführt",
      "ok": false
     },
     {
      "t": "IP-Adressen werden gebündelt",
      "ok": false
     },
     {
      "t": "Frames werden verschlüsselt",
      "ok": false
     }
    ],
    "e": "Ports erlauben, dass viele Anwendungen dieselbe Leitung parallel nutzen."
   },
   {
    "q": "Welche Rolle spielt der Demultiplexer beim Empfang?",
    "o": [
     {
      "t": "Er ordnet ankommende Daten der richtigen Anwendung/Port zu",
      "ok": true
     },
     {
      "t": "Er verschlüsselt die Daten",
      "ok": false
     },
     {
      "t": "Er erhöht die TTL",
      "ok": false
     },
     {
      "t": "Er vergibt IP-Adressen",
      "ok": false
     }
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
     {
      "t": "Der Zielport identifiziert den Dienst, der Quellport die Client-Instanz",
      "ok": true
     },
     {
      "t": "Beide sind immer identisch",
      "ok": false
     },
     {
      "t": "Der Quellport ist immer 443",
      "ok": false
     },
     {
      "t": "Der Zielport wird zufällig gewählt",
      "ok": false
     }
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
    "q": "Wofür steht IP?",
    "o": [
     {
      "t": "Internet Protocol",
      "ok": true
     },
     {
      "t": "Internal Protocol",
      "ok": false
     },
     {
      "t": "Interface Protocol",
      "ok": false
     },
     {
      "t": "Integrated Packet",
      "ok": false
     }
    ],
    "e": "IP = Internet Protocol (Adressierung/Routing)."
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
    "q": "Welcher Dienst nutzt typischerweise UDP?",
    "o": [
     {
      "t": "VoIP / Videostreaming",
      "ok": true
     },
     {
      "t": "Datei-Download per HTTPS",
      "ok": false
     },
     {
      "t": "E-Mail-Versand per SMTP",
      "ok": false
     },
     {
      "t": "SSH-Fernzugriff",
      "ok": false
     }
    ],
    "e": "Echtzeit bevorzugt UDP: Tempo vor Vollständigkeit."
   },
   {
    "q": "Was macht TCP mit einem fehlenden Paket?",
    "o": [
     {
      "t": "Es fordert das Paket erneut an (Retransmission)",
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
    "e": "TCP erkennt fehlende Bestätigungen und sendet erneut."
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
      "t": "Es nutzt größere Pakete",
      "ok": false
     },
     {
      "t": "Es ist immer kabelgebunden",
      "ok": false
     },
     {
      "t": "Es komprimiert alle Daten",
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
      "t": "Live-Gaming",
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
     {
      "t": "Sie regelt die Datenübertragung unabhängig von Hardware/Software",
      "ok": true
     },
     {
      "t": "Sie funktioniert nur mit Windows",
      "ok": false
     },
     {
      "t": "Sie ersetzt die IP-Adresse",
      "ok": false
     },
     {
      "t": "Sie ist ausschließlich verbindungslos",
      "ok": false
     }
    ],
    "e": "TCP/IP ist herstellerunabhängig und die Basis des Internets."
   },
   {
    "q": "Wie wird bei TCP eine Verbindung sauber beendet?",
    "o": [
     {
      "t": "Über FIN/ACK-Sequenz (Verbindungsabbau)",
      "ok": true
     },
     {
      "t": "Durch Ziehen des Netzsteckers",
      "ok": false
     },
     {
      "t": "Automatisch nach 60 Sekunden",
      "ok": false
     },
     {
      "t": "Durch einen Broadcast",
      "ok": false
     }
    ],
    "e": "Der geordnete Abbau nutzt FIN/ACK (four-way teardown)."
   },
   {
    "q": "Welches Protokoll prüft mit einer Prüfsumme auf Übertragungsfehler?",
    "o": [
     {
      "t": "Sowohl TCP als auch UDP nutzen eine Checksum",
      "ok": true
     },
     {
      "t": "Nur IP",
      "ok": false
     },
     {
      "t": "Nur ARP",
      "ok": false
     },
     {
      "t": "Kein Transportprotokoll",
      "ok": false
     }
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
     {
      "t": "Erneutes Senden verspäteter Pakete stört den Echtzeitfluss",
      "ok": true
     },
     {
      "t": "TCP kann keine Bilder übertragen",
      "ok": false
     },
     {
      "t": "TCP ist verbindungslos",
      "ok": false
     },
     {
      "t": "TCP nutzt keine Ports",
      "ok": false
     }
    ],
    "e": "Retransmissions erzeugen Verzögerung; bei Echtzeit ist UDP besser."
   },
   {
    "q": "Was ist die Aufgabe der Portnummern im Transportprotokoll?",
    "o": [
     {
      "t": "Zuordnung der Daten zur richtigen Anwendung",
      "ok": true
     },
     {
      "t": "Wegfindung zwischen Netzen",
      "ok": false
     },
     {
      "t": "Physische Adressierung",
      "ok": false
     },
     {
      "t": "Verschlüsselung",
      "ok": false
     }
    ],
    "e": "Ports adressieren die Anwendung; IP adressiert das Gerät/Netz."
   },
   {
    "q": "Welche Reihenfolge beschreibt die Kapselung beim Senden korrekt?",
    "o": [
     {
      "t": "Daten → Segment (TCP) → Paket (IP) → Frame",
      "ok": true
     },
     {
      "t": "Frame → Paket → Segment → Daten",
      "ok": false
     },
     {
      "t": "Paket → Frame → Segment → Daten",
      "ok": false
     },
     {
      "t": "Segment → Daten → Frame → Paket",
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
      "t": "Schnellerer Verbindungsaufbau (weniger Roundtrips)",
      "ok": true
     },
     {
      "t": "Es ist unverschlüsselt und daher schneller",
      "ok": false
     },
     {
      "t": "Es verzichtet auf Ports",
      "ok": false
     },
     {
      "t": "Es nutzt keine IP-Adressen",
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
      "t": "UDP ist bereits zuverlässig",
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
     {
      "t": "Ein verlorenes Paket blockiert nicht alle parallelen Datenströme",
      "ok": true
     },
     {
      "t": "Pakete werden nie mehr verloren",
      "ok": false
     },
     {
      "t": "Es gibt keine Reihenfolge mehr",
      "ok": false
     },
     {
      "t": "Der Header entfällt komplett",
      "ok": false
     }
    ],
    "e": "QUIC trennt Streams, sodass ein Verlust in einem Stream die anderen nicht aufhält."
   },
   {
    "q": "Was passiert, wenn ein TCP-Segment auf dem Weg verloren geht?",
    "o": [
     {
      "t": "Der Sender erhält keine Bestätigung (ACK) und sendet das Segment nach Timeout erneut",
      "ok": true
     },
     {
      "t": "Es wird stillschweigend ignoriert",
      "ok": false
     },
     {
      "t": "Die Verbindung bricht sofort ab",
      "ok": false
     },
     {
      "t": "UDP übernimmt automatisch",
      "ok": false
     }
    ],
    "e": "Bleibt das ACK aus, erkennt der Sender per Timeout den Verlust und wiederholt die Übertragung (Retransmission)."
   },
   {
    "q": "Welche TCP-Eigenschaft verhindert, dass der Sender den Empfänger überflutet?",
    "o": [
     {
      "t": "Flusskontrolle (Flow Control) per Fenstergröße",
      "ok": true
     },
     {
      "t": "Checksumme",
      "ok": false
     },
     {
      "t": "TTL",
      "ok": false
     },
     {
      "t": "Die Sequenznummer",
      "ok": false
     }
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
     {
      "t": "TCP-Segment enthält Sequenznummern und Bestätigungsfelder, UDP-Datagramm nicht",
      "ok": true
     },
     {
      "t": "UDP-Datagramm ist immer größer",
      "ok": false
     },
     {
      "t": "TCP-Segment hat keine Portnummern",
      "ok": false
     },
     {
      "t": "Beide sind identisch",
      "ok": false
     }
    ],
    "e": "TCP-Segmente tragen Sequenz- und ACK-Nummern für Zuverlässigkeit; UDP ist schlanker."
   },
   {
    "q": "Was überprüft die Checksumme in TCP und UDP?",
    "o": [
     {
      "t": "Ob die Daten auf dem Übertragungsweg beschädigt wurden",
      "ok": true
     },
     {
      "t": "Ob die IP-Adresse korrekt ist",
      "ok": false
     },
     {
      "t": "Die TTL",
      "ok": false
     },
     {
      "t": "Die Portnummer",
      "ok": false
     }
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
    "q": "Was initiiert beim TCP-Verbindungsabbau den Trennungswunsch?",
    "o": [
     {
      "t": "Ein FIN-Segment vom Client oder Server",
      "ok": true
     },
     {
      "t": "Ein SYN-Segment",
      "ok": false
     },
     {
      "t": "Ein ACK-Segment",
      "ok": false
     },
     {
      "t": "Ein RST-Segment",
      "ok": false
     }
    ],
    "e": "Der geordnete Abbau beginnt mit FIN; RST hingegen bricht eine Verbindung sofort ab."
   },
   {
    "q": "Warum eignet sich TCP schlecht für Live-Video-Calls bei instabiler Verbindung?",
    "o": [
     {
      "t": "Erneutes Senden verlorener Pakete verzögert den gesamten Datenstrom (Head-of-Line-Blocking)",
      "ok": true
     },
     {
      "t": "TCP kann keine Videodaten übertragen",
      "ok": false
     },
     {
      "t": "TCP verschlüsselt automatisch, was Latenz erzeugt",
      "ok": false
     },
     {
      "t": "TCP hat keine Ports für Video",
      "ok": false
     }
    ],
    "e": "Ein verlorenes Paket blockiert bei TCP die Zustellung nachfolgender Daten, bis es erneut angekommen ist — bei Echtzeit spürbar störend."
   },
   {
    "q": "Wann ist UDP die bessere Wahl gegenüber TCP?",
    "o": [
     {
      "t": "Wenn geringe Latenz wichtiger ist als garantierte Zustellung",
      "ok": true
     },
     {
      "t": "Wenn jedes Paket ankommen muss",
      "ok": false
     },
     {
      "t": "Beim Datei-Download",
      "ok": false
     },
     {
      "t": "Bei verschlüsselten Verbindungen",
      "ok": false
     }
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
      "t": "Checksum (Prüfsumme)",
      "ok": true
     },
     {
      "t": "TTL",
      "ok": false
     },
     {
      "t": "Sequence Number",
      "ok": false
     },
     {
      "t": "Portnummer",
      "ok": false
     }
    ],
    "e": "Die Checksum prüft, ob Daten beim Transport beschädigt wurden."
   },
   {
    "q": "Welchen Startwert hat eine TTL häufig?",
    "o": [
     {
      "t": "64 (oder 128)",
      "ok": true
     },
     {
      "t": "1",
      "ok": false
     },
     {
      "t": "1024",
      "ok": false
     },
     {
      "t": "65535",
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
    "e": "Der erste Router setzt TTL auf 0, verwirft und identifiziert sich so als Hop 1."
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
      "t": "traceroute / tracert",
      "ok": true
     },
     {
      "t": "ping",
      "ok": false
     },
     {
      "t": "nslookup",
      "ok": false
     },
     {
      "t": "ipconfig",
      "ok": false
     }
    ],
    "e": "Traceroute listet jeden Hop; ping prüft nur Erreichbarkeit."
   },
   {
    "q": "Was enthält der IP-Header zwingend?",
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
      "t": "MAC-Adressen",
      "ok": false
     },
     {
      "t": "Portnummern",
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
      "t": "Welches Transportprotokoll die Payload enthält (z. B. 6=TCP, 17=UDP)",
      "ok": true
     },
     {
      "t": "Die Versionsnummer von IP",
      "ok": false
     },
     {
      "t": "Die TTL",
      "ok": false
     },
     {
      "t": "Die Länge des Headers",
      "ok": false
     }
    ],
    "e": "Das Protokollfeld sagt dem Empfänger, wie er die Payload zu interpretieren hat (TCP=6, UDP=17, ICMP=1)."
   },
   {
    "q": "Was ist die Funktion der Sequence Number im TCP-Header?",
    "o": [
     {
      "t": "Nummeriert die Bytes zur korrekten Reihenfolge beim Empfänger",
      "ok": true
     },
     {
      "t": "Zählt die Hops",
      "ok": false
     },
     {
      "t": "Identifiziert den Port",
      "ok": false
     },
     {
      "t": "Prüft auf Fehler",
      "ok": false
     }
    ],
    "e": "Die Sequenznummer ermöglicht die Wiederzusammensetzung in richtiger Reihenfolge."
   },
   {
    "q": "Was ist die Acknowledgement Number im TCP-Header?",
    "o": [
     {
      "t": "Das nächste erwartete Byte vom Sender",
      "ok": true
     },
     {
      "t": "Die Sequenznummer des eigenen Pakets",
      "ok": false
     },
     {
      "t": "Die Portnummer",
      "ok": false
     },
     {
      "t": "Die TTL",
      "ok": false
     }
    ],
    "e": "Die ACK-Nummer bestätigt empfangene Daten und fordert das nächste Byte an."
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
    "q": "Warum hat ein Paket, das 12 Router passiert hat, eine TTL von mindestens 1 am Ziel?",
    "o": [
     {
      "t": "Weil jeder Router 1 abzieht und bei 0 verwirft, muss der Startwert > 12 sein",
      "ok": true
     },
     {
      "t": "Weil TTL bei jedem Router erhöht wird",
      "ok": false
     },
     {
      "t": "Weil der Zielrechner die TTL setzt",
      "ok": false
     },
     {
      "t": "TTL spielt keine Rolle",
      "ok": false
     }
    ],
    "e": "Mit Startwert 13 überlebt das Paket 12 Router (jeder −1) und kommt mit TTL=1 an."
   },
   {
    "q": "Was zeigt traceroute durch schrittweise TTL-Erhöhung?",
    "o": [
     {
      "t": "Die Route mit allen Zwischen-Routern und deren Antwortzeiten",
      "ok": true
     },
     {
      "t": "Die Bandbreite auf dem Weg",
      "ok": false
     },
     {
      "t": "Die MAC-Adressen aller Hops",
      "ok": false
     },
     {
      "t": "Nur den letzten Router",
      "ok": false
     }
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
      "t": "traceroute",
      "ok": false
     },
     {
      "t": "nslookup",
      "ok": false
     },
     {
      "t": "netstat",
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
      "t": "IP-Adressierung und Routing",
      "ok": false
     },
     {
      "t": "Verschlüsselung",
      "ok": false
     },
     {
      "t": "Sitzungsaufbau",
      "ok": false
     }
    ],
    "e": "Layer 1 überträgt Bits physisch; Geräte: Hub, Repeater, Kabel."
   },
   {
    "q": "Was läuft auf Schicht 2 (Sicherungsschicht / Data Link)?",
    "o": [
     {
      "t": "MAC-Adressierung, Frames, Fehlererkennung im lokalen Netz",
      "ok": true
     },
     {
      "t": "Routing zwischen Netzen",
      "ok": false
     },
     {
      "t": "Portzuordnung",
      "ok": false
     },
     {
      "t": "Datenkompression",
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
      "t": "Physische Bitübertragung",
      "ok": false
     },
     {
      "t": "MAC-Adressierung",
      "ok": false
     },
     {
      "t": "Verschlüsselung der Darstellung",
      "ok": false
     }
    ],
    "e": "Layer 3 = IP-Adressen und Routing; Gerät: Router."
   },
   {
    "q": "Was läuft auf Schicht 4 (Transportschicht / Transport)?",
    "o": [
     {
      "t": "Ende-zu-Ende, Ports, TCP/UDP, Segmentierung",
      "ok": true
     },
     {
      "t": "Bitübertragung",
      "ok": false
     },
     {
      "t": "Sitzungssteuerung",
      "ok": false
     },
     {
      "t": "MAC-Adressen",
      "ok": false
     }
    ],
    "e": "Layer 4 = TCP/UDP, Ports, Segmente, Flusskontrolle."
   },
   {
    "q": "Was läuft auf Schicht 5 (Sitzungsschicht / Session)?",
    "o": [
     {
      "t": "Auf-/Abbau und Steuerung von Sitzungen/Dialogen",
      "ok": true
     },
     {
      "t": "Routing",
      "ok": false
     },
     {
      "t": "Bitübertragung",
      "ok": false
     },
     {
      "t": "MAC-Adressierung",
      "ok": false
     }
    ],
    "e": "Layer 5 verwaltet Sitzungen (Aufbau, Synchronisation, Abbau)."
   },
   {
    "q": "Was läuft auf Schicht 6 (Darstellungsschicht / Presentation)?",
    "o": [
     {
      "t": "Datenformat, Codierung, Verschlüsselung, Kompression",
      "ok": true
     },
     {
      "t": "Routing",
      "ok": false
     },
     {
      "t": "Portzuordnung",
      "ok": false
     },
     {
      "t": "Bitübertragung",
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
      "t": "MAC-Adressierung",
      "ok": false
     },
     {
      "t": "Physische Übertragung",
      "ok": false
     },
     {
      "t": "Segmentierung",
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
      "t": "Schicht 1",
      "ok": false
     },
     {
      "t": "Schicht 2",
      "ok": false
     },
     {
      "t": "Schicht 4",
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
      "t": "Schicht 1",
      "ok": false
     },
     {
      "t": "Schicht 3",
      "ok": false
     },
     {
      "t": "Schicht 7",
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
      "t": "Schicht 2",
      "ok": false
     },
     {
      "t": "Schicht 3",
      "ok": false
     },
     {
      "t": "Schicht 4",
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
      "t": "Schicht 2",
      "ok": false
     },
     {
      "t": "Schicht 3",
      "ok": false
     },
     {
      "t": "Schicht 7",
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
      "t": "Schicht 3",
      "ok": true
     },
     {
      "t": "Schicht 2",
      "ok": false
     },
     {
      "t": "Schicht 4",
      "ok": false
     },
     {
      "t": "Schicht 1",
      "ok": false
     }
    ],
    "e": "IP ist ein Vermittlungsschicht-Protokoll (Layer 3)."
   },
   {
    "q": "Auf welcher Schicht liegen TCP und UDP?",
    "o": [
     {
      "t": "Schicht 4",
      "ok": true
     },
     {
      "t": "Schicht 3",
      "ok": false
     },
     {
      "t": "Schicht 5",
      "ok": false
     },
     {
      "t": "Schicht 7",
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
      "t": "Schicht 4",
      "ok": false
     },
     {
      "t": "Schicht 3",
      "ok": false
     },
     {
      "t": "Schicht 1",
      "ok": false
     }
    ],
    "e": "HTTP ist ein Anwendungsschicht-Protokoll."
   },
   {
    "q": "Womit adressiert Schicht 2, womit Schicht 3?",
    "o": [
     {
      "t": "L2 mit MAC-Adressen, L3 mit IP-Adressen",
      "ok": true
     },
     {
      "t": "L2 mit IP, L3 mit MAC",
      "ok": false
     },
     {
      "t": "Beide mit Ports",
      "ok": false
     },
     {
      "t": "Beide mit MAC",
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
      "t": "Schicht 2",
      "ok": false
     },
     {
      "t": "Schicht 4",
      "ok": false
     },
     {
      "t": "Schicht 1",
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
      "t": "Schicht 3",
      "ok": false
     },
     {
      "t": "Schicht 7",
      "ok": false
     },
     {
      "t": "Schicht 1",
      "ok": false
     }
    ],
    "e": "Die Sitzungsschicht steuert Auf-/Abbau und Synchronisation von Dialogen."
   },
   {
    "q": "Was gehört zur Transportschicht?",
    "o": [
     {
      "t": "Segmentierung, Flusskontrolle, Ports",
      "ok": true
     },
     {
      "t": "Routing zwischen Netzen",
      "ok": false
     },
     {
      "t": "MAC-Adressierung",
      "ok": false
     },
     {
      "t": "Bitcodierung",
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
      "t": "Schicht 4",
      "ok": false
     },
     {
      "t": "Schicht 3",
      "ok": false
     },
     {
      "t": "Schicht 5",
      "ok": false
     }
    ],
    "e": "DNS ist ein Anwendungsprotokoll (Layer 7)."
   },
   {
    "q": "In welche Richtung durchläuft ein gesendetes Datenpaket die Schichten?",
    "o": [
     {
      "t": "Von Schicht 7 nach Schicht 1 (Kapselung)",
      "ok": true
     },
     {
      "t": "Von Schicht 1 nach 7",
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
      "t": "Schicht 2",
      "ok": true
     },
     {
      "t": "Schicht 3",
      "ok": false
     },
     {
      "t": "Schicht 4",
      "ok": false
     },
     {
      "t": "Schicht 1",
      "ok": false
     }
    ],
    "e": "MAC-Adressen und Frames gehören zur Sicherungsschicht (L2)."
   },
   {
    "q": "Welche Aussage über einen Layer-3-Switch ist korrekt?",
    "o": [
     {
      "t": "Er kann zusätzlich zur MAC- auch IP-basiert weiterleiten (Routing)",
      "ok": true
     },
     {
      "t": "Er arbeitet nur auf Schicht 1",
      "ok": false
     },
     {
      "t": "Er kann keine VLANs",
      "ok": false
     },
     {
      "t": "Er ersetzt die Bitübertragung",
      "ok": false
     }
    ],
    "e": "Ein Layer-3-Switch kombiniert Switching (L2) mit Routing-Funktionen (L3)."
   },
   {
    "q": "Auf welcher OSI-Schicht arbeitet ARP?",
    "o": [
     {
      "t": "Schicht 2 (Sicherung) mit Übergang zu Schicht 3",
      "ok": true
     },
     {
      "t": "Nur Schicht 3",
      "ok": false
     },
     {
      "t": "Schicht 4",
      "ok": false
     },
     {
      "t": "Schicht 1",
      "ok": false
     }
    ],
    "e": "ARP löst IP-Adressen (L3) in MAC-Adressen (L2) auf — es arbeitet an der L2/L3-Grenze."
   },
   {
    "q": "Was versteht man unter Kapselung beim Sendeprozess?",
    "o": [
     {
      "t": "Jede Schicht fügt der Dateneinheit einen Header (und ggf. Trailer) hinzu",
      "ok": true
     },
     {
      "t": "Daten werden verschlüsselt",
      "ok": false
     },
     {
      "t": "Pakete werden komprimiert",
      "ok": false
     },
     {
      "t": "Der Header wird entfernt",
      "ok": false
     }
    ],
    "e": "Beim Senden kapselt jede Schicht die Daten der oberen Schicht: L4 → Segment, L3 → Paket, L2 → Frame."
   },
   {
    "q": "Was passiert beim Empfänger mit den OSI-Schichten?",
    "o": [
     {
      "t": "Entkapselung: jede Schicht liest und entfernt den eigenen Header",
      "ok": true
     },
     {
      "t": "Kapselung wie beim Sender",
      "ok": false
     },
     {
      "t": "Alle Header werden auf einmal entfernt",
      "ok": false
     },
     {
      "t": "Nichts — die Schichten sind egal",
      "ok": false
     }
    ],
    "e": "Beim Empfangen wird die Kapselung umgekehrt: L1 bis L7 nehmen je ihren Header heraus."
   },
   {
    "q": "Welches Gerät arbeitet auf allen sieben Schichten?",
    "o": [
     {
      "t": "Gateway / Application-Layer-Firewall",
      "ok": true
     },
     {
      "t": "Switch",
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
      "t": "Schicht 6 (Darstellung) / zwischen L4 und L7",
      "ok": true
     },
     {
      "t": "Schicht 1",
      "ok": false
     },
     {
      "t": "Schicht 2",
      "ok": false
     },
     {
      "t": "Schicht 3",
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
     {
      "t": "Auf- und Abbau sowie Synchronisation von Kommunikationssitzungen",
      "ok": true
     },
     {
      "t": "Routing zwischen Netzen",
      "ok": false
     },
     {
      "t": "Bitübertragung",
      "ok": false
     },
     {
      "t": "Portzuordnung",
      "ok": false
     }
    ],
    "e": "L5 verwaltet Sitzungen: Aufbau, Aufrechterhaltung, geordneter Abbau."
   },
   {
    "q": "Welches Protokoll arbeitet auf Schicht 3 und ermöglicht das Internet?",
    "o": [
     {
      "t": "IP (Internet Protocol)",
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
      "t": "Kollisionsdomäne betrifft L1/L2-Signalüberlagerungen, Broadcastdomäne L2/L3-Broadcast-Reichweite",
      "ok": true
     },
     {
      "t": "Beide sind identisch",
      "ok": false
     },
     {
      "t": "Broadcastdomäne ist kleiner",
      "ok": false
     },
     {
      "t": "Kollisionsdomänen gibt es nur bei Glasfaser",
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
      "t": "Von Schicht 1 nach 7 (Entkapselung von unten nach oben)",
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
      "t": "Es hat 7 Schichten wie OSI",
      "ok": false
     },
     {
      "t": "Es kennt keine Transportschicht",
      "ok": false
     },
     {
      "t": "OSI und TCP/IP sind identisch",
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
      "t": "Nur einen Raum",
      "ok": false
     },
     {
      "t": "Ein ganzes Land",
      "ok": false
     },
     {
      "t": "Weltweit",
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
      "t": "Wenige Meter",
      "ok": false
     },
     {
      "t": "Weltweit",
      "ok": false
     },
     {
      "t": "Nur ein Gebäude",
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
      "t": "Broadband Area Node",
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
     {
      "t": "Smartwatch/Fitnesstracker/Medizinsensoren am Körper",
      "ok": true
     },
     {
      "t": "Ein Rechenzentrum",
      "ok": false
     },
     {
      "t": "Ein Stadtnetz",
      "ok": false
     },
     {
      "t": "Ein Satellitennetz",
      "ok": false
     }
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
      "t": "CAN (Campus)",
      "ok": true
     },
     {
      "t": "PAN",
      "ok": false
     },
     {
      "t": "BAN",
      "ok": false
     },
     {
      "t": "GAN",
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
     {
      "t": "MPLS, Glasfaser-Weitverkehr, Leased Lines, VPN",
      "ok": true
     },
     {
      "t": "Bluetooth",
      "ok": false
     },
     {
      "t": "NFC",
      "ok": false
     },
     {
      "t": "USB",
      "ok": false
     }
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
    "e": "Ethernet nutzt CSMA/CD (Collision Detection)."
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
     {
      "t": "Senden stoppen, zufällige Wartezeit, erneut versuchen",
      "ok": true
     },
     {
      "t": "Kollision ignorieren",
      "ok": false
     },
     {
      "t": "Das Paket verschlüsseln",
      "ok": false
     },
     {
      "t": "Die MAC-Adresse ändern",
      "ok": false
     }
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
    "e": "Beim Token Passing sendet nur der Token-Inhaber → keine Kollisionen."
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
     {
      "t": "Ziel-MAC, Quell-MAC, Nutzdaten und Prüfsumme (FCS)",
      "ok": true
     },
     {
      "t": "Nur die IP-Adressen",
      "ok": false
     },
     {
      "t": "Nur Portnummern",
      "ok": false
     },
     {
      "t": "Ausschließlich Nutzdaten",
      "ok": false
     }
    ],
    "e": "Ein Frame trägt Ziel-/Quell-MAC, Typ/Länge, Nutzdaten und eine Prüfsumme (FCS/CRC)."
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
      "t": "Ein einzelnes VLAN",
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
      "t": "Ein Hub",
      "ok": false
     },
     {
      "t": "Ein Repeater",
      "ok": false
     },
     {
      "t": "Ein einzelnes Kabel",
      "ok": false
     }
    ],
    "e": "Broadcasts werden von Routern nicht weitergeleitet — sie begrenzen die Broadcastdomäne."
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
    "e": "Gigabit Ethernet = 1 Gbit/s (1000BASE-T)."
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
     {
      "t": "Vollduplex-Switch-Verbindungen erzeugen keine Kollisionen mehr",
      "ok": true
     },
     {
      "t": "CSMA/CD wurde verboten",
      "ok": false
     },
     {
      "t": "Alle Netze nutzen Token Passing",
      "ok": false
     },
     {
      "t": "Ethernet ist verschwunden",
      "ok": false
     }
    ],
    "e": "Dedizierte Vollduplex-Links am Switch machen die Kollisionserkennung überflüssig."
   },
   {
    "q": "Welches Feld im Ethernet-Frame dient der Fehlererkennung?",
    "o": [
     {
      "t": "FCS (Frame Check Sequence / CRC)",
      "ok": true
     },
     {
      "t": "TTL",
      "ok": false
     },
     {
      "t": "Portnummer",
      "ok": false
     },
     {
      "t": "Präambel",
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
      "t": "Verschlüsselung",
      "ok": false
     },
     {
      "t": "IP-Adressierung",
      "ok": false
     },
     {
      "t": "Routing-Entscheidung",
      "ok": false
     }
    ],
    "e": "Die Präambel dient der Bit-Synchronisation zu Beginn des Frames."
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
    "e": "100 Meter ist das Standard-Limit für Fast Ethernet und Gigabit Ethernet über Kupfer."
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
     {
      "t": "Unicast: an einen, Multicast: an eine Gruppe, Broadcast: an alle",
      "ok": true
     },
     {
      "t": "Alle senden an alle",
      "ok": false
     },
     {
      "t": "Unicast ist langsamer",
      "ok": false
     },
     {
      "t": "Multicast ist unverschlüsselt",
      "ok": false
     }
    ],
    "e": "Unicast = 1:1, Multicast = 1:n (definierte Gruppe), Broadcast = 1:alle."
   },
   {
    "q": "Welche Felder enthält ein Ethernet-Frame mindestens?",
    "o": [
     {
      "t": "Präambel, Ziel-MAC, Quell-MAC, Typ/Länge, Daten, FCS",
      "ok": true
     },
     {
      "t": "Nur IP-Adressen",
      "ok": false
     },
     {
      "t": "Portnummern und TTL",
      "ok": false
     },
     {
      "t": "Nur Nutzlast",
      "ok": false
     }
    ],
    "e": "Der Ethernet-Frame-Aufbau: Präambel | Ziel-MAC | Quell-MAC | Typ/Länge | Daten | FCS."
   },
   {
    "q": "Was macht ein Switch mit einem Frame, dessen Quell-MAC er noch nicht kennt?",
    "o": [
     {
      "t": "Er trägt sie in die MAC-Tabelle ein (lernen)",
      "ok": true
     },
     {
      "t": "Er verwirft den Frame",
      "ok": false
     },
     {
      "t": "Er sendet eine Fehlermeldung",
      "ok": false
     },
     {
      "t": "Er routet ihn weiter",
      "ok": false
     }
    ],
    "e": "Der Switch lernt passiv: jeder eingehende Frame aktualisiert die MAC-Tabelle mit Quell-MAC und Eingangsport."
   },
   {
    "q": "Was ist Auto-Negotiation bei Ethernet?",
    "o": [
     {
      "t": "Automatische Aushandlung von Geschwindigkeit und Duplex zwischen zwei Ports",
      "ok": true
     },
     {
      "t": "Automatische IP-Vergabe",
      "ok": false
     },
     {
      "t": "Automatische VLAN-Konfiguration",
      "ok": false
     },
     {
      "t": "Automatisches Patchen",
      "ok": false
     }
    ],
    "e": "Auto-Negotiation einigt sich auf die höchste gemeinsam unterstützte Geschwindigkeit und Duplex-Modus."
   },
   {
    "q": "Was ist ein Uplink-Port an einem Switch?",
    "o": [
     {
      "t": "Ein Port, der den Switch mit einem übergeordneten Gerät (Router, Core-Switch) verbindet",
      "ok": true
     },
     {
      "t": "Ein Port nur für Server",
      "ok": false
     },
     {
      "t": "Ein defekter Port",
      "ok": false
     },
     {
      "t": "Ein verschlüsselter Port",
      "ok": false
     }
    ],
    "e": "Uplinks verbinden Switches mit der nächsten Hierarchieebene — oft mit höherer Bandbreite."
   },
   {
    "q": "Was ist PoE und welchen Vorteil bietet es?",
    "o": [
     {
      "t": "Power over Ethernet: Strom über das Netzwerkkabel — kein separates Netzteil nötig",
      "ok": true
     },
     {
      "t": "Ein Sicherheitsprotokoll",
      "ok": false
     },
     {
      "t": "Ein Verschlüsselungsverfahren",
      "ok": false
     },
     {
      "t": "Ein WLAN-Standard",
      "ok": false
     }
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
    "e": "10G über 55m: Cat 6 reicht. Für 100m: Cat 6A. Cat 5e ist für 1G ausgelegt."
   },
   {
    "q": "Was ist ein VLAN-Tag nach IEEE 802.1Q?",
    "o": [
     {
      "t": "Ein 4-Byte-Feld im Ethernet-Frame mit VLAN-ID und Priorität",
      "ok": true
     },
     {
      "t": "Ein IP-Header-Feld",
      "ok": false
     },
     {
      "t": "Ein DNS-Eintrag",
      "ok": false
     },
     {
      "t": "Eine Portbezeichnung",
      "ok": false
     }
    ],
    "e": "802.1Q fügt nach der Quell-MAC einen 4-Byte-Tag ein: TPID (0x8100) + TCI mit VLAN-ID (12 Bit = 4096 VLANs)."
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
      "t": "Twisted-Pair (verdrillte Adernpaare)",
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
      "t": "Unshielded Twisted Pair (ungeschirmt)",
      "ok": true
     },
     {
      "t": "Universal Twisted Pair",
      "ok": false
     },
     {
      "t": "Ultra Twisted Protocol",
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
     {
      "t": "Besserer Schutz vor elektromagnetischen Störungen durch Schirmung",
      "ok": true
     },
     {
      "t": "Geringeres Gewicht",
      "ok": false
     },
     {
      "t": "Niedrigerer Preis",
      "ok": false
     },
     {
      "t": "Höhere Reichweite bei Funk",
      "ok": false
     }
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
      "t": "UTP-Kupfer",
      "ok": false
     },
     {
      "t": "Koaxialkabel",
      "ok": false
     },
     {
      "t": "STP-Kupfer",
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
      "t": "Multimode ist immer schneller und weiter",
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
      "t": "Network Internet Controller",
      "ok": false
     },
     {
      "t": "Node Identification Code",
      "ok": false
     },
     {
      "t": "New Interface Connector",
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
      "t": "DNS",
      "ok": false
     },
     {
      "t": "DHCP",
      "ok": false
     },
     {
      "t": "ICMP",
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
      "t": "Immer günstiger",
      "ok": false
     },
     {
      "t": "Leichter zu spleißen/verlegen",
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
      "t": "RJ45-Buchse (Ethernet-Port)",
      "ok": true
     },
     {
      "t": "HDMI",
      "ok": false
     },
     {
      "t": "USB-A",
      "ok": false
     },
     {
      "t": "DisplayPort",
      "ok": false
     }
    ],
    "e": "Der Ethernet-Port ist eine RJ45-Buchse."
   },
   {
    "q": "Was beschreibt der Begriff 'Übersprechen' (Crosstalk)?",
    "o": [
     {
      "t": "Störende Signalübertragung zwischen benachbarten Adern",
      "ok": true
     },
     {
      "t": "Der Verlust der IP-Adresse",
      "ok": false
     },
     {
      "t": "Ein Kabelbruch",
      "ok": false
     },
     {
      "t": "Eine Kollision auf Schicht 3",
      "ok": false
     }
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
      "t": "Die Netzwerkkarte (NIC)",
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
    "e": "Die NIC ist die Schnittstelle zwischen Gerät und Übertragungsmedium."
   },
   {
    "q": "Was gilt für ungeschirmtes UTP in Umgebungen mit starken Motoren/Maschinen?",
    "o": [
     {
      "t": "Es ist störanfällig; besser STP oder Glasfaser",
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
    "q": "Welche Kopplungselemente arbeiten auf welcher Schicht (korrekt)?",
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
     {
      "t": "Höhere Kosten und empfindlichere Verlegung/Spleißung",
      "ok": true
     },
     {
      "t": "Geringere Bandbreite",
      "ok": false
     },
     {
      "t": "Anfälligkeit gegen EMV",
      "ok": false
     },
     {
      "t": "Kürzere Reichweite",
      "ok": false
     }
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
     {
      "t": "Zielnetze und der jeweils nächste Hop / Ausgangsinterface",
      "ok": true
     },
     {
      "t": "MAC-Adressen aller Geräte",
      "ok": false
     },
     {
      "t": "Portnummern der Anwendungen",
      "ok": false
     },
     {
      "t": "Nur die eigene IP",
      "ok": false
     }
    ],
    "e": "Eine Routingtabelle bildet Zielnetze auf den nächsten Hop bzw. das Ausgangsinterface ab."
   },
   {
    "q": "Wozu dient das Default Gateway?",
    "o": [
     {
      "t": "Es ist der Weg für alle Ziele außerhalb des eigenen Netzes",
      "ok": true
     },
     {
      "t": "Es vergibt IP-Adressen",
      "ok": false
     },
     {
      "t": "Es löst Namen in IPs auf",
      "ok": false
     },
     {
      "t": "Es verschlüsselt den Verkehr",
      "ok": false
     }
    ],
    "e": "Pakete an unbekannte/externe Netze gehen ans Default Gateway (meist der Router)."
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
     {
      "t": "Automatische Anpassung an Topologieänderungen und Ausfälle",
      "ok": true
     },
     {
      "t": "Kein Protokoll-Overhead",
      "ok": false
     },
     {
      "t": "Absolute Vorhersehbarkeit",
      "ok": false
     },
     {
      "t": "Keine CPU-Last",
      "ok": false
     }
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
    "e": "Der Switch merkt sich, welche MAC an welchem Port hängt (CAM-Table)."
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
     {
      "t": "Flooding: er sendet es an alle Ports außer dem Eingangsport",
      "ok": true
     },
     {
      "t": "Er verwirft es",
      "ok": false
     },
     {
      "t": "Er sendet es zurück zum Absender",
      "ok": false
     },
     {
      "t": "Er speichert es dauerhaft",
      "ok": false
     }
    ],
    "e": "Unbekanntes Ziel → Flooding an alle Ports (außer Quellport), bis die MAC gelernt ist."
   },
   {
    "q": "Was macht ein Switch mit einem Broadcast-Frame (Ziel-MAC FF:FF:FF:FF:FF:FF)?",
    "o": [
     {
      "t": "Er leitet ihn an alle Ports außer dem Eingangsport weiter",
      "ok": true
     },
     {
      "t": "Er verwirft ihn",
      "ok": false
     },
     {
      "t": "Er beantwortet ihn selbst",
      "ok": false
     },
     {
      "t": "Er routet ihn ins nächste Netz",
      "ok": false
     }
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
      "t": "Er kann keine Frames lesen",
      "ok": false
     },
     {
      "t": "Broadcasts sind verschlüsselt",
      "ok": false
     },
     {
      "t": "Er hat keine Ports",
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
      "t": "Beide arbeiten mit IP-Adressen",
      "ok": false
     },
     {
      "t": "Switching verbindet Netze, Routing arbeitet lokal",
      "ok": false
     },
     {
      "t": "Es gibt keinen Unterschied",
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
      "t": "Es wird an alle Netze gesendet",
      "ok": false
     },
     {
      "t": "Der Router speichert es",
      "ok": false
     },
     {
      "t": "Die TTL wird verdoppelt",
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
      "t": "Zur Portvergabe",
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
      "t": "Es wird verworfen",
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
      "t": "Die schnellste Route",
      "ok": false
     },
     {
      "t": "Eine Route für das lokale Netz",
      "ok": false
     },
     {
      "t": "Eine verschlüsselte Route",
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
     {
      "t": "Er leitet ihn gezielt nur an den bekannten Port weiter",
      "ok": true
     },
     {
      "t": "Er flutet ihn an alle Ports",
      "ok": false
     },
     {
      "t": "Er verwirft ihn",
      "ok": false
     },
     {
      "t": "Er sendet ihn zurück",
      "ok": false
     }
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
      "t": "Der spezifischste (längste) passende Eintrag in der Routingtabelle wird verwendet",
      "ok": true
     },
     {
      "t": "Die kürzeste Route wird bevorzugt",
      "ok": false
     },
     {
      "t": "Der erste Eintrag in der Tabelle gewinnt",
      "ok": false
     },
     {
      "t": "Es wird immer die Default-Route genutzt",
      "ok": false
     }
    ],
    "e": "Passt /24 und /28 — nimmt der Router /28, weil spezifischer. Das ist Longest Prefix Match."
   },
   {
    "q": "Wozu dient das Default Gateway am Client?",
    "o": [
     {
      "t": "Als Übergangspunkt für Pakete an Ziele außerhalb des eigenen Subnetzes",
      "ok": true
     },
     {
      "t": "Zur IP-Vergabe",
      "ok": false
     },
     {
      "t": "Zur Namensauflösung",
      "ok": false
     },
     {
      "t": "Zur MAC-Zuordnung",
      "ok": false
     }
    ],
    "e": "Ohne Default Gateway kann der Client nur im eigenen Subnetz kommunizieren."
   },
   {
    "q": "Was ist der Unterschied zwischen einem L2- und einem L3-Switch?",
    "o": [
     {
      "t": "L3-Switch kann zusätzlich IP-basiert zwischen Subnetzen routen",
      "ok": true
     },
     {
      "t": "L2-Switch ist schneller",
      "ok": false
     },
     {
      "t": "L3-Switch arbeitet nur mit MAC",
      "ok": false
     },
     {
      "t": "Es gibt keinen Unterschied",
      "ok": false
     }
    ],
    "e": "Ein L3-Switch kombiniert MAC-Switching (L2) mit IP-Routing (L3) in einem Gerät."
   },
   {
    "q": "Was ist VLAN und welchen Vorteil hat es?",
    "o": [
     {
      "t": "Logische Netztrennung auf einem Switch — trennt Broadcastdomänen ohne eigene Hardware",
      "ok": true
     },
     {
      "t": "Eine Verschlüsselungstechnik",
      "ok": false
     },
     {
      "t": "Ein Routingprotokoll",
      "ok": false
     },
     {
      "t": "Eine Kabeltechnologie",
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
      "t": "Direkt über den Switch",
      "ok": false
     },
     {
      "t": "Per Broadcast",
      "ok": false
     },
     {
      "t": "Gar nicht möglich",
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
      "t": "Der WLAN-Standard",
      "ok": false
     },
     {
      "t": "Ein Routingprotokoll",
      "ok": false
     },
     {
      "t": "Ein Verschlüsselungsstandard",
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
      "t": "Die Default-Route",
      "ok": false
     },
     {
      "t": "Die zuerst eingetragene Route",
      "ok": false
     },
     {
      "t": "Die Route mit dem höchsten Hop-Count",
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
      "t": "VLAN",
      "ok": false
     },
     {
      "t": "OSPF",
      "ok": false
     },
     {
      "t": "NAT",
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
      "t": "Vier Dezimalzahlen 0–255, durch Punkte getrennt",
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
    "e": "Dotted decimal, z. B. 192.168.0.1."
   },
   {
    "q": "Wie wird eine IPv6-Adresse dargestellt?",
    "o": [
     {
      "t": "Acht Blöcke à 16 Bit in Hex, durch Doppelpunkte getrennt",
      "ok": true
     },
     {
      "t": "Vier Dezimalzahlen mit Punkten",
      "ok": false
     },
     {
      "t": "Sechs Hex-Paare mit Bindestrich",
      "ok": false
     },
     {
      "t": "Als reine Binärzahl",
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
      "t": "Ein doppelter Doppelpunkt ::",
      "ok": true
     },
     {
      "t": "Ein Punkt .",
      "ok": false
     },
     {
      "t": "Ein Bindestrich -",
      "ok": false
     },
     {
      "t": "Ein Slash /",
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
      "t": "Rund 4 Millionen",
      "ok": false
     },
     {
      "t": "Rund 2³²·² unendlich",
      "ok": false
     },
     {
      "t": "Genau 1 Million",
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
    "q": "Was bedeutet die Notation /24 bei einer IPv4-Adresse?",
    "o": [
     {
      "t": "Die ersten 24 Bit sind der Netzanteil",
      "ok": true
     },
     {
      "t": "Es gibt 24 Hosts",
      "ok": false
     },
     {
      "t": "Die TTL ist 24",
      "ok": false
     },
     {
      "t": "24 Router liegen dazwischen",
      "ok": false
     }
    ],
    "e": "/24 = Präfixlänge; 24 Bit Netz, 8 Bit Host (Maske 255.255.255.0)."
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
      "t": "DHCP",
      "ok": false
     },
     {
      "t": "DNS",
      "ok": false
     },
     {
      "t": "RARP",
      "ok": false
     }
    ],
    "e": "IPv6 nutzt NDP (ICMPv6) statt ARP zur Adressauflösung im lokalen Netz."
   },
   {
    "q": "Wie viele Hosts sind in einem /24-Netz nutzbar?",
    "o": [
     {
      "t": "254 (256 minus Netz- und Broadcastadresse)",
      "ok": true
     },
     {
      "t": "256",
      "ok": false
     },
     {
      "t": "255",
      "ok": false
     },
     {
      "t": "128",
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
      "t": "Der Adressraum ist praktisch unerschöpflich (2¹²⁸)",
      "ok": true
     },
     {
      "t": "Er ist kleiner als IPv4",
      "ok": false
     },
     {
      "t": "Er nutzt nur Dezimalzahlen",
      "ok": false
     },
     {
      "t": "Er kennt keine Loopback-Adresse",
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
      "t": "Eine öffentliche Adresse",
      "ok": false
     },
     {
      "t": "Die Broadcastadresse",
      "ok": false
     },
     {
      "t": "Eine IPv6-Adresse",
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
      "t": "Die Anzahl der Hosts",
      "ok": false
     },
     {
      "t": "Die TTL des Netzes",
      "ok": false
     },
     {
      "t": "Die Anzahl der Router",
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
      "t": "Durch ODER-Verknüpfung",
      "ok": false
     },
     {
      "t": "Durch Addition",
      "ok": false
     },
     {
      "t": "Durch XOR",
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
     {
      "t": "Zustandslose automatische Adresskonfiguration ohne Server",
      "ok": true
     },
     {
      "t": "Zentrale Adressvergabe über einen Server",
      "ok": false
     },
     {
      "t": "Namensauflösung",
      "ok": false
     },
     {
      "t": "Verschlüsselung",
      "ok": false
     }
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
      "t": "Es bekommt sie komplett vom DHCP-Server",
      "ok": false
     },
     {
      "t": "Es rät sie zufällig",
      "ok": false
     },
     {
      "t": "Über ARP",
      "ok": false
     }
    ],
    "e": "Das Router-Advertisement liefert das Präfix; den hinteren Teil bildet das Gerät selbst."
   },
   {
    "q": "Wofür steht DHCPv6?",
    "o": [
     {
      "t": "Die DHCP-Variante zur Konfiguration von IPv6-Adressen/Parametern",
      "ok": true
     },
     {
      "t": "Ein Routingprotokoll",
      "ok": false
     },
     {
      "t": "Ein Verschlüsselungsverfahren",
      "ok": false
     },
     {
      "t": "Eine Firewallregel",
      "ok": false
     }
    ],
    "e": "DHCPv6 vergibt bzw. ergänzt IPv6-Konfiguration (zustandsbehaftet oder -los)."
   },
   {
    "q": "Was ist der Kernunterschied zwischen SLAAC und DHCPv6?",
    "o": [
     {
      "t": "SLAAC ist zustandslos (Selbstkonfiguration), DHCPv6 kann zustandsbehaftet vergeben",
      "ok": true
     },
     {
      "t": "SLAAC braucht immer einen Server",
      "ok": false
     },
     {
      "t": "DHCPv6 funktioniert nur mit IPv4",
      "ok": false
     },
     {
      "t": "Es gibt keinen Unterschied",
      "ok": false
     }
    ],
    "e": "SLAAC konfiguriert ohne Server; DHCPv6 kann wie DHCPv4 zentral Adressen führen."
   },
   {
    "q": "Welche Rolle spielt das Router-Advertisement (RA) bei IPv6?",
    "o": [
     {
      "t": "Der Router kündigt Präfix und Parameter für die Autokonfiguration an",
      "ok": true
     },
     {
      "t": "Es vergibt MAC-Adressen",
      "ok": false
     },
     {
      "t": "Es verschlüsselt den Verkehr",
      "ok": false
     },
     {
      "t": "Es löst Namen auf",
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
    "e": "/27 = 5 Hostbits → 2^5=32 Adressen − 2 (Netz+Broadcast) = 30 nutzbare Hosts."
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
      "t": "2 nutzbare Hosts — typisch für Punkt-zu-Punkt-Verbindungen",
      "ok": true
     },
     {
      "t": "30 nutzbare Hosts",
      "ok": false
     },
     {
      "t": "254 nutzbare Hosts",
      "ok": false
     },
     {
      "t": "Kein Host möglich",
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
      "t": "Die Anzahl der Hosts",
      "ok": false
     },
     {
      "t": "Die Anzahl der Subnetze",
      "ok": false
     },
     {
      "t": "Die TTL",
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
      "t": "DHCP Discover (Broadcast)",
      "ok": true
     },
     {
      "t": "DHCP Offer",
      "ok": false
     },
     {
      "t": "DHCP Request",
      "ok": false
     },
     {
      "t": "DHCP Acknowledge",
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
      "t": "DHCP Offer",
      "ok": false
     },
     {
      "t": "DHCP Discover",
      "ok": false
     },
     {
      "t": "DHCP Release",
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
      "t": "Der Client kennt den Server (und seine eigene IP) noch nicht",
      "ok": true
     },
     {
      "t": "Broadcasts sind verschlüsselt",
      "ok": false
     },
     {
      "t": "Um DNS zu umgehen",
      "ok": false
     },
     {
      "t": "Weil UDP das vorschreibt",
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
      "t": "Pakete verschlüsseln",
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
     {
      "t": "Er fragt für den Client so lange nach, bis er die Antwort hat",
      "ok": true
     },
     {
      "t": "Er antwortet nur mit einem Verweis",
      "ok": false
     },
     {
      "t": "Er vergibt IP-Adressen",
      "ok": false
     },
     {
      "t": "Er verschlüsselt die Anfrage",
      "ok": false
     }
    ],
    "e": "Der rekursive Resolver arbeitet die komplette Auflösung für den Client ab."
   },
   {
    "q": "Was ist ein autoritativer DNS-Server?",
    "o": [
     {
      "t": "Er verwaltet die verbindlichen Einträge einer Zone/Domain",
      "ok": true
     },
     {
      "t": "Er ist immer der Root-Server",
      "ok": false
     },
     {
      "t": "Er cached nur fremde Antworten",
      "ok": false
     },
     {
      "t": "Er vergibt DHCP-Leases",
      "ok": false
     }
    ],
    "e": "Der autoritative Server hält die maßgeblichen Records seiner Domain."
   },
   {
    "q": "Wofür steht der TLD-Server?",
    "o": [
     {
      "t": "Top-Level-Domain-Server, zuständig z. B. für .de oder .com",
      "ok": true
     },
     {
      "t": "Transport-Layer-Domain",
      "ok": false
     },
     {
      "t": "Total-Load-Distribution",
      "ok": false
     },
     {
      "t": "Temporary-Lease-Directory",
      "ok": false
     }
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
     {
      "t": "Um wiederholte Anfragen schneller zu beantworten und Last zu senken",
      "ok": true
     },
     {
      "t": "Um Adressen zu verschlüsseln",
      "ok": false
     },
     {
      "t": "Um MAC-Adressen zu lernen",
      "ok": false
     },
     {
      "t": "Um Broadcasts zu vermeiden",
      "ok": false
     }
    ],
    "e": "Zwischengespeicherte Antworten sparen Zeit und entlasten die Server (TTL steuert die Dauer)."
   },
   {
    "q": "Was bewirkt die TTL eines DNS-Eintrags?",
    "o": [
     {
      "t": "Sie legt fest, wie lange die Antwort gecacht werden darf",
      "ok": true
     },
     {
      "t": "Sie zählt Router-Hops",
      "ok": false
     },
     {
      "t": "Sie verschlüsselt den Eintrag",
      "ok": false
     },
     {
      "t": "Sie vergibt die IP",
      "ok": false
     }
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
     {
      "t": "Er leitet DHCP-Broadcasts über Netzgrenzen an einen zentralen Server weiter",
      "ok": true
     },
     {
      "t": "Er vergibt selbst IP-Adressen",
      "ok": false
     },
     {
      "t": "Er löst Domainnamen auf",
      "ok": false
     },
     {
      "t": "Er verschlüsselt DHCP-Pakete",
      "ok": false
     }
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
      "t": "Er bekommt eine öffentliche IP",
      "ok": false
     },
     {
      "t": "Er nutzt die Router-IP",
      "ok": false
     },
     {
      "t": "Er fällt komplett aus",
      "ok": false
     }
    ],
    "e": "Ohne DHCP greift APIPA/Link-Local aus 169.254.0.0/16."
   },
   {
    "q": "Warum ist DHCP in großen Netzen sinnvoller als manuelle IP-Vergabe?",
    "o": [
     {
      "t": "Zentrale, fehlerarme Verwaltung ohne Adresskonflikte",
      "ok": true
     },
     {
      "t": "Es ist verschlüsselt",
      "ok": false
     },
     {
      "t": "Es beschleunigt die Leitung",
      "ok": false
     },
     {
      "t": "Es ersetzt DNS",
      "ok": false
     }
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
      "t": "Rekursiv: Resolver löst komplett auf; Iterativ: Server gibt nur Verweis auf nächsten Server",
      "ok": true
     },
     {
      "t": "Beides identisch",
      "ok": false
     },
     {
      "t": "Iterativ ist schneller",
      "ok": false
     },
     {
      "t": "Rekursiv nutzt nur UDP",
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
    "q": "Welcher DNS-Record ordnet einem Namen eine IPv6-Adresse zu?",
    "o": [
     {
      "t": "AAAA",
      "ok": true
     },
     {
      "t": "A",
      "ok": false
     },
     {
      "t": "MX",
      "ok": false
     },
     {
      "t": "PTR",
      "ok": false
     }
    ],
    "e": "AAAA (Quad-A) = IPv6-Adresse. A = IPv4. PTR = Reverse-Lookup (IP→Name)."
   },
   {
    "q": "Wozu dient ein PTR-Record?",
    "o": [
     {
      "t": "Reverse-Lookup: IP-Adresse → Domainname",
      "ok": true
     },
     {
      "t": "Mailserver-Eintrag",
      "ok": false
     },
     {
      "t": "Alias auf anderen Namen",
      "ok": false
     },
     {
      "t": "IPv6-Adresse",
      "ok": false
     }
    ],
    "e": "PTR-Records ermöglichen die umgekehrte Auflösung: aus einer IP-Adresse den Hostnamen ermitteln."
   },
   {
    "q": "Was passiert nach Ablauf der DHCP Lease Time?",
    "o": [
     {
      "t": "Der Client muss die Adresse erneuern (Renew) oder eine neue anfordern",
      "ok": true
     },
     {
      "t": "Die IP wird sofort freigegeben",
      "ok": false
     },
     {
      "t": "Der Client behält sie dauerhaft",
      "ok": false
     },
     {
      "t": "Der Server vergibt sie neu ohne Rückfrage",
      "ok": false
     }
    ],
    "e": "Beim Renew-Zeitpunkt (50% der Lease-Dauer) versucht der Client, die Adresse zu verlängern."
   },
   {
    "q": "Wie nennt man eine fest zugewiesene IP über DHCP?",
    "o": [
     {
      "t": "DHCP-Reservation (statische Zuweisung per MAC)",
      "ok": true
     },
     {
      "t": "Statische IP",
      "ok": false
     },
     {
      "t": "APIPA",
      "ok": false
     },
     {
      "t": "Default Gateway",
      "ok": false
     }
    ],
    "e": "Eine DHCP-Reservation verknüpft eine MAC-Adresse mit einer festen IP — automatisch, aber immer gleich."
   },
   {
    "q": "Welchen Vorteil bietet ein DHCP-Relay?",
    "o": [
     {
      "t": "Ein DHCP-Server reicht für viele Subnetze statt einen pro Subnetz",
      "ok": true
     },
     {
      "t": "Schnellere IP-Vergabe",
      "ok": false
     },
     {
      "t": "Verschlüsselung der DHCP-Pakete",
      "ok": false
     },
     {
      "t": "Automatische DNS-Einträge",
      "ok": false
     }
    ],
    "e": "Der Relay-Agent überbrückt die Subnetzgrenzen — Broadcasts werden als Unicast weitergeleitet."
   },
   {
    "q": "Was enthält das DHCP-Offer-Paket?",
    "o": [
     {
      "t": "Vorgeschlagene IP, Maske, Gateway, DNS, Lease-Dauer",
      "ok": true
     },
     {
      "t": "Nur die IP-Adresse",
      "ok": false
     },
     {
      "t": "Den Hostnamen des Clients",
      "ok": false
     },
     {
      "t": "Nur die MAC-Adresse",
      "ok": false
     }
    ],
    "e": "Das Offer enthält die komplette Netzwerkkonfiguration, die der Server vorschlägt."
   },
   {
    "q": "Woran erkennt der DHCP-Server beim Discover den anfragenden Client?",
    "o": [
     {
      "t": "An der MAC-Adresse in der Anfrage",
      "ok": true
     },
     {
      "t": "Am Hostnamen",
      "ok": false
     },
     {
      "t": "An der IP-Adresse (hat noch keine)",
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
      "t": "Zwischenspeichern von Antworten für die TTL-Dauer — spart Anfragen und beschleunigt Auflösung",
      "ok": true
     },
     {
      "t": "Dauerhaftes Speichern aller DNS-Einträge",
      "ok": false
     },
     {
      "t": "Backup aller Zonen",
      "ok": false
     },
     {
      "t": "Verschlüsselung der DNS-Antworten",
      "ok": false
     }
    ],
    "e": "DNS-Cache verhindert wiederholte Abfragen für die gleiche Domain innerhalb der TTL."
   },
   {
    "q": "Was unterscheidet einen autoritativen von einem nicht-autoritativen DNS-Server?",
    "o": [
     {
      "t": "Autoritativ verwaltet die Zone selbst; nicht-autoritativ hat gecachte Antworten",
      "ok": true
     },
     {
      "t": "Autoritativ ist schneller",
      "ok": false
     },
     {
      "t": "Kein Unterschied",
      "ok": false
     },
     {
      "t": "Nicht-autoritativ ist sicherer",
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
     {
      "t": "Über einen geheimen Schlüssel (API-Key) im Header",
      "ok": true
     },
     {
      "t": "Über die MAC-Adresse",
      "ok": false
     },
     {
      "t": "Über die TTL",
      "ok": false
     },
     {
      "t": "Über den Quellport",
      "ok": false
     }
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
     {
      "t": "Wegen der Zustandslosigkeit können Anfragen unabhängig verteilt werden",
      "ok": true
     },
     {
      "t": "Weil es nur XML nutzt",
      "ok": false
     },
     {
      "t": "Weil der Server die Sitzung speichert",
      "ok": false
     },
     {
      "t": "Weil es UDP verwendet",
      "ok": false
     }
    ],
    "e": "Stateless-Requests lassen sich beliebig auf Server verteilen (Loadbalancing)."
   },
   {
    "q": "Was ist ein 'Endpunkt' einer API?",
    "o": [
     {
      "t": "Eine definierte Adresse/URL, an die Anfragen gehen",
      "ok": true
     },
     {
      "t": "Der letzte Router auf dem Weg",
      "ok": false
     },
     {
      "t": "Der Quellport",
      "ok": false
     },
     {
      "t": "Das Ende der TTL",
      "ok": false
     }
    ],
    "e": "Ein Endpoint ist die adressierbare Schnittstelle für Requests."
   },
   {
    "q": "Welcher Vorteil ergibt sich durch Webhooks gegenüber Polling?",
    "o": [
     {
      "t": "Kein ständiges Nachfragen nötig, spart Ressourcen",
      "ok": true
     },
     {
      "t": "Höhere Verschlüsselung",
      "ok": false
     },
     {
      "t": "Größere Payload",
      "ok": false
     },
     {
      "t": "Feste IP-Adressen",
      "ok": false
     }
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
      "t": "UDP (via RTP)",
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
    "e": "Sprache läuft über RTP auf UDP – Tempo ist wichtiger als vollständige Zustellung."
   },
   {
    "q": "Warum nutzt VoIP UDP statt TCP?",
    "o": [
     {
      "t": "Geringe Verzögerung ist wichtiger als das Nachliefern verlorener Pakete",
      "ok": true
     },
     {
      "t": "UDP ist immer sicherer",
      "ok": false
     },
     {
      "t": "TCP kann keine Sprache übertragen",
      "ok": false
     },
     {
      "t": "UDP verschlüsselt automatisch",
      "ok": false
     }
    ],
    "e": "Verspätete Nachlieferungen stören ein Gespräch mehr als ein kurzer Aussetzer – daher UDP."
   },
   {
    "q": "Welche Aufgabe hat das SIP-Protokoll bei VoIP?",
    "o": [
     {
      "t": "Auf-, Ab- und Verwaltung der Gesprächsverbindung (Signalisierung)",
      "ok": true
     },
     {
      "t": "Übertragung der eigentlichen Sprachdaten",
      "ok": false
     },
     {
      "t": "Verschlüsselung des Netzwerks",
      "ok": false
     },
     {
      "t": "Vergabe von IP-Adressen",
      "ok": false
     }
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
     {
      "t": "Sprachpakete werden bevorzugt behandelt, um Qualität zu sichern",
      "ok": true
     },
     {
      "t": "Zur Verschlüsselung der Gespräche",
      "ok": false
     },
     {
      "t": "Zur Vergabe von Telefonnummern",
      "ok": false
     },
     {
      "t": "Zur MAC-Filterung",
      "ok": false
     }
    ],
    "e": "QoS priorisiert zeitkritischen Sprachverkehr gegenüber unkritischem Datenverkehr."
   },
   {
    "q": "Was ist ein Codec bei VoIP?",
    "o": [
     {
      "t": "Verfahren zum Kodieren/Komprimieren der Sprache (z. B. G.711)",
      "ok": true
     },
     {
      "t": "Ein Verschlüsselungszertifikat",
      "ok": false
     },
     {
      "t": "Ein Routingprotokoll",
      "ok": false
     },
     {
      "t": "Ein WLAN-Kanal",
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
     {
      "t": "Nutzung der vorhandenen Dateninfrastruktur, geringere Kosten, Flexibilität",
      "ok": true
     },
     {
      "t": "Es ist völlig störungsfrei",
      "ok": false
     },
     {
      "t": "Es braucht kein Netzwerk",
      "ok": false
     },
     {
      "t": "Es funktioniert ohne Strom",
      "ok": false
     }
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
     {
      "t": "Er puffert Pakete, um Laufzeitschwankungen auszugleichen",
      "ok": true
     },
     {
      "t": "Er verschlüsselt die Sprache",
      "ok": false
     },
     {
      "t": "Er vergibt IP-Adressen",
      "ok": false
     },
     {
      "t": "Er erhöht die Bandbreite",
      "ok": false
     }
    ],
    "e": "Der Jitter-Buffer sammelt Pakete kurz, um sie gleichmäßig abzuspielen."
   },
   {
    "q": "Welche zwei Protokolltypen wirken bei VoIP zusammen?",
    "o": [
     {
      "t": "Signalisierung (SIP) und Medientransport (RTP)",
      "ok": true
     },
     {
      "t": "DNS und DHCP",
      "ok": false
     },
     {
      "t": "ARP und RARP",
      "ok": false
     },
     {
      "t": "HTTP und FTP",
      "ok": false
     }
    ],
    "e": "SIP baut das Gespräch auf, RTP transportiert die Sprache."
   },
   {
    "q": "Warum ist VoIP anfällig für Netzwerkprobleme?",
    "o": [
     {
      "t": "Weil Sprache echtzeitkritisch ist und keine Verzögerung verträgt",
      "ok": true
     },
     {
      "t": "Weil sie TCP nutzt",
      "ok": false
     },
     {
      "t": "Weil sie keine Pakete nutzt",
      "ok": false
     },
     {
      "t": "Weil sie kein Netz braucht",
      "ok": false
     }
    ],
    "e": "Echtzeitkommunikation reagiert empfindlich auf Latenz, Jitter und Verluste."
   },
   {
    "q": "Was ist eine typische Anwendung von VoIP im Unternehmen?",
    "o": [
     {
      "t": "IP-Telefonanlage statt klassischer Telefonleitungen",
      "ok": true
     },
     {
      "t": "Ein Ersatz für die Firewall",
      "ok": false
     },
     {
      "t": "Ein DNS-Server",
      "ok": false
     },
     {
      "t": "Ein Backup-System",
      "ok": false
     }
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
     {
      "t": "Um Sprache zu priorisieren und von Datenverkehr zu trennen",
      "ok": true
     },
     {
      "t": "Um die Telefonnummern zu verstecken",
      "ok": false
     },
     {
      "t": "Um DNS zu umgehen",
      "ok": false
     },
     {
      "t": "Um die Reichweite zu erhöhen",
      "ok": false
     }
    ],
    "e": "Ein Voice-VLAN trennt und priorisiert Sprachverkehr für gleichbleibende Qualität."
   },
   {
    "q": "Was ist ein Softphone?",
    "o": [
     {
      "t": "Eine Software, die Telefonie am Rechner/Smartphone ermöglicht",
      "ok": true
     },
     {
      "t": "Ein besonders leises Telefon",
      "ok": false
     },
     {
      "t": "Ein Hardware-Router",
      "ok": false
     },
     {
      "t": "Ein Verschlüsselungschip",
      "ok": false
     }
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
     {
      "t": "Ein Schlüsselpaar: öffentlich verschlüsselt, privat entschlüsselt",
      "ok": true
     },
     {
      "t": "Ein gemeinsamer geheimer Schlüssel",
      "ok": false
     },
     {
      "t": "Gar kein Schlüssel",
      "ok": false
     },
     {
      "t": "Nur ein privater Schlüssel",
      "ok": false
     }
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
    "q": "Welchen Vorteil bietet asymmetrische Verschlüsselung?",
    "o": [
     {
      "t": "Sichere Kommunikation ohne vorherige Schlüsselverteilung",
      "ok": true
     },
     {
      "t": "Sie ist schneller als symmetrische",
      "ok": false
     },
     {
      "t": "Sie braucht keinen Schlüssel",
      "ok": false
     },
     {
      "t": "Sie funktioniert ohne Mathematik",
      "ok": false
     }
    ],
    "e": "Der öffentliche Schlüssel darf frei verteilt werden — kein sicherer Vorabkanal nötig."
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
     {
      "t": "Symmetrisch für die Daten, asymmetrisch für den Schlüsselaustausch",
      "ok": true
     },
     {
      "t": "Zwei symmetrische Schlüssel",
      "ok": false
     },
     {
      "t": "Zwei private Schlüssel",
      "ok": false
     },
     {
      "t": "Nur Hashing",
      "ok": false
     }
    ],
    "e": "Hybrid: schneller symmetrischer Sitzungsschlüssel, sicher per Asymmetrie übertragen."
   },
   {
    "q": "Wie läuft hybride Verschlüsselung grob ab?",
    "o": [
     {
      "t": "Sitzungsschlüssel erzeugen, Daten symmetrisch, Sitzungsschlüssel asymmetrisch übertragen",
      "ok": true
     },
     {
      "t": "Alles nur asymmetrisch",
      "ok": false
     },
     {
      "t": "Alles nur symmetrisch",
      "ok": false
     },
     {
      "t": "Nur Hashwerte austauschen",
      "ok": false
     }
    ],
    "e": "Der Sitzungsschlüssel verschlüsselt die Daten; er selbst wird mit dem Public Key des Empfängers geschützt."
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
     {
      "t": "Signatur mit dem öffentlichen Schlüssel entschlüsseln und Hash vergleichen",
      "ok": true
     },
     {
      "t": "Mit dem eigenen privaten Schlüssel entschlüsseln",
      "ok": false
     },
     {
      "t": "Er vergleicht nur die Dateigröße",
      "ok": false
     },
     {
      "t": "Er fragt den DHCP-Server",
      "ok": false
     }
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
      "t": "Er verschlüsselt die Nachricht",
      "ok": false
     },
     {
      "t": "Er ersetzt den privaten Schlüssel",
      "ok": false
     },
     {
      "t": "Er vergibt die IP",
      "ok": false
     }
    ],
    "e": "Ändert sich die Nachricht, ändert sich der Hash — Manipulation wird sichtbar."
   },
   {
    "q": "Was enthält ein digitales Zertifikat?",
    "o": [
     {
      "t": "Öffentlichen Schlüssel, Inhaberdaten, Gültigkeit, CA-Signatur",
      "ok": true
     },
     {
      "t": "Nur den privaten Schlüssel",
      "ok": false
     },
     {
      "t": "Das Benutzerpasswort",
      "ok": false
     },
     {
      "t": "Die MAC-Adresse",
      "ok": false
     }
    ],
    "e": "Ein Zertifikat bindet einen Public Key an eine Identität, signiert von einer CA."
   },
   {
    "q": "Was ist eine Zertifizierungsstelle (CA)?",
    "o": [
     {
      "t": "Eine vertrauenswürdige Instanz, die Zertifikate signiert/ausstellt",
      "ok": true
     },
     {
      "t": "Ein Verschlüsselungsalgorithmus",
      "ok": false
     },
     {
      "t": "Ein DHCP-Server",
      "ok": false
     },
     {
      "t": "Ein Router",
      "ok": false
     }
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
     {
      "t": "Clients vertrauen der Root-CA und damit allem, was sie signiert",
      "ok": true
     },
     {
      "t": "Jeder Client signiert selbst",
      "ok": false
     },
     {
      "t": "Vertrauen ist zufällig",
      "ok": false
     },
     {
      "t": "Nur der Server entscheidet",
      "ok": false
     }
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
     {
      "t": "Damit nur der Empfänger ihn mit seinem privaten Schlüssel öffnen kann",
      "ok": true
     },
     {
      "t": "Weil er sonst zu groß wäre",
      "ok": false
     },
     {
      "t": "Weil DHCP das verlangt",
      "ok": false
     },
     {
      "t": "Damit er schneller ankommt",
      "ok": false
     }
    ],
    "e": "Der mit dem Public Key geschützte Sitzungsschlüssel ist nur für den Inhaber des Private Keys lesbar."
   },
   {
    "q": "Was ist ein Hash-Wert?",
    "o": [
     {
      "t": "Eine Prüfsumme fester Länge, die aus beliebig langen Daten berechnet wird",
      "ok": true
     },
     {
      "t": "Ein verschlüsselter Schlüssel",
      "ok": false
     },
     {
      "t": "Eine IP-Adresse",
      "ok": false
     },
     {
      "t": "Ein Zertifikatsformat",
      "ok": false
     }
    ],
    "e": "Ein Hash-Algorithmus (z. B. SHA-256) erzeugt einen eindeutigen Fingerabdruck der Eingabedaten."
   },
   {
    "q": "Welche Eigenschaft muss ein kryptografischer Hash haben?",
    "o": [
     {
      "t": "Kollisionsresistenz: zwei verschiedene Eingaben sollen nicht denselben Hash erzeugen",
      "ok": true
     },
     {
      "t": "Er muss umkehrbar sein",
      "ok": false
     },
     {
      "t": "Er muss immer 8 Byte lang sein",
      "ok": false
     },
     {
      "t": "Er muss verschlüsselt sein",
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
      "t": "Verschlüsselung ist umkehrbar (mit Schlüssel), Hashing ist einwegig",
      "ok": true
     },
     {
      "t": "Hashing ist sicherer als Verschlüsselung",
      "ok": false
     },
     {
      "t": "Beides ist identisch",
      "ok": false
     },
     {
      "t": "Verschlüsselung ist nicht umkehrbar",
      "ok": false
     }
    ],
    "e": "Verschlüsselung schützt Vertraulichkeit (mit Schlüssel umkehrbar); Hash prüft Integrität (nicht umkehrbar)."
   },
   {
    "q": "Wozu wird ein Salt beim Passwort-Hashing verwendet?",
    "o": [
     {
      "t": "Um identische Passwörter unterschiedliche Hashes zu geben und Rainbow-Table-Angriffe zu erschweren",
      "ok": true
     },
     {
      "t": "Um das Passwort zu verschlüsseln",
      "ok": false
     },
     {
      "t": "Um den Hash kürzer zu machen",
      "ok": false
     },
     {
      "t": "Um den Algorithmus zu wechseln",
      "ok": false
     }
    ],
    "e": "Ein zufälliger Salt pro Passwort macht Rainbow-Tables (vorberechnete Hashwerte) wertlos."
   },
   {
    "q": "Was ist Diffie-Hellman?",
    "o": [
     {
      "t": "Ein Verfahren zum sicheren Schlüsselaustausch über unsichere Kanäle",
      "ok": true
     },
     {
      "t": "Ein symmetrisches Verschlüsselungsverfahren",
      "ok": false
     },
     {
      "t": "Ein Hash-Algorithmus",
      "ok": false
     },
     {
      "t": "Ein Zertifikatsformat",
      "ok": false
     }
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
      "t": "Nur die IP-Adresse",
      "ok": false
     },
     {
      "t": "Nur den öffentlichen Schlüssel",
      "ok": false
     },
     {
      "t": "Die Dateigröße",
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
      "t": "Asymmetrisch (z. B. RSA oder Diffie-Hellman) für den Austausch, dann symmetrisch (AES) für die Daten",
      "ok": true
     },
     {
      "t": "Nur symmetrisch",
      "ok": false
     },
     {
      "t": "Nur asymmetrisch",
      "ok": false
     },
     {
      "t": "Kein Schlüsselaustausch nötig",
      "ok": false
     }
    ],
    "e": "HTTPS ist ein klassisches hybrides Verfahren: asymmetrisch für den Sitzungsschlüssel, AES für die Daten."
   },
   {
    "q": "Was ist eine Intermediate CA?",
    "o": [
     {
      "t": "Eine Zwischenzertifizierungsstelle zwischen Root-CA und End-Entity-Zertifikat",
      "ok": true
     },
     {
      "t": "Eine abgelaufene Root-CA",
      "ok": false
     },
     {
      "t": "Ein Benutzer-Zertifikat",
      "ok": false
     },
     {
      "t": "Ein Sperrlisten-Server",
      "ok": false
     }
    ],
    "e": "Intermediate CAs ermöglichen skalierbare PKI: die Root-CA bleibt offline; Intermediate CAs stellen Endnutzerzertifikate aus."
   },
   {
    "q": "Welchen Vorteil hat asymmetrische Verschlüsselung gegenüber symmetrischer?",
    "o": [
     {
      "t": "Kein sicherer Vorkanal nötig — der öffentliche Schlüssel darf frei verteilt werden",
      "ok": true
     },
     {
      "t": "Sie ist schneller",
      "ok": false
     },
     {
      "t": "Sie nutzt denselben Schlüssel für alle",
      "ok": false
     },
     {
      "t": "Sie erzeugt keine Hashes",
      "ok": false
     }
    ],
    "e": "Das zentrale Problem der Schlüsselverteilung entfällt: der Public Key kann offen geteilt werden."
   },
   {
    "q": "Was ist ein Self-Signed Certificate?",
    "o": [
     {
      "t": "Ein Zertifikat, das von seiner eigenen CA signiert wurde — kein externe Vertrauensanker",
      "ok": true
     },
     {
      "t": "Ein abgelaufenes Zertifikat",
      "ok": false
     },
     {
      "t": "Ein Zertifikat ohne Ablaufdatum",
      "ok": false
     },
     {
      "t": "Ein kostenloser Webserver",
      "ok": false
     }
    ],
    "e": "Self-Signed Certs sind für Tests/intern nützlich, werden von Browsern standardmäßig nicht vertraut."
   }
  ]
 },
 "vpn": {
  "name": "VPN & IPsec",
  "q": [
   {
    "q": "Was ist die Grundidee eines VPN?",
    "o": [
     {
      "t": "Ein verschlüsselter Tunnel durch ein unsicheres Netz",
      "ok": true
     },
     {
      "t": "Ein schnelleres LAN-Kabel",
      "ok": false
     },
     {
      "t": "Ein Ersatz für DNS",
      "ok": false
     },
     {
      "t": "Eine Firewall-Regel",
      "ok": false
     }
    ],
    "e": "VPN baut über ein öffentliches Netz einen sicheren, verschlüsselten Tunnel zum Zielnetz auf."
   },
   {
    "q": "Auf welcher OSI-Schicht arbeitet IPsec?",
    "o": [
     {
      "t": "Schicht 3 (Vermittlung/Netzwerk)",
      "ok": true
     },
     {
      "t": "Schicht 2",
      "ok": false
     },
     {
      "t": "Schicht 4",
      "ok": false
     },
     {
      "t": "Schicht 7",
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
      "t": "Das gesamte Paket inklusive neuem Header",
      "ok": false
     },
     {
      "t": "Nur den Header",
      "ok": false
     },
     {
      "t": "Gar nichts",
      "ok": false
     }
    ],
    "e": "Transportmodus schützt die Nutzdaten; der originale IP-Header bleibt sichtbar."
   },
   {
    "q": "Was verschlüsselt der IPsec-Tunnelmodus?",
    "o": [
     {
      "t": "Das komplette IP-Paket, verpackt in ein neues IP-Paket",
      "ok": true
     },
     {
      "t": "Nur die Payload",
      "ok": false
     },
     {
      "t": "Nur die Portnummer",
      "ok": false
     },
     {
      "t": "Nur den TCP-Header",
      "ok": false
     }
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
      "t": "Site-to-Site-VPN (Gateway zu Gateway)",
      "ok": true
     },
     {
      "t": "Reine Host-zu-Host-Verschlüsselung",
      "ok": false
     },
     {
      "t": "DHCP-Vergabe",
      "ok": false
     },
     {
      "t": "MAC-Filterung",
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
     {
      "t": "Geringere Kontrolle/Sicherheit für den nicht getunnelten Verkehr",
      "ok": true
     },
     {
      "t": "Es ist immer langsamer",
      "ok": false
     },
     {
      "t": "Es funktioniert ohne Verschlüsselung gar nicht",
      "ok": false
     },
     {
      "t": "Es blockiert DNS",
      "ok": false
     }
    ],
    "e": "Der direkt geroutete Verkehr entzieht sich der zentralen VPN-Kontrolle."
   },
   {
    "q": "Was ist RDP (Remote Desktop Protocol)?",
    "o": [
     {
      "t": "Ein Protokoll zur grafischen Fernsteuerung eines Rechners",
      "ok": true
     },
     {
      "t": "Ein Verschlüsselungsalgorithmus",
      "ok": false
     },
     {
      "t": "Ein Routingprotokoll",
      "ok": false
     },
     {
      "t": "Ein DNS-Record",
      "ok": false
     }
    ],
    "e": "RDP überträgt Bildschirm/Eingaben zur grafischen Fernwartung (Port 3389)."
   },
   {
    "q": "Welche Rolle hat ein Remote-Desktop-Gateway?",
    "o": [
     {
      "t": "Kontrollierter, gesicherter Zugangspunkt für RDP von außen",
      "ok": true
     },
     {
      "t": "Ein DHCP-Server",
      "ok": false
     },
     {
      "t": "Ein WLAN-Access-Point",
      "ok": false
     },
     {
      "t": "Ein DNS-Resolver",
      "ok": false
     }
    ],
    "e": "Das RD-Gateway bündelt und sichert externe RDP-Zugriffe ins interne Netz."
   },
   {
    "q": "Warum ist ein VPN über öffentliches WLAN sinnvoll?",
    "o": [
     {
      "t": "Es verschlüsselt den Verkehr gegen Mitlesen im offenen Netz",
      "ok": true
     },
     {
      "t": "Es erhöht die WLAN-Reichweite",
      "ok": false
     },
     {
      "t": "Es beschleunigt das WLAN",
      "ok": false
     },
     {
      "t": "Es ersetzt das WLAN-Passwort",
      "ok": false
     }
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
     {
      "t": "Er wird mitverschlüsselt und durch einen neuen Header ersetzt",
      "ok": true
     },
     {
      "t": "Er bleibt unverändert sichtbar",
      "ok": false
     },
     {
      "t": "Er wird gelöscht",
      "ok": false
     },
     {
      "t": "Er wird zur Portnummer",
      "ok": false
     }
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
      "t": "Zwei Rechenzentren werden gekoppelt",
      "ok": false
     },
     {
      "t": "Zwei Endgeräte direkt",
      "ok": false
     },
     {
      "t": "Ein reiner LAN-Broadcast",
      "ok": false
     }
    ],
    "e": "Site-to-End ähnelt Remote Access, mit Fokus auf eine feste Gegenstelle (Homeoffice ↔ Firmenrouter)."
   },
   {
    "q": "Was ist der Unterschied zwischen Site-to-Site und Remote-Access-VPN?",
    "o": [
     {
      "t": "Site-to-Site verbindet ganze Netze; Remote-Access einzelne Clients mit dem Firmennetz",
      "ok": true
     },
     {
      "t": "Remote-Access ist sicherer",
      "ok": false
     },
     {
      "t": "Site-to-Site ist immer unverschlüsselt",
      "ok": false
     },
     {
      "t": "Beide sind identisch",
      "ok": false
     }
    ],
    "e": "Site-to-Site: Netz↔Netz (z. B. Zentrale↔Filiale). Remote Access: Außendienstler ins Firmennetz."
   },
   {
    "q": "Welche Aussage zu IPsec im Transportmodus stimmt?",
    "o": [
     {
      "t": "Der originale IP-Header bleibt sichtbar, nur die Payload wird geschützt",
      "ok": true
     },
     {
      "t": "Das gesamte Paket inkl. Header wird verschlüsselt",
      "ok": false
     },
     {
      "t": "Kein neuer Header wird erzeugt",
      "ok": false
     },
     {
      "t": "Nur der Header wird verschlüsselt",
      "ok": false
     }
    ],
    "e": "Transportmodus = Payload geschützt, IP-Header sichtbar. Tunnelmodus = alles eingekapselt."
   },
   {
    "q": "Welche Protokolle bilden zusammen den IPsec-Standard?",
    "o": [
     {
      "t": "AH (Authentication Header) und ESP (Encapsulating Security Payload)",
      "ok": true
     },
     {
      "t": "TCP und UDP",
      "ok": false
     },
     {
      "t": "TLS und DTLS",
      "ok": false
     },
     {
      "t": "L2TP und PPTP",
      "ok": false
     }
    ],
    "e": "IPsec nutzt AH (Authentifizierung) und/oder ESP (Verschlüsselung + Authentifizierung)."
   },
   {
    "q": "Was ist L2TP?",
    "o": [
     {
      "t": "Layer 2 Tunneling Protocol — oft mit IPsec kombiniert (L2TP/IPsec)",
      "ok": true
     },
     {
      "t": "Ein Routingprotokoll",
      "ok": false
     },
     {
      "t": "Ein Verschlüsselungsalgorithmus",
      "ok": false
     },
     {
      "t": "Ein WLAN-Standard",
      "ok": false
     }
    ],
    "e": "L2TP erstellt den Tunnel (Layer 2), IPsec liefert die Verschlüsselung — oft kombiniert für VPN-Clients."
   },
   {
    "q": "Was ist OpenVPN?",
    "o": [
     {
      "t": "Ein Open-Source-VPN-Protokoll auf TLS-Basis, sehr flexibel und weit verbreitet",
      "ok": true
     },
     {
      "t": "Eine proprietäre Cisco-Lösung",
      "ok": false
     },
     {
      "t": "Ein IPsec-Profil",
      "ok": false
     },
     {
      "t": "Ein WLAN-Sicherheitsstandard",
      "ok": false
     }
    ],
    "e": "OpenVPN nutzt TLS für den Tunnel und ist plattformunabhängig und sehr konfigurierbar."
   },
   {
    "q": "Welchen Vorteil bietet Full Tunneling gegenüber Split Tunneling?",
    "o": [
     {
      "t": "Aller Verkehr läuft durch das VPN — maximale Kontrolle und Sicherheit",
      "ok": true
     },
     {
      "t": "Schnelleres Internet durch direkten Weg",
      "ok": false
     },
     {
      "t": "Geringere Last auf dem VPN-Server",
      "ok": false
     },
     {
      "t": "Keine Verschlüsselung nötig",
      "ok": false
     }
    ],
    "e": "Full Tunnel bietet vollständige Überwachung und Filterung — aber höhere Last auf dem VPN-Gateway."
   },
   {
    "q": "Was ist ein Kill Switch bei einem VPN-Client?",
    "o": [
     {
      "t": "Blockiert automatisch den Internetzugriff, falls die VPN-Verbindung abbricht",
      "ok": true
     },
     {
      "t": "Beendet das VPN nach fester Zeit",
      "ok": false
     },
     {
      "t": "Schaltet zwischen mehreren Servern um",
      "ok": false
     },
     {
      "t": "Trennt WLAN und LAN",
      "ok": false
     }
    ],
    "e": "Der Kill Switch verhindert, dass bei VPN-Abbruch unverschlüsselter Verkehr unbemerkt ins offene Netz geht."
   },
   {
    "q": "Was beschreibt 'Split DNS' im VPN-Kontext?",
    "o": [
     {
      "t": "Interne Domainnamen werden intern aufgelöst, externe über den normalen DNS",
      "ok": true
     },
     {
      "t": "DNS wird vollständig deaktiviert",
      "ok": false
     },
     {
      "t": "Alle DNS-Anfragen gehen durch den VPN-Tunnel",
      "ok": false
     },
     {
      "t": "Ein Backup-DNS",
      "ok": false
     }
    ],
    "e": "Split DNS kombiniert sich oft mit Split Tunneling: interne Namen werden über den Tunnel aufgelöst."
   },
   {
    "q": "Was ist IKEv2?",
    "o": [
     {
      "t": "Eine modernere, schnellere Version des IKE-Schlüsselaustauschprotokolls für IPsec",
      "ok": true
     },
     {
      "t": "Ein WLAN-Sicherheitsstandard",
      "ok": false
     },
     {
      "t": "Ein Routing-Protokoll",
      "ok": false
     },
     {
      "t": "Ein Firewall-Typ",
      "ok": false
     }
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
   }
  ]
 },
 "security": {
  "name": "IT-Sicherheit Grundlagen",
  "q": [
   {
    "q": "Was ist die Hauptaufgabe einer Firewall?",
    "o": [
     {
      "t": "Netzwerkverkehr nach Regeln filtern und kontrollieren",
      "ok": true
     },
     {
      "t": "IP-Adressen vergeben",
      "ok": false
     },
     {
      "t": "Namen auflösen",
      "ok": false
     },
     {
      "t": "Kabel verbinden",
      "ok": false
     }
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
     {
      "t": "Sie verfolgt den Verbindungszustand und lässt Antworten passieren",
      "ok": true
     },
     {
      "t": "Sie betrachtet jedes Paket isoliert",
      "ok": false
     },
     {
      "t": "Sie ersetzt den Router",
      "ok": false
     },
     {
      "t": "Sie vergibt IP-Adressen",
      "ok": false
     }
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
      "t": "Ja, es verschlüsselt den Verkehr",
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
     {
      "t": "Ein abgetrennter Bereich für öffentlich erreichbare Server",
      "ok": true
     },
     {
      "t": "Ein Verschlüsselungsverfahren",
      "ok": false
     },
     {
      "t": "Ein WLAN-Kanal",
      "ok": false
     },
     {
      "t": "Ein DNS-Record",
      "ok": false
     }
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
      "t": "Nachweis der Identität (z. B. per Passwort)",
      "ok": true
     },
     {
      "t": "Vergabe von Berechtigungen",
      "ok": false
     },
     {
      "t": "Verschlüsselung von Daten",
      "ok": false
     },
     {
      "t": "Namensauflösung",
      "ok": false
     }
    ],
    "e": "Authentifizierung = Identität nachweisen; davon getrennt ist die Autorisierung (Rechtevergabe)."
   },
   {
    "q": "Was bedeutet Autorisierung?",
    "o": [
     {
      "t": "Festlegen, worauf eine authentifizierte Identität zugreifen darf",
      "ok": true
     },
     {
      "t": "Der Nachweis der Identität",
      "ok": false
     },
     {
      "t": "Die Verschlüsselung",
      "ok": false
     },
     {
      "t": "Die IP-Vergabe",
      "ok": false
     }
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
      "t": "Zwei Passwörter hintereinander",
      "ok": false
     },
     {
      "t": "Zwei Firewalls",
      "ok": false
     },
     {
      "t": "Zwei IP-Adressen",
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
     {
      "t": "Alles ist erlaubt außer den ausdrücklich gesperrten Elementen",
      "ok": true
     },
     {
      "t": "Nur Erlaubtes wird zugelassen",
      "ok": false
     },
     {
      "t": "Eine Liste der Administratoren",
      "ok": false
     },
     {
      "t": "Eine Sperrliste für Zertifikate",
      "ok": false
     }
    ],
    "e": "Blacklist = 'default allow', nur Gelistetes wird blockiert."
   },
   {
    "q": "Warum ist eine reine MAC-Filterung als Schutz schwach?",
    "o": [
     {
      "t": "MAC-Adressen lassen sich fälschen (Spoofing)",
      "ok": true
     },
     {
      "t": "MAC-Adressen sind verschlüsselt",
      "ok": false
     },
     {
      "t": "Es gibt zu wenige MAC-Adressen",
      "ok": false
     },
     {
      "t": "MAC-Filter kosten zu viel",
      "ok": false
     }
    ],
    "e": "MAC-Spoofing umgeht den Filter leicht — nur als schwache Zusatzmaßnahme geeignet."
   },
   {
    "q": "Was ist Social Engineering?",
    "o": [
     {
      "t": "Manipulation von Menschen zur Preisgabe von Informationen",
      "ok": true
     },
     {
      "t": "Ein Verschlüsselungsverfahren",
      "ok": false
     },
     {
      "t": "Ein Routingprotokoll",
      "ok": false
     },
     {
      "t": "Eine Firewall-Technik",
      "ok": false
     }
    ],
    "e": "Social Engineering zielt auf den Menschen, nicht auf die Technik (z. B. Phishing)."
   },
   {
    "q": "Was ist das Ziel von Netzwerksegmentierung?",
    "o": [
     {
      "t": "Bereiche trennen, um Angriffe einzudämmen und Zugriffe zu steuern",
      "ok": true
     },
     {
      "t": "Die Bandbreite erhöhen",
      "ok": false
     },
     {
      "t": "IP-Adressen zu sparen",
      "ok": false
     },
     {
      "t": "DNS zu beschleunigen",
      "ok": false
     }
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
     {
      "t": "Authentifizierung prüft die Identität; Autorisierung prüft die Berechtigung",
      "ok": true
     },
     {
      "t": "Beide bedeuten dasselbe",
      "ok": false
     },
     {
      "t": "Autorisierung kommt vor der Authentifizierung",
      "ok": false
     },
     {
      "t": "Authentifizierung vergibt Rechte",
      "ok": false
     }
    ],
    "e": "Erst Identität beweisen (Authentifizierung), dann Rechte prüfen (Autorisierung). AAA = Authentication, Authorization, Accounting."
   },
   {
    "q": "Was ist ein Penetrationstest?",
    "o": [
     {
      "t": "Ein autorisierter, simulierter Angriff zur Aufdeckung von Schwachstellen",
      "ok": true
     },
     {
      "t": "Ein automatischer Virenscan",
      "ok": false
     },
     {
      "t": "Eine Firewall-Konfiguration",
      "ok": false
     },
     {
      "t": "Ein Backup-Test",
      "ok": false
     }
    ],
    "e": "Pentests simulieren echte Angriffstechniken mit Erlaubnis des Betreibers, um Schwachstellen vor echten Angreifern zu finden."
   },
   {
    "q": "Was ist eine Stateful Firewall gegenüber einem Paketfilter?",
    "o": [
     {
      "t": "Sie verfolgt Verbindungszustände und lässt legitime Antwortpakete automatisch durch",
      "ok": true
     },
     {
      "t": "Sie analysiert Anwendungsinhalte",
      "ok": false
     },
     {
      "t": "Sie ist langsamer und unsicherer",
      "ok": false
     },
     {
      "t": "Sie filtert nur eingehenden Verkehr",
      "ok": false
     }
    ],
    "e": "Stateful Inspection kennt den Verbindungskontext — ein Antwortpaket auf eine erlaubte Anfrage wird automatisch zugelassen."
   },
   {
    "q": "Welche drei Faktoren kann 2FA kombinieren?",
    "o": [
     {
      "t": "Wissen (Passwort), Besitz (Token), Biometrie (Fingerabdruck)",
      "ok": true
     },
     {
      "t": "Passwort, PIN und weiteres Passwort",
      "ok": false
     },
     {
      "t": "IP-Adresse, MAC und Port",
      "ok": false
     },
     {
      "t": "Benutzername, Passwort und E-Mail",
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
     {
      "t": "Das interne Netz, falls ein öffentlicher Server kompromittiert wird",
      "ok": true
     },
     {
      "t": "Den öffentlichen Server vor Angriffen",
      "ok": false
     },
     {
      "t": "Die Internetverbindung",
      "ok": false
     },
     {
      "t": "Den DNS-Server",
      "ok": false
     }
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
     {
      "t": "Ein absichtlich verwundbares System, das Angreifer anlocken und ihr Verhalten analysieren soll",
      "ok": true
     },
     {
      "t": "Ein Passwort-Safe",
      "ok": false
     },
     {
      "t": "Eine Firewall-Regel",
      "ok": false
     },
     {
      "t": "Ein Backup-System",
      "ok": false
     }
    ],
    "e": "Ein Honeypot simuliert ein echtes System, um Angreifer abzulenken und deren Methoden zu beobachten."
   },
   {
    "q": "Was ist Phishing?",
    "o": [
     {
      "t": "Täuschende E-Mails oder Webseiten, die Zugangsdaten stehlen wollen",
      "ok": true
     },
     {
      "t": "Ein Netzwerkscan",
      "ok": false
     },
     {
      "t": "Ein Verschlüsselungsangriff",
      "ok": false
     },
     {
      "t": "Ein DoS-Angriff",
      "ok": false
     }
    ],
    "e": "Phishing ist eine Form des Social Engineering per E-Mail oder gefälschter Website."
   },
   {
    "q": "Was unterscheidet IDS von IPS?",
    "o": [
     {
      "t": "IDS erkennt und meldet; IPS greift zusätzlich aktiv ein und blockiert",
      "ok": true
     },
     {
      "t": "IPS erkennt nur, IDS blockiert",
      "ok": false
     },
     {
      "t": "Beide sind identisch",
      "ok": false
     },
     {
      "t": "IDS ist neuer",
      "ok": false
     }
    ],
    "e": "IDS = Intrusion Detection System (passiv). IPS = Intrusion Prevention System (aktiv eingreifend)."
   },
   {
    "q": "Was ist ein Zero-Day-Exploit?",
    "o": [
     {
      "t": "Ein Angriff auf eine noch nicht öffentlich bekannte oder gepatchte Schwachstelle",
      "ok": true
     },
     {
      "t": "Ein Angriff, der an Tag 0 gestartet wird",
      "ok": false
     },
     {
      "t": "Ein täglich wiederkehrender Angriff",
      "ok": false
     },
     {
      "t": "Ein Angriff ohne Schaden",
      "ok": false
     }
    ],
    "e": "Zero-Day bedeutet: der Hersteller hat 0 Tage Zeit gehabt, einen Patch bereitzustellen."
   },
   {
    "q": "Warum ist regelmäßiges Patching ein Sicherheitsgrundpfeiler?",
    "o": [
     {
      "t": "Es schließt bekannte Schwachstellen, bevor sie ausgenutzt werden",
      "ok": true
     },
     {
      "t": "Es erhöht die Übertragungsgeschwindigkeit",
      "ok": false
     },
     {
      "t": "Es ersetzt die Firewall",
      "ok": false
     },
     {
      "t": "Es verhindert Social Engineering",
      "ok": false
     }
    ],
    "e": "Ungepatchte Systeme sind das häufigste Einfallstor für Angreifer — Patching ist die effektivste Basismaßnahme."
   },
   {
    "q": "Was ist Ransomware?",
    "o": [
     {
      "t": "Schadsoftware, die Daten verschlüsselt und Lösegeld fordert",
      "ok": true
     },
     {
      "t": "Ein Spionageprogramm",
      "ok": false
     },
     {
      "t": "Ein Netzwerkscanner",
      "ok": false
     },
     {
      "t": "Eine Firewall-Umgehung",
      "ok": false
     }
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
      "t": "Service Set Identifier – der Name des WLANs",
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
     {
      "t": "Er stellt das WLAN bereit und verbindet Funkgeräte mit dem Netz",
      "ok": true
     },
     {
      "t": "Er vergibt öffentliche IP-Adressen",
      "ok": false
     },
     {
      "t": "Er ersetzt den DNS-Server",
      "ok": false
     },
     {
      "t": "Er routet zwischen Providern",
      "ok": false
     }
    ],
    "e": "Der AP ist die Funkzentrale und bindet WLAN-Geräte ans (meist kabelgebundene) Netz an."
   },
   {
    "q": "Welche Frequenzbänder nutzt WLAN klassisch?",
    "o": [
     {
      "t": "2,4 GHz und 5 GHz (neu: 6 GHz mit Wi-Fi 6E)",
      "ok": true
     },
     {
      "t": "900 MHz und 1,8 GHz",
      "ok": false
     },
     {
      "t": "nur 2,4 GHz",
      "ok": false
     },
     {
      "t": "10 GHz und 60 GHz",
      "ok": false
     }
    ],
    "e": "Üblich sind 2,4 und 5 GHz; Wi-Fi 6E ergänzt das 6-GHz-Band."
   },
   {
    "q": "Welcher Vorteil kennzeichnet das 2,4-GHz-Band?",
    "o": [
     {
      "t": "Höhere Reichweite und bessere Wanddurchdringung",
      "ok": true
     },
     {
      "t": "Höchste Geschwindigkeit",
      "ok": false
     },
     {
      "t": "Keine Störungen",
      "ok": false
     },
     {
      "t": "Mehr Kanäle ohne Überlappung",
      "ok": false
     }
    ],
    "e": "2,4 GHz reicht weiter und durchdringt Wände besser, ist aber langsamer und störanfälliger."
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
      "t": "IEEE 802.11 (z. B. n, ac, ax)",
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
     {
      "t": "Geräte kommunizieren über einen zentralen Access Point",
      "ok": true
     },
     {
      "t": "Geräte kommunizieren direkt ohne AP",
      "ok": false
     },
     {
      "t": "Es gibt keine SSID",
      "ok": false
     },
     {
      "t": "Nur Kabelbetrieb",
      "ok": false
     }
    ],
    "e": "Infrastrukturmodus: alle Geräte laufen über den AP (typisch für Heim/Firma)."
   },
   {
    "q": "Was kennzeichnet den Ad-hoc-Modus?",
    "o": [
     {
      "t": "Geräte kommunizieren direkt miteinander, ohne Access Point",
      "ok": true
     },
     {
      "t": "Alles läuft über einen zentralen AP",
      "ok": false
     },
     {
      "t": "Es ist immer verschlüsselt",
      "ok": false
     },
     {
      "t": "Nur mit Kabel möglich",
      "ok": false
     }
    ],
    "e": "Ad-hoc verbindet Geräte direkt, z. B. für temporäre Verbindungen."
   },
   {
    "q": "Welches WLAN-Sicherheitsverfahren ist heute Mindeststandard?",
    "o": [
     {
      "t": "WPA2 (besser WPA3)",
      "ok": true
     },
     {
      "t": "WEP",
      "ok": false
     },
     {
      "t": "Gar keine Verschlüsselung",
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
     {
      "t": "Personal nutzt einen gemeinsamen PSK, Enterprise authentifiziert je Nutzer über RADIUS",
      "ok": true
     },
     {
      "t": "Enterprise ist unverschlüsselt",
      "ok": false
     },
     {
      "t": "Personal braucht einen RADIUS-Server",
      "ok": false
     },
     {
      "t": "Es gibt keinen Unterschied",
      "ok": false
     }
    ],
    "e": "Personal = ein Passwort für alle (PSK); Enterprise = individuelle Anmeldung über RADIUS."
   },
   {
    "q": "Welche Rolle spielt ein RADIUS-Server im WLAN?",
    "o": [
     {
      "t": "Zentrale Authentifizierung einzelner Nutzer (Enterprise)",
      "ok": true
     },
     {
      "t": "Er vergibt SSIDs",
      "ok": false
     },
     {
      "t": "Er verstärkt das Funksignal",
      "ok": false
     },
     {
      "t": "Er ersetzt den Access Point",
      "ok": false
     }
    ],
    "e": "RADIUS prüft Benutzeranmeldungen zentral, z. B. per Login oder Zertifikat."
   },
   {
    "q": "Welchen Vorteil bietet WPA3 gegenüber WPA2?",
    "o": [
     {
      "t": "Besserer Schutz gegen Wörterbuch-/Brute-Force-Angriffe",
      "ok": true
     },
     {
      "t": "Größere Reichweite",
      "ok": false
     },
     {
      "t": "Höhere Sendeleistung",
      "ok": false
     },
     {
      "t": "Keine Verschlüsselung nötig",
      "ok": false
     }
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
      "t": "Über ein eigenes VLAN / getrenntes Netzsegment",
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
     {
      "t": "Um Überlappungen und Störungen mit Nachbarnetzen zu vermeiden",
      "ok": true
     },
     {
      "t": "Um die SSID zu verstecken",
      "ok": false
     },
     {
      "t": "Um IP-Adressen zu sparen",
      "ok": false
     },
     {
      "t": "Um WPA3 zu aktivieren",
      "ok": false
     }
    ],
    "e": "Im engen 2,4-GHz-Band überlappen Kanäle leicht; saubere Kanalwahl reduziert Störungen."
   },
   {
    "q": "Was ist ein Mesh-WLAN?",
    "o": [
     {
      "t": "Mehrere APs bilden ein nahtloses Funknetz mit gemeinsamer SSID",
      "ok": true
     },
     {
      "t": "Ein einzelner sehr starker Router",
      "ok": false
     },
     {
      "t": "Ein Kabelnetz ohne Funk",
      "ok": false
     },
     {
      "t": "Ein VPN-Typ",
      "ok": false
     }
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
      "t": "Höhere Sicherheit von Haus aus",
      "ok": false
     },
     {
      "t": "Immer höhere Geschwindigkeit",
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
      "t": "Hindernisse/Wände, Störquellen und Frequenzband",
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
      "t": "Die IP-Adresse",
      "ok": false
     }
    ],
    "e": "Bausubstanz, Störquellen und das gewählte Band bestimmen Reichweite und Qualität."
   },
   {
    "q": "Warum sollte ein Access Point möglichst zentral und hoch platziert werden?",
    "o": [
     {
      "t": "Für gleichmäßige Ausleuchtung und weniger Abschattung",
      "ok": true
     },
     {
      "t": "Um die SSID zu verbergen",
      "ok": false
     },
     {
      "t": "Um Strom zu sparen",
      "ok": false
     },
     {
      "t": "Um die MAC zu ändern",
      "ok": false
     }
    ],
    "e": "Zentrale, hohe Platzierung minimiert Funklöcher und Hindernisse."
   },
   {
    "q": "Was ist WPS und warum ist es problematisch?",
    "o": [
     {
      "t": "Wi-Fi Protected Setup — vereinfacht WLAN-Einrichtung, hat aber bekannte Sicherheitslücken",
      "ok": true
     },
     {
      "t": "Ein neuer Verschlüsselungsstandard",
      "ok": false
     },
     {
      "t": "Ein WLAN-Kanal",
      "ok": false
     },
     {
      "t": "Ein Zugriffsprotokoll",
      "ok": false
     }
    ],
    "e": "WPS PIN-Methode ist durch Brute-Force-Angriffe kompromittiert — sollte deaktiviert sein."
   },
   {
    "q": "Was ist der Unterschied zwischen 2,4 GHz und 5 GHz WLAN?",
    "o": [
     {
      "t": "2,4 GHz: größere Reichweite, störanfälliger; 5 GHz: schneller, kürzere Reichweite",
      "ok": true
     },
     {
      "t": "5 GHz hat größere Reichweite",
      "ok": false
     },
     {
      "t": "Beide sind identisch",
      "ok": false
     },
     {
      "t": "2,4 GHz ist immer schneller",
      "ok": false
     }
    ],
    "e": "2,4 GHz durchdringt Wände besser; 5 GHz bietet mehr Kanäle und höhere Datenraten."
   },
   {
    "q": "Was ist ein Wireless Controller?",
    "o": [
     {
      "t": "Zentrales Gerät zur Verwaltung mehrerer Access Points",
      "ok": true
     },
     {
      "t": "Ein WLAN-Router für Heimnetze",
      "ok": false
     },
     {
      "t": "Ein WLAN-Verstärker",
      "ok": false
     },
     {
      "t": "Ein Frequenzfilter",
      "ok": false
     }
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
     {
      "t": "Zwei Clients können sich gegenseitig nicht hören und senden gleichzeitig zum AP — Kollision",
      "ok": true
     },
     {
      "t": "Ein verstecktes WLAN",
      "ok": false
     },
     {
      "t": "Ein unsichtbarer Access Point",
      "ok": false
     },
     {
      "t": "Eine versteckte SSID",
      "ok": false
     }
    ],
    "e": "Beim Hidden-Node-Problem kollidieren Pakete am AP, weil die Sender sich nicht gegenseitig wahrnehmen. CSMA/CA mit RTS/CTS lindert das."
   },
   {
    "q": "Was ist Band Steering?",
    "o": [
     {
      "t": "Automatische Umleitung dual-band-fähiger Clients auf das 5-GHz-Band",
      "ok": true
     },
     {
      "t": "Verstärken des Signals",
      "ok": false
     },
     {
      "t": "Kanalwechsel bei Störung",
      "ok": false
     },
     {
      "t": "Eine Sicherheitsfunktion",
      "ok": false
     }
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
     {
      "t": "Die SSID wird nicht gesendet — bietet minimalen Schutz, da sie per Sniffer auslesbar ist",
      "ok": true
     },
     {
      "t": "Macht das Netz vollständig unsichtbar und sicher",
      "ok": false
     },
     {
      "t": "Ersetzt WPA3",
      "ok": false
     },
     {
      "t": "Verhindert MAC-Spoofing",
      "ok": false
     }
    ],
    "e": "SSID-Hiding ist Security through Obscurity — ein Sniffer findet das Netz trotzdem in Probe-Requests."
   },
   {
    "q": "Was ist der Unterschied zwischen WPA2-Personal und WPA3-Personal?",
    "o": [
     {
      "t": "WPA3 nutzt SAE statt PSK — besser gegen Wörterbuchangriffe",
      "ok": true
     },
     {
      "t": "WPA2 ist sicherer",
      "ok": false
     },
     {
      "t": "WPA3 benötigt einen RADIUS-Server",
      "ok": false
     },
     {
      "t": "Beide sind identisch",
      "ok": false
     }
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
    "q": "Wie viele Ringe nutzt FDDI physisch?",
    "o": [
     {
      "t": "Zwei gegenläufige Ringe",
      "ok": true
     },
     {
      "t": "Einen Ring",
      "ok": false
     },
     {
      "t": "Drei Ringe",
      "ok": false
     },
     {
      "t": "Keinen Ring, nur Sterne",
      "ok": false
     }
    ],
    "e": "Haupt- und Hilfsring laufen in entgegengesetzte Richtungen."
   },
   {
    "q": "Was passiert bei FDDI im Fehlerfall (Kabelbruch)?",
    "o": [
     {
      "t": "Wrap: beide Ringe werden kurzgeschlossen, Betrieb läuft weiter",
      "ok": true
     },
     {
      "t": "Das gesamte Netz fällt sofort aus",
      "ok": false
     },
     {
      "t": "Alle Pakete werden neu verschlüsselt",
      "ok": false
     },
     {
      "t": "Der Token wird gelöscht",
      "ok": false
     }
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
      "t": "Reserve/zusätzliche Kapazität, läuft leer mit",
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
     {
      "t": "Ein elektronischer Stafettenstab, der im Kreis wandert",
      "ok": true
     },
     {
      "t": "Eine IP-Adresse",
      "ok": false
     },
     {
      "t": "Eine Prüfsumme",
      "ok": false
     },
     {
      "t": "Ein Zeitstempel",
      "ok": false
     }
    ],
    "e": "Der Token zirkuliert; nur wer ihn hält, darf senden."
   },
   {
    "q": "Warum galt FDDI als sehr ausfallsicher?",
    "o": [
     {
      "t": "Durch die Doppelring-Struktur mit Wrap-Mechanismus",
      "ok": true
     },
     {
      "t": "Durch Verschlüsselung",
      "ok": false
     },
     {
      "t": "Durch hohe TTL-Werte",
      "ok": false
     },
     {
      "t": "Durch Broadcasts",
      "ok": false
     }
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
     {
      "t": "Ausfall eines Endgeräts betrifft die anderen nicht; einfache Fehlersuche",
      "ok": true
     },
     {
      "t": "Geringster Kabelaufwand",
      "ok": false
     },
     {
      "t": "Kein zentrales Gerät nötig",
      "ok": false
     },
     {
      "t": "Keine Kollisionen möglich",
      "ok": false
     }
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
     {
      "t": "Jedes mit genau zwei Nachbarn zu einem geschlossenen Kreis",
      "ok": true
     },
     {
      "t": "Alle an einem zentralen Switch",
      "ok": false
     },
     {
      "t": "Jeder mit jedem",
      "ok": false
     },
     {
      "t": "An einem gemeinsamen Buskabel",
      "ok": false
     }
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
      "t": "256 (0–255)",
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
      "t": "512",
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
      "t": "8 Bit",
      "ok": false
     },
     {
      "t": "2 Bit",
      "ok": false
     },
     {
      "t": "16 Bit",
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
      "t": "64",
      "ok": false
     },
     {
      "t": "256",
      "ok": false
     },
     {
      "t": "255",
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
     {
      "t": "Kürzere Schreibweise, 4 Bit pro Stelle, leicht umrechenbar",
      "ok": true
     },
     {
      "t": "Weil es Basis 10 ist",
      "ok": false
     },
     {
      "t": "Weil Computer intern hex rechnen",
      "ok": false
     },
     {
      "t": "Weil es keine Buchstaben nutzt",
      "ok": false
     }
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
    "q": "Wie viele Bit hat ein 32-Bit-Wert wie eine IPv4-Adresse?",
    "o": [
     {
      "t": "32",
      "ok": true
     },
     {
      "t": "16",
      "ok": false
     },
     {
      "t": "64",
      "ok": false
     },
     {
      "t": "8",
      "ok": false
     }
    ],
    "e": "IPv4 = 32 Bit = 4 Byte = 4 Oktette."
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
      "t": "Sie kehrt den Eingang um (0→1, 1→0)",
      "ok": true
     },
     {
      "t": "Sie verknüpft zwei Eingänge",
      "ok": false
     },
     {
      "t": "Sie liefert immer 1",
      "ok": false
     },
     {
      "t": "Sie addiert zwei Bits",
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
      "t": "Negiertes AND (NOT + AND)",
      "ok": true
     },
     {
      "t": "Negiertes OR",
      "ok": false
     },
     {
      "t": "Dasselbe wie XOR",
      "ok": false
     },
     {
      "t": "Ein doppeltes AND",
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
      "t": "Negiertes OR (NOT + OR)",
      "ok": true
     },
     {
      "t": "Negiertes AND",
      "ok": false
     },
     {
      "t": "Dasselbe wie XOR",
      "ok": false
     },
     {
      "t": "Ein doppeltes OR",
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
      "t": "AND filtert mit der Maske gezielt den Netzanteil heraus",
      "ok": true
     },
     {
      "t": "OR wäre zu langsam",
      "ok": false
     },
     {
      "t": "AND verschlüsselt die Adresse",
      "ok": false
     },
     {
      "t": "OR funktioniert nur mit IPv6",
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
    "q": "Welche logische Verknüpfung prüft auf Parität (gerade Anzahl von Einsen)?",
    "o": [
     {
      "t": "XOR (mehrere Eingänge)",
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
    "e": "XOR über mehrere Bits ergibt 1 bei ungerader Einsenanzahl — Grundlage der Paritätsprüfung."
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

function finishRun(){
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

// ---- Navbar: beim Runterscrollen kollabieren, beim Hochscrollen/Tippen aufklappen ----
let lastScrollY = window.scrollY;
let ticking = false;
const COLLAPSE_AFTER = 120; // erst ab dieser Scrolltiefe kollabieren
function onScroll(){
  const y = window.scrollY;
  if(y > lastScrollY && y > COLLAPSE_AFTER){
    tabBar.classList.add('collapsed');      // runter -> minimieren
  } else if(y < lastScrollY){
    tabBar.classList.remove('collapsed');   // hoch -> wieder zeigen
  }
  lastScrollY = y;
  ticking = false;
}
window.addEventListener('scroll', () => {
  if(!ticking){ window.requestAnimationFrame(onScroll); ticking = true; }
}, {passive:true});
// Antippen der kollabierten Leiste klappt sie wieder auf.
tabBar.addEventListener('click', () => {
  if(tabBar.classList.contains('collapsed')) tabBar.classList.remove('collapsed');
});

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
{"a":"WPS","f":"Wi-Fi Protected Setup","d":"Vereinfachte WLAN-Einrichtung per PIN oder Knopfdruck. Die PIN-Methode ist unsicher und sollte deaktiviert werden."}];

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
