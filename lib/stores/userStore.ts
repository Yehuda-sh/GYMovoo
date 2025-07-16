/**
 * 📁 Path: /lib/stores/userStore.ts
 * 📝 Description: Global user state management - ניהול מצב משתמש גלובלי
 * 📅 Last Modified: 2024-01-XX 14:30
 *
 * 🔗 Dependencies:
 * - zustand
 * - @react-native-async-storage/async-storage
 * - /lib/supabase
 * - /lib/types/user
 * - /constants/supabase
 *
 * ⚠️ Note: This store manages both authenticated and guest users
 */

import { auth, db } from "@/lib/supabase";
import { User, createDemoUser, createGuestUser } from "@/lib/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

// 🏪 User store interface - ממשק חנות המשתמש
interface UserStore {
  // State
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  // Actions - פעולות
  setUser: (user: User) => void;
  clearUser: () => void;
  becomeGuest: () => void;
  loginAsDemoUser: (demoUser: any) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  loadUser: () => Promise<void>;

  // Supabase specific - פעולות ספציפיות לSupabase
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (updates: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;

  // Helpers
  checkAuthStatus: () => Promise<boolean>;
  syncWithSupabase: () => Promise<void>;
}

// 🔑 Storage key - מפתח אחסון
const STORAGE_KEY = "@gymovo_user";

// 🏪 Create store - יצירת החנות
export const useUserStore = create<UserStore>((set, get) => ({
  // 🔄 Initial state - מצב התחלתי
  user: null,
  profile: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  // 👤 Set user - הגדרת משתמש
  setUser: (user) => {
    set({
      user,
      error: null,
      isAuthenticated: true,
    });

    // 💾 שמירה באחסון מקומי - Save to local storage
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user)).catch(
      console.error
    );
  },

  // 🗑️ Clear user - ניקוי משתמש
  clearUser: () => {
    set({
      user: null,
      profile: null,
      error: null,
      isAuthenticated: false,
    });

    // 🧹 ניקוי אחסון - Clear storage
    AsyncStorage.removeItem(STORAGE_KEY).catch(console.error);
  },

  // 🏃 Become guest - הפוך לאורח
  becomeGuest: () => {
    const guestUser = createGuestUser();
    get().setUser(guestUser);
  },

  // 🎮 Login as demo user - התחבר כמשתמש דמו
  loginAsDemoUser: async (demoData) => {
    set({ isLoading: true, error: null });

    try {
      // ⏱️ סימולציה של התחברות - Simulate login delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 👤 יצירת משתמש דמו - Create demo user
      const demoUser = createDemoUser(demoData);

      get().setUser(demoUser);
    } catch (error: any) {
      set({ error: error.message || "שגיאה בהתחברות כמשתמש דמו" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // 🔄 Update user - עדכון משתמש
  updateUser: (updates) => {
    const currentUser = get().user;
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    get().setUser(updatedUser);
  },

  // 📥 Load user - טעינת משתמש
  loadUser: async () => {
    set({ isLoading: true });

    try {
      // 🔐 בדיקה אם יש משתמש מחובר ב-Supabase
      const session = await auth.getSession();

      if (session?.user) {
        // 📊 טעינת פרופיל מ-Supabase
        const profile = await db.profiles.get(session.user.id);

        if (profile) {
          const user: User = {
            id: session.user.id,
            email: session.user.email || "",
            name: profile.name || profile.full_name || "משתמש",
            avatarUrl: profile.avatar_url,
            role: profile.role || "user",
            createdAt: profile.created_at,
            updatedAt: profile.updated_at,
          };

          set({
            user,
            profile,
            isAuthenticated: true,
          });
        }
      } else {
        // 💾 נסה לטעון מהאחסון המקומי - Try loading from local storage
        const savedUser = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedUser) {
          const user = JSON.parse(savedUser);
          set({
            user,
            isAuthenticated: true,
          });
        }
      }
    } catch (error: any) {
      console.error("Error loading user:", error);
      set({ error: "שגיאה בטעינת משתמש" });
    } finally {
      set({ isLoading: false });
    }
  },

  // 📊 Fetch profile - טעינת פרופיל
  fetchProfile: async (userId: string) => {
    try {
      const profile = await db.profiles.get(userId);
      set({ profile });
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      set({ error: "שגיאה בטעינת פרופיל" });
    }
  },

  // 🔄 Update profile - עדכון פרופיל
  updateProfile: async (updates: any) => {
    const user = get().user;
    if (!user || user.isGuest || user.isDemo) {
      set({ error: "לא ניתן לעדכן פרופיל של אורח או משתמש דמו" });
      return;
    }

    try {
      const updatedProfile = await db.profiles.update(user.id, updates);
      set({ profile: updatedProfile });

      // 🔄 עדכון גם את המידע המקומי - Update local info too
      get().updateUser({
        name: updatedProfile.name || updatedProfile.full_name,
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      set({ error: "שגיאה בעדכון פרופיל" });
      throw error;
    }
  },

  // 🔐 Sign in - התחברות
  signIn: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      const authData = await auth.signIn(email, password);

      if (authData.user) {
        // 📊 טעינת פרופיל - Load profile
        const profile = await db.profiles.get(authData.user.id);

        const user: User = {
          id: authData.user.id,
          email: authData.user.email!,
          name: profile?.name || profile?.full_name || "משתמש",
          avatarUrl: profile?.avatar_url,
          role: profile?.role || "user",
          createdAt: profile?.created_at || new Date().toISOString(),
          updatedAt: profile?.updated_at || new Date().toISOString(),
        };

        get().setUser(user);
        set({ profile });
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      set({ error: error.message || "שגיאה בהתחברות" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // 📝 Sign up - הרשמה
  signUp: async (email: string, password: string, name: string) => {
    set({ isLoading: true, error: null });

    try {
      const authData = await auth.signUp(email, password, { name });

      if (authData.user) {
        // 👤 יצירת פרופיל בסיסי - Create basic profile
        const user: User = {
          id: authData.user.id,
          email: authData.user.email!,
          name: name,
          role: "user",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        get().setUser(user);
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
      set({ error: error.message || "שגיאה בהרשמה" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // 🚪 Sign out - התנתקות
  signOut: async () => {
    set({ isLoading: true });

    try {
      await auth.signOut();
      get().clearUser();
    } catch (error: any) {
      console.error("Sign out error:", error);
      set({ error: "שגיאה בהתנתקות" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // 🔍 Check auth status - בדיקת מצב אימות
  checkAuthStatus: async () => {
    try {
      const session = await auth.getSession();
      const isAuthenticated = !!session?.user;
      set({ isAuthenticated });
      return isAuthenticated;
    } catch (error) {
      return false;
    }
  },

  // 🔄 Sync with Supabase - סנכרון עם Supabase
  syncWithSupabase: async () => {
    const user = get().user;
    if (!user || user.isGuest || user.isDemo) return;

    try {
      await get().fetchProfile(user.id);
    } catch (error) {
      console.error("Sync error:", error);
    }
  },
}));

// 🎣 Hooks for common selectors - הוקים לבוררים נפוצים
export const useUser = () => useUserStore((state) => state.user);
export const useIsAuthenticated = () =>
  useUserStore((state) => state.isAuthenticated);
export const useIsGuest = () =>
  useUserStore((state) => state.user?.isGuest ?? false);
export const useIsDemo = () =>
  useUserStore((state) => state.user?.isDemo ?? false);
