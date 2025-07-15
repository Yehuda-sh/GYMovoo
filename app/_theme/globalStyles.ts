// app/_theme/globalStyles.ts
import { StyleSheet } from "react-native";
import colors from "./colors";
import spacing from "./spacing";
import typography from "./typography";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.subtitle,
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 14,
    marginBottom: spacing.md,
    alignItems: "center",
  },
  buttonText: {
    ...typography.button,
    color: "#fff",
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: 10,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "500" as const,
  },
});
export default globalStyles;
