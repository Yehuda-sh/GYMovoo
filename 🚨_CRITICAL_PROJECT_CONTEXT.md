```markdown
# 🚨 CLAUDE - READ THIS FIRST BEFORE ANYTHING ELSE! 🚨

IF YOU DON'T READ THIS FIRST, YOU WILL:

- Search in wrong places
- Use wrong folder structure
- Waste time and messages

## ✅ CLAUDE_CHECKLIST

Before starting ANY work:

1. [ ] Did you read PROJECT_CONTEXT?
2. [ ] Do you know the folder structure?
3. [ ] Do you know how to search? (project_knowledge_search)
4. [ ] Do you understand the theme system?
5. [ ] Do you know the coding patterns?

If NO to any - STOP and read PROJECT_CONTEXT first!

## 🎯 TL;DR - סיכום ב-4 שורות:

1. חפש תמיד ב-project_knowledge_search (לא GitHub!)
2. המבנה: /screens, /components, /lib, /styles/theme (לא /app/screens!)
3. השתמש ב-unifiedDesignSystem וב-RTL support
4. עקוב אחרי הפטרנים: Singleton Services, Type Guards, Error Handling

---

# 🤖 PROJECT_CONTEXT - הסבר לClaude

## 📥 מקור הקבצים וזרימת העבודה:
```

1. אני מעלה קבצים מ-GitHub → Project Knowledge
2. אתה מחפש אותם ב-project_knowledge_search
3. אנחנו עובדים על הקוד ביחד
4. אתה יוצר commits + checkpoints
5. אני מעתיק חזרה ל-VS Code ומעדכן GitHub
6. אני מרענן את Project Knowledge
7. ממשיכים מה-checkpoint הבא

```

## 📌 חשוב להבין:

### כשאני אומר "תסרוק את הריפו" או "תסרוק את הפרויקט":

```

❌ לא מתכוון ל: GitHub/GitLab או כל ריפו חיצוני
✅ מתכוון ל: הקבצים שהעליתי לProject Knowledge שלך

```

### הפקודות שלי:

- **"תסרוק את הפרויקט"** = חפש בproject_knowledge_search
- **"תסרוק את הריפו"** = חפש בproject_knowledge_search
- **"תבדוק מה יש בפרויקט"** = חפש בproject_knowledge_search
- **"חפש בקבצים"** = חפש בproject_knowledge_search

### דוגמאות:

```

// כשאני אומר:
"תסרוק את app/home.tsx בפרויקט"

// אתה צריך להריץ:
project_knowledge_search("app/home.tsx")

```

## 🎯 זכור:

1. **כל הקבצים שלי נמצאים ב-Project Knowledge**
2. **תמיד תחפש שם קודם**
3. **אין צורך להסביר שאין לך גישה לGitHub**
4. **פשוט תחפש ותמצא!**

## 📁 מבנה הפרויקט שלנו:

```

GYMovoo/ (השם האמיתי של הפרויקט)
├── app/ # רק קבצי ניווט Expo Router
├── screens/ # כל המסכים (בשורש, לא בתוך app)
│ └── [screen]/
│ ├── components/ # קומפוננטות של המסך
│ ├── hooks/ # hooks ייעודיים למסך
│ └── types.ts # types של המסך
├── components/ # קומפוננטות משותפות
│ ├── common/ # Button, Card, Input, etc.
│ ├── cards/ # workout-card ועוד
│ ├── layouts/ # ScreenLayout, CardLayout
│ └── ui/ # Badge, IconButton, etc.
├── lib/ # לוגיקה
│ ├── stores/ # zustand stores
│ ├── data/ # storage functions
│ └── types/ # TypeScript types
├── styles/ # עיצוב
│ └── theme/ # מערכת העיצוב המאוחדת
├── services/ # שירותים (API, Analytics, etc.)
├── constants/ # קבועים
└── assets/ # תמונות ופונטים

````

## 🎨 Design System & Theme:

### מערכות העיצוב שלנו:

1. **unifiedDesignSystem** - המערכת הראשית לכל האפליקציה
   - צבעים, רווחים, טיפוגרפיה, צללים
   - סגנונות מוכנים לכפתורים, כרטיסים, מודאלים

2. **authTheme** - מערכת ייעודית למסכי Auth
   - גרדיאנטים מיוחדים
   - אנימציות כניסה

3. **RTL Support** - תמיכה מלאה בעברית
   - rtlStyles, rtlSafe, rtlHelpers
   - תמיד השתמש בהם!

### דוגמת שימוש:


