/**
 * @file screens/home/components/RecentActivity.tsx
 * @description קומפוננטה להצגת פעילות אחרונה במסך הבית של Moveo
 * @author GYMoveo Development
 * @version 1.0.1
 *
 * @component RecentActivity
 * @parent HomeScreen
 *
 * @notes
 * - תיקון routing לExpo Router
 * - הוספת RTL support
 * - עדכון imports לtheme החדש
 * - הוספת fallback data
 * - הוספת proper TypeScript types
 * - תיקון נתיבי הניווט
 *
 * @changelog
 * - v1.0.1: Fixed routing and imports
 * - v1.0.0: Initial creation
 */

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Theme imports - עדכון לimports החדשים
import { rtlSafe, rtlStyles } from "@/styles/theme/rtl";
import {
  unifiedBorderRadius,
  unifiedColors,
  unifiedShadows,
  unifiedSpacing,
  unifiedTypography,
} from "@/styles/theme/unifiedDesignSystem";

// Types
interface RecentActivityItem {
  id: string;
  type: "workout" | "achievement" | "progress" | "social";
  title: string;
  description: string;
  timestamp: Date;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  metadata?: {
    duration?: number;
    calories?: number;
    exercises?: number;
    achievement?: string;
    progress?: number;
  };
}

interface RecentActivityProps {
  userId?: string;
  maxItems?: number;
  onItemPress?: (item: RecentActivityItem) => void;
  showViewAll?: boolean;
}

const { width } = Dimensions.get("window");

/**
 * קומפוננטה עיקרית לפעילות אחרונה
 */
