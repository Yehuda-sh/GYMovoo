/**
 * @file screens/home/components/QuickStats.tsx
 * @description קומפוננטה להצגת סטטיסטיקות מהירות במסך הבית
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @component QuickStats
 * @parent HomeScreen
 *
 * @notes
 * - מציג 4 סטטיסטיקות עיקריות
 * - אנימציות ספירה
 * - תמיכה במצב אורח
 *
 * @changelog
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

import theme from "@/styles/theme";
const { colors, spacing, borderRadius, shadows, fontSizes, fontWeights } =
  theme;

interface QuickStatProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: number | string;
  unit?: string;
  color: string;
  onPress?: () => void;
}

interface QuickStatsProps {
  stats: {
    workoutsThisWeek: number;
    currentStreak: number;
    minutesThisMonth: number;
    personalRecords: number;
  };
}

const QuickStatCard = memo(
  ({ icon, label, value, unit, color, onPress }: QuickStatProps) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    // אנימציית ספירה
    useEffect(() => {
      if (typeof value === "number") {
        Animated.timing(animatedValue, {
          toValue: value,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      }
    }, [value]);

    // אנימציית לחיצה
    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        friction: 4,
        tension: 300,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 300,
        useNativeDriver: true,
      }).start();
    };

    return (
      <TouchableOpacity
        style={styles.statCard}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
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
            <View style={styles.valueRow}>
              {typeof value === "number" ? (
                <Animated.Text style={styles.statValue}>
                  {
                    animatedValue
                      .interpolate({
                        inputRange: [0, value],
                        outputRange: ["0", value.toString()],
                      })
                      .toString()
                      .split(".")[0]
                  }
                </Animated.Text>
              ) : (
                <Text style={styles.statValue}>{value}</Text>
              )}
              {unit && <Text style={styles.statUnit}>{unit}</Text>}
            </View>
            <Text style={styles.statLabel}>{label}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }
);

QuickStatCard.displayName = "QuickStatCard";

const QuickStats = memo(({ stats }: QuickStatsProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const statItems: QuickStatProps[] = [
    {
      icon: "barbell",
      label: "אימונים השבוע",
      value: stats.workoutsThisWeek,
      color: colors.primary[500],
      onPress: () => router.push("/workouts"),
    },
    {
      icon: "flame",
      label: "רצף נוכחי",
      value: stats.currentStreak,
      unit: "ימים",
      color: colors.error[500],
      onPress: () => router.push("/progress"),
    },
    {
      icon: "time",
      label: "דקות החודש",
      value: stats.minutesThisMonth,
      color: colors.success[500],
      onPress: () => router.push("/progress"),
    },
    {
      icon: "trophy",
      label: "שיאים אישיים",
      value: stats.personalRecords,
      color: colors.warning[500],
      onPress: () => router.push("/progress"),
    },
  ];

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Text style={styles.title}>הסטטיסטיקות שלך</Text>
        <TouchableOpacity
          onPress={() => router.push("/progress")}
          style={styles.viewAllButton}
        >
          <Text style={styles.viewAllText}>הצג הכל</Text>
          <Ionicons
            name="chevron-forward"
            size={16}
            color={colors.primary[500]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        {statItems.map((stat, index) => (
          <QuickStatCard key={index} {...stat} />
        ))}
      </View>
    </Animated.View>
  );
});

QuickStats.displayName = "QuickStats";

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    color: colors.gray[900],
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  viewAllText: {
    fontSize: fontSizes.sm,
    color: colors.primary[500],
    fontWeight: fontWeights.medium,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: colors.light[50],
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  statContent: {
    padding: spacing.lg,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  textContainer: {
    flex: 1,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: spacing.xs,
  },
  statValue: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
    color: colors.gray[900],
  },
  statUnit: {
    fontSize: fontSizes.sm,
    color: colors.gray[600],
    fontWeight: fontWeights.regular,
  },
  statLabel: {
    fontSize: fontSizes.sm,
    color: colors.gray[600],
    marginTop: spacing.xs,
  },
});

export default QuickStats;
