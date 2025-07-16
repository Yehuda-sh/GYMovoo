/**
 * 📁 Path: /styles/theme/borderRadius.ts
 * 📝 Description: רדיוסי גבול ועיגולים - Border radius and corners
 * 🔢 Version: 1.0
 *
 * 🔗 Dependencies: None
 *
 * ⚠️ Consistent corner radius system for modern UI
 */

// 🔲 Base border radius scale - סולם רדיוס בסיסי
export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  full: 9999, // Perfect circle - עיגול מושלם
} as const;

// 📦 Component-specific radii - רדיוסים לקומפוננטות
export const componentRadius = {
  // Buttons - כפתורים
  button: {
    small: borderRadius.sm,
    medium: borderRadius.md,
    large: borderRadius.lg,
    pill: borderRadius.full,
  },

  // Cards - כרטיסים
  card: {
    small: borderRadius.md,
    medium: borderRadius.lg,
    large: borderRadius.xl,
  },

  // Inputs - שדות קלט
  input: {
    default: borderRadius.md,
    rounded: borderRadius.lg,
    pill: borderRadius.full,
  },

  // Modals & Sheets - מודלים וגיליונות
  modal: {
    small: borderRadius.lg,
    medium: borderRadius.xl,
    large: borderRadius.xxl,
  },

  // Bottom sheets - גיליונות תחתונים
  bottomSheet: {
    handle: borderRadius.full,
    container: {
      top: borderRadius.xl,
      bottom: 0,
    },
  },

  // Avatars - אווטרים
  avatar: {
    square: borderRadius.md,
    rounded: borderRadius.xl,
    circle: borderRadius.full,
  },

  // Badges & Pills - תגים וכדורים
  badge: {
    default: borderRadius.sm,
    rounded: borderRadius.md,
    pill: borderRadius.full,
  },

  // Progress bars - סרגלי התקדמות
  progressBar: {
    track: borderRadius.full,
    fill: borderRadius.full,
  },

  // Switches & Toggles - מתגים
  switch: {
    track: borderRadius.full,
    thumb: borderRadius.full,
  },

  // Tooltips & Popovers - טיפים וחלונות קופצים
  tooltip: borderRadius.sm,
  popover: borderRadius.md,

  // Notifications - התראות
  notification: borderRadius.lg,

  // Images - תמונות
  image: {
    thumbnail: borderRadius.sm,
    preview: borderRadius.md,
    hero: borderRadius.lg,
  },
} as const;

// 🎨 Special shapes - צורות מיוחדות
export const shapes = {
  // Squircle effect - אפקט ריבוע מעוגל
  squircle: {
    small: {
      borderRadius: borderRadius.md,
      // iOS-style smooth corners
      borderCurve: "continuous" as const,
    },
    medium: {
      borderRadius: borderRadius.lg,
      borderCurve: "continuous" as const,
    },
    large: {
      borderRadius: borderRadius.xl,
      borderCurve: "continuous" as const,
    },
  },

  // Stadium shape - צורת אצטדיון
  stadium: {
    borderRadius: borderRadius.full,
    minHeight: 40,
  },

  // Teardrop - טיפה
  teardrop: {
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.sm,
  },

  // Speech bubble - בועת דיבור
  speechBubble: {
    borderRadius: borderRadius.lg,
    borderBottomLeftRadius: borderRadius.xs,
  },
} as const;

// 🔄 Dynamic corner combinations - שילובי פינות דינמיים
export const corners = {
  // Top corners only - פינות עליונות בלבד
  top: {
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  // Bottom corners only - פינות תחתונות בלבד
  bottom: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: borderRadius.lg,
    borderBottomRightRadius: borderRadius.lg,
  },

  // Left corners only - פינות שמאליות בלבד
  left: {
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: borderRadius.lg,
    borderBottomRightRadius: 0,
  },

  // Right corners only - פינות ימניות בלבד
  right: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: borderRadius.lg,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: borderRadius.lg,
  },

  // Diagonal corners - פינות אלכסוניות
  diagonal: {
    topLeftBottomRight: {
      borderTopLeftRadius: borderRadius.lg,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: borderRadius.lg,
    },
    topRightBottomLeft: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: borderRadius.lg,
      borderBottomLeftRadius: borderRadius.lg,
      borderBottomRightRadius: 0,
    },
  },
} as const;

// 🛠️ Helper functions - פונקציות עזר

// Create custom radius - יצירת רדיוס מותאם
export const createRadius = (
  topLeft: number,
  topRight?: number,
  bottomRight?: number,
  bottomLeft?: number
) => ({
  borderTopLeftRadius: topLeft,
  borderTopRightRadius: topRight ?? topLeft,
  borderBottomRightRadius: bottomRight ?? topRight ?? topLeft,
  borderBottomLeftRadius: bottomLeft ?? bottomRight ?? topRight ?? topLeft,
});

// Create smooth iOS-style radius - יצירת רדיוס חלק בסגנון iOS
export const createSmoothRadius = (radius: keyof typeof borderRadius) => ({
  borderRadius: borderRadius[radius],
  borderCurve: "continuous" as const,
});

// Create pill shape - יצירת צורת כדור
export const createPillShape = (height: number) => ({
  borderRadius: height / 2,
  height,
  paddingHorizontal: height / 2,
});

// Create stadium shape - יצירת צורת אצטדיון
export const createStadiumShape = (height: number, width: number) => ({
  borderRadius: Math.min(height, width) / 2,
  height,
  width,
});

// Get responsive radius - קבלת רדיוס רספונסיבי
export const getResponsiveRadius = (
  baseRadius: keyof typeof borderRadius,
  screenWidth: number
): number => {
  const base = borderRadius[baseRadius];

  if (screenWidth < 350) {
    return Math.max(base * 0.8, 2); // Don't go below 2px
  } else if (screenWidth > 400) {
    return base * 1.1;
  }

  return base;
};

// 🎯 Common use cases - מקרי שימוש נפוצים
export const commonShapes = {
  // Card with top image - כרטיס עם תמונה למעלה
  cardWithImage: {
    image: corners.top,
    container: componentRadius.card.medium,
  },

  // Floating action button - כפתור פעולה צף
  fab: {
    borderRadius: borderRadius.full,
    width: 56,
    height: 56,
  },

  // Chip / Tag - שבב / תג
  chip: {
    borderRadius: borderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 28,
  },

  // Search bar - שורת חיפוש
  searchBar: {
    borderRadius: borderRadius.full,
    height: 44,
    paddingHorizontal: 20,
  },
} as const;

// 🔧 Type exports - ייצוא טיפוסים
export type BorderRadiusKeys = keyof typeof borderRadius;
export type ComponentRadiusKeys = keyof typeof componentRadius;
export type ShapeKeys = keyof typeof shapes;
export type CornerKeys = keyof typeof corners;
