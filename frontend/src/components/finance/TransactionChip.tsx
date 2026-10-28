import { Clock } from 'lucide-react'
import { formatSignedMoney } from '../../data/demo'
import type { ProblemChip } from '../../data/problem'
import { CATEGORY_ICONS, CATEGORY_TONES } from './category'

/**
 * "S02 / Transaction Chip" — a floating, compact Transaction Row:
 * Category Icon M + Body/M Strong title + Caption meta + Money/M amount on a
 * white radius/lg surface with Elevation/2 Floating. Hugs its content, so
 * callers can set an explicit width (the text column then fills it).
 */
export function TransactionChip({ chip, className = '' }: { chip: ProblemChip; className?: string }) {
  const Icon = CATEGORY_ICONS[chip.icon]
  const tone = CATEGORY_TONES[chip.tone]

  return (
    <div
      className={`flex h-[68px] items-center gap-3.5 whitespace-nowrap rounded-lg border border-line bg-surface py-3.5 pl-3.5 pr-[18px] shadow-floating ${className}`}
    >
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-md ${tone.tile} ${tone.fg}`}>
        <Icon aria-hidden size={20} strokeWidth={2} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 pr-2.5">
        <span className="text-[15px] font-semibold leading-[1.45] text-ink">{chip.title}</span>
        <span className="flex items-center gap-1.5 text-[12px] font-medium leading-[1.4] text-ink-secondary">
          {chip.kind === 'planned' && (
            <span className="flex items-center gap-1.5">
              <Clock aria-hidden size={14} strokeWidth={2} />
              Prevista
            </span>
          )}
          {chip.meta}
        </span>
      </span>
      <span
        className={`text-[15px] font-bold leading-[1.4] tabular-nums ${chip.amount > 0 ? 'text-income' : 'text-ink'}`}
      >
        {formatSignedMoney(chip.amount)}
      </span>
    </div>
  )
}
