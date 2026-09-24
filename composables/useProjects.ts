// Einziger Zugriffspunkt auf Projektdaten für Seiten/Komponenten (D-009).
import type { Project } from '~/types/project'
import { loadProjects } from '~/utils/projects-source'

/** Alle Projekte in Startseiten-Reihenfolge. */
export function useProjects() {
  return useAsyncData<Project[]>('projects', () => loadProjects(), { default: () => [] })
}

/** Ein Projekt plus das nächste (zyklisch) für „Next case“. */
export async function useProject(slug: string) {
  const { data } = await useProjects()
  const project = computed(() => data.value.find((p) => p.slug === slug) ?? null)
  const next = computed(() => {
    const list = data.value
    const i = list.findIndex((p) => p.slug === slug)
    return i === -1 || list.length < 2 ? null : list[(i + 1) % list.length]!
  })
  return { project, next }
}
