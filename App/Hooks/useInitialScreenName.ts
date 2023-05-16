import { useEffect, useState } from 'react'

import Routes from 'App/Containers/AppNavigation/Routes'
import { TryToRefreshCookies } from 'App/Services/API/Interceptors/Helpers/Legacy.helpers'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import { isDeviceConnectedToNetwork } from 'App/Utils/Helpers/generic.helpers'
import { store } from 'App/Redux'

const logoutScreenParams = {
  enableSeamless: false,
  disableEndAnimationAndShowSpinnerForSeamless: false,
  enableSplashAnimation: true
}

const useInitialScreenName = () => {
  const [initialScreenName, setInitialScreenName] = useState<null | string>(
    null
  )
  const [initialScreenParams, setInitialScreenParams] = useState<null | any>(
    null
  )

  const loggedInFlow = async () => {
    const isConnected = await isDeviceConnectedToNetwork()
    let didRefreshCookiesSucceed = false

    if (isConnected) {
      didRefreshCookiesSucceed = await TryToRefreshCookies()
      setInitialScreenParams(logoutScreenParams)
      !didRefreshCookiesSucceed && setInitialScreenName(Routes.LoginPlaceholder)
    }

    if (!isConnected || didRefreshCookiesSucceed) {
      const isOnboardingFinished = await EncryptedStorage.getBoolean(
        STORAGE_KEYS.isOnboardingFinished
      )

      setInitialScreenName(
        isOnboardingFinished ? Routes.HomeScreen : Routes.OnBoarding
      )
    }
  }

  const appInit = async () => {
    const { isLoggedIn } = store.getState().app

    if (isLoggedIn) {
      await loggedInFlow()
    } else {
      const isPreOnboardingShown = await EncryptedStorage.getBoolean(
        STORAGE_KEYS.isPreOnboardingShown
      )
      setInitialScreenName(
        isPreOnboardingShown ? Routes.LoginPlaceholder : Routes.PreOnBoarding
      )
    }
  }

  useEffect(() => {
    appInit()
  }, [])

  return [initialScreenName, initialScreenParams]
}

export default useInitialScreenName
