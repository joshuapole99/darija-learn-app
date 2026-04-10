import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Mrhba! 👋</Text>
        <Text style={styles.subtitle}>Klaar om Darija te leren?</Text>
      </View>

      <View style={styles.streakCard}>
        <Text style={styles.streakNumber}>0</Text>
        <Text style={styles.streakLabel}>dagen streak</Text>
      </View>

      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>Start vandaag's les</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 6,
  },
  streakCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  streakLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  startButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
