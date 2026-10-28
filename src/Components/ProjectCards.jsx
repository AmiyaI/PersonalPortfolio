/*
     FileName: ProjectCards.jsx
     @version: IV
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { useRef } from "react";
import { projects } from "../Constants/constants";
import Tilt from "./elements/Tilt";
import { gsap, useGSAP, MOTION_OK, EASE, DUR, START } from "../lib/gsap";
import { TransitionLink } from "./motion/PageTransition";

// Internal paths ("/studio") get a page transition; everything else opens in a new tab.
const SmartLink = ({ href, children, ...rest }) =>
  href.startsWith("/") ? (
    <TransitionLink to={href} label={href.startsWith("/studio") ? "Studio" : "Amiya"} {...rest}>
      {children}
    </TransitionLink>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );

const ProjectCard = ({ project }) => {
  const { name, description, tags, image, imageAlt, source_code_link, demo_link, demo_label } = project;
  const href = demo_link ?? source_code_link;
  const img = (
    <img
      src={image}
      alt={imageAlt ?? name}
      loading="lazy"
      className="project-img h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
    />
  );
  return (
    <li className="project-card flex list-none flex-col">
      <Tilt options={{ max: 6, scale: 1, speed: 600 }} className="group overflow-hidden bg-surface">
        {/* The text links below are the accessible ones; the image is a mouse shortcut. */}
        {href ? (
          <SmartLink
            href={href}
            data-cursor="View"
            aria-hidden="true"
            tabIndex={-1}
            className="project-media block aspect-[16/7] overflow-hidden"
          >
            {img}
          </SmartLink>
        ) : (
          <div className="project-media aspect-[16/7] overflow-hidden">{img}</div>
        )}
      </Tilt>
      <div className="mt-3 flex flex-1 flex-col gap-2">
        <h3 className="text-lead leading-none font-extrabold tracking-[-0.02em] text-ink">{name}</h3>
        <p className="max-w-[52ch] text-small leading-relaxed text-ink">{description}</p>
        <p className="text-small text-muted">{tags.join(", ")}</p>
        <div className="mt-auto flex items-center gap-5 pt-1 text-small font-semibold text-accent">
          {demo_link && (
            <SmartLink className="nav-link pb-0.5" href={demo_link}>
              {demo_label ?? "See it live"} →
            </SmartLink>
          )}
          {source_code_link && (
            <SmartLink className="nav-link pb-0.5" href={source_code_link}>
              Read the code ↗
            </SmartLink>
          )}
        </div>
      </div>
    </li>
  );
};

const ProjectCards = () => {
  const scope = useRef(null);

  // Each image unveils top-down while it settles from a slight zoom,
  // staggered across the three columns.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray(".project-card", scope.current).forEach((card, i) => {
          const delay = (i % 3) * 0.1;
          const trigger = { trigger: card, start: START.item, once: true };
          gsap.fromTo(
            card.querySelector(".project-media"),
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: EASE.inOut, delay, scrollTrigger: trigger }
          );
          gsap.from(card.querySelector(".project-img"), {
            scale: 1.18,
            duration: 1.4,
            ease: EASE.out,
            delay,
            clearProps: "transform",
            scrollTrigger: trigger,
          });
          gsap.from(card.querySelectorAll("h3, p, .nav-link"), {
            y: 16,
            duration: DUR.md,
            ease: EASE.soft,
            stagger: 0.05,
            delay: delay + 0.2,
            scrollTrigger: trigger,
          });
        });
      });
    },
    { scope }
  );

  return (
    <ul ref={scope} className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 md:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </ul>
  );
};

export default ProjectCards;
