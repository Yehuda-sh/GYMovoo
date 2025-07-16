/**
 * 📁 Path: /lib/supabase.ts
 * 📝 Description: לקוח Supabase וחיבור לבסיס הנתונים - Supabase client and database connection
 * 🔢 Version: 1.1
 *
 * 🔗 Dependencies:
 * - react-native-url-polyfill
 * - @supabase/supabase-js
 * - @react-native-async-storage/async-storage
 * - @/constants/supabase
 * - @/lib/types/supabase
 *
 * ⚠️ Make sure to update SUPABASE_URL and SUPABASE_ANON_KEY in constants
 */

import { SUPABASE_ANON_KEY, SUPABASE_URL, TABLES } from "@/constants/supabase";
import type { Database } from "@/lib/types/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

// 🔧 Custom storage adapter for React Native - מתאם אחסון מותאם ל-React Native
const supabaseStorage = {
  getItem: async (key: string) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error("Error getting item from AsyncStorage:", error);
      return null;
    }
  },
  setItem: async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("Error setting item in AsyncStorage:", error);
    }
  },
  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from AsyncStorage:", error);
    }
  },
};

// 🌐 Create Supabase client - יצירת לקוח Supabase
export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      storage: supabaseStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

// 🔐 Auth helpers - עזרי אימות
export const auth = {
  // Sign up new user - רישום משתמש חדש
  signUp: async (email: string, password: string, fullName?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      // Create profile if user was created - יצירת פרופיל אם המשתמש נוצר
      if (data.user) {
        const { error: profileError } = await supabase
          .from(TABLES.PROFILES)
          .insert({
            id: data.user.id,
            email: data.user.email!,
            full_name: fullName,
            is_demo_user: false,
          });

        if (profileError) {
          console.error("Error creating profile:", profileError);
        }

        // Initialize user preferences - אתחול העדפות משתמש
        const { error: prefsError } = await supabase
          .from(TABLES.USER_PREFERENCES)
          .insert({
            user_id: data.user.id,
            language: "he",
            units: "metric",
            theme: "dark",
            notifications_enabled: true,
            workout_reminders: true,
          });

        if (prefsError) {
          console.error("Error creating preferences:", prefsError);
        }

        // Initialize user stats - אתחול סטטיסטיקות משתמש
        const { error: statsError } = await supabase
          .from(TABLES.USER_STATS)
          .insert({
            user_id: data.user.id,
            total_workouts: 0,
            total_minutes: 0,
            current_streak: 0,
            longest_streak: 0,
          });

        if (statsError) {
          console.error("Error creating stats:", statsError);
        }
      }

      return { data, error: null };
    } catch (error) {
      console.error("SignUp error:", error);
      return { data: null, error };
    }
  },

  // Sign in existing user - כניסת משתמש קיים
  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error("SignIn error:", error);
      return { data: null, error };
    }
  },

  // Sign out - יציאה
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error("SignOut error:", error);
      return { error };
    }
  },

  // Get current session - קבלת סשן נוכחי
  getSession: async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      return { session, error: null };
    } catch (error) {
      console.error("GetSession error:", error);
      return { session: null, error };
    }
  },

  // Get current user - קבלת משתמש נוכחי
  getCurrentUser: () => {
    return supabase.auth.getUser();
  },

  // Reset password - איפוס סיסמה
  resetPassword: async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error("ResetPassword error:", error);
      return { error };
    }
  },

  // Update password - עדכון סיסמה
  updatePassword: async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error("UpdatePassword error:", error);
      return { error };
    }
  },
};

