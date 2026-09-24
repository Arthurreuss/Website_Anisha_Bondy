// Seitenübergang Karte → Detail-Hero (P8, Spezifikation §4 „Seitenübergang“).
//
// Ablauf:
// 1. Klick auf eine Karte (startCardTransition): Das Kartenbild wird geklont und
//    position:fixed exakt über das Original gelegt; ein Video läuft im Klon ab
//    derselben currentTime weiter. Danach navigiert der NuxtLink normal.
// 2. Die Startseite deklariert eine Page-Transition im Modus „default“ (beide
//    Seiten gleichzeitig im DOM). leavePage() fixiert die Startseite als Ebene
//    über der neuen Seite und lässt die übrigen Karten wegschrumpfen.
// 3. Die neue Seite ist darunter bereits gerendert: useHeroTransition() misst
//    den Hero-Container und morpht den Klon dorthin (FLIP). Am Ende wird das
//    Hero-Video auf die Zeit des Klons gesetzt und der Klon entfernt.
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import type { Ref } from 'vue'

gsap.registerPlugin(CustomEase)

const MORPH_DURATION = 1.26
const LEAVE_DURATION = 0.9
const MEDIA_SCALE_FROM = 1.15 // CSS-Ruhezustand der Kartenmedien
const CLONE_Z = 90 // unter dem Header (100), über allem anderen

interface Pending {
  slug: string
  source: HTMLElement // .gallery-item des Originals
  clone: HTMLElement
  media: HTMLElement | null
  video: HTMLVideoElement | null
}

let pending: Pending | null = null

function morphEase() {
  return CustomEase.get('cardMorph') ?? CustomEase.create('cardMorph', 'M0,0 C0.76,0 0.18,1 1,1')
}

function softEase() {
  return CustomEase.get('introSoft') ?? CustomEase.create('introSoft', 'M0,0 C0.46,0 0.09,1 1,1')
}

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function cleanup() {
  if (!pending) return
  pending.clone.remove()
  pending = null
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
    video.muted = true
    video.currentTime = originalVideo.currentTime
    video.play().catch(() => undefined)
  }

  document.body.appendChild(clone)
  img.style.visibility = 'hidden'

  pending = {
    slug,
    source: item,
    clone,
    media: clone.querySelector<HTMLElement>('.gallery-item__media'),
    video,
  }
}

/**
 * Schritt 2 – onLeave der Page-Transition der Startseite. Ohne laufenden
 * Kartenübergang verschwindet die alte Seite sofort.
 */
export function leavePage(el: Element, done: () => void) {
  const page = el as HTMLElement
  if (!pending || !page.contains(pending.source)) {
    done()
    return
  }

  // Alte Seite als Ebene über der neuen fixieren
  Object.assign(page.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '50',
    background: 'var(--color-bg)',
    pointerEvents: 'none',
  })

  const others = Array.from(page.querySelectorAll<HTMLElement>('.gallery-item')).filter((i) => i !== pending!.source)
  const q = (sel: string, list = others) =>
    list.map((i) => i.querySelector<HTMLElement>(sel)).filter((n): n is HTMLElement => !!n)
  const ease = softEase()

  const tl = gsap.timeline({ onComplete: done })
  tl.to(q('.gallery-item__stage'), { scale: 0.7, duration: LEAVE_DURATION, ease }, 0)
  tl.to(q('.gallery-item__media'), { scale: 1.4, duration: LEAVE_DURATION, ease }, 0)
  // Startwert explizit: von clip-path „none“ kann GSAP nicht interpolieren
  tl.fromTo(
    q('.gallery-item__img'),
    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', duration: LEAVE_DURATION, ease },
    0,
  )
  tl.to(
    q('.gallery-item__name-wrapper > *', [...others, pending.source]),
    { yPercent: 100, duration: 0.5, ease: 'power2.in' },
    0,
  )
  // Zum Schluss die Deckebene ausblenden, darunter liegt die neue Seite
  tl.to(page, { autoAlpha: 0, duration: 0.3, ease: 'none' }, LEAVE_DURATION - 0.2)
}

/**
 * Schritt 3 – im Hero der Case-Seite. `target` ist der Hero-Mediencontainer.
 * Liefert true, wenn ein Übergang läuft (Hero ist dann bis zum Ende verborgen).
 */
export function useHeroTransition(target: Ref<HTMLElement | null>, slug: string) {
  let tween: gsap.core.Timeline | null = null

  onMounted(() => {
    const el = target.value
    if (!el || !pending || pending.slug !== slug) {
      cleanup()
      return
    }
    const { clone, media, video } = pending
    el.style.visibility = 'hidden'
    const to = el.getBoundingClientRect()
    const heroVideo = el.querySelector<HTMLVideoElement>('video')

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
      },
      0,
    )
    if (media) {
      tween.fromTo(media, { scale: MEDIA_SCALE_FROM }, { scale: 1, duration: MORPH_DURATION, ease: morphEase() }, 0)
    }
  })

  onBeforeUnmount(() => {
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
