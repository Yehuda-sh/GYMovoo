// styles/theme/typography.ts
import { Platform } from "react-native";

export const typography = {
  fontFamily: {
    primary: Platform.OS === "ios" ? "System" : "Roboto",
    secondary: Platform.OS === "ios" ? "Avenir" : "sans-serif",
    mono: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    display: 32,
  },
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    heavy: "800" as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
} as const;
