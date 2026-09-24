<script setup lang="ts">
// Dreisatz Direct / Create / Participate (D-017), dezente Säulenfarben als
// Akzent (Unterstrich), nicht als Vollfläche.
import { siteContent } from '~/content/site'
import { pick } from '~/content/projects'
import type { Locale } from '~/types/project'

const { locale } = useI18n()
const l = <T,>(v: { en: T; de: T }) => pick(v, locale.value as Locale)

const rootRef = ref<HTMLElement | null>(null)
useReveal(rootRef)
</script>

<template>
  <section class="pillars container" ref="rootRef">
    <article
      v-for="pillar in siteContent.pillars"
      :key="pillar.key"
      class="pillars__item"
      :style="{ '--accent': `var(--color-${pillar.key})` }"
    >
      <div class="pillars__accent" />
      <p class="font-body-12 uppercase pillars__label">{{ $t(`pillar.${pillar.key}`) }}</p>
      <p class="font-body-12 pillars__sub">{{ $t(`pillarSub.${pillar.key}`) }}</p>
      <p class="font-body pillars__text" data-reveal="lines">{{ l(pillar.text) }}</p>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.pillars {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3.2rem 0.8rem;
  padding-block: 6rem;

  @include desktop {
    grid-template-columns: repeat(14, 1fr);
    padding-block: 10rem;
  }
}

.pillars__item {
  grid-column: 1 / -1;

  @include tablet-up {
    grid-column: span 3;
  }

  @include desktop {
    grid-column: span 4;

    &:first-child {
      grid-column: 2 / span 4;
    }
  }
}

.pillars__accent {
  width: 3.2rem;
  height: 0.3rem;
  background: var(--accent);
  margin-bottom: 1.6rem;
}

.pillars__label {
  margin: 0 0 0.4rem;
}

.pillars__sub {
  margin: 0 0 1.2rem;
  opacity: 0.6;
}

.pillars__text {
  margin: 0;
  max-width: 32rem;
}
</style>
