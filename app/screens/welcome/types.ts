// screens/welcome/types.ts
import { User } from "@/lib/types/user";
import { Animated } from "react-native";

export interface WelcomeScreenProps {
  // כבר לא צריך navigation עם expo-router
}

export interface HeroSectionProps {
  fadeAnim: Animated.Value;
  logoScale: Animated.Value;
  titleSlide: Animated.Value;
  subtitleSlide: Animated.Value;
  onLogoPress: () => void;
}

export interface ActionButtonsProps {
  buttonsSlide: Animated.Value;
  onLogin: () => void;
  onSignup: () => void;
  fadeAnim: Animated.Value;
}

export interface SocialLoginButtonsProps {
  onGoogleLogin: () => void;
  onAppleLogin: () => void;
  fadeAnim: Animated.Value;
  loading: boolean;
}

export interface GuestButtonProps {
  onGuestLogin: () => void;
}

export interface DevPanelProps {
  visible: boolean;
  demoUsers: DemoUser[];
  onDemoLogin: (user: User) => void;
  onResetData: () => void;
}

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level?: string;
  goal?: string;
}

export interface WelcomeAnimations {
  fadeAnim: Animated.Value;
  logoScale: Animated.Value;
  titleSlide: Animated.Value;
  subtitleSlide: Animated.Value;
  buttonsSlide: Animated.Value;
}
