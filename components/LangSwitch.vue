<script setup lang="ts">
// Sprachumschalter (P16, D-016 Header-Stil): „EN / DE“, aktive Sprache
// hervorgehoben. Echte Links (SEO, mittelklick-fähig) über
// useSwitchLocalePath – bleibt dabei auf der aktuellen Seite/Route
// (z. B. Case-Detailseite bleibt Case-Detailseite in der anderen Sprache).
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  const list = locales.value
  return (typeof list[0] === 'string' ? list.map((code) => ({ code })) : list) as Array<{
    code: string
    name?: string
  }>
})
</script>

<template>
  <nav class="lang-switch font-body-12 uppercase" :aria-label="$t('lang.label')">
    <template v-for="(l, i) in availableLocales" :key="l.code">
      <span v-if="i > 0" class="lang-switch__sep" aria-hidden="true">/</span>
      <NuxtLink
        :to="switchLocalePath(l.code as 'en' | 'de')"
        :hreflang="l.code"
        :lang="l.code"
        class="lang-switch__link"
        :class="{ 'lang-switch__link--active': l.code === locale }"
        :aria-current="l.code === locale ? 'true' : undefined"
        :aria-label="l.name ?? l.code"
      >
        {{ l.code.toUpperCase() }}
      </NuxtLink>
    </template>
  </nav>
</template>

<style lang="scss" scoped>
.lang-switch {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
}

.lang-switch__sep {
  opacity: 0.5;
}

.lang-switch__link {
  opacity: 0.5;
  transition: opacity 0.2s ease;

  &:hover,
  &:focus-visible {
    opacity: 1;
  }
}

.lang-switch__link--active {
  opacity: 1;
}
</style>
