import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ISLANDS } from '../data/lessonData';

const STORAGE_KEY = 'darija_progress';
const MAX_ERRORS_PER_DAY = 5;

interface ProgressData {
  completedLessons: string[];
  unlockedIslands: string[];
  errorsToday: number;
  lastActiveDate: string;
}

const DEFAULT_PROGRESS: ProgressData = {
  completedLessons: [],
  unlockedIslands: ['island-1'],
  errorsToday: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
};

function todayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  async function loadProgress() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setProgress(DEFAULT_PROGRESS);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROGRESS));
      } else {
        const stored: ProgressData = JSON.parse(raw);
        // Reset daily errors if it's a new day
        const today = todayString();
        if (stored.lastActiveDate !== today) {
          stored.errorsToday = 0;
          stored.lastActiveDate = today;
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        }
        setProgress(stored);
      }
    } catch {
      setProgress(DEFAULT_PROGRESS);
    } finally {
      setIsLoading(false);
    }
  }

  async function save(updated: ProgressData) {
    setProgress(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  const markLessonComplete = useCallback(
    async (lessonId: string) => {
      if (!progress) return;
      const updated = { ...progress };

      if (!updated.completedLessons.includes(lessonId)) {
        updated.completedLessons = [...updated.completedLessons, lessonId];
      }

      // Check if all lessons of an island are now complete → unlock next island
      for (let i = 0; i < ISLANDS.length; i++) {
        const island = ISLANDS[i];
        if (island.lessons.length === 0) continue;
        const allDone = island.lessons.every((l) =>
          updated.completedLessons.includes(l.id)
        );
        if (allDone && i + 1 < ISLANDS.length) {
          const nextIslandId = ISLANDS[i + 1].id;
          if (!updated.unlockedIslands.includes(nextIslandId)) {
            updated.unlockedIslands = [...updated.unlockedIslands, nextIslandId];
          }
        }
      }

      await save(updated);
    },
    [progress]
  );

  const recordError = useCallback(async () => {
    if (!progress) return;
    const updated = {
      ...progress,
      errorsToday: progress.errorsToday + 1,
      lastActiveDate: todayString(),
    };
    await save(updated);
  }, [progress]);

  const isLessonComplete = useCallback(
    (lessonId: string) => {
      return progress?.completedLessons.includes(lessonId) ?? false;
    },
    [progress]
  );

  const isIslandUnlocked = useCallback(
    (islandId: string) => {
      return progress?.unlockedIslands.includes(islandId) ?? false;
    },
    [progress]
  );

  const errorsToday = progress?.errorsToday ?? 0;
  const canMakeError = errorsToday < MAX_ERRORS_PER_DAY;

  return {
    progress,
    isLoading,
    markLessonComplete,
    recordError,
    isLessonComplete,
    isIslandUnlocked,
    errorsToday,
    canMakeError,
  };
}
