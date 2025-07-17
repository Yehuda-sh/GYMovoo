/**
 * @file screens/home/components/QuickActions.tsx
 * @description קומפוננטה לפעולות מהירות במסך הבית של Moveo
 * @author GYMoveo Development
 * @version 1.0.1
 *
 * @component QuickActions
 * @parent HomeScreen
 *
 * @notes
 * - הוספת unifiedAnimations לתיקון השגיאה
 * - תיקון icon names לExpo vector-icons
 * - הוספת RTL support
 * - עדכון theme imports
 * - הוספת אנימציות מלאות
 *
 * @changelog
 * - v1.0.1: Fixed animations and icons
 * - v1.0.0: Initial creation
 */

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";

// Theme imports
import { rtlStyles } from "@/styles/theme/rtl";
import {
  unifiedAnimations,
  unifiedBorderRadius,
  unifiedColors,
  unifiedGradients,
  unifiedShadows,
  unifiedSpacing,
  unifiedTypography,
} from "@/styles/theme/unifiedDesignSystem";

// Types
interface QuickAction {
  id: string;
  title: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  gradient?: string[];
  route?: string;
  onPress?: () => void;
  badge?: number;
  disabled?: boolean;
}

interface QuickActionsProps {
  actions?: QuickAction[];
  onActionPress?: (action: QuickAction) => void;
  showLabels?: boolean;
  columns?: number;
}

const { width } = Dimensions.get("window");

/**
 * קומפוננטה עיקרית לפעולות מהירות
 */
