// Übergang Detailseite → nächstes Projekt (P21, docs/animationen-v2.md §4).
//
// Ablauf (Desktop, gesamt ≈ 2.6 s):
//   0–0.6 s  alte Seite blendet aus (alles außer Galerie + Next-Bereich);
//   0 s      sichtbare Galeriebilder werden nach oben weggeschnitten (1.2 s),
//            ihre Beschriftungen fallen;
//   0.2 s    „next case“ rollt nach oben weg (1.2 s);
//   1.2 s    Next-Bild fliegt als fixierter Klon in die Hero-Position der
//            neuen Seite (1.3 s, Ease morph);
//   1.38 s   Projekttitel fliegt als Klon an die Titelposition (1.18 s);
//   1.61 s   Meta-Zeile folgt (0.89 s).
// Mobil: Titelzeilen rollen nach oben weg statt zu fliegen, Bild-Flug gleich.
//
// Ablauf im Code: Klick auf CaseNext → startNextTransition() merkt Ziel und
// Scrollposition. Der Dispatcher in useWindowTransition ruft beim Seitenwechsel
// leaveCase() (alte Seite) bzw. prepareNextEnter() (neue Seite). Die neue Seite
// liegt darunter, Landeplätze (Hero-Bild, Titel, Meta) sind bis zur Landung
// verborgen (Klasse .is-next-entering, Stile in CaseHero.vue).
// Werte am Original gemessen (Zahlen, kein Code übernommen).
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getWindowTransitionLenis } from '~/composables/useWindowTransition'

gsap.registerPlugin(CustomEase, ScrollTrigger)

const FADE_DURATION = 0.6
const ERASE_DURATION = 1.2
const EYEBROW_AT = 0.2
const EYEBROW_DURATION = 1.2
const IMAGE_AT = 1.2
const IMAGE_DURATION = 1.3
const TITLE_AT = 1.38
const TITLE_DURATION = 1.18
const META_AT = 1.61
const META_DURATION = 0.89
// Alte Deckebene weg, sobald alles ausradiert ist (Eyebrow endet bei 1.4 s)
const COVER_OUT_AT = 1.4
const COVER_OUT_DURATION = 0.2
// Restlicher Hero-Inhalt der neuen Seite (Untertitel, Text) zum Schluss
const REST_IN_DURATION = 0.6
const CLONE_Z = 90 // unter dem Header (100), wie der Karten-Klon (P20)
const CLIP_OPEN = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
const CLIP_CLOSED = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'

interface PendingNext {
  slug: string
  link: HTMLElement // a.next der alten Seite
  scroll: number
}

let pending: PendingNext | null = null
let timeline: gsap.core.Timeline | null = null
let clones: HTMLElement[] = []
let enteringEl: HTMLElement | null = null

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const isMobile = () => window.matchMedia('(max-width: 1024px)').matches

function morphEase() {
  return CustomEase.get('reveal') ?? CustomEase.create('reveal', 'M0,0 C0.46,0 0.09,1 1,1')
}
function slowStartEase() {
  return CustomEase.get('introSlowStart') ?? CustomEase.create('introSlowStart', 'M0,0 C0.9,0 0.58,1 1,1')
}

/** Klick auf „next case“ (vor der Navigation). */
export function startNextTransition(link: HTMLElement, slug: string) {
  if (reducedMotion()) return
  finishNow()
  pending = { slug, link, scroll: window.scrollY }
  // Scroll-Effekte der alten Seite einfrieren: nach dem Wechsel springt das
  // Fenster auf 0, Parallax würde sonst mitspringen.
  const page = link.closest('main')
  if (page) {
    for (const t of ScrollTrigger.getAll()) {
      const trigger = t.trigger as Element | undefined
      if (trigger && page.contains(trigger)) t.disable(false)
    }
  }
}

/** true, wenn ein Next-Übergang aussteht (optional: dessen Link liegt in `el`). */
export function hasPendingNext(el?: Element) {
  return !!pending && (!el || el.contains(pending.link))
}

const lenisOf = () => getWindowTransitionLenis()

