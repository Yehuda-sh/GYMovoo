/**
 * @file screens/welcome/styles/welcomeStyles.ts
 * @description סטיילים ראשיים למסך Welcome
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @notes
 * - סטיילים מותאמים למכשירים שונים
 * - תמיכה במסכים קטנים וגדולים
 * - סטיילים למודל Dev
 *
 * @changelog
 * - v1.0.0: Initial creation
 */

import { theme } from "@/styles/theme";
import { Dimensions, Platform, StyleSheet } from "react-native";

const { colors, spacing, fontSizes, fontWeights, borderRadius, shadows } =
  theme;

const { width, height } = Dimensions.get("window");
const isSmallDevice = height < 700;
const isTinyDevice = height < 600;
const isWideScreen = width > 768;
const isIOS = Platform.OS === "ios";

// Responsive values helper
export const responsive = (small: number, normal: number, tiny?: number) => {
  if (tiny !== undefined && isTinyDevice) return tiny;
  return isSmallDevice ? small : normal;
};

export const styles = StyleSheet.create({
  // Main containers
  container: {
    flex: 1,
    backgroundColor: colors.dark[900],
  },
  content: {
    flex: 1,
    justifyContent: isSmallDevice ? "space-between" : "center",
    alignItems: "center",
    paddingTop: responsive(40, 60, 30),
    paddingBottom: responsive(80, 100, 60),
    paddingHorizontal: spacing.xl,
  },

  // Safe area adjustments
  safeArea: {
    flex: 1,
  },

  // Scroll container for very small devices
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: spacing.xxxl,
  },

  // Background and overlays
  backgroundGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },

  // Logo section
  logoSection: {
    alignItems: "center",
    marginBottom: responsive(spacing.xl, spacing.xxxl),
  },
  logoContainer: {
    marginBottom: responsive(20, 30, 15),
    alignItems: "center",
    justifyContent: "center",
  },
  logoWrapper: {
    width: responsive(80, 100, 70),
    height: responsive(80, 100, 70),
    borderRadius: borderRadius.full,
    overflow: "hidden",
  },
  logoGlow: {
    position: "absolute",
    width: responsive(120, 150, 100),
    height: responsive(120, 150, 100),
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[600],
    opacity: 0.2,
    transform: [{ scale: 1.5 }],
  },

  // Text styles
  title: {
    fontSize: responsive(28, 32, 24),
    fontWeight: fontWeights.bold,
    color: colors.light[50],
    textAlign: "center",
    marginBottom: spacing.sm,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: responsive(16, 18, 14),
    color: colors.light[300],
    textAlign: "center",
    lineHeight: responsive(22, 26, 20),
    paddingHorizontal: spacing.xl,
  },

  // Actions section
  actionsContainer: {
    width: "100%",
    paddingHorizontal: spacing.xl,
    marginTop: responsive(10, 20),
    maxWidth: isWideScreen ? 400 : "100%",
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
