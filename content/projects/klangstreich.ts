// Quelle: Theater an der Wien / wien-ticket.at, Zusage Anisha D-049. Archiv, bis die
// geplante Box „Season 2026/27“ kommt (Liste von Anisha folgt).
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
  pillar: 'direct',
  role: { en: 'Stage direction', de: 'Regie' },
  dates: {
    en: ['Austrian premiere 11 October 2026, Theater an der Wien (Hölle)'],
    de: ['Österreichische Erstaufführung 11. Oktober 2026, Theater an der Wien (Hölle)'],
  },
  tags: { en: ['Children’s opera', 'A cappella', 'Ages 4+'], de: ['Kinderoper', 'A cappella', 'Ab 4 Jahren'] },
  cover: {
    type: 'image',
    src: '/media/klangstreich/cover.svg',
    alt: { en: 'Placeholder cover: Klangstreich', de: 'Platzhalter-Cover: Klangstreich' },
    width: 1200,
    height: 1500,
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
  videos: [],
  credits: [
    { role: { en: 'Music', de: 'Musik' }, name: 'Marc L. Vogler' },
    { role: { en: 'Libretto', de: 'Libretto' }, name: 'Dany Handschuh' },
    { role: { en: 'Stage direction', de: 'Regie' }, name: 'Anisha Bondy' },
    { role: { en: 'Cast', de: 'Mit' }, name: 'Ivo Kovrigar, Anita Rosati, Ella Feldmeier' },
  ],
  awards: [],
  press: [],
  featured: false,
  order: 103,
  todos: {
    en: ['Photos after the premiere'],
    de: ['Fotos nach der Premiere'],
  },
})
