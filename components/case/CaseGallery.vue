<script setup lang="ts">
// Bildergalerie der Case-Detailseite (Spezifikation §5).
// Blocktypen: "single" (ein großes Medium) und "group-3" (drei nebeneinander).
import type { GalleryBlock } from '~/types/project'

defineProps<{ blocks: GalleryBlock[] }>()

const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <section class="gallery">
    <div v-for="(block, i) in blocks" :key="i" class="block">
      <div v-if="block.type === 'single'" class="single">
        <CaseMedia :media="block.media" />
      </div>

      <div v-else class="group">
        <div v-for="(m, mi) in block.media" :key="mi" class="group__item">
          <CaseMedia :media="m" />
        </div>
      </div>

      <div class="label-mask">
        <p class="label font-body-12 uppercase">{{ pad(i + 1) }}. {{ block.label }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:math';

.gallery {
  display: flex;
  flex-direction: column;
  gap: 8rem;
  padding-inline: var(--gutter);
  padding-block: 6rem;

  @include desktop {
    gap: 14rem;
    padding-block: 12rem;
  }
}

.block {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.single {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  margin-inline: auto;
  width: 100%;

  // 10 von 14 Spalten (Spalte 3–12), zentriert
  @include desktop {
    width: math.percentage(math.div(10, 14));
  }
}

.group {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.8rem;

  @include desktop {
    grid-template-columns: repeat(3, 1fr);
  }
}

.group__item {
  grid-column: 1 / -1;
  aspect-ratio: 4 / 5;
  overflow: hidden;

  @include desktop {
    grid-column: auto;
  }
}

.group__item:first-child {
  grid-column: 1 / -1;

  @include desktop {
    grid-column: auto;
  }
}

.group__item:not(:first-child) {
  grid-column: span 3;

  @include desktop {
    grid-column: auto;
  }
}

.label-mask {
  overflow: hidden;
}
</style>
