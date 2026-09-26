<script setup lang="ts">
// Datenschutz (P16, Aufgabe 5): Entwurf, Abschnitte in content/legal.ts.
// Verantwortliche seit D-039 eingetragen.
import UiTodo from '~/components/ui/UiTodo.vue'
import { privacySections } from '~/content/legal'

const { locale, t } = useI18n()
const currentLocale = computed(() => locale.value as 'en' | 'de')

useSeoMeta({
  title: () => `${t('legal.privacy.title')} — Anisha Bondy`,
})
</script>

<template>
  <main class="page page--legal container">
    <h1 class="page__title font-headline-2">{{ $t('legal.privacy.title') }}</h1>

    <UiTodo block :text="$t('legal.privacy.draftNotice')" class="page__notice" />

    <section v-for="section in privacySections" :key="section.key" class="legal-section">
      <h2 class="legal-section__heading font-body-24">{{ section.heading[currentLocale] }}</h2>
      <p v-if="section.body" class="legal-section__body font-body">{{ section.body[currentLocale] }}</p>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.page--legal {
  padding-block: 12rem 8rem;
  max-width: 64rem;
}

.page__title {
  margin-bottom: 2.4rem;
}

.page__notice {
  margin-bottom: 3.2rem;
}

.legal-section {
  margin-bottom: 2.8rem;
}

.legal-section__heading {
  margin-bottom: 0.8rem;
}
</style>
