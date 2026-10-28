import { Button } from '../../components/ui/Button'
import { PENDING_ROUTES, SECTION_IDS } from '../../config/navigation'
import { handleSectionLinkClick } from '../../lib/scroll'

export function HeroCopy() {
  return (
    <div className="mx-auto flex max-w-[350px] flex-col items-center text-center md:max-w-none">
      <p
        data-hero-eyebrow
        className="flex items-center gap-2.5 text-[12px] font-semibold uppercase leading-[1.3] tracking-[0.14em] text-primary"
      >
        <span aria-hidden className="size-2 rounded-full bg-graphic" />
        Orby Finance Flow
      </p>

      <h1 id="hero-title" className="hero-title mt-4 md:mt-[22px]">
        <span className="hero-line" data-hero-line>
          <span className="hero-line__inner">Seu dinheiro</span>
        </span>
        <span className="hero-line" data-hero-line>
          <span className="hero-line__inner">
            em <em className="hero-title__accent">movimento.</em>
          </span>
        </span>
      </h1>

      <p
        data-hero-reveal
        className="mt-4 max-w-[320px] text-[15px] leading-[1.55] text-ink-secondary md:mt-6 md:max-w-[500px] md:text-[17px]"
      >
        Registre suas receitas e despesas, organize suas movimentações e visualize suas finanças em um só lugar.
      </p>

      <div data-hero-reveal className="mt-6 flex w-full flex-col gap-2.5 md:mt-8 md:w-auto md:flex-row md:gap-3">
        <Button trailingArrow className="w-full md:w-auto" data-pending-route={PENDING_ROUTES.signUp}>
          Começar agora
        </Button>
        <Button
          variant="secondary"
          href={`#${SECTION_IDS.meetOrby}`}
          onClick={(event) => handleSectionLinkClick(event, SECTION_IDS.meetOrby)}
          className="w-full md:w-auto"
        >
          Conhecer a Orby
        </Button>
      </div>
    </div>
  )
}
