// Quelle: docs/INHALTE.md §3 (Grisey – Les espaces acoustiques). Archiv, nicht in der Startgalerie.
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'les-espaces-acoustiques',
  title: 'Les espaces acoustiques',
  subtitle: { en: 'Scenic staging after Gérard Grisey', de: 'Szenische Einrichtung nach Gérard Grisey' },
  venue: { en: 'Konzerthaus Berlin · Vladimir Jurowski', de: 'Konzerthaus Berlin · Vladimir Jurowski' },
  year: 2019,
  pillar: 'create',
  role: { en: 'Scenic staging', de: 'Szenische Einrichtung' },
  tags: { en: ['Gérard Grisey', 'Staged concert'], de: ['Gérard Grisey', 'Szenisches Konzert'] },
  cover: {
    type: 'image',
    src: '/media/les-espaces-acoustiques/cover.svg',
    alt: { en: 'Placeholder cover: Les espaces acoustiques', de: 'Platzhalter-Cover: Les espaces acoustiques' },
    width: 1200,
    height: 1500,
  },
  intro: {
    en: [
      'A scenic staging of Gérard Grisey’s spectral cycle Les espaces acoustiques, developed under Vladimir Jurowski for the Konzerthaus Berlin.',
    ],
    de: [
      'Eine szenische Einrichtung von Gérard Griseys Spektralmusik-Zyklus Les espaces acoustiques, entwickelt unter Vladimir Jurowski für das Konzerthaus Berlin.',
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
  order: 101,
  todos: {
    en: ['Exact programme/date', 'Further credits', 'Image material'],
    de: ['Genaues Programm/Datum', 'Weitere Credits', 'Bildmaterial'],
  },
})
