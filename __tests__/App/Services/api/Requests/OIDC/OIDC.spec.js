/* eslint-disable import/namespace */

import * as axios from 'axios'

import OIDC_config from 'App/Services/API/Requests/OIDC/OIDC.config'

import * as Helpers from 'App/Screens/Login/Implementations/Login.helper'
import * as Logout from 'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation'
import * as CookiesManagerHelpers from 'App/Services/CookiesManager/CookiesManager.helpers'
import * as legacyInterceptor from 'App/Services/API/Interceptors/legacy.interceptor'
import * as API from 'App/Services/API'

jest.mock('jwt-decode', () => {
  return () => ({
    sub: 'cccc3-019ee1a35f',
    aud: 'dbbbdbd-5a403c-app',
    kid: 'rsa1',
    iss: 'https://www.vodafone.de/mint/oidc/',
    exp: 1111111111,
    iat: 1112222111,
    nonce: 'KKKKKKK',
    jti: 'jja53-e910f11a7'
  })
})

jest.mock('App/Utils/Helpers/generic.helpers', () => {
  return {
    isDeviceConnectedToNetwork: () => true,
    translate: (str) => str
  }
})
describe('OIDC Implementation', () => {
  Helpers.getLoginTokens = jest.fn(() => {
    return { refresh_token: '' }
  })
  Helpers.setLoginTokens = jest.fn()
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('expect addTokenEpirationTime to calculate the expires_at (timestamp)', () => {
    global.Date.now = jest.fn(() => 1612686030000)

    const token = {
      expires_in: 1199
    }
    API.addTokenExpirationTime(token)
    expect(token).toEqual({
      expires_at: 1612687229000,
      expires_in: 1199
    })
  })

  it('expect call getLoginTokens,setLoginTokens on Calling refreshOIDC', async () => {
    API.addTokenExpirationTime = jest.fn()
    legacyInterceptor.legacyAxios.post.mockImplementationOnce(() => {
      return {
        data: {}
      }
    })
    await API.refreshOIDC()
    expect(Helpers.getLoginTokens).toHaveBeenCalled()
    expect(Helpers.setLoginTokens).toHaveBeenCalled()
  })
  it('expect call LogOut if Calling refreshOIDC API fails', async () => {
    API.addTokenExpirationTime = jest.fn()
    Logout.LogOutAPI = jest.fn()
    axios.post.mockImplementationOnce(() =>
      Promise.reject({ response: { status: 200 } })
    )
    const catchSpy = jest.fn()
    await API.refreshOIDC().catch(catchSpy)
    expect(catchSpy).toHaveBeenCalledTimes(1)
  })
  const token_data = {
    access_token: 'GaMeD',
    token_type: 'Bearer',
    refresh_token: 'GaMeD',
    expires_in: 1199,
    scope: 'openid offline_access profile webseal validate-token',
    id_token: 'GaMeD'
  }
  it('expect loadOIDCToken to save tokens', async () => {
    legacyInterceptor.legacyAxios.post.mockImplementationOnce(() => {
      return {
        data: token_data
      }
    })
    CookiesManagerHelpers.getStorageCookiesAsString = () =>
      new Promise(async (resolve) => {
        return resolve('SUCCESS')
      })
    const NativeModules = require('react-native').NativeModules
    NativeModules.CustomApiCallModule.getRequestNoRedirectionsWithUrl = () =>
      'mvapp://oidclogin'
    Helpers.getParamsFromUrl = () => ({
      code: 'CdCdCd',
      state: 'HHHHHHH'
    })
    OIDC_config.state = 'HHHHHHH'
    OIDC_config.nonce = 'KKKKKKK'
    await API.loadOIDCToken()
    expect(Helpers.setLoginTokens).toHaveBeenCalledWith(token_data)
  })
  it('expect loadOIDCToken to throw else object if error has occured', async () => {
    legacyInterceptor.legacyAxios.post.mockImplementationOnce(() => {
      return {
        data: token_data
      }
    })
    CookiesManagerHelpers.getStorageCookiesAsString = () =>
      new Promise(async (resolve) => {
        return resolve('SUCCESS')
      })
    const NativeModules = require('react-native').NativeModules
    NativeModules.CustomApiCallModule.getRequestNoRedirectionsWithUrl = () =>
      'mvapp://oidclogin'
    Helpers.getParamsFromUrl = () => ({
      code: 'CdCdCd',
      state: 'MMMMMM'
    })
    OIDC_config.state = 'HHHHHHH'
    let response
    try {
      await API.loadOIDCToken()
    } catch (error) {
      response = error.errorMessage
    }
    expect(response).toStrictEqual('login_else_body_message')
  })
  it('expect loadOIDCToken to throw Error:authenticate request error', async () => {
    legacyInterceptor.legacyAxios.post.mockImplementationOnce(() => {
      return {
        data: token_data
      }
    })
    CookiesManagerHelpers.getStorageCookiesAsString = () =>
      new Promise(async (resolve) => {
        return resolve('SUCCESS')
      })
    const NativeModules = require('react-native').NativeModules
    NativeModules.CustomApiCallModule.getRequestNoRedirectionsWithUrl = () =>
      'mvapp://oidclogin'
    Helpers.getParamsFromUrl = () => ({
      code: 'CdCdCd',
      state: 'HHHHHHH',
      error: 'error'
    })
    OIDC_config.state = 'HHHHHHH'
    let response
    try {
      await API.loadOIDCToken()
    } catch (error) {
      response = error.errorMessage
    }
    expect(response).toStrictEqual('login_else_body_message')
  })

  it('expect loadOIDCToken to throw Error:code is undefined', async () => {
    legacyInterceptor.legacyAxios.post.mockImplementationOnce(() => {
      return {
        data: token_data
      }
    })
    CookiesManagerHelpers.getStorageCookiesAsString = () =>
      new Promise(async (resolve) => {
        return resolve('SUCCESS')
      })
    const NativeModules = require('react-native').NativeModules
    NativeModules.CustomApiCallModule.getRequestNoRedirectionsWithUrl = () =>
      'mvapp://oidclogin'
    Helpers.getParamsFromUrl = () => ({
      state: 'HHHHHHH'
    })
    OIDC_config.state = 'HHHHHHH'
    let response
    try {
      await API.loadOIDCToken()
    } catch (error) {
      response = error.errorMessage
    }
    expect(response).toStrictEqual('login_else_body_message')
  })

  it('expect loadOIDCToken to throw Error:authorize get failed', async () => {
    legacyInterceptor.legacyAxios.post.mockImplementationOnce(() => {
      return {
        data: token_data
      }
    })
    CookiesManagerHelpers.getStorageCookiesAsString = () =>
      new Promise(async (_resolve, reject) => {
        return reject('ERROR')
      })
    let response
    try {
      await API.loadOIDCToken()
    } catch (error) {
      response = error.errorMessage
    }
    expect(response).toStrictEqual('login_else_body_message')
  })
  it('expect loadOIDCToken to throw ERROR: token is invalid', async () => {
    legacyInterceptor.legacyAxios.post.mockImplementationOnce(() => {
      return {
        data: token_data
      }
    })
    CookiesManagerHelpers.getStorageCookiesAsString = () =>
      new Promise(async (resolve) => {
        return resolve('SUCCESS')
      })
    const NativeModules = require('react-native').NativeModules
    NativeModules.CustomApiCallModule.getRequestNoRedirectionsWithUrl = () =>
      'mvapp://oidclogin'
    Helpers.getParamsFromUrl = () => ({
      code: 'CdCdCd',
      state: 'HHHHHHH'
    })
    OIDC_config.state = 'HHHHHHH'
    OIDC_config.nonce = 'HHHHHHH'
    let response
    try {
      await API.loadOIDCToken()
    } catch (error) {
      response = error.errorMessage
    }
    expect(response).toStrictEqual('login_else_body_message')
  })

  it('expect loadOIDCToken to save data in android', async () => {
    const Platform = require('react-native').Platform
    Platform.OS = 'android'
    legacyInterceptor.legacyAxios.get.mockImplementationOnce(() =>
      Promise.reject({ response: { status: 200 } })
    )
    legacyInterceptor.legacyAxios.post.mockImplementationOnce(() => {
      return {
        data: token_data
      }
    })

    Helpers.getParamsFromUrl = () => ({
      code: 'CdCdCd',
      state: 'HHHHHHH'
    })
    OIDC_config.state = 'HHHHHHH'
    OIDC_config.nonce = 'KKKKKKK'
    await API.loadOIDCToken()

    expect(Helpers.setLoginTokens).toHaveBeenCalledWith(token_data)
  })
})
