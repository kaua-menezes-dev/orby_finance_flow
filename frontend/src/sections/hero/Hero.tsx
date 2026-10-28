import { useRef } from 'react'
import { SECTION_IDS } from '../../config/navigation'
import { HeroCopy } from './HeroCopy'
import { HeroStage } from './HeroStage'
import { useHeroMotion } from './useHeroMotion'
import './hero.css'

/** Landing · Section 01 — Hero ("Seu dinheiro em movimento."). */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  useHeroMotion(rootRef)

  // The outer div stays React-owned when ScrollTrigger wraps the section in its pin spacer.
  return (
    <div>
      <section
        ref={rootRef}
        id={SECTION_IDS.top}
        aria-labelledby="hero-title"
        className="relative overflow-x-clip bg-canvas"
      >
        <div aria-hidden className="hero-wash pointer-events-none absolute inset-0" />

        <div data-hero-copy className="relative z-10 px-5 pt-24 md:pt-[132px]">
          <HeroCopy />
        </div>

        <HeroStage stageRef={stageRef} />

        <p
          data-hero-cue
          className="absolute bottom-9 left-16 hidden items-center gap-2.5 text-[12px] font-medium leading-[1.4] text-ink-secondary xl:flex"
        >
          <span aria-hidden className="h-px w-8 bg-ink-secondary" />
          Role para explorar
        </p>
      </section>
    </div>
  )
}
