<script setup lang="ts">
// "Next case"-Sektion der Detailseite (Spezifikation §5).
// Verlinkt zyklisch zum nächsten Projekt (letztes -> erstes, siehe useProject()).
// Scroll-Reveals über useReveal() (P9) auf den vorhandenen .title-mask-Zeilen.
import type { Project } from '~/types/project'

defineProps<{ project: Project }>()

const leftRef = ref<HTMLElement | null>(null)
useReveal(leftRef)

// Hover-Lift (P19): gleiches Anheben wie auf den Galerie-Karten, dazu der
// bestehende Zoom des Vorschaubilds (bisher rein per CSS-:hover) – als GSAP-Tween,
// da eine per JS gesetzte Inline-transform sonst die CSS-Regel überschreiben würde.
const thumbRef = ref<HTMLElement | null>(null)
const thumbImgRef = ref<HTMLElement | null>(null)
const hoverLift = useHoverLift()

onMounted(() => {
  if (thumbRef.value && thumbImgRef.value) {
    hoverLift.add(thumbRef.value, thumbImgRef.value, { enter: { scale: 1.06 }, leave: { scale: 1 } })
  }
})

function onClick(e: MouseEvent) {
  // Bei Strg/Cmd/mittlerer Maustaste öffnet der Browser einen neuen Tab –
  // die aktuelle Seite bleibt bestehen, also nicht zurückfallen lassen.
  if (e.ctrlKey || e.metaKey || e.button === 1) return
  if (thumbRef.value) hoverLift.dropToZero(thumbRef.value, 1.2, 'power2.inOut')
}
</script>

<template>
  <NuxtLink :to="$localePath(`/cases/${project.slug}`)" class="next" @click="onClick">
    <div class="left" ref="leftRef">
      <div class="title-mask">
        <p class="font-headline-1 eyebrow" data-reveal="mask">{{ $t('case.next') }}</p>
      </div>
      <div class="title-mask">
        <p class="font-headline-1 name" data-reveal="mask">{{ project.title }}</p>
      </div>
      <p class="meta font-body-12 uppercase">{{ $t(`pillar.${project.pillar}`) }} · {{ project.venue }}</p>
    </div>

    <div class="thumb" ref="thumbRef">
      <img
        v-if="project.cover.type === 'video'"
        class="thumb__img"
        ref="thumbImgRef"
        :src="project.cover.poster"
        :alt="project.cover.alt"
      />
      <img v-else class="thumb__img" ref="thumbImgRef" :src="project.cover.src" :alt="project.cover.alt" />
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.next {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.6rem;
  padding: 6rem var(--gutter);
  min-height: calc(100dvh - 7.2rem);

  @include desktop {
    min-height: 60rem;
    align-items: center;
  }
}

.left {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
}

.title-mask {
  overflow: hidden;
}

.eyebrow,
.name {
  margin: 0;
}

.eyebrow {
  opacity: 0.5;
}

.meta {
  margin-top: 1.2rem;
}

.thumb {
  flex: none;
  width: 9rem;
  aspect-ratio: 4 / 5;
  overflow: hidden;

  @include desktop {
    width: 16rem;
  }
}

.thumb__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
}
</style>
