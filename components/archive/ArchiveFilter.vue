<script setup lang="ts">
// Filter „All · Direct · Create · Participate“ (PLAN P15). Zustand liegt in
// der Route-Query (`?pillar=`), gehalten von der Seite.
import type { Pillar } from '~/types/project'

defineProps<{ modelValue: Pillar | 'all' }>()
const emit = defineEmits<{ 'update:modelValue': [Pillar | 'all'] }>()

const pillars: Pillar[] = ['direct', 'create', 'participate']
</script>

<template>
  <div class="archive-filter font-body-12 uppercase" role="group">
    <button
      type="button"
      class="archive-filter__btn"
      :class="{ 'is-active': modelValue === 'all' }"
      :aria-pressed="modelValue === 'all'"
      @click="emit('update:modelValue', 'all')"
    >
      {{ $t('archive.filterAll') }}
    </button>
    <button
      v-for="pillar in pillars"
      :key="pillar"
      type="button"
      class="archive-filter__btn"
      :class="{ 'is-active': modelValue === pillar }"
      :style="{ '--accent': `var(--color-${pillar})` }"
      :aria-pressed="modelValue === pillar"
      @click="emit('update:modelValue', pillar)"
    >
      {{ $t(`pillar.${pillar}`) }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.archive-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem 1.6rem;
  padding-block: 9rem 3.2rem;

  @include desktop {
    padding-block: 10rem 4rem;
  }
}

.archive-filter__btn {
  cursor: pointer;
  padding: 0.6rem 0;
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  text-transform: inherit;
  letter-spacing: inherit;
  position: relative;
  opacity: 0.5;
  transition: opacity 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background: var(--accent, currentColor);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.2s ease;
  }

  &:hover,
  &:focus-visible {
    opacity: 0.8;
  }

  &.is-active {
    opacity: 1;

    &::after {
      transform: scaleX(1);
    }
  }
}
</style>
