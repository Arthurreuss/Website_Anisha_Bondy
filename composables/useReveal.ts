// Scroll-Reveals der Detailseite (P9, Spezifikation §5 „Dynamik“).
//
// Arbeitet deklarativ über data-Attribute innerhalb eines Root-Elements:
//   [data-reveal="lines"]  Text wird in Zeilen gesplittet, jede Zeile liegt in
//                          einer eigenen overflow:hidden-Maske und gleitet
//                          yPercent 100 -> 0 (stagger, power2.out).
//   [data-reveal="mask"]   Element in vorhandener Maske (.title-mask/.label-mask)
//                          gleitet yPercent 100 -> 0.
//   [data-reveal="image"]  Bild-Container wird per clip-path von unten
//                          aufgedeckt, das innere Medium zoomt scale 1.15 -> 1.
//   [data-parallax]        gescrubbte, leichte yPercent-Verschiebung.
//
// Ausgangszustände werden erst per JS gesetzt (gsap.context, synchron beim
// Mount) – ohne JS/SSG bleibt der Originaltext bzw. das Originalbild sichtbar,
// kein FOUC. Bei prefers-reduced-motion bleibt alles sofort sichtbar, keine
// ScrollTrigger/Animation wird erzeugt. Aufräumen (Seitenwechsel) über
// gsap.context().revert().
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Ref } from 'vue'

gsap.registerPlugin(ScrollTrigger)

const LINE_SELECTOR = '[data-reveal="lines"]'
const MASK_SELECTOR = '[data-reveal="mask"]'
const IMAGE_SELECTOR = '[data-reveal="image"]'
const PARALLAX_SELECTOR = '[data-parallax]'

const RESIZE_DEBOUNCE = 200
const REVEAL_START = 'top 85%'

interface LineEntry {
  el: HTMLElement
  lines: HTMLElement[]
  revealed: boolean
  trigger: ScrollTrigger | null
}

/**
 * Splittet den Text eines Elements in Zeilen (gruppiert nach offsetTop),
 * jede Zeile in einer eigenen Maske. Mutiert das Element; der Originaltext
 * wird in `dataset.revealText` gesichert, damit erneut gesplittet werden kann.
 */
function splitIntoLines(el: HTMLElement): HTMLElement[] {
  if (el.dataset.revealText === undefined) {
    el.dataset.revealText = el.textContent ?? ''
  }
  const text = el.dataset.revealText.trim().replace(/\s+/g, ' ')
  el.textContent = ''
  if (!text) return []

  // 1. Wörter in einzelne Spans, um Zeilenumbrüche zu messen.
  const words = text.split(' ')
  const wordEls: HTMLElement[] = []
  words.forEach((word, i) => {
    const span = document.createElement('span')
    span.textContent = word
    span.style.display = 'inline-block'
    el.appendChild(span)
    wordEls.push(span)
    if (i < words.length - 1) el.appendChild(document.createTextNode(' '))
  })

  const lineGroups: HTMLElement[][] = []
  let lastTop: number | null = null
  wordEls.forEach((span) => {
    const top = span.offsetTop
    if (lastTop === null || Math.abs(top - lastTop) > 1) {
      lineGroups.push([span])
      lastTop = top
    } else {
      lineGroups[lineGroups.length - 1]!.push(span)
    }
  })

  // 2. Zeilen neu aufbauen: Maske (overflow hidden) + Inhalt (transform-Ziel).
  el.textContent = ''
  const lines: HTMLElement[] = []
  lineGroups.forEach((groupWords) => {
    const mask = document.createElement('span')
    mask.style.display = 'block'
    mask.style.overflow = 'hidden'

    const inner = document.createElement('span')
    inner.style.display = 'block'

    groupWords.forEach((word, i) => {
      inner.appendChild(word)
      if (i < groupWords.length - 1) inner.appendChild(document.createTextNode(' '))
    })

    mask.appendChild(inner)
    el.appendChild(mask)
    lines.push(inner)
  })

  return lines
}

