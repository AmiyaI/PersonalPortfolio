/*
     FileName: EarlyAI.jsx
     @version: I
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// How I got here with AI: from pasting GPT-3.5 answers into an editor to
// building agents. A thick bar fills as you scroll and each step brightens
// when the bar reaches it.

import { useRef } from "react";
import SectionTitle from "../Components/SectionTitle";
import { aiJourney } from "../Constants/constants";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";

const EarlyAI = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const trigger = { trigger: ".journey", start: "top 75%", end: "bottom 55%", scrub: true };
        gsap.fromTo(".journey-fill", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: trigger });
        gsap.fromTo(
          ".journey-step",
          { opacity: 0.35 },
          { opacity: 1, ease: "none", stagger: 0.25, scrollTrigger: trigger }
        );
      });
    },
    { scope }
  );

  return (
    <section ref={scope} id="early-ai" className="field-ground w-full px-5 py-16 sm:px-8 lg:py-20">
      <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SectionTitle title="Early to AI" />
        <p className="max-w-[40ch] text-body">
          I started on ChatGPT when it launched with GPT-3.5, and I never went back.
        </p>
      </div>

      <div className="journey">
        <div className="mb-8 hidden h-1.5 bg-white lg:block" aria-hidden="true">
          <div className="journey-fill h-full origin-left bg-accent" />
        </div>
        <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {aiJourney.map((step) => (
            <li key={step.title} className="journey-step flex flex-col gap-3">
              <p className="text-[clamp(2.5rem,1.8rem+2vw,3.5rem)] leading-none font-extrabold tracking-[-0.04em] text-accent tabular-nums">
                {step.when}
              </p>
              <h3 className="text-lead font-extrabold tracking-[-0.02em] text-ink">{step.title}</h3>
              <p className="max-w-[34ch] text-[1rem] leading-relaxed text-ink">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default EarlyAI;
