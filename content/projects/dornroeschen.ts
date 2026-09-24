// Quelle: docs/INHALTE.md §3 (Dornröschen).
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'dornroeschen',
  title: { en: 'Sleeping Beauty', de: 'Dornröschen' },
  subtitle: { en: 'Music dance theatre after Tchaikovsky', de: 'Musiktanztheater nach Tschaikowsky' },
  venue: 'Philharmonie Luxembourg',
  year: 2026,
  pillar: 'create',
  role: { en: 'Direction', de: 'Regie' },
  tags: { en: ['Dance', 'Tchaikovsky', 'New format'], de: ['Tanz', 'Tschaikowsky', 'Neues Format'] },
  cover: {
    type: 'image',
    src: '/media/dornroeschen/cover.svg',
    alt: { en: 'Placeholder cover: Sleeping Beauty', de: 'Platzhalter-Cover: Dornröschen' },
    width: 1200,
    height: 1500,
  },
  intro: {
    en: [
      'A music dance theatre production built around Tchaikovsky’s score for Sleeping Beauty, bringing dance and staged narration together for the Philharmonie Luxembourg.',
      'Choreography is by Mariana Souza, with musical direction by Sasha Scolnik-Brower.',
    ],
    de: [
      'Ein Musiktanztheater rund um Tschaikowskys Partitur zu Dornröschen, das Tanz und szenisches Erzählen für die Philharmonie Luxembourg zusammenbringt.',
      'Die Choreografie stammt von Mariana Souza, das Dirigat übernimmt Sasha Scolnik-Brower.',
    ],
  },
  videos: [{ provider: 'youtube', id: 'z7sEa5xDJAg', title: { en: 'Sleeping Beauty', de: 'Dornröschen' } }],
  credits: [
    { role: { en: 'Direction', de: 'Regie' }, name: 'Anisha Bondy' },
    { role: { en: 'Choreography', de: 'Choreografie' }, name: 'Mariana Souza' },
    { role: { en: 'Musical direction', de: 'Dirigat' }, name: 'Sasha Scolnik-Brower' },
  ],
  awards: [],
  press: [],
  featured: true,
  order: 7,
  todos: {
    en: ['Exact premiere date', 'Further credits', 'Production/rehearsal photos for the gallery'],
    de: ['Genaues Premierendatum', 'Weitere Credits', 'Produktions-/Probenfotos für die Galerie'],
  },
})
