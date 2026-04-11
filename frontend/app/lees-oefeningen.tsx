import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const SAMPLE_EXERCISE = {
  text: 'Ana smiyti Youssef. Ana kansakken f Amsterdam. 3ndi tlata w 3shrin 3am. 3ndi khoya wahed u khti wahed. Kanbghi nakol tajin u nshreb atay.',
  translation: 'Ik ben Youssef. Ik woon in Amsterdam. Ik ben 23 jaar oud. Ik heb één broer en één zus. Ik wil graag tajine eten en thee drinken.',
  questions: [
    {
      question: 'Waar woont Youssef?',
      options: ['Casablanca', 'Rotterdam', 'Amsterdam', 'Marrakech'],
      correct: 'Amsterdam',
    },
    {
      question: 'Hoe oud is Youssef?',
      options: ['20 jaar', '23 jaar', '25 jaar', '30 jaar'],
      correct: '23 jaar',
    },
    {
      question: 'Wat wil Youssef graag drinken?',
      options: ['Koffie', 'Water', 'Melk', 'Atay (thee)'],
      correct: 'Atay (thee)',
    },
  ],
};

export default function LeesOefeningenScreen() {
  const [showTranslation, setShowTranslation] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = submitted
    ? SAMPLE_EXERCISE.questions.filter((q, i) => answers[i] === q.correct).length
    : 0;

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowTranslation(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.textCard}>
          <View style={styles.textHeader}>
            <Text style={styles.textLabel}>Lees de tekst</Text>
            <TouchableOpacity onPress={() => setShowTranslation(!showTranslation)}>
              <Text style={styles.translateToggle}>
                {showTranslation ? 'Verberg vertaling' : 'Toon vertaling'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.darıjaText}>{SAMPLE_EXERCISE.text}</Text>
          {showTranslation && (
            <View style={styles.translationBox}>
              <Text style={styles.translationText}>{SAMPLE_EXERCISE.translation}</Text>
            </View>
          )}
        </View>

        <Text style={styles.questionsLabel}>Beantwoord de vragen</Text>

        {SAMPLE_EXERCISE.questions.map((q, qi) => (
          <View key={qi} style={styles.questionCard}>
            <Text style={styles.questionText}>{q.question}</Text>
            <View style={styles.optionsGrid}>
              {q.options.map((opt) => {
                const selected = answers[qi] === opt;
                const isCorrect = submitted && opt === q.correct;
                const isWrong = submitted && selected && opt !== q.correct;
                return (
                  <TouchableOpacity
                    key={opt}
                    style={[
                      styles.option,
                      selected && !submitted && styles.optionSelected,
                      isCorrect && styles.optionCorrect,
                      isWrong && styles.optionWrong,
                    ]}
                    onPress={() => {
                      if (submitted) return;
                      setAnswers((prev) => ({ ...prev, [qi]: opt }));
                    }}
                    activeOpacity={submitted ? 1 : 0.7}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isCorrect && styles.optionTextCorrect,
                        isWrong && styles.optionTextWrong,
                      ]}
                    >
                      {opt}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {!submitted ? (
          <TouchableOpacity
            style={[
              styles.submitButton,
              Object.keys(answers).length < SAMPLE_EXERCISE.questions.length && styles.submitButtonDisabled,
            ]}
            onPress={() => setSubmitted(true)}
            disabled={Object.keys(answers).length < SAMPLE_EXERCISE.questions.length}
          >
            <Text style={styles.submitButtonText}>Controleer antwoorden</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.resultBox}>
            <Text style={styles.resultScore}>
              {score}/{SAMPLE_EXERCISE.questions.length} goed
            </Text>
            <Text style={styles.resultMessage}>
              {score === SAMPLE_EXERCISE.questions.length
                ? 'Perfect! Alle antwoorden goed! 🎉'
                : score >= 2
                ? 'Goed gedaan! Bijna perfect. 👍'
                : 'Probeer het nog eens! 💪'}
            </Text>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Opnieuw proberen</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonText}>🚧 Meer leesoefeningen komen binnenkort</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF6EC',
  },
  content: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
  textCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  textHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  textLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8B6F47',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  translateToggle: {
    fontSize: 13,
    color: '#2E7D32',
    fontWeight: '600',
  },
  darıjaText: {
    fontSize: 16,
    color: '#1a1a1a',
    lineHeight: 26,
    fontStyle: 'italic',
  },
  translationBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0E6D3',
  },
  translationText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  questionsLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    borderWidth: 1.5,
    borderColor: '#E0D5C5',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  optionSelected: {
    borderColor: '#2E7D32',
    backgroundColor: '#E8F5E9',
  },
  optionCorrect: {
    borderColor: '#2E7D32',
    backgroundColor: '#E8F5E9',
  },
  optionWrong: {
    borderColor: '#C62828',
    backgroundColor: '#FFEBEE',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  optionTextCorrect: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  optionTextWrong: {
    color: '#C62828',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#B0BEC5',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  resultBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  resultScore: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  resultMessage: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
  },
  resetButton: {
    marginTop: 8,
    borderWidth: 2,
    borderColor: '#2E7D32',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  resetButtonText: {
    color: '#2E7D32',
    fontSize: 15,
    fontWeight: '700',
  },
  comingSoon: {
    backgroundColor: '#F0E6D3',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  comingSoonText: {
    fontSize: 13,
    color: '#8B6F47',
    fontWeight: '500',
  },
});
