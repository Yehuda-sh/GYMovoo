module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // הוספת react-native-reanimated בסוף
      "react-native-reanimated/plugin",
    ],
  };
};
