// Quelle: docs/INHALTE.md §3 (Flucht), Antworten Anisha D-049. Kein Bildmaterial, nur Trailer.
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'flucht',
  title: 'Flucht',
  subtitle: { en: 'Staged concert trilogy', de: 'Szenische Konzert-Trilogie' },
  venue: 'Komische Oper Berlin',
  year: 2019,
  yearLabel: '2019/20',
  pillar: 'create',
  role: { en: 'Direction', de: 'Regie' },
  dates: {
    en: ['Flucht I – Vom Auswandern: 15 September 2019', 'Flucht II – Vom Einwandern: 26 January 2020', 'Flucht III – Vom Bleiben: 2020, as a recording only'],
    de: ['Flucht I – Vom Auswandern: 15. September 2019', 'Flucht II – Vom Einwandern: 26. Januar 2020', 'Flucht III – Vom Bleiben: 2020, nur als Aufzeichnung'],
  },
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
      'Flucht is a trilogy of staged concerts for the Komische Oper Berlin in the 2019/20 season. Musicians with very different experiences of flight tell their own stories through music, with audience and performers sharing the stage.',
      'Part I, “Vom Auswandern” (On Emigrating), traced 200 years of German emigration – from Wagner’s Wesendonck songs, written in Swiss exile, to recordings of the Jewish Semer label and musicians who fled the GDR in 1989. Part II, “Vom Einwandern” (On Immigrating), brought together musicians who have come to Germany in recent decades, among them the band Safar and the Babylon Orchestra. Part III, “Vom Bleiben” (On Staying), asks what comes after arrival – because of the pandemic it could only be shown as a recording.',
    ],
    de: [
      'Flucht ist eine Trilogie szenischer Konzerte für die Komische Oper Berlin in der Spielzeit 2019/20. Musiker:innen mit ganz unterschiedlichen Fluchterfahrungen erzählen mit Musik von ihren Lebenswegen; Publikum und Mitwirkende teilen sich die Bühne.',
      'Teil I, „Vom Auswandern“, spannte den Bogen über 200 Jahre deutscher Emigrationsgeschichte – von Wagners Wesendonck-Liedern aus dem Schweizer Exil über Aufnahmen des jüdischen Semer-Labels bis zu Musiker:innen, die 1989 aus der DDR flohen. Teil II, „Vom Einwandern“, versammelte Musiker:innen, die in den letzten Jahrzehnten nach Deutschland gekommen sind, darunter die Band Safar und das Babylon Orchestra. Teil III, „Vom Bleiben“, fragt, was nach dem Ankommen kommt – wegen der Pandemie war er nur als Aufzeichnung zu sehen.',
    ],
  },
  videos: [{ provider: 'youtube', id: 'NUGsQ-HoR54', title: { en: 'Flucht – trailer', de: 'Flucht – Trailer' } }],
  credits: [
    { role: { en: 'Direction', de: 'Regie' }, name: 'Anisha Bondy' },
    { role: { en: 'Musical direction (Flucht I)', de: 'Musikalische Leitung (Flucht I)' }, name: 'Stefan Sanderling' },
    { role: { en: 'Mezzo-soprano (Flucht I)', de: 'Mezzosopran (Flucht I)' }, name: 'Karolina Gumos' },
    { role: { en: 'With (Flucht II)', de: 'Mit (Flucht II)' }, name: 'Safar, Babylon Orchestra' },
  ],
  awards: [],
  press: [],
  featured: true,
  order: 10,
  todos: {
    en: ['Production photos or the trailer as a video file (for the cover)'],
    de: ['Produktionsfotos oder der Trailer als Videodatei (für das Cover)'],
  },
})
