import Axios, { AxiosResponse } from 'axios'

import { setupCache } from 'axios-cache-adapter'

import { LogRequest, LogResponse } from './Helpers/loggers'

import { CMS_CMS_BASE_URL } from 'App/Services/API/Constants'

import { defaultCache } from 'App/Services/API/Caching'

import { DEFAULT_API_CALL_TIMEOUT } from 'App/Utils/Constants'

const CMSAxios = Axios.create({
  baseURL: CMS_CMS_BASE_URL,
  timeout: DEFAULT_API_CALL_TIMEOUT,
  adapter: setupCache(defaultCache).adapter
})

const applyLegacyRequestInterceptor = async (config) => {
  LogRequest(config)
  return config
}

const applyLegacyResponseInterceptor = async (res: AxiosResponse) => {
  LogResponse(res)
  return res
}

CMSAxios.interceptors.request.use(applyLegacyRequestInterceptor)

CMSAxios.interceptors.response.use(applyLegacyResponseInterceptor)

export {
  CMSAxios,
  applyLegacyRequestInterceptor,
  applyLegacyResponseInterceptor
}
