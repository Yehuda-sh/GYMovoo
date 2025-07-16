/**
 * @file screens/welcome/components/ActionButtons.tsx
 * @description כפתורי הרשמה וכניסה ראשיים
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @component ActionButtons
 * @parent WelcomeScreen
 *
 * @notes
 * - כפתור הרשמה ראשי עם גרדיאנט
 * - לינק לכניסה למשתמשים קיימים
 * - אנימציות לחיצה עם haptic feedback
 * - תמיכה במכשירים קטנים
 *
 * @changelog
 * - v1.0.0: Initial creation
 */

import { theme } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import React, { memo, useCallback, useRef } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { colors, spacing, fontSizes, fontWeights, borderRadius, shadows } =
  theme;

const { height, width } = Dimensions.get("window");
const isSmallDevice = height < 700;
const isNarrowDevice = width < 350;

// Animation configuration
const ANIMATION_CONFIG = {
  tension: 300,
  friction: 10,
  useNativeDriver: true,
};

const PRESS_SCALE = 0.95;
const ANIMATION_DELAY = 100;

interface ActionButtonsProps {
  onSignup: () => void;
  onLogin: () => void;
  buttonsSlide: Animated.Value;
  fadeAnim: Animated.Value;
}

export const ActionButtons: React.FC<ActionButtonsProps> = memo(
  ({ onSignup, onLogin, buttonsSlide, fadeAnim }) => {
    const signupScale = useRef(new Animated.Value(1)).current;
    const loginScale = useRef(new Animated.Value(1)).current;

    // Press animations
    const animatePress = useCallback(
      (scale: Animated.Value, toValue: number) => {
        Animated.spring(scale, {
          toValue,
          ...ANIMATION_CONFIG,
        }).start();
      },
      []
    );

    // Signup button handlers
    const handleSignupPressIn = useCallback(() => {
      if (Platform.OS === "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      animatePress(signupScale, PRESS_SCALE);
    }, [animatePress, signupScale]);

    const handleSignupPressOut = useCallback(() => {
      animatePress(signupScale, 1);
      setTimeout(() => onSignup(), ANIMATION_DELAY);
    }, [animatePress, signupScale, onSignup]);

    // Login button handlers
    const handleLoginPressIn = useCallback(() => {
      if (Platform.OS === "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      animatePress(loginScale, PRESS_SCALE);
    }, [animatePress, loginScale]);

    const handleLoginPressOut = useCallback(() => {
      animatePress(loginScale, 1);
      setTimeout(() => onLogin(), ANIMATION_DELAY);
    }, [animatePress, loginScale, onLogin]);

    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY: buttonsSlide }],
            opacity: fadeAnim,
          },
        ]}
      >
        {/* כפתור הרשמה ראשי */}
        <Animated.View
          style={[
            styles.buttonWrapper,
            { transform: [{ scale: signupScale }] },
          ]}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={handleSignupPressIn}
            onPressOut={handleSignupPressOut}
            accessible={true}
            accessibilityLabel="הרשמה למערכת"
            accessibilityRole="button"
          >
            <LinearGradient
              colors={[colors.primary[600], colors.primary[700]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.signupButton}
            >
              <View style={styles.buttonContent}>
                <Ionicons
                  name="rocket"
                  size={isSmallDevice ? 20 : 22}
                  color={colors.light[50]}
                />
                <Text
                  style={[
                    styles.signupButtonText,
                    isNarrowDevice && styles.signupButtonTextSmall,
                  ]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  בואו נתחיל את המסע!
                </Text>
                <Ionicons
                  name="arrow-forward"
                  size={isSmallDevice ? 18 : 20}
                  color={colors.light[50]}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Divider with "או" */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>או</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* קישור כניסה */}
        <Animated.View
          style={[
            styles.loginContainer,
            { transform: [{ scale: loginScale }] },
          ]}
        >
          <TouchableOpacity
            onPressIn={handleLoginPressIn}
            onPressOut={handleLoginPressOut}
            style={styles.loginButton}
            activeOpacity={1}
            accessible={true}
            accessibilityLabel="כניסה לחשבון קיים"
            accessibilityRole="button"
          >
            <Text style={styles.loginText}>יש לי חשבון</Text>
            <Ionicons
              name="log-in-outline"
              size={isSmallDevice ? 16 : 18}
              color={colors.primary[600]}
            />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
);

ActionButtons.displayName = "ActionButtons";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: spacing.xl,
    marginTop: isSmallDevice ? spacing.md : spacing.xl,
  },
  buttonWrapper: {
    marginBottom: spacing.md,
  },
  signupButton: {
    height: isSmallDevice ? 52 : 58,
    borderRadius: borderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    ...shadows.md,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: isSmallDevice ? 8 : 10,
    paddingHorizontal: spacing.xl,
  },
  signupButtonText: {
    fontSize: isSmallDevice ? fontSizes.md : fontSizes.lg,
    fontWeight: fontWeights.bold,
    color: colors.light[50],
    letterSpacing: 0.5,
  },
  signupButtonTextSmall: {
    fontSize: fontSizes.sm,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing.sm,
    paddingHorizontal: spacing.xxxl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.light[700],
  },
  dividerText: {
    marginHorizontal: spacing.md,
    fontSize: fontSizes.sm,
    color: colors.light[400],
    fontWeight: fontWeights.medium,
  },
  loginContainer: {
    alignItems: "center",
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    backgroundColor: `${colors.primary[600]}1A`,
  },
  loginText: {
    fontSize: isSmallDevice ? fontSizes.sm : fontSizes.md,
    fontWeight: fontWeights.semiBold,
    color: colors.primary[600],
  },
});

export default ActionButtons;
