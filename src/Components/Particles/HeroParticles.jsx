/*
     FileName: HeroParticles.jsx
     @version: II
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/


import ParticlesComponent from "./ParticlesComponent";
import { heroOptions } from "./particlesOptions";

const HeroParticles = () => {
  return (
    <ParticlesComponent
      id="hero-particles"
      className="h-full w-full"
      particlesOptions={heroOptions}
    />
  );
};

export default HeroParticles;
