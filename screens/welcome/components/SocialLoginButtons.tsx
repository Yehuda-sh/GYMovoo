/**
 * @file screens/welcome/components/SocialLoginButtons.tsx
 * @description כפתורי התחברות חברתית עם אנימציות
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @component SocialLoginButtons
 * @parent WelcomeScreen
 *
 * @notes
 * - תמיכה ב-Google ו-Apple Sign In
 * - אנימציות לחיצה וטעינה
 * - הסתרת Apple Sign In ב-Android
 * - עיצוב מודרני עם גרדיאנטים
 *
 * @changelog
 * - v1.0.0: Initial creation with modern design
 */

import { theme } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { memo, useCallback, useRef } from "react";
import {
  ActivityIndicator,
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

const { width, height } = Dimensions.get("window");
const isSmallDevice = height < 700;

// Social platform configs
const SOCIAL_CONFIGS = {
  google: {
    colors: {
      light: ["#4285F4", "#3367D6"],
      dark: ["#2a5298", "#1e3a6f"],
    },
    icon: "logo-google",
    text: "המשך עם Google",
  },
  apple: {
    colors: {
      light: ["#000000", "#1a1a1a"],
      dark: ["#ffffff", "#f0f0f0"],
    },
    icon: "logo-apple",
    text: "המשך עם Apple",
  },
};

interface SocialLoginButtonsProps {
  onGoogleLogin: () => void | Promise<void>;
  onAppleLogin: () => void | Promise<void>;
  fadeAnim: Animated.Value;
  loading?: boolean;
  disabled?: boolean;
}

/**
 * Social login buttons with animations
 */
const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = memo(
  ({
    onGoogleLogin,
    onAppleLogin,
    fadeAnim,
    loading = false,
    disabled = false,
  }) => {
    const googleScale = useRef(new Animated.Value(1)).current;
    const appleScale = useRef(new Animated.Value(1)).current;
    const loadingOpacity = useRef(new Animated.Value(0)).current;

    // Loading animation
    React.useEffect(() => {
      Animated.timing(loadingOpacity, {
        toValue: loading ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, [loading, loadingOpacity]);

    // Handle button animations
    const handlePressIn = useCallback((scale: Animated.Value) => {
      if (Platform.OS === "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      Animated.spring(scale, {
        toValue: 0.95,
        tension: 300,
        friction: 10,
        useNativeDriver: true,
      }).start();
    }, []);

    const handlePressOut = useCallback((scale: Animated.Value) => {
      Animated.spring(scale, {
        toValue: 1,
        tension: 300,
        friction: 10,
        useNativeDriver: true,
      }).start();
    }, []);

    // Render social button
    const renderSocialButton = useCallback(
      (
        platform: "google" | "apple",
        onPress: () => void,
        scale: Animated.Value
      ) => {
        const config = SOCIAL_CONFIGS[platform];
        const buttonColors = config.colors;
        const iconName = platform === "google" ? "logo-google" : "logo-apple";
        const buttonText = platform === "google" ? "Google" : "Apple";

        return (
          <Animated.View
            style={[
              styles.buttonWrapper,
              { transform: [{ scale }] },
              Platform.OS !== "ios" && platform === "apple" && styles.hideApple,
            ]}
          >
            <TouchableOpacity
              style={[
                styles.socialButton,
                { backgroundColor: buttonColors.light },
                loading && styles.disabledButton,
              ]}
              onPress={onPress}
              activeOpacity={0.8}
              disabled={loading}
              accessible={true}
              accessibilityLabel={`התחבר עם ${buttonText}`}
              accessibilityRole="button"
              accessibilityState={{ disabled: loading }}
            >
              <View style={styles.buttonContent}>
                {loading ? (
                  <Animated.View style={{ opacity: loadingOpacity }}>
                    <ActivityIndicator size="small" color="#fff" />
                  </Animated.View>
                ) : (
                  <>
                    <Ionicons
                      name={iconName as any}
                      size={isSmallDevice ? 18 : 20}
                      color="#fff"
                    />
                    <Text
                      style={[
                        styles.socialButtonText,
                        isSmallDevice && styles.smallText,
                      ]}
                    >
                      {config.text}
                    </Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
          </Animated.View>
        );
      },
      [loading, loadingOpacity, isSmallDevice]
    );

    // Show only Google on Android
    const showApple = Platform.OS === "ios";

    return (
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>או המשך עם</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social buttons */}
        <View
          style={[
            styles.socialButtonsRow,
            !showApple && styles.singleButtonRow,
          ]}
        >
          {renderSocialButton("google", onGoogleLogin, googleScale)}
          {showApple && renderSocialButton("apple", onAppleLogin, appleScale)}
        </View>

        {/* Privacy text */}
        <Text style={styles.privacyText}>
          בהתחברות אתה מסכים לתנאי השימוש ומדיניות הפרטיות
        </Text>
      </Animated.View>
    );
  }
);

SocialLoginButtons.displayName = "SocialLoginButtons";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: isSmallDevice ? spacing.md : spacing.lg,
    width: "100%",
  },

  // Divider styles
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: isSmallDevice ? spacing.md : spacing.lg,
    marginBottom: isSmallDevice ? spacing.lg : spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.light[700],
  },
  dividerText: {
    fontSize: isSmallDevice ? fontSizes.xs : fontSizes.sm,
    color: colors.light[400],
    fontWeight: fontWeights.medium,
  },

  // Button row
  socialButtonsRow: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  singleButtonRow: {
    maxWidth: 200,
    alignSelf: "center",
  },

  // Button styles
  buttonWrapper: {
    flex: 1,
    height: isSmallDevice ? 42 : 44,
    maxWidth: 180,
  },
  hideApple: {
    display: "none",
  },
  socialButton: {
    flex: 1,
    borderRadius: borderRadius.md,
    ...shadows.sm,
    height: "100%",
    overflow: "hidden",
  },
  buttonContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: isSmallDevice ? spacing.sm : spacing.md,
    paddingHorizontal: spacing.lg,
    gap: isSmallDevice ? spacing.xs : spacing.sm,
  },
  socialButtonText: {
    fontSize: isSmallDevice ? fontSizes.xs : fontSizes.sm,
    fontWeight: fontWeights.semiBold,
    color: colors.light[50],
    textAlign: "center",
  },
  smallText: {
    fontSize: fontSizes.xxs,
  },
  disabledButton: {
    opacity: 0.7,
  },

  // Privacy text
  privacyText: {
    fontSize: fontSizes.xxs,
    color: colors.light[500],
    textAlign: "center",
    marginTop: isSmallDevice ? spacing.sm : spacing.md,
  },
});

export default SocialLoginButtons;
