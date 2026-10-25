/*
     FileName: Cursor.jsx
     @version: I
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// A lilac dot plus a trailing ring. Over anything with data-cursor="label"
// the ring grows and shows the label ("Play", "View", "Drag"); over plain
// links and buttons it just swells. Mouse and trackpad only.

import { useEffect, useRef } from "react";
import { gsap, hasFinePointer, prefersReducedMotion } from "../../lib/gsap";

const INTERACTIVE = "a, button, [role='button'], input[type='submit'], [data-cursor]";

const Cursor = () => {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!hasFinePointer()) return undefined;

    const reduced = prefersReducedMotion();
    const ringDuration = reduced ? 0 : 0.45;
    const dotX = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const dotY = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });
    const ringX = gsap.quickTo(ring.current, "x", { duration: ringDuration, ease: "power3" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: ringDuration, ease: "power3" });
    let current = null;
    let shown = false;
    const last = { x: -1, y: -1 };

    const setState = (target) => {
      if (target === current) return;
      current = target;
      const text = target?.closest("[data-cursor]")?.dataset.cursor || "";
      label.current.textContent = text;
      gsap.to(ring.current, {
        scale: text ? 2.6 : target ? 1.6 : 1,
        backgroundColor: text ? "rgba(203, 189, 229, 0.95)" : "rgba(203, 189, 229, 0)",
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(label.current, { opacity: text ? 1 : 0, duration: 0.2 });
      gsap.to(dot.current, { scale: target ? 0 : 1, duration: 0.2 });
    };

    const onMove = (e) => {
      if (!shown) {
        shown = true;
        gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY });
        gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });
      }
      last.x = e.clientX;
      last.y = e.clientY;
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      setState(e.target.closest?.(INTERACTIVE) ?? null);
    };
    // Scrolling moves content under a still pointer, so re-check what's there.
    let scrollFrame = 0;
    const onScroll = () => {
      if (!shown || scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        const el = document.elementFromPoint(last.x, last.y);
        setState(el?.closest?.(INTERACTIVE) ?? null);
      });
    };
    const onLeave = () => {
      shown = false;
      gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 });
    };
    const ringScale = () => {
      const text = current?.closest?.("[data-cursor]")?.dataset.cursor;
      return text ? 2.6 : current ? 1.6 : 1;
    };
    const onDown = () => gsap.to(ring.current, { scale: ringScale() * 0.8, duration: 0.15 });
    const onUp = () => {
      const target = current;
      current = undefined;
      setState(target);
    };

    document.documentElement.classList.add("has-custom-cursor");
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(scrollFrame);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[200]">
      <div ref={ring} className="cursor-ring">
        <span ref={label} className="cursor-label" />
      </div>
      <div ref={dot} className="cursor-dot" />
    </div>
  );
};

export default Cursor;
