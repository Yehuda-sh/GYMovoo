/**
 * @file screens/welcome/components/GuestButton.tsx
 * @description כפתור כניסה כאורח עם אנימציות ועיצוב מתקדם
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @component GuestButton
 * @parent WelcomeScreen
 *
 * @notes
 * - כפתור עם אנימציית פעימה עדינה
 * - תמיכה בטעינה ומניעת לחיצות כפולות
 * - הודעה על שמירת נתונים זמנית
 * - נגישות מלאה
 *
 * @changelog
 * - v1.0.0: Initial creation with improved animations
 */

import { theme } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
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

const { width, height } = Dimensions.get("window");
const isSmallDevice = height < 700;
const isTinyDevice = height < 600;

interface GuestButtonProps {
  onGuestLogin: () => void | Promise<void>;
  fadeAnim?: Animated.Value;
  disabled?: boolean;
}

/**
 * Guest login button with pulse animation
 */
const GuestButton: React.FC<GuestButtonProps> = memo(
  ({ onGuestLogin, fadeAnim, disabled = false }) => {
    const [loading, setLoading] = useState(false);
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    // Pulse animation
    useEffect(() => {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
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

      return () => pulseAnimation.stop();
    }, [pulseAnim]);

    // Shimmer animation
    useEffect(() => {
      const shimmerAnimation = Animated.loop(
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      );
      shimmerAnimation.start();

      return () => shimmerAnimation.stop();
    }, [shimmerAnim]);

    // Handle press with loading state
    const handlePress = useCallback(async () => {
      if (loading || disabled) return;

      if (Platform.OS === "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

      setLoading(true);
      try {
        await onGuestLogin();
      } catch (error) {
        console.error("Guest login error:", error);
      } finally {
        setLoading(false);
      }
    }, [onGuestLogin, loading, disabled]);

    // Shimmer interpolation
    const shimmerOpacity = shimmerAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.3, 0],
    });

    return (
      <Animated.View
        style={[
          styles.container,
          fadeAnim && { opacity: fadeAnim },
          { transform: [{ scale: pulseAnim }] },
        ]}
      >
        <TouchableOpacity
          style={[styles.button, disabled && styles.buttonDisabled]}
          onPress={handlePress}
          activeOpacity={0.8}
          disabled={loading || disabled}
          accessible={true}
          accessibilityLabel="כניסה כאורח"
          accessibilityHint="לחץ כדי להיכנס לאפליקציה ללא הרשמה"
          accessibilityRole="button"
          accessibilityState={{ disabled: loading || disabled }}
        >
          {/* Shimmer effect */}
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              styles.button,
              {
                backgroundColor: colors.light[600],
                opacity: shimmerOpacity,
              },
            ]}
          />

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
