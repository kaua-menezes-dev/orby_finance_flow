/**
 * Fictional demonstration data shown in the landing previews.
 * Matches the approved "Dashboard Home" Figma frame (October 2026).
 */
export type CategoryTone = 'lavanda' | 'menta' | 'ceu' | 'pessego' | 'rosa' | 'outros'
export type TransactionIcon = 'utensils' | 'cart' | 'briefcase' | 'home' | 'repeat' | 'tag' | 'car'

export type DemoTransaction = {
  id: string
  title: string
  category: string
  tone: CategoryTone
  icon: TransactionIcon
  card?: string
  date: string
  /** Signed amount in BRL. */
  amount: number
}

export const demoBalance = {
  label: 'Resultado do mês',
  value: 2348.6,
  footnote: 'Receitas − despesas realizadas',
}

export const demoTransactions: DemoTransaction[] = [
  { id: 'restaurante', title: 'Restaurante', category: 'Alimentação', tone: 'lavanda', icon: 'utensils', card: 'Cartão roxo', date: '27 out', amount: -64.9 },
  { id: 'mercado', title: 'Mercado', category: 'Alimentação', tone: 'lavanda', icon: 'cart', card: 'Cartão roxo', date: '24 out', amount: -286.4 },
  { id: 'salario', title: 'Salário', category: 'Trabalho', tone: 'menta', icon: 'briefcase', date: '01 out', amount: 6200 },
]

const brl = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

/** "2.348,60" — the "R$" prefix is typeset separately in the cards. */
export const formatMoney = (value: number) => brl.format(Math.abs(value))

/** "− R$ 64,90" / "+ R$ 6.200,00" with a typographic minus. */
export const formatSignedMoney = (value: number) => `${value < 0 ? '−' : '+'} R$ ${formatMoney(value)}`
