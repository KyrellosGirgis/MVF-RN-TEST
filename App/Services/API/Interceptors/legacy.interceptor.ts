import axios, { AxiosResponse } from 'axios'
import axiosRetry from 'axios-retry'

import { AxiosError } from '@vfgroup-oneplatform/login/node_modules/axios'

import { setupCache } from 'axios-cache-adapter'

import { injectHeaders, legacyRetryCondition } from './Helpers/Legacy.helpers'

import { LogRequest, LogResponse } from './Helpers/loggers'

import { APIsAllowedToStoreCookies } from './Constants/Interceptors.whiteList'

import {
  setOrUpdateStorageCookiesFromOSCookies,
  clearOSCookies
} from 'App/Services/CookiesManager/CookiesManager'
import { injectStorageCookiesInRequestHeader } from 'App/Services/CookiesManager/CookiesManager.helpers'

import { mockRequestIfNeeded } from 'App/Services/API/Interceptors/Helpers/mocking'

import { LEGACY_BASE_URL } from 'App/Services/API/Constants'

import { defaultCache } from 'App/Services/API/Caching'
import { store } from 'App/Redux'
import { DEFAULT_API_CALL_TIMEOUT } from 'App/Utils/Constants'

const legacyAxios = axios.create({
  baseURL: LEGACY_BASE_URL,
  adapter: setupCache(defaultCache).adapter,
  timeout: DEFAULT_API_CALL_TIMEOUT
})

axiosRetry(legacyAxios, {
  retries: 2,
  retryCondition: async (error: AxiosError) => {
    return await legacyRetryCondition(error)
  }
})
const applyLegacyRequestInterceptor = async (config) => {
  config = injectHeaders(config)

  await clearOSCookies() //system cookies won't override request's

  config = await injectStorageCookiesInRequestHeader(config)
  config = await mockRequestIfNeeded(config)
  LogRequest(config)

  return config
}

const applyLegacyResponseInterceptor = async (res: AxiosResponse) => {
  const isURLAllowedToStoreCookies = APIsAllowedToStoreCookies.find(
    (url: string) => {
      return res.config.url?.includes(url)
    }
  )
  if (isURLAllowedToStoreCookies) {
    await setOrUpdateStorageCookiesFromOSCookies()
  }

  if (!store.getState().webViewOpened.isWebViewOpened) {
    await clearOSCookies()
  }

  LogResponse(res)

  return res
}

const applyLegacyResponseErrorInterceptor = async (error) => {
  if (!store.getState().webViewOpened.isWebViewOpened) {
    await clearOSCookies()
  }
  LogResponse(error.response)
  return Promise.reject(error)
}

legacyAxios.interceptors.request.use(applyLegacyRequestInterceptor)

legacyAxios.interceptors.response.use(
  applyLegacyResponseInterceptor,
  applyLegacyResponseErrorInterceptor
)

export {
  legacyAxios,
  applyLegacyResponseErrorInterceptor,
  applyLegacyRequestInterceptor,
  applyLegacyResponseInterceptor
}
