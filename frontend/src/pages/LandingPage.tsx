import { SiteHeader } from '../components/navigation/SiteHeader'
import { Hero } from '../sections/hero/Hero'
import { ProblemSection } from '../sections/problem/ProblemSection'

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ProblemSection />
      </main>
    </>
  )
}
