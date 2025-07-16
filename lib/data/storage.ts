/**
 * 📁 Path: /lib/data/storage.ts
 * 📝 Description: Local storage management - ניהול אחסון מקומי
 * 📅 Last Modified: 2024-01-XX 14:30
 *
 * 🔗 Dependencies:
 * - @react-native-async-storage/async-storage
 *
 * ⚠️ Note: All storage operations are wrapped in try-catch for safety
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

// 🔑 Storage keys - מפתחות אחסון
const STORAGE_KEYS = {
  USER: "@gymovo_user",
  WORKOUTS: "@gymovo_workouts",
  PLANS: "@gymovo_plans",
  SETTINGS: "@gymovo_settings",
  ONBOARDING: "@gymovo_onboarding_completed",
  AUTH_TOKEN: "@gymovo_auth_token",
  LAST_SYNC: "@gymovo_last_sync",
  OFFLINE_QUEUE: "@gymovo_offline_queue",
} as const;

// 📦 Storage utility object - אובייקט כלי אחסון
export const storage = {
  // 👤 User operations - פעולות משתמש
  user: {
    async save(user: any) {
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      } catch (error) {
        console.error("Error saving user:", error);
        throw error;
      }
    },

    async get() {
      try {
        const user = await AsyncStorage.getItem(STORAGE_KEYS.USER);
        return user ? JSON.parse(user) : null;
      } catch (error) {
        console.error("Error getting user:", error);
        return null;
      }
    },

    async remove() {
      try {
        await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      } catch (error) {
        console.error("Error removing user:", error);
        throw error;
      }
    },
  },

  // 🏋️ Workouts operations - פעולות אימונים
  workouts: {
    async save(workouts: any[]) {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEYS.WORKOUTS,
          JSON.stringify(workouts)
        );
      } catch (error) {
        console.error("Error saving workouts:", error);
        throw error;
      }
    },

    async get() {
      try {
        const workouts = await AsyncStorage.getItem(STORAGE_KEYS.WORKOUTS);
        return workouts ? JSON.parse(workouts) : [];
      } catch (error) {
        console.error("Error getting workouts:", error);
        return [];
      }
    },

    async add(workout: any) {
      try {
        const workouts = await this.get();
        workouts.push(workout);
        await this.save(workouts);
      } catch (error) {
        console.error("Error adding workout:", error);
        throw error;
      }
    },

    async update(id: string, updates: any) {
      try {
        const workouts = await this.get();
        const index = workouts.findIndex((w: any) => w.id === id);
        if (index !== -1) {
          workouts[index] = { ...workouts[index], ...updates };
          await this.save(workouts);
        }
      } catch (error) {
        console.error("Error updating workout:", error);
        throw error;
      }
    },

    async remove(id: string) {
      try {
        const workouts = await this.get();
        const filtered = workouts.filter((w: any) => w.id !== id);
        await this.save(filtered);
      } catch (error) {
        console.error("Error removing workout:", error);
        throw error;
      }
    },
  },

  // ⚙️ Settings operations - פעולות הגדרות
  settings: {
    async save(settings: any) {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEYS.SETTINGS,
          JSON.stringify(settings)
        );
      } catch (error) {
        console.error("Error saving settings:", error);
        throw error;
      }
    },

    async get() {
      try {
        const settings = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
        return settings ? JSON.parse(settings) : {};
      } catch (error) {
        console.error("Error getting settings:", error);
        return {};
      }
    },

    async update(updates: any) {
      try {
        const settings = await this.get();
        const updated = { ...settings, ...updates };
        await this.save(updated);
      } catch (error) {
        console.error("Error updating settings:", error);
        throw error;
      }
    },
  },

  // 🎯 Onboarding operations - פעולות אונבורדינג
  onboarding: {
    async setCompleted(completed: boolean = true) {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEYS.ONBOARDING,
          JSON.stringify(completed)
        );
      } catch (error) {
        console.error("Error saving onboarding status:", error);
        throw error;
      }
    },

    async isCompleted() {
      try {
        const completed = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING);
        return completed ? JSON.parse(completed) : false;
      } catch (error) {
        console.error("Error getting onboarding status:", error);
        return false;
      }
    },
  },

  // 🔐 Auth token operations - פעולות token אימות
  auth: {
    async saveToken(token: string) {
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      } catch (error) {
        console.error("Error saving auth token:", error);
        throw error;
      }
    },

    async getToken() {
      try {
        return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      } catch (error) {
        console.error("Error getting auth token:", error);
        return null;
      }
    },

    async removeToken() {
      try {
        await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      } catch (error) {
        console.error("Error removing auth token:", error);
        throw error;
      }
    },
  },

  // 📅 Last sync operations - פעולות סנכרון אחרון
  sync: {
    async saveLastSync(timestamp: string) {
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.LAST_SYNC, timestamp);
      } catch (error) {
        console.error("Error saving last sync:", error);
        throw error;
      }
    },

    async getLastSync() {
      try {
        return await AsyncStorage.getItem(STORAGE_KEYS.LAST_SYNC);
      } catch (error) {
        console.error("Error getting last sync:", error);
        return null;
      }
    },
  },

  // 📴 Offline queue operations - פעולות תור אופליין
  offlineQueue: {
    async add(action: any) {
      try {
        const queue = await this.getAll();
        queue.push({
          ...action,
          timestamp: new Date().toISOString(),
          id: `${Date.now()}-${Math.random()}`,
        });
        await AsyncStorage.setItem(
          STORAGE_KEYS.OFFLINE_QUEUE,
          JSON.stringify(queue)
        );
      } catch (error) {
        console.error("Error adding to offline queue:", error);
        throw error;
      }
    },

    async getAll() {
      try {
        const queue = await AsyncStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE);
        return queue ? JSON.parse(queue) : [];
      } catch (error) {
        console.error("Error getting offline queue:", error);
        return [];
      }
    },

    async clear() {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEYS.OFFLINE_QUEUE,
          JSON.stringify([])
        );
      } catch (error) {
        console.error("Error clearing offline queue:", error);
        throw error;
      }
    },

    async process(callback: (action: any) => Promise<boolean>) {
      try {
        const queue = await this.getAll();
        const remaining = [];

        for (const action of queue) {
          try {
            const success = await callback(action);
            if (!success) {
              remaining.push(action);
            }
          } catch {
            remaining.push(action);
          }
        }

        await AsyncStorage.setItem(
          STORAGE_KEYS.OFFLINE_QUEUE,
          JSON.stringify(remaining)
        );

        return {
          processed: queue.length - remaining.length,
          remaining: remaining.length,
        };
      } catch (error) {
        console.error("Error processing offline queue:", error);
        throw error;
      }
    },
  },

  // 🗑️ Utility functions - פונקציות כלליות
  async getAllKeys() {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error("Error getting all keys:", error);
      return [];
    }
  },

  async multiGet(keys: string[]) {
    try {
      const results = await AsyncStorage.multiGet(keys);
      return results.reduce((acc, [key, value]) => {
        if (value) {
          acc[key] = JSON.parse(value);
        }
        return acc;
      }, {} as Record<string, any>);
    } catch (error) {
      console.error("Error multi getting:", error);
      return {};
    }
  },

  async getStorageInfo() {
    try {
      const keys = await this.getAllKeys();
      const info = {
        totalKeys: keys.length,
        gymvoKeys: keys.filter((k) => k.startsWith("@gymovo")).length,
        size: 0,
      };

      // חישוב גודל משוער - Calculate estimated size
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          info.size += value.length;
        }
      }

      return info;
    } catch (error) {
      console.error("Error getting storage info:", error);
      return { totalKeys: 0, gymvoKeys: 0, size: 0 };
    }
  },
};

// 🧹 Clear all data - ניקוי כל הנתונים
export async function clearAllData() {
  try {
    const keys = Object.values(STORAGE_KEYS);
    await AsyncStorage.multiRemove(keys);
    console.log("All data cleared successfully");
  } catch (error) {
    console.error("Error clearing all data:", error);
    throw error;
  }
}

// 🔄 Export/Import utilities - כלי ייצוא/ייבוא
export const dataTransfer = {
  async exportAll() {
    try {
      const keys = Object.values(STORAGE_KEYS);
      const data: Record<string, any> = {};

      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          data[key] = JSON.parse(value);
        }
      }

      return {
        version: "1.0",
        exportDate: new Date().toISOString(),
        data,
      };
    } catch (error) {
      console.error("Error exporting data:", error);
      throw error;
    }
  },

  async importAll(exportData: any) {
    try {
      if (!exportData.version || !exportData.data) {
        throw new Error("Invalid export data format");
      }

      const entries = Object.entries(exportData.data).map(([key, value]) => [
        key,
        JSON.stringify(value),
      ]);

      await AsyncStorage.multiSet(entries as [string, string][]);
      console.log("Data imported successfully");
    } catch (error) {
      console.error("Error importing data:", error);
      throw error;
    }
  },
};
