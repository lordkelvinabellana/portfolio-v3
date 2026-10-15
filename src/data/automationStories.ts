/* The write-up for each automation's page: the problem it solves, what it does
   now, how it runs and what keeps it from breaking. Keyed by the ids in
   automations.ts (which is generated; this file is written by hand). */

export type AutomationStory = {
  /** One line for the gallery card. */
  short: string;
  /** Who it was built for, when that's worth saying. */
  builtFor?: string;
  problem: string;
  fix: string;
  /** How a run goes, in order. */
  steps: string[];
  /** Checks and fallbacks that keep it reliable. */
  safeguards: string[];
};

const AGENCY = "Penguin Ops, for a Google Ads agency";

export const automationStories: Record<string, AutomationStory> = {
  "client-onboarding": {
    short: "One form sets up a new client across ClickUp and Slack.",
    builtFor: AGENCY,
    problem:
      "Every new client meant a long checklist done by hand: ClickUp records, onboarding tasks, a client doc, two Slack channels and an invite. Steps got missed, and nobody could tell which ones.",
    fix: "One Typeform submission now runs the whole checklist in the same order every time, and Slack hears about it if anything stops.",
    steps: [
      "The onboarding form arrives, in its general or branded version, and the answers are mapped to clean fields.",
      "It looks for the client in ClickUp first, so a resubmitted form never creates a second copy.",
      "It creates the client, each store and the onboarding tasks with a checklist, then the client doc.",
      "It opens an internal and an external Slack channel, sends the Slack Connect invite and pins a welcome message.",
    ],
    safeguards: [
      "A duplicate client stops the run and alerts the team instead.",
      "If any step fails, the error workflow posts the client's name and the step that broke.",
      "Fee, ad account and start date land in ClickUp fields, so the reporting workflows can use them.",
    ],
  },
  "weekly-pulse": {
    short: "A Monday digest of every client's week in Slack, at-risk clients first.",
    builtFor: AGENCY,
    problem:
      "Managers had to open dozens of client channels to see who had gone quiet, who sounded unhappy and who hadn't had their updates that week.",
    fix: "Every Monday morning it reads each client's channels for the past week, has Claude review them, and posts one digest with the clients at risk at the top.",
    steps: [
      "Works out the week that just ended, in the agency's timezone.",
      "Reads each client's internal and external Slack channels for that week.",
      "Claude checks whether the team posted a proper update on the agreed days, and how the client sounds.",
      "Posts one digest to a private managers' channel, at-risk clients first, with links to each channel.",
    ],
    safeguards: [
      "Team members' own channels are left out, so they're never read as clients.",
      "Very long weeks are trimmed per client, and the review is told when older messages were dropped.",
      "New clients come in from ClickUp, so the channel list doesn't go stale.",
    ],
  },
  "spend-roas": {
    short: "Daily Google Ads spend, ROAS and fees in EUR, written into ClickUp.",
    builtFor: AGENCY,
    problem:
      "Spend, ROAS and the monthly fee were pieced together by hand from Google Ads and Shopify, across ad accounts billed in different currencies.",
    fix: "Every morning it pulls each store's spend through the manager account, matches it with Shopify revenue, converts everything to EUR and fills the ClickUp fields the team already used.",
    steps: [
      "Runs each morning, right after the Shopify revenue pull.",
      "Reads spend for each store's Google Ads account: last 7 days, last 30 days, this month and last month.",
      "Takes each store's Google-attributed revenue from the Shopify table.",
      "Converts to EUR at the ECB's daily rates, then works out ROAS and the estimated fee from the agreed tiers.",
      "Writes store and client totals to ClickUp, changing only the values that moved.",
    ],
    safeguards: [
      "A store with missing data gets a data issue note in ClickUp rather than a wrong number.",
      "A login-protected form runs it on demand, including a dry run that shows the numbers and changes nothing.",
      "Problems are posted to the ops channel.",
    ],
  },
  "store-onboarding": {
    short: "Adds a new store to an existing client, without duplicates.",
    builtFor: AGENCY,
    problem:
      "Adding a store for an existing client repeated half of the onboarding by hand, and the same store could end up set up twice.",
    fix: "A new-store form finds the client, skips stores that already exist and sets up the rest the same way every time.",
    steps: [
      "Matches the form to the existing client in ClickUp.",
      "Skips any store that's already there.",
      "Creates the store and its onboarding task with a checklist, and adds the store to the client doc.",
      "Invites the media buyer to both Slack channels and announces the new store.",
    ],
    safeguards: [
      "Stores that already exist are skipped, never duplicated.",
      "A failed run is reported by the shared error alert, with the client and store named.",
    ],
  },
  "buyer-assigned": {
    short: "Assign a media buyer in ClickUp and they get every channel and store.",
    builtFor: AGENCY,
    problem:
      "When a media buyer took over a client, someone had to add them to the client's Slack channels and to each store by hand, and it was easy to miss one.",
    fix: "Assigning the buyer to the onboarding task in ClickUp is now the only step. The workflow handles the invites and the store assignments.",
    steps: [
      "ClickUp reports an assignee change on the onboarding list.",
      "Keeps only people who were added, and only if they're media buyers.",
      "Loads the client and its stores.",
      "Invites the buyer to the client's Slack channels and assigns them to every store.",
    ],
    safeguards: [
      "Removals, template tasks and people who aren't buyers stop at the first step.",
      "Buyers are matched by ClickUp account, then by name, and only a unique match counts.",
      "A buyer with no Slack ID stops the run with a clear error instead of a guess.",
    ],
  },
  "funnel-brief": {
    short: "A funnel brief from Typeform becomes a ready-to-build ClickUp task.",
    builtFor: AGENCY,
    problem:
      "Landing page and funnel requests arrived in different shapes, often missing details, and had to be retyped into ClickUp before anyone could start.",
    fix: "Media buyers fill in one brief, and it becomes a ClickUp task with a clear name, a due date, every answer in order and a checklist of build steps.",
    steps: [
      "The buyer submits the brief: product, offer, audience, copy, brand assets and build details.",
      "Answers are grouped into sections and the task is named by store, page type and product.",
      "It finds the store in ClickUp and creates the task with the launch date as its due date.",
      "Adds a build-steps checklist, from research through to launch.",
    ],
    safeguards: [
      "The store must match exactly one record. Otherwise the task is still made and a comment asks the buyer to link it. It never guesses.",
      "Any field that fails to set gets its own comment on the task.",
      "Buyers are matched by name, so a new hire doesn't need a form change.",
    ],
  },
  "shopify-daily": {
    short: "Each store's daily Shopify revenue, saved every morning.",
    builtFor: AGENCY,
    problem:
      "Revenue lived in each client's own Shopify admin, so there was no daily figure per store to set against ad spend.",
    fix: "Every morning it pulls each connected store's orders, saves the day's total and Google-attributed revenue, and posts a summary to the ops channel.",
    steps: [
      "Runs at 06:00 and re-pulls the last three days for every connected store, in the store's own timezone.",
      "Counts revenue as the order subtotal after discounts, before shipping.",
      "Marks an order as Google when the last visit before it came from Google.",
      "Saves orders and revenue per store per day, then posts the summary.",
    ],
    safeguards: [
      "Test and cancelled orders are skipped.",
      "Re-pulling three days picks up late changes to recent orders.",
      "A store that fails is named in the summary while the others still save.",
      "A login-protected form backfills past days.",
    ],
  },
  "shopify-connect": {
    short: "Connects a client's Shopify store without anyone handling the token.",
    builtFor: AGENCY,
    problem:
      "Every client store needs its own Shopify app and access token, and passing tokens around in messages isn't safe.",
    fix: "A protected form and Shopify's own approval screen connect the store, and the token goes straight into storage without anyone seeing it.",
    steps: [
      "The store's app details go into a login-protected form.",
      "Installing the app takes the person to Shopify's approval screen.",
      "Shopify sends them back, and the workflow swaps the code for the store's token and saves it with the store.",
      "Posts a note in Slack once the store is connected.",
    ],
    safeguards: [
      "Run data isn't saved, so tokens never appear in the execution log.",
      "Store addresses are cleaned and checked before anything is saved.",
      "It asks Shopify for read-only access to orders and nothing more.",
    ],
  },
  broadcast: {
    short: "One message to every client's Slack channel, with a preview first.",
    builtFor: AGENCY,
    problem: "Announcements to every client meant pasting the same message into dozens of Slack channels, one at a time.",
    fix: "A login-protected form sends one message to all client channels or all internal ones, after a preview and a test.",
    steps: [
      "Write the message in the form and choose client or internal channels.",
      "Preview lists every channel it would reach and sends nothing.",
      "A test sends it to the ops channel only.",
      "Send now posts it to each channel and logs what went out.",
    ],
    safeguards: [
      "Preview and test modes come before any real send.",
      "Personal versions post from a team member's own Slack account, connected with their own approval.",
    ],
  },
  "onboarding-error": {
    short: "Tells the team which client's onboarding stopped, and where.",
    builtFor: AGENCY,
    problem: "When an onboarding run failed partway, nobody knew which client was half set up or which step broke.",
    fix: "Any failed run now posts an alert in the ops channel with the client, the form, the failed step and the error.",
    steps: [
      "n8n's error trigger fires when a connected workflow fails.",
      "It reads the failed run to find the client's name.",
      "Formats the alert with the step that failed and the reason.",
      "Posts it in the ops channel.",
    ],
    safeguards: [
      "If the failed run can't be read, the alert still goes out with what's known.",
      "Other workflows, like the Shopify ones, get a plain \"stopped\" alert from the same workflow.",
    ],
  },
  "portfolio-chatbot": {
    short: "The bot on this site, answering from my portfolio.",
    builtFor: "Myself, running on this site",
    problem: "Recruiters and clients skim a portfolio in a minute or two and leave with questions nobody is there to answer.",
    fix: "The bot answers from this site's own content, remembers the conversation and links to the right page.",
    steps: [
      "The site sends the visitor's message to its own API, which forwards it to the n8n webhook.",
      "An agent searches the portfolio content in Pinecone.",
      "It answers from what it found, with a short memory for each visitor.",
      "The reply goes back to the site. Errors get their own friendly reply.",
    ],
    safeguards: [
      "The webhook needs a secret key that only the site's server has.",
      "The site's API checks where requests come from, limits message length and rate-limits each visitor.",
      "The knowledge is rebuilt from the site's content whenever the site changes.",
    ],
  },
  "executive-assistant": {
    short: "A Telegram assistant that runs my calendar and inbox from voice notes.",
    builtFor: "Myself",
    problem: "Small calendar and email jobs on the go meant opening a different app for each one.",
    fix: "I send a voice note or a message on Telegram, and an executive agent hands the work to calendar, email and contact agents, then reports back.",
    steps: [
      "Telegram receives a message or a voice note. Voice notes are downloaded and transcribed.",
      "The executive agent works out what's needed and delegates it.",
      "The calendar agent creates, finds and updates events, and the contact agent looks people up.",
      "The email agent drafts Gmail replies in my writing style.",
      "Progress updates and a final summary come back on Telegram.",
    ],
    safeguards: [
      "Emails are saved as drafts. Nothing is sent without me.",
      "Each agent only has the tools for its own job.",
      "A short memory keeps follow-ups in context.",
    ],
  },
  "support-triage": {
    short: "Sorts support emails and drafts replies, flagging what needs a person.",
    problem: "Every support email needed someone to read it, sort it and write a reply, and repeat emails got handled twice.",
    fix: "Each email is checked for duplicates, classified, saved and given a draft reply in Gmail. Only the ones that need a person get flagged.",
    steps: [
      "A new email arrives in Gmail and is normalised.",
      "Airtable is checked for a duplicate, and the run stops if it's already there.",
      "The email is classified through an API and the result is validated before it's saved.",
      "A tone-aware reply is drafted and saved in Gmail.",
      "Anything that needs a person is flagged in Slack, and the alert is logged.",
    ],
    safeguards: [
      "Duplicates stop before any work is done.",
      "The classification is validated before anything relies on it.",
      "Each record moves through clear statuses in Airtable: processing, draft ready or needs review.",
      "Replies stay as drafts. Nothing is sent automatically.",
    ],
  },
  "hotel-booking": {
    short: "A Telegram agent that answers guests and records bookings.",
    problem: "Guests ask the same questions about rooms and policies, and bookings made in chat have to be copied out by hand.",
    fix: "A Telegram agent answers from the hotel's FAQ and room sheets, confirms the booking and writes it to Google Sheets.",
    steps: [
      "A guest messages the hotel's Telegram bot.",
      "The booking agent replies, asking an FAQ and rooms agent that reads the hotel's sheets.",
      "Once the guest confirms, the booking is parsed into fields.",
      "It's added as a row in Google Sheets and the guest gets a confirmation.",
    ],
    safeguards: [
      "Answers come from the hotel's own sheets.",
      "A booking is only written after the guest confirms it.",
      "Memory keeps each guest's conversation in context.",
    ],
  },
  "email-rag": {
    short: "Chat with an inbox: find past emails by meaning and send new ones.",
    builtFor: "Myself",
    problem: "Finding an old email means guessing the exact words someone used.",
    fix: "An agent searches past emails by meaning, answers with what it finds and can send an email through a separate workflow.",
    steps: [
      "A question comes in through n8n's chat.",
      "The agent searches the stored emails in Pinecone.",
      "It answers from what it found and remembers the conversation.",
      "When asked, it calls a separate Send Email workflow.",
    ],
    safeguards: [
      "Sending lives in its own workflow, so it can be checked and changed on its own.",
      "A short memory keeps follow-up questions in context.",
    ],
  },
  "job-matching": {
    short: "Scrapes job boards and sends only the jobs that fit my CV.",
    builtFor: "Myself",
    problem:
      "Job boards post hundreds of listings and most don't fit. Reading them all takes hours, and scoring every one with AI gets expensive.",
    fix: "On a schedule it scrapes, cleans and de-duplicates listings, filters out poor fits with rules, and only then has an agent score the rest against my CV.",
    steps: [
      "Scrapes the listing pages on a schedule and checks the scrape worked.",
      "Cleans and parses the listings, de-duplicates them against the sheet and filters by keyword.",
      "Fetches the full description for each new job, with a pause between requests.",
      "An agent scores each job against my CV in Pinecone and returns a structured result.",
      "Matches go to Slack, and every job's status is updated in the sheet.",
    ],
    safeguards: [
      "Rules run before AI, and a queue cap limits how many jobs are scored per run.",
      "A failed scrape sends its own Slack alert.",
      "Each job's status in the sheet stops it being processed twice.",
    ],
  },
  "lead-diagnostic": {
    short: "Typeform diagnostics into Notion, with a results email for every lead.",
    builtFor: "Stakra",
    problem:
      "People who stopped halfway through the diagnostic were lost, and the ones who finished waited for someone to put their results together.",
    fix: "Partial and complete responses are both saved to Notion, and every completed diagnostic gets a results email built from Notion content.",
    steps: [
      "Typeform sends every response to a webhook, partial or complete.",
      "Partial responses with an email create or update the lead in Notion.",
      "Complete responses are validated and saved to the lead and response records.",
      "The results email is assembled from profile and recommendation content in Notion and sent through Gmail.",
      "The lead is marked as sent, or as failed if the email didn't go.",
    ],
    safeguards: [
      "Partial responses are kept, so unfinished leads aren't lost.",
      "An invalid response stops with an error instead of writing bad data.",
      "Missing email content stops the run rather than sending a broken email.",
      "Every lead records whether its results email went out.",
    ],
  },
  "job-alerts": {
    short: "Hourly alerts for new job posts, never the same post twice.",
    builtFor: "Myself",
    problem: "Good posts get crowded fast, and checking the boards by hand means scrolling past the same posts again and again.",
    fix: "Every hour it searches two job feeds, keeps only the posts it hasn't seen and sends them to Slack.",
    steps: [
      "Searches two job feeds every hour, one for GoHighLevel roles and one for automation roles.",
      "Extracts the job links and merges both lists.",
      "Keeps only posts it hasn't seen before.",
      "Sends the new ones to Slack.",
    ],
    safeguards: [
      "Posts it has already sent are remembered, so nothing is alerted twice.",
      "Its own error trigger posts any failure to Slack.",
    ],
  },
  "error-alerts": {
    short: "Any failed workflow posts to Slack, with the details in a thread.",
    problem: "A failed workflow fails quietly. Usually you find out when someone asks why something didn't happen.",
    fix: "This is the error workflow for the n8n instance: any failed run posts a short message to Slack, with the details in a thread.",
    steps: [
      "n8n's error trigger fires when a workflow fails.",
      "It builds a message with the workflow, the failed step and the error.",
      "Posts the headline to Slack and the details in a thread.",
    ],
    safeguards: [
      "Workflows point to this one as their error workflow, so every alert looks the same and lands in one place.",
      "Details go in the thread, so the channel stays easy to read.",
    ],
  },
  "slack-cleanup": {
    short: "React with ❌ to delete a bot's message or its whole thread.",
    problem: "You can't delete a bot's messages like your own, so test posts and mistakes stayed in the channel.",
    fix: "React with ❌ to a bot message and it's deleted, along with the thread it started.",
    steps: [
      "Slack reports a new reaction.",
      "Checks that it's a ❌ on a bot message.",
      "Fetches the thread if the message started one.",
      "Deletes the message, or every message in the thread.",
    ],
    safeguards: ["Any other reaction is ignored.", "It can only delete the bot's own messages."],
  },
};
