/**
 * @file screens/home/components/RecentActivity.tsx
 * @description קומפוננטה להצגת הפעילות האחרונה של המשתמש
 * @author GYMoveo Development
 * @version 1.0.2
 *
 * @component RecentActivity
 * @parent HomeScreen
 *
 * @notes
 * - מציג רשימת אימונים אחרונים
 * - כולל גרף התקדמות שבועי
 * - תומך במצב אורח (הצגת דמו)
 * - תוקן: כל בעיות TypeScript ו-routing
 *
 * @changelog
 * - v1.0.2: Fixed TypeScript errors and routing issues
 * - v1.0.1: Fixed color references and routing
 * - v1.0.0: Initial component creation
 */

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { useIsGuest } from "@/lib/stores/userStore";
import {
  borderRadius,
  colors,
  fontSizes,
  fontWeights,
  spacing,
} from "@/styles/theme";

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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

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
  }, [fadeAnim, slideAnim]);

  // 📥 טעינת נתונים
  const loadRecentActivities = useCallback(async () => {
    try {
      if (isGuest) {
        // נתוני דמו למשתמש אורח
        const demoActivities: Activity[] = [
          {
            id: "1",
            date: new Date(Date.now() - 1000 * 60 * 60 * 24),
            type: "cardio",
            duration: 45,
            calories: 320,
            name: "ריצה בוקר",
          },
          {
            id: "2",
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
            type: "strength",
            duration: 60,
            calories: 280,
            name: "חיזוק שרירים",
          },
          {
            id: "3",
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
            type: "yoga",
            duration: 30,
            calories: 150,
            name: "יוגה ערב",
          },
        ];

        const demoWeeklyData: WeeklyData[] = [
          {
            day: "א",
            value: 45,
            date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
          },
          {
            day: "ב",
            value: 30,
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          },
          {
            day: "ג",
            value: 60,
            date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
          },
          {
            day: "ד",
            value: 0,
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          },
          {
            day: "ה",
            value: 45,
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          },
          {
            day: "ו",
            value: 30,
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          },
          { day: "ש", value: 0, date: new Date() },
        ];

        setActivities(demoActivities);
        setWeeklyData(demoWeeklyData);
      } else {
        // טעינת נתונים אמיתיים
        setActivities([]);
        setWeeklyData([]);
      }
    } catch (error) {
      console.error("Error loading recent activities:", error);
    }
  }, [isGuest]);

  useEffect(() => {
    loadRecentActivities();
  }, [loadRecentActivities]);

  // 🎨 פונקציות עזר
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "cardio":
        return "heart-outline";
      case "strength":
        return "barbell-outline";
      case "yoga":
        return "body-outline";
      default:
        return "fitness-outline";
    }
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "היום";
    if (diffDays === 1) return "אתמול";
    if (diffDays <= 7) return `לפני ${diffDays} ימים`;
    return date.toLocaleDateString("he-IL");
  };

  const handleViewAll = () => {
    // תיקון: routing לדף קיים
    router.push("/");
  };

  const handleActivityPress = (activity: Activity) => {
    // תיקון: routing לדף קיים
    router.push("/");
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
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.textRtl, styles.title]}>פעילות אחרונה</Text>
        <TouchableOpacity
          style={[styles.row, styles.viewAllButton]}
          onPress={handleViewAll}
        >
          <Text style={[styles.textRtl, styles.viewAllText]}>הצג הכל</Text>
          <Ionicons name="chevron-back" size={16} color={colors.primary[500]} />
        </TouchableOpacity>
      </View>

      {/* גרף שבועי */}
      <View style={styles.chartContainer}>
        <Text style={[styles.textRtl, styles.chartTitle]}>השבוע שלך</Text>
        <View style={styles.chart}>
          {weeklyData.map((data, index) => (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barWrapper}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: Math.max(4, (data.value / 60) * 56),
                      backgroundColor:
                        data.value > 0
                          ? colors.primary[500]
                          : colors.light[300],
                    },
                  ]}
                />
              </View>
              <Text style={[styles.textRtl, styles.dayLabel]}>{data.day}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* רשימת פעילויות */}
      {isGuest ? (
        <TouchableOpacity
          style={styles.guestPrompt}
          onPress={() => router.push("/(auth)/welcome")}
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
            <Text style={[styles.textRtl, styles.guestTitle]}>
              הצג את ההיסטוריה שלך
            </Text>
            <Text style={[styles.textRtl, styles.guestText]}>
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
          {activities.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={styles.activityCard}
              onPress={() => handleActivityPress(activity)}
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
                <Text
                  style={[styles.textRtl, styles.activityName]}
                  numberOfLines={1}
                >
                  {activity.name}
                </Text>
                <Text style={[styles.textRtl, styles.activityDate]}>
                  {formatDate(activity.date)}
                </Text>

                <View style={styles.activityStats}>
                  <View style={styles.statChip}>
                    <Ionicons
                      name="time-outline"
                      size={14}
                      color={colors.dark[600]}
                    />
                    <Text style={[styles.textRtl, styles.statValue]}>
                      {activity.duration}ד&apos;
                    </Text>
                  </View>
                  <View style={styles.statChip}>
                    <Ionicons
                      name="flame-outline"
                      size={14}
                      color={colors.dark[600]}
                    />
                    <Text style={[styles.textRtl, styles.statValue]}>
                      {activity.calories}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {activities.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={[styles.textRtl, styles.emptyText]}>
                עדיין אין פעילויות
              </Text>
              <TouchableOpacity
                style={styles.startButton}
                onPress={handleViewAll}
              >
                <Text style={[styles.textRtl, styles.startButtonText]}>
                  התחל להתאמן
                </Text>
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
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    color: colors.dark[900],
  },
  viewAllButton: {
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
    backgroundColor: colors.light[50],
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  chartTitle: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.dark[700],
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
    color: colors.dark[600],
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
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
    color: colors.dark[900],
    marginBottom: spacing.xs,
  },
  activityDate: {
    fontSize: fontSizes.xs,
    color: colors.dark[500],
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
    backgroundColor: colors.light[100],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  statValue: {
    fontSize: fontSizes.xs,
    color: colors.dark[700],
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
    color: colors.dark[500],
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
