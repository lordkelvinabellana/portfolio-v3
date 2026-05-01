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
    duration: "Mar 2026 – Present",
    color: "violet",
    description:
      "Agency web work across WordPress, Wix, Elementor, and HTML/Tailwind builds. Delivered client websites with fast turnaround across healthcare, travel, and service industries. Recognized for consistently delivering ahead of deadline — including a full site build in under an hour against a same-day brief.",
    cta: null,
  },
  {
    position: "Lead Frontend Developer",
    company: "Ardexa.ai",
    duration: "Oct 2025 – Apr 2026",
    color: "purple",
    description:
      "Built three startup MVPs from scratch as the primary frontend and full-stack developer alongside two founders. Worked across architecture, product decisions, and implementation using Next.js, Supabase, and TypeScript — shipping RentWise, LexaDraft, and TicketDesk.",
    cta: null,
  },
  {
    position: "Product Owner",
    company: "Alphaus — Ripple, Flow, Wave & Wave Pro",
    duration: "Aug – Dec 2025",
    color: "blue",
    description:
      "Promoted to Product Owner across five connected cloud billing products. Led sprint planning, backlog refinement, and feature specs. Stepped into Figma UI/UX design ownership when delivery was blocked. Supported Ripple V2 migration (monolith → microfrontend) and led product alignment for the Alphaus–Archera strategic partnership.",
    cta: "Learn About Ripple",
    link: "https://www.alphaus.cloud/en/ripple",
  },
  {
    position: "Lead Frontend Developer",
    company: "Alphaus — Octo",
    duration: "Oct 2024 – Aug 2025",
    color: "sky",
    description:
      "Led frontend ownership for Octo — cloud cost dashboards, recommendation systems, budget management, and weekly production releases. Built Slack-to-ClickUp bug automation adopted company-wide. Introduced PR templates that improved review consistency. Mentored junior developers and backend engineers on Vue and frontend architecture.",
    cta: "Learn About Octo",
    link: "https://www.alphaus.cloud/en/octo",
  },
  {
    position: "Junior Frontend Developer",
    company: "Alphaus — Octo",
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
      "Built automation systems and client websites independently — AI job-matching pipelines, coaching delivery systems with approval workflows, Slack reporting automations, and WhatsApp bots. Handled 20+ web builds across WordPress, Wix, and HTML/Tailwind for clients in healthcare, travel, and services.",
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
      "Automated conversion of Slack bug report messages into structured ClickUp tasks. Extracts key details, downloads attachments, assigns to the correct list, and applies tags automatically — enabling faster triage and seamless QA handoff.",
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

export type ProjectCaseStudy = {
  slug: string;
  title: string;
  category:
    | "SaaS/Product"
    | "Freelance"
    | "Startup"
    | "Automation"
    | "Personal"
    | "CMS";
  overview: string;
  businessProblem: string;
  role: string;
  contributions: string[];
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  stack: string[];
  screenshots: string[];
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
    slug: "octo",
    title: "Octo — Cloud Cost Management Platform",
    category: "SaaS/Product",
    overview:
      "Octo's product was strong. The delivery system around it wasn't. PR reviews were inconsistent, bug reporting required switching tools, and weekly releases meant every friction point had a real cost. I owned frontend delivery — and the surrounding systems that kept the team moving.",
    businessProblem:
      "Octo's product was strong, but delivery friction was quietly compounding. PR reviews were inconsistent, onboarding had unnecessary steps, and bug reporting required switching between multiple tools. Weekly releases meant these problems had real cost — not from lack of effort, but because the system around the work was creating drag. Fixing the product meant fixing how the team moved.",
    role: "Lead Frontend Developer — Octo by Alphaus",
    contributions: [
      "Built and maintained cloud cost dashboards, recommendation views, budget management, and reporting systems using Vue, Vuetify, and ECharts.",
      "Introduced PR templates with structured sections (problem, scope, screenshots, release notes) — standardized reviews and made weekly deployments more predictable.",
      "Built a Slack-to-ClickUp bug reporting automation in Make, then rebuilt it in n8n for stronger parsing — became the company-wide standard, recognized by leadership and noticed by the CEO.",
      "Simplified the user onboarding flow, removing friction points that slowed early product adoption.",
      "Integrated Mixpanel analytics and i18n localization across core product modules.",
      "Mentored junior developers and backend engineers on frontend architecture, codebase structure, and frontend-to-API workflows.",
    ],
    challenges: [
      "Operational improvements — PR templates, workflow standards, automation — rarely feel urgent next to feature work, even when they protect long-term delivery speed.",
      "Financial data dashboards need to feel trustworthy, not just functional. Users make real spending decisions from these views.",
      "A new internal reporting tool only creates value if people adopt it. Building it inside the tool teams already used was the only way to make that work.",
    ],
    solutions: [
      "Treated system improvements as delivery investments, not optional cleanup — PR templates and Git workflow standards reduced review friction and protected future velocity.",
      "Focused dashboard and report design on data clarity and consistent formatting, not visual complexity.",
      "Built the bug workflow inside Slack itself, reducing adoption friction to near zero — the tool was already open.",
    ],
    outcomes: [
      "Bug reporting automation adopted company-wide — eliminated manual ticket triage and was recognized directly by the CEO.",
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
    title: "RentWise — Rental Qualification Platform",
    category: "SaaS/Product",
    overview:
      "Most rental platforms solve discovery.\nThey don't solve approval confidence.\n\nRenters apply to places they won't qualify for.\nLandlords review applicants who were never a good fit.",
    businessProblem:
      "Most rental platforms solve visibility, not decision quality. Renters apply to properties they won't qualify for. Landlords receive applications that were never a good fit. Both sides waste time and energy on bad matches. The core problem wasn't finding listings — it was knowing which ones were actually worth pursuing. Qualification logic needed to come before the application, not after rejection.",
    role: "Full Stack Developer — RentWise",
    contributions: [
      "Built the detailed renter onboarding flow capturing income, household size, guarantors, pets, vehicles, and rental history — mirroring what landlords actually evaluate.",
      "Implemented hard-requirement filtering that removes clearly mismatched listings before a renter considers applying.",
      "Developed a multi-factor scoring layer that ranks listings by fit strength, not just availability.",
      "Integrated third-party background check APIs for credit, criminal, and screening data.",
      "Designed the match-focused dashboard showing strongest property opportunities with qualification visibility.",
      "Collaborated directly with founders on qualification logic, scoring weights, and product flow validation.",
    ],
    challenges: [
      "Qualification filtering that's too aggressive breaks trust; too lenient removes the product's core value — the right calibration required real business judgment, not just technical rules.",
      "Handling sensitive personal data (SSN, background check inputs) responsibly without building internal screening infrastructure.",
    ],
    solutions: [
      "Modeled qualification rules after real landlord criteria so filtering felt accurate and fair — users saw it as helpful, not restrictive.",
      "Delegated screening data to third-party background check APIs, keeping sensitive information outside internal storage and reducing compliance exposure.",
    ],
    outcomes: [
      "Transformed the product from a listing marketplace into a qualification engine — a genuine competitive differentiator that neither Zillow nor Apartments.com offered.",
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
    title: "LexaDraft — Contract Template & Workflow System",
    category: "SaaS/Product",
    overview:
      "The same contract, rewritten from scratch every time.\n\nIn one construction business, hours were spent rewriting documents that were structurally identical — only names, dates, and amounts changed.",
    businessProblem:
      "A founder's construction company was manually rewriting contracts for every new job. The structure was nearly identical — company info, clauses, dates, signatures — but each contract still required manual editing, review, and rework. Operational friction like this is expensive because it accumulates quietly. Hundreds of manual contract cycles per year was the real cost, not any single contract.",
    role: "Product Builder + Frontend Lead — LexaDraft (Ardexa)",
    contributions: [
      "Built the template builder where contracts are written once with named variable fields — company, owner, dates, payment terms, signatures — making templates reusable assets rather than one-time files.",
      "Developed the document builder flow: select template → fill variable values → generate final contract, eliminating manual reformatting entirely.",
      "Implemented PDF export, Word export, and email delivery so the workflow completed through delivery, not just drafting.",
      "Architected the approval and signing workflow for future expansion toward full contract lifecycle management.",
      "Worked directly with founders to map real operational use cases and validate the product flow against actual business needs.",
    ],
    challenges: [
      "Templates too rigid push users back to manual editing. Templates too flexible lose the speed advantage. Finding that calibration required understanding the actual contract workflow, not just building an editor.",
      "The visible product was a form interface. The real value was the workflow behind it — that required operational thinking more than frontend skill.",
    ],
    solutions: [
      "Made variables first-class template elements so the reuse story was clear from day one — users saw templates as assets, not just saved drafts.",
      "Kept the document builder deliberately minimal (select, fill, generate) so the time savings were immediately obvious and the adoption case was self-evident.",
    ],
    outcomes: [
      "Eliminated repetitive manual contract editing — preparation time dropped significantly, and formatting inconsistency was removed by design.",
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
    category: "SaaS/Product",
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
    featured: true,
  },
  {
    slug: "octo-recommendations-history",
    title: "Recommendations UI & History",
    category: "SaaS/Product",
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
    featured: true,
  },
  {
    slug: "octo-alert-channel-management",
    title: "Alert & Channel Management",
    category: "SaaS/Product",
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
      "Removed the friction between setting cost thresholds and actually getting notified — no engineering handoff needed.",
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
      "Placed 2nd at Startup Weekend Bohol — built and validated a working product under tight time constraints.",
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
    featured: true,
  },
  {
    slug: "pacific-west-diagnostic-imaging",
    title: "Pacific West Diagnostic Imaging",
    category: "Freelance",
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
    category: "Freelance",
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
      "Adopted across the company — removed the need to switch tools just to report bugs and became the default reporting workflow.",
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
    screenshots: [],
    relatedExperienceSlug: "automation",
    featured: true,
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
    screenshots: [],
    relatedExperienceSlug: "automation",
  },
  {
    slug: "getemleads-website",
    title: "GetemLeads",
    category: "CMS",
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
    category: "CMS",
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
    category: "CMS",
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
    category: "CMS",
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
      "Manual job searching is a volume problem disguised as a visibility problem. Refreshing boards, scanning duplicates, and trying to evaluate fit manually creates decision fatigue without improving decision quality. The real problem was filtering — separating strong opportunities from noise before spending attention on them. Without a system, quantity overwhelms quality and the best roles get buried.",
    role: "Full System Owner — Architecture, Automation, AI Integration",
    contributions: [
      "Designed a 6-stage pipeline: scraping → deduplication → keyword filtering → AI scoring → threshold filtering → HTML email delivery.",
      "Built a cron-driven scraper polling every 5 minutes with Google Sheets-backed deduplication to prevent repeated alerts.",
      "Created a two-pass keyword filter (strong-match and avoid-keywords) to remove obvious mismatches before reaching the AI layer — logic first, AI second.",
      "Integrated OpenAI scoring that evaluates each listing against skills, salary, workload preferences, and stack fit — returning a match score, pros, cons, and a shouldApply recommendation.",
      "Set a strict threshold: only listings where score ≥ 75 and shouldApply = true continue to notification, protecting alert signal quality.",
      "Generated structured HTML emails with full AI analysis, application reasoning, and a direct job link — turning a notification into an immediate action.",
    ],
    challenges: [
      "Routing everything through AI would make the pipeline slow, expensive, and unreliable — filtering logic had to come before AI, not after.",
      "Notification trust is fragile: one week of noise trains a user to ignore alerts entirely, breaking the system's core value.",
    ],
    solutions: [
      "Built keyword filtering as a pre-AI gate — strong candidates are pre-qualified by logic before LLM evaluation, which cuts token cost and improves response quality.",
      "Enforced a strict match threshold so the system says no far more often than yes — signal quality beats volume.",
    ],
    outcomes: [
      "Replaced manual job board browsing entirely — only genuinely strong opportunities trigger action.",
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
    screenshots: [],
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
      "A fitness coaching business had a preparation problem, not a messaging problem. Every week, the coach manually reviewed each client's progress, compared it with prior weeks, and wrote personalized updates from scratch. As the client roster grew, this became the primary bottleneck. The coach's real value is judgment and relationships — not repetitive analysis that a system could handle. The goal was to remove the prep work without removing the human quality.",
    role: "Workflow Architect + Automation Builder",
    contributions: [
      "Designed an immutable weekly snapshot system — each client's progress is preserved as a discrete record rather than overwritten, creating a reliable coaching history.",
      "Built the AI analysis layer that compares previous and current progress data, then generates a draft coaching message with observations, recommendations, and motivational framing.",
      "Implemented the coach approval gate — every generated message requires review before delivery, making human judgment the final authority.",
      "Created a regeneration loop: if the coach requests edits, the system refines the draft using their feedback rather than starting from scratch.",
      "Engineered prompts for tone consistency — messages needed to sound like the coach, not like an AI summary.",
    ],
    challenges: [
      "Trust-sensitive content fails at both extremes — messages that feel robotic destroy the coach-client relationship even if technically accurate.",
      "Overwriting client progress state between weeks would break the AI's ability to reason about behavioral trends over time.",
    ],
    solutions: [
      "Designed the approval gate as the core of the system architecture, not an optional add-on — automation becomes leverage only when the human remains in control.",
      "Used immutable weekly snapshots so the AI always reasons from preserved observation history, not a destructively updated state.",
    ],
    outcomes: [
      "Coach no longer starts every weekly message from zero — AI handles progress analysis and drafting, coach focuses on judgment, tone, and the final call.",
      "Improved message consistency across the client roster and reduced weekly preparation time without reducing personalization quality.",
    ],
    stack: ["n8n", "OpenAI API", "JavaScript"],
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
    title: "Ripple — Product Ownership & Strategic Alignment",
    category: "SaaS/Product",
    overview:
      "Owned product delivery across multiple SaaS tools and helped validate a strategic partnership that improved cloud cost decisions, not just reporting.",
    businessProblem:
      "Ripple delivered cloud invoicing and financial visibility — but visibility alone doesn't prevent overspending. Customers still struggled with Reserved Instance and Savings Plan decisions that directly affected profitability. The question was whether a partnership with Archera could create a stronger combined product story (visibility + optimization) rather than building another internal feature from scratch.",
    role: "Product Owner — Ripple, Flow, Wave & Wave Pro · Alphaus",
    contributions: [
      "Led sprint planning, backlog refinement, and feature specs across five connected cloud billing products.",
      "Stepped into Figma UI/UX design ownership when design bandwidth was unavailable, unblocking engineering delivery.",
      "Supported the Ripple V2 migration from monolith to microfrontend architecture.",
      "Tasked by the CEO to evaluate the Alphaus–Archera strategic partnership — studied Archera's commitment optimization product, mapped integration opportunities, and supported internal stakeholder alignment.",
      "Assessed architectural compatibility between Archera's reservation lifecycle tooling and Ripple's invoicing and cost visibility workflows.",
    ],
    challenges: [
      "Separating interesting technology from actual strategic fit — many integrations look good on paper but few improve customer outcomes meaningfully.",
      "Evaluating a partner system without direct implementation ownership required stronger product judgment than coding.",
      "Balancing product ownership across five connected products while simultaneously leading strategic evaluation work.",
    ],
    solutions: [
      "Approached the partnership as a product fit problem: 'Can these systems create stronger outcomes together?' rather than 'Can we connect them?'",
      "Mapped customer workflows where commitment optimization would complement existing visibility — identifying leverage points rather than feature overlap.",
      "Worked with leadership and product teams to align on what the partnership solved, where ownership boundaries existed, and what long-term product value looked like.",
    ],
    outcomes: [
      "Partnership established as an active strategic initiative — strengthening product positioning from cost visibility alone to visibility plus optimization.",
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
    slug: "flexiwork",
    title: "Flexiwork — Agency Web Development",
    period: "Mar 2026 – Present",
    summary:
      "Agency web work across WordPress, Wix, Elementor, and custom HTML/Tailwind builds — delivering client websites with fast turnaround and direct client communication.",
    responsibilities: [
      "Build websites from design to production using WordPress, Wix, Elementor, and HTML/Tailwind.",
      "Translate Figma designs and client requirements into conversion-focused layouts.",
      "Handle Stripe integrations, responsive design, and direct client revisions.",
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
    title: "Ardexa.ai — Startup MVP Development",
    period: "Oct 2025 – Apr 2026",
    summary:
      "Led frontend and full-stack development on three startup MVPs alongside two founders — RentWise, LexaDraft, and TicketDesk — working directly on architecture, product decisions, and implementation.",
    responsibilities: [
      "Built MVP products using Next.js, TypeScript, Tailwind CSS, Shadcn UI, and Supabase.",
      "Served as primary frontend and full-stack developer in a 4-person team (2 founders + 1 backend dev).",
      "Proposed architecture, validated product direction with founders, and made implementation decisions independently.",
    ],
    achievements: [
      "Shipped three production-ready MVP systems across different business domains.",
      "Built hard-requirement filtering and scoring logic for RentWise — transforming a listing platform into a qualification engine.",
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
    title: "Alphaus — Junior FE → Lead FE → Product Owner",
    period: "Jul 2023 – Dec 2025",
    summary:
      "Progressed from Junior Frontend Developer to Lead to Product Owner in under two years — owning frontend quality, release coordination, UI/UX design, and product delivery across Octo, Ripple, Flow, Wave, and Wave Pro.",
    responsibilities: [
      "Built SaaS interfaces using Vue, Vuetify, TypeScript, ECharts, and GridStack across cloud cost management modules.",
      "Led PR reviews, release coordination, Cypress testing, and frontend architecture as Lead Frontend Developer.",
      "As Product Owner, ran sprint planning, backlog refinement, feature specs, and Figma UI/UX design for five connected products.",
      "Built Slack-to-ClickUp bug automation (Make → n8n) adopted company-wide and recognized by the CEO.",
      "Supported Ripple V2 migration (monolith → microfrontend) and led Alphaus–Archera product partnership alignment.",
    ],
    achievements: [
      "Bug reporting automation adopted company-wide — eliminated manual triage, recognized by leadership.",
      "Stepped into UI/UX design ownership to unblock engineering when design bandwidth was unavailable.",
      "Introduced PR templates that improved review speed and weekly release consistency.",
      "FinOps Certified Practitioner — grounding product and UI decisions in cloud financial management concepts.",
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
      "Built automation systems that remove real operational friction — AI job-matching pipelines, coaching delivery with approval flows, Slack-to-ClickUp reporting, and WhatsApp bots.",
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
      "Technical limitations are often business limitations — knowing when to escalate matters.",
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
      "Client web work across healthcare, travel, and service industries — WordPress, Wix, HTML/Tailwind builds with Stripe integrations and conversion-focused layouts.",
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
    title: "RentHive — Startup Weekend Bohol",
    period: "2024",
    summary:
      "Startup Weekend Bohol — peer-to-peer rental platform MVP built under competition pressure. Helped the team win 2nd place.",
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
    title: "Computer Engineering — Bohol Island State University",
    period: "2019 – 2023",
    summary:
      "Computer Engineering degree — embedded systems, thesis prototyping, and the technical foundation that preceded real-world product work.",
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
