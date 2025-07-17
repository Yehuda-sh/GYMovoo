// app/screens/welcome/components/GuestButton.tsx
import { colors, spacing, typography } from "@/app/styles/theme";
import React from "react";
import { Platform, Text, TouchableOpacity } from "react-native";
import { GuestButtonProps } from "../types";

const GuestButton: React.FC<GuestButtonProps> = ({ onGuestLogin }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onGuestLogin}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>המשך כאורח</Text>
    </TouchableOpacity>
  );
};

const styles = {
  button: {
    position: "absolute" as const,
    bottom: Platform.OS === "ios" ? 50 : 30,
    alignSelf: "center" as const,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  buttonText: {
    fontSize: typography.fontSize.md,
    color: colors.textMuted,
    textDecorationLine: "underline" as const,
  },
};

export default GuestButton;
