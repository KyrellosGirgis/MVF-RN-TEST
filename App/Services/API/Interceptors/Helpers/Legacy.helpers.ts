import { AxiosError, AxiosRequestConfig } from 'axios'

import Moment from 'moment'

import { getHeaders } from './headers'

import { legacyBlackList } from 'App/Services/API/Interceptors/Constants/Interceptors.blackList'

import { minutesTillNextCookieRefresh } from 'App/Services/API/Constants'

import logOut from 'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation'

import { getStorageCookies } from 'App/Services/CookiesManager/CookiesManager'

import { refreshMintSSOToken } from 'App/Services/API/Requests/Login/login'

import { isUpfront } from 'App/Services/Helpers'

import {
  getPathFromUrl,
  getTimeDifferenceFromNow,
  isDeviceConnectedToNetwork
} from 'App/Utils/Helpers/generic.helpers'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import { upfrontLogin } from 'App/Screens/Login/Implementations/UpfrontLoginImplementation.helper'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import { store } from 'App/Redux'
import { restartWebview } from 'App/Screens/WebViewScreen/WebViewScreen.helper'
import { showBlurView } from 'App/Containers/AppNavigation/AppNavigation.helpers'

const injectHeaders = (config: AxiosRequestConfig) => {
  config.headers = {
    ...config.headers,
    ...getHeaders(config.url!)
  }

  return config
}

const isRequestCookiesLatest = async (config) => {
  try {
    const cookieStr = `; ${config.headers.Cookie}`
    const parts = cookieStr.split(`; ${'mint-session-id'}=`)
    const requestSession = parts.pop().split(';').shift()

    return (
      requestSession === (await getStorageCookies())['mint-session-id'].value
    )
  } catch (e) {}
}

let resolversOfLegacyRequestsAwaitingRefresh: Array<any> = []

let isRefreshCookiesOngoing = false

const refreshCookies = async ({
  shouldLogoutNavigateOnFailing = true
} = {}) => {
  if (isRefreshCookiesOngoing) {
    await new Promise((resolve) => {
      resolversOfLegacyRequestsAwaitingRefresh.push(resolve)
    })
  } else {
    isRefreshCookiesOngoing = true

    const is_Upfront = await isUpfront()
    try {
      is_Upfront
        ? await exports.refreshCookiesForUpfront()
        : await exports.refreshCookiesForSMSandSeamless()
      await setLastCookieRefreshDate()
      resolversOfLegacyRequestsAwaitingRefresh.forEach((resolver) => resolver())
      resolversOfLegacyRequestsAwaitingRefresh = []
      isRefreshCookiesOngoing = false
      store.getState().webViewOpened.isWebViewOpened && (await restartWebview())
    } catch (e) {
      const isConnected = await isDeviceConnectedToNetwork()
      if (isConnected) {
        await logOut({
          shouldNavigateToLogin: shouldLogoutNavigateOnFailing
        })
      }
      throw e
    }
  }
}

const TryToRefreshCookies = async () => {
  try {
    await refreshCookies({ shouldLogoutNavigateOnFailing: false })
    return true
  } catch (error) {
    return false
  }
}

const legacyRetryCondition = async (error: AxiosError) => {
  const { config, response: { status, config: resConfig } = {} } = error
  const retryCount = resConfig!['axios-retry']?.retryCount
  const url = getPathFromUrl(config.url!)
  const shouldRefresh =
    status === 401 && !legacyBlackList.includes(url) && retryCount === 0

  if (shouldRefresh) {
    if (await isRequestCookiesLatest(error.config)) {
      await refreshCookies()
    }
  } else {
    retryCount >= 1 && status === 401 && (await logOut())
    throw error
  }
  return true
}

const setLastCookieRefreshDate = async () => {
  await EncryptedStorage.setItem(
    STORAGE_KEYS.lastCookieRefreshDate,
    JSON.stringify(Moment())
  )
}

const refreshCookiesForUpfront = async () => {
  const userName = await EncryptedStorage.getItem(STORAGE_KEYS.username)
  const password = await EncryptedStorage.getItem(STORAGE_KEYS.password)
  if (userName && password) {
    await upfrontLogin(
      { userName, password, rememberMe: true },
      { shouldPerformOIDCFlow: false }
    )
  } else {
    throw new Error('no username or password')
  }
}

const refreshCookiesForSMSandSeamless = async () => {
  const storageCookies = await getStorageCookies()
  if (storageCookies?.['mint-sso-token']) {
    await refreshMintSSOToken()
  } else {
    throw new Error('no mint-ssot-token')
  }
}
const shouldRefreshCookies = async () => {
  const lastSessionRefreshDate = await EncryptedStorage.getItemParsedToJSON(
    STORAGE_KEYS.lastCookieRefreshDate
  )
  return (
    !lastSessionRefreshDate ||
    getTimeDifferenceFromNow(lastSessionRefreshDate) >=
      minutesTillNextCookieRefresh
  )
}

const refreshCookiesOnForegroundIfNeeded = async () => {
  if (store.getState().app.isLoggedIn) {
    const shouldRefreshCookiesBool = await shouldRefreshCookies()
    if (shouldRefreshCookiesBool) {
      setTimeout(async () => {
        store.getState().webViewOpened.isWebViewOpened &&
          showBlurView({ opacity: 0.8, showSpinner: true })
        await refreshCookies()
      }, 0)
    }
  }
}

export {
  injectHeaders,
  legacyRetryCondition,
  refreshCookies,
  TryToRefreshCookies,
  refreshCookiesForUpfront,
  refreshCookiesForSMSandSeamless,
  setLastCookieRefreshDate,
  refreshCookiesOnForegroundIfNeeded
}
