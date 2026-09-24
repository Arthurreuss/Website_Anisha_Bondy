// Quelle: docs/INHALTE.md §3 (Claude Vivier – 70/35 – a sacred act). Archiv, nicht in der Startgalerie.
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'vivier-70-35',
  title: '70/35 – a sacred act',
  subtitle: { en: 'Scenic staging after Claude Vivier', de: 'Szenische Einrichtung nach Claude Vivier' },
  venue: { en: 'Konzerthaus Berlin, ensemble unitedberlin · Vladimir Jurowski', de: 'Konzerthaus Berlin, ensemble unitedberlin · Vladimir Jurowski' },
  year: 2018,
  pillar: 'create',
  role: { en: 'Scenic staging', de: 'Szenische Einrichtung' },
  tags: { en: ['Claude Vivier', 'Staged concert'], de: ['Claude Vivier', 'Szenisches Konzert'] },
  cover: {
    type: 'image',
    src: '/media/vivier-70-35/cover.svg',
    alt: { en: 'Placeholder cover: 70/35 – a sacred act', de: 'Platzhalter-Cover: 70/35 – a sacred act' },
    width: 1200,
    height: 1500,
  },
  intro: {
    en: [
      'A scenic staging of works by Claude Vivier, developed with ensemble unitedberlin under Vladimir Jurowski for the Konzerthaus Berlin.',
    ],
    de: [
      'Eine szenische Einrichtung von Werken Claude Viviers, entwickelt mit dem ensemble unitedberlin unter Vladimir Jurowski für das Konzerthaus Berlin.',
    ],
  },
  videos: [],
  credits: [
    { role: { en: 'Scenic staging', de: 'Szenische Einrichtung' }, name: 'Anisha Bondy' },
    { role: { en: 'Musical direction', de: 'Dirigat' }, name: 'Vladimir Jurowski' },
  ],
  awards: [],
  press: [],
  featured: false,
  order: 100,
  todos: {
    en: ['Exact programme/date', 'Further credits', 'Image material'],
    de: ['Genaues Programm/Datum', 'Weitere Credits', 'Bildmaterial'],
  },
})
