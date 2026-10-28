/**
 * Section 02 — "O problema": fictional transactions and the approved Figma
 * keyframes (page "15 — Landing · 02 O problema").
 *
 * Coordinates are in Figma frame space: desktop frames are 1440 × 960,
 * mobile frames 390 × 880. A pose is the layer's top-left origin, its
 * rotation (Figma degrees, counter-clockwise), opacity and uniform scale.
 */
import type { CategoryTone, TransactionIcon } from './demo'

/** The three questions that cross-fade during the pinned chaos. */
export const PROBLEM_QUESTIONS = [
  { lead: 'Quanto eu já ', accent: 'gastei?' },
  { lead: 'O que ainda tenho ', accent: 'para pagar?' },
  { lead: 'Para onde foi ', accent: 'meu dinheiro?' },
] as const

export type ChipKind ='expense' | 'income' | 'planned'

export type ProblemChip = {
  id: ChipId
  kind: ChipKind
  title: string
  meta: string
  /** Signed amount in BRL. */
  amount: number
  tone: CategoryTone
  icon: TransactionIcon
}

export type ChipId = 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'c7' | 'c8' | 'c9' | 'c10' | 'c11' | 'c12'

export const problemChips: ProblemChip[] = [
  { id: 'c1', kind: 'expense', title: 'Compras', meta: 'Loja online · 22 out', amount: -128.9, tone: 'rosa', icon: 'cart' },
  { id: 'c2', kind: 'expense', title: 'Alimentação', meta: 'Restaurante · 21 out', amount: -45, tone: 'pessego', icon: 'utensils' },
  { id: 'c3', kind: 'expense', title: 'Transporte', meta: 'Aplicativo · 23 out', amount: -32.5, tone: 'ceu', icon: 'car' },
  { id: 'c4', kind: 'income', title: 'Receita', meta: 'Salário · 05 out', amount: 2400, tone: 'menta', icon: 'briefcase' },
  { id: 'c5', kind: 'planned', title: 'Moradia', meta: 'Aluguel · 05 nov', amount: -1850, tone: 'lavanda', icon: 'home' },
  { id: 'c6', kind: 'expense', title: 'Assinaturas', meta: 'Streaming · 18 out', amount: -39.9, tone: 'lavanda', icon: 'repeat' },
  { id: 'c7', kind: 'expense', title: 'Alimentação', meta: 'Mercado · 24 out', amount: -286.4, tone: 'lavanda', icon: 'cart' },
  { id: 'c8', kind: 'expense', title: 'Lazer', meta: 'Cinema · Cartão roxo', amount: -64.9, tone: 'rosa', icon: 'tag' },
  { id: 'c9', kind: 'planned', title: 'Receita', meta: 'Freela · 10 nov', amount: 1200, tone: 'menta', icon: 'briefcase' },
  { id: 'c10', kind: 'expense', title: 'Outros', meta: 'Farmácia · 21 out', amount: -27.8, tone: 'outros', icon: 'tag' },
  { id: 'c11', kind: 'expense', title: 'Transporte', meta: 'Combustível · 19 out', amount: -180, tone: 'ceu', icon: 'car' },
  { id: 'c12', kind: 'planned', title: 'Assinaturas', meta: 'Academia · 12 nov', amount: -99, tone: 'lavanda', icon: 'repeat' },
]

/** Back-to-front paint order (far → near), shared by every keyframe. */
export const CHIP_ORDER: ChipId[] = ['c12', 'c10', 'c8', 'c6', 'c3', 'c2', 'c9', 'c11', 'c1', 'c4', 'c5', 'c7']

/** "3D stack" echoes behind the three nearest chips at peak chaos. */
export type EchoId = 'c1.1' | 'c1.2' | 'c4.1' | 'c4.2' | 'c5.1' | 'c5.2'
export const ECHO_IDS: EchoId[] = ['c1.2', 'c1.1', 'c4.2', 'c4.1', 'c5.2', 'c5.1']

/** [x, y, rotation (Figma, CCW), opacity, scale] */
export type Pose = readonly [number, number, number, number, number]

/* ---------------------------------------------------------------- Desktop */

type DesktopKey = 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | 'D6'
export const DESKTOP_KEYS: DesktopKey[] = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6']

/**
 * Scroll position of each keyframe inside the pinned stage, in % of the
 * viewport height (Figma "Coreografia de scroll": pin 180vh for D1–D5, plus
 * the 60vh exit toward Section 03).
 */
export const DESKTOP_TIMES: Record<DesktopKey, number> = { D1: 0, D2: 27, D3: 90, D4: 135, D5: 180, D6: 240 }

