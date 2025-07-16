/**
 * 📁 Path: /lib/data/storage.ts
 * 📝 Description: ניהול אחסון מקומי - Local storage management
 * 🔢 Version: 1.0
 *
 * 🔗 Dependencies:
 * - @react-native-async-storage/async-storage
 *
 * ⚠️ Handles all local data persistence
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

// 🔑 Storage keys - מפתחות אחסון
export const STORAGE_KEYS = {
  // User related - קשור למשתמש
  USER_DATA: "@gym_app:user_data",
  USER_TOKEN: "@gym_app:user_token",
  USER_PREFERENCES: "@gym_app:user_preferences",

  // App settings - הגדרות אפליקציה
  APP_LANGUAGE: "@gym_app:language",
  APP_THEME: "@gym_app:theme",
  APP_FIRST_LAUNCH: "@gym_app:first_launch",
  ONBOARDING_COMPLETED: "@gym_app:onboarding_completed",

  // Workout data - נתוני אימון
  ACTIVE_WORKOUT: "@gym_app:active_workout",
  WORKOUT_DRAFTS: "@gym_app:workout_drafts",
  EXERCISE_FAVORITES: "@gym_app:exercise_favorites",

  // Cache - מטמון
  EXERCISES_CACHE: "@gym_app:exercises_cache",
  PLANS_CACHE: "@gym_app:plans_cache",
  LAST_SYNC: "@gym_app:last_sync",

  // Dev mode - מצב פיתוח
  DEV_MODE_ENABLED: "@gym_app:dev_mode",
  DEV_MODE_TAPS: "@gym_app:dev_taps",
} as const;

// 🛠️ Storage utilities - כלי אחסון

/**
 * 💾 Save data to storage - שמירת נתונים לאחסון
 */
export const saveToStorage = async <T>(
  key: string,
  value: T
): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log(`✅ Saved to storage: ${key}`);
    return true;
  } catch (error) {
    console.error(`❌ Error saving to storage: ${key}`, error);
    return false;
  }
};

/**
 * 📖 Get data from storage - קבלת נתונים מאחסון
 */
export const getFromStorage = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue === null) {
      console.log(`ℹ️ No data found for key: ${key}`);
      return null;
    }

    const value = JSON.parse(jsonValue) as T;
    console.log(`✅ Retrieved from storage: ${key}`);
    return value;
  } catch (error) {
    console.error(`❌ Error getting from storage: ${key}`, error);
    return null;
  }
};

/**
 * 🗑️ Remove data from storage - מחיקת נתונים מאחסון
 */
export const removeFromStorage = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`✅ Removed from storage: ${key}`);
    return true;
  } catch (error) {
    console.error(`❌ Error removing from storage: ${key}`, error);
    return false;
  }
};

/**
 * 🗑️ Clear all storage - ניקוי כל האחסון
 */
export const clearAllStorage = async (): Promise<boolean> => {
  try {
    await AsyncStorage.clear();
    console.log("✅ All storage cleared");
    return true;
  } catch (error) {
    console.error("❌ Error clearing storage:", error);
    return false;
  }
};

/**
 * 🔑 Get all storage keys - קבלת כל מפתחות האחסון
 */
export const getAllStorageKeys = async (): Promise<string[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    console.log(`✅ Found ${keys.length} storage keys`);
    return keys;
  } catch (error) {
    console.error("❌ Error getting storage keys:", error);
    return [];
  }
};

/**
 * 📊 Get storage info - קבלת מידע על האחסון
 */
export const getStorageInfo = async () => {
  try {
    const keys = await getAllStorageKeys();
    const info: Record<string, any> = {};

    for (const key of keys) {
      const value = await AsyncStorage.getItem(key);
      info[key] = value ? JSON.parse(value) : null;
    }

    return info;
  } catch (error) {
    console.error("❌ Error getting storage info:", error);
    return {};
  }
};

// 🎯 Specific storage functions - פונקציות אחסון ספציפיות

/**
 * 👤 User storage - אחסון משתמש
 */
