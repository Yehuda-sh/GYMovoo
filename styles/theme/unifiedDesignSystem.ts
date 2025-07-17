/**
 * @file styles/theme/unifiedDesignSystem.ts
 * @description מערכת העיצוב המאוחדת של האפליקציה
 * @author GYMoveo Development
 * @version 1.1.0
 *
 * @notes
 * - מאגד את כל הערכים מקבצי הtheme
 * - מספק ממשק אחיד לכל האפליקציה
 * - כולל סגנונות מוכנים לקומפוננטות
 * - תוקן מבנה הטיפוגרפיה
 *
 * @changelog
 * - v1.1.0: Fixed typography structure and added missing properties
 * - v1.0.0: Initial creation
 */

// ייבוא כל המודולים
import {
  animationPresets,
  durations,
  easings,
  screenTransitions,
} from "./animation";
import { borderRadius, shapes } from "./borderRadius";
import { colors } from "./colors";
import { shadows, specialEffects } from "./shadows";
import { containers, dimensions, grid, spacing, zIndex } from "./spacing";
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacing,
  lineHeights,
  textStyles,
} from "./typography";

// ===== 🎨 מערכת הצבעים המאוחדת =====
export const unifiedColors = {
  // צבעים ראשיים
  primary: colors.primary[600],
  primaryDark: colors.primary[800],
  primaryLight: colors.primary[400],

  secondary: colors.secondary[500],
  secondaryDark: colors.secondary[700],
  secondaryLight: colors.secondary[300],

  // רקעים
  background: colors.light[50],
  surface: colors.light[100],
  card: colors.light[200],
  elevated: colors.light[300],

  // טקסט
  text: colors.dark[900],
  textSecondary: colors.dark[700],
  textMuted: colors.dark[500],

  // מצבים
  success: colors.status.success,
  error: colors.status.error,
  warning: colors.status.warning,
  info: colors.status.info,

  // גבולות
  border: colors.dark[200],
  divider: colors.dark[100],

  // אקסנטים
  accent: colors.secondary[500],
  highlight: colors.primary[400],
};

// ===== 📏 מרווחים =====
export const unifiedSpacing = spacing;

// ===== 🔤 טיפוגרפיה מאוחדת =====
export const unifiedTypography = {
  fonts: fontFamilies,
  sizes: fontSizes,
  weights: fontWeights,
  lineHeights,
  letterSpacing,
  styles: textStyles,

  // מבנה חדש עם categories
  heading: {
    h1: textStyles.h1,
    h2: textStyles.h2,
    h3: textStyles.h3,
    h4: textStyles.h4,
    h5: textStyles.h5,
    h6: textStyles.h6,
  },

  body: {
    large: textStyles.bodyLarge,
    medium: textStyles.bodyMedium,
    small: textStyles.bodySmall,
  },

  caption: {
    regular: textStyles.caption,
    medium: {
      ...textStyles.caption,
      fontWeight: fontWeights.medium,
    },
  },

  label: {
    large: textStyles.labelLarge,
    medium: textStyles.labelMedium,
    small: textStyles.labelSmall,
  },

  display: {
    large: textStyles.displayLarge,
    medium: textStyles.displayMedium,
    small: textStyles.displaySmall,
  },

  number: {
    large: textStyles.numberLarge,
    medium: textStyles.numberMedium,
    small: textStyles.numberSmall,
  },

  button: textStyles.button,
};

// ===== 🔲 רדיוסים =====
export const unifiedBorderRadius = borderRadius;

// ===== 🌟 צללים =====
export const unifiedShadows = {
  none: shadows.none,
  small: shadows.xs,
  medium: shadows.md,
  large: shadows.lg,
  xl: shadows.xl,
  // מבנה חדש
  sm: shadows.sm,
  md: shadows.md,
  lg: shadows.lg,
  xl: shadows.xl,
  xxl: shadows.xxl,
  // Special effects
  glow: specialEffects.glow,
  neumorphism: specialEffects.neumorphism,
  floating: specialEffects.floating,
  depth: specialEffects.depth,
  paper: specialEffects.paper,
};

