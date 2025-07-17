import { useUserStore } from "@/lib/stores/userStore";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: "#0a0a0a" }}>
        <StatusBar style="light" />
        <Slot />
      </View>
    </SafeAreaProvider>
  );
}