export const userStorage = {
  // Save user data - שמירת נתוני משתמש
  saveUser: async (userData: any) => {
    return saveToStorage(STORAGE_KEYS.USER_DATA, userData);
  },

  // Get user data - קבלת נתוני משתמש
  getUser: async () => {
    return getFromStorage<any>(STORAGE_KEYS.USER_DATA);
  },

  // Clear user data - ניקוי נתוני משתמש
  clearUser: async () => {
    return removeFromStorage(STORAGE_KEYS.USER_DATA);
  },

  // Save token - שמירת טוקן
  saveToken: async (token: string) => {
    return saveToStorage(STORAGE_KEYS.USER_TOKEN, token);
  },

  // Get token - קבלת טוקן
  getToken: async () => {
    return getFromStorage<string>(STORAGE_KEYS.USER_TOKEN);
  },

  // Clear token - ניקוי טוקן
  clearToken: async () => {
    return removeFromStorage(STORAGE_KEYS.USER_TOKEN);
  },
};

/**
 * ⚙️ App settings storage - אחסון הגדרות אפליקציה
 */
export const settingsStorage = {
  // Save language - שמירת שפה
  saveLanguage: async (language: "he" | "en") => {
    return saveToStorage(STORAGE_KEYS.APP_LANGUAGE, language);
  },

  // Get language - קבלת שפה
  getLanguage: async () => {
    return getFromStorage<"he" | "en">(STORAGE_KEYS.APP_LANGUAGE);
  },

  // Save theme - שמירת ערכת נושא
  saveTheme: async (theme: "light" | "dark" | "auto") => {
    return saveToStorage(STORAGE_KEYS.APP_THEME, theme);
  },

  // Get theme - קבלת ערכת נושא
  getTheme: async () => {
    return getFromStorage<"light" | "dark" | "auto">(STORAGE_KEYS.APP_THEME);
  },

  // Check if first launch - בדיקה אם זו הפעלה ראשונה
  isFirstLaunch: async () => {
    const firstLaunch = await getFromStorage<boolean>(
      STORAGE_KEYS.APP_FIRST_LAUNCH
    );
    return firstLaunch === null || firstLaunch === true;
  },

  // Mark first launch complete - סימון השלמת הפעלה ראשונה
  completeFirstLaunch: async () => {
    return saveToStorage(STORAGE_KEYS.APP_FIRST_LAUNCH, false);
  },

  // Check onboarding status - בדיקת סטטוס הדרכה
  isOnboardingCompleted: async () => {
    return getFromStorage<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETED);
  },

  // Complete onboarding - השלמת הדרכה
  completeOnboarding: async () => {
    return saveToStorage(STORAGE_KEYS.ONBOARDING_COMPLETED, true);
  },
};

/**
 * 🏋️ Workout storage - אחסון אימונים
 */
export const workoutStorage = {
  // Save active workout - שמירת אימון פעיל
  saveActiveWorkout: async (workout: any) => {
    return saveToStorage(STORAGE_KEYS.ACTIVE_WORKOUT, workout);
  },

  // Get active workout - קבלת אימון פעיל
  getActiveWorkout: async () => {
    return getFromStorage<any>(STORAGE_KEYS.ACTIVE_WORKOUT);
  },

  // Clear active workout - ניקוי אימון פעיל
  clearActiveWorkout: async () => {
    return removeFromStorage(STORAGE_KEYS.ACTIVE_WORKOUT);
  },

  // Save workout draft - שמירת טיוטת אימון
  saveWorkoutDraft: async (draft: any) => {
    const drafts =
      (await getFromStorage<any[]>(STORAGE_KEYS.WORKOUT_DRAFTS)) || [];
    drafts.push(draft);
    return saveToStorage(STORAGE_KEYS.WORKOUT_DRAFTS, drafts);
  },

  // Get workout drafts - קבלת טיוטות אימון
  getWorkoutDrafts: async () => {
    return getFromStorage<any[]>(STORAGE_KEYS.WORKOUT_DRAFTS) || [];
  },

  // Clear workout drafts - ניקוי טיוטות אימון
  clearWorkoutDrafts: async () => {
    return removeFromStorage(STORAGE_KEYS.WORKOUT_DRAFTS);
  },

  // Toggle favorite exercise - החלפת מצב תרגיל מועדף
  toggleFavoriteExercise: async (exerciseId: string) => {
    const favorites =
      (await getFromStorage<string[]>(STORAGE_KEYS.EXERCISE_FAVORITES)) || [];
    const index = favorites.indexOf(exerciseId);

    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(exerciseId);
    }

    return saveToStorage(STORAGE_KEYS.EXERCISE_FAVORITES, favorites);
  },

  // Get favorite exercises - קבלת תרגילים מועדפים
  getFavoriteExercises: async () => {
    return getFromStorage<string[]>(STORAGE_KEYS.EXERCISE_FAVORITES) || [];
  },
};

