"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDict } from "@/lib/DictProvider";
import ProcessScene from "@/components/fx/ProcessScene";
import { haptic } from "@/lib/haptic";

export default function Process() {
  const ru = useDict();
  const rootRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const lastStep = useRef(-1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>(".proc-step");
      gsap.set(steps, { opacity: 0, y: 30 });
      gsap.set(steps[0], { opacity: 1, y: 0 });

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "+=3200",
        scrub: 0.5,
        pin: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          const stepNow = Math.min(
            steps.length - 1,
            Math.floor(self.progress * steps.length)
          );
          if (stepNow !== lastStep.current) {
            lastStep.current = stepNow;
            haptic(10);
          }
          const active = Math.min(
            steps.length - 1,
            Math.floor(self.progress * steps.length)
          );
          const segLen = 1 / steps.length;
          steps.forEach((el, i) => {
            const local = (self.progress - i * segLen) / segLen;
            const letters = el.querySelectorAll(".proc-letter");
            const desc = el.querySelector(".proc-desc");
            if (local < -0.05 || local > 1.05) {
              gsap.set(el, { opacity: 0 });
              return;
            }
            gsap.set(el, { opacity: 1 });
            const inP = Math.min(1, Math.max(0, local / 0.3));
            const outP = Math.min(1, Math.max(0, (local - 0.85) / 0.15));
            letters.forEach((letter, li) => {
              const wave = Math.min(1, Math.max(0, inP * (letters.length + 4) - li) / 4);
              gsap.set(letter, {
                opacity: wave * (1 - outP),
                y: (1 - wave) * 18,
              });
            });
            if (desc)
              gsap.set(desc, {
                yPercent: (1 - Math.min(1, Math.max(0, (local - 0.12) / 0.25))) * 110 + outP * -110,
              });
          });
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative h-screen overflow-hidden">
      <ProcessScene progressRef={progressRef} />
      <div className="absolute top-16 left-6 md:left-[10vw] z-10">
        <p className="text-muted text-xs tracking-[0.5em] uppercase mb-3">
          {ru.process.label}
        </p>
        <h2
          className="text-ink font-bold text-[clamp(1.8rem,4vw,3.5rem)] leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {ru.process.title}
        </h2>
      </div>
      <div className="absolute inset-x-6 md:inset-x-[10vw] bottom-16 z-10">
        {ru.process.steps.map((step, i) => (
          <div key={i} className="proc-step absolute bottom-0 left-0 max-w-2xl">
            <span
              className="block text-accent-bright font-black leading-none text-[clamp(2.2rem,5.5vw,5rem)] break-keep"
              style={{ fontFamily: "var(--font-display)" }}
              aria-label={step.name}
            >
              {step.name.split("").map((ch, ci) => (
                <span key={ci} className="proc-letter inline-block" aria-hidden>
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </span>
           <span className="block overflow-hidden mt-5">
              <p className="proc-desc text-ink/65 text-lg md:text-xl leading-relaxed">
                {step.desc}
              </p>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
