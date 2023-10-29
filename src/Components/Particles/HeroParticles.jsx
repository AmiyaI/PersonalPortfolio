/*
   Template from Sara Echeverria
     @author Amiya Islam
     FileName: HeroParticles.jsx
     @version: I
     Creation: 10/23/2023
     Last modification: 10/23/2023
*/


import ParticlesComponent from "./ParticlesComponent";
import { heroOptions } from "./particlesOptions";

const HeroParticles = () => {
  return (
    <div className="w-full h-screen min-h-[800px]">
      <ParticlesComponent
        id="hero-particles"
        className="w-full h-screen z-0 min-h-[800px]"
        particlesOptions={heroOptions}
      />
    </div>
  );
};

export default HeroParticles;
