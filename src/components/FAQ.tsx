"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Quels types de projets réalisez-vous ?",
    a: "Applications web sur mesure, SaaS, chatbots et assistants IA, sites vitrine, landing pages, design et identité visuelle. L'automatisation est souvent intégrée en soutien selon le besoin.",
  },
  {
    q: "Quels sont les délais habituels ?",
    a: "Ça dépend du périmètre. Un site vitrine peut être livré en 2-3 semaines. Un SaaS MVP prend plutôt 6-10 semaines. On définit le planning ensemble lors du cadrage, et on le respecte.",
  },
  {
    q: "Comment se passe la tarification ?",
    a: "Tout est sur mesure — pas de pack fixe. Le tarif est construit après le cadrage, selon la complexité, le périmètre et la durée estimée. On ne donne jamais de prix ferme sans avoir compris le projet.",
  },
  {
    q: "Je n'ai qu'une idée vague, est-ce que c'est suffisant pour démarrer ?",
    a: "Oui, c'est souvent le meilleur moment pour échanger. Le cadrage sert précisément à transformer une idée floue en périmètre clair. Venez avec votre intention, on structure ensemble.",
  },
  {
    q: "Est-ce que vous assurez le suivi après la mise en ligne ?",
    a: "Oui. La mise en ligne n'est pas la fin du projet. On assure le monitoring, les corrections, et les évolutions — selon les besoins et ce qu'on a défini ensemble.",
  },
];

function FAQItem({ item, idx }: { item: (typeof faqs)[0]; idx: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${idx}`;

  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full flex items-center justify-between text-left py-5 gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
      >
        <span className="font-display font-medium text-text text-base"
          style={{ fontFamily: "var(--font-space-grotesk)" }}>
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-aurora-cyan shrink-0"
          aria-hidden="true"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
            role="region"
            aria-label={item.q}
          >
            <p className="text-muted text-sm leading-relaxed pb-5">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-28 px-6 bg-panel/50" aria-label="Questions fréquentes">
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow mb-4">FAQ</p>

        <h2
          className="font-display font-bold text-text mb-12"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "clamp(1.875rem, 4.4vw, 2.875rem)",
          }}
        >
          Questions{" "}
          <span className="text-aurora">fréquentes.</span>
        </h2>

        <div className="bg-card border border-border rounded-2xl px-6 md:px-8" role="list">
          {faqs.map((item, i) => (
            <FAQItem key={item.q} item={item} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
