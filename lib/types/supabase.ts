/**
 * 📁 Path: /lib/types/supabase.ts
 * 📝 Description: טיפוסי TypeScript לבסיס הנתונים - Database TypeScript types
 * 📅 Last Modified: 2024-01-XX 14:30
 *
 * 🔗 Dependencies: None
 *
 * ⚠️ Note: These types should match your Supabase database schema
 */

// 🗄️ Database schema types - טיפוסי סכמת בסיס הנתונים
export type Database = {
  public: {
    Tables: {
      // 👤 User profiles - פרופילי משתמשים
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
          is_demo_user: boolean;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
          is_demo_user?: boolean;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
          is_demo_user?: boolean;
        };
      };

      // ⚙️ User preferences - העדפות משתמש
      user_preferences: {
        Row: {
          id: string;
          user_id: string;
          language: "he" | "en";
          units: "metric" | "imperial";
          theme: "light" | "dark" | "auto";
          notifications_enabled: boolean;
          workout_reminders: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          language?: "he" | "en";
          units?: "metric" | "imperial";
          theme?: "light" | "dark" | "auto";
          notifications_enabled?: boolean;
          workout_reminders?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          language?: "he" | "en";
          units?: "metric" | "imperial";
          theme?: "light" | "dark" | "auto";
          notifications_enabled?: boolean;
          workout_reminders?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      // 📊 User statistics - סטטיסטיקות משתמש
      user_stats: {
        Row: {
          id: string;
          user_id: string;
          total_workouts: number;
          total_minutes: number;
          current_streak: number;
          longest_streak: number;
          last_workout_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total_workouts?: number;
          total_minutes?: number;
          current_streak?: number;
          longest_streak?: number;
          last_workout_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          total_workouts?: number;
          total_minutes?: number;
          current_streak?: number;
          longest_streak?: number;
          last_workout_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      // 🏋️ Workouts - אימונים
      workouts: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          duration_minutes: number;
          calories_burned: number | null;
          status: "planned" | "in_progress" | "completed" | "skipped";
          scheduled_date: string | null;
          started_at: string | null;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          duration_minutes?: number;
          calories_burned?: number | null;
          status?: "planned" | "in_progress" | "completed" | "skipped";
          scheduled_date?: string | null;
          started_at?: string | null;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string | null;
          duration_minutes?: number;
          calories_burned?: number | null;
          status?: "planned" | "in_progress" | "completed" | "skipped";
          scheduled_date?: string | null;
          started_at?: string | null;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      // 💪 Exercises - תרגילים
      exercises: {
        Row: {
          id: string;
          name: string;
          name_he: string;
          category: "strength" | "cardio" | "flexibility" | "balance" | "other";
          muscle_groups: string[];
          equipment: string | null;
          difficulty: "beginner" | "intermediate" | "advanced";
          instructions: string | null;
          instructions_he: string | null;
          video_url: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_he: string;
          category: "strength" | "cardio" | "flexibility" | "balance" | "other";
          muscle_groups?: string[];
          equipment?: string | null;
          difficulty?: "beginner" | "intermediate" | "advanced";
          instructions?: string | null;
          instructions_he?: string | null;
          video_url?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_he?: string;
          category?:
            | "strength"
            | "cardio"
            | "flexibility"
            | "balance"
            | "other";
          muscle_groups?: string[];
          equipment?: string | null;
          difficulty?: "beginner" | "intermediate" | "advanced";
          instructions?: string | null;
          instructions_he?: string | null;
          video_url?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      // 🔗 Workout exercises junction - חיבור בין אימונים לתרגילים
      workout_exercises: {
        Row: {
          id: string;
          workout_id: string;
          exercise_id: string;
          order_index: number;
          sets_planned: number;
          sets_completed: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workout_id: string;
          exercise_id: string;
          order_index: number;
          sets_planned?: number;
          sets_completed?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          workout_id?: string;
          exercise_id?: string;
          order_index?: number;
          sets_planned?: number;
          sets_completed?: number;
          created_at?: string;
          updated_at?: string;
        };
      };

      // 📝 Workout sets - סטים באימון
      workout_sets: {
        Row: {
          id: string;
          workout_exercise_id: string;
          set_number: number;
          reps: number | null;
          weight_kg: number | null;
          distance_km: number | null;
          duration_seconds: number | null;
          rest_seconds: number | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workout_exercise_id: string;
          set_number: number;
          reps?: number | null;
          weight_kg?: number | null;
          distance_km?: number | null;
          duration_seconds?: number | null;
          rest_seconds?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          workout_exercise_id?: string;
          set_number?: number;
          reps?: number | null;
          weight_kg?: number | null;
          distance_km?: number | null;
          duration_seconds?: number | null;
          rest_seconds?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      // 📋 Workout plans - תוכניות אימון
      plans: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          description: string | null;
          duration_weeks: number;
          difficulty: "beginner" | "intermediate" | "advanced";
          goal:
            | "strength"
            | "weight_loss"
            | "muscle_gain"
            | "endurance"
            | "general_fitness";
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          description?: string | null;
          duration_weeks: number;
          difficulty?: "beginner" | "intermediate" | "advanced";
          goal?:
            | "strength"
            | "weight_loss"
            | "muscle_gain"
            | "endurance"
            | "general_fitness";
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          name?: string;
          description?: string | null;
          duration_weeks?: number;
          difficulty?: "beginner" | "intermediate" | "advanced";
          goal?:
            | "strength"
            | "weight_loss"
            | "muscle_gain"
            | "endurance"
            | "general_fitness";
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      // 🔗 Plan workouts junction - חיבור בין תוכניות לאימונים
      plan_workouts: {
        Row: {
          id: string;
          plan_id: string;
          workout_template_id: string;
          week_number: number;
          day_number: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          plan_id: string;
          workout_template_id: string;
          week_number: number;
          day_number: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          plan_id?: string;
          workout_template_id?: string;
          week_number?: number;
          day_number?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

// 🛠️ Helper types - טיפוסי עזר
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

// 🎯 Commonly used types - טיפוסים נפוצים
export type Profile = Tables<"profiles">;
export type UserPreferences = Tables<"user_preferences">;
export type UserStats = Tables<"user_stats">;
export type Workout = Tables<"workouts">;
export type Exercise = Tables<"exercises">;
export type WorkoutExercise = Tables<"workout_exercises">;
export type WorkoutSet = Tables<"workout_sets">;
export type Plan = Tables<"plans">;
export type PlanWorkout = Tables<"plan_workouts">;

// 🔧 Export Database type explicitly - ייצוא מפורש של Database