```typescript
import { unifiedColors, unifiedSpacing } from "@/styles/theme/unifiedDesignSystem";
import { rtlStyles, rtlSafe } from "@/styles/theme/rtl";

// בקומפוננטה
<View style={[rtlStyles.row, { padding: unifiedSpacing.md }]}>
  <Text style={[rtlStyles.text, { color: unifiedColors.text }]}>
    טקסט בעברית
  </Text>
</View>
````

## 💡 Coding Patterns חשובים:

### 1. Singleton Services:

```typescript
class MyService {
  private static instance: MyService;

  static getInstance(): MyService {
    if (!MyService.instance) {
      MyService.instance = new MyService();
    }
    return MyService.instance;
  }
}

export const myService = MyService.getInstance();
```

### 2. Type Guards:

```typescript
// תמיד צור type guards
export const isPlanDay = (item: PlanDay | Workout): item is PlanDay => {
  return "exercises" in item && !("date" in item);
};
```

### 3. Fallback Data:

```typescript
// תמיד ספק נתוני גיבוי
try {
  const data = await fetchFromAPI();
  return data;
} catch (error) {
  console.error("Failed to fetch:", error);
  return getFallbackData(); // תמיד!
}
```

### 4. Demo User Support:

```typescript
// בדוק אם משתמש דמו
if (isDemoUser(userId)) {
  return getDemoData(userId);
}
// אחרת טען נתונים אמיתיים
```

### 5. Comprehensive Error Handling:

```typescript
// תמיד עטוף ב-try/catch
try {
  // קוד
} catch (error) {
  console.error("Context-specific error message:", error);
  // החזר ערך ברירת מחדל או טפל בשגיאה
}
```

## ⚡ קיצורי דרך לחיפוש:

- "תסרוק הכל" = חפש את כל הקבצים
- "מה יש ב-X" = חפש את תיקיית X
- "תבדוק אם קיים X" = חפש קובץ X

## ⚠️ חשוב מאוד:

- **יש קבצים ישנים בתיקיית `/app/`** - להתעלם מהם!
- **כל הקבצים החדשים נמצאים בתיקיות השורש**
- **המבנה הנכון הוא לפי תיקיות השורש, לא תיקיות בתוך app**
- **תמיד השתמש ב-unifiedDesignSystem לעיצוב**
- **תמיד הוסף RTL support לקומפוננטות חדשות**

## 🚀 Commit & Checkpoint Guidelines:

### מתי ליצור Commit:

1. אחרי השלמת קומפוננטה/מסך שלם
2. אחרי תיקון באג משמעותי
3. אחרי הוספת פיצ'ר חדש
4. כשמגיעים ל-50% מהמגבלה של השיחה (עדכון!)
5. לפני שינוי גדול במבנה

### מה לכלול ב-Checkpoint:

````markdown
🔄 Checkpoint #XXX
📅 Date: [תאריך]
💬 Message Number: ~XX/100
🎯 Current Task: [מה עשינו]
📝 Last Commit: "[commit message]"

✅ Completed:

- [רשימת מה הושלם]

🔧 In Progress:

- [מה באמצע]

❌ Still Missing:

- [מה עוד חסר]

💡 Next Steps:

- [מה לעשות בשיחה הבאה]

🚀 Git Command:

```bash
git add .
git commit -m "[commit message]"
git push
```
````

## 🔄 עבודה עם קוד קיים:

### תהליך עבודה על מסכים:

1. **לפני כל מסך חדש** - אני אשלח לך קוד קיים מפרויקט ישן
2. **השתמש בתבונה** - תוכל להשתמש בקוד הישן כבסיס, אבל:
   - שפר את הקוד
   - התאם למבנה החדש
   - עדכן לפי ה-conventions שלנו
   - הוסף RTL support
   - השתמש ב-unifiedDesignSystem
   - לא חובה להשתמש בכל הקוד הישן
3. **השלם את כל המסך** - לפני מעבר למסך הבא, חובה:
   - להשלים את כל הקומפוננטות של המסך
   - לוודא שכל הקבצים נוצרו
   - לבדוק שהכל עובד ביחד
   - לוודא RTL support מלא

### דוגמה לתהליך:

```
1. "הנה הקוד הישן של HomeScreen..."
2. אתה בונה את המסך עם שיפורים
3. בודקים שיש את כל הקבצים:
   - screens/home/HomeScreen.tsx
   - screens/home/components/[כל הקומפוננטות]
   - screens/home/types.ts (אם צריך)
   - screens/home/hooks/ (אם יש hooks)
