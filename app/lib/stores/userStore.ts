// app/lib/stores/userStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { User } from "../types/user";

interface UserStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User) => void;
  clearUser: () => void;
  becomeGuest: () => void;
  loginAsDemoUser: (demoUser: User) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  loadUser: () => Promise<void>;
}

const STORAGE_KEY = "@gymovo_user";

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
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
    set({ user: null, error: null });
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
      const savedUser = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedUser) {
        set({ user: JSON.parse(savedUser) });
      }
    } catch (error) {
      set({ error: "שגיאה בטעינת משתמש" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
