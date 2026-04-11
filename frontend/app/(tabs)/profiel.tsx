import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { useProgress } from '../../src/hooks/useProgress';
import { ISLANDS } from '../../src/data/lessonData';
import { useAuth } from '../../src/context/AuthContext';
import { supabase } from '../../src/lib/supabase';

// ─── Niveau-systeem (XP-gebaseerd) ───────────────────────────────────────────

interface CharacterLevel {
  minXP: number;
  emoji: string;
  naam: string;
  titel: string;
  ondertitel: string;
  kleur: string;
}

const LEVELS: CharacterLevel[] = [
  { minXP: 0,    emoji: '👶',    naam: 'Baby',      titel: 'Net geboren',              ondertitel: '"Mama, wat is een Darija?"',                    kleur: '#FFB74D' },
  { minXP: 100,  emoji: '🐣',    naam: 'Peuter',    titel: 'Eerste stapjes',           ondertitel: '"Da... ri... ja? Lekker woord!"',               kleur: '#FFD54F' },
  { minXP: 250,  emoji: '🤪',    naam: 'Dyslect',   titel: 'Enthousiast maar chaotisch', ondertitel: '"Slaim alekom iedereen!!"',                   kleur: '#AED581' },
  { minXP: 500,  emoji: '👵',    naam: 'Lhajja',    titel: 'Vastberaden leerder',      ondertitel: '"Ik ga dit leren als het laatste is wat ik doe."', kleur: '#80CBC4' },
  { minXP: 800,  emoji: '😤',    naam: 'Puber',     titel: 'Weet alles (denkt ie)',    ondertitel: '"Tss. Ik snap het al, echt."',                  kleur: '#90CAF9' },
  { minXP: 1200, emoji: '🧑',    naam: 'Meskeen',   titel: 'Doet zijn best',           ondertitel: '"Bijna... nog even..."',                        kleur: '#CE93D8' },
  { minXP: 1800, emoji: '🧑‍🎓', naam: 'Gevorderd', titel: 'Serieuze leerder',         ondertitel: '"Ana kanfahem — ik begin het echt te snappen."', kleur: '#F48FB1' },
  { minXP: 2500, emoji: '🧑‍💼', naam: 'Sha3b',     titel: 'Zelfverzekerd spreker',    ondertitel: '"Ik kan een gesprek voeren. Bijna."',            kleur: '#4DB6AC' },
  { minXP: 3500, emoji: '🧓',    naam: 'Jedd',      titel: 'Ervaren en wijs',          ondertitel: '"Salam ya weld, kom zit, ik leer jou iets."',   kleur: '#A5D6A7' },
  { minXP: 5000, emoji: '🎓',    naam: 'l-3alim',   titel: 'De kenner',                ondertitel: '"3ndi bzzaf d l-3lm — ik weet veel."',          kleur: '#FFD700' },
  { minXP: 7500, emoji: '👑',    naam: 'l-Ostaz',   titel: 'De meester',               ondertitel: '"Ana l-ostaz. Wie heeft er vragen?"',            kleur: '#FF8F00' },
];

function getLevel(xp: number): CharacterLevel & { levelIndex: number; nextXP: number | null; progress: number } {
  let current = LEVELS[0];
  let levelIndex = 0;

  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].minXP) {
      current = LEVELS[i];
      levelIndex = i;
    }
  }

  const nextXP = levelIndex + 1 < LEVELS.length ? LEVELS[levelIndex + 1].minXP : null;
  const progress = nextXP !== null
    ? (xp - current.minXP) / (nextXP - current.minXP)
    : 1;

  return { ...current, levelIndex, nextXP, progress };
}

// ─── Leaderboard types ────────────────────────────────────────────────────────