/**
 * 💾 Cache storage - אחסון מטמון
 */
export const cacheStorage = {
  // Save to cache with expiry - שמירה למטמון עם תפוגה
  saveToCache: async <T>(key: string, data: T, expiryMinutes: number = 60) => {
    const cacheData = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + expiryMinutes * 60 * 1000,
    };
    return saveToStorage(key, cacheData);
  },

  // Get from cache - קבלה מהמטמון
  getFromCache: async <T>(key: string): Promise<T | null> => {
    const cacheData = await getFromStorage<{
      data: T;
      timestamp: number;
      expiry: number;
    }>(key);

    if (!cacheData) return null;

    // Check if expired - בדיקה אם פג תוקף
    if (Date.now() > cacheData.expiry) {
      await removeFromStorage(key);
      return null;
    }

    return cacheData.data;
  },

  // Clear expired cache - ניקוי מטמון שפג תוקפו
  clearExpiredCache: async () => {
    const keys = await getAllStorageKeys();
    const cacheKeys = keys.filter((key) => key.includes("cache"));

    for (const key of cacheKeys) {
      const cacheData = await getFromStorage<any>(key);
      if (cacheData && cacheData.expiry && Date.now() > cacheData.expiry) {
        await removeFromStorage(key);
      }
    }
  },
};

/**
 * 🔧 Dev mode storage - אחסון מצב פיתוח
 */
export const devModeStorage = {
  // Check if dev mode is enabled - בדיקה אם מצב פיתוח מופעל
  isDevModeEnabled: async () => {
    return getFromStorage<boolean>(STORAGE_KEYS.DEV_MODE_ENABLED) || false;
  },

  // Enable dev mode - הפעלת מצב פיתוח
  enableDevMode: async () => {
    return saveToStorage(STORAGE_KEYS.DEV_MODE_ENABLED, true);
  },

  // Disable dev mode - כיבוי מצב פיתוח
  disableDevMode: async () => {
    return saveToStorage(STORAGE_KEYS.DEV_MODE_ENABLED, false);
  },

  // Track dev mode taps - מעקב אחר לחיצות למצב פיתוח
  trackDevModeTap: async () => {
    const taps = (await getFromStorage<{ count: number; lastTap: number }>(
      STORAGE_KEYS.DEV_MODE_TAPS
    )) || { count: 0, lastTap: 0 };

    const now = Date.now();

    // Reset if more than 500ms passed - איפוס אם עברו יותר מ-500ms
    if (now - taps.lastTap > 500) {
      taps.count = 1;
    } else {
      taps.count++;
    }

    taps.lastTap = now;

    await saveToStorage(STORAGE_KEYS.DEV_MODE_TAPS, taps);

    return taps.count;
  },

  // Reset dev mode taps - איפוס לחיצות מצב פיתוח
  resetDevModeTaps: async () => {
    return removeFromStorage(STORAGE_KEYS.DEV_MODE_TAPS);
  },
};

// 🚀 Initialize storage - אתחול אחסון
export const initializeStorage = async () => {
  try {
    // Clear expired cache on app start - ניקוי מטמון שפג תוקפו בהפעלת האפליקציה
    await cacheStorage.clearExpiredCache();

    // Check if first launch - בדיקה אם זו הפעלה ראשונה
    const isFirst = await settingsStorage.isFirstLaunch();

    if (isFirst) {
      // Set default settings - הגדרת ברירות מחדל
      await settingsStorage.saveLanguage("he");
      await settingsStorage.saveTheme("dark");
    }

    console.log("✅ Storage initialized successfully");
    return true;
  } catch (error) {
    console.error("❌ Error initializing storage:", error);
    return false;
  }
};
