/*
     FileName: About.jsx
     @version: II
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { useRef } from "react";
import { m, LazyMotion, domAnimation } from "motion/react";
import SectionTitle from "../Components/SectionTitle";
import { memoji, introduction, stats } from "../Constants/constants";
import ImageSlider from "../Components/elements/ImageSlider";
import { gsap, useGSAP, SplitText, MOTION_OK } from "../lib/gsap";

const About = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Each word lights up as the statement scrolls through the viewport.
        SplitText.create(".about-statement", {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.12 },
              {
                opacity: 1,
                stagger: 0.1,
                ease: "none",
                scrollTrigger: { trigger: ".about-statement", start: "top 80%", end: "bottom 45%", scrub: true },
              }
            ),
        });

        gsap.utils.toArray(".stat-value").forEach((el) => {
          const target = Number(el.dataset.value);
          const counter = { n: 0 };
          gsap.to(counter, {
            n: target,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = Math.round(counter.n).toLocaleString();
            },
          });
        });
        gsap.from(".stat", {
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".stats-row", start: "top 90%", once: true },
        });
      });
    },
    { scope }
  );

  return (
    <div ref={scope} id="about" className="w-full flex justify-center overflow-hidden-web">
      <div className="w-full xl:w-[70%] flex flex-col pb-16">
        <div className="w-full">
          <SectionTitle title="ABOUT ME" subtitle="Introduction" index="01" />
        </div>
        <p
          className="about-statement px-6 pt-4 pb-10 text-3xl leading-tight text-grayscale-50 sm:text-5xl"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
        >
          {introduction.statement}
        </p>
        <div className="w-full flex flex-col-reverse sm:flex-row">
          <div className="w-full md:w-[50%] md:h-full flex items-center mt-10">
            <LazyMotion features={domAnimation} strict>
              <m.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="text-grayscale-50 p-6 text-center flex flex-col gap-6"
              >
                <span className="text-primary-400">{introduction.text[0]}</span>
                <span>{introduction.text[1]}</span>
                <span>{introduction.text[2]}</span>
                <span>{introduction.text[3]}</span>
              </m.p>
            </LazyMotion>
          </div>
          <div className="w-full md:w-[50%] flex h-full items-center justify-center">
            <div className="w-[80%] lg:w-[50%] h-[300px] sm:h-[350px] flex justify-center items-center">
              <ImageSlider images={memoji.image} />
            </div>
          </div>
        </div>
        <dl className="stats-row mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-primary-400/20 bg-primary-400/20 mx-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="stat flex flex-col gap-2 bg-[#5C546B] p-6" style={{ fontFamily: "Poppins, sans-serif" }}>
              <dt className="order-2 text-sm text-grayscale-100/70">{stat.label}</dt>
              <dd className="order-1 text-6xl leading-none text-primary-400" style={{ fontFamily: "Morganite Black" }}>
                <span className="stat-value" data-value={stat.value}>
                  {stat.value.toLocaleString()}
                </span>
                {stat.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default About;
