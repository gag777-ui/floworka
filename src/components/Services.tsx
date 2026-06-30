"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 19h8M11 16v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Web",
    title: "Applications web sur mesure",
    desc: "Interfaces métier, dashboards, outils internes — pensés pour durer et évoluer.",
    accent: "#27dfe6",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 2L20 7v8l-9 5-9-5V7l9-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M11 7v8M6 9.5l5 2.5 5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "SaaS",
    title: "SaaS sur mesure",
    desc: "Du MVP au produit complet — architecture solide, itérations rapides, démos régulières.",
    accent: "#2dd4bf",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M4 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7l-4 3V6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8 9h6M8 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "IA",
    title: "Chatbots & assistants IA",
    desc: "Intégrés au site ou aux processus internes — avec une vraie personnalité, pas un bot générique.",
    accent: "#45e5a3",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M3 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 9h8M7 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Vitrine",
    title: "Sites vitrine & landing pages",
    desc: "Finition premium, performance mesurée, conçus pour convertir — pas juste pour faire joli.",
    accent: "#27dfe6",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 2v3M11 17v3M2 11h3M17 11h3M4.93 4.93l2.12 2.12M14.95 14.95l2.12 2.12M4.93 17.07l2.12-2.12M14.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Design",
    title: "Design & identité",
    desc: "Identité visuelle, UI/UX, motion — du logotype à l&apos;interface, cohérent et mémorable.",
    accent: "#8b7cf6",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M4 6h14M4 11h8M4 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="17" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M17 12v2l1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Automation",
    title: "Automatisation & intégrations",
    desc: "Connexion d&apos;outils, workflows automatisés — pour que la machine fasse le répétitif.",
    accent: "#2dd4bf",
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="services" className="py-28 px-6 relative" ref={ref} aria-label="Services"
      style={{ background: "linear-gradient(180deg, #060912 0%, #080e1c 60%, #060912 100%)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="eyebrow mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Ce qu&apos;on fait
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
          Peu de choses, <span className="text-aurora">bien faites.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className="card-ticks group relative rounded-xl p-6 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              style={{
                background: "#0d1322",
                border: `1px solid ${s.accent}22`,
                boxShadow: `0 0 0 0 ${s.accent}00`,
              }}
              whileHover={{
                boxShadow: `0 8px 32px ${s.accent}18`,
                borderColor: `${s.accent}55`,
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
            >
              {/* Glow de fond subtil */}
              <div
                className="absolute top-0 left-0 w-32 h-32 rounded-full pointer-events-none opacity-20"
                style={{
                  background: `radial-gradient(circle, ${s.accent} 0%, transparent 70%)`,
                  transform: "translate(-30%, -30%)",
                  filter: "blur(20px)",
                }}
                aria-hidden="true"
              />
              <div
                className="relative w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: `${s.accent}18`, color: s.accent }}
              >
                {s.icon}
              </div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: s.accent }}>
                {s.label}
              </p>
              <h3 className="font-display font-semibold text-text text-lg mb-2 leading-snug"
                style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {s.title}
              </h3>
              <p
                className="text-muted text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: s.desc }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
