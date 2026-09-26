// Datenvertrag für Projekte (D-009, v2 nach D-018). Seiten und Komponenten
// arbeiten nur gegen `Project` (bereits in eine Sprache aufgelöst). Die
// Quelldateien in content/projects/ nutzen `ProjectSource` mit `{ en, de }`.

export type Locale = 'en' | 'de'
/** Text in beiden Sprachen */
export type L<T = string> = { en: T; de: T }

/** Die drei Säulen (D-017): jedes Projekt gehört genau einer an. */
export type Pillar = 'direct' | 'create' | 'participate'

export interface Media {
  type: 'image' | 'video'
  /** Bild-URL bzw. Video-URL (mp4/webm) */
  src: string
  /** Standbild für Videos, wird bis zum ersten Frame gezeigt */
  poster?: string
  alt: string
  width: number
  height: number
  /** Bildnachweis (Fotograf:in / Haus) */
  credit?: string
}

export type GalleryBlock =
  | { type: 'single'; label: string; media: Media }
  | { type: 'group-3'; label: string; media: [Media, Media, Media] }

/** Ganzes Video, wird erst nach Klick geladen (P14) */
export interface VideoRef {
  provider: 'youtube' | 'vimeo'
  id: string
  /** Vimeo: Hash privater Links (vimeo.com/<id>/<hash>) */
  hash?: string
  title: string
  /** Vorschaubild; fehlt es, wird bei YouTube das Standard-Thumbnail genutzt */
  poster?: string
  /** Seitenverhältnis, Standard 16:9; YouTube Shorts = 9:16 */
  aspect?: '16:9' | '9:16'
}

export interface Credit {
  role: string
  name: string
}

export interface PressItem {
  source: string
  /** ISO-Datum oder Jahr */
  date?: string
  quote?: string
  author?: string
  url?: string
}

export interface Award {
  label: string
  year: number
  status: 'won' | 'nominated'
}

export interface Project {
  slug: string
  title: string
  /** Gattung / Untertitel, z. B. „Märchenzirkusoper“ */
  subtitle?: string
  /** Haus / Partner */
  venue: string
  /** Sortierjahr (Premiere) */
  year: number
  /** Anzeige, z. B. „2015–2022“; sonst `year` */
  yearLabel: string
  pillar: Pillar
  /** Anishas Rolle, z. B. „Regie“ */
  role: string
  /** Premiere / Termine, eine Zeile je Eintrag, z. B. „Uraufführung 25.04.2025“ */
  dates: string[]
  tags: string[]
  /** Karte auf der Startseite und Hero auf der Detailseite (Format 4:5) */
  cover: Media
  /** Absätze des Intro-Texts auf der Detailseite */
  intro: string[]
  gallery: GalleryBlock[]
  videos: VideoRef[]
  credits: Credit[]
  press: PressItem[]
  awards: Award[]
  /** true = in der Galerie der Startseite; sonst nur Archiv/Timeline */
  featured: boolean
  /** Reihenfolge auf der Startseite (aufsteigend) */
  order: number
  /** Offene Fragen zu diesem Projekt, sichtbar als UiTodo (D-018) */
  todos: string[]
}

// ---------- Quellformat (content/projects/*.ts) ----------

export interface MediaSource extends Omit<Media, 'alt'> {
  alt: L
}

export type GalleryBlockSource =
  | { type: 'single'; label: L; media: MediaSource }
  | { type: 'group-3'; label: L; media: [MediaSource, MediaSource, MediaSource] }

export interface ProjectSource {
  slug: string
  /** Titel: ein String, wenn in beiden Sprachen gleich */
  title: string | L
  subtitle?: L
  venue: string | L
  year: number
  yearLabel?: string
  pillar: Pillar
  role: L
  dates?: L<string[]>
  tags?: L<string[]>
  cover: MediaSource
  intro: L<string[]>
  gallery?: GalleryBlockSource[]
  videos?: (Omit<VideoRef, 'title'> & { title: string | L })[]
  credits?: { role: L; name: string }[]
  press?: (Omit<PressItem, 'quote'> & { quote?: L })[]
  awards?: (Omit<Award, 'label'> & { label: L })[]
  featured: boolean
  order: number
  todos?: L<string[]>
}

/** Hilfsfunktion für Projektdateien: nur Typprüfung, gibt die Quelle unverändert zurück. */
export function defineProject(p: ProjectSource): ProjectSource {
  return p
}
