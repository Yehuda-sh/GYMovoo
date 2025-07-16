/**
 * @file screens/welcome/components/SocialLoginButtons.tsx
 * @description כפתורי התחברות עם רשתות חברתיות
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @component SocialLoginButtons
 * @parent WelcomeScreen
 *
 * @notes
 * - תמיכה ב-Google ו-Apple (iOS בלבד)
 * - אנימציות לחיצה עם loading state
 * - עיצוב מותאם לכל פלטפורמה
 * - הודעת פרטיות
 *
 * @changelog
 * - v1.0.0: Initial creation
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

// Animation configuration
const ANIMATION_CONFIG = {
  tension: 300,
  friction: 10,
  pressScale: 0.95,
  pressDelay: 100,
  useNativeDriver: true,
};

interface SocialLoginButtonsProps {
  onGoogleLogin: () => void;
  onAppleLogin: () => void;
  fadeAnim: Animated.Value;
  loading?: boolean;
}

export const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = memo(
  ({ onGoogleLogin, onAppleLogin, fadeAnim, loading = false }) => {
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

    // Generic button press animation
    const animateButtonPress = useCallback(
      (scale: Animated.Value, onComplete: () => void) => {
        if (loading) return;

        if (Platform.OS === "ios") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }

        // Press in
        Animated.spring(scale, {
          toValue: ANIMATION_CONFIG.pressScale,
          tension: ANIMATION_CONFIG.tension,
          friction: ANIMATION_CONFIG.friction,
          useNativeDriver: ANIMATION_CONFIG.useNativeDriver,
        }).start();

        // Press out
        setTimeout(() => {
          Animated.spring(scale, {
            toValue: 1,
            tension: ANIMATION_CONFIG.tension,
            friction: ANIMATION_CONFIG.friction,
            useNativeDriver: ANIMATION_CONFIG.useNativeDriver,
          }).start();

          // Trigger callback
          setTimeout(onComplete, ANIMATION_CONFIG.pressDelay);
        }, 150);
      },
      [loading]
    );

    // Google button handlers
    const handleGooglePress = useCallback(() => {
      animateButtonPress(googleScale, onGoogleLogin);
    }, [animateButtonPress, googleScale, onGoogleLogin]);

    // Apple button handlers
    const handleApplePress = useCallback(() => {
      animateButtonPress(appleScale, onAppleLogin);
    }, [animateButtonPress, appleScale, onAppleLogin]);

    // Button renderer
    const renderSocialButton = useCallback(
      (
        platform: "google" | "apple",
        scale: Animated.Value,
        onPress: () => void,
        buttonColors: { light: string; dark: string }
      ) => {
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
                      size={isSmallDevice ? 16 : 18}
                      color="#fff"
                    />
                    <Text
                      style={[
                        styles.socialButtonText,
                        isSmallDevice && styles.smallText,
                      ]}
                      numberOfLines={1}
                    >
                      {buttonText}
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

    // Show only Google button on Android
    const showAppleButton = Platform.OS === "ios";

    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {/* קו מפריד עם "או" */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>או התחבר עם</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* כפתורי התחברות */}
        <View
          style={[
            styles.socialButtonsRow,
            !showAppleButton && styles.singleButtonRow,
          ]}
        >
          {/* כפתור Google */}
          {renderSocialButton("google", googleScale, handleGooglePress, {
            light: "#4285F4",
            dark: "#1a73e8",
          })}

          {/* כפתור Apple - רק ב-iOS */}
          {showAppleButton &&
            renderSocialButton("apple", appleScale, handleApplePress, {
              light: "#000000",
              dark: "#000000",
            })}
        </View>

        {/* Privacy notice */}
        <Text style={styles.privacyText}>
          ההתחברות מאובטחת ולא נשתף את המידע שלך
        </Text>
      </Animated.View>
    );
  }
);

SocialLoginButtons.displayName = "SocialLoginButtons";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingVertical: isSmallDevice ? spacing.md : spacing.lg,
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
