// app/screens/welcome/components/DevPanel.tsx
import {
  borderRadius,
  colors,
  shadows,
  spacing,
  typography,
} from "@/app/styles/theme";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DevPanelProps } from "../types";

const DevPanel: React.FC<DevPanelProps> = ({
  visible,
  demoUsers,
  onDemoLogin,
  onResetData,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛠️ מצב פיתוח</Text>

      {/* רשימת משתמשי דמו */}
      <ScrollView style={styles.usersList}>
        <Text style={styles.sectionTitle}>משתמשי דמו:</Text>
        {demoUsers.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={styles.userCard}
            onPress={() => onDemoLogin(user as any)}
            activeOpacity={0.8}
          >
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>{user.name.charAt(0)}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              {user.level && (
                <Text style={styles.userMeta}>רמה: {user.level}</Text>
              )}
              {user.goal && (
                <Text style={styles.userMeta}>יעד: {user.goal}</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* כפתור איפוס נתונים */}
      <TouchableOpacity
        style={styles.resetButton}
        onPress={onResetData}
        activeOpacity={0.8}
      >
        <Text style={styles.resetButtonText}>🗑️ אפס את כל הנתונים</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: "center" as const,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  usersList: {
    maxHeight: 300,
    marginBottom: spacing.lg,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceLight,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  userAvatarText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  userEmail: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  userMeta: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  resetButton: {
    backgroundColor: colors.error,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: "center",
    ...shadows.sm,
  },
  resetButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
});

export default DevPanel;
