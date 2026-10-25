/*
     FileName: PageTransition.jsx
     @version: II
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// Route changes play a wipe: a colored panel rises over the page with the
// destination's name, the route swaps underneath once its code is loaded,
// and the panel leaves through the top. Use <TransitionLink to="/studio" label="Studio">.
//
// Pages read useEnterDelay() so their own entrance starts as the panel
// clears instead of playing unseen underneath it.

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { gsap, prefersReducedMotion } from "../../lib/gsap";
import { useLenis } from "./SmoothScroll";
import { prefetchRoute } from "../../App/routes";

const TransitionContext = createContext(() => {});
const EnterDelayContext = createContext(0);

export const usePageTransition = () => useContext(TransitionContext);
export const useEnterDelay = () => useContext(EnterDelayContext);

// Each destination gets its own wipe color, so the transition hints at the
// mood of the page you're heading to.
const THEMES = {
  "/": { bg: "#9e6abc", fg: "#ffffff" },
  "/studio": { bg: "#0d0b10", fg: "#f2ead8" },
  "/ai-slop": { bg: "#d2ff00", fg: "#111112" },
};

// How long after the swap the new page's entrance should wait.
const WIPE_ENTER_DELAY = 0.45;

// Move keyboard and screen-reader focus to the new page once it has mounted.
const focusMain = (tries = 20) => {
  const main = document.querySelector("main");
  if (main) main.focus({ preventScroll: true });
  else if (tries > 0) requestAnimationFrame(() => focusMain(tries - 1));
};

export const PageTransitionProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const lenis = useLenis();
  const panel = useRef(null);
  const text = useRef(null);
  const timeline = useRef(null);
  const [enterDelay, setEnterDelay] = useState(0);

  const hidePanel = () => gsap.set(panel.current, { display: "none" });

  // Browser back/forward mid-wipe: let the browser win and drop the wipe.
  useEffect(() => {
    const onPop = () => {
      if (timeline.current?.isActive()) {
        timeline.current.kill();
        hidePanel();
      }
      setEnterDelay(0);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const go = useCallback(
    (to, label, hash) => {
      const path = to.split("#")[0] || "/";
      const target = hash ?? (to.includes("#") ? `#${to.split("#")[1]}` : null);

      const land = () => {
        requestAnimationFrame(() => {
          const el = target ? document.querySelector(target) : null;
          if (lenis) lenis.scrollTo(el ?? 0, { immediate: true, force: true });
          else if (el) el.scrollIntoView();
          else window.scrollTo(0, 0);
          focusMain();
        });
      };

      if (path === location.pathname) {
        if (target && lenis) lenis.scrollTo(target, { duration: 1.2 });
        else if (target) document.querySelector(target)?.scrollIntoView();
        return;
      }

      const ready = prefetchRoute(path);

      // A second click during a wipe jumps straight to the newest destination.
      if (timeline.current?.isActive() || prefersReducedMotion()) {
        timeline.current?.kill();
        hidePanel();
        setEnterDelay(0);
        Promise.resolve(ready).finally(() => {
          navigate(path);
          land();
        });
        return;
      }

      const theme = THEMES[path] ?? THEMES["/"];
      text.current.textContent = label ?? "";
      const tl = gsap.timeline();
      timeline.current = tl;
      tl.set(panel.current, {
        display: "flex",
        backgroundColor: theme.bg,
        color: theme.fg,
        clipPath: "inset(100% 0% 0% 0%)",
      })
        .set(text.current, { yPercent: 110 })
        .to(panel.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "power4.inOut" })
        .to(text.current, { yPercent: 0, duration: 0.4, ease: "power3.out" }, "-=0.3")
        .add(() => {
          // Hold the covered panel until the next page's code has arrived.
          tl.pause();
          Promise.resolve(ready).finally(() => {
            setEnterDelay(WIPE_ENTER_DELAY);
            navigate(path);
            land();
            requestAnimationFrame(() => tl.resume());
          });
        })
        .to(text.current, { yPercent: -110, duration: 0.3, ease: "power3.in" }, "+=0.15")
        .to(panel.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.6, ease: "power4.inOut" }, "-=0.15")
        .add(() => {
          hidePanel();
          // Re-assert focus once the page has fully settled under the wipe.
          if (!document.activeElement || document.activeElement === document.body) focusMain();
        });
    },
    [lenis, location.pathname, navigate]
  );

  return (
    <TransitionContext.Provider value={go}>
      <EnterDelayContext.Provider value={enterDelay}>
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
      </EnterDelayContext.Provider>
    </TransitionContext.Provider>
  );
};

export const TransitionLink = ({ to, label, children, className, onClick, ...rest }) => {
  const go = usePageTransition();
  const path = to.split("#")[0] || "/";
  return (
    <a
      href={to}
      className={className}
      onPointerEnter={() => prefetchRoute(path)}
      onFocus={() => prefetchRoute(path)}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
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
