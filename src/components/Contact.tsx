"use client";

import { useState } from "react";

const projectTypes = [
  "Site ou landing",
  "Application web",
  "Automatisation",
  "Assistant IA",
  "Je ne sais pas encore",
];

export default function Contact() {
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
          <p className="flow-kicker">On ouvre le chantier ?</p>
          <h2 className="flow-heading">Envoyez le vrai besoin, meme en vrac.</h2>
          <p>
            Une idee, un outil interne fatigue, une page a refaire, un automatisme qui manque :
            envoyez le contexte. Je vous reponds avec une premiere lecture claire.
          </p>
          <a className="flow-contact-email" href="mailto:gag_zconcept@hotmail.com">
            gag_zconcept@hotmail.com
          </a>
        </div>

        {state === "success" ? (
          <div className="flow-success" role="status">
            <span>Message envoye.</span>
            <p>Bien recu. Je reviens vers vous rapidement avec une reponse utile.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flow-form" noValidate>
            <div className="flow-form-row">
              <label>
                <span>Nom</span>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Votre nom" />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="vous@exemple.com" />
              </label>
            </div>

            <label>
              <span>Terrain</span>
              <select name="projectType" value={form.projectType} onChange={handleChange}>
                <option value="">Choisir une piste</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Ce que vous voulez changer, automatiser, lancer ou comprendre..."
              />
            </label>

            {state === "error" && (
              <p className="flow-error">Le message n&apos;est pas parti. Reessayez dans un instant.</p>
            )}

            <button type="submit" disabled={state === "loading"} className="flow-submit">
              {state === "loading" ? "Envoi..." : "Envoyer"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
