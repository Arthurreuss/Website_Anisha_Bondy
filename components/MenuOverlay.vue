<script setup lang="ts">
// Menü mit Seitenfenstern (P23, docs/animationen-v2.md §6, D-035).
//
// Öffnen: die aktuelle Seite schrumpft zu einem Fenster (wie §5 Phase 1,
// Ease pageSpread, 1.3 s), rechts daneben gleiten Vorschauen der anderen
// Hauptseiten (Work, About, Archive) als Fenster herein, versetzt 0.06 s;
// auf jedem Fenster rollt der große Seitentitel ein. Hover hebt ein Fenster an.
// Klick auf ein Fenster: es zoomt auf Vollbild (§5 Phase 2), die aktuelle
// Seite fährt hinaus, dann Seitenwechsel ohne weiteren Übergang.
// Schließen (Close, Esc, Klick aufs aktuelle Fenster): aktuelles Fenster
// zoomt zurück, Vorschauen gleiten hinaus.
// Mobil: kleine Fenster in einer Reihe oben, darunter die Textlinks.
//
// Ebenen (Wurzel ohne eigenen Stapelkontext): Fläche 200 · aktuelle Seite 201 ·
// Vorschau-Fenster 202 · Bedienelemente 203 · Fenster beim Zoomen 204.
// Vorschauen sind leichte Komponenten ohne Videos (MenuPreview.vue).
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LangSwitch from '~/components/LangSwitch.vue'
import RollText from '~/components/ui/RollText.vue'
import PageTitle from '~/components/PageTitle.vue'
import MenuPreview from '~/components/menu/MenuPreview.vue'
import { pageSpread, suppressWindowTransition } from '~/composables/useWindowTransition'

type Key = 'work' | 'about' | 'archive'
interface MenuPage {
  key: Key
  to: string
  route: string
  label: string
  title: string
}
interface Slot {
  x: number
  y: number
  scale: number
  cut: number
}

const PAGES: MenuPage[] = [
  { key: 'work', to: '/', route: 'index', label: 'nav.work', title: 'pageTitle.work' },
  { key: 'about', to: '/about', route: 'about', label: 'nav.about', title: 'pageTitle.about' },
  { key: 'archive', to: '/archive', route: 'archive', label: 'nav.archive', title: 'pageTitle.archive' },
]

const PHASE = 1.3
const TITLE_OUT = 1.2
const STAGGER = 0.06
const SCALE = 0.75
const EXIT_SCALE = 1.15
const HOVER_LIFT = 12
// Desktop: Rand und Abstand der Fenster (Anteil der Viewport-Breite)
const MARGIN = 0.04
const GAP = 0.024
// Mobil (px): Fensterreihe oben, Textlinks darunter
const MOBILE_MARGIN = 16
const MOBILE_GAP = 8
const MOBILE_TOP = 88

const overlay = useOverlay()
const { $lenis } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()

const isOpen = computed(() => overlay.value === 'menu')
// Bleibt während der Schließ-Animation true (Fenster bleiben gerendert)
const visible = ref(false)
const mobile = ref(false)
const previews = ref<MenuPage[]>([])
const hitStyle = ref<Record<string, string>>({})
const windowsBottom = ref('0px')

const backdropEl = ref<HTMLElement | null>(null)
const closeBtnEl = ref<HTMLElement | null>(null)
const windowEls: HTMLElement[] = []
const linkEls: HTMLElement[] = []

let page: HTMLElement | null = null
let savedScroll = 0
let slots: Slot[] = []
let tl: gsap.core.Timeline | null = null
let navigating = false
let seq = 0
let triggerEl: HTMLElement | null = null

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const isMobile = () => window.matchMedia('(max-width: 767px)').matches
const dur = (d: number) => (reducedMotion() ? 0 : d)
const raf2 = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))

function setWindowEl(el: unknown, i: number) {
  if (el) windowEls[i] = el as HTMLElement
}
function setLinkEl(el: unknown, i: number) {
  const node = (el as { $el?: HTMLElement } | null)?.$el ?? el
  if (node) linkEls[i] = node as HTMLElement
}

