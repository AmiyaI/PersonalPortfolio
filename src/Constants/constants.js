/*
   Template from Sara Echeverria
     @editor: Amiya Islam
     FileName: constants.js
     @version: I
     Creation: 10/23/2023
     Last modification: 10/23/2023
*/

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faX,
  faBars,
  faWindowRestore,
  faBagShopping,
  faDiceD6,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import {
  faReact,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

import {
  htmlIcon,
  cssIcon,
  jsIcon,
  reactIcon,
  awsIcon,
  javaIcon,
  gitIcon,
  githubIcon,
  psqlIcon,
  eslintIcon,
  pyIcon,
  viteIcon,
  nodeIcon,
  raspIcon,
  neoIcon,
  figmaIcon,
  pawsitivePrototype,
  calculator,
  memoryGame,
  avatar,
} from '../assets';

library.add(faX, faBars, faWindowRestore, faBagShopping, faDiceD6);

const media = {
  htmlIcon,
  cssIcon,
  jsIcon,
  reactIcon,
  awsIcon,
  javaIcon,
  gitIcon,
  githubIcon,
  psqlIcon,
  eslintIcon,
  pyIcon,
  viteIcon,
  nodeIcon,
  raspIcon,
  neoIcon,
  figmaIcon,
  avatar,
};

const icons = {
  faBars,
  faX,
  faWindowRestore,
  faBagShopping,
  faDiceD6,
  faReact,
  faGithub,
  faLinkedin,
  faEnvelope,
};

const introduction = {
  text: [
    "Hello there, and welcome! I'm thrilled you're here! :)",

    "I'm Amiya, a 22-year-old recent Virginia Tech graduate from Blacksburg, VA, deeply passionate about the field of Cloud Engineering.",

    "When I'm not immersed in technology, you'll find me powerlifting, trading stocks in my spare time, or embracing the serenity of nature. I also enjoy a good game of chess, just for fun.",

    "I'm always excited to collaborate with individuals and teams who share my enthusiasm for creating remarkable experiences. Thank you for visiting my portfolio - your interest means a lot to me!",
  ],
};


export const navLinks = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'projects',
    title: 'Projects',
  },
  {
    id: 'skills',
    title: 'Skills',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const projects = [
  {
    name: "Main Project",
    description: 'TBD.',
    image: memoryGame,
    source_code_link: 'TBD',
    demo_link: 'TBD',
  },
  {
    name: 'FSA Capstone Project',
    description: 'Collaborative Fullstack Academy Capstone project, showcasing a skillful blend of HTML, CSS, and JavaScript. Expertly hosted and managed on AWS Amplify for robust, scalable performance',
    image: pawsitivePrototype,
    source_code_link: 'https://github.com/AmiyaI/ISCREAMSHOP123',
    demo_link: 'https://main.daou2vh0mfwr.amplifyapp.com/',
  },
  {
    name: 'Personal Portfolio Website',
    description: 'A website hosted on AWS Amplify that includes a brief introduction about me, my projects, the technologies I have worked with, and my experience.',
    image: calculator,
    source_code_link: 'https://github.com/AmiyaI/PersonalPortfolio',
    demo_link: 'TBD',
  },
];

const memoji = {
  image: [avatar],
};

const skills = [
  {
    id: 'html',
    title: 'Linux',
    icon: htmlIcon,
    description:
      'I have an in-depth understanding of the Linux operating system, encompassing its kernel, command-line utilities, and system administration.',
  },
  {
    id: 'css',
    title: 'Jenkins',
    icon: cssIcon,
    description:
    'Proficient in Jenkins with a solid grasp of its core concepts and functionalities. My growing hands-on experience is complemented by a strong appreciation for its role in CI/CD.',
  },
  {
    id: 'javascript',
    title: 'Infrastructure as Code',
    icon: jsIcon,
    description:
    'I am a HashiCorp Terraform Associate certified with substantial experience in employing IaC to deploy efficient and consistent infrastructures in the cloud.',
  },
  {
    id: 'react',
    title: 'Networking & Security',
    icon: reactIcon,
    description:
      'I possess a comprehensive understanding of the OSI model, coupled with in-depth knowledge of cloud security practices.',
  },
  {
    id: 'java',
    title: 'Java',
    icon: javaIcon,
    description:
      'I have foundational knowledge of Java, with hands-on experience in object-oriented programming (OOP) and data structures utilizing BlueJay.',
  },
  {
    id: 'aws',
    title: 'Amazon Web Services',
    icon: awsIcon,
    description:
      'I hold dual AWS certifications as a Cloud Practitioner and Associate Solutions Architect, highlighting my in-depth expertise with the platform. My skills extend beyond certifications, with a strong proficiency in a broad spectrum of AWS services.',
  },
  {
    id: 'figma',
    title: 'Project Management',
    icon: figmaIcon,
    description:
    'As a Virginia Tech graduate in Construction Engineering and Management, I possess exceptional project management skills. My expertise spans estimating, scheduling, team coordination, and more.',
  },
  {
    id: 'git',
    title: 'Git',
    icon: gitIcon,
    description:
    'I am proficient in Git, managing code changes, collaborating with others, and resolving conflicts effectively.',
  },
  {
    id: 'github',
    title: 'GitHub',
    icon: githubIcon,
    description:
      'I am skilled in using GitHub for seamless project collaboration, code sharing, and issue tracking.',
  },
  {
    id: 'psql',
    title: 'Docker',
    icon: psqlIcon,
    description:
      'I have hands-on experience with Docker, understanding its core concepts and practical applications. Additionally, I am familiar with integrating Docker on AWS, leveraging the synergy of containerization and cloud infrastructure for optimized solutions',
  },
  {
    id: 'py',
    title: 'Python',
    icon: pyIcon,
    description:
      'With about 2 years of Python experience, I am adept at coding solutions specific to cloud',
  },
  {
    id: 'node',
    title: 'CI/CD',
    icon: nodeIcon,
    description:
      'I possess a strong proficiency in DevOps, particularly in CI/CD processes. My in-depth experience covers the intricacies of continuous integration and continuous delivery, ensuring streamlined development and robust deployments.',
  },

];

const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

export {
  media,
  introduction,
  projects,
  memoji,
  skills,
  markerSvg,
  icons,
};
