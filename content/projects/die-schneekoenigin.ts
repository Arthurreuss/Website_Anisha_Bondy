// Quelle: docs/INHALTE.md §3 (Die Schneekönigin). Archiv, nicht in der Startgalerie.
// Rolle/weitere Details unbekannt (INHALTE §3 „Rolle/Details?“) → Todo.
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'die-schneekoenigin',
  title: { en: 'The Snow Queen', de: 'Die Schneekönigin' },
  venue: 'Komische Oper Berlin',
  year: 2010,
  pillar: 'direct',
  role: { en: 'Role to be confirmed', de: 'Rolle offen' },
  tags: { en: ['Fairy tale opera'], de: ['Märchenoper'] },
  cover: {
    type: 'image',
    src: '/media/die-schneekoenigin/cover.svg',
    alt: { en: 'Placeholder cover: The Snow Queen', de: 'Platzhalter-Cover: Die Schneekönigin' },
    width: 1200,
    height: 1500,
  },
  intro: {
    en: [
      'A production of The Snow Queen at the Komische Oper Berlin in 2010. Further details on the piece, cast and creative team are not yet documented.',
    ],
    de: [
      'Eine Produktion der Schneekönigin an der Komischen Oper Berlin im Jahr 2010. Weitere Angaben zu Stück, Besetzung und Team liegen noch nicht vor.',
    ],
  },
  videos: [],
  credits: [],
  awards: [],
  press: [],
  featured: false,
  order: 102,
  todos: {
    en: ['Exact role (director/assistant?), composer/piece version, further credits', 'Image material'],
    de: ['Genaue Rolle (Regie/Assistenz?), Komponist:in/Fassung, weitere Credits', 'Bildmaterial'],
  },
})
