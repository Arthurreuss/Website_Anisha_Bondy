<script setup lang="ts">
// Standard-Layout (P4): Header + Overlays rahmen jede Seite ein.
import AppHeader from '~/components/AppHeader.vue'
import MenuOverlay from '~/components/MenuOverlay.vue'
import ContactOverlay from '~/components/ContactOverlay.vue'
</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <MenuOverlay />
    <ContactOverlay />
    <slot />
  </div>
</template>
