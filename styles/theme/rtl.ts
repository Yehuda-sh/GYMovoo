/**
 * @file styles/theme/rtl.ts
 * @description תמיכה בעברית וכיוון RTL
 * @author GYMoveo Development
 * @version 1.1.0
 *
 * @notes
 * - סגנונות RTL לכל הקומפוננטות
 * - פונקציות עזר ל-RTL
 * - תמיכה מלאה בעברית
 * - הוספת rtlHelpers export
 *
 * @changelog
 * - v1.1.0: Added rtlHelpers export and missing functions
 * - v1.0.0: Initial creation
 */

import { I18nManager, Platform, TextStyle, ViewStyle } from "react-native";
import { spacing } from "./spacing";

// ===== 🌍 בדיקת כיוון ושפה =====
export const isRTL = I18nManager.isRTL;
export const isHebrew = true; // ברירת מחדל לאפליקציה בעברית

// ===== 📐 סגנונות RTL בסיסיים =====
export const rtlStyles = {
  // כיוון טקסט
  text: {
    textAlign: isRTL ? "right" : "left",
    writingDirection: isRTL ? "rtl" : "ltr",
  } as TextStyle,

  textCenter: {
    textAlign: "center",
  } as TextStyle,

  // פריסה
  row: {
    flexDirection: isRTL ? "row-reverse" : "row",
  } as ViewStyle,

  rowReverse: {
    flexDirection: isRTL ? "row" : "row-reverse",
  } as ViewStyle,

  column: {
    flexDirection: "column",
  } as ViewStyle,

  // יישור
  alignStart: {
    alignItems: isRTL ? "flex-end" : "flex-start",
  } as ViewStyle,

  alignEnd: {
    alignItems: isRTL ? "flex-start" : "flex-end",
  } as ViewStyle,

  justifyStart: {
    justifyContent: isRTL ? "flex-end" : "flex-start",
  } as ViewStyle,

  justifyEnd: {
    justifyContent: isRTL ? "flex-start" : "flex-end",
  } as ViewStyle,

  // מיקום מוחלט
  absoluteStart: {
    position: "absolute" as const,
    [isRTL ? "right" : "left"]: 0,
  } as ViewStyle,

  absoluteEnd: {
    position: "absolute" as const,
    [isRTL ? "left" : "right"]: 0,
  } as ViewStyle,

  // scroll view
  scroll: {
    // אין שינוי מיוחד נדרש
  } as ViewStyle,
};

// ===== 🔧 פונקציות עזר RTL =====

/**
 * מרווח דינמי לפי כיוון
 */
export const rtlSpacing = {
  marginStart: (value: number): ViewStyle => ({
    [isRTL ? "marginRight" : "marginLeft"]: value,
  }),

  marginEnd: (value: number): ViewStyle => ({
    [isRTL ? "marginLeft" : "marginRight"]: value,
  }),

  paddingStart: (value: number): ViewStyle => ({
    [isRTL ? "paddingRight" : "paddingLeft"]: value,
  }),

  paddingEnd: (value: number): ViewStyle => ({
    [isRTL ? "paddingLeft" : "paddingRight"]: value,
  }),

  start: (value: number): ViewStyle => ({
    [isRTL ? "right" : "left"]: value,
  }),

  end: (value: number): ViewStyle => ({
    [isRTL ? "left" : "right"]: value,
  }),
};

/**
 * טרנספורמציות RTL-safe
 */
export const rtlTransform = {
  translateX: (value: number) => ({
    translateX: isRTL ? -value : value,
  }),

  scaleX: (value: number) => ({
    scaleX: isRTL ? -value : value,
  }),

  rotateY: (value: string) => ({
    rotateY: isRTL ? `-${value}` : value,
  }),
};

/**
 * אייקונים עם כיוון נכון
 */
export const rtlIcon = {
  flip: {
    transform: [{ scaleX: isRTL ? -1 : 1 }],
  } as ViewStyle,

  // אייקונים שלא צריכים היפוך
  noFlip: {} as ViewStyle,
};

// ===== 🛠️ הלפרים נוספים =====
export const rtlHelpers = {
  /**
   * מחזיר שם אייקון מותאם לכיוון
   */
  flipIcon: (iconName: string): string => {
    const iconMap: { [key: string]: string } = {
      "chevron-forward": isRTL ? "chevron-back" : "chevron-forward",
      "chevron-back": isRTL ? "chevron-forward" : "chevron-back",
      "arrow-forward": isRTL ? "arrow-back" : "arrow-forward",
      "arrow-back": isRTL ? "arrow-forward" : "arrow-back",
    };
    return iconMap[iconName] || iconName;
  },

  /**
   * מחזיר ערך מותאם לכיוון
   */
  directionValue: <T>(ltrValue: T, rtlValue: T): T => {
    return isRTL ? rtlValue : ltrValue;
  },

  /**
   * מחזיר margin/padding לפי כיוון
   */
  marginHorizontal: (start: number, end: number): ViewStyle => ({
    [isRTL ? "marginRight" : "marginLeft"]: start,
    [isRTL ? "marginLeft" : "marginRight"]: end,
  }),

  paddingHorizontal: (start: number, end: number): ViewStyle => ({
    [isRTL ? "paddingRight" : "paddingLeft"]: start,
    [isRTL ? "paddingLeft" : "paddingRight"]: end,
  }),
};

