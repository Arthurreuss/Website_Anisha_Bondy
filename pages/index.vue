<script setup lang="ts">
const { data: projects } = await useProjects()

const { t } = useI18n()
usePageSeo({
  title: () => t('seo.homeTitle'),
  description: () => t('home.description'),
})
usePersonSchema()
</script>

<template>
  <main class="page page--home">
    <PageTitle :text="$t('pageTitle.work')" />
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
