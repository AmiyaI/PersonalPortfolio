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

export const heroOptions = {
  autoPlay: true,

  fullScreen: {
    enable: false,
    zIndex: 0,
  },

  detectRetina: true,
  fpsLimit: 120,

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
      parallax: {
        force: 350,
        smooth: 20,
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
      speed: 0.8,
      outModes: {
        default: 'bounce',
      },
    },
    number: {
      limit: {
        value: 0,
      },
      value: 30,
    },

    opacity: {
      value: { min: 0.4, max: 0.6 },
      animation: {
        count: 0,
        enable: true,
        speed: 0.2,
        decay: 0,
        sync: true,
        destroy: 'none',
        startValue: 'random',
      },
    },

    shape: {
      type: 'character',
      options: {
        character: [
          { fill: true, font: 'Font Awesome 6 Brands', style: '', value: [''], weight: '400' },
          { fill: true, font: 'Font Awesome 6 Brands', style: '', value: [''], weight: '400' },
          { fill: true, font: 'Font Awesome 6 Brands', style: '', value: [''], weight: '400' },
          { fill: true, font: 'Font Awesome 6 Brands', style: '', value: [''], weight: '400' },
        ],
      },
    },

    // v1 wrote random { min 25, max 35 } without a value, which v2 resolved to
    // a 3-25 range. 3-25 is what actually rendered, so that is kept.
    size: {
      value: { min: 3, max: 25 },
      animation: {
        count: 0,
        enable: true,
        speed: 0.2,
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
