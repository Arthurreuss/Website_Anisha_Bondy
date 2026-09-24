<script setup lang="ts">
// Sichtbarer Platzhalter für offene Fragen (D-018). Wird beim Durchgehen mit
// Anisha nach und nach durch echte Inhalte ersetzt. Ausblenden für den
// Livegang: runtimeConfig.public.showTodos = false (NUXT_PUBLIC_SHOW_TODOS=false).
defineProps<{ text?: string; block?: boolean }>()
const show = useRuntimeConfig().public.showTodos
</script>

<template>
  <component :is="block ? 'div' : 'span'" v-if="show" class="ui-todo font-body-12" :class="{ 'ui-todo--block': block }">
    <span class="ui-todo__prefix uppercase">{{ $t('todo.prefix') }}:</span>
    <slot>{{ text }}</slot>
  </component>
</template>

<style lang="scss" scoped>
.ui-todo {
  display: inline-block;
  padding: 0.2em 0.5em;
  border: 1px dashed currentColor;
  border-radius: 0.3rem;
  color: var(--color-todo);
  background: color-mix(in srgb, var(--color-todo) 8%, transparent);
  line-height: 1.4;

  &--block {
    display: block;
    padding: 1.2rem 1.6rem;
  }
}

.ui-todo__prefix {
  margin-right: 0.4em;
  font-weight: 500;
}
</style>
