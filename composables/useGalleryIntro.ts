// Intro der Startseite (P18, Soll-Werte docs/animationen-v2.md §1).
//
// Ablauf: Die ersten `a` Karten (Desktop 4, Mobil ≤767px 2) liegen deckungsgleich
// gestapelt in der Bildschirmmitte (Skalierungsunterschied nur 0.001 je Karte)
// und wachsen gemeinsam. Parallel deckt sich der Stapel von unten nach oben auf
// (clip-path), danach fällt jede Karte versetzt in ihre Reihenposition (x/y → 0,
// scale → 1); das innere Medium macht dabei einen kurzen Zoom-Buckel auf dem Weg
// zum CSS-Ruhezustand (1.15). Erst nach der Landung gleiten die Namen ein.
// Karten ab Index 4 liegen ohnehin außerhalb des Viewports und bleiben unangetastet
// (Endzustand = CSS-Ruhezustand); auf Mobil blenden die Karten zwischen `a` und 4
// kurz aus und wieder ein, sobald der Stapel fertig gewachsen ist.
//
// Läuft nur beim ersten Laden der App direkt auf der Startseite und nie bei
// reduced-motion. Gegen ein Aufblitzen der fertigen Reihe setzt ein Inline-
// Skript im <head> vor dem ersten Paint `html.is-intro` (blendet die Galerie
// aus); das Composable entfernt die Klasse, sobald die Startzustände gesetzt sind.
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import type { Ref } from 'vue'

gsap.registerPlugin(CustomEase)

const INTRO_CLASS = 'is-intro'
const DECODE_TIMEOUT = 4000 // ms, max. Wartezeit auf die ersten Bilder (§1.1)
const START_DELAY = 0.6 // s, Wartezeit vor Animationsstart (§1.2)
const GROW_DURATION = 2.88 // s, Dauer des Wachsens (§1.3)
const REVEAL_DURATION = 1.3 // s, Dauer des Aufdeckens je Karte (§1.4)
const REVEAL_STARTS = [0, 0.76, 1.3, 1.58] // s, Startzeiten O[0..3] (§1.4)
const FALL_END = 4.53 // s, Landung aller Karten (§1.5)
const FALL_OFFSET_DESKTOP = [0, 0.27, 0.5, 0.7] // s, L[e] (§1.5)
const FALL_OFFSET_MOBILE = [0, 0.15]
const BUMP_DURATION_MOBILE = [0, 0.27] // s, abweichend von L[e] (§1.5)
const BUMP_DURATION_IDX2 = 0.025 // s, Sonderfall Karte Index 2 (§1.5)
const MEDIA_ZOOM_BUMP = 1.3
const MEDIA_ZOOM_TO = 1.15 // entspricht dem CSS-Ruhezustand der Karten
const MEDIA_ZOOM_FROM = 1.5
const MEDIA_ZOOM_FROM_IDX2 = 1.3
const MEDIA_GROW_TO = 1.2
const MEDIA_GROW_TO_IDX2 = 1.0
const STACK_SCALE_START_DESKTOP = 0.4
const STACK_SCALE_START_MOBILE = 0.37
const STACK_SCALE_STEP = 0.001
const GROW_SCALE_DESKTOP = 0.7
const GROW_SCALE_MOBILE = 0.74
const TITLE_START_DESKTOP = 4.5
const TITLE_START_MOBILE = 4.1
const TITLE_DURATION = 0.8
const TITLE_STAGGER = 0.15
const FADE_START = GROW_DURATION // 2.88s, s. §1.1
const FADE_DURATIONS = [0.15, 0.13] // s, je Karte zwischen `a` und 4 (Mobil)
const CLIP_CLOSED = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
const CLIP_OPEN = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

let played = false

// Vor Hydration ausgeführt; fällt nach 12 s zurück, falls JS scheitert
// (Intro dauert jetzt bis ~6s + max. 4s Bildwarte + 0.6s Startverzögerung).
const headScript = `(function(){try{if(window.__introPlayed||matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('${INTRO_CLASS}');setTimeout(function(){d.classList.remove('${INTRO_CLASS}')},12000)}catch(e){}})()`

interface GalleryControl {
  setEnabled: (value: boolean) => void
}

