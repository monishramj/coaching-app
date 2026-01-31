import * as Haptics from 'expo-haptics';
import React from 'react';
import { Dimensions } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    runOnJS,
    SharedValue,
    useAnimatedReaction,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props {
    data: any[];
    renderItem: (item: any, index: number) => React.ReactNode;
    bend?: number;
    cardWidth?: number;
    cardSpacing?: number;
    borderRadius?: number;
}

interface CarouselItemProps {
    item: any;
    index: number;
    scrollX: SharedValue<number>;
    itemSize: number;
    bend: number;
    cardWidth: number;
    cardSpacing: number;
    borderRadius: number;
    renderItem: (item: any, index: number) => React.ReactNode;
}

const CarouselItem = ({
    item,
    index,
    scrollX,
    itemSize,
    bend,
    cardWidth,
    cardSpacing,
    borderRadius,
    renderItem
}: CarouselItemProps) => {

    const animatedStyle = useAnimatedStyle(() => {
        const x = scrollX.value - (index * itemSize);
        const H = SCREEN_WIDTH / 2;

        // 1. Math for the Arc
        // If bend is 0, it's a straight line.
        // If bend is 100, the center is 100px higher/lower than the edges.
        const B_abs = Math.abs(bend);
        const R = (H * H + B_abs * B_abs) / (2 * B_abs);

        // Clamp x to the viewport so we don't calculate imaginary numbers
        const effectiveX = Math.min(Math.abs(x), H);

        // Vertical Displacement (The "Hill" shape)
        const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);

        // Rotation Angle (Tilt along the circle)
        // We use asin to get the exact angle on the circle's circumference
        const angle = Math.asin(effectiveX / R);

        let translateY: number;
        let rotateZ: number;

        // Logic to flip the curve (Hill vs Bowl)
        // A positive bend (90) moves the center UP relative to edges (Hill)
        // A negative bend (-90) moves the center DOWN relative to edges (Bowl)
        if (bend > 0) {
            translateY = arc; // Center stays at 0, edges move DOWN (positive Y)
            rotateZ = -Math.sign(x) * angle;
        } else {
            translateY = -arc; // Center stays at 0, edges move UP (negative Y)
            rotateZ = Math.sign(x) * angle;
        }

        const rotateZDeg = (rotateZ * 180) / Math.PI;

        const scale = interpolate(
            Math.abs(x),
            [0, itemSize, itemSize * 2],
            [1, 0.9, 0.8],
            Extrapolation.CLAMP
        );

        const opacity = interpolate(
            Math.abs(x),
            [0, itemSize, itemSize * 2],
            [1, 0.6, 0.3],
            Extrapolation.CLAMP
        );

        // 2. zIndex Magic
        // This ensures the center card is ALWAYS on top of the side cards.
        // Without this, the right card might draw on top of the center one.
        const zIndex = interpolate(
            Math.abs(x),
            [0, itemSize],
            [10, 0],
            Extrapolation.CLAMP
        );

        return {
            transform: [
                { translateY: translateY },
                { rotateZ: `${rotateZDeg}deg` },
                { scale: scale }
            ],
            opacity: opacity,
            zIndex: Math.round(zIndex), // zIndex must be an integer
        };
    });

    return (
        <Animated.View
            style={[
                {
                    width: cardWidth,
                    borderRadius: borderRadius * cardWidth,
                    overflow: 'hidden',
                    marginHorizontal: cardSpacing / 2,
                    // Remove background color here so opacity affects the whole card
                },
                animatedStyle
            ]}
        >
            {renderItem(item, index)}
        </Animated.View>
    );
};

export default function ArchedCarousel({
    data,
    renderItem,
    // UPDATE: Default bend to 90px to create a visible "Wheel" effect
    bend = 90,
    cardWidth = 230,
    cardSpacing = 20,
    borderRadius = 0.13,
}: Props) {
    const scrollX = useSharedValue(0);
    const ITEM_SIZE = cardWidth + cardSpacing;
    const SPACER = (SCREEN_WIDTH - ITEM_SIZE) / 2;

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    useAnimatedReaction(
        () => Math.round(scrollX.value / ITEM_SIZE),
        (currentIndex, previousIndex) => {
            if (currentIndex !== previousIndex) {
                runOnJS(Haptics.selectionAsync)();
            }
        }
    );

    return (
        <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={onScroll}
            snapToInterval={ITEM_SIZE}
            decelerationRate={.95}
            contentContainerStyle={{
                paddingHorizontal: SPACER,
                alignItems: 'center',
                // Add padding so the cards don't get clipped when they curve down
                paddingVertical: 100
            }}
        >
            {data.map((item, index) => (
                <CarouselItem
                    key={index}
                    item={item}
                    index={index}
                    scrollX={scrollX}
                    itemSize={ITEM_SIZE}
                    bend={bend}
                    cardWidth={cardWidth}
                    cardSpacing={cardSpacing}
                    borderRadius={borderRadius}
                    renderItem={renderItem}
                />
            ))}
        </Animated.ScrollView>
    );
}