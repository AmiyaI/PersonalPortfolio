/*
     FileName: ProjectCards.jsx
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faComments, faBullhorn, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { projects } from "../Constants/constants";
import Tilt from "./elements/Tilt";

const fadeIn = (delay) => ({
  hidden: { y: 100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.25, delay, duration: 0.75 },
  },
});

// Projects without a screenshot get a drawn cover instead.
const COVERS = {
  agents: { icon: faRobot, className: "cover-agents" },
  solo: { icon: faComments, className: "cover-solo" },
  marketing: { icon: faBullhorn, className: "cover-marketing" },
};

const Cover = ({ project }) => {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt=""
        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
      />
    );
  }
  const cover = COVERS[project.cover];
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden ${cover.className}`}>
      <FontAwesomeIcon
        icon={cover.icon}
        className="text-6xl text-grayscale-950/70 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-125 group-hover:-rotate-6"
      />
    </div>
  );
};

const ProjectCard = ({ index, project }) => {
  const { name, description, tags, source_code_link, demo_link } = project;
  return (
    <motion.li
      variants={fadeIn((index % 3) * 0.15)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="list-none"
    >
      <Tilt
        options={{ max: 18, scale: 1.02, speed: 450 }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary-400/25 bg-grayscale-950/60 text-grayscale-50 shadow-2xl"
      >
        <div className="relative h-[200px] overflow-hidden" data-cursor={demo_link ? "View" : undefined}>
          <Cover project={project} />
          <span
            className="absolute top-3 left-4 text-5xl leading-none text-grayscale-50/80 mix-blend-difference"
            style={{ fontFamily: "Morganite Black" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5" style={{ fontFamily: "Poppins, sans-serif" }}>
          <h3 className="text-[20px] font-bold">{name}</h3>
          <p className="mt-2 flex-1 text-[14px] leading-[20px] text-grayscale-100/80">{description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-primary-400/15 px-2.5 py-1 text-xs text-primary-400">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-3">
            {demo_link && (
              <a
                className="inline-flex items-center gap-2 rounded-full bg-primary-400 px-4 py-2 text-sm font-semibold text-grayscale-950 transition-transform hover:-translate-y-0.5"
                href={demo_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                See it live <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
              </a>
            )}
            {source_code_link && (
              <a
                className="inline-flex items-center gap-2 rounded-full border border-primary-400/40 px-4 py-2 text-sm text-primary-400 transition-colors hover:bg-primary-400/10"
                href={source_code_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} /> Code
              </a>
            )}
          </div>
        </div>
      </Tilt>
    </motion.li>
  );
};

const ProjectCards = () => {
  return (
    <ul className="grid grid-cols-1 gap-7 px-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard key={project.name} index={index} project={project} />
      ))}
    </ul>
  );
};

export default ProjectCards;
