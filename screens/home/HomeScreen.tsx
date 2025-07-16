/**
 * 📁 Path: /screens/home/HomeScreen.tsx
 * 📝 Description: Main home screen - מסך הבית הראשי
 * 📅 Last Modified: 2024-01-XX 14:30
 *
 * 🔗 Dependencies:
 * - /lib/stores/userStore
 * - /styles/theme
 * - /screens/home/components
 *
 * ⚠️ Note: This is the main screen after login/guest entry
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
  MotivationalQuote,
  QuickActions,
  QuickStats,
  RecentActivity,
  TodayWorkout,
  WelcomeHeader,
} from "@/screens/home/components";
import theme from "@/styles/theme";

const { colors, spacing, borderRadius, shadows } = theme;

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
            tintColor={colors.primary[500]}
            colors={[colors.primary[500]]}
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
                color={colors.error[500]}
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
    backgroundColor: colors.gray[50],
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
    borderColor: colors.error[200],
    ...shadows.sm,
  },
  signOutText: {
    fontSize: theme.fontSizes.md,
    fontWeight: theme.fontWeights.medium,
    color: colors.error[500],
  },
});

export default HomeScreen;
