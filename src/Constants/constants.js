/*
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
    name: "Weather Data Processing and Analytics Platform",
    description: 'AWS-based ETL pipeline for weather data analysis, leveraging Python for data processing, Docker for containerization, Jenkins for CI/CD, and Terraform for efficient infrastructure management, all while ensuring top-notch security and performance. Currently working on adding a user-friendly interface',
    image: memoryGame,
    source_code_link: 'https://github.com/AmiyaI/WeatherApp',
    demo_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    name: 'Fullstack Academy Capstone Project',
    description: 'Simple Collaborative Capstone project, showcasing a skillful blend of HTML, CSS, and JavaScript. Expertly hosted and managed on AWS Amplify for robust, scalable performance',
    image: pawsitivePrototype,
    source_code_link: 'https://github.com/AmiyaI/ISCREAMSHOP123',
    demo_link: 'https://main.daou2vh0mfwr.amplifyapp.com/',
  },
  {
    name: 'Personal Portfolio Website',
    description: 'A website hosted on AWS Amplify that includes a brief introduction about me, my projects, the technologies I have worked with, and my experience.',
    image: calculator,
    source_code_link: 'https://github.com/AmiyaI/PersonalPortfolio',
    demo_link: 'https://www.amiyaislam.com',
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
      '2x AWS Certified with proficiency in a wide range of AWS services, expertly navigating cloud solutions for scalable and reliable infrastructure.',
  },
  {
    id: 'figma',
    title: 'Project Management',
    icon: figmaIcon,
    description:
    'As a Virginia Tech graduate in Construction Engineering and Management, I excel in project management with skills in estimating, scheduling, team coordination, and more.',
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
      'Experienced with Docker, adept at its essential concepts and practical applications, including integration with AWS for enhanced containerized solutions.',
  },
  {
    id: 'py',
    title: 'Python',
    icon: pyIcon,
    description:
      'Proficient in Python, I specialize in developing cloud-specific coding solutions, leveraging the language\'s versatility and power.',
  },
  {
    id: 'node',
    title: 'CI/CD',
    icon: nodeIcon,
    description:
      'Skilled in CI/CD methodologies, I excel in optimizing development pipelines for efficiency and reliability in a DevOps framework.',
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
