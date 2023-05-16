import { appActions } from 'App/Redux/reducers/AppReducer/app.reducer'
import { clearLoginTokens } from 'App/Screens/Login/Implementations/Login.helper.js'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import { store } from 'App/Redux'
import { appUserDataActions } from 'App/Redux/AppUserData/appUserData.reducer'
import { onboardingActions } from 'App/Redux/reducers/onboarding.reducer'
import StorageCacheStore from 'App/Services/StorageWrappers/StorageCacheStore/StorageCacheStore'
import { clearStorageAndOSCookies } from 'App/Services/CookiesManager/CookiesManager'
import { switchUserProductData } from 'App/Redux/AppUserData/appUserData.thunk'

import { setUserThirdPartyPermissions } from 'App/Redux/UserThirdPartyPermissions/UserThirdPartyPermissions.thunk'

const clearUnNeededEncryptedStorage = async () => {
  await EncryptedStorage.removeItem(STORAGE_KEYS.loginType)
  await EncryptedStorage.removeItem(STORAGE_KEYS.isJailBrokenOrRootedAlertShown)
  await EncryptedStorage.setItem(STORAGE_KEYS.isBiometricsOn, 'false')
  await EncryptedStorage.setItem(STORAGE_KEYS.isOnboardingFinished, 'false')
  await EncryptedStorage.removeItem(STORAGE_KEYS.loggedInMintUserId)
  await EncryptedStorage.removeItem(STORAGE_KEYS.hashing)
  await EncryptedStorage.removeItem(STORAGE_KEYS.umid)
}

const clearLoginCrendentialsAndTokens = async () => {
  await EncryptedStorage.removeItem(STORAGE_KEYS.username)
  await EncryptedStorage.removeItem(STORAGE_KEYS.password)
  await clearLoginTokens()
}

const clearUnNeededReduxData = () => {
  store.dispatch(appActions.setIsLoggedIn(false))

  store.dispatch(appUserDataActions.setAppUserData({}))

  store.dispatch(switchUserProductData(undefined))

  store.dispatch(onboardingActions.resetOnboarding())
}

const resetAllSDKsToDefaultState = () => {
  store.dispatch(
    setUserThirdPartyPermissions({
      LIOM: undefined,
      LINBA: undefined,
      LIOPT: undefined,
      NetperformPermissions: {
        NetworkOptimizationPermission: undefined,
        PersonalizedNetworkOptimizationPermission: undefined
      }
    })
  )
}

const clearAllData = async () => {
  try {
    await clearUnNeededEncryptedStorage()
    await clearStorageAndOSCookies()
    await clearLoginCrendentialsAndTokens()
    await StorageCacheStore.clear()
    clearUnNeededReduxData()
    resetAllSDKsToDefaultState()
  } catch (error) {}
}

export {
  clearUnNeededEncryptedStorage,
  clearUnNeededReduxData,
  clearLoginCrendentialsAndTokens,
  clearAllData,
  resetAllSDKsToDefaultState
}
