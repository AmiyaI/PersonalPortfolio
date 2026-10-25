/*
     FileName: HeroText.jsx
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

// The name, centered like v1 and set a little larger: two lines in the Mario
// face, with one sentence and one action under it.

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
    <div ref={scope} className="hero-title-wrap flex w-full flex-col items-center px-5 text-center sm:px-8">
      {/* Unpositioned on purpose: the particles repel around #repulse-div using
          its offset inside the hero section, the box their canvas fills. */}
      <div id="repulse-div">
        <h1
          aria-label="Who's Amiya?"
          className="noselect cursor-default text-[clamp(3.25rem,8.6vw,9.5rem)] leading-[0.9] text-ink"
          style={{ fontFamily: "SuperMario" }}
        >
          <span aria-hidden="true" className="block overflow-hidden">
            {"Who's".split("").map((char, index) => (
              <span key={index} className="who-char inline-block">
                <span className="bounce">{char}</span>
              </span>
            ))}
          </span>
          <span aria-hidden="true" className="block overflow-hidden whitespace-nowrap pb-[0.06em] text-[1.4em] text-accent">
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
      <p className="hero-line mt-6 max-w-[40ch] text-lead leading-snug text-ink">
        Amiya Islam, founding engineer building multi-agent AI platforms and the cloud they run on.
      </p>
      <Magnetic strength={0.3} className="hero-line mt-8">
        <TransitionLink
          to="/#contact"
          label="Amiya"
          className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-body font-extrabold text-night transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
        >
          Let's talk <span aria-hidden="true">→</span>
        </TransitionLink>
      </Magnetic>
    </div>
  );
};

export default HeroText;
