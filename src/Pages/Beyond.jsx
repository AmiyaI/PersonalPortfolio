/*
     FileName: Beyond.jsx
     @version: II
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// Two doors off the career page: the serious creative work (Studio) and the
// fun experiments (AI Slop). Each previews its page on hover.

import { useRef } from "react";
import SectionTitle from "../Components/SectionTitle";
import { TransitionLink } from "../Components/motion/PageTransition";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";
import media from "../Constants/media.json";

const studioFeature = media.studio[0];
const shirt = media.shirts[0];
const slopShots = [
  media.slop.find((e) => e.id === "brickline")?.poster,
  media.slop.find((e) => e.id === "block-vs-jurassic-court")?.poster,
  media.slop.find((e) => e.id === "memes")?.images?.[0],
].filter(Boolean);

const Beyond = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".door", {
          yPercent: 30,
          rotate: (i) => (i ? 4 : -4),
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.15,
          scrollTrigger: { trigger: ".doors", start: "top 80%" },
        });
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
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle title="Beyond the code" />
          <p className="max-w-[40ch] text-body text-ink">
            I also direct films and ads with AI, make plenty of things purely for fun, and design shirts.
          </p>
        </div>
        <div className="doors grid grid-cols-1 gap-6 lg:grid-cols-3">
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
              <h3 className="text-[clamp(2.75rem,1.6rem+3vw,4.5rem)] leading-[0.9] font-extrabold tracking-[-0.04em]">
                Studio <span className="inline-block transition-transform duration-500 group-hover:translate-x-3 group-hover:-translate-y-3">→</span>
              </h3>
              <p className="mt-3 max-w-md text-body">
                Production work: AI short films, UGC ads, product launch videos and campaign creative.
              </p>
            </div>
          </TransitionLink>

          <TransitionLink
            to="/ai-slop"
            label="AI Slop"
            data-cursor="Enter"
            className="door group relative flex min-h-[380px] flex-col justify-end overflow-hidden bg-[#d2ff00] p-8 text-[#111112]"
          >
            <div className="absolute inset-0">
              {slopShots.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="door-sticker absolute w-[40%] border-4 border-[#111112] transition-[rotate,translate] duration-700 ease-[cubic-bezier(.34,1.56,.64,1)]"
                  style={{
                    top: `${6 + i * 6}%`,
                    left: `${6 + i * 24}%`,
                    "--r": `${[-9, 6, -4][i]}deg`,
                    "--r-hover": `${[-16, 12, -10][i]}deg`,
                  }}
                />
              ))}
            </div>
            <div className="relative -m-8 mt-0 bg-[#d2ff00] p-8 pt-6">
              <h3 className="text-[clamp(2.75rem,1.6rem+3vw,4.5rem)] leading-[0.9] font-extrabold tracking-[-0.04em]">
                AI Slop <span className="inline-block transition-transform duration-500 group-hover:rotate-12">→</span>
              </h3>
              <p className="mt-3 max-w-md text-body font-medium">
                Games, skits and fake photo shoots I made with AI because I could. Not production grade. No refunds.
              </p>
            </div>
          </TransitionLink>

          <a
            href="mailto:iamiya@vt.edu?subject=I%20want%20a%20shirt"
            data-cursor="Ask"
            className="door group relative flex min-h-[380px] flex-col justify-end overflow-hidden bg-ink p-8 text-night"
          >
            <img
              src={shirt.images[3]}
              alt="The mushroom tee, worn in a lookbook shot"
              className="absolute inset-0 h-full w-full object-cover object-[center_42%] transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
            />
            <div className="relative -m-8 mt-0 bg-ink p-8 pt-6">
              <h3 className="text-[clamp(2.75rem,1.6rem+3vw,4.5rem)] leading-[0.9] font-extrabold tracking-[-0.04em]">
                Shirts <span className="inline-block transition-transform duration-500 group-hover:translate-x-3">→</span>
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
