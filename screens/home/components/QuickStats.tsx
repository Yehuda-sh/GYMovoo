/**
 * @file screens/home/components/QuickStats.tsx
 * @description קומפוננטה להצגת סטטיסטיקות מהירות במסך הבית
 * @author GYMoveo Development
 * @version 2.0.1
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
 * - תוקן: ממשק נכון לHomeScreen
 *
 * @changelog
 * - v2.0.1: Fixed interface to match HomeScreen usage
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

// תיקון: ממשק נכון לפי השימוש ב-HomeScreen
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
            <View style={[styles.row, styles.valueRow]}>
              {value > 0 ? (
                <Animated.Text style={[styles.textRtl, styles.statValue]}>
                  {Math.round(value)}
                </Animated.Text>
              ) : (
                <Text style={[styles.textRtl, styles.statValue]}>0</Text>
              )}
              {unit && (
                <Text style={[styles.textRtl, styles.statUnit]}>{unit}</Text>
              )}
            </View>
            <Text style={[styles.textRtl, styles.statLabel]}>{label}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }
);

const QuickStats = memo(({ stats }: QuickStatsProps) => {
  const handleViewAll = () => {
    router.push("/");
  };

  const handleStatPress = (statType: string) => {
    // זמנית - נווט למסך הבית
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.textRtl, styles.title]}>הסטטיסטיקות שלך</Text>
        <TouchableOpacity
          style={[styles.row, styles.viewAllButton]}
          onPress={handleViewAll}
        >
          <Text style={[styles.textRtl, styles.viewAllText]}>הצג הכל</Text>
          <Ionicons name="chevron-back" size={16} color="#0ea5e9" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        <QuickStatCard
          icon="fitness-outline"
          label="אימונים השבוע"
          value={stats.workoutsThisWeek}
          color="#4ade80"
          onPress={() => handleStatPress("workouts")}
        />
        <QuickStatCard
          icon="flame-outline"
          label="רצף נוכחי"
          value={stats.currentStreak}
          unit="ימים"
          color="#f59e0b"
          onPress={() => handleStatPress("streak")}
        />
        <QuickStatCard
          icon="time-outline"
          label="דקות החודש"
          value={stats.minutesThisMonth}
          unit="דק'"
          color="#06b6d4"
          onPress={() => handleStatPress("minutes")}
        />
        <QuickStatCard
          icon="trophy-outline"
          label="שיאים אישיים"
          value={stats.personalRecords}
          color="#8b5cf6"
          onPress={() => handleStatPress("records")}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: unifiedSpacing.xl,
  },
  // RTL styles
  row: {
    flexDirection: "row-reverse",
  } as ViewStyle,
  textRtl: {
    textAlign: "right",
    writingDirection: "rtl",
  } as TextStyle,
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: unifiedSpacing.lg,
    marginBottom: unifiedSpacing.md,
  },
  title: {
    fontSize: unifiedTypography.sizes.lg,
    fontWeight: unifiedTypography.weights.semibold,
    color: "#1f2937",
  },
  viewAllButton: {
    alignItems: "center",
    gap: unifiedSpacing.xs,
  },
  viewAllText: {
    fontSize: unifiedTypography.sizes.sm,
    fontWeight: unifiedTypography.weights.medium,
    color: "#0ea5e9",
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
    backgroundColor: "#f9fafb",
    borderRadius: unifiedBorderRadius.lg,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
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
    fontSize: unifiedTypography.sizes.xl,
    fontWeight: unifiedTypography.weights.bold,
    color: "#1f2937",
  },
  statUnit: {
    fontSize: unifiedTypography.sizes.sm,
    fontWeight: unifiedTypography.weights.regular,
    color: "#6b7280",
  },
  statLabel: {
    fontSize: unifiedTypography.sizes.sm,
    fontWeight: unifiedTypography.weights.regular,
    color: "#6b7280",
    marginTop: unifiedSpacing.xs,
  },
});

QuickStatCard.displayName = "QuickStatCard";
QuickStats.displayName = "QuickStats";

export default QuickStats;
