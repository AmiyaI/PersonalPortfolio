/*
     FileName: Hobbies.jsx
     @version: II
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// Hobby cards laid out like stickers on a desk. Grab one and throw it.

import { useRef, useState } from "react";
import { motion } from "motion/react";
import SectionTitle from "../Components/SectionTitle";
import { hobbies } from "../Constants/constants";
import { hasFinePointer } from "../lib/gsap";

const Hobbies = () => {
  const board = useRef(null);
  // Dragging on touch screens would hijack page scrolling, so mouse only.
  const canDrag = hasFinePointer();
  // The last card you grabbed stays on top after you let go.
  const [onTop, setOnTop] = useState(null);

  return (
    <section id="hobbies" className="w-full field-orchid px-5 py-16 text-night sm:px-8 lg:py-20">
      <div>
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle title="Off the clock" />
          <p className="max-w-[40ch] text-body">
            {canDrag ? "What keeps me sane outside of work. Go ahead, drag them around." : "What keeps me sane outside of work."}
          </p>
        </div>
        <div ref={board} className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hobbies.map((hobby, i) => (
            <motion.div
              key={hobby.title}
              drag={canDrag}
              dragConstraints={board}
              dragElastic={0.2}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 18 }}
              whileHover={{ scale: 1.03 }}
              onDragStart={() => setOnTop(hobby.title)}
              style={{ zIndex: onTop === hobby.title ? 20 : 1 }}
              whileDrag={{ scale: 1.08, rotate: hobby.tilt * -1.2, cursor: "grabbing" }}
              // Visible from the start; the entrance only adds the drop and the tilt.
              initial={{ y: 40, rotate: hobby.tilt * 2 }}
              whileInView={{ y: 0, rotate: hobby.tilt }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: "spring", bounce: 0.45, duration: 0.8, delay: (i % 3) * 0.08 }}
              data-cursor={canDrag ? "Drag" : undefined}
              className={`relative flex min-h-[150px] flex-col justify-end ${canDrag ? "cursor-grab touch-none" : ""} gap-2 bg-white/80 p-6 text-night select-none`}
            >
              <h3 className="text-[clamp(2rem,1.4rem+1.6vw,2.75rem)] leading-none font-extrabold tracking-[-0.035em]">
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
