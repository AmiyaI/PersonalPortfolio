/*
     FileName: Experience.jsx
     @version: III
     Creation: 10/25/2026
     Last modification: 10/27/2026
*/

// A deep aurora field with frosted cards. The current role runs wide with its highlights;
// the earlier chapters sit beside it.

import { useRef } from "react";
import SectionHeader from "../Components/SectionHeader";
import { experience } from "../Constants/constants";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";

const Experience = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray(".xp-card").forEach((card, i) => {
          gsap.from(card, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "expo.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          });
          gsap.from(card.querySelectorAll(".xp-point"), {
            y: 24,
            stagger: 0.07,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.08 + 0.15,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          });
        });
      });
    },
    { scope }
  );

  return (
    <section ref={scope} id="experience" className="w-full field-aurora-deep px-5 py-20 text-white sm:px-8 lg:py-24">
      <SectionHeader kicker="Where I've worked" title="Experience" layout="split" tone="light" className="mb-8 lg:mb-10">
        Founding engineer at an AI startup today. Construction engineering before that, which is where I learned to ship on a schedule.
      </SectionHeader>
      <ol className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
        {experience.map((job, i) => (
          <li
            key={job.chapter}
            className={`xp-card flex flex-col rounded-2xl bg-white/85 p-7 text-ink shadow-[0_24px_60px_-30px_rgba(20,10,80,0.6)] backdrop-blur-md ${i === 0 ? "lg:col-span-6" : "lg:col-span-3"}`}
          >
            <p className="text-body font-medium">
              {job.company}
              <span className="text-muted"> · {job.role} · {job.period}</span>
            </p>
            <h3 className="mt-5 text-title leading-[0.95] font-extrabold tracking-[-0.03em]">{job.chapter}</h3>
            <ul className="mt-5 flex flex-col gap-2.5 text-compact leading-relaxed">
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
    </section>
  );
};

export default Experience;
