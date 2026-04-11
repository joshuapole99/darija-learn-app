import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../../src/lib/supabase';

export default function RegistrerenScreen() {
  const [gebruikersnaam, setGebruikersnaam] = useState('');
  const [email, setEmail] = useState('');
  const [wachtwoord, setWachtwoord] = useState('');
  const [fout, setFout] = useState('');
  const [bezig, setBezig] = useState(false);

  async function handleRegistreren() {
    if (!gebruikersnaam.trim() || !email || !wachtwoord) {
      setFout('Vul alle velden in.');
      return;
    }
    if (gebruikersnaam.trim().length < 3) {
      setFout('Gebruikersnaam moet minimaal 3 tekens zijn.');
      return;
    }
    if (wachtwoord.length < 6) {
      setFout('Wachtwoord moet minimaal 6 tekens zijn.');
      return;
    }

    setBezig(true);
    setFout('');

    // 1. Maak auth account aan
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password: wachtwoord });
    if (signUpError || !data.user) {
      setBezig(false);
      setFout(signUpError?.message ?? 'Er ging iets mis. Probeer opnieuw.');
      return;
    }

    // 2. Maak profiel aan
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: gebruikersnaam.trim(),
      avatar_id: 1,
    });

    setBezig(false);

    if (profileError) {
      if (profileError.code === '23505') {
        setFout('Deze gebruikersnaam is al bezet. Kies een andere.');
      } else {
        setFout('Account aangemaakt maar profiel mislukt. Probeer opnieuw.');
      }
      return;
    }

    // 3. Naar avatar kiezen
    router.replace('/(tabs)');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <TouchableOpacity style={styles.back} onPress={() => router.back()}>
            <Text style={styles.backText}>← Terug</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Account aanmaken</Text>
          <Text style={styles.subtitle}>Bijna klaar om te beginnen!</Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gebruikersnaam</Text>
              <TextInput
                style={styles.input}
                placeholder="bijv. hamza_nl"
                placeholderTextColor="#bbb"
                autoCapitalize="none"
                value={gebruikersnaam}
                onChangeText={setGebruikersnaam}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="jouw@email.nl"
                placeholderTextColor="#bbb"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Wachtwoord</Text>
              <TextInput
                style={styles.input}
                placeholder="Minimaal 6 tekens"
                placeholderTextColor="#bbb"
                secureTextEntry
                value={wachtwoord}
                onChangeText={setWachtwoord}
              />
            </View>

            {fout !== '' && (
              <View style={styles.foutBox}>
                <Text style={styles.foutText}>{fout}</Text>
              </View>
            )}

            <TouchableOpacity
              style={[styles.primaryBtn, bezig && styles.btnDisabled]}
              onPress={handleRegistreren}
              disabled={bezig}
            >
              <Text style={styles.primaryBtnText}>{bezig ? 'Aanmaken...' : 'Account aanmaken →'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
            <Text style={styles.switchLink}>Al een account? <Text style={styles.switchLinkBold}>Inloggen</Text></Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FDF6EC' },
  content: { padding: 28, gap: 24, paddingBottom: 48 },
  back: { marginBottom: 8 },
  backText: { fontSize: 15, color: '#2E7D32', fontWeight: '600' },
  title: { fontSize: 30, fontWeight: '800', color: '#1a1a1a' },
  subtitle: { fontSize: 16, color: '#777', marginTop: -8 },
  form: { gap: 16 },
  inputGroup: { gap: 6 },
  label: { fontSize: 13, fontWeight: '700', color: '#555', marginLeft: 2 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E0D5C5',
    padding: 14,
    fontSize: 15,
    color: '#1a1a1a',
  },
  foutBox: {
    backgroundColor: '#FFEBEE',
    borderRadius: 10,
    padding: 12,
  },
  foutText: { color: '#C62828', fontSize: 14, fontWeight: '500' },
  primaryBtn: {
    backgroundColor: '#2E7D32',
    borderRadius: 14,
    padding: 17,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  btnDisabled: { backgroundColor: '#B0BEC5', shadowOpacity: 0, elevation: 0 },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  switchLink: { fontSize: 14, color: '#888', textAlign: 'center' },
  switchLinkBold: { color: '#2E7D32', fontWeight: '700' },
});
