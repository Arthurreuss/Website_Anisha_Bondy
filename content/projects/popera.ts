// Quellen: docs/INHALTE.md §3 (pOpera), Fondation EME Artist-Bio.
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'popera',
  title: 'pOpera',
  subtitle: { en: 'Community opera after Romeo and Juliet', de: 'Community Opera nach Romeo und Julia' },
  venue: { en: 'Fondation EME / Philharmonie Luxembourg', de: 'Fondation EME / Philharmonie Luxembourg' },
  year: 2026,
  premiere: '2026-04-23',
  pillar: 'participate',
  role: { en: 'Devising & Stage Director', de: 'Stückentwicklung & Regie' },
  dates: {
    en: ['Premiere 23 April 2026, Philharmonie Luxembourg (Grand Auditorium)', 'School performance 24 April 2026'],
    de: ['Premiere 23. April 2026, Philharmonie Luxembourg (Grand Auditorium)', 'Schulvorstellung 24. April 2026'],
  },
  tags: { en: ['Community opera', 'Participatory', 'Romeo and Juliet'], de: ['Community Opera', 'Partizipativ', 'Romeo und Julia'] },
  cover: {
    type: 'image',
    src: '/media/popera/cover.jpg',
    alt: {
      en: 'Anisha Bondy raises her arm at a rehearsal, a sheet of paper in her hand, in front of an orange wall.',
      de: 'Anisha Bondy hebt bei der Probe den Arm, ein Blatt in der Hand, vor einer orangen Wand.',
    },
    width: 1365,
    height: 1706,
    credit: 'Laurent Sturm',
  },
  intro: {
    en: [
      'pOpera brings Shakespeare’s Romeo and Juliet to the opera stage as a community project: children and adults from Luxembourg rehearse and perform alongside professional musicians, turning the audience into participants rather than spectators.',
      'The project is produced by the Fondation EME together with the Philharmonie Luxembourg.',
    ],
    de: [
      'pOpera bringt Shakespeares Romeo und Julia als Community-Projekt auf die Opernbühne: Kinder und Erwachsene aus Luxemburg proben und spielen gemeinsam mit professionellen Musiker:innen – das Publikum wird so zu Mitwirkenden statt nur Zuschauenden.',
      'Produziert wird das Projekt von der Fondation EME gemeinsam mit der Philharmonie Luxembourg.',
    ],
  },
  gallery: [
    {
      type: 'single',
      label: { en: 'Together on stage', de: 'Gemeinsam auf der Bühne' },
      media: {
        type: 'image',
        src: '/media/popera/01.jpg',
        alt: {
          en: 'The whole community on stage – children, young people and adults – waving colourful flags.',
          de: 'Die ganze Gemeinschaft auf der Bühne – Kinder, Jugendliche und Erwachsene – schwenkt bunte Fähnchen.',
        },
        width: 2048,
        height: 1280,
        credit: 'Laurent Sturm',
      },
    },
    {
      type: 'group-3',
      label: { en: 'Backstage', de: 'Hinter der Bühne' },
      media: [
        {
          type: 'image',
          src: '/media/popera/02a.jpg',
          alt: {
            en: 'Performers crowd cheerfully into a wood-panelled corridor backstage.',
            de: 'Mitwirkende drängen sich fröhlich in einem holzgetäfelten Gang hinter der Bühne.',
          },
          width: 1092,
          height: 1365,
          credit: 'Laurent Sturm',
        },
        {
          type: 'image',
          src: '/media/popera/02b.jpg',
          alt: {
            en: 'Children in green hoodies and adults make their way to the stage.',
            de: 'Kinder in grünen Kapuzenjacken und Erwachsene auf dem Weg zur Bühne.',
          },
          width: 1092,
          height: 1365,
          credit: 'Laurent Sturm',
        },
        {
          type: 'image',
          src: '/media/popera/02c.jpg',
          alt: {
            en: 'A woman with headphones and a microphone laughs in the blue light of the wings.',
            de: 'Eine Frau mit Kopfhörer und Mikrofon lacht im blauen Licht der Seitenbühne.',
          },
          width: 1092,
          height: 1365,
          credit: 'Laurent Sturm',
        },
      ],
    },
    {
      type: 'single',
      label: { en: 'Rehearsals', de: 'Proben' },
      media: {
        type: 'image',
        src: '/media/popera/03.jpg',
        alt: {
          en: 'Children on stage throw their arms in the air, waving small yellow flags.',
          de: 'Kinder auf der Bühne reißen die Arme hoch und schwenken kleine gelbe Fähnchen.',
        },
        width: 2048,
        height: 1280,
        credit: 'Laurent Sturm',
      },
    },
    {
      type: 'single',
      label: { en: 'The community choir', de: 'Der Laienchor' },
      media: {
        type: 'image',
        src: '/media/popera/04.jpg',
        alt: {
          en: 'Anisha Bondy rehearses with a large choir of participants of all ages.',
          de: 'Anisha Bondy probt mit einem großen Chor aus Mitwirkenden jeden Alters.',
        },
        width: 2048,
        height: 1280,
        credit: 'Laurent Sturm',
      },
    },
    {
      type: 'group-3',
      label: { en: 'Scenes', de: 'Szenen' },
      media: [
        {
          type: 'image',
          src: '/media/popera/05a.jpg',
          alt: {
            en: 'Young people in caps and sports shirts sit together on concrete steps.',
            de: 'Jugendliche mit Kappen und Trikots sitzen zusammen auf Betonstufen.',
          },
          width: 1092,
          height: 1365,
          credit: 'Laurent Sturm',
        },
        {
          type: 'image',
          src: '/media/popera/05b.jpg',
          alt: {
            en: 'Performers dance on two balconies of the set, a disco ball above them.',
            de: 'Mitwirkende tanzen auf zwei Balkonen des Bühnenbilds, darüber eine Discokugel.',
          },
          width: 1093,
          height: 1366,
          credit: 'Sébastien Grebille',
        },
        {
          type: 'image',
          src: '/media/popera/05c.jpg',
          alt: {
            en: 'Two people with microphones speak from the stage.',
            de: 'Zwei Menschen sprechen mit Mikrofonen von der Bühne.',
          },
          width: 1200,
          height: 1500,
          credit: 'Sébastien Grebille',
        },
      ],
    },
    {
      type: 'single',
      label: { en: 'Performance', de: 'Aufführung' },
      media: {
        type: 'image',
        src: '/media/popera/06.jpg',
        alt: {
          en: 'View over the shoulders of the audience to the performers on the balconies of the red set.',
          de: 'Blick über die Schultern des Publikums auf die Mitwirkenden auf den Balkonen der roten Bühne.',
        },
        width: 2048,
        height: 1280,
        credit: 'Laurent Sturm',
      },
    },
    {
      type: 'single',
      label: { en: 'Audience', de: 'Publikum' },
      media: {
        type: 'image',
        src: '/media/popera/07.jpg',
        alt: {
          en: 'The packed Grand Auditorium of the Philharmonie Luxembourg.',
          de: 'Das voll besetzte Grand Auditorium der Philharmonie Luxembourg.',
        },
        width: 2048,
        height: 1280,
        credit: 'Laurent Sturm',
      },
    },
    {
      type: 'single',
      label: { en: 'In the midst of the audience', de: 'Mitten im Publikum' },
      media: {
        type: 'image',
        src: '/media/popera/08.jpg',
        alt: {
          en: 'Costumed participants move through the audience along a red barrier.',
          de: 'Kostümierte Mitwirkende ziehen an einer roten Absperrung entlang durchs Publikum.',
        },
        width: 2048,
        height: 1280,
        credit: 'Laurent Sturm',
      },
    },
  ],
  videos: [{ provider: 'youtube', id: 'Ug5YmCOTu3M', title: 'pOpera' }],
  credits: [
    { role: { en: 'Music', de: 'Musik' }, name: 'Tim Wollmann' },
    { role: { en: 'Text', de: 'Text' }, name: 'Antoine Pohu' },
    { role: { en: 'Concept & Artistic Director', de: 'Konzept & künstlerische Leitung' }, name: 'Paulo Lameiro' },
    { role: { en: 'Devising & Stage Director', de: 'Stückentwicklung & Regie' }, name: 'Anisha Bondy' },
    { role: { en: 'Co-Director & Choreography', de: 'Co-Regie & Choreografie' }, name: 'Mariana Souza' },
    { role: { en: 'Set & costumes', de: 'Bühne & Kostüme' }, name: 'Anne Hölzinger' },
    { role: { en: 'Musical Director', de: 'Musikalische Leitung' }, name: 'Ivan Boumans' },
    { role: { en: 'Choir Director', de: 'Chorleitung' }, name: 'Julie Colin, Pit Heyart' },
    { role: { en: 'Orchestra', de: 'Orchester' }, name: 'Luxembourg Philharmonic' },
    {
      role: { en: 'Cast', de: 'Mit' },
      name: 'Stephany Ortega (Juliet), Johannes Bamberger (Romeo), Fredrika Brillembourg (Pigeon Lady), Tijl Faveyts (Housekeeper), children as Princess, community choir, Pueri Cantores du Conservatoire de la Ville de Luxembourg, choir of the CLI Adam Roberti school',
    },
  ],
  awards: [],
  press: [],
  featured: true,
  order: 2,
})
