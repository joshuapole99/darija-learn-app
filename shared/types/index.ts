// Gedeelde types tussen frontend en backend

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  theme: string;
  words: DarijaWord[];
  completed?: boolean;
}

export interface DarijaWord {
  id: string;
  darija: string;         // fonetisch (latijns schrift)
  arabic?: string;        // Arabisch schrift (optioneel)
  dutch: string;          // Nederlandse vertaling
  audioUrl?: string;      // URL naar native speaker opname
  exampleSentence?: string;
}

export interface QuizQuestion {
  id: string;
  lessonId: string;
  type: 'multiple_choice' | 'listen_and_pick';
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface UserProgress {
  userId: string;
  completedLessons: string[];
  streak: number;
  lastActiveDate: string;
  totalXP: number;
}