const RecentActivity: React.FC<RecentActivityProps> = ({
  userId,
  maxItems = 5,
  onItemPress,
  showViewAll = true,
}) => {
  const [activities, setActivities] = useState<RecentActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadRecentActivities();
  }, [userId]);

  const loadRecentActivities = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const mockActivities = getMockActivities();
      setActivities(mockActivities.slice(0, maxItems));
    } catch (error) {
      console.error("Failed to load recent activities:", error);
      setActivities(getFallbackActivities());
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadRecentActivities();
    setRefreshing(false);
  };

  const handleItemPress = (item: RecentActivityItem) => {
    if (onItemPress) {
      onItemPress(item);
      return;
    }

    // Navigate based on activity type with proper Expo Router paths
    switch (item.type) {
      case "workout":
        router.push("/(tabs)/workouts");
        break;
      case "progress":
        router.push("/(tabs)/progress");
        break;
      case "achievement":
        router.push("/(tabs)/profile");
        break;
      case "social":
        router.push("/(tabs)/social");
        break;
      default:
        router.push("/(tabs)/home");
    }
  };

  const handleViewAll = () => {
    router.push("/(tabs)/activity");
  };

  const renderActivityItem = (item: RecentActivityItem) => {
    const timeAgo = getTimeAgo(item.timestamp);

    return (
      <TouchableOpacity
        key={item.id}
        style={[rtlStyles.row, styles.activityItem]}
        onPress={() => handleItemPress(item)}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
          <Ionicons
            name={item.icon}
            size={20}
            color={unifiedColors.background.primary}
          />
        </View>

        <View style={[styles.contentContainer, rtlSafe.flex]}>
          <Text
            style={[rtlStyles.text, styles.activityTitle]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text
            style={[rtlStyles.text, styles.activityDescription]}
            numberOfLines={2}
          >
            {item.description}
          </Text>

          {item.metadata && (
            <View style={[rtlStyles.row, styles.metadataContainer]}>
              {item.metadata.duration && (
                <Text style={[rtlStyles.text, styles.metadataText]}>
                  {item.metadata.duration} דקות
                </Text>
              )}
              {item.metadata.calories && (
                <Text style={[rtlStyles.text, styles.metadataText]}>
                  {item.metadata.calories} קלוריות
                </Text>
              )}
              {item.metadata.exercises && (
                <Text style={[rtlStyles.text, styles.metadataText]}>
                  {item.metadata.exercises} תרגילים
                </Text>
              )}
            </View>
          )}
        </View>

        <View style={styles.timeContainer}>
          <Text style={[rtlStyles.text, styles.timeText]}>{timeAgo}</Text>
          <Ionicons
            name="chevron-forward"
            size={16}
            color={unifiedColors.text.tertiary}
            style={rtlSafe.transform}
          />
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={[rtlStyles.row, styles.header]}>
          <Text style={[rtlStyles.text, styles.headerTitle]}>
            פעילות אחרונה
          </Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={unifiedColors.primary[500]} />
          <Text style={[rtlStyles.text, styles.loadingText]}>
            טוען פעילות...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[rtlStyles.row, styles.header]}>
        <Text style={[rtlStyles.text, styles.headerTitle]}>פעילות אחרונה</Text>
        {showViewAll && (
          <TouchableOpacity
            onPress={handleViewAll}
            style={styles.viewAllButton}
          >
            <Text style={[rtlStyles.text, styles.viewAllText]}>צפה בהכל</Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={unifiedColors.primary[500]}
              style={rtlSafe.transform}
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[unifiedColors.primary[500]]}
            tintColor={unifiedColors.primary[500]}
          />
        }
      >
        {activities.length > 0 ? (
          activities.map(renderActivityItem)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons
              name="time-outline"
              size={48}
              color={unifiedColors.text.tertiary}
            />
            <Text style={[rtlStyles.text, styles.emptyStateTitle]}>
              אין פעילות אחרונה
            </Text>
            <Text style={[rtlStyles.text, styles.emptyStateDescription]}>
              התחל להתאמן כדי לראות את הפעילות שלך כאן
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

// Helper functions
const getTimeAgo = (timestamp: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - timestamp.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "עכשיו";
  if (diffMinutes < 60) return `לפני ${diffMinutes} דקות`;
  if (diffHours < 24) return `לפני ${diffHours} שעות`;
  if (diffDays < 7) return `לפני ${diffDays} ימים`;
  return timestamp.toLocaleDateString("he-IL");
};

const getMockActivities = (): RecentActivityItem[] => [
  {
    id: "1",
    type: "workout",
    title: "אימון חזה וכתפיים",
    description: "השלמת אימון מלא עם 8 תרגילים",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    icon: "fitness-outline",
    color: unifiedColors.primary[500],
    metadata: {
      duration: 45,
      calories: 320,
      exercises: 8,
    },
  },
  {
    id: "2",
    type: "achievement",
    title: "הישג חדש!",
    description: "השלמת 10 אימונים השבוע",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    icon: "trophy-outline",
    color: unifiedColors.warning[500],
    metadata: {
      achievement: "weekly_streak",
    },
  },
  {
    id: "3",
    type: "progress",
    title: "עדכון משקל",
    description: 'ירידה של 0.5 ק"ג מהשבוע הקודם',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    icon: "trending-down-outline",
    color: unifiedColors.success[500],
    metadata: {
      progress: -0.5,
    },
  },
  {
    id: "4",
    type: "workout",
    title: "אימון רגליים",
    description: "אימון אינטנסיבי של שרירי הרגליים",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    icon: "walk-outline",
    color: unifiedColors.secondary[500],
    metadata: {
      duration: 60,
      calories: 450,
      exercises: 6,
    },
  },
  {
    id: "5",
    type: "social",
    title: "חבר חדש",
    description: "התחברת עם דני כחבר אימון",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    icon: "people-outline",
    color: unifiedColors.accent.teal,
  },
];

const getFallbackActivities = (): RecentActivityItem[] => [
  {
    id: "fallback-1",
    type: "workout",
    title: "אימון לדוגמה",
    description: "זהו אימון לדוגמה לבדיקת הממשק",
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    icon: "fitness-outline",
    color: unifiedColors.primary[500],
    metadata: {
      duration: 30,
      calories: 200,
      exercises: 5,
    },
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

  header: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: unifiedSpacing.md,
  },

  headerTitle: {
    fontSize: unifiedTypography.sizes.lg,
    fontWeight: unifiedTypography.weights.bold,
    color: unifiedColors.text.primary,
  },

  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: unifiedSpacing.xs / 2,
  },

  viewAllText: {
    fontSize: unifiedTypography.sizes.sm,
    color: unifiedColors.primary[500],
    fontWeight: unifiedTypography.weights.medium,
  },

  scrollView: {
    maxHeight: 300,
  },

  activityItem: {
    paddingVertical: unifiedSpacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: unifiedColors.border.light,
    alignItems: "center",
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: unifiedSpacing.sm,
  },

  contentContainer: {
    flex: 1,
    paddingRight: unifiedSpacing.sm,
  },

  activityTitle: {
    fontSize: unifiedTypography.sizes.md,
    fontWeight: unifiedTypography.weights.medium,
    color: unifiedColors.text.primary,
    marginBottom: unifiedSpacing.xs / 2,
  },

  activityDescription: {
    fontSize: unifiedTypography.sizes.sm,
    color: unifiedColors.text.secondary,
    marginBottom: unifiedSpacing.xs,
  },

  metadataContainer: {
    gap: unifiedSpacing.sm,
  },

  metadataText: {
    fontSize: unifiedTypography.sizes.xs,
    color: unifiedColors.text.tertiary,
    backgroundColor: unifiedColors.background.secondary,
    paddingHorizontal: unifiedSpacing.xs,
    paddingVertical: unifiedSpacing.xs / 2,
    borderRadius: unifiedBorderRadius.xs,
  },

  timeContainer: {
    alignItems: "center",
    gap: unifiedSpacing.xs / 2,
  },

  timeText: {
    fontSize: unifiedTypography.sizes.xs,
    color: unifiedColors.text.tertiary,
  },

  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: unifiedSpacing.xl,
  },

  loadingText: {
    fontSize: unifiedTypography.sizes.sm,
    color: unifiedColors.text.secondary,
    marginTop: unifiedSpacing.sm,
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: unifiedSpacing.xl,
  },

  emptyStateTitle: {
    fontSize: unifiedTypography.sizes.md,
    fontWeight: unifiedTypography.weights.medium,
    color: unifiedColors.text.primary,
    marginTop: unifiedSpacing.sm,
    marginBottom: unifiedSpacing.xs,
  },

  emptyStateDescription: {
    fontSize: unifiedTypography.sizes.sm,
    color: unifiedColors.text.secondary,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default RecentActivity;
