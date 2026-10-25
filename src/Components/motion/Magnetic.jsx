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

    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.35)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.35)" });

    const onMove = (e) => {
      const box = el.getBoundingClientRect();
      xTo((e.clientX - (box.left + box.width / 2)) * strength);
      yTo((e.clientY - (box.top + box.height / 2)) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
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
