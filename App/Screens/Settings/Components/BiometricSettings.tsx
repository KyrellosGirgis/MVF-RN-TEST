import React, { useEffect, useState } from 'react'
import { SettingsToggle } from '@vfgroup-oneplatform/framework/Settings/components'

import { useRoute } from '@react-navigation/native'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import {
  isBiometricsAvailableAndEnabled,
  enableBiometrics,
  showBiometricsWarning
} from 'App/Services/AppBiometrics/AppBiometrics.helpers'
import {
  BIOMETRICS_ROUTE_PARAM_STATUS,
  BIOMETRICS_STATUS
} from 'App/Services/AppBiometrics/AppBiometrics.constants'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const BiometricSettings = () => {
  const [isBiometricsOn, setIsBiometricsOn] = useState(false)
  const {
    params: { openedFromDeeplink, deeplinkParams }
  } = useRoute<any>()

  const setBiometricsState = async () => {
    const biometricsState = await EncryptedStorage.getBoolean(
      STORAGE_KEYS.isBiometricsOn
    )
    setIsBiometricsOn(biometricsState)
  }

  useEffect(() => {
    setBiometricsState()
  }, [])

  const handleBiometricChange = async (initialValue: boolean) => {
    const isChecked = initialValue || isBiometricsOn
    if (!isChecked) {
      const { status } = await isBiometricsAvailableAndEnabled()
      if (status === BIOMETRICS_STATUS.AVAILABLE) {
        await enableBiometrics()
        setIsBiometricsOn(true)
      } else if (status === BIOMETRICS_STATUS.NOT_AVAILABLE) {
        showBiometricsWarning({})
      }
    } else {
      await EncryptedStorage.setItem(STORAGE_KEYS.isBiometricsOn, 'false')
      setIsBiometricsOn(false)
    }
  }

  const handleIfOpenedFromDeeplink = async () => {
    const biometricsParam = deeplinkParams.biometrics?.toUpperCase()
    if (biometricsParam) {
      const openBiometrics = BIOMETRICS_ROUTE_PARAM_STATUS[biometricsParam]
      openBiometrics !== undefined && handleBiometricChange(!openBiometrics)
    }
  }

  useEffect(() => {
    openedFromDeeplink && handleIfOpenedFromDeeplink()
  }, [openedFromDeeplink, deeplinkParams])

  return (
    <SettingsToggle
      title="biometric_toggle_title"
      description="biometric_toggle_subtitle"
      icon="icBiometricAuthentication"
      isSelected={isBiometricsOn}
      onChange={handleBiometricChange}
      testID="SettingsToggle"
    />
  )
}

export default BiometricSettings
