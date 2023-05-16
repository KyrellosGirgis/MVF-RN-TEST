import { ContentManager } from '@vfgroup-oneplatform/foundation'
import I18n from 'i18n-js'

import { dateCurrencyFromatter } from '@vfgroup-oneplatform/foundation/Utils/dateCurrencyFormate'

import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

import { emitEvent } from 'App/Services/AppEventEmitter/AppEventEmitter'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import { deviceLanguageWithCountryCode } from 'App/Utils/RNNativeModules/internationalization.RNNativeModules'

import { AppEvents } from 'App/Services/AppEventEmitter/AppEvents'
import { getCmsItem } from 'App/Services/StorageWrappers/CMSStorage'
import DateCurrencyFromatter from 'App/Screens/Settings/Components/LanguageSettings/DateCurrencyFormatter'

//Should I use this instead of emitting event in app settings
const configureI18nTranslation = (
  languageName: string,
  resourceValues?: any
) => {
  ContentManager.setLocale(languageName)
  // We are directly using the I18n cause we don’t need to use the content manager since it merges the two objectes (CMS and local)
  resourceValues && (I18n.translations[languageName] = resourceValues)

  emitEvent(AppEvents.LANGUAGE_CHANGED, languageName)
}
const isJsonValid = (json: any) => {
  try {
    typeof json === 'object' || JSON.parse(json)
  } catch (e) {
    return false
  }
  return true
}
const loadLanguageResource = async (languageName: string) => {
  const selectedLanguageResource = await getCmsItem(languageName)
  if (selectedLanguageResource) {
    // APPLY LANGUAGE through I18n
    if (isJsonValid(selectedLanguageResource)) {
      configureI18nTranslation(languageName, selectedLanguageResource)
    }
  } else {
    // LOAD BUNDLED LOCAL LANGUAGE RESOURCE FILE.
    const localResourceFiles = require('../../../CMS/index')
    configureI18nTranslation(languageName, localResourceFiles[languageName])
  }
}

const loadAppLanguage = async () => {
  const langLocale =
    (await EncryptedStorage.getItem(STORAGE_KEYS.selectedLanguage)) ||
    deviceLanguageWithCountryCode

  const { isSupported, language } = await isLangSupported(langLocale)

  let languageName = language?.id
  if (!isSupported) {
    languageName = await getDefaultLocale()

    await EncryptedStorage.setItem(STORAGE_KEYS.selectedLanguage, languageName)
  }
  return languageName
}

const applyAppLanguage = async () => {
  await loadLanguageResource(await loadAppLanguage())
  setDateCurrencyFormatterLocale()
}

const getDefaultLocale = async () =>
  (await getI18N()).internationalisation?.default_locale

const getI18N = async () =>
  await getCmsItem(STORAGE_KEYS.CMS_ITEMS.INTERNATIONALISATION)

const isLangSupported = async (langLocale: string) => {
  const language =
    (await findLang(langLocale)) ||
    (hasVariant(langLocale)
      ? await findLang(langLocale?.split('_')?.[0])
      : false)

  return {
    isSupported: !!language,
    language
  }
}

const hasVariant = (lang: string) => lang.includes('_')

const findLang = async (language: string) => {
  const languages: Array<any> = (await getI18N()).internationalisation
    .translation_items

  return languages.find((lang) => language === lang.locale)
}

const replaceLocalisationValue = async (langKey: string, newValue: string) => {
  I18n.translations[await loadAppLanguage()][langKey] = newValue
}

const setDateCurrencyFormatterLocale = async () => {
  const langLocale =
    (await EncryptedStorage.getItem(STORAGE_KEYS.selectedLanguage)) ||
    deviceLanguageWithCountryCode
  DateCurrencyFromatter.locale = langLocale?.split('_')?.[0]
  Object.assign(dateCurrencyFromatter, DateCurrencyFromatter)
}

export {
  configureI18nTranslation,
  loadAppLanguage,
  applyAppLanguage,
  getI18N,
  isLangSupported,
  getDefaultLocale,
  loadLanguageResource,
  replaceLocalisationValue
}
