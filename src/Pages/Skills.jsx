/*
     FileName: Skills.jsx
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

// A poster on a teal field: one giant word per line, its one fact at the
// right margin on the same baseline. Hovering a line turns it indigo.

import { useRef } from "react";
import SectionTitle from "../Components/SectionTitle";
import CertTicker from "../Components/CertTicker";
import { skillLines } from "../Constants/constants";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";

const Skills = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray(".skill-line").forEach((line) => {
          gsap.from(line.querySelector(".skill-word"), {
            yPercent: 100,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: line, start: "top 92%", once: true },
          });
        });
      });
    },
    { scope }
  );

  return (
    <section ref={scope} id="skills" className="w-full">
      <CertTicker />
      <div className="bg-teal px-5 py-24 text-bg sm:px-8 lg:py-28">
        <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle title="Skills" />
          <p className="max-w-[40ch] text-body">
            What I reach for most, and the certification or track record behind each one.
          </p>
        </div>
        <ul>
          {skillLines.map((line) => (
            <li
              key={line.word}
              className="skill-line group flex flex-col justify-between gap-1 overflow-hidden pb-4 sm:flex-row sm:items-baseline sm:gap-6 sm:pb-0"
            >
              <span className="skill-word block text-[clamp(3rem,10vw,9.5rem)] leading-[0.92] font-extrabold tracking-[-0.045em] transition-colors duration-300 group-hover:text-indigo">
                {line.word}
              </span>
              <span className="text-lead font-medium tabular-nums sm:text-right">{line.fact}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Skills;
