/*
     FileName: Hero.jsx
     @version: II
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { useRef } from "react";
import { LazyMotion, domAnimation } from "motion/react";
import HeroText from "../Components/HeroText";
import HeroParticles from "../Components/Particles/HeroParticles";
import HeroScroller from "../Components/elements/HeroScroller";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";

const Hero = () => {
  const scope = useRef(null);

  // Scrolling away pushes the title back into the particle field.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: true },
          })
          .to(".hero-title-wrap", { scale: 0.82, yPercent: 30, opacity: 0, filter: "blur(6px)", ease: "none" })
          .to(".hero-particles-wrap", { yPercent: 25, ease: "none" }, 0)
          .to("#scroller", { opacity: 0, ease: "none" }, 0);
      });
    },
    { scope }
  );

  return (
    <div ref={scope} id="hero" className="w-full flex justify-center overflow-hidden-web relative">
    <LazyMotion features={domAnimation} strict>
      <div
        className="relative w-full flex justify-center items-center h-screen min-h-[800px]"
      >
        <div className="hero-title-wrap absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <HeroText />
        </div>
        <div className="hero-particles-wrap w-full">
          <HeroParticles />
        </div>
      </div>
      <HeroScroller />
    </LazyMotion>
    </div>
  );
};

export default Hero;
