<script setup lang="ts">
import { leavePage } from '~/composables/usePageTransition'

// Die verlassende Seite bestimmt ihre Leave-Hooks (Vue hängt sie beim Rendern an):
// Beim Klick auf eine Karte bleibt die Startseite als Ebene stehen, während der
// Klon ins Hero der neuen Seite morpht (P8, D-015).
definePageMeta({
  pageTransition: { name: 'home', mode: 'default', css: false, onLeave: leavePage },
})

const { data: projects } = await useProjects()

useSeoMeta({
  title: 'Anisha Bondy',
  description: 'Selected work by Anisha Bondy.',
})
</script>

<template>
  <main class="page page--home">
    <h1 class="sr-only">Selected work</h1>
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