/** Klon eines Elements, fixiert an seiner aktuellen Bildschirmposition. */
function fixedClone(el: HTMLElement, text = false) {
  const rect = el.getBoundingClientRect()
  const clone = el.cloneNode(true) as HTMLElement
  clone.setAttribute('aria-hidden', 'true')
  clone.classList.add('next-transition-clone')
  Object.assign(clone.style, {
    position: 'fixed',
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: text ? 'auto' : `${rect.height}px`,
    margin: '0',
    transform: 'none',
    zIndex: String(CLONE_Z),
    pointerEvents: 'none',
  })
  document.body.appendChild(clone)
  clones.push(clone)
  return clone
}

function inView(el: Element) {
  const r = el.getBoundingClientRect()
  return r.bottom > 0 && r.top < window.innerHeight
}

/** Landeplätze der neuen Seite. */
function targets(page: HTMLElement | null) {
  const hero = page?.querySelector<HTMLElement>('.hero') ?? null
  return {
    image: hero?.querySelector<HTMLElement>('.right .image') ?? null,
    title: hero?.querySelector<HTMLElement>('.left .title-mask') ?? null,
    meta: hero?.querySelector<HTMLElement>('.left .content') ?? null,
  }
}

/** Neue Seite (onBeforeEnter): Landeplätze verbergen, bis die Klone ankommen. */
export function prepareNextEnter(el: Element) {
  enteringEl = el as HTMLElement
  enteringEl.classList.add('is-next-entering')
}

function showLanding(el: HTMLElement | null) {
  if (el) el.style.visibility = 'visible'
}

function finish() {
  const page = enteringEl
  clones.forEach((c) => c.remove())
  clones = []
  if (page) {
    page.classList.remove('is-next-entering')
    const hero = page.querySelector('.hero')
    const touched = hero?.querySelectorAll<HTMLElement>('.image, .title-mask, .content, .subtitle, .desc, .mob-content')
    touched?.forEach((el) => {
      el.style.removeProperty('visibility')
      el.style.removeProperty('opacity')
    })
  }
  enteringEl = null
  pending = null
  timeline = null
  lenisOf()?.start()
  ScrollTrigger.refresh()
}

/** Laufenden Übergang sofort beenden (neue Navigation, Abbruch). */
export function finishNow() {
  if (timeline) timeline.progress(1)
}

