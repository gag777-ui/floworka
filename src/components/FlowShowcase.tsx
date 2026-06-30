"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FlowShowcase() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const { showcase } = t;

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
          {[...showcase.lanes, ...showcase.lanes].map((lane, index) => (
            <span key={`${lane}-${index}`}>{lane}</span>
          ))}
        </div>
      </div>

      <div className="flow-lab-sticky">
        <div className="flow-lab-copy">
          <p className="flow-kicker">{showcase.kicker}</p>
          <h2 className="flow-heading">{showcase.h2}</h2>
          <p>{showcase.p}</p>
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
            {showcase.nodes.map((label, index) => (
              <motion.div
                key={label}
                className="flow-node"
                style={{ left: ["8%", "34%", "66%", "17%", "48%", "74%"][index], top: ["18%", "9%", "18%", "61%", "47%", "68%"][index] }}
                initial={{ opacity: 0, scale: 0.82 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08, duration: 0.42 }}
              >
                <span>{label}</span>
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
                <strong>{showcase.cockpit.input}</strong>
              </div>
              <div>
                <p>system</p>
                <strong>{showcase.cockpit.system}</strong>
              </div>
              <div>
                <p>output</p>
                <strong>{showcase.cockpit.output}</strong>
              </div>
            </div>
            <div className="flow-console-lines">
              {showcase.consoleLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flow-lab-bottom">
        <div>
          <p className="flow-kicker">{showcase.bottomKicker}</p>
          <h3>{showcase.bottomH3}</h3>
        </div>
        <p>{showcase.bottomP}</p>
      </div>
    </section>
  );
}
