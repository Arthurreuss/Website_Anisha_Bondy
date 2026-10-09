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
    type: 'image',
    src: '/media/klangstreich/cover.jpg',
    alt: {
      en: 'Rehearsal: singers and the team sit together on benches, bent over the score.',
      de: 'Probe: Sänger:innen und Team sitzen auf Bänken zusammen und beugen sich über die Partitur.',
    },
    width: 1087,
    height: 1359,
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
      label: { en: 'Rehearsals', de: 'Proben' },
      media: {
          type: 'image',
          src: '/media/klangstreich/01.jpg',
          alt: {
            en: 'Singers in black rehearsal clothes and the team discuss the score on wooden benches.',
            de: 'Sänger:innen in schwarzer Probenkleidung und Team besprechen auf Holzbänken die Partitur.',
          },
          width: 2042,
          height: 1276,
        },
    },
    {
      type: 'group-3',
      label: { en: 'W24 visits the rehearsal', de: 'W24 zu Besuch bei der Probe' },
      media: [
        {
          type: 'image',
          src: '/media/klangstreich/02a.jpg',
          alt: {
            en: 'Anisha Bondy gives an interview to W24 in the rehearsal room, a TV camera in the foreground.',
            de: 'Anisha Bondy im Interview mit W24 im Probenraum, im Vordergrund die Fernsehkamera.',
          },
          width: 1087,
          height: 1359,
        },
        {
          type: 'image',
          src: '/media/klangstreich/02b.jpg',
          alt: {
            en: 'Anisha Bondy speaks animatedly into the W24 microphone.',
            de: 'Anisha Bondy spricht lebhaft ins W24-Mikrofon.',
          },
          width: 1200,
          height: 1500,
        },
        {
          type: 'image',
          src: '/media/klangstreich/02c.jpg',
          alt: {
            en: 'A singer raises both arms during his W24 interview; the team watches from the rehearsal table.',
            de: 'Ein Sänger reißt im W24-Interview beide Arme hoch, das Team schaut vom Probentisch aus zu.',
          },
          width: 1087,
          height: 1359,
        },
      ],
    },
    {
      type: 'single',
      label: { en: 'In make-up', de: 'In der Maske' },
      media: {
          type: 'image',
          src: '/media/klangstreich/03.jpg',
          alt: {
            en: 'A singer in a dressing gown laughs in the make-up room, seen through a mirror at a slant.',
            de: 'Ein Sänger im Morgenmantel lacht in der Maske, schräg durch einen Spiegel gesehen.',
          },
          width: 2042,
          height: 1276,
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
  press: [],
  featured: true,
  order: 0,
  todos: {
    en: ['Trailer, production photos, podcast and press after the premiere', 'Photo credit for the rehearsal photos'],
    de: ['Trailer, Produktionsfotos, Podcast und Presse nach der Premiere', 'Fotonachweis der Probenfotos'],
  },
})
