/**
 * @file app/+not-found.tsx
 * @description מסך 404 - נתיב לא נמצא
 * @author GYMoveo Development
 * @version 1.0.0
 */

import { Link, Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text style={styles.title}>מסך זה לא קיים.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>חזור למסך הבית!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#0a0a0a",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 16,
    color: "#34C759",
    textDecorationLine: "underline",
  },
});
