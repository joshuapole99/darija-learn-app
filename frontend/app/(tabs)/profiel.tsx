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

function StatCard({ emoji, label, value }: { emoji: string; label: string; value: string | number }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

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

        <View style={styles.avatarBox}>
          <Text style={styles.avatarEmoji}>🧑‍🎓</Text>
          <Text style={styles.avatarName}>Leerder</Text>
          <Text style={styles.avatarSub}>Darija beginner</Text>
        </View>

        <View style={styles.statsRow}>
          <StatCard emoji="✅" label="Lessen voltooid" value={completedLessons} />
          <StatCard emoji="🏝️" label="Eilanden unlock" value={`${unlockedIslands}/${totalIslands}`} />
          <StatCard emoji="❌" label="Fouten vandaag" value={`${errorsToday}/5`} />
        </View>

        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonEmoji}>🚧</Text>
          <Text style={styles.comingSoonTitle}>Meer komt binnenkort</Text>
          <Text style={styles.comingSoonText}>
            Streaks, XP-punten, badges en accountsynchronisatie worden toegevoegd in een volgende versie.
          </Text>
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
    padding: 24,
    paddingTop: 32,
    gap: 24,
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
  avatarBox: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 40,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarEmoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  avatarName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  avatarSub: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
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
