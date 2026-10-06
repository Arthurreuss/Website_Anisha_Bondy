// Datenquelle für Projekte (D-009): Projektdateien aus content/projects/ (D-018).
// Signatur bleibt austauschbar – Seiten greifen nur über useProjects() zu.
import type { Locale, Project } from '~/types/project'
import { projectSources, resolveProject } from '~/content/projects'

/** Alle Projekte (inkl. Archiv), aufgelöst in `locale`, nach `order` sortiert. */
export async function loadProjects(locale: Locale): Promise<Project[]> {
  return projectSources.map((p) => resolveProject(p, locale)).sort((a, b) => a.order - b.order)
}

/** Chronologisch aufsteigend: Jahr, dann Premierendatum (ohne Datum zuerst). */
export function byPremiere(a: Project, b: Project): number {
  return a.year - b.year || a.premiere.localeCompare(b.premiere)
}
