import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)

// Mobile address-bar show/hide must not re-measure (and jump) pinned sections.
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger }
