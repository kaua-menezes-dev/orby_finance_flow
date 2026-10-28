import { SECTION_IDS } from '../../config/navigation'
import { useMediaQuery } from '../../lib/useMediaQuery'
import { ProblemStage } from './ProblemStage'
import { ProblemStatic } from './ProblemStatic'
import './problem.css'

/**
 * Landing · Section 02 — "O problema" ("Do caos à clareza").
 * Scroll-driven stage by default; a static, unpinned layout when the user
 * prefers reduced motion.
 */
export function ProblemSection() {
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')

  // The outer div stays React-owned when ScrollTrigger wraps the section in its pin spacer.
  return <div id={SECTION_IDS.problem}>{reduce ? <ProblemStatic /> : <ProblemStage />}</div>
}
