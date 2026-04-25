# Portfolio Redesign Plan

## Overall Navigation Structure

```
Home          — hero, featured work, skills strip, social proof, CTA
Work          — project cards (filterable) → each opens a dedicated detail page
Experience    — enhanced timeline (expand in-place; add "View case study →" on key cards)
About         — 3-paragraph narrative + personality + links to Experience / Work
Credentials   — certs, badges, recognition (promoted from buried-in-projects)
```

---

## Homepage

**Goal**: One strong impression in 3 seconds. Confidence through clarity, not completeness.

### Structure

1. **Hero** — clear role + value proposition + one primary CTA
   - Not a wall of text. One headline that says what you do and for whom.
   - Supporting line with context (SaaS, frontend, automation)
   - Primary CTA: View My Work / Download CV

2. **Featured Work** — 2–3 project teasers, outcome-led
   - Each card leads with a concrete result ("Reduced manual reporting by 60%")
   - Not the full project grid — just the best 2–3
   - "See all projects →" link at the bottom

3. **Skills strip** — compact, 6–8 logos or category labels
   - Not the full bento grid
   - Enough to confirm credibility at a glance

4. **Social proof moment** — one line or logo row
   - Alphaus is a real company with real users — worth surfacing
   - A metric, a company name, or a short testimonial if available

5. **CTA footer** — View full work / Download CV / Contact

### Principles
- Metrics row ("3+ years, 20+ projects") is fine but table-stakes — keep small
- White space and outcome language make it feel premium, not more content
- Recruiter reads top-to-bottom once; every section must earn its place

---

## About Me Page

**Goal**: Personality + story that explains why your background makes you better at your work. Not a duplicate of the Experience timeline.

### Structure

1. **3-paragraph narrative**
   - Para 1: Who you are + what drives you (not a job description)
   - Para 2: One turning point that shaped how you think
     → The LoRa/ESP8266 IoT thesis is genuinely interesting — shows systems thinking, not just UI work
   - Para 3: What you're focused on now and where you're headed

2. **One personality detail** — a hobby, a philosophy, something human
   - This is where people decide if they'd want to work with you

3. **Bridge links** — "See my full experience →" and "View my work →"
   - Don't replicate the timeline — link to it

### Principles
- 3 paragraphs max for the narrative (not a life memoir)
- Skip interactive click-to-experience sub-pages — a simple link is enough
- Story should connect background → current value, not just recount events

---

## Experience Page

**Goal**: Clear career timeline. Rich case studies on key roles, not sub-navigation.

- Keep the current timeline format
- Add "View case study →" link on Alphaus and 1–2 other key entries
- Sub-navigation per phase (College → Alphaus → Freelance) is **not needed**
  — the timeline already communicates phases visually
- Case study pages live under `/work/[slug]`, not under Experience

---

## Projects / Work Page

**Goal**: Filterable project cards → each opens a dedicated detail page.

### Project Detail Page Structure
- Project overview
- Business problem it solves
- Tech stack
- My role and specific contributions
- Challenges + solutions
- Results / outcomes
- Screenshots
- Demo / GitHub links

### Priority
- Build 3–4 strong case study pages rather than shallow pages for every project
- Start with the best Alphaus work — real product, real users, real outcomes

---

## Credentials Page

**Goal**: Standalone destination for professional achievements (not buried in Projects).

### Content
- Professional certifications (FinOps, technical certs)
- Credly badges and verified credentials
- Workshop completions / specialized training
- Competition achievements (Startup Weekend, etc.)
- Relevant awards or milestones

### Per credential
- Title + issuing organization
- Date earned
- Credential ID / verification link
- 1-line context: why this is relevant to career path

---

## Build Order (Step by Step)

- [x] Step 1: Homepage redesign
- [x] Step 2: About Me page
- [x] Step 3: Credentials page (promote from Projects)
- [x] Step 4: Work/Projects page restructure + filterable cards
- [x] Step 5: 3–4 project detail pages (case studies)
- [x] Step 6: Experience page enhancements + case study links
- [x] Step 7: Navigation update (add Work + Credentials, wire up routing)
