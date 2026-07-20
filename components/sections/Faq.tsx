"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDict } from "@/lib/DictProvider";

export default function Faq() {
  const ru = useDict();
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const full = ru.faq.items[active].a;
    const glyphs = "▓▒░#%&@$<>/\\|=+*";
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      const settled = full.slice(0, Math.max(0, i - 6));
      let front = "";
      for (let k = Math.max(0, i - 6); k < Math.min(i, full.length); k++) {
        front +=
          full[k] === " "
            ? " "
            : glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      setTyped(settled + front);
      if (i >= full.length + 6) {
        setTyped(full);
        clearInterval(id);
      }
    }, 16);
    return () => clearInterval(id);
  }, [active]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-q",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.08,
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
        {ru.faq.label}
      </p>
      <h2
        className="text-ink font-bold text-[clamp(2rem,5vw,4.5rem)] leading-none mb-20"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {ru.faq.title}
      </h2>
      <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 items-start">
        <div className="flex flex-col">
          {ru.faq.items.map((item, i) => (
            <div key={i} className="faq-q border-t border-ink/10">
              <button
                type="button"
                onClick={() => setActive(i)}
                className={`w-full text-left py-7 flex items-baseline gap-6 transition-colors duration-300 ${
                  active === i ? "text-accent-bright" : "text-ink/60 hover:text-ink"
                }`}
              >
                <span className="text-xs tabular-nums opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-medium text-[clamp(1.1rem,2vw,1.7rem)] leading-snug"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.q}
                </span>
              </button>
              <div className="md:hidden overflow-hidden">
                {active === i && (
                  <p className="text-ink/65 text-base leading-relaxed pb-7">
                    {typed}
                    <span className="faq-caret">▌</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:block sticky top-24 min-h-[300px] rounded-sm border border-ink/10 bg-bg-soft/60 p-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
          <div key={active} className="faq-scan absolute inset-x-0 top-0 h-16 pointer-events-none" />
          <p className="text-muted text-xs tracking-[0.3em] uppercase mb-6">
            {String(active + 1).padStart(2, "0")} / {ru.faq.items[active].q}
          </p>
          <p className="text-ink/80 text-lg md:text-xl leading-relaxed">
            {typed}
            <span className="faq-caret">▌</span>
          </p>
        </div>
      </div>
    </section>
  );
}
