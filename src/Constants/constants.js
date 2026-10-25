/*
     FileName: constants.js
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import {
  faEnvelope,
  faRobot,
  faDharmachakra,
  faChartLine,
  faDumbbell,
  faMountainSun,
  faMusic,
  faBasketball,
  faHandHoldingHeart,
  faArrowTrendUp,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faReact } from '@fortawesome/free-brands-svg-icons';

import {
  linuxIcon,
  terraformIcon,
  securityIcon,
  awsIcon,
  githubIcon,
  projectManagementIcon,
  dockerIcon,
  pyIcon,
  cicdIcon,
  phishai,
  portfolio,
  weatherApp,
  avatar,
} from '../assets';

const icons = {
  faGithub,
  faLinkedin,
  faEnvelope,
};

const socials = [
  { label: 'GitHub', href: 'https://github.com/AmiyaI', icon: faGithub },
  { label: 'Email', href: 'mailto:iamiya@vt.edu', icon: faEnvelope },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/amiya-islam', icon: faLinkedin },
];

const roles = [
  'Founding Engineer',
  'AI agent builder',
  'Cloud & DevOps engineer',
  'AI filmmaker',
];

const introduction = {
  text: [
    "Hey, I'm Amiya. Thanks for stopping by :)",

    "I'm the Founding Engineer at SWA AI, an early-stage startup founded by former Nike executives. I build the multi-agent AI platform our customers use inside Slack, Microsoft Teams, SMS, web and mobile.",

    "I came to software from construction engineering at Virginia Tech, picked up DevOps, Kubernetes and a stack of AWS certifications along the way, and now ship everything from billing systems to autonomous agents.",

    "Off the clock I'm lifting, outside, at the piano, or making AI films and experiments. Some are serious. Some are pure slop.",
  ],
  statement:
    "I build AI agents that do real work, and the cloud infrastructure that keeps them fast, safe and cheap to run.",
};

const stats = [
  { value: 1000, suffix: '+', label: 'production changes shipped in 5 months' },
  { value: 35, suffix: '', label: 'codebases touched' },
  { value: 121, suffix: '', label: 'business apps agents can connect to' },
  { value: 10, suffix: '', label: 'cloud & security certifications' },
];

export const navLinks = [
  { id: 'about', title: 'About' },
  { id: 'early-ai', title: 'Early to AI' },
  { id: 'experience', title: 'Experience' },
  { id: 'projects', title: 'Projects' },
  { id: 'skills', title: 'Skills' },
  { id: 'takes', title: 'Hot takes' },
  { id: 'contact', title: 'Contact' },
];

export const pageLinks = [
  { to: '/studio', title: 'Studio' },
  { to: '/ai-slop', title: 'AI Slop' },
];

const experience = [
  {
    company: 'SWA AI',
    role: 'Founding Engineer',
    period: 'Feb 2025 – Present',
    chapter: 'AI agents & platform',
    points: [
      'Built a production multi-agent AI platform used in Slack, Microsoft Teams, SMS, web and mobile, powered by OpenAI, Claude, Gemini, Grok, Perplexity and DeepSeek.',
      'Launched a marketplace that connects 121 business apps to agents in one click, with lazy tool loading so agents only load what a request needs.',
      'Built the autonomous scheduler end to end on AWS serverless: Lambda, DynamoDB, EventBridge and SQS.',
      'Shipped a no-code agent builder: pick instructions, model, knowledge and per-app permissions.',
    ],
    tags: ['Multi-agent', 'RAG', 'AWS serverless'],
  },
  {
    company: 'SWA AI',
    role: 'Founding Engineer',
    period: 'Feb 2025 – Present',
    chapter: 'Enterprise, billing & data',
    points: [
      'Built AI governance: per-person and per-team spend limits enforced on every message, plus model access controls at every level.',
      'Built billing end to end and led the move from Chargebee to Stripe, with usage-based overage and 300+ tests.',
      'Consolidated login across 4 web apps onto Auth0 with Google, Slack and Apple sign-in.',
      'Redesigned the schema across 9+ services for multi-tenant orgs and migrated live data with zero downtime.',
    ],
    tags: ['Stripe', 'Auth0', 'Postgres'],
  },
  {
    company: 'SWA AI',
    role: 'Founding Engineer',
    period: 'Feb 2025 – Present',
    chapter: 'Products & channels',
    points: [
      'Built and launched Swa Solo, a standalone AI chat product, in about one week, frontend and backend.',
      'Architected three web portals: customer admin, internal admin and a reseller partner portal.',
      'Built the SMS and WhatsApp assistant on Twilio with carrier compliance, plus a Telegram channel.',
      'Co-built a partner reseller program with wholesale pricing, revenue sharing and automated invoicing.',
    ],
    tags: ['Next.js', 'Twilio', 'Product'],
  },
  {
    company: 'SWA AI',
    role: 'Founding Engineer',
    period: 'Feb 2025 – Present',
    chapter: 'Leadership & operations',
    points: [
      'Manage 2 engineers in India across time zones and work daily with the CEO, CTO and COO.',
      'Helped design an AI pull-request reviewer that checks every PR across 30+ repos with specialist reviewers.',
      'Own production reliability: a pre-production environment in infrastructure as code, incidents and security audits.',
      'Lead company-wide AI tool rollout and the NVIDIA Inception program.',
    ],
    tags: ['Leadership', 'IaC', 'AI tooling'],
  },
  {
    company: 'DPR Construction',
    role: 'Project Engineer',
    period: 'May – Aug 2022',
    chapter: 'A $100M civic build',
    points: [
      'Helped lead the design-build of a $100 million Municipal Center for the City of Tampa.',
      'Coordinated RFIs, meetings and documents across a diverse team to hit tight milestones.',
      'Kept quality and schedule on track with PlanGrid, Bluebeam, CMiC and Navisworks.',
    ],
    tags: ['Construction', 'Coordination'],
  },
  {
    company: 'Virginia Tech',
    role: 'B.S., DevOps Certificate & M.S.',
    period: '2019 – Present',
    chapter: 'Education & first team',
    points: [
      'B.S. in Construction Engineering and Management (2023).',
      'Certificate in DevOps Engineering with a 4.0 GPA (2023).',
      'M.S. in Information Technology, paused to build full time.',
      'Supervised a campus operations team of 30 and tripled its efficiency.',
    ],
    tags: ['Education', 'Leadership'],
  },
];

const certifications = [
  'AWS DevOps Engineer Pro',
  'AWS Security Specialty',
  'Certified Kubernetes Administrator',
  'AWS Solutions Architect',
  'Linux Foundation Sysadmin',
  'AWS Developer',
  'CompTIA Security+',
  'AWS SysOps Administrator',
  'Terraform Associate',
];

const projects = [
  {
    name: 'Swa Agent Platform',
    description: 'A production multi-agent AI platform where agents work alone or together across files, images, video, deep research, browsing and scheduling, in Slack, Teams, SMS, web and mobile.',
    tags: ['Multi-agent', 'RAG', 'AWS'],
    image: '/media/studio/explainer-poster.webp',
    imageAlt: 'Swa answering a multi-model request inside Slack',
    demo_link: 'https://swa-ai.com',
  },
  {
    name: "I Didn't Film This",
    description: 'A 45-second video where an AI avatar explains it was never filmed: HeyGen for the presenter, my cloned voice on ElevenLabs, and an edit built in code with HyperFrames and GSAP.',
    tags: ['AI video', 'HyperFrames', 'ElevenLabs'],
    image: '/media/studio/i-didnt-film-this-poster.webp',
    imageAlt: "A frame from I Didn't Film This",
    demo_link: '/studio',
    demo_label: 'Watch it in Studio',
  },
  {
    name: 'Agentic Marketing Engine',
    description: 'Paste a company URL and a pipeline of AI agents researches the market, writes strategy, produces ads and critiques its own work before anything ships.',
    tags: ['Agents', 'Creative', 'Node'],
    image: '/media/studio/ads/c17.webp',
    imageAlt: 'An ad produced by the marketing engine',
  },
  {
    name: 'PhishAI',
    description: 'A generative AI cybersecurity trainer that simulates evolving phishing scenarios with dynamic voice, images and prompts on AWS SageMaker, Bedrock and Polly.',
    tags: ['Bedrock', 'Terraform', 'Security'],
    image: phishai,
    source_code_link: 'https://github.com/AmiyaI/PhishAI',
    demo_link: 'https://phishai.co/',
  },
  {
    name: 'Weather App',
    description: 'An AWS ETL pipeline that collects and transforms weather data with Python and Docker, Jenkins for CI/CD and Terraform for infrastructure.',
    tags: ['Python', 'Docker', 'Jenkins'],
    image: weatherApp,
    source_code_link: 'https://github.com/AmiyaI/WeatherApp',
    demo_link: 'https://github.com/AmiyaI/WeatherApp/blob/main/README.md',
  },
  {
    name: 'This Website',
    description: 'The site you are on: React 19, GSAP, Lenis and a particle hero, deployed on AWS Amplify.',
    tags: ['React', 'GSAP', 'Amplify'],
    image: portfolio,
    source_code_link: 'https://github.com/AmiyaI/PersonalPortfolio',
    demo_link: 'https://www.amiyaislam.com',
  },
];

const memoji = {
  image: [avatar],
};

const skills = [
  {
    id: 'ai-agents',
    title: 'AI Agents & LLMs',
    fa: faRobot,
    description:
      'Multi-agent orchestration, tool calling, RAG with Pinecone and conversation memory across OpenAI, Claude, Gemini, Grok and Perplexity.',
  },
  {
    id: 'aws',
    title: 'Amazon Web Services',
    icon: awsIcon,
    description:
      'Lambda, API Gateway, DynamoDB, S3, ECS, EventBridge, SQS, IAM and Amplify, with 5 AWS certifications including DevOps Pro.',
  },
  {
    id: 'terraform',
    title: 'Infrastructure as Code',
    icon: terraformIcon,
    description:
      'Terraform Associate certified. Terraform, CloudFormation and SAM for environments that are rebuilt, not hand-tuned.',
  },
  {
    id: 'kubernetes',
    title: 'Kubernetes',
    fa: faDharmachakra,
    description:
      'Certified Kubernetes Administrator, comfortable running and debugging workloads on real clusters.',
  },
  {
    id: 'docker',
    title: 'Docker',
    icon: dockerIcon,
    description:
      'Containerized services from local dev to ECS, with images that stay small and builds that stay fast.',
  },
  {
    id: 'py',
    title: 'Python',
    icon: pyIcon,
    description:
      'Backend services, automation and cloud tooling, plus Bash for everything in between.',
  },
  {
    id: 'typescript',
    title: 'TypeScript & React',
    fa: faReact,
    description:
      'Next.js, React and Node.js for portals, products and this site, with Playwright tests behind them.',
  },
  {
    id: 'cicd',
    title: 'CI/CD',
    icon: cicdIcon,
    description:
      'GitHub Actions, Jenkins and n8n pipelines, plus an AI reviewer that checks every pull request.',
  },
  {
    id: 'linux',
    title: 'Linux',
    icon: linuxIcon,
    description:
      'LFCS certified, from kernel basics and command-line tooling to day-to-day system administration.',
  },
  {
    id: 'security',
    title: 'Networking & Security',
    icon: securityIcon,
    description:
      'AWS Security Specialty and Security+ certified. Auth0, tenant isolation, access controls and audits in production.',
  },
  {
    id: 'observability',
    title: 'Observability',
    fa: faChartLine,
    description:
      'Prometheus, Grafana and CloudWatch, plus usage analytics over millions of records.',
  },
  {
    id: 'project-management',
    title: 'Project Management',
    icon: projectManagementIcon,
    description:
      'Construction engineering roots: estimating, scheduling and coordinating teams, now applied to shipping software.',
  },
];

// The poster list in Skills: one giant word per line, one fact beside it.
const skillLines = [
  { word: 'ai agents', fact: 'OpenAI, Claude, Gemini, Grok, RAG' },
  { word: 'aws', fact: '5 certifications, DevOps Pro' },
  { word: 'kubernetes', fact: 'Certified administrator' },
  { word: 'terraform', fact: 'Infrastructure as code, certified' },
  { word: 'typescript', fact: 'Next.js, React, Node' },
  { word: 'python', fact: 'Services and automation' },
  { word: 'security', fact: 'Security+, AWS Specialty' },
];

// Early to AI: the timeline of how I've worked with AI since GPT-3.5.
const aiJourney = [
  {
    when: '2022',
    title: 'ChatGPT on GPT-3.5',
    text: 'Started using ChatGPT when it launched. I was hooked from the first answer and it never left my workflow.',
  },
  {
    when: '2023',
    title: 'Copy, paste, debug',
    text: 'No agents yet. I pasted code in, pasted answers out, ran them, fed the errors back and checked every line myself.',
  },
  {
    when: '2025',
    title: 'Claude Code',
    text: 'Claude Code arrived with Claude 3.7 Sonnet and the copy-paste loop ended. The agent edits, runs and tests; I review.',
  },
  {
    when: 'Now',
    title: 'Building the agents',
    text: 'I build multi-agent platforms for a living and try every new model and tool the week it ships.',
  },
];

// Favourite quotes and controversial takes. Add new ones to the end.
const hotTakes = [
  "People who say they like animals more than people are not good people. They think they have a deep well of compassion, but really they just want a relationship of unequal status.",
  "If you think you're open-minded but never consider that you might be closed-minded, you're not as open-minded as you think.",
];

// Draft from the resume and the old About text; swap in real photos later.
const hobbies = [
  { title: 'Powerlifting', note: 'Squat, bench, deadlift. Mostly deadlift.', fa: faDumbbell, tilt: -6 },
  { title: 'Trading', note: 'Charts, theses and the occasional humbling.', fa: faArrowTrendUp, tilt: 4 },
  { title: 'The outdoors', note: 'Trails, water and anywhere without Wi-Fi.', fa: faMountainSun, tilt: -3 },
  { title: 'Piano', note: 'Slowly, enthusiastically, mostly by ear.', fa: faMusic, tilt: 7 },
  { title: 'Rec sports', note: 'Pickup games and whatever league will have me.', fa: faBasketball, tilt: -8 },
  { title: 'Volunteering', note: 'Fitness and cooking classes for seniors at Warm Hearth Village since 2022.', fa: faHandHoldingHeart, tilt: 3 },
];

export {
  introduction,
  roles,
  stats,
  experience,
  certifications,
  projects,
  memoji,
  skills,
  skillLines,
  hobbies,
  hotTakes,
  aiJourney,
  socials,
  icons,
};
