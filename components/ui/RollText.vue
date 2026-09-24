<script setup lang="ts">
// Wiederverwendbarer Hover-Text-Roll (Spezifikation §4/§6): zwei
// übereinanderliegende Kopien des Texts in einem overflow:hidden-Container,
// beim Hover schiebt sich die zweite Kopie nach oben ein. Reagiert entweder
// auf eigenen Hover, oder – falls das nächste Elternelement mit der Klasse
// `.roll-trigger` versehen ist – auf dessen Hover (z. B. Header-Logo-Link).
defineProps<{
  text: string
}>()
</script>

<template>
  <span class="roll-text">
    <span class="roll-text__track">
      <span class="roll-text__line">{{ text }}</span>
      <span class="roll-text__line" aria-hidden="true">{{ text }}</span>
    </span>
  </span>
</template>

<style lang="scss" scoped>
.roll-text {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
}

.roll-text__track {
  display: flex;
  flex-direction: column;
  transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0s;
  }
}

.roll-text__line {
  display: block;
  white-space: nowrap;
}

// Eigener Hover auf dem <span> selbst.
.roll-text:hover .roll-text__track,
// Hover auf dem nächsten Elternelement mit .roll-trigger (z. B. Logo-Link).
:global(.roll-trigger):hover .roll-text__track {
  transform: translateY(-50%);
}
</style>
