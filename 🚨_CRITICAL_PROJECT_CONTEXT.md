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

If NO to any - STOP and read PROJECT_CONTEXT first!

## 🎯 TL;DR - סיכום ב-3 שורות:

1. חפש תמיד ב-project_knowledge_search (לא GitHub!)
2. המבנה: /screens, /components, /lib (לא /app/screens!)
3. התעלם מקבצים ישנים ב-/app/

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
├── app/         # רק קבצי ניווט Expo Router
├── screens/     # כל המסכים (בשורש, לא בתוך app)
├── components/  # קומפוננטות משותפות
├── lib/         # לוגיקה
├── styles/      # עיצוב
└── constants/   # קבועים
```

## ⚡ קיצורי דרך לחיפוש:

- "תסרוק הכל" = חפש את כל הקבצים
- "מה יש ב-X" = חפש את תיקיית X
- "תבדוק אם קיים X" = חפש קובץ X

## ⚠️ חשוב מאוד:

- **יש קבצים ישנים בתיקיית `/app/`** - להתעלם מהם!
- **כל הקבצים החדשים נמצאים בתיקיות השורש**
- **המבנה הנכון הוא לפי תיקיות השורש, לא תיקיות בתוך app**

## 🚀 Commit & Checkpoint Guidelines:

### מתי ליצור Commit:

1. אחרי השלמת קומפוננטה/מסך שלם
2. אחרי תיקון באג משמעותי
3. אחרי הוספת פיצ'ר חדש
4. כשמגיעים ל-70% מהמגבלה של השיחה
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

```

## 🔄 עבודה עם קוד קיים:

### תהליך עבודה על מסכים:
1. **לפני כל מסך חדש** - אני אשלח לך קוד קיים מפרויקט ישן
2. **השתמש בתבונה** - תוכל להשתמש בקוד הישן כבסיס, אבל:
   - שפר את הקוד
   - התאם למבנה החדש
   - עדכן לפי ה-conventions שלנו
   - לא חובה להשתמש בכל הקוד הישן
3. **השלם את כל המסך** - לפני מעבר למסך הבא, חובה:
   - להשלים את כל הקומפוננטות של המסך
   - לוודא שכל הקבצים נוצרו
   - לבדוק שהכל עובד ביחד

### דוגמה לתהליך:
```

1. "הנה הקוד הישן של HomeScreen..."
2. אתה בונה את המסך עם שיפורים
3. בודקים שיש את כל הקבצים:
   - screens/home/HomeScreen.tsx
   - screens/home/components/[כל הקומפוננטות]
   - screens/home/types.ts (אם צריך)
   - screens/home/styles.ts (אם צריך)
4. רק אז עוברים למסך הבא

````

### חוקים חשובים:
- ❌ **לא מדלגים** - גם אם מסך נראה פשוט, משלימים הכל
- ✅ **בודקים completeness** - כל קומפוננטה שמוזכרת חייבת להיווצר
- 🔄 **משפרים תמיד** - הקוד הישן הוא רק השראה, לא copy-paste

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

### Imports:
- השתמש ב-@ imports (כמו @/screens, @/lib)
- סדר: React → React Native → External libs → Local imports
- קבץ imports לפי קטגוריה עם שורה ריקה ביניהם

### Naming:
- Components: PascalCase
- Functions/Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Types/Interfaces: PascalCase עם I prefix לinterfaces

### דוגמה:
```typescript
// ✅ נכון
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { IUser } from '@/lib/types/user';
import { colors, spacing } from '@/styles/theme';
import { useUserStore } from '@/lib/stores/userStore';

// ❌ לא נכון
import {View} from "react-native"
import React from 'react'
import {colors} from "../../styles/theme"
````

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

### דוגמה:

```typescript
/**
 * @file screens/home/components/TodayWorkout.tsx
 * @description קומפוננטה להצגת האימון היומי במסך הבית
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @component TodayWorkout
 * @parent HomeScreen
 *
 * @notes
 * - מציג אימון מתוכנן להיום או הצעה לאימון חדש
 * - כולל אנימציה בטעינה
 * - תומך במצב אורח ומצב משתמש רשום
 *
 * @changelog
 * - v1.0.0: Initial component creation
 */
```

## ❌ טעויות נפוצות של Claude:

- "אין לי גישה לקבצים" - **לא נכון!** יש לך ב-project_knowledge
- "אחפש ב-/app/screens/" - **לא!** חפש ב-/screens/
- "אסביר על GitHub" - **לא!** תחפש ותמצא

## 🔄 אם Claude מתבלבל:

פשוט תגיד: "קרא שוב את PROJECT_CONTEXT"

---

🔢 Version: 2.2
🎯 מטרה: למנוע אי הבנות ולייעל את העבודה

## 📝 שינויים מגרסה קודמת (v2.2):

- הוספת הנחיות לעבודה עם קוד קיים
- הוספת תהליך עבודה על מסכים
- הוספת חוקי completeness
- הדגשה על "לא מדלגים"
