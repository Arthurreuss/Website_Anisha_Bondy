// sitemap.xml + robots.txt beim Vorrendern schreiben (D-041). Wird nur von
// nuxt.config.ts (Build) importiert, nicht vom Browser-Code.
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

// Standardsprache DE ohne Präfix, EN unter /en (D-059)
const EN = '/en'

/** Nur echte Seiten: keine Payloads, Fallbacks oder Dateien mit Endung. */
function isPage(route: string) {
  return !/\.[a-z0-9]+$/i.test(route) && !route.includes('_payload') && route !== '/200' && route !== '/404'
}

/** DE-Pfad zu einem Pfad (DE ohne Präfix, EN unter /en, D-059). */
function dePath(route: string) {
  if (route === EN) return '/'
  return route.startsWith(`${EN}/`) ? route.slice(EN.length) : route
}

export async function writeSeoFiles(publicDir: string, siteUrl: string, routes: string[]) {
  const pages = new Set(routes.filter(isPage))
  const dePages = [...new Set([...pages].map(dePath))].sort()
  const url = (path: string) => `${siteUrl}${path}`

  const entries = dePages.map((de) => {
    const en = de === '/' ? EN : `${EN}${de}`
    const alternates = [
      `    <xhtml:link rel="alternate" hreflang="de" href="${url(de)}"/>`,
      pages.has(en) ? `    <xhtml:link rel="alternate" hreflang="en" href="${url(en)}"/>` : '',
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(de)}"/>`,
    ].filter(Boolean)
    return [de, pages.has(en) ? en : null]
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
