// app/signup.tsx
import theme from "@/styles/theme";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const { colors, spacing, fontSizes, fontWeights } = theme;

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
    backgroundColor: colors.dark[900],
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  title: {
    fontSize: fontSizes.xxxl,
    fontWeight: fontWeights.bold,
    color: colors.light[50],
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: fontSizes.lg,
    color: colors.light[500],
    marginBottom: spacing.xl,
  },
  link: {
    color: colors.primary[600],
    fontSize: fontSizes.md,
  },
});
