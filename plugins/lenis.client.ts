import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isWindowTransitionCandidate } from '~/composables/useWindowTransition'

// Smooth-Scroll-Plugin (Spezifikation §1/§6). Lenis wird an den gsap.ticker
// gekoppelt statt seinen eigenen requestAnimationFrame-Loop zu nutzen
// (autoRaf: false), damit ScrollTrigger und Lenis im selben Frame laufen.
// Bereitgestellt als `$lenis`; bei `prefers-reduced-motion: reduce` bleibt
// $lenis null und der native Scroll wird verwendet.
export default defineNuxtPlugin((nuxtApp) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let lenis: Lenis | null = null

  if (!prefersReducedMotion) {
    lenis = new Lenis({
      smoothWheel: true,
      autoRaf: false,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis?.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    const router = useRouter()
    router.afterEach(() => {
      // Beim Fenster-Übergang (P22) bleibt die alte Seite an ihrer Position
      // stehen; nach oben gescrollt wird erst am Ende des Übergangs.
      if (isWindowTransitionCandidate()) return
      lenis?.scrollTo(0, { immediate: true })
    })

    nuxtApp.hook('app:beforeMount', () => {
      document.documentElement.classList.add('lenis')
    })
  }

  return {
    provide: {
      lenis,
    },
  }
})
