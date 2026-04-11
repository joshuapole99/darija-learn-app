# Product Backlog — Darija Learn App

## Kernvisie

Een eilanden-kaart scherm als hoofdscherm. De gebruiker ziet een pad met eilanden — elk eiland is een thema. Je klikt op een eiland en start een oefenles. Per thema zijn er 5 oefenlessen voordat je een toets krijgt. Haal je 80%+, dan unlock je het volgende eiland. Werkt offline.

---

## MVP (Eerste werkende versie)

Doel: een gebruiker kan lessen voltooien op een eilandenkaart, voortgang opslaan en het volgende eiland unlocken.

| # | Feature | Beschrijving | Status |
|---|---------|--------------|--------|
| 1 | Eilandenkaart (hoofdscherm) | Scrollbaar pad met eilanden per thema. Eilanden zijn locked/unlocked zichtbaar. | Done |
| 2 | Les starten vanuit eiland | Tik op een eiland → start een van de oefenlessen van dat thema | Done |
| 3 | Meerkeuze quiz (lesformaat) | Per les: reeks meerkeuze vragen. 1 correct antwoord uit 4 opties. | Done |
| 4 | 80% slagingseis | Les telt als voltooid als de gebruiker ≥80% goed heeft. Zo niet → opnieuw doen. | Done |
| 5 | Voltooide les niet herhalen | Als een les eenmaal voltooid is (≥80%), hoeft de gebruiker hem niet opnieuw te doen | Done |
| 6 | 5 lessen per thema + toets | Na 5 voltooide oefenlessen krijgt de gebruiker een afsluitende toets voor dat eiland | Todo |
| 7 | Eiland unlocken | Haal je de lessen af → volgend eiland wordt unlocked | Done |
| 8 | Positieve feedback bij voltooien | Geluidje + confetti/slingers animatie bij het voltooien van een les | Todo |
| 9 | 5-fouten-daglimiet (freemium) | Gebruiker mag per dag maximaal 5 fouten maken. Daarna wachten tot volgende dag. | Done |
| 10 | Audio playback | Native opnames afspelen bij elk woord/zin | Todo |
| 11 | Voortgang opslaan (offline/lokaal) | Lokaal opslaan welke lessen voltooid zijn, fouten vandaag, welke eilanden unlocked zijn | Done |
| 12 | Terug naar overzicht | Gebruiker kan na elke les terug naar de eilandenkaart zonder les te verliezen | Done |
| 13 | Basis navigatie | Bottom tab nav: Eilanden, Oefeningen, Profiel | Done |
| 14 | Eiland info-icoontje | ℹ️-icoontje op elk eiland → modal met uitleg van lesinhoud | Done |
| 15 | Oefeningen tab (lees + luister) | Aparte tab met lees- en luisteroefeningen. Audio nog todo. | Done (UI) |

---

## V1 (Gebruikersaccounts & engagement)

Doel: gebruikers komen terug elke dag en hebben een account.

| # | Feature | Beschrijving | Status |
|---|---------|--------------|--------|
| 16 | Gebruikersaccounts | Registreren / inloggen via Supabase (email + wachtwoord) | Done |
| 17 | Onbeperkt leren (betaald) | Premium tier: geen daglimiet op fouten. UI + bypass klaar. Betaalgateway (App Store) = todo. | Done (UI) |
| 18 | Streaks | Dagelijkse leerstreak bijhouden in Supabase, zichtbaar op profiel | Done |
| 19 | XP-systeem | XP per vraag (+5), les voltooid (+20/+35), uitspraak (+25). Niveaus Baby → l-Ostaz | Done |
| 20 | Push notificaties | Dagelijkse lokale herinnering om 18:00 via expo-notifications | Done |
| 21 | Profiel pagina | XP, niveau, streak, ranglijst, tier-badge, gebruikersnaam wijzigen | Done |
| 22 | Avatar / character kiezen | Opgeslagen in `frontend/_saved/` voor later gebruik | Uitgesteld |
| 23 | Ranglijst (leaderboard) | Top 10 op profiel gesorteerd op XP. Eigen positie gehighlight. | Done |
| 24 | Rang-badges | Niveau-systeem op basis van XP: Baby → Peuter → Dyslect → ... → l-Ostaz (11 niveaus) | Done |

---

### XP-verdienmodel

