<script setup lang="ts">
// Facts-Block nach dem Intro (P14): Rolle, Credits, Preise, Presse und die
// offenen `todos` des Projekts. Leere Abschnitte werden nicht gerendert.
// Reveals wie auf der übrigen Detailseite (useReveal, data-reveal="mask" auf
// den Labels).
import type { Project } from '~/types/project'

const props = defineProps<{ project: Project }>()

const hasContent = computed(
  () =>
    Boolean(props.project.role) ||
    props.project.credits.length > 0 ||
    props.project.awards.length > 0 ||
    props.project.press.length > 0 ||
    props.project.todos.length > 0,
)

const rootRef = ref<HTMLElement | null>(null)
useReveal(rootRef)
</script>

<template>
  <section v-if="hasContent" class="facts" ref="rootRef">
    <div v-if="project.role" class="facts__col">
      <div class="label-mask">
        <p class="label font-body-12 uppercase" data-reveal="mask">{{ $t('case.facts.role') }}</p>
      </div>
      <p class="value font-body">{{ project.role }}</p>
    </div>

    <div v-if="project.credits.length" class="facts__col">
      <div class="label-mask">
        <p class="label font-body-12 uppercase" data-reveal="mask">{{ $t('case.facts.credits') }}</p>
      </div>
      <ul class="list">
        <li v-for="credit in project.credits" :key="`${credit.role}-${credit.name}`" class="font-body">
          <span class="uppercase font-body-12 list__role">{{ credit.role }}</span> — {{ credit.name }}
        </li>
      </ul>
    </div>

    <div v-if="project.awards.length" class="facts__col">
      <div class="label-mask">
        <p class="label font-body-12 uppercase" data-reveal="mask">{{ $t('case.facts.awards') }}</p>
      </div>
      <ul class="list">
        <li v-for="award in project.awards" :key="`${award.label}-${award.year}`" class="font-body">
          {{ award.label }} · {{ award.year }} ·
          {{ award.status === 'won' ? $t('case.facts.awardWon') : $t('case.facts.awardNominated') }}
        </li>
      </ul>
    </div>

    <div v-if="project.press.length" class="facts__col facts__col--wide">
      <div class="label-mask">
        <p class="label font-body-12 uppercase" data-reveal="mask">{{ $t('case.facts.press') }}</p>
      </div>
      <ul class="list list--press">
        <li v-for="(item, i) in project.press" :key="i" class="press-item">
          <p class="font-body-12 uppercase press-item__meta">
            {{ item.source }}<span v-if="item.date"> · {{ item.date }}</span><span v-if="item.author"> · {{ item.author }}</span>
          </p>
          <p v-if="item.quote" class="font-body press-item__quote">&ldquo;{{ item.quote }}&rdquo;</p>
          <a v-if="item.url" :href="item.url" target="_blank" rel="noopener noreferrer" class="font-body-12 uppercase press-item__link">
            {{ $t('case.facts.pressLink') }} ↗
          </a>
        </li>
      </ul>
    </div>

    <div v-if="project.todos.length" class="facts__col facts__col--wide">
      <UiTodo v-for="(todo, i) in project.todos" :key="i" block :text="todo" class="facts__todo" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.facts {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3.2rem 0.8rem;
  padding: 5rem var(--gutter) 0;

  @include desktop {
    grid-template-columns: repeat(14, 1fr);
    gap: 4rem 1.6rem;
    padding: 6rem var(--gutter) 0;
  }
}

.facts__col {
  grid-column: 1 / -1;
  min-width: 0;

  @include desktop {
    grid-column: span 4;
  }
}

.facts__col--wide {
  @include desktop {
    grid-column: span 6;
  }
}

.label-mask {
  overflow: hidden;
}

.label {
  margin: 0 0 0.8rem;
}

.value {
  margin: 0;
}

.list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.list__role {
  opacity: 0.6;
}

.list--press {
  gap: 2rem;
}

.press-item__meta {
  opacity: 0.6;
  margin: 0 0 0.4rem;
}

.press-item__quote {
  margin: 0 0 0.4rem;
}

.press-item__link {
  color: inherit;
}

.facts__todo + .facts__todo {
  margin-top: 0.8rem;
}
</style>
