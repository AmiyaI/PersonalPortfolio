/*
     FileName: HeroText.jsx
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

// The name, centered like v1 and set a little larger: two lines in the Mario
// face, with one sentence and one action under it.

import { useRef } from "react";
import { TransitionLink } from "./motion/PageTransition";
import Magnetic from "./motion/Magnetic";

const HeroText = () => {
  const scope = useRef(null);

  // The entrance itself is choreographed in Pages/Hero.jsx with the particles.

  return (
    <div ref={scope} className="hero-title-wrap flex w-full flex-col items-center px-5 text-center sm:px-8">
      {/* Unpositioned on purpose: the particles repel around #repulse-div using
          its offset inside the hero section, the box their canvas fills. */}
      <div id="repulse-div">
        <h1
          aria-label="Who's Amiya?"
          className="noselect cursor-default text-[clamp(3.25rem,8.6vw,9.5rem)] leading-[0.9] text-night"
          style={{ fontFamily: "SuperMario" }}
        >
          <span aria-hidden="true" className="block overflow-hidden">
            {"Who's".split("").map((char, index) => (
              <span key={index} className="who-char inline-block">
                <span className="bounce">{char}</span>
              </span>
            ))}
          </span>
          <span aria-hidden="true" className="block overflow-hidden whitespace-nowrap pb-[0.06em] text-[1.4em] text-white">
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
      {/* A soft halo in the hero's own purple keeps the drifting icons from crossing the words. */}
      <p className="hero-line relative mt-6 max-w-[40ch] text-lead leading-snug font-medium text-night before:absolute before:-inset-x-16 before:-inset-y-8 before:-z-10 before:bg-[radial-gradient(closest-side,#a674c4_55%,transparent)] before:content-['']">
        Amiya Islam, founding engineer building multi-agent AI platforms and the cloud they run on.
      </p>
      <Magnetic strength={0.3} className="hero-line mt-8">
        <TransitionLink
          to="/#contact"
          label="Amiya"
          className="inline-flex items-center gap-3 rounded-full bg-night px-7 py-4 text-body font-extrabold text-white transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
        >
          Let's talk <span aria-hidden="true">→</span>
        </TransitionLink>
      </Magnetic>
    </div>
  );
};

export default HeroText;
