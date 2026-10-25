/*
     FileName: gsap.js
     @version: I
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// One place to register GSAP plugins so every component gets the same setup.

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP);

// Motion runs only when the visitor hasn't asked their OS to reduce it.
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// Shared motion vocabulary, so every section moves with the same feel.
export const EASE = { out: "expo.out", soft: "power3.out", inOut: "power4.inOut" };
export const DUR = { sm: 0.5, md: 0.8, lg: 1.1 };
export const START = { section: "top 85%", item: "top 90%" };

// Many images finishing at once would each force a full re-measure; batch them.
let refreshTimer = 0;
export const refreshSoon = () => {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
};

export { gsap, ScrollTrigger, SplitText, useGSAP };
