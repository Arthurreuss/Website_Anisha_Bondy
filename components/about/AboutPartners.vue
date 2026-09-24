<script setup lang="ts">
// Partner (nur Namen, keine Logos, INHALTE.md §2/PLAN P15).
import { siteContent } from '~/content/site'

const names = computed(() => siteContent.partners.join(', '))

const rootRef = ref<HTMLElement | null>(null)
useReveal(rootRef)
</script>

<template>
  <section class="partners container" ref="rootRef">
    <p class="font-body-12 uppercase partners__heading">{{ $t('about.partnersHeading') }}</p>
    <p class="font-body-24 partners__list" data-reveal="lines">{{ names }}</p>
  </section>
</template>

<style lang="scss" scoped>
.partners {
  padding-block: 6rem 10rem;

  @include desktop {
    padding-block: 8rem 14rem;
  }
}

.partners__heading {
  margin: 0 0 2rem;
  opacity: 0.6;
}

.partners__list {
  margin: 0;
  max-width: 76rem;
}
</style>
