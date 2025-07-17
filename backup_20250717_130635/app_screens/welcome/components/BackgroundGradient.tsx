// app/screens/welcome/components/BackgroundGradient.tsx
import { colors } from "@/app/styles/theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";

interface BackgroundGradientProps {
  visible: boolean;
}

const BackgroundGradient: React.FC<BackgroundGradientProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={StyleSheet.absoluteFillObject}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    />
  );
};

export default BackgroundGradient;
