import { useLayoutEffect, useRef, type RefObject } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import type { HeroLayerName } from './HeroStage'

type Wrapper = 'scroll' | 'parallax' | 'float' | 'enter'

/*
 * Hero choreography, following the Figma storyboards on "14 — Landing · 01 Hero":
 *
 * Entrance (~1.5 s)  00 canvas → 01 type rises in line masks → 02 ribbon wipes
 *                    in left→right while copy/CTAs arrive → 03 UI cards settle
 *                    from depth → 04 rest with idle float.
 * Interaction        layered cursor parallax (0.3× / 0.6× / 1×, max 12 px).
 * Scroll (scrubbed)  A 0% rest → B 30% camera pushes in → C 65% cards pass the
 *                    lens → 100% ribbon collapses into a line (handoff to 02).
 *
 * Everything lives in one gsap.matchMedia context: breakpoint changes and
 * unmount revert every tween, ScrollTrigger and listener.
 */
export function useHeroMotion(rootRef: RefObject<HTMLElement | null>) {
  // Survives StrictMode re-runs and breakpoint changes: the entrance plays once.
  const entered = useRef(false)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const header = document.querySelector<HTMLElement>('[data-site-header]')
    const mm = gsap.matchMedia()

    mm.add(
      {
        // matchMedia only runs the callback while at least one condition
        // matches, so desktop/mobile together guarantee it always runs.
        desktop: '(min-width: 768px)',
        mobile: '(max-width: 767.98px)',
        reduce: '(prefers-reduced-motion: reduce)',
        finePointer: '(hover: hover) and (pointer: fine)',
      },
      (context) => {
        const { desktop, reduce, finePointer } = context.conditions as Record<string, boolean>
        const q = gsap.utils.selector(root)
        const part = (name: HeroLayerName, wrapper: Wrapper) =>
          root.querySelector<HTMLElement>(`[data-hero-layer="${name}"] [data-${wrapper}]`)!

        if (reduce) {
          // Static composition, a single short fade, no scroll-driven effects.
          if (!entered.current) {
            gsap.from([root, header].filter(Boolean), {
              autoAlpha: 0,
              duration: 0.2,
              ease: 'none',
              onComplete: () => void (entered.current = true),
            })
          }
          return
        }

        const cards: HeroLayerName[] = desktop ? ['chart', 'balance', 'transactions'] : ['balance', 'transactions']
        const copy = q('[data-hero-copy]')
        const cue = q('[data-hero-cue]')

        /* ---------- Idle float (desktop only, paused off-screen) ---------- */
        const startIdle = () => {
          if (!desktop) return
          const loops = [
            gsap.to(part('chart', 'float'), { y: 5, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true }).progress(0.3),
            gsap.to(part('ribbon', 'float'), { y: 4, rotation: 1, duration: 8, ease: 'sine.inOut', repeat: -1, yoyo: true }),
            gsap.to(part('balance', 'float'), { y: -6, duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true }).progress(0.6),
            gsap.to(part('transactions', 'float'), { y: 6, duration: 7.5, ease: 'sine.inOut', repeat: -1, yoyo: true }).progress(0.15),
          ]
          ScrollTrigger.create({
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            onToggle: (self) => loops.forEach((loop) => loop.paused(!self.isActive)),
          })
        }

        /* ---------- Entrance ---------- */
        if (entered.current) {
          startIdle()
        } else {
          const ribbonEnter = part('ribbon', 'enter')
          const tl = gsap.timeline({
            defaults: { ease: 'expo.out' },
            onComplete: () => {
              entered.current = true
              context.add(startIdle)
            },
          })
          if (header) tl.from(header, { autoAlpha: 0, duration: 0.3, ease: 'power1.out' }, 0)
          tl.from(q('[data-hero-eyebrow]'), { autoAlpha: 0, y: 16, duration: 0.6 }, 0.05)
            .from(q('[data-hero-line] > *'), { yPercent: 105, duration: 0.9, stagger: 0.08 }, 0.1)
            .fromTo(
              ribbonEnter,
              { clipPath: 'inset(0% 100% 0% 0%)' },
              { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.inOut', clearProps: 'clipPath' },
              0.35,
            )
            .from(ribbonEnter, { x: -40, scale: 1.03, duration: 1.2, ease: 'power3.out' }, 0.35)
            .from(q('[data-hero-reveal]'), { autoAlpha: 0, y: 12, duration: 0.6, ease: 'power3.out', stagger: 0.08 }, 0.45)
            .from(
              cards.map((name) => part(name, 'enter')),
              { autoAlpha: 0, y: 40, scale: 0.96, duration: 0.7, ease: 'power3.out', stagger: 0.12 },
              0.9,
            )
          if (desktop) tl.from(cue, { autoAlpha: 0, duration: 0.4, ease: 'none' }, 1.4)
        }

        /* ---------- Cursor parallax ---------- */
        let onPointerMove: ((event: PointerEvent) => void) | undefined
        if (desktop && finePointer) {
          const depth: Array<{ name: HeroLayerName; k: number; tilt?: number }> = [
            { name: 'chart', k: 4 },
            { name: 'ribbon', k: 8, tilt: 1.5 },
            { name: 'transactions', k: 8 },
            { name: 'balance', k: 12 },
          ]
          const follow = { duration: 0.9, ease: 'power3.out' }
          const setters = depth.map(({ name, k, tilt }) => {
            const el = part(name, 'parallax')
            return {
              k,
              tilt,
              x: gsap.quickTo(el, 'x', follow),
              y: gsap.quickTo(el, 'y', follow),
              rotation: tilt ? gsap.quickTo(el, 'rotation', follow) : undefined,
            }
          })
          onPointerMove = (event) => {
            if (event.pointerType !== 'mouse') return
            const nx = (event.clientX / window.innerWidth) * 2 - 1
            const ny = (event.clientY / window.innerHeight) * 2 - 1
            for (const s of setters) {
              s.x(nx * s.k)
              s.y(ny * s.k)
              s.rotation?.(nx * (s.tilt ?? 0))
            }
          }
          window.addEventListener('pointermove', onPointerMove, { passive: true })
        }

        /* ---------- Scroll storyboard ---------- */
        // The storyboard states are viewport-framed, so the hero holds briefly
        // (≈ 0.8 viewport desktop / 0.5 mobile) once its bottom edge reaches the
        // viewport, scrubbed by native scroll. Shorter heroes hold from the top.
        const holdStart = () => Math.max(0, root.offsetHeight - window.innerHeight)
        const scroll = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root,
            pin: true,
            anticipatePin: 1,
            start: holdStart,
            end: () => holdStart() + window.innerHeight * (desktop ? 0.8 : 0.5),
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
        const ribbon = part('ribbon', 'scroll')
        const balance = part('balance', 'scroll')
        const transactions = part('transactions', 'scroll')

        if (desktop) {
          const chart = part('chart', 'scroll')
          scroll
            .to(copy, { y: -90, autoAlpha: 0.2, duration: 0.3 }, 0)
            .to(copy, { y: -160, autoAlpha: 0, duration: 0.2 }, 0.3)
            .to(cue, { autoAlpha: 0, duration: 0.1 }, 0)
            // Ribbon: push-in, fill the frame, then collapse into a line.
            .to(ribbon, { scale: 1.25, duration: 0.3 }, 0)
            .to(ribbon, { scale: 1.9, y: -80, duration: 0.35 }, 0.3)
            .to(ribbon, { scaleX: 2.2, scaleY: 0.12, y: 40, autoAlpha: 0, duration: 0.35 }, 0.65)
            // Cards move apart in depth and pass the camera.
            .to(balance, { x: -70, y: -20, scale: 1.12, duration: 0.3 }, 0)
            .to(balance, { x: -330, y: 40, scale: 1.45, autoAlpha: 0.35, duration: 0.35 }, 0.3)
            .to(balance, { x: -420, autoAlpha: 0, duration: 0.35 }, 0.65)
            .to(chart, { x: 70, y: -30, scale: 1.1, duration: 0.3 }, 0)
            .to(chart, { x: 360, y: 0, scale: 1.4, autoAlpha: 0.3, duration: 0.35 }, 0.3)
            .to(chart, { x: 440, autoAlpha: 0, duration: 0.35 }, 0.65)
            .to(transactions, { y: 60, scale: 1.1, duration: 0.3 }, 0)
            .to(transactions, { y: 300, scale: 1.4, autoAlpha: 0.2, duration: 0.35 }, 0.3)
            .to(transactions, { autoAlpha: 0, duration: 0.35 }, 0.65)
        } else {
          // Mobile: simplified — copy and cards fade, ribbon scales 1 → 1.3.
          scroll
            .to(copy, { y: -40, autoAlpha: 0, duration: 0.4 }, 0)
            .to([balance, transactions], { y: -20, autoAlpha: 0, duration: 0.5, stagger: 0.05 }, 0.1)
            .to(ribbon, { scale: 1.3, duration: 1 }, 0)
            .to(ribbon, { autoAlpha: 0, duration: 0.3 }, 0.7)
        }

        return () => {
          if (onPointerMove) window.removeEventListener('pointermove', onPointerMove)
        }
      },
      root,
    )

    // Web fonts change the copy height, and with it every trigger position.
    let cancelled = false
    document.fonts?.ready.then(() => !cancelled && ScrollTrigger.refresh())

    return () => {
      cancelled = true
      mm.revert()
    }
  }, [rootRef])
}
