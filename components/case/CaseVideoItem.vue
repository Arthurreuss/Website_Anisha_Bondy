<script setup lang="ts">
// Einzelnes Video im Klick-zum-Laden-Videoblock (P14, D-019).
// Vor dem Klick wird höchstens ein Vorschaubild geladen (YouTube-Standard-
// Thumbnail über i.ytimg.com, kein Request an youtube.com/vimeo.com). Fehlt
// bei Vimeo ein `poster`, zeigt die Fläche stattdessen die Säulenfarbe.
// Erst nach Klick wird das iframe (youtube-nocookie.com / player.vimeo.com)
// eingefügt.
import type { VideoRef } from '~/types/project'

const props = defineProps<{ video: VideoRef; pillarColor: string }>()

const loaded = ref(false)

const isNarrow = computed(() => props.video.aspect === '9:16')

const thumbnail = computed(() => {
  if (props.video.poster) return props.video.poster
  if (props.video.provider === 'youtube') {
    return `https://i.ytimg.com/vi/${props.video.id}/hqdefault.jpg`
  }
  return null
})

const embedUrl = computed(() => {
  if (props.video.provider === 'youtube') {
    return `https://www.youtube-nocookie.com/embed/${props.video.id}?autoplay=1&rel=0`
  }
  const params = new URLSearchParams({ autoplay: '1' })
  if (props.video.hash) params.set('h', props.video.hash)
  return `https://player.vimeo.com/video/${props.video.id}?${params.toString()}`
})

function load() {
  loaded.value = true
}
</script>

<template>
  <div class="video" :class="{ 'video--narrow': isNarrow }" :style="{ '--pillar-color': pillarColor }">
    <div class="video__frame-wrap" :class="{ 'video--narrow': isNarrow }">
      <iframe
        v-if="loaded"
        class="video__iframe"
        :src="embedUrl"
        :title="video.title"
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        frameborder="0"
      />
      <button v-else type="button" class="video__trigger" @click="load">
        <img v-if="thumbnail" class="video__poster" :src="thumbnail" alt="" loading="lazy" />
        <div v-else class="video__fallback" aria-hidden="true" />
        <span class="video__play" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
        </span>
        <span class="video__title font-body-12 uppercase">{{ video.title }}</span>
        <span class="sr-only">{{ $t('case.video.play') }}</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.video {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.video__frame-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background-color: color-mix(in srgb, var(--color-main) 6%, transparent);

  &.video--narrow {
    aspect-ratio: 9 / 16;
    max-width: 24rem;
    margin-inline: auto;

    @include desktop {
      max-width: 30rem;
    }
  }
}

.video__iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.video__trigger {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.6rem;
  border: 0;
  margin: 0;
  cursor: pointer;
  background: none;
  color: #fff;
  font: inherit;
  text-align: center;

  &:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: -2px;
  }
}

.video__poster {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  // Tageszeit-Theme (P10): nachts etwas abgedunkelt, wie andere Vorschaubilder.
  filter: brightness(var(--bg-brightness));
  transition: filter 1.1s ease;
}

.video__trigger::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0) 60%);
}

.video__fallback {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-color: var(--pillar-color);
}

.video__play {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 50%;
  background: color-mix(in srgb, #000 45%, transparent);
  transition: transform 0.25s ease;
}

.video__trigger:hover .video__play,
.video__trigger:focus-visible .video__play {
  transform: scale(1.08);
}

.video__title {
  max-width: 34rem;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}


// reduced-motion (P10): Theme-Wechsel bleiben, nur ohne Animation.
@media (prefers-reduced-motion: reduce) {
  .video__poster {
    transition: none !important;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
