import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { SettingsRadio } from '@vfgroup-oneplatform/framework/Settings/components'

import { withTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { dateCurrencyFromatter } from '@vfgroup-oneplatform/foundation/Utils/dateCurrencyFormate'

import { getThemeImages } from 'App/Themes'

import { isLanguageSelected, languageList } from './LanguageSettings.helper'

import DateCurrencyFromatter from './DateCurrencyFormatter'

import { setMomentLocale } from 'App/Utils/Helpers/date.helpers'

import styles from 'App/Screens/Settings/Components/LanguageSettings/LanguageSettings.styles'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import Separator from 'App/Components/Separator/Separator'

import {
  getI18N,
  loadLanguageResource
} from 'App/I18n/helpers/localisations.helpers'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import { deviceLanguageWithCountryCode } from 'App/Utils/RNNativeModules/internationalization.RNNativeModules'
import { testID } from 'App/Utils/Helpers/testId.helpers'

const LanguageSettings = ({ theme }: any) => {
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const images = getThemeImages(theme.name)
  const [languages, setLanguages] = useState(languageList)
  // use try catch and await
  const loadLanguage = async () => {
    try {
      const language =
        (await EncryptedStorage.getItem(STORAGE_KEYS.selectedLanguage)) ||
        deviceLanguageWithCountryCode.split('_')[0]
      setSelectedLanguage(language)
    } catch (e) {}
  }
  const loadLanguageList = async () => {
    setLanguages((await getI18N()).internationalisation.translation_items)
  }
  useEffect(() => {
    loadLanguage()
    loadLanguageList()
  }, [])

  const handleLanguageChange = async (language: {
    locale: string
    id: string
  }) => {
    await EncryptedStorage.setItem(
      STORAGE_KEYS.selectedLanguage,
      language?.locale
    )
    loadLanguageResource(language.id)
    setSelectedLanguage(language.locale)
    setMomentLocale()
    DateCurrencyFromatter.locale = language.locale
    Object.assign(dateCurrencyFromatter, DateCurrencyFromatter)
  }

  return languages.map((item, index) => (
    <View key={index}>
      <SettingsRadio
        isSelected={isLanguageSelected(item.locale, selectedLanguage)}
        onPress={() => {
          handleLanguageChange(item)
        }}
        icon={item.icon}
        title={item.display_name}
        images={images}
        testID={testID('SettingsRadio')}
      />

      {index !== languages.length - 1 && (
        <Separator
          style={styles.separator(theme)}
          testID="language_separator"
        />
      )}
    </View>
  ))
}
export default withTheme(LanguageSettings)
