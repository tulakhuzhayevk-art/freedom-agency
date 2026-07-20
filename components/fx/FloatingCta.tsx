"use client";

import { useEffect, useState } from "react";
import { useDict } from "@/lib/DictProvider";
import { haptic } from "@/lib/haptic";

export default function FloatingCta() {
  const dict = useDict();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.scrollY + window.innerHeight >
        document.body.scrollHeight - window.innerHeight * 1.6;
      setVisible(window.scrollY > window.innerHeight * 1.5 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <a
        href={dict.contact.url}
        onClick={() => haptic(15)}
        target="_blank"
        rel="noopener noreferrer"
        className="cta-float"
      >
        {dict.contact.button}
      </a>
    </div>
  );
}
