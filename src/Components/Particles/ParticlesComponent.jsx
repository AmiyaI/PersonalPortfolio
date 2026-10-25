/*
     FileName: ParticlesComponent.jsx
     @version: II
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/


import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadTextShape } from "@tsparticles/shape-text";

// The slim bundle covers every mode the hero uses (bubble, parallax, repulse,
// bounce, links, collisions); the text shape draws the brand glyphs.
const initEngine = async (engine) => {
  await loadSlim(engine);
  await loadTextShape(engine);
};

const ParticlesComponent = (props) => {
  const { particlesOptions, className, id } = props;

  return (
    <ParticlesProvider init={initEngine}>
      <Particles
        id={id}
        className={className}
        options={particlesOptions}
      />
    </ParticlesProvider>
  );
};

export default ParticlesComponent;
