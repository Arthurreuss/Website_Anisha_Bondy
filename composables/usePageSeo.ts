// Titel, Beschreibung und Vorschau für Suchmaschinen und geteilte Links (D-041).
// canonical/hreflang/og:locale kommen aus useLocaleHead in app.vue.
import { contactEmail } from '~/content/legal'

interface PageSeo {
  title: () => string
  description: () => string
  /** Pfad unter public/, Standard: Porträt 1200×630 */
  image?: () => string | undefined
}

/** Google empfiehlt Beschreibungen bis ca. 160 Zeichen. */
function clip(text: string, max = 160) {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

export function usePageSeo({ title, description, image }: PageSeo) {
  const { siteUrl } = useRuntimeConfig().public
  const abs = (path: string) => (path.startsWith('http') ? path : `${siteUrl}${path}`)
  useSeoMeta({
    title,
    description: () => clip(description()),
    ogTitle: title,
    ogDescription: () => clip(description()),
    ogImage: () => abs(image?.() ?? '/og.jpg'),
    ogType: 'website',
    ogSiteName: 'Anisha Bondy',
    twitterCard: 'summary_large_image',
  })
}

/** Strukturierte Daten „Person“ für Startseite und About (schema.org). */
export function usePersonSchema() {
  const { siteUrl } = useRuntimeConfig().public
  const { t } = useI18n()
  useHead({
    script: [
      {
        key: 'ld-person',
        type: 'application/ld+json',
        innerHTML: () =>
          JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Anisha Bondy',
            url: siteUrl,
            image: `${siteUrl}/media/about/portrait.jpg`,
            jobTitle: t('seo.jobTitle'),
            email: `mailto:${contactEmail}`,
            address: { '@type': 'PostalAddress', addressLocality: 'Wien', addressCountry: 'AT' },
            alumniOf: { '@type': 'CollegeOrUniversity', name: 'mdw – Universität für Musik und darstellende Kunst Wien' },
          }),
      },
    ],
  })
}
