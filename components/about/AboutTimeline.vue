<script setup lang="ts">
// Timeline = Lebenslauf (D-017), aus allen Projekten via useAllProjects(),
// sortiert nach `year`. Auf Desktop horizontal scrollbar, auf Mobil vertikal.
const { data: projects } = await useAllProjects()
const sorted = computed(() => [...projects.value].sort((a, b) => a.year - b.year))

const rootRef = ref<HTMLElement | null>(null)
useReveal(rootRef)
</script>

<template>
  <section class="timeline" ref="rootRef">
    <p class="font-body-12 uppercase timeline__heading container">{{ $t('about.timelineHeading') }}</p>
    <ol class="timeline__track">
      <li v-for="p in sorted" :key="p.slug" class="timeline__item">
        <span class="timeline__dot" :style="{ backgroundColor: `var(--color-${p.pillar})` }" aria-hidden="true" />
        <span class="font-body-12 uppercase timeline__year">{{ p.yearLabel }}</span>
        <NuxtLink :to="$localePath(`/cases/${p.slug}`)" class="font-body-24 timeline__title">
          {{ p.title }}
        </NuxtLink>
        <span class="font-body-12 uppercase timeline__venue">{{ p.venue }}</span>
      </li>
    </ol>
  </section>
</template>

<style lang="scss" scoped>
.timeline {
  padding-block: 6rem;

  @include desktop {
    padding-block: 10rem;
  }
}

.timeline__heading {
  margin: 0 0 2.4rem;
  opacity: 0.6;
}

.timeline__track {
  margin: 0;
  padding: 0 var(--gutter);
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @include desktop {
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.timeline__item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  @include desktop {
    flex: 0 0 auto;
    width: 24rem;
    padding-inline: 1.6rem;
    border-left: 1px solid color-mix(in srgb, var(--color-main) 15%, transparent);

    &:first-child {
      padding-left: 0;
      border-left: none;
    }
  }
}

.timeline__dot {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  margin-bottom: 0.4rem;
}

.timeline__year {
  opacity: 0.6;
}

.timeline__title {
  color: inherit;
  text-decoration: none;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }

  @include desktop {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.timeline__venue {
  opacity: 0.5;
}
</style>
