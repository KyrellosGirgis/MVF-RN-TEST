/* eslint-disable import/namespace */
import { LoginStatuses as Status } from '@vfgroup-oneplatform/login'

import * as loginHelpers from 'App/Screens/Login/Implementations/Login.helper'
import * as CookiesManagerService from 'App/Services/CookiesManager/CookiesManager'

import SeamlessLoginImplementation from 'App/Screens/Login/Implementations/SeamlessLoginImplementation'

import * as OIDC from 'App/Services/API/Requests/OIDC/OIDC'

import * as login from 'App/Services/API/Requests/Login/login'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import { LOGIN_TYPES } from 'App/Utils/Enums'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

describe('Seamless Login Implementation', () => {
  const onLoadingStart = jest.fn()
  const onLoadingEnd = jest.fn()
  const authConfig = {}
  const instance = new SeamlessLoginImplementation(
    authConfig,
    onLoadingStart,
    onLoadingEnd
  )
  loginHelpers.setLoggedInMintUserId = jest.fn()

  it('should call onLoadingStart on calling onLoginStart', () => {
    instance.onLoginStart()
    expect(onLoadingStart).toHaveBeenCalled()
  })

  it('should setItem loginType in AsyncStorage with right args when api succeed ', async () => {
    login.seamlessLoginDE = jest.fn()

    OIDC.loadOIDCToken = jest.fn()

    loginHelpers.setLoginTokens = jest.fn()

    CookiesManagerService.getOSCookies = jest.fn()
    CookiesManagerService.clearOSCookies = jest.fn()

    await instance.onLogin()

    expect(CookiesManagerService.clearOSCookies).toHaveBeenCalled()

    expect(login.seamlessLoginDE).toHaveBeenCalled()

    expect(OIDC.loadOIDCToken).toHaveBeenCalled()

    expect(CookiesManagerService.clearOSCookies).toHaveBeenCalled()

    expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.loginType,
      LOGIN_TYPES.SEAMLESS
    )
  })

  it('should return an object with status.Success and response when api succeed ', async () => {
    const response = {
      data: {
        parameters: {
          userId: 19181716
        }
      }
    }
    OIDC.loadOIDCToken = jest.fn()
    loginHelpers.setLoginTokens = jest.fn()

    CookiesManagerService.getOSCookies = jest.fn()
    CookiesManagerService.clearOSCookies = jest.fn()

    login.seamlessLoginDE = jest.fn(() => response)

    const res = await instance.onLogin()
    expect(login.seamlessLoginDE).toHaveBeenCalled()

    expect(OIDC.loadOIDCToken).toHaveBeenCalled()

    expect(CookiesManagerService.clearOSCookies).toHaveBeenCalled()

    expect(res).toMatchObject({
      status: Status.Success,
      response
    })
  })

  it('should NOT setItem isLoggedIn in AsyncStorage when api fail (seamlessLoginDE) ', async () => {
    EncryptedStorage.setItem = jest.fn()
    login.seamlessLoginDE = jest.fn(() => {
      throw 'error'
    })
    await instance.onLogin()
    expect(login.seamlessLoginDE).toThrow()
    expect(EncryptedStorage.setItem).not.toHaveBeenCalled()
  })

  it('should NOT setItem isLoggedIn in AsyncStorage when api fail (loadOIDCToken) ', async () => {
    EncryptedStorage.setItem = jest.fn()
    OIDC.loadOIDCToken = jest.fn(() => {
      throw 'error'
    })
    await instance.onLogin()
    expect(OIDC.loadOIDCToken).toThrow()
    expect(EncryptedStorage.setItem).not.toHaveBeenCalled()
  })

  it('should return an object with status.Failed and response when api fail (seamlessLoginDE)', async () => {
    const response = 'error'
    login.seamlessLoginDE = jest.fn(() => {
      throw response
    })
    const res = await instance.onLogin()
    expect(login.seamlessLoginDE).toThrow()
    expect(res).toMatchObject({
      status: Status.Failed,
      response
    })
  })

  it('should return an object with status.Failed and response when api fail (loadOIDCToken)', async () => {
    const response = 'error'
    OIDC.loadOIDCToken = jest.fn(() => {
      throw response
    })
    const res = await instance.onLogin()
    expect(OIDC.loadOIDCToken).toThrow()
    expect(res).toMatchObject({
      status: Status.Failed,
      response
    })
  })

  it('should setLoggedInMintUserId  when api succeed ', async () => {
    const response = {
      data: {
        userId: 19181716
      }
    }
    login.seamlessLoginDE = jest.fn(() => response)
    OIDC.loadOIDCToken = jest.fn()
    loginHelpers.setLoginTokens = jest.fn()
    CookiesManagerService.getOSCookies = jest.fn()
    CookiesManagerService.clearOSCookies = jest.fn()
    loginHelpers.setLoggedInMintUserId = jest.fn()

    await instance.onLogin()
    expect(loginHelpers.setLoggedInMintUserId).toHaveBeenCalledWith(19181716)
  })
})
