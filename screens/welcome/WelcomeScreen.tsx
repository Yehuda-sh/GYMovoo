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
  Platform,
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
}

const WelcomeScreen = () => {
  // 🏪 Store hooks
  const { becomeGuest, loginAsDemoUser } = useUserStore();

  // 🔒 State לDev Mode מוסתר
  const [logoTapCount, setLogoTapCount] = useState(0);
  const [showDevModal, setShowDevModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 🎨 אנימציות למודל Dev
  const modalOpacity = useRef(new Animated.Value(0)).current;
  const modalScale = useRef(new Animated.Value(0.8)).current;

  // 🎨 אנימציות רגילות
  const { fadeAnim, logoScale, titleSlide, subtitleSlide, buttonsSlide } =
    useWelcomeAnimations();

  // 🎯 טיפול ב-3 לחיצות על הלוגו למצב פיתוח
  const handleLogoPress = useCallback(() => {
    if (!__DEV__) return;

    const newCount = logoTapCount + 1;
    setLogoTapCount(newCount);

    if (newCount >= 3) {
      setShowDevModal(true);
      setLogoTapCount(0);

      // אנימציית פתיחת מודל
      Animated.parallel([
        Animated.timing(modalOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(modalScale, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }

    // איפוס ספירה אחרי שנייה
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }

    tapTimeoutRef.current = setTimeout(() => {
      setLogoTapCount(0);
    }, 1000);
  }, [logoTapCount, modalOpacity, modalScale]);

  // 🔒 סגירת מודל Dev
  const closeDevModal = useCallback(() => {
    Animated.parallel([
      Animated.timing(modalOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(modalScale, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowDevModal(false);
    });
  }, [modalOpacity, modalScale]);

  // 🏃 התחברות כאורח
  const handleGuestLogin = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      becomeGuest();
      router.replace("/(tabs)/home");
      setLoading(false);
    }, 300);
  }, [becomeGuest]);

  // 👨‍💻 התחברות כמשתמש דמו
  const handleDemoLogin = useCallback(
    async (demoUser: any) => {
      setLoading(true);
      setShowDevModal(false);

      try {
        const user = createDemoUser(demoUser);
        await loginAsDemoUser(user);
        router.replace("/(tabs)/home");
      } catch (err) {
        Alert.alert("שגיאה", "לא ניתן להתחבר כמשתמש דמו");
      } finally {
        setLoading(false);
      }
    },
    [loginAsDemoUser]
  );

  // 🗑️ איפוס נתונים
  const handleResetData = useCallback(async () => {
    Alert.alert("איפוס נתונים", "האם אתה בטוח?", [
      { text: "ביטול", style: "cancel" },
      {
        text: "אפס הכל",
        style: "destructive",
        onPress: async () => {
          try {
            await clearAllData();
            Alert.alert("✅", "כל הנתונים אופסו בהצלחה");
          } catch (err) {
            Alert.alert("שגיאה", "לא ניתן לאפס נתונים");
          }
        },
      },
    ]);
  }, []);

  // 🔑 התחברות רגילה
  const handleLogin = useCallback(() => {
    router.push("/login");
  }, []);

  // 📝 הרשמה
  const handleSignup = useCallback(() => {
    router.push("/signup");
  }, []);

  // 🔐 Google Login עם Supabase
  const handleGoogleLogin = useCallback(async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "gymovo://auth-callback",
        },
      });

      if (error) throw error;
    } catch (error: any) {
      Alert.alert("שגיאה בהתחברות", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🍎 Apple Login עם Supabase
  const handleAppleLogin = useCallback(async () => {
    if (Platform.OS !== "ios") {
      Alert.alert("זמין רק ב-iOS", "התחברות עם Apple זמינה רק במכשירי iOS");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "apple",
        options: {
          redirectTo: "gymovo://auth-callback",
        },
      });

      if (error) throw error;
    } catch (error: any) {
      Alert.alert("שגיאה בהתחברות", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // המרת demoUsers לפורמט המתאים ל-DevPanel
  const demoUsersForPanel: DemoUserForPanel[] = demoUsers.map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatarUrl || user.avatar,
    level: user.demographics?.experienceLevel || user.level,
    goal: user.demographics?.primaryGoal || user.goal,
  }));

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* רקע גרדיאנט */}
      <BackgroundGradient visible={true} />

      {/* תוכן ראשי */}
      <View style={styles.content}>
        {/* סקציית הירו עם לוגו */}
        <HeroSection
          fadeAnim={fadeAnim}
          logoScale={logoScale}
          titleSlide={titleSlide}
          subtitleSlide={subtitleSlide}
          onLogoPress={handleLogoPress}
        />

        {/* כפתורי פעולה ראשיים */}
        <ActionButtons
          buttonsSlide={buttonsSlide}
          onLogin={handleLogin}
          onSignup={handleSignup}
          fadeAnim={fadeAnim}
        />

        {/* כפתורי רשתות חברתיות */}
        <SocialLoginButtons
          onGoogleLogin={handleGoogleLogin}
          onAppleLogin={handleAppleLogin}
          fadeAnim={fadeAnim}
          loading={loading}
        />

        {/* כפתור אורח */}
        <GuestButton onGuestLogin={handleGuestLogin} />
      </View>

      {/* 🔒 Dev Modal */}
      <Modal
        visible={showDevModal}
        transparent={true}
        animationType="none"
        onRequestClose={closeDevModal}
      >
        <TouchableOpacity
          style={devModalStyles.overlay}
          activeOpacity={1}
          onPress={closeDevModal}
        >
          <Animated.View
            style={[
              devModalStyles.modalContainer,
              {
                opacity: modalOpacity,
                transform: [{ scale: modalScale }],
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
              style={devModalStyles.modalContent}
            >
              <TouchableOpacity
                style={devModalStyles.closeButton}
                onPress={closeDevModal}
              >
                <Text style={devModalStyles.closeButtonText}>✕</Text>
              </TouchableOpacity>

              <DevPanel
                visible={true}
                demoUsers={demoUsersForPanel as any}
                onDemoLogin={handleDemoLogin}
                onResetData={handleResetData}
              />
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default WelcomeScreen;
