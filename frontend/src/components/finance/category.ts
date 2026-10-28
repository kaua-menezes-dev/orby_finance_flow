import { BriefcaseBusiness, Car, House, Repeat, ShoppingCart, Tag, Utensils, type LucideIcon } from 'lucide-react'
import type { CategoryTone, TransactionIcon } from '../../data/demo'

export const CATEGORY_ICONS: Record<TransactionIcon, LucideIcon> = {
  utensils: Utensils,
  cart: ShoppingCart,
  briefcase: BriefcaseBusiness,
  home: House,
  repeat: Repeat,
  tag: Tag,
  car: Car,
}

// Category Icon: chart colour at 14% fill + icon in full colour.
export const CATEGORY_TONES: Record<CategoryTone, { tile: string; fg: string; dot: string }> = {
  lavanda: { tile: 'bg-chart-1-bg', fg: 'text-chart-1', dot: 'bg-chart-1' },
  menta: { tile: 'bg-chart-2-bg', fg: 'text-chart-2', dot: 'bg-chart-2' },
  ceu: { tile: 'bg-chart-3-bg', fg: 'text-chart-3', dot: 'bg-chart-3' },
  pessego: { tile: 'bg-chart-4-bg', fg: 'text-chart-4', dot: 'bg-chart-4' },
  rosa: { tile: 'bg-chart-5-bg', fg: 'text-chart-5', dot: 'bg-chart-5' },
  outros: { tile: 'bg-chart-6-bg', fg: 'text-chart-6', dot: 'bg-chart-6' },
}
