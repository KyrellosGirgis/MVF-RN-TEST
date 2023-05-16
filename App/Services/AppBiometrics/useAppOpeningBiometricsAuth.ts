import Moment from 'moment'
import { useEffect, useRef, useState } from 'react'

import {
  authenticateUsingBiometrics,
  isBiometricsAvailableAndEnabled,
  isBiometricsToggleEnabled,
  showBiometricsWarning
} from './AppBiometrics.helpers'

import { BIOMETRICS_STATUS } from './AppBiometrics.constants'

import { BiometricsConfig } from 'App/Config/BiometricsConfig'
import { getTimeDifferenceFromNow } from 'App/Utils/Helpers/generic.helpers'
import {
  hideBlurView,
  showBlurView
} from 'App/Containers/AppNavigation/AppNavigation.helpers'

const useAppOpeningBiometricsAuth = () => {
  const [enterBackgroundTimestamp, setEnterBackgroundTimestamp] =
    useState<any>('')
  const didUserCancelledAuthentication = useRef(false)
  const isWarningShown = useRef(false)
  // Logic:
  const onBackgroundHandler = async () => {
    const { isEnabled, status } = await isBiometricsAvailableAndEnabled()
    if (isEnabled && status === BIOMETRICS_STATUS.AVAILABLE) {
      showBlurView({ showUnlockBtn: true })
      setEnterBackgroundTimestamp(Moment())
    }
  }

  const onForegroundHandler = async () => {
    const shouldAuthenticate =
      getTimeDifferenceFromNow(enterBackgroundTimestamp) >=
      BiometricsConfig.backgroundTimeForRequestingAuthentication

    const { isEnabled, status } = await isBiometricsAvailableAndEnabled()
    if (
      isEnabled &&
      status === BIOMETRICS_STATUS.AVAILABLE &&
      shouldAuthenticate
    ) {
      await authenticateUsingBiometricsWrapper()
      setEnterBackgroundTimestamp('')
    } else if (
      !didUserCancelledAuthentication.current &&
      !isWarningShown.current
    ) {
      hideBlurView()
    }
  }

  const authenticateUsingBiometricsWrapper = async () => {
    didUserCancelledAuthentication.current = false
    const authenticationStatus = await authenticateUsingBiometrics({
      showUnlockBtn: true
    })
    if (authenticationStatus === BIOMETRICS_STATUS.AUTHENTICATED) {
      hideBlurView()
    } else if (authenticationStatus === BIOMETRICS_STATUS.NOT_AVAILABLE) {
      const isBiometricsEnabled = await isBiometricsToggleEnabled()
      if (isBiometricsEnabled) {
        showBiometricsWarning({ withLogout: true })
        isWarningShown.current = true
        showBlurView({ showUnlockBtn: true })
      }
    } else if (authenticationStatus === BIOMETRICS_STATUS.CANCELLED) {
      didUserCancelledAuthentication.current = true
    }
  }

  // Hooks:
  useEffect(() => {
    authenticateUsingBiometricsWrapper()
  }, [])

  return {
    authenticateUsingBiometricsWrapper,
    onBackgroundHandler,
    onForegroundHandler
  }
}

export default useAppOpeningBiometricsAuth
