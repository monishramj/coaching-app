import ArchedCarousel from '@/components/arched-carousel';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const C = {
  parchment: '#F9F6F1',
  ink: '#020912',
  lilac: '#7869B0',
  shamrock: '#4C9F70',
  pine: '#4A706E',
};

const COACHES = [
  { id: 1, name: 'Atlas', specialty: 'Fitness', unread: 3, avatar: 'A', sessions: 42, streak: 12, accent: 'bg-lilac', textAccent: 'text-lilac', hex: C.lilac, hasReminder: true },
  { id: 2, name: 'Sage', specialty: 'Learning', unread: 0, avatar: 'S', sessions: 31, streak: 5, accent: 'bg-shamrock', textAccent: 'text-shamrock', hex: C.shamrock, hasReminder: false },
  { id: 3, name: 'Echo', specialty: 'Career', unread: 1, avatar: 'E', sessions: 28, streak: 8, accent: 'bg-pine', textAccent: 'text-pine', hex: C.pine, hasReminder: true },
  { id: 4, name: 'Flow', specialty: 'Wellness', unread: 0, avatar: 'F', sessions: 35, streak: 21, accent: 'bg-shamrock', textAccent: 'text-shamrock', hex: C.shamrock, hasReminder: false },
  { id: 5, name: 'Spark', specialty: 'Creative', unread: 2, avatar: 'S', sessions: 19, streak: 3, accent: 'bg-lilac', textAccent: 'text-lilac', hex: C.lilac, hasReminder: true },
];

const CARD_WIDTH = 185;

const Rule = ({ colorClass = 'bg-ink' }: { colorClass?: string }) => (
  <View className={`h-[1px] w-full ${colorClass}`} />
);

