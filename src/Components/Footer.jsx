/*
     FileName: Footer.jsx
     @version: II
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// The name opens the footer at full width, in the hero's Mario face, so the
// page ends where it began. Ways to reach me and the site's pages sit under it.

import { useRef } from "react";
import { socials } from "../Constants/constants";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";
import { TransitionLink } from "./motion/PageTransition";
import { useLenis, scrollToTarget } from "./motion/SmoothScroll";

const pages = [
  { to: "/", label: "Home" },
  { to: "/studio", label: "Studio" },
  { to: "/ai-slop", label: "AI Slop" },
];

const Footer = () => {
  const scope = useRef(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".footer-char", {
          yPercent: 40,
          ease: "expo.out",
          stagger: 0.04,
          duration: 1.2,
          scrollTrigger: { trigger: scope.current, start: "top 85%" },
        });
      });
    },
    { scope }
  );

  return (
    <footer ref={scope} className="w-full field-deep px-5 pt-14 pb-8 text-white sm:px-8">
      <p
        aria-hidden="true"
        className="flex justify-center overflow-hidden whitespace-nowrap text-mega leading-[0.9] text-white"
        style={{ fontFamily: "SuperMario" }}
      >
        {"Amiya Islam".split("").map((char, i) =>
          char === " " ? (
            <span key={i} className="inline-block w-[0.25em]" />
          ) : (
            <span key={i} className="footer-char inline-block">
              {char}
            </span>
          )
        )}
      </p>
      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <ul className="flex flex-col gap-2 lg:col-span-6">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link pb-1 text-title font-extrabold tracking-[-0.03em] text-orange"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-2 text-body lg:col-span-3 lg:col-start-8">
          {pages.map((page) => (
            <li key={page.to}>
              <TransitionLink to={page.to} label={page.label === "Home" ? "Amiya" : page.label} className="nav-link pb-0.5">
                {page.label}
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12 flex items-center justify-between text-small text-white/75">
        <span>Made by Amiya Islam, {new Date().getFullYear()}</span>
        <button
          type="button"
          onClick={() => {
            scrollToTarget(lenis, 0);
            document.getElementById("main")?.focus({ preventScroll: true });
          }}
          className="nav-link pb-0.5"
        >
          Back to top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
