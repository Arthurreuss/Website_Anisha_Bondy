<script setup lang="ts">
// „Local Time“-Uhr im Header (P10, Spezifikation §3/§6): Label + digitale
// Uhrzeit + eine kleine ziehbare analoge Uhr ("Time Travel"). Ziehen
// verstellt die angezeigte Uhrzeit, das Tageszeit-Theme (useDaytimeTheme)
// wechselt dabei live mit, weil beide dasselbe geteilte overrideHour nutzen.
//
// 24-Stunden-Zifferblatt statt 12h (Entscheidung, Abschlussbericht nennt den
// Grund): Das Tageszeit-Theme läuft über einen vollen 24h-Zyklus; eine
// Umdrehung = 24h bildet "einmal drehen = einmal Tag+Nacht" direkt ab, ohne
// AM/PM-Mehrdeutigkeit (12h-Zifferblatt müsste sonst erklären, welche der
// zwei möglichen Uhrzeiten pro Zeigerstellung gemeint ist).
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { useDaytimeOverride } from '~/composables/useDaytimeTheme'
import { getLocalHourFraction } from '~/utils/daytime-theme'

const { t } = useI18n()
const overrideHour = useDaytimeOverride()

const HOURS_PER_TURN = 24
const DEG_PER_HOUR = 360 / HOURS_PER_TURN
const IDLE_REVERT_MS = 30_000
const STEP_HOURS = 0.25 // Pfeiltasten: ±15 Minuten

const dialRef = ref<HTMLElement | null>(null)
let draggableInstance: Draggable | null = null
let idleTimer: ReturnType<typeof setTimeout> | null = null
let revertTween: gsap.core.Tween | null = null
let reduceMotion = false

// Live-"jetzt" für die digitale Anzeige, solange keine Zeitreise aktiv ist.
const nowHour = ref(0)
let nowTimer: ReturnType<typeof setInterval> | null = null

const displayHour = computed(() => normalizeHour(overrideHour.value ?? nowHour.value))

function normalizeHour(h: number): number {
  return ((h % 24) + 24) % 24
}

function formatTime(hour: number): string {
  const total = Math.round(hour * 60)
  const h = Math.floor(total / 60) % 24
  const m = total % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

const digital = computed(() => formatTime(displayHour.value))

const ariaValueNow = computed(() => Math.round(displayHour.value * 60))
const ariaLabel = computed(() => `${t('clock.ariaLabel')} ${digital.value}`)

function clearIdleTimer() {
  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = null
}

function scheduleIdleRevert() {
  clearIdleTimer()
  idleTimer = setTimeout(() => softRevert(), IDLE_REVERT_MS)
}

function setRotationForHour(hour: number, syncDraggable: boolean) {
  if (!dialRef.value) return
  const deg = hour * DEG_PER_HOUR
  gsap.set(dialRef.value, { rotation: deg })
  if (syncDraggable && draggableInstance) {
    draggableInstance.update()
  }
}

/** Weich zurück zur echten Uhrzeit (kürzester Drehweg), statt hart zu springen. */
function softRevert() {
  clearIdleTimer()
  if (overrideHour.value === null || !dialRef.value) return
  const from = overrideHour.value
  const real = getLocalHourFraction()
  // Kürzester Weg auf dem Kreis (kann über die 0/24-Grenze gehen).
  let delta = ((real - from + 12) % 24) - 12
  if (delta < -12) delta += 24
  const target = from + delta
  const state = { h: from }
  revertTween?.kill()
  if (reduceMotion) {
    overrideHour.value = null
    setRotationForHour(normalizeHour(getLocalHourFraction()), true)
    return
  }
  revertTween = gsap.to(state, {
    h: target,
    duration: 0.9,
    ease: 'power2.out',
    onUpdate: () => {
      overrideHour.value = normalizeHour(state.h)
      setRotationForHour(state.h, true)
    },
    onComplete: () => {
      overrideHour.value = null
    },
  })
}

function hardReset() {
  clearIdleTimer()
  revertTween?.kill()
  overrideHour.value = null
  setRotationForHour(normalizeHour(getLocalHourFraction()), true)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
    event.preventDefault()
    const base = overrideHour.value ?? getLocalHourFraction()
    overrideHour.value = normalizeHour(base + STEP_HOURS)
    setRotationForHour(overrideHour.value, true)
    scheduleIdleRevert()
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
    event.preventDefault()
    const base = overrideHour.value ?? getLocalHourFraction()
    overrideHour.value = normalizeHour(base - STEP_HOURS)
    setRotationForHour(overrideHour.value, true)
    scheduleIdleRevert()
  } else if (event.key === 'Escape' || event.key === 'Enter') {
    event.preventDefault()
    hardReset()
  }
}

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  nowHour.value = getLocalHourFraction()
  nowTimer = setInterval(() => {
    nowHour.value = getLocalHourFraction()
  }, 1000)

  if (!dialRef.value) return
  setRotationForHour(getLocalHourFraction(), false)

  gsap.registerPlugin(Draggable, InertiaPlugin)
  draggableInstance = Draggable.create(dialRef.value, {
    type: 'rotation',
    inertia: !reduceMotion,
    onDragStart() {
      clearIdleTimer()
      revertTween?.kill()
    },
    onDrag() {
      const hour = normalizeHour(this.rotation / DEG_PER_HOUR)
      overrideHour.value = hour
    },
    onThrowUpdate() {
      const hour = normalizeHour(this.rotation / DEG_PER_HOUR)
      overrideHour.value = hour
    },
    onDragEnd: scheduleIdleRevert,
    onThrowComplete: scheduleIdleRevert,
  })[0]
})

