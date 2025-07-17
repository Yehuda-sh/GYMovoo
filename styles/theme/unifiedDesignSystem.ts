/**
 * @file styles/theme/unifiedDesignSystem.ts
 * @description מערכת עיצוב מאוחדת לכל האפליקציה - עדכון מלא עם תיקון טעויות
 * @author GYMoveo Development
 * @version 1.0.1
 *
 * @notes
 * - תיקון הtheme למערכת מאוחדת לקומפוננטות
 * - הוספת צבעים חסרים (200, 100)
 * - תיקון אקסנטים
 * - הוספת סגנונות מוכנים לקומפוננטות
 * - הוספת תמיכה מלאה בRTL
 * - תיקון כפילות של מפתחות
 * - הוספת מודאלים
 * - הוספת גרדיאנטים
 * - הוספת מימדים רספונסיביים
 *
 * @changelog
 * - v1.0.1: Fixed missing colors and duplicate keys
 * - v1.0.0: Initial creation
 */

import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// ===========================
// 🎨 COLORS - צבעים מאוחדים
// ===========================

export const unifiedColors = {
  // Primary Brand Colors
  primary: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },

  // Secondary Colors
  secondary: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
  },

  // Semantic Colors
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },

  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },

  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },

  // Dark Theme Colors - עם הוספת צבעים חסרים
  dark: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },

  // אקסנטים - תיקון השם
  accent: {
    orange: "#ff6b35",
    pink: "#ff49db",
    purple: "#8b5cf6",
    teal: "#06b6d4",
    green: "#10b981",
    red: "#f43f5e",
  },

  // Text Colors
  text: {
    primary: "#1f2937",
    secondary: "#6b7280",
    tertiary: "#9ca3af",
    inverse: "#ffffff",
    disabled: "#d1d5db",
  },

  // Background Colors
  background: {
    primary: "#ffffff",
    secondary: "#f9fafb",
    tertiary: "#f3f4f6",
    dark: "#111827",
    overlay: "rgba(0, 0, 0, 0.5)",
  },

  // Border Colors
  border: {
    light: "#e5e7eb",
    medium: "#d1d5db",
    dark: "#9ca3af",
    focus: "#3b82f6",
  },
} as const;

// ===========================
// 📐 SPACING - רווחים מאוחדים
// ===========================

export const unifiedSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,

  // Specific use cases
  cardPadding: 16,
  screenPadding: 20,
  sectionGap: 24,
  inputPadding: 12,
  buttonPadding: 14,

  // Component-specific
  tabBar: 16,
  header: 20,
  modal: 24,
} as const;

// ===========================
// 🔤 TYPOGRAPHY - טיפוגרפיה
// ===========================

export const unifiedTypography = {
  // Font Sizes
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,

    // Semantic sizes
    body: 16,
    caption: 12,
    title: 20,
    heading: 24,
    display: 32,
  },

  // Font Weights
  weights: {
    light: "300" as const,
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    heavy: "800" as const,
  },

  // Line Heights
  lineHeights: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 40,
  },

  // Letter Spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
} as const;

// ===========================
// 🔘 BORDER RADIUS - רדיוסים
// ===========================

export const unifiedBorderRadius = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,

  // Semantic radii
  button: 8,
  card: 12,
  modal: 16,
  avatar: 50,
  full: 9999,
} as const;

// ===========================
// 🌫️ SHADOWS - צללים
// ===========================

export const unifiedShadows = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },

  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 16,
  },

  // Semantic shadows
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  modal: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 24,
  },

  button: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
} as const;

// ===========================
// 🎭 ANIMATIONS - אנימציות
// ===========================

