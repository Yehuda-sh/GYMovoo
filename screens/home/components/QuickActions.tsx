/**
 * @file screens/home/components/QuickActions.tsx
 * @description קומפוננטה לפעולות מהירות במסך הבית
 * @author GYMoveo Development
 * @version 2.0.0
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
 *
 * @changelog
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
  TouchableOpacity,
  View,
} from "react-native";

import { useIsGuest } from "@/lib/stores/userStore";
import { rtlHelpers, rtlStyles } from "@/styles/theme/rtl";
import {
  unifiedBorderRadius,
  unifiedColors,
  unifiedGradients,
  unifiedShadows,
  unifiedSpacing,
  unifiedTypography,
} from "@/styles/theme/unifiedDesignSystem";

const { width: screenWidth } = Dimensions.get("window");

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  colors: [string, string];
  route: string;
  requiresAuth?: boolean;
}

const QuickActions: React.FC = memo(() => {
  const isGuest = useIsGuest();
  const scaleValues = useRef(new Map<string, Animated.Value>()).current;

  const quickActions: QuickAction[] = [
    {
      id: "start-workout",
      title: "התחל אימון",
      subtitle: "אימון מהיר וקל",
      icon: "fitness-outline",
      colors: unifiedGradients.primary,
      route: "/workouts/start",
      requiresAuth: false,
    },
    {
      id: "view-progress",
      title: "התקדמות",
      subtitle: "צפה בנתונים שלך",
      icon: "trending-up-outline",
      colors: unifiedGradients.secondary,
      route: "/progress",
      requiresAuth: true,
    },
    {
      id: "exercises",
      title: "תרגילים",
      subtitle: "ספריית תרגילים",
      icon: "barbell-outline",
      colors: unifiedGradients.accent,
      route: "/exercises",
      requiresAuth: false,
    },
    {
      id: "nutrition",
      title: "תזונה",
      subtitle: "מעקב תזונתי",
      icon: "nutrition-outline",
      colors: unifiedGradients.success,
      route: "/nutrition",
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
        ...unifiedAnimations.spring.default,
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
        ...unifiedAnimations.spring.default,
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
                <Ionicons
                  name={action.icon}
                  size={24}
                  color={unifiedColors.background}
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={[rtlStyles.text, styles.actionTitle]}>
                  {action.title}
                </Text>
                <Text style={[rtlStyles.text, styles.actionSubtitle]}>
                  {action.subtitle}
                </Text>
              </View>

              {isLocked && (
                <View style={styles.lockBadge}>
                  <Ionicons
                    name="lock-closed"
                    size={12}
                    color={unifiedColors.background}
                  />
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
      <View style={[rtlStyles.row, styles.header]}>
        <Text style={[rtlStyles.text, styles.title]}>פעולות מהירות</Text>
        <TouchableOpacity style={[rtlStyles.row, styles.moreButton]}>
          <Text style={[rtlStyles.text, styles.moreText]}>עוד</Text>
          <Ionicons
            name={rtlHelpers.flipIcon("chevron-forward")}
            size={16}
            color={unifiedColors.primary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.actionsScroll}
        style={rtlStyles.scroll}
      >
        <View style={styles.actionsGrid}>{quickActions.map(renderAction)}</View>
      </ScrollView>

      {isGuest && (
        <View style={[rtlStyles.row, styles.guestMessage]}>
          <Ionicons
            name="information-circle-outline"
            size={16}
            color={unifiedColors.primary}
          />
          <Text style={[rtlStyles.text, styles.guestText]}>
            התחבר לחשבון כדי לגשת לכל הפיצ&apos;רים
          </Text>
        </View>
      )}
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
  moreButton: {
    alignItems: "center",
    gap: unifiedSpacing.xs,
  },
  moreText: {
    ...unifiedTypography.body.medium,
    color: unifiedColors.primary,
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
    ...unifiedShadows.medium,
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
    backgroundColor: unifiedColors.background + "20",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginTop: unifiedSpacing.sm,
  },
  actionTitle: {
    ...unifiedTypography.body.medium,
    color: unifiedColors.background,
    marginBottom: unifiedSpacing.xs,
  },
  actionSubtitle: {
    ...unifiedTypography.caption.regular,
    color: unifiedColors.background + "CC",
  },
  lockBadge: {
    position: "absolute",
    top: unifiedSpacing.sm,
    right: unifiedSpacing.sm,
    width: 24,
    height: 24,
    borderRadius: unifiedBorderRadius.full,
    backgroundColor: unifiedColors.background + "20",
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
    ...unifiedTypography.caption.regular,
    color: unifiedColors.primary,
  },
});

QuickActions.displayName = "QuickActions";

export default QuickActions;
