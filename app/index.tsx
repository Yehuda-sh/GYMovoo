import { Redirect } from "expo-router";

export default function Index() {
  // בינתיים מפנה ישירות ל-welcome
  // בעתיד נבדוק אם המשתמש מחובר
  return <Redirect href="/(auth)/welcome" />;
}