export const desktopChipPoses: Record<ChipId | EchoId, Record<DesktopKey, Pose>> = {
  c1: { D1: [120, 560, 5, 1, 1], D2: [70, 610, 9, 1, 1], D3: [40, 650, 14, 1, 1], D4: [470, 662, 2, 1, 1], D5: [409.6, 610, 0, 1, 0.88], D6: [576.9, 691, 0, 0.85, 0.948] },
  c2: { D1: [1120, 150, -7, 0.9, 0.86], D2: [1110, 170, -11, 0.9, 0.86], D3: [1150, 120, -16, 0.9, 0.86], D4: [1095, 652, 3, 1, 1], D5: [1051.4, 610, 0, 1, 0.88], D6: [595.1, 673, 0, 0.35, 0.82] },
  c3: { D1: [90, 170, 8, 0.5, 0.72], D2: [150, 150, 10, 0.9, 0.86], D3: [110, 110, 13, 0.9, 0.86], D4: [60, 300, 4, 0.25, 0.86], D5: [60, 300, 4, 0, 0.72], D6: [614.2, 300, 4, 0, 0.72] },
  c4: { D1: [1030, 610, -4, 1, 1], D2: [1080, 640, -7, 1, 1], D3: [1090, 700, -10, 1, 1], D4: [150, 600, -3, 1, 1], D5: [121.1, 610, 0, 1, 0.88], D6: [567.5, 700, 0, 1, 1] },
  c5: { D1: [-360, 360, 0, 0, 0.72], D2: [210, 320, -6, 1, 1], D3: [70, 270, -9, 1, 1], D4: [795, 612, -2, 1, 1], D5: [696.2, 610, 0, 1, 0.88], D6: [585.7, 682, 0, 0.6, 0.704] },
  c6: { D1: [1460, 400, 0, 0, 0.72], D2: [880, 230, 12, 0.5, 0.72], D3: [900, 170, 18, 0.5, 0.72], D4: [1200, 250, 6, 0.15, 0.72], D5: [1200, 250, 6, 0, 0.72], D6: [615.2, 250, 6, 0, 0.72] },
  c7: { D1: [600, 980, 0, 0, 0.72], D2: [560, 760, -4, 0.9, 0.86], D3: [520, 770, -6, 1, 1], D4: [560, 830, -2, 0.25, 0.86], D5: [560, 830, -2, 0, 0.72], D6: [612.7, 830, -2, 0, 0.72] },
  c8: { D1: [-340, 760, 0, 0, 0.72], D2: [420, 150, -9, 0.5, 0.72], D3: [380, 120, -14, 0.5, 0.72], D4: [380, 60, 0, 0, 0.72], D5: [380, 60, 0, 0, 0.72], D6: [607.7, 60, 0, 0, 0.72] },
  c9: { D1: [1460, 800, 0, 0, 0.72], D2: [1460, 480, 0, 0, 0.72], D3: [1120, 540, 8, 0.9, 0.86], D4: [1160, 470, 3, 0.25, 0.86], D5: [1160, 470, 3, 0, 0.72], D6: [586.1, 470, 3, 0, 0.72] },
  c10: { D1: [400, -120, 0, 0, 0.72], D2: [600, -120, 0, 0, 0.72], D3: [640, 210, 6, 0.5, 0.72], D4: [640, 120, 0, 0, 0.72], D5: [640, 120, 0, 0, 0.72], D6: [617.7, 120, 0, 0, 0.72] },
  c11: { D1: [1000, 980, 0, 0, 0.72], D2: [1000, 980, 0, 0, 0.72], D3: [760, 690, 11, 0.9, 0.86], D4: [900, 830, 4, 0.15, 0.72], D5: [900, 830, 4, 0, 0.72], D6: [606.2, 830, 4, 0, 0.72] },
  c12: { D1: [1460, 120, 0, 0, 0.72], D2: [1460, 100, 0, 0, 0.72], D3: [260, 590, -18, 0.5, 0.72], D4: [200, 700, 0, 0, 0.72], D5: [200, 700, 0, 0, 0.72], D6: [587.6, 700, 0, 0, 0.72] },
  'c1.1': { D1: [120, 560, 5, 0, 0.97], D2: [70, 610, 9, 0.18, 0.97], D3: [50, 662, 17, 0.3, 0.97], D4: [470, 662, 2, 0, 0.97], D5: [409.6, 610, 0, 0, 0.88], D6: [576.9, 691, 0, 0, 0.912] },
  'c1.2': { D1: [120, 560, 5, 0, 0.94], D2: [70, 610, 9, 0, 0.94], D3: [60, 674, 20, 0.12, 0.94], D4: [470, 662, 2, 0, 0.94], D5: [409.6, 610, 0, 0, 0.88], D6: [576.9, 691, 0, 0, 0.884] },
  'c4.1': { D1: [1030, 610, -4, 0, 0.97], D2: [1080, 640, -7, 0, 0.97], D3: [1100, 712, -7, 0.3, 0.97], D4: [150, 600, -3, 0, 0.97], D5: [121.1, 610, 0, 0, 0.88], D6: [567.5, 700, 0, 0, 0.97] },
  'c4.2': { D1: [1030, 610, -4, 0, 0.94], D2: [1080, 640, -7, 0, 0.94], D3: [1110, 724, -4, 0.12, 0.94], D4: [150, 600, -3, 0, 0.94], D5: [121.1, 610, 0, 0, 0.88], D6: [567.5, 700, 0, 0, 0.94] },
  'c5.1': { D1: [-360, 360, 0, 0, 0.7], D2: [210, 320, -6, 0, 0.97], D3: [80, 282, -6, 0.3, 0.97], D4: [795, 612, -2, 0, 0.97], D5: [696.2, 610, 0, 0, 0.88], D6: [585.7, 682, 0, 0, 0.854] },
  'c5.2': { D1: [-360, 360, 0, 0, 0.68], D2: [210, 320, -6, 0, 0.94], D3: [90, 294, -3, 0.12, 0.94], D4: [795, 612, -2, 0, 0.94], D5: [696.2, 610, 0, 0, 0.88], D6: [585.7, 682, 0, 0, 0.827] },
}

