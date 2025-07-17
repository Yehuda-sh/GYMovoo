/**
 * @file app/_layout.tsx
 * @description Root layout with route configuration
 * @author GYMoveo Development
 * @version 1.0.0
 *
 * @notes
 * - Configures which files should be ignored as routes
 * - Sets up root navigation
 *
 * @changelog
 * - v1.0.0: Initial creation
 */

import { Stack } from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)/welcome",
};

// Configure which files to ignore as routes
export const unstable_ignoreRoutes = [
  // Ignore all non-route files
  "constants/**",
  "lib/**",
  "screens/**",
  "styles/**",
  "components/**",

  // Also ignore specific files if they exist
  "constants/*",
  "lib/*",
  "screens/*",
  "styles/*",
  "components/*",
];

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen
        name="(auth)/welcome"
        options={{
          // Prevent going back to splash
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          // Hide header for tab navigator
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}
