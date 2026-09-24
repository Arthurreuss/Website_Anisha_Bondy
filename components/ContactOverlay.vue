<script setup lang="ts">
// Kontakt-Overlay (Spezifikation §6): Headline, Formular in 6 nummerierten
// Schritten, Netlify Forms (statisches Duplikat: public/__forms.html).
// Öffnen/Schließen wie MenuOverlay (clip-path + CustomEase).
import { CustomEase } from 'gsap/CustomEase'
import UiTodo from '~/components/ui/UiTodo.vue'

const overlay = useOverlay()
const { $gsap, $lenis } = useNuxtApp()
const route = useRoute()

const rootEl = ref<HTMLElement | null>(null)
const closeBtnEl = ref<HTMLElement | null>(null)
const revealEls = ref<HTMLElement[]>([])
let triggerEl: HTMLElement | null = null

const isOpen = computed(() => overlay.value === 'contact')
const visible = ref(false)

const { t } = useI18n()

// Anliegen einer Regisseurin (P16): Mehrfachauswahl wie zuvor bei „Scope“.
const concernOptions = ['staging', 'newFormat', 'participatory', 'workshop', 'press', 'other'] as const

const form = reactive({
  name: '',
  email: '',
  organisation: '',
  concern: [] as string[],
  period: '',
  message: '',
})

const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

const prefersReducedMotion = () =>
  import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches

let ease = '0.46, 0, 0.09, 1'
if (import.meta.client) {
  CustomEase.create('contactReveal', '0.46, 0, 0.09, 1')
  ease = 'contactReveal'
}

function setRevealEl(el: unknown, i: number) {
  revealEls.value[i] = el as HTMLElement
}

function close() {
  overlay.value = null
}

function playOpen() {
  if (!rootEl.value) return
  const reduced = prefersReducedMotion()
  const duration = reduced ? 0 : 0.6
  const itemDuration = reduced ? 0 : 0.7

  $gsap.set(rootEl.value, { clipPath: 'inset(0 0 100% 0)' })
  $gsap.set(revealEls.value, { yPercent: 40, autoAlpha: 0 })

  const tl = $gsap.timeline()
  tl.to(rootEl.value, { clipPath: 'inset(0 0 0% 0)', duration, ease })
  tl.to(
    revealEls.value,
    { yPercent: 0, autoAlpha: 1, duration: itemDuration, stagger: reduced ? 0 : 0.06, ease },
    reduced ? 0 : '-=0.3',
  )
}

function playClose(onComplete?: () => void) {
  if (!rootEl.value) {
    onComplete?.()
    return
  }
  const reduced = prefersReducedMotion()
  const duration = reduced ? 0 : 0.5

  $gsap.to(rootEl.value, {
    clipPath: 'inset(0 0 100% 0)',
    duration,
    ease,
    onComplete,
  })
}

watch(isOpen, async (open) => {
  if (open) {
    triggerEl = (document.activeElement as HTMLElement) ?? null
    visible.value = true
    $lenis?.stop()
    await nextTick()
    playOpen()
    await nextTick()
    closeBtnEl.value?.focus()
  } else {
    playClose(() => {
      visible.value = false
    })
    $lenis?.start()
    triggerEl?.focus()
  }
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) close()
}

