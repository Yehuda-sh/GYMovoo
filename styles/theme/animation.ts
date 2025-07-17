/**
 * @file styles/theme/animation.ts
 * @description אנימציות, מעברים וזמנים - Animations, transitions and timing
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @notes
 * - זמני אנימציה סטנדרטיים
 * - פונקציות easing
 * - תבניות אנימציה מוכנות
 *
 * @changelog
 * - v1.0.0: Initial creation with comprehensive animation system
 */

import { Animated, Easing } from "react-native";

// ===== ⏱️ זמני אנימציה =====
export const durations = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 800,

  // זמנים ספציפיים
  fade: 200,
  slide: 350,
  spring: 400,
  bounce: 600,
  pulse: 1000,

  // מעברי מסך
  screenTransition: 350,
  modalOpen: 300,
  modalClose: 250,
  tabSwitch: 200,
} as const;

// ===== 🎢 פונקציות Easing =====
export const easings = {
  // בסיסיות
  linear: Easing.linear,
  ease: Easing.ease,
  easeIn: Easing.in(Easing.ease),
  easeOut: Easing.out(Easing.ease),
  easeInOut: Easing.inOut(Easing.ease),

  // Cubic
  easeInCubic: Easing.in(Easing.cubic),
  easeOutCubic: Easing.out(Easing.cubic),
  easeInOutCubic: Easing.inOut(Easing.cubic),

  // Quad
  easeInQuad: Easing.in(Easing.quad),
  easeOutQuad: Easing.out(Easing.quad),
  easeInOutQuad: Easing.inOut(Easing.quad),

  // Expo
  easeInExpo: Easing.in(Easing.exp),
  easeOutExpo: Easing.out(Easing.exp),
  easeInOutExpo: Easing.inOut(Easing.exp),

  // Back (עם bounce קטן)
  easeInBack: Easing.in(Easing.back(1.7)),
  easeOutBack: Easing.out(Easing.back(1.7)),
  easeInOutBack: Easing.inOut(Easing.back(1.7)),

  // Elastic
  easeInElastic: Easing.in(Easing.elastic(1)),
  easeOutElastic: Easing.out(Easing.elastic(1)),
  easeInOutElastic: Easing.inOut(Easing.elastic(1)),

  // Bounce
  easeInBounce: Easing.in(Easing.bounce),
  easeOutBounce: Easing.out(Easing.bounce),
  easeInOutBounce: Easing.inOut(Easing.bounce),

  // Custom curves
  smooth: Easing.bezier(0.25, 0.1, 0.25, 1),
  sharp: Easing.bezier(0.4, 0, 0.6, 1),
  material: Easing.bezier(0.4, 0, 0.2, 1),
} as const;

// ===== 🎭 תבניות אנימציה =====
export const animationPresets = {
  // Fade animations
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: durations.fade,
    easing: easings.easeInOut,
  },

  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
    duration: durations.fade,
    easing: easings.easeInOut,
  },

  // Slide animations
  slideInRight: {
    from: { translateX: 100 },
    to: { translateX: 0 },
    duration: durations.slide,
    easing: easings.easeOutCubic,
  },

  slideInLeft: {
    from: { translateX: -100 },
    to: { translateX: 0 },
    duration: durations.slide,
    easing: easings.easeOutCubic,
  },

  slideInUp: {
    from: { translateY: 100 },
    to: { translateY: 0 },
    duration: durations.slide,
    easing: easings.easeOutCubic,
  },

  slideInDown: {
    from: { translateY: -100 },
    to: { translateY: 0 },
    duration: durations.slide,
    easing: easings.easeOutCubic,
  },

  // Scale animations
  scaleIn: {
    from: { scale: 0 },
    to: { scale: 1 },
    duration: durations.spring,
    easing: easings.easeOutBack,
  },

  scaleOut: {
    from: { scale: 1 },
    to: { scale: 0 },
    duration: durations.normal,
    easing: easings.easeInBack,
  },

  // Rotation
  rotate360: {
    from: { rotate: "0deg" },
    to: { rotate: "360deg" },
    duration: durations.slow,
    easing: easings.linear,
  },

  // Combined animations
  fadeAndSlideInUp: {
    from: { opacity: 0, translateY: 20 },
    to: { opacity: 1, translateY: 0 },
    duration: durations.normal,
    easing: easings.easeOutCubic,
  },

  fadeAndScaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    duration: durations.normal,
    easing: easings.easeOutCubic,
  },
} as const;

// ===== 🎬 מעברי מסך =====
export const screenTransitions = {
  // מעבר רגיל
  default: {
    animation: "slide_from_right",
    config: {
      duration: durations.screenTransition,
      easing: easings.easeInOutCubic,
    },
  },

  // מעבר מודאל
  modal: {
    animation: "slide_from_bottom",
    config: {
      duration: durations.modalOpen,
      easing: easings.easeOutCubic,
    },
  },

  // מעבר fade
  fade: {
    animation: "fade",
    config: {
      duration: durations.fade,
      easing: easings.ease,
    },
  },

  // ללא מעבר
  none: {
    animation: "none",
    config: {
      duration: 0,
    },
  },
} as const;

// ===== 🔧 פונקציות עזר =====

/**
 * יצירת אנימציה
 */
export const createAnimation = (
  value: Animated.Value,
  toValue: number,
  duration: number = durations.normal,
  easing: (value: number) => number = easings.easeInOut
): Animated.CompositeAnimation => {
  return Animated.timing(value, {
    toValue,
    duration,
    easing,
    useNativeDriver: true,
  });
};

/**
 * יצירת אנימציית spring
 */
export const createSpring = (
  value: Animated.Value,
  toValue: number,
  config?: Partial<Animated.SpringAnimationConfig>
): Animated.CompositeAnimation => {
  return Animated.spring(value, {
    toValue,
    tension: 40,
    friction: 7,
    useNativeDriver: true,
    ...config,
  });
};

/**
 * יצירת אנימציה מורכבת
 */
export const createSequence = (
  animations: Animated.CompositeAnimation[]
): Animated.CompositeAnimation => {
  return Animated.sequence(animations);
};

/**
 * יצירת אנימציה מקבילה
 */
export const createParallel = (
  animations: Animated.CompositeAnimation[]
): Animated.CompositeAnimation => {
  return Animated.parallel(animations);
};

/**
 * יצירת לולאת אנימציה
 */
export const createLoop = (
  animation: Animated.CompositeAnimation,
  iterations: number = -1
): Animated.CompositeAnimation => {
  return Animated.loop(animation, { iterations });
};

// ===== 🎯 ייצוא ראשי =====
export const animation = {
  durations,
  easings,
  presets: animationPresets,
  transitions: screenTransitions,
  helpers: {
    createAnimation,
    createSpring,
    createSequence,
    createParallel,
    createLoop,
  },
};

// ייצוא ברירת מחדל
export default animation;
