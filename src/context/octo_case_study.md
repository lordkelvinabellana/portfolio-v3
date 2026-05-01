# Case Study — Octo

---

# Project Name

## Octo

Cloud Cost Management SaaS Platform

---

# Problem

Octo is a cloud cost management SaaS platform built to help users visualize infrastructure costs, optimize cloud spending, and improve financial visibility across providers like AWS, GCP, and Azure.

The product itself was strong, but as the frontend complexity grew, several operational and engineering problems started creating friction:

- reporting dashboards were becoming harder to maintain
- onboarding flows had unnecessary friction for new users
- PR reviews were inconsistent and slowed releases
- bug reporting required switching between multiple tools
- frontend ownership needed stronger structure as the team grew
- backend-focused developers needed support understanding frontend workflows

The issue was not lack of development effort.

The issue was system friction around delivery.

Without fixing those systems, feature velocity would eventually slow down regardless of how hard people worked.

---

# Why It Mattered

For SaaS products like Octo, frontend quality directly affects product trust.

Users make financial decisions based on dashboards, reporting systems, and recommendations.

If the frontend is unclear, inconsistent, or difficult to trust, the product loses credibility.

Internally, delivery speed also mattered because we maintained weekly releases and often shipped multiple features per week.

Poor PR processes, weak onboarding, and inefficient bug reporting slowed both engineering and product quality.

This was not just a frontend problem.

It was a product delivery problem.

Improving the surrounding systems improved the entire team.

---

# My Role

## Lead Frontend Developer

I was responsible for frontend ownership across the product, not just individual feature development.

This included:

- frontend architecture
- dashboard systems
- PR reviews
- Git workflow standards
- release coordination
- Cypress E2E testing ownership
- frontend quality control
- onboarding flow improvements
- analytics integrations
- mentoring developers
- internal workflow improvements through automation

I was also responsible for helping maintain delivery speed and protecting frontend stability during weekly production releases.

This role required both technical execution and operational ownership.

---

# Solution

Instead of treating each issue separately, I approached Octo as a systems problem.

The goal was not just building features.

It was improving how the product and team moved.

## Frontend Architecture + Reporting Systems

Built and maintained frontend systems using:

- Vue.js
- TypeScript
- Vuetify
- Apache ECharts
- Grid.js
- GridStack

This included:

- cloud cost dashboards
- reporting systems
- recommendation views
- data visualization workflows
- complex frontend transformation logic for infrastructure reporting

The focus was clarity, usability, and maintaining trust in financial data presentation.

---

## PR Review + Release Workflow Improvements

Created standardized PR templates to improve review quality and reduce unnecessary back-and-forth.

The template included:

- problem being solved
- implementation scope
- before and after screenshots
- excluded scope
- release note context

This improved:

- PR review speed
- release clarity
- weekly deployment consistency
- onboarding for newer developers

This made releases more predictable and easier to manage.

---

## Bug Reporting Automation

One of the strongest internal improvements was replacing the manual bug reporting process.

Previously, reporting bugs required moving between multiple apps to create proper tickets.

I built a Slack-to-ClickUp workflow using Make, later rebuilt in n8n for stronger parsing logic and better flexibility.

Users could submit structured reports directly through Slack and the automation handled:

- ticket creation
- correct workspace assignment
- labels
- tags
- formatting consistency

This significantly improved adoption and became the standard reporting workflow across the company.

It was recognized by leadership and noticed by the CEO.

---

## Onboarding Flow Improvements

Reviewed onboarding friction points and simplified unnecessary steps in the user onboarding flow.

This improved user clarity and reduced friction during early product adoption.

Especially in SaaS onboarding, fewer unclear steps often creates stronger retention than adding more features.

---

## Mentorship + Frontend Team Support

Helped onboard junior developers and backend-focused engineers learning frontend workflows.

This included:

- Vue guidance
- frontend architecture understanding
- project structure familiarity
- frontend-to-database relationship understanding
- codebase onboarding for new hires

This improved team speed by reducing frontend dependency bottlenecks.

---

# Technical Stack

## Frontend

- Vue.js
- TypeScript
- JavaScript
- Vuetify
- HTML
- CSS

## Visualization

- Apache ECharts
- Grid.js
- GridStack

## Testing + Delivery

- Cypress E2E Testing
- Unit Testing
- Git
- PR Reviews
- Release Management

## Analytics + Tracking

- Mixpanel
- Hotjar
- Google Tag Manager

## Automation

- Make
- n8n
- ClickUp
- Slack

---

# Business Impact

The biggest result was not one feature.

It was improving the delivery system around the product.

This created:

- faster PR reviews
- cleaner weekly releases
- stronger frontend quality
- better onboarding experience
- reduced bug reporting friction
- better cross-team reporting adoption
- faster onboarding for new developers
- stronger frontend ownership across the team

Instead of solving isolated tickets, the work improved how the entire product moved.

That created compounding value over time.

This is the kind of work I care about most.

---

# Challenges

The hardest part was balancing feature delivery with system improvement.

Weekly releases meant there was always pressure to ship features quickly.

Improving internal systems like PR workflows, onboarding, or automation often gets delayed because it does not look urgent.

But those were the exact problems slowing the team long-term.

The challenge was solving invisible problems before they became expensive.

That required initiative more than assignment.

---

# Key Lessons

Octo taught me that senior frontend work is not about writing more code.

It is about protecting delivery.

The strongest frontend engineers improve:

- clarity
- speed
- trust
- team output

not just UI screens.

It also taught me that operational improvements often create more business value than feature work.

Sometimes the best product decision is not a new feature.

It is removing friction from the system that already exists.

That mindset shaped how I work permanently.

---
