import { colors, fontSizes, fontWeights } from "@/styles/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function WorkoutsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>מסך אימונים</Text>
      <Text style={styles.subtitle}>בקרוב...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark[900],
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
    color: colors.light[50],
    marginBottom: 8,
  },
  subtitle: {
    fontSize: fontSizes.md,
    color: colors.light[400],
  },
});
