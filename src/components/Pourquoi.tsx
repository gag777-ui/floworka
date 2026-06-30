"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const engagements = [
  {
    glyph: "◈",
    title: "Livraison rapide",
    desc: "Pas de mois d&apos;attente pour voir quelque chose. Des démos régulières, un planning respecté.",
  },
  {
    glyph: "◈",
    title: "Niveau produit",
    desc: "Design soigné, code fiable, performance mesurée. Ce qui part en ligne est fait pour durer.",
  },
  {
    glyph: "◈",
    title: "Tout en harmonie",
    desc: "Design, code et identité travaillés ensemble — pas trois prestataires qui ne se parlent pas.",
  },
  {
    glyph: "◈",
    title: "Transparence",
    desc: "Un seul interlocuteur du cadrage au lancement. Vous savez où on en est, toujours.",
  },
];

export default function Pourquoi() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="pourquoi" className="py-28 px-6" ref={ref} aria-label="Pourquoi Floworka">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="eyebrow mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Pourquoi Floworka
        </motion.p>

        <motion.h2
          className="font-display font-bold text-text mb-14"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "clamp(1.875rem, 4.4vw, 2.875rem)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Ce qu&apos;on{" "}
          <span className="text-aurora">s&apos;engage à tenir.</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {engagements.map((e, i) => (
            <motion.div
              key={e.title}
              className="flex gap-5 bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            >
              <span
                className="text-aurora-cyan text-xl shrink-0 mt-0.5"
                aria-hidden="true"
                style={{ background: "linear-gradient(115deg, #27dfe6, #8b7cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                {e.glyph}
              </span>
              <div>
                <h3
                  className="font-display font-semibold text-text text-base mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {e.title}
                </h3>
                <p
                  className="text-muted text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: e.desc }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
