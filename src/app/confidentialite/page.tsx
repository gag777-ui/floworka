import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Floworka",
};

export default function Confidentialite() {
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
          Politique de confidentialité
        </h1>

        <div className="prose prose-sm prose-invert max-w-none text-muted leading-relaxed space-y-6">
          <section>
            <h2 className="text-text font-semibold text-lg mb-2">Données collectées</h2>
            <p>
              Lors de l&apos;utilisation du formulaire de contact, nous collectons : nom, adresse email,
              type de projet et message. Ces données sont utilisées uniquement pour répondre à votre demande.
            </p>
          </section>

          <section>
            <h2 className="text-text font-semibold text-lg mb-2">Chatbot</h2>
            <p>
              Les échanges avec le chatbot sont traités via l&apos;API Anthropic (Claude). Les messages
              sont envoyés à des fins de génération de réponse uniquement, sans stockage permanent de notre côté.
            </p>
          </section>

          <section>
            <h2 className="text-text font-semibold text-lg mb-2">Cookies</h2>
            <p>
              Ce site n&apos;utilise pas de cookies à des fins publicitaires ou de tracking tiers.
              Des cookies techniques essentiels au fonctionnement du site peuvent être utilisés.
            </p>
          </section>

          <section>
            <h2 className="text-text font-semibold text-lg mb-2">Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de
              suppression de vos données. Pour exercer ces droits : <a href="mailto:gag_zconcept@hotmail.com" className="text-aurora-cyan hover:underline">gag_zconcept@hotmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-text font-semibold text-lg mb-2">Hébergement des données</h2>
            <p>
              Le site est hébergé par Vercel Inc. (États-Unis). Les emails sont transmis via Resend.
              Ces transferts sont encadrés par les clauses contractuelles types de l&apos;UE.
            </p>
          </section>

          <p className="text-xs text-muted/60 mt-8">Dernière mise à jour : {new Date().getFullYear()}.</p>
        </div>
      </div>
    </div>
  );
}
