"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useDict } from "@/lib/DictProvider";
import { useGyro } from "@/lib/useGyro";

export default function Hero() {
  const ru = useDict();
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tilt = useGyro();

  useEffect(() => {
    let raf = 0;
    const el = rootRef.current;
    const tick = () => {
      if (el) {
        const v = el.querySelector("video") as HTMLElement | null;
        const h1 = el.querySelector("h1") as HTMLElement | null;
        if (v)
          v.style.transform = `translate(${tilt.current.x * -55}px, ${tilt.current.y * -38}px) scale(1.18)`;
        if (h1)
          h1.style.transform = `translate(${tilt.current.x * 26}px, ${tilt.current.y * 18}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [tilt]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const kick = () => v.play().catch(() => {});
    v.addEventListener("loadedmetadata", kick);
    kick();
    let dir = 1;
    let raf = 0;
    const tick = () => {
      if (v.duration) {
        if (dir === 1 && v.currentTime >= v.duration - 0.05) {
          dir = -1;
          v.pause();
        } else if (dir === -1) {
          v.currentTime = Math.max(0, v.currentTime - 1 / 30);
          if (v.currentTime <= 0.05) {
            dir = 1;
            v.play();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("loadedmetadata", kick);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".fx-line-v", { scaleY: 0 });
      gsap.set(".fx-line-h", { scaleX: 0 });
      gsap.set(".hero-letter", { yPercent: 110, filter: "blur(6px)" });
      gsap.set(".hero-label, .hero-tagline", { opacity: 0, y: 16 });

      const tl = gsap.timeline({ delay: 0.35 });

      tl.to(".fx-line-v", {
        scaleY: 1,
        duration: 0.9,
        ease: "power3.inOut",
        stagger: 0.08,
      })
        .to(
          ".fx-line-h",
          { scaleX: 1, duration: 1.0, ease: "power3.inOut", stagger: 0.1 },
          "-=0.55"
        )
        .to(".hero-letter", {
          yPercent: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.055,
        })
        .to(
          ".fx-line-v",
          { opacity: 0, duration: 0.8, ease: "power2.inOut", stagger: 0.05 },
          "-=0.5"
        )
        .to(
          ".fx-line-h",
          { scaleX: 0, transformOrigin: "left center", duration: 0.9, ease: "power4.inOut" },
          "<"
        )
        .to(".hero-label", { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .to(".hero-tagline", { opacity: 1, y: 0, duration: 0.7 }, "-=0.45");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="hero-scene relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <video
        ref={videoRef}
        src="/hero-movie.mp4"
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        aria-hidden
      />
      <div className="absolute inset-0 bg-bg/55 pointer-events-none" aria-hidden />
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="fx-line-v absolute left-[18%] top-0 h-full w-px bg-ink/12 origin-top" />
        <div className="fx-line-v absolute left-[50%] top-0 h-full w-px bg-ink/12 origin-bottom" />
        <div className="fx-line-v absolute left-[82%] top-0 h-full w-px bg-ink/12 origin-top" />
        <div className="fx-line-h absolute top-[30%] left-0 w-full h-px bg-ink/12 origin-left" />
        <div className="fx-line-h absolute top-[68%] left-0 w-full h-px bg-ink/20 origin-right" />
      </div>
      <p className="hero-label text-muted text-xs tracking-[0.5em] uppercase mb-6">
        {ru.hero.label}
      </p>
      <h1
        className="text-ink font-black leading-none text-[clamp(3rem,12vw,11rem)] whitespace-nowrap"
        style={{ fontFamily: "var(--font-display)" }}
        aria-label={ru.hero.word}
      >
        {ru.hero.word.split("").map((ch, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden>
            <span className="hero-letter inline-block will-change-transform">{ch}</span>
          </span>
        ))}
      </h1>
      <p className="hero-tagline text-muted text-lg mt-8">{ru.hero.tagline}</p>
    </section>
  );
}
