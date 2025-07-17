/**
 * @file styles/theme/typography.ts
 * @description טיפוגרפיה וגופנים - Typography and fonts
 * @author GYMoveo Development
 * @version 1.0.1
 *
 * @notes
 * - תמיכה בעברית ואנגלית
 * - גופנים מותאמים לפלטפורמה
 * - סגנונות טקסט מוגדרים מראש
 *
 * @changelog
 * - v1.0.1: Fix structure to match imports
 * - v1.0.0: Initial creation
 */

import { Platform } from "react-native";

// 🔤 Font families - משפחות גופנים
export const fontFamilies = {
  // Primary font family
  primary: Platform.select({
    ios: "System",
    android: "Roboto",
    default: "System",
  }),

  // Secondary font family
  secondary: Platform.select({
    ios: "Avenir",
    android: "sans-serif",
    default: "sans-serif",
  }),

  // Monospace for numbers
  mono: Platform.select({
    ios: "Menlo",
    android: "monospace",
    default: "monospace",
  }),
} as const;

// 📏 Font sizes - גדלי גופן
export const fontSizes = {
  // Tiny sizes
  xxxs: 10,
  xxs: 11,
  xs: 12,

  // Regular sizes
  sm: 14,
  md: 16,
  lg: 18,

  // Large sizes
  xl: 20,
  xxl: 24,
  xxxl: 28,

  // Display sizes
  display: 32,
  displayLarge: 40,
  displayHuge: 48,
} as const;

// 🏋️ Font weights - משקלי גופן
export const fontWeights = {
  thin: "100" as const,
  light: "300" as const,
  regular: "400" as const,
  medium: "500" as const,
  semiBold: "600" as const,
  bold: "700" as const,
  black: "900" as const,
} as const;

// 📐 Line heights - גבהי שורה
export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.7,
  loose: 2,

  // Specific for different sizes
  body: 1.5,
  heading: 1.3,
  display: 1.2,
} as const;

// 📝 Letter spacing - מרווח בין אותיות
export const letterSpacing = {
  tightest: -0.05,
  tight: -0.025,
  normal: 0,
  wide: 0.025,
  wider: 0.05,
  widest: 0.1,
} as const;

// 🎨 Text styles - סגנונות טקסט
export const textStyles = {
  // Display styles
  displayLarge: {
    fontSize: fontSizes.displayHuge,
    fontWeight: fontWeights.black,
    lineHeight: lineHeights.display,
    letterSpacing: letterSpacing.tight,
  },
  displayMedium: {
    fontSize: fontSizes.displayLarge,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.display,
    letterSpacing: letterSpacing.tight,
  },
  displaySmall: {
    fontSize: fontSizes.display,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.display,
    letterSpacing: letterSpacing.normal,
  },

  // Heading styles
  h1: {
    fontSize: fontSizes.xxxl,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.heading,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.heading,
    letterSpacing: letterSpacing.normal,
  },
  h3: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.heading,
    letterSpacing: letterSpacing.normal,
  },
  h4: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.heading,
    letterSpacing: letterSpacing.normal,
  },
  h5: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.heading,
    letterSpacing: letterSpacing.normal,
  },
  h6: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.heading,
    letterSpacing: letterSpacing.wide,
    textTransform: "uppercase" as const,
  },

  // Body styles
  bodyLarge: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.body,
    letterSpacing: letterSpacing.normal,
  },
  bodyMedium: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.body,
    letterSpacing: letterSpacing.normal,
  },
  bodySmall: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.body,
    letterSpacing: letterSpacing.normal,
  },

  // Label styles
  labelLarge: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.wide,
  },
  labelMedium: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.wide,
  },
  labelSmall: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.wider,
    textTransform: "uppercase" as const,
  },

  // Button text
  button: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.wide,
  },

  // Caption text
  caption: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.wide,
  },

  // Numbers
  numberLarge: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.tight,
    fontFamily: fontFamilies.mono,
  },
  numberMedium: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.mono,
  },
  numberSmall: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamilies.mono,
  },
} as const;

// 🌐 RTL support - תמיכה בכיוון מימין לשמאל
export const rtlStyles = {
  textAlign: "right" as const,
  writingDirection: "rtl" as const,
};

// 🎯 Helper functions - פונקציות עזר

// Get font family by language
export const getFontFamily = (
  language: "he" | "en" = "en",
  weight: keyof typeof fontWeights = "regular"
): string => {
  // For now, using primary font for all languages
  // Can be extended to support different fonts per language
  return fontFamilies.primary as string;
};

// Create the main typography object for backward compatibility
export const typography = {
  fontFamily: fontFamilies,
  fontSize: fontSizes,
  fontWeight: fontWeights,
  lineHeight: lineHeights,
  letterSpacing,
  textStyles,
} as const;
