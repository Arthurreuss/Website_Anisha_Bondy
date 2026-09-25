// Hover-Anheben von Karte + Bild (P19, Spezifikation §2 in animationen-v2.md).
//
// Nur Desktop mit echter Maus: Karte y -8px, das Bild darin gegenläufig y +4px,
// je 0.6s power2.out; zurück auf 0 beim Verlassen. Ein Klick lässt die Karte in
// eigener Dauer/Ease auf y 0 zurückfallen und sperrt danach weitere Hover-Resets
// (data-clicked), bis die Seite neu gemountet wird.
//
// Bewusst per natives mouseenter/mouseleave je gebundenem Element statt
// Event-Delegation: die Startseite hat wenige, statisch gerenderte Karten
// (kein dynamisches Hinzufügen/Entfernen), das hält den Code einfach.
import { gsap } from 'gsap'

export interface HoverLiftBindExtra {
  /** Zusätzliche Tween-Werte fürs Bild beim Hover-Enter (z. B. eine Zoom-Stufe). */
  enter?: gsap.TweenVars
  /** Zusätzliche Tween-Werte fürs Bild beim Hover-Leave. */
  leave?: gsap.TweenVars
}

export interface UseHoverLiftOptions {
  /** matchMedia-Query, die Desktop + echte Maus + reduced-motion abdeckt. */
  query?: string
  cardY?: number
  mediaY?: number
  duration?: number
  /** true = Hover-Lift unterdrücken (z. B. Intro läuft noch, oder es wird gerade gezogen). */
  isDisabled?: () => boolean
}

interface BoundEntry {
  media: HTMLElement
  onEnter: () => void
  onLeave: () => void
  extra?: HoverLiftBindExtra
}

const DEFAULT_QUERY =
  '(hover: hover) and (pointer: fine) and (min-width: 1025px) and (prefers-reduced-motion: no-preference)'

export function useHoverLift(options: UseHoverLiftOptions = {}) {
  const {
    query = DEFAULT_QUERY,
    cardY = -8,
    mediaY = 4,
    duration = 0.6,
    isDisabled = () => false,
  } = options

  let mm: gsap.MatchMedia | null = null
  let active = false
  const bound = new Map<HTMLElement, BoundEntry>()

  function enter(card: HTMLElement, media: HTMLElement, extra?: gsap.TweenVars) {
    if (!active || isDisabled() || card.dataset.clicked === 'true') return
    gsap.to(card, { y: cardY, duration, ease: 'power2.out', overwrite: 'auto' })
    gsap.to(media, { y: mediaY, ...extra, duration, ease: 'power2.out', overwrite: 'auto' })
  }

  function leave(card: HTMLElement, media: HTMLElement, extra?: gsap.TweenVars) {
    if (card.dataset.clicked === 'true') return
    gsap.to(card, { y: 0, duration, ease: 'power2.out', overwrite: 'auto' })
    gsap.to(media, { y: 0, ...extra, duration, ease: 'power2.out', overwrite: 'auto' })
  }

  /** Karte + Bild an den Hover-Lift binden. `extra` erlaubt z. B. einen Zoom am Bild. */
  function add(card: HTMLElement, media: HTMLElement, extra?: HoverLiftBindExtra) {
    if (bound.has(card)) return
    const onEnter = () => enter(card, media, extra?.enter)
    const onLeave = () => leave(card, media, extra?.leave)
    card.addEventListener('mouseenter', onEnter)
    card.addEventListener('mouseleave', onLeave)
    bound.set(card, { media, onEnter, onLeave, extra })
  }

  function removeAll() {
    bound.forEach(({ onEnter, onLeave }, card) => {
      card.removeEventListener('mouseenter', onEnter)
      card.removeEventListener('mouseleave', onLeave)
    })
    bound.clear()
  }

  /** Sofort auf 0 zurücksetzen, z. B. bei Drag-Beginn – kein data-clicked, Hover bleibt danach möglich. */
  function resetAll() {
    bound.forEach(({ media, extra }, card) => {
      if (card.dataset.clicked === 'true') return
      gsap.killTweensOf([card, media])
      gsap.set(card, { y: 0 })
      gsap.set(media, { y: 0, ...extra?.leave })
    })
  }

  /** Karte fällt nach Klick auf y 0 zurück; danach kein Hover-Reset mehr (data-clicked). */
  function dropToZero(card: HTMLElement, dropDuration = 1.27, ease = 'power2.out') {
    const entry = bound.get(card)
    card.dataset.clicked = 'true'
    gsap.to(card, { y: 0, duration: dropDuration, ease, overwrite: 'auto' })
    if (entry) gsap.to(entry.media, { y: 0, ...entry.extra?.leave, duration: dropDuration, ease, overwrite: 'auto' })
  }

  function init() {
    mm = gsap.matchMedia()
    mm.add(query, () => {
      active = true
      return () => {
        active = false
      }
    })
  }

  function destroy() {
    mm?.revert()
    mm = null
    removeAll()
  }

  onMounted(init)
  onBeforeUnmount(destroy)

  return { add, removeAll, resetAll, dropToZero }
}
