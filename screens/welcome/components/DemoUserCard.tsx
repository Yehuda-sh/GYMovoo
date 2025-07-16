/**
 * @file screens/welcome/components/DemoUserCard.tsx
 * @description כרטיס להצגת משתמש דמו בפאנל הפיתוח
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @component DemoUserCard
 * @parent DevPanel
 *
 * @notes
 * - הצגת פרטי משתמש דמו
 * - תרגום רמות ומטרות לעברית
 * - אייקונים מתאימים לכל רמה/מטרה
 * - תמיכה במצב disabled
 *
 * @changelog
 * - v1.0.0: Initial creation
 */

import React, { memo, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { theme } from "@/styles/theme";

const { colors, spacing, fontSizes, fontWeights, borderRadius } = theme;

// מפות תרגום
const LEVEL_TRANSLATIONS: Record<string, string> = {
  beginner: "מתחיל",
  intermediate: "ביניים",
  advanced: "מתקדם",
};

const GOAL_TRANSLATIONS: Record<string, string> = {
  build_muscle: "בניית שריר",
  lose_weight: "ירידה במשקל",
  get_stronger: "חיזוק",
  general_fitness: "כושר כללי",
};

// אייקונים לרמות
const LEVEL_ICONS: Record<string, string> = {
  beginner: "🌱",
  intermediate: "💪",
  advanced: "🔥",
};

// אייקונים למטרות
const GOAL_ICONS: Record<string, string> = {
  build_muscle: "🏋️",
  lose_weight: "⚖️",
  get_stronger: "💯",
  general_fitness: "🎯",
};

interface DemoUserCardProps {
  user: any;
  onPress: (user: any) => void;
  disabled?: boolean;
}

export const DemoUserCard: React.FC<DemoUserCardProps> = memo(
  ({ user, onPress, disabled = false }) => {
    // תרגומים ואייקונים
    const levelText = LEVEL_TRANSLATIONS[user.level] || user.level;
    const goalText = GOAL_TRANSLATIONS[user.goal] || user.goal;
    const levelIcon = LEVEL_ICONS[user.level] || "📊";
    const goalIcon = GOAL_ICONS[user.goal] || "🎯";

    // סגנון דינמי לפי סטטוס
    const containerStyle = useMemo((): ViewStyle[] => {
      const styleArray: ViewStyle[] = [
        styles.devButton,
        { backgroundColor: user.color || colors.dark[600] },
      ];

      if (disabled) {
        styleArray.push(styles.disabledButton);
      }

      return styleArray;
    }, [user.color, disabled]);

    // אווטאר ראשי תיבות אם אין תמונה
    const initials = useMemo(() => {
      return user.name
        .split(" ")
        .map((word: string) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }, [user.name]);

    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={() => onPress(user)}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {/* אווטאר */}
        <View style={styles.avatarContainer}>
          {user.avatar ? (
            <Text style={styles.avatarEmoji}>{user.avatar}</Text>
          ) : (
            <View
              style={[
                styles.avatarPlaceholder,
                { backgroundColor: user.color || colors.primary[600] },
              ]}
            >
              <Text style={styles.avatarInitials}>{initials}</Text>
            </View>
          )}
        </View>

        {/* פרטים אישיים */}
        <View style={styles.infoContainer}>
          <Text style={styles.demoButtonText} numberOfLines={1}>
            {user.name}
          </Text>
          <Text style={styles.demoButtonSubtext} numberOfLines={1}>
            {user.email}
          </Text>
        </View>

        {/* מידע נוסף */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>{levelIcon}</Text>
            <Text style={styles.demoButtonDetails}>{levelText}</Text>
          </View>
          <View style={styles.detailDivider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>{goalIcon}</Text>
            <Text style={styles.demoButtonDetails}>{goalText}</Text>
          </View>
        </View>

        {/* תג גיל */}
        {user.age && (
          <View style={styles.ageTag}>
            <Text style={styles.ageText}>{user.age}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
);

DemoUserCard.displayName = "DemoUserCard";

const styles = StyleSheet.create({
  devButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    minHeight: 80,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  disabledButton: {
    opacity: 0.6,
  },
  avatarContainer: {
    marginRight: spacing.md,
  },
  avatarEmoji: {
    fontSize: 32,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },
  avatarInitials: {
    color: colors.light[50],
    fontSize: fontSizes.md,
    fontWeight: fontWeights.bold,
  },
  infoContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  demoButtonText: {
    color: colors.light[50],
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semiBold,
    marginBottom: spacing.xxs,
  },
  demoButtonSubtext: {
    color: colors.light[300],
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  detailIcon: {
    fontSize: fontSizes.xs,
  },
  demoButtonDetails: {
    color: colors.light[400],
    fontSize: fontSizes.xxs,
    fontWeight: fontWeights.medium,
  },
  detailDivider: {
    width: 1,
    height: 12,
    backgroundColor: colors.light[600],
    marginHorizontal: spacing.sm,
    opacity: 0.3,
  },
  ageTag: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.xs,
  },
  ageText: {
    color: colors.light[500],
    fontSize: fontSizes.xxs,
    fontWeight: fontWeights.semiBold,
  },
});

export default DemoUserCard;
