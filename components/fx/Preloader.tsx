"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = { onDone: () => void };

export default function Preloader({ onDone }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const counter = { v: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => doneRef.current() });

      tl.to(".pre-line", {
        scaleX: 1,
        duration: 2.0,
        ease: "power2.inOut",
      })
        .to(
          counter,
          {
            v: 100,
            duration: 2.0,
            ease: "power2.inOut",
            onUpdate: () => {
              if (numRef.current)
                numRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
            },
          },
          "<"
        )
        .to(".pre-line", { opacity: 1, boxShadow: "0 0 24px rgba(77,124,255,0.9)", duration: 0.25 })
        .to(".pre-top", { yPercent: -100, duration: 0.9, ease: "power4.inOut", delay: 0.1 })
        .to(".pre-bottom", { yPercent: 100, duration: 0.9, ease: "power4.inOut" }, "<")
        .set(rootRef.current, { display: "none" });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="fixed inset-0 z-50">
      <div className="pre-top absolute top-0 left-0 w-full h-1/2 bg-bg" />
      <div className="pre-bottom absolute bottom-0 left-0 w-full h-1/2 bg-bg" />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span
          ref={numRef}
          className="text-muted text-xs tracking-[0.4em] tabular-nums mb-4"
        >
          000
        </span>
        <div
          className="pre-line w-[60vw] h-px bg-accent origin-center opacity-70"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
