# Changelog — Darija Learn App

Alle versie-updates worden hier bijgehouden.
Format: `[versie] — datum — beschrijving`

---

## v0.4 — 2026-04-12

- Push notificaties: dagelijkse herinnering om 18:00 via expo-notifications
- Free/Premium tier systeem: UI op profielpagina met feature-vergelijking
- Premium bypast de 5-fouten-daglimiet (betaalgateway volgt via App Store)
- XP-systeem: verdien XP per vraag, les en uitspraaklessen — 11 niveaus (Baby → l-Ostaz)
- Streaks: dagelijkse leerstreak bijgehouden in Supabase
- Ranglijst (leaderboard): top 10 op profielpagina gesorteerd op XP
- Gebruikersnaam wijzigen op elk moment via profielpagina
- Woordenboek: 📖 zwevende knop op eilandenkaart — doorzoekbaar woordenboek van alle leswoorden
- Backlog volledig bijgewerkt met status van alle features

---

## v0.3 — 2026-04-12

- Gebruikersaccounts toegevoegd via Supabase (registreren + inloggen)
- Profiel tab toont echte gebruikersnaam
- Uitloggen knop toegevoegd op profiel pagina
- Supabase RLS policies geconfigureerd
- Bugfix: avatar-kiezen scherm buiten (auth) group gezet om redirect-loop te voorkomen
- Avatar-code opgeslagen in `frontend/_saved/` voor later gebruik

---

## v0.2 — 2026-04-11

- Eilandenkaart uitgebreid naar 30 eilanden (3 chapters × 10)
- Bottom tab navigatie toegevoegd (Eilanden, Oefeningen, Profiel)
- Intro-eiland "Schrift & Uitspraak" toegevoegd vóór hoofdstuk 1
- Interactieve uitspraaklessen gebouwd (9 klanken + schrijfregels + quiz)
- Schrijfconventies vastgesteld: ou, ch, sh, 7, 9, 3, kh, gh, ha
- Info-modal (ℹ️) op elk eiland met lesinhoud-uitleg
- Oefeningen tab: lees- en luisteroefeningen (werkende UI, audio volgt)
- Profiel tab toegevoegd met live statistieken uit voortgangssysteem

---

## v0.1 — 2026-04-10

- Initial repository setup
- Basis projectstructuur aangemaakt (frontend, backend, shared)
- MVP planning gedefinieerd in product_backlog.md
- AI-context en productregels vastgelegd in ai_context.md
- README aangemaakt met projectomschrijving
