/**
 * @file screens/home/components/WelcomeHeader.tsx
 * @description קומפוננטת כותרת ברוכים הבאים למסך הבית
 * @author GYMoveo Development
 * @version 2.0.0
 *
 * @component WelcomeHeader
 * @parent HomeScreen
 *
 * @notes
 * - מציג ברכה אישית למשתמש
 * - תמיכה במצב אורח ודמו
 * - ברכה דינמית לפי שעת היום
 * - תמיכה מלאה ב-RTL
 * - שימוש ב-unifiedDesignSystem
 *
 * @changelog
 * - v2.0.0: Updated to use unifiedDesignSystem + RTL support
 * - v1.0.1: Fixed gray color references
 * - v1.0.0: Initial component creation
 */

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { rtlStyles } from "@/styles/theme/rtl";
import {
  unifiedBorderRadius,
  unifiedColors,
  unifiedShadows,
  unifiedSpacing,
  unifiedTypography,
} from "@/styles/theme/unifiedDesignSystem";

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
      <View style={[rtlStyles.row, styles.content]}>
        <View style={rtlStyles.column}>
          <Text style={[rtlStyles.text, styles.greeting]}>
            {getGreeting()},
          </Text>
          <View style={[rtlStyles.row, styles.nameRow]}>
            <Text style={[rtlStyles.text, styles.userName]}>{userName}</Text>
            {isGuest && (
              <Text style={[rtlStyles.text, styles.badge]}>אורח</Text>
            )}
            {isDemo && <Text style={[rtlStyles.text, styles.badge]}>דמו</Text>}
          </View>
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={onProfilePress}
          activeOpacity={0.7}
        >
          <View style={styles.profileIconContainer}>
            <Ionicons name="person" size={24} color={unifiedColors.primary} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Motivational message */}
      <Text style={[rtlStyles.text, styles.motivationalText]}>
        {isGuest ? "התחל את המסע שלך לכושר מושלם! 💪" : "בוא נעשה את זה! 🔥"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: unifiedSpacing.lg,
    paddingTop: unifiedSpacing.xl,
  },
  content: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: unifiedSpacing.md,
  },
  greeting: {
    ...unifiedTypography.body.small,
    color: unifiedColors.textSecondary,
    marginBottom: unifiedSpacing.xs,
  },
  nameRow: {
    alignItems: "center",
    gap: unifiedSpacing.sm,
  },
  userName: {
    ...unifiedTypography.heading.h2,
    color: unifiedColors.text,
  },
  badge: {
    ...unifiedTypography.caption.medium,
    color: unifiedColors.background,
    backgroundColor: unifiedColors.primary,
    paddingHorizontal: unifiedSpacing.sm,
    paddingVertical: unifiedSpacing.xs,
    borderRadius: unifiedBorderRadius.md,
    overflow: "hidden",
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: unifiedBorderRadius.full,
    backgroundColor: unifiedColors.surface,
    justifyContent: "center",
    alignItems: "center",
    ...unifiedShadows.small,
  },
  profileIconContainer: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  motivationalText: {
    ...unifiedTypography.body.medium,
    color: unifiedColors.textSecondary,
    lineHeight: 22,
  },
});

WelcomeHeader.displayName = "WelcomeHeader";

export default WelcomeHeader;
