// sitemap.xml + robots.txt beim Vorrendern schreiben (D-041). Wird nur von
// nuxt.config.ts (Build) importiert, nicht vom Browser-Code.
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const DE = '/de'

/** Nur echte Seiten: keine Payloads, Fallbacks oder Dateien mit Endung. */
function isPage(route: string) {
  return !/\.[a-z0-9]+$/i.test(route) && !route.includes('_payload') && route !== '/200' && route !== '/404'
}

/** EN-Pfad zu einem Pfad (EN ohne Präfix, DE unter /de, D-018). */
function enPath(route: string) {
  if (route === DE) return '/'
  return route.startsWith(`${DE}/`) ? route.slice(DE.length) : route
}

export async function writeSeoFiles(publicDir: string, siteUrl: string, routes: string[]) {
  const pages = new Set(routes.filter(isPage))
  const enPages = [...new Set([...pages].map(enPath))].sort()
  const url = (path: string) => `${siteUrl}${path}`

  const entries = enPages.map((en) => {
    const de = en === '/' ? DE : `${DE}${en}`
    const alternates = [
      `    <xhtml:link rel="alternate" hreflang="en" href="${url(en)}"/>`,
      pages.has(de) ? `    <xhtml:link rel="alternate" hreflang="de" href="${url(de)}"/>` : '',
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(en)}"/>`,
    ].filter(Boolean)
    return [en, pages.has(de) ? de : null]
      .filter((p): p is string => p !== null)
      .map((loc) => `  <url>\n    <loc>${url(loc)}</loc>\n${alternates.join('\n')}\n  </url>`)
      .join('\n')
  })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`
  const robots = `User-agent: *
Allow: /

Sitemap: ${url('/sitemap.xml')}
`
  await writeFile(join(publicDir, 'sitemap.xml'), sitemap)
  await writeFile(join(publicDir, 'robots.txt'), robots)
}
