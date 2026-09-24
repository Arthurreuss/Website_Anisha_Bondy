<script setup lang="ts">
// Einzelnes Galerie-Medium (Bild oder Video), objectFit cover.
import type { Media } from '~/types/project'

const props = defineProps<{ media: Media }>()
</script>

<template>
  <video v-if="props.media.type === 'video'" class="media" autoplay muted loop playsinline :poster="props.media.poster">
    <source :src="props.media.src" type="video/webm" />
  </video>
  <img
    v-else
    class="media"
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
</style>
