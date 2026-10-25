/*
     FileName: HeroText.jsx
     @version: II
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";
import { useIntroDone } from "./Preloader";
import { roles } from "../Constants/constants";

const HeroText = () => {
  const name = "Amiya ?";
  const scope = useRef(null);
  const role = useRef(null);
  const introDone = useIntroDone();

  // Letters wait, hidden, until the preloader's curtain opens.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set(".who-char", { yPercent: -160, opacity: 0, rotate: () => gsap.utils.random(-30, 30) });
        gsap.set(".name-char", { scale: 0, opacity: 0 });
        gsap.set(".hero-role", { opacity: 0, y: 20 });
      });
    },
    { scope }
  );

  useGSAP(
    () => {
      if (!introDone) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ delay: 0.15 });
        tl.to(".who-char", {
          yPercent: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.9,
          ease: "bounce.out",
          stagger: 0.06,
        })
          .to(
            ".name-char",
            { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(3)", stagger: { each: 0.07, from: "center" } },
            "-=0.6"
          )
          .to(".hero-role", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.2");

        // Cycle the role line through each title with a scramble.
        let i = 0;
        const cycle = gsap.timeline({ repeat: -1, delay: tl.duration() + 1.6 });
        roles.forEach(() => {
          cycle.to(role.current, {
            duration: 1.1,
            scrambleText: { text: roles[++i % roles.length], chars: "AMIYA01_/<>", speed: 0.6 },
            ease: "none",
          }).to({}, { duration: 2.2 });
        });
      });
    },
    { scope, dependencies: [introDone] }
  );

  return (
    <div
      ref={scope}
      className="noselect pointer-events-auto w-fit h-fit text-grayscale-50 absolute z-10 flex flex-col justify-center items-center rounded-[50%]"
      id="repulse-div"
    >
      <h1
        className="text-center flex justify-center items-center flex-col opacity-100 text-[14vw] sm:text-9xl cursor-default"
        style={{ fontFamily: "SuperMario" }}
      >
        <span aria-hidden="true">
          {"Who's".split("").map((char, index) => (
            <span key={index} className="who-char inline-block">
              {char}
            </span>
          ))}{" "}
        </span>
        <span aria-hidden="true" className="whitespace-nowrap">
          {name.split("").map((char, index) => {
            if (char === " ") {
              return " ";
            }
            return (
              <span key={index} className="name-char inline-block">
                <span className="text-primary-400 bounce" style={{ fontSize: "1.2em" }}>
                  {char}
                </span>
              </span>
            );
          })}
        </span>
        <span className="sr-only">Who's Amiya?</span>
      </h1>
      <p className="hero-role mt-4 flex items-center gap-3 text-sm tracking-[0.3em] uppercase text-primary-400 sm:text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
        <span className="h-px w-8 bg-primary-400/60" />
        <span ref={role} className="min-w-[16ch] text-center">{roles[0]}</span>
        <span className="h-px w-8 bg-primary-400/60" />
      </p>
    </div>
  );
};

export default HeroText;
