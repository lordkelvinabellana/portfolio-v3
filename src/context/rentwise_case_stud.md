# Case Study — RentWise

---

# Project Name

## RentWise

Rental Qualification + Property Matching Platform

---

# Problem

Most rental platforms solve visibility, not decision quality.

Sites like Zillow or Apartments.com help renters find listings, but they do not help renters understand whether they are actually likely to be approved.

This creates wasted effort on both sides.

Renters spend time applying to properties they are unlikely to qualify for.

Landlords spend time reviewing applicants who were never a strong fit.

This leads to:

- unnecessary application costs
- repeated renter rejection
- poor landlord lead quality
- wasted review time
- slower leasing decisions
- frustration on both sides

The problem was not listing discovery.

The problem was qualification trust.

The goal was to reduce bad applications before they happened.

---

# Why It Mattered

A better rental system should not just show more listings.

It should help users make better decisions.

For renters:

less wasted time

less emotional frustration

higher confidence when applying

For landlords:

better qualified applicants

less review friction

faster leasing decisions

This created stronger outcomes for both sides.

The product needed to move from:

listing visibility

to

match confidence

That was the real product value.

---

# My Role

## Full Stack Developer + Product Builder

I handled both frontend and backend development for RentWise while working directly with the founders on product structure, qualification logic, and business rules.

This included:

- frontend development
- backend logic
- renter onboarding systems
- scoring workflows
- qualification matching
- third-party background check integrations
- secure sensitive data handling
- dashboard and product flow design
- founder collaboration on business logic

This was not just implementation work.

It required strong product thinking because trust and decision quality were the core problems.

---

# Solution

Instead of letting users blindly browse listings and hope for approval, RentWise built a qualification-first rental workflow.

The platform evaluates renter fit before strong application effort happens.

The goal was:

help users apply smarter

not

help users apply more

This created better outcomes across the entire rental process.

---

# Workflow Architecture

## Step 1 — Detailed Renter Profile

Users onboard by creating a full renter profile including:

- employment information
- income
- household size
- leaseholders
- guarantors
- pets
- vehicles
- rental preferences
- prior rental context

This mirrors the real qualification process landlords already use manually.

The goal was to shift qualification earlier in the process instead of after application.

---

## Step 2 — Listing Requirement Structure

Each property listing includes qualification logic such as:

- income requirements
- occupancy limits
- pet policies
- guarantor expectations
- renter background expectations
- lease restrictions

This created structured matching instead of generic listing visibility.

Listings needed rules, not just photos.

---

## Step 3 — Hard Requirement Filtering

The system first applies hard qualification rules to remove listings that are clearly not a fit.

Examples:

- income too low
- occupancy exceeds limits
- restricted pets
- failed non-negotiable requirements

This prevents false hope and improves trust.

Bad matches should disappear early.

---

## Step 4 — Scoring Logic Layer

For listings that pass hard requirements, the system applies qualification scoring.

This creates ranking instead of simple pass/fail.

The system evaluates:

- financial strength
- profile stability
- renter fit strength
- landlord preference alignment

This allows renters to see:

best-fit opportunities first

instead of random availability.

This became the strongest differentiator of the platform.

---

## Step 5 — Background Check Integration

The platform sends qualification data to third-party background check systems which return:

- credit scoring
- criminal background context
- screening information

This adds stronger decision confidence without requiring unsafe internal handling of highly sensitive information.

Sensitive data such as SSN handling was designed carefully and protected rather than casually stored.

Trust and security were critical product requirements.

---

## Step 6 — Match-Focused Dashboard

Users receive:

- strongest property matches
- nearby alternatives
- qualification visibility
- confidence around where they should apply

This changes the product from:

search platform

into

decision platform

That difference is what made the product valuable.

---

# Technical Stack

## Frontend + Backend

- Next.js

## Database + Auth

- Supabase

## Product Logic

- qualification scoring systems
- rule-based filtering
- secure onboarding flows

## Integrations

- third-party background check APIs

## Product Layer

- onboarding systems
- renter dashboards
- listing ranking workflows
- founder-driven business logic validation

---

# Business Impact

The strongest value was reducing wasted effort.

This created:

- fewer bad applications
- stronger landlord lead quality
- better renter confidence
- faster decision-making
- less operational friction
- stronger trust in platform recommendations

Instead of acting like another listing marketplace,

the platform became a qualification engine.

That created actual differentiation.

This was the business value.

---

# Challenges

The hardest part was balancing:

fair qualification

without creating harmful friction

The system needed to be useful without feeling unfair or overly restrictive.

If filtering was too aggressive, trust drops.

If filtering was too weak, the product loses value.

That balance required careful product thinking.

Another challenge was security.

Sensitive personal information creates immediate trust risk.

Handling onboarding and background checks required stronger responsibility than normal CRUD application work.

This was a product trust problem as much as a technical one.

---

# Key Lessons

RentWise taught me that good product design reduces bad decisions.

The strongest products do not simply create more options.

They improve confidence.

That project also reinforced that backend logic often matters more than visible UI.

The user sees a dashboard.

But the real product is the trust behind the recommendation.

That mindset changed how I think about product building:

software should not just display information.

It should help people make better decisions.

---
