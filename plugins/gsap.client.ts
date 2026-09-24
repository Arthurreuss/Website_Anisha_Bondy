import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'
import { CustomEase } from 'gsap/CustomEase'
import { Flip } from 'gsap/Flip'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, Observer, CustomEase, Flip)

  return {
    provide: {
      gsap,
    },
  }
})
