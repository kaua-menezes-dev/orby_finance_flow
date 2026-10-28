import { TransactionChip } from '../../components/finance/TransactionChip'
import { PROBLEM_QUESTIONS, problemChips, type ChipId } from '../../data/problem'
import { HeadlineLines, Message } from './ProblemCopy'

const pick = (ids: ChipId[]) => ids.map((id) => problemChips.find((chip) => chip.id === id)!)

function ChipRow({ ids, line = false }: { ids: ChipId[]; line?: boolean }) {
  return (
    <div aria-hidden className="relative mx-auto mt-12 flex max-w-[1360px] flex-wrap justify-center gap-5">
      {/* The straight line only reads as one when the four chips fit on one row. */}
      {line && <span className="absolute inset-x-0 top-1/2 hidden h-0.5 -translate-y-1/2 bg-graphic min-[1440px]:block" />}
      {pick(ids).map((chip) => (
        <TransactionChip key={chip.id} chip={chip} className="relative" />
      ))}
    </div>
  )
}

/**
 * Reduced-motion layout (Figma notes §7): no pin and no scrub — three static
 * blocks in reading order: discovery, the three questions, clarity.
 */
export function ProblemStatic() {
  return (
    <section aria-labelledby="problem-title" className="problem-static relative overflow-clip bg-canvas px-5 py-24 md:py-32">
      <div aria-hidden className="problem-wash pointer-events-none absolute inset-0" />

      <div className="relative [--k:1] lg:[--k:0.8] xl:[--k:1]">
        <p className="problem-overline">02 — O problema</p>
        <h2 id="problem-title" className="problem-text problem-headline mt-6!">
          <HeadlineLines />
        </h2>
        <ChipRow ids={['c1', 'c3', 'c2', 'c4']} />

        <ul className="mt-24 flex flex-col gap-6 md:mt-32">
          {PROBLEM_QUESTIONS.map((question) => (
            <li key={question.accent} className="problem-text problem-question">
              {question.lead}
              <em>{question.accent}</em>
            </li>
          ))}
        </ul>

        <p className="problem-text problem-message mt-24! md:mt-32!">
          <Message />
        </p>
        <ChipRow ids={['c4', 'c1', 'c5', 'c2']} line />
      </div>
    </section>
  )
}
