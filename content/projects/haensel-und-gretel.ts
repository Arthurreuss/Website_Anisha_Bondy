// Quelle: docs/INHALTE.md §3 (Hänsel und Gretel).
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'haensel-und-gretel',
  title: { en: 'Hansel and Gretel', de: 'Hänsel und Gretel' },
  subtitle: { en: 'Narrated concert', de: 'Erzählkonzert' },
  venue: 'Philharmonie Luxembourg',
  year: 2025,
  yearLabel: '2025/26',
  pillar: 'create',
  role: { en: 'Direction', de: 'Regie' },
  tags: { en: ['Narrated concert', 'Family', 'New format'], de: ['Erzählkonzert', 'Familie', 'Neues Format'] },
  cover: {
    type: 'image',
    src: '/media/haensel-und-gretel/cover.svg',
    alt: { en: 'Placeholder cover: Hansel and Gretel', de: 'Platzhalter-Cover: Hänsel und Gretel' },
    width: 1200,
    height: 1500,
  },
  intro: {
    en: [
      'A narrated concert for the Philharmonie Luxembourg that brings the fairy tale of Hansel and Gretel to the concert stage, combining orchestral music with spoken narration for family audiences.',
      'Musical direction is by John Warner, with Malte Arkona as narrator.',
    ],
    de: [
      'Ein Erzählkonzert für die Philharmonie Luxembourg, das das Märchen von Hänsel und Gretel auf die Konzertbühne bringt und Orchestermusik mit gesprochener Erzählung für Familien verbindet.',
      'Das Dirigat übernimmt John Warner, als Erzähler moderiert Malte Arkona.',
    ],
  },
  videos: [{ provider: 'youtube', id: 'GzFMk8-KMOM', title: { en: 'Hansel and Gretel', de: 'Hänsel und Gretel' } }],
  credits: [
    { role: { en: 'Direction', de: 'Regie' }, name: 'Anisha Bondy' },
    { role: { en: 'Musical direction', de: 'Dirigat' }, name: 'John Warner' },
    { role: { en: 'Narrator', de: 'Moderation / Erzähler' }, name: 'Malte Arkona' },
  ],
  awards: [],
  press: [],
  featured: true,
  order: 9,
  todos: {
    en: ['Exact performance dates', 'Further credits', 'Production/rehearsal photos for the gallery'],
    de: ['Genaue Termine', 'Weitere Credits', 'Produktions-/Probenfotos für die Galerie'],
  },
})
