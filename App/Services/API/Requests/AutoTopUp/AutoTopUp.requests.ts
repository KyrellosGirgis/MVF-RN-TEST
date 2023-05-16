import { getMsisdn } from 'App/Services/AppUserData/AppUserData.helpers'
import { constructAutoTopupStatusBody } from 'App/Services/API/Requests/AutoTopUp/AutoTopUp.helpers'

import { REQUEST_METHODS } from 'App/Services/API/Constants'

import { legacyAxios } from 'App/Services/API/Interceptors/legacy.interceptor'

import { ApiRoutes } from 'App/Services'
import { AUTO_TOPUP_STATUS } from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/BalanceTab.constants'

const getAutoTopupStatus = async () => {
  try {
    const { URL, apiId } = ApiRoutes.Nil.autoTopupStatus
    const getApiId = apiId(REQUEST_METHODS.GET)
    const { data } = await legacyAxios.get(URL(getMsisdn()), {
      apiId: getApiId
    })
    return data?.subscriptionVBO[0]?.subscriptions[0]?.topup?.status
  } catch (error) {
    throw error
  }
}
const updateAutoTopupStatus = async (autoTopupStatus: AUTO_TOPUP_STATUS) => {
  const body = constructAutoTopupStatusBody(autoTopupStatus)
  try {
    const { URL, apiId } = ApiRoutes.Nil.autoTopupStatus
    const putApiId = apiId(REQUEST_METHODS.PUT)
    await legacyAxios.put(URL(getMsisdn()), body, {
      apiId: putApiId
    })
  } catch (error) {
    throw error
  }
}

export { getAutoTopupStatus, updateAutoTopupStatus }
