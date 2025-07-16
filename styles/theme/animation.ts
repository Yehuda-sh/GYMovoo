/**
 * 📁 Path: /styles/theme/animation.ts
 * 📝 Description: אנימציות ומעברים - Animations and transitions
 * 🔢 Version: 1.0
 *
 * 🔗 Dependencies:
 * - react-native
 *
 * ⚠️ Animation configurations for smooth UI
 */

import { Animated, Easing } from "react-native";

// ⏱️ Duration scales - סולם משכי זמן
export const durations = {
  instant: 0,
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 800,

  // Specific durations - משכי זמן ספציפיים
  fade: 250,
  slide: 350,
  bounce: 600,
  spring: 500,

  // Long animations - אנימציות ארוכות
  pageTransition: 400,
  modalOpen: 300,
  modalClose: 250,
  drawerSlide: 350,

  // Micro animations - מיקרו אנימציות
  buttonPress: 100,
  iconRotate: 200,
  shimmer: 1500,
  pulse: 1000,
} as const;

// 🎨 Easing functions - פונקציות האטה והאצה
export const easings = {
  // Linear - ליניארי
  linear: Easing.linear,

  // Ease variations - וריאציות של ease
  easeIn: Easing.ease,
  easeOut: Easing.out(Easing.ease),
  easeInOut: Easing.inOut(Easing.ease),

  // Quad - ריבועי
  easeInQuad: Easing.quad,
  easeOutQuad: Easing.out(Easing.quad),
  easeInOutQuad: Easing.inOut(Easing.quad),

  // Cubic - מעוקב
  easeInCubic: Easing.cubic,
  easeOutCubic: Easing.out(Easing.cubic),
  easeInOutCubic: Easing.inOut(Easing.cubic),

  // Expo - אקספוננציאלי
  easeInExpo: Easing.exp,
  easeOutExpo: Easing.out(Easing.exp),
  easeInOutExpo: Easing.inOut(Easing.exp),

  // Back - עם חזרה אחורה
  easeInBack: Easing.back(1.7),
  easeOutBack: Easing.out(Easing.back(1.7)),
  easeInOutBack: Easing.inOut(Easing.back(1.7)),

  // Elastic - אלסטי
  easeInElastic: Easing.elastic(1),
  easeOutElastic: Easing.out(Easing.elastic(1)),
  easeInOutElastic: Easing.inOut(Easing.elastic(1)),

  // Bounce - קפיצה
  easeInBounce: Easing.bounce,
  easeOutBounce: Easing.out(Easing.bounce),
  easeInOutBounce: Easing.inOut(Easing.bounce),

  // Custom curves - עקומות מותאמות
  smooth: Easing.bezier(0.25, 0.1, 0.25, 1),
  sharp: Easing.bezier(0.4, 0, 0.6, 1),
  material: Easing.bezier(0.4, 0, 0.2, 1),
} as const;

// 🎭 Animation presets - תבניות אנימציה
export const animationPresets = {
  // Fade animations - אנימציות דהייה
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

  // Slide animations - אנימציות החלקה
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

  // Scale animations - אנימציות גודל
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
  pulse: {
    from: { scale: 1 },
    to: { scale: 1.05 },
    duration: durations.pulse,
    easing: easings.easeInOut,
    loop: true,
  },

  // Rotation animations - אנימציות סיבוב
  rotate360: {
    from: { rotate: "0deg" },
    to: { rotate: "360deg" },
    duration: durations.slow,
    easing: easings.linear,
  },
  wiggle: {
    sequence: [
      { rotate: "0deg", duration: 100 },
      { rotate: "-10deg", duration: 100 },
      { rotate: "10deg", duration: 100 },
      { rotate: "-10deg", duration: 100 },
      { rotate: "0deg", duration: 100 },
    ],
    easing: easings.easeInOut,
  },

  // Combined animations - אנימציות משולבות
  bounceIn: {
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    duration: durations.bounce,
    easing: easings.easeOutBounce,
  },
  zoomOut: {
    from: { scale: 1, opacity: 1 },
    to: { scale: 0.5, opacity: 0 },
    duration: durations.normal,
    easing: easings.easeInCubic,
  },
} as const;

// 🎬 Screen transition presets - תבניות מעבר בין מסכים
export const screenTransitions = {
  // Stack navigator transitions
  stackSlide: {
    duration: durations.pageTransition,
    easing: easings.material,
    cardStyleInterpolator: ({ current, layouts }: any) => ({
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    }),
  },

  stackFade: {
    duration: durations.pageTransition,
    easing: easings.easeInOut,
    cardStyleInterpolator: ({ current }: any) => ({
      cardStyle: {
        opacity: current.progress,
      },
    }),
  },

  // Modal transitions
  modalSlideUp: {
    duration: durations.modalOpen,
    easing: easings.easeOutCubic,
    animation: "slide_from_bottom",
  },

  modalFade: {
    duration: durations.modalOpen,
    easing: easings.easeInOut,
    animation: "fade",
  },
} as const;

