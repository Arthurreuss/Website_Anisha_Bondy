// https://nuxt.com/docs/api/configuration/nuxt-config

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
    // Netlify setzt URL beim Build; für hreflang/canonical
    baseUrl: process.env.URL ?? '',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts',
    bundle: { optimizeTranslationDirective: false },
  },

  runtimeConfig: {
    public: {
      // Platzhalter für offene Fragen sichtbar (D-018); für den Livegang auf false
      showTodos: true,
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/de'],
      // Case-Seiten werden über die Links der Startseite gefunden.
      // /about und /archive sind im Menü verlinkt, aber noch nicht gebaut (D-011).
      ignore: ['/about', '/archive', '/de/about', '/de/archive'],
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
