// Quellen: docs/INHALTE.md §3 (pOpera), Fondation EME Artist-Bio.
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'popera',
  title: 'pOpera',
  subtitle: { en: 'Community opera after Romeo and Juliet', de: 'Community Opera nach Romeo und Julia' },
  venue: { en: 'Fondation EME / Philharmonie Luxembourg', de: 'Fondation EME / Philharmonie Luxembourg' },
  year: 2026,
  pillar: 'participate',
  role: { en: 'Stage direction', de: 'Regie' },
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
          en: 'Children on stage throw their arms in the air, waving small yellow flags.',
          de: 'Kinder auf der Bühne reißen die Arme hoch und schwenken kleine gelbe Fähnchen.',
        },
        width: 2048,
        height: 1280,
        credit: 'Laurent Sturm',
      },
    },
    {
      type: 'group-3',
      label: { en: 'Rehearsals', de: 'Proben' },
      media: [
        {
          type: 'image',
          src: '/media/popera/02a.jpg',
          alt: {
            en: 'Anisha Bondy and a singer look at the score together.',
            de: 'Anisha Bondy und ein Sänger sehen gemeinsam in die Noten.',
          },
          width: 1200,
          height: 1500,
          credit: 'Laurent Sturm',
        },
        {
          type: 'image',
          src: '/media/popera/02b.jpg',
          alt: {
            en: 'Two people talk on the steps of the rehearsal hall.',
            de: 'Zwei Menschen im Gespräch auf den Stufen des Probensaals.',
          },
          width: 1090,
          height: 1363,
          credit: 'Inês Rebelo de Andrade',
        },
        {
          type: 'image',
          src: '/media/popera/02c.jpg',
          alt: {
            en: 'A woman explains a scene with a raised hand.',
            de: 'Eine Frau erklärt mit erhobener Hand eine Szene.',
          },
          width: 1092,
          height: 1365,
          credit: 'Sébastien Grebille',
        },
      ],
    },
    {
      type: 'single',
      label: { en: 'The community choir', de: 'Der Laienchor' },
      media: {
        type: 'image',
        src: '/media/popera/03.jpg',
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
      type: 'single',
      label: { en: 'Performance', de: 'Aufführung' },
      media: {
        type: 'image',
        src: '/media/popera/04.jpg',
        alt: {
          en: 'The stage of the Philharmonie Luxembourg with the organ, warmly lit.',
          de: 'Die Bühne der Philharmonie Luxembourg mit der Orgel, warm beleuchtet.',
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
        src: '/media/popera/05.jpg',
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
  credits: [{ role: { en: 'Stage direction', de: 'Regie' }, name: 'Anisha Bondy' }],
  awards: [],
  press: [],
  featured: true,
  order: 2,
  todos: {
    en: ['Full credits (composer/arrangement, musical direction, further team)', 'Exact premiere date'],
    de: ['Vollständige Credits (Komposition/Bearbeitung, musikalische Leitung, weiteres Team)', 'Genaues Premierendatum'],
  },
})
