import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "@fontsource/space-grotesk/latin-300.css";
import "@fontsource/space-grotesk/latin-400.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/space-grotesk/latin-700.css";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://floworka.com"),
  title: "Floworka — Automatisation & Création | Studio produit",
  description:
    "Floworka crée des sites, applications web, assistants IA et automatisations sur mesure. Studio produit indépendant francophone. Résultat livrable, pas de blabla.",
  keywords: [
    "studio produit",
    "création site web",
    "application web sur mesure",
    "automatisation",
    "assistant IA",
    "chatbot IA",
    "Belgique",
    "France",
    "freelance développeur web",
  ],
  authors: [{ name: "Floworka", url: "https://floworka.com" }],
  creator: "Floworka",
  openGraph: {
    title: "Floworka — Automatisation & Création",
    description:
      "Sites, apps, assistants IA et automatisations sur mesure. Studio produit indépendant — on livre quelque chose qui bouge.",
    url: "https://floworka.com",
    siteName: "Floworka",
    locale: "fr_BE",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Floworka — Automatisation & Création",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Floworka — Automatisation & Création",
    description:
      "Sites, apps, assistants IA et automatisations sur mesure. Studio produit indépendant.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://floworka.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Floworka",
  url: "https://floworka.com",
  email: "contact@floworka.com",
  description:
    "Studio produit indépendant spécialisé en création de sites web, applications, assistants IA et automatisations sur mesure.",
  slogan: "Automatisation & Création",
  areaServed: ["FR", "BE"],
  availableLanguage: ["French", "English", "Russian"],
  serviceType: [
    "Création de site web",
    "Application web sur mesure",
    "Assistant IA",
    "Automatisation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={GeistSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-ink text-text antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
