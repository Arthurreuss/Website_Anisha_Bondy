<script setup lang="ts">
import type { Project } from '~/types/project'
import RollText from '~/components/ui/RollText.vue'

const props = defineProps<{ project: Project; eager?: boolean }>()

const posterHidden = ref(false)
const cover = computed(() => props.project.cover)
</script>

<template>
  <NuxtLink :to="`/cases/${project.slug}`" class="gallery-item roll-trigger" :data-slug="project.slug">
    <div class="gallery-item__wrapper">
      <div class="gallery-item__stage">
        <div class="gallery-item__name-wrapper">
          <RollText :text="project.title" />
        </div>
        <div class="gallery-item__img">
          <div v-if="cover.type === 'video'" class="gallery-item__media gallery-item__video">
            <video
              :src="cover.src"
              :poster="cover.poster"
              autoplay
              muted
              loop
              playsinline
              preload="auto"
              draggable="false"
              @playing="posterHidden = true"
            />
            <img
              v-if="cover.poster"
              class="gallery-item__poster"
              :class="{ 'is-hidden': posterHidden }"
              :src="cover.poster"
              alt=""
              draggable="false"
            />
          </div>
          <img
            v-else
            class="gallery-item__media"
            :src="cover.src"
            :alt="cover.alt"
            :width="cover.width"
            :height="cover.height"
            :loading="eager ? 'eager' : 'lazy'"
            draggable="false"
          />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.gallery-item {
  position: relative;
  flex-shrink: 0;
  width: 83%;
  transform-origin: bottom;
  will-change: transform;
  color: inherit;
  text-decoration: none;
  -webkit-user-drag: none;

  @include tablet-up {
    width: 36.6%;
  }

  @include desktop {
    width: calc(28.74% - 0.8rem);
  }

  &:focus-visible {
    outline: none;

    .gallery-item__img {
      outline: 2px solid var(--focus-color);
      outline-offset: 2px;
    }
  }
}

.gallery-item__wrapper,
.gallery-item__stage {
  transform-origin: 50% 50%;
}

.gallery-item__name-wrapper {
  margin-bottom: 0.8rem;
  overflow: hidden;

  @include desktop {
    margin-bottom: 1.6rem;
  }
}

.gallery-item__img {
  position: relative;
  aspect-ratio: 396 / 496;
  overflow: hidden;
}

.gallery-item__media {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.15);
  transform-origin: 50% 50%;
}

.gallery-item__video {
  position: relative;

  video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.gallery-item__poster {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.25s ease-out;

  &.is-hidden {
    opacity: 0;
  }
}
</style>
