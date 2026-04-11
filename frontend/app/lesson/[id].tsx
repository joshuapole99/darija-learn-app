import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { getLessonById, QuizQuestion } from '../../src/data/lessonData';
import { useProgress } from '../../src/hooks/useProgress';
import { useAuth } from '../../src/context/AuthContext';
import { addXP } from '../../src/lib/xp';

type Phase = 'quiz' | 'feedback';

export default function QuizScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = getLessonById(id);
  const { markLessonComplete, recordError, canMakeError } = useProgress();
  const { session, refreshProfile, profile } = useAuth();
  const isPremium = profile?.is_premium ?? false;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>('quiz');
  const [answers, setAnswers] = useState<boolean[]>([]);

  if (!lesson) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Les niet gevonden</Text>
      </View>
    );
  }

  const question: QuizQuestion = lesson.questions[currentIndex];
  const total = lesson.questions.length;
  const progressPercent = currentIndex / total;

  const handleSelect = async (option: string) => {
    if (phase === 'feedback') return;
    setSelectedOption(option);
    setPhase('feedback');
    if (option !== question.correctAnswer) {
      await recordError();
    }
  };

  const handleContinue = async () => {
    const correct = selectedOption === question.correctAnswer;
    const newAnswers = [...answers, correct];
    const isLastQuestion = currentIndex + 1 >= total;

    if (isLastQuestion) {
      const score = newAnswers.filter(Boolean).length / newAnswers.length;
      const passed = score >= 0.8;
      if (passed) {
        await markLessonComplete(id);
        if (session?.user.id) {
          const correctCount = newAnswers.filter(Boolean).length;
          const xpAmount = correctCount * 5 + (score === 1 ? 35 : 20);
          await addXP(session.user.id, xpAmount);
          await refreshProfile();
        }
      }
      router.replace({
        pathname: '/completion',
        params: {
          lessonId: id,
          score: Math.round(score * 100).toString(),
          passed: passed ? '1' : '0',
        },
      });
    } else {
      setAnswers(newAnswers);
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setPhase('quiz');
    }
  };

  function getOptionStyle(option: string) {
    if (phase !== 'feedback') return styles.optionDefault;
    if (option === question.correctAnswer) return styles.optionCorrect;
    if (option === selectedOption) return styles.optionWrong;
    return styles.optionDefault;
  }

  function getOptionTextStyle(option: string) {
    if (phase !== 'feedback') return styles.optionText;
    if (option === question.correctAnswer) return styles.optionTextCorrect;
    if (option === selectedOption) return styles.optionTextWrong;
    return styles.optionText;
  }

  const isCorrect = selectedOption === question.correctAnswer;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: lesson.title }} />

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progressPercent * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.counter}>
          Vraag {currentIndex + 1} van {total}
        </Text>

        <Text style={styles.question}>{question.question}</Text>

        <View style={styles.options}>
          {question.options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.optionBase, getOptionStyle(option)]}
              onPress={() => handleSelect(option)}
              activeOpacity={phase === 'feedback' ? 1 : 0.75}
            >
              <Text style={[styles.optionText, getOptionTextStyle(option)]}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {phase === 'feedback' && (
          <View style={[styles.feedbackBox, isCorrect ? styles.feedbackCorrect : styles.feedbackWrong]}>
            <Text style={styles.feedbackTitle}>
              {isCorrect ? '✅ Correct!' : '❌ Fout!'}
            </Text>
            {!isCorrect && (
              <Text style={styles.feedbackHint}>
                Het juiste antwoord is: <Text style={styles.feedbackAnswer}>{question.correctAnswer}</Text>
              </Text>
            )}
            {!canMakeError && !isCorrect && !isPremium && (
              <Text style={styles.limitWarning}>
                Je hebt vandaag 5 fouten bereikt. Je kunt nog wel de huidige les afmaken.
              </Text>
            )}
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.continueText}>
                {currentIndex + 1 >= total ? 'Bekijk resultaat' : 'Volgende vraag'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF6EC',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#555',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#006233',
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  counter: {
    fontSize: 13,
    color: '#999',
    marginBottom: 16,
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 32,
    lineHeight: 30,
  },
  options: {
    gap: 12,
  },
  optionBase: {
    borderRadius: 14,
    padding: 18,
    borderWidth: 2,
  },
  optionDefault: {
    backgroundColor: '#fff',
    borderColor: '#E0D5C5',
  },
  optionCorrect: {
    backgroundColor: '#E8F5E9',
    borderColor: '#006233',
  },
  optionWrong: {
    backgroundColor: '#FFEBEE',
    borderColor: '#C62828',
  },
  optionText: {
    fontSize: 17,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  optionTextCorrect: {
    color: '#1B5E20',
    fontWeight: '700',
  },
  optionTextWrong: {
    color: '#B71C1C',
    fontWeight: '700',
  },
  feedbackBox: {
    marginTop: 28,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  feedbackCorrect: {
    backgroundColor: '#E8F5E9',
    borderColor: '#A5D6A7',
  },
  feedbackWrong: {
    backgroundColor: '#FFEBEE',
    borderColor: '#EF9A9A',
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  feedbackHint: {
    fontSize: 15,
    color: '#555',
    marginBottom: 4,
  },
  feedbackAnswer: {
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  limitWarning: {
    fontSize: 13,
    color: '#E65100',
    marginTop: 8,
    marginBottom: 4,
  },
  continueButton: {
    backgroundColor: '#006233',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
