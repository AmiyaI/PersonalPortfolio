/*
     FileName: HotTakes.jsx
     @version: I
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// Favourite quotes and controversial takes, one at a time, set large.
// Visitors flip through them and can email a rebuttal.

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import SectionTitle from "../Components/SectionTitle";
import { hotTakes } from "../Constants/constants";

const HotTakes = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion();
  const take = hotTakes[index];
  const many = hotTakes.length > 1;

  const step = (by) => {
    setDirection(by);
    setIndex((i) => (i + by + hotTakes.length) % hotTakes.length);
  };

  const rebuttal = `mailto:iamiya@vt.edu?subject=${encodeURIComponent("I disagree with your hot take")}&body=${encodeURIComponent(
    `"${take}"\n\nHere's why I disagree: `
  )}`;

  return (
    <section
      id="takes"
      className="field-ground w-full px-5 py-16 sm:px-8 lg:py-20"
      onKeyDown={(e) => {
        if (!many || e.target.closest("a")) return;
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
    >
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SectionTitle title="Hot takes" />
        <p className="max-w-[40ch] text-body">Opinions I'll defend at dinner. Disagree with me, I dare you.</p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="relative min-h-[16rem] overflow-hidden sm:min-h-[12rem] lg:col-span-9" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.blockquote
              key={index}
              custom={direction}
              initial={reduced ? { opacity: 0 } : { y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] } }}
              exit={reduced ? { opacity: 0 } : { y: -24, opacity: 0, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } }}
              // Swipe sideways on a phone to change the take.
              drag={many && !reduced ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) step(1);
                if (info.offset.x > 60) step(-1);
              }}
              className="text-quote leading-snug font-medium tracking-[-0.015em] text-ink"
            >
              <span aria-hidden="true" className="mr-1 text-accent">“</span>
              {take}
              <span aria-hidden="true" className="ml-1 text-accent">”</span>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-start gap-6 lg:col-span-3 lg:items-end lg:justify-end">
          {many && (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                className="rounded-full bg-white px-5 py-3 text-body font-medium text-night transition-transform hover:-translate-y-0.5"
              >
                ← Previous
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="rounded-full bg-night px-5 py-3 text-body font-extrabold text-white transition-transform hover:-translate-y-0.5"
              >
                Next take →
              </button>
            </div>
          )}
          <a href={rebuttal} className="nav-link pb-0.5 text-body font-medium text-accent">
            Disagree? Tell me why
          </a>
        </div>
      </div>
    </section>
  );
};

export default HotTakes;
