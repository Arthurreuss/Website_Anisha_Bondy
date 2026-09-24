<script setup lang="ts">
import type { Project } from '~/types/project'

defineProps<{ projects: Project[] }>()

const root = ref<HTMLElement | null>(null)
const gallery = useInfiniteGallery(root)

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
