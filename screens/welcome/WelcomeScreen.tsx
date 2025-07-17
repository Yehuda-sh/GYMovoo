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
  const devTapTimer = useRef<NodeJS.Timeout | null>(null);

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

  // 🔐 Authentication handlers
  const handleLogin = async () => {
    try {
      setLoading(true);
      router.push("/login");
    } catch (error) {
      console.error("Login navigation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      router.push("/signup");
    } catch (error) {
      console.error("Signup navigation error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🎭 Demo user handlers
  const handleDemoLogin = async (userId: string) => {
    try {
      setLoading(true);
      const demoUser = DEMO_USERS.find((u) => u.email === userId);

      if (!demoUser) {
        throw new Error("Demo user not found");
      }

      // Sign in with demo user
      await loginAsDemoUser(demoUser);

      // Navigate to home
      router.replace("/(tabs)/home");

      closeDevModal();
    } catch (error) {
      console.error("Demo login error:", error);
      Alert.alert("שגיאה", "לא ניתן להתחבר למשתמש הדמו");
    } finally {
      setLoading(false);
    }
  };

  // 🚶 Guest login
  const handleGuestLogin = async () => {
    try {
      setLoading(true);

      // Sign in as guest
      becomeGuest();

      // Navigate to home
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Guest login error:", error);
      Alert.alert("שגיאה", "לא ניתן להיכנס כאורח");
    } finally {
      setLoading(false);
    }
  };

  // 🧹 Data reset
  const handleResetData = async () => {
    try {
      setLoading(true);
      await clearAllData();
      Alert.alert("הצלחה", "כל הנתונים נמחקו בהצלחה");
    } catch (error) {
      console.error("Reset data error:", error);
      Alert.alert("שגיאה", "לא ניתן למחוק את הנתונים");
    } finally {
      setLoading(false);
    }
  };

  // 🌐 Social login handlers
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) throw error;
    } catch (error) {
      console.error("Google login error:", error);
      Alert.alert("שגיאה", "לא ניתן להתחבר עם Google");
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
      });

      if (error) throw error;
    } catch (error) {
      console.error("Facebook login error:", error);
      Alert.alert("שגיאה", "לא ניתן להתחבר עם Facebook");
    } finally {
      setLoading(false);
    }
  };

  // Convert demo users for panel
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
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* 🎨 Background */}
      <BackgroundGradient visible={true} />

      {/* 🎭 Main Content */}
      <View style={styles.content}>
        {/* 🏠 Hero Section */}
        <HeroSection fadeAnim={animations.fadeAnim} />

        {/* 🎯 Action Buttons */}
        <ActionButtons onLogin={handleLogin} onSignup={handleSignup} />

        {/* 🌐 Social Login */}
        <SocialLoginButtons onGoogleLogin={handleGoogleLogin} />

        {/* 🚶 Guest Button */}
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
