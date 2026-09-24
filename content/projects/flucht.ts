// Quelle: docs/INHALTE.md §3 (Flucht). Kein Bildmaterial vorhanden.
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'flucht',
  title: 'Flucht',
  subtitle: { en: 'Staged concert trilogy', de: 'Szenische Konzert-Trilogie' },
  venue: { en: 'Komische Oper Berlin · Vladimir Jurowski', de: 'Komische Oper Berlin · Vladimir Jurowski' },
  year: 2019,
  yearLabel: '2019/20',
  pillar: 'create',
  role: { en: 'Direction', de: 'Regie' },
  tags: { en: ['Staged concert', 'Trilogy'], de: ['Szenisches Konzert', 'Trilogie'] },
  cover: {
    type: 'image',
    src: '/media/flucht/cover.svg',
    alt: { en: 'Placeholder cover: Flucht', de: 'Platzhalter-Cover: Flucht' },
    width: 1200,
    height: 1500,
  },
  intro: {
    en: [
      'Flucht is a trilogy of staged concerts developed for the Komische Oper Berlin under Vladimir Jurowski, presented across the 2019/20 season.',
    ],
    de: [
      'Flucht ist eine Trilogie szenischer Konzerte, entwickelt für die Komische Oper Berlin unter Vladimir Jurowski und über die Spielzeit 2019/20 gezeigt.',
    ],
  },
  videos: [],
  credits: [
    { role: { en: 'Direction', de: 'Regie' }, name: 'Anisha Bondy' },
    { role: { en: 'Musical direction', de: 'Dirigat' }, name: 'Vladimir Jurowski' },
  ],
  awards: [],
  press: [],
  featured: true,
  order: 10,
  todos: {
    en: [
      'Programme/repertoire of the three parts and exact dates',
      'No image or video material available yet',
      'Further credits',
    ],
    de: [
      'Programm/Repertoire der drei Teile und genaue Termine',
      'Noch kein Bild- oder Videomaterial vorhanden',
      'Weitere Credits',
    ],
  },
})
