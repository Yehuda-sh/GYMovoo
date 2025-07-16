/**
 * 📁 Path: /styles/theme/typography.ts
 * 📝 Description: טיפוגרפיה וגופנים - Typography and fonts
 * 🔢 Version: 1.0
 *
 * 🔗 Dependencies: None
 *
 * ⚠️ Supports both Hebrew and English fonts
 */

import { Platform } from "react-native";

// 🔤 Font families - משפחות גופנים
export const fontFamilies = {
  // English fonts - גופנים באנגלית
  english: {
    regular: Platform.select({
      ios: "System",
      android: "Roboto",
      default: "System",
    }),
    medium: Platform.select({
      ios: "System",
      android: "Roboto-Medium",
      default: "System",
    }),
    semiBold: Platform.select({
      ios: "System",
      android: "Roboto-Medium",
      default: "System",
    }),
    bold: Platform.select({
      ios: "System",
      android: "Roboto-Bold",
      default: "System",
    }),
    black: Platform.select({
      ios: "System",
      android: "Roboto-Black",
      default: "System",
    }),
  },

  // Hebrew fonts - גופנים בעברית
  hebrew: {
    regular: Platform.select({
      ios: "System",
      android: "Roboto",
      default: "System",
    }),
    medium: Platform.select({
      ios: "System",
      android: "Roboto-Medium",
      default: "System",
    }),
    semiBold: Platform.select({
      ios: "System",
      android: "Roboto-Medium",
      default: "System",
    }),
    bold: Platform.select({
      ios: "System",
      android: "Roboto-Bold",
      default: "System",
    }),
    black: Platform.select({
      ios: "System",
      android: "Roboto-Black",
      default: "System",
    }),
  },

  // Monospace for numbers - גופן מונוספייס למספרים
  mono: Platform.select({
    ios: "Menlo",
    android: "monospace",
    default: "monospace",
  }),
} as const;

// 📏 Font sizes - גדלי גופן
export const fontSizes = {
  // Tiny sizes - גדלים זעירים
  xxxs: 10,
  xxs: 11,
  xs: 12,

  // Regular sizes - גדלים רגילים
  sm: 14,
  md: 16,
  lg: 18,

  // Large sizes - גדלים גדולים
  xl: 20,
  xxl: 24,
  xxxl: 28,

  // Display sizes - גדלי תצוגה
  display: {
    small: 32,
    medium: 40,
    large: 48,
    huge: 56,
  },
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

  // Specific for different sizes - ספציפי לגדלים שונים
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
  // Display styles - סגנונות תצוגה
  displayLarge: {
    fontSize: fontSizes.display.large,
    fontWeight: fontWeights.black,
    lineHeight: lineHeights.display,
    letterSpacing: letterSpacing.tight,
  },
  displayMedium: {
    fontSize: fontSizes.display.medium,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.display,
    letterSpacing: letterSpacing.tight,
  },
  displaySmall: {
    fontSize: fontSizes.display.small,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.display,
    letterSpacing: letterSpacing.normal,
  },

  // Heading styles - סגנונות כותרות
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

  // Body styles - סגנונות גוף
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

  // Label styles - סגנונות תוויות
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

  // Button text - טקסט כפתורים
  button: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.wide,
  },

  // Caption text - טקסט כיתוב
  caption: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.wide,
  },

  // Numbers - מספרים
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

// Get font family by language - קבלת גופן לפי שפה
export const getFontFamily = (
  language: "he" | "en" = "en",
  weight: keyof typeof fontWeights = "regular"
): string => {
  const fontFamily =
    language === "he" ? fontFamilies.hebrew : fontFamilies.english;

  switch (weight) {
    case "regular":
    case "thin":
    case "light":
      return fontFamily.regular;
    case "medium":
      return fontFamily.medium;
    case "semiBold":
      return fontFamily.semiBold;
    case "bold":
      return fontFamily.bold;
    case "black":
      return fontFamily.black;
    default:
      return fontFamily.regular;
  }
};

// Create text style - יצירת סגנון טקסט
export const createTextStyle = (
  size: Exclude<keyof typeof fontSizes, "display"> = "md",
  weight: keyof typeof fontWeights = "regular",
  color: string = "#ffffff"
) => ({
  fontSize: fontSizes[size],
  fontWeight: fontWeights[weight],
  color,
  lineHeight: fontSizes[size] * lineHeights.normal,
});

// Scale font size - שינוי גודל גופן
export const scaleFontSize = (size: number, scale: number = 1): number => {
  return Math.round(size * scale);
};

// 📱 Responsive font sizes - גדלי גופן רספונסיביים
export const getResponsiveFontSize = (
  baseSize: Exclude<keyof typeof fontSizes, "display">,
  screenWidth: number
): number => {
  const base = fontSizes[baseSize];

  if (screenWidth < 350) {
    return scaleFontSize(base, 0.9);
  } else if (screenWidth > 400) {
    return scaleFontSize(base, 1.1);
  }

  return base;
};

// 🔧 Type exports - ייצוא טיפוסים
export type FontSizeKeys = keyof typeof fontSizes;
export type SimpleFontSizeKeys = Exclude<FontSizeKeys, "display">;
export type FontWeightKeys = keyof typeof fontWeights;
export type TextStyleKeys = keyof typeof textStyles;
