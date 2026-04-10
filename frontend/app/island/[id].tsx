import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { getIslandById, LessonWithQuestions } from '../../src/data/lessonData';
import { useProgress } from '../../src/hooks/useProgress';

function LessonCard({
  lesson,
  index,
  complete,
  onPress,
}: {
  lesson: LessonWithQuestions;
  index: number;
  complete: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={[styles.card, complete && styles.cardComplete]} onPress={onPress}>
      <View style={styles.cardLeft}>
        <View style={[styles.lessonNumber, complete && styles.lessonNumberComplete]}>
          <Text style={styles.lessonNumberText}>{index + 1}</Text>
        </View>
        <View>
          <Text style={styles.cardTitle}>{lesson.title}</Text>
          <Text style={styles.cardSubtitle}>{lesson.subtitle}</Text>
        </View>
      </View>
      <Text style={styles.cardIcon}>{complete ? '✅' : '▶️'}</Text>
    </TouchableOpacity>
  );
}

export default function IslandScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const island = getIslandById(id);
  const { isLessonComplete } = useProgress();

  if (!island) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Eiland niet gevonden</Text>
      </View>
    );
  }

  const completedCount = island.lessons.filter((l) => isLessonComplete(l.id)).length;
  const totalLessons = island.lessons.length;
  const progressPercent = totalLessons > 0 ? completedCount / totalLessons : 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: island.name }} />

      <View style={styles.islandHeader}>
        <Text style={styles.islandEmoji}>{island.emoji}</Text>
        <Text style={styles.islandName}>{island.name}</Text>
        {totalLessons > 0 && (
          <>
            <Text style={styles.progressLabel}>
              {completedCount}/{totalLessons} lessen voltooid
            </Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progressPercent * 100}%` }]} />
            </View>
          </>
        )}
      </View>

      {totalLessons === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🚧</Text>
          <Text style={styles.emptyText}>Inhoud komt binnenkort!</Text>
        </View>
      ) : (
        <FlatList
          data={island.lessons}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => (
            <LessonCard
              lesson={item}
              index={index}
              complete={isLessonComplete(item.id)}
              onPress={() => router.push(`/lesson/${item.id}`)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF6EC',
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 18,
    color: '#555',
  },
  islandHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D3',
  },
  islandEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  islandName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    color: '#777',
    marginBottom: 8,
  },
  progressBarBg: {
    width: '80%',
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2E7D32',
    borderRadius: 5,
  },
  list: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  cardComplete: {
    borderLeftWidth: 4,
    borderLeftColor: '#2E7D32',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  lessonNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0E6D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonNumberComplete: {
    backgroundColor: '#C8E6C9',
  },
  lessonNumberText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#555',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  cardIcon: {
    fontSize: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emptyEmoji: {
    fontSize: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});
