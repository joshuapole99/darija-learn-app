import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { scheduleDailyReminder } from '../src/lib/notifications';

function RootNavigator() {
  const { session, isLoading } = useAuth();

  useEffect(() => {
    // Plan dagelijkse herinnering bij elke app-open (reset de timer)
    scheduleDailyReminder();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FDF6EC' }}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="island/[id]" options={{ headerBackTitle: 'Kaart', headerTintColor: '#2E7D32' }} />
      <Stack.Screen name="lesson/[id]" options={{ title: 'Quiz', headerBackTitle: 'Lessen', headerTintColor: '#2E7D32' }} />
      <Stack.Screen name="completion" options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="lees-oefeningen" options={{ title: 'Leesoefeningen', headerBackTitle: 'Oefeningen', headerTintColor: '#2E7D32' }} />
      <Stack.Screen name="luister-oefeningen" options={{ title: 'Luisteroefeningen', headerBackTitle: 'Oefeningen', headerTintColor: '#2E7D32' }} />
      <Stack.Screen name="uitspraak-les" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
