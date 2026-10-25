/*
     FileName: NavBar.jsx
     @version: IV
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { navLinks, pageLinks } from "../../Constants/constants";
import { logo, menu, close } from "../../assets";
import { TransitionLink, usePageTransition } from "../motion/PageTransition";
import Magnetic from "../motion/Magnetic";

// Desktop shows three words and one action; the phone menu lists everything.
const desktopLinks = [
  { kind: "anchor", id: "about", title: "About" },
  ...pageLinks.map((link) => ({ ...link, kind: "page" })),
];

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);
  const { pathname } = useLocation();
  const go = usePageTransition();
  // Studio is a dark room, so the nav goes light-on-dark there; everywhere
  // else (and in the open phone menu) it is dark ink on a light ground.
  const onDark = pathname === "/studio" && !toggle;

  // Slide away while reading down the page, come back on any scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 160 && y > lastY.current);
      setAtTop(y < 40);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = toggle ? "hidden" : "";
  }, [toggle]);

  const jump = (id) => (e) => {
    e.preventDefault();
    setToggle(false);
    go(`/#${id}`, "Amiya");
  };

  const ink = onDark ? "text-white" : "text-ink";
  // See-through over the home hero so its gradient runs to the top edge; a
  // plain solid bar in each page's own ground once content scrolls under it.
  const bar = toggle
    ? "bg-transparent"
    : { "/studio": "bg-[#0d0b10]", "/ai-slop": "bg-[#d2ff00]" }[pathname] ?? (atTop ? "bg-transparent" : "bg-bg");
  const invertLogo = onDark ? "" : "invert";

  return (
    <>
      <nav
        className={`fixed top-0 z-[60] flex w-full items-center px-5 py-4 ${bar} transition-[transform,background-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:px-8 ${
          hidden && !toggle ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex w-full items-center justify-between">
          <TransitionLink to="/" label="Amiya" className="flex items-center gap-2" data-cursor="Home">
            <img src={logo} alt="Amiya Islam" className={`h-9 object-contain ${invertLogo}`} />
          </TransitionLink>
          <ul className={`hidden list-none flex-row items-center gap-9 text-body font-medium md:flex ${ink}`}>
            {desktopLinks.map((link) => (
              <li key={link.title}>
                <Magnetic strength={0.25}>
                  {link.kind === "anchor" ? (
                    <a href={`/#${link.id}`} onClick={jump(link.id)} className="nav-link pb-1">
                      {link.title}
                    </a>
                  ) : (
                    <TransitionLink
                      to={link.to}
                      label={link.title}
                      className={`nav-link pb-1 ${pathname === link.to ? "is-active" : ""}`}
                    >
                      {link.title}
                    </TransitionLink>
                  )}
                </Magnetic>
              </li>
            ))}
            <li>
              <Magnetic strength={0.3}>
                <a
                  href="/#contact"
                  onClick={jump("contact")}
                  className={`inline-block rounded-full px-5 py-2.5 font-extrabold transition-transform duration-300 hover:-translate-y-0.5 ${
                    onDark ? "bg-white text-night" : "bg-night text-white"
                  }`}
                >
                  Let's talk
                </a>
              </Magnetic>
            </li>
          </ul>
          <button
            type="button"
            className="relative z-[70] md:hidden"
            onClick={() => setToggle(!toggle)}
            aria-expanded={toggle}
            aria-label={toggle ? "Close menu" : "Open menu"}
          >
            <img className={`h-[28px] ${invertLogo}`} src={toggle ? close : menu} alt="" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {toggle && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[55] flex flex-col justify-center bg-bg px-6"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="flex flex-col gap-2">
              {[...navLinks.map((l) => ({ ...l, kind: "anchor" })), ...pageLinks.map((l) => ({ ...l, kind: "page" }))].map(
                (link, i) => (
                  <motion.li
                    key={link.id ?? link.to}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 30, opacity: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    {link.kind === "anchor" ? (
                      <a
                        href={`/#${link.id}`}
                        onClick={jump(link.id)}
                        className="block text-[13vw] leading-[1] font-extrabold tracking-[-0.04em] text-ink"
                      >
                        {link.title}
                      </a>
                    ) : (
                      <TransitionLink
                        to={link.to}
                        label={link.title}
                        onClick={() => setToggle(false)}
                        className="block text-[13vw] leading-[1] font-extrabold tracking-[-0.04em] text-accent"
                      >
                        {link.title}
                      </TransitionLink>
                    )}
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
