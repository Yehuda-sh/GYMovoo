// app/screens/welcome/components/useWelcomeAnimations.ts
import { animation } from "@/app/styles/theme";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export const useWelcomeAnimations = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const titleSlide = useRef(new Animated.Value(-50)).current;
  const subtitleSlide = useRef(new Animated.Value(50)).current;
  const buttonsSlide = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    // הפעלת כל האנימציות במקביל
    Animated.parallel([
      // Fade in כללי
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: animation.duration.slow,
        useNativeDriver: true,
      }),

      // אנימציית לוגו - קפיצה
      Animated.spring(logoScale, {
        toValue: 1,
        tension: animation.spring.tension,
        friction: animation.spring.friction,
        useNativeDriver: true,
      }),

      // כותרת נכנסת משמאל
      Animated.timing(titleSlide, {
        toValue: 0,
        duration: animation.duration.normal,
        delay: 200,
        useNativeDriver: true,
      }),

      // תת כותרת נכנסת מימין
      Animated.timing(subtitleSlide, {
        toValue: 0,
        duration: animation.duration.normal,
        delay: 300,
        useNativeDriver: true,
      }),

      // כפתורים נכנסים מלמטה
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
