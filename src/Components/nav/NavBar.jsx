/*
     FileName: NavBar.jsx
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { styles } from "../../styles.js";
import { navLinks, pageLinks } from "../../Constants/constants";
import { logo, menu, close } from "../../assets";
import { TransitionLink, usePageTransition } from "../motion/PageTransition";
import Magnetic from "../motion/Magnetic";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const lastY = useRef(0);
  const { pathname } = useLocation();
  const go = usePageTransition();
  const onHome = pathname === "/";
  // The AI Slop page is acid lime, so the nav switches to dark ink there.
  const onLight = pathname === "/ai-slop" && !toggle;

  // Slide away while reading down the page, come back on any scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 160 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Underline whichever section fills the middle of the screen.
  useEffect(() => {
    if (!onHome) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    document.documentElement.style.overflow = toggle ? "hidden" : "";
  }, [toggle]);

  const jump = (id) => (e) => {
    e.preventDefault();
    setToggle(false);
    go(`/#${id}`, "Amiya");
  };

  const itemClass = (isActive) =>
    `nav-link relative text-[18px] font-medium ${isActive ? "is-active" : ""}`;

  return (
    <>
      <nav
        className={`${styles.paddingX} fixed top-0 z-[60] flex w-full items-center py-5 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          hidden && !toggle ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto flex w-full items-center justify-between">
          <TransitionLink to="/" label="Amiya" className="flex items-center gap-2" data-cursor="Home">
            <img src={logo} alt="Amiya Islam" className={`h-9 object-contain ${onLight ? "invert" : ""}`} />
          </TransitionLink>
          <ul className="hidden list-none flex-row items-center gap-8 md:flex" style={{ color: onLight ? "#111112" : "#FFFFFF" }}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <Magnetic strength={0.25}>
                  <a href={`/#${link.id}`} onClick={jump(link.id)} className={itemClass(onHome && active === link.id)}>
                    {link.title}
                  </a>
                </Magnetic>
              </li>
            ))}
            {pageLinks.map((link) => (
              <li key={link.to}>
                <Magnetic strength={0.3}>
                  <TransitionLink
                    to={link.to}
                    label={link.title}
                    className={`rounded-full border ${onLight ? "border-[#111112]" : "border-primary-400/60"} px-4 py-1.5 text-[16px] font-medium transition-colors hover:bg-primary-400 hover:text-grayscale-950 ${
                      pathname === link.to ? "bg-primary-400 text-grayscale-950" : ""
                    }`}
                  >
                    {link.title}
                  </TransitionLink>
                </Magnetic>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="relative z-[70] md:hidden"
            onClick={() => setToggle(!toggle)}
            aria-expanded={toggle}
            aria-label={toggle ? "Close menu" : "Open menu"}
          >
            <img className={`h-[28px] ${onLight ? "invert" : ""}`} src={toggle ? close : menu} alt="" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {toggle && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[55] flex flex-col justify-center bg-grayscale-950 px-8"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="flex flex-col gap-1">
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
                        className="block text-6xl leading-[1.05] tracking-wide text-primary-600"
                        style={{ fontFamily: "Morganite Black" }}
                      >
                        {link.title}
                      </a>
                    ) : (
                      <TransitionLink
                        to={link.to}
                        label={link.title}
                        onClick={() => setToggle(false)}
                        className="block text-6xl leading-[1.05] tracking-wide text-grayscale-50"
                        style={{ fontFamily: "Morganite Black" }}
                      >
                        {link.title} ↗
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
