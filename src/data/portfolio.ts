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
  "Web Developer",
  "Automation Builder",
  "Workflow Creator",
  "Slack Bot Maker",
  "Tool Integrator",
  "Tech Assistant",
  "No-Code Tinkerer",
  "Script Helper",
  "Problem Solver",
  "Product Owner",
];

export const experiences: Experience[] = [
  {
    position: "Product Owner",
    company: "Ripple & Flow by Alphaus",
    duration: "Present",
    color: "violet",
    description:
      "Promoted to Product Owner for Ripple and Flow, two core modules in our cloud cost management SaaS. Responsible for planning roadmap, refining backlogs, writing specs, and aligning design, dev, and marketing teams to deliver value faster.",
    cta: "Learn About Ripple",
    link: "https://www.alphaus.cloud/en/ripple",
  },
  {
    position: "Frontend Developer / Co-Founder",
    company: "RentHive (Startup)",
    duration: "2024",
    color: "purple",
    description:
      "Helped design and build RentHive, a peer-to-peer rental platform. Developed UI components including login, product listings, checkout, and cart using Tailwind CSS and JavaScript. Focused on clean design, UX flow, and mobile responsiveness.",
    cta: "View Code",
    link: "https://github.com/lordkelvinabellana/RentHiveFinal",
  },
  {
    position: "Frontend Developer",
    company: "Octo by Alphaus",
    duration: "2022 – 2024",
    color: "blue",
    description:
      "Built internal UI tools using Vue, Vuetify, Tailwind CSS, and TypeScript. Developed dashboards and reusable components, integrated APIs, and worked closely with product to deliver scalable cloud cost visibility features.",
    cta: "Learn About Octo",
    link: "https://www.alphaus.cloud/en/octo",
  },
  {
    position: "Web Developer / Virtual Assistant",
    company: "Freelance / Contract",
    duration: "2023 – Present",
    color: "sky",
    description:
      "Developed websites and landing pages for clients using Wix, WordPress, HTML/CSS, and JavaScript. Managed VA tasks, client comms, and provided automation support when needed.",
    cta: "View Portfolio",
    link: "#",
  },
  {
    position: "Automation Specialist",
    company: "Various Projects",
    duration: "2022 – Present",
    color: "green",
    description:
      "Built automation workflows with Make, Zapier, and n8n — integrating platforms like Slack, Notion, Tally, and Google Sheets to reduce manual work and boost productivity.",
    cta: "View Portfolio",
    link: "#",
  },
  {
    position: "Tech Intern / Thesis Developer",
    company: "Academic Projects",
    duration: "2022 – 2023",
    color: "slate",
    description:
      "Developed an IoT-based emergency serial messenger using NodeMCU ESP8266 and LoRa. Also worked on embedded systems and mobile apps using Flutter and Dart during Computer Engineering studies.",
    cta: null,
  },
];

