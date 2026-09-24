<script setup lang="ts">
import type { Project } from '~/types/project'

defineProps<{ projects: Project[] }>()

const root = ref<HTMLElement | null>(null)
const gallery = useInfiniteGallery(root)
useGalleryIntro(root, gallery)

// Seitenübergang (P8) nur, wenn der NuxtLink die Navigation übernimmt
// (nicht bei Strg/Cmd-Klick; Klicks nach einem Drag stoppt der Slider vorher).
function onClick(e: MouseEvent) {
  if (!e.defaultPrevented) return
  const item = (e.target as HTMLElement).closest<HTMLElement>('.gallery-item')
  if (item) startCardTransition(item)
}

defineExpose({ root, gallery })
</script>

<template>
  <div
    ref="root"
    class="gallery font-body-12 uppercase"
    role="region"
    aria-roledescription="carousel"
    aria-label="Projects – drag, scroll or use the arrow keys"
    tabindex="-1"
    @click="onClick"
  >
    <HomeGalleryCard
      v-for="(project, i) in projects"
      :key="project.slug"
      :project="project"
      :eager="i < 4"
      :style="{ zIndex: projects.length - i }"
    />
  </div>
</template>

<style scoped lang="scss">
.gallery {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-end;
  gap: 0.8rem;
  height: calc(100dvh - 4rem);
  padding: 0 0.8rem 0.8rem;
  overflow: hidden;
  user-select: none;
  touch-action: none;
  -webkit-user-drag: none;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  @include tablet-up {
    height: calc(100vh - 5.6rem);
    padding: 0 1.6rem 1.6rem;
  }

  @include desktop {
    height: calc(100vh - 8.4rem);
  }

  &:focus {
    outline: none;
  }
}
</style>

<style lang="scss">
// Vor dem Intro (P6) ausblenden; Klasse setzt ein Inline-Skript im <head>.
html.is-intro .gallery {
  visibility: hidden;
}
</style>
