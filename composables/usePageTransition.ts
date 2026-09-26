// Seitenübergang Karte → Detail-Hero (P8/P20, Spezifikation §4 „Seitenübergang“
// bzw. docs/animationen-v2.md §3 „Klick Karte → Detailseite“).
//
// Ablauf, zwei Phasen (gesamt ≈ 2.5 s):
// 1. Klick auf eine Karte (startCardTransition): Das Kartenbild wird geklont und
//    position:fixed exakt über das Original gelegt; ein Video läuft im Klon ab
//    derselben currentTime weiter (D-015). Danach navigiert der NuxtLink normal.
// 2. Die Startseite deklariert eine Page-Transition im Modus „default“ (beide
//    Seiten gleichzeitig im DOM). leavePage() fixiert die Startseite als Ebene
//    über der neuen Seite: Phase 1 (0–1.27 s, PHASE1_DURATION) lässt die übrigen
//    Karten wegschrumpfen (Medien-Zoom, Bild nach oben weggeschnitten, Name fällt),
//    gestaffelt nach Kartenabstand zur geklickten Karte; deren eigener Name fällt
//    sofort (Distanz 0/1 → Offset 0 s).
// 3. Die neue Seite ist darunter bereits gerendert: useHeroTransition() misst
//    den Hero-Container, wartet auf das Ende von Phase 1 (pending.phase1) und
//    morpht danach den Klon dorthin (Phase 2, FLIP, MORPH_DURATION). Am Ende wird
//    das Hero-Video auf die Zeit des Klons gesetzt und der Klon entfernt.
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import type { Ref } from 'vue'

gsap.registerPlugin(CustomEase)

const MORPH_DURATION = 1.26 // Phase 2 (§3)
const PHASE1_DURATION = 1.27 // Phase 1 (§3)
const PHASE1_MIN_DURATION = 0.2 // Untergrenze je Karte, falls der Offset sonst über PHASE1_DURATION hinausliefe
// Offset je Kartenabstand zur geklickten Karte (§3): 1→0s, 2→0.33s, 3→0.56s, danach +0.23s/Position
const PHASE1_OFFSETS = [0, 0, 0.33, 0.56]
const PHASE1_OFFSET_STEP = 0.23
const LEAVE_SCALE = 0.7 // Ursprung 50% 40% (§3)
const LEAVE_MEDIA_SCALE = 1.4
const LEAVE_ORIGIN = '50% 40%'
const MEDIA_SCALE_FROM = 1.15 // CSS-Ruhezustand der Kartenmedien
const CLONE_Z = 90 // unter dem Header (100), über allem anderen
// Bild "nach oben weggeschnitten" (§3): gleiche Polygone wie useGalleryIntro.ts,
// nur in umgekehrter Richtung (offen → zu einer Linie oben kollabiert).
const CLIP_OPEN = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
const CLIP_CLOSED = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'

interface Pending {
  slug: string
  source: HTMLElement // .gallery-item des Originals
  clone: HTMLElement
  media: HTMLElement | null
  video: HTMLVideoElement | null
  /** Löst, sobald Phase 1 (die übrigen Karten) fertig ist – Phase 2 (Morph) wartet darauf. */
  phase1: Promise<void>
  resolvePhase1: () => void
}

let pending: Pending | null = null

// Spezifikation „reveal / morph“ (animationen-v2, Ease-Tabelle; P24, D-037)
function morphEase() {
  return CustomEase.get('cardMorph') ?? CustomEase.create('cardMorph', 'M0,0 C0.46,0 0.09,1 1,1')
}

// Dieselbe Ease wie das Intro (docs/animationen-v2.md, Ease-Tabelle „slowStart“) –
// get-or-create, damit sie nicht doppelt unter anderem Namen angelegt wird.
function slowStartEase() {
  return CustomEase.get('introSlowStart') ?? CustomEase.create('introSlowStart', 'M0,0 C0.9,0 0.58,1 1,1')
}

/** Offset (s) für einen Kartenabstand `d` (§3); für d>3 in PHASE1_OFFSET_STEP-Schritten weiter gestaffelt. */
function staggerOffset(distance: number) {
  const d = Math.max(0, distance)
  const raw = d <= 3 ? PHASE1_OFFSETS[d]! : PHASE1_OFFSETS[3]! + (d - 3) * PHASE1_OFFSET_STEP
  return Math.min(raw, PHASE1_DURATION - PHASE1_MIN_DURATION)
}

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function cleanup() {
  if (!pending) return
  pending.clone.remove()
  pending = null
}

