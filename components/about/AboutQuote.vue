<script setup lang="ts">
// Zitat groß, zentriert.
import { siteContent } from '~/content/site'
import { pick } from '~/content/projects'
import type { Locale } from '~/types/project'

const { locale } = useI18n()
const l = <T,>(v: { en: T; de: T }) => pick(v, locale.value as Locale)

const rootRef = ref<HTMLElement | null>(null)
useReveal(rootRef)
</script>

<template>
  <section class="quote container" ref="rootRef">
    <blockquote class="font-headline-2 quote__text" data-reveal="lines">
      {{ l(siteContent.quote) }}
    </blockquote>
  </section>
</template>

<style lang="scss" scoped>
.quote {
  padding-block: 8rem;
  display: flex;
  justify-content: center;

  @include desktop {
    padding-block: 12rem;
  }
}

.quote__text {
  margin: 0;
  max-width: 92rem;
  text-align: center;
}
</style>
