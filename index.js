import { Platform } from "react-native";

// Import the Expo Router entry
import "expo-router/entry";

// Fix for React Native Screens animation issue on Android
if (Platform.OS === "android") {
  const { enableScreens } = require("react-native-screens");
  enableScreens(false);

  // Override setNativeProps to prevent _animation error
  const originalSetNativeProps = Object.getPrototypeOf(
    require("react-native").View.prototype
  ).setNativeProps;

  if (originalSetNativeProps) {
    Object.getPrototypeOf(
      require("react-native").View.prototype
    ).setNativeProps = function (props) {
      if (props && "_animation" in props) {
        const { _animation, ...cleanProps } = props;
        originalSetNativeProps.call(this, cleanProps);
      } else {
        originalSetNativeProps.call(this, props);
      }
    };
  }
}
