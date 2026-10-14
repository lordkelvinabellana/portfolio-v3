export type Project = {
  title: string;
  role: string;
  description: string;
  stack: string[];
  images: string[];
};

export type Experience = {
  position: string;
  company: string;
  duration: string;
  description: string;
  color: string;
  cta?: string | null;
  link?: string;
};

export type TechItem = {
  name: string;
  logo: string;
};

export type TechGroup = {
  label: string;
  items: TechItem[];
};

export type Cert = {
  title: string;
  image: string;
};

export type Badge = {
  title: string;
  image: string;
  link: string;
};

export const typingWords = [
  "Product Engineer",
  "Frontend Architect",
  "Automation Builder",
  "System Builder",
];

export const experiences: Experience[] = [
  {
    position: "Web Designer & Developer",
    company: "Flexiwork",
    duration: "Mar 2026 – Oct 2026",
    color: "violet",
    description:
      "Agency web work across WordPress, Wix, Elementor, and HTML/Tailwind builds. Delivered client websites with fast turnaround across healthcare, travel, and service industries. Recognized for consistently delivering ahead of deadline, including a full site build in under an hour against a same-day brief.",
    cta: null,
  },
  {
    position: "Lead Frontend Developer",
    company: "Ardexa.ai",
    duration: "Oct 2025 – Apr 2026",
    color: "purple",
    description:
      "Built three startup MVPs from scratch as the primary frontend and full-stack developer alongside two founders. Worked across architecture, product decisions, and implementation using Next.js, Supabase, and TypeScript, shipping RentWise, LexaDraft, and TicketDesk.",
    cta: null,
  },
  {
    position: "Product Owner",
    company: "Alphaus · Ripple, Flow, Wave & Wave Pro",
    duration: "Aug – Dec 2025",
    color: "blue",
    description:
      "Promoted to Product Owner across five connected cloud billing products. Led sprint planning, backlog refinement, and feature specs. Stepped into Figma UI/UX design ownership when delivery was blocked. Supported Ripple V2 migration (monolith → microfrontend) and led product alignment for the Alphaus–Archera strategic partnership.",
    cta: "Learn About Ripple",
    link: "https://www.alphaus.cloud/en/ripple",
  },
  {
    position: "Lead Frontend Developer",
    company: "Alphaus · Octo",
    duration: "Oct 2024 – Aug 2025",
    color: "sky",
    description:
      "Led frontend ownership for Octo: cloud cost dashboards, recommendation systems, budget management, and weekly production releases. Built Slack-to-ClickUp bug automation adopted company-wide. Introduced PR templates that improved review consistency. Mentored junior developers and backend engineers on Vue and frontend architecture.",
    cta: "Learn About Octo",
    link: "https://www.alphaus.cloud/en/octo",
  },
  {
    position: "Junior Frontend Developer",
    company: "Alphaus · Octo",
    duration: "Jul 2023 – Oct 2024",
    color: "green",
    description:
      "Built SaaS interfaces for Octo using Vue, Vuetify, TypeScript, and ECharts. Developed dashboards, cost reports, alert systems, and onboarding flows while integrating REST APIs, Mixpanel analytics, and i18n localization across the cloud cost management platform.",
    cta: "Learn About Octo",
    link: "https://www.alphaus.cloud/en/octo",
  },
  {
    position: "Freelance Frontend Developer & Automation Builder",
    company: "Self-employed",
    duration: "2023 – Present",
    color: "slate",
    description:
      "Built automation systems and client websites independently: AI job-matching pipelines, coaching delivery systems with approval workflows, Slack reporting automations, and WhatsApp bots. Handled 20+ web builds across WordPress, Wix, and HTML/Tailwind for clients in healthcare, travel, and services.",
    cta: null,
  },
];

export const octoProjects: Project[] = [
  {
    title: "Dashboard & Cost Report Builder",
    role: "Frontend Developer – Octo",
    description:
      "Built the drag-and-drop dashboard layout using GridStack, including multiple chart widgets powered by ECharts. Developed cost report creation flow with filtering, currency conversion, export options, and editable reports. Implemented support for deleting, duplicating, and visualizing reports using user fiscal settings.",
    images: [
      "/assets/octo/db1.png",
      "/assets/octo/db2.png",
      "/assets/octo/db3.png",
      "/assets/octo/db4.png",
    ],
    stack: [
      "Vue",
      "Vuetify",
      "ECharts",
      "GridStack",
      "TypeScript",
      "I18n",
      "DayJs",
      "Pinia",
      "REST API",
    ],
  },
  {
    title: "Recommendations UI & History",
    role: "Frontend Developer – Octo",
    description:
      "Built a performant UI for cloud optimization recommendations. Implemented filterable lists, detailed recommendation views, and a history timeline with charts and savings summaries. Integrated multiple backend endpoints for cost calculations, filters, optimization statuses, and executed states.",
    stack: [
      "Vue",
      "Vuetify",
      "ECharts",
      "TypeScript",
      "Pinia",
      "Dayjs",
      "I18n",
      "REST API",
    ],
    images: [
      "/assets/octo/rec1.png",
      "/assets/octo/rec2.png",
      "/assets/octo/rec3.png",
      "/assets/octo/rec4.png",
    ],
  },
  {
    title: "Alert & Channel Management",
    role: "Frontend Developer – Octo",
    description:
      "Developed and maintained the Alert Management and Channel Management UIs, allowing users to set up notifications when budgets or costs exceed thresholds. Users can create/edit alerts based on cost or percentage, and route notifications via Slack, MS Teams, or Email.",
    stack: [
      "Vue",
      "Vuetify",
      "Pinia",
      "TypeScript",
      "REST API",
      "Dayjs",
      "I18n",
    ],
    images: [
      "/assets/octo/alert1.png",
      "/assets/octo/alert2.png",
      "/assets/octo/alert3.png",
      "/assets/octo/alert4.png",
    ],
  },
  {
    title: "Onboarding & Route Enhancements",
    role: "Frontend Developer – Octo",
    description:
      "Led improvements in layout structure and onboarding experience by introducing dynamic headers and enhancing route-level logic. These changes improved visual consistency, guided user flows, and made the app more adaptable to different languages and user contexts.",
    stack: ["Vue", "Vuetify", "Pinia", "TypeScript", "Vue Router", "i18n"],
    images: [
      "/assets/octo/on1.png",
      "/assets/octo/on2.png",
      "/assets/octo/on3.png",
      "/assets/octo/on4.png",
    ],
  },
  {
    title: "Budget Management",
    role: "Frontend Developer – Octo",
    description:
      "Implemented a budgeting interface that helps users plan and track their cloud spending. Developed dynamic charts and tables to show actual cost, budget allocations, and forecasts. Users can create, edit, and delete budgets, and configure notifications when thresholds are met.",
    stack: [
      "Vue",
      "Vuetify",
      "Pinia",
      "TypeScript",
      "ECharts",
      "i18n",
      "REST API",
    ],
    images: [
      "/assets/octo/bud1.png",
      "/assets/octo/bud2.png",
      "/assets/octo/bud3.png",
      "/assets/octo/bud4.png",
      "/assets/octo/bud5.png",
    ],
  },
  {
    title: "Account Registration & Management",
    role: "Frontend Developer – Octo",
    description:
      "Enhanced the account registration and management experience by implementing a unified view that aggregates billing and sub-account data. Contributed to better data visibility and more intuitive onboarding flows for users managing cloud billing structures.",
    stack: ["Vue", "Vuetify", "Pinia", "TypeScript", "Vue Router"],
    images: [
      "/assets/octo/acc1.png",
      "/assets/octo/acc2.png",
      "/assets/octo/acc3.png",
      "/assets/octo/acc4.png",
    ],
  },
  {
    title: "Currency Support Integration",
    role: "Frontend Developer – Octo",
    description:
      "Implemented support for displaying and converting cost data across multiple currencies. Integrated APIs to fetch exchange rates and ensured consistent formatting across all cost-related components including dashboards, reports, and detail views.",
    stack: ["Vue", "TypeScript", "Vuetify", "Day.js", "Pinia", "REST API"],
    images: [],
  },
  {
    title: "Executed Recommendations UI",
    role: "Frontend Developer – Octo",
    description:
      "Built the Executed Recommendations interface to track and summarize implemented optimizations. Included tables, filtering, and visualizations for cost savings and vendor-level insights to help users analyze the impact of their actions.",
    stack: ["Vue", "Vuetify", "ECharts", "Pinia", "TypeScript"],
    images: [],
  },
  {
    title: "Shared vs Private Reports Filtering",
    role: "Frontend Developer – Octo",
    description:
      "Enhanced the Cost Report module to support shared and private report segmentation. Introduced filters and logic to help users distinguish between team-shared and personal reports while maintaining a seamless user experience.",
    stack: ["Vue", "TypeScript", "Pinia", "Vuetify"],
    images: [],
  },
  {
    title: "Custom Fiscal Period Support",
    role: "Frontend Developer – Octo",
    description:
      "Enabled dynamic fiscal period calculations based on user-specific registration dates and fiscal month settings. This improved the accuracy of monthly reports and dashboards, aligning with each customer's internal accounting practices.",
    stack: ["Vue", "Pinia", "TypeScript", "Day.js"],
    images: [],
  },
  {
    title: "UI & UX Enhancements",
    role: "Frontend Developer – Octo",
    description:
      "Enhanced the overall user experience by implementing responsive design principles, improving accessibility, and optimizing performance across all devices.",
    stack: ["Vue", "Vuetify", "TypeScript", "i18n"],
    images: [],
  },
  {
    title: "Codebase Refactoring & UI Optimization",
    role: "Frontend Developer – Octo",
    description:
      "Performed large-scale cleanup and optimization of existing UI components, improving readability, reusability, and performance. Standardized component structure, removed unused code, and enforced consistent practices across shared modules and layouts.",
    stack: ["Vue", "TypeScript", "Vuetify", "Pinia"],
    images: [],
  },
  {
    title: "Mixpanel Integration for Product Analytics",
    role: "Frontend Developer – Octo",
    description:
      "Integrated Mixpanel for tracking key user actions and flows. Mapped meaningful events across modules like Dashboard, Cost Reports, and Recommendations to provide product and marketing teams with actionable insights and usage metrics.",
    stack: ["Vue", "Mixpanel", "TypeScript"],
    images: [],
  },
  {
    title: "i18n Integration & Localization Support",
    role: "Frontend Developer – Octo",
    description:
      "Enabled multi-language support across the Octo platform by integrating i18n. Refactored components and views to support dynamic language switching, external translation files, and localization of date, time, and currency.",
    stack: ["Vue", "i18n", "TypeScript", "Vuetify"],
    images: [],
  },
];

export const freelanceProjects: Project[] = [
  {
    title: "RentHive – MVP UI",
    role: "UI Developer – Co-Founder",
    description:
      "Designed and developed the user interface for RentHive, a rental listing platform created during Startup Weekend Bohol. Focused on building a responsive and intuitive MVP using clean Tailwind-based components. Helped the team win 2nd place among all participants.",
    stack: ["HTML", "Tailwind CSS"],
    images: [
      "/assets/renthive/rh1.png",
      "/assets/renthive/rh2.png",
      "/assets/renthive/rh3.png",
      "/assets/renthive/rh4.png",
    ],
  },
  {
    title: "Pacific West Diagnostic Imaging",
    role: "Freelance Web Developer",
    description:
      "Developed a full-featured medical website using Wix for Pacific West Diagnostic Imaging. The site includes custom CSS styling, Stripe payment integration, and multiple service pages, offering a seamless experience for both patients and staff.",
    stack: ["Wix", "Custom CSS", "Stripe"],
    images: [
      "/assets/pacwest/pw1.png",
      "/assets/pacwest/pw2.png",
      "/assets/pacwest/pw3.png",
      "/assets/pacwest/pw4.png",
    ],
  },
  {
    title: "CzechVibes",
    role: "Freelance Frontend Developer",
    description:
      "Built a responsive, multi-language frontend for a European travel and content brand. Developed using HTML and Tailwind, the site was optimized for mobile and desktop, focusing on clean layouts and accessibility.",
    stack: ["HTML", "Tailwind CSS"],
    images: [
      "/assets/czech/cv1.png",
      "/assets/czech/cv2.png",
      "/assets/czech/cv3.png",
      "/assets/czech/cv4.png",
    ],
  },
  {
    title: "Arnis Scoreboard",
    role: "Personal Project",
    description:
      "Built a real-time scoring and timer system used during an Arnis tournament. Designed for simplicity and usability, the app lets users track round durations and update scores with ease. Tailored for live competitions with a responsive layout and clean UI.",
    stack: ["Vue", "Vuetify"],
    images: [
      "/assets/arnis/arnis1.png",
      "/assets/arnis/arnis2.png",
      "/assets/arnis/arnis3.png",
    ],
  },
];

