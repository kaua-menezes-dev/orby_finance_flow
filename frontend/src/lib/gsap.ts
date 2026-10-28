import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Mobile address-bar show/hide must not re-measure (and jump) pinned sections.
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger }
