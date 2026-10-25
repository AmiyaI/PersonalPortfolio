/*
     FileName: Preloader.jsx
     @version: I
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// Replaces v1's spinner-only loader. The page mounts underneath while images
// decode; meanwhile v1's ring spins around an "A", a counter climbs, and the
// rest of the name pops out. Then the curtain splits to reveal the hero.
// Repeat visits in the same tab get a quick fade instead.

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

const IntroContext = createContext(true);

export const useIntroDone = () => useContext(IntroContext);

const MAX_WAIT_MS = 3000;
const SEEN_KEY = "amiya-intro-seen";

const seenThisSession = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
};

const Preloader = ({ images, children }) => {
  const [done, setDone] = useState(false);
  const root = useRef(null);
  const count = useRef(null);
  const letters = useRef([]);
  const ring = useRef(null);
  const top = useRef(null);
  const bottom = useRef(null);

  useEffect(() => {
    const quick = seenThisSession() || prefersReducedMotion();
    const progress = { value: 0 };
    let loaded = 0;
    let finished = false;
    let cancelled = false;
    const total = images.length + 1;
    document.documentElement.style.overflow = "hidden";

    const render = () => {
      if (count.current) count.current.textContent = String(Math.round(progress.value)).padStart(3, "0");
    };
    const bump = () => {
      loaded += 1;
      gsap.to(progress, { value: (loaded / total) * 100, duration: 0.6, ease: "power2.out", onUpdate: render });
    };

    const decodes = images.map((src) => {
      const img = new Image();
      img.src = src;
      return img.decode().catch(() => {}).then(bump);
    });
    const fonts = document.fonts.ready.then(bump);

    const intro = gsap.timeline();
    if (!quick) {
      intro
        .from(ring.current, { scale: 0, rotate: -180, duration: 0.8, ease: "back.out(1.6)" })
        .from(letters.current[0], { scale: 0, duration: 0.5, ease: "back.out(3)" }, "-=0.4")
        .from(
          letters.current.slice(1),
          { yPercent: 140, rotate: () => gsap.utils.random(-25, 25), opacity: 0, stagger: 0.09, duration: 0.6, ease: "back.out(2.4)" },
          "+=0.1"
        );
    }

    const finish = () => {
      if (finished || cancelled) return;
      finished = true;
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        // Private mode: the full intro just plays again next time.
      }
      const release = () => {
        document.documentElement.style.overflow = "";
        setDone(true);
      };
      if (quick) {
        gsap.to(root.current, { opacity: 0, duration: 0.4, delay: 0.1, onStart: release, onComplete: () => root.current && (root.current.style.display = "none") });
        return;
      }
      gsap
        .timeline({ onComplete: () => root.current && (root.current.style.display = "none") })
        .to(progress, { value: 100, duration: 0.4, ease: "power2.out", onUpdate: render })
        .to(letters.current, { scaleY: 0.6, scaleX: 1.25, yPercent: 15, duration: 0.18, ease: "power2.in", stagger: 0.02 })
        .to(letters.current, { scaleY: 1.4, scaleX: 0.8, yPercent: -260, opacity: 0, duration: 0.45, ease: "power3.in", stagger: 0.03 })
        .to(ring.current, { scale: 0, opacity: 0, duration: 0.35, ease: "back.in(2)" }, "<")
        .to(count.current, { yPercent: 100, opacity: 0, duration: 0.3 }, "<")
        .add(release, "-=0.05")
        .to(top.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" })
        .to(bottom.current, { yPercent: 100, duration: 0.9, ease: "power4.inOut" }, "<");
    };

    const minimum = new Promise((r) => setTimeout(r, quick ? 150 : 1600));
    Promise.all([Promise.all(decodes), fonts, minimum]).then(finish);
    const cap = setTimeout(finish, MAX_WAIT_MS + (quick ? 0 : 1000));

    return () => {
      cancelled = true;
      clearTimeout(cap);
      intro.kill();
      document.documentElement.style.overflow = "";
    };
  }, [images]);

  return (
    <IntroContext.Provider value={done}>
      {children}
      <div ref={root} className="fixed inset-0 z-[160]" aria-hidden={done} role="status">
        <span className="sr-only">Loading</span>
        <div ref={top} className="absolute inset-x-0 top-0 h-1/2 bg-grayscale-950" />
        <div ref={bottom} className="absolute inset-x-0 bottom-0 h-1/2 bg-grayscale-950" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center" style={{ fontFamily: "SuperMario" }}>
            <span className="relative flex h-[100px] w-[100px] items-center justify-center">
              <span ref={ring} className="loader absolute inset-0" />
              <span ref={(el) => (letters.current[0] = el)} className="inline-block text-5xl text-primary-400">
                A
              </span>
            </span>
            {"MIYA".split("").map((char, i) => (
              <span
                key={char + i}
                ref={(el) => (letters.current[i + 1] = el)}
                className="inline-block text-5xl text-grayscale-50 sm:text-6xl"
              >
                {char}
              </span>
            ))}
          </div>
        </div>
        <span
          ref={count}
          className="absolute right-6 bottom-4 text-[18vw] leading-none text-primary-400/20 sm:text-[12vw]"
          style={{ fontFamily: "Morganite Black" }}
        >
          000
        </span>
      </div>
    </IntroContext.Provider>
  );
};

export default Preloader;
