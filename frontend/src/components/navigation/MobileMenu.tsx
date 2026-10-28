import { ChevronRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { NAV_LINKS, PENDING_ROUTES } from '../../config/navigation'
import { handleSectionLinkClick } from '../../lib/scroll'
import { Logo } from '../brand/Logo'
import { Button } from '../ui/Button'
import { IconButton } from '../ui/IconButton'

type MobileMenuProps = {
  id: string
  open: boolean
  onClose: () => void
}

const FOCUSABLE = 'a[href], button:not([disabled])'

/** Top sheet + scrim used below 768px (Figma: "Hero — Mobile 390 · Menu aberto"). */
export function MobileMenu({ id, open, onClose }: MobileMenuProps) {
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const sheet = sheetRef.current
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'

    // Focus the first link, not the close button, so the list is announced first.
    sheet?.querySelector<HTMLElement>('[data-menu-link]')?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !sheet) return
      const items = Array.from(sheet.querySelectorAll<HTMLElement>(FOCUSABLE))
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    // Leaving the mobile breakpoint while open would strand the scroll lock.
    const desktop = window.matchMedia('(min-width: 768px)')
    const onBreakpoint = (event: MediaQueryListEvent) => event.matches && onClose()

    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onBreakpoint)
    return () => {
      root.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [open, onClose])

  return (
    <div className="md:hidden" data-state={open ? 'open' : 'closed'}>
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 bg-scrim motion-reduce:transition-none ${
          open
            ? 'visible opacity-100 [transition:opacity_300ms_ease-out]'
            : 'invisible opacity-0 [transition:opacity_300ms_ease-out,visibility_0s_300ms]'
        }`}
      />
      <div
        ref={sheetRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        // Visibility flips instantly on open (so focus can move in) and only after the slide on close.
        className={`fixed inset-x-0 top-0 rounded-b-[28px] bg-surface px-5 pb-6 pt-4 shadow-floating motion-reduce:transition-none ${
          open
            ? 'visible translate-y-0 [transition:translate_400ms_var(--ease-out-expo)]'
            : 'invisible -translate-y-full [transition:translate_400ms_var(--ease-out-expo),visibility_0s_400ms]'
        }`}
      >
        <div className="flex h-14 items-center justify-between">
          <Logo />
          <IconButton label="Fechar menu" onClick={onClose}>
            <X aria-hidden size={20} strokeWidth={2} />
          </IconButton>
        </div>

        <ul className="mt-5">
          {NAV_LINKS.map((link) => (
            <li key={link.section} className="border-b border-line">
              <a
                data-menu-link
                href={`#${link.section}`}
                onClick={(event) => {
                  handleSectionLinkClick(event, link.section)
                  onClose()
                }}
                className="flex items-center justify-between rounded-lg py-3.5 text-[22px] font-bold leading-[1.25] tracking-[-0.02em] text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {link.label}
                <ChevronRight aria-hidden size={20} strokeWidth={2} className="text-ink-secondary" />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-3.5">
          <Button className="w-full" data-pending-route={PENDING_ROUTES.signUp}>
            Criar conta
          </Button>
          <Button variant="secondary" className="w-full" data-pending-route={PENDING_ROUTES.signIn}>
            Entrar
          </Button>
        </div>
      </div>
    </div>
  )
}
