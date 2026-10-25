/*
     FileName: SmoothScroll.jsx
     @version: I
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and Lenis
// agree on every frame. Skipped entirely for reduced-motion visitors.

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../../lib/gsap";

const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

// Scroll to an element, a selector or a y position, smoothly when Lenis runs.
export const scrollToTarget = (lenis, target, options = {}) => {
  if (lenis) {
    lenis.scrollTo(target, { offset: 0, duration: 1.4, ...options });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else el?.scrollIntoView({ behavior: "smooth" });
};

const SmoothScroll = ({ children }) => {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1, autoRaf: false });
    const tick = (time) => instance.raf(time * 1000);

    instance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add("lenis");
    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      document.documentElement.classList.remove("lenis");
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
};

export default SmoothScroll;
