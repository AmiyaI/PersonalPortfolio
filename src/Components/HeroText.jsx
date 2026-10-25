/*
     FileName: HeroText.jsx
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

// The name is the monument: two lines in the Mario face, the second wide
// enough to span the screen. The "?" doubles as the particles' repel target,
// which is why this wrapper stays unpositioned: the engine reads the target's
// offset from the hero section, the same box the particle canvas fills.

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";
import { TransitionLink } from "./motion/PageTransition";
import Magnetic from "./motion/Magnetic";

const HeroText = () => {
  const scope = useRef(null);

  // The name rises into its masked lines on load and settles within ~0.7s.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline()
          .from(".name-char", { yPercent: 110, duration: 0.55, ease: "expo.out", stagger: 0.025 })
          .from(".who-char", { yPercent: -110, rotate: () => gsap.utils.random(-20, 20), duration: 0.6, ease: "back.out(2.2)", stagger: 0.03 }, "<")
          .from(".hero-line", { y: 24, duration: 0.6, ease: "power3.out", stagger: 0.06 }, "<0.1");
      });
    },
    { scope }
  );

  return (
    <div ref={scope} className="hero-title-wrap flex w-full flex-col px-5 pb-8 sm:px-8 sm:pb-10">
      <h1 aria-label="Who's Amiya?" className="noselect cursor-default text-[17.5vw] leading-[0.86] text-ink sm:text-[18.6vw]" style={{ fontFamily: "SuperMario" }}>
        <span aria-hidden="true" className="block overflow-hidden text-[0.74em] sm:text-[0.48em]">
          {"Who's".split("").map((char, index) => (
            <span key={index} className="who-char inline-block">
              <span className="bounce">{char}</span>
            </span>
          ))}
        </span>
        <span aria-hidden="true" className="block overflow-hidden whitespace-nowrap pb-[0.06em] text-accent">
          {"Amiya ?".split("").map((char, index) =>
            char === " " ? (
              <span key={index} className="inline-block w-[0.22em]" />
            ) : (
              <span key={index} id={char === "?" ? "hero-q" : undefined} className="name-char inline-block">
                <span className="bounce">{char}</span>
              </span>
            )
          )}
        </span>
      </h1>
      <div className="mt-6 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <p className="hero-line max-w-[34ch] text-lead leading-snug text-ink">
          Amiya Islam, founding engineer building multi-agent AI platforms and the cloud they run on.
        </p>
        <Magnetic strength={0.3} className="hero-line">
          <TransitionLink
            to="/#contact"
            label="Amiya"
            className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-body font-extrabold text-bg transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            Let's talk <span aria-hidden="true">→</span>
          </TransitionLink>
        </Magnetic>
      </div>
    </div>
  );
};

export default HeroText;
