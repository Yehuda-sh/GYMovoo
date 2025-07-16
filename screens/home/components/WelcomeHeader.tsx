/**
 * 📁 Path: /screens/home/components/WelcomeHeader.tsx
 * 📝 Description: Welcome header component - קומפוננטת כותרת ברוכים הבאים
 * 📅 Last Modified: 2024-01-XX 14:30
 *
 * 🔗 Dependencies:
 * - /styles/theme
 */

import {
  borderRadius,
  colors,
  shadows,
  spacing,
  typography,
} from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface WelcomeHeaderProps {
  userName: string;
  isGuest: boolean;
  isDemo: boolean;
  onProfilePress: () => void;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({
  userName,
  isGuest,
  isDemo,
  onProfilePress,
}) => {
  // 🕐 Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "בוקר טוב";
    if (hour < 17) return "צהריים טובים";
    return "ערב טוב";
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text style={styles.greeting}>{getGreeting()},</Text>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{userName}</Text>
            {isGuest && <Text style={styles.badge}>אורח</Text>}
            {isDemo && <Text style={styles.badge}>דמו</Text>}
          </View>
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={onProfilePress}
          activeOpacity={0.7}
        >
          <View style={styles.profileIconContainer}>
            <Ionicons name="person" size={24} color={colors.primary} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Motivational message */}
      <Text style={styles.motivationalText}>
        {isGuest
          ? "התחל את המסע שלך לכושר מושלם! 💪"
          : "בוא נעשה את זה! היום יום מצוין לאימון 🔥"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  greeting: {
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  userName: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  badge: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary,
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.sm,
    overflow: "hidden",
  },
  profileButton: {
    padding: spacing.xs,
  },
  profileIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.sm,
  },
  motivationalText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    lineHeight: typography.fontSize.md * typography.lineHeight.relaxed,
  },
});

export default WelcomeHeader;
