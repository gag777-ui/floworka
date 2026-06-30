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

`src/app/page.tsx` — sections montees dans l'ordre :
1. `<ScrollProgress />` — barre de progression scroll
2. `<Nav />` — navigation (Approche / Contact / CTA Demarrer)
3. Hero immersif — logo, orb CSS anime (anneaux orbitaux + console cockpit), H1, CTAs
4. `<FlowShowcase />` — section animee framer-motion au scroll (marquee, sticky, nodes, cockpit)
5. Section `#atelier` — approche en 3 temps (01 On clarifie / 02 On construit / 03 On met en ligne), fond dark
6. Section `.flow-matter` — 4 tuiles (Pages / Outils internes / Assistants IA / Automatisations)
7. Section `.flow-strip` — logo geant + 3 lignes "ce qu'on vient chercher"
8. `<Contact />` — formulaire + email visible `gag_zconcept@hotmail.com`
9. `<Footer />`
10. `<Chatbot />` — bulle flottante bas droite

Composants inutilises (toujours dans `src/components/` mais non montes) :
`FAQ.tsx`, `Flux.tsx`, `Manifeste.tsx`, `Pourquoi.tsx`, `Process.tsx`, `Services.tsx`, `AnimatedSection.tsx`

## CSS / Design

Fichier principal : `src/app/globals.css`

- Fond global : `#02040a`
- Accents : cyan `#4dffd8`, violet `#8b7cf6`
- Typo : Space Grotesk (titres) + Inter (corps)
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

### Formulaire contact (`src/app/api/contact/route.ts`)
- Provider : **Resend**
- Variable : `RESEND_API_KEY` (cle dediee "floworka", separee de Voxa)
- `from` : `onboarding@resend.dev` (temporaire — en attente achat domaine `floworka.com`)
- `to` : `process.env.CONTACT_EMAIL` avec fallback `gag_zconcept@hotmail.com`
- Resend instancie a l'interieur du handler (pas au niveau module) pour eviter crash au build

## Variables d'environnement

### Vercel (production) — deja configurees
| Variable | Valeur |
|---|---|
| `RESEND_API_KEY` | cle Resend projet "floworka" |
| `CONTACT_EMAIL` | `gag_zconcept@hotmail.com` |
| `DEEPSEEK_API_KEY` | cle DeepSeek |

### Local (`.env.local`) — ne pas committer
```
RESEND_API_KEY=...
CONTACT_EMAIL=gag_zconcept@hotmail.com
DEEPSEEK_API_KEY=...
```

## Git / Deploy

- GitHub : https://github.com/gag777-ui/floworka
- Vercel : https://floworka.vercel.app
- Projet Vercel : `gag-s-projects1/floworka`
- Branch principale : `main`
- Chaque push sur `main` declenche un deploy automatique Vercel

## Todo restant

- [ ] Acheter le domaine `floworka.com`
- [ ] Verifier le domaine dans Resend + mettre `from: "Flow <noreply@floworka.com>"`
- [ ] Ajouter `ANTHROPIC_API_KEY` si on veut un second chatbot Anthropic (pas prevu pour l'instant)
- [ ] Image OG (`/public/og-image.png` 1200x630)
- [ ] Favicon SVG/ICO
- [ ] sitemap.xml + robots.txt
- [ ] Verifier domaine Resend apres achat floworka.com

## Audit (2026-06-30) — tout passe

| Check | Resultat |
|---|---|
| `npm run lint` | OK — 0 erreur |
| `npm run build` | OK — 6 routes generees |
| `/` (home) | 200 OK |
| `/mentions-legales` | 200 OK |
| `/confidentialite` | 200 OK |
| `POST /api/chat` | OK — DeepSeek repond en streaming |
| `POST /api/contact` | OK — Resend retourne `success: true` |

## Logo / assets

- `public/floworka.png` — logo original fond noir
- `public/floworka-transparent.png` — logo complet detoure PNG RGBA
- `public/floworka-mark-transparent.png` — symbole seul detoure PNG RGBA (utilise dans la home, nav, footer, chatbot)
