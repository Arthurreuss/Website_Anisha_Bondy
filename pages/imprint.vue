<script setup lang="ts">
// Impressum (P16, Aufgabe 5). Struktur nach § 5 DDG bzw. § 25 MedienG (AT) –
// welches Recht gilt, hängt vom Wohnsitz ab (noch offen, siehe Todo unten).
// Angaben selbst fehlen noch (D-018: sichtbare Platzhalter via UiTodo).
import UiTodo from '~/components/ui/UiTodo.vue'
import { imprintFields } from '~/content/legal'

const { locale, t } = useI18n()
const currentLocale = computed(() => locale.value as 'en' | 'de')

useSeoMeta({
  title: () => `${t('legal.imprint.title')} — Anisha Bondy`,
})
</script>

<template>
  <main class="page page--legal container">
    <h1 class="page__title font-headline-2">{{ $t('legal.imprint.title') }}</h1>

    <UiTodo block :text="$t('legal.imprint.residenceTodo')" class="page__notice" />

    <dl class="legal-list">
      <div v-for="field in imprintFields" :key="field.key" class="legal-list__item">
        <dt class="legal-list__label font-body-12 uppercase">{{ field.label[currentLocale] }}</dt>
        <dd class="legal-list__value font-body">
          <UiTodo />
        </dd>
      </div>
    </dl>
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

.legal-list {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.legal-list__item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.legal-list__label {
  opacity: 0.6;
}
</style>
