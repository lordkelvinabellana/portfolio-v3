# Case Study — OnlineJobsPH Auto-Matching System

---

# Project Name

## OnlineJobsPH Auto-Matching System

AI-Powered Job Matching + Smart Opportunity Filtering

---

# Problem

Job searching manually creates a lot of wasted effort.

Refreshing job boards repeatedly, scanning low-quality listings, comparing opportunities manually, and trying to decide what is actually worth applying to quickly becomes inefficient and mentally draining.

The problem was not finding jobs.

The problem was filtering quality.

Without a system, quantity overwhelms decision-making.

This creates:

- wasted time refreshing listings
- repeated duplicate listings
- poor job quality visibility
- unnecessary spam notifications
- low-quality opportunities consuming attention
- delayed action on genuinely strong opportunities

I wanted a system that would surface only strong opportunities instead of forcing manual constant checking.

The goal was not automation for convenience.

It was decision quality.

---

# Why It Mattered

Job applications work best when quality is prioritized over quantity.

Blindly applying to everything creates weak positioning and poor interview quality.

I wanted a workflow where:

only strong opportunities reach me

and

the system helps evaluate fit before I even open the application.

This saves:

- time
- attention
- decision fatigue
- unnecessary emotional energy

It also improves application quality because I can focus effort only where it matters.

This turned job hunting into a system instead of a repetitive task.

---

# My Role

## Full System Owner

This was a personal automation project where I handled everything:

- architecture design
- scraping logic
- deduplication workflows
- keyword filtering logic
- LLM evaluation layer
- decision thresholds
- notification system
- HTML email generation
- cloud hosting
- self-hosted infrastructure

The system was designed not just to notify me of jobs, but to make better application decisions automatically.

This project reflects how I naturally approach problems:

build systems that reduce repeated manual work.

---

# Solution

I designed a multi-layer automation pipeline that filters job opportunities before they ever reach me.

Instead of simple scraping, the workflow acts like a decision engine.

Only strong opportunities survive the pipeline.

---

# Workflow Architecture

## Step 1 — Scheduled Job Scraping

A cron job runs every 5 minutes and scrapes new job listings from OnlineJobsPH automatically.

This ensures no strong opportunity gets missed without requiring constant manual refreshes.

---

## Step 2 — Data Normalization + Deduplication

Scraped listings are normalized and compared against existing stored jobs inside Google Sheets.

This prevents duplicate processing and repeated notifications.

Only truly new opportunities continue.

This was important because duplicate notifications destroy trust in automation quickly.

---

## Step 3 — Keyword Filtering Layer

Before reaching the AI layer, listings pass through a keyword filter.

This includes:

### Strong Match Keywords

Words that strongly suggest a good role fit

and

### Avoid Keywords

Words that signal low-quality or poor-fit roles

This reduces unnecessary LLM usage and protects token efficiency.

The goal was:

logic first
AI second

not

AI for everything

This makes systems stronger and cheaper.

---

## Step 4 — LLM Match Evaluation

Filtered jobs are passed into an AI workflow where the system compares each listing against:

- my skills
- role preferences
- salary expectations
- workload expectations
- technical stack fit
- overall opportunity quality

The AI returns:

- match score
- pros
- cons
- short summary
- salary-to-workload reasoning
- shouldApply recommendation
- direct job link

This created real decision support, not just information delivery.

---

## Step 5 — Quality Threshold Filtering

Only listings where:

- shouldApply = true
- match score ≥ 75

continue forward.

This prevents spam and ensures only genuinely strong opportunities trigger notifications.

This was critical.

Good automation protects attention.

Bad automation creates noise.

---

## Step 6 — Smart HTML Notification System

The final output is a structured HTML email containing:

- job details
- AI analysis
- recommendation summary
- pros and cons
- application reasoning
- direct job application button

The button links directly to the original job post so action becomes immediate.

This creates a true auto-matching system rather than passive job alerts.

---

# Technical Stack

## Automation

- n8n (self-hosted)

## Infrastructure

- Oracle Cloud Free Tier VM
- VPS hosting
- SSH access
- cloud deployment management

## Data Layer

- Google Sheets

## AI Layer

- OpenAI workflows
- prompt engineering
- LLM scoring logic

## Workflow Logic

- cron jobs
- deduplication pipelines
- conditional filtering
- HTML email generation
- decision engine architecture

---

# Business Impact

Even though this was a personal system, the impact was significant.

It created:

- faster job opportunity visibility
- reduced manual job board checking
- stronger application quality
- less decision fatigue
- fewer spam opportunities
- better attention control
- higher confidence before applying

Instead of manually searching for jobs,

the system helped pre-qualify opportunities automatically.

This shifted job hunting from reactive to strategic.

That is a major difference.

---

# Challenges

The biggest challenge was balancing AI usefulness without overusing AI.

If every listing goes directly to the LLM layer, the workflow becomes expensive, slower, and less reliable.

The system needed strong logic before AI.

That meant:

- strong keyword filtering
- proper deduplication
- trust in threshold logic

Another challenge was building notification trust.

If automation sends too much noise, users stop trusting it.

That is where the ≥75 match score rule became important.

Good automation is trusted because it says “no” more often than “yes.”

---

# Key Lessons

This project reinforced one of my strongest beliefs:

AI should improve decisions, not replace thinking.

The best automation systems are not the ones that automate everything.

They are the ones that remove bad decisions and protect focus.

This project also proved that personal operational problems often create the best automation opportunities.

Because when the pain is real, the solution quality becomes better.

Sometimes the best automation project starts with:

“I’m tired of doing this manually.”

That was exactly this project.

---
