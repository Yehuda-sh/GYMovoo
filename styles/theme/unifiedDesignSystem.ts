/**
 * @file styles/theme/unifiedDesignSystem.ts
 * @description מערכת העיצוב המאוחדת של האפליקציה
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @notes
 * - מאגד את כל הערכים מקבצי הtheme
 * - מספק ממשק אחיד לכל האפליקציה
 * - כולל סגנונות מוכנים לקומפוננטות
 *
 * @changelog
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
  background: colors.dark[900],
  surface: colors.dark[800],
  card: colors.dark[700],
  elevated: colors.dark[600],

  // טקסט
  text: colors.light[50],
  textSecondary: colors.light[400],
  textMuted: colors.light[600],

  // מצבים
  success: colors.status.success,
  error: colors.status.error,
  warning: colors.status.warning,
  info: colors.status.info,

  // גבולות
  border: colors.dark[500],
  divider: colors.dark[400],

  // אקסנטים
  accent: colors.secondary[500],
  highlight: colors.primary[400],
};

// ===== 📏 מרווחים =====
export const unifiedSpacing = spacing;

// ===== 🔤 טיפוגרפיה =====
export const unifiedTypography = {
  fonts: fontFamilies,
  sizes: fontSizes,
  weights: fontWeights,
  lineHeights,
  letterSpacing,
  styles: textStyles,
};

// ===== 🔲 רדיוסים =====
export const unifiedBorderRadius = borderRadius;

// ===== 🌟 צללים =====
export const unifiedShadows = shadows;

// ===== ⚡ אנימציות =====
export const unifiedAnimation = {
  durations,
  easings,
  presets: animationPresets,
  transitions: screenTransitions,
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
      ...unifiedShadows.md,
    },
    secondary: {
      backgroundColor: unifiedColors.secondary,
      paddingVertical: unifiedSpacing.md,
      paddingHorizontal: unifiedSpacing.xl,
      borderRadius: unifiedBorderRadius.md,
      ...unifiedShadows.md,
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
      ...unifiedShadows.lg,
    },
    elevated: {
      backgroundColor: unifiedColors.elevated,
      borderRadius: unifiedBorderRadius.lg,
      padding: unifiedSpacing.lg,
      ...specialEffects.elevation.medium,
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
      ...specialEffects.glow.primary,
    },
  },

  // מודאלים
  modal: {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    container: {
      backgroundColor: unifiedColors.surface,
      borderRadius: unifiedBorderRadius.xl,
      padding: unifiedSpacing.xl,
      ...unifiedShadows.lg,
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
      color: unifiedColors.text,
      ...unifiedTypography.styles.labelSmall,
    },
  },
};

// ===== 🌈 גרדיאנטים מוכנים =====
export const unifiedGradients = {
  primary: [colors.primary[600], colors.primary[800]],
  secondary: [colors.secondary[400], colors.secondary[600]],
  accent: [colors.primary[600], colors.secondary[500]],
  dark: [colors.dark[700], colors.dark[900]],
  card: [colors.dark[700], colors.dark[800]],
  success: [colors.status.success, colors.status.successDark],
  error: [colors.status.error, colors.status.errorDark],
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
