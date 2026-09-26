// Quelle: docs/INHALTE.md §3 (Die Nacht vor Weihnachten) und §4 (Presse).
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'die-nacht-vor-weihnachten',
  title: { en: 'The Night Before Christmas', de: 'Die Nacht vor Weihnachten' },
  subtitle: { en: 'Staged concert after Rimsky-Korsakov', de: 'Szenisches Konzert nach Rimski-Korsakow' },
  venue: {
    en: 'Rundfunk-Sinfonieorchester Berlin · Vladimir Jurowski, Philharmonie Berlin, George Enescu Choir Bucharest',
    de: 'Rundfunk-Sinfonieorchester Berlin · Vladimir Jurowski, Philharmonie Berlin, George-Enescu-Chor Bukarest',
  },
  year: 2022,
  pillar: 'create',
  role: { en: 'Scenic staging', de: 'Szenische Einrichtung' },
  dates: {
    en: ['23 December 2022, Philharmonie Berlin'],
    de: ['23. Dezember 2022, Philharmonie Berlin'],
  },
  tags: { en: ['Staged concert', 'Rimsky-Korsakov', 'Christmas'], de: ['Szenisches Konzert', 'Rimski-Korsakow', 'Weihnachten'] },
  cover: {
    type: 'image',
    src: '/media/die-nacht-vor-weihnachten/cover.svg',
    alt: { en: 'Placeholder cover: The Night Before Christmas', de: 'Platzhalter-Cover: Die Nacht vor Weihnachten' },
    width: 1200,
    height: 1500,
  },
  intro: {
    en: [
      'A scenic staging of Rimsky-Korsakov’s opera The Night Before Christmas as a concert production, developed for the Rundfunk-Sinfonieorchester Berlin under Vladimir Jurowski with the George Enescu Choir Bucharest.',
      'The production was performed at the Philharmonie Berlin in December 2022.',
    ],
    de: [
      'Eine szenische Einrichtung von Rimski-Korsakows Oper Die Nacht vor Weihnachten als Konzertproduktion, entwickelt für das Rundfunk-Sinfonieorchester Berlin unter Vladimir Jurowski mit dem George-Enescu-Chor Bukarest.',
      'Die Produktion war im Dezember 2022 in der Philharmonie Berlin zu sehen.',
    ],
  },
  videos: [{ provider: 'youtube', id: '0SRwI1FEzZM', title: { en: 'The Night Before Christmas – trailer (RSB)', de: 'Die Nacht vor Weihnachten – Trailer (RSB)' } }],
  credits: [
    { role: { en: 'Musical direction', de: 'Dirigat' }, name: 'Vladimir Jurowski' },
    { role: { en: 'Scenic staging', de: 'Szenische Einrichtung' }, name: 'Anisha Bondy' },
    { role: { en: 'Costumes', de: 'Kostüme' }, name: 'Uta Jäger, Saskia Theis' },
    { role: { en: 'Lighting', de: 'Licht' }, name: 'Marco Philipp' },
    { role: { en: 'Video', de: 'Video' }, name: 'Benjamin Spencer Weiß' },
    { role: { en: 'Orchestra', de: 'Orchester' }, name: 'Rundfunk-Sinfonieorchester Berlin' },
    { role: { en: 'Choir', de: 'Chor' }, name: 'Philharmonischer Chor „George Enescu“ Bukarest · Ion Iosif Prunner' },
    {
      role: { en: 'Cast', de: 'Mit' },
      name: 'Mikhail Vekua, Sofia Fomina, Dmitry Ulyanov, Ksenia Dudnikova, Alexander Fedorov, Marina Prudenskaya, Sergei Leiferkus, Milan Siljanov, Vsevolod Grivnov, Nadine Weissmann, Josefine Mindus',
    },
  ],
  awards: [],
  press: [
    {
      source: 'Tagesspiegel',
      author: 'Frederik Hanssen',
      date: '2022-12-24',
      url: 'https://www.tagesspiegel.de/kultur/weihnachtsoper-schmiede-dir-dein-gluck-9088726.html',
    },
    {
      source: 'Bachtrack',
      author: 'Svenja Koch',
      date: '2022-12-27',
      url: 'https://bachtrack.com/kritik-rimsky-korsakow-nacht-vor-weihnachten-jurowski-rundfunk-sinfonieorchester-philharmonie-berlin-dezember-2022',
    },
  ],
  featured: true,
  order: 8,
  todos: {
    en: [
      'Production photos for the gallery',
    ],
    de: [
      'Produktionsfotos für die Galerie',
    ],
  },
})
