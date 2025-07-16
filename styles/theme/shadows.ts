/**
 * 📁 Path: /styles/theme/shadows.ts
 * 📝 Description: צללים ואפקטי עומק - Shadows and depth effects
 * 🔢 Version: 1.1
 *
 * 🔗 Dependencies:
 * - react-native
 *
 * ⚠️ Platform-specific shadow implementations with unified interface
 */

import { Platform, ViewStyle } from "react-native";

// 🌑 Shadow type - טיפוס צל אחיד
type ShadowStyle = ViewStyle;

// 🌑 Shadow levels - רמות צללים
const shadowLevels = {
  none: {
    ios: {
      shadowColor: "transparent",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
    },
    android: {
      elevation: 0,
    },
  },

  xs: {
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
    },
    android: {
      elevation: 1,
    },
  },

  sm: {
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
    },
    android: {
      elevation: 2,
    },
  },

  md: {
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    android: {
      elevation: 4,
    },
  },

  lg: {
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 5.46,
    },
    android: {
      elevation: 6,
    },
  },

  xl: {
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.35,
      shadowRadius: 7.49,
    },
    android: {
      elevation: 8,
    },
  },

  xxl: {
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.4,
      shadowRadius: 10.0,
    },
    android: {
      elevation: 10,
    },
  },
} as const;

// 🎨 Colored shadows - צללים צבעוניים
const coloredShadows = {
  // Purple glow - זוהר סגול
  purple: {
    ios: {
      shadowColor: "#667eea",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
      // Android doesn't support colored shadows natively
    },
  },

  // Green glow - זוהר ירוק
  green: {
    ios: {
      shadowColor: "#00ff88",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
    },
  },

  // Red glow (error) - זוהר אדום (שגיאה)
  red: {
    ios: {
      shadowColor: "#ff4757",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
    },
  },

  // Blue glow - זוהר כחול
  blue: {
    ios: {
      shadowColor: "#54a0ff",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
    },
  },
} as const;

// 🛠️ Helper function to get platform shadow - פונקציה לקבלת צל לפי פלטפורמה
const getPlatformShadow = (level: keyof typeof shadowLevels): ShadowStyle => {
  const shadowDef = shadowLevels[level];
  return Platform.OS === "ios" ? shadowDef.ios : shadowDef.android;
};

// 🌗 Platform-specific shadows - צללים לפי פלטפורמה
export const shadows: Record<keyof typeof shadowLevels, ShadowStyle> = {
  none: getPlatformShadow("none"),
  xs: getPlatformShadow("xs"),
  sm: getPlatformShadow("sm"),
  md: getPlatformShadow("md"),
  lg: getPlatformShadow("lg"),
  xl: getPlatformShadow("xl"),
  xxl: getPlatformShadow("xxl"),
} as const;

// 🎨 Get colored shadow - קבלת צל צבעוני
export const getColoredShadow = (
  color: keyof typeof coloredShadows
): ShadowStyle => {
  const colorDef = coloredShadows[color];
  return Platform.OS === "ios" ? colorDef.ios : colorDef.android;
};

// 📦 Component-specific shadows - צללים לקומפוננטות
export const componentShadows = {
  // Cards - כרטיסים
  card: {
    default: shadows.sm,
    hover: shadows.md,
    pressed: shadows.xs,
  },

  // Buttons - כפתורים
  button: {
    default: shadows.sm,
    hover: shadows.md,
    pressed: shadows.none,
    floating: shadows.lg,
  },

  // Modals - מודלים
  modal: {
    backdrop: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    container: shadows.xxl,
  },

  // Navigation - ניווט
  navigation: {
    header: shadows.sm,
    tabBar: shadows.md,
  },

  // Tooltips - טיפים
  tooltip: shadows.md,

  // Floating elements - אלמנטים צפים
  floating: {
    low: shadows.md,
    medium: shadows.lg,
    high: shadows.xl,
  },
} as const;

