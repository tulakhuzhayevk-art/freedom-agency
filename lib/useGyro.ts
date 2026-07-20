"use client";

import { useEffect, useRef } from "react";

export function useGyro() {
  const tilt = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onOrient = (e: DeviceOrientationEvent) => {
      const gx = (e.gamma ?? 0) / 45;
      const gy = (e.beta ?? 0 - 45) / 45;
      tilt.current.x += (Math.max(-1, Math.min(1, gx)) - tilt.current.x) * 0.1;
      tilt.current.y += (Math.max(-1, Math.min(1, gy)) - tilt.current.y) * 0.1;
    };
    window.addEventListener("deviceorientation", onOrient);
    return () => window.removeEventListener("deviceorientation", onOrient);
  }, []);

  return tilt;
}
