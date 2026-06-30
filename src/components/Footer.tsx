import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flow-footer px-5 py-12 sm:px-8" aria-label="Pied de page">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image src="/floworka-mark-transparent.png" alt="" width={34} height={34} className="h-8 w-8 object-contain" />
            <span className="font-display text-sm font-semibold tracking-[0.28em] uppercase text-white">Floworka</span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/52">
            Automatisation & creation. Des interfaces nettes, des flux plus calmes,
            des idees qui arrivent en ligne.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 text-xs text-white/46">
          <Link href="/mentions-legales" className="transition hover:text-white">
            Mentions legales
          </Link>
          <Link href="/confidentialite" className="transition hover:text-white">
            Confidentialite
          </Link>
          <span>2026</span>
        </div>
      </div>
    </footer>
  );
}
