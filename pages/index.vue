<script setup lang="ts">
import { leavePage } from '~/composables/usePageTransition'

// Die verlassende Seite bestimmt ihre Leave-Hooks (Vue hängt sie beim Rendern an):
// Beim Klick auf eine Karte bleibt die Startseite als Ebene stehen, während der
// Klon ins Hero der neuen Seite morpht (P8, D-015).
definePageMeta({
  pageTransition: { name: 'home', mode: 'default', css: false, onLeave: leavePage },
})

const { data: projects } = await useProjects()

const { t } = useI18n()
useSeoMeta({
  title: 'Anisha Bondy',
  description: () => t('home.description'),
})
</script>

<template>
  <main class="page page--home">
    <h1 class="sr-only">{{ $t('home.title') }}</h1>
    <HomeGallery :projects="projects" />
  </main>
</template>

<style scoped lang="scss">
.page--home {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100dvh;
  overflow: hidden;
}
</style>
