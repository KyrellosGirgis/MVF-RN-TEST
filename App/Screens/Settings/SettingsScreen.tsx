import React, { useEffect, useState } from 'react'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'
import AppSettings from '@vfgroup-oneplatform/framework/Settings/AppSettings'

import { getThemeImages } from 'App/Themes'

import Configuration from './Configuration'

import { excludeSettingItem } from './SettingsScreen.helpers'

import { navigateToDashboardScreen } from 'App/Screens/Helpers'

import { isBiometricsAvailableAndEnabled } from 'App/Services/AppBiometrics/AppBiometrics.helpers'
import { BIOMETRICS_STATUS } from 'App/Services/AppBiometrics/AppBiometrics.constants'
import { testID } from 'App/Utils/Helpers/testId.helpers'

const SettingsScreen = () => {
  const [settingsConfig, setSettingsConfig] = useState(Configuration)
  const theme = useTheme()
  const images = getThemeImages(theme.name)

  const prepareConfigurations = async () => {
    const { status } = await isBiometricsAvailableAndEnabled()
    if (status === BIOMETRICS_STATUS.NOT_SUPPORTED) {
      setSettingsConfig(excludeSettingItem(Configuration, 'BiometricSettings'))
    }
  }

  useEffect(() => {
    prepareConfigurations()
  }, [])

  return (
    <AppSettings
      title="settings_title"
      settings={settingsConfig}
      onClose={navigateToDashboardScreen}
      images={images}
      testID={testID('AppSettings')}
      withTray
    />
  )
}

export default SettingsScreen
