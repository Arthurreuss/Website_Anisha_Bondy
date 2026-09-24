// Einziger Zugriffspunkt auf Projektdaten für Seiten/Komponenten (D-009).
import type { Locale, Project } from '~/types/project'
import { loadProjects } from '~/utils/projects-source'

/** Alle Projekte der aktuellen Sprache (inkl. Archiv), nach `order`. */
export function useAllProjects() {
  const { locale } = useI18n()
  return useAsyncData<Project[]>(
    () => `projects-${locale.value}`,
    () => loadProjects(locale.value as Locale),
    { default: () => [], watch: [locale] },
  )
}

/** Projekte der Startseiten-Galerie (featured) in Startseiten-Reihenfolge. */
export async function useProjects() {
  const res = await useAllProjects()
  const data = computed(() => res.data.value.filter((p) => p.featured))
  return { ...res, data }
}

/** Ein Projekt plus das nächste Galerie-Projekt (zyklisch) für „Next case“. */
export async function useProject(slug: string) {
  const { data: all } = await useAllProjects()
  const project = computed(() => all.value.find((p) => p.slug === slug) ?? null)
  const next = computed(() => {
    const list = all.value.filter((p) => p.featured)
    const i = list.findIndex((p) => p.slug === slug)
    // Archivprojekte (nicht in der Galerie) verweisen auf das erste Galerie-Projekt
    if (i === -1) return list[0] ?? null
    return list.length < 2 ? null : list[(i + 1) % list.length]!
  })
  return { project, next }
}
