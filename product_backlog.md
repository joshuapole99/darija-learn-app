# Product Backlog — Darija Learn App

## Kernvisie

Een eilanden-kaart scherm als hoofdscherm. De gebruiker ziet een pad met eilanden — elk eiland is een thema. Je klikt op een eiland en start een oefenles. Per thema zijn er 5 oefenlessen voordat je een toets krijgt. Haal je 80%+, dan unlock je het volgende eiland. Werkt offline.

---

## MVP (Eerste werkende versie)

Doel: een gebruiker kan lessen voltooien op een eilandenkaart, voortgang opslaan en het volgende eiland unlocken.

| # | Feature | Beschrijving | Status |
|---|---------|--------------|--------|
| 1 | Eilandenkaart (hoofdscherm) | Scrollbaar pad met eilanden per thema. Eilanden zijn locked/unlocked zichtbaar. Eerste eiland = Basiswoorden. | Todo |
| 2 | Les starten vanuit eiland | Tik op een eiland → start een van de 5 oefenlessen van dat thema | Todo |
| 3 | Meerkeuze quiz (lesformaat) | Per les: reeks meerkeuze vragen. 1 correct antwoord uit 4 opties. | Todo |
| 4 | 80% slagingseis | Les telt als voltooid als de gebruiker ≥80% goed heeft. Zo niet → opnieuw doen. | Todo |
| 5 | Voltooide les niet herhalen | Als een les eenmaal voltooid is (≥80%), hoeft de gebruiker hem niet opnieuw te doen | Todo |
| 6 | 5 lessen per thema + toets | Na 5 voltooide oefenlessen krijgt de gebruiker een afsluitende toets voor dat eiland | Todo |
| 7 | Eiland unlocken | Haal je de afsluitende toets → volgend eiland wordt unlocked | Todo |
| 8 | Positieve feedback bij voltooien | Geluidje + confetti/slingers animatie bij het voltooien van een les | Todo |
| 9 | 5-fouten-daglimiet (freemium) | Gebruiker mag per dag maximaal 5 fouten maken. Daarna wachten tot volgende dag. | Todo |
| 10 | Audio playback | Native opnames afspelen bij elk woord/zin | Todo |
| 11 | Voortgang opslaan (offline/lokaal) | Lokaal opslaan welke lessen voltooid zijn, fouten vandaag, welke eilanden unlocked zijn | Todo |
| 12 | Terug naar overzicht | Gebruiker kan na elke les terug naar de eilandenkaart zonder les te verliezen | Todo |
| 13 | Basis navigatie | Bottom tab nav: Eilanden, Oefeningen, Profiel | Todo |
| 14 | Eiland info-icoontje | Bij tik op een eiland: naast "Start les" ook een ℹ️-icoontje. Tik hierop → modal/sheet met uitleg van de lesinhoud van dat hoofdstuk (grammatica, woordenschat, wat de leerling gaat leren) | Todo |
| 15 | Oefeningen tab (lees + luister) | Aparte tab met twee subtabs: **Leesoefeningen** (korte tekst lezen + begripsvragen) en **Luisteroefeningen** (audio fragment afspelen + begripsvragen). Niveau is gekoppeld aan het verst unlocked eiland. | Todo |

---

## V1 (Gebruikersaccounts & engagement)

Doel: gebruikers komen terug elke dag en hebben een account.

