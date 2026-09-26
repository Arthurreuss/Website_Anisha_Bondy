// Quelle: docs/INHALTE.md §3 (Grisey – Les espaces acoustiques). Archiv, nicht in der Startgalerie.
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'les-espaces-acoustiques',
  title: 'Les espaces acoustiques',
  subtitle: { en: 'Scenic staging after Gérard Grisey', de: 'Szenische Einrichtung nach Gérard Grisey' },
  venue: { en: 'Konzerthaus Berlin · RSB & ensemble unitedberlin · Vladimir Jurowski', de: 'Konzerthaus Berlin · RSB & ensemble unitedberlin · Vladimir Jurowski' },
  year: 2019,
  pillar: 'create',
  role: { en: 'Scenic staging', de: 'Szenische Einrichtung' },
  dates: {
    en: ['19 May 2019, Konzerthaus Berlin (Berlin premiere of the complete cycle)'],
    de: ['19. Mai 2019, Konzerthaus Berlin (Berliner Erstaufführung des ganzen Zyklus)'],
  },
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
      'A scenic staging of Gérard Grisey’s spectral cycle Les espaces acoustiques, developed with Vladimir Jurowski for the Konzerthaus Berlin: 90 minutes of music that grow from a solo viola to full orchestra, played for the first time together by the Rundfunk-Sinfonieorchester Berlin and ensemble unitedberlin.',
    ],
    de: [
      'Eine szenische Einrichtung von Gérard Griseys Spektralmusik-Zyklus Les espaces acoustiques, entwickelt mit Vladimir Jurowski für das Konzerthaus Berlin: 90 Minuten Musik, die von der Solo-Bratsche bis zum großen Orchester anwächst, erstmals gemeinsam gespielt vom Rundfunk-Sinfonieorchester Berlin und dem ensemble unitedberlin.',
    ],
  },
  videos: [],
  credits: [
    { role: { en: 'Scenic staging', de: 'Szenische Einrichtung' }, name: 'Anisha Bondy' },
    { role: { en: 'Musical direction', de: 'Dirigat' }, name: 'Vladimir Jurowski' },
    { role: { en: 'Viola', de: 'Viola' }, name: 'Jean-Claude Velin' },
    { role: { en: 'Orchestra', de: 'Orchester' }, name: 'Rundfunk-Sinfonieorchester Berlin, ensemble unitedberlin' },
  ],
  awards: [],
  press: [],
  featured: false,
  order: 101,
  todos: {
    en: ['Image material'],
    de: ['Bildmaterial'],
  },
})
