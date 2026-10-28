/*
     FileName: Hobbies.jsx
     @version: II
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// Hobby cards laid out like stickers on a desk. Grab one and throw it.

import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import SectionHeader from "../Components/SectionHeader";
import { hobbies } from "../Constants/constants";
import { hasFinePointer } from "../lib/gsap";

const Hobbies = () => {
  const board = useRef(null);
  // Dragging on touch screens would hijack page scrolling, so mouse only.
  const canDrag = hasFinePointer();
  // The last card you grabbed stays on top after you let go.
  const [onTop, setOnTop] = useState(null);
  // Each card's drag limits in pixels, measured from its resting spot. Passing the board ref
  // instead makes Motion rescale every card on window resize, which can throw a card
  // thousands of pixels off the board once the grid changes column count.
  const [bounds, setBounds] = useState([]);

  useLayoutEffect(() => {
    const el = board.current;
    if (!el || !canDrag) return;
    const measure = () =>
      setBounds(
        [...el.children].map((card) => ({
          left: -card.offsetLeft,
          top: -card.offsetTop,
          right: el.clientWidth - card.offsetLeft - card.offsetWidth,
          bottom: el.clientHeight - card.offsetTop - card.offsetHeight,
        })),
      );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [canDrag]);

  return (
    <section id="hobbies" className="w-full scroll-mt-16 field-orchid px-5 py-12 text-night sm:px-8 lg:py-16">
      <div>
        <SectionHeader kicker="Outside of work" title="Off the clock" layout="left" className="mb-8 lg:mb-10">
          {canDrag ? "What keeps me sane outside of work. Go ahead, drag them around." : "What keeps me sane outside of work."}
        </SectionHeader>
        <div ref={board} className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hobbies.map((hobby, i) => (
            <motion.div
              key={hobby.title}
              drag={canDrag}
              dragConstraints={bounds[i]}
              dragElastic={0.2}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 18 }}
              whileHover={{ scale: 1.03 }}
              onDragStart={() => setOnTop(hobby.title)}
              style={{ zIndex: onTop === hobby.title ? 20 : 1 }}
              whileDrag={{ scale: 1.06, rotate: hobby.tilt * -0.6, cursor: "grabbing" }}
              // Visible from the start; the entrance only adds the drop and the tilt.
              initial={{ y: 40, rotate: hobby.tilt * 0.8 }}
              whileInView={{ y: 0, rotate: hobby.tilt * 0.4 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: "spring", bounce: 0.45, duration: 0.8, delay: (i % 3) * 0.08 }}
              data-cursor={canDrag ? "Drag" : undefined}
              className={`relative flex min-h-[150px] flex-col justify-end ${canDrag ? "cursor-grab touch-none" : ""} gap-2 bg-white/80 p-6 text-night select-none`}
            >
              <h3 className="text-title leading-none font-extrabold tracking-[-0.035em]">
                {hobby.title}
              </h3>
              <p className="text-body">{hobby.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