const QuickActions: React.FC<QuickActionsProps> = ({
  actions = getDefaultActions(),
  onActionPress,
  showLabels = true,
  columns = 4,
}) => {
  const [pressedAction, setPressedAction] = useState<string | null>(null);
  const animatedValues = useRef(
    actions.reduce((acc, action) => {
      acc[action.id] = new Animated.Value(1);
      return acc;
    }, {} as Record<string, Animated.Value>)
  ).current;

  const handleActionPress = (action: QuickAction) => {
    if (action.disabled) return;

    // הפעלת ויברציה קלה
    if (Platform.OS === "ios") {
      Vibration.vibrate(10);
    }

    // אנימציית לחיצה
    setPressedAction(action.id);

    Animated.sequence([
      Animated.timing(animatedValues[action.id], {
        toValue: 0.9,
        duration: unifiedAnimations.duration.fast,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues[action.id], {
        toValue: 1,
        duration: unifiedAnimations.duration.fast,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setPressedAction(null);
    });

    // הפעלת הפעולה
    setTimeout(() => {
      if (onActionPress) {
        onActionPress(action);
      } else if (action.onPress) {
        action.onPress();
      } else if (action.route) {
        router.push(action.route as any);
      }
    }, unifiedAnimations.duration.fast);
  };

  const renderAction = (action: QuickAction, index: number) => {
    const animatedStyle = {
      transform: [{ scale: animatedValues[action.id] }],
    };

    const isPressed = pressedAction === action.id;

    return (
      <Animated.View
        key={action.id}
        style={[
          styles.actionWrapper,
          animatedStyle,
          { width: `${100 / columns}%` },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.actionButton,
            action.disabled && styles.disabledAction,
            isPressed && styles.pressedAction,
          ]}
          onPress={() => handleActionPress(action)}
          activeOpacity={0.8}
          disabled={action.disabled}
        >
          {action.gradient ? (
            <LinearGradient
              colors={action.gradient}
              style={styles.gradientContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.actionContent}>
                <Ionicons
                  name={action.icon}
                  size={24}
                  color={unifiedColors.background.primary}
                />
                {action.badge && action.badge > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {action.badge > 99 ? "99+" : action.badge}
                    </Text>
                  </View>
                )}
              </View>
            </LinearGradient>
          ) : (
            <View
              style={[styles.actionContent, { backgroundColor: action.color }]}
            >
              <Ionicons
                name={action.icon}
                size={24}
                color={unifiedColors.background.primary}
              />
              {action.badge && action.badge > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {action.badge > 99 ? "99+" : action.badge}
                  </Text>
                </View>
              )}
            </View>
          )}
        </TouchableOpacity>

        {showLabels && (
          <View style={styles.labelContainer}>
            <Text
              style={[rtlStyles.text, styles.actionTitle]}
              numberOfLines={1}
            >
              {action.title}
            </Text>
            {action.subtitle && (
              <Text
                style={[rtlStyles.text, styles.actionSubtitle]}
                numberOfLines={1}
              >
                {action.subtitle}
              </Text>
            )}
          </View>
        )}
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[rtlStyles.text, styles.sectionTitle]}>פעולות מהירות</Text>

      <View style={styles.actionsGrid}>{actions.map(renderAction)}</View>
    </View>
  );
};

// Default actions
const getDefaultActions = (): QuickAction[] => [
  {
    id: "start-workout",
    title: "התחל אימון",
    subtitle: "אימון חדש",
    icon: "play-circle-outline",
    color: unifiedColors.primary[500],
    gradient: unifiedGradients.primary,
    route: "/(tabs)/workouts",
  },
  {
    id: "track-progress",
    title: "עדכן התקדמות",
    subtitle: "משקל ומידות",
    icon: "trending-up-outline",
    color: unifiedColors.success[500],
    gradient: unifiedGradients.success,
    route: "/(tabs)/progress",
  },
  {
    id: "nutrition",
    title: "תזונה",
    subtitle: "מעקב קלוריות",
    icon: "nutrition-outline",
    color: unifiedColors.warning[500],
    gradient: unifiedGradients.warning,
    route: "/(tabs)/nutrition",
  },
  {
    id: "social",
    title: "חברים",
    subtitle: "שתף הישגים",
    icon: "people-outline",
    color: unifiedColors.accent.teal,
    gradient: unifiedGradients.ocean,
    route: "/(tabs)/social",
    badge: 3,
  },
  {
    id: "timer",
    title: "טיימר",
    subtitle: "מנוחה בין סטים",
    icon: "timer-outline",
    color: unifiedColors.secondary[500],
    gradient: unifiedGradients.secondary,
    onPress: () => {
      // TODO: Open timer modal
      console.log("Opening timer...");
    },
  },
  {
    id: "calendar",
    title: "לוח שנה",
    subtitle: "תכנון אימונים",
    icon: "calendar-outline",
    color: unifiedColors.accent.purple,
    gradient: unifiedGradients.royal,
    route: "/(tabs)/calendar",
  },
  {
    id: "stats",
    title: "סטטיסטיקות",
    subtitle: "ביצועים",
    icon: "stats-chart-outline",
    color: unifiedColors.accent.orange,
    gradient: unifiedGradients.sunset,
    route: "/(tabs)/stats",
  },
  {
    id: "settings",
    title: "הגדרות",
    subtitle: "התאמה אישית",
    icon: "settings-outline",
    color: unifiedColors.secondary[600],
    route: "/(tabs)/settings",
  },
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: unifiedColors.background.primary,
    borderRadius: unifiedBorderRadius.card,
    padding: unifiedSpacing.cardPadding,
    marginVertical: unifiedSpacing.sm,
    ...unifiedShadows.card,
  },

  sectionTitle: {
    fontSize: unifiedTypography.sizes.lg,
    fontWeight: unifiedTypography.weights.bold,
    color: unifiedColors.text.primary,
    marginBottom: unifiedSpacing.md,
    textAlign: "center",
  },

  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  actionWrapper: {
    alignItems: "center",
    marginBottom: unifiedSpacing.md,
    paddingHorizontal: unifiedSpacing.xs,
  },

  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: unifiedSpacing.xs,
    ...unifiedShadows.sm,
  },

  gradientContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  actionContent: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: unifiedColors.error[500],
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: unifiedColors.background.primary,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: unifiedTypography.weights.bold,
    color: unifiedColors.background.primary,
    lineHeight: 12,
  },

  labelContainer: {
    alignItems: "center",
    maxWidth: "100%",
  },

  actionTitle: {
    fontSize: unifiedTypography.sizes.xs,
    fontWeight: unifiedTypography.weights.medium,
    color: unifiedColors.text.primary,
    textAlign: "center",
  },

  actionSubtitle: {
    fontSize: unifiedTypography.sizes.xs - 1,
    color: unifiedColors.text.tertiary,
    textAlign: "center",
    marginTop: 2,
  },

  disabledAction: {
    opacity: 0.5,
  },

  pressedAction: {
    opacity: 0.8,
  },
});

export default QuickActions;