/** Aktuelles Videobild als Canvas (deckt den Klon ab, solange dessen Video lädt). */
function snapshot(video: HTMLVideoElement): HTMLCanvasElement | null {
  if (!video.videoWidth || video.readyState < 2) return null
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  try {
    canvas.getContext('2d')?.drawImage(video, 0, 0)
  } catch {
    return null
  }
  Object.assign(canvas.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none',
  })
  return canvas
}

/** Schritt 1 – vom Klick-Handler der Galerie aufgerufen (vor der Navigation). */
export function startCardTransition(item: HTMLElement) {
  const slug = item.dataset.slug
  const img = item.querySelector<HTMLElement>('.gallery-item__img')
  if (!slug || !img || reducedMotion()) return
  cleanup()

  const rect = img.getBoundingClientRect()
  const clone = img.cloneNode(true) as HTMLElement
  clone.classList.add('page-transition-clone')
  clone.setAttribute('aria-hidden', 'true')
  Object.assign(clone.style, {
    position: 'fixed',
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    aspectRatio: 'auto',
    margin: '0',
    zIndex: String(CLONE_Z),
    pointerEvents: 'none',
  })

  // Video nahtlos weiterlaufen lassen
  const originalVideo = img.querySelector<HTMLVideoElement>('video')
  const video = clone.querySelector<HTMLVideoElement>('video')
  if (originalVideo && video) {
    // Der geklonte <video> muss erst laden und zeigt bis dahin sein Poster –
    // ein Sprung vom laufenden Bild zurück zum Standbild. Das aktuelle Bild
    // liegt deshalb als Canvas darüber, bis der Klon wirklich läuft (D-045).
    const still = snapshot(originalVideo)
    if (still) {
      video.after(still)
      const drop = () => still.remove()
      video.addEventListener('playing', drop, { once: true })
      window.setTimeout(drop, 1500)
    }
    video.muted = true
    video.currentTime = originalVideo.currentTime
    video.play().catch(() => undefined)
  }

  document.body.appendChild(clone)
  img.style.visibility = 'hidden'

  // Phase 2 (Morph) wartet auf das Ende von Phase 1 (§3). Fallback-Timer, falls
  // leavePage() aus irgendeinem Grund nie läuft (kein Leave-Hook, andere Route) –
  // ansonsten würde useHeroTransition ewig auf den Morph-Start warten.
  let resolvePhase1: () => void = () => undefined
  const phase1 = new Promise<void>((resolve) => {
    resolvePhase1 = resolve
  })
  const fallback = window.setTimeout(resolvePhase1, (PHASE1_DURATION + 0.5) * 1000)
  phase1.then(() => window.clearTimeout(fallback))

  pending = {
    slug,
    source: item,
    clone,
    media: clone.querySelector<HTMLElement>('.gallery-item__media'),
    video,
    phase1,
    resolvePhase1,
  }
}

/** true, wenn ein Karten-Übergang aussteht (optional: dessen Karte liegt in `el`). */
export function hasPendingCard(el?: Element) {
  return !!pending && (!el || el.contains(pending.source))
}

/**
 * Schritt 2 – onLeave der Page-Transition der Startseite. Ohne laufenden
 * Kartenübergang verschwindet die alte Seite sofort.
 */
