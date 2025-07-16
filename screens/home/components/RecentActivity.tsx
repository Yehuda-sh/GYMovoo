/**
 * @file screens/home/components/RecentActivity.tsx
 * @description קומפוננטה להצגת הפעילות האחרונה של המשתמש
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @component RecentActivity
 * @parent HomeScreen
 *
 * @notes
 * - מציג רשימת אימונים אחרונים
 * - כולל גרף התקדמות שבועי
 * - תומך במצב אורח (הצגת דמו)
 *
 * @changelog
 * - v1.0.0: Initial component creation
 */

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { memo, useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useIsGuest } from "@/lib/stores/userStore";
import theme from "@/styles/theme";
const { colors, spacing, borderRadius, shadows, fontSizes, fontWeights } =
  theme;

const { width: screenWidth } = Dimensions.get("window");

interface Activity {
  id: string;
  date: Date;
  type: string;
  duration: number;
  calories: number;
  name: string;
}

interface WeeklyData {
  day: string;
  value: number;
  date: Date;
}

const RecentActivity = memo(() => {
  // 🏪 Store hooks
  const isGuest = useIsGuest();

  // 📊 Local state
  const [activities, setActivities] = useState<Activity[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  // 🎭 אנימציות
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // 📥 טעינת נתונים
  useEffect(() => {
    // דמו דאטה
    const demoActivities: Activity[] = [
      {
        id: "1",
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        type: "strength",
        duration: 45,
        calories: 320,
        name: "אימון כוח - פלג גוף עליון",
      },
      {
        id: "2",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        type: "cardio",
        duration: 30,
        calories: 280,
        name: 'ריצה - 5 ק"מ',
      },
      {
        id: "3",
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        type: "strength",
        duration: 50,
        calories: 350,
        name: "אימון רגליים",
      },
    ];

    // נתונים שבועיים
    const weekData: WeeklyData[] = [];
    const days = ["ש", "ו", "ה", "ד", "ג", "ב", "א"];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      weekData.push({
        day: days[6 - i],
        value: Math.random() > 0.3 ? Math.floor(Math.random() * 60) + 20 : 0,
        date: date,
      });
    }

    setActivities(isGuest ? [] : demoActivities);
    setWeeklyData(weekData);
  }, [isGuest]);

  // 🎨 אייקון לפי סוג אימון
  const getActivityIcon = (type: string) => {
    const icons = {
      strength: "barbell",
      cardio: "bicycle",
      yoga: "body",
      sports: "basketball",
    };
    return icons[type as keyof typeof icons] || "fitness";
  };

  // 📅 פורמט תאריך
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "היום";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "אתמול";
    } else {
      return date.toLocaleDateString("he-IL", {
        day: "numeric",
        month: "short",
      });
    }
  };

  // 📊 חישוב גובה עמודה
  const getBarHeight = (value: number) => {
    const maxValue = Math.max(...weeklyData.map((d) => d.value), 1);
    return (value / maxValue) * 60;
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {/* כותרת */}
      <View style={styles.header}>
        <Text style={styles.title}>פעילות אחרונה</Text>
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

      {/* גרף שבועי */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>השבוע שלך</Text>
        <View style={styles.chart}>
          {weeklyData.map((data, index) => (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barWrapper}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: getBarHeight(data.value),
                      backgroundColor:
                        data.value > 0 ? colors.primary[500] : colors.gray[300],
                    },
                  ]}
                />
              </View>
              <Text style={styles.dayLabel}>{data.day}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* רשימת פעילויות */}
      {isGuest ? (
        <TouchableOpacity
          style={styles.guestPrompt}
          onPress={() => router.push("/(auth)/signup")}
        >
          <LinearGradient
            colors={[colors.primary[50], colors.primary[100]]}
            style={styles.guestCard}
          >
            <Ionicons
              name="lock-closed"
              size={24}
              color={colors.primary[600]}
            />
            <Text style={styles.guestTitle}>הצג את ההיסטוריה שלך</Text>
            <Text style={styles.guestText}>
              הירשם כדי לעקוב אחר ההתקדמות והאימונים שלך
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.activitiesScroll}
        >
          {activities.map((activity, index) => (
            <TouchableOpacity
              key={activity.id}
              style={styles.activityCard}
              onPress={() => router.push(`/workouts/history/${activity.id}`)}
              activeOpacity={0.8}
            >
              <View style={styles.activityIcon}>
                <Ionicons
                  name={getActivityIcon(activity.type) as any}
                  size={24}
                  color={colors.primary[600]}
                />
              </View>

              <View style={styles.activityContent}>
                <Text style={styles.activityName} numberOfLines={1}>
                  {activity.name}
                </Text>
                <Text style={styles.activityDate}>
                  {formatDate(activity.date)}
                </Text>

                <View style={styles.activityStats}>
                  <View style={styles.statChip}>
                    <Ionicons
                      name="time-outline"
                      size={14}
                      color={colors.gray[600]}
                    />
                    <Text style={styles.statValue}>
                      {activity.duration}ד&apos;
                    </Text>
                  </View>
                  <View style={styles.statChip}>
                    <Ionicons
                      name="flame-outline"
                      size={14}
                      color={colors.gray[600]}
                    />
                    <Text style={styles.statValue}>{activity.calories}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {activities.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>עדיין אין פעילויות</Text>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => router.push("/workouts")}
              >
                <Text style={styles.startButtonText}>התחל להתאמן</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </Animated.View>
  );
});

RecentActivity.displayName = "RecentActivity";

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
  chartContainer: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  chartTitle: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.gray[700],
    marginBottom: spacing.md,
  },
  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 80,
  },
  barContainer: {
    flex: 1,
    alignItems: "center",
  },
  barWrapper: {
    height: 60,
    justifyContent: "flex-end",
    marginBottom: spacing.xs,
  },
  bar: {
    width: (screenWidth - spacing.lg * 4 - spacing.sm * 6) / 7,
    borderRadius: borderRadius.xs,
    minHeight: 4,
  },
  dayLabel: {
    fontSize: fontSizes.xs,
    color: colors.gray[600],
    fontWeight: fontWeights.medium,
  },
  guestPrompt: {
    marginHorizontal: spacing.lg,
  },
  guestCard: {
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: "center",
  },
  guestTitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semiBold,
    color: colors.primary[700],
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  guestText: {
    fontSize: fontSizes.sm,
    color: colors.primary[600],
    textAlign: "center",
  },
  activitiesScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  activityCard: {
    backgroundColor: colors.light[50],
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    width: 160,
    ...shadows.sm,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[100],
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityName: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semiBold,
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  activityDate: {
    fontSize: fontSizes.xs,
    color: colors.gray[500],
    marginBottom: spacing.sm,
  },
  activityStats: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  statChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.gray[100],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  statValue: {
    fontSize: fontSizes.xs,
    color: colors.gray[700],
    fontWeight: fontWeights.medium,
  },
  emptyState: {
    width: screenWidth - spacing.lg * 2,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    fontSize: fontSizes.md,
    color: colors.gray[500],
    marginBottom: spacing.md,
  },
  startButton: {
    backgroundColor: colors.primary[500],
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  startButtonText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semiBold,
    color: colors.light[50],
  },
});

export default RecentActivity;
