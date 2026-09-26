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
  dates: {
    en: ['Premiere 27 February 2018, Konzerthaus Berlin (Werner-Otto-Saal)'],
    de: ['Erstaufführung 27. Februar 2018, Konzerthaus Berlin (Werner-Otto-Saal)'],
  },
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
      'A scenic staging of works by Claude Vivier, developed with ensemble unitedberlin under Vladimir Jurowski for the Konzerthaus Berlin. The evening marked the composer’s 70th birthday and the 35th anniversary of his death, after an idea by Andreas Bräutigam.',
      'Programme: Glaubst Du an die Unsterblichkeit der Seele?, Hiérophanie, Et je reverrai cette ville étrange and Bouchara – with Max Hopp as “Claude”.',
    ],
    de: [
      'Eine szenische Einrichtung von Werken Claude Viviers, entwickelt mit dem ensemble unitedberlin unter Vladimir Jurowski für das Konzerthaus Berlin – zum 70. Geburtstag und 35. Todestag des Komponisten, nach einer Idee von Andreas Bräutigam.',
      'Programm: Glaubst Du an die Unsterblichkeit der Seele?, Hiérophanie, Et je reverrai cette ville étrange und Bouchara – mit Max Hopp als „Claude“.',
    ],
  },
  videos: [],
  credits: [
    { role: { en: 'Scenic staging', de: 'Szenische Einrichtung' }, name: 'Anisha Bondy' },
    { role: { en: 'Musical direction', de: 'Dirigat' }, name: 'Vladimir Jurowski' },
    { role: { en: 'Idea', de: 'Idee' }, name: 'Andreas Bräutigam' },
    { role: { en: 'Soprano', de: 'Sopran' }, name: 'Allison Bell' },
    { role: { en: 'Speaker', de: 'Sprecher' }, name: 'Max Hopp' },
    { role: { en: 'Percussion', de: 'Schlagzeug' }, name: 'Guillaume Vairet' },
    { role: { en: 'Electronics', de: 'Elektronik' }, name: 'Andre Bartetzki' },
    { role: { en: 'Ensembles', de: 'Ensembles' }, name: 'ensemble unitedberlin, Vocalconsort Berlin' },
  ],
  awards: [],
  press: [
    {
      source: 'Berliner Morgenpost',
      author: 'Matthias Nöther',
      date: '2018-03-02',
      quote: {
        en: 'Director Anisha Bondy and ensemble unitedberlin manage to link the maxims that run through Vivier’s work with the composer’s tragic fate in this small scenic retrospective.',
        de: 'Regisseurin Anisha Bondy und das Ensemble United verstehen es, in dieser kleinen, szenischen Werkschau Sinnsprüche, die Viviers Werk durchziehen, mit dem tragischen Schicksal des Komponisten zu verknüpfen.',
      },
    },
    {
      source: 'Tagesspiegel',
      author: 'Isabel Herzfeld',
      date: '2018-03-01',
      url: 'https://www.tagesspiegel.de/kultur/jurowski-und-unitedberlin-hommage-an-claude-vivier/21014436.html',
    },
  ],
  featured: false,
  order: 100,
  todos: {
    en: ['Image material'],
    de: ['Bildmaterial'],
  },
})
