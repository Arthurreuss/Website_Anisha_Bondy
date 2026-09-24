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
  role: { en: 'Artistic direction', de: 'Szenische Leitung' },
  tags: { en: ['Pop-up opera', 'Intercultural', 'Public space'], de: ['Pop-Up-Opera', 'Interkulturell', 'Öffentlicher Raum'] },
  cover: {
    type: 'image',
    src: '/media/selam-opera/cover.svg',
    alt: {
      en: 'Placeholder cover: Selam Opera!',
      de: 'Platzhalter-Cover: Selam Opera!',
    },
    width: 1200,
    height: 1500,
  },
  intro: {
    en: [
      'Selam Opera! took opera out of the house and into the city: singers and musicians of the Komische Oper Berlin performed short pop-up scenes on markets, in shopping arcades and other everyday places, developed together with Mustafa Akça.',
      'Its best-known chapter, the Operndolmuş, retraced the historical route of the Turkish “guest worker” generation from Berlin to Istanbul by minibus, with performances and shared stories along the way. The project ran from 2015 to 2022.',
    ],
    de: [
      'Selam Opera! holte die Oper aus dem Haus und in die Stadt: Sänger:innen und Musiker:innen der Komischen Oper Berlin bespielten mit kurzen Pop-Up-Szenen Märkte, Passagen und andere Alltagsorte – entwickelt gemeinsam mit Mustafa Akça.',
      'Das bekannteste Kapitel, der Operndolmuş, folgte mit einem Kleinbus der historischen Route der türkischen „Gastarbeiter“-Generation von Berlin nach Istanbul, mit Auftritten und geteilten Geschichten unterwegs. Das Projekt lief von 2015 bis 2022.',
    ],
  },
  videos: [
    { provider: 'youtube', id: 'AriBiymQ0og', title: 'Carmen in Kreuzberg' },
    { provider: 'youtube', id: 'SR1GJEFUYUc', title: 'Ring frei für Helena!' },
    { provider: 'youtube', id: 'uSaaIqZlElE', title: 'Wieder auf dem Markt – Don Giovanni' },
    { provider: 'youtube', id: 'IrpNLlLoXlc', title: 'Figaro’s Wash Bar' },
    { provider: 'youtube', id: 'K4XvGAYVdWI', title: 'Figaro’s Wash Bar – Director’s Cut' },
    { provider: 'youtube', id: '9Lr_72Xr2IQ', title: 'Il barbiere di Berlino' },
    { provider: 'youtube', id: '0SAoUPD4ndA', title: 'Jahrmarktstimmung' },
    { provider: 'youtube', id: 'hjzsxtkf3L0', title: 'Train at the Savoy' },
    { provider: 'youtube', id: 'NxJCkLNKnXg', title: 'Oh my goddess!' },
    { provider: 'youtube', id: 'aK1BJkLkg2g', title: 'Rusalka im Planetarium' },
  ],
  credits: [
    { role: { en: 'Artistic direction', de: 'Szenische Leitung' }, name: 'Anisha Bondy' },
    { role: { en: 'Artistic direction', de: 'Szenische Leitung' }, name: 'Mustafa Akça' },
  ],
  awards: [
    {
      label: { en: 'BKM Prize for Cultural Education – “Auf den Spuren der Gastarbeiterroute”', de: 'BKM-Preis Kulturelle Bildung – „Auf den Spuren der Gastarbeiterroute“' },
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
    en: [
      'Which pop-up clips did Anisha Bondy direct herself?',
      'The clip “Eine Frau …” mentioned in the source material could not be identified/linked',
      'Production photos for the gallery',
    ],
    de: [
      'Welche Pop-Up-Clips hat Anisha Bondy selbst inszeniert?',
      'Der in der Quelle erwähnte Clip „Eine Frau …“ konnte nicht eindeutig zugeordnet/verlinkt werden',
      'Produktionsfotos für die Galerie',
    ],
  },
})
