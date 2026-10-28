import { BriefcaseBusiness, CreditCard, ShoppingCart, Utensils, type LucideIcon } from 'lucide-react'
import { formatSignedMoney, type CategoryTone, type DemoTransaction, type TransactionIcon } from '../../data/demo'

const ICONS: Record<TransactionIcon, LucideIcon> = {
  utensils: Utensils,
  cart: ShoppingCart,
  briefcase: BriefcaseBusiness,
}

// Category Icon: chart colour at 14% fill + icon in full colour.
const TONES: Record<CategoryTone, { tile: string; fg: string; dot: string }> = {
  lavanda: { tile: 'bg-chart-1-bg', fg: 'text-chart-1', dot: 'bg-chart-1' },
  menta: { tile: 'bg-chart-2-bg', fg: 'text-chart-2', dot: 'bg-chart-2' },
}

const Separator = () => <span aria-hidden className="size-[3px] rounded-full bg-ink-disabled" />

/** Transaction Row / Status=Completed, State=Default — native width 760. */
export function TransactionRow({ transaction }: { transaction: DemoTransaction }) {
  const Icon = ICONS[transaction.icon]
  const tone = TONES[transaction.tone]
  const income = transaction.amount > 0

  return (
    <li className="flex h-[68px] w-[760px] items-center gap-3 rounded-md px-4">
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-md ${tone.tile} ${tone.fg}`}>
        <Icon aria-hidden size={20} strokeWidth={2} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <span className="text-[15px] font-semibold leading-[1.55] text-ink">{transaction.title}</span>
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-medium leading-[1.4] text-ink-secondary">
          <span className="flex items-center gap-1.5">
            <span aria-hidden className={`size-2 rounded-full ${tone.dot}`} />
            {transaction.category}
          </span>
          {transaction.card && (
            <>
              <Separator />
              <span className="flex items-center gap-1">
                <CreditCard aria-hidden size={14} strokeWidth={2} />
                {transaction.card}
              </span>
            </>
          )}
          <Separator />
          <span>{transaction.date}</span>
        </span>
      </span>
      <span
        className={`whitespace-nowrap text-right text-[15px] font-bold leading-[1.4] tabular-nums ${income ? 'text-income' : 'text-ink'}`}
      >
        {formatSignedMoney(transaction.amount)}
      </span>
    </li>
  )
}
