import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const C = {
    parchment: '#F9F6F1',
    ink: '#020912',
    lilac: '#7869B0',
    shamrock: '#4C9F70',
    pine: '#4A706E',
    gold: '#D4AF37',
};

// ── MOCK DATA ──
const MARKET_ITEMS = [
    {
        id: 1,
        title: '75 Hard Core',
        author: 'Atlas',
        category: 'Fitness',
        price: 'Free',
        rating: 4.9,
        downloads: '12k',
        icon: 'barbell',
        accent: 'bg-lilac',
        textAccent: 'text-lilac',
        hex: C.lilac
    },
    {
        id: 2,
        title: 'Deep Work OS',
        author: 'Sage',
        category: 'Productivity',
        price: '$4.99',
        rating: 5.0,
        downloads: '8.5k',
        icon: 'hourglass',
        accent: 'bg-shamrock',
        textAccent: 'text-shamrock',
        hex: C.shamrock
    },
    {
        id: 3,
        title: 'Keto Kickstart',
        author: 'Flow',
        category: 'Nutrition',
        price: '$2.99',
        rating: 4.7,
        downloads: '3k',
        icon: 'nutrition',
        accent: 'bg-pine',
        textAccent: 'text-pine',
        hex: C.pine
    },
    {
        id: 4,
        title: 'Python Mastery',
        author: 'Sage',
        category: 'Learning',
        price: '$9.99',
        rating: 4.8,
        downloads: '15k',
        icon: 'code-slash',
        accent: 'bg-lilac',
        textAccent: 'text-lilac',
        hex: C.lilac
    },
];

const Rule = ({ colorClass = 'bg-ink' }: { colorClass?: string }) => (
    <View className={`h-[1px] w-full ${colorClass}`} />
);

export default function MarketplaceScreen() {

    const renderItem = ({ item }: { item: typeof MARKET_ITEMS[0] }) => (
        <TouchableOpacity activeOpacity={0.9} className="mb-6 mx-6">
            {/* OUTER SHADOW CONTAINER */}
            <View
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.12,
                    shadowRadius: 10,
                    elevation: 6,
                    backgroundColor: 'transparent'
                }}
            >
                {/* INNER GLASS CONTAINER */}
                <View className="rounded-3xl overflow-hidden border border-white/60 bg-white/20 relative">
                    <BlurView intensity={70} tint="light" style={StyleSheet.absoluteFill} />

                    {/* Contrast Border Wrapper */}
                    <View
                        className="bg-white/30 border-[1px]"
                        style={{ borderColor: 'rgba(2, 9, 18, 0.1)' }}
                    >
                        {/* Accent Bar */}
                        <View className={`h-1.5 ${item.accent} w-full`} />

                        <View className="p-5">
                            {/* Header: Category & Price */}
                            <View className="flex-row justify-between items-start mb-3">
                                <View className={`px-2 py-1 rounded-md bg-white/50 border border-white/60`}>
                                    <Text className={`text-[9px] uppercase tracking-[1.5px] font-black ${item.textAccent}`}>
                                        {item.category}
                                    </Text>
                                </View>
                                <View className="flex-row items-center gap-1">
                                    <Ionicons name="star" size={12} color={C.ink} />
                                    <Text className="text-xs font-black text-ink">{item.rating}</Text>
                                </View>
                            </View>

                            {/* Main Content */}
                            <View className="flex-row items-center justify-between">
                                <View className="flex-1 mr-4">
                                    <Text className="text-2xl font-black text-ink -tracking-[1px] leading-7 mb-1">
                                        {item.title}
                                    </Text>
                                    <Text className="text-xs font-bold text-ink/50 uppercase tracking-widest">
                                        By {item.author}
                                    </Text>
                                </View>

                                {/* Buy Button */}
                                <TouchableOpacity className="bg-ink px-5 py-3 rounded-xl shadow-sm">
                                    <Text className="text-parchment font-black text-xs uppercase tracking-widest">
                                        {item.price}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Footer Stats */}
                            <View className="mt-5 pt-4 border-t border-ink/5 flex-row justify-between items-center">
                                <View className="flex-row items-center gap-1.5">
                                    <Ionicons name="download-outline" size={14} color={C.pine} />
                                    <Text className="text-[10px] font-bold text-pine uppercase tracking-wider">
                                        {item.downloads} Downloads
                                    </Text>
                                </View>
                                <View className="flex-row items-center gap-1">
                                    <Text className="text-[10px] font-bold text-ink/40 uppercase tracking-wider">Details</Text>
                                    <Ionicons name="arrow-forward" size={10} color={C.ink} opacity={0.4} />
                                </View>
                            </View>
                        </View>

                        {/* BACKGROUND DECORATION ICON */}
                        <View className="absolute -right-6 -bottom-6 opacity-[0.05] pointer-events-none">
                            <Ionicons name={item.icon as any} size={160} color={C.ink} />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1">
            {/* ── BACKGROUND ── */}
            <LinearGradient
                colors={[C.lilac, '#F9F6F1', '#F9F6F1', C.lilac]}
                locations={[0, 0.3, 0.7, 1]}
                start={{ x: 0, y: 1 }}
                end={{ x: .7, y: 0 }}
                style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, opacity: 0.6 }}
            />
            <View className="absolute inset-0 bg-parchment -z-10" />

            <SafeAreaView className="flex-1">
                {/* ── HEADER ── */}
                <View className="px-6 pt-6 pb-2">
                    <View className="flex-row justify-between items-end mb-6">
                        <View>
                            <Text className="text-[32px] font-black -tracking-[2px] text-ink leading-9">
                                MARKET
                            </Text>
                        </View>


                    </View>

                    {/* ── SEARCH BAR ── */}
                    <View className="mb-6">
                        <View className="bg-white/40 border border-ink/10 rounded-2xl px-4 py-3.5 flex-row items-center gap-3">
                            <Ionicons name="search" size={20} color={C.pine} />
                            <TextInput
                                placeholder="Search templates..."
                                placeholderTextColor="#4A706E"
                                className="flex-1 font-bold text-ink text-sm"
                            />
                            <Ionicons name="options-outline" size={20} color={C.ink} />
                        </View>
                    </View>

                    {/* ── CATEGORY PILLS ── */}
                    <View className="mb-2">
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={['All', 'Fitness', 'Productivity', 'Mindfulness', 'Career']}
                            keyExtractor={item => item}
                            contentContainerStyle={{ gap: 10, paddingRight: 24 }}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    className={`px-5 py-2 rounded-full border ${index === 0 ? 'bg-ink border-ink' : 'bg-transparent border-ink/20'}`}
                                >
                                    <Text className={`text-[10px] font-black uppercase tracking-widest ${index === 0 ? 'text-parchment' : 'text-ink/60'}`}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>

                <View className="px-6 mb-4">
                    <Rule colorClass="bg-ink opacity-10" />
                </View>

                {/* ── MAIN LIST ── */}
                <FlatList
                    data={MARKET_ITEMS}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                />

            </SafeAreaView>
        </View>
    );
}