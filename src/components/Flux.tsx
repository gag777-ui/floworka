"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const nodes = [
  { num: "01", title: "Idée / besoin", desc: "Une intention, un problème ou une vision à concrétiser." },
  { num: "02", title: "Cadrage & design", desc: "On clarifie le périmètre, on conçoit l&apos;interface avant de coder." },
  { num: "03", title: "Build", desc: "Développement itératif, démos régulières, ajustements en temps réel." },
  { num: "04", title: "Mise en ligne", desc: "Déploiement soigné, tests finaux, passage en production." },
  { num: "05", title: "Suivi & amélioration", desc: "Monitoring, corrections, évolutions — le produit vit et évolue." },
];

export default function Flux() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="flux" className="py-28 px-6 bg-panel/50" ref={ref} aria-label="Notre processus">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="eyebrow mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Comment ça marche
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
          De l&apos;idée au{" "}
          <span className="text-aurora">produit en ligne.</span>
        </motion.h2>

        {/* Desktop : flux horizontal */}
        <div className="hidden lg:flex items-start gap-0 relative">
          {/* Ligne de connexion */}
          <div className="absolute top-8 left-[calc(10%+16px)] right-[calc(10%+16px)] h-px bg-border z-0" aria-hidden="true" />

          {/* Point lumineux animé */}
          <motion.div
            className="absolute top-[28px] w-3 h-3 rounded-full z-10"
            style={{
              background: "linear-gradient(115deg, #27dfe6, #8b7cf6)",
              boxShadow: "0 0 12px #27dfe6",
              marginTop: "-4px",
            }}
            animate={isInView ? { left: ["10%", "88%"] } : { left: "10%" }}
            transition={{ duration: 3.5, delay: 0.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5 }}
            aria-hidden="true"
          />

          {nodes.map((node, i) => (
            <motion.div
              key={node.num}
              className="flex-1 flex flex-col items-center text-center px-3 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              {/* Nœud */}
              <div className="w-8 h-8 rounded-full border border-aurora-cyan/50 bg-ink flex items-center justify-center mb-4">
                <span className="text-aurora-cyan text-xs font-bold">{node.num}</span>
              </div>
              <h3
                className="font-display font-semibold text-text text-sm mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {node.title}
              </h3>
              <p
                className="text-muted text-xs leading-relaxed"
                dangerouslySetInnerHTML={{ __html: node.desc }}
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile : flux vertical */}
        <div className="lg:hidden flex flex-col gap-0">
          {nodes.map((node, i) => (
            <motion.div
              key={node.num}
              className="flex gap-5 pb-8 relative"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            >
              {/* Ligne verticale + nœud */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-8 h-8 rounded-full border border-aurora-cyan/50 bg-ink flex items-center justify-center shrink-0">
                  <span className="text-aurora-cyan text-xs font-bold">{node.num}</span>
                </div>
                {i < nodes.length - 1 && (
                  <div className="flex-1 w-px bg-border mt-2" />
                )}
              </div>
              <div className="pt-1 pb-4">
                <h3
                  className="font-display font-semibold text-text mb-1.5"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {node.title}
                </h3>
                <p
                  className="text-muted text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: node.desc }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
