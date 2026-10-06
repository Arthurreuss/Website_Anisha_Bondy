// Quelle: docs/INHALTE.md §3 (VOCES8 – The World is Turning).
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'voces8',
  title: { en: 'The World is Turning', de: '„… weil die Welt sich dreht!“' },
  subtitle: { en: 'Interactive spectacle with VOCES8', de: 'Interaktives Spektakel mit VOCES8' },
  venue: 'Philharmonie Luxembourg',
  year: 2023,
  pillar: 'create',
  role: { en: 'Stage Director & Concept', de: 'Regie & Konzept' },
  dates: {
    en: ['World premiere 15 May 2023, Philharmonie Luxembourg'],
    de: ['Uraufführung 15. Mai 2023, Philharmonie Luxembourg'],
  },
  tags: { en: ['Vocal octet', 'New format', 'Interactive'], de: ['Vokaloktett', 'Neues Format', 'Interaktiv'] },
  cover: {
    type: 'video',
    src: '/media/voces8/cover.mp4',
    poster: '/media/voces8/cover-poster.jpg',
    alt: {
      en: 'The ensemble in dark costumes and painted masks, standing on the dimly lit stage.',
      de: 'Das Ensemble in dunklen Kostümen und bemalten Masken auf der schummrig beleuchteten Bühne.',
    },
    width: 800,
    height: 1000,
    credit: 'Film: Philharmonie Luxembourg',
  },
  intro: {
    en: [
      'The World is Turning (German version: „… weil die Welt sich dreht!“) is an interactive spectacle developed for and with the British vocal octet VOCES8, turning a concert with beatboxer Mando into a shared theatrical event for its audience.',
      'The production, created together with Julia Hansen for the Philharmonie Luxembourg, premiered in 2023.',
    ],
    de: [
      '„… weil die Welt sich dreht!“ (englische Fassung: The World is Turning) ist ein interaktives Spektakel, entwickelt für und mit dem britischen Vokaloktett VOCES8, das ein Konzert mit dem Beatboxer Mando in ein gemeinsames theatrales Ereignis für das Publikum verwandelt.',
      'Die gemeinsam mit Julia Hansen für die Philharmonie Luxembourg entwickelte Produktion wurde 2023 uraufgeführt.',
    ],
  },
  videos: [{ provider: 'vimeo', id: '828590577', hash: '52a72d49ab', title: 'The World is Turning' }],
  credits: [
    { role: { en: 'Stage Director & Concept', de: 'Regie & Konzept' }, name: 'Anisha Bondy' },
    { role: { en: 'Concept & space', de: 'Konzept & Raum' }, name: 'Julia Hansen' },
    { role: { en: 'Concept & performance', de: 'Konzept & Spiel' }, name: 'Paul Smith' },
    { role: { en: 'Performance & beatbox', de: 'Spiel & Beatboxer' }, name: 'Daniel Mandolini (Mando Beatbox)' },
    { role: { en: 'VOCES8 – Soprano', de: 'VOCES8 – Sopran' }, name: 'Andrea Haines' },
    { role: { en: 'VOCES8 – Soprano', de: 'VOCES8 – Sopran' }, name: 'Molly Noon' },
    { role: { en: 'VOCES8 – Alto', de: 'VOCES8 – Alt' }, name: 'Katie Jeffries-Harris' },
    { role: { en: 'VOCES8 – Countertenor & artistic director', de: 'VOCES8 – Countertenor & künstlerischer Leiter' }, name: 'Barnaby Smith' },
    { role: { en: 'VOCES8 – Tenor', de: 'VOCES8 – Tenor' }, name: 'Blake Morgan' },
    { role: { en: 'VOCES8 – Tenor', de: 'VOCES8 – Tenor' }, name: 'Euan Williamson' },
    { role: { en: 'VOCES8 – Baritone', de: 'VOCES8 – Bariton' }, name: 'Christopher Moore' },
    { role: { en: 'VOCES8 – Bass', de: 'VOCES8 – Bass' }, name: 'Dominic Carver' },
  ],
  awards: [],
  press: [],
  featured: true,
  order: 6,
  todos: {
    en: ['Production photos for the gallery'],
    de: ['Produktionsfotos für die Galerie'],
  },
})