/** Alte Seite (onLeave). */
export function leaveCase(el: Element, done: () => void) {
  const page = el as HTMLElement
  const current = pending
  if (!current || !page.contains(current.link)) {
    done()
    return
  }
  const mobile = isMobile()
  lenisOf()?.stop()

  // Alte Seite als Ebene über der neuen einfrieren, Scrollposition behalten
  gsap.set(page, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100dvh',
    overflow: 'hidden',
    zIndex: 50,
    backgroundColor: 'var(--color-bg)',
    pointerEvents: 'none',
  })
  page.scrollTop = current.scroll

  const link = current.link
  const thumb = link.querySelector<HTMLElement>('.thumb')
  const eyebrow = link.querySelector<HTMLElement>('.eyebrow')
  const name = link.querySelector<HTMLElement>('.name')
  const meta = link.querySelector<HTMLElement>('.meta')

  // Klone vor dem Verbergen der Originale anlegen
  const thumbClone = thumb ? fixedClone(thumb) : null
  const thumbImg = thumbClone?.querySelector<HTMLElement>('.thumb__img') ?? null
  const nameClone = !mobile && name ? fixedClone(name, true) : null
  const metaClone = !mobile && meta ? fixedClone(meta, true) : null
  for (const orig of [thumb, !mobile ? name : null, !mobile ? meta : null]) {
    if (orig) orig.style.visibility = 'hidden'
  }

  const ease = slowStartEase()
  const morph = morphEase()
  const tl = gsap.timeline({ onComplete: finish })
  timeline = tl

  // 0–0.6 s: alles außer Galerie und Next-Bereich blendet aus
  const others = Array.from(page.children).filter(
    (c) => !c.classList.contains('gallery') && c !== link,
  )
  tl.to(others, { autoAlpha: 0, duration: FADE_DURATION, ease: 'none' }, 0)

  // Galerie: sichtbare Bilder nach oben wegschneiden, Beschriftungen fallen
  const gallery = page.querySelector<HTMLElement>('.gallery')
  if (gallery) {
    const images = Array.from(gallery.querySelectorAll<HTMLElement>('[data-reveal="image"]')).filter(inView)
    if (images.length) {
      tl.fromTo(images, { clipPath: CLIP_OPEN }, { clipPath: CLIP_CLOSED, duration: ERASE_DURATION, ease }, 0)
    }
    const labels = Array.from(gallery.querySelectorAll<HTMLElement>('.label')).filter(inView)
    if (labels.length) tl.to(labels, { yPercent: 100, duration: ERASE_DURATION, ease }, 0)
    const rest = Array.from(gallery.querySelectorAll<HTMLElement>('.credit, .ui-todo')).filter(inView)
    if (rest.length) tl.to(rest, { autoAlpha: 0, duration: FADE_DURATION, ease: 'none' }, 0)
  }

  // „next case“ rollt nach oben weg; mobil auch Titel, Meta blendet aus
  if (eyebrow) tl.to(eyebrow, { yPercent: -100, duration: EYEBROW_DURATION, ease }, EYEBROW_AT)
  if (mobile) {
    if (name) tl.to(name, { yPercent: -100, duration: EYEBROW_DURATION, ease }, EYEBROW_AT)
    if (meta) tl.to(meta, { autoAlpha: 0, duration: FADE_DURATION, ease: 'none' }, EYEBROW_AT)
  }

  // Deckebene weg: darunter liegt die neue Seite mit verborgenen Landeplätzen
  tl.to(page, { autoAlpha: 0, duration: COVER_OUT_DURATION, ease: 'none' }, COVER_OUT_AT)
  tl.call(() => done(), [], COVER_OUT_AT + COVER_OUT_DURATION)

  // Flüge: Ziele erst messen, wenn sie gebraucht werden (neue Seite ist dann sicher gerendert)
  const fly = (clone: HTMLElement | null, key: 'image' | 'title' | 'meta', at: number, duration: number, extra?: (t: gsap.core.Timeline) => void) => {
    if (!clone) return
    tl.add(() => {
      const target = targets(enteringEl)[key]
      if (!target) return
      const r = target.getBoundingClientRect()
      const sub = gsap.timeline()
      // Bild: auf Hero-Größe; Text: Breite der Zielspalte, damit der Titel dort umbricht wie am Ziel
      const size = key === 'image' ? { width: r.width, height: r.height } : { width: r.width }
      sub.to(clone, { left: r.left, top: r.top, ...size, duration, ease: morph, autoRound: false }, 0)
      extra?.(sub)
      sub.call(() => {
        showLanding(target)
        clone.style.visibility = 'hidden'
      })
      tl.add(sub, at)
    }, at)
  }
  fly(thumbClone, 'image', IMAGE_AT, IMAGE_DURATION, (sub) => {
    if (thumbImg) sub.to(thumbImg, { scale: 1, duration: IMAGE_DURATION, ease: morph }, 0)
  })
  fly(nameClone, 'title', TITLE_AT, TITLE_DURATION)
  fly(metaClone, 'meta', META_AT, META_DURATION, (sub) => {
    sub.to(metaClone, { autoAlpha: 0, duration: 0.3, ease: 'none' }, META_DURATION - 0.3)
  })

  // Zum Schluss: restlicher Hero-Inhalt der neuen Seite
  const restAt = Math.max(IMAGE_AT + IMAGE_DURATION, TITLE_AT + TITLE_DURATION) - REST_IN_DURATION
  tl.add(() => {
    const rest = enteringEl?.querySelectorAll<HTMLElement>('.hero .subtitle, .hero .desc, .hero .mob-content')
    if (rest?.length) tl.add(gsap.from(rest, { autoAlpha: 0, duration: REST_IN_DURATION, ease: 'none' }), restAt) // from: CSS-Deckkraft (Untertitel 0.7) bleibt Ziel
    // Mobil: neuer Titel rollt ein (statt Titel-Flug)
    const mobTitle = mobile ? enteringEl?.querySelector<HTMLElement>('.hero .mob-content .title') : null
    if (mobTitle) tl.add(gsap.fromTo(mobTitle, { yPercent: 100 }, { yPercent: 0, duration: EYEBROW_DURATION, ease: morph }), restAt)
  }, restAt)
  // Timeline-Ende = letzter Flug
  tl.to({}, { duration: 0.01 }, Math.max(IMAGE_AT + IMAGE_DURATION, TITLE_AT + TITLE_DURATION, META_AT + META_DURATION))
}
