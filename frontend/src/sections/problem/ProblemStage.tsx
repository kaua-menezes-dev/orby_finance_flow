import { useRef } from 'react'
import { TransactionChip } from '../../components/finance/TransactionChip'
import { CHIP_ORDER, PROBLEM_QUESTIONS, desktopLines, mobileLines, problemChips, type ChipId } from '../../data/problem'
import { HeadlineLines, Message } from './ProblemCopy'
import { useProblemMotion } from './useProblemMotion'

const chipById = new Map(problemChips.map((chip) => [chip.id, chip]))

/** Echoes paint directly behind their chip (Figma layer order). */
const ECHOES_BEHIND: Partial<Record<ChipId, string[]>> = {
  c1: ['c1.2', 'c1.1'],
  c4: ['c4.2', 'c4.1'],
  c5: ['c5.2', 'c5.1'],
}

const [convergeLeft, convergeRight] = desktopLines.converge.split(/(?=M)/)

/**
 * Pinned, scroll-scrubbed stage. Every layer is persistent and moved between
 * the Figma keyframes D1–D6 / M1–M4 by useProblemMotion; nothing mounts or
 * unmounts while scrolling.
 */
export function ProblemStage() {
  const rootRef = useRef<HTMLElement>(null)
  useProblemMotion(rootRef)

  return (
    <section ref={rootRef} aria-labelledby="problem-title" className="problem-stage">
      <div aria-hidden className="problem-wash pointer-events-none absolute inset-0" />
      <div aria-hidden data-problem="wash-bottom" className="problem-wash-bottom pointer-events-none absolute inset-0" />

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <svg data-problem="lines-desktop" className="problem-lines" viewBox="0 0 1440 960" preserveAspectRatio="none">
          <path data-line="fine" d={desktopLines.fine.D1} stroke="var(--color-lavender)" strokeWidth={1.5} />
          <path data-line="main" d={desktopLines.main.D1} stroke="var(--color-graphic)" strokeWidth={3} />
          <path data-line="converge" d={convergeLeft} stroke="var(--color-graphic)" strokeWidth={2} pathLength={1} />
          <path data-line="converge" d={convergeRight} stroke="var(--color-graphic)" strokeWidth={2} pathLength={1} />
        </svg>
        <svg data-problem="lines-mobile" className="problem-lines" viewBox="0 0 390 880" preserveAspectRatio="none">
          <path data-line="main" d={mobileLines.M1} stroke="var(--color-graphic)" strokeWidth={1.25} />
        </svg>

        <div data-problem="halo" className="problem-halo" />

        {CHIP_ORDER.map((id) => (
          <ChipLayers key={id} id={id} />
        ))}
      </div>

      <p aria-hidden data-problem="overline" className="problem-overline">
        02 — O problema
      </p>

      <h2 id="problem-title" data-problem="headline" className="problem-text problem-headline">
        <HeadlineLines />
      </h2>

      {PROBLEM_QUESTIONS.map((question, index) => (
        <p key={question.accent} data-problem="question" data-index={index} className="problem-text problem-question">
          {question.lead}
          <em>{question.accent}</em>
        </p>
      ))}

      <p data-problem="message" className="problem-text problem-message">
        <Message />
      </p>

      <div aria-hidden data-problem="rail" className="problem-rail">
        {[0, 1, 2].map((step) => (
          <span key={step}>
            <span data-rail-fill />
          </span>
        ))}
      </div>

      <p aria-hidden data-problem="next" className="problem-overline opacity-0">
        03 — Conheça a Orby
      </p>
    </section>
  )
}

function ChipLayers({ id }: { id: ChipId }) {
  const chip = chipById.get(id)!
  return (
    <>
      {ECHOES_BEHIND[id]?.map((echo) => (
        <div key={echo} className="problem-item" data-echo={echo}>
          <TransactionChip chip={chip} />
        </div>
      ))}
      <div className="problem-item" data-chip={id}>
        <div data-enter>
          <TransactionChip chip={chip} />
        </div>
      </div>
    </>
  )
}
