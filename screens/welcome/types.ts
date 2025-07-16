/**
 * @file screens/welcome/types.ts
 * @description טיפוסים עבור מסך Welcome
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @notes
 * - טיפוסים וממשקים למסך Welcome
 *
 * @changelog
 * - v1.0.0: Initial creation
 */

// Welcome animation types
export interface WelcomeAnimations {
  fadeAnim: any; // Animated.Value
  slideAnim: any; // Animated.Value
  scaleAnim: any; // Animated.Value
  startAnimations: () => void;
}

// Demo user display type
export interface DemoUserDisplay {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level?: string;
  goal?: string;
  isDemo: boolean;
}

// Social login provider
export type SocialProvider = "google" | "facebook" | "apple";
