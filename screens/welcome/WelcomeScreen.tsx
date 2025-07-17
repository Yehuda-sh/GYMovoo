/**
 * @file screens/welcome/WelcomeScreen.tsx
 * @description מסך הכניסה הראשי של האפליקציה
 * @author GYMovoo Development
 * @version 1.0.0
 *
 * @component WelcomeScreen
 * @parent App
 *
 * @notes
 * - מסך ראשון שהמשתמש רואה
 * - כולל אפשרויות התחברות וכניסת אורח
 * - תומך בכניסה מהירה למשתמשי דמו (dev mode)
 * - כולל אנימציות כניסה
 *
 * @changelog
 * - v1.0.0: Initial screen creation with full functionality
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
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { DEMO_USERS } from "@/constants/demoUsers";
import { clearAllData } from "@/lib/data/storage";
import { useUserStore } from "@/lib/stores/userStore";
import { supabase } from "@/lib/supabase";
import {
  borderRadius,
  colors,
  fontSizes,
  fontWeights,
  shadows,
  spacing,
} from "@/styles/theme";

import {
  ActionButtons,
  BackgroundGradient,
  DevPanel,
  GuestButton,
  HeroSection,
  SocialLoginButtons,
  useWelcomeAnimations,
} from "./components";

// תיקון עבור OAuth redirects
WebBrowser.maybeCompleteAuthSession();

const WelcomeScreen = () => {
  // 🎭 Animation hooks
  const animations = useWelcomeAnimations();

  // 📊 State
  const [loading, setLoading] = useState(false);
  const [showDevModal, setShowDevModal] = useState(false);
  const { becomeGuest, loginAsDemoUser } = useUserStore();

  // 🎬 Animation refs for modal
  const modalOpacity = useRef(new Animated.Value(0)).current;
  const modalScale = useRef(new Animated.Value(0.9)).current;

  // 👆 Dev panel trigger
  const devTapCount = useRef(0);
  const devTapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoTap = useCallback(() => {
    devTapCount.current += 1;

    if (devTapTimer.current) {
      clearTimeout(devTapTimer.current);
    }

    if (devTapCount.current === 7) {
      setShowDevModal(true);
      devTapCount.current = 0;
    }

    devTapTimer.current = setTimeout(() => {
      devTapCount.current = 0;
    }, 2000);
  }, []);

  // 🎨 Modal animations
  const openDevModal = useCallback(() => {
    setShowDevModal(true);
    Animated.parallel([
      Animated.timing(modalOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(modalScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [modalOpacity, modalScale]);

  const closeDevModal = useCallback(() => {
    Animated.parallel([
      Animated.timing(modalOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(modalScale, {
        toValue: 0.9,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowDevModal(false);
    });
  }, [modalOpacity, modalScale]);

  // 🚀 Navigation handlers
  const handleLogin = useCallback(async () => {
    router.push("/(auth)/welcome");
  }, []);

  const handleSignup = useCallback(async () => {
    setLoading(true);
    try {
      // ניווט למסך הרשמה
      router.push("/(auth)/welcome");
    } catch (error) {
      console.error("Signup navigation error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleGuestLogin = useCallback(async () => {
    setLoading(true);
    try {
      await becomeGuest();
      // מעבר למסך הבית
      router.replace("/(tabs)/home");
    } catch (error) {
      Alert.alert("שגיאה", "כניסה כאורח נכשלה. נסה שוב.");
    } finally {
      setLoading(false);
    }
  }, [becomeGuest]);

  const handleDemoLogin = useCallback(
    async (userId: string) => {
      setLoading(true);
      try {
        const user = DEMO_USERS.find((u) => u.email === userId);
        if (user) {
          await loginAsDemoUser(user);
          closeDevModal();
          router.replace("/(tabs)/home");
        }
      } catch (error) {
        Alert.alert("שגיאה", "כניסה כמשתמש דמו נכשלה");
      } finally {
        setLoading(false);
      }
    },
    [loginAsDemoUser, closeDevModal]
  );

  const handleResetData = useCallback(async () => {
    Alert.alert("איפוס נתונים", "האם אתה בטוח שברצונך לאפס את כל הנתונים?", [
      { text: "ביטול", style: "cancel" },
      {
        text: "איפוס",
        style: "destructive",
        onPress: async () => {
          try {
            await clearAllData();
            Alert.alert("הצלחה", "כל הנתונים אופסו בהצלחה");
          } catch (error) {
            Alert.alert("שגיאה", "איפוס הנתונים נכשל");
          }
        },
      },
    ]);
  }, []);

  // 🌐 Social login handlers
  const handleGoogleLogin = useCallback(async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "gymoovoo://auth",
        },
      });
      if (error) throw error;
    } catch (error) {
      Alert.alert("שגיאה", "התחברות עם Google נכשלה");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAppleLogin = useCallback(async () => {
    // TODO: Implement Apple login
    Alert.alert("בקרוב", "התחברות עם Apple תהיה זמינה בקרוב");
  }, []);

  const handleFacebookLogin = useCallback(async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
          redirectTo: "gymoovoo://auth",
        },
      });
      if (error) throw error;
    } catch (error) {
      Alert.alert("שגיאה", "התחברות עם Facebook נכשלה");
    } finally {
      setLoading(false);
    }
  }, []);

  // 🎯 Prepare demo users for dev panel
  const demoUsersForPanel = DEMO_USERS.map((user) => ({
    id: user.email,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    level: user.level,
    goal: "כושר כללי",
    isDemo: true,
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* 🌈 Animated Background */}
      <BackgroundGradient visible={true} />

      {/* 🎭 Main Content */}
      <View style={styles.content}>
        {/* 🏠 Hero Section */}
        <HeroSection
          fadeAnim={animations.fadeAnim}
          logoScale={animations.logoScale}
          titleSlide={animations.titleSlide}
          subtitleSlide={animations.subtitleSlide}
        />

        {/* 🎯 Action Buttons */}
        <ActionButtons
          onLogin={handleLogin}
          onSignup={handleSignup}
          buttonsSlide={animations.buttonsSlide}
          fadeAnim={animations.fadeAnim}
        />

        {/* 🌐 Social Login */}
        <SocialLoginButtons
          onGoogleLogin={handleGoogleLogin}
          onAppleLogin={handleAppleLogin}
          fadeAnim={animations.fadeAnim}
        />

        {/* 🚶 Guest Button */}
        <GuestButton
          onGuestLogin={handleGuestLogin}
          fadeAnim={animations.fadeAnim}
        />
      </View>

      {/* 🔒 Dev Modal */}
      <Modal
        visible={showDevModal}
        transparent={true}
        animationType="none"
        onRequestClose={closeDevModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeDevModal}
        >
          <Animated.View
            style={[
              styles.modalContainer,
              {
                opacity: modalOpacity,
                transform: [{ scale: modalScale }],
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
              style={styles.modalContent}
            >
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeDevModal}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>

              <DevPanel
                demoUsers={demoUsersForPanel}
                onSelectUser={handleDemoLogin}
                onResetData={handleResetData}
                isLoading={loading}
              />
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark[900],
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: Platform.OS === "ios" ? spacing.xl * 2 : spacing.xl,
    paddingBottom: spacing.xl,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxWidth: 400,
    maxHeight: "80%",
  },
  modalContent: {
    backgroundColor: colors.dark[800],
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.lg,
  },
  closeButton: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.dark[700],
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  closeButtonText: {
    color: colors.light[400],
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
  },
});

export default WelcomeScreen;