| # | Feature | Beschrijving | Status |
|---|---------|--------------|--------|
| 16 | Gebruikersaccounts | Registreren / inloggen (voortgang opgeslagen in de cloud) | Done |
| 17 | Onbeperkt leren (betaald) | Betaalde upgrade: geen daglimiet op fouten, oneindig oefenen | Todo |
| 18 | Streaks | Dagelijkse leerstreak bijhouden | Todo |
| 19 | XP-systeem | XP verdienen per voltooide les, quiz en dag-streak. Elke juiste vraag = XP, bonus bij 100% score | Todo |
| 20 | Push notificaties | Herinnering om dagelijks te oefenen | Todo |
| 21 | Profiel pagina | Voortgang, streak, XP, unlocked eilanden en gekozen avatar tonen | Todo |
| 22 | Avatar / character kiezen | Gebruiker kiest bij registratie (en later in profiel) een personage uit een set van beschikbare avatars. Avatar zichtbaar op profiel en in de ranking | Done |
| 23 | Ranglijst (leaderboard) | Globale ranglijst op basis van totaal XP. Toont username, avatar, XP en rank-badge. Dagelijks/wekelijks/alltime filter. Eigen positie altijd zichtbaar onderaan | Todo |
| 24 | Rang-badges | Op basis van XP automatisch een rang toewijzen (bijv. Beginner → Leerling → Gevorderd → Meester → Darija Pro). Zichtbaar op profiel en in de ranglijst | Todo |

---

### XP-verdienmodel

| Actie | XP |
|-------|----|
| Vraag goed beantwoord | +5 XP |
| Les voltooid (≥80%) | +20 XP |
| Les voltooid met 100% | +35 XP (bonus) |
| Eiland volledig voltooid | +50 XP |
| Dagelijkse streak (+1 dag) | +10 XP |
| Uitspraaklessen voltooid | +25 XP (eenmalig) |

### Rang-badges (op basis van totaal XP)

| Rang | XP drempel | Badge |
|------|-----------|-------|
| Beginner | 0 XP | 🌱 |
| Leerling | 150 XP | 📖 |
| Gevorderd | 500 XP | ⭐ |
| Meester | 1500 XP | 🏅 |
| Darija Pro | 4000 XP | 🏆 |

### Avatars

Gebruikers kiezen bij registratie één avatar uit een vaste set illustraties (geen foto upload). Avatar is zichtbaar op:
- Eigen profielpagina
- Ranglijst naast de gebruikersnaam
- (V2) Eventuele social features

### Ranglijst (leaderboard)

