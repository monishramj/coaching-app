import ArchedCarousel from '@/components/arched-carousel';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const C = {
  parchment: '#F9F6F1',
  ink: '#020912',
  lilac: '#7869B0',
  shamrock: '#4C9F70',
  pine: '#4A706E',
};

// Added 'hasReminder' to simulate the story state
const COACHES = [
  { id: 1, name: 'Atlas', specialty: 'Fitness', unread: 3, avatar: 'A', sessions: 42, streak: 12, accent: 'bg-lilac', textAccent: 'text-lilac', hex: C.lilac, hasReminder: true },
  { id: 2, name: 'Sage', specialty: 'Learning', unread: 0, avatar: 'S', sessions: 31, streak: 5, accent: 'bg-shamrock', textAccent: 'text-shamrock', hex: C.shamrock, hasReminder: false },
  { id: 3, name: 'Echo', specialty: 'Career', unread: 1, avatar: 'E', sessions: 28, streak: 8, accent: 'bg-pine', textAccent: 'text-pine', hex: C.pine, hasReminder: true },
  { id: 4, name: 'Flow', specialty: 'Wellness', unread: 0, avatar: 'F', sessions: 35, streak: 21, accent: 'bg-shamrock', textAccent: 'text-shamrock', hex: C.shamrock, hasReminder: false },
  { id: 5, name: 'Spark', specialty: 'Creative', unread: 2, avatar: 'S', sessions: 19, streak: 3, accent: 'bg-lilac', textAccent: 'text-lilac', hex: C.lilac, hasReminder: true },
];

const Rule = ({ colorClass = 'bg-ink' }: { colorClass?: string }) => (
  <View className={`h-[1px] w-full ${colorClass}`} />
);

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-parchment">
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
          <View className="w-[1px] bg-ink" />
          <View className="flex-1 px-3.5">
            <Text className="text-[9px] uppercase tracking-[1.8px] text-pine mb-0.5">Sessions</Text>
            <Text className="text-[15px] font-extrabold text-ink">155</Text>
          </View>
          <View className="w-[1px] bg-ink" />
          <View className="flex-1 pl-3.5">
            <Text className="text-[9px] uppercase tracking-[1.8px] text-pine mb-0.5">This Week</Text>
            <Text className="text-[15px] font-extrabold text-ink">12</Text>
          </View>
        </View>
        <Rule />
      </View>

      {/* ── Stories / Reminders Rail ── */}
      <View className="pt-10 pb-10">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24 }}
        >
          {/* Add "My Daily" or generic first item */}
          <TouchableOpacity className="mr-5 items-center">
            <View className="w-[68px] h-[68px] rounded-full border-[2px] border-dashed border-pine justify-center items-center mb-1.5">
              <View className="w-[58px] h-[58px] rounded-full bg-parchment border border-pine justify-center items-center">
                <Ionicons name="add" size={24} color={C.pine} />
              </View>
            </View>
            <Text className="text-[10px] font-bold text-pine tracking-widest uppercase">Daily</Text>
          </TouchableOpacity>

          {/* Coach Circles */}
          {COACHES.map((coach) => (
            <TouchableOpacity key={coach.id} className="mr-5 items-center">
              {/* Ring Container */}
              <View className={`w-[68px] h-[68px] rounded-full justify-center items-center mb-1.5 border-[2px] ${coach.hasReminder ? 'border-lilac' : 'border-black/10'}`}>
                {/* Avatar Circle */}
                <View className="w-[58px] h-[58px] rounded-full bg-ink justify-center items-center border-[2px] border-parchment">
                  <Text className="text-xl font-black text-parchment">{coach.avatar}</Text>
                </View>

                {/* "New" Badge if reminder exists */}
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
        <Rule />
      </View>

      {/* ── Spacer to push Carousel Down ── */}
      <View className="flex-1" />

      {/* ── Carousel ── */}
      <View className="justify-end pb-0">
        <ArchedCarousel
          data={[...COACHES, { id: 'new', type: 'create' }]}
          bend={20}
          cardWidth={210}
          cardSpacing={30}
          borderRadius={0.05}
          renderItem={(item: any) => {
            if (item.type === 'create') {
              return (
                <TouchableOpacity activeOpacity={0.6} className="w-[210px] h-[260px] border-2 border-dashed border-pine rounded-xl justify-center items-center">
                  <View className="w-11 h-11 rounded-full border-[1.5px] border-pine justify-center items-center mb-2.5">
                    <Ionicons name="add" size={22} color={C.pine} />
                  </View>
                  <Text className="text-[9px] uppercase tracking-[2px] text-pine font-semibold">New Coach</Text>
                </TouchableOpacity>
              );
            }
            return (
              <TouchableOpacity activeOpacity={0.85} className="w-[210px] h-[260px]">
                <View className="flex-1 bg-parchment border-2 border-ink rounded-xl overflow-hidden">
                  <View className={`h-1 ${item.accent}`} />
                  <View className="flex-row items-center justify-between px-3.5 py-2 border-b border-ink">
                    <Text className={`text-[9px] uppercase tracking-[2px] font-bold ${item.textAccent}`}>{item.specialty}</Text>
                    {item.unread > 0 && (
                      <View className={`${item.accent} rounded-[10px] w-5 h-5 justify-center items-center`}>
                        <Text className="text-[10px] font-extrabold text-parchment">{item.unread}</Text>
                      </View>
                    )}
                  </View>
                  <View className="flex-1 p-3.5 justify-between">
                    <View>
                      <Text className="text-[80px] font-black leading-[72px] text-ink opacity-[0.06] -mt-1">{item.avatar}</Text>
                      <Text className="text-2xl font-black text-ink -mt-[18px] -tracking-[1px] leading-6">{item.name}</Text>
                    </View>
                    <View>
                      <Rule />
                      <View className="flex-row justify-between mt-2.5">
                        <View>
                          <Text className="text-[9px] uppercase tracking-[1.5px] text-pine">Sessions</Text>
                          <Text className="text-sm font-extrabold text-ink">{item.sessions}</Text>
                        </View>
                        <View className="w-[1px] bg-ink" />
                        <View className="items-end">
                          <Text className="text-[9px] uppercase tracking-[1.5px] text-pine">Streak</Text>
                          <View className="flex-row items-center gap-0.5">
                            <Ionicons name="flame" size={11} color={item.hex} />
                            <Text className="text-sm font-extrabold text-ink">{item.streak}d</Text>
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

      {/* ── View All (Text Link) ── */}
      <View className="px-6 pb-4 pt-4 items-center">
        <TouchableOpacity className="flex-row items-center gap-1">
          <Text className="text-[11px] font-bold text-pine uppercase tracking-[2px]">View All</Text>
          <Ionicons name="arrow-forward" size={12} color={C.pine} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}