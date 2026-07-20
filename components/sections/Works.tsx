"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { works } from "@/content/works";
import { usePathname } from "next/navigation";
import { useDict } from "@/lib/DictProvider";

export default function Works() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".work-block").forEach((block) => {
        gsap.fromTo(
          block.querySelector(".work-img"),
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: block,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
        gsap.fromTo(
          block.querySelector(".work-meta"),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (!isTouch) return;
    const videos = Array.from(
      document.querySelectorAll<HTMLVideoElement>(".work-video")
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting && e.intersectionRatio > 0.55) {
            v.style.opacity = "1";
            v.play().catch(() => {});
          } else {
            v.pause();
            v.style.opacity = "0";
          }
        });
      },
      { threshold: [0, 0.55, 1] }
    );
    videos.forEach((v) => {
      v.preload = "metadata";
      io.observe(v);
    });
    return () => io.disconnect();
  }, []);

  const dict = useDict();
  const pathname = usePathname();
  const lang = (["ru", "en", "uz"].includes(pathname.split("/")[1])
    ? pathname.split("/")[1]
    : "ru") as "ru" | "en" | "uz";
  const featured = works.filter((w) => w.featured);

  return (
    <section ref={rootRef} className="relative px-6 md:px-[6vw] py-40">
      <p className="text-muted text-xs tracking-[0.5em] uppercase mb-4">
        {dict.worksSection.label}
      </p>
      <h2
        className="text-ink font-bold text-[clamp(2rem,5vw,4.5rem)] leading-none mb-32"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {dict.worksSection.title}
      </h2>
      <div className="flex flex-col gap-40 md:gap-56">
        {featured.map((w, i) => (
          <a
            key={w.slug}
            href={w.url}
            target="_blank"
            rel="noopener noreferrer"
            className="work-block group relative block"
          >
            <span
              className={`block md:absolute static md:-top-20 ${
                i % 2 === 1 ? "md:left-0" : "md:right-0"
              } text-accent-bright/60 md:text-ink/8 font-black leading-none text-3xl md:text-[clamp(4rem,15vw,13rem)] mb-4 md:mb-0 select-none pointer-events-none`}
              style={{ fontFamily: "var(--font-display)" }}
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div
              className={`relative md:w-[65%] aspect-[16/10] overflow-hidden rounded-sm ${
                i % 2 === 1 ? "md:ml-auto" : ""
              }`}
            >
              <img
                src={w.img}
                alt={w.title}
                loading="lazy"
                className="work-img absolute left-0 top-[-14%] w-full h-[128%] object-cover transition-opacity duration-500 group-hover:opacity-0"
                style={{ objectPosition: w.imgPos ?? "center" }}
              />
              {w.video && (
                <video
                  src={w.video}
                  muted
                  playsInline
                  loop
                  preload="none"
                  aria-hidden
                  className="work-video absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
              )}
              <div className="absolute inset-0 ring-1 ring-inset ring-ink/10 rounded-sm pointer-events-none" />
            </div>
            <div
              className={`work-meta relative mt-8 md:mt-0 md:absolute md:bottom-8 ${
                i % 2 === 1 ? "md:left-0" : "md:right-0"
              } md:w-[38%] bg-bg/85 backdrop-blur-sm border border-ink/10 rounded-sm p-8 md:p-10`}
            >
              {w.metric && (
                <div className="mb-5 pb-5 border-b border-ink/10">
                  <span
                    className="block text-accent-bright font-black leading-none text-[clamp(1.8rem,3.5vw,3rem)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {w.metric}
                  </span>
                  <span className="block text-ink/50 text-sm mt-2">
                    {w.metricLabel?.[lang]}
                  </span>
                </div>
              )}
              <p className="text-accent-bright text-xs tracking-[0.3em] uppercase mb-3">
                {w.tag[lang]}
              </p>
              <h3
                className="text-ink font-bold text-[clamp(1.6rem,3vw,2.6rem)] leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {w.title}
              </h3>
              <p className="text-ink/55 text-base mt-4">{w.desc[lang]}</p>
              <span className="inline-block mt-6 text-muted group-hover:text-accent-bright transition-colors duration-300 text-sm tracking-[0.2em] uppercase">
                {dict.worksSection.live} ↗
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
