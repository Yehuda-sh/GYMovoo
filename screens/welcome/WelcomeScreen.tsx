/**
 * @file screens/welcome/WelcomeScreen.tsx
 * @description מסך הפתיחה הראשי של האפליקציה
 * @author GYMoveo Development
 * @version 1.0.0
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

import { demoUsers } from "@/constants/demoUsers";
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
  const { fadeAnim, slideAnim, scaleAnim, startAnimations } =
    useWelcomeAnimations();

  // 📱 Refs
  const devTimerRef = useRef<NodeJS.Timeout>();

  // 🏁 Initialize animations
  React.useEffect(() => {
    startAnimations();
    return () => {
      if (devTimerRef.current) {
        clearTimeout(devTimerRef.current);
      }
    };
  }, [startAnimations]);

  // 👤 Handle guest login
  const handleGuestLogin = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(null);
      router.replace("/home");
    }, 800);
  }, [setUser]);

  // 🔑 Handle demo user login
  const handleDemoUserLogin = useCallback(
    (demoUserId: string) => {
      const demoUser = demoUsers.find((u) => u.id === demoUserId);
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

  // Convert demo users for the panel
  const demoUsersForPanel: DemoUserForPanel[] = demoUsers.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    level: user.level,
    goal: user.fitnessGoal,
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
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* 🏆 Hero section */}
        <HeroSection onLogoPress={handleLogoPress} scaleAnim={scaleAnim} />

        {/* 🎬 Action buttons */}
        <ActionButtons />

        {/* 🌐 Social login */}
        <SocialLoginButtons />

        {/* 👤 Guest button */}
        <GuestButton onPress={handleGuestLogin} isLoading={isLoading} />
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
                      scale: scaleAnim.interpolate({
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
