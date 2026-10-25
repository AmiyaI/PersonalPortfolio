/*
     FileName: SectionTitle.jsx
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";

// A plain section heading. Letters rise out of a mask as it enters, and each
// one still rubber-bands on hover, as in v1.
const SectionTitle = ({ title, className = "", as: Tag = "h2" }) => {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".title-char", {
          yPercent: 110,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.03,
          scrollTrigger: { trigger: scope.current, start: "top 88%", once: true },
        });
      });
    },
    { scope }
  );

  return (
    <Tag
      ref={scope}
      className={`noselect overflow-hidden pb-[0.08em] text-head leading-[0.9] font-extrabold tracking-[-0.035em] ${className}`}
      aria-label={title}
    >
      {title.split(" ").map((word, w) => (
        <span key={w} aria-hidden="true" className="inline-block whitespace-nowrap">
          {word.split("").map((char, index) => (
            <span key={index} className="title-char inline-block">
              <span className="bounce">{char}</span>
            </span>
          ))}
          {w < title.split(" ").length - 1 && <span className="inline-block w-[0.25em]" />}
        </span>
      ))}
    </Tag>
  );
};

export default SectionTitle;
