/* eslint-disable import/namespace */

import * as cookiesManager from 'App/Services/CookiesManager/CookiesManager'

import * as login from 'App/Services/API/Requests/Login/login'

import * as helpers from 'App/Services/Helpers'

import * as LegacyHelpers from 'App/Services/API/Interceptors/Helpers/Legacy.helpers'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

import * as captchaHelpers from 'App/Screens/Login/Implementations/UpfrontLoginImplementation.helper'

EncryptedStorage.getBoolean = jest.fn(() => true)
jest.mock('App/Services/API/Requests/Login/login', () => {
  return { upFrontLoginAPI: jest.fn(), refreshMintSSOToken: jest.fn() }
})
describe('Legacy Helpers', () => {
  it('gets username and password from keychain if both exists it relogins without performing OIDC flow', async () => {
    const response = { status: 200 }
    const userCredentials = {
      userName: '1',
      password: '1',
      rememberMe: true
    }
    captchaHelpers.upfrontLogin = jest.fn(() => response)
    EncryptedStorage.getItem = jest.fn(() => '1')
    await LegacyHelpers.refreshCookiesForUpfront()
    expect(captchaHelpers.upfrontLogin).toHaveBeenCalledWith(userCredentials, {
      shouldPerformOIDCFlow: false
    })
  })

  it('throws an error if any of the username or password were falsey  ', async () => {
    EncryptedStorage.getItem = jest.fn(() => undefined)
    EncryptedStorage.getBoolean = jest.fn(() => undefined)

    const catchSpy = jest.fn()
    await LegacyHelpers.refreshCookiesForUpfront().catch(catchSpy)
    expect(catchSpy).toHaveBeenCalled()
    expect(await EncryptedStorage.getItem).toHaveBeenCalledTimes(2)
  })

  it('refreshes MintSSOToken if existed', async () => {
    cookiesManager.getStorageCookies = jest.fn(() => {
      return { 'mint-sso-token': 1 }
    })
    await LegacyHelpers.refreshCookiesForSMSandSeamless()
    expect(login.refreshMintSSOToken).toHaveBeenCalled()
  })
  it('throws error if MintSSOToken missing', async () => {
    cookiesManager.getStorageCookies = jest.fn()
    const catchSpy = jest.fn()
    await LegacyHelpers.refreshCookiesForSMSandSeamless().catch(catchSpy)
    expect(catchSpy).toHaveBeenCalled()
  })
  it('calls refreshCookiesForUpfront if logged in with upfrontLogin', async () => {
    EncryptedStorage.getBoolean = jest.fn(() => true)
    helpers.isUpfront = jest.fn(() => true)
    LegacyHelpers.refreshCookiesForUpfront = jest.fn()
    await LegacyHelpers.refreshCookies()
    expect(LegacyHelpers.refreshCookiesForUpfront).toHaveBeenCalled()
  })
  it('calls refreshCookiesForSMSandSeamless if logged in with seamless or SMS login', async () => {
    EncryptedStorage.getBoolean = jest.fn(() => true)
    helpers.isUpfront = jest.fn(() => false)
    LegacyHelpers.refreshCookiesForSMSandSeamless = jest.fn()
    await LegacyHelpers.refreshCookies()
    expect(LegacyHelpers.refreshCookiesForSMSandSeamless).toHaveBeenCalled()
  })
})
