/**
 * @file app/index.tsx
 * @description נקודת כניסה ראשית לאפליקציה
 * @author GYMoveo Development
 * @version 1.0.0
 */

import { Redirect } from "expo-router";

export default function Index() {
  // מפנה למסך Welcome כברירת מחדל
  return <Redirect href="/(auth)/welcome" />;
}
