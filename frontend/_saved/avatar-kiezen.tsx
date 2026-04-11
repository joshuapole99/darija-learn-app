import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../src/lib/supabase';
import { AVATARS } from '../src/data/avatars';
import { useAuth } from '../src/context/AuthContext';

export default function AvatarKiezenScreen() {
  const { session, refreshProfile } = useAuth();
  const [gekozen, setGekozen] = useState<number>(1);
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState('');

  async function handleKlaar() {
    if (!session?.user.id) return;
    setBezig(true);
    setFout('');
    const { error } = await supabase
      .from('profiles')
      .update({ avatar_id: gekozen })
      .eq('id', session.user.id);

    if (error) {
      setBezig(false);
      setFout('Opslaan mislukt. Probeer opnieuw.');
      return;
    }

    await refreshProfile();
    router.replace('/(tabs)');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Kies jouw avatar</Text>
        <Text style={styles.subtitle}>Je kunt dit later altijd veranderen in je profiel.</Text>

        <View style={styles.grid}>
          {AVATARS.map((avatar) => {
            const isGekozen = gekozen === avatar.id;
            return (
              <TouchableOpacity
                key={avatar.id}
                style={[
                  styles.avatarCard,
                  isGekozen && { borderColor: avatar.kleur, borderWidth: 3 },
                ]}
                onPress={() => setGekozen(avatar.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.avatarCircle, { backgroundColor: avatar.kleur + '22' }]}>
                  <Text style={styles.avatarEmoji}>{avatar.emoji}</Text>
                  {isGekozen && (
                    <View style={[styles.checkBadge, { backgroundColor: avatar.kleur }]}>
                      <Text style={styles.checkText}>✓</Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.avatarNaam, isGekozen && { color: avatar.kleur }]}>
                  {avatar.naam}
                </Text>
                <Text style={styles.avatarDarija}>{avatar.darijaWoord}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {fout !== '' && (
          <View style={styles.foutBox}>
            <Text style={styles.foutText}>{fout}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.primaryBtn, bezig && styles.btnDisabled]}
          onPress={handleKlaar}
          disabled={bezig}
        >
          <Text style={styles.primaryBtnText}>{bezig ? 'Opslaan...' : 'Klaar, begin met leren →'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FDF6EC' },
  content: { padding: 28, gap: 24, paddingBottom: 48, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '800', color: '#1a1a1a', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#888', textAlign: 'center', marginTop: -12 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
    width: '100%',
  },
  avatarCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    gap: 6,
    width: '42%',
    borderWidth: 2,
    borderColor: '#F0E6D3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: { fontSize: 40 },
  checkBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  avatarNaam: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
  avatarDarija: { fontSize: 12, color: '#999' },
  foutBox: { backgroundColor: '#FFEBEE', borderRadius: 10, padding: 12, width: '100%' },
  foutText: { color: '#C62828', fontSize: 14, fontWeight: '500', textAlign: 'center' },
  primaryBtn: {
    backgroundColor: '#2E7D32',
    borderRadius: 14,
    padding: 17,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  btnDisabled: { backgroundColor: '#B0BEC5', shadowOpacity: 0, elevation: 0 },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
