import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, projectType, message } = await req.json();

  if (!name || !email || !message) {
    return Response.json({ error: "Champs obligatoires manquants" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Response.json({ error: "Adresse email invalide" }, { status: 400 });
  }

  const toEmail = process.env.CONTACT_EMAIL ?? "gag_zconcept@hotmail.com";

  try {
    await resend.emails.send({
      from: "Flow <noreply@floworka.com>", // TODO: configurer le domaine dans Resend
      to: [toEmail],
      replyTo: email,
      subject: `[Floworka] Nouveau message — ${projectType ?? "Non précisé"}`,
      text: `Nom : ${name}\nEmail : ${email}\nType de projet : ${projectType ?? "Non précisé"}\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #27dfe6;">Nouveau message — Floworka</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Type de projet :</strong> ${projectType ?? "Non précisé"}</p>
          <hr style="border-color: rgba(255,255,255,.1);" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Erreur lors de l'envoi" }, { status: 500 });
  }
}
