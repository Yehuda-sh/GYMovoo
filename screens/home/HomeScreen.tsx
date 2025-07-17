/**
 * @file screens/home/HomeScreen.tsx
 * @description מסך הבית הראשי של האפליקציה
 * @author GYMoveo Development
 * @version 1.0.2
 *
 * @component HomeScreen
 * @parent App
 *
 * @notes
 * - מסך ראשי לאחר התחברות/כניסת אורח
 * - מרכז את כל הקומפוננטות של מסך הבית
 * - תומך ברענון pull-to-refresh
 * - תוקן: כל בעיות הצבעים והייבואים
 *
 * @changelog
 * - v1.0.0: Initial screen creation
 * - v1.0.1: Fixed color references
 * - v1.0.2: Fixed all color and import issues
 */

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useIsDemo,
  useIsGuest,
  useUser,
  useUserStore,
} from "@/lib/stores/userStore";
import theme from "@/styles/theme";

import {
  MotivationalQuote,
  QuickActions,
  QuickStats,
  RecentActivity,
  TodayWorkout,
  WelcomeHeader,
} from "./components";

const { colors, spacing, borderRadius, shadows, fontSizes, fontWeights } =
  theme;

const HomeScreen = () => {
  // 🏪 Store hooks
  const user = useUser();
  const isGuest = useIsGuest();
  const isDemo = useIsDemo();
  const { signOut } = useUserStore();

  // 📊 Local state
  const [refreshing, setRefreshing] = useState(false);

  // 🔄 Refresh handler
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // סימולציה של רענון נתונים
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  // 🚪 Sign out handler
  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 📱 Main content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary[600]}
            colors={[colors.primary[600]]}
          />
        }
      >
        {/* 👋 Welcome header */}
        <WelcomeHeader
          userName={user?.name || "משתמש"}
          isGuest={isGuest}
          isDemo={isDemo}
          onProfilePress={() => router.push("/profile")}
        />

        {/* 📊 Quick stats */}
        <QuickStats
          stats={{
            workoutsThisWeek: isDemo ? 3 : 0,
            currentStreak: isDemo ? 5 : 0,
            minutesThisMonth: isDemo ? 240 : 0,
            personalRecords: isDemo ? 2 : 0,
          }}
        />

        {/* 🏋️ Today's workout */}
        <TodayWorkout />

        {/* 📈 Recent activity */}
        <RecentActivity />

        {/* 💭 Motivational quote */}
        <MotivationalQuote />

        {/* 🎯 Quick actions */}
        <QuickActions />

        {/* 🚪 Sign out button (temporary) */}
        {!isGuest && (
          <View style={styles.signOutContainer}>
            <TouchableOpacity
              style={styles.signOutButton}
              onPress={handleSignOut}
              activeOpacity={0.8}
            >
              <Ionicons
                name="log-out-outline"
                size={20}
                color={colors.status.error}
              />
              <Text style={styles.signOutText}>התנתק</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light[50],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl + 60, // Tab bar height
  },
  signOutContainer: {
    padding: spacing.lg,
    marginTop: spacing.xl,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: colors.light[50],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.light[300],
    ...shadows.sm,
  },
  signOutText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    color: colors.status.error,
  },
});

export default HomeScreen;