function currentKey(): Key | null {
  const name = String(route.name ?? '').split('___')[0]
  return PAGES.find((p) => p.route === name)?.key ?? null
}

/** Die gerade sichtbare Seite (Wurzel von <NuxtPage>). */
function findPage(): HTMLElement | null {
  const mains = document.querySelectorAll<HTMLElement>('.app-shell > main')
  return mains[mains.length - 1] ?? null
}

function titleParts(el: HTMLElement) {
  const title = el.querySelector<HTMLElement>('.page-title')
  const text = title?.querySelector<HTMLElement>('.page-title__text') ?? null
  return title && text ? { title, text } : null
}

/** Position je Fenster: 0 = aktuelle Seite, danach die Vorschauen. */
function computeSlots(n: number): Slot[] {
  const vw = window.innerWidth
  const vh = window.innerHeight
  if (!mobile.value) {
    const w = (vw * (1 - 2 * MARGIN) - (n - 1) * vw * GAP) / n
    const cut = (w / (SCALE * vw)) * 100
    return Array.from({ length: n }, (_, i) => ({
      x: vw * MARGIN + i * (w + vw * GAP) - (vw * (1 - SCALE)) / 2,
      y: 0,
      scale: SCALE,
      cut,
    }))
  }
  const w = (vw - 2 * MOBILE_MARGIN - (n - 1) * MOBILE_GAP) / n
  const scale = w / vw
  return Array.from({ length: n }, (_, i) => ({
    x: MOBILE_MARGIN + i * (w + MOBILE_GAP) - (vw * (1 - scale)) / 2,
    y: MOBILE_TOP - (vh * (1 - scale)) / 2,
    scale,
    cut: 100,
  }))
}

/** Klickfläche über dem aktuellen Fenster und Oberkante der mobilen Links. */
function updateHitArea() {
  const s = slots[0]
  if (!s) return
  const vw = window.innerWidth
  const vh = window.innerHeight
  const top = (vh * (1 - s.scale)) / 2 + s.y
  hitStyle.value = {
    left: `${(vw * (1 - s.scale)) / 2 + s.x}px`,
    top: `${top}px`,
    width: `${s.scale * vw * (s.cut / 100)}px`,
    height: `${s.scale * vh}px`,
  }
  windowsBottom.value = `${top + s.scale * vh}px`
}

function fixPage(el: HTMLElement) {
  gsap.set(el, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100dvh',
    overflow: 'hidden',
    zIndex: 201,
    backgroundColor: 'var(--color-bg)',
    transformOrigin: 'center center',
    pointerEvents: 'none',
    '--cut': '100%',
    clipPath: 'inset(0 calc(100% - var(--cut)) 0 0)',
  })
  el.scrollTop = savedScroll
}

function uiTargets() {
  const root = document.getElementById('menu-overlay')
  return root ? Array.from(root.querySelectorAll<HTMLElement>('[data-menu-fade]')) : []
}

