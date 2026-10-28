import orbUrl from '../../assets/brand/orb.svg'

/** Orb + wordmark lockup (Logo / Type=Full). */
export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <img src={orbUrl} alt="" width={26} height={26} className="size-[26px]" />
      <span className="text-[22px] font-extrabold leading-[1.25] tracking-[-0.03em] text-ink">Orby</span>
    </span>
  )
}
