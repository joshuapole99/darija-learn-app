import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function CompletionScreen() {
  const { lessonId, score, passed } = useLocalSearchParams<{
    lessonId: string;
    score: string;
    passed: string;
  }>();

  const didPass = passed === '1';
  const scoreNum = parseInt(score ?? '0', 10);
  const confettiRef = useRef<ConfettiCannon>(null);

  useEffect(() => {
    if (didPass) {
      confettiRef.current?.start();
    }
  }, [didPass]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {didPass && (
        <ConfettiCannon
          ref={confettiRef}
          count={200}
          origin={{ x: -10, y: 0 }}
          autoStart={false}
          fadeOut
          colors={['#2E7D32', '#FFC107', '#E91E63', '#2196F3', '#FF5722']}
        />
      )}

      <View style={styles.content}>
        <Text style={styles.icon}>{didPass ? '🎉' : '😕'}</Text>

        <Text style={styles.scoreLabel}>Jouw score</Text>
        <Text style={[styles.score, { color: didPass ? '#2E7D32' : '#C62828' }]}>
          {scoreNum}%
        </Text>

        <Text style={styles.message}>
          {didPass
            ? 'Geweldig! Les voltooid!'
            : scoreNum >= 60
            ? 'Bijna! Je hebt 80% nodig om te slagen.'
            : 'Probeer het nog eens, je kunt het!'}
        </Text>

        {!didPass && (
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => router.replace(`/lesson/${lessonId}`)}
          >
            <Text style={styles.retryText}>Probeer opnieuw</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.homeButton, didPass && styles.homeButtonPrimary]}
          onPress={() => router.replace('/')}
        >
          <Text style={[styles.homeText, didPass && styles.homeTextPrimary]}>
            Terug naar kaart
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF6EC',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 12,
  },
  icon: {
    fontSize: 72,
    marginBottom: 8,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  score: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 18,
    color: '#444',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
    lineHeight: 26,
  },
  retryButton: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#2E7D32',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
  },
  retryText: {
    color: '#2E7D32',
    fontSize: 17,
    fontWeight: '700',
  },
  homeButton: {
    width: '100%',
    backgroundColor: '#F0E6D3',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
  },
  homeButtonPrimary: {
    backgroundColor: '#2E7D32',
  },
  homeText: {
    color: '#555',
    fontSize: 17,
    fontWeight: '600',
  },
  homeTextPrimary: {
    color: '#fff',
  },
});
