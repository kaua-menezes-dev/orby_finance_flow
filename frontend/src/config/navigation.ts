/**
 * Landing navigation targets.
 *
 * Section anchors point at ids that the upcoming landing sections will own.
 * Until a section exists, `scrollToSection` simply does nothing, so no link
 * ever lands on a broken page.
 */
export const SECTION_IDS = {
  top: 'top',
  problem: 'o-problema',
  meetOrby: 'conheca-a-orby',
  features: 'recursos',
  howItWorks: 'como-funciona',
  faq: 'faq',
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]

export const NAV_LINKS: ReadonlyArray<{ label: string; section: SectionId }> = [
  { label: 'Como funciona', section: SECTION_IDS.howItWorks },
  { label: 'Recursos', section: SECTION_IDS.features },
  { label: 'FAQ', section: SECTION_IDS.faq },
]

/**
 * App routes are not implemented yet (auth and dashboard come in later
 * phases). Actions bound to them render as buttons and are tagged with
 * `data-pending-route` so they are easy to wire up.
 */
export const PENDING_ROUTES = {
  signIn: 'entrar',
  signUp: 'criar-conta',
} as const
