// screens/welcome/components/HeroSection.tsx
import React from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { HeroSectionProps } from "../types";

// screens/welcome/components/useWelcomeAnimations.ts
import { useEffect, useRef } from "react";

import { animation } from "@/styles/theme";

const HeroSection: React.FC<HeroSectionProps> = ({
  fadeAnim,
  logoScale,
  titleSlide,
  subtitleSlide,
  onLogoPress,
}) => {
  return (
    <Animated.View style={[styles.heroContainer, { opacity: fadeAnim }]}>
      <TouchableOpacity onPress={onLogoPress} activeOpacity={0.8}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <View style={styles.logo}>
            <Text style={styles.logoText}>💪</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.titleContainer,
          {
            transform: [{ translateX: titleSlide }],
          },
        ]}
      >
        <Text style={styles.title}>ברוכים הבאים לGymovo</Text>
        <Animated.Text
          style={[
            styles.subtitle,
            {
              transform: [{ translateX: subtitleSlide }],
            },
          ]}
        >
          האפליקציה שתעזור לך להגיע לכושר המושלם
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};

export default HeroSection;

export const useWelcomeAnimations = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const titleSlide = useRef(new Animated.Value(-50)).current;
  const subtitleSlide = useRef(new Animated.Value(50)).current;
  const buttonsSlide = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: animation.duration.slow,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: animation.spring.tension,
        friction: animation.spring.friction,
        useNativeDriver: true,
      }),
      Animated.timing(titleSlide, {
        toValue: 0,
        duration: animation.duration.normal,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleSlide, {
        toValue: 0,
        duration: animation.duration.normal,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.timing(buttonsSlide, {
        toValue: 0,
        duration: animation.duration.normal,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return {
    fadeAnim,
    logoScale,
    titleSlide,
    subtitleSlide,
    buttonsSlide,
  };
};