4. רק אז עוברים למסך הבא
```

### חוקים חשובים:

- ❌ **לא מדלגים** - גם אם מסך נראה פשוט, משלימים הכל
- ✅ **בודקים completeness** - כל קומפוננטה שמוזכרת חייבת להיווצר
- 🔄 **משפרים תמיד** - הקוד הישן הוא רק השראה, לא copy-paste
- 🎨 **עיצוב אחיד** - תמיד unifiedDesignSystem
- 🌍 **RTL תמיד** - כל קומפוננטה חייבת לתמוך בעברית

## 💻 Code Style Guidelines:

### שפה:

- **קוד**: אנגלית (משתנים, פונקציות, types)
- **הערות בקוד**: עברית
- **UI טקסטים**: עברית
- **Commit messages**: אנגלית

### TypeScript:

- תמיד הגדר types/interfaces
- העדף interfaces על type aliases
- אל תשתמש ב-any - השתמש ב-unknown אם חייב
- תמיד צור Type Guards לבדיקות טיפוסים

### Imports:

- השתמש ב-@ imports (כמו @/screens, @/lib)
- סדר: React → React Native → External libs → Local imports
- קבץ imports לפי קטגוריה עם שורה ריקה ביניהם

### Naming:

- Components: PascalCase
- Functions/Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Types/Interfaces: PascalCase עם I prefix לinterfaces
- Services: camelCase עם Service suffix

### דוגמה:

```typescript
// ✅ נכון
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { IUser } from "@/lib/types/user";
import {
  unifiedColors,
  unifiedSpacing,
} from "@/styles/theme/unifiedDesignSystem";
import { rtlStyles } from "@/styles/theme/rtl";
import { useUserStore } from "@/lib/stores/userStore";

// ❌ לא נכון
import { View } from "react-native";
import React from "react";
import { colors } from "../../styles/theme";
```

## 📝 File Header Convention:

כל קובץ חייב להתחיל עם Header כזה:

```typescript
/**
 * @file [נתיב הקובץ]
 * @description [תיאור קצר של הקובץ]
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @component [שם הקומפוננטה] (אם רלוונטי)
 * @parent [קומפוננטה אב] (אם רלוונטי)
 *
 * @notes
 * - [הערות חשובות]
 * - [דברים לזכור]
 *
 * @changelog
 * - v1.0.0: Initial creation
 */
```

## 🎯 Services & APIs:

### Services שקיימים:

1. **wgerApi** - לתרגילים ותוכניות
2. **workoutAnalytics** - ניתוח ביצועים
3. **plansService** - ניהול תוכניות
4. **quizProgressService** - מעקב התקדמות שאלון

### דוגמת שימוש:

```typescript
// תמיד עם try/catch ו-fallback
try {
  const exercises = await wgerApi.fetchAllExercises();
  setExercises(exercises);
} catch (error) {
  console.error("Failed to fetch exercises:", error);
  setExercises(getFallbackExercises());
}
```

## ❌ טעויות נפוצות של Claude:

- "אין לי גישה לקבצים" - **לא נכון!** יש לך ב-project_knowledge
- "אחפש ב-/app/screens/" - **לא!** חפש ב-/screens/
- "אסביר על GitHub" - **לא!** תחפש ותמצא
- "אשתמש בצבעים ישירות" - **לא!** תמיד מ-unifiedDesignSystem
- "אכתוב LTR" - **לא!** תמיד RTL support

## 🔄 אם Claude מתבלבל:

פשוט תגיד: "קרא שוב את PROJECT_CONTEXT"

---

🔢 Version: 3.0
🎯 מטרה: למנוע אי הבנות ולייעל את העבודה

## 📝 שינויים מגרסה קודמת (v3.0):

- הוספת מערכת העיצוב המאוחדת
- הוספת RTL support חובה
- הוספת Services & APIs
- הוספת Type Guards ו-Patterns
- עדכון Checkpoint ל-50% במקום 70%
- הוספת מבנה תיקיות מפורט יותר

```

העדכונים העיקריים שהוספתי:

1. **Theme System** - הדגשה על שימוש ב-unifiedDesignSystem ו-RTL
2. **Coding Patterns** - כל הפטרנים החשובים שזיהיתי
3. **Services** - רשימת השירותים הקיימים
4. **מבנה תיקיות מפורט** - כולל תתי-תיקיות
5. **דגשים נוספים** - על שימוש נכון בכל המערכות

זה יעזור לי לעבוד יותר טוב ולהימנע מטעויות!
```