watch(
  () => route.fullPath,
  () => {
    if (isOpen.value) close()
  },
)

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key] ?? '')}`)
    .join('&')
}

async function onSubmit() {
  status.value = 'sending'
  try {
    await $fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        name: form.name,
        email: form.email,
        organisation: form.organisation,
        concern: form.concern.join(', '),
        period: form.period,
        message: form.message,
      }),
    })
    status.value = 'sent'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <div
    id="contact-overlay"
    ref="rootEl"
    class="contact-overlay"
    role="dialog"
    aria-modal="true"
    :aria-label="$t('nav.contact')"
    :inert="!isOpen"
    :class="{ 'contact-overlay--open': visible }"
  >
    <button ref="closeBtnEl" type="button" class="contact-overlay__close font-body-12 uppercase" @click="close">
      {{ $t('nav.close') }}
    </button>

    <div class="contact-overlay__inner">
      <h2 :ref="(el) => setRevealEl(el, 0)" class="contact-overlay__headline font-headline-1">
        {{ $t('contact.headline') }}
      </h2>
      <p :ref="(el) => setRevealEl(el, 1)" class="contact-overlay__intro font-body">
        {{ $t('contact.intro') }}
      </p>

      <p v-if="status === 'sent'" class="contact-overlay__thanks font-body-24">
        {{ $t('contact.success') }}
      </p>

      <form v-else name="contact" data-netlify="true" class="contact-form" @submit.prevent="onSubmit">
        <input type="hidden" name="form-name" value="contact" />

        <div :ref="(el) => setRevealEl(el, 2)" class="contact-form__field">
          <label class="contact-form__label font-body-12 uppercase" for="contact-name">01. {{ $t('contact.fields.name') }}</label>
          <input
            id="contact-name"
            v-model="form.name"
            type="text"
            name="name"
            class="contact-form__input font-body"
            required
          />
        </div>

        <div :ref="(el) => setRevealEl(el, 3)" class="contact-form__field">
          <label class="contact-form__label font-body-12 uppercase" for="contact-email">02. {{ $t('contact.fields.email') }}</label>
          <input
            id="contact-email"
            v-model="form.email"
            type="email"
            name="email"
            class="contact-form__input font-body"
            required
          />
        </div>

        <div :ref="(el) => setRevealEl(el, 4)" class="contact-form__field">
          <label class="contact-form__label font-body-12 uppercase" for="contact-organisation">
            03. {{ $t('contact.fields.organisation') }}
          </label>
          <input
            id="contact-organisation"
            v-model="form.organisation"
            type="text"
            name="organisation"
            class="contact-form__input font-body"
          />
        </div>

        <fieldset :ref="(el) => setRevealEl(el, 5)" class="contact-form__field">
          <legend class="contact-form__label font-body-12 uppercase">04. {{ $t('contact.fields.concern') }}</legend>
          <div class="contact-form__chips">
            <label v-for="option in concernOptions" :key="option" class="chip">
              <input
                v-model="form.concern"
                type="checkbox"
                name="concern[]"
                :value="t(`contact.concern.${option}`)"
                class="sr-only"
              />
              <span class="chip__label font-body-12 uppercase">{{ t(`contact.concern.${option}`) }}</span>
            </label>
          </div>
        </fieldset>

        <div :ref="(el) => setRevealEl(el, 6)" class="contact-form__field">
          <label class="contact-form__label font-body-12 uppercase" for="contact-period">
            05. {{ $t('contact.fields.period') }}
          </label>
          <input id="contact-period" v-model="form.period" type="text" name="period" class="contact-form__input font-body" />
        </div>

        <div :ref="(el) => setRevealEl(el, 7)" class="contact-form__field">
          <label class="contact-form__label font-body-12 uppercase" for="contact-message">
            06. {{ $t('contact.fields.message') }}
          </label>
          <textarea
            id="contact-message"
            v-model="form.message"
            name="message"
            rows="4"
            class="contact-form__input contact-form__input--textarea font-body"
            required
          ></textarea>
        </div>

        <button
          :ref="(el) => setRevealEl(el, 8)"
          type="submit"
          class="contact-form__submit font-body-40-100"
          :disabled="status === 'sending'"
        >
          {{ $t('contact.submit') }}
        </button>

        <p v-if="status === 'error'" class="contact-form__error font-body-12">
          {{ $t('contact.error') }}
        </p>
      </form>

      <div :ref="(el) => setRevealEl(el, 9)" class="contact-overlay__info font-body-12 uppercase">
        <p class="contact-overlay__info-heading">{{ $t('contact.info.heading') }}</p>
        <dl class="contact-overlay__info-list">
          <div class="contact-overlay__info-item">
            <dt>{{ $t('contact.info.email') }}</dt>
            <dd><UiTodo /></dd>
          </div>
          <div class="contact-overlay__info-item">
            <dt>{{ $t('contact.info.agency') }}</dt>
            <dd><UiTodo /></dd>
          </div>
          <div class="contact-overlay__info-item">
            <dt>{{ $t('contact.info.instagram') }}</dt>
            <dd><UiTodo /></dd>
          </div>
          <div class="contact-overlay__info-item">
            <dt>{{ $t('contact.info.linkedin') }}</dt>
            <dd><UiTodo /></dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contact-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background-color: var(--color-bg);
  color: var(--color-main);
  overflow-y: auto;
  padding: var(--gutter);
  clip-path: inset(0 0 100% 0);
  visibility: hidden;

  &--open {
    visibility: visible;
  }
}

.contact-overlay__close {
  position: absolute;
  top: var(--gutter);
  right: var(--gutter);
  cursor: pointer;
}

.contact-overlay__inner {
  max-width: 72rem;
  margin-inline: auto;
  padding-block: 8rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

.contact-overlay__intro {
  max-width: 40rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

.contact-form__field {
  border: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.contact-form__label {
  display: block;
}

.contact-form__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.chip {
  cursor: pointer;
}

.chip__label {
  display: inline-block;
  padding: 0.8rem 1.6rem;
  border: 1px solid var(--color-main);
  border-radius: 999px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.chip input:checked + .chip__label {
  background-color: var(--color-main);
  color: var(--color-bg);
}

.chip input:focus-visible + .chip__label {
  outline: 2px solid var(--focus-color);
  outline-offset: 2px;
}

.contact-form__input {
  width: 100%;
  border-bottom: 1px solid var(--color-main);
  padding-block: 0.8rem;

  &--textarea {
    border: 1px solid var(--color-main);
    padding: 0.8rem;
    resize: vertical;
  }
}

.contact-form__submit {
  align-self: flex-start;
  cursor: pointer;
  margin-top: 1.6rem;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
}

.contact-overlay__info {
  margin-top: 1.6rem;
  padding-top: 2.4rem;
  border-top: 1px solid var(--color-main);
}

.contact-overlay__info-heading {
  margin-bottom: 1.2rem;
  opacity: 0.6;
}

.contact-overlay__info-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.contact-overlay__info-item {
  display: flex;
  gap: 0.8rem;
  align-items: baseline;

  dt {
    opacity: 0.6;
  }
}

.contact-form__error {
  color: #b3261e;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
