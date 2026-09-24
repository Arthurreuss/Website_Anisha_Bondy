<script setup lang="ts">
// Case-Detailseite (Spezifikation §5, Paket P7).
// Datenzugriff ausschließlich über useProject() (D-009).
const route = useRoute()
const slug = route.params.slug as string

const { project, next } = await useProject(slug)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useSeoMeta({
  title: () => `${project.value!.title} — Anisha Bondy`,
})
</script>

<template>
  <main v-if="project" class="case">
    <CaseHero :project="project" />
    <CaseGallery :blocks="project.gallery" />
    <CaseNext v-if="next" :project="next" />
  </main>
</template>

<style lang="scss" scoped>
.case {
  display: block;
}
</style>
