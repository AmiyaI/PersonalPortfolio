/*
     FileName: AiSlop.jsx
     @version: I
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// The fun stuff. Loud on purpose: acid lime, the hero's Mario font, crooked
// stickers, caution tape, and a button that makes it all worse.

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import media from "../Constants/media.json";
import { gsap, useGSAP, MOTION_OK, hasFinePointer } from "../lib/gsap";
import { MediaViewerProvider, PreviewCard, useMediaViewer } from "../Components/media/MediaViewer";

const byId = Object.fromEntries(media.slop.map((e) => [e.id, e]));
const subsClips = media.slop.filter((e) => e.id.startsWith("subs-"));
const mario = { fontFamily: "SuperMario" };
const sans = { fontFamily: "Poppins, sans-serif" };
const display = { fontFamily: "Morganite Black" };

const Tape = ({ text, className = "" }) => (
  <div className={`slop-tape flex overflow-hidden border-y-4 border-[#111112] bg-[#111112] py-2 text-[#d2ff00] ${className}`}>
    <div className="slop-tape-track flex w-max shrink-0 gap-8 whitespace-nowrap text-2xl" style={display}>
      {Array.from({ length: 16 }, (_, i) => (
        <span key={i}>{text}</span>
      ))}
    </div>
  </div>
);

// GSAP owns the outer wrapper (entrance, tilt, chaos); Motion owns the
// inner card's hover, so the two never fight over one transform.
const Sticker = ({ children, className = "", tilt = 0 }) => (
  <div className={`slop-sticker ${className}`} data-tilt={tilt} style={{ transform: `rotate(${tilt}deg)` }}>
    <motion.div
      className="relative h-full rounded-2xl border-4 border-[#111112] bg-white shadow-[8px_8px_0_#111112]"
      whileHover={{ rotate: -tilt, y: -8, scale: 1.02 }}
      transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
    >
      {children}
    </motion.div>
  </div>
);

const Label = ({ kicker, title, children }) => (
  <div className="p-4" style={sans}>
    <p className="text-[11px] font-bold uppercase tracking-[0.25em] opacity-60">{kicker}</p>
    <h3 className="text-4xl leading-none" style={display}>
      {title}
    </h3>
    {children && <p className="mt-1 text-sm">{children}</p>}
  </div>
);

const ImageGrid = ({ item }) => {
  const open = useMediaViewer();
  return (
    <div className="grid grid-cols-3 gap-2 p-3 md:grid-cols-6">
      {item.images.map((src, i) => (
        <button
          key={src}
          type="button"
          onClick={() => open(item, i)}
          data-cursor="View"
          className="aspect-square overflow-hidden rounded-lg border-2 border-[#111112]"
          aria-label={`Open ${item.title}, image ${i + 1}`}
        >
          <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform hover:scale-110" />
        </button>
      ))}
    </div>
  );
};

const AiSlop = () => {
  const scope = useRef(null);
  const [chaos, setChaos] = useState(0);
  const brickline = byId.brickline;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".slop-title-char", {
          yPercent: -200,
          rotate: () => gsap.utils.random(-60, 60),
          duration: 1.1,
          ease: "bounce.out",
          stagger: 0.08,
          delay: 0.9,
        });
        gsap.to(".slop-title-char", {
          rotate: () => gsap.utils.random(-8, 8),
          y: () => gsap.utils.random(-8, 8),
          duration: 0.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
          delay: 2.2,
          stagger: 0.1,
        });
        gsap.to(".slop-badge", { rotate: 360, duration: 14, ease: "none", repeat: -1 });
        gsap.utils.toArray(".slop-tape-track").forEach((track, i) => {
          gsap.fromTo(track, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 30, ease: "none", repeat: -1 });
        });
        gsap.utils.toArray(".slop-sticker").forEach((el) => {
          gsap.set(el, { rotate: Number(el.dataset.tilt) });
          gsap.from(el, {
            y: 120,
            rotate: () => gsap.utils.random(-25, 25),
            opacity: 0,
            duration: 0.9,
            ease: "back.out(1.8)",
            scrollTrigger: { trigger: el, start: "top 95%" },
          });
        });
      });
    },
    { scope }
  );

  // "More slop" re-rolls every sticker's angle a little harder each time.
  const moreSlop = () => {
    const level = Math.min(chaos + 1, 6);
    setChaos(level);
    gsap.to(scope.current.querySelectorAll(".slop-sticker"), {
      rotate: () => gsap.utils.random(-4 * level, 4 * level),
      x: () => gsap.utils.random(-6 * level, 6 * level),
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
      stagger: 0.03,
    });
  };

  return (
    <MediaViewerProvider theme="light">
      <main ref={scope} className="slop-page relative min-h-screen overflow-hidden bg-[#d2ff00] pb-24 text-[#111112]">
        <header className="relative flex min-h-[88vh] flex-col items-center justify-center px-6 pt-28 text-center">
          <svg viewBox="0 0 200 200" className="slop-badge absolute top-28 right-[6%] hidden w-40 sm:block" aria-hidden="true">
            <defs>
              <path id="badge-circle" d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0" />
            </defs>
            <circle cx="100" cy="100" r="98" fill="#111112" />
            <text fill="#d2ff00" fontSize="17" fontWeight="700" letterSpacing="3" style={sans}>
              <textPath href="#badge-circle">100% HUMAN SUPERVISED • NOT PRODUCTION GRADE •</textPath>
            </text>
            <text x="100" y="112" textAnchor="middle" fill="#ff5cb8" fontSize="34" style={mario}>
              ✺
            </text>
          </svg>
          <p className="mb-4 rounded-full border-4 border-[#111112] bg-white px-4 py-1 text-sm font-bold" style={sans}>
            Warning: contents may be generated
          </p>
          <h1 className="whitespace-nowrap text-[16vw] leading-[0.85] sm:text-[17vw]" style={mario} aria-label="AI Slop">
            {"AI SLOP".split("").map((char, i) =>
              char === " " ? (
                <span key={i} className="inline-block w-[0.35em]" />
              ) : (
                <span key={i} aria-hidden="true" className="slop-title-char inline-block">
                  {char}
                </span>
              )
            )}
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium" style={sans}>
            I didn't make slop just to make slop. Whenever a new AI tool drops, I mess with it to see what it can make. A lot of this was made on much older models, some on the newest. Games, skits and memes. Quality not guaranteed.
          </p>
          <button
            type="button"
            onClick={moreSlop}
            className="mt-8 rounded-full border-4 border-[#111112] bg-[#ff5cb8] px-6 py-3 text-lg font-bold shadow-[6px_6px_0_#111112] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none"
            style={sans}
          >
            {chaos === 0 ? "Generate more slop" : chaos < 6 ? `Slop level ${chaos} of 6` : "Maximum slop achieved"}
          </button>
        </header>

        <Tape text="⚠ CAUTION: SLOP AHEAD ⚠" className="-rotate-2 scale-105" />
        <Tape text="✺ NOT PRODUCTION GRADE ✺" className="mt-2 rotate-1 scale-105" />

        <section className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-6" aria-label="Experiments">
          <Sticker className="md:col-span-4" tilt={-1.5}>
            <ScreenshotStrip item={brickline} />
            <Label kicker="Browser game · Three.js · 24 rounds of revisions" title="BRICKLINE">
              {brickline.blurb} Playable version coming to this page soon.
            </Label>
          </Sticker>

          <Sticker className="md:col-span-2" tilt={3}>
            <div className="overflow-hidden rounded-t-xl border-b-4 border-[#111112]">
              <PreviewCard item={byId["block-vs-jurassic-court"]} />
            </div>
            <Label kicker="Realtime voice skit" title={byId["block-vs-jurassic-court"].title}>
              {byId["block-vs-jurassic-court"].blurb}
            </Label>
          </Sticker>

          <Sticker className="md:col-span-6" tilt={2}>
            <ImageGrid item={byId.memes} />
            <Label kicker="Memes" title={byId.memes.title}>
              {byId.memes.blurb}
            </Label>
          </Sticker>

          <Sticker className="md:col-span-6" tilt={-1}>
            <div className="grid grid-cols-5 gap-2 p-3">
              {subsClips.map((clip) => (
                <div key={clip.id} className="overflow-hidden rounded-lg border-2 border-[#111112]">
                  <PreviewCard item={clip} />
                </div>
              ))}
            </div>
            <Label kicker="Raw generations · 5 shots" title="Death by a Thousand Subscriptions">
              The unedited shots behind a 17-second ad, from subscription blizzard to calm orb.
            </Label>
          </Sticker>
        </section>
      </main>
    </MediaViewerProvider>
  );
};

// BRICKLINE has stills only, so it gets a grid of them.
const ScreenshotStrip = ({ item }) => {
  const open = useMediaViewer();
  return (
    <button
      type="button"
      onClick={() => open(item)}
      data-cursor="Look"
      aria-label={`Open ${item.title} screenshots`}
      className="group grid w-full grid-cols-3 gap-1 overflow-hidden rounded-t-xl border-b-4 border-[#111112] bg-[#111112]"
    >
      {item.images.slice(0, 6).map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          loading="lazy"
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${i === 0 ? "col-span-2 row-span-2 h-full" : "aspect-video"}`}
        />
      ))}
    </button>
  );
};

export default AiSlop;
