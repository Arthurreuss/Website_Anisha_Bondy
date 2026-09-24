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
      en: 'Children wave small yellow flags at a pOpera event of the Fondation EME.',
      de: 'Kinder schwenken kleine gelbe Fähnchen bei einer pOpera-Veranstaltung der Fondation EME.',
    },
    width: 342,
    height: 427,
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
  videos: [{ provider: 'youtube', id: 'Ug5YmCOTu3M', title: 'pOpera' }],
  credits: [{ role: { en: 'Stage direction', de: 'Regie' }, name: 'Anisha Bondy' }],
  awards: [],
  press: [],
  featured: true,
  order: 2,
  todos: {
    en: [
      'Full credits (composer/arrangement, musical direction, further team)',
      'Exact premiere date',
      'Photo credit for the cover image',
      'Production photos for the gallery',
    ],
    de: [
      'Vollständige Credits (Komposition/Bearbeitung, musikalische Leitung, weiteres Team)',
      'Genaues Premierendatum',
      'Bildnachweis für das Cover',
      'Produktionsfotos für die Galerie',
    ],
  },
})