// 📊 Database helpers - עזרי בסיס נתונים
export const db = {
  // Profiles - פרופילים
  profiles: {
    get: async (userId: string) => {
      return supabase
        .from(TABLES.PROFILES)
        .select("*")
        .eq("id", userId)
        .single();
    },
    update: async (userId: string, updates: any) => {
      return supabase.from(TABLES.PROFILES).update(updates).eq("id", userId);
    },
  },

  // User preferences - העדפות משתמש
  preferences: {
    get: async (userId: string) => {
      return supabase
        .from(TABLES.USER_PREFERENCES)
        .select("*")
        .eq("user_id", userId)
        .single();
    },
    update: async (userId: string, updates: any) => {
      return supabase
        .from(TABLES.USER_PREFERENCES)
        .update(updates)
        .eq("user_id", userId);
    },
  },

  // User stats - סטטיסטיקות משתמש
  stats: {
    get: async (userId: string) => {
      return supabase
        .from(TABLES.USER_STATS)
        .select("*")
        .eq("user_id", userId)
        .single();
    },
    update: async (userId: string, updates: any) => {
      return supabase
        .from(TABLES.USER_STATS)
        .update(updates)
        .eq("user_id", userId);
    },
    increment: async (userId: string, field: string, amount: number = 1) => {
      const { data: current } = await supabase
        .from(TABLES.USER_STATS)
        .select(field)
        .eq("user_id", userId)
        .single();

      if (current) {
        return supabase
          .from(TABLES.USER_STATS)
          .update({ [field]: ((current as any)[field] || 0) + amount })
          .eq("user_id", userId);
      }
    },
  },

  // Workouts - אימונים
  workouts: {
    list: async (userId: string, limit = 10, offset = 0) => {
      return supabase
        .from(TABLES.WORKOUTS)
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);
    },
    get: async (workoutId: string) => {
      return supabase
        .from(TABLES.WORKOUTS)
        .select(
          `
          *,
          workout_exercises (
            *,
            exercise:exercises (*),
            workout_sets (*)
          )
        `
        )
        .eq("id", workoutId)
        .single();
    },
    create: async (workout: any) => {
      return supabase.from(TABLES.WORKOUTS).insert(workout).select().single();
    },
    update: async (workoutId: string, updates: any) => {
      return supabase.from(TABLES.WORKOUTS).update(updates).eq("id", workoutId);
    },
    delete: async (workoutId: string) => {
      return supabase.from(TABLES.WORKOUTS).delete().eq("id", workoutId);
    },
  },

  // Exercises - תרגילים
  exercises: {
    list: async (category?: string) => {
      let query = supabase.from(TABLES.EXERCISES).select("*");

      if (category) {
        query = query.eq("category", category);
      }

      return query.order("name");
    },
    get: async (exerciseId: string) => {
      return supabase
        .from(TABLES.EXERCISES)
        .select("*")
        .eq("id", exerciseId)
        .single();
    },
    search: async (searchTerm: string, language: "en" | "he" = "he") => {
      const column = language === "he" ? "name_he" : "name";
      return supabase
        .from(TABLES.EXERCISES)
        .select("*")
        .ilike(column, `%${searchTerm}%`);
    },
  },

  // Plans - תוכניות אימון
  plans: {
    list: async (userId?: string) => {
      let query = supabase.from(TABLES.PLANS).select("*");

      if (userId) {
        query = query.or(`user_id.eq.${userId},is_public.eq.true`);
      } else {
        query = query.eq("is_public", true);
      }

      return query.order("created_at", { ascending: false });
    },
    get: async (planId: string) => {
      return supabase
        .from(TABLES.PLANS)
        .select(
          `
          *,
          plan_workouts (
            *,
            workout_template:workouts (*)
          )
        `
        )
        .eq("id", planId)
        .single();
    },
    create: async (plan: any) => {
      return supabase.from(TABLES.PLANS).insert(plan).select().single();
    },
  },
};

// 🔄 Real-time subscriptions - מנויים בזמן אמת
export const realtime = {
  // Subscribe to auth changes - הרשמה לשינויי אימות
  subscribeToAuthChanges: (callback: (event: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },

  // Subscribe to profile changes - הרשמה לשינויי פרופיל
  subscribeToProfile: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`profile:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: TABLES.PROFILES,
          filter: `id=eq.${userId}`,
        },
        callback
      )
      .subscribe();
  },

  // Subscribe to workout updates - הרשמה לעדכוני אימונים
  subscribeToWorkouts: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`workouts:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: TABLES.WORKOUTS,
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();
  },

  // Unsubscribe from channel - ביטול מנוי לערוץ
  unsubscribe: async (channel: any) => {
    await supabase.removeChannel(channel);
  },
};

// 📱 Storage helpers - עזרי אחסון
export const storage = {
  // Upload avatar - העלאת אווטר
  uploadAvatar: async (userId: string, file: any) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (error) throw error;

    return supabase.storage.from("avatars").getPublicUrl(filePath);
  },

  // Delete avatar - מחיקת אווטר
  deleteAvatar: async (filePath: string) => {
    const { error } = await supabase.storage.from("avatars").remove([filePath]);

    if (error) throw error;
  },
};

// Export default client
export default supabase;
