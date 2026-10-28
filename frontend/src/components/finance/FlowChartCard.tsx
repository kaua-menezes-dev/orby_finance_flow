import gridBaseUrl from '../../assets/chart/grid-base.svg'
import gridUrl from '../../assets/chart/grid.svg'
import plannedExpenseUrl from '../../assets/chart/planned-expense.svg'
import plannedIncomeUrl from '../../assets/chart/planned-income.svg'
import pointExpenseUrl from '../../assets/chart/point-expense.svg'
import pointIncomeUrl from '../../assets/chart/point-income.svg'
import seriesUrl from '../../assets/chart/series.svg'
import swatchExpenseUrl from '../../assets/chart/swatch-expense.svg'
import swatchIncomeUrl from '../../assets/chart/swatch-income.svg'
import swatchPlannedUrl from '../../assets/chart/swatch-planned.svg'

const LEGEND = [
  { label: 'Receitas', swatch: swatchIncomeUrl },
  { label: 'Despesas', swatch: swatchExpenseUrl },
  { label: 'Previsto', swatch: swatchPlannedUrl },
]

const Y_TICKS = [
  { label: 'R$ 8 mil', top: 9, grid: gridUrl, gridTop: 16 },
  { label: 'R$ 4 mil', top: 125, grid: gridUrl, gridTop: 132 },
  { label: 'R$ 0', top: 241, grid: gridBaseUrl, gridTop: 248 },
]

const MONTHS = ['mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov']
const CURRENT_MONTH = 'out'

/*
 * Chart Card / Content=Flow with the Line Chart (720 × 280) at native size.
 * Geometry comes from the Figma export; series are the exported SVG paths.
 */
export function FlowChartCard() {
  return (
    <div className="flex w-[784px] flex-col gap-5 rounded-lg border border-line bg-surface p-6 shadow-floating">
      <div className="flex items-start gap-4">
        <div className="flex-1 whitespace-nowrap">
          <p className="text-[17px] font-semibold leading-[1.35] tracking-[-0.01em] text-ink">Receitas e despesas</p>
          <p className="mt-0.5 text-[12px] font-medium leading-[1.4] text-ink-secondary">Últimos 6 meses · realizadas</p>
        </div>
        <ul className="flex items-center gap-4">
          {LEGEND.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-[13px] leading-[1.45] text-ink-secondary">
              <img src={item.swatch} alt="" width={18} height={2} className="h-0.5 w-[18px]" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative h-[280px] w-[720px] text-[11px] font-medium leading-[1.3] text-ink-secondary">
        {Y_TICKS.map((tick) => (
          <div key={tick.label}>
            <img
              src={tick.grid}
              alt=""
              width={640}
              height={1}
              className="absolute left-16 h-px w-[640px]"
              style={{ top: tick.gridTop - 0.5 }}
            />
            <span className="absolute left-0 w-[52px] text-right" style={{ top: tick.top }}>
              {tick.label}
            </span>
          </div>
        ))}
        {MONTHS.map((month, index) => (
          <span
            key={month}
            className={`absolute top-[258px] w-10 -translate-x-1/2 text-center ${
              month === CURRENT_MONTH ? 'text-[13px] font-semibold leading-[1.45] text-ink' : ''
            }`}
            style={{ left: 64 + (640 / 6) * index }}
          >
            {month}
          </span>
        ))}
        <img src={seriesUrl} alt="" width={720} height={280} className="absolute inset-0 h-[280px] w-[720px]" />
        <img src={pointIncomeUrl} alt="" width={9} height={9} className="absolute left-[592.8px] top-[28.9px] size-[9px]" />
        <img src={pointExpenseUrl} alt="" width={9} height={9} className="absolute left-[592.8px] top-[97px] size-[9px]" />
        <img src={plannedIncomeUrl} alt="" width={10.5} height={10.5} className="absolute left-[698.75px] top-[62.95px] size-[10.5px]" />
        <img src={plannedExpenseUrl} alt="" width={10.5} height={10.5} className="absolute left-[698.75px] top-[180.68px] size-[10.5px]" />
      </div>
    </div>
  )
}
