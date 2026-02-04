import "../global.css";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { KeyboardProvider } from 'react-native-keyboard-controller'; // ── NEW ──

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = 'light';

  return (
    <KeyboardProvider>
      <View style={{ flex: 1 }} className={colorScheme === 'dark' ? 'dark' : ''}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            {/* Main App Navigation */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* Auth Flow */}
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />

            {/* Chat Flow - Outside tabs for full screen */}
            <Stack.Screen
              name="chat/[id]"
              options={{
                headerShown: false,
                animation: 'slide_from_right'
              }}
            />

            <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Settings' }} />
          </Stack>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </ThemeProvider>
      </View>
    </KeyboardProvider>
  );
}