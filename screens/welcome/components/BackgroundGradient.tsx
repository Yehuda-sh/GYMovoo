/**
 * @file screens/welcome/components/BackgroundGradient.tsx
 * @description קומפוננטת רקע גרדיאנט עם אנימציה
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @component BackgroundGradient
 * @parent WelcomeScreen
 *
 * @notes
 * - רקע גרדיאנט עם אנימציית pulse
 * - תמיכה בגדלי מסך שונים
 * - אופטימיזציה לביצועים
 *
 * @changelog
 * - v1.0.0: Initial creation
 */

import { theme } from "@/styles/theme";
import { LinearGradient } from "expo-linear-gradient";
import React, { memo, useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { colors } = theme;

const { width, height } = Dimensions.get("window");

// Animation configuration
const ANIMATION_CONFIG = {
  pulseDuration: 4000,
  minOpacity: 0.05,
  maxOpacity: 0.15,
  useNativeDriver: true,
};

// Gradient colors - שימוש בצבעי הtheme
const gradientColors = {
  base: [colors.dark[900], colors.dark[800], colors.dark[700]] as const,
  glow: [colors.primary[600], colors.secondary[500]] as const,
  cornerTop: `${colors.primary[600]}1A`, // 10% opacity
  cornerBottom: `${colors.secondary[500]}1A`, // 10% opacity
};

interface BackgroundGradientProps {
  visible?: boolean;
}

export const BackgroundGradient: React.FC<BackgroundGradientProps> = memo(
  ({ visible = true }) => {
    const pulseAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(visible ? 1 : 0)).current;

    // Fade animation when visibility changes
    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: visible ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [visible, fadeAnim]);

    // Pulse animation
    useEffect(() => {
      if (!visible) return;

      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: ANIMATION_CONFIG.pulseDuration,
            useNativeDriver: ANIMATION_CONFIG.useNativeDriver,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: ANIMATION_CONFIG.pulseDuration,
            useNativeDriver: ANIMATION_CONFIG.useNativeDriver,
          }),
        ])
      );

      pulseAnimation.start();

      return () => {
        pulseAnimation.stop();
      };
    }, [visible, pulseAnim]);

    if (!visible) return null;

    return (
      <Animated.View
        style={[StyleSheet.absoluteFillObject, { opacity: fadeAnim }]}
        pointerEvents="none"
      >
        {/* רקע בסיס עם גרדיאנט כהה */}
        <LinearGradient
          colors={gradientColors.base}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.5, 1]}
        />

        {/* שכבת glow עדינה */}
        <Animated.View
          style={[
            styles.glowOverlay,
            {
              opacity: pulseAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  ANIMATION_CONFIG.minOpacity,
                  ANIMATION_CONFIG.maxOpacity,
                ],
              }),
            },
          ]}
        >
          <LinearGradient
            colors={gradientColors.glow}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>

        {/* אפקט gradient נוסף בפינות */}
        <View style={styles.cornerGradientTop}>
          <LinearGradient
            colors={[gradientColors.cornerTop, "transparent"]}
            style={styles.cornerGradient}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
        </View>

        <View style={styles.cornerGradientBottom}>
          <LinearGradient
            colors={["transparent", gradientColors.cornerBottom]}
            style={styles.cornerGradient}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
        </View>

        {/* Side gradients for wider screens */}
        {width > 768 && (
          <>
            <View style={styles.sideGradientLeft}>
              <LinearGradient
                colors={[gradientColors.cornerTop, "transparent"]}
                style={styles.sideGradient}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              />
            </View>
            <View style={styles.sideGradientRight}>
              <LinearGradient
                colors={["transparent", gradientColors.cornerBottom]}
                style={styles.sideGradient}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              />
            </View>
          </>
        )}
      </Animated.View>
    );
  }
);

BackgroundGradient.displayName = "BackgroundGradient";

const styles = StyleSheet.create({
  glowOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  cornerGradientTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.3,
  },
  cornerGradientBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.3,
  },
  cornerGradient: {
    flex: 1,
  },
  sideGradientLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: width * 0.2,
  },
  sideGradientRight: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: width * 0.2,
  },
  sideGradient: {
    flex: 1,
  },
});

export default BackgroundGradient;