export const octoProjects: Project[] = [
  {
    title: "Dashboard & Cost Report Builder",
    role: "Frontend Developer – Octo",
    description:
      "Built the drag-and-drop dashboard layout using GridStack, including multiple chart widgets powered by ECharts. Developed cost report creation flow with filtering, currency conversion, export options, and editable reports. Implemented support for deleting, duplicating, and visualizing reports using user fiscal settings.",
    images: ["/assets/octo/db1.png", "/assets/octo/db2.png", "/assets/octo/db3.png", "/assets/octo/db4.png"],
    stack: ["Vue", "Vuetify", "ECharts", "GridStack", "TypeScript", "I18n", "DayJs", "Pinia", "REST API"],
  },
  {
    title: "Recommendations UI & History",
    role: "Frontend Developer – Octo",
    description:
      "Built a performant UI for cloud optimization recommendations. Implemented filterable lists, detailed recommendation views, and a history timeline with charts and savings summaries. Integrated multiple backend endpoints for cost calculations, filters, optimization statuses, and executed states.",
    stack: ["Vue", "Vuetify", "ECharts", "TypeScript", "Pinia", "Dayjs", "I18n", "REST API"],
    images: ["/assets/octo/rec1.png", "/assets/octo/rec2.png", "/assets/octo/rec3.png", "/assets/octo/rec4.png"],
  },
  {
    title: "Alert & Channel Management",
    role: "Frontend Developer – Octo",
    description:
      "Developed and maintained the Alert Management and Channel Management UIs, allowing users to set up notifications when budgets or costs exceed thresholds. Users can create/edit alerts based on cost or percentage, and route notifications via Slack, MS Teams, or Email.",
    stack: ["Vue", "Vuetify", "Pinia", "TypeScript", "REST API", "Dayjs", "I18n"],
    images: ["/assets/octo/alert1.png", "/assets/octo/alert2.png", "/assets/octo/alert3.png", "/assets/octo/alert4.png"],
  },
  {
    title: "Onboarding & Route Enhancements",
    role: "Frontend Developer – Octo",
    description:
      "Led improvements in layout structure and onboarding experience by introducing dynamic headers and enhancing route-level logic. These changes improved visual consistency, guided user flows, and made the app more adaptable to different languages and user contexts.",
    stack: ["Vue", "Vuetify", "Pinia", "TypeScript", "Vue Router", "i18n"],
    images: ["/assets/octo/on1.png", "/assets/octo/on2.png", "/assets/octo/on3.png", "/assets/octo/on4.png"],
  },
  {
    title: "Budget Management",
    role: "Frontend Developer – Octo",
    description:
      "Implemented a budgeting interface that helps users plan and track their cloud spending. Developed dynamic charts and tables to show actual cost, budget allocations, and forecasts. Users can create, edit, and delete budgets, and configure notifications when thresholds are met.",
    stack: ["Vue", "Vuetify", "Pinia", "TypeScript", "ECharts", "i18n", "REST API"],
    images: ["/assets/octo/bud1.png", "/assets/octo/bud2.png", "/assets/octo/bud3.png", "/assets/octo/bud4.png", "/assets/octo/bud5.png"],
  },
  {
    title: "Account Registration & Management",
    role: "Frontend Developer – Octo",
    description:
      "Enhanced the account registration and management experience by implementing a unified view that aggregates billing and sub-account data. Contributed to better data visibility and more intuitive onboarding flows for users managing cloud billing structures.",
    stack: ["Vue", "Vuetify", "Pinia", "TypeScript", "Vue Router"],
    images: ["/assets/octo/acc1.png", "/assets/octo/acc2.png", "/assets/octo/acc3.png", "/assets/octo/acc4.png"],
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
    images: ["/assets/renthive/rh1.png", "/assets/renthive/rh2.png", "/assets/renthive/rh3.png", "/assets/renthive/rh4.png"],
  },
  {
    title: "Pacific West Diagnostic Imaging",
    role: "Freelance Web Developer",
    description:
      "Developed a full-featured medical website using Wix for Pacific West Diagnostic Imaging. The site includes custom CSS styling, Stripe payment integration, and multiple service pages, offering a seamless experience for both patients and staff.",
    stack: ["Wix", "Custom CSS", "Stripe"],
    images: ["/assets/pacwest/pw1.png", "/assets/pacwest/pw2.png", "/assets/pacwest/pw3.png", "/assets/pacwest/pw4.png"],
  },
  {
    title: "CzechVibes",
    role: "Freelance Frontend Developer",
    description:
      "Built a responsive, multi-language frontend for a European travel and content brand. Developed using HTML and Tailwind, the site was optimized for mobile and desktop, focusing on clean layouts and accessibility.",
    stack: ["HTML", "Tailwind CSS"],
    images: ["/assets/czech/cv1.png", "/assets/czech/cv2.png", "/assets/czech/cv3.png", "/assets/czech/cv4.png"],
  },
  {
    title: "Arnis Scoreboard",
    role: "Personal Project",
    description:
      "Built a real-time scoring and timer system used during an Arnis tournament. Designed for simplicity and usability, the app lets users track round durations and update scores with ease. Tailored for live competitions with a responsive layout and clean UI.",
    stack: ["Vue", "Vuetify"],
    images: ["/assets/arnis/arnis1.png", "/assets/arnis/arnis2.png", "/assets/arnis/arnis3.png"],
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
    stack: ["n8n", "Slack Events API", "Custom Kanban API", "JavaScript", "Webhooks"],
    images: [],
  },
  {
    title: "Zoom → YouTube Upload Pipeline (n8n)",
    role: "Automation Specialist – Media Ops",
    description:
      "Automated the end-to-end handling of Zoom cloud recordings: fetches month-by-month, logs metadata to Google Sheets, stores raw files in Wasabi (S3-compatible), and uploads to YouTube within the 15 uploads/day cap.",
    stack: ["n8n", "Zoom API", "YouTube Data API v3", "Google Sheets API", "Wasabi (S3)", "Cron"],
    images: [],
  },
  {
    title: "Slack Bot – Task Intake & Acknowledgements",
    role: "Automation Specialist – Internal Tools",
    description:
      "Created a Slack app that listens for mentions in channels/threads, validates message format, and sends structured payloads to n8n flows for bug reports, UX requests, and general tasks. Posts confirmation replies with direct task links.",
    stack: ["Slack Bolt API", "Slack Events API", "n8n", "JavaScript", "TypeScript", "Webhooks"],
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
  category: "SaaS/Product" | "Freelance" | "Startup" | "Automation" | "Personal";
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
      "Improved self-serve reporting for cloud cost users.",
      "Reduced friction around cost report creation and dashboard customization.",
    ],
    stack: ["Vue", "Vuetify", "ECharts", "GridStack", "TypeScript", "i18n", "Pinia", "REST API"],
    screenshots: ["/assets/octo/db1.png", "/assets/octo/db2.png", "/assets/octo/db3.png", "/assets/octo/db4.png"],
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
      "Helped users evaluate optimization opportunities faster.",
      "Improved visibility into implemented recommendations and their impact.",
    ],
    stack: ["Vue", "Vuetify", "ECharts", "TypeScript", "Pinia", "Day.js", "i18n", "REST API"],
    screenshots: ["/assets/octo/rec1.png", "/assets/octo/rec2.png", "/assets/octo/rec3.png", "/assets/octo/rec4.png"],
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
      "Made notification setup more approachable for cloud cost teams.",
      "Supported proactive budget and cost monitoring workflows.",
    ],
    stack: ["Vue", "Vuetify", "Pinia", "TypeScript", "REST API", "Day.js", "i18n"],
    screenshots: ["/assets/octo/alert1.png", "/assets/octo/alert2.png", "/assets/octo/alert3.png", "/assets/octo/alert4.png"],
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
      "Helped the team win 2nd place at Startup Weekend Bohol.",
      "Produced a working MVP story for marketplace validation.",
    ],
    stack: ["HTML", "Tailwind CSS", "JavaScript"],
    screenshots: ["/assets/renthive/rh1.png", "/assets/renthive/rh2.png", "/assets/renthive/rh3.png", "/assets/renthive/rh4.png"],
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
    screenshots: ["/assets/pacwest/pw1.png", "/assets/pacwest/pw2.png", "/assets/pacwest/pw3.png", "/assets/pacwest/pw4.png"],
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
    screenshots: ["/assets/czech/cv1.png", "/assets/czech/cv2.png", "/assets/czech/cv3.png", "/assets/czech/cv4.png"],
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
      "Reduced manual bug triage work.",
      "Improved QA handoff consistency from Slack to ClickUp.",
    ],
    stack: ["Make", "n8n", "Slack API", "ClickUp API", "JavaScript", "Webhooks"],
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
    stack: ["n8n", "Zoom API", "YouTube Data API v3", "Google Sheets API", "Wasabi", "Cron"],
    screenshots: [],
    relatedExperienceSlug: "automation",
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
    screenshots: ["/assets/arnis/arnis1.png", "/assets/arnis/arnis2.png", "/assets/arnis/arnis3.png"],
    relatedExperienceSlug: "college",
  },
];