| Actie | XP |
|-------|----|
| Vraag goed beantwoord | +5 XP |
| Les voltooid (≥80%) | +20 XP bonus |
| Les voltooid met 100% | +35 XP bonus |
| Uitspraaklessen voltooid | +25 XP (eenmalig) |

### Niveau-systeem (op basis van XP)

| Niveau | Naam | Min XP | Emoji |
|--------|------|--------|-------|
| 1 | Baby | 0 | 👶 |
| 2 | Peuter | 100 | 🐣 |
| 3 | Dyslect | 250 | 🤪 |
| 4 | Lhajja | 500 | 👵 |
| 5 | Puber | 800 | 😤 |
| 6 | Meskeen | 1200 | 🧑 |
| 7 | Gevorderd | 1800 | 🧑‍🎓 |
| 8 | Sha3b | 2500 | 🧑‍💼 |
| 9 | Jedd | 3500 | 🧓 |
| 10 | l-3alim | 5000 | 🎓 |
| 11 | l-Ostaz | 7500 | 👑 |

### Extra features (toegevoegd buiten originele backlog)

| Feature | Beschrijving | Status |
|---------|--------------|--------|
| Woordenboek | 📖 FAB op eilandenkaart — opent doorzoekbaar woordenboek met alle woorden uit de lessen | Done |
| Gebruikersnaam wijzigen | Op profielpagina op elk moment de gebruikersnaam aanpassen | Done |
| Uitspraaklessen | Interactieve les (13 stappen) over klanken en schrijfregels van Darija | Done |

---

## V2 (AI & uitgebreide content)

Doel: AI-gegenereerde verhalen en adaptief leren.

| # | Feature | Beschrijving | Status |
|---|---------|--------------|--------|
| 25 | AI verhalen (Claude) | Claude genereert korte Darija verhalen afgestemd op het niveau van de gebruiker | Todo |
| 26 | AI chat coach | Claude-gebaseerde coach voor vragen over Darija | Todo |
| 27 | Spraakherkenning | Gebruiker spreekt Darija in | Todo |
| 28 | Uitspraak feedback (AI) | Claude geeft feedback op uitspraak | Todo |
| 29 | Adaptief leren | Zwakke punten vaker herhalen | Todo |
| 30 | Culturele uitleg | Extra context bij cultureel gevoelige onderwerpen | Todo |

---

## Thema's / Eilanden (inhoudelijk)

Elk eiland heeft 5 oefenlessen + 1 afsluitende toets. Elk eiland heeft een ℹ️-icoontje met een uitleg van de lesinhoud (grammatica + woordenschat).

De eilanden zijn gegroepeerd in **Hoofdstukken (Chapters)**. Elk hoofdstuk heeft 10 eilanden/onderwerpen.

---

### Hoofdstuk 1 — Basis & Tegenwoordige Tijd

| Eiland | Thema | Info-uitleg (modal inhoud) | Status |
|--------|-------|----------------------------|--------|
| 0 | Schrift & Uitspraak | Interactieve les: klanken, schrijfconventies, quiz. 13 stappen. | Done |
| 1 | Basiswoorden | Meest voorkomende zelfstandige naamwoorden: jongen, meisje, huis, water, etc. | In progress (content) |
| 2 | Groeten | Standaard begroetingen: salam, labas, mrhba, sjno akhbar. | Todo |
| 3 | Jezelf voorstellen | Ana + naam, smiyti, mnin nta/nti. | Todo |
| 4 | Familie | Familietermen: mmi, bba, khti, khoya, 3ammi, 3amma. | Todo |
| 5 | Getallen 1–20 | Tellen van wahed tot 3shrin. | Todo |
| 6 | Kleuren | Kleurwoorden: l7mer, khal, byed, zra9, etc. | Todo |
| 7 | Tegenwoordige tijd — zijn / hebben | Werkwoord "koun" en bezit met 3endi. | Todo |
| 8 | Dagelijkse werkwoorden | kla, shreb, msha, ja in de tegenwoordige tijd. | Todo |
| 9 | Eten & drinken | Woordenschat voor voedsel en dranken. | Todo |
| 10 | Dagelijkse routines | Ochtend- en avondroutines. Kloktijden. | Todo |

---

### Hoofdstuk 2 — Toekomstige Tijd

