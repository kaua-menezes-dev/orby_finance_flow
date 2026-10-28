import { useLayoutEffect, type RefObject } from 'react'
import {
  CHIP_ORDER,
  DESKTOP_ENTRY,
  DESKTOP_KEYS,
  DESKTOP_TIMES,
  ECHO_IDS,
  MOBILE_CHIPS,
  MOBILE_COLUMN,
  MOBILE_COLUMN_WIDTH,
  MOBILE_ENTRY,
  MOBILE_TIMES,
  desktopChipPoses,
  desktopLineStyle,
  desktopLines,
  mobileChipPoses,
  mobileLines,
  type ChipId,
  type Pose,
} from '../../data/problem'
import { gsap, ScrollTrigger } from '../../lib/gsap'

export const PROBLEM_DESKTOP = '(min-width: 1024px)'

type Frame = { w: number; h: number; kMin: number }
const DESKTOP_FRAME: Frame = { w: 1440, h: 960, kMin: 0.55 }
const MOBILE_FRAME: Frame = { w: 390, h: 880, kMin: 0.8 }

/*
 * Section 02 choreography — Figma "Coreografia de scroll".
 *
 * Entry (native scroll, section top: viewport bottom → top)
 *   the tangled line wipes in left→right, the headline rises in line masks
 *   and the first four chips slide in from the edges, landing on D1.
 * Pin (scrubbed)   desktop D1 → D2 → D3 → D4 → D5 → D6 over 240vh
 *                  mobile  M1 → M2 → (hold) → M3 → M4 over 150vh
 *   chips and echoes interpolate between the exact Figma poses; the line
 *   morphs tangled → chaos → calm → straight, then converges toward
 *   Section 03; questions cross-fade in the clear centre.
 *
 * One gsap.matchMedia context owns everything, so breakpoint changes and
 * unmount revert every tween and ScrollTrigger. Reduced motion never mounts
 * this stage (see ProblemSection).
 */
