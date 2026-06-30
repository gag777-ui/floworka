export default function Manifeste() {
  return (
    <section
      id="manifeste"
      className="relative overflow-hidden py-16 px-6"
      aria-label="Notre manifeste"
      style={{
        background: "linear-gradient(180deg, rgba(39,223,230,0.04) 0%, transparent 100%)",
        borderTop: "1px solid rgba(39,223,230,0.12)",
        borderBottom: "1px solid rgba(139,124,246,0.12)",
      }}
    >
      {/* Ligne aurore en haut */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #27dfe6, #8b7cf6, transparent)" }}
        aria-hidden="true"
      />
      <div className="max-w-5xl mx-auto">
        <p
          className="font-display text-xl md:text-2xl lg:text-[1.75rem] text-center leading-relaxed"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <span className="text-muted">L&apos;automatisation libère de la répétition.</span>{" "}
          <span className="text-text font-medium">La création donne du caractère.</span>{" "}
          <br className="hidden md:block" />
          <span
            style={{
              background: "linear-gradient(115deg, #27dfe6, #45e5a3, #8b7cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 600,
            }}
          >
            Les deux ensemble, c&apos;est un produit qui dure.
          </span>
        </p>
      </div>
      {/* Ligne aurore en bas */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #8b7cf6, #27dfe6, transparent)" }}
        aria-hidden="true"
      />
    </section>
  );
}
