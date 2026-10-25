/*
     FileName: Magnetic.jsx
     @version: I
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// Pulls its child toward the pointer while hovered and springs back on leave.

import { useEffect, useRef } from "react";
import { gsap, hasFinePointer, prefersReducedMotion } from "../../lib/gsap";

const Magnetic = ({ children, strength = 0.35, className = "" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return undefined;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
    let box = null;

    const onEnter = () => {
      // Measure once, minus any current pull, so the element's own movement
      // doesn't feed back into where it thinks its centre is.
      const r = el.getBoundingClientRect();
      const dx = Number(gsap.getProperty(el, "x")) || 0;
      const dy = Number(gsap.getProperty(el, "y")) || 0;
      box = { left: r.left - dx, top: r.top - dy, width: r.width, height: r.height };
    };
    const onMove = (e) => {
      if (!box) onEnter();
      xTo((e.clientX - (box.left + box.width / 2)) * strength);
      yTo((e.clientY - (box.top + box.height / 2)) * strength);
    };
    const onLeave = () => {
      box = null;
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.45)", overwrite: true });
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  );
};

export default Magnetic;
