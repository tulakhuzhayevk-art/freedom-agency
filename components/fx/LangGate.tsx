"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { LANGS, type Lang } from "@/lib/dict";

export default function LangGate() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem("freedom-lang");
    const current = pathname.split("/")[1];
    if (!saved) {
      setOpen(true);
      return;
    }
    if (saved !== current && LANGS.includes(saved as Lang)) {
      router.replace("/" + saved);
    }
  }, [pathname, router]);

  const choose = (lang: Lang) => {
    localStorage.setItem("freedom-lang", lang);
    const DOE = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };
    if (typeof DOE.requestPermission === "function") {
      DOE.requestPermission().catch(() => {});
    }
    gsap.to(".lang-gate", {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        setOpen(false);
        const current = pathname.split("/")[1];
        if (lang !== current) router.replace("/" + lang);
      },
    });
  };

  if (!open) return null;

  const labels: Record<Lang, string> = {
    ru: "Русский",
    en: "English",
    uz: "O'zbekcha",
  };

  return (
    <div className="lang-gate fixed inset-0 z-[60] bg-bg flex flex-col items-center justify-center gap-12">
      <p
        className="text-ink font-black text-2xl tracking-wide"
        style={{ fontFamily: "var(--font-display)" }}
      >
        FREEDOM
      </p>
      <div className="flex flex-col md:flex-row gap-5">
        {LANGS.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => choose(l)}
            className="border border-ink/15 text-ink/80 px-12 py-5 text-sm tracking-[0.3em] uppercase hover:border-accent hover:text-accent-bright transition-colors duration-300"
          >
            {labels[l]}
          </button>
        ))}
      </div>
    </div>
  );
}
