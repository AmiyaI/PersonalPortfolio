/*
     FileName: PageTransition.jsx
     @version: I
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// Route changes play a wipe: a colored panel rises over the page with the
// destination's name, the route swaps underneath, and the panel leaves
// through the top. Use <TransitionLink to="/studio" label="Studio">.

import { createContext, useCallback, useContext, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { gsap, prefersReducedMotion } from "../../lib/gsap";
import { useLenis } from "./SmoothScroll";

const TransitionContext = createContext(() => {});

export const usePageTransition = () => useContext(TransitionContext);

// Each destination gets its own wipe color, so the transition hints at the
// mood of the page you're heading to.
const THEMES = {
  "/": { bg: "#cbbde5", fg: "#16161b" },
  "/studio": { bg: "#0d0b10", fg: "#f2ead8" },
  "/ai-slop": { bg: "#d2ff00", fg: "#111112" },
};

export const PageTransitionProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const lenis = useLenis();
  const panel = useRef(null);
  const text = useRef(null);
  const busy = useRef(false);

  const go = useCallback(
    (to, label, hash) => {
      if (busy.current) return;
      const path = to.split("#")[0] || "/";
      const target = hash ?? (to.includes("#") ? `#${to.split("#")[1]}` : null);

      const land = () => {
        if (target) {
          requestAnimationFrame(() => {
            const el = document.querySelector(target);
            if (lenis) lenis.scrollTo(el ?? 0, { immediate: true, force: true });
            else el?.scrollIntoView();
          });
        } else if (lenis) {
          lenis.scrollTo(0, { immediate: true, force: true });
        } else {
          window.scrollTo(0, 0);
        }
      };

      if (path === location.pathname) {
        if (target && lenis) lenis.scrollTo(target, { duration: 1.4 });
        else if (target) document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      if (prefersReducedMotion()) {
        navigate(path);
        land();
        return;
      }

      busy.current = true;
      const theme = THEMES[path] ?? THEMES["/"];
      text.current.textContent = label ?? "";
      gsap
        .timeline({
          onComplete: () => {
            busy.current = false;
          },
        })
        .set(panel.current, {
          display: "flex",
          backgroundColor: theme.bg,
          color: theme.fg,
          clipPath: "inset(100% 0% 0% 0%)",
        })
        .set(text.current, { yPercent: 110 })
        .to(panel.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power4.inOut" })
        .to(text.current, { yPercent: 0, duration: 0.5, ease: "power3.out" }, "-=0.25")
        .add(() => {
          lenis?.stop();
          navigate(path);
          land();
          lenis?.start();
        })
        .to(text.current, { yPercent: -110, duration: 0.45, ease: "power3.in" }, "+=0.25")
        .to(panel.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.75, ease: "power4.inOut" }, "-=0.2")
        .set(panel.current, { display: "none" });
    },
    [lenis, location.pathname, navigate]
  );

  return (
    <TransitionContext.Provider value={go}>
      {children}
      <div
        ref={panel}
        aria-hidden="true"
        className="fixed inset-0 z-[150] hidden items-center justify-center overflow-hidden"
      >
        <span
          ref={text}
          className="block text-[22vw] leading-none uppercase tracking-wide"
          style={{ fontFamily: "Morganite Black" }}
        />
      </div>
    </TransitionContext.Provider>
  );
};

export const TransitionLink = ({ to, label, children, className, onClick, ...rest }) => {
  const go = usePageTransition();
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        onClick?.(e);
        go(to, label);
      }}
      {...rest}
    >
      {children}
    </a>
  );
};
