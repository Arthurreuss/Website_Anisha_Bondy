<script setup lang="ts">
// Videoblock der Case-Detailseite (P14). Erstes Video groß, weitere in einem
// Raster (z. B. Selam Opera! mit ~10 Clips). Scroll-Reveal wie die Galerie
// (useReveal, data-reveal="image"); das Laden der Videos selbst bleibt
// Klick-gesteuert (CaseVideoItem).
import type { Pillar, VideoRef } from '~/types/project'

const props = defineProps<{ videos: VideoRef[]; pillar: Pillar }>()

const pillarColor = computed(() => `var(--color-${props.pillar})`)
const main = computed(() => props.videos[0])
const rest = computed(() => props.videos.slice(1))

const rootRef = ref<HTMLElement | null>(null)
useReveal(rootRef)
</script>

<template>
  <section v-if="videos.length" class="case-videos" ref="rootRef">
    <div class="case-videos__main" data-reveal="image">
      <CaseVideoItem :video="main!" :pillar-color="pillarColor" />
    </div>

    <div v-if="rest.length" class="case-videos__grid">
      <div v-for="(video, i) in rest" :key="i" class="case-videos__grid-item" data-reveal="image">
        <CaseVideoItem :video="video" :pillar-color="pillarColor" />
      </div>
    </div>

    <p class="case-videos__notice font-body-12">{{ $t('case.video.notice') }}</p>
  </section>
</template>

<style lang="scss" scoped>
.case-videos {
  padding-inline: var(--gutter);
  padding-block: 6rem;

  @include desktop {
    padding-block: 8rem;
  }
}

.case-videos__notice {
  margin-top: 1.6rem;
  opacity: 0.55;
}

.case-videos__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1.6rem 0.8rem;
  margin-top: 1.6rem;

  @include desktop {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.4rem 1.6rem;
    margin-top: 2.4rem;
  }
}

.case-videos__grid-item {
  grid-column: 1 / -1;

  @include desktop {
    grid-column: auto;
  }
}
</style>
