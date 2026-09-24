// Quelle: docs/INHALTE.md §3 (Der Zauberer von Oz), §6/§7 Punkt 10 (Text als erstes eigenes Stück).
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'der-zauberer-von-oz',
  title: { en: 'The Wizard of Oz', de: 'Der Zauberer von Oz' },
  subtitle: { en: 'Music theatre with puppetry', de: 'Musiktheater mit Puppenspiel' },
  venue: {
    en: 'Philharmonie Luxembourg & Musikverein Vienna (Brucknerhaus Linz, 03/2027)',
    de: 'Philharmonie Luxembourg & Musikverein Wien (Brucknerhaus Linz, 03/2027)',
  },
  year: 2026,
  pillar: 'create',
  role: { en: 'Text & direction', de: 'Text & Regie' },
  tags: { en: ['Puppetry', 'Family opera', 'First own text'], de: ['Puppenspiel', 'Familienoper', 'Erster eigener Text'] },
  cover: {
    type: 'image',
    src: '/media/der-zauberer-von-oz/cover.svg',
    alt: { en: 'Placeholder cover: The Wizard of Oz', de: 'Platzhalter-Cover: Der Zauberer von Oz' },
    width: 1200,
    height: 1500,
  },
  intro: {
    en: [
      'A music theatre production for the whole family, combining live music with puppetry: Dorothy’s journey through Oz unfolds through song, sound and puppet figures built and performed by Suse Wächter.',
      'The text is Anisha Bondy’s first own libretto, written together with the production’s staging. The piece is a co-production of the Philharmonie Luxembourg and the Musikverein Vienna, with a further run at the Brucknerhaus Linz planned for March 2027.',
    ],
    de: [
      'Ein Musiktheaterstück für die ganze Familie, das live gespielte Musik mit Puppenspiel verbindet: Dorothys Reise durch Oz entsteht aus Gesang, Klang und Puppenfiguren, gebaut und gespielt von Suse Wächter.',
      'Der Text ist Anisha Bondys erstes eigenes Libretto, entstanden gemeinsam mit der Inszenierung. Das Stück ist eine Koproduktion der Philharmonie Luxembourg und des Musikvereins Wien, eine weitere Vorstellungsserie am Brucknerhaus Linz ist für März 2027 geplant.',
    ],
  },
  videos: [
    { provider: 'youtube', id: 'WvE5Xzjf6kU', title: { en: 'The Wizard of Oz', de: 'Der Zauberer von Oz' }, aspect: '9:16' },
    { provider: 'youtube', id: 'XFyY4etJ63Y', title: { en: 'The Wizard of Oz', de: 'Der Zauberer von Oz' } },
  ],
  credits: [
    { role: { en: 'Music', de: 'Musik' }, name: 'Matthias Werner' },
    { role: { en: 'Text & direction', de: 'Text & Regie' }, name: 'Anisha Bondy' },
    { role: { en: 'Text, puppets & concept', de: 'Text, Puppen & Konzept' }, name: 'Suse Wächter' },
    { role: { en: 'Costume & set', de: 'Kostüm & Bühne' }, name: 'Renate Vogg' },
    { role: { en: 'Performer', de: 'Spiel' }, name: 'Lenya Gramß' },
    { role: { en: 'Clarinet', de: 'Klarinette' }, name: 'Frédéric Alvarado-Dupuy' },
    { role: { en: 'Trombone / bass trumpet', de: 'Posaune / Bassstrompete' }, name: 'Thomas Winalek' },
    { role: { en: 'Piano', de: 'Klavier' }, name: 'Mitra Kotte' },
  ],
  awards: [],
  press: [],
  featured: true,
  order: 4,
  todos: {
    en: ['Exact premiere date', 'Production/rehearsal photos for the gallery'],
    de: ['Genaues Premierendatum', 'Produktions-/Probenfotos für die Galerie'],
  },
})
