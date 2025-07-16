/**
 * 📁 Path: /constants/demoUsers.ts
 * 📝 Description: משתמשי דמו להדגמה - Demo users for demonstration
 * 📅 Last Modified: 2024-01-XX 14:30
 *
 * 🔗 Dependencies: None
 *
 * ⚠️ Note: These users are for demo/dev mode only!
 */

// 🧑‍💻 Demo user interface - ממשק משתמש דמו
export interface DemoUser {
  email: string;
  password: string;
  name: string;
  avatar: string;
  level: "beginner" | "intermediate" | "advanced";
  stats: {
    workoutsCompleted: number;
    totalMinutes: number;
    currentStreak: number;
    personalBests: {
      benchPress?: number;
      squat?: number;
      deadlift?: number;
    };
  };
}

// 👥 Demo users array - מערך משתמשי דמו
export const DEMO_USERS: DemoUser[] = [
  {
    email: "beginner@demo.com",
    password: "demo123",
    name: "דני המתחיל",
    avatar: "🏃‍♂️",
    level: "beginner",
    stats: {
      workoutsCompleted: 5,
      totalMinutes: 150,
      currentStreak: 2,
      personalBests: {
        benchPress: 40,
        squat: 60,
        deadlift: 70,
      },
    },
  },
  {
    email: "intermediate@demo.com",
    password: "demo123",
    name: "שרה הממוצעת",
    avatar: "💪",
    level: "intermediate",
    stats: {
      workoutsCompleted: 48,
      totalMinutes: 2160,
      currentStreak: 12,
      personalBests: {
        benchPress: 65,
        squat: 90,
        deadlift: 110,
      },
    },
  },
  {
    email: "advanced@demo.com",
    password: "demo123",
    name: "אלון המתקדם",
    avatar: "🏋️‍♂️",
    level: "advanced",
    stats: {
      workoutsCompleted: 156,
      totalMinutes: 9360,
      currentStreak: 45,
      personalBests: {
        benchPress: 120,
        squat: 160,
        deadlift: 200,
      },
    },
  },
];

// 🎯 Quick access by level - גישה מהירה לפי רמה
export const DEMO_USERS_BY_LEVEL = {
  beginner: DEMO_USERS[0],
  intermediate: DEMO_USERS[1],
  advanced: DEMO_USERS[2],
} as const;

// 🔑 Dev mode credentials - פרטי כניסה למצב פיתוח
export const DEV_MODE_CONFIG = {
  // מספר לחיצות לפתיחת מצב פיתוח - Number of taps to open dev mode
  ACTIVATION_TAPS: 3,

  // זמן מקסימלי בין לחיצות במילישניות - Max time between taps in milliseconds
  TAP_TIMEOUT: 500,

  // הודעת הצלחה - Success message
  SUCCESS_MESSAGE: "🚀 מצב פיתוח הופעל! Dev mode activated!",

  // צבע רקע למצב פיתוח - Dev mode background color
  DEV_MODE_COLOR: "#ff6b6b20",
} as const;

// 📊 Demo workout templates - תבניות אימון לדוגמה
export const DEMO_WORKOUT_TEMPLATES = {
  beginner: {
    name: "אימון מתחילים - Full Body",
    duration: 30,
    exercises: ["Squats", "Push-ups", "Plank"],
  },
  intermediate: {
    name: "אימון ביניים - Upper/Lower",
    duration: 45,
    exercises: ["Bench Press", "Deadlift", "Pull-ups", "Leg Press"],
  },
  advanced: {
    name: "אימון מתקדמים - PPL Split",
    duration: 60,
    exercises: [
      "Heavy Squats",
      "Romanian Deadlift",
      "Overhead Press",
      "Barbell Row",
    ],
  },
} as const;

// 🏆 Achievement milestones - אבני דרך להישגים
export const DEMO_ACHIEVEMENTS = {
  FIRST_WORKOUT: {
    id: "first_workout",
    name: "צעד ראשון",
    description: "השלמת את האימון הראשון שלך!",
    icon: "🎯",
  },
  WEEK_STREAK: {
    id: "week_streak",
    name: "שבוע רצוף",
    description: "7 ימים של אימונים רצופים",
    icon: "🔥",
  },
  PERSONAL_BEST: {
    id: "personal_best",
    name: "שיא אישי",
    description: "שברת שיא אישי באחד התרגילים",
    icon: "🏆",
  },
} as const;
