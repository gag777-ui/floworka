# Floworka - contexte pour Claude

Ce fichier resume tout ce qui a ete fait jusqu'ici pour que Claude puisse reprendre proprement et deployer sur GitHub/Vercel.

## Instructions importantes

- Lire aussi `AGENTS.md` avant de modifier du code.
- Next.js utilise la version `16.2.9`. Les consignes du projet demandent de lire la doc locale dans `node_modules/next/dist/docs/` avant d'ecrire du code Next.
- Le projet est dans `/Users/zakharian_concept/Projets/floworka`.
- Un depot Git local a ete initialise dans ce dossier avec `git init`, mais rien n'a encore ete commit au moment de cette note.
- Attention : avant `git init`, Git voyait `/Users/zakharian_concept` comme racine. Maintenant il faut bien travailler dans `/Users/zakharian_concept/Projets/floworka` pour ne versionner que le site.

## Objectif du site

Floworka est un studio "Automatisation & creation". Le client n'aime pas les sites generiques ni les sections portfolio/cards de projets realises. Le site doit avoir une vibe plus visuelle, immersive, un peu "lab/workflow", inspiree dans l'energie de n8nlab.io, sans copier.

Important :
- Ne pas parler de projets deja realises.
- Ne pas afficher de section portfolio/projets.
- Ne pas inventer de volumes, clients, resultats ou realisations.
- Garder une direction premium, sombre, lumineuse, avec accents cyan/teal/violet.

## Changements principaux faits

### Home page

`src/app/page.tsx` a ete entierement refaite.

Sections actuelles :
- Hero immersif avec logo Floworka, orb/flux anime et CTAs.
- `FlowShowcase`, une section client animee au scroll.
- Section atelier avec approche en 3 temps.
- Section "matiere" visuelle en tuiles.
- Section "ce qu'on vient chercher ici".
- Contact.
- Footer.
- Chatbot conserve.

Anciennes sections retirees de la home :
- `Hero` ancien composant
- `Projets`
- `Services`
- `Flux`
- `Process`
- `Pourquoi`
- `FAQ`

Certains anciens composants existent encore dans `src/components/`, mais ne sont plus montes dans la home. Deux composants ont ete supprimes :
- `src/components/Hero.tsx`
- `src/components/Projets.tsx`

### Nouveau composant anime

Ajoute :
- `src/components/FlowShowcase.tsx`

Il utilise `framer-motion` avec `useScroll` / `useTransform`.
Il affiche :
- marquee horizontal
- scene sticky
- nodes connectes
- cockpit/console
- orb anime
- lignes qui se revelent au scroll

### CSS / design

`src/app/globals.css` a ete beaucoup modifie.

Points importants :
- Nouvelle direction sombre/lumineuse.
- Hero plus visuel.
- Animations CSS : `flowSpin`, `flowFloat`, `flowMarquee`, `flowBreathe`.
- Typos reduites apres feedback client : avant c'etait trop enorme, certaines lettres etaient coupees dans les cards/tuiles.
- Line-height augmente sur les gros titres et tuiles pour eviter les lettres coupees.
- Section contact stylisee avec email visible.

### Navigation / footer / contact

Modifies :
- `src/components/Nav.tsx`
- `src/components/Footer.tsx`
- `src/components/Contact.tsx`

Navigation simplifiee :
- Approche
- Contact
- CTA Demarrer

Contact :
- Le formulaire existe toujours.
- L'email visible en bas est `gag_zconcept@hotmail.com`.
- Le mail visible utilise la classe CSS `flow-contact-email`.

### Email de reception

Email client :

```txt
gag_zconcept@hotmail.com
```

Mis a jour dans :
- `.env.local` : `CONTACT_EMAIL=gag_zconcept@hotmail.com`
- `src/app/api/contact/route.ts` : fallback vers `gag_zconcept@hotmail.com`
- `src/components/Contact.tsx` : email visible + mailto
- `src/app/mentions-legales/page.tsx`
- `src/app/confidentialite/page.tsx`
- `src/lib/knowledge.ts`

Important pour Vercel :
- Ajouter `CONTACT_EMAIL=gag_zconcept@hotmail.com` dans les variables d'environnement Vercel.
- Ajouter aussi une vraie `RESEND_API_KEY`.
- Le formulaire utilise Resend via `src/app/api/contact/route.ts`.
- Le `from` actuel est `Flow <noreply@floworka.com>`. Pour que l'envoi marche en production, il faudra configurer/verifier le domaine dans Resend, ou adapter le domaine d'envoi selon ce que Resend accepte.

### Chatbot

`src/components/Chatbot.tsx` a ete garde.

Correction faite :
- Le streaming ne mute plus une variable `assistantText`, car ESLint/React immutability rejetait l'ancienne logique.