- Globale lijst gesorteerd op totaal XP (hoog → laag)
- Filters: deze week / deze maand / all-time
- Toont: positie (#1, #2...), avatar, gebruikersnaam, rang-badge, XP
- Eigen positie altijd zichtbaar, ook als je buiten de top staat (grijze balk onderaan de lijst)

---

## V2 (AI & uitgebreide content)

Doel: AI-gegenereerde verhalen en adaptief leren.

| # | Feature | Beschrijving | Status |
|---|---------|--------------|--------|
| 22 | AI verhalen (Claude) | Claude genereert korte Darija verhalen afgestemd op het niveau van de gebruiker | Todo |
| 23 | AI chat coach | Claude-gebaseerde coach voor vragen over Darija | Todo |
| 24 | Spraakherkenning | Gebruiker spreekt Darija in | Todo |
| 25 | Uitspraak feedback (AI) | Claude geeft feedback op uitspraak | Todo |
| 26 | Adaptief leren | Zwakke punten vaker herhalen | Todo |
| 27 | Culturele uitleg | Extra context bij cultureel gevoelige onderwerpen | Todo |

---

## Thema's / Eilanden (inhoudelijk)

Elk eiland heeft 5 oefenlessen + 1 afsluitende toets. Elk eiland heeft een ℹ️-icoontje met een uitleg van de lesinhoud (grammatica + woordenschat).

De eilanden zijn gegroepeerd in **Hoofdstukken (Chapters)**. Elk hoofdstuk heeft 10 eilanden/onderwerpen.

---

### Hoofdstuk 1 — Basis & Tegenwoordige Tijd

| Eiland | Thema | Info-uitleg (modal inhoud) | Status |
|--------|-------|----------------------------|--------|
| 1 | Basiswoorden | Meest voorkomende zelfstandige naamwoorden: jongen, meisje, huis, water, etc. Geen werkwoorden nog. | Todo |
| 2 | Groeten | Standaard begroetingen: salam, labas, mrhba, sjno akhbar. Gebruik in formele vs. informele situaties. | Todo |
| 3 | Jezelf voorstellen | Ana + naam, smiyti, mnin nta/nti. Eenvoudige zinnen om jezelf voor te stellen. | Todo |
| 4 | Familie | Familietermen: mmi, bba, khti, khoya, 3ammi, 3amma. Hoe je over je familie praat. | Todo |
| 5 | Getallen 1–20 | Tellen van wahed tot 3shrin. Gebruik bij leeftijd en hoeveelheden. | Todo |
| 6 | Kleuren | Kleurwoorden: l7mer, khal, byed, zra9, etc. Bijvoeglijk naamwoord na het zelfstandig naamwoord. | Todo |
| 7 | Tegenwoordige tijd — zijn / hebben | Werkwoord "koun" (zijn) en bezit uitdrukken met 3endi. Basisstructuur van een Darija-zin. | Todo |
| 8 | Tegenwoordige tijd — dagelijkse werkwoorden | Werkwoorden kla (eten), shreb (drinken), msha (gaan), ja (komen) in de tegenwoordige tijd. | Todo |
| 9 | Eten & drinken | Woordenschat voor voedsel en dranken. Bestellen in een café of thuis vragen. | Todo |
| 10 | Dagelijkse routines | Zinnen over ochtend- en avondroutines. Kloktijden koppelen aan activiteiten. | Todo |

---

### Hoofdstuk 2 — Toekomstige Tijd

| Eiland | Thema | Info-uitleg (modal inhoud) | Status |
|--------|-------|----------------------------|--------|
| 11 | Toekomst vormen met "ghadi" | Ghadi + werkwoord = gaan + infinitief. Basisvorm van de Darija-toekomst. | Todo |
| 12 | Plannen maken | Zinnen voor afspraken en plannen: "ghadi nmshi l souk ghedda". | Todo |
| 13 | Getallen 20–100 | Tellen van 3shrin tot miya. Gebruik bij prijzen en hoeveelheden. | Todo |
| 14 | In de winkel | Kopen, vragen naar de prijs, onderhandelen. Woordenschat voor de markt en winkel. | Todo |
| 15 | Weersverwachting | Beschrijven hoe het weer morgen zal zijn. Seizoenen en weerswoorden. | Todo |
| 16 | Wil / wens uitdrukken | Bgha (willen) in combinatie met toekomstige plannen. Verschil tussen wens en plan. | Todo |
| 17 | Uitnodigingen | Iemand uitnodigen en reageren op een uitnodiging. Accepteren of afslaan. | Todo |
| 18 | Vervoer & reizen | Taxi, bus, trein: woorden en zinnen voor onderweg zijn. Bestemming aangeven. | Todo |
| 19 | Lichaam & gezondheid | Lichaamsdelen en klachten beschrijven. Bij de dokter (toekomst: "ghadi nmshi l tbib"). | Todo |
| 20 | Herhaling & mini-toets H2 | Combinatieoefeningen over de gehele toekomstige tijd en woordenschat H2. | Todo |

---

### Hoofdstuk 3 — Verleden Tijd

| Eiland | Thema | Info-uitleg (modal inhoud) | Status |
|--------|-------|----------------------------|--------|
| 21 | Verleden tijd — basisvorm | Hoe werkwoorden worden vervoegd in de verleden tijd. Patroon voor regelmatige werkwoorden. | Todo |
| 22 | Wat deed je gisteren? | Zinnen over gisteren: "mshit l souk, klit, shrebت atay". | Todo |
| 23 | Onregelmatige werkwoorden | Veelgebruikte onregelmatige werkwoorden in de verleden tijd: ja (komen), msha (gaan), kla (eten). | Todo |
| 24 | Verhalen vertellen | Een korte gebeurtenis navertellen. Verbindingswoorden: mn b3d, f lwe9t lli, hit. | Todo |
| 25 | Vragen in de verleden tijd | Hoe stel je vragen over het verleden: fin mshiti? Sjno driti? | Todo |
| 26 | Ontkenning in de verleden tijd | Ma + werkwoord + sh voor ontkenning. "Ma mshitsh l l7anout." | Todo |
| 27 | Familie & herinneringen | Praten over vroeger met de familie. Gewoonten in het verleden beschrijven. | Todo |
| 28 | Op school / werken | Woordenschat voor school en werk. Wat heb je geleerd/gedaan vandaag? | Todo |
| 29 | Feesten & tradities | Woordenschat voor Eid, Ramadan, huwelijken. Wat is er gebeurd tijdens een feest? | Todo |
| 30 | Herhaling & mini-toets H3 | Combinatieoefeningen over alle drie tijden: tegenwoordig, toekomst, verleden. | Todo |

---

---

## Oefeningen Tab (Lees- & Luisteroefeningen)

De Oefeningen-tab is een aparte sectie in de bottom navigation. Bij het openen krijgt de gebruiker twee keuzes:

| Optie | Naam | Beschrijving |
|-------|------|--------------|
| 1 | Leesoefeningen | Een korte tekst in Darija (fonetisch geschreven) lezen. Daarna begripsvragen (meerkeuze). Niveau past zich aan op het verst unlocked eiland. |
| 2 | Luisteroefeningen | Een audio-fragment van een native speaker afspelen. Daarna begripsvragen over wat je hebt gehoord. Herhaal het fragment zo vaak je wilt. |

**Gedrag:**
- Beide opties zijn los te gebruiken, onafhankelijk van de les-voortgang op de kaart
- Moeilijkheidsgraad is gekoppeld aan het verst bereikte eiland (chapter-niveau)
- Teksten en audiofragmenten worden door Joshua aangeleverd (geen AI-generatie in MVP)
- Leesoefeningen werken volledig offline; luisteroefeningen vereisen opgeslagen audio

---

## Notities

- Alle audio moet van native speakers komen — geen TTS
- Fonetische schrijfwijze (bijv. "salam" niet alleen "سلام") is essentieel voor de doelgroep
- App werkt offline voor alle basis lessen — geen internetverbinding vereist voor MVP
- Joshua vult zelf alle lesinhoud in (zie `/content/lessen/`)
- AI (Claude) genereert nooit zelf Darija-lesinhoud — alleen verhalen en coaching in V2

### Schrijfconventies (vaste regels voor alle lesinhoud)

Bij het aanmaken van lesinhoud gelden deze vaste regels. Ze zijn ook uitgelegd in de uitspraaklessen in de app.

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

## Infrastructuur & DevOps

| # | Item | Beschrijving | Status |
|---|------|--------------|--------|
| I1 | Supabase project opzetten | PostgreSQL database + Auth + File Storage in één service. Schema: users, progress, lessons, questions, words | Todo |
| I2 | Auth implementeren | Email/wachtwoord + **Apple Sign-In** (App Store vereiste als andere OAuth wordt aangeboden) via Supabase Auth | Todo |
| I3 | Audio opslag (Supabase Storage) | Native speaker .mp3 bestanden uploaden, `audioUrl` opslaan in lessons-tabel, expo-av integreren voor afspelen | Todo |
| I4 | EAS Build instellen | Cloud iOS-builds zonder Mac: `eas build --platform ios` → TestFlight-klaar .ipa. Gratis tot 30 builds/maand | Todo |
| I5 | Apple Developer account | $99/jaar — vereist voor TestFlight distributie en App Store release | Todo |
| I6 | EAS Update (OTA) | Lesinhoud updaten zonder App Store review via over-the-air JS bundle update. Kritisch voor een content-gedreven app | Todo |
| I7 | Push notificaties | `expo-notifications` + Supabase Edge Function als dagelijkse cron: "Tijd om te oefenen!" voor inactieve users | Todo |
| I8 | Sentry crash reporting | `@sentry/react-native` — gratis tier, stack traces uit productie builds, direct zien wat crasht | Todo |
| I9 | Analytics (PostHog) | Bijhouden welke lessen worden voltooid, waar gebruikers afhaken, welke vragen het meest fout worden beantwoord | Todo |
| I10 | Admin panel voor lesinhoud | Eenvoudig scherm (of Sanity CMS) zodat Joshua lessen kan toevoegen en aanpassen zonder code te wijzigen | Todo |
| I11 | GitHub Actions CI | Automatische EAS build triggeren bij push naar `main` branch | Todo |
