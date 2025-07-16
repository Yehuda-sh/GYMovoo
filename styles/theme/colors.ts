/**
 * 📁 Path: /styles/theme/colors.ts
 * 📝 Description: צבעי הערכה - Theme colors
 * 📅 Last Modified: 2024-12-30 15:45
 *
 * 🔗 Dependencies: None
 *
 * ⚠️ Main colors: Purple (#667eea) and Green (#00ff88)
 */

// 🎨 Main brand colors - צבעי מותג ראשיים
export const colors = {
  // 🟣 Primary - Purple gradient base
  primary: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#667eea", // Main purple
    700: "#6366f1",
    800: "#5a67d8",
    900: "#4c51bf",
  },

  // 🟢 Secondary - Neon green accent
  secondary: {
    50: "#e6fffa",
    100: "#b2ffef",
    200: "#80ffe4",
    300: "#4dffd9",
    400: "#1affce",
    500: "#00ff88", // Main green
    600: "#00e67a",
    700: "#00cc6b",
    800: "#00b35d",
    900: "#00994f",
  },

  // ⚫ Dark backgrounds - רקעים כהים
  dark: {
    900: "#0a0a0a", // Deepest black
    800: "#121212", // Main background
    700: "#1a1a1a", // Card background
    600: "#242424", // Elevated surface
    500: "#2d2d2d", // Border color
    400: "#383838", // Hover state
  },

  // ⚪ Light elements - אלמנטים בהירים
  light: {
    50: "#ffffff",
    100: "#fafafa",
    200: "#f5f5f5",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },

  // 🌈 Gradient combinations - שילובי גרדיאנט
  gradients: {
    primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    secondary: "linear-gradient(135deg, #00ff88 0%, #00b35d 100%)",
    accent: "linear-gradient(135deg, #667eea 0%, #00ff88 100%)",
    dark: "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)",
    glow: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #00ff88 100%)",

    // כפתורים - Buttons
    buttonPrimary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    buttonSecondary: "linear-gradient(135deg, #00ff88 0%, #00cc6b 100%)",
    buttonHover: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",

    // רקעים - Backgrounds
    cardGradient: "linear-gradient(145deg, #1a1a1a 0%, #242424 100%)",
    modalOverlay:
      "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 100%)",
  },

  // 🔴 Status colors - צבעי סטטוס
  status: {
    success: "#00ff88",
    successDark: "#00cc6b",
    error: "#ff4757",
    errorDark: "#ee5a6f",
    warning: "#ffa502",
    warningDark: "#ff7675",
    info: "#667eea",
    infoDark: "#5a67d8",
  },

  // 💪 Exercise categories - קטגוריות תרגילים
  categories: {
    strength: "#667eea",
    cardio: "#00ff88",
    flexibility: "#ffa502",
    balance: "#54a0ff",
    other: "#9e9e9e",
  },

  // 🏅 Achievement colors - צבעי הישגים
  achievements: {
    bronze: "#cd7f32",
    silver: "#c0c0c0",
    gold: "#ffd700",
    platinum: "#e5e4e2",
    diamond: "#b9f2ff",
  },

  // 📊 Chart colors - צבעי גרפים
  charts: {
    primary: "#667eea",
    secondary: "#00ff88",
    tertiary: "#ffa502",
    quaternary: "#54a0ff",
    grid: "rgba(255, 255, 255, 0.1)",
    text: "rgba(255, 255, 255, 0.7)",
  },

  // 🌟 Special effects - אפקטים מיוחדים
  effects: {
    glow: {
      purple: "rgba(102, 126, 234, 0.4)",
      green: "rgba(0, 255, 136, 0.4)",
      white: "rgba(255, 255, 255, 0.2)",
    },
    shadow: {
      dark: "rgba(0, 0, 0, 0.5)",
      light: "rgba(0, 0, 0, 0.2)",
      colored: "rgba(102, 126, 234, 0.3)",
    },
    blur: {
      dark: "rgba(10, 10, 10, 0.8)",
      light: "rgba(255, 255, 255, 0.1)",
    },
  },

  // 🎮 Interactive states - מצבים אינטראקטיביים
  states: {
    hover: "rgba(102, 126, 234, 0.1)",
    active: "rgba(102, 126, 234, 0.2)",
    disabled: "rgba(255, 255, 255, 0.1)",
    focus: "rgba(0, 255, 136, 0.3)",
  },

  // 🔤 Text colors - צבעי טקסט
  text: {
    primary: "#ffffff",
    secondary: "rgba(255, 255, 255, 0.8)",
    tertiary: "rgba(255, 255, 255, 0.6)",
    disabled: "rgba(255, 255, 255, 0.3)",
    accent: "#00ff88",
    inverse: "#0a0a0a",
  },
} as const;

// 🎯 Type-safe color getter - פונקציה לקבלת צבע בטוחה
export const getColor = (path: string): string => {
  const keys = path.split(".");
  let result: any = colors;

  for (const key of keys) {
    result = result[key];
    if (!result) {
      console.warn(`Color not found: ${path}`);
      return "#667eea"; // Fallback to primary
    }
  }

  return result;
};

// 💡 Common color combinations - שילובי צבעים נפוצים
export const colorCombos = {
  primaryButton: {
    background: colors.gradients.buttonPrimary,
    text: colors.text.primary,
    border: colors.primary[600],
  },
  secondaryButton: {
    background: colors.gradients.buttonSecondary,
    text: colors.dark[900],
    border: colors.secondary[500],
  },
  card: {
    background: colors.dark[700],
    border: colors.dark[500],
    text: colors.text.secondary,
  },
  input: {
    background: colors.dark[600],
    border: colors.dark[500],
    text: colors.text.primary,
    placeholder: colors.text.tertiary,
  },
} as const;

// 🌈 Export type for color keys - ייצוא טיפוס למפתחות צבע
export type ColorKeys = keyof typeof colors;
export type GradientKeys = keyof typeof colors.gradients;
