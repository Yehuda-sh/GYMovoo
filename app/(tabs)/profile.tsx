import { colors } from "@/styles/theme/colors";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>מסך פרופיל - בקרוב!</Text>
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
