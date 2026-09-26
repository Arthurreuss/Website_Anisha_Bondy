// Quelle: docs/INHALTE.md §3 (Hänsel und Gretel).
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'haensel-und-gretel',
  title: { en: 'Hansel and Gretel', de: 'Hänsel und Gretel' },
  subtitle: { en: 'Narrated concert', de: 'Erzählkonzert' },
  venue: 'Philharmonie Luxembourg',
  year: 2025,
  pillar: 'create',
  role: { en: 'Direction', de: 'Regie' },
  dates: {
    en: ['20 December 2025, Philharmonie Luxembourg (Grand Auditorium)'],
    de: ['20. Dezember 2025, Philharmonie Luxembourg (Grand Auditorium)'],
  },
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
      'A narrated concert for the Philharmonie Luxembourg that brings Engelbert Humperdinck’s Hansel and Gretel to the concert stage, combining orchestral music, singers and a children’s choir with spoken narration for family audiences.',
      'Musical direction is by John Warner, with Malte Arkona as narrator.',
    ],
    de: [
      'Ein Erzählkonzert für die Philharmonie Luxembourg, das Engelbert Humperdincks Hänsel und Gretel auf die Konzertbühne bringt und Orchester, Gesang und Kinderchor mit gesprochener Erzählung für Familien verbindet.',
      'Das Dirigat übernimmt John Warner, als Erzähler moderiert Malte Arkona.',
    ],
  },
  videos: [{ provider: 'youtube', id: 'GzFMk8-KMOM', title: { en: 'Hansel and Gretel', de: 'Hänsel und Gretel' } }],
  credits: [
    { role: { en: 'Direction', de: 'Regie' }, name: 'Anisha Bondy' },
    { role: { en: 'Musical direction', de: 'Dirigat' }, name: 'John Warner' },
    { role: { en: 'Narrator', de: 'Moderation / Erzähler' }, name: 'Malte Arkona' },
    { role: { en: 'Music', de: 'Musik' }, name: 'Engelbert Humperdinck' },
    { role: { en: 'Text', de: 'Text' }, name: 'Pamela Dürr' },
    { role: { en: 'Set', de: 'Bühne' }, name: 'David Münch' },
    { role: { en: 'Costumes', de: 'Kostüme' }, name: 'Renate Vogg' },
    { role: { en: 'Orchestra', de: 'Orchester' }, name: 'Luxembourg Philharmonic' },
    { role: { en: 'Children’s choir', de: 'Kinderchor' }, name: 'Kinderchor Forte (Conservatoire de la Ville de Luxembourg) · Sylvie Serra-Jacobs' },
    {
      role: { en: 'Cast', de: 'Mit' },
      name: 'Svetlina Stoyanova, Eirin Rognerud, Maria Fiselier, Arthur Alves Pacheco, Pavla Suselj',
    },
  ],
  awards: [],
  press: [],
  featured: true,
  order: 9,
  todos: {
    en: ['Production/rehearsal photos for the gallery'],
    de: ['Produktions-/Probenfotos für die Galerie'],
  },
})
