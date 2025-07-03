// const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require('nativewind/metro');
 
// const config = getDefaultConfig(__dirname)
 
// module.exports = withNativeWind(config, { input: './global.css' })

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Add resolver configuration for victory-native module resolution
config.resolver = {
  ...config.resolver,
  resolverMainFields: ['react-native', 'browser', 'main'],
  platforms: ['ios', 'android', 'native', 'web'],
};

// Add transformer configuration for victory-native
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: false,
    },
  }),
};

module.exports = withNativeWind(config, { input: './global.css' });