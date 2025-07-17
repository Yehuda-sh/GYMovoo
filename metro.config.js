const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Fix for React Native Screens animation issue
config.resolver.resolverMainFields = ["react-native", "browser", "main"];

module.exports = config;
