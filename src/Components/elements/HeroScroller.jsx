/*
     FileName: HeroScroller.jsx
     @version: II
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { m } from "motion/react";
import { useLenis, scrollToTarget } from "../motion/SmoothScroll";

const HeroScroller = () => {
  const lenis = useLenis();
  return (
    <div
      id="scroller"
      className="absolute xs:bottom-10 bottom-12 flex justify-center items-center"
    >
      <a
        href="#about"
        aria-label="Scroll to About"
        onClick={(e) => {
          e.preventDefault();
          scrollToTarget(lenis, "#about");
        }}
      >
        <div className="w-[36px] h-[64px] rounded-3xl border-4 border-primary-400 flex justify-center items-start p-2">
          <m.div
            animate={{
              y: [0, 24, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-3 h-3 rounded-full bg-primary-400 mb-1"
          />
        </div>
      </a>
    </div>
  );
};

export default HeroScroller;
