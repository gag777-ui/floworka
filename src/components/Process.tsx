"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Cadrage",
    desc: "On commence par comprendre votre besoin réel, vos contraintes, votre contexte. Un échange de 30 min suffit souvent pour y voir clair.",
  },
  {
    num: "02",
    title: "Design",
    desc: "Maquettes, parcours utilisateur, identité visuelle si besoin — on valide ensemble l&apos;interface avant d&apos;écrire la première ligne de code.",
  },
  {
    num: "03",
    title: "Build",
    desc: "Développement itératif avec des démos régulières. Vous voyez le produit prendre forme et pouvez ajuster en cours de route.",
  },
  {
    num: "04",
    title: "Lancement & suivi",
    desc: "Mise en production soignée, monitoring post-lancement, corrections rapides. Le produit est livré — et suivi.",
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="process" className="py-28 px-6 bg-panel/50" ref={ref} aria-label="Process de travail">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="eyebrow mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Process
        </motion.p>

        <motion.h2
          className="font-display font-bold text-text mb-16"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "clamp(1.875rem, 4.4vw, 2.875rem)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Quatre étapes,{" "}
          <span className="text-aurora">pas une de plus.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="card-ticks relative rounded-xl p-6 overflow-hidden"
              style={{
                background: "linear-gradient(145deg, #0f1729 0%, #0d1322 100%)",
                border: "1px solid rgba(39,223,230,0.12)",
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            >
              <p
                className="font-display font-bold text-5xl mb-4 leading-none select-none"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  background: "linear-gradient(115deg, #27dfe6 0%, #8b7cf6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  opacity: 0.5,
                }}
                aria-hidden="true"
              >
                {step.num}
              </p>
              <h3
                className="font-display font-semibold text-text text-lg mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {step.title}
              </h3>
              <p
                className="text-muted text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: step.desc }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
