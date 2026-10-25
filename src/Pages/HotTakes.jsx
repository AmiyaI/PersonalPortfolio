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
    <section id="takes" className="field-ground w-full px-5 py-16 sm:px-8 lg:py-20">
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SectionTitle title="Hot takes" />
        <p className="max-w-[40ch] text-body">Opinions I'll defend at dinner. Disagree with me, I dare you.</p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="relative min-h-[16rem] overflow-hidden sm:min-h-[12rem] lg:col-span-9" aria-live="polite">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.blockquote
              key={index}
              custom={direction}
              initial={reduced ? { opacity: 0 } : { x: 60 * direction, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { x: -60 * direction, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(1.5rem,1rem+1.6vw,2.5rem)] leading-snug font-medium tracking-[-0.015em] text-ink"
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
