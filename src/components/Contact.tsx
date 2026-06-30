"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;

  const [form, setForm] = useState({ name: "", email: "", projectType: "", message: "" });
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setState("error");
        return;
      }

      setForm({ name: "", email: "", projectType: "", message: "" });
      setState("success");
    } catch {
      setState("error");
    }
  };

  return (
    <section id="contact" className="flow-contact px-5 py-24 sm:px-8" aria-label="Contact">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="flow-contact-copy">
          <p className="flow-kicker">{c.kicker}</p>
          <h2 className="flow-heading">{c.h2}</h2>
          <p>{c.p}</p>
          <a className="flow-contact-email" href="mailto:contact@floworka.com">
            contact@floworka.com
          </a>
        </div>

        {state === "success" ? (
          <div className="flow-success" role="status">
            <span>{c.successTitle}</span>
            <p>{c.successP}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flow-form" noValidate>
            <div className="flow-form-row">
              <label>
                <span>{c.labelName}</span>
                <input name="name" value={form.name} onChange={handleChange} required placeholder={c.placeholderName} />
              </label>
              <label>
                <span>{c.labelEmail}</span>
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder={c.placeholderEmail} />
              </label>
            </div>

            <label>
              <span>{c.labelTerrain}</span>
              <select name="projectType" value={form.projectType} onChange={handleChange}>
                <option value="">{c.placeholderTerrain}</option>
                {c.projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>{c.labelMessage}</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder={c.placeholderMessage}
              />
            </label>

            {state === "error" && (
              <p className="flow-error">{c.error}</p>
            )}

            <button type="submit" disabled={state === "loading"} className="flow-submit">
              {state === "loading" ? c.loading : c.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