async function openMenu() {
  const id = ++seq
  tl?.kill()
  if (!visible.value) {
    triggerEl = (document.activeElement as HTMLElement) ?? null
    savedScroll = window.scrollY
    page = findPage()
  }
  mobile.value = isMobile()
  const current = currentKey()
  previews.value = PAGES.filter((p) => p.key !== current)
  $lenis?.stop()
  visible.value = true
  await nextTick()
  await raf2()
  if (id !== seq) return

  const vw = window.innerWidth
  const ease = pageSpread()
  const d = dur(PHASE)
  const wins = previews.value.map((_, i) => windowEls[i]!).filter(Boolean)
  slots = computeSlots(wins.length + 1)
  updateHitArea()

  const t = gsap.timeline()
  tl = t
  if (page) {
    if (!page.style.position) fixPage(page)
    const s = slots[0]!
    t.to(page, { x: s.x, y: s.y, scale: s.scale, '--cut': `${s.cut}%`, duration: d, ease }, 0)
  }
  wins.forEach((win, i) => {
    const s = slots[i + 1]!
    gsap.set(win, { y: s.y, scale: s.scale, '--cut': `${s.cut}%`, autoAlpha: 1, zIndex: 202 })
    t.fromTo(win, { x: s.x + vw }, { x: s.x, duration: d, ease }, dur(STAGGER * (i + 1)))
  })
  // Seitentitel rollen ein
  ;[page, ...wins].forEach((el, i) => {
    const parts = el && titleParts(el)
    if (!parts) return
    // Titel sitzt oben in der Seite: bei gescrollter Seite mitverschieben
    gsap.set(parts.title, { autoAlpha: 1, y: el.scrollTop })
    // Band hinter dem Titel deckt die Seite darunter ab (D-045)
    parts.title.classList.add('page-title--band')
    t.fromTo(parts.title, { '--band': 0 }, { '--band': 1, duration: dur(0.6), ease: 'power2.out' }, dur(STAGGER * i))
    t.fromTo(parts.text, { yPercent: 100 }, { yPercent: 0, duration: d, ease }, dur(STAGGER * i))
  })
  t.fromTo(uiTargets(), { autoAlpha: 0 }, { autoAlpha: 1, duration: dur(0.5), ease: 'power2.out' }, dur(0.4))
  if (mobile.value && linkEls.length) {
    t.fromTo(linkEls, { yPercent: 100 }, { yPercent: 0, duration: dur(0.7), stagger: dur(0.08), ease }, dur(0.4))
  }
  // Fokus erst, wenn der Button sichtbar wird (versteckte Elemente nehmen keinen Fokus)
  t.call(() => closeBtnEl.value?.focus(), [], dur(0.5) + 0.05)
}

function closeMenu() {
  if (!visible.value || navigating) return
  const id = ++seq
  tl?.kill()
  const vw = window.innerWidth
  const ease = pageSpread()
  const d = dur(PHASE)
  const wins = previews.value.map((_, i) => windowEls[i]!).filter(Boolean)
  const t = gsap.timeline({
    onComplete: () => {
      if (id === seq) cleanup()
    },
  })
  tl = t
  t.to(uiTargets(), { autoAlpha: 0, duration: dur(0.3) }, 0)
  wins.forEach((win, i) => {
    t.to(win, { x: (slots[i + 1]?.x ?? 0) + vw, duration: d, ease, overwrite: 'auto' }, dur(STAGGER * (wins.length - 1 - i)))
  })
  if (page) {
    t.to(page, { x: 0, y: 0, scale: 1, '--cut': '100%', duration: d, ease }, 0)
    const parts = titleParts(page)
    if (parts) {
      t.to(parts.text, { yPercent: 100, duration: dur(TITLE_OUT), ease }, 0)
      t.to(parts.title, { '--band': 0, duration: dur(TITLE_OUT), ease: 'power2.in' }, 0)
    }
  }
  triggerEl?.focus()
}

/** Menü sofort abbauen, Seite an ihre Scrollposition zurück. */
function cleanup() {
  tl?.kill()
  tl = null
  if (page) {
    const parts = titleParts(page)
    if (parts) {
      gsap.set([parts.title, parts.text], { clearProps: 'all' })
      parts.title.classList.remove('page-title--band')
      parts.title.style.removeProperty('--band')
    }
    gsap.set(page, { clearProps: 'all' })
    page.style.removeProperty('--cut')
    window.scrollTo(0, savedScroll)
    $lenis?.scrollTo(savedScroll, { immediate: true, force: true })
  }
  page = null
  visible.value = false
  previews.value = []
  windowEls.length = 0
  linkEls.length = 0
  $lenis?.start()
  ScrollTrigger.refresh()
}

/** Links im Fuß (Impressum, Datenschutz, Sprache): Menü sofort weg, dann normaler Wechsel. */
function teardownNow() {
  if (!visible.value || navigating) return
  seq++
  cleanup()
  overlay.value = null
}

function close() {
  overlay.value = null
}

function lift(i: number, on: boolean) {
  const win = windowEls[i]
  const s = slots[i + 1]
  if (!win || !s || navigating || reducedMotion()) return
  gsap.to(win, { y: s.y - (on ? HOVER_LIFT : 0), duration: 0.6, ease: 'power2.out' })
}

