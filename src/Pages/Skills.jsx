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
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from "../lib/gsap";

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

      // The big words lean a few degrees into fast scrolling, then settle.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const words = gsap.utils.toArray(".skill-word", scope.current);
        const lean = gsap.quickTo(words, "skewX", { duration: 0.5, ease: "power3.out" });
        let settle = 0;
        ScrollTrigger.create({
          trigger: scope.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            lean(gsap.utils.clamp(-4, 4, -self.getVelocity() / 450));
            clearTimeout(settle);
            settle = setTimeout(() => lean(0), 120);
          },
        });
        return () => clearTimeout(settle);
      });
    },
    { scope }
  );

  return (
    <section ref={scope} id="skills" className="w-full">
      <CertTicker />
      <div className="field-teal px-5 py-16 text-night sm:px-8 lg:py-20">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
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
              <span className="skill-word block text-head leading-[1] font-extrabold tracking-[-0.045em] transition-[color,translate] duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-3 group-hover:text-indigo">
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
