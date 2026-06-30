"use client";

import { motion } from "framer-motion";
import { type Lang } from "@/lib/i18n";
import { useLanguage } from "@/contexts/LanguageContext";

const LANGS: Lang[] = ["fr", "en", "ru"];

export default function LangSwitcher() {
  const { lang, setLang } = useLanguage();
  const idx = LANGS.indexOf(lang);

  const cycle = () => setLang(LANGS[(idx + 1) % LANGS.length]);

  return (
    <button
      onClick={cycle}
      aria-label={`Langue : ${lang.toUpperCase()} — cliquer pour changer`}
      className="relative flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold tracking-wider uppercase transition-colors hover:bg-white/8"
      style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}
    >
      {/* Drum-roll strip */}
      <span
        className="overflow-hidden"
        style={{ height: "1.1em", width: "1.8em", position: "relative", display: "inline-block" }}
      >
        <motion.span
          animate={{ y: `-${idx * 1.1}em` }}
          transition={{ type: "spring", stiffness: 340, damping: 28 }}
          style={{ position: "absolute", top: 0, left: 0, right: 0, lineHeight: "1.1em" }}
        >
          {LANGS.map((l) => (
            <span
              key={l}
              style={{
                display: "block",
                height: "1.1em",
                lineHeight: "1.1em",
                color: l === lang ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.35)",
              }}
            >
              {l.toUpperCase()}
            </span>
          ))}
        </motion.span>
      </span>

      {/* Chevron indicator */}
      <svg width="8" height="10" viewBox="0 0 8 10" fill="none" aria-hidden="true">
        <path d="M4 1L4 9M1.5 3.5L4 1L6.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        <path d="M4 9L1.5 6.5M4 9L6.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      </svg>
    </button>
  );
}
