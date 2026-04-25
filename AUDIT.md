# Portfolio Site Audit

Audit date: 2026-04-25  
Scope: Home, About, Experience, Projects, Skills, shared layout, theme system, and reusable UI components.  
Design context: calm, precise, capable; dark SaaS/editorial default; no purple glow portfolio cliches, gradient text, blobs, side-stripe accents, metric-card templates, or decorative card overload.

## Audit Health Score

| # | Dimension | Score | Key Finding |
|---|---|---:|---|
| 1 | Accessibility | 2/4 | Carousel controls and dots are under-labeled or too small; route metadata is not unique; reduced-motion support is missing. |
| 2 | Performance | 2/4 | Build fails, lint fails, and repeated inline hover handlers create unnecessary client-side style mutation. |
| 3 | Responsive Design | 2/4 | Mobile navigation and carousel controls are below ideal 44px touch size; project grids become long repetitive feeds. |
| 4 | Theming | 1/4 | Dark design intent exists, but the app defaults to light and most components hard-code light colors. |
| 5 | Anti-Patterns | 1/4 | Automated scan flags repeated bounce easing and pure black utility usage; visual system leans toward generic Notion-light card repetition. |
| **Total** |  | **8/20** | **Poor: major remediation needed before redesign polish.** |

## Anti-Patterns Verdict

The site does not look like the worst AI portfolio pattern, because it avoids gradient text, purple glow backgrounds, blob decorations, and oversized hero metric cards. However, it still carries several recognizable AI/product-template tells:

- The stated brand direction is dark SaaS/editorial, but the shipped UI is mostly a Notion-light imitation.
- Many sections rely on the same white card, whisper border, soft shadow, hover-lift recipe.
- Motion uses a repeated overshooting spring curve, which the detector flags as bounce/elastic easing.
- Project cards use faux OS window chrome that reads decorative rather than informative.
- Inline metrics, badge pills, tech tag clouds, and repeated cards compete with the portfolio's stronger story.
- Hover behavior is implemented with repeated `onMouseEnter` / `onMouseLeave` style mutation instead of a cohesive interaction system.

Automated `npx impeccable --json src` findings:

- `bounce-easing`: `src/app/globals.css`, `src/components/ui/FadeIn.tsx`, `src/components/home/HeroSection.tsx`, `src/components/experience/ExperienceCard.tsx`, `src/components/projects/ProjectCard.tsx`, `src/components/projects/CertificationsGrid.tsx`.
- `pure-black-white`: black utility usage in hover/backdrop classes in `src/components/layout/Sidebar.tsx`, `src/components/layout/MobileSidebar.tsx`, and `src/components/ui/sheet.tsx`.

## Executive Summary

- Audit Health Score: **8/20**.
- Severity count: **P0: 2**, **P1: 7**, **P2: 9**, **P3: 5**.
- Highest priority: fix build/lint blockers, align the theme with the actual design context, and replace repeated AI-pattern interaction styling with a disciplined token/component system.
- The strongest current assets are the real project screenshots, clear role history, concise bio, and the existing design context in `.impeccable.md`.

## Detailed Findings

### P0 Blocking

#### P0: Production build fails

- **Location:** `src/components/ui/FadeIn.tsx:48`
- **Category:** Build / TypeScript
- **Evidence:** `npm run build` fails with `Expression produces a union type that is too complex to represent`.
- **Impact:** The site cannot be shipped as a production build.
- **Recommendation:** Replace the dynamic intrinsic `Tag` typing with a simpler, supported polymorphic pattern or constrain `FadeIn` to a small set of tags used by the app.
- **Suggested command:** `/harden`

#### P0: Lint fails

- **Location:** `src/components/layout/ThemeToggle.tsx:12`
- **Category:** Performance / React correctness
- **Evidence:** `npm run lint` fails on `react-hooks/set-state-in-effect` for synchronous `setMounted(true)` in an effect.
- **Impact:** CI quality gate fails and hydration handling is fragile.
- **Recommendation:** Use a hydration-safe theme toggle pattern that avoids synchronous state mutation in an effect, or render a stable button shell until `next-themes` resolves.
- **Suggested command:** `/harden`

### P1 Major

#### P1: Default theme contradicts design context

- **Location:** `src/app/layout.tsx:38`, `.impeccable.md`
- **Category:** Theming / UX direction
- **Impact:** The portfolio presents as a light Notion-inspired site even though the approved direction is dark SaaS/editorial.
- **Recommendation:** Set dark as the default theme and make light mode a supported alternate, not the primary visual identity.
- **Suggested command:** `/colorize`

#### P1: Components bypass theme tokens

- **Location:** Most section components, especially `HeroSection`, `Sidebar`, `AboutSection`, `ProjectsSection`, `ProjectCard`, `ExperienceCard`, `TechStackSection`
- **Category:** Theming / Maintainability
- **Impact:** Theme toggle cannot reliably update the UI because many foreground, background, border, and shadow values are hard-coded.
- **Recommendation:** Move shared surfaces, text colors, border colors, shadows, and motion curves into CSS variables and Tailwind token usage.
- **Suggested command:** `/harden`

