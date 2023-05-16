import { NativeModules, Platform } from 'react-native'

const deviceLanguageWithCountryCode =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier

const appSettingsDeviceLanguage = deviceLanguageWithCountryCode.includes('_')
  ? deviceLanguageWithCountryCode.split('_')[0]
  : undefined

const deviceLanguage = deviceLanguageWithCountryCode?.includes('de')
  ? 'de'
  : 'en'

export {
  deviceLanguage,
  appSettingsDeviceLanguage,
  deviceLanguageWithCountryCode
}
