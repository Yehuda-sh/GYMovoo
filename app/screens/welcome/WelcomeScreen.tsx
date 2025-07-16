// screens/welcome/WelcomeScreen.tsx
import { demoUsers } from "@/app/constants/demoUsers";
import { clearAllData } from "@/app/lib/data/storage";
import { useUserStore } from "@/app/lib/stores/userStore";
import { supabase } from "@/app/lib/supabase";
import { User } from "@/app/lib/types/user";
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

interface DemoUserForPanel {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level?: string;
  goal?: string;
}

const WelcomeScreen = () => {
  const becomeGuest = useUserStore((state) => state.becomeGuest);
  const loginAsDemoUser = useUserStore((state) => state.loginAsDemoUser);

  // 🔒 State לDev Mode מוסתר
  const [logoTapCount, setLogoTapCount] = useState(0);
  const [showDevModal, setShowDevModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // אנימציות למודל Dev
  const modalOpacity = useRef(new Animated.Value(0)).current;
  const modalScale = useRef(new Animated.Value(0.8)).current;

  // אנימציות רגילות
  const { fadeAnim, logoScale, titleSlide, subtitleSlide, buttonsSlide } =
    useWelcomeAnimations();

  // 🎯 טיפול ב-3 לחיצות על הלוגו
  const handleLogoPress = useCallback(() => {
    if (!__DEV__) return;

    const newCount = logoTapCount + 1;
    setLogoTapCount(newCount);

    if (newCount >= 3) {
      setShowDevModal(true);
      setLogoTapCount(0);

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

    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }

    tapTimeoutRef.current = setTimeout(() => {
      setLogoTapCount(0);
    }, 1000);
  }, [logoTapCount, modalOpacity, modalScale]);

  // סגירת מודל Dev
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
      setLoading(false);
      router.replace("/(tabs)");
    }, 300);
  }, [becomeGuest]);

  // 👨‍💻 התחברות כמשתמש דמו
  const handleDemoLogin = useCallback(
    async (demoUser: User) => {
      setLoading(true);
      setShowDevModal(false);

      try {
        await loginAsDemoUser(demoUser);
        router.replace("/(tabs)");
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

  // 🔑 התחברות רגילה - עם expo-router
  const handleLogin = useCallback(() => {
    router.push("/login");
  }, []);

  // 📝 הרשמה - עם expo-router
  const handleSignup = useCallback(() => {
    router.push("/register");
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
    avatar: user.avatarUrl,
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
        <HeroSection
          fadeAnim={fadeAnim}
          logoScale={logoScale}
          titleSlide={titleSlide}
          subtitleSlide={subtitleSlide}
          onLogoPress={handleLogoPress}
        />

        {/* כפתורי פעולה */}
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
