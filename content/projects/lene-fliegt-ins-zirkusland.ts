// Vorlage für alle Projektdateien (D-018). Quellen: docs/INHALTE.md §3/§4.
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'lene-fliegt-ins-zirkusland',
  title: 'Lene fliegt ins Zirkusland',
  subtitle: { en: 'Fairy-tale circus opera · World premiere', de: 'Märchenzirkusoper · Uraufführung' },
  venue: 'Philharmonie Luxembourg',
  year: 2025,
  pillar: 'direct',
  role: { en: 'Stage direction', de: 'Regie' },
  tags: { en: ['Children’s opera', 'Circus', 'World premiere'], de: ['Kinderoper', 'Zirkus', 'Uraufführung'] },
  cover: {
    type: 'image',
    src: '/media/lene-fliegt-ins-zirkusland/cover.jpg',
    alt: {
      en: 'A performer in a red feathered bird costume walks down the aisle through the children in the audience.',
      de: 'Eine Darstellerin im roten Federkostüm geht durch den Mittelgang zwischen den Kindern im Publikum.',
    },
    width: 1067,
    height: 1334,
    credit: 'Alfonso Salgueiro',
  },
  intro: {
    en: [
      'Lene dreams of the circus – and one day she simply flies there. Elena Kats-Chernin’s new children’s opera, with a libretto by Susanne Felicitas Wolf, brings singers, orchestra and circus artists onto one stage: a witty, poetic tribute to creativity, artistic freedom, courage and friendship.',
      'Commissioned by the Philharmonie Luxembourg and premiered there in April 2025, the production was nominated for the YAMawards 2026 in the category “Best Opera”.',
    ],
    de: [
      'Lene träumt vom Zirkus – und eines Tages fliegt sie einfach hin. Elena Kats-Chernins neue Kinderoper nach einem Libretto von Susanne Felicitas Wolf holt Sänger:innen, Orchester und Artist:innen auf eine Bühne: eine witzige, poetische Hommage an Kreativität, künstlerische Freiheit, Mut und Freundschaft.',
      'Die Auftragsproduktion der Philharmonie Luxembourg wurde im April 2025 uraufgeführt und ist für die YAMawards 2026 in der Kategorie „Best Opera“ nominiert.',
    ],
  },
  gallery: [
    {
      type: 'single',
      label: { en: 'The circus ring', de: 'Die Manege' },
      media: {
        type: 'image',
        src: '/media/lene-fliegt-ins-zirkusland/01.jpg',
        alt: {
          en: 'Singers and circus artists gather in the circus ring under purple spotlights.',
          de: 'Sänger:innen und Artist:innen versammeln sich in der Manege unter violetten Scheinwerfern.',
        },
        width: 2000,
        height: 1250,
        credit: 'Alfonso Salgueiro',
      },
    },
    {
      type: 'single',
      label: { en: 'Performance', de: 'Aufführung' },
      media: {
        type: 'image',
        src: '/media/lene-fliegt-ins-zirkusland/02.jpg',
        alt: {
          en: 'Acrobats on a pole above the ensemble in the ring, the circus tent built into the concert hall.',
          de: 'Akrobat:innen an einer Stange über dem Ensemble in der Manege, das Zirkuszelt im Konzertsaal.',
        },
        width: 2000,
        height: 1250,
        credit: 'Alfonso Salgueiro',
      },
    },
    {
      type: 'single',
      label: { en: 'The hall', de: 'Der Saal' },
      media: {
        type: 'image',
        src: '/media/lene-fliegt-ins-zirkusland/03.jpg',
        alt: {
          en: 'Wide view of the hall: the orchestra behind the red ring, the audience in front.',
          de: 'Weiter Blick in den Saal: das Orchester hinter der roten Manege, davor das Publikum.',
        },
        width: 2000,
        height: 1250,
        credit: 'Alfonso Salgueiro',
      },
    },
  ],
  videos: [{ provider: 'youtube', id: 'mAt9nKScTB8', title: '«Lene fliegt ins Zirkusland» | Märchenzirkusoper' }],
  credits: [
    { role: { en: 'Music', de: 'Musik' }, name: 'Elena Kats-Chernin' },
    { role: { en: 'Libretto', de: 'Libretto' }, name: 'Susanne Felicitas Wolf' },
    { role: { en: 'Stage direction', de: 'Regie' }, name: 'Anisha Bondy' },
  ],
  awards: [{ label: { en: 'YAMawards – Best Opera', de: 'YAMawards – Best Opera' }, year: 2026, status: 'nominated' }],
  press: [],
  featured: true,
  order: 1,
  todos: {
    en: ['Further credits (conductor, circus, design)', 'YAMawards result (29 Sept 2026)'],
    de: ['Weitere Credits (Dirigat, Zirkus, Ausstattung)', 'Ergebnis YAMawards (29.09.2026)'],
  },
})
