/**
 * @file screens/welcome/components/DevPanel.tsx
 * @description פאנל פיתוח להתחברות מהירה עם משתמשי דמו
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @component DevPanel
 * @parent WelcomeScreen
 *
 * @notes
 * - רשימת משתמשי דמו לבדיקות
 * - אפשרות לאיפוס כל הנתונים
 * - נגיש רק במצב פיתוח
 * - מיון משתמשים לפי רמה
 *
 * @changelog
 * - v1.0.0: Initial creation
 */

import { theme } from "@/styles/theme";
import React, { memo, useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import DemoUserCard from "./DemoUserCard";

const { colors, spacing, fontSizes, fontWeights, borderRadius, shadows } =
  theme;

interface DevPanelProps {
  visible: boolean;
  demoUsers: any[];
  onDemoLogin: (user: any) => void;
  onResetData: () => void;
}

export const DevPanel: React.FC<DevPanelProps> = memo(
  ({ visible, demoUsers, onDemoLogin, onResetData }) => {
    // מצב טעינה לפעולות
    const [isResetting, setIsResetting] = useState(false);
    const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

    // מיון משתמשי דמו לפי רמה
    const sortedUsers = useMemo(() => {
      const levelOrder = { beginner: 0, intermediate: 1, advanced: 2 };
      return [...demoUsers].sort((a, b) => {
        const aLevel = levelOrder[a.level as keyof typeof levelOrder] ?? 3;
        const bLevel = levelOrder[b.level as keyof typeof levelOrder] ?? 3;
        return aLevel - bLevel;
      });
    }, [demoUsers]);

    // פונקציה משופרת לכניסה עם משתמש דמו
    const handleDemoLogin = useCallback(
      async (user: any) => {
        try {
          setLoadingUserId(user.id);
          // רטט קל לפידבק
          if (Platform.OS !== "web") {
            Vibration.vibrate(10);
          }
          await onDemoLogin(user);
        } catch {
          Alert.alert("שגיאה", "לא ניתן להתחבר עם משתמש זה");
        } finally {
          setLoadingUserId(null);
        }
      },
      [onDemoLogin]
    );

    // פונקציה משופרת לאיפוס נתונים עם אישור
    const handleResetData = useCallback(() => {
      Alert.alert(
        "⚠️ אזהרה",
        "פעולה זו תמחק את כל הנתונים המקומיים. האם אתה בטוח?",
        [
          { text: "ביטול", style: "cancel" },
          {
            text: "מחק הכל",
            style: "destructive",
            onPress: async () => {
              setIsResetting(true);
              try {
                await onResetData();
                Alert.alert("✅ הצלחה", "כל הנתונים נמחקו בהצלחה");
              } catch {
                Alert.alert("שגיאה", "לא ניתן למחוק את הנתונים");
              } finally {
                setIsResetting(false);
              }
            },
          },
        ],
        { cancelable: true }
      );
    }, [onResetData]);

    if (!visible) return null;

    return (
      <View style={styles.devPanel} testID="dev-panel">
        {/* כותרת עם אנימציה */}
        <View style={styles.devHeader}>
          <View style={[styles.devIndicator, styles.pulsingIndicator]} />
          <Text style={styles.devTitle}>DEV MODE</Text>
          <Text style={styles.devVersion}>v2.0</Text>
        </View>

        {/* סטטיסטיקות */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{demoUsers.length}</Text>
            <Text style={styles.statLabel}>משתמשים</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>רמות</Text>
          </View>
        </View>

        <Text style={styles.demoSectionTitle}>בחר משתמש לבדיקה</Text>

        {/* רשימת משתמשים עם גלילה */}
        <ScrollView
          style={styles.usersScrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.usersScrollContent}
        >
          {sortedUsers.map((user) => (
            <View key={user.id} style={styles.userCardWrapper}>
              {loadingUserId === user.id && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="small" color={colors.primary[600]} />
                </View>
              )}
              <TouchableOpacity
                disabled={loadingUserId !== null}
                onPress={() => handleDemoLogin(user)}
                activeOpacity={0.7}
              >
                <DemoUserCard
                  user={user}
                  onPress={() => {}} // DemoUserCard מטפל בעיצוב בלבד
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* כפתורי פעולה */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[
              styles.resetButton,
              isResetting && styles.resetButtonDisabled,
            ]}
            onPress={handleResetData}
            disabled={isResetting}
            activeOpacity={0.7}
          >
            {isResetting ? (
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