/** Chips that slide in from the edges while the section scrolls into view. */
export const DESKTOP_ENTRY: Partial<Record<ChipId, number>> = { c1: -1, c3: -1, c2: 1, c4: 1 }

/* ----------------------------------------------------------------- Mobile */

type MobileKey = 'M1' | 'M2' | 'M3' | 'M4'
export const MOBILE_CHIPS: ChipId[] = ['c3', 'c2', 'c7', 'c1', 'c4', 'c5']

/**
 * Mobile pin (≈120vh for the questions, then a short exit). The chips
 * reach M2 early and hold there while the three questions play.
 */
export const MOBILE_TIMES = { M1: 0, M2: 40, hold: 92, M3: 120, M4: 150 } as const

export const mobileChipPoses: Partial<Record<ChipId, Record<MobileKey, Pose>>> = {
  c1: { M1: [-24, 370, 5, 1, 0.86], M2: [6, 590, 8, 1, 0.86], M3: [27.6, 484, 0, 1, 0.9], M4: [65.6, 512, 0, 0.85, 0.855] },
  c2: { M1: [150, 480, -7, 0.9, 0.74], M2: [160, 262, 9, 0.9, 0.74], M3: [27.6, 652, 0, 1, 0.9], M4: [82, 496, 0, 0.35, 0.741] },
  c3: { M1: [220, 130, 0, 0, 0.62], M2: [150, 96, 10, 0.45, 0.62], M3: [100, 900, 0, 0, 0.62], M4: [100, 900, 0, 0, 0.62] },
  c4: { M1: [100, 740, -4, 1, 0.86], M2: [40, 742, -10, 1, 0.86], M3: [27.6, 400, 0, 1, 0.9], M4: [57.6, 520, 0, 1, 0.9] },
  c5: { M1: [-300, 200, 0, 0, 0.62], M2: [-14, 170, -7, 1, 0.86], M3: [27.6, 568, 0, 1, 0.9], M4: [73.6, 504, 0, 0.6, 0.635] },
  c7: { M1: [200, 900, 0, 0, 0.62], M2: [170, 668, -6, 0.9, 0.74], M3: [100, 900, 0, 0, 0.62], M4: [100, 900, 0, 0, 0.62] },
}

export const MOBILE_ENTRY: Partial<Record<ChipId, number>> = { c1: -1, c2: 1, c4: 1 }

/** M3 lines the four chips up as an even column (Figma width 372). */
export const MOBILE_COLUMN: ChipId[] = ['c4', 'c1', 'c5', 'c2']
export const MOBILE_COLUMN_WIDTH = 372

/* ------------------------------------------------------------------ Lines */

/** Offsets a path made of absolute M/L/C commands (x, y pairs). */
function place(d: string, dx: number, dy: number) {
  let i = 0
  return d.replace(/-?\d+(?:\.\d+)?/g, (n) => (+n + (i++ % 2 === 0 ? dx : dy)).toFixed(2))
}

