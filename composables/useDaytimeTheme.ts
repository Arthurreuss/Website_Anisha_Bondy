// Laufzeit-Teil des Tageszeit-Themes (P10). Das Inline-Head-Skript
// (utils/daytime-theme.ts, buildHeadInlineScript) setzt die Variablen schon
// vor dem ersten Paint anhand der echten lokalen Uhrzeit. Dieses Composable
// übernimmt danach:
//   - jede Minute weich aktualisieren (kein Sprung, außer reduced-motion),
//   - die "Zeitreise"-Überschreibung der Uhr (LocalTime.vue) respektieren,
//   - nach Loslassen automatisch zur echten Zeit zurückkehren.
//
// Nur clientseitig relevant (SSR/Prerender liefert die reine Tages-Ansicht
// über die statischen Tokens; das Head-Skript übernimmt vor Hydration).
// Deshalb ein einfacher modulweiter ref() statt useState() – useState()
// würde beim Prerendering außerhalb des Request-Lifecycles ausgewertet,
// sobald dieses Modul importiert wird, und mit "[nuxt] instance unavailable"
// fehlschlagen.
import { computeTheme, applyTheme, getLocalHourFraction } from '~/utils/daytime-theme'

const overrideHour = ref<number | null>(null)

export function useDaytimeOverride() {
  return overrideHour
}

let started = false
let intervalId: ReturnType<typeof setInterval> | null = null

export function useDaytimeTheme() {
  if (import.meta.client && !started) {
    started = true
    const root = document.documentElement
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const update = () => {
      const hour = overrideHour.value ?? getLocalHourFraction()
      applyTheme(root, computeTheme(hour))
    }

    // Erst nach dem ersten Frame die Transition-Klasse setzen: der initiale
    // Zustand kommt 1:1 vom Head-Skript (kein Sprung), erst danach dürfen
    // Änderungen weich animiert werden.
    requestAnimationFrame(() => {
      if (!reduceMotion) {
        root.classList.add('daytime-transition')
      }
    })

    // Jede Minute aktualisieren (Spezifikation: "aktualisiert sich jede
    // Minute"); bei aktiver Zeitreise übernimmt watch() unten die Updates.
    intervalId = setInterval(() => {
      if (overrideHour.value === null) update()
    }, 60_000)

    watch(overrideHour, () => update())
  }

  return { overrideHour }
}

export function stopDaytimeThemeForTest() {
  if (intervalId) clearInterval(intervalId)
  intervalId = null
  started = false
}
