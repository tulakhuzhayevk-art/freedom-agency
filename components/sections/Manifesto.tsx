"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDict } from "@/lib/DictProvider";
import HypnoRings from "@/components/fx/HypnoRings";
import { haptic } from "@/lib/haptic";

export default function Manifesto() {
  const ru = useDict();
  const rootRef = useRef<HTMLElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const speedRef = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const counter = { v: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      tl.to(counter, {
        v: 12000,
        duration: 6,
        ease: "power2.in",
        onUpdate: () => {
          speedRef.current = counter.v / 12000;
          if (numRef.current)
            numRef.current.textContent = Math.round(counter.v).toLocaleString("ru-RU");
        },
      })
        .to(".mani-act1", { scale: 1.6, duration: 6, ease: "power2.in" }, 0)
        .fromTo(
          ".mani-noise-word",
          { opacity: 0, scale: 0.8 },
          { opacity: 0.65, scale: 1, duration: 1.2, stagger: 0.22, ease: "power2.in" },
          0.5
        )
        .to(".mani-act1", {
          opacity: 0,
          duration: 0.25,
          ease: "power4.in",
          onComplete: () => haptic(18),
        })
        .fromTo(
          ".mani-shake",
          { x: 0 },
          {
            keyframes: [
              { x: -7, duration: 0.05 },
              { x: 5, duration: 0.05 },
              { x: -3, duration: 0.05 },
              { x: 0, duration: 0.05 },
            ],
          },
          "+=0.05"
        )
        .fromTo(
          ".mani-punch",
          { opacity: 0 },
          { opacity: 1, duration: 2.5, ease: "power2.out" },
          "+=0.8"
        )
        .fromTo(
          ".mani-resolve-word",
          { yPercent: 110 },
          { yPercent: 0, duration: 1.2, stagger: 0.04, ease: "power3.out" },
          "-=0.8"
        )
        .fromTo(
          ".mani-outro-word",
          { yPercent: 110 },
          { yPercent: 0, duration: 1.4, stagger: 0.1, ease: "power4.out" },
          "-=0.5"
        )
;
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const noise = ru.manifesto.noise;
  const noisePos = [
    "top-[10%] left-[6%] text-2xl", "top-[18%] right-[8%] text-base",
    "top-[72%] left-[10%] text-3xl", "bottom-[12%] right-[12%] text-xl",
    "top-[38%] left-[3%] text-sm", "bottom-[22%] left-[18%] text-lg",
    "top-[6%] left-[28%] text-base", "bottom-[6%] right-[28%] text-2xl",
    "top-[55%] right-[4%] text-lg", "top-[26%] right-[14%] text-sm",
    "bottom-[38%] right-[6%] text-3xl", "top-[80%] left-[32%] text-base",
    "top-[8%] right-[30%] text-xl", "bottom-[20%] left-[5%] text-base",
    "top-[62%] left-[8%] text-xl", "bottom-[4%] left-[52%] text-lg",
  ];

  return (
    <section ref={rootRef} className="relative h-[300vh]">
      <div className="mani-shake sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <div className="mani-act1 absolute inset-0 flex flex-col items-center justify-center">
          <HypnoRings speedRef={speedRef} />
          <p className="text-muted text-xs tracking-[0.5em] uppercase mb-6">
            {ru.manifesto.seenLabel}
          </p>
          <span
            ref={numRef}
            className="text-ink font-black leading-none text-[clamp(4rem,16vw,15rem)] tabular-nums"
            style={{ fontFamily: "var(--font-display)" }}
          >
            0
          </span>
          <p className="text-muted text-xs tracking-[0.5em] uppercase mt-6">
            {ru.manifesto.peopleLabel}
          </p>
          {noise.map((w, i) => (
            <span
              key={i}
              className={`mani-noise-word absolute ${noisePos[i]} ${
                i % 2 === 1 ? "hidden md:block" : ""
              } text-ink/40 tracking-[0.3em] uppercase font-medium`}
            >
              {w}
            </span>
          ))}
        </div>
        <div className="relative flex flex-col items-center text-center px-6">
          <p
            className="mani-punch text-accent-bright font-black leading-none text-[clamp(2.5rem,8vw,7rem)] opacity-0"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {ru.manifesto.punch}
          </p>
          <p
            className="mani-resolve text-ink/75 font-medium text-[clamp(1.3rem,2.6vw,2.2rem)] max-w-4xl leading-snug mt-14"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {ru.manifesto.resolve.split(" ").map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.3em]">
                <span className="mani-resolve-word inline-block">{w}</span>
              </span>
            ))}
          </p>
          <div className="mt-10 inline-block">
            <p
              className="text-ink font-bold text-[clamp(1.8rem,4.5vw,4rem)] leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {ru.manifesto.outro.split(" ").map((w, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.35em]">
                  <span className="mani-outro-word inline-block">{w}</span>
                </span>
              ))}
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
