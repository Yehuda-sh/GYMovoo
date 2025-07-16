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

import {
  useIsDemo,
  useIsGuest,
  useUser,
  useUserStore,
} from "@/lib/stores/userStore";
import {
  borderRadius,
  colors,
  shadows,
  spacing,
  typography,
} from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  const [quote, setQuote] = useState({
    text: "הדרך היחידה לעשות עבודה נהדרת היא לאהוב את מה שאתה עושה",
    author: "סטיב ג'ובס",
  });

  // 🔄 Refresh handler
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // סימולציה של רענון נתונים
    setTimeout(() => {
      setRefreshing(false);
      // רענון ציטוט
      const quotes = [
        {
          text: "הכוח לא מגיע מיכולת פיזית. הוא מגיע מרצון בלתי מנוצח",
          author: "מהטמה גנדי",
        },
        {
          text: "האלופים לא נעשים בחדר כושר. אלופים נעשים ממשהו עמוק בפנים",
          author: "מוחמד עלי",
        },
        {
          text: "ההצלחה היא לא סופית, הכישלון הוא לא קטלני: האומץ להמשיך הוא מה שחשוב",
          author: "וינסטון צ'רצ'יל",
        },
      ];
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 1500);
  }, []);

  // 🚪 Sign out handler
  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/welcome" as any);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* 🌈 Background gradient */}
      <LinearGradient
        colors={colors.gradients.background}
        style={StyleSheet.absoluteFillObject}
      />

      {/* 📱 Main content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {/* 👋 Welcome header */}
        <WelcomeHeader
          userName={user?.name || "משתמש"}
          isGuest={isGuest}
          isDemo={isDemo}
          onProfilePress={() => router.push("/profile" as any)}
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
        <TodayWorkout
          workout={
            isDemo
              ? {
                  id: "1",
                  name: "אימון פלג גוף עליון",
                  duration: 45,
                  exercises: 6,
                  difficulty: "intermediate",
                }
              : null
          }
          onStartWorkout={() => router.push("/workouts" as any)}
        />

        {/* 🎯 Quick actions */}
        <QuickActions
          onStartQuickWorkout={() => router.push("/workouts/quick" as any)}
          onBrowsePlans={() => router.push("/plans" as any)}
          onViewProgress={() => router.push("/progress" as any)}
          onAccessExercises={() => router.push("/exercises" as any)}
        />

        {/* 📈 Recent activity */}
        <RecentActivity
          activities={
            isDemo
              ? [
                  {
                    id: "1",
                    type: "workout",
                    title: "השלמת אימון רגליים",
                    time: "לפני שעתיים",
                    icon: "barbell",
                  },
                  {
                    id: "2",
                    type: "achievement",
                    title: "הישג חדש: רצף של 5 ימים!",
                    time: "אתמול",
                    icon: "trophy",
                  },
                  {
                    id: "3",
                    type: "record",
                    title: 'שיא אישי חדש בסקוואט: 120 ק"ג',
                    time: "לפני 3 ימים",
                    icon: "trending-up",
                  },
                ]
              : []
          }
        />

        {/* 💭 Motivational quote */}
        <MotivationalQuote quote={quote.text} author={quote.author} />

        {/* 🚪 Sign out button (for testing) */}
        {__DEV__ && (
          <TouchableOpacity style={styles.devSignOut} onPress={handleSignOut}>
            <Text style={styles.devSignOutText}>התנתק (DEV)</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* 🎯 Floating action button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/workouts/new" as any)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.fabGradient}
        >
          <Ionicons name="add" size={28} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === "ios" ? spacing.xxxl * 2 : spacing.xxxl,
    paddingBottom: spacing.xxxl * 2,
  },
  devSignOut: {
    margin: spacing.xl,
    padding: spacing.md,
    backgroundColor: colors.error,
    borderRadius: borderRadius.md,
    alignItems: "center",
  },
  devSignOutText: {
    color: "white",
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  fab: {
    position: "absolute",
    bottom: spacing.xl,
    right: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    ...shadows.lg,
  },
  fabGradient: {
    width: "100%",
    height: "100%",
    borderRadius: borderRadius.full,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
