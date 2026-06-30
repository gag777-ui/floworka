import { Resend } from "resend";

function h(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY ?? "");
  const { name, email, project } = await req.json();

  if (!name || !email || !project) {
    return Response.json({ error: "Champs manquants" }, { status: 400 });
  }

  if (typeof name !== "string" || typeof email !== "string" || typeof project !== "string") {
    return Response.json({ error: "Types invalides" }, { status: 400 });
  }

  if (name.length > 200 || email.length > 200 || project.length > 2000) {
    return Response.json({ error: "Champs trop longs" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Response.json({ error: "Email invalide" }, { status: 400 });
  }

  const toEmail = process.env.CONTACT_EMAIL ?? "contact@floworka.com";

  try {
    await resend.emails.send({
      from: "Flow — Floworka <contact@floworka.com>",
      to: [toEmail],
      replyTo: email,
      subject: `[Lead Chatbot] ${h(name)}`,
      text: `Nouveau lead via le chatbot Flow\n\nNom : ${name}\nEmail : ${email}\nProjet : ${project}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; background: #02040a; color: #e8f4f0; padding: 32px; border-radius: 12px;">
          <h2 style="color: #27dfe6; margin-top: 0;">Nouveau lead — Chatbot Flow</h2>
          <table style="width:100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #8b9ea8; width: 100px; vertical-align: top;">Nom</td>
              <td style="padding: 8px 0; font-weight: 600;">${h(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8b9ea8; vertical-align: top;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${h(email)}" style="color: #27dfe6;">${h(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8b9ea8; vertical-align: top;">Projet</td>
              <td style="padding: 8px 0; white-space: pre-wrap;">${h(project)}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid rgba(255,255,255,.1); margin: 24px 0;" />
          <p style="color: #8b9ea8; font-size: 13px; margin: 0;">Répondre directement à cet email contacte le visiteur.</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Erreur lors de l'envoi" }, { status: 500 });
  }
}
