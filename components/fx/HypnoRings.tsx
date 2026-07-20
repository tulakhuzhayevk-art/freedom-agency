"use client";

import { useEffect, useRef } from "react";

type Props = { speedRef: React.MutableRefObject<number> };

export default function HypnoRings({ speedRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let rings: number[] = [0.02];
    let spawn = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      const speed = speedRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const maxR = Math.hypot(w, h) / 2;
      ctx.clearRect(0, 0, w, h);

      spawn += 0.008 + speed * 0.05;
      if (spawn >= 1) {
        spawn = 0;
        rings.push(0.02);
      }

      ctx.strokeStyle = "rgba(77,124,255,0.35)";
      for (let i = rings.length - 1; i >= 0; i--) {
        rings[i] *= 1.012 + speed * 0.03;
        const r = rings[i] * maxR;
        const alpha = Math.max(0, 0.4 - rings[i] * 0.35);
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 1 + rings[i] * 2;
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2);
        ctx.stroke();
        if (rings[i] > 1.2) rings.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [speedRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}
