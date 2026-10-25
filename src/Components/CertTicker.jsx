/*
     FileName: CertTicker.jsx
     @version: II
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// The page's one signature move: an edge-to-edge line of the certifications,
// drifting at a constant speed. Scrolling speeds it up and flips it with your
// direction; hovering pauses it.

import { useRef } from "react";
import { certifications } from "../Constants/constants";
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from "../lib/gsap";

const CertTicker = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const loop = gsap.fromTo(".ticker-row", { xPercent: 0 }, { xPercent: -50, duration: 50, ease: "none", repeat: -1 });
        let direction = 1;
        ScrollTrigger.create({
          trigger: scope.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            direction = self.direction;
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 8);
            gsap.to(loop, { timeScale: boost * direction, duration: 0.2, overwrite: true });
            gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.2, ease: "power2.out", overwrite: false });
          },
        });
        const el = scope.current;
        const pause = () => gsap.to(loop, { timeScale: 0, duration: 0.4, overwrite: true });
        const resume = () => gsap.to(loop, { timeScale: direction, duration: 0.6, overwrite: true });
        el.addEventListener("pointerenter", pause);
        el.addEventListener("pointerleave", resume);
        return () => {
          el.removeEventListener("pointerenter", pause);
          el.removeEventListener("pointerleave", resume);
        };
      });
    },
    { scope }
  );

  return (
    <div ref={scope} className="overflow-hidden field-deep py-10 text-[clamp(2.5rem,5.5vw,5.5rem)] leading-none font-extrabold tracking-[-0.04em] lg:py-12">
      <p className="sr-only">Certified in: {certifications.join(", ")}.</p>
      <div className="ticker-row flex w-max whitespace-nowrap" aria-hidden="true">
        {[0, 1].map((copy) => (
          <span key={copy} className="flex shrink-0 items-center">
            {certifications.map((item, i) => (
              <span key={item} className={`pr-[0.6em] ${i % 2 ? "text-orange" : "text-white"}`}>
                {item}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CertTicker;
