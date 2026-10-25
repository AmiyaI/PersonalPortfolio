/*
     FileName: Experience.jsx
     @version: I
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// On desktop the section pins and the chapters slide past sideways as you
// scroll down. On phones, or with reduced motion, it's a plain vertical list.

import { useRef } from "react";
import SectionTitle from "../Components/SectionTitle";
import { experience } from "../Constants/constants";
import { gsap, useGSAP } from "../lib/gsap";

const HORIZONTAL = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

const Experience = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(HORIZONTAL, () => {
        const track = scope.current.querySelector(".xp-track");
        const distance = () => track.scrollWidth - window.innerWidth;
        const scrollTrigger = {
          trigger: ".xp-pin",
          start: "top top",
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
        };

        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: { ...scrollTrigger, pin: true, scrub: 1, anticipatePin: 1 },
        });
        gsap.fromTo(".xp-progress", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { ...scrollTrigger, scrub: true } });
        gsap.to(".xp-ghost", { xPercent: -30, ease: "none", scrollTrigger: { ...scrollTrigger, scrub: true } });

        gsap.utils.toArray(".xp-card").forEach((card) => {
          gsap.from(card.querySelectorAll(".xp-point, .xp-tag"), {
            y: 30,
            opacity: 0,
            stagger: 0.06,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: card, containerAnimation: slide, start: "left 80%" },
          });
          gsap.fromTo(
            card,
            { rotate: 2.5, scale: 0.94 },
            {
              rotate: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: card, containerAnimation: slide, start: "left right", end: "left 45%", scrub: true },
            }
          );
        });
      });
    },
    { scope }
  );

  return (
    <section ref={scope} id="experience" className="relative w-full overflow-hidden-web">
      <div className="mx-auto w-full xl:w-[70%]">
        <SectionTitle title="EXPERIENCE" subtitle="Where I've built" index="02" />
      </div>
      <div className="xp-pin relative flex min-h-screen flex-col justify-center overflow-hidden">
        <span
          aria-hidden="true"
          className="xp-ghost text-outline pointer-events-none absolute top-1/2 left-0 hidden -translate-y-1/2 whitespace-nowrap text-[28vw] leading-none opacity-[0.07] lg:block"
          style={{ fontFamily: "Morganite Black" }}
        >
          SHIPPED · SHIPPED · SHIPPED
        </span>
        <ol className="xp-track relative flex flex-col gap-6 px-6 lg:w-max lg:flex-row lg:gap-10 lg:pl-[15vw] lg:pr-[10vw]">
          {experience.map((job, i) => (
            <li
              key={job.chapter}
              className="xp-card group relative flex w-full flex-col rounded-3xl border border-primary-400/25 bg-grayscale-950/70 p-8 text-grayscale-100 shadow-2xl backdrop-blur-sm lg:h-[58vh] lg:w-[min(540px,40vw)]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-primary-400">{job.company}</p>
                  <p className="mt-1 text-sm text-grayscale-100/60">
                    {job.role} · {job.period}
                  </p>
                </div>
                <span className="text-5xl leading-none text-primary-400/30" style={{ fontFamily: "Morganite Black" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3
                className="mt-6 text-6xl leading-[0.95] tracking-wide text-primary-600 lg:text-7xl"
                style={{ fontFamily: "Morganite Black" }}
              >
                {job.chapter.split("&").map((part, j) => (
                  <span key={j}>
                    {j > 0 && <span className="amp">&amp;</span>}
                    {part}
                  </span>
                ))}
              </h3>
              <ul className="mt-6 flex flex-col gap-3 text-[15px] leading-relaxed">
                {job.points.map((point) => (
                  <li key={point} className="xp-point flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                {job.tags.map((tag) => (
                  <span key={tag} className="xp-tag rounded-full border border-primary-400/30 px-3 py-1 text-xs text-primary-400">
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
        <div className="mx-6 mt-10 hidden h-px bg-primary-400/15 lg:block">
          <div className="xp-progress h-full origin-left bg-primary-400" />
        </div>
      </div>
    </section>
  );
};

export default Experience;
