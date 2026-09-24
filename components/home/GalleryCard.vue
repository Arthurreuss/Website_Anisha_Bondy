<script setup lang="ts">
import type { Project } from '~/types/project'

const props = defineProps<{ project: Project; eager?: boolean }>()

const posterHidden = ref(false)
const cover = computed(() => props.project.cover)
</script>

<template>
  <NuxtLink :to="`/cases/${project.slug}`" class="gallery-item" :data-slug="project.slug">
    <div class="gallery-item__wrapper">
      <div class="gallery-item__stage">
        <div class="gallery-item__name-wrapper">
          <div class="gallery-item__name">
            <span>{{ project.title }}</span>
            <span aria-hidden="true">{{ project.title }}</span>
          </div>
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

// Text-Roll beim Hover: zweite Kopie liegt unter der ersten
.gallery-item__name {
  position: relative;
  overflow: hidden;
  line-height: 1;

  span {
    display: block;
    transition: transform 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  span:nth-child(2) {
    position: absolute;
    top: 100%;
    left: 0;
  }
}

@media (hover: hover) {
  .gallery-item:hover .gallery-item__name span {
    transform: translateY(-100%);
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
