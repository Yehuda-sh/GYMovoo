import { Platform } from "react-native";

// Import the Expo Router entry
import "expo-router/entry";

// Fix for React Native Screens on Android
if (Platform.OS === "android") {
  require("react-native-screens").enableScreens(false);
}

// This is not needed if you're using Expo Router
// registerRootComponent(App);
