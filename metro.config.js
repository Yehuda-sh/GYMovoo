const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// מונע מ-Metro לטעון קבצים שאינם routes
config.resolver.blockList = [
  /\/lib\/.*/,
  /\/constants\/.*/,
  /\/styles\/.*/,
  /\/screens\/.*\/components\/.*/,
  /\/screens\/.*\/styles\/.*/,
  /\/screens\/.*\/types\/.*/,
];

module.exports = config;