export function leavePage(el: Element, done: () => void) {
  const page = el as HTMLElement
  if (!pending || !page.contains(pending.source)) {
    pending?.resolvePhase1()
    done()
    return
  }
  const current = pending

  // Alte Seite als Ebene über der neuen fixieren
  Object.assign(page.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '50',
    background: 'var(--color-bg)',
    pointerEvents: 'none',
  })

  const allItems = Array.from(page.querySelectorAll<HTMLElement>('.gallery-item'))
  // Abstand nach sichtbarer Reihenfolge, nicht DOM-Index: der Endlos-Slider
  // verschiebt Karten per translateX, die DOM-Nachbarn liegen nicht unbedingt
  // nebeneinander (D-030).
  const lefts = new Map(allItems.map((i) => [i, i.getBoundingClientRect().left]))
  const visualOrder = [...allItems].sort((a, b) => lefts.get(a)! - lefts.get(b)!)
  const rank = new Map(visualOrder.map((i, r) => [i, r]))
  const clickedIndex = rank.get(current.source)!
  const ease = slowStartEase()

  const tl = gsap.timeline({ onComplete: done })
  // Phase 2 (Morph) darf erst beginnen, wenn Phase 1 durch ist (§3) – unabhängig
  // vom anschließenden Ausblenden der Deckebene weiter unten.
  tl.call(() => current.resolvePhase1(), [], PHASE1_DURATION)

  // Phase 1 (§3): je Karte einzeln gestaffelt nach Abstand zur geklickten Karte,
  // alle enden gemeinsam bei PHASE1_DURATION.
  allItems.forEach((item) => {
    const distance = Math.abs(rank.get(item)! - clickedIndex)
    const offset = staggerOffset(distance)
    const duration = PHASE1_DURATION - offset
    const isClicked = item === current.source

    // Name fällt auf jeder Karte, auch der geklickten (Distanz 0 → Offset 0).
    const name = item.querySelector<HTMLElement>('.gallery-item__name-wrapper > *')
    if (name) tl.to(name, { yPercent: 100, duration, ease }, offset)

    if (isClicked) return // Bild/Medium der geklickten Karte: siehe Klon (Phase 2)

    const stage = item.querySelector<HTMLElement>('.gallery-item__stage')
    const media = item.querySelector<HTMLElement>('.gallery-item__media')
    const img = item.querySelector<HTMLElement>('.gallery-item__img')

    if (stage) {
      tl.to(stage, { scale: LEAVE_SCALE, transformOrigin: LEAVE_ORIGIN, duration, ease }, offset)
    }
    if (media) {
      tl.to(media, { scale: LEAVE_MEDIA_SCALE, duration, ease }, offset)
    }
    if (img) {
      // Startwert explizit: von clip-path „none“ kann GSAP nicht interpolieren
      tl.fromTo(img, { clipPath: CLIP_OPEN }, { clipPath: CLIP_CLOSED, duration, ease }, offset)
    }
  })

  // Zum Schluss die Deckebene ausblenden, darunter liegt die neue Seite (Phase 2 läuft dort schon)
  tl.to(page, { autoAlpha: 0, duration: 0.3, ease: 'none' }, PHASE1_DURATION - 0.2)
}

/**
 * Schritt 3 – im Hero der Case-Seite. `target` ist der Hero-Mediencontainer.
 * Liefert true, wenn ein Übergang läuft (Hero ist dann bis zum Ende verborgen).
 */
export function useHeroTransition(target: Ref<HTMLElement | null>, slug: string) {
  let tween: gsap.core.Timeline | null = null
  let cancelled = false

  onMounted(() => {
    const el = target.value
    if (!el || !pending || pending.slug !== slug) {
      cleanup()
      return
    }
    const { clone, media, video, phase1 } = pending
    el.style.visibility = 'hidden'
    // Sofort messen (Layout steht bereits); der Morph selbst startet erst nach Phase 1 (§3).
    const to = el.getBoundingClientRect()
    const heroVideo = el.querySelector<HTMLVideoElement>('video')

    phase1.then(() => {
      if (cancelled || !pending || pending.clone !== clone) return // inzwischen unmounted/aufgeräumt
      tween = gsap.timeline({
        onComplete: () => finish(el, heroVideo, video),
      })
      tween.to(
        clone,
        {
          left: to.left,
          top: to.top,
          width: to.width,
          height: to.height,
          duration: MORPH_DURATION,
          ease: morphEase(),
          // GSAP rundet px-Werte sonst auf ganze Pixel: Der Klon springt im
          // ersten Frame von z. B. 379.2 auf 379 und wächst dann stufig – das
          // sichtbare Zucken vor dem Morph (D-045).
          autoRound: false,
        },
        0,
      )
      if (media) {
        tween.fromTo(media, { scale: MEDIA_SCALE_FROM }, { scale: 1, duration: MORPH_DURATION, ease: morphEase() }, 0)
      }
    })
  })

  onBeforeUnmount(() => {
    cancelled = true
    tween?.kill()
    tween = null
    cleanup()
  })
}

function finish(hero: HTMLElement, heroVideo: HTMLVideoElement | null, cloneVideo: HTMLVideoElement | null) {
  const reveal = () => {
    hero.style.removeProperty('visibility')
    // Einen Frame warten, damit das Hero-Medium sicher gezeichnet ist
    requestAnimationFrame(() => cleanup())
  }
  if (!heroVideo || !cloneVideo) return reveal()

  // Hero-Video auf die Zeit des Klons setzen, erst nach dem Seek tauschen
  const time = cloneVideo.currentTime
  let done = false
  const once = () => {
    if (done) return
    done = true
    heroVideo.play().catch(() => undefined)
    reveal()
  }
  heroVideo.addEventListener('seeked', once, { once: true })
  setTimeout(once, 300)
  heroVideo.currentTime = time
}
