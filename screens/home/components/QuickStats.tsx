/**
 * @file screens/home/components/QuickStats.tsx
 * @description קומפוננטה לסטטיסטיקות מהירות במסך הבית של Moveo
 * @author GYMoveo Development
 * @version 1.0.1
 *
 * @component QuickStats
 * @parent HomeScreen
 *
 * @notes
 * - תיקון שגיאת Value._value
 * - תיקון icon names לExpo vector-icons
 * - הוספת RTL support
 * - עדכון theme imports
 * - הוספת אנימציות מלאות
 *
 * @changelog
 * - v1.0.1: Fixed animations and Value handling
 * - v1.0.0: Initial creation
 */

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
interface StatItem {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  gradient?: [string, string, ...string[]];
  change?: {
    value: number;
    type: "increase" | "decrease" | "neutral";
    period: string;
  };
  onPress?: () => void;
  route?: string;
}

interface QuickStatsProps {
  stats?: StatItem[];
  onStatPress?: (stat: StatItem) => void;
  showChangeIndicators?: boolean;
  animateOnLoad?: boolean;
}

/**
 * קומפוננטה עיקרית לסטטיסטיקות מהירות
 */
const QuickStats: React.FC<QuickStatsProps> = ({
  stats = getDefaultStats(),
  onStatPress,
  showChangeIndicators = true,
  animateOnLoad = true,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnims = useRef(
    stats.reduce((acc, stat) => {
      acc[stat.id] = new Animated.Value(0.8);
      return acc;
    }, {} as Record<string, Animated.Value>)
  ).current;

  useEffect(() => {
    if (animateOnLoad) {
      // אנימציית כניסה עיקרית
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: unifiedAnimations.duration.normal,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: unifiedAnimations.duration.normal,
          useNativeDriver: true,
        }),
      ]).start();

      // אנימציית קנה מידה לכל סטט
      const statAnimations = stats.map((stat, index) =>
        Animated.timing(scaleAnims[stat.id], {
          toValue: 1,
          duration: unifiedAnimations.duration.normal,
          delay: index * 100,
          useNativeDriver: true,
        })
      );

      Animated.stagger(100, statAnimations).start();
    }

    // סימולציה של טעינת דאטה
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [animateOnLoad, stats, fadeAnim, slideAnim, scaleAnims]);

  const handleStatPress = (stat: StatItem) => {
    // אנימציית לחיצה
    const pressAnimation = Animated.sequence([
      Animated.timing(scaleAnims[stat.id], {
        toValue: 0.95,
        duration: unifiedAnimations.duration.fast,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[stat.id], {
        toValue: 1,
        duration: unifiedAnimations.duration.fast,
        useNativeDriver: true,
      }),
    ]);

    pressAnimation.start();

    // הפעלת הפעולה
    setTimeout(() => {
      if (onStatPress) {
        onStatPress(stat);
      } else if (stat.onPress) {
        stat.onPress();
      } else if (stat.route) {
        router.push(stat.route as any);
      }
    }, unifiedAnimations.duration.fast);
  };

  const renderChangeIndicator = (change: StatItem["change"]) => {
    if (!change || !showChangeIndicators) return null;

    const isPositive = change.type === "increase";
    const isNegative = change.type === "decrease";
    const color = isPositive
      ? unifiedColors.success[500]
      : isNegative
      ? unifiedColors.error[500]
      : unifiedColors.text.secondary;

    const iconName = isPositive
      ? "trending-up-outline"
      : isNegative
      ? "trending-down-outline"
      : "remove-outline";

    return (
      <View style={[rtlStyles.row, styles.changeIndicator]}>
        <Ionicons name={iconName} size={12} color={color} />
        <Text style={[rtlStyles.text, styles.changeText, { color }]}>
          {Math.abs(change.value)}% {change.period}
        </Text>
      </View>
    );
  };

  const renderStat = (stat: StatItem) => {
    // תיקון הגישה ל-Animated.Value
    const animatedStyle = {
      opacity: fadeAnim,
      transform: [{ translateY: slideAnim }, { scale: scaleAnims[stat.id] }],
    };

    const displayValue =
      typeof stat.value === "number"
        ? stat.value.toLocaleString("he-IL")
        : stat.value;

    return (
      <Animated.View key={stat.id} style={animatedStyle}>
        <TouchableOpacity
          style={styles.statItem}
          onPress={() => handleStatPress(stat)}
          activeOpacity={0.8}
        >
          {stat.gradient ? (
            <LinearGradient
              colors={stat.gradient as [string, string, ...string[]]}
              style={styles.statGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.statContent}>
                <View style={[rtlStyles.row, styles.statHeader]}>
                  <Ionicons
                    name={stat.icon}
                    size={20}
                    color={unifiedColors.background.primary}
                  />
                  <Text style={[rtlStyles.text, styles.statTitle]}>
                    {stat.title}
                  </Text>
                </View>

                <View style={styles.statValueContainer}>
                  <Text style={[rtlStyles.text, styles.statValue]}>
                    {displayValue}
                  </Text>
                  {stat.unit && (
                    <Text style={[rtlStyles.text, styles.statUnit]}>
                      {stat.unit}
                    </Text>
                  )}
                </View>

                {renderChangeIndicator(stat.change)}
              </View>
            </LinearGradient>
          ) : (
            <View style={[styles.statContent, { backgroundColor: stat.color }]}>
              <View style={[rtlStyles.row, styles.statHeader]}>
                <Ionicons
                  name={stat.icon}
                  size={20}
                  color={unifiedColors.background.primary}
                />
                <Text style={[rtlStyles.text, styles.statTitle]}>
                  {stat.title}
                </Text>
              </View>

              <View style={styles.statValueContainer}>
                <Text style={[rtlStyles.text, styles.statValue]}>
                  {displayValue}
                </Text>
                {stat.unit && (
                  <Text style={[rtlStyles.text, styles.statUnit]}>
                    {stat.unit}
                  </Text>
                )}
              </View>

              {renderChangeIndicator(stat.change)}
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[rtlStyles.text, styles.sectionTitle]}>סטטיסטיקות בהכל</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.statsContainer}
        style={styles.statsScrollView}
      >
        {stats.map(renderStat)}
      </ScrollView>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Text style={[rtlStyles.text, styles.loadingText]}>
            טוען נתונים...
          </Text>
        </View>
      )}
    </View>
  );
};

