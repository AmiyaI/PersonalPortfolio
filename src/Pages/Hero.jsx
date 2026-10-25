/*
     FileName: Hero.jsx
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { useRef } from "react";
import HeroText from "../Components/HeroText";
import HeroParticles from "../Components/Particles/HeroParticles";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";

const Hero = () => {
  const scope = useRef(null);

  // Scrolling away sinks the name and lets the particles drift up past it.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: true },
          })
          .to(".hero-title-wrap", { yPercent: 18, opacity: 0.15, ease: "none" })
          .to(".hero-particles-wrap", { yPercent: -12, ease: "none" }, 0);
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      id="hero"
      aria-label="Introduction"
      className="relative isolate flex h-[100svh] min-h-[640px] w-full flex-col justify-end overflow-hidden bg-bg pt-24"
    >
      <div className="hero-particles-wrap absolute inset-0 -z-10">
        <HeroParticles />
      </div>
      <HeroText />
    </section>
  );
};

export default Hero;
