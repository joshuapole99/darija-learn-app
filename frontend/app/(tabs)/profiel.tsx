import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useProgress } from '../../src/hooks/useProgress';
import { ISLANDS } from '../../src/data/lessonData';

// ─── Niveau-systeem ───────────────────────────────────────────────────────────

interface CharacterLevel {
  minIslands: number;
  emoji: string;
  naam: string;
  titel: string;
  ondertitel: string;
  kleur: string;
}

const LEVELS: CharacterLevel[] = [
  {
    minIslands: 0,
    emoji: '👶',
    naam: 'Baby',
    titel: 'Net geboren',
    ondertitel: '"Mama, wat is een Darija?"',
    kleur: '#FFB74D',
  },
  {
    minIslands: 3,
    emoji: '🐣',
    naam: 'Peuter',
    titel: 'Piepjonge leerder',
    ondertitel: '"Da... ri... ja? Lekker woord!"',
    kleur: '#FFD54F',
  },
  {
    minIslands: 6,
    emoji: '🤪',
    naam: 'Dyslect Kind',
    titel: 'Enthousiast maar chaotisch',
    ondertitel: '"Slaim alekom iedereen!!"',
    kleur: '#AED581',
  },
  {
    minIslands: 9,
    emoji: '👵',
    naam: 'Dement Omatje',
    titel: 'Weet het soms',
    ondertitel: '"Salam of salami? Wacht, ik weet het..."',
    kleur: '#80CBC4',
  },
  {
    minIslands: 12,
    emoji: '😒',
    naam: 'Puber',
    titel: 'Weet alles (denkt ie)',
    ondertitel: '"Tss, labas, whatever."',
    kleur: '#90CAF9',
  },
  {
    minIslands: 15,
    emoji: '🥴',
    naam: 'Stagiair',
    titel: 'Snapt het bijna',
    ondertitel: '"Ik doe mijn best, echt."',
    kleur: '#CE93D8',
  },
  {
    minIslands: 18,
    emoji: '🧑',
    naam: 'Jongvolwassene',
    titel: 'Ana kanfahem!',
    ondertitel: '"Ik kijk al series zonder ondertitels (bijna)"',
    kleur: '#F48FB1',
  },
  {
    minIslands: 21,
    emoji: '🧑‍💼',
    naam: 'Volwassene',
    titel: 'Serieuze leerder',
    ondertitel: '"Mijn neef is trots op mij."',
    kleur: '#4DB6AC',
  },
  {
    minIslands: 24,
    emoji: '🧓',
    naam: 'Wijze Opa',
    titel: 'Kom, ik leer jou iets',
    ondertitel: '"Salam ya weld, zit neer."',
    kleur: '#A5D6A7',
  },
  {
    minIslands: 27,
    emoji: '🎓',
    naam: 'Darija Geleerde',
    titel: '3ndi bzzaf d l-3lm',
    ondertitel: '"Ik heb veel kennis — in het Darija."',
    kleur: '#FFD700',
  },
  {
    minIslands: 30,
    emoji: '👑',
    naam: 'Darija Meester',
    titel: 'Ana l-ostaz',
    ondertitel: '"Wie heeft er nog vragen? Ja, ik dacht het al."',
    kleur: '#FF8F00',
  },
];

function getLevel(unlockedCount: number): CharacterLevel & { nextAt: number | null; progress: number } {
  let current = LEVELS[0];
  let nextMinIslands: number | null = null;

  for (let i = 0; i < LEVELS.length; i++) {
    if (unlockedCount >= LEVELS[i].minIslands) {
      current = LEVELS[i];
      nextMinIslands = i + 1 < LEVELS.length ? LEVELS[i + 1].minIslands : null;
    }
  }

  const prevMin = current.minIslands;
  const progress =
    nextMinIslands !== null
      ? (unlockedCount - prevMin) / (nextMinIslands - prevMin)
      : 1;

  return { ...current, nextAt: nextMinIslands, progress };
}

// ─── Components ───────────────────────────────────────────────────────────────

