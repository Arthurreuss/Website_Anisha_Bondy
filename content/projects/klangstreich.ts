// Quelle: Theater an der Wien / wien-ticket.at, Zusage Anisha D-049.
// Seit D-068 eigene Karte an erster Stelle der Startseite (Premiere 11.10.2026).
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'klangstreich',
  title: 'Klangstreich',
  subtitle: {
    en: 'A-cappella children’s opera by Marc L. Vogler · Austrian premiere',
    de: 'A-cappella-Kinderoper von Marc L. Vogler · Österreichische Erstaufführung',
  },
  venue: 'Theater an der Wien',
  year: 2026,
  premiere: '2026-10-11',
  pillar: 'direct',
  role: { en: 'Vienna version & Stage Director', de: 'Wiener Fassung & Regie' },
  dates: {
    en: ['Austrian premiere 11 October 2026, Theater an der Wien (Hölle)'],
    de: ['Österreichische Erstaufführung 11. Oktober 2026, Theater an der Wien (Hölle)'],
  },
  tags: { en: ['Children’s opera', 'A cappella', 'Ages 4+'], de: ['Kinderoper', 'A cappella', 'Ab 4 Jahren'] },
  cover: {
    type: 'video',
    src: '/media/klangstreich/cover.mp4',
    poster: '/media/klangstreich/cover-poster.jpg',
    alt: {
      en: 'Trailer: shadows of notes on the stave, a singer with a microphone, a rocker in a studded jacket, two singers with bird helmets.',
      de: 'Trailer: Schatten von Noten auf dem Notensystem, ein Sänger mit Mikrofon, eine Rockerin in Nietenjacke, zwei Sängerinnen mit Vogelhelmen.',
    },
    width: 800,
    height: 1000,
    credit: 'Film: MusikTheater an der Wien',
  },
  intro: {
    en: [
      'Finn is just a small note in a well-known birthday song – until he dreams of a beautiful melody, steps out of his song and sets off to find it, through many places and musical styles.',
      'Marc L. Vogler’s opera for audiences aged four and up relies entirely on the human voice: two female singers and one male singer tell the story with singing, speaking, humming and beatboxing, without any instruments. Libretto by Dany Handschuh after the children’s book by Inge Brendler.',
    ],
    de: [
      'Finn ist nur eine kleine Note in einem bekannten Geburtstagslied – bis er von einer wunderschönen Melodie träumt, aus seinem Lied aussteigt und sich auf die Suche macht, durch viele Orte und Musikstile.',
      'Marc L. Voglers Oper für Publikum ab vier Jahren setzt ganz auf die menschliche Stimme: Zwei Sängerinnen und ein Sänger erzählen die Geschichte mit Singen, Sprechen, Summen und Beatboxen, ganz ohne Instrumente. Libretto von Dany Handschuh nach dem Kinderbuch von Inge Brendler.',
    ],
  },
  gallery: [
    {
      type: 'single',
      label: { en: 'On stage', de: 'Auf der Bühne' },
      media: {
          type: 'image',
          src: '/media/klangstreich/s01.jpg',
          alt: {
            en: 'Two singers in bird helmets spread shimmering blue wings; between them Finn, in front of a paper silhouette of Vienna.',
            de: 'Zwei Sängerinnen mit Vogelhelmen breiten schimmernde blaue Flügel aus, zwischen ihnen Finn, vor einer Papiersilhouette von Wien.',
          },
          width: 2400,
          height: 1500,
          credit: 'Lei Chen / MusikTheater an der Wien',
        },
    },
    {
      type: 'group-3',
      label: { en: 'Scenes', de: 'Szenen' },
      media: [
        {
          type: 'image',
          src: '/media/klangstreich/s02a.jpg',
          alt: {
            en: 'The three singers in front of a red curtain and a starry backdrop, two of them as birds.',
            de: 'Die drei Sänger:innen vor rotem Vorhang und Sternenhimmel, zwei davon als Vögel.',
          },
          width: 1200,
          height: 1500,
          credit: 'Lei Chen / MusikTheater an der Wien',
        },
        {
          type: 'image',
          src: '/media/klangstreich/s02b.jpg',
          alt: {
            en: 'A singer with a silver wig and silver gloves sings into a microphone in blue light.',
            de: 'Eine Sängerin mit silberner Perücke und Silberhandschuhen singt in blauem Licht ins Mikrofon.',
          },
          width: 1200,
          height: 1500,
          credit: 'Lei Chen / MusikTheater an der Wien',
        },
        {
          type: 'image',
          src: '/media/klangstreich/s02c.jpg',
          alt: {
            en: 'Shadow play: a woman’s silhouette in purple light above the shadow of a man holding a microphone.',
            de: 'Schattenspiel: die Silhouette einer Frau in violettem Licht über dem Schatten eines Mannes mit Mikrofon.',
          },
          width: 1200,
          height: 1500,
          credit: 'Lei Chen / MusikTheater an der Wien',
        },
      ],
    },
    {
      type: 'single',
      label: { en: 'On the road', de: 'Unterwegs' },
      media: {
          type: 'image',
          src: '/media/klangstreich/s03.jpg',
          alt: {
            en: 'Finn and a singer in a top hat look out of a cardboard car.',
            de: 'Finn und eine Sängerin mit Zylinder schauen aus einem Auto aus Pappe.',
          },
          width: 2400,
          height: 1500,
          credit: 'Lei Chen / MusikTheater an der Wien',
        },
    },
    {
      type: 'group-3',
      label: { en: 'Finn’s journey', de: 'Finns Reise' },
      media: [
        {
          type: 'image',
          src: '/media/klangstreich/s04a.jpg',
          alt: {
            en: 'Finn kneels in a cone of light, hands on hips.',
            de: 'Finn kniet im Lichtkegel, die Hände in die Hüften gestemmt.',
          },
          width: 1200,
          height: 1500,
          credit: 'Lei Chen / MusikTheater an der Wien',
        },
        {
          type: 'image',
          src: '/media/klangstreich/s04b.jpg',
          alt: {
            en: 'In front of a red wall, Finn reaches for an old radio.',
            de: 'Vor roter Wand greift Finn nach einem alten Radio.',
          },
          width: 1200,
          height: 1500,
          credit: 'Lei Chen / MusikTheater an der Wien',
        },
        {
          type: 'image',
          src: '/media/klangstreich/s04c.jpg',
          alt: {
            en: 'A singer strikes a pose in front of a large golden disc of light.',
            de: 'Eine Sängerin posiert vor einer großen goldenen Lichtscheibe.',
          },
          width: 1200,
          height: 1500,
          credit: 'Lei Chen / MusikTheater an der Wien',
        },
      ],
    },
    {
      type: 'single',
      label: { en: 'Shadows on the stave', de: 'Schatten im Notensystem' },
      media: {
          type: 'image',
          src: '/media/klangstreich/s05.jpg',
          alt: {
            en: 'A treble clef and stave lines are projected onto white curtains; three silhouettes stand between them, two with note heads.',
            de: 'Violinschlüssel und Notenlinien auf weißen Vorhängen, dazwischen drei Silhouetten, zwei davon mit Notenköpfen.',
          },
          width: 2400,
          height: 1500,
          credit: 'Lei Chen / MusikTheater an der Wien',
        },
    },
    {
      type: 'single',
      label: { en: 'Rehearsals', de: 'Proben' },
      media: {
          type: 'image',
          src: '/media/klangstreich/r01.jpg',
          alt: {
            en: 'Singers in black rehearsal clothes and the team discuss the score on wooden benches.',
            de: 'Sänger:innen in schwarzer Probenkleidung und Team besprechen auf Holzbänken die Partitur.',
          },
          width: 2042,
          height: 1276,
          credit: 'Lei Chen / MusikTheater an der Wien',
        },
    },
    {
      type: 'group-3',
      label: { en: 'W24 visits the rehearsal', de: 'W24 zu Besuch bei der Probe' },
      media: [
        {
          type: 'image',
          src: '/media/klangstreich/r02a.jpg',
          alt: {
            en: 'Anisha Bondy gives an interview to W24 in the rehearsal room, a TV camera in the foreground.',
            de: 'Anisha Bondy im Interview mit W24 im Probenraum, im Vordergrund die Fernsehkamera.',
          },
          width: 1087,
          height: 1359,
          credit: 'Lei Chen / MusikTheater an der Wien',
        },
        {
          type: 'image',
          src: '/media/klangstreich/r02b.jpg',
          alt: {
            en: 'Anisha Bondy speaks animatedly into the W24 microphone.',
            de: 'Anisha Bondy spricht lebhaft ins W24-Mikrofon.',
          },
          width: 1200,
          height: 1500,
          credit: 'Lei Chen / MusikTheater an der Wien',
        },
        {
          type: 'image',
          src: '/media/klangstreich/r02c.jpg',
          alt: {
            en: 'A singer raises both arms during his W24 interview; the team watches from the rehearsal table.',
            de: 'Ein Sänger reißt im W24-Interview beide Arme hoch, das Team schaut vom Probentisch aus zu.',
          },
          width: 1087,
          height: 1359,
          credit: 'Lei Chen / MusikTheater an der Wien',
        },
      ],
    },
    {
      type: 'single',
      label: { en: 'In make-up', de: 'In der Maske' },
      media: {
          type: 'image',
          src: '/media/klangstreich/r03.jpg',
          alt: {
            en: 'A singer in a dressing gown laughs in the make-up room, seen through a mirror at a slant.',
            de: 'Ein Sänger im Morgenmantel lacht in der Maske, schräg durch einen Spiegel gesehen.',
          },
          width: 2042,
          height: 1276,
          credit: 'Lei Chen / MusikTheater an der Wien',
        },
    },
  ],
  videos: [],
  credits: [
    { role: { en: 'Music', de: 'Musik' }, name: 'Marc L. Vogler' },
    { role: { en: 'Libretto', de: 'Libretto' }, name: 'Dany Handschuh' },
    { role: { en: 'Vienna version & Stage Director', de: 'Wiener Fassung & Regie' }, name: 'Anisha Bondy' },
    { role: { en: 'Set & costumes', de: 'Ausstattung' }, name: 'Renate Vogg, Verena Geier' },
    { role: { en: 'Lighting', de: 'Licht' }, name: 'Franz Tscheck' },
    { role: { en: 'Dramaturgy', de: 'Dramaturgie' }, name: 'Kai Weßler' },
    { role: { en: 'Cast', de: 'Mit' }, name: 'Jubin Amiri, Anita Rosati, Ella Feldmeier' },
  ],
  awards: [],
  press: [
    {
      source: 'Podcast „Probenzimmer“ · MusikTheater an der Wien',
      author: 'Christian Schröder, Kai Weßler',
      quote: { en: 'Klangstreich – Eine Note tanzt aus der Reihe', de: 'Klangstreich – Eine Note tanzt aus der Reihe' },
      url: 'https://open.spotify.com/episode/7eEE6NLH2mIWAAXYwzZ0cG',
      kind: 'podcast',
    },
  ],
  featured: true,
  order: 0,
  todos: {
    en: ['Premiere photos and reviews after 11 October'],
    de: ['Premierenfotos und Kritiken nach dem 11. Oktober'],
  },
})
