"use client";

import Particles from "react-particles";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";
import { Engine } from "tsparticles-engine";
import { useCallback } from "react";

const FireworkBackground = () => {
  const customInit = useCallback(async (engine: Engine) => {
    await loadFireworksPreset(engine);
  }, []);

  const options = {
    preset: "fireworks",
  };

  return (
    <Particles
      id="tsparticles"
      options={options}
      init={customInit}
      style={{
        position: "fixed", // make it fixed so it stays behind everything
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // push behind all other elements
        pointerEvents: "none", // allow clicks to pass through
      }}
    />
  );
};

export default FireworkBackground;
