// Seitenübergang „Fenster“ (P22, docs/animationen-v2.md §5, D-025).
//
// Ein Hook-Satz für ALLE Seitenwechsel (app.vue: <NuxtPage :transition>), der
// je Wechsel entscheidet:
//   - Karte → Detail (Klick in der Galerie, P20): Leave-Logik aus
//     usePageTransition (leavePage), die neue Seite erscheint sofort darunter.
//   - „next case“-Klick (P21): useNextTransition (leaveCase/prepareNextEnter).
//   - Klick auf ein Menü-Fenster (P23): schon animiert, kein Übergang.
//   - gleiche Seite in anderer Sprache / sonstiges Case → Case: kein Übergang.
//   - alles andere: Fenster-Übergang.
//
// Fenster-Übergang (gesamt ≈ 2.7 s, Ease pageSpread):
//   Phase 1 (1.3 s): alte Seite schrumpft (0.75, mobil 0.6), wird auf ein
//     Fenster zugeschnitten (--cut 37.4 %, mobil kein Schnitt) und rückt zur
//     Seite; die neue Seite kommt als gleich kleines Fenster herein. Auf jedem
//     Fenster rollt der große Seitentitel (PageTitle.vue) ein.
//   Phase 2 (nach 0.1 s, zurück 0.367 s, mobil 0 s; 1.3 s): neues Fenster
//     zoomt auf Vollbild, Titel rollt weg; alte Seite fährt hinaus (×1.15).
//   Richtung: vorwärts von rechts, zurück (zur Startseite) von links.
// Die Werte sind am Original gemessen (Zahlen, kein Code übernommen).
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { RouteLocationNormalized } from 'vue-router'
import { hasPendingCard, leavePage } from '~/composables/usePageTransition'
import { finishNow as finishNextNow, hasPendingNext, leaveCase, prepareNextEnter } from '~/composables/useNextTransition'

gsap.registerPlugin(CustomEase, ScrollTrigger)

const PHASE_DURATION = 1.3
const TITLE_OUT_DURATION = 1.2
const SCALE = 0.75
const SCALE_MOBILE = 0.6
const CUT = '37.4%'
const CUT_FULL = '100%'
const EXIT_SCALE = 1.15
const EXIT_SCALE_MOBILE = 0.85 / SCALE_MOBILE
// xPercent der Fenster nach Phase 1 (Desktop): links / rechts
const X_LEFT = 7.5
const X_RIGHT = 39.75
// Mobil: altes Fenster seitlich, neues mittig; Einflug-/Ausflugweg
const X_MOBILE_OLD = 67.6
const X_MOBILE_ENTER = 123.88
const X_MOBILE_EXIT = 63.04
const PHASE2_DELAY = 0.1
const PHASE2_DELAY_BACK = 0.367
const PHASE2_NEW_LAG_BACK = 0.069
// Falls eine Seite des Wechsels ausbleibt, nicht ewig warten
const PAIR_TIMEOUT = 600

type Direction = 'forward' | 'back'

let candidate = false // vom Router: Wechsel darf ein Fenster-Übergang werden
let direction: Direction = 'forward'
let leaveScroll = 0

let oldEl: HTMLElement | null = null
let oldDone: (() => void) | null = null
let newEl: HTMLElement | null = null
let newDone: (() => void) | null = null
let pairTimer: number | null = null
let timeline: gsap.core.Timeline | null = null

// Lenis kommt vom Plugin (Hooks laufen außerhalb eines Setup-Kontexts)
interface LenisLike {
  stop: () => void
  start: () => void
  scrollTo: (target: number, options?: { immediate?: boolean; force?: boolean }) => void
}
let lenis: LenisLike | null = null
export function setWindowTransitionLenis(value: LenisLike | null) {
  lenis = value
}
export function getWindowTransitionLenis() {
  return lenis
}

let suppressNext = false
/** Nächsten Wechsel ohne Fenster-Übergang (Menü P23 hat ihn selbst animiert). */
export function suppressWindowTransition() {
  suppressNext = true
}

export function pageSpread() {
  return CustomEase.get('pageSpread') ?? CustomEase.create('pageSpread', 'M0,0 C0.46,0 0.09,0.99 1,1')
}

const baseName = (route: RouteLocationNormalized) => String(route.name ?? route.path).split('___')[0]
const isMobile = () => window.matchMedia('(max-width: 767px)').matches
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Router (beforeEach): Richtung, Scrollposition und Art des Wechsels festhalten. */
export function prepareWindowTransition(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  finishNextNow() // laufenden Next-Übergang (P21) abschließen
  const initial = !from.matched.length
  const samePage = baseName(to) === baseName(from)
  candidate = !initial && !samePage && !reducedMotion() && !suppressNext
  suppressNext = false
  direction = baseName(to) === 'index' ? 'back' : 'forward'
  leaveScroll = window.scrollY
}

/** true, solange der aktuelle Wechsel ein Fenster-Übergang werden kann (Lenis: nicht sofort nach oben springen). */
export function isWindowTransitionCandidate() {
  return candidate && !hasPendingCard()
}

function fixPage(el: HTMLElement, zIndex: number) {
  gsap.set(el, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100dvh',
    overflow: 'hidden',
    zIndex,
    backgroundColor: 'var(--color-bg)',
    transformOrigin: 'center center',
    pointerEvents: 'none',
    '--cut': CUT_FULL,
    clipPath: 'inset(0 calc(100% - var(--cut)) 0 0)',
  })
}

