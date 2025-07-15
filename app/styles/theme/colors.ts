// styles/theme/colors.ts
export const colors = {
  // צבעי גרדיאנט ראשיים
  gradients: {
    primary: ["#667eea", "#764ba2"] as [string, string],
    secondary: ["#764ba2", "#667eea"] as [string, string],
    background: ["#0f0c29", "#302b63", "#24243e"] as [string, string, string],
    dark: ["#1a1a2e", "#16213e", "#0f3460"] as [string, string, string],
    overlay: ["#000000", "#130F40"] as [string, string],
    success: ["#00ff88", "#00d68f"] as [string, string],
    error: ["#ff3366", "#ff5252"] as [string, string],
    warning: ["#FFD23F", "#FFB74D"] as [string, string],
    accent: ["#00ff88", "#00b248"] as [string, string],
  },

  // צבעים בודדים
  primary: "#667eea",
  secondary: "#764ba2",
  accent: "#00ff88",

  // רקעים
  background: "#0f0c29",
  surface: "rgba(0, 0, 0, 0.3)",
  surfaceLight: "rgba(255, 255, 255, 0.05)",
  surfaceElevated: "rgba(0, 0, 0, 0.4)",

  // טקסט
  text: "#ffffff",
  textSecondary: "rgba(255, 255, 255, 0.8)",
  textMuted: "rgba(255, 255, 255, 0.5)",
  textDisabled: "rgba(255, 255, 255, 0.3)",

  // מצבים
  error: "#ff3366",
  success: "#00ff88",
  warning: "#FFD23F",
  info: "#667eea",

  // גבולות
  border: "rgba(255, 255, 255, 0.2)",
  borderLight: "rgba(255, 255, 255, 0.1)",
  borderActive: "#667eea",
  borderError: "#ff3366",

  // אינפוטים
  inputBackground: "rgba(0, 0, 0, 0.4)",
  inputBorder: "rgba(102, 126, 234, 0.4)",
  inputBorderActive: "#667eea",
  inputBorderError: "#ff3366",

  // אפקטים
  glow: "rgba(102, 126, 234, 0.3)",
  shadow: "rgba(0, 0, 0, 0.5)",
  overlay: "rgba(0, 0, 0, 0.8)",
  overlayLight: "rgba(0, 0, 0, 0.6)",

  // צבעים ייחודיים לכושר
  workoutActive: "#00ff88",
  workoutCompleted: "#00b248",
  workoutSkipped: "#757575",
  exerciseCardio: "#FF6B35",
  exerciseStrength: "#667eea",
  exerciseFlexibility: "#8B5CF6",
} as const;
