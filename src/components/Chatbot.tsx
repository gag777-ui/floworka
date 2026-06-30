"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Quels types de projets réalisez-vous ?",
  "Quels sont vos délais ?",
  "Comment démarrer un projet ?",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [suggestionsUsed, setSuggestionsUsed] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = async (text: string) => {
    if (!text.trim() || typing) return;
    setSuggestionsUsed(true);

    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });

      if (!res.ok || !res.body) throw new Error("Erreur réseau");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          const content = last?.role === "assistant" ? last.content + chunk : chunk;
          copy[copy.length - 1] = { role: "assistant", content };
          return copy;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Une erreur s'est produite. Utilisez le formulaire de contact pour me joindre directement.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_0_28px_rgba(39,223,230,0.4)]"
        style={{
          background: "linear-gradient(135deg, #27dfe6, #8b7cf6)",
          boxShadow: "0 0 20px rgba(39,223,230,0.25)",
        }}
        aria-label={open ? "Fermer le chatbot" : "Ouvrir le chatbot Flow"}
        aria-expanded={open}
        aria-controls="chatbot-panel"
      >
        <span className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{ background: "linear-gradient(135deg, #27dfe6, #8b7cf6)" }}
          aria-hidden="true"
        />
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <Image src="/floworka-mark-transparent.png" alt="" width={28} height={28} className="object-contain" aria-hidden="true" />
        )}
      </button>

      {/* Panneau chatbot */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="chatbot-panel"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm flex flex-col rounded-2xl overflow-hidden border border-border shadow-2xl"
            style={{ background: "#0d1322", maxHeight: "min(520px, calc(100vh - 140px))" }}
            role="dialog"
            aria-label="Flow — Assistant Floworka"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border shrink-0">
              <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #27dfe6, #8b7cf6)" }}>
                <Image src="/floworka-mark-transparent.png" alt="" width={20} height={20} className="object-contain" aria-hidden="true" />
              </div>
              <div>
                <p className="text-text font-semibold text-sm" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  Flow
                </p>
                <p className="text-xs text-muted flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-aurora-green inline-block" aria-hidden="true" />
                  Assistant Floworka · en ligne
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-muted text-sm mb-5">
                    Bonjour ! Je suis Flow, l&apos;assistant de Floworka. Comment puis-je vous aider ?
                  </p>
                  {!suggestionsUsed && (
                    <div className="flex flex-col gap-2">
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => send(s)}
                          className="text-xs text-left bg-card border border-border rounded-lg px-3 py-2 text-muted hover:text-text hover:border-aurora-cyan/30 transition-all duration-200"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "text-ink"
                        : "bg-card border border-border text-text"
                    }`}
                    style={msg.role === "user" ? {
                      background: "linear-gradient(115deg, #27dfe6, #8b7cf6)"
                    } : {}}
                  >
                    {msg.content || (typing && i === messages.length - 1 ? (
                      <span className="flex gap-1 items-center py-0.5">
                        {[0, 1, 2].map((j) => (
                          <span key={j} className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce"
                            style={{ animationDelay: `${j * 0.15}s` }} aria-hidden="true" />
                        ))}
                      </span>
                    ) : "")}
                  </div>
                </div>
              ))}

              {typing && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border rounded-xl px-3.5 py-2.5">
                    <span className="flex gap-1 items-center py-0.5">
                      {[0, 1, 2].map((j) => (
                        <span key={j} className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce"
                          style={{ animationDelay: `${j * 0.15}s` }} aria-hidden="true" />
                      ))}
                    </span>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-3 py-3 border-t border-border shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Votre message…"
                aria-label="Message pour Flow"
                className="flex-1 bg-transparent text-text text-sm placeholder-muted/50 outline-none py-1.5"
                disabled={typing}
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Envoyer"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-40"
                style={{ background: "linear-gradient(115deg, #27dfe6, #8b7cf6)" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