function eases() {
  return {
    // Stapel wächst (§1.3)
    slowStart: CustomEase.get('introSlowStart') ?? CustomEase.create('introSlowStart', 'M0,0 C0.9,0 0.58,1 1,1'),
    // Aufdecken / Fallen in die Reihe (§1.4, §1.5)
    reveal: CustomEase.get('introReveal') ?? CustomEase.create('introReveal', 'M0,0 C0.46,0 0.09,1 1,1'),
    // Zoom-Buckel der Medien (§1.5)
    zoomBump: CustomEase.get('introZoomBump') ?? CustomEase.create('introZoomBump', 'M0,0 C0.5,0 0.5,1 1,1'),
  }
}

async function waitForMedia(items: HTMLElement[]) {
  const imgs = items
    .map((item) => item.querySelector<HTMLImageElement>('img'))
    .filter((img): img is HTMLImageElement => !!img && img.loading !== 'lazy')
  const decoded = Promise.all(imgs.map((img) => img.decode().catch(() => undefined)))
  await Promise.race([decoded, new Promise((r) => setTimeout(r, DECODE_TIMEOUT))])
}

export function useGalleryIntro(container: Ref<HTMLElement | null>, gallery: GalleryControl) {
  const nuxtApp = useNuxtApp()
  // Nur Teil der ersten Hydration = erster Seitenaufruf direkt auf der Startseite
  const initialLoad = import.meta.client ? nuxtApp.isHydrating : true

  useHead({
    script: [{ key: 'gallery-intro', innerHTML: headScript, tagPosition: 'head' }],
  })

  let ctx: gsap.Context | null = null

  function reveal() {
    document.documentElement.classList.remove(INTRO_CLASS)
  }

  async function play() {
    const el = container.value
    ;(window as unknown as { __introPlayed?: boolean }).__introPlayed = true
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!el || played || !initialLoad || reduced) {
      played = true
      reveal()
      return
    }
    played = true

    const allItems = Array.from(el.querySelectorAll<HTMLElement>('.gallery-item'))
    if (!allItems.length) return reveal()

    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const a = isMobile ? 2 : 4 // Anzahl mitspielender Karten (§1.1)
    const stackScaleStart = isMobile ? STACK_SCALE_START_MOBILE : STACK_SCALE_START_DESKTOP
    const growScale = isMobile ? GROW_SCALE_MOBILE : GROW_SCALE_DESKTOP
    const fallOffsets = isMobile ? FALL_OFFSET_MOBILE : FALL_OFFSET_DESKTOP
    const titleStart = isMobile ? TITLE_START_MOBILE : TITLE_START_DESKTOP

    const { slowStart, reveal: revealEase, zoomBump } = eases()
    const vw = window.innerWidth
    const vh = window.innerHeight

    gallery.setEnabled(false)

    ctx = gsap.context(() => {
      const stages: HTMLElement[] = []
      const imgs: HTMLElement[] = []
      const medias: HTMLElement[] = []
      const names: HTMLElement[] = []
      const fadeItems: HTMLElement[] = [] // Karten zwischen `a` und 4 (nur Mobil nichtleer)

      allItems.forEach((item, i) => {
        const stage = item.querySelector<HTMLElement>('.gallery-item__stage')
        const img = item.querySelector<HTMLElement>('.gallery-item__img')
        const media = item.querySelector<HTMLElement>('.gallery-item__media')
        const name = item.querySelector<HTMLElement>('.gallery-item__name-wrapper > *')

        if (i < a && stage && img) {
          // Versatz von der Karte zur Bildschirmmitte
          const r = item.getBoundingClientRect()
          gsap.set(stage, {
            x: vw / 2 - (r.left + r.width / 2),
            y: vh / 2 - (r.top + r.height / 2),
            scale: stackScaleStart - i * STACK_SCALE_STEP,
          })
          gsap.set(img, { clipPath: CLIP_CLOSED })
          stages.push(stage)
          imgs.push(img)
          if (media) {
            gsap.set(media, { scale: i === 2 ? MEDIA_ZOOM_FROM_IDX2 : MEDIA_ZOOM_FROM })
            medias.push(media)
          }
          if (name) {
            gsap.set(name, { yPercent: 100 })
            names.push(name)
          }
        } else if (i >= a && i < 4) {
          // Karten jenseits der mitspielenden Anzahl, aber noch im Viewport (nur Mobil):
          // bleiben im Endzustand, blenden aber kurz aus (§1.1)
          fadeItems.push(item)
        }
        // i >= 4: liegt außerhalb des Viewports, bleibt unangetastet (CSS-Endzustand)
      })

      reveal()

      const tl = gsap.timeline({
        delay: START_DELAY,
        paused: true,
        onComplete: () => {
          gsap.set(stages, { clearProps: 'transform' })
          gsap.set(imgs, { clearProps: 'clipPath' })
          // Medien behalten ihre CSS-Skalierung (1.15)
          gsap.set(medias, { clearProps: 'transform' })
          gsap.set(names, { clearProps: 'transform' })
        },
      })

      // 1. Stapel wächst (§1.3)
      tl.to(
        stages,
        {
          scale: (i: number) => growScale - i * STACK_SCALE_STEP,
          duration: GROW_DURATION,
          ease: slowStart,
        },
        0,
      )
      tl.to(
        medias,
        {
          scale: (i: number) => (i === 2 ? MEDIA_GROW_TO_IDX2 : MEDIA_GROW_TO),
          duration: GROW_DURATION,
          ease: slowStart,
        },
        0,
      )

      // 2. Aufdecken von unten nach oben (§1.4): Karte e startet bei O[a-1-e]
      imgs.forEach((img, e) => {
        const start = REVEAL_STARTS[a - 1 - e]!
        tl.to(
          img,
          {
            clipPath: CLIP_OPEN,
            duration: REVEAL_DURATION,
            ease: revealEase,
            onComplete: () => gsap.set(img, { clipPath: 'none' }),
          },
          start,
        )
      })

      // 3. Runterfallen in die Reihe, versetzt um L[e], alle landen bei 4.53s (§1.5)
      stages.forEach((stage, e) => {
        const start = GROW_DURATION + fallOffsets[e]!
        tl.to(
          stage,
          {
            x: 0,
            y: 0,
            scale: 1,
            duration: FALL_END - start,
            ease: revealEase,
          },
          start,
        )
      })

      // Medien-Zoom-Buckel auf dem Weg zum Ruhezustand (§1.5)
      medias.forEach((media, e) => {
        const l = fallOffsets[e]!
        let bumpDuration = l
        if (isMobile) bumpDuration = BUMP_DURATION_MOBILE[e]!
        else if (e === 2) bumpDuration = BUMP_DURATION_IDX2

        if (l > 0) {
          tl.to(media, { scale: MEDIA_ZOOM_BUMP, duration: bumpDuration, ease: zoomBump }, GROW_DURATION)
          const restStart = GROW_DURATION + bumpDuration
          tl.to(media, { scale: MEDIA_ZOOM_TO, duration: FALL_END - restStart, ease: revealEase }, restStart)
        } else {
          tl.to(media, { scale: MEDIA_ZOOM_TO, duration: FALL_END - GROW_DURATION, ease: revealEase }, GROW_DURATION)
        }
      })

      // 4. Karten zwischen `a` und 4 kurz ausblenden und zurücksetzen (§1.1, nur Mobil)
      fadeItems.forEach((item, idx) => {
        const duration = FADE_DURATIONS[idx] ?? FADE_DURATIONS[FADE_DURATIONS.length - 1]!
        tl.to(item, { opacity: 0, duration, ease: 'power1.out' }, FADE_START)
        tl.set(item, { opacity: 1 }, FADE_START + duration)
      })

      // Ab Landung darf gezogen werden
      tl.call(() => gallery.setEnabled(true), [], FALL_END)

      // 5. Namen gleiten erst danach von unten ein (§1.6)
      tl.to(
        names,
        { yPercent: 0, duration: TITLE_DURATION, ease: 'power2.out', stagger: TITLE_STAGGER },
        titleStart,
      )

      waitForMedia(allItems.slice(0, 4)).then(() => tl.play())
    })
  }

  onMounted(play)
  onBeforeUnmount(() => {
    ctx?.revert()
    ctx = null
    reveal()
    gallery.setEnabled(true)
  })
}
