import { useUserStore } from "@/lib/stores/userStore";
import { colors } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";

export default function TabsLayout() {
  const router = useRouter();
  const segments = useSegments();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  useEffect(() => {
    // Redirect to welcome if not authenticated
    if (!isAuthenticated && segments[0] === "(tabs)") {
      router.replace("/welcome");
    }
  }, [isAuthenticated, segments]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.dark[800],
          borderTopColor: colors.dark[700],
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.dark[400],
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "בית",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: "אימונים",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="barbell" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "התקדמות",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trending-up" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "פרופיל",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
