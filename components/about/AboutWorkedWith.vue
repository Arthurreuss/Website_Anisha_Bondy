<script setup lang="ts">
// „Worked with“ – Namen aus INHALTE.md §2 (Mockup) + PLAN-Auftrag, Labels
// bleiben unübersetzt (Eigennamen).
import { siteContent } from '~/content/site'

// Nur reiner Text darf gesplittet werden (D-013); Namen daher als ein String.
const names = computed(() => siteContent.workedWith.join(', '))

const rootRef = ref<HTMLElement | null>(null)
useReveal(rootRef)
</script>

<template>
  <section class="worked-with container" ref="rootRef">
    <p class="font-body-12 uppercase worked-with__heading">{{ $t('about.workedWithHeading') }}</p>
    <p class="worked-with__list font-headline-2" data-reveal="lines">{{ names }}</p>
  </section>
</template>

<style lang="scss" scoped>
.worked-with {
  padding-block: 6rem;

  @include desktop {
    padding-block: 10rem;
  }
}

.worked-with__heading {
  margin: 0 0 2.4rem;
  opacity: 0.6;
}

.worked-with__list {
  margin: 0;
}
</style>
