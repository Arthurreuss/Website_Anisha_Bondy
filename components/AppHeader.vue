<script setup lang="ts">
// Kopfzeile (Spezifikation §4/§6): fixiert oben, Logo links, Menu/Contact
// rechts. Togglet die Overlays über das useOverlay-Composable.
import RollText from '~/components/ui/RollText.vue'

const overlay = useOverlay()

function toggleMenu() {
  overlay.value = overlay.value === 'menu' ? null : 'menu'
}

function toggleContact() {
  overlay.value = overlay.value === 'contact' ? null : 'contact'
}
</script>

<template>
  <header class="app-header font-body-12 uppercase">
    <div class="app-header__inner container">
      <NuxtLink to="/" class="app-header__logo roll-trigger" aria-label="Anisha Bondy – Startseite">
        <span class="app-header__logo-line"><RollText text="Anisha" /></span>
        <span class="app-header__logo-line"><RollText text="Bondy" /></span>
      </NuxtLink>

      <nav class="app-header__nav">
        <button
          type="button"
          class="app-header__btn roll-trigger"
          aria-haspopup="true"
          :aria-expanded="overlay === 'menu'"
          aria-controls="menu-overlay"
          @click="toggleMenu"
        >
          <RollText text="Menu" />
        </button>
        <button
          type="button"
          class="app-header__btn roll-trigger"
          aria-haspopup="true"
          :aria-expanded="overlay === 'contact'"
          aria-controls="contact-overlay"
          @click="toggleContact"
        >
          <RollText text="Contact" />
        </button>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  pointer-events: none;
}

.app-header__inner {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-block: var(--gutter);
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
}

.app-header__logo {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.app-header__logo-line {
  display: block;
}

.app-header__nav {
  display: flex;
  gap: 2.4rem;
}

.app-header__btn {
  cursor: pointer;
}
</style>
