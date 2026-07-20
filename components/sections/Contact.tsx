"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDict } from "@/lib/DictProvider";

export default function Contact() {
  const ru = useDict();
  const rootRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-line",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.0,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const btn = btnRef.current;
      if (!btn) return;
      const onMove = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4 });
      };
      const onLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
      };
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      return () => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
      };
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      <img
        src="/textures/contact-bg.png"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="relative flex flex-col items-center text-center">
        <h2
          className="text-ink font-black leading-none text-[clamp(2.6rem,8.5vw,7.5rem)] text-left"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {ru.contact.lines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span
                className={`contact-line block ${
                  i === ru.contact.lines.length - 1 ? "text-accent-bright" : ""
                }`}
              >
                {line}
              </span>
            </span>
          ))}
        </h2>
        <a
          ref={btnRef}
          href={ru.contact.url}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-btn"
        >
          {ru.contact.button}
        </a>
      </div>
    </section>
  );
}
