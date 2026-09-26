// Quelle: docs/INHALTE.md §3 (Flucht). Kein Bildmaterial vorhanden.
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
    en: ['Flucht I – Vom Auswandern: 15 September 2019', 'Flucht II – Vom Einwandern: 26 January 2020'],
    de: ['Flucht I – Vom Auswandern: 15. September 2019', 'Flucht II – Vom Einwandern: 26. Januar 2020'],
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
      'Part I, “Vom Auswandern” (On Emigrating), traced 200 years of German emigration – from Wagner’s Wesendonck songs, written in Swiss exile, to recordings of the Jewish Semer label and musicians who fled the GDR in 1989. Part II, “Vom Einwandern” (On Immigrating), brought together musicians who have come to Germany in recent decades, among them the band Safar and the Babylon Orchestra. Part III, “Vom Bleiben” (On Staying), was to ask what comes after arrival.',
    ],
    de: [
      'Flucht ist eine Trilogie szenischer Konzerte für die Komische Oper Berlin in der Spielzeit 2019/20. Musiker:innen mit ganz unterschiedlichen Fluchterfahrungen erzählen mit Musik von ihren Lebenswegen; Publikum und Mitwirkende teilen sich die Bühne.',
      'Teil I, „Vom Auswandern“, spannte den Bogen über 200 Jahre deutscher Emigrationsgeschichte – von Wagners Wesendonck-Liedern aus dem Schweizer Exil über Aufnahmen des jüdischen Semer-Labels bis zu Musiker:innen, die 1989 aus der DDR flohen. Teil II, „Vom Einwandern“, versammelte Musiker:innen, die in den letzten Jahrzehnten nach Deutschland gekommen sind, darunter die Band Safar und das Babylon Orchestra. Teil III, „Vom Bleiben“, sollte fragen, was nach dem Ankommen kommt.',
    ],
  },
  videos: [],
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
    en: ['Did Flucht III (planned for 15 May 2020) take place?', 'No image or video material available yet'],
    de: ['Hat Flucht III (geplant 15.05.2020) stattgefunden?', 'Noch kein Bild- oder Videomaterial vorhanden'],
  },
})
