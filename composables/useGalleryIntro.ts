// Intro der Startseite (P6, Spezifikation §4 „Dynamik“ Punkt 2).
//
// Ablauf: Alle Karten liegen gestapelt in der Bildschirmmitte (je minimal
// anders skaliert) und werden nacheinander per clip-path von oben nach unten
// aufgedeckt. Danach fliegen sie in ihre Reihe (x/y → 0, scale → 1), das
// innere Medium zoomt von 1.3 auf 1.15, zuletzt gleiten die Namen ein.
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
const MEDIA_ZOOM_FROM = 1.3
const MEDIA_ZOOM_TO = 1.15 // entspricht dem CSS-Ruhezustand der Karten
const STACK_SCALE = 0.8 // oberste Karte
const STACK_SCALE_STEP = 0.035 // jede tiefere Karte etwas größer
const DECODE_TIMEOUT = 1500 // ms, max. Wartezeit auf die ersten Bilder

let played = false

// Vor Hydration ausgeführt; fällt nach 8 s zurück, falls JS scheitert.
const headScript = `(function(){try{if(window.__introPlayed||matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('${INTRO_CLASS}');setTimeout(function(){d.classList.remove('${INTRO_CLASS}')},8000)}catch(e){}})()`

interface GalleryControl {
  setEnabled: (value: boolean) => void
}

function eases() {
  return {
    // weiches Ausrollen / langsamer Start (§4)
    soft: CustomEase.get('introSoft') ?? CustomEase.create('introSoft', 'M0,0 C0.46,0 0.09,1 1,1'),
    slowStart: CustomEase.get('introSlowStart') ?? CustomEase.create('introSlowStart', 'M0,0 C0.9,0 0.58,1 1,1'),
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

    const items = Array.from(el.querySelectorAll<HTMLElement>('.gallery-item'))
    if (!items.length) return reveal()
    const { soft, slowStart } = eases()
    const vw = window.innerWidth
    const vh = window.innerHeight

    gallery.setEnabled(false)

    ctx = gsap.context(() => {
      const stages: HTMLElement[] = []
      const imgs: HTMLElement[] = []
      const medias: HTMLElement[] = []
      const names: HTMLElement[] = []

      items.forEach((item, i) => {
        const stage = item.querySelector<HTMLElement>('.gallery-item__stage')
        const img = item.querySelector<HTMLElement>('.gallery-item__img')
        const media = item.querySelector<HTMLElement>('.gallery-item__media')
        const name = item.querySelector<HTMLElement>('.gallery-item__name-wrapper > *')
        if (!stage || !img) return

        // Versatz vom Kartenbild zur Bildschirmmitte
        const r = img.getBoundingClientRect()
        gsap.set(stage, {
          x: vw / 2 - (r.left + r.width / 2),
          y: vh / 2 - (r.top + r.height / 2),
          scale: STACK_SCALE + i * STACK_SCALE_STEP,
        })
        gsap.set(img, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' })
        stages.push(stage)
        imgs.push(img)
        if (media) {
          gsap.set(media, { scale: MEDIA_ZOOM_FROM })
          medias.push(media)
        }
        if (name) {
          gsap.set(name, { yPercent: 100 })
          names.push(name)
        }
      })

      reveal()

      const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          gsap.set(stages, { clearProps: 'transform' })
          gsap.set(imgs, { clearProps: 'clipPath' })
          // Medien behalten ihre CSS-Skalierung (1.15)
          gsap.set(medias, { clearProps: 'transform' })
          gsap.set(names, { clearProps: 'transform' })
          gallery.setEnabled(true)
        },
      })

      // 1. Stapel: unterste Karte (letzte im DOM) zuerst aufdecken
      const stackOrder = [...imgs].reverse()
      tl.to(stackOrder, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 0.9,
        ease: slowStart,
        stagger: 0.16,
      })

      // 2. In die Reihe fliegen, Medien zoomen auf Ruhezustand
      tl.addLabel('fly', '-=0.2')
      tl.to(stages, { x: 0, y: 0, scale: 1, duration: 1.4, ease: soft, stagger: 0.04 }, 'fly')
      tl.to(medias, { scale: MEDIA_ZOOM_TO, duration: 1.6, ease: soft, stagger: 0.04 }, 'fly')
      // Ab hier darf gezogen werden
      tl.call(() => gallery.setEnabled(true), [], 'fly+=0.9')

      // 3. Namen gleiten von unten ein
      tl.to(names, { yPercent: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15 }, 'fly+=0.9')

      waitForMedia(items).then(() => tl.play())
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
