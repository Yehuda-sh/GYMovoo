/**
 * @file screens/welcome/components/HeroSection.tsx
 * @description סקציית הירו עם לוגו ואנימציות
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @component HeroSection
 * @parent WelcomeScreen
 *
 * @notes
 * - לוגו עם אנימציית breathing
 * - כותרת ותת כותרת עם אנימציות כניסה
 * - תמיכה בלחיצה על הלוגו למצב פיתוח
 * - סטטיסטיקות מרשימות
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

const { colors, spacing, fontSizes, fontWeights, borderRadius, shadows } =
  theme;

const { width, height } = Dimensions.get("window");
const isSmallDevice = height < 700;
const isTinyDevice = height < 600;

// Animation config
const ANIMATION_CONFIG = {
  breathing: {
    scale: 1.05,
    duration: 2000,
  },
  glow: {
    minOpacity: 0.3,
    maxOpacity: 0.5,
    duration: 1500,
  },
  logoPress: {
    scaleDown: 0.9,
    duration: 100,
    tension: 300,
    friction: 10,
  },
};

// Stats data
const HERO_STATS = [
  { icon: "trophy", value: "1,247", label: "הישגים" },
  { icon: "flame", value: "12K+", label: "מתאמנים" },
  { icon: "star", value: "4.9", label: "דירוג" },
];

interface HeroSectionProps {
  fadeAnim: Animated.Value;
  logoScale: Animated.Value;
  titleSlide: Animated.Value;
  subtitleSlide: Animated.Value;
  onLogoPress?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = memo(
  ({ fadeAnim, logoScale, titleSlide, subtitleSlide, onLogoPress }) => {
    const breathingScale = useRef(new Animated.Value(1)).current;
    const glowOpacity = useRef(
      new Animated.Value(ANIMATION_CONFIG.glow.minOpacity)
    ).current;
    const statsOpacity = useRef(new Animated.Value(0)).current;

    // Start breathing animation
    useEffect(() => {
      // Breathing animation
      const breathingAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(breathingScale, {
            toValue: ANIMATION_CONFIG.breathing.scale,
            duration: ANIMATION_CONFIG.breathing.duration,
            useNativeDriver: true,
          }),
          Animated.timing(breathingScale, {
            toValue: 1.0,
            duration: ANIMATION_CONFIG.breathing.duration,
            useNativeDriver: true,
          }),
        ])
      );

      // Glow animation
      const glowAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(glowOpacity, {
            toValue: ANIMATION_CONFIG.glow.maxOpacity,
            duration: ANIMATION_CONFIG.glow.duration,
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: ANIMATION_CONFIG.glow.minOpacity,
            duration: ANIMATION_CONFIG.glow.duration,
            useNativeDriver: true,
          }),
        ])
      );

      // Stats fade in
      const statsAnimation = Animated.timing(statsOpacity, {
        toValue: 1,
        duration: 800,
        delay: 600,
        useNativeDriver: true,
      });

      breathingAnimation.start();
      glowAnimation.start();
      statsAnimation.start();

      // Cleanup
      return () => {
        breathingAnimation.stop();
        glowAnimation.stop();
        statsAnimation.stop();
      };
    }, [breathingScale, glowOpacity, statsOpacity]);

    // Handle logo press
    const handleLogoPress = useCallback(() => {
      if (!onLogoPress) return;

      if (Platform.OS === "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

      Animated.sequence([
        Animated.timing(logoScale, {
          toValue: ANIMATION_CONFIG.logoPress.scaleDown,
          duration: ANIMATION_CONFIG.logoPress.duration,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: ANIMATION_CONFIG.logoPress.tension,
          friction: ANIMATION_CONFIG.logoPress.friction,
          useNativeDriver: true,
        }),
      ]).start();

      onLogoPress();
    }, [onLogoPress, logoScale]);

    // Render stat item
    const renderStatItem = useCallback(
      (stat: (typeof HERO_STATS)[0], index: number) => (
        <React.Fragment key={stat.icon}>
          <View style={styles.featureItem}>
            <Ionicons
              name={stat.icon as any}
              size={isTinyDevice ? 16 : 20}
              color={colors.secondary[500]}
            />
            <Text style={styles.featureText}>{stat.value}</Text>
          </View>
          {index < HERO_STATS.length - 1 && (
            <View style={styles.featureDivider} />
          )}
        </React.Fragment>
      ),
      []
    );

    return (
      <Animated.View style={[styles.heroContainer, { opacity: fadeAnim }]}>
        {/* Logo */}
        <TouchableOpacity
          onPress={handleLogoPress}
          activeOpacity={onLogoPress ? 0.9 : 1}
          style={styles.logoTouchable}
          disabled={!onLogoPress}
          accessible={true}
          accessibilityLabel="לוגו GYMoveo"
          accessibilityHint={
            onLogoPress ? "לחץ 3 פעמים למצב מפתחים" : undefined
          }
        >
          <View style={styles.logoContainer}>
            {/* Glow effect */}
            <Animated.View
              style={[
                styles.logoGlow,
                {
                  opacity: glowOpacity,
                  transform: [{ scale: breathingScale }],
                },
              ]}
            />
            {/* Logo icon */}
            <Animated.View
              style={[
                styles.logoIcon,
                {
                  transform: [{ scale: logoScale }, { scale: breathingScale }],
                },
              ]}
            >
              <Ionicons
                name="barbell"
                size={isTinyDevice ? 36 : isSmallDevice ? 40 : 48}
                color={colors.light[50]}
              />
            </Animated.View>
          </View>
        </TouchableOpacity>

        {/* Title */}
        <Animated.View
          style={[
            styles.titleContainer,
            { transform: [{ translateY: titleSlide }] },
          ]}
        >
          <Text style={styles.title}>GYMoveo</Text>
          <View style={styles.accentLine} />
        </Animated.View>

        {/* Subtitle */}
        <Animated.View
          style={[
            styles.subtitleContainer,
            { transform: [{ translateY: subtitleSlide }] },
          ]}
        >
          <Text style={styles.subtitle}>
            האפליקציה שתעזור לך להגיע לגרסה הטובה ביותר של עצמך
          </Text>
        </Animated.View>

        {/* Features/Stats row */}
        <Animated.View
          style={[
            styles.featuresRow,
            {
              opacity: Animated.multiply(fadeAnim, statsOpacity),
              transform: [{ translateY: subtitleSlide }],
            },
          ]}
        >
          {HERO_STATS.map(renderStatItem)}
        </Animated.View>

        {/* Motivational tag */}
        <Animated.View
          style={[
            styles.tagContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: breathingScale }],
            },
          ]}
        >
          <Text style={styles.tagText}>מוכן לשינוי? ✨</Text>
        </Animated.View>
      </Animated.View>
    );
  }
);

