/*
     FileName: CertTicker.jsx
     @version: II
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// A quiet line of the certifications under the skills grid, drifting slowly.
// Scrolling nudges it along with your direction; hovering pauses it.

import { useRef } from "react";
import { certifications } from "../Constants/constants";
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from "../lib/gsap";

const CertTicker = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const loop = gsap.fromTo(".ticker-row", { xPercent: 0 }, { xPercent: -50, duration: 45, ease: "none", repeat: -1 });
        let direction = 1;
        let hovering = false;
        ScrollTrigger.create({
          trigger: scope.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            direction = self.direction;
            if (hovering) return;
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 900, 1.5);
            gsap.to(loop, { timeScale: boost * direction, duration: 0.2, overwrite: true });
            gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.2, ease: "power2.out", overwrite: false });
          },
        });
        const el = scope.current;
        const pause = () => {
          hovering = true;
          gsap.to(loop, { timeScale: 0, duration: 0.4, overwrite: true });
        };
        const resume = () => {
          hovering = false;
          gsap.to(loop, { timeScale: direction, duration: 0.6, overwrite: true });
        };
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
    <div ref={scope} className="edge-fade mx-auto mt-10 max-w-6xl overflow-hidden border-y border-night/10 py-4 text-lead leading-none font-semibold tracking-[-0.01em] text-night/80">
      <p className="sr-only">Certified in: {certifications.join(", ")}.</p>
      <div className="ticker-row flex w-max whitespace-nowrap" aria-hidden="true">
        {[0, 1].map((copy) => (
          <span key={copy} className="flex shrink-0 items-center">
            {certifications.map((item) => (
              <span key={item} className="flex items-center">
                {item}
                <span aria-hidden="true" className="px-[0.9em] text-accent">✦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CertTicker;
