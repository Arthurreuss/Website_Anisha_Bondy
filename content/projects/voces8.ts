// Quelle: docs/INHALTE.md §3 (VOCES8 – The World is Turning).
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'voces8',
  title: { en: 'The World is Turning', de: 'The World is Turning' },
  subtitle: { en: 'Interactive spectacle with VOCES8', de: 'Interaktives Spektakel mit VOCES8' },
  venue: 'Philharmonie Luxembourg',
  year: 2023,
  pillar: 'create',
  role: { en: 'Direction & concept', de: 'Regie & Konzept' },
  tags: { en: ['Vocal octet', 'New format', 'Interactive'], de: ['Vokaloktett', 'Neues Format', 'Interaktiv'] },
  cover: {
    type: 'image',
    src: '/media/voces8/cover.svg',
    alt: { en: 'Placeholder cover: The World is Turning', de: 'Platzhalter-Cover: The World is Turning' },
    width: 1200,
    height: 1500,
  },
  intro: {
    en: [
      'The World is Turning is an interactive spectacle developed for and with the British vocal octet VOCES8, turning a concert into a shared theatrical event for its audience.',
      'The production, created together with Julia Hansen for the Philharmonie Luxembourg, premiered in 2023.',
    ],
    de: [
      'The World is Turning ist ein interaktives Spektakel, entwickelt für und mit dem britischen Vokaloktett VOCES8, das ein Konzert in ein gemeinsames theatrales Ereignis für das Publikum verwandelt.',
      'Die gemeinsam mit Julia Hansen für die Philharmonie Luxembourg entwickelte Produktion wurde 2023 uraufgeführt.',
    ],
  },
  videos: [{ provider: 'vimeo', id: '828590577', hash: '52a72d49ab', title: 'The World is Turning' }],
  credits: [
    { role: { en: 'Direction & concept', de: 'Regie & Konzept' }, name: 'Anisha Bondy' },
    { role: { en: 'Concept', de: 'Konzept' }, name: 'Julia Hansen' },
  ],
  awards: [],
  press: [],
  featured: true,
  order: 6,
  todos: {
    en: ['Exact premiere date', 'Further credits', 'Production photos for the gallery'],
    de: ['Genaues Premierendatum', 'Weitere Credits', 'Produktionsfotos für die Galerie'],
  },
})
