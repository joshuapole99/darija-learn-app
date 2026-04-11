export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface LessonWithQuestions {
  id: string;
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
}

export interface IslandInfo {
  description: string;
  keyTopics: string[];
}

export interface Island {
  id: string;
  name: string;
  emoji: string;
  color: string;
  chapter: number;
  chapterName: string;
  info: IslandInfo;
  isIntro?: boolean;
  lessons: LessonWithQuestions[];
}

export const ISLANDS: Island[] = [
  // ─── INTRO EILAND (staat apart, voor hoofdstuk 1) ────────────────────────────
  {
    id: 'island-0',
    name: 'Schrift & Uitspraak',
    emoji: '🔤',
    color: '#F57F17',
    chapter: 0,
    chapterName: 'Introductie',
    isIntro: true,
    info: {
      description: 'Leer hoe Darija klinkt en hoe deze app het schrijft. Essentieel voor alles wat daarna komt.',
      keyTopics: ['ou, ch, sh', '7 en q (9)', '3 en gh', 'Waarom iedereen anders schrijft', 'De vaste regels van deze app'],
    },
    lessons: [],
  },

  // ─── HOOFDSTUK 1 — Basis & Tegenwoordige Tijd ───────────────────────────────
  {
    id: 'island-1',
    name: 'Basiswoorden',
    emoji: '🏝️',
    color: '#2E7D32',
    chapter: 1,
    chapterName: 'Basis & Tegenwoordige Tijd',
    info: {
      description: 'Leer de meest voorkomende zelfstandige naamwoorden in Darija. De basis van elke zin begint hier.',
      keyTopics: ['weld (jongen)', 'bnt (meisje)', 'dar (huis)', 'ma (water)', 'rajl (man)', 'mra (vrouw)'],
    },
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'Les 1: Jongen & meisje',
        subtitle: 'weld, bnt',
        questions: [
          {
            id: 'q-1-1-1',
            question: 'Wat betekent "weld"?',
            options: ['meisje', 'jongen', 'man', 'kind'],
            correctAnswer: 'jongen',
          },
          {
            id: 'q-1-1-2',
            question: 'Wat betekent "bnt"?',
            options: ['jongen', 'vrouw', 'meisje', 'zus'],
            correctAnswer: 'meisje',
          },
          {
            id: 'q-1-1-3',
            question: 'Hoe zeg je "jongen" in Darija?',
            options: ['bnt', 'rajl', 'weld', 'dyal'],
            correctAnswer: 'weld',
          },
          {
            id: 'q-1-1-4',
            question: 'Hoe zeg je "meisje" in Darija?',
            options: ['mra', 'bnt', 'khti', 'nta'],
            correctAnswer: 'bnt',
          },
          {
            id: 'q-1-1-5',
            question: '"Weld" en "bnt" zijn...',
            options: ['kleuren', 'getallen', 'groeten', 'personen'],
            correctAnswer: 'personen',
          },
        ],
      },
      {
        id: 'lesson-1-2',
        title: 'Les 2: Huis & water',
        subtitle: 'dar, ma',
        questions: [
          {
            id: 'q-1-2-1',
            question: 'Wat betekent "dar"?',
            options: ['water', 'huis', 'deur', 'straat'],
            correctAnswer: 'huis',
          },
          {
            id: 'q-1-2-2',
            question: 'Wat betekent "ma"?',
            options: ['moeder', 'zee', 'water', 'melk'],
            correctAnswer: 'water',
          },
          {
            id: 'q-1-2-3',
            question: 'Hoe zeg je "huis" in Darija?',
            options: ['ma', 'bab', 'dar', 'zenqa'],
            correctAnswer: 'dar',
          },
          {
            id: 'q-1-2-4',
            question: 'Hoe zeg je "water" in Darija?',
            options: ['hlib', 'ma', 'atay', 'casida'],
            correctAnswer: 'ma',
          },
          {
            id: 'q-1-2-5',
            question: '"Dar" betekent...',
            options: ['straat', 'kamer', 'huis', 'stad'],
            correctAnswer: 'huis',
          },
        ],
      },
    ],
  },
  {
    id: 'island-2',
    name: 'Groeten',
    emoji: '👋',
    color: '#388E3C',
    chapter: 1,
    chapterName: 'Basis & Tegenwoordige Tijd',
    info: {
      description: 'Leer hoe je iemand begroet in Darija — van formeel tot informeel. Altijd de juiste begroeting.',
      keyTopics: ['salam (hallo)', 'labas? (hoe gaat het?)', 'mrhba (welkom)', 'sjno akhbar? (wat is er nieuws?)', 'bslama (tot ziens)', 'Allah ihefdek (pas op jezelf)'],
    },
    lessons: [],
  },
  {
    id: 'island-3',
    name: 'Jezelf voorstellen',
    emoji: '🙋',
    color: '#43A047',
    chapter: 1,
    chapterName: 'Basis & Tegenwoordige Tijd',
    info: {
      description: 'Leer hoe je jezelf voorstelt: je naam, waar je vandaan komt en hoe oud je bent.',
      keyTopics: ['ana ... (ik ben ...)', 'smiyti ... (mijn naam is ...)', 'mnin nta/nti? (waar kom jij vandaan?)', '3ndi ... 3am (ik ben ... jaar)', 'kansakken f ... (ik woon in ...)', 'mzyan/mzyana (goed)'],
    },
    lessons: [],
  },
  {
    id: 'island-4',
    name: 'Familie',
    emoji: '👨‍👩‍👧',
    color: '#558B2F',
    chapter: 1,
    chapterName: 'Basis & Tegenwoordige Tijd',
    info: {
      description: 'Leer hoe je over je familieleden praat in Darija. Familie staat centraal in de Marokkaanse cultuur.',
      keyTopics: ['mmi (mijn moeder)', 'bba (mijn vader)', 'khti (mijn zus)', 'khoya (mijn broer)', '3ammi (mijn oom, vaderszijde)', '3amma (mijn tante, vaderszijde)'],
    },
    lessons: [],
  },
  {
    id: 'island-5',
    name: 'Getallen 1–20',
    emoji: '🔢',
    color: '#33691E',
    chapter: 1,
    chapterName: 'Basis & Tegenwoordige Tijd',
    info: {
      description: 'Leer tellen van 1 tot 20 in Darija. Onmisbaar voor leeftijden, hoeveelheden en prijzen.',
      keyTopics: ['wahed (1)', 'jouj (2)', 'tlata (3)', 'rb3a (4)', 'khamsa (5)', '3ashara (10) · 3shrin (20)'],
    },
    lessons: [],
  },
  {
    id: 'island-6',
    name: 'Kleuren',
    emoji: '🎨',
    color: '#1B5E20',
    chapter: 1,
    chapterName: 'Basis & Tegenwoordige Tijd',
    info: {
      description: 'Leer de kleurnamen in Darija. Bijvoeglijke naamwoorden komen ná het zelfstandig naamwoord.',
      keyTopics: ['l7mer (rood)', 'khal (zwart)', 'byed (wit)', 'zra9 (blauw)', 'akhdar (groen)', 'sfer (geel)'],
    },
    lessons: [],
  },
  {
    id: 'island-7',
    name: 'Zijn & Hebben',
    emoji: '⚡',
    color: '#004D40',
    chapter: 1,
    chapterName: 'Basis & Tegenwoordige Tijd',
    info: {
      description: 'Leer de basisstructuur van een Darija-zin met "zijn" en "hebben". Essentieel voor alle verdere zinnen.',
      keyTopics: ['ana (ik)', 'nta/nti (jij m/v)', 'huwa/hiya (hij/zij)', '3endi (ik heb)', 'ma 3endish (ik heb niet)', 'koun (zijn/worden)'],
    },
    lessons: [],
  },
  {
    id: 'island-8',
    name: 'Dagelijkse werkwoorden',
    emoji: '🏃',
    color: '#00695C',
    chapter: 1,
    chapterName: 'Basis & Tegenwoordige Tijd',
    info: {
      description: 'Leer de meestgebruikte werkwoorden in de tegenwoordige tijd en maak je eerste echte zinnen.',
      keyTopics: ['kan-akol (ik eet)', 'kan-shreb (ik drink)', 'kan-mshi (ik ga)', 'kan-ji (ik kom)', 'kan-9ra (ik lees)', 'kan-kteb (ik schrijf)'],
    },
    lessons: [],
  },
  {
    id: 'island-9',
    name: 'Eten & drinken',
    emoji: '🍵',
    color: '#00796B',
    chapter: 1,
    chapterName: 'Basis & Tegenwoordige Tijd',
    info: {
      description: 'Leer woordenschat voor eten en drinken. Bestel in een café of vraag thuis om iets.',
      keyTopics: ['atay (thee)', 'khobz (brood)', 'tajin (tajine)', 'hlib (melk)', '3asel (honing)', 'aji naklo! (kom, laten we eten!)'],
    },
    lessons: [],
  },
  {
    id: 'island-10',
    name: 'Dagelijkse routines',
    emoji: '🌅',
    color: '#00897B',
    chapter: 1,
    chapterName: 'Basis & Tegenwoordige Tijd',
    info: {
      description: 'Leer zinnen voor je dagelijkse bezigheden en kloktijden in Darija.',
      keyTopics: ['s-sba7 (ochtend)', 'l-3shiya (avond)', 'kan-s7a (ik word wakker)', 'kan-n3as (ik slaap)', 'f stta d-s-sa3at (om 6 uur)', 'mn daba (vanaf nu)'],
    },
    lessons: [],
  },

  // ─── HOOFDSTUK 2 — Toekomstige Tijd ─────────────────────────────────────────
  {
    id: 'island-11',
    name: "Toekomst met 'ghadi'",
    emoji: '🚀',
    color: '#1565C0',
    chapter: 2,
    chapterName: 'Toekomstige Tijd',
    info: {
      description: 'Leer hoe je de toekomst uitdrukt in Darija met het hulpwoord "ghadi" (vergelijkbaar met "gaan + inf.").',
      keyTopics: ['ghadi nmshi (ik ga gaan)', 'ghadi nakol (ik ga eten)', 'ghadi nshreb (ik ga drinken)', 'ghadi nrqod (ik ga slapen)', 'ghadi nkoun (ik ga zijn)', 'wash ghadi t-ji? (kom je?)'],
    },
    lessons: [],
  },
  {
    id: 'island-12',
    name: 'Plannen maken',
    emoji: '📅',
    color: '#1976D2',
    chapter: 2,
    chapterName: 'Toekomstige Tijd',
    info: {
      description: 'Leer hoe je afspraken maakt en toekomstplannen bespreekt in het Darija.',
      keyTopics: ['ghedda (morgen)', 'ba3d ghedda (overmorgen)', 'had l-usbou3 (deze week)', 'fin ghadi tmshi? (waar ga je naartoe?)', 'waqtash? (wanneer?)', 'tma3na (samen)'],
    },
    lessons: [],
  },
  {
    id: 'island-13',
    name: 'Getallen 20–100',
    emoji: '💯',
    color: '#1E88E5',
    chapter: 2,
    chapterName: 'Toekomstige Tijd',
    info: {
      description: 'Leer tellen van 20 tot 100 in Darija. Onmisbaar bij prijzen en hoeveelheden op de markt.',
      keyTopics: ['3shrin (20)', 'tlatin (30)', 'rb3in (40)', 'khamsin (50)', 's-ttin (60)', 'miya (100)'],
    },
    lessons: [],
  },
  {
    id: 'island-14',
    name: 'In de winkel',
    emoji: '🛍️',
    color: '#0D47A1',
    chapter: 2,
    chapterName: 'Toekomstige Tijd',
    info: {
      description: 'Leer hoe je iets koopt, naar de prijs vraagt en onderhandelt op de Marokkaanse markt.',
      keyTopics: ['bshal hada? (hoeveel kost dit?)', 'ghali bzzaf (te duur)', '3tini... (geef mij...)', 'wakha (oké)', 'shhal trid? (hoeveel wil je?)', 'mzyan l-bda3 (goed spul)'],
    },
    lessons: [],
  },
  {
    id: 'island-15',
    name: 'Weersverwachting',
    emoji: '🌤️',
    color: '#01579B',
    chapter: 2,
    chapterName: 'Toekomstige Tijd',
    info: {
      description: 'Leer hoe je het weer beschrijft en voorspelt in Darija. Seizoenen en weerswoorden.',
      keyTopics: ['sh-shta (regen/winter)', 's-sif (zomer)', 'kayban l-berd (het is koud)', 'kaydhar s-skhana (het is heet)', 'ghadi t-sh-shta (het gaat regenen)', 's-s7ab (bewolkt)'],
    },
    lessons: [],
  },
  {
    id: 'island-16',
    name: 'Wil & wens',
    emoji: '💫',
    color: '#006064',
    chapter: 2,
    chapterName: 'Toekomstige Tijd',
    info: {
      description: 'Leer hoe je wensen en verlangens uitdrukt met "bgha" en combineer dit met de toekomstige tijd.',
      keyTopics: ['kanbghi (ik wil)', 'ma kanbghish (ik wil niet)', 'kanbghi nakol (ik wil eten)', 'wash tebghi...? (wil jij...?)', 'bghit (ik wou)', 'inshallah (als God het wil)'],
    },
    lessons: [],
  },
  {
    id: 'island-17',
    name: 'Uitnodigingen',
    emoji: '🎉',
    color: '#0277BD',
    chapter: 2,
    chapterName: 'Toekomstige Tijd',
    info: {
      description: 'Leer hoe je iemand uitnodigt en reageert op een uitnodiging — accepteren of vriendelijk afslaan.',
      keyTopics: ['3afak (alsjeblieft)', 't3al (kom hier)', 'tfa7al (ga je gang)', 'ma3andish we9t (ik heb geen tijd)', 'mrhba bik (welkom bij ons)', 'ghadi nkoun temma (ik zal er zijn)'],
    },
    lessons: [],
  },
  {
    id: 'island-18',
    name: 'Vervoer & reizen',
    emoji: '🚌',
    color: '#0288D1',
    chapter: 2,
    chapterName: 'Toekomstige Tijd',
    info: {
      description: 'Leer zinnen voor onderweg zijn: taxi, bus, trein en je bestemming aangeven.',
      keyTopics: ['taxis (taxi)', 'tobis (bus)', 'tren (trein)', 'waqtash kaytl3? (wanneer vertrekt het?)', 'bghit nmshi l... (ik wil gaan naar...)', 'hal kayn place? (is er ruimte?)'],
    },
    lessons: [],
  },
  {
    id: 'island-19',
    name: 'Lichaam & gezondheid',
    emoji: '🏥',
    color: '#039BE5',
    chapter: 2,
    chapterName: 'Toekomstige Tijd',
    info: {
      description: 'Leer lichaamsdelen en hoe je een klacht beschrijft. Bij de dokter in de toekomstige tijd.',
      keyTopics: ['ras (hoofd)', '9elb (hart)', 'rejlin (benen)', 'kan-d3or... (... doet pijn)', 'khasek t7em tbib (ga naar de dokter)', 'ghadi nmshi l-sbitar (ik ga naar het ziekenhuis)'],
    },
    lessons: [],
  },
  {
    id: 'island-20',
    name: 'Herhaling H2',
    emoji: '🏆',
    color: '#00ACC1',
    chapter: 2,
    chapterName: 'Toekomstige Tijd',
    info: {
      description: 'Combinatieoefeningen over alles uit Hoofdstuk 2: toekomstige tijd, wensen, getallen en reizen.',
      keyTopics: ['ghadi + werkwoord (toekomst)', 'bgha (willen)', 'getallen 20–100', 'markt & winkelen', 'uitnodigingen', 'vervoer & reizen'],
    },
    lessons: [],
  },

  // ─── HOOFDSTUK 3 — Verleden Tijd ─────────────────────────────────────────────
  {
    id: 'island-21',
    name: 'Verleden tijd basis',
    emoji: '📜',
    color: '#6A1B9A',
    chapter: 3,
    chapterName: 'Verleden Tijd',
    info: {
      description: 'Leer hoe regelmatige werkwoorden worden vervoegd in de verleden tijd. Het patroon voor bijna alle werkwoorden.',
      keyTopics: ['mshit (ik ging)', 'kliti? (heb jij gegeten?)', 'shreb (hij dronk)', 'ktebna (we schreven)', 'ma + werkwoord + sh (ontkenning)', 'mnin rjiti? (wanneer ben je teruggekomen?)'],
    },
    lessons: [],
  },
  {
    id: 'island-22',
    name: 'Wat deed je gisteren?',
    emoji: '🗓️',
    color: '#7B1FA2',
    chapter: 3,
    chapterName: 'Verleden Tijd',
    info: {
      description: 'Leer zinnen om over gisteren te praten en je dag te beschrijven in de verleden tijd.',
      keyTopics: ['lbareh (gisteren)', 'mn s-sba7 (vanochtend)', 'mshit l souk (ik ging naar de markt)', 'klit khobz (ik at brood)', 'shrebt atay (ik dronk thee)', 'rqedt bekri (ik sliep vroeg)'],
    },
    lessons: [],
  },
  {
    id: 'island-23',
    name: 'Onregelmatige werkwoorden',
    emoji: '🔀',
    color: '#8E24AA',
    chapter: 3,
    chapterName: 'Verleden Tijd',
    info: {
      description: 'Leer de meestgebruikte onregelmatige werkwoorden in de verleden tijd — die je écht nodig hebt.',
      keyTopics: ['ja → jit (komen → ik kwam)', 'msha → mshit (gaan → ik ging)', 'kla → klit (eten → ik at)', 'shaf → shift (zien → ik zag)', '9al → 9lt (zeggen → ik zei)', '3ref → 3refti (weten → jij wist)'],
    },
    lessons: [],
  },
  {
    id: 'island-24',
    name: 'Verhalen vertellen',
    emoji: '📖',
    color: '#4A148C',
    chapter: 3,
    chapterName: 'Verleden Tijd',
    info: {
      description: 'Leer hoe je een gebeurtenis navertelt met verbindingswoorden. Maak je verhaal vloeiend.',
      keyTopics: ['f lwe9t lli (toen / op het moment dat)', 'mn b3d (daarna)', 'hit (omdat)', '9bel ma (voordat)', 'w (en)', 'walakin (maar)'],
    },
    lessons: [],
  },
  {
    id: 'island-25',
    name: 'Vragen in verleden tijd',
    emoji: '❓',
    color: '#6A1B9A',
    chapter: 3,
    chapterName: 'Verleden Tijd',
    info: {
      description: 'Leer hoe je vragen stelt over het verleden: waar, wat, wanneer, met wie en waarom.',
      keyTopics: ['fin mshiti? (waar ben je naartoe gegaan?)', 'sjno driti? (wat heb je gedaan?)', 'm3a shkoun? (met wie?)', 'waqtash? (wanneer?)', 'kif-ash? (hoe?)', '3lash? (waarom?)'],
    },
    lessons: [],
  },
  {
    id: 'island-26',
    name: 'Ontkenning verleden',
    emoji: '🚫',
    color: '#AD1457',
    chapter: 3,
    chapterName: 'Verleden Tijd',
    info: {
      description: 'Leer hoe je zinnen in de verleden tijd ontkent met het patroon "ma...sh".',
      keyTopics: ['ma mshitsh (ik ging niet)', 'ma klitsh (ik at niet)', 'ma sheftsh (ik zag niet)', 'ma 3raftsh (ik wist het niet)', 'ma jitsh (ik kwam niet)', 'ma 9ltsh (ik zei het niet)'],
    },
    lessons: [],
  },
  {
    id: 'island-27',
    name: 'Familie & herinneringen',
    emoji: '📷',
    color: '#880E4F',
    chapter: 3,
    chapterName: 'Verleden Tijd',
    info: {
      description: 'Leer hoe je over vroeger praat en gewoonten in het verleden beschrijft samen met familie.',
      keyTopics: ['mnin kunt s-ghir (toen ik klein was)', 'kont kan-... (ik deed vroeger ...)', 'dak le9dim (vroeger)', 'fi dak le9t (in die tijd)', 'bhalma... (net zoals...)', 'tft7 l-bal (je herinnert je)'],
    },
    lessons: [],
  },
  {
    id: 'island-28',
    name: 'School & werk',
    emoji: '💼',
    color: '#C62828',
    chapter: 3,
    chapterName: 'Verleden Tijd',
    info: {
      description: 'Leer woordenschat voor school en werk, en beschrijf je werkdag in de verleden tijd.',
      keyTopics: ['l-madrasa (de school)', 'l-khedma (het werk)', 'l-ostaz (de leraar)', 'drst (ik studeerde)', 'khdemt (ik werkte)', 'n9qt (ik slaagde)'],
    },
    lessons: [],
  },
  {
    id: 'island-29',
    name: 'Feesten & tradities',
    emoji: '🎊',
    color: '#B71C1C',
    chapter: 3,
    chapterName: 'Verleden Tijd',
    info: {
      description: 'Leer Darija-woorden voor feesten, Ramadan en bruiloften — beschrijf wat er is gebeurd.',
      keyTopics: ['l-3id (het feest / Eid)', 'ramadan (Ramadan)', 'l-3ers (de bruiloft)', 'tbarkllah (gefeliciteerd)', 'ferahna bzzaf (we waren erg blij)', 'kanu kayklsu zwin (ze droegen prachtige kleding)'],
    },
    lessons: [],
  },
  {
    id: 'island-30',
    name: 'Grote herhaling',
    emoji: '🌟',
    color: '#4E342E',
    chapter: 3,
    chapterName: 'Verleden Tijd',
    info: {
      description: 'Samenvatting en oefening over alle drie de tijden: tegenwoordig, toekomst en verleden.',
      keyTopics: ['tegenwoordige tijd (kan-...)', 'toekomstige tijd (ghadi + ...)', 'verleden tijd (-t, -ti, -na)', 'ontkenning (ma...sh)', 'vragen stellen', 'verhalen vertellen'],
    },
    lessons: [],
  },
];

export function getLessonById(lessonId: string): LessonWithQuestions | undefined {
  for (const island of ISLANDS) {
    const lesson = island.lessons.find((l) => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}

export function getIslandById(islandId: string): Island | undefined {
  return ISLANDS.find((i) => i.id === islandId);
}

export function getIslandForLesson(lessonId: string): Island | undefined {
  return ISLANDS.find((island) => island.lessons.some((l) => l.id === lessonId));
}
