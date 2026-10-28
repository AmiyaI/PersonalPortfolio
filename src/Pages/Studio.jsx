/*
     FileName: Studio.jsx
     @version: I
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// The serious creative work: films, ads and campaign stills. A darker,
// cinematic room next to the main site, with film grain and a serif voice.

import { useRef } from "react";
import media from "../Constants/media.json";
import { gsap, useGSAP, SplitText, refreshSoon, MOTION_OK } from "../lib/gsap";
import { MediaViewerProvider, PreviewCard, formatDuration, useMediaViewer } from "../Components/media/MediaViewer";
import { TransitionLink, useEnterDelay } from "../Components/motion/PageTransition";
import { scrollToTarget, useLenis } from "../Components/motion/SmoothScroll";

const all = media.studio;
// Two chapters: the work made for SWA AI (tagged "Swa"), then everything else.
const isSwa = (e) => e.tags?.includes("Swa");
const swaWork = all.filter(isSwa);
const ownWork = all.filter((e) => !isSwa(e));
// No single hero film: every film gets the same size card, and The Cat Video
// Bill just leads the grid with a small "Highlight" tag.
const LEAD_FILM = "enterprise-film-cat-video-bill";
const films = swaWork
  .filter((e) => e.aspect === "16:9" && e.preview)
  .sort((a, b) => (b.id === LEAD_FILM) - (a.id === LEAD_FILM));
const verticals = swaWork.filter((e) => e.aspect === "9:16");
const stills = swaWork.filter((e) => !e.preview);
const slopShots = [
  media.slop.find((e) => e.id === "brickline")?.poster,
  media.slop.find((e) => e.id === "block-vs-jurassic-court")?.poster,
  media.slop.find((e) => e.id === "memes")?.images?.[0],
].filter(Boolean);
const totalMinutes = Math.round(all.reduce((sum, e) => sum + (e.durationSec ?? 0), 0) / 60);

const serif = { fontFamily: "'Instrument Serif', serif" };
const sans = { fontFamily: "Poppins, sans-serif" };
const display = { fontFamily: "Morganite Black" };

const Meta = ({ item }) => (
  <div className="flex items-baseline justify-between gap-4 pt-3" style={sans}>
    <div>
      <h3 className="text-lg leading-tight" style={serif}>
        {item.title}
      </h3>
      <p className="text-small text-[#f2ead8]/70">{item.tags?.slice(0, 2).join(", ")}</p>
    </div>
    {/* The running time is the full cut's; the card itself plays a short preview. */}
    {item.durationSec && (
      <span className="shrink-0 text-small tabular-nums text-[#ff9a5c]">
        {item.src ? "" : "Full cut "}
        {formatDuration(item.durationSec)}
      </span>
    )}
  </div>
);

// A chapter break: a small numbered kicker, the chapter name in the display
// face, and one serif line about what's in it.
const Chapter = ({ no, id, title, children, className = "" }) => (
  <div className={`studio-reveal mb-12 flex flex-col gap-3 px-5 sm:px-8 ${className}`}>
    <p className="text-small font-semibold tracking-[0.2em] text-[#ff9a5c] uppercase" style={sans}>
      Chapter {no}
    </p>
    <h2 id={id} className="text-7xl leading-[0.85] sm:text-8xl" style={display}>
      {title}
    </h2>
    <p className="max-w-xl text-xl italic text-[#f2ead8]/80 sm:text-2xl" style={serif}>
      {children}
    </p>
  </div>
);

const StillsWall = () => {
  const open = useMediaViewer();
  return (
    <div className="columns-2 gap-3 md:columns-3 lg:columns-4">
      {stills.flatMap((set) =>
        (set.images?.length ? set.images : [set.poster]).map((src, i) => (
          <button
            key={src}
            type="button"
            data-cursor="View"
            onClick={() => open(set, i)}
            className="studio-reveal group mb-3 block w-full overflow-hidden rounded-lg"
            aria-label={`Open ${set.title}, image ${i + 1}`}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              onLoad={refreshSoon}
              className="w-full transition-transform duration-700 group-hover:scale-105"
            />
          </button>
        ))
      )}
    </div>
  );
};

