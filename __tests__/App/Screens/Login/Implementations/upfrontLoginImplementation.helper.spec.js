/* eslint-disable import/namespace */

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

import * as loginHelpers from 'App/Screens/Login/Implementations/Login.helper'
import * as CookiesManagerService from 'App/Services/CookiesManager/CookiesManager'

import * as OIDC from 'App/Services/API/Requests/OIDC/OIDC'
import {
  loadTokenThenContinueLoginFlow,
  backupAndClearLoginData,
  restoreLoginData
} from 'App/Screens/Login/Implementations/UpfrontLoginImplementation.helper'
import { AppLifecycleManager } from 'App/Services/AppLifecycleManager/AppLifecycleManager'

const storedLegacyCookies = { name: 'storedLegacyCookies' }
const tokens = { name: 'oidcTokens' }
const loggedInMintUserId = { id: '12nj3321' }

describe('upfront login helpers Implementation', () => {
  const params = {
    userName: 'username',
    password: 'password',
    rememberMe: true
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Ensure that loadTokenThenContinueLoginFlow works as expected', async () => {
    OIDC.loadOIDCToken = jest.fn()
    loginHelpers.setLoginTokens = jest.fn()
    EncryptedStorage.setItem = jest.fn()
    AppLifecycleManager.executeOnLoginEndTasks = jest.fn()
    await loadTokenThenContinueLoginFlow(params)

    expect(await OIDC.loadOIDCToken).toHaveBeenCalled()
    expect(await EncryptedStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.username,
      params.userName
    )
    expect(await EncryptedStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.password,
      params.password
    )
  })

  it('Should backupAndClearLoginData return login data and clear cookies as expected', async () => {
    CookiesManagerService.getStorageCookies = jest.fn(() => storedLegacyCookies)
    EncryptedStorage.getItemParsedToJSON = jest.fn(() => loggedInMintUserId)
    loginHelpers.getLoginTokens = jest.fn(() => tokens)
    CookiesManagerService.clearStorageCookies = jest.fn()

    const loginData = await backupAndClearLoginData()

    expect(loginData).toStrictEqual({
      storedLegacyCookies,
      tokens,
      loggedInMintUserId
    })

    expect(CookiesManagerService.clearStorageCookies).toHaveBeenCalledTimes(1)
  })

  it('Should call restoreLoginData flow as expected', async () => {
    CookiesManagerService.setStorageCookies = jest.fn()
    loginHelpers.setLoginTokens = jest.fn()
    loginHelpers.setLoggedInMintUserId = jest.fn()

    await restoreLoginData({
      storedLegacyCookies,
      tokens,
      loggedInMintUserId
    })

    expect(CookiesManagerService.setStorageCookies).toHaveBeenCalledWith(
      storedLegacyCookies
    )
    expect(loginHelpers.setLoginTokens).toHaveBeenCalledWith(tokens)
    expect(loginHelpers.setLoggedInMintUserId).toHaveBeenCalledWith(
      loggedInMintUserId
    )
  })
})