#### P1: Carousel controls lack accessible labels

- **Location:** `src/components/projects/ImageCarousel.tsx:28`, `src/components/projects/ImageCarousel.tsx:36`, `src/components/projects/ImageCarousel.tsx:48`
- **Category:** Accessibility
- **WCAG/Standard:** WCAG 2.2 4.1.2 Name, Role, Value
- **Impact:** Screen reader users encounter unlabeled controls for previous, next, and dot pagination.
- **Recommendation:** Add descriptive labels such as `Previous screenshot`, `Next screenshot`, and `Go to screenshot N of M`; expose current state with `aria-current` or `aria-pressed`.
- **Suggested command:** `/audit`

#### P1: Touch targets are too small

- **Location:** `ImageCarousel` 28px controls/dots, `MobileSidebar` 32px menu, `Sidebar` 32px social links
- **Category:** Accessibility / Responsive
- **WCAG/Standard:** WCAG 2.2 target size guidance
- **Impact:** Mobile and motor-impaired users have less reliable tap targets.
- **Recommendation:** Standardize interactive targets at 44px minimum on touch viewports and keep visual icons restrained inside those targets.
- **Suggested command:** `/adapt`

#### P1: Motion ignores reduced-motion preference

- **Location:** `FadeIn`, `TypingAnimation`, availability pulse, hover-lift cards
- **Category:** Accessibility / Motion
- **WCAG/Standard:** WCAG 2.3.3 Animation from Interactions; prefers-reduced-motion best practice
- **Impact:** Continuous typing, cursor blinking, pulsing indicators, and scroll reveals can distract or discomfort motion-sensitive users.
- **Recommendation:** Add `prefers-reduced-motion` handling that disables typing loops, pulse animation, and entrance transitions.
- **Suggested command:** `/animate`

#### P1: Project content is dense and repetitive

- **Location:** `src/components/projects/ProjectCard.tsx`, project copy in `src/data/portfolio.ts`
- **Category:** Content presentation / Information architecture
- **Impact:** Recruiters and clients must parse long paragraphs and many pills to understand impact.
- **Recommendation:** Reframe each project around problem, role/contribution, outcome, and representative stack; reduce visible tags to the few most meaningful tools.
- **Suggested command:** `/clarify`

#### P1: Page metadata is not route-specific

- **Location:** `src/app/layout.tsx`
- **Category:** Accessibility / SEO / Route announcement
- **Impact:** Next.js route announcer relies on title, then `h1`, then pathname; every route currently inherits the same global title.
- **Recommendation:** Add descriptive metadata per page, or use route-level metadata exports for About, Experience, Projects, and Skills.
- **Suggested command:** `/harden`

### P2 Minor

#### P2: Heading hierarchy starts at `h2` on subpages

- **Location:** `AboutSection`, `ExperienceSection`, `ProjectsSection`, `TechStackSection`
- **Category:** Accessibility / Semantics
- **Impact:** Each standalone route visually starts with a main heading but semantically skips `h1`.
- **Recommendation:** Use `h1` for each route's primary heading and reserve `h2` for subsection groups.
- **Suggested command:** `/audit`

#### P2: Hero typing animation competes with positioning

- **Location:** `src/components/home/HeroSection.tsx:79`, `src/components/home/TypingAnimation.tsx`
- **Category:** Visual hierarchy / Motion
- **Impact:** The changing text attracts attention away from the stable value proposition.
- **Recommendation:** Make it smaller and calmer, pause after one cycle, or replace it with a static capability line.
- **Suggested command:** `/distill`

#### P2: Repeated card shadows flatten the visual rhythm

- **Location:** `ProjectCard`, `ExperienceCard`, `TechStackSection`, `CertificationsGrid`, hero avatar
- **Category:** Layout / Anti-pattern
- **Impact:** Everything feels equally contained, so the most important work does not stand out.
- **Recommendation:** Use fewer cards, flatter list treatments for experience/skills, and reserve elevated containers for featured project evidence.
- **Suggested command:** `/layout`

#### P2: Faux OS chrome is decorative

- **Location:** `src/components/projects/ProjectCard.tsx:35`
- **Category:** Anti-pattern / Visual design
- **Impact:** It consumes space and suggests product UI without adding meaning.
- **Recommendation:** Remove the chrome or replace it with useful screenshot context such as product area, year, or case type.
- **Suggested command:** `/distill`

#### P2: Inline event handlers duplicate interaction logic

- **Location:** `HeroSection`, `Sidebar`, `ExperienceCard`, `ProjectCard`, `TechStackSection`, `CertificationsGrid`
- **Category:** Performance / Maintainability
- **Impact:** Interaction behavior is harder to audit, theme, and keep consistent.
- **Recommendation:** Move hover/active/focus states into CSS classes or component variants using shared motion tokens.
- **Suggested command:** `/harden`