function titleParts(el: HTMLElement) {
  const title = el.querySelector<HTMLElement>('.page-title')
  const text = title?.querySelector<HTMLElement>('.page-title__text') ?? null
  return title && text ? { title, text } : null
}

function reset() {
  if (pairTimer !== null) window.clearTimeout(pairTimer)
  pairTimer = null
  oldEl = newEl = null
  oldDone = newDone = null
  timeline = null
  candidate = false
  document.documentElement.classList.remove('is-window-transition')
}

function finish() {
  const doneOld = oldDone
  const doneNew = newDone
  if (newEl) {
    const parts = titleParts(newEl)
    if (parts) gsap.set([parts.title, parts.text], { clearProps: 'all' })
    gsap.set(newEl, { clearProps: 'all' })
    newEl.style.removeProperty('--cut')
  }
  window.scrollTo(0, 0)
  lenis?.scrollTo(0, { immediate: true, force: true })
  lenis?.start()
  reset()
  doneOld?.()
  doneNew?.()
  ScrollTrigger.refresh()
}

async function start() {
  if (pairTimer !== null) window.clearTimeout(pairTimer)
  pairTimer = null
  const from = oldEl!
  const to = newEl!
  // Neue Seite einmal layouten lassen (Bilder/Schriften, Titel messen)
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
  if (from !== oldEl || to !== newEl) return // inzwischen abgebrochen

  const mobile = isMobile()
  const back = direction === 'back'
  const ease = pageSpread()
  const scale = mobile ? SCALE_MOBILE : SCALE
  const cut = mobile ? CUT_FULL : CUT
  const oldX = mobile ? (back ? 1 : -1) * X_MOBILE_OLD : back ? X_RIGHT : X_LEFT
  const newX = mobile ? 0 : back ? X_LEFT : X_RIGHT

  const tl = gsap.timeline({ onComplete: finish })
  timeline = tl

  // Phase 1
  tl.to(from, { scale, xPercent: oldX, '--cut': cut, duration: PHASE_DURATION, ease }, 0)
  // Rückwärts: neues Fenster kommt schon zugeschnitten herein; vorwärts wird es beim Hereinfahren zugeschnitten
  if (back) gsap.set(to, { '--cut': cut })
  tl.to(to, { scale, xPercent: newX, ...(back ? {} : { '--cut': cut }), duration: PHASE_DURATION, ease }, 0)
  for (const el of [from, to]) {
    const parts = titleParts(el)
    if (!parts) continue
    // Titel sitzt oben in der Seite: bei gescrollter alter Seite mitverschieben
    gsap.set(parts.title, { autoAlpha: 1, y: el.scrollTop })
    tl.fromTo(parts.text, { yPercent: 100 }, { yPercent: 0, duration: PHASE_DURATION, ease }, 0)
  }

  // Phase 2
  const phase2 = PHASE_DURATION + (mobile ? 0 : back ? PHASE2_DELAY_BACK : PHASE2_DELAY)
  const exitTravel = mobile ? X_MOBILE_EXIT : 100
  const exitScale = scale * (mobile ? EXIT_SCALE_MOBILE : EXIT_SCALE)
  tl.to(from, { xPercent: `${back ? '+' : '-'}=${exitTravel}`, scale: exitScale, duration: PHASE_DURATION, ease }, phase2)
  const newAt = phase2 + (back && !mobile ? PHASE2_NEW_LAG_BACK : 0)
  tl.to(to, { xPercent: 0, scale: 1, '--cut': CUT_FULL, duration: PHASE_DURATION, ease }, newAt)
  const newTitle = titleParts(to)
  if (newTitle) tl.to(newTitle.text, { yPercent: 100, duration: TITLE_OUT_DURATION, ease }, newAt)
}

function tryStart() {
  if (oldEl && newEl) {
    start()
    return
  }
  // Nur eine Seite da: kurz warten, sonst ohne Übergang abschließen
  if (pairTimer === null) {
    pairTimer = window.setTimeout(() => {
      pairTimer = null
      if (!(oldEl && newEl)) finish()
    }, PAIR_TIMEOUT)
  }
}

const isWindow = () => candidate && !hasPendingCard()

/** Transition-Props für <NuxtPage :transition>. */
export const windowPageTransition = {
  name: 'window',
  mode: 'default' as const,
  css: false,

  onLeave(el: Element, done: () => void) {
    if (hasPendingNext(el)) return leaveCase(el, done)
    if (hasPendingCard(el)) return leavePage(el, done)
    if (!isWindow()) return done()
    const page = el as HTMLElement
    lenis?.stop()
    document.documentElement.classList.add('is-window-transition')
    fixPage(page, 1)
    page.scrollTop = leaveScroll
    oldEl = page
    oldDone = done
    tryStart()
  },

  onBeforeEnter(el: Element) {
    if (hasPendingNext()) return prepareNextEnter(el)
    if (!isWindow()) return
    const page = el as HTMLElement
    fixPage(page, 2)
    gsap.set(page, { xPercent: (direction === 'back' ? -1 : 1) * (isMobile() ? X_MOBILE_ENTER : 100) })
  },

  onEnter(el: Element, done: () => void) {
    if (!isWindow()) return done()
    newEl = el as HTMLElement
    newDone = done
    tryStart()
  },

  onLeaveCancelled() {
    timeline?.progress(1)
  },
  onEnterCancelled() {
    timeline?.progress(1)
  },
}
