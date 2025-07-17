/**
 * @file screens/welcome/components/BackgroundGradient.tsx
 * @description רקע גרדיאנט דינמי עם אנימציות וחלקיקים
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @component BackgroundGradient
 * @parent WelcomeScreen
 *
 * @notes
 * - גרדיאנט רב-שכבתי עם אנימציות
 * - חלקיקים צפים לאווירה דינמית
 * - מותאם למצב כהה/בהיר
 * - ביצועים מאופטמים
 *
 * @changelog
 * - v1.0.0: Initial creation with particles and animations
 */

import { theme } from "@/styles/theme";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { memo, useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";

const { colors } = theme;
const { width, height } = Dimensions.get("window");

interface BackgroundGradientProps {
  visible: boolean;
  animated?: boolean;
  particlesEnabled?: boolean;
}

// Particle configuration
const PARTICLES_CONFIG = {
  count: 15,
  minSize: 2,
  maxSize: 6,
  minDuration: 8000,
  maxDuration: 15000,
  colors: ["#E91E63", "#9C27B0", "#3F51B5", "#00BCD4"],
};

/**
 * Individual floating particle
 */
const Particle: React.FC<{ delay: number; color: string }> = memo(
  ({ delay, color }) => {
    const translateY = useRef(new Animated.Value(height)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0)).current;

    const startX = useMemo(() => Math.random() * width, []);
    const size = useMemo(
      () =>
        PARTICLES_CONFIG.minSize +
        Math.random() * (PARTICLES_CONFIG.maxSize - PARTICLES_CONFIG.minSize),
      []
    );
    const duration = useMemo(
      () =>
        PARTICLES_CONFIG.minDuration +
        Math.random() *
          (PARTICLES_CONFIG.maxDuration - PARTICLES_CONFIG.minDuration),
      []
    );

    useEffect(() => {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(translateY, {
              toValue: -size * 2,
              duration,
              useNativeDriver: true,
              delay,
            }),
            Animated.sequence([
              Animated.timing(opacity, {
                toValue: 0.6,
                duration: duration * 0.2,
                useNativeDriver: true,
                delay,
              }),
              Animated.timing(opacity, {
                toValue: 0.6,
                duration: duration * 0.6,
                useNativeDriver: true,
              }),
              Animated.timing(opacity, {
                toValue: 0,
                duration: duration * 0.2,
                useNativeDriver: true,
              }),
            ]),
            Animated.timing(translateX, {
              toValue: (Math.random() - 0.5) * 100,
              duration,
              useNativeDriver: true,
              delay,
            }),
            Animated.sequence([
              Animated.timing(scale, {
                toValue: 1,
                duration: duration * 0.3,
                useNativeDriver: true,
                delay,
              }),
              Animated.timing(scale, {
                toValue: 0.8,
                duration: duration * 0.7,
                useNativeDriver: true,
              }),
            ]),
          ]),
          Animated.timing(translateY, {
            toValue: height,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );

      animation.start();
      return () => animation.stop();
    }, [translateY, translateX, opacity, scale, duration, delay, size]);

    return (
      <Animated.View
        style={[
          styles.particle,
          {
            left: startX,
            width: size,
            height: size,
            backgroundColor: color,
            opacity,
            transform: [{ translateY }, { translateX }, { scale }],
          },
        ]}
      />
    );
  }
);

Particle.displayName = "Particle";

/**
 * Dynamic background gradient with particles
 */
const BackgroundGradient: React.FC<BackgroundGradientProps> = memo(
  ({ visible, animated = true, particlesEnabled = true }) => {
    const colorScheme = useColorScheme();
    const animatedValue = useRef(new Animated.Value(0)).current;

    // Dynamic gradient colors based on theme
    const gradientColors = useMemo(() => {
      if (colorScheme === "dark") {
        return [
          colors.dark[900],
          colors.primary[900],
          colors.secondary[900],
          colors.dark[800],
        ];
      }
      return [
        colors.primary[600],
        colors.secondary[500],
        colors.primary[700],
        colors.dark[800],
      ];
    }, [colorScheme]);

    // Gradient animation
    useEffect(() => {
      if (animated) {
        const animation = Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, {
              toValue: 1,
              duration: 10000,
              useNativeDriver: false,
            }),
            Animated.timing(animatedValue, {
              toValue: 0,
              duration: 10000,
              useNativeDriver: false,
            }),
          ])
        );
        animation.start();
        return () => animation.stop();
      }
    }, [animatedValue, animated]);

    // Interpolate gradient positions
    const endY = animated
      ? animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1],
        })
      : 1;

    if (!visible) return null;

    return (
      <View style={StyleSheet.absoluteFillObject}>
        {/* Primary gradient */}
        <Animated.View style={StyleSheet.absoluteFillObject}>
          <LinearGradient
            colors={gradientColors}
            style={StyleSheet.absoluteFillObject}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: endY as any }}
          />
        </Animated.View>

        {/* Secondary overlay gradient */}
        <LinearGradient
          colors={[
            "transparent",
            `${colors.dark[900]}33`,
            `${colors.dark[900]}66`,
          ]}
          style={[StyleSheet.absoluteFillObject, { opacity: 0.5 }]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        {/* Blur overlay for depth (iOS only) */}
        {Platform.OS === "ios" && (
          <View style={[StyleSheet.absoluteFillObject, { opacity: 0.1 }]}>
            <BlurView intensity={20} style={StyleSheet.absoluteFillObject} />
          </View>
        )}

        {/* Floating particles */}
        {particlesEnabled && (
          <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
            {Array.from({ length: PARTICLES_CONFIG.count }).map((_, i) => (
              <Particle
                key={i}
                delay={i * 500}
                color={
                  PARTICLES_CONFIG.colors[i % PARTICLES_CONFIG.colors.length]
                }
              />
            ))}
          </View>
        )}

        {/* Vignette effect */}
        <View style={styles.vignette} pointerEvents="none" />
      </View>
    );
  }
);

BackgroundGradient.displayName = "BackgroundGradient";

const styles = StyleSheet.create({
  particle: {
    position: "absolute",
    borderRadius: 999,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    borderWidth: 100,
    borderColor: "rgba(0,0,0,0.2)",
  },
});

export default BackgroundGradient;
