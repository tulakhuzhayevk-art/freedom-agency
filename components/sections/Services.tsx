"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDict } from "@/lib/DictProvider";

export default function Services() {
  const ru = useDict();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".svc-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".svc-grid",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const marquee = ru.services.items.map((i) => i.name).join(" · ") + " · ";

  return (
    <section ref={rootRef} className="relative py-40 overflow-hidden">
      <div className="px-6 md:px-[10vw] mb-10">
        <p className="text-muted text-xs tracking-[0.5em] uppercase mb-4">
          {ru.services.label}
        </p>
        <h2
          className="text-ink font-bold text-[clamp(2rem,5vw,4.5rem)] leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {ru.services.title}
        </h2>
      </div>
      <div className="svc-marquee relative flex whitespace-nowrap mb-16 select-none" aria-hidden>
        <span
          className="svc-marquee-track text-ink/10 font-black text-[clamp(1.4rem,3.5vw,3rem)] leading-none pr-8"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {marquee}
        </span>
        <span
          className="svc-marquee-track text-ink/10 font-black text-[clamp(1.4rem,3.5vw,3rem)] leading-none pr-8"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {marquee}
        </span>
      </div>
      <div className="svc-grid grid md:grid-cols-2 lg:grid-cols-3 gap-5 px-6 md:px-[10vw]">
        {ru.services.items.map((item, i) => (
          <div
            key={i}
            className="svc-card group relative rounded-sm overflow-hidden border border-ink/10 bg-bg-soft aspect-[4/3] md:aspect-[4/4.4] flex flex-col justify-end p-8"
          >
            <img
              src={item.img}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover opacity-45 transition-all duration-700 group-hover:opacity-70 group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
            <div className="relative">
              <span className="text-muted text-xs tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="text-ink font-bold text-[clamp(1.3rem,2vw,1.9rem)] leading-tight mt-2 group-hover:text-accent-bright transition-colors duration-300"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.name}
              </h3>
              <p className="text-ink/55 text-sm mt-3 leading-relaxed">{item.desc}</p>
              <p className="text-accent-bright/80 text-xs tracking-[0.15em] uppercase mt-4">
                {item.stack}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
