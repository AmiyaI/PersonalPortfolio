/*
     FileName: Hero.jsx
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { lazy, Suspense, useRef } from "react";
import HeroText from "../Components/HeroText";
// The particle engine is a large dependency; load it after the title paints.
const HeroParticles = lazy(() => import("../Components/Particles/HeroParticles"));
import { gsap, useGSAP, MOTION_OK, EASE } from "../lib/gsap";
import { useEnterDelay } from "../Components/motion/PageTransition";
import { scrollToTarget, useLenis } from "../Components/motion/SmoothScroll";

const Hero = () => {
  const scope = useRef(null);
  const enterDelay = useEnterDelay();
  const lenis = useLenis();

  // One entrance timeline: "Who's", then the name, then the sentence and
  // button, while the particles fade up behind. Waits briefly for the Mario
  // face so letters don't change typeface mid-rise.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ paused: true, delay: enterDelay });
        tl.from(".who-char", { yPercent: 110, duration: 0.8, ease: EASE.out, stagger: 0.025 })
          .from(".name-char", { yPercent: 120, duration: 0.9, ease: EASE.out, stagger: 0.03 }, 0.12)
          .from(".hero-line", { y: 20, opacity: 0, duration: 0.7, ease: EASE.soft, stagger: 0.08 }, "-=0.45")
          .from(".hero-particles-wrap", { opacity: 0, duration: 1.2, ease: "power2.out" }, 0.2);
        const fontReady = Promise.race([
          document.fonts.load("1em SuperMario").catch(() => {}),
          new Promise((resolve) => setTimeout(resolve, 400)),
        ]);
        fontReady.then(() => tl.play());
      });

      // Scrolling away sinks the name and lets the particles drift up past it.
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: true },
          })
          .to(".hero-title-wrap", { yPercent: 18, scale: 0.96, opacity: 0, ease: "none" })
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
      className="relative isolate flex h-[100svh] min-h-[640px] w-full flex-col justify-center overflow-hidden hero-purple pt-20"
    >
      <div className="hero-particles-wrap absolute inset-0 -z-10">
        <Suspense fallback={null}>
          <HeroParticles />
        </Suspense>
      </div>
      <HeroText />
      {/* v1's scroll pill: a dot that keeps dropping toward the next section. */}
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          scrollToTarget(lenis, "#about");
        }}
        aria-label="Scroll to About"
        data-cursor="Scroll"
        className="hero-line absolute bottom-8 left-1/2 flex h-16 w-9 -translate-x-1/2 items-start justify-center rounded-3xl border-4 border-white/85 p-2 sm:bottom-10"
      >
        <span className="hero-scroll-dot h-3 w-3 rounded-full bg-white/85" />
      </a>
    </section>
  );
};

export default Hero;
