<script setup lang="ts">
// /about (P15, D-011): Porträt, Statement, Dreisatz, Approach, Bio,
// „Worked with“, Zitat, Timeline (Lebenslauf), Presse & Preise, Partner.
import { siteContent } from '~/content/site'
import { pick } from '~/content/projects'
import type { Locale } from '~/types/project'

const { locale, t } = useI18n()
const l = <T,>(v: { en: T; de: T }) => pick(v, locale.value as Locale)

useSeoMeta({
  title: () => t('about.seoTitle'),
  description: () => l(siteContent.statement.body),
})
</script>

<template>
  <main class="page page--about">
    <AboutHero />
    <AboutPillars />
    <AboutApproach />
    <AboutBio />
    <AboutWorkedWith />
    <AboutQuote />
    <AboutTimeline />
    <AboutPress />
    <AboutPartners />
    <section class="about-todos">
      <UiTodo v-for="todo in l(siteContent.todos)" :key="todo" block>{{ todo }}</UiTodo>
    </section>
  </main>
</template>

<style scoped lang="scss">
.page--about {
  display: block;
}

.about-todos {
  display: grid;
  gap: 0.8rem;
  padding: 4rem var(--gutter) 8rem;
}
</style>
