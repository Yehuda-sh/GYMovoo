/**
 * app/welcome/index.tsx
 * מסך Welcome ראשי - נקודת כניסה ראשונה לאפליקציה
 * ייבוא עיצוב בסיסי מ־app/_theme/globalStyles
 */

import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../_theme/globalStyles";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={globalStyles.container}>
      {/* לוגו ראשי */}
      <Image
        source={require("./assets/logo.png")}
        style={globalStyles.logo} 
        accessibilityLabel="Gymovo Logo"
      />

      {/* כותרת גדולה */}
      <Text style={globalStyles.title}>ברוך הבא ל־Gymovo!</Text>

      {/* תיאור קצר/סלוגן */}
      <Text style={globalStyles.subtitle}>
        אפליקציית הכושר שתיקח אותך צעד-אחר-צעד להצלחה אישית.
      </Text>

      {/* כפתור "התחל עכשיו" */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => router.push("/login")}
        accessibilityRole="button"
      >
        <Text style={globalStyles.buttonText}>התחל עכשיו</Text>
      </TouchableOpacity>

      {/* קישור להרשמה */}
      <TouchableOpacity
        style={globalStyles.secondaryButton}
        onPress={() => router.push("/signup")}
        accessibilityRole="button"
      >
        <Text style={globalStyles.secondaryButtonText}>
          אין לך חשבון? הרשמה
        </Text>
      </TouchableOpacity>
    </View>
  );
}