#### P2: Light-only separators and surfaces break dark mode

- **Location:** `Sidebar`, `MobileSidebar`, section backgrounds, card surfaces
- **Category:** Theming
- **Impact:** Switching to dark mode leaves many light surfaces in place.
- **Recommendation:** Use semantic tokens for surface, panel, border, muted text, and active states.
- **Suggested command:** `/colorize`

#### P2: Skills section reads as a tag inventory

- **Location:** `src/components/skills/TechStackSection.tsx`
- **Category:** Information architecture
- **Impact:** The section lists tools but does not clearly show capability depth or relevance.
- **Recommendation:** Group tools by job-to-be-done and add short capability labels where useful.
- **Suggested command:** `/clarify`

#### P2: Certifications lack hierarchy

- **Location:** `src/components/projects/CertificationsGrid.tsx`
- **Category:** Content presentation
- **Impact:** Badges and certificates feel appended to Projects rather than intentionally organized.
- **Recommendation:** Separate credentials into a compact evidence section with clearer labels, dates if available, and external-link affordances that do not rely on hover.
- **Suggested command:** `/layout`

#### P2: Metadata and route structure underuse Next.js accessibility support

- **Location:** `src/app/*/page.tsx`
- **Category:** Accessibility / Framework usage
- **Impact:** Next.js route announcements are less descriptive than they could be.
- **Recommendation:** Add route-level metadata and clear page-level `h1` text for each route.
- **Suggested command:** `/harden`

### P3 Polish

#### P3: Current availability pulse loops indefinitely

- **Location:** `Sidebar`, `MobileSidebar`
- **Category:** Motion / Polish
- **Impact:** It can feel busier than the calm brand direction.
- **Recommendation:** Replace with a static status dot or subtle non-looping entrance.
- **Suggested command:** `/quieter`

#### P3: External links need clearer destination expectations

- **Location:** `ExperienceCard`, social links, credential links
- **Category:** UX writing / Accessibility
- **Impact:** Users may not know which links leave the site.
- **Recommendation:** Keep the external icon and ensure labels include destination context where space allows.
- **Suggested command:** `/clarify`

#### P3: Image alt text is functional but generic

- **Location:** `ImageCarousel`, certificates, badges
- **Category:** Accessibility
- **Impact:** `Screenshot 1` does not communicate which project or feature is shown.
- **Recommendation:** Include project title or feature context in screenshot alt text.
- **Suggested command:** `/audit`

#### P3: Button language could be more specific

- **Location:** Hero CTAs
- **Category:** UX writing
- **Impact:** `Contact Me` and `Download CV` are understandable but generic.
- **Recommendation:** Consider `Email Kelvin` and `Download resume` for clearer action-object wording.
- **Suggested command:** `/clarify`

#### P3: The current font choice does not match the design context

- **Location:** `src/app/layout.tsx`, `src/app/globals.css`
- **Category:** Typography
- **Impact:** Inter supports readability but does not express the intended editorial precision; `.impeccable.md` mentions condensed display headings.
- **Recommendation:** Pair a restrained body font with a distinctive condensed display face, avoiding overused defaults.
- **Suggested command:** `/typeset`

## Patterns And Systemic Issues

- Theming is split between token definitions and hard-coded inline styles, so the token system cannot do its job.
- Interaction design is implemented locally per component, causing repeated hover-lift, shadow, and transform behavior.
- The portfolio currently shows quantity before evidence: many projects, many tags, many repeated cards.
- Motion is everywhere but not always purposeful; it should support orientation, feedback, or state change.
- Mobile sizing is visually compact but below modern touch comfort in several places.

## Positive Findings

- Real work evidence exists: project screenshots, cloud SaaS features, automation work, and role progression.
- The site has a clear information model: Home, About, Experience, Projects, Skills.
- `next/image` is used for most content images.
- The project already has strong design context in `.impeccable.md`, which gives the redesign a clear north star.
- The codebase is small enough to fix systematically without a large migration.

## Recommended Actions

1. **[P0] `/harden`** - Fix build and lint blockers in `FadeIn` and `ThemeToggle`.
2. **[P1] `/colorize`** - Make dark the default and move hard-coded light colors into semantic tokens.
3. **[P1] `/audit`** - Repair labels, headings, metadata, target sizes, focus states, and reduced-motion behavior.
4. **[P1] `/clarify`** - Rewrite project and section content for faster scanning and outcome-led evaluation.
5. **[P2] `/layout`** - Reduce repetitive cards, improve project/credential grouping, and create stronger hierarchy.
6. **[P2] `/animate`** - Replace bounce motion with restrained purposeful transitions.
7. **[P3] `/typeset`** - Introduce a display/body typography pairing aligned with editorial precision.
8. **[P3] `/polish`** - Final pass after implementation: spacing, contrast, focus, responsive review, and anti-pattern detector rerun.

