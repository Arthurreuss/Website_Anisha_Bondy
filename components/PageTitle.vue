<script setup lang="ts">
// Großer Seitentitel (P22, D-025): nur in den Fenster-Übergängen (und später
// im Menü, P23) sichtbar; rollt dort per useWindowTransition ein und weg.
// Sonst unsichtbar und für Screenreader ausgeblendet (die Seite hat ihr
// eigenes h1).
defineProps<{ text: string }>()
</script>

<template>
  <div class="page-title" aria-hidden="true">
    <span class="page-title__text font-headline-1">{{ text }}</span>
  </div>
</template>

<style lang="scss" scoped>
.page-title {
  position: absolute;
  top: 6.4rem;
  left: var(--gutter);
  right: var(--gutter);
  z-index: 5;
  overflow: hidden;
  visibility: hidden;
  pointer-events: none;

  @include tablet-up {
    top: 7.2rem;
  }
}

.page-title--band {
  // Im Menü (P23, D-045): Band in Hintergrundfarbe ab Fensteroberkante, damit
  // der Titel nicht auf Porträt/Filterzeile der Seite darunter liegt. --band
  // (0–1) blendet es mit dem Titel ein. Der Rand unten ist Luft unter der
  // Schrift; overflow schneidet nur bis zur Padding-Box, die Roll-Maske bleibt.
  --band-color: color-mix(in srgb, var(--color-bg) calc(var(--band, 0) * 100%), transparent);
  top: 0;
  left: 0;
  right: 0;
  padding: 6.4rem var(--gutter) 0;
  background-color: var(--band-color);
  border-bottom: 2.4rem solid var(--band-color);

  @include tablet-up {
    padding-top: 7.2rem;
  }
}

.page-title__text {
  display: block;
  line-height: 1.05;
  white-space: nowrap;
}
</style>
