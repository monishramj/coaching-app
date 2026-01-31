import ArchedCarousel from '@/components/arched-carousel';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dummy Data
const TEMPLATES = [
  { id: 1, title: 'Morning Routine', category: 'Health', streak: 12 },
  { id: 2, title: 'Deep Work', category: 'Productivity', streak: 5 },
  { id: 3, title: 'Gym Session', category: 'Fitness', streak: 45 },
  { id: 4, title: 'Night Reflection', category: 'Mindfulness', streak: 8 },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4">
        {/* Streak Counter */}
        <View className="flex-row items-center space-x-1">
          <Ionicons name="flame" size={24} color="#F59E0B" />
          <Text className="text-xl font-bold text-text">87</Text>
        </View>

        {/* Title */}
        <Text className="text-2xl font-black tracking-widest text-text">
          COACHAI
        </Text>

        {/* Notification */}
        <TouchableOpacity className="relative">
          <Ionicons name="notifications-outline" size={26} color="var(--color-text)" />
          <View className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-background" />
        </TouchableOpacity>
      </View>

      {/* Main Carousel Section */}
      <View className="flex-1 justify-center pb-20">
        <ArchedCarousel
          data={[...TEMPLATES, { id: 'new', type: 'create' }]}
          renderItem={(item: any) => {
            if (item.type === 'create') {
              return (
                <TouchableOpacity className="w-[280px] h-[360px] border-4 border-dashed border-secondary/30 rounded-3xl justify-center items-center bg-surface/50">
                  <Ionicons name="add-circle-outline" size={64} color="var(--color-primary)" />
                  <Text className="text-primary font-bold text-lg mt-4">Create New</Text>
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity activeOpacity={0.9}>
                <View className="w-[280px] h-[360px] bg-background rounded-3xl border-[3px] border-text shadow-lg overflow-hidden relative">
                  {/* Card Image/Gradient Placeholder */}
                  <View className="h-2/3 bg-secondary/20 justify-center items-center">
                    <Ionicons name="trophy-outline" size={80} color="var(--color-secondary)" />
                  </View>

                  {/* Card Content */}
                  <View className="p-5 bg-background h-1/3 border-t-2 border-text/10">
                    <Text className="text-sm font-bold text-primary uppercase tracking-wider">
                      {item.category}
                    </Text>
                    <Text className="text-2xl font-bold text-text mt-1">
                      {item.title}
                    </Text>
                    <View className="flex-row items-center mt-3">
                      <Ionicons name="flash" size={14} color="#F59E0B" />
                      <Text className="text-muted ml-1 text-xs">{item.streak} day streak</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Note: Tabs are handled by _layout.tsx, but this pushes content up */}
    </SafeAreaView>
  );
}