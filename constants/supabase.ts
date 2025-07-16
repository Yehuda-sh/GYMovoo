/**
 * 📁 Path: /constants/supabase.ts
 * 📝 Description: קבועי Supabase - Supabase constants
 * 📅 Last Modified: 2024-01-XX 14:30
 *
 * 🔗 Dependencies: None
 *
 * ⚠️ Note: Replace with your actual Supabase credentials
 */

// 🔑 Supabase credentials - פרטי התחברות
export const SUPABASE_URL = "https://tueiyvzkhiljaktpcqqs.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

// 📊 Database table names - שמות טבלאות
export const TABLES = {
  PROFILES: "profiles",
  USER_PREFERENCES: "user_preferences",
  USER_STATS: "user_stats",
  WORKOUTS: "workouts",
  EXERCISES: "exercises",
  WORKOUT_EXERCISES: "workout_exercises",
  WORKOUT_SETS: "workout_sets",
  PLANS: "plans",
  PLAN_WORKOUTS: "plan_workouts",
} as const;

// 🔐 Auth settings - הגדרות אימות
export const AUTH_SETTINGS = {
  // זמן תפוגה של סשן במילישניות - Session expiry in milliseconds
  SESSION_EXPIRY: 60 * 60 * 1000, // 1 hour

  // ניסיונות התחברות מקסימליים - Max login attempts
  MAX_LOGIN_ATTEMPTS: 5,

  // זמן נעילה לאחר ניסיונות כושלים - Lockout time after failed attempts
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
} as const;

// 📱 Storage buckets - דליי אחסון
export const STORAGE_BUCKETS = {
  AVATARS: "avatars",
  WORKOUT_IMAGES: "workout-images",
  EXERCISE_VIDEOS: "exercise-videos",
} as const;

// 🌐 API endpoints - נקודות קצה
export const API_ENDPOINTS = {
  // אימות - Authentication
  AUTH: {
    LOGIN: "/auth/v1/token?grant_type=password",
    SIGNUP: "/auth/v1/signup",
    LOGOUT: "/auth/v1/logout",
    REFRESH: "/auth/v1/token?grant_type=refresh_token",
  },

  // נתונים - Data
  DATA: {
    PROFILES: "/rest/v1/profiles",
    WORKOUTS: "/rest/v1/workouts",
    EXERCISES: "/rest/v1/exercises",
  },
} as const;

// 🔄 Real-time subscriptions - מנויים בזמן אמת
export const REALTIME_CHANNELS = {
  USER_UPDATES: "user-updates",
  WORKOUT_PROGRESS: "workout-progress",
  NOTIFICATIONS: "notifications",
} as const;

// 📈 Query limits - מגבלות שאילתות
export const QUERY_LIMITS = {
  WORKOUTS_PER_PAGE: 10,
  EXERCISES_PER_PAGE: 20,
  STATS_HISTORY_DAYS: 30,
  MAX_BATCH_SIZE: 100,
} as const;