// 🌟 Special effects - אפקטים מיוחדים
export const specialEffects = {
  // Neumorphism (soft UI) - נאומורפיזם
  neumorphism: {
    light:
      Platform.OS === "ios"
        ? {
            shadowColor: "#000",
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
          }
        : {
            elevation: 3,
          },
    dark:
      Platform.OS === "ios"
        ? {
            shadowColor: "#fff",
            shadowOffset: { width: -4, height: -4 },
            shadowOpacity: 0.05,
            shadowRadius: 6,
          }
        : {
            elevation: 3,
          },
  },

  // Inner shadow (inset) - צל פנימי
  innerShadow: {
    // Note: React Native doesn't support inner shadows natively
    // This is a workaround using borders
    light: {
      borderWidth: 1,
      borderColor: "rgba(0, 0, 0, 0.1)",
      borderTopColor: "rgba(0, 0, 0, 0.15)",
      borderLeftColor: "rgba(0, 0, 0, 0.15)",
    },
    dark: {
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.05)",
      borderBottomColor: "rgba(255, 255, 255, 0.1)",
      borderRightColor: "rgba(255, 255, 255, 0.1)",
    },
  },

  // Glow effect - אפקט זוהר
  glow: {
    purple:
      Platform.OS === "ios"
        ? {
            shadowColor: "#667eea",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 10,
          }
        : {
            elevation: 0, // Use border for glow on Android
            borderWidth: 1,
            borderColor: "rgba(102, 126, 234, 0.3)",
          },
    green:
      Platform.OS === "ios"
        ? {
            shadowColor: "#00ff88",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 10,
          }
        : {
            elevation: 0,
            borderWidth: 1,
            borderColor: "rgba(0, 255, 136, 0.3)",
          },
  },
} as const;

// 🛠️ Helper functions - פונקציות עזר

// Create custom shadow - יצירת צל מותאם
export const createShadow = (
  color: string,
  offsetX: number,
  offsetY: number,
  opacity: number,
  radius: number,
  elevation: number = 4
): ShadowStyle => {
  return Platform.OS === "ios"
    ? {
        shadowColor: color,
        shadowOffset: { width: offsetX, height: offsetY },
        shadowOpacity: opacity,
        shadowRadius: radius,
      }
    : {
        elevation: elevation,
      };
};

// Create depth effect - יצירת אפקט עומק
export const createDepth = (level: number): ShadowStyle => {
  const clampedLevel = Math.max(0, Math.min(10, level));

  return Platform.OS === "ios"
    ? {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: clampedLevel },
        shadowOpacity: 0.15 + clampedLevel * 0.03,
        shadowRadius: clampedLevel * 1.5,
      }
    : {
        elevation: clampedLevel,
      };
};

// Animate shadow - הנפשת צל
export const animateShadow = (
  from: keyof typeof shadows,
  to: keyof typeof shadows
) => {
  // This returns the shadow values for animation libraries
  return {
    from: shadows[from],
    to: shadows[to],
  };
};

// 🎯 Common shadow combinations - שילובי צללים נפוצים
export const shadowCombos = {
  // Floating action button - כפתור פעולה צף
  fab: {
    ...shadows.lg,
    ...getColoredShadow("purple"),
  },

  // Active card - כרטיס פעיל
  activeCard: {
    ...shadows.md,
    ...specialEffects.glow.purple,
  },

  // Error input - שדה קלט עם שגיאה
  errorInput: {
    ...shadows.sm,
    ...getColoredShadow("red"),
  },

  // Success button - כפתור הצלחה
  successButton: {
    ...shadows.md,
    ...getColoredShadow("green"),
  },
} as const;

// 🔧 Type exports - ייצוא טיפוסים
export type ShadowKeys = keyof typeof shadows;
export type ColoredShadowKeys = keyof typeof coloredShadows;
export type SpecialEffectKeys = keyof typeof specialEffects;
