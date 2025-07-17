/**
 * @file screens/home/components/QuickActions.tsx
 * @description קומפוננטה לפעולות מהירות במסך הבית
 * @author GYMoveo Development
 * @version 2.0.2
 *
 * @component QuickActions
 * @parent HomeScreen
 *
 * @notes
 * - כפתורי גישה מהירה לפעולות נפוצות
 * - אנימציות לחיצה
 * - תמיכה במצב אורח
 * - תמיכה מלאה ב-RTL
 * - שימוש ב-unifiedDesignSystem
 * - תוקן: כל בעיות TypeScript
 *
 * @changelog
 * - v2.0.2: Fixed all TypeScript errors with proper type casting
 * - v2.0.1: Fixed TypeScript gradient colors issues
 * - v2.0.0: Updated to use unifiedDesignSystem + RTL support
 * - v1.0.3: Fixed all color references
 * - v1.0.2: Fixed theme import to use default export
 * - v1.0.1: Fixed TypeScript errors and router navigation
 * - v1.0.0: Initial component creation
 */

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { memo, useCallback, useRef } from "react";
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
  unifiedBorderRadius,
  unifiedSpacing,
  unifiedTypography,
} from "@/styles/theme/unifiedDesignSystem";

const { width: screenWidth } = Dimensions.get("window");

// תיקון: הגדרת הסוג הנכון לגרדיאנט
interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  colors: readonly [string, string]; // תיקון: readonly tuple
  route: string;
  requiresAuth?: boolean;
}

const QuickActions: React.FC = memo(() => {
  const isGuest = useIsGuest();
  const scaleValues = useRef(new Map<string, Animated.Value>()).current;

  // תיקון: גרדיאנטים עם readonly tuple
  const quickActions: QuickAction[] = [
    {
      id: "start-workout",
      title: "התחל אימון",
      subtitle: "אימון מהיר וקל",
      icon: "fitness-outline",
      colors: ["#0ea5e9", "#0284c7"] as const,
      route: "/workouts/start",
      requiresAuth: false,
    },
    {
      id: "view-progress",
      title: "התקדמות",
      subtitle: "צפה בנתונים שלך",
      icon: "trending-up-outline",
      colors: ["#38bdf8", "#0284c7"] as const,
      route: "/progress",
      requiresAuth: true,
    },
    {
      id: "exercises",
      title: "תרגילים",
      subtitle: "ספריית תרגילים",
      icon: "barbell-outline",
      colors: ["#4ade80", "#16a34a"] as const,
      route: "/exercises",
      requiresAuth: false,
    },
    {
      id: "nutrition",
      title: "תזונה",
      subtitle: "מעקב תזונתי",
      icon: "nutrition-outline",
      colors: ["#fbbf24", "#d97706"] as const,
      route: "/nutrition",
      requiresAuth: true,
    },
    {
      id: "settings",
      title: "הגדרות",
      subtitle: "אישיות פרופיל",
      icon: "settings-outline",
      colors: ["#2980b9", "#6bb6ff"] as const,
      route: "/settings",
      requiresAuth: true,
    },
    {
      id: "help",
      title: "עזרה",
      subtitle: "מדריכים וטיפים",
      icon: "help-circle-outline",
      colors: ["#f4f4f5", "#d4d4d8"] as const,
      route: "/help",
      requiresAuth: false,
    },
    {
      id: "community",
      title: "קהילה",
      subtitle: "התחבר לחברים",
      icon: "people-outline",
      colors: ["#667eea", "#764ba2"] as const,
      route: "/community",
      requiresAuth: true,
    },
    {
      id: "achievements",
      title: "הישגים",
      subtitle: "אתגרים ותגמולים",
      icon: "trophy-outline",
      colors: ["#ff7e5f", "#feb47b"] as const,
      route: "/achievements",
      requiresAuth: true,
    },
  ];

  const getOrCreateScaleValue = useCallback(
    (id: string) => {
      if (!scaleValues.has(id)) {
        scaleValues.set(id, new Animated.Value(1));
      }
      return scaleValues.get(id)!;
    },
    [scaleValues]
  );

  const handlePressIn = useCallback(
    (id: string) => {
      const scaleValue = getOrCreateScaleValue(id);
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    },
    [getOrCreateScaleValue]
  );

  const handlePressOut = useCallback(
    (id: string) => {
      const scaleValue = getOrCreateScaleValue(id);
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    },
    [getOrCreateScaleValue]
  );

  const handleActionPress = useCallback(
    (action: QuickAction) => {
      if (action.requiresAuth && isGuest) {
        router.push("/(auth)/welcome");
        return;
      }

      router.push(action.route as any);
    },
    [isGuest]
  );

  const renderAction = useCallback(
    (action: QuickAction) => {
      const scaleValue = getOrCreateScaleValue(action.id);
      const isLocked = action.requiresAuth && isGuest;

      return (
        <View key={action.id} style={styles.actionCardContainer}>
          <TouchableOpacity
            style={styles.actionTouchable}
            onPress={() => handleActionPress(action)}
            onPressIn={() => handlePressIn(action.id)}
            onPressOut={() => handlePressOut(action.id)}
            activeOpacity={0.8}
          >
            <Animated.View
              style={[
                styles.actionCard,
                {
                  transform: [{ scale: scaleValue }],
                },
              ]}
            >
              <LinearGradient
                colors={action.colors}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />

              <View style={styles.iconContainer}>
                <Ionicons name={action.icon} size={24} color="#ffffff" />
              </View>

              <View style={styles.textContainer}>
                <Text style={[styles.textRtl, styles.actionTitle]}>
                  {action.title}
                </Text>
                <Text style={[styles.textRtl, styles.actionSubtitle]}>
                  {action.subtitle}
                </Text>
              </View>

              {isLocked && (
                <View style={styles.lockBadge}>
                  <Ionicons name="lock-closed" size={12} color="#ffffff" />
                </View>
              )}
            </Animated.View>
          </TouchableOpacity>
        </View>
      );
    },
    [
      getOrCreateScaleValue,
      handleActionPress,
      handlePressIn,
      handlePressOut,
      isGuest,
    ]
  );

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.textRtl, styles.title]}>פעולות מהירות</Text>
        <TouchableOpacity style={[styles.row, styles.moreButton]}>
          <Text style={[styles.textRtl, styles.moreText]}>עוד</Text>
          <Ionicons name="chevron-back" size={16} color="#0ea5e9" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.actionsScroll}
      >
        <View style={styles.actionsGrid}>{quickActions.map(renderAction)}</View>
      </ScrollView>

      {isGuest && (
        <View style={[styles.row, styles.guestMessage]}>
          <Ionicons
            name="information-circle-outline"
            size={16}
            color="#0ea5e9"
          />
          <Text style={[styles.textRtl, styles.guestText]}>
            התחבר לחשבון כדי לגשת לכל הפיצ&apos;רים
          </Text>
        </View>
      )}
    </View>
  );
});

