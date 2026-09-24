// Endlos-Slider der Startseite (P5, Spezifikation §4 „Dynamik“ Punkt 1).
//
// Prinzip: Die Items liegen per Flexbox nebeneinander. Eine virtuelle Position
// `current` (px) läuft beliebig weit; jedes Item wird per translateX so versetzt,
// dass es sich innerhalb eines Bands der Länge `total` endlos wiederholt
// (gsap.utils.wrap). Eingaben (Drag, Wheel, Tastatur) verschieben nur das Ziel
// `target`; `current` folgt jedes Frame mit framerate-unabhängigem Lerp.
// Die Geschwindigkeit steuert eine leichte Verkleinerung der Karten.
import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import type { Ref } from 'vue'

gsap.registerPlugin(Observer)

const FOLLOW = 0.06 // Lerp-Faktor Position (pro 60-fps-Frame)
const SCALE_FOLLOW = 0.06 // Lerp-Faktor Skalierung
const SCALE_PER_PX = 0.002 // Skalierungsverlust je px/Frame Geschwindigkeit
const MAX_SPEED = 100 // px/Frame, ab hier keine weitere Verkleinerung
const THROW = 0.3 // Nachlauf: Anteil der Loslass-Geschwindigkeit (px/s)
const WHEEL = 2 // Wheel-Multiplikator (Desktop)
const FRAME_MS = 1000 / 60

export interface InfiniteGalleryOptions {
  itemSelector?: string
  scaleSelector?: string
  /** Wird bei jeder Nutzer-Interaktion aufgerufen (z. B. um das Intro abzubrechen). */
  onInteract?: () => void
}

