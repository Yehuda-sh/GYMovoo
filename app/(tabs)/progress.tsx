import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/styles/theme/colors";

export default function ProgressScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>מסך התקדמות - בקרוב!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark[800],
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.text.primary,
    fontSize: 20,
  },
});
