import { useLayoutEffect, type ReactNode, type RefObject } from 'react'
import ribbonUrl from '../../assets/hero/ribbon.webp'
import { BalanceCard } from '../../components/finance/BalanceCard'
import { FlowChartCard } from '../../components/finance/FlowChartCard'
import { TransactionsPreview } from '../../components/finance/TransactionsPreview'

export type HeroLayerName = 'chart' | 'ribbon' | 'balance' | 'transactions'

/**
 * One stage layer. The nested wrappers each own a single transform source
 * so the animations never fight: scroll storyboard → cursor parallax →
 * idle float → entrance. Static rotation/scale sits on .hero-art.
 */
function StageLayer({ name, card = false, children }: { name: HeroLayerName; card?: boolean; children: ReactNode }) {
  return (
    <div className={`hero-layer hero-layer--${name}${card ? ' hero-card' : ''}`} data-hero-layer={name}>
      <div className="hero-fill" data-scroll>
        <div className="hero-fill" data-parallax>
          <div className="hero-fill" data-float>
            <div className="hero-fill" data-enter>
              <div className="hero-art">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const DESKTOP = '(min-width: 768px)'

/** Keeps the Figma-space stage proportional to the viewport. */
function useStageScale(stageRef: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const desktop = window.matchMedia(DESKTOP)
    const update = () => {
      const width = stage.clientWidth
      const scale = desktop.matches
        ? Math.min(Math.max(width / 1440, 0.62), 1.2)
        : Math.min(Math.max(width / 390, 0.8), 1.3)
      stage.style.setProperty('--stage-scale', scale.toFixed(4))
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(stage)
    desktop.addEventListener('change', update)
    return () => {
      observer.disconnect()
      desktop.removeEventListener('change', update)
    }
  }, [stageRef])
}

export function HeroStage({ stageRef }: { stageRef: RefObject<HTMLDivElement | null> }) {
  useStageScale(stageRef)

  // Decorative: the previews use fictional data and duplicate nothing the copy says.
  return (
    <div ref={stageRef} className="hero-stage" aria-hidden>
      <div className="hero-stage__canvas">
        <StageLayer name="chart" card>
          <div className="hero-art__scaler">
            <FlowChartCard />
          </div>
        </StageLayer>
        <StageLayer name="ribbon">
          <img
            src={ribbonUrl}
            alt=""
            width={1536}
            height={864}
            draggable={false}
            fetchPriority="high"
            className="size-full select-none object-cover"
          />
        </StageLayer>
        <StageLayer name="balance" card>
          <div className="hero-art__scaler">
            <BalanceCard />
          </div>
        </StageLayer>
        <StageLayer name="transactions" card>
          <div className="hero-art__scaler">
            <TransactionsPreview />
          </div>
        </StageLayer>
      </div>
    </div>
  )
}
