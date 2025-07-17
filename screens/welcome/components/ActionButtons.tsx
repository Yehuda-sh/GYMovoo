/**
 * @file screens/welcome/components/ActionButtons.tsx
 * @description כפתורי הפעולה הראשיים - התחברות והרשמה
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @component ActionButtons
 * @parent WelcomeScreen
 *
 * @notes
 * - כפתורים עם גרדיאנטים ואנימציות
 * - תמיכה בטעינה ומצבי disabled
 * - אנימציית hover למכשירים תומכים
 * - RTL support מלא
 *
 * @changelog
 * - v1.0.0: Initial creation with gradients and animations
 */

import { theme } from "@/styles/theme";
import { unifiedDesignSystem } from "@/styles/theme/unifiedDesignSystem";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import React, { memo, useCallback, useRef } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { colors, spacing, fontSizes, fontWeights, borderRadius, shadows } =
  theme;
const { gradients } = unifiedDesignSystem.colors;

const { width, height } = Dimensions.get("window");
const isSmallDevice = height < 700;
const isTinyDevice = height < 600;

interface ActionButtonsProps {
  buttonsSlide: Animated.Value;
  onLogin: () => void;
  onSignup: () => void;
  fadeAnim: Animated.Value;
  disabled?: boolean;
}

/**
 * Main action buttons for login and signup
 */
const ActionButtons: React.FC<ActionButtonsProps> = memo(
  ({ buttonsSlide, onLogin, onSignup, fadeAnim, disabled = false }) => {
    const loginScale = useRef(new Animated.Value(1)).current;
    const signupScale = useRef(new Animated.Value(1)).current;

    // Animation helpers
    const animateScale = useCallback(
      (scale: Animated.Value, toValue: number) => {
        Animated.spring(scale, {
          toValue,
          friction: 6,
          tension: 100,
          useNativeDriver: true,
        }).start();
      },
      []
    );

    // Handle button press with haptics
    const handlePressIn = useCallback(
      (scale: Animated.Value) => {
        if (Platform.OS === "ios") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        animateScale(scale, 0.95);
      },
      [animateScale]
    );

    const handlePressOut = useCallback(
      (scale: Animated.Value) => {
        animateScale(scale, 1);
      },
      [animateScale]
    );

    return (
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ translateY: buttonsSlide }],
          },
        ]}
      >
        {/* Login Button */}
        <Animated.View
          style={[styles.buttonWrapper, { transform: [{ scale: loginScale }] }]}
        >
          <Pressable
            onPress={onLogin}
            onPressIn={() => handlePressIn(loginScale)}
            onPressOut={() => handlePressOut(loginScale)}
            disabled={disabled}
            accessible={true}
            accessibilityLabel="התחבר"
            accessibilityHint="לחץ כדי להתחבר לחשבון הקיים שלך"
            accessibilityRole="button"
            accessibilityState={{ disabled }}
          >
            <LinearGradient
              colors={gradients.primary}
              style={[styles.primaryButton, disabled && styles.buttonDisabled]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.primaryButtonText}>התחבר לחשבון</Text>
              {!disabled && <View style={styles.buttonShine} />}
            </LinearGradient>
          </Pressable>
        </Animated.View>

        {/* Signup Button */}
        <Animated.View
          style={[
            styles.buttonWrapper,
            { transform: [{ scale: signupScale }] },
          ]}
        >
          <Pressable
            onPress={onSignup}
            onPressIn={() => handlePressIn(signupScale)}
            onPressOut={() => handlePressOut(signupScale)}
            disabled={disabled}
            style={[styles.secondaryButton, disabled && styles.buttonDisabled]}
            accessible={true}
            accessibilityLabel="צור חשבון חדש"
            accessibilityHint="לחץ כדי ליצור חשבון חדש באפליקציה"
            accessibilityRole="button"
            accessibilityState={{ disabled }}
          >
            <LinearGradient
              colors={["transparent", "transparent"]}
              style={styles.secondaryButtonGradient}
            >
              <Text style={styles.secondaryButtonText}>צור חשבון חדש</Text>
            </LinearGradient>
          </Pressable>
        </Animated.View>

        {/* Decorative element */}
        <View style={styles.decorativeContainer}>
          <View style={styles.decorativeLine} />
          <Text style={styles.decorativeText}>או</Text>
          <View style={styles.decorativeLine} />
        </View>
      </Animated.View>
    );
  }
);

ActionButtons.displayName = "ActionButtons";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: spacing.xl,
    marginBottom: isTinyDevice ? spacing.lg : spacing.xl,
  },
  buttonWrapper: {
    marginBottom: isTinyDevice ? spacing.sm : spacing.md,
  },
  primaryButton: {
    height: isSmallDevice ? 48 : 52,
    borderRadius: borderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.md,
    position: "relative",
    overflow: "hidden",
  },
  primaryButtonText: {
    fontSize: isTinyDevice ? fontSizes.md : fontSizes.lg,
    fontWeight: fontWeights.bold,
    color: colors.light[50],
    letterSpacing: 0.5,
  },
  secondaryButton: {
    height: isSmallDevice ? 48 : 52,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.primary[500],
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  secondaryButtonGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  secondaryButtonText: {
    fontSize: isTinyDevice ? fontSizes.md : fontSizes.lg,
    fontWeight: fontWeights.semiBold,
    color: colors.primary[400],
    letterSpacing: 0.5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonShine: {
    position: "absolute",
    top: -10,
    left: -100,
    width: 100,
    height: "200%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    transform: [{ rotate: "25deg" }],
  },
  decorativeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: isTinyDevice ? spacing.md : spacing.lg,
    paddingHorizontal: spacing.md,
  },
  decorativeLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.light[700],
  },
  decorativeText: {
    fontSize: fontSizes.sm,
    color: colors.light[500],
    fontWeight: fontWeights.medium,
    marginHorizontal: spacing.md,
  },
});

export default ActionButtons;
