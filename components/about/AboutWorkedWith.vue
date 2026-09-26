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
    <!-- Probenfoto mit Barrie Kosky (D-044); Fotograf:in unbekannt -->
    <figure class="worked-with__figure">
      <div class="worked-with__image" data-reveal="image">
        <img
          src="/media/about/probe-echnaton.jpg"
          :alt="$t('about.rehearsalAlt')"
          width="2000"
          height="1333"
          loading="lazy"
        />
      </div>
      <figcaption class="font-body-12 worked-with__caption">{{ $t('about.rehearsalCaption') }}</figcaption>
    </figure>
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

.worked-with__figure {
  margin: 4.8rem 0 0;

  @include desktop {
    margin-top: 8rem;
    width: 64%;
    margin-left: auto;
  }
}

.worked-with__image {
  overflow: hidden;
  aspect-ratio: 3 / 2;
  background-color: color-mix(in srgb, var(--color-main) 6%, transparent);

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.worked-with__caption {
  margin-top: 0.8rem;
  opacity: 0.6;
}
</style>
