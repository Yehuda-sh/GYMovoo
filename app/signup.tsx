// app/signup.tsx
import { colors, spacing, typography } from "@/app/styles/theme";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>מסך הרשמה</Text>
      <Text style={styles.subtitle}>בקרוב...</Text>
      <Link href="/(auth)/welcome" style={styles.link}>
        חזרה
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  link: {
    color: colors.primary,
    fontSize: typography.fontSize.md,
  },
});
