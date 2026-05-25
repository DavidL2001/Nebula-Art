# ✦ NebulaArt

AI-driven generativ konstgenerator byggd med React 18 + TypeScript + WebGL.

## Kom igång

```bash
npm install
npm run dev
```

## Bygga & Deploya

```bash
# Bygg för produktion
npm run build

# Deploya till GitHub Pages (ändra homepage i package.json först)
npm run deploy
```

## Projektstruktur

```
src/
├── components/
│   ├── ui/          # NeonButton, GlassCard etc.
│   ├── canvas/      # Three.js scen, ParticleField
│   └── controls/    # Sliders, PromptInput
├── features/
│   ├── generator/   # artEngine.ts (WebGL/GLSL)
│   └── gallery/
├── hooks/           # useArtEngine
├── lib/
│   ├── tfjs/        # promptParser.ts
│   └── shaders/     # GLSL noise helpers
├── store/           # Zustand (generator + gallery)
├── styles/          # _variables.scss, global.scss
└── types/           # index.ts – alla TypeScript-typer
```

## Tech Stack

| Del | Teknologi |
|-----|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | SCSS + CSS Variables |
| 3D / Animation | React Three Fiber + Framer Motion |
| AI / Generering | GLSL Shaders + TF.js (scaffold) |
| State | Zustand (med persist) |
| Routing | React Router v6 |
| Deploy | GitHub Pages |

## Nästa steg

1. **UI-komponenter** – NeonButton, GlassCard, PromptInput, sliders
2. **Three.js-canvas** – ParticleField bakgrund
3. **Generatorsida** – Komplett layout med live preview
4. **Gallery** – Spara och visa verk
5. **TF.js-modell** – Träna litet nätverk för parameteroptimering
