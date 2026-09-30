// Vorlage für alle Projektdateien (D-018). Quellen: docs/INHALTE.md §3/§4.
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'lene-fliegt-ins-zirkusland',
  title: 'Lene fliegt ins Zirkusland',
  subtitle: { en: 'Fairy-tale circus opera · World premiere', de: 'Märchenzirkusoper · Uraufführung' },
  venue: 'Philharmonie Luxembourg',
  year: 2025,
  pillar: 'direct',
  role: { en: 'Creative Director & Stage Director', de: 'Creative Director & Regie' },
  dates: {
    en: ['World premiere 25 April 2025, Philharmonie Luxembourg', 'Family performance 26 April 2025'],
    de: ['Uraufführung 25. April 2025, Philharmonie Luxembourg', 'Familienvorstellung 26. April 2025'],
  },
  tags: { en: ['Children’s opera', 'Circus', 'World premiere'], de: ['Kinderoper', 'Zirkus', 'Uraufführung'] },
  // Kachel: im Intro-Stapel das Foto (Papagei), sobald die Galerie aufgeht die
  // Schleife aus dem Philharmonie-Mitschnitt ab ≈ 30:37 (Wunsch Anisha, D-055/D-060)
  cover: {
    type: 'video',
    src: '/media/lene-fliegt-ins-zirkusland/loop.mp4',
    poster: '/media/lene-fliegt-ins-zirkusland/loop-poster.jpg',
    introImage: '/media/lene-fliegt-ins-zirkusland/cover.jpg',
    alt: {
      en: 'Circus opera on stage: a performer in a red feathered bird costume on stilts above the children’s choir, then acrobats doing the splits.',
      de: 'Zirkusoper auf der Bühne: eine Darstellerin im roten Federkostüm auf Stelzen über dem Kinderchor, danach Akrobatinnen im Spagat.',
    },
    width: 800,
    height: 1000,
    credit: 'Film: Philharmonie Luxembourg',
  },
  intro: {
    en: [
      'Lene dreams of the circus – and one day she simply flies there. Elena Kats-Chernin’s new children’s opera, with a libretto by Susanne Felicitas Wolf, brings singers, orchestra and circus artists onto one stage: a witty, poetic tribute to creativity, artistic freedom, courage and friendship.',
      'Commissioned by the Philharmonie Luxembourg and premiered there in April 2025, the production was nominated for the YAMawards 2026 in the category “Best Opera” and won the Public Choice Award on 29 September 2026 in Helsingør.',
    ],
    de: [
      'Lene träumt vom Zirkus – und eines Tages fliegt sie einfach hin. Elena Kats-Chernins neue Kinderoper nach einem Libretto von Susanne Felicitas Wolf holt Sänger:innen, Orchester und Artist:innen auf eine Bühne: eine witzige, poetische Hommage an Kreativität, künstlerische Freiheit, Mut und Freundschaft.',
      'Die Auftragsproduktion der Philharmonie Luxembourg, im April 2025 uraufgeführt, war für die YAMawards 2026 in der Kategorie „Best Opera“ nominiert und gewann am 29. September 2026 in Helsingør den Public Choice Award (Publikumspreis).',
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
    { role: { en: 'Creative Director & Stage Director', de: 'Creative Director & Regie' }, name: 'Anisha Bondy' },
    { role: { en: 'Musical Director', de: 'Musikalische Leitung' }, name: 'James Hendry' },
    { role: { en: 'Circus', de: 'Zirkus' }, name: "Zaltimbanq' Zirkus · Irina Chechulina" },
    { role: { en: 'Choreography', de: 'Choreografie' }, name: 'Mariana Souza' },
    { role: { en: 'Set', de: 'Bühne' }, name: 'Julia Hansen' },
    { role: { en: 'Costumes', de: 'Kostüme' }, name: 'Uta Jäger' },
    { role: { en: 'Lighting', de: 'Licht' }, name: 'Michael Morgan' },
    { role: { en: 'Orchestra', de: 'Orchester' }, name: 'Luxembourg Philharmonic' },
    { role: { en: 'Children’s choir', de: 'Kinderchor' }, name: 'Kinderchor Forte (Conservatoire de la Ville de Luxembourg) · Sylvie Serra-Jacobs' },
    {
      role: { en: 'Cast', de: 'Mit' },
      name: 'Danae Kontora, Susan Zarrabi, Peter Kirk, Hélène Gustin, Andrii Zubchevskyi and the artists of Zaltimbanq’ Zirkus',
    },
  ],
  awards: [
    { label: { en: 'YAMawards – Public Choice Award', de: 'YAMawards – Public Choice Award (Publikumspreis)' }, year: 2026, status: 'won' },
    { label: { en: 'YAMawards – Best Opera', de: 'YAMawards – Best Opera' }, year: 2026, status: 'nominated' },
  ],
  press: [],
  featured: true,
  order: 1,
})
