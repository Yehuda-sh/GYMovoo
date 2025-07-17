/**
 * @file screens/home/components/WelcomeHeader.tsx
 * @description קומפוננטת כותרת ברוכים הבאים למסך הבית
 * @author GYMoveo Development
 * @version 2.0.1
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
 * - תוקן: כל בעיות TypeScript
 *
 * @changelog
 * - v2.0.1: Fixed TypeScript errors with proper type access
 * - v2.0.0: Updated to use unifiedDesignSystem + RTL support
 * - v1.0.1: Fixed gray color references
 * - v1.0.0: Initial component creation
 */

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import {
  unifiedBorderRadius,
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
      <View style={[styles.row, styles.content]}>
        <View style={styles.column}>
          <Text style={[styles.textRtl, styles.greeting]}>
            {getGreeting()},
          </Text>
          <View style={[styles.row, styles.nameRow]}>
            <Text style={[styles.textRtl, styles.userName]}>{userName}</Text>
            {isGuest && (
              <Text style={[styles.textRtl, styles.badge]}>אורח</Text>
            )}
            {isDemo && <Text style={[styles.textRtl, styles.badge]}>דמו</Text>}
          </View>
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={onProfilePress}
          activeOpacity={0.7}
        >
          <View style={styles.profileIconContainer}>
            <Ionicons name="person" size={24} color="#0ea5e9" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Motivational message */}
      <Text style={[styles.textRtl, styles.motivationalText]}>
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
  // RTL styles
  row: {
    flexDirection: "row-reverse",
  } as ViewStyle,
  column: {
    flexDirection: "column",
  } as ViewStyle,
  textRtl: {
    textAlign: "right",
    writingDirection: "rtl",
  } as TextStyle,
  content: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: unifiedSpacing.md,
  },
  greeting: {
    fontSize: unifiedTypography.sizes.sm,
    fontWeight: unifiedTypography.weights.regular,
    color: "#6b7280",
    marginBottom: unifiedSpacing.xs,
  },
  nameRow: {
    alignItems: "center",
    gap: unifiedSpacing.sm,
  },
  userName: {
    fontSize: unifiedTypography.sizes.xl,
    fontWeight: unifiedTypography.weights.bold,
    color: "#1f2937",
  },
  badge: {
    fontSize: unifiedTypography.sizes.xs,
    fontWeight: unifiedTypography.weights.medium,
    color: "#ffffff",
    backgroundColor: "#0ea5e9",
    paddingHorizontal: unifiedSpacing.sm,
    paddingVertical: unifiedSpacing.xs,
    borderRadius: unifiedBorderRadius.md,
    overflow: "hidden",
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: unifiedBorderRadius.full,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  profileIconContainer: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  motivationalText: {
    fontSize: unifiedTypography.sizes.md,
    fontWeight: unifiedTypography.weights.medium,
    color: "#6b7280",
    lineHeight: 22,
  },
});

WelcomeHeader.displayName = "WelcomeHeader";

export default WelcomeHeader;
