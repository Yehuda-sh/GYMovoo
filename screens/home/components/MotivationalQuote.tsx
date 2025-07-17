/**
 * @file screens/home/components/MotivationalQuote.tsx
 * @description קומפוננטה להצגת ציטוט מוטיבציה יומי
 * @author GYMoveo Development
 * @version 1.0.1
 *
 * @component MotivationalQuote
 * @parent HomeScreen
 *
 * @notes
 * - מחליף ציטוט כל יום
 * - אנימציה חלקה בטעינה ובמעבר
 * - אפשרות לשתף ציטוט
 * - תוקן: בעיות ESLint עם imports ו-hooks
 *
 * @changelog
 * - v1.0.0: Initial component creation
 * - v1.0.1: Fixed ESLint issues
 */

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  Animated,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// תיקון: import נכון מה-theme
import {
  borderRadius,
  colors,
  fontSizes,
  fontWeights,
  shadows,
  spacing,
} from "@/styles/theme";

interface Quote {
  text: string;
  author: string;
  category: "motivation" | "success" | "fitness" | "perseverance";
}

const quotes: Quote[] = [
  {
    text: "הכוח לא מגיע מיכולת פיזית. הוא מגיע מרצון בלתי מנוצח",
    author: "מהטמה גנדי",
    category: "motivation",
  },
  {
    text: "האלופים לא נעשים בחדר כושר. אלופים נעשים ממשהו שיש להם עמוק בפנים - רצון, חלום, חזון",
    author: "מוחמד עלי",
    category: "success",
  },
  {
    text: "ההבדל בין הבלתי אפשרי לאפשרי טמון בנחישות של האדם",
    author: "טומי לסורדה",
    category: "perseverance",
  },
  {
    text: "אל תספור את הימים, תעשה שהימים יספרו",
    author: "מוחמד עלי",
    category: "motivation",
  },
  {
    text: "הדרך היחידה לעשות עבודה נהדרת היא לאהוב את מה שאתה עושה",
    author: "סטיב ג'ובס",
    category: "success",
  },
  {
    text: "הגוף משיג את מה שהמוח מאמין בו",
    author: "נפוליאון היל",
    category: "fitness",
  },
  {
    text: "אם זה לא מאתגר אותך, זה לא משנה אותך",
    author: "פרד דוויטו",
    category: "fitness",
  },
  {
    text: "התירוץ היחיד לא להתאמן הוא שאתה לא רוצה להיות חזק מספיק",
    author: "אנונימי",
    category: "fitness",
  },
];

const MotivationalQuote = memo(() => {
  // 📊 Local state
  const [currentQuote, setCurrentQuote] = useState<Quote>(quotes[0]);
  const [isLiked, setIsLiked] = useState(false);

  // תיקון: אנימציות עם useMemo
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const scaleAnim = useMemo(() => new Animated.Value(0.95), []);
  const heartScale = useMemo(() => new Animated.Value(1), []);

  // 🎭 אנימציית כניסה - תיקון dependencies
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  // 📅 בחירת ציטוט יומי
  useEffect(() => {
    // בחירת ציטוט לפי התאריך (אותו ציטוט לכל היום)
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        1000 /
        60 /
        60 /
        24
    );
    const quoteIndex = dayOfYear % quotes.length;
    setCurrentQuote(quotes[quoteIndex]);
  }, []);

  // ❤️ אנימציית לייק - תיקון dependencies
  const handleLike = useCallback(() => {
    setIsLiked(!isLiked);
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isLiked, heartScale]);

  // 📤 שיתוף ציטוט
  const handleShare = useCallback(async () => {
    try {
      const message = `"${currentQuote.text}"\n\n- ${currentQuote.author}\n\nשותף מאפליקציית GYMovoo 💪`;

      await Share.share({
        message,
        title: "ציטוט מוטיבציה מ-GYMovoo",
      });
    } catch (error) {
      console.error("Error sharing quote:", error);
    }
  }, [currentQuote]);

  // 🔄 החלפת ציטוט
  const handleRefresh = useCallback(() => {
    // אנימציית fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // בחירת ציטוט אקראי חדש
      const availableQuotes = quotes.filter(
        (q) => q.text !== currentQuote.text
      );
      const randomIndex = Math.floor(Math.random() * availableQuotes.length);
      setCurrentQuote(availableQuotes[randomIndex]);
      setIsLiked(false);

      // אנימציית fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    });
  }, [currentQuote, fadeAnim]);

  // 🏷️ צבע רקע לפי קטגוריה
  const getCategoryColors = (category: string): readonly [string, string] => {
    const colorMap = {
      motivation: [colors.primary[500], colors.primary[600]] as const,
      success: [colors.secondary[500], colors.secondary[600]] as const,
      fitness: [colors.status.success, colors.status.successDark] as const,
      perseverance: [colors.status.warning, colors.status.warningDark] as const,
    };
    return colorMap[category as keyof typeof colorMap] || colorMap.motivation;
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <LinearGradient
        colors={getCategoryColors(currentQuote.category)}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* כותרת */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="sparkles" size={20} color={colors.light[50]} />
          </View>
          <Text style={styles.headerText}>מחשבה ליום</Text>
        </View>

        {/* ציטוט */}
        <Animated.View style={[styles.quoteContainer, { opacity: fadeAnim }]}>
          <Text style={styles.quoteText}>
            &ldquo;{currentQuote.text}&rdquo;
          </Text>
          <Text style={styles.authorText}>- {currentQuote.author}</Text>
        </Animated.View>

        {/* פעולות */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleLike}
            activeOpacity={0.7}
          >
            <Animated.View style={{ transform: [{ scale: heartScale }] }}>
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={24}
                color={isLiked ? colors.status.error[400] : colors.light[50]}
              />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <Ionicons
              name={
                Platform.OS === "ios" ? "share-outline" : "share-social-outline"
              }
              size={22}
              color={colors.light[50]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleRefresh}
            activeOpacity={0.7}
          >
            <Ionicons
              name="refresh-outline"
              size={24}
              color={colors.light[50]}
            />
          </TouchableOpacity>
        </View>

        {/* עיטור דקורטיבי */}
        <View style={styles.decorativeQuote}>
          <Text style={styles.decorativeText}>&ldquo;</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

MotivationalQuote.displayName = "MotivationalQuote";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  card: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    minHeight: 180,
    ...shadows.lg,
    position: "relative",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.light[50] + "20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  headerText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.light[200],
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  quoteContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  quoteText: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.medium,
    color: colors.light[50],
    lineHeight: 28,
    marginBottom: spacing.md,
    textAlign: "right",
  },
  authorText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    color: colors.light[200],
    textAlign: "right",
    fontStyle: "italic",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.sm,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.light[50] + "20",
    justifyContent: "center",
    alignItems: "center",
  },
  decorativeQuote: {
    position: "absolute",
    top: -20,
    left: -10,
    opacity: 0.1,
  },
  decorativeText: {
    fontSize: 120,
    fontWeight: fontWeights.bold,
    color: colors.light[50],
    transform: [{ rotate: "180deg" }],
  },
});

export default MotivationalQuote;
