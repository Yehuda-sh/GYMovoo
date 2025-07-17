// app/screens/welcome/components/ActionButtons.tsx
import {
  borderRadius,
  colors,
  shadows,
  spacing,
  typography,
} from "@/app/styles/theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { ActionButtonsProps } from "../types";

const ActionButtons: React.FC<ActionButtonsProps> = ({
  buttonsSlide,
  onLogin,
  onSignup,
  fadeAnim,
}) => {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: buttonsSlide }],
        },
      ]}
    >
      {/* כפתור התחברות */}
      <TouchableOpacity onPress={onLogin} activeOpacity={0.8}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.primaryButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.primaryButtonText}>התחבר</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* כפתור הרשמה */}
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={onSignup}
        activeOpacity={0.8}
      >
        <Text style={styles.secondaryButtonText}>צור חשבון חדש</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%" as const,
    marginBottom: spacing.xl,
  } as ViewStyle,
  primaryButton: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: "center" as const,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  primaryButtonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold as const,
    color: colors.text,
  },
  secondaryButton: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: "center" as const,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold as const,
    color: colors.text,
  },
});

export default ActionButtons;