export const experiencePhases: ExperiencePhase[] = [
  {
    slug: "college",
    title: "College & Engineering Foundation",
    period: "2022 - 2023",
    summary:
      "Computer Engineering work shaped a systems-first foundation across embedded hardware, C/C++, mobile development, and thesis prototyping.",
    responsibilities: [
      "Built academic and thesis projects across hardware and software contexts.",
      "Worked with embedded systems, microcontrollers, Flutter, Dart, C, and C++.",
      "Developed an IoT emergency messaging thesis using NodeMCU ESP8266 and LoRa.",
    ],
    achievements: [
      "Built a practical emergency communication prototype for low-connectivity areas.",
      "Developed the foundations that later shaped product and automation thinking.",
    ],
    learnings: [
      "Systems thinking across hardware, software, and real-world constraints.",
      "How reliability and clarity matter when tools are used in urgent contexts.",
    ],
    technologies: ["C", "C++", "Dart", "Flutter", "NodeMCU ESP8266", "LoRa"],
    relatedProjectSlugs: ["arnis-scoreboard"],
  },
  {
    slug: "alphaus",
    title: "Alphaus SaaS & Product Work",
    period: "2022 - Present",
    summary:
      "Frontend and product work across cloud cost management modules, from Octo UI features to current Product Owner responsibilities for Ripple and Flow.",
    responsibilities: [
      "Built SaaS interfaces using Vue, Vuetify, Tailwind CSS, TypeScript, Pinia, REST APIs, and data visualization libraries.",
      "Developed dashboards, reports, alerting, recommendations, onboarding, localization, analytics, and optimization flows.",
      "As Product Owner, planned roadmap, refined backlogs, wrote specs, and aligned design, engineering, and marketing teams.",
    ],
    achievements: [
      "Shipped multiple cloud cost visibility and optimization features.",
      "Moved from frontend implementation into broader product ownership.",
    ],
    learnings: [
      "How to balance technical feasibility, user value, and cross-team delivery.",
      "How product context improves frontend decisions.",
    ],
    technologies: ["Vue", "Vuetify", "TypeScript", "Pinia", "ECharts", "GridStack", "i18n", "REST API"],
    relatedProjectSlugs: [
      "octo-dashboard-cost-report-builder",
      "octo-recommendations-history",
      "octo-alert-channel-management",
    ],
  },
  {
    slug: "freelance",
    title: "Freelance & Client Websites",
    period: "2023 - Present",
    summary:
      "Freelance web work across client websites, landing pages, healthcare content, travel content, and support tasks.",
    responsibilities: [
      "Built client websites and landing pages using Wix, WordPress, HTML, CSS, and Tailwind.",
      "Handled client communication, content updates, and implementation details.",
      "Provided automation support where client workflows needed less manual work.",
    ],
    achievements: [
      "Delivered client-facing websites across healthcare and travel contexts.",
      "Balanced design polish with platform constraints.",
    ],
    learnings: [
      "How to communicate technical work to non-technical clients.",
      "How industry context changes content hierarchy and trust signals.",
    ],
    technologies: ["Wix", "WordPress", "HTML", "CSS", "Tailwind CSS", "Stripe"],
    relatedProjectSlugs: ["pacific-west-diagnostic-imaging", "czechvibes-travel-site"],
  },
  {
    slug: "renthive",
    title: "RentHive Startup Build",
    period: "2024",
    summary:
      "Startup Weekend Bohol work on a peer-to-peer rental platform MVP, combining product thinking, UI development, and rapid validation.",
    responsibilities: [
      "Co-designed the MVP user flow and core interface screens.",
      "Built responsive UI components for listing, login, checkout, and cart flows.",
      "Helped translate a startup idea into a demo-ready product story.",
    ],
    achievements: [
      "Helped the team win 2nd place at Startup Weekend Bohol.",
      "Built a credible marketplace MVP under a short timeline.",
    ],
    learnings: [
      "How to prioritize the smallest product surface that proves the concept.",
      "How pitch, product, and UI need to reinforce one another.",
    ],
    technologies: ["HTML", "Tailwind CSS", "JavaScript"],
    relatedProjectSlugs: ["renthive-mvp-ui"],
  },
  {
    slug: "automation",
    title: "Automation & Internal Tools",
    period: "2022 - Present",
    summary:
      "Workflow automation across Slack, ClickUp, n8n, Make, Zapier, Google Sheets, Zoom, YouTube, and internal task systems.",
    responsibilities: [
      "Built automations that move informal requests into structured task and media workflows.",
      "Integrated Slack, ClickUp, Google Sheets, Zoom, YouTube, Wasabi, and custom APIs.",
      "Created routing, parsing, metadata mapping, attachment handling, and confirmation logic.",
    ],
    achievements: [
      "Reduced manual handoff work for bugs, UX requests, task capture, and media uploads.",
      "Built reusable automation patterns across Make and n8n.",
    ],
    learnings: [
      "How operational clarity depends on reliable handoffs and visible confirmations.",
      "How automation is strongest when it fits the team’s existing habits.",
    ],
    technologies: ["n8n", "Make", "Zapier", "Slack API", "ClickUp API", "Google Sheets API", "Webhooks"],
    relatedProjectSlugs: ["slack-clickup-bug-automation", "zoom-youtube-upload-pipeline"],
  },
];

export const credentials: Credential[] = [
  {
    slug: "finops-certified-practitioner",
    title: "FinOps Certified Practitioner",
    issuer: "FinOps Foundation",
    type: "Badge",
    verificationUrl: "https://www.credly.com/badges/daf53222-223e-49b5-9aff-af074dc73802/public_url",
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
