/*
     FileName: Experience.jsx
     @version: II
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// A full field of Swa indigo. On desktop the section pins and the chapters
// slide past sideways as you scroll down. On phones, or with reduced motion,
// it's a plain vertical list.

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
        const distance = () => track.scrollWidth - track.parentElement.clientWidth;
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
        // Same scrub as the track, so the bar and the cards move together.
        gsap.fromTo(".xp-progress", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { ...scrollTrigger, scrub: 1 } });

        gsap.utils.toArray(".xp-card").forEach((card) => {
          gsap.from(card.querySelectorAll(".xp-point"), {
            y: 24,
            stagger: 0.07,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: card, containerAnimation: slide, start: "left 80%" },
          });
        });
      });

      // Phones and tablets get a plain vertical list; give its cards an entrance too.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray(".xp-card").forEach((card) => {
          gsap.from(card.querySelectorAll(".xp-point"), {
            y: 24,
            stagger: 0.07,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          });
        });
      });
    },
    { scope }
  );

  return (
    <section ref={scope} id="experience" className="relative w-full field-indigo text-ink">
      <div className="xp-pin flex min-h-[100svh] flex-col justify-center gap-10 overflow-hidden py-16 lg:py-12">
        <div className="flex flex-col gap-4 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle title="Experience" />
          <p className="max-w-[40ch] text-body">
            Founding engineer at an AI startup today. Construction engineering before that, which is where I learned to ship on a schedule.
          </p>
        </div>
        {/* The cards slide inside the page margins, not against the screen edge. */}
        <div className="mx-5 overflow-hidden sm:mx-8">
        <ol className="xp-track flex flex-col gap-5 lg:w-max lg:flex-row lg:gap-6">
          {experience.map((job, i) => (
            // Company, role and dates show once per employer, not on every chapter.
            <li
              key={job.chapter}
              className="xp-card flex w-full flex-col bg-white/65 p-7 lg:w-[min(420px,29vw)]"
            >
              <p className="text-body font-medium">
                {job.company}
                {experience[i - 1]?.company !== job.company && (
                  <span className="text-muted"> · {job.role} · {job.period}</span>
                )}
              </p>
              <h3 className="mt-5 text-[clamp(2rem,1.4rem+1.6vw,2.75rem)] leading-[0.95] font-extrabold tracking-[-0.03em]">
                {job.chapter}
              </h3>
              <ul className="mt-5 flex flex-col gap-2.5 text-[1rem] leading-relaxed">
                {job.points.map((point) => (
                  <li key={point} className="xp-point">
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-6 text-small text-muted">{job.tags.join(", ")}</p>
            </li>
          ))}
        </ol>
        </div>
        <div className="mx-5 hidden h-1 bg-white/60 sm:mx-8 lg:block">
          <div className="xp-progress h-full origin-left bg-accent" />
        </div>
      </div>
    </section>
  );
};

export default Experience;