async function go(i: number, e: MouseEvent) {
  // Neuer Tab o. Ä.: Browser machen lassen
  if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return
  e.preventDefault()
  const target = previews.value[i]
  const win = windowEls[i]
  if (!target || !win || navigating) return
  navigating = true
  seq++
  tl?.kill()

  const vw = window.innerWidth
  const ease = pageSpread()
  const d = dur(PHASE)
  const t = gsap.timeline()
  tl = t
  gsap.killTweensOf(win)
  gsap.set(win, { zIndex: 204 })
  t.to(uiTargets(), { autoAlpha: 0, duration: dur(0.3) }, 0)
  t.to(win, { x: 0, y: 0, scale: 1, '--cut': '100%', duration: d, ease }, 0)
  const parts = titleParts(win)
  if (parts) {
    t.to(parts.text, { yPercent: 100, duration: dur(TITLE_OUT), ease }, 0)
    t.to(parts.title, { '--band': 0, duration: dur(TITLE_OUT), ease: 'power2.in' }, 0)
  }
  previews.value.forEach((_, j) => {
    const other = windowEls[j]
    if (other && other !== win) t.to(other, { x: `+=${vw}`, duration: d, ease }, 0)
  })
  if (page) t.to(page, { x: `-=${vw}`, scale: (slots[0]?.scale ?? SCALE) * EXIT_SCALE, duration: d, ease }, 0)
  await t

  // Seitenwechsel unter dem Vollbild-Fenster, danach Fenster ausblenden
  suppressWindowTransition()
  await router.push(localePath(target.to))
  await nextTick()
  await raf2()
  window.scrollTo(0, 0)
  $lenis?.scrollTo(0, { immediate: true, force: true })
  gsap.to([win, backdropEl.value], {
    autoAlpha: 0,
    duration: dur(0.35),
    ease: 'power1.out',
    onComplete: () => {
      page = null
      navigating = false
      visible.value = false
      previews.value = []
      windowEls.length = 0
      linkEls.length = 0
      tl = null
      if (backdropEl.value) gsap.set(backdropEl.value, { clearProps: 'all' })
      overlay.value = null
      $lenis?.start()
      ScrollTrigger.refresh()
    },
  })
}

watch(isOpen, (open) => (open ? openMenu() : closeMenu()))

// Sicherheitsnetz (z. B. Zurück-Taste bei offenem Menü)
watch(
  () => route.fullPath,
  () => {
    if (visible.value && !navigating) teardownNow()
  },
)

function onResize() {
  if (!visible.value || navigating) return
  slots = computeSlots(previews.value.length + 1)
  updateHitArea()
  if (page) {
    const s = slots[0]!
    gsap.set(page, { x: s.x, y: s.y, scale: s.scale, '--cut': `${s.cut}%` })
  }
  previews.value.forEach((_, i) => {
    const s = slots[i + 1]
    const win = windowEls[i]
    if (s && win) gsap.set(win, { x: s.x, y: s.y, scale: s.scale, '--cut': `${s.cut}%` })
  })
}

function focusables(): HTMLElement[] {
  const root = document.getElementById('menu-overlay')
  if (!root) return []
  return Array.from(root.querySelectorAll<HTMLElement>('a[href], button')).filter(
    (el) => el.tabIndex >= 0 && el.getClientRects().length > 0,
  )
}

function onKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return
  if (e.key === 'Escape') {
    close()
    return
  }
  // Fokus im Menü halten
  if (e.key === 'Tab') {
    const items = focusables()
    if (!items.length) return
    const first = items[0]!
    const last = items[items.length - 1]!
    if (!items.includes(document.activeElement as HTMLElement)) {
      e.preventDefault()
      ;(e.shiftKey ? last : first).focus()
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', onResize)
  tl?.kill()
})
</script>

