import { handleOnBoardingApisErrors } from 'App/Screens/OnBoarding/OnBoardingErrorTypes'
import { constructInfoRequestBody } from 'App/Services/API/Requests/ThirdPartyPermissions/ThirdPartyPermissions.helper'

import { legacyAxios } from 'App/Services/API/Interceptors/legacy.interceptor'
import { Permission } from 'App/Services/API/Requests/ThirdPartyPermissions/info/info.d'

import { ApiRoutes } from 'App/Services'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import { FUNNEL_CONNECT_BASE_URL } from 'App/Services/API'

const loadInfo = async (umdid: string, ignoreAndClearCache: boolean = true) => {
  try {
    const { URL, cache, apiId } = ApiRoutes.FunnelConnect.info
    cache.ignoreCache = ignoreAndClearCache
    const { data } = await legacyAxios.get(URL(umdid), {
      baseURL: FUNNEL_CONNECT_BASE_URL,
      cache,
      clearCacheEntry: ignoreAndClearCache,
      apiId
    })
    return data
  } catch (error) {
    throw handleOnBoardingApisErrors(error)
  }
}

const saveInfoToBE = async (permissions: Permission) => {
  try {
    const { URL, apiId } = ApiRoutes.FunnelConnect.info
    const umdid = await EncryptedStorage.getItem(STORAGE_KEYS.umdid)
    const body = await constructInfoRequestBody(permissions)
    const { data } = await legacyAxios.post(URL(umdid), body, {
      baseURL: FUNNEL_CONNECT_BASE_URL,
      apiId
    })
    return data
  } catch (error) {
    throw error
  }
}

export { loadInfo, saveInfoToBE }
