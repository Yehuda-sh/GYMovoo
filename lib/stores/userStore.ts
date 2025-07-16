/**
 * 📁 Path: /lib/stores/userStore.ts
 * 📝 Description: מאגר מצב משתמש - User state store (Zustand)
 * 🔢 Version: 1.0
 *
 * 🔗 Dependencies:
 * - zustand
 * - @/lib/supabase
 * - @/lib/types/user
 * - @/constants/demoUsers
 *
 * ⚠️ Central user state management
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DEMO_USERS } from "../../constants/demoUsers"; // Changed path
import { auth, db, supabase } from "../supabase"; // Changed from '@/lib/supabase'
import type {
  AuthState,
  LoginCredentials,
  SignupData,
  User,
} from "../types/user"; // Changed path

// 🏪 User store interface - ממשק מאגר המשתמש
interface UserStore extends AuthState {
  // Actions - פעולות
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  loginAsDemo: (
    level: "beginner" | "intermediate" | "advanced"
  ) => Promise<void>;
  loginAsGuest: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;

  // Helpers - עזרים
  isDemo: boolean;
  isGuest: boolean;
}

// 🛠️ Create user store - יצירת מאגר המשתמש
export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      // Initial state - מצב התחלתי
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,
      isDemo: false,
      isGuest: false,

      // 🔐 Login - התחברות
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });

        try {
          const { data, error } = await auth.signIn(
            credentials.email,
            credentials.password
          );

          if (error) throw error;

          if (data.user) {
            // Load full user data - טעינת נתוני משתמש מלאים
            const { data: profile } = await db.profiles.get(data.user.id);
            const { data: preferences } = await db.preferences.get(
              data.user.id
            );
            const { data: stats } = await db.stats.get(data.user.id);

            const user: User = {
              id: data.user.id,
              email: data.user.email!,
              profile: profile || null,
              preferences: preferences || null,
              stats: stats || null,
              isDemo: false,
            };

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              isDemo: false,
              isGuest: false,
            });
          }
        } catch (error: any) {
          console.error("Login error:", error);
          set({
            error: error.message || "שגיאה בהתחברות",
            isLoading: false,
          });
          throw error;
        }
      },

      // 📝 Signup - הרשמה
      signup: async (data: SignupData) => {
        set({ isLoading: true, error: null });

        try {
          const { data: authData, error } = await auth.signUp(
            data.email,
            data.password,
            data.fullName
          );

          if (error) throw error;

          if (authData.user) {
            set({
              isLoading: false,
              error: null,
            });

            // Note: User needs to verify email before logging in
            // הערה: המשתמש צריך לאמת אימייל לפני כניסה
          }
        } catch (error: any) {
          console.error("Signup error:", error);
          set({
            error: error.message || "שגיאה בהרשמה",
            isLoading: false,
          });
          throw error;
        }
      },

      // 🚪 Logout - התנתקות
      logout: async () => {
        set({ isLoading: true });

        try {
          const { error } = await auth.signOut();
          if (error) throw error;

          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isDemo: false,
            isGuest: false,
            error: null,
          });
        } catch (error: any) {
          console.error("Logout error:", error);
          set({
            error: error.message || "שגיאה בהתנתקות",
            isLoading: false,
          });
        }
      },

      // 🎭 Login as demo user - כניסה כמשתמש דמו
      loginAsDemo: async (level: "beginner" | "intermediate" | "advanced") => {
        set({ isLoading: true, error: null });

        try {
          const demoUser = DEMO_USERS.find((u) => u.level === level);
          if (!demoUser) throw new Error("Demo user not found");

          // Create demo user object - יצירת אובייקט משתמש דמו
          const user: User = {
            id: `demo-${level}`,
            email: demoUser.email,
            profile: {
              id: `demo-${level}`,
              email: demoUser.email,
              full_name: demoUser.name,
              avatar_url: null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              is_demo_user: true,
            },
            preferences: {
              id: `demo-${level}`,
              user_id: `demo-${level}`,
              language: "he",
              units: "metric",
              theme: "dark",
              notifications_enabled: true,
              workout_reminders: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            stats: {
              id: `demo-${level}`,
              user_id: `demo-${level}`,
              total_workouts: demoUser.stats.workoutsCompleted,
              total_minutes: demoUser.stats.totalMinutes,
              current_streak: demoUser.stats.currentStreak,
              longest_streak: demoUser.stats.currentStreak,
              last_workout_date: null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            isDemo: true,
          };

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            isDemo: true,
            isGuest: false,
          });
        } catch (error: any) {
          console.error("Demo login error:", error);
          set({
            error: error.message || "שגיאה בכניסה כמשתמש דמו",
            isLoading: false,
          });
        }
      },

      // 👤 Login as guest - כניסה כאורח
      loginAsGuest: () => {
        const guestUser: User = {
          id: "guest",
          email: "guest@gymapp.com",
          profile: {
            id: "guest",
            email: "guest@gymapp.com",
            full_name: "אורח",
            avatar_url: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            is_demo_user: true,
          },
          preferences: {
            id: "guest",
            user_id: "guest",
            language: "he",
            units: "metric",
            theme: "dark",
            notifications_enabled: false,
            workout_reminders: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          stats: {
            id: "guest",
            user_id: "guest",
            total_workouts: 0,
            total_minutes: 0,
            current_streak: 0,
            longest_streak: 0,
            last_workout_date: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          isDemo: true,
        };

        set({
          user: guestUser,
          isAuthenticated: true,
          isDemo: false,
          isGuest: true,
          isLoading: false,
          error: null,
        });
      },

      // 🔄 Update profile - עדכון פרופיל
      updateProfile: async (updates: Partial<User>) => {
        const currentUser = get().user;
        if (!currentUser || get().isDemo || get().isGuest) return;

        set({ isLoading: true, error: null });

        try {
          if (updates.profile) {
            await db.profiles.update(currentUser.id, updates.profile);
          }

          if (updates.preferences) {
            await db.preferences.update(currentUser.id, updates.preferences);
          }

          // Update local state - עדכון מצב מקומי
          set({
            user: {
              ...currentUser,
              ...updates,
              profile: updates.profile
                ? { ...currentUser.profile, ...updates.profile }
                : currentUser.profile,
              preferences: updates.preferences
                ? { ...currentUser.preferences, ...updates.preferences }
                : currentUser.preferences,
            },
            isLoading: false,
          });
        } catch (error: any) {
          console.error("Update profile error:", error);
          set({
            error: error.message || "שגיאה בעדכון פרופיל",
            isLoading: false,
          });
          throw error;
        }
      },

      // 🔄 Refresh user data - רענון נתוני משתמש
      refreshUser: async () => {
        const currentUser = get().user;
        if (!currentUser || get().isDemo || get().isGuest) return;

        set({ isLoading: true });

        try {
          const { data: profile } = await db.profiles.get(currentUser.id);
          const { data: preferences } = await db.preferences.get(
            currentUser.id
          );
          const { data: stats } = await db.stats.get(currentUser.id);

          set({
            user: {
              ...currentUser,
              profile: profile || currentUser.profile,
              preferences: preferences || currentUser.preferences,
              stats: stats || currentUser.stats,
            },
            isLoading: false,
          });
        } catch (error: any) {
          console.error("Refresh user error:", error);
          set({
            error: error.message || "שגיאה ברענון נתונים",
            isLoading: false,
          });
        }
      },

      // 🧹 Clear error - ניקוי שגיאה
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "gym-user-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isDemo: state.isDemo,
        isGuest: state.isGuest,
      }),
    }
  )
);

// 🔍 Selectors - סלקטורים
export const useUser = () => useUserStore((state) => state.user);
export const useIsAuthenticated = () =>
  useUserStore((state) => state.isAuthenticated);
export const useIsLoading = () => useUserStore((state) => state.isLoading);
export const useAuthError = () => useUserStore((state) => state.error);
export const useIsDemo = () => useUserStore((state) => state.isDemo);
export const useIsGuest = () => useUserStore((state) => state.isGuest);

// 🚀 Initialize auth listener - אתחול מאזין אימות
supabase.auth.onAuthStateChange(async (event: any, session: any) => {
  const { user, isDemo, isGuest } = useUserStore.getState();

  // Skip for demo/guest users - דילוג על משתמשי דמו/אורח
  if (isDemo || isGuest) return;

  if (event === "SIGNED_IN" && session?.user && !user) {
    // Auto-refresh user data on sign in
    await useUserStore.getState().refreshUser();
  } else if (event === "SIGNED_OUT") {
    // Clear state on sign out
    useUserStore.setState({
      user: null,
      isAuthenticated: false,
      isDemo: false,
      isGuest: false,
    });
  }
});
