import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "@fontsource/space-grotesk/latin-300.css";
import "@fontsource/space-grotesk/latin-400.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/space-grotesk/latin-700.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://floworka.com"), // TODO: mettre à jour avec le vrai domaine
  title: "Floworka - Automatisation & Creation",
  description:
    "Studio produit independant pour sites, apps, automatisations et assistants IA utiles.",
  keywords: ["studio produit", "SaaS", "application web", "chatbot IA", "automatisation", "Belgique"],
  authors: [{ name: "Floworka" }],
  openGraph: {
    title: "Floworka - Automatisation & Creation",
    description:
      "Studio produit independant pour sites, apps, automatisations et assistants IA utiles.",
    url: "https://floworka.com",
    siteName: "Floworka",
    locale: "fr_BE",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Floworka - Automatisation & Creation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Floworka - Automatisation & Creation",
    description:
      "Studio produit independant pour sites, apps, automatisations et assistants IA utiles.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={GeistSans.variable}>
      <body className="bg-ink text-text antialiased">{children}</body>
    </html>
  );
}
