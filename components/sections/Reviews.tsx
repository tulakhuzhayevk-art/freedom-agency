"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDict } from "@/lib/DictProvider";

export default function Reviews() {
  const ru = useDict();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".rev-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative px-6 md:px-[10vw] py-40">
      <p className="text-muted text-xs tracking-[0.5em] uppercase mb-4">
        {ru.reviews.label}
      </p>
      <h2
        className="text-ink font-bold text-[clamp(2rem,5vw,4.5rem)] leading-none mb-20"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {ru.reviews.title}
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {ru.reviews.items.map((r, i) => (
          <figure
            key={i}
            className="rev-card relative border border-ink/10 rounded-sm bg-bg-soft/50 p-8 md:p-10"
          >
            <span
              className="block text-accent/50 font-black text-6xl leading-none mb-6"
              style={{ fontFamily: "var(--font-display)" }}
              aria-hidden
            >
              "
            </span>
            <blockquote className="text-ink/80 text-lg leading-relaxed">
              {r.text}
            </blockquote>
            <figcaption className="mt-8 pt-6 border-t border-ink/10">
              <span className="block text-ink text-sm font-medium">{r.name}</span>
              <span className="block text-muted text-sm mt-1">{r.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
