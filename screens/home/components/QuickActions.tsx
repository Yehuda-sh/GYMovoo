/**
 * @file screens/home/components/QuickActions.tsx
 * @description קומפוננטה לפעולות מהירות במסך הבית
 * @author GYMoveo Development
 * @version 1.0.2
 *
 * @component QuickActions
 * @parent HomeScreen
 *
 * @notes
 * - כפתורי גישה מהירה לפעולות נפוצות
 * - אנימציות לחיצה
 * - תמיכה במצב אורח
 * - זמנית: כל הנתיבים מובילים למסך הבית
 *
 * @changelog
 * - v1.0.0: Initial component creation
 * - v1.0.1: Fixed TypeScript errors and router navigation
 * - v1.0.2: Fixed theme import to use default export
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
import theme from "@/styles/theme";

const { colors, spacing, borderRadius, shadows, fontSizes, fontWeights } =
  theme;

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

const quickActions: QuickAction[] = [
  {
    id: "new-workout",
    title: "אימון חדש",
    subtitle: "התחל אימון",
    icon: "add-circle",
    colors: [colors.primary[500], colors.primary[600]],
    route: "/workouts-new",
  },
  {
    id: "my-programs",
    title: "התוכניות שלי",
    subtitle: "צפה ונהל",
    icon: "calendar",
    colors: [colors.secondary[500], colors.secondary[600]],
    route: "/programs",
    requiresAuth: true,
  },
  {
    id: "exercises",
    title: "מאגר תרגילים",
    subtitle: "חפש תרגילים",
    icon: "search",
    colors: [colors.status.success[500], colors.status.success[600]],
    route: "/exercises",
  },
  {
    id: "nutrition",
    title: "תזונה",
    subtitle: "מעקב קלוריות",
    icon: "nutrition",
    colors: [colors.status.warning[500], colors.status.warning[600]],
    route: "/nutrition",
    requiresAuth: true,
  },
  {
    id: "challenges",
    title: "אתגרים",
    subtitle: "הצטרף לאתגר",
    icon: "trophy",
    colors: [colors.status.error[500], colors.status.error[600]],
    route: "/challenges",
  },
  {
    id: "community",
    title: "קהילה",
    subtitle: "פורומים וטיפים",
    icon: "people",
    colors: [colors.primary[600], colors.secondary[500]],
    route: "/community",
  },
];

const QuickActionCard = memo(
  ({
    action,
    isGuest,
    index,
  }: {
    action: QuickAction;
    isGuest: boolean;
    index: number;
  }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // אנימציית כניסה
    React.useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 50 + 600,
        useNativeDriver: true,
      }).start();
    }, [index, fadeAnim]);

    const handlePressIn = useCallback(() => {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        friction: 4,
        tension: 300,
        useNativeDriver: true,
      }).start();
    }, [scaleAnim]);

    const handlePressOut = useCallback(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 300,
        useNativeDriver: true,
      }).start();
    }, [scaleAnim]);

    const handlePress = useCallback(() => {
      if (action.requiresAuth && isGuest) {
        router.push("/signup");
      } else {
        // זמנית - כל הנתיבים מובילים למסך הבית
        router.push("/");
      }
    }, [action, isGuest]);

    return (
      <Animated.View
        style={[
          styles.actionCardContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.actionTouchable}
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={action.colors}
            style={styles.actionCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={action.icon} size={28} color={colors.light[50]} />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
            </View>

            {action.requiresAuth && isGuest && (
              <View style={styles.lockBadge}>
                <Ionicons
                  name="lock-closed"
                  size={12}
                  color={colors.light[50]}
                />
              </View>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }
);

QuickActionCard.displayName = "QuickActionCard";

const QuickActions = memo(() => {
  const isGuest = useIsGuest();

  return (
    <View style={styles.container}>
      {/* כותרת */}
      <View style={styles.header}>
        <Text style={styles.title}>גישה מהירה</Text>
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={styles.moreButton}
        >
          <Text style={styles.moreText}>עוד</Text>
          <Ionicons name="apps" size={16} color={colors.primary[500]} />
        </TouchableOpacity>
      </View>

      {/* רשת פעולות */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.actionsScroll}
        decelerationRate="fast"
        snapToInterval={
          (screenWidth - spacing.lg * 2 - spacing.md) / 2 + spacing.md
        }
      >
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <QuickActionCard
              key={action.id}
              action={action}
              isGuest={isGuest}
              index={index}
            />
          ))}
        </View>
      </ScrollView>

      {/* הודעה למשתמשי אורח */}
      {isGuest && (
        <View style={styles.guestMessage}>
          <Ionicons
            name="information-circle"
            size={16}
            color={colors.primary[600]}
          />
          <Text style={styles.guestText}>חלק מהפעולות דורשות הרשמה</Text>
        </View>
      )}
    </View>
  );
});

QuickActions.displayName = "QuickActions";

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
    color: colors.dark[900],
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  moreText: {
    fontSize: fontSizes.sm,
    color: colors.primary[500],
    fontWeight: fontWeights.medium,
  },
  actionsScroll: {
    paddingHorizontal: spacing.lg,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  actionCardContainer: {
    width: (screenWidth - spacing.lg * 2 - spacing.md) / 2,
    height: 120,
  },
  actionTouchable: {
    flex: 1,
    borderRadius: borderRadius.lg,
    overflow: "hidden",
    ...shadows.md,
  },
  actionCard: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: "space-between",
    position: "relative",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.light[50] + "20",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginTop: spacing.sm,
  },
  actionTitle: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semiBold,
    color: colors.light[50],
    marginBottom: spacing.xs,
  },
  actionSubtitle: {
    fontSize: fontSizes.xs,
    color: colors.light[200],
  },
  lockBadge: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    width: 24,
    height: 24,
    borderRadius: borderRadius.full,
    backgroundColor: colors.light[50] + "20",
    justifyContent: "center",
    alignItems: "center",
  },
  guestMessage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  guestText: {
    fontSize: fontSizes.sm,
    color: colors.primary[600],
  },
});

export default QuickActions;
