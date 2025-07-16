/**
 * @file screens/welcome/WelcomeScreen.tsx
 * @description מסך הפתיחה הראשי של האפליקציה
 * @author GYMoveo Development
 * @version 1.0.1
 *
 * @component WelcomeScreen
 * @parent App root
 *
 * @notes
 * - תומך בהתחברות רגילה, רשתות חברתיות וכניסת אורח
 * - כולל מצב פיתוח נסתר (3 לחיצות על הלוגו)
 * - אנימציות כניסה מרשימות
 * - תמיכה מלאה ב-RTL
 *
 * @changelog
 * - v1.0.0: Initial creation with improved structure
 * - v1.0.1: Fixed imports and TypeScript errors
 */

import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Modal,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { DEMO_USERS } from "@/constants/demoUsers";
import { clearAllData } from "@/lib/data/storage";
import { useUserStore } from "@/lib/stores/userStore";
import { supabase } from "@/lib/supabase";
import { createDemoUser } from "@/lib/types/user";

import {
  ActionButtons,
  BackgroundGradient,
  DevPanel,
  GuestButton,
  HeroSection,
  SocialLoginButtons,
  useWelcomeAnimations,
} from "./components";
import { devModalStyles, styles } from "./styles";

// תיקון עבור OAuth redirects
WebBrowser.maybeCompleteAuthSession();

// המרת DemoUserData types
interface DemoUserForPanel {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level?: string;
  goal?: string;
  isDemo: boolean;
}

export default function WelcomeScreen() {
  // 🏪 Store
  const { setUser } = useUserStore();

  // 📊 State
  const [isLoading, setIsLoading] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);
  const [devClickCount, setDevClickCount] = useState(0);

  // 🎨 Animations
  const { fadeAnim, logoScale, titleSlide, subtitleSlide, buttonsSlide } =
    useWelcomeAnimations();

  // 📱 Refs
  const devTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 🏁 Initialize animations
  React.useEffect(() => {
    // Animations start automatically
    return () => {
      if (devTimerRef.current) {
        clearTimeout(devTimerRef.current);
      }
    };
  }, []);

  // 👤 Handle guest login
  const handleGuestLogin = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      // Set guest user as null with isGuest flag handled in store
      setUser({
        id: `guest-${Date.now()}`,
        email: "guest@gymovoo.com",
        name: "אורח",
        role: "user",
        isGuest: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      router.replace("/home");
    }, 800);
  }, [setUser]);

  // 🔑 Handle demo user login
  const handleDemoUserLogin = useCallback(
    (demoUserId: string) => {
      const demoUser = DEMO_USERS.find((u) => u.email === demoUserId);
      if (!demoUser) return;

      setIsLoading(true);
      setTimeout(() => {
        const user = createDemoUser(demoUser);
        setUser(user);
        router.replace("/home");
        setIsDevMode(false);
      }, 800);
    },
    [setUser]
  );

  // 🛠️ Handle dev mode toggle
  const handleLogoPress = useCallback(() => {
    const newCount = devClickCount + 1;
    setDevClickCount(newCount);

    if (devTimerRef.current) {
      clearTimeout(devTimerRef.current);
    }

    if (newCount === 3) {
      setIsDevMode(true);
      setDevClickCount(0);
    } else {
      devTimerRef.current = setTimeout(() => {
        setDevClickCount(0);
      }, 2000);
    }
  }, [devClickCount]);

  // 🗑️ Handle data reset
  const handleResetData = useCallback(async () => {
    try {
      setIsLoading(true);
      await clearAllData();
      await supabase.auth.signOut();
      Alert.alert("✅ הצלחה", "כל הנתונים נמחקו בהצלחה");
      setIsLoading(false);
    } catch (error) {
      console.error("Reset error:", error);
      Alert.alert("❌ שגיאה", "אירעה שגיאה במחיקת הנתונים");
      setIsLoading(false);
    }
  }, []);

  // Navigation handlers
  const handleSignup = useCallback(() => {
    router.push("/signup");
  }, []);

  const handleLogin = useCallback(() => {
    router.push("/login");
  }, []);

  const handleGoogleLogin = useCallback(async () => {
    try {
      setIsLoading(true);
      // Google login implementation
      Alert.alert("בקרוב", "התחברות עם Google תהיה זמינה בקרוב");
      setIsLoading(false);
    } catch (error) {
      console.error("Google login error:", error);
      setIsLoading(false);
    }
  }, []);

  const handleAppleLogin = useCallback(async () => {
    try {
      setIsLoading(true);
      // Apple login implementation
      Alert.alert("בקרוב", "התחברות עם Apple תהיה זמינה בקרוב");
      setIsLoading(false);
    } catch (error) {
      console.error("Apple login error:", error);
      setIsLoading(false);
    }
  }, []);

  // Convert demo users for the panel
  const demoUsersForPanel: DemoUserForPanel[] = DEMO_USERS.map((user) => ({
    id: user.email,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    level: user.level,
    goal: user.stats ? String(user.stats.workoutsCompleted) : "0",
    isDemo: true,
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* 🌈 Background gradient */}
      <BackgroundGradient />

      {/* 📱 Main content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: titleSlide }],
          },
        ]}
      >
        {/* 🏆 Hero section */}
        <HeroSection
          onLogoPress={handleLogoPress}
          fadeAnim={fadeAnim}
          logoScale={logoScale}
          titleSlide={titleSlide}
          subtitleSlide={subtitleSlide}
        />

        {/* 🎬 Action buttons */}
        <ActionButtons
          onSignup={handleSignup}
          onLogin={handleLogin}
          buttonsSlide={buttonsSlide}
          fadeAnim={fadeAnim}
        />

        {/* 🌐 Social login */}
        <SocialLoginButtons
          onGoogleLogin={handleGoogleLogin}
          onAppleLogin={handleAppleLogin}
          fadeAnim={fadeAnim}
        />

        {/* 👤 Guest button */}
        <GuestButton onGuestLogin={handleGuestLogin} loading={isLoading} />
      </Animated.View>

      {/* 🛠️ Dev mode modal */}
      <Modal
        visible={isDevMode}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDevMode(false)}
      >
        <View style={devModalStyles.overlay}>
          <View style={devModalStyles.modalContainer}>
            <Animated.View
              style={[
                devModalStyles.modalContent,
                {
                  transform: [
                    {
                      scale: logoScale.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity
                style={devModalStyles.closeButton}
                onPress={() => setIsDevMode(false)}
              >
                <Text style={devModalStyles.closeButtonText}>✕</Text>
              </TouchableOpacity>

              <DevPanel
                demoUsers={demoUsersForPanel}
                onSelectUser={handleDemoUserLogin}
                onResetData={handleResetData}
                isLoading={isLoading}
              />
            </Animated.View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
