// styles/theme/animation.ts
export const animation = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
    verySlow: 800,
  },
  easing: {
    linear: "linear" as const,
    easeIn: "ease-in" as const,
    easeOut: "ease-out" as const,
    easeInOut: "ease-in-out" as const,
  },
  spring: {
    tension: 50,
    friction: 7,
  },
} as const;