export const automationProjects: Project[] = [
  {
    title: "Slack → ClickUp – Bug Report Automation (Make)",
    role: "Automation Specialist – Internal Tools",
    description:
      "Automated conversion of Slack bug report messages into structured ClickUp tasks. Extracts key details, downloads attachments, assigns to the correct list, and applies tags automatically, enabling faster triage and seamless QA handoff.",
    stack: ["Make", "Slack API", "ClickUp API", "Webhooks"],
    images: [],
  },
  {
    title: "Slack → ClickUp – Bug Report Automation (n8n)",
    role: "Automation Specialist – Internal Tools",
    description:
      "Rebuilt the Slack bug report workflow in n8n for greater control and flexibility. Handles message parsing, attachment retrieval, conditional routing, and task creation with failover logic to prevent data loss.",
    stack: ["n8n", "Slack API", "ClickUp API", "JavaScript", "Webhooks"],
    images: [],
  },
  {
    title: "Slack → ClickUp – UX Enhancement Reporting (Make)",
    role: "Automation Specialist – Internal Tools",
    description:
      "Filtered Slack messages tagged for UI/UX improvements and sent them to a dedicated ClickUp list. Automatically separated enhancements from bugs to help design and frontend teams prioritize effectively.",
    stack: ["Make", "Slack API", "ClickUp API", "Webhooks"],
    images: [],
  },
  {
    title: "Slack → ClickUp – UX Enhancement Reporting (n8n)",
    role: "Automation Specialist – Internal Tools",
    description:
      "Developed an n8n workflow to route Slack UX enhancement reports to the correct ClickUp list. Added conditional logic, metadata customization, and list-based routing for better task organization.",
    stack: ["n8n", "Slack API", "ClickUp API", "Webhooks"],
    images: [],
  },
  {
    title: "Slack → Internal Kanban – Task Capture (n8n)",
    role: "Automation Specialist – Internal Tools",
    description:
      "Built an automation that converts Slack messages into structured tasks in the internal Kanban. Captures title, description, points, assignees via @mentions, tags, and links back to the original Slack thread.",
    stack: [
      "n8n",
      "Slack Events API",
      "Custom Kanban API",
      "JavaScript",
      "Webhooks",
    ],
    images: [],
  },
  {
    title: "Zoom → YouTube Upload Pipeline (n8n)",
    role: "Automation Specialist – Media Ops",
    description:
      "Automated the end-to-end handling of Zoom cloud recordings: fetches month-by-month, logs metadata to Google Sheets, stores raw files in Wasabi (S3-compatible), and uploads to YouTube within the 15 uploads/day cap.",
    stack: [
      "n8n",
      "Zoom API",
      "YouTube Data API v3",
      "Google Sheets API",
      "Wasabi (S3)",
      "Cron",
    ],
    images: [],
  },
  {
    title: "Slack Bot – Task Intake & Acknowledgements",
    role: "Automation Specialist – Internal Tools",
    description:
      "Created a Slack app that listens for mentions in channels/threads, validates message format, and sends structured payloads to n8n flows for bug reports, UX requests, and general tasks. Posts confirmation replies with direct task links.",
    stack: [
      "Slack Bolt API",
      "Slack Events API",
      "n8n",
      "JavaScript",
      "TypeScript",
      "Webhooks",
    ],
    images: [],
  },
];

export const techGroups: TechGroup[] = [
  {
    label: "Frontend Frameworks & Styling",
    items: [
      { name: "Vue", logo: "/assets/logos/vue.svg" },
      { name: "React", logo: "/assets/logos/react.svg" },
      { name: "Vuetify", logo: "/assets/logos/vuetify.svg" },
      { name: "Tailwind CSS", logo: "/assets/logos/tailwind.svg" },
      { name: "Flutter", logo: "/assets/logos/flutter.svg" },
      { name: "Bootstrap", logo: "/assets/logos/bootsrap.svg" },
    ],
  },
  {
    label: "Programming Languages",
    items: [
      { name: "JavaScript", logo: "/assets/logos/javascript.svg" },
      { name: "TypeScript", logo: "/assets/logos/typescript.svg" },
      { name: "HTML", logo: "/assets/logos/html.svg" },
      { name: "CSS", logo: "/assets/logos/css.svg" },
      { name: "C", logo: "/assets/logos/c.svg" },
      { name: "C++", logo: "/assets/logos/c++.svg" },
      { name: "Dart", logo: "/assets/logos/dart.svg" },
    ],
  },
  {
    label: "Workflow Automation & Integrations",
    items: [
      { name: "Make", logo: "/assets/logos/make.svg" },
      { name: "n8n", logo: "/assets/logos/n8n.svg" },
      { name: "Zapier", logo: "/assets/logos/zapier.svg" },
      { name: "OpenAI / ChatGPT", logo: "/assets/logos/openAi.svg" },
      { name: "Slack", logo: "/assets/logos/slack.svg" },
      { name: "ClickUp", logo: "/assets/logos/clickup.svg" },
    ],
  },
  {
    label: "Analytics & Visualization",
    items: [
      { name: "Mixpanel", logo: "/assets/logos/mixpanel.svg" },
      { name: "ECharts", logo: "/assets/logos/echarts.svg" },
    ],
  },
  {
    label: "Developer Tools",
    items: [
      { name: "Pinia", logo: "/assets/logos/pinia.svg" },
      { name: "GridStack.js", logo: "/assets/logos/gridstack.svg" },
      { name: "i18n", logo: "/assets/logos/i18n.svg" },
      { name: "Git", logo: "/assets/logos/git.svg" },
    ],
  },
  {
    label: "Video & Motion",
    items: [
      { name: "VSL editing", logo: "/assets/logos/timeline.svg" },
      { name: "Short-form ads", logo: "/assets/logos/timeline.svg" },
      { name: "Motion graphics", logo: "/assets/logos/motion.svg" },
      { name: "Colour grading", logo: "/assets/logos/grade.svg" },
      { name: "CapCut", logo: "/assets/logos/timeline.svg" },
    ],
  },
  {
    label: "Design & Collaboration Tools",
    items: [
      { name: "Figma", logo: "/assets/logos/figma.svg" },
      { name: "Notion", logo: "/assets/logos/notion.svg" },
    ],
  },
];

export const badges: Badge[] = [
  {
    title: "FinOps Certified Practitioner",
    image: "/assets/badges/finOpsPrac.png",
    link: "https://www.credly.com/badges/daf53222-223e-49b5-9aff-af074dc73802/public_url",
  },
];

export const certs: Cert[] = [
  {
    title: "Vue Masterclass (Covers Vue2 and Vue3)",
    image: "/assets/certs/vueCert.jpg",
  },
  {
    title: "Tailwind CSS Masterclass",
    image: "/assets/certs/tailwindCert.jpg",
  },
  {
    title: "Build Responsive Websites with HTML & CSS",
    image: "/assets/certs/htmlcssCert.jpg",
  },
];

export type ExperiencePhase = {
  slug: string;
  title: string;
  period: string;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  learnings: string[];
  technologies: string[];
  relatedProjectSlugs: string[];
};

export type ProjectVideo = {
  src: string;
  poster: string;
  title: string;
  orientation: "portrait" | "landscape";
  note?: string;
};

export type ProjectCaseStudy = {
  slug: string;
  title: string;
  category:
    | "Product"
    | "Startup"
    | "Automation"
    | "Operations"
    | "Video & Motion"
    | "Personal"
    | "Client Work";
  overview: string;
  businessProblem: string;
  role: string;
  contributions: string[];
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  stack: string[];
  screenshots: string[];
  videos?: ProjectVideo[];
  /** The system's main path, step by step (drawn as a flow diagram). */
  flow?: string[];
  /** n8n workflows to draw as canvases (ids from data/workflows.ts). */
  workflows?: string[];
  /** Where the work stands, e.g. "Live" or "In testing". */
  status?: string;
  demoUrl?: string;
  liveLabel?: string;
  githubUrl?: string;
  relatedExperienceSlug: string;
  featured?: boolean;
};

