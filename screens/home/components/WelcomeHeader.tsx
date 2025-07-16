/**
 * @file screens/home/components/WelcomeHeader.tsx
 * @description קומפוננטת כותרת ברוכים הבאים למסך הבית
 * @author GYMoveo Development
 * @version 1.0.1
 *
 * @component WelcomeHeader
 * @parent HomeScreen
 *
 * @notes
 * - מציג ברכה אישית למשתמש
 * - תמיכה במצב אורח ודמו
 * - ברכה דינמית לפי שעת היום
 * - תוקן: החלפת gray לצבעים קיימים
 *
 * @changelog
 * - v1.0.0: Initial component creation
 * - v1.0.1: Fixed gray color references
 */

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import theme from "@/styles/theme";

const { colors, spacing, borderRadius, shadows, fontSizes, fontWeights } =
  theme;

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
            <Ionicons name="person" size={24} color={colors.primary[500]} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Motivational message */}
      <Text style={styles.motivationalText}>
        {isGuest ? "התחל את המסע שלך לכושר מושלם! 💪" : "בוא נעשה את זה! 🔥"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  greeting: {
    fontSize: fontSizes.sm,
    color: colors.dark[600],
    marginBottom: spacing.xs,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  userName: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
    color: colors.dark[900],
  },
  badge: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    color: colors.light[50],
    backgroundColor: colors.primary[500],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    overflow: "hidden",
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.light[100],
    justifyContent: "center",
    alignItems: "center",
    ...shadows.sm,
  },
  profileIconContainer: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  motivationalText: {
    fontSize: fontSizes.md,
    color: colors.dark[700],
    fontWeight: fontWeights.regular,
    lineHeight: 22,
  },
});

export default WelcomeHeader;
