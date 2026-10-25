/*
     FileName: Footer.jsx
     @version: I
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// v1's social bar and credit, plus a giant name that rises into view.

import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { socials } from "../Constants/constants";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";
import Magnetic from "./motion/Magnetic";

const Footer = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".footer-char", {
          yPercent: 100,
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
    <footer ref={scope} className="w-full bg-grayscale-950 text-grayscale-50">
      <div className="flex h-[100px] items-center justify-center gap-5 p-6">
        {socials.map((social) => (
          <Magnetic key={social.label} strength={0.5}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="block p-2"
            >
              <FontAwesomeIcon
                className="text-3xl text-grayscale-50 hover:text-primary-400 hover:scale-[1.1] transition-all duration-75"
                icon={social.icon}
              />
            </a>
          </Magnetic>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="flex justify-center overflow-hidden px-4 text-[25vw] leading-[0.8] text-primary-400"
        style={{ fontFamily: "Morganite Black" }}
      >
        {"AMIYA ISLAM".split("").map((char, i) =>
          char === " " ? (
            <span key={i} className="inline-block w-[0.18em]" />
          ) : (
            <span key={i} className="footer-char inline-block">
              {char}
            </span>
          )
        )}
      </div>
      <div className="flex justify-between px-6 py-4 text-xs text-grayscale-50/60" style={{ fontFamily: "Poppins, sans-serif" }}>
        <span>
          Made by <em>Amiya Islam</em>
        </span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;
