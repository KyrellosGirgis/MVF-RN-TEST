import { handleOnBoardingApisErrors } from 'App/Screens/OnBoarding/OnBoardingErrorTypes'
import { legacyAxios } from 'App/Services/API/Interceptors/legacy.interceptor'

import { FUNNEL_CONNECT_BASE_URL } from 'App/Services/API/Constants'

import ApiRoutes from 'App/Services/API/ApiRoutes'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const getIdent = async (subscriptionType: string, hash: string) => {
  try {
    const umdid = await EncryptedStorage.getItem(STORAGE_KEYS.umdid)
    const { URL, apiId } = ApiRoutes.FunnelConnect.ident
    const identResponse = await legacyAxios.get(
      URL(subscriptionType, hash, umdid),
      { baseURL: FUNNEL_CONNECT_BASE_URL, apiId }
    )

    return identResponse
  } catch (error) {
    throw handleOnBoardingApisErrors(error)
  }
}

export { getIdent }
