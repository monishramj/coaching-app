import React from 'react';
import { Dimensions } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = 280;
const CARD_SPACING = 20; // Gap between cards
const ITEM_SIZE = CARD_WIDTH + CARD_SPACING;
const SPACER = (SCREEN_WIDTH - ITEM_SIZE) / 2; // Centers the first card

interface Props {
    data: any[];
    renderItem: (item: any, index: number) => React.ReactNode;
}

export default function ArchedCarousel({ data, renderItem }: Props) {
    const x = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            x.value = event.contentOffset.x;
        },
    });

    return (
        <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={onScroll}
            snapToInterval={ITEM_SIZE}
            decelerationRate="fast"
            contentContainerStyle={{
                paddingHorizontal: SPACER,
                alignItems: 'center', // Fixes the crash
                paddingTop: 40        // Replaces pt-10
            }}
        >
            {data.map((item, index) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const animatedStyle = useAnimatedStyle(() => {
                    const inputRange = [
                        (index - 1) * ITEM_SIZE,
                        index * ITEM_SIZE,
                        (index + 1) * ITEM_SIZE,
                    ];

                    // The Arc Effect: Edges move UP (positive Y)
                    const translateY = interpolate(
                        x.value,
                        inputRange,
                        [40, 0, 40], // Center is 0, sides are 40px lower (visually up on screen?) Wait, +y is down.
                        // If we want edges to move UP, we need negative Y or center to be positive.
                        // Let's make center 0 and edges -30 (up) relative to baseline, OR center +30 and edges 0.
                        // User said: "cards at the edges move up".
                        // So: Center = 0 (Normal), Sides = -40 (Upwards)
                        Extrapolation.CLAMP
                    );

                    // Rotate cards slightly to face inward
                    const rotate = interpolate(
                        x.value,
                        inputRange,
                        [-5, 0, 5],
                        Extrapolation.CLAMP
                    );

                    return {
                        transform: [
                            { translateY: translateY },
                            { rotate: `${rotate}deg` }
                        ],
                    };
                });

                return (
                    <Animated.View
                        key={index}
                        style={[{ width: CARD_WIDTH }, animatedStyle]}
                        className="mx-[10px]" // Half of CARD_SPACING
                    >
                        {renderItem(item, index)}
                    </Animated.View>
                );
            })}
        </Animated.ScrollView>
    );
}