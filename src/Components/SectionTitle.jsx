/*
     FileName: SectionTitle.jsx
     @version: II
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";

const SectionTitle = (props) => {
  const { title, subtitle, index, tone = "text-primary-600" } = props;
  const scope = useRef(null);

  // Letters rise out of a mask one at a time; the subtitle decodes itself.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: scope.current, start: "top 85%", toggleActions: "play none none reverse" } })
          .from(".title-char", {
            yPercent: 115,
            rotate: 10,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.035,
          })
          .from(".title-sub", { duration: 1, scrambleText: { text: "", chars: "upperCase", speed: 0.5 } }, 0.1)
          .from(".title-rule", { scaleX: 0, transformOrigin: "left", duration: 1.1, ease: "expo.out" }, 0.2);
      });
    },
    { scope }
  );

  return (
    <div ref={scope} className={`${tone} p-6 noselect`}>
      <div className="flex items-center gap-4">
        {index && (
          <span className="text-sm opacity-60" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
            {index}
          </span>
        )}
        <span
          className="title-sub opacity-50"
          style={{
            textTransform: "uppercase",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "600",
          }}
        >
          {subtitle}
        </span>
        <span className="title-rule h-px flex-1 max-w-48 bg-current opacity-30" />
      </div>
      <h2
        className="overflow-hidden tracking-wider text-7xl sm:text-8xl md:text-9xl pb-1"
        style={{ fontFamily: "Morganite Black"}}
        aria-label={title}
      >
        {title.split("").map((char, index) => {
          if(char === " ") {
            return " ";
          }
          return (
            <span key={index} aria-hidden="true" className="title-char inline-block">
              <span className="bounce">{char}</span>
            </span>
          );
        })}
      </h2>
    </div>
  );
};

export default SectionTitle;
