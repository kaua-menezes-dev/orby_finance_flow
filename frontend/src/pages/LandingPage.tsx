import { SiteHeader } from '../components/navigation/SiteHeader'
import { SECTION_IDS } from '../config/navigation'
import { Hero } from '../sections/hero/Hero'

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        {/*
          Transition boundary for Section 02 — "O problema" (not implemented yet).
          It only provides the scroll distance the Hero exit needs and owns the
          section id; replace it with the real section in the next phase.
        */}
        <div id={SECTION_IDS.problem} data-section-boundary aria-hidden className="h-svh" />
      </main>
    </>
  )
}