export function useProblemMotion(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const mm = gsap.matchMedia()

    mm.add({ desktop: PROBLEM_DESKTOP, mobile: '(max-width: 1023.98px)' }, (context) => {
      const { desktop } = context.conditions as Record<string, boolean>
      const frame = desktop ? DESKTOP_FRAME : MOBILE_FRAME

      /* ---------- Frame mapping (re-evaluated on every refresh) ---------- */
      const sx = () => root.clientWidth / frame.w
      const sy = () => root.clientHeight / frame.h
      const k = () => gsap.utils.clamp(frame.kMin, 1.25, Math.min(sx(), sy()))
      const setK = () => root.style.setProperty('--k', k().toFixed(4))
      setK()
      const resize = new ResizeObserver(setK)
      resize.observe(root)

      const pose = (p: Pose) => ({
        x: () => p[0] * sx(),
        y: () => p[1] * sy(),
        rotation: -p[2], // Figma rotates counter-clockwise
        scale: () => p[4] * k(),
        autoAlpha: p[3],
      })
      /** Text layers are centre-anchored in CSS; only y and opacity move. */
      const at = (y: number, opacity: number) => ({ y: () => y * sy(), opacity })

      const q = <T extends Element = HTMLElement>(selector: string) => Array.from(root.querySelectorAll<T>(selector))
      const one = <T extends Element = HTMLElement>(selector: string) => root.querySelector<T>(selector)!
      const chip = (id: ChipId) => one(`[data-chip="${id}"]`)
      const headline = one('[data-problem="headline"]')
      const overline = one('[data-problem="overline"]')
      const next = one('[data-problem="next"]')
      const halo = one('[data-problem="halo"]')
      const message = one('[data-problem="message"]')
      const rail = one('[data-problem="rail"]')
      const railFill = q('[data-rail-fill]')
      const washBottom = one('[data-problem="wash-bottom"]')
      const questions = q('[data-problem="question"]')
      const linesDesktop = one<SVGSVGElement>('[data-problem="lines-desktop"]')
      const linesMobile = one<SVGSVGElement>('[data-problem="lines-mobile"]')
      const lines = desktop ? linesDesktop : linesMobile

      gsap.set(desktop ? linesMobile : linesDesktop, { autoAlpha: 0 })
      // Own the centring offsets so GSAP never bakes the CSS `translate` into px.
      gsap.set([headline, ...questions, message, halo], { xPercent: -50, yPercent: -50, x: 0 })
      gsap.set([overline, next, rail], { xPercent: -50, x: 0 })

      /* ---------- Entry: the section scrolls in under the Hero ---------- */
      const entrySide = desktop ? DESKTOP_ENTRY : MOBILE_ENTRY
      const entry = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top bottom',
          end: 'top top',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
      entry
        .fromTo(lines, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power2.inOut' }, 0.1)
        // yPercent, not y: the pinned timeline owns y.
        .from(overline, { autoAlpha: 0, yPercent: 100, duration: 0.3, ease: 'power2.out' }, 0.35)
        .from(headline.querySelectorAll('[data-problem-line] > span'), { yPercent: 105, duration: 0.45, stagger: 0.1, ease: 'power3.out' }, 0.4)
      for (const [id, side] of Object.entries(entrySide) as Array<[ChipId, number]>) {
        entry.from(
          chip(id).querySelector('[data-enter]'),
          { x: () => side * 320 * k(), rotation: side * 6, autoAlpha: 0, duration: 0.55, ease: 'power2.out' },
          id === 'c1' || id === 'c4' ? 0.35 : 0.5,
        )
      }

      /* ---------- Pinned storyboard ---------- */
      const total = desktop ? DESKTOP_TIMES.D6 : MOBILE_TIMES.M4
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          pin: true,
          anticipatePin: 1,
          start: 'top top',
          end: () => `+=${(root.clientHeight * total) / 100}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
      // Timeline time = vh of pinned scroll / 100.
      const T = (vh: number) => vh / 100
      const span = (from: number, to: number) => ({ duration: T(to - from) })

      if (desktop) {
        const segments = DESKTOP_KEYS.slice(1).map((key, i) => ({
          from: DESKTOP_KEYS[i],
          to: key,
          // Arrive (in-out), drift (linear), reorganise (slow, precise), settle, exit.
          ease: ['power1.inOut', 'none', 'power3.out', 'power2.out', 'power2.inOut'][i],
        }))

        // Chips and echoes: interpolate the exact Figma poses.
        const layers: Array<[HTMLElement, Record<string, Pose>]> = [
          ...CHIP_ORDER.map((id): [HTMLElement, Record<string, Pose>] => [chip(id), desktopChipPoses[id]]),
          ...ECHO_IDS.map((id): [HTMLElement, Record<string, Pose>] => [one(`[data-echo="${id}"]`), desktopChipPoses[id]]),
        ]
        for (const [el, poses] of layers) {
          tl.set(el, pose(poses.D1), 0)
          for (const s of segments) {
            const from = DESKTOP_TIMES[s.from]
            tl.to(el, { ...pose(poses[s.to]), ...span(from, DESKTOP_TIMES[s.to]), ease: s.ease }, T(from))
          }
        }

        // D6 restacks the four survivors front-to-back: Receita on top.
        const restack = (zIndex: (i: number) => number, at: number) =>
          (['c4', 'c1', 'c5', 'c2'] as const).forEach((id, i) => tl.set(chip(id), { zIndex: zIndex(i) }, T(at)))
        restack(() => 0, 0)
        restack((i) => 4 - i, 181)

        // The line: tangled (Hero handoff) → chaos → calm → straight → converge.
        const main = one<SVGPathElement>('[data-line="main"]')
        const fine = one<SVGPathElement>('[data-line="fine"]')
        const converge = q<SVGPathElement>('[data-line="converge"]')
        const morph = (path: SVGPathElement, shapes: Partial<Record<string, string>>, styles: Record<string, readonly number[]>) => {
          tl.set(path, { opacity: styles.D1[0], attr: { 'stroke-width': styles.D1[1] } }, 0)
          for (const s of segments) {
            const shape = shapes[s.to]
            const [opacity, width] = styles[s.to]
            tl.to(
              path,
              { ...(shape ? { morphSVG: shape } : {}), opacity, attr: { 'stroke-width': width }, ...span(DESKTOP_TIMES[s.from], DESKTOP_TIMES[s.to]), ease: s.ease },
              T(DESKTOP_TIMES[s.from]),
            )
          }
        }
        morph(main, desktopLines.main, desktopLineStyle.main)
        morph(fine, desktopLines.fine, desktopLineStyle.fine)
        tl.set(converge, { strokeDasharray: 1, strokeDashoffset: 1 }, 0).to(
          converge,
          { strokeDashoffset: 0, ...span(185, 240), ease: 'power2.inOut' },
          T(185),
        )

        // Headline and overline leave as the pin begins.
        tl.set(headline, at(310, 1), 0)
          .to(headline, { ...at(190, 0), ...span(0, 24), ease: 'power1.in' }, 0)
          .set(overline, { y: () => 160 * sy() }, 0)
          .to(overline, { y: () => 112 * sy(), autoAlpha: 0, ...span(0, 20), ease: 'power1.in' }, 0)

        // Questions cross-fade in the clear centre (30% overlap, 24px drift).
        const [q1, q2, q3] = questions
        tl.set(questions, at(560, 0), 0)
          .to(q1, { ...at(480, 1), ...span(12, 27), ease: 'power2.out' }, T(12))
          .to(q1, { ...at(420, 0), ...span(50, 66), ease: 'power1.in' }, T(50))
          .to(q2, { ...at(480, 1), ...span(52, 68), ease: 'power2.out' }, T(52))
          .to(q2, { ...at(390, 0.16), ...span(80, 92), ease: 'power1.in' }, T(80))
          .to(q2, { opacity: 0, ...span(92, 104) }, T(92))
          .to(q3, { ...at(480, 1), ...span(76, 90), ease: 'power2.out' }, T(76))
          .to(q3, { ...at(420, 0), ...span(106, 122), ease: 'power1.in' }, T(106))

        // Halo behind the questions.
        tl.set(halo, { y: () => 490 * sy(), opacity: 0 }, 0)
          .to(halo, { opacity: 1, ...span(10, 27) }, T(10))
          .to(halo, { opacity: 0, ...span(135, 160) }, T(135))

        // Resolution message: D4 hint → D5 → D6 ghost.
        tl.set(message, at(388.5, 0), 0)
          .to(message, { ...at(378.5, 0.3), ...span(120, 135) }, T(120))
          .to(message, { ...at(358.5, 1), ...span(135, 180), ease: 'power2.out' }, T(135))
          .to(message, { ...at(198.5, 0.22), ...span(180, 240), ease: 'power2.inOut' }, T(180))

        // Pin progress: three steps, one per question.
        tl.set(rail, { y: () => 896 * sy(), autoAlpha: 0 }, 0)
          .to(rail, { autoAlpha: 1, ...span(10, 27) }, T(10))
          .to(rail, { autoAlpha: 0, ...span(135, 170) }, T(135))
          .set(railFill, { scaleX: 0 }, 0)
          .to(railFill[0], { scaleX: 1, ...span(0, 27) }, 0)
          .to(railFill[1], { scaleX: 1, ...span(27, 60) }, T(27))
          .to(railFill[2], { scaleX: 1, ...span(60, 90) }, T(60))

        // Exit: lavender rises and Section 03 is named.
        tl.to(washBottom, { opacity: 1, ...span(180, 240) }, T(180))
          .set(next, { y: () => 1000 * sy(), autoAlpha: 0 }, 0)
          .to(next, { y: () => 905 * sy(), autoAlpha: 0.8, ...span(200, 240), ease: 'power2.out' }, T(200))
      } else {
        const hidden = CHIP_ORDER.filter((id) => !MOBILE_CHIPS.includes(id))
        gsap.set([...hidden.map(chip), ...q('[data-echo]')], { autoAlpha: 0 })

        const { M1, M2, hold, M3, M4 } = MOBILE_TIMES
        const segments = [
          { from: M1, to: M2, key: 'M2', ease: 'power1.inOut' },
          { from: hold, to: M3, key: 'M3', ease: 'power3.out' },
          { from: M3, to: M4, key: 'M4', ease: 'power2.inOut' },
        ] as const

        for (const id of MOBILE_CHIPS) {
          const poses = mobileChipPoses[id]!
          const el = chip(id)
          tl.set(el, pose(poses.M1), 0)
          for (const s of segments) tl.to(el, { ...pose(poses[s.key]), ...span(s.from, s.to), ease: s.ease }, T(s.from))
        }
        MOBILE_COLUMN.forEach((id, i) => tl.set(chip(id), { zIndex: 0 }, 0).set(chip(id), { zIndex: 4 - i }, T(M3 + 1)))

        // M3 lines the column up at an even width, M4 lets the stack hug again.
        const column = MOBILE_COLUMN.map((id) => chip(id).querySelector('[data-enter] > div'))
        tl.set(column, { minWidth: 300 }, 0)
          .to(column, { minWidth: MOBILE_COLUMN_WIDTH, ...span(hold, M3), ease: 'power3.out' }, T(hold))
          .to(column, { minWidth: 300, ...span(M3, M4), ease: 'power2.inOut' }, T(M3))

        const main = linesMobile.querySelector('path')!
        tl.set(main, { opacity: 1, attr: { 'stroke-width': 1.25 } }, 0)
          .to(main, { morphSVG: mobileLines.M2, opacity: 0.6, attr: { 'stroke-width': 1 }, ...span(M1, M2), ease: 'power1.inOut' }, 0)
          .to(main, { morphSVG: mobileLines.M3, opacity: 1, attr: { 'stroke-width': 2 }, ...span(hold, M3), ease: 'power3.out' }, T(hold))
          .to(main, { morphSVG: mobileLines.M4, ...span(M3, M4), ease: 'power2.inOut' }, T(M3))

        tl.set(headline, at(240, 1), 0)
          .to(headline, { ...at(174, 0), ...span(0, 14), ease: 'power1.in' }, 0)
          .set(overline, { y: () => 150 * sy() }, 0)
          .to(overline, { autoAlpha: 0, ...span(0, 12) }, 0)

        // One question at a time, centred between the two chip bands.
        const windows = [
          [4, 16, 24, 34],
          [32, 44, 60, 70],
          [66, 78, 88, 98],
        ]
        tl.set(questions, at(470, 0), 0)
        questions.forEach((question, i) => {
          const [inStart, inEnd, outStart, outEnd] = windows[i]
          tl.to(question, { ...at(430, 1), ...span(inStart, inEnd), ease: 'power2.out' }, T(inStart)).to(
            question,
            { ...at(390, 0), ...span(outStart, outEnd), ease: 'power1.in' },
            T(outStart),
          )
        })

        tl.set(halo, { y: () => 450 * sy(), opacity: 0 }, 0)
          .to(halo, { opacity: 1, ...span(4, 16) }, T(4))
          .to(halo, { opacity: 0, ...span(92, 104) }, T(92))

        tl.set(message, at(269, 0), 0)
          .to(message, { ...at(219, 1), ...span(96, M3), ease: 'power2.out' }, T(96))
          .to(message, { ...at(165, 0.22), ...span(M3, M4), ease: 'power2.inOut' }, T(M3))

        tl.set(rail, { y: () => 856 * sy(), autoAlpha: 0 }, 0)
          .to(rail, { autoAlpha: 1, ...span(4, 16) }, T(4))
          .to(rail, { autoAlpha: 0, ...span(92, 104) }, T(92))
          .set(railFill, { scaleX: 0 }, 0)
          .to(railFill[0], { scaleX: 1, ...span(0, 34) }, 0)
          .to(railFill[1], { scaleX: 1, ...span(34, 70) }, T(34))
          .to(railFill[2], { scaleX: 1, ...span(70, 98) }, T(70))

        tl.to(washBottom, { opacity: 1, ...span(M3, M4) }, T(M3))
          .set(next, { y: () => 920 * sy(), autoAlpha: 0 }, 0)
          .to(next, { y: () => 820 * sy(), autoAlpha: 0.8, ...span(130, M4), ease: 'power2.out' }, T(130))
      }

      return () => resize.disconnect()
    })

    // Web fonts change chip widths and line heights.
    let cancelled = false
    document.fonts?.ready.then(() => !cancelled && ScrollTrigger.refresh())

    return () => {
      cancelled = true
      mm.revert()
    }
  }, [rootRef])
}
