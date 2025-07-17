/**
 * @file screens/welcome/components/DevPanel.tsx
 * @description פאנל פיתוח נסתר למסך Welcome
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @component DevPanel
 * @parent WelcomeScreen
 *
 * @notes
 * - נגיש רק במצב פיתוח
 * - מאפשר כניסה מהירה כמשתמשי דמו
 * - מאפשר איפוס נתונים
 *
 * @changelog
 * - v1.0.0: Initial component creation
 */

import React, { memo } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import theme from "@/styles/theme";

const { colors, spacing, borderRadius, shadows, fontSizes, fontWeights } =
  theme;

interface DemoUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level?: string;
  goal?: string;
  isDemo: boolean;
}

interface DevPanelProps {
  demoUsers: DemoUser[];
  onSelectUser: (userId: string) => void;
  onResetData: () => void;
  isLoading?: boolean;
}

const DevPanel: React.FC<DevPanelProps> = memo(
  ({ demoUsers, onSelectUser, onResetData, isLoading = false }) => {
    return (
      <View style={styles.devPanel}>
        {/* 🔧 Header */}
        <View style={styles.devHeader}>
          <View style={[styles.devIndicator, styles.pulsingIndicator]} />
          <Text style={styles.devTitle}>DEV MODE</Text>
          <Text style={styles.devVersion}>v1.0.0</Text>
        </View>

        {/* 📊 Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{demoUsers.length}</Text>
            <Text style={styles.statLabel}>משתמשי דמו</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>∞</Text>
            <Text style={styles.statLabel}>כניסות</Text>
          </View>
        </View>

        {/* 👥 Demo Users */}
        <Text style={styles.demoSectionTitle}>בחר משתמש דמו:</Text>
        <ScrollView
          style={styles.usersScrollView}
          contentContainerStyle={styles.usersScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {demoUsers.map((user) => (
            <View key={user.id} style={styles.userCardWrapper}>
              <TouchableOpacity
                style={[styles.userCard, isLoading && styles.userCardDisabled]}
                onPress={() => !isLoading && onSelectUser(user.id)}
                activeOpacity={0.7}
                disabled={isLoading}
              >
                <View style={styles.userAvatar}>
                  <Text style={styles.userAvatarText}>
                    {user.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                  <Text style={styles.userMeta}>
                    {user.level || "מתחיל"} • {user.goal || "כושר כללי"}
                  </Text>
                </View>
              </TouchableOpacity>
              {isLoading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="small" color={colors.primary[500]} />
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        {/* 🗑️ Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[
              styles.resetButton,
              isLoading && styles.resetButtonDisabled,
            ]}
            onPress={() => {
              Alert.alert(
                "איפוס נתונים",
                "פעולה זו תמחק את כל הנתונים המקומיים. להמשיך?",
                [
                  { text: "ביטול", style: "cancel" },
                  {
                    text: "מחק",
                    style: "destructive",
                    onPress: onResetData,
                  },
                ]
              );
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={colors.light[50]} />
            ) : (
              <>
                <Text style={styles.resetIcon}>🗑️</Text>
                <Text style={styles.resetButtonText}>נקה נתונים</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => Alert.alert("מידע", "פאנל זה זמין רק בסביבת פיתוח")}
          >
            <Text style={styles.infoIcon}>ℹ️</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

DevPanel.displayName = "DevPanel";

const styles = StyleSheet.create({
  devPanel: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.dark[700],
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.dark[500],
    ...shadows.md,
  },
  devHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  devIndicator: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.status.success,
  },
  pulsingIndicator: {
    // אנימציה בעתיד
  },
  devTitle: {
    color: colors.status.success,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
    letterSpacing: 1,
  },
  devVersion: {
    color: colors.light[500],
    fontSize: fontSizes.xxs,
    fontWeight: fontWeights.medium,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.dark[800],
    borderRadius: borderRadius.md,
  },
  statItem: {
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  statValue: {
    color: colors.primary[600],
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
  },
  statLabel: {
    color: colors.light[500],
    fontSize: fontSizes.xxs,
    marginTop: spacing.xxs,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.dark[500],
  },
  demoSectionTitle: {
    color: colors.status.warning,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semiBold,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  usersScrollView: {
    maxHeight: 280,
  },
  usersScrollContent: {
    paddingBottom: spacing.sm,
  },
  userCardWrapper: {
    position: "relative",
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.dark[600],
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.dark[500],
  },
  userCardDisabled: {
    opacity: 0.6,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[500],
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  userAvatarText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.bold,
    color: colors.light[50],
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semiBold,
    color: colors.light[50],
  },
  userEmail: {
    fontSize: fontSizes.xs,
    color: colors.light[500],
  },
  userMeta: {
    fontSize: fontSizes.xxs,
    color: colors.light[600],
    marginTop: 2,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: borderRadius.md,
    zIndex: 1,
  },
  actionsContainer: {
    flexDirection: "row",
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  resetButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.status.error,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.status.errorDark,
  },
  resetButtonDisabled: {
    opacity: 0.6,
  },
  resetIcon: {
    fontSize: fontSizes.sm,
  },
  resetButtonText: {
    color: colors.light[50],
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semiBold,
  },
  infoButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: `${colors.light[500]}0D`,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.dark[500],
  },
  infoIcon: {
    fontSize: fontSizes.md,
  },
});

export default DevPanel;
