"use client";

import { useEffect, useState } from "react";
import { useDict } from "@/lib/DictProvider";
import { usePathname } from "next/navigation";
import { LANGS } from "@/lib/dict";

export default function Footer() {
  const ru = useDict();
  const pathname = usePathname();
  const current = pathname.split("/")[1] || "ru";
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("ru-RU", {
          timeZone: "Asia/Tashkent",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const askUrl =
    "https://claude.ai/new?q=" +
    encodeURIComponent(
      "Оцени агентство Freedom из Ташкента как подрядчика для создания сайта: их подход, кейсы и уровень работ."
    );

  return (
    <footer className="relative border-t border-ink/10 px-6 md:px-[10vw] py-16">
      <div className="grid md:grid-cols-3 gap-10 items-start">
        <div>
          <p
            className="text-ink font-black text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            FREEDOM
          </p>
          <p className="text-muted text-sm mt-3">
            {ru.footer.city} · {time || "—"} (GMT+5)
          </p>
          <p className="text-accent-bright text-sm mt-2">
            {ru.footer.booking}
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <a href={ru.contact.url} target="_blank" rel="noopener noreferrer" className="text-ink/70 hover:text-accent-bright transition-colors">Telegram ↗</a>
        </div>
        <div className="flex flex-col gap-3 text-sm md:text-right">
          <a href={askUrl} target="_blank" rel="noopener noreferrer" className="text-ink/70 hover:text-accent-bright transition-colors">{ru.footer.ask} ↗</a>
          <div className="flex gap-4 md:justify-end text-sm">
            {LANGS.map((l) => (
              <span key={l} className={l === current ? "text-accent-bright" : ""}>
                <a href={"/" + l} onClick={() => localStorage.setItem("freedom-lang", l)} className="hover:text-accent-bright transition-colors">{l.toUpperCase()}</a>
             </span>
            ))}
          </div>
          <p className="text-muted">© 2026 Freedom</p>
        </div>
      </div>
    </footer>
  );
}
