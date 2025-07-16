/**
 * 📁 Path: /styles/theme/index.ts
 * 📝 Description: מאגד ערכת הנושא - Theme aggregator
 * 🔢 Version: 1.0
 *
 * 🔗 Dependencies:
 * - @/styles/theme/colors
 * - @/styles/theme/spacing
 * - @/styles/theme/typography
 * - @/styles/theme/borderRadius
 * - @/styles/theme/shadows
 * - @/styles/theme/animation
 *
 * ⚠️ Central export point for all theme modules
 */

// 🎨 Import all theme modules - ייבוא כל מודולי הערכה
import * as animation from "./animation";
import * as borderRadius from "./borderRadius";
import * as colors from "./colors";
import * as shadows from "./shadows";
import * as spacing from "./spacing";
import * as typography from "./typography";

// 🎯 Main theme object - אובייקט הערכה הראשי
export const theme = {
  // Re-export all modules - ייצוא מחדש של כל המודולים
  colors: colors.colors,
  gradients: colors.colors.gradients,
  spacing: spacing.spacing,
  dimensions: spacing.dimensions,
  grid: spacing.grid,
  containers: spacing.containers,
  zIndex: spacing.zIndex,
  fonts: typography.fontFamilies,
  fontSizes: typography.fontSizes,
  fontWeights: typography.fontWeights,
  lineHeights: typography.lineHeights,
  letterSpacing: typography.letterSpacing,
  textStyles: typography.textStyles,
  borderRadius: borderRadius.borderRadius,
  componentRadius: borderRadius.componentRadius,
  shapes: borderRadius.shapes,
  corners: borderRadius.corners,
  shadows: shadows.shadows,
  componentShadows: shadows.componentShadows,
  specialEffects: shadows.specialEffects,
  durations: animation.durations,
  easings: animation.easings,
  animationPresets: animation.animationPresets,
  screenTransitions: animation.screenTransitions,
} as const;

// 🛠️ Helper function exports - ייצוא פונקציות עזר
export {
  colorCombos,
  // Color helpers
  getColor,
} from "./colors";

export {
  animationDistances,
  commonLayouts,
  createMargin,
  createPadding,
  getScreenPadding,
  // Spacing helpers
  getSpacing,
  isSmallScreen,
} from "./spacing";

export {
  createTextStyle,
  // Typography helpers
  getFontFamily,
  getResponsiveFontSize,
  rtlStyles,
  scaleFontSize,
} from "./typography";

export {
  commonShapes,
  createPillShape,
  // Border radius helpers
  createRadius,
  createSmoothRadius,
  createStadiumShape,
  getResponsiveRadius,
} from "./borderRadius";

export {
  animateShadow,
  createDepth,
  createShadow,
  // Shadow helpers
  getColoredShadow,
  shadowCombos,
} from "./shadows";

export {
  animateValue,
  commonAnimations,
  // Animation helpers
  createAnimatedValue,
  createAnimatedValueXY,
  loopAnimation,
  parallelAnimation,
  sequenceAnimation,
  springAnimation,
} from "./animation";

// 🔧 Type exports - ייצוא טיפוסים
export type { ColorKeys, GradientKeys } from "./colors";

export type { DimensionKeys, SpacingKeys, ZIndexKeys } from "./spacing";

export type {
  FontSizeKeys,
  FontWeightKeys,
  SimpleFontSizeKeys,
  TextStyleKeys,
} from "./typography";

export type {
  BorderRadiusKeys,
  ComponentRadiusKeys,
  CornerKeys,
  ShapeKeys,
} from "./borderRadius";

export type {
  ColoredShadowKeys,
  ShadowKeys,
  SpecialEffectKeys,
} from "./shadows";

export type {
  AnimationPresetKeys,
  DurationKeys,
  EasingKeys,
} from "./animation";

