/*
     FileName: ComingSoon.jsx
     @version: I
     Creation: 11/06/2026
     Last modification: 11/06/2026
*/

// What /beyond, /studio and /ai-slop show on the live site until Beyond
// launches (see lib/features.js).

import SectionHeader from "../Components/SectionHeader";
import { TransitionLink } from "../Components/motion/PageTransition";

const ComingSoon = () => (
  <main id="main" tabIndex={-1} className="field-ground flex min-h-[80svh] flex-col items-center justify-center gap-8 px-5 pt-24 outline-none sm:px-8">
    <SectionHeader kicker="Beyond" title="Coming soon" layout="center">
      Films and ads I've made with AI, shirts I've designed, life off the clock and a few hot takes. Putting the finishing touches on it.
    </SectionHeader>
    <TransitionLink to="/" label="Amiya" className="rounded-full bg-night px-6 py-3.5 text-body font-extrabold text-white transition-transform duration-300 hover:-translate-y-0.5">
      Back home →
    </TransitionLink>
  </main>
);

export default ComingSoon;
