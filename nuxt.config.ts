// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-09-24',
  devtools: { enabled: true },

  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
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
    head: {
      title: 'Anisha Bondy',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
})
