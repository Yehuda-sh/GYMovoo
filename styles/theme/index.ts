/**
 * @file styles/theme/index.ts
 * @description מאגד ערכת הנושא - Theme aggregator
 * @author GYMoveo Development
 * @version 1.0.2
 *
 * @notes
 * - תיקון בעיית imports
 * - ייצוא default theme object
 * - תיקון animation imports
 *
 * @changelog
 * - v1.0.2: Fix animation imports
 * - v1.0.1: Fix import issues
 * - v1.0.0: Initial creation
 */

// Import theme modules properly
import {
  animationPresets,
  durations,
  easings,
  screenTransitions,
} from "./animation";
import { borderRadius, componentRadius, corners, shapes } from "./borderRadius";
import { colors } from "./colors";
import { componentShadows, shadows, specialEffects } from "./shadows";
import { containers, dimensions, grid, spacing, zIndex } from "./spacing";
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacing,
  lineHeights,
  textStyles,
} from "./typography";

// Create unified theme object
const theme = {
  // Colors
  colors,

  // Spacing & Layout
  spacing,
  dimensions,
  grid,
  containers,
  zIndex,

  // Typography
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
  textStyles,

  // Borders & Shapes
  borderRadius,
  componentRadius,
  shapes,
  corners,

  // Shadows & Effects
  shadows,
  componentShadows,
  specialEffects,

  // Animation
  durations,
  easings,
  animationPresets,
  screenTransitions,

  // Convenience re-exports
  animation: {
    durations,
    easings,
    animationPresets,
    screenTransitions,
  },
};

// Export as default
export default theme;

// Also export individual modules for direct access
export {
  animationPresets,
  // Borders & Shapes
  borderRadius,
  // Colors
  colors,
  componentRadius,
  componentShadows,
  containers,
  corners,
  dimensions,
  // Animation
  durations,
  easings,
  // Typography
  fontFamilies,
  fontSizes,
  fontWeights,
  grid,
  letterSpacing,
  lineHeights,
  screenTransitions,
  // Shadows & Effects
  shadows,
  shapes,
  // Spacing & Layout
  spacing,
  specialEffects,
  textStyles,
  zIndex,
};
