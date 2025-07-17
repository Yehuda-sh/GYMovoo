/**
 * @file screens/welcome/WelcomeScreen.tsx
 * @description מסך הכניסה הראשי של האפליקציה
 * @author GYMoveo Development
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

import { demoUsers } from "@/constants/demoUsers";
import { clearAllData } from "@/lib/data/storage";
import { useUserStore } from "@/lib/stores/userStore";
import { supabase } from "@/lib/supabase";
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

import theme from "@/styles/theme";
import {
  ActionButtons,
  BackgroundGradient,
  DevPanel,
  GuestButton,
  HeroSection,
  SocialLoginButtons,
  useWelcomeAnimations,
} from "./components";

const { colors, spacing, borderRadius, shadows, fontSizes, fontWeights } =
  theme;

// תיקון עבור OAuth redirects
WebBrowser.maybeCompleteAuthSession();

const WelcomeScreen = () => {
  // 🎭 Animation hooks
  const animations = useWelcomeAnimations();

  // 📊 State
  const [loading, setLoading] = useState(false);
  const [showDevModal, setShowDevModal] = useState(false);
  const { signInAsGuest, signInWithDemo } = useUserStore();

  // 🎬 Animation refs for modal
  const modalOpacity = useRef(new Animated.Value(0)).current;
  const modalScale = useRef(new Animated.Value(0.9)).current;

  // 👆 Dev panel trigger
  const devTapCount = useRef(0);
  const devTapTimer = useRef<NodeJS.Timeout>();

  const handleLogoTap = useCallback(() => {
    devTapCount.current += 1;

    if (devTapTimer.current) {
      clearTimeout(devTapTimer.current);
    }

    if (devTapCount.current === 7) {
      setShowDevModal(true);
      Animated.parallel([
        Animated.timing(modalOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(modalScale, {
          toValue: 1,
          tension: 20,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
      devTapCount.current = 0;
    }

    devTapTimer.current = setTimeout(() => {
      devTapCount.current = 0;
    }, 1000);
  }, [modalOpacity, modalScale]);

  // 🚪 Close dev modal
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
  const handleLogin = useCallback(() => {
    router.push("/login");
  }, []);

  const handleSignup = useCallback(() => {
    router.push("/signup");
  }, []);

  // 👤 Guest login
  const handleGuestLogin = useCallback(async () => {
    try {
      setLoading(true);
      await signInAsGuest();
      router.replace("/(tabs)/home");
    } catch (error) {
      Alert.alert("שגיאה", "לא הצלחנו להתחבר כאורח");
    } finally {
      setLoading(false);
    }
  }, [signInAsGuest]);

  // 🎮 Demo login
  const handleDemoLogin = useCallback(
    async (userId: string) => {
      try {
        setLoading(true);
        const demoUser = demoUsers.find((u) => u.id === userId);
        if (demoUser) {
          await signInWithDemo(demoUser);
          closeDevModal();
          router.replace("/(tabs)/home");
        }
      } catch (error) {
        Alert.alert("שגיאה", "לא הצלחנו להתחבר כמשתמש דמו");
      } finally {
        setLoading(false);
      }
    },
    [signInWithDemo, closeDevModal]
  );

  // 🗑️ Reset data
  const handleResetData = useCallback(async () => {
    Alert.alert(
      "איפוס נתונים",
      "פעולה זו תמחק את כל הנתונים המקומיים. האם להמשיך?",
      [
        { text: "ביטול", style: "cancel" },
        {
          text: "אפס",
          style: "destructive",
          onPress: async () => {
            try {
              await clearAllData();
              Alert.alert("הצלחה", "כל הנתונים אופסו");
            } catch (error) {
              Alert.alert("שגיאה", "לא הצלחנו לאפס את הנתונים");
            }
          },
        },
      ]
    );
  }, []);

  // 🌐 Social login handlers
  const handleGoogleLogin = useCallback(async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: Platform.select({
            web: window.location.origin,
            default: "gymovoo://auth/callback",
          }),
        },
      });
      if (error) throw error;
    } catch (error) {
      Alert.alert("שגיאה", "לא הצלחנו להתחבר עם Google");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAppleLogin = useCallback(async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "apple",
        options: {
          redirectTo: Platform.select({
            web: window.location.origin,
            default: "gymovoo://auth/callback",
          }),
        },
      });
      if (error) throw error;
    } catch (error) {
      Alert.alert("שגיאה", "לא הצלחנו להתחבר עם Apple");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* 🌈 Background gradient */}
      <BackgroundGradient visible={true} />

      {/* 🎯 Main content */}
      <View style={styles.content}>
        {/* Hero section with logo */}
        <HeroSection
          fadeAnim={animations.fadeAnim}
          scaleAnim={animations.scaleAnim}
          onLogoTap={handleLogoTap}
        />

        {/* Action buttons */}
        <ActionButtons
          slideAnim={animations.slideAnim}
          onLogin={handleLogin}
          onSignup={handleSignup}
          loading={loading}
        />

        {/* Social login */}
        <SocialLoginButtons
          fadeAnim={animations.socialFadeAnim}
          onGoogleLogin={handleGoogleLogin}
          onAppleLogin={handleAppleLogin}
          loading={loading}
        />

        {/* Guest button */}
        <GuestButton onGuestLogin={handleGuestLogin} loading={loading} />
      </View>

      {/* 🔧 Dev Modal */}
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
                demoUsers={demoUsers}
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
    paddingHorizontal: spacing.xl,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: spacing.xl,
  },
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
    backgroundColor: colors.dark[800],
    borderRadius: borderRadius.xl,
    ...shadows.lg,
  },
  modalContent: {
    flex: 1,
    borderRadius: borderRadius.xl,
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  closeButtonText: {
    color: colors.light[300],
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
  },
});

export default WelcomeScreen;