export default function HomeScreen() {
  const CAROUSEL_DATA = [{ id: 'new', type: 'create' }, ...COACHES];

  return (
    <View className="flex-1">
      {/* ── BACKGROUND ── */}
      <LinearGradient
        colors={[C.lilac, '#F9F6F1', '#F9F6F1', C.lilac]}
        locations={[0, 0.3, 0.7, 1]}
        start={{ x: 0, y: 1 }}
        end={{ x: .7, y: 0 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, opacity: 0.7 }}
      />
      <LinearGradient
        colors={['#F9F6F1', '#F9F6F1', C.lilac]}
        locations={[0, 0.4, 1]}
        start={{ x: .5, y: 1 }}
        end={{ x: .1, y: .6 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, opacity: .3 }}
      />
      <View className="absolute inset-0 bg-parchment -z-10" />

      <SafeAreaView className="flex-1">
        {/* ── Header ── */}
        <View className="px-6 pt-5">
          <View className="flex-row items-center justify-around mb-6">
            <View className="items-center">
              <Ionicons name="flame" size={22} color={C.lilac} />
              <Text className="text-[13px] font-bold text-ink">87</Text>
            </View>
            <Text className="text-[35px] font-black -tracking-[3px] text-ink">
              COACHAI
            </Text>
            <TouchableOpacity className="relative">
              <Ionicons name="notifications-outline" size={22} color={C.ink} />
              <View className="absolute -top-0.5 -right-0.5 w-[9px] h-[9px] rounded-full bg-lilac border-[1.5px] border-parchment" />
            </TouchableOpacity>
          </View>

          <View className="flex-row py-3 pb-4 items-stretch">
            <View className="flex-1">
              <Text className="text-[9px] uppercase tracking-[1.8px] text-pine mb-0.5">Coaches</Text>
              <Text className="text-[15px] font-extrabold text-ink">5</Text>
            </View>
            <View className="w-[1px] bg-ink opacity-20" />
            <View className="flex-1 px-3.5">
              <Text className="text-[9px] uppercase tracking-[1.8px] text-pine mb-0.5">Sessions</Text>
              <Text className="text-[15px] font-extrabold text-ink">155</Text>
            </View>
            <View className="w-[1px] bg-ink opacity-20" />
            <View className="flex-1 pl-3.5">
              <Text className="text-[9px] uppercase tracking-[1.8px] text-pine mb-0.5">This Week</Text>
              <Text className="text-[15px] font-extrabold text-ink">12</Text>
            </View>
          </View>
          <Rule colorClass="bg-ink opacity-20" />
        </View>

        {/* ── Stories Rail ── */}
        <View className="pt-8 pb-8">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            <TouchableOpacity className="mr-5 items-center">
              <View className="w-[68px] h-[68px] rounded-full border-[2px] border-dashed border-pine justify-center items-center mb-1.5 bg-parchment/50">
                <View className="w-[58px] h-[58px] rounded-full bg-parchment border border-pine justify-center items-center">
                  <Ionicons name="add" size={24} color={C.pine} />
                </View>
              </View>
              <Text className="text-[10px] font-bold text-pine tracking-widest uppercase">Daily</Text>
            </TouchableOpacity>

            {COACHES.map((coach) => (
              <TouchableOpacity key={coach.id} className="mr-5 items-center">
                <View className={`w-[68px] h-[68px] rounded-full justify-center items-center mb-1.5 border-[2px] ${coach.hasReminder ? 'border-lilac' : 'border-black/10'} bg-parchment/50`}>
                  <View className="w-[58px] h-[58px] rounded-full bg-ink justify-center items-center border-[2px] border-parchment">
                    <Text className="text-xl font-black text-parchment">{coach.avatar}</Text>
                  </View>
                  {coach.hasReminder && (
                    <View className="absolute bottom-0 right-0 bg-lilac w-5 h-5 rounded-full border-[2px] border-parchment justify-center items-center">
                      <Ionicons name="flash" size={10} color={C.parchment} />
                    </View>
                  )}
                </View>
                <Text className={`text-[10px] font-bold tracking-widest uppercase ${coach.hasReminder ? 'text-ink' : 'text-pine'}`}>
                  {coach.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View className="px-6">
          <Rule colorClass="bg-ink opacity-20" />
        </View>

        <View className="flex-1" />

        {/* ── Carousel ── */}
        <View className="justify-end pb-3">
          <ArchedCarousel
            data={CAROUSEL_DATA}
            initialIndex={1}
            bend={20}
            cardWidth={CARD_WIDTH}
            cardSpacing={33}
            renderItem={(item: any) => {
              if (item.type === 'create') {
                return (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={{ width: CARD_WIDTH, height: 260 }}
                    className="border-2 border-dashed border-pine rounded-3xl justify-center items-center bg-white/10"
                  >
                    <View className="w-11 h-11 rounded-full border-[1.5px] border-pine justify-center items-center mb-2.5">
                      <Ionicons name="add" size={22} color={C.pine} />
                    </View>
                    <Text className="text-[9px] uppercase tracking-[2px] text-pine font-semibold">New Coach</Text>
                  </TouchableOpacity>
                );
              }
              return (
                <TouchableOpacity activeOpacity={0.85} style={{ width: CARD_WIDTH, height: 260 }}>
                  {/* OUTER CONTAINER: Increased shadow for better elevation */}
                  <View className="flex-1 rounded-3xl overflow-hidden border-[2px] border-white/60 shadow-2xl shadow-black/20">

                    {/* 1. BLUR LAYER */}
                    <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />

                    {/* 2. CONTRAST WRAPPER: This adds the slight dark outline */}
                    <View
                      className="flex-1 bg-white/40 border-[2px] rounded-3xl"
                      style={{ borderColor: 'rgba(2, 9, 18, 0.2)' }} // The "Slight Outline" using Ink
                    >

                      {/* Card Header: Darkened border-b for internal contrast */}
                      <View className="flex-row items-center justify-between px-3.5 py-3 border-b border-ink/5 bg-white/10">
                        <Text className={`text-[10px] uppercase tracking-[2px] font-black ${item.textAccent}`}>
                          {item.specialty}
                        </Text>
                        {item.unread > 0 && (
                          <View className={`${item.accent} rounded-full w-5 h-5 justify-center items-center shadow-md`}>
                            <Text className="text-[10px] font-black text-white">{item.unread}</Text>
                          </View>
                        )}
                      </View>

                      {/* Card Content */}
                      <View className="flex-1 p-3.5 justify-between">
                        <View>
                          {/* Darker Avatar Ghost Text */}
                          <Text className="text-[80px] font-black leading-[72px] text-ink opacity-[0.08] -mt-1">
                            {item.avatar}
                          </Text>
                          <Text className="text-2xl font-black text-ink -mt-[18px] -tracking-[1.5px] leading-6">
                            {item.name}
                          </Text>
                        </View>

                        {/* Bottom Info */}
                        <View>
                          <View className="h-[1px] w-full bg-ink/10" />
                          <View className="flex-row justify-between mt-3">
                            <View>
                              <Text className="text-[9px] uppercase tracking-[1.5px] text-pine font-bold">Sessions</Text>
                              <Text className="text-sm font-black text-ink">{item.sessions}</Text>
                            </View>
                            <View className="w-[1px] bg-ink/10" />
                            <View className="items-end">
                              <Text className="text-[9px] uppercase tracking-[1.5px] text-pine font-bold">Streak</Text>
                              <View className="flex-row items-center gap-1">
                                <Ionicons name="flame" size={13} color={item.hex} />
                                <Text className="text-sm font-black text-ink">{item.streak}d</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* ── View All ── */}
        <View className="px-6 pb-4 pt-4 items-center">
          <TouchableOpacity className="flex-row items-center gap-1">
            <Text className="text-[12px] font-bold text-lilac uppercase tracking-[2px]">View All</Text>
            <Ionicons name="arrow-forward" size={12} color={C.ink} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}