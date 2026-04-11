import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';

function OefeningCard({
  emoji,
  title,
  subtitle,
  onPress,
  color,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  color: string;
}) {
  return (
    <TouchableOpacity style={[styles.card, { borderLeftColor: color }]} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.cardIconBox, { backgroundColor: color + '20' }]}>
        <Text style={styles.cardEmoji}>{emoji}</Text>
      </View>
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.cardArrow}>›</Text>
    </TouchableOpacity>
  );
}

export default function OefeningenScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Oefeningen</Text>
          <Text style={styles.headerSubtitle}>Kies hoe je wilt oefenen</Text>
        </View>

        <OefeningCard
          emoji="📄"
          title="Leesoefeningen"
          subtitle="Lees een tekst in Darija en beantwoord begripsvragen"
          onPress={() => router.push('/lees-oefeningen')}
          color="#2E7D32"
        />

        <OefeningCard
          emoji="🎧"
          title="Luisteroefeningen"
          subtitle="Luister naar een fragment en beantwoord vragen over wat je hoorde"
          onPress={() => router.push('/luister-oefeningen')}
          color="#1565C0"
        />

        <View style={styles.tip}>
          <Text style={styles.tipEmoji}>💡</Text>
          <Text style={styles.tipText}>
            Oefeningen zijn afgestemd op je niveau — hoe meer eilanden je unlock, hoe moeilijker de teksten worden.
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
    gap: 16,
  },
  header: {
    marginBottom: 8,
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  cardIconBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardEmoji: {
    fontSize: 28,
  },
  cardText: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  cardArrow: {
    fontSize: 24,
    color: '#C8B89A',
    fontWeight: 'bold',
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#F0E6D3',
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
  },
  tipEmoji: {
    fontSize: 18,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#7A5C3A',
    lineHeight: 18,
  },
});
