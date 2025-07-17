/**
 * @file screens/welcome/WelcomeScreen.tsx
 * @description מסך Welcome זמני לבדיקה
 * @author GYMoveo Development
 * @version 1.0.0-temp
 */

import { colors } from "@/styles/theme/colors";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GYMovoo</Text>
      <Text style={styles.subtitle}>ברוכים הבאים!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.buttonText}>המשך כאורח</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark[900],
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: colors.primary[600],
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: colors.text.secondary,
    marginBottom: 40,
  },
  button: {
    backgroundColor: colors.primary[600],
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: "600",
  },
});
