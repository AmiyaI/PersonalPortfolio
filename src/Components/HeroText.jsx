/*
     FileName: HeroText.jsx
     @version: IV
     Creation: 10/23/2023
     Last modification: 10/27/2026
*/

// The name, centered like v1 and set a little larger: two lines in the Mario
// face over v1's dark glow, and a role line that scrambles through each title.

import { useRef } from "react";
import { roles } from "../Constants/constants";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";
import { useEnterDelay } from "./motion/PageTransition";

// Clip only top and bottom, so the rise-in stays masked but the Mario
// letters (the A's outer leg especially) can overhang their boxes sideways.
const lineMask = "block [clip-path:inset(0_-0.5em)]";

const HeroText = () => {
  const scope = useRef(null);
  const role = useRef(null);
  const enterDelay = useEnterDelay();

  // The entrance itself is choreographed in Pages/Hero.jsx with the particles;
  // this only cycles the role line once the name has landed.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        let i = 0;
        const cycle = gsap.timeline({ repeat: -1, delay: enterDelay + 2.4 });
        roles.forEach(() => {
          cycle
            .to(role.current, {
              duration: 1.1,
              scrambleText: { text: roles[++i % roles.length], chars: "AMIYA01_/<>", speed: 0.6 },
              ease: "none",
            })
            .to({}, { duration: 2.2 });
        });
      });
    },
    { scope }
  );

  return (
    <div ref={scope} className="hero-title-wrap flex w-full flex-col items-center px-5 text-center sm:px-8">
      {/* Unpositioned on purpose: the particles repel around #repulse-div using
          its offset inside the hero section, the box their canvas fills. */}
      <div id="repulse-div">
        <h1
          aria-label="Who's Amiya?"
          className="noselect cursor-default text-[clamp(3.25rem,8.6vw,9.5rem)] leading-[0.9] text-night"
          // v1's soft dark glow behind the name.
          style={{ fontFamily: "SuperMario", filter: "drop-shadow(0 0 5rem #292d44)" }}
        >
          <span aria-hidden="true" className={lineMask}>
            {"Who's".split("").map((char, index) => (
              <span key={index} className="who-char inline-block">
                <span className="bounce">{char}</span>
              </span>
            ))}
          </span>
          <span aria-hidden="true" className={`${lineMask} whitespace-nowrap pb-[0.06em] text-[1.4em] text-white`}>
            {"Amiya ?".split("").map((char, index) =>
              char === " " ? (
                <span key={index} className="inline-block w-[0.22em]" />
              ) : (
                <span key={index} className="name-char inline-block">
                  <span className="bounce">{char}</span>
                </span>
              )
            )}
          </span>
        </h1>
      </div>
      <p className="hero-line relative mt-8 flex items-center gap-4 text-lg font-semibold tracking-[0.2em] text-night uppercase sm:text-2xl">
        <span className="sr-only">Amiya Islam: {roles.join(", ")}</span>
        <span aria-hidden="true" className="h-px w-8 bg-current sm:w-12" />
        <span ref={role} aria-hidden="true" className="min-w-[16ch] whitespace-nowrap">
          {roles[0]}
        </span>
        <span aria-hidden="true" className="h-px w-8 bg-current sm:w-12" />
      </p>
    </div>
  );
};

export default HeroText;