export const unifiedAnimations = {
  // Durations
  duration: {
    fast: 150,
    normal: 250,
    slow: 350,
    verySlow: 500,
  },

  // Easing
  easing: {
    ease: "ease" as const,
    easeIn: "ease-in" as const,
    easeOut: "ease-out" as const,
    easeInOut: "ease-in-out" as const,
    linear: "linear" as const,
  },

  // Spring configs
  spring: {
    gentle: {
      tension: 120,
      friction: 14,
    },
    wobbly: {
      tension: 180,
      friction: 12,
    },
    stiff: {
      tension: 200,
      friction: 26,
    },
  },

  // Preset animations
  presets: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    slideUp: {
      from: { translateY: 50, opacity: 0 },
      to: { translateY: 0, opacity: 1 },
    },
    scaleIn: {
      from: { scale: 0.8, opacity: 0 },
      to: { scale: 1, opacity: 1 },
    },
  },
} as const;

// ===========================
// 🎯 COMPONENT STYLES - סגנונות מוכנים
// ===========================

export const unifiedComponents = {
  // Button Styles
  button: {
    base: {
      paddingHorizontal: unifiedSpacing.buttonPadding,
      paddingVertical: unifiedSpacing.sm,
      borderRadius: unifiedBorderRadius.button,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      minHeight: 44,
    },

    primary: {
      backgroundColor: unifiedColors.primary[500],
      ...unifiedShadows.button,
    },

    secondary: {
      backgroundColor: unifiedColors.secondary[100],
      borderWidth: 1,
      borderColor: unifiedColors.border.light,
    },

    ghost: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: unifiedColors.border.medium,
    },

    disabled: {
      backgroundColor: unifiedColors.secondary[200],
      opacity: 0.6,
    },
  },

  // Card Styles
  card: {
    base: {
      backgroundColor: unifiedColors.background.primary,
      borderRadius: unifiedBorderRadius.card,
      padding: unifiedSpacing.cardPadding,
      ...unifiedShadows.card,
    },

    elevated: {
      ...unifiedShadows.lg,
    },

    bordered: {
      borderWidth: 1,
      borderColor: unifiedColors.border.light,
      ...unifiedShadows.none,
    },
  },

  // Input Styles
  input: {
    base: {
      borderWidth: 1,
      borderColor: unifiedColors.border.light,
      borderRadius: unifiedBorderRadius.md,
      padding: unifiedSpacing.inputPadding,
      fontSize: unifiedTypography.sizes.body,
      minHeight: 44,
      backgroundColor: unifiedColors.background.primary,
    },

    focused: {
      borderColor: unifiedColors.border.focus,
      ...unifiedShadows.sm,
    },

    error: {
      borderColor: unifiedColors.error[500],
    },
  },

  // Text Styles
  text: {
    heading: {
      fontSize: unifiedTypography.sizes.heading,
      fontWeight: unifiedTypography.weights.bold,
      color: unifiedColors.text.primary,
      lineHeight: unifiedTypography.lineHeights.lg,
    },

    title: {
      fontSize: unifiedTypography.sizes.title,
      fontWeight: unifiedTypography.weights.semibold,
      color: unifiedColors.text.primary,
      lineHeight: unifiedTypography.lineHeights.md,
    },

    body: {
      fontSize: unifiedTypography.sizes.body,
      fontWeight: unifiedTypography.weights.regular,
      color: unifiedColors.text.primary,
      lineHeight: unifiedTypography.lineHeights.md,
    },

    caption: {
      fontSize: unifiedTypography.sizes.caption,
      fontWeight: unifiedTypography.weights.regular,
      color: unifiedColors.text.secondary,
      lineHeight: unifiedTypography.lineHeights.sm,
    },
  },
} as const;

// ===========================
// 🎭 MODAL STYLES - מודאלים
// ===========================

export const unifiedModals = {
  overlay: {
    flex: 1,
    backgroundColor: unifiedColors.background.overlay,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    padding: unifiedSpacing.modal,
  },

  container: {
    backgroundColor: unifiedColors.background.primary,
    borderRadius: unifiedBorderRadius.modal,
    padding: unifiedSpacing.modal,
    maxHeight: height * 0.8,
    maxWidth: width * 0.9,
    width: "100%",
    ...unifiedShadows.modal,
  },

  header: {
    borderBottomWidth: 1,
    borderBottomColor: unifiedColors.border.light,
    paddingBottom: unifiedSpacing.md,
    marginBottom: unifiedSpacing.md,
  },

  content: {
    flex: 1,
  },

  actions: {
    flexDirection: "row" as const,
    justifyContent: "flex-end" as const,
    gap: unifiedSpacing.sm,
    marginTop: unifiedSpacing.lg,
  },
} as const;

