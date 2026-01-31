import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MarketplaceScreen() {
    return (
        <SafeAreaView className="flex-1 bg-background justify-center items-center">
            <Text className="text-text text-2xl font-bold">Marketplace</Text>
            <Text className="text-secondary mt-2">Templates coming soon...</Text>
        </SafeAreaView>
    );
}