/**
 * @file screens/home/HomeScreen.tsx
 * @description מסך הבית הראשי של האפליקציה
 * @author GYMoveo Development
 * @version 1.0.3
 *
 * @component HomeScreen
 * @parent App
 *
 * @notes
 * - מסך ראשי לאחר התחברות/כניסת אורח
 * - מרכז את כל הקומפוננטות של מסך הבית
 * - תומך ברענון pull-to-refresh
 * - תוקן: כל בעיות הצבעים, הייבואים ו-QuickStats interface
 *
 * @changelog
 * - v1.0.3: Fixed QuickStats interface and theme imports
 * - v1.0.2: Fixed all color and import issues
 * - v1.0.1: Fixed color references
 * - v1.0.0: Initial screen creation
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
import {
  borderRadius,
  colors,
  fontSizes,
  fontWeights,
  spacing,
} from "@/styles/theme";

import {
  MotivationalQuote,
  QuickActions,
  QuickStats,
  RecentActivity,
  TodayWorkout,
  WelcomeHeader,
} from "./components";

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

        {/* 📊 Quick stats - תיקון interface */}
        <QuickStats
          stats={{
            workoutsThisWeek: isDemo ? 3 : 0,
            currentStreak: isDemo ? 5 : 0,
            minutesThisMonth: isDemo ? 240 : 0,
            personalRecords: isDemo ? 7 : 0,
          }}
        />

        {/* 🏋️ Today's workout */}
        <TodayWorkout />

        {/* 📈 Recent activity */}
        <RecentActivity />

        {/* 💡 Motivational quote */}
        <MotivationalQuote />

        {/* ⚡ Quick actions */}
        <QuickActions />

        {/* 🚪 Sign out button (temp) */}
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
          activeOpacity={0.7}
        >
          <Ionicons
            name="log-out-outline"
            size={20}
            color={colors.status.error}
          />
          <Text style={styles.signOutText}>התנתק</Text>
        </TouchableOpacity>
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
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.status.error + "10",
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.status.error + "20",
  },
  signOutText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    color: colors.status.error,
    textAlign: "center",
  },
});

export default HomeScreen;