const TANGLED =
  'M 0 118.64 C 190 108.64 310 38.64 430 88.64 C 550 138.64 570 228.64 650 128.64 C 730 28.64 570 -21.35 710 8.64 C 850 38.64 870 198.64 790 188.64 C 710 178.64 700 38.64 840 28.64 C 980 18.64 990 138.64 1030 88.64 C 1070 38.64 1090 -41.35 1190 28.64 C 1290 98.64 1330 128.64 1460 58.64'
const TANGLED_FINE =
  'M 0 91.11 C 210 91.11 340 31.11 470 71.11 C 600 111.11 610 151.11 700 71.11 C 790 -8.88 650 -8.88 770 11.11 C 890 31.11 910 121.11 890 101.11 C 870 81.11 830 21.11 950 21.11 C 1070 21.11 1110 71.11 1210 21.11 C 1310 -28.88 1350 51.11 1460 31.11'
const CHAOS =
  'M 0 446.36 C 180 436.36 260 306.36 400 346.36 C 540 396.36 490 566.36 620 506.36 C 780 436.36 580 216.36 720 176.36 C 860 136.36 920 346.36 840 386.36 C 760 426.36 720 266.36 880 216.36 C 1030 166.36 1080 46.36 1000 6.36 C 920 -33.63 880 126.36 1020 166.36 C 1160 206.36 1260 306.36 1480 266.36'
const CHAOS_FINE =
  'M 0 272.8 C 220 292.8 300 142.8 450 192.8 C 600 242.8 540 372.8 700 312.8 C 860 252.8 660 32.8 800 2.8 C 940 -27.19 1000 192.8 940 212.8 C 880 232.8 860 72.8 1000 42.8 C 1140 12.8 1240 132.8 1480 92.8'
const CALM = 'M 0 15.69 C 320 -34.3 520 65.69 740 15.69 C 960 -34.3 1160 55.69 1480 5.69'
// The straight line is drawn as a flattened curve so it morphs cleanly.
const FLAT = 'M 0 0 C 370 0 1110 0 1480 0'
const CONVERGE = 'M 0 1.37 C 430 1.37 740 -28.62 740 191.37 L 740 421.37 M 1480 1.37 C 1050 1.37 740 -28.62 740 191.37'

export const desktopLines = {
  main: {
    D1: place(TANGLED, -20, 600),
    D2: place(CHAOS, -20, 200),
    D3: place(CHAOS, -20, 150),
    D4: place(CALM, -20, 640),
    D5: place(FLAT, -20, 640),
  },
  fine: {
    D1: place(TANGLED_FINE, -20, 650),
    D2: place(CHAOS_FINE, -20, 200),
    D3: place(CHAOS_FINE, -20, 150),
    D4: place(CALM, -20, 640),
  },
  converge: place(CONVERGE, -20, 734),
}

/** [opacity, stroke width] per keyframe (Figma stroke weights). */
export const desktopLineStyle = {
  main: { D1: [1, 3], D2: [0.55, 2.5], D3: [0.8, 2.5], D4: [0.9, 2.5], D5: [1, 2], D6: [0, 2] },
  fine: { D1: [1, 1.5], D2: [0.55, 1.25], D3: [0.9, 1.25], D4: [0, 1.25], D5: [0, 1.25], D6: [0, 1.25] },
} as const

const M_TANGLED =
  'M 0 35.59 C 57 32.59 93 11.59 129 26.59 C 165 41.59 171 68.59 195 38.59 C 219 8.59 171 -6.4 213 2.59 C 255 11.59 261 59.59 237 56.59 C 213 53.59 210 11.59 252 8.59 C 294 5.59 297 41.59 309 26.59 C 321 11.59 327 -12.4 357 8.59 C 387 29.59 399 38.59 438 17.59'
const M_CHAOS =
  'M 0 142.83 C 57.6 139.63 83.2 98.03 128 110.83 C 172.8 126.83 156.8 181.23 198.4 162.03 C 249.6 139.63 185.6 69.23 230.4 56.43 C 275.2 43.63 294.4 110.83 268.8 123.63 C 243.2 136.43 230.4 85.23 281.6 69.23 C 329.6 53.23 345.6 14.83 320 2.03 C 294.4 -10.76 281.6 40.43 326.4 53.23 C 371.2 66.03 403.2 98.03 473.6 85.23'

export const mobileLines = {
  M1: place(M_TANGLED, -20, 560),
  M2: place(M_CHAOS, -30, 230),
  /** M3: vertical spine behind the column; M4 continues it down. */
  M3: 'M 195 360 C 195 533 195 707 195 880',
  M4: 'M 195 560 C 195 693 195 827 195 960',
}
