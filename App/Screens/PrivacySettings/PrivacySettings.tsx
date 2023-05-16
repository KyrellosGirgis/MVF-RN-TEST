import React, { useEffect, useState } from 'react'
import { PrivacySettings as PrivacySettingsComponent } from '@vfgroup-oneplatform/framework/PrivacySettings'
import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { getThemeImages } from 'App/Themes'

import PrivacySettingsShimmer from './Screens/PrivacySettingsShimmer/PrivacySettingsShimmer'

import privacySettingsData from './Configurations/PrivacySettingsSections.json'

import { navigateToDashboardScreen } from 'App/Screens/Helpers'

import { NavigationFunctions } from 'App/Containers'
import { delay } from 'App/Utils/Helpers/generic.helpers'

const PrivacySettings = () => {
  const theme = useTheme()
  const images = getThemeImages(theme.name)
  const [isLoading, setIsLoading] = useState(true)

  const init = async () => {
    await delay(2000)
    setIsLoading(false)
  }

  useEffect(() => {
    init()
  }, [])

  const onActionItemPress = (screenName: string) => {
    NavigationFunctions?.navigate?.(screenName, {})
  }

  return isLoading ? (
    <PrivacySettingsShimmer onClose={navigateToDashboardScreen} />
  ) : (
    <PrivacySettingsComponent
      onClose={navigateToDashboardScreen}
      privacySettingsData={privacySettingsData}
      onActionItemPress={onActionItemPress}
      images={images}
    />
  )
}

export default PrivacySettings
