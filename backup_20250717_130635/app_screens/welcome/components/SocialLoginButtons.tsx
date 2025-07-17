// app/screens/welcome/components/SocialLoginButtons.tsx
import {
  borderRadius,
  colors,
  shadows,
  spacing,
  typography,
} from "@/app/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SocialLoginButtonsProps } from "../types";

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  onGoogleLogin,
  onAppleLogin,
  fadeAnim,
  loading,
}) => {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      {/* קו מפריד */}
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>או</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* כפתורי רשתות חברתיות */}
      <View style={styles.socialButtons}>
        {/* Google */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={onGoogleLogin}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Ionicons name="logo-google" size={24} color={colors.text} />
          )}
        </TouchableOpacity>

        {/* Apple */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={onAppleLogin}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Ionicons name="logo-apple" size={24} color={colors.text} />
          )}
        </TouchableOpacity>

        {/* Facebook (אופציונלי) */}
        <TouchableOpacity
          style={styles.socialButton}
          activeOpacity={0.8}
          disabled={loading}
        >
          <Ionicons name="logo-facebook" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: spacing.xl,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.md,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
});

export default SocialLoginButtons;
