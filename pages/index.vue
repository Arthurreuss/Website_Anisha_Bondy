<script setup lang="ts">
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
