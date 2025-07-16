/**
 * 📁 Path: /lib/types/user.ts
 * 📝 Description: טיפוסי משתמש ואימות - User and authentication types
 * 📅 Last Modified: 2024-01-XX 14:30
 *
 * 🔗 Dependencies:
 * - @/lib/types/supabase
 *
 * ⚠️ All types here are for the app's user management
 */

import type { Profile, UserPreferences, UserStats } from "./supabase";

// 👤 User state interface - ממשק מצב משתמש
export interface User {
  id: string;
  email: string;
  profile: Profile | null;
  preferences: UserPreferences | null;
  stats: UserStats | null;
  isDemo: boolean;
}

// 🔐 Authentication state - מצב אימות
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// 📝 Login credentials - פרטי התחברות
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// 📝 Signup data - נתוני הרשמה
export interface SignupData extends LoginCredentials {
  fullName: string;
  acceptTerms: boolean;
  preferredLanguage?: "he" | "en";
}

// 🔄 Auth response types - טיפוסי תגובת אימות
export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
  needsEmailVerification?: boolean;
}

// 📊 User activity - פעילות משתמש
export interface UserActivity {
  lastLogin: Date;
  lastWorkout: Date | null;
  totalActiveMinutesToday: number;
  weeklyGoalProgress: number; // Percentage 0-100
}

// 🏆 User achievements - הישגי משתמש
export interface UserAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  progress?: number; // For progressive achievements
  maxProgress?: number;
}

// 💪 Personal records - שיאים אישיים
export interface PersonalRecord {
  exerciseId: string;
  exerciseName: string;
  value: number;
  unit: "kg" | "lbs" | "reps" | "seconds" | "meters";
  achievedAt: Date;
  previousRecord?: number;
}

// 🎯 User goals - יעדי משתמש
export interface UserGoal {
  id: string;
  type: "weight_loss" | "muscle_gain" | "strength" | "endurance" | "custom";
  title: string;
  description?: string;
  targetValue?: number;
  currentValue?: number;
  unit?: string;
  deadline?: Date;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 📅 Workout preferences - העדפות אימון
export interface WorkoutPreferences {
  preferredDays: number[]; // 0-6 (Sunday-Saturday)
  preferredTime: "morning" | "afternoon" | "evening" | "night";
  workoutDuration: 30 | 45 | 60 | 90 | 120; // minutes
  restDaysBetweenWorkouts: number;
  focusAreas: ("strength" | "cardio" | "flexibility" | "balance")[];
}

// 🔔 Notification settings - הגדרות התראות
export interface NotificationSettings {
  workoutReminders: boolean;
  achievementAlerts: boolean;
  weeklyProgress: boolean;
  motivationalQuotes: boolean;
  reminderTime?: string; // HH:MM format
  quietHoursStart?: string; // HH:MM format
  quietHoursEnd?: string; // HH:MM format
}

// 📈 Progress tracking - מעקב התקדמות
export interface ProgressData {
  date: Date;
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
  };
  photos?: {
    front?: string;
    side?: string;
    back?: string;
  };
  notes?: string;
}

// 🏃 Session data - נתוני סשן
export interface SessionData {
  sessionId: string;
  startTime: Date;
  lastActivity: Date;
  deviceInfo: {
    platform: "ios" | "android" | "web";
    deviceModel?: string;
    appVersion: string;
  };
  location?: {
    latitude: number;
    longitude: number;
    gymName?: string;
  };
}

// 🔒 Privacy settings - הגדרות פרטיות
export interface PrivacySettings {
  profileVisibility: "public" | "friends" | "private";
  shareWorkouts: boolean;
  shareProgress: boolean;
  shareAchievements: boolean;
  allowFriendRequests: boolean;
  showOnLeaderboards: boolean;
}

// 🌟 User level info - מידע על רמת המשתמש
export interface UserLevel {
  level: number;
  title: string;
  currentXP: number;
  requiredXP: number;
  perks: string[];
  nextLevelReward?: string;
}

// 💳 Subscription info - מידע על מנוי
export interface SubscriptionInfo {
  plan: "free" | "basic" | "premium" | "pro";
  status: "active" | "inactive" | "trial" | "expired";
  startDate: Date;
  endDate?: Date;
  autoRenew: boolean;
  features: string[];
}

// 🤝 Social connections - חיבורים חברתיים
export interface SocialConnection {
  userId: string;
  userName: string;
  userAvatar?: string;
  connectionType: "friend" | "trainer" | "trainee";
  connectedAt: Date;
  sharedWorkouts?: number;
}

// 📱 Device preferences - העדפות מכשיר
export interface DevicePreferences {
  hapticFeedback: boolean;
  soundEffects: boolean;
  autoPlayVideos: boolean;
  downloadVideosOnWifi: boolean;
  cacheSize: "small" | "medium" | "large"; // 100MB, 500MB, 1GB
}

// 🎨 Theme customization - התאמת ערכת נושא
export interface ThemeCustomization {
  primaryColor?: string;
  accentColor?: string;
  fontScale: number; // 0.8-1.2
  highContrast: boolean;
  reduceMotion: boolean;
}
