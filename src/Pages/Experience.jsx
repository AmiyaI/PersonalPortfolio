/*
     FileName: Experience.jsx
     @version: IV
     Creation: 10/25/2026
     Last modification: 11/06/2026
*/

// A deep aurora field with frosted cards and two tabs. Work: the current role
// runs wide with its highlights, the earlier jobs sit beside it, and the GitHub
// contribution calendar shows the pace. Education: the degrees, on their own.
// The tab pill slides between labels; switching tabs re-plays the card entrance.

import { useRef, useState } from "react";
import { motion } from "motion/react";
import SectionHeader from "../Components/SectionHeader";
import ContributionGraph from "../Components/ContributionGraph";
import { experience, education } from "../Constants/constants";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";

const TABS = [
  { id: "work", label: "Work" },
  { id: "education", label: "Education" },
];

const card = "xp-card flex flex-col rounded-2xl bg-white/85 p-7 text-ink shadow-[0_24px_60px_-30px_rgba(20,10,80,0.6)] backdrop-blur-md";

const Experience = () => {
  const scope = useRef(null);
  const tabRefs = useRef([]);
  const [tab, setTab] = useState("work");
  // The first reveal waits for the scroll; later tab switches play at once.
  const seen = useRef(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray(`[data-panel="${tab}"] .xp-card`);
        const trigger = seen.current ? undefined : { trigger: `[data-panel="${tab}"]`, start: "top 88%", once: true };
        gsap.from(cards, { y: 40, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.08, scrollTrigger: trigger });
        gsap.from(`[data-panel="${tab}"] .xp-point`, {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.04,
          delay: 0.15,
          scrollTrigger: trigger,
        });
        seen.current = true;
      });
    },
    { scope, dependencies: [tab] }
  );

  // Arrow keys move between tabs, as in any tab list.
  const onKeyDown = (e) => {
    const i = TABS.findIndex((t) => t.id === tab);
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + TABS.length) % TABS.length;
    setTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section ref={scope} id="experience" className="w-full field-aurora-deep px-5 py-20 text-white sm:px-8 lg:py-24">
      <SectionHeader kicker="Where I've worked" title="Experience" layout="split" tone="light" className="mb-8">
        Founding engineer at an AI startup today. Construction engineering before that, which is where I learned to ship on a schedule.
      </SectionHeader>

      <div role="tablist" aria-label="Experience" onKeyDown={onKeyDown} className="mb-8 inline-flex rounded-full bg-white/15 p-1 backdrop-blur-md">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => (tabRefs.current[i] = el)}
            type="button"
            role="tab"
            id={`xp-tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`xp-panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => setTab(t.id)}
            className={`relative rounded-full px-5 py-2 text-compact font-bold transition-colors duration-300 ${tab === t.id ? "text-ink" : "text-white/85 hover:text-white"}`}
          >
            {tab === t.id && (
              <motion.span
                layoutId="xp-tab-pill"
                className="absolute inset-0 rounded-full bg-white"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>

      {tab === "work" ? (
        <div id="xp-panel-work" role="tabpanel" aria-labelledby="xp-tab-work" data-panel="work" className="flex flex-col gap-5 lg:gap-6">
          <ol className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
            {experience.map((job, i) => (
              <li key={job.chapter} className={`${card} ${i === 0 ? "lg:col-span-6" : "lg:col-span-3"}`}>
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
          <div className="xp-card">
            <ContributionGraph />
          </div>
        </div>
      ) : (
        <ol
          id="xp-panel-education"
          role="tabpanel"
          aria-labelledby="xp-tab-education"
          data-panel="education"
          className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6"
        >
          {education.map((entry) => (
            <li key={entry.degree} className={card}>
              <p className="text-body font-medium">
                {entry.school}
                <span className="text-muted"> · {entry.period}</span>
              </p>
              <h3 className="mt-5 text-title leading-[0.95] font-extrabold tracking-[-0.03em]">{entry.degree}</h3>
              <ul className="mt-5 flex flex-col gap-2.5 text-compact leading-relaxed">
                {entry.points.map((point) => (
                  <li key={point} className="xp-point">
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-6 text-small text-muted">{entry.note}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
};

export default Experience;
