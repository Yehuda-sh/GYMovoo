/**
 * @file styles/theme/spacing.ts
 * @description רווחים, מרחקים ומימדים - Spacing, dimensions and layout
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @notes
 * - מערכת רווחים עקבית
 * - מימדים סטנדרטיים לקומפוננטות
 * - גריד ופריסה
 *
 * @changelog
 * - v1.0.0: Initial creation with comprehensive spacing system
 */

import { Dimensions } from "react-native";

// מימדי המסך
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// ===== 📏 רווחים בסיסיים =====
export const spacing = {
  none: 0,
  xxxs: 2,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 48,
  massive: 64,
} as const;

// ===== 📐 מימדים =====
export const dimensions = {
  // גבהים סטנדרטיים
  height: {
    tiny: 24,
    small: 32,
    medium: 44,
    large: 56,
    huge: 72,
    massive: 96,
  },

  // רוחבים סטנדרטיים
  width: {
    tiny: 24,
    small: 48,
    medium: 96,
    large: 144,
    huge: 192,
    full: "100%" as const,
  },

  // כפתורים
  button: {
    height: {
      small: 36,
      medium: 44,
      large: 52,
    },
    minWidth: {
      small: 64,
      medium: 96,
      large: 128,
    },
  },

  // אייקונים
  icon: {
    tiny: 16,
    small: 20,
    medium: 24,
    large: 32,
    huge: 48,
  },

  // אווטרים
  avatar: {
    small: 32,
    medium: 48,
    large: 64,
    huge: 96,
  },

  // קלטים
  input: {
    height: {
      small: 36,
      medium: 44,
      large: 52,
    },
  },

  // מסך
  screen: {
    width: screenWidth,
    height: screenHeight,
  },
} as const;

// ===== 🏗️ גריד ופריסה =====
export const grid = {
  // מספר עמודות
  columns: 12,

  // רוחב עמודה
  columnWidth: screenWidth / 12,

  // מרווח בין עמודות
  gutter: {
    small: spacing.xs,
    medium: spacing.md,
    large: spacing.lg,
  },

  // breakpoints
  breakpoints: {
    small: 360,
    medium: 768,
    large: 1024,
    xlarge: 1440,
  },
} as const;

// ===== 📦 קונטיינרים =====
export const containers = {
  // padding פנימי
  padding: {
    small: spacing.sm,
    medium: spacing.md,
    large: spacing.lg,
    screen: spacing.xl,
  },

  // רוחב מקסימלי
  maxWidth: {
    small: 320,
    medium: 768,
    large: 1024,
    full: "100%" as const,
  },

  // מרווחים בין אלמנטים
  gap: {
    tiny: spacing.xxs,
    small: spacing.xs,
    medium: spacing.sm,
    large: spacing.md,
    huge: spacing.lg,
  },
} as const;

// ===== 📍 מיקומים =====
export const positions = {
  // עבור position absolute
  absolute: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    center: "50%" as const,
  },

  // offsets נפוצים
  offset: {
    small: spacing.xs,
    medium: spacing.md,
    large: spacing.xl,
  },
} as const;

// ===== 📊 סדר שכבות (z-index) =====
export const zIndex = {
  behind: -1,
  base: 0,
  content: 1,
  elevated: 10,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
  toast: 800,
  alert: 900,
  maximum: 999,
} as const;

// ===== 🔧 פונקציות עזר =====

/**
 * חישוב רווח רספונסיבי
 */
export const responsiveSpacing = (
  small: number,
  medium: number,
  large: number
): number => {
  if (screenWidth < grid.breakpoints.medium) return small;
  if (screenWidth < grid.breakpoints.large) return medium;
  return large;
};

/**
 * יצירת מרווח אחיד
 */
export const createPadding = (
  vertical: keyof typeof spacing,
  horizontal: keyof typeof spacing
) => ({
  paddingVertical: spacing[vertical],
  paddingHorizontal: spacing[horizontal],
});

/**
 * יצירת מרווח חיצוני
 */
export const createMargin = (
  vertical: keyof typeof spacing,
  horizontal: keyof typeof spacing
) => ({
  marginVertical: spacing[vertical],
  marginHorizontal: spacing[horizontal],
});

/**
 * מרווח לפי כיוון
 */
export const directionalSpacing = (
  top: keyof typeof spacing,
  right: keyof typeof spacing,
  bottom: keyof typeof spacing,
  left: keyof typeof spacing
) => ({
  marginTop: spacing[top],
  marginRight: spacing[right],
  marginBottom: spacing[bottom],
  marginLeft: spacing[left],
});

// ===== 📱 מימדים דינמיים =====
export const dynamicDimensions = {
  // אחוזים מגובה המסך
  vh: (percent: number) => (screenHeight * percent) / 100,

  // אחוזים מרוחב המסך
  vw: (percent: number) => (screenWidth * percent) / 100,

  // המימד הקטן יותר
  vmin: (percent: number) =>
    (Math.min(screenWidth, screenHeight) * percent) / 100,

  // המימד הגדול יותר
  vmax: (percent: number) =>
    (Math.max(screenWidth, screenHeight) * percent) / 100,
};

// ===== 🎯 ייצוא נוחות =====
export const layout = {
  spacing,
  dimensions,
  grid,
  containers,
  positions,
  zIndex,
  helpers: {
    responsiveSpacing,
    createPadding,
    createMargin,
    directionalSpacing,
  },
  dynamic: dynamicDimensions,
};
