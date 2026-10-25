/*
     FileName: About.jsx
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { useRef } from "react";
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
        // Each word of the statement lights up as it scrolls through.
        SplitText.create(".about-statement", {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.25 },
              {
                opacity: 1,
                stagger: 0.1,
                ease: "none",
                scrollTrigger: { trigger: ".about-statement", start: "top 85%", end: "bottom 55%", scrub: true },
              }
            ),
        });

        gsap.utils.toArray(".stat-value").forEach((el) => {
          const counter = { n: 0 };
          gsap.to(counter, {
            n: Number(el.dataset.value),
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = Math.round(counter.n).toLocaleString();
            },
          });
        });

        gsap.from(".about-part", {
          y: 28,
          stagger: 0.08,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-story", start: "top 85%", once: true },
        });
      });
    },
    { scope }
  );

  return (
    <section ref={scope} id="about" className="w-full overflow-hidden px-5 py-24 sm:px-8 lg:py-28">
      <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
        <SectionTitle title="About me" className="lg:col-span-6" />
        <p className="about-statement text-lead leading-snug text-ink lg:col-span-5 lg:col-start-8">
          {introduction.statement}
        </p>
      </div>

      <dl className="mt-24 grid grid-cols-2 gap-x-6 gap-y-10 lg:mt-32 lg:flex lg:justify-between">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <dd className="order-1 text-[clamp(2.25rem,1.5rem+2.4vw,3.5rem)] leading-none font-medium tabular-nums text-ink">
              <span className="stat-value" data-value={stat.value}>
                {stat.value.toLocaleString()}
              </span>
              <span className="text-accent">{stat.suffix}</span>
            </dd>
            <dt className="order-2 mt-2 max-w-[22ch] text-small text-muted">{stat.label}</dt>
          </div>
        ))}
      </dl>

      <div className="about-story mt-24 grid grid-cols-1 items-center gap-12 lg:mt-32 lg:grid-cols-12">
        <div className="flex flex-col gap-5 text-body text-ink lg:col-span-6">
          <p className="about-part text-lead font-medium text-accent">{introduction.text[0]}</p>
          <p className="about-part">{introduction.text[1]}</p>
          <p className="about-part">{introduction.text[2]}</p>
          <p className="about-part">{introduction.text[3]}</p>
        </div>
        <div className="about-part flex justify-center lg:col-span-5 lg:col-start-8">
          <div className="aspect-[4/5] w-[78%] max-w-[420px]">
            <ImageSlider images={memoji.image} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
