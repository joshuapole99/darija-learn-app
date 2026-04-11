import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native';
import { router } from 'expo-router';
import { useProgress } from '../src/hooks/useProgress';

// ─── Data ────────────────────────────────────────────────────────────────────

interface SoundStep {
  type: 'sound';
  symbol: string;
  klinktalS: string;
  uitleg: string;
  example: { darija: string; dutch: string };
  question: string;
  options: string[];
  correct: string;
}

interface RuleStep {
  type: 'rule';
  title: string;
  rules: { label: string; uitleg: string; example: string }[];
  question: string;
  options: string[];
  correct: string;
}

interface QuizStep {
  type: 'quiz';
  questions: { question: string; options: string[]; correct: string }[];
}

type Step =
  | { type: 'intro' }
  | SoundStep
  | RuleStep
  | QuizStep
  | { type: 'complete' };

const STEPS: Step[] = [
  { type: 'intro' },

  {
    type: 'sound',
    symbol: 'ou',
    klinktalS: '"oe" — zoals in "boek" of "zoek"',
    uitleg: 'De klanken o, u en ou schrijven we in deze app altijd als "ou". Spreek het uit als "oe" — niet als "ou" in "oud".',
    example: { darija: 'souk', dutch: 'markt' },
    question: 'Hoe schrijft deze app de "oe"-klank altijd?',
    options: ['Als "o"', 'Als "u"', 'Als "ou"'],
    correct: 'Als "ou"',
  },

  {
    type: 'sound',
    symbol: 'ch',
    klinktalS: 'één klank — "sj" zoals in "sjaal"',
    uitleg: '"Ch" is één klank in Darija: de sj-klank. Spreek het uit als één geluid, zoals "sjaal" of "meisje". Niet als c + h apart.',
    example: { darija: 'chkoun', dutch: 'wie' },
    question: 'Hoe klinkt "ch" in Darija?',
    options: ['Als "k" + "h" apart', 'Als "sj" (sjaal) — één klank', 'Als "ts"'],
    correct: 'Als "sj" (sjaal) — één klank',
  },

  {
    type: 'sound',
    symbol: 'sh',
    klinktalS: 'twee aparte letters — s + h',
    uitleg: '"Sh" zijn twee losse letters in Darija: eerst een gewone "s", dan een gewone "h". Niet de sj-klank zoals bij "ch". Let op het verschil!',
    example: { darija: 's-shta', dutch: 'de winter/regen' },
    question: 'Wat is "sh" in Darija?',
    options: ['Hetzelfde als "ch" (sj-klank)', 'Twee aparte letters: s + h', 'Een stille letter'],
    correct: 'Twee aparte letters: s + h',
  },

  {
    type: 'sound',
    symbol: '7',
    klinktalS: 'zware "h" vanuit de keel (Arabisch: ح)',
    uitleg: 'De 7 staat voor de Arabische letter ح. Adem krachtig uit via de keel — dieper en zwaarder dan een gewone "h". Er is geen equivalent in het Nederlands.',
    example: { darija: '7lib', dutch: 'melk' },
    question: 'Hoe spreek je de "7" uit?',
    options: ['Als een gewone "h"', 'Als een zware "h" vanuit de keel', 'Als een "f"'],
    correct: 'Als een zware "h" vanuit de keel',
  },

  {
    type: 'sound',
    symbol: '9',
    klinktalS: 'diepe "k" vanuit de keel (Arabisch: ق)',
    uitleg: 'De 9 staat voor de Arabische letter ق: een "k" vanuit het achterste deel van je keel. In deze app schrijven we altijd 9 — nooit q.',
    example: { darija: '9ra', dutch: 'lezen' },
    question: 'Hoe schrijft deze app de diepe k-klank?',
    options: ['Als "q"', 'Als "9"', 'Als "k"'],
    correct: 'Als "9"',
  },

  {
    type: 'sound',
    symbol: '3',
    klinktalS: 'keelsamentrekking (Arabisch: ع)',
    uitleg: 'De 3 staat voor de Arabische letter ع ("ain"). Trek je keel samen alsof je iets bitter proeft. Er is geen equivalent in het Nederlands of Engels.',
    example: { darija: '3ndi', dutch: 'ik heb' },
    question: 'Hoe maak je de "3"-klank?',
    options: ['Als een gewone "e"', 'Door je keel samen te trekken (ع)', 'Als een "w"'],
    correct: 'Door je keel samen te trekken (ع)',
  },

  {
    type: 'sound',
    symbol: 'kh',
    klinktalS: 'harde g — zoals de Nederlandse "g" in "goed"',
    uitleg: '"Kh" klinkt als de harde Nederlandse "g" in "goed" of "gaan". Dit is de meest voorkomende keelklank en de makkelijkste voor Nederlandstaligen.',
    example: { darija: 'khobz', dutch: 'brood' },
    question: 'Hoe klinkt "kh" in Darija?',
    options: ['Als een gewone "k"', 'Als de harde "g" in "goed"', 'Als een "x"'],
    correct: 'Als de harde "g" in "goed"',
  },

  {
    type: 'sound',
    symbol: 'gh',
    klinktalS: 'rollende g — dieper dan "kh" (Arabisch: غ)',
    uitleg: '"Gh" is de rollende, gegorgelde g — dieper en verder achterin de keel dan "kh". Vergelijk: "kh" = droge harde g, "gh" = rollende vochtige g.',
    example: { darija: 'ghali', dutch: 'duur' },
    question: 'Wat is het verschil tussen "kh" en "gh"?',
    options: [
      'Ze klinken hetzelfde',
      'kh = harde g, gh = rollende g (dieper)',
      'gh = harde g, kh = rollende g',
    ],
    correct: 'kh = harde g, gh = rollende g (dieper)',
  },

  {
    type: 'sound',
    symbol: 'ha',
    klinktalS: 'de ha-klank — anderen schrijven dit als "8"',
    uitleg: 'Sommige mensen schrijven een Arabische letter als "8" omdat die erop lijkt. In deze app schrijven we die klank gewoon als "ha". Zo is het makkelijker te lezen.',
    example: { darija: 'hna', dutch: 'hier' },
    question: 'Hoe schrijft deze app de klank die anderen als "8" schrijven?',
    options: ['Als "8"', 'Als "ha"', 'Als "h"'],
    correct: 'Als "ha"',
  },

  {
    type: 'rule',
    title: 'Schrijfregels',
    rules: [
      {
        label: 'Klinkers weglaten',
        uitleg: 'Klinkers mogen soms weggelaten worden, maar we houden ze als ze de uitspraak helpen.',
        example: '"bnt" (meisje) — de e wordt weggelaten. Maar "weld" houden we volledig.',
      },
      {
        label: 'Kan, kat, kay — altijd volledig',
        uitleg: 'Schrijf woorden als "kan", "kat" en "kay" altijd volledig. Nooit afkorten naar "kn", "kt" of "ky".',
        example: '"kan-akol" (ik eet) — nooit "kn-akol".',
      },
    ],
    question: 'Hoe schrijf je "kan-mshi" (ik ga) in deze app?',
    options: ['kn-mshi', 'kan-mshi', 'knmshi'],
    correct: 'kan-mshi',
  },

  {
    type: 'quiz',
    questions: [
      {
        question: '"Ch" in Darija klinkt als...?',
        options: ['c + h apart', 'sj (sjaal) — één klank', 'een gewone k'],
        correct: 'sj (sjaal) — één klank',
      },
      {
        question: '"Sh" in Darija zijn...?',
        options: ['Hetzelfde als ch (sj-klank)', 'Twee aparte letters: s + h', 'Een stille letter'],
        correct: 'Twee aparte letters: s + h',
      },
      {
        question: 'Hoe schrijft deze app de klank die anderen als "8" schrijven?',
        options: ['8', 'ha', 'h'],
        correct: 'ha',
      },
      {
        question: 'Hoe schrijf je de diepe k-klank in deze app?',
        options: ['q', '9', 'k'],
        correct: '9',
      },
      {
        question: 'Hoe schrijf je "kan-shreb" (ik drink) volledig correct?',
        options: ['kn-shreb', 'kan-shreb', 'k-shreb'],
        correct: 'kan-shreb',
      },
    ],
  },

  { type: 'complete' },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <View style={styles.progressBarBg}>
      <View style={[styles.progressBarFill, { width: `${pct}%` }]} />
    </View>
  );
}

