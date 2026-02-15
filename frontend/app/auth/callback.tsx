import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function AuthCallback() {
  const params = useLocalSearchParams();

  useEffect(() => {
    const handleAuth = async () => {
      console.log('Auth callback params:', params);

      // Check for errors
      if (params.error) {
        console.log('Auth error:', params.error, params.error_description);
        // Go back to login
        router.replace('/login');
        return;
      }

      // Check for tokens (implicit flow)
      const accessToken = params.access_token as string;
      const refreshToken = params.refresh_token as string;

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          console.log('Session error:', error);
          router.replace('/login');
        } else {
          console.log('Session set successfully!');
          router.replace('/(tabs)');
        }
      } else {
        // No tokens, go back to login
        console.log('No tokens received');
        router.replace('/login');
      }
    };

    handleAuth();
  }, [params]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#000" />
      <Text className="mt-4 text-gray-600">Completing sign in...</Text>
    </View>
  );
}
