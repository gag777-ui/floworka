"use client";

import Image from "next/image";
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import FlowShowcase from "@/components/FlowShowcase";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main className="overflow-hidden">
        <section
          id="hero"
          className="flow-hero relative min-h-[100svh] px-5 pt-28 pb-10 sm:px-8"
          aria-label="Introduction Floworka"
        >
          <div className="flow-noise" aria-hidden="true" />
          <div className="flow-hero-grid mx-auto grid min-h-[calc(100svh-9rem)] max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative z-10">
              <div className="brand-mark mb-8">
                <Image
                  src="/floworka-mark-transparent.png"
                  alt="Floworka"
                  width={86}
                  height={86}
                  priority
                  className="h-16 w-16 object-contain sm:h-20 sm:w-20"
                />
                <div>
                  <p className="brand-name">Floworka</p>
                  <p className="brand-subtitle">{t.hero.brandSubtitle}</p>
                </div>
              </div>

              <p className="flow-kicker">{t.hero.kicker}</p>
              <h1 className="flow-title">{t.hero.h1}</h1>
              <p className="flow-lead">{t.hero.lead}</p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="flow-button flow-button-primary">
                  {t.hero.ctaPrimary}
                </a>
                <a href="#atelier" className="flow-button flow-button-ghost">
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </div>

            <div className="flow-orbit-wrap relative z-0" aria-hidden="true">
              <div className="flow-orbit">
                <span className="flow-orbit-ring flow-orbit-ring-a" />
                <span className="flow-orbit-ring flow-orbit-ring-b" />
                <span className="flow-orbit-ring flow-orbit-ring-c" />
                <span className="flow-orbit-core" />
                <span className="flow-orbit-scan" />
              </div>
              <div className="flow-console">
                {t.hero.console.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FlowShowcase />

        <section className="flow-campaign px-5 py-24 sm:px-8" aria-label="Campagne visuelle Floworka">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="flow-kicker">{t.campaign.kicker}</p>
              <h2 className="flow-heading">{t.campaign.h2}</h2>
              <p className="flow-section-copy">{t.campaign.p}</p>
            </div>
            <div className="flow-campaign-visual">
              <Image
                src="/floworka-instagram-puzzle.png"
                alt={t.campaign.imgAlt}
                width={1200}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section id="atelier" className="flow-section px-5 py-24 sm:px-8" aria-label="Approche">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="flow-kicker">{t.atelier.kicker}</p>
                <h2 className="flow-heading">{t.atelier.h2}</h2>
              </div>
              <p className="flow-section-copy">{t.atelier.p}</p>
            </div>

            <div className="flow-rail mt-16">
              {t.atelier.steps.map((item) => (
                <article className="flow-step" key={item.label}>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="flow-matter px-5 py-24 sm:px-8" aria-label="Matiere construite">
          <div className="mx-auto max-w-7xl">
            <div className="flow-matter-head">
              <p className="flow-kicker">{t.matter.kicker}</p>
              <h2 className="flow-heading">{t.matter.h2}</h2>
            </div>
            <div className="flow-matter-grid">
              {t.matter.blocks.map((block, index) => (
                <div className="flow-matter-tile" key={index}>
                  <span>0{index + 1}</span>
                  <p>{block}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flow-strip px-5 py-20 sm:px-8" aria-label="Ce que Floworka apporte">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="flow-symbol" aria-hidden="true">
              <Image src="/floworka-mark-transparent.png" alt="" width={280} height={280} className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="flow-kicker">{t.strip.kicker}</p>
              <div className="flow-lines">
                {t.strip.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
