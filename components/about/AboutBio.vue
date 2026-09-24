<script setup lang="ts">
// Bio (dritte Person), 3 Absätze. Wohnort widersprüchlich (Mockup vs. Quellen,
// siehe INHALTE.md §2/§7) → Mockup-Angabe „Vienna“ verwenden + UiTodo.
import { siteContent } from '~/content/site'
import { pick } from '~/content/projects'
import type { Locale } from '~/types/project'

const { locale } = useI18n()
const l = <T,>(v: { en: T; de: T }) => pick(v, locale.value as Locale)

const paragraphs = computed(() => l(siteContent.bio))

const rootRef = ref<HTMLElement | null>(null)
useReveal(rootRef)
</script>

<template>
  <section class="bio container" ref="rootRef">
    <div class="title-mask bio__heading">
      <h2 class="font-headline-2 bio__heading-text" data-reveal="mask">{{ $t('about.bioHeading') }}</h2>
    </div>
    <div class="bio__text">
      <p v-for="(paragraph, i) in paragraphs" :key="i" class="font-body-24" data-reveal="lines">
        {{ paragraph }}
      </p>
      <UiTodo block>{{ $t('about.residenceTodo') }}</UiTodo>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.bio {
  padding-block: 6rem;

  @include desktop {
    padding-block: 10rem;
    display: grid;
    grid-template-columns: repeat(14, 1fr);
    gap: 0.8rem;
  }
}

.bio__heading {
  margin: 0 0 3.2rem;

  @include desktop {
    grid-column: 1 / 5;
    margin: 0;
  }
}

.title-mask {
  overflow: hidden;
}

.bio__heading-text {
  margin: 0;
}

.bio__text {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  max-width: 68rem;

  @include desktop {
    grid-column: 5 / 15;
  }
}
</style>
