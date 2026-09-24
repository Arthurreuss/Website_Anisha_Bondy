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
  </main>
</template>

<style scoped lang="scss">
.page--about {
  display: block;
}
</style>
