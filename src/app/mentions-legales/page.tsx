import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — Floworka",
};

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-ink px-6 py-28">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-muted text-sm hover:text-text transition-colors mb-10 inline-flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M10 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Retour
        </Link>

        <h1
          className="font-display font-bold text-text text-3xl mb-10 mt-6"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Mentions légales
        </h1>

        <div className="prose prose-sm prose-invert max-w-none text-muted leading-relaxed space-y-6">
          <section>
            <h2 className="text-text font-semibold text-lg mb-2">Éditeur du site</h2>
            {/* TODO: Compléter avec les informations légales réelles */}
            <p>[NOM_COMPLET_OU_RAISON_SOCIALE]</p>
            <p>[STATUT_JURIDIQUE] — [NUMÉRO_TVA_SI_APPLICABLE]</p>
            <p>[ADRESSE]</p>
            <p>Email : gag_zconcept@hotmail.com</p>
          </section>

          <section>
            <h2 className="text-text font-semibold text-lg mb-2">Hébergement</h2>
            <p>Vercel Inc.<br />440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
          </section>

          <section>
            <h2 className="text-text font-semibold text-lg mb-2">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, code) est la propriété exclusive
              de Floworka, sauf mention contraire. Toute reproduction sans autorisation préalable est interdite.
            </p>
          </section>

          <section>
            <h2 className="text-text font-semibold text-lg mb-2">Limitation de responsabilité</h2>
            <p>
              Floworka s&apos;efforce de maintenir les informations de ce site à jour. Cependant, Floworka
              ne saurait être tenu responsable d&apos;erreurs, d&apos;omissions ou des résultats obtenus
              suite à l&apos;utilisation de ces informations.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