// ===== 📱 סגנונות לקומפוננטות נפוצות =====
export const rtlComponents = {
  // כפתור עם אייקון
  buttonWithIcon: {
    container: {
      ...rtlStyles.row,
      alignItems: "center",
      justifyContent: "center",
    } as ViewStyle,
    icon: {
      ...rtlSpacing.marginEnd(spacing.sm),
    } as ViewStyle,
  },

  // רשימה
  listItem: {
    container: {
      ...rtlStyles.row,
      alignItems: "center",
      paddingVertical: spacing.md,
    } as ViewStyle,
    content: {
      flex: 1,
      ...rtlSpacing.marginStart(spacing.md),
    } as ViewStyle,
    arrow: {
      ...rtlIcon.flip,
    } as ViewStyle,
  },

  // קלט עם תווית
  inputWithLabel: {
    label: {
      ...rtlStyles.text,
      marginBottom: spacing.xs,
    } as TextStyle,
    input: {
      ...rtlStyles.text,
      textAlign: isRTL ? "right" : "left",
    } as TextStyle,
  },

  // כרטיס עם אייקון
  cardWithIcon: {
    container: {
      ...rtlStyles.row,
    } as ViewStyle,
    iconContainer: {
      ...rtlSpacing.marginEnd(spacing.lg),
    } as ViewStyle,
    content: {
      flex: 1,
      ...rtlStyles.alignStart,
    } as ViewStyle,
  },
};

// ===== 🛡️ פונקציות בטיחות RTL =====

/**
 * מוודא ערך בטוח ל-RTL
 */
export const rtlSafe = {
  // מספרים - תמיד LTR
  number: (text: string | number): TextStyle => ({
    ...Platform.select({
      ios: { textAlign: "left" as const },
      android: {}, // אנדרואיד מטפל בזה אוטומטית
    }),
  }),

  // כתובות URL - תמיד LTR
  url: (): TextStyle => ({
    textAlign: "left" as const,
    writingDirection: "ltr" as const,
  }),

  // קוד - תמיד LTR
  code: (): TextStyle => ({
    textAlign: "left" as const,
    writingDirection: "ltr" as const,
    fontFamily: Platform.select({
      ios: "Menlo",
      android: "monospace",
    }),
  }),
};

// ===== 🌐 תרגומים ומחרוזות =====
export const rtlStrings = {
  // פורמט תאריך עברי
  formatDate: (date: Date): string => {
    return new Intl.DateTimeFormat("he-IL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  },

  // פורמט מספר עברי
  formatNumber: (num: number): string => {
    return new Intl.NumberFormat("he-IL").format(num);
  },

  // פורמט אחוזים
  formatPercent: (num: number): string => {
    return new Intl.NumberFormat("he-IL", {
      style: "percent",
    }).format(num / 100);
  },
};

// ===== 🔄 הלפרים לאנימציות RTL =====
export const rtlAnimation = {
  // אנימציית כניסה מהצד
  slideIn: {
    from: {
      translateX: isRTL ? -300 : 300,
      opacity: 0,
    },
    to: {
      translateX: 0,
      opacity: 1,
    },
  },

  // אנימציית יציאה לצד
  slideOut: {
    from: {
      translateX: 0,
      opacity: 1,
    },
    to: {
      translateX: isRTL ? 300 : -300,
      opacity: 0,
    },
  },
};

// ===== 🎯 ייצוא ראשי =====
export const rtl = {
  isRTL,
  isHebrew,
  styles: rtlStyles,
  spacing: rtlSpacing,
  transform: rtlTransform,
  icon: rtlIcon,
  components: rtlComponents,
  safe: rtlSafe,
  strings: rtlStrings,
  animation: rtlAnimation,
  helpers: rtlHelpers,
};

// ייצוא ברירת מחדל
export default rtl;

// ===== 🛠️ הלפרים נוספים =====

/**
 * יצירת סגנון מותאם RTL
 */
export function createRTLStyle<T extends ViewStyle | TextStyle>(
  ltrStyle: T,
  rtlStyle: T
): T {
  return isRTL ? rtlStyle : ltrStyle;
}

/**
 * המרת margin/padding ל-RTL
 */
export function convertToRTL(style: ViewStyle): ViewStyle {
  const rtlStyle = { ...style };

  // החלפת left/right
  if ("marginLeft" in rtlStyle || "marginRight" in rtlStyle) {
    const temp = rtlStyle.marginLeft;
    rtlStyle.marginLeft = rtlStyle.marginRight;
    rtlStyle.marginRight = temp;
  }

  if ("paddingLeft" in rtlStyle || "paddingRight" in rtlStyle) {
    const temp = rtlStyle.paddingLeft;
    rtlStyle.paddingLeft = rtlStyle.paddingRight;
    rtlStyle.paddingRight = temp;
  }

  if ("left" in rtlStyle || "right" in rtlStyle) {
    const temp = rtlStyle.left;
    rtlStyle.left = rtlStyle.right;
    rtlStyle.right = temp;
  }

  // היפוך flexDirection
  if (rtlStyle.flexDirection === "row") {
    rtlStyle.flexDirection = "row-reverse";
  } else if (rtlStyle.flexDirection === "row-reverse") {
    rtlStyle.flexDirection = "row";
  }

  return rtlStyle;
}
