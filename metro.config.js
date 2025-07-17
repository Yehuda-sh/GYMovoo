const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Fix for React Native Screens animation issue
config.resolver.resolverMainFields = ["react-native", "browser", "main"];

// Ensure proper module resolution
config.resolver.sourceExts = [...config.resolver.sourceExts, "cjs"];

// Clear cache on startup
config.resetCache = true;

module.exports = config;
