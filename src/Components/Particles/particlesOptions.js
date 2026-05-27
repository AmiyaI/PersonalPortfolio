// Hero particle background: floating tech brand glyphs (AWS, Docker, Linux, etc.)
// rendered via the "Font Awesome 6 Brands" webfont (imported in src/App/index.jsx).
// Migrated from tsparticles v2 to v3 (loaded with loadAll for the character shape).
export const heroOptions = {
  fullScreen: { enable: false, zIndex: 0 },
  detectRetina: true,
  fpsLimit: 120,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "bubble",
        parallax: { enable: true, force: 25, smooth: 30 },
      },
      onDiv: [
        { selectors: "#repulse-div", enable: true, mode: "repulse", type: "circle" },
        { selectors: "#repulse-div", enable: true, mode: "bounce", type: "circle" },
        { selectors: "#scroller", enable: true, mode: "repulse", type: "circle" },
        { selectors: "#scroller", enable: true, mode: "bounce", type: "circle" },
      ],
      resize: { enable: true },
    },
    modes: {
      bubble: {
        distance: 100,
        duration: 0.4,
        size: 40,
        opacity: 0.8,
        color: { value: "#cbbde5" },
      },
      repulse: { distance: 200 },
    },
  },
  particles: {
    color: { value: "#ffffff" },
    links: { enable: false },
    collisions: { enable: false },
    move: {
      enable: true,
      speed: 0.8,
      direction: "none",
      outModes: { default: "bounce" },
    },
    number: {
      value: 18,
    },
    opacity: {
      value: { min: 0.2, max: 0.55 },
      animation: { enable: true, speed: 0.2, sync: false },
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
      value: { min: 12, max: 42 },
    },
  },
};
