import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback } from 'react';
// ── ADDED Platform TO THIS IMPORT ──
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';

const COACHES = [
  { id: 1, name: 'Atlas', specialty: 'Fitness', unread: 3, avatar: 'A', accent: 'bg-primary' },
  { id: 2, name: 'Sage', specialty: 'Learning', unread: 0, avatar: 'S', accent: 'bg-success' },
  { id: 3, name: 'Echo', specialty: 'Career', unread: 1, avatar: 'E', accent: 'bg-secondary' },
  { id: 4, name: 'Flow', specialty: 'Wellness', unread: 0, avatar: 'F', accent: 'bg-success' },
  { id: 5, name: 'Spark', specialty: 'Creative', unread: 2, avatar: 'S', accent: 'bg-primary' },
];

const SNAPPY_SPRING = {
  stiffness: 600,
  damping: 35,
  mass: 0.5,
};

export default function CoachListScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const primaryColor = Colors[colorScheme].tint;

  const renderCoachItem = useCallback(({ item }: { item: typeof COACHES[0] }) => (
    <Animated.View
      entering={FadeInDown.springify().stiffness(SNAPPY_SPRING.stiffness).damping(SNAPPY_SPRING.damping)}
      layout={Layout.springify().stiffness(SNAPPY_SPRING.stiffness)}
    >
      <TouchableOpacity
        activeOpacity={0.85}
        className="mb-4 mx-6"
        onPress={() => router.push({
          pathname: "/chat/[id]",
          params: { id: item.id.toString(), name: item.name }
        })}
      >
        <View className="rounded-[28px] overflow-hidden border-[2px] border-white/60 shadow-xl">
          <BlurView intensity={80} tint="default" style={StyleSheet.absoluteFill} />

          <View className="bg-surface/90 flex-row items-center p-4 border-[2px] border-border-subtle rounded-[26px]">
            <View className={`w-14 h-14 rounded-full ${item.accent} justify-center items-center shadow-lg border-[2px] border-white/20`}>
              <Text className="text-xl font-black text-background">{item.avatar}</Text>
            </View>

            <View className="flex-1 ml-4 justify-center">
              <Text className="text-[18px] font-black text-foreground -tracking-[1px] leading-tight">
                {item.name?.toUpperCase()}
              </Text>
              <View className="flex-row items-center gap-1.5 mt-0.5">
                <View className="w-1.5 h-1.5 rounded-full bg-success shadow-sm" />
                <Text className="text-[10px] font-black text-secondary uppercase tracking-[2px]">
                  {item.specialty}
                </Text>
              </View>
            </View>

            {item.unread > 0 && (
              <View className={`${item.accent} rounded-full min-w-[24px] h-6 px-1.5 justify-center items-center mr-2 shadow-sm border-[1.5px] border-white/30`}>
                <Text className="text-[10px] font-black text-background">{item.unread}</Text>
              </View>
            )}

            <Ionicons name="chevron-forward" size={20} className="text-foreground/20" />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  ), [router]);

  return (
    <View className="flex-1 bg-background">
      <LinearGradient
        colors={[primaryColor, 'transparent', 'transparent', primaryColor]}
        locations={[0, 0.3, 0.9, 1]}
        style={[styles.absoluteFill, { opacity: 0.6 }]}
      />

      <SafeAreaView className="flex-1">
        <View className="px-6 pt-5 pb-8 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-11 h-11 rounded-full bg-surface items-center justify-center border-[2px] border-foreground/10 shadow-sm"
          >
            <Ionicons name="arrow-back" size={20} className="text-foreground" />
          </TouchableOpacity>

          <Text className="text-[32px] font-black -tracking-[2.5px] text-foreground">
            MY COACHES
          </Text>

          <View className="w-11" />
        </View>

        <FlatList
          data={COACHES}
          keyExtractor={item => item.id.toString()}
          renderItem={renderCoachItem}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={Platform.OS === 'android'}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
});