onBeforeUnmount(() => {
  clearIdleTimer()
  revertTween?.kill()
  draggableInstance?.kill()
  if (nowTimer) clearInterval(nowTimer)
})
</script>

<template>
  <div class="local-time">
    <span class="local-time__label font-body-12 uppercase">{{ $t('clock.label') }}</span>
    <span class="local-time__digital font-body-12">{{ digital }}</span>
    <div
      class="local-time__face"
      tabindex="0"
      role="slider"
      aria-orientation="horizontal"
      :aria-label="ariaLabel"
      aria-valuemin="0"
      aria-valuemax="1439"
      :aria-valuenow="ariaValueNow"
      :aria-valuetext="digital"
      @keydown="onKeydown"
      @dblclick="hardReset"
    >
      <svg class="local-time__ring" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
        <circle cx="20" cy="20" r="17.5" fill="none" stroke="currentColor" stroke-width="1" />
        <circle cx="20" cy="4.5" r="0.9" fill="currentColor" />
        <circle cx="20" cy="35.5" r="0.9" fill="currentColor" />
      </svg>
      <div ref="dialRef" class="local-time__hand-wrap">
        <svg class="local-time__hand" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
          <line x1="20" y1="20" x2="20" y2="6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
        </svg>
      </div>
      <span class="local-time__dot" aria-hidden="true"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.local-time {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.local-time__label,
.local-time__digital {
  white-space: nowrap;
}

// Mobil (§ Grenzen, Begründung im Abschlussbericht): Label + digitale Zeit
// ausblenden, nur die runde Uhr bleibt – im schmalen Header (Logo + Menu +
// Contact) ist neben den bestehenden Elementen kein Platz für zusätzlichen
// Fließtext, das runde Ziffernblatt bleibt als kompaktes Wiedererkennungs-
// merkmal und Bedienelement erhalten.
@media (max-width: 767px) {
  .local-time__label,
  .local-time__digital {
    display: none;
  }
}

.local-time__face {
  position: relative;
  width: 2.8rem;
  height: 2.8rem;
  cursor: grab;
  touch-action: none;
  border-radius: 50%;

  &:active {
    cursor: grabbing;
  }

  &:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: 2px;
  }
}

.local-time__ring,
.local-time__hand {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.local-time__hand-wrap {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.local-time__dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.3rem;
  height: 0.3rem;
  margin: -0.15rem 0 0 -0.15rem;
  border-radius: 50%;
  background: currentColor;
  pointer-events: none;
}
</style>
