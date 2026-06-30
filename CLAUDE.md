# Floworka - contexte pour Claude

## Instructions importantes

- Lire aussi `AGENTS.md` avant de modifier du code.
- Next.js version `16.2.9` — lire la doc locale dans `node_modules/next/dist/docs/` avant d'ecrire du code Next.
- Projet dans `/Users/zakharian_concept/Projets/floworka`.
- Dev server : `npm run dev` → port 3001 (3000 souvent pris par d'autres projets).
- Le client parle en francais familier, veut une collaboration directe.

## Objectif du site

Floworka est un studio "Automatisation & creation". Direction : visuelle, immersive, "lab/workflow", premium sombre/lumineuse, accents cyan/teal/violet.

Regles absolues :
- Pas de section portfolio/projets realises.
- Pas de stats inventees (volumes, clients, resultats).
- Pas de grosses cards projets.
- Pas de "voir mes realisations" / "1 SaaS en ligne".

## Structure de la page

`src/app/page.tsx` — client component (`"use client"`), sections montees dans l'ordre :
1. `<ScrollProgress />` — barre de progression scroll
2. `<Nav />` — navigation (liens traduits + `<LangSwitcher />` + CTA Demarrer)
3. Hero immersif — logo, orb CSS anime (anneaux orbitaux + console cockpit), H1, CTAs
4. `<FlowShowcase />` — section animee framer-motion au scroll (marquee, sticky, nodes, cockpit)
5. Section `#atelier` — approche en 3 temps, fond dark
6. Section `.flow-matter` — 4 tuiles
7. Section `.flow-strip` — logo geant + 3 lignes
8. `<Contact />` — formulaire + email visible `contact@floworka.com`
9. `<Footer />`
10. `<Chatbot />` — bulle flottante bas droite, sélecteur FR/EN/RU intégré

Composants inutilises (dans `src/components/` mais non montes) :
`FAQ.tsx`, `Flux.tsx`, `Manifeste.tsx`, `Pourquoi.tsx`, `Process.tsx`, `Services.tsx`, `AnimatedSection.tsx`

## Internationalisation (i18n)

- 3 langues : **FR** (defaut), **EN**, **RU**
- Fichier de traductions : `src/lib/i18n.ts` — objet `translations` avec clés `fr / en / ru`
- Contexte global : `src/contexts/LanguageContext.tsx` — `LanguageProvider` monte dans `layout.tsx`, hook `useLanguage()` disponible partout
- Sélecteur de langue : `src/components/LangSwitcher.tsx` — effet drum-roll vertical (Framer Motion), intégré dans `<Nav />`
- Chatbot : sélecteur FR/EN/RU séparé dans son propre header, `lang` envoyé à `/api/chat` qui injecte une instruction de langue dans le system prompt
- Tous les composants qui affichent du texte sont `"use client"` et consomment `useLanguage()`

## CSS / Design

Fichier principal : `src/app/globals.css`

- Fond global : `#02040a`
- Accents : cyan `#4dffd8` / `#27dfe6`, violet `#8b7cf6`
- Typo : Space Grotesk (titres) + Geist Sans (corps)
- Animations CSS : `flowSpin`, `flowFloat`, `flowMarquee`, `flowBreathe`
- Section `.flow-section` (atelier) : fond dark avec nuance teal, texte blanc, numeros en cyan
- Toutes les sections sont dark — pas de fond clair

## APIs et services

### Chatbot (`src/app/api/chat/route.ts`)
- Provider : **DeepSeek** (deepseek-chat / DeepSeek-V3)
- API compatible OpenAI via `fetch` — pas de SDK installe
- Variable : `DEEPSEEK_API_KEY`
- System prompt dans `src/lib/knowledge.ts`
- Streaming SSE parse manuellement
- `lang` accepté dans le body → instruction de langue injectée dans le system prompt
- Securite : filtre roles (uniquement `user`/`assistant`), max 20 messages, max 2000 chars/message

### Formulaire contact (`src/app/api/contact/route.ts`)
- Provider : **Resend**
- Variable : `RESEND_API_KEY` (cle dediee "floworka", separee de Voxa)
- `from` : `Flow <contact@floworka.com>`
- `to` : `process.env.CONTACT_EMAIL` avec fallback `contact@floworka.com`
- Resend instancie a l'interieur du handler (pas au niveau module) pour eviter crash au build
- Securite : HTML-escape sur tous les champs, validation type + longueur, validation email regex

### Lead chatbot (`src/app/api/lead/route.ts`)
- Appele automatiquement par `<Chatbot />` quand le bot collecte les 3 infos visiteur
- Envoie un email formate a `contact@floworka.com` via Resend
- Champs : `name`, `email`, `project`
- Securite : HTML-escape, validation type + longueur, validation email regex

### Collecte de lead (Chatbot)
- Quand un visiteur exprime une intention projet, `Flow` collecte nom / email / description
- Le bot emet un marqueur cache `[LEAD:{"name":"...","email":"...","project":"..."}]` en fin de message
- `<Chatbot />` detecte et strip le marqueur, appelle `/api/lead`, n'affiche que la confirmation au visiteur
- System prompt dans `src/lib/knowledge.ts` — contient les instructions de collecte et de vouvoiement

## Securite

- **Headers HTTP** (`next.config.ts`) : `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy`
- **Emails** : tous les inputs utilisateur sont HTML-escaped avant injection dans les templates
- **Chat API** : filtrage strict des roles, caps de taille
- **Manque** : rate limiting (necessiterait Upstash Redis si trafic monte)

## Variables d'environnement

### Vercel (production) — deja configurees
| Variable | Valeur |
|---|---|
| `RESEND_API_KEY` | cle Resend projet "floworka" |
| `CONTACT_EMAIL` | `contact@floworka.com` |
| `DEEPSEEK_API_KEY` | cle DeepSeek |

### Local (`.env.local`) — ne pas committer
```
RESEND_API_KEY=...
CONTACT_EMAIL=contact@floworka.com
DEEPSEEK_API_KEY=...
```

## Git / Deploy

- GitHub : https://github.com/gag777-ui/floworka
- Vercel : https://floworka.com / https://floworka.vercel.app
- Projet Vercel : `gag-s-projects1/floworka`
- Branch principale : `main`
- Chaque push sur `main` declenche un deploy automatique Vercel
- Deploy manuel : `vercel --prod --yes`

## Todo restant

- [ ] Rate limiting sur les API routes (Upstash Redis)
- [ ] Image OG (`/public/og-image.png` 1200x630)
- [ ] Favicon SVG/ICO
- [ ] sitemap.xml + robots.txt
- [ ] Remplir les placeholders dans mentions-legales (nom, statut juridique, adresse)

## Audit (2026-07-01) — tout passe

| Check | Resultat |
|---|---|
| `npm run build` | OK — 7 routes generees |
| `/` (home) | 200 OK |
| `/mentions-legales` | 200 OK — email = contact@floworka.com |
| `/confidentialite` | 200 OK |
| `POST /api/chat` | OK — DeepSeek repond en streaming, lang injecte |
| `POST /api/contact` | OK — Resend envoie depuis contact@floworka.com |
| `POST /api/lead` | OK — lead chatbot envoie email formate |
| Headers securite | OK — X-Frame-Options, nosniff, XSS-Protection, Referrer-Policy |
| HTML injection | OK — escapeHtml sur tous les champs |

## Logo / assets

- `public/floworka.png` — logo original fond noir
- `public/floworka-transparent.png` — logo complet detoure PNG RGBA
- `public/floworka-mark-transparent.png` — symbole seul detoure PNG RGBA (utilise dans home, nav, footer, chatbot)
- `public/floworka-instagram-puzzle.png` — visuel 9 cases Instagram (non monte sur le site)
