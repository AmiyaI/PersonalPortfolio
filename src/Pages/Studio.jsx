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
import { useEnterDelay } from "../Components/motion/PageTransition";

const all = media.studio;
const feature = all[0];
const films = all.filter((e) => e !== feature && e.aspect === "16:9" && e.preview);
const verticals = all.filter((e) => e.aspect === "9:16");
const stills = all.filter((e) => !e.preview);
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
      <p className="text-xs uppercase tracking-[0.2em] text-[#f2ead8]/50">{item.tags?.slice(0, 2).join(" · ")}</p>
    </div>
    {item.durationSec && <span className="text-xs tabular-nums text-[#ff8539]">{formatDuration(item.durationSec)}</span>}
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

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ delay: enterDelay })
          .from(".studio-title-char", { yPercent: 110, duration: 1.4, ease: "expo.out", stagger: 0.06 })
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

        // The featured film grows into place as it scrolls in (transform only).
        gsap.fromTo(
          ".studio-feature",
          { scale: 0.9 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: ".studio-feature", start: "top 90%", end: "top 30%", scrub: 0.5 } }
        );

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
      <main ref={scope} id="main" tabIndex={-1} className="outline-none studio-page grain relative min-h-screen overflow-hidden bg-[#0d0b10] pb-24 text-[#f2ead8]">
        <header className="relative flex min-h-[92vh] flex-col justify-end px-6 pt-32 pb-10 sm:px-16">
          <p className="studio-kicker text-xs uppercase tracking-[0.4em] text-[#ff8539]" style={sans}>
            Amiya Islam · Studio
          </p>
          <h1 className="overflow-hidden text-[34vw] leading-[0.78] sm:text-[26vw]" style={display} aria-label="Studio">
            {"STUDIO".split("").map((char, i) => (
              <span key={i} aria-hidden="true" className="studio-title-char inline-block">
                {char}
              </span>
            ))}
          </h1>
          <div className="mt-6 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <p className="studio-kicker max-w-xl text-3xl leading-tight italic sm:text-4xl" style={serif}>
              Films, ads and launch videos, directed by me and generated with AI.
            </p>
            <dl className="studio-kicker flex gap-8 text-sm" style={sans}>
              <div>
                <dt className="text-[#f2ead8]/50">Pieces</dt>
                <dd className="text-3xl" style={display}>{all.length}</dd>
              </div>
              <div>
                <dt className="text-[#f2ead8]/50">Minutes of film</dt>
                <dd className="text-3xl" style={display}>{totalMinutes}</dd>
              </div>
            </dl>
          </div>
        </header>

        <section className="px-6 sm:px-16" aria-labelledby="feature-title">
          <PreviewCard item={feature} className="studio-feature rounded-3xl" cursor="Watch">
            <span className="absolute inset-0 bg-gradient-to-t from-[#0d0b10] via-transparent to-transparent" />
            <span className="absolute bottom-0 left-0 flex w-full flex-col gap-2 p-6 sm:p-10" style={sans}>
              <span className="text-xs uppercase tracking-[0.35em] text-[#ff8539]">Featured film · {formatDuration(feature.durationSec)}</span>
              <span id="feature-title" className="text-5xl leading-none sm:text-8xl" style={display}>
                {feature.title}
              </span>
              <span className="max-w-xl text-lg italic text-[#f2ead8]/80" style={serif}>
                {feature.blurb}
              </span>
            </span>
          </PreviewCard>
        </section>

        <section className="mt-32 px-6 sm:px-16">
          <p className="studio-lede max-w-4xl text-4xl leading-[1.1] sm:text-6xl" style={serif}>
            Every piece here was written, cut and finished like a real production: scripts, storyboards, voice, music and a
            <em className="text-[#ff8539]"> lot </em>
            of takes.
          </p>
        </section>

        <section className="mt-24 px-6 sm:px-16" aria-labelledby="films-title">
          <h2 id="films-title" className="mb-8 text-7xl leading-none" style={display}>
            Films <span className="align-top text-2xl text-[#ff8539]">{films.length}</span>
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
            {films.map((item) => (
              <article key={item.id} className="studio-reveal">
                <PreviewCard item={item} className="rounded-xl" />
                <Meta item={item} />
              </article>
            ))}
          </div>
        </section>

        <section className="studio-reel mt-32 overflow-hidden" aria-labelledby="ads-title">
          <h2 id="ads-title" className="mb-8 px-6 text-7xl leading-none sm:px-16" style={display}>
            Ads <span className="amp">&amp;</span> UGC <span className="align-top text-2xl text-[#ff8539]">{verticals.length}</span>
          </h2>
          <div className="overflow-x-auto pb-4 lg:overflow-visible">
            <div className="studio-reel-track flex w-max snap-x snap-mandatory gap-5 px-6 sm:px-16 lg:snap-none">
            {verticals.map((item) => (
              <article key={item.id} className="w-[58vw] snap-start sm:w-[260px]">
                <PreviewCard item={item} className="rounded-xl" />
                <Meta item={item} />
              </article>
            ))}
            </div>
          </div>
        </section>

        <section className="mt-32 px-6 sm:px-16" aria-labelledby="stills-title">
          <h2 id="stills-title" className="mb-8 text-7xl leading-none" style={display}>
            Campaign stills
          </h2>
          <StillsWall />
        </section>
      </main>
    </MediaViewerProvider>
  );
};

export default Studio;