// ===== ⚡ אנימציות =====
export const unifiedAnimation = {
  durations,
  easings,
  presets: animationPresets,
  transitions: screenTransitions,
  // מבנה חדש
  spring: {
    default: {
      tension: 100,
      friction: 7,
    },
    gentle: {
      tension: 80,
      friction: 10,
    },
    bouncy: {
      tension: 120,
      friction: 5,
    },
  },
};

// ===== 🎨 סגנונות מוכנים לקומפוננטות =====
export const componentStyles = {
  // כפתורים
  button: {
    primary: {
      backgroundColor: unifiedColors.primary,
      paddingVertical: unifiedSpacing.md,
      paddingHorizontal: unifiedSpacing.xl,
      borderRadius: unifiedBorderRadius.md,
      ...unifiedShadows.medium,
    },
    secondary: {
      backgroundColor: unifiedColors.secondary,
      paddingVertical: unifiedSpacing.md,
      paddingHorizontal: unifiedSpacing.xl,
      borderRadius: unifiedBorderRadius.md,
      ...unifiedShadows.medium,
    },
    text: {
      color: unifiedColors.text,
      ...unifiedTypography.styles.button,
    },
  },

  // כרטיסים
  card: {
    container: {
      backgroundColor: unifiedColors.card,
      borderRadius: unifiedBorderRadius.lg,
      padding: unifiedSpacing.lg,
      ...unifiedShadows.large,
    },
    elevated: {
      backgroundColor: unifiedColors.elevated,
      borderRadius: unifiedBorderRadius.lg,
      padding: unifiedSpacing.lg,
      ...unifiedShadows.xl,
    },
  },

  // קלטים
  input: {
    default: {
      backgroundColor: unifiedColors.surface,
      borderWidth: 1,
      borderColor: unifiedColors.border,
      borderRadius: unifiedBorderRadius.md,
      paddingVertical: unifiedSpacing.md,
      paddingHorizontal: unifiedSpacing.lg,
      color: unifiedColors.text,
      ...unifiedTypography.styles.bodyMedium,
    },
    focused: {
      borderColor: unifiedColors.primary,
      ...unifiedShadows.glow.primary,
    },
  },

  // מודאלים
  modal: {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    container: {
      backgroundColor: unifiedColors.surface,
      borderRadius: unifiedBorderRadius.xl,
      padding: unifiedSpacing.xl,
      ...unifiedShadows.xl,
    },
  },

  // תגיות
  badge: {
    container: {
      backgroundColor: unifiedColors.primary,
      paddingVertical: unifiedSpacing.xs,
      paddingHorizontal: unifiedSpacing.sm,
      borderRadius: unifiedBorderRadius.full,
    },
    text: {
      color: unifiedColors.background,
      ...unifiedTypography.styles.labelSmall,
    },
  },
};

// ===== 🌈 גרדיאנטים מוכנים =====
export const unifiedGradients = {
  primary: [colors.primary[600], colors.primary[800]] as [string, string],
  secondary: [colors.secondary[400], colors.secondary[600]] as [string, string],
  accent: [colors.primary[600], colors.secondary[500]] as [string, string],
  dark: [colors.dark[700], colors.dark[900]] as [string, string],
  card: [colors.light[100], colors.light[200]] as [string, string],
  success: [colors.status.success, colors.status.successDark] as [
    string,
    string
  ],
  error: [colors.status.error, colors.status.errorDark] as [string, string],
};

// ===== 📱 מימדים רספונסיביים =====
export const responsive = {
  spacing: (small: number, medium: number, large: number) => {
    // לוגיקה לבחירת גודל לפי מסך
    return medium; // ברירת מחדל
  },
  fontSize: (small: number, medium: number, large: number) => {
    return medium; // ברירת מחדל
  },
};

// ===== 🎯 מערכת העיצוב המאוחדת - ייצוא ראשי =====
export const unifiedDesignSystem = {
  colors: {
    ...unifiedColors,
    gradients: unifiedGradients,
    all: colors, // גישה לכל הצבעים
  },
  spacing: unifiedSpacing,
  typography: unifiedTypography,
  borderRadius: unifiedBorderRadius,
  shadows: unifiedShadows,
  animation: unifiedAnimation,
  components: componentStyles,
  responsive,

  // קבועים נוספים
  dimensions,
  grid,
  containers,
  zIndex,
  shapes,
};

// ייצוא ברירת מחדל
export default unifiedDesignSystem;
