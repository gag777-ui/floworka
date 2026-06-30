"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LangSwitcher from "@/components/LangSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  const links = [
    { label: t.nav.approach, href: "#atelier" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`flow-nav ${scrolled ? "flow-nav-scrolled" : ""}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Navigation principale">
        <Link href="/" className="flex items-center gap-3" aria-label="Floworka - Accueil">
          <Image src="/floworka-mark-transparent.png" alt="" width={34} height={34} className="h-8 w-8 object-contain" priority />
          <span className="font-display text-sm font-semibold tracking-[0.28em] text-white uppercase">Floworka</span>
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-white/62 transition hover:text-white">
              {link.label}
            </a>
          ))}
          <LangSwitcher />
          <a href="#contact" className="flow-nav-cta">
            {t.nav.start}
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LangSwitcher />
          <a href="#contact" className="flow-nav-cta">
            {t.nav.start}
          </a>
        </div>
      </nav>
    </header>
  );
}