| Eiland | Thema | Status |
|--------|-------|--------|
| 11 | Toekomst met "ghadi" | Todo |
| 12 | Plannen maken | Todo |
| 13 | Getallen 20–100 | Todo |
| 14 | In de winkel | Todo |
| 15 | Weersverwachting | Todo |
| 16 | Wil / wens uitdrukken | Todo |
| 17 | Uitnodigingen | Todo |
| 18 | Vervoer & reizen | Todo |
| 19 | Lichaam & gezondheid | Todo |
| 20 | Herhaling & mini-toets H2 | Todo |

---

### Hoofdstuk 3 — Verleden Tijd

| Eiland | Thema | Status |
|--------|-------|--------|
| 21 | Verleden tijd — basisvorm | Todo |
| 22 | Wat deed je gisteren? | Todo |
| 23 | Onregelmatige werkwoorden | Todo |
| 24 | Verhalen vertellen | Todo |
| 25 | Vragen in de verleden tijd | Todo |
| 26 | Ontkenning in de verleden tijd | Todo |
| 27 | Familie & herinneringen | Todo |
| 28 | Op school / werken | Todo |
| 29 | Feesten & tradities | Todo |
| 30 | Herhaling & mini-toets H3 | Todo |

---

## Infrastructuur & DevOps

| # | Item | Beschrijving | Status |
|---|------|--------------|--------|
| I1 | Supabase project | PostgreSQL + Auth + profiles tabel met RLS | Done |
| I2 | Auth implementeren | Email/wachtwoord via Supabase Auth | Done |
| I3 | Audio opslag (Supabase Storage) | Native speaker .mp3 uploaden, expo-av integreren | Todo |
| I4 | EAS Build instellen | Cloud iOS-builds via `eas build --platform ios` | Todo |
| I5 | Apple Developer account | $99/jaar — vereist voor TestFlight en App Store | Todo |
| I6 | EAS Update (OTA) | Lesinhoud updaten zonder App Store review | Todo |
| I7 | Push notificaties | Lokale dagelijkse herinnering (18:00) via expo-notifications | Done |
| I7b | Remote push (server) | Supabase Edge Function als cron voor inactieve users | Todo |
| I8 | Sentry crash reporting | `@sentry/react-native` — stack traces uit productie | Todo |
| I9 | Analytics (PostHog) | Welke lessen voltooid, waar afhaken, meest fout beantwoord | Todo |
| I10 | Admin panel voor lesinhoud | Eenvoudig CMS zodat content kan worden toegevoegd zonder code | Todo |
| I11 | GitHub Actions CI | Automatische EAS build bij push naar `main` | Todo |
| I12 | Betalingsgateway | App Store in-app purchase voor Premium tier | Todo |

---

## Schrijfconventies (vaste regels voor alle lesinhoud)

| Klank / Regel | Schrijfwijze | Toelichting |
|---------------|-------------|-------------|
| O / u / ou | **ou** | Altijd als ou — nooit o of u apart schrijven |
| Sj-klank | **ch** | Ch = één klank (sjaal). Nooit "sj" of "sh" voor dit geluid |
| S + H apart | **sh** | Sh = twee losse letters s en h, niet de sj-klank |
| Zware h (ح) | **7** | Arabische keelklank, geschreven als cijfer 7 |
| Diepe k (ق) | **9** | Arabische keelklank, geschreven als cijfer 9. Nooit q |
| Ain (ع) | **3** | Arabische keelklank, geschreven als cijfer 3 |
| Harde g | **kh** | Zoals de Nederlandse g in "goed" |
| Rollende g (غ) | **gh** | Dieper dan kh, gegorgeld geluid |
| Ha-klank (ه) | **ha** | Nooit als "8" schrijven — altijd "ha" |
| Klinkers weglaten | Optioneel | Mag worden weggelaten (bnt), maar behoud als de uitspraak het vereist |
| Kan / kat / kay | Volledig | Nooit afkorten naar kn / kt / ky |

---

## Notities

- Alle audio moet van native speakers komen — geen TTS
- Fonetische schrijfwijze (bijv. "salam" niet alleen "سلام") is essentieel voor de doelgroep
- App werkt offline voor alle basis lessen — geen internetverbinding vereist voor MVP
- Lesinhoud wordt ingevuld door de contentmaker (neef van Joshua)
- AI (Claude) genereert nooit zelf Darija-lesinhoud — alleen verhalen en coaching in V2
