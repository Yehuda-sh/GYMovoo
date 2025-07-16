/**
 * @file screens/welcome/styles/welcomeStyles.ts
 * @description סגנונות עבור מסך Welcome
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @notes
 * - סגנונות מותאמים למסכים שונים
 * - תמיכה ב-RTL
 * - אנימציות וצללים
 *
 * @changelog
 * - v1.0.0: Initial creation
 */

import { Dimensions, Platform, StyleSheet } from "react-native";

import theme from "@/styles/theme";

const { colors, spacing, borderRadius, shadows, fontSizes, fontWeights } =
  theme;

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Platform checks
const isIOS = Platform.OS === "ios";
const isSmallDevice = screenHeight < 700;
const isTinyDevice = screenHeight < 600;
const isWideScreen = screenWidth > 768;

// Responsive helper
const responsive = (small: number, medium: number, large: number) => {
  if (isTinyDevice) return small;
  if (isSmallDevice) return medium;
  return large;
};

// Main Welcome Screen Styles
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark[900],
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    zIndex: 1,
  },

  // Hero section styles
  heroContainer: {
    alignItems: "center",
    marginBottom: responsive(spacing.xl, spacing.xxl, spacing.xxxl),
  },

  // Action buttons container
  buttonsContainer: {
    width: isWideScreen ? 400 : "100%",
    alignSelf: "center",
  },

  // Buttons base styles
  buttonBase: {
    height: responsive(48, 56, 44),
    borderRadius: borderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  primaryButton: {
    backgroundColor: colors.primary[600],
    ...shadows.md,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.light[700],
  },

  // Loading state
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  loadingContent: {
    backgroundColor: colors.dark[700],
    padding: spacing.xxxl,
    borderRadius: borderRadius.lg,
    alignItems: "center",
    gap: spacing.lg,
  },
  loadingText: {
    color: colors.light[50],
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
  },

  // Error state
  errorContainer: {
    backgroundColor: `${colors.status.error}1A`,
    borderWidth: 1,
    borderColor: colors.status.error,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginVertical: spacing.lg,
  },
  errorText: {
    color: colors.status.error,
    fontSize: fontSizes.sm,
    textAlign: "center",
  },

  // Utility classes
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  gap: {
    gap: spacing.lg,
  },
  shadow: {
    ...shadows.md,
  },
});

// Dev Modal Styles
export const devModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: colors.dark[800],
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.dark[500],
  },
  closeButton: {
    position: "absolute",
    top: spacing.lg,
    right: spacing.lg,
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: `${colors.light[500]}1A`,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  closeButtonText: {
    color: colors.light[50],
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semiBold,
  },
});

// Export spacing constants for use in components
export { spacing };

// Export platform checks
export const platformStyles = {
  isIOS,
  isSmallDevice,
  isTinyDevice,
  isWideScreen,
};
