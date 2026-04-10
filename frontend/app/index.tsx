import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { ISLANDS, Island } from '../src/data/lessonData';
import { useProgress } from '../src/hooks/useProgress';

function IslandBubble({ island, unlocked }: { island: Island; unlocked: boolean }) {
  const handlePress = () => {
    if (!unlocked) return;
    router.push(`/island/${island.id}`);
  };

  return (
    <TouchableOpacity
      style={[styles.bubble, { backgroundColor: unlocked ? island.color : '#D0D0D0' }]}
      onPress={handlePress}
      activeOpacity={unlocked ? 0.8 : 1}
    >
      <Text style={styles.bubbleEmoji}>{unlocked ? island.emoji : '🔒'}</Text>
      <Text style={[styles.bubbleName, { color: unlocked ? '#fff' : '#999' }]}>
        {island.name}
      </Text>
    </TouchableOpacity>
  );
}

function PathConnector() {
  return <View style={styles.connector} />;
}

export default function IslandMapScreen() {
  const { isIslandUnlocked, isLoading, errorsToday, canMakeError } = useProgress();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Darija Learn</Text>
          <Text style={styles.headerSubtitle}>Mrhba! Klaar om te leren? 🌍</Text>
          {!canMakeError && (
            <View style={styles.limitBanner}>
              <Text style={styles.limitText}>
                Je hebt vandaag 5 fouten gemaakt. Kom morgen terug! 💪
              </Text>
            </View>
          )}
          {canMakeError && errorsToday > 0 && (
            <Text style={styles.errorsText}>
              Fouten vandaag: {errorsToday}/5
            </Text>
          )}
        </View>

        <View style={styles.mapContainer}>
          {ISLANDS.map((island, index) => (
            <View key={island.id} style={styles.islandRow}>
              {index > 0 && <PathConnector />}
              <IslandBubble island={island} unlocked={isIslandUnlocked(island.id)} />
            </View>
          ))}
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
  scroll: {
    flex: 1,
    backgroundColor: '#FDF6EC',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF6EC',
  },
  header: {
    width: '100%',
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  limitBanner: {
    marginTop: 12,
    backgroundColor: '#FFEBEE',
    borderRadius: 10,
    padding: 12,
  },
  limitText: {
    color: '#C62828',
    fontSize: 14,
    fontWeight: '500',
  },
  errorsText: {
    marginTop: 8,
    fontSize: 13,
    color: '#888',
  },
  mapContainer: {
    alignItems: 'center',
    width: '100%',
  },
  islandRow: {
    alignItems: 'center',
    width: '100%',
  },
  bubble: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  bubbleEmoji: {
    fontSize: 36,
  },
  bubbleName: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 6,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  connector: {
    width: 3,
    height: 48,
    borderLeftWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#C8B89A',
    marginVertical: 0,
  },
});
