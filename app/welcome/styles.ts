// app/welcome/styles.ts
import { I18nManager, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    direction: I18nManager.isRTL ? "rtl" : "ltr",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 12,
    writingDirection: "rtl",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 36,
    writingDirection: "rtl",
  },
  button: {
    backgroundColor: "#00d38c",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    marginBottom: 18,
    width: "100%",
    alignItems: "center",
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#222",
    fontSize: 16,
    fontWeight: "500",
  },
});
