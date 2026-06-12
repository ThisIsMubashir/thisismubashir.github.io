# 3D Portfolio Redesign — Design Spec

**Date:** 2026-06-12
**Status:** Approved by Mubashir (brainstorming session)
**Goal:** Elevate the personal academic portfolio to award-level quality with relevant 3D (Three.js via React Three Fiber) and motion (GSAP), while consolidating redundant content.

## Decisions made

| Decision | Choice |
|---|---|
| Treatment depth | Tasteful 3D accents (not full-immersive, not hero-only) |
| 3D hero concept | Network-on-Chip mesh — directly visualizes core research |
| Content cuts | Merge About + CV + Teaching into one `/about` page |
| Visual identity | Evolve identity (typography, palette, layout) alongside motion |
| Tech stack | React Three Fiber + drei + GSAP (ScrollTrigger, useGSAP) |
| Theme | Light theme only — no dark mode |

## 1. Visual identity

- **Typography:** Oversized display headings in Fraunces (fallback: Source Serif 4 Display) at 6–9rem for the homepage hero; Inter for body; JetBrains Mono for technical accents (section numbers `01/`, packet labels, BibTeX blocks).
- **Palette:** Warm paper-white base; deep ink charcoal text; single strong accent of **silicon copper/amber** (evoking copper chip interconnects) used for packets, links, hover states, and the timeline. No dark mode — remove `dark:` variants as components are touched.
- **Layout:** Asymmetric grids, large numbered section headers, generous whitespace, thin hairline rules echoing chip traces.

## 2. Network-on-Chip 3D hero (React Three Fiber)

- 4×4 mesh of rounded router nodes connected by thin interconnect lines, in 3D behind/beside hero text.
- Glowing packets continuously route between random node pairs using **XY-routing** (row first, then column). Nodes pulse softly on packet arrival.
- Gentle idle rotation; cursor parallax tilt; nodes near pointer brighten.
- **Loading strategy:** hero text renders statically first; canvas is a dynamically imported client component that fades in. Static gradient fallback for no-WebGL and `prefers-reduced-motion`.
- Replaces the existing `dot-field` component.

## 3. Motion system (GSAP)

- `@gsap/react` `useGSAP` + ScrollTrigger throughout.
- Hero headline: staggered line/word reveal on load.
- Section reveals: clip-path + translate, replacing the current `scroll-reveal` component.
- **About page career timeline:** SVG trace that draws itself on scroll with node milestones in the NoC visual language — second showpiece.
- Stat counters (publications count, years teaching, students supervised) count up on scroll into view.
- Page transitions: ~400ms packet-trace wipe overlay between routes (GSAP overlay, static-export compatible).

## 4. Information architecture

- **Merge About + CV + Teaching → `/about`:** intro → animated career timeline → teaching & supervision section → CV PDF download button.
- `/cv` and `/teaching` become thin redirect pages (meta-refresh + link; static-export safe).
- Nav: Home · About · Projects · Publications · Contact.
- Homepage flow: NoC hero → three research-area cards (hardware security, NoC design, AI in education) → featured projects/publications (unchanged) → contact CTA. Logo marquee retained.

## 5. Performance & accessibility guardrails

- three/R3F dynamically imported only on pages that use it (~170KB gzipped, post-first-paint).
- Canvas pauses when offscreen (`IntersectionObserver`) or tab hidden; mobile gets reduced node count and no postprocessing.
- `prefers-reduced-motion`: static hero render, instant section reveals, no packet animation.
- Budget: Lighthouse performance ≥ 90; text LCP unaffected by WebGL.
- Keyboard/screen-reader experience unchanged: canvas is `aria-hidden` decoration; all content remains semantic HTML.

## 6. Testing & verification

- `pnpm typecheck`, `pnpm lint`, and full `pnpm build` (static export + Pagefind) must pass.
- Manual checks: reduced-motion mode, mobile viewport, no-WebGL fallback, `/cv` and `/teaching` redirects, Pagefind search still indexes merged About content.

## Out of scope

- Dark mode (removed by policy).
- Sanity CMS migration (separate track in PROJECT_STATE).
- Blog/talks/now pages (Phase 5 backlog).
