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
// Container ist genau eine Zeile hoch; die zweite Kopie liegt darunter
// (top: 100%) und wird beim Hover zusammen mit der ersten hochgeschoben.
.roll-text {
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
}

.roll-text__track {
  display: block;
}

.roll-text__line {
  display: block;
  white-space: nowrap;
  transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);

  &:nth-child(2) {
    position: absolute;
    top: 100%;
    left: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0s;
  }
}

</style>

<style lang="scss">
// Unscoped: `:global()` im scoped Block würde den Rest des Selektors
// verschlucken und das Elternelement selbst verschieben.
@media (hover: hover) {
  // Eigener Hover oder Hover auf dem nächsten Elternelement mit .roll-trigger
  .roll-text:hover .roll-text__line,
  .roll-trigger:hover .roll-text__line {
    transform: translateY(-100%);
  }
}
</style>