function StatCard({ emoji, label, value }: { emoji: string; label: string; value: string | number }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function LevelCard({ unlocked, total }: { unlocked: number; total: number }) {
  const level = getLevel(unlocked);
  const pct = Math.round(level.progress * 100);

  return (
    <View style={[styles.levelCard, { borderColor: level.kleur }]}>
      {/* Niveau nummer */}
      <View style={[styles.levelBadge, { backgroundColor: level.kleur }]}>
        <Text style={styles.levelBadgeText}>
          NIVEAU {LEVELS.findIndex((l) => l.naam === level.naam) + 1}
        </Text>
      </View>

      {/* Poppetje */}
      <Text style={styles.characterEmoji}>{level.emoji}</Text>
      <Text style={styles.characterNaam}>{level.naam}</Text>
      <Text style={styles.characterTitel}>{level.titel}</Text>
      <Text style={styles.characterOndertitel}>{level.ondertitel}</Text>

      {/* Voortgangsbalk naar volgend niveau */}
      <View style={styles.levelProgressContainer}>
        {level.nextAt !== null ? (
          <>
            <View style={styles.levelProgressBg}>
              <View style={[styles.levelProgressFill, { width: `${pct}%`, backgroundColor: level.kleur }]} />
            </View>
            <Text style={styles.levelProgressLabel}>
              {unlocked}/{level.nextAt} eilanden → volgend niveau
            </Text>
          </>
        ) : (
          <Text style={styles.levelProgressLabel}>🏆 Hoogste niveau bereikt!</Text>
        )}
      </View>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ProfielScreen() {
  const { progress, isLoading, errorsToday } = useProgress();

  const completedLessons = progress?.completedLessons.length ?? 0;
  const unlockedIslands = progress?.unlockedIslands.length ?? 1;
  const totalIslands = ISLANDS.length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profiel</Text>
        </View>

        <LevelCard unlocked={unlockedIslands} total={totalIslands} />

        <View style={styles.statsRow}>
          <StatCard emoji="✅" label="Lessen voltooid" value={completedLessons} />
          <StatCard emoji="🏝️" label="Eilanden unlock" value={`${unlockedIslands}/${totalIslands}`} />
          <StatCard emoji="❌" label="Fouten vandaag" value={`${errorsToday}/5`} />
        </View>

        {/* Alle niveaus als roadmap */}
        <View style={styles.roademapBox}>
          <Text style={styles.roadmapTitle}>Jouw reis</Text>
          {LEVELS.map((lvl, i) => {
            const reached = unlockedIslands >= lvl.minIslands;
            const isCurrent = getLevel(unlockedIslands).naam === lvl.naam;
            return (
              <View key={i} style={[styles.roadmapRow, isCurrent && styles.roadmapRowCurrent]}>
                <Text style={[styles.roadmapEmoji, !reached && styles.roadmapDimmed]}>
                  {reached ? lvl.emoji : '🔒'}
                </Text>
                <View style={styles.roadmapText}>
                  <Text style={[styles.roadmapNaam, !reached && styles.roadmapDimmed]}>
                    {lvl.naam}
                    {isCurrent ? '  ← jij' : ''}
                  </Text>
                  <Text style={[styles.roadmapSub, !reached && styles.roadmapDimmed]}>
                    {lvl.minIslands === 0 ? 'Start' : `vanaf ${lvl.minIslands} eilanden`}
                  </Text>
                </View>
                {reached && !isCurrent && <Text style={styles.roadmapCheck}>✓</Text>}
              </View>
            );
          })}
        </View>

        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonEmoji}>🚧</Text>
          <Text style={styles.comingSoonTitle}>Meer komt binnenkort</Text>
          <Text style={styles.comingSoonText}>
            Streaks, XP-punten, accounts en een ranglijst worden toegevoegd in de volgende versie.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF6EC',
  },
  content: {
    padding: 24,
    paddingTop: 32,
    gap: 20,
    alignItems: 'center',
  },
  header: {
    width: '100%',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },

  // Level card
  levelCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    gap: 6,
    borderWidth: 2.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  levelBadge: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 6,
  },
  levelBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
  },
  characterEmoji: {
    fontSize: 72,
    marginVertical: 4,
  },
  characterNaam: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  characterTitel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginTop: 2,
  },
  characterOndertitel: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 2,
  },
  levelProgressContainer: {
    width: '100%',
    marginTop: 16,
    gap: 6,
    alignItems: 'center',
  },
  levelProgressBg: {
    width: '100%',
    height: 8,
    backgroundColor: '#F0E6D3',
    borderRadius: 4,
    overflow: 'hidden',
  },
  levelProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  levelProgressLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  statEmoji: {
    fontSize: 24,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  statLabel: {
    fontSize: 11,
    color: '#888',
    textAlign: 'center',
  },

  // Roadmap
  roademapBox: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  roadmapTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  roadmapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 10,
  },
  roadmapRowCurrent: {
    backgroundColor: '#FFF8F0',
    paddingHorizontal: 10,
  },
  roadmapEmoji: {
    fontSize: 24,
    width: 32,
    textAlign: 'center',
  },
  roadmapText: {
    flex: 1,
    gap: 1,
  },
  roadmapNaam: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  roadmapSub: {
    fontSize: 11,
    color: '#999',
  },
  roadmapCheck: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  roadmapDimmed: {
    opacity: 0.35,
  },

  // Coming soon
  comingSoon: {
    backgroundColor: '#F0E6D3',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    gap: 8,
  },
  comingSoonEmoji: {
    fontSize: 32,
  },
  comingSoonTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7A5C3A',
  },
  comingSoonText: {
    fontSize: 13,
    color: '#7A5C3A',
    textAlign: 'center',
    lineHeight: 18,
  },
});
