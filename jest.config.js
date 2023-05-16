module.exports = {
  verbose: true,
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['<rootDir>/__tests__/**/*.js', '**/?(*.)(spec|test).js?(x)'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/__tests__/Setup.js',
    '<rootDir>/__tests__/FileMock.js',
    '<rootDir>/__tests__/__mocks__',
    '<rootDir>/__tests__/App/Services/api/Requests/Dashboard/data.js',
    '<rootDir>/__tests__/App/Services/api/Requests/Billing/data.js',
    '<rootDir>/__tests__/App/APIsDataMocks',
    '<rootDir>/__tests__/App/Screens/MessageCenter/MessageCenterScreen/data.js',
    '<rootDir>/__tests__/App/Services/api/Requests/Addons/data.js'
  ],
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__tests__/FileMock.js'
  },
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/Setup'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-navigation|@vfgroup-oneplatform/foundation|@vfgroup-oneplatform/message-center|@vfgroup-oneplatform/login|@vfgroup-oneplatform/onboarding|@vfgroup-oneplatform/framework||@vfgroup-oneplatform/netperform)'
  ],
  preset: 'react-native',
  coverageReporters: ['text', 'text-summary', 'html', 'lcov', 'json-summary'],

  collectCoverageFrom: [
    '**/*.{js,jsx,tsx,ts}',
    '!**/index.js',
    '!**/*.styles.ts',
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!dangerfile.js',
    '!.eslintrc.js',
    '!.prettierrc.js',
    '!metro.config.js',
    '!App/I18n/**',
    '!App/HOCs/**',
    '!App/Themes/**',
    '!App/Containers/AppNavigation/**',
    '!e2e/**',
    '!react-native.config.js',
    '!.vscode/.react/*.{js,jsx,tsx}',
    '!App/Utils/Enums/**',
    '!App/Redux/store.js',
    '!**/*.config.js',
    '!.jso/**',
    '!App/Services/API/Requests/CMS/Config.ts',
    '!App/Services/Crashlytics/Crashlytics.ts',
    '!App/Mocks/Tray/Stubs/**',
    '!scripts/jest/changedFilesCoverage.js',
    '!scripts/cms/updateCMSPipeline.js'
  ],
  coverageThreshold: {
    global: {
      lines: 80
    }
  },
  modulePaths: ['<rootDir>']
}
