// Quelle: docs/INHALTE.md §3 (Peter Pan).
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'peter-pan',
  title: 'Peter Pan',
  subtitle: { en: 'Adventure opera after J. M. Barrie · World premiere', de: 'Abenteueroper nach J. M. Barrie · Uraufführung' },
  venue: 'Philharmonie Luxembourg',
  year: 2024,
  pillar: 'direct',
  role: { en: 'Stage direction', de: 'Regie' },
  tags: { en: ['Children’s opera', 'Adventure', 'World premiere'], de: ['Kinderoper', 'Abenteuer', 'Uraufführung'] },
  cover: {
    type: 'image',
    src: '/media/peter-pan/cover.svg',
    alt: { en: 'Placeholder cover: Peter Pan', de: 'Platzhalter-Cover: Peter Pan' },
    width: 1200,
    height: 1500,
  },
  intro: {
    en: [
      'Frank Schwemmer’s new opera, with a libretto by Michael Frowin, takes J. M. Barrie’s adventure to Neverland and turns it into music theatre for young audiences: flight, pirates and the fear of growing up, told through voices and orchestra.',
      'The production was commissioned by the Philharmonie Luxembourg and had its world premiere there in 2024.',
    ],
    de: [
      'Frank Schwemmers neue Oper nach einem Libretto von Michael Frowin bringt J. M. Barries Abenteuer im Nimmerland als Musiktheater für junges Publikum auf die Bühne: Fliegen, Piraten und die Angst vorm Erwachsenwerden, erzählt mit Stimmen und Orchester.',
      'Die Auftragsproduktion der Philharmonie Luxembourg wurde dort 2024 uraufgeführt.',
    ],
  },
  videos: [{ provider: 'youtube', id: 'TRjf79QTV-s', title: 'Peter Pan' }],
  credits: [
    { role: { en: 'Music', de: 'Musik' }, name: 'Frank Schwemmer' },
    { role: { en: 'Libretto', de: 'Libretto' }, name: 'Michael Frowin' },
    { role: { en: 'Stage direction', de: 'Regie' }, name: 'Anisha Bondy' },
  ],
  awards: [],
  press: [],
  featured: true,
  order: 5,
  todos: {
    en: ['Exact premiere date', 'Further credits (conductor, design)', 'Production photos for the gallery'],
    de: ['Genaues Premierendatum', 'Weitere Credits (Dirigat, Ausstattung)', 'Produktionsfotos für die Galerie'],
  },
})
