/*
     FileName: particlesOptions.js
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

// tsparticles v4 schema. Every number matches what v1 (tsparticles v2) resolved
// to at runtime, measured from the live v1 container, so the hero feels the same.
// Where the v2 option read differently from what it did, the comment says so.

const divInteraction = (selectors) => ({
  selectors,
  enable: true,
  mode: ['repulse', 'bounce'],
  type: 'circle',
});

const heroOptionsBase = {
  autoPlay: true,

  fullScreen: {
    enable: false,
    zIndex: 0,
  },

  detectRetina: true,
  fpsLimit: 60,

  // v1 passed detectsOn: '#hero', which v2 did not recognize, so it fell back
  // to the canvas. The canvas is what the mouse is tracked on.
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onDiv: [divInteraction('#repulse-div')],

      // v2 configured parallax as onHover.parallax; v4 makes it a hover mode.
      onHover: {
        enable: true,
        mode: ['bubble', 'parallax'],
      },
    },

    modes: {
      bounce: {
        distance: 100,
      },
      bubble: {
        distance: 100,
        duration: 0.4,
        size: 40,
        color: {
          value: '#140d26',
        },
        opacity: 8,
        mix: false,
      },
      // Gentler than v1's 350/20: the logos follow the mouse lazily.
      parallax: {
        force: 250,
        smooth: 40,
      },
      repulse: {
        distance: 200,
        factor: 200,
        speed: 1,
        maxSpeed: 50,
      },
    },
  },

  particles: {
    collisions: {
      enable: true,
      mode: 'bounce',
    },
    // White, night and peach glyphs on the purple hero.
    paint: {
      color: {
        value: ['#ffffff', '#140d26', '#ffd2b3'],
      },
    },
    move: {
      angle: {
        offset: 0,
        value: 90,
      },
      center: {
        x: 50,
        y: 50,
        mode: 'percent',
        radius: 0,
      },
      // v1 listed four diagonals; both engines treat a list as "random angle".
      direction: 'none',
      drift: 0,
      enable: true,
      random: false,
      size: false,
      // v1 used 0.8, but this engine runs at the display's refresh rate, so
      // on a 120Hz screen 0.8 drifts visibly faster than the live site did.
      speed: 0.4,
      outModes: {
        default: 'bounce',
      },
    },
    number: {
      limit: {
        value: 0,
      },
      value: 34,
    },

    opacity: {
      value: { min: 0.4, max: 0.6 },
      animation: {
        count: 0,
        enable: true,
        speed: 0.1,
        decay: 0,
        sync: true,
        destroy: 'none',
        startValue: 'random',
      },
    },

    // Half font glyphs (AWS, Docker, Linux, Python, React from Font Awesome
    // Brands), half one-colour SVG marks the brand font doesn't have
    // (Kubernetes, Terraform, OpenAI, Claude, Gemini; simple-icons, CC0, in
    // public/particles). replaceColor paints each SVG in the particle's colour.
    shape: {
      type: ['character', 'image'],
      options: {
        character: [
          { fill: true, font: 'Font Awesome 6 Brands', style: '', value: ['\uf375'], weight: '400' },
          { fill: true, font: 'Font Awesome 6 Brands', style: '', value: ['\uf395'], weight: '400' },
          { fill: true, font: 'Font Awesome 6 Brands', style: '', value: ['\uf17c'], weight: '400' },
          { fill: true, font: 'Font Awesome 6 Brands', style: '', value: ['\uf3e2'], weight: '400' },
          { fill: true, font: 'Font Awesome 6 Brands', style: '', value: ['\uf41b'], weight: '400' },
        ],
        image: ['kubernetes', 'terraform', 'openai', 'claude', 'googlegemini'].map((name) => ({
          src: `/particles/${name}.svg`,
          width: 24,
          height: 24,
          replaceColor: true,
        })),
      },
    },

    // v1 wrote random { min 25, max 35 } without a value, which v2 resolved to
    // a 3-25 range. 3-25 is what actually rendered, so that is kept.
    size: {
      value: { min: 3, max: 25 },
      animation: {
        count: 0,
        enable: true,
        speed: 0.1,
        decay: 0,
        sync: true,
        destroy: 'none',
        startValue: 'random',
      },
    },

    links: {
      blink: false,
      color: {
        value: '#ffffff',
      },
      consent: true,
      distance: 100,
      enable: true,
      frequency: 10,
      opacity: 0.25,
      width: 1,
    },
  },

  resize: {
    delay: 0.5,
    enable: true,
  },
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
  smooth: true,
};

// Reduced motion: the logos stay where they are. Touch screens: fewer of them.
const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const coarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

export const heroOptions = {
  ...heroOptionsBase,
  particles: {
    ...heroOptionsBase.particles,
    move: { ...heroOptionsBase.particles.move, enable: !reduced },
    number: { ...heroOptionsBase.particles.number, value: coarse ? 18 : heroOptionsBase.particles.number.value },
    opacity: { ...heroOptionsBase.particles.opacity, animation: { ...heroOptionsBase.particles.opacity.animation, enable: !reduced } },
    size: { ...heroOptionsBase.particles.size, animation: { ...heroOptionsBase.particles.size.animation, enable: !reduced } },
  },
};
