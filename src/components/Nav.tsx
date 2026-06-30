"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Approche", href: "#atelier" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-white/62 transition hover:text-white">
              {link.label}
            </a>
          ))}
          <a href="#contact" className="flow-nav-cta">
            Demarrer
          </a>
        </div>

        <button
          type="button"
          className="flow-menu md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Menu"
        >
          <span />
          <span />
        </button>
      </nav>

      <div id="mobile-menu" className={`flow-mobile-menu md:hidden ${open ? "is-open" : ""}`} aria-hidden={!open}>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}
