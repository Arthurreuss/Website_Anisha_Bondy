<script setup lang="ts">
// „Not education after the art. Participation as part of the art.“
import { siteContent } from '~/content/site'
import { pick } from '~/content/projects'
import type { Locale } from '~/types/project'

const { locale } = useI18n()
const l = <T,>(v: { en: T; de: T }) => pick(v, locale.value as Locale)

const rootRef = ref<HTMLElement | null>(null)
useReveal(rootRef)
</script>

<template>
  <section class="approach container" ref="rootRef">
    <p class="font-body-12 uppercase approach__eyebrow">{{ $t('about.approachEyebrow') }}</p>
    <h2 class="font-headline-2 approach__title" data-reveal="lines">{{ l(siteContent.approach.title) }}</h2>
    <p class="font-body-24 approach__body" data-reveal="lines">{{ l(siteContent.approach.body) }}</p>
  </section>
</template>

<style lang="scss" scoped>
.approach {
  padding-block: 6rem;
  max-width: 76rem;

  @include desktop {
    padding-block: 10rem;
  }
}

.approach__eyebrow {
  margin: 0 0 1.6rem;
  opacity: 0.6;
}

.approach__title {
  margin: 0 0 2.4rem;
}

.approach__body {
  margin: 0;
}
</style>
