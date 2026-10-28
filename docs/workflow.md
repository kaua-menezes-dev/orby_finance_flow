# Orby Finance Flow — Design Workflow

**Status:** Design system reconstruction  
**Current phase:** Environment and visual reference validation

## 1. Objective

Rebuild the Orby Finance Flow design system from scratch using the existing creative direction and the original visual references.

The previously generated design system and component layouts must not dictate the new result.

**We are not redesigning the brand identity.**

## 2. Required Documentation

Read only the files needed for the current phase.

Core documentation:

- `CLAUDE.md`
- `docs/design/visual-direction.md`
- `docs/design/references.md`
- `docs/design/motion.md`

Product documentation, when necessary:

- `docs/product.md`
- `docs/frontend-scope.md`
- `docs/backend/domain.md`

Visual assets:

- `frontend/references/landing/`
- `frontend/references/dashboard/`
- `frontend/references/motion/`

Do not read unrelated files or scan the entire repository without a specific reason.

## 3. Phase 01 — Environment and Reference Validation

**Goal:** Confirm that the design environment is ready before consuming tokens on design exploration.

Tasks:

1. Validate the required documentation.
2. Verify that the established visual direction is documented.
3. Identify any unverified color or typography tokens.
4. List the actual reference images and their filenames.
5. Open and inspect the original screenshots.
6. Match each image with its entry in `references.md`.
7. Check the relevant website and motion links.
8. Verify that Impeccable is available.
9. Report missing files, broken paths, and contradictory instructions.

Deliver a concise validation report.

Do not create designs, components, code, or Figma screens during this phase.

**Stop and wait for approval before Phase 02.**

## 4. Phase 02 — New Design System

**Goal:** Create a new, cohesive visual design system.

Use the established brand direction combined with the actual visual references.

Apply Impeccable where appropriate.

Define and present:

- Color tokens and semantic roles.
- Typography scales and hierarchy.
- Spacing and layout foundations.
- Borders, surfaces, radii, and shadows.
- Buttons, inputs, forms, and feedback states.
- Navigation components.
- Financial cards and data presentation.
- Charts, especially modern line charts.
- Responsive behavior.
- Accessibility and interaction principles.

Reference-inspired component design is encouraged.

The previous design system components must not be reused automatically.

Maintain Orby's established colors, typography, and visual personality.

Show the proposed system for review before advancing.

**No React, TypeScript, CSS, or frontend implementation.**

## 5. Phase 03 — Landing Page Design

After design system approval, begin prototyping the Landing Page.

Follow the nine approved sections in:

`docs/frontend-scope.md`

Work on one section at a time.

For each section:

1. Identify its relevant visual references.
2. Inspect the corresponding screenshots.
3. Review applicable motion references.
4. Explain the proposed composition and interaction behavior.
5. Create the visual design using the approved design system.
6. Present the result for review and refinement.

Do not proceed to the next section without approval.

Do not implement React code during this phase.

## 6. Phase 04 — Frontend Implementation

Only begin implementation after explicit approval.

Use React, TypeScript, and Vite.

Follow the approved designs, visual identity, responsive behavior, and motion specifications.

Implement one approved section or functional area at a time.

Backend application code must remain untouched unless explicitly authorized.

## 7. Reference Handling Rules

Actual screenshots are the primary visual evidence.

Reference IDs and filenames are defined in:

`docs/design/references.md`

Never assume an image has been reviewed merely because its filename exists.

Never replace missing original references with unrelated generated images.

If an external reference is inaccessible, report the limitation rather than inventing its visual details.

Do not copy an entire reference website.

Extract meaningful visual characteristics and reinterpret them for Orby.

## 8. Motion Rules

Only use animations that enhance the experience.

Inspect the relevant demo before specifying an effect.

Consider scroll progression, interaction triggers, easing, responsive behavior, performance, and reduced-motion fallbacks.

Never introduce heavy effects solely for visual decoration.

## 9. Token Efficiency

To minimize unnecessary Claude Code usage:

- Do not repeatedly inspect unchanged images.
- Do not regenerate complete design directions.
- Do not perform large, unrelated repository scans.
- Do not generate multiple design variations unless requested.
- Keep analysis and reports concise.
- Work incrementally and stop at approval checkpoints.
- Do not create additional documentation files without approval.

## 10. Initial Claude Session Prompt

Use the following instructions for the first session:

---

We are restarting the Orby Finance Flow design system from scratch while preserving the existing brand identity.

The approved creative direction must remain intact.

Your immediate task is **Phase 01: Environment and Reference Validation only**.

Read the relevant project documentation and inspect the actual visual references.

Verify:

1. The existing creative direction and typography/color specifications.
2. All available Landing Page and Dashboard screenshots.
3. The relationship between reference IDs and actual filenames.
4. The documented motion and website references.
5. The Impeccable skill installation.

Produce a concise report containing:

- Environment readiness.
- Available and missing visual references.
- Any conflicting documentation.
- Confirmed visual patterns found in the screenshots.
- Reference accessibility.
- Unverified design specifications that need confirmation.

Do not propose alternative brand identities.

Do not create two new creative directions.

Do not generate a design system, UI screens, Figma designs, or implementation code yet.

Stop after the audit and wait for my approval.

---

## 11. Final Rule

**Reference validation → Design system → Landing Page design → Frontend implementation.**

Each phase requires approval before proceeding.

Preserve the approved creative direction and prioritize fidelity to the original visual references.
