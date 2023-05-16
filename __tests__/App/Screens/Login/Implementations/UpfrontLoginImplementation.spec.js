/* eslint-disable import/namespace */

import Config from 'react-native-config'

import * as CookiesManagerService from 'App/Services/CookiesManager/CookiesManager'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

import UpfrontLoginImplementation from 'App/Screens/Login/Implementations/UpfrontLoginImplementation'

import * as Logins from 'App/Services/API/Requests/Login/login'
import * as UpfrontLoginImplementationHelper from 'App/Screens/Login/Implementations/UpfrontLoginImplementation.helper'
import * as loginHelpers from 'App/Screens/Login/Implementations/Login.helper'
import { UPFRONT_LOGIN_MODES } from 'App/Services/LoginFlowManager/LoginFlowManager.constants'
import { AppLifecycleManager } from 'App/Services/AppLifecycleManager/AppLifecycleManager'
import { openExternalWebView } from 'App/Utils/Helpers/generic.helpers'

jest.mock('App/Containers/AppNavigation/NavigationFunctions', () => {
  return { navigate: jest.fn() }
})

const successResponse = {
  status: 200,
  headers: {},
  data: {
    userId: 19181716
  }
}

describe('Upfront Login Implementation', () => {
  const authConfig = {}
  const instance = new UpfrontLoginImplementation(authConfig)

  beforeAll(() => {
    loginHelpers.setLoggedInMintUserId = jest.fn()
    CookiesManagerService.clearOSCookies = jest.fn()
    EncryptedStorage.setItem = jest.fn()
    UpfrontLoginImplementationHelper.backupAndClearLoginData = jest.fn()
    UpfrontLoginImplementationHelper.restoreLoginData = jest.fn()
    AppLifecycleManager.executeOnBanLevelLoginTasks = jest.fn()
  })

  beforeEach(() => {
    instance.mode = undefined
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should setLoggedInMintUserId onSuccess without captcha', async () => {
    Logins.upFrontLoginAPI = jest.fn(() => successResponse)

    await instance.onLogin('username', 'password')
    expect(Logins.upFrontLoginAPI).toHaveBeenCalled()
    expect(loginHelpers.setLoggedInMintUserId).toHaveBeenCalledWith(19181716)
  })

  it('should call the correct flow when login with ban level', async () => {
    instance.mode = UPFRONT_LOGIN_MODES.ACCESS_SECURE_CONTENT
    instance.rememberMe = false
    UpfrontLoginImplementationHelper.upfrontLogin = jest.fn()

    await instance.onLogin('username', 'password')

    expect(
      UpfrontLoginImplementationHelper.backupAndClearLoginData
    ).toHaveBeenCalledTimes(1)
    expect(CookiesManagerService.clearOSCookies).toHaveBeenCalled()
    expect(UpfrontLoginImplementationHelper.upfrontLogin).toHaveBeenCalledWith({
      userName: 'username',
      password: 'password',
      rememberMe: false
    })
    expect(
      AppLifecycleManager.executeOnBanLevelLoginTasks
    ).toHaveBeenCalledTimes(1)
  })

  it('succeed when entering valid phone number', () => {
    expect(instance.validatePhone('')).toBeTruthy()
  })

  it('entering valid email', () => {
    expect(instance.validateEmail('')).toBeTruthy()
  })

  it('password validation succeed when entering any password', () => {
    expect(instance.validatePassword('')).toBeTruthy()
  })

  it('should continue all login flow (OIDC)', async () => {
    instance.rememberMe = true
    EncryptedStorage.getBoolean = jest.fn(() => true)

    const response = { status: 200 }
    const userCredentials = {
      userName: 'user',
      password: 'pass',
      rememberMe: true
    }

    EncryptedStorage.setItem = jest.fn()
    CookiesManagerService.clearOSCookies = jest.fn()
    UpfrontLoginImplementationHelper.upfrontLogin = jest.fn(() => response)

    await instance.onLogin(userCredentials.userName, userCredentials.password)

    expect(CookiesManagerService.clearOSCookies).toHaveBeenCalled()

    expect(UpfrontLoginImplementationHelper.upfrontLogin).toHaveBeenCalledWith(
      userCredentials
    )
  })

  it('returns expected object on Fail login attempt', async () => {
    UpfrontLoginImplementationHelper.upfrontLogin = jest.fn(() => {
      throw 'Error'
    })

    const receivedObject = await instance.onLogin('', 'correctPassword')

    expect(UpfrontLoginImplementationHelper.upfrontLogin).toThrow()
    expect(receivedObject).toStrictEqual('Error')
  })

  it('should call restoreLoginData when login with ban level mode and upfrontLogin fails', async () => {
    instance.mode = UPFRONT_LOGIN_MODES.ACCESS_SECURE_CONTENT
    UpfrontLoginImplementationHelper.upfrontLogin = jest.fn(() => {
      throw 'Error'
    })

    const receivedObject = await instance.onLogin('', 'correctPassword')

    expect(UpfrontLoginImplementationHelper.upfrontLogin).toThrow()
    expect(receivedObject).toStrictEqual('Error')
    expect(
      UpfrontLoginImplementationHelper.restoreLoginData
    ).toHaveBeenCalledTimes(1)
  })

  it('should call Linking on calling onForgetPassword', () => {
    instance.onForgetPassword()
    expect(openExternalWebView).toHaveBeenCalledWith(
      `${Config.BASE_URL_LEGACY}/meinvodafone/account/login/zugangsdaten_vergessen?forApp=true&c_id=app_cad_authentication`
    )
  })

  it('should call Linking on calling onRegister', () => {
    instance.onRegister()
    expect(openExternalWebView).toHaveBeenCalledWith(
      `${Config.BASE_URL_LEGACY}/meinvodafone/account/registrierung/registrierungsart?forApp=true&c_id=app_cad_authentication`
    )
  })

  it('should call showCaptchaModal if login response contains link to captcha', async () => {
    const response = {
      status: 201,
      headers: {
        'x-vf-captcha-required': 'true',
        'x-redirect-location': 'redirect_url'
      }
    }
    UpfrontLoginImplementationHelper.upfrontLogin = jest.fn()
    Logins.upFrontLoginAPI = jest.fn(() => response)
    CookiesManagerService.clearOSCookies = jest.fn()

    await instance.onLogin('username', 'password')
    expect(await CookiesManagerService.clearOSCookies).toHaveBeenCalled()

    expect(UpfrontLoginImplementationHelper.upfrontLogin).toHaveBeenCalled()
  })
})
