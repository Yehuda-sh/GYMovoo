/**
 * @file styles/theme/shadows.ts
 * @description צללים ואפקטי עומק - Shadows and depth effects
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @notes
 * - צללים תואמי פלטפורמה (iOS/Android)
 * - אפקטי זוהר וצבע
 * - פונקציות עזר ליצירת צללים דינמיים
 *
 * @changelog
 * - v1.0.0: Initial creation with platform support
 */

import { Platform, ViewStyle } from "react-native";
import { colors } from "./colors";

// טיפוס צל
type ShadowStyle = ViewStyle;

// ===== 🌑 צללים בסיסיים =====
export const shadows = {
  none: Platform.select({
    ios: {
      shadowColor: "transparent",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
    },
    android: {
      elevation: 0,
    },
  }) as ShadowStyle,

  xs: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: {
      elevation: 1,
    },
  }) as ShadowStyle,

  sm: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 3,
    },
  }) as ShadowStyle,

  md: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: {
      elevation: 6,
    },
  }) as ShadowStyle,

  lg: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
    },
    android: {
      elevation: 12,
    },
  }) as ShadowStyle,

  xl: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.25,
      shadowRadius: 24,
    },
    android: {
      elevation: 16,
    },
  }) as ShadowStyle,

  xxl: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.3,
      shadowRadius: 32,
    },
    android: {
      elevation: 24,
    },
  }) as ShadowStyle,
} as const;

// ===== 🎨 צללים צבעוניים =====
export const coloredShadows = {
  primary: Platform.select({
    ios: {
      shadowColor: colors.primary[600],
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
  }) as ShadowStyle,

  secondary: Platform.select({
    ios: {
      shadowColor: colors.secondary[500],
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
  }) as ShadowStyle,

  success: Platform.select({
    ios: {
      shadowColor: colors.status.success,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
  }) as ShadowStyle,

  error: Platform.select({
    ios: {
      shadowColor: colors.status.error,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
  }) as ShadowStyle,
} as const;

// ===== ✨ אפקטים מיוחדים =====
export const specialEffects = {
  // אפקט זוהר
  glow: {
    primary: {
      ...coloredShadows.primary,
      ...(Platform.OS === "ios" && {
        shadowRadius: 20,
        shadowOpacity: 0.4,
      }),
    } as ShadowStyle,

    secondary: {
      ...coloredShadows.secondary,
      ...(Platform.OS === "ios" && {
        shadowRadius: 20,
        shadowOpacity: 0.4,
      }),
    } as ShadowStyle,
  },

  // אפקט ניאומורפי
  neumorphism: {
    light: Platform.select({
      ios: {
        shadowColor: "#FFFFFF",
        shadowOffset: { width: -4, height: -4 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
      },
      android: {
        elevation: 0,
      },
    }) as ShadowStyle,

    dark: Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }) as ShadowStyle,
  },

  // אפקט כרטיס מרחף
  floating: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
    },
    android: {
      elevation: 20,
    },
  }) as ShadowStyle,

  // אפקט עומק
  depth: {
    shallow: shadows.sm,
    medium: shadows.md,
    deep: shadows.lg,
  },

  // אפקט נייר
  paper: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      backgroundColor: "#FFFFFF",
    },
    android: {
      elevation: 4,
      backgroundColor: "#FFFFFF",
    },
  }) as ShadowStyle,
} as const;

// ===== 🎯 צללים לקומפוננטות =====
export const componentShadows = {
  // כפתורים
  button: {
    default: shadows.sm,
    pressed: shadows.none,
    elevated: shadows.md,
    floating: shadows.lg,
  },

  // כרטיסים
  card: {
    default: shadows.md,
    hover: shadows.lg,
    active: coloredShadows.primary,
  },

  // מודאלים
  modal: {
    backdrop: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    } as ViewStyle,
    content: shadows.xl,
  },

  // Navigation
  header: shadows.sm,
  tabBar: {
    ...shadows.md,
    ...(Platform.OS === "ios" && {
      shadowOffset: { width: 0, height: -4 },
    }),
  } as ShadowStyle,

  // קלטים
  input: {
    default: shadows.xs,
    focused: coloredShadows.primary,
    error: coloredShadows.error,
  },
} as const;

// ===== 🔧 פונקציות עזר =====

/**
 * יצירת צל מותאם אישית
 */
export const createShadow = (
  color: string,
  offsetX: number = 0,
  offsetY: number = 4,
  opacity: number = 0.2,
  radius: number = 8,
  elevation: number = 8
): ShadowStyle => {
  return Platform.select({
    ios: {
      shadowColor: color,
      shadowOffset: { width: offsetX, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    android: {
      elevation: elevation,
    },
  }) as ShadowStyle;
};

/**
 * שילוב מספר צללים
 */
export const combineShadows = (...shadows: ShadowStyle[]): ShadowStyle => {
  return shadows.reduce((acc, shadow) => ({ ...acc, ...shadow }), {});
};

/**
 * אנימציית צל
 */
export const animateShadow = (
  from: keyof typeof shadows,
  to: keyof typeof shadows
) => {
  return {
    from: shadows[from],
    to: shadows[to],
  };
};
