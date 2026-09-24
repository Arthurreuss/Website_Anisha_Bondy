// Datenquelle für Projekte. VORLÄUFIGER STUB mit Platzhaltern (D-008, D-009).
// P3 ersetzt die Implementierung von loadProjects() durch das Content-Modell –
// Signatur und Rückgabetyp bleiben gleich.
import type { GalleryBlock, Media, Project } from '~/types/project'

const titles = ['Project One', 'Project Two', 'Project Three', 'Project Four', 'Project Five', 'Project Six']
const clients = ['Studio North', 'Maison Blanc', 'Atelier Nord', 'Field & Form', 'Kōen', 'Oda House']
const categories = ['Art Direction', 'Brand Design', 'Campaign Design', 'Digital Design', 'Spatial Design', 'Content']

const lorem =
  'Placeholder text. A short description of the project, the brief and the approach will live here once real content is added.'

function img(src: string, alt: string, width: number, height: number): Media {
  return { type: 'image', src, alt, width, height }
}

function placeholderProject(i: number): Project {
  const slug = `project-${['one', 'two', 'three', 'four', 'five', 'six'][i]}`
  const p = (n: string) => `/placeholders/${slug}-${n}.svg`
  const gallery: GalleryBlock[] = [
    { type: 'single', label: categories[i]!, media: img(p('01'), `${titles[i]} – image 1`, 1600, 1000) },
    {
      type: 'group-3',
      label: 'Editorial',
      media: [
        img(p('02'), `${titles[i]} – image 2`, 1000, 1250),
        img(p('03'), `${titles[i]} – image 3`, 1000, 1250),
        img(p('04'), `${titles[i]} – image 4`, 1000, 1250),
      ],
    },
  ]
  return {
    slug,
    title: titles[i]!,
    client: clients[i]!,
    year: 2026 - i,
    category: categories[i]!,
    tags: ['Placeholder', 'Tag'],
    // Projekte 4 und 6 haben ein Video-Cover (für Galerie/Übergang mit Video-Sync)
    cover:
      i === 3 || i === 5
        ? { type: 'video', src: `/placeholders/${slug}-cover.webm`, poster: p('cover'), alt: `${titles[i]} – cover`, width: 600, height: 750 }
        : img(p('cover'), `${titles[i]} – cover`, 1200, 1500),
    intro: [lorem],
    gallery,
    order: i,
  }
}

export async function loadProjects(): Promise<Project[]> {
  return Array.from({ length: 6 }, (_, i) => placeholderProject(i)).sort((a, b) => a.order - b.order)
}
