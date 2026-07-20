import type { Metadata } from "next";
import { Unbounded, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/fx/SmoothScroll";
import Spotlight from "@/components/fx/Spotlight";
import LangGate from "@/components/fx/LangGate";
import { Analytics } from "@vercel/analytics/react";

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "500", "700", "900"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://freedom-agency.art"),
  title: {
    default: "Freedom — сайты, которые продают дорого",
    template: "%s — Freedom",
  },
  description:
    "Freedom — агентство премиальных сайтов, лендингов и ИИ-автоматизации в Ташкенте.",
  keywords: [
    "создание сайтов Ташкент",
    "разработка сайтов Узбекистан",
    "лендинг Ташкент",
    "ИИ автоматизация",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Freedom",
    title: "Freedom — сайты, которые продают дорого",
    description: "Агентство премиальных сайтов и ИИ-автоматизации в Ташкенте.",
  },
  robots: { index: true, follow: true },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${inter.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <Spotlight />
        <LangGate />
        <Analytics />
      </body>
    </html>
  );
}
