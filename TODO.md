# Floworka — TODO · Placeholders à compléter

## Contenu réel (§12 du CDC)

- [ ] **Logo** — `/public/floworka.png` est en place. Si tu as une version SVG ou meilleure qualité, la remplacer.
- [ ] **Email de contact** — chercher `[EMAIL_CONTACT]` dans le code (Contact.tsx, Footer.tsx, mentions-legales, confidentialite)
- [ ] **Lien de RDV** — chercher `[LIEN_CALENDLY]` dans Contact.tsx et le remplacer par ton lien Calendly/Cal.com
- [ ] **SaaS #1 (en ligne)** — dans `src/components/Projets.tsx` : remplacer `[NOM_SAAS_1]`, `[DESCRIPTION_COURTE_SAAS_1]`, `[URL_SAAS_1]`
- [ ] **SaaS #2 (en cours)** — dans `src/components/Projets.tsx` : remplacer `[NOM_SAAS_2]`, `[DESCRIPTION_COURTE_SAAS_2]`
- [ ] **Site existant** — dans `src/components/Projets.tsx` : remplacer `[NOM_SITE_1]`, `[DESCRIPTION_COURTE_SITE_1]`, `[URL_SITE_1]`
- [ ] **Réseaux sociaux** — dans `src/components/Footer.tsx` : remplacer `[LIEN_LINKEDIN]` et ajouter d'autres réseaux
- [ ] **Mentions légales** — dans `src/app/mentions-legales/page.tsx` : compléter nom, statut, TVA, adresse
- [ ] **Domaine final** — dans `src/app/layout.tsx` : remplacer `https://floworka.com` par le vrai domaine

## Variables d'environnement (`.env.local` + Vercel dashboard)

- [ ] `ANTHROPIC_API_KEY` — clé API Anthropic (https://console.anthropic.com/)
- [ ] `RESEND_API_KEY` — clé API Resend (https://resend.com/) — configurer aussi le domaine d'envoi
- [ ] `CONTACT_EMAIL` — l'email qui reçoit les messages du formulaire

## Resend — configuration domaine
- [ ] Ajouter le domaine dans Resend et vérifier les DNS
- [ ] Mettre à jour le champ `from` dans `src/app/api/contact/route.ts` avec le vrai domaine

## Base de connaissance chatbot (`src/lib/knowledge.ts`)
- [ ] Mettre à jour avec les vrais noms/descriptions des projets une fois les placeholders remplis
- [ ] Mettre à jour l'email de contact et le lien de RDV dans le system prompt

## SEO & assets
- [ ] Créer une image OG (`/public/og-image.png`) — 1200×630px, dans le thème aurore
- [ ] Créer un favicon SVG ou ICO en forme de cube Floworka
- [ ] Ajouter un `sitemap.xml` et un `robots.txt`

## Optionnel
- [ ] Ajouter Vercel Analytics (`@vercel/analytics`) pour le suivi de trafic
- [ ] Bannière cookies si tu utilises des outils de tracking
