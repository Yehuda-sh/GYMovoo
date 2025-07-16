// app/lib/data/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  USER: "@gymovo_user",
  WORKOUTS: "@gymovo_workouts",
  PLANS: "@gymovo_plans",
  SETTINGS: "@gymovo_settings",
  ONBOARDING: "@gymovo_onboarding_completed",
};

export const storage = {
  // User
  async saveUser(user: any) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error("Error saving user:", error);
      throw error;
    }
  },

  async getUser() {
    try {
      const user = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  },

  async removeUser() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
      console.error("Error removing user:", error);
      throw error;
    }
  },

  // Workouts
  async saveWorkouts(workouts: any[]) {
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

  async getWorkouts() {
    try {
      const workouts = await AsyncStorage.getItem(STORAGE_KEYS.WORKOUTS);
      return workouts ? JSON.parse(workouts) : [];
    } catch (error) {
      console.error("Error getting workouts:", error);
      return [];
    }
  },

  // Settings
  async saveSettings(settings: any) {
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

  async getSettings() {
    try {
      const settings = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return settings ? JSON.parse(settings) : {};
    } catch (error) {
      console.error("Error getting settings:", error);
      return {};
    }
  },

  // Onboarding
  async setOnboardingCompleted(completed: boolean = true) {
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

  async isOnboardingCompleted() {
    try {
      const completed = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING);
      return completed ? JSON.parse(completed) : false;
    } catch (error) {
      console.error("Error getting onboarding status:", error);
      return false;
    }
  },
};

// Clear all data
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
