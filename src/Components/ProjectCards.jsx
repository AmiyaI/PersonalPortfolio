/*
     FileName: ProjectCards.jsx
     @version: IV
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { motion } from "motion/react";
import { projects } from "../Constants/constants";
import Tilt from "./elements/Tilt";
import { TransitionLink } from "./motion/PageTransition";

// Internal paths ("/studio") get a page transition; everything else opens in a new tab.
const SmartLink = ({ href, children, ...rest }) =>
  href.startsWith("/") ? (
    <TransitionLink to={href} label={href === "/studio" ? "Studio" : "Amiya"} {...rest}>
      {children}
    </TransitionLink>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );

const rise = (delay) => ({
  hidden: { y: 60 },
  show: {
    y: 0,
    transition: { type: "spring", bounce: 0.25, delay, duration: 0.75 },
  },
});

const ProjectCard = ({ index, project }) => {
  const { name, description, tags, image, imageAlt, source_code_link, demo_link, demo_label } = project;
  return (
    <motion.li
      variants={rise((index % 2) * 0.09)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="flex list-none flex-col"
    >
      <Tilt options={{ max: 10, scale: 1.01, speed: 450 }} className="group overflow-hidden bg-surface">
        <SmartLink
          href={demo_link ?? source_code_link ?? "#projects"}
          data-cursor="View"
          aria-label={`${name}: open`}
          className="block aspect-[16/10] overflow-hidden"
        >
          <img
            src={image}
            alt={imageAlt ?? name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
          />
        </SmartLink>
      </Tilt>
      <div className="mt-4 flex flex-col gap-2.5">
        <h3 className="text-[clamp(1.5rem,1.2rem+0.8vw,2rem)] leading-none font-extrabold tracking-[-0.03em] text-ink">
          {name}
        </h3>
        <p className="max-w-[52ch] text-[1rem] leading-relaxed text-ink">{description}</p>
        <p className="text-small text-muted">{tags.join(", ")}</p>
        <div className="mt-1 flex items-center gap-6 text-body font-medium">
          {demo_link && (
            <SmartLink className="nav-link pb-0.5 text-accent" href={demo_link}>
              {demo_label ?? "See it live"} →
            </SmartLink>
          )}
          {source_code_link && (
            <a className="nav-link pb-0.5 text-ink" href={source_code_link} target="_blank" rel="noopener noreferrer">
              Read the code
            </a>
          )}
        </div>
      </div>
    </motion.li>
  );
};

const ProjectCards = () => {
  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard key={project.name} index={index} project={project} />
      ))}
    </ul>
  );
};

export default ProjectCards;
