# Orby Finance Flow — Claude Instructions

## 1. Project Overview

Orby Finance Flow is a personal finance management application focused on simplicity, clarity, and an intuitive user experience.

The application allows users to manage income, expenses, categories, and fictional payment cards, providing a clear overview of their financial activity.

### Technology Stack

- Frontend: React, TypeScript, Vite
- Backend: Java 21, Spring Boot, PostgreSQL, Flyway
- Design: Figma
- Design tooling: Impeccable

This repository follows a monorepo structure with separate `frontend/`, `backend/`, and `docs/` directories.

## 2. Approved Visual Identity

**The visual direction has already been approved. Do not redefine it.**

The official creative direction is documented in:

`docs/design/visual-direction.md`

Preserve the established:

- Brand color palette and approved color values
- Typography and font families
- Brand personality and overall aesthetic identity

The objective is to rebuild the **design system**, not the brand identity.

The previous design system components and layouts are not mandatory.

If any approved color or typography specification is missing, report it instead of inventing a replacement.

## 3. Visual References — Mandatory

The new design system must be based on actual visual references, not exclusively on written descriptions.

Reference documentation:

- `docs/design/references.md`
- `docs/design/motion.md`

Local visual assets:

- `frontend/references/landing/`
- `frontend/references/dashboard/`
- `frontend/references/motion/`

Before starting any visual design task:

1. Locate the relevant reference files.
2. Open and inspect the actual images.
3. Review the relevant website and motion links.
4. Identify visual patterns and design characteristics.
5. Explain how the references will influence the proposed design.

**Never claim to have inspected an image or website without accessing it.**

If a reference cannot be accessed, explicitly report the limitation before proceeding.

Avoid generic SaaS layouts that ignore the provided visual references.

## 4. Design Workflow

Follow this sequence:

### Phase 01 — Reference Validation

- Verify that the reference images are accessible.
- Check the reference documentation.
- Review the existing approved visual direction.
- Verify that Impeccable is available.
- Report missing assets, broken paths, or conflicting instructions.

Do not create designs during this phase.

### Phase 02 — Design System

After approval:

- Analyze the actual visual references.
- Use the approved brand identity.
- Apply Impeccable where appropriate.
- Define design tokens, typography scales, spacing, surfaces, buttons, inputs, cards, navigation, charts, and component states.
- Consider accessibility and responsive behavior.

Present the proposed design system for review.

Do not implement frontend code.

### Phase 03 — Landing Page Design

After design system approval:

- Work section by section.
- Follow the approved Landing Page structure in `docs/frontend-scope.md`.
- Use relevant visual and motion references.
- Create and refine designs before implementation.
- Obtain approval before moving to the next section.

### Phase 04 — Frontend Implementation

Only after explicit approval:

- Implement approved designs using React, TypeScript, and Vite.
- Maintain consistency with the design system.
- Implement approved interactions and transitions.
- Validate responsiveness and accessibility.

Never start implementation merely because a design is complete.

## 5. Motion and Interactions

Use `docs/design/motion.md` as the source for animation and interaction references.

Motion must be intentional and should support the user experience.

Analyze the reference behavior before proposing an implementation.

Avoid unnecessary effects, excessive animations, and movement that compromises usability.

Consider reduced-motion accessibility preferences.

Motion planning does not authorize implementation.

## 6. Backend Boundaries

Backend domain specifications are documented in:

`docs/backend/domain.md`

The backend is primarily developed and controlled by the project owner.

**Do not create, modify, refactor, or delete backend application code without explicit approval.**

Frontend designs must respect the actual MVP functionality and business rules.

Do not invent banking integrations, complex credit management, installments, invoices, or other unapproved product features.

## 7. Context and Token Efficiency

Minimize unnecessary context consumption.

- Read only files relevant to the current task.
- Do not read the entire repository automatically.
- Do not repeatedly analyze unchanged references.
- Avoid generating large reports without being asked.
- Keep explanations concise and actionable.
- Reuse confirmed decisions from the documentation.
- Do not create additional Markdown documents unless necessary and approved.
- Do not perform unrelated work.

For a Landing Page section, read only its applicable references, the approved visual direction, and the necessary scope documentation.

## 8. Tools and Permissions

Use the installed Impeccable skill when relevant to visual design and UI quality.

Do not reinstall Impeccable without confirming that the existing installation is unusable.

Use Figma when available and authorized.

Do not install dependencies, modify security configurations, or execute destructive commands without approval.

Before Git operations, inspect the repository status.

Do not commit, push, merge, force-push, or delete branches unless explicitly authorized for the current workflow.

Never overwrite existing backend work during a design reset.

## 9. Current Project Status

- Brand identity: Approved — preserve
- Visual references: Pending verification
- Motion references: Documented — verify accessibility
- Impeccable: Pending installation verification
- New design system: Not started
- Landing Page design: Not started
- Frontend implementation: Not authorized

**Current priority: Validate the environment and references before rebuilding the design system.**

Do not proceed to design or implementation until the reference audit has been completed and approved.
