# Darija Learn App

Een mobile app om Marokkaans Darija te leren — gebouwd voor Nederlanders met Marokkaanse roots.

## Wat is dit?

Een Duolingo-achtige leerapp specifiek gericht op:
- Dagelijkse gesprekken in Darija
- Familie & cultuur
- Praktisch Darija (geen formeel Arabisch)

## Voor wie?

Nederlandse Marokkanen (en anderen) die Darija willen begrijpen en spreken — zodat ze echte gesprekken kunnen voeren met familie.

## Project structuur

```
Darija/
├── frontend/          # React Native (Expo) mobile app
├── backend/           # Node.js API
├── shared/            # Gedeelde types en constanten
├── ai_context.md      # Visie, doelgroep en AI-regels
├── product_backlog.md # Feature planning (MVP → toekomst)
└── changelog.md       # Versie geschiedenis
```

## Tech stack

| Laag      | Technologie         |
|-----------|---------------------|
| Frontend  | React Native (Expo) |
| Backend   | Node.js + Express   |
| Database  | PostgreSQL (later)  |
| AI coach  | Claude API (later)  |

## Roadmap

- **MVP** — Basis lessen, quiz systeem, audio, voortgang
- **V1** — Accounts, streaks, AI chat coach
- **V2** — Spraakherkenning, AI uitspraaak feedback, adaptive learning

## Starten

```bash
# Frontend
cd frontend
npm install
npx expo start

# Backend
cd backend
npm install
npm run dev
```

## Status

`v0.1` — Project setup fase. Zie [changelog](./changelog.md) voor updates.
