// app/login.tsx
import {
  SUPABASE_TABLES,
  getSupabaseErrorMessage,
} from "@/app/constants/supabase";
import { useUserStore } from "@/app/lib/stores/userStore";
import { supabase } from "@/app/lib/supabase";
import {
  borderRadius,
  colors,
  shadows,
  spacing,
  typography,
} from "@/app/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("שגיאה", "נא למלא את כל השדות");
      return;
    }

    setLoading(true);
    try {
      // התחברות עם Supabase
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });

      if (authError) throw authError;

      if (authData.user) {
        // טעינת פרופיל המשתמש
        const { data: profile, error: profileError } = await supabase
          .from(SUPABASE_TABLES.PROFILES)
          .select("*")
          .eq("id", authData.user.id)
          .single();

        if (profileError) throw profileError;

        // עדכון ה-store
        setUser({
          id: authData.user.id,
          email: authData.user.email!,
          name: profile.name || profile.full_name || "משתמש",
          avatarUrl: profile.avatar_url,
          role: profile.role || "user",
          createdAt: profile.created_at,
          updatedAt: profile.updated_at,
        });

        // ניתוב למסך הבית
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      Alert.alert("שגיאה בהתחברות", getSupabaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("שגיאה", "נא להזין כתובת אימייל");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        {
          redirectTo: "gymovo://reset-password",
        }
      );

      if (error) throw error;

      Alert.alert("הצלחה", "נשלח אליך מייל לאיפוס סיסמה");
    } catch (error: any) {
      Alert.alert("שגיאה", getSupabaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colors.gradients.background}
        style={StyleSheet.absoluteFillObject}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>

            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>GYM</Text>
              </View>
            </View>

            <Text style={styles.title}>ברוך הבא חזרה!</Text>
            <Text style={styles.subtitle}>
              התחבר כדי להמשיך את האימונים שלך
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="אימייל"
                placeholderTextColor={colors.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                editable={!loading}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="סיסמה"
                placeholderTextColor={colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
                editable={!loading}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={handleForgotPassword}
              disabled={loading}
              style={styles.forgotButton}
            >
              <Text style={styles.forgotText}>שכחת סיסמה?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                loading && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              <LinearGradient
                colors={
                  loading
                    ? [colors.textMuted, colors.textMuted]
                    : colors.gradients.primary
                }
                style={styles.loginButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.loginButtonText}>התחבר</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Signup Link */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>אין לך חשבון? </Text>
              <Link href="/signup" asChild>
                <TouchableOpacity disabled={loading}>
                  <Text style={styles.signupLink}>הירשם עכשיו</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  header: {
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? spacing.xxxl * 2 : spacing.xxxl,
    marginBottom: spacing.xxxl,
  },
  backButton: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: spacing.sm,
  },
  logoContainer: {
    marginBottom: spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.lg,
  },
  logoText: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.heavy,
    color: colors.primary,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: "center",
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
    height: 56,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.md,
    color: colors.text,
    height: "100%",
  },
  eyeButton: {
    padding: spacing.sm,
    marginLeft: spacing.sm,
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginBottom: spacing.xl,
  },
  forgotText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
  },
  loginButton: {
    marginBottom: spacing.xl,
    ...shadows.md,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonGradient: {
    height: 56,
    borderRadius: borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: "white",
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signupText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  signupLink: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  },
});
