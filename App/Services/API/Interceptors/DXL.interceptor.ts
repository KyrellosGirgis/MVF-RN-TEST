import axios, { AxiosError, AxiosRequestConfig } from 'axios'

import axiosRetry from 'axios-retry'

import { setupCache } from 'axios-cache-adapter'

import { mockRequestIfNeeded } from './Helpers/mocking'

import { defaultCache } from 'App/Services/API/Caching'

import {
  DXL_retryCondition,
  isTokenValid
} from 'App/Services/API/Interceptors/Helpers/DXL'

import { DXL_BASE_URL, refreshOIDC } from 'App/Services/API'

import {
  LogRequest,
  LogResponse
} from 'App/Services/API/Interceptors/Helpers/loggers'

import { getHeaders } from 'App/Services/API/Interceptors/Helpers/headers'

import { getLoginTokens } from 'App/Screens/Login/Implementations/Login.helper'
import { DEFAULT_API_CALL_TIMEOUT } from 'App/Utils/Constants'

const DXLAxios = axios.create({
  baseURL: DXL_BASE_URL,
  adapter: setupCache(defaultCache).adapter,
  timeout: DEFAULT_API_CALL_TIMEOUT
})

axiosRetry(DXLAxios, {
  retries: 2,
  retryCondition: async (error: AxiosError) => {
    return await DXL_retryCondition(error)
  }
})

const applyDXLRequestInterceptor = async (config: AxiosRequestConfig) => {
  const loginData = await getLoginTokens()
  if (!isTokenValid(loginData.expires_at)) {
    const { access_token: new_token } = await refreshOIDC()
    loginData.access_token = new_token
  }
  config.headers = {
    ...getHeaders(config.baseURL!),
    ...config.headers
  }
  config.headers.Authorization = `Bearer ${loginData.access_token}`
  config = await mockRequestIfNeeded(config)
  LogRequest(config)
  return config
}

const applyDXLResponseInterceptor = (response) => {
  LogResponse(response)
  return response
}

const applyDXLResponseErrorInterceptor = (error) => {
  LogResponse(error.response)
  return Promise.reject(error)
}

DXLAxios.interceptors.request.use(applyDXLRequestInterceptor, (error) => {
  return Promise.reject(error)
})

DXLAxios.interceptors.response.use(
  applyDXLResponseInterceptor,
  applyDXLResponseErrorInterceptor
)

export {
  DXLAxios,
  DXL_retryCondition,
  applyDXLRequestInterceptor,
  applyDXLResponseInterceptor,
  applyDXLResponseErrorInterceptor
}
