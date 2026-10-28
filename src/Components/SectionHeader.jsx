/*
     FileName: SectionHeader.jsx
     @version: I
     Creation: 10/27/2026
     Last modification: 10/27/2026
*/

// Every section opens with a small kicker, its title and a line of context,
// but in one of three layouts so neighbouring sections don't read the same:
//   left   – stacked on the left
//   center – stacked and centered
//   split  – kicker and title on the left, the line of context on the right
// The kicker scrambles in like the hero's role line; the title rises letter
// by letter (SectionTitle); the context line fades up after them.

import { useRef } from "react";
import SectionTitle from "./SectionTitle";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";

const LAYOUTS = {
  left: { wrap: "flex max-w-3xl flex-col gap-3", text: "max-w-[52ch]" },
  center: { wrap: "mx-auto flex max-w-3xl flex-col items-center gap-3 text-center", text: "max-w-[60ch] text-balance" },
  split: {
    wrap: "grid grid-cols-1 gap-3 lg:grid-cols-12 lg:items-end lg:gap-8",
    head: "flex flex-col gap-3 lg:col-span-7",
    text: "max-w-[44ch] lg:col-span-5 lg:justify-self-end lg:text-right",
  },
};

// tone="light" is for headers set on a dark or saturated field.
const SectionHeader = ({ kicker, title, children, layout = "left", className = "", textClassName = "", tone = "dark" }) => {
  const scope = useRef(null);
  const look = LAYOUTS[layout];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const trigger = { trigger: scope.current, start: "top 88%", once: true };
        gsap.from(".kicker-text", {
          duration: 0.9,
          scrambleText: { text: "", chars: "AMIYA01_/<>", revealDelay: 0.2, speed: 0.6 },
          scrollTrigger: trigger,
        });
        gsap.from(".kicker-line", { scaleX: 0, transformOrigin: "left", duration: 0.8, ease: "expo.out", scrollTrigger: trigger });
        gsap.from(".header-text", { y: 18, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.25, scrollTrigger: trigger });
      });
    },
    { scope }
  );

  const kickerEl = kicker && (
    <p className={`flex items-center gap-3 text-small font-semibold tracking-[0.2em] uppercase ${tone === "light" ? "text-white/85" : "text-accent"} ${layout === "center" ? "justify-center" : ""}`}>
      <span aria-hidden="true" className={`kicker-line h-0.5 w-8 rounded-full ${tone === "light" ? "bg-current" : "aurora-line"}`} />
      <span className="kicker-text">{kicker}</span>
    </p>
  );
  const text = children && <p className={`header-text text-body ${tone === "light" ? "text-white/90" : "text-ink"} ${look.text} ${textClassName}`}>{children}</p>;

  return (
    <header ref={scope} className={`${look.wrap} ${className}`}>
      {layout === "split" ? (
        <>
          <div className={look.head}>
            {kickerEl}
            <SectionTitle title={title} />
          </div>
          {text}
        </>
      ) : (
        <>
          {kickerEl}
          <SectionTitle title={title} />
          {text}
        </>
      )}
    </header>
  );
};

export default SectionHeader;
