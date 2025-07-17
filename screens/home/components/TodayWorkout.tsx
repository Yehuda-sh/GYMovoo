/**
 * @file screens/home/components/TodayWorkout.tsx
 * @description קומפוננטה להצגת האימון היומי במסך הבית
 * @author GYMoveo Development
 * @version 1.0.2
 *
 * @component TodayWorkout
 * @parent HomeScreen
 *
 * @notes
 * - מציג אימון מתוכנן להיום או הצעה לאימון חדש
 * - כולל אנימציה בטעינה
 * - תומך במצב אורח ומצב משתמש רשום
 * - תוקן: routing, imports, והסרת בעיות TypeScript
 *
 * @changelog
 * - v1.0.2: Fixed routing, imports, and TypeScript errors
 * - v1.0.1: Fixed status colors and React hooks dependencies
 * - v1.0.0: Initial component creation
 */

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { memo, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";

import { useIsGuest } from "@/lib/stores/userStore";
import {
  borderRadius,
  colors,
  fontSizes,
  fontWeights,
  spacing,
} from "@/styles/theme";

interface Workout {
  id: string;
  name: string;
  duration: number;
  exercises: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  targetMuscles: string[];
}

const TodayWorkout = memo(() => {
  // 🏪 Store hooks
  const isGuest = useIsGuest();

  // 📊 Local state
  const [loading, setLoading] = useState(true);
  const [todayWorkout, setTodayWorkout] = useState<Workout | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  // 🎭 אנימציות
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  // 📥 טעינת נתוני אימון
  useEffect(() => {
    const loadWorkout = async () => {
      setLoading(true);

      // סימולציה של טעינת נתונים
      setTimeout(() => {
        if (!isGuest) {
          // למשתמש רשום - אימון מתוכנן
          setTodayWorkout({
            id: "1",
            name: "אימון פלג גוף עליון",
            duration: 45,
            exercises: 8,
            difficulty: "intermediate",
            targetMuscles: ["חזה", "כתפיים", "טרייספס"],
          });
        }
        setLoading(false);
      }, 1000);
    };

    loadWorkout();
  }, [isGuest]);

  // 🎯 הפניה לאימון
  const handleStartWorkout = () => {
    if (isGuest) {
      // למשתמשי אורח - הפניה להרשמה
      router.push("/(auth)/welcome");
    } else if (todayWorkout) {
      // למשתמשים רשומים - הפניה לאימון (זמנית למסך הבית)
      router.push("/");
    } else {
      // אין אימון מתוכנן - הפניה לבחירת אימון (זמנית למסך הבית)
      router.push("/");
    }
  };

  // 🏷️ תגית קושי
  const getDifficultyLabel = (difficulty: string) => {
    const labels = {
      beginner: "מתחיל",
      intermediate: "בינוני",
      advanced: "מתקדם",
    };
    return labels[difficulty as keyof typeof labels] || difficulty;
  };

  // 🎨 צבע רקע לפי קושי
  const getDifficultyColor = (difficulty: string) => {
    const colorMap = {
      beginner: colors.status.success,
      intermediate: colors.status.warning,
      advanced: colors.status.error,
    };
    return colorMap[difficulty as keyof typeof colorMap] || colors.primary[500];
  };

  // 🎨 רכיב טעינה
  if (loading) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.primary[500] + "10", colors.primary[600] + "10"]}
          style={styles.loadingCard}
        >
          <ActivityIndicator size="large" color={colors.primary[500]} />
        </LinearGradient>
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.touchable}
        onPress={handleStartWorkout}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={
            todayWorkout
              ? [colors.primary[500], colors.primary[600]]
              : [colors.dark[700], colors.dark[800]]
          }
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* כותרת */}
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Ionicons
                name={todayWorkout ? "barbell" : "add-circle"}
                size={24}
                color={colors.light[50]}
              />
              <Text style={[styles.textRtl, styles.title]}>
                {todayWorkout ? "האימון שלך להיום" : "אין אימון מתוכנן"}
              </Text>
            </View>
            {todayWorkout && (
              <View
                style={[
                  styles.difficultyBadge,
                  {
                    backgroundColor: getDifficultyColor(
                      todayWorkout.difficulty
                    ),
                  },
                ]}
              >
                <Text style={[styles.textRtl, styles.difficultyText]}>
                  {getDifficultyLabel(todayWorkout.difficulty)}
                </Text>
              </View>
            )}
          </View>

          {/* תוכן */}
          {todayWorkout ? (
            <View style={styles.content}>
              <Text style={[styles.textRtl, styles.workoutName]}>
                {todayWorkout.name}
              </Text>

              {/* נתונים */}
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Ionicons
                    name="time-outline"
                    size={18}
                    color={colors.light[300]}
                  />
                  <Text style={[styles.textRtl, styles.statText]}>
                    {todayWorkout.duration} דקות
                  </Text>
                </View>

                <View style={styles.statDivider} />

                <View style={styles.statItem}>
                  <Ionicons
                    name="fitness-outline"
                    size={18}
                    color={colors.light[300]}
                  />
                  <Text style={[styles.textRtl, styles.statText]}>
                    {todayWorkout.exercises} תרגילים
                  </Text>
                </View>
              </View>

              {/* שרירי מטרה */}
              <View style={styles.musclesContainer}>
                <Text style={[styles.textRtl, styles.musclesLabel]}>
                  שרירי מטרה:
                </Text>
                <View style={styles.musclesList}>
                  {todayWorkout.targetMuscles.map((muscle, index) => (
                    <View key={index} style={styles.muscleTag}>
                      <Text style={[styles.textRtl, styles.muscleText]}>
                        {muscle}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.emptyContent}>
              <Text style={[styles.textRtl, styles.emptyText]}>
                {isGuest
                  ? "הירשם כדי לקבל תוכנית אימונים מותאמת אישית"
                  : "לחץ כדי לבחור אימון להיום"}
              </Text>
            </View>
          )}

          {/* כפתור פעולה */}
          <View style={styles.footer}>
            <View style={styles.actionButton}>
              <Text style={[styles.textRtl, styles.actionText]}>
                {isGuest
                  ? "הירשם עכשיו"
                  : todayWorkout
                  ? "התחל אימון"
                  : "בחר אימון"}
              </Text>
              <Ionicons
                name="arrow-forward"
                size={20}
                color={colors.light[50]}
                style={styles.actionIcon}
              />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

TodayWorkout.displayName = "TodayWorkout";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  // RTL styles
  textRtl: {
    textAlign: "right",
    writingDirection: "rtl",
  } as TextStyle,
  touchable: {
    borderRadius: borderRadius.xl,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  card: {
    padding: spacing.xl,
    minHeight: 180,
  },
  loadingCard: {
    height: 180,
    borderRadius: borderRadius.xl,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semiBold,
    color: colors.light[50],
  },
  difficultyBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  difficultyText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    color: colors.light[50],
  },
  content: {
    flex: 1,
  },
  workoutName: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    color: colors.light[50],
    marginBottom: spacing.md,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  statText: {
    fontSize: fontSizes.sm,
    color: colors.light[200],
  },
  statDivider: {
    width: 1,
    height: 16,
    backgroundColor: colors.light[700],
    marginHorizontal: spacing.md,
  },
  musclesContainer: {
    marginTop: spacing.sm,
  },
  musclesLabel: {
    fontSize: fontSizes.sm,
    color: colors.light[300],
    marginBottom: spacing.sm,
  },
  musclesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  muscleTag: {
    backgroundColor: colors.light[50] + "20",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  muscleText: {
    fontSize: fontSizes.xs,
    color: colors.light[100],
    fontWeight: fontWeights.medium,
  },
  emptyContent: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: spacing.xl,
  },
  emptyText: {
    fontSize: fontSizes.md,
    color: colors.light[200],
    textAlign: "center",
    lineHeight: 24,
  },
  footer: {
    marginTop: spacing.lg,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light[50] + "20",
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  actionText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semiBold,
    color: colors.light[50],
  },
  actionIcon: {
    marginLeft: spacing.sm,
  },
});

export default TodayWorkout;
