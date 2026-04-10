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

export interface Island {
  id: string;
  name: string;
  emoji: string;
  color: string;
  lessons: LessonWithQuestions[];
}

export const ISLANDS: Island[] = [
  {
    id: 'island-1',
    name: 'Basiswoorden',
    emoji: '🏝️',
    color: '#2E7D32',
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
    color: '#1565C0',
    lessons: [],
  },
  {
    id: 'island-3',
    name: 'Familie',
    emoji: '👨‍👩‍👧',
    color: '#6A1B9A',
    lessons: [],
  },
  {
    id: 'island-4',
    name: 'Getallen',
    emoji: '🔢',
    color: '#E65100',
    lessons: [],
  },
  {
    id: 'island-5',
    name: 'Eten & drinken',
    emoji: '🍵',
    color: '#AD1457',
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
