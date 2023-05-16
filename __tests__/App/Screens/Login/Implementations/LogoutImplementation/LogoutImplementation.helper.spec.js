/* eslint-disable import/namespace */
import CookieManager from '@react-native-cookies/cookies'

import {
  clearUnNeededEncryptedStorage,
  clearUnNeededReduxData,
  clearLoginCrendentialsAndTokens,
  clearAllData,
  resetAllSDKsToDefaultState
} from 'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation.helper'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import { store } from 'App/Redux'
import { appUserDataActions } from 'App/Redux/AppUserData/appUserData.reducer'
import * as UserDataThunk from 'App/Redux/AppUserData/appUserData.thunk'
import { onboardingActions } from 'App/Redux/reducers/onboarding.reducer'
import * as LoginHelper from 'App/Screens/Login/Implementations/Login.helper.js'
import StorageCacheStore from 'App/Services/StorageWrappers/StorageCacheStore/StorageCacheStore'
import * as UserThirdPartyPermissionsThunk from 'App/Redux/UserThirdPartyPermissions/UserThirdPartyPermissions.thunk'
import * as CookiesManagerService from 'App/Services/CookiesManager/CookiesManager'
import { appActions } from 'App/Redux/reducers/AppReducer/app.reducer'

describe('Test LogoutImplementation helper functions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {
    CookieManager.clearAll = jest.fn()
    EncryptedStorage.setItem = jest.fn()
    EncryptedStorage.removeItem = jest.fn()
    store.dispatch = jest.fn()
    UserDataThunk.switchUserProductData = jest.fn()
    LoginHelper.clearLoginTokens = jest.fn()
    StorageCacheStore.clear = jest.fn()
    UserThirdPartyPermissionsThunk.setUserThirdPartyPermissions = jest.fn()
    CookiesManagerService.clearStorageCookies = jest.fn()
  })

  test('should clearUnNeededEncryptedStorage call the flow successfully', async () => {
    await clearUnNeededEncryptedStorage()

    expect(EncryptedStorage.removeItem).toHaveBeenCalledWith(
      STORAGE_KEYS.loginType
    )
    expect(EncryptedStorage.removeItem).toHaveBeenCalledWith(
      STORAGE_KEYS.isJailBrokenOrRootedAlertShown
    )
    expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.isBiometricsOn,
      'false'
    )
    expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.isOnboardingFinished,
      'false'
    )
    expect(EncryptedStorage.removeItem).toHaveBeenCalledWith(
      STORAGE_KEYS.loggedInMintUserId
    )
    expect(EncryptedStorage.removeItem).toHaveBeenCalledWith(
      STORAGE_KEYS.hashing
    )
    expect(EncryptedStorage.removeItem).toHaveBeenCalledWith(STORAGE_KEYS.umid)
  })

  test('should clearUnNeededReduxData call the flow successfully', () => {
    clearUnNeededReduxData()
    expect(store.dispatch).toHaveBeenCalledWith(appActions.setIsLoggedIn(false))

    expect(store.dispatch).toHaveBeenCalledWith(
      appUserDataActions.setAppUserData({})
    )
    expect(store.dispatch).toHaveBeenCalledWith(
      UserDataThunk.switchUserProductData(undefined)
    )
    expect(store.dispatch).toHaveBeenCalledWith(
      onboardingActions.resetOnboarding()
    )
  })

  test('should clearLoginCrendentialsAndTokens call the flow successfully', async () => {
    await clearLoginCrendentialsAndTokens()

    expect(EncryptedStorage.removeItem).toHaveBeenCalledWith(
      STORAGE_KEYS.username
    )
    expect(EncryptedStorage.removeItem).toHaveBeenCalledWith(
      STORAGE_KEYS.password
    )
    expect(LoginHelper.clearLoginTokens).toHaveBeenCalledTimes(1)
  })

  test('should resetAllSDKsToDefaultState call the flow successfully', () => {
    resetAllSDKsToDefaultState()

    expect(store.dispatch).toHaveBeenCalledWith(
      UserThirdPartyPermissionsThunk.setUserThirdPartyPermissions()
    )
  })

  test('should clearAllData call the flow successfully when all flows succeeds', async () => {
    await clearAllData()

    expect(CookiesManagerService.clearStorageCookies).toHaveBeenCalledTimes(1)
    expect(EncryptedStorage.removeItem).toHaveBeenCalledWith(
      STORAGE_KEYS.username
    )
    expect(StorageCacheStore.clear).toHaveBeenCalledTimes(1)
    expect(store.dispatch).toHaveBeenCalledWith(
      appUserDataActions.setAppUserData({})
    )
    expect(store.dispatch).toHaveBeenCalledWith(
      UserThirdPartyPermissionsThunk.setUserThirdPartyPermissions()
    )
  })

  test('should clearAllData not to throw error when one flow fails', () => {
    StorageCacheStore.clear = jest.fn(() => {
      throw new Error('')
    })

    expect(async () => await clearAllData()).not.toThrowError()
  })
})
