import { Menu } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { NAV_LINKS, PENDING_ROUTES, SECTION_IDS } from '../../config/navigation'
import { handleSectionLinkClick } from '../../lib/scroll'
import { Logo } from '../brand/Logo'
import { Button } from '../ui/Button'
import { IconButton } from '../ui/IconButton'
import { MobileMenu } from './MobileMenu'

const navLinkClass =
  'rounded-full px-[18px] py-2.5 text-[14px] font-semibold leading-none text-ink-secondary ' +
  'transition-colors duration-200 hover:bg-brand-soft hover:text-on-brand-soft ' +
  'focus-visible:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

/**
 * Global landing navigation. Transparent over the hero; once the page
 * scrolls it gains a solid surface + hairline (no backdrop blur).
 */
export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    let frame = 0
    const update = () => {
      frame = 0
      header.dataset.scrolled = String(window.scrollY > 8)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }, [])

  return (
    <header ref={headerRef} data-site-header data-scrolled="false" className="group/header fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden
        className="absolute inset-0 border-b border-line bg-surface/95 opacity-0 transition-opacity duration-300 group-data-[scrolled=true]/header:opacity-100"
      />
      <nav
        aria-label="Principal"
        className="relative mx-auto flex h-[88px] max-w-[1440px] items-center px-5 md:h-[104px] md:px-8 xl:px-16"
      >
        <a
          href={`#${SECTION_IDS.top}`}
          onClick={(event) => handleSectionLinkClick(event, SECTION_IDS.top)}
          aria-label="Orby — voltar ao início"
          className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <Logo />
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full border border-line bg-surface p-[5px] shadow-tile md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.section}>
              <a
                href={`#${link.section}`}
                onClick={(event) => handleSectionLinkClick(event, link.section)}
                className={`block ${navLinkClass}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" data-pending-route={PENDING_ROUTES.signIn}>
            Entrar
          </Button>
          {/* Visibility lives on a wrapper: the button's own display utility would win over `hidden`. */}
          <span className="hidden md:contents">
            <Button size="sm" data-pending-route={PENDING_ROUTES.signUp}>
              Criar conta
            </Button>
          </span>
          <IconButton
            ref={menuButtonRef}
            label="Abrir menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <Menu aria-hidden size={20} strokeWidth={2} />
          </IconButton>
        </div>
      </nav>

      <MobileMenu id="mobile-menu" open={menuOpen} onClose={closeMenu} />
    </header>
  )
}
