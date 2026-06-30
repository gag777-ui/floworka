"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const nodes = [
  { label: "Brief", x: "8%", y: "18%" },
  { label: "Tri", x: "34%", y: "9%" },
  { label: "IA", x: "66%", y: "18%" },
  { label: "App", x: "17%", y: "61%" },
  { label: "Auto", x: "48%", y: "47%" },
  { label: "Live", x: "74%", y: "68%" },
];

const lanes = [
  "site qui convertit",
  "outil interne",
  "assistant IA",
  "workflow automatise",
  "interface claire",
  "lancement propre",
];

const consoleLines = [
  "capture besoin brut",
  "detecte friction principale",
  "dessine parcours utile",
  "connecte outils existants",
  "livre version utilisable",
];

export default function FlowShowcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);
  const panelY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const lineScale = useTransform(scrollYProgress, [0.18, 0.68], [0.18, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.2, 0.95, 0.34]);

  return (
    <section ref={ref} className="flow-lab" aria-label="Moteur Floworka">
      <div className="flow-marquee" aria-hidden="true">
        <div>
          {[...lanes, ...lanes].map((lane, index) => (
            <span key={`${lane}-${index}`}>{lane}</span>
          ))}
        </div>
      </div>

      <div className="flow-lab-sticky">
        <div className="flow-lab-copy">
          <p className="flow-kicker">Le moteur sous le capot</p>
          <h2 className="flow-heading">On ne pose pas juste une belle page. On installe un flux.</h2>
          <p>
            Chaque projet est pense comme une petite machine : une entree confuse, un parcours clair,
            des actions qui partent seules, et une sortie que vos clients ou votre equipe comprennent
            instantanement.
          </p>
        </div>

        <motion.div className="flow-engine" style={{ y: panelY }}>
          <motion.div className="flow-engine-glow" style={{ opacity: glowOpacity }} />
          <motion.div className="flow-engine-orb" style={{ y: orbY }}>
            <span />
            <span />
            <span />
          </motion.div>

          <div className="flow-map">
            <motion.div className="flow-map-line flow-map-line-a" style={{ scaleX: lineScale }} />
            <motion.div className="flow-map-line flow-map-line-b" style={{ scaleX: lineScale }} />
            <motion.div className="flow-map-line flow-map-line-c" style={{ scaleX: lineScale }} />
            {nodes.map((node, index) => (
              <motion.div
                key={node.label}
                className="flow-node"
                style={{ left: node.x, top: node.y }}
                initial={{ opacity: 0, scale: 0.82 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08, duration: 0.42 }}
              >
                <span>{node.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="flow-cockpit">
            <div className="flow-cockpit-top">
              <span />
              <span />
              <span />
            </div>
            <div className="flow-cockpit-grid">
              <div>
                <p>input</p>
                <strong>idee brute</strong>
              </div>
              <div>
                <p>systeme</p>
                <strong>workflow</strong>
              </div>
              <div>
                <p>sortie</p>
                <strong>outil vivant</strong>
              </div>
            </div>
            <div className="flow-console-lines">
              {consoleLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flow-lab-bottom">
        <div>
          <p className="flow-kicker">Ce que ca change</p>
          <h3>Le site devient une piece du systeme, pas une affiche oubliee.</h3>
        </div>
        <p>
          Formulaire, assistant, tableau de bord, automatisation, relance, notification, base de donnees :
          on choisit seulement les briques qui creent un vrai mouvement.
        </p>
      </div>
    </section>
  );
}