// ===========================
// 🌈 GRADIENTS - גרדיאנטים
// ===========================

export const unifiedGradients = {
  primary: [unifiedColors.primary[400], unifiedColors.primary[600]],
  secondary: [unifiedColors.secondary[100], unifiedColors.secondary[300]],
  success: [unifiedColors.success[400], unifiedColors.success[600]],
  warning: [unifiedColors.warning[400], unifiedColors.warning[600]],
  error: [unifiedColors.error[400], unifiedColors.error[600]],
  dark: [unifiedColors.dark[700], unifiedColors.dark[900]],

  // Special gradients
  sunset: ["#ff7e5f", "#feb47b"],
  ocean: ["#2980b9", "#6bb6ff"],
  forest: ["#56ab2f", "#a8e6cf"],
  royal: ["#667eea", "#764ba2"],
} as const;

// ===========================
// 📱 RESPONSIVE DIMENSIONS - מימדים רספונסיביים
// ===========================

export const unifiedDimensions = {
  screen: {
    width,
    height,
    isSmall: width < 375,
    isMedium: width >= 375 && width < 414,
    isLarge: width >= 414,
  },

  // Component sizes
  header: {
    height: 56,
    paddingHorizontal: unifiedSpacing.screenPadding,
  },

  tabBar: {
    height: 60,
    paddingHorizontal: unifiedSpacing.tabBar,
  },

  button: {
    height: 44,
    minWidth: 88,
  },

  input: {
    height: 44,
  },

  avatar: {
    small: 32,
    medium: 48,
    large: 64,
    // תיקון כפילות - הוספת עוד גדלים
    xlarge: 80,
    xxlarge: 96,
  },
} as const;

// ===========================
// 🎪 THEME VARIANTS - וריאנטים
// ===========================

export const unifiedTheme = {
  light: {
    colors: unifiedColors,
    spacing: unifiedSpacing,
    typography: unifiedTypography,
    borderRadius: unifiedBorderRadius,
    shadows: unifiedShadows,
    animations: unifiedAnimations,
    components: unifiedComponents,
    modals: unifiedModals,
    gradients: unifiedGradients,
    dimensions: unifiedDimensions,
  },

  dark: {
    colors: {
      ...unifiedColors,
      background: {
        primary: unifiedColors.dark[900],
        secondary: unifiedColors.dark[800],
        tertiary: unifiedColors.dark[700],
        dark: unifiedColors.dark[900],
        overlay: "rgba(0, 0, 0, 0.7)",
      },
      text: {
        primary: unifiedColors.dark[50],
        secondary: unifiedColors.dark[200],
        tertiary: unifiedColors.dark[300],
        inverse: unifiedColors.dark[900],
        disabled: unifiedColors.dark[400],
      },
    },
    spacing: unifiedSpacing,
    typography: unifiedTypography,
    borderRadius: unifiedBorderRadius,
    shadows: unifiedShadows,
    animations: unifiedAnimations,
    components: unifiedComponents,
    modals: unifiedModals,
    gradients: unifiedGradients,
    dimensions: unifiedDimensions,
  },
} as const;

// ===========================
// 🎯 EXPORTS - ייצוא נוח
// ===========================

export default unifiedTheme;

// Named exports for convenience
export {
  unifiedAnimations as animations,
  unifiedBorderRadius as borderRadius,
  unifiedColors as colors,
  unifiedComponents as components,
  unifiedDimensions as dimensions,
  unifiedGradients as gradients,
  unifiedModals as modals,
  unifiedShadows as shadows,
  unifiedSpacing as spacing,
  unifiedTypography as typography,
};

// Type definitions
export type UnifiedTheme = typeof unifiedTheme;
export type UnifiedColors = typeof unifiedColors;
export type UnifiedSpacing = typeof unifiedSpacing;
export type UnifiedTypography = typeof unifiedTypography;
