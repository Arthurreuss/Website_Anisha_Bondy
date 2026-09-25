<script setup lang="ts">
// Leichte Vorschau einer Hauptseite für die Menü-Fenster (P23, §6).
// Bewusst keine echten Seiten-Komponenten mit Nebenwirkungen (Intro,
// Endlos-Galerie, Scroll-Reveals, SEO-Meta) und keine Videos – nur Standbilder
// und Text im Layout der jeweiligen Seite. Wird vom Menü mit `inert`
// eingebunden (nicht fokussierbar, nicht vorgelesen).
import { siteContent } from '~/content/site'
import { pick } from '~/content/projects'
import type { Locale } from '~/types/project'
import ArchiveFilter from '~/components/archive/ArchiveFilter.vue'
import ArchiveList from '~/components/archive/ArchiveList.vue'

const props = defineProps<{ page: 'work' | 'about' | 'archive' }>()

const { locale } = useI18n()
const l = <T,>(v: { en: T; de: T }) => pick(v, locale.value as Locale)

// Ohne await: Daten liegen schon im Cache der Seiten (gleicher Schlüssel)
const { data: all } = useAllProjects()
const featured = computed(() => all.value.filter((p) => p.featured).slice(0, 6))
const archive = computed(() => [...all.value].sort((a, b) => b.year - a.year).slice(0, 10))
const still = (p: (typeof all.value)[number]) => (p.cover.type === 'video' ? p.cover.poster : p.cover.src)
</script>

<template>
  <div class="preview" :class="`preview--${props.page}`">
    <div v-if="props.page === 'work'" class="work font-body-12 uppercase">
      <div v-for="p in featured" :key="p.slug" class="work__card">
        <div class="work__name">{{ p.title }}</div>
        <div class="work__img">
          <img :src="still(p)" alt="" loading="eager" draggable="false" />
        </div>
      </div>
    </div>

    <div v-else-if="props.page === 'archive'" class="container">
      <ArchiveFilter model-value="all" />
      <ArchiveList :projects="archive" />
    </div>

    <div v-else class="about container">
      <div class="about__portrait">
        <img src="/media/about/portrait.jpg" alt="" loading="eager" />
      </div>
      <div class="about__text">
        <p class="font-headline-1 about__title">{{ l(siteContent.statement.title) }}</p>
        <p class="font-body-24 about__body">{{ l(siteContent.statement.body) }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preview {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background-color: var(--color-bg);
  color: var(--color-main);
}

// Wie HomeGallery/GalleryCard: Reihe am unteren Rand
.work {
  position: absolute;
  inset: auto 0 0;
  display: flex;
  align-items: flex-end;
  gap: 0.8rem;
  padding: 0 0.8rem 0.8rem;

  @include tablet-up {
    padding: 0 1.6rem 1.6rem;
  }
}

.work__card {
  flex-shrink: 0;
  width: 83%;

  @include tablet-up {
    width: 36.6%;
  }

  @include desktop {
    width: calc(28.74% - 0.8rem);
  }
}

.work__name {
  margin-bottom: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @include desktop {
    margin-bottom: 1.6rem;
  }
}

.work__img {
  aspect-ratio: 396 / 496;
  overflow: hidden;
  background-color: color-mix(in srgb, var(--color-main) 6%, transparent);

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.15);
    filter: brightness(var(--bg-brightness));
  }
}

// Wie AboutHero
.about {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.8rem;
  padding-top: 9rem;

  @include desktop {
    grid-template-columns: repeat(14, 1fr);
    padding-top: 10rem;
  }
}

.about__portrait {
  grid-column: 1 / -1;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  background-color: color-mix(in srgb, var(--color-main) 6%, transparent);

  @include desktop {
    grid-column: 1 / 6;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.about__text {
  grid-column: 1 / -1;
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  @include desktop {
    grid-column: 7 / 15;
    margin-top: 0;
    justify-content: flex-end;
    padding-bottom: 2rem;
  }
}

.about__title,
.about__body {
  margin: 0;
}

.about__body {
  max-width: 48rem;
}
</style>
