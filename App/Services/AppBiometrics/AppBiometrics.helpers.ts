import { Alert, Linking, Platform } from 'react-native'
import FingerprintScanner from 'react-native-fingerprint-scanner'

import { PERMISSIONS, request } from 'react-native-permissions'

import {
  BIOMETRICS_STATUS,
  biometricsAuthConfig,
  FingeprintAvailabilityErrors
} from './AppBiometrics.constants'

import { openAndroidSecuritySettings } from 'App/Utils/RNNativeModules/generic.RNNativeModules'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

import { translate } from 'App/Utils'
import {
  hideBlurView,
  showBlurView
} from 'App/Containers/AppNavigation/AppNavigation.helpers'
import logOut from 'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation'
import { isIOS } from 'App/Utils/Helpers/generic.helpers'

const showBiometricsWarning = ({
  onPressOk,
  withLogout = false
}: {
  onPressOk?: () => Promise<void>
  withLogout: boolean
}) => {
  const buttons = [
    withLogout
      ? {
          text: translate('logout'),
          onPress: async () => {
            await logOut()
            hideBlurView()
          }
        }
      : {
          text: translate('ok'),
          onPress: onPressOk
        },
    {
      text: translate('gotosettings'),
      onPress: () => {
        isIOS ? Linking.openSettings() : openAndroidSecuritySettings()
      }
    }
  ]

  Alert.alert(
    translate('biometricsNotEnabledTitle'),
    translate('biometricsNotEnabledMessage'),
    buttons
  )
}
/////////////////////// BIOMETRICS MODULE MAIN BLOCKS ///////////////////////

const isBiometricsToggleEnabled = async () =>
  await EncryptedStorage.getBoolean(STORAGE_KEYS.isBiometricsOn)

const getBiometricsAvailabilityStatus = async () => {
  try {
    await FingerprintScanner.isSensorAvailable()
    return BIOMETRICS_STATUS.AVAILABLE
  } catch (error) {
    if (FingeprintAvailabilityErrors.includes(error.name)) {
      return BIOMETRICS_STATUS.NOT_AVAILABLE
    }
    return BIOMETRICS_STATUS.NOT_SUPPORTED
  }
}

const isUserAuthenticatedByOS = async ({
  showUnlockBtn
}: {
  showUnlockBtn: boolean
}) => {
  try {
    setTimeout(() => {
      showBlurView({ showUnlockBtn })
    }, 0)
    Platform.OS === 'android' && FingerprintScanner.release()
    await FingerprintScanner.authenticate(biometricsAuthConfig)
    return true
  } catch (error) {
    return false
  }
}

const isBiometricsAvailableAndEnabled = async () => {
  const isEnabled = await isBiometricsToggleEnabled()
  const status = await getBiometricsAvailabilityStatus()
  return { isEnabled, status }
}

/////////////////////// BIOMETRICS ACTUAL USAGE ///////////////////////

const authenticateUsingBiometrics = async ({
  forceAuthentication = false,
  showUnlockBtn = false
} = {}) => {
  const { isEnabled, status } = await isBiometricsAvailableAndEnabled()
  const isAvailable = status === BIOMETRICS_STATUS.AVAILABLE
  if (!isAvailable) {
    return BIOMETRICS_STATUS.NOT_AVAILABLE
  }

  const shouldAuthenticate = forceAuthentication || isEnabled

  if (shouldAuthenticate) {
    // this will be true if user authenticated and false if user cancelled authentication
    const isAuthenticated = await isUserAuthenticatedByOS({
      showUnlockBtn
    })
    return isAuthenticated
      ? BIOMETRICS_STATUS.AUTHENTICATED
      : BIOMETRICS_STATUS.CANCELLED
  }
}

const enableBiometrics = async () => {
  const permissionRequest = await request(PERMISSIONS.IOS.FACE_ID)
  const shouldEnableBiometricsToggle =
    (isIOS && permissionRequest === 'granted') || !isIOS

  shouldEnableBiometricsToggle &&
    (await EncryptedStorage.setItem(STORAGE_KEYS.isBiometricsOn, 'true'))
}

export {
  showBiometricsWarning,
  isBiometricsToggleEnabled,
  getBiometricsAvailabilityStatus,
  isBiometricsAvailableAndEnabled,
  authenticateUsingBiometrics,
  isUserAuthenticatedByOS,
  enableBiometrics
}
