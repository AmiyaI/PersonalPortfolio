/*
     FileName: Beyond.jsx
     @version: II
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// Doors off the career page: the creative work (Studio, which also leads on
// to the AI Slop experiments) and the shirts. Studio previews its film on hover.

import { useRef } from "react";
import SectionTitle from "../Components/SectionTitle";
import { TransitionLink } from "../Components/motion/PageTransition";
import { gsap, useGSAP, MOTION_OK, EASE, START } from "../lib/gsap";
import media from "../Constants/media.json";

const studioFeature = media.studio[0];
const shirt = media.shirts[0];

const Beyond = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Each door unveils from the bottom edge up, left to right.
        gsap.fromTo(
          ".door",
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: EASE.inOut,
            stagger: 0.12,
            scrollTrigger: { trigger: ".doors", start: START.section, once: true },
          }
        );
      });
    },
    { scope }
  );

  const playPreview = (e) => e.currentTarget.querySelector("video")?.play().catch(() => {});
  const stopPreview = (e) => {
    const video = e.currentTarget.querySelector("video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section ref={scope} id="beyond" className="field-ground w-full px-5 py-16 sm:px-8 lg:py-20">
      <div>
        <div className="mb-10 flex max-w-3xl flex-col gap-3">
          <SectionTitle title="Beyond the code" />
          <p className="max-w-[52ch] text-body text-ink">
            I also direct films and ads with AI, and I design shirts.
          </p>
        </div>
        <div className="doors grid grid-cols-1 gap-6 md:grid-cols-2">
          <TransitionLink
            to="/studio"
            label="Studio"
            data-cursor="Enter"
            onMouseEnter={playPreview}
            onMouseLeave={stopPreview}
            className="door group relative flex min-h-[380px] flex-col justify-end overflow-hidden bg-[#0d0b10] p-8 text-[#f2ead8]"
          >
            <img
              src={studioFeature.poster}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
            />
            {studioFeature.preview && (
              <video
                src={studioFeature.preview}
                poster={studioFeature.poster}
                muted
                loop
                playsInline
                preload="none"
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-70"
              />
            )}
            <div className="relative -m-8 mt-0 bg-[#0d0b10] p-8 pt-6">
              <h3 className="text-head leading-[0.9] font-extrabold tracking-[-0.04em]">
                Studio <span className="inline-block transition-transform duration-[400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-2">→</span>
              </h3>
              <p className="mt-3 max-w-md text-body">
                Production work: AI short films, UGC ads, product launch videos and campaign creative.
              </p>
            </div>
          </TransitionLink>

          <a
            href="mailto:iamiya@vt.edu?subject=I%20want%20a%20shirt"
            data-cursor="Ask"
            className="door group relative flex min-h-[380px] flex-col justify-end overflow-hidden bg-white p-8 text-night"
          >
            <img
              src={shirt.images[3]}
              alt="The mushroom tee, worn in a lookbook shot"
              className="absolute inset-0 h-full w-full object-cover object-[center_42%] transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
            />
            <div className="relative -m-8 mt-0 bg-white p-8 pt-6">
              <h3 className="text-head leading-[0.9] font-extrabold tracking-[-0.04em]">
                Shirts <span className="inline-block transition-transform duration-[400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-2">→</span>
              </h3>
              <p className="mt-3 max-w-md text-body">
                Shirts I designed, starting with the mushroom tee. Not in a store yet. Want one? Ask me.
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Beyond;
