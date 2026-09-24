<script setup lang="ts">
// Zeilen: Jahr · Titel · Haus · Rolle · Säule; verlinken auf die Case-Seite.
// Hover-Roll auf dem Titel wie im Menü (RollText), Trigger auf der Zeile.
import type { Project } from '~/types/project'
import RollText from '~/components/ui/RollText.vue'

defineProps<{ projects: Project[] }>()
</script>

<template>
  <div v-if="projects.length" class="archive-list" role="list">
    <NuxtLink
      v-for="p in projects"
      :key="p.slug"
      :to="$localePath(`/cases/${p.slug}`)"
      class="archive-row roll-trigger"
      role="listitem"
    >
      <span class="font-body-12 uppercase archive-row__year">{{ p.yearLabel }}</span>
      <span class="font-body-24 archive-row__title">
        <RollText :text="p.title" />
      </span>
      <span class="font-body-12 uppercase archive-row__venue">{{ p.venue }}</span>
      <span class="font-body-12 uppercase archive-row__role">{{ p.role }}</span>
      <span
        class="font-body-12 uppercase archive-row__pillar"
        :style="{ color: `var(--color-${p.pillar})` }"
      >
        {{ $t(`pillar.${p.pillar}`) }}
      </span>
    </NuxtLink>
  </div>
  <p v-else class="font-body archive-empty">{{ $t('archive.empty') }}</p>
</template>

<style lang="scss" scoped>
.archive-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid color-mix(in srgb, var(--color-main) 15%, transparent);
}

.archive-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.4rem;
  padding-block: 1.6rem;
  border-bottom: 1px solid color-mix(in srgb, var(--color-main) 15%, transparent);
  color: inherit;
  text-decoration: none;

  @include desktop {
    grid-template-columns: 8rem 1fr 22rem 16rem 12rem;
    align-items: center;
    gap: 1.6rem;
    padding-block: 2rem;
  }
}

.archive-row__year,
.archive-row__venue,
.archive-row__role,
.archive-row__pillar {
  opacity: 0.6;
}

.archive-row__title {
  display: block;
  overflow: hidden;
  min-width: 0;

  // RollText ist standardmäßig inline-block (Breite = Inhalt); hier auf die
  // Zeilenbreite begrenzen, damit lange Titel nicht die Seite verbreitern.
  :deep(.roll-text) {
    display: block;
    width: 100%;
  }
}

.archive-empty {
  padding-block: 4rem;
  opacity: 0.6;
}
</style>
