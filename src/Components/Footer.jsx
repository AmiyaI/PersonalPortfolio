/*
     FileName: Footer.jsx
     @version: III
     Creation: 10/25/2026
     Last modification: 10/27/2026
*/

// Small and quiet, like the original site: three icons and a signature, on
// the deep indigo the contact gradient settles into.

import { socials } from "../Constants/constants";
import { socialIcons } from "./socialIcons";
import { useLenis, scrollToTarget } from "./motion/SmoothScroll";

const Footer = () => {
  const lenis = useLenis();

  return (
    <footer className="footer-ground w-full px-5 pt-6 pb-10 text-white sm:px-8">
      <div className="flex flex-col items-center gap-5">
        <ul className="flex items-center gap-7">
          {socials.map((social) => {
            const icon = socialIcons[social.label];
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  data-cursor={social.label}
                  className="block text-white/85 transition-[color,translate] duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-1 hover:text-white"
                >
                  <svg viewBox={icon.viewBox} className="h-7 w-7 fill-current" aria-hidden="true">
                    <path d={icon.d} />
                  </svg>
                </a>
              </li>
            );
          })}
        </ul>
        <p className="flex items-center gap-3 text-small text-white/70">
          <span>Made by Amiya Islam, {new Date().getFullYear()}</span>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            onClick={() => {
              scrollToTarget(lenis, 0);
              document.getElementById("main")?.focus({ preventScroll: true });
            }}
            className="nav-link pb-0.5"
          >
            Back to top ↑
          </button>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