// 🎨 Common style combinations - שילובי סגנון נפוצים
export const commonStyles = {
  // Container styles - סגנונות מכולה
  container: {
    flex: 1,
    backgroundColor: theme.colors.dark[800],
  },

  safeContainer: {
    flex: 1,
    backgroundColor: theme.colors.dark[800],
    paddingTop: spacing.dimensions.safeArea.top,
    paddingBottom: spacing.dimensions.safeArea.bottom,
  },

  screenContainer: {
    flex: 1,
    backgroundColor: theme.colors.dark[800],
    padding: theme.spacing.md,
  },

  // Card styles - סגנונות כרטיס
  card: {
    backgroundColor: theme.colors.dark[700],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.sm,
  },

  cardPressed: {
    backgroundColor: theme.colors.dark[600],
    ...theme.shadows.xs,
  },

  // Button styles - סגנונות כפתור
  primaryButton: {
    backgroundColor: theme.colors.primary[600],
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    ...theme.shadows.sm,
  },

  secondaryButton: {
    backgroundColor: theme.colors.secondary[500],
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    ...theme.shadows.sm,
  },

  ghostButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.primary[600],
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
  },

  // Input styles - סגנונות קלט
  input: {
    backgroundColor: theme.colors.dark[600],
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.dark[500],
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    color: theme.colors.text.primary,
    ...theme.textStyles.bodyMedium,
  },

  inputFocused: {
    borderColor: theme.colors.primary[600],
    ...shadows.getColoredShadow("purple"),
  },

  inputError: {
    borderColor: theme.colors.status.error,
    ...shadows.getColoredShadow("red"),
  },

  // Text styles shortcuts - קיצורי דרך לסגנונות טקסט
  titleText: {
    ...theme.textStyles.h2,
    color: theme.colors.text.primary,
  },

  subtitleText: {
    ...theme.textStyles.h4,
    color: theme.colors.text.secondary,
  },

  bodyText: {
    ...theme.textStyles.bodyMedium,
    color: theme.colors.text.secondary,
  },

  captionText: {
    ...theme.textStyles.caption,
    color: theme.colors.text.tertiary,
  },

  // Layout helpers - עזרי פריסה
  centerContent: {
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },

  row: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },

  spaceBetween: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
  },

  absoluteFill: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
} as const;

// 🎯 Quick access theme object - אובייקט גישה מהירה
export const t = theme;

// 🌐 RTL support object - תמיכה ב-RTL
export const rtl = {
  styles: typography.rtlStyles,
  isRTL: (language: string) => language === "he" || language === "ar",
  getTextAlign: (isRTL: boolean) =>
    isRTL ? ("right" as const) : ("left" as const),
  getFlexDirection: (isRTL: boolean) =>
    isRTL ? ("row-reverse" as const) : ("row" as const),
};

// 📱 Responsive helpers - עזרים רספונסיביים
export const responsive = {
  // Get responsive value based on screen width
  getValue: <T>(
    screenWidth: number,
    values: { sm?: T; md?: T; lg?: T; xl?: T },
    defaultValue: T
  ): T => {
    if (screenWidth < spacing.grid.breakpoints.sm && values.sm !== undefined)
      return values.sm;
    if (screenWidth < spacing.grid.breakpoints.md && values.md !== undefined)
      return values.md;
    if (screenWidth < spacing.grid.breakpoints.lg && values.lg !== undefined)
      return values.lg;
    if (screenWidth >= spacing.grid.breakpoints.lg && values.xl !== undefined)
      return values.xl;
    return defaultValue;
  },

  // Check breakpoint
  isBreakpoint: (
    screenWidth: number,
    breakpoint: keyof typeof spacing.grid.breakpoints
  ): boolean => {
    const nextBreakpointKey = Object.keys(spacing.grid.breakpoints)[
      Object.keys(spacing.grid.breakpoints).indexOf(breakpoint) + 1
    ] as keyof typeof spacing.grid.breakpoints;

    const minWidth = spacing.grid.breakpoints[breakpoint];
    const maxWidth = nextBreakpointKey
      ? spacing.grid.breakpoints[nextBreakpointKey]
      : Infinity;

    return screenWidth >= minWidth && screenWidth < maxWidth;
  },
};

// 🎨 Theme validator - מאמת ערכת נושא
export const validateTheme = () => {
  const requiredModules = [
    "colors",
    "spacing",
    "fonts",
    "borderRadius",
    "shadows",
    "durations",
  ];

  const missingModules = requiredModules.filter(
    (module) => !theme[module as keyof typeof theme]
  );

  if (missingModules.length > 0) {
    console.warn(
      `Theme validation failed. Missing modules: ${missingModules.join(", ")}`
    );
    return false;
  }

  return true;
};

// Initialize theme validation in development
if (__DEV__) {
  validateTheme();
}

// Default export
export default theme;
