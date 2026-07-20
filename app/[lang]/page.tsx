import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Works from "@/components/sections/Works";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Reviews from "@/components/sections/Reviews";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { DictProvider } from "@/lib/DictProvider";
import FloatingCta from "@/components/fx/FloatingCta";
import { getDict, LANGS } from "@/lib/dict";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDict(lang);

  return (
    <DictProvider dict={dict}>
      <main>
        <Hero />
        <Manifesto />
        <Works />
        <Services />
        <Process />
        <Reviews />
        <Faq />
        <Contact />
        <Footer />
      </main>
      <FloatingCta />
    </DictProvider>
  );
}
