/*
     FileName: UgcPage.jsx
     @version: I
     Creation: 11/17/2026
     Last modification: 11/17/2026
*/

// /ugc: a page to send brands. My best AI UGC ad in a phone-shaped player,
// what I do as a UGC creator, and two ways forward: get in touch, or see my
// background on the main page. Live on its own (not behind the Beyond switch)
// and kept out of the nav, so recruiters see the career story first.

import SectionHeader from "../Components/SectionHeader";
import { TransitionLink } from "../Components/motion/PageTransition";

const VIDEO = { src: "/media/ugc/ugc-sample.mp4", poster: "/media/ugc/ugc-sample-poster.jpg" };

const SKILLS = [
  { title: "Hooks and scripts", text: "Openers that stop the scroll and scripts that sound like a real person, not an ad." },
  { title: "Consistent AI creators", text: "The same face, voice and setting from the first frame to the last." },
  { title: "Edited for every feed", text: "Vertical, captioned and paced for TikTok, Reels and Shorts." },
];

const UgcPage = () => (
  <main id="main" tabIndex={-1} className="field-ground min-h-[100svh] px-5 pt-28 pb-20 outline-none sm:px-8 lg:pt-32">
    <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
      <div className="flex flex-col gap-8 lg:col-span-6">
        <SectionHeader kicker="AI UGC creator" title="UGC that sells" layout="left">
          I make user-generated-style ads with AI: scripted, voiced, filmed and edited like a real creator's video.
          Here's my best one.
        </SectionHeader>

        <ul className="flex flex-col gap-4">
          {SKILLS.map((s) => (
            <li key={s.title} className="rounded-2xl bg-white/70 p-5">
              <p className="text-compact font-extrabold text-ink">{s.title}</p>
              <p className="mt-1 text-small text-muted">{s.text}</p>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="mailto:iamiya@vt.edu?subject=UGC%20for%20your%20brand"
            className="rounded-full bg-night px-6 py-3.5 text-body font-extrabold text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            Work with me →
          </a>
          <TransitionLink to="/" label="Amiya" className="nav-link pb-0.5 text-body font-semibold text-accent">
            See my background ↗
          </TransitionLink>
        </div>
      </div>

      {/* A phone-shaped frame around the vertical ad; native controls so it plays with sound.
          On phones it comes first, so brands see the ad before the pitch. */}
      <div className="order-first flex justify-center lg:order-none lg:col-span-5 lg:col-start-8">
        <div className="w-full max-w-[340px] rounded-[2.5rem] bg-night p-3 shadow-[0_40px_80px_-30px_rgba(30,20,90,0.55)]">
          <video
            src={VIDEO.src}
            poster={VIDEO.poster}
            controls
            playsInline
            preload="metadata"
            className="aspect-[9/16] w-full rounded-[2rem] bg-black object-cover"
            aria-label="Sample AI UGC ad"
          />
        </div>
      </div>
    </div>
  </main>
);

export default UgcPage;
