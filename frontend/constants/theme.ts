/*
 * note from monish:
 * although we are technically using nativewind, some react components
 * use react's default theming. !! KEEP THIS !!
 */

import { Platform } from 'react-native';

const tintColorLight = '#7869B0'; // Deep Lilac
const tintColorDark = '#7869B0';  // Deep Lilac

export const Colors = {
  light: {
    text: '#020912',       // Ink Black
    background: '#F9F6F1', // Parchment
    tint: tintColorLight,
    icon: '#4A706E',       // Pine Blue (Good for neutral icons)
    tabIconDefault: '#4A706E',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#F9F6F1',       // Parchment
    background: '#020912', // Ink Black
    tint: tintColorDark,
    icon: '#4A706E',       // Pine Blue
    tabIconDefault: '#4A706E',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
