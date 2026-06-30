import { Resend } from "resend";

function h(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY ?? "");
  const { name, email, projectType, message } = await req.json();

  if (!name || !email || !message) {
    return Response.json({ error: "Champs obligatoires manquants" }, { status: 400 });
  }

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return Response.json({ error: "Types invalides" }, { status: 400 });
  }

  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return Response.json({ error: "Champs trop longs" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Response.json({ error: "Adresse email invalide" }, { status: 400 });
  }

  const safeType = typeof projectType === "string" ? projectType.slice(0, 100) : "Non précisé";
  const toEmail = process.env.CONTACT_EMAIL ?? "contact@floworka.com";

  try {
    await resend.emails.send({
      from: "Flow <contact@floworka.com>",
      to: [toEmail],
      replyTo: email,
      subject: `[Floworka] Nouveau message — ${safeType}`,
      text: `Nom : ${name}\nEmail : ${email}\nType de projet : ${safeType}\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #27dfe6;">Nouveau message — Floworka</h2>
          <p><strong>Nom :</strong> ${h(name)}</p>
          <p><strong>Email :</strong> <a href="mailto:${h(email)}">${h(email)}</a></p>
          <p><strong>Type de projet :</strong> ${h(safeType)}</p>
          <hr style="border-color: rgba(255,255,255,.1);" />
          <p style="white-space: pre-wrap;">${h(message)}</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Erreur lors de l'envoi" }, { status: 500 });
  }
}
