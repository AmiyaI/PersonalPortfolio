/*
     FileName: constants.js
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { phishai, portfolio, weatherApp, avatar, techIcons } from '../assets';

const socials = [
  { label: 'GitHub', href: 'https://github.com/AmiyaI' },
  { label: 'Email', href: 'mailto:iamiya@vt.edu' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/amiya-islam' },
];

// The hero's role line scrambles through these in order.
const roles = [
  'Founding Engineer',
  'AI Engineer',
  'Agent Architect',
  'Agentic Coder',
  '100x Engineer',
  'Product Builder',
  'Full-Stack Engineer',
  'Cloud & DevOps Engineer',
  '0 → 1 Builder',
  'AI Enthusiast',
  'Lifelong Tinkerer',
];

const introduction = {
  text: [
    "Hey, I'm Amiya. Thanks for stopping by :)",

    "I'm a founding engineer who loves building with AI, from the agents themselves to the products people use and the cloud they run on.",

    "I came to software from construction engineering at Virginia Tech, picked up DevOps, Kubernetes and a stack of cloud certifications along the way, and I've been hooked on AI since ChatGPT first launched.",

    "Off the clock you'll find me working on my fitness, out in nature, trading or playing the piano. I'm always up for building something great with people who care about it as much as I do. Thanks for visiting!",
  ],
  statement:
    "I build AI agents that do real work, and the cloud infrastructure that keeps them fast, safe and cheap to run.",
};

export const navLinks = [
  { id: 'about', title: 'About' },
  { id: 'early-ai', title: 'Early to generative AI' },
  { id: 'experience', title: 'Experience' },
  { id: 'projects', title: 'Projects' },
  { id: 'skills', title: 'Skills' },
  { id: 'contact', title: 'Contact' },
];

export const pageLinks = [
  { to: '/beyond', title: 'Beyond' },
];

const experience = [
  {
    company: 'SWA AI',
    role: 'Founding Engineer',
    period: 'Feb 2025 – Present',
    chapter: 'Building an enterprise AI platform from zero',
    points: [
      'Built a production multi-agent AI platform that teams use inside Slack, Microsoft Teams, SMS, web and mobile, on OpenAI, Claude, Gemini and more.',
      'Built the enterprise controls: spend limits per person and team, enforced on every message, and model access controls at every level.',
      'Built billing end to end and led the move from Chargebee to Stripe, with usage-based overage.',
      'Redesigned the data model for multi-tenant orgs across 9+ services and migrated live data with zero downtime.',
      'Manage 2 engineers and own production reliability: infrastructure as code, incidents and security audits.',
    ],
    tags: ['Multi-agent', 'AWS serverless', 'Stripe'],
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
    role: 'B.S., DevOps Certificate & M.S. (paused)',
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
    demo_link: '/studio#i-didnt-film-this',
    demo_label: 'Watch it in Studio',
  },
  {
    name: 'Agentic Marketing Engine',
    description: 'Paste a company URL and a pipeline of AI agents researches the market, writes strategy, produces ads and critiques its own work before anything ships.',
    tags: ['Agents', 'Creative', 'Node'],
    image: '/media/studio/ads/c17.webp',
    imageAlt: 'An ad produced by the marketing engine',
    demo_link: '/studio#stills',
    demo_label: 'See its ads in Studio',
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

// The poster list in Skills: one giant word per line, one fact beside it.
// The skills grid: a brand logo (devicon, MIT, in assets/tech) or a drawn
// icon, the name, and the certification or track record behind it.
const skills = [
  { name: 'AI agents', icon: 'sparkle', fact: 'OpenAI, Claude, Gemini, RAG' },
  { name: 'AWS', icon: techIcons.aws, fact: '5 certifications, DevOps Pro' },
  { name: 'Kubernetes', icon: techIcons.kubernetes, fact: 'Certified administrator' },
  { name: 'Terraform', icon: techIcons.terraform, fact: 'Certified associate' },
  { name: 'Docker', icon: techIcons.docker, fact: 'Containerized services' },
  { name: 'Linux', icon: techIcons.linux, fact: 'Certified sysadmin' },
  { name: 'Python', icon: techIcons.python, fact: 'Services and automation' },
  { name: 'TypeScript', icon: techIcons.typescript, fact: 'Front end to back end' },
  { name: 'React', icon: techIcons.react, fact: 'Web apps and portals' },
  { name: 'Next.js', icon: techIcons.nextjs, fact: 'Production web apps' },
  { name: 'Node.js', icon: techIcons.nodejs, fact: 'APIs and agent services' },
  { name: 'PostgreSQL', icon: techIcons.postgresql, fact: 'Multi-tenant data' },
  { name: 'CI/CD', icon: techIcons.githubactions, fact: 'GitHub Actions, Jenkins' },
  { name: 'Security', icon: 'shield', fact: 'Security+, AWS Specialty' },
];

// Early to generative AI: how I've worked with it since GPT-3.5.
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
  { title: 'Powerlifting', note: 'Squat, bench, deadlift. Mostly deadlift.', tilt: -6 },
  { title: 'Trading', note: 'Charts, theses and the occasional humbling.', tilt: 4 },
  { title: 'The outdoors', note: 'Trails, water and anywhere without Wi-Fi.', tilt: -3 },
  { title: 'Piano', note: 'Slowly, enthusiastically, mostly by ear.', tilt: 7 },
  { title: 'Rec sports', note: 'Pickup games and whatever league will have me.', tilt: -8 },
  { title: 'Volunteering', note: 'Fitness and cooking classes for seniors at Warm Hearth Village since 2022.', tilt: 3 },
];

export {
  roles,
  introduction,
  experience,
  certifications,
  projects,
  memoji,
  skills,
  hobbies,
  hotTakes,
  aiJourney,
  socials,
};
