// Quellen: docs/INHALTE.md §3 (Selam Opera!, Pop-Up-Clips) und §4 (Presse/Preis).
// Pop-Up-Opera und Operndolmuş werden laut D-017 als ein Projekt geführt.
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'selam-opera',
  title: 'Selam Opera!',
  subtitle: { en: 'Pop-up opera & Operndolmuş · Participatory format / outreach', de: 'Pop-Up-Opera & Operndolmuş · Partizipatives Format / Outreach' },
  venue: 'Komische Oper Berlin',
  year: 2015,
  yearLabel: '2015–2022',
  pillar: 'participate',
  role: { en: 'Creative Director & Stage Director', de: 'Creative Director & Regie' },
  tags: { en: ['Pop-up opera', 'Intercultural', 'Public space'], de: ['Pop-Up-Opera', 'Interkulturell', 'Öffentlicher Raum'] },
  cover: {
    // Operndolmuş-Abfahrt aus dem Dokumentarfilm „Eine Opernreise“ (D-053)
    type: 'video',
    src: '/media/selam-opera/cover.mp4',
    poster: '/media/selam-opera/cover-poster.jpg',
    alt: {
      en: 'The Operndolmuş minibus with the lettering “Selam Opera!” sets off; a singer waves from the window, water is poured after it.',
      de: 'Der Operndolmuş mit der Aufschrift „Selam Opera!“ fährt los, eine Sängerin winkt aus dem Fenster, hinterher wird Wasser gegossen.',
    },
    width: 576,
    height: 720,
    credit: 'Film: Komische Oper Berlin',
  },
  intro: {
    en: [
      'With its pop-up opera, Selam Opera! took opera out of the house and into the city: singers and musicians of the Komische Oper Berlin performed short pop-up scenes on markets, in a boxing club, a nightclub and other everyday places. The creative team in those years: Mustafa Akça (artistic director), Anisha Bondy (creative director and stage director), Oliver Brandt, Johanna Wall, Peter Tomek and Heinz und Horst Filmproduktion.',
      'Its best-known chapter is the Operndolmuş. In 2016 Anisha Bondy and Johanna Wall conceived this pioneering work: a minibus full of music on the historical route of the Turkish “guest worker” generation from Berlin to Istanbul. With performances and stories shared by contemporary witnesses in Berlin, Munich, Vienna, Belgrade, Sofia and Istanbul, it became an unforgettable, real journey – awarded the BKM Prize for Cultural Education in 2017.',
      'The Operndolmuş toured several times: “Gastarbeiterroute” (2016), “In zwei Heimaten zu Hause” (At Home in Two Homelands, 2016–2019) and “Kesin Dönüş” (Final Return, 2019–2020). In 2018 it also premiered “Ben und Henry – ein Operndolmuş für Kinder”, an Operndolmuş for children, with music by Attila Kadri Şendil and libretto by Susanne Wolf.',
      'The large-scale project Selam Opera! was launched with important sponsors under Andreas Homoki and Susanne Moser in Homoki’s last season as artistic director, 2011/12, and was developed further by Barrie Kosky, Susanne Moser and Ulrich Lenz. Since 2012 it has been run by Mustafa Akça, who in 2024 was awarded the Federal Cross of Merit for his many years of work for the city through Selam Opera!.',
    ],
    de: [
      'Selam Opera! holte mit der Pop-Up-Opera die Oper aus dem Haus und brachte sie in die Stadt: Sänger:innen und Musiker:innen der Komischen Oper Berlin bespielten mit kurzen Pop-Up-Szenen Märkte, einen Boxclub, einen Nachtclub und andere Alltagsorte. Kreativteam in dieser Zeit: Mustafa Akça (künstlerische Leitung), Anisha Bondy (Creative Director und Regie), Oliver Brandt, Johanna Wall, Peter Tomek und Heinz und Horst Filmproduktion.',
      'Das bekannteste Kapitel ist der Operndolmuş. 2016 konzipierte Anisha Bondy mit Johanna Wall diese Pionierarbeit: einen Kleinbus voller Musik auf der historischen Route der türkischen „Gastarbeiter“-Generation von Berlin nach Istanbul. Mit Auftritten und geteilten Geschichten von Zeitzeug:innen in Berlin, München, Wien, Belgrad, Sofia und Istanbul entstand eine unvergessliche, echte Reise – ausgezeichnet mit dem BKM-Preis Kulturelle Bildung 2017.',
      'Der Operndolmuş fuhr mehrfach: „Gastarbeiterroute“ (2016), „In zwei Heimaten zu Hause“ (2016–2019) und „Kesin Dönüş“ (2019–2020). 2018 feierte außerdem „Ben und Henry – ein Operndolmuş für Kinder“ Uraufführung, mit Musik von Attila Kadri Şendil und Libretto von Susanne Wolf.',
      'Das Großprojekt Selam Opera! wurde unter Andreas Homoki und Susanne Moser in Homokis letzter Spielzeit als Intendant, 2011/12, zusammen mit wichtigen Sponsoren ins Leben gerufen und von Barrie Kosky, Susanne Moser und Ulrich Lenz weiterentwickelt. Seit 2012 leitet es Mustafa Akça, der 2024 für sein langjähriges Wirken für die Stadt durch Selam Opera! mit dem Bundesverdienstkreuz ausgezeichnet wurde.',
    ],
  },
  videos: [
    { provider: 'youtube', id: 'ne6MrSY6MhM', title: { en: 'Operndolmuş – Eine Opernreise (documentary)', de: 'Operndolmuş – Eine Opernreise (Dokumentarfilm)' } },
    { provider: 'youtube', id: 'AriBiymQ0og', title: 'Carmen in Kreuzberg' },
    { provider: 'youtube', id: 'SR1GJEFUYUc', title: 'Ring frei für Helena!' },
    { provider: 'youtube', id: 'lB0Du1RbrOI', title: 'Super-Sexy-Operetten-Bingo!' },
    { provider: 'youtube', id: 'uSaaIqZlElE', title: 'Wieder auf dem Markt – Don Giovanni' },
    { provider: 'youtube', id: '9Lr_72Xr2IQ', title: 'Il barbiere di Berlino' },
    { provider: 'youtube', id: '0SAoUPD4ndA', title: 'Jahrmarktstimmung' },
    { provider: 'youtube', id: 'hjzsxtkf3L0', title: 'Bahn im Savoy' },
    { provider: 'youtube', id: 'NxJCkLNKnXg', title: 'Oh my goddess!' },
  ],
  credits: [
    { role: { en: 'Artistic Director', de: 'Artistic Director' }, name: 'Mustafa Akça' },
    { role: { en: 'Artistic production management', de: 'Künstlerische Produktionsleitung' }, name: 'Oliver Brandt' },
    { role: { en: 'Creative Director & Stage Director', de: 'Creative Director & Regie' }, name: 'Anisha Bondy' },
    { role: { en: 'Dramaturgy', de: 'Dramaturgie' }, name: 'Johanna Wall, Max Hagemeier' },
    { role: { en: 'Musical direction & arrangements', de: 'Musikalische Leitung & Arrangements' }, name: 'Peter Tomek, Eva Pons' },
    { role: { en: 'Sponsoring', de: 'Sponsoring' }, name: 'Verena Thole' },
    { role: { en: 'Musicians', de: 'Musiker:innen' }, name: 'Arnulf Ballhorn, Deniz Tahberer, Juri Tarasenok …' },
    {
      role: { en: 'Singers', de: 'Sänger:innen' },
      name: 'Johannes Dunz, Julia Domke, Maria Fiselier, Karolina Gumos, Ivan Tursic, Jens Larsen, Mirka Wagner, Carsten Sabrowski, Georgina Fürstenberg, Tom Erik Lie, Susan Zarrabi …',
    },
    { role: { en: 'Music (Ben und Henry)', de: 'Musik (Ben und Henry)' }, name: 'Attila Kadri Şendil' },
    { role: { en: 'Libretto (Ben und Henry)', de: 'Libretto (Ben und Henry)' }, name: 'Susanne Wolf' },
  ],
  awards: [
    {
      label: { en: 'BKM Prize for Cultural Education – Operndolmuş “Auf den Spuren der Gastarbeiterroute”', de: 'BKM-Preis Kulturelle Bildung – Operndolmuş „Auf den Spuren der Gastarbeiterroute“' },
      year: 2017,
      status: 'won',
    },
  ],
  press: [
    {
      source: 'nachtkritik',
      author: 'Eva Biringer',
      date: '2016-06-13',
      quote: {
        en: 'The moments in which the audience is drawn in work especially well.',
        de: 'Besonders gut funktionieren die Momente, in denen [die Zuschauer] eingebunden werden.',
      },
      url: 'https://nachtkritik.de/index.php?Itemid=83&catid=53&id=12702%3Aoperndolmus-der-komischen-oper-berlin&option=com_content&view=article',
    },
  ],
  featured: true,
  order: 3,
})
