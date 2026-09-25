// Fenster-Übergang (P22): Router-Daten für die Page-Transition festhalten,
// bevor die alte Seite geht (Richtung, Scrollposition, Art des Wechsels).
import type Lenis from 'lenis'
import { prepareWindowTransition, setWindowTransitionLenis } from '~/composables/useWindowTransition'

export default defineNuxtPlugin((nuxtApp) => {
  setWindowTransitionLenis((nuxtApp.$lenis as Lenis | null | undefined) ?? null)
  useRouter().beforeEach((to, from) => {
    prepareWindowTransition(to, from)
  })
})
