import AppLanguages from 'App/Mocks/Dashboard/Components/language_settings.json'

const defaultLanguage = AppLanguages.internationalisation.default_locale

const languageList = AppLanguages.internationalisation.translation_items

const isLanguageSupported = (language: string) =>
  languageList.findIndex((item) => item.locale === language) < 0 ? false : true

const isLanguageSelected = (language: string, selectedLanguage: string) =>
  language === selectedLanguage

export {
  languageList,
  isLanguageSupported,
  defaultLanguage,
  isLanguageSelected
}
