import type { MouseEvent } from 'react'
import type { SectionId } from '../config/navigation'

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Smoothly scrolls to a landing section. Returns false (and does nothing)
 * when the section has not been implemented yet.
 */
export function scrollToSection(id: SectionId): boolean {
  const target = document.getElementById(id)
  if (!target) return false
  target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
  return true
}

/** Click handler for `<a href="#section">` links that skips missing targets. */
export function handleSectionLinkClick(event: MouseEvent<HTMLAnchorElement>, id: SectionId) {
  if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
  event.preventDefault()
  scrollToSection(id)
}
