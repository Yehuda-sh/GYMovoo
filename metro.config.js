const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Fix for React Native Screens animation issue
config.resolver.resolverMainFields = ["react-native", "browser", "main"];

// Ensure proper module resolution
config.resolver.sourceExts = [...config.resolver.sourceExts, "cjs"];

// Clear cache on startup to avoid stale issues
config.resetCache = true;

// Add transformer options for better error handling
config.transformer = {
  ...config.transformer,
  minifierConfig: {
    keep_fnames: true,
    mangle: {
      keep_fnames: true,
    },
  },
};

module.exports = config;