export type Credential = {
  slug: string;
  title: string;
  issuer: string;
  dateEarned?: string;
  type: "Certification" | "Badge" | "Training" | "Recognition";
  verificationUrl?: string;
  credentialId?: string;
  context: string;
  image?: string;
};

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    slug: "talent-agency-client-portal",
    title: "Client Portal & KPI Dashboard for a Talent Agency",
    category: "Operations",
    status: "Live",
    overview:
      "A talent management agency's client approved creators, rates, concepts and drafts over email and chat, and the team re-keyed every answer into its Google Sheets. I built a private client portal where everything waiting on the client is one tap, written straight back to the sheets the team already runs on.",
    businessProblem:
      "Deals moved through several Google Sheets while approvals arrived scattered across messages. The team spent time chasing answers and copying them across, and the client had no single place to see where each creator stood. The team's Google Sheets had to stay the source of truth.",
    role: "Ops & Automation Assistant · Penguin Ops · Lead builder on the portal and KPI dashboard",
    contributions: [
      "Built one-tap client decisions (approve a creator, agree a rate, pick a concept, review a draft) that write back to the right sheet row, with a 10-minute Undo.",
      "Showed every deal's stage, contract status from PandaDoc with signed-PDF download, and live video performance from the YouTube API with a 30-day report.",
      "Added daily jobs for Slack reminders and a sheet-structure check, plus a Monday digest email.",
      "Gave staff a View as client mode, an audit log and a History page that shows whether each answer reached the sheet, with Retry.",
      "Enforced access in the database with row-level security so each client only ever sees their own deals.",
      "Built the first version of the agency's read-only KPI dashboard on the same master sheet: weekly to all-time stats, alerts, reports against target, collections and cash flow.",
    ],
    challenges: [
      "The sheets had to stay the source of truth, so the portal could not own the data.",
      "A client portal must never show one client another client's deals.",
      "Google access usually means a stored key file, which is one more secret to leak.",
    ],
    solutions: [
      "Read from the sheets and wrote answers back, with an Undo window and a visible delivery status on every answer.",
      "Put access rules in Postgres rather than in page code, so a missed check in the UI cannot leak data.",
      "Used Vercel's identity token for Google access, so no key file is stored anywhere.",
    ],
    outcomes: [
      "Live on the agency's own domain since 2 October 2026.",
      "Client decisions land in the team's sheet the moment they are made.",
      "Staff can check any page exactly as the client sees it.",
    ],
    stack: [
      "Next.js",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Supabase",
      "Google Sheets API",
      "PandaDoc",
      "YouTube Data API",
      "Resend",
      "Slack",
      "Vercel Cron",
    ],
    flow: [
      "Google Sheets (source of truth)",
      "Client portal",
      "One-tap decision",
      "Write-back with Undo",
      "Slack reminders and Monday digest",
    ],
    screenshots: [
      "/assets/work/portal-videos.jpg",
      "/assets/work/portal-deal.jpg",
    ],
    relatedExperienceSlug: "penguin-ops",
    featured: true,
  },
  {
    slug: "ad-agency-scorecard",
    title: "Weekly Scorecard for a Performance Ad Agency",
    category: "Operations",
    status: "Parallel run · cutover Oct 2026",
    overview:
      "A performance ad agency ran its weekly team targets from a Google Sheet that people typed into, and the script feeding it had quietly stopped recording results. I repaired the old system first, then replaced the sheet with a web app where every number is calculated from the source systems and nothing is typed.",
    businessProblem:
      "The weekly scorecard decided what the team worked on, but its numbers were partly hand-entered and the Apps Script scanner behind it had stopped recording verdicts in early September. Nobody could say which numbers were current, and every correction relied on whoever typed last.",
    role: "Ops & Automation Assistant · Penguin Ops · Sole builder: data, app and cutover",
    contributions: [
      "Repaired the V1 scanner and restored 130 lost verdicts, 119 of them dated from version history.",
      "Fed a Postgres database from Asana webhooks on every client board, an hourly read of each campaign vault, and a daily Meta spend pull.",
      "Wrote the metric engine as tested pure functions: rows in, numerator, denominator and value out.",
      "Shipped the scorecard, an admin Control Panel with dated targets, a Data health page that explains anything that could make a number wrong or late, and a How it works guide for the team.",
      "Added a Monday Slack digest of last week's hits and misses with reasons, and a sheet mirror so the familiar view stays.",
      "Deployed on the agency's own Google Cloud (Cloud Run, Cloud Scheduler, Secret Manager) behind Google sign-in, with a parallel run and cutover plan.",
    ],
    challenges: [
      "People trust the sheet they know; the new numbers had to be proven before anyone switched.",
      "Data arrives from four sources on different schedules, and any of them can be late or wrong.",
    ],
    solutions: [
      "Ran a parity check against V1 and traced every difference to a known cause before cutover.",
      "Made data problems visible on a Data health page and in the digest instead of letting them hide in a cell.",
    ],
    outcomes: [
      "328 of 351 weekly values match the old sheet (93%), and all 23 differences trace to known V1 behaviour.",
      "Derived events agree with V1 on all 12,785 events both systems hold.",
      "130 lost verdicts recovered before the switch.",
    ],
    stack: [
      "Next.js",
      "Supabase (Postgres)",
      "Google Cloud Run",
      "Cloud Scheduler",
      "Asana API",
      "Meta Marketing API",
      "Google Apps Script",
      "Slack",
    ],
    flow: [
      "Asana card moves (webhooks)",
      "Vault verdicts and spend (hourly)",
      "Meta spend (daily)",
      "Metric engine",
      "Scorecard and Monday digest",
    ],
    screenshots: [
      "/assets/work/scorecard-weekly.jpg",
      "/assets/work/scorecard-data-health.jpg",
    ],
    relatedExperienceSlug: "penguin-ops",
    featured: true,
  },
  {
    slug: "google-ads-agency-operations",
    title: "Client Operations for a Google Ads Agency",
    category: "Operations",
    overview:
      "A Google Ads agency serving nearly 80 e-commerce clients onboarded each one by hand across Typeform, ClickUp and Slack. I built its operations layer in n8n: 14 workflows that onboard clients and stores, assign media buyers, pull spend and revenue, and review every client channel each week.",
    businessProblem:
      "Every new client meant the same long checklist: the client and store in ClickUp, onboarding tasks, a checklist and client doc, internal and external Slack channels, an invite and a welcome message. Steps got missed, and with dozens of clients nobody had a weekly read on how each relationship was going.",
    role: "Ops & Automation Assistant · Penguin Ops · Builder and operator of all 14 workflows",
    contributions: [
      "New client onboarding: one Typeform submission runs a 38-node workflow, from the ClickUp client, store and tasks to internal and external Slack channels, a Slack Connect invite and a pinned welcome message.",
      "Store onboarding and buyer assignment flows that invite the media buyer and assign their stores.",
      "A weekly Slack pulse: every Monday it reads each client's channels and has Claude review the week, so issues surface before the client raises them.",
      "Spend, ROAS and fee tracking: Google Ads spend pulled through the manager account, converted to EUR at ECB rates and written into ClickUp.",
      "Shopify store connection with a daily revenue pull, a 26-question funnel brief into ClickUp, broadcasts to client channels, and an alert when an onboarding fails.",
      "Generated every workflow from Python scripts so they can be rebuilt and versioned, and wrote a client-facing Claude Console setup guide.",
    ],
    challenges: [
      "Onboarding touches four tools, and a half-finished run is worse than none.",
      "A weekly AI review across nearly 80 channels has to stay cheap and quiet.",
    ],
    solutions: [
      "Added an onboarding error alert so a failed run is caught and finished by a person.",
      "Gave the AI one bounded job per client per week, estimated at about $20 a month for the whole digest.",
    ],
    outcomes: [
      "Client onboarding went from a manual checklist to one form submission.",
      "14 workflows built on the agency's self-hosted n8n, reproducible from code.",
      "Every client channel gets a weekly review without anyone reading them all.",
    ],
    stack: [
      "n8n (self-hosted)",
      "ClickUp API",
      "Slack API",
      "Typeform",
      "Shopify Admin API",
      "Google Ads API",
      "Claude API",
      "Python",
    ],
    workflows: ["client-onboarding", "weekly-pulse", "spend-roas"],
    flow: [
      "Typeform intake",
      "n8n (38 nodes)",
      "ClickUp client, store and tasks",
      "Slack channels and invite",
      "Pinned welcome message",
    ],
    screenshots: [
      "/assets/work/ops-pulse-cover.jpg",
    ],
    relatedExperienceSlug: "penguin-ops",
    featured: true,
  },
  {
    slug: "retail-business-os",
    title: "Business OS for a Three-Brand Retail Group",
    category: "Operations",
    status: "In testing",
    overview:
      "A haircare retail group with three businesses (online retail, a salon brand and wholesale) had a CEO dashboard and 47 n8n workflows, but no shared view of what to do next. I audited the stack, then rebuilt the dashboard and the agent layer as one Business OS: agents analyse and recommend, people approve and act, and results come back to be checked.",
    businessProblem:
      "Data lived in Shopify, Omnisend, Monday.com and dozens of automations. The dashboard reported numbers but did not say what needed attention, and it was hard to tell which automations were healthy.",
    role: "Automation & Web Developer · Client engagement",
    contributions: [
      "Audited the existing system (369 commits, the Cloudflare setup and 47 n8n workflows) and wrote the go-live proposal.",
      "Designed a closed loop: connectors bring data in, specialist agents analyse only their own area, recommendations enter an approval queue by risk and spend, approved work becomes Monday.com tasks, and results are compared with the original recommendation.",
      "Rebuilt the CEO dashboard UI, with a sample-data preview build for review.",
      "Kept the existing n8n ingestion and gave it one front door: n8n maps each vendor's data (ads, bookings, messaging, CRM, content) to a standard format and posts it to a single validated connector endpoint, up to 500 records a batch.",
      "Wired the agents to run daily at 07:00 New York on real data only when they are switched on and their data is less than 45 days old, otherwise they wait instead of guessing.",
      "Built a two-step purchase-order flow for low stock that opens a Monday.com task, email and SMS results pages and a UGC video agent, and started the Meta ads feed.",
      "Wrote an n8n setup guide, including MCP access, so the team that maintains the workflows can work on them safely.",
    ],
    challenges: [
      "Sixteen agents across three businesses is a lot of moving parts to trust at once.",
      "Recommendations that spend money or change stock need a human decision.",
    ],
    solutions: [
      "Brought agents online one at a time on a test site and tracked every run.",
      "Routed every recommendation through an approval queue weighted by risk and spend.",
    ],
    outcomes: [
      "4 of 16 agents running on the test site: the troubleshooting agent completed 164 of 165 runs cleanly and the daily briefing 21 of 21.",
      "Go-live proposal and a progress update delivered.",
    ],
    stack: [
      "React",
      "Vite",
      "Cloudflare Pages",
      "Cloudflare Workers",
      "Cloudflare D1",
      "n8n",
      "n8n MCP",
      "Monday.com",
      "Shopify",
      "Omnisend",
      "Claude",
    ],
    flow: [
      "n8n ingestion (47 workflows)",
      "Validated connector API",
      "Specialist agents, daily 07:00",
      "Approval queue",
      "Monday.com tasks and results check",
    ],
    screenshots: [
      "/assets/work/avh-overview.jpg",
      "/assets/work/avh-automations.jpg",
      "/assets/work/avh-decisions.jpg",
      "/assets/work/avh-inventory.jpg",
      "/assets/work/avh-briefing.jpg",
    ],
    relatedExperienceSlug: "retail-group",
    featured: false,
  },
  {
    slug: "governed-ai-media-buying",
    title: "MBOS: Governed AI Media Buying System",
    category: "Operations",
    status: "Simulated · not live",
    overview:
      "An AI system that runs paid ads on Meta and Google, creative production and content for consumer brands, built so it cannot spend money on its own. Spend is off until switched on, campaigns are created paused, and releasing money needs two people.",
    businessProblem:
      "AI agents can draft campaigns and creative quickly, but an agent with a budget is a liability. The system had to keep the speed without the risk: every spend decision approved, logged and reversible, and one switch that stops everything.",
    role: "Systems Implementation Associate · Stakra · MBOS builder",
    contributions: [
      "Built the template repository each brand instance is created from: kill switch, Google and Meta signal readers, the media-buyer agent, and an Airtable ledger for creative and experiments.",
      "Wrote 79 contracts that define what each part may and may not do.",
      "Built Watchtower, a read-only dashboard that shows whether every automation, agent and webhook is alive, and wired MBOS approval events into it.",
      "Prepared the Phase 1 operator demo.",
    ],
    challenges: [
      "Spend safety has to hold even when an agent or a person makes a mistake.",
      "Automations fail silently; a dead webhook is usually found a week late.",
    ],
    solutions: [
      "Made every money path fail closed and require two-person release.",
      "Gave Watchtower five status states, a Needs attention list and monitoring of the monitor itself, so a silent failure becomes a visible one.",
    ],
    outcomes: [
      "The full pipeline suite passes 9,998 tests with no failures in a simulated instance.",
      "Watchtower v1 complete: all 17 planned chunks shipped, 19 connections monitored.",
      "Not switched on yet; the first brand runs in simulation.",
    ],
    stack: [
      "Node.js",
      "GitHub Actions",
      "Airtable",
      "Google Ads API",
      "Meta Marketing API",
      "Next.js",
      "Supabase",
      "Healthchecks",
    ],
    flow: [
      "Ad signals",
      "Media-buyer agent",
      "Two-person approval",
      "Campaign created paused",
      "Watchtower and kill switch",
    ],
    screenshots: [
      "/assets/work/mbos-authority.jpg",
    ],
    relatedExperienceSlug: "stakra",
    featured: false,
  },
  {
    slug: "salon-operations-app",
    title: "Salon OS: Operations App for Small Salons",
    category: "Operations",
    status: "In client review",
    overview:
      "A white-label operations app for small salons, built first for a salon in Metro Manila: point of sale with stylist commissions, a daily sales quota with a staff bonus, customers with follow-up reminders, inventory by supplier, expenses, attendance, payroll and payslips.",
    businessProblem:
      "Small salons run on notebooks and spreadsheets. Commissions are worked out by hand at month end, stock is reordered when it runs out, and regular customers drift away because nobody remembers to follow up.",
    role: "Systems Implementation Associate · Stakra",
    contributions: [
      "Point of sale for services and retail with flexible pricing, and commission snapshots so a later rate change never rewrites past pay.",
      "Daily sales quota with a staff bonus, attendance with late deductions, payroll runs and payslips.",
      "Customer records with visit history and a 90-day follow-up list; inventory grouped by supplier with a restock list.",
      "Reports with CSV export, a first-run setup wizard that brands the app for each salon, a daily Google Sheets mirror, and Admin and Receptionist roles.",
    ],
    challenges: [
      "Pay and commission rules have edge cases that are rarely written down.",
    ],
    solutions: [
      "Wrote the business rules as a spec with worked examples, logged every decision made where the spec was silent, and listed open questions for the owner to confirm.",
    ],
    outcomes: [
      "Complete first version with 32 automated tests, ready for the owner's review.",
      "White-label from the start: the next salon is a setup wizard away.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL (Neon)",
      "shadcn/ui",
      "Recharts",
      "Vitest",
      "Vercel",
    ],
    flow: [
      "Point of sale",
      "Commission snapshot",
      "Daily quota and bonus",
      "Payroll and payslips",
      "Reports and Sheets mirror",
    ],
    screenshots: [
      "/assets/work/salon-cover.jpg",
      "/assets/work/salon-checkout.jpg",
      "/assets/work/salon-home.jpg",
    ],
    relatedExperienceSlug: "stakra",
    featured: false,
  },
  {
    slug: "clipt-vsl",
    title: "Clipt: Sales Video (VSL)",
    category: "Video & Motion",
    overview:
      "A 35-minute sales video for Clipt, a mobile foot-care training company, cut from hours of 4K footage of its founder. Every section carries on-brand panels timed to what he says, full-screen statements for the big moments, and framing that follows the graphics, so a long video stays easy to watch from start to finish.",
    businessProblem:
      "A long sales video only works if people keep watching. Raw founder footage has retakes, long pauses and no visual structure, and generic templates make a brand look like everyone else. Clipt needed the full video plus a steady stream of shorter pieces, all looking like they came from the same company.",
    role: "Video Editor & Motion Graphic Designer · Clipt",
    contributions: [
      "Cleaned the raw takes: retakes, fillers and mouth clicks removed, pauses tightened, repeated lines tracked across the whole script so nothing is said twice.",
      "Designed frosted information panels in Clipt's brand style that appear in step with his speech, with framing that follows them: in close beside one panel, wide between two.",
      "Built full-screen statements, title cards, a coverage map of the United States and Canada, and an animated Clipt logo from the brand's own vector files.",
      "Built a cold open and a words-behind-the-speaker effect for the lines that need to land hardest.",
      "Graded colour by measuring each location's footage, and mixed UI sound effects at levels that sit under his voice.",
      "Built a brand-driven editing system around it: brand rules, reusable motion graphics and a checklist for every format, so each new piece comes out consistent and fast.",
    ],
    challenges: [
      "Thirty-five minutes is a long time to hold attention with one speaker in one setting.",
      "The graphics had to match the brand book exactly and stay calm: no harsh zooms, no fake shadows on the logo, and every element animating out instead of vanishing on a cut.",
    ],
    solutions: [
      "Gave every section a visual job: a panel that builds point by point, a full-screen statement, or a wide two-panel comparison for offers and pricing.",
      "Wrote the brand and motion rules down once and applied them to every section, so the last block looks like the first.",
    ],
    outcomes: [
      "A complete 35-minute VSL delivered in 4K, with a consistent look across every section.",
      "The same brand system now drives Clipt's ads, testimonials and title cards.",
    ],
    stack: ["VSL editing", "Motion graphics", "Brand system", "Colour grading", "Sound design", "4K delivery"],
    screenshots: [
      "/assets/clipt/stills/vsl-panel.jpg",
      "/assets/clipt/stills/vsl-two-panels.jpg",
      "/assets/clipt/stills/vsl-statement.jpg",
      "/assets/clipt/stills/vsl-booking-panel.jpg",
    ],
    videos: [
      {
        src: "/assets/clipt/vsl-highlights.mp4",
        poster: "/assets/clipt/vsl-highlights.jpg",
        title: "VSL highlights",
        orientation: "landscape",
        note: "About a minute from the 35-minute sales video",
      },
      {
        src: "/assets/clipt/vsl-text-behind.mp4",
        poster: "/assets/clipt/vsl-text-behind.jpg",
        title: "Words behind the speaker",
        orientation: "landscape",
      },
      {
        src: "/assets/clipt/vsl-3d-panels.mp4",
        poster: "/assets/clipt/vsl-3d-panels.jpg",
        title: "Panels timed to speech",
        orientation: "landscape",
      },
      {
        src: "/assets/clipt/logo-3d-intro.mp4",
        poster: "/assets/clipt/logo-3d-intro.jpg",
        title: "Animated logo intro",
        orientation: "landscape",
      },
    ],
    relatedExperienceSlug: "clipt",
    featured: true,
  },
  {
    slug: "clipt-short-form-ads-testimonials",
    title: "Clipt: Short-Form Ads & Nurse Testimonials",
    category: "Video & Motion",
    overview:
      "Vertical ads (most around 15 seconds) and nurse testimonials for social, built from the same brand system as the sales video. The headline is on screen from the first frame, zooms ease onto the stressed words, and branded cards appear exactly when the speaker says them.",
    businessProblem:
      "Short ads live or die in the first second, and testimonials shot on a phone rarely match the brand's look. Each piece had to start strong, stay on the speaker's face, and look like it came from the same company as the sales video.",
    role: "Video Editor & Motion Graphic Designer · Clipt",
    contributions: [
      "Cut four vertical ads from the client's ad guide, finding each quoted line in the 4K camera originals and reframing to 9:16 on the face.",
      "Added half-second eased zooms on stressed words with the face held in place, about one every 10 to 12 seconds, each with a soft whoosh.",
      "Edited two nurse testimonials with a branded card under the chin timed to their words, the Clipt Verified badge, and each name with its credential.",
      "Matched colour and loudness to the sales video, and left captions off the master so they can be styled last for each platform.",
    ],
    challenges: [
      "Snap zooms read as harsh and frequent moves read as shaky; the right pace had to be found by testing.",
      "Phone audio and lighting vary between testimonials.",
    ],
    solutions: [
      "Settled on sparse, eased zooms (one per 10 to 12 seconds) after reviewing test cuts, and made that the standard for every ad.",
      "Measured each clip's colour and levels against the sales video instead of grading by eye.",
    ],
    outcomes: [
      "Four ads and two testimonials cut at 2K (1440 × 2560), consistent with the sales video's look.",
      "New ads start from the same brand recipe, so the fifth ad follows the same standard as the first.",
    ],
    stack: ["Short-form ads", "Vertical video", "Motion graphics", "Colour grading", "Sound design", "CapCut"],
    screenshots: [],
    videos: [
      {
        src: "/assets/clipt/ad-keep-your-hospital-role.mp4",
        poster: "/assets/clipt/ad-keep-your-hospital-role.jpg",
        title: "Keep your hospital role",
        orientation: "portrait",
      },
      {
        src: "/assets/clipt/ad-where-do-you-start.mp4",
        poster: "/assets/clipt/ad-where-do-you-start.jpg",
        title: "Where do you start",
        orientation: "portrait",
      },
      {
        src: "/assets/clipt/ad-more-than-nail-trimming.mp4",
        poster: "/assets/clipt/ad-more-than-nail-trimming.jpg",
        title: "More than nail trimming",
        orientation: "portrait",
      },
      {
        src: "/assets/clipt/ad-manageable-caseload.mp4",
        poster: "/assets/clipt/ad-manageable-caseload.jpg",
        title: "Manageable caseload",
        orientation: "portrait",
      },
      {
        src: "/assets/clipt/testimonial-3d-cards.mp4",
        poster: "/assets/clipt/testimonial-3d-cards.jpg",
        title: "Nurse testimonial",
        orientation: "portrait",
      },
    ],
    relatedExperienceSlug: "clipt",
    featured: true,
  },
  {
    slug: "bouquet-cipher",
    title: "Bouquet Cipher",
    category: "Personal",
    overview:
      "Type a message and a hand-drawn bouquet grows with every keystroke. The flowers are the message: every word is a stem, vowels are flowers and consonants are leaves. Share it with a link or a QR gift tag, and the recipient's page unwraps the bouquet and reads it back into words.",
    businessProblem:
      "Digital messages all look the same. I wanted a way to send something that feels made by hand, where the gift itself carries the words and only the person holding the link can read them.",
    role: "Solo Designer & Developer · Personal project",
    contributions: [
      "Designed a floral alphabet: six flowers for the vowels, leaf shapes in three tints for consonants, and their own buds, curls and berries for punctuation and numbers.",
      "Gave every bouquet its own random key that shuffles the alphabet and picks the arrangement and palette, so two identical messages grow into different bouquets.",
      "Built the recipient's journey: the wrapped bouquet, unwrapping, a wax-sealed envelope, and the letter written out as each flower lights up.",
      "Added decoding by camera scan of the QR tag, image upload, or typed code, plus optional accounts with Sent, Received and Inbox and replies between senders.",
    ],
    challenges: [
      "The bouquet you watch grow has to be exactly the one that is sent and decoded.",
      "Shuffled alphabets must still look good: no withered leaves, no clashing palettes.",
    ],
    solutions: [
      "The composer holds the draft's key, so the preview and the sent bouquet are generated from the same key.",
      "Kept vowels as flowers and leaves in fresh greens whatever the key, and enforced it with tests.",
    ],
    outcomes: [
      "A complete, shareable product: compose, wrap, send, scan and read, with optional accounts.",
      "Tested with unit, property-based and end-to-end tests.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "SVG", "Vitest", "Playwright"],
    screenshots: ["/assets/bouquet/bouquet-cover.jpg", "/assets/bouquet/bouquet-gift-tag.jpg"],
    videos: [
      {
        src: "/assets/bouquet/bouquet-grow.mp4",
        poster: "/assets/bouquet/bouquet-grow.jpg",
        title: "A message growing into a bouquet",
        orientation: "portrait",
      },
    ],
    demoUrl: "https://bouquet-cipher.vercel.app",
    liveLabel: "Visit site",
    relatedExperienceSlug: "personal",
    featured: false,
  },
  {
    slug: "octo",
    title: "Octo: Cloud Cost Management Platform",
    category: "Product",
    overview:
      "Octo's product was strong. The delivery system around it wasn't. PR reviews were inconsistent, bug reporting required switching tools, and weekly releases meant every friction point had a real cost. I owned frontend delivery, and the surrounding systems that kept the team moving.",
    businessProblem:
      "Octo's product was strong, but delivery friction was quietly compounding. PR reviews were inconsistent, onboarding had unnecessary steps, and bug reporting required switching between multiple tools. Weekly releases meant these problems had real cost, not from lack of effort, but because the system around the work was creating drag. Fixing the product meant fixing how the team moved.",
    role: "Lead Frontend Developer · Octo by Alphaus",
    contributions: [
      "Built and maintained cloud cost dashboards, recommendation views, budget management, and reporting systems using Vue, Vuetify, and ECharts.",
      "Introduced PR templates with structured sections (problem, scope, screenshots, release notes), which standardized reviews and made weekly deployments more predictable.",
      "Built a Slack-to-ClickUp bug reporting automation in Make, then rebuilt it in n8n for stronger parsing. It became the company-wide standard, recognized by leadership and noticed by the CEO.",
      "Simplified the user onboarding flow, removing friction points that slowed early product adoption.",
      "Integrated Mixpanel analytics and i18n localization across core product modules.",
      "Mentored junior developers and backend engineers on frontend architecture, codebase structure, and frontend-to-API workflows.",
    ],
    challenges: [
      "Operational improvements (PR templates, workflow standards, automation) rarely feel urgent next to feature work, even when they protect long-term delivery speed.",
      "Financial data dashboards need to feel trustworthy, not just functional. Users make real spending decisions from these views.",
      "A new internal reporting tool only creates value if people adopt it. Building it inside the tool teams already used was the only way to make that work.",
    ],
    solutions: [
      "Treated system improvements as delivery investments, not optional cleanup: PR templates and Git workflow standards reduced review friction and protected future velocity.",
      "Focused dashboard and report design on data clarity and consistent formatting, not visual complexity.",
      "Built the bug workflow inside Slack itself, reducing adoption friction to near zero, since the tool was already open.",
    ],
    outcomes: [
      "Bug reporting automation adopted company-wide: it eliminated manual ticket triage and was recognized directly by the CEO.",
      "Faster, more consistent PR reviews and weekly releases across the product team.",
      "Improved frontend onboarding time for new developers and reduced dependency bottlenecks across the team.",
    ],
    stack: [
      "Vue",
      "TypeScript",
      "Vuetify",
      "ECharts",
      "GridStack",
      "Pinia",
      "Mixpanel",
      "i18n",
      "Make",
      "n8n",
      "Cypress",
    ],
    screenshots: [
      "/assets/octo/db1.png",
      "/assets/octo/db2.png",
      "/assets/octo/rec1.png",
      "/assets/octo/alert1.png",
    ],
    demoUrl: "https://www.alphaus.cloud/en/octo",
    relatedExperienceSlug: "alphaus",
    featured: true,
  },
  {
    slug: "rentwise-qualification-platform",
    title: "RentWise: Rental Qualification Platform",
    category: "Product",
    overview:
      "Most rental platforms solve discovery.\nThey don't solve approval confidence.\n\nRenters apply to places they won't qualify for.\nLandlords review applicants who were never a good fit.",
    businessProblem:
      "Most rental platforms solve visibility, not decision quality. Renters apply to properties they won't qualify for. Landlords receive applications that were never a good fit. Both sides waste time and energy on bad matches. The core problem wasn't finding listings. It was knowing which ones were actually worth pursuing. Qualification logic needed to come before the application, not after rejection.",
    role: "Full Stack Developer · RentWise",
    contributions: [
      "Built the detailed renter onboarding flow capturing income, household size, guarantors, pets, vehicles, and rental history, mirroring what landlords actually evaluate.",
      "Implemented hard-requirement filtering that removes clearly mismatched listings before a renter considers applying.",
      "Developed a multi-factor scoring layer that ranks listings by fit strength, not just availability.",
      "Integrated third-party background check APIs for credit, criminal, and screening data.",
      "Designed the match-focused dashboard showing strongest property opportunities with qualification visibility.",
      "Collaborated directly with founders on qualification logic, scoring weights, and product flow validation.",
    ],
    challenges: [
      "Qualification filtering that's too aggressive breaks trust; too lenient removes the product's core value. The right calibration required real business judgment, not just technical rules.",
      "Handling sensitive personal data (SSN, background check inputs) responsibly without building internal screening infrastructure.",
    ],
    solutions: [
      "Modeled qualification rules after real landlord criteria so filtering felt accurate and fair, so users saw it as helpful, not restrictive.",
      "Delegated screening data to third-party background check APIs, keeping sensitive information outside internal storage and reducing compliance exposure.",
    ],
    outcomes: [
      "Transformed the product from a listing marketplace into a qualification engine: a genuine competitive differentiator that neither Zillow nor Apartments.com offered.",
      "Reduced wasted application effort for renters and improved applicant lead quality for landlords on both sides of the match.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    demoUrl: "https://cocoon-tau.vercel.app/",
    liveLabel: "View MVP",
    screenshots: [
      "/assets/rentWise/rentWise1.png",
      "/assets/rentWise/rentWise2.png",
      "/assets/rentWise/rentWise3.png",
      "/assets/rentWise/rentWise4.png",
      "/assets/rentWise/rentWise5.png",
      "/assets/rentWise/rentWise6.png",
      "/assets/rentWise/rentWise7.png",
      "/assets/rentWise/rentWise8.png",
    ],
    relatedExperienceSlug: "ardexa",
    featured: true,
  },
  {
    slug: "lexadraft-contract-builder",
    title: "LexaDraft: Contract Template & Workflow System",
    category: "Product",
    overview:
      "The same contract, rewritten from scratch every time.\n\nIn one construction business, hours were spent rewriting documents that were structurally identical: only names, dates, and amounts changed.",
    businessProblem:
      "A founder's construction company was manually rewriting contracts for every new job. The structure was nearly identical (company info, clauses, dates, signatures), but each contract still required manual editing, review, and rework. Operational friction like this is expensive because it accumulates quietly. Hundreds of manual contract cycles per year was the real cost, not any single contract.",
    role: "Product Builder + Frontend Lead · LexaDraft (Ardexa)",
    contributions: [
      "Built the template builder where contracts are written once with named variable fields (company, owner, dates, payment terms, signatures), making templates reusable assets rather than one-time files.",
      "Developed the document builder flow: select template → fill variable values → generate final contract, eliminating manual reformatting entirely.",
      "Implemented PDF export, Word export, and email delivery so the workflow completed through delivery, not just drafting.",
      "Architected the approval and signing workflow for future expansion toward full contract lifecycle management.",
      "Worked directly with founders to map real operational use cases and validate the product flow against actual business needs.",
    ],
    challenges: [
      "Templates too rigid push users back to manual editing. Templates too flexible lose the speed advantage. Finding that calibration required understanding the actual contract workflow, not just building an editor.",
      "The visible product was a form interface. The real value was the workflow behind it, and that required operational thinking more than frontend skill.",
    ],
    solutions: [
      "Made variables first-class template elements so the reuse story was clear from day one: users saw templates as assets, not just saved drafts.",
      "Kept the document builder deliberately minimal (select, fill, generate) so the time savings were immediately obvious and the adoption case was self-evident.",
    ],
    outcomes: [
      "Eliminated repetitive manual contract editing: preparation time dropped significantly, and formatting inconsistency was removed by design.",
      "Transformed contract creation from isolated document work into a repeatable operational workflow: build once, reuse many times.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    screenshots: [
      "/assets/lexadraft/lexa1.png",
      "/assets/lexadraft/lexa2.png",
      "/assets/lexadraft/lexa3.png",
      "/assets/lexadraft/lexa4.jpeg",
      "/assets/lexadraft/lexa5.jpeg",
      "/assets/lexadraft/lexa6.jpeg",
      "/assets/lexadraft/lexa 7.jpeg",
    ],
    relatedExperienceSlug: "ardexa",
    featured: true,
  },
  {
    slug: "octo-dashboard-cost-report-builder",
    title: "Dashboard & Cost Report Builder",
    category: "Product",
    overview:
      "A cloud cost dashboard and report-building workflow for Octo, built around configurable widgets, charts, filters, currency support, and editable report states.",
    businessProblem:
      "Cloud cost users needed clearer ways to inspect spend, build reusable reports, and export views without asking engineering or operations teams for manual data pulls.",
    role: "Frontend Developer - Octo",
    contributions: [
      "Built drag-and-drop dashboard layouts with GridStack.",
      "Implemented ECharts-powered widgets for cost visibility.",
      "Developed report creation, filtering, currency conversion, export, edit, duplicate, and delete flows.",
    ],
    challenges: [
      "Keeping dense cost data understandable across dashboard, report, and export contexts.",
      "Handling user fiscal settings and multiple reporting states without fragmenting the UI.",
    ],
    solutions: [
      "Created reusable UI patterns for chart widgets, report filters, and editable report states.",
      "Aligned report views with user fiscal settings and cost formatting rules.",
    ],
    outcomes: [
      "Let cloud cost teams build and export their own reports without needing engineering support.",
      "Reduced friction around cost report creation and dashboard customization.",
    ],
    stack: [
      "Vue",
      "Vuetify",
      "ECharts",
      "GridStack",
      "TypeScript",
      "i18n",
      "Pinia",
      "REST API",
    ],
    screenshots: [
      "/assets/octo/db1.png",
      "/assets/octo/db2.png",
      "/assets/octo/db3.png",
      "/assets/octo/db4.png",
    ],
    relatedExperienceSlug: "alphaus",
    featured: false,
  },
  {
    slug: "octo-recommendations-history",
    title: "Recommendations UI & History",
    category: "Product",
    overview:
      "A recommendation experience for cloud optimization workflows, including lists, details, history timelines, charts, savings summaries, and execution state visibility.",
    businessProblem:
      "Users needed to understand optimization opportunities, inspect recommendation history, and track cost-saving actions with enough context to trust the recommendations.",
    role: "Frontend Developer - Octo",
    contributions: [
      "Built filterable recommendation lists and detailed recommendation views.",
      "Implemented history timelines with charts and savings summaries.",
      "Integrated backend endpoints for calculations, filters, statuses, and executed states.",
    ],
    challenges: [
      "Presenting technical optimization data in a way product and finance users could scan.",
      "Keeping recommendation state, history, and savings context connected.",
    ],
    solutions: [
      "Structured views around recommendation state, vendor context, and cost impact.",
      "Used charts and summaries to make savings history easier to evaluate.",
    ],
    outcomes: [
      "Gave cloud cost users clear visibility into which optimizations mattered, their impact, and whether they were actually executed.",
      "Improved visibility into implemented recommendations and their impact.",
    ],
    stack: [
      "Vue",
      "Vuetify",
      "ECharts",
      "TypeScript",
      "Pinia",
      "Day.js",
      "i18n",
      "REST API",
    ],
    screenshots: [
      "/assets/octo/rec1.png",
      "/assets/octo/rec2.png",
      "/assets/octo/rec3.png",
      "/assets/octo/rec4.png",
    ],
    relatedExperienceSlug: "alphaus",
    featured: false,
  },
  {
    slug: "octo-alert-channel-management",
    title: "Alert & Channel Management",
    category: "Product",
    overview:
      "Alert and channel management interfaces for configuring cost and budget notifications across Slack, Microsoft Teams, and email channels.",
    businessProblem:
      "Teams needed timely spend alerts and reliable notification routing so budget issues could be addressed before they became expensive surprises.",
    role: "Frontend Developer - Octo",
    contributions: [
      "Developed alert creation and editing workflows.",
      "Built channel management views for routing notifications.",
      "Supported cost and percentage threshold configurations.",
    ],
    challenges: [
      "Making alert setup feel simple while supporting multiple channel types.",
      "Keeping threshold logic understandable for budget and cost users.",
    ],
    solutions: [
      "Designed form flows around clear threshold and channel choices.",
      "Kept alert configuration close to delivery-channel context.",
    ],
    outcomes: [
      "Removed the friction between setting cost thresholds and actually getting notified, with no engineering handoff needed.",
      "Supported proactive budget and cost monitoring workflows.",
    ],
    stack: [
      "Vue",
      "Vuetify",
      "Pinia",
      "TypeScript",
      "REST API",
      "Day.js",
      "i18n",
    ],
    screenshots: [
      "/assets/octo/alert1.png",
      "/assets/octo/alert2.png",
      "/assets/octo/alert3.png",
      "/assets/octo/alert4.png",
    ],
    relatedExperienceSlug: "alphaus",
  },
  {
    slug: "renthive-mvp-ui",
    title: "RentHive MVP UI",
    category: "Startup",
    overview:
      "A peer-to-peer rental platform MVP built during Startup Weekend Bohol, covering core product listing, login, checkout, cart, and responsive UI flows.",
    businessProblem:
      "The team needed to quickly validate a rental marketplace concept with enough interface fidelity to demonstrate the user journey and business model.",
    role: "UI Developer / Co-Founder",
    contributions: [
      "Designed and built responsive Tailwind-based screens.",
      "Developed product listing, login, checkout, and cart interface flows.",
      "Helped shape UX decisions for a fast startup MVP timeline.",
    ],
    challenges: [
      "Building a coherent product flow under time pressure.",
      "Balancing MVP speed with a credible interface for judges and users.",
    ],
    solutions: [
      "Focused UI effort on the highest-signal marketplace flows.",
      "Used simple responsive components to keep implementation fast and consistent.",
    ],
    outcomes: [
      "Placed 2nd at Startup Weekend Bohol: built and validated a working product under tight time constraints.",
      "Produced a working MVP story for marketplace validation.",
    ],
    stack: ["HTML", "Tailwind CSS", "JavaScript"],
    screenshots: [
      "/assets/renthive/rh1.png",
      "/assets/renthive/rh2.png",
      "/assets/renthive/rh3.png",
      "/assets/renthive/rh4.png",
    ],
    githubUrl: "https://github.com/lordkelvinabellana/RentHiveFinal",
    relatedExperienceSlug: "renthive",
    featured: false,
  },
  {
    slug: "pacific-west-diagnostic-imaging",
    title: "Pacific West Diagnostic Imaging",
    category: "Client Work",
    overview:
      "A medical website built with Wix and custom CSS, including service pages, payment support, and patient-facing content structure.",
    businessProblem:
      "The client needed a professional healthcare web presence that could explain services clearly and support patient actions online.",
    role: "Freelance Web Developer",
    contributions: [
      "Built service-oriented pages in Wix.",
      "Applied custom CSS styling for a cleaner branded interface.",
      "Integrated Stripe payment support.",
    ],
    challenges: [
      "Keeping healthcare information clear and trustworthy.",
      "Working within Wix constraints while improving interface polish.",
    ],
    solutions: [
      "Structured pages around patient needs and service clarity.",
      "Used custom styling to improve consistency and presentation.",
    ],
    outcomes: [
      "Delivered a more complete patient-facing website.",
      "Supported online service and payment workflows.",
    ],
    stack: ["Wix", "Custom CSS", "Stripe"],
    screenshots: [
      "/assets/pacwest/pw1.png",
      "/assets/pacwest/pw2.png",
      "/assets/pacwest/pw3.png",
      "/assets/pacwest/pw4.png",
    ],
    relatedExperienceSlug: "freelance",
  },
  {
    slug: "czechvibes-travel-site",
    title: "CzechVibes Travel Site",
    category: "Client Work",
    overview:
      "A responsive, multi-language frontend for a European travel and content brand.",
    businessProblem:
      "The project needed a clean frontend that could support travel content across languages and devices.",
    role: "Freelance Frontend Developer",
    contributions: [
      "Built responsive HTML and Tailwind layouts.",
      "Supported multi-language content presentation.",
      "Improved mobile and desktop readability.",
    ],
    challenges: [
      "Handling content presentation across languages.",
      "Keeping the site simple enough for travel browsing.",
    ],
    solutions: [
      "Used straightforward content sections and responsive spacing.",
      "Prioritized readability and accessible structure.",
    ],
    outcomes: [
      "Delivered a cleaner travel content frontend.",
      "Improved cross-device browsing quality.",
    ],
    stack: ["HTML", "Tailwind CSS"],
    screenshots: [
      "/assets/czech/cv1.png",
      "/assets/czech/cv2.png",
      "/assets/czech/cv3.png",
      "/assets/czech/cv4.png",
    ],
    relatedExperienceSlug: "freelance",
  },
  {
    slug: "slack-clickup-bug-automation",
    title: "Slack to ClickUp Bug Report Automation",
    category: "Automation",
    overview:
      "Automation workflows that turn Slack bug report messages into structured ClickUp tasks with attachments, tags, routing, and confirmations.",
    businessProblem:
      "Bug reports in Slack were easy to miss or hard to triage consistently without a structured handoff into the team task system.",
    role: "Automation Specialist - Internal Tools",
    contributions: [
      "Built Make and n8n workflows for Slack-to-ClickUp conversion.",
      "Parsed Slack messages into structured task fields.",
      "Handled attachments, tags, list assignment, and task links.",
    ],
    challenges: [
      "Preserving enough context from informal Slack messages.",
      "Preventing lost reports when routing or parsing conditions vary.",
    ],
    solutions: [
      "Used conditional logic and structured payload mapping.",
      "Created confirmation paths so reporters can see task creation results.",
    ],
    outcomes: [
      "Adopted across the company. It removed the need to switch tools just to report bugs and became the default reporting workflow.",
      "Improved QA handoff consistency from Slack to ClickUp.",
    ],
    stack: [
      "Make",
      "n8n",
      "Slack API",
      "ClickUp API",
      "JavaScript",
      "Webhooks",
    ],
    screenshots: [
      "/assets/slackAutomation/slack1.PNG",
    ],
    relatedExperienceSlug: "automation",
  },
  {
    slug: "zoom-youtube-upload-pipeline",
    title: "Zoom to YouTube Upload Pipeline",
    category: "Automation",
    overview:
      "An n8n media operations pipeline for fetching Zoom recordings, logging metadata, storing raw files, and uploading to YouTube within platform limits.",
    businessProblem:
      "Manual handling of recurring Zoom recordings created operational drag and made upload tracking harder to manage consistently.",
    role: "Automation Specialist - Media Ops",
    contributions: [
      "Fetched Zoom cloud recordings month by month.",
      "Logged recording metadata to Google Sheets.",
      "Stored raw files in Wasabi and uploaded videos to YouTube.",
    ],
    challenges: [
      "Respecting YouTube upload limits.",
      "Coordinating storage, logging, and upload status across services.",
    ],
    solutions: [
      "Built a scheduled n8n workflow with metadata tracking.",
      "Structured the flow around upload caps and storage checkpoints.",
    ],
    outcomes: [
      "Reduced repetitive media operations work.",
      "Created a more traceable recording-to-upload workflow.",
    ],
    stack: [
      "n8n",
      "Zoom API",
      "YouTube Data API v3",
      "Google Sheets API",
      "Wasabi",
      "Cron",
    ],
    screenshots: [
      "/assets/zoomAutomation/zoom1.PNG",
      "/assets/zoomAutomation/zoom2.PNG",
    ],
    relatedExperienceSlug: "automation",
  },
  {
    slug: "getemleads-website",
    title: "GetemLeads",
    category: "Client Work",
    overview:
      "A lead-generation website focused on clear messaging, fast loading, and conversion.",
    businessProblem:
      "The client needed a website that could communicate their offer clearly and route inbound leads without friction.",
    role: "WordPress Developer",
    contributions: [
      "Built the full site layout and page structure in WordPress.",
      "Implemented responsive behavior across mobile and desktop.",
      "Integrated and configured lead capture forms with routing logic.",
    ],
    challenges: [
      "Structuring conversion-focused content to guide visitors toward action.",
      "Ensuring form integrations reliably captured and routed leads.",
    ],
    solutions: [
      "Kept layout hierarchy focused on the primary call-to-action.",
      "Tested form submissions and routing across device types.",
    ],
    outcomes: [
      "Delivered a conversion-focused website with functional lead capture and routing.",
      "Fast-loading, responsive build ready for client use.",
    ],
    stack: ["WordPress"],
    demoUrl: "https://lightcyan-pelican-889360.hostingersite.com/",
    liveLabel: "View Live Site",
    screenshots: [
      "/assets/getemLeads/GL1.jpeg",
      "/assets/getemLeads/GL2.jpeg",
      "/assets/getemLeads/GL3.jpeg",
      "/assets/getemLeads/GL4.jpeg",
      "/assets/getemLeads/GL5.jpeg",
      "/assets/getemLeads/GL6.png",
      "/assets/getemLeads/GL7.png",
      "/assets/getemLeads/GL8.png",
      "/assets/getemLeads/GL9.png",
    ],
    relatedExperienceSlug: "flexiwork",
  },
  {
    slug: "moberly-consulting-website",
    title: "Moberly Consulting",
    category: "Client Work",
    overview:
      "A professional consulting website designed for clarity, trust, and easy navigation.",
    businessProblem:
      "The client needed a clean web presence that would support client engagement and make it easy for prospects to understand services and reach out.",
    role: "WordPress Developer",
    contributions: [
      "Built the consulting website layout and page structure in WordPress.",
      "Applied responsive design for consistent experience across devices.",
      "Structured content hierarchy to support trust signals and inquiry pathways.",
    ],
    challenges: [
      "Making a consulting site feel credible and approachable without visual clutter.",
      "Structuring information for prospects at different stages of evaluation.",
    ],
    solutions: [
      "Used clean layout patterns and consistent spacing to communicate professionalism.",
      "Placed inquiry pathways at natural decision points throughout the content.",
    ],
    outcomes: [
      "Delivered a professional consulting website with clear navigation and inquiry flow.",
      "Responsive build that presents services with clarity and credibility.",
    ],
    stack: ["WordPress"],
    demoUrl: "https://moberlyconsulting.com/",
    liveLabel: "View Live Site",
    screenshots: [
      "/assets/moberlyConsulting/Moberly1.png",
      "/assets/moberlyConsulting/Moberly2.png",
      "/assets/moberlyConsulting/Moberly3.png",
      "/assets/moberlyConsulting/Moberly4.png",
    ],
    relatedExperienceSlug: "flexiwork",
  },
  {
    slug: "pickle-n-par-website",
    title: "Pickle N Par",
    category: "Client Work",
    overview:
      "A customer-facing website with a focus on usability, responsiveness, and clear service presentation.",
    businessProblem:
      "The client needed a site that made their services easy to find, understand, and act on across all devices.",
    role: "Wordpress Developer",
    contributions: [
      "Built the site layout and service content structure in Wix.",
      "Optimized mobile layout and responsive behavior.",
      "Organized content to reduce friction between visitor intent and available services.",
    ],
    challenges: [
      "Making service information scannable without overwhelming visitors.",
      "Maintaining consistent layout quality within Wix's platform constraints.",
    ],
    solutions: [
      "Prioritized content sections around the most common visitor needs.",
      "Used consistent spacing and grouping to make information easy to navigate.",
    ],
    outcomes: [
      "Delivered a customer-facing website that makes services easy to find and act on.",
      "Mobile-optimized and responsive across device types.",
    ],
    stack: ["WordPress"],
    demoUrl: "https://nnaphljt.elementor.cloud/",
    liveLabel: "View Live Site",
    screenshots: [
      "/assets/pickleNPar/pnp1.jpeg",
      "/assets/pickleNPar/pnp2.jpeg",
      "/assets/pickleNPar/pnp3.jpeg",
      "/assets/pickleNPar/pnp4.jpeg",
      "/assets/pickleNPar/pnp5.jpeg",
      "/assets/pickleNPar/pnp6.jpeg",
    ],
    relatedExperienceSlug: "flexiwork",
  },
  {
    slug: "strat-e-marketing-website",
    title: "StratE Marketing",
    category: "Client Work",
    overview:
      "A marketing website focused on presenting services clearly and supporting lead conversion.",
    businessProblem:
      "The client needed a website that communicated their marketing services with clarity and supported campaign visibility through form and tracking integrations.",
    role: "WordPress Developer",
    contributions: [
      "Built the site layout and service page structure in WordPress.",
      "Implemented responsive behavior across mobile and desktop.",
      "Integrated lead capture forms and tracking tools for campaign visibility.",
    ],
    challenges: [
      "Presenting multiple services without diluting the primary conversion message.",
      "Ensuring tracking integrations worked reliably across page types.",
    ],
    solutions: [
      "Structured pages around clear service categories with consistent calls-to-action.",
      "Validated form and tracking integrations across device types before delivery.",
    ],
    outcomes: [
      "Delivered a marketing website with functional forms, tracking, and clear service presentation.",
      "Responsive build ready to support inbound lead campaigns.",
    ],
    stack: ["WordPress"],
    demoUrl: "https://www.strategicemarketing.com/",
    liveLabel: "View Live Site",
    screenshots: ["/assets/stratEMarketing/sem1.jpeg"],
    relatedExperienceSlug: "flexiwork",
  },
  {
    slug: "arnis-scoreboard",
    title: "Arnis Scoreboard",
    category: "Personal",
    overview:
      "A real-time scoring and timer system for an Arnis tournament, designed for live match use.",
    businessProblem:
      "Tournament scoring needed to be simple, fast, and readable in a live competition setting.",
    role: "Personal Project",
    contributions: [
      "Built score controls and timer interactions.",
      "Designed a focused layout for live use.",
      "Implemented responsive behavior for different screen contexts.",
    ],
    challenges: [
      "Making controls obvious under event pressure.",
      "Keeping score and time readable from a distance.",
    ],
    solutions: [
      "Prioritized large visual states and direct controls.",
      "Kept the interface narrow and task-specific.",
    ],
    outcomes: [
      "Supported real-time scoring during an Arnis tournament.",
      "Created a practical event tool rather than a demo-only project.",
    ],
    stack: ["Vue", "Vuetify"],
    screenshots: [
      "/assets/arnis/arnis1.png",
      "/assets/arnis/arnis2.png",
      "/assets/arnis/arnis3.png",
    ],
    relatedExperienceSlug: "college",
  },
  {
    slug: "olj-job-matching-automation",
    title: "AI Job Matching Workflow",
    category: "Automation",
    overview:
      "Job boards don't have a discovery problem. They have a filtering problem. Every manual search session is mostly noise. This pipeline replaces that process with a decision engine: scraping, keyword filtering, AI scoring, and delivering only high-match opportunities as structured notifications.",
    businessProblem:
      "Manual job searching is a volume problem disguised as a visibility problem. Refreshing boards, scanning duplicates, and trying to evaluate fit manually creates decision fatigue without improving decision quality. The real problem was filtering: separating strong opportunities from noise before spending attention on them. Without a system, quantity overwhelms quality and the best roles get buried.",
    role: "Full System Owner: Architecture, Automation, AI Integration",
    contributions: [
      "Designed a 6-stage pipeline: scraping → deduplication → keyword filtering → AI scoring → threshold filtering → HTML email delivery.",
      "Built a cron-driven scraper polling every 5 minutes with Google Sheets-backed deduplication to prevent repeated alerts.",
      "Created a two-pass keyword filter (strong-match and avoid-keywords) to remove obvious mismatches before reaching the AI layer. Logic first, AI second.",
      "Integrated OpenAI scoring that evaluates each listing against skills, salary, workload preferences, and stack fit, returning a match score, pros, cons, and a shouldApply recommendation.",
      "Set a strict threshold: only listings where score ≥ 75 and shouldApply = true continue to notification, protecting alert signal quality.",
      "Generated structured HTML emails with full AI analysis, application reasoning, and a direct job link, turning a notification into an immediate action.",
    ],
    challenges: [
      "Routing everything through AI would make the pipeline slow, expensive, and unreliable. Filtering logic had to come before AI, not after.",
      "Notification trust is fragile: one week of noise trains a user to ignore alerts entirely, breaking the system's core value.",
    ],
    solutions: [
      "Built keyword filtering as a pre-AI gate: strong candidates are pre-qualified by logic before LLM evaluation, which cuts token cost and improves response quality.",
      "Enforced a strict match threshold so the system says no far more often than yes. Signal quality beats volume.",
    ],
    outcomes: [
      "Replaced manual job board browsing entirely: only genuinely strong opportunities trigger action.",
      "Reduced job search time and decision fatigue while improving application quality by concentrating effort on pre-qualified matches.",
    ],
    stack: [
      "n8n (self-hosted)",
      "OpenAI API",
      "Google Sheets",
      "Oracle Cloud VM",
      "JavaScript",
      "Cron",
    ],
    screenshots: [
      "/assets/oljAutomation/olj1.png",
      "/assets/oljAutomation/olj2.png",
      "/assets/oljAutomation/olj3.png",
      "/assets/oljAutomation/olj4.png",
      "/assets/oljAutomation/olj5.png",
    ],
    relatedExperienceSlug: "automation",
    featured: true,
  },
  {
    slug: "autofit-ai-coaching",
    title: "AutoFit AI Coaching System",
    category: "Automation",
    overview:
      "The problem wasn't sending messages.\nIt was the time spent preparing them.",
    businessProblem:
      "A fitness coaching business had a preparation problem, not a messaging problem. Every week, the coach manually reviewed each client's progress, compared it with prior weeks, and wrote personalized updates from scratch. As the client roster grew, this became the primary bottleneck. The coach's real value is judgment and relationships, not repetitive analysis that a system could handle. The goal was to remove the prep work without removing the human quality.",
    role: "Workflow Architect + Automation Builder",
    contributions: [
      "Designed an immutable weekly snapshot system: each client's progress is preserved as a discrete record rather than overwritten, creating a reliable coaching history.",
      "Built the AI analysis layer that compares previous and current progress data, then generates a draft coaching message with observations, recommendations, and motivational framing.",
      "Implemented the coach approval gate: every generated message requires review before delivery, making human judgment the final authority.",
      "Created a regeneration loop: if the coach requests edits, the system refines the draft using their feedback rather than starting from scratch.",
      "Engineered prompts for tone consistency: messages needed to sound like the coach, not like an AI summary.",
    ],
    challenges: [
      "Trust-sensitive content fails at both extremes: messages that feel robotic destroy the coach-client relationship even if technically accurate.",
      "Overwriting client progress state between weeks would break the AI's ability to reason about behavioral trends over time.",
    ],
    solutions: [
      "Designed the approval gate as the core of the system architecture, not an optional add-on. Automation becomes leverage only when the human remains in control.",
      "Used immutable weekly snapshots so the AI always reasons from preserved observation history, not a destructively updated state.",
    ],
    outcomes: [
      "Coach no longer starts every weekly message from zero. AI handles progress analysis and drafting, coach focuses on judgment, tone, and the final call.",
      "Improved message consistency across the client roster and reduced weekly preparation time without reducing personalization quality.",
    ],
    stack: [
      "n8n",
      "OpenAI API",
      "Anthropic API",
      "JavaScript",
      "GreenAPI",
      "Custom API",
    ],
    screenshots: [
      "/assets/autoFit/autoFit1.png",
      "/assets/autoFit/autoFit2.png",
      "/assets/autoFit/autoFit3.png",
      "/assets/autoFit/autoFit4.png",
      "/assets/autoFit/autoFit5.png",
      "/assets/autoFit/autoFit6.png",
      "/assets/autoFit/autoFit7.png",
    ],
    relatedExperienceSlug: "automation",
    featured: true,
  },
  {
    slug: "ripple-product-ownership-archera",
    title: "Ripple: Product Ownership & Strategic Alignment",
    category: "Product",
    overview:
      "Owned product delivery across multiple SaaS tools and helped validate a strategic partnership that improved cloud cost decisions, not just reporting.",
    businessProblem:
      "Ripple delivered cloud invoicing and financial visibility, but visibility alone doesn't prevent overspending. Customers still struggled with Reserved Instance and Savings Plan decisions that directly affected profitability. The question was whether a partnership with Archera could create a stronger combined product story (visibility + optimization) rather than building another internal feature from scratch.",
    role: "Product Owner · Ripple, Flow, Wave & Wave Pro · Alphaus",
    contributions: [
      "Led sprint planning, backlog refinement, and feature specs across five connected cloud billing products.",
      "Stepped into Figma UI/UX design ownership when design bandwidth was unavailable, unblocking engineering delivery.",
      "Supported the Ripple V2 migration from monolith to microfrontend architecture.",
      "Tasked by the CEO to evaluate the Alphaus–Archera strategic partnership: studied Archera's commitment optimization product, mapped integration opportunities, and supported internal stakeholder alignment.",
      "Assessed architectural compatibility between Archera's reservation lifecycle tooling and Ripple's invoicing and cost visibility workflows.",
    ],
    challenges: [
      "Separating interesting technology from actual strategic fit. Many integrations look good on paper but few improve customer outcomes meaningfully.",
      "Evaluating a partner system without direct implementation ownership required stronger product judgment than coding.",
      "Balancing product ownership across five connected products while simultaneously leading strategic evaluation work.",
    ],
    solutions: [
      "Approached the partnership as a product fit problem: 'Can these systems create stronger outcomes together?' rather than 'Can we connect them?'",
      "Mapped customer workflows where commitment optimization would complement existing visibility, identifying leverage points rather than feature overlap.",
      "Worked with leadership and product teams to align on what the partnership solved, where ownership boundaries existed, and what long-term product value looked like.",
    ],
    outcomes: [
      "Partnership established as an active strategic initiative, strengthening product positioning from cost visibility alone to visibility plus optimization.",
      "Unblocked engineering delivery by owning UI/UX design when design bandwidth was unavailable.",
      "Improved sprint consistency and release coordination across five connected cloud billing products.",
    ],
    stack: ["Figma", "FinOps", "Cloud Cost Management", "Product Strategy"],
    screenshots: [],
    demoUrl: "https://www.alphaus.cloud/en/ripple",
    relatedExperienceSlug: "alphaus",
    featured: false,
  },
];

export const experiencePhases: ExperiencePhase[] = [
  {
    slug: "penguin-ops",
    title: "Penguin Ops: Ops & Automation Assistant",
    period: "Aug 2026 – Present",
    summary:
      "Hired as Ops & Automation Assistant in August 2026. In practice I am the agency's automation specialist, covering the technical and the operational side: I design, build and keep improving the workflows and systems Penguin Ops and its clients run on, from client portals and scorecards to n8n onboarding and reporting automation.",
    responsibilities: [
      "Own the technical side: architecture, builds, hosting and the automations themselves, on n8n, Next.js, Supabase and Google Cloud.",
      "Own the operational side: audit how each client's team works, remove manual steps, and keep the workflows running and improving after launch.",
      "Build web apps (Next.js, Supabase, Google Cloud) and n8n automations across ClickUp, Slack, Asana and Google Sheets.",
      "Run parallel checks against the old process, write handover guides and support the team afterwards.",
    ],
    achievements: [
      "Client portal for a talent agency, live on its own domain since October 2026.",
      "Ad agency scorecard rebuilt from source data with 93% parity to the old sheet and every difference explained.",
      "38-node client onboarding workflow for a Google Ads agency, triggered by one form.",
    ],
    learnings: [
      "A system is finished when the team trusts its numbers more than the spreadsheet it replaced.",
      "Keep the familiar view (a sheet mirror, a Slack digest) while the new system takes over.",
    ],
    technologies: ["Next.js", "Supabase", "Google Cloud Run", "n8n", "ClickUp", "Slack", "Asana", "Google Sheets"],
    relatedProjectSlugs: [
      "talent-agency-client-portal",
      "ad-agency-scorecard",
      "google-ads-agency-operations",
    ],
  },
  {
    slug: "stakra",
    title: "Stakra: Systems Implementation Associate",
    period: "Jun 2026 – Present",
    summary:
      "Automation and full-stack work for an operations consultancy serving small and growing businesses: client apps, governed automation systems, monitoring, and the technical side of Stakra's own service packages.",
    responsibilities: [
      "Build client systems end to end, from spec and business rules to tests, deployment and handover.",
      "Design automations with a human approval step wherever money, customers or sensitive data are involved.",
      "Give technical review on Stakra's service packages, including its data-safety standards for clients.",
    ],
    achievements: [
      "Governed media-buying system whose pipeline suite passes 9,998 tests in simulation, fail-closed by default.",
      "Watchtower monitoring dashboard: all 17 planned v1 chunks shipped, 19 connections monitored.",
      "Salon operations app (point of sale, commissions, payroll, inventory) delivered as a complete first version for owner review.",
      "Car pre-vetting tool (capstone build for a used-car dealer) with a deterministic pricing engine: 72 unit tests and 12 of 12 live end-to-end checks passing.",
    ],
    learnings: [
      "Write the business rules down with worked examples before building; the edge cases live there.",
      "Silent failures are the expensive ones, so every automation needs something watching it.",
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "Prisma", "n8n", "Airtable", "Shopify", "GitHub Actions", "Playwright"],
    relatedProjectSlugs: [
      "governed-ai-media-buying",
      "salon-operations-app",
    ],
  },
  {
    slug: "clipt",
    title: "Clipt (client): Video Editor & Motion Graphic Designer",
    period: "Oct 2026 – Present",
    summary:
      "Client engagement as Clipt's video editor and motion graphic designer, and in practice its fractional video production lead: I designed and streamlined how its videos get made, from raw founder footage to delivery, set up the brand system behind them, and edit the sales video, ads and testimonials myself.",
    responsibilities: [
      "Map and streamline the video workflow end to end: footage intake, cleanup, cut, graphics, colour, sound and delivery.",
      "Set up the brand system: brand rules, reusable motion graphics and a checklist for every format.",
      "Edit and deliver the 35-minute VSL, vertical ads and nurse testimonials.",
    ],
    achievements: [
      "Delivered the complete VSL in 4K, four vertical ads and two testimonials.",
      "Turned approved edits into a repeatable system, so new pieces follow the same standard without re-briefing.",
    ],
    learnings: [
      "Consistency comes from writing the brand rules down once and applying them everywhere.",
      "Restraint keeps a long video watchable: sparse zooms, calm motion, every graphic with a reason.",
    ],
    technologies: ["VSL editing", "Motion graphics", "Colour grading", "Sound design", "CapCut"],
    relatedProjectSlugs: ["clipt-vsl", "clipt-short-form-ads-testimonials"],
  },
  {
    slug: "retail-group",
    title: "Three-Brand Retail Group (client): Automation & Web Developer",
    period: "Oct 2026 – Present",
    summary:
      "Client engagement for a haircare retail group with online retail, a salon brand and a wholesale business: I audited its automation stack, rebuilt the CEO dashboard and connected it to an approval-first agent system on top of its existing n8n workflows.",
    responsibilities: [
      "Audit and maintain the group's n8n workflows and the data they feed.",
      "Build and update the web app: the CEO dashboard, store pages, approvals and results views.",
      "Write the technical guides the client's team uses to run and extend the system.",
    ],
    achievements: [
      "Audited 47 n8n workflows and delivered a go-live proposal.",
      "4 of 16 agents running in testing, with every recommendation routed through an approval queue.",
    ],
    learnings: [
      "Keep what already works (the n8n ingestion) and give it one clean front door.",
      "An agent that spends money or changes stock should only ever propose, never act.",
    ],
    technologies: ["n8n", "React", "Vite", "Cloudflare Workers", "Cloudflare D1", "Monday.com", "Shopify", "Omnisend"],
    relatedProjectSlugs: ["retail-business-os"],
  },
  {
    slug: "flexiwork",
    title: "Flexiwork: Agency Web Development",
    period: "Mar 2026 – Oct 2026",
    summary:
      "Agency web work across WordPress, Wix, Elementor, and custom HTML/Tailwind builds, delivering client websites with fast turnaround and direct client communication.",
    responsibilities: [
      "Built websites from design to production using WordPress, Wix, Elementor, and HTML/Tailwind.",
      "Translated Figma designs and client requirements into conversion-focused layouts.",
      "Handled Stripe integrations, responsive design, and direct client revisions.",
    ],
    achievements: [
      "Delivered a full website build in under an hour against a same-day deadline.",
      "Recognized by clients for consistent early delivery across 20+ projects.",
    ],
    learnings: [
      "Fast execution and clear communication matter as much as technical skill in agency work.",
      "Different industries require different content hierarchy and trust signals.",
    ],
    technologies: [
      "WordPress",
      "Wix",
      "Elementor",
      "HTML",
      "Tailwind CSS",
      "Stripe",
      "Figma",
    ],
    relatedProjectSlugs: [
      "pacific-west-diagnostic-imaging",
      "czechvibes-travel-site",
    ],
  },
  {
    slug: "ardexa",
    title: "Ardexa.ai: Startup MVP Development",
    period: "Oct 2025 – Apr 2026",
    summary:
      "Led frontend and full-stack development on three startup MVPs alongside two founders (RentWise, LexaDraft, and TicketDesk), working directly on architecture, product decisions, and implementation.",
    responsibilities: [
      "Built MVP products using Next.js, TypeScript, Tailwind CSS, Shadcn UI, and Supabase.",
      "Served as primary frontend and full-stack developer in a 4-person team (2 founders + 1 backend dev).",
      "Proposed architecture, validated product direction with founders, and made implementation decisions independently.",
    ],
    achievements: [
      "Shipped three production-ready MVP systems across different business domains.",
      "Built hard-requirement filtering and scoring logic for RentWise, transforming a listing platform into a qualification engine.",
      "Designed variable-based contract template system for LexaDraft, eliminating repetitive manual contract editing.",
    ],
    learnings: [
      "How to move from problem to decision to build without heavy process support.",
      "Product viability and founder reliability both matter equally in startup environments.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "DaisyUI",
      "Supabase",
      "Vercel",
    ],
    relatedProjectSlugs: [
      "rentwise-qualification-platform",
      "lexadraft-contract-builder",
    ],
  },
  {
    slug: "alphaus",
    title: "Alphaus: Junior FE → Lead FE → Product Owner",
    period: "Jul 2023 – Dec 2025",
    summary:
      "Progressed from Junior Frontend Developer to Lead to Product Owner in under two years, owning frontend quality, release coordination, UI/UX design, and product delivery across Octo, Ripple, Flow, Wave, and Wave Pro.",
    responsibilities: [
      "Built SaaS interfaces using Vue, Vuetify, TypeScript, ECharts, and GridStack across cloud cost management modules.",
      "Led PR reviews, release coordination, Cypress testing, and frontend architecture as Lead Frontend Developer.",
      "As Product Owner, ran sprint planning, backlog refinement, feature specs, and Figma UI/UX design for five connected products.",
      "Built Slack-to-ClickUp bug automation (Make → n8n) adopted company-wide and recognized by the CEO.",
      "Supported Ripple V2 migration (monolith → microfrontend) and led Alphaus–Archera product partnership alignment.",
    ],
    achievements: [
      "Bug reporting automation adopted company-wide: eliminated manual triage, recognized by leadership.",
      "Stepped into UI/UX design ownership to unblock engineering when design bandwidth was unavailable.",
      "Introduced PR templates that improved review speed and weekly release consistency.",
      "FinOps Certified Practitioner, grounding product and UI decisions in cloud financial management concepts.",
    ],
    learnings: [
      "Leadership often means stepping into the missing role before someone asks.",
      "Product context makes frontend decisions faster and more defensible.",
    ],
    technologies: [
      "Vue",
      "Vuetify",
      "TypeScript",
      "Pinia",
      "ECharts",
      "GridStack",
      "i18n",
      "Mixpanel",
      "Make",
      "n8n",
      "Cypress",
      "Figma",
    ],
    relatedProjectSlugs: [
      "octo",
      "octo-dashboard-cost-report-builder",
      "octo-recommendations-history",
      "octo-alert-channel-management",
      "slack-clickup-bug-automation",
    ],
  },
  {
    slug: "automation",
    title: "Automation & AI Systems",
    period: "2023 – Present",
    summary:
      "Built automation systems that remove real operational friction: AI job-matching pipelines, coaching delivery with approval flows, Slack-to-ClickUp reporting, and WhatsApp bots.",
    responsibilities: [
      "Designed and built multi-stage automation pipelines using n8n, Make, and Zapier.",
      "Integrated OpenAI, Slack, ClickUp, Google Sheets, Zoom, YouTube, and WhatsApp APIs.",
      "Built approval systems, AI scoring layers, deduplication logic, and smart notification workflows.",
    ],
    achievements: [
      "OLJ job-matching pipeline: replaced manual job searching with AI scoring and threshold-gated notifications.",
      "AutoFit coaching system: built approval-first AI workflow that reduced coach prep workload without removing human judgment.",
      "Slack-to-ClickUp system: adopted company-wide at Alphaus, recognized by leadership.",
    ],
    learnings: [
      "The strongest automation fits existing team habits rather than forcing new ones.",
      "Technical limitations are often business limitations. Knowing when to escalate matters.",
    ],
    technologies: [
      "n8n",
      "Make",
      "Zapier",
      "OpenAI API",
      "Slack API",
      "ClickUp API",
      "Google Sheets API",
      "Webhooks",
    ],
    relatedProjectSlugs: [
      "olj-job-matching-automation",
      "autofit-ai-coaching",
      "slack-clickup-bug-automation",
      "zoom-youtube-upload-pipeline",
    ],
  },
  {
    slug: "freelance",
    title: "Freelance & Client Websites",
    period: "2023 – Present",
    summary:
      "Client web work across healthcare, travel, and service industries: WordPress, Wix, HTML/Tailwind builds with Stripe integrations and conversion-focused layouts.",
    responsibilities: [
      "Built client websites using WordPress, Wix, HTML, CSS, and Tailwind.",
      "Handled client communication, content structure, and implementation details.",
      "Integrated Stripe payments and responsive design across different platform constraints.",
    ],
    achievements: [
      "Delivered a clean patient-facing healthcare website with Stripe payment support.",
      "Built multilingual responsive frontend for a European travel brand.",
    ],
    learnings: [
      "How to communicate technical decisions clearly to non-technical clients.",
      "Industry context shapes content hierarchy and trust signal placement.",
    ],
    technologies: ["Wix", "WordPress", "HTML", "CSS", "Tailwind CSS", "Stripe"],
    relatedProjectSlugs: [
      "pacific-west-diagnostic-imaging",
      "czechvibes-travel-site",
    ],
  },
  {
    slug: "renthive",
    title: "RentHive: Startup Weekend Bohol",
    period: "2024",
    summary:
      "Startup Weekend Bohol: peer-to-peer rental platform MVP built under competition pressure. Helped the team win 2nd place.",
    responsibilities: [
      "Co-designed the MVP user flow and core interface screens.",
      "Built responsive Tailwind-based UI for listing, login, checkout, and cart flows.",
      "Helped translate a startup concept into a demo-ready product story.",
    ],
    achievements: [
      "Helped the team win 2nd place at Startup Weekend Bohol.",
      "Built a credible marketplace MVP under a short competition timeline.",
    ],
    learnings: [
      "How to prioritize the smallest product surface that proves the concept.",
      "How pitch, product, and UI need to reinforce one another.",
    ],
    technologies: ["HTML", "Tailwind CSS", "JavaScript"],
    relatedProjectSlugs: ["renthive-mvp-ui"],
  },
  {
    slug: "college",
    title: "Computer Engineering, Bohol Island State University",
    period: "2019 – 2023",
    summary:
      "Computer Engineering degree: embedded systems, thesis prototyping, and the technical foundation that preceded real-world product work.",
    responsibilities: [
      "Built academic and thesis projects across hardware and software contexts.",
      "Worked with embedded systems, microcontrollers, Flutter, Dart, C, and C++.",
      "Developed an IoT emergency messaging thesis using NodeMCU ESP8266 and LoRa.",
    ],
    achievements: [
      "Built a practical emergency communication prototype for low-connectivity areas.",
      "Developed the systems foundation that later shaped product and automation thinking.",
    ],
    learnings: [
      "Systems thinking across hardware, software, and real-world constraints.",
      "Reliability and clarity matter most when tools are used in urgent, high-stakes contexts.",
    ],
    technologies: ["C", "C++", "Dart", "Flutter", "NodeMCU ESP8266", "LoRa"],
    relatedProjectSlugs: ["arnis-scoreboard"],
  },
  {
    slug: "personal",
    title: "Personal Projects",
    period: "Ongoing",
    summary:
      "Things I build for myself, to try an idea properly or learn a technology end to end.",
    responsibilities: [
      "Design, build, test and ship each project on my own.",
    ],
    achievements: [
      "Bouquet Cipher: messages written as hand-drawn bouquets, shareable by link or QR gift tag.",
    ],
    learnings: [
      "Personal projects are where I try the techniques I later bring to client work.",
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "Playwright"],
    relatedProjectSlugs: ["bouquet-cipher", "arnis-scoreboard"],
  },
];

export const credentials: Credential[] = [
  {
    slug: "finops-certified-practitioner",
    title: "FinOps Certified Practitioner",
    issuer: "FinOps Foundation",
    type: "Badge",
    verificationUrl:
      "https://www.credly.com/badges/daf53222-223e-49b5-9aff-af074dc73802/public_url",
    context:
      "Supports my cloud cost management SaaS work by grounding product and UI decisions in FinOps concepts.",
    image: "/assets/badges/finOpsPrac.png",
  },
  {
    slug: "vue-masterclass",
    title: "Vue Masterclass (Covers Vue2 and Vue3)",
    issuer: "Vue School",
    type: "Training",
    context:
      "Relevant to my Alphaus frontend work, where Vue and Vuetify are core parts of the product UI stack.",
    image: "/assets/certs/vueCert.jpg",
  },
  {
    slug: "tailwind-css-masterclass",
    title: "Tailwind CSS Masterclass",
    issuer: "Online technical training",
    type: "Training",
    context:
      "Supports rapid, consistent UI development across portfolio, freelance, and startup projects.",
    image: "/assets/certs/tailwindCert.jpg",
  },
  {
    slug: "responsive-web-html-css",
    title: "Build Responsive Websites with HTML & CSS",
    issuer: "Online technical training",
    type: "Training",
    context:
      "Builds the layout and responsive design foundation used across client websites and MVP work.",
    image: "/assets/certs/htmlcssCert.jpg",
  },
  {
    slug: "startup-weekend-bohol-renthive",
    title: "Startup Weekend Bohol - RentHive Recognition",
    issuer: "Startup Weekend Bohol",
    dateEarned: "2024",
    type: "Recognition",
    context:
      "RentHive placed 2nd, validating my ability to build product UI quickly inside a startup team.",
  },
];

export const featuredProjectSlugs = [
  "octo-dashboard-cost-report-builder",
  "octo-recommendations-history",
  "renthive-mvp-ui",
  "slack-clickup-bug-automation",
];

export function getProjectCaseStudy(slug: string) {
  return projectCaseStudies.find((project) => project.slug === slug);
}

export function getExperiencePhase(slug: string) {
  return experiencePhases.find((phase) => phase.slug === slug);
}

export function getRelatedProjects(slugs: string[]) {
  return slugs
    .map((slug) => getProjectCaseStudy(slug))
    .filter((project): project is ProjectCaseStudy => Boolean(project));
}
