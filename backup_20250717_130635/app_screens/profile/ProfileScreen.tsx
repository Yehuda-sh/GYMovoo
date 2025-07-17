/**
 * @file app/screens/profile/ProfileScreen.tsx
 * @description Placeholder for Profile Screen
 * @author GYMoveo Development
 * @version 1.0.0
 */

import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import theme from "@/styles/theme";

const { colors, spacing, fontSizes, fontWeights } = theme;

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>פרופיל</Text>
      <Text style={styles.subtitle}>בקרוב...</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>חזרה</Text>
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
    padding: spacing.xl,
  },
  title: {
    fontSize: fontSizes.xxxl,
    fontWeight: fontWeights.bold,
    color: colors.light[50],
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: fontSizes.lg,
    color: colors.light[500],
    marginBottom: spacing.xl,
  },
  backButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.primary[600],
    borderRadius: theme.borderRadius.md,
  },
  backText: {
    color: colors.light[50],
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
  },
});
