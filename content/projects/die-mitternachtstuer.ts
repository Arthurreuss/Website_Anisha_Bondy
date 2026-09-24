// Quelle: docs/INHALTE.md §3/§7 (Die Mitternachtstür). Archiv, nicht in der Startgalerie.
// Nahezu alle Angaben unbekannt – Säule vorläufig "create" (Todo).
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'die-mitternachtstuer',
  title: { en: 'The Midnight Door', de: 'Die Mitternachtstür' },
  subtitle: { en: 'World premiere', de: 'Uraufführung' },
  venue: { en: 'Not yet known', de: 'Noch nicht bekannt' },
  year: 2026,
  pillar: 'create',
  role: { en: 'Role to be confirmed', de: 'Rolle offen' },
  tags: { en: ['World premiere'], de: ['Uraufführung'] },
  cover: {
    type: 'image',
    src: '/media/die-mitternachtstuer/cover.svg',
    alt: { en: 'Placeholder cover: The Midnight Door', de: 'Platzhalter-Cover: Die Mitternachtstür' },
    width: 1200,
    height: 1500,
  },
  intro: {
    en: ['A world premiere planned for 2026. Details on venue, piece and Anisha Bondy’s role are not yet public.'],
    de: ['Eine für 2026 geplante Uraufführung. Angaben zu Haus, Stück und Anisha Bondys Rolle sind noch nicht öffentlich.'],
  },
  videos: [],
  credits: [],
  awards: [],
  press: [],
  featured: false,
  order: 103,
  todos: {
    en: [
      'Venue/house, exact date',
      'Piece, composer/author, Anisha Bondy’s role',
      'Assigned pillar (currently a preliminary “create”)',
      'Image material',
    ],
    de: [
      'Haus/Venue, genaues Datum',
      'Stück, Komponist:in/Autor:in, Anisha Bondys Rolle',
      'Zugeordnete Säule (aktuell vorläufig „create“)',
      'Bildmaterial',
    ],
  },
})