interface LeaderboardEntry {
  username: string;
  xp: number;
  streak: number;
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

function LevelCard({ xp, username }: { xp: number; username: string }) {
  const level = getLevel(xp);
  const pct = Math.round(level.progress * 100);

  return (
    <View style={[styles.levelCard, { borderColor: level.kleur }]}>
      <View style={[styles.levelBadge, { backgroundColor: level.kleur }]}>
        <Text style={styles.levelBadgeText}>NIVEAU {level.levelIndex + 1}</Text>
      </View>

      <Text style={styles.characterEmoji}>{level.emoji}</Text>
      <Text style={styles.usernaam}>{username}</Text>
      <Text style={styles.niveauNaam}>Niveau {level.naam}</Text>
      <Text style={styles.characterTitel}>{level.titel}</Text>
      <Text style={styles.characterOndertitel}>{level.ondertitel}</Text>

      <View style={styles.levelProgressContainer}>
        {level.nextXP !== null ? (
          <>
            <View style={styles.levelProgressBg}>
              <View style={[styles.levelProgressFill, { width: `${pct}%`, backgroundColor: level.kleur }]} />
            </View>
            <Text style={styles.levelProgressLabel}>
              {xp} / {level.nextXP} XP → Niveau {LEVELS[level.levelIndex + 1].naam}
            </Text>
          </>
        ) : (
          <Text style={styles.levelProgressLabel}>👑 Hoogste niveau bereikt!</Text>
        )}
      </View>
    </View>
  );
}

function LeaderboardCard({
  entries,
  eigenUsername,
  isLoading,
}: {
  entries: LeaderboardEntry[];
  eigenUsername: string;
  isLoading: boolean;
}) {
  return (
    <View style={styles.leaderboardCard}>
      <Text style={styles.leaderboardTitel}>🏆 Ranglijst</Text>

      {isLoading ? (
        <ActivityIndicator color="#2E7D32" style={{ marginVertical: 16 }} />
      ) : entries.length === 0 ? (
        <Text style={styles.leaderboardLeeg}>Nog geen spelers</Text>
      ) : (
        entries.map((entry, index) => {
          const isEigen = entry.username === eigenUsername;
          const level = getLevel(entry.xp);
          const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;

          return (
            <View
              key={entry.username}
              style={[styles.leaderboardRij, isEigen && styles.leaderboardRijEigen]}
            >
              <Text style={styles.leaderboardMedal}>{medal}</Text>
              <Text style={styles.leaderboardEmoji}>{level.emoji}</Text>
              <View style={styles.leaderboardInfo}>
                <Text style={[styles.leaderboardNaam, isEigen && { color: '#2E7D32' }]}>
                  {entry.username}{isEigen ? ' (jij)' : ''}
                </Text>
                <Text style={styles.leaderboardSub}>
                  Niveau {level.naam} · 🔥 {entry.streak} dag{entry.streak !== 1 ? 'en' : ''}
                </Text>
              </View>
              <Text style={styles.leaderboardXP}>{entry.xp} XP</Text>
            </View>
          );
        })
      )}
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ProfielScreen() {
  const { progress, errorsToday } = useProgress();
  const { profile, signOut } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);

  const completedLessons = progress?.completedLessons.length ?? 0;
  const unlockedIslands = progress?.unlockedIslands.length ?? 1;
  const totalIslands = ISLANDS.length;
  const username = profile?.username ?? 'Leerder';
  const xp = profile?.xp ?? 0;
  const streak = profile?.streak ?? 0;

  useEffect(() => {
    loadLeaderboard();
  }, []);

  async function loadLeaderboard() {
    setLeaderboardLoading(true);
    const { data } = await supabase
      .from('profiles')
      .select('username, xp, streak')
      .order('xp', { ascending: false })
      .limit(10);
    if (data) setLeaderboard(data as LeaderboardEntry[]);
    setLeaderboardLoading(false);
  }

  async function handleUitloggen() {
    await signOut();
    router.replace('/(auth)/welkom');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profiel</Text>
        </View>

        <LevelCard xp={xp} username={username} />

        <View style={styles.statsRow}>
          <StatCard emoji="⚡" label="Totaal XP" value={xp} />
          <StatCard emoji="🔥" label="Streak" value={`${streak}d`} />
          <StatCard emoji="🏝️" label="Eilanden" value={`${unlockedIslands}/${totalIslands}`} />
          <StatCard emoji="❌" label="Fouten" value={`${errorsToday}/5`} />
        </View>

        <LeaderboardCard
          entries={leaderboard}
          eigenUsername={username}
          isLoading={leaderboardLoading}
        />

        <TouchableOpacity style={styles.uitloggenBtn} onPress={handleUitloggen}>
          <Text style={styles.uitloggenBtnText}>Uitloggen</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FDF6EC' },
  content: { padding: 24, paddingTop: 32, gap: 20, alignItems: 'center' },
  header: { width: '100%' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#1a1a1a' },

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
  levelBadgeText: { fontSize: 11, fontWeight: '800', color: '#fff', letterSpacing: 1 },
  characterEmoji: { fontSize: 72, marginVertical: 4 },
  usernaam: { fontSize: 20, fontWeight: '800', color: '#1a1a1a', marginTop: 2 },
  niveauNaam: { fontSize: 22, fontWeight: 'bold', color: '#1a1a1a' },
  characterTitel: { fontSize: 14, fontWeight: '600', color: '#555', marginTop: 2 },
  characterOndertitel: { fontSize: 13, color: '#888', fontStyle: 'italic', textAlign: 'center', marginTop: 2 },
  levelProgressContainer: { width: '100%', marginTop: 16, gap: 6, alignItems: 'center' },
  levelProgressBg: { width: '100%', height: 8, backgroundColor: '#F0E6D3', borderRadius: 4, overflow: 'hidden' },
  levelProgressFill: { height: '100%', borderRadius: 4 },
  levelProgressLabel: { fontSize: 12, color: '#999', fontWeight: '500' },

  // Stats
  statsRow: { flexDirection: 'row', gap: 10, width: '100%' },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  statEmoji: { fontSize: 20 },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#1a1a1a' },
  statLabel: { fontSize: 10, color: '#888', textAlign: 'center' },

  // Leaderboard
  leaderboardCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  leaderboardTitel: { fontSize: 17, fontWeight: '800', color: '#1a1a1a', marginBottom: 8 },
  leaderboardLeeg: { fontSize: 14, color: '#aaa', textAlign: 'center', paddingVertical: 12 },
  leaderboardRij: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    gap: 10,
  },
  leaderboardRijEigen: { backgroundColor: '#F0F9F1' },
  leaderboardMedal: { fontSize: 18, width: 28, textAlign: 'center' },
  leaderboardEmoji: { fontSize: 24 },
  leaderboardInfo: { flex: 1 },
  leaderboardNaam: { fontSize: 14, fontWeight: '700', color: '#1a1a1a' },
  leaderboardSub: { fontSize: 11, color: '#999', marginTop: 1 },
  leaderboardXP: { fontSize: 14, fontWeight: '800', color: '#2E7D32' },

  uitloggenBtn: {
    width: '100%',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#C62828',
    marginBottom: 12,
  },
  uitloggenBtnText: { color: '#C62828', fontSize: 15, fontWeight: '700' },
});
