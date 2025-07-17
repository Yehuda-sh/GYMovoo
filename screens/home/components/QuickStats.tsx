/**
 * @file screens/home/components/QuickStats.tsx
 * @description קומפוננטה להצגת סטטיסטיקות מהירות במסך הבית
 * @author GYMoveo Development
 * @version 2.0.0
 *
 * @component QuickStats
 * @parent HomeScreen
 *
 * @notes
 * - מציג 4 סטטיסטיקות עיקריות
 * - אנימציות ספירה למספרים
 * - תמיכה במצב אורח/דמו
 * - תמיכה מלאה ב-RTL
 * - שימוש ב-unifiedDesignSystem
 *
 * @changelog
 * - v2.0.0: Updated to use unifiedDesignSystem + RTL support
 * - v1.0.1: Fixed routing and React hooks dependencies
 * - v1.0.0: Initial component creation
 */

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { memo, useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { rtlHelpers, rtlStyles } from "@/styles/theme/rtl";
import {
  unifiedBorderRadius,
  unifiedColors,
  unifiedShadows,
  unifiedSpacing,
  unifiedTypography,
} from "@/styles/theme/unifiedDesignSystem";

interface QuickStatsProps {
  stats: {
    workoutsThisWeek: number;
    currentStreak: number;
    minutesThisMonth: number;
    personalRecords: number;
  };
}

interface QuickStatProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: number;
  unit?: string;
  color: string;
  onPress: () => void;
}

const QuickStatCard = memo(
  ({ icon, label, value, unit, color, onPress }: QuickStatProps) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      // אנימציית כניסה
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: value,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]).start();
    }, [value, animatedValue, scaleAnim]);

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        friction: 4,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }).start();
    };

    return (
      <TouchableOpacity
        style={styles.statCard}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[styles.statContent, { transform: [{ scale: scaleAnim }] }]}
        >
          <View
            style={[styles.iconContainer, { backgroundColor: `${color}20` }]}
          >
            <Ionicons name={icon} size={24} color={color} />
          </View>
          <View style={styles.textContainer}>
            <View style={[rtlStyles.row, styles.valueRow]}>
              {value > 0 ? (
                <Animated.Text style={[rtlStyles.text, styles.statValue]}>
                  {Math.round(animatedValue._value)}
                </Animated.Text>
              ) : (
                <Text style={[rtlStyles.text, styles.statValue]}>0</Text>
              )}
              {unit && (
                <Text style={[rtlStyles.text, styles.statUnit]}>{unit}</Text>
              )}
            </View>
            <Text style={[rtlStyles.text, styles.statLabel]}>{label}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }
);

const QuickStats: React.FC<QuickStatsProps> = memo(({ stats }) => {
  const statsData = [
    {
      icon: "fitness-outline" as keyof typeof Ionicons.glyphMap,
      label: "אימונים השבוע",
      value: stats.workoutsThisWeek,
      color: unifiedColors.primary,
      onPress: () => router.push("/(tabs)/workouts"),
    },
    {
      icon: "flame-outline" as keyof typeof Ionicons.glyphMap,
      label: "רצף נוכחי",
      value: stats.currentStreak,
      unit: "ימים",
      color: unifiedColors.secondary,
      onPress: () => router.push("/(tabs)/progress"),
    },
    {
      icon: "time-outline" as keyof typeof Ionicons.glyphMap,
      label: "דקות החודש",
      value: stats.minutesThisMonth,
      unit: "דק'",
      color: unifiedColors.accent,
      onPress: () => router.push("/(tabs)/progress"),
    },
    {
      icon: "trophy-outline" as keyof typeof Ionicons.glyphMap,
      label: "שיאים אישיים",
      value: stats.personalRecords,
      color: unifiedColors.success,
      onPress: () => router.push("/(tabs)/progress"),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={[rtlStyles.row, styles.header]}>
        <Text style={[rtlStyles.text, styles.title]}>הסטטיסטיקות שלי</Text>
        <TouchableOpacity
          style={[rtlStyles.row, styles.viewAllButton]}
          onPress={() => router.push("/(tabs)/progress")}
        >
          <Text style={[rtlStyles.text, styles.viewAllText]}>צפה בהכל</Text>
          <Ionicons
            name={rtlHelpers.flipIcon("chevron-forward")}
            size={16}
            color={unifiedColors.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        {statsData.map((stat, index) => (
          <QuickStatCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            unit={stat.unit}
            color={stat.color}
            onPress={stat.onPress}
          />
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: unifiedSpacing.lg,
  },
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: unifiedSpacing.lg,
    marginBottom: unifiedSpacing.md,
  },
  title: {
    ...unifiedTypography.heading.h3,
    color: unifiedColors.text,
  },
  viewAllButton: {
    alignItems: "center",
    gap: unifiedSpacing.xs,
  },
  viewAllText: {
    ...unifiedTypography.body.medium,
    color: unifiedColors.primary,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: unifiedSpacing.md,
    gap: unifiedSpacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: unifiedColors.surface,
    borderRadius: unifiedBorderRadius.lg,
    ...unifiedShadows.small,
  },
  statContent: {
    padding: unifiedSpacing.lg,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: unifiedBorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: unifiedSpacing.sm,
  },
  textContainer: {
    flex: 1,
  },
  valueRow: {
    alignItems: "baseline",
    gap: unifiedSpacing.xs,
  },
  statValue: {
    ...unifiedTypography.heading.h2,
    color: unifiedColors.text,
  },
  statUnit: {
    ...unifiedTypography.body.small,
    color: unifiedColors.textSecondary,
  },
  statLabel: {
    ...unifiedTypography.body.small,
    color: unifiedColors.textSecondary,
    marginTop: unifiedSpacing.xs,
  },
});

QuickStatCard.displayName = "QuickStatCard";
QuickStats.displayName = "QuickStats";

export default QuickStats;
