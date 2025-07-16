/**
 * @file screens/welcome/types.ts
 * @description הגדרות טיפוסים למסך Welcome
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @notes
 * - טיפוסים לכל הקומפוננטות של מסך Welcome
 * - ממשקים למשתמשי דמו
 * - הגדרות אנימציה
 *
 * @changelog
 * - v1.0.0: Initial creation
 */

import { User } from "@/lib/types/user";
import { Animated } from "react-native";

// Demo user types
export type ExperienceLevel = "beginner" | "intermediate" | "advanced";
export type FitnessGoal =
  | "build_muscle"
  | "lose_weight"
  | "get_stronger"
  | "general_fitness";

// הוספת טיפוס מורחב למשתמשי דמו
export interface DemoUserData extends User {
  color?: string;
  level: ExperienceLevel;
  goal: FitnessGoal;
  age?: number;
  avatar?: string;
}

// Animation types
export type AnimatedValue = Animated.Value;
export type AnimatedValueXY = Animated.ValueXY;

// Props לרכיבים שונים
export interface HeroSectionProps {
  fadeAnim: AnimatedValue;
  logoScale: AnimatedValue;
  titleSlide: AnimatedValue;
  subtitleSlide: AnimatedValue;
  onLogoPress?: () => void;
}

export interface ActionButtonsProps {
  onSignup: () => void;
  onLogin: () => void;
  buttonsSlide: AnimatedValue;
  fadeAnim: AnimatedValue;
  loading?: boolean;
}

export interface GuestButtonProps {
  onGuestLogin: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export interface SocialLoginButtonsProps {
  onGoogleLogin: () => void;
  onAppleLogin: () => void;
  fadeAnim: AnimatedValue;
  loading?: boolean;
}

export interface DevPanelProps {
  visible: boolean;
  demoUsers: DemoUserData[];
  onDemoLogin: (user: DemoUserData) => void;
  onResetData: () => void;
}

export interface DemoUserCardProps {
  user: DemoUserData;
  onPress: (user: DemoUserData) => void;
  disabled?: boolean;
}

export interface BackgroundGradientProps {
  visible?: boolean;
}

// Error handling
export interface WelcomeError {
  code: string;
  message: string;
  field?: "email" | "password" | "general";
}

// Type guards
export const isDemoUser = (user: User | DemoUserData): user is DemoUserData => {
  return "level" in user && "goal" in user;
};

// Utility types
export type ValueOf<T> = T[keyof T];
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
