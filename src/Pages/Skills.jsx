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

// The two skills without a brand logo get a simple drawn mark instead.
const DRAWN = {
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
      <ul className="skill-grid mx-auto grid max-w-6xl grid-cols-3 gap-2 sm:gap-3 md:grid-cols-4 lg:grid-cols-7">
        {skills.map((skill) => (
          <li
            key={skill.name}
            className="skill-card group flex flex-col items-center gap-2 rounded-2xl bg-white/70 px-2 py-4 text-center sm:px-3 sm:py-5 shadow-[0_1px_0_rgba(20,13,38,0.04)] transition-[translate,box-shadow,background-color] duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:bg-white hover:shadow-[0_12px_30px_-12px_rgba(45,33,82,0.35)]"
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
