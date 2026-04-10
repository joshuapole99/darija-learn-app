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
| 13 | Basis navigatie | Bottom tab nav: Eilanden, Vertalen/Luisteren, Profiel | Todo |

---

## V1 (Gebruikersaccounts & engagement)

Doel: gebruikers komen terug elke dag en hebben een account.

| # | Feature | Beschrijving | Status |
|---|---------|--------------|--------|
| 14 | Gebruikersaccounts | Registreren / inloggen (voortgang opgeslagen in de cloud) | Todo |
| 15 | Onbeperkt leren (betaald) | Betaalde upgrade: geen daglimiet op fouten, oneindig oefenen | Todo |
| 16 | Vertalen / luisteroefeningen tab | Aparte tab met korte teksten vertalen of luisteroefeningen | Todo |
| 17 | Streaks | Dagelijkse leerstreak bijhouden | Todo |
| 18 | Punten systeem (XP) | XP verdienen per les en quiz | Todo |
| 19 | Push notificaties | Herinnering om dagelijks te oefenen | Todo |
| 20 | Profiel pagina | Voortgang, streak, XP, unlocked eilanden tonen | Todo |

---

## V2 (AI & uitgebreide content)

Doel: AI-gegenereerde verhalen en adaptief leren.

| # | Feature | Beschrijving | Status |
|---|---------|--------------|--------|
| 21 | AI verhalen (Claude) | Claude genereert korte Darija verhalen afgestemd op het niveau van de gebruiker | Todo |
| 22 | AI chat coach | Claude-gebaseerde coach voor vragen over Darija | Todo |
| 23 | Spraakherkenning | Gebruiker spreekt Darija in | Todo |
| 24 | Uitspraak feedback (AI) | Claude geeft feedback op uitspraak | Todo |
| 25 | Adaptief leren | Zwakke punten vaker herhalen | Todo |
| 26 | Culturele uitleg | Extra context bij cultureel gevoelige onderwerpen | Todo |

---

## Thema's / Eilanden (inhoudelijk)

Elk eiland heeft 5 oefenlessen + 1 afsluitende toets.

| Eiland | Thema | Status |
|--------|-------|--------|
| 1 | Basiswoorden (jongen, meisje, huis, water, etc.) | Todo |
| 2 | Groeten (salam, labas, mrhba) | Todo |
| 3 | Jezelf voorstellen | Todo |
| 4 | Familie (mmi, bba, khti, khoya) | Todo |
| 5 | Getallen 1–20 | Todo |
| 6 | Kleuren | Todo |
| 7 | Eten & drinken | Todo |
| 8 | In de winkel | Todo |
| 9 | Hoe voel je je? | Todo |
| 10 | Dagelijkse routines | Todo |
| 11+ | Uitgebreidere situaties (markt, taxi, dokter, etc.) | Todo |

---

## Notities

- Alle audio moet van native speakers komen — geen TTS
- Fonetische schrijfwijze (bijv. "salam" niet alleen "سلام") is essentieel voor de doelgroep
- App werkt offline voor alle basis lessen — geen internetverbinding vereist voor MVP
- Joshua vult zelf alle lesinhoud in (zie `/content/lessen/`)
- AI (Claude) genereert nooit zelf Darija-lesinhoud — alleen verhalen en coaching in V2
