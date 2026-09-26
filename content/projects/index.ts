// Sammelt alle Projektdateien dieses Ordners (eine Datei je Projekt, D-018)
// und löst sie in eine Sprache auf. Neue Projekte: Datei anlegen, fertig.
import type { L, Locale, Media, MediaSource, Project, ProjectSource } from '~/types/project'

const modules = import.meta.glob<{ default: ProjectSource }>('./*.ts', { eager: true })

export const projectSources: ProjectSource[] = Object.entries(modules)
  .filter(([path]) => !path.endsWith('/index.ts'))
  .map(([, m]) => m.default)

const isL = (v: unknown): v is L<unknown> => typeof v === 'object' && v !== null && 'en' in v && 'de' in v

/** Wählt die Sprache; fehlt DE-Text (leer), wird EN genommen. */
export function pick<T>(v: T | L<T>, locale: Locale): T {
  if (!isL(v)) return v as T
  const val = v[locale]
  const empty = val === '' || (Array.isArray(val) && val.length === 0)
  return (empty ? v.en : val) as T
}

function media(m: MediaSource, locale: Locale): Media {
  return { ...m, alt: pick(m.alt, locale) }
}

export function resolveProject(p: ProjectSource, locale: Locale): Project {
  return {
    slug: p.slug,
    title: pick(p.title, locale),
    subtitle: p.subtitle ? pick(p.subtitle, locale) : undefined,
    venue: pick(p.venue, locale),
    year: p.year,
    yearLabel: p.yearLabel ?? String(p.year),
    pillar: p.pillar,
    role: pick(p.role, locale),
    dates: p.dates ? pick(p.dates, locale) : [],
    tags: p.tags ? pick(p.tags, locale) : [],
    cover: media(p.cover, locale),
    intro: pick(p.intro, locale),
    gallery: (p.gallery ?? []).map((b) =>
      b.type === 'single'
        ? { type: 'single', label: pick(b.label, locale), media: media(b.media, locale) }
        : {
            type: 'group-3',
            label: pick(b.label, locale),
            media: [media(b.media[0], locale), media(b.media[1], locale), media(b.media[2], locale)],
          },
    ),
    videos: (p.videos ?? []).map((v) => ({ ...v, title: pick(v.title, locale) })),
    credits: (p.credits ?? []).map((c) => ({ role: pick(c.role, locale), name: c.name })),
    press: (p.press ?? []).map((x) => ({ ...x, quote: x.quote ? pick(x.quote, locale) : undefined })),
    awards: (p.awards ?? []).map((a) => ({ ...a, label: pick(a.label, locale) })),
    featured: p.featured,
    order: p.order,
    todos: p.todos ? pick(p.todos, locale) : [],
  }
}
