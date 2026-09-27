<script setup lang="ts">
// Barrie-Kosky-Video im Bio-Teil der About-Seite (P26/D-055): YouTube
// „My very special Barrie moment“ (Komische Oper Berlin), Klick-zum-Laden
// wie auf den Case-Seiten (CaseVideoItem wiederverwendet, D-019).
import type { VideoRef } from '~/types/project'

const { t } = useI18n()

const video = computed<VideoRef>(() => ({
  provider: 'youtube',
  id: 'eWz4lkQRvmQ',
  title: t('about.barrieVideoTitle'),
}))

const rootRef = ref<HTMLElement | null>(null)
useReveal(rootRef)
</script>

<template>
  <section class="barrie-video container" ref="rootRef">
    <div class="barrie-video__media" data-reveal="image">
      <CaseVideoItem :video="video" pillar-color="var(--color-direct)" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.barrie-video {
  padding-block: 0 6rem;

  @include desktop {
    padding-block: 0 10rem;
    display: grid;
    grid-template-columns: repeat(14, 1fr);
    gap: 0.8rem;
  }
}

.barrie-video__media {
  max-width: 68rem;

  @include desktop {
    grid-column: 5 / 15;
  }
}
</style>
