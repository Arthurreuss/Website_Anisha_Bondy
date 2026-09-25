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

.page-title__text {
  display: block;
  line-height: 1.05;
  white-space: nowrap;
}
</style>
