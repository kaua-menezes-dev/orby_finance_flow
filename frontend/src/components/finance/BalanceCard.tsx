import { ArrowLeftRight } from 'lucide-react'
import { demoBalance, formatMoney } from '../../data/demo'

/** Summary Tile / Type=Result — native size 247 × 155. */
export function BalanceCard() {
  return (
    <div className="flex h-[155px] w-[247px] flex-col gap-4 rounded-lg bg-primary p-5 text-white shadow-floating">
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-pressed">
          <ArrowLeftRight aria-hidden size={16} strokeWidth={2} />
        </span>
        <span className="text-[13px] font-semibold leading-[1.45]">{demoBalance.label}</span>
      </div>
      <p className="flex items-baseline gap-1.5 whitespace-nowrap">
        <span className="text-[15px] font-semibold leading-[1.55]">R$</span>
        <span className="text-[28px] font-bold leading-[1.15] tracking-[-0.03em] tabular-nums">
          {formatMoney(demoBalance.value)}
        </span>
      </p>
      <p className="text-[12px] font-medium leading-[1.4]">{demoBalance.footnote}</p>
    </div>
  )
}
