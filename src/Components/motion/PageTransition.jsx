/*
     FileName: PageTransition.jsx
     @version: III
     Creation: 10/25/2026
     Last modification: 10/28/2026
*/

// Route changes are instant: the next page's code is fetched (usually already
// prefetched on hover), the route swaps, and the page lands at the top or at
// the linked section. There is no loading panel between pages; each page's
// own entrance is enough. Use <TransitionLink to="/studio#feature">.
//
// useEnterDelay() is kept for pages that time their entrance against a page
// change; with no panel to wait for it is always 0.

import { createContext, useCallback, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { useLenis } from "./SmoothScroll";
import { prefetchRoute } from "../../App/routes";

const TransitionContext = createContext(() => {});

export const usePageTransition = () => useContext(TransitionContext);
export const useEnterDelay = () => 0;

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

  // The label argument is accepted for older call sites; nothing shows it now.
  const go = useCallback(
    (to, _label, hash) => {
      const path = to.split("#")[0] || "/";
      const target = hash ?? (to.includes("#") ? `#${to.split("#")[1]}` : null);

      // The router renders the new page a little after navigate(), so wait a
      // few frames for the target section to exist before scrolling to it.
      const land = (tries = 30) => {
        requestAnimationFrame(() => {
          const el = target ? document.querySelector(target) : null;
          if (target && !el && tries > 0) {
            land(tries - 1);
            return;
          }
          // Lenis still holds the old page's scroll limit until it re-measures.
          lenis?.resize();
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

      Promise.resolve(prefetchRoute(path)).finally(() => {
        navigate(path);
        land();
      });
    },
    [lenis, location.pathname, navigate]
  );

  return <TransitionContext.Provider value={go}>{children}</TransitionContext.Provider>;
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
