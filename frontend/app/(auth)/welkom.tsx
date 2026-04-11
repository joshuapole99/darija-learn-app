import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';

export default function WelkomScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>🌍</Text>
          <Text style={styles.appNaam}>Darija Learn</Text>
          <Text style={styles.tagline}>Leer Darija op jouw manier</Text>
          <Text style={styles.subtag}>Gemaakt voor Nederlanders met Marokkaanse roots</Text>
        </View>

        {/* Marokkaanse vlag kleurbalk */}
        <View style={styles.flagBar}>
          <View style={styles.flagRed} />
          <View style={styles.flagGreen} />
          <View style={styles.flagRed} />
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/(auth)/registreren')}>
            <Text style={styles.primaryBtnText}>Maak een account aan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.secondaryBtnText}>Ik heb al een account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF6EC',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 28,
    paddingBottom: 48,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  heroEmoji: {
    fontSize: 80,
    marginBottom: 8,
  },
  appNaam: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '600',
    color: '#006233',
    textAlign: 'center',
  },
  subtag: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  flagBar: {
    flexDirection: 'row',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 24,
    gap: 3,
  },
  flagRed: { flex: 1, backgroundColor: '#C1121F', borderRadius: 2 },
  flagGreen: { flex: 2, backgroundColor: '#006233', borderRadius: 2 },
  buttons: {
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: '#006233',
    borderRadius: 14,
    padding: 17,
    alignItems: 'center',
    shadowColor: '#006233',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryBtn: {
    borderRadius: 14,
    padding: 17,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#006233',
  },
  secondaryBtnText: {
    color: '#006233',
    fontSize: 16,
    fontWeight: '700',
  },
});
