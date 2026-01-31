import ArchedCarousel from '@/components/arched-carousel';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dummy Data
const COACHES = [
  { id: 1, name: 'Atlas', specialty: 'Fitness', unread: 3, avatar: 'A' },
  { id: 2, name: 'Sage', specialty: 'Learning', unread: 0, avatar: 'S' },
  { id: 3, name: 'Echo', specialty: 'Career', unread: 1, avatar: 'E' },
  { id: 4, name: 'Flow', specialty: 'Wellness', unread: 0, avatar: 'F' },
  { id: 5, name: 'Spark', specialty: 'Creative', unread: 2, avatar: 'S' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#FAF9F7]">
      {/* Header */}
      <View className="px-6 pt-3 pb-6">
        <View className="flex-row items-center justify-between mb-8">
          {/* Streak */}
          <View className="flex-row items-center space-x-2">
            <Ionicons name="flame" size={24} color="#000" />
            <Text className="text-xl font-medium text-black">87</Text>
          </View>

          {/* Notification */}
          <TouchableOpacity className="relative">
            <Ionicons name="notifications-outline" size={28} color="#000" />
            <View className="absolute top-0 right-0 w-2 h-2 bg-black rounded-full" />
          </TouchableOpacity>
        </View>

        {/* Large Title */}
        <Text className="text-4xl font-black tracking-tight text-black">
          COACHAI
        </Text>
      </View>

      {/* Spacer */}
      <View className="flex-1" />

      {/* Carousel at Bottom */}
      <View className="pb-32">
        <ArchedCarousel
          data={[...COACHES, { id: 'new', type: 'create' }]}
          bend={30}
          cardWidth={200}
          cardSpacing={24}
          borderRadius={0.15}
          renderItem={(item: any) => {
            if (item.type === 'create') {
              return (
                <TouchableOpacity
                  className="w-[200px] h-[240px] border-2 border-dashed border-gray-300 rounded-[30px] justify-center items-center bg-white"
                  activeOpacity={0.7}
                >
                  <Ionicons name="add" size={40} color="#AAAAAA" />
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity
                activeOpacity={0.9}
                className="w-[200px] h-[240px]"
              >
                <View className="flex-1 bg-white rounded-[30px] border-[3px] border-black overflow-hidden">
                  {/* Card content - minimal */}
                  <View className="flex-1 items-center justify-center p-4">
                    {/* Avatar */}
                    <View className="relative mb-4">
                      <View
                        className="w-20 h-20 rounded-full justify-center items-center"
                        style={{
                          backgroundColor: item.unread > 0 ? '#000' : '#E5E5E5',
                        }}
                      >
                        <Text className={`text-3xl font-bold ${item.unread > 0 ? 'text-white' : 'text-black'}`}>
                          {item.avatar}
                        </Text>
                      </View>

                      {/* Unread Badge */}
                      {item.unread > 0 && (
                        <View className="absolute -top-1 -right-1 w-6 h-6 bg-black rounded-full justify-center items-center border-2 border-white">
                          <Text className="text-white text-[10px] font-bold">
                            {item.unread}
                          </Text>
                        </View>
                      )}
                    </View>

                    {/* Name */}
                    <Text className="text-lg font-bold text-black mb-1">
                      {item.name}
                    </Text>

                    {/* Specialty */}
                    <Text className="text-xs text-gray-500">
                      {item.specialty}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* View All Button */}
      <View className="px-6 pb-4">
        <TouchableOpacity className="bg-black rounded-2xl py-4 active:opacity-80">
          <Text className="text-white text-center font-bold tracking-wide">
            View All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Tabs (placeholder for tab bar) */}
      <View className="border-t border-gray-200 px-8 py-4 flex-row justify-around bg-white">
        <TouchableOpacity className="items-center">
          <Ionicons name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="flame-outline" size={24} color="#AAAAAA" />
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="add-circle-outline" size={24} color="#AAAAAA" />
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="person-outline" size={24} color="#AAAAAA" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}