/*
     FileName: ParticlesComponent.jsx
     @version: III
     Creation: 10/23/2023
     Last modification: 10/28/2026
*/


import { useEffect, useRef } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadTextShape } from "@tsparticles/shape-text";

// The slim bundle covers every mode the hero uses (bubble, parallax, repulse,
// bounce, links, collisions); the text shape draws the brand glyphs.
const initEngine = async (engine) => {
  await loadSlim(engine);
  await loadTextShape(engine);
};

// The engine reads devicePixelRatio once, at start. Browser zoom or moving the
// window to a screen with a different density changes it, and the stale ratio
// leaves the particles crowded into part of the canvas at the wrong size; a
// wider window likewise scales them up. Restarting the container re-reads the
// ratio and spreads them out again at their normal size. Width only, so phone
// address bars sliding in and out while scrolling don't restart them.
const useRefreshOnScreenChange = (container) => {
  useEffect(() => {
    let query;
    let timer = 0;
    let width = window.innerWidth;
    const refresh = () => container.current?.refresh();
    const onRatio = () => {
      refresh();
      listen();
    };
    const listen = () => {
      query = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      query.addEventListener("change", onRatio, { once: true });
    };
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (window.innerWidth === width) return;
        width = window.innerWidth;
        refresh();
      }, 400);
    };
    listen();
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      query?.removeEventListener("change", onRatio);
      window.removeEventListener("resize", onResize);
    };
  }, [container]);
};

const ParticlesComponent = (props) => {
  const { particlesOptions, className, id } = props;
  const container = useRef(null);
  useRefreshOnScreenChange(container);

  return (
    <ParticlesProvider init={initEngine}>
      <Particles
        id={id}
        className={className}
        options={particlesOptions}
        particlesLoaded={(loaded) => {
          container.current = loaded;
        }}
      />
    </ParticlesProvider>
  );
};

export default ParticlesComponent;
