import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const LESSONS = [
  { id: '1', title: 'Groeten', subtitle: 'salam, labas, mrhba', completed: false },
  { id: '2', title: 'Jezelf voorstellen', subtitle: 'smiyti, fin sken', completed: false },
  { id: '3', title: 'Familie', subtitle: 'mmi, bba, khti, khoya', completed: false },
  { id: '4', title: 'Getallen 1–20', subtitle: 'wahed, jouj, tlata...', completed: false },
  { id: '5', title: 'Kleuren', subtitle: 'hmer, khal, byad...', completed: false },
  { id: '6', title: 'Eten & drinken', subtitle: 'atay, khobz, tajin...', completed: false },
  { id: '7', title: 'In de winkel', subtitle: 'bshhal, ghali, rkhis', completed: false },
  { id: '8', title: 'Hoe voel je je?', subtitle: 'labas, mrid, ferhan', completed: false },
  { id: '9', title: 'Richting aangeven', subtitle: 'limin, lissar, niya', completed: false },
  { id: '10', title: 'Dagelijkse routines', subtitle: 'sbah, msa, ftor...', completed: false },
];

export default function LessonsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lessen</Text>
      <FlatList
        data={LESSONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.lessonCard, item.completed && styles.completed]}>
            <View style={styles.lessonInfo}>
              <Text style={styles.lessonNumber}>Les {item.id}</Text>
              <Text style={styles.lessonTitle}>{item.title}</Text>
              <Text style={styles.lessonSubtitle}>{item.subtitle}</Text>
            </View>
            <Text style={styles.arrow}>{item.completed ? '✓' : '→'}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    color: '#1a1a1a',
  },
  list: {
    paddingBottom: 40,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  completed: {
    backgroundColor: '#E8F5E9',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonNumber: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  lessonSubtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
    fontStyle: 'italic',
  },
  arrow: {
    fontSize: 20,
    color: '#2E7D32',
  },
});
