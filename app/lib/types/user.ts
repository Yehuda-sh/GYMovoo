// app/lib/types/user.ts

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: "user" | "admin" | "trainer";
  isGuest?: boolean;
  demographics?: UserDemographics;
  preferences?: UserPreferences;
  stats?: UserStats;
  createdAt: string;
  updatedAt: string;
}

export interface UserDemographics {
  age?: number;
  gender?: "male" | "female" | "other";
  height?: number; // in cm
  weight?: number; // in kg
  experienceLevel?: "beginner" | "intermediate" | "advanced";
  primaryGoal?: "weight_loss" | "muscle_gain" | "general_fitness" | "endurance";
  fitnessActivities?: string[];
}

export interface UserPreferences {
  workoutDuration?: number; // in minutes
  workoutFrequency?: number; // times per week
  preferredTime?: "morning" | "afternoon" | "evening";
  equipment?: string[];
  musicGenre?: string;
  notifications?: boolean;
  language?: "he" | "en";
  theme?: "light" | "dark" | "auto";
}

export interface UserStats {
  totalWorkouts?: number;
  totalMinutes?: number;
  currentStreak?: number;
  longestStreak?: number;
  favoriteExercises?: string[];
  lastWorkout?: string;
}
