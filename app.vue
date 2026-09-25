<script setup lang="ts">
// <html lang> und hreflang-Links je Sprache (D-018)
import { buildHeadInlineScript } from '~/utils/daytime-theme'

const head = useLocaleHead()
useHead({
  htmlAttrs: { lang: () => head.value.htmlAttrs?.lang },
  link: () => head.value.link ?? [],
  // Tageszeit-Theme (P10): vor dem ersten Paint die CSS-Variablen nach
  // lokaler Uhrzeit setzen (Muster D-012, wie useGalleryIntro's Head-Skript).
  script: [{ key: 'daytime-theme', innerHTML: buildHeadInlineScript(), tagPosition: 'head' }],
})

// Laufzeit-Teil (Minuten-Updates, Zeitreise der Uhr); Skript oben hat den
// Startzustand schon gesetzt, hier nur die Fortsetzung.
useDaytimeTheme()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
