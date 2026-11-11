/*
     FileName: Skills.jsx
     @version: IV
     Creation: 10/23/2023
     Last modification: 10/27/2026
*/

// A grid of logo cards on a teal field, small enough to take in at a glance.
// The cards pop in from the middle of the grid outward; hovering one lifts it
// and gives its logo a little tilt. The certifications drift past underneath.

import { useRef } from "react";
import SectionHeader from "../Components/SectionHeader";
import CertTicker from "../Components/CertTicker";
import { skills } from "../Constants/constants";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";

// Skills without a brand logo get a simple drawn mark instead.
const DRAWN = {
  network: (
    <path d="M12 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm-6.5 11a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm13 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm-7.4-5.6 1.8 0-.1 2.3 4.9 3.3-1 1.5-4.7-3.1-4.7 3.1-1-1.5 4.9-3.3-.1-2.3Z" />
  ),
  harness: (
    <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Zm0 2.3L5.5 8.2v7.6l6.5 3.4 6.5-3.4V8.2L12 4.8Zm0 3.7a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm0 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
  ),
  terminal: (
    <path d="M3.5 4.5h17a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1Zm1 2v11h15v-11h-15Zm2.3 2.4 3.6 3.1-3.6 3.1-1.3-1.5 1.9-1.6-1.9-1.6 1.3-1.5Zm4.7 4.6h5v2h-5v-2Z" />
  ),
  database: (
    <path d="M12 2.5c4.4 0 8 1.4 8 3.25v12.5c0 1.85-3.6 3.25-8 3.25s-8-1.4-8-3.25V5.75C4 3.9 7.6 2.5 12 2.5Zm6 6.1c-1.5.8-3.6 1.15-6 1.15s-4.5-.35-6-1.15v3.15c0 .55 2.3 1.5 6 1.5s6-.95 6-1.5V8.6Zm0 5.5c-1.5.8-3.6 1.15-6 1.15s-4.5-.35-6-1.15v4.15c0 .55 2.3 1.5 6 1.5s6-.95 6-1.5V14.1ZM12 4.5c-3.7 0-6 .95-6 1.25S8.3 7 12 7s6-.95 6-1.25S15.7 4.5 12 4.5Z" />
  ),
  plug: (
    <path d="M8 2.5h2v4h4v-4h2v4h1.5a1 1 0 0 1 1 1v3.5a6 6 0 0 1-5.5 6v4.5h-2V17a6 6 0 0 1-5.5-6V7.5a1 1 0 0 1 1-1H8v-4Zm-1.5 6V11a4 4 0 0 0 8 0V8.5h-8Z" />
  ),
  clock: (
    <path d="M12 2.5a9.5 9.5 0 1 1 0 19 9.5 9.5 0 0 1 0-19Zm0 2a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Zm1 2.5v4.6l3.4 2.2-1.1 1.7L11 12.7V7h2Z" />
  ),
  sparkle: (
    <path d="M12 2.5c.5 4.6 2.4 6.5 7 7-4.6.5-6.5 2.4-7 7-.5-4.6-2.4-6.5-7-7 4.6-.5 6.5-2.4 7-7Zm6.5 11c.25 2 1 2.75 3 3-2 .25-2.75 1-3 3-.25-2-1-2.75-3-3 2-.25 2.75-1 3-3Z" />
  ),
  shield: (
    <path d="M12 2.5 4.5 5.5v6c0 4.6 3.1 8.6 7.5 10 4.4-1.4 7.5-5.4 7.5-10v-6L12 2.5Zm-1.2 13.4-3.4-3.4 1.4-1.4 2 2 4.6-4.6 1.4 1.4-6 6Z" />
  ),
};

const Logo = ({ icon, name }) =>
  DRAWN[icon] ? (
    <svg viewBox="0 0 24 24" className="h-9 w-9 fill-accent" aria-hidden="true">
      {DRAWN[icon]}
    </svg>
  ) : (
    <img src={icon} alt="" aria-hidden="true" className="h-9 w-9 object-contain" loading="lazy" title={name} />
  );

const Skills = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".skill-card", {
          y: 24,
          scale: 0.92,
          opacity: 0,
          duration: 0.7,
          ease: "back.out(1.6)",
          stagger: { each: 0.04, from: "center", grid: "auto" },
          scrollTrigger: { trigger: ".skill-grid", start: "top 85%", once: true },
        });
      });
    },
    { scope }
  );

  return (
    <section ref={scope} id="skills" className="field-teal w-full px-5 py-12 text-night sm:px-8 lg:py-16">
      <SectionHeader kicker="What I do" title="Skills" layout="center" className="mb-8 lg:mb-10">
        What I reach for most, and the certification or track record behind each one.
      </SectionHeader>
      {/* Flex rather than grid so a short last row sits centred. */}
      <ul className="skill-grid mx-auto flex max-w-6xl flex-wrap justify-center gap-2 sm:gap-3">
        {skills.map((skill) => (
          <li
            key={skill.name}
            className="skill-card group flex w-[calc((100%-1rem)/3)] flex-col items-center gap-2 rounded-2xl sm:w-[calc((100%-2.25rem)/4)] lg:w-[calc((100%-4.5rem)/7)] bg-white/70 px-2 py-4 text-center sm:px-3 sm:py-5 shadow-[0_1px_0_rgba(20,13,38,0.04)] transition-[translate,box-shadow,background-color] duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:bg-white hover:shadow-[0_12px_30px_-12px_rgba(45,33,82,0.35)]"
          >
            <span className="transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-rotate-6 group-hover:scale-110">
              <Logo icon={skill.icon} name={skill.name} />
            </span>
            <span className="text-compact leading-tight font-extrabold">{skill.name}</span>
            <span className="text-small leading-snug text-muted">{skill.fact}</span>
          </li>
        ))}
      </ul>
      <CertTicker />
    </section>
  );
};

export default Skills;
