/**
 * @file screens/welcome/components/GuestButton.tsx
 * @description כפתור כניסה מהירה כאורח
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @component GuestButton
 * @parent WelcomeScreen
 *
 * @notes
 * - כניסה מהירה ללא הרשמה
 * - ממוקם בתחתית המסך
 * - אנימציית pulse עדינה
 * - הודעה על שמירת נתונים זמנית
 *
 * @changelog
 * - v1.0.0: Initial creation
 */

import { theme } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { memo, useCallback, useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { colors, spacing, fontSizes, fontWeights, borderRadius } = theme;

const { width, height } = Dimensions.get("window");
const isSmallDevice = height < 700;
const isTinyDevice = height < 600;

// Animation config
const ANIMATION_CONFIG = {
  entrance: {
    duration: 800,
    delay: 600,
  },
  press: {
    scale: 0.95,
    speed: 20,
    bounciness: 5,
  },
  hover: {
    duration: 200,
  },
};

interface GuestButtonProps {
  onGuestLogin: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const GuestButton: React.FC<GuestButtonProps> = memo(
  ({ onGuestLogin, loading = false, disabled = false }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    // Entrance animation
    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: ANIMATION_CONFIG.entrance.duration,
        delay: ANIMATION_CONFIG.entrance.delay,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);

    // Pulse animation
    useEffect(() => {
      if (!disabled && !loading) {
        const pulseAnimation = Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.02,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }),
          ])
        );
        pulseAnimation.start();

        return () => {
          pulseAnimation.stop();
        };
      }
    }, [disabled, loading, pulseAnim]);

    const handlePressIn = useCallback(() => {
      if (loading || disabled) return;

      if (Platform.OS === "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

      Animated.spring(scaleAnim, {
        toValue: ANIMATION_CONFIG.press.scale,
        speed: ANIMATION_CONFIG.press.speed,
        bounciness: ANIMATION_CONFIG.press.bounciness,
        useNativeDriver: true,
      }).start();
    }, [loading, disabled, scaleAnim]);

    const handlePressOut = useCallback(() => {
      if (loading || disabled) return;

      Animated.spring(scaleAnim, {
        toValue: 1,
        speed: ANIMATION_CONFIG.press.speed,
        bounciness: ANIMATION_CONFIG.press.bounciness,
        useNativeDriver: true,
      }).start();

      setTimeout(() => onGuestLogin(), 100);
    }, [loading, disabled, scaleAnim, onGuestLogin]);

    return (
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { scale: pulseAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.button,
            (loading || disabled) && styles.buttonDisabled,
          ]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
          disabled={loading || disabled}
          accessible={true}
          accessibilityLabel="כניסה כאורח"
          accessibilityHint="התחל להשתמש באפליקציה ללא צורך בהרשמה"
          accessibilityRole="button"
          accessibilityState={{
            disabled: loading || disabled,
            busy: loading,
          }}
        >
          <View style={styles.contentContainer}>
            {/* Icon */}
            <View
              style={[
                styles.iconContainer,
                (loading || disabled) && styles.iconContainerDisabled,
              ]}
            >
              <Ionicons
                name="person-outline"
                size={isTinyDevice ? 14 : 16}
                color={
                  loading || disabled ? colors.light[400] : colors.light[300]
                }
              />
            </View>

            {/* Text */}
            <Text
              style={[
                styles.text,
                (loading || disabled) && styles.textDisabled,
              ]}
            >
              {loading ? "רגע אחד..." : "כניסה מהירה ללא הרשמה"}
            </Text>

            {/* Arrow */}
            {!loading && (
              <Ionicons
                name="arrow-forward-outline"
                size={isTinyDevice ? 14 : 16}
                color={
                  loading || disabled ? colors.light[400] : colors.light[300]
                }
              />
            )}
          </View>

          {/* Info text */}
          {!loading && !disabled && (
            <Text style={styles.infoText}>נתונים נשמרים עד 30 יום</Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  }
);

GuestButton.displayName = "GuestButton";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: isTinyDevice ? 16 : isSmallDevice ? 20 : 30,
    alignSelf: "center",
    width: width - spacing.xxxl * 2,
    maxWidth: 320,
  },
  button: {
    borderRadius: borderRadius.full,
    backgroundColor: `${colors.light[600]}1A`,
    borderWidth: 1,
    borderColor: colors.light[700],
    paddingVertical: isTinyDevice ? spacing.sm : spacing.md,
    paddingHorizontal: isTinyDevice ? spacing.lg : spacing.xl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonDisabled: {
    opacity: 0.6,
    backgroundColor: `${colors.light[700]}1A`,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: isTinyDevice ? 6 : 8,
  },
  iconContainer: {
    width: isTinyDevice ? 22 : 24,
    height: isTinyDevice ? 22 : 24,
    borderRadius: borderRadius.full,
    backgroundColor: `${colors.light[600]}1A`,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainerDisabled: {
    backgroundColor: `${colors.light[700]}0D`,
  },
  text: {
    fontSize: isTinyDevice ? fontSizes.sm : fontSizes.md,
    color: colors.light[300],
    fontWeight: fontWeights.medium,
    letterSpacing: 0.2,
  },
  textDisabled: {
    color: colors.light[500],
  },
  infoText: {
    fontSize: fontSizes.xxs,
    color: colors.light[500],
    textAlign: "center",
    marginTop: spacing.xs,
    opacity: 0.8,
  },
});

export default GuestButton;
