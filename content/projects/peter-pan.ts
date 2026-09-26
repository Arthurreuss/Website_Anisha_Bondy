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
  dates: {
    en: ['World premiere 4 May 2024, Philharmonie Luxembourg'],
    de: ['Uraufführung 4. Mai 2024, Philharmonie Luxembourg'],
  },
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
    { role: { en: 'Musical direction', de: 'Musikalische Leitung' }, name: 'Harry Ogg, David Fernández Caravaca' },
    { role: { en: 'Set', de: 'Bühne' }, name: 'Julia Hansen' },
    { role: { en: 'Costumes', de: 'Kostüme' }, name: 'Uta Jäger' },
    { role: { en: 'Lighting', de: 'Licht' }, name: 'Michael Morgan' },
    { role: { en: 'Video', de: 'Video' }, name: 'Étienne Guiol, Thomas Ocampo, Johan Pirroux' },
    { role: { en: 'Orchestra', de: 'Orchester' }, name: 'Luxembourg Philharmonic' },
    { role: { en: 'Choir', de: 'Chor' }, name: 'Pueri Cantores du Conservatoire de la Ville de Luxembourg · Pierre Nimax' },
    {
      role: { en: 'Cast', de: 'Mit' },
      name: 'Peter Kirk, Georgina Fürstenberg, Juliana Zara, Maria Fiselier, Beniamin Pop, William Wallace',
    },
  ],
  awards: [],
  press: [],
  featured: true,
  order: 5,
  todos: {
    en: ['Production photos for the gallery'],
    de: ['Produktionsfotos für die Galerie'],
  },
})
