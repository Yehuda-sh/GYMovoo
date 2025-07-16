/**
 * 📁 Path: /styles/theme/spacing.ts
 * 📝 Description: מרווחים ומידות - Spacing and dimensions
 * 🔢 Version: 1.0
 *
 * 🔗 Dependencies: None
 *
 * ⚠️ Based on 8px grid system
 */

// 📏 Base unit - יחידת בסיס
const BASE_UNIT = 8;

// 📐 Spacing scale - סולם מרווחים
export const spacing = {
  // Micro spacing - מרווחים זעירים
  xxxs: BASE_UNIT * 0.25, // 2px
  xxs: BASE_UNIT * 0.5, // 4px
  xs: BASE_UNIT * 1, // 8px

  // Regular spacing - מרווחים רגילים
  sm: BASE_UNIT * 1.5, // 12px
  md: BASE_UNIT * 2, // 16px
  lg: BASE_UNIT * 3, // 24px

  // Large spacing - מרווחים גדולים
  xl: BASE_UNIT * 4, // 32px
  xxl: BASE_UNIT * 5, // 40px
  xxxl: BASE_UNIT * 6, // 48px

  // Huge spacing - מרווחים ענקיים
  huge: BASE_UNIT * 8, // 64px
  giant: BASE_UNIT * 10, // 80px
  massive: BASE_UNIT * 12, // 96px
} as const;

// 📱 Screen dimensions - מידות מסך
export const dimensions = {
  // Screen padding - ריפוד מסך
  screenPadding: {
    horizontal: spacing.md,
    vertical: spacing.lg,
    top: spacing.xl,
    bottom: spacing.xl,
  },

  // Safe area insets - אזורים בטוחים
  safeArea: {
    top: 44, // iPhone notch
    bottom: 34, // iPhone home indicator
  },

  // Component heights - גבהי קומפוננטות
  heights: {
    button: {
      small: 40,
      medium: 48,
      large: 56,
    },
    input: {
      small: 40,
      medium: 48,
      large: 56,
    },
    header: 56,
    tabBar: 60,
    card: {
      small: 120,
      medium: 180,
      large: 240,
    },
  },

  // Component widths - רוחבי קומפוננטות
  widths: {
    button: {
      minimum: 64,
      small: 120,
      medium: 180,
      large: 240,
      full: "100%",
    },
    card: {
      minimum: 280,
      maximum: 400,
    },
    modal: {
      small: 300,
      medium: 400,
      large: 500,
    },
  },

  // Icon sizes - גדלי אייקונים
  icons: {
    tiny: 12,
    small: 16,
    medium: 24,
    large: 32,
    huge: 48,
  },

  // Avatar sizes - גדלי אווטרים
  avatars: {
    small: 32,
    medium: 48,
    large: 64,
    xlarge: 96,
    profile: 120,
  },
} as const;

// 🔲 Layout grid - רשת פריסה
export const grid = {
  columns: 12,
  gutter: spacing.md,
  margin: spacing.lg,

  // Breakpoints - נקודות שבירה
  breakpoints: {
    xs: 0, // Extra small
    sm: 480, // Small
    md: 768, // Medium
    lg: 1024, // Large
    xl: 1280, // Extra large
  },
} as const;

// 📦 Container sizes - גדלי מכולות
export const containers = {
  xs: 320,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  fluid: "100%",
} as const;

// 🎯 Z-index scale - סולם שכבות
export const zIndex = {
  behind: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  header: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  notification: 1700,
  maximum: 9999,
} as const;

// 🏃 Animation distances - מרחקי אנימציה
export const animationDistances = {
  slideShort: spacing.xs,
  slideMedium: spacing.md,
  slideLong: spacing.xl,
  fadeOffset: spacing.sm,
} as const;

// 📏 Helper functions - פונקציות עזר

// יצירת מרווח דינמי - Create dynamic spacing
export const getSpacing = (multiplier: number): number => {
  return BASE_UNIT * multiplier;
};

// יצירת ריפוד - Create padding
export const createPadding = (
  vertical: keyof typeof spacing = "md",
  horizontal: keyof typeof spacing = "md"
) => ({
  paddingVertical: spacing[vertical],
  paddingHorizontal: spacing[horizontal],
});

// יצירת שוליים - Create margin
export const createMargin = (
  vertical: keyof typeof spacing = "md",
  horizontal: keyof typeof spacing = "md"
) => ({
  marginVertical: spacing[vertical],
  marginHorizontal: spacing[horizontal],
});

// בדיקת מסך קטן - Check if small screen
export const isSmallScreen = (width: number): boolean => {
  return width < grid.breakpoints.sm;
};

// קבלת ריפוד מסך מותאם - Get responsive screen padding
export const getScreenPadding = (screenWidth: number) => {
  if (screenWidth < grid.breakpoints.sm) {
    return spacing.sm;
  } else if (screenWidth < grid.breakpoints.md) {
    return spacing.md;
  } else {
    return spacing.lg;
  }
};

// 🎨 Common layouts - פריסות נפוצות
export const commonLayouts = {
  // מרווח בין אלמנטים ברשימה - List item spacing
  listItemSpacing: spacing.sm,

  // מרווח בין כרטיסים - Card spacing
  cardSpacing: spacing.md,

  // מרווח בין סקציות - Section spacing
  sectionSpacing: spacing.xl,

  // ריפוד כפתור - Button padding
  buttonPadding: {
    vertical: spacing.sm,
    horizontal: spacing.lg,
  },

  // ריפוד קלט - Input padding
  inputPadding: {
    vertical: spacing.sm,
    horizontal: spacing.md,
  },

  // ריפוד כרטיס - Card padding
  cardPadding: {
    small: spacing.sm,
    medium: spacing.md,
    large: spacing.lg,
  },
} as const;

// 🔧 Type exports - ייצוא טיפוסים
export type SpacingKeys = keyof typeof spacing;
export type DimensionKeys = keyof typeof dimensions;
export type ZIndexKeys = keyof typeof zIndex;
