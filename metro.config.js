/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const jsoMetroPlugin = require('obfuscator-io-metro-plugin')(
  {
    // for these option look javascript-obfuscator library options from  above url
    optionsPreset: 'default'
  },
  {
    runInDev: false /* optional */,
    logObfuscatedFiles: true /* optional generated files will be located at ./.jso */,
    sourceMapLocation:
      './index.android.bundle.map' /* optional  only works if sourceMap: true in obfuscation option */
  }
)

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true
      }
    })
  },
  ...jsoMetroPlugin
}
