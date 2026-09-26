// Quellen: docs/INHALTE.md §3 (Selam Opera!, Pop-Up-Clips) und §4 (Presse/Preis).
// Pop-Up-Opera und Operndolmuş werden laut D-017 als ein Projekt geführt.
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'selam-opera',
  title: 'Selam Opera!',
  subtitle: { en: 'Pop-up opera & Operndolmuş · Participatory format', de: 'Pop-Up-Opera & Operndolmuş · Partizipatives Format' },
  venue: 'Komische Oper Berlin',
  year: 2015,
  yearLabel: '2015–2022',
  pillar: 'participate',
  role: { en: 'Creative Director & Stage Director', de: 'Creative Director & Regie' },
  tags: { en: ['Pop-up opera', 'Intercultural', 'Public space'], de: ['Pop-Up-Opera', 'Interkulturell', 'Öffentlicher Raum'] },
  cover: {
    // Vorläufig: Standbild aus dem Pop-Up-Clip (YouTube-Vorschaubild, D-042)
    type: 'image',
    src: '/media/selam-opera/cover.jpg',
    alt: {
      en: 'A singer in a beret and leather jacket sings with outstretched arms among the audience of a pop-up opera.',
      de: 'Eine Sängerin mit Baskenmütze und Lederjacke singt mit ausgebreiteten Armen mitten im Publikum einer Pop-Up-Oper.',
    },
    width: 576,
    height: 720,
  },
  intro: {
    en: [
      'Selam Opera! took opera out of the house and into the city: singers and musicians of the Komische Oper Berlin performed short pop-up scenes on markets, in a boxing club, a nightclub and other everyday places. Artistic director: Mustafa Akça; creative director and stage director: Anisha Bondy.',
      'Its best-known chapter, the Operndolmuş, retraced the historical route of the Turkish “guest worker” generation from Berlin to Istanbul by minibus, with performances and shared stories along the way – awarded the BKM Prize for Cultural Education in 2017. The project ran from 2015 to 2022.',
    ],
    de: [
      'Selam Opera! holte die Oper aus dem Haus und in die Stadt: Sänger:innen und Musiker:innen der Komischen Oper Berlin bespielten mit kurzen Pop-Up-Szenen Märkte, einen Boxclub, einen Nachtclub und andere Alltagsorte. Künstlerische Leitung: Mustafa Akça; Creative Director und Regie: Anisha Bondy.',
      'Das bekannteste Kapitel, der Operndolmuş, folgte mit einem Kleinbus der historischen Route der türkischen „Gastarbeiter“-Generation von Berlin nach Istanbul, mit Auftritten und geteilten Geschichten unterwegs – ausgezeichnet mit dem BKM-Preis Kulturelle Bildung 2017. Das Projekt lief von 2015 bis 2022.',
    ],
  },
  // Pop-Up-Clips unter Anishas Regie (D-049; ohne Waschsalon und Planetarium)
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
    { role: { en: 'Creative Director & Stage Director', de: 'Creative Director & Regie' }, name: 'Anisha Bondy' },
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
        de: 'Besonders gut funktionieren die Momente, in denen diese eingebunden werden.',
      },
      url: 'https://nachtkritik.de/index.php?Itemid=83&catid=53&id=12702%3Aoperndolmus-der-komischen-oper-berlin&option=com_content&view=article',
    },
  ],
  featured: true,
  order: 3,
  todos: {
    en: ['Production photos for the gallery'],
    de: ['Produktionsfotos für die Galerie'],
  },
})
