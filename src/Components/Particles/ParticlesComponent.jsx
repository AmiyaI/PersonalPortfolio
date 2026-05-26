import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";

const ParticlesComponent = ({ particlesOptions, className, id }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    initParticlesEngine(async (engine) => {
      await loadAll(engine);
    }).then(() => {
      if (active) setReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!ready) return null;

  return <Particles id={id} className={className} options={particlesOptions} />;
};

export default ParticlesComponent;