export function useInfiniteGallery(container: Ref<HTMLElement | null>, options: InfiniteGalleryOptions = {}) {
  const itemSelector = options.itemSelector ?? '.gallery-item'
  const scaleSelector = options.scaleSelector ?? '.gallery-item__wrapper'

  let items: HTMLElement[] = []
  let scalers: HTMLElement[] = []
  let setX: ((v: number) => void)[] = []
  let step = 0 // Breite eines Items + Gap
  let total = 0 // Länge des Bands
  let wrap: (v: number) => number = (v) => v

  let target = 0
  let current = 0
  let last = 0
  let scale = 1
  let appliedScale = 1
  let dragged = false
  let pointerX = 0
  let enabled = true
  let reducedMotion = false

  let observer: Observer | null = null
  let wheelObserver: Observer | null = null
  let resizeObserver: ResizeObserver | null = null
  let mm: gsap.MatchMedia | null = null
  const cleanups: (() => void)[] = []

  function measure() {
    const el = container.value
    if (!el || !items.length) return false
    const style = getComputedStyle(el)
    const gap = parseFloat(style.columnGap) || 0
    const width = items[0]!.getBoundingClientRect().width
    step = width + gap
    total = step * items.length
    wrap = gsap.utils.wrap(-step, total - step)
    return step > 0
  }

  function render() {
    for (let i = 0; i < items.length; i++) {
      const base = i * step
      setX[i]!(wrap(base - current) - base)
    }
  }

  function applyScale(s: number) {
    if (s === appliedScale) return
    appliedScale = s
    for (const el of scalers) {
      if (s === 1) el.style.removeProperty('transform')
      else el.style.transform = `scale(${s})`
    }
  }

  // Framerate-unabhängiges Lerp: 1 - (1 - f)^(dt/16.67)
  const ease = (f: number, frames: number) => 1 - (1 - f) ** frames

  function tick(_time: number, deltaMs: number) {
    const frames = Math.min(4, Math.max(0.25, (deltaMs || FRAME_MS) / FRAME_MS))
    const diff = target - current
    current = Math.abs(diff) < 0.01 ? target : current + diff * ease(FOLLOW, frames)

    const moved = current !== last
    const velocity = (current - last) / frames
    last = current

    if (!reducedMotion) {
      const goal = 1 - Math.min(MAX_SPEED, Math.abs(velocity)) * SCALE_PER_PX
      scale += (goal - scale) * ease(SCALE_FOLLOW, frames)
      if (Math.abs(1 - scale) < 1e-4) scale = 1
      applyScale(Math.round(scale * 10000) / 10000)
    }
    if (moved) render()
  }

  function moveBy(px: number) {
    if (!enabled) return
    target += px
    options.onInteract?.()
  }

  /** Sorgt dafür, dass ein per Tastatur fokussiertes Item sichtbar ist. */
  function onFocusIn(e: FocusEvent) {
    const el = container.value
    if (!el) return
    el.scrollLeft = 0 // Browser-Autoscroll bei overflow:hidden rückgängig machen
    const focused = e.target as HTMLElement
    // Nur Tastatur-Fokus ausrichten – Mausklick/Touch fokussiert ebenfalls
    if (!focused.matches(':focus-visible')) return
    const item = focused.closest(itemSelector) as HTMLElement | null
    const index = item ? items.indexOf(item) : -1
    if (index < 0) return
    // Position so wählen, dass das Item am linken Rand steht (nächstgelegene Kopie)
    const rel = wrap(index * step - target)
    target += rel
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') moveBy(step)
    else if (e.key === 'ArrowLeft') moveBy(-step)
    else return
    e.preventDefault()
  }

  function init() {
    const el = container.value
    if (!el) return
    items = Array.from(el.querySelectorAll<HTMLElement>(itemSelector))
    scalers = items.map((item) => item.querySelector<HTMLElement>(scaleSelector) ?? item)
    setX = items.map((item) => gsap.quickSetter(item, 'x', 'px') as (v: number) => void)
    if (!measure()) return
    render()

    // Klick nach Drag unterdrücken, natives Bild-Dragging verhindern
    const onClick = (e: MouseEvent) => {
      if (dragged) {
        e.preventDefault()
        e.stopPropagation()
        dragged = false
      }
    }
    const onDragStart = (e: DragEvent) => e.preventDefault()
    el.addEventListener('click', onClick, true)
    el.addEventListener('dragstart', onDragStart)
    el.addEventListener('focusin', onFocusIn)
    el.addEventListener('keydown', onKeyDown)
    cleanups.push(() => {
      el.removeEventListener('click', onClick, true)
      el.removeEventListener('dragstart', onDragStart)
      el.removeEventListener('focusin', onFocusIn)
      el.removeEventListener('keydown', onKeyDown)
    })

    observer = Observer.create({
      target: el,
      type: 'touch,pointer',
      dragMinimum: 3,
      preventDefault: true,
      onPress: (self) => {
        dragged = false
        pointerX = self.x ?? 0
      },
      onDrag: (self) => {
        if (!enabled) return
        // Delta selbst aus der Zeigerposition berechnen (self.deltaX ist gebündelt)
        const x = self.x ?? pointerX
        const dx = x - pointerX
        pointerX = x
        dragged = true
        // Beim Ziehen folgt die Position direkt dem Finger
        target -= dx
        current -= dx
        options.onInteract?.()
      },
      onDragEnd: (self) => moveBy(-self.velocityX * THROW),
    })

    mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: reduce)', () => {
      reducedMotion = true
      scale = 1
      applyScale(1)
      return () => {
        reducedMotion = false
      }
    })
    mm.add('(min-width: 1025px)', () => {
      wheelObserver = Observer.create({
        target: el,
        type: 'wheel',
        preventDefault: true,
        wheelSpeed: 1,
        onWheel: (self) => {
          // Trackpads liefern auch horizontale Deltas
          const d = Math.abs(self.deltaX) > Math.abs(self.deltaY) ? self.deltaX : self.deltaY
          moveBy(d * WHEEL)
        },
      })
      return () => {
        wheelObserver?.kill()
        wheelObserver = null
      }
    })

    gsap.ticker.add(tick)

    resizeObserver = new ResizeObserver(() => {
      // Position relativ zur Item-Breite beibehalten
      const ratio = step ? current / step : 0
      if (measure()) {
        current = target = last = ratio * step
        render()
      }
    })
    resizeObserver.observe(el)
  }

  function destroy() {
    gsap.ticker.remove(tick)
    observer?.kill()
    wheelObserver?.kill()
    mm?.revert()
    resizeObserver?.disconnect()
    cleanups.splice(0).forEach((fn) => fn())
    applyScale(1)
    items = []
    scalers = []
    setX = []
  }

  onMounted(init)
  onBeforeUnmount(destroy)

  return {
    /** Eingaben sperren/freigeben (z. B. während Intro oder Seitenübergang). */
    setEnabled: (value: boolean) => {
      enabled = value
      if (observer) value ? observer.enable() : observer.disable()
    },
    /** Aktuelle Position (für Übergänge). */
    getPosition: () => current,
    refresh: () => {
      if (measure()) render()
    },
  }
}
