<script setup lang="ts">
// Impressum (P16, Aufgabe 5). Österreichisches Recht: § 5 ECG + § 25 MedienG
// (D-039). Angaben und Hinweise in content/legal.ts.
import { imprintFields, imprintNotes } from '~/content/legal'

const { locale, t } = useI18n()
const currentLocale = computed(() => locale.value as 'en' | 'de')

usePageSeo({
  title: () => `${t('legal.imprint.title')} — Anisha Bondy`,
  description: () => t('legal.imprint.seoDescription'),
})
</script>

<template>
  <main class="page page--legal container">
    <h1 class="page__title font-headline-2">{{ $t('legal.imprint.title') }}</h1>

    <dl class="legal-list">
      <div v-for="field in imprintFields" :key="field.key" class="legal-list__item">
        <dt class="legal-list__label font-body-12 uppercase">{{ field.label[currentLocale] }}</dt>
        <dd class="legal-list__value font-body">{{ field.value[currentLocale] }}</dd>
      </div>
    </dl>

    <section v-for="note in imprintNotes" :key="note.key" class="legal-section">
      <h2 class="legal-section__heading font-body-24">{{ note.heading[currentLocale] }}</h2>
      <p class="legal-section__body font-body">{{ note.body[currentLocale] }}</p>
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

.legal-section {
  margin-bottom: 2.8rem;
}

.legal-section__heading {
  margin-bottom: 0.8rem;
}

.legal-list {
  margin-bottom: 4.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.legal-list__item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.legal-list__value {
  white-space: pre-line;
}

.legal-list__label {
  opacity: 0.6;
}
</style>