`src/lib/knowledge.ts` a ete nettoye :
- Plus de faux projets.
- Plus de placeholders de realisations.
- Email mis a jour.
- Le bot ne doit pas inventer de projets, volumes, prix ou delais exacts.

### Logo / assets

Le logo original avec fond noir est encore la :
- `public/floworka.png`

Deux nouvelles versions transparentes ont ete creees :
- `public/floworka-transparent.png` : logo complet detoure, PNG RGBA.
- `public/floworka-mark-transparent.png` : symbole seul detoure, PNG RGBA.

Copies egalement mises sur le Bureau du Mac :
- `/Users/zakharian_concept/Desktop/floworka-transparent.png`
- `/Users/zakharian_concept/Desktop/floworka-mark-transparent.png`

Le site utilise maintenant surtout :
- `/floworka-mark-transparent.png`

Remplace dans :
- `src/app/page.tsx`
- `src/components/Nav.tsx`
- `src/components/Footer.tsx`
- `src/components/Chatbot.tsx`

## Etat Git actuel

Un depot local a ete cree dans :

```sh
/Users/zakharian_concept/Projets/floworka/.git
```

Au moment de cette note, `git status --short` montre tous les fichiers en non suivis (`??`) car aucun commit n'a encore ete fait.

Fichiers a NE PAS committer :
- `.env.local`
- `.next/`
- `node_modules/`

Le `.gitignore` ignore deja :
- `.env*`
- `.next/`
- `node_modules`
- `.vercel`
- etc.

Commandes conseillees avant GitHub :

```sh
cd /Users/zakharian_concept/Projets/floworka
git status --short
git add .
git status --short
git commit -m "Initial Floworka website"
```

Verification importante apres `git add .` :
- `.env.local` ne doit PAS apparaitre dans les fichiers staged.
- `node_modules` ne doit PAS apparaitre.
- `.next` ne doit PAS apparaitre.

## GitHub

`gh` ne semblait pas disponible ou pas connecte lors de la verification.

Options :
1. Creer un repo vide sur GitHub via le site web, puis ajouter le remote :

```sh
git remote add origin <URL_DU_REPO_GITHUB>
git branch -M main
git push -u origin main
```

2. Installer/configurer GitHub CLI si le client veut tout faire en CLI.

Ne pas pousser depuis `/Users/zakharian_concept`. Toujours pousser depuis `/Users/zakharian_concept/Projets/floworka`.

## Vercel

Vercel CLI existe :

```sh
/Users/zakharian_concept/.npm-global/bin/vercel
```

Avant deploy :
- Verifier la connexion Vercel avec `vercel whoami`.
- Si pas connecte : `vercel login`.
- Lier le projet : `vercel link`.
- Ajouter les variables d'environnement dans Vercel :
  - `CONTACT_EMAIL=gag_zconcept@hotmail.com`
  - `RESEND_API_KEY=<vraie cle Resend>`
  - eventuellement les variables Anthropic si le chatbot doit marcher en production.

Chercher les variables necessaires :

```sh
rg "process.env" src
```

## Tests/verifications deja faits

Commandes qui passaient :

```sh
npm run lint
curl -I http://localhost:3001
```

`curl -I http://localhost:3001` repondait `HTTP/1.1 200 OK` quand le dev server etait lance.

Le build `npm run build` avait eu un probleme initial avec `next/font/google` car le reseau etait indisponible. Cela a ete corrige en remplacant Google Fonts par :
- `geist/font/sans`
- `@fontsource/space-grotesk`

Cependant, a un moment `npm run build` semblait tourner longtemps sans rendre la main sous Turbopack. A retester avant deploy :

```sh
npm run lint
npm run build
```

## Dev server

Le dev server a souvent tourne sur :

```txt
http://localhost:3001
```

Le port 3000 etait parfois deja occupe.

Commande :

```sh
npm run dev
```

## Notes de contenu

Le client parle en francais familier et aime une collaboration rapide/directe.

Feedbacks deja donnes :
- Premiere version trop generique.
- Il voulait une vibe plus surprenante.
- Il a aime l'idee immersive mais voulait plus rempli et plus anime, comme l'energie de n8nlab.io.
- Ensuite il trouvait les ecritures trop enormes et certaines lettres coupees dans les cards/tuiles. Les tailles ont ete reduites.

Ne pas revenir a :
- grosses cards projets
- stats inventees
- "1 SaaS en ligne"
- "voir mes realisations"
- section portfolio

## Fichiers importants a regarder

- `src/app/page.tsx`
- `src/app/globals.css`
- `src/components/FlowShowcase.tsx`
- `src/components/Contact.tsx`
- `src/components/Nav.tsx`
- `src/components/Footer.tsx`
- `src/components/Chatbot.tsx`
- `src/app/api/contact/route.ts`
- `src/lib/knowledge.ts`
- `.env.local` uniquement en local, ne pas commit

