// Hero particle background: floating tech brand glyphs (AWS, Docker, Linux, etc.)
// rendered via the "Font Awesome 6 Brands" webfont (imported in src/App/index.jsx).
// Migrated from tsparticles v2 to v3 (loaded with loadAll for the character shape).
export const heroOptions = {
  fullScreen: { enable: false, zIndex: 0 },
  detectRetina: true,
  fpsLimit: 120,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "bubble" },
      resize: { enable: true },
    },
    modes: {
      bubble: {
        distance: 220,
        duration: 2,
        size: 42,
        opacity: 0.85,
        color: { value: "#cbbde5" },
      },
      repulse: { distance: 200 },
    },
  },
  particles: {
    color: { value: "#ffffff" },
    links: {
      enable: true,
      color: "#ffffff",
      distance: 110,
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.8,
      direction: "none",
      outModes: { default: "bounce" },
    },
    number: {
      value: 26,
      density: { enable: true },
    },
    opacity: {
      value: { min: 0.35, max: 0.6 },
      animation: { enable: true, speed: 0.3, sync: false },
    },
    shape: {
      type: "character",
      options: {
        character: [
          { value: "", font: "Font Awesome 6 Brands", style: "", weight: "400", fill: true },
          { value: "", font: "Font Awesome 6 Brands", style: "", weight: "400", fill: true },
          { value: "", font: "Font Awesome 6 Brands", style: "", weight: "400", fill: true },
          { value: "", font: "Font Awesome 6 Brands", style: "", weight: "400", fill: true },
        ],
      },
    },
    size: {
      value: { min: 16, max: 28 },
    },
  },
};
