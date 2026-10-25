/*
     FileName: ProjectCards.jsx
     @version: II
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { motion } from "motion/react";
import { styles } from '../styles'
import { projects } from "../Constants/constants";
import Tilt from "./elements/Tilt";
import { githubIcon } from "../assets";

const staggerContainer = (staggerChildren, delayChildren) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren || 0,
      },
    },
  };
};

const fadeIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        // framer-motion 10's default spring bounce; motion 14 defaults to 0.3.
        bounce: 0.25,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

const SectionWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0 my-[-17%] w-[500%]`}
        style={{ marginLeft: "-20%" }}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>
        <Component />
      </motion.section>
    )
  };

  const ProjectCard = ({ index, name, description, image, source_code_link, demo_link }) => {
    return (
      <motion.div
        variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
      >
        <Tilt
          options={{
            max: 40,
            scale: 1,
            speed: 450
          }}
          className='text-grayscale-50 p-5 rounded-lg sm:w-[280px] w-full'
          style={{ marginTop: '-120%' }}
          >
          <div
            className="relative w-full h-[180px]"
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-lg"
            />
            <div
              className="absolute inset-0 flex justify-end m-3"
            >
              <div
                onClick={() => window.open
                (source_code_link, "_blank", "noopener,noreferrer")}
                className="w-8 h-8 rounded-full flex justify-center items-center cursor-pointer"
              >
               <img
                src={githubIcon}
                alt="github"
                className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="mt-3">
            <h3 className="font-bold text-[20px]">{name}</h3>
            <p className="mt-2 text-[14px] leading-[18px]">{description}</p>
          </div>
          {/* Empty tag row from v1; its margin sets the card height. */}
          <div className="mt-2 flex flex-wrap gap-1"></div>
          <div
            className="mt-3 flex justify-center items-center"
          >
            <a
              className="shadow-md m-3 p-2 w-[60%] rounded-lg flex justify-center"
              href={demo_link}
              target='_blank'
              rel='noopener noreferrer'
            >
              See the Demo
            </a>
          </div>
        </Tilt>
      </motion.div>
    )
  }

const Works = () => {
  return (
    <>
      {/* Empty in v1 too; kept because its margin is part of the card offset. */}
      <div className="w-full flex">
        <p className="mt-3 max-w-3xl"></p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            {...project}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
