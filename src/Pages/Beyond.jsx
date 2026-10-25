/*
     FileName: Beyond.jsx
     @version: I
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
const slopShots = [
  media.slop.find((e) => e.id === "brickline")?.poster,
  media.slop.find((e) => e.id === "mushroom-tee")?.images?.[3],
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
          opacity: 0,
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
    <section ref={scope} id="beyond" className="w-full overflow-hidden-web flex justify-center py-24">
      <div className="w-full xl:w-[70%]">
        <SectionTitle title="BEYOND THE CODE" subtitle="Things I make for fun and for real" index="05" />
        <div className="doors mt-6 grid grid-cols-1 gap-6 px-6 lg:grid-cols-2">
          <TransitionLink
            to="/studio"
            label="Studio"
            data-cursor="Enter"
            onMouseEnter={playPreview}
            onMouseLeave={stopPreview}
            className="door group relative flex min-h-[460px] flex-col justify-end overflow-hidden rounded-3xl bg-[#0d0b10] p-8 text-[#f2ead8]"
          >
            <img
              src={studioFeature.poster}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
            />
            {studioFeature.preview && (
              <video
                src={studioFeature.preview}
                muted
                loop
                playsInline
                preload="none"
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-70"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b10] via-[#0d0b10]/40 to-transparent" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.35em] text-[#f2ead8]/70" style={{ fontFamily: "Poppins, sans-serif" }}>
                Films · Ads · Launch videos
              </p>
              <h3 className="mt-2 text-8xl leading-[0.85] sm:text-9xl" style={{ fontFamily: "Morganite Black" }}>
                Studio <span className="inline-block transition-transform duration-500 group-hover:translate-x-3 group-hover:-translate-y-3">↗</span>
              </h3>
              <p className="mt-3 max-w-md text-sm text-[#f2ead8]/80" style={{ fontFamily: "Poppins, sans-serif" }}>
                Production-grade work: AI short films, UGC ads, product launch videos and campaign creative.
              </p>
            </div>
          </TransitionLink>

          <TransitionLink
            to="/ai-slop"
            label="AI Slop"
            data-cursor="Enter"
            className="door group relative flex min-h-[460px] flex-col justify-end overflow-hidden rounded-3xl bg-[#d2ff00] p-8 text-[#111112]"
          >
            <div className="absolute inset-0">
              {slopShots.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="door-sticker absolute w-[46%] rounded-xl border-4 border-[#111112] shadow-[6px_6px_0_#111112] transition-[rotate,translate] duration-700 ease-[cubic-bezier(.34,1.56,.64,1)]"
                  style={{
                    top: `${8 + i * 9}%`,
                    left: `${6 + i * 24}%`,
                    "--r": `${[-9, 6, -4][i]}deg`,
                    "--r-hover": `${[-16, 12, -10][i]}deg`,
                  }}
                />
              ))}
            </div>
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ fontFamily: "Poppins, sans-serif" }}>
                Games · Skits · Weird experiments
              </p>
              <h3 className="mt-2 text-8xl leading-[0.85] sm:text-9xl" style={{ fontFamily: "Morganite Black" }}>
                AI Slop <span className="inline-block transition-transform duration-500 group-hover:rotate-[20deg] group-hover:scale-125">✺</span>
              </h3>
              <p className="mt-3 max-w-md text-sm font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                Stuff I made with AI purely because I could. Not production grade. No refunds.
              </p>
            </div>
          </TransitionLink>
        </div>
      </div>
    </section>
  );
};

export default Beyond;
