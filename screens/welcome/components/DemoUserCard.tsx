/**
 * @file screens/welcome/components/DemoUserCard.tsx
 * @description כרטיס משתמש דמו למסך Welcome
 * @author GYMovoo Development
 * @version 1.0.0
 *
 * @component DemoUserCard
 * @parent WelcomeScreen
 *
 * @notes
 * - מציג פרטי משתמש דמו באופן ויזואלי
 * - כולל אנימציות וגרדיאנטים מותאמים
 * - מתאים למצב לילה
 *
 * @changelog
 * - v1.0.0: Initial component creation
 */

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { memo, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  borderRadius,
  colors,
  fontSizes,
  fontWeights,
  spacing,
} from "@/styles/theme";

interface DemoUserCardProps {
  id: string;
  name: string;
  age?: number;
  level?: string;
  goal?: string;
  onPress: (userId: string) => void;
  disabled?: boolean;
}

const DemoUserCard: React.FC<DemoUserCardProps> = memo(
  ({ id, name, age, level, goal, onPress, disabled = false }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.96,
        tension: 100,
        friction: 10,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 10,
        useNativeDriver: true,
      }).start();
    };

    const getGradientColors = () => {
      switch (level?.toLowerCase()) {
        case "מתקדם":
          return ["#6366f1", "#ff4757"] as const;
        case "ביניים":
          return ["#667eea", "#5a67d8"] as const;
        default:
          return ["#667eea", "#00ff88"] as const;
      }
    };

    const getIcon = () => {
      switch (goal?.toLowerCase()) {
        case "הרזיה":
          return "flame";
        case "בניית שריר":
          return "barbell";
        case "סיבולת":
          return "bicycle";
        default:
          return "fitness";
      }
    };

    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => !disabled && onPress(id)}
          disabled={disabled}
          style={[styles.touchable, disabled && styles.disabled]}
        >
          <LinearGradient
            colors={getGradientColors()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            {/* Avatar Circle */}
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]}
                style={styles.avatarGradient}
              >
                <Text style={styles.avatarText}>
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Text>
              </LinearGradient>
            </View>

            {/* Info Container */}
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.demoButtonSubtext}>
                לחץ כדי להיכנס כ{name}
              </Text>

              {/* Details */}
              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Ionicons
                    name={getIcon() as any}
                    size={12}
                    color={colors.light[400]}
                    style={styles.detailIcon}
                  />
                  <Text style={styles.demoButtonDetails}>
                    {goal || "כושר כללי"}
                  </Text>
                </View>
                <View style={styles.detailDivider} />
                <View style={styles.detailRow}>
                  <Ionicons
                    name="trending-up"
                    size={12}
                    color={colors.light[400]}
                    style={styles.detailIcon}
                  />
                  <Text style={styles.demoButtonDetails}>
                    {level || "מתחיל"}
                  </Text>
                </View>
              </View>
            </View>

            {/* Age Tag */}
            {age && (
              <View style={styles.ageTag}>
                <Text style={styles.ageText}>{age}</Text>
              </View>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }
);

DemoUserCard.displayName = "DemoUserCard";

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  touchable: {
    borderRadius: borderRadius.lg,
    overflow: "hidden",
  },
  disabled: {
    opacity: 0.6,
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    position: "relative",
  },
  avatarContainer: {
    marginRight: spacing.md,
  },
  avatarGradient: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: `${colors.light[50]}20`,
  },
  avatarText: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    color: colors.light[50],
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    color: colors.light[50],
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semiBold,
    marginBottom: spacing.xxs,
  },
  demoButtonSubtext: {
    color: colors.light[300],
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  detailIcon: {
    fontSize: fontSizes.xs,
  },
  demoButtonDetails: {
    color: colors.light[400],
    fontSize: fontSizes.xxs,
    fontWeight: fontWeights.medium,
  },
  detailDivider: {
    width: 1,
    height: 12,
    backgroundColor: colors.light[600],
    marginHorizontal: spacing.sm,
    opacity: 0.3,
  },
  ageTag: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.xs,
  },
  ageText: {
    color: colors.light[500],
    fontSize: fontSizes.xxs,
    fontWeight: fontWeights.semiBold,
  },
});

export default DemoUserCard;