<template>
  <div
    id="menu-overlay"
    class="menu"
    role="dialog"
    aria-modal="true"
    :aria-label="$t('nav.menu')"
    :inert="!isOpen"
  >
    <template v-if="visible">
      <div ref="backdropEl" class="menu__backdrop" @click="close"></div>

      <!-- Vor den Fenstern, damit Tab beim Schließen-Button beginnt -->
      <button
        ref="closeBtnEl"
        type="button"
        class="menu__close font-body-12 uppercase roll-trigger"
        data-menu-fade
        @click="close"
      >
        <RollText :text="$t('nav.close')" />
      </button>

      <div
        v-for="(p, i) in previews"
        :key="p.key"
        :ref="(el) => setWindowEl(el, i)"
        class="menu__window"
      >
        <div class="menu__preview" inert>
          <PageTitle :text="$t(p.title)" />
          <MenuPreview :page="p.key" />
        </div>
        <!-- Einfacher Link statt NuxtLink: dessen Klick würde sofort navigieren -->
        <a
          :href="localePath(p.to)"
          class="menu__window-link"
          :aria-label="$t(p.label)"
          :tabindex="mobile ? -1 : undefined"
          :aria-hidden="mobile || undefined"
          @click="go(i, $event)"
          @mouseenter="lift(i, true)"
          @mouseleave="lift(i, false)"
          @focus="lift(i, true)"
          @blur="lift(i, false)"
        ></a>
      </div>

      <!-- Klick aufs aktuelle Fenster schließt (Tastatur: Close-Button) -->
      <div class="menu__hit" :style="hitStyle" aria-hidden="true" @click="close"></div>

      <div class="menu__ui" :style="{ '--windows-bottom': windowsBottom }">
        <nav v-if="mobile" class="menu__nav" data-menu-fade :aria-label="$t('nav.menu')" @click.capture="teardownNow">
          <span v-for="(p, i) in PAGES" :key="p.key" class="menu__link-mask">
            <NuxtLink
              :ref="(el) => setLinkEl(el, i)"
              :to="$localePath(p.to)"
              class="menu__link font-headline-1"
            >
              {{ $t(p.label) }}
            </NuxtLink>
          </span>
        </nav>

        <div class="menu__footer font-body-12 uppercase" data-menu-fade @click.capture="teardownNow">
          <NuxtLink :to="$localePath('/imprint')" class="menu__footer-link roll-trigger">
            <RollText :text="$t('nav.imprint')" />
          </NuxtLink>
          <NuxtLink :to="$localePath('/privacy')" class="menu__footer-link roll-trigger">
            <RollText :text="$t('nav.privacy')" />
          </NuxtLink>
          <LangSwitch class="menu__lang" />
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
// Wurzel ohne position/z-index: die Ebenen darunter teilen sich den
// Stapelkontext mit der (fixierten) aktuellen Seite.
.menu__backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  background-color: var(--color-backdrop);
}

.menu__window {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  z-index: 202;
  overflow: hidden;
  transform-origin: center center;
  clip-path: inset(0 calc(100% - var(--cut, 100%)) 0 0);
  visibility: hidden;
}

.menu__preview {
  position: absolute;
  inset: 0;

  // PageTitle ist sonst unsichtbar; Sichtbarkeit setzt die Animation
  :deep(.page-title) {
    z-index: 5;
  }
}

.menu__window-link {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--cut, 100%);
  z-index: 10;
  cursor: pointer;

  &:focus-visible {
    outline: 3px solid var(--focus-color);
    outline-offset: -6px;
  }
}

.menu__hit {
  position: fixed;
  z-index: 203;
  cursor: pointer;
}

.menu__ui {
  position: fixed;
  inset: 0;
  z-index: 203;
  display: flex;
  flex-direction: column;
  padding: var(--gutter);
  color: var(--color-main);
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
}

.menu__close {
  position: fixed;
  z-index: 203;
  top: var(--gutter);
  right: var(--gutter);
  cursor: pointer;
  visibility: hidden;
}

.menu__nav {
  visibility: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-top: calc(var(--windows-bottom) - var(--gutter) + 3.2rem);
}

.menu__link-mask {
  display: block;
  overflow: hidden;
}

.menu__link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.menu__footer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.6rem;
  margin-top: auto;
  visibility: hidden;
}

.menu__footer-link {
  overflow: hidden;
  display: inline-block;
}

.menu__lang {
  margin-left: auto;
}
</style>
