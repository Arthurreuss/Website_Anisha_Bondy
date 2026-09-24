<script setup lang="ts">
// Presse & Preise: aggregiert aus allen Projekten (awards + press) plus die
// allgemeine Presse aus content/site.ts (nicht projektbezogen).
import { siteContent } from '~/content/site'
import { pick } from '~/content/projects'
import type { Locale } from '~/types/project'

const { locale } = useI18n()
const l = <T,>(v: { en: T; de: T }) => pick(v, locale.value as Locale)

const { data: projects } = await useAllProjects()

const awards = computed(() =>
  projects.value.flatMap((p) => p.awards.map((a) => ({ ...a, project: p.title, slug: p.slug }))),
)
const projectPress = computed(() =>
  projects.value.flatMap((p) => p.press.map((x) => ({ ...x, project: p.title, slug: p.slug }))),
)
const generalPress = computed(() => siteContent.pressGeneral.map((x) => ({ ...x, title: l(x.title) })))

const hasContent = computed(
  () => awards.value.length > 0 || projectPress.value.length > 0 || generalPress.value.length > 0,
)

const rootRef = ref<HTMLElement | null>(null)
useReveal(rootRef)
</script>

<template>
  <section v-if="hasContent" class="press container" ref="rootRef">
    <p class="font-body-12 uppercase press__heading" data-reveal="lines">{{ $t('about.pressHeading') }}</p>

    <ul v-if="awards.length" class="press__list">
      <li v-for="(a, i) in awards" :key="`award-${i}`" class="press__item font-body-24">
        <NuxtLink :to="$localePath(`/cases/${a.slug}`)" class="press__link">{{ a.label }}</NuxtLink>
        <span class="font-body-12 uppercase press__meta">
          {{ a.status === 'won' ? $t('about.wonLabel') : $t('about.nominatedLabel') }} · {{ a.year }} · {{ a.project }}
        </span>
      </li>
    </ul>

    <ul v-if="projectPress.length" class="press__list">
      <li v-for="(p, i) in projectPress" :key="`press-${i}`" class="press__item font-body-24">
        <a v-if="p.url" :href="p.url" target="_blank" rel="noopener" class="press__link">{{ p.quote ?? p.source }}</a>
        <span v-else class="press__link">{{ p.quote ?? p.source }}</span>
        <span class="font-body-12 uppercase press__meta">{{ p.source }} · {{ p.project }}</span>
      </li>
    </ul>

    <ul v-if="generalPress.length" class="press__list">
      <li v-for="(p, i) in generalPress" :key="`general-${i}`" class="press__item font-body-24">
        <a v-if="p.url" :href="p.url" target="_blank" rel="noopener" class="press__link">{{ p.title }}</a>
        <span v-else class="press__link">{{ p.title }}</span>
        <span class="font-body-12 uppercase press__meta">{{ p.source }}</span>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.press {
  padding-block: 6rem;

  @include desktop {
    padding-block: 10rem;
  }
}

.press__heading {
  margin: 0 0 2.4rem;
  opacity: 0.6;
}

.press__list {
  margin: 0 0 3.2rem;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.press__item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.press__link {
  color: inherit;
  text-decoration: none;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }
}

.press__meta {
  opacity: 0.5;
}
</style>
