/**
 * app/_layout.tsx
 * קובץ Layout ראשי ל־Expo Router Stack
 * אחראי על מבנה הניווט הראשי של האפליקציה.
 */

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { I18nManager } from "react-native";

// מאפשר RTL לעברית
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

// מונע מהSplashScreen להיעלם אוטומטית
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // טוען פונטים (אם תרצה להוסיף בעתיד)
  const [fontsLoaded] = useFonts({
    // 'Heebo-Regular': require('../assets/fonts/Heebo-Regular.ttf'),
    // 'Heebo-Bold': require('../assets/fonts/Heebo-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      // מסתיר את הSplashScreen כשהכל מוכן
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false, // מסתיר את הHeader בכל המסכים
          animation: "slide_from_right", // אנימציית מעבר
          contentStyle: {
            backgroundColor: "#0f0c29", // רקע כהה לכל המסכים
          },
        }}
      >
        {/* אפשר להוסיף הגדרות ספציפיות למסכים */}
        <Stack.Screen
          name="index"
          options={{
            // מסך הWelcome לא צריך אנימציה
            animation: "none",
          }}
        />
        <Stack.Screen
          name="login/index"
          options={{
            title: "התחברות",
            headerShown: true, // אם תרצה להציג header במסך זה
            headerStyle: {
              backgroundColor: "#0f0c29",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="signup/index"
          options={{
            title: "הרשמה",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#0f0c29",
            },
            headerTintColor: "#fff",
          }}
        />
      </Stack>
    </>
  );
}
