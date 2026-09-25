<script setup lang="ts">
// /archive (P15, D-011): alle Projekte als Liste, filterbar nach Säule.
// Filter-Zustand liegt in der Query (`?pillar=direct|create|participate`).
import type { Pillar } from '~/types/project'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const { data: projects } = await useAllProjects()

const PILLARS: Pillar[] = ['direct', 'create', 'participate']

const activePillar = computed<Pillar | 'all'>(() => {
  const q = route.query.pillar
  return typeof q === 'string' && PILLARS.includes(q as Pillar) ? (q as Pillar) : 'all'
})

function setPillar(value: Pillar | 'all') {
  router.push({ query: value === 'all' ? {} : { pillar: value } })
}

// Neueste zuerst, wie ein Werk-/Presseverzeichnis.
const filtered = computed(() => {
  const list = activePillar.value === 'all' ? projects.value : projects.value.filter((p) => p.pillar === activePillar.value)
  return [...list].sort((a, b) => b.year - a.year)
})

useSeoMeta({
  title: () => t('archive.seoTitle'),
  description: () => t('archive.seoDescription'),
})
</script>

<template>
  <main class="page page--archive">
    <PageTitle :text="$t('pageTitle.archive')" />
    <div class="container">
      <h1 class="sr-only">{{ $t('nav.archive') }}</h1>
      <ArchiveFilter :model-value="activePillar" @update:model-value="setPillar" />
      <ArchiveList :projects="filtered" />
    </div>
  </main>
</template>

<style scoped lang="scss">
.page--archive {
  display: block;
  padding-bottom: 8rem;

  @include desktop {
    padding-bottom: 12rem;
  }
}
</style>
