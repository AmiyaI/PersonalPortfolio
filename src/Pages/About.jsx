/*
     FileName: About.jsx
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { useRef } from "react";
import SectionHeader from "../Components/SectionHeader";
import { memoji, introduction } from "../Constants/constants";
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
    <section ref={scope} id="about" className="field-ground w-full overflow-hidden px-5 py-12 sm:px-8 lg:py-16">
      <SectionHeader kicker="Introduction" title="About me" layout="left" textClassName="about-statement text-lead! leading-snug">
        {introduction.statement}
      </SectionHeader>

      <div className="about-story mt-10 grid grid-cols-1 items-center gap-10 lg:mt-12 lg:grid-cols-12">
        <div className="flex flex-col gap-5 text-body text-ink lg:col-span-6">
          <p className="about-part text-lead font-medium text-accent">{introduction.text[0]}</p>
          <p className="about-part">{introduction.text[1]}</p>
          <p className="about-part">{introduction.text[2]}</p>
          <p className="about-part">{introduction.text[3]}</p>
        </div>
        <div className="about-part flex justify-center lg:col-span-5 lg:col-start-8">
          <div className="aspect-[4/5] w-[60%] max-w-[300px]">
            <ImageSlider images={memoji.image} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