const Studio = () => {
  const scope = useRef(null);
  const enterDelay = useEnterDelay();
  const lenis = useLenis();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ delay: enterDelay })
          .from(".studio-title-char", { yPercent: 125, duration: 1.4, ease: "expo.out", stagger: 0.06 })
          .from(".studio-kicker", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out", stagger: 0.1 }, "-=1");

        SplitText.create(".studio-lede", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 100,
              duration: 1,
              ease: "expo.out",
              stagger: 0.08,
              scrollTrigger: { trigger: ".studio-lede", start: "top 85%" },
            }),
        });

        gsap.utils.toArray(".studio-reveal").forEach((el) => {
          gsap.from(el, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 92%" },
          });
        });

      });

      // On wide screens the vertical ads drift sideways as the page scrolls;
      // on phones the row is a normal swipeable strip.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = scope.current.querySelector(".studio-reel-track");
        gsap.to(track, {
          x: () => Math.min(0, window.innerWidth - track.scrollWidth),
          ease: "none",
          scrollTrigger: { trigger: ".studio-reel", start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
        });
      });
    },
    { scope }
  );

  return (
    <MediaViewerProvider>
      <main ref={scope} id="main" tabIndex={-1} className="outline-none studio-page grain relative min-h-[100svh] overflow-hidden bg-[#0d0b10] pb-24 text-[#f2ead8]">
        <header className="relative flex min-h-[64svh] flex-col justify-end px-5 pt-28 sm:min-h-[78svh] pb-10 sm:px-8">
          <p className="studio-kicker mb-4 text-small text-[#ff9a5c]" style={sans}>
            Amiya Islam, Studio
          </p>
          {/* The tight leading crops the letter tops; the top padding keeps them inside the mask. */}
          <h1 className="overflow-hidden pt-[0.09em] text-[34vw] leading-[0.78] sm:text-[26vw]" style={display} aria-label="Studio">
            {"STUDIO".split("").map((char, i) => (
              <span key={i} aria-hidden="true" className="studio-title-char inline-block">
                {char}
              </span>
            ))}
          </h1>
          <div className="mt-6 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <p className="studio-kicker max-w-xl text-2xl leading-tight italic sm:text-3xl lg:text-4xl" style={serif}>
              Films, ads and launch videos, directed by me and generated with AI.
            </p>
            <div className="studio-kicker flex items-end justify-between gap-6 sm:gap-8" style={sans}>
            <dl className="flex gap-6 text-sm sm:gap-8">
              <div>
                <dt className="whitespace-nowrap text-[#f2ead8]/70">Pieces</dt>
                <dd className="text-2xl font-semibold tabular-nums">{all.length}</dd>
              </div>
              <div>
                <dt className="whitespace-nowrap text-[#f2ead8]/70">Minutes of film</dt>
                <dd className="text-2xl font-semibold tabular-nums">{totalMinutes}</dd>
              </div>
            </dl>
            <a
              href="#films-title"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget(lenis, "#films-title", { offset: -96 });
              }}
              className="rounded-full border-2 border-[#f2ead8] px-5 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-300 hover:bg-[#f2ead8] hover:text-[#0d0b10]"
            >
              See the films
            </a>
            </div>
          </div>
        </header>

        <Chapter no="01" id="swa-title" title="Made for SWA AI" className="mt-24 sm:mt-32">
          Product films, ads and campaigns I wrote and produced for SWA AI.
        </Chapter>

        <section className="px-5 sm:px-8">
          <p className="studio-lede max-w-3xl text-2xl leading-[1.15] sm:text-5xl" style={serif}>
            Written, storyboarded, voiced, scored and cut like a real production.
          </p>
        </section>

        <section className="mt-16 px-5 sm:px-8" aria-labelledby="films-title">
          <h2 id="films-title" className="mb-8 text-7xl leading-none" style={display}>
            Films <span className="align-top text-2xl text-[#ff8539]">{films.length}</span>
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {films.map((item) => (
              // The reveal sits on an inner wrapper so the linkable article (/studio#id) isn't
              // shifted by the entrance when a deep link measures where to scroll.
              <article key={item.id} id={item.id} className="scroll-mt-24">
                <div className="studio-reveal">
                  <PreviewCard item={item} className="rounded-xl">
                    {item.id === LEAD_FILM && (
                      <span className="absolute top-3 left-3 rounded-full bg-[#ff9a5c] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-[#0d0b10] uppercase">
                        Highlight
                      </span>
                    )}
                  </PreviewCard>
                  <Meta item={item} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="studio-reel mt-32 overflow-hidden" aria-labelledby="ads-title">
          <h2 id="ads-title" className="mb-8 px-5 text-7xl leading-none sm:px-8" style={display}>
            Ads <span className="amp">&amp;</span> UGC <span className="align-top text-2xl text-[#ff8539]">{verticals.length}</span>
          </h2>
          <div className="overflow-x-auto pb-4 lg:overflow-visible">
            <div className="studio-reel-track flex w-max snap-x snap-mandatory gap-5 px-5 sm:px-8 lg:snap-none">
            {verticals.map((item) => (
              <article key={item.id} id={item.id} className="w-[58vw] scroll-mt-24 snap-start sm:w-[260px]">
                <PreviewCard item={item} className="rounded-xl" />
                <Meta item={item} />
              </article>
            ))}
            </div>
          </div>
        </section>

        <section id="stills" className="mt-32 scroll-mt-24 px-5 sm:px-8" aria-labelledby="stills-title">
          <h2 id="stills-title" className="mb-8 text-7xl leading-none" style={display}>
            Campaign stills
          </h2>
          <StillsWall />
        </section>

        <section id="independent" className="mt-40 scroll-mt-24" aria-labelledby="independent-title">
          <Chapter no="02" id="independent-title" title="Independent work">
            My own films and experiments, and work for other teams.
          </Chapter>
          <div className="grid grid-cols-2 items-start gap-x-6 gap-y-12 px-5 sm:px-8 md:grid-cols-5">
            {ownWork.map((item) => (
              // Same inner-wrapper reveal as the films, so /studio#id deep links land true.
              <article key={item.id} id={item.id} className={`scroll-mt-24 ${item.aspect === "16:9" ? "col-span-2" : ""}`}>
                <div className="studio-reveal">
                  <PreviewCard item={item} className="rounded-xl" />
                  <Meta item={item} />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* The fun experiments live one click past the serious work, not in the main nav. */}
        <section className="mt-32 px-5 sm:px-8" aria-labelledby="slop-title">
          <TransitionLink
            to="/ai-slop"
            label="AI Slop"
            data-cursor="Enter"
            className="studio-reveal group grid overflow-hidden rounded-3xl bg-[#d2ff00] text-[#111112] lg:grid-cols-2"
          >
            <div className="flex flex-col justify-end gap-4 p-8 sm:p-12">
              <h2 id="slop-title" className="text-7xl leading-none sm:text-8xl" style={display}>
                AI Slop{" "}
                <span className="inline-block transition-transform duration-[400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-2" style={sans}>
                  →
                </span>
              </h2>
              <p className="max-w-md text-lg font-medium" style={sans}>
                The after-hours side: games, skits and memes I made with AI purely because I could, on every new tool I
                get my hands on. Not production grade. No refunds.
              </p>
            </div>
            <div className="relative min-h-[260px] sm:min-h-[340px]" aria-hidden="true">
              {slopShots.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  loading="lazy"
                  className="door-sticker absolute w-[42%] border-4 border-[#111112] transition-[rotate,translate] duration-700 ease-[cubic-bezier(.34,1.56,.64,1)]"
                  style={{
                    top: `${10 + i * 8}%`,
                    left: `${4 + i * 26}%`,
                    "--r": `${[-9, 6, -4][i]}deg`,
                    "--r-hover": `${[-16, 12, -10][i]}deg`,
                  }}
                />
              ))}
            </div>
          </TransitionLink>
        </section>
      </main>
    </MediaViewerProvider>
  );
};

export default Studio;
