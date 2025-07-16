// app/lib/stores/userStore.ts
import { SUPABASE_TABLES } from "@/app/constants/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { supabase } from "../supabase";
import { User } from "../types/user";

interface UserStore {
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User) => void;
  clearUser: () => void;
  becomeGuest: () => void;
  loginAsDemoUser: (demoUser: User) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  loadUser: () => Promise<void>;

  // Supabase specific
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (updates: any) => Promise<void>;
  signOut: () => Promise<void>;
}

const STORAGE_KEY = "@gymovo_user";

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  profile: null,
  isLoading: false,
  error: null,

  setUser: (user) => {
    set({ user, error: null });
    // שמירה ב-AsyncStorage
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user)).catch(
      console.error
    );
  },

  clearUser: () => {
    set({ user: null, profile: null, error: null });
    AsyncStorage.removeItem(STORAGE_KEY).catch(console.error);
  },

  becomeGuest: () => {
    const guestUser: User = {
      id: `guest-${Date.now()}`,
      email: "guest@gymovo.com",
      name: "אורח",
      role: "user",
      isGuest: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    get().setUser(guestUser);
  },

  loginAsDemoUser: async (demoUser) => {
    set({ isLoading: true, error: null });
    try {
      // סימולציה של התחברות
      await new Promise((resolve) => setTimeout(resolve, 500));

      // הוספת שדה שמציין שזה משתמש דמו
      const userWithDemoFlag = {
        ...demoUser,
        isGuest: false,
        isDemo: true,
      };

      get().setUser(userWithDemoFlag);
    } catch (error) {
      set({ error: "שגיאה בהתחברות כמשתמש דמו" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateUser: (updates) => {
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      get().setUser(updatedUser);
    }
  },

  loadUser: async () => {
    set({ isLoading: true });
    try {
      // בדיקה אם יש משתמש מחובר ב-Supabase
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        // טעינת פרופיל מ-Supabase
        const { data: profile, error } = await supabase
          .from(SUPABASE_TABLES.PROFILES)
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (!error && profile) {
          const user: User = {
            id: session.user.id,
            email: session.user.email || "",
            name: profile.name || profile.full_name || "משתמש",
            avatarUrl: profile.avatar_url,
            role: profile.role || "user",
            createdAt: profile.created_at,
            updatedAt: profile.updated_at,
          };

          set({ user, profile });
        }
      } else {
        // אם אין משתמש מחובר, נסה לטעון מהאחסון המקומי
        const savedUser = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedUser) {
          set({ user: JSON.parse(savedUser) });
        }
      }
    } catch (error) {
      console.error("Error loading user:", error);
      set({ error: "שגיאה בטעינת משתמש" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProfile: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from(SUPABASE_TABLES.PROFILES)
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;

      set({ profile: data });
    } catch (error) {
      console.error("Error fetching profile:", error);
      set({ error: "שגיאה בטעינת פרופיל" });
    }
  },

  updateProfile: async (updates: any) => {
    const user = get().user;
    if (!user || user.isGuest || user.isDemo) return;

    try {
      const { data, error } = await supabase
        .from(SUPABASE_TABLES.PROFILES)
        .update(updates)
        .eq("id", user.id)
        .select()
        .single();

      if (error) throw error;

      set({ profile: data });

      // עדכון גם את המידע המקומי
      get().updateUser({ name: data.name || data.full_name });
    } catch (error) {
      console.error("Error updating profile:", error);
      set({ error: "שגיאה בעדכון פרופיל" });
      throw error;
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true });

      // התנתקות מ-Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // ניקוי נתונים מקומיים
      get().clearUser();
    } catch (error) {
      console.error("Error signing out:", error);
      set({ error: "שגיאה בהתנתקות" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
