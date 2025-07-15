// app/welcome/components/WelcomeHeader.tsx
/**
 * קומפוננטת Header למסך Welcome (כולל טייטל, סלוגן ולוגו)
 */
import { Image, Text, View } from "react-native";
import styles from "../styles";

export default function WelcomeHeader() {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        accessibilityLabel="Gymovo Logo"
      />
      <Text style={styles.title}>ברוך הבא ל־Gymovo!</Text>
      <Text style={styles.subtitle}>
        אפליקציית הכושר שתיקח אותך צעד-אחר-צעד להצלחה אישית.
      </Text>
    </View>
  );
}
