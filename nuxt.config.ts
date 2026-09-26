// https://nuxt.com/docs/api/configuration/nuxt-config
import { writeSeoFiles } from './config/seo-files'

// Adresse der Live-Seite für canonical/hreflang, Sitemap und og:image (D-041).
// SITE_URL beim Build überschreibt (z. B. für eine Test-Domain).
const siteUrl = (process.env.SITE_URL || 'https://anishabondy.com').replace(/\/+$/, '')

export default defineNuxtConfig({
  compatibilityDate: '2026-09-24',
  devtools: { enabled: true },

  ssr: true,

  modules: ['@nuxtjs/i18n'],

  // Zweisprachig (D-018): EN unter /, DE unter /de
  i18n: {
    locales: [
      { code: 'en', language: 'en', name: 'English', file: 'en.json' },
      { code: 'de', language: 'de', name: 'Deutsch', file: 'de.json' },
    ],
    defaultLocale: 'en',
    baseUrl: siteUrl,
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts',
    bundle: { optimizeTranslationDirective: false },
  },

  runtimeConfig: {
    public: {
      // Platzhalter für offene Fragen sichtbar (D-018); für den Livegang auf false
      showTodos: true,
      siteUrl,
      // Web3Forms-Zugangsschlüssel (öffentlich, steht ohnehin im Seitenquelltext;
      // D-032). NUXT_PUBLIC_WEB3FORMS_KEY beim Build überschreibt ihn.
      web3formsKey: '23be0b31-9c40-4a08-af3b-13cf3260ad88',
    },
  },
  nitro: {
    prerender: {
      // /about → about.html statt about/index.html: Cloudflare liefert dann
      // /about direkt (200) statt per Umleitung auf /about/ – passt zu
      // canonical/hreflang ohne Schrägstrich (D-041).
      autoSubfolderIndex: false,
      crawlLinks: true,
      // Case-Seiten werden über die Links der Startseite gefunden; Seiten, die
      // nur im Menü-Overlay verlinkt sind, explizit (P15/P16, ersetzt D-011).
      routes: ['/', '/de', '/about', '/archive', '/de/about', '/de/archive', '/imprint', '/de/imprint', '/privacy', '/de/privacy'],
    },
  },

  hooks: {
    // sitemap.xml + robots.txt aus den vorgerenderten Seiten (D-041)
    'nitro:init'(nitro) {
      nitro.hooks.hook('prerender:done', ({ prerenderedRoutes }) =>
        writeSeoFiles(nitro.options.output.publicDir, siteUrl, prerenderedRoutes.map((r) => r.route)),
      )
    },
  },

  css: ['~/assets/styles/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Nur die Breakpoint-Mixins global einbinden (reines SCSS ohne
          // eigene CSS-Ausgabe), damit @include mobile/tablet-up/desktop/wide
          // in jeder Komponente ohne @use verfügbar sind. _tokens.scss
          // enthält ein :root-Block (echte CSS-Ausgabe) und wird deshalb
          // nur einmal zentral über assets/styles/main.scss eingebunden;
          // die CSS-Variablen sind danach überall per var(--…) nutzbar.
          // Wer die fluid()-Funktion in eigenen Komponenten braucht, bindet
          // sie gezielt ein: @use "~/assets/styles/tokens" as *;
          additionalData: `
            @use "~/assets/styles/_breakpoints.scss" as *;
          `,
        },
      },
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  app: {
    // Immer einen <Transition>-Wrapper rendern (ohne CSS = sofortiger Wechsel),
    // sonst gibt es beim Verlassen der Startseite keinen Leave-Hook (P8, D-015).
    // mode 'default': alte + neue Seite gleichzeitig im DOM.
    pageTransition: { name: 'page', mode: 'default', css: false },
    head: {
      title: 'Anisha Bondy',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
})