export function useReveal(root: Ref<HTMLElement | null>) {
  let ctx: gsap.Context | null = null
  let mm: gsap.MatchMedia | null = null
  let reducedMotion = false
  const lineEntries: LineEntry[] = []
  const imageTriggers: ScrollTrigger[] = []
  const maskTriggers: ScrollTrigger[] = []
  const parallaxTweens: gsap.core.Tween[] = []
  let resizeTimer: ReturnType<typeof setTimeout> | null = null

  function killTriggers() {
    lineEntries.forEach((entry) => entry.trigger?.kill())
    imageTriggers.splice(0).forEach((t) => t.kill())
    maskTriggers.splice(0).forEach((t) => t.kill())
    parallaxTweens.splice(0).forEach((t) => t.scrollTrigger?.kill())
    parallaxTweens.length = 0
    lineEntries.length = 0
  }

  function buildLines() {
    const el = root.value
    if (!el) return
    el.querySelectorAll<HTMLElement>(LINE_SELECTOR).forEach((node) => {
      const lines = splitIntoLines(node)
      lineEntries.push({ el: node, lines, revealed: false, trigger: null })
    })
  }

  function createLineTrigger(entry: LineEntry) {
    if (!entry.lines.length) return
    gsap.set(entry.lines, { yPercent: 100 })
    entry.trigger = ScrollTrigger.create({
      trigger: entry.el,
      start: REVEAL_START,
      once: true,
      onEnter: () => {
        entry.revealed = true
        gsap.to(entry.lines, {
          yPercent: 0,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.08,
        })
      },
    })
  }

  function animateLines() {
    lineEntries.forEach(createLineTrigger)
  }

  function animateMasks() {
    const el = root.value
    if (!el) return
    el.querySelectorAll<HTMLElement>(MASK_SELECTOR).forEach((node) => {
      gsap.set(node, { yPercent: 100 })
      maskTriggers.push(
        ScrollTrigger.create({
          trigger: node,
          start: REVEAL_START,
          once: true,
          onEnter: () => {
            gsap.to(node, { yPercent: 0, duration: 1, ease: 'power2.out' })
          },
        }),
      )
    })
  }

  function animateImages() {
    const el = root.value
    if (!el) return
    el.querySelectorAll<HTMLElement>(IMAGE_SELECTOR).forEach((container) => {
      const media = container.querySelector<HTMLElement>('img, video')
      gsap.set(container, { clipPath: 'inset(100% 0% 0% 0%)' })
      if (media) gsap.set(media, { scale: 1.15, transformOrigin: '50% 50%' })

      imageTriggers.push(
        ScrollTrigger.create({
          trigger: container,
          start: REVEAL_START,
          once: true,
          onEnter: () => {
            const tl = gsap.timeline({ defaults: { duration: 1.1, ease: 'power2.out' } })
            tl.to(container, { clipPath: 'inset(0% 0% 0% 0%)' }, 0)
            if (media) tl.to(media, { scale: 1 }, 0)
          },
        }),
      )
    })
  }

  function animateParallax() {
    const el = root.value
    if (!el) return
    el.querySelectorAll<HTMLElement>(PARALLAX_SELECTOR).forEach((node) => {
      const trigger = (node.closest(IMAGE_SELECTOR) as HTMLElement | null) ?? node.parentElement ?? node
      const tween = gsap.fromTo(
        node,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
      parallaxTweens.push(tween)
    })
  }

  /** prefers-reduced-motion: alles sofort sichtbar, keine ScrollTrigger. */
  function revealInstantly() {
    const el = root.value
    if (!el) return
    el.querySelectorAll<HTMLElement>(`${MASK_SELECTOR}`).forEach((node) => {
      gsap.set(node, { clearProps: 'transform' })
    })
    el.querySelectorAll<HTMLElement>(IMAGE_SELECTOR).forEach((node) => {
      gsap.set(node, { clearProps: 'clipPath' })
      const media = node.querySelector<HTMLElement>('img, video')
      if (media) gsap.set(media, { clearProps: 'transform' })
    })
    // Zeilen: bei reduced-motion nicht splitten, Originaltext bleibt stehen.
  }

  function setup() {
    const el = root.value
    if (!el) return

    ctx = gsap.context(() => {
      mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: reduce)', () => {
        reducedMotion = true
        revealInstantly()
      })
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        reducedMotion = false
        buildLines()
        animateLines()
        animateMasks()
        animateImages()
        animateParallax()
      })
    }, el)
  }

  function handleResize() {
    if (reducedMotion || !root.value) return
    // Nur die Zeilen-Splits hängen von der Breite ab; bereits enthüllte
    // Zeilen bleiben sichtbar, unenthüllte werden neu gesplittet + getriggert.
    lineEntries.forEach((entry) => entry.trigger?.kill())
    const wasRevealed = new Map(lineEntries.map((e) => [e.el, e.revealed]))
    lineEntries.length = 0

    root.value.querySelectorAll<HTMLElement>(LINE_SELECTOR).forEach((node) => {
      const lines = splitIntoLines(node)
      const entry: LineEntry = { el: node, lines, revealed: wasRevealed.get(node) ?? false, trigger: null }
      lineEntries.push(entry)
      if (entry.revealed) {
        gsap.set(entry.lines, { yPercent: 0 })
      } else {
        createLineTrigger(entry)
      }
    })

    ScrollTrigger.refresh()
  }

  function onResize() {
    if (resizeTimer) clearTimeout(resizeTimer)
    resizeTimer = setTimeout(handleResize, RESIZE_DEBOUNCE)
  }

  onMounted(() => {
    setup()
    window.addEventListener('resize', onResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
    if (resizeTimer) clearTimeout(resizeTimer)
    killTriggers()
    mm?.revert()
    ctx?.revert()
  })

  return {
    refresh: () => ScrollTrigger.refresh(),
  }
}
