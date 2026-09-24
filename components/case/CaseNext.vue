<script setup lang="ts">
// "Next case"-Sektion der Detailseite (Spezifikation §5).
// Verlinkt zyklisch zum nächsten Projekt (letztes -> erstes, siehe useProject()).
import type { Project } from '~/types/project'

defineProps<{ project: Project }>()
</script>

<template>
  <NuxtLink :to="`/cases/${project.slug}`" class="next">
    <div class="left">
      <div class="title-mask">
        <p class="font-headline-1 eyebrow">next case</p>
      </div>
      <div class="title-mask">
        <p class="font-headline-1 name">{{ project.title }}</p>
      </div>
      <p class="meta font-body-12 uppercase">{{ project.category }} · {{ project.client }}</p>
    </div>

    <div class="thumb">
      <img
        v-if="project.cover.type === 'video'"
        class="thumb__img"
        :src="project.cover.poster"
        :alt="project.cover.alt"
      />
      <img v-else class="thumb__img" :src="project.cover.src" :alt="project.cover.alt" />
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.next {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.6rem;
  padding: 6rem var(--gutter);
  min-height: calc(100dvh - 7.2rem);

  @include desktop {
    min-height: 60rem;
    align-items: center;
  }
}

.left {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
}

.title-mask {
  overflow: hidden;
}

.eyebrow,
.name {
  margin: 0;
}

.eyebrow {
  opacity: 0.5;
}

.meta {
  margin-top: 1.2rem;
}

.thumb {
  flex: none;
  width: 9rem;
  aspect-ratio: 4 / 5;
  overflow: hidden;

  @include desktop {
    width: 16rem;
  }
}

.thumb__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.5s ease;
}

.next:hover .thumb__img {
  transform: scale(1.06);
}
</style>