// 🛠️ Animation helper functions - פונקציות עזר לאנימציות

// Create animated value - יצירת ערך אנימציה
export const createAnimatedValue = (initialValue: number = 0) => {
  return new Animated.Value(initialValue);
};

// Create animated value XY - יצירת ערך אנימציה דו-מימדי
export const createAnimatedValueXY = (x: number = 0, y: number = 0) => {
  return new Animated.ValueXY({ x, y });
};

// Animate value - הנפשת ערך
export const animateValue = (
  animatedValue: Animated.Value,
  toValue: number,
  duration: number = durations.normal,
  easing: (value: number) => number = easings.easeInOut,
  callback?: () => void
) => {
  return Animated.timing(animatedValue, {
    toValue,
    duration,
    easing,
    useNativeDriver: true,
  }).start(callback);
};

// Spring animation - אנימציית קפיץ
export const springAnimation = (
  animatedValue: Animated.Value,
  toValue: number,
  config?: {
    friction?: number;
    tension?: number;
    speed?: number;
    bounciness?: number;
  }
) => {
  return Animated.spring(animatedValue, {
    toValue,
    friction: config?.friction ?? 7,
    tension: config?.tension ?? 40,
    speed: config?.speed ?? 12,
    bounciness: config?.bounciness ?? 8,
    useNativeDriver: true,
  }).start();
};

// Sequence animation - אנימציית רצף
export const sequenceAnimation = (
  animations: Animated.CompositeAnimation[]
) => {
  return Animated.sequence(animations).start();
};

// Parallel animation - אנימציה מקבילה
export const parallelAnimation = (
  animations: Animated.CompositeAnimation[]
) => {
  return Animated.parallel(animations).start();
};

// Loop animation - אנימציה בלולאה
export const loopAnimation = (
  animation: Animated.CompositeAnimation,
  iterations: number = -1 // -1 for infinite
) => {
  return Animated.loop(animation, { iterations }).start();
};

// 🎯 Common animation configs - הגדרות אנימציה נפוצות
export const commonAnimations = {
  // Button press - לחיצת כפתור
  buttonPress: {
    scaleValue: createAnimatedValue(1),
    onPressIn: function () {
      animateValue(
        this.scaleValue,
        0.95,
        durations.buttonPress,
        easings.easeOut
      );
    },
    onPressOut: function () {
      animateValue(this.scaleValue, 1, durations.buttonPress, easings.easeOut);
    },
  },

  // Loading spinner - ספינר טעינה
  loadingSpinner: {
    rotateValue: createAnimatedValue(0),
    start: function () {
      loopAnimation(
        Animated.timing(this.rotateValue, {
          toValue: 1,
          duration: durations.slow,
          easing: easings.linear,
          useNativeDriver: true,
        })
      );
    },
    interpolate: function () {
      return this.rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
      });
    },
  },

  // Shimmer effect - אפקט נצנוץ
  shimmer: {
    animatedValue: createAnimatedValue(0),
    start: function () {
      loopAnimation(
        Animated.timing(this.animatedValue, {
          toValue: 1,
          duration: durations.shimmer,
          easing: easings.linear,
          useNativeDriver: true,
        })
      );
    },
  },

  // Shake animation - אנימציית רעידה
  shake: {
    animatedValue: createAnimatedValue(0),
    start: function () {
      Animated.sequence([
        Animated.timing(this.animatedValue, {
          toValue: 10,
          duration: 100,
          easing: easings.linear,
          useNativeDriver: true,
        }),
        Animated.timing(this.animatedValue, {
          toValue: -10,
          duration: 100,
          easing: easings.linear,
          useNativeDriver: true,
        }),
        Animated.timing(this.animatedValue, {
          toValue: 10,
          duration: 100,
          easing: easings.linear,
          useNativeDriver: true,
        }),
        Animated.timing(this.animatedValue, {
          toValue: 0,
          duration: 100,
          easing: easings.linear,
          useNativeDriver: true,
        }),
      ]).start();
    },
  },
} as const;

// 🔧 Type exports - ייצוא טיפוסים
export type DurationKeys = keyof typeof durations;
export type EasingKeys = keyof typeof easings;
export type AnimationPresetKeys = keyof typeof animationPresets;
