/**
 * 📁 Path: /lib/supabase.ts
 * 📝 Description: Supabase client initialization - אתחול לקוח Supabase
 * 📅 Last Modified: 2024-01-XX 14:30
 *
 * 🔗 Dependencies:
 * - @supabase/supabase-js
 * - @react-native-async-storage/async-storage
 * - /constants/supabase
 *
 * ⚠️ Note: Replace SUPABASE_URL and SUPABASE_ANON_KEY with your actual values
 */

import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/constants/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// 🔧 יצירת Supabase client - Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // 📱 אחסון מקומי למובייל - Local storage for mobile
    storage: AsyncStorage,

    // 🔄 רענון אוטומטי של טוקנים - Auto refresh tokens
    autoRefreshToken: true,

    // 💾 שמירת סשן - Persist session
    persistSession: true,

    // 🌐 לא לחפש סשן ב-URL - Don't detect session in URL
    detectSessionInUrl: false,
  },

  // 🌍 הגדרות גלובליות - Global settings
  global: {
    // 📋 Headers מותאמים אישית - Custom headers
    headers: {
      "x-app-version": "1.0.0",
      "x-platform": "mobile",
    },
  },

  // 🔄 Realtime settings
  realtime: {
    params: {
      // 📡 מנויים מקסימליים - Max subscriptions
      eventsPerSecond: 10,
    },
  },
});

// 🔐 Auth helpers - פונקציות עזר לאימות
export const auth = {
  // 📧 התחברות עם אימייל - Sign in with email
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) throw error;
    return data;
  },

  // 📝 הרשמה - Sign up
  signUp: async (email: string, password: string, metadata?: any) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: metadata,
      },
    });

    if (error) throw error;
    return data;
  },

  // 🚪 התנתקות - Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // 👤 קבלת משתמש נוכחי - Get current user
  getCurrentUser: async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  // 🔄 קבלת סשן - Get session
  getSession: async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  // 🔑 איפוס סיסמה - Reset password
  resetPassword: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "gymovoo://reset-password",
    });
    if (error) throw error;
  },
};

// 📊 Database helpers - פונקציות עזר למסד נתונים
export const db = {
  // 👤 פרופילים - Profiles
  profiles: {
    get: async (userId: string) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      return data;
    },

    update: async (userId: string, updates: any) => {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },

  // 🏋️ אימונים - Workouts
  workouts: {
    getAll: async (userId: string, limit = 10) => {
      const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    },

    create: async (workout: any) => {
      const { data, error } = await supabase
        .from("workouts")
        .insert(workout)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },

  // 💪 תרגילים - Exercises
  exercises: {
    getAll: async () => {
      const { data, error } = await supabase
        .from("exercises")
        .select("*")
        .eq("is_public", true)
        .order("name");

      if (error) throw error;
      return data;
    },
  },
};

// 📱 Storage helpers - פונקציות עזר לאחסון
export const storage = {
  // 🖼️ העלאת תמונת פרופיל - Upload avatar
  uploadAvatar: async (userId: string, file: any) => {
    const fileName = `${userId}-${Date.now()}.jpg`;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) throw error;

    // 🔗 קבלת URL ציבורי - Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(fileName);

    return publicUrl;
  },

  // 🗑️ מחיקת תמונה - Delete image
  deleteAvatar: async (fileName: string) => {
    const { error } = await supabase.storage.from("avatars").remove([fileName]);

    if (error) throw error;
  },
};

// 🔄 Realtime subscriptions - מנויים בזמן אמת
export const realtime = {
  // 📊 האזנה לשינויים בפרופיל - Listen to profile changes
  subscribeToProfile: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`profile:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${userId}`,
        },
        callback
      )
      .subscribe();
  },

  // 🏋️ האזנה לאימונים חדשים - Listen to new workouts
  subscribeToWorkouts: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`workouts:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "workouts",
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();
  },

  // 🔌 ניתוק מנוי - Unsubscribe
  unsubscribe: async (subscription: any) => {
    await supabase.removeChannel(subscription);
  },
};

// 🚨 Error handler - טיפול בשגיאות
export const handleSupabaseError = (error: any): string => {
  // בדיקת שגיאות ידועות - Check known errors
  if (error.code === "23505") {
    return "הרשומה כבר קיימת";
  }

  if (error.message?.includes("duplicate")) {
    return "הנתונים כבר קיימים במערכת";
  }

  if (error.message?.includes("Invalid login credentials")) {
    return "אימייל או סיסמה שגויים";
  }

  if (error.message?.includes("Email not confirmed")) {
    return "יש לאמת את כתובת האימייל";
  }

  // שגיאה כללית - Generic error
  return error.message || "אירעה שגיאה, נסה שוב";
};