// Default stats data
const getDefaultStats = (): StatItem[] => [
  {
    id: "workouts-week",
    title: "אימונים השבוע",
    value: 4,
    unit: "אימונים",
    icon: "fitness-outline",
    color: unifiedColors.primary[500],
    gradient: [unifiedGradients.primary[0], unifiedGradients.primary[1]],
    change: {
      value: 25,
      type: "increase",
      period: "מהשבוע הקודם",
    },
    route: "/(tabs)/workouts",
  },
  {
    id: "calories-burned",
    title: "קלוריות נשרפו",
    value: 2450,
    unit: "קלוריות",
    icon: "flame-outline",
    color: unifiedColors.warning[500],
    gradient: [unifiedGradients.warning[0], unifiedGradients.warning[1]],
    change: {
      value: 12,
      type: "increase",
      period: "מאתמול",
    },
    route: "/(tabs)/nutrition",
  },
  {
    id: "weight-progress",
    title: "משקל נוכחי",
    value: 75.5,
    unit: 'ק"ג',
    icon: "scale-outline",
    color: unifiedColors.success[500],
    gradient: [unifiedGradients.success[0], unifiedGradients.success[1]],
    change: {
      value: 2.1,
      type: "decrease",
      period: "החודש",
    },
    route: "/(tabs)/progress",
  },
  {
    id: "streak",
    title: "רצף אימונים",
    value: 12,
    unit: "ימים",
    icon: "trophy-outline",
    color: unifiedColors.accent.orange,
    gradient: [unifiedGradients.sunset[0], unifiedGradients.sunset[1]],
    change: {
      value: 0,
      type: "neutral",
      period: "יציב",
    },
    route: "/(tabs)/achievements",
  },
  {
    id: "water-intake",
    title: "צריכת מים",
    value: 2.1,
    unit: "ליטר",
    icon: "water-outline",
    color: unifiedColors.accent.teal,
    gradient: [unifiedGradients.ocean[0], unifiedGradients.ocean[1]],
    change: {
      value: 8,
      type: "increase",
      period: "היום",
    },
    route: "/(tabs)/nutrition",
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

  statsScrollView: {
    marginHorizontal: -unifiedSpacing.sm,
  },

  statsContainer: {
    paddingHorizontal: unifiedSpacing.sm,
    gap: unifiedSpacing.sm,
  },

  statItem: {
    width: 140,
    height: 120,
    borderRadius: unifiedBorderRadius.lg,
    ...unifiedShadows.sm,
  },

  statGradient: {
    flex: 1,
    borderRadius: unifiedBorderRadius.lg,
    padding: unifiedSpacing.sm,
  },

  statContent: {
    flex: 1,
    borderRadius: unifiedBorderRadius.lg,
    padding: unifiedSpacing.sm,
    justifyContent: "space-between",
  },

  statHeader: {
    alignItems: "center",
    gap: unifiedSpacing.xs,
  },

  statTitle: {
    fontSize: unifiedTypography.sizes.xs,
    fontWeight: unifiedTypography.weights.medium,
    color: unifiedColors.background.primary,
    textAlign: "center",
    flex: 1,
  },

  statValueContainer: {
    alignItems: "center",
    marginVertical: unifiedSpacing.xs,
  },

  statValue: {
    fontSize: unifiedTypography.sizes.xl,
    fontWeight: unifiedTypography.weights.bold,
    color: unifiedColors.background.primary,
    textAlign: "center",
  },

  statUnit: {
    fontSize: unifiedTypography.sizes.xs,
    color: unifiedColors.background.primary,
    opacity: 0.8,
    textAlign: "center",
    marginTop: unifiedSpacing.xs / 2,
  },

  changeIndicator: {
    alignItems: "center",
    justifyContent: "center",
    gap: unifiedSpacing.xs / 2,
  },

  changeText: {
    fontSize: unifiedTypography.sizes.xs - 1,
    fontWeight: unifiedTypography.weights.medium,
    opacity: 0.9,
  },

  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: unifiedBorderRadius.card,
  },

  loadingText: {
    fontSize: unifiedTypography.sizes.sm,
    color: unifiedColors.text.secondary,
    fontWeight: unifiedTypography.weights.medium,
  },
});

export default QuickStats;
