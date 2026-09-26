// Quelle: docs/INHALTE.md §3 (Die Schneekönigin); Credits: theaterkompass.de, nmz 25.10.2010.
// Archiv, nicht in der Startgalerie.
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'die-schneekoenigin',
  title: { en: 'The Snow Queen', de: 'Die Schneekönigin' },
  subtitle: { en: 'Fairy-tale opera by Pierangelo Valtinoni · World premiere', de: 'Märchenoper von Pierangelo Valtinoni · Uraufführung' },
  venue: 'Komische Oper Berlin',
  year: 2010,
  pillar: 'direct',
  role: { en: 'Stage direction', de: 'Regie' },
  dates: {
    en: ['World premiere 24 October 2010, Komische Oper Berlin'],
    de: ['Uraufführung 24. Oktober 2010, Komische Oper Berlin'],
  },
  tags: { en: ['Fairy tale opera', 'Children’s opera', 'World premiere'], de: ['Märchenoper', 'Kinderoper', 'Uraufführung'] },
  cover: {
    type: 'image',
    src: '/media/die-schneekoenigin/cover.svg',
    alt: { en: 'Placeholder cover: The Snow Queen', de: 'Platzhalter-Cover: Die Schneekönigin' },
    width: 1200,
    height: 1500,
  },
  intro: {
    en: [
      'Pierangelo Valtinoni’s fairy-tale opera after Hans Christian Andersen, commissioned by the Komische Oper Berlin: Gerda sets out to free her friend Kay from the Snow Queen’s icy palace. Anisha Bondy staged the world premiere for audiences aged six and up.',
    ],
    de: [
      'Pierangelo Valtinonis Märchenoper nach Hans Christian Andersen, ein Auftragswerk der Komischen Oper Berlin: Gerda macht sich auf, ihren Freund Kay aus dem eisigen Palast der Schneekönigin zu befreien. Anisha Bondy inszenierte die Uraufführung für Publikum ab sechs Jahren.',
    ],
  },
  videos: [{ provider: 'vimeo', id: '1136280860', title: { en: 'The Snow Queen', de: 'Die Schneekönigin' } }],
  credits: [
    { role: { en: 'Music', de: 'Musik' }, name: 'Pierangelo Valtinoni' },
    { role: { en: 'Libretto', de: 'Libretto' }, name: 'Paolo Madron' },
    { role: { en: 'German version', de: 'Deutsche Fassung' }, name: 'Frank Harders-Wuthenow, Werner Hintze' },
    { role: { en: 'Stage direction', de: 'Regie' }, name: 'Anisha Bondy' },
    { role: { en: 'Musical direction', de: 'Musikalische Leitung' }, name: 'Aurélien Bello' },
    { role: { en: 'Set', de: 'Bühne' }, name: 'Henrik Ahr' },
    { role: { en: 'Costumes', de: 'Kostüme' }, name: 'Miriam Draxl, Cristina Nyffeler' },
    { role: { en: 'Choreography', de: 'Choreografie' }, name: 'Suzann Bolick' },
    { role: { en: 'Lighting', de: 'Licht' }, name: 'Franck Evin' },
    {
      role: { en: 'Cast', de: 'Mit' },
      name: 'Anna Borchers, Matthias Siddhartha Otto, Anastasia Melnik, Caren van Oijen, Mirko Janiska, Carsten Sabrowski, Elisabeth Starzinger',
    },
  ],
  awards: [],
  press: [
    {
      source: 'nmz – neue musikzeitung',
      author: 'Barbara Haack',
      date: '2010-10-25',
      quote: { en: 'Staged by Anisha Bondy in a lively, child-friendly way.', de: 'Lebhaft und kindgerecht von Anisha Bondy inszeniert.' },
      url: 'https://www.nmz.de/online/kinderoper-ernst-genommen-pierangelo-valtinoni-die-schneekoenigin-an-der-komischen-oper',
    },
  ],
  featured: false,
  order: 102,
  todos: {
    en: ['Image material'],
    de: ['Bildmaterial'],
  },
})
