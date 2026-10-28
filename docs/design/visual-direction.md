# Orby Finance Flow — Visual Direction

**Status:** Creative direction established — design system reconstruction  
**Purpose:** Preserve the existing brand identity while rebuilding the design system using real visual references.

## 1. Brand Identity

Orby Finance Flow is a modern personal finance management application focused on simplicity, clarity, and intuitive financial organization.

- **Brand:** Orby
- **Product:** Orby Finance Flow
- **Brand message:** Seu dinheiro em movimento.

The brand should communicate simplicity, confidence, sophistication, accessibility, and fluidity.

The intended experience is premium but approachable, visually expressive without unnecessary complexity.

**Do not create a new brand identity.**

## 2. Existing Creative Direction

The established creative direction is based on a light, minimal, spacious, and modern aesthetic with expressive typography and controlled use of gradients.

The original creative concept was explored under the name **Fluid Minimalism / Lavender Flow**.

Preserve these characteristics:

- Light backgrounds and generous negative space.
- Lavender and violet as recognizable brand accents.
- Strong typographic hierarchy.
- Refined contrasts and restrained gradients.
- Product-centered imagery and visual storytelling.
- Soft, elegant surfaces and thoughtful details.
- Modern, polished, and accessible visual language.

The Landing Page may be more expressive and editorial, while the Dashboard should remain restrained and functional.

## 3. Color Foundation

The following values come from the original Lavender Flow proposal. They are historical working references, not independently verified as the final approved design tokens.

| Role           | Reference |
| -------------- | --------- |
| Primary violet | `#8B7CF6` |
| Light lavender | `#B7AEFF` |
| Soft lavender  | `#EEEAFE` |
| Deep violet    | `#6254D8` |
| Background     | `#F8F8FC` |
| Surface        | `#FFFFFF` |
| Subtle border  | `#E7E7F0` |
| Main text      | `#17171D` |
| Secondary text | `#6B6B78` |
| Muted text     | `#9A9AA8` |

Previous accent proposals included mint, light blue, peach, and pink.

Before finalizing design tokens, verify these values against any previously approved specifications.

Do not introduce a completely different brand palette or silently assume these historical proposals were formally approved.

## 4. Typography Foundation

The original typography proposal used:

- **Plus Jakarta Sans:** Primary typography for interfaces, navigation, headings, and body text.
- **Cormorant Garamond:** Editorial accent typography for selected headings or emphasized words.

Preserve this typography direction unless the original approved specifications indicate otherwise.

The new design system may refine font sizes, weight distribution, line heights, spacing, and responsive typographic scales.

Avoid excessive decorative typography that compromises readability.

## 5. Landing Page Art Direction

The Landing Page should reflect the composition and visual sophistication of the actual screenshots provided in:

`frontend/references/landing/`

Design characteristics:

- Modern editorial compositions.
- Strong and carefully placed typography.
- Generous negative space.
- Strategic use of imagery, devices, and product mockups.
- Selective gradients and visual accents.
- Distinctive section compositions.
- Elegant transitions and scroll storytelling.

Use `docs/design/references.md` to understand the visual inspiration.

Avoid generic SaaS templates, repetitive layouts, and excessive card grids.

The references should influence composition and presentation while preserving Orby's own visual identity.

## 6. Dashboard Art Direction

The Dashboard should prioritize clarity, organization, and effortless financial management.

Use the actual screenshots inside:

`frontend/references/dashboard/`

The previously preferred pre-Liquid-Glass iOS aesthetic can inform the new design system, particularly its surfaces, component refinement, depth, and visual balance.

Focus on:

- Clean modular layouts.
- Subtle depth and rounded surfaces.
- Readable financial information.
- Modern, elegant line charts.
- Consistent component hierarchy.
- Clear interaction states.
- Accessibility and responsive behavior.

The previous Dashboard components are not mandatory. Rebuild them using the approved identity and new visual references.

## 7. Motion Direction

Motion should reinforce the concept of financial flow.

Use:

`docs/design/motion.md`

Motion should be smooth, intentional, and visually refined.

Explore scroll-triggered reveals, subtle parallax, component transitions, progressive visual storytelling, and restrained microinteractions.

Do not implement every referenced effect.

Motion must remain accessible, responsive, and performant.

## 8. Design System Reconstruction

The new design system must combine:

1. This document — established brand direction.
2. `docs/design/references.md` — original screenshots and visual inspiration.
3. `docs/design/motion.md` — interaction and animation references.
4. Impeccable — visual quality and design refinement.

The new design system may redefine component composition, spacing scales, surfaces, charts, controls, interactions, and responsive patterns.

It must not redefine the brand identity without explicit approval.

## 9. Core Rules

- Preserve Orby's established visual personality.
- Inspect the actual images before making design decisions.
- Use real references, not generic design assumptions.
- Do not reuse the previous design system as a mandatory component library.
- Do not invent product features unsupported by the MVP.
- Do not create React or CSS implementation code during design planning.
- Clearly report any missing or unverified approved brand specifications.

**Final principle: Preserve the visual identity. Rebuild the design system. Let the actual references guide the new interface design.**
