<script setup lang="ts">
// Partner als Logo-Reihe mit Link zum Haus (D-046). Logos werden über
// mask-image einfarbig in --color-main gezeigt, damit sie zum Rest der Seite
// passen (egal ob Original farbig, weiß oder schwarz). Breite ~ ratio^0,65, damit
// sehr breite und schmale Logos ähnlich groß wirken.
import { siteContent } from '~/content/site'

const partners = computed(() =>
  siteContent.partners.map((p) => ({
    ...p,
    style: {
      '--logo': `url(${p.logo})`,
      '--w': (p.ratio ** 0.65).toFixed(3),
      aspectRatio: String(p.ratio),
    },
  })),
)

const rootRef = ref<HTMLElement | null>(null)
useReveal(rootRef)
</script>

<template>
  <section class="partners container" ref="rootRef">
    <p class="font-body-12 uppercase partners__heading">{{ $t('about.partnersHeading') }}</p>
    <ul class="partners__list">
      <li v-for="p in partners" :key="p.name" class="partners__item">
        <a :href="p.url" target="_blank" rel="noopener noreferrer" class="partners__link" :title="p.name">
          <span class="partners__logo" :style="p.style" aria-hidden="true" />
          <span class="sr-only">{{ p.name }}</span>
        </a>
      </li>
    </ul>
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
  margin: 0 0 3.2rem;
  opacity: 0.6;
}

.partners__list {
  --unit: 3.4rem;

  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 3.2rem 4rem;
  max-width: 110rem;

  @include desktop {
    --unit: 4.4rem;

    gap: 4.8rem 6.4rem;
  }
}

.partners__link {
  display: block;
  padding: 0.4rem;
  color: inherit;
  opacity: 0.75;
  transition: opacity 0.3s ease;

  &:focus-visible {
    opacity: 1;
    outline: 1px solid currentColor;
    outline-offset: 0.4rem;
  }
}

@media (hover: hover) {
  .partners__link:hover {
    opacity: 1;
  }
}

.partners__logo {
  display: block;
  width: calc(var(--unit) * var(--w));
  max-width: 70vw;
  background-color: var(--color-main);
  mask: var(--logo) center / contain no-repeat;
}
</style>
