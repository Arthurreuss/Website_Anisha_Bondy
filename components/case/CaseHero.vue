<script setup lang="ts">
// Hero der Case-Detailseite (Spezifikation §5). Scroll-Reveals über
// useReveal() (P9): Titel in der vorhandenen .title-mask, Intro-Text
// zeilenweise.
import type { Project } from '~/types/project'

const props = defineProps<{ project: Project }>()

// Poster wird ausgeblendet, sobald das Video tatsächlich spielt.
const isPlaying = ref(false)

const heroRef = ref<HTMLElement | null>(null)
useReveal(heroRef)
</script>

<template>
  <section class="hero" ref="heroRef">
    <div class="left">
      <div class="title-mask">
        <h1 class="font-headline-1 title" data-reveal="mask">{{ props.project.title }}</h1>
      </div>

      <div class="content">
        <div class="meta font-body-12 uppercase">
          <span>{{ props.project.client }}</span>
          <span>{{ props.project.year }}</span>
        </div>

        <div class="cats-tags font-body-12 uppercase">
          <span>{{ props.project.category }}</span>
          <span v-for="tag in props.project.tags" :key="tag">{{ tag }}</span>
        </div>
      </div>
    </div>

    <div class="right">
      <div class="image case-hero-media" :data-slug="props.project.slug">
        <video
          v-if="props.project.cover.type === 'video'"
          class="image__img"
          autoplay
          muted
          loop
          playsinline
          :poster="props.project.cover.poster"
          @playing="isPlaying = true"
        >
          <source :src="props.project.cover.src" type="video/webm" />
        </video>
        <img
          v-else
          class="image__img"
          :src="props.project.cover.src"
          :alt="props.project.cover.alt"
          :width="props.project.cover.width"
          :height="props.project.cover.height"
          loading="eager"
        />
        <img
          v-if="props.project.cover.type === 'video'"
          class="image__poster"
          :class="{ 'is-hidden': isPlaying }"
          :src="props.project.cover.poster"
          :alt="props.project.cover.alt"
        />
      </div>

      <div class="mob-content">
        <div class="title-mask">
          <h2 class="font-headline-1 title" data-reveal="mask">{{ props.project.title }}</h2>
        </div>
        <div class="meta font-body-12 uppercase">
          <span>{{ props.project.client }}</span>
          <span>{{ props.project.year }}</span>
        </div>
      </div>

      <div class="desc">
        <p
          v-for="(paragraph, i) in props.project.intro"
          :key="i"
          class="font-body-40-100"
          data-reveal="lines"
        >
          {{ paragraph }}
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.8rem;
  padding-inline: var(--gutter);
  padding-top: 9rem;

  @include desktop {
    grid-template-columns: repeat(14, 1fr);
    padding-top: 10rem;
  }
}

.left {
  display: none;

  @include desktop {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    grid-column: 1 / 9;
    position: sticky;
    top: 10rem;
    height: calc(100vh - 10rem);
    padding-bottom: 4rem;
  }
}

.title-mask {
  overflow: hidden;
}

.title {
  margin: 0;
}

.content {
  margin-top: 2.4rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
}

.meta,
.cats-tags {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.right {
  grid-column: 1 / -1;

  @include desktop {
    grid-column: 9 / 15;
  }
}

.image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  background-color: color-mix(in srgb, var(--color-main) 6%, transparent);

  @include desktop {
    aspect-ratio: auto;
    height: calc(100vh - 6rem);
  }
}

.image__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image__poster {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
  transition: opacity 0.1s linear;

  &.is-hidden {
    opacity: 0;
    pointer-events: none;
  }
}

.mob-content {
  margin-top: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @include desktop {
    display: none;
  }
}

.desc {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding-bottom: 6rem;

  @include desktop {
    margin-top: 6rem;
    padding-bottom: 10rem;
  }
}
</style>
