import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Modal,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { ISLANDS, Island } from '../../src/data/lessonData';
import { useProgress } from '../../src/hooks/useProgress';

function IslandInfoModal({
  island,
  visible,
  onClose,
}: {
  island: Island | null;
  visible: boolean;
  onClose: () => void;
}) {
  if (!island) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={() => {}}>
          <Text style={styles.modalEmoji}>{island.emoji}</Text>
          <Text style={styles.modalIslandName}>{island.name}</Text>
          <View style={styles.chapterBadge}>
            <Text style={styles.chapterBadgeText}>Hoofdstuk {island.chapter} · {island.chapterName}</Text>
          </View>
          <Text style={styles.modalDescription}>{island.info.description}</Text>
          <View style={styles.topicsList}>
            {island.info.keyTopics.map((topic, i) => (
              <View key={i} style={styles.topicRow}>
                <Text style={styles.topicBullet}>•</Text>
                <Text style={styles.topicText}>{topic}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Sluiten</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function ChapterHeader({ chapter, name }: { chapter: number; name: string }) {
  return (
    <View style={styles.chapterHeader}>
      <View style={styles.chapterLine} />
      <Text style={styles.chapterHeaderText}>H{chapter} · {name}</Text>
      <View style={styles.chapterLine} />
    </View>
  );
}

function IntroIslandBubble({
  island,
  completed,
  onInfoPress,
}: {
  island: Island;
  completed: boolean;
  onInfoPress: () => void;
}) {
  return (
    <View style={styles.introWrapper}>
      <View style={styles.introBadgeRow}>
        <View style={styles.introBadge}>
          <Text style={styles.introBadgeText}>START HIER</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.introBubble, { backgroundColor: island.color }]}
        onPress={() => router.push('/uitspraak-les')}
        activeOpacity={0.8}
      >
        {completed && <View style={styles.introCheckBadge}><Text style={styles.introCheckText}>✓</Text></View>}
        <Text style={styles.bubbleEmoji}>{island.emoji}</Text>
        <Text style={[styles.bubbleName, { color: '#fff' }]}>{island.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoBadge} onPress={onInfoPress} hitSlop={8}>
        <Text style={styles.infoText}>ℹ️</Text>
        <Text style={styles.infoLabel}>Info</Text>
      </TouchableOpacity>
    </View>
  );
}

function IslandBubble({
  island,
  unlocked,
  onInfoPress,
}: {
  island: Island;
  unlocked: boolean;
  onInfoPress: () => void;
}) {
  const handlePress = () => {
    if (!unlocked) return;
    router.push(`/island/${island.id}`);
  };

  return (
    <View style={styles.bubbleWrapper}>
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
      <TouchableOpacity style={styles.infoBadge} onPress={onInfoPress} hitSlop={8}>
        <Text style={styles.infoText}>ℹ️</Text>
        <Text style={styles.infoLabel}>Info</Text>
      </TouchableOpacity>
    </View>
  );
}

function PathConnector() {
  return <View style={styles.connector} />;
}

export default function IslandMapScreen() {
  const { isIslandUnlocked, isLoading, errorsToday, canMakeError, progress } = useProgress();
  const [infoIsland, setInfoIsland] = useState<Island | null>(null);

  const introIsland = ISLANDS.find((i) => i.isIntro);
  const mainIslands = ISLANDS.filter((i) => !i.isIntro);
  const introCompleted = progress?.completedLessons.includes('uitspraak-intro') ?? false;

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
            <Text style={styles.errorsText}>Fouten vandaag: {errorsToday}/5</Text>
          )}
        </View>

        <View style={styles.mapContainer}>
          {/* Intro eiland — staat apart voor hoofdstuk 1 */}
          {introIsland && (
            <View style={styles.islandRow}>
              <IntroIslandBubble
                island={introIsland}
                completed={introCompleted}
                onInfoPress={() => setInfoIsland(introIsland)}
              />
            </View>
          )}

          {/* Hoofdstukken */}
          {mainIslands.map((island, index) => {
            const prevIsland = index > 0 ? mainIslands[index - 1] : null;
            const isNewChapter = !prevIsland || prevIsland.chapter !== island.chapter;

            return (
              <View key={island.id} style={styles.islandRow}>
                {isNewChapter && (
                  <>
                    <View style={styles.chapterSpacer} />
                    <ChapterHeader chapter={island.chapter} name={island.chapterName} />
                  </>
                )}
                {!isNewChapter && <PathConnector />}
                <IslandBubble
                  island={island}
                  unlocked={isIslandUnlocked(island.id)}
                  onInfoPress={() => setInfoIsland(island)}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>

      <IslandInfoModal
        island={infoIsland}
        visible={infoIsland !== null}
        onClose={() => setInfoIsland(null)}
      />
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
    paddingBottom: 48,
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
  // Chapter header
  chapterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    marginTop: 8,
    gap: 10,
  },
  chapterLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#C8B89A',
  },
  chapterHeaderText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8B6F47',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  chapterSpacer: {
    height: 8,
  },
  // Intro island
  introWrapper: {
    alignItems: 'center',
  },
  introBadgeRow: {
    marginBottom: 10,
  },
  introBadge: {
    backgroundColor: '#F57F17',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  introBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  introBubble: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F57F17',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  introCheckBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  introCheckText: {
    color: '#F57F17',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Island bubble
  bubbleWrapper: {
    alignItems: 'center',
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
  infoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    backgroundColor: '#F0E6D3',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  infoText: {
    fontSize: 13,
  },
  infoLabel: {
    fontSize: 12,
    color: '#8B6F47',
    fontWeight: '600',
  },
  connector: {
    width: 3,
    height: 48,
    borderLeftWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#C8B89A',
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  modalEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  modalIslandName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  chapterBadge: {
    backgroundColor: '#F0E6D3',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 16,
  },
  chapterBadgeText: {
    fontSize: 12,
    color: '#8B6F47',
    fontWeight: '600',
  },
  modalDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: 16,
  },
  topicsList: {
    width: '100%',
    gap: 6,
    marginBottom: 24,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  topicBullet: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: 'bold',
    lineHeight: 20,
  },
  topicText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    flex: 1,
  },
  closeButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
