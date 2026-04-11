import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
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
