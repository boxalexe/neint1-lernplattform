/*
 * Praxis-Szenarien, sprachneutral. Alle Kurse nutzen dieselben Stammdaten, damit ein Beispiel in Java, Python oder C#
 * dieselbe Geschichte erzählt. Preise in Cent (ganze Zahlen), weil Kommazahlen bei Geld Rundungsfehler erzeugen.
 * Eine Lektion verweist mit domain: 'shop' | 'login' | 'tickets' darauf; das Szenario steht dann über der Lektion.
 */
(function () {
  'use strict';
  const A = window.Academy;
  A.domains = {
    shop: {
      title: 'Onlineshop',
      text: 'Ein kleiner Onlineshop für IT-Zubehör: Artikel mit Preis und Lagerbestand, ein Warenkorb, Rabatte und Versandkosten. Ab 50 Euro ist der Versand kostenlos.',
      artikel: [
        { nr: 1001, name: 'USB-C-Kabel', preisCent: 999, lager: 120 },
        { nr: 1002, name: 'Funkmaus', preisCent: 1999, lager: 35 },
        { nr: 1003, name: 'Tastatur', preisCent: 4950, lager: 0 },
        { nr: 1004, name: 'Monitor 27 Zoll', preisCent: 22900, lager: 8 },
        { nr: 1005, name: 'Headset', preisCent: 3490, lager: 14 }
      ],
      versandfreiAbCent: 5000, versandCent: 495
    },
    login: {
      title: 'Benutzerverwaltung',
      text: 'Anmeldung an einer Firmensoftware: Benutzer mit Rollen (Admin, Mitarbeiter, Gast). Nach drei falschen Passwörtern wird das Konto gesperrt.',
      benutzer: [
        { name: 'admin', rolle: 'ADMIN' },
        { name: 'm.weber', rolle: 'MITARBEITER' },
        { name: 'gast', rolle: 'GAST' }
      ],
      maxVersuche: 3
    },
    tickets: {
      title: 'IT-Ticketsystem',
      text: 'Ein Service-Desk: Störungen kommen als Tickets mit Priorität (1 = kritisch bis 4 = niedrig) und Status (offen, in Arbeit, erledigt) und werden Technikern zugewiesen.',
      tickets: [
        { id: 501, titel: 'Drucker druckt nicht', prio: 3, status: 'offen' },
        { id: 502, titel: 'Server nicht erreichbar', prio: 1, status: 'in Arbeit' },
        { id: 503, titel: 'Passwort vergessen', prio: 4, status: 'erledigt' },
        { id: 504, titel: 'VPN bricht ab', prio: 2, status: 'offen' }
      ]
    }
  };
})();