// תיקון: הגדרת סגנונות עם casting נכון
const styles = StyleSheet.create({
  container: {
    marginBottom: unifiedSpacing.lg,
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
  moreButton: {
    alignItems: "center",
    gap: unifiedSpacing.xs,
  },
  moreText: {
    fontSize: unifiedTypography.sizes.md,
    fontWeight: unifiedTypography.weights.medium,
    color: "#0ea5e9",
  },
  actionsScroll: {
    paddingHorizontal: unifiedSpacing.lg,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: unifiedSpacing.md,
  },
  actionCardContainer: {
    width: (screenWidth - unifiedSpacing.lg * 2 - unifiedSpacing.md) / 2,
    height: 120,
  },
  actionTouchable: {
    flex: 1,
    borderRadius: unifiedBorderRadius.lg,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionCard: {
    flex: 1,
    padding: unifiedSpacing.lg,
    justifyContent: "space-between",
    position: "relative",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: unifiedBorderRadius.full,
    backgroundColor: "#ffffff20",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginTop: unifiedSpacing.sm,
  },
  actionTitle: {
    fontSize: unifiedTypography.sizes.md,
    fontWeight: unifiedTypography.weights.medium,
    color: "#ffffff",
    marginBottom: unifiedSpacing.xs,
  },
  actionSubtitle: {
    fontSize: unifiedTypography.sizes.sm,
    fontWeight: unifiedTypography.weights.regular,
    color: "#ffffffCC",
  },
  lockBadge: {
    position: "absolute",
    top: unifiedSpacing.sm,
    right: unifiedSpacing.sm,
    width: 24,
    height: 24,
    borderRadius: unifiedBorderRadius.full,
    backgroundColor: "#ffffff20",
    justifyContent: "center",
    alignItems: "center",
  },
  guestMessage: {
    alignItems: "center",
    justifyContent: "center",
    gap: unifiedSpacing.xs,
    marginTop: unifiedSpacing.lg,
    paddingHorizontal: unifiedSpacing.lg,
  },
  guestText: {
    fontSize: unifiedTypography.sizes.sm,
    fontWeight: unifiedTypography.weights.regular,
    color: "#0ea5e9",
  },
});

QuickActions.displayName = "QuickActions";

export default QuickActions;
