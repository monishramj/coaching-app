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
    initialIndex?: number;
}

interface CarouselItemProps {
    item: any;
    index: number;
    scrollX: SharedValue<number>;
    itemSize: number;
    bend: number;
    cardWidth: number;
    cardSpacing: number;
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
    renderItem
}: CarouselItemProps) => {

    const animatedStyle = useAnimatedStyle(() => {
        const x = scrollX.value - (index * itemSize);
        const H = SCREEN_WIDTH / 2;

        const B_abs = Math.max(0.1, Math.abs(bend));
        const R = (H * H + B_abs * B_abs) / (2 * B_abs);

        const effectiveX = Math.min(Math.abs(x), H, R - 0.01);

        const sqrtVal = R * R - effectiveX * effectiveX;
        const arc = R - Math.sqrt(Math.max(0, sqrtVal));
        const angle = Math.asin(effectiveX / R);

        let translateY: number;
        let rotateZ: number;

        if (bend > 0) {
            translateY = arc;
            rotateZ = -Math.sign(x) * angle;
        } else {
            translateY = -arc;
            rotateZ = Math.sign(x) * angle;
        }

        // Stabilize rotation by rounding to 2 decimal places to prevent micro-twitches
        const rotateZDeg = Math.round(((rotateZ * 180) / Math.PI) * 100) / 100;

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

        const zIndex = interpolate(
            Math.abs(x),
            [0, itemSize],
            [10, 1],
            Extrapolation.CLAMP
        );

        return {
            transform: [
                { translateY: translateY },
                { rotateZ: `${rotateZDeg}deg` },
                { scale: scale }
            ],
            opacity: opacity,
            zIndex: Math.floor(zIndex), // Floor is usually more stable than round for z-stacking
        };
    });

    return (
        <Animated.View
            style={[
                {
                    width: cardWidth,
                    overflow: 'visible', // Changed to visible so shadows/children aren't clipped
                    marginHorizontal: cardSpacing / 2,
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
    bend = 90,
    cardWidth = 230,
    cardSpacing = 20,
    initialIndex = 0
}: Props) {
    const ITEM_SIZE = cardWidth + cardSpacing;
    const SPACER = (SCREEN_WIDTH - ITEM_SIZE) / 2;

    const scrollX = useSharedValue(initialIndex * ITEM_SIZE);

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
            decelerationRate={0.95}
            contentOffset={{ x: initialIndex * ITEM_SIZE, y: 0 }}
            contentContainerStyle={{
                paddingHorizontal: SPACER,
                alignItems: 'center',
                paddingBottom: 25
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
                    renderItem={renderItem}
                />
            ))}
        </Animated.ScrollView>
    );
}