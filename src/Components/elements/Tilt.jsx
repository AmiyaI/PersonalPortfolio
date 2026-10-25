/*
     FileName: Tilt.jsx
     @version: II
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// A port of react-tilt 1.0.2, which v1 used and which does not support
// React 19. Same defaults and math; it writes the transform straight to the
// element instead of re-rendering on every mouse move.

import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "../../lib/gsap";

const defaultSettings = {
  reverse: false,
  max: 35,
  perspective: 1000,
  easing: "cubic-bezier(.03,.98,.52,.99)",
  scale: 1.1,
  speed: 1000,
  axis: null,
  reset: true,
};

const Tilt = ({ options, className, style, children }) => {
  const ref = useRef(null);
  const settings = { ...defaultSettings, ...options };
  const reverse = settings.reverse ? -1 : 1;
  const rect = useRef(null);
  const frame = useRef(null);
  const transitionTimeout = useRef(null);

  useEffect(() => () => {
    clearTimeout(transitionTimeout.current);
    cancelAnimationFrame(frame.current);
  }, []);

  const setTransition = () => {
    const el = ref.current;
    clearTimeout(transitionTimeout.current);
    el.style.transition = `${settings.speed}ms ${settings.easing}`;
    transitionTimeout.current = setTimeout(() => {
      el.style.transition = "";
    }, settings.speed);
  };

  // Touch taps fire emulated mouse events that would leave a card stuck tilted.
  const enabled = () => hasFinePointer() && !prefersReducedMotion();

  const onMouseEnter = () => {
    if (!enabled()) return;
    const el = ref.current;
    const box = el.getBoundingClientRect();
    rect.current = { left: box.left, top: box.top, width: el.offsetWidth, height: el.offsetHeight };
    el.style.willChange = "transform";
    setTransition();
  };

  const onMouseMove = (e) => {
    if (!rect.current) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const { left, top, width, height } = rect.current;
      const x = Math.min(Math.max((clientX - left) / width, 0), 1);
      const y = Math.min(Math.max((clientY - top) / height, 0), 1);
      const tiltX = (reverse * (settings.max / 2 - x * settings.max)).toFixed(2);
      const tiltY = (reverse * (y * settings.max - settings.max / 2)).toFixed(2);
      const rotateX = settings.axis === "x" ? 0 : tiltY;
      const rotateY = settings.axis === "y" ? 0 : tiltX;
      if (!ref.current) return;
      ref.current.style.transform = `perspective(${settings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${settings.scale}, ${settings.scale}, ${settings.scale})`;
      frame.current = null;
    });
  };

  const onMouseLeave = () => {
    if (!rect.current) return;
    rect.current = null;
    cancelAnimationFrame(frame.current);
    setTransition();
    if (settings.reset) {
      requestAnimationFrame(() => {
        if (!ref.current) return;
        ref.current.style.transform = `perspective(${settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        ref.current.style.willChange = "";
      });
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

export default Tilt;
