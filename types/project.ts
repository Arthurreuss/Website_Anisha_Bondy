// Datenvertrag für Projekte (D-009). Alle Seiten und Komponenten arbeiten nur
// gegen diese Typen – die Datenquelle (utils/projects-source.ts) ist austauschbar.

export interface Media {
  type: 'image' | 'video'
  /** Bild-URL bzw. Video-URL (mp4) */
  src: string
  /** Standbild für Videos, wird bis zum ersten Frame gezeigt */
  poster?: string
  alt: string
  width: number
  height: number
}

export type GalleryBlock =
  | { type: 'single'; label: string; media: Media }
  | { type: 'group-3'; label: string; media: [Media, Media, Media] }

export interface Project {
  slug: string
  title: string
  client: string
  year: number
  category: string
  tags: string[]
  /** Karte auf der Startseite und Hero auf der Detailseite (Format 4:5) */
  cover: Media
  /** Absätze des Intro-Texts auf der Detailseite */
  intro: string[]
  gallery: GalleryBlock[]
  /** Reihenfolge auf der Startseite (aufsteigend) */
  order: number
}
