import "../suppress-warnings"; // Must be first import
import "../global.css"; // Ensure global styles are imported

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import * as WebBrowser from 'expo-web-browser';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Ensure AuthSession flow gets completed when the app opens after redirect
WebBrowser.maybeCompleteAuthSession();

import { useColorScheme } from '@/hooks/use-color-scheme';
import { supabase } from '../lib/supabase'; // Make sure this path is correct

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState(false);

  const segments = useSegments();
  const router = useRouter();

  // 1. Auth Listener
  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setInitialized(true);
    });

    // Listen for changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Navigation Guard
  useEffect(() => {
    if (!initialized) return;

    // Check if the user is on the login screen
    const isLoginScreen = segments[0] === 'login';

    // If NO session and NOT on login screen -> Redirect to Login
    if (!session && !isLoginScreen) {
      router.replace('/login');
    }
    // If YES session and IS on login screen -> Redirect to Tabs
    else if (session && isLoginScreen) {
      router.replace('/(tabs)');
    }
  }, [session, initialized, segments]);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}