HeroSection.displayName = "HeroSection";

const styles = StyleSheet.create({
  heroContainer: {
    alignItems: "center",
    paddingVertical: isTinyDevice ? 16 : isSmallDevice ? 20 : 30,
    paddingHorizontal: spacing.xl,
  },
  logoTouchable: {
    marginBottom: isTinyDevice ? 12 : isSmallDevice ? 15 : 20,
  },
  logoContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  logoIcon: {
    width: isTinyDevice ? 80 : isSmallDevice ? 90 : 100,
    height: isTinyDevice ? 80 : isSmallDevice ? 90 : 100,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[600],
    justifyContent: "center",
    alignItems: "center",
    ...shadows.lg,
  },
  logoGlow: {
    position: "absolute",
    width: isTinyDevice ? 100 : isSmallDevice ? 110 : 120,
    height: isTinyDevice ? 100 : isSmallDevice ? 110 : 120,
    borderRadius: borderRadius.full,
    backgroundColor: colors.secondary[500],
    opacity: 0.3,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: isTinyDevice ? 6 : isSmallDevice ? 8 : 12,
  },
  title: {
    fontSize: isTinyDevice ? 36 : isSmallDevice ? 40 : 48,
    fontWeight: fontWeights.bold,
    color: colors.light[50],
    textAlign: "center",
    letterSpacing: -1,
  },
  accentLine: {
    width: 50,
    height: 3,
    backgroundColor: colors.secondary[500],
    borderRadius: borderRadius.xs,
    marginTop: isTinyDevice ? 6 : 8,
  },
  subtitleContainer: {
    paddingHorizontal: width > 400 ? spacing.xxxl : spacing.xl,
    marginBottom: isTinyDevice ? 12 : isSmallDevice ? 15 : 20,
  },
  subtitle: {
    fontSize: isTinyDevice ? 14 : isSmallDevice ? 15 : 16,
    color: colors.light[200],
    textAlign: "center",
    lineHeight: isTinyDevice ? 20 : isSmallDevice ? 22 : 24,
    fontWeight: fontWeights.regular,
  },
  featuresRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: isTinyDevice ? 12 : isSmallDevice ? 15 : 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  featureText: {
    fontSize: isTinyDevice ? 12 : 13,
    color: colors.light[300],
    fontWeight: fontWeights.medium,
  },
  featureDivider: {
    width: 1,
    height: 16,
    backgroundColor: colors.light[500],
    marginHorizontal: isTinyDevice ? 8 : 12,
  },
  tagContainer: {
    backgroundColor: `${colors.primary[600]}1A`,
    paddingHorizontal: isTinyDevice ? 14 : 16,
    paddingVertical: isTinyDevice ? 6 : 8,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: `${colors.primary[600]}33`,
  },
  tagText: {
    fontSize: isTinyDevice ? 12 : 14,
    color: colors.secondary[500],
    fontWeight: fontWeights.semiBold,
  },
});

export default HeroSection;
