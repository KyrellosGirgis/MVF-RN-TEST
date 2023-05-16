/* eslint-disable import/namespace */

import * as legacy_helpers from 'App/Services/API/Interceptors/Helpers/Legacy.helpers'
import * as CookiesManagerService from 'App/Services/CookiesManager/CookiesManager'
import * as CookiesManagerHelpers from 'App/Services/CookiesManager/CookiesManager.helpers'
import * as LogOut from 'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation'
import * as LegacyInterceptors from 'App/Services/API/Interceptors/legacy.interceptor'
import * as Mocking from 'App/Services/API/Interceptors/Helpers/mocking'
import * as BlackLists from 'App/Services/API/Interceptors/Constants/Interceptors.blackList'
import * as Loggers from 'App/Services/API/Interceptors/Helpers/loggers'

describe('Legacy interceptor', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  CookiesManagerService.clearOSCookies = jest.fn()
  Loggers.LogRequest = jest.fn()
  it('calls injectHeaders, clearOSCookies, injectStoredCookiesHeader, LogRequest before each legacy request', async () => {
    const config = {}
    CookiesManagerHelpers.getStorageCookiesAsString = jest.fn()
    legacy_helpers.injectHeaders = jest.fn()
    CookiesManagerHelpers.injectStorageCookiesInRequestHeader = jest.fn()
    CookiesManagerService.setOrUpdateStorageCookiesFromOSCookies = jest.fn()
    Mocking.mockRequestIfNeeded = jest.fn()
    LegacyInterceptors.applyLegacyRequestInterceptor(config)
    expect(legacy_helpers.injectHeaders).toHaveBeenCalledWith(config)
    expect(await CookiesManagerService.clearOSCookies).toHaveBeenCalled()
    expect(
      await CookiesManagerHelpers.injectStorageCookiesInRequestHeader
    ).toHaveBeenCalled()
    expect(await Mocking.mockRequestIfNeeded).toHaveBeenCalled()
    expect(Loggers.LogRequest).toHaveBeenCalled()
  })
  it('calls clearOSCookies, LogResponse, setOrUpdateStorageCookiesFromOSCookies if not blacklisted in the response interceptor', async () => {
    Loggers.LogResponse = jest.fn()
    CookiesManagerService.setOrUpdateStorageCookiesFromOSCookies = jest.fn()
    BlackLists.responseLegacyBlackList = []
    LegacyInterceptors.applyLegacyResponseInterceptor({
      config: { url: '/mint/session/start' }
    })
    expect(
      await CookiesManagerService.setOrUpdateStorageCookiesFromOSCookies
    ).toHaveBeenCalled()
    expect(await CookiesManagerService.clearOSCookies).toHaveBeenCalled()
    expect(Loggers.LogResponse).toHaveBeenCalled()
  })
  it('only calls clearOSCookies, LogResponse if blacklisted in the response interceptor', async () => {
    // Loggers.LogResponse = jest.fn()
    CookiesManagerService.setOrUpdateStorageCookiesFromOSCookies = jest.fn()
    BlackLists.responseLegacyBlackList = ['']
    LegacyInterceptors.applyLegacyResponseInterceptor({ config: { url: '' } })
    expect(await CookiesManagerService.clearOSCookies).toHaveBeenCalled()
    expect(Loggers.LogResponse).toHaveBeenCalled()
  })

  it('calls clearOSCookies, LogResponse in error response', async () => {
    // Loggers.LogResponse = jest.fn()
    const error = { response: '' }
    LegacyInterceptors.applyLegacyResponseErrorInterceptor(error)
    expect(await CookiesManagerService.clearOSCookies).toHaveBeenCalled()
    expect(Loggers.LogResponse).toHaveBeenCalledWith(error.response)
  })

  it('fails to retry if request is not 401 in legacyRetryCondition function ', async () => {
    legacy_helpers.refreshCookies = jest.fn()
    const error = {
      response: {
        status: 403,
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
    await legacy_helpers.legacyRetryCondition(error).catch(catchSpy)
    expect(catchSpy).toHaveBeenCalledTimes(1)
  })

  it('fails to retry if request is BlackListed in legacyRetryCondition function ', async () => {
    BlackLists.legacyBlackList = ['url']
    legacy_helpers.refreshCookies = jest.fn()

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
    await legacy_helpers.legacyRetryCondition(error).catch(catchSpy)
    expect(catchSpy).toHaveBeenCalledTimes(1)
  })

  it('fails to retry if retryCount >=1 in legacyRetryCondition function ', async () => {
    legacy_helpers.refreshCookies = jest.fn()
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
    await legacy_helpers.legacyRetryCondition(error).catch(catchSpy)
    expect(catchSpy).toHaveBeenCalledTimes(1)
  })

  // it('retry request if request is 401 and not blackListed and retryCount = 0 in legacyRetryCondition function ', async () => {
  //   BlackLists.legacyBlackList = []

  //   const error = {
  //     response: {
  //       status: 401,
  //       config: {
  //         'axios-retry': {
  //           retryCount: 0
  //         }
  //       }
  //     },
  //     config: {
  //       url: 'url'
  //     }
  //   }
  //   legacy_helpers.refreshCookies = jest.fn()
  //   await legacy_helpers.legacyRetryCondition(error)
  //   expect(legacy_helpers.refreshCookies).toHaveBeenCalledTimes(1)
  // })

  it('logout user and throw error if the second try failed in legacyRetryCondition function ', async () => {
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
      await legacy_helpers.legacyRetryCondition(error).catch(catchSpy)
    } catch (err) {}
    expect(LogOut.default).toHaveBeenCalledTimes(1)
    expect(catchSpy).toHaveBeenCalledTimes(1)
  })
})
