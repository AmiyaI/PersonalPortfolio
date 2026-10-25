/*
     FileName: Hobbies.jsx
     @version: I
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// Hobby cards laid out like stickers on a desk. Grab one and throw it.

import { useRef } from "react";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionTitle from "../Components/SectionTitle";
import { hobbies } from "../Constants/constants";
import { hasFinePointer } from "../lib/gsap";

const Hobbies = () => {
  const board = useRef(null);
  // Dragging on touch screens would hijack page scrolling, so mouse only.
  const canDrag = hasFinePointer();

  return (
    <section id="hobbies" className="w-full overflow-hidden-web flex justify-center py-24">
      <div className="w-full xl:w-[70%]">
        <SectionTitle title="OFF THE CLOCK" subtitle="Hobbies" index="06" />
        <p className="px-6 text-sm text-grayscale-100/60" style={{ fontFamily: "Poppins, sans-serif" }}>
          {canDrag ? "Go ahead, drag them around." : "The stuff that keeps me sane."}
        </p>
        <div
          ref={board}
          className="relative mx-6 mt-8 grid grid-cols-1 gap-6 rounded-3xl border border-dashed border-primary-400/30 p-6 sm:grid-cols-2 lg:grid-cols-3 lg:p-10"
        >
          {hobbies.map((hobby, i) => (
            <motion.div
              key={hobby.title}
              drag={canDrag}
              dragConstraints={board}
              dragElastic={0.2}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 18 }}
              whileHover={{ scale: 1.04, rotate: 0 }}
              whileDrag={{ scale: 1.1, rotate: hobby.tilt * -1.5, zIndex: 20, cursor: "grabbing" }}
              initial={{ opacity: 0, y: 60, rotate: hobby.tilt * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: hobby.tilt }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", bounce: 0.45, duration: 0.8, delay: (i % 3) * 0.08 }}
              data-cursor={canDrag ? "Drag" : undefined}
              className={`relative flex flex-col ${canDrag ? "cursor-grab touch-none" : ""} gap-3 rounded-2xl bg-primary-400 p-6 text-grayscale-950 shadow-[8px_8px_0_#292D44] select-none`}
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#292D44] text-2xl text-primary-400">
                <FontAwesomeIcon icon={hobby.fa} />
              </span>
              <h3 className="text-5xl leading-none tracking-wide" style={{ fontFamily: "Morganite Black" }}>
                {hobby.title}
              </h3>
              <p className="text-sm">{hobby.note}</p>
              <span className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[-3deg] bg-grayscale-50/50" aria-hidden="true" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