function AudioButton() {
  return (
    <TouchableOpacity style={styles.audioBtn}>
      <Text style={styles.audioBtnIcon}>🔊</Text>
      <Text style={styles.audioBtnText}>Audio komt binnenkort</Text>
    </TouchableOpacity>
  );
}

function IntroScreen({ onNext }: { onNext: () => void }) {
  return (
    <ScrollView contentContainerStyle={styles.stepContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.introEmoji}>🔤</Text>
      <Text style={styles.introTitle}>Schrift & Uitspraak</Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>Waarom dit eiland?</Text>
        <Text style={styles.infoCardText}>
          Darija wordt origineel in Arabisch schrift geschreven. Maar online en in apps schrijft iedereen het anders —
          met Latijnse letters, cijfers en symbolen. Er bestaat geen officiële standaard.
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>Hoe schrijft deze app het?</Text>
        <Text style={styles.infoCardText}>
          Deze app gebruikt vaste, consistente regels. Zo leer je één manier die overal in Marokko goed begrepen wordt.
          Cijfers zoals <Text style={styles.bold}>3</Text>, <Text style={styles.bold}>7</Text> en <Text style={styles.bold}>9</Text> staan
          voor Arabische klanken zonder Latijns equivalent. Een klank die anderen als <Text style={styles.bold}>8</Text> schrijven,
          schrijven wij gewoon als <Text style={styles.bold}>ha</Text>.
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>Wat ga je leren?</Text>
        <Text style={styles.infoCardText}>
          Je leert 9 klanken en 2 schrijfregels die typisch zijn voor Darija. Per klank krijg je een uitleg,
          een voorbeeld en een korte test. Aan het einde een kleine herhaling.
        </Text>
      </View>

      <TouchableOpacity style={styles.nextBtn} onPress={onNext}>
        <Text style={styles.nextBtnText}>Begin →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function SoundScreen({
  step,
  onNext,
}: {
  step: SoundStep;
  onNext: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const answered = selected !== null;

  return (
    <ScrollView contentContainerStyle={styles.stepContent} showsVerticalScrollIndicator={false}>
      {/* Klank display */}
      <View style={styles.symbolBox}>
        <Text style={styles.symbolText}>{step.symbol}</Text>
        <Text style={styles.symbolSub}>{step.klinktalS}</Text>
      </View>

      {/* Uitleg */}
      <Text style={styles.uitlegText}>{step.uitleg}</Text>

      {/* Voorbeeld */}
      <View style={styles.exampleBox}>
        <Text style={styles.exampleLabel}>Voorbeeld</Text>
        <Text style={styles.exampleDarija}>{step.example.darija}</Text>
        <Text style={styles.exampleDutch}>{step.example.dutch}</Text>
        <AudioButton />
      </View>

      {/* Mini-quiz */}
      <View style={styles.quizBox}>
        <Text style={styles.quizQuestion}>{step.question}</Text>
        {step.options.map((opt) => {
          const isCorrect = opt === step.correct;
          const isSelected = opt === selected;
          const isWrong = answered && isSelected && !isCorrect;
          const showCorrect = answered && isCorrect;
          return (
            <TouchableOpacity
              key={opt}
              style={[
                styles.option,
                isSelected && !answered && styles.optionSelected,
                showCorrect && styles.optionCorrect,
                isWrong && styles.optionWrong,
              ]}
              onPress={() => { if (!answered) setSelected(opt); }}
              activeOpacity={answered ? 1 : 0.7}
            >
              <Text
                style={[
                  styles.optionText,
                  showCorrect && styles.optionTextCorrect,
                  isWrong && styles.optionTextWrong,
                ]}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}

        {answered && (
          <View style={[styles.feedbackBox, selected === step.correct ? styles.feedbackGood : styles.feedbackBad]}>
            <Text style={styles.feedbackText}>
              {selected === step.correct
                ? '✅ Goed! ' + step.klinktalS
                : '❌ Niet helemaal. Het is: ' + step.correct}
            </Text>
          </View>
        )}
      </View>

      {answered && (
        <TouchableOpacity style={styles.nextBtn} onPress={onNext}>
          <Text style={styles.nextBtnText}>Volgende →</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

function RuleScreen({ step, onNext }: { step: RuleStep; onNext: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const answered = selected !== null;

  return (
    <ScrollView contentContainerStyle={styles.stepContent} showsVerticalScrollIndicator={false}>
      <View style={styles.ruleHeader}>
        <Text style={styles.ruleHeaderEmoji}>📝</Text>
        <Text style={styles.ruleHeaderTitle}>{step.title}</Text>
      </View>

      {step.rules.map((rule, i) => (
        <View key={i} style={styles.ruleCard}>
          <Text style={styles.ruleLabel}>{rule.label}</Text>
          <Text style={styles.ruleUitleg}>{rule.uitleg}</Text>
          <View style={styles.ruleExampleBox}>
            <Text style={styles.ruleExampleText}>{rule.example}</Text>
          </View>
        </View>
      ))}

      <View style={styles.quizBox}>
        <Text style={styles.quizQuestion}>{step.question}</Text>
        {step.options.map((opt) => {
          const isCorrect = opt === step.correct;
          const isSelected = opt === selected;
          const isWrong = answered && isSelected && !isCorrect;
          const showCorrect = answered && isCorrect;
          return (
            <TouchableOpacity
              key={opt}
              style={[
                styles.option,
                isSelected && !answered && styles.optionSelected,
                showCorrect && styles.optionCorrect,
                isWrong && styles.optionWrong,
              ]}
              onPress={() => { if (!answered) setSelected(opt); }}
              activeOpacity={answered ? 1 : 0.7}
            >
              <Text style={[
                styles.optionText,
                showCorrect && styles.optionTextCorrect,
                isWrong && styles.optionTextWrong,
              ]}>
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}

        {answered && (
          <View style={[styles.feedbackBox, selected === step.correct ? styles.feedbackGood : styles.feedbackBad]}>
            <Text style={styles.feedbackText}>
              {selected === step.correct ? '✅ Goed!' : '❌ Niet helemaal. Het juiste antwoord: ' + step.correct}
            </Text>
          </View>
        )}
      </View>

      {answered && (
        <TouchableOpacity style={styles.nextBtn} onPress={onNext}>
          <Text style={styles.nextBtnText}>Volgende →</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

function FinalQuizScreen({ step, onNext }: { step: QuizStep; onNext: () => void }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = Object.keys(answers).length === step.questions.length;
  const score = step.questions.filter((q, i) => answers[i] === q.correct).length;

  return (
    <ScrollView contentContainerStyle={styles.stepContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.quizHeader}>Kleine herhaling</Text>
      <Text style={styles.quizSubHeader}>Wat heb je onthouden?</Text>

      {step.questions.map((q, qi) => (
        <View key={qi} style={styles.quizCard}>
          <Text style={styles.quizQuestion}>{q.question}</Text>
          {q.options.map((opt) => {
            const isSelected = answers[qi] === opt;
            const isCorrect = submitted && opt === q.correct;
            const isWrong = submitted && isSelected && opt !== q.correct;
            return (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.option,
                  isSelected && !submitted && styles.optionSelected,
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
      ))}

      {!submitted ? (
        <TouchableOpacity
          style={[styles.nextBtn, !allAnswered && styles.nextBtnDisabled]}
          onPress={() => setSubmitted(true)}
          disabled={!allAnswered}
        >
          <Text style={styles.nextBtnText}>Controleer</Text>
        </TouchableOpacity>
      ) : (
        <>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreText}>{score}/{step.questions.length}</Text>
            <Text style={styles.scoreLabel}>
              {score === step.questions.length ? 'Perfect! Klaar voor de lessen! 🎉' : 'Goed gedaan! Je kunt altijd teruglezen. 👍'}
            </Text>
          </View>
          <TouchableOpacity style={styles.nextBtn} onPress={onNext}>
            <Text style={styles.nextBtnText}>Afronden →</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

function CompleteScreen({ onClose }: { onClose: () => void }) {
  return (
    <View style={styles.completeContainer}>
      <Text style={styles.completeEmoji}>🏆</Text>
      <Text style={styles.completeTitle}>Goed gedaan!</Text>
      <Text style={styles.completeText}>
        Je kent nu de basisregels voor Darija-schrift en uitspraak. Je kunt beginnen aan de eilanden!
      </Text>
      <View style={styles.recapBox}>
        {[
          'ou → altijd "ou" schrijven (oe-klank)',
          'ch → één klank: sj (sjaal)',
          'sh → twee aparte letters: s + h',
          '7 → zware h vanuit de keel (ح)',
          '9 → diepe k vanuit de keel (nooit q)',
          '3 → keelklank (ع)',
          'kh → harde g (zoals "goed")',
          'gh → rollende g (dieper dan kh)',
          'ha → nooit "8"',
          'Klinkers: bewaar ze als ze helpen',
          'Kan/kat/kay: altijd volledig schrijven',
        ].map((item, i) => (
          <Text key={i} style={styles.recapItem}>✓ {item}</Text>
        ))}
      </View>
      <TouchableOpacity style={styles.nextBtn} onPress={onClose}>
        <Text style={styles.nextBtnText}>Naar de eilandenkaart →</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────

export default function UitspraakLesScreen() {
  const [stepIndex, setStepIndex] = useState(0);
  const { markLessonComplete } = useProgress();

  const totalSteps = STEPS.length;
  const currentStep = STEPS[stepIndex];

  const goNext = () => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleComplete = async () => {
    await markLessonComplete('uitspraak-intro');
    router.replace('/(tabs)');
  };

  // Steps that count toward progress: exclude intro and complete
  const progressSteps = STEPS.filter((s) => s.type !== 'intro' && s.type !== 'complete').length;
  const progressCurrent = Math.max(0, stepIndex - 1); // subtract intro step

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.backButton}>← Terug</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schrift & Uitspraak</Text>
        <View style={{ width: 60 }} />
      </View>

      {currentStep.type !== 'intro' && currentStep.type !== 'complete' && (
        <View style={styles.progressContainer}>
          <ProgressBar current={progressCurrent} total={progressSteps} />
          <Text style={styles.progressLabel}>{progressCurrent}/{progressSteps}</Text>
        </View>
      )}

      {/* Content */}
      {currentStep.type === 'intro' && <IntroScreen onNext={goNext} />}
      {currentStep.type === 'sound' && <SoundScreen key={stepIndex} step={currentStep} onNext={goNext} />}
      {currentStep.type === 'rule' && <RuleScreen key={stepIndex} step={currentStep} onNext={goNext} />}
      {currentStep.type === 'quiz' && <FinalQuizScreen key={stepIndex} step={currentStep} onNext={goNext} />}
      {currentStep.type === 'complete' && <CompleteScreen onClose={handleComplete} />}
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const ORANGE = '#F57F17';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF6EC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D3',
    backgroundColor: '#fff',
  },
  backButton: {
    fontSize: 15,
    color: ORANGE,
    fontWeight: '600',
    width: 60,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D3',
  },
  progressBarBg: {
    flex: 1,
    height: 7,
    backgroundColor: '#E0D5C5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: ORANGE,
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
    width: 32,
    textAlign: 'right',
  },
  stepContent: {
    padding: 24,
    paddingBottom: 48,
    gap: 20,
  },
  // Intro
  introEmoji: {
    fontSize: 56,
    textAlign: 'center',
  },
  introTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  infoCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: ORANGE,
  },
  infoCardText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 21,
  },
  bold: {
    fontWeight: '700',
    color: ORANGE,
  },
  // Sound step
  symbolBox: {
    backgroundColor: ORANGE,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 8,
  },
  symbolText: {
    fontSize: 52,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 2,
  },
  symbolSub: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
    textAlign: 'center',
  },
  uitlegText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    textAlign: 'center',
  },
  exampleBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  exampleLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  exampleDarija: {
    fontSize: 28,
    fontWeight: 'bold',
    color: ORANGE,
  },
  exampleDutch: {
    fontSize: 15,
    color: '#777',
    fontStyle: 'italic',
  },
  audioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
    backgroundColor: '#FFF3E0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  audioBtnIcon: {
    fontSize: 16,
  },
  audioBtnText: {
    fontSize: 12,
    color: ORANGE,
    fontWeight: '600',
  },
  // Quiz elements
  quizBox: {
    gap: 10,
  },
  quizHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  quizSubHeader: {
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
  },
  quizCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  quizQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  option: {
    borderWidth: 1.5,
    borderColor: '#E0D5C5',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  optionSelected: {
    borderColor: ORANGE,
    backgroundColor: '#FFF3E0',
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
  feedbackBox: {
    borderRadius: 10,
    padding: 12,
    marginTop: 4,
  },
  feedbackGood: {
    backgroundColor: '#E8F5E9',
  },
  feedbackBad: {
    backgroundColor: '#FFEBEE',
  },
  feedbackText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  // Score
  scoreBox: {
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
  scoreText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: ORANGE,
  },
  scoreLabel: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
  },
  // Complete
  completeContainer: {
    flex: 1,
    padding: 28,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  completeEmoji: {
    fontSize: 72,
  },
  completeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  completeText: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
  },
  recapBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    gap: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  recapItem: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  // Rule step
  ruleHeader: {
    alignItems: 'center',
    gap: 8,
  },
  ruleHeaderEmoji: {
    fontSize: 48,
  },
  ruleHeaderTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  ruleCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    gap: 8,
    borderLeftWidth: 4,
    borderLeftColor: ORANGE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  ruleLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: ORANGE,
  },
  ruleUitleg: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  ruleExampleBox: {
    backgroundColor: '#FFF8F0',
    borderRadius: 8,
    padding: 10,
  },
  ruleExampleText: {
    fontSize: 13,
    color: '#7A5C3A',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  // Next button
  nextBtn: {
    backgroundColor: ORANGE,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    shadowColor: ORANGE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  nextBtnDisabled: {
    backgroundColor: '#B0BEC5',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
