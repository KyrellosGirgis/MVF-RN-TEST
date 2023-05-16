import React, { useState } from 'react'
import PreOnboardingTutorial from '@vfgroup-oneplatform/framework/PreOnboardingTutorial'

import { useRoute } from '@react-navigation/native'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import { openExternalWebView } from 'App/Utils/Helpers/generic.helpers'
import { webURLs } from 'App/Services'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import useStartSplashEndAnimation from 'App/Hooks/useStartSplashEndAnimation'
import Routes from 'App/Containers/AppNavigation/Routes'
import { NavigationFunctions } from 'App/Containers'
import { SplashProps } from 'App/types'

interface PreOnboarding {
  splashProps: SplashProps
}

const PreOnBoarding = ({ splashProps }: PreOnboarding) => {
  const { params } = useRoute()
  const [isOnLoginPressed, setIsOnLoginPressed] = useState(false)

  useStartSplashEndAnimation({
    LogoViewRef: null,
    splashProps,
    screenName: Routes.PreOnBoarding
  })

  const proceedToLogin = async () => {
    if (!isOnLoginPressed) {
      await EncryptedStorage.setItem(STORAGE_KEYS.isPreOnboardingShown, 'true')
      setIsOnLoginPressed(true)

      NavigationFunctions.navigateWithResetAction(Routes.LoginPlaceholder, {
        enableSeamless: !params?.disableSeamlessLogin,
        disableEndAnimationAndShowSpinnerForSeamless: true,
        enableSplashAnimation: false
      })
    }
  }

  const openRegisterationURL = async () => {
    await EncryptedStorage.setItem(STORAGE_KEYS.isPreOnboardingShown, 'true')
    openExternalWebView(webURLs.registerationURL)
  }

  return (
    <PreOnboardingTutorial
      onPrimaryButtonPress={proceedToLogin}
      onSecondaryButtonPress={openRegisterationURL}
      testID="PreOnboardingTutorial"
    />
  )
}
export default PreOnBoarding
