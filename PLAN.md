# Portfolio Information Architecture Plan

## Summary

Implement a conversion-focused portfolio structure that keeps the calm, precise, dark SaaS/editorial design direction while moving from separate flat pages into a clearer hiring funnel:

- `Home` as an executive summary dashboard
- `Portfolio` as the central work hub
- dedicated experience phase pages
- dedicated project case-study pages
- dedicated credentials page
- story-driven `About`
- direct `Contact`

Dedicated project pages are the default for case studies. Modals are reserved only for future screenshot previews, not full project details.

## Key Changes

- Primary navigation becomes `Home`, `Portfolio`, `About`, `Contact`.
- Add `/portfolio` as the main professional work hub.
- Add canonical portfolio routes:
  - `/portfolio/experience`
  - `/portfolio/experience/college`
  - `/portfolio/experience/alphaus`
  - `/portfolio/experience/freelance`
  - `/portfolio/experience/renthive`
  - `/portfolio/experience/automation`
  - `/portfolio/projects`
  - `/portfolio/projects/[slug]`
  - `/portfolio/credentials`
- Keep old `/experience`, `/projects`, and `/skills` routes as redirects to the new structure.
- Add `/contact` as a direct conversion route.
- Replace the public resume file with the updated resume PDF from `/Users/admin/Documents/Abellana, LK_Resume-20260315235709.pdf`.

## Data Model

Extend `src/data/portfolio.ts` with structured, slug-based data:

- `ExperiencePhase`: slug, title, period, summary, responsibilities, achievements, learnings, technologies, relatedProjectSlugs.
- `ProjectCaseStudy`: slug, title, category, overview, businessProblem, role, contributions, challenges, solutions, outcomes, stack, screenshots, demoUrl, githubUrl, relatedExperienceSlug.
- `Credential`: slug, title, issuer, dateEarned, type, verificationUrl, credentialId, context, image.

Preserve the existing arrays for compatibility, but use the new structured data as the canonical source for portfolio hub, case studies, and experience phase pages.

## Page Strategy

### Home

Build the homepage as a premium executive summary, not a dense admin dashboard.

Include:

- clear value proposition
- restrained proof strip
- featured projects
- capability areas
- experience highlights
- core stack
- credentials snapshot
- CTAs for `View portfolio`, `Download resume`, and `Email Kelvin`

Keep metrics compact and inline. Avoid large metric cards, decorative dashboards, and visual clutter.

### Portfolio Hub

Build `/portfolio` as the central work map.

Include:

- quick path cards for Experience, Projects, and Credentials
- experience phase overview
- featured projects
- credentials and recognition snapshot

Each section should lead deeper without making recruiters work through excessive menu depth.

### Experience

Build `/portfolio/experience` and dedicated phase pages.

Each phase page includes:

- short overview
- responsibilities and contributions
- key achievements
- key learnings
- technologies used
- related project cards
- `View all projects` CTA

### Projects

Build `/portfolio/projects` and `/portfolio/projects/[slug]`.

Each project detail page includes:

- overview
- business problem
- role
- contributions
- challenges
- solutions
- outcomes
- screenshots
- demo and GitHub links where available

Project listing should group case studies by category: SaaS/Product, Freelance, Startup, Automation, and Personal.

### Credentials

Build `/portfolio/credentials` for:

- professional certifications
- Credly badges
- technical training
- Startup Weekend / RentHive recognition
- awards or milestones

Each credential should show title, issuer, date when known, verification link when available, and career relevance.

### About

Keep `/about` personal and story-driven, but recruiter-friendly.

Structure:

- concise professional summary
- journey timeline
- links into matching experience phase pages

Journey topics:

- engineering foundation
- college/thesis
- early frontend work
- RentHive startup
- freelance work
- Alphaus SaaS/product work
- current focus

## Test Plan

- Run `npm run lint`.
- Run `npm run build`.
- Run `npx impeccable --json src`.
- Verify all key routes:
  - `/`
  - `/portfolio`
  - `/portfolio/experience`
  - `/portfolio/experience/[slug]`
  - `/portfolio/projects`
  - `/portfolio/projects/[slug]`
  - `/portfolio/credentials`
  - `/about`
  - `/contact`
- Verify redirects:
  - `/experience`
  - `/projects`
  - `/skills`
- Verify all CTAs and resume download.
- Verify descriptive metadata for portfolio, project, experience, credentials, about, and contact pages.
- Verify keyboard navigation, focus states, route announcements, and mobile touch targets.

## Acceptance Criteria

- Recruiters can understand role, strongest work, proof, and contact path within 10-15 seconds of landing on Home.
- Portfolio hub clearly organizes Experience, Projects, and Credentials.
- Major experience phases have dedicated pages with related projects.
- Representative projects have dedicated case-study pages.
- Credentials are separated from projects and presented as trust signals.
- Old flat routes remain safe through redirects.
- The site remains calm, precise, dark, and conversion-focused without becoming visually crowded.
