/**
 * 📁 Path: /lib/types/user.ts
 * 📝 Description: User types and interfaces - טיפוסי משתמש וממשקים
 * 📅 Last Modified: 2024-01-XX 14:30
 *
 * 🔗 Dependencies: None
 *
 * ⚠️ Note: These types should match your Supabase database schema
 */

// 👤 Main user interface - ממשק משתמש ראשי
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: "user" | "admin" | "trainer";
  isGuest?: boolean;
  isDemo?: boolean; // ✅ הוספנו את השדה החסר - Added missing field
  demographics?: UserDemographics;
  preferences?: UserPreferences;
  stats?: UserStats;
  createdAt: string;
  updatedAt: string;
}

// 📊 User demographics - נתונים דמוגרפיים
export interface UserDemographics {
  age?: number;
  gender?: "male" | "female" | "other";
  height?: number; // בסנטימטרים - in cm
  weight?: number; // בקילוגרמים - in kg
  experienceLevel?: "beginner" | "intermediate" | "advanced";
  primaryGoal?: "weight_loss" | "muscle_gain" | "general_fitness" | "endurance";
  fitnessActivities?: string[];
}

// ⚙️ User preferences - העדפות משתמש
export interface UserPreferences {
  workoutDuration?: number; // בדקות - in minutes
  workoutFrequency?: number; // פעמים בשבוע - times per week
  preferredTime?: "morning" | "afternoon" | "evening";
  equipment?: string[];
  musicGenre?: string;
  notifications?: boolean;
  language?: "he" | "en";
  theme?: "light" | "dark" | "auto";
  units?: {
    weight: "kg" | "lbs";
    distance: "km" | "miles";
    height: "cm" | "ft";
  };
}

// 📈 User statistics - סטטיסטיקות משתמש
export interface UserStats {
  totalWorkouts?: number;
  totalMinutes?: number;
  totalCaloriesBurned?: number;
  currentStreak?: number;
  longestStreak?: number;
  favoriteExercises?: string[];
  lastWorkout?: string;
  weeklyAverage?: number;
  monthlyProgress?: number;
  personalRecords?: PersonalRecord[];
}

// 🏆 Personal record - שיא אישי
export interface PersonalRecord {
  exerciseId: string;
  exerciseName: string;
  recordType: "weight" | "reps" | "time" | "distance";
  value: number;
  unit?: string;
  achievedAt: string;
  previousRecord?: number;
}

// 🎯 User goals - מטרות משתמש
export interface UserGoal {
  id: string;
  userId: string;
  type: "weight" | "strength" | "endurance" | "consistency" | "custom";
  target: number;
  current: number;
  unit?: string;
  deadline?: string;
  description?: string;
  isCompleted: boolean;
  createdAt: string;
  completedAt?: string;
}

// 📅 User plan subscription - מנוי לתכנית
export interface UserPlanSubscription {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  startDate: string;
  endDate?: string;
  currentWeek: number;
  currentDay: number;
  isActive: boolean;
  completedWorkouts: string[];
  skippedWorkouts: string[];
  progress: number; // 0-100%
}

// 🏃 User activity - פעילות משתמש
export interface UserActivity {
  id: string;
  userId: string;
  type: "workout" | "achievement" | "milestone" | "social";
  title: string;
  description?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

// 🏅 User achievement - הישג משתמש
export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  title: string;
  description: string;
  icon?: string;
  unlockedAt: string;
  progress?: number;
  tier?: "bronze" | "silver" | "gold" | "platinum";
}

// 📱 User device - מכשיר משתמש
export interface UserDevice {
  id: string;
  userId: string;
  deviceType: "ios" | "android" | "web";
  deviceToken?: string;
  lastActive: string;
  appVersion: string;
  osVersion?: string;
  notificationsEnabled: boolean;
}

// 🔐 Authentication state - מצב אימות
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  session: any | null;
  error: string | null;
}

// 📝 User registration data - נתוני הרשמה
export interface RegistrationData {
  email: string;
  password: string;
  name: string;
  acceptTerms: boolean;
  newsletter?: boolean;
  referralCode?: string;
}

// 🔄 User update payload - נתונים לעדכון משתמש
export interface UserUpdatePayload {
  name?: string;
  avatarUrl?: string;
  demographics?: Partial<UserDemographics>;
  preferences?: Partial<UserPreferences>;
}

// 🎭 Guest user factory - יצירת משתמש אורח
export const createGuestUser = (): User => ({
  id: `guest-${Date.now()}`,
  email: "guest@gymovo.com",
  name: "אורח",
  role: "user",
  isGuest: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

// 🎮 Demo user factory - יצירת משתמש דמו
export const createDemoUser = (demoData: any): User => ({
  id: `demo-${Date.now()}`,
  email: demoData.email,
  name: demoData.name,
  avatarUrl: demoData.avatar,
  role: "user",
  isGuest: false,
  isDemo: true,
  demographics: {
    experienceLevel: demoData.level,
  },
  stats: demoData.stats,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
