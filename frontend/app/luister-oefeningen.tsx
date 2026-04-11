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
  transcript: 'Salam! Ana smiyti Fatima. Ana kansakken f Rotterdam. 3ndi khoya u khti. Kanbghi bzzaf natay u nkol khobz f s-sba7.',
  translation: "Hallo! Ik heet Fatima. Ik woon in Rotterdam. Ik heb een broer en een zus. Ik hou er erg van om 's ochtends thee te drinken en brood te eten.",
  questions: [
    {
      question: 'Hoe heet de spreekster?',
      options: ['Nadia', 'Fatima', 'Khadija', 'Sanae'],
      correct: 'Fatima',
    },
    {
      question: 'Waar woont ze?',
      options: ['Amsterdam', 'Den Haag', 'Rotterdam', 'Utrecht'],
      correct: 'Rotterdam',
    },
    {
      question: "Wat doet ze graag 's ochtends?",
      options: ['Koffie drinken', 'Sporten', 'Thee drinken en brood eten', 'Muziek luisteren'],
      correct: 'Thee drinken en brood eten',
    },
  ],
};

export default function LuisterOefeningenScreen() {
  const [showTranscript, setShowTranscript] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = submitted
    ? SAMPLE_EXERCISE.questions.filter((q, i) => answers[i] === q.correct).length
    : 0;

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowTranscript(false);
    setShowTranslation(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <View style={styles.playerCard}>
          <Text style={styles.playerLabel}>Fragment</Text>
          <View style={styles.playerBox}>
            <View style={styles.waveform}>
              {[4, 8, 6, 12, 8, 5, 10, 7, 9, 6, 11, 4, 8, 10, 6].map((h, i) => (
                <View key={i} style={[styles.waveBar, { height: h * 3 }]} />
              ))}
            </View>
            <View style={styles.playerControls}>
              <TouchableOpacity style={styles.playButton}>
                <Text style={styles.playButtonText}>▶</Text>
              </TouchableOpacity>
              <Text style={styles.playerNote}>🎧 Audio wordt binnenkort toegevoegd</Text>
            </View>
          </View>

          <View style={styles.transcriptToggleRow}>
            <TouchableOpacity onPress={() => setShowTranscript(!showTranscript)}>
              <Text style={styles.toggleLink}>
                {showTranscript ? 'Verberg transcript' : 'Toon transcript'}
              </Text>
            </TouchableOpacity>
            {showTranscript && (
              <TouchableOpacity onPress={() => setShowTranslation(!showTranslation)}>
                <Text style={styles.toggleLink}>
                  {showTranslation ? 'Verberg vertaling' : 'Toon vertaling'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {showTranscript && (
            <View style={styles.transcriptBox}>
              <Text style={styles.transcriptText}>{SAMPLE_EXERCISE.transcript}</Text>
              {showTranslation && (
                <View style={styles.translationBox}>
                  <Text style={styles.translationText}>{SAMPLE_EXERCISE.translation}</Text>
                </View>
              )}
            </View>
          )}
        </View>

        <Text style={styles.questionsLabel}>Beantwoord de vragen</Text>

        {SAMPLE_EXERCISE.questions.map((q, qi) => (
          <View key={qi} style={styles.questionCard}>
            <Text style={styles.questionText}>{q.question}</Text>
            <View style={styles.optionsList}>
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
          <Text style={styles.comingSoonText}>🎧 Audio van native speakers komt binnenkort</Text>
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
  playerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  playerLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8B6F47',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  playerBox: {
    backgroundColor: '#F0F4FF',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    alignItems: 'center',
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    height: 40,
  },
  waveBar: {
    width: 4,
    backgroundColor: '#1565C0',
    borderRadius: 2,
    opacity: 0.4,
  },
  playerControls: {
    alignItems: 'center',
    gap: 8,
  },
  playButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#1565C0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 3,
  },
  playerNote: {
    fontSize: 12,
    color: '#888',
  },
  transcriptToggleRow: {
    flexDirection: 'row',
    gap: 16,
  },
  toggleLink: {
    fontSize: 13,
    color: '#1565C0',
    fontWeight: '600',
  },
  transcriptBox: {
    backgroundColor: '#F8F4EE',
    borderRadius: 10,
    padding: 14,
    gap: 10,
  },
  transcriptText: {
    fontSize: 15,
    color: '#1a1a1a',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  translationBox: {
    borderTopWidth: 1,
    borderTopColor: '#E0D5C5',
    paddingTop: 10,
  },
  translationText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
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
  optionsList: {
    gap: 8,
  },
  option: {
    borderWidth: 1.5,
    borderColor: '#E0D5C5',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  optionSelected: {
    borderColor: '#1565C0',
    backgroundColor: '#E3F2FD',
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
    backgroundColor: '#1565C0',
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
    color: '#1565C0',
  },
  resultMessage: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
  },
  resetButton: {
    marginTop: 8,
    borderWidth: 2,
    borderColor: '#1565C0',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  resetButtonText: {
    color: '#1565C0',
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
