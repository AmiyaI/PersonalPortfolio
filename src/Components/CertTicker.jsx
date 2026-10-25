/*
     FileName: CertTicker.jsx
     @version: I
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// Two rows of giant outlined certification names drifting in opposite
// directions. Scrolling speeds them up and flips them with your direction.

import { useRef } from "react";
import { certifications } from "../Constants/constants";
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from "../lib/gsap";

const Row = ({ items, className }) => (
  <div className={`ticker-row flex w-max whitespace-nowrap ${className}`}>
    {[0, 1].map((copy) => (
      <span key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
        {items.map((item) => (
          <span key={item} className="flex items-center">
            <span className="px-6">{item}</span>
            <span className="text-[0.45em] text-primary-400">✦</span>
          </span>
        ))}
      </span>
    ))}
  </div>
);

const CertTicker = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const rows = gsap.utils.toArray(".ticker-row");
        const loops = rows.map((row, i) =>
          gsap.fromTo(
            row,
            { xPercent: i % 2 ? -50 : 0 },
            { xPercent: i % 2 ? 0 : -50, duration: 40, ease: "none", repeat: -1 }
          )
        );
        let direction = 1;
        ScrollTrigger.create({
          trigger: scope.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            direction = self.direction;
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 8);
            loops.forEach((loop) => {
              gsap.to(loop, { timeScale: boost * direction, duration: 0.2, overwrite: true });
              gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.2, ease: "power2.out", overwrite: false });
            });
          },
        });
      });
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      className="flex flex-col gap-2 overflow-hidden py-16 text-[16vw] leading-[0.9] uppercase sm:text-[10vw]"
      style={{ fontFamily: "Morganite Black" }}
    >
      <p className="sr-only">Certifications: {certifications.join(", ")}.</p>
      <Row items={certifications} className="text-outline" />
      <Row items={[...certifications].reverse()} className="text-primary-600/90" />
    </div>
  );
};

export default CertTicker;
