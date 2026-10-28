import { demoTransactions } from '../../data/demo'
import { TransactionRow } from './TransactionRow'

/** "Últimas movimentações" card, cropped to three rows for the landing preview. */
export function TransactionsPreview() {
  return (
    <div className="flex h-[383px] w-[784px] flex-col gap-3 overflow-hidden rounded-lg bg-surface px-3 py-5 shadow-floating">
      <div className="pl-3 pr-1">
        <p className="text-[17px] font-semibold leading-[1.35] tracking-[-0.01em] text-ink">Últimas movimentações</p>
        <p className="mt-0.5 text-[12px] font-medium leading-[1.4] text-ink-secondary">Somente transações realizadas</p>
      </div>
      <ul className="flex flex-col gap-1">
        {demoTransactions.map((transaction) => (
          <TransactionRow key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </div>
  )
}
