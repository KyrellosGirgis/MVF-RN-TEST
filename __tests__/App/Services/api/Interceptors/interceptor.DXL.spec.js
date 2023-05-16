/* eslint-disable import/namespace */

import { API_KEY } from 'App/Services/Keys/Keys.helper'

import * as Headers from 'App/Services/API/Interceptors/Helpers/headers'

import * as Helpers from 'App/Screens/Login/Implementations/Login.helper'
import * as LogOut from 'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation'
import * as BlackLists from 'App/Services/API/Interceptors/Constants/Interceptors.blackList'
import * as DXL_helpers from 'App/Services/API/Interceptors/Helpers/DXL'
import * as Loggers from 'App/Services/API/Interceptors/Helpers/loggers'
import * as DXL from 'App/Services/API/Interceptors/DXL.interceptor'
import * as OIDC from 'App/Services/API/Requests/OIDC/OIDC'
import * as Mocking from 'App/Services/API/Interceptors/Helpers/mocking'

jest.mock('App/Utils/Helpers/generic.helpers', () => {
  const actualHelper = jest.requireActual('App/Utils/Helpers/generic.helpers')
  return {
    ...actualHelper,
    translate: (str) => str,
    getPathFromUrl: (url) => url
  }
})

describe('DXL interceptor', () => {
  global.Date.now = jest.fn(() => 1612686030000)
  jest.mock('react-native-config', () => {
    return {
      API_KEY: 'API_KEY'
    }
  })
  const Config = {
    headers: { test: 'test' },
    url: 'url',
    baseURL: 'baseUrl'
  }
  Mocking.mockRequestIfNeeded = jest.fn(() => {
    return Config
  })
  Helpers.getLoginTokens = jest.fn(() => {
    return {
      access_token: 'xxx',
      expires_at: 1614686030000
    }
  })

  it('returns true if token is valid in isTokenValid function', async () => {
    expect(DXL_helpers.isTokenValid(1614686030000)).toBeTruthy()
  })

  it('returns false if token is invalid in isTokenValid function', async () => {
    expect(DXL_helpers.isTokenValid(1612686030000)).toBeFalsy()
  })

  it('not to call refreshOIDC if token is valid in applyDXLRequestInterceptor function ', async () => {
    Loggers.LogRequest = jest.fn()
    Headers.getHeaders = jest.fn()
    DXL_helpers.isTokenValid = jest.fn(() => {
      return true
    })
    OIDC.refreshOIDC = jest.fn()

    await DXL.applyDXLRequestInterceptor(Config)

    expect(DXL_helpers.isTokenValid).toBeTruthy()
    expect(OIDC.refreshOIDC).toHaveBeenCalledTimes(0)
    expect(Headers.getHeaders).toHaveBeenCalledWith(Config.baseURL)
    expect(Mocking.mockRequestIfNeeded).toHaveBeenCalled()
    expect(Loggers.LogRequest).toHaveBeenCalledWith(Config)
  })

  it('call refreshOIDC if token is expired in applyDXLRequestInterceptor function ', async () => {
    DXL_helpers.isTokenValid = jest.fn(() => {
      return false
    })

    OIDC.refreshOIDC = jest.fn(() => {
      return {
        access_token: 'xxxXXXXxx'
      }
    })
    Loggers.LogRequest = jest.fn()
    Headers.getHeaders = jest.fn()

    await DXL.applyDXLRequestInterceptor(Config)
    expect(Helpers.getLoginTokens).toHaveBeenCalled()

    const loginData = await Helpers.getLoginTokens()
    expect(DXL_helpers.isTokenValid).toHaveBeenCalledWith(loginData.expires_at)
    expect(DXL_helpers.isTokenValid()).toBeFalsy()
    expect(OIDC.refreshOIDC).toHaveBeenCalled()
    expect(Headers.getHeaders).toHaveBeenCalledWith(Config.baseURL)
    expect(Mocking.mockRequestIfNeeded).toHaveBeenCalled()
    expect(Loggers.LogRequest).toHaveBeenCalledWith(Config)
  })

  it('returns config with all new headers added by interceptor', async () => {
    OIDC.refreshOIDC = jest.fn(() => {
      return {
        access_token: 'xxxXXXXxx'
      }
    })
    Headers.getHeaders = jest.fn(() => {
      return {
        Authorization: 'Bearer xxxXXXXxx',
        'x-api-key': API_KEY,
        'x-vf-rep-os': 'os'
      }
    })

    const newConfig = await DXL.applyDXLRequestInterceptor(Config)

    expect(newConfig.headers).toMatchObject({
      Authorization: 'Bearer xxxXXXXxx',
      'x-api-key': API_KEY,
      'x-vf-rep-os': 'os',
      test: 'test'
    })
  })
  it('calls LogResponse in applyDXLResponseInterceptor', () => {
    const response = ''
    Loggers.LogResponse = jest.fn()
    DXL.applyDXLResponseInterceptor(response)
    expect(Loggers.LogResponse).toHaveBeenCalledWith(response)
  })
  it('calls LogResponse in applyDXLResponseErrorInterceptor', () => {
    Loggers.LogResponse = jest.fn()
    const error = { response: '' }
    DXL.applyDXLResponseErrorInterceptor(error)
    expect(Loggers.LogResponse).toHaveBeenCalledWith(error.response)
  })
  it('fails to retry if response status != (401) in DXL_retryCondition function ', async () => {
    BlackLists.DXLBlackList = []
    const error = {
      response: {
        status: 404,
        config: {
          'axios-retry': {
            retryCount: 0
          }
        }
      },
      config: {
        url: 'url'
      }
    }
    const catchSpy = jest.fn()
    await DXL_helpers.DXL_retryCondition(error).catch(catchSpy)
    expect(catchSpy).toHaveBeenCalledTimes(1)
  })

  it('fails to retry if request is BlackListed in DXL_retryCondition function ', async () => {
    BlackLists.DXLBlackList = ['url']
    const error = {
      response: {
        status: 401,
        config: {
          'axios-retry': {
            retryCount: 0
          }
        }
      },
      config: {
        url: 'url'
      }
    }
    const catchSpy = jest.fn()
    await DXL_helpers.DXL_retryCondition(error).catch(catchSpy)
    expect(catchSpy).toHaveBeenCalledTimes(1)
  })

  it('fails to retry if retryCount >=1 in DXL_retryCondition function ', async () => {
    BlackLists.DXLBlackList = []
    const error = {
      response: {
        status: 401,
        config: {
          'axios-retry': {
            retryCount: 1
          }
        }
      },
      config: {
        url: 'url'
      }
    }
    const catchSpy = jest.fn()
    await DXL.DXL_retryCondition(error).catch(catchSpy)
    expect(catchSpy).toHaveBeenCalledTimes(1)
  })

  it('retry request if request is 401 and not blackListed and retryCount = 0 in DXL_retryCondition function ', async () => {
    BlackLists.DXLBlackList = []
    const error = {
      response: {
        status: 401,
        config: {
          'axios-retry': {
            retryCount: 0
          }
        }
      },
      config: {
        url: 'url'
      }
    }
    OIDC.refreshOIDC = jest.fn()
    await DXL.DXL_retryCondition(error)
    expect(OIDC.refreshOIDC).toHaveBeenCalledTimes(1)
  })

  it('logout user and throw error if the second try failed in DXL_retryCondition function and the response status = (401)', async () => {
    BlackLists.DXLBlackList = []
    const error = {
      response: {
        status: 401,
        config: {
          'axios-retry': {
            retryCount: 1
          }
        }
      },
      config: {
        url: 'url'
      }
    }
    LogOut.default = jest.fn()
    const catchSpy = jest.fn()
    try {
      await DXL.DXL_retryCondition(error).catch(catchSpy)
    } catch (err) {}
    expect(LogOut.default).toHaveBeenCalledTimes(1)
    expect(catchSpy).toHaveBeenCalledTimes(1)
  })
})
