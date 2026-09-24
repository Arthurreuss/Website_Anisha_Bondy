<script setup lang="ts">
// Vollbild-Menü-Overlay (Spezifikation §6). Öffnet/schließt per GSAP
// (clip-path-Aufdeckung von oben, Links zeilenweise ein), stoppt Lenis
// während es offen ist, schließt bei Linkklick / Escape / Routenwechsel.
import { CustomEase } from 'gsap/CustomEase'

const overlay = useOverlay()
const { $gsap, $lenis } = useNuxtApp()
const route = useRoute()

const rootEl = ref<HTMLElement | null>(null)
const linkEls = ref<HTMLElement[]>([])
const closeBtnEl = ref<HTMLElement | null>(null)
let triggerEl: HTMLElement | null = null

const links = [
  { label: 'Work', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Archive', to: '/archive' },
]

const isOpen = computed(() => overlay.value === 'menu')
// Bleibt während der Schließ-Animation noch true, damit das Overlay sichtbar
// und fokussierbar bleibt, bis die Animation fertig ist.
const visible = ref(false)

const prefersReducedMotion = () =>
  import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches

let ease = '0.46, 0, 0.09, 1'
if (import.meta.client) {
  CustomEase.create('menuReveal', '0.46, 0, 0.09, 1')
  ease = 'menuReveal'
}

function setLinkEl(el: unknown, i: number) {
  linkEls.value[i] = el as HTMLElement
}

function close() {
  overlay.value = null
}

function playOpen() {
  if (!rootEl.value) return
  const reduced = prefersReducedMotion()
  const duration = reduced ? 0 : 0.6
  const linkDuration = reduced ? 0 : 0.7

  $gsap.set(rootEl.value, { clipPath: 'inset(0 0 100% 0)' })
  $gsap.set(linkEls.value, { yPercent: 100 })

  const tl = $gsap.timeline()
  tl.to(rootEl.value, { clipPath: 'inset(0 0 0% 0)', duration, ease })
  tl.to(
    linkEls.value,
    { yPercent: 0, duration: linkDuration, stagger: reduced ? 0 : 0.08, ease },
    reduced ? 0 : '-=0.3',
  )
}

function playClose(onComplete?: () => void) {
  if (!rootEl.value) {
    onComplete?.()
    return
  }
  const reduced = prefersReducedMotion()
  const duration = reduced ? 0 : 0.5

  $gsap.to(rootEl.value, {
    clipPath: 'inset(0 0 100% 0)',
    duration,
    ease,
    onComplete,
  })
}

watch(isOpen, async (open) => {
  if (open) {
    triggerEl = (document.activeElement as HTMLElement) ?? null
    visible.value = true
    $lenis?.stop()
    await nextTick()
    playOpen()
    await nextTick()
    closeBtnEl.value?.focus()
  } else {
    playClose(() => {
      visible.value = false
    })
    $lenis?.start()
    triggerEl?.focus()
  }
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) close()
}

watch(
  () => route.fullPath,
  () => {
    if (isOpen.value) close()
  },
)

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div
    id="menu-overlay"
    ref="rootEl"
    class="menu-overlay"
    role="dialog"
    aria-modal="true"
    aria-label="Menu"
    :inert="!isOpen"
    :class="{ 'menu-overlay--open': visible }"
  >
    <button ref="closeBtnEl" type="button" class="menu-overlay__close font-body-12 uppercase" @click="close">
      Close
    </button>

    <nav class="menu-overlay__nav">
      <NuxtLink
        v-for="(link, i) in links"
        :key="link.to"
        :ref="(el) => setLinkEl((el as any)?.$el ?? el, i)"
        :to="link.to"
        class="menu-overlay__link font-headline-1"
        @click="close"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background-color: var(--color-bg);
  color: var(--color-main);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--gutter);
  clip-path: inset(0 0 100% 0);
  visibility: hidden;

  &--open {
    visibility: visible;
  }
}

.menu-overlay__close {
  position: absolute;
  top: var(--gutter);
  right: var(--gutter);
  cursor: pointer;
}

.menu-overlay__nav {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.menu-overlay__link {
  overflow: hidden;
  display: block;
}
</style>
