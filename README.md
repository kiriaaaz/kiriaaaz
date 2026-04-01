# KIRIAAAZ — Portfolio

## Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**

---

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Structure des fichiers

```
src/
├── app/
│   ├── layout.tsx        ← Fonts Google (Cormorant + Montserrat) + metadata
│   ├── page.tsx          ← Page d'accueil (assemble les composants)
│   └── globals.css       ← Variables CSS, reset, styles globaux
│
├── components/
│   ├── VideoBackground.tsx  ← Vidéo plein écran
│   ├── Header.tsx           ← Liens Instagram + Contact me
│   ├── HeroTitle.tsx        ← Titre "KIRIAAAZ" animé
│   ├── KazTag.tsx           ← Tag "KAZ" qui pulse en bas
│   └── CustomCursor.tsx     ← Curseur custom
│
└── lib/
    └── constants.ts      ← ⭐ ÉDITER ICI : URL Instagram, vidéo, timings
```

---

## Personnalisation

### Remplacer la vidéo
1. Place ton fichier dans `/public/video-bg.mp4`
2. C'est tout — le chemin est déjà configuré dans `src/lib/constants.ts`

### Changer l'URL Instagram
```ts
// src/lib/constants.ts
export const INSTAGRAM_URL = "https://instagram.com/TON_VRAI_HANDLE";
```

### Ajuster l'animation KAZ
```ts
// src/lib/constants.ts
export const KAZ_TIMING = {
  duration: 5,   // durée totale du cycle (secondes)
  fadeIn:   0.8, // durée de l'apparition
  hold:     2.0, // durée visible
  fadeOut:  0.8, // durée de la disparition
  // pause silencieuse = duration - fadeIn - hold - fadeOut
};
```

---

## Déploiement sur Vercel
1. Push le projet sur GitHub
2. Importe le repo sur [vercel.com](https://vercel.com)
3. Vercel détecte Next.js automatiquement → Deploy ✅
