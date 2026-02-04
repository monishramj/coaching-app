import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useCallback } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ── TYPES ──
interface MarketplaceItem {
    id: number;
    title: string;
    author: string;
    category: string;
    price: string;
    rating: number;
    accent: string;
    downloads?: string;
    subtitle?: string;
}

const SNAPPY_SPRING = {
    stiffness: 600,
    damping: 35,
    mass: 0.5,
};

// ── MOCK DATA ──
const FEATURED: MarketplaceItem = {
    id: 0,
    title: '75 HARD CHALLENGE',
    subtitle: 'Transform Your Life in 75 Days',
    author: 'Atlas',
    category: 'Featured',
    rating: 4.9,
    downloads: '25k',
    price: 'Free',
    accent: '#7869B0',
};

const TRENDING: MarketplaceItem[] = [
    { id: 1, title: '75 HARD CORE', author: 'Atlas', category: 'Fitness', price: 'Free', rating: 4.9, accent: '#7869B0' },
    { id: 2, title: 'DEEP WORK OS', author: 'Sage', category: 'Productivity', price: '$4.99', rating: 5.0, accent: '#4C9F70' },
    { id: 3, title: 'KETO KICKSTART', author: 'Flow', category: 'Nutrition', price: '$2.99', rating: 4.7, accent: '#4A706E' },
];

export default function MarketplaceScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const primaryColor = Colors[colorScheme].tint;
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = ['All', 'Fitness', 'Productivity', 'Wellness', 'Career'];

    // ── COMPONENTS ──

    const HeroCard = () => (
        <TouchableOpacity activeOpacity={0.9} className="mx-6 mb-10">
            <View className="rounded-[32px] overflow-hidden border-[2px] border-white/60 shadow-2xl shadow-black/20" style={{ height: 420 }}>
                <LinearGradient
                    colors={[FEATURED.accent, 'rgba(2, 9, 18, 0.95)']}
                    locations={[0, 0.8]}
                    style={StyleSheet.absoluteFill}
                />
                <View className="flex-1 p-8 justify-end">
                    <View className="self-start px-3 py-1 rounded-full bg-white/20 border border-white/30 mb-4">
                        <Text className="text-[10px] font-black text-white uppercase tracking-widest">{FEATURED.category}</Text>
                    </View>
                    <Text className="text-4xl font-black text-white mb-2 -tracking-[2.5px] leading-[40px]">{FEATURED.title}</Text>
                    <Text className="text-base font-bold text-white/70 mb-8">{FEATURED.subtitle}</Text>

                    <View className="flex-row gap-3">
                        <TouchableOpacity className="flex-1 bg-white py-4 rounded-2xl items-center justify-center shadow-lg">
                            <Text className="text-[#020912] font-black text-xs uppercase tracking-widest">Install Now</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="w-14 h-14 bg-white/10 rounded-2xl items-center justify-center border border-white/30">
                            <Ionicons name="bookmark-outline" size={22} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const HorizontalCard = ({ item }: { item: MarketplaceItem }) => (
        <TouchableOpacity activeOpacity={0.8} className="mr-4" style={{ width: 170 }}>
            <View className="rounded-[28px] overflow-hidden border-[1.5px] border-white/60 shadow-xl" style={{ height: 240 }}>
                <LinearGradient colors={[item.accent, 'rgba(2, 9, 18, 0.9)']} style={StyleSheet.absoluteFill} />
                <View className="flex-1 p-5 justify-between">
                    <View className="self-start px-2 py-1 rounded-full bg-white/10 border border-white/20">
                        <Text className="text-[8px] font-black text-white uppercase tracking-[1.5px]">{item.category}</Text>
                    </View>
                    <View>
                        <Text className="text-[18px] font-black text-white mb-1 -tracking-[0.5px] leading-tight">{item.title}</Text>
                        <View className="flex-row items-center justify-between mt-3">
                            <View className="flex-row items-center gap-1">
                                <Ionicons name="star" size={10} color="white" />
                                <Text className="text-[10px] font-black text-white">{item.rating}</Text>
                            </View>
                            <Text className="text-[10px] font-black text-white/80 uppercase">{item.price}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const SectionHeader = ({ title }: { title: string }) => (
        <View className="flex-row justify-between items-center px-6 mb-4">
            <Text className="text-[24px] font-black text-foreground -tracking-[1.5px]">{title}</Text>
            <TouchableOpacity><Text className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">See All</Text></TouchableOpacity>
        </View>
    );

    return (
        <View className="flex-1 bg-background">
            <LinearGradient
                colors={[primaryColor, 'transparent', 'transparent', primaryColor]}
                locations={[0, 0.3, 0.9, 1]}
                style={[StyleSheet.absoluteFill, { opacity: 0.6 }]}
            />

            <SafeAreaView className="flex-1">
                {/* ── HEADER ── */}
                <View className="px-6 pt-5 pb-8 flex-row items-center justify-between">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-11 h-11 rounded-full bg-surface items-center justify-center border-[2px] border-foreground/10 shadow-sm"
                    >
                        <Ionicons name="arrow-back" size={20} className="text-foreground" />
                    </TouchableOpacity>

                    <Text className="text-[32px] font-black -tracking-[2.5px] text-foreground">
                        MARKET
                    </Text>

                    <TouchableOpacity className="w-11 h-11 rounded-full bg-surface items-center justify-center border-[2px] border-foreground/10">
                        <Ionicons name="search" size={20} className="text-foreground" />
                    </TouchableOpacity>
                </View>

                {/* ── CATEGORY PILLS ── */}
                <View className="px-6 mb-8">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
                        {categories.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                onPress={() => setSelectedCategory(cat)}
                                className={`px-6 py-2.5 rounded-full ${selectedCategory === cat ? 'bg-foreground' : 'bg-surface border border-foreground/5'}`}
                            >
                                <Text className={`text-[10px] font-black uppercase tracking-widest ${selectedCategory === cat ? 'text-background' : 'text-foreground/40'}`}>
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                    <Animated.View entering={FadeInDown.springify().stiffness(SNAPPY_SPRING.stiffness)}>
                        <HeroCard />
                    </Animated.View>

                    <View className="mb-10">
                        <SectionHeader title="TRENDING NOW" />
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
                            {TRENDING.map((item) => (
                                <Animated.View key={item.id} layout={Layout.springify()}>
                                    <HorizontalCard item={item} />
                                </Animated.View>
                            ))}
                        </ScrollView>
                    </View>

                    <View className="mb-10">
                        <SectionHeader title="NEW RELEASES" />
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
                            {TRENDING.slice(0, 2).reverse().map((item) => (
                                <HorizontalCard key={`new-${item.id}`} item={item} />
                            ))}
                        </ScrollView>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}