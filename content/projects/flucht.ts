// Quelle: docs/INHALTE.md §3 (Flucht), Antworten Anisha D-049. Bilder und Cover-Schleife aus dem Trailer (D-052).
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'flucht',
  title: { en: 'Flight Trilogy', de: 'Flucht-Trilogie' },
  subtitle: { en: 'Staged concert trilogy', de: 'Szenische Konzert-Trilogie' },
  venue: 'Komische Oper Berlin',
  year: 2019,
  yearLabel: '2019/20',
  pillar: 'create',
  role: { en: 'Stage Director', de: 'Regie' },
  dates: {
    en: ['Flucht I – Vom Auswandern: 15 September 2019', 'Flucht II – Vom Einwandern: 26 January 2020', 'Flucht III – Vom Bleiben: 2020, as a recording only'],
    de: ['Flucht I – Vom Auswandern: 15. September 2019', 'Flucht II – Vom Einwandern: 26. Januar 2020', 'Flucht III – Vom Bleiben: 2020, nur als Aufzeichnung'],
  },
  tags: { en: ['Staged concert', 'Trilogy'], de: ['Szenisches Konzert', 'Trilogie'] },
  cover: {
    type: 'video',
    src: '/media/flucht/cover.mp4',
    poster: '/media/flucht/cover-poster.jpg',
    alt: {
      en: 'Scenes from Flucht: the audience seen from above, singers, readings and the auditorium of the Komische Oper.',
      de: 'Szenen aus Flucht: das Publikum von oben, Sänger:innen, Lesungen und der Saal der Komischen Oper.',
    },
    width: 800,
    height: 1000,
    credit: 'Trailer: Komische Oper Berlin',
  },
  intro: {
    en: [
      'Flight Trilogy is a series of three staged concerts for the Komische Oper Berlin in the 2019/20 season. Musicians with very different experiences of flight tell their own stories through music, with audience and performers sharing the stage.',
      'Part I, “Vom Auswandern” (On Emigrating), traced 200 years of German emigration – from Wagner’s Wesendonck songs, written in Swiss exile, to recordings of the Jewish Semer label and musicians who fled the GDR in 1989. Part II, “Vom Einwandern” (On Immigrating), brought together musicians who have come to Germany in recent decades, among them the band Safar and the Babylon Orchestra. Part III, “Vom Bleiben” (On Staying), asks what comes after arrival – because of the pandemic it could only be shown as a recording.',
    ],
    de: [
      'Die Flucht-Trilogie besteht aus drei szenischen Konzerten für die Komische Oper Berlin in der Spielzeit 2019/20. Musiker:innen mit ganz unterschiedlichen Fluchterfahrungen erzählen mit Musik von ihren Lebenswegen; Publikum und Mitwirkende teilen sich die Bühne.',
      'Teil I, „Vom Auswandern“, spannte den Bogen über 200 Jahre deutscher Emigrationsgeschichte – von Wagners Wesendonck-Liedern aus dem Schweizer Exil über Aufnahmen des jüdischen Semer-Labels bis zu Musiker:innen, die 1989 aus der DDR flohen. Teil II, „Vom Einwandern“, versammelte Musiker:innen, die in den letzten Jahrzehnten nach Deutschland gekommen sind, darunter die Band Safar und das Babylon Orchestra. Teil III, „Vom Bleiben“, fragt, was nach dem Ankommen kommt – wegen der Pandemie war er nur als Aufzeichnung zu sehen.',
    ],
  },
  gallery: [
    {
      type: 'single',
      label: { en: 'On stage', de: 'Auf der Bühne' },
      media: {
        type: 'image',
        src: '/media/flucht/01.jpg',
        alt: { en: 'The audience seated on the stage, looking out into the auditorium.', de: 'Das Publikum sitzt auf der Bühne, der Blick geht in den Zuschauerraum.' },
        width: 1728,
        height: 1080,
        credit: 'Trailer: Komische Oper Berlin',
      },
    },
    {
      type: 'group-3',
      label: { en: 'Voices', de: 'Stimmen' },
      media: [
        {
          type: 'image',
          src: '/media/flucht/02a.jpg',
          alt: { en: 'A singer in a sequinned dress in front of the orchestra.', de: 'Eine Sängerin im Paillettenkleid vor dem Orchester.' },
          width: 864,
          height: 1080,
          credit: 'Trailer: Komische Oper Berlin',
        },
        {
          type: 'image',
          src: '/media/flucht/02b.jpg',
          alt: { en: 'A woman speaks into a microphone.', de: 'Eine Frau spricht in ein Mikrofon.' },
          width: 864,
          height: 1080,
          credit: 'Trailer: Komische Oper Berlin',
        },
        {
          type: 'image',
          src: '/media/flucht/02c.jpg',
          alt: { en: 'A man reads from a sheet of paper, seated under a floor lamp.', de: 'Ein Mann liest im Sessel unter einer Stehlampe von einem Blatt.' },
          width: 864,
          height: 1080,
          credit: 'Trailer: Komische Oper Berlin',
        },
      ],
    },
    {
      type: 'single',
      label: { en: 'The band', de: 'Die Band' },
      media: {
        type: 'image',
        src: '/media/flucht/03.jpg',
        alt: { en: 'A singer and four musicians standing side by side on the dark stage.', de: 'Eine Sängerin und vier Musiker nebeneinander auf der dunklen Bühne.' },
        width: 1728,
        height: 1080,
        credit: 'Trailer: Komische Oper Berlin',
      },
    },
    {
      type: 'group-3',
      label: { en: 'Spaces', de: 'Räume' },
      media: [
        {
          type: 'image',
          src: '/media/flucht/04a.jpg',
          alt: { en: 'Red light, ladders on a brick wall and the audience around a glowing round platform.', de: 'Rotes Licht, Leitern an einer Backsteinwand und das Publikum um eine leuchtende runde Fläche.' },
          width: 864,
          height: 1080,
          credit: 'Trailer: Komische Oper Berlin',
        },
        {
          type: 'image',
          src: '/media/flucht/04b.jpg',
          alt: { en: 'A violinist under a crystal chandelier between red velvet seats.', de: 'Ein Geiger unter einem Kristalllüster zwischen roten Samtsitzen.' },
          width: 864,
          height: 1080,
          credit: 'Trailer: Komische Oper Berlin',
        },
        {
          type: 'image',
          src: '/media/flucht/04c.jpg',
          alt: { en: 'The conductor in front of the orchestra on the stage.', de: 'Der Dirigent vor dem Orchester auf der Bühne.' },
          width: 864,
          height: 1080,
          credit: 'Trailer: Komische Oper Berlin',
        },
      ],
    },
    {
      type: 'single',
      label: { en: 'The auditorium', de: 'Der Saal' },
      media: {
        type: 'image',
        src: '/media/flucht/05.jpg',
        alt: { en: 'The gilded tiers of the Komische Oper, the orchestra in front of the audience.', de: 'Die goldenen Ränge der Komischen Oper, das Orchester vor dem Publikum.' },
        width: 1728,
        height: 1080,
        credit: 'Trailer: Komische Oper Berlin',
      },
    },
  ],
  videos: [{ provider: 'youtube', id: 'NUGsQ-HoR54', title: { en: 'Flucht – trailer', de: 'Flucht – Trailer' } }],
  credits: [
    { role: { en: 'Stage Director', de: 'Regie' }, name: 'Anisha Bondy' },
    { role: { en: 'Musical Director (Flucht I)', de: 'Musikalische Leitung (Flucht I)' }, name: 'Stefan Sanderling' },
    { role: { en: 'Mezzo-soprano (Flucht I)', de: 'Mezzosopran (Flucht I)' }, name: 'Karolina Gumos' },
    { role: { en: 'With (Flucht II)', de: 'Mit (Flucht II)' }, name: 'Safar, Babylon Orchestra' },
  ],
  awards: [],
  press: [],
  featured: true,
  order: 10,
})
