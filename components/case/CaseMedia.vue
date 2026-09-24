<script setup lang="ts">
// Einzelnes Galerie-Medium (Bild oder Video), objectFit cover.
// `parallax`: setzt data-parallax (useReveal, P9) und gibt dem Medium per CSS
// permanent etwas Überhang (inset -6%/height 112%), damit die leichte
// yPercent-Parallaxe keine Lücken am Rand des overflow:hidden-Containers zeigt.
import type { Media } from '~/types/project'

const props = defineProps<{ media: Media; parallax?: boolean }>()
</script>

<template>
  <video
    v-if="props.media.type === 'video'"
    class="media"
    :class="{ 'media--parallax': parallax }"
    :data-parallax="parallax ? '' : undefined"
    autoplay
    muted
    loop
    playsinline
    :poster="props.media.poster"
  >
    <source :src="props.media.src" type="video/webm" />
  </video>
  <img
    v-else
    class="media"
    :class="{ 'media--parallax': parallax }"
    :data-parallax="parallax ? '' : undefined"
    :src="props.media.src"
    :alt="props.media.alt"
    :width="props.media.width"
    :height="props.media.height"
    loading="lazy"
  />
</template>

<style lang="scss" scoped>
.media {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media--parallax {
  position: absolute;
  inset: -6% 0;
  width: 100%;
  height: 112%;
}
</style>
