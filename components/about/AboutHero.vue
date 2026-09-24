<script setup lang="ts">
// Porträt + Statement, oben auf /about (P15).
import { siteContent } from '~/content/site'
import { pick } from '~/content/projects'
import type { Locale } from '~/types/project'

const { locale } = useI18n()
const l = <T,>(v: { en: T; de: T }) => pick(v, locale.value as Locale)

const rootRef = ref<HTMLElement | null>(null)
useReveal(rootRef)
</script>

<template>
  <section class="about-hero container" ref="rootRef">
    <div class="about-hero__portrait" data-reveal="image">
      <img
        class="about-hero__img"
        src="/media/about/portrait.jpg"
        :alt="$t('about.portraitAlt')"
        width="1200"
        height="1800"
        loading="eager"
      />
    </div>

    <div class="about-hero__text">
      <h1 class="font-headline-1 about-hero__title" data-reveal="lines">{{ l(siteContent.statement.title) }}</h1>
      <p class="font-body-24 about-hero__body" data-reveal="lines">{{ l(siteContent.statement.body) }}</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-hero {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.8rem;
  padding-top: 9rem;

  @include desktop {
    grid-template-columns: repeat(14, 1fr);
    padding-top: 10rem;
  }
}

.about-hero__portrait {
  grid-column: 1 / -1;
  overflow: hidden;
  aspect-ratio: 2 / 3;
  background-color: color-mix(in srgb, var(--color-main) 6%, transparent);

  @include desktop {
    grid-column: 1 / 6;
  }
}

.about-hero__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about-hero__text {
  grid-column: 1 / -1;
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  @include desktop {
    grid-column: 7 / 15;
    margin-top: 0;
    justify-content: flex-end;
    padding-bottom: 2rem;
  }
}

.about-hero__title {
  margin: 0;
}

.about-hero__body {
  max-width: 48rem;
  margin: 0;
}
</style